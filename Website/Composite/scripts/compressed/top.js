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
var _3c=this.getNext();
var _3d=this._index;
is=_38.call(_39,_3c,_3d);
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
return this._array;
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
_BroadcastMessages.prototype={APPLICATION_STARTUP:"application startup",APPLICATION_LOGIN:"application login",APPLICATION_LOGOUT:"application logout",APPLICATION_OPERATIONAL:"application operational",APPLICATION_ONSHUTDOWN:"application onshutdown",APPLICATION_SHUTDOWN:"application shutdown",APPLICATION_ERROR:"application error",APPLICATION_BLURRED:"application blurred",APPLICATION_FOCUSED:"application focused",APPLICATION_KICKSTART:"application kickstart",BESPIN_LOADED:"bespin loaded",MOUSEEVENT_MOUSEDOWN:"mouseevent mousedown",MOUSEEVENT_MOUSEUP:"mouseevent mouseup",MOUSEEVENT_MOUSEMOVE:"mouseevent mousemove",$WINKEY_LOADED:"${windowkey} loaded",$WINKEY_UNLOADED:"${windowkey} unloaded",$WINKEY_EVALUATED:"${windowkey} evaluated",$WINKEY_RESIZED:"${windowkey} resized",$WINKEY_HRESIZED:"${windowkey} horizontally resized",$WINKEY_VRESIZED:"${windowkey} vertically resized",LOADED_NAVIGATOR:"navigator loaded",LOADED_MAINSTAGE:"mainstage loaded",LOCALSTORE_INITIALIZED:"localstore initialized",PERSISTANCE_INITIALIZED:"persistance initialized",AUDIO_INITIALIZED:"audio initialized",STAGE_INITIALIZED:"stage initialized",KEY_SHIFT_DOWN:"shiftkeydown",KEY_SHIFT_UP:"shiftkeyup",KEY_CONTROL_DOWN:"controlkeydown",KEY_CONTROL_UP:"controlkeyup",KEY_ARROW:"arrowkey",KEY_ENTER:"enterkeydown",KEY_ESCAPE:"escapekeydown",KEY_SPACE:"spacekeydown",KEY_TAB:"tabkeydown",KEY_ALT:"altkeydown",KEY_CONTROLTAB:"controltabkeysdown",TYPEDRAG_START:"typedrag start",TYPEDRAG_STOP:"typedrag stop",TYPEDRAG_PAUSE:"typedrag pause",DOCK_MAXIMIZED:"dockmaximized",DOCK_MINIMIZED:"dockminimized",DOCK_NORMALIZED:"docknormalized",DOCKTABBINDING_SELECT:"docktab select",SYSTEMTREEBINDING_REFRESH:"systemtree refresh",SYSTEMTREEBINDING_REFRESHALL:"systemtree refresh all",SYSTEMTREEBINDING_REFRESHING:"systemtree refreshing",SYSTEMTREEBINDING_REFRESHED:"systemtree refreshed",SYSTEMTREEBINDING_CUT:"systemtree cut",SYSTEMTREEBINDING_COPY:"systemtree copy",SYSTEMTREEBINDING_PASTE:"systemtree paste",SYSTEMTREEBINDING_COLLAPSEALL:"systemtree collapse all",SYSTEMTREENODEBINDING_FOCUS:"systemtreenode focus",SYSTEMTREEBINDING_LOCKTOEDITOR:"systemtreenode lock to editor",SYSTEMTREENODEBINDING_FORCE_OPEN:"systemtreenode force open",SYSTEMTREENODEBINDING_FORCING_OPEN:"systemtreenode forcing open",SYSTEMTREENODEBINDING_FORCED_OPEN:"systemtreenode forced open",START_COMPOSITE:"startcomposite",STOP_COMPOSITE:"stopcomposite",COMPOSITE_START:"compositestart",COMPOSITE_STOP:"compositestop",VIEW_OPENING:"view opening",VIEW_OPENED:"view opened",VIEW_COMPLETED:"view completed",CLOSE_VIEW:"close view",CLOSE_VIEWS:"close views",VIEW_CLOSED:"view closed",TINYMCE_INITIALIZED:"tinymce initialized",CODEPRESS_INITIALIZED:"codepress initialized",VISUALEDITOR_FOCUSED:"visualeditor focused",VISUALEDITOR_BLURRED:"visualditor blurred",VISUALEDITOR_HACKED:"visualeditor hacked",PERSPECTIVE_CHANGED:"perspective changed",PERSPECTIVES_NONE:"no perspectives",SYSTEMLOG_OPENED:"systemlog opened",SYSTEMLOG_CLOSED:"systemlog closed",SYSTEMACTION_INVOKE:"systemaction invoke",SYSTEMACTION_INVOKED:"systemaction invoked",SYSTEM_ACTIONPROFILE_PUBLISHED:"system actionprofile published",NAVIGATOR_TREENODE_SELECTED:"navigator treenode selected",MODAL_DIALOG_OPENED:"modal dialog invoked",MODAL_DIALOG_CLOSED:"modal dialog closed",COVERBINDING_MOUSEDOWN:"userinterfacecoverbinding mousedown",SERVER_OFFLINE:"server offline",SERVER_ONLINE:"server online",OFFLINE_FLASH_INITIALIZED:"offline flash initialized",CLOSE_CURRENT:"close current",CLOSE_ALL:"close all",CLOSE_ALL_DONE:"close all done",SAVE_CURRENT:"save current",CURRENT_SAVED:"current saved",SAVE_ALL:"save all",SAVE_ALL_DONE:"save all done",DOCKTAB_DIRTY:"docktab dirty",DOCKTAB_CLEAN:"docktab clean",BINDING_RELATE:"binding relate",LOCALIZATION_CHANGED:"localization changed",XHTML_MARKUP_ON:"xhtml markup on",XHTML_MARKUP_OFF:"xhtml markup off",XHTML_MARKUP_ACTIVATE:"xhtml markup activate",XHTML_MARKUP_DEACTIVATE:"xhtml markup deactivate",HIGHLIGHT_KEYWORDS:"highlight keywords",BIND_TOKEN_TO_VIEW:"bind entitytoken to view",STAGEDIALOG_OPENED:"stage dialog opened",INVOKE_DEFAULT_ACTION:"invoke default action",LANGUAGES_UPDATED:"LocalesUpdated",FROMLANGUAGE_UPDATED:"ForeignLocaleChanged",TOLANGUAGE_UPDATED:"ActiveLocaleChanged",MESSAGEQUEUE_REQUESTED:"messagequeue requested",MESSAGEQUEUE_EVALUATED:"messagequeue evaluated",UPDATE_LANGUAGES:"update languages"};
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
_Constants.prototype={COMPOSITE_HOME:"http://www.composite.net",DUMMY_LINK:"javascript:void(false);",APPROOT:temproot,TEMPLATESROOT:temproot+"/templates",SKINROOT:temproot+"/skins/system",TINYMCEROOT:temproot+"/content/misc/editors/wysiwygeditor/tiny_mce",TINYROOT:temproot+"/content/misc/editors/visualeditor/tiny_mce",URL_WSDL_SETUPSERVICE:temproot+"/services/Setup/SetupService.asmx?WSDL",URL_WSDL_CONFIGURATION:temproot+"/services/Configuration/ConfigurationService.asmx?WSDL",URL_WSDL_LOGINSERVICE:temproot+"/services/Login/Login.asmx?WSDL",URL_WSDL_INSTALLSERVICE:temproot+"/services/Installation/InstallationService.asmx?WSDL",URL_WSDL_MESSAGEQUEUE:temproot+"/services/ConsoleMessageQueue/ConsoleMessageQueueServices.asmx?WSDL",URL_WSDL_EDITORCONFIG:temproot+"/services/WysiwygEditor/ConfigurationServices.asmx?WSDL",URL_WSDL_FLOWCONTROLLER:temproot+"/services/FlowController/FlowControllerServices.asmx?WSDL",URL_WSDL_STRINGSERVICE:temproot+"/services/StringResource/StringService.asmx?WSDL",URL_WSDL_TREESERVICE:temproot+"/services/Tree/TreeServices.asmx?WSDL",URL_WSDL_XHTMLTRANSFORM:temproot+"/services/WysiwygEditor/XhtmlTransformations.asmx?WSDL",URL_WSDL_SECURITYSERVICE:temproot+"/services/Tree/SecurityServices.asmx?WSDL",URL_WSDL_READYSERVICE:temproot+"/services/Ready/ReadyService.asmx?WSDL",URL_WSDL_LOCALIZATION:temproot+"/services/Localization/LocalizationService.asmx?WSDL",URL_WSDL_SOURCEVALIDATION:temproot+"/services/SourceEditor/SourceValidationService.asmx?WSDL",URL_WSDL_MARKUPFORMAT:temproot+"/services/SourceEditor/MarkupFormatService.asmx?WSDL",URL_WSDL_SEOSERVICE:temproot+"/services/SearchEngineOptimizationKeyword/SearchEngineOptimizationKeyword.asmx?WSDL",URL_WSDL_PAGESERVICE:temproot+"/services/Page/PageService.asmx?WSDL",URL_WSDL_DIFFSERVICE:temproot+"/services/StringResource/DiffService.asmx?WSDL",NS_XHTML:"http://www.w3.org/1999/xhtml",NS_UI:"http://www.w3.org/1999/xhtml",NX_XUL:"http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",NS_XBL:"http://www.mozilla.org/xbl",NS_WSDL:"http://schemas.xmlsoap.org/wsdl/",NS_SOAP:"http://schemas.xmlsoap.org/wsdl/soap/",NS_ENVELOPE:"http://schemas.xmlsoap.org/soap/envelope/",NS_ENCODING:"http://schemas.xmlsoap.org/soap/encoding/",NS_SCHEMA:"http://www.w3.org/2001/XMLSchema",NS_SCHEMA_INSTANCE:"http://www.w3.org/1999/XMLSchema-instance",NS_DOMPARSEERROR:"http://www.mozilla.org/newlayout/xml/parsererror.xml",NS_NS:"http://www.w3.org/2000/xmlns/",NS_PERSISTANCE:"http://www.composite.net/ns/localstore/persistance",NS_FUNCTION:"http://www.composite.net/ns/function/1.0",SCROLLBAR_DIMENSION_HARDCODED_VALUE:19};
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
if(parseInt(_a1).toString()==_a1){
_a1=parseInt(_a1);
}else{
if(parseFloat(_a1).toString()==_a1){
_a1=parseFloat(_a1);
}else{
if(_a1=="true"||_a1=="false"){
_a1=eval(_a1);
}else{
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
var _b6=false;
if(this._uniqueKeys[key]){
_b6=true;
}
return _b6;
}};
var KeyMaster=new _KeyMaster();
function _ImageProvider(){
}
_ImageProvider.prototype={_logger:SystemLogger.getLogger("ImageProvider"),SERVICE_URL:"services/Icon/GetIcon.ashx",UI:"Composite.Icons",getImageURL:function(_b7,_b8){
var _b9=null;
var url=Constants.APPROOT+"/"+this.SERVICE_URL+"?resourceName=${name}&resourceNamespace=${hash}&size=${size}";
var _bb=_b7.ResourceNamespace;
var _bc=_b7.ResourceName;
_b8=_b8?_b8:"DEFAULT";
if(_bc!=null&&_bb!=null){
_b9=url.replace("${name}",_bc).replace("${hash}",_bb).replace("${size}",_b8);
if(_b8=="DEFAULT"){
_b9=_b9.split("&size=DEFAULT")[0];
}
}else{
throw "Could not compute image URL.";
}
return _b9;
}};
var ImageProvider=new _ImageProvider();
function _Resolver(){
}
_Resolver.prototype={_logger:SystemLogger.getLogger("Resolver"),resolve:function(_bd){
if(typeof _bd!=Types.UNDEFINED){
_bd=String(_bd);
_bd=_bd.replace("${root}",Constants.APPROOT);
_bd=_bd.replace("${skin}",Constants.SKINROOT);
_bd=_bd.replace("${tinymce}",Constants.TINYMCEROOT);
_bd=_bd.replace("${tiny}",Constants.TINYROOT);
if(_bd.indexOf("${icon:")>-1){
_bd=this._resolveImage(_bd);
}else{
if(_bd.indexOf("${string:")>-1){
_bd=this._resolveString(_bd);
}
}
}
return _bd;
},resolveVars:function(_be,_bf){
var i=0;
while(i<_bf.length){
_be=_be.replace("{"+i+"}",_bf[i]);
i++;
}
return _be;
},_resolveString:function(_c1){
var _c2=null;
var _c3=null;
var key=_c1.split("${string:")[1].split("}")[0];
if(key.indexOf(":")>-1){
_c3=key.split(":")[0];
key=key.split(":")[1];
}else{
_c3=StringBundle.UI;
}
_c2=StringBundle.getString(_c3,key);
if(!_c2){
_c2="(?)";
}
return _c2;
},_resolveImage:function(_c5){
var _c6=null;
var _c7=null;
var _c8=null;
var _c9=null;
_c8=_c5.split("${icon:")[1].split("}")[0];
if(_c8.indexOf(":")>-1){
_c7=_c8.split(":")[0];
_c8=_c8.split(":")[1];
}else{
_c7=ImageProvider.UI;
}
if(_c8.indexOf("(")>-1){
_c9=_c8.split("(")[1].split(")")[0];
_c8=_c8.split("(")[0];
}
_c6=ImageProvider.getImageURL({ResourceNamespace:_c7,ResourceName:_c8},_c9);
return _c6;
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
_Cookies.prototype={createCookie:function(_cc,_cd,_ce){
var _cf="";
if(_ce){
var _d0=new Date();
_d0.setTime(_d0.getTime()+(_ce*24*60*60*1000));
_cf="; expires="+_d0.toGMTString();
}
document.cookie=_cc+"="+escape(_cd)+_cf+"; path=/";
return this.readCookie(_cc);
},readCookie:function(_d1){
var _d2=null;
var _d3=_d1+"=";
var ca=document.cookie.split(";");
for(var i=0;i<ca.length;i++){
var c=ca[i];
while(c.charAt(0)==" "){
c=c.substring(1,c.length);
}
if(c.indexOf(_d3)==0){
_d2=unescape(c.substring(_d3.length,c.length));
}
}
return _d2;
},eraseCookie:function(_d7){
this.createCookie(_d7,"",-1);
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
var _d8=SystemLogger.getLogger("StatusBar");
var _d9=null;
var _da="${icon:error}";
var _db="${icon:warning}";
var _dc="${icon:loading}";
var _dd="${icon:message}";
var _de=null;
var _df=null;
var _e0=null;
var _e1=null;
this.initialize=function(_e2){
_de=StringBundle.getString("ui","Website.App.StatusBar.Error");
_df=StringBundle.getString("ui","Website.App.StatusBar.Warn");
_e0=StringBundle.getString("ui","Website.App.StatusBar.Busy");
_e1=StringBundle.getString("ui","Website.App.StatusBar.Ready");
_d9=_e2;
this.document=_e2.bindingDocument;
};
this.error=function(_e3,_e4){
this.state=StatusBar.ERROR;
_e3=_e3?_e3:_de;
show(_e3,_da,_e4,false);
};
this.warn=function(_e5,_e6){
this.state=StatusBar.WARN;
_e5=_e5?_e5:_df;
show(_e5,_db,_e6,false);
};
this.busy=function(_e7,_e8){
this.state=StatusBar.BUSY;
_e7=_e7?_e7:_e0;
show(_e7,_dc,_e8,false);
};
this.ready=function(_e9,_ea){
this.state=StatusBar.READY;
_e9=_e9?_e9:_e1;
show(_e9,_dd,_ea,true);
};
this.report=function(_eb,_ec,_ed,_ee){
this.state=null;
show(_eb,_ec,_ed,_ee);
};
this.clear=function(){
this.state=null;
if(_d9){
_d9.clear();
}
};
function show(_ef,_f0,_f1,_f2){
if(_f1){
_ef=Resolver.resolveVars(_ef,_f1);
}
if(_d9){
_d9.setLabel(_ef);
_d9.setImage(_f0);
if(_f2){
_d9.startFadeOut(StatusBar.AUTOCLEAR_TIMEOUT);
}
}else{
_d8.error("Message not initialized for display: "+_ef);
}
}
this.addToGroup=function(_f3,_f4){
if(!this._groups.has(_f3)){
this._groups.set(_f3,_d9.addRight(ToolBarGroupBinding.newInstance(this.document)));
}
this._groups.get(_f3).add(_f4);
};
}
var StatusBar=new _StatusBar();
function _Localization(){
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
EventBroadcaster.subscribe(BroadcastMessages.LANGUAGES_UPDATED,this);
EventBroadcaster.subscribe(BroadcastMessages.FROMLANGUAGE_UPDATED,this);
}
_Localization.prototype={languages:null,source:null,target:null,handleBroadcast:function(_f5,arg){
switch(_f5){
case BroadcastMessages.APPLICATION_LOGIN:
case BroadcastMessages.LANGUAGES_UPDATED:
var _f7=LocalizationService.GetActiveLocales(true);
if(_f7.length>=1){
this.languages=new List(_f7);
}else{
this.languages=null;
}
EventBroadcaster.broadcast(BroadcastMessages.UPDATE_LANGUAGES,this.languages);
break;
}
switch(_f5){
case BroadcastMessages.APPLICATION_LOGIN:
case BroadcastMessages.FROMLANGUAGE_UPDATED:
var _f8=LocalizationService.GetLocales(true);
this.source=_f8.ForeignLocaleName;
this.target=_f8.ActiveLocaleName;
EventBroadcaster.broadcast(BroadcastMessages.LOCALIZATION_CHANGED,{source:_f8.ForeignLocaleName,target:_f8.ActiveLocaleName});
break;
}
}};
var Localization=new _Localization();
function _Validator(){
}
_Validator.prototype={validate:function(_f9,key,_fb){
var _fc=true;
var _fd=SourceValidationService.ValidateSource(_f9,key);
if(_fd!="True"){
if(_fb==true){
this._dialog(_fd);
}
_fc=false;
}
return _fc;
},validateInformed:function(_fe,key){
return this.validate(_fe,key,true);
},_dialog:function(_100){
setTimeout(function(){
Dialog.error("Source Invalid",_100);
},0);
}};
var Validator=new _Validator();
function _DOMEvents(){
}
_DOMEvents.prototype={_logger:SystemLogger.getLogger("DOMEvents"),MOUSEDOWN:"mousedown",MOUSEUP:"mouseup",MOUSEOVER:"mouseover",MOUSEOUT:"mouseout",MOUSEMOVE:"mousemove",CLICK:"click",DOUBLECLICK:"dblclick",KEYPRESS:"keypress",KEYDOWN:"keydown",KEYUP:"keyup",CONTEXTMENU:"contextmenu",SCROLL:"scroll",LOAD:"load",BEFOREUNLOAD:"beforeunload",UNLOAD:"unload",RESIZE:"resize",FOCUS:"focus",BLUR:"blur",SUBMIT:"submit",CUT:"cut",COPY:"copy",PASTE:"paste",DOM:"DOMContentLoaded",ACTIVATE:"activate",DEACTIVATE:"deactivate",MOUSEENTER:"mouseenter",MOUSELEAVE:"mouseleave",SELECTSTART:"selectstart",FOCUSIN:"focusin",FOCUSOUT:"focusout",BEFOREUPDATE:"beforeupdate",AFTERUPDATE:"afterupdate",ERRORUPDATE:"errorupdate",_count:0,addEventListener:function(_101,_102,_103,_104){
this._count++;
this._eventListener(true,_101,_102,_103,_104);
if(_101&&typeof _101.nodeType!=Types.UNDEFINED){
if(_101.nodeType==Node.ELEMENT_NODE){
var win=DOMUtil.getParentWindow(_101);
if(win){
var _106={handleEvent:function(){
DOMEvents.removeEventListener(_101,_102,_103,_104);
DOMEvents.removeEventListener(win,DOMEvents.UNLOAD,_106);
}};
DOMEvents.addEventListener(win,DOMEvents.UNLOAD,_106);
}
}
}
},removeEventListener:function(_107,_108,_109,_10a){
this._count--;
this._eventListener(false,_107,_108,_109,_10a);
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
},cleanupEventListeners:function(_10f){
this._deleteWrappedHandler(_10f);
},isCurrentTarget:function(e){
var _111=false;
if(Client.isMozilla==true){
_111=e.target==e.currentTarget;
}
return true;
},_isChildOf:function(_112,_113){
var _114=true;
if(_112==_113){
_114=false;
}
if(_114==true){
while(_113!=null&&_113.nodeType!=Node.DOCUMENT_NODE&&_113!=_112){
_113=_113.parentNode;
}
_114=(_113==_112);
}
return _114;
},_eventListener:function(_115,_116,_117,_118,_119,_11a){
if(Interfaces.isImplemented(IEventListener,_118,true)){
if(typeof _117!=Types.UNDEFINED){
if(Client.isExplorer==true){
_118=this._getWrappedHandler(_116,_117,_118,_11a);
_116[this._getAction(_115)]("on"+_117,_118);
}else{
switch(_117){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSELEAVE:
_117=_117==DOMEvents.MOUSEENTER?DOMEvents.MOUSEOVER:DOMEvents.MOUSEOUT;
_116[this._getAction(_115)](_117,{handleEvent:function(e){
var rel=e.relatedTarget;
if(e.currentTarget==rel||DOMEvents._isChildOf(e.currentTarget,rel)){
}else{
_118.handleEvent(e);
}
}},_119?true:false);
break;
default:
_116[this._getAction(_115)](_117,_118,_119?true:false);
break;
}
}
}else{
throw "No such event allowed!";
}
}
},_getAction:function(_11d){
var _11e=null;
switch(_11d){
case true:
_11e=Client.isMozilla==true?"addEventListener":"attachEvent";
break;
case false:
_11e=Client.isMozilla==true?"removeEventListener":"detachEvent";
break;
}
return _11e;
},_getWrappedHandler:function(_11f,_120,_121,_122){
var _123=null;
try{
if(!_121._domEventHandlers){
_121._domEventHandlers={};
}
if(!_121._domEventHandlers[_11f]){
_121._domEventHandlers[_11f]={};
}
if(!_121._domEventHandlers[_11f][_120]){
var win=_11f.nodeType?DOMUtil.getParentWindow(_11f):_11f;
if(win){
_121._domEventHandlers[_11f][_120]=function(){
if(win.event&&_121){
_121.handleEvent(win.event);
}
};
}
}
_123=_121._domEventHandlers[_11f][_120];
}
catch(exception){
this._report(_11f,_120,_121,_122);
}
return _123;
},_deleteWrappedHandler:function(_125){
for(var _126 in _125._domEventHandlers){
if(_126){
for(var _127 in _125._domEventHandlers[_126]){
if(_127){
delete _125._domEventHandlers[_126][_127];
}
}
}
delete _125._domEventHandlers[_126];
}
},_report:function(_128,_129,_12a,_12b){
alert("DOMEvents.getWrappedHandler malfunction.\n\n"+"\ttarget: "+(_128?_128.nodeName:_128)+"\n"+"\tevent: "+_129+"\n"+"\thandler: "+_12a+"\n\n"+"Offending invoker: "+(_12b.callee?_12b.callee.toString():_12b.constructor));
}};
var DOMEvents=new _DOMEvents();
function _DOMSerializer(){
}
_DOMSerializer.prototype={_serializer:(Client.isMozilla?new XMLSerializer():null),serialize:function(node,_12d){
var _12e=null;
var _12f=node;
if(node.nodeType==Node.DOCUMENT_NODE){
_12f=node.documentElement;
}
if(Client.isMozilla==true){
if(_12d==true){
_12f=_12f.cloneNode(true);
_12f=DOMFormatter.format(_12f,DOMFormatter.INDENTED_TYPE_RESULT);
}
_12e=this._serializer.serializeToString(_12f);
}else{
_12e=_12f.xml;
}
return _12e;
}};
var DOMSerializer=new _DOMSerializer();
window.DOMFormatter=new function(){
var TAB="\t";
var NEW="\n";
var _132=new RegExp(/[^\t\n\r ]/);
this.ignoreCDATASections=false;
function indent(_133){
var doc=_133.ownerDocument;
var _135=function(node,_137){
if(node.hasChildNodes()&&node.firstChild.nodeType!=Node.TEXT_NODE){
var _138="",i=0;
while(i++<_137){
_138+=TAB;
}
var _13a=node.firstChild;
while(_13a){
switch(_13a.nodeType){
case Node.ELEMENT_NODE:
if(_13a==node.lastChild){
node.appendChild(doc.createTextNode(NEW+_138));
}
node.insertBefore(doc.createTextNode(NEW+_138+TAB),_13a);
_135(_13a,_137+1);
break;
case Node.COMMENT_NODE:
case Node.PROCESSING_INSTRUCTION_NODE:
case Node.CDATA_SECTION_NODE:
node.insertBefore(doc.createTextNode(NEW+_138+TAB),_13a);
break;
}
if(_13a.nodeType==Node.CDATA_SECTION_NODE){
if(!this.ignoreCDATASections){
formatCDATASection(_13a,_138+TAB);
}
}
_13a=_13a.nextSibling;
}
}
};
_135(_133,0);
}
function strip(_13b){
var _13c=[];
var _13d={acceptNode:function(_13e){
return (!_132.test(_13e.nodeValue))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
}};
var _13f=_13b.ownerDocument.createTreeWalker(_13b,NodeFilter.SHOW_TEXT,_13d,true);
while(_13f.nextNode()){
_13c.push(_13f.currentNode);
}
var i=0,_141;
while((_141=_13c[i++])!=null){
_141.parentNode.removeChild(_141);
}
}
function formatCDATASection(node,_143){
if(node.textContent.indexOf(NEW)>-1){
var _144=node.textContent.split(NEW);
var _145="",line,_147=0,_148=true;
while((line=_144.shift())!=null){
if(_147==0&&line.charAt(0)==TAB){
while(line.charAt(_147++)==TAB){
}
}
line=line.substring(_147,line.length);
if(_144.length>0){
_145+=_143+TAB+line;
_145+=_148?"":"\n";
}else{
_145+=_143+line;
_143=_143.slice(1,_143.length);
node.parentNode.appendChild(doc.createTextNode(NEW+_143));
}
_148=false;
}
node.textContent=_145;
}
}
this.format=function(_149,_14a){
var _14b=1;
if(document.createTreeWalker){
try{
strip(_149);
if(_14a!=_14b){
indent(_149);
}
}
catch(exception){
throw new Error(exception);
}
}
return (_149);
};
};
DOMFormatter.INDENTED_TYPE_RESULT=0;
DOMFormatter.STRIPPED_TYPE_RESULT=1;
function _DOMUtil(){
}
_DOMUtil.prototype={_logger:SystemLogger.getLogger("DOMUtil"),MSXML_MAXVERSION:6,MSXML_MINVERSION:1,MSXML_HTTPREQUEST:"MSXML2.XMLHTTP.{$version}.0",MSXML_DOMDOCUMENT:"MSXML2.DOMDocument.{$version}.0",MSXML_FREETHREADED:"MSXML2.FreeThreadedDOMDocument.{$version}.0",MSXML_XSLTEMPLATE:"MSXML2.XSLTemplate.{$version}.0",getMSComponent:function(_14c){
var sig,_14e=null,_14f=this.MSXML_MAXVERSION;
while(!_14e&&_14f>=this.MSXML_MINVERSION){
try{
sig=_14c.replace("{$version}",_14f);
_14e=new ActiveXObject(sig);
}
catch(exception){
}
_14f--;
}
return _14e;
},getXMLHTTPRequest:function(){
var _150=null;
if(Client.isExplorer){
_150=this.getMSComponent(this.MSXML_HTTPREQUEST);
}else{
_150=new XMLHttpRequest();
}
return _150;
},getDOMDocument:function(_151){
var _152=null;
if(Client.isExplorer){
_152=this.getMSComponent(_151?this.MSXML_FREETHREADED:this.MSXML_DOMDOCUMENT);
}else{
var doc=XMLParser.parse("<?xml version=\"1.0\" encoding=\"UTF-8\"?><ROOT/>");
doc.removeChild(doc.documentElement);
_152=doc;
}
return _152;
},getMSXMLXSLTemplate:function(){
var _154=null;
if(Client.isExplorer){
_154=this.getMSComponent(this.MSXML_XSLTEMPLATE);
}
return _154;
},getLocalName:function(_155){
var _156=null;
if(_155.localName){
_156=_155.localName;
}else{
if(_155.baseName){
_156=_155.baseName;
}else{
_156=_155.nodeName.toLowerCase();
}
}
return _156;
},getComputedStyle:function(_157,_158){
var _159=null;
if(Client.isExplorer){
if(_157.currentStyle!=null){
_159=_157.currentStyle[_158];
}else{
this._logger.error("Could not compute style for element "+_157.nodeName);
SystemDebug.stack(arguments);
}
}else{
_159=_157.ownerDocument.defaultView.getComputedStyle(_157,null).getPropertyValue(_158);
}
return _159;
},getMaxIndex:function(doc){
var max=0,_15c=new List(doc.getElementsByTagName("*"));
_15c.each(function(_15d){
var _15e=CSSComputer.getZIndex(_15d);
if(_15e>max){
max=_15e;
}
});
return max;
},getOrdinalPosition:function(_15f,_160){
var _161=null;
var _162=-1;
var _163=this.getLocalName(_15f);
var _164=new List(_15f.parentNode.childNodes);
while(_164.hasNext()){
var _165=_164.getNext();
if(_165.nodeType==Node.ELEMENT_NODE){
if(!_160||this.getLocalName(_165)==_163){
_162++;
if(_165==_15f||(_165.id!=""&&_165.id==_15f.id)){
_161=_162;
break;
}
}
}
}
return _161;
},isFirstElement:function(_166,_167){
return (this.getOrdinalPosition(_166,_167)==0);
},isLastElement:function(_168,_169){
var _16a=_168.parentNode.getElementsByTagName(_169?this.getLocalName(_168):"*");
return (this.getOrdinalPosition(_168)==_16a.length);
},getParentWindow:function(node){
var doc=node.nodeType==Node.DOCUMENT_NODE?node:node.ownerDocument;
return doc.defaultView?doc.defaultView:doc.parentWindow;
},getTextContent:function(node){
var _16e=null;
if(node.textContent){
_16e=node.textContent;
}else{
if(node.text){
_16e=node.text;
}else{
_16e=node.innerText;
}
}
return _16e;
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
},getAncestorByLocalName:function(_171,node,_173){
var _174=null;
while(_174==null){
node=node.parentNode;
if(node.nodeType==Node.DOCUMENT_NODE){
if(_173==true){
var win=this.getParentWindow(node);
node=win.frameElement;
}else{
break;
}
}
if(this.getLocalName(node)==_171){
_174=node;
}
}
return _174;
},contains:function(_176,node){
return _176.contains?_176!=node&&_176.contains(node):!!(_176.compareDocumentPosition(node)&16);
},createElementNS:function(_178,_179,_17a){
var _17b=null;
if(_17a==null){
alert("DOMUtil#createElementNS : Missing argument (DOMDocument)");
}else{
if(Client.isMozilla){
_17b=_17a.createElementNS(_178,_179);
}else{
if(_17a.xml!=null){
_17b=_17a.createNode(Node.ELEMENT_NODE,_179,_178);
}else{
_17b=_17a.createElement(_179);
}
}
}
return _17b;
},getElementsByTagName:function(node,_17d){
var _17e=null;
if(Client.isMozilla){
_17e=node.getElementsByTagNameNS(Constants.NS_XHTML,_17d);
}else{
_17e=node.getElementsByTagName(_17d);
}
return _17e;
},getNextElementSibling:function(_17f){
return Client.isExplorer?_17f.nextSibling:_17f.nextElementSibling;
},getPreviousElementSibling:function(_180){
return Client.isExplorer?_180.previousSibling:_180.previousElementSibling;
},cloneNode:function(node){
var _182=null;
if(Client.isMozilla==true){
_182=XMLParser.parse(DOMSerializer.serialize(node));
}else{
_182=node.cloneNode(true);
}
return _182;
},getLocalPosition:function(_183){
var _184=new Point(_183.offsetLeft,_183.offsetTop);
if(Client.isExplorer&&_183.parentNode&&_183.parentNode.currentStyle){
if(_183.parentNode.currentStyle.position=="static"){
var _185=this.getLocalPosition(_183.parentNode);
_184.x+=_185.x;
_184.y+=_185.y;
}
}
return _184;
},getGlobalPosition:function(_186){
return this._getPosition(_186,false);
},getUniversalPosition:function(_187){
return this._getPosition(_187,true);
},_getPosition:function(_188,_189){
var _18a=null;
if(typeof _188.getBoundingClientRect!=Types.UNDEFINED){
var rect=_188.getBoundingClientRect();
_18a={x:rect.left,y:rect.top};
if(Client.isMozilla){
_18a.x-=_188.scrollLeft;
_18a.y-=_188.scrollTop;
}
}else{
_18a={x:_188.offsetLeft-_188.scrollLeft,y:_188.offsetTop-_188.scrollTop};
while(_188.offsetParent){
_188=_188.offsetParent;
_18a.x+=(_188.offsetLeft-_188.scrollLeft);
_18a.y+=(_188.offsetTop-_188.scrollTop);
}
}
if(_189){
var win=DOMUtil.getParentWindow(_188);
if(win){
var _18d=win.frameElement;
if(_18d){
var add=DOMUtil.getUniversalPosition(_18d);
_18a.x+=add.x;
_18a.y+=add.y;
}
}
}
return new Point(_18a.x,_18a.y);
},getGlobalMousePosition:function(e){
return this._getMousePosition(e,false);
},getUniversalMousePosition:function(e){
return this._getMousePosition(e,true);
},_getMousePosition:function(e,_192){
var _193=DOMEvents.getTarget(e);
var _194={x:e.pageX?e.pageX:e.clientX,y:e.pageY?e.pageY:e.clientY};
if(Client.isMozilla){
var doc=_193.ownerDocument;
var win=this.getParentWindow(doc);
_194.x-=win.pageXOffset;
_194.y-=win.pageYOffset;
}
if(_192){
var _197=this.getParentWindow(_193).frameElement;
if(_197){
var add=this.getUniversalPosition(_197);
_194.x+=add.x;
_194.y+=add.y;
}
}
return _194;
}};
var DOMUtil=new _DOMUtil();
function _XMLParser(){
}
_XMLParser.prototype={_logger:SystemLogger.getLogger("XMLParser"),_domParser:(window.DOMParser!=null?new DOMParser():null),parse:function(xml,_19a){
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
if(!_19a){
this._logger.error(DOMSerializer.serialize(doc.documentElement,true));
if(Application.isDeveloperMode){
alert("XMLParser failed: \n\n"+DOMSerializer.serialize(doc.documentElement,true));
}
}
doc=null;
}
}else{
doc=DOMUtil.getDOMDocument();
doc.loadXML(xml);
if(doc.parseError.errorCode!=0){
if(!_19a){
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
},isWellFormedDocument:function(xml,_19d){
var _19e=true;
var dec="<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
if(xml.indexOf("<?xml ")==-1){
xml=dec+xml;
}
var _1a0=SourceValidationService.IsWellFormedDocument(xml);
if(_1a0!="True"){
_19e=false;
if(_19d==true){
this._illFormedDialog(_1a0);
}
}
return _19e;
},isWellFormedFragment:function(xml,_1a2){
var _1a3=true;
var _1a4=SourceValidationService.IsWellFormedFragment(xml);
if(_1a4!="True"){
_1a3=false;
if(_1a2==true){
this._illFormedDialog(_1a4);
}
}
return _1a3;
},_illFormedDialog:function(_1a5){
setTimeout(function(){
Dialog.error("Not well-formed",_1a5);
},0);
}};
var XMLParser=new _XMLParser();
function XPathResolver(){
this.logger=SystemLogger.getLogger("XPathResolver");
this._evaluator=window.XPathEvaluator?new XPathEvaluator():null;
this._nsResolver=null;
}
XPathResolver.prototype.setNamespacePrefixResolver=function(_1a6){
if(this._evaluator){
this._nsResolver={lookupNamespaceURI:function(_1a7){
return _1a6[_1a7];
}};
}else{
this._nsResolver=_1a6;
}
};
XPathResolver.prototype.resolve=function(_1a8,node,_1aa){
var _1ab=null;
try{
if(this._evaluator){
_1ab=this._evaluateDOMXpath(_1a8,node,_1aa?true:false);
}else{
_1ab=this._evaluateMSXpath(_1a8,node,_1aa?true:false);
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
return _1ab;
};
XPathResolver.prototype.resolveAll=function(_1ac,node){
return this.resolve(_1ac,node,true);
};
XPathResolver.prototype._evaluateDOMXpath=function(_1ae,node,_1b0){
var _1b1=null;
if(node){
var _1b1=this._evaluator.evaluate(_1ae,node,this._nsResolver,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
if(_1b0){
var list=new List();
while((node=_1b1.iterateNext())!=null){
list.add(node);
}
_1b1=list;
}else{
_1b1=_1b1.iterateNext();
}
}else{
var cry="XPathResolver#_evaluateDOMXpath: No DOMNode to evaluate!";
if(Application.isDeveloperMode){
alert(cry);
}else{
this.logger.fatal(cry);
}
}
return _1b1;
};
XPathResolver.prototype._evaluateMSXpath=function(_1b4,node,_1b6){
var doc=(node.nodeType==Node.DOCUMENT_NODE?node:node.ownerDocument);
var _1b8="";
for(var _1b9 in this._nsResolver){
_1b8+="xmlns:"+_1b9+"=\""+this._nsResolver[_1b9]+"\" ";
}
doc.setProperty("SelectionNamespaces",_1b8);
if(_1b6){
var list=new List();
var i=0,_1bc=node.selectNodes(_1b4);
while(i<_1bc.length){
list.add(_1bc.item(i++));
}
result=list;
}else{
result=node.selectSingleNode(_1b4);
}
return result;
};
function XSLTransformer(){
this.logger=SystemLogger.getLogger("XSLTransformer");
this._processor=null;
this._cache=null;
}
XSLTransformer.prototype.importStylesheet=function(url){
var _1be=this._import(Resolver.resolve(url));
if(Client.isMozilla){
this._processor=new XSLTProcessor();
this._processor.importStylesheet(_1be);
}else{
this._cache=DOMUtil.getMSXMLXSLTemplate();
this._cache.stylesheet=_1be;
}
};
XSLTransformer.prototype._import=function(url){
var _1c0=null;
if(Client.isMozilla){
var _1c1=DOMUtil.getXMLHTTPRequest();
_1c1.open("get",Resolver.resolve(url),false);
_1c1.send(null);
_1c0=_1c1.responseXML;
}else{
var _1c0=DOMUtil.getDOMDocument(true);
_1c0.async=false;
_1c0.load(url);
}
return _1c0;
};
XSLTransformer.prototype.transformToDocument=function(dom){
var _1c3=null;
if(Client.isMozilla){
_1c3=this._processor.transformToDocument(dom);
}else{
alert("TODO!");
}
return _1c3;
};
XSLTransformer.prototype.transformToString=function(dom,_1c5){
var _1c6=null;
if(Client.isMozilla){
var doc=this.transformToDocument(dom);
_1c6=DOMSerializer.serialize(doc,_1c5);
}else{
var proc=this._cache.createProcessor();
proc.input=dom;
proc.transform();
_1c6=proc.output;
}
return _1c6;
};
function _CSSUtil(){
}
_CSSUtil.prototype={_getCurrent:function(_1c9){
var _1ca=_1c9.style?_1c9.className:_1c9.getAttribute("class");
_1ca=_1ca?_1ca:"";
return _1ca;
},_contains:function(_1cb,sub){
return _1cb.indexOf(sub)>-1;
},_attach:function(_1cd,sub){
return _1cd+(_1cd==""?"":" ")+sub;
},_detach:function(_1cf,sub){
if(this._contains(_1cf," "+sub)){
sub=" "+sub;
}
return _1cf.replace(sub,"");
},attachClassName:function(_1d1,_1d2){
if(_1d1.classList!=null){
if(!_1d1.classList.contains(_1d2)){
_1d1.classList.add(_1d2);
}
}else{
var _1d3=this._getCurrent(_1d1);
if(!this._contains(_1d3,_1d2)){
_1d3=this._attach(_1d3,_1d2);
}
if(_1d1.style!=null){
_1d1.className=_1d3;
}else{
_1d1.setAttribute("class",_1d3);
}
}
},detachClassName:function(_1d4,_1d5){
if(_1d4.classList!=null){
if(_1d4.classList.contains(_1d5)){
_1d4.classList.remove(_1d5);
}
}else{
var _1d6=this._getCurrent(_1d4);
if(this._contains(_1d6,_1d5)){
_1d6=this._detach(_1d6,_1d5);
}
if(_1d4.style!=null){
_1d4.className=_1d6;
}else{
if(_1d6==""){
_1d4.removeAttribute("class");
}else{
_1d4.setAttribute("class",_1d6);
}
}
}
},hasClassName:function(_1d7,_1d8){
var _1d9=false;
if(_1d7.classList!=null){
_1d9=_1d7.classList.contains(_1d8);
}else{
_1d9=this._contains(this._getCurrent(_1d7),_1d8);
}
return _1d9;
}};
var CSSUtil=new _CSSUtil();
function _CSSComputer(){
}
_CSSComputer.prototype={_margins:{top:Client.isExplorer?"marginTop":"margin-top",right:Client.isExplorer?"marginRight":"margin-right",bottom:Client.isExplorer?"marginBottom":"margin-bottom",left:Client.isExplorer?"marginLeft":"margin-left"},_paddings:{top:Client.isExplorer?"paddingTop":"padding-top",right:Client.isExplorer?"paddingRight":"padding-right",bottom:Client.isExplorer?"paddingBottom":"padding-bottom",left:Client.isExplorer?"paddingLeft":"padding-left"},_borders:{top:Client.isExplorer?"borderTopWidth":"border-top-width",right:Client.isExplorer?"borderRightWidth":"border-right-width",bottom:Client.isExplorer?"borderBottomWidth":"border-bottom-width",left:Client.isExplorer?"borderLeftWidth":"border-left-width"},_getComplexResult:function(_1da,_1db){
var _1dc={};
for(var _1dd in _1da){
var ent=parseInt(DOMUtil.getComputedStyle(_1db,_1da[_1dd]));
_1dc[_1dd]=isNaN(ent)?0:ent;
}
return _1dc;
},_getMargin:function(_1df){
return this._getComplexResult(this._margins,_1df);
},getPadding:function(_1e0){
return this._getComplexResult(this._paddings,_1e0);
},getBorder:function(_1e1){
return this._getComplexResult(this._borders,_1e1);
},getPosition:function(_1e2){
return DOMUtil.getComputedStyle(_1e2,"position");
},getFloat:function(_1e3){
return DOMUtil.getComputedStyle(_1e3,Client.isExplorer?"styleFloat":"float");
},getZIndex:function(_1e4){
return parseInt(DOMUtil.getComputedStyle(_1e4,Client.isExplorer?"zIndex":"z-index"));
},getBackgroundColor:function(_1e5){
return DOMUtil.getComputedStyle(_1e5,Client.isExplorer?"backgroundColor":"background-color");
}};
var CSSComputer=new _CSSComputer();
var System=new function(){
var _1e6=SystemLogger.getLogger("System");
var root=null;
this.hasActivePerspectives=false;
this.getRootNode=function(){
if(root==null){
root=new SystemNode(TreeService.GetRootElements("")[0]);
}
return root;
};
this.getPerspectiveNodes=function(){
var _1e8=new List();
var _1e9=TreeService.GetActivePerspectiveElements("dummy");
var list=new List(_1e9);
if(list.hasEntries()){
this.hasActivePerspectives=true;
list.each(function(_1eb){
_1e8.add(new SystemNode(_1eb));
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVES_NONE);
}
return _1e8;
};
this.getChildNodes=function(node,_1ed){
var _1ee=new List();
var _1ef=null;
if(_1ed){
if(SearchTokens.hasToken(_1ed)){
_1ed=SearchTokens.getToken(_1ed);
}
_1ef=TreeService.GetElementsBySearchToken(node.getData(),_1ed);
}else{
_1ef=TreeService.GetElements(node.getData());
}
new List(_1ef).each(function(_1f0){
var _1f1=new SystemNode(_1f0);
if(_1ed){
_1f1.searchToken=_1ed;
}
_1ee.add(_1f1);
});
return _1ee;
};
this.getDescendantBranch=function(_1f2){
var map=new Map();
var arg=[];
_1f2.each(function(node){
arg.push({ProviderName:node.getProviderName(),EntityToken:node.getEntityToken(),Piggybag:node.getPiggyBag()});
});
var _1f6=TreeService.GetMultipleChildren(arg);
var _1f7=new List(_1f6);
while(_1f7.hasNext()){
this._listNodesInMap(_1f7.getNext(),map);
}
return map;
};
this.getInvisibleBranch=function(_1f8,_1f9,_1fa){
var map=new Map();
var arg=[];
_1fa.each(function(node){
arg.push({ProviderName:node.getProviderName(),EntityToken:node.getEntityToken(),Piggybag:node.getPiggyBag()});
});
var _1fe=TreeService.FindEntityToken(_1f8,_1f9,arg);
if(_1fe instanceof SOAPFault){
_1e6.error(_1fe.getFaultString());
if(Application.isDeveloperMode){
alert(_1fe.getFaultString());
}
map=null;
}else{
var _1ff=new List(_1fe);
while(_1ff.hasNext()){
this._listNodesInMap(_1ff.getNext(),map);
}
}
return map;
};
this._listNodesInMap=function(_200,map){
var list=new List();
var key=_200.ElementKey;
var _204=new List(_200.ClientElements);
map.set(key,list);
while(_204.hasNext()){
var _205=_204.getNext();
list.add(new SystemNode(_205));
}
};
this.getChildNodesBySearchToken=function(node,_207){
return this.getChildNodes(node,_207);
};
this.getNamedRoots=function(key,_209){
var _20a=new List();
var _20b=null;
if(_209){
if(SearchTokens.hasToken(_209)){
_209=SearchTokens.getToken(_209);
}
_20b=TreeService.GetNamedRootsBySearchToken(key,_209);
}else{
_20b=TreeService.GetNamedRoots(key);
}
new List(_20b).each(function(_20c){
var node=new SystemNode(_20c);
if(_209){
node.searchToken=_209;
}
_20a.add(node);
});
return _20a;
};
this.getNamedRootsBySearchToken=function(key,_20f){
return this.getNamedRoots(key,_20f);
};
function compileActionList(node,_211,_212){
var _213=_211.ClientElementActionGroupId;
if(_213!=null){
var _214=_212.get(_213).ClientElementActionGroupItems;
if(_214&&_214.length>0){
node.setActionList(new List(_214));
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
new List(self._data.Actions).each(function(_21a){
var _21b=_21a.ActionCategory.Name;
if(SystemAction.hasCategory(_21b)){
var _21c=new SystemAction(_21a);
SystemAction.actionMap.set(_21a.ActionKey,_21c);
}else{
throw "No such action category: "+_21b;
}
});
}
});
};
SystemNode.prototype.getData=function(){
return this._data;
};
SystemNode.prototype.getChildren=function(){
var _21d=null;
if(this.searchToken){
_21d=System.getChildNodesBySearchToken(this,this.searchToken);
}else{
_21d=System.getChildNodes(this);
}
return _21d;
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
var _21f=this._data.Piggybag;
if(_21f==null){
_21f="";
}
return _21f;
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
var _221=null;
if(typeof this._data.ToolTip!="undefined"){
_221=this._data.ToolTip;
}
return _221;
};
SystemNode.prototype.getPropertyBag=function(){
if(!this._propertyBag&&this._data.PropertyBag&&this._data.PropertyBag.length!=0){
var map={};
new List(this._data.PropertyBag).each(function(_223){
map[_223.Key]=_223.Value;
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
var _227=SystemAction.actionMap.get(key);
var _228=true;
if(_227.getCategory()==SystemAction.categories.DeveloperMode){
if(!Application.isDeveloperMode){
_228=false;
}
}
if(_228){
var id=_227.getGroupID();
if(!map.has(id)){
map.set(id,new List());
}
var list=map.get(id);
list.add(_227);
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
SystemAction.taggedActions=new Map();
SystemAction.actionMap=new Map();
SystemAction.invoke=function(_22b,arg){
var node=arg;
if(node instanceof SystemNode){
Application.lock(SystemAction);
_22b.logger.debug("Execute \""+_22b.getLabel()+"\" on \""+node.getLabel()+"\".");
setTimeout(function(){
TreeService.ExecuteSingleElementAction(node.getData(),_22b.getHandle(),Application.CONSOLE_ID);
MessageQueue.update();
Application.unlock(SystemAction);
},0);
}else{
throw "Multiple actiontargets not supported.";
}
};
SystemAction.invokeTagged=function(_22e,_22f){
action=SystemAction.taggedActions.get(_22e);
node=SystemNode.taggedNodes.get(_22f);
SystemAction.invoke(action,node);
};
SystemAction.hasCategory=function(_230){
return SystemAction.categories[_230]?true:false;
};
function SystemAction(_231){
this.logger=SystemLogger.getLogger("SystemAction");
this._data=_231;
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
SystemAction.prototype.isInToolBar=function(){
return this._data.ActionCategory.IsInToolbar;
};
SystemAction.prototype.isInFolder=function(){
return this._data.ActionCategory.IsInFolder;
};
SystemAction.prototype.getFolderName=function(){
var _232=null;
if(this.isInFolder()){
_232=this._data.ActionCategory.FolderName;
}
return _232;
};
SystemAction.prototype.isDisabled=function(){
return this._data.Disabled;
};
SystemAction.prototype.isCheckBox=function(){
return typeof this._data.CheckboxStatus!=Types.UNDEFINED;
};
SystemAction.prototype.getTag=function(){
var _233=null;
if(typeof this._data.TagValue!="undefined"){
_233=this._data.TagValue;
}
return _233;
};
SystemAction.prototype.isChecked=function(){
var _234=null;
if(this.isCheckBox()){
_234=this._data.CheckboxStatus=="Checked";
}else{
throw "Not a checkbox!";
}
return _234;
};
function _UpdateManager(){
var _235=null;
if(!window.UpdateManager){
this._construct();
_235=this;
}
return _235;
}
_UpdateManager.prototype={version:"0.1",CLASSNAME_FORM:"updateform",CLASSNAME_ZONE:"updatezone",CLASSNAME_GONE:"updategone",EVENT_BEFOREUPDATE:"beforeupdate",EVENT_AFTERUPDATE:"afterupdate",EVENT_ERRORUPDATE:"errorupdate",xhtml:null,summary:null,isEnabled:true,isDebugging:false,isUpdating:false,hasSoftAttributes:false,hasSoftSiblings:false,pendingResponse:null,currentDOM:null,errormessage:null,_assistant:null,_updates:null,_replaced:null,_dotnetnames:["__VIEWSTATE","__EVENTVALIDATION","__EVENTTARGET","__EVENTARGUMENT","__LASTFOCUS"],plugins:[],toString:function(){
return "[object UpdateManager]";
},_construct:function(_236){
var root=document.documentElement;
var _238=root.namespaceURI;
if(_238==null){
_238=new String(root.getAttribute("xmlns"));
}
if(_238=="http://www.w3.org/1999/xhtml"){
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
var _239=decodeURIComponent(this.xhtml);
this.currentDOM=UpdateAssistant.parse(_239);
}else{
throw new TypeError();
}
}else{
var _23a=this;
UpdateAssistant.getXMLHttpRequest("get",window.location.toString(),{handleResponse:function(dom){
_23a.currentDOM=dom;
}}).send(null);
}
}
}
},setupForms:function(){
var _23c=false;
Array.forEach(document.forms,function(form){
if(form.className.indexOf(this.CLASSNAME_FORM)>-1){
if(!form.__isSetup){
this._setupForm(form);
form.__isSetup=true;
}
_23c=true;
}
},this);
return _23c;
},_setupForm:function(form){
var _23f=this;
this._addListener(form,"submit");
form.__submit=form.submit;
form.submit=function(){
if(_23f.isEnabled){
_23f._submit(form);
}else{
form.__submit();
}
return false;
};
},_addListener:function(_240,type){
if(_240.addEventListener!=null){
_240.addEventListener(type,this,false);
}else{
var _242=this;
_240.attachEvent("on"+type,function(){
_242.handleEvent(window.event);
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
var _247=UpdateAssistant.getUpdateZones(dom);
var _248=UpdateAssistant.getUpdateZones(this.currentDOM);
this._updates=[];
this._replaced={};
_247.forEach(function(_249,_24a){
var _24b=_248[_24a];
this._crawl(_249,_24b);
},this);
this._updates.forEach(function(_24c,_24d){
_24c.update();
_24c.dispose();
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
},_crawl:function(_24f,_250,_251,id){
var _253=true;
var _254=_250.getAttribute("class");
if(_254==null||_254.indexOf(this.CLASSNAME_GONE)==-1){
if(_250.nodeType==Node.ELEMENT_NODE){
var _255=_250.getAttribute("id");
if(_255!=null){
_251=_24f;
id=_255;
}
}
if(_253=this._check(_24f,_250,_251,id)){
var _256=_24f.firstChild;
var _257=_250.firstChild;
while(_256!=null&&_257!=null&&!this._replaced[id]){
switch(_256.nodeType){
case Node.TEXT_NODE:
_253=this._check(_256,_257,_251,id);
break;
case Node.DOCUMENT_NODE:
case Node.ELEMENT_NODE:
_253=this._crawl(_256,_257,_251,id);
break;
}
if(this._replaced[id]){
_253=false;
}else{
_256=_256.nextSibling;
_257=_257.nextSibling;
}
}
}
}
return _253;
},_check:function(_258,_259,_25a,id){
var _25c=true;
var _25d=null;
var _25e=false;
var _25f=false;
if((_258!=null&&_259==null)||(_258==null&&_259!=null)){
_25c=false;
}else{
if(_25c=_258.nodeType==_259.nodeType){
switch(_259.nodeType){
case Node.ELEMENT_NODE:
if(_258.namespaceURI!=_259.namespaceURI||_258.nodeName!=_259.nodeName){
_25c=false;
}else{
if(_25c=(_258.nodeName==_259.nodeName)){
var _260=_259.getAttribute("id");
var _261=_258.getAttribute("id");
if(_260!=null&&_261!=null){
if(_260!=_261){
_25c=false;
}else{
if((_25d=this._getPlugin(_258,_259))!=null){
if(_25d.updateElement(_258,_259)){
_25f=true;
_25c=false;
}
}
}
}
if(_25c){
if(_25c=this._checkAttributes(_258,_259)){
if(this.hasSoftSiblings&&this._hasSoftChildren(_258)&&this._hasSoftChildren(_259)){
if(this._validateSoftChildren(_258,_259)){
this._updateSoftChildren(_258,_259);
_25e=true;
}
_25c=false;
}else{
_25c=_258.childNodes.length==_259.childNodes.length;
}
}
}
}
}
break;
case Node.TEXT_NODE:
if(_258.data.trim()!=_259.data.trim()){
_25c=false;
}
break;
}
}
}
if(_25c==false&&!_25e&&!_25f){
if(id!=null&&_25a!=null){
this.addUpdate(new ReplaceUpdate(id,_25a));
}
}
return _25c;
},_checkAttributes:function(_262,_263){
var _264=true;
var _265=false;
var _266=_262.attributes;
var _267=_263.attributes;
if(_266.length!=_267.length){
_265=true;
}else{
_265=!Array.every(_266,function(att1,i){
var att2=_267.item(i);
return att1.nodeName==att2.nodeName&&att1.nodeValue==att2.nodeValue;
});
}
if(_265){
var _26b=_262.getAttribute("id");
var _26c=_263.getAttribute("id");
if(this.hasSoftAttributes&&_26b!=null&&_26b==_26c){
this.addUpdate(new AttributesUpdate(_26c,_262,_263));
}else{
_264=false;
}
}
return _264;
},_hasSoftChildren:function(_26d){
var _26e=true;
if(_26d.hasChildNodes()){
_26e=Array.every(_26d.childNodes,function(node){
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
return _26e;
},_validateSoftChildren:function(_271,_272){
var _273=true;
var _274=-1;
var _275=-1;
var _276=-1;
var news=this._toMap(_271.childNodes,true);
var olds=this._toMap(_272.childNodes,true);
for(var id in olds){
if(_273){
var _27a=olds[id];
_273=_27a>=_274;
if(news[id]!=null){
_276=news[id];
_273=_276>=_275;
}
}
_274=_27a;
if(_276>-1){
_275=_276;
}
}
return _273;
},_updateSoftChildren:function(_27b,_27c){
var news=this._toMap(_27b.childNodes);
var olds=this._toMap(_27c.childNodes);
for(var id in olds){
if(news[id]==null){
this.addUpdate(new SiblingUpdate(Update.TYPE_REMOVE,id,null,null));
}else{
this._crawl(news[id],olds[id]);
}
}
var _280=null;
for(id in news){
if(olds[id]==null){
var _281=news[id];
if(_280==null){
var _282=_27c.getAttribute("id");
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_282,_281,true));
}else{
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_280,_281,false));
}
}
_280=id;
}
},addUpdate:function(_283){
this._updates.push(_283);
if(_283 instanceof ReplaceUpdate){
this._replaced[_283.id]=true;
}
},_getPlugin:function(_284,_285){
var _286=null;
this.plugins.every(function(_287){
if(_287.handleElement(_284,_285)){
_286=_287;
}
return _286==null;
});
return _286;
},_toMap:function(_288,_289){
var _28a={};
Array.forEach(_288,function(node,_28c){
if(node.nodeType==Node.ELEMENT_NODE){
_28a[node.getAttribute("id")]=_289?_28c:node;
}
});
return _28a;
},_getPost:function(form){
var _28e=new String("");
if(form!=null){
var last="";
Array.forEach(form.elements,function(_290){
var name=_290.name;
var _292=encodeURIComponent(_290.value);
switch(_290.type){
case "button":
case "submit":
var _293=UpdateAssistant.getActiveElement();
if(_290==_293&&name!=""){
_28e+=name+"="+_292+"&";
}
break;
case "radio":
if(_290.checked){
_28e+=name+"="+_292+"&";
}
break;
case "checkbox":
if(_290.checked){
if(_290.name==last){
if(_28e.lastIndexOf("&")==_28e.length-1){
_28e=_28e.substr(0,_28e.length-1);
}
_28e+=","+_292;
}else{
_28e+=name+"="+_290.value;
}
last=name;
_28e+="&";
}
break;
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_28e+=name+"="+_292+"&";
break;
}
});
}
return _28e.substr(0,_28e.length-1);
},_postRequest:function(form){
var _295=form.method!=""?form.method:"get";
var _296=form.action!=""?form.action:window.location.toString();
var _297=this._getPost(form);
if(_295=="get"){
if(_296.indexOf("?")>-1){
_296=_296+"&"+_297;
}else{
_296+"?"+_297;
}
}
var _298=this;
var _299=UpdateAssistant.getXMLHttpRequest(_295,_296,this);
if(_295=="post"){
_299.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
}
_299.send(_295=="post"?_297:null);
},_fixdotnet:function(dom,id){
var _29c=document.getElementById(id);
if(_29c!=null){
var _29d=UpdateAssistant.getElementById(dom,id);
if(_29d!=null){
var _29e=_29d.getAttribute("value");
if(_29e!==_29c.value){
_29c.value=_29e;
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
},report:function(_2a1){
this.summary+=_2a1+"\n";
}};
var UpdateManager=new _UpdateManager();
function _UpdateAssistant(){
var _2a2=null;
if(!window.UpdateAssistant){
this._construct();
_2a2=this;
}
return _2a2;
}
_UpdateAssistant.prototype={_serializer:window.XMLSerializer!=null?new XMLSerializer():null,_parser:window.DOMParser!=null?new DOMParser():null,_activeElement:null,_construct:function(){
if(!window.Node){
window.Node={ELEMENT_NODE:1,TEXT_NODE:3,DOCUMENT_NODE:9};
}
if(!Array.every){
Array.every=function(_2a3,fun){
var _2a5=true;
var len=_2a3.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2a7=arguments[2];
for(var i=0;i<len;i++){
if(typeof _2a3[i]!="undefined"){
if(!fun.call(_2a7,_2a3[i],i,_2a3)){
_2a5=false;
break;
}
}
}
}
return _2a5;
};
}
if(!Array.prototype.every){
Array.prototype.every=function(fun){
var _2aa=arguments[1];
return Array.every(this,fun,_2aa);
};
}
if(!Array.forEach){
Array.forEach=function(_2ab,fun){
var len=_2ab.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2ae=arguments[2];
for(var i=0;i<len;i++){
if(typeof _2ab[i]!="undefined"){
fun.call(_2ae,_2ab[i],i,_2ab);
}
}
}
};
}
if(!Array.prototype.forEach){
Array.prototype.forEach=function(fun){
var _2b1=arguments[1];
Array.forEach(this,fun,_2b1);
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
},getXMLHttpRequest:function(_2b3,_2b4,_2b5){
var _2b6=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Msxml2.XMLHTTP.3.0");
if(_2b6!=null){
_2b6.open(_2b3,_2b4,(_2b5!=null?true:false));
if(_2b5!=null){
function action(){
if(_2b6.readyState==4){
var text=_2b6.responseText;
UpdateManager.pendingResponse=text;
var dom=UpdateAssistant.parse(text);
if(dom!=null){
_2b5.handleResponse(dom);
}
}
}
if(_2b6.addEventListener!=null){
_2b6.addEventListener("readystatechange",{handleEvent:function(){
action();
}},false);
}else{
_2b6.onreadystatechange=action;
}
}
}
return _2b6;
},dispatchEvent:function(_2b9,name){
var _2bb=true;
if(_2b9.fireEvent!=null){
_2bb=_2b9.fireEvent("on"+name);
}else{
var _2bc=document.createEvent("UIEvents");
_2bc.initEvent(name,true,true);
_2bb=_2b9.dispatchEvent(_2bc);
}
return _2bb;
},getUpdateZones:function(dom){
var _2be="//*[@id and contains(@class,'updatezone')]";
var _2bf=[];
var _2c0=null;
var _2c1=null;
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2c0=dom.evaluate(_2be,dom,null,type,null);
while((_2c1=_2c0.iterateNext())!=null){
_2bf.push(_2c1);
}
}else{
_2c0=dom.documentElement.selectNodes(_2be);
Array.forEach(_2c0,function(_2c3){
_2bf.push(_2c3);
});
}
return _2bf;
},getElementById:function(dom,id){
var _2c6="//*[@id='"+id+"']";
var _2c7=null;
var _2c8=null;
if(window.XPathResult!=null){
var type=XPathResult.FIRST_ORDERED_NODE_TYPE;
_2c7=dom.evaluate(_2c6,dom,null,type,null);
_2c8=_2c7.singleNodeValue;
}else{
_2c8=dom.documentElement.selectNodes(_2c6)[0];
}
return _2c8;
},_getIds:function(dom){
var _2cb="//*[@id]";
var _2cc=null;
var _2cd=[];
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2cc=dom.evaluate(_2cb,dom,null,type,null);
while((element=_2cc.iterateNext())!=null){
_2cd.push(element.getAttribute("id"));
}
}else{
_2cc=dom.documentElement.selectNodes(_2cb);
Array.forEach(_2cc,function(_2cf){
_2cd.push(_2cf.getAttribute("id"));
});
}
return _2cd;
},toHTMLElement:function(_2d0){
var _2d1=this.serialize(_2d0);
var temp=document.createElement("temp");
temp.innerHTML=_2d1;
return temp.firstChild;
},getActiveElement:function(){
var _2d3=document.activeElement;
if(_2d3==null||_2d3==document.body){
_2d3=this._activeElement;
}
return _2d3;
},serialize:function(_2d4){
var _2d5=null;
if(this._serializer!=null){
_2d5=this._serializer.serializeToString(_2d4);
}else{
_2d5=_2d4.xml;
}
return _2d5;
},hasDifferences:function(_2d6,_2d7){
var s1=null;
var s2=null;
if(this._serializer!=null){
s1=this._serializer.serializeToString(_2d6);
s2=this._serializer.serializeToString(_2d7);
}else{
s1=_2d6.xml;
s2=_2d7.xml;
}
return s1!=s2;
},parse:function(_2da){
var _2db=null;
if(this._parser!=null){
_2db=this._parser.parseFromString(_2da,"text/xml");
}else{
_2db=new ActiveXObject("Msxml2.DOMDocument.3.0");
_2db.setProperty("SelectionLanguage","XPath");
_2db.loadXML(_2da);
}
return this._validate(_2db);
},_validate:function(dom){
var out=null;
if(dom.parseError!=null&&dom.parseError.errorCode!=0){
out=dom.parseError.reason;
}else{
var _2de=dom.getElementsByTagName("parsererror").item(0);
if(_2de!=null){
out=_2de.textContent.replace(/\^/g,"").replace(/\-/g,"");
}
}
if(out==null){
var has={},ids=this._getIds(dom);
ids.every(function(id){
var _2e2=!has[id];
has[id]=true;
if(!_2e2){
out="Element \""+id+"\" encountered twice.";
}
return _2e2;
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
this.handleElement=function(_2e3,_2e4){
var _2e5=false;
switch(_2e3.nodeName.toLowerCase()){
case "input":
case "textarea":
switch(_2e3.getAttribute("id")){
case "__EVENTTARGET":
case "__EVENTARGUMENT":
case "__VIEWSTATE":
case "__EVENTVALIDATION":
_2e5=false;
break;
}
break;
}
return _2e5;
};
this.updateElement=function(_2e6,_2e7){
var id=_2e6.getAttribute("id");
var _2e9=document.getElementById(id);
if(_2e9!=null){
var _2ea=null;
switch(_2e9.nodeName.toLowerCase()){
case "input":
_2ea=_2e6.getAttribute("value");
break;
case "textarea":
_2ea=_2e6.textContent?_2e6.textContent:_2e6.text;
break;
}
if(_2ea==null){
_2ea="";
}
if(_2ea!=_2e9.value){
_2e9.value=_2ea;
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
},_beforeUpdate:function(_2eb){
var _2ec=true;
if(_2eb!=null){
_2eb.__updateType=this.type;
_2ec=UpdateAssistant.dispatchEvent(_2eb,Update.EVENT_BEFOREUPDATE);
}
return _2ec;
},_afterUpdate:function(_2ed){
var _2ee=true;
if(_2ed!=null){
_2ed.__updateType=this.type;
_2ee=UpdateAssistant.dispatchEvent(_2ed,Update.EVENT_AFTERUPDATE);
}
return _2ee;
}};
ReplaceUpdate.prototype=new Update();
ReplaceUpdate.superclass=Update.prototype;
function ReplaceUpdate(id,_2f0){
this.type=Update.TYPE_REPLACE;
this.id=id;
this.element=_2f0;
return this;
}
ReplaceUpdate.prototype.update=function(){
var _2f1,_2f2,_2f3=UpdateAssistant.toHTMLElement(this.element);
if((_2f1=document.getElementById(this.id))!=null){
if((_2f2=_2f1.parentNode)!=null){
if(this._beforeUpdate(_2f1)){
_2f2.replaceChild(_2f3,_2f1);
this._afterUpdate(_2f3);
}
}
}else{
UpdateManager.error("Element null point: "+this.id);
}
};
ReplaceUpdate.prototype._afterUpdate=function(_2f4){
var _2f5=ReplaceUpdate.superclass._afterUpdate.call(this,_2f4);
UpdateManager.report("Replaced element id=\""+this.id+"\"");
if(_2f4.nodeName=="form"||_2f4.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
return _2f5;
};
SiblingUpdate.prototype=new Update();
SiblingUpdate.superclass=Update.prototype;
function SiblingUpdate(type,id,_2f8,_2f9){
this.type=type;
this.id=id;
this.element=_2f8;
this.isFirst=_2f9;
return this;
}
SiblingUpdate.prototype.update=function(){
var _2fa=document.getElementById(this.id);
switch(this.type){
case Update.TYPE_REMOVE:
this._remove(_2fa);
break;
case Update.TYPE_INSERT:
this._insert(this.element,_2fa);
break;
}
};
SiblingUpdate.prototype._remove=function(_2fb){
var _2fc=_2fb.parentNode;
if(_2fc!=null){
if(this._beforeUpdate(_2fb)){
_2fc.removeChild(_2fb);
this._afterUpdate(_2fc);
}
}
};
SiblingUpdate.prototype._insert=function(_2fd,_2fe){
var _2ff=UpdateAssistant.toHTMLElement(_2fd);
if(this.isFirst){
var _300=_2fe;
if(_300!=null){
if(this._beforeUpdate(_300)){
_300.insertBefore(_2ff,_300.firstChild);
this._afterUpdate(_2ff);
}
}
}else{
var _300=_2fe.parentNode;
if(_300!=null){
if(this._beforeUpdate(_300)){
_300.insertBefore(_2ff,_2fe.nextSibling);
this._afterUpdate(_2ff);
}
}
}
};
SiblingUpdate.prototype._beforeUpdate=function(_301){
var _302=SiblingUpdate.superclass._beforeUpdate.call(this,_301);
if(this.type==Update.TYPE_REMOVE){
UpdateManager.report("Removed element id=\""+_301.id+"\"");
}
return _302;
};
SiblingUpdate.prototype._afterUpdate=function(_303){
var _304=true;
if(_303!=null){
_304=SiblingUpdate.superclass._afterUpdate.call(this,_303);
if(this.type==Update.TYPE_INSERT){
UpdateManager.report("Inserted element id=\""+_303.id+"\"");
if(_303.nodeName=="form"||_303.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
}
}
return _304;
};
AttributesUpdate.prototype=new Update();
AttributesUpdate.superclass=Update.prototype;
AttributesUpdate.prototype.currentElement=null;
function AttributesUpdate(id,_306,_307){
this.type=type=Update.TYPE_ATTRIBUTES;
this.id=id;
this.element=_306;
this.currentElement=_307;
this._summary=[];
return this;
}
AttributesUpdate.prototype.update=function(){
var _308=document.getElementById(this.id);
if(this._beforeUpdate(_308)){
this._updateAttributes(_308);
this._afterUpdate(_308);
}
};
AttributesUpdate.prototype._updateAttributes=function(_309){
Array.forEach(this.element.attributes,function(_30a){
var _30b=this.currentElement.getAttribute(_30a.nodeName);
if(_30b==null||_30b!=_30a.nodeValue){
this._setAttribute(_309,_30a.nodeName,_30a.nodeValue);
this._summary.push("@"+_30a.nodeName);
}
},this);
Array.forEach(this.currentElement.attributes,function(_30c){
if(this.element.getAttribute(_30c.nodeName)==null){
this._setAttribute(_309,_30c.nodeName,null);
this._summary.push("@"+_30c.nodeName);
}
},this);
};
AttributesUpdate.prototype._setAttribute=function(_30d,name,_30f){
if(_30d==null){
alert(this.id+": "+document.getElementById(this.id)+"\n\n"+name+"="+_30f);
SystemLogger.getLogger("AttributesUpdate").fine(document.body.innerHTML);
}
var _310=(_30f==null);
if(_310){
_30d.removeAttribute(name);
}else{
_30d.setAttribute(name,_30f);
}
if(document.all!=null){
if(_310){
_30f="";
}
switch(name.toLowerCase()){
case "class":
_30d.className=_30f;
break;
case "disabled":
_30d.disabled=!_310;
break;
case "checked":
_30d.checked=!_310;
break;
case "readonly":
_30d.readOnly=!_310;
break;
}
}
};
AttributesUpdate.prototype._afterUpdate=function(_311){
AttributesUpdate.superclass._afterUpdate.call(this,_311);
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
_WindowManager.prototype={WINDOW_LOADED_BROADCAST:null,WINDOW_UNLOADED_BROADCAST:null,WINDOW_EVALUATED_BROADCAST:null,WINDOW_RESIZED_BROADCAST:null,isWindowLoaded:false,_logger:SystemLogger.getLogger("WindowManager ["+document.title+"]"),_ondomstatements:new List(),_onloadstatements:new List(),_onresizestatements:new List(),_currentDimensions:null,_newDimensions:null,_broadcastTimeout:null,_isHorizontalResize:false,_isVerticalResize:false,_broadcastTimeout:null,_compute:function(_312,key){
return _312.replace("${windowkey}",document.location+":"+key);
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
var _316=this._newDimensions.w!=this._currentDimensions.w;
var _317=this._newDimensions.h!=this._currentDimensions.h;
if(_316||_317){
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
},fireOnDOM:function(_319){
if(Interfaces.isImplemented(IDOMHandler,_319,true)){
this._ondomstatements.add(_319);
}
},fireOnLoad:function(_31a){
if(Interfaces.isImplemented(ILoadHandler,_31a,true)){
this._onloadstatements.add(_31a);
}
},fireOnResize:function(_31b){
if(Interfaces.isImplemented(IResizeHandler,_31b,true)){
this._onresizestatements.add(_31b);
}
},onDOMContentLoaded:function(){
while(this._ondomstatements.hasNext()){
this._ondomstatements.getNext().fireOnDOM();
}
},getWindowDimensions:function(){
return new Dimension(Client.isMozilla?window.innerWidth:document.body.clientWidth,Client.isMozilla?window.innerHeight:document.body.clientHeight);
},evaluate:function(_31c){
return eval(_31c);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMLOG_OPENED,{handleBroadcast:function(_31d,_31e){
SystemLogger.unsuspend(_31e);
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
try{
ProgressBarBinding.notch(4);
Application.isOperational=true;
EventBroadcaster.broadcast(BroadcastMessages.APPLICATION_OPERATIONAL);
}
catch(exception){
alert("Application operational NOT");
throw (exception);
}
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
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_DIRTY,{handleBroadcast:function(_31f,arg){
var list=Application._dirtyTabs;
list.set(arg.key,arg);
if(list.countEntries()==1){
var _322=top.app.bindingMap.broadcasterHasDirtyTabs;
_322.enable();
}
}});
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,{handleBroadcast:function(_323,arg){
var list=Application._dirtyTabs;
list.del(arg.key);
if(list.countEntries()==0){
var _326=top.app.bindingMap.broadcasterHasDirtyTabs;
_326.disable();
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
EventBroadcaster.broadcast(BroadcastMessages.APPLICATION_LOGIN);
},logout:function(){
var _327=false;
if(this.isLoggedIn){
this.isLoggedIn=false;
this.isLoggedOut=true;
_327=LoginService.Logout(true);
if(!_327){
alert("Logout failed.");
}
}
return _327;
},lock:function(_328){
if(_328!=null){
this._lockthings[_328]=true;
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
},unlock:function(_329,_32a){
if(_329!=null){
delete this._lockthings[_329];
if(top.bindingMap.mastercover!=null){
if(_32a||this._lockers>0){
if(_32a){
var out="Unlocked by "+new String(_329)+"\n";
for(var _32c in this._lockthings){
out+="Locked by "+new String(_32c)+". ";
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
},hasLock:function(_32d){
return this._lockthings[_32d]==true;
},activate:function(_32e){
var _32f=this._activeBinding;
this._activeBinding=_32e;
this._activatedBindings.add(_32e);
if(_32f&&_32f.isActive){
_32f.deActivate();
}
},deActivate:function(_330){
var _331=null;
var _332=null;
if(_330==this._activeBinding){
while(!_332&&this._activatedBindings.hasEntries()){
_331=this._activatedBindings.extractLast();
if(_331!=_330&&_331.isActivatable){
_332=_331;
}
}
if(!_332){
_332=app.bindingMap.explorerdock;
}
_332.activate();
}
},focused:function(_333){
this.isFocused=_333;
if(_333){
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
},handleAction:function(_338){
switch(_338.type){
case Application.REFRESH:
this.refresh();
break;
}
},declareTopLocal:function(win){
var _33a=Resolver.resolve("/scripts/source/top/");
if(this._topLevelClasses==null){
this._topLevelClasses=new List();
var self=this;
new List(DOMUtil.getElementsByTagName(document,"script")).each(function(_33c){
var src=_33c.src;
if(src.indexOf(_33a)>-1){
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
var _341=false;
if(this._isMousePositionTracking){
_341=true;
if(Client.isExplorer&&e.button!=1){
_341=false;
}
if(_341){
this._mousePosition=DOMUtil.getUniversalMousePosition(e);
}
}
return _341;
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
},onDragStart:function(_343){
var _344=BindingDragger.draggedBinding;
if(Interfaces.isImplemented(IDraggable,_344,true)==true){
if(!this._isDragging){
app.bindingMap.dragdropcursor.setImage(_344.getImage());
this._cursorStartPoint=_343;
app.bindingMap.dragdropcursor.setPosition(this._cursorStartPoint);
CursorBinding.fadeIn(app.bindingMap.dragdropcursor);
if(_344.showDrag){
_344.showDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_START,_344.dragType);
this._isDragging=true;
}
}
},onDrag:function(diff){
if(this._isDragging){
var _346=new Point(this._cursorStartPoint.x+diff.x,this._cursorStartPoint.y+diff.y);
app.bindingMap.dragdropcursor.setPosition(_346);
}
},onDragStop:function(diff){
if(this._isDragging){
var _348=BindingDragger.draggedBinding;
if(_348.hideDrag){
_348.hideDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_STOP,_348.dragType);
this._isDragging=false;
_348=BindingAcceptor.acceptingBinding;
if(_348!=null){
if(Interfaces.isImplemented(IAcceptable,_348,true)==true){
_348.accept(BindingDragger.draggedBinding);
}else{
throw new Error("Application: IAcceptable not implemented "+_348);
}
BindingAcceptor.acceptingBinding=null;
CursorBinding.fadeOut(app.bindingMap.dragdropcursor);
}else{
app.bindingMap.dragdropcursor.hide();
}
}
},reload:function(_349){
if(this.isDeveloperMode||_349){
if(this.isDeveloperMode&&Client.isPrism){
Prism.clearCache();
}
Application.lock(Application);
setTimeout(function(){
top.window.location.reload(true);
},0);
}else{
if(Application.isOperational){
Dialog.question(StringBundle.getString("ui","Website.Application.DialogReload.Title"),StringBundle.getString("ui","Website.Application.DialogReload.Text"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_34a){
if(_34a==Dialog.RESPONSE_ACCEPT){
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
_Installation.prototype={versionString:null,versionPrettyString:null,installationID:null,handleBroadcast:function(_34b){
switch(_34b){
case BroadcastMessages.APPLICATION_KICKSTART:
var list=new List(InstallationService.GetInstallationInfo(true));
list.each(function(_34d){
switch(_34d.Key){
case "ProductVersion":
this.versionString=_34d.Value;
break;
case "ProductTitle":
this.versionPrettyString=_34d.Value;
break;
case "InstallationId":
this.installationID=_34d.Value;
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
},initialize:function(_350){
if(!this.isInitialized){
this.isInitialized=true;
if(_350){
this._audio=_350;
this.isEnabled=true;
}
EventBroadcaster.broadcast(BroadcastMessages.AUDIO_INITIALIZED);
}
},play:function(url){
var _352=false;
if(this.isEnabled&&Preferences.getPref("audio")){
this._audio.fromURL(Resolver.resolve(url));
_352=true;
}
return _352;
}};
var Audio=new _Audio();
window.Preferences=new function(){
var _353=SystemLogger.getLogger("Preferences");
this.AUDIO="audio";
this.LOGIN="login";
var _354={"audio":true,"login":true};
EventBroadcaster.subscribe(BroadcastMessages.LOCALSTORE_INITIALIZED,{handleBroadcast:function(){
if(LocalStore.isEnabled){
var _355=LocalStore.getProperty(LocalStore.PREFERENCES);
if(_355){
for(var key in _355){
_354[key]=_355[key];
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
LocalStore.setProperty(LocalStore.PREFERENCES,_354);
}
}});
this.getPref=function(key){
var _358=null;
if(key){
_358=_354[key];
}else{
throw "No such preference.";
}
return _358;
};
this.setPref=function(key,_35a){
if(key){
_354[key]=_35a;
}else{
throw "No such preference.";
}
};
function debug(_35b){
var _35c=_35b?"Persisted preferences":"No persisted preferences. Using defaults";
_35c+=":\n";
for(var key in _354){
var pref=_354[key];
_35c+="\n\t"+key+": "+pref+" ["+typeof pref+"]";
}
_353.fine(_35c);
}
};
function _Persistance(){
}
_Persistance.prototype={_logger:SystemLogger.getLogger("Persistance"),_persistance:null,_isEnabled:false,isInitialized:false,isEnabled:false,getPersistedProperty:function(id,prop){
var _361=null;
if(this.isInitialized==true){
if(this._persistance){
var _362=this._persistance[id];
if(_362){
_361=_362[prop];
}
}
}else{
throw "Persistance not initialized!";
}
return _361;
},setPersistedProperty:function(id,prop,_365){
if(this.isInitialized==true){
if(this._persistance){
if(_365!=null){
if(!this._persistance[id]){
this._persistance[id]={};
}
this._persistance[id][prop]=String(_365);
}else{
this._logger.error("Cannot persist "+prop+" with value: null");
}
}
}else{
throw "Persistance not initialized!";
}
},clearAllPersistedProperties:function(){
this._logger.debug("TODO: clearAllPersistedProperties");
},handleBroadcast:function(_366){
switch(_366){
case BroadcastMessages.APPLICATION_SHUTDOWN:
var _367=top.bindingMap.persistance;
_367.persist(this._persistance);
break;
}
},initialize:function(){
if(!this.isInitialized){
this.isInitialized=true;
if(this._isEnabled==true){
var _368=top.bindingMap.persistance;
var map=_368.getPersistanceMap();
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
function StandardEventHandler(doc,_36b){
this.logger=SystemLogger.getLogger("StandardEventHandler ["+doc.title+"]");
this._contextDocument=doc;
this._contextWindow=DOMUtil.getParentWindow(doc);
this.hasNativeKeys=false;
this._isAllowTabs=false;
this._isMouseHandlerOnly=_36b;
this._addListeners();
}
StandardEventHandler.prototype._addListeners=function(){
var doc=this._contextDocument;
var _36d=this._contextWindow.bespin!=undefined;
DOMEvents.addEventListener(doc,DOMEvents.MOUSEDOWN,this,_36d);
DOMEvents.addEventListener(doc,DOMEvents.MOUSEUP,this);
DOMEvents.addEventListener(doc,DOMEvents.MOUSEMOVE,this);
if(_36d){
DOMEvents.addEventListener(doc,DOMEvents.CLICK,{handleEvent:function(e){
if(DOMEvents.isRightButton(e)){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}
}},true);
}
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
var _36f={handleEvent:function(e){
switch(e.type){
case DOMEvents.BLUR:
Application.focused(false);
break;
case DOMEvents.FOCUS:
Application.focused(true);
break;
}
}};
DOMEvents.addEventListener(this._contextWindow,DOMEvents.BLUR,_36f);
DOMEvents.addEventListener(this._contextWindow,DOMEvents.FOCUS,_36f);
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
var _376=UserInterface.getBinding(node);
if(_376!=null){
_376.dispatchAction(Binding.ACTION_ACTIVATED);
}
node=_376!=null?null:node.parentNode;
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
var _379=Application.trackMousePosition(e);
if(_379){
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEMOVE,e);
}
}
catch(exception){
DOMEvents.removeEventListener(this._contextDocument,DOMEvents.MOUSEMOVE,this);
throw (exception);
}
};
StandardEventHandler.prototype._handleKeyDown=function(e,_37b){
if(e.keyCode==KeyEventCodes.VK_TAB){
if(!this._isAllowTabs){
if(!_37b){
this._handleTab(e);
DOMEvents.preventDefault(e);
}
}else{
if(e.shiftKey||e.ctrlKey){
DOMEvents.preventDefault(e);
}
}
_37b=true;
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
DOMEvents.preventDefault(e);
break;
}
}
if(e.keyCode==KeyEventCodes.VK_BACK){
if(!StandardEventHandler.isBackAllowed){
DOMEvents.preventDefault(e);
}
}
var _37c=KeySetBinding.handleKey(this._contextDocument,e);
if(!_37c){
switch(e.keyCode){
case KeyEventCodes.VK_PAGE_UP:
case KeyEventCodes.VK_PAGE_DOWN:
break;
default:
var _37d=this._contextWindow.frameElement;
if(_37d!=null){
var _37e=DOMUtil.getParentWindow(_37d);
if(_37e.standardEventHandler!=null){
_37e.standardEventHandler._handleKeyDown(e,_37b);
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
var _381=false;
var _382=DOMEvents.getTarget(e);
var name=_382.nodeName.toLowerCase();
switch(name){
case "input":
case "textarea":
case "select":
_381=(e.type==DOMEvents.FOCUS||e.type==DOMEvents.FOCUSIN);
if(name=="input"||name=="textarea"){
StandardEventHandler.isBackAllowed=_381;
}
if(_381){
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
StandardEventHandler.prototype.enableNativeKeys=function(_385){
this._isAllowTabs=(_385==true?true:false);
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
function Action(_388,type){
this.target=_388;
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
function Animation(_38a){
this.id=KeyMaster.getUniqueKey();
this.interval=25;
this.iterator=0;
this.modifier=1;
this.endcount=90;
for(var _38b in _38a){
this[_38b]=_38a[_38b];
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
Animation.prototype.onstart=function(_38f){
};
Animation.prototype.onstep=function(_390){
};
Animation.prototype.onstop=function(_391){
};
Point.isEqual=function(p1,p2){
var _394=false;
if(p1&&p2){
_394=(p1.x==p2.x)&&(p1.y==p2.y);
}
return _394;
};
function Point(x,y){
this.x=x;
this.y=y;
}
Point.prototype={x:0,y:0};
Dimension.isEqual=function(dim1,dim2){
var _399=false;
if(dim1&&dim2){
_399=(dim1.w==dim2.w)&&(dim1.h==dim2.h);
}
return _399;
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
function BindingAcceptor(_3a0){
this.logger=SystemLogger.getLogger("BindingDragger");
this._binding=_3a0;
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
var _3a1=new List(this._binding.dragAccept.split(" "));
while(_3a1.hasNext()){
var type=_3a1.getNext();
this._acceptedList[type]=true;
}
}
};
BindingAcceptor.prototype.handleBroadcast=function(_3a3,arg){
var type=arg;
try{
switch(_3a3){
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
function BindingBoxObject(_3a8){
this._domElement=_3a8.getBindingElement();
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
function BindingDragger(_3aa){
this.logger=SystemLogger.getLogger("BindingDragger");
this.binding=_3aa;
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
BindingDragger.prototype.registerHandler=function(_3ac){
if(Interfaces.isImplemented(IDragHandler,_3ac)==true){
this.handler=_3ac;
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
var _3af=e.button==(e.target?0:1);
if(_3af){
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
var _3b1=Application.getMousePosition();
var dx=_3b1.x-this.startPoint.x;
var dy=_3b1.y-this.startPoint.y;
return new Point(dx,dy);
};
BindingDragger.prototype.handleBroadcast=function(_3b4,e){
switch(_3b4){
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
function BindingParser(_3b6){
this.logger=SystemLogger.getLogger("BindingParser");
this._ownerDocument=_3b6;
this._rootElement=null;
}
BindingParser.prototype.parseFromString=function(_3b7){
var _3b8=new List();
var xml=BindingParser.XML.replace("${markup}",_3b7);
var doc=XMLParser.parse(_3b7);
if(doc){
var _3bb=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this._ownerDocument);
this._iterate(doc.documentElement,_3bb);
var node=_3bb.firstChild;
while(node){
if(node.nodeType==Node.ELEMENT_NODE){
_3b8.add(node);
}
node=node.nextSibling;
}
}
return _3b8;
};
BindingParser.prototype._iterate=function(_3bd,_3be){
var _3bf=null;
switch(_3bd.nodeType){
case Node.ELEMENT_NODE:
_3bf=this._cloneElement(_3bd);
UserInterface.registerBinding(_3bf);
break;
case Node.TEXT_NODE:
_3bf=this._ownerDocument.createTextNode(_3bd.nodeValue);
break;
}
if(_3bf){
_3be.appendChild(_3bf);
}
if(_3bf&&_3bd.hasChildNodes()){
var _3c0=_3bd.firstChild;
while(_3c0){
this._iterate(_3c0,_3bf);
_3c0=_3c0.nextSibling;
}
}
};
BindingParser.prototype._cloneElement=function(_3c1){
var _3c2=DOMUtil.createElementNS(_3c1.namespaceURI?_3c1.namespaceURI:Constants.NS_XHTML,_3c1.nodeName,this._ownerDocument);
var i=0;
while(i<_3c1.attributes.length){
var attr=_3c1.attributes.item(i++);
_3c2.setAttribute(attr.nodeName,String(attr.nodeValue));
}
return _3c2;
};
BindingSerializer.activeInstance=null;
BindingSerializer.KEYPOINTER="bindingserializerkeypointer";
BindingSerializer.includeShadowTreeBindings=false;
BindingSerializer.filter=function(_3c5){
var _3c6=null;
var _3c7=false;
var _3c8=_3c5.parentNode.getAttribute(BindingSerializer.KEYPOINTER);
if(UserInterface.hasBinding(_3c5)){
var _3c9=UserInterface.getBinding(_3c5);
_3c7=BindingSerializer.activeInstance.indexBinding(_3c9);
if(_3c7){
_3c6=_3c9.key;
_3c5.setAttribute(BindingSerializer.KEYPOINTER,_3c6);
}
}
_3c6=_3c6?_3c6:_3c8;
var _3ca=new List(_3c5.childNodes);
_3ca.each(function(_3cb){
if(_3cb.nodeType==Node.ELEMENT_NODE){
_3cb.setAttribute(BindingSerializer.KEYPOINTER,_3c6);
}
});
if(_3c7){
BindingSerializer.activeInstance.append(_3c6,_3c8);
}
};
function BindingSerializer(){
this.logger=SystemLogger.getLogger("BindingSerializer");
this._dom=DOMUtil.getDOMDocument();
alert("BindingSerializer: Convert to Crawler!");
this._pointers=[];
}
BindingSerializer.prototype.serializeBinding=function(_3cc,_3cd){
BindingSerializer.includeShadowTreeBindings=_3cd?true:false;
BindingSerializer.activeInstance=this;
_3cc.bindingWindow.ElementIterator.iterate(_3cc.bindingElement,BindingSerializer.filter);
return DOMSerializer.serialize(this._dom,true);
};
BindingSerializer.prototype.indexBinding=function(_3ce){
var _3cf=false;
var _3d0=_3ce.serialize();
if(_3d0!=false){
_3cf=true;
var _3d1="ui:"+DOMUtil.getLocalName(_3ce.bindingElement);
var _3d2=DOMUtil.createElementNS(Constants.NS_UI,_3d1,this._dom);
this._pointers[_3ce.key]=_3d2;
for(var prop in _3d0){
if(_3d0[prop]!=null){
_3d2.setAttribute(prop,String(_3d0[prop]));
}
}
}
return _3cf;
};
BindingSerializer.prototype.append=function(_3d4,_3d5){
var _3d6=this._pointers[_3d4];
var _3d7=_3d5?this._pointers[_3d5]:this._dom;
_3d7.appendChild(_3d6);
};
function ImageProfile(_3d8){
this._default=_3d8.image;
this._hover=_3d8.imageHover;
this._active=_3d8.imageActive;
this._disabled=_3d8.imageDisabled;
}
ImageProfile.prototype.getDefaultImage=function(){
return this._default;
};
ImageProfile.prototype.setDefaultImage=function(_3d9){
this._default=_3d9;
};
ImageProfile.prototype.getHoverImage=function(){
return this._hover;
};
ImageProfile.prototype.setHoverImage=function(_3da){
this._hover=_3da;
};
ImageProfile.prototype.getActiveImage=function(){
return this._active;
};
ImageProfile.prototype.setActiveImage=function(_3db){
this._active=_3db;
};
ImageProfile.prototype.getDisabledImage=function(){
return this._disabled;
};
ImageProfile.prototype.setDisabledImage=function(_3dc){
this._disabled=_3dc;
};
function _BindingFinder(){
}
_BindingFinder.prototype={getDescendantBindingsByLocalName:function(_3dd,_3de,_3df){
var _3e0=null;
if(_3dd.isAttached){
_3e0=new List();
var _3e1=_3df?_3dd.getChildElementsByLocalName(_3de):_3dd.getDescendantElementsByLocalName(_3de);
_3e1.each(function(_3e2){
var _3e3=UserInterface.getBinding(_3e2);
if(_3e3){
_3e0.add(_3e3);
}
});
}else{
var ouch="Could not resolve descendants of unattached binding "+_3dd.toString();
if(Application.isDeveloperMode){
throw ouch;
}
}
return _3e0;
},getAncestorBindingByType:function(_3e5,impl,_3e7){
var _3e8=null;
if(Binding.exists(_3e5)){
var node=_3e5.bindingElement;
while(_3e8==null&&node!=null){
node=node.parentNode;
if(node!=null){
if(UserInterface.hasBinding(node)){
var _3ea=UserInterface.getBinding(node);
if(_3ea instanceof impl){
_3e8=_3ea;
}
}else{
if(_3e7&&node.nodeType==Node.DOCUMENT_NODE){
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
return _3e8;
},getAncestorBindingByLocalName:function(_3ec,_3ed,_3ee){
var _3ef=null;
if(_3ed=="*"){
var node=_3ec.bindingElement;
while(!_3ef&&(node=node.parentNode)!=null){
if(UserInterface.hasBinding(node)){
_3ef=UserInterface.getBinding(node);
}
}
}else{
_3ef=UserInterface.getBinding(DOMUtil.getAncestorByLocalName(_3ed,_3ec.bindingElement,_3ee));
}
return _3ef;
},getChildElementsByLocalName:function(_3f1,_3f2){
var _3f3=new List();
var _3f4=new List(_3f1.bindingElement.childNodes);
_3f4.each(function(_3f5){
if(_3f5.nodeType==Node.ELEMENT_NODE){
if(_3f2=="*"||DOMUtil.getLocalName(_3f5)==_3f2){
_3f3.add(_3f5);
}
}
});
return _3f3;
},getChildBindingByType:function(_3f6,impl){
var _3f8=null;
_3f6.getChildElementsByLocalName("*").each(function(_3f9){
var _3fa=UserInterface.getBinding(_3f9);
if(_3fa!=null&&_3fa instanceof impl){
_3f8=_3fa;
return false;
}else{
return true;
}
});
return _3f8;
},getDescendantBindingByType:function(_3fb,impl){
var _3fd=null;
_3fb.getDescendantElementsByLocalName("*").each(function(_3fe){
var _3ff=UserInterface.getBinding(_3fe);
if(_3ff!=null&&_3ff instanceof impl){
_3fd=_3ff;
return false;
}else{
return true;
}
});
return _3fd;
},getDescendantBindingsByType:function(_400,impl){
var _402=new List();
_400.getDescendantElementsByLocalName("*").each(function(_403){
var _404=UserInterface.getBinding(_403);
if(_404!=null&&_404 instanceof impl){
_402.add(_404);
}
return true;
});
return _402;
},getNextBindingByLocalName:function(_405,name){
var _407=null;
var _408=_405.bindingElement;
while((_408=DOMUtil.getNextElementSibling(_408))!=null&&DOMUtil.getLocalName(_408)!=name){
}
if(_408!=null){
_407=UserInterface.getBinding(_408);
}
return _407;
},getPreviousBindingByLocalName:function(_409,name){
var _40b=null;
var _40c=_409.bindingElement;
while((_40c=DOMUtil.getPreviousElementSibling(_40c))!=null&&DOMUtil.getLocalName(_40c)!=name){
}
if(_40c!=null){
_40b=UserInterface.getBinding(_40c);
}
return _40b;
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
},addFilter:function(_40d){
this._filters.add(_40d);
},removeFilter:function(_40e){
var _40f=-1;
this._filters.each(function(fil){
_40f++;
var _411=true;
if(fil==_40e){
_411=false;
}
return _411;
});
if(_40f>-1){
this._filters.del(_40f);
}
},_applyFilters:function(node,arg){
var _414=null;
var stop=NodeCrawler.STOP_CRAWLING;
var skip=NodeCrawler.SKIP_NODE;
var _417=NodeCrawler.SKIP_CHILDREN;
this._filters.reset();
var _418=true;
while(this._filters.hasNext()&&_418==true){
var _419=this._filters.getNext();
var res=_419.call(this,node,arg);
if(res!=null){
_414=res;
switch(res){
case stop:
case skip:
case skip+_417:
_418=false;
break;
}
}
}
return _414;
},crawl:function(_41b,arg){
this.contextDocument=_41b.ownerDocument;
this.onCrawlStart();
var _41d=this.type==NodeCrawler.TYPE_ASCENDING;
var _41e=this._applyFilters(_41b,arg);
if(_41e!=NodeCrawler.STOP_CRAWLING){
if(_41d&&_41e==NodeCrawler.SKIP_CHILDREN){
}else{
var next=null;
if(this.nextNode!=null){
next=this.nextNode;
this.nextNode=null;
}else{
next=_41d?_41b.parentNode:_41b;
}
this._crawl(next,arg);
}
}
this.onCrawlStop();
},onCrawlStart:function(){
},onCrawlStop:function(){
},_crawl:function(_420,arg){
var _422=null;
switch(this.type){
case NodeCrawler.TYPE_DESCENDING:
_422=this._crawlDescending(_420,arg);
break;
case NodeCrawler.TYPE_ASCENDING:
_422=this._crawlAscending(_420,arg);
break;
}
return _422;
},_crawlDescending:function(_423,arg){
var skip=NodeCrawler.SKIP_NODE;
var _426=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
var _428=null;
if(_423.hasChildNodes()){
var node=_423.firstChild;
while(node!=null&&_428!=stop){
this.currentNode=node;
_428=this._applyFilters(node,arg);
switch(_428){
case stop:
case _426:
case skip+_426:
break;
default:
if(node.nodeType==Node.ELEMENT_NODE){
if(this.nextNode==null){
var res=this._crawl(node,arg);
if(res==stop){
_428=stop;
break;
}
}
}
if(_428!=stop&&_428!=skip){
this.previousNode=node;
}
break;
}
if(_428!=stop){
node=this.nextNode?this.nextNode:node.nextSibling;
this.nextNode=null;
}
}
}
return _428;
},_crawlAscending:function(_42b,arg){
var _42d=null;
var skip=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
if(_42b!=null){
this.currentNode=_42b;
_42d=this._applyFilters(_42b,arg);
if(_42d!=stop){
var next=this.nextNode?this.nextNode:_42b.parentNode;
this.nextNode=null;
if(next&&next.nodeType!=Node.DOCUMENT_NODE){
this.previousNode=_42b;
_42d=this._crawl(next,arg);
}
}
}else{
_42d=stop;
}
return _42d;
}};
NodeCrawler.prototype.dispose=function(){
this._filters.dispose();
for(var _431 in this){
this[_431]=null;
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
var _434=null;
if(node.nodeType!=Node.ELEMENT_NODE){
_434=NodeCrawler.SKIP_NODE;
}
return _434;
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
this.addFilter(function(_435,arg){
var _437=null;
if(!UserInterface.hasBinding(_435)){
_437=NodeCrawler.SKIP_NODE;
}
return _437;
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
this.addFilter(function(_439,arg){
var _43b=null;
var _43c=UserInterface.getBinding(_439);
if(Interfaces.isImplemented(ICrawlerHandler,_43c)==true){
self.response=null;
_43c.handleCrawler(self);
_43b=self.response;
}
return _43b;
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
this.addFilter(function(_43e,list){
var _440=null;
var _441=UserInterface.getBinding(_43e);
if(Interfaces.isImplemented(IFlexible,_441)==true){
switch(self.mode){
case FlexBoxCrawler.MODE_FORCE:
list.add(_441);
break;
case FlexBoxCrawler.MODE_NORMAL:
if(_441.isFlexSuspended==true){
_440=NodeCrawler.SKIP_CHILDREN;
}else{
list.add(_441);
}
break;
}
}
return _440;
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
this.addFilter(function(_442,list){
var _444=null;
var _445=UserInterface.getBinding(_442);
if(_445.isAttached==true){
if(Interfaces.isImplemented(IFocusable,_445)==true){
if(_445.isFocusable&&_445.isVisible){
switch(this.mode){
case FocusCrawler.MODE_INDEX:
list.add(_445);
break;
case FocusCrawler.MODE_FOCUS:
if(!_445.isFocused){
_445.focus();
}
_444=NodeCrawler.STOP_CRAWLING;
break;
case FocusCrawler.MODE_BLUR:
if(_445.isFocused==true){
_445.blur();
_444=NodeCrawler.STOP_CRAWLING;
}
break;
}
}
}
}
return _444;
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
this.addFilter(function(_446,list){
var _448=null;
var _449=UserInterface.getBinding(_446);
if(!_449.isVisible){
_448=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _448;
});
this.addFilter(function(_44a,list){
var _44c=null;
var _44d=UserInterface.getBinding(_44a);
if(_44d.isAttached){
if(Interfaces.isImplemented(IFit,_44d)){
if(!_44d.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_44d);
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
UpdateAssistant.serialize=function(_44e){
_44e=_44e.cloneNode(true);
_44e.setAttributeNS(Constants.NS_NS,"xmlns",Constants.NS_XHTML);
_44e.setAttributeNS(Constants.NS_NS,"xmlns:ui",Constants.NS_UI);
return this._serializer.serializeToString(_44e);
};
}
},handleEvent:function(e){
var _450=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.BEFOREUPDATE:
this._beforeUpdate(_450);
break;
case DOMEvents.AFTERUPDATE:
this._afterUpdate(_450);
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
},_beforeUpdate:function(_451){
var _452=(_451==document.documentElement);
if(_452){
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
var _455=FocusBinding.focusedBinding;
if(_455!=null){
this._focusID=_455.getID();
}
if(this.isDebugging){
this._oldDOM=DOMSerializer.serialize(UpdateManager.currentDOM,true);
}
}else{
switch(_451.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_REMOVE:
DocumentManager.detachBindings(_451);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_451,false);
break;
}
}
},_afterUpdate:function(_456){
var _457=(_456==document.documentElement);
if(_457){
var _458=this._elementsbuffer;
if(_458.hasEntries()){
_458.each(function(_459){
DocumentManager.attachBindings(_459);
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
var _45c=FocusBinding.focusedBinding;
if(_45c==null){
var _45d=document.getElementById(this._focusID);
if(_45d!=null){
var _45c=UserInterface.getBinding(_45d);
if(_45c!=null){
_45c.focus();
}
}
}
this._focusID=null;
if(UpdateManager.summary!=""){
if(this.isDebugging){
var _45e=DOMSerializer.serialize(UpdateManager.currentDOM,true);
var _45f="NEW DOM: "+document.title+"\n\n"+_45e+"\n\n";
_45f+="OLD DOM: "+document.title+"\n\n"+this._oldDOM;
this._logger.debug(_45f);
this._oldDOM=null;
}
this._logger.fine(UpdateManager.summary);
}
}else{
switch(_456.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_INSERT:
this._elementsbuffer.add(_456);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_456,true);
break;
}
switch(_456.id){
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
var _45c=UserInterface.getBinding(_456);
while(_45c==null&&_456!=null){
_45c=UserInterface.getBinding(_456);
_456=_456.parentNode;
}
if(_45c!=null){
_45c.dispatchAction(Binding.ACTION_UPDATED);
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
},_backupattributes:function(_461,_462){
var _463=UserInterface.getBinding(_461);
if(_463!=null){
if(_462){
var _464=this._attributesbuffer;
var map=new Map();
_464.each(function(name,old){
var now=_461.getAttribute(name);
if(now!=null){
if(now!=old){
map.set(name,Types.castFromString(now));
}
}else{
map.set(name,null);
}
});
new List(_461.attributes).each(function(att){
if(att.specified){
if(!_464.has(att.nodeName)){
map.set(att.nodeName,Types.castFromString(att.nodeValue));
}
}
});
map.each(function(name,_46b){
var _46c=_463.propertyMethodMap[name];
if(_46c!=null){
_46c.call(_463,_46b);
}
});
}else{
var map=new Map();
new List(_461.attributes).each(function(att){
if(att.specified){
map.set(att.nodeName,att.nodeValue);
}
});
this._attributesbuffer=map;
}
}
},handleElement:function(_46e,_46f){
var _470=window.bindingMap[_46e.getAttribute("id")];
if(_470!=null){
return _470.handleElement(_46e,_46f);
}
},updateElement:function(_471,_472){
var _473=window.bindingMap[_471.getAttribute("id")];
if(_473!=null){
return _473.updateElement(_471,_472);
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
this.addFilter(function(_475,list){
var _477=UserInterface.getBinding(_475);
var _478=null;
switch(self.mode){
case DocumentCrawler.MODE_REGISTER:
if(_477==null){
UserInterface.registerBinding(_475);
}
break;
case DocumentCrawler.MODE_ATTACH:
if(_477!=null){
if(!_477.isAttached){
list.add(_477);
}
if(_477.isLazy==true){
_478=NodeCrawler.SKIP_CHILDREN;
}
}
break;
case DocumentCrawler.MODE_DETACH:
if(_477!=null){
list.add(_477);
}
break;
}
return _478;
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
},handleBroadcast:function(_479,arg){
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
var _47c=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.SELECTSTART:
case DOMEvents.CONTEXTMENU:
if(!this._isTextInputElement(_47c)){
DOMEvents.preventDefault(e);
}
break;
case DOMEvents.CLICK:
if(Client.isExplorer){
if(_47c.href&&_47c.href.indexOf(Constants.DUMMY_LINK)>-1){
DOMEvents.preventDefault(e);
}
}
break;
}
},_resolveCustomBindingMappings:function(){
var _47d=DOMUtil.getElementsByTagName(document.documentElement,"bindingmappingset").item(0);
if(_47d!=null){
var map={};
var _47f=DOMUtil.getElementsByTagName(_47d,"bindingmapping");
new List(_47f).each(function(_480){
var _481=_480.getAttribute("element");
var _482=_480.getAttribute("binding");
map[_481]=eval(_482);
});
this.setCustomUserInterfaceMapping(new UserInterfaceMapping(map));
}
},setCustomUserInterfaceMapping:function(_483){
if(this.customUserInterfaceMapping==null){
this.customUserInterfaceMapping=_483;
}else{
this.customUserInterfaceMapping.merge(_483);
}
},_registerBindings:function(_484){
var _485=new DocumentCrawler();
_485.mode=DocumentCrawler.MODE_REGISTER;
_485.crawl(_484);
_485.dispose();
},_attachBindings:function(_486){
var _487=new DocumentCrawler();
_487.mode=DocumentCrawler.MODE_ATTACH;
var list=new List();
_487.crawl(_486,list);
var _489=false;
while(list.hasNext()){
var _48a=list.getNext();
if(!_48a.isAttached){
_48a.onBindingAttach();
if(!_48a.memberDependencies){
_48a.onBindingInitialize();
}
if(Interfaces.isImplemented(IData,_48a)){
_489=true;
}
}
}
if(_489){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_487.dispose();
list.dispose();
},attachBindings:function(_48c){
this._registerBindings(_48c);
this._attachBindings(_48c);
},detachBindings:function(_48d,_48e){
var _48f=new DocumentCrawler();
_48f.mode=DocumentCrawler.MODE_DETACH;
var list=new List();
_48f.crawl(_48d,list);
if(_48e==true){
list.extractFirst();
}
var _491=false;
list.reverse().each(function(_492){
if(Interfaces.isImplemented(IData,_492)){
_491=true;
}
_492.dispose(true);
});
if(_491){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_48f.dispose();
list.dispose();
},detachAllBindings:function(){
this.detachBindings(document.documentElement);
},computeMaxIndex:function(){
if(this._maxIndex==-1){
this._maxIndex=DOMUtil.getMaxIndex(document);
}
return this._maxIndex++;
},_isTextInputElement:function(_494){
return (/textarea|input/.test(DOMUtil.getLocalName(_494)));
},_makeDocumentUnselectable:function(){
if(Client.isExplorer){
DOMEvents.addEventListener(document,DOMEvents.SELECTSTART,this);
}else{
}
}};
var DocumentManager=new _DocumentManager();
function _DataManager(){
}
_DataManager.prototype={isPostBackFun:false,_logger:SystemLogger.getLogger("DataManager ["+document.title+"]"),_dataBindings:{},isDirty:false,dirty:function(_495){
this.isDirty=true;
var _496=false;
if(_495!=null&&!_495.isDirty){
_495.isDirty=true;
_495.dispatchAction(Binding.ACTION_DIRTY);
_496=true;
}
return _496;
},clean:function(_497){
if(_497.isDirty){
_497.isDirty=false;
}
},registerDataBinding:function(name,_499){
if(Interfaces.isImplemented(IData,_499,true)){
if(this._dataBindings[name]!=null){
throw "no proper support for checkbox multiple values! "+name;
}else{
this._dataBindings[name]=_499;
}
}else{
throw "Invalid DataBinding: "+_499;
}
},unRegisterDataBinding:function(name){
if(this._dataBindings[name]!=null){
delete this._dataBindings[name];
}
},getDataBinding:function(name){
var _49c=null;
if(this._dataBindings[name]!=null){
_49c=this._dataBindings[name];
}
return _49c;
},getAllDataBindings:function(_49d){
var list=new List();
for(var name in this._dataBindings){
var _4a0=this._dataBindings[name];
list.add(_4a0);
if(_49d&&_4a0 instanceof WindowBinding){
var _4a1=_4a0.getContentWindow().DataManager;
if(_4a1!=null){
list.merge(_4a1.getAllDataBindings());
}
}
}
return list;
},hasDataBindings:function(){
var _4a2=false;
for(var name in this._dataBindings){
_4a2=true;
break;
}
return _4a2;
},populateDataBindings:function(map){
if(map instanceof DataBindingMap){
map.each(function(name,_4a6){
var _4a7=this._dataBindings[name];
if(_4a7!=null){
switch(map.type){
case DataBindingMap.TYPE_RESULT:
try{
_4a7.setResult(_4a6);
}
catch(exception){
if(Application.isDeveloperMode){
alert(_4a7);
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
var _4a8=new DataBindingMap();
_4a8.type=DataBindingMap.TYPE_VALUE;
for(var name in this._dataBindings){
var _4aa=this._dataBindings[name];
if(_4aa instanceof DataDialogBinding){
throw "DataDialogBinding valuemap not supported!";
}
_4a8[name]=_4aa.getValue();
}
return _4a8;
},getDataBindingResultMap:function(){
var _4ab=new DataBindingMap();
_4ab.type=DataBindingMap.TYPE_RESULT;
for(var name in this._dataBindings){
var _4ad=this._dataBindings[name];
var res=_4ad.getResult();
if(res instanceof DataBindingMap){
res.each(function(name,_4b0){
_4ab.set(name,_4b0);
});
}else{
_4ab.set(name,res);
}
}
return _4ab;
},getPostBackString:function(){
var _4b1="";
var form=document.forms[0];
if(form!=null){
var _4b3="";
new List(form.elements).each(function(_4b4){
var name=_4b4.name;
var _4b6=encodeURIComponent(_4b4.value);
switch(_4b4.type){
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_4b1+=name+"="+_4b6+"&";
break;
case "submit":
if(document.activeElement==_4b4){
_4b1+=name+"="+_4b6+"&";
}
break;
case "radio":
if(_4b4.checked){
_4b1+=name+"="+_4b6+"&";
}
break;
case "checkbox":
if(_4b4.checked){
if(_4b4.name==_4b3){
if(_4b1.lastIndexOf("&")==_4b1.length-1){
_4b1=_4b1.substr(0,_4b1.length-1);
}
_4b1+=","+_4b6;
}else{
_4b1+=name+"="+_4b4.value;
}
_4b3=name;
_4b1+="&";
}
break;
}
});
}
return _4b1.substr(0,_4b1.length-1);
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
var _4bf=null;
var _4c0=null;
var _4c1=false;
if(!this._cache[name]){
_4c1=true;
var uri=Constants.TEMPLATESROOT+"/"+name;
var _4c3=DOMUtil.getXMLHTTPRequest();
_4c3.open("get",uri,false);
_4c3.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_4c3.send(null);
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4c0=_4c3.responseText;
break;
default:
_4c0=_4c3.responseXML;
break;
}
if(_4c0==null){
throw new Error("Templates: Could not read template. Malformed XML?");
}else{
this._cache[name]=_4c0;
}
}
_4c0=this._cache[name];
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4bf=_4c0;
break;
case this._modes.MODE_DOCUMENT:
_4bf=DOMUtil.cloneNode(_4c0,true);
break;
case this._modes.MODE_ELEMENT:
_4bf=DOMUtil.cloneNode(_4c0.documentElement,true);
break;
case this._modes.MODE_DOCUMENTTEXT:
_4bf=DOMSerializer.serialize(_4c0,true);
break;
case this._modes.MODE_ELEMENTTEXT:
_4bf=DOMSerializer.serialize(_4c0.documentElement,true);
break;
}
if(_4c1&&Application.isDeveloperMode){
this._logger.fine(new String("Import \""+name+"\":\n\n"+_4bf));
}
return _4bf;
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
this._construct();
}
_Dialog.prototype={_logger:SystemLogger.getLogger("Dialog"),_URL_STANDARDDIALOG:"${root}/content/dialogs/standard/standard.aspx",MODAL:"modal",NON_MODAL:"nonmodal",URL_TREESELECTOR:"${root}/content/dialogs/treeselector/treeselector.aspx",URL_TREESEARCH:"${root}/content/dialogs/treesearch/treeSearchForm.aspx",URL_IMAGESELECTOR:"${root}/content/dialogs/treeselector/special/imageselector.aspx",URL_SERVICEFAULT:"${root}/content/dialogs/webservices/error.aspx",BUTTONS_YES_NO_CANCEL:["yes:default","no","cancel"],BUTTONS_ACCEPT_CANCEL:["accept:default","cancel"],BUTTONS_ACCEPT:["accept:default"],RESPONSE_YES:"yes",RESPONSE_NO:"no",RESPONSE_ACCEPT:"accept",RESPONSE_CANCEL:"cancel",RESPONSE_DEFAULT:"default",_TYPE_WARNING:"warning",_TYPE_MESSAGE:"message",_TYPE_ERROR:"error",_TYPE_QUESTION:"question",_dialogImages:{"warning":"${icon:warning}","message":"${icon:message}","error":"${icon:error}","question":"${icon:question}"},_construct:function(){
this._dialogButtons={"yes":new DialogButton({label:"Yes",response:this.RESPONSE_YES}),"no":new DialogButton({label:"No",response:this.RESPONSE_NO}),"accept":new DialogButton({label:"OK",response:this.RESPONSE_ACCEPT}),"cancel":new DialogButton({label:"Cancel",response:this.RESPONSE_CANCEL})};
},invoke:function(url,_4c7,_4c8){
this._logger.error("Not implemented");
},invokeModal:function(url,_4ca,_4cb){
var _4cc=new DialogViewDefinition({handle:KeyMaster.getUniqueKey(),position:Dialog.MODAL,url:url,handler:_4ca,argument:_4cb});
StageBinding.presentViewDefinition(_4cc);
return _4cc;
},invokeDefinition:function(_4cd){
if(_4cd instanceof DialogViewDefinition){
StageBinding.presentViewDefinition(_4cd);
}
return _4cd;
},question:function(_4ce,text,_4d0,_4d1){
if(!_4d0){
_4d0=this.BUTTONS_ACCEPT_CANCEL;
}
this._standardDialog(this._TYPE_QUESTION,_4ce,text,_4d0,_4d1);
},message:function(_4d2,text,_4d4,_4d5){
if(!_4d4){
_4d4=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_MESSAGE,_4d2,text,_4d4,_4d5);
},error:function(_4d6,text,_4d8,_4d9){
if(!_4d8){
_4d8=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_ERROR,_4d6,text,_4d8,_4d9);
},warning:function(_4da,text,_4dc,_4dd){
if(!_4dc){
_4dc=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_WARNING,_4da,text,_4dc,_4dd);
},_standardDialog:function(type,_4df,text,_4e1,_4e2){
var _4e3=null;
if(!_4e1){
_4e3=new List(Dialog.BUTTONS_ACCEPT);
}else{
_4e3=new List();
new List(_4e1).each(function(_4e4){
var _4e5=null;
switch(typeof _4e4){
case "object":
_4e5=_4e4;
break;
case "string":
var _4e6=false;
if(_4e4.indexOf(":")>-1){
_4e4=_4e4.split(":")[0];
_4e6=true;
}
_4e5=Dialog._dialogButtons[_4e4];
if(_4e6){
_4e5.isDefault=true;
}
break;
}
_4e3.add(_4e5);
});
}
var _4e7={title:_4df,text:text,type:type,image:this._dialogImages[type],buttons:_4e3};
var _4e8=new DialogViewDefinition({handle:"standarddialog:"+type,position:Dialog.MODAL,url:this._URL_STANDARDDIALOG,handler:_4e2,argument:_4e7});
StageBinding.presentViewDefinition(_4e8);
}};
var Dialog=new _Dialog();
function _Commands(){
this._construct();
}
_Commands.prototype={_URL_ABOUTDIALOG:"${root}/content/dialogs/about/about.aspx",_URL_PREFERENCES:"${root}/content/dialogs/preferences/preferences.aspx",_construct:function(){
var self=this;
EventBroadcaster.subscribe(BroadcastMessages.SAVE_ALL,{handleBroadcast:function(_4ea,arg){
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
},saveAll:function(_4ed){
var self=this;
var _4ef=Application.getDirtyDockTabsTabs();
if(_4ef.hasEntries()){
Dialog.invokeModal("${root}/content/dialogs/save/saveall.aspx",{handleDialogResponse:function(_4f0,_4f1){
switch(_4f0){
case Dialog.RESPONSE_ACCEPT:
self._handleSaveAllResult(_4f1,_4ed);
break;
case Dialog.RESPONSE_CANCEL:
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
break;
}
}},_4ef);
}else{
if(_4ed){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
},_handleSaveAllResult:function(_4f2,_4f3){
var _4f4=false;
var list=new List();
_4f2.each(function(name,tab){
if(tab!=false){
list.add(tab);
}
});
if(list.hasEntries()){
_4f4=true;
var _4f8=list.getLength();
var _4f9={handleBroadcast:function(_4fa,tab){
if(--_4f8==0){
EventBroadcaster.unsubscribe(BroadcastMessages.DOCKTAB_CLEAN,this);
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
if(_4f3){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
}};
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,_4f9);
list.each(function(tab){
tab.saveContainedEditor();
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
}
return _4f4;
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
var _4fe="Composite.Management.Help";
if(!StageBinding.isViewOpen(_4fe)){
StageBinding.handleViewPresentation(_4fe);
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
var _500=document.createEvent("Events");
_500.initEvent(type,true,true);
window.dispatchEvent(_500);
}else{
this._logger.warn("Prism methods should only be invoked in Prism! ("+type+")");
}
}};
var Prism=new _Prism();
ViewDefinition.DEFAULT_URL="${root}/blank.aspx";
ViewDefinition.clone=function(_501,_502){
var _503=null;
var _504=ViewDefinitions[_501];
if(_504.isMutable){
var impl=null;
if(_504 instanceof DialogViewDefinition){
impl=DialogViewDefinition;
}else{
impl=HostedViewDefinition;
}
if(_502!=null&&impl!=null){
var def=new impl();
for(var prop in _504){
def[prop]=_504[prop];
}
def.handle=_502;
_503=def;
}else{
throw "Cannot clone without newhandle";
}
}else{
throw "Cannot clone non-mutable definition";
}
return _503;
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
Binding.evaluate=function(_50d,_50e){
var _50f=null;
var _510=_50e.bindingWindow.WindowManager;
if(_510!=null){
var _511=Binding.parseScriptStatement(_50d,_50e.key);
_50f=_510.evaluate(_511);
}
return _50f;
};
Binding.parseScriptStatement=function(_512,key){
if(_512!=null&&key!=null){
var _514="UserInterface.getBindingByKey ( \""+key+"\" )";
_512=_512.replace(/(\W|^)this(,| +|\)|;)/g,_514);
_512=_512.replace(/(\W|^)this(\.)/g,_514+".");
}
return _512;
};
Binding.exists=function(_515){
var _516=false;
try{
if(_515&&_515.bindingElement&&_515.bindingElement.nodeType&&_515.isDisposed==false){
_516=true;
}
}
catch(accessDeniedException){
_516=false;
}
finally{
return _516;
}
};
Binding.destroy=function(_517){
if(!_517.isDisposed){
if(_517.acceptor!=null){
_517.acceptor.dispose();
}
if(_517.dragger!=null){
_517.disableDragging();
}
if(_517.boxObject!=null){
_517.boxObject.dispose();
}
if(_517._domEventHandlers!=null){
DOMEvents.cleanupEventListeners(_517);
}
for(var _518 in _517.shadowTree){
var _519=_517.shadowTree[_518];
if(_519 instanceof Binding&&Binding.exists(_519)){
_519.dispose(true);
}
_517.shadowTree[_518]=null;
}
_517.isDisposed=true;
_517=null;
}
};
Binding.dotnetify=function(_51a,_51b){
var _51c=_51a.getCallBackID();
if(_51c!=null){
var _51d=DOMUtil.createElementNS(Constants.NS_XHTML,"input",_51a.bindingDocument);
_51d.type="hidden";
_51d.id=_51c;
_51d.name=_51c;
_51d.value=_51b!=null?_51b:"";
_51a.bindingElement.appendChild(_51d);
_51a.shadowTree.dotnetinput=_51d;
}else{
throw _51a.toString()+": Missing callback ID";
}
};
Binding.imageProfile=function(_51e){
var _51f=_51e.getProperty("image");
var _520=_51e.getProperty("image-hover");
var _521=_51e.getProperty("image-active");
var _522=_51e.getProperty("image-disabled");
if(_51e.imageProfile==null){
if(_51e.image==null&&_51f!=null){
_51e.image=_51f;
}
if(_51e.imageHover==null&&_520!=null){
_51e.imageHover=_51f;
}
if(_51e.imageActive==null&&_521!=null){
_51e.imageActive=_521;
}
if(_51e.imageDisabled==null&&_522!=null){
_51e.imageDisabled=_522;
}
if(_51e.image||_51e.imageHover||_51e.imageActive||_51e.imageDisabled){
_51e.imageProfile=new ImageProfile(_51e);
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
var id=this.bindingElement.id;
if(id!=""&&id.slice(0,2)=="ID"&&this.bindingWindow.isServersideExpand){
this.isBindingBuild=true;
}
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
var _525=this.dependentBindings[key];
_525.onMemberInitialize(this);
}
}
this.isInitialized=true;
};
Binding.prototype.onMemberInitialize=function(_526){
if(_526){
this.memberDependencies[_526.key]=true;
var _527=true;
for(var key in this.memberDependencies){
if(this.memberDependencies[key]==false){
_527=false;
break;
}
}
if(_527){
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
Binding.prototype.detachRecursive=function(_529){
if(_529==null){
_529=false;
}
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement,!_529);
};
Binding.prototype.addMember=function(_52a){
if(!this.isAttached){
throw "Cannot add members to unattached binding";
}else{
if(!_52a.isInitialized){
if(!this.memberDependencies){
this.memberDependencies={};
}
this.memberDependencies[_52a.key]=false;
_52a.registerDependentBinding(this);
}
}
return _52a;
};
Binding.prototype.addMembers=function(_52b){
while(_52b.hasNext()){
var _52c=_52b.getNext();
if(!_52c.isInitialized){
this.addMember(_52c);
}
}
return _52b;
};
Binding.prototype.registerDependentBinding=function(_52d){
if(!this.dependentBindings){
this.dependentBindings={};
}
this.dependentBindings[_52d.key]=_52d;
};
Binding.prototype._initializeBindingPersistanceFeatures=function(){
var _52e=this.getProperty("persist");
if(_52e&&Persistance.isEnabled){
var id=this.bindingElement.id;
if(!KeyMaster.hasKey(id)){
this._persist={};
var _530=new List(_52e.split(" "));
while(_530.hasNext()){
var prop=_530.getNext();
var _532=Persistance.getPersistedProperty(id,prop);
if(_532!=null){
this._persist[prop]=_532;
this.setProperty(prop,_532);
}else{
_532=this.getProperty(prop);
if(_532!=null){
this._persist[prop]=_532;
}
}
}
}else{
throw "Persistable bindings must have a specified ID.";
}
}
};
Binding.prototype._initializeBindingGeneralFeatures=function(){
var _533=this.getProperty("disabled");
var _534=this.getProperty("contextmenu");
var _535=this.getProperty("observes");
var _536=this.getProperty("onattach");
var _537=this.getProperty("hidden");
var _538=this.getProperty("blockactionevents");
if(_537==true&&this.isVisible==true){
this.hide();
}
if(_533&&this.logger!=null){
this.logger.error("The 'disabled' property has been renamed 'isdisbaled'");
}
if(_534){
this.setContextMenu(_534);
}
if(_535){
this.observe(this.getBindingForArgument(_535));
}
if(_538==true){
this.isBlockingActions=true;
}
if(this.isActivationAware==true){
var root=UserInterface.getBinding(this.bindingDocument.body);
root.makeActivationAware(this);
this._hasActivationAwareness=true;
}
if(_536!=null){
Binding.evaluate(_536,this);
}
};
Binding.prototype._initializeBindingDragAndDropFeatures=function(){
var _53a=this.getProperty("draggable");
var _53b=this.getProperty("dragtype");
var _53c=this.getProperty("dragaccept");
var _53d=this.getProperty("dragreject");
if(_53a!=null){
this.isDraggable=_53a;
}
if(_53b!=null){
this.dragType=_53b;
if(_53a!=false){
this.isDraggable=true;
}
}
if(_53c!=null){
this.dragAccept=_53c;
}
if(_53d!=null){
this.dragReject=_53d;
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
Binding.prototype._updateBindingMap=function(_53e){
try{
if(this.bindingWindow){
var id=this.bindingElement.id;
var map=this.bindingWindow.bindingMap;
var _541=null;
if(_53e){
_541=map[id];
if(_541!=null&&_541!=this){
var cry=this.toString()+" duplicate binding ID: "+id;
this.logger.error(cry);
if(Application.isDeveloperMode){
throw (cry);
}
}else{
map[id]=this;
}
}else{
_541=map[id];
if(_541!=null&&_541==this){
delete map[id];
}
}
}else{
var _543=new String("Binding#_updateBindingMap odd dysfunction: "+this.toString()+": "+_53e);
if(Application.isDeveloperMode==true){
alert(_543);
}else{
this.logger.error(_543);
}
}
}
catch(exception){
this.logger.error(exception);
}
};
Binding.prototype.handleEvent=function(e){
};
Binding.prototype.handleAction=function(_545){
};
Binding.prototype.handleBroadcast=function(_546,arg){
};
Binding.prototype.handleElement=function(_548){
return false;
};
Binding.prototype.updateElement=function(_549){
return false;
};
Binding.prototype.getBindingForArgument=function(arg){
var _54b=null;
switch(typeof arg){
case "object":
_54b=arg;
break;
case "string":
_54b=this.bindingDocument.getElementById(arg);
if(_54b==null){
_54b=Binding.evaluate(arg,this);
}
break;
}
if(_54b!=null&&_54b.nodeType!=null){
_54b=UserInterface.getBinding(_54b);
}
return _54b;
};
Binding.prototype.serialize=function(){
var _54c={};
var id=this.bindingElement.id;
if(id&&id!=this.key){
_54c.id=id;
}
var _54e=this.getProperty("binding");
if(_54e){
_54c.binding=_54e;
}
if(!BindingSerializer.includeShadowTreeBindings){
var _54f=this.getAncestorBindingByLocalName("*");
if(_54f){
if(_54f.isShadowBinding){
this.isShadowBinding=true;
_54c=false;
}else{
var tree=_54f.shadowTree;
for(var key in tree){
var _552=tree[key];
if(_552==this){
this.isShadowBinding=true;
_54c=false;
}
}
}
}
}
return _54c;
};
Binding.prototype.serializeToString=function(_553){
var _554=null;
if(this.isAttached){
_554=new BindingSerializer().serializeBinding(this,_553);
}else{
throw "cannot serialize unattached binding";
}
return _554;
};
Binding.prototype.subTreeFromString=function(_555){
this.detachRecursive();
this.bindingElement.innerHTML=_555;
this.attachRecursive();
};
Binding.prototype.getProperty=function(_556){
var _557=this.bindingElement.getAttribute(_556);
if(_557){
_557=Types.castFromString(_557);
}
return _557;
};
Binding.prototype.setProperty=function(prop,_559){
if(_559!=null){
_559=_559.toString();
if(String(this.bindingElement.getAttribute(prop))!=_559){
this.bindingElement.setAttribute(prop,_559);
if(this.isAttached==true){
if(Persistance.isEnabled&&_559!=null){
if(this._persist!=null&&this._persist[prop]){
this._persist[prop]=_559;
Persistance.setPersistedProperty(this.bindingElement.id,prop,_559);
}
}
var _55a=this.propertyMethodMap[prop];
if(_55a){
_55a.call(this,this.getProperty(prop));
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
var _55c=null;
if(Binding.exists(this)){
_55c=this.bindingElement.id;
}else{
SystemDebug.stack(arguments);
}
return _55c;
};
Binding.prototype.attachClassName=function(_55d){
CSSUtil.attachClassName(this.bindingElement,_55d);
};
Binding.prototype.detachClassName=function(_55e){
CSSUtil.detachClassName(this.bindingElement,_55e);
};
Binding.prototype.hasClassName=function(_55f){
return CSSUtil.hasClassName(this.bindingElement,_55f);
};
Binding.prototype.addActionListener=function(type,_561){
_561=_561!=null?_561:this;
if(Action.isValid(type)){
if(Interfaces.isImplemented(IActionListener,_561)){
if(!this.actionListeners[type]){
this.actionListeners[type]=[];
}
this.actionListeners[type].push(_561);
}else{
throw new Error("Could not add action-event listener. Method handleAction not implemented.");
}
}else{
alert(this+"\nCould not add undefined Action ("+_561+")");
}
};
Binding.prototype.removeActionListener=function(type,_563){
_563=_563?_563:this;
if(Action.isValid(type)){
var _564=this.actionListeners[type];
if(_564){
var i=0,_566;
while((_566=_564[i])!=null){
if(_566==_563){
_564.splice(i,1);
break;
}
i++;
}
}
}
};
Binding.prototype.addEventListener=function(type,_568){
_568=_568?_568:this;
DOMEvents.addEventListener(this.bindingElement,type,_568);
};
Binding.prototype.removeEventListener=function(type,_56a){
_56a=_56a?_56a:this;
DOMEvents.removeEventListener(this.bindingElement,type,_56a);
};
Binding.prototype.subscribe=function(_56b){
if(!this.hasSubscription(_56b)){
this._subscriptions.set(_56b,true);
EventBroadcaster.subscribe(_56b,this);
}else{
this.logger.error("Dubplicate subscription aborted:"+_56b);
}
};
Binding.prototype.unsubscribe=function(_56c){
if(this.hasSubscription(_56c)){
this._subscriptions.del(_56c);
EventBroadcaster.unsubscribe(_56c,this);
}
};
Binding.prototype.hasSubscription=function(_56d){
return this._subscriptions.has(_56d);
};
Binding.prototype.observe=function(_56e,_56f){
_56e.addObserver(this,_56f);
};
Binding.prototype.unObserve=function(_570,_571){
_570.removeObserver(this,_571);
};
Binding.prototype.setContextMenu=function(arg){
this.contextMenuBinding=this.getBindingForArgument(arg);
if(this.contextMenuBinding){
var self=this;
var menu=this.contextMenuBinding;
this.addEventListener(DOMEvents.CONTEXTMENU,{handleEvent:function(e){
if(Interfaces.isImplemented(IActionListener,self)==true){
var _576={handleAction:function(){
menu.removeActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.removeActionListener(PopupBinding.ACTION_HIDE,_576);
}};
menu.addActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.addActionListener(PopupBinding.ACTION_HIDE,_576);
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
var _578=null;
var _579=null;
var _57a=false;
if(arg instanceof Action){
_578=arg;
}else{
if(Action.isValid(arg)){
_578=new Action(this,arg);
_57a=true;
}
}
if(_578!=null&&Action.isValid(_578.type)==true){
if(_578.isConsumed==true){
_579=_578;
}else{
var _57b=this.actionListeners[_578.type];
if(_57b!=null){
_578.listener=this;
var i=0,_57d;
while((_57d=_57b[i++])!=null){
if(_57d&&_57d.handleAction){
_57d.handleAction(_578);
}
}
}
var _57e=true;
if(this.isBlockingActions==true){
switch(_578.type){
case Binding.ACTION_FOCUSED:
case Binding.ACTION_BLURRED:
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FORCE_REFLEX:
case DockTabBinding.ACTION_UPDATE_VISUAL:
case PageBinding.ACTION_DOPOSTBACK:
break;
default:
if(!_57a){
_57e=false;
}
break;
}
}
if(_57e){
_579=this.migrateAction(_578);
}else{
_579=_578;
}
}
}
return _579;
};
Binding.prototype.migrateAction=function(_57f){
var _580=null;
var _581=null;
var node=this.getMigrationParent();
if(node){
while(node&&!_580&&node.nodeType!=Node.DOCUMENT_NODE){
_580=UserInterface.getBinding(node);
node=node.parentNode;
}
if(_580){
_581=_580.dispatchAction(_57f);
}else{
_581=_57f;
}
}
return _581;
};
Binding.prototype.reflex=function(_583){
if(Application.isOperational==true){
FlexBoxBinding.reflex(this,_583);
}
};
Binding.prototype.getMigrationParent=function(){
var _584=null;
if(true){
try{
var _585=this.bindingElement.parentNode;
if(_585!=null){
_584=_585;
}
}
catch(wtfException){
this.logger.error("Binding#getMigrationParent exception");
SystemDebug.stack(arguments);
_584=null;
}
}
return _584;
};
Binding.prototype.add=function(_586){
if(_586.bindingDocument==this.bindingDocument){
this.bindingElement.appendChild(_586.bindingElement);
}else{
throw "Could not add "+_586.toString()+" of different document origin.";
}
return _586;
};
Binding.prototype.addFirst=function(_587){
if(_587.bindingDocument==this.bindingDocument){
this.bindingElement.insertBefore(_587.bindingElement,this.bindingElement.firstChild);
}else{
throw "Could not add "+_587.toString()+" of different document origin.";
}
return _587;
};
Binding.prototype.getAncestorBindingByLocalName=function(_588,_589){
return BindingFinder.getAncestorBindingByLocalName(this,_588,_589);
};
Binding.prototype.getAncestorBindingByType=function(impl,_58b){
return BindingFinder.getAncestorBindingByType(this,impl,_58b);
};
Binding.prototype.getChildBindingByType=function(impl){
return BindingFinder.getChildBindingByType(this,impl);
};
Binding.prototype.getChildElementsByLocalName=function(_58d){
return BindingFinder.getChildElementsByLocalName(this,_58d);
};
Binding.prototype.getChildElementByLocalName=function(_58e){
return this.getChildElementsByLocalName(_58e).getFirst();
};
Binding.prototype.getDescendantElementsByLocalName=function(_58f){
return new List(DOMUtil.getElementsByTagName(this.bindingElement,_58f));
};
Binding.prototype.getChildBindingsByLocalName=function(_590){
return this.getDescendantBindingsByLocalName(_590,true);
};
Binding.prototype.getChildBindingByLocalName=function(_591){
return this.getChildBindingsByLocalName(_591).getFirst();
};
Binding.prototype.getDescendantBindingsByLocalName=function(_592,_593){
return BindingFinder.getDescendantBindingsByLocalName(this,_592,_593);
};
Binding.prototype.getDescendantBindingByLocalName=function(_594){
return this.getDescendantBindingsByLocalName(_594,false).getFirst();
};
Binding.prototype.getDescendantBindingsByType=function(impl){
return BindingFinder.getDescendantBindingsByType(this,impl);
};
Binding.prototype.getDescendantBindingByType=function(impl){
return BindingFinder.getDescendantBindingByType(this,impl);
};
Binding.prototype.getNextBindingByLocalName=function(_597){
return BindingFinder.getNextBindingByLocalName(this,_597);
};
Binding.prototype.getPreviousBindingByLocalName=function(_598){
return BindingFinder.getPreviousBindingByLocalName(this,_598);
};
Binding.prototype.getBindingElement=function(){
return this.bindingDocument.getElementById(this.bindingElement.id);
};
Binding.prototype.getOrdinalPosition=function(_599){
return DOMUtil.getOrdinalPosition(this.bindingElement,_599);
};
Binding.prototype.isFirstBinding=function(_59a){
return (this.getOrdinalPosition(_59a)==0);
};
Binding.prototype.isLastBinding=function(_59b){
return DOMUtil.isLastElement(this.bindingElement,_59b);
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
Binding.prototype.setCallBackArg=function(_59d){
this.setProperty(Binding.CALLBACKARG,_59d);
};
Binding.prototype.dispose=function(_59e){
if(!this.isDisposed){
if(!_59e){
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement);
var _59f=this.bindingDocument.getElementById(this.bindingElement.id);
if(_59f){
if(Client.isExplorer){
_59f.outerHTML="";
}else{
_59f.parentNode.removeChild(_59f);
}
}
}else{
if(this._subscriptions.hasEntries()){
var self=this;
var list=new List();
this._subscriptions.each(function(_5a2){
list.add(_5a2);
});
list.each(function(_5a3){
self.unsubscribe(_5a3);
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
Binding.prototype.wakeUp=function(_5a5,_5a6){
_5a6=_5a6?_5a6:Binding.SNOOZE;
if(this.isLazy==true){
this.deleteProperty("lazy");
this.isLazy=false;
Application.lock(this);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
var self=this;
setTimeout(function(){
self.attachRecursive();
setTimeout(function(){
if(_5a5!==undefined){
self[_5a5]();
}
LazyBindingBinding.wakeUp(self);
Application.unlock(self);
},_5a6);
},0);
}
};
Binding.prototype.handleCrawler=function(_5a8){
if(_5a8.response==null&&this.isLazy==true){
if(_5a8.id==DocumentCrawler.ID&&_5a8.mode==DocumentCrawler.MODE_REGISTER){
_5a8.response=NodeCrawler.NORMAL;
}else{
_5a8.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5a8.response==null&&this.crawlerFilters!=null){
if(this.crawlerFilters.has(_5a8.id)){
_5a8.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5a8.response==null){
switch(_5a8.id){
case FlexBoxCrawler.ID:
case FocusCrawler.ID:
if(!this.isVisible){
_5a8.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
}
};
Binding.newInstance=function(_5a9){
var _5aa=DOMUtil.createElementNS(Constants.NS_UI,"ui:binding",_5a9);
return UserInterface.registerBinding(_5aa,Binding);
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
var _5ab=new List(ConfigurationService.GetValidatingRegularExpressions("dummy"));
_5ab.each(function(_5ac){
DataBinding.expressions[_5ac.Key]=new RegExp(_5ac.Value);
});
}});
DataBinding.expressions={};
DataBinding.warnings={"required":"Required","number":"Numbers only","integer":"Integers only","programmingidentifier":"Invalid identifier","programmingnamespace":"Invalid namespace","url":"Invalid URL","minlength":"${count} characters minimum","maxlength":"${count} characters maximum","currency":"Invalid notation","email":"Invalid e-mail","guid":"Invalid GUID"};
DataBinding.errors={"programmingidentifier":"An identifier must not contain spaces or special characters. Only characters a-z, A-Z and 0-9 are allowed. An identifier must begin with a letter (not a number).","programmingnamespace":"A namespace must take the form Example.Name.Space where only characters a-z, A-Z, 0-9 and dots (.) are allowed. Each part of the namespace must begin with a letter (not a number).","url":"A valid URL must begin with a forward slash, designating the site root, or an URL scheme name such as http://. Simpliefied addresses such as www.example.com cannot be resolved reliably by the browser. Relative URLs are not supported."};
DataBinding.getAssociatedLabel=function(_5ad){
var _5ae=null;
var _5af=_5ad.getAncestorBindingByLocalName("field");
if(_5af&&_5af instanceof FieldBinding){
var desc=_5af.getDescendantBindingByLocalName("fielddesc");
if(desc&&desc instanceof FieldDescBinding){
_5ae=desc.getLabel();
}
}
return _5ae;
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
var _5b2=this.bindingWindow.DataManager;
_5b2.unRegisterDataBinding(this._name);
};
DataBinding.prototype.setName=function(name){
var _5b4=this.bindingWindow.DataManager;
if(_5b4.getDataBinding(name)){
_5b4.unRegisterDataBinding(name);
}
_5b4.registerDataBinding(name,this);
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
RootBinding.prototype.handleBroadcast=function(_5b5,arg){
RootBinding.superclass.handleBroadcast.call(this,_5b5,arg);
var _5b7=this.bindingWindow.WindowManager.WINDOW_EVALUATED_BROADCAST;
switch(_5b5){
case _5b7:
this.dispatchAction(RootBinding.ACTION_PHASE_1);
this.dispatchAction(RootBinding.ACTION_PHASE_2);
this.dispatchAction(RootBinding.ACTION_PHASE_3);
this.unsubscribe(_5b7);
break;
}
};
RootBinding.prototype.onActivate=function(){
this._onActivationChanged(true);
};
RootBinding.prototype.onDeactivate=function(){
this._onActivationChanged(false);
};
RootBinding.prototype._onActivationChanged=function(_5b8){
var _5b9=_5b8?RootBinding.ACTION_ACTIVATED:RootBinding.ACTION_DEACTIVATED;
if(_5b8!=this.isActivated){
this.isActivated=_5b8;
this.dispatchAction(_5b9);
var _5ba=new List();
var self=this;
this._activationawares.each(function(_5bc){
if(_5bc.isActivationAware){
try{
if(_5b8){
if(!_5bc.isActivated){
_5bc.onActivate();
}
}else{
if(_5bc.isActivated){
_5bc.onDeactivate();
}
}
}
catch(exception){
self.logger.error(exception);
_5ba.add(_5bc);
}
}
});
_5ba.each(function(_5bd){
this._activationawares.del(_5bd);
});
_5ba.dispose();
}else{
var _5be="Activation dysfunction: "+this.bindingDocument.title;
if(Application.isDeveloperMode==true){
this.logger.error(_5be);
}else{
this.logger.error(_5be);
}
}
};
RootBinding.prototype.makeActivationAware=function(_5bf,_5c0){
if(Interfaces.isImplemented(IActivationAware,_5bf,true)==true){
if(_5c0==false){
this._activationawares.del(_5bf);
}else{
this._activationawares.add(_5bf);
if(this.isActivated==true){
_5bf.onActivate();
}
}
}else{
if(Application.isDeveloperMode==true){
alert("RootBinding: IActivationAware not implemented ("+_5bf+")");
}
}
};
RootBinding.prototype._setupActivationAwareness=function(_5c1){
var _5c2=this.getMigrationParent();
if(_5c2!=null){
var root=_5c2.ownerDocument.body;
var _5c4=UserInterface.getBinding(root);
if(_5c4!=null){
_5c4.makeActivationAware(this,_5c1);
}
}
};
RootBinding.prototype.handleCrawler=function(_5c5){
RootBinding.superclass.handleCrawler.call(this,_5c5);
if(_5c5.type==NodeCrawler.TYPE_ASCENDING){
_5c5.nextNode=this.bindingWindow.frameElement;
}
};
RootBinding.prototype.getMigrationParent=function(){
var _5c6=null;
if(this.bindingWindow.parent){
_5c6=this.bindingWindow.frameElement;
}
return _5c6;
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
var _5c7=new List(DOMUtil.getElementsByTagName(this.bindingElement,"td"));
while(_5c7.hasNext()){
var cell=_5c7.getNext();
this.shadowTree[cell.className]=cell;
}
};
MatrixBinding.prototype.add=function(_5c9){
var _5ca=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
this.shadowTree[MatrixBinding.CENTER].appendChild(_5c9.bindingElement);
_5ca=_5c9;
}else{
_5ca=MatrixBinding.superclass.add.call(this,_5c9);
}
return _5ca;
};
MatrixBinding.prototype.addFirst=function(_5cb){
var _5cc=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
var _5cd=this.shadowTree[MatrixBinding.CENTER];
_5cd.insertBefore(_5cb.bindingElement,_5cd.firstChild);
_5cc=_5cb;
}else{
_5cc=MatrixBinding.superclass.addFirst.call(this,_5cb);
}
return _5cb;
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
MatrixBinding.newInstance=function(_5cf){
var _5d0=DOMUtil.createElementNS(Constants.NS_UI,"ui:matrix",_5cf);
return UserInterface.registerBinding(_5d0,MatrixBinding);
};
FlexBoxBinding.prototype=new Binding;
FlexBoxBinding.prototype.constructor=FlexBoxBinding;
FlexBoxBinding.superclass=Binding.prototype;
FlexBoxBinding.CLASSNAME="flexboxelement";
FlexBoxBinding.TIMEOUT=250;
FlexBoxBinding.reflex=function(_5d1,_5d2){
var list=new List();
var _5d4=new FlexBoxCrawler();
_5d4.mode=_5d2?FlexBoxCrawler.MODE_FORCE:FlexBoxCrawler.MODE_NORMAL;
_5d4.startBinding=_5d1;
_5d4.crawl(_5d1.bindingElement,list);
list.each(function(_5d5){
_5d5.flex();
});
if(Client.isExplorer){
setTimeout(function(){
list.each(function(_5d6){
if(Binding.exists(_5d6)){
_5d6.flex();
}
});
},0.5*FlexBoxBinding.TIMEOUT);
}
setTimeout(function(){
list.each(function(_5d7){
if(Binding.exists(_5d7)){
_5d7.isFlexSuspended=false;
}
});
list.dispose();
},FlexBoxBinding.TIMEOUT);
_5d4.dispose();
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
FlexBoxBinding.prototype.handleAction=function(_5d8){
FlexBoxBinding.superclass.handleAction.call(this,_5d8);
switch(_5d8.type){
case Binding.ACTION_UPDATED:
this.isFit=false;
break;
}
};
FlexBoxBinding.prototype._getSiblingsSpan=function(_5d9){
var _5da=0;
var _5db=new List(this.bindingElement.parentNode.childNodes);
while(_5db.hasNext()){
var _5dc=_5db.getNext();
if(_5dc.nodeType==Node.ELEMENT_NODE&&_5dc!=this.bindingElement){
if(!this._isOutOfFlow(_5dc)){
var rect=_5dc.getBoundingClientRect();
if(_5d9){
height+=(rect.right-rect.left);
}else{
_5da+=(rect.bottom-rect.top);
}
}
}
}
return _5da;
};
FlexBoxBinding.prototype._isOutOfFlow=function(_5de){
var _5df=CSSComputer.getPosition(_5de);
var _5e0=CSSComputer.getFloat(_5de);
return (_5df=="absolute"||_5e0!="none"?true:false);
};
FlexBoxBinding.prototype._getCalculatedHeight=function(){
var _5e1=this.bindingElement.parentNode;
var rect=_5e1.getBoundingClientRect();
var _5e3=rect.bottom-rect.top;
var _5e4=CSSComputer.getPadding(_5e1);
var _5e5=CSSComputer.getBorder(_5e1);
_5e3-=(_5e4.top+_5e4.bottom);
_5e3-=(_5e5.top+_5e5.bottom);
return _5e3;
};
FlexBoxBinding.prototype._getCalculatedWidth=function(){
var _5e6=this.bindingElement.parentNode;
var rect=_5e6.getBoundingClientRect();
var _5e8=rect.right-rect.left;
var _5e9=CSSComputer.getPadding(_5e6);
var _5ea=CSSComputer.getBorder(_5e6);
_5e8-=(_5e9.left+_5e9.right);
_5e8-=(_5ea.left+_5ea.right);
return _5e8;
};
FlexBoxBinding.prototype.setFlexibility=function(_5eb){
if(_5eb!=this.isFlexible){
if(_5eb){
this.attachClassName(FlexBoxBinding.CLASSNAME);
this.deleteProperty("flex");
}else{
this.detachClassName(FlexBoxBinding.CLASSNAME);
this.setProperty("flex",false);
}
this.isFlexible=_5eb;
}
};
FlexBoxBinding.prototype.flex=function(){
if(Binding.exists(this)){
if(this.isFlexible==true){
var _5ec=this._getSiblingsSpan();
_5ec=this._getCalculatedHeight()-_5ec;
if(!isNaN(_5ec)&&_5ec>=0){
if(_5ec!=this.bindingElement.offsetHeight){
this.bindingElement.style.height=String(_5ec)+"px";
}
}
}
}
};
FlexBoxBinding.prototype.fit=function(_5ed){
if(!this.isFit||_5ed){
var _5ee=0;
new List(this.bindingElement.childNodes).each(function(_5ef){
if(_5ef.nodeType==Node.ELEMENT_NODE){
if(!this._isOutOfFlow(_5ef)){
var rect=_5ef.getBoundingClientRect();
_5ee+=(rect.bottom-rect.top);
}
}
},this);
this._setFitnessHeight(_5ee);
this.isFit=true;
}
};
FlexBoxBinding.prototype._setFitnessHeight=function(_5f1){
var _5f2=CSSComputer.getPadding(this.bindingElement);
var _5f3=CSSComputer.getBorder(this.bindingElement);
_5f1+=_5f2.top+_5f2.bottom;
_5f1+=_5f3.top+_5f3.bottom;
this.bindingElement.style.height=_5f1+"px";
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
ScrollBoxBinding.prototype.handleAction=function(_5f4){
ScrollBoxBinding.superclass.handleAction.call(this,_5f4);
switch(_5f4.type){
case BalloonBinding.ACTION_INITIALIZE:
_5f4.consume();
break;
}
};
ScrollBoxBinding.prototype.setPosition=function(_5f5){
this.bindingElement.scrollLeft=_5f5.x;
this.bindingElement.scrollTop=_5f5.y;
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
var _5f6=this._getBuildElement("labeltext");
if(_5f6){
this.shadowTree.labelText=_5f6;
this.shadowTree.text=_5f6.firstChild;
this.hasLabel=true;
}
}else{
var _5f7=this.getProperty("label");
var _5f8=this.getProperty("image");
var _5f9=this.getProperty("tooltip");
if(_5f7){
this.setLabel(_5f7,false);
}
if(_5f8){
this.setImage(_5f8,false);
}
if(_5f9){
this.setToolTip(_5f9);
}
this.buildClassName();
}
};
LabelBinding.prototype.setLabel=function(_5fa,_5fb){
_5fa=_5fa?_5fa:"";
if(!this.hasLabel){
this.buildLabel();
}
this.shadowTree.text.data=Resolver.resolve(_5fa);
this.setProperty("label",_5fa);
if(!_5fb){
this.buildClassName();
}
};
LabelBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
LabelBinding.prototype.setImage=function(url,_5fd){
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
if(!_5fd){
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
LabelBinding.prototype.setToolTip=function(_600){
this.setProperty("tooltip",_600);
if(_600!=this.getLabel()){
this.setProperty("title",Resolver.resolve(_600));
}
};
LabelBinding.prototype.getToolTip=function(_601){
return this.getProperty("tooltip");
};
LabelBinding.prototype.flip=function(_602){
_602=_602==null?true:_602;
var _603=LabelBinding.CLASSNAME_FLIPPED;
if(!Client.isExplorer6){
this.isFlipped=_602;
if(_602){
this.attachClassName(_603);
}else{
this.detachClassName(_603);
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
var _604="textonly";
var _605="imageonly";
var _606="both";
if(this.hasLabel&&this.hasImage){
this.detachClassName(_604);
this.detachClassName(_605);
this.attachClassName(_606);
}else{
if(this.hasLabel){
this.detachClassName(_606);
this.detachClassName(_605);
this.attachClassName(_604);
}else{
if(this.hasImage){
this.detachClassName(_606);
this.detachClassName(_604);
this.attachClassName(_605);
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
LabelBinding.newInstance=function(_607){
var _608=DOMUtil.createElementNS(Constants.NS_UI,"ui:labelbox",_607);
return UserInterface.registerBinding(_608,LabelBinding);
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
var _609=this.getProperty("label");
if(!_609){
_609=DOMUtil.getTextContent(this.bindingElement);
}
var text=this.bindingDocument.createTextNode(Resolver.resolve(_609));
this.bindingElement.parentNode.replaceChild(text,this.bindingElement);
this.dispose();
};
TextBinding.prototype.setLabel=function(_60b){
this.setProperty("label",_60b);
};
TextBinding.newInstance=function(_60c){
var _60d=DOMUtil.createElementNS(Constants.NS_UI,"ui:text",_60c);
return UserInterface.registerBinding(_60d,TextBinding);
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
BroadcasterBinding.prototype.setProperty=function(_60e,_60f){
BroadcasterBinding.superclass.setProperty.call(this,_60e,_60f);
function update(list){
if(list){
list.each(function(_611){
_611.setProperty(_60e,_60f);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _612=this._observers[_60e];
if(_612){
update(_612);
}
};
BroadcasterBinding.prototype.deleteProperty=function(_613){
BroadcasterBinding.superclass.deleteProperty.call(this,_613);
function update(list){
if(list){
list.each(function(_615){
_615.deleteProperty(_613);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _616=this._observers[_613];
if(_616){
update(_616);
}
};
BroadcasterBinding.prototype.addObserver=function(_617,_618){
_618=_618?_618:"*";
_618=new List(_618.split(" "));
while(_618.hasNext()){
var _619=_618.getNext();
switch(_619){
case "*":
this._setAllProperties(_617);
break;
default:
var _61a=this.getProperty(_619);
_617.setProperty(_619,_61a);
break;
}
if(!this._observers[_619]){
this._observers[_619]=new List();
}
this._observers[_619].add(_617);
}
};
BroadcasterBinding.prototype._setAllProperties=function(_61b){
var atts=new List(this.bindingElement.attributes);
while(atts.hasNext()){
var att=atts.getNext();
if(att.specified){
var _61e=att.nodeName;
switch(_61e){
case "id":
case "key":
break;
default:
var _61f=this.getProperty(_61e);
_61b.setProperty(_61e,_61f);
break;
}
}
}
};
BroadcasterBinding.prototype.removeObserver=function(_620,_621){
_621=_621?_621:"*";
_621=new List(_621.split(" "));
while(_621.hasNext()){
var list=this._observers[_621.getNext()];
if(list){
while(list.hasNext()){
var _623=list.getNext();
if(_623==_620){
list.del(_623);
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
BroadcasterBinding.prototype.setDisabled=function(_624){
this.setProperty("isdisabled",_624);
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
var _626=this.getProperty("width");
var _627=this.getProperty("label");
var type=this.getProperty("type");
var _629=this.getProperty("popup");
var _62a=this.getProperty("tooltip");
var _62b=this.getProperty("isdisabled");
var _62c=this.getProperty("response");
var _62d=this.getProperty("oncommand");
var _62e=this.getProperty("value");
var _62f=this.getProperty("ischecked");
var _630=this.getProperty("callbackid");
var _631=this.getProperty("focusable");
var _632=this.getProperty("focused");
var _633=this.getProperty("default");
var url=this.getProperty("url");
var _635=this.getProperty("flip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.add(this.labelBinding);
this.labelBinding.attach();
this.shadowTree.labelBinding=this.labelBinding;
if(_635){
this.flip(true);
}
if(!this._stateManager){
this._stateManager=new ButtonStateManager(this);
}
if(this.imageProfile!=null&&this.imageProfile.getDefaultImage()!=null){
this.setImage(this.imageProfile.getDefaultImage());
}
if(_627!=null){
this.setLabel(_627);
}
if(type!=null){
this.setType(type);
}
if(_62a!=null){
this.setToolTip(_62a);
}
if(_626!=null){
this.setWidth(_626);
}
if(_629!=null){
this.setPopup(_629);
}
if(_62c!=null){
this.response=_62c;
}
if(_62f==true){
if(this.isCheckButton||this.isRadioButton){
this.check(true);
}
}
if(_62d!=null&&this.oncommand==null){
this.oncommand=function(){
Binding.evaluate(_62d,this);
};
}
if(_631||this.isFocusable){
this._makeFocusable();
if(_633||this.isDefault){
this.isDefault=true;
}
if(_632){
this.focus();
}
}
if(_62b==true){
this.disable();
}
if(url!=null){
this.setURL(url);
}
if(_630!=null){
this.bindingWindow.DataManager.registerDataBinding(_630,this);
if(_62e!=null){
Binding.dotnetify(this,_62e);
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
ButtonBinding.prototype.setImage=function(_636){
if(this.isAttached){
this.labelBinding.setImage(_636);
}
this.setProperty("image",_636);
};
ButtonBinding.prototype.getImage=function(){
return this.getProperty("image");
};
ButtonBinding.prototype.setLabel=function(_637){
if(this.isAttached){
this.labelBinding.setLabel(_637);
}
this.setProperty("label",_637);
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
ButtonBinding.prototype.setToolTip=function(_639){
this.setProperty("tooltip",_639);
if(this.isAttached==true){
this.setProperty("title",Resolver.resolve(_639));
}
};
ButtonBinding.prototype.getToolTip=function(){
return this.getProperty("tooltip");
};
ButtonBinding.prototype.setImageProfile=function(_63a){
this.imageProfile=new _63a(this);
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
ButtonBinding.prototype.flip=function(_63f){
_63f=_63f==null?true:_63f;
this.isFlipped=_63f;
this.setProperty("flip",_63f);
if(this.isAttached){
this.labelBinding.flip(_63f);
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
ButtonBinding.prototype.check=function(_640){
if((this.isCheckButton||this.isRadioButton)&&!this.isChecked){
if(this.isAttached==true){
this._check();
if(!_640==true){
this.fireCommand();
}
}
this.setProperty("ischecked",true);
}
};
ButtonBinding.prototype._check=function(_641){
this.isActive=true;
this.isChecked=true;
if(!_641){
this._stateManager.invokeActiveState();
}
};
ButtonBinding.prototype.uncheck=function(_642){
if((this.isCheckButton||this.isRadioButton)&&this.isChecked){
if(this.isAttached==true){
this._uncheck();
if(!_642==true){
this.fireCommand();
}
}
this.setProperty("ischecked",false);
}
};
ButtonBinding.prototype._uncheck=function(_643){
this.isActive=false;
this.isChecked=false;
if(!_643){
this._stateManager.invokeNormalState();
}
};
ButtonBinding.prototype.setChecked=function(_644,_645){
if(_644==null){
_644==false;
}
if(this.isCheckButton||this.isRadioButton){
switch(_644){
case true:
this.check(_645);
break;
case false:
this.uncheck(_645);
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
var _647=this.getProperty("tooltip");
if(_647){
this.setToolTip(_647);
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
var _648=null;
if(this.isAttached==true){
this.labelBinding.bindingElement.style.marginLeft="0";
this.labelBinding.bindingElement.style.marginRight="0";
_648=this.labelBinding.bindingElement.offsetWidth;
}else{
throw "ButtonBinding: getEqualSizeWidth failed for non-attached button.";
}
return _648;
};
ButtonBinding.prototype.setEqualSizeWidth=function(goal){
if(this.isAttached==true){
var _64a=this.getEqualSizeWidth();
if(goal>_64a){
var diff=goal-_64a;
var marg=Math.floor(diff*0.5);
this.labelBinding.bindingElement.style.marginLeft=marg+"px";
this.labelBinding.bindingElement.style.marginRight=marg+"px";
}
}
};
ButtonBinding.prototype.getWidth=function(){
var _64d=null;
if(this.isAttached==true){
var _64e=CSSComputer.getPadding(this.bindingElement);
var _64f=CSSComputer.getPadding(this.bindingElement);
_64d=this.shadowTree.c.offsetWidth+this.shadowTree.e.offsetWidth+this.shadowTree.w.offsetWidth;
_64d=_64d+_64e.left+_64e.right;
_64d=_64d+_64f.left+_64f.right;
}else{
throw "ButtonBinding: getWidth failed for non-attached button.";
}
return _64d;
};
ButtonBinding.prototype.setWidth=function(_650){
if(this.isAttached==true){
var _651=this.shadowTree.e.offsetWidth+this.shadowTree.w.offsetWidth;
var _652=CSSComputer.getPadding(this.shadowTree.c);
var _653=_650-_651;
_653=_653-_652.left-_652.right;
this.shadowTree.c.style.width=String(_653)+"px";
if(this.getProperty("centered")){
this.labelBinding.bindingElement.style.marginLeft=String(0.5*(_653-this.labelBinding.bindingElement.offsetWidth))+"px";
}
}
this.setProperty("width",_650);
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
ButtonBinding.prototype.setValue=function(_654){
this.shadowTree.dotnetinput.value=_654;
};
ButtonBinding.prototype.getResult=function(){
return this.getValue();
};
ButtonBinding.prototype.setResult=function(_655){
this.setValue(_655);
};
ButtonStateManager.STATE_NORMAL=0;
ButtonStateManager.STATE_HOVER=1;
ButtonStateManager.STATE_ACTIVE=2;
ButtonStateManager.RIGHT_BUTTON=2;
function ButtonStateManager(_656){
this.logger=SystemLogger.getLogger("ButtonStateManager");
this.binding=_656;
this.imageProfile=_656.imageProfile;
this.assignDOMEvents(true);
}
ButtonStateManager.prototype.assignDOMEvents=function(_657){
var _658=_657?"addEventListener":"removeEventListener";
this.binding[_658](DOMEvents.MOUSEENTER,this);
this.binding[_658](DOMEvents.MOUSELEAVE,this);
this.binding[_658](DOMEvents.MOUSEDOWN,this);
this.binding[_658](DOMEvents.MOUSEUP,this);
};
ButtonStateManager.prototype.dispose=function(){
this.assignDOMEvents(false);
this.binding=null;
this.imageProfile=null;
};
ButtonStateManager.prototype.handleEvent=function(e){
if(Binding.exists(this.binding)&&!this.binding.isDisabled&&!BindingDragger.isDragging){
var _65a=false,_65b=null;
if(e.button==ButtonStateManager.RIGHT_BUTTON){
}else{
if(this.binding.isCheckBox){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_65b=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_65b=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_65b=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSEUP:
this.binding.isChecked=!this.binding.isChecked;
_65b=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_65b==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_65a=true;
break;
}
}else{
if(this.binding.isCheckButton||this.binding.isRadioButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
if(!this.binding.isChecked){
_65b=ButtonStateManager.STATE_HOVER;
}
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
if(!this.binding.isChecked){
_65b=ButtonStateManager.STATE_NORMAL;
}
break;
case DOMEvents.MOUSEDOWN:
_65b=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
if(this.binding.isCheckButton||!this.binding.isChecked){
this.binding.isChecked=!this.binding.isChecked;
_65b=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_65b==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_65a=true;
}
break;
}
}else{
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_65b=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_65b=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_65b=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_65b=ButtonStateManager.STATE_NORMAL;
_65a=true;
break;
}
}
}
}
switch(_65b){
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
if(_65a){
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
var _65f=this.imageProfile.getDisabledImage();
if(_65f){
this.binding.setImage(_65f);
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
ClickButtonBinding.newInstance=function(_660){
var _661=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_660);
return UserInterface.registerBinding(_661,ClickButtonBinding);
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
RadioButtonBinding.newInstance=function(_662){
var _663=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiobutton",_662);
return UserInterface.registerBinding(_663,RadioButtonBinding);
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
CheckButtonBinding.newInstance=function(_664){
var _665=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbutton",_664);
return UserInterface.registerBinding(_665,CheckButtonBinding);
};
CheckButtonImageProfile.IMG_DEFAULT="${skin}/buttons/checkbutton-default.png";
CheckButtonImageProfile.IMG_HOVER="${skin}/buttons/checkbutton-hover.png";
CheckButtonImageProfile.IMG_ACTIVE="${skin}/buttons/checkbutton-active.png";
CheckButtonImageProfile.IMG_ACTIVE_HOVER="${skin}/buttons/checkbutton-active-hover.png";
CheckButtonImageProfile.IMG_DISABLED=null;
CheckButtonImageProfile.IMG_DISABLED_ON=null;
function CheckButtonImageProfile(_666){
this._binding=_666;
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
var _667=this.getDescendantBindingsByLocalName("control");
_667.each(function(_668){
_668.setControlType(_668.controlType);
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
ControlGroupBinding.newInstance=function(_66a){
var _66b=DOMUtil.createElementNS(Constants.NS_UI,"ui:controlgroup",_66a);
return UserInterface.registerBinding(_66b,ControlGroupBinding);
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
ControlBinding.prototype.handleAction=function(_66e){
ControlBinding.superclass.handleAction.call(this,_66e);
switch(_66e.type){
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
function ControlImageProfile(_66f){
this.binding=_66f;
}
ControlImageProfile.prototype._getImage=function(_670){
var _671=null;
switch(this.binding.controlType){
case ControlBinding.TYPE_MINIMIZE:
_671=this.constructor.IMAGE_MINIMIZE;
break;
case ControlBinding.TYPE_MAXIMIZE:
_671=this.constructor.IMAGE_MAXIMIZE;
break;
case ControlBinding.TYPE_UNMAXIMIZE:
case ControlBinding.TYPE_UNMINIMIZE:
_671=this.constructor.IMAGE_RESTORE;
break;
case ControlBinding.TYPE_CLOSE:
_671=this.constructor.IMAGE_CLOSE;
break;
}
return _671.replace("${string}",_670);
};
ControlImageProfile.prototype.getDefaultImage=function(){
var _672=true;
if(this.binding.isGhostable&&this.binding.containingControlBoxBinding){
_672=this.binding.containingControlBoxBinding.isActive?true:false;
}
return _672?this._getImage("default"):this._getImage("ghosted");
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
ControlBoxBinding.prototype.handleAction=function(_673){
ControlBoxBinding.superclass.handleAction.call(this,_673);
switch(_673.type){
case ControlBinding.ACTION_COMMAND:
var _674=_673.target;
Application.lock(this);
var self=this;
setTimeout(function(){
self.handleInvokedControl(_674);
Application.unlock(self);
},0);
_673.consume();
break;
}
};
ControlBoxBinding.prototype.handleInvokedControl=function(_676){
switch(_676.controlType){
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
ControlBoxBinding.prototype.setState=function(_677){
var _678=this.getState();
this.setProperty("state",_677);
this.detachClassName(_678);
this.attachClassName(_677);
this.dispatchAction(ControlBoxBinding.ACTION_STATECHANGE);
};
ControlBoxBinding.prototype.getState=function(){
var _679=this.getProperty("state");
if(!_679){
_679=ControlBoxBinding.STATE_NORMAL;
}
return _679;
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
MenuContainerBinding.prototype.isOpen=function(_67a){
var _67b=null;
if(!_67a){
_67b=this._isOpen;
}else{
_67b=(_67a==this._openElement);
}
return _67b;
};
MenuContainerBinding.prototype.setOpenElement=function(_67c){
if(_67c){
if(this._openElement){
this._openElement.hide();
}
this._openElement=_67c;
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
var _67d=this.getChildBindingByLocalName("menupopup");
if(_67d&&_67d!=this.menuPopupBinding){
this.menuPopupBinding=_67d;
this.menuPopupBinding.addActionListener(PopupBinding.ACTION_HIDE,this);
}
return this.menuPopupBinding;
};
MenuContainerBinding.prototype.show=function(){
var _67e=this.getMenuContainerBinding();
_67e.setOpenElement(this);
var _67f=this.getMenuPopupBinding();
_67f.snapTo(this.bindingElement);
_67f.show();
};
MenuContainerBinding.prototype.hide=function(){
this.reset();
this.getMenuPopupBinding().hide();
if(this._isOpen){
this._openElement.hide();
}
};
MenuContainerBinding.prototype.reset=Binding.ABSTRACT_METHOD;
MenuContainerBinding.prototype.handleAction=function(_680){
MenuContainerBinding.superclass.handleAction.call(this,_680);
if(_680.type==PopupBinding.ACTION_HIDE){
var _681=this.getMenuContainerBinding();
_681.setOpenElement(false);
this.reset();
_680.consume();
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
MenuBarBinding.prototype.handleAction=function(_682){
MenuBarBinding.superclass.handleAction.call(this,_682);
switch(_682.type){
case MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY:
var _683=_682.target;
var _684=this.getChildBindingsByLocalName("menu");
while(_684.hasNext()){
var menu=_684.getNext();
}
switch(_683.arrowKey){
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
var _686=this.getProperty("image");
var _687=this.getProperty("label");
var _688=this.getProperty("tooltip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menulabel");
this.add(this.labelBinding);
if(_687){
this.setLabel(_687);
}
if(_686){
this.setImage(_686);
}
if(_688){
this.setToolTip(_688);
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
MenuBinding.prototype.setLabel=function(_68a){
this.setProperty("label",_68a);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_68a));
}
};
MenuBinding.prototype.setToolTip=function(_68b){
this.setProperty("tooltip",_68b);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_68b));
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
var _68d=this.getMenuContainerBinding();
if(!BindingDragger.isDragging){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(_68d.isOpen(this)){
DOMEvents.stopPropagation(e);
}
break;
case DOMEvents.MOUSEOVER:
if(_68d.isOpen()&&!_68d.isOpen(this)){
this.show();
this.menuPopupBinding.grabKeyboard();
}
this.attachClassName("hover");
this.isFocused=true;
break;
case DOMEvents.MOUSEOUT:
if(!_68d.isOpen()){
this.hide();
}
this.isFocused=false;
break;
case DOMEvents.MOUSEUP:
if(!_68d.isOpen(this)){
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
MenuBodyBinding.handleBroadcast=function(_68e,arg){
var body=MenuBodyBinding.activeInstance;
var key=arg;
if(body){
switch(_68e){
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
this.addActionListener(MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY,{handleAction:function(_693){
switch(_693.target){
case self:
self.releaseKeyboard();
self._containingPopupBinding.hide();
break;
default:
var _694=null;
var _695=true;
self._lastFocused.focus();
self.grabKeyboard();
_693.consume();
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
MenuBodyBinding.prototype.handleFocusedItem=function(_697){
for(var key in this._focused){
if(key!=_697.key){
var item=this._focused[key];
item.blur();
}
}
this._focused[_697.key]=_697;
this._lastFocused=_697;
if(MenuBodyBinding.activeInstance!=this){
this.grabKeyboard();
}
};
MenuBodyBinding.prototype.handleBlurredItem=function(_69a){
delete this._focused[_69a.key];
};
MenuBodyBinding.prototype.resetFocusedItems=function(_69b){
for(var key in this._focused){
var item=this._focused[key];
item.blur(_69b);
}
if(_69b){
this._lastFocused=null;
}
};
MenuBodyBinding.prototype.refreshMenuGroups=function(){
if(!this.isAttached){
throw "refreshMenuGroups: MenuBodyBinding not attached!";
}else{
var _69e=this.getChildBindingsByLocalName("menugroup");
var _69f=null;
var _6a0=null;
while(_69e.hasNext()){
var _6a1=_69e.getNext();
if(!_6a1.isDefaultContent){
_6a1.setLayout(MenuGroupBinding.LAYOUT_DEFAULT);
if(!_69f&&_6a1.isVisible){
_69f=_6a1;
}
if(_6a1.isVisible){
_6a0=_6a1;
}
}
}
if(_69f&&_6a0){
_69f.setLayout(MenuGroupBinding.LAYOUT_FIRST);
_6a0.setLayout(MenuGroupBinding.LAYOUT_LAST);
}
}
};
MenuBodyBinding.prototype.grabKeyboard=function(_6a2){
MenuBodyBinding.activeInstance=this;
if(_6a2){
var _6a3=this._getMenuItems().getFirst();
if(_6a3){
_6a3.focus();
}
}
};
MenuBodyBinding.prototype.releaseKeyboard=function(){
if(MenuBodyBinding.activeInstance==this){
MenuBodyBinding.activeInstance=null;
}
};
MenuBodyBinding.prototype.handleEnterKey=function(){
var _6a4=this._lastFocused;
if((_6a4!=null)&&(!_6a4.isMenuContainer)){
_6a4.fireCommand();
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEDOWN);
}
};
MenuBodyBinding.prototype.handleArrowKey=function(key){
this.arrowKey=key;
var _6a6=this._getMenuItems();
var _6a7=null;
var next=null;
if(this._lastFocused){
_6a7=this._lastFocused;
switch(key){
case KeyEventCodes.VK_UP:
next=_6a6.getPreceding(_6a7);
break;
case KeyEventCodes.VK_DOWN:
next=_6a6.getFollowing(_6a7);
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
next=_6a6.getFirst();
}
if(next){
next.focus();
}
};
MenuBodyBinding.prototype._getMenuItems=function(){
if(!this._menuItemsList||this.isDirty){
var list=new List();
var _6aa=null;
this.getChildBindingsByLocalName("menugroup").each(function(_6ab){
_6aa=_6ab.getChildBindingsByLocalName("menuitem");
_6aa.each(function(item){
list.add(item);
});
});
_6aa=this.getChildBindingsByLocalName("menuitem");
_6aa.each(function(item){
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
MenuBodyBinding.newInstance=function(_6af){
var _6b0=DOMUtil.createElementNS(Constants.NS_UI,"ui:menubody",_6af);
return UserInterface.registerBinding(_6b0,MenuBodyBinding);
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
MenuGroupBinding.prototype.setLayout=function(_6b1){
switch(_6b1){
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
MenuGroupBinding.newInstance=function(_6b2){
var _6b3=DOMUtil.createElementNS(Constants.NS_UI,"ui:menugroup",_6b2);
return UserInterface.registerBinding(_6b3,MenuGroupBinding);
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
var _6b4=this.getProperty("image");
var _6b5=this.getProperty("image-hover");
var _6b6=this.getProperty("image-active");
var _6b7=this.getProperty("image-disabled");
if(!this.image&&_6b4){
this.image=_6b4;
}
if(!this.imageHover&&_6b5){
this.imageHover=_6b4;
}
if(!this.imageActive&&_6b6){
this.imageActive=_6b6;
}
if(!this.imageDisabled&&_6b7){
this.imageDisabled=_6b7;
}
};
MenuItemBinding.prototype.buildDOMContent=function(){
var _6b8=this.getProperty("label");
var _6b9=this.getProperty("tooltip");
var type=this.getProperty("type");
var _6bb=this.getProperty("isdisabled");
var _6bc=this.getProperty("image");
var _6bd=this.getProperty("image-hover");
var _6be=this.getProperty("image-active");
var _6bf=this.getProperty("image-disabled");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menuitemlabel");
this.add(this.labelBinding);
var _6c0=this.getMenuPopupBinding();
if(_6c0){
this.isMenuContainer=true;
this.setType(MenuItemBinding.TYPE_MENUCONTAINER);
}
if(!this.imageProfile){
if(!this.image&&_6bc){
this.image=_6bc;
}
if(!this.imageHover&&_6bd){
this.imageHover=_6bc;
}
if(!this.imageActive&&_6be){
this.imageActive=_6be;
}
if(!this.imageDisabled&&_6bf){
this.imageDisabled=_6bf;
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
if(_6b8){
this.setLabel(_6b8);
}
if(_6b9){
this.setToolTip(_6b9);
}
if(type){
this.setType(type);
}
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.getProperty("ischecked")==true){
this.check(true);
}
}
if(_6bb==true){
this.disable();
}
var _6c1=this.getProperty("oncommand");
if(_6c1){
if(this.isMenuContainer){
throw new Error("MenuItemBinding with contained menuitems cannot fire commands.");
}else{
this.oncommand=function(){
this.bindingWindow.eval(_6c1);
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
MenuItemBinding.prototype.setLabel=function(_6c4){
this.setProperty("label",_6c4);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6c4));
}
};
MenuItemBinding.prototype.setToolTip=function(_6c5){
this.setProperty("tooltip",_6c5);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6c5));
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
var _6c7=this.bindingDocument.createElement("div");
_6c7.className=MenuItemBinding.CLASSNAME_CHECKBOX;
_6c7.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_CHECKBOX));
var _6c8=this.labelBinding.bindingElement;
_6c8.insertBefore(_6c7,_6c8.firstChild);
_6c7.style.display="none";
this.shadowTree.checkBoxIndicator=_6c7;
}else{
throw new Error("MenuItemBinding: checkboxes cannot contain menus");
}
break;
case MenuItemBinding.TYPE_MENUCONTAINER:
var _6c7=this.bindingDocument.createElement("div");
_6c7.className=MenuItemBinding.CLASSNAME_SUBMENU;
_6c7.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_SUBMENU));
var _6c8=this.labelBinding.bindingElement;
_6c8.insertBefore(_6c7,_6c8.firstChild);
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
var _6ca=this.imageProfile.getDisabledImage();
if(_6ca){
this.setImage(_6ca);
}
}
}else{
this.detachClassName("isdisabled");
if(this.imageProfile){
var _6ca=this.imageProfile.getDefaultImage();
if(_6ca){
this.setImage(_6ca);
}
}
}
}
};
MenuItemBinding.prototype.focus=function(e){
this.labelBinding.attachClassName(MenuItemBinding.CLASSNAME_HOVER);
var _6cc=this.getMenuContainerBinding();
if(_6cc.isOpen()&&!_6cc.isOpen(this)){
_6cc._openElement.hide();
_6cc.setOpenElement(false);
}
if(this.isMenuContainer&&e&&e.type==DOMEvents.MOUSEOVER){
var _6cc=this.getMenuContainerBinding();
if(!_6cc.isOpen(this)){
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
MenuItemBinding.prototype.blur=function(_6ce){
if(this._showSubMenuTimeout){
window.clearTimeout(this._showSubMenuTimeout);
this._showSubMenuTimeout=null;
}
if(this.isFocused){
var _6cf=this.getMenuContainerBinding();
if(!_6cf||!_6cf.isOpen(this)||_6ce){
this.labelBinding.detachClassName(MenuItemBinding.CLASSNAME_HOVER);
this.isFocused=false;
this._containingMenuBodyBinding.handleBlurredItem(this);
}
}
};
MenuItemBinding.prototype.check=function(_6d0){
this.setChecked(true,_6d0);
};
MenuItemBinding.prototype.uncheck=function(_6d1){
this.setChecked(false,_6d1);
};
MenuItemBinding.prototype.show=function(){
this.menuPopupBinding.position=PopupBinding.POSITION_RIGHT;
MenuItemBinding.superclass.show.call(this);
};
MenuItemBinding.prototype.setChecked=function(_6d2,_6d3){
this.setProperty("ischecked",_6d2);
if(this.isAttached){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.isChecked!=_6d2){
this.isChecked=_6d2;
this.shadowTree.checkBoxIndicator.style.display=_6d2?"block":"none";
if(!_6d3){
this.fireCommand();
}
}
}
}
};
MenuItemBinding.newInstance=function(_6d4){
var _6d5=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_6d4);
UserInterface.registerBinding(_6d5,MenuItemBinding);
return UserInterface.getBinding(_6d5);
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
PopupBinding.handleBroadcast=function(_6d6,arg){
switch(_6d6){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
case BroadcastMessages.MOUSEEVENT_MOUSEUP:
if(PopupBinding.activeInstances.hasEntries()){
var list=new List();
PopupBinding.activeInstances.each(function(key){
var _6da=PopupBinding.activeInstances.get(key);
var _6db=(arg&&arg instanceof ButtonBinding&&arg.popupBinding==_6da);
if(!_6db){
list.add(_6da);
}
});
list.each(function(_6dc){
_6dc.hide();
});
}
break;
case BroadcastMessages.KEY_ESCAPE:
if(PopupBinding.activeInstances.hasEntries()){
PopupBinding.activeInstances.each(function(key){
var _6de=PopupBinding.activeInstances.get(key);
_6de.hide();
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
var _6df=DOMUtil.getElementsByTagName(this.bindingElement,"menubody").item(0);
var _6e0=DOMUtil.getElementsByTagName(this.bindingElement,"popupbody").item(0);
if(_6df){
this._bodyBinding=UserInterface.getBinding(_6df);
}else{
if(_6e0){
this._bodyBinding=UserInterface.getBinding(_6e0);
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
var _6e1=this.getProperty("position");
this.position=_6e1?_6e1:PopupBinding.POSITION_BOTTOM;
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
PopupBinding.prototype.add=function(_6e2){
var _6e3=null;
if(this._bodyBinding){
this._bodyBinding.add(_6e2);
_6e3=_6e2;
}else{
_6e3=PopupBinding.superclass.add.call(this,_6e2);
}
return _6e3;
};
PopupBinding.prototype.addFirst=function(_6e4){
var _6e5=null;
if(this._bodyBinding){
this._bodyBinding.addFirst(_6e4);
_6e5=_6e4;
}else{
_6e5=PopupBinding.superclass.addFirst.call(this,_6e4);
}
return _6e5;
};
PopupBinding.prototype.handleAction=function(_6e6){
PopupBinding.superclass.handleAction.call(this,_6e6);
var _6e7=_6e6.target;
switch(_6e6.type){
case Binding.ACTION_ATTACHED:
if(_6e7 instanceof MenuItemBinding){
this._count(true);
_6e6.consume();
}
break;
case Binding.ACTION_DETACHED:
if(_6e7 instanceof MenuItemBinding){
this._count(false);
_6e6.consume();
}
break;
}
};
PopupBinding.prototype._count=function(_6e8){
if(this.type==PopupBinding.TYPE_FIXED){
this._menuItemCount=this._menuItemCount+(_6e8?1:-1);
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
PopupBinding.prototype.snapTo=function(_6e9){
var _6ea=this._getElementPosition(_6e9);
switch(this.position){
case PopupBinding.POSITION_TOP:
_6ea.y-=this.bindingElement.offsetHeight;
break;
case PopupBinding.POSITION_RIGHT:
_6ea.x+=_6e9.offsetWidth;
break;
case PopupBinding.POSITION_BOTTOM:
_6ea.y+=_6e9.offsetHeight;
break;
case PopupBinding.POSITION_LEFT:
_6ea.x-=this.bindingElement.offsetWidth;
break;
}
this.targetElement=_6e9;
this.bindingElement.style.display="block";
this.setPosition(_6ea.x,_6ea.y);
};
PopupBinding.prototype.snapToMouse=function(e){
this.snapToPoint(this._getMousePosition(e));
};
PopupBinding.prototype.snapToPoint=function(_6ec){
this.bindingElement.style.display="block";
this.setPosition(_6ec.x,_6ec.y);
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
PopupBinding.prototype._getElementPosition=function(_6f1){
return _6f1.ownerDocument==this.bindingDocument?DOMUtil.getGlobalPosition(_6f1):DOMUtil.getUniversalPosition(_6f1);
};
PopupBinding.prototype._getMousePosition=function(e){
var _6f3=DOMEvents.getTarget(e);
return _6f3.ownerDocument==this.bindingDocument?DOMUtil.getGlobalMousePosition(e):DOMUtil.getUniversalMousePosition(e);
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
PopupBinding.prototype._makeVisible=function(_6f4){
var _6f5=this.bindingElement;
if(_6f4){
if(Client.hasTransitions){
_6f5.style.visibility="visible";
_6f5.style.opacity="1";
}else{
_6f5.style.visibility="visible";
}
}else{
_6f5.style.visibility="hidden";
_6f5.style.display="none";
if(Client.hasTransitions){
_6f5.style.opacity="0";
}
}
this.isVisible=_6f4;
};
PopupBinding.prototype._enableTab=function(_6f6){
var self=this;
var _6f8=this.getDescendantBindingsByLocalName("menuitem");
setTimeout(function(){
if(Binding.exists(self)==true){
_6f8.each(function(_6f9){
_6f9.bindingElement.tabIndex=_6f6?0:-1;
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
PopupBinding.prototype.grabKeyboard=function(_702){
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
var _708=null;
if(this._menuItems){
if(this._menuItems[cmd]){
_708=this._menuItems[cmd];
}else{
throw "PopupBinding.getMenuItemForCommand: No binding for command "+cmd;
}
}else{
throw "Must invoke _indexMenuContent method first!";
}
return _708;
};
PopupBinding.prototype.clear=function(){
var _709=this._bodyBinding;
if(_709){
_709.detachRecursive();
_709.bindingElement.innerHTML="";
}
this._menuItemCount=0;
};
PopupBinding.newInstance=function(_70a){
var _70b=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_70a);
return UserInterface.registerBinding(_70b,PopupBinding);
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
PopupBodyBinding.newInstance=function(_70d){
var _70e=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupbody",_70d);
return UserInterface.registerBinding(_70e,PopupBodyBinding);
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
MenuPopupBinding.prototype._getElementPosition=function(_70f){
return new Point(_70f.offsetLeft,0);
};
MenuPopupBinding.newInstance=function(_710){
var _711=DOMUtil.createElementNS(Constants.NS_UI,"ui:menupopup",_710);
return UserInterface.registerBinding(_711,MenuPopupBinding);
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
var _712=DOMUtil.getElementsByTagName(this.bindingElement,"dialogbody").item(0);
if(_712){
this._body=UserInterface.getBinding(_712);
}else{
this._body=DialogBodyBinding.newInstance(this.bindingDocument);
this.add(this._body);
}
};
DialogBinding.prototype.buildBorderBindings=function(){
var _713=new List([DialogBorderBinding.TYPE_NORTH,DialogBorderBinding.TYPE_SOUTH,DialogBorderBinding.TYPE_EAST,DialogBorderBinding.TYPE_WEST]);
while(_713.hasNext()){
var _714=DialogBorderBinding.newInstance(this.bindingDocument);
_714.setType(_713.getNext());
this.add(_714);
}
};
DialogBinding.prototype.buildShadowBinding=function(){
this.shadowBinding=ShadowBinding.newInstance(this.bindingDocument);
this.shadowBinding.attachClassName("dialogshadow");
this.shadowBinding.shadow(this);
this.shadowBinding.attach();
};
DialogBinding.prototype.buildControlBindings=function(){
var _715=this.getProperty("controls");
if(_715){
var _716=new List(_715.split(" "));
while(_716.hasNext()){
var type=_716.getNext();
switch(type){
case ControlBinding.TYPE_MAXIMIZE:
case ControlBinding.TYPE_MINIMIZE:
case ControlBinding.TYPE_CLOSE:
var _718=DialogControlBinding.newInstance(this.bindingDocument);
_718.setControlType(type);
this._titlebar.addControl(_718);
this.controlBindings[type]=_718;
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
var _719=this.getProperty("image");
var _71a=this.getProperty("label");
var _71b=this.getProperty("draggable");
var _71c=this.getProperty("resizable");
var _71d=this.getProperty("modal");
if(_719){
this.setImage(_719);
}
if(_71a){
this.setLabel(_71a);
}
if(_71b==false){
this.isDialogDraggable=false;
}
if(_71c==false){
this.isPanelResizable=false;
}
if(_71d==true){
this.setModal(true);
}
};
DialogBinding.prototype.setModal=function(_71e){
this.isModal=_71e;
};
DialogBinding.prototype.setLabel=function(_71f){
this.setProperty("label",_71f);
if(this.isAttached==true){
this._titlebar.setLabel(Resolver.resolve(_71f));
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
DialogBinding.prototype.handleAction=function(_721){
DialogBinding.superclass.handleAction.call(this,_721);
switch(_721.type){
case Binding.ACTION_DRAG:
var _722=_721.target;
if(this.getState()==ControlBoxBinding.STATE_NORMAL){
switch(_722.constructor){
case DialogTitleBarBinding:
this.mode=DialogBinding.MODE_DRAGGING;
_722.dragger.registerHandler(this);
break;
case DialogBorderBinding:
if(this._isResizable){
this.mode=DialogBinding.MODE_RESIZING;
this._border=_722;
_722.dragger.registerHandler(this);
}
break;
}
}
_721.consume();
break;
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_721.consume();
break;
}
};
DialogBinding.prototype.handleBroadcast=function(_723,arg){
DialogBinding.superclass.handleBroadcast.call(this,_723,arg);
switch(_723){
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.startPoint=this.getPosition();
this._setComputedPosition(new Point(0,0));
break;
}
};
DialogBinding.prototype.handleInvokedControl=function(_725){
DialogBinding.superclass.handleInvokedControl.call(this,_725);
switch(_725.controlType){
case ControlBinding.TYPE_CLOSE:
this.close();
break;
}
};
DialogBinding.prototype.open=function(_726){
if(this.isModal&&this._cover==null){
this.buildDialogCoverBinding();
}
if(!this.isVisible){
this.setProperty("open","true");
this.isVisible=true;
this.isActivatable=true;
this.activate();
if(_726){
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
var _728=self.bindingElement;
setTimeout(function(){
_728.style.opacity="0";
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
DialogBinding.prototype.setZIndex=function(_729){
this.bindingElement.style.zIndex=new String(_729);
};
DialogBinding.prototype.onDragStart=function(_72a){
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
DialogBinding.prototype.setResizable=function(_73c){
if(this._isResizable!=_73c){
if(_73c){
this.attachClassName("resizable");
}else{
this.detachClassName("resizable");
}
this._isResizable=_73c;
}
};
DialogBinding.prototype.computeDefaultGeometry=function(){
var _73d=null;
var _73e=this.bindingDocument.body.offsetWidth;
var _73f=this.bindingDocument.body.offsetHeight;
_73d={x:0.125*_73e,y:0.125*_73f,w:0.75*_73e,h:0.5*_73f};
return _73d;
};
DialogBinding.prototype.centerOnScreen=function(){
var _740=this.bindingWindow.WindowManager.getWindowDimensions();
var dim=this.getDimension();
this.setPosition(new Point(0.5*(_740.w-dim.w),0.5*(_740.h-dim.h)));
};
DialogBinding.prototype.alert=function(){
var _742=this;
var i=0;
function blink(){
if(i%2==0){
_742.detachClassName("active");
}else{
_742.attachClassName("active");
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
var _746="";
while(list.hasNext()){
var type=list.getNext();
_746+=type+list.hasNext()?" ":"";
}
this.setProperty("controls",_746);
if(this.isAttached){
this.buildControlBindings();
}
};
DialogBinding.newInstance=function(_747){
var _748=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_747);
return UserInterface.registerBinding(_748,DialogBinding);
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
DialogHeadBinding.newInstance=function(_749){
var _74a=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialoghead",_749);
return UserInterface.registerBinding(_74a,DialogHeadBinding);
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
DialogBodyBinding.newInstance=function(_74d){
var _74e=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogbody",_74d);
return UserInterface.registerBinding(_74e,DialogBodyBinding);
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
DialogMatrixBinding.newInstance=function(_74f){
var _750=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogmatrix",_74f);
return UserInterface.registerBinding(_750,DialogMatrixBinding);
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
DialogSetBinding.prototype.handleAction=function(_751){
DialogSetBinding.superclass.handleAction.call(this,_751);
var _752=_751.target;
switch(_751.type){
case Binding.ACTION_MOVETOTOP:
if(_752 instanceof DialogBinding){
this._moveToTop(_752);
}
break;
case Binding.ACTION_MOVEDONTOP:
_751.consume();
break;
}
};
DialogSetBinding.prototype._moveToTop=function(_753){
var _754=0;
var _755=this.getChildBindingsByLocalName("dialog");
_755.each(function(_756){
var _757=_756.getZIndex();
_754=_757>_754?_757:_754;
});
_753.setZIndex(_754+2);
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
DialogBorderBinding.newInstance=function(_759){
var _75a=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogborder",_759);
return UserInterface.registerBinding(_75a,DialogBorderBinding);
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
DialogCoverBinding.prototype.cover=function(_75b){
this._dialogBinding=_75b;
this._dialogBinding.addActionListener(DialogBinding.ACTION_OPEN,this);
this._dialogBinding.addActionListener(DialogBinding.ACTION_CLOSE,this);
this._dialogBinding.addActionListener(Binding.ACTION_MOVEDONTOP,this);
this.addEventListener(DOMEvents.MOUSEDOWN);
};
DialogCoverBinding.prototype.handleEvent=function(e){
DialogCoverBinding.superclass.handleEvent.call(this,e);
this._dialogBinding.alert();
};
DialogCoverBinding.prototype.handleAction=function(_75d){
DialogCoverBinding.superclass.handleAction.call(this,_75d);
var _75e=_75d.target;
if(this._dialogBinding.isModal){
switch(_75d.type){
case DialogBinding.ACTION_OPEN:
this.show();
break;
case DialogBinding.ACTION_CLOSE:
this.hide();
break;
case Binding.ACTION_MOVEDONTOP:
if(_75e==this._dialogBinding){
this.bindingElement.style.zIndex=new String(_75e.getZIndex()-1);
}
break;
}
}
};
DialogCoverBinding.prototype.handleBroadcast=function(_75f,arg){
DialogCoverBinding.superclass.handleBroadcast.call(this,_75f,arg);
switch(_75f){
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
var _762=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.subscribe(_762);
DialogCoverBinding.superclass.show.call(this);
};
DialogCoverBinding.prototype.hide=function(){
var _763=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.unsubscribe(_763);
DialogCoverBinding.superclass.hide.call(this);
};
DialogCoverBinding.newInstance=function(_764){
var _765=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogcover",_764);
return UserInterface.registerBinding(_765,DialogCoverBinding);
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
var _766=this.getProperty("image");
if(_766){
this.setImage(_766);
}
var _767=this.getProperty("label");
if(_767){
this.setLabel(_767);
}
};
DialogTitleBarBinding.prototype.setLabel=function(_768){
if(this.isAttached){
this.labelBinding.setLabel(_768);
}
this.setProperty("label",_768);
};
DialogTitleBarBinding.prototype.setImage=function(url){
if(this.isAttached&&Client.isWindows){
this.labelBinding.setImage(url);
}
this.setProperty("image",url);
};
DialogTitleBarBinding.prototype.addControl=function(_76a){
if(!this._controlGroupBinding){
this._controlGroupBinding=this.bodyBinding.addFirst(ControlGroupBinding.newInstance(this.bindingDocument));
}
this._controlGroupBinding.add(_76a);
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
DialogTitleBarBinding.newInstance=function(_76b){
var _76c=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebar",_76b);
return UserInterface.registerBinding(_76c,DialogTitleBarBinding);
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
DialogTitleBarBodyBinding.newInstance=function(_76d){
var _76e=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebarbody",_76d);
return UserInterface.registerBinding(_76e,DialogTitleBarBodyBinding);
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
DialogControlBinding.newInstance=function(_76f){
var _770=DOMUtil.createElementNS(Constants.NS_UI,"ui:control",_76f);
return UserInterface.registerBinding(_770,DialogControlBinding);
};
DialogControlImageProfile.prototype=new ControlImageProfile;
DialogControlImageProfile.prototype.constructor=DialogControlImageProfile;
DialogControlImageProfile.superclass=ControlImageProfile.prototype;
var os=Client.isVista?"vista/":(!Client.isWindows?"osx/":"");
DialogControlImageProfile.IMAGE_MINIMIZE="${root}/skins/system/controls/"+os+"control-minimize-${string}.png";
DialogControlImageProfile.IMAGE_MAXIMIZE="${root}/skins/system/controls/"+os+"control-maximize-${string}.png";
DialogControlImageProfile.IMAGE_RESTORE="${root}/skins/system/controls/"+os+"control-restore-${string}.png";
DialogControlImageProfile.IMAGE_CLOSE="${root}/skins/system/controls/"+os+"control-close-${string}.png";
function DialogControlImageProfile(_771){
this.binding=_771;
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
var _774=null;
if(node.nodeType==Node.ELEMENT_NODE){
var _775=node.nodeName.toLowerCase();
switch(_775){
case "script":
case "style":
case "textarea":
_774=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
break;
}
}
return _774;
});
var self=this;
this.addFilter(function(node,arg){
if(node.nodeType==Node.TEXT_NODE){
var text=node.nodeValue.toLowerCase();
self._map.each(function(key,exp){
var _77c=true;
if(exp.test(text)){
self._textnodes.add(node);
_77c=false;
}
return _77c;
});
}
});
};
WindowBindingHighlightNodeCrawler.prototype.crawl=function(_77d,arg){
this._textnodes=new List();
WindowBindingHighlightNodeCrawler.superclass.crawl.call(this,_77d,arg);
};
WindowBindingHighlightNodeCrawler.prototype.setKeys=function(list){
list.reset();
this._map.empty();
while(list.hasNext()){
var key=list.getNext();
var _781=key.toLowerCase().replace(/ /g,"\\W");
var exp=new RegExp("("+_781+")");
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
WindowBindingHighlightNodeCrawler.prototype._getMarkup=function(_787){
var _788="";
var _789="<span class=\""+WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT+"\" style=\"background-color:yellow;color:black;\">";
var _78a="</span>";
var self=this;
function iterate(_78c){
var _78d=-1;
var _78e=null;
self._map.each(function(key,exp){
var low=_78c.toLowerCase();
var _792=low.search(exp);
if(_792>-1){
if(_78d==-1){
_78d=_792;
}
if(_792<=_78d){
_78d=_792;
_78e=key;
}
}
});
if(_78d>-1&&_78e!=null){
var pre=_78c.substring(0,_78d);
var hit=_78c.substring(_78d,_78d+_78e.length);
var pst=_78c.substring(_78d+_78e.length,_78c.length);
_788+=pre+_789+hit+_78a;
iterate(pst);
}else{
_788+=_78c;
}
}
iterate(_787);
return _788;
};
WindowBindingHighlightNodeCrawler.prototype.reset=function(_796){
var _797=new List(_796.getElementsByTagName("span"));
_797.each(function(span){
if(span.className==WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT){
var node=_796.ownerDocument.createTextNode(DOMUtil.getTextContent(span));
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
WindowBinding.getMarkup=function(_79a){
var _79b=null;
if(_79a.isAttached){
var doc=_79a.getContentDocument();
if(doc!=null){
var root=doc.getElementsByTagName("html").item(0);
var html="<html xmlns=\""+Constants.NS_XHTML+"\">"+root.innerHTML+"</html>";
WebServiceProxy.isFaultHandler=false;
_79b=top.MarkupFormatService.HtmlToXhtml(html);
WebServiceProxy.isFaultHandler=true;
if(_79b instanceof SOAPFault){
_79b=null;
}
}
}
return _79b;
};
WindowBinding.highlightKeywords=function(_79f,list){
if(WindowBinding._highlightcrawler==null){
WindowBinding._highlightcrawler=new WindowBindingHighlightNodeCrawler();
}
if(_79f.isAttached){
var doc=_79f.getContentDocument();
if(doc!=null){
var _7a2=WindowBinding._highlightcrawler;
_7a2.reset(doc.body);
if(list!=null){
_7a2.setKeys(list);
_7a2.crawl(doc.body);
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
var _7a3=WindowBinding.superclass.serialize.call(this);
if(_7a3){
_7a3.url=this.getURL();
}
return _7a3;
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
var _7a5=this.getContentWindow().DocumentManager;
if(_7a5!=null){
_7a5.detachAllBindings();
this._pageBinding=null;
}
}
}
};
WindowBinding.prototype.handleAction=function(_7a6){
WindowBinding.superclass.handleAction.call(this,_7a6);
var _7a7=_7a6.target;
switch(_7a6.type){
case RootBinding.ACTION_PHASE_3:
if(_7a7.bindingDocument==this.getContentDocument()){
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
this._onPageInitialize(_7a7);
break;
case RootBinding.ACTION_ACTIVATED:
case RootBinding.ACTION_DEACTIVATED:
_7a6.consume();
break;
}
};
WindowBinding.prototype.fit=function(_7a8){
if(!this.isFit||_7a8){
if(this._pageBinding!=null){
this.setHeight(this._pageBinding.getHeight());
this.isFit=true;
}
}
};
WindowBinding.prototype._onPageInitialize=function(_7a9){
if(this._pageBinding==null){
if(_7a9.bindingWindow==this.getContentWindow()){
this._pageBinding=_7a9;
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
WindowBinding.prototype._registerOnloadListener=function(_7aa){
var _7ab=this.shadowTree.iframe;
var _7ac=_7aa?"addEventListener":"removeEventListener";
if(this._onloadHandler==null){
var self=this;
this._onloadHandler={handleEvent:function(e){
var _7af=true;
if(Client.isExplorer){
_7af=_7ab.readyState=="complete";
}
if(_7af==true){
if(self.getURL()!=WindowBinding.DEFAULT_URL){
if(!self._hasLoadActionFired){
self.onWindowLoaded(self.getContentWindow());
}
}
}
}};
}
DOMEvents[_7ac](this.shadowTree.iframe,Client.isExplorer==true?"readystatechange":DOMEvents.LOAD,this._onloadHandler);
};
WindowBinding.prototype._registerUnloadListener=function(_7b0){
var _7b1=_7b0?"addEventListener":"removeEventListener";
if(this._unloadHandler==null){
var self=this;
this._unloadHandler={handleEvent:function(){
self._disposeContentDocument();
self._hasLoadActionFired=false;
}};
}
DOMEvents[_7b1](this.getContentWindow(),DOMEvents.UNLOAD,this._unloadHandler);
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
var _7b5=WindowBinding.DEFAULT_URL;
var url=this.getProperty("url");
if(url){
_7b5=url;
}
return _7b5;
};
WindowBinding.prototype.reload=function(_7b7){
this._disposeContentDocument();
if(Client.isPrism){
Prism.disableCache();
}
this._isReloading=true;
this.getContentDocument().location.reload();
};
WindowBinding.prototype.getFrameElement=function(){
var _7b8=null;
if(this.shadowTree.iframe!=null){
_7b8=this.shadowTree.iframe;
}
return _7b8;
};
WindowBinding.prototype.getContentWindow=function(){
var _7b9=null,_7ba=this.getFrameElement();
if(_7ba!==null){
_7b9=_7ba.contentWindow;
if(_7b9===undefined){
alert("HEIL");
}
}
return _7b9;
};
WindowBinding.prototype.getContentDocument=function(){
var _7bb=null,win=this.getContentWindow();
if(win){
_7bb=win.document;
}
return _7bb;
};
WindowBinding.prototype.getRootBinding=function(){
var _7bd=null,doc=this.getContentDocument();
if(doc&&doc.body){
_7bd=UserInterface.getBinding(doc.body);
}
return _7bd;
};
WindowBinding.prototype.getPageBinding=function(){
return this._pageBinding;
};
WindowBinding.prototype.setHeight=function(_7bf){
this.bindingElement.style.height=_7bf+"px";
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
WindowBinding.prototype.handleCrawler=function(_7c0){
WindowBinding.superclass.handleCrawler.call(this,_7c0);
if(_7c0.type==NodeCrawler.TYPE_DESCENDING){
var root=this.getRootBinding();
if(root!=null){
_7c0.nextNode=root.bindingElement;
}else{
_7c0.response=NodeCrawler.SKIP_CHILDREN;
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
WindowBinding.newInstance=function(_7c5){
var _7c6=DOMUtil.createElementNS(Constants.NS_UI,"ui:window",_7c5);
var _7c7=UserInterface.registerBinding(_7c6,WindowBinding);
return _7c7;
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
this._windowBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_7cb){
_7cb.target.show();
_7cb.consume();
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
this._errorBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_7cd){
_7cd.target.show();
_7cd.consume();
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
PreviewWindowBinding.prototype.handleAction=function(_7cf){
PreviewWindowBinding.superclass.handleAction.call(this,_7cf);
switch(_7cf.type){
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
var _7d0=null;
this._getRadioButtonBindings().each(function(_7d1){
if(_7d1.getProperty("ischecked")){
_7d0=_7d1;
return false;
}else{
return true;
}
});
if(_7d0){
this._checkedRadioBinding=_7d0;
}
RadioGroupBinding.superclass.onBindingInitialize.call(this);
};
RadioGroupBinding.prototype.handleAction=function(_7d2){
RadioGroupBinding.superclass.handleAction.call(this,_7d2);
var _7d3=_7d2.target;
switch(_7d2.type){
case ButtonBinding.ACTION_RADIOBUTTON_ATTACHED:
this._isUpToDate=false;
_7d2.consume();
break;
case ButtonBinding.ACTION_COMMAND:
if(_7d3.isRadioButton&&!_7d3.isDisabled){
if(this._checkedRadioBinding){
this._unCheckRadioBindingsExcept(_7d3);
}
this._checkedRadioBinding=_7d3;
this.dispatchAction(RadioGroupBinding.ACTION_SELECTIONCHANGED);
_7d2.consume();
}
break;
}
};
RadioGroupBinding.prototype.setCheckedButtonBinding=function(_7d4,_7d5){
if(_7d4 instanceof RadioDataBinding){
_7d4=_7d4.getButton();
}
if(_7d4.isRadioButton){
switch(_7d5){
case true:
this._unCheckRadioBindingsExcept(_7d4);
this._checkedRadioBinding=_7d4;
_7d4.check(true);
break;
default:
_7d4.check();
break;
}
}
};
RadioGroupBinding.prototype.getCheckedButtonBinding=function(){
return this._checkedRadioBinding;
};
RadioGroupBinding.prototype._unCheckRadioBindingsExcept=function(_7d6){
var _7d7=this._getRadioButtonBindings();
_7d7.each(function(_7d8){
if(_7d8.isChecked&&_7d8!=_7d6){
_7d8.uncheck(true);
}
});
};
RadioGroupBinding.prototype._getRadioButtonBindings=function(){
if(this._radioButtonBindings===null||!this._isUpToDate){
var _7d9=new Crawler();
var list=new List();
_7d9.addFilter(function(_7db){
var _7dc=true;
var _7dd=UserInterface.getBinding(_7db);
if(_7dd instanceof RadioGroupBinding){
_7dc=NodeCrawler.SKIP_CHILDREN;
}else{
if(_7dd instanceof ButtonBinding&&_7dd.isRadioButton){
list.add(_7dd);
}
}
return _7dc;
});
_7d9.crawl(this.bindingElement);
this._radioButtonBindings=list;
}
return this._radioButtonBindings;
};
RadioGroupBinding.newInstance=function(_7de){
var _7df=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiogroup",_7de);
return UserInterface.registerBinding(_7df,RadioGroupBinding);
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
var _7e1=this.getProperty("regexrule");
if(_7e1!=null){
this.expression=new RegExp(_7e1);
}
var _7e2=this.getProperty("onbindingblur");
if(_7e2!=null){
this.onblur=function(){
Binding.evaluate(_7e2,this);
};
}
var _7e3=this.getProperty("onvaluechange");
if(_7e3!=null){
this.onValueChange=function(){
Binding.evaluate(_7e3,this);
};
}
if(this.error==null&&this.type!=null){
var _7e4=DataBinding.errors[this.type];
if(_7e4!=null){
this.error=_7e4;
}
}
};
DataInputBinding.prototype._buildDOMContent=function(){
this.shadowTree.input=this._getInputElement();
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
if(Client.isExplorer==true){
this.bindingElement.hideFocus=true;
}
var _7e5=this.getProperty("value");
if(_7e5!=null){
this.setValue(String(_7e5));
}
var name=this.getProperty("name");
if(name!=null){
this.setName(name);
}
var _7e7=this.getProperty("isdisabled");
if(_7e7==true){
this.setDisabled(true);
}
var _7e8=this.getProperty("readonly");
if(_7e8==true){
this.setReadOnly(true);
}
var _7e9=this.getProperty("autoselect");
if(_7e9==true){
this._isAutoSelect=true;
}
this.shadowTree.box.appendChild(this.shadowTree.input);
this.bindingElement.appendChild(this.shadowTree.box);
if(this.hasCallBackID()){
}else{
if(this._isAutoPost){
this.logger.warn("Autopost "+this.toString()+" without a callbackid?");
}
}
};
DataInputBinding.prototype._getInputElement=function(){
var _7ea=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_7ea.type=this.isPassword==true?"password":"text";
_7ea.tabIndex=-1;
return _7ea;
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
DataInputBinding.prototype._handleFocusAndBlur=function(_7ed){
if(_7ed){
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
DataInputBinding.prototype.handleBroadcast=function(_7f0,arg){
DataInputBinding.superclass.handleBroadcast.call(this,_7f0,arg);
var self=this;
switch(_7f0){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(Client.isExplorer==true){
var _7f3=DOMEvents.getTarget(arg);
if(_7f3!=this.shadowTree.input){
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
DataInputBinding.prototype.focus=function(_7f4){
if(!this.isFocused&&!this.isReadOnly&&!this.isDisabled){
DataInputBinding.superclass.focus.call(this);
if(this.isFocused==true){
this._focus();
if(this._isAutoSelect==true){
if(_7f4){
var self=this,_7f6=this.bindingElement,_7f7={handleEvent:function(){
self.select();
DOMEvents.removeEventListener(_7f6,DOMEvents.MOUSEUP,this);
}};
DOMEvents.addEventListener(_7f6,DOMEvents.MOUSEUP,_7f7);
}else{
this.select();
}
}
this.onfocus();
if(!_7f4){
var _7f8=this.shadowTree.input;
setTimeout(function(){
FocusBinding.focusElement(_7f8);
},0);
}
}
}
};
DataInputBinding.prototype.select=function(){
var _7f9=this.shadowTree.input;
setTimeout(function(){
if(Client.isExplorer==true){
var _7fa=_7f9.createTextRange();
_7fa.moveStart("character",0);
_7fa.moveEnd("character",_7f9.value.length);
_7fa.select();
}else{
_7f9.setSelectionRange(0,_7f9.value.length);
}
},0);
};
DataInputBinding.prototype.blur=function(_7fb){
if(this.isFocused==true){
DataInputBinding.superclass.blur.call(this);
if(!_7fb){
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
DataInputBinding.prototype.validate=function(_7ff){
if(_7ff==true||this._isValid){
var _800=this.isValid();
if(_800!=this._isValid){
this._isValid=_800;
if(!_800){
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._value=this.getValue();
this.dispatchAction(Binding.ACTION_INVALID);
if(!this.isFocused){
var _801=null;
if(this._isInvalidBecauseRequired==true){
_801=DataBinding.warnings["required"];
}else{
if(this._isInvalidBecauseMinLength==true){
_801=DataBinding.warnings["minlength"];
_801=_801.replace("${count}",String(this.minlength));
}else{
if(this._isInvalidBecauseMaxLength==true){
_801=DataBinding.warnings["maxlength"];
_801=_801.replace("${count}",String(this.maxlength));
}else{
_801=DataBinding.warnings[this.type];
}
}
}
this.shadowTree.input.className=DataBinding.CLASSNAME_WARNING;
if(_801!=null){
if(this.isPassword){
if(Client.isMozilla){
this.shadowTree.input.type="text";
this.setValue(_801);
}else{
alert(_801);
}
}else{
this.setValue(_801);
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
var _802=true;
this._isInvalidBecauseRequired=false;
this._isInvalidBecauseMinLength=false;
this._isInvalidaBecuaseMaxLength=false;
var _803=this.getValue();
if(_803==""){
if(this.isRequired==true){
_802=false;
this._isInvalidBecauseRequired=true;
}
}else{
if(this.type!=null){
var _804=DataBinding.expressions[this.type];
if(!_804.test(_803)){
_802=false;
}
}else{
if(this.expression!=null){
if(!this.expression.test(_803)){
_802=false;
}
}
}
}
if(_802&&this.minlength!=null){
if(_803.length<this.minlength){
this._isInvalidBecauseMinLength=true;
_802=false;
}
}
if(_802&&this.maxlength!=null){
if(_803.length>this.maxlength){
this._isInvalidBecauseMaxLength=true;
_802=false;
}
}
return _802;
};
DataInputBinding.prototype.setDisabled=function(_805){
if(_805!=this.isDisabled){
if(_805){
this.attachClassName("isdisabled");
}else{
this.detachClassName("isdisabled");
}
var _806=this.shadowTree.input;
if(_805){
this._disabledHandler={handleEvent:function(e){
DOMEvents.preventDefault(e);
DOMEvents.stopPropagation(e);
}};
DOMEvents.addEventListener(_806,DOMEvents.MOUSEDOWN,this._disabledHandler);
}else{
DOMEvents.removeEventListener(_806,DOMEvents.MOUSEDOWN,this._disabledHandler);
this._disabledHandler=null;
}
if(Client.isExplorer){
this.shadowTree.input.disabled=_805;
this.shadowTree.input.unselectable=_805?"on":"off";
}
this.isDisabled=_805;
this.isFocusable=!_805;
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
};
DataInputBinding.prototype.setReadOnly=function(_808){
if(_808!=this.isReadOnly){
if(_808){
this.attachClassName("readonly");
}else{
this.detachClassName("readonly");
}
this.shadowTree.input.readOnly=_808;
this.isReadOnly=_808;
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
DataInputBinding.prototype.handleElement=function(_809){
return true;
};
DataInputBinding.prototype.updateElement=function(_80a){
var _80b=value=_80a.getAttribute("value");
if(_80b==null){
_80b="";
}
if(this.getValue()!=_80b){
var _80c=this.bindingWindow.UpdateManager;
_80c.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_80b);
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
DataInputBinding.prototype.setValue=function(_80d){
if(_80d===null){
_80d="";
}
if(_80d!=this.getValue()){
this.setProperty("value",_80d);
if(this.shadowTree.input!=null){
this.shadowTree.input.value=String(_80d);
}
}
};
DataInputBinding.prototype.getValue=function(){
var _80e=null;
if(this.shadowTree.input!=null){
_80e=this.shadowTree.input.value;
}else{
_80e=this.getProperty("value");
}
return _80e;
};
DataInputBinding.prototype.setName=function(name){
DataInputBinding.superclass.setName.call(this,name);
if(this.isAttached==true){
this.shadowTree.input.name=name;
}
};
DataInputBinding.prototype.getResult=function(){
var _810=this.getValue();
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_810=Number(_810);
break;
}
return _810;
};
DataInputBinding.prototype.setResult=DataInputBinding.prototype.setValue;
DataInputBinding.newInstance=function(_811){
var _812=DOMUtil.createElementNS(Constants.NS_UI,"ui:datainput",_811);
return UserInterface.registerBinding(_812,DataInputBinding);
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
var _813=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_813!=null){
this.setValue(_813.value);
_813.parentNode.removeChild(_813);
}
TextBoxBinding.superclass._buildDOMContent.call(this);
this.shadowTree.input.setAttribute("spellcheck","false");
if(!this._hasWordWrap){
this.shadowTree.input.setAttribute("wrap","off");
}
};
TextBoxBinding.prototype._getInputElement=function(){
var _814=DOMUtil.createElementNS(Constants.NS_XHTML,"textarea",this.bindingDocument);
_814.tabIndex=-1;
return _814;
};
TextBoxBinding.prototype.handleElement=function(_815){
return true;
};
TextBoxBinding.prototype.updateElement=function(_816){
var _817,area=_816.getElementsByTagName("textarea").item(0);
if(area!=null&&area.hasChildNodes()){
_817=DOMUtil.getTextContent(area);
}
if(_817==null){
_817="";
}
if(this.getValue()!=_817){
var _819=this.bindingWindow.UpdateManager;
_819.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_817);
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
IEEditorTextBoxBinding.prototype._handleTabKey=function(_81d){
var _81e=this.bindingDocument.selection.createRange();
var _81f=_81e.text=="";
if(_81f&&!_81d){
_81e.text="\t";
}else{
var text="";
var _821=_81e.text.length;
while((_81e.moveStart("word",-1)&&_81e.text.charAt(1)!="\n")){
}
_81e.moveStart("character",1);
var _822=0;
var i=0,line,_825=_81e.text.split("\n");
while((line=_825[i++])!=null){
if(_81d){
line=line.replace(/^(\s)/mg,"");
_822++;
}else{
line=line.replace(/^(.)/mg,"\t$1");
}
text+=line+(_825[i+1]?"\n":"");
}
_81e.text=text;
_81e.moveStart("character",-_821);
if(_81d){
_81e.moveStart("character",2*_825.length-2);
}
_81e.select();
}
};
IEEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _826=this.bindingDocument.selection.createRange();
var _827=_826.duplicate();
while((_827.moveStart("word",-1)&&_827.text.indexOf("\n")==-1)){
}
_827.moveStart("character",1);
_826.text="\n"+_827.text.match(/^(\s)*/)[0]+"!";
_826.moveStart("character",-1);
_826.select();
_826.text="";
_826.select();
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
MozEditorTextBoxBinding.prototype._handleTabKey=function(_828){
var _829;
var _82a;
var oss;
var osy;
var i;
var fnd;
var _82f=this._getSelectedText();
var el=this.shadowTree.input;
_829=el.scrollLeft;
_82a=el.scrollTop;
if(!_82f.match(/\n/)){
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
_82f=this._getSelectedText();
if(_828){
ntext=_82f.replace(/^(\s)/mg,"");
}else{
ntext=_82f.replace(/^(.)/mg,"\t$1");
}
el.value=el.value.substr(0,el.selectionStart)+ntext+el.value.substr(el.selectionEnd);
el.selectionStart=oss;
el.selectionEnd=osy+(ntext.length-_82f.length);
}
el.scrollLeft=_829;
el.scrollTop=_82a;
};
MozEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _831;
var _832;
var oss;
var osy;
var el=this.shadowTree.input;
_831=el.scrollLeft;
_832=el.scrollTop;
oss=el.selectionStart;
osy=el.selectionEnd;
var bfs=el.value.substr(0,el.selectionStart);
var bfsm=bfs.split(/\r|\n/g);
var spm=bfsm[bfsm.length-1].match(/^(\s)*/);
el.value=el.value.substr(0,el.selectionStart)+"\n"+spm[0]+el.value.substr(el.selectionEnd);
el.selectionStart=oss+1+spm[0].length;
el.selectionEnd=oss+1+spm[0].length;
el.scrollLeft=_831;
el.scrollTop=_832;
};
MozEditorTextBoxBinding.prototype._getSelectedText=function(){
var _839=this.shadowTree.input.value;
var _83a=this.shadowTree.input.selectionStart;
var end=this.shadowTree.input.selectionEnd;
return _839.substr(_83a,end-_83a);
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
var _83c=this.getProperty("isdisabled");
if(this.isDisabled||_83c){
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
var _83e=this.getProperty("label");
var _83f=this.getProperty("value");
var _840=this.getProperty("width");
var _841=this.getProperty("onchange");
var _842=this.getProperty("required")==true;
if(!this.type&&type){
this.type=type;
}
if(!this.label&&_83e!=null){
this.label=_83e;
}
if(!this.value&&_83f!=null){
this.value=_83f;
}
if(!this.width&&_840){
this.width=_840;
}
if(_842){
this.isRequired=true;
}
if(_841){
this.onValueChange=function(){
Binding.evaluate(_841,this);
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
var _843=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_843.name=this.getName();
_843.value=this.getValue();
_843.type="hidden";
if(this.hasCallBackID()){
_843.id=this.getCallBackID();
}
this.shadowTree.input=_843;
this.bindingElement.appendChild(_843);
};
SelectorBinding.prototype.buildButton=function(){
var _844=this.BUTTON_IMPLEMENTATION;
var _845=this.add(_844.newInstance(this.bindingDocument));
if(this.imageProfile!=null){
_845.imageProfile=this.imageProfile;
}
if(this.width!=null){
_845.setWidth(this.width);
}
this._buttonBinding=_845;
this.shadowTree.button=_845;
_845.attach();
};
SelectorBinding.prototype.buildIndicator=function(){
var img=this.bindingDocument.createElement("img");
img.src=SelectorBinding.INDICATOR_IMAGE;
img.className="selectorindicatorimage";
this._buttonBinding.bindingElement.appendChild(img);
this.shadowTree.selectorindicatorimage=img;
};
SelectorBinding.prototype.buildPopup=function(){
var _847=top.app.bindingMap.selectorpopupset;
var doc=_847.bindingDocument;
var _849=_847.add(PopupBinding.newInstance(doc));
var _84a=_849.add(MenuBodyBinding.newInstance(doc));
this._popupBinding=_849;
this._menuBodyBinding=_84a;
this._popupBinding.attachClassName(SelectorBinding.CLASSNAME_POPUP);
this._popupBinding.attachRecursive();
this._popupBinding.type=PopupBinding.TYPE_FIXED;
_849.attachClassName("selectorpopup");
_849.addActionListener(PopupBinding.ACTION_SHOW,this);
_849.addActionListener(MenuItemBinding.ACTION_COMMAND,this);
_849.addActionListener(PopupBinding.ACTION_HIDE,this);
this._buttonBinding.setPopup(_849);
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
var _84d=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_84d).each(function(_84e){
var _84f=_84e.getAttribute("label");
var _850=_84e.getAttribute("value");
var _851=_84e.getAttribute("selected");
var _852=_84e.getAttribute("image");
var _853=_84e.getAttribute("image-hover");
var _854=_84e.getAttribute("image-active");
var _855=_84e.getAttribute("image-disabled");
var _856=null;
if(_852||_853||_854||_855){
_856=new ImageProfile({image:_852,imageHover:_853,imageActive:_854,imageDisabled:_855});
}
list.add(new SelectorBindingSelection(_84f?_84f:null,_850?_850:null,_851&&_851=="true",_856));
});
return list;
};
SelectorBinding.prototype.populateFromList=function(list){
if(this.isAttached){
this.clear();
if(list.hasEntries()){
var _858=null;
while(list.hasNext()){
var _859=list.getNext();
var item=this.addSelection(_859);
if(!_858){
_858=item;
}
}
if(!this._selectedItemBinding){
this.select(_858,true);
}
this.shadowTree.selectorindicatorimage.style.display="block";
}else{
this.shadowTree.selectorindicatorimage.style.display="none";
}
}else{
throw "Could not populate unattached selector";
}
};
SelectorBinding.prototype.addSelection=function(_85b,_85c){
var _85d=this.MENUITEM_IMPLEMENTATION;
var _85e=this._menuBodyBinding;
var _85f=_85e.bindingDocument;
var _860=_85d.newInstance(_85f);
_860.imageProfile=_85b.imageProfile;
_860.setLabel(_85b.label);
_860.selectionValue=_85b.value;
if(_85b.isSelected){
this.select(_860,true);
}
_85b.menuItemBinding=_860;
if(_85c){
_85e.addFirst(_860);
this.selections.addFirst(_85b);
}else{
_85e.add(_860);
this.selections.add(_85b);
}
this._isUpToDate=false;
return _860;
};
SelectorBinding.prototype.addSelectionFirst=function(_861){
return this.addSelection(_861,true);
};
SelectorBinding.prototype.clear=function(_862){
this._selectedItemBinding=null;
if(this._popupBinding){
this._popupBinding.clear();
this.selections.clear();
if(!_862&&this.defaultSelection!=null){
var _863=this.addSelection(this.defaultSelection);
this.select(_863,true);
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
SelectorBinding.prototype.setDisabled=function(_864){
if(this.isAttached==true){
var _865=this._buttonBinding;
this.shadowTree.selectorindicatorimage.style.display=_864?"none":"block";
_865.setDisabled(_864);
}
if(_864){
this.setProperty("isdisabled",true);
}else{
this.deleteProperty("isdisabled");
}
};
SelectorBinding.prototype.reset=function(_866){
if(this.defaultSelection!=null){
this.selectByValue(this.defaultSelection.value,_866);
}
};
SelectorBinding.prototype.handleAction=function(_867){
SelectorBinding.superclass.handleAction.call(this,_867);
switch(_867.type){
case ButtonBinding.ACTION_COMMAND:
this._onButtonCommand();
_867.consume();
break;
case PopupBinding.ACTION_SHOW:
this._onPopupShowing();
_867.consume();
break;
case MenuItemBinding.ACTION_COMMAND:
this._onMenuItemCommand(_867.target);
_867.consume();
break;
case PopupBinding.ACTION_HIDE:
var self=this;
setTimeout(function(){
if(self.isFocused){
self._grabKeyboard();
}
},0);
_867.consume();
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
SelectorBinding.prototype._onMenuItemCommand=function(_869){
this.select(_869);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
SelectorBinding.prototype._restoreSelection=function(){
if(this._selectedItemBinding){
this._selectedItemBinding.focus();
}
};
SelectorBinding.prototype._fitMenuToSelector=function(){
var _86a=this._buttonBinding.bindingElement.offsetWidth+"px";
var _86b=this._popupBinding.bindingElement;
if(Client.isMozilla==true){
_86b.style.minWidth=_86a;
}else{
_86b.style.width=_86a;
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
SelectorBinding.prototype.handleBroadcast=function(_86d,arg){
SelectorBinding.superclass.handleBroadcast.call(this,_86d,arg);
switch(_86d){
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
SelectorBinding.prototype.select=function(_870,_871){
var _872=false;
if(_870!=this._selectedItemBinding){
this._selectedItemBinding=_870;
_872=true;
var _873=this._buttonBinding;
this._selectionValue=_870.selectionValue;
_873.setLabel(_870.getLabel());
if(_870.imageProfile!=null){
_873.imageProfile=_870.imageProfile;
}
if(_873.imageProfile!=null){
_873.setImage(this.isDisabled==true?_873.imageProfile.getDisabledImage():_873.imageProfile.getDefaultImage());
}
this._updateImageLayout();
if(!_871){
this.onValueChange();
this.dispatchAction(SelectorBinding.ACTION_SELECTIONCHANGED);
this.dirty();
}
if(!this._isValid||(this.isRequired&&!_871)){
this.validate();
}
}
return _872;
};
SelectorBinding.prototype._relate=function(){
var _874=this.getProperty("relate");
if(_874){
var _875=this.bindingDocument.getElementById(_874);
if(_875){
var _876=UserInterface.getBinding(_875);
if(_876){
if(this.isChecked){
_876.show();
}else{
_876.hide();
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
SelectorBinding.prototype.selectByValue=function(_877,_878){
var _879=false;
var _87a=this._menuBodyBinding;
var _87b=_87a.getDescendantElementsByLocalName("menuitem");
while(_87b.hasNext()){
var _87c=UserInterface.getBinding(_87b.getNext());
if(_87c.selectionValue==_877){
_879=this.select(_87c,_878);
break;
}
}
return _879;
};
SelectorBinding.prototype.getValue=function(){
var _87d=this._selectionValue;
if(_87d!=null){
_87d=String(_87d);
}
return _87d;
};
SelectorBinding.prototype.setValue=function(_87e){
this.selectByValue(String(_87e),true);
};
SelectorBinding.prototype.getResult=function(){
var _87f=this._selectionValue;
if(_87f=="null"){
_87f=null;
}
if(_87f){
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_87f=Number(_87f);
break;
}
}
return _87f;
};
SelectorBinding.prototype.setResult=function(_880){
this.selectByValue(_880,true);
};
SelectorBinding.prototype.validate=function(){
var _881=true;
if(this.isRequired==true&&this.defaultSelection!=null){
var _882=this.getValue();
if(_882==this.defaultSelection.value){
_881=false;
}
if(_881!=this._isValid){
if(_881){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_881;
}
return _881;
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
var _883=this._popupBinding;
if(!this._isUpToDate){
_883.attachRecursive();
this._isUpToDate=true;
}
};
SelectorBinding.newInstance=function(_884){
var _885=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_884);
return UserInterface.registerBinding(_885,SelectorBinding);
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
var _888=this.getProperty("onchange");
this.isRequired=this.getProperty("required")==true;
if(this.hasCallBackID()){
this._select.id=this.getCallBackID();
}
if(_888){
this.onValueChange=function(){
Binding.evaluate(_888,this);
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
SimpleSelectorBinding.prototype.focus=function(_88b){
SimpleSelectorBinding.superclass.focus.call(this);
if(this.isFocused){
if(!_88b){
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
SimpleSelectorBinding.prototype._hack=function(_88c){
if(Client.isExplorer){
this._select.style.width=_88c?"auto":this._cachewidth+"px";
if(_88c){
if(this._select.offsetWidth<=this._cachewidth){
this._hack(false);
}
}
}
};
SimpleSelectorBinding.prototype.validate=function(){
var _88d=true;
if(this.isRequired){
if(this.getValue()==null){
_88d=false;
}
}
if(_88d!=this._isValid){
if(_88d){
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.attachClassName(DataBinding.CLASSNAME_INVALID);
var _88e=this._select;
var _88f=_88e.options[_88e.selectedIndex];
var text=DOMUtil.getTextContent(_88f);
_88e.blur();
_88e.style.color="#A40000";
_88e.style.fontWeight="bold";
if(!Client.isExplorer6){
DOMUtil.setTextContent(_88f,DataBinding.warnings["required"]);
}
_88e.onfocus=function(){
this.style.color="black";
this.style.fontWeight="normal";
this.onfocus=null;
if(!Client.isExplorer6){
DOMUtil.setTextContent(_88f,text);
}
};
}
this._isValid=_88d;
}
return _88d;
};
SimpleSelectorBinding.prototype.manifest=function(){
};
SimpleSelectorBinding.prototype.getValue=function(){
var _891=null;
var _892=this._select;
var _893=_892.options[_892.selectedIndex];
var _894=true;
if(Client.isExplorer){
var html=_893.outerHTML.toLowerCase();
if(html.indexOf("value=")==-1){
_894=false;
}
}
if(_894){
_891=_893.getAttribute("value");
}
return _891;
};
SimpleSelectorBinding.prototype.setValue=function(_896){
};
SimpleSelectorBinding.prototype.getResult=function(){
return this.getValue();
};
SimpleSelectorBinding.prototype.setResult=function(_897){
this.setValue(_897);
};
SimpleSelectorBinding.newInstance=function(_898){
var _899=DOMUtil.createElementNS(Constants.NS_XHTML,"select",_898);
return UserInterface.registerBinding(_899,SimpleSelectorBinding);
};
function SelectorBindingSelection(_89a,_89b,_89c,_89d){
this._init(_89a,_89b,_89c,_89d);
}
SelectorBindingSelection.prototype={label:null,value:null,isSelected:null,imageProfile:null,menuItemBinding:null,_init:function(_89e,_89f,_8a0,_8a1){
if(_89e!=null){
this.label=String(_89e);
}
if(_89f!=null){
this.value=String(_89f);
}
if(_8a1!=null){
this.imageProfile=_8a1;
}
this.isSelected=_8a0?true:false;
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
var _8a2=this.addFirst(ToolBarButtonBinding.newInstance(this.bindingDocument));
_8a2.popupBindingTargetElement=this.shadowTree.input;
_8a2.setImage(DataInputSelectorBinding.INDICATOR_IMAGE);
_8a2.attach();
var self=this;
_8a2.oncommand=function(){
self._attachSelections();
};
this._buttonBinding=_8a2;
};
DataInputSelectorBinding.prototype.buildPopup=SelectorBinding.prototype.buildPopup;
DataInputSelectorBinding.prototype.buildSelections=function(){
var list=new List();
var _8a5=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_8a5).each(function(_8a6){
if(_8a6.getAttribute("label")){
throw "label not supported - use value property!";
}else{
var _8a7=_8a6.getAttribute("value");
var _8a8=_8a6.getAttribute("selected");
var _8a9=_8a6.getAttribute("tooltip");
list.add({value:_8a7?_8a7:null,toolTip:_8a9?_8a9:null,isSelected:(_8a8&&_8a8=="true")?true:false});
}
});
if(list.hasEntries()){
this.populateFromList(list);
}
};
DataInputSelectorBinding.prototype.populateFromList=function(list){
var _8ab=this._menuBodyBinding;
var _8ac=_8ab.bindingDocument;
while(_8ab.bindingElement.hasChildNodes()){
var node=_8ab.bindingElement.lastChild;
if(node.nodeType==Node.ELEMENT_NODE&&UserInterface.hasBinding(node)){
UserInterface.getBinding(node).dispose();
}else{
_8ab.removeChild(node);
}
}
if(list.hasEntries()){
this._isUpToDate=false;
if(!this._buttonBinding.isVisible){
this._buttonBinding.show();
}
while(list.hasNext()){
var _8ae=list.getNext();
var _8af=MenuItemBinding.newInstance(_8ac);
_8af.setLabel(_8ae.value);
_8af.selectionValue=_8ae.value;
if(_8ae.toolTip){
_8af.setToolTip(_8ae.toolTip);
}
if(_8ae.isSelected){
this.select(_8af,true);
}
_8ab.add(_8af);
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
DataInputSelectorBinding.prototype._onMenuItemCommand=function(_8b0){
this.select(_8b0);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
DataInputSelectorBinding.prototype.handleBroadcast=function(_8b1,arg){
SelectorBinding.prototype.handleBroadcast.call(this,_8b1,arg);
switch(_8b1){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(arg!=this._buttonBinding){
DataInputSelectorBinding.superclass.handleBroadcast.call(this,_8b1,arg);
}
break;
}
};
DataInputSelectorBinding.prototype._grabKeyboard=SelectorBinding.prototype._grabKeyboard;
DataInputSelectorBinding.prototype._releaseKeyboard=SelectorBinding.prototype._releaseKeyboard;
DataInputSelectorBinding.prototype._handleArrowKey=SelectorBinding.prototype._handleArrowKey;
DataInputSelectorBinding.prototype.focus=function(_8b3){
if(!this.isFocused){
DataInputSelectorBinding.superclass.focus.call(this,_8b3);
if(this.isFocused==true){
this._grabKeyboard();
}
}
};
DataInputSelectorBinding.prototype.blur=function(_8b4){
if(this.isFocused==true){
DataInputSelectorBinding.superclass.blur.call(this,_8b4);
this._releaseKeyboard();
if(this._popupBinding.isVisible){
this._popupBinding.hide();
}
}
};
DataInputSelectorBinding.prototype._fitMenuToSelector=function(){
var _8b5=this.bindingElement.offsetWidth+"px";
var _8b6=this._popupBinding.bindingElement;
if(Client.isMozilla){
_8b6.style.minWidth=_8b5;
}else{
_8b6.style.width=_8b5;
}
};
DataInputSelectorBinding.prototype._restoreSelection=function(){
if(!this._isUpToDate){
this._attachSelections();
}
var _8b7=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
var _8b8=this.getValue();
var _8b9=null;
_8b7.each(function(item){
if(item.getLabel()==_8b8){
_8b9=item;
}
});
if(_8b9){
_8b9.focus();
}
};
DataInputSelectorBinding.prototype.select=function(item,_8bc){
if(item!=this._selectedItemBinding){
this._selectedItemBinding=item;
this.setValue(item.selectionValue);
if(!_8bc){
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
var _8bd=ToolBarButtonBinding.newInstance(this.bindingDocument);
_8bd.setImage("${icon:popup}");
this.addFirst(_8bd);
_8bd.attach();
var self=this;
_8bd.oncommand=function(){
self._isButtonClicked=true;
setTimeout(function(){
self._isButtonClicked=false;
},1000);
var _8bf=self.getProperty("handle");
var _8c0=ViewDefinitions[_8bf];
if(_8c0 instanceof DialogViewDefinition){
_8c0.handler={handleDialogResponse:function(_8c1,_8c2){
self._isButtonClicked=false;
if(_8c1==Dialog.RESPONSE_ACCEPT){
self.logger.debug("Usecase scenario was hardcoded into DataInputDialogBinding#buildButton");
var _8c3=_8c2.getFirst();
self.setValue(_8c3);
self.validate(true);
}
self.focus();
}};
_8c0.argument.selectedResult=self.getValue();
StageBinding.presentViewDefinition(_8c0);
}else{
throw "Definition was either undefine or of a non-dialog type.";
}
};
DOMEvents.addEventListener(_8bd.getBindingElement(),DOMEvents.MOUSEDOWN,{handleEvent:function(e){
self._isButtonClicked=true;
}});
this._dialogButtonBinding=_8bd;
};
DataInputDialogBinding.prototype.oncommand=function(){
var _8c5=this._dialogButtonBinding;
if(_8c5!=null){
_8c5.oncommand();
}
};
DataInputDialogBinding.prototype.validate=function(arg){
var _8c7=true;
if(this._isButtonClicked==true){
this._isButtonClicked=false;
}else{
_8c7=DataInputDialogBinding.superclass.validate.call(this,arg);
}
return _8c7;
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
var _8c8=this.getProperty("label");
var _8c9=this.getProperty("tooltip");
this._buttonBinding=this.add(ClickButtonBinding.newInstance(this.bindingDocument));
if(_8c8!=null){
if(this.getProperty("handle")!=null||this.getProperty("url")!=null){
this._buttonBinding.setLabel(_8c8+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}else{
this._buttonBinding.setLabel(_8c8);
}
}
if(this.imageProfile){
this._buttonBinding.imageProfile=this.imageProfile;
}
if(_8c9!=null){
this._buttonBinding.setToolTip(_8c9);
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
DataDialogBinding.prototype.handleAction=function(_8cb){
DataDialogBinding.superclass.handleAction.call(this,_8cb);
var _8cc=_8cb.target;
var self=this;
switch(_8cb.type){
case ButtonBinding.ACTION_COMMAND:
if(this._handler==null){
this._handler={handleDialogResponse:function(_8ce,_8cf){
if(_8ce==Dialog.RESPONSE_ACCEPT){
if(_8cf instanceof DataBindingMap){
self._map=_8cf;
}else{
throw "Invalid dialog result";
}
}
}};
}
if(_8cc==this._buttonBinding){
_8cb.consume();
this.focus();
this.fireCommand();
}
break;
}
};
DataDialogBinding.prototype.handleBroadcast=function(_8d0,arg){
DataDialogBinding.superclass.handleBroadcast.call(this,_8d0,arg);
switch(_8d0){
case BroadcastMessages.KEY_SPACE:
this.fireCommand();
break;
}
};
DataDialogBinding.prototype.fireCommand=function(def){
this.dispatchAction(this.constructor.ACTION_COMMAND);
var _8d3=this.getProperty("handle");
var url=this.getURL();
var _8d5=null;
if(_8d3!=null||def!=null){
if(_8d3!=null){
_8d5=ViewDefinitions[_8d3];
}else{
_8d5=def;
}
if(_8d5 instanceof DialogViewDefinition){
_8d5.handler=this._handler;
if(this._map!=null){
_8d5.argument=this._map;
}
StageBinding.presentViewDefinition(_8d5);
}
}else{
if(url!=null){
_8d5=Dialog.invokeModal(url,this._handler,this._map);
}
}
if(_8d5!=null){
this._dialogViewHandle=_8d5.handle;
this._releaseKeyboard();
}
};
DataDialogBinding.prototype.setLabel=function(_8d6){
this.setProperty("label",_8d6);
if(this.isAttached){
this._buttonBinding.setLabel(_8d6+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}
};
DataDialogBinding.prototype.setImage=function(_8d7){
this.setProperty("image",_8d7);
if(this.imageProfile!=null){
this.imageProfile.setDefaultImage(_8d7);
if(this._buttonBinding!=null){
this._buttonBinding.imageProfile=this.imageProfile;
this._buttonBinding.setImage(this._buttonBinding.imageProfile.getDefaultImage());
}
}
};
DataDialogBinding.prototype.setToolTip=function(_8d8){
this.setProperty("tooltip",_8d8);
if(this.isAttached){
this._buttonBinding.setToolTip(_8d8);
}
};
DataDialogBinding.prototype.setHandle=function(_8d9){
this.setProperty("handle",_8d9);
};
DataDialogBinding.prototype.setURL=function(url){
this.setProperty("url",url);
};
DataDialogBinding.prototype.getURL=function(){
return this.getProperty("url");
};
DataDialogBinding.prototype.setHandler=function(_8db){
this._handler=_8db;
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
DataDialogBinding.newInstance=function(_8dd){
var _8de=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_8dd);
return UserInterface.registerBinding(_8de,DataDialogBinding);
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
this._handler={handleDialogResponse:function(_8e0,_8e1){
if(_8e0==Dialog.RESPONSE_ACCEPT){
self._onDialogAccept(_8e1);
}else{
self._onDialogCancel();
}
}};
};
PostBackDataDialogBinding.prototype._onDialogAccept=function(_8e2){
_8e2=new String(_8e2);
this.dirty();
this.setValue(encodeURIComponent(_8e2));
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
return new String(url+suf);
};
PostBackDataDialogBinding.prototype.manifest=function(){
var _8e6=this.getValue();
if(_8e6==null){
_8e6="";
}
this.shadowTree.dotnetinput.value=_8e6;
};
PostBackDataDialogBinding.prototype.setValue=function(_8e7){
this.setProperty("value",_8e7);
};
PostBackDataDialogBinding.prototype.getValue=function(){
return this.getProperty("value");
};
PostBackDataDialogBinding.prototype.getResult=function(){
return null;
};
PostBackDataDialogBinding.prototype.setResult=function(_8e8){
};
PostBackDataDialogBinding.newInstance=function(_8e9){
var _8ea=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_8e9);
return UserInterface.registerBinding(_8ea,PostBackDataDialogBinding);
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
var _8eb=this.getProperty("dialoglabel");
var _8ec=this.getProperty("providersearch");
var key=this.getProperty("providerkey");
var _8ee=this.getProperty("handle");
if(_8ee!=null){
var def=ViewDefinition.clone(_8ee,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_8eb!=null){
if(def.argument==null){
def.argument={};
}
def.argument.label=_8eb;
}
if(_8ec!=null){
if(def.argument==null){
def.argument={};
}
if(def.argument.nodes==null){
def.argument.nodes=[];
}
def.argument.nodes[0].search=_8ec;
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
ViewDefinitionPostBackDataDialogBinding.newInstance=function(_8f0){
var _8f1=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_8f0);
return UserInterface.registerBinding(_8f1,ViewDefinitionPostBackDataDialogBinding);
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
this.propertyMethodMap["value"]=function(_8f3){
self._datathing.setValue(_8f3);
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
var _8f6=self.getValue();
if(_8f6==""||_8f6==null){
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
var _8f7=this.getProperty("value");
var _8f8=this.getProperty("selectorlabel");
if(_8f8==null){
_8f8=NullPostBackDataDialogBinding.LABEL_DEFAULT;
}
var list=new List();
list.add(new SelectorBindingSelection(NullPostBackDataDialogBinding.LABEL_NULL,NullPostBackDataDialogBinding.VALUE_NULL,_8f7==null));
list.add(new SelectorBindingSelection(_8f8+LabelBinding.DIALOG_INDECATOR_SUFFIX,NullPostBackDataDialogBinding.VALUE_SELECTED,_8f7!=null,new ImageProfile({image:"${icon:popup}"})));
this._selector.master=this;
this._selector.attach();
this._selector.populateFromList(list);
var _8f7=this.getValue();
if(_8f7==""||_8f7==null){
this._selector.setLabel(NullPostBackDataDialogBinding.LABEL_NULL);
}else{
this._selector.setLabel(this.getLabel());
}
};
NullPostBackDataDialogBinding.prototype.handleAction=function(_8fa){
NullPostBackDataDialogBinding.superclass.handleAction.call(this,_8fa);
switch(_8fa.type){
case PageBinding.ACTION_DOPOSTBACK:
if(_8fa.target==this._datathing){
var _8fb=this.getProperty("label");
this._selector.setLabel("");
this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
var self=this;
setTimeout(function(){
if(self.getProperty("label")==_8fb){
self._selector.setLabel(_8fb);
}
},500);
_8fa.consume();
}
break;
}
};
NullPostBackDataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
NullPostBackDataDialogBinding.prototype.setLabel=function(_8fd){
this.setProperty("label",_8fd);
if(this._selector!=null){
this._selector.setLabel(_8fd);
}
};
NullPostBackDataDialogBinding.prototype.getValue=function(){
return this._datathing.getValue();
};
NullPostBackDataDialogBinding.prototype.setValue=function(_8fe){
this._datathing.setValue(_8fe);
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
NullPostBackDataDialogSelectorBinding.prototype.select=function(_8ff,_900){
if(NullPostBackDataDialogSelectorBinding.superclass.select.call(this,_8ff,_900)){
this._buttonBinding.setImage(null);
this._updateImageLayout();
if(this._selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
if(this.master.getValue()!=null){
}
}
}
};
NullPostBackDataDialogSelectorBinding.prototype.setLabel=function(_901){
this._buttonBinding.setLabel(_901);
};
NullPostBackDataDialogSelectorBinding.prototype.setToolTip=function(_902){
this._buttonBinding.setToolTip(_902);
};
NullPostBackDataDialogSelectorBinding.prototype.handleAction=function(_903){
NullPostBackDataDialogSelectorBinding.superclass.handleAction.call(this,_903);
switch(_903.type){
case MenuItemBinding.ACTION_COMMAND:
var _904=_903.target;
var _905=this.master;
if(_904.selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
this.setLabel(_904.getLabel());
setTimeout(function(){
_905.action();
},0);
}else{
this.master.setValue("");
}
_905.dirty();
break;
}
};
NullPostBackDataDialogSelectorBinding.prototype.manifest=function(){
};
NullPostBackDataDialogSelectorBinding.newInstance=function(_906){
var _907=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_906);
return UserInterface.registerBinding(_907,NullPostBackDataDialogSelectorBinding);
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
var _908=this._dataDialogBinding;
if(_908!=null){
DOMEvents.addEventListener(this.shadowTree.box,DOMEvents.DOUBLECLICK,{handleEvent:function(){
_908.fireCommand();
}});
}
};
MultiSelectorBinding.prototype._buildDOMContent=function(){
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
this.bindingElement.appendChild(this.shadowTree.box);
};
MultiSelectorBinding.prototype._parseDOMProperties=function(){
var _909=this.getProperty("editable");
var _90a=this.getProperty("selectable");
var _90b=this.getProperty("display");
if(_909!=false){
this._buildEditorButton();
}else{
this.isEditable=false;
}
if(_90a){
this.isSelectable=true;
this._selectionMap=new Map();
}
if(_90b){
this._display=_90b;
}
};
MultiSelectorBinding.prototype._buildEditorButton=function(){
if(this.isEditable){
var _90c=MultiSelectorDataDialogBinding.newInstance(this.bindingDocument);
_90c.selections=this.selections;
this.add(_90c);
_90c.attach();
this._dataDialogBinding=_90c;
this.shadowTree.datadialog=_90c;
}
};
MultiSelectorBinding.prototype.populateFromList=function(list){
list.reset();
var _90e=false;
this.shadowTree.box.innerHTML="";
while(list.hasNext()){
var _90f=list.getNext();
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_90e=_90f.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_90e=_90f.isSelected!=true;
break;
}
if(_90e){
this.shadowTree.box.appendChild(this._getElementForSelection(_90f));
}
}
this.selections=list;
if(this._dataDialogBinding){
this._dataDialogBinding.selections=this.selections;
}
};
MultiSelectorBinding.prototype.cumulateFromList=function(list,_911){
var box=this.shadowTree.box;
var _913=false;
if(list.hasEntries()){
list.reverse().reset();
while(list.hasNext()){
var _914=list.getNext();
if(_911){
_914.isSelected=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
_913=true;
}else{
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_913=_914.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_913=_914.isSelected!=true;
break;
}
}
if(_913){
var _915=this._getElementForSelection(_914);
box.insertBefore(_915,box.firstChild);
CSSUtil.attachClassName(_915,"selected");
this._selectionMap.set(_914.value,_915);
}
}
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
};
MultiSelectorBinding.prototype._getElementForSelection=function(_916){
var _917=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument);
_917.appendChild(this.bindingDocument.createTextNode(_916.label));
_917.setAttribute("label",_916.label);
_917.setAttribute("value",_916.value);
return _917;
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
var _919=DOMEvents.getTarget(e);
var _91a=DOMUtil.getLocalName(_919);
if(_91a=="div"){
this._handleMouseDown(_919);
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
break;
}
};
MultiSelectorBinding.prototype._handleMouseDown=function(_91b){
if(Keyboard.isShiftPressed&&this._lastSelectedElement){
var _91c=this._getElements();
var _91d=_91b.getAttribute("value");
var _91e=this._lastSelectedElement.getAttribute("value");
var _91f=false;
while(_91c.hasNext()){
var el=_91c.getNext();
switch(el.getAttribute("value")){
case _91d:
case _91e:
_91f=!_91f;
break;
}
if(_91f){
this._hilite(el);
}else{
this._unhilite(el);
}
this._hilite(this._lastSelectedElement);
this._hilite(_91b);
}
}else{
if(Keyboard.isControlPressed&&this._isHilited(_91b)){
this._unhilite(_91b);
}else{
this._hilite(_91b);
}
if(!Keyboard.isControlPressed){
var self=this;
this._getElements().each(function(el){
if(el!=_91b){
self._unhilite(el);
}
});
}
}
this._lastSelectedElement=_91b;
};
MultiSelectorBinding.prototype._hilite=function(_923){
var _924=_923.getAttribute("value");
if(!this._selectionMap.has(_924)){
CSSUtil.attachClassName(_923,"selected");
this._selectionMap.set(_924,_923);
}
};
MultiSelectorBinding.prototype._unhilite=function(_925){
var _926=_925.getAttribute("value");
if(this._selectionMap.has(_926)){
CSSUtil.detachClassName(_925,"selected");
this._selectionMap.del(_926);
}
};
MultiSelectorBinding.prototype._isHilited=function(_927){
return CSSUtil.hasClassName(_927,"selected");
};
MultiSelectorBinding.prototype.handleAction=function(_928){
MultiSelectorBinding.superclass.handleAction.call(this,_928);
var _929=_928.target;
switch(_928.type){
case DataDialogBinding.ACTION_COMMAND:
if(_929==this._dataDialogBinding){
if(!this.isFocused){
this.focus();
}
this.dispatchAction(MultiSelectorBinding.ACTION_COMMAND);
_928.consume();
}
break;
case MultiSelectorDataDialogBinding.ACTION_RESULT:
this.populateFromList(_929.result);
this.dirty();
_929.result=null;
_928.consume();
break;
}
};
MultiSelectorBinding.prototype.extractSelected=function(){
var _92a=null;
if(this.isSelectable){
_92a=new List();
if(this._selectionMap&&this._selectionMap.hasEntries()){
var self=this;
this._getElements().each(function(_92c){
if(self._isHilited(_92c)){
_92c.parentNode.removeChild(_92c);
_92a.add(new SelectorBindingSelection(_92c.getAttribute("label"),_92c.getAttribute("value"),true));
}
});
this._selectionMap=new Map();
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
return _92a;
};
MultiSelectorBinding.prototype.reposition=function(isUp){
var _92e=this._getElements();
if(!isUp){
_92e.reverse();
}
var _92f=true;
while(_92f&&_92e.hasNext()){
var _930=_92e.getNext();
if(this._isHilited(_930)){
switch(isUp){
case true:
if(_930.previousSibling){
_930.parentNode.insertBefore(_930,_930.previousSibling);
}else{
_92f=false;
}
break;
case false:
if(_930.nextSibling){
_930.parentNode.insertBefore(_930,_930.nextSibling.nextSibling);
}else{
_92f=false;
}
break;
}
}
}
};
MultiSelectorBinding.prototype.toSelectionList=function(){
var _931=new List();
var _932=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
var self=this;
this._getElements().each(function(_934){
var _935=new SelectorBindingSelection(_934.getAttribute("label"),_934.getAttribute("value"),_932);
_935.isHighlighted=self._isHilited(_934);
_931.add(_935);
});
return _931;
};
MultiSelectorBinding.prototype._getElements=function(){
return new List(DOMUtil.getElementsByTagName(this.shadowTree.box,"div"));
};
MultiSelectorBinding.prototype._getSelectionsList=SelectorBinding.prototype._getSelectionsList;
MultiSelectorBinding.prototype.validate=function(){
return true;
};
MultiSelectorBinding.prototype.manifest=function(){
var _936=new List(DOMUtil.getElementsByTagName(this.bindingElement,"input"));
if(_936.hasEntries()){
_936.each(function(_937){
_937.parentNode.removeChild(_937);
});
}
this.selections.reset();
while(this.selections.hasNext()){
var _938=this.selections.getNext();
if(_938.isSelected){
var _939=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_939.name=this._name;
_939.value=_938.value;
this.bindingElement.appendChild(_939);
}
}
};
MultiSelectorBinding.prototype.getValue=function(){
return "HEJ!";
};
MultiSelectorBinding.prototype.setValue=function(_93a){
alert(_93a);
};
MultiSelectorBinding.prototype.getResult=function(){
alert("TODO: MultiSelectorBinding#getResult");
return new Array();
};
MultiSelectorBinding.prototype.setResult=function(_93b){
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
var _93c={label:DataBinding.getAssociatedLabel(this),value:decodeURIComponent(this.getValue()),configuration:{"formattingconfiguration":this.getProperty("formattingconfiguration"),"elementclassconfiguration":this.getProperty("elementclassconfiguration"),"configurationstylesheet":this.getProperty("configurationstylesheet"),"presentationstylesheet":this.getProperty("presentationstylesheet"),"embedablefieldstypenames":this.getProperty("embedablefieldstypenames")}};
var _93d=ViewDefinitions["Composite.Management.VisualEditorDialog"];
_93d.handler=this._handler;
_93d.argument=_93c;
StageBinding.presentViewDefinition(_93d);
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
var _93e={label:DataBinding.getAssociatedLabel(this),selections:this.selections};
var self=this;
var _940={handleDialogResponse:function(_941,_942){
if(_941==Dialog.RESPONSE_ACCEPT){
self.result=_942;
self.dispatchAction(MultiSelectorDataDialogBinding.ACTION_RESULT);
}
}};
var _943=ViewDefinitions[this._dialogViewHandle];
_943.handler=_940;
_943.argument=_93e;
StageBinding.presentViewDefinition(_943);
};
MultiSelectorDataDialogBinding.newInstance=function(_944){
var _945=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_944);
return UserInterface.registerBinding(_945,MultiSelectorDataDialogBinding);
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
LazyBindingBinding.wakeUp=function(_946){
var id=_946.bindingElement.id+LazyBindingBinding.ID_APPENDIX;
var _948=_946.bindingDocument.getElementById(id);
if(_948!=null){
var _949=UserInterface.getBinding(_948);
_949.setResult(true);
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
var _94b=this.bindingDocument.getElementById(id);
if(_94b!=null){
var _94c=UserInterface.getBinding(_94b);
if(_94c&&!_94c.isAttached){
_94c.isLazy=true;
}else{
_94b.setAttribute("lazy",true);
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
LazyBindingBinding.prototype.setResult=function(_94d){
this._isLazy=_94d;
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
var _94f=this.getProperty("stateprovider");
var _950=this.getProperty("handle");
if(_94f!=null&&_950!=null){
url=url.replace("${stateprovider}",_94f).replace("${handle}",_950);
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
EditorDataBinding.prototype._onPageInitialize=function(_951){
EditorDataBinding.superclass._onPageInitialize.call(this,_951);
if(this._pageBinding!=null){
Application.unlock(this);
this._coverBinding.hide();
}
};
EditorDataBinding.prototype.setName=DataBinding.prototype.setName;
EditorDataBinding.prototype.validate=function(){
return this._pageBinding.validateAllDataBindings();
};
EditorDataBinding.prototype.handleAction=function(_952){
EditorDataBinding.superclass.handleAction.call(this,_952);
switch(_952.type){
case Binding.ACTION_DIRTY:
if(_952.target!=this){
if(!this.isDirty){
this.dirty();
}
_952.consume();
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
EditorDataBinding.prototype.setValue=function(_953){
};
EditorDataBinding.prototype.getResult=function(){
return null;
};
EditorDataBinding.prototype.setResult=function(_954){
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
fake.setValue(this.value);
self.dirty();
if(!self._isValid){
self.validate();
}
};
};
FilePickerBinding.prototype.validate=function(){
var _958=true;
if(this.getProperty("required")){
var fake=this.getDescendantBindingByLocalName("datainput");
_958=fake.getValue()!="";
}
if(!_958&&this._isValid){
this._isValid=false;
this.dispatchAction(Binding.ACTION_INVALID);
}else{
if(_958&&!this._isValid){
this.dispatchAction(Binding.ACTION_VALID);
}
}
return _958;
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
var _95c=this.bindingDocument.getElementById(RequestBinding.INPUT_ID);
if(_95c!=null){
_95c.value=Application.CONSOLE_ID;
}
};
RequestBinding.prototype.postback=function(_95d){
_95d=_95d!=null?_95d:EditorPageBinding.message;
this.shadowTree.dotnetinput.value=_95d;
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
var _95e=Templates.getTemplateElementText("fieldgroupmatrix.xml");
var _95f=_95e.replace("MARKUP",this.bindingElement.innerHTML);
try{
this.bindingElement.innerHTML=_95f;
}
catch(exception1){
this.logger.error("Exeption in innerHTML!");
_95f=_95f.replace(/\&nbsp;/g,"");
this.bindingElement.innerHTML=_95f;
}
var self=this;
var _961=DOMUtil.getElementsByTagName(this.bindingElement,"table").item(0);
new List(_961.rows).each(function(row){
new List(row.cells).each(function(cell){
self.shadowTree[cell.className]=cell;
});
});
};
FieldGroupBinding.prototype._buildDOMContent=function(){
var _964=this.getProperty("label");
if(_964){
this.setLabel(_964);
}else{
this.attachClassName(FieldGroupBinding.CLASSNAME_NOLABEL);
}
};
FieldGroupBinding.prototype.setLabel=function(_965){
this.setProperty("label",_965);
if(this.shadowTree.labelBinding==null){
var _966=LabelBinding.newInstance(this.bindingDocument);
var cell=this.shadowTree[FieldGroupBinding.NORTH];
_966.attachClassName("fieldgrouplabel");
cell.insertBefore(_966.bindingElement,cell.getElementsByTagName("div").item(1));
_966.attach();
this.shadowTree.labelBinding=_966;
}
this.shadowTree.labelBinding.setLabel(Resolver.resolve(_965));
};
FieldGroupBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
FieldGroupBinding.prototype.add=function(_968){
this.shadowTree[FieldGroupBinding.CENTER].appendChild(_968.bindingElement);
return _968;
};
FieldGroupBinding.prototype.addFirst=function(_969){
var _96a=this.shadowTree[FieldGroupBinding.CENTER];
_96a.insertBefore(_969.bindingElement,_96a.firstChild);
return _969;
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
var _96b=this.getProperty("relation");
if(_96b!=null){
this.bindingRelation=_96b;
this.subscribe(BroadcastMessages.BINDING_RELATE);
this.hide();
}
};
FieldBinding.prototype.handleBroadcast=function(_96c,arg){
FieldBinding.superclass.handleBroadcast.call(this,_96c,arg);
switch(_96c){
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
FieldBinding.newInstance=function(_96e){
var _96f=DOMUtil.createElementNS(Constants.NS_UI,"ui:field",_96e);
return UserInterface.registerBinding(_96f,FieldBinding);
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
var _970=this.getDescendantBindingByLocalName("fieldgroup");
if(_970!=null){
_970.attachClassName(FieldGroupBinding.CLASSNAME_FIRST);
}
};
FieldsBinding.prototype.onBindingDispose=function(){
FieldsBinding.superclass.onBindingDispose.call(this);
if(this._invalidCount>0){
this.dispatchAction(Binding.ACTION_VALID);
}
};
FieldsBinding.prototype.validate=function(){
var _971=true;
var _972=this.getDescendantBindingsByLocalName("*");
while(_972.hasNext()){
var _973=_972.getNext();
if(Interfaces.isImplemented(IData,_973)){
var _974=_973.validate();
if(_971&&!_974){
_971=false;
}
}
}
return _971;
};
FieldsBinding.prototype.handleAction=function(_975){
FieldsBinding.superclass.handleAction.call(this,_975);
var _976=_975.target;
if(_976!=this){
switch(_975.type){
case Binding.ACTION_INVALID:
var _977=DataBinding.getAssociatedLabel(_976);
if(_977){
this._invalidFieldLabels.set(_976.key,_977);
}
if(_976.error){
if(!_976.isInvalidBecauseRequired){
ErrorBinding.presentError({text:_976.error},_976);
}
}
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_INVALID);
}
this._invalidCount++;
_975.consume();
break;
case Binding.ACTION_VALID:
if(this._invalidFieldLabels.has(_976.key)){
this._invalidFieldLabels.del(_976.key);
}
this._invalidCount--;
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_VALID);
}
_975.consume();
break;
}
}
};
FieldsBinding.prototype.getInvalidLabels=function(){
var _978=null;
if(this._invalidFieldLabels.hasEntries()){
_978=this._invalidFieldLabels.toList();
}
return _978;
};
FieldsBinding.newInstance=function(_979){
var _97a=DOMUtil.createElementNS(Constants.NS_UI,"ui:fields",_979);
return UserInterface.registerBinding(_97a,FieldsBinding);
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
var _97b=this.getProperty("image");
if(_97b){
this.setImage(_97b);
}
var _97c=this.getProperty("tooltip");
if(_97c){
this.setToolTip(_97c);
}
var _97d=this.getProperty("label");
if(_97d){
this.setLabel(_97d);
}
};
FieldDescBinding.prototype.attachDOMEvents=function(){
this.addEventListener(DOMEvents.CLICK);
};
FieldDescBinding.prototype.handleEvent=function(e){
FieldDescBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.CLICK:
var _97f=this.getAncestorBindingByLocalName("field");
if(_97f){
var _980=true;
_97f.getDescendantBindingsByLocalName("*").each(function(_981){
if(Interfaces.isImplemented(IData,_981)){
_981.focus();
_980=false;
}
return _980;
});
}
break;
}
};
FieldDescBinding.prototype.setLabel=function(_982){
this.setProperty("label",_982);
if(this.isAttached){
this.bindingElement.innerHTML=Resolver.resolve(_982);
}
};
FieldDescBinding.prototype.getLabel=function(){
var _983=this.getProperty("label");
if(!_983){
var node=this.bindingElement.firstChild;
if(node&&node.nodeType==Node.TEXT_NODE){
_983=node.data;
}
}
return _983;
};
FieldDescBinding.prototype.setImage=function(_985){
this.setProperty("image",_985);
if(this.isAttached){
throw "FieldDescBinding: Images not suppoerted!";
}
};
FieldDescBinding.prototype.setToolTip=function(_986){
this.setProperty("tooltip",_986);
if(this.isAttached){
this.bindingElement.title=_986;
}
};
FieldDescBinding.newInstance=function(_987){
var _988=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddesc",_987);
return UserInterface.registerBinding(_988,FieldDescBinding);
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
FieldDataBinding.newInstance=function(_989){
var _98a=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddata",_989);
return UserInterface.registerBinding(_98a,FieldDataBinding);
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
var _98b=this._fieldHelpPopupBinding;
if(_98b){
_98b.dispose();
}
};
FieldHelpBinding.prototype.buildPopupBinding=function(){
var _98c=app.bindingMap.fieldhelpopupset;
var doc=_98c.bindingDocument;
var _98e=_98c.add(PopupBinding.newInstance(doc));
var _98f=_98e.add(PopupBodyBinding.newInstance(doc));
_98e.position=PopupBinding.POSITION_RIGHT;
_98e.attachClassName("fieldhelppopup");
if(this.bindingElement.hasChildNodes()){
_98f.bindingElement.innerHTML=this.bindingElement.innerHTML;
}else{
var _990=this.getProperty("label");
if(_990){
_98f.bindingElement.innerHTML=Resolver.resolve(_990);
}
}
this.bindingElement.innerHTML="";
this._fieldHelpPopupBinding=_98e;
};
FieldHelpBinding.prototype.buildPopupButton=function(){
var _991=this.getAncestorBindingByLocalName("field");
if(_991){
_991.attachClassName("fieldhelp");
var _992=ClickButtonBinding.newInstance(this.bindingDocument);
_992.attachClassName("fieldhelp");
_992.setImage(FieldHelpBinding.INDICATOR_IMAGE);
this.add(_992);
_992.attach();
var self=this;
_992.oncommand=function(){
self.attachPopupBinding();
};
_992.setPopup(this._fieldHelpPopupBinding);
this._fieldHelpButton=_992;
}
};
FieldHelpBinding.prototype.attachPopupBinding=function(){
var _994=this._fieldHelpPopupBinding;
if(_994&&!_994.isAttached){
_994.attachRecursive();
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
RadioDataGroupBinding.prototype.handleAction=function(_996){
RadioDataGroupBinding.superclass.handleAction.call(this,_996);
switch(_996.type){
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
RadioDataGroupBinding.prototype.handleBroadcast=function(_998,arg){
RadioDataGroupBinding.superclass.handleBroadcast.call(this,_998,arg);
switch(_998){
case BroadcastMessages.KEY_ARROW:
var _99a=null;
var next=null;
var _99c=null;
switch(arg){
case KeyEventCodes.VK_DOWN:
case KeyEventCodes.VK_UP:
_99c=this.getChildBindingsByLocalName("radio");
while(!_99a&&_99c.hasNext()){
var _99d=_99c.getNext();
if(_99d.getProperty("ischecked")){
_99a=_99d;
}
}
break;
}
if(_99a){
switch(arg){
case KeyEventCodes.VK_DOWN:
next=_99c.getFollowing(_99a);
while(next!=null&&next.isDisabled){
next=_99c.getFollowing(next);
}
break;
case KeyEventCodes.VK_UP:
next=_99c.getPreceding(_99a);
while(next!=null&&next.isDisabled){
next=_99c.getPreceding(next);
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
RadioDataGroupBinding.prototype.focus=function(_99e){
if(!this.isFocused){
DataBinding.prototype.focus.call(this);
if(this.isFocused){
if(!_99e){
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
var _99f=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_99f.type="hidden";
_99f.name=this._name;
this.bindingElement.appendChild(_99f);
this.shadowTree.input=_99f;
}
this.shadowTree.input.value=this.getValue();
}
};
RadioDataGroupBinding.prototype.getValue=function(){
var _9a0=null;
var _9a1=this.getChildBindingsByLocalName("radio");
while(!_9a0&&_9a1.hasNext()){
var _9a2=_9a1.getNext();
if(_9a2.isChecked){
_9a0=_9a2.getProperty("value");
}
}
return _9a0;
};
RadioDataGroupBinding.prototype.getResult=RadioDataGroupBinding.prototype.getValue;
RadioDataGroupBinding.prototype.setValue=function(_9a3){
};
RadioDataGroupBinding.prototype.setResult=function(_9a4){
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
this.propertyMethodMap["checked"]=function(_9a5){
if(_9a5!=this.isChecked){
this.setChecked(_9a5,true);
}
};
this.propertyMethodMap["checksum"]=function(){
var _9a6=this.getProperty("ischecked");
if(_9a6!=this.isChecked){
this.setChecked(_9a6,true);
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
var _9a7=this.getProperty("relate");
var _9a8=this.getProperty("oncommand");
if(_9a7){
this.bindingRelate=_9a7;
this.relate();
}
if(_9a8){
this.oncommand=function(){
Binding.evaluate(_9a8,this);
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
var _9aa=this.getCallBackID();
this._buttonBinding.check=function(_9ab){
RadioButtonBinding.prototype.check.call(this,_9ab);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
};
this._buttonBinding.uncheck=function(_9ac){
RadioButtonBinding.prototype.uncheck.call(this,_9ac);
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
RadioDataBinding.prototype.setChecked=function(_9ad,_9ae){
this._buttonBinding.setChecked(_9ad,_9ae);
if(this.bindingRelate!=null){
this.relate();
}
this.setProperty("ischecked",_9ad);
};
RadioDataBinding.prototype.check=function(_9af){
this.setChecked(true,_9af);
};
RadioDataBinding.prototype.uncheck=function(_9b0){
this.setChecked(false,_9b0);
};
RadioDataBinding.prototype.setDisabled=function(_9b1){
if(_9b1!=this.isDisabled){
this.isDisabled=_9b1;
this._buttonBinding.setDisabled(_9b1);
if(_9b1){
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
var _9b3=DOMEvents.getTarget(e);
switch(_9b3){
case this.shadowTree.labelText:
if(!this.isChecked&&!this.isDisabled){
this.check();
}
break;
}
}
};
RadioDataBinding.prototype._buildLabelText=function(){
var _9b4=this.getProperty("label");
if(_9b4){
this.shadowTree.labelText=DOMUtil.createElementNS(Constants.NS_UI,"ui:datalabeltext",this.bindingDocument);
this.shadowTree.labelText.appendChild(this.bindingDocument.createTextNode(Resolver.resolve(_9b4)));
DOMEvents.addEventListener(this.shadowTree.labelText,DOMEvents.CLICK,this);
this.bindingElement.appendChild(this.shadowTree.labelText);
}
};
RadioDataBinding.prototype.setLabel=function(_9b5){
if(this.shadowTree.labelText!=null){
this.shadowTree.labelText.firstChild.data=_9b5;
}
this.setProperty("label",_9b5);
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
this.propertyMethodMap["checked"]=function(_9b6){
if(_9b6!=this.isChecked){
this.setChecked(_9b6,true);
}
};
this.propertyMethodMap["checksum"]=function(){
var _9b7=this.getProperty("ischecked");
if(_9b7!=this.isChecked){
this.setChecked(_9b7,true);
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
var _9b9=DOMEvents.getTarget(e);
switch(_9b9){
case this.shadowTree.labelText:
this.setChecked(!this.isChecked);
break;
}
}
};
CheckBoxBinding.prototype.relate=RadioDataBinding.prototype.relate;
CheckBoxBinding.prototype.handleBroadcast=function(_9ba,arg){
CheckBoxBinding.superclass.handleBroadcast.call(this,_9ba,arg);
switch(_9ba){
case BroadcastMessages.KEY_SPACE:
this.setChecked(!this.isChecked);
break;
}
};
CheckBoxBinding.prototype._buildButtonBinding=function(){
this._buttonBinding=this.add(CheckButtonBinding.newInstance(this.bindingDocument));
var self=this;
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_9bd){
_9bd.consume();
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
var _9bf=this.getCallBackID();
this._buttonBinding.check=function(_9c0){
ButtonBinding.prototype.check.call(this,_9c0);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
if(!_9c0){
self.focus();
}
};
this._buttonBinding.uncheck=function(_9c1){
ButtonBinding.prototype.uncheck.call(this,_9c1);
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
if(_9bf!=null){
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
var _9c2=true;
var _9c3=this.bindingElement.parentNode;
if(_9c3){
var _9c4=UserInterface.getBinding(_9c3);
if(_9c4&&_9c4 instanceof CheckBoxGroupBinding){
if(_9c4.isRequired){
if(_9c4.isValid){
_9c2=_9c4.validate();
}else{
_9c2=false;
}
}
}
}
return _9c2;
};
CheckBoxBinding.prototype.manifest=function(){
if(this.isAttached){
switch(this.isChecked){
case true:
if(!this.shadowTree.input){
var _9c5=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_9c5.type="hidden";
_9c5.name=this._name;
_9c5.style.display="none";
this.bindingElement.appendChild(_9c5);
this.shadowTree.input=_9c5;
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
var _9c6=null;
var _9c7=this.getProperty("value");
if(this.isChecked){
_9c6=_9c7?_9c7:"on";
}
return _9c6;
};
CheckBoxBinding.prototype.setValue=function(_9c8){
if(_9c8==this.getValue()||_9c8=="on"){
this.check(true);
}else{
if(_9c8!="on"){
this.setPropety("value",_9c8);
}
}
};
CheckBoxBinding.prototype.getResult=function(){
var _9c9=false;
if(this.isChecked){
_9c9=this._result!=null?this._result:true;
}
return _9c9;
};
CheckBoxBinding.prototype.setResult=function(_9ca){
if(typeof _9ca=="boolean"){
this.setChecked(_9ca,true);
}else{
this._result=_9ca;
}
};
CheckBoxBinding.newInstance=function(_9cb){
var _9cc=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbox",_9cb);
return UserInterface.registerBinding(_9cc,CheckBoxBinding);
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
var _9cd=true;
if(this.isRequired){
var _9ce=this.getDescendantBindingsByLocalName("checkbox");
if(_9ce.hasEntries()){
_9cd=false;
while(_9ce.hasNext()&&!_9cd){
if(_9ce.getNext().isChecked){
_9cd=true;
}
}
}
if(_9cd==false){
this._showWarning(true);
this.dispatchAction(Binding.ACTION_INVALID);
this.addActionListener(CheckBoxBinding.ACTION_COMMAND);
}
}
return _9cd;
};
CheckBoxGroupBinding.prototype._showWarning=function(_9cf){
if(_9cf){
if(!this._labelBinding){
var _9d0=LabelBinding.newInstance(this.bindingDocument);
_9d0.attachClassName("invalid");
_9d0.setImage("${icon:error}");
_9d0.setLabel("Selection required");
this._labelBinding=this.addFirst(_9d0);
this._labelBinding.attach();
}
}else{
if(this._labelBinding){
this._labelBinding.dispose();
this._labelBinding=null;
}
}
};
CheckBoxGroupBinding.prototype.handleAction=function(_9d1){
CheckBoxGroupBinding.superclass.handleAction.call(this,_9d1);
switch(_9d1.type){
case CheckBoxBinding.ACTION_COMMAND:
this._showWarning(false);
this.dispatchAction(Binding.ACTION_VALID);
this.removeActionListener(CheckBoxBinding.ACTION_COMMAND);
break;
}
};
CheckBoxGroupBinding.newInstance=function(_9d2){
var _9d3=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkboxgroup",_9d2);
return UserInterface.registerBinding(_9d3,CheckBoxGroupBinding);
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
var _9d4=DialogControlBinding.newInstance(this.bindingDocument);
_9d4.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_9d4);
this._controlGroupBinding.attachRecursive();
var _9d5=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloonspeak",this.bindingDocument);
this.bindingElement.appendChild(_9d5);
var _9d6=this.getLabel();
if(_9d6!=null){
this.setLabel(_9d6);
}
};
BalloonBinding.prototype.onBindingDispose=function(){
BalloonBinding.superclass.onBindingDispose.call(this);
if(this._updateInterval){
window.clearInterval(this._updateInterval);
this._updateInterval=null;
}
var _9d7=this._snapTargetBinding;
if(Binding.exists(_9d7)==true){
_9d7.removeActionListener(Binding.ACTION_BLURRED,this);
_9d7.removeActionListener(Binding.ACTION_VALID,this);
}
};
BalloonBinding.prototype.snapTo=function(_9d8){
if(Interfaces.isImplemented(IData,_9d8)){
this._snapTargetBinding=_9d8;
var _9d9=_9d8.dispatchAction(BalloonBinding.ACTION_INITIALIZE);
if(_9d9&&_9d9.isConsumed){
this._environmentBinding=_9d9.listener;
}
if(this._environmentBinding){
_9d8.addActionListener(Binding.ACTION_BLURRED,this);
_9d8.addActionListener(Binding.ACTION_VALID,this);
this.subscribe(BroadcastMessages.VIEW_CLOSED);
var self=this;
this._updateInterval=window.setInterval(function(){
if(Binding.exists(_9d8)==true){
self._updatePosition();
}else{
self.dispose();
}
},BalloonBinding.TIMEOUT);
_9d8.dispatchAction(BalloonBinding.ACTION_SNAP);
}else{
throw "No environment fit for balloons!";
}
}
};
BalloonBinding.prototype._updatePosition=function(){
var _9db=this._snapTargetBinding;
var _9dc=this._environmentBinding;
var root=UserInterface.getBinding(_9db.bindingDocument.body);
if(Binding.exists(_9db)&&Binding.exists(_9dc)){
if(!root.isActivated){
if(this.isVisible==true){
this.hide();
}
}else{
if(_9db.isAttached&&_9dc.isAttached){
var _9de=_9db.boxObject.getUniversalPosition();
var _9df=_9dc.boxObject.getUniversalPosition();
_9df.y+=_9dc.bindingElement.scrollTop;
_9df.x+=_9dc.bindingElement.scrollLeft;
var tDim=_9db.boxObject.getDimension();
var eDim=_9dc.boxObject.getDimension();
var _9e2=false;
if(_9de.y+tDim.h<_9df.y){
_9e2=true;
}else{
if(_9de.x+tDim.w<_9df.x){
_9e2=true;
}else{
if(_9de.y>_9df.y+eDim.h){
_9e2=true;
}else{
if(_9de.x>_9df.x+eDim.w){
_9e2=true;
}
}
}
}
if(!_9e2){
this._setComputedPosition(_9de,_9df,tDim,eDim);
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
BalloonBinding.prototype._setComputedPosition=function(_9e3,_9e4,tDim,eDim){
var wDim=WindowManager.getWindowDimensions();
var bDim=this._getDimension();
var _9e9=_9e3;
var _9ea=false;
if(_9e3.x+tDim.w+bDim.w+BalloonBinding.OFFSET_X>=wDim.w){
_9ea=true;
}else{
if(_9e3.x+tDim.w>=_9e4.x+eDim.w){
_9ea=true;
}
}
if(_9ea){
_9e9.x-=(bDim.w+BalloonBinding.OFFSET_X);
this.attachClassName(BalloonBinding.CLASSNAME_LEFT);
}else{
_9e9.x+=tDim.w+BalloonBinding.OFFSET_X;
this.detachClassName(BalloonBinding.CLASSNAME_LEFT);
}
_9e9.y-=(bDim.h);
_9e9.y+=BalloonBinding.OFFSET_Y;
this._setPosition(_9e9);
};
BalloonBinding.prototype.handleBroadcast=function(_9eb,arg){
BalloonBinding.superclass.handleBroadcast.call(this,_9eb,arg);
switch(_9eb){
case BroadcastMessages.VIEW_CLOSED:
if(this._isAssociatedView(arg)==true){
this.dispose();
}
break;
}
};
BalloonBinding.prototype._isAssociatedView=function(_9ed){
var _9ee=false;
if(this._snapTargetBinding){
var view=this._snapTargetBinding.getAncestorBindingByType(ViewBinding,true);
if(view&&view.getHandle()==_9ed){
_9ee=true;
}
}
return _9ee;
};
BalloonBinding.prototype._setPosition=function(_9f0){
var _9f1=false;
var pos=this.boxObject.getLocalPosition();
if(this._point!=null){
if(pos.x!=this._point.x||pos.y!=this._point.y){
_9f1=true;
}
}
if(!_9f1){
this.bindingElement.style.left=_9f0.x+"px";
this.bindingElement.style.top=_9f0.y+"px";
this._point=_9f0;
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
BalloonBinding.prototype.handleAction=function(_9f3){
BalloonBinding.superclass.handleAction.call(this,_9f3);
var _9f4=_9f3.target;
switch(_9f3.type){
case Binding.ACTION_ACTIVATED:
if(this._snapTargetBinding){
this._snapTargetBinding.dispatchAction(Binding.ACTION_ACTIVATED);
_9f3.consume();
}
case Binding.ACTION_BLURRED:
case Binding.ACTION_VALID:
if(_9f4==this._snapTargetBinding){
var self=this;
setTimeout(function(){
if(!Binding.exists(_9f4)){
self.dispose();
}else{
if(_9f4.validate()){
var _9f6=true;
if(_9f3.type==Binding.ACTION_BLURRED){
var root=_9f4.bindingDocument.body;
var bind=UserInterface.getBinding(root);
if(!root.isActivated){
_9f6=false;
}
}
if(_9f6){
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
BalloonBinding.prototype.setLabel=function(_9f9){
if(this.isAttached==true){
if(!this._isTableIndexed){
this._indexTable();
}
var _9fa=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloontext",this.bindingDocument);
var text=this.bindingDocument.createTextNode(_9f9);
_9fa.appendChild(text);
this.shadowTree[MatrixBinding.CENTER].appendChild(_9fa);
}
this.setProperty("label",_9f9);
};
BalloonBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
BalloonBinding.newInstance=function(_9fc){
var _9fd=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloon",_9fc);
var _9fe=UserInterface.registerBinding(_9fd,BalloonBinding);
_9fe.hide();
return _9fe;
};
ErrorBinding.prototype=new Binding;
ErrorBinding.prototype.constructor=ErrorBinding;
ErrorBinding.superclass=Binding.prototype;
ErrorBinding.ACTION_INITIALIZE="error initialize";
ErrorBinding.presentError=function(_9ff,_a00){
if(Interfaces.isImplemented(IData,_a00)==true){
var _a01,_a02=_a00.dispatchAction(ErrorBinding.ACTION_INITIALIZE);
if(_a02&&_a02.isConsumed){
switch(_a02.listener.constructor){
case StageBinding:
_a01=false;
break;
case StageDialogBinding:
_a01=true;
break;
}
}
var _a03=_a01?top.app.bindingMap.dialogballoonset:top.app.bindingMap.balloonset;
var _a04=_a03.add(BalloonBinding.newInstance(top.app.document));
_a04.setLabel(_9ff.text);
_a04.snapTo(_a00);
_a04.attach();
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
var _a05=this.bindingWindow.DataManager;
var text=this.getProperty("text");
var name=this.getProperty("targetname");
var _a08=_a05.getDataBinding(name);
if(_a08){
ErrorBinding.presentError({text:text},_a08);
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
FocusBinding.focusElement=function(_a09){
var _a0a=true;
try{
_a09.focus();
Application.focused(true);
}
catch(exception){
var _a0b=UserInterface.getBinding(_a09);
var _a0c=SystemLogger.getLogger("FocusBinding.focusElement");
_a0c.warn("Could not focus "+(_a0b?_a0b.toString():String(_a09)));
_a0a=false;
}
return _a0a;
};
FocusBinding.focusedBinding=null;
FocusBinding.activeInstance=null;
FocusBinding.getCachedFocus=function(_a0d){
var win=_a0d.bindingWindow;
var id=_a0d.bindingElement.id;
return {getBinding:function(){
var _a10=null;
try{
if(Binding.exists(_a0d)){
_a10=win.bindingMap[id];
}
}
catch(exception){
}
return _a10;
}};
};
FocusBinding.navigateNext=function(_a11){
if(Binding.exists(FocusBinding.activeInstance)){
FocusBinding.activeInstance.focusNext(_a11);
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
var _a12=this.dispatchAction(FocusBinding.ACTION_ATTACHED);
if(_a12&&_a12.isConsumed){
if(_a12.listener.isStrongFocusManager){
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
FocusBinding.prototype.handleAction=function(_a13){
FocusBinding.superclass.handleAction.call(this,_a13);
var _a14=_a13.target;
var _a15=null;
if(this._isFocusManager){
switch(_a13.type){
case FocusBinding.ACTION_ATTACHED:
if(_a14!=this){
this._isUpToDate=false;
}
_a13.consume();
break;
case FocusBinding.ACTION_UPDATE:
if(_a14!=this){
this._isUpToDate=false;
_a13.consume();
}
break;
case FocusBinding.ACTION_BLUR:
if(Application.isOperational){
_a15=new FocusCrawler();
_a15.mode=FocusCrawler.MODE_BLUR;
_a15.crawl(_a14.bindingElement);
if(this._cachedFocus!=null){
this._cachedFocus=null;
}
}
_a13.consume();
break;
case FocusBinding.ACTION_FOCUS:
if(Application.isOperational&&_a14!=this){
_a15=new FocusCrawler();
_a15.mode=FocusCrawler.MODE_FOCUS;
_a15.crawl(_a14.bindingElement);
}
_a13.consume();
break;
case Binding.ACTION_FOCUSED:
if(Interfaces.isImplemented(IFocusable,_a14)){
this.claimFocus();
this._onFocusableFocused(_a14);
}
_a13.consume();
break;
case Binding.ACTION_BLURRED:
if(Interfaces.isImplemented(IFocusable,_a14)){
this._onFocusableBlurred(_a14);
}
_a13.consume();
break;
}
}
};
FocusBinding.prototype.focusNext=function(_a16){
var _a17=null;
var list=this._getFocusableList();
if(list.reset().hasEntries()){
while(_a17==null&&list.hasNext()){
var _a19=list.getNext();
if(this._cachedFocus&&_a19==this._cachedFocus.getBinding()){
_a17=_a19;
}
}
if(_a17!=null){
if(_a19.isFocused){
var next=_a16?list.getPreceding(_a17):list.getFollowing(_a17);
if(!next){
next=_a16?list.getLast():list.getFirst();
}
next.focus();
}else{
_a17.focus();
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
var _a1b=new FocusCrawler();
var list=new List();
_a1b.mode=FocusCrawler.MODE_INDEX;
_a1b.crawl(this.bindingElement,list);
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
var _a1f=this._cachedFocus.getBinding();
if(_a1f&&!_a1f.isFocused){
_a1f.focus();
}
}
};
FocusBinding.prototype._onFocusableFocused=function(_a20){
if(_a20!=FocusBinding.focusedBinding){
if(FocusBinding.focusedBinding!=null){
if(Binding.exists(FocusBinding.focusedBinding)){
FocusBinding.focusedBinding.blur();
}
}
FocusBinding.focusedBinding=_a20;
_a20.setProperty(FocusBinding.MARKER,true);
this._cachedFocus=FocusBinding.getCachedFocus(_a20);
}
};
FocusBinding.prototype._onFocusableBlurred=function(_a21){
_a21.deleteProperty(FocusBinding.MARKER);
if(_a21==FocusBinding.focusedBinding){
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
TabsButtonBinding.prototype.show=function(_a23){
this.bindingElement.style.left=_a23+"px";
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
TabsButtonBinding.prototype.registerHiddenTabBinding=function(_a24){
this.hiddenTabBindings.add(_a24);
};
TabsButtonBinding.prototype.fireCommand=function(){
if(this.isChecked&&!this.isPopulated){
this.hiddenTabBindings.reset();
while(this.hiddenTabBindings.hasNext()){
var _a25=this.hiddenTabBindings.getNext();
var item=MenuItemBinding.newInstance(this.popupBinding.bindingDocument);
item.setLabel(_a25.getLabel());
item.setImage(_a25.getImage());
item.associatedTabBinding=_a25;
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
TabsButtonBinding.prototype.handleAction=function(_a28){
TabsButtonBinding.superclass.handleAction.call(this,_a28);
switch(_a28.type){
case PopupBinding.ACTION_HIDE:
this.popupBinding.removeActionListener(PopupBinding.ACTION_HIDE,this);
var _a29=this.selectedTabBinding;
if(_a29){
this.containingTabBoxBinding.moveToOrdinalPosition(_a29,0);
this.containingTabBoxBinding.select(_a29);
}
_a28.consume();
break;
}
};
TabsButtonBinding.newInstance=function(_a2a){
var _a2b=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_a2a);
_a2b.setAttribute("type","checkbox");
_a2b.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_a2b.className="tabbutton";
return UserInterface.registerBinding(_a2b,TabsButtonBinding);
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
var _a2c=TabBoxBinding.currentActiveInstance;
if(_a2c!=null&&Binding.exists(_a2c)){
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
var _a2d=this.getTabElements().getLength();
var _a2e=this.getTabPanelElements().getLength();
if(!this._tabsElement||!this._tabPanelsElement){
throw new Error(this.toString()+" DOM subtree invalid.");
}else{
if(_a2d!=_a2e){
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
var _a2f=this.getTabPanelElements();
while(_a2f.hasNext()){
this._setupWarningSystem(UserInterface.getBinding(_a2f.getNext()));
}
if(this.isEqualSize){
this.enforceEqualSize();
this.dispatchAction(PageBinding.ACTION_UNBLOCK_INIT);
}
this.dispatchAction(TabBoxBinding.ACTION_ATTACHED);
TabBoxBinding.superclass.onBindingInitialize.call(this);
};
TabBoxBinding.prototype.buildDOMContent=function(){
var _a30=DOMUtil.getOrdinalPosition(this._tabsElement);
var _a31=DOMUtil.getOrdinalPosition(this._tabPanelsElement);
var _a32=_a30>_a31?"tabsbelow":"tabsontop";
this.attachClassName(_a32);
};
TabBoxBinding.prototype._TEMPNAME=function(){
var tabs=this.getTabElements();
var _a34=this.getTabPanelElements();
var _a35=null;
var _a36=this.getProperty("selectedindex");
if(_a36!=null){
if(_a36>tabs.getLength()-1){
throw "Selectedindex out of range";
}
}
if(tabs.hasEntries()){
var _a37=0;
while(tabs.hasNext()){
var tab=tabs.getNext();
var _a39=_a34.getNext();
this.registerTabBoxPair(tab,_a39);
if(_a36&&_a37==_a36){
tab.setAttribute("selected","true");
}else{
if(tab.getAttribute("selected")=="true"){
_a35=tab;
}
}
_a37++;
}
if(!_a35){
_a35=tabs.getFirst();
_a35.setAttribute("selected","true");
}
}
};
TabBoxBinding.prototype.enforceEqualSize=function(_a3a){
var _a3b=null;
var _a3c=null;
if(this.isEqualSize){
var _a3d=CSSComputer.getPadding(this._tabPanelsElement);
var max=0,_a3f=this.getTabPanelElements();
_a3f.each(function(_a40){
max=_a40.offsetHeight>max?_a40.offsetHeight:max;
});
_a3c=max+_a3d.top+_a3d.bottom;
if(_a3a&&this._tabPanelsElement.style.height!=null){
_a3b=this._tabPanelsElement.offsetHeight;
}
if(_a3b!=null||_a3c>_a3b){
this._tabPanelsElement.style.height=_a3c+"px";
}
}
};
TabBoxBinding.prototype._setupWarningSystem=function(_a41){
_a41._invalidCount=0;
_a41.addActionListener(Binding.ACTION_INVALID,this);
_a41.addActionListener(Binding.ACTION_VALID,this);
_a41.addActionListener(BalloonBinding.ACTION_SNAP,this);
};
TabBoxBinding.prototype.handleAction=function(_a42){
TabBoxBinding.superclass.handleAction.call(this,_a42);
var _a43=_a42.target;
var _a44=_a42.listener;
switch(_a42.type){
case Binding.ACTION_ATTACHED:
break;
case Binding.ACTION_DETACHED:
if(_a43.constructor==this._impl_tab){
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
_a42.consume();
}
break;
case PageBinding.ACTION_INITIALIZED:
if(_a43.isDialogSubPage&&this.isEqualSize){
this.enforceEqualSize();
}
break;
case Binding.ACTION_INVALID:
_a44._invalidCount++;
if(_a44._invalidCount==1){
var self=this;
setTimeout(function(){
if(!_a44.isSelected){
self._showWarning(_a44,true);
}
},0);
}
break;
case Binding.ACTION_VALID:
if(_a44._invalidCount>0){
_a44._invalidCount--;
if(_a44._invalidCount==0){
if(_a44.isSelected){
this._showWarning(_a44,false);
}
}
}
break;
case BalloonBinding.ACTION_SNAP:
this._showBalloon(_a44,true);
break;
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FOCUSED:
if(_a42._tabboxstamp==null){
TabBoxBinding.currentActiveInstance=this;
_a42._tabboxstamp="stamped";
}
break;
}
};
TabBoxBinding.prototype.handleEvent=function(e){
TabBoxBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.AFTERUPDATE:
var _a47=DOMEvents.getTarget(e);
if(_a47==this.bindingDocument.documentElement){
if(this._hasBastardUpdates){
this._hasBastardUpdates=false;
var tabs=this.getTabElements();
var _a49=this.getTabPanelElements();
tabs.each(function(tab,_a4b){
if(tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY)==null){
var _a4c=_a49.get(_a4b);
this.registerTabBoxPair(tab,_a4c);
}
},this);
var _a4d=this._tabBoxPairs;
for(var key in _a4d){
var tab=_a4d[key].tab;
if(tab.parentNode==null){
this.unRegisterTabBoxPair(tab);
}
}
}
}else{
if(!this._hasBastardUpdates){
var name=DOMUtil.getLocalName(_a47);
switch(_a47.__updateType){
case Update.TYPE_INSERT:
switch(name){
case this._nodename_tab:
case this._nodename_tabpanel:
var _a51=_a47.parentNode;
if(_a51==this._tabsElement||_a51==this._tabPanelsElement){
this._hasBastardUpdates=true;
}
break;
}
break;
case Update.TYPE_REMOVE:
switch(name){
case this._nodename_tabs:
case this._nodename_tabpanels:
if(_a47==this._tabsElement||_a47==this._tabPanelsElement){
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
TabBoxBinding.prototype.select=function(arg,_a53){
var _a54=this.getBindingForArgument(arg);
if(_a54!=null&&!_a54.isSelected){
if(this._selectedTabBinding!=null){
this._selectedTabBinding.unselect();
this.getTabPanelBinding(this._selectedTabBinding).unselect();
}
this.dispatchAction(TabBoxBinding.ACTION_UNSELECTED);
_a54.select(_a53);
this.getTabPanelBinding(_a54).select(_a53);
var _a55=this.getProperty("selectedindex");
if(_a55!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_a54.bindingElement,true));
}
this._selectedTabBinding=_a54;
this.dispatchAction(TabBoxBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
if(_a54.getImage()==TabBoxBinding.BALLOON_TAB_IMAGE){
var _a56=this.getTabPanelBinding(_a54);
this._showBalloon(_a56,false);
}
}
};
TabBoxBinding.prototype.registerTabBoxPair=function(tab,_a58){
var key=KeyMaster.getUniqueKey();
tab.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
_a58.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
this._tabBoxPairs[key]={tab:tab,tabPanel:_a58};
};
TabBoxBinding.prototype.unRegisterTabBoxPair=function(tab){
var key=tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY);
delete this._tabBoxPairs[key];
};
TabBoxBinding.prototype.getTabPanelBinding=function(_a5c){
var _a5d=null;
try{
var key=_a5c.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _a5f=this._tabBoxPairs[key].tabPanel;
_a5d=UserInterface.getBinding(_a5f);
}
catch(exception){
this.logger.error(exception);
SystemDebug.stack(arguments);
}
return _a5d;
};
TabBoxBinding.prototype.getTabBinding=function(_a60){
var key=_a60.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _a62=this._tabBoxPairs[key].tab;
return UserInterface.getBinding(_a62);
};
TabBoxBinding.prototype.summonTabBinding=function(){
return TabBinding.newInstance(this.bindingDocument);
};
TabBoxBinding.prototype.summonTabPanelBinding=function(){
var _a63=this._impl_tabpanel.newInstance(this.bindingDocument);
this._setupWarningSystem(_a63);
return _a63;
};
TabBoxBinding.prototype.appendTabByBindings=function(_a64,_a65){
var _a66=_a64.bindingElement;
_a64.setProperty("selected",true);
var _a67=this.summonTabPanelBinding();
var _a68=_a67.bindingElement;
if(_a65){
_a68.appendChild(_a65 instanceof Binding?_a65.bindingElement:_a65);
}
this.registerTabBoxPair(_a66,_a68);
UserInterface.getBinding(this._tabsElement).add(_a64);
this._tabPanelsElement.appendChild(_a68);
_a64.attach();
UserInterface.getBinding(_a68).attachRecursive();
this.updateType=TabBoxBinding.UPDATE_ATTACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
return _a64;
};
TabBoxBinding.prototype.importTabBinding=function(_a69){
var that=_a69.containingTabBoxBinding;
var _a6b=that.getTabPanelBinding(_a69);
var _a6c=_a6b.getBindingElement();
var _a6d=_a69.getBindingElement();
that.dismissTabBinding(_a69);
this._tabsElement.appendChild(_a6d);
this._tabPanelsElement.appendChild(_a6c);
this.registerTabBoxPair(_a6d,_a6c);
_a69.containingTabBoxBinding=this;
this.select(_a69);
this.dispatchAction(Binding.ACTION_ACTIVATED);
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.removeTab=function(_a6e){
var _a6f=null;
if(_a6e.isSelected){
_a6f=this.getBestTab(_a6e);
this._selectedTabBinding=null;
}
var _a70=this.getTabPanelBinding(_a6e);
this.unRegisterTabBoxPair(_a6e.bindingElement);
_a6e.dispose();
_a70.dispose();
if(_a6f!=null){
this.select(_a6f);
}
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.dismissTabBinding=function(_a71){
if(_a71.isSelected){
this.selectBestTab(_a71);
}
};
TabBoxBinding.prototype.selectBestTab=function(_a72){
var _a73=this.getBestTab(_a72);
if(_a73){
this.select(_a73);
}else{
this._selectedTabBinding=null;
}
};
TabBoxBinding.prototype.getBestTab=function(_a74){
var _a75=null;
var _a76=_a74.getOrdinalPosition(true);
var _a77=this.getTabBindings();
var _a78=_a77.getLength();
var _a79=_a78-1;
if(_a78==1){
_a75=null;
}else{
if(_a76==_a79){
_a75=_a77.get(_a76-1);
}else{
_a75=_a77.get(_a76+1);
}
}
return _a75;
};
TabBoxBinding.prototype.moveToOrdinalPosition=function(_a7a,_a7b){
var _a7c=this.bindingDocument.getElementById(_a7a.bindingElement.id);
var tab=this.getTabElements().get(_a7b);
this._tabsElement.insertBefore(_a7c,tab);
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
var _a7e=this._nodename_tab;
var _a7f=new List(this._tabsElement.childNodes);
var _a80=new List();
while(_a7f.hasNext()){
var _a81=_a7f.getNext();
if(_a81.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_a81)==_a7e){
_a80.add(_a81);
}
}
return _a80;
};
TabBoxBinding.prototype.getTabPanelElements=function(){
var _a82=this._nodename_tabpanel;
var _a83=new List(this._tabPanelsElement.childNodes);
var _a84=new List();
_a83.each(function(_a85){
if(_a85.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_a85)==_a82){
_a84.add(_a85);
}
});
return _a84;
};
TabBoxBinding.prototype.getTabsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabs);
};
TabBoxBinding.prototype.getTabPanelsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabpanels);
};
TabBoxBinding.prototype.getTabBindings=function(){
var _a86=new List();
var _a87=this.getTabElements();
_a87.each(function(_a88){
_a86.add(UserInterface.getBinding(_a88));
});
return _a86;
};
TabBoxBinding.prototype.getTabPanelBindings=function(){
var _a89=new List();
this.getTabPanelElements().each(function(_a8a){
_a89.add(UserInterface.getBinding(_a8a));
});
return _a89;
};
TabBoxBinding.prototype.getSelectedTabBinding=function(){
return this._selectedTabBinding;
};
TabBoxBinding.prototype.getSelectedTabPanelBinding=function(){
var _a8b=null;
if(this._selectedTabBinding){
_a8b=this.getTabPanelBinding(this._selectedTabBinding);
}
return _a8b;
};
TabBoxBinding.prototype._showWarning=function(_a8c,_a8d){
var _a8e=this.getTabBinding(_a8c);
if(_a8d){
if(_a8e.labelBinding.hasImage){
_a8e._backupImage=_a8e.getImage();
}
_a8e.setImage(TabBoxBinding.INVALID_TAB_IMAGE);
}else{
if(_a8e._backupImage){
_a8e.setImage(_a8e._backupImage);
}else{
_a8e.setImage(false);
}
}
};
TabBoxBinding.prototype._showBalloon=function(_a8f,_a90){
var _a91=this.getTabBinding(_a8f);
if((_a90&&!_a91.isSelected)||!_a90){
if(_a91.getImage()!=TabBoxBinding.INVALID_TAB_IMAGE){
if(_a90){
if(_a91.labelBinding.hasImage){
_a91._backupImage=_a91.getImage();
}
_a91.setImage(TabBoxBinding.BALLOON_TAB_IMAGE);
}else{
if(_a91._backupImage!=null){
_a91.setImage(_a91._backupImage);
}else{
_a91.setImage(false);
}
}
}
}
};
TabBoxBinding.prototype.advanceSelection=function(_a92){
var tab=this.getSelectedTabBinding();
var tabs=this.getTabBindings();
var _a95=tab.getOrdinalPosition(true);
var next=null;
var _a97=new List();
tabs.each(function(t){
if(t.isVisible){
_a97.add(t);
}
});
if(_a97.getLength()>1){
if(_a95==0&&!_a92){
next=_a97.getLast();
}else{
if(_a95==_a97.getLength()-1&&_a92){
next=_a97.getFirst();
}else{
if(_a92){
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
var _a9a=this.constructor.TABBUTTON_IMPLEMENTATION;
this.tabsButtonBinding=_a9a.newInstance(this.bindingDocument);
this.shadowTree.tabsButton=this.tabsButtonBinding;
this.add(this.tabsButtonBinding);
this.tabsButtonBinding.attach();
};
TabsBinding.prototype.handleAction=function(_a9b){
TabsBinding.superclass.handleAction.call(this,_a9b);
switch(_a9b.type){
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
var _a9e=self.bindingElement.offsetWidth;
if(_a9e!=self._cachedOffsetWidth){
self.manage();
}
self._cachedOffsetWidth=_a9e;
}
}
setTimeout(manage,0);
}
};
TabsBinding.prototype.add=function(_a9f){
if(_a9f instanceof TabBinding){
if(this.tabsButtonBinding&&this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
return TabsBinding.superclass.add.call(this,_a9f);
};
TabsBinding.prototype.manage=function(){
if(Binding.exists(this)==true&&this.isVisible){
this.isManaging=true;
var _aa0=false;
var _aa1,tab,tabs=this.containingTabBoxBinding.getTabElements();
var _aa4=this.constructor.TABBUTTON_IMPLEMENTATION;
var _aa5=this.bindingElement.offsetWidth-_aa4.RESERVED_SPACE;
var _aa6=null;
var sum=0,_aa8=0;
var _aa9=true;
if(tabs.hasEntries()){
this.tabsButtonBinding.reset();
while(tabs.hasNext()&&_aa9){
tab=tabs.getNext();
_aa1=UserInterface.getBinding(tab);
if(!_aa6){
_aa6=_aa1;
}
sum+=tab.offsetWidth;
if(sum>=_aa5){
_aa0=true;
if(_aa1.isSelected){
if(!DOMUtil.isFirstElement(_aa1.bindingElement,true)){
this.isManaging=false;
if(_aa6){
_aa6.hide();
if(this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
this.containingTabBoxBinding.moveToOrdinalPosition(_aa1,_aa8-1);
_aa9=false;
}
}else{
_aa1.hide();
this.tabsButtonBinding.registerHiddenTabBinding(_aa1);
}
}else{
_aa1.show();
_aa6=_aa1;
_aa8++;
}
}
if(_aa9){
if(_aa0&&this.tabsButtonBinding.hiddenTabBindings.hasEntries()){
var _aaa=_aa6.getBindingElement();
var _aab=_aaa.offsetLeft+_aaa.offsetWidth;
var _aac=this.tabsButtonBinding;
setTimeout(function(){
_aac.show(_aab+4);
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
var _aad=TabBinding.superclass.serialize.call(this);
if(_aad){
_aad.label=this.getLabel();
_aad.image=this.getImage();
_aad.tooltip=this.getToolTip();
}
return _aad;
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
var _aae=this.bindingElement.getAttribute("image");
var _aaf=this.bindingElement.getAttribute("label");
var _ab0=this.bindingElement.getAttribute("tooltip");
this.bindingElement.className="default";
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.shadowTree.labelBinding=this.labelBinding;
this.labelBinding.attachClassName("tablabel");
this.add(this.labelBinding);
if(_aaf){
this.setLabel(_aaf);
}
if(_aae){
this.setImage(_aae);
}
if(_ab0){
this.setToolTip(_ab0);
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
TabBinding.prototype.setLabel=function(_ab2){
if(_ab2!=null){
this.setProperty("label",_ab2);
if(this.isAttached){
this.labelBinding.setLabel(_ab2);
}
}
};
TabBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
TabBinding.prototype.setToolTip=function(_ab3){
if(_ab3){
this.setProperty("tooltip",_ab3);
if(this.isAttached){
this.labelBinding.setToolTip(_ab3);
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
var _ab5=false;
if(Client.isMozilla==true){
}
if(!_ab5){
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
TabBinding.prototype.select=function(_ab6){
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
TabBinding.newInstance=function(_ab7){
var _ab8=DOMUtil.createElementNS(Constants.NS_UI,"ui:tab",_ab7);
return UserInterface.registerBinding(_ab8,TabBinding);
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
var _ab9=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(dim2==null||!Dimension.isEqual(dim1,dim2)){
_ab9=true;
this._lastKnownDimension=dim1;
}
return _ab9;
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
TabPanelBinding.prototype.select=function(_abc){
if(!this.isSelected){
if(this.isLazy){
this.wakeUp("select");
}else{
this.isSelected=true;
this.isVisible=true;
this.bindingElement.style.position="static";
this._invokeManagedRecursiveFlex();
if(_abc!=true){
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
TabPanelBinding.prototype.handleAction=function(_abd){
TabPanelBinding.superclass.handleAction.call(this,_abd);
var _abe=_abd.target;
switch(_abd.type){
case BalloonBinding.ACTION_INITIALIZE:
_abd.consume();
break;
}
};
TabPanelBinding.newInstance=function(_abf){
var _ac0=DOMUtil.createElementNS(Constants.NS_UI,"ui:tabpanel",_abf);
UserInterface.registerBinding(_ac0,TabPanelBinding);
return UserInterface.getBinding(_ac0);
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
var _ac1=SplitBoxBinding.superclass.serialize.call(this);
if(_ac1){
_ac1.orient=this.getOrient();
_ac1.layout=this.getLayout();
}
return _ac1;
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
var _ac2=this.getSplitPanelElements();
if(_ac2.hasEntries()){
var _ac3=new List(this.getLayout().split(":"));
if(_ac3.getLength()!=_ac2.getLength()){
throw new Error(this+" DOM subree invalid");
}else{
_ac2.each(function(_ac4){
_ac4.setAttribute("ratio",_ac3.getNext());
});
}
}
this.isLayoutInitialized=true;
};
SplitBoxBinding.prototype._initializeOrient=function(){
var _ac5=this.getProperty("orient");
if(_ac5){
this._orient=_ac5;
}
this.attachClassName(this._orient);
};
SplitBoxBinding.prototype._initializeSplitters=function(){
var _ac6=this.getSplitterBindings();
while(_ac6.hasNext()){
var _ac7=_ac6.getNext();
if(_ac7&&_ac7.getProperty("collapsed")==true){
_ac7.collapse();
}
}
};
SplitBoxBinding.prototype.handleAction=function(_ac8){
SplitBoxBinding.superclass.handleAction.call(this,_ac8);
switch(_ac8.type){
case SplitterBinding.ACTION_DRAGGED:
this.refreshLayout();
_ac8.consume();
break;
case SplitterBinding.ACTION_COLLAPSE:
this.collapse(_ac8.target);
_ac8.consume();
break;
case SplitterBinding.ACTION_UNCOLLAPSE:
this.unCollapse(_ac8.target);
_ac8.consume();
break;
}
};
SplitBoxBinding.prototype.flex=function(){
SplitBoxBinding.superclass.flex.call(this);
if(this.isAttached==true){
this.invokeLayout(true);
}
};
SplitBoxBinding.prototype.collapse=function(_ac9){
this._getSplitPanelBindingForSplitter(_ac9).collapse();
this.invokeLayout();
};
SplitBoxBinding.prototype.unCollapse=function(_aca){
this._getSplitPanelBindingForSplitter(_aca).unCollapse();
this.invokeLayout();
};
SplitBoxBinding.prototype._getSplitPanelBindingForSplitter=function(_acb){
var _acc=DOMUtil.getOrdinalPosition(_acb.bindingElement,true);
var _acd,_ace=this.getSplitPanelElements();
switch(_acb.getCollapseDirection()){
case SplitterBinding.COLLAPSE_BEFORE:
_acd=_ace.get(_acc);
break;
case SplitterBinding.COLLAPSE_AFTER:
_acd=_ace.get(_acc+1);
break;
}
return UserInterface.getBinding(_acd);
};
SplitBoxBinding.prototype.invokeLayout=function(_acf){
var _ad0=this.isHorizontalOrient();
var _ad1=this.getSplitPanelBindings();
var _ad2=this.getSplitterBindings();
var _ad3=new List();
var _ad4,sum=0;
var _ad6=0;
_ad1.each(function(_ad7){
if(_ad7.isFixed==true){
if(!_ad1.hasNext()){
_ad6+=_ad7.getFix();
}
_ad3.add(0);
sum+=0;
}else{
_ad4=_ad7.getRatio();
_ad3.add(_ad4);
sum+=_ad4;
}
});
if(sum==0){
this.logger.warn("Division by zero was hacked");
sum=1;
}
if(_ad3.getLength()!=_ad1.getLength()){
throw new Error(this+" Invalid property (ratio)");
}else{
var _ad8=_ad0?this.getWidth():this.getHeight();
_ad8-=_ad6;
_ad2.each(function(_ad9){
if(_ad9.isVisible){
_ad8-=SplitterBinding.DIMENSION;
}
});
var unit=_ad8/sum;
var _adb=0;
var self=this;
_ad1.each(function(_add){
var span=0;
var _adf=_ad3.getNext();
if(_add.isFixed){
span=_add.getFix();
}else{
span=Math.round(unit*_adf);
if(isNaN(span)){
alert("isNaN ( span ) ["+this.getProperty("layout")+"]");
}
}
_adb+=span;
while(_adb>_ad8){
_adb--;
span--;
}
if(!_add.isFixed){
if(_ad0){
_add.setWidth(span);
}else{
_add.setHeight(span);
}
}
});
}
if(_acf!=true){
this.reflex();
}
if(this._persist&&this._persist.layout){
var _ae0=this.getLayout();
if(_ae0){
this.setProperty("layout",_ae0);
}
}
};
SplitBoxBinding.prototype.computeLayout=function(){
var _ae1=this.isHorizontalOrient();
var _ae2=this.getSplitPanelBindings();
var _ae3=this.getSplitterBindings();
var _ae4=null;
var _ae5=null;
var unit=null;
var _ae7=null;
var span=null;
_ae2.each(function(_ae9){
if(!unit){
unit=_ae1?_ae9.getWidth():_ae9.getHeight();
}
span=_ae1?_ae9.getWidth():_ae9.getHeight();
if(_ae7){
span-=_ae7;
_ae7=null;
}
_ae4=_ae3.getNext();
if(_ae4&&_ae4.offset){
_ae7=_ae4.offset;
span+=_ae7;
}
_ae9.setRatio(span/unit);
});
};
SplitBoxBinding.prototype.refreshLayout=function(){
this.computeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.setLayout=function(_aea){
this.logger.debug(_aea);
this.setProperty("layout",_aea);
this._initializeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.getLayout=function(){
if(!this.isLayoutInitialized){
if(!this.getProperty("layout")){
this.setProperty("layout",this.getDefaultLayout());
}
}else{
var _aeb="",_aec=this.getSplitPanelBindings();
_aec.each(function(_aed){
_aeb+=_aed.getRatio().toString();
_aeb+=_aec.hasNext()?":":"";
});
this.setProperty("layout",_aeb);
}
return new String(this.getProperty("layout"));
};
SplitBoxBinding.prototype.getDefaultLayout=function(){
var _aee=this.getSplitPanelElements();
_aee.each(function(_aef){
layout+="1"+(_aee.hasNext()?":":"");
});
this.setProperty("layout",layout);
};
SplitBoxBinding.prototype.setWidth=function(_af0){
this.bindingElement.style.width=_af0+"px";
};
SplitBoxBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
SplitBoxBinding.prototype.setHeight=function(_af1){
this.bindingElement.style.height=_af1+"px";
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
SplitBoxBinding.prototype.fit=function(_af2){
if(!this.isFit||_af2){
if(this.isHorizontalOrient()){
var max=0;
var _af4=this.getSplitPanelBindings();
_af4.each(function(_af5){
var _af6=_af5.bindingElement.offsetHeight;
max=_af6>max?_af6:max;
});
this._setFitnessHeight(max);
}else{
throw "SplitBoxBinding enforceFitness not supported vertically!";
}
this.isFit=true;
}
};
SplitBoxBinding.newInstance=function(_af7){
var _af8=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitbox",_af7);
return UserInterface.registerBinding(_af8,SplitBoxBinding);
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
var _afb=this.getProperty("hidden");
if(_afb){
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
var _afc=this.getProperty("ratiocache");
if(_afc){
this.setRatio(_afc);
this.deleteProperty("ratiocache");
}else{
this._containingSplitBoxBinding.computeLayout();
}
this.bindingElement.style.display="block";
this.deleteProperty("hidden");
this.isVisible=true;
}
};
SplitPanelBinding.prototype.setWidth=function(_afd){
if(!this.isFixed){
if(_afd!=this.getWidth()){
if(_afd<0){
_afd=this.getWidth();
this.logger.warn("SplitPanelBinding#setWidth bug in Internet Explorer!");
}
try{
this.bindingElement.style.width=_afd+"px";
}
catch(exception){
alert("SplitPanelBinding#setWidth: Occult width: "+_afd);
alert(arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getWidth=function(){
var _afe=null;
if(this.isFixed){
_afe=this.getFix();
}else{
_afe=this.bindingElement.offsetWidth;
}
return _afe;
};
SplitPanelBinding.prototype.setHeight=function(_aff){
if(!this.isFixed){
if(_aff!=this.getHeight()){
try{
this.bindingElement.style.height=_aff+"px";
}
catch(exception){
alert("SplitPanelBinding.prototype.setHeight"+arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getHeight=function(){
var _b00=null;
if(this.isFixed){
_b00=this.getFix();
}else{
_b00=this.bindingElement.offsetHeight;
}
return _b00;
};
SplitPanelBinding.prototype.setRatio=function(_b01){
this.setProperty("ratio",_b01);
};
SplitPanelBinding.prototype.getRatio=function(){
return this.getProperty("ratio");
};
SplitPanelBinding.prototype.setFix=function(_b02){
if(_b02){
this._fixedSpan=_b02;
switch(this._containingSplitBoxBinding.getOrient()){
case SplitBoxBinding.ORIENT_HORIZONTAL:
this.logger.warn("Fix not properly supported on horizontal splitboxes!");
this.setWidth(_b02);
break;
case SplitBoxBinding.ORIENT_VERTICAL:
this.setHeight(_b02);
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
SplitPanelBinding.newInstance=function(_b03){
var _b04=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitpanel",_b03);
return UserInterface.registerBinding(_b04,SplitPanelBinding);
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
var _b05=SplitBoxBinding.superclass.serialize.call(this);
if(_b05){
_b05.collapse=this.getProperty("collapse");
_b05.collapsed=this.getProperty("collapsed");
_b05.disabled=this.getProperty("isdisabled");
}
return _b05;
};
SplitterBinding.prototype.onBindingAttach=function(){
SplitterBinding.superclass.onBindingAttach.call(this);
this.addActionListener(Binding.ACTION_DRAG);
this._containingSplitBoxBinding=this.getAncestorBindingByLocalName("splitbox");
this.attachClassName(this._containingSplitBoxBinding.getOrient());
this._collapseDirection=this.getProperty("collapse");
this.buildDOMContent();
this.attachDOMEvents();
var _b06=this.getProperty("hidden");
if(_b06){
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
SplitterBinding.prototype.setCollapseDirection=function(_b08){
this.setProperty("collapse",_b08);
this._collapseDirection=_b08;
};
SplitterBinding.prototype.handleAction=function(_b09){
SplitterBinding.superclass.handleAction.call(this,_b09);
switch(_b09.type){
case Binding.ACTION_DRAG:
this.dragger.registerHandler(this);
_b09.consume();
break;
}
};
SplitterBinding.prototype.handleEvent=function(e){
SplitterBinding.superclass.handleEvent.call(this,e);
var _b0b=this;
if(!this.isDragging&&!this.isDisabled){
switch(e.type){
case DOMEvents.MOUSEOVER:
window.splitterTimeout=window.setTimeout(function(){
_b0b.shadowTree.splitterBody.className=SplitterBinding.CLASSNAME_HOVER;
},250);
break;
case DOMEvents.MOUSEOUT:
if(window.splitterTimeout){
window.clearTimeout(window.splitterTimeout);
}
if(_b0b.shadowTree.splitterBody.className==SplitterBinding.CLASSNAME_HOVER){
this.shadowTree.splitterBody.className="";
}
break;
}
}
};
SplitterBinding.prototype.onDragStart=function(_b0c){
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
SplitterBinding.newInstance=function(_b17){
var _b18=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitter",_b17);
return UserInterface.registerBinding(_b18,SplitterBinding);
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
var _b19=this.getProperty("selectedindex");
var _b1a=this.getDeckElements();
if(_b1a.hasEntries()){
var _b1b=false;
var _b1c=0;
while(_b1a.hasNext()){
var deck=_b1a.getNext();
if(_b19&&_b1c==_b19){
deck.setAttribute("selected","true");
_b1b=true;
}else{
if(deck.getAttribute("selected")=="true"){
_b1b=true;
}
}
_b1c++;
}
if(!_b1b){
_b1a.getFirst().setAttribute("selected","true");
}
}
};
DecksBinding.prototype.getDeckElements=function(){
return this.getChildElementsByLocalName(this.constructor.NODENAME_DECK);
};
DecksBinding.prototype.select=function(arg){
var _b1f=this.getBindingForArgument(arg);
if(_b1f!=null){
if(_b1f!=this._selectedDeckBinding){
if(this._selectedDeckBinding){
this._selectedDeckBinding.unselect();
}
_b1f.select();
this._selectedDeckBinding=_b1f;
var _b20=this.getProperty("selectedindex");
if(_b20!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_b1f.bindingElement,true));
}
this.dispatchAction(DecksBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
}else{
throw "No deck for argument "+arg;
}
};
DecksBinding.prototype.hasDimensionsChanged=function(){
var _b21=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(!Dimension.isEqual(dim1,dim2)){
_b21=true;
this._lastKnownDimension=dim1;
}
return _b21;
};
DecksBinding.prototype.getSelectedDeckBinding=function(){
return this._selectedDeckBinding;
};
DecksBinding.newInstance=function(_b24){
var _b25=DOMUtil.createElementNS(Constants.NS_UI,"ui:decks",_b24);
return UserInterface.registerBinding(_b25,DecksBinding);
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
DeckBinding.prototype.handleAction=function(_b26){
DeckBinding.superclass.handleAction.call(this,_b26);
var _b27=_b26.target;
switch(_b26.type){
case BalloonBinding.ACTION_INITIALIZE:
_b26.consume();
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
DeckBinding.newInstance=function(_b29){
var _b2a=DOMUtil.createElementNS(Constants.NS_UI,"ui:deck",_b29);
return UserInterface.registerBinding(_b2a,DeckBinding);
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
ToolBarBinding.prototype.onMemberInitialize=function(_b2b){
if(_b2b instanceof ToolBarBodyBinding){
if(_b2b.isRightAligned){
if(!this._toolBarBodyRight){
this._toolBarBodyRight=_b2b;
}
}else{
if(!this._toolBarBodyLeft){
this._toolBarBodyLeft=_b2b;
}
}
}
ToolBarBinding.superclass.onMemberInitialize.call(this,_b2b);
};
ToolBarBinding.prototype.parseDOMProperties=function(){
var _b2c=this.getProperty("imagesize");
var type=this.getProperty("type");
if(_b2c){
this.setImageSize(_b2c);
}
if(type){
this.setType(type);
}else{
this.setType(this.type);
}
};
ToolBarBinding.prototype.buildDOMContent=function(){
if(this._hasDefaultContent==true&&!this._hasDOMContent){
var _b2e=ToolBarGroupBinding.newInstance(this.bindingDocument);
_b2e.add(ToolBarButtonBinding.newInstance(this.bindingDocument));
_b2e.isDefaultContent=true;
this.add(_b2e);
_b2e.attachRecursive();
this._hasDOMContent=true;
}
};
ToolBarBinding.prototype.flex=function(){
var left=this._toolBarBodyLeft;
var _b30=this._toolBarBodyRight;
if(left!=null&&left.hasClassName("max")){
this._maxToolBarGroup(left,_b30);
}
if(_b30!=null&&_b30.hasClassName("max")){
this._maxToolBarGroup(_b30,left);
}
};
ToolBarBinding.prototype._maxToolBarGroup=function(max,_b32){
var _b33=this.boxObject.getDimension().w;
var _b34=CSSComputer.getPadding(this.bindingElement);
_b33-=(_b34.left+_b34.right);
if(_b32!=null){
_b33-=_b32.boxObject.getDimension().w;
if(!Client.isWindows){
_b33-=1;
}
if(Client.isExplorer){
_b33-=15;
}
}
max.bindingElement.style.width=_b33+"px";
};
ToolBarBinding.prototype.getToolBarGroupByIndex=function(_b35){
return this.getDescendantBindingsByLocalName("toolbargroup").get(_b35);
};
ToolBarBinding.prototype.addLeft=function(_b36,_b37){
var _b38=null;
if(this._toolBarBodyLeft!=null){
_b38=this._toolBarBodyLeft.add(_b36,_b37);
}else{
throw new Error("No left toolbarbody");
}
return _b38;
};
ToolBarBinding.prototype.addLeftFirst=function(_b39,_b3a){
var _b3b=null;
if(this._toolBarBodyLeft){
_b3b=this._toolBarBodyLeft.addFirst(_b39,_b3a);
}else{
throw new Error("No left toolbarbody");
}
return _b3b;
};
ToolBarBinding.prototype.addRight=function(_b3c){
var _b3d=null;
if(this._toolBarBodyRight){
_b3d=this._toolBarBodyRight.add(_b3c);
}else{
throw new Error("No left toolbarbody");
}
return _b3d;
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
ToolBarBinding.newInstance=function(_b40){
var _b41=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_b40);
return UserInterface.registerBinding(_b41,ToolBarBinding);
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
var _b42=this.getDescendantBindingsByLocalName("toolbargroup");
var _b43=new List();
var _b44=true;
_b42.each(function(_b45){
if(_b45.isVisible&&!_b45.isDefaultContent){
_b43.add(_b45);
}
});
while(_b43.hasNext()){
var _b46=_b43.getNext();
_b46.setLayout(ToolBarGroupBinding.LAYOUT_DEFAULT);
if(_b44){
_b46.setLayout(ToolBarGroupBinding.LAYOUT_FIRST);
_b44=false;
}
if(!_b43.hasNext()){
_b46.setLayout(ToolBarGroupBinding.LAYOUT_LAST);
}
}
if(this.getProperty("equalsize")){
this.enforceEqualSize();
}
};
ToolBarBodyBinding.prototype.enforceEqualSize=function(){
var max=0,list=this.getDescendantBindingsByLocalName("clickbutton");
while(list.hasNext()){
var _b49=list.getNext();
var _b4a=_b49.getEqualSizeWidth();
if(_b4a>max){
max=_b4a;
}
}
if(max!=0){
list.reset();
while(list.hasNext()){
var _b49=list.getNext();
_b49.setEqualSizeWidth(max);
}
}
};
ToolBarBodyBinding.prototype.empty=function(){
this.detachRecursive();
this.bindingElement.innerHTML="";
};
ToolBarBodyBinding.prototype.add=function(_b4b,_b4c){
var _b4d=ToolBarBinding.superclass.add.call(this,_b4b);
if(!_b4c){
if(_b4b instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _b4d;
};
ToolBarBodyBinding.prototype.addFirst=function(_b4e,_b4f){
var _b50=ToolBarBinding.superclass.addFirst.call(this,_b4e);
if(!_b4f){
if(_b4e instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _b50;
};
ToolBarBodyBinding.newInstance=function(_b51){
var _b52=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbody",_b51);
return UserInterface.registerBinding(_b52,ToolBarBodyBinding);
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
ToolBarGroupBinding.prototype.setLayout=function(_b53){
switch(_b53){
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
var _b54=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_b54)=="toolbarbody"){
UserInterface.getBinding(_b54).refreshToolBarGroups();
}
};
ToolBarGroupBinding.prototype.hide=function(){
ToolBarGroupBinding.superclass.hide.call(this);
var _b55=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_b55)=="toolbarbody"){
UserInterface.getBinding(_b55).refreshToolBarGroups();
}
};
ToolBarGroupBinding.newInstance=function(_b56){
var _b57=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbargroup",_b56);
return UserInterface.registerBinding(_b57,ToolBarGroupBinding);
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
ToolBarButtonBinding.newInstance=function(_b58){
var _b59=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_b58);
return UserInterface.registerBinding(_b59,ToolBarButtonBinding);
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
var _b5a=this.getProperty("label");
var _b5b=this.getProperty("image");
if(_b5a){
this.setLabel(_b5a);
}
if(_b5b){
this.setImage(_b5b);
}
};
ToolBarLabelBinding.prototype.setLabel=function(_b5c,_b5d){
if(this.isAttached){
this._labelBinding.setLabel(_b5c,_b5d);
}
this.setProperty("label",_b5c);
};
ToolBarLabelBinding.prototype.setImage=function(_b5e,_b5f){
if(this.isAttached){
this._labelBinding.setImage(_b5e,_b5f);
}
this.setProperty("image",_b5e);
};
ToolBarLabelBinding.newInstance=function(_b60){
var _b61=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarlabel",_b60);
return UserInterface.registerBinding(_b61,ToolBarLabelBinding);
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
var _b62=this.getDescendantBindingsByLocalName("clickbutton");
if(_b62.hasEntries()){
while(_b62.hasNext()){
var _b63=_b62.getNext();
if(_b63.isDefault){
this._defaultButton=_b63;
_b63.attachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
if(!this._isListening&&_b63.isFocusable){
this.subscribe(BroadcastMessages.KEY_ENTER);
this._isListening=true;
}
}
this._buttons=_b62;
}
};
DialogToolBarBinding.prototype.handleBroadcast=function(_b64,arg){
DialogToolBarBinding.superclass.handleBroadcast.call(this,_b64,arg);
switch(_b64){
case BroadcastMessages.KEY_ENTER:
if(!PopupBinding.hasActiveInstances()&&!EditorBinding.isActive){
if(Binding.exists(this)){
var _b66=this.getAncestorBindingByType(DialogBinding,true);
if(_b66!=null&&_b66.isActive){
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
DialogToolBarBinding.prototype.handleAction=function(_b67){
DialogToolBarBinding.superclass.handleAction.call(this,_b67);
var _b68=_b67.target;
var _b69=false;
var _b6a=this._buttons.reset();
if(_b68 instanceof ClickButtonBinding){
switch(_b67.type){
case Binding.ACTION_FOCUSED:
_b68.attachClassName(ButtonBinding.CLASSNAME_FOCUSED);
this._focusedButton=_b68;
if(this._defaultButton){
this._defaultButton.detachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
break;
case Binding.ACTION_BLURRED:
_b68.detachClassName(ButtonBinding.CLASSNAME_FOCUSED);
break;
}
}
if(this._defaultButton){
while(!_b69&&_b6a.hasNext()){
var _b6b=_b6a.getNext();
_b69=_b6b.isFocused;
}
if(!_b69){
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
var _b6c=this._views;
for(var _b6d in ViewDefinitions){
var def=ViewDefinitions[_b6d];
var key=def.perspective;
if(key!=null){
if(!_b6c.has(key)){
_b6c.set(key,new List());
}
var list=_b6c.get(key);
list.add(def);
}
}
}else{
this.hide();
}
};
ToolBoxToolBarButtonBinding.prototype.handleBroadcast=function(_b71,arg){
ToolBoxToolBarButtonBinding.superclass.handleBroadcast.call(this,_b71,arg);
switch(_b71){
case BroadcastMessages.PERSPECTIVE_CHANGED:
var tag=arg;
if(this._views.has(tag)){
if(tag!=this._lastGeneratedPerspective){
this._lastGeneratedPerspective=tag;
var list=this._views.get(tag);
var _b75=this.bindingWindow.bindingMap.toolboxpopup;
_b75.empty();
list.each(function(def){
var item=_b75.add(StageViewMenuItemBinding.newInstance(_b75.bindingDocument));
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
TreeBinding.grid=function(_b78){
var _b79=TreeNodeBinding.HEIGHT;
var ceil=Math.ceil(_b78);
var _b7b=_b78%_b79;
if(_b7b>0){
_b78=_b78-_b7b+_b79;
}
return _b78+TreeBodyBinding.PADDING_TOP;
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
var _b7c=this.getProperty("focusable");
if(_b7c!=null){
this._isFocusable=_b7c;
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
var _b7e=this.getProperty("builder");
if(_b7e){
this._buildFromTextArea(_b7e);
}else{
if(this._treeNodeBuffer.hasEntries()){
while(this._treeNodeBuffer.hasNext()){
this.add(this._treeNodeBuffer.getNext());
}
}
}
};
TreeBinding.prototype._setupTreeSelection=function(){
var _b7f=this.getProperty("selectable");
var _b80=this.getProperty("selectionproperty");
var _b81=this.getProperty("selectionvalue");
if(_b7f){
this.setSelectable(true);
if(_b80){
this.setSelectionProperty(_b80);
}
if(_b81){
this.setSelectionValue(_b81);
}
}
this._positionIndicatorBinding=this.add(TreePositionIndicatorBinding.newInstance(this.bindingDocument));
this.shadowTree.positionIndicator=this._positionIndicatorBinding;
this._positionIndicatorBinding.attach();
};
TreeBinding.prototype._buildFromTextArea=function(id){
var area=this.bindingDocument.getElementById(id);
if(area!=null){
var _b84=UserInterface.getBinding(area);
var _b85=this._treeBodyBinding;
function build(){
_b85.subTreeFromString(area.value);
}
_b84.addActionListener(Binding.ACTION_UPDATED,{handleAction:function(){
build();
}});
setTimeout(build,0);
}
};
TreeBinding.prototype.registerTreeNodeBinding=function(_b86){
var _b87=_b86.getHandle();
if(this._treeNodeBindings.has(_b87)){
throw "Duplicate treenodehandles registered: "+_b86.getLabel();
}else{
this._treeNodeBindings.set(_b87,_b86);
var map=this._openTreeNodesBackupMap;
if(map!=null&&map.has(_b87)){
_b86.open();
}
}
};
TreeBinding.prototype.unRegisterTreeNodeBinding=function(_b89){
this._treeNodeBindings.del(_b89.getHandle());
};
TreeBinding.prototype.getTreeNodeBindingByHandle=function(_b8a){
var _b8b=null;
if(this._treeNodeBindings.has(_b8a)){
_b8b=this._treeNodeBindings.get(_b8a);
}else{
throw "No such treenode: "+_b8a;
}
return _b8b;
};
TreeBinding.prototype.handleAction=function(_b8c){
TreeBinding.superclass.handleAction.call(this,_b8c);
var _b8d=_b8c.target;
switch(_b8c.type){
case TreeNodeBinding.ACTION_OPEN:
_b8c.consume();
break;
case TreeNodeBinding.ACTION_CLOSE:
this._blurDescendantBindings(_b8d);
_b8c.consume();
break;
case TreeNodeBinding.ACTION_ONFOCUS:
this._nodePrimary=_b8d;
this.focusSingleTreeNodeBinding(_b8d);
if(!this.isFocused){
this.focus();
}
_b8c.consume();
break;
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
switch(this._selectionType){
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodePrimary=_b8d;
this.focusSingleTreeNodeBinding(_b8d);
break;
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodeSecondary=_b8d;
if(!this._nodePrimary||this._nodeSecondary==this._nodePrimary){
this._nodePrimary=_b8d;
this.focusSingleTreeNodeBinding(_b8d);
}else{
this.focusMultipeTreeNodeBindings(this._getVisibleTreeNodeBindingsInRange(this._nodePrimary,this._nodeSecondary));
}
break;
}
if(!this.isFocused){
this.focus();
}
_b8c.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
if(_b8d.isFocused){
this.blurSelectedTreeNodes();
}
_b8c.consume();
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
TreeBinding.prototype._getVisibleTreeNodeBindingsInRange=function(_b8e,_b8f){
alert("TreeBinding#_getVisibleTreeNodeBindingsInRange");
};
TreeBinding.prototype.focusSingleTreeNodeBinding=function(_b90){
if(_b90!=null&&!_b90.isFocused){
this.blurSelectedTreeNodes();
this._focusedTreeNodeBindings.add(_b90);
_b90.invokeManagedFocus();
if(this._isSelectable){
this._manageSelections();
}
}
};
TreeBinding.prototype.focusMultipeTreeNodeBindings=function(_b91){
this.blurSelectedTreeNodes();
while(_b91.hasNext()){
var _b92=_b91.getNext();
this._focusedTreeNodeBindings.add(_b92);
_b92.invokeManagedFocus();
}
if(this._isSelectable){
this._manageSelections();
}
};
TreeBinding.prototype._manageSelections=function(){
var _b93=this._selectedTreeNodeBindings;
this._selectedTreeNodeBindings={};
var _b94=false;
var _b95=null;
this._focusedTreeNodeBindings.reset();
while(this._focusedTreeNodeBindings.hasNext()){
var _b96=this._focusedTreeNodeBindings.getNext();
var _b97=_b96.getProperty(this._selectionProperty);
if(_b97!=null){
if(!this._selectionValue||this._selectionValue[_b97]){
_b95=(this._selectedTreeNodeBindings[_b96.key]=_b96);
var _b98=_b93[_b96.key];
if(!_b98||_b98!=_b95){
_b94=true;
}
}
}
}
if(_b95){
if(_b94){
this.dispatchAction(TreeBinding.ACTION_SELECTIONCHANGED);
}
}else{
if(_b93){
for(var key in _b93){
this.dispatchAction(TreeBinding.ACTION_NOSELECTION);
break;
}
}
}
};
TreeBinding.prototype.getSelectedTreeNodeBindings=function(){
var _b9a=new List();
for(var key in this._selectedTreeNodeBindings){
_b9a.add(this._selectedTreeNodeBindings[key]);
}
return _b9a;
};
TreeBinding.prototype.blurSelectedTreeNodes=function(){
this._focusedTreeNodeBindings.reset().each(function(_b9c){
_b9c.blur();
});
this._focusedTreeNodeBindings.clear();
};
TreeBinding.prototype._blurDescendantBindings=function(_b9d){
var _b9e=_b9d.getDescendantBindingsByLocalName("treenode");
var _b9f=true;
var self=this;
_b9e.each(function(desc){
if(desc.isFocused){
desc.blur();
self._focusedTreeNodeBindings.del(self._focusedTreeNodeBindings.getIndex(desc));
}
return _b9f;
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
var _ba2=this._treeBodyBinding.getChildBindingByLocalName("treenode");
if(_ba2!=null){
this.focusSingleTreeNodeBinding(_ba2);
_ba2.callback();
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
TreeBinding.prototype.add=function(_ba3){
var _ba4=null;
if(this._treeBodyBinding){
_ba4=this._treeBodyBinding.add(_ba3);
}else{
this._treeNodeBuffer.add(_ba3);
_ba4=_ba3;
}
return _ba4;
};
TreeBinding.prototype.addFirst=function(_ba5){
throw new Error("Not implemented");
};
TreeBinding.prototype.empty=function(){
this._treeBodyBinding.detachRecursive();
var _ba6=this._treeBodyBinding.bindingElement;
_ba6.innerHTML="";
};
TreeBinding.prototype.isEmpty=function(){
return this._treeNodeBindings.hasEntries()==false;
};
TreeBinding.prototype.collapse=function(){
this.blurSelectedTreeNodes();
this._treeNodeBindings.each(function(_ba7,_ba8){
if(_ba8.isContainer&&_ba8.isOpen){
_ba8.close();
}
});
};
TreeBinding.prototype.setSelectable=function(_ba9){
this._isSelectable=_ba9;
if(_ba9){
this._selectedTreeNodeBindings={};
}else{
this._selectedTreeNodeBindings=null;
this._selectionProperty=null;
this._selectionValue=null;
}
};
TreeBinding.prototype.setSelectionProperty=function(_baa){
this._selectionProperty=_baa;
};
TreeBinding.prototype.setSelectionValue=function(_bab){
if(_bab){
var list=new List(_bab.split(" "));
this._selectionValue={};
while(list.hasNext()){
this._selectionValue[list.getNext()]=true;
}
}
};
TreeBinding.prototype.handleBroadcast=function(_bad,arg){
TreeBinding.superclass.handleBroadcast.call(this,_bad,arg);
switch(_bad){
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
var _baf=this.getFocusedTreeNodeBindings();
if(_baf.hasEntries()){
var node=_baf.getFirst();
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
var _bb2=this.getFocusedTreeNodeBindings();
if(_bb2.hasEntries()){
var node=_bb2.getFirst();
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
var _bb5=null;
while(next==null&&(_bb5=node.getAncestorBindingByLocalName("treenode"))!=null){
if(_bb5!=null){
next=_bb5.getNextBindingByLocalName("treenode");
}
node=_bb5;
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
var _bb7=DOMEvents.getTarget(e);
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
var _bb8=new TreeCrawler();
var list=new List();
_bb8.mode=TreeCrawler.MODE_GETOPEN;
_bb8.crawl(this.bindingElement,list);
var map=new Map();
if(list.hasEntries()){
while(list.hasNext()){
var _bbb=list.getNext();
map.set(_bbb.getHandle(),true);
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
var _bc0=this._positionIndicatorBinding;
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
if(y!=_bc0.getPosition().y){
_bc0.setPosition(new Point(this._acceptingPosition.x+TreeNodeBinding.INDENT,y));
}
if(!_bc0.isVisible){
_bc0.show();
}
}else{
if(_bc0.isVisible){
_bc0.hide();
}
}
}else{
if(_bc0.isVisible){
_bc0.hide();
}
}
};
TreeBinding.prototype.enablePositionIndicator=function(_bc3){
this._acceptingTreeNodeBinding=_bc3;
this._acceptingPosition=_bc3.boxObject.getLocalPosition();
this._acceptingDimension=_bc3.boxObject.getDimension();
this._acceptingPositions=this._getChildPositions(_bc3);
};
TreeBinding.prototype.disablePositionIndicator=function(){
this._acceptingTreeNodeBinding=null;
this._acceptingPosition=null;
this._acceptingDimension=null;
};
TreeBinding.prototype._getChildPositions=function(_bc4){
var map={};
var _bc6=_bc4.getChildBindingsByLocalName("treenode");
var _bc7,pos,dim,y;
y=TreeBinding.grid(_bc4.boxObject.getLocalPosition().y);
map[y]=true;
while(_bc6.hasNext()){
_bc7=_bc6.getNext();
pos=_bc7.boxObject.getLocalPosition();
dim=_bc7.boxObject.getDimension();
y=TreeBinding.grid(pos.y+dim.h)-TreeNodeBinding.HEIGHT;
map[y]=true;
}
return map;
};
TreeBinding.prototype.getDropIndex=function(){
var y=this._positionIndicatorBinding.getPosition().y;
var drop=0;
for(var _bcd in this._acceptingPositions){
if(_bcd==y){
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
TreeBinding.newInstance=function(_bce){
var _bcf=DOMUtil.createElementNS(Constants.NS_UI,"ui:tree",_bce);
var _bd0=UserInterface.registerBinding(_bcf,TreeBinding);
_bd0.treeBodyBinding=TreeBodyBinding.newInstance(_bce);
return _bd0;
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
TreeBodyBinding.prototype.accept=function(_bd1){
if(_bd1 instanceof TreeNodeBinding){
this.logger.debug(_bd1);
}
};
TreeBodyBinding.prototype.handleAction=function(_bd2){
TreeBodyBinding.superclass.handleAction.call(this,_bd2);
switch(_bd2.type){
case TreeNodeBinding.ACTION_FOCUSED:
this._scrollIntoView(_bd2.target);
_bd2.consume();
break;
}
};
TreeBodyBinding.prototype._scrollIntoView=function(_bd3){
var a=this.boxObject.getDimension().h;
var y=_bd3.boxObject.getLocalPosition().y;
var h=_bd3.boxObject.getDimension().h;
var t=this.bindingElement.scrollTop;
var l=this.bindingElement.scrollLeft;
var _bd9=_bd3.labelBinding.bindingElement;
if(y-t<0){
_bd9.scrollIntoView(true);
}else{
if(y-t+h>a){
_bd9.scrollIntoView(false);
}
}
if(Client.isExplorer){
this.bindingElement.scrollLeft=l;
}
};
TreeBodyBinding.newInstance=function(_bda){
var _bdb=DOMUtil.createElementNS(Constants.NS_UI,"ui:treebody",_bda);
return UserInterface.registerBinding(_bdb,TreeBodyBinding);
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
var _bdc=TreeNodeBinding.superclass.serialize.call(this);
if(_bdc){
_bdc.label=this.getLabel();
_bdc.image=this.getImage();
var _bdd=this.getHandle();
if(_bdd&&_bdd!=this.key){
_bdc.handle=_bdd;
}
if(this.isOpen){
_bdc.open=true;
}
if(this.isDisabled){
_bdc.disabled=true;
}
if(this.dragType){
_bdc.dragtype=this.dragType;
}
if(this.dragAccept){
_bdc.dragaccept=this.dragAccept;
}
}
return _bdc;
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
var _bdf=UserInterface.getBinding(node);
if(_bdf&&_bdf.containingTreeBinding){
this.containingTreeBinding=_bdf.containingTreeBinding;
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
var _be0=this.key;
var _be1=this.getProperty("handle");
if(_be1){
_be0=_be1;
}
return _be0;
};
TreeNodeBinding.prototype.setHandle=function(_be2){
this.setProperty("handle",_be2);
};
TreeNodeBinding.prototype.buildDOMContent=function(){
var url=this.getProperty("url");
var _be4=this.getProperty("label");
var _be5=this.getProperty("tooltip");
var _be6=this.getProperty("oncommand");
var _be7=this.getProperty("onbindingfocus");
var _be8=this.getProperty("onbindingblur");
var _be9=this.getProperty("focused");
var _bea=this.getProperty("callbackid");
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
if(_be4!=null){
this.setLabel(_be4);
}
if(_be5!=null){
this.setToolTip(_be5);
}
if(!this.imageProfile){
this._computeImageProfile();
}
this.setImage(this.computeImage());
if(this.isContainer){
this.updateClassNames();
}
var _bec=this.bindingWindow.WindowManager;
if(_be6!=null){
this.oncommand=function(){
Binding.evaluate(_be6,this);
};
}
if(_be7!=null){
this.onfocus=function(){
Binding.evaluate(_be7,this);
};
}
if(_be8!=null){
this.onblur=function(){
Binding.evaluate(_be8,this);
};
}
if(_be9==true){
this.focus();
}
if(_bea!=null){
Binding.dotnetify(this,_bea);
}
};
TreeNodeBinding.prototype.handleAction=function(_bed){
TreeNodeBinding.superclass.handleAction.call(this,_bed);
switch(_bed.type){
case TreeNodeBinding.ACTION_FOCUSED:
if(_bed.target!=this){
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
TreeNodeBinding.prototype.accept=function(_bee,_bef){
var _bf0=true;
if(_bee instanceof TreeNodeBinding){
var _bf1=false;
var _bf2=this.bindingElement;
var _bf3=this.containingTreeBinding.bindingElement;
while(!_bf1&&_bf2!=_bf3){
if(_bf2==_bee.getBindingElement()){
_bf1=true;
}else{
_bf2=_bf2.parentNode;
}
}
if(_bf1){
Dialog.error("Not Allowed","You cannot move a folder into itself.");
_bf0=false;
}else{
this.acceptTreeNodeBinding(_bee,_bef);
}
}else{
_bf0=false;
}
return _bf0;
};
TreeNodeBinding.prototype.acceptTreeNodeBinding=function(_bf4,_bf5){
var _bf6=_bf4.serializeToString();
var _bf7=new BindingParser(this.bindingDocument);
var _bf8=_bf7.parseFromString(_bf6).getFirst();
_bf5=_bf5?_bf5:this.containingTreeBinding.getDropIndex();
var _bf9=this.getChildElementsByLocalName("treenode");
this.bindingElement.insertBefore(_bf8,_bf9.get(_bf5));
this.bindingWindow.DocumentManager.attachBindings(this.bindingElement);
_bf4.dispose();
};
TreeNodeBinding.prototype.showAcceptance=function(){
this.containingTreeBinding.enablePositionIndicator(this);
};
TreeNodeBinding.prototype.hideAcceptance=function(){
this.containingTreeBinding.disablePositionIndicator();
};
TreeNodeBinding.prototype._computeImageProfile=function(){
var _bfa=this.getProperty("image");
var _bfb=this.getProperty("image-active");
var _bfc=this.getProperty("image-disabled");
_bfb=_bfb?_bfb:this.isContainer?_bfa?_bfa:TreeNodeBinding.DEFAULT_FOLDER_OPEN:_bfa?_bfa:TreeNodeBinding.DEFAULT_ITEM;
_bfc=_bfc?_bfc:this.isContainer?_bfa?_bfa:TreeNodeBinding.DEFAULT_FOLDER_DISABLED:_bfa?_bfa:TreeNodeBinding.DEFAULT_ITEM_DISABLED;
_bfa=_bfa?_bfa:this.isContainer?TreeNodeBinding.DEFAULT_FOLDER_CLOSED:TreeNodeBinding.DEFAULT_ITEM;
this.imageProfile=new ImageProfile({image:_bfa,imageHover:null,imageActive:_bfb,imageDisabled:_bfc});
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
TreeNodeBinding.prototype.setLabel=function(_bfe){
this.setProperty("label",String(_bfe));
if(this.isAttached){
this.labelBinding.setLabel(String(_bfe));
}
};
TreeNodeBinding.prototype.setToolTip=function(_bff){
this.setProperty("tooltip",String(_bff));
if(this.isAttached){
this.labelBinding.setToolTip(String(_bff));
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
var _c00=this.imageProfile.getDefaultImage();
var _c01=this.imageProfile.getActiveImage();
_c01=_c01?_c01:_c00;
return this.isOpen?_c01:_c00;
};
TreeNodeBinding.prototype.handleEvent=function(e){
TreeNodeBinding.superclass.handleEvent.call(this,e);
var _c03=DOMEvents.getTarget(e);
var _c04=this.labelBinding.bindingElement;
var _c05=this.labelBinding.shadowTree.labelBody;
var _c06=this.labelBinding.shadowTree.labelText;
switch(e.type){
case DOMEvents.MOUSEDOWN:
switch(_c03){
case _c04:
this._onAction(e);
break;
case _c05:
case _c06:
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
if(_c03.parentNode==this.bindingElement&&_c03.__updateType==Update.TYPE_INSERT){
var _c04=this.labelBinding.bindingElement;
if(DOMUtil.getLocalName(_c03)=="treenode"){
if(_c03==this.bindingElement.firstChild){
this.bindingElement.insertBefore(_c03,_c04.nextSibling);
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
switch(_c03){
case _c04:
case _c05:
case _c06:
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
var _c0a=true;
if(e.type=="mousedown"){
var _c0b=e.button==(e.target?0:1);
if(!_c0b){
_c0a=false;
}
}
if(_c0a){
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
var _c0d=false;
if(e!=null){
_c0d=e.shiftKey;
}
this.dispatchAction(_c0d?TreeNodeBinding.ACTION_ONMULTIFOCUS:TreeNodeBinding.ACTION_ONFOCUS);
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
var _c10=this.getDescendantBindingsByLocalName("treenode");
_c10.each(function(_c11){
_c11.dispose();
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
TreeNodeBinding.prototype.handleElement=function(_c12){
var _c13=_c12.getAttribute("focused");
if(_c13=="true"){
if(!this.isFocused){
this.focus();
}
}
return false;
};
TreeNodeBinding.newInstance=function(_c14){
var _c15=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_c14);
return UserInterface.registerBinding(_c15,TreeNodeBinding);
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
TreeContentBinding.newInstance=function(_c16){
var _c17=DOMUtil.createElementNS(Constants.NS_UI,"ui:treecontent",_c16);
return UserInterface.registerBinding(_c17,TreeContentBinding);
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
TreePositionIndicatorBinding.prototype.setPosition=function(_c18){
this.bindingElement.style.left=_c18.x+"px";
this.bindingElement.style.top=_c18.y+"px";
this._geometry.x=_c18.x;
this._geometry.y=_c18.y;
};
TreePositionIndicatorBinding.prototype.getPosition=function(){
return new Point(this._geometry.x,this._geometry.y);
};
TreePositionIndicatorBinding.newInstance=function(_c19){
var _c1a=DOMUtil.createElementNS(Constants.NS_UI,"ui:treepositionindicator",_c19);
return UserInterface.registerBinding(_c1a,TreePositionIndicatorBinding);
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
this.addFilter(function(_c1c){
var _c1d=UserInterface.getBinding(_c1c);
var _c1e=null;
var _c1e=null;
if(!_c1d instanceof TreeNodeBinding){
_c1e=NodeCrawler.SKIP_NODE;
}
return _c1e;
});
this.addFilter(function(_c1f,list){
var _c21=UserInterface.getBinding(_c1f);
var _c22=null;
switch(self.mode){
case TreeCrawler.MODE_GETOPEN:
if(_c21.isOpen){
list.add(_c21);
}
break;
}
return _c22;
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
ShadowBinding.prototype.shadow=function(_c23){
this.targetBinding=_c23;
_c23.addActionListener(Binding.ACTION_POSITIONCHANGED,this);
_c23.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_c23.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_c23.bindingElement.parentNode.appendChild(this.bindingElement);
if(_c23.isVisible){
this.show();
this.setPosition(_c23.getPosition());
this.setDimension(_c23.getDimension());
}else{
this.hide();
}
};
ShadowBinding.prototype.handleAction=function(_c24){
ShadowBinding.superclass.handleAction.call(this,_c24);
var _c25=_c24.target;
if(_c25==this.targetBinding){
switch(_c24.type){
case Binding.ACTION_POSITIONCHANGED:
this.setPosition(this.targetBinding.getPosition());
_c24.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
this.setDimension(this.targetBinding.getDimension());
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(_c25.isVisible){
this.show();
this.setPosition(_c25.getPosition());
this.setDimension(_c25.getDimension());
}else{
this.hide();
}
break;
}
}
};
ShadowBinding.prototype.setPosition=function(_c26){
var _c27=this.offset-this.expand;
this.bindingElement.style.left=new String(_c26.x+_c27)+"px";
this.bindingElement.style.top=new String(_c26.y+_c27)+"px";
};
ShadowBinding.prototype.setDimension=function(dim){
this.bindingElement.style.width=new String(dim.w+2*this.expand)+"px";
this.bindingElement.style.height=new String(dim.h+2*this.expand)+"px";
};
ShadowBinding.newInstance=function(_c29){
var _c2a=DOMUtil.createElementNS(Constants.NS_UI,"ui:shadow",_c29);
return UserInterface.registerBinding(_c2a,ShadowBinding);
};
DockControlImageProfile.prototype=new ControlImageProfile;
DockControlImageProfile.prototype.constructor=DockControlImageProfile;
DockControlImageProfile.superclass=ControlImageProfile.prototype;
DockControlImageProfile.IMAGE_MINIMIZE=Resolver.resolve("${skin}/docks/control-minimize-${string}.png");
DockControlImageProfile.IMAGE_MAXIMIZE=Resolver.resolve("${skin}/docks/control-maximize-${string}.png");
DockControlImageProfile.IMAGE_RESTORE=Resolver.resolve("${skin}/docks/control-restore-${string}.png");
DockControlImageProfile.IMAGE_CLOSE=null;
function DockControlImageProfile(_c2b){
this.binding=_c2b;
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
DockTabsButtonBinding.newInstance=function(_c2c){
var _c2d=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_c2c);
_c2d.setAttribute("type","checkbox");
_c2d.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_c2d.className="tabbutton";
return UserInterface.registerBinding(_c2d,DockTabsButtonBinding);
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
var _c2e=DockBinding.superclass.serialize.call(this);
if(_c2e){
_c2e.active=this.isActive?true:null;
_c2e.collapsed=this.isCollapsed?true:null;
}
return _c2e;
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
var _c2f=UserInterface.getBinding(this.bindingElement.parentNode);
var _c30=MatrixBinding.newInstance(this.bindingDocument);
_c30.attachClassName("dockliner");
this.shadowTree.dockLiner=_c30;
_c2f.add(_c30);
_c30.attach();
_c30.manifest();
var type=this.getProperty("type");
this.type=type?type:DockBinding.TYPE_TOOLS;
this.attachClassName(this.type);
if(this.getProperty("active")==true){
this.activate();
}
};
DockBinding.prototype.interceptDisplayChange=function(_c32){
var _c33=this.getSelectedTabPanelBinding();
if(_c33){
_c33.isVisible=_c32;
_c33.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
}
};
DockBinding.prototype.prepareNewView=function(_c34){
var _c35=this._getBindingForDefinition(_c34);
var _c36=DockTabBinding.newInstance(this.bindingDocument);
_c36.setHandle(_c34.handle);
_c36.setLabel(this.type==DockBinding.TYPE_EDITORS?null:_c34.label);
_c36.setImage(_c34.image);
_c36.setToolTip(_c34.toolTip);
_c36.setEntityToken(_c34.entityToken);
_c36.setAssociatedView(_c35);
this.appendTabByBindings(_c36,null);
this._setupPageBindingListeners(_c36);
var _c37=this.getTabPanelBinding(_c36);
_c35.snapToBinding(_c37);
var _c38=this.bindingWindow.bindingMap.views;
_c38.add(_c35);
if(!this.isActive){
this.activate();
}
_c35.attach();
};
DockBinding.prototype.prepareOpenView=function(_c39,_c3a){
this.logger.debug("DockBinding.prototype.prepareOpenView: _setupDirtyStuff required?");
_c3a.setLabel(_c39.label);
_c3a.setImage(_c39.image);
_c3a.setToolTip(_c39.toolTip);
this._setupPageBindingListeners(_c3a);
var _c3b=this.getTabPanelBinding(_c3a);
var _c3c=this._getBindingForDefinition(_c39);
_c3a.setAssociatedView(_c3c);
_c3c.snapToBinding(_c3b);
UserInterface.getBinding(this.bindingDocument.body).add(_c3c);
_c3c.attach();
};
DockBinding.prototype._getBindingForDefinition=function(_c3d){
var _c3e=this.bindingWindow.bindingMap.views;
var view=ViewBinding.newInstance(_c3e.bindingDocument);
view.setDefinition(_c3d);
return view;
};
DockBinding.prototype._setupPageBindingListeners=function(_c40){
var _c41=this.getTabPanelBinding(_c40);
var self=this;
var _c43={handleAction:function(_c44){
var _c45=_c44.target;
switch(_c44.type){
case PageBinding.ACTION_ATTACHED:
TabBoxBinding.currentActiveInstance=self;
break;
case PageBinding.ACTION_INITIALIZED:
_c45.reflex(true);
var view=_c40.getAssociatedView();
if(_c45.bindingWindow==view.getContentWindow()){
_c40.updateDisplay(_c45);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_COMPLETED,view.getHandle());
if(StatusBar.state==StatusBar.BUSY){
StatusBar.clear();
}
}
_c40.onPageInitialize(_c45);
_c44.consume();
break;
case DockTabBinding.ACTION_UPDATE_VISUAL:
_c40.updateDisplay(_c45);
_c44.consume();
break;
case DockTabBinding.ACTION_UPDATE_TOKEN:
_c40.updateEntityToken(_c45);
_c44.consume();
break;
case EditorPageBinding.ACTION_DIRTY:
_c40.setDirty(true);
break;
case EditorPageBinding.ACTION_SAVE:
_c40.onSaveStart();
break;
case ViewBinding.ACTION_ONCLOSE:
self.closeTab(_c40);
_c44.consume();
break;
case ViewBinding.ACTION_ONCLOSE_FORCE:
self.closeTab(_c40,true);
_c44.consume();
break;
case DockPanelBinding.ACTION_FORCE_SELECT:
self.select(_c40);
break;
case Binding.ACTION_FORCE_REFLEX:
_c41.reflex(true);
_c44.consume();
break;
case DockTabBinding.ACTION_FORCE_CLEAN:
case EditorPageBinding.ACTION_CLEAN:
if(_c40.isDirty){
_c40.setDirty(false);
}
break;
case WindowBinding.ACTION_ONLOAD:
alert("HWEJ");
break;
}
}};
new List([DockTabBinding.ACTION_UPDATE_VISUAL,DockTabBinding.ACTION_UPDATE_TOKEN,PageBinding.ACTION_ATTACHED,PageBinding.ACTION_INITIALIZED,EditorPageBinding.ACTION_DIRTY,EditorPageBinding.ACTION_CLEAN,EditorPageBinding.ACTION_SAVE,ViewBinding.ACTION_ONCLOSE,ViewBinding.ACTION_ONCLOSE_FORCE,DockPanelBinding.ACTION_FORCE_SELECT,Binding.ACTION_FORCE_REFLEX,DockTabBinding.ACTION_FORCE_CLEAN,WindowBinding.ACTION_ONLOAD]).each(function(_c47){
_c41.addActionListener(_c47,_c43);
});
};
DockBinding.prototype.summonTabPanelBinding=function(){
return DockPanelBinding.newInstance(this.bindingDocument);
};
DockBinding.prototype.handleAction=function(_c48){
DockBinding.superclass.handleAction.call(this,_c48);
var _c49=_c48.target;
switch(_c48.type){
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_c48.consume();
break;
case TabBoxBinding.ACTION_UPDATED:
if(_c49 instanceof DockBinding){
if(_c49.updateType==TabBoxBinding.UPDATE_DETACH){
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
this._viewBindingList.add(_c49);
if(this.isActive){
_c49.onActivate();
}
break;
case ViewBinding.ACTION_CLOSED:
this._viewBindingList.del(_c49);
break;
}
};
DockBinding.prototype.handleBroadcast=function(_c4a,arg){
DockBinding.superclass.handleBroadcast.call(this,_c4a,arg);
switch(_c4a){
case BroadcastMessages.SYSTEMTREENODEBINDING_FOCUS:
var _c4c=arg;
if(_c4c.perspectiveNode==this.perspectiveNode){
this._selectTabByEntityToken(_c4c.node.getEntityToken());
}
break;
}
};
DockBinding.prototype._selectTabByEntityToken=function(_c4d){
var tabs=this.getTabBindings();
var _c4f=false;
while(tabs.hasNext()&&!_c4f){
var tab=tabs.getNext();
var _c51=tab.getEntityToken();
if(_c51!=null&&_c51==_c4d){
if(!tab.isSelected){
this.select(tab,true);
_c4f=true;
}
}
}
};
DockBinding.prototype.collapse=function(_c52){
this._handleCollapse(true,_c52);
};
DockBinding.prototype.unCollapse=function(_c53){
this._handleCollapse(false,_c53);
};
DockBinding.prototype._handleCollapse=function(_c54,_c55){
var _c56=this.getChildBindingByLocalName("dockpanels");
var _c57=this.getAncestorBindingByLocalName("splitbox");
if(_c54){
_c56.hide();
this.bindingElement.style.height="auto";
this.isFlexible=false;
this.isActivatable=false;
this.setProperty("collapsed",true);
if(_c55&&_c57.hasBothPanelsVisible()){
this.setWidth(200);
}
}else{
_c56.show();
this.isFlexible=true;
this.isActivatable=true;
this.deleteProperty("collapsed");
if(_c55){
this.setWidth(false);
}
}
this.interceptDisplayChange(!_c54);
this.isCollapsed=_c54;
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
DockBinding.prototype.closeTab=function(_c5c,_c5d){
if(_c5c.isDirty&&!_c5d){
var _c5e=Resolver.resolve(_c5c.getLabel());
var self=this;
Dialog.question(StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Title"),StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Text").replace("${resourcename}",_c5e),Dialog.BUTTONS_YES_NO_CANCEL,{handleDialogResponse:function(_c60){
switch(_c60){
case Dialog.RESPONSE_YES:
setTimeout(function(){
self.saveContainedEditor(_c5c);
},0);
break;
case Dialog.RESPONSE_NO:
self.removeTab(_c5c);
break;
}
}});
}else{
this.removeTab(_c5c);
}
};
DockBinding.prototype.closeTabsExcept=function(_c61){
var tabs=this.getTabBindings();
while(tabs.hasNext()){
var tab=tabs.getNext();
if(tab!=_c61){
this.closeTab(tab);
}
}
};
DockBinding.prototype.saveContainedEditor=function(_c64){
var _c65=_c64.getAssociatedView();
_c65.saveContainedEditor();
var self=this;
var _c67={handleBroadcast:function(_c68,arg){
switch(_c68){
case BroadcastMessages.CURRENT_SAVED:
if(arg.handle==_c65.getHandle()){
EventBroadcaster.unsubscribe(BroadcastMessages.CURRENT_SAVED,_c67);
if(arg.isSuccess){
self.removeTab(_c64);
}
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.CURRENT_SAVED,_c67);
};
DockBinding.prototype.appendTabByBindings=function(_c6a,_c6b){
if(this.isEmpty){
this.isEmpty=false;
this.isActivatable=true;
this.setWidth(false);
this.dispatchAction(DockBinding.ACTION_OPENED);
}
DockBinding.superclass.appendTabByBindings.call(this,_c6a,_c6b);
};
DockBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
DockBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
DockBinding.prototype.setWidth=function(_c6c){
_c6c=_c6c?_c6c+"px":"100%";
this.bindingElement.style.width=_c6c;
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
DockBinding.prototype.showControls=function(_c6d){
var tabs=this.getChildBindingByLocalName(this._nodename_tabs);
if(_c6d){
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
var _c70=DockControlBinding.newInstance(this.bindingDocument);
_c70.setControlType(type);
return _c70;
};
DockTabsBinding.prototype.flex=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _c72=self.containingTabBoxBinding.getWidth();
if(!isNaN(_c72)){
_c72=_c72>0?_c72-1:0;
self.bindingElement.style.width=new String(_c72)+"px";
}
}
setTimeout(fix,250);
fix();
}
DockTabsBinding.superclass.flex.call(this);
};
DockTabsBinding.prototype.handleCrawler=function(_c73){
DockTabsBinding.superclass.handleCrawler.call(this,_c73);
switch(_c73.id){
case FlexBoxCrawler.ID:
this._explorerFlexHack();
break;
}
};
DockTabsBinding.prototype._explorerFlexHack=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _c75=self.containingTabBoxBinding.getWidth();
if(!isNaN(_c75)){
_c75=_c75>0?_c75-1:0;
self.bindingElement.style.width=new String(_c75)+"px";
}
}
setTimeout(fix,250);
fix();
}
};
DockTabsBinding.newInstance=function(_c76){
var _c77=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktabs",_c76);
return UserInterface.registerBinding(_c77,DockTabsBinding);
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
DockTabBinding.prototype.setAssociatedView=function(_c78){
this._viewBinding=_c78;
};
DockTabBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
DockTabBinding.prototype.serialize=function(){
var _c79=DockTabBinding.superclass.serialize.call(this);
if(_c79){
_c79.label=null;
_c79.image=null;
_c79.handle=this.getHandle();
}
return _c79;
};
DockTabBinding.prototype.setHandle=function(_c7a){
this.setProperty("handle",_c7a);
};
DockTabBinding.prototype.getHandle=function(){
return this.getProperty("handle");
};
DockTabBinding.prototype.setEntityToken=function(_c7b){
if(this._entityToken==null){
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
this._entityToken=_c7b;
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
var _c7c=DialogControlBinding.newInstance(this.bindingDocument);
_c7c.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_c7c);
this._controlGroupBinding.attachRecursive();
};
DockTabBinding.prototype.setDirty=function(_c7d){
if(this.containingTabBoxBinding.type==DockBinding.TYPE_EDITORS){
if(this.isDirty!=_c7d){
this.isDirty=_c7d;
if(Binding.exists(this.labelBinding)){
var _c7e=this.labelBinding.getLabel();
if(_c7e!=null){
this.labelBinding.setLabel(_c7d?"*"+_c7e:_c7e.slice(1,_c7e.length));
}else{
this.labelBinding.setLabel(_c7d?"*":"");
}
}
}
var _c7f=top.app.bindingMap.broadcasterCurrentTabDirty;
if(this.isDirty==true){
this.subscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_DIRTY,this);
_c7f.enable();
}else{
this.unsubscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_CLEAN,this);
_c7f.disable();
}
}else{
Dialog.warning("Dirty denied","Only editor docks should invoke the dirty state!");
}
};
DockTabBinding.prototype.updateDisplay=function(_c80){
this.setLabel(_c80.getLabel());
this.setImage(_c80.getImage());
this.setToolTip(_c80.getToolTip());
};
DockTabBinding.prototype.updateEntityToken=function(_c81){
this.setEntityToken(_c81.getEntityToken());
};
DockTabBinding.prototype.handleAction=function(_c82){
DockTabBinding.superclass.handleAction.call(this,_c82);
var _c83=_c82.target;
switch(_c82.type){
case ControlBinding.ACTION_COMMAND:
if(_c83.controlType==ControlBinding.TYPE_CLOSE){
this.close();
}
break;
case MenuItemBinding.ACTION_COMMAND:
if(_c82.listener==this.contextMenuBinding){
this._handleContextMenuItemBinding(_c83);
}
break;
}
};
DockTabBinding.prototype._handleContextMenuItemBinding=function(_c84){
var cmd=_c84.getProperty("cmd");
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
DockTabBinding.prototype.setLabel=function(_c86){
if(!_c86){
if(!this.getLabel()){
_c86=DockTabBinding.LABEL_TABLOADING;
}else{
if(this.getLabel()==DockTabBinding.LABEL_TABLOADING){
_c86=DockTabBinding.LABEL_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setLabel.call(this,_c86);
};
DockTabBinding.prototype.setImage=function(_c87){
if(!_c87){
if(!this.getImage()){
_c87=DockTabBinding.IMG_TABLOADING;
}else{
if(this.getImage()==DockTabBinding.IMG_TABLOADING){
_c87=DockTabBinding.IMG_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setImage.call(this,_c87);
};
DockTabBinding.prototype._viewSource=function(cmd){
var def=ViewDefinitions["Composite.Management.SourceCodeViewer"];
def.argument={action:cmd,doc:this._viewBinding.windowBinding.getContentDocument()};
var _c8a=Resolver.resolve(this.getLabel());
switch(cmd){
case DockTabPopupBinding.CMD_VIEWSOURCE:
def.label="Source: "+_c8a;
break;
case DockTabPopupBinding.CMD_VIEWGENERATED:
def.label="Generated: "+_c8a;
break;
case DockTabPopupBinding.CMD_VIEWSERIALIZED:
def.label="Serialized: "+_c8a;
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
var _c8c=this.bindingElement;
setTimeout(function(){
_c8c.style.bottom="auto";
},25);
}
};
DockTabBinding.prototype.handleBroadcast=function(_c8d,arg){
DockTabBinding.superclass.handleBroadcast.call(this,_c8d,arg);
var body=this._viewBinding.getContentDocument().body;
var root=UserInterface.getBinding(body);
switch(_c8d){
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
DockTabBinding.prototype.select=function(_c92){
DockTabBinding.superclass.select.call(this,_c92);
this._updateBroadcasters();
if(_c92!=true){
this._updateTree();
}
this._updateGlobalEntityToken();
};
DockTabBinding.prototype.close=function(){
this.containingTabBoxBinding.closeTab(this);
};
DockTabBinding.prototype._updateBroadcasters=function(){
if(this.isSelected){
var _c93=top.app.bindingMap.broadcasterCurrentTabDirty;
var _c94=top.app.bindingMap.broadcasterCurrentIsEditor;
if(this._isEditorDockTab()){
_c94.enable();
if(this.isDirty){
_c93.enable();
}else{
_c93.disable();
}
}else{
_c94.disable();
_c93.disable();
}
}
};
DockTabBinding.prototype._updateTree=function(_c95){
if(this._canUpdateTree||_c95){
EventBroadcaster.broadcast(BroadcastMessages.DOCKTABBINDING_SELECT,this);
}
};
DockTabBinding.prototype._isEditorDockTab=function(){
var _c96=false;
if(this._viewBinding!=null){
var win=this._viewBinding.getContentWindow();
if(win!=null&&win.bindingMap!=null){
var _c98=win.bindingMap.savebutton;
if(_c98!=null){
_c96=true;
}
}
}
return _c96;
};
DockTabBinding.prototype._updateGlobalEntityToken=function(){
StageBinding.entityToken=this._entityToken;
};
DockTabBinding.newInstance=function(_c99){
var _c9a=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktab",_c99);
return UserInterface.registerBinding(_c9a,DockTabBinding);
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
DockPanelsBinding.newInstance=function(_c9b){
var _c9c=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanels",_c9b);
return UserInterface.registerBinding(_c9c,DockPanelsBinding);
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
DockPanelBinding.prototype.select=function(_c9d){
DockPanelBinding.superclass.select.call(this,_c9d);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.unselect=function(){
DockPanelBinding.superclass.unselect.call(this);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.flex=function(){
this.dispatchAction(Binding.ACTION_DIMENSIONCHANGED);
};
DockPanelBinding.prototype.handleCrawler=function(_c9e){
DockPanelBinding.superclass.handleCrawler.call(this,_c9e);
if(_c9e.response==null){
if(_c9e.type==NodeCrawler.TYPE_DESCENDING){
if(this.viewBinding!=null){
if(_c9e.id==FocusCrawler.ID){
_c9e.nextNode=this.viewBinding.bindingElement;
}
}
}
}
};
DockPanelBinding.newInstance=function(_c9f){
var _ca0=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanel",_c9f);
return UserInterface.registerBinding(_ca0,DockPanelBinding);
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
DockControlBinding.newInstance=function(_ca1){
var _ca2=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_ca1);
return UserInterface.registerBinding(_ca2,DockControlBinding);
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
ViewBinding.getInstance=function(_ca3){
var _ca4=ViewBinding._instances.get(_ca3);
if(!_ca4){
var cry="ViewBinding.getInstance: No such instance: "+_ca3;
SystemLogger.getLogger("ViewBinding [static]").error(cry);
SystemDebug.stack(arguments);
if(Application.isDeveloperMode){
alert(cry);
}
}
return _ca4;
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
var _ca7=!System.hasActivePerspectives&&Client.isExplorer;
if(this.isFreeFloating==true&&!_ca7){
if(snap.isVisible==true){
if(snap.isAttached==true){
var _ca8=snap.boxObject.getGlobalPosition();
var _ca9=snap.boxObject.getDimension();
if(!Point.isEqual(_ca8,this._lastknownposition)){
this.setPosition(_ca8);
this._lastknownposition=_ca8;
}
if(!Dimension.isEqual(_ca9,this._lastknowndimension)){
this.setDimension(_ca9);
this._lastknowndimension=_ca9;
var _caa=_ca9.h-ViewBinding.VERTICAL_ADJUST;
_caa=_caa<0?0:_caa;
this.windowBinding.getBindingElement().style.height=new String(_caa)+"px";
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
var _cab=this._viewDefinition.flowHandle;
if(_cab!=null){
FlowControllerService.CancelFlow(_cab);
}
}
if(this._viewDefinition!=null){
var _cac=this._viewDefinition.handle;
EventBroadcaster.broadcast(BroadcastMessages.VIEW_CLOSED,_cac);
this.logger.fine("ViewBinding closed: \""+_cac+"\"");
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
var _cae=null;
if(this._viewDefinition!=null){
_cae=this._viewDefinition.handle;
}
return _cae;
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
ViewBinding.prototype.setDefinition=function(_caf){
this._viewDefinition=_caf;
if(_caf.flowHandle!=null){
this.subscribe(BroadcastMessages.CLOSE_VIEWS);
}
};
ViewBinding.prototype.getDefinition=function(){
return this._viewDefinition;
};
ViewBinding.prototype.handleAction=function(_cb0){
ViewBinding.superclass.handleAction.call(this,_cb0);
var _cb1=_cb0.target;
switch(_cb0.type){
case RootBinding.ACTION_PHASE_1:
case RootBinding.ACTION_PHASE_2:
case RootBinding.ACTION_PHASE_3:
if(_cb0.type==RootBinding.ACTION_PHASE_1){
if(this.isActivated&&!_cb1.isActivated){
_cb1.onActivate();
}
}
_cb0.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
if(this.isFreeFloating==true){
if(_cb1==this._snapBinding){
if(this.isVisible==true){
this.updatePositionDimension();
_cb0.consume();
}
}
}
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(this.isFreeFloating==true){
if(_cb1==this._snapBinding){
if(_cb1.isVisible==true){
this.show();
}else{
this.hide();
}
}
}
break;
case WindowBinding.ACTION_LOADED:
case WindowBinding.ACTION_ONLOAD:
if(_cb1.getContentWindow().isPostBackDocument){
if(_cb0.type==WindowBinding.ACTION_ONLOAD){
var arg=this._viewDefinition.argument;
if(arg!=null&&arg.list!=null&&arg.url!=null){
_cb1.post(arg.list,arg.url);
arg.list=null;
arg.url=null;
}
}
}else{
if(Client.isExplorer==true){
if(_cb1==this.windowBinding){
var self=this;
DOMEvents.addEventListener(_cb1.getContentWindow(),DOMEvents.UNLOAD,{handleEvent:function(e){
if(Binding.exists(self._coverBinding)==true){
self._coverBinding.show();
}
}});
}
if(_cb0.type==WindowBinding.ACTION_ONLOAD){
if(this._coverBinding){
this._coverBinding.hide();
}
}
}
}
if(_cb0.type==WindowBinding.ACTION_ONLOAD){
var win=_cb1.getContentWindow();
if(win.WindowManager==null){
if(!this._isLoaded){
this._onLoadingCompleted(_cb1);
}
}
}
_cb0.consume();
break;
case PageBinding.ACTION_ATTACHED:
if(!_cb1.label&&this._viewDefinition.label){
_cb1.label=this._viewDefinition.label;
}
if(!_cb1.image&&this._viewDefinition.image){
_cb1.image=this._viewDefinition.image;
}
if(_cb1.bindingWindow==this.getContentWindow()){
this._pageBinding=_cb1;
this._injectPageArgument();
}
case PageBinding.ACTION_INITIALIZED:
if(_cb1.bindingWindow==this.getContentWindow()){
if(Client.isExplorer&&this._coverBinding){
this._coverBinding.hide();
}
if(!this._isLoaded){
this._onLoadingCompleted();
}
}
break;
case Binding.ACTION_DISPOSED:
if(this.isFreeFloating&&_cb1==this._snapBinding){
this.removeActionListener(Binding.ACTION_DISPOSED);
this.dispose();
_cb0.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
case WizardPageBinding.ACTION_FINISH:
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
_cb0.consume();
break;
case ViewBinding.ACTION_DETACH:
this.setDefinition(ViewDefinitions["Composite.Management.Null"]);
ViewBinding._instances.set(this._viewDefinition.handle,this);
break;
}
};
ViewBinding.prototype.handleBroadcast=function(_cb6,arg){
ViewBinding.superclass.handleBroadcast.call(this,_cb6,arg);
switch(_cb6){
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
var _cba=def.argument;
if(_cba!=null){
page.setPageArgument(_cba);
}
var _cbb=def.width;
if(_cbb!=null){
page.width=_cbb;
}
var _cbc=def.height;
if(_cbc!=null){
page.height=_cbc;
}
}
};
ViewBinding.prototype.handleCrawler=function(_cbd){
ViewBinding.superclass.handleCrawler.call(this,_cbd);
switch(_cbd.type){
case NodeCrawler.TYPE_DESCENDING:
if(this.isFreeFloating==true){
if(_cbd.id==FocusCrawler.ID){
if(_cbd.previousNode!=this._snapBinding.bindingElement){
_cbd.response=NodeCrawler.SKIP_NODE;
}
}
}
break;
case NodeCrawler.TYPE_ASCENDING:
if(this.isFreeFloating==true){
_cbd.nextNode=this._snapBinding.bindingElement;
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
ViewBinding.prototype.setPosition=function(_cbe){
_cbe.x+=ViewBinding.HORIZONTAL_ADJUST;
this.bindingElement.style.left=_cbe.x+"px";
this.bindingElement.style.top=_cbe.y+"px";
};
ViewBinding.prototype.setDimension=function(_cbf){
_cbf.h-=ViewBinding.VERTICAL_ADJUST;
_cbf.w-=ViewBinding.HORIZONTAL_ADJUST;
_cbf.w-=1;
if(_cbf.h<0){
_cbf.h=0;
}
if(_cbf.w<0){
_cbf.w=0;
}
this.bindingElement.style.width=String(_cbf.w)+"px";
this.bindingElement.style.height=String(_cbf.h)+"px";
};
ViewBinding.prototype.snapToBinding=function(_cc0){
this.isFlexBoxBehavior=false;
_cc0.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_cc0.addActionListener(Binding.ACTION_POSITIONCHANGED,this);
_cc0.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_cc0.addActionListener(Binding.ACTION_DISPOSED,this);
if(this._snapBinding){
this._snapBinding.removeActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_POSITIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_DISPOSED,this);
this._snapBinding.viewBinding=null;
}
this._snapBinding=_cc0;
this._snapBinding.viewBinding=this;
this.isFreeFloating=true;
if(!this._isViewBindingInitialized){
this.initialize();
}
};
ViewBinding.prototype.getMigrationParent=function(){
var _cc1=null;
if(this.isFreeFloating==true){
_cc1=this._snapBinding.getBindingElement();
}else{
_cc1=ViewBinding.superclass.getMigrationParent.call(this);
}
return _cc1;
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
ViewBinding.prototype.reload=function(_cc2){
this._isLoaded=false;
this.windowBinding.reload(_cc2);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
};
ViewBinding.prototype.saveContainedEditor=function(){
var _cc3=false;
var page=this._pageBinding;
if(page!=null&&page instanceof EditorPageBinding){
if(page.canSave()){
page.doSave();
_cc3=true;
}
}
if(!_cc3){
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
ViewBinding.newInstance=function(_cc7){
var _cc8=DOMUtil.createElementNS(Constants.NS_UI,"ui:view",_cc7);
var _cc9=UserInterface.registerBinding(_cc8,ViewBinding);
_cc9.windowBinding=_cc9.add(WindowBinding.newInstance(_cc7));
_cc9.windowBinding.isFlexible=false;
return _cc9;
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
var _cd1=this.bindingWindow.__doPostBack;
var _cd2=false;
if(!form.__isSetup){
DOMEvents.addEventListener(this.bindingWindow,DOMEvents.UNLOAD,{handleEvent:function(){
if(_cd2){
Application.unlock(self);
}
}});
}
this.bindingWindow.__doPostBack=function(_cd3,_cd4){
if(!form.__isSetup){
Application.lock(self);
_cd2=true;
}
self.manifestAllDataBindings();
_cd1(_cd3,_cd4);
if(Application.isDeveloperMode){
self._debugDotNetPostback();
}
};
};
PageBinding.prototype.postMessage=function(_cd5,list){
var _cd7=this.bindingWindow.bindingMap.__REQUEST;
if(_cd7!=null&&this._isDotNet()){
switch(_cd5){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_PERSIST:
if(this.bindingWindow.DataManager.isDirty){
if(this.validateAllDataBindings()){
if(list!=null){
list.add(this);
}
_cd7.postback(_cd5);
}
}
break;
default:
_cd7.postback(_cd5);
break;
}
}
if(list!=null){
this._postMessageToDescendants(_cd5,list);
}
};
PageBinding.prototype._postMessageToDescendants=function(_cd8,list){
var _cda=this.getDescendantBindingsByType(WindowBinding);
_cda.each(function(win){
var page=win.getPageBinding();
if(page!=null){
page.postMessage(_cd8,list);
}
});
};
PageBinding.prototype._debugDotNetPostback=function(){
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_cde){
list.add({name:_cde.name,value:_cde.value});
});
var out="";
list.each(function(_ce0){
out+=_ce0.name+": "+_ce0.value+"\n";
});
this.logger.debug(out);
};
PageBinding.prototype.handleAction=function(_ce1){
PageBinding.superclass.handleAction.call(this,_ce1);
var _ce2=_ce1.target;
switch(_ce1.type){
case RootBinding.ACTION_PHASE_3:
if(_ce2==UserInterface.getBinding(this.bindingDocument.body)){
_ce2.removeActionListener(RootBinding.ACTION_PHASE_3,this);
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
this.doPostBack(_ce2);
}
_ce1.consume();
break;
case PageBinding.ACTION_DOVALIDATEDPOSTBACK:
if(this._isDotNet()){
var _ce3=this.validateAllDataBindings();
if(_ce3){
this.doPostBack(_ce2);
}
}
_ce1.consume();
break;
case BalloonBinding.ACTION_INITIALIZE:
_ce1.consume();
break;
case PageBinding.ACTION_BLOCK_INIT:
if(this._initBlockers==null){
this._initBlockers=new Map();
}
this._initBlockers.set(_ce2.key,true);
break;
case PageBinding.ACTION_UNBLOCK_INIT:
if(this._initBlockers!=null){
if(this._initBlockers.has(_ce2.key)){
this._initBlockers.del(_ce2.key);
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
var _ce5={handleAction:function(_ce6){
if(_ce6.target==self){
self.removeActionListener(PageBinding.ACTION_UPDATED,_ce5);
MessageQueue.udpdate();
}
}};
this.addActionListener(PageBinding.ACTION_UPDATED,_ce5);
}else{
MessageQueue.udpdate();
}
_ce1.consume();
break;
}
};
PageBinding.prototype.handleBroadcast=function(_ce7,arg){
PageBinding.superclass.handleBroadcast.call(this,_ce7,arg);
switch(_ce7){
case BroadcastMessages.MESSAGEQUEUE_REQUESTED:
var _ce9=arg;
if(!this._canPostBack&&!_ce9){
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
PageBinding.prototype.doPostBack=function(_ceb){
if(this._canPostBack){
if(_ceb!=null&&this._isDotNet()){
var _cec=_ceb.getCallBackID();
var _ced=_ceb.getCallBackArg();
if(_cec!=null){
_cec=_cec.replace(/_/g,"$");
}else{
_cec="";
}
if(_ced==null){
_ced="";
}
this.bindingWindow.__doPostBack(_cec,_ced);
}
}
};
PageBinding.prototype.validateAllDataBindings=function(){
var _cee=true;
var _cef=this.bindingWindow.DataManager.getAllDataBindings();
while(_cef.hasNext()&&_cee){
var _cf0=_cef.getNext();
if(_cf0.isAttached){
var _cf1=_cf0.validate();
if(_cee&&!_cf1){
_cee=false;
this.logger.debug("Invalid DataBinding: "+_cf0.toString()+" ("+_cf0.getName()+")");
break;
}
}
}
return _cee;
};
PageBinding.prototype.manifestAllDataBindings=function(){
var list=new List();
var _cf3=this.bindingWindow.DataManager.getAllDataBindings();
while(_cf3.hasNext()){
var _cf4=_cf3.getNext();
if(_cf4.isAttached){
var _cf5=_cf4.manifest();
if(_cf5!=null){
list.add(_cf5);
}
}
}
return list;
};
PageBinding.prototype.cleanAllDataBindings=function(){
var _cf6=this.bindingWindow.DataManager.getAllDataBindings();
while(_cf6.hasNext()){
var _cf7=_cf6.getNext();
if(_cf7.isAttached){
_cf7.clean();
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
var _cf9=this._cachedFocus.getBinding();
if(_cf9){
_cf9.blur();
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
var _cfa=this.getProperty("width");
if(!_cfa){
_cfa=this.hasClassName(DialogPageBinding.CLASSNAME_TABBOXED)?DialogPageBinding.DEFAULT_TABBOXED_WIDTH:DialogPageBinding.DEFAULT_WIDTH;
}
this.width=_cfa;
}
if(this.height==null){
var _cfb=this.getProperty("height");
this.height=_cfb?_cfb:DialogPageBinding.DEFAULT_HEIGHT;
}
if(this.minheight==null){
var _cfc=this.getProperty("minheight");
if(_cfc!=null){
this.minheight=_cfc;
}
}
if(this.controls==null){
var _cfd=this.getProperty("controls");
this.controls=_cfd?_cfd:DialogPageBinding.DEFAULT_CONTROLS;
}
if(!this.isResizable){
var _cfe=this.getProperty("resizable");
this.isResizable=_cfe?_cfe:DialogPageBinding.DEFAULT_RESIZABLE;
}
if(this.height=="auto"){
this.enableAutoHeightLayoutMode(true);
}
};
DialogPageBinding.prototype.enableAutoHeightLayoutMode=function(_cff){
if(_cff!=this.isAutoHeightLayoutMode){
if(_cff){
this.attachClassName("auto");
}else{
this.detachClassName("auto");
}
this.isAutoHeightLayoutMode=_cff;
}
};
DialogPageBinding.prototype.handleAction=function(_d00){
DialogPageBinding.superclass.handleAction.call(this,_d00);
var _d01=_d00.target;
switch(_d00.type){
case PageBinding.ACTION_ATTACHED:
if(_d01!=this&&_d01.isFitAsDialogSubPage){
_d01.makeDialogSubPage();
}
break;
case ButtonBinding.ACTION_COMMAND:
_d00.consume();
if(_d01.response!=null){
this.response=_d01.response;
switch(_d01.response){
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
DialogPageBinding.prototype._disableAcceptButton=function(_d02){
var _d03=this.bindingWindow.bindingMap.buttonAccept;
if(_d03!=null){
_d03.setDisabled(_d02);
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
DialogPageBodyBinding.prototype._setFitnessHeight=function(_d04){
var _d05=CSSComputer.getPadding(this.bindingElement);
var _d06=CSSComputer.getBorder(this.bindingElement);
_d04+=_d05.top+_d05.bottom;
_d04+=_d06.top+_d06.bottom;
if(_d04>this.bindingElement.offsetHeight){
this.bindingElement.style.height=_d04+"px";
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
EditorPageBinding.prototype.handleAction=function(_d0e){
EditorPageBinding.superclass.handleAction.call(this,_d0e);
var _d0f=_d0e.target;
switch(_d0e.type){
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
var _d10=-1;
this._messengers.each(function(page){
var res=page.bindingWindow==_d0f.bindingWindow;
if(res){
page.bindingWindow.DataManager.isDirty=false;
if(_d10==-1){
_d10=0;
}
}else{
_d10++;
}
return res;
});
if(_d10>-1){
this._messengers.del(_d10);
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
_d0e.consume();
break;
case Binding.ACTION_INVALID:
this.enableSave(false);
this._invalidBindings.set(_d0f.key,_d0f);
if(_d0f instanceof FieldsBinding){
this._updateStatusBar();
}
break;
case Binding.ACTION_VALID:
this._invalidBindings.del(_d0f.key);
if(_d0f instanceof FieldsBinding){
this._updateStatusBar();
}
if(!this._invalidBindings.hasEntries()){
this.enableSave(true);
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_d0f==this._tabBoxBinding){
if(this._windowBinding!=null){
var tab=_d0f.getSelectedTabBinding();
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
_d0e.consume();
break;
case TabBoxBinding.ACTION_UNSELECTED:
if(_d0f==this._tabBoxBinding){
this.postMessage(EditorPageBinding.MESSAGE_PERSIST);
}
_d0e.consume();
break;
case WindowBinding.ACTION_LOADED:
if(_d0f==this._windowBinding){
if(this._isGeneratingPreview==true){
this._generatePreview();
this._isGeneratingPreview=false;
}
_d0e.consume();
}
break;
case WindowBinding.ACTION_ONLOAD:
if(_d0f==this._windowBinding){
if(_d0f.getContentWindow().isPostBackDocument!=true){
if(Client.isPrism){
Prism.enableCache();
}
var self=this;
setTimeout(function(){
Application.unlock(self);
},100);
if(EventBroadcaster.hasSubscribers(BroadcastMessages.XHTML_MARKUP_ON)){
var _d15=WindowBinding.getMarkup(this._windowBinding);
if(_d15!=null){
EventBroadcaster.broadcast(BroadcastMessages.XHTML_MARKUP_ON,_d15);
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
var _d16=this.bindingWindow.bindingMap.savebutton;
if(_d16!=null&&!_d16.isDisabled){
_d16.fireCommand();
}
};
EditorPageBinding.prototype._saveEditorPage=function(){
if(Application.isDeveloperMode){
}
if(this.validateAllDataBindings()){
this.bindingWindow.DataManager.isDirty=false;
var _d17=this.bindingWindow.bindingMap.__REQUEST;
if(_d17!=null){
_d17.postback(EditorPageBinding.MESSAGE_SAVE);
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
EditorPageBinding.prototype.postMessage=function(_d18){
this._message=null;
switch(_d18){
case EditorPageBinding.MESSAGE_SAVE:
this._postMessageToDescendants(_d18,this._messengers);
if(!this._messengers.hasEntries()){
this._saveEditorPage();
}else{
this._message=_d18;
}
break;
case EditorPageBinding.MESSAGE_PERSIST:
this._message=_d18;
EditorPageBinding.superclass.postMessage.call(this,_d18,this._messengers);
break;
case EditorPageBinding.MESSAGE_REFRESH:
EditorPageBinding.superclass.postMessage.call(this,_d18,this._messengers);
break;
}
};
EditorPageBinding.prototype.handleBroadcast=function(_d19,arg){
EditorPageBinding.superclass.handleBroadcast.call(this,_d19,arg);
switch(_d19){
case BroadcastMessages.HIGHLIGHT_KEYWORDS:
var _d1b=arg;
if(UserInterface.isBindingVisible(this._windowBinding)){
WindowBinding.highlightKeywords(this._windowBinding,_d1b);
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
var _d1c=new List();
this._invalidBindings.each(function(key,_d1e){
var list=_d1e.getInvalidLabels();
if(list){
list.each(function(_d20){
_d1c.add(_d20);
});
}
});
if(_d1c.hasEntries()){
var _d21="";
while(_d1c.hasNext()){
_d21+=_d1c.getNext().toLowerCase();
if(_d1c.hasNext()){
_d21+=", ";
}else{
_d21+=".";
}
}
var _d22=StringBundle.getString("ui","Website.App.StatusBar.ErrorInField");
StatusBar.error(_d22+" "+_d21);
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
EditorPageBinding.prototype.enableSave=function(_d23){
var _d24=this.bindingDocument.getElementById("broadcasterCanSave");
if(_d24){
var _d25=UserInterface.getBinding(_d24);
if(_d23){
_d25.enable();
}else{
_d25.disable();
}
}else{
throw new Error("A required BroadcasterBinding could not be located.");
}
};
EditorPageBinding.prototype.enableSaveAs=function(){
var _d26=this.bindingDocument.getElementById(EditorPageBinding.ID_SAVEASBUTTON);
if(_d26!=null){
UserInterface.getBinding(_d26).enable();
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
var _d27=this._windowBinding.getContentDocument().title;
if(_d27==WindowBinding.POSTBACK_TITLE){
if(this.validateAllDataBindings()){
this.manifestAllDataBindings();
var _d28=this._tabBinding.getCallBackID();
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d2a){
if(_d2a.name=="__EVENTTARGET"&&_d28){
_d2a.value=_d28;
}
list.add({name:_d2a.name,value:_d2a.value});
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
WizardPageBinding.prototype.handleAction=function(_d2c){
WizardPageBinding.superclass.handleAction.call(this,_d2c);
var _d2d=_d2c.target;
switch(_d2c.type){
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_FINISH:
if(this.validateAllDataBindings()==true){
this.doPostBack(_d2d);
}else{
_d2c.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
this.doPostBack(_d2d);
break;
case Binding.ACTION_INVALID:
this._enableNextAndFinish(false);
_d2c.consume();
break;
case Binding.ACTION_VALID:
this._enableNextAndFinish(true);
_d2c.consume();
break;
}
};
WizardPageBinding.prototype._enableNextAndFinish=function(_d2e){
var next=this.bindingWindow.bindingMap.nextbutton;
var _d30=this.bindingWindow.bindingMap.finishbutton;
if(next){
next.setDisabled(!_d2e);
}
if(_d30){
_d30.setDisabled(!_d2e);
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
MarkupAwarePageBinding.prototype.handleBroadcast=function(_d31,arg){
MarkupAwarePageBinding.superclass.handleBroadcast.call(this,_d31,arg);
var self=this;
switch(_d31){
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
MarkupAwarePageBinding.prototype._handleMarkup=function(_d35){
};
MarkupAwarePageBinding.prototype._activate=function(_d36){
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
var _d37=this.bindingWindow.bindingMap.moreactionstoolbargroup;
this._moreActionsWidth=_d37.boxObject.getDimension().w;
_d37.hide();
var _d38=this.boxObject.getDimension().h;
this.bindingElement.style.height=_d38+"px";
var self=this;
var _d3a=this.bindingWindow.bindingMap.moreactionsbutton;
_d3a.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_d3b){
self._showMoreActions();
_d3b.consume();
}});
var _d3c=this.bindingWindow.bindingMap.moreactionspopup;
_d3c.addActionListener(MenuItemBinding.ACTION_COMMAND,{handleAction:function(_d3d){
var item=_d3d.target;
self._handleSystemAction(item.associatedSystemAction);
}});
SystemToolBarBinding.superclass.onBindingInitialize.call(this);
};
SystemToolBarBinding.prototype.handleBroadcast=function(_d3f,arg){
SystemToolBarBinding.superclass.handleBroadcast.call(this,_d3f,arg);
switch(_d3f){
case BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED:
var self=this;
if(arg!=null){
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
var _d43=self.bindingWindow.bindingMap.moreactionstoolbargroup;
if(_d43!=null){
_d43.hide();
}
},0);
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
var _d44=this.bindingWindow.WindowManager;
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
var _d45=new String("");
this._actionProfile.each(function(_d46,list){
list.each(function(_d48){
_d45+=_d48.getHandle()+";";
});
});
return _d45;
};
SystemToolBarBinding.prototype.handleAction=function(_d49){
SystemToolBarBinding.superclass.handleAction.call(this,_d49);
switch(_d49.type){
case ButtonBinding.ACTION_COMMAND:
var _d4a=_d49.target;
this._handleSystemAction(_d4a.associatedSystemAction);
break;
}
};
SystemToolBarBinding.prototype._handleSystemAction=function(_d4b){
if(_d4b!=null){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _d4d=list.getFirst();
var _d4e=_d4d.node;
}
SystemAction.invoke(_d4b,_d4e);
}
};
SystemToolBarBinding.prototype.buildLeft=function(){
if(this.isInitialized&&this._actionProfile!=null&&this._actionProfile.hasEntries()){
var doc=this.bindingDocument;
var self=this;
this._actionProfile.each(function(_d51,list){
var _d53=new List();
list.reset();
while(list.hasNext()){
var _d54=list.getNext();
var _d55=null;
if(_d54.isInToolBar()){
if(_d54.isInFolder()){
alert("IsInFolder not implemented!");
}else{
_d55=self.getToolBarButtonBinding(_d54);
}
}
if(_d55!=null){
_d53.add(_d55);
}
}
if(_d53.hasEntries()){
var _d56=ToolBarGroupBinding.newInstance(doc);
_d53.each(function(_d57){
_d56.add(_d57);
});
self.addLeft(_d56);
}
});
this.attachRecursive();
this._containAllButtons();
}
};
SystemToolBarBinding.prototype._containAllButtons=function(){
var _d58=this.bindingWindow.bindingMap.toolsbutton;
var _d59=this.bindingWindow.bindingMap.moreactionstoolbargroup;
var _d5a=_d58.bindingElement.offsetLeft-this._moreActionsWidth;
var _d5b=0;
var _d5c=new List();
var _d5d,_d5e=this._toolBarBodyLeft.getDescendantBindingsByLocalName("toolbarbutton");
while((_d5d=_d5e.getNext())!=null){
if(!_d5d.isVisible){
_d5d.show();
}
_d5b+=_d5d.boxObject.getDimension().w;
if(_d5b>=_d5a){
_d5c.add(_d5d);
_d5d.hide();
}
}
if(_d5c.hasEntries()){
var _d5f=_d5c.getFirst().bindingElement.parentNode;
UserInterface.getBinding(_d5f).setLayout(ToolBarGroupBinding.LAYOUT_LAST);
this._moreActions=new List();
while((_d5d=_d5c.getNext())!=null){
this._moreActions.add(_d5d.associatedSystemAction);
}
_d59.show();
}else{
this._moreActions=null;
_d59.hide();
}
};
SystemToolBarBinding.prototype._showMoreActions=function(){
if(this._moreActions!=null){
var _d60=this.bindingWindow.bindingMap.moreactionspopup;
_d60.empty();
while((action=this._moreActions.getNext())!=null){
var item=MenuItemBinding.newInstance(_d60.bindingDocument);
item.setLabel(action.getLabel());
item.setToolTip(action.getToolTip());
item.imageProfile=new ImageProfile({image:action.getImage(),imageDisabled:action.getDisabledImage()});
if(action.isDisabled()){
item.disable();
}
item.associatedSystemAction=action;
_d60.add(item);
}
_d60.attachRecursive();
this._moreActions=null;
}
};
SystemToolBarBinding.prototype.getToolBarButtonBinding=function(_d62){
var _d63=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _d64=_d62.getLabel();
var _d65=_d62.getToolTip();
var _d66=_d62.getImage();
var _d67=_d62.isDisabled();
if(_d66&&_d66.indexOf("size=")==-1){
_d66=_d66+"&size="+this.getImageSize();
_d63.imageProfile=new ImageProfile({image:_d66});
}
if(_d64){
_d63.setLabel(_d64);
}
if(_d65){
_d63.setToolTip(_d65);
}
if(_d62.isDisabled()){
_d63.disable();
}
_d63.associatedSystemAction=_d62;
return _d63;
};
SystemToolBarBinding.prototype._invokeDefaultAction=function(){
var _d68=this.getDescendantBindingByLocalName("toolbarbutton");
if(_d68!=null){
_d68.fireCommand();
}
};
SystemToolBarBinding.newInstance=function(_d69){
var _d6a=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_d69);
return UserInterface.registerBinding(_d6a,SystemToolBarBinding);
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
if(this.getProperty("locktoeditor")!=null){
this.isLockedToEditor=this.getProperty("locktoeditor");
}
};
SystemTreeBinding.prototype.add=function(_d6b){
var _d6c=SystemTreeBinding.superclass.add.call(this,_d6b);
if(!this._defaultTreeNode){
if(_d6b instanceof SystemTreeNodeBinding){
this._defaultTreeNode=_d6b;
}
}
return _d6c;
};
SystemTreeBinding.prototype.handleAction=function(_d6d){
SystemTreeBinding.superclass.handleAction.call(this,_d6d);
var _d6e=_d6d.target;
switch(_d6d.type){
case TreeNodeBinding.ACTION_ONFOCUS:
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
this._restorableFocusHandle=null;
this._handleSystemTreeFocus();
break;
case SystemTreeNodeBinding.ACTION_REFRESHED_YEAH:
this._updateRefreshingTrees(_d6e.key);
_d6d.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
case TreeNodeBinding.ACTION_BLUR:
var self=this;
setTimeout(function(){
if(!self._focusedTreeNodeBindings.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,null);
}
},0);
if(_d6d.type==TreeNodeBinding.ACTION_BLUR){
this._restorableFocusHandle=_d6e.getHandle();
}
break;
case TreeNodeBinding.ACTION_COMMAND:
EventBroadcaster.broadcast(BroadcastMessages.INVOKE_DEFAULT_ACTION);
_d6d.consume();
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
var _d70=this._treeNodeBindings.get(this._restorableFocusHandle);
this.focusSingleTreeNodeBinding(_d70);
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
SystemTreeBinding.prototype.registerTreeNodeBinding=function(_d71){
SystemTreeBinding.superclass.registerTreeNodeBinding.call(this,_d71);
var reg=this._entityTokenRegistry;
var _d73=_d71.node.getEntityToken();
if(reg.has(_d73)){
reg.get(_d73).add(_d71);
}else{
reg.set(_d73,new List([_d71]));
}
var _d74=null;
if(this.isLockedToEditor){
if(_d73==StageBinding.entityToken){
if(_d71.node.isTreeLockEnabled()){
_d74=_d71;
}
}
}else{
if(this._backupfocushandle!=null){
if(this._backupfocushandle==_d71.node.getHandle()){
_d74=_d71;
}
}
}
if(_d74!=null){
this.focusSingleTreeNodeBinding(_d74);
}
};
SystemTreeBinding.prototype.unRegisterTreeNodeBinding=function(_d75){
SystemTreeBinding.superclass.unRegisterTreeNodeBinding.call(this,_d75);
var reg=this._entityTokenRegistry;
var _d77=_d75.node.getEntityToken();
if(reg.has(_d77)){
var list=reg.get(_d77);
list.del(_d75);
if(!list.hasEntries()){
reg.del(_d77);
}
}else{
this.logger.fatal("SystemTreeBinding out of synch: unRegisterTreeNodeBinding");
if(Application.isDeveloperMode){
Dialog.error("Attention Developer","Tree is out of synch. Please reproduce this bug and file a report.");
}
}
if(_d75.isRefreshing){
this._updateRefreshingTrees(binding.key);
}
if(!this.isLockedToEditor){
if(_d75.isFocused&&this._backupfocushandle==null){
this._backupfocushandle=_d75.node.getHandle();
var self=this;
setTimeout(function(){
self._backupfocushandle=null;
},200);
}
}
};
SystemTreeBinding.prototype._updateRefreshingTrees=function(key){
var _d7b=this._refreshingTreeNodes;
if(_d7b.hasEntries()&&_d7b.has(key)){
_d7b.del(key);
if(!_d7b.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this._refreshToken);
this._refreshToken=null;
this._attemptRestorableFocus();
}
}
};
SystemTreeBinding.prototype._computeClipboardSetup=function(){
var _d7c=false;
var _d7d=this.getFocusedTreeNodeBindings();
if(_d7d.hasEntries()){
_d7c=true;
while(_d7c&&_d7d.hasNext()){
var _d7e=_d7d.getNext();
if(!_d7e.isDraggable){
_d7c=false;
}
}
}
SystemTreePopupBinding.isCutAllowed=_d7c;
};
SystemTreeBinding.prototype._computeRefreshSetup=function(){
SystemTreePopupBinding.isRefreshAllowed=SystemTreeBinding.clipboard===null;
};
SystemTreeBinding.prototype.handleBroadcast=function(_d7f,arg){
SystemTreeBinding.superclass.handleBroadcast.call(this,_d7f,arg);
switch(_d7f){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
if(arg!=null||this.isFocused){
this._handleCommandBroadcast(_d7f,arg);
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
if(this.isFocused){
this._handleCommandBroadcast(_d7f);
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
}
};
SystemTreeBinding.prototype._handleDockTabSelect=function(tab){
var _d83=tab.perspectiveNode==null;
if(!_d83){
_d83=tab.perspectiveNode==this.perspectiveNode;
}
if(_d83){
var self=this,_d85=tab.getEntityToken();
setTimeout(function(){
if(_d85==null){
self.blurSelectedTreeNodes();
}else{
self._focusTreeNodeByEntityToken(_d85);
}
},250);
}
};
SystemTreeBinding.prototype._focusTreeNodeByEntityToken=function(_d86,_d87){
this.isLockFeatureFocus=true;
var _d88=null;
if(this._entityTokenRegistry.has(_d86)){
var list=this._entityTokenRegistry.get(_d86);
list.each(function(tn){
var _d8b=true;
if(tn.node.isTreeLockEnabled()){
_d88=tn;
_d8b=false;
}
return _d8b;
});
if(_d88!=null){
if(!_d88.isFocused){
this.focusSingleTreeNodeBinding(_d88,true);
}else{
_d88.dispatchAction(TreeNodeBinding.ACTION_FOCUSED);
}
}
}
this.isLockFeatureFocus=false;
if(_d88==null&&_d87!=true){
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._fetchTreeForEntityToken(_d86);
self._focusTreeNodeByEntityToken(_d86,true);
}
Application.unlock(self);
StatusBar.clear();
},0);
}
};
SystemTreeBinding.prototype._fetchTreeForEntityToken=function(_d8d){
var _d8e=StageBinding.perspectiveNode.getEntityToken();
var _d8f=this.getOpenSystemNodes();
var map=System.getInvisibleBranch(_d8e,_d8d,_d8f);
if(map==null){
this.isLockedToEditor=false;
if(Application.isDeveloperMode){
Dialog.warning("Ouch!","Because the web service failed, tree has disabled the lock-tree-to-editor "+"feature. Otherwise, re-focus would fire the error indefinitely. Please try again.");
}
}else{
if(map.hasEntries()){
var self=this;
var _d92=this._treeNodeBindings;
var _d93=new Map();
function fix(_d94,list){
if(!_d94.hasBeenOpened){
if(list.hasEntries()){
list.each(function(node){
if(!_d92.has(node.getHandle())){
var _d97=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
_d93.set(node.getHandle(),_d97);
_d94.add(_d97);
}
});
_d94.attachRecursive();
}
}
_d94.open(true);
}
map.each(function(_d98,list){
if(_d92.has(_d98)){
var _d9a=_d92.get(_d98);
fix(_d9a,list);
}else{
if(_d93.has(_d98)){
var _d9b=_d93.get(_d98);
fix(_d9b,list);
}else{
}
}
});
}
}
};
SystemTreeBinding.prototype._handleCommandBroadcast=function(_d9c,arg){
switch(_d9c){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _d9e=arg;
if(_d9e!=null){
this._invokeServerRefresh(_d9e);
}else{
this._invokeManualRefresh();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
if(SystemTreeBinding.clipboard!=null){
SystemTreeBinding.clipboard.hideDrag();
}
var _d9f=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_CUT;
SystemTreeBinding.clipboard=_d9f;
_d9f.showDrag();
break;
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
var _d9f=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_COPY;
SystemTreeBinding.clipboard=_d9f;
break;
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
this._handlePaste();
break;
}
};
SystemTreeBinding.prototype._invokeServerRefresh=function(_da0){
if(_da0!=null&&_da0=="null"){
if(Application.isDeveloperMode){
alert("Saa har vi balladen.");
}
}
if(this._entityTokenRegistry.has(_da0)){
var list=this._entityTokenRegistry.get(_da0).reset();
this._refreshToken=_da0;
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this._refreshToken);
while(list.hasNext()){
var _da2=list.getNext();
this._refreshingTreeNodes.set(_da2.key,true);
setTimeout(function(){
_da2.refresh(true);
},0);
}
}
};
SystemTreeBinding.prototype._invokeManualRefresh=function(){
var _da3=this.getFocusedTreeNodeBindings().getFirst();
if(_da3){
var _da4=_da3.getLabel();
var _da5=_da3.getAncestorBindingByLocalName("treenode");
if(_da5){
_da3=_da5;
}
this._refreshToken=null;
this._refreshingTreeNodes.set(_da3.key,true);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,null);
if(!StatusBar.state){
var _da6=StringBundle.getString("ui","Website.App.StatusBar.Refreshing");
StatusBar.busy(_da6,[_da4]);
}
_da3.refresh();
}
};
SystemTreeBinding.prototype._handlePaste=function(){
var _da7=SystemTreeBinding.clipboard;
if(_da7){
var type=_da7.dragType;
var _da9=this.getFocusedTreeNodeBindings().getFirst();
if(_da9.dragAccept){
if(_da9.acceptor.isAccepting(type)){
this._performPaste(_da9);
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteTypeNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteTypeNotAllowed"));
}
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteNotAllowed"));
}
}
};
SystemTreeBinding.prototype._performPaste=function(_daa){
var self=this;
function update(){
MessageQueue.update();
Application.unlock(self);
}
if(_daa.node.hasDetailedDropSupport()){
if(_daa.node.hasChildren()){
var _dac=_daa.node.getChildren();
Dialog.invokeModal(SystemTreeBinding.URL_DIALOG_DETAILEDPASTE,{handleDialogResponse:function(_dad,_dae){
if(_dad==Dialog.RESPONSE_ACCEPT){
Application.lock(self);
var _daf=_dae.get("switch");
var _db0=_dae.get("sibling");
if(_daf=="after"){
_db0++;
}
var _db1=_daa.accept(SystemTreeBinding.clipboard,_db0);
if(_db1){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}},_dac);
}else{
Application.lock(self);
var _db2=_daa.accept(SystemTreeBinding.clipboard,0);
if(_db2){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}else{
Application.lock(self);
var _db2=_daa.accept(SystemTreeBinding.clipboard,0);
if(_db2){
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
SystemTreeBinding.prototype.collapse=function(_db3){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,null);
if(_db3){
this.blurSelectedTreeNodes();
var _db4=this.getRootTreeNodeBindings();
_db4.each(function(_db5){
if(_db5.isContainer&&_db5.isOpen){
_db5.close();
_db5.hasBeenOpened=false;
_db5.empty();
}
});
}else{
SystemTreeBinding.superclass.collapse.call(this);
}
};
SystemTreeBinding.prototype.setLockToEditor=function(_db6){
if(_db6!=this.isLockedToEditor){
this.isLockedToEditor=_db6;
if(_db6){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
}
};
SystemTreeBinding.prototype.getOpenSystemNodes=function(){
var list=new List([StageBinding.perspectiveNode]);
var _db8=this.getRootTreeNodeBindings();
_db8.each(function(_db9){
var _dba=_db9.getOpenSystemNodes();
if(_dba!=null&&_dba.hasEntries()){
list.merge(_dba);
}
});
return list;
};
SystemTreeBinding.prototype.focusSingleTreeNodeBinding=function(_dbb){
SystemTreeBinding.superclass.focusSingleTreeNodeBinding.call(this,_dbb);
if(_dbb!=null){
this._handleSystemTreeFocus();
}
};
SystemTreeBinding.prototype.getCompiledActionProfile=function(){
var temp={};
var _dbd=new Map();
var _dbe=this.getFocusedTreeNodeBindings();
_dbd=_dbe.getFirst().node.getActionProfile();
return _dbd;
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
SystemTreePopupBinding.prototype.handleBroadcast=function(_dbf,arg){
SystemTreePopupBinding.superclass.handleBroadcast.call(this,_dbf,arg);
switch(_dbf){
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
var _dc4=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_PASTE);
cut.setDisabled(!SystemTreePopupBinding.isCutAllowed);
copy.setDisabled(!SystemTreePopupBinding.isCutAllowed);
_dc4.setDisabled(SystemTreeBinding.clipboard==null);
};
SystemTreePopupBinding.prototype._setupRefreshItem=function(){
var _dc5=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_REFRESH);
_dc5.setDisabled(!SystemTreePopupBinding.isRefreshAllowed);
};
SystemTreePopupBinding.prototype.handleAction=function(_dc6){
SystemTreePopupBinding.superclass.handleAction.call(this,_dc6);
switch(_dc6.type){
case MenuItemBinding.ACTION_COMMAND:
var _dc7=_dc6.target;
var _dc8=_dc7.associatedSystemAction;
if(_dc8){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _dca=list.getFirst();
var _dcb=_dca.node;
}
SystemAction.invoke(_dc8,_dcb);
}else{
var cmd=_dc7.getProperty("cmd");
if(cmd){
this._handleCommand(cmd);
}
}
break;
}
};
SystemTreePopupBinding.prototype._handleCommand=function(cmd){
var _dce=null;
switch(cmd){
case SystemTreePopupBinding.CMD_CUT:
_dce=BroadcastMessages.SYSTEMTREEBINDING_CUT;
break;
case SystemTreePopupBinding.CMD_COPY:
_dce=BroadcastMessages.SYSTEMTREEBINDING_COPY;
break;
case SystemTreePopupBinding.CMD_PASTE:
_dce=BroadcastMessages.SYSTEMTREEBINDING_PASTE;
break;
case SystemTreePopupBinding.CMD_REFRESH:
_dce=BroadcastMessages.SYSTEMTREEBINDING_REFRESH;
break;
}
if(_dce){
setTimeout(function(){
EventBroadcaster.broadcast(_dce);
},0);
}
};
SystemTreePopupBinding.prototype.disposeContent=function(){
var _dcf=new List(DOMUtil.getElementsByTagName(this.bindingElement,"menugroup"));
while(_dcf.hasNext()){
var _dd0=UserInterface.getBinding(_dcf.getNext());
if(!_dd0.getProperty("rel")){
_dd0.dispose();
}
}
};
SystemTreePopupBinding.prototype.constructContent=function(){
if(this._actionProfile!=null){
var doc=this.bindingDocument;
var _dd2=new List();
var self=this;
this._actionProfile.each(function(_dd4,list){
var _dd6=MenuGroupBinding.newInstance(doc);
list.each(function(_dd7){
var _dd8=self.getMenuItemBinding(_dd7);
_dd6.add(_dd8);
});
_dd2.add(_dd6);
});
_dd2.reverse();
while(_dd2.hasNext()){
this._bodyBinding.addFirst(_dd2.getNext());
}
this._bodyBinding.attachRecursive();
}
};
SystemTreePopupBinding.prototype.getMenuItemBinding=function(_dd9){
var _dda=MenuItemBinding.newInstance(this.bindingDocument);
var _ddb=_dd9.getLabel();
var _ddc=_dd9.getToolTip();
var _ddd=_dd9.getImage();
var _dde=_dd9.getDisabledImage();
var _ddf=_dd9.isCheckBox();
if(_ddb){
_dda.setLabel(_ddb);
}
if(_ddc){
_dda.setToolTip(_ddc);
}
if(_ddd){
_dda.imageProfile=new ImageProfile({image:_ddd,imageDisabled:_dde});
}
if(_ddf){
_dda.setType(MenuItemBinding.TYPE_CHECKBOX);
if(_dd9.isChecked()){
_dda.check(true);
}
}
if(_dd9.isDisabled()){
_dda.disable();
}
_dda.associatedSystemAction=_dd9;
return _dda;
};
SystemTreePopupBinding.prototype.snapToMouse=function(e){
var node=e.target?e.target:e.srcElement;
var name=DOMUtil.getLocalName(node);
var _de3=null;
if(name!="tree"){
switch(name){
case "treenode":
break;
default:
node=DOMUtil.getAncestorByLocalName("treenode",node);
if(node!=null){
_de3=UserInterface.getBinding(node);
if(_de3.isDisabled){
_de3=null;
}
}
break;
}
if(_de3!=null&&_de3.node!=null&&_de3.node.getActionProfile()!=null){
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
}
SystemTreeNodeBinding.prototype.onBindingAttach=function(){
this.addActionListener(SystemTreeNodeBinding.ACTION_REFRESHED);
this.subscribe(BroadcastMessages.SYSTEMTREENODEBINDING_FORCE_OPEN);
this.isDisabled=this.node.isDisabled();
var _de4=this.node.getLabel();
if(_de4){
this.setLabel(_de4);
}
var _de5=this.node.getToolTip();
if(_de5){
this.setToolTip(_de5);
}
var _de6=this.node.getHandle();
if(_de6){
this.setHandle(_de6);
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
var _de9="";
var list=this.node.getDragAccept();
while(list.hasNext()){
_de9+=list.getNext();
if(list.hasNext()){
_de9+=" ";
}
}
this.setProperty("dragaccept",_de9);
}
SystemTreeNodeBinding.superclass._initializeBindingDragAndDropFeatures.call(this);
};
SystemTreeNodeBinding.prototype.handleAction=function(_deb){
SystemTreeNodeBinding.superclass.handleAction.call(this,_deb);
switch(_deb.type){
case SystemTreeNodeBinding.ACTION_REFRESHED:
if(_deb.target==this){
if(!this.isOpen){
this.hasBeenOpened=false;
_deb.consume();
}
}
break;
}
};
SystemTreeNodeBinding.prototype.handleBroadcast=function(_dec,arg){
SystemTreeNodeBinding.superclass.handleBroadcast.call(this,_dec,arg);
switch(_dec){
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
var _def=null;
var _df0=this.node.getImageProfile();
if(_df0){
if(this.isOpen){
_def=_df0.getActiveImage();
}else{
_def=_df0.getDefaultImage();
}
}
if(!_def){
_def=SystemTreeNodeBinding.superclass.computeImage.call(this);
}
return _def;
};
SystemTreeNodeBinding.prototype.open=function(_df1){
var _df2=this.isContainer&&!this.isOpen;
var _df3=!this.hasBeenOpened;
SystemTreeNodeBinding.superclass.open.call(this);
if(_df2&&(_df3||SystemTreeBinding.HAS_NO_MEMORY)&&_df1!=true){
this.refresh();
if(this._isForcedOpen){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN,this);
this._isForcedOpen=false;
}
}
};
SystemTreeNodeBinding.prototype.refresh=function(){
var _df4=null;
if(this.isContainer){
_df4=this.getOpenSystemNodes();
}
this.isRefreshing=true;
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._performRefresh(_df4);
Application.unlock(self);
StatusBar.clear();
}
},0);
};
SystemTreeNodeBinding.prototype._performRefresh=function(_df6){
if(_df6!=null){
this._refreshBranch(_df6);
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
var _df7=new List();
var _df8=this.node.getChildren();
this.empty();
if(_df8.hasEntries()){
this._insertTreeNodesRegulated(_df8);
}
};
SystemTreeNodeBinding.prototype._insertTreeNodesRegulated=function(_df9){
var _dfa=0;
while(_df9.hasEntries()&&_dfa<=SystemTreeNodeBinding.MAX_CHILD_IMPORT){
var _dfb=SystemTreeNodeBinding.newInstance(_df9.extractFirst(),this.bindingDocument);
this.add(_dfb);
_dfb.attach();
_dfa++;
}
if(_df9.hasEntries()){
this._insertBufferTreeNode(_df9);
}
};
SystemTreeNodeBinding.prototype._insertBufferTreeNode=function(_dfc){
alert("Max treenode count reached. This is not handled!");
alert("TODO: SystemTreeNodeBinding#._insertBufferTreeNode");
};
SystemTreeNodeBinding.prototype._refreshBranch=function(list){
var _dfe=this.node.getDescendantBranch(list);
if(_dfe.hasEntries()){
this.XXX(_dfe);
}
};
SystemTreeNodeBinding.prototype.XXX=function(_dff){
var self=this;
var map=new Map();
this.empty();
_dff.each(function(key,_e03){
if(_e03.hasEntries()){
_e03.each(function(node){
var _e05=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e05);
if(map.has(key)){
var _e06=map.get(key);
_e06.add(_e05);
_e06.isOpen=true;
_e06.hasBeenOpened=true;
}else{
if(key==self.node.getHandle()){
self.add(_e05);
}else{
}
}
});
}
});
this.attachRecursive();
_dff.dispose();
map.dispose();
};
SystemTreeNodeBinding.prototype.getOpenDescendants=function(){
var _e07=new TreeCrawler();
var _e08=new List();
_e07.mode=TreeCrawler.MODE_GETOPEN;
_e07.crawl(this.bindingElement,_e08);
if(_e08.hasEntries()){
_e08.extractFirst();
}
_e07.dispose();
return _e08;
};
SystemTreeNodeBinding.prototype.getOpenSystemNodes=function(){
var _e09=null;
var list=this.getOpenDescendants();
if(list.hasEntries()){
_e09=new List([this.node]);
list.each(function(_e0b){
_e09.add(_e0b.node);
});
}
return _e09;
};
SystemTreeNodeBinding.prototype.updateClassNames=function(){
if(!this.isRefreshing){
SystemTreeNodeBinding.superclass.updateClassNames.call(this);
}
};
SystemTreeNodeBinding.prototype.acceptTreeNodeBinding=function(_e0c,_e0d){
var _e0e=(SystemTreeBinding.clipboardOperation==SystemTreePopupBinding.CMD_COPY);
if(_e0c instanceof SystemTreeNodeBinding){
if(TreeService.ExecuteDropElementAction){
TreeService.ExecuteDropElementAction(_e0c.node.getData(),this.node.getData(),_e0d?_e0d:this.containingTreeBinding.getDropIndex(),Application.CONSOLE_ID,_e0e);
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
SystemTreeNodeBinding.newInstance=function(node,_e12){
var _e13=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_e12);
var _e14=UserInterface.registerBinding(_e13,SystemTreeNodeBinding);
_e14.node=node;
return _e14;
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
SystemPageBinding.prototype.setPageArgument=function(_e15){
this.node=_e15;
SystemPageBinding.superclass.setPageArgument.call(this,_e15);
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
var _e16=this.node.getChildren();
if(_e16.hasEntries()){
while(_e16.hasNext()){
var node=SystemTreeNodeBinding.newInstance(_e16.getNext(),this.bindingDocument);
this._tree.add(node);
node.attach();
}
}
};
SystemPageBinding.prototype._refreshTree=function(){
var _e18=this._tree._treeBodyBinding.getChildBindingsByLocalName("treenode");
_e18.each(function(root){
if(!root.isContainer){
root.isOpen=true;
}
});
var _e1a=new TreeCrawler();
var _e1b=new List();
_e1a.mode=TreeCrawler.MODE_GETOPEN;
_e1a.crawl(this.bindingElement,_e1b);
_e1a.dispose();
var list=new List([this.node]);
_e1b.each(function(_e1d){
list.add(_e1d.node);
});
this._tree.empty();
var _e1e=this.node.getDescendantBranch(list);
if(_e1e.hasEntries()){
var self=this;
var map=new Map();
_e1e.each(function(key,_e22){
_e22.each(function(node){
var _e24=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e24);
if(map.has(key)){
var _e25=map.get(key);
_e25.add(_e24);
_e25.isOpen=true;
}else{
if(key==self.node.getHandle()){
self._tree.add(_e24);
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
SystemPageBinding.prototype.handleAction=function(_e26){
SystemPageBinding.superclass.handleAction.call(this,_e26);
switch(_e26.type){
case ButtonBinding.ACTION_COMMAND:
var _e27=_e26.target;
switch(_e27.getID()){
case "locktreebutton":
this._tree.setLockToEditor(_e27.isChecked);
break;
case "collapsebutton":
this._tree.collapse();
break;
}
break;
}
};
SystemPageBinding.prototype.handleBroadcast=function(_e28,arg){
SystemPageBinding.superclass.handleBroadcast.call(this,_e28,arg);
switch(_e28){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _e2a=arg;
if(this.node&&this.node.getEntityToken()==_e2a){
try{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,_e2a);
var self=this;
Application.lock(this);
setTimeout(function(){
self._refreshTree();
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,_e2a);
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
StageContainerBinding.prototype.handleBroadcast=function(_e2c,arg){
StageContainerBinding.superclass.handleBroadcast.call(this,_e2c,arg);
var _e2e=this.bindingWindow.WindowManager;
switch(_e2c){
case BroadcastMessages.APPLICATION_OPERATIONAL:
this.subscribe(_e2e.WINDOW_RESIZED_BROADCAST);
this._fit();
this.reflex();
break;
case _e2e.WINDOW_RESIZED_BROADCAST:
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
var _e30=this.bindingWindow.WindowManager;
this.bindingElement.style.width=_e30.getWindowDimensions().w+"px";
};
StageBinding.prototype=new FocusBinding;
StageBinding.prototype.constructor=StageBinding;
StageBinding.superclass=FocusBinding.prototype;
StageBinding.bindingInstance=null;
StageBinding.perspectiveNode=null;
StageBinding.entityToken=null;
StageBinding.handleViewPresentation=function(_e31){
if(StageBinding.isViewOpen(_e31)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_e31);
}else{
var _e32=ViewDefinitions[_e31];
StageBinding.presentViewDefinition(_e32);
}
};
StageBinding.isViewOpen=function(_e33){
return StageBinding.bindingInstance._activeViewDefinitions[_e33]!=null;
};
StageBinding.presentViewDefinition=function(_e34){
if(_e34.label!=null){
var _e35=StringBundle.getString("ui","Website.App.StatusBar.Opening");
StatusBar.busy(_e35,[_e34.label]);
}else{
StatusBar.busy();
}
StageBinding.bindingInstance._presentViewDefinition(_e34);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,{handleBroadcast:function(_e37,arg){
if(arg==root.getEntityToken()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
}
}});
var _e39=System.getPerspectiveNodes();
if(_e39.hasEntries()){
this._initializeSystemViewDefinitions(_e39);
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
var _e3b=null;
if(LocalStore.isEnabled){
_e3b=LocalStore.getProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE);
}
if(_e3b&&ViewDefinitions[_e3b]){
alert("StageBinding#_initializeWorkbenchLayout !!!!");
this._explorerBinding.setSelectionByHandle(unescape(_e3b));
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
var _e3d=root.getActionProfile();
if(_e3d&&_e3d.hasEntries()){
var _e3e=top.app.bindingMap.toolsmenugroup;
if(_e3e){
_e3d.each(function(_e3f,list){
list.each(function(_e41){
var item=MenuItemBinding.newInstance(_e3e.bindingDocument);
item.setLabel(_e41.getLabel());
item.setToolTip(_e41.getToolTip());
item.setImage(_e41.getImage());
item.setDisabled(_e41.isDisabled());
item.associatedSystemAction=_e41;
var _e43=_e3e;
var tag=_e41.getTag();
if(tag!=null){
switch(tag){
case SystemAction.TAG_CHANGEFROMLANGUAGE:
_e43=top.app.bindingMap.translationsmenugroup;
break;
}
}
_e43.add(item);
});
});
_e3e.attachRecursive();
}
}
};
StageBinding.prototype._initializeSystemViewDefinitions=function(_e45){
while(_e45.hasNext()){
var node=_e45.getNext();
var _e47=node.getHandle();
ViewDefinitions[_e47]=new SystemViewDefinition(node);
}
};
StageBinding.prototype.handleAction=function(_e48){
StageBinding.superclass.handleAction.call(this,_e48);
var _e49=_e48.target;
switch(_e48.type){
case StageDecksBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._decksBinding=_e49;
this._inflateBinding(_e49);
_e48.consume();
break;
case ExplorerBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._explorerBinding=_e49;
this._inflateBinding(_e49);
_e48.consume();
break;
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
if(!Application.isOperational){
ProgressBarBinding.notch(5);
}
this.handlePerspectiveChange(_e49);
_e48.consume();
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_e49 instanceof DockBinding){
switch(_e49.reference){
case DockBinding.START:
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
this._dockBindings.set(_e49.reference,_e49);
break;
}
this.handleAttachedDock(_e49);
_e48.consume();
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_e49 instanceof DockBinding){
this.handleSelectedDockTab(_e49.getSelectedTabBinding());
_e48.consume();
}
break;
case WindowBinding.ACTION_LOADED:
break;
case ExplorerBinding.ACTION_DECK_LOADED:
this._isExplorerReady=true;
if(this._isDecksReady==true){
if(!this._isStageReady){
if(Client.isWebKit){
alert("StageBinding 4 WEHEY!");
}
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
_e48.consume();
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
_e48.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_e48);
};
StageBinding.prototype.handleBroadcast=function(_e4b,arg){
StageBinding.superclass.handleBroadcast.call(this,_e4b,arg);
switch(_e4b){
case BroadcastMessages.VIEW_OPENED:
Application.unlock(this);
break;
case BroadcastMessages.VIEW_CLOSED:
var _e4d=arg;
this._dontView(_e4d);
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
StageBinding.prototype._showStart=function(_e4f){
if(_e4f!=this._isShowingStart){
var view=ViewBinding.getInstance("Composite.Management.Start");
var dock=this._dockBindings.get(DockBinding.START);
var _e52=this.bindingWindow.bindingMap.maindecks;
if(_e4f){
_e52.select("startdeck");
view.show();
}else{
view.hide();
_e52.select("stagedeck");
if(dock!=null&&dock.isActive){
dock.deActivate();
}
}
this._isShowingStart=_e4f;
}
};
StageBinding.prototype._inflateBinding=function(_e53){
for(var _e54 in ViewDefinitions){
var _e55=ViewDefinitions[_e54];
if(_e55 instanceof SystemViewDefinition){
_e53.mountDefinition(_e55);
}
}
var _e56=(this._decksBinding&&this._explorerBinding);
if(_e56){
var self=this;
setTimeout(function(){
self._renameThisMethod();
},0);
}
};
StageBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _e59=new StageCrawler();
_e59.mode=mode;
_e59.crawl(this.bindingElement);
_e59.dispose();
};
StageBinding.prototype.handlePerspectiveChange=function(_e5a){
var _e5b=_e5a.getSelectionHandle();
this._decksBinding.setSelectionByHandle(_e5b);
if(LocalStore.isEnabled){
LocalStore.setProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE,escape(_e5b));
}
};
StageBinding.prototype.handleAttachedDock=function(_e5c){
var _e5d=_e5c.getTabBindings();
if(_e5d.hasEntries()){
while(_e5d.hasNext()){
var _e5e=_e5d.getNext();
var _e5f=_e5e.getHandle();
if(_e5f){
if(_e5f=="Composite.Management.Start"&&(!Application.hasStartPage||!Application.hasExternalConnection)){
}else{
var _e60=ViewDefinitions[_e5f];
if(_e60){
this._view(_e5c,_e5e,_e60,false);
}else{
alert("StageBinding: no such predefined viewdefinition ("+_e5f+")");
}
}
}
}
}
};
StageBinding.prototype._presentViewDefinition=function(_e61){
var _e62=null;
var _e63=false;
switch(_e61.position){
case Dialog.MODAL:
_e62=app.bindingMap.masterdialogset.getModalInstance();
break;
case Dialog.NON_MODAL:
_e62=app.bindingMap.masterdialogset.getInstance();
break;
default:
if(this._dockBindings.hasEntries()){
switch(_e61.position){
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
_e62=this._dockBindings.get(_e61.position);
break;
default:
var _e64=this._decksBinding.getSelectedDeckBinding();
_e62=_e64.getDockBindingByReference(_e61.position);
if(this._isShowingStart){
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}else{
if(this._isShowingDefaultStart){
var _e65=this.bindingWindow.bindingMap.maindecks;
_e65.select("stagedeck");
this._isShowingDefaultStart=false;
}
}
break;
}
}else{
_e63=true;
}
break;
}
if(!_e63){
if(_e62!=null){
this._view(_e62,null,_e61,true);
}else{
throw "StageBinding: Could not position view: "+_e61.handle;
}
}
};
StageBinding.prototype._view=function(_e66,_e67,_e68,_e69){
var _e6a=_e68.handle;
if(_e68.isMutable){
_e6a+=KeyMaster.getUniqueKey();
}
if(this._activeViewDefinitions[_e6a]){
var _e6b=ViewBinding.getInstance(_e6a);
if(_e6b!=null){
_e6b.update();
}else{
this.logger.error("Could not update ViewBinding (declared open): \n"+_e6a);
}
}else{
this._activeViewDefinitions[_e6a]=_e68;
Application.lock(this);
switch(_e66.constructor){
case DockBinding:
if(_e69){
_e66.prepareNewView(_e68);
}else{
_e66.prepareOpenView(_e68,_e67);
}
break;
case StageDialogBinding:
if(_e69){
_e66.prepareNewView(_e68);
}
break;
}
}
};
StageBinding.prototype._dontView=function(_e6c){
if(this._activeViewDefinitions[_e6c]!=null){
delete this._activeViewDefinitions[_e6c];
}else{
this.logger.debug("Could not unregister active view: "+_e6c);
}
};
StageBinding.prototype.handleSelectedDockTab=function(_e6d){
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
this.addFilter(function(_e6f){
var _e70=UserInterface.getBinding(_e6f);
var _e71=null;
if(_e70){
switch(_e70.constructor){
case StageSplitBoxBinding:
case StageSplitPanelBinding:
case StageSplitterBinding:
switch(self.mode){
case StageCrawler.MODE_MAXIMIZE:
_e70.handleMaximization();
break;
case StageCrawler.MODE_UNMAXIMIZE:
_e70.handleUnMaximization();
break;
}
break;
case DockBinding:
_e71=NodeCrawler.SKIP_NODE;
break;
}
}
return _e71;
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
var _e72=null;
this._dialogs.each(function(_e73){
if(!_e73.isVisible){
_e72=_e73;
}
return _e72!=null;
});
if(!_e72){
this._newInstance();
_e72=this._dialogs.getLast();
}
_e72.setModal(false);
return _e72;
};
StageDialogSetBinding.prototype.getModalInstance=function(){
var _e74=this.getInstance();
_e74.setModal(true);
return _e74;
};
StageDialogSetBinding.prototype._newInstance=function(){
var _e75=this.add(StageDialogBinding.newInstance(this.bindingDocument));
this._dialogs.add(_e75);
_e75.attach();
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
StageDialogBinding.prototype.prepareNewView=function(_e76){
if(_e76 instanceof DialogViewDefinition){
var _e77=ViewBinding.newInstance(this.bindingDocument);
_e77.setDefinition(_e76);
_e77.setType(ViewBinding.TYPE_DIALOGVIEW);
if(_e76.handler){
if(Interfaces.isImplemented(IDialogResponseHandler,_e76.handler)){
this._dialogResponseHandler=_e76.handler;
}else{
throw "IDialogResponseHandler not implemented";
}
}
this._viewBinding=_e77;
this._body.add(_e77);
_e77.attach();
_e77.initialize();
}
};
StageDialogBinding.prototype.handleAction=function(_e78){
StageDialogBinding.superclass.handleAction.call(this,_e78);
var _e79=_e78.target;
switch(_e78.type){
case PageBinding.ACTION_INITIALIZED:
this._handleInitializedPageBinding(_e79);
_e78.consume();
break;
case PageBinding.ACTION_DETACHED:
if(_e79.bindingDocument==this._viewBinding.getContentDocument()){
this._pageBinding=null;
}
_e78.consume();
break;
case DialogPageBinding.ACTION_RESPONSE:
if(_e79.response){
this._handleDialogPageResponse(_e79);
}
_e78.consume();
break;
case Binding.ACTION_INVALID:
this._disableDialogAcceptButton(true);
_e78.consume();
break;
case Binding.ACTION_VALID:
this._disableDialogAcceptButton(false);
_e78.consume();
break;
case ViewBinding.ACTION_ONCLOSE:
this.close();
_e79.dispose();
_e78.consume();
break;
case ViewBinding.ACTION_CLOSED:
this._isFirstPage=true;
_e78.consume();
break;
case ErrorBinding.ACTION_INITIALIZE:
_e78.consume();
break;
case PageBinding.ACTION_UPDATING:
this._isUpdating=true;
_e78.consume();
break;
case PageBinding.ACTION_UPDATED:
if(this._isUpdating){
this._isUpdating=false;
this._fit();
}
_e78.consume();
break;
case Binding.ACTION_UPDATED:
if(!this._isUpdating){
this._fit();
}
_e78.consume();
break;
case DialogBinding.ACTION_CLOSE:
if(_e79==this){
this._viewBinding.dispose();
this.defaultSetup();
}
break;
}
};
StageDialogBinding.prototype.handleBroadcast=function(_e7a,arg){
StageDialogBinding.superclass.handleBroadcast.call(this,_e7a,arg);
switch(_e7a){
case BroadcastMessages.KEY_ESCAPE:
if(this.isVisible==true){
if(!PopupBinding.hasActiveInstances()){
this._defaultClose();
}
}
break;
}
};
StageDialogBinding.prototype._fit=function(_e7c){
var _e7d=new FitnessCrawler();
var list=new List();
if(_e7c){
_e7d.mode=FitnessCrawler.MODE_BRUTAL;
}
_e7d.crawl(this.bindingElement,list);
_e7d.dispose();
if(list.hasEntries()){
list.reverse();
list.each(function(_e7f){
_e7f.fit(_e7c);
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
var _e80=this.getDimension().h;
this.reflex(true);
var self=this;
if(this.getDimension().h==_e80){
var self=this;
setTimeout(function(){
self.reflex(true);
},0);
}
}
};
StageDialogBinding.prototype._handleContextMenuItemBinding=function(_e82){
var cmd=_e82.getProperty("cmd");
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
StageDialogBinding.prototype._handleInitializedPageBinding=function(_e84){
if(_e84.bindingDocument==this._viewBinding.getContentDocument()){
if(_e84 instanceof DialogPageBinding){
if(this._pageBinding==null){
this._parsePageBinding(_e84);
}
this._pageBinding=_e84;
if(_e84.height=="auto"){
_e84.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_e84);
_e84.enableAutoHeightLayoutMode(false);
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
if(_e84.isDialogSubPage){
this._pageBinding.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_e84);
this._pageBinding.enableAutoHeightLayoutMode(false);
this._fit(true);
this.reflex(true);
}
}
this._isFirstPage=false;
};
StageDialogBinding.prototype._disableDialogAcceptButton=function(_e85){
var _e86=this._viewBinding.getContentDocument().getElementById("dialogacceptbutton");
if(_e86){
var _e87=UserInterface.getBinding(_e86);
_e87.setDisabled(_e85);
}
};
StageDialogBinding.prototype._handleDialogPageResponse=function(_e88){
if(this._dialogResponseHandler!=null){
this._dialogResponseHandler.handleDialogResponse(_e88.response,_e88.result!=null?_e88.result:null);
}
this.close();
};
StageDialogBinding.prototype.handleInvokedControl=function(_e89){
if(_e89.controlType==ControlBinding.TYPE_CLOSE){
this._defaultClose();
}
StageDialogBinding.superclass.handleInvokedControl.call(this,_e89);
};
StageDialogBinding.prototype.buildDescendantBindings=function(){
StageDialogBinding.superclass.buildDescendantBindings.call(this);
this._titlebar.setContextMenu(app.bindingMap.dialogtitlebarpopup);
var self=this;
this._titlebar.handleAction=function(_e8b){
switch(_e8b.type){
case MenuItemBinding.ACTION_COMMAND:
if(_e8b.listener==this.contextMenuBinding){
self._handleContextMenuItemBinding(_e8b.target);
}
break;
}
};
};
StageDialogBinding.prototype._parsePageBinding=function(_e8c){
var _e8d=_e8c.label;
var _e8e=_e8c.image;
var _e8f=_e8c.width;
var _e90=_e8c.height;
var _e91=_e8c.controls;
var _e92=_e8c.isResizable;
if(_e8d){
this.setLabel(_e8d);
}
if(_e8e){
this.setImage(_e8e);
}
if(_e8f||_e90){
var old=this.getDimension();
var nev=new Dimension();
if(this._isFirstPage){
nev.w=_e8f?_e8f:old.w;
}else{
nev.w=old.w;
}
nev.h=(_e90!=null&&_e90!="auto")?_e90:old.h;
this.setDimension(nev);
}
if(_e91){
this.controlBindings[ControlBinding.TYPE_MAXIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_MINIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_CLOSE].hide();
var type,_e96=new List(_e91.split(" "));
while((type=_e96.getNext())!=null){
this.controlBindings[type].show();
}
}
if(_e92!=this._isResizable){
this.setResizable(_e92);
}
if(_e90=="auto"){
this._fixAutoHeight(_e8c);
}
if(_e8c==this._pageBinding){
this.centerOnScreen();
}
if(!this.isOpen){
this.reflex(true);
this.open(true);
}
};
StageDialogBinding.prototype._fixAutoHeight=function(_e97){
var dim=this.getDimension();
var _e99=0;
var _e9a=0;
if(_e97.isDialogSubPage){
_e97=this._pageBinding;
}
if(this._isFirstPage){
_e99=_e97.width!=null?_e97.width:dim.w;
}else{
_e99=dim.w;
}
_e9a=_e97.bindingElement.offsetHeight;
_e9a+=this._titlebar.bindingElement.offsetHeight;
_e9a+=4;
if(_e9a<dim.h){
_e9a=dim.h;
}
if(_e97.minheight!=null){
if(_e9a<_e97.minheight){
_e9a=_e97.minheight;
}
}
this.setDimension(new Dimension(_e99,_e9a));
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
StageDialogBinding.newInstance=function(_e9d){
var _e9e=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_e9d);
var _e9f=UserInterface.registerBinding(_e9e,StageDialogBinding);
_e9f.setProperty("controls","minimize maximize close");
return _e9f;
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
this.addFilter(function(_ea0,list){
var _ea2=null;
var _ea3=UserInterface.getBinding(_ea0);
if(!_ea3.isVisible){
_ea2=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _ea2;
});
this.addFilter(function(_ea4,list){
var _ea6=null;
var _ea7=UserInterface.getBinding(_ea4);
if(_ea7.isAttached){
if(Interfaces.isImplemented(IFit,_ea7)){
if(!_ea7.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_ea7);
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
StageDecksBinding.prototype.mountDefinition=function(_ea8){
var _ea9=StageDeckBinding.newInstance(this.bindingDocument);
_ea9.handle=_ea8.handle;
_ea9.perspectiveNode=_ea8.node;
this._decks[_ea9.handle]=_ea9;
this.add(_ea9);
_ea9.attach();
};
StageDecksBinding.prototype.setSelectionByHandle=function(_eaa){
var _eab=this._decks[_eaa];
StageBinding.perspectiveNode=_eab.perspectiveNode;
this.select(_eab);
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
StageDeckBinding.prototype.handleAction=function(_eac){
StageDeckBinding.superclass.handleAction.call(this,_eac);
var _ead=_eac.target;
switch(_eac.type){
case WindowBinding.ACTION_LOADED:
if(_ead==this.windowBinding){
top.app.bindingMap.stagedeckscover.hide();
this.removeActionListener(WindowBinding.ACTION_LOADED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_OPENED);
this.dispatchAction(StageDeckBinding.ACTION_LOADED);
_eac.consume();
}
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_ead instanceof DockBinding){
this._dockBindings.set(_ead.reference,_ead);
_ead.perspectiveNode=this.perspectiveNode;
}
break;
case StageSplitBoxBinding.ACTION_DOCK_OPENED:
this._dockBindingCount++;
if(this._dockBindingCount==2){
this._dockBindings.get("main").showControls(true);
}
_eac.consume();
break;
case StageSplitBoxBinding.ACTION_DOCK_EMPTIED:
this._dockBindingCount--;
if(this._dockBindingCount==1){
this._dockBindings.get("main").showControls(false);
}
_eac.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_eac);
StageDeckBinding.superclass.handleAction.call(this,_eac);
};
StageDeckBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _eaf=new StageCrawler();
_eaf.mode=mode;
_eaf.crawl(this.windowBinding.getContentDocument().body);
_eaf.dispose();
};
StageDeckBinding.prototype.select=function(){
if(!this._isStageDeckBindingInitialized){
this.initialize();
}
StageDeckBinding.superclass.select.call(this);
};
StageDeckBinding.prototype.getDockBindingByReference=function(_eb0){
return this._dockBindings.get(_eb0);
};
StageDeckBinding.prototype.initialize=function(){
if(!this._isStageDeckBindingInitialized){
top.app.bindingMap.stagedeckscover.show();
this.windowBinding=this.add(WindowBinding.newInstance(this.bindingDocument));
this.windowBinding.setURL(StageDeckBinding.DEFAULT_URL+"?handle="+this.handle);
this.windowBinding.attach();
this._isStageDeckBindingInitialized=true;
}
};
StageDeckBinding.newInstance=function(_eb1){
var _eb2=DOMUtil.createElementNS(Constants.NS_UI,"ui:stagedeck",_eb1);
var _eb3=UserInterface.registerBinding(_eb2,StageDeckBinding);
return _eb3;
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
StageSplitBoxBinding.prototype.handleAction=function(_eb4){
StageSplitBoxBinding.superclass.handleAction.call(this,_eb4);
StageBoxAbstraction.handleAction.call(this,_eb4);
var _eb5=_eb4.target;
var _eb6=null;
var _eb7=null;
switch(_eb4.type){
case DockBinding.ACTION_EMPTIED:
_eb7=this.getChildBindingByLocalName("splitter");
if(_eb7.isVisible){
_eb7.hide();
}
_eb6=this.getDescendantBindingsByLocalName("dock");
if(_eb6.getFirst().isEmpty&&_eb6.getLast().isEmpty){
if(_eb6.getFirst().type!=DockBinding.TYPE_EDITORS){
this.dispatchAction(StageSplitBoxBinding.ACTION_HIDE);
this.hide();
}
}else{
this.flex();
this.invokeLayout();
}
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
_eb4.consume();
break;
case DockBinding.ACTION_OPENED:
_eb6=this.getDescendantBindingsByLocalName("dock");
if(!_eb6.getFirst().isEmpty&&!_eb6.getLast().isEmpty){
_eb7=this.getChildBindingByLocalName("splitter");
if(!_eb7.isVisible){
_eb7.show();
}
}
if(!this.isVisible){
this.show();
this.dispatchAction(StageSplitBoxBinding.ACTION_SHOW);
}
this.flex();
this.invokeLayout();
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_OPENED);
_eb4.consume();
break;
case StageSplitBoxBinding.ACTION_HIDE:
if(_eb5!=this){
_eb7=this.getChildBindingByLocalName("splitter");
if(_eb7.isVisible){
_eb7.hide();
}
this.invokeLayout();
_eb4.consume();
}
break;
case StageSplitBoxBinding.ACTION_SHOW:
if(_eb5!=this){
var _eb8=this.getChildBindingsByLocalName("splitpanel");
if(_eb8.getFirst().isVisible&&_eb8.getLast().isVisible){
_eb7=this.getChildBindingByLocalName("splitter");
if(!_eb7.isVisible){
_eb7.show();
}
}
this.invokeLayout();
_eb4.consume();
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
StageSplitBoxBinding.prototype.handleCrawler=function(_eb9){
StageSplitBoxBinding.superclass.handleCrawler.call(this,_eb9);
switch(_eb9.id){
case FlexBoxCrawler.ID:
if(this.isMaximizedForReal==false){
_eb9.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
};
StageSplitBoxBinding.prototype.hasBothPanelsVisible=function(){
var _eba=this.getChildBindingsByLocalName("splitpanel");
return _eba.getFirst().isVisible&&_eba.getLast().isVisible;
};
StageSplitBoxBinding.prototype.hasBothPanelsFixed=function(){
var _ebb=this.getChildBindingsByLocalName("splitpanel");
return _ebb.getFirst().isFixed&&_ebb.getLast().isFixed;
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
StageSplitPanelBinding.prototype.handleAction=function(_ebc){
StageSplitPanelBinding.superclass.handleAction.call(this,_ebc);
StageBoxAbstraction.handleAction.call(this,_ebc);
switch(_ebc.type){
case DockBinding.ACTION_EMPTIED:
case StageSplitBoxBinding.ACTION_HIDE:
if(this.isMaximized==true){
this.normalize();
}
var dock=this.getContainedDock();
if(dock&&dock.type==DockBinding.TYPE_EDITORS){
this._invisibilize(true);
if(_ebc.type==StageSplitBoxBinding.ACTION_HIDE){
_ebc.consume();
}
}else{
this.hide();
if(this.isFixed==true){
this.setFix(false);
}
}
if(_ebc.type==DockBinding.ACTION_EMPTIED){
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
if(_ebc.type==StageSplitBoxBinding.ACTION_SHOW){
_ebc.consume();
}
}else{
this.show();
if(this.isFixed==true){
this.setFix(false);
}
}
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
var _ebf=_ebc.target;
if(_ebf!=this&&_ebf.getContainedDock()){
if(this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_VERTICAL){
var _ec0=_ebf._containingSplitBoxBinding;
if(_ec0.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL){
var _ec1=_ec0.getChildBindingsByLocalName("splitpanel");
var _ec2=_ec1.getFirst();
var _ec3=_ec1.getLast();
if(this.isFixed==true){
if(!_ec2.isFixed||!_ec3.isFixed||(!_ec0.hasBothPanelsVisible()&&_ebf.isMinimizedForReal)){
this.setFix(false);
_ebc.consume();
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
}
}else{
if(_ec0.hasBothPanelsFixed()||(!_ec0.hasBothPanelsVisible()&&_ebf.isMinimizedForReal)){
this.setFix(_ebf.getContainedDock().getHeight());
_ebc.consume();
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
var _ec4=this.getContainedDock();
if(_ec4){
if(this.isMaximizePrepared==true){
}else{
_ec4.interceptDisplayChange(false);
}
}
};
StageSplitPanelBinding.prototype.handleUnMaximization=function(){
StageBoxAbstraction.handleUnMaximization.call(this);
var _ec5=this.getContainedDock();
if(_ec5){
if(_ec5.type==DockBinding.TYPE_EDITORS){
if(_ec5.isEmpty){
this._invisibilize(true);
}
}
if(this.isMaximized==true){
this.normalize();
}else{
_ec5.interceptDisplayChange(true);
}
}
};
StageSplitPanelBinding.prototype.maximize=function(){
if(this.isMinimized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.maximize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
var _ec6=this.getContainedDock();
if(_ec6){
_ec6.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MAXIMIZED,_ec6);
}
};
StageSplitPanelBinding.prototype.minimize=function(){
var _ec7=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _ec8=this.getContainedDock();
if(_ec8){
_ec8.collapse(_ec7);
if(!_ec7){
this.setFix(_ec8.getHeight());
}else{
this.setFix(_ec8.getWidth());
}
}
if(this.isMaximized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.minimize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_ec8&&_ec8.isActive){
_ec8.deActivate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MINIMIZED,_ec8);
}
};
StageSplitPanelBinding.prototype.normalize=function(_ec9){
var _eca=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _ecb=this.getContainedDock();
if(_ecb){
if(this.isMinimized==true){
_ecb.unCollapse(_eca);
this.setFix(false);
}
}
StageSplitPanelBinding.superclass.normalize.call(this);
if(!_ec9){
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_ecb){
_ecb.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_NORMALIZED,_ecb);
}
}
};
StageSplitPanelBinding.prototype.getContainedDock=function(){
return this.getChildBindingByLocalName("dock");
};
StageSplitPanelBinding.prototype.invisibilize=function(_ecc){
var _ecd=true;
var dock=this.getContainedDock();
if(dock!=null&&dock.type==DockBinding.TYPE_EDITORS){
if(dock.isEmpty==true){
_ecd=false;
}
}
if(_ecd==true){
this._invisibilize(_ecc);
}
};
StageSplitPanelBinding.prototype._invisibilize=function(_ecf){
if(_ecf!=this._isInvisibilized){
if(_ecf){
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
StageSplitterBinding.prototype.onDragStart=function(_ed0){
var _ed1=top.app.bindingMap.stagesplittercover;
var _ed2=this._containingSplitBoxBinding.getOrient();
switch(_ed2){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_ed1.bindingElement.style.cursor="e-resize";
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_ed1.bindingElement.style.cursor="n-resize";
break;
}
_ed1.show();
var body=top.app.bindingMap.stagesplitterbody;
body.setPosition(this.getPosition());
body.setDimension(this.getDimension());
body.setOrient(_ed2);
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
StageSplitterBodyBinding.prototype.setOrient=function(_ed8){
this._orient=_ed8;
this.attachClassName(_ed8);
};
StageSplitterBodyBinding.prototype.setPosition=function(pos){
var _eda=true;
var _edb=true;
switch(this._orient){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_edb=false;
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_eda=false;
break;
}
if(_eda){
this.bindingElement.style.left=pos.x+"px";
}
if(_edb){
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
StageBoxAbstraction.handleAction=function(_edd){
switch(_edd.type){
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
if(_edd.target instanceof DockBinding){
if(this.isHiddenForReal){
this.dispatchAction(StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED);
}else{
if(this.isMinimizedForReal){
this.normalize();
}
}
}
_edd.consume();
break;
}
};
StageBoxAbstraction.handleMaximization=function(){
if(this.isMaximizePrepared==true){
this.isMaximizedForReal=true;
this.isHiddenForReal=false;
this.isFlexible=false;
if(Client.isMozilla==true){
var _ede=this.bindingElement.style;
_ede.position="absolute";
_ede.width="100%";
_ede.height="100%";
_ede.top="0";
_ede.left="0";
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
var _edf=this.bindingElement.style;
_edf.position="relative";
_edf.width="auto";
_edf.height="auto";
_edf.top="auto";
_edf.left="auto";
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
StageBoxAbstraction._emulateBasicCSS=function(_ee0,_ee1){
var _ee2=_ee0.bindingElement.style;
var _ee3=_ee0.bindingElement.parentNode;
var box=_ee0._containingSplitBoxBinding;
if(Client.isExplorer==true){
if(_ee1){
_ee0._unmodifiedFlexMethod=_ee0.flex;
_ee0.flex=function(){
_ee2.width=_ee3.offsetWidth+"px";
_ee2.height=_ee3.offsetHeight+"px";
};
}else{
_ee2.width="100%";
_ee2.height="100%";
if(!box.isHorizontalOrient()){
setTimeout(function(){
_ee2.width="auto";
_ee2.height="auto";
box.reflex(true);
},0);
}
_ee0.flex=_ee0._unmodifiedFlexMethod;
_ee0._unmodifiedFlexMethod=null;
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
StageBoxHandlerAbstraction.handleAction=function(_ee5){
var _ee6=_ee5.target;
switch(_ee5.type){
case ControlBoxBinding.ACTION_MAXIMIZE:
case ControlBoxBinding.ACTION_NORMALIZE:
if(_ee6 instanceof StageSplitPanelBinding){
StageBoxHandlerAbstraction.handleControlBoxAction.call(this,_ee5);
_ee5.consume();
}
break;
case StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED:
if(this.isSubPanelMaximized){
this.iterateContainedStageBoxBindings(StageCrawler.MODE_UNMAXIMIZE);
this.isSubPanelMaximized=false;
}
_ee5.consume();
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
break;
}
};
StageBoxHandlerAbstraction.handleControlBoxAction=function(_ee7){
var mode=null;
switch(_ee7.type){
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
StageMenuBarBinding.prototype.handleAction=function(_ee9){
StageMenuBarBinding.superclass.handleAction.call(this,_ee9);
switch(_ee9.type){
case MenuItemBinding.ACTION_COMMAND:
var _eea=_ee9.target.associatedSystemAction;
if(Application.isLoggedIn){
if(!this._rootNode){
this._rootNode=System.getRootNode();
}
if(_eea){
SystemAction.invoke(_eea,this._rootNode);
}
}
_ee9.consume();
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
var _eeb=this.getProperty("handle");
if(_eeb){
this._handle=_eeb;
if(StageBinding.isViewOpen(_eeb)){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
this.check(true);
}
}
this.oncommand=function(){
var self=this;
Application.lock(self);
setTimeout(function(){
StageBinding.handleViewPresentation(_eeb);
Application.unlock(self);
},Client.hasTransitions?Animation.DEFAULT_TIME:0);
};
}else{
throw new Error("StageViewMenuItemBinding: missing handle");
}
};
StageViewMenuItemBinding.prototype.setHandle=function(_eed){
this.setProperty("handle",_eed);
};
StageViewMenuItemBinding.prototype.handleBroadcast=function(_eee,arg){
StageViewMenuItemBinding.superclass.handleBroadcast.call(this,_eee,arg);
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
switch(_eee){
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
StageViewMenuItemBinding.newInstance=function(_ef0){
var _ef1=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_ef0);
UserInterface.registerBinding(_ef1,StageViewMenuItemBinding);
return UserInterface.getBinding(_ef1);
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
StageStatusBarBinding.prototype.setLabel=function(_ef2){
this._label.setLabel(_ef2);
};
StageStatusBarBinding.prototype.setImage=function(_ef3){
this._label.setImage(_ef3);
};
StageStatusBarBinding.prototype.clear=function(){
this._label.setLabel(null);
this._label.setImage(false);
};
StageStatusBarBinding.prototype.startFadeOut=function(_ef4){
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
var _ef5=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _ef6=_ef5.getAssociatedView();
var _ef7=_ef6.getContentWindow().bindingMap.tree;
return _ef7.getFocusedTreeNodeBindings();
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
ExplorerBinding.prototype.handleAction=function(_ef8){
ExplorerBinding.superclass.handleAction.call(this,_ef8);
var _ef9=_ef8.target;
switch(_ef8.type){
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
this._decksBinding.setSelectionByHandle(this._menuBinding.getSelectionHandle());
var tag=this._menuBinding.getSelectionTag();
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVE_CHANGED,tag);
break;
case ViewBinding.ACTION_LOADED:
this.dispatchAction(ExplorerBinding.ACTION_DECK_LOADED);
_ef8.consume();
break;
case Binding.ACTION_DRAG:
if(_ef9 instanceof ExplorerSplitterBinding){
_ef9.dragger.registerHandler(this);
}
_ef8.consume();
}
};
ExplorerBinding.prototype.setSelectionByHandle=function(_efb){
this._menuBinding.setSelectionByHandle(_efb);
};
ExplorerBinding.prototype.setSelectionDefault=function(){
this._menuBinding.setSelectionDefault();
};
ExplorerBinding.prototype.getSelectedDeckBinding=function(){
return this._decksBinding.getSelectedDeckBinding();
};
ExplorerBinding.prototype.mountDefinition=function(_efc){
if(_efc instanceof SystemViewDefinition){
this._decksBinding.mountDefinition(_efc);
this._menuBinding.mountDefinition(_efc);
}else{
throw new Error("ExplorerBinding: No such ViewDefinition supported");
}
};
ExplorerBinding.prototype.onDragStart=function(_efd){
var _efe=this._menuBinding.getDescendantBindingsByLocalName("explorertoolbarbutton");
if(_efe.hasEntries()){
var _eff=_efe.getFirst();
this._dragStart=_eff.boxObject.getLocalPosition().y;
this._dragSlot=0;
if(this._dragHeight==0){
this._dragHeight=_eff.boxObject.getDimension().h;
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
ExplorerDecksBinding.prototype.mountDefinition=function(_f03){
if(_f03 instanceof SystemViewDefinition){
var _f04=ViewBinding.newInstance(this.bindingDocument);
_f04.setType(ViewBinding.TYPE_EXPLORERVIEW);
_f04.setDefinition(_f03);
var _f05=ExplorerDeckBinding.newInstance(this.bindingDocument);
_f05.setAssociatedView(_f04);
this._decks[_f03.handle]=_f05;
_f05.add(_f04);
this.add(_f05);
_f05.attach();
_f04.attach();
}
};
ExplorerDecksBinding.prototype.setSelectionByHandle=function(_f06){
var _f07=this._decks[_f06];
this.select(_f07);
};
DecksBinding.prototype.expandBy=function(_f08){
var deck=this.getSelectedDeckBinding();
if(deck){
var _f0a=this.bindingElement.offsetHeight+_f08;
var view=deck.getAssociatedView();
this.bindingElement.style.height=_f0a+"px";
this.reflex(true);
}
};
ExplorerDecksBinding.newInstance=function(_f0c){
var _f0d=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdecks",_f0c);
return UserInterface.registerBinding(_f0d,ExplorerDecksBinding);
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
ExplorerDeckBinding.prototype.setAssociatedView=function(_f0e){
this._viewBinding=_f0e;
};
ExplorerDeckBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
ExplorerDeckBinding.prototype.select=function(){
if(!this._isExplorerDeckBindingInitialized){
Application.lock(this);
var _f0f=StringBundle.getString("ui","Website.App.StatusBar.Loading");
var _f10=this._viewBinding.getDefinition().label;
StatusBar.busy(_f0f,[_f10]);
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
ExplorerDeckBinding.prototype.handleAction=function(_f11){
ExplorerDeckBinding.superclass.handleAction.call(this,_f11);
var _f12=_f11.target;
switch(_f11.type){
case PageBinding.ACTION_INITIALIZED:
if(_f12 instanceof SystemPageBinding){
this._isExplorerDeckBindingInitialized=true;
this._entityToken=_f12.node.getEntityToken();
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
ExplorerDeckBinding.prototype.handleBroadcast=function(_f13,arg){
ExplorerDeckBinding.superclass.handleBroadcast.call(this,_f13,arg);
switch(_f13){
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
var _f15=null;
if(this._isExplorerDeckBindingInitialized){
_f15=this._viewBinding.getDefinition().label;
}else{
_f15=DockTabBinding.LABEL_TABLOADING;
}
return _f15;
};
ExplorerDeckBinding.prototype.getImage=function(){
var _f16=null;
if(this._isExplorerDeckBindingInitialized){
_f16=this._viewBinding.getDefinition().image;
}else{
_f16=DockTabBinding.IMG_TABLOADING;
}
return _f16;
};
ExplorerDeckBinding.prototype.getToolTip=function(){
var _f17=null;
if(this._isExplorerDeckBindingInitialized){
_f17=this._viewBinding.getDefinition().toolTip;
}
return _f17;
};
ExplorerDeckBinding.newInstance=function(_f18){
var _f19=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdeck",_f18);
return UserInterface.registerBinding(_f19,ExplorerDeckBinding);
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
ExplorerMenuBinding.prototype.onMemberInitialize=function(_f1a){
switch(_f1a.constructor){
case ExplorerToolBarBinding:
this._maxGroup=_f1a.getToolBarGroupByIndex(0);
break;
case ToolBarBinding:
this._minGroup=_f1a.getToolBarGroupByIndex(0);
break;
}
ExplorerMenuBinding.superclass.onMemberInitialize.call(this,_f1a);
};
ExplorerMenuBinding.prototype.mountDefinition=function(_f1b){
this._maxButtons.set(_f1b.handle,this._mountMaxButton(_f1b));
this._minButtons.set(_f1b.handle,this._mountMinButton(_f1b));
this._index++;
};
ExplorerMenuBinding.prototype._mountMaxButton=function(_f1c){
var _f1d=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_LARGE);
_f1d.setLabel(_f1c.label);
_f1d.setToolTip(_f1c.toolTip);
_f1d.handle=_f1c.handle;
_f1d.node=_f1c.node;
this._maxGroup.add(_f1d);
this._maxList.add(_f1d);
_f1d.attach();
return _f1d;
};
ExplorerMenuBinding.prototype._mountMinButton=function(_f1e){
var _f1f=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_NORMAL);
_f1f.setLabel(_f1e.label);
_f1f.setToolTip(_f1e.label);
_f1f.handle=_f1e.handle;
_f1f.node=_f1e.node;
this._minGroup.addFirst(_f1f);
this._minList.add(_f1f);
_f1f.attach();
_f1f.hide();
return _f1f;
};
ExplorerMenuBinding.prototype.handleAction=function(_f20){
ExplorerMenuBinding.superclass.handleAction.call(this,_f20);
switch(_f20.type){
case RadioGroupBinding.ACTION_SELECTIONCHANGED:
var _f21=_f20.target;
var _f22=_f21.getCheckedButtonBinding();
var _f23=_f22.handle;
switch(_f21){
case this._maxGroup:
this._minGroup.setCheckedButtonBinding(this._minButtons.get(_f23),true);
break;
case this._minGroup:
this._maxGroup.setCheckedButtonBinding(this._maxButtons.get(_f23),true);
break;
}
this._selectedHandle=_f23;
this._selectedTag=_f22.node.getTag();
this.dispatchAction(ExplorerMenuBinding.ACTION_SELECTIONCHANGED);
_f20.consume();
break;
}
};
ExplorerMenuBinding.prototype.setSelectionByHandle=function(_f24){
var _f25=this._maxButtons.get(_f24);
if(_f25){
_f25.check();
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
var _f26=false;
var max=this._maxList.getLength()-1;
if(!this._maxList.get(max).isVisible){
this._index++;
this._maxList.get(this._index).show();
this._minList.get(this._index).hide();
_f26=true;
}
return _f26;
};
ExplorerMenuBinding.prototype.showLess=function(){
var _f28=false;
if(this._maxList.get(0).isVisible){
this._maxList.get(this._index).hide();
this._minList.get(this._index).show();
this._index--;
_f28=true;
}
return _f28;
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
ExplorerToolBarBinding.newInstance=function(_f29){
var _f2a=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorertoolbar",_f29);
return UserInterface.registerBinding(_f2a,ExplorerToolBarBinding);
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
var _f2b=this.explorerToolBarButtonType==ExplorerToolBarButtonBinding.TYPE_LARGE;
var _f2c=_f2b?ToolBarBinding.IMAGESIZE_LARGE:ToolBarBinding.IMAGESIZE_NORMAL;
this.imageProfile=this.node.getImageProfile(_f2c);
ExplorerToolBarButtonBinding.superclass.onBindingAttach.call(this);
};
ExplorerToolBarButtonBinding.newInstance=function(_f2d,_f2e){
var _f2f=(_f2e==ExplorerToolBarButtonBinding.TYPE_LARGE?"ui:explorertoolbarbutton":"ui:toolbarbutton");
var _f30=DOMUtil.createElementNS(Constants.NS_UI,_f2f,_f2d);
var _f31=UserInterface.registerBinding(_f30,ExplorerToolBarButtonBinding);
_f31.explorerToolBarButtonType=_f2e;
return _f31;
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
EditorBinding.registerComponent=function(_f32,_f33){
var _f34=EditorBinding._components;
var _f35=EditorBinding._editors;
var key=_f33.key;
var _f37=Interfaces.isImplemented(IWysiwygEditorComponent,_f32);
if(!_f37){
_f37=Interfaces.isImplemented(ISourceEditorComponent,_f32);
}
if(_f37){
if(_f35.has(key)){
_f35.get(key).initializeEditorComponent(_f32);
}else{
if(!_f34.has(key)){
_f34.set(key,new List());
}
_f34.get(key).add(_f32);
}
}else{
throw "Editor component interface not implemented: "+_f32;
}
};
EditorBinding.claimComponents=function(_f38,_f39){
var _f3a=EditorBinding._components;
var _f3b=EditorBinding._editors;
var key=_f39.key;
_f3b.set(key,_f38);
var list=null;
if(_f3a.has(key)){
list=_f3a.get(key).copy();
_f3a.del(key);
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
var _f3f=this.getProperty("value");
if(_f3f!=null){
_f3f=decodeURIComponent(_f3f);
this._startContent=_f3f;
}
};
EditorBinding.prototype.onBindingDispose=function(){
EditorBinding.superclass.onBindingDispose.call(this);
var name=this.getProperty("name");
if(name!=null){
var _f41=this.bindingWindow.DataManager;
_f41.unRegisterDataBinding(name);
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
EditorBinding.prototype.initializeEditorComponents=function(_f43){
var _f44=EditorBinding.claimComponents(this,_f43);
if(_f44!=null){
while(_f44.hasNext()){
this.initializeEditorComponent(_f44.getNext());
}
}
};
EditorBinding.prototype._registerWithDataManager=function(name){
if(name&&name!=""){
var _f46=this.bindingWindow.DataManager;
if(_f46.getDataBinding(name)){
_f46.unRegisterDataBinding(name);
}
_f46.registerDataBinding(name,this);
}
};
EditorBinding.prototype.addEditorEvents=function(){
var _f47=this.getEditorDocument();
if(_f47!=null){
Application.framework(_f47);
DOMEvents.addEventListener(_f47,DOMEvents.CONTEXTMENU,this);
DOMEvents.addEventListener(_f47,DOMEvents.KEYPRESS,this);
DOMEvents.addEventListener(_f47,DOMEvents.MOUSEDOWN,this);
DOMEvents.addEventListener(_f47,DOMEvents.MOUSEMOVE,this);
}
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,{handleEvent:function(e){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}});
};
EditorBinding.prototype.checkForDirty=function(_f49){
if(!this.isDirty){
if(_f49==true){
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
var _f4b=this.getCheckSum();
if(_f4b!=this._checksum){
this.dispatchAction(Binding.ACTION_DIRTY);
this.isDirty=true;
this._checksum=_f4b;
}
};
EditorBinding.prototype.getCheckSum=function(){
var _f4c=null;
if(Binding.exists(this._pageBinding)){
_f4c=this._pageBinding.getCheckSum(this._checksum);
}
return _f4c;
};
EditorBinding.prototype.handleEvent=function(e){
EditorBinding.superclass.handleEvent.call(this,e);
var _f4e=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.CONTEXTMENU:
DOMEvents.preventDefault(e);
this._popupBinding.editorBinding=this;
this.handleContextMenu(e);
break;
case DOMEvents.KEYPRESS:
this.checkForDirty();
if(!this._isActivated){
this._activateEditor(true);
}
break;
case DOMEvents.MOUSEDOWN:
if(this instanceof BespinEditorBinding){
if(_f4e==this._bespinElement){
this.dispatchAction(Binding.ACTION_ACTIVATED);
if(!this._isActivated){
this._activateEditor(true);
}
if(DOMEvents.isRightButton(e)){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}
}
}else{
if(_f4e.ownerDocument==this.getEditorDocument()){
if(!this._isActivated){
this._activateEditor(true);
}
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
EditorBinding.prototype.handleBroadcast=function(_f50,arg){
EditorBinding.superclass.handleBroadcast.call(this,_f50,arg);
var _f52=null;
switch(_f50){
case BroadcastMessages.APPLICATION_BLURRED:
if(this._isActivated){
this._activateEditor(false);
}
break;
case BroadcastMessages.MOUSEEVENT_MOUSEUP:
if(!this.isDialogMode){
try{
var _f53=true;
if(arg instanceof Binding){
if(Interfaces.isImplemented(IEditorControlBinding,arg)==true){
if(arg.isEditorControlBinding){
_f53=false;
}
}
}else{
_f52=DOMEvents.getTarget(arg);
if(this instanceof BespinEditorBinding){
if(_f52==this._bespinElement){
_f53=false;
}
}else{
if(_f52&&_f52.ownerDocument==this.getEditorDocument()){
_f53=false;
}
}
}
if(_f53){
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
EditorBinding.prototype._activateEditor=function(_f54){
if(_f54!=this._isActivated){
this._isActivated=_f54;
EditorBinding.isActive=_f54;
var _f55=this.getEditorWindow().standardEventHandler;
var _f56=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_f56!=null){
if(_f54){
if(this.hasBookmark()){
this.deleteBookmark();
}
_f56.enable();
if(Client.isExplorer){
this._sanitizeExplorer();
}
this.focus();
_f55.enableNativeKeys(true);
}else{
_f56.disable();
_f55.disableNativeKeys();
this.blur();
}
}else{
throw "Required broadcaster not found";
}
}
};
EditorBinding.prototype._sanitizeExplorer=function(){
if(Client.isExplorer){
var _f57=this.getEditorDocument().selection.createRange();
_f57.select();
}
};
EditorBinding.prototype._sanitizeMozilla=function(){
};
EditorBinding.prototype.hasSelection=function(){
var _f58=false;
if(Client.isMozilla){
var _f59=this.getEditorWindow().getSelection();
if(_f59!=null){
_f58=_f59.toString().length>0;
if(!_f58){
var _f5a=_f59.getRangeAt(0);
var frag=_f5a.cloneContents();
var _f5c=this.getEditorDocument().createElement("element");
while(frag.hasChildNodes()){
_f5c.appendChild(frag.firstChild);
}
var img=_f5c.getElementsByTagName("img").item(0);
if(img!=null){
if(!CSSUtil.hasClassName(img,VisualEditorBinding.FUNCTION_CLASSNAME)){
_f58=true;
}
}
}
}
}else{
var _f5a=this.getEditorDocument().selection.createRange();
_f58=(_f5a&&_f5a.text)&&_f5a.text.length>0;
}
return _f58;
};
EditorBinding.prototype.isCommandEnabled=function(_f5e){
var _f5f=true;
switch(_f5e){
case "Cut":
case "Copy":
case "Paste":
_f5f=this.getEditorDocument().queryCommandEnabled(_f5e);
break;
}
return _f5f;
};
EditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _f63=false;
this.restoreBookmark();
switch(cmd){
case "Cut":
case "Copy":
case "Paste":
var _f64=null;
if(cmd=="Paste"){
_f64=null;
}else{
_f64=this.hasSelection();
}
try{
this.getEditorDocument().execCommand(cmd,gui,_f64);
}
catch(mozillaSecurityException){
if(Client.isMozilla==true){
Dialog.invokeModal(EditorBinding.URL_DIALOG_MOZ_CONFIGURE);
}else{
throw "Clipboard operation malfunction. Contact your developer.";
}
}
finally{
_f63=true;
}
break;
}
return _f63;
};
EditorBinding.prototype.getButtonForCommand=function(cmd){
var _f66=this.getContentWindow().bindingMap.toolbar;
var _f67=_f66.getButtonForCommand(cmd);
if(!_f67){
throw "No button for command "+cmd;
}
return _f67;
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
var _f6a=this.getContentDocument().getElementById("focusableinput");
if(_f6a!=null){
_f6a.style.display="block";
FocusBinding.focusElement(_f6a);
_f6a.style.display="none";
}else{
throw "Required element not found: focusableinput";
}
};
EditorBinding.prototype.handleAction=function(_f6b){
EditorBinding.superclass.handleAction.call(this,_f6b);
var _f6c=_f6b.target;
var self=this;
var _f6e=this.shadowTree.iframe;
switch(_f6b.type){
case Binding.ACTION_DIRTY:
if(_f6b.target!=this){
this.checkForDirty();
}
break;
}
};
EditorBinding.prototype._onPageInitialize=function(_f6f){
if(this._pageBinding==null){
this.reflex();
if(this._coverBinding!=null&&this._coverBinding.isVisible){
this._coverBinding.hide();
}
}
EditorBinding.superclass._onPageInitialize.call(this,_f6f);
};
EditorBinding.prototype.handleElement=function(_f70){
return true;
};
EditorBinding.prototype.updateElement=function(_f71){
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
this._menuGroups[rel].each(function(_f74){
_f74.show();
});
};
EditorPopupBinding.prototype._hideMenuGroups=function(rel){
this._menuGroups[rel].each(function(_f76){
_f76.hide();
});
};
EditorPopupBinding.prototype.handleAction=function(_f77){
EditorPopupBinding.superclass.handleAction.call(this,_f77);
var _f78=_f77.target;
if(_f77.type==MenuItemBinding.ACTION_COMMAND){
this.hide();
var cmd=_f78.getProperty("cmd");
var gui=_f78.getProperty("gui");
var val=_f78.getProperty("val");
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
var _f7c=this.bindingWindow.bindingMap.tinywindow;
var _f7d=this.bindingWindow.bindingMap.codepresswindow;
if(_f7c){
EditorBinding.registerComponent(this,_f7c);
}else{
if(_f7d){
EditorBinding.registerComponent(this,_f7d);
}
}
};
EditorClickButtonBinding.prototype.buildDOMContent=function(){
EditorClickButtonBinding.superclass.buildDOMContent.call(this);
this._buildDesignModeSanitizer();
};
EditorClickButtonBinding.prototype.initializeComponent=function(_f7e,_f7f,_f80,_f81){
this._editorBinding=_f7e;
this._tinyEngine=_f7f;
this._tinyInstance=_f80;
this._tinyTheme=_f81;
this._setupEditorBookmarking();
};
EditorClickButtonBinding.prototype.initializeSourceEditorComponent=function(_f82,_f83,_f84){
this._editorBinding=_f82;
this._codePressFrame=_f83;
this._codePressEngine=_f84;
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
var _f86=this._editorBinding;
if(_f86!=null){
var self=this;
var _f88={handleEvent:function(e){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(!_f86.hasBookmark()){
_f86.createBookmark();
}
break;
case DOMEvents.MOUSEUP:
if(self.isEditorSimpleControl){
if(self.popupBinding==null){
if(_f86.hasBookmark()){
_f86.restoreBookmark();
}
}
}
break;
}
}};
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,_f88);
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEUP,_f88);
}
};
EditorClickButtonBinding.newInstance=function(_f8a){
var _f8b=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_f8a);
return UserInterface.registerBinding(_f8b,EditorClickButtonBinding);
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
EditorToolBarButtonBinding.newInstance=function(_f8c){
var _f8d=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_f8c);
return UserInterface.registerBinding(_f8d,EditorToolBarButtonBinding);
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
var _f8e=this.bindingWindow.bindingMap.tinywindow;
EditorBinding.registerComponent(this,_f8e);
EditorSelectorBinding.superclass.onBindingAttach.call(this);
};
EditorSelectorBinding.prototype.buildButton=function(){
EditorSelectorBinding.superclass.buildButton.call(this);
this._buttonBinding.isEditorSimpleControl=false;
if(this.isEditorControlBinding==false){
this._buttonBinding.isEditorControlBinding=false;
}
};
EditorSelectorBinding.prototype.initializeComponent=function(_f8f,_f90,_f91,_f92){
this._editorBinding=_f8f;
this._tinyEngine=_f90;
this._tinyInstance=_f91;
this._tinyTheme=_f92;
};
EditorSelectorBinding.prototype.handleAction=function(_f93){
EditorSelectorBinding.superclass.handleAction.call(this,_f93);
switch(_f93.type){
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
EditorSelectorBinding.superclass.handleAction.call(this,_f93);
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
EditorMenuItemBinding.newInstance=function(_f96){
var _f97=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_f96);
return UserInterface.registerBinding(_f97,EditorMenuItemBinding);
};
VisualEditorBinding.prototype=new EditorBinding;
VisualEditorBinding.prototype.constructor=VisualEditorBinding;
VisualEditorBinding.superclass=EditorBinding.prototype;
VisualEditorBinding.FUNCTION_CLASSNAME="compositeFunctionWysiwygRepresentation";
VisualEditorBinding.FIELD_CLASSNAME="compositeFieldReferenceWysiwygRepresentation";
VisualEditorBinding.ACTION_INITIALIZED="visualeditor initialized";
VisualEditorBinding.DEFAULT_CONTENT="<p><br/></p>";
VisualEditorBinding.DEFAULT_STYLESHEET=Resolver.resolve("${root}/content/misc/editors/visualeditor/tinymce.css");
VisualEditorBinding.URL_DIALOG_CONTENTERROR="${root}/content/dialogs/wysiwygeditor/errors/contenterror.aspx";
VisualEditorBinding.XHTML="<html xmlns=\"http://www.w3.org/1999/xhtml\">\n\t<head>${head}</head>\n\t<body>\n${body}\n\t</body>\n</html>";
VisualEditorBinding.getTinyLessClassName=function(_f98){
var i=0,_f9a,_f9b="",_f9c=_f98.split(" ");
while((_f9a=_f9c[i])!=null){
if(_f9a.length>=3&&_f9a.substring(0,3)=="mce"){
_f9a="";
}else{
if(_f9a.length>=14&&_f9a.substring(0,14)=="compositemedia"){
_f9a="";
}
}
_f9b+=_f9a;
if(_f9c[i+1]){
_f9b+=" ";
}
i++;
}
return _f9b;
};
VisualEditorBinding.getStructuredContent=function(_f9d){
var _f9e=null;
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.TinyContentToStructuredContent(_f9d);
if(soap instanceof SOAPFault){
}else{
_f9e=soap.XhtmlFragment;
if(!_f9e){
_f9e="";
}
}
WebServiceProxy.isFaultHandler=true;
return _f9e;
};
VisualEditorBinding.getTinyContent=function(_fa0,_fa1){
var _fa2=null;
if(_fa0==null||_fa0==""){
_fa0=VisualEditorBinding.DEFAULT_CONTENT;
}
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.StructuredContentToTinyContent(_fa0);
if(soap instanceof SOAPFault){
var _fa4=soap;
var _fa5={handleDialogResponse:function(){
_fa1.dispatchAction(Binding.ACTION_VALID);
}};
Dialog.invokeModal(VisualEditorBinding.URL_DIALOG_CONTENTERROR,_fa5,_fa4);
}else{
_fa2=soap.XhtmlFragment;
if(_fa2==null){
_fa2=new String("");
}
}
WebServiceProxy.isFaultHandler=true;
return _fa2;
};
VisualEditorBinding.extractByIndex=function(html,_fa7){
var _fa8=null;
var doc=XMLParser.parse(html);
if(doc!=null){
var _faa=new List(doc.documentElement.childNodes);
var _fab=new List();
_faa.each(function(_fac){
if(_fac.nodeType==Node.ELEMENT_NODE){
_fab.add(_fac);
}
});
var _fad=_fab.get(_fa7);
if(_fad==null){
if(Application.isDeveloperMode){
alert("VisualEditorBinding: Bad HTML!"+"\n\n"+html);
}
}else{
if(_fad.hasChildNodes()){
var frag=doc.createDocumentFragment();
while(_fad.hasChildNodes()){
frag.appendChild(_fad.firstChild);
}
doc.removeChild(doc.documentElement);
doc.appendChild(DOMUtil.createElementNS(Constants.NS_XHTML,"ROOT",doc));
doc.documentElement.appendChild(frag);
_fa8=DOMSerializer.serialize(doc.documentElement);
_fa8=_fa8.substring(_fa8.indexOf(">")+1,_fa8.length);
_fa8=_fa8.substring(0,_fa8.lastIndexOf("<"));
}
}
}
if(_fa8==null){
_fa8=new String("");
}
return _fa8;
};
function VisualEditorBinding(){
this.logger=SystemLogger.getLogger("VisualEditorBinding");
this.action_initialized=VisualEditorBinding.ACTION_INITIALIZED;
this.url_default="${root}/content/misc/editors/visualeditor/visualeditor.aspx";
this._tinyEngine=null;
this._tinyInstance=null;
this._tinyTheme=null;
this.formattingConfiguration=null;
this.elementClassConfiguration=null;
this.embedableFieldConfiguration=null;
this.defaultStylesheet=VisualEditorBinding.DEFAULT_STYLESHEET;
this.configurationStylesheet=null;
this.presentationStylesheet=null;
this._head=null;
return this;
}
VisualEditorBinding.prototype.onBindingRegister=function(){
VisualEditorBinding.superclass.onBindingRegister.call(this);
StringBundle.getString("Composite.Web.VisualEditor","Preload.Key");
};
VisualEditorBinding.prototype.onBindingAttach=function(){
VisualEditorBinding.superclass.onBindingAttach.call(this);
this.subscribe(BroadcastMessages.TINYMCE_INITIALIZED);
this.subscribe(BroadcastMessages.VISUALEDITOR_HACKED);
this._parseDOMProperties();
};
VisualEditorBinding.prototype.toString=function(){
return "[VisualEditorBinding]";
};
VisualEditorBinding.prototype._parseDOMProperties=function(){
var _faf=this.getProperty("presentationstylesheet");
if(_faf!=null){
this.presentationStylesheet=_faf;
}
var _fb0=this.getProperty("configurationstylesheet");
if(_fb0!=null){
this.configurationStylesheet=_fb0;
}
var _fb1=this.getProperty("formattingconfiguration");
if(_fb1!=null){
this.formattingConfiguration=VisualEditorFormattingConfiguration.getConfiguration(_fb1);
}
var _fb2=this.getProperty("elementclassconfiguration");
if(_fb2!=null){
this.elementClassConfiguration=VisualEditorElementClassConfiguration.getConfiguration(_fb2);
}
var _fb3=this.getProperty("embedablefieldstypenames");
if(_fb3!=null){
this.embedableFieldConfiguration=VisualEditorFieldGroupConfiguration.getConfiguration(_fb3);
}
};
VisualEditorBinding.prototype.handleBroadcast=function(_fb4,arg){
VisualEditorBinding.superclass.handleBroadcast.call(this,_fb4,arg);
var _fb6=this.getContentWindow().bindingMap.tinywindow;
var _fb7=_fb6.getContentWindow();
switch(_fb4){
case BroadcastMessages.VISUALEDITOR_HACKED:
if(arg.broadcastWindow==_fb7){
this._startContent=this.normalizeToDocument(this._startContent);
this.extractHead(this._startContent);
this._startContent=this.extractBody(this._startContent);
arg.textareaElement.value=VisualEditorBinding.getTinyContent(this._startContent);
this.unsubscribe(BroadcastMessages.VISUALEDITOR_HACKED);
}
break;
case BroadcastMessages.TINYMCE_INITIALIZED:
if(arg.broadcastWindow==_fb7){
this._tinyEngine=arg.tinyEngine;
this._tinyInstance=arg.tinyInstance;
this._tinyTheme=arg.tinyTheme;
this._tinyTheme.initC1(this,this._tinyEngine,this._tinyInstance);
this.initializeEditorComponents(_fb6);
this._initialize();
this.unsubscribe(BroadcastMessages.TINYMCE_INITIALIZED);
}
break;
}
};
VisualEditorBinding.prototype.initializeEditorComponent=function(_fb8){
_fb8.initializeComponent(this,this._tinyEngine,this._tinyInstance,this._tinyTheme);
};
VisualEditorBinding.prototype._finalize=function(){
VisualEditorBinding.superclass._finalize.call(this);
this._maybeShowEditor();
};
VisualEditorBinding.prototype._onPageInitialize=function(_fb9){
VisualEditorBinding.superclass._onPageInitialize.call(this,_fb9);
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
VisualEditorBinding.prototype.normalizeToDocument=function(_fbc){
var _fbd=_fbc;
if(!this._isNormalizedDocument(_fbc)){
_fbc="\t\t"+_fbc.replace(/\n/g,"\n\t\t");
_fbd=VisualEditorBinding.XHTML.replace("${head}",this._getHeadSection()).replace("${body}",_fbc);
}
return _fbd;
};
VisualEditorBinding.prototype._isNormalizedDocument=function(_fbe){
var _fbf=false;
var doc=XMLParser.parse(_fbe,true);
if(doc!=null){
if(doc.documentElement.nodeName=="html"){
_fbf=true;
}
}
return _fbf;
};
VisualEditorBinding.prototype._getHeadSection=function(){
return this._head!=null?this._head:new String("");
};
VisualEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _fc4=VisualEditorBinding.superclass.handleCommand.call(this,cmd,gui,val);
if(!_fc4){
try{
this._tinyInstance.execCommand(cmd,gui,val);
this.checkForDirty();
}
catch(e){
SystemDebug.stack(arguments);
}
_fc4=true;
}
return _fc4;
};
VisualEditorBinding.prototype.handleContextMenu=function(e){
var _fc6=DOMEvents.getTarget(e);
this._popupBinding.configure(this._tinyInstance,this._tinyEngine,_fc6);
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
if(this._bookmark!=null){
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
VisualEditorBinding.prototype.setValue=function(_fc7){
if(this._isFinalized){
if(Binding.exists(this._pageBinding)){
this._pageBinding.setContent(_fc7);
}
}else{
if(this._startContent==null){
this._startContent=_fc7;
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
VisualEditorBinding.prototype.setResult=function(_fc8){
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
this._isRenderingSelected=false;
}
VisualEditorPopupBinding.prototype.toString=function(){
return "[VisualEditorPopupBinding]";
};
VisualEditorPopupBinding.prototype.configure=function(_fc9,_fca,_fcb){
var _fcc=this.editorBinding.hasSelection();
this.tinyInstance=_fc9;
this.tinyEngine=_fca;
this.tinyElement=_fcb;
this.hasSelection=_fcc;
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
var _fd0=false;
if(this.hasSelection){
_fd0=true;
}else{
if(this.tinyElement){
if(this.tinyElement.nodeName=="A"&&!this.tinyElement.getAttribute("name")){
_fd0=true;
}else{
if(this.tinyElement.nodeName=="IMG"){
_fd0=true;
}
}
}
}
if(_fd0){
this._showMenuGroups("link");
this._configureLinkGroupDetails();
}else{
this._hideMenuGroups("link");
}
};
VisualEditorPopupBinding.prototype._configureLinkGroupDetails=function(){
var _fd1=this.getMenuItemForCommand("compositeInsertLink");
var _fd2=this.getMenuItemForCommand("unlink");
var _fd3=this.editorBinding.getButtonForCommand("compositeInsertLink");
var _fd4=this.editorBinding.getButtonForCommand("unlink");
_fd2.setDisabled(_fd4.isDisabled);
if(_fd2.isDisabled){
_fd1.setLabel("Link");
}else{
_fd1.setLabel("Link properties");
}
};
VisualEditorPopupBinding.prototype._configureInsertGroup=function(){
var _fd5=this.editorBinding.embedableFieldConfiguration;
var item=this.getMenuItemForCommand("compositeInsertFieldParent");
var doc=this.bindingDocument;
if(item){
item.dispose();
}
item=MenuItemBinding.newInstance(doc);
item.setLabel("Field");
item.image="${icon:fields}";
item.imageDisabled="${icon:fields-disabled}";
item.setProperty("cmd","compositeInsertFieldParent");
if(_fd5){
var _fd8=_fd5.getGroupNames();
if(_fd8.hasEntries()){
var _fd9=MenuPopupBinding.newInstance(doc);
var body=_fd9.add(MenuBodyBinding.newInstance(doc));
var _fdb=body.add(MenuGroupBinding.newInstance(doc));
_fd8.each(function(_fdc){
var _fdd=_fd5.getFieldNames(_fdc);
_fdd.each(function(_fde){
var i=_fdb.add(MenuItemBinding.newInstance(doc));
i.setLabel(_fde);
i.setImage("${icon:field}");
i.setProperty("cmd","compositeInsertField");
i.setProperty("val",_fdc+":"+_fde);
_fdb.add(i);
});
});
item.add(_fd9);
}
}else{
item.disable();
}
this._menuGroups["insertions"].getFirst().add(item);
item.attachRecursive();
this._menuItems["compositeInsertFieldParent"]=item;
};
VisualEditorPopupBinding.prototype._configureTableGroup=function(){
var _fe0=this.tinyInstance.dom.getParent(this.tinyElement,"table,td");
var _fe1=null;
var _fe2=null;
if(_fe0){
if(_fe0.nodeName=="TD"){
_fe1=_fe0.getAttribute("colspan");
_fe2=_fe0.getAttribute("rowspan");
}
this._menuItems["mceTableSplitCells"].setDisabled(_fe1=="1"&&_fe2=="1");
this._menuItems["mceTablePasteRowBefore"].setDisabled(this.tinyInstance.tableRowClipboard==null);
this._menuItems["mceTablePasteRowAfter"].setDisabled(this.tinyInstance.tableRowClipboard==null);
}
if(_fe0){
this._showMenuGroups("table");
}else{
this._hideMenuGroups("table");
}
};
VisualEditorPopupBinding.prototype._configureRenderingGroup=function(){
var _fe3=this._isRendering();
if(_fe3){
this._showMenuGroups("rendering");
}else{
this._hideMenuGroups("rendering");
}
this._isRenderingSelected=_fe3;
};
VisualEditorPopupBinding.prototype._configureFieldGroup=function(){
var _fe4=this._isField();
if(_fe4){
this._showMenuGroups("field");
}else{
this._hideMenuGroups("field");
}
this._isFieldSelected=_fe4;
};
VisualEditorPopupBinding.prototype._configureImageGroup=function(){
if(this._isImage()&&!this._isRenderingSelected&&!this._isFieldSelected){
this._showMenuGroups("image");
}else{
this._hideMenuGroups("image");
}
};
VisualEditorPopupBinding.prototype._isImage=function(){
var _fe5=false;
if(!this.hasSelection){
_fe5=this.tinyElement&&this.tinyElement.nodeName=="IMG";
}
return _fe5;
};
VisualEditorPopupBinding.prototype._isRendering=function(){
return this._isImage()&&CSSUtil.hasClassName(this.tinyElement,VisualEditorBinding.FUNCTION_CLASSNAME);
};
VisualEditorPopupBinding.prototype._isField=function(){
return this._isImage()&&CSSUtil.hasClassName(this.tinyElement,VisualEditorBinding.FIELD_CLASSNAME);
};
VisualEditorElementClassConfiguration._configurations=new Map();
VisualEditorElementClassConfiguration.getConfiguration=function(_fe6){
var _fe7=VisualEditorElementClassConfiguration._configurations;
if(!_fe7.has(_fe6)){
_fe7.set(_fe6,new VisualEditorElementClassConfiguration(EditorConfigurationService.GetElementClassConfiguration(_fe6)));
}
return _fe7.get(_fe6);
};
function VisualEditorElementClassConfiguration(doc){
this.logger=SystemLogger.getLogger("VisualEditorElementClassConfiguration");
this._elements={};
var _fe9=new XPathResolver();
var _fea=_fe9.resolveAll("elements/element",doc);
while(_fea.hasNext()){
var _feb=_fea.getNext();
var _fec=_feb.getAttribute("name");
this._elements[_fec]=new List();
var _fed=_fe9.resolveAll("class",_feb);
while(_fed.hasNext()){
var _fee=_fed.getNext().getAttribute("name");
this._elements[_fec].add(_fee);
}
}
}
VisualEditorElementClassConfiguration.prototype.getClassNamesForElement=function(name){
var _ff0=null;
if(this._elements[name]){
_ff0=this._elements[name].copy();
}else{
_ff0=new List();
}
return _ff0;
};
VisualEditorFormattingConfiguration._configurations=new Map();
VisualEditorFormattingConfiguration._options=null;
VisualEditorFormattingConfiguration.getConfiguration=function(_ff1){
var _ff2=VisualEditorFormattingConfiguration._configurations;
if(!_ff2.has(_ff1)){
_ff2.set(_ff1,new VisualEditorFormattingConfiguration());
}
return _ff2.get(_ff1);
};
VisualEditorFormattingConfiguration._getOptions=function(){
if(VisualEditorFormattingConfiguration._options==null){
var p="Composite.Web.VisualEditor";
VisualEditorFormattingConfiguration._options={"p":StringBundle.getString(p,"FormatSelector.LabelParagraph"),"address":StringBundle.getString(p,"FormatSelector.LabelAddress"),"blockquote":StringBundle.getString(p,"FormatSelector.LabelBlockQuote"),"div":StringBundle.getString(p,"FormatSelector.LabelDivision"),"h1":StringBundle.getString(p,"FormatSelector.LabelHeading1"),"h2":StringBundle.getString(p,"FormatSelector.LabelHeading2"),"h3":StringBundle.getString(p,"FormatSelector.LabelHeading3"),"h4":StringBundle.getString(p,"FormatSelector.LabelHeading4"),"h5":StringBundle.getString(p,"FormatSelector.LabelHeading5"),"h6":StringBundle.getString(p,"FormatSelector.LabelHeading6")};
}
return VisualEditorFormattingConfiguration._options;
};
function VisualEditorFormattingConfiguration(_ff4){
this._options=VisualEditorFormattingConfiguration._getOptions();
}
VisualEditorFormattingConfiguration.prototype.getFormattingOptions=function(){
return this._options;
};
VisualEditorFieldGroupConfiguration._configurations=new Map();
VisualEditorFieldGroupConfiguration.getConfiguration=function(_ff5){
var _ff6=null;
var _ff7=VisualEditorFieldGroupConfiguration._configurations;
if(!_ff7.has(_ff5)){
_ff7.set(_ff5,new VisualEditorFieldGroupConfiguration(EditorConfigurationService.GetEmbedableFieldGroupConfigurations(_ff5)));
}
return _ff7.get(_ff5);
};
function VisualEditorFieldGroupConfiguration(_ff8){
var _ff9=new Map();
new List(_ff8).each(function(_ffa){
var map=new Map();
new List(_ffa.Fields).each(function(_ffc){
map.set(_ffc.Name,{xhtml:_ffc.XhtmlRepresentation,xml:_ffc.XhtmlRepresentation});
});
_ff9.set(_ffa.GroupName,map);
});
this._groups=_ff9;
}
VisualEditorFieldGroupConfiguration.prototype.getGroupNames=function(){
return this._groups.toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getFieldNames=function(_ffd){
return this._groups.get(_ffd).toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getTinyMarkup=function(_ffe,_fff){
return this._groups.get(_ffe).get(_fff).xhtml;
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
var _1001=this.getDescendantElementsByLocalName("textarea");
while(_1001.hasNext()){
var _1002=_1001.getNext();
if(_1002.getAttribute("selected")=="true"){
this._startContent=_1002.value;
this._textareaname=_1002.getAttribute("placeholderid");
}
}
if(this._startContent==null){
this._startContent=VisualEditorBinding.DEFAULT_CONTENT;
}
};
VisualMultiEditorBinding.prototype._initialize=function(){
var self=this;
this._registerWithDataManager("generated"+KeyMaster.getUniqueKey());
var _1004=this.getContentWindow().bindingMap.templatetree;
_1004.addActionListener(TreeBinding.ACTION_SELECTIONCHANGED,{handleAction:function(_1005){
var _1006=_1004.getSelectedTreeNodeBindings().getFirst();
self._placeHolderSelected(_1006.textareaname);
_1005.consume();
}});
_1004.addActionListener(Binding.ACTION_FOCUSED,{handleAction:function(_1007){
self._activateEditor(false);
}});
this._updatePlaceHolders();
var _1008=this.getContentWindow().bindingMap.toolsplitter;
_1008.unCollapse();
VisualMultiEditorBinding.superclass._initialize.call(this);
};
VisualMultiEditorBinding.prototype._updatePlaceHolders=function(){
templatetree=this.getContentWindow().bindingMap.templatetree;
var _1009=this.getDescendantElementsByLocalName("textarea");
templatetree.empty();
if(_1009.hasEntries()){
this._hasPlaceHolders=true;
this._parsePlaceHolders(_1009);
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
VisualMultiEditorBinding.prototype._parsePlaceHolders=function(_100a){
this._textareas=new Map();
while(_100a.hasNext()){
var _100b=_100a.getNext();
var _100c=_100b.getAttribute("placeholderid");
this._textareas.set(_100c,{placeholderid:_100c,placeholdername:_100b.getAttribute("placeholdername"),placeholdermarkup:_100b.value,textareaelement:_100b,isSelected:_100b.getAttribute("selected")=="true"});
}
var _100d=new Map();
this._textareas.each(function(name,_100f){
var _1010=templatetree.add(TreeNodeBinding.newInstance(templatetree.bindingDocument));
_1010.setLabel(_100f.placeholdername);
_1010.setImage("${icon:placeholder}");
_1010.setProperty("placeholder",true);
_1010.textareaname=name;
_100d.set(_100f.placeholdername,_1010);
if(_100f.isSelected){
selected=_1010;
}
});
templatetree.attachRecursive();
if(selected!=null){
var _1011=this._textareas.get(selected.textareaname);
this._textareaname=selected.textareaname;
this._placeholdername=_1011.placeholdername;
this._setContentFromPlaceHolder(selected.textareaname);
selected.focus();
}
};
VisualMultiEditorBinding.prototype._noPlaceHolders=function(){
var _1012=this.getContentWindow().bindingMap.templatetree;
var _1013=_1012.add(TreeNodeBinding.newInstance(_1012.bindingDocument));
_1013.setLabel(StringBundle.getString("Composite.Web.VisualEditor","TemplateTree.NoTemplateWarning"));
_1013.setImage("${icon:warning}");
_1013.attach();
var _1014=this.getContentWindow().bindingMap.statusbar;
_1014.setPlaceHolderName(null);
};
VisualMultiEditorBinding.prototype._setContentFromPlaceHolder=function(name){
if(this._isFinalized==true){
var _1016=this._textareas.get(name);
var _1017=_1016.placeholdermarkup;
this.setValue(this.normalizeToDocument(_1017));
this.resetUndoRedo();
}
};
VisualMultiEditorBinding.prototype._placeHolderSelected=function(_1018){
if(this._isFinalized==true){
if(this._textareaname&&this._textareas.has(this._textareaname)){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
}
}
this._textareaname=_1018;
this._placeholdername=this._textareas.get(this._textareaname).placeholdername;
var _1019=this.getContentWindow().bindingMap.statusbar;
_1019.setPlaceHolderName(this._placeholdername);
if(this._isFinalized==true){
var self=this;
Application.lock(self);
setTimeout(function(){
self._setContentFromPlaceHolder(_1018);
Application.unlock(self);
},0);
}
};
VisualMultiEditorBinding.prototype.extractHead=function(html){
VisualMultiEditorBinding.superclass.extractHead.call(this,html);
this._heads.set(this._textareaname,this._head);
};
VisualMultiEditorBinding.prototype._getHeadSection=function(){
var _101c="";
if(this._heads.has(this._textareaname)){
_101c=this._heads.get(this._textareaname);
if(_101c==null){
_101c=new String("");
}
}
return _101c;
};
VisualMultiEditorBinding.prototype.manifest=function(){
if(this._textareas!=null&&this._textareas.hasEntries()){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
this._textareas.each(function(name,_101e){
_101e.textareaelement.value=_101e.placeholdermarkup;
});
}
};
VisualMultiEditorBinding.prototype.updateElement=function(_101f,_1020){
var _1021=_101f.getElementsByTagName("div").item(0);
var _1022=_1020.getElementsByTagName("div").item(0);
var _1023=new List(_1021.getElementsByTagName("textarea"));
var _1024=new List(_1022.getElementsByTagName("textarea"));
var _1025=false;
if(_1023.getLength()!=_1024.getLength()){
_1025=true;
}else{
var index=0;
_1023.each(function(_1027,index){
var _1029=_1024.get(index);
var newid=_1027.getAttribute("placeholderid");
var oldid=_1029.getAttribute("placeholderid");
var _102c=_1027.getAttribute("placeholdername");
var _102d=_1029.getAttribute("placeholdername");
if(newid!=oldid||_102c!=_102d){
_1025=true;
}
return !_1025;
});
}
if(_1025){
var html=null;
if(_1021.innerHTML!=null){
html=_1021.innerHTML;
}else{
html=DOMSerializer.serialize(_1021);
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
var _1031=this.getDescendantBindingByLocalName("selector");
_1031.attach();
this._populateTemplateSelector();
var _1032=this.getContentWindow().bindingMap.templateselector;
_1032.addActionListener(SelectorBinding.ACTION_SELECTIONCHANGED,{handleAction:function(){
setTimeout(function(){
self._onTemplateSelectionChanged();
},0);
}});
this.getContentWindow().bindingMap.templatetoolbar.show();
VisualMultiTemplateEditorBinding.superclass._initialize.call(this);
};
VisualMultiTemplateEditorBinding.prototype._populateTemplateSelector=function(){
var _1033=this.getDescendantBindingByLocalName("selector");
var _1034=this.getContentWindow().bindingMap.templateselector;
_1033.selections.each(function(_1035){
_1035.imageProfile=new ImageProfile({image:"${icon:page-template-template}"});
});
_1034.populateFromList(_1033.selections);
};
VisualMultiTemplateEditorBinding.prototype._onTemplateSelectionChanged=function(){
var _1036=this.getDescendantBindingByLocalName("selector");
var _1037=this.getContentWindow().bindingMap.templateselector;
_1036.selectByValue(_1037.getValue());
_1036.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
this.checkForDirty(true);
};
VisualMultiTemplateEditorBinding.prototype._parsePlaceHolders=function(_1038){
var nev=this._textareas;
var old=this._oldtextareas;
if(nev!=null){
nev.each(function(key,value){
old.set(key,value);
});
}
this._textareas=new Map();
function compute(_103d,_103e){
var _103f=_103e;
if(old.has(_103d)){
_103f=old.get(_103d).placeholdermarkup;
}
return _103f;
}
while(_1038.hasNext()){
var _1040=_1038.getNext();
var _1041=_1040.getAttribute("placeholderid");
this._textareas.set(_1041,{placeholderid:_1041,placeholdername:_1040.getAttribute("placeholdername"),placeholdermarkup:compute(_1041,_1040.value),textareaelement:_1040,isSelected:_1040.getAttribute("selected")=="true"});
}
var _1042=null;
var _1043=this.getContentWindow().bindingMap.templatetree;
var _1044=new Map();
this._textareas.each(function(name,_1046){
var _1047=_1043.add(TreeNodeBinding.newInstance(_1043.bindingDocument));
_1047.setLabel(_1046.placeholdername);
_1047.setImage("${icon:placeholder}");
_1047.setProperty("placeholder",true);
_1047.textareaname=name;
_1044.set(_1046.placeholdername,_1047);
if(_1046.isSelected){
_1042=_1047;
}
});
_1043.attachRecursive();
if(_1042!=null){
var _1048=true;
if(this._oldtextareas.hasEntries()){
_1048=false;
var map=new Map();
this._textareas.each(function(id,_104b){
map.set(_104b.placeholdername,true);
});
if(!map.has(this._placeholdername)){
_1048=true;
}
}
if(_1048){
var _104c=this._textareas.get(_1042.textareaname);
this._textareaname=_1042.textareaname;
this._placeholdername=_104c.placeholdername;
this._setContentFromPlaceHolder(_1042.textareaname);
_1042.focus();
}else{
var _104d=_1044.get(this._placeholdername);
this._textareaname=_104d.textareaname;
_104d.focus();
}
}
};
VisualMultiTemplateEditorBinding.prototype.updateElement=function(_104e,_104f){
var _1050=_104e.getElementsByTagName("ui:selector").item(0);
var _1051=_104f.getElementsByTagName("ui:selector").item(0);
var _1052=false;
if(_1050!=null&&_1051!=null){
var _1053=new List(_1050.getElementsByTagName("ui:selection"));
var _1054=new List(_1051.getElementsByTagName("ui:selection"));
if(_1053.getLength()!=_1054.getLength()){
_1052=true;
}else{
_1053.each(function(_1055,index){
var _1057=_1055.getAttribute("value");
var _1058=_1054.get(index).getAttribute("value");
if(_1057!=_1058){
_1052=true;
}
return !_1052;
});
}
}
if(_1052){
var div=this.bindingElement.getElementsByTagName("div").item(1);
this.bindingWindow.DocumentManager.detachBindings(div,true);
div.innerHTML=DOMSerializer.serialize(_1050);
this.bindingWindow.DocumentManager.attachBindings(div);
this._populateTemplateSelector();
}
return VisualMultiTemplateEditorBinding.superclass.updateElement.call(this,_104e,_104f);
};
BespinEditorPopupBinding.prototype=new EditorPopupBinding;
BespinEditorPopupBinding.prototype.constructor=BespinEditorPopupBinding;
BespinEditorPopupBinding.superclass=EditorPopupBinding.prototype;
BespinEditorPopupBinding.CONTENT_TEMPLATE="sourceeditor/popup.xml";
function BespinEditorPopupBinding(){
this.logger=SystemLogger.getLogger("BespinEditorPopupBinding");
this._editorBinding=null;
this._codePressFrame=null;
this._codePressEngine=null;
}
BespinEditorPopupBinding.prototype.toString=function(){
return "[BespinEditorPopupBinding]";
};
BespinEditorPopupBinding.prototype.configure=function(_105a,frame,_105c){
this._editorBinding=_105a;
this._codePressFrame=frame;
this._codePressEngine=_105c;
WysiwygEditorPopupBinding.superclass.configure.call(this);
};
BespinEditorPopupBinding.prototype._configure=function(){
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
BespinEditorPopupBinding.prototype.handleCommand=function(cmd,gui,val){
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
BespinEditorBinding.prototype=new EditorBinding;
BespinEditorBinding.prototype.constructor=BespinEditorBinding;
BespinEditorBinding.superclass=EditorBinding.prototype;
BespinEditorBinding.ACTION_INITIALIZED="bespineditor initialized";
BespinEditorBinding.syntax={TEXT:"text",XML:"xml",XSL:"xsl",HTML:"html",CSS:"css",JAVASCRIPT:"js",CSHARP:"cs",SQL:"sql"};
function BespinEditorBinding(){
this.logger=SystemLogger.getLogger("BespinEditorBinding");
this.action_initialized=BespinEditorBinding.ACTION_INITIALIZED;
this.url_default="${root}/content/misc/editors/bespineditor/bespineditor.aspx";
this._editorWindowBinding=null;
this._bespinEditor=null;
this._bespinEnvelope=null;
this._bespinElement=null;
this.syntax=new String(BespinEditorBinding.syntax.TEXT);
this._isPlainEditMode=false;
this.isFocusable=true;
this._isEmbedded=false;
this._hasStrictValidation=false;
this._validator=null;
this._startContent="";
return this;
}
BespinEditorBinding.prototype.toString=function(){
return "[BespinEditorBinding]";
};
BespinEditorBinding.prototype.onBindingRegister=function(){
BespinEditorBinding.superclass.onBindingRegister.call(this);
StringBundle.getString("Composite.Web.SourceEditor","Preload.Key");
};
BespinEditorBinding.prototype.onBindingAttach=function(){
if(Client.isMozilla==true){
this.subscribe(BroadcastMessages.BESPIN_LOADED);
}
if(this.getProperty("embedded")==true){
this._isEmbedded=true;
}
var _1062=this.getProperty("validate");
if(_1062==true){
this._hasStrictValidation=true;
}
var _1063=this.getProperty("validator");
if(_1063!=null){
this._validator=_1063;
}
this.syntax=this.getProperty("syntax");
switch(this.syntax){
case BespinEditorBinding.syntax.XML:
case BespinEditorBinding.syntax.XSL:
this.syntax=BespinEditorBinding.syntax.HTML;
break;
}
if(this.getProperty("debug")){
this._startContent=Templates.getPlainText("sourcecodeeditor/"+this.syntax+".txt");
}
BespinEditorBinding.superclass.onBindingAttach.call(this);
};
BespinEditorBinding.prototype.handleBroadcast=function(_1064,arg){
BespinEditorBinding.superclass.handleBroadcast.call(this,_1064,arg);
switch(_1064){
case BroadcastMessages.BESPIN_LOADED:
var _1066=this.getContentWindow().bindingMap.bespinwindow;
if(_1066!=null){
var _1067=_1066.getContentWindow();
if(arg.broadcastWindow==_1067){
this._bespinEnvelope=arg.bespinEnvelope;
this._bespinEditor=arg.bespinEditor;
this._bespinElement=this._bespinEditor.textView.domNode;
this._bespinEditor.syntax=this.syntax;
this._bespinEnvelope.settings.set("theme","white");
this._bespinEnvelope.settings.set("fontface","monospace");
this._bespinEnvelope.settings.set("fontsize",13);
this._bespinEnvelope.settings.set("tabmode","tabs");
this._bespinEnvelope.settings.set("tabstop",4);
this.initializeEditorComponents(_1066);
this._bespinElement.addEventListener(DOMEvents.MOUSEDOWN,this,false);
var self=this;
this._bespinEditor.textChanged.add(function(_1069,_106a,_106b){
self.checkForDirty();
});
if(this._pageBinding!=null){
this._initialize();
}
this.unsubscribe(_1064);
}
}
break;
}
};
BespinEditorBinding.prototype._onPageInitialize=function(_106c){
BespinEditorBinding.superclass._onPageInitialize.call(this,_106c);
if(Client.isExplorer||this._bespinEditor!=null){
this._initialize();
}
};
BespinEditorBinding.prototype.debug=function(){
var html=this.getEditorDocument().body.innerHTML;
if(Client.isMozilla){
html=html.replace(/<br>/g,"<br/>");
html=html.replace(/\t/g,"....");
var dom=XMLParser.parse(html);
if(dom){
html=DOMSerializer.serialize(dom,true);
}
}else{
html="Debug not supported in IE.";
}
this.logger.debug(html);
};
BespinEditorBinding.prototype._activateEditor=function(_106f){
if(_106f!=this._isActivated){
this._isActivated=_106f;
EditorBinding.isActive=_106f;
var _1070=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_1070!=null){
if(_106f){
_1070.enable();
this.focus();
}else{
_1070.disable();
this.blur();
}
}else{
throw "Required broadcaster not found";
}
}
};
BespinEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1074=BespinEditorBinding.superclass.handleCommand.call(this,cmd,val);
switch(cmd){
case "Paste":
this._codePressFrame.syntaxHighlight("generic");
break;
}
return _1074;
};
BespinEditorBinding.prototype._finalize=function(){
this.setContent(this._startContent);
BespinEditorBinding.superclass._finalize.call(this);
};
BespinEditorBinding.prototype.initializeEditorComponent=function(_1075){
_1075.initializeSourceEditorComponent(this,this._bespinEditor);
};
BespinEditorBinding.prototype.clean=function(){
BespinEditorBinding.superclass.clean.call(this);
this.getContentWindow().bindingMap.editorpage.clean();
};
BespinEditorBinding.prototype.handleContextMenu=function(e){
alert("BespinEditorBinding.prototype.handleContextMenu");
};
BespinEditorBinding.prototype.getEditorPopupBinding=function(){
return top.app.bindingMap.sourcecodeeditorpopup;
};
BespinEditorBinding.prototype.getEditorWindow=function(){
return this._codePressFrame.contentWindow;
};
BespinEditorBinding.prototype.getEditorDocument=function(){
var _1077=null;
if(this._codePressFrame!=null){
_1077=this._codePressFrame.contentWindow.document;
}
return _1077;
};
BespinEditorBinding.prototype.setContent=function(_1078){
if(!this._isFinalized){
if(_1078!=this._startContent){
this._startContent=_1078;
}
}
if(this.isInitialized&&this.getContentWindow().bindingMap!=null){
this.getContentWindow().bindingMap.editorpage.setContent(_1078);
this.resetUndoRedo();
this._checksum=this.getCheckSum();
}
return true;
};
BespinEditorBinding.prototype.getContent=function(){
var _1079=this.getContentWindow().bindingMap.editorpage.getContent();
return _1079?_1079:"";
};
BespinEditorBinding.prototype.resetUndoRedo=function(){
};
BespinEditorBinding.prototype.cover=function(_107a){
if(this._pageBinding!=null){
this._pageBinding.cover(_107a);
}
};
BespinEditorBinding.prototype.updateElement=function(_107b){
if(_107b!=null&&this.shadowTree.dotnetinput!=null){
var value=_107b.getAttribute("value");
if(value!=null&&value!=this.shadowTree.dotnetinput.value){
this.setValue(decodeURIComponent(value));
}
}
return true;
};
BespinEditorBinding.prototype.addEditorEvents=function(){
};
BespinEditorBinding.prototype.blurEditor=function(){
};
BespinEditorBinding.prototype.validate=function(){
var _107d=true;
var _107e=this.getContent();
if(this._validator!=null){
_107d=Validator.validateInformed(_107e,this._validator);
}else{
switch(this.syntax){
case BespinEditorBinding.syntax.XML:
case BespinEditorBinding.syntax.XSL:
case BespinEditorBinding.syntax.HTML:
_107d=XMLParser.isWellFormedDocument(_107e,true);
if(_107d==true&&this._hasStrictValidation){
switch(this.syntax){
case BespinEditorBinding.syntax.HTML:
_107d=this._isValidHTML(_107e);
break;
}
}
break;
}
}
return _107d;
};
BespinEditorBinding.prototype._isValidHTML=function(xml){
var _1080=true;
var doc=XMLParser.parse(xml);
var _1082=new List();
if(doc!=null){
var root=doc.documentElement;
if(root.nodeName!="html"){
_1082.add("MissingHtml");
}
if(root.namespaceURI!=Constants.NS_XHTML){
_1082.add("NamespaceURI");
}
var head=null,body=null;
var _1086=new List(root.childNodes);
while(_1086.hasNext()){
var child=_1086.getNext();
if(child.nodeType==Node.ELEMENT_NODE){
switch(child.nodeName){
case "head":
if(head!=null){
_1082.add("MultipleHead");
}
if(body!=null){
_1082.add("HeadBodyIndex");
}
head=child;
break;
case "body":
if(body!=null){
_1082.add("MultipleBody");
}
body=child;
break;
}
}
}
if(head==null){
_1082.add("MissingHead");
}
if(body==null){
_1082.add("MissingBody");
}
}
if(_1082.hasEntries()){
_1080=false;
Dialog.error(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML.DialogTitle"),StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_1082.getFirst()));
}
return _1080;
};
BespinEditorBinding.prototype._isValidXSL=function(){
return true;
};
BespinEditorBinding.prototype.getValue=BespinEditorBinding.prototype.getContent;
BespinEditorBinding.prototype.setValue=BespinEditorBinding.prototype.setContent;
BespinEditorBinding.prototype.getResult=BespinEditorBinding.prototype.getContent;
BespinEditorBinding.prototype.setResult=BespinEditorBinding.prototype.setContent;
BespinEditorBinding.prototype.createBookmark=function(){
};
BespinEditorBinding.prototype.restoreBookmark=function(){
};
BespinEditorBinding.prototype.hasBookmark=function(){
};
BespinEditorBinding.prototype.deleteBookmark=function(){
};
BespinEditorBinding.prototype.getCheckSum=function(){
var _1088=null;
var page=this._pageBinding;
if(page!=null){
_1088=page.getCheckSum();
}
return _1088;
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
ThrobberBinding.prototype.handleBroadcast=function(_108a,arg){
ThrobberBinding.superclass.handleBroadcast.call(this,_108a,arg);
switch(_108a){
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
ProgressBarBinding.notch=function(_108d){
var bar=ProgressBarBinding._bindingInstance;
if(bar!=null){
bar.notch(_108d);
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
ProgressBarBinding.prototype.notch=function(_108f){
_108f=_108f?_108f:1;
var width=this._cover.getWidth()-(ProgressBarBinding.NOTCH*_108f);
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
StartMenuItemBinding.prototype.handleBroadcast=function(_1091,arg){
StartMenuItemBinding.superclass.handleBroadcast.call(this,_1091,arg);
switch(_1091){
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
StartMenuItemBinding.prototype.setChecked=function(_1093,_1094){
StartMenuItemBinding.superclass.setChecked.call(this,_1093,_1094);
if(!_1094){
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
KeySetBinding.registerKeyEventHandler=function(doc,key,_1097,_1098){
var _1099=KeySetBinding.keyEventHandlers;
if(Interfaces.isImplemented(IKeyEventHandler,_1098,true)==true){
if(_1097!="*"){
_1097=KeySetBinding._sanitizeKeyModifiers(_1097);
}
var code=window.KeyEventCodes[key];
if(!code){
code=key.charCodeAt(0);
}
if(!_1099[doc]){
_1099[doc]={};
}
if(!_1099[doc][code]){
_1099[doc][code]={};
}
_1099[doc][code][_1097]=_1098;
}
};
KeySetBinding.handleKey=function(doc,e){
var _109d=false;
var code=e.keyCode;
var _109f=KeySetBinding.keyEventHandlers;
if(_109f[doc]&&_109f[doc][code]){
var _10a0="[default]";
_10a0+=code!=KeyEventCodes.VK_SHIFT?e.shiftKey?" shift":"":"";
_10a0+=code!=KeyEventCodes.VK_CONTROL?e.ctrlKey?" control":"":"";
var _10a1=_109f[doc][code][_10a0];
if(_10a1==null){
_10a1=_109f[doc][code]["*"];
}
if(_10a1!=null){
_10a1.handleKeyEvent(e);
_109d=true;
}
}
return _109d;
};
KeySetBinding._sanitizeKeyModifiers=function(_10a2){
var _10a3="[default]";
var mods={};
if(_10a2){
new List(_10a2.split(" ")).each(function(_10a5){
mods[_10a5]=true;
});
function check(_10a6){
if(mods[_10a6]){
_10a3+=" "+_10a6;
}
}
check("shift");
check("control");
}
return _10a3;
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
var _10aa=key.getAttribute("oncommand");
var _10ab=key.getAttribute("preventdefault")=="true";
KeySetBinding.registerKeyEventHandler(self.bindingDocument,key.getAttribute("key"),key.getAttribute("modifiers"),{handleKeyEvent:function(e){
DOMEvents.stopPropagation(e);
if(_10ab){
DOMEvents.preventDefault(e);
}
var _10ad=self.bindingWindow.WindowManager;
top.setTimeout(function(){
Binding.evaluate(_10aa,self);
},0);
}});
});
};
CursorBinding.prototype=new Binding;
CursorBinding.prototype.constructor=CursorBinding;
CursorBinding.superclass=Binding.prototype;
CursorBinding.fadeIn=function(_10ae){
if(_10ae instanceof CursorBinding){
_10ae.setOpacity(0);
_10ae.show();
new Animation({modifier:Client.isExplorer?18:9,onstep:function(_10af){
_10ae.setOpacity(Math.sin(_10af*Math.PI/180));
},onstop:function(){
_10ae.setOpacity(1);
}}).play();
}
};
CursorBinding.fadeOut=function(_10b0){
if(_10b0 instanceof CursorBinding){
new Animation({modifier:Client.isExplorer?18:9,onstep:function(_10b1){
_10b0.setOpacity(Math.cos(_10b1*Math.PI/180));
},onstop:function(){
_10b0.hide();
}}).play();
}
};
CursorBinding.moveOut=function(_10b2,_10b3,_10b4){
if(_10b2 instanceof CursorBinding){
_10b4.x-=16;
_10b4.y-=16;
new Animation({modifier:3,onstep:function(_10b5){
var tal=Math.sin(_10b5*Math.PI/180);
_10b2.setPosition(new Point(((1-tal)*_10b3.x)+((0+tal)*_10b4.x),((1-tal)*_10b3.y)+((0+tal)*_10b4.y)));
},onstop:function(){
CursorBinding.fadeOut(_10b2);
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
CursorBinding.prototype.setOpacity=function(_10bb){
if(Client.isMozilla){
this.bindingElement.style.MozOpacity=new String(_10bb);
}else{
this.bindingElement.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+new String(_10bb*100)+")";
}
this._opacity=_10bb;
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
function setOpacity(_10be){
if(Client.isMozilla){
cover.bindingElement.style.opacity=new String(_10be);
}else{
cover.bindingElement.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+new String(_10be*100)+")";
}
}
if(cover instanceof CoverBinding){
new Animation({modifier:Client.isExplorer?30:18,onstep:function(_10bf){
if(Binding.exists(cover)){
setOpacity(Math.cos(_10bf*Math.PI/180));
}
},onstop:function(){
if(Binding.exists(cover)){
cover.hide();
}
}}).play();
}
};
CoverBinding.fadeIn=function(cover){
function setOpacity(_10c1){
if(Client.isMozilla){
cover.bindingElement.style.MozOpacity=new String(_10c1);
}else{
cover.bindingElement.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+new String(_10c1*100)+")";
}
}
if(cover instanceof CoverBinding){
new Animation({modifier:Client.isExplorer?30:18,onstart:function(){
if(Binding.exists(cover)){
setOpacity(0);
cover.show();
}
},onstep:function(_10c2){
if(Binding.exists(cover)){
setOpacity(Math.sin(_10c2*Math.PI/180));
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
CoverBinding.prototype.setBusy=function(_10c4){
if(_10c4!=this._isBusy){
if(_10c4){
this.bindingElement.style.cursor="wait";
}else{
this.bindingElement.style.cursor="default";
}
this._isBusy=_10c4;
}
};
CoverBinding.prototype.setTransparent=function(_10c5){
if(_10c5!=this._isTransparent){
if(_10c5){
this.attachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}else{
this.detachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}
this._isTransparent=_10c5;
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
CoverBinding.prototype.setHeight=function(_10c7){
if(_10c7>=0){
this.bindingElement.style.height=new String(_10c7+"px");
}
};
CoverBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
CoverBinding.newInstance=function(_10c8){
var _10c9=DOMUtil.createElementNS(Constants.NS_UI,"ui:cover",_10c8);
return UserInterface.registerBinding(_10c9,CoverBinding);
};
UncoverBinding.prototype=new Binding;
UncoverBinding.prototype.constructor=UncoverBinding;
UncoverBinding.superclass=Binding.prototype;
UncoverBinding._bindingInstance=null;
UncoverBinding.uncover=function(pos){
var _10cb=UncoverBinding._bindingInstance;
if(Binding.exists(_10cb)){
_10cb.setPosition(pos);
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
TheatreBinding.prototype.play=function(_10cf){
this._isFading=_10cf==true;
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
var _10d0=this._canvas.getContext("2d");
var alpha=parseInt(0);
TheatreBinding._interval=top.setInterval(function(){
if(alpha<0.5){
_10d0.fillStyle="rgba(0,0,0,"+new String(alpha)+")";
_10d0.clearRect(0,0,300,150);
_10d0.fillRect(0,0,300,150);
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
var _10d2=this._canvas.getContext("2d");
_10d2.clearRect(0,0,300,150);
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
var _10d3=SourceCodeViewerBinding.stylesheets[this._syntax];
this._transformer=new XSLTransformer();
this._transformer.importStylesheet(_10d3);
break;
default:
throw "SourceCodeViewer: Syntax error!";
this._syntax=null;
break;
}
var _10d4=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_10d4){
this._startcontent=_10d4.value;
}
this.setURL(SourceCodeViewerBinding.URL_DEFAULT);
this.addActionListener(WindowBinding.ACTION_ONLOAD);
SourceCodeViewerBinding.superclass.onBindingAttach.call(this);
};
SourceCodeViewerBinding.prototype.handleAction=function(_10d5){
SourceCodeViewerBinding.superclass.handleAction.call(this,_10d5);
switch(_10d5.type){
case WindowBinding.ACTION_ONLOAD:
if(_10d5.target==this){
if(this._startcontent){
this.view(this._startcontent);
}
this.dispatchAction(SourceCodeViewerBinding.ACTION_INITIALIZED);
_10d5.consume();
}
break;
}
SourceCodeViewerBinding.superclass.handleAction.call(this,_10d5);
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
var _10d9=this._transformer.transformToString(doc);
this._inject(_10d9);
}
};
SourceCodeViewerBinding.prototype._viewHTML=function(arg){
};
SourceCodeViewerBinding.prototype._viewJavascript=function(arg){
};
SourceCodeViewerBinding.prototype._inject=function(_10dc){
this.getContentDocument().body.innerHTML=_10dc;
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
var _10e4=list.getNext();
var id=_10e4.getAttribute("id");
map[id]={};
var atts=this._resolver.resolveAll("p:att",_10e4);
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
var _10ee=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"persist",doc);
_10ee.setAttribute("id",id);
for(var name in map[id]){
var att=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"att",doc);
att.setAttribute("name",name);
att.setAttribute("value",map[id][name]);
_10ee.appendChild(att);
}
elm.appendChild(_10ee);
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
var _10f8=window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance;
if(_10f8){
doc=XMLParser.parse(_10f8);
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
var _10fc=DOMSerializer.serialize(doc,true);
window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance=_10fc;
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
LocalizationSelectorBinding.prototype.handleBroadcast=function(_10fd,arg){
LocalizationSelectorBinding.superclass.handleBroadcast.call(this,_10fd,arg);
switch(_10fd){
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
var _1100=new List();
list.each(function(lang){
_1100.add(new SelectorBindingSelection(lang.Name,lang.SerializedActionToken,lang.IsCurrent,null));
});
this.populateFromList(_1100);
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
Dialog.warning(StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogTitle"),StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogText"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_1104){
switch(_1104){
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
var _1107=new SystemAction({Label:"Generated Action: Change Locale",ActionToken:token});
SystemAction.invoke(_1107,root);
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
var _1108=this.getProperty("status");
if(_1108!=null){
switch(_1108){
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
UserInterfaceMapping.prototype.merge=function(_110b){
for(var _110c in _110b.map){
this.map[_110c]=_110b.getBindingImplementation(_110c);
}
};
UserInterfaceMapping.prototype.getBindingImplementation=function(_110d){
var _110e=null;
var name=_110d.nodeName;
if(Client.isExplorer){
var small=name.toLowerCase();
if(name==small){
name="ui:"+name;
}else{
name=small;
}
}
if(this.map[name]){
_110e=this.map[name];
}
return _110e;
};
var UserInterface=new function(){
var _1111=(Client.isMozilla?MozEditorTextBoxBinding:IEEditorTextBoxBinding);
var _1112=new UserInterfaceMapping({"body":RootBinding,"ui:binding":Binding,"ui:box":Binding,"ui:dialog":DialogBinding,"ui:dialoghead":DialogHeadBinding,"ui:dialogbody":DialogBodyBinding,"ui:dialogmatrix":DialogMatrixBinding,"ui:dialogset":DialogSetBinding,"ui:dialogborder":DialogBorderBinding,"ui:dialogcover":DialogCoverBinding,"ui:titlebar":DialogTitleBarBinding,"ui:titlebarbody":DialogTitleBarBodyBinding,"ui:window":WindowBinding,"ui:controlgroup":ControlGroupBinding,"ui:control":ControlBinding,"ui:menubar":MenuBarBinding,"ui:menu":MenuBinding,"ui:menubody":MenuBodyBinding,"ui:menugroup":MenuGroupBinding,"ui:menuitem":MenuItemBinding,"ui:menupopup":MenuPopupBinding,"ui:tabbox":TabBoxBinding,"ui:tabs":TabsBinding,"ui:tab":TabBinding,"ui:tabpanels":TabPanelsBinding,"ui:tabpanel":TabPanelBinding,"ui:splitbox":SplitBoxBinding,"ui:splitpanel":SplitPanelBinding,"ui:splitter":SplitterBinding,"ui:decks":DecksBinding,"ui:deck":DeckBinding,"ui:toolbar":ToolBarBinding,"ui:toolbargroup":ToolBarGroupBinding,"ui:toolbarbody":ToolBarBodyBinding,"ui:toolbarbutton":ToolBarButtonBinding,"ui:toolbarlabel":ToolBarLabelBinding,"ui:labelbox":LabelBinding,"ui:text":TextBinding,"ui:clickbutton":ClickButtonBinding,"ui:tree":TreeBinding,"ui:treebody":TreeBodyBinding,"ui:treenode":TreeNodeBinding,"ui:flexbox":FlexBoxBinding,"ui:scrollbox":ScrollBoxBinding,"ui:popupset":PopupSetBinding,"ui:popup":PopupBinding,"ui:shadow":ShadowBinding,"ui:matrix":MatrixBinding,"ui:sourceeditor":BespinEditorBinding,"ui:visualeditor":VisualEditorBinding,"ui:visualmultieditor":VisualMultiEditorBinding,"ui:visualmultitemplateeditor":VisualMultiTemplateEditorBinding,"ui:wysiwygeditortoolbarbutton":EditorToolBarButtonBinding,"ui:dock":DockBinding,"ui:docktabs":DockTabsBinding,"ui:docktab":DockTabBinding,"ui:dockpanels":DockPanelsBinding,"ui:dockpanel":DockPanelBinding,"ui:page":PageBinding,"ui:editorpage":EditorPageBinding,"ui:dialogpage":DialogPageBinding,"ui:pagebody":DialogPageBodyBinding,"ui:wizardpage":WizardPageBinding,"ui:explorer":ExplorerBinding,"ui:explorerdecks":ExplorerDecksBinding,"ui:explorerdeck":ExplorerDeckBinding,"ui:explorersplitter":ExplorerSplitterBinding,"ui:explorermenu":ExplorerMenuBinding,"ui:explorertoolbar":ExplorerToolBarBinding,"ui:explorertoolbarbutton":ExplorerToolBarButtonBinding,"ui:stagecontainer":StageContainerBinding,"ui:stage":StageBinding,"ui:stagedecks":StageDecksBinding,"ui:stagedeck":StageDeckBinding,"ui:viewset":ViewSetBinding,"ui:view":ViewBinding,"ui:broadcasterset":BroadcasterSetBinding,"ui:broadcaster":BroadcasterBinding,"ui:fields":FieldsBinding,"ui:fieldgroup":FieldGroupBinding,"ui:field":FieldBinding,"ui:fielddesc":FieldDescBinding,"ui:fielddata":FieldDataBinding,"ui:fieldhelp":FieldHelpBinding,"ui:datainput":DataInputBinding,"ui:selector":SelectorBinding,"ui:simpleselector":SimpleSelectorBinding,"ui:multiselector":MultiSelectorBinding,"ui:datainputselector":DataInputSelectorBinding,"ui:datainputdialog":DataInputDialogBinding,"ui:textbox":TextBoxBinding,"ui:editortextbox":_1111,"ui:radiodatagroup":RadioDataGroupBinding,"ui:radio":RadioDataBinding,"ui:checkbutton":CheckButtonBinding,"ui:checkbox":CheckBoxBinding,"ui:checkboxgroup":CheckBoxGroupBinding,"ui:datadialog":DataDialogBinding,"ui:postbackdialog":PostBackDataDialogBinding,"ui:nullpostbackdialog":NullPostBackDataDialogBinding,"ui:htmldatadialog":HTMLDataDialogBinding,"ui:functioneditor":FunctionEditorDataBinding,"ui:parametereditor":ParameterEditorDataBinding,"ui:keyset":KeySetBinding,"ui:cover":CoverBinding,"ui:uncover":UncoverBinding,"ui:cursor":CursorBinding,"ui:dialogtoolbar":DialogToolBarBinding,"ui:focus":FocusBinding,"ui:balloonset":BalloonSetBinding,"ui:balloon":BalloonBinding,"ui:error":ErrorBinding,"ui:throbber":ThrobberBinding,"ui:progressbar":ProgressBarBinding,"ui:lazybinding":LazyBindingBinding,"ui:sourcecodeviewer":SourceCodeViewerBinding,"ui:theatre":TheatreBinding,"ui:persistance":PersistanceBinding,"ui:filepicker":FilePickerBinding,"ui:request":RequestBinding,"ui:response":ResponseBinding});
var _1113=SystemLogger.getLogger("UserInterface");
var keys={};
this.registerBinding=function(_1115,impl){
var _1117=null;
if(!this.hasBinding(_1115)){
var _1118=DOMUtil.getParentWindow(_1115);
if(DOMUtil.getLocalName(_1115)!="bindingmapping"){
if(!impl&&_1115.getAttribute("binding")!=null){
var _1119=_1115.getAttribute("binding");
impl=_1118[_1119];
if(impl==null){
throw "No such binding in scope: "+_1119;
}
}
if(!impl){
var _111a=_1118.DocumentManager;
if(_111a){
var _111b=_111a.customUserInterfaceMapping;
if(_111b){
impl=_111b.getBindingImplementation(_1115);
}
}
}
if(!impl){
impl=_1112.getBindingImplementation(_1115);
}
if(impl!=null&&!Application.isMalFunctional){
try{
_1117=new impl();
}
catch(exception){
Application.isMalFunctional=true;
alert("No such binding!\n"+exception.message+(exception.stack?"\n"+exception.stack:""));
throw (exception);
}
}
if(_1117){
var key=KeyMaster.getUniqueKey();
_1115.setAttribute("key",key);
_1117.key=key;
if(!_1115.id){
_1115.id=key;
}
keys[key]={element:_1115,binding:_1117};
_1117.onBindingRegister();
}
}
}
return _1117;
};
this.unRegisterBinding=function(_111d){
terminate(_111d);
};
function terminate(_111e){
if(Binding.exists(_111e)==true){
var key=_111e.key;
Binding.destroy(_111e);
if(key){
if(keys[key]){
keys[key].binding=null;
keys[key].element=null;
delete keys[key];
_111e=null;
}else{
_1113.error("URGH: "+key);
}
}
}
}
this.getElement=function(_1120){
var _1121=null;
if(keys[_1120.key]){
_1121=keys[_1120.key].element;
}
return _1121;
};
this.getBinding=function(_1122){
var _1123=null;
if(_1122&&_1122.nodeType==Node.ELEMENT_NODE){
try{
var key=_1122.getAttribute("key");
if(key&&keys[key]){
_1123=keys[key].binding;
}
}
catch(exception){
alert("getBinding exception occured on element:\n\n\t\t"+_1122);
if(exception.stack){
alert(exception.stack);
}
}
}
return _1123;
};
this.getBindingByKey=function(key){
var _1126=null;
if(keys[key]){
_1126=keys[key].binding;
}
return _1126;
};
this.hasBinding=function(_1127){
return this.getBinding(_1127)!=null;
};
this.isBindingVisible=function(_1128){
var _1129=Application.isOperational;
if(_1129==true){
var _112a=new Crawler();
_112a.type=NodeCrawler.TYPE_ASCENDING;
_112a.id="visibilitycrawler";
_112a.addFilter(function(_112b){
var b=UserInterface.getBinding(_112b);
var res=0;
if(!b.isVisible){
_1129=false;
res=NodeCrawler.STOP_CRAWLING;
}
return res;
});
_112a.crawl(_1128.bindingElement);
_112a.dispose();
}
return _1129;
};
var _112e=null;
this.getBindingCount=function(){
var count=0;
for(var key in keys){
count++;
}
return count;
};
this.setPoint=function(){
_112e={};
for(var key in keys){
_112e[key]=true;
}
};
this.getPoint=function(){
var _1132=null;
if(_112e){
_1132=new List();
for(var key in keys){
if(!_112e[key]){
_1132.add(key);
}
}
}
return _1132;
};
this.clearPoint=function(){
_112e=null;
};
this.trackUndisposedBindings=function(){
var _1134=null;
for(var key in keys){
var entry=keys[key];
if(!entry.binding||!entry.element||!Binding.exists(entry.binding)){
if(!_1134){
_1134="Bindings illdisposed: ";
}
_1134+=entry.binding+" ";
}
}
if(_1134!=null){
_1113.error(_1134);
}
};
this.autoTrackDisposedBindings=function(_1137){
if(_1137){
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
SOAPRequest.newInstance=function(_1138,_1139){
var _113a=_1138+"/"+_1139;
var _113b=new SOAPRequest(_113a);
var _113c=SOAPRequest.resolver;
_113b.document=Templates.getTemplateDocument("soapenvelope.xml");
_113b.envelope=_113c.resolve("soap:Envelope",_113b.document);
_113b.header=_113c.resolve("soap:Header",_113b.envelope);
_113b.body=_113c.resolve("soap:Body",_113b.envelope);
return _113b;
};
SOAPRequest._parseResponse=function(_113d){
var _113e=null;
var _113f=false;
var doc=_113d.responseXML;
if(doc!=null&&doc.documentElement!=null){
switch(doc.documentElement.namespaceURI){
case Constants.NS_ENVELOPE:
_113e=SOAPRequestResponse.newInstance(_113d.responseXML);
if(Application.isOffLine){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_ONLINE);
}
break;
case Constants.NS_XHTML:
if(!Application.isOffLine){
var body=SOAPRequest.resolver.resolve("xhtml:html/xhtml:body",_113d.responseXML);
if(body&&body.getAttribute("id")=="offline"){
_113f=true;
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
var text=_113d.responseText;
if(text.indexOf("id=\"offline\"")>-1){
_113f=true;
}else{
var cry="Invalid SOAP response: \n\n"+_113d.responseText;
SystemLogger.getLogger("SOAPRequest._parseResponse (static)").error(cry);
if(Application.isDeveloperMode){
alert("Invalid SOAP response");
window.open("about:blank").document.write(_113d.responseText);
}
}
}
}
if(_113f==true){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_OFFLINE);
}
return _113e;
};
function SOAPRequest(_1144){
this.logger=SystemLogger.getLogger("SOAPRequest");
this.action=_1144;
return this;
}
SOAPRequest.prototype.invoke=function(url){
var _1146=DOMUtil.getXMLHTTPRequest();
var _1147=null;
_1146.open("post",url,false);
_1146.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_1146.setRequestHeader("SOAPAction",this.action);
try{
_1146.send(this.document);
_1147=SOAPRequest._parseResponse(_1146);
}
catch(exception){
var error="Dysfuntion in SOAP invoke: "+url;
if(this.document!=null){
error+="\n"+DOMSerializer.serialize(this.document,true);
}
this.logger.error(error);
throw exception;
}
_1146=null;
return _1147;
};
SOAPRequest.prototype.dispose=function(){
for(var _1149 in this){
this[_1149]=null;
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
var _114b=null;
if(doc&&doc.documentElement){
_114b=new SOAPRequestResponse();
var _114c=SOAPRequestResponse.resolver;
_114b.document=doc;
_114b.envelope=_114c.resolve("soap:Envelope",_114b.document);
_114b.header=_114c.resolve("soap:Header",_114b.envelope);
_114b.body=_114c.resolve("soap:Body",_114b.envelope);
var fault=_114c.resolve("soap:Fault",_114b.body);
if(fault){
SOAPRequestResponse.logger.fatal(DOMSerializer.serialize(fault,true));
_114b.fault={element:fault,faultNamespaceURI:fault.namespaceURI,faultCode:DOMUtil.getTextContent(_114c.resolve("faultcode",fault)),faultString:DOMUtil.getTextContent(_114c.resolve("faultstring",fault)),detail:fault.getElementsByTagName("detail").item(0)};
}
}
return _114b;
};
function SOAPFault(_114e,_114f,_1150){
this._operationName=_114e;
this._operationAddress=_114f;
this._faultString=_1150;
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
SOAPFault.newInstance=function(_1151,fault){
return new SOAPFault(_1151.name,_1151.address,fault.faultString);
};
function SOAPEncoder(wsdl,_1154){
this.logger=SystemLogger.getLogger("SOAPEncoder");
this._wsdl=wsdl;
this._operation=_1154;
this._namespace=wsdl.getTargetNamespace();
}
SOAPEncoder.prototype.encode=function(args){
var _1156=SOAPRequest.newInstance(this._namespace,this._operation);
var root=this._appendElement(_1156.body,this._operation);
var _1158=this._wsdl.getSchema();
var _1159=_1158.lookup(this._operation);
var _115a=_1159.getListedDefinitions();
while(_115a.hasNext()){
var def=_115a.getNext();
var elm=this._appendElement(root,def.name);
var val=args.getNext();
this._resolve(elm,def,val);
}
return _1156;
};
SOAPEncoder.prototype._resolve=function(_115e,_115f,value){
var _1161=this._wsdl.getSchema();
if(_115f.isSimpleValue){
this._appendText(_115e,value,_115f.type=="string");
}else{
var _1162=_1161.lookup(_115f.type);
if(_1162 instanceof SchemaSimpleType){
alert("SOAPEncoder: SchemaSimpleType support not implemented!");
}else{
var defs=_1162.getListedDefinitions();
if(_1162.isArray){
var _1164=new List(value);
var def=defs.getNext();
while(_1164.hasNext()){
var elm=this._appendElement(_115e,def.name);
var val=_1164.getNext();
this._resolve(elm,def,val);
}
}else{
while(defs.hasNext()){
try{
var def=defs.getNext();
var elm=this._appendElement(_115e,def.name);
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
SOAPEncoder.prototype._appendText=function(_116b,value,_116d){
if(value!=null){
value=new String(value);
var safe=new String("");
var chars=value.split("");
var _1170=false;
var i=0,c;
while(c=chars[i++]){
var _1173=true;
var code=c.charCodeAt(0);
switch(code){
case 9:
case 10:
case 13:
_1173=false;
break;
default:
if((code>=32&&code<=55295)||(code>=57344&&code<=65533)||(code>=65536&&code<=1114111)){
_1173=false;
}
break;
}
if(!_1173){
safe+=c;
}else{
_1170=true;
}
}
if(_1170){
this.logger.debug("Illegal XML character(s) was deleted from the string: "+value);
}
_116b.appendChild(_116b.ownerDocument.createTextNode(safe));
}
};
function SOAPDecoder(wsdl,_1176){
this._wsdl=wsdl;
this._operation=_1176;
this._resolver=new XPathResolver();
this._resolver.setNamespacePrefixResolver({"result":wsdl.getTargetNamespace()});
}
SOAPDecoder.prototype.resolve=function(xpath,node){
return this._resolver.resolve("result:"+xpath,node);
};
SOAPDecoder.prototype.resolveAll=function(xpath,node){
return this._resolver.resolveAll("result:"+xpath,node);
};
SOAPDecoder.prototype.decode=function(_117b){
var _117c=null;
var _117d=this._wsdl.getSchema();
var id=this._operation+"Response";
var _117f=this.resolve(id,_117b.body);
var _1180=_117d.lookup(id);
var _1181=_1180.getListedDefinitions();
while(!_117c&&_1181.hasNext()){
var def=_1181.getNext();
var elm=this.resolve(def.name,_117f);
if(def.type==SchemaDefinition.TYPE_XML_DOCUMENT){
_117c=DOMUtil.getDOMDocument();
var e=elm.getElementsByTagName("*").item(0);
if(typeof _117c.importNode!=Types.UNDEFINED){
_117c.appendChild(_117c.importNode(e,true));
}else{
_117c.loadXML(DOMSerializer.serialize(e));
}
}else{
_117c=this._compute(elm,def);
}
}
return _117c;
};
SOAPDecoder.prototype._compute=function(_1185,_1186){
var _1187=null;
var _1188=this._wsdl.getSchema();
if(_1186.isSimpleValue){
_1187=this._getSimpleValue(_1185,_1186.type);
}else{
var _1189=_1188.lookup(_1186.type);
if(_1189 instanceof SchemaSimpleType){
_1187=this._getSimpleValue(_1185,_1189.restrictionType);
}else{
var defs=_1189.getListedDefinitions();
if(_1189.isArray){
_1187=[];
var def=defs.getNext();
var elms=this.resolveAll(def.type,_1185);
while(elms.hasNext()){
var elm=elms.getNext();
_1187.push(this._compute(elm,def));
}
}else{
_1187={};
defs.reset();
while(defs.hasNext()){
var def=defs.getNext();
var elm=this.resolve(def.name,_1185);
if(elm){
_1187[def.name]=this._compute(elm,def);
}else{
if(def.isRequired){
throw new Error("SOAPDecoder: invalid SOAP response.");
}
}
}
}
}
}
return _1187;
};
SOAPDecoder.prototype._getSimpleValue=function(_118e,type){
var _1190=null;
if(_118e.firstChild&&_118e.firstChild.nodeType==Node.TEXT_NODE){
if(Client.isMozilla&&_118e.childNodes.length>1){
_118e.normalize();
}
_1190=_118e.firstChild.data;
switch(type){
case Schema.types.STRING:
_1190=_1190;
break;
case Schema.types.INT:
case Schema.types.FLOAT:
case Schema.types.DOUBLE:
_1190=Number(_1190);
break;
case Schema.types.BOOLEAN:
_1190=_1190=="true";
break;
default:
throw ("SOAPDecoder: schema type \""+type+"\" not handled.");
break;
}
}
return _1190;
};
Schema.prototype=new XPathResolver;
Schema.prototype.constructor=Schema;
Schema.superclass=XPathResolver.prototype;
Schema.types={STRING:"string",INT:"int",FLOAT:"float",DOUBLE:"double",BOOLEAN:"boolean"};
Schema.notSupportedException=new Error("Schema: Schema structure not supported!");
function Schema(_1191){
this.logger=SystemLogger.getLogger("Schema");
this._map=this._parseSchema(_1191);
}
Schema.prototype._parseSchema=function(_1192){
this.setNamespacePrefixResolver({"wsdl":Constants.NS_WSDL,"soap":Constants.NS_SOAP,"s":Constants.NS_SCHEMA});
var _1193={};
var entry=null;
var rules=this.resolveAll("s:*[@name]",_1192);
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
_1193[rule.getAttribute("name")]=entry;
}
return _1193;
};
Schema.prototype.lookup=function(name){
return this._map[name];
};
SchemaDefinition.TYPE_XML_DOCUMENT="xmldocument";
function SchemaDefinition(_1198){
this.logger=SystemLogger.getLogger("SchemaDefinition");
this.isRequired=null;
this.type=null;
this._parse(_1198);
}
SchemaDefinition.prototype._parse=function(_1199){
var min=_1199.getAttribute("minOccurs");
var max=_1199.getAttribute("maxOccurs");
var type=_1199.getAttribute("type");
this.name=_1199.getAttribute("name");
this.isRequired=min!="0";
if(type){
var split=type.split(":");
var sort=split[0];
var _119f=split[1];
this.isSimpleValue=sort!="tns";
this.type=_119f;
}else{
var elm=_1199.getElementsByTagName("*").item(0);
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
function SchemaElementType(_11a1,_11a2){
this.logger=SystemLogger.getLogger("SchemaElementType");
this._definitions=new List();
this._parseListedDefinitions(_11a1,_11a2);
}
SchemaElementType.prototype._parseListedDefinitions=function(_11a3,_11a4){
var els=_11a3.resolveAll("s:complexType/s:sequence/s:element",_11a4);
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
function SchemaComplexType(_11a6,_11a7){
this._definitions=new List();
this._parseListedDefinitions(_11a6,_11a7);
this.isArray=_11a7.getAttribute("name").indexOf("ArrayOf")>-1;
}
SchemaComplexType.prototype._parseListedDefinitions=function(_11a8,_11a9){
var els=_11a8.resolveAll("s:sequence/s:element",_11a9);
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
function SchemaSimpleType(_11ac,_11ad){
this.restrictionType=null;
this._parse(_11ac,_11ad);
}
SchemaSimpleType.prototype._parse=function(_11ae,_11af){
var _11b0=_11ae.resolve("s:restriction",_11af);
if(_11b0){
this.restrictionType=_11b0.getAttribute("base").split(":")[1];
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
var _11b3=null;
var _11b4=DOMUtil.getXMLHTTPRequest();
_11b4.open("get",url,false);
_11b4.send(null);
if(_11b4.responseXML){
_11b3=_11b4.responseXML.documentElement;
}else{
alert(_11b4.responseText);
throw new Error("WebServiceResolver: Could not read WSDL: "+url);
}
return _11b3;
};
WebServiceResolver.prototype.getPortAddress=function(){
return this._WSDLURL.split("?WSDL")[0];
};
WebServiceResolver.prototype.getTargetNamespace=function(){
return this._root.getAttribute("targetNamespace");
};
WebServiceResolver.prototype.getOperations=function(){
var _11b5=new List();
var _11b6=this.resolveAll("wsdl:portType/wsdl:operation",this._root);
if(_11b6.hasEntries()){
while(_11b6.hasNext()){
var _11b7=_11b6.getNext();
var name=_11b7.getAttribute("name");
_11b5.add(new WebServiceOperation(name,this.getPortAddress(),new SOAPEncoder(this,name),new SOAPDecoder(this,name)));
}
}else{
throw new Error("WebServiceResolver: No portType found.");
}
return _11b5;
};
WebServiceResolver.prototype.getSchema=function(){
return this._schema;
};
function WebServiceOperation(name,_11ba,_11bb,_11bc){
this.name=name;
this.address=_11ba;
this.encoder=_11bb;
this.decoder=_11bc;
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
var _11c0=wsdl.getOperations();
_11c0.each(function(_11c1){
proxy[_11c1.name]=WebServiceProxy.createProxyOperation(_11c1);
});
return proxy;
};
WebServiceProxy.prototype._log=function(_11c2,_11c3){
if(WebServiceProxy.isLoggingEnabled&&Application.isDeveloperMode&&_11c3){
var log=_11c3 instanceof SOAPRequest?"SOAPRequest for ":"SOAPResponse from ";
log+=_11c2.address+": "+_11c2.name+"\n\n";
log+=DOMSerializer.serialize(_11c3.document,true);
this.logger.fine(log);
}
};
WebServiceProxy.createProxyOperation=function(_11c5){
return function(){
var _11c6=null,_11c7=_11c5.encoder.encode(new List(arguments));
this._log(_11c5,_11c7);
var _11c8=_11c7.invoke(_11c5.address);
this._log(_11c5,_11c8);
if(_11c8){
if(_11c8.fault){
_11c6=SOAPFault.newInstance(_11c5,_11c8.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_11c6,_11c7,_11c8);
}
}else{
if(WebServiceProxy.isDOMResult){
_11c6=_11c8.document;
}else{
_11c6=_11c5.decoder.decode(_11c8);
}
}
}
_11c7.dispose();
return _11c6;
};
};
WebServiceProxy.handleFault=function(_11c9,_11ca,_11cb){
try{
Dialog.invokeModal(Dialog.URL_SERVICEFAULT,null,{soapFault:_11c9,soapRequest:_11ca,soapResponse:_11cb});
}
catch(exception){
alert(_11c9.getFaultString());
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
var _11cc=SystemLogger.getLogger("MessageQueue");
var _11cd=null;
var _11ce=0;
var _11cf=null;
var _11d0=new Map();
var _11d1=new Map();
var _11d2=false;
var _11d3=false;
var _11d4={"Main":DockBinding.MAIN,"BottomLeft":DockBinding.BOTTOMLEFT,"BottomRight":DockBinding.BOTTOMRIGHT,"RightTop":DockBinding.RIGHTTOP,"RightBottom":DockBinding.RIGHTBOTTOM,"AbsBottomLeft":DockBinding.ABSBOTTOMLEFT,"AbsBottomRight":DockBinding.ABSBOTTOMRIGHT};
this.initialize=function(){
_11cd=ConsoleMessageQueueService;
_11ce=_11cd.GetCurrentSequenceNumber("dummyparam!");
this.index=_11ce;
EventBroadcaster.subscribe(BroadcastMessages.VIEW_COMPLETED,this);
EventBroadcaster.subscribe(BroadcastMessages.VIEW_CLOSED,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_OFFLINE,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_ONLINE,this);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
};
this._autoupdate=function(){
if(!_11d2){
if(!MessageQueue._actions.hasEntries()){
var _11d5=WebServiceProxy.isLoggingEnabled;
if(Application.isLoggedIn){
_11d3=true;
WebServiceProxy.isLoggingEnabled=false;
MessageQueue.update();
WebServiceProxy.isLoggingEnabled=_11d5;
_11d3=false;
}
}
}
};
this._pokeserver=function(){
if(_11d2==true){
if(ReadyService.IsServerReady(true)){
MessageQueue._lockSystem(false);
}
}
};
this.update=function(){
if(Application.isLoggedIn){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_REQUESTED,_11d3);
var _11d6=_11cd.GetMessages(Application.CONSOLE_ID,this.index);
if(_11d6!=null){
if(Types.isDefined(_11d6.CurrentSequenceNumber)){
var _11d7=_11d6.CurrentSequenceNumber;
if(_11d7<this.index){
_11cc.debug("SERVER WAS RESTARTED! old messagequeue index: "+this.index+", new messagequeue index: "+_11d7);
}
this.index=_11d7;
var _11d8=new List(_11d6.ConsoleActions);
if(_11d8.hasEntries()){
this.evaluate(_11d8);
}else{
if(!this._actions.hasEntries()){
broadcastUpdateEvaluated();
}
}
}else{
_11cc.error("No sequencenumber in MessageQueue response!");
}
}
}
};
this.evaluate=function(_11d9){
var _11da=new List();
if(_11d9.hasEntries()){
_11d9.each(function(_11db){
if(this._index[_11db.Id]!=true){
_11da.add(_11db);
}
this._index[_11db.Id]=true;
},this);
if(_11da.hasEntries()){
if(this._actions.hasEntries()){
this._actions.merge(_11da);
}else{
this._actions=_11da;
}
this._nextAction();
}
}
};
this._closeAllViews=function(_11dc){
var _11dd="(No reason)";
if(_11dc!=null){
_11dd=_11dc.Reason;
}
var title="Warning";
var text="The server has requested a close of all active editors for the following reason: \"${reason}\". It is recommended that you accept this request by clicking OK.";
text=text.replace("${reason}",_11dd);
var self=this;
Dialog.warning(title,text,Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_11e1){
if(_11e1==Dialog.RESPONSE_ACCEPT){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEWS);
}
self._nextAction();
}});
};
this._nextAction=function(){
var _11e2=null;
if(this._actions.hasEntries()){
var _11e3=this._actions.extractFirst();
_11ce=_11e3.SequenceNumber;
_11cc.debug("MessageQueue action: "+_11e3.ActionType+" > QUEUE-MAX-SEQNUM: "+this.index+" > CURRENT SEQNUM: "+_11ce+" > ACTIONS-LEFT: "+this._actions.getLength());
switch(_11e3.ActionType){
case "OpenView":
_11e2=_11e3.OpenViewParams;
if(_11e2.ViewType=="ModalDialog"){
openDialogView(_11e2);
}else{
_11cf=_11e2.ViewId;
openView(_11e2);
}
break;
case "CloseView":
_11e2=_11e3.CloseViewParams;
_11cf=_11e2.ViewId;
closeView(_11e2);
break;
case "RefreshTree":
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,_11e3.RefreshTreeParams.EntityToken);
var debug="REFRESHING TREES: "+_11d0.countEntries()+"\n";
_11d0.each(function(token){
debug+="\n\tTOKEN: "+token;
});
_11cc.debug(debug);
if(!_11d0.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "MessageBox":
openMessageBox(_11e3.MessageBoxParams);
break;
case "OpenViewDefinition":
_11e2=_11e3.OpenViewDefinitionParams;
_11cf=_11e2.Handle;
openViewDefinition(_11e2);
break;
case "LogEntry":
logEntry(_11e3.LogEntryParams);
this._nextAction();
break;
case "Reboot":
Application.reload(true);
break;
case "LockSystem":
MessageQueue._lockSystem(true);
break;
case "BroadcastMessage":
_11e2=_11e3.BroadcastMessageParams;
_11cc.debug("Server says: EventBroadcaster.broadcast ( \""+_11e2.Name+"\", "+_11e2.Value+" )");
EventBroadcaster.broadcast(_11e2.Name,_11e2.Value);
this._nextAction();
break;
case "CollapseAndRefresh":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_COLLAPSEALL);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
if(!_11d0.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "CloseAllViews":
this._closeAllViews(_11e3.CloseAllViewsParams);
break;
case "SaveStatus":
saveStatus(_11e3.SaveStatusParams);
this._nextAction();
break;
case "DownloadFile":
Download.init(_11e3.DownloadFileParams.Url);
this._nextAction();
break;
case "ExpandTreeNode":
this._nextAction();
break;
case "BindEntityTokenToView":
_11e2=_11e3.BindEntityTokenToViewParams;
EventBroadcaster.broadcast(BroadcastMessages.BIND_TOKEN_TO_VIEW,{handle:_11e2.ViewId,entityToken:_11e2.EntityToken});
this._nextAction();
break;
case "OpenGenericView":
_11e2=_11e3.OpenGenericViewParams;
openGenericView(_11e2);
break;
default:
Dialog.error("Dysfunction","Unhandled action: "+_11e3.ActionType);
break;
}
}else{
broadcastUpdateEvaluated();
}
};
function broadcastUpdateEvaluated(){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_EVALUATED,_11d3);
}
function logEntry(_11e6){
var _11e7=_11e6.Level.toLowerCase();
SystemLogger.getLogger(_11e6.SenderId)[_11e7](_11e6.Message);
}
function openView(_11e8){
var list=paramsToList(_11e8.Argument);
if(list.hasEntries()){
var def=ViewDefinition.clone("Composite.Management.PostBackView",_11e8.ViewId);
def.entityToken=_11e8.EntityToken;
def.flowHandle=_11e8.FlowHandle;
def.position=_11d4[_11e8.ViewType],def.label=_11e8.Label;
def.image=_11e8.Image;
def.toolTip=_11e8.ToolTip;
def.argument={"url":_11e8.Url,"list":list};
StageBinding.presentViewDefinition(def);
}else{
StageBinding.presentViewDefinition(new HostedViewDefinition({handle:_11e8.ViewId,entityToken:_11e8.EntityToken,flowHandle:_11e8.FlowHandle,position:_11d4[_11e8.ViewType],url:_11e8.Url,label:_11e8.Label,image:_11e8.Image,toolTip:_11e8.ToolTip}));
}
}
function openDialogView(_11eb){
StageBinding.presentViewDefinition(new DialogViewDefinition({handle:_11eb.ViewId,flowHandle:_11eb.FlowHandle,position:Dialog.MODAL,url:_11eb.Url,handler:{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}}}));
}
function openMessageBox(_11ec){
var _11ed=_11ec.DialogType.toLowerCase();
if(_11ed=="question"){
throw "Not supported!";
}else{
Dialog[_11ed](_11ec.Title,_11ec.Message,null,{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}});
}
}
function openViewDefinition(_11ee){
var map={};
var _11f0=false;
new List(_11ee.Argument).each(function(entry){
map[entry.Key]=entry.Value;
_11f0=true;
});
var proto=ViewDefinitions[_11ee.Handle];
if(proto!=null){
var def=null;
if(proto.isMutable==false){
def=proto;
}else{
def=new HostedViewDefinition();
for(var prop in proto){
def[prop]=proto[prop];
}
def.handle=_11ee.ViewId;
}
def.argument=_11f0?map:null;
StageBinding.presentViewDefinition(def);
}else{
throw "Unknown ViewDefinition: "+param.Handle;
}
}
function openGenericView(_11f5){
var def=ViewBinding.clone("Composite.Management.GenericView",_11f5.ViewId);
def.label=_11f5.Label;
def.toolTip=_11f5.ToolTip;
def.image=_11f5.Image;
def.argument={"url":_11f5.Url,"list":paramsToList(_11f5.UrlPostArguments)};
StageBinding.presentViewDefinition(def);
}
function closeView(_11f7){
if(StageBinding.isViewOpen(_11f7.ViewId)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_11f7.ViewId);
}else{
MessageQueue._nextAction();
}
}
function saveStatus(_11f8){
EventBroadcaster.broadcast(BroadcastMessages.CURRENT_SAVED,{handle:_11f8.ViewId,isSuccess:_11f8.Succeeded});
}
this._lockSystem=function(_11f9){
var _11fa=top.bindingMap.offlinetheatre;
if(_11f9){
_11fa.play(true);
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._pokeserver,MessageQueue.INTERVAL_OFFLINE);
}else{
_11fa.stop();
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
var self=this;
setTimeout(function(){
if(self._actions.hasEntries()){
self._nextAction();
}
},0);
}
_11d2=_11f9;
};
this.handleBroadcast=function(_11fc,arg){
switch(_11fc){
case BroadcastMessages.APPLICATION_LOGIN:
this.initialize();
break;
case BroadcastMessages.VIEW_COMPLETED:
case BroadcastMessages.VIEW_CLOSED:
if(_11cf!=null&&arg==_11cf){
_11cf=null;
this._nextAction();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHING:
if(arg!=null){
_11d0.set(arg,true);
}else{
_11cc.debug("Saa har vi balladen!");
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED:
if(_11d0.hasEntries()){
_11d0.del(arg);
_11cc.debug("Refreshed tree: "+arg+"\n("+_11d0.countEntries()+" trees left!)");
if(!_11d0.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
setTimeout(function(){
MessageQueue._nextAction();
},0);
}
}
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN:
_11d1.set(arg,true);
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN:
if(_11d1.hasEntries()==true){
_11d1.del(arg);
if(!_11d1.hasEntries()){
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
function paramsToList(_11fe){
var list=new List();
new List(_11fe).each(function(entry){
list.add({name:entry.Key,value:entry.Value});
});
return list;
}
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
};
var ViewDefinitions={"Composite.Management.Null":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.Null"}),"Composite.Management.PostBackDialog":new DialogViewDefinition({handle:"Composite.Management.PostBackDialog",isMutable:true,position:Dialog.MODAL,url:"${root}/content/dialogs/postback/postbackdialog.aspx",argument:{"url":null,"list":null}}),"Composite.Management.PostBackView":new HostedViewDefinition({handle:"Composite.Management.PostBackView",isMutable:true,position:DockBinding.MAIN,url:"${root}/postback.aspx",argument:{"url":null,"list":null}}),"Composite.Management.GenericView":new HostedViewDefinition({handle:"Composite.Management.GenericView",isMutable:true,position:DockBinding.MAIN,url:"${root}/content/views/generic/generic.aspx",label:null,image:null,toolTip:null,argument:{"url":null,"list":null}}),"Composite.Management.Start":new HostedViewDefinition({handle:"Composite.Management.Start",position:DockBinding.START,label:"Welcome Travellers",url:"${root}/content/views/start/start.aspx"}),"Composite.Management.About":new DialogViewDefinition({handle:"Composite.Management.About",position:Dialog.MODAL,url:"${root}/content/dialogs/about/about.aspx"}),"Composite.Management.PermissionEditor":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.PermissionEditor",position:DockBinding.MAIN,url:"${root}/content/views/editors/permissioneditor/permissioneditor.aspx",argument:{serializedEntityToken:"entityTokenType='Composite\\.Plugins\\.Elements\\.ElementProviders\\.VirtualElementProvider\\.VirtualElementProviderEntityToken,Composite'entityToken='_EntityToken_Type_=\\'Composite\\\\\\.Plugins\\\\\\.Elements\\\\\\.ElementProviders\\\\\\.VirtualElementProvider\\\\\\.VirtualElementProviderEntityToken,Composite\\'_EntityToken_Source_=\\'VirtualElementProvider\\'_EntityToken_Id_=\\'DesignPerspective\\''\""}}),"Composite.Management.SystemLog":new HostedViewDefinition({handle:"Composite.Management.SystemLog",position:DockBinding.ABSBOTTOMLEFT,label:"System Log",url:"${root}/content/views/dev/systemlog/systemlog.aspx"}),"Composite.Management.Developer":new HostedViewDefinition({handle:"Composite.Management.Developer",position:DockBinding.ABSBOTTOMRIGHT,label:"Developer",url:"${root}/content/views/dev/developer/developer.aspx"}),"Composite.Management.IconPack.System":new HostedViewDefinition({handle:"Composite.Management.IconPack.System",position:DockBinding.ABSBOTTOMLEFT,label:"Freja",image:"${icon:icon}",url:"${root}/content/views/dev/icons/system/Default.aspx"}),"Composite.Management.IconPack.Republic":new HostedViewDefinition({handle:"Composite.Management.IconPack.Republic",position:DockBinding.ABSBOTTOMLEFT,label:"Republic",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/republic.aspx"}),"Composite.Management.IconPack.Harmony":new HostedViewDefinition({handle:"Composite.Management.IconPack.Harmony",position:DockBinding.ABSBOTTOMLEFT,label:"Harmony",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/harmony.aspx"}),"Composite.Management.Explorer":new HostedViewDefinition({handle:"Composite.Management.Explorer",position:DockBinding.EXPLORER,url:"${root}/content/views/explorer/explorer.aspx",label:"Explorer"}),"Composite.Management.Options":new DialogViewDefinition({handle:"Composite.Management.Options",position:Dialog.MODAL,url:"${root}/content/dialogs/options/options.aspx",label:"Options"}),"Composite.Management.VisualEditorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.VisualEditorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/wysiwygeditor/wysiwygeditordialog.aspx",width:600,argument:{"formattingconfiguration":null,"elementclassconfiguration":null,"configurationstylesheet":null,"presentationstylesheet":null,"embedablefieldstypenames":null}}),"Composite.Management.MultiSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MultiSelectorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/multiselector/multiselectordialog.aspx"}),"Composite.Management.Search":new HostedViewDefinition({handle:"Composite.Management.Search",position:DockBinding.RIGHTBOTTOM,url:"${root}/content/views/search/search.aspx",label:"Search",image:"${icon:view_search}",argument:null}),"Composite.Management.Browser":new HostedViewDefinition({isMutable:false,handle:"Composite.Management.Browser",position:DockBinding.MAIN,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,label:"Page Browser",image:"${icon:page-view-administrated-scope}",toolTip:"Browse unpublished pages",url:"${root}/content/views/browser/browser.aspx",argument:{"URL":null}}),"Composite.Management.SEOAssistant":new HostedViewDefinition({handle:"Composite.Management.SEOAssistant",position:DockBinding.RIGHTTOP,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,url:"${root}/content/views/seoassist/seoassist.aspx",label:"${string:Composite.Web.SEOAssistant:SEOAssistant}",image:"${icon:seoassistant}",toolTip:"Search engine optimization"}),"Composite.Management.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.SourceCodeViewer",position:DockBinding.ABSBOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.User.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.User.SourceCodeViewer",position:DockBinding.BOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.Management.Help":new HostedViewDefinition({label:"Help",image:"${icon:help}",handle:"Composite.Management.Help",position:DockBinding.ABSRIGHTTOP,url:"${root}/content/views/help/help.aspx"}),"Composite.Management.Dialog.Translations":new DialogViewDefinition({handle:"Composite.Management.TranslationsDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/translations/translations.aspx",label:"Translations",image:"${icon:users-changepublicculture}"}),"Composite.Management.ImageSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.ImageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_IMAGESELECTOR,argument:{label:"Select Image",image:"${icon:image}",selectionProperty:"ElementType",selectionValue:"image/jpeg image/gif image/png image/bmp image/tiff",selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WebImages"}]}}),"Composite.Management.EmbeddableMediaSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Media",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:null}]}}),"Composite.Management.FrontendFileSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Frontend File",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"LayoutFileElementProvider"}]}}),"Composite.Management.PageSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Page",image:"${icon:page}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.PageIdSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageIdSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Page",image:"${icon:page}",selectionProperty:"DataId",selectionValue:null,selectionResult:"DataId",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.LinkableSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.LinkableSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Page or File",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"},{key:"MediaFileElementProvider"}]}}),"Composite.Management.MediaSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.MediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Page or File",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider"}]}}),"Composite.Management.FunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.FunctionSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Function",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider"}]}}),"Composite.Management.WidgetFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.WidgetFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Widget",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllWidgetFunctionsElementProvider"}]}}),"Composite.Management.XhtmlDocumentFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.XhtmlDocumentFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Function",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider",search:"AllFunctionsElementProvider.XhtmlDocument"}]}})};
var KickStart=new function(){
var _1201=false;
var _1202=false;
var _1203=null;
var _1204=false;
var _1205=Client.qualifies();
var _1206="admin";
var _1207="123456";
this.fireOnLoad=function(){
if(_1205){
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
this.handleBroadcast=function(_1208){
switch(_1208){
case BroadcastMessages.AUDIO_INITIALIZED:
case BroadcastMessages.PERSISTANCE_INITIALIZED:
kickStart(_1208);
break;
case BroadcastMessages.APPLICATION_STARTUP:
break;
case BroadcastMessages.KEY_ENTER:
this.login();
break;
case BroadcastMessages.APPLICATION_LOGIN:
var _1209=window.bindingMap.appwindow;
_1209.setURL("app.aspx");
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
function fileEventBroadcasterSubscriptions(_120a){
new List([BroadcastMessages.AUDIO_INITIALIZED,BroadcastMessages.PERSISTANCE_INITIALIZED,BroadcastMessages.APPLICATION_STARTUP,BroadcastMessages.APPLICATION_LOGIN,BroadcastMessages.APPLICATION_OPERATIONAL]).each(function(_120b){
if(_120a){
EventBroadcaster.subscribe(_120b,KickStart);
}else{
EventBroadcaster.unsubscribe(_120b,KickStart);
}
});
}
function kickStart(_120c){
switch(_120c){
case BroadcastMessages.AUDIO_INITIALIZED:
_1202=true;
setTimeout(function(){
Persistance.initialize();
},0);
break;
case BroadcastMessages.PERSISTANCE_INITIALIZED:
_1201=true;
break;
}
if(_1201&&_1202){
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
DataManager.getDataBinding("username").setValue(_1206);
DataManager.getDataBinding("password").setValue(_1207);
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
this.doLogin=function(_120f,_1210){
var _1211=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _1212=false;
var _1213=LoginService.ValidateAndLogin(_120f,_1210);
if(_1213 instanceof SOAPFault){
alert(_1213.getFaultString());
}else{
_1212=_1213;
}
if(_1212){
EventBroadcaster.unsubscribe(BroadcastMessages.KEY_ENTER,KickStart);
accessGranted();
}else{
Application.unlock(KickStart);
if(bindingMap.decks!=null){
accesssDenied();
}
}
WebServiceProxy.isFaultHandler=true;
if(_1211){
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
var _1214=DataManager.getDataBinding("username");
var _1215=DataManager.getDataBinding("password");
_1214.blur();
_1215.blur();
_1214.setValue("");
_1215.setValue("");
_1214.clean();
_1215.clean();
_1214.focus();
document.getElementById("loginerror").style.display="block";
var _1216={handleAction:function(_1217){
document.getElementById("loginerror").style.display="none";
_1217.target.removeActionListener(Binding.ACTION_DIRTY,_1216);
}};
bindingMap.loginfields.addActionListener(Binding.ACTION_DIRTY,_1216);
}
WindowManager.fireOnLoad(this);
if(!_1205){
UpdateManager.isEnabled=false;
}
};

