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
if(arg){
this.init(arg);
}
return this;
}
List.prototype.init=function(_1a){
var _1b=_1a.splice!=null;
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
while((e=this._array[i++])!=null){
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
return this._index<this._array.length;
};
List.prototype.getNext=function(){
var _29=null;
if(this.hasNext()){
_29=this._array[this._index++];
}
return _29;
};
List.prototype.getFollowing=function(_2a){
var _2b=null;
var i=0,e=null;
while((e=this._array[i])!=null&&!_2b){
if(e==_2a&&this._array[i+1]){
_2b=this._array[i+1];
}
i++;
}
return _2b;
};
List.prototype.getPreceding=function(_2e){
var _2f=null;
var i=1,e=null;
while((e=this._array[i])!=null&&!_2f){
if(e==_2e&&this._array[i-1]){
_2f=this._array[i-1];
}
i++;
}
return _2f;
};
List.prototype.getIndex=function(_32){
var _33=-1;
if(this._array.indexOf!=null){
_33=this._array.indexOf(_32);
}else{
var _34=0;
this.each(function(e){
var res=true;
if(e==_32){
_33=_34;
res=false;
}
_34++;
return res;
});
}
return _33;
};
List.prototype.reset=function(){
this._index=0;
return this;
};
List.prototype.clear=function(){
this._array=[];
return this.reset();
};
List.prototype.each=function(_37,_38){
this.reset();
var is=true;
while(is!=false&&this.hasNext()){
var _3a=this._index;
is=_37.call(_38,this.getNext(),_3a);
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
List.prototype.merge=function(_3b){
_3b.reset();
while(_3b.hasNext()){
this.add(_3b.getNext());
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
var _40=null;
if(this.has(key)){
_40=this._map[key];
}else{
var cry="Map: Invalid key: "+key;
SystemLogger.getLogger("Map").error(cry);
SystemDebug.stack(arguments);
if(Application.isDeveloperMode){
alert(cry);
}
}
return _40;
};
Map.prototype.set=function(key,_43){
this._map[key]=_43;
};
Map.prototype.del=function(key){
delete this._map[key];
};
Map.prototype.has=function(key){
return typeof this._map[key]!="undefined";
};
Map.prototype.each=function(_46){
for(var key in this._map){
var _48=_46(key,this._map[key]);
if(_48==false){
break;
}
}
};
Map.prototype.hasEntries=function(){
var _49=false;
for(var key in this._map){
_49=true;
break;
}
return _49;
};
Map.prototype.countEntries=function(){
var _4b=0;
for(var key in this._map){
_4b++;
}
return _4b;
};
Map.prototype.toList=function(_4d){
var _4e=new List();
for(var key in this._map){
_4e.add(_4d?key:this._map[key]);
}
return _4e;
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
_EventBroadcaster.prototype={_broadcasts:{},subscribe:function(_56,_57){
if(_56!=null){
if(!Interfaces.isImplemented(IBroadcastListener,_57,true)){
throw ("IBroadcastListener not implemented: "+_56);
}else{
if(!this._broadcasts[_56]){
this._broadcasts[_56]=[_57];
}else{
this._broadcasts[_56].push(_57);
}
}
}else{
SystemDebug.stack(arguments);
throw "Undefined broadcast: "+_57;
}
},unsubscribe:function(_58,_59){
if(_58!=null){
if(Interfaces.isImplemented(IBroadcastListener,_59)){
var i=0,_5b,_5c=this._broadcasts[_58];
if(_5c){
while(i<_5c.length){
_5b=_5c[i];
if(_5b==_59){
_5c.splice(i,1);
break;
}
i++;
}
}
}
}else{
throw "Undefined broadcast"+_59;
}
},hasSubscribers:function(_5d){
var _5e=this._broadcasts[_5d];
return _5e!=null&&_5e.length>0;
},broadcast:function(_5f,_60){
if(_5f!=null){
var i=0,_62=this._broadcasts[_5f];
var _63=[];
if(_62!=null){
var _64=new List();
while(i<_62.length){
_63.push(_62[i++]);
}
i=0;
while(i<_63.length){
var _65=_63[i];
try{
_65.handleBroadcast(_5f,_60);
}
catch(exception){
_64.add(_65);
var cry="Exception in "+new String(_65)+" on broadcast '"+_5f+"':"+new String(exception);
SystemLogger.getLogger("EventBroadcaster").error(cry);
SystemDebug.stack(arguments);
if(Application.isDeveloperMode){
alert(cry);
throw (exception);
}
}
i++;
}
if(_64.hasEntries()){
_64.each(function(_67){
EventBroadcaster.unsubscribe(_5f,_67);
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
var _68=navigator.userAgent.toLowerCase();
var _69=navigator.platform.toLowerCase();
var _6a=typeof document.createTreeWalker!="undefined";
var _6b=_6a&&(_68.indexOf("webrunner")>-1||_68.indexOf("prism")>-1);
var _6c=history.pushState!=null;
this.isMozilla=_6a;
this.isWebKit=_68.indexOf("webkit")>-1;
this.isExplorer=!_6a;
this.isExplorer6=this.isExplorer&&(_68.indexOf("msie 6.0")>-1||_68.indexOf("msie 6.1")>-1);
this.isExplorer8=this.isExplorer&&window.XDomainRequest!=null;
this.isPrism=_6b;
this.isWindows=_69.indexOf("win")>-1;
this.isVista=this.isWindows&&_68.indexOf("windows nt 6")>-1;
var _6d=this._getFlashVersion();
this.hasFlash=(_6d&&_6d>=9);
this.hasTransitions=_6c;
return this;
}
_Client.prototype={isExplorer:false,isMozilla:false,isPrism:false,hasFlash:false,isWindows:false,isVista:false,hasTransitions:false,_getFlashVersion:function(){
var _6e=null;
var _6f=10;
try{
if(this.isMozilla==true){
if(typeof navigator.plugins["Shockwave Flash"]!="undefined"){
var _70=navigator.plugins["Shockwave Flash"];
if(_70){
var _71=_70.description;
if(_71!=null){
_6e=_71.charAt(_71.indexOf(".")-1);
}
}
}
}else{
for(var i=2;i<=_6f;i++){
try{
new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+i);
_6e=i;
}
catch(exception){
continue;
}
}
}
}
catch(exception){
}
return _6e;
},qualifies:function(){
var _73=true;
var _74=false;
if(this.isMozilla&&!this.isWebKit){
_74=(document.documentElement.mozMatchesSelector==null);
}
if(this.isWebKit||window.opera!=null||_74||this.isExplorer6){
_73=false;
}
return _73;
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
function SystemLogger(_75){
this.identifier=_75;
}
SystemLogger.prototype.info=function(_76){
SystemLogger.log(this.identifier,SystemLogger.LEVEL_INFO,_76);
};
SystemLogger.prototype.debug=function(_77){
if(_77=="page"){
alert(arguments.caller.callee);
}
SystemLogger.log(this.identifier,SystemLogger.LEVEL_DEBUG,_77);
};
SystemLogger.prototype.error=function(_78){
SystemLogger.log(this.identifier,SystemLogger.LEVEL_ERROR,_78);
};
SystemLogger.prototype.warn=function(_79){
SystemLogger.log(this.identifier,SystemLogger.LEVEL_WARN,_79);
};
SystemLogger.prototype.fatal=function(_7a){
SystemLogger.log(this.identifier,SystemLogger.LEVEL_FATAL,_7a);
};
SystemLogger.prototype.fine=function(_7b){
SystemLogger.log(this.identifier,SystemLogger.LEVEL_FINE,_7b);
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
SystemLogger.getLogger=function(_7d){
var _7e=SystemLogger.loggers[_7d];
if(!_7e){
_7e=new SystemLogger(_7d);
SystemLogger.loggers[_7d]=_7e;
}
return _7e;
};
SystemLogger.flushBuffer=function(){
SystemLogger.buffer.reset();
SystemLogger.isFlushing=true;
if(SystemLogger.buffer.hasEntries()){
while(SystemLogger.buffer.hasNext()){
var _7f=SystemLogger.buffer.getNext();
this.log(_7f.identifier,_7f.level,_7f.message);
}
}
SystemLogger.isFlushing=false;
};
SystemLogger.bufferLog=function(_80,_81,_82){
_82=String(_82);
SystemLogger.buffer.add({identifier:_80,level:_81,message:_82});
};
SystemLogger.outputLog=function(_83,_84,_85){
_85=String(_85);
if(!SystemLogger.isFlushing){
SystemLogger.bufferLog(_83,_84,_85);
}
var win=SystemLogger.outputWindow;
var doc=SystemLogger.outputDocument;
var elm=SystemLogger.outputElement;
var div=doc.createElement("div");
var _8a=doc.createElement("span");
var pre=doc.createElement("pre");
if(Client.isExplorer){
_85=_85.replace(/</g,"&lt;");
_85=_85.replace(/>/g,"&gt;");
_85=_85.replace(/\n/g,"<br/>");
_85=_85.replace(/\t/g,SystemLogger.TAB_SEQUENCE);
pre.innerHTML=_85;
}else{
pre.textContent=_85;
}
div.className=_84;
_8a.innerHTML=_83;
div.appendChild(_8a);
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
SystemTimer.getTimer=function(_8d){
return new SystemTimer(_8d.toString());
};
function SystemTimer(id){
this.logger=SystemLogger.getLogger("SystemTimer");
this._id=id;
this._time=new Date().getTime();
}
SystemTimer.prototype.reset=function(){
this._time=new Date().getTime();
};
SystemTimer.prototype.report=function(_8f){
this.logger.debug(this._id+": "+this.getTime()+(_8f?": "+_8f:""));
};
SystemTimer.prototype.getTime=function(){
return new Date().getTime()-this._time;
};
function _SystemDebug(){
}
_SystemDebug.prototype={_logger:SystemLogger.getLogger("SystemDebug"),_stacklength:parseInt(5),stack:function(_90,_91){
this._stackMozilla(_90,_91);
},_stackMozilla:function(_92,_93){
_93=_93?_93:this._stacklength;
if(Client.isMozilla&&_92.callee||_92.caller){
var _94=Client.isMozilla?_92.callee.caller:_92.caller.callee;
var _95="";
var i=0;
while(_94!=null&&i++<_93){
_95+="\n#"+i+"\n";
_95+=_94.toString();
_94=_94.caller;
_95+="\n";
}
this._logger.error(_95);
}else{
this._logger.error("(Error stack unreachable!)");
}
}};
var SystemDebug=new _SystemDebug;
function _Interfaces(){
var _97=SystemLogger.getLogger("Interfaces");
this.isImplemented=function(_98,_99,_9a){
var _9b=true;
for(var _9c in _98){
if(typeof _99[_9c]==Types.UNDEFINED){
_9b=false;
}else{
if(typeof _98[_9c]!=typeof _99[_9c]){
_9b=false;
}
}
if(!_9b){
break;
}
}
if(!_9b){
if(_9a){
_97.fine(_99+" invalid. Interface check abandoned at: "+_9c);
}
}
return _9b;
};
}
var Interfaces=new _Interfaces;
function _Types(){
}
_Types.prototype={_logger:SystemLogger.getLogger("Types"),BOOLEAN:"boolean",STRING:"string",NUMBER:"number",FUNCTION:"function",UNDEFINED:"undefined",castFromString:function(_9d){
var _9e=_9d;
if(parseInt(_9e).toString()==_9e){
_9e=parseInt(_9e);
}else{
if(parseFloat(_9e).toString()==_9e){
_9e=parseFloat(_9e);
}else{
if(_9e=="true"||_9e=="false"){
_9e=eval(_9e);
}else{
}
}
}
return _9e;
},isDefined:function(arg){
return typeof arg!=Types.UNDEFINED;
},isFunction:function(arg){
return typeof arg==Types.FUNCTION;
}};
var Types=new _Types();
var MimeTypes={JPG:"image/jpeg",GIF:"image/gif",PNG:"image/png",CSS:"text/css",JAVASCRIPT:"text/javascript",TEXT:"text/plain",HTML:"text/html",XHTML:"applcication/xhtml+xml",FLASH:"application/x-shockwave-flash",QUICKTIME:"video/quicktime",SHOCKWAVE:"application/x-director",WINMEDIA:"application/x-mplayer2",COMPOSITEPAGES:"application/x-composite-page",COMPOSITEFUNCTION:"application/x-composite-function"};
window.SearchTokens=new function(){
var _a1={"MediaFileElementProvider.WebImages":null,"MediaFileElementProvider.EmbeddableMedia":null,"AllFunctionsElementProvider.XhtmlDocument":null,"AllFunctionsElementProvider.XsltFunctionCall":null};
this.getToken=function(key){
var _a3=null;
if(this.hasToken(key)){
_a3=_a1[key];
}else{
throw "Unknown search token key: "+key;
}
return _a3;
};
this.hasToken=function(key){
return typeof _a1[key]!=Types.UNDEFINED;
};
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,{handleBroadcast:function(){
new List(TreeService.GetSearchTokens(true)).each(function(_a5){
if(SearchTokens.hasToken(_a5.Key)){
_a1[_a5.Key]=_a5.Value;
}else{
alert("SearchTokens need updating!");
}
});
}});
};
window.StringBundle=new function(){
var _a6=SystemLogger.getLogger("StringBundle");
this.UI="Composite.Management";
var _a7={};
function resolve(_a8,_a9){
var _aa=new List(StringService.GetLocalisation(_a8));
if(_aa.hasEntries()){
_aa.each(function(_ab){
_a9[_ab.Key]=_ab.Value;
});
}else{
throw "No strings from provider: "+_a8;
}
}
this.getString=function(_ac,_ad){
var _ae=null;
if(window.StringService!=null){
try{
if(_ac=="ui"){
_ac=StringBundle.UI;
}
if(!_a7[_ac]){
var _af=_a7[_ac]={};
resolve(_ac,_af);
}
if(_a7[_ac]){
_ae=_a7[_ac][_ad];
}
if(!_ae){
throw "No such string: "+_ad;
}
}
catch(exception){
var cry="StringBundle exception in string "+_ac+":"+_ad;
_a6.error(cry);
if(Application.isDeveloperMode){
alert(cry);
}
}
}
return _ae;
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
var _b3=false;
if(this._uniqueKeys[key]){
_b3=true;
}
return _b3;
}};
var KeyMaster=new _KeyMaster();
function _ImageProvider(){
}
_ImageProvider.prototype={_logger:SystemLogger.getLogger("ImageProvider"),SERVICE_URL:"services/Icon/GetIcon.ashx",UI:"Composite.Icons",getImageURL:function(_b4,_b5){
var _b6=null;
var url=Constants.APPROOT+"/"+this.SERVICE_URL+"?resourceName=${name}&resourceNamespace=${hash}&size=${size}";
var _b8=_b4.ResourceNamespace;
var _b9=_b4.ResourceName;
_b5=_b5?_b5:"DEFAULT";
if(_b9!=null&&_b8!=null){
_b6=url.replace("${name}",_b9).replace("${hash}",_b8).replace("${size}",_b5);
if(_b5=="DEFAULT"){
_b6=_b6.split("&size=DEFAULT")[0];
}
}else{
throw "Could not compute image URL.";
}
return _b6;
}};
var ImageProvider=new _ImageProvider();
function _Resolver(){
}
_Resolver.prototype={_logger:SystemLogger.getLogger("Resolver"),resolve:function(_ba){
if(typeof _ba!=Types.UNDEFINED){
_ba=String(_ba);
_ba=_ba.replace("${root}",Constants.APPROOT);
_ba=_ba.replace("${skin}",Constants.SKINROOT);
_ba=_ba.replace("${tinymce}",Constants.TINYMCEROOT);
_ba=_ba.replace("${tiny}",Constants.TINYROOT);
if(_ba.indexOf("${icon:")>-1){
_ba=this._resolveImage(_ba);
}else{
if(_ba.indexOf("${string:")>-1){
_ba=this._resolveString(_ba);
}
}
}
return _ba;
},resolveVars:function(_bb,_bc){
var i=0;
while(i<_bc.length){
_bb=_bb.replace("{"+i+"}",_bc[i]);
i++;
}
return _bb;
},_resolveString:function(_be){
var _bf=null;
var _c0=null;
var key=_be.split("${string:")[1].split("}")[0];
if(key.indexOf(":")>-1){
_c0=key.split(":")[0];
key=key.split(":")[1];
}else{
_c0=StringBundle.UI;
}
_bf=StringBundle.getString(_c0,key);
if(!_bf){
_bf="(?)";
}
return _bf;
},_resolveImage:function(_c2){
var _c3=null;
var _c4=null;
var _c5=null;
var _c6=null;
_c5=_c2.split("${icon:")[1].split("}")[0];
if(_c5.indexOf(":")>-1){
_c4=_c5.split(":")[0];
_c5=_c5.split(":")[1];
}else{
_c4=ImageProvider.UI;
}
if(_c5.indexOf("(")>-1){
_c6=_c5.split("(")[1].split(")")[0];
_c5=_c5.split("(")[0];
}
_c3=ImageProvider.getImageURL({ResourceNamespace:_c4,ResourceName:_c5},_c6);
return _c3;
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
_Cookies.prototype={createCookie:function(_c9,_ca,_cb){
var _cc="";
if(_cb){
var _cd=new Date();
_cd.setTime(_cd.getTime()+(_cb*24*60*60*1000));
_cc="; expires="+_cd.toGMTString();
}
document.cookie=_c9+"="+escape(_ca)+_cc+"; path=/";
return this.readCookie(_c9);
},readCookie:function(_ce){
var _cf=null;
var _d0=_ce+"=";
var ca=document.cookie.split(";");
for(var i=0;i<ca.length;i++){
var c=ca[i];
while(c.charAt(0)==" "){
c=c.substring(1,c.length);
}
if(c.indexOf(_d0)==0){
_cf=unescape(c.substring(_d0.length,c.length));
}
}
return _cf;
},eraseCookie:function(_d4){
this.createCookie(_d4,"",-1);
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
var _d5=SystemLogger.getLogger("StatusBar");
var _d6=null;
var _d7="${icon:error}";
var _d8="${icon:warning}";
var _d9="${icon:loading}";
var _da="${icon:message}";
var _db=null;
var _dc=null;
var _dd=null;
var _de=null;
this.initialize=function(_df){
_db=StringBundle.getString("ui","Website.App.StatusBar.Error");
_dc=StringBundle.getString("ui","Website.App.StatusBar.Warn");
_dd=StringBundle.getString("ui","Website.App.StatusBar.Busy");
_de=StringBundle.getString("ui","Website.App.StatusBar.Ready");
_d6=_df;
this.document=_df.bindingDocument;
};
this.error=function(_e0,_e1){
this.state=StatusBar.ERROR;
_e0=_e0?_e0:_db;
show(_e0,_d7,_e1,false);
};
this.warn=function(_e2,_e3){
this.state=StatusBar.WARN;
_e2=_e2?_e2:_dc;
show(_e2,_d8,_e3,false);
};
this.busy=function(_e4,_e5){
this.state=StatusBar.BUSY;
_e4=_e4?_e4:_dd;
show(_e4,_d9,_e5,false);
};
this.ready=function(_e6,_e7){
this.state=StatusBar.READY;
_e6=_e6?_e6:_de;
show(_e6,_da,_e7,true);
};
this.report=function(_e8,_e9,_ea,_eb){
this.state=null;
show(_e8,_e9,_ea,_eb);
};
this.clear=function(){
this.state=null;
if(_d6){
_d6.clear();
}
};
function show(_ec,_ed,_ee,_ef){
if(_ee){
_ec=Resolver.resolveVars(_ec,_ee);
}
if(_d6){
_d6.setLabel(_ec);
_d6.setImage(_ed);
if(_ef){
_d6.startFadeOut(StatusBar.AUTOCLEAR_TIMEOUT);
}
}else{
_d5.error("Message not initialized for display: "+_ec);
}
}
this.addToGroup=function(_f0,_f1){
if(!this._groups.has(_f0)){
this._groups.set(_f0,_d6.addRight(ToolBarGroupBinding.newInstance(this.document)));
}
this._groups.get(_f0).add(_f1);
};
}
var StatusBar=new _StatusBar();
function _Localization(){
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
EventBroadcaster.subscribe(BroadcastMessages.LANGUAGES_UPDATED,this);
EventBroadcaster.subscribe(BroadcastMessages.FROMLANGUAGE_UPDATED,this);
}
_Localization.prototype={languages:null,source:null,target:null,handleBroadcast:function(_f2,arg){
switch(_f2){
case BroadcastMessages.APPLICATION_LOGIN:
case BroadcastMessages.LANGUAGES_UPDATED:
var _f4=LocalizationService.GetActiveLocales(true);
if(_f4.length>=1){
this.languages=new List(_f4);
}else{
this.languages=null;
}
EventBroadcaster.broadcast(BroadcastMessages.UPDATE_LANGUAGES,this.languages);
break;
}
switch(_f2){
case BroadcastMessages.APPLICATION_LOGIN:
case BroadcastMessages.FROMLANGUAGE_UPDATED:
var _f5=LocalizationService.GetLocales(true);
this.source=_f5.ForeignLocaleName;
this.target=_f5.ActiveLocaleName;
EventBroadcaster.broadcast(BroadcastMessages.LOCALIZATION_CHANGED,{source:_f5.ForeignLocaleName,target:_f5.ActiveLocaleName});
break;
}
}};
var Localization=new _Localization();
function _Validator(){
}
_Validator.prototype={validate:function(_f6,key,_f8){
var _f9=true;
var _fa=SourceValidationService.ValidateSource(_f6,key);
if(_fa!="True"){
if(_f8==true){
this._dialog(_fa);
}
_f9=false;
}
return _f9;
},validateInformed:function(_fb,key){
return this.validate(_fb,key,true);
},_dialog:function(_fd){
setTimeout(function(){
Dialog.error("Source Invalid",_fd);
},0);
}};
var Validator=new _Validator();
function _DOMEvents(){
}
_DOMEvents.prototype={_logger:SystemLogger.getLogger("DOMEvents"),MOUSEDOWN:"mousedown",MOUSEUP:"mouseup",MOUSEOVER:"mouseover",MOUSEOUT:"mouseout",MOUSEMOVE:"mousemove",CLICK:"click",DOUBLECLICK:"dblclick",KEYPRESS:"keypress",KEYDOWN:"keydown",KEYUP:"keyup",CONTEXTMENU:"contextmenu",SCROLL:"scroll",LOAD:"load",BEFOREUNLOAD:"beforeunload",UNLOAD:"unload",RESIZE:"resize",FOCUS:"focus",BLUR:"blur",SUBMIT:"submit",CUT:"cut",COPY:"copy",PASTE:"paste",DOM:"DOMContentLoaded",ACTIVATE:"activate",DEACTIVATE:"deactivate",MOUSEENTER:"mouseenter",MOUSELEAVE:"mouseleave",SELECTSTART:"selectstart",FOCUSIN:"focusin",FOCUSOUT:"focusout",BEFOREUPDATE:"beforeupdate",AFTERUPDATE:"afterupdate",ERRORUPDATE:"errorupdate",_count:0,addEventListener:function(_fe,_ff,_100,_101){
this._count++;
this._eventListener(true,_fe,_ff,_100,_101);
if(_fe&&typeof _fe.nodeType!=Types.UNDEFINED){
if(_fe.nodeType==Node.ELEMENT_NODE){
var win=DOMUtil.getParentWindow(_fe);
if(win){
var _103={handleEvent:function(){
DOMEvents.removeEventListener(_fe,_ff,_100,_101);
DOMEvents.removeEventListener(win,DOMEvents.UNLOAD,_103);
}};
DOMEvents.addEventListener(win,DOMEvents.UNLOAD,_103);
}
}
}
},removeEventListener:function(_104,_105,_106,_107){
this._count--;
this._eventListener(false,_104,_105,_106,_107);
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
},cleanupEventListeners:function(_10c){
this._deleteWrappedHandler(_10c);
},isCurrentTarget:function(e){
var _10e=false;
if(Client.isMozilla==true){
_10e=e.target==e.currentTarget;
}
return true;
},_isChildOf:function(_10f,_110){
var _111=true;
if(_10f==_110){
_111=false;
}
if(_111==true){
while(_110!=null&&_110.nodeType!=Node.DOCUMENT_NODE&&_110!=_10f){
_110=_110.parentNode;
}
_111=(_110==_10f);
}
return _111;
},_eventListener:function(_112,_113,_114,_115,_116,_117){
if(Interfaces.isImplemented(IEventListener,_115,true)){
if(typeof _114!=Types.UNDEFINED){
if(Client.isExplorer==true){
_115=this._getWrappedHandler(_113,_114,_115,_117);
_113[this._getAction(_112)]("on"+_114,_115);
}else{
switch(_114){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSELEAVE:
_114=_114==DOMEvents.MOUSEENTER?DOMEvents.MOUSEOVER:DOMEvents.MOUSEOUT;
_113[this._getAction(_112)](_114,{handleEvent:function(e){
var rel=e.relatedTarget;
if(e.currentTarget==rel||DOMEvents._isChildOf(e.currentTarget,rel)){
}else{
_115.handleEvent(e);
}
}},_116?true:false);
break;
default:
_113[this._getAction(_112)](_114,_115,_116?true:false);
break;
}
}
}else{
throw "No such event allowed!";
}
}
},_getAction:function(_11a){
var _11b=null;
switch(_11a){
case true:
_11b=Client.isMozilla==true?"addEventListener":"attachEvent";
break;
case false:
_11b=Client.isMozilla==true?"removeEventListener":"detachEvent";
break;
}
return _11b;
},_getWrappedHandler:function(_11c,_11d,_11e,_11f){
var _120=null;
try{
if(!_11e._domEventHandlers){
_11e._domEventHandlers={};
}
if(!_11e._domEventHandlers[_11c]){
_11e._domEventHandlers[_11c]={};
}
if(!_11e._domEventHandlers[_11c][_11d]){
var win=_11c.nodeType?DOMUtil.getParentWindow(_11c):_11c;
if(win){
_11e._domEventHandlers[_11c][_11d]=function(){
if(win.event&&_11e){
_11e.handleEvent(win.event);
}
};
}
}
_120=_11e._domEventHandlers[_11c][_11d];
}
catch(exception){
this._report(_11c,_11d,_11e,_11f);
}
return _120;
},_deleteWrappedHandler:function(_122){
for(var _123 in _122._domEventHandlers){
if(_123){
for(var _124 in _122._domEventHandlers[_123]){
if(_124){
delete _122._domEventHandlers[_123][_124];
}
}
}
delete _122._domEventHandlers[_123];
}
},_report:function(_125,_126,_127,_128){
alert("DOMEvents.getWrappedHandler malfunction.\n\n"+"\ttarget: "+(_125?_125.nodeName:_125)+"\n"+"\tevent: "+_126+"\n"+"\thandler: "+_127+"\n\n"+"Offending invoker: "+(_128.callee?_128.callee.toString():_128.constructor));
}};
var DOMEvents=new _DOMEvents();
function _DOMSerializer(){
}
_DOMSerializer.prototype={_serializer:(Client.isMozilla?new XMLSerializer():null),serialize:function(node,_12a){
var _12b=null;
var _12c=node;
if(node.nodeType==Node.DOCUMENT_NODE){
_12c=node.documentElement;
}
if(Client.isMozilla==true){
if(_12a==true){
_12c=_12c.cloneNode(true);
_12c=DOMFormatter.format(_12c,DOMFormatter.INDENTED_TYPE_RESULT);
}
_12b=this._serializer.serializeToString(_12c);
}else{
_12b=_12c.xml;
}
return _12b;
}};
var DOMSerializer=new _DOMSerializer();
window.DOMFormatter=new function(){
var TAB="\t";
var NEW="\n";
var _12f=new RegExp(/[^\t\n\r ]/);
this.ignoreCDATASections=false;
function indent(_130){
var doc=_130.ownerDocument;
var _132=function(node,_134){
if(node.hasChildNodes()&&node.firstChild.nodeType!=Node.TEXT_NODE){
var _135="",i=0;
while(i++<_134){
_135+=TAB;
}
var _137=node.firstChild;
while(_137){
switch(_137.nodeType){
case Node.ELEMENT_NODE:
if(_137==node.lastChild){
node.appendChild(doc.createTextNode(NEW+_135));
}
node.insertBefore(doc.createTextNode(NEW+_135+TAB),_137);
_132(_137,_134+1);
break;
case Node.COMMENT_NODE:
case Node.PROCESSING_INSTRUCTION_NODE:
case Node.CDATA_SECTION_NODE:
node.insertBefore(doc.createTextNode(NEW+_135+TAB),_137);
break;
}
if(_137.nodeType==Node.CDATA_SECTION_NODE){
if(!this.ignoreCDATASections){
formatCDATASection(_137,_135+TAB);
}
}
_137=_137.nextSibling;
}
}
};
_132(_130,0);
}
function strip(_138){
var _139=[];
var _13a={acceptNode:function(_13b){
return (!_12f.test(_13b.nodeValue))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
}};
var _13c=_138.ownerDocument.createTreeWalker(_138,NodeFilter.SHOW_TEXT,_13a,true);
while(_13c.nextNode()){
_139.push(_13c.currentNode);
}
var i=0,_13e;
while((_13e=_139[i++])!=null){
_13e.parentNode.removeChild(_13e);
}
}
function formatCDATASection(node,_140){
if(node.textContent.indexOf(NEW)>-1){
var _141=node.textContent.split(NEW);
var _142="",line,_144=0,_145=true;
while((line=_141.shift())!=null){
if(_144==0&&line.charAt(0)==TAB){
while(line.charAt(_144++)==TAB){
}
}
line=line.substring(_144,line.length);
if(_141.length>0){
_142+=_140+TAB+line;
_142+=_145?"":"\n";
}else{
_142+=_140+line;
_140=_140.slice(1,_140.length);
node.parentNode.appendChild(doc.createTextNode(NEW+_140));
}
_145=false;
}
node.textContent=_142;
}
}
this.format=function(_146,_147){
var _148=1;
if(document.createTreeWalker){
try{
strip(_146);
if(_147!=_148){
indent(_146);
}
}
catch(exception){
throw new Error(exception);
}
}
return (_146);
};
};
DOMFormatter.INDENTED_TYPE_RESULT=0;
DOMFormatter.STRIPPED_TYPE_RESULT=1;
function _DOMUtil(){
}
_DOMUtil.prototype={_logger:SystemLogger.getLogger("DOMUtil"),MSXML_MAXVERSION:6,MSXML_MINVERSION:1,MSXML_HTTPREQUEST:"MSXML2.XMLHTTP.{$version}.0",MSXML_DOMDOCUMENT:"MSXML2.DOMDocument.{$version}.0",MSXML_FREETHREADED:"MSXML2.FreeThreadedDOMDocument.{$version}.0",MSXML_XSLTEMPLATE:"MSXML2.XSLTemplate.{$version}.0",getMSComponent:function(_149){
var sig,_14b=null,_14c=this.MSXML_MAXVERSION;
while(!_14b&&_14c>=this.MSXML_MINVERSION){
try{
sig=_149.replace("{$version}",_14c);
_14b=new ActiveXObject(sig);
}
catch(exception){
}
_14c--;
}
return _14b;
},getXMLHTTPRequest:function(){
var _14d=null;
if(Client.isExplorer){
_14d=this.getMSComponent(this.MSXML_HTTPREQUEST);
}else{
_14d=new XMLHttpRequest();
}
return _14d;
},getDOMDocument:function(_14e){
var _14f=null;
if(Client.isExplorer){
_14f=this.getMSComponent(_14e?this.MSXML_FREETHREADED:this.MSXML_DOMDOCUMENT);
}else{
var doc=XMLParser.parse("<?xml version=\"1.0\" encoding=\"UTF-8\"?><ROOT/>");
doc.removeChild(doc.documentElement);
_14f=doc;
}
return _14f;
},getMSXMLXSLTemplate:function(){
var _151=null;
if(Client.isExplorer){
_151=this.getMSComponent(this.MSXML_XSLTEMPLATE);
}
return _151;
},getLocalName:function(_152){
var _153=null;
if(_152.localName){
_153=_152.localName;
}else{
if(_152.baseName){
_153=_152.baseName;
}else{
_153=_152.nodeName.toLowerCase();
}
}
return _153;
},getComputedStyle:function(_154,_155){
var _156=null;
if(Client.isExplorer){
if(_154.currentStyle!=null){
_156=_154.currentStyle[_155];
}else{
this._logger.error("Could not compute style for element "+_154.nodeName);
SystemDebug.stack(arguments);
}
}else{
_156=_154.ownerDocument.defaultView.getComputedStyle(_154,null).getPropertyValue(_155);
}
return _156;
},getMaxIndex:function(doc){
var max=0,_159=new List(doc.getElementsByTagName("*"));
_159.each(function(_15a){
var _15b=CSSComputer.getZIndex(_15a);
if(_15b>max){
max=_15b;
}
});
return max;
},getOrdinalPosition:function(_15c,_15d){
var _15e=null;
var _15f=-1;
var _160=this.getLocalName(_15c);
var _161=new List(_15c.parentNode.childNodes);
while(_161.hasNext()){
var _162=_161.getNext();
if(_162.nodeType==Node.ELEMENT_NODE){
if(!_15d||this.getLocalName(_162)==_160){
_15f++;
if(_162==_15c||(_162.id!=""&&_162.id==_15c.id)){
_15e=_15f;
break;
}
}
}
}
return _15e;
},isFirstElement:function(_163,_164){
return (this.getOrdinalPosition(_163,_164)==0);
},isLastElement:function(_165,_166){
var _167=_165.parentNode.getElementsByTagName(_166?this.getLocalName(_165):"*");
return (this.getOrdinalPosition(_165)==_167.length);
},getParentWindow:function(node){
var doc=node.nodeType==Node.DOCUMENT_NODE?node:node.ownerDocument;
return doc.defaultView?doc.defaultView:doc.parentWindow;
},getTextContent:function(node){
var _16b=null;
if(node.textContent){
_16b=node.textContent;
}else{
if(node.text){
_16b=node.text;
}else{
_16b=node.innerText;
}
}
return _16b;
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
},getAncestorByLocalName:function(_16e,node,_170){
var _171=null;
while(_171==null){
node=node.parentNode;
if(node.nodeType==Node.DOCUMENT_NODE){
if(_170==true){
var win=this.getParentWindow(node);
node=win.frameElement;
}else{
break;
}
}
if(this.getLocalName(node)==_16e){
_171=node;
}
}
return _171;
},contains:function(_173,node){
return _173.contains?_173!=node&&_173.contains(node):!!(_173.compareDocumentPosition(node)&16);
},createElementNS:function(_175,_176,_177){
var _178=null;
if(_177==null){
alert("DOMUtil#createElementNS : Missing argument (DOMDocument)");
}else{
if(Client.isMozilla){
_178=_177.createElementNS(_175,_176);
}else{
if(_177.xml!=null){
_178=_177.createNode(Node.ELEMENT_NODE,_176,_175);
}else{
_178=_177.createElement(_176);
}
}
}
return _178;
},getElementsByTagName:function(node,_17a){
var _17b=null;
if(Client.isMozilla){
_17b=node.getElementsByTagNameNS(Constants.NS_XHTML,_17a);
}else{
_17b=node.getElementsByTagName(_17a);
}
return _17b;
},getNextElementSibling:function(_17c){
return Client.isExplorer?_17c.nextSibling:_17c.nextElementSibling;
},getPreviousElementSibling:function(_17d){
return Client.isExplorer?_17d.previousSibling:_17d.previousElementSibling;
},cloneNode:function(node){
var _17f=null;
if(Client.isMozilla==true){
_17f=XMLParser.parse(DOMSerializer.serialize(node));
}else{
_17f=node.cloneNode(true);
}
return _17f;
},getLocalPosition:function(_180){
var _181=new Point(_180.offsetLeft,_180.offsetTop);
if(Client.isExplorer&&_180.parentNode&&_180.parentNode.currentStyle){
if(_180.parentNode.currentStyle.position=="static"){
var _182=this.getLocalPosition(_180.parentNode);
_181.x+=_182.x;
_181.y+=_182.y;
}
}
return _181;
},getGlobalPosition:function(_183){
return this._getPosition(_183,false);
},getUniversalPosition:function(_184){
return this._getPosition(_184,true);
},_getPosition:function(_185,_186){
var _187=null;
if(typeof _185.getBoundingClientRect!=Types.UNDEFINED){
var rect=_185.getBoundingClientRect();
_187={x:rect.left,y:rect.top};
if(Client.isMozilla){
_187.x-=_185.scrollLeft;
_187.y-=_185.scrollTop;
}
}else{
_187={x:_185.offsetLeft-_185.scrollLeft,y:_185.offsetTop-_185.scrollTop};
while(_185.offsetParent){
_185=_185.offsetParent;
_187.x+=(_185.offsetLeft-_185.scrollLeft);
_187.y+=(_185.offsetTop-_185.scrollTop);
}
}
if(_186){
var win=DOMUtil.getParentWindow(_185);
if(win){
var _18a=win.frameElement;
if(_18a){
var add=DOMUtil.getUniversalPosition(_18a);
_187.x+=add.x;
_187.y+=add.y;
}
}
}
return new Point(_187.x,_187.y);
},getGlobalMousePosition:function(e){
return this._getMousePosition(e,false);
},getUniversalMousePosition:function(e){
return this._getMousePosition(e,true);
},_getMousePosition:function(e,_18f){
var _190=DOMEvents.getTarget(e);
var _191={x:e.pageX?e.pageX:e.clientX,y:e.pageY?e.pageY:e.clientY};
if(Client.isMozilla){
var doc=_190.ownerDocument;
var win=this.getParentWindow(doc);
_191.x-=win.pageXOffset;
_191.y-=win.pageYOffset;
}
if(_18f){
var _194=this.getParentWindow(_190).frameElement;
if(_194){
var add=this.getUniversalPosition(_194);
_191.x+=add.x;
_191.y+=add.y;
}
}
return _191;
}};
var DOMUtil=new _DOMUtil();
function _XMLParser(){
}
_XMLParser.prototype={_logger:SystemLogger.getLogger("XMLParser"),_domParser:(window.DOMParser!=null?new DOMParser():null),parse:function(xml,_197){
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
if(!_197){
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
if(!_197){
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
},isWellFormedDocument:function(xml,_19a){
var _19b=true;
var dec="<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
if(xml.indexOf("<?xml ")==-1){
xml=dec+xml;
}
var _19d=SourceValidationService.IsWellFormedDocument(xml);
if(_19d!="True"){
_19b=false;
if(_19a==true){
this._illFormedDialog(_19d);
}
}
return _19b;
},isWellFormedFragment:function(xml,_19f){
var _1a0=true;
var _1a1=SourceValidationService.IsWellFormedFragment(xml);
if(_1a1!="True"){
_1a0=false;
if(_19f==true){
this._illFormedDialog(_1a1);
}
}
return _1a0;
},_illFormedDialog:function(_1a2){
setTimeout(function(){
Dialog.error("Not well-formed",_1a2);
},0);
}};
var XMLParser=new _XMLParser();
function XPathResolver(){
this.logger=SystemLogger.getLogger("XPathResolver");
this._evaluator=window.XPathEvaluator?new XPathEvaluator():null;
this._nsResolver=null;
}
XPathResolver.prototype.setNamespacePrefixResolver=function(_1a3){
if(this._evaluator){
this._nsResolver={lookupNamespaceURI:function(_1a4){
return _1a3[_1a4];
}};
}else{
this._nsResolver=_1a3;
}
};
XPathResolver.prototype.resolve=function(_1a5,node,_1a7){
var _1a8=null;
try{
if(this._evaluator){
_1a8=this._evaluateDOMXpath(_1a5,node,_1a7?true:false);
}else{
_1a8=this._evaluateMSXpath(_1a5,node,_1a7?true:false);
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
return _1a8;
};
XPathResolver.prototype.resolveAll=function(_1a9,node){
return this.resolve(_1a9,node,true);
};
XPathResolver.prototype._evaluateDOMXpath=function(_1ab,node,_1ad){
var _1ae=null;
if(node){
var _1ae=this._evaluator.evaluate(_1ab,node,this._nsResolver,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
if(_1ad){
var list=new List();
while((node=_1ae.iterateNext())!=null){
list.add(node);
}
_1ae=list;
}else{
_1ae=_1ae.iterateNext();
}
}else{
var cry="XPathResolver#_evaluateDOMXpath: No DOMNode to evaluate!";
if(Application.isDeveloperMode){
alert(cry);
}else{
this.logger.fatal(cry);
}
}
return _1ae;
};
XPathResolver.prototype._evaluateMSXpath=function(_1b1,node,_1b3){
var doc=(node.nodeType==Node.DOCUMENT_NODE?node:node.ownerDocument);
var _1b5="";
for(var _1b6 in this._nsResolver){
_1b5+="xmlns:"+_1b6+"=\""+this._nsResolver[_1b6]+"\" ";
}
doc.setProperty("SelectionNamespaces",_1b5);
if(_1b3){
var list=new List();
var i=0,_1b9=node.selectNodes(_1b1);
while(i<_1b9.length){
list.add(_1b9.item(i++));
}
result=list;
}else{
result=node.selectSingleNode(_1b1);
}
return result;
};
function XSLTransformer(){
this.logger=SystemLogger.getLogger("XSLTransformer");
this._processor=null;
this._cache=null;
}
XSLTransformer.prototype.importStylesheet=function(url){
var _1bb=this._import(Resolver.resolve(url));
if(Client.isMozilla){
this._processor=new XSLTProcessor();
this._processor.importStylesheet(_1bb);
}else{
this._cache=DOMUtil.getMSXMLXSLTemplate();
this._cache.stylesheet=_1bb;
}
};
XSLTransformer.prototype._import=function(url){
var _1bd=null;
if(Client.isMozilla){
var _1be=DOMUtil.getXMLHTTPRequest();
_1be.open("get",Resolver.resolve(url),false);
_1be.send(null);
_1bd=_1be.responseXML;
}else{
var _1bd=DOMUtil.getDOMDocument(true);
_1bd.async=false;
_1bd.load(url);
}
return _1bd;
};
XSLTransformer.prototype.transformToDocument=function(dom){
var _1c0=null;
if(Client.isMozilla){
_1c0=this._processor.transformToDocument(dom);
}else{
alert("TODO!");
}
return _1c0;
};
XSLTransformer.prototype.transformToString=function(dom,_1c2){
var _1c3=null;
if(Client.isMozilla){
var doc=this.transformToDocument(dom);
_1c3=DOMSerializer.serialize(doc,_1c2);
}else{
var proc=this._cache.createProcessor();
proc.input=dom;
proc.transform();
_1c3=proc.output;
}
return _1c3;
};
function _CSSUtil(){
}
_CSSUtil.prototype={_getCurrent:function(_1c6){
var _1c7=_1c6.style?_1c6.className:_1c6.getAttribute("class");
_1c7=_1c7?_1c7:"";
return _1c7;
},_contains:function(_1c8,sub){
return _1c8.indexOf(sub)>-1;
},_attach:function(_1ca,sub){
return _1ca+(_1ca==""?"":" ")+sub;
},_detach:function(_1cc,sub){
if(this._contains(_1cc," "+sub)){
sub=" "+sub;
}
return _1cc.replace(sub,"");
},attachClassName:function(_1ce,_1cf){
if(_1ce.classList!=null){
if(!_1ce.classList.contains(_1cf)){
_1ce.classList.add(_1cf);
}
}else{
var _1d0=this._getCurrent(_1ce);
if(!this._contains(_1d0,_1cf)){
_1d0=this._attach(_1d0,_1cf);
}
if(_1ce.style!=null){
_1ce.className=_1d0;
}else{
_1ce.setAttribute("class",_1d0);
}
}
},detachClassName:function(_1d1,_1d2){
if(_1d1.classList!=null){
if(_1d1.classList.contains(_1d2)){
_1d1.classList.remove(_1d2);
}
}else{
var _1d3=this._getCurrent(_1d1);
if(this._contains(_1d3,_1d2)){
_1d3=this._detach(_1d3,_1d2);
}
if(_1d1.style!=null){
_1d1.className=_1d3;
}else{
if(_1d3==""){
_1d1.removeAttribute("class");
}else{
_1d1.setAttribute("class",_1d3);
}
}
}
},hasClassName:function(_1d4,_1d5){
var _1d6=false;
if(_1d4.classList!=null){
_1d6=_1d4.classList.contains(_1d5);
}else{
_1d6=this._contains(this._getCurrent(_1d4),_1d5);
}
return _1d6;
}};
var CSSUtil=new _CSSUtil();
function _CSSComputer(){
}
_CSSComputer.prototype={_margins:{top:Client.isExplorer?"marginTop":"margin-top",right:Client.isExplorer?"marginRight":"margin-right",bottom:Client.isExplorer?"marginBottom":"margin-bottom",left:Client.isExplorer?"marginLeft":"margin-left"},_paddings:{top:Client.isExplorer?"paddingTop":"padding-top",right:Client.isExplorer?"paddingRight":"padding-right",bottom:Client.isExplorer?"paddingBottom":"padding-bottom",left:Client.isExplorer?"paddingLeft":"padding-left"},_borders:{top:Client.isExplorer?"borderTopWidth":"border-top-width",right:Client.isExplorer?"borderRightWidth":"border-right-width",bottom:Client.isExplorer?"borderBottomWidth":"border-bottom-width",left:Client.isExplorer?"borderLeftWidth":"border-left-width"},_getComplexResult:function(_1d7,_1d8){
var _1d9={};
for(var _1da in _1d7){
var ent=parseInt(DOMUtil.getComputedStyle(_1d8,_1d7[_1da]));
_1d9[_1da]=isNaN(ent)?0:ent;
}
return _1d9;
},_getMargin:function(_1dc){
return this._getComplexResult(this._margins,_1dc);
},getPadding:function(_1dd){
return this._getComplexResult(this._paddings,_1dd);
},getBorder:function(_1de){
return this._getComplexResult(this._borders,_1de);
},getPosition:function(_1df){
return DOMUtil.getComputedStyle(_1df,"position");
},getFloat:function(_1e0){
return DOMUtil.getComputedStyle(_1e0,Client.isExplorer?"styleFloat":"float");
},getZIndex:function(_1e1){
return parseInt(DOMUtil.getComputedStyle(_1e1,Client.isExplorer?"zIndex":"z-index"));
},getBackgroundColor:function(_1e2){
return DOMUtil.getComputedStyle(_1e2,Client.isExplorer?"backgroundColor":"background-color");
}};
var CSSComputer=new _CSSComputer();
var System=new function(){
var _1e3=SystemLogger.getLogger("System");
var root=null;
this.hasActivePerspectives=false;
this.getRootNode=function(){
if(root==null){
root=new SystemNode(TreeService.GetRootElements("")[0]);
}
return root;
};
this.getPerspectiveNodes=function(){
var _1e5=new List();
var _1e6=TreeService.GetActivePerspectiveElements("dummy");
var list=new List(_1e6);
if(list.hasEntries()){
this.hasActivePerspectives=true;
list.each(function(_1e8){
_1e5.add(new SystemNode(_1e8));
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVES_NONE);
}
return _1e5;
};
this.getChildNodes=function(node,_1ea){
var _1eb=new List();
var _1ec=null;
if(_1ea){
if(SearchTokens.hasToken(_1ea)){
_1ea=SearchTokens.getToken(_1ea);
}
_1ec=TreeService.GetElementsBySearchToken(node.getData(),_1ea);
}else{
_1ec=TreeService.GetElements(node.getData());
}
new List(_1ec).each(function(_1ed){
var _1ee=new SystemNode(_1ed);
if(_1ea){
_1ee.searchToken=_1ea;
}
_1eb.add(_1ee);
});
return _1eb;
};
this.getDescendantBranch=function(_1ef){
var map=new Map();
var arg=[];
_1ef.each(function(node){
arg.push({ProviderName:node.getProviderName(),EntityToken:node.getEntityToken(),Piggybag:node.getPiggyBag()});
});
var _1f3=TreeService.GetMultipleChildren(arg);
var _1f4=new List(_1f3);
while(_1f4.hasNext()){
this._listNodesInMap(_1f4.getNext(),map);
}
return map;
};
this.getInvisibleBranch=function(_1f5,_1f6,_1f7){
var map=new Map();
var arg=[];
_1f7.each(function(node){
arg.push({ProviderName:node.getProviderName(),EntityToken:node.getEntityToken(),Piggybag:node.getPiggyBag()});
});
var _1fb=TreeService.FindEntityToken(_1f5,_1f6,arg);
if(_1fb instanceof SOAPFault){
_1e3.error(_1fb.getFaultString());
if(Application.isDeveloperMode){
alert(_1fb.getFaultString());
}
map=null;
}else{
var _1fc=new List(_1fb);
while(_1fc.hasNext()){
this._listNodesInMap(_1fc.getNext(),map);
}
}
return map;
};
this._listNodesInMap=function(_1fd,map){
var list=new List();
var key=_1fd.ElementKey;
var _201=new List(_1fd.ClientElements);
map.set(key,list);
while(_201.hasNext()){
var _202=_201.getNext();
list.add(new SystemNode(_202));
}
};
this.getChildNodesBySearchToken=function(node,_204){
return this.getChildNodes(node,_204);
};
this.getNamedRoots=function(key,_206){
var _207=new List();
var _208=null;
if(_206){
if(SearchTokens.hasToken(_206)){
_206=SearchTokens.getToken(_206);
}
_208=TreeService.GetNamedRootsBySearchToken(key,_206);
}else{
_208=TreeService.GetNamedRoots(key);
}
new List(_208).each(function(_209){
var node=new SystemNode(_209);
if(_206){
node.searchToken=_206;
}
_207.add(node);
});
return _207;
};
this.getNamedRootsBySearchToken=function(key,_20c){
return this.getNamedRoots(key,_20c);
};
function compileActionList(node,_20e,_20f){
var _210=_20e.ClientElementActionGroupId;
if(_210!=null){
var _211=_20f.get(_210).ClientElementActionGroupItems;
if(_211&&_211.length>0){
node.setActionList(new List(_211));
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
new List(self._data.Actions).each(function(_217){
var _218=_217.ActionCategory.Name;
if(SystemAction.hasCategory(_218)){
var _219=new SystemAction(_217);
SystemAction.actionMap.set(_217.ActionKey,_219);
}else{
throw "No such action category: "+_218;
}
});
}
});
};
SystemNode.prototype.getData=function(){
return this._data;
};
SystemNode.prototype.getChildren=function(){
var _21a=null;
if(this.searchToken){
_21a=System.getChildNodesBySearchToken(this,this.searchToken);
}else{
_21a=System.getChildNodes(this);
}
return _21a;
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
var _21c=this._data.Piggybag;
if(_21c==null){
_21c="";
}
return _21c;
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
var _21e=null;
if(typeof this._data.ToolTip!="undefined"){
_21e=this._data.ToolTip;
}
return _21e;
};
SystemNode.prototype.getPropertyBag=function(){
if(!this._propertyBag&&this._data.PropertyBag&&this._data.PropertyBag.length!=0){
var map={};
new List(this._data.PropertyBag).each(function(_220){
map[_220.Key]=_220.Value;
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
var _224=SystemAction.actionMap.get(key);
var _225=true;
if(_224.getCategory()==SystemAction.categories.DeveloperMode){
if(!Application.isDeveloperMode){
_225=false;
}
}
if(_225){
var id=_224.getGroupID();
if(!map.has(id)){
map.set(id,new List());
}
var list=map.get(id);
list.add(_224);
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
SystemAction.invoke=function(_228,arg){
var node=arg;
if(node instanceof SystemNode){
Application.lock(SystemAction);
_228.logger.debug("Execute \""+_228.getLabel()+"\" on \""+node.getLabel()+"\".");
setTimeout(function(){
TreeService.ExecuteSingleElementAction(node.getData(),_228.getHandle(),Application.CONSOLE_ID);
MessageQueue.update();
Application.unlock(SystemAction);
},0);
}else{
throw "Multiple actiontargets not supported.";
}
};
SystemAction.invokeTagged=function(_22b,_22c){
action=SystemAction.taggedActions.get(_22b);
node=SystemNode.taggedNodes.get(_22c);
SystemAction.invoke(action,node);
};
SystemAction.hasCategory=function(_22d){
return SystemAction.categories[_22d]?true:false;
};
function SystemAction(_22e){
this.logger=SystemLogger.getLogger("SystemAction");
this._data=_22e;
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
var _22f=null;
if(this.isInFolder()){
_22f=this._data.ActionCategory.FolderName;
}
return _22f;
};
SystemAction.prototype.isDisabled=function(){
return this._data.Disabled;
};
SystemAction.prototype.isCheckBox=function(){
return typeof this._data.CheckboxStatus!=Types.UNDEFINED;
};
SystemAction.prototype.getTag=function(){
var _230=null;
if(typeof this._data.TagValue!="undefined"){
_230=this._data.TagValue;
}
return _230;
};
SystemAction.prototype.isChecked=function(){
var _231=null;
if(this.isCheckBox()){
_231=this._data.CheckboxStatus=="Checked";
}else{
throw "Not a checkbox!";
}
return _231;
};
function _UpdateManager(){
var _232=null;
if(!window.UpdateManager){
this._construct();
_232=this;
}
return _232;
}
_UpdateManager.prototype={version:"0.1",CLASSNAME_FORM:"updateform",CLASSNAME_ZONE:"updatezone",CLASSNAME_GONE:"updategone",EVENT_BEFOREUPDATE:"beforeupdate",EVENT_AFTERUPDATE:"afterupdate",EVENT_ERRORUPDATE:"errorupdate",xhtml:null,summary:null,isEnabled:true,isDebugging:false,isUpdating:false,hasSoftAttributes:false,hasSoftSiblings:false,pendingResponse:null,currentDOM:null,errormessage:null,_assistant:null,_updates:null,_replaced:null,_dotnetnames:["__VIEWSTATE","__EVENTVALIDATION","__EVENTTARGET","__EVENTARGUMENT","__LASTFOCUS"],plugins:[],toString:function(){
return "[object UpdateManager]";
},_construct:function(_233){
var root=document.documentElement;
var _235=root.namespaceURI;
if(_235==null){
_235=new String(root.getAttribute("xmlns"));
}
if(_235=="http://www.w3.org/1999/xhtml"){
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
var _236=decodeURIComponent(this.xhtml);
this.currentDOM=UpdateAssistant.parse(_236);
}else{
throw new TypeError();
}
}else{
var _237=this;
UpdateAssistant.getXMLHttpRequest("get",window.location.toString(),{handleResponse:function(dom){
_237.currentDOM=dom;
}}).send(null);
}
}
}
},setupForms:function(){
var _239=false;
Array.forEach(document.forms,function(form){
if(form.className.indexOf(this.CLASSNAME_FORM)>-1){
if(!form.__isSetup){
this._setupForm(form);
form.__isSetup=true;
}
_239=true;
}
},this);
return _239;
},_setupForm:function(form){
var _23c=this;
this._addListener(form,"submit");
form.__submit=form.submit;
form.submit=function(){
if(_23c.isEnabled){
_23c._submit(form);
}else{
form.__submit();
}
return false;
};
},_addListener:function(_23d,type){
if(_23d.addEventListener!=null){
_23d.addEventListener(type,this,false);
}else{
var _23f=this;
_23d.attachEvent("on"+type,function(){
_23f.handleEvent(window.event);
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
var _244=UpdateAssistant.getUpdateZones(dom);
var _245=UpdateAssistant.getUpdateZones(this.currentDOM);
this._updates=[];
this._replaced={};
_244.forEach(function(_246,_247){
var _248=_245[_247];
this._crawl(_246,_248);
},this);
this._updates.forEach(function(_249,_24a){
_249.update();
_249.dispose();
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
},_crawl:function(_24c,_24d,_24e,id){
var _250=true;
var _251=_24d.getAttribute("class");
if(_251==null||_251.indexOf(this.CLASSNAME_GONE)==-1){
if(_24d.nodeType==Node.ELEMENT_NODE){
var _252=_24d.getAttribute("id");
if(_252!=null){
_24e=_24c;
id=_252;
}
}
if(_250=this._check(_24c,_24d,_24e,id)){
var _253=_24c.firstChild;
var _254=_24d.firstChild;
while(_253!=null&&_254!=null&&!this._replaced[id]){
switch(_253.nodeType){
case Node.TEXT_NODE:
_250=this._check(_253,_254,_24e,id);
break;
case Node.DOCUMENT_NODE:
case Node.ELEMENT_NODE:
_250=this._crawl(_253,_254,_24e,id);
break;
}
if(this._replaced[id]){
_250=false;
}else{
_253=_253.nextSibling;
_254=_254.nextSibling;
}
}
}
}
return _250;
},_check:function(_255,_256,_257,id){
var _259=true;
var _25a=null;
var _25b=false;
var _25c=false;
if((_255!=null&&_256==null)||(_255==null&&_256!=null)){
_259=false;
}else{
if(_259=_255.nodeType==_256.nodeType){
switch(_256.nodeType){
case Node.ELEMENT_NODE:
if(_255.namespaceURI!=_256.namespaceURI||_255.nodeName!=_256.nodeName){
_259=false;
}else{
if(_259=(_255.nodeName==_256.nodeName)){
var _25d=_256.getAttribute("id");
var _25e=_255.getAttribute("id");
if(_25d!=null&&_25e!=null){
if(_25d!=_25e){
_259=false;
}else{
if((_25a=this._getPlugin(_255,_256))!=null){
if(_25a.updateElement(_255,_256)){
_25c=true;
_259=false;
}
}
}
}
if(_259){
if(_259=this._checkAttributes(_255,_256)){
if(this.hasSoftSiblings&&this._hasSoftChildren(_255)&&this._hasSoftChildren(_256)){
if(this._validateSoftChildren(_255,_256)){
this._updateSoftChildren(_255,_256);
_25b=true;
}
_259=false;
}else{
_259=_255.childNodes.length==_256.childNodes.length;
}
}
}
}
}
break;
case Node.TEXT_NODE:
if(_255.data.trim()!=_256.data.trim()){
_259=false;
}
break;
}
}
}
if(_259==false&&!_25b&&!_25c){
if(id!=null&&_257!=null){
this.addUpdate(new ReplaceUpdate(id,_257));
}
}
return _259;
},_checkAttributes:function(_25f,_260){
var _261=true;
var _262=false;
var _263=_25f.attributes;
var _264=_260.attributes;
if(_263.length!=_264.length){
_262=true;
}else{
_262=!Array.every(_263,function(att1,i){
var att2=_264.item(i);
return att1.nodeName==att2.nodeName&&att1.nodeValue==att2.nodeValue;
});
}
if(_262){
var _268=_25f.getAttribute("id");
var _269=_260.getAttribute("id");
if(this.hasSoftAttributes&&_268!=null&&_268==_269){
this.addUpdate(new AttributesUpdate(_269,_25f,_260));
}else{
_261=false;
}
}
return _261;
},_hasSoftChildren:function(_26a){
var _26b=true;
if(_26a.hasChildNodes()){
_26b=Array.every(_26a.childNodes,function(node){
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
return _26b;
},_validateSoftChildren:function(_26e,_26f){
var _270=true;
var _271=-1;
var _272=-1;
var _273=-1;
var news=this._toMap(_26e.childNodes,true);
var olds=this._toMap(_26f.childNodes,true);
for(var id in olds){
if(_270){
var _277=olds[id];
_270=_277>=_271;
if(news[id]!=null){
_273=news[id];
_270=_273>=_272;
}
}
_271=_277;
if(_273>-1){
_272=_273;
}
}
return _270;
},_updateSoftChildren:function(_278,_279){
var news=this._toMap(_278.childNodes);
var olds=this._toMap(_279.childNodes);
for(var id in olds){
if(news[id]==null){
this.addUpdate(new SiblingUpdate(Update.TYPE_REMOVE,id,null,null));
}else{
this._crawl(news[id],olds[id]);
}
}
var _27d=null;
for(id in news){
if(olds[id]==null){
var _27e=news[id];
if(_27d==null){
var _27f=_279.getAttribute("id");
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_27f,_27e,true));
}else{
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_27d,_27e,false));
}
}
_27d=id;
}
},addUpdate:function(_280){
this._updates.push(_280);
if(_280 instanceof ReplaceUpdate){
this._replaced[_280.id]=true;
}
},_getPlugin:function(_281,_282){
var _283=null;
this.plugins.every(function(_284){
if(_284.handleElement(_281,_282)){
_283=_284;
}
return _283==null;
});
return _283;
},_toMap:function(_285,_286){
var _287={};
Array.forEach(_285,function(node,_289){
if(node.nodeType==Node.ELEMENT_NODE){
_287[node.getAttribute("id")]=_286?_289:node;
}
});
return _287;
},_getPost:function(form){
var _28b=new String("");
if(form!=null){
var last="";
Array.forEach(form.elements,function(_28d){
var name=_28d.name;
var _28f=encodeURIComponent(_28d.value);
switch(_28d.type){
case "button":
case "submit":
var _290=UpdateAssistant.getActiveElement();
if(_28d==_290&&name!=""){
_28b+=name+"="+_28f+"&";
}
break;
case "radio":
if(_28d.checked){
_28b+=name+"="+_28f+"&";
}
break;
case "checkbox":
if(_28d.checked){
if(_28d.name==last){
if(_28b.lastIndexOf("&")==_28b.length-1){
_28b=_28b.substr(0,_28b.length-1);
}
_28b+=","+_28f;
}else{
_28b+=name+"="+_28d.value;
}
last=name;
_28b+="&";
}
break;
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_28b+=name+"="+_28f+"&";
break;
}
});
}
return _28b.substr(0,_28b.length-1);
},_postRequest:function(form){
var _292=form.method!=""?form.method:"get";
var _293=form.action!=""?form.action:window.location.toString();
var _294=this._getPost(form);
if(_292=="get"){
if(_293.indexOf("?")>-1){
_293=_293+"&"+_294;
}else{
_293+"?"+_294;
}
}
var _295=this;
var _296=UpdateAssistant.getXMLHttpRequest(_292,_293,this);
if(_292=="post"){
_296.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
}
_296.send(_292=="post"?_294:null);
},_fixdotnet:function(dom,id){
var _299=document.getElementById(id);
if(_299!=null){
var _29a=UpdateAssistant.getElementById(dom,id);
if(_29a!=null){
var _29b=_29a.getAttribute("value");
if(_29b!==_299.value){
_299.value=_29b;
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
},report:function(_29e){
this.summary+=_29e+"\n";
}};
var UpdateManager=new _UpdateManager();
function _UpdateAssistant(){
var _29f=null;
if(!window.UpdateAssistant){
this._construct();
_29f=this;
}
return _29f;
}
_UpdateAssistant.prototype={_serializer:window.XMLSerializer!=null?new XMLSerializer():null,_parser:window.DOMParser!=null?new DOMParser():null,_activeElement:null,_construct:function(){
if(!window.Node){
window.Node={ELEMENT_NODE:1,TEXT_NODE:3,DOCUMENT_NODE:9};
}
if(!Array.every){
Array.every=function(_2a0,fun){
var _2a2=true;
var len=_2a0.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2a4=arguments[2];
for(var i=0;i<len;i++){
if(typeof _2a0[i]!="undefined"){
if(!fun.call(_2a4,_2a0[i],i,_2a0)){
_2a2=false;
break;
}
}
}
}
return _2a2;
};
}
if(!Array.prototype.every){
Array.prototype.every=function(fun){
var _2a7=arguments[1];
return Array.every(this,fun,_2a7);
};
}
if(!Array.forEach){
Array.forEach=function(_2a8,fun){
var len=_2a8.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2ab=arguments[2];
for(var i=0;i<len;i++){
if(typeof _2a8[i]!="undefined"){
fun.call(_2ab,_2a8[i],i,_2a8);
}
}
}
};
}
if(!Array.prototype.forEach){
Array.prototype.forEach=function(fun){
var _2ae=arguments[1];
Array.forEach(this,fun,_2ae);
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
},getXMLHttpRequest:function(_2b0,_2b1,_2b2){
var _2b3=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Msxml2.XMLHTTP.3.0");
if(_2b3!=null){
_2b3.open(_2b0,_2b1,(_2b2!=null?true:false));
if(_2b2!=null){
function action(){
if(_2b3.readyState==4){
var text=_2b3.responseText;
UpdateManager.pendingResponse=text;
var dom=UpdateAssistant.parse(text);
if(dom!=null){
_2b2.handleResponse(dom);
}
}
}
if(_2b3.addEventListener!=null){
_2b3.addEventListener("readystatechange",{handleEvent:function(){
action();
}},false);
}else{
_2b3.onreadystatechange=action;
}
}
}
return _2b3;
},dispatchEvent:function(_2b6,name){
var _2b8=true;
if(_2b6.fireEvent!=null){
_2b8=_2b6.fireEvent("on"+name);
}else{
var _2b9=document.createEvent("UIEvents");
_2b9.initEvent(name,true,true);
_2b8=_2b6.dispatchEvent(_2b9);
}
return _2b8;
},getUpdateZones:function(dom){
var _2bb="//*[@id and contains(@class,'updatezone')]";
var _2bc=[];
var _2bd=null;
var _2be=null;
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2bd=dom.evaluate(_2bb,dom,null,type,null);
while((_2be=_2bd.iterateNext())!=null){
_2bc.push(_2be);
}
}else{
_2bd=dom.documentElement.selectNodes(_2bb);
Array.forEach(_2bd,function(_2c0){
_2bc.push(_2c0);
});
}
return _2bc;
},getElementById:function(dom,id){
var _2c3="//*[@id='"+id+"']";
var _2c4=null;
var _2c5=null;
if(window.XPathResult!=null){
var type=XPathResult.FIRST_ORDERED_NODE_TYPE;
_2c4=dom.evaluate(_2c3,dom,null,type,null);
_2c5=_2c4.singleNodeValue;
}else{
_2c5=dom.documentElement.selectNodes(_2c3)[0];
}
return _2c5;
},_getIds:function(dom){
var _2c8="//*[@id]";
var _2c9=null;
var _2ca=[];
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2c9=dom.evaluate(_2c8,dom,null,type,null);
while((element=_2c9.iterateNext())!=null){
_2ca.push(element.getAttribute("id"));
}
}else{
_2c9=dom.documentElement.selectNodes(_2c8);
Array.forEach(_2c9,function(_2cc){
_2ca.push(_2cc.getAttribute("id"));
});
}
return _2ca;
},toHTMLElement:function(_2cd){
var _2ce=this.serialize(_2cd);
var temp=document.createElement("temp");
temp.innerHTML=_2ce;
return temp.firstChild;
},getActiveElement:function(){
var _2d0=document.activeElement;
if(_2d0==null||_2d0==document.body){
_2d0=this._activeElement;
}
return _2d0;
},serialize:function(_2d1){
var _2d2=null;
if(this._serializer!=null){
_2d2=this._serializer.serializeToString(_2d1);
}else{
_2d2=_2d1.xml;
}
return _2d2;
},hasDifferences:function(_2d3,_2d4){
var s1=null;
var s2=null;
if(this._serializer!=null){
s1=this._serializer.serializeToString(_2d3);
s2=this._serializer.serializeToString(_2d4);
}else{
s1=_2d3.xml;
s2=_2d4.xml;
}
return s1!=s2;
},parse:function(_2d7){
var _2d8=null;
if(this._parser!=null){
_2d8=this._parser.parseFromString(_2d7,"text/xml");
}else{
_2d8=new ActiveXObject("Msxml2.DOMDocument.3.0");
_2d8.setProperty("SelectionLanguage","XPath");
_2d8.loadXML(_2d7);
}
return this._validate(_2d8);
},_validate:function(dom){
var out=null;
if(dom.parseError!=null&&dom.parseError.errorCode!=0){
out=dom.parseError.reason;
}else{
var _2db=dom.getElementsByTagName("parsererror").item(0);
if(_2db!=null){
out=_2db.textContent.replace(/\^/g,"").replace(/\-/g,"");
}
}
if(out==null){
var has={},ids=this._getIds(dom);
ids.every(function(id){
var _2df=!has[id];
has[id]=true;
if(!_2df){
out="Element \""+id+"\" encountered twice.";
}
return _2df;
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
this.handleElement=function(_2e0,_2e1){
var _2e2=false;
switch(_2e0.nodeName.toLowerCase()){
case "input":
case "textarea":
switch(_2e0.getAttribute("id")){
case "__EVENTTARGET":
case "__EVENTARGUMENT":
case "__VIEWSTATE":
case "__EVENTVALIDATION":
_2e2=false;
break;
}
break;
}
return _2e2;
};
this.updateElement=function(_2e3,_2e4){
var id=_2e3.getAttribute("id");
var _2e6=document.getElementById(id);
if(_2e6!=null){
var _2e7=null;
switch(_2e6.nodeName.toLowerCase()){
case "input":
_2e7=_2e3.getAttribute("value");
break;
case "textarea":
_2e7=_2e3.textContent?_2e3.textContent:_2e3.text;
break;
}
if(_2e7==null){
_2e7="";
}
if(_2e7!=_2e6.value){
_2e6.value=_2e7;
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
},_beforeUpdate:function(_2e8){
var _2e9=true;
if(_2e8!=null){
_2e8.__updateType=this.type;
_2e9=UpdateAssistant.dispatchEvent(_2e8,Update.EVENT_BEFOREUPDATE);
}
return _2e9;
},_afterUpdate:function(_2ea){
var _2eb=true;
if(_2ea!=null){
_2ea.__updateType=this.type;
_2eb=UpdateAssistant.dispatchEvent(_2ea,Update.EVENT_AFTERUPDATE);
}
return _2eb;
}};
ReplaceUpdate.prototype=new Update();
ReplaceUpdate.superclass=Update.prototype;
function ReplaceUpdate(id,_2ed){
this.type=Update.TYPE_REPLACE;
this.id=id;
this.element=_2ed;
return this;
}
ReplaceUpdate.prototype.update=function(){
var _2ee,_2ef,_2f0=UpdateAssistant.toHTMLElement(this.element);
if((_2ee=document.getElementById(this.id))!=null){
if((_2ef=_2ee.parentNode)!=null){
if(this._beforeUpdate(_2ee)){
_2ef.replaceChild(_2f0,_2ee);
this._afterUpdate(_2f0);
}
}
}else{
UpdateManager.error("Element null point: "+this.id);
}
};
ReplaceUpdate.prototype._afterUpdate=function(_2f1){
var _2f2=ReplaceUpdate.superclass._afterUpdate.call(this,_2f1);
UpdateManager.report("Replaced element id=\""+this.id+"\"");
if(_2f1.nodeName=="form"||_2f1.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
return _2f2;
};
SiblingUpdate.prototype=new Update();
SiblingUpdate.superclass=Update.prototype;
function SiblingUpdate(type,id,_2f5,_2f6){
this.type=type;
this.id=id;
this.element=_2f5;
this.isFirst=_2f6;
return this;
}
SiblingUpdate.prototype.update=function(){
var _2f7=document.getElementById(this.id);
switch(this.type){
case Update.TYPE_REMOVE:
this._remove(_2f7);
break;
case Update.TYPE_INSERT:
this._insert(this.element,_2f7);
break;
}
};
SiblingUpdate.prototype._remove=function(_2f8){
var _2f9=_2f8.parentNode;
if(_2f9!=null){
if(this._beforeUpdate(_2f8)){
_2f9.removeChild(_2f8);
this._afterUpdate(_2f9);
}
}
};
SiblingUpdate.prototype._insert=function(_2fa,_2fb){
var _2fc=UpdateAssistant.toHTMLElement(_2fa);
if(this.isFirst){
var _2fd=_2fb;
if(_2fd!=null){
if(this._beforeUpdate(_2fd)){
_2fd.insertBefore(_2fc,_2fd.firstChild);
this._afterUpdate(_2fc);
}
}
}else{
var _2fd=_2fb.parentNode;
if(_2fd!=null){
if(this._beforeUpdate(_2fd)){
_2fd.insertBefore(_2fc,_2fb.nextSibling);
this._afterUpdate(_2fc);
}
}
}
};
SiblingUpdate.prototype._beforeUpdate=function(_2fe){
var _2ff=SiblingUpdate.superclass._beforeUpdate.call(this,_2fe);
if(this.type==Update.TYPE_REMOVE){
UpdateManager.report("Removed element id=\""+_2fe.id+"\"");
}
return _2ff;
};
SiblingUpdate.prototype._afterUpdate=function(_300){
var _301=true;
if(_300!=null){
_301=SiblingUpdate.superclass._afterUpdate.call(this,_300);
if(this.type==Update.TYPE_INSERT){
UpdateManager.report("Inserted element id=\""+_300.id+"\"");
if(_300.nodeName=="form"||_300.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
}
}
return _301;
};
AttributesUpdate.prototype=new Update();
AttributesUpdate.superclass=Update.prototype;
AttributesUpdate.prototype.currentElement=null;
function AttributesUpdate(id,_303,_304){
this.type=type=Update.TYPE_ATTRIBUTES;
this.id=id;
this.element=_303;
this.currentElement=_304;
this._summary=[];
return this;
}
AttributesUpdate.prototype.update=function(){
var _305=document.getElementById(this.id);
if(this._beforeUpdate(_305)){
this._updateAttributes(_305);
this._afterUpdate(_305);
}
};
AttributesUpdate.prototype._updateAttributes=function(_306){
Array.forEach(this.element.attributes,function(_307){
var _308=this.currentElement.getAttribute(_307.nodeName);
if(_308==null||_308!=_307.nodeValue){
this._setAttribute(_306,_307.nodeName,_307.nodeValue);
this._summary.push("@"+_307.nodeName);
}
},this);
Array.forEach(this.currentElement.attributes,function(_309){
if(this.element.getAttribute(_309.nodeName)==null){
this._setAttribute(_306,_309.nodeName,null);
this._summary.push("@"+_309.nodeName);
}
},this);
};
AttributesUpdate.prototype._setAttribute=function(_30a,name,_30c){
if(_30a==null){
alert(this.id+": "+document.getElementById(this.id)+"\n\n"+name+"="+_30c);
SystemLogger.getLogger("AttributesUpdate").fine(document.body.innerHTML);
}
var _30d=(_30c==null);
if(_30d){
_30a.removeAttribute(name);
}else{
_30a.setAttribute(name,_30c);
}
if(document.all!=null){
if(_30d){
_30c="";
}
switch(name.toLowerCase()){
case "class":
_30a.className=_30c;
break;
case "disabled":
_30a.disabled=!_30d;
break;
case "checked":
_30a.checked=!_30d;
break;
case "readonly":
_30a.readOnly=!_30d;
break;
}
}
};
AttributesUpdate.prototype._afterUpdate=function(_30e){
AttributesUpdate.superclass._afterUpdate.call(this,_30e);
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
_WindowManager.prototype={WINDOW_LOADED_BROADCAST:null,WINDOW_UNLOADED_BROADCAST:null,WINDOW_EVALUATED_BROADCAST:null,WINDOW_RESIZED_BROADCAST:null,isWindowLoaded:false,_logger:SystemLogger.getLogger("WindowManager ["+document.title+"]"),_ondomstatements:new List(),_onloadstatements:new List(),_onresizestatements:new List(),_currentDimensions:null,_newDimensions:null,_broadcastTimeout:null,_isHorizontalResize:false,_isVerticalResize:false,_broadcastTimeout:null,_compute:function(_30f,key){
return _30f.replace("${windowkey}",document.location+":"+key);
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
var _313=this._newDimensions.w!=this._currentDimensions.w;
var _314=this._newDimensions.h!=this._currentDimensions.h;
if(_313||_314){
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
},fireOnDOM:function(_316){
if(Interfaces.isImplemented(IDOMHandler,_316,true)){
this._ondomstatements.add(_316);
}
},fireOnLoad:function(_317){
if(Interfaces.isImplemented(ILoadHandler,_317,true)){
this._onloadstatements.add(_317);
}
},fireOnResize:function(_318){
if(Interfaces.isImplemented(IResizeHandler,_318,true)){
this._onresizestatements.add(_318);
}
},onDOMContentLoaded:function(){
while(this._ondomstatements.hasNext()){
this._ondomstatements.getNext().fireOnDOM();
}
},getWindowDimensions:function(){
return new Dimension(Client.isMozilla?window.innerWidth:document.body.clientWidth,Client.isMozilla?window.innerHeight:document.body.clientHeight);
},evaluate:function(_319){
return eval(_319);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMLOG_OPENED,{handleBroadcast:function(_31a,_31b){
SystemLogger.unsuspend(_31b);
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
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_DIRTY,{handleBroadcast:function(_31c,arg){
var list=Application._dirtyTabs;
list.set(arg.key,arg);
if(list.countEntries()==1){
var _31f=top.app.bindingMap.broadcasterHasDirtyTabs;
_31f.enable();
}
}});
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,{handleBroadcast:function(_320,arg){
var list=Application._dirtyTabs;
list.del(arg.key);
if(list.countEntries()==0){
var _323=top.app.bindingMap.broadcasterHasDirtyTabs;
_323.disable();
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
var _324=false;
if(this.isLoggedIn){
this.isLoggedIn=false;
this.isLoggedOut=true;
_324=LoginService.Logout(true);
if(!_324){
alert("Logout failed.");
}
}
return _324;
},lock:function(_325){
if(_325!=null){
this._lockthings[_325]=true;
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
},unlock:function(_326,_327){
if(_326!=null){
delete this._lockthings[_326];
if(top.bindingMap.mastercover!=null){
if(_327||this._lockers>0){
if(_327){
var out="Unlocked by "+new String(_326)+"\n";
for(var _329 in this._lockthings){
out+="Locked by "+new String(_329)+". ";
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
},hasLock:function(_32a){
return this._lockthings[_32a]==true;
},activate:function(_32b){
var _32c=this._activeBinding;
this._activeBinding=_32b;
this._activatedBindings.add(_32b);
if(_32c&&_32c.isActive){
_32c.deActivate();
}
},deActivate:function(_32d){
var _32e=null;
var _32f=null;
if(_32d==this._activeBinding){
while(!_32f&&this._activatedBindings.hasEntries()){
_32e=this._activatedBindings.extractLast();
if(_32e!=_32d&&_32e.isActivatable){
_32f=_32e;
}
}
if(!_32f){
_32f=app.bindingMap.explorerdock;
}
_32f.activate();
}
},focused:function(_330){
this.isFocused=_330;
if(_330){
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
},handleAction:function(_335){
switch(_335.type){
case Application.REFRESH:
this.refresh();
break;
}
},declareTopLocal:function(win){
var _337=Resolver.resolve("/scripts/source/top/");
if(this._topLevelClasses==null){
this._topLevelClasses=new List();
var self=this;
new List(DOMUtil.getElementsByTagName(document,"script")).each(function(_339){
var src=_339.src;
if(src.indexOf(_337)>-1){
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
var _33e=false;
if(this._isMousePositionTracking){
_33e=true;
if(Client.isExplorer&&e.button!=1){
_33e=false;
}
if(_33e){
this._mousePosition=DOMUtil.getUniversalMousePosition(e);
}
}
return _33e;
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
},onDragStart:function(_340){
var _341=BindingDragger.draggedBinding;
if(Interfaces.isImplemented(IDraggable,_341,true)==true){
if(!this._isDragging){
app.bindingMap.dragdropcursor.setImage(_341.getImage());
this._cursorStartPoint=_340;
app.bindingMap.dragdropcursor.setPosition(this._cursorStartPoint);
CursorBinding.fadeIn(app.bindingMap.dragdropcursor);
if(_341.showDrag){
_341.showDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_START,_341.dragType);
this._isDragging=true;
}
}
},onDrag:function(diff){
if(this._isDragging){
var _343=new Point(this._cursorStartPoint.x+diff.x,this._cursorStartPoint.y+diff.y);
app.bindingMap.dragdropcursor.setPosition(_343);
}
},onDragStop:function(diff){
if(this._isDragging){
var _345=BindingDragger.draggedBinding;
if(_345.hideDrag){
_345.hideDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_STOP,_345.dragType);
this._isDragging=false;
_345=BindingAcceptor.acceptingBinding;
if(_345!=null){
if(Interfaces.isImplemented(IAcceptable,_345,true)==true){
_345.accept(BindingDragger.draggedBinding);
}else{
throw new Error("Application: IAcceptable not implemented "+_345);
}
BindingAcceptor.acceptingBinding=null;
CursorBinding.fadeOut(app.bindingMap.dragdropcursor);
}else{
app.bindingMap.dragdropcursor.hide();
}
}
},reload:function(_346){
if(this.isDeveloperMode||_346){
if(this.isDeveloperMode&&Client.isPrism){
Prism.clearCache();
}
Application.lock(Application);
setTimeout(function(){
top.window.location.reload(true);
},0);
}else{
if(Application.isOperational){
Dialog.question(StringBundle.getString("ui","Website.Application.DialogReload.Title"),StringBundle.getString("ui","Website.Application.DialogReload.Text"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_347){
if(_347==Dialog.RESPONSE_ACCEPT){
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
_Installation.prototype={versionString:null,versionPrettyString:null,installationID:null,handleBroadcast:function(_348){
switch(_348){
case BroadcastMessages.APPLICATION_KICKSTART:
var list=new List(InstallationService.GetInstallationInfo(true));
list.each(function(_34a){
switch(_34a.Key){
case "ProductVersion":
this.versionString=_34a.Value;
break;
case "ProductTitle":
this.versionPrettyString=_34a.Value;
break;
case "InstallationId":
this.installationID=_34a.Value;
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
},initialize:function(_34d){
if(!this.isInitialized){
this.isInitialized=true;
if(_34d){
this._audio=_34d;
this.isEnabled=true;
}
EventBroadcaster.broadcast(BroadcastMessages.AUDIO_INITIALIZED);
}
},play:function(url){
var _34f=false;
if(this.isEnabled&&Preferences.getPref("audio")){
this._audio.fromURL(Resolver.resolve(url));
_34f=true;
}
return _34f;
}};
var Audio=new _Audio();
window.Preferences=new function(){
var _350=SystemLogger.getLogger("Preferences");
this.AUDIO="audio";
this.LOGIN="login";
var _351={"audio":true,"login":true};
EventBroadcaster.subscribe(BroadcastMessages.LOCALSTORE_INITIALIZED,{handleBroadcast:function(){
if(LocalStore.isEnabled){
var _352=LocalStore.getProperty(LocalStore.PREFERENCES);
if(_352){
for(var key in _352){
_351[key]=_352[key];
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
LocalStore.setProperty(LocalStore.PREFERENCES,_351);
}
}});
this.getPref=function(key){
var _355=null;
if(key){
_355=_351[key];
}else{
throw "No such preference.";
}
return _355;
};
this.setPref=function(key,_357){
if(key){
_351[key]=_357;
}else{
throw "No such preference.";
}
};
function debug(_358){
var _359=_358?"Persisted preferences":"No persisted preferences. Using defaults";
_359+=":\n";
for(var key in _351){
var pref=_351[key];
_359+="\n\t"+key+": "+pref+" ["+typeof pref+"]";
}
_350.fine(_359);
}
};
function _Persistance(){
}
_Persistance.prototype={_logger:SystemLogger.getLogger("Persistance"),_persistance:null,_isEnabled:false,isInitialized:false,isEnabled:false,getPersistedProperty:function(id,prop){
var _35e=null;
if(this.isInitialized==true){
if(this._persistance){
var _35f=this._persistance[id];
if(_35f){
_35e=_35f[prop];
}
}
}else{
throw "Persistance not initialized!";
}
return _35e;
},setPersistedProperty:function(id,prop,_362){
if(this.isInitialized==true){
if(this._persistance){
if(_362!=null){
if(!this._persistance[id]){
this._persistance[id]={};
}
this._persistance[id][prop]=String(_362);
}else{
this._logger.error("Cannot persist "+prop+" with value: null");
}
}
}else{
throw "Persistance not initialized!";
}
},clearAllPersistedProperties:function(){
this._logger.debug("TODO: clearAllPersistedProperties");
},handleBroadcast:function(_363){
switch(_363){
case BroadcastMessages.APPLICATION_SHUTDOWN:
var _364=top.bindingMap.persistance;
_364.persist(this._persistance);
break;
}
},initialize:function(){
if(!this.isInitialized){
this.isInitialized=true;
if(this._isEnabled==true){
var _365=top.bindingMap.persistance;
var map=_365.getPersistanceMap();
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
function StandardEventHandler(doc,_368){
this.logger=SystemLogger.getLogger("StandardEventHandler ["+doc.title+"]");
this._contextDocument=doc;
this._contextWindow=DOMUtil.getParentWindow(doc);
this.hasNativeKeys=false;
this._isAllowTabs=false;
this._isMouseHandlerOnly=_368;
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
var _36a={handleEvent:function(e){
switch(e.type){
case DOMEvents.BLUR:
Application.focused(false);
break;
case DOMEvents.FOCUS:
Application.focused(true);
break;
}
}};
DOMEvents.addEventListener(this._contextWindow,DOMEvents.BLUR,_36a);
DOMEvents.addEventListener(this._contextWindow,DOMEvents.FOCUS,_36a);
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
var _371=UserInterface.getBinding(node);
if(_371!=null){
_371.dispatchAction(Binding.ACTION_ACTIVATED);
}
node=_371!=null?null:node.parentNode;
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
var _374=Application.trackMousePosition(e);
if(_374){
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEMOVE,e);
}
if(Client.isExplorer&&false){
if(Application.isBlurred){
var doc=this._contextDocument;
var win=this._contextWindow;
if(doc.body.contentEditable=="true"){
win=DOMUtil.getParentWindow(win.frameElement);
}
win.focus();
}
}
}
catch(exception){
DOMEvents.removeEventListener(this._contextDocument,DOMEvents.MOUSEMOVE,this);
throw (exception);
}
};
StandardEventHandler.prototype._handleKeyDown=function(e,_378){
if(e.keyCode==KeyEventCodes.VK_TAB){
if(!this._isAllowTabs){
if(!_378){
this._handleTab(e);
DOMEvents.preventDefault(e);
}
}else{
if(e.shiftKey||e.ctrlKey){
DOMEvents.preventDefault(e);
}
}
_378=true;
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
var _379=KeySetBinding.handleKey(this._contextDocument,e);
if(!_379){
switch(e.keyCode){
case KeyEventCodes.VK_PAGE_UP:
case KeyEventCodes.VK_PAGE_DOWN:
break;
default:
var _37a=this._contextWindow.frameElement;
if(_37a!=null){
var _37b=DOMUtil.getParentWindow(_37a);
if(_37b.standardEventHandler!=null){
_37b.standardEventHandler._handleKeyDown(e,_378);
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
var _37e=false;
var _37f=DOMEvents.getTarget(e);
var name=_37f.nodeName.toLowerCase();
switch(name){
case "input":
case "textarea":
case "select":
_37e=(e.type==DOMEvents.FOCUS||e.type==DOMEvents.FOCUSIN);
if(name=="input"||name=="textarea"){
StandardEventHandler.isBackAllowed=_37e;
}
if(_37e){
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
StandardEventHandler.prototype.enableNativeKeys=function(_382){
this._isAllowTabs=(_382==true?true:false);
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
function Action(_385,type){
this.target=_385;
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
function Animation(_387){
this.id=KeyMaster.getUniqueKey();
this.interval=25;
this.iterator=0;
this.modifier=1;
this.endcount=90;
for(var _388 in _387){
this[_388]=_387[_388];
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
Animation.prototype.onstart=function(_38c){
};
Animation.prototype.onstep=function(_38d){
};
Animation.prototype.onstop=function(_38e){
};
Point.isEqual=function(p1,p2){
var _391=false;
if(p1&&p2){
_391=(p1.x==p2.x)&&(p1.y==p2.y);
}
return _391;
};
function Point(x,y){
this.x=x;
this.y=y;
}
Point.prototype={x:0,y:0};
Dimension.isEqual=function(dim1,dim2){
var _396=false;
if(dim1&&dim2){
_396=(dim1.w==dim2.w)&&(dim1.h==dim2.h);
}
return _396;
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
function BindingAcceptor(_39d){
this.logger=SystemLogger.getLogger("BindingDragger");
this._binding=_39d;
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
var _39e=new List(this._binding.dragAccept.split(" "));
while(_39e.hasNext()){
var type=_39e.getNext();
this._acceptedList[type]=true;
}
}
};
BindingAcceptor.prototype.handleBroadcast=function(_3a0,arg){
var type=arg;
try{
switch(_3a0){
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
function BindingBoxObject(_3a5){
this._domElement=_3a5.getBindingElement();
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
function BindingDragger(_3a7){
this.logger=SystemLogger.getLogger("BindingDragger");
this.binding=_3a7;
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
BindingDragger.prototype.registerHandler=function(_3a9){
if(Interfaces.isImplemented(IDragHandler,_3a9)==true){
this.handler=_3a9;
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
var _3ac=e.button==(e.target?0:1);
if(_3ac){
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
var _3ae=Application.getMousePosition();
var dx=_3ae.x-this.startPoint.x;
var dy=_3ae.y-this.startPoint.y;
return new Point(dx,dy);
};
BindingDragger.prototype.handleBroadcast=function(_3b1,e){
switch(_3b1){
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
function BindingParser(_3b3){
this.logger=SystemLogger.getLogger("BindingParser");
this._ownerDocument=_3b3;
this._rootElement=null;
}
BindingParser.prototype.parseFromString=function(_3b4){
var _3b5=new List();
var xml=BindingParser.XML.replace("${markup}",_3b4);
var doc=XMLParser.parse(_3b4);
if(doc){
var _3b8=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this._ownerDocument);
this._iterate(doc.documentElement,_3b8);
var node=_3b8.firstChild;
while(node){
if(node.nodeType==Node.ELEMENT_NODE){
_3b5.add(node);
}
node=node.nextSibling;
}
}
return _3b5;
};
BindingParser.prototype._iterate=function(_3ba,_3bb){
var _3bc=null;
switch(_3ba.nodeType){
case Node.ELEMENT_NODE:
_3bc=this._cloneElement(_3ba);
UserInterface.registerBinding(_3bc);
break;
case Node.TEXT_NODE:
_3bc=this._ownerDocument.createTextNode(_3ba.nodeValue);
break;
}
if(_3bc){
_3bb.appendChild(_3bc);
}
if(_3bc&&_3ba.hasChildNodes()){
var _3bd=_3ba.firstChild;
while(_3bd){
this._iterate(_3bd,_3bc);
_3bd=_3bd.nextSibling;
}
}
};
BindingParser.prototype._cloneElement=function(_3be){
var _3bf=DOMUtil.createElementNS(_3be.namespaceURI?_3be.namespaceURI:Constants.NS_XHTML,_3be.nodeName,this._ownerDocument);
var i=0;
while(i<_3be.attributes.length){
var attr=_3be.attributes.item(i++);
_3bf.setAttribute(attr.nodeName,String(attr.nodeValue));
}
return _3bf;
};
BindingSerializer.activeInstance=null;
BindingSerializer.KEYPOINTER="bindingserializerkeypointer";
BindingSerializer.includeShadowTreeBindings=false;
BindingSerializer.filter=function(_3c2){
var _3c3=null;
var _3c4=false;
var _3c5=_3c2.parentNode.getAttribute(BindingSerializer.KEYPOINTER);
if(UserInterface.hasBinding(_3c2)){
var _3c6=UserInterface.getBinding(_3c2);
_3c4=BindingSerializer.activeInstance.indexBinding(_3c6);
if(_3c4){
_3c3=_3c6.key;
_3c2.setAttribute(BindingSerializer.KEYPOINTER,_3c3);
}
}
_3c3=_3c3?_3c3:_3c5;
var _3c7=new List(_3c2.childNodes);
_3c7.each(function(_3c8){
if(_3c8.nodeType==Node.ELEMENT_NODE){
_3c8.setAttribute(BindingSerializer.KEYPOINTER,_3c3);
}
});
if(_3c4){
BindingSerializer.activeInstance.append(_3c3,_3c5);
}
};
function BindingSerializer(){
this.logger=SystemLogger.getLogger("BindingSerializer");
this._dom=DOMUtil.getDOMDocument();
alert("BindingSerializer: Convert to Crawler!");
this._pointers=[];
}
BindingSerializer.prototype.serializeBinding=function(_3c9,_3ca){
BindingSerializer.includeShadowTreeBindings=_3ca?true:false;
BindingSerializer.activeInstance=this;
_3c9.bindingWindow.ElementIterator.iterate(_3c9.bindingElement,BindingSerializer.filter);
return DOMSerializer.serialize(this._dom,true);
};
BindingSerializer.prototype.indexBinding=function(_3cb){
var _3cc=false;
var _3cd=_3cb.serialize();
if(_3cd!=false){
_3cc=true;
var _3ce="ui:"+DOMUtil.getLocalName(_3cb.bindingElement);
var _3cf=DOMUtil.createElementNS(Constants.NS_UI,_3ce,this._dom);
this._pointers[_3cb.key]=_3cf;
for(var prop in _3cd){
if(_3cd[prop]!=null){
_3cf.setAttribute(prop,String(_3cd[prop]));
}
}
}
return _3cc;
};
BindingSerializer.prototype.append=function(_3d1,_3d2){
var _3d3=this._pointers[_3d1];
var _3d4=_3d2?this._pointers[_3d2]:this._dom;
_3d4.appendChild(_3d3);
};
function ImageProfile(_3d5){
this._default=_3d5.image;
this._hover=_3d5.imageHover;
this._active=_3d5.imageActive;
this._disabled=_3d5.imageDisabled;
}
ImageProfile.prototype.getDefaultImage=function(){
return this._default;
};
ImageProfile.prototype.setDefaultImage=function(_3d6){
this._default=_3d6;
};
ImageProfile.prototype.getHoverImage=function(){
return this._hover;
};
ImageProfile.prototype.setHoverImage=function(_3d7){
this._hover=_3d7;
};
ImageProfile.prototype.getActiveImage=function(){
return this._active;
};
ImageProfile.prototype.setActiveImage=function(_3d8){
this._active=_3d8;
};
ImageProfile.prototype.getDisabledImage=function(){
return this._disabled;
};
ImageProfile.prototype.setDisabledImage=function(_3d9){
this._disabled=_3d9;
};
function _BindingFinder(){
}
_BindingFinder.prototype={getDescendantBindingsByLocalName:function(_3da,_3db,_3dc){
var _3dd=null;
if(_3da.isAttached){
_3dd=new List();
var _3de=_3dc?_3da.getChildElementsByLocalName(_3db):_3da.getDescendantElementsByLocalName(_3db);
_3de.each(function(_3df){
var _3e0=UserInterface.getBinding(_3df);
if(_3e0){
_3dd.add(_3e0);
}
});
}else{
var ouch="Could not resolve descendants of unattached binding "+_3da.toString();
if(Application.isDeveloperMode){
throw ouch;
}
}
return _3dd;
},getAncestorBindingByType:function(_3e2,impl,_3e4){
var _3e5=null;
if(Binding.exists(_3e2)){
var node=_3e2.bindingElement;
while(_3e5==null&&node!=null){
node=node.parentNode;
if(node!=null){
if(UserInterface.hasBinding(node)){
var _3e7=UserInterface.getBinding(node);
if(_3e7 instanceof impl){
_3e5=_3e7;
}
}else{
if(_3e4&&node.nodeType==Node.DOCUMENT_NODE){
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
return _3e5;
},getAncestorBindingByLocalName:function(_3e9,_3ea,_3eb){
var _3ec=null;
if(_3ea=="*"){
var node=_3e9.bindingElement;
while(!_3ec&&(node=node.parentNode)!=null){
if(UserInterface.hasBinding(node)){
_3ec=UserInterface.getBinding(node);
}
}
}else{
_3ec=UserInterface.getBinding(DOMUtil.getAncestorByLocalName(_3ea,_3e9.bindingElement,_3eb));
}
return _3ec;
},getChildElementsByLocalName:function(_3ee,_3ef){
var _3f0=new List();
var _3f1=new List(_3ee.bindingElement.childNodes);
_3f1.each(function(_3f2){
if(_3f2.nodeType==Node.ELEMENT_NODE){
if(_3ef=="*"||DOMUtil.getLocalName(_3f2)==_3ef){
_3f0.add(_3f2);
}
}
});
return _3f0;
},getChildBindingByType:function(_3f3,impl){
var _3f5=null;
_3f3.getChildElementsByLocalName("*").each(function(_3f6){
var _3f7=UserInterface.getBinding(_3f6);
if(_3f7!=null&&_3f7 instanceof impl){
_3f5=_3f7;
return false;
}else{
return true;
}
});
return _3f5;
},getDescendantBindingByType:function(_3f8,impl){
var _3fa=null;
_3f8.getDescendantElementsByLocalName("*").each(function(_3fb){
var _3fc=UserInterface.getBinding(_3fb);
if(_3fc!=null&&_3fc instanceof impl){
_3fa=_3fc;
return false;
}else{
return true;
}
});
return _3fa;
},getDescendantBindingsByType:function(_3fd,impl){
var _3ff=new List();
_3fd.getDescendantElementsByLocalName("*").each(function(_400){
var _401=UserInterface.getBinding(_400);
if(_401!=null&&_401 instanceof impl){
_3ff.add(_401);
}
return true;
});
return _3ff;
},getNextBindingByLocalName:function(_402,name){
var _404=null;
var _405=_402.bindingElement;
while((_405=DOMUtil.getNextElementSibling(_405))!=null&&DOMUtil.getLocalName(_405)!=name){
}
if(_405!=null){
_404=UserInterface.getBinding(_405);
}
return _404;
},getPreviousBindingByLocalName:function(_406,name){
var _408=null;
var _409=_406.bindingElement;
while((_409=DOMUtil.getPreviousElementSibling(_409))!=null&&DOMUtil.getLocalName(_409)!=name){
}
if(_409!=null){
_408=UserInterface.getBinding(_409);
}
return _408;
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
},addFilter:function(_40a){
this._filters.add(_40a);
},removeFilter:function(_40b){
var _40c=-1;
this._filters.each(function(fil){
_40c++;
var _40e=true;
if(fil==_40b){
_40e=false;
}
return _40e;
});
if(_40c>-1){
this._filters.del(_40c);
}
},_applyFilters:function(node,arg){
var _411=null;
var stop=NodeCrawler.STOP_CRAWLING;
var skip=NodeCrawler.SKIP_NODE;
var _414=NodeCrawler.SKIP_CHILDREN;
this._filters.reset();
var _415=true;
while(this._filters.hasNext()&&_415==true){
var _416=this._filters.getNext();
var res=_416.call(this,node,arg);
if(res!=null){
_411=res;
switch(res){
case stop:
case skip:
case skip+_414:
_415=false;
break;
}
}
}
return _411;
},crawl:function(_418,arg){
this.contextDocument=_418.ownerDocument;
this.onCrawlStart();
var _41a=this.type==NodeCrawler.TYPE_ASCENDING;
var _41b=this._applyFilters(_418,arg);
if(_41b!=NodeCrawler.STOP_CRAWLING){
if(_41a&&_41b==NodeCrawler.SKIP_CHILDREN){
}else{
var next=null;
if(this.nextNode!=null){
next=this.nextNode;
this.nextNode=null;
}else{
next=_41a?_418.parentNode:_418;
}
this._crawl(next,arg);
}
}
this.onCrawlStop();
},onCrawlStart:function(){
},onCrawlStop:function(){
},_crawl:function(_41d,arg){
var _41f=null;
switch(this.type){
case NodeCrawler.TYPE_DESCENDING:
_41f=this._crawlDescending(_41d,arg);
break;
case NodeCrawler.TYPE_ASCENDING:
_41f=this._crawlAscending(_41d,arg);
break;
}
return _41f;
},_crawlDescending:function(_420,arg){
var skip=NodeCrawler.SKIP_NODE;
var _423=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
var _425=null;
if(_420.hasChildNodes()){
var node=_420.firstChild;
while(node!=null&&_425!=stop){
this.currentNode=node;
_425=this._applyFilters(node,arg);
switch(_425){
case stop:
case _423:
case skip+_423:
break;
default:
if(node.nodeType==Node.ELEMENT_NODE){
if(this.nextNode==null){
var res=this._crawl(node,arg);
if(res==stop){
_425=stop;
break;
}
}
}
if(_425!=stop&&_425!=skip){
this.previousNode=node;
}
break;
}
if(_425!=stop){
node=this.nextNode?this.nextNode:node.nextSibling;
this.nextNode=null;
}
}
}
return _425;
},_crawlAscending:function(_428,arg){
var _42a=null;
var skip=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
if(_428!=null){
this.currentNode=_428;
_42a=this._applyFilters(_428,arg);
if(_42a!=stop){
var next=this.nextNode?this.nextNode:_428.parentNode;
this.nextNode=null;
if(next&&next.nodeType!=Node.DOCUMENT_NODE){
this.previousNode=_428;
_42a=this._crawl(next,arg);
}
}
}else{
_42a=stop;
}
return _42a;
}};
NodeCrawler.prototype.dispose=function(){
this._filters.dispose();
for(var _42e in this){
this[_42e]=null;
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
var _431=null;
if(node.nodeType!=Node.ELEMENT_NODE){
_431=NodeCrawler.SKIP_NODE;
}
return _431;
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
this.addFilter(function(_432,arg){
var _434=null;
if(!UserInterface.hasBinding(_432)){
_434=NodeCrawler.SKIP_NODE;
}
return _434;
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
this.addFilter(function(_436,arg){
var _438=null;
var _439=UserInterface.getBinding(_436);
if(Interfaces.isImplemented(ICrawlerHandler,_439)==true){
self.response=null;
_439.handleCrawler(self);
_438=self.response;
}
return _438;
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
this.addFilter(function(_43b,list){
var _43d=null;
var _43e=UserInterface.getBinding(_43b);
if(Interfaces.isImplemented(IFlexible,_43e)==true){
switch(self.mode){
case FlexBoxCrawler.MODE_FORCE:
list.add(_43e);
break;
case FlexBoxCrawler.MODE_NORMAL:
if(_43e.isFlexSuspended==true){
_43d=NodeCrawler.SKIP_CHILDREN;
}else{
list.add(_43e);
}
break;
}
}
return _43d;
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
this.addFilter(function(_43f,list){
var _441=null;
var _442=UserInterface.getBinding(_43f);
if(_442.isAttached==true){
if(Interfaces.isImplemented(IFocusable,_442)==true){
if(_442.isFocusable&&_442.isVisible){
switch(this.mode){
case FocusCrawler.MODE_INDEX:
list.add(_442);
break;
case FocusCrawler.MODE_FOCUS:
if(!_442.isFocused){
_442.focus();
}
_441=NodeCrawler.STOP_CRAWLING;
break;
case FocusCrawler.MODE_BLUR:
if(_442.isFocused==true){
_442.blur();
_441=NodeCrawler.STOP_CRAWLING;
}
break;
}
}
}
}
return _441;
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
this.addFilter(function(_443,list){
var _445=null;
var _446=UserInterface.getBinding(_443);
if(!_446.isVisible){
_445=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _445;
});
this.addFilter(function(_447,list){
var _449=null;
var _44a=UserInterface.getBinding(_447);
if(_44a.isAttached){
if(Interfaces.isImplemented(IFit,_44a)){
if(!_44a.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_44a);
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
UpdateAssistant.serialize=function(_44b){
_44b=_44b.cloneNode(true);
_44b.setAttributeNS(Constants.NS_NS,"xmlns",Constants.NS_XHTML);
_44b.setAttributeNS(Constants.NS_NS,"xmlns:ui",Constants.NS_UI);
return this._serializer.serializeToString(_44b);
};
}
},handleEvent:function(e){
var _44d=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.BEFOREUPDATE:
this._beforeUpdate(_44d);
break;
case DOMEvents.AFTERUPDATE:
this._afterUpdate(_44d);
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
},_beforeUpdate:function(_44e){
var _44f=(_44e==document.documentElement);
if(_44f){
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
var _452=FocusBinding.focusedBinding;
if(_452!=null){
this._focusID=_452.getID();
}
if(this.isDebugging){
this._oldDOM=DOMSerializer.serialize(UpdateManager.currentDOM,true);
}
}else{
switch(_44e.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_REMOVE:
DocumentManager.detachBindings(_44e);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_44e,false);
break;
}
}
},_afterUpdate:function(_453){
var _454=(_453==document.documentElement);
if(_454){
var _455=this._elementsbuffer;
if(_455.hasEntries()){
_455.each(function(_456){
DocumentManager.attachBindings(_456);
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
var _459=FocusBinding.focusedBinding;
if(_459==null){
var _45a=document.getElementById(this._focusID);
if(_45a!=null){
var _459=UserInterface.getBinding(_45a);
if(_459!=null){
_459.focus();
}
}
}
this._focusID=null;
if(UpdateManager.summary!=""){
if(this.isDebugging){
var _45b=DOMSerializer.serialize(UpdateManager.currentDOM,true);
var _45c="NEW DOM: "+document.title+"\n\n"+_45b+"\n\n";
_45c+="OLD DOM: "+document.title+"\n\n"+this._oldDOM;
this._logger.debug(_45c);
this._oldDOM=null;
}
this._logger.fine(UpdateManager.summary);
}
}else{
switch(_453.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_INSERT:
this._elementsbuffer.add(_453);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_453,true);
break;
}
switch(_453.id){
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
var _459=UserInterface.getBinding(_453);
while(_459==null&&_453!=null){
_459=UserInterface.getBinding(_453);
_453=_453.parentNode;
}
if(_459!=null){
_459.dispatchAction(Binding.ACTION_UPDATED);
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
},_backupattributes:function(_45e,_45f){
var _460=UserInterface.getBinding(_45e);
if(_460!=null){
if(_45f){
var _461=this._attributesbuffer;
var map=new Map();
_461.each(function(name,old){
var now=_45e.getAttribute(name);
if(now!=null){
if(now!=old){
map.set(name,Types.castFromString(now));
}
}else{
map.set(name,null);
}
});
new List(_45e.attributes).each(function(att){
if(att.specified){
if(!_461.has(att.nodeName)){
map.set(att.nodeName,Types.castFromString(att.nodeValue));
}
}
});
map.each(function(name,_468){
var _469=_460.propertyMethodMap[name];
if(_469!=null){
_469.call(_460,_468);
}
});
}else{
var map=new Map();
new List(_45e.attributes).each(function(att){
if(att.specified){
map.set(att.nodeName,att.nodeValue);
}
});
this._attributesbuffer=map;
}
}
},handleElement:function(_46b,_46c){
var _46d=window.bindingMap[_46b.getAttribute("id")];
if(_46d!=null){
return _46d.handleElement(_46b,_46c);
}
},updateElement:function(_46e,_46f){
var _470=window.bindingMap[_46e.getAttribute("id")];
if(_470!=null){
return _470.updateElement(_46e,_46f);
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
this.addFilter(function(_472,list){
var _474=UserInterface.getBinding(_472);
var _475=null;
switch(self.mode){
case DocumentCrawler.MODE_REGISTER:
if(_474==null){
UserInterface.registerBinding(_472);
}
break;
case DocumentCrawler.MODE_ATTACH:
if(_474!=null){
if(!_474.isAttached){
list.add(_474);
}
if(_474.isLazy==true){
_475=NodeCrawler.SKIP_CHILDREN;
}
}
break;
case DocumentCrawler.MODE_DETACH:
if(_474!=null){
list.add(_474);
}
break;
}
return _475;
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
},handleBroadcast:function(_476,arg){
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
var _479=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.SELECTSTART:
case DOMEvents.CONTEXTMENU:
if(!this._isTextInputElement(_479)){
DOMEvents.preventDefault(e);
}
break;
case DOMEvents.CLICK:
if(Client.isExplorer){
if(_479.href&&_479.href.indexOf(Constants.DUMMY_LINK)>-1){
DOMEvents.preventDefault(e);
}
}
break;
}
},_resolveCustomBindingMappings:function(){
var _47a=DOMUtil.getElementsByTagName(document.documentElement,"bindingmappingset").item(0);
if(_47a!=null){
var map={};
var _47c=DOMUtil.getElementsByTagName(_47a,"bindingmapping");
new List(_47c).each(function(_47d){
var _47e=_47d.getAttribute("element");
var _47f=_47d.getAttribute("binding");
map[_47e]=eval(_47f);
});
this.setCustomUserInterfaceMapping(new UserInterfaceMapping(map));
}
},setCustomUserInterfaceMapping:function(_480){
if(this.customUserInterfaceMapping==null){
this.customUserInterfaceMapping=_480;
}else{
this.customUserInterfaceMapping.merge(_480);
}
},_registerBindings:function(_481){
var _482=new DocumentCrawler();
_482.mode=DocumentCrawler.MODE_REGISTER;
_482.crawl(_481);
_482.dispose();
},_attachBindings:function(_483){
var _484=new DocumentCrawler();
_484.mode=DocumentCrawler.MODE_ATTACH;
var list=new List();
_484.crawl(_483,list);
var _486=false;
while(list.hasNext()){
var _487=list.getNext();
if(!_487.isAttached){
_487.onBindingAttach();
if(!_487.memberDependencies){
_487.onBindingInitialize();
}
if(Interfaces.isImplemented(IData,_487)){
_486=true;
}
}
}
if(_486){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_484.dispose();
list.dispose();
},attachBindings:function(_489){
this._registerBindings(_489);
this._attachBindings(_489);
},detachBindings:function(_48a,_48b){
var _48c=new DocumentCrawler();
_48c.mode=DocumentCrawler.MODE_DETACH;
var list=new List();
_48c.crawl(_48a,list);
if(_48b==true){
list.extractFirst();
}
var _48e=false;
list.reverse().each(function(_48f){
if(Interfaces.isImplemented(IData,_48f)){
_48e=true;
}
_48f.dispose(true);
});
if(_48e){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_48c.dispose();
list.dispose();
},detachAllBindings:function(){
this.detachBindings(document.documentElement);
},computeMaxIndex:function(){
if(this._maxIndex==-1){
this._maxIndex=DOMUtil.getMaxIndex(document);
}
return this._maxIndex++;
},_isTextInputElement:function(_491){
return (/textarea|input/.test(DOMUtil.getLocalName(_491)));
},_makeDocumentUnselectable:function(){
if(Client.isExplorer){
DOMEvents.addEventListener(document,DOMEvents.SELECTSTART,this);
}else{
}
}};
var DocumentManager=new _DocumentManager();
function _DataManager(){
}
_DataManager.prototype={isPostBackFun:false,_logger:SystemLogger.getLogger("DataManager ["+document.title+"]"),_dataBindings:{},isDirty:false,dirty:function(_492){
this.isDirty=true;
var _493=false;
if(_492!=null&&!_492.isDirty){
_492.isDirty=true;
_492.dispatchAction(Binding.ACTION_DIRTY);
_493=true;
}
return _493;
},clean:function(_494){
if(_494.isDirty){
_494.isDirty=false;
}
},registerDataBinding:function(name,_496){
if(Interfaces.isImplemented(IData,_496,true)){
if(this._dataBindings[name]!=null){
throw "no proper support for checkbox multiple values! "+name;
}else{
this._dataBindings[name]=_496;
}
}else{
throw "Invalid DataBinding: "+_496;
}
},unRegisterDataBinding:function(name){
if(this._dataBindings[name]!=null){
delete this._dataBindings[name];
}
},getDataBinding:function(name){
var _499=null;
if(this._dataBindings[name]!=null){
_499=this._dataBindings[name];
}
return _499;
},getAllDataBindings:function(_49a){
var list=new List();
for(var name in this._dataBindings){
var _49d=this._dataBindings[name];
list.add(_49d);
if(_49a&&_49d instanceof WindowBinding){
var _49e=_49d.getContentWindow().DataManager;
if(_49e!=null){
list.merge(_49e.getAllDataBindings());
}
}
}
return list;
},hasDataBindings:function(){
var _49f=false;
for(var name in this._dataBindings){
_49f=true;
break;
}
return _49f;
},populateDataBindings:function(map){
if(map instanceof DataBindingMap){
map.each(function(name,_4a3){
var _4a4=this._dataBindings[name];
if(_4a4!=null){
switch(map.type){
case DataBindingMap.TYPE_RESULT:
try{
_4a4.setResult(_4a3);
}
catch(exception){
if(Application.isDeveloperMode){
alert(_4a4);
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
var _4a5=new DataBindingMap();
_4a5.type=DataBindingMap.TYPE_VALUE;
for(var name in this._dataBindings){
var _4a7=this._dataBindings[name];
if(_4a7 instanceof DataDialogBinding){
throw "DataDialogBinding valuemap not supported!";
}
_4a5[name]=_4a7.getValue();
}
return _4a5;
},getDataBindingResultMap:function(){
var _4a8=new DataBindingMap();
_4a8.type=DataBindingMap.TYPE_RESULT;
for(var name in this._dataBindings){
var _4aa=this._dataBindings[name];
var res=_4aa.getResult();
if(res instanceof DataBindingMap){
res.each(function(name,_4ad){
_4a8.set(name,_4ad);
});
}else{
_4a8.set(name,res);
}
}
return _4a8;
},getPostBackString:function(){
var _4ae="";
var form=document.forms[0];
if(form!=null){
var _4b0="";
new List(form.elements).each(function(_4b1){
var name=_4b1.name;
var _4b3=encodeURIComponent(_4b1.value);
switch(_4b1.type){
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_4ae+=name+"="+_4b3+"&";
break;
case "submit":
if(document.activeElement==_4b1){
_4ae+=name+"="+_4b3+"&";
}
break;
case "radio":
if(_4b1.checked){
_4ae+=name+"="+_4b3+"&";
}
break;
case "checkbox":
if(_4b1.checked){
if(_4b1.name==_4b0){
if(_4ae.lastIndexOf("&")==_4ae.length-1){
_4ae=_4ae.substr(0,_4ae.length-1);
}
_4ae+=","+_4b3;
}else{
_4ae+=name+"="+_4b1.value;
}
_4b0=name;
_4ae+="&";
}
break;
}
});
}
return _4ae.substr(0,_4ae.length-1);
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
var _4bc=null;
var _4bd=null;
var _4be=false;
if(!this._cache[name]){
_4be=true;
var uri=Constants.TEMPLATESROOT+"/"+name;
var _4c0=DOMUtil.getXMLHTTPRequest();
_4c0.open("get",uri,false);
_4c0.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_4c0.send(null);
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4bd=_4c0.responseText;
break;
default:
_4bd=_4c0.responseXML;
break;
}
if(_4bd==null){
throw new Error("Templates: Could not read template. Malformed XML?");
}else{
this._cache[name]=_4bd;
}
}
_4bd=this._cache[name];
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4bc=_4bd;
break;
case this._modes.MODE_DOCUMENT:
_4bc=DOMUtil.cloneNode(_4bd,true);
break;
case this._modes.MODE_ELEMENT:
_4bc=DOMUtil.cloneNode(_4bd.documentElement,true);
break;
case this._modes.MODE_DOCUMENTTEXT:
_4bc=DOMSerializer.serialize(_4bd,true);
break;
case this._modes.MODE_ELEMENTTEXT:
_4bc=DOMSerializer.serialize(_4bd.documentElement,true);
break;
}
if(_4be&&Application.isDeveloperMode){
this._logger.fine(new String("Import \""+name+"\":\n\n"+_4bc));
}
return _4bc;
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
},invoke:function(url,_4c4,_4c5){
this._logger.error("Not implemented");
},invokeModal:function(url,_4c7,_4c8){
var _4c9=new DialogViewDefinition({handle:KeyMaster.getUniqueKey(),position:Dialog.MODAL,url:url,handler:_4c7,argument:_4c8});
StageBinding.presentViewDefinition(_4c9);
return _4c9;
},invokeDefinition:function(_4ca){
if(_4ca instanceof DialogViewDefinition){
StageBinding.presentViewDefinition(_4ca);
}
return _4ca;
},question:function(_4cb,text,_4cd,_4ce){
if(!_4cd){
_4cd=this.BUTTONS_ACCEPT_CANCEL;
}
this._standardDialog(this._TYPE_QUESTION,_4cb,text,_4cd,_4ce);
},message:function(_4cf,text,_4d1,_4d2){
if(!_4d1){
_4d1=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_MESSAGE,_4cf,text,_4d1,_4d2);
},error:function(_4d3,text,_4d5,_4d6){
if(!_4d5){
_4d5=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_ERROR,_4d3,text,_4d5,_4d6);
},warning:function(_4d7,text,_4d9,_4da){
if(!_4d9){
_4d9=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_WARNING,_4d7,text,_4d9,_4da);
},_standardDialog:function(type,_4dc,text,_4de,_4df){
var _4e0=null;
if(!_4de){
_4e0=new List(Dialog.BUTTONS_ACCEPT);
}else{
_4e0=new List();
new List(_4de).each(function(_4e1){
var _4e2=null;
switch(typeof _4e1){
case "object":
_4e2=_4e1;
break;
case "string":
var _4e3=false;
if(_4e1.indexOf(":")>-1){
_4e1=_4e1.split(":")[0];
_4e3=true;
}
_4e2=Dialog._dialogButtons[_4e1];
if(_4e3){
_4e2.isDefault=true;
}
break;
}
_4e0.add(_4e2);
});
}
var _4e4={title:_4dc,text:text,type:type,image:this._dialogImages[type],buttons:_4e0};
var _4e5=new DialogViewDefinition({handle:"standarddialog:"+type,position:Dialog.MODAL,url:this._URL_STANDARDDIALOG,handler:_4df,argument:_4e4});
StageBinding.presentViewDefinition(_4e5);
}};
var Dialog=new _Dialog();
function _Commands(){
this._construct();
}
_Commands.prototype={_URL_ABOUTDIALOG:"${root}/content/dialogs/about/about.aspx",_URL_PREFERENCES:"${root}/content/dialogs/preferences/preferences.aspx",_construct:function(){
var self=this;
EventBroadcaster.subscribe(BroadcastMessages.SAVE_ALL,{handleBroadcast:function(_4e7,arg){
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
},saveAll:function(_4ea){
var self=this;
var _4ec=Application.getDirtyDockTabsTabs();
if(_4ec.hasEntries()){
Dialog.invokeModal("${root}/content/dialogs/save/saveall.aspx",{handleDialogResponse:function(_4ed,_4ee){
switch(_4ed){
case Dialog.RESPONSE_ACCEPT:
self._handleSaveAllResult(_4ee,_4ea);
break;
case Dialog.RESPONSE_CANCEL:
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
break;
}
}},_4ec);
}else{
if(_4ea){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
},_handleSaveAllResult:function(_4ef,_4f0){
var _4f1=false;
var list=new List();
_4ef.each(function(name,tab){
if(tab!=false){
list.add(tab);
}
});
if(list.hasEntries()){
_4f1=true;
var _4f5=list.getLength();
var _4f6={handleBroadcast:function(_4f7,tab){
if(--_4f5==0){
EventBroadcaster.unsubscribe(BroadcastMessages.DOCKTAB_CLEAN,this);
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
if(_4f0){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
}};
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,_4f6);
list.each(function(tab){
tab.saveContainedEditor();
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
}
return _4f1;
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
var _4fb="Composite.Management.Help";
if(!StageBinding.isViewOpen(_4fb)){
StageBinding.handleViewPresentation(_4fb);
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
var _4fd=document.createEvent("Events");
_4fd.initEvent(type,true,true);
window.dispatchEvent(_4fd);
}else{
this._logger.warn("Prism methods should only be invoked in Prism! ("+type+")");
}
}};
var Prism=new _Prism();
ViewDefinition.DEFAULT_URL="${root}/blank.aspx";
ViewDefinition.clone=function(_4fe,_4ff){
var _500=null;
var _501=ViewDefinitions[_4fe];
if(_501.isMutable){
var impl=null;
if(_501 instanceof DialogViewDefinition){
impl=DialogViewDefinition;
}else{
impl=HostedViewDefinition;
}
if(_4ff!=null&&impl!=null){
var def=new impl();
for(var prop in _501){
def[prop]=_501[prop];
}
def.handle=_4ff;
_500=def;
}else{
throw "Cannot clone without newhandle";
}
}else{
throw "Cannot clone non-mutable definition";
}
return _500;
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
Binding.evaluate=function(_50a,_50b){
var _50c=null;
var _50d=_50b.bindingWindow.WindowManager;
if(_50d!=null){
var _50e=Binding.parseScriptStatement(_50a,_50b.key);
_50c=_50d.evaluate(_50e);
}
return _50c;
};
Binding.parseScriptStatement=function(_50f,key){
if(_50f!=null&&key!=null){
var _511="UserInterface.getBindingByKey ( \""+key+"\" )";
_50f=_50f.replace(/(\W|^)this(,| +|\)|;)/g,_511);
_50f=_50f.replace(/(\W|^)this(\.)/g,_511+".");
}
return _50f;
};
Binding.exists=function(_512){
var _513=false;
try{
if(_512&&_512.bindingElement&&_512.bindingElement.nodeType&&_512.isDisposed==false){
_513=true;
}
}
catch(accessDeniedException){
_513=false;
}
finally{
return _513;
}
};
Binding.destroy=function(_514){
if(!_514.isDisposed){
if(_514.acceptor!=null){
_514.acceptor.dispose();
}
if(_514.dragger!=null){
_514.disableDragging();
}
if(_514.boxObject!=null){
_514.boxObject.dispose();
}
if(_514._domEventHandlers!=null){
DOMEvents.cleanupEventListeners(_514);
}
for(var _515 in _514.shadowTree){
var _516=_514.shadowTree[_515];
if(_516 instanceof Binding&&Binding.exists(_516)){
_516.dispose(true);
}
_514.shadowTree[_515]=null;
}
_514.isDisposed=true;
_514=null;
}
};
Binding.dotnetify=function(_517,_518){
var _519=_517.getCallBackID();
if(_519!=null){
var _51a=DOMUtil.createElementNS(Constants.NS_XHTML,"input",_517.bindingDocument);
_51a.type="hidden";
_51a.id=_519;
_51a.name=_519;
_51a.value=_518!=null?_518:"";
_517.bindingElement.appendChild(_51a);
_517.shadowTree.dotnetinput=_51a;
}else{
throw _517.toString()+": Missing callback ID";
}
};
Binding.imageProfile=function(_51b){
var _51c=_51b.getProperty("image");
var _51d=_51b.getProperty("image-hover");
var _51e=_51b.getProperty("image-active");
var _51f=_51b.getProperty("image-disabled");
if(_51b.imageProfile==null){
if(_51b.image==null&&_51c!=null){
_51b.image=_51c;
}
if(_51b.imageHover==null&&_51d!=null){
_51b.imageHover=_51c;
}
if(_51b.imageActive==null&&_51e!=null){
_51b.imageActive=_51e;
}
if(_51b.imageDisabled==null&&_51f!=null){
_51b.imageDisabled=_51f;
}
if(_51b.image||_51b.imageHover||_51b.imageActive||_51b.imageDisabled){
_51b.imageProfile=new ImageProfile(_51b);
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
var _522=this.dependentBindings[key];
_522.onMemberInitialize(this);
}
}
this.isInitialized=true;
};
Binding.prototype.onMemberInitialize=function(_523){
if(_523){
this.memberDependencies[_523.key]=true;
var _524=true;
for(var key in this.memberDependencies){
if(this.memberDependencies[key]==false){
_524=false;
break;
}
}
if(_524){
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
Binding.prototype.detachRecursive=function(_526){
if(_526==null){
_526=false;
}
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement,!_526);
};
Binding.prototype.addMember=function(_527){
if(!this.isAttached){
throw "Cannot add members to unattached binding";
}else{
if(!_527.isInitialized){
if(!this.memberDependencies){
this.memberDependencies={};
}
this.memberDependencies[_527.key]=false;
_527.registerDependentBinding(this);
}
}
return _527;
};
Binding.prototype.addMembers=function(_528){
while(_528.hasNext()){
var _529=_528.getNext();
if(!_529.isInitialized){
this.addMember(_529);
}
}
return _528;
};
Binding.prototype.registerDependentBinding=function(_52a){
if(!this.dependentBindings){
this.dependentBindings={};
}
this.dependentBindings[_52a.key]=_52a;
};
Binding.prototype._initializeBindingPersistanceFeatures=function(){
var _52b=this.getProperty("persist");
if(_52b&&Persistance.isEnabled){
var id=this.bindingElement.id;
if(!KeyMaster.hasKey(id)){
this._persist={};
var _52d=new List(_52b.split(" "));
while(_52d.hasNext()){
var prop=_52d.getNext();
var _52f=Persistance.getPersistedProperty(id,prop);
if(_52f!=null){
this._persist[prop]=_52f;
this.setProperty(prop,_52f);
}else{
_52f=this.getProperty(prop);
if(_52f!=null){
this._persist[prop]=_52f;
}
}
}
}else{
throw "Persistable bindings must have a specified ID.";
}
}
};
Binding.prototype._initializeBindingGeneralFeatures=function(){
var _530=this.getProperty("disabled");
var _531=this.getProperty("contextmenu");
var _532=this.getProperty("observes");
var _533=this.getProperty("onattach");
var _534=this.getProperty("hidden");
var _535=this.getProperty("blockactionevents");
if(_534==true&&this.isVisible==true){
this.hide();
}
if(_530&&this.logger!=null){
this.logger.error("The 'disabled' property has been renamed 'isdisbaled'");
}
if(_531){
this.setContextMenu(_531);
}
if(_532){
this.observe(this.getBindingForArgument(_532));
}
if(_535==true){
this.isBlockingActions=true;
}
if(this.isActivationAware==true){
var root=UserInterface.getBinding(this.bindingDocument.body);
root.makeActivationAware(this);
this._hasActivationAwareness=true;
}
if(_533!=null){
Binding.evaluate(_533,this);
}
};
Binding.prototype._initializeBindingDragAndDropFeatures=function(){
var _537=this.getProperty("draggable");
var _538=this.getProperty("dragtype");
var _539=this.getProperty("dragaccept");
var _53a=this.getProperty("dragreject");
if(_537!=null){
this.isDraggable=_537;
}
if(_538!=null){
this.dragType=_538;
if(_537!=false){
this.isDraggable=true;
}
}
if(_539!=null){
this.dragAccept=_539;
}
if(_53a!=null){
this.dragReject=_53a;
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
Binding.prototype._updateBindingMap=function(_53b){
try{
if(this.bindingWindow){
var id=this.bindingElement.id;
var map=this.bindingWindow.bindingMap;
var _53e=null;
if(_53b){
_53e=map[id];
if(_53e!=null&&_53e!=this){
var cry=this.toString()+" duplicate binding ID: "+id;
this.logger.error(cry);
if(Application.isDeveloperMode){
throw (cry);
}
}else{
map[id]=this;
}
}else{
_53e=map[id];
if(_53e!=null&&_53e==this){
delete map[id];
}
}
}else{
var _540=new String("Binding#_updateBindingMap odd dysfunction: "+this.toString()+": "+_53b);
if(Application.isDeveloperMode==true){
alert(_540);
}else{
this.logger.error(_540);
}
}
}
catch(exception){
this.logger.error(exception);
}
};
Binding.prototype.handleEvent=function(e){
};
Binding.prototype.handleAction=function(_542){
};
Binding.prototype.handleBroadcast=function(_543,arg){
};
Binding.prototype.handleElement=function(_545){
return false;
};
Binding.prototype.updateElement=function(_546){
return false;
};
Binding.prototype.getBindingForArgument=function(arg){
var _548=null;
switch(typeof arg){
case "object":
_548=arg;
break;
case "string":
_548=this.bindingDocument.getElementById(arg);
if(_548==null){
_548=Binding.evaluate(arg,this);
}
break;
}
if(_548!=null&&_548.nodeType!=null){
_548=UserInterface.getBinding(_548);
}
return _548;
};
Binding.prototype.serialize=function(){
var _549={};
var id=this.bindingElement.id;
if(id&&id!=this.key){
_549.id=id;
}
var _54b=this.getProperty("binding");
if(_54b){
_549.binding=_54b;
}
if(!BindingSerializer.includeShadowTreeBindings){
var _54c=this.getAncestorBindingByLocalName("*");
if(_54c){
if(_54c.isShadowBinding){
this.isShadowBinding=true;
_549=false;
}else{
var tree=_54c.shadowTree;
for(var key in tree){
var _54f=tree[key];
if(_54f==this){
this.isShadowBinding=true;
_549=false;
}
}
}
}
}
return _549;
};
Binding.prototype.serializeToString=function(_550){
var _551=null;
if(this.isAttached){
_551=new BindingSerializer().serializeBinding(this,_550);
}else{
throw "cannot serialize unattached binding";
}
return _551;
};
Binding.prototype.subTreeFromString=function(_552){
this.detachRecursive();
this.bindingElement.innerHTML=_552;
this.attachRecursive();
};
Binding.prototype.getProperty=function(_553){
var _554=this.bindingElement.getAttribute(_553);
if(_554){
_554=Types.castFromString(_554);
}
return _554;
};
Binding.prototype.setProperty=function(prop,_556){
if(_556!=null){
_556=_556.toString();
if(String(this.bindingElement.getAttribute(prop))!=_556){
this.bindingElement.setAttribute(prop,_556);
if(this.isAttached==true){
if(Persistance.isEnabled&&_556!=null){
if(this._persist!=null&&this._persist[prop]){
this._persist[prop]=_556;
Persistance.setPersistedProperty(this.bindingElement.id,prop,_556);
}
}
var _557=this.propertyMethodMap[prop];
if(_557){
_557.call(this,this.getProperty(prop));
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
var _559=null;
if(Binding.exists(this)){
_559=this.bindingElement.id;
}else{
SystemDebug.stack(arguments);
}
return _559;
};
Binding.prototype.attachClassName=function(_55a){
CSSUtil.attachClassName(this.bindingElement,_55a);
};
Binding.prototype.detachClassName=function(_55b){
CSSUtil.detachClassName(this.bindingElement,_55b);
};
Binding.prototype.hasClassName=function(_55c){
return CSSUtil.hasClassName(this.bindingElement,_55c);
};
Binding.prototype.addActionListener=function(type,_55e){
_55e=_55e!=null?_55e:this;
if(Action.isValid(type)){
if(Interfaces.isImplemented(IActionListener,_55e)){
if(!this.actionListeners[type]){
this.actionListeners[type]=[];
}
this.actionListeners[type].push(_55e);
}else{
throw new Error("Could not add action-event listener. Method handleAction not implemented.");
}
}else{
alert(this+"\nCould not add undefined Action ("+_55e+")");
}
};
Binding.prototype.removeActionListener=function(type,_560){
_560=_560?_560:this;
if(Action.isValid(type)){
var _561=this.actionListeners[type];
if(_561){
var i=0,_563;
while((_563=_561[i])!=null){
if(_563==_560){
_561.splice(i,1);
break;
}
i++;
}
}
}
};
Binding.prototype.addEventListener=function(type,_565){
_565=_565?_565:this;
DOMEvents.addEventListener(this.bindingElement,type,_565);
};
Binding.prototype.removeEventListener=function(type,_567){
_567=_567?_567:this;
DOMEvents.removeEventListener(this.bindingElement,type,_567);
};
Binding.prototype.subscribe=function(_568){
if(!this.hasSubscription(_568)){
this._subscriptions.set(_568,true);
EventBroadcaster.subscribe(_568,this);
}else{
this.logger.error("Dubplicate subscription aborted:"+_568);
}
};
Binding.prototype.unsubscribe=function(_569){
if(this.hasSubscription(_569)){
this._subscriptions.del(_569);
EventBroadcaster.unsubscribe(_569,this);
}
};
Binding.prototype.hasSubscription=function(_56a){
return this._subscriptions.has(_56a);
};
Binding.prototype.observe=function(_56b,_56c){
_56b.addObserver(this,_56c);
};
Binding.prototype.unObserve=function(_56d,_56e){
_56d.removeObserver(this,_56e);
};
Binding.prototype.setContextMenu=function(arg){
this.contextMenuBinding=this.getBindingForArgument(arg);
if(this.contextMenuBinding){
var self=this;
var menu=this.contextMenuBinding;
this.addEventListener(DOMEvents.CONTEXTMENU,{handleEvent:function(e){
if(Interfaces.isImplemented(IActionListener,self)==true){
var _573={handleAction:function(){
menu.removeActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.removeActionListener(PopupBinding.ACTION_HIDE,_573);
}};
menu.addActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.addActionListener(PopupBinding.ACTION_HIDE,_573);
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
var _575=null;
var _576=null;
var _577=false;
if(arg instanceof Action){
_575=arg;
}else{
if(Action.isValid(arg)){
_575=new Action(this,arg);
_577=true;
}
}
if(_575!=null&&Action.isValid(_575.type)==true){
if(_575.isConsumed==true){
_576=_575;
}else{
var _578=this.actionListeners[_575.type];
if(_578!=null){
_575.listener=this;
var i=0,_57a;
while((_57a=_578[i++])!=null){
if(_57a&&_57a.handleAction){
_57a.handleAction(_575);
}
}
}
var _57b=true;
if(this.isBlockingActions==true){
switch(_575.type){
case Binding.ACTION_FOCUSED:
case Binding.ACTION_BLURRED:
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FORCE_REFLEX:
case DockTabBinding.ACTION_UPDATE_VISUAL:
case PageBinding.ACTION_DOPOSTBACK:
break;
default:
if(!_577){
_57b=false;
}
break;
}
}
if(_57b){
_576=this.migrateAction(_575);
}else{
_576=_575;
}
}
}
return _576;
};
Binding.prototype.migrateAction=function(_57c){
var _57d=null;
var _57e=null;
var node=this.getMigrationParent();
if(node){
while(node&&!_57d&&node.nodeType!=Node.DOCUMENT_NODE){
_57d=UserInterface.getBinding(node);
node=node.parentNode;
}
if(_57d){
_57e=_57d.dispatchAction(_57c);
}else{
_57e=_57c;
}
}
return _57e;
};
Binding.prototype.reflex=function(_580){
if(Application.isOperational==true){
FlexBoxBinding.reflex(this,_580);
}
};
Binding.prototype.getMigrationParent=function(){
var _581=null;
if(true){
try{
var _582=this.bindingElement.parentNode;
if(_582!=null){
_581=_582;
}
}
catch(wtfException){
this.logger.error("Binding#getMigrationParent exception");
SystemDebug.stack(arguments);
_581=null;
}
}
return _581;
};
Binding.prototype.add=function(_583){
if(_583.bindingDocument==this.bindingDocument){
this.bindingElement.appendChild(_583.bindingElement);
}else{
throw "Could not add "+_583.toString()+" of different document origin.";
}
return _583;
};
Binding.prototype.addFirst=function(_584){
if(_584.bindingDocument==this.bindingDocument){
this.bindingElement.insertBefore(_584.bindingElement,this.bindingElement.firstChild);
}else{
throw "Could not add "+_584.toString()+" of different document origin.";
}
return _584;
};
Binding.prototype.getAncestorBindingByLocalName=function(_585,_586){
return BindingFinder.getAncestorBindingByLocalName(this,_585,_586);
};
Binding.prototype.getAncestorBindingByType=function(impl,_588){
return BindingFinder.getAncestorBindingByType(this,impl,_588);
};
Binding.prototype.getChildBindingByType=function(impl){
return BindingFinder.getChildBindingByType(this,impl);
};
Binding.prototype.getChildElementsByLocalName=function(_58a){
return BindingFinder.getChildElementsByLocalName(this,_58a);
};
Binding.prototype.getChildElementByLocalName=function(_58b){
return this.getChildElementsByLocalName(_58b).getFirst();
};
Binding.prototype.getDescendantElementsByLocalName=function(_58c){
return new List(DOMUtil.getElementsByTagName(this.bindingElement,_58c));
};
Binding.prototype.getChildBindingsByLocalName=function(_58d){
return this.getDescendantBindingsByLocalName(_58d,true);
};
Binding.prototype.getChildBindingByLocalName=function(_58e){
return this.getChildBindingsByLocalName(_58e).getFirst();
};
Binding.prototype.getDescendantBindingsByLocalName=function(_58f,_590){
return BindingFinder.getDescendantBindingsByLocalName(this,_58f,_590);
};
Binding.prototype.getDescendantBindingByLocalName=function(_591){
return this.getDescendantBindingsByLocalName(_591,false).getFirst();
};
Binding.prototype.getDescendantBindingsByType=function(impl){
return BindingFinder.getDescendantBindingsByType(this,impl);
};
Binding.prototype.getDescendantBindingByType=function(impl){
return BindingFinder.getDescendantBindingByType(this,impl);
};
Binding.prototype.getNextBindingByLocalName=function(_594){
return BindingFinder.getNextBindingByLocalName(this,_594);
};
Binding.prototype.getPreviousBindingByLocalName=function(_595){
return BindingFinder.getPreviousBindingByLocalName(this,_595);
};
Binding.prototype.getBindingElement=function(){
return this.bindingDocument.getElementById(this.bindingElement.id);
};
Binding.prototype.getOrdinalPosition=function(_596){
return DOMUtil.getOrdinalPosition(this.bindingElement,_596);
};
Binding.prototype.isFirstBinding=function(_597){
return (this.getOrdinalPosition(_597)==0);
};
Binding.prototype.isLastBinding=function(_598){
return DOMUtil.isLastElement(this.bindingElement,_598);
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
Binding.prototype.setCallBackArg=function(_59a){
this.setProperty(Binding.CALLBACKARG,_59a);
};
Binding.prototype.dispose=function(_59b){
if(!this.isDisposed){
if(!_59b){
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement);
var _59c=this.bindingDocument.getElementById(this.bindingElement.id);
if(_59c){
if(Client.isExplorer){
_59c.outerHTML="";
}else{
_59c.parentNode.removeChild(_59c);
}
}
}else{
if(this._subscriptions.hasEntries()){
var self=this;
var list=new List();
this._subscriptions.each(function(_59f){
list.add(_59f);
});
list.each(function(_5a0){
self.unsubscribe(_5a0);
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
Binding.prototype.wakeUp=function(_5a2,_5a3){
_5a3=_5a3?_5a3:Binding.SNOOZE;
if(this.isLazy==true){
this.deleteProperty("lazy");
this.isLazy=false;
Application.lock(this);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
var self=this;
setTimeout(function(){
self.attachRecursive();
setTimeout(function(){
if(_5a2!==undefined){
self[_5a2]();
}
LazyBindingBinding.wakeUp(self);
Application.unlock(self);
},_5a3);
},0);
}
};
Binding.prototype.handleCrawler=function(_5a5){
if(_5a5.response==null&&this.isLazy==true){
if(_5a5.id==DocumentCrawler.ID&&_5a5.mode==DocumentCrawler.MODE_REGISTER){
_5a5.response=NodeCrawler.NORMAL;
}else{
_5a5.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5a5.response==null&&this.crawlerFilters!=null){
if(this.crawlerFilters.has(_5a5.id)){
_5a5.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5a5.response==null){
switch(_5a5.id){
case FlexBoxCrawler.ID:
case FocusCrawler.ID:
if(!this.isVisible){
_5a5.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
}
};
Binding.newInstance=function(_5a6){
var _5a7=DOMUtil.createElementNS(Constants.NS_UI,"ui:binding",_5a6);
return UserInterface.registerBinding(_5a7,Binding);
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
var _5a8=new List(ConfigurationService.GetValidatingRegularExpressions("dummy"));
_5a8.each(function(_5a9){
DataBinding.expressions[_5a9.Key]=new RegExp(_5a9.Value);
});
}});
DataBinding.expressions={};
DataBinding.warnings={"required":"Required","number":"Numbers only","integer":"Integers only","programmingidentifier":"Invalid identifier","programmingnamespace":"Invalid namespace","url":"Invalid URL","minlength":"${count} characters minimum","maxlength":"${count} characters maximum","currency":"Invalid notation","email":"Invalid e-mail","guid":"Invalid GUID"};
DataBinding.errors={"programmingidentifier":"An identifier must not contain spaces or special characters. Only characters a-z, A-Z and 0-9 are allowed. An identifier must begin with a letter (not a number).","programmingnamespace":"A namespace must take the form Example.Name.Space where only characters a-z, A-Z, 0-9 and dots (.) are allowed. Each part of the namespace must begin with a letter (not a number).","url":"A valid URL must begin with a forward slash, designating the site root, or an URL scheme name such as http://. Simpliefied addresses such as www.example.com cannot be resolved reliably by the browser. Relative URLs are not supported."};
DataBinding.getAssociatedLabel=function(_5aa){
var _5ab=null;
var _5ac=_5aa.getAncestorBindingByLocalName("field");
if(_5ac&&_5ac instanceof FieldBinding){
var desc=_5ac.getDescendantBindingByLocalName("fielddesc");
if(desc&&desc instanceof FieldDescBinding){
_5ab=desc.getLabel();
}
}
return _5ab;
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
var _5af=this.bindingWindow.DataManager;
_5af.unRegisterDataBinding(this._name);
};
DataBinding.prototype.setName=function(name){
var _5b1=this.bindingWindow.DataManager;
if(_5b1.getDataBinding(name)){
_5b1.unRegisterDataBinding(name);
}
_5b1.registerDataBinding(name,this);
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
RootBinding.prototype.handleBroadcast=function(_5b2,arg){
RootBinding.superclass.handleBroadcast.call(this,_5b2,arg);
var _5b4=this.bindingWindow.WindowManager.WINDOW_EVALUATED_BROADCAST;
switch(_5b2){
case _5b4:
this.dispatchAction(RootBinding.ACTION_PHASE_1);
this.dispatchAction(RootBinding.ACTION_PHASE_2);
this.dispatchAction(RootBinding.ACTION_PHASE_3);
this.unsubscribe(_5b4);
break;
}
};
RootBinding.prototype.onActivate=function(){
this._onActivationChanged(true);
};
RootBinding.prototype.onDeactivate=function(){
this._onActivationChanged(false);
};
RootBinding.prototype._onActivationChanged=function(_5b5){
var _5b6=_5b5?RootBinding.ACTION_ACTIVATED:RootBinding.ACTION_DEACTIVATED;
if(_5b5!=this.isActivated){
this.isActivated=_5b5;
this.dispatchAction(_5b6);
var _5b7=new List();
var self=this;
this._activationawares.each(function(_5b9){
if(_5b9.isActivationAware){
try{
if(_5b5){
if(!_5b9.isActivated){
_5b9.onActivate();
}
}else{
if(_5b9.isActivated){
_5b9.onDeactivate();
}
}
}
catch(exception){
self.logger.error(exception);
_5b7.add(_5b9);
}
}
});
_5b7.each(function(_5ba){
this._activationawares.del(_5ba);
});
_5b7.dispose();
}else{
var _5bb="Activation dysfunction: "+this.bindingDocument.title;
if(Application.isDeveloperMode==true){
this.logger.error(_5bb);
}else{
this.logger.error(_5bb);
}
}
};
RootBinding.prototype.makeActivationAware=function(_5bc,_5bd){
if(Interfaces.isImplemented(IActivationAware,_5bc,true)==true){
if(_5bd==false){
this._activationawares.del(_5bc);
}else{
this._activationawares.add(_5bc);
if(this.isActivated==true){
_5bc.onActivate();
}
}
}else{
if(Application.isDeveloperMode==true){
alert("RootBinding: IActivationAware not implemented ("+_5bc+")");
}
}
};
RootBinding.prototype._setupActivationAwareness=function(_5be){
var _5bf=this.getMigrationParent();
if(_5bf!=null){
var root=_5bf.ownerDocument.body;
var _5c1=UserInterface.getBinding(root);
if(_5c1!=null){
_5c1.makeActivationAware(this,_5be);
}
}
};
RootBinding.prototype.handleCrawler=function(_5c2){
RootBinding.superclass.handleCrawler.call(this,_5c2);
if(_5c2.type==NodeCrawler.TYPE_ASCENDING){
_5c2.nextNode=this.bindingWindow.frameElement;
}
};
RootBinding.prototype.getMigrationParent=function(){
var _5c3=null;
if(this.bindingWindow.parent){
_5c3=this.bindingWindow.frameElement;
}
return _5c3;
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
var _5c4=new List(DOMUtil.getElementsByTagName(this.bindingElement,"td"));
while(_5c4.hasNext()){
var cell=_5c4.getNext();
this.shadowTree[cell.className]=cell;
}
};
MatrixBinding.prototype.add=function(_5c6){
var _5c7=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
this.shadowTree[MatrixBinding.CENTER].appendChild(_5c6.bindingElement);
_5c7=_5c6;
}else{
_5c7=MatrixBinding.superclass.add.call(this,_5c6);
}
return _5c7;
};
MatrixBinding.prototype.addFirst=function(_5c8){
var _5c9=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
var _5ca=this.shadowTree[MatrixBinding.CENTER];
_5ca.insertBefore(_5c8.bindingElement,_5ca.firstChild);
_5c9=_5c8;
}else{
_5c9=MatrixBinding.superclass.addFirst.call(this,_5c8);
}
return _5c8;
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
MatrixBinding.newInstance=function(_5cc){
var _5cd=DOMUtil.createElementNS(Constants.NS_UI,"ui:matrix",_5cc);
return UserInterface.registerBinding(_5cd,MatrixBinding);
};
FlexBoxBinding.prototype=new Binding;
FlexBoxBinding.prototype.constructor=FlexBoxBinding;
FlexBoxBinding.superclass=Binding.prototype;
FlexBoxBinding.CLASSNAME="flexboxelement";
FlexBoxBinding.TIMEOUT=250;
FlexBoxBinding.reflex=function(_5ce,_5cf){
var list=new List();
var _5d1=new FlexBoxCrawler();
_5d1.mode=_5cf?FlexBoxCrawler.MODE_FORCE:FlexBoxCrawler.MODE_NORMAL;
_5d1.startBinding=_5ce;
_5d1.crawl(_5ce.bindingElement,list);
list.each(function(_5d2){
_5d2.flex();
});
if(Client.isExplorer){
setTimeout(function(){
list.each(function(_5d3){
if(Binding.exists(_5d3)){
_5d3.flex();
}
});
},0.5*FlexBoxBinding.TIMEOUT);
}
setTimeout(function(){
list.each(function(_5d4){
if(Binding.exists(_5d4)){
_5d4.isFlexSuspended=false;
}
});
list.dispose();
},FlexBoxBinding.TIMEOUT);
_5d1.dispose();
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
FlexBoxBinding.prototype.handleAction=function(_5d5){
FlexBoxBinding.superclass.handleAction.call(this,_5d5);
switch(_5d5.type){
case Binding.ACTION_UPDATED:
this.isFit=false;
break;
}
};
FlexBoxBinding.prototype._getSiblingsSpan=function(_5d6){
var _5d7=0;
var _5d8=new List(this.bindingElement.parentNode.childNodes);
while(_5d8.hasNext()){
var _5d9=_5d8.getNext();
if(_5d9.nodeType==Node.ELEMENT_NODE&&_5d9!=this.bindingElement){
if(!this._isOutOfFlow(_5d9)){
var rect=_5d9.getBoundingClientRect();
if(_5d6){
height+=(rect.right-rect.left);
}else{
_5d7+=(rect.bottom-rect.top);
}
}
}
}
return _5d7;
};
FlexBoxBinding.prototype._isOutOfFlow=function(_5db){
var _5dc=CSSComputer.getPosition(_5db);
var _5dd=CSSComputer.getFloat(_5db);
return (_5dc=="absolute"||_5dd!="none"?true:false);
};
FlexBoxBinding.prototype._getCalculatedHeight=function(){
var _5de=this.bindingElement.parentNode;
var rect=_5de.getBoundingClientRect();
var _5e0=rect.bottom-rect.top;
var _5e1=CSSComputer.getPadding(_5de);
var _5e2=CSSComputer.getBorder(_5de);
_5e0-=(_5e1.top+_5e1.bottom);
_5e0-=(_5e2.top+_5e2.bottom);
return _5e0;
};
FlexBoxBinding.prototype._getCalculatedWidth=function(){
var _5e3=this.bindingElement.parentNode;
var rect=_5e3.getBoundingClientRect();
var _5e5=rect.right-rect.left;
var _5e6=CSSComputer.getPadding(_5e3);
var _5e7=CSSComputer.getBorder(_5e3);
_5e5-=(_5e6.left+_5e6.right);
_5e5-=(_5e7.left+_5e7.right);
return _5e5;
};
FlexBoxBinding.prototype.setFlexibility=function(_5e8){
if(_5e8!=this.isFlexible){
if(_5e8){
this.attachClassName(FlexBoxBinding.CLASSNAME);
this.deleteProperty("flex");
}else{
this.detachClassName(FlexBoxBinding.CLASSNAME);
this.setProperty("flex",false);
}
this.isFlexible=_5e8;
}
};
FlexBoxBinding.prototype.flex=function(){
if(Binding.exists(this)){
if(this.isFlexible==true){
var _5e9=this._getSiblingsSpan();
_5e9=this._getCalculatedHeight()-_5e9;
if(!isNaN(_5e9)&&_5e9>=0){
if(_5e9!=this.bindingElement.offsetHeight){
this.bindingElement.style.height=String(_5e9)+"px";
}
}
}
}
};
FlexBoxBinding.prototype.fit=function(_5ea){
if(!this.isFit||_5ea){
var _5eb=0;
new List(this.bindingElement.childNodes).each(function(_5ec){
if(_5ec.nodeType==Node.ELEMENT_NODE){
if(!this._isOutOfFlow(_5ec)){
var rect=_5ec.getBoundingClientRect();
_5eb+=(rect.bottom-rect.top);
}
}
},this);
this._setFitnessHeight(_5eb);
this.isFit=true;
}
};
FlexBoxBinding.prototype._setFitnessHeight=function(_5ee){
var _5ef=CSSComputer.getPadding(this.bindingElement);
var _5f0=CSSComputer.getBorder(this.bindingElement);
_5ee+=_5ef.top+_5ef.bottom;
_5ee+=_5f0.top+_5f0.bottom;
this.bindingElement.style.height=_5ee+"px";
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
ScrollBoxBinding.prototype.handleAction=function(_5f1){
ScrollBoxBinding.superclass.handleAction.call(this,_5f1);
switch(_5f1.type){
case BalloonBinding.ACTION_INITIALIZE:
_5f1.consume();
break;
}
};
ScrollBoxBinding.prototype.setPosition=function(_5f2){
this.bindingElement.scrollLeft=_5f2.x;
this.bindingElement.scrollTop=_5f2.y;
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
var _5f3=this._getBuildElement("labeltext");
if(_5f3){
this.shadowTree.labelText=_5f3;
this.shadowTree.text=_5f3.firstChild;
this.hasLabel=true;
}
}else{
var _5f4=this.getProperty("label");
var _5f5=this.getProperty("image");
var _5f6=this.getProperty("tooltip");
if(_5f4){
this.setLabel(_5f4,false);
}
if(_5f5){
this.setImage(_5f5,false);
}
if(_5f6){
this.setToolTip(_5f6);
}
this.buildClassName();
}
};
LabelBinding.prototype.setLabel=function(_5f7,_5f8){
_5f7=_5f7?_5f7:"";
if(!this.hasLabel){
this.buildLabel();
}
this.shadowTree.text.data=Resolver.resolve(_5f7);
this.setProperty("label",_5f7);
if(!_5f8){
this.buildClassName();
}
};
LabelBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
LabelBinding.prototype.setImage=function(url,_5fa){
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
if(!_5fa){
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
LabelBinding.prototype.setToolTip=function(_5fd){
this.setProperty("tooltip",_5fd);
if(_5fd!=this.getLabel()){
this.setProperty("title",Resolver.resolve(_5fd));
}
};
LabelBinding.prototype.getToolTip=function(_5fe){
return this.getProperty("tooltip");
};
LabelBinding.prototype.flip=function(_5ff){
_5ff=_5ff==null?true:_5ff;
var _600=LabelBinding.CLASSNAME_FLIPPED;
if(!Client.isExplorer6){
this.isFlipped=_5ff;
if(_5ff){
this.attachClassName(_600);
}else{
this.detachClassName(_600);
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
var _601="textonly";
var _602="imageonly";
var _603="both";
if(this.hasLabel&&this.hasImage){
this.detachClassName(_601);
this.detachClassName(_602);
this.attachClassName(_603);
}else{
if(this.hasLabel){
this.detachClassName(_603);
this.detachClassName(_602);
this.attachClassName(_601);
}else{
if(this.hasImage){
this.detachClassName(_603);
this.detachClassName(_601);
this.attachClassName(_602);
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
LabelBinding.newInstance=function(_604){
var _605=DOMUtil.createElementNS(Constants.NS_UI,"ui:labelbox",_604);
return UserInterface.registerBinding(_605,LabelBinding);
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
var _606=this.getProperty("label");
if(!_606){
_606=DOMUtil.getTextContent(this.bindingElement);
}
var text=this.bindingDocument.createTextNode(Resolver.resolve(_606));
this.bindingElement.parentNode.replaceChild(text,this.bindingElement);
this.dispose();
};
TextBinding.prototype.setLabel=function(_608){
this.setProperty("label",_608);
};
TextBinding.newInstance=function(_609){
var _60a=DOMUtil.createElementNS(Constants.NS_UI,"ui:text",_609);
return UserInterface.registerBinding(_60a,TextBinding);
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
BroadcasterBinding.prototype.setProperty=function(_60b,_60c){
BroadcasterBinding.superclass.setProperty.call(this,_60b,_60c);
function update(list){
if(list){
list.each(function(_60e){
_60e.setProperty(_60b,_60c);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _60f=this._observers[_60b];
if(_60f){
update(_60f);
}
};
BroadcasterBinding.prototype.deleteProperty=function(_610){
BroadcasterBinding.superclass.deleteProperty.call(this,_610);
function update(list){
if(list){
list.each(function(_612){
_612.deleteProperty(_610);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _613=this._observers[_610];
if(_613){
update(_613);
}
};
BroadcasterBinding.prototype.addObserver=function(_614,_615){
_615=_615?_615:"*";
_615=new List(_615.split(" "));
while(_615.hasNext()){
var _616=_615.getNext();
switch(_616){
case "*":
this._setAllProperties(_614);
break;
default:
var _617=this.getProperty(_616);
_614.setProperty(_616,_617);
break;
}
if(!this._observers[_616]){
this._observers[_616]=new List();
}
this._observers[_616].add(_614);
}
};
BroadcasterBinding.prototype._setAllProperties=function(_618){
var atts=new List(this.bindingElement.attributes);
while(atts.hasNext()){
var att=atts.getNext();
if(att.specified){
var _61b=att.nodeName;
switch(_61b){
case "id":
case "key":
break;
default:
var _61c=this.getProperty(_61b);
_618.setProperty(_61b,_61c);
break;
}
}
}
};
BroadcasterBinding.prototype.removeObserver=function(_61d,_61e){
_61e=_61e?_61e:"*";
_61e=new List(_61e.split(" "));
while(_61e.hasNext()){
var list=this._observers[_61e.getNext()];
if(list){
while(list.hasNext()){
var _620=list.getNext();
if(_620==_61d){
list.del(_620);
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
BroadcasterBinding.prototype.setDisabled=function(_621){
this.setProperty("isdisabled",_621);
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
var _623=this.getProperty("width");
var _624=this.getProperty("label");
var type=this.getProperty("type");
var _626=this.getProperty("popup");
var _627=this.getProperty("tooltip");
var _628=this.getProperty("isdisabled");
var _629=this.getProperty("response");
var _62a=this.getProperty("oncommand");
var _62b=this.getProperty("value");
var _62c=this.getProperty("ischecked");
var _62d=this.getProperty("callbackid");
var _62e=this.getProperty("focusable");
var _62f=this.getProperty("focused");
var _630=this.getProperty("default");
var url=this.getProperty("url");
var _632=this.getProperty("flip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.add(this.labelBinding);
this.labelBinding.attach();
this.shadowTree.labelBinding=this.labelBinding;
if(_632){
this.flip(true);
}
if(!this._stateManager){
this._stateManager=new ButtonStateManager(this);
}
if(this.imageProfile!=null&&this.imageProfile.getDefaultImage()!=null){
this.setImage(this.imageProfile.getDefaultImage());
}
if(_624!=null){
this.setLabel(_624);
}
if(type!=null){
this.setType(type);
}
if(_627!=null){
this.setToolTip(_627);
}
if(_623!=null){
this.setWidth(_623);
}
if(_626!=null){
this.setPopup(_626);
}
if(_629!=null){
this.response=_629;
}
if(_62c==true){
if(this.isCheckButton||this.isRadioButton){
this.check(true);
}
}
if(_62a!=null&&this.oncommand==null){
this.oncommand=function(){
Binding.evaluate(_62a,this);
};
}
if(_62e||this.isFocusable){
this._makeFocusable();
if(_630||this.isDefault){
this.isDefault=true;
}
if(_62f){
this.focus();
}
}
if(_628==true){
this.disable();
}
if(url!=null){
this.setURL(url);
}
if(_62d!=null){
this.bindingWindow.DataManager.registerDataBinding(_62d,this);
if(_62b!=null){
Binding.dotnetify(this,_62b);
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
ButtonBinding.prototype.setImage=function(_633){
if(this.isAttached){
this.labelBinding.setImage(_633);
}
this.setProperty("image",_633);
};
ButtonBinding.prototype.getImage=function(){
return this.getProperty("image");
};
ButtonBinding.prototype.setLabel=function(_634){
if(this.isAttached){
this.labelBinding.setLabel(_634);
}
this.setProperty("label",_634);
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
ButtonBinding.prototype.setToolTip=function(_636){
this.setProperty("tooltip",_636);
if(this.isAttached==true){
this.setProperty("title",Resolver.resolve(_636));
}
};
ButtonBinding.prototype.getToolTip=function(){
return this.getProperty("tooltip");
};
ButtonBinding.prototype.setImageProfile=function(_637){
this.imageProfile=new _637(this);
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
ButtonBinding.prototype.flip=function(_63c){
_63c=_63c==null?true:_63c;
this.isFlipped=_63c;
this.setProperty("flip",_63c);
if(this.isAttached){
this.labelBinding.flip(_63c);
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
ButtonBinding.prototype.check=function(_63d){
if((this.isCheckButton||this.isRadioButton)&&!this.isChecked){
if(this.isAttached==true){
this._check();
if(!_63d==true){
this.fireCommand();
}
}
this.setProperty("ischecked",true);
}
};
ButtonBinding.prototype._check=function(_63e){
this.isActive=true;
this.isChecked=true;
if(!_63e){
this._stateManager.invokeActiveState();
}
};
ButtonBinding.prototype.uncheck=function(_63f){
if((this.isCheckButton||this.isRadioButton)&&this.isChecked){
if(this.isAttached==true){
this._uncheck();
if(!_63f==true){
this.fireCommand();
}
}
this.setProperty("ischecked",false);
}
};
ButtonBinding.prototype._uncheck=function(_640){
this.isActive=false;
this.isChecked=false;
if(!_640){
this._stateManager.invokeNormalState();
}
};
ButtonBinding.prototype.setChecked=function(_641,_642){
if(_641==null){
_641==false;
}
if(this.isCheckButton||this.isRadioButton){
switch(_641){
case true:
this.check(_642);
break;
case false:
this.uncheck(_642);
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
var _644=this.getProperty("tooltip");
if(_644){
this.setToolTip(_644);
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
var _645=null;
if(this.isAttached==true){
this.labelBinding.bindingElement.style.marginLeft="0";
this.labelBinding.bindingElement.style.marginRight="0";
_645=this.labelBinding.bindingElement.offsetWidth;
}else{
throw "ButtonBinding: getEqualSizeWidth failed for non-attached button.";
}
return _645;
};
ButtonBinding.prototype.setEqualSizeWidth=function(goal){
if(this.isAttached==true){
var _647=this.getEqualSizeWidth();
if(goal>_647){
var diff=goal-_647;
var marg=Math.floor(diff*0.5);
this.labelBinding.bindingElement.style.marginLeft=marg+"px";
this.labelBinding.bindingElement.style.marginRight=marg+"px";
}
}
};
ButtonBinding.prototype.getWidth=function(){
var _64a=null;
if(this.isAttached==true){
var _64b=CSSComputer.getPadding(this.bindingElement);
var _64c=CSSComputer.getPadding(this.bindingElement);
_64a=this.shadowTree.c.offsetWidth+this.shadowTree.e.offsetWidth+this.shadowTree.w.offsetWidth;
_64a=_64a+_64b.left+_64b.right;
_64a=_64a+_64c.left+_64c.right;
}else{
throw "ButtonBinding: getWidth failed for non-attached button.";
}
return _64a;
};
ButtonBinding.prototype.setWidth=function(_64d){
if(this.isAttached==true){
var _64e=this.shadowTree.e.offsetWidth+this.shadowTree.w.offsetWidth;
var _64f=CSSComputer.getPadding(this.shadowTree.c);
var _650=_64d-_64e;
_650=_650-_64f.left-_64f.right;
this.shadowTree.c.style.width=String(_650)+"px";
if(this.getProperty("centered")){
this.labelBinding.bindingElement.style.marginLeft=String(0.5*(_650-this.labelBinding.bindingElement.offsetWidth))+"px";
}
}
this.setProperty("width",_64d);
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
ButtonBinding.prototype.setValue=function(_651){
this.shadowTree.dotnetinput.value=_651;
};
ButtonBinding.prototype.getResult=function(){
return this.getValue();
};
ButtonBinding.prototype.setResult=function(_652){
this.setValue(_652);
};
ButtonStateManager.STATE_NORMAL=0;
ButtonStateManager.STATE_HOVER=1;
ButtonStateManager.STATE_ACTIVE=2;
ButtonStateManager.RIGHT_BUTTON=2;
function ButtonStateManager(_653){
this.logger=SystemLogger.getLogger("ButtonStateManager");
this.binding=_653;
this.imageProfile=_653.imageProfile;
this.assignDOMEvents(true);
}
ButtonStateManager.prototype.assignDOMEvents=function(_654){
var _655=_654?"addEventListener":"removeEventListener";
this.binding[_655](DOMEvents.MOUSEENTER,this);
this.binding[_655](DOMEvents.MOUSELEAVE,this);
this.binding[_655](DOMEvents.MOUSEDOWN,this);
this.binding[_655](DOMEvents.MOUSEUP,this);
};
ButtonStateManager.prototype.dispose=function(){
this.assignDOMEvents(false);
this.binding=null;
this.imageProfile=null;
};
ButtonStateManager.prototype.handleEvent=function(e){
if(Binding.exists(this.binding)&&!this.binding.isDisabled&&!BindingDragger.isDragging){
var _657=false,_658=null;
if(e.button==ButtonStateManager.RIGHT_BUTTON){
}else{
if(this.binding.isCheckBox){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_658=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_658=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_658=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSEUP:
this.binding.isChecked=!this.binding.isChecked;
_658=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_658==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_657=true;
break;
}
}else{
if(this.binding.isCheckButton||this.binding.isRadioButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
if(!this.binding.isChecked){
_658=ButtonStateManager.STATE_HOVER;
}
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
if(!this.binding.isChecked){
_658=ButtonStateManager.STATE_NORMAL;
}
break;
case DOMEvents.MOUSEDOWN:
_658=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
if(this.binding.isCheckButton||!this.binding.isChecked){
this.binding.isChecked=!this.binding.isChecked;
_658=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_658==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_657=true;
}
break;
}
}else{
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_658=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_658=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_658=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_658=ButtonStateManager.STATE_NORMAL;
_657=true;
break;
}
}
}
}
switch(_658){
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
if(_657){
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
var _65c=this.imageProfile.getDisabledImage();
if(_65c){
this.binding.setImage(_65c);
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
ClickButtonBinding.newInstance=function(_65d){
var _65e=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_65d);
return UserInterface.registerBinding(_65e,ClickButtonBinding);
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
RadioButtonBinding.newInstance=function(_65f){
var _660=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiobutton",_65f);
return UserInterface.registerBinding(_660,RadioButtonBinding);
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
CheckButtonBinding.newInstance=function(_661){
var _662=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbutton",_661);
return UserInterface.registerBinding(_662,CheckButtonBinding);
};
CheckButtonImageProfile.IMG_DEFAULT="${skin}/buttons/checkbutton-default.png";
CheckButtonImageProfile.IMG_HOVER="${skin}/buttons/checkbutton-hover.png";
CheckButtonImageProfile.IMG_ACTIVE="${skin}/buttons/checkbutton-active.png";
CheckButtonImageProfile.IMG_ACTIVE_HOVER="${skin}/buttons/checkbutton-active-hover.png";
CheckButtonImageProfile.IMG_DISABLED=null;
CheckButtonImageProfile.IMG_DISABLED_ON=null;
function CheckButtonImageProfile(_663){
this._binding=_663;
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
var _664=this.getDescendantBindingsByLocalName("control");
_664.each(function(_665){
_665.setControlType(_665.controlType);
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
ControlGroupBinding.newInstance=function(_667){
var _668=DOMUtil.createElementNS(Constants.NS_UI,"ui:controlgroup",_667);
return UserInterface.registerBinding(_668,ControlGroupBinding);
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
ControlBinding.prototype.handleAction=function(_66b){
ControlBinding.superclass.handleAction.call(this,_66b);
switch(_66b.type){
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
function ControlImageProfile(_66c){
this.binding=_66c;
}
ControlImageProfile.prototype._getImage=function(_66d){
var _66e=null;
switch(this.binding.controlType){
case ControlBinding.TYPE_MINIMIZE:
_66e=this.constructor.IMAGE_MINIMIZE;
break;
case ControlBinding.TYPE_MAXIMIZE:
_66e=this.constructor.IMAGE_MAXIMIZE;
break;
case ControlBinding.TYPE_UNMAXIMIZE:
case ControlBinding.TYPE_UNMINIMIZE:
_66e=this.constructor.IMAGE_RESTORE;
break;
case ControlBinding.TYPE_CLOSE:
_66e=this.constructor.IMAGE_CLOSE;
break;
}
return _66e.replace("${string}",_66d);
};
ControlImageProfile.prototype.getDefaultImage=function(){
var _66f=true;
if(this.binding.isGhostable&&this.binding.containingControlBoxBinding){
_66f=this.binding.containingControlBoxBinding.isActive?true:false;
}
return _66f?this._getImage("default"):this._getImage("ghosted");
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
ControlBoxBinding.prototype.handleAction=function(_670){
ControlBoxBinding.superclass.handleAction.call(this,_670);
switch(_670.type){
case ControlBinding.ACTION_COMMAND:
var _671=_670.target;
Application.lock(this);
var self=this;
setTimeout(function(){
self.handleInvokedControl(_671);
Application.unlock(self);
},0);
_670.consume();
break;
}
};
ControlBoxBinding.prototype.handleInvokedControl=function(_673){
switch(_673.controlType){
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
ControlBoxBinding.prototype.setState=function(_674){
var _675=this.getState();
this.setProperty("state",_674);
this.detachClassName(_675);
this.attachClassName(_674);
this.dispatchAction(ControlBoxBinding.ACTION_STATECHANGE);
};
ControlBoxBinding.prototype.getState=function(){
var _676=this.getProperty("state");
if(!_676){
_676=ControlBoxBinding.STATE_NORMAL;
}
return _676;
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
MenuContainerBinding.prototype.isOpen=function(_677){
var _678=null;
if(!_677){
_678=this._isOpen;
}else{
_678=(_677==this._openElement);
}
return _678;
};
MenuContainerBinding.prototype.setOpenElement=function(_679){
if(_679){
if(this._openElement){
this._openElement.hide();
}
this._openElement=_679;
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
var _67a=this.getChildBindingByLocalName("menupopup");
if(_67a&&_67a!=this.menuPopupBinding){
this.menuPopupBinding=_67a;
this.menuPopupBinding.addActionListener(PopupBinding.ACTION_HIDE,this);
}
return this.menuPopupBinding;
};
MenuContainerBinding.prototype.show=function(){
var _67b=this.getMenuContainerBinding();
_67b.setOpenElement(this);
var _67c=this.getMenuPopupBinding();
_67c.snapTo(this.bindingElement);
_67c.show();
};
MenuContainerBinding.prototype.hide=function(){
this.reset();
this.getMenuPopupBinding().hide();
if(this._isOpen){
this._openElement.hide();
}
};
MenuContainerBinding.prototype.reset=Binding.ABSTRACT_METHOD;
MenuContainerBinding.prototype.handleAction=function(_67d){
MenuContainerBinding.superclass.handleAction.call(this,_67d);
if(_67d.type==PopupBinding.ACTION_HIDE){
var _67e=this.getMenuContainerBinding();
_67e.setOpenElement(false);
this.reset();
_67d.consume();
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
MenuBarBinding.prototype.handleAction=function(_67f){
MenuBarBinding.superclass.handleAction.call(this,_67f);
switch(_67f.type){
case MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY:
var _680=_67f.target;
var _681=this.getChildBindingsByLocalName("menu");
while(_681.hasNext()){
var menu=_681.getNext();
}
switch(_680.arrowKey){
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
var _683=this.getProperty("image");
var _684=this.getProperty("label");
var _685=this.getProperty("tooltip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menulabel");
this.add(this.labelBinding);
if(_684){
this.setLabel(_684);
}
if(_683){
this.setImage(_683);
}
if(_685){
this.setToolTip(_685);
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
MenuBinding.prototype.setLabel=function(_687){
this.setProperty("label",_687);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_687));
}
};
MenuBinding.prototype.setToolTip=function(_688){
this.setProperty("tooltip",_688);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_688));
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
var _68a=this.getMenuContainerBinding();
if(!BindingDragger.isDragging){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(_68a.isOpen(this)){
DOMEvents.stopPropagation(e);
}
break;
case DOMEvents.MOUSEOVER:
if(_68a.isOpen()&&!_68a.isOpen(this)){
this.show();
this.menuPopupBinding.grabKeyboard();
}
this.attachClassName("hover");
this.isFocused=true;
break;
case DOMEvents.MOUSEOUT:
if(!_68a.isOpen()){
this.hide();
}
this.isFocused=false;
break;
case DOMEvents.MOUSEUP:
if(!_68a.isOpen(this)){
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
MenuBodyBinding.handleBroadcast=function(_68b,arg){
var body=MenuBodyBinding.activeInstance;
var key=arg;
if(body){
switch(_68b){
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
this.addActionListener(MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY,{handleAction:function(_690){
switch(_690.target){
case self:
self.releaseKeyboard();
self._containingPopupBinding.hide();
break;
default:
var _691=null;
var _692=true;
self._lastFocused.focus();
self.grabKeyboard();
_690.consume();
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
MenuBodyBinding.prototype.handleFocusedItem=function(_694){
for(var key in this._focused){
if(key!=_694.key){
var item=this._focused[key];
item.blur();
}
}
this._focused[_694.key]=_694;
this._lastFocused=_694;
if(MenuBodyBinding.activeInstance!=this){
this.grabKeyboard();
}
};
MenuBodyBinding.prototype.handleBlurredItem=function(_697){
delete this._focused[_697.key];
};
MenuBodyBinding.prototype.resetFocusedItems=function(_698){
for(var key in this._focused){
var item=this._focused[key];
item.blur(_698);
}
if(_698){
this._lastFocused=null;
}
};
MenuBodyBinding.prototype.refreshMenuGroups=function(){
if(!this.isAttached){
throw "refreshMenuGroups: MenuBodyBinding not attached!";
}else{
var _69b=this.getChildBindingsByLocalName("menugroup");
var _69c=null;
var _69d=null;
while(_69b.hasNext()){
var _69e=_69b.getNext();
if(!_69e.isDefaultContent){
_69e.setLayout(MenuGroupBinding.LAYOUT_DEFAULT);
if(!_69c&&_69e.isVisible){
_69c=_69e;
}
if(_69e.isVisible){
_69d=_69e;
}
}
}
if(_69c&&_69d){
_69c.setLayout(MenuGroupBinding.LAYOUT_FIRST);
_69d.setLayout(MenuGroupBinding.LAYOUT_LAST);
}
}
};
MenuBodyBinding.prototype.grabKeyboard=function(_69f){
MenuBodyBinding.activeInstance=this;
if(_69f){
var _6a0=this._getMenuItems().getFirst();
if(_6a0){
_6a0.focus();
}
}
};
MenuBodyBinding.prototype.releaseKeyboard=function(){
if(MenuBodyBinding.activeInstance==this){
MenuBodyBinding.activeInstance=null;
}
};
MenuBodyBinding.prototype.handleEnterKey=function(){
var _6a1=this._lastFocused;
if((_6a1!=null)&&(!_6a1.isMenuContainer)){
_6a1.fireCommand();
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEDOWN);
}
};
MenuBodyBinding.prototype.handleArrowKey=function(key){
this.arrowKey=key;
var _6a3=this._getMenuItems();
var _6a4=null;
var next=null;
if(this._lastFocused){
_6a4=this._lastFocused;
switch(key){
case KeyEventCodes.VK_UP:
next=_6a3.getPreceding(_6a4);
break;
case KeyEventCodes.VK_DOWN:
next=_6a3.getFollowing(_6a4);
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
next=_6a3.getFirst();
}
if(next){
next.focus();
}
};
MenuBodyBinding.prototype._getMenuItems=function(){
if(!this._menuItemsList||this.isDirty){
var list=new List();
var _6a7=null;
this.getChildBindingsByLocalName("menugroup").each(function(_6a8){
_6a7=_6a8.getChildBindingsByLocalName("menuitem");
_6a7.each(function(item){
list.add(item);
});
});
_6a7=this.getChildBindingsByLocalName("menuitem");
_6a7.each(function(item){
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
MenuBodyBinding.newInstance=function(_6ac){
var _6ad=DOMUtil.createElementNS(Constants.NS_UI,"ui:menubody",_6ac);
return UserInterface.registerBinding(_6ad,MenuBodyBinding);
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
MenuGroupBinding.prototype.setLayout=function(_6ae){
switch(_6ae){
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
MenuGroupBinding.newInstance=function(_6af){
var _6b0=DOMUtil.createElementNS(Constants.NS_UI,"ui:menugroup",_6af);
return UserInterface.registerBinding(_6b0,MenuGroupBinding);
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
var _6b1=this.getProperty("image");
var _6b2=this.getProperty("image-hover");
var _6b3=this.getProperty("image-active");
var _6b4=this.getProperty("image-disabled");
if(!this.image&&_6b1){
this.image=_6b1;
}
if(!this.imageHover&&_6b2){
this.imageHover=_6b1;
}
if(!this.imageActive&&_6b3){
this.imageActive=_6b3;
}
if(!this.imageDisabled&&_6b4){
this.imageDisabled=_6b4;
}
};
MenuItemBinding.prototype.buildDOMContent=function(){
var _6b5=this.getProperty("label");
var _6b6=this.getProperty("tooltip");
var type=this.getProperty("type");
var _6b8=this.getProperty("isdisabled");
var _6b9=this.getProperty("image");
var _6ba=this.getProperty("image-hover");
var _6bb=this.getProperty("image-active");
var _6bc=this.getProperty("image-disabled");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menuitemlabel");
this.add(this.labelBinding);
var _6bd=this.getMenuPopupBinding();
if(_6bd){
this.isMenuContainer=true;
this.setType(MenuItemBinding.TYPE_MENUCONTAINER);
}
if(!this.imageProfile){
if(!this.image&&_6b9){
this.image=_6b9;
}
if(!this.imageHover&&_6ba){
this.imageHover=_6b9;
}
if(!this.imageActive&&_6bb){
this.imageActive=_6bb;
}
if(!this.imageDisabled&&_6bc){
this.imageDisabled=_6bc;
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
if(_6b5){
this.setLabel(_6b5);
}
if(_6b6){
this.setToolTip(_6b6);
}
if(type){
this.setType(type);
}
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.getProperty("ischecked")==true){
this.check(true);
}
}
if(_6b8==true){
this.disable();
}
var _6be=this.getProperty("oncommand");
if(_6be){
if(this.isMenuContainer){
throw new Error("MenuItemBinding with contained menuitems cannot fire commands.");
}else{
this.oncommand=function(){
this.bindingWindow.eval(_6be);
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
MenuItemBinding.prototype.setLabel=function(_6c1){
this.setProperty("label",_6c1);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6c1));
}
};
MenuItemBinding.prototype.setToolTip=function(_6c2){
this.setProperty("tooltip",_6c2);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6c2));
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
var _6c4=this.bindingDocument.createElement("div");
_6c4.className=MenuItemBinding.CLASSNAME_CHECKBOX;
_6c4.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_CHECKBOX));
var _6c5=this.labelBinding.bindingElement;
_6c5.insertBefore(_6c4,_6c5.firstChild);
_6c4.style.display="none";
this.shadowTree.checkBoxIndicator=_6c4;
}else{
throw new Error("MenuItemBinding: checkboxes cannot contain menus");
}
break;
case MenuItemBinding.TYPE_MENUCONTAINER:
var _6c4=this.bindingDocument.createElement("div");
_6c4.className=MenuItemBinding.CLASSNAME_SUBMENU;
_6c4.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_SUBMENU));
var _6c5=this.labelBinding.bindingElement;
_6c5.insertBefore(_6c4,_6c5.firstChild);
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
var _6c7=this.imageProfile.getDisabledImage();
if(_6c7){
this.setImage(_6c7);
}
}
}else{
this.detachClassName("isdisabled");
if(this.imageProfile){
var _6c7=this.imageProfile.getDefaultImage();
if(_6c7){
this.setImage(_6c7);
}
}
}
}
};
MenuItemBinding.prototype.focus=function(e){
this.labelBinding.attachClassName(MenuItemBinding.CLASSNAME_HOVER);
var _6c9=this.getMenuContainerBinding();
if(_6c9.isOpen()&&!_6c9.isOpen(this)){
_6c9._openElement.hide();
_6c9.setOpenElement(false);
}
if(this.isMenuContainer&&e&&e.type==DOMEvents.MOUSEOVER){
var _6c9=this.getMenuContainerBinding();
if(!_6c9.isOpen(this)){
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
MenuItemBinding.prototype.blur=function(_6cb){
if(this._showSubMenuTimeout){
window.clearTimeout(this._showSubMenuTimeout);
this._showSubMenuTimeout=null;
}
if(this.isFocused){
var _6cc=this.getMenuContainerBinding();
if(!_6cc||!_6cc.isOpen(this)||_6cb){
this.labelBinding.detachClassName(MenuItemBinding.CLASSNAME_HOVER);
this.isFocused=false;
this._containingMenuBodyBinding.handleBlurredItem(this);
}
}
};
MenuItemBinding.prototype.check=function(_6cd){
this.setChecked(true,_6cd);
};
MenuItemBinding.prototype.uncheck=function(_6ce){
this.setChecked(false,_6ce);
};
MenuItemBinding.prototype.show=function(){
this.menuPopupBinding.position=PopupBinding.POSITION_RIGHT;
MenuItemBinding.superclass.show.call(this);
};
MenuItemBinding.prototype.setChecked=function(_6cf,_6d0){
this.setProperty("ischecked",_6cf);
if(this.isAttached){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.isChecked!=_6cf){
this.isChecked=_6cf;
this.shadowTree.checkBoxIndicator.style.display=_6cf?"block":"none";
if(!_6d0){
this.fireCommand();
}
}
}
}
};
MenuItemBinding.newInstance=function(_6d1){
var _6d2=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_6d1);
UserInterface.registerBinding(_6d2,MenuItemBinding);
return UserInterface.getBinding(_6d2);
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
PopupBinding.handleBroadcast=function(_6d3,arg){
switch(_6d3){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
case BroadcastMessages.MOUSEEVENT_MOUSEUP:
if(PopupBinding.activeInstances.hasEntries()){
var list=new List();
PopupBinding.activeInstances.each(function(key){
var _6d7=PopupBinding.activeInstances.get(key);
var _6d8=(arg&&arg instanceof ButtonBinding&&arg.popupBinding==_6d7);
if(!_6d8){
list.add(_6d7);
}
});
list.each(function(_6d9){
_6d9.hide();
});
}
break;
case BroadcastMessages.KEY_ESCAPE:
if(PopupBinding.activeInstances.hasEntries()){
PopupBinding.activeInstances.each(function(key){
var _6db=PopupBinding.activeInstances.get(key);
_6db.hide();
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
var _6dc=DOMUtil.getElementsByTagName(this.bindingElement,"menubody").item(0);
var _6dd=DOMUtil.getElementsByTagName(this.bindingElement,"popupbody").item(0);
if(_6dc){
this._bodyBinding=UserInterface.getBinding(_6dc);
}else{
if(_6dd){
this._bodyBinding=UserInterface.getBinding(_6dd);
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
var _6de=this.getProperty("position");
this.position=_6de?_6de:PopupBinding.POSITION_BOTTOM;
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
PopupBinding.prototype.add=function(_6df){
var _6e0=null;
if(this._bodyBinding){
this._bodyBinding.add(_6df);
_6e0=_6df;
}else{
_6e0=PopupBinding.superclass.add.call(this,_6df);
}
return _6e0;
};
PopupBinding.prototype.addFirst=function(_6e1){
var _6e2=null;
if(this._bodyBinding){
this._bodyBinding.addFirst(_6e1);
_6e2=_6e1;
}else{
_6e2=PopupBinding.superclass.addFirst.call(this,_6e1);
}
return _6e2;
};
PopupBinding.prototype.handleAction=function(_6e3){
PopupBinding.superclass.handleAction.call(this,_6e3);
var _6e4=_6e3.target;
switch(_6e3.type){
case Binding.ACTION_ATTACHED:
if(_6e4 instanceof MenuItemBinding){
this._count(true);
_6e3.consume();
}
break;
case Binding.ACTION_DETACHED:
if(_6e4 instanceof MenuItemBinding){
this._count(false);
_6e3.consume();
}
break;
}
};
PopupBinding.prototype._count=function(_6e5){
if(this.type==PopupBinding.TYPE_FIXED){
this._menuItemCount=this._menuItemCount+(_6e5?1:-1);
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
PopupBinding.prototype.snapTo=function(_6e6){
var _6e7=this._getElementPosition(_6e6);
switch(this.position){
case PopupBinding.POSITION_TOP:
_6e7.y-=this.bindingElement.offsetHeight;
break;
case PopupBinding.POSITION_RIGHT:
_6e7.x+=_6e6.offsetWidth;
break;
case PopupBinding.POSITION_BOTTOM:
_6e7.y+=_6e6.offsetHeight;
break;
case PopupBinding.POSITION_LEFT:
_6e7.x-=this.bindingElement.offsetWidth;
break;
}
this.targetElement=_6e6;
this.bindingElement.style.display="block";
this.setPosition(_6e7.x,_6e7.y);
};
PopupBinding.prototype.snapToMouse=function(e){
this.snapToPoint(this._getMousePosition(e));
};
PopupBinding.prototype.snapToPoint=function(_6e9){
this.bindingElement.style.display="block";
this.setPosition(_6e9.x,_6e9.y);
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
PopupBinding.prototype._getElementPosition=function(_6ee){
return _6ee.ownerDocument==this.bindingDocument?DOMUtil.getGlobalPosition(_6ee):DOMUtil.getUniversalPosition(_6ee);
};
PopupBinding.prototype._getMousePosition=function(e){
var _6f0=DOMEvents.getTarget(e);
return _6f0.ownerDocument==this.bindingDocument?DOMUtil.getGlobalMousePosition(e):DOMUtil.getUniversalMousePosition(e);
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
PopupBinding.prototype._makeVisible=function(_6f1){
var _6f2=this.bindingElement;
if(_6f1){
if(Client.hasTransitions){
_6f2.style.visibility="visible";
_6f2.style.opacity="1";
}else{
_6f2.style.visibility="visible";
}
}else{
_6f2.style.visibility="hidden";
_6f2.style.display="none";
if(Client.hasTransitions){
_6f2.style.opacity="0";
}
}
this.isVisible=_6f1;
};
PopupBinding.prototype._enableTab=function(_6f3){
var self=this;
var _6f5=this.getDescendantBindingsByLocalName("menuitem");
setTimeout(function(){
if(Binding.exists(self)==true){
_6f5.each(function(_6f6){
_6f6.bindingElement.tabIndex=_6f3?0:-1;
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
PopupBinding.prototype.grabKeyboard=function(_6ff){
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
var _705=null;
if(this._menuItems){
if(this._menuItems[cmd]){
_705=this._menuItems[cmd];
}else{
throw "PopupBinding.getMenuItemForCommand: No binding for command "+cmd;
}
}else{
throw "Must invoke _indexMenuContent method first!";
}
return _705;
};
PopupBinding.prototype.clear=function(){
var _706=this._bodyBinding;
if(_706){
_706.detachRecursive();
_706.bindingElement.innerHTML="";
}
this._menuItemCount=0;
};
PopupBinding.newInstance=function(_707){
var _708=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_707);
return UserInterface.registerBinding(_708,PopupBinding);
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
PopupBodyBinding.newInstance=function(_70a){
var _70b=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupbody",_70a);
return UserInterface.registerBinding(_70b,PopupBodyBinding);
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
MenuPopupBinding.prototype._getElementPosition=function(_70c){
return new Point(_70c.offsetLeft,0);
};
MenuPopupBinding.newInstance=function(_70d){
var _70e=DOMUtil.createElementNS(Constants.NS_UI,"ui:menupopup",_70d);
return UserInterface.registerBinding(_70e,MenuPopupBinding);
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
var _70f=DOMUtil.getElementsByTagName(this.bindingElement,"dialogbody").item(0);
if(_70f){
this._body=UserInterface.getBinding(_70f);
}else{
this._body=DialogBodyBinding.newInstance(this.bindingDocument);
this.add(this._body);
}
};
DialogBinding.prototype.buildBorderBindings=function(){
var _710=new List([DialogBorderBinding.TYPE_NORTH,DialogBorderBinding.TYPE_SOUTH,DialogBorderBinding.TYPE_EAST,DialogBorderBinding.TYPE_WEST]);
while(_710.hasNext()){
var _711=DialogBorderBinding.newInstance(this.bindingDocument);
_711.setType(_710.getNext());
this.add(_711);
}
};
DialogBinding.prototype.buildShadowBinding=function(){
this.shadowBinding=ShadowBinding.newInstance(this.bindingDocument);
this.shadowBinding.attachClassName("dialogshadow");
this.shadowBinding.shadow(this);
this.shadowBinding.attach();
};
DialogBinding.prototype.buildControlBindings=function(){
var _712=this.getProperty("controls");
if(_712){
var _713=new List(_712.split(" "));
while(_713.hasNext()){
var type=_713.getNext();
switch(type){
case ControlBinding.TYPE_MAXIMIZE:
case ControlBinding.TYPE_MINIMIZE:
case ControlBinding.TYPE_CLOSE:
var _715=DialogControlBinding.newInstance(this.bindingDocument);
_715.setControlType(type);
this._titlebar.addControl(_715);
this.controlBindings[type]=_715;
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
var _716=this.getProperty("image");
var _717=this.getProperty("label");
var _718=this.getProperty("draggable");
var _719=this.getProperty("resizable");
var _71a=this.getProperty("modal");
if(_716){
this.setImage(_716);
}
if(_717){
this.setLabel(_717);
}
if(_718==false){
this.isDialogDraggable=false;
}
if(_719==false){
this.isPanelResizable=false;
}
if(_71a==true){
this.setModal(true);
}
};
DialogBinding.prototype.setModal=function(_71b){
this.isModal=_71b;
};
DialogBinding.prototype.setLabel=function(_71c){
this.setProperty("label",_71c);
if(this.isAttached==true){
this._titlebar.setLabel(Resolver.resolve(_71c));
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
DialogBinding.prototype.handleAction=function(_71e){
DialogBinding.superclass.handleAction.call(this,_71e);
switch(_71e.type){
case Binding.ACTION_DRAG:
var _71f=_71e.target;
if(this.getState()==ControlBoxBinding.STATE_NORMAL){
switch(_71f.constructor){
case DialogTitleBarBinding:
this.mode=DialogBinding.MODE_DRAGGING;
_71f.dragger.registerHandler(this);
break;
case DialogBorderBinding:
if(this._isResizable){
this.mode=DialogBinding.MODE_RESIZING;
this._border=_71f;
_71f.dragger.registerHandler(this);
}
break;
}
}
_71e.consume();
break;
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_71e.consume();
break;
}
};
DialogBinding.prototype.handleBroadcast=function(_720,arg){
DialogBinding.superclass.handleBroadcast.call(this,_720,arg);
switch(_720){
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.startPoint=this.getPosition();
this._setComputedPosition(new Point(0,0));
break;
}
};
DialogBinding.prototype.handleInvokedControl=function(_722){
DialogBinding.superclass.handleInvokedControl.call(this,_722);
switch(_722.controlType){
case ControlBinding.TYPE_CLOSE:
this.close();
break;
}
};
DialogBinding.prototype.open=function(_723){
if(this.isModal&&this._cover==null){
this.buildDialogCoverBinding();
}
if(!this.isVisible){
this.setProperty("open","true");
this.isVisible=true;
this.isActivatable=true;
this.activate();
if(_723){
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
var _725=self.bindingElement;
setTimeout(function(){
_725.style.opacity="0";
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
DialogBinding.prototype.setZIndex=function(_726){
this.bindingElement.style.zIndex=new String(_726);
};
DialogBinding.prototype.onDragStart=function(_727){
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
DialogBinding.prototype.setResizable=function(_739){
if(this._isResizable!=_739){
if(_739){
this.attachClassName("resizable");
}else{
this.detachClassName("resizable");
}
this._isResizable=_739;
}
};
DialogBinding.prototype.computeDefaultGeometry=function(){
var _73a=null;
var _73b=this.bindingDocument.body.offsetWidth;
var _73c=this.bindingDocument.body.offsetHeight;
_73a={x:0.125*_73b,y:0.125*_73c,w:0.75*_73b,h:0.5*_73c};
return _73a;
};
DialogBinding.prototype.centerOnScreen=function(){
var _73d=this.bindingWindow.WindowManager.getWindowDimensions();
var dim=this.getDimension();
this.setPosition(new Point(0.5*(_73d.w-dim.w),0.5*(_73d.h-dim.h)));
};
DialogBinding.prototype.alert=function(){
var _73f=this;
var i=0;
function blink(){
if(i%2==0){
_73f.detachClassName("active");
}else{
_73f.attachClassName("active");
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
var _743="";
while(list.hasNext()){
var type=list.getNext();
_743+=type+list.hasNext()?" ":"";
}
this.setProperty("controls",_743);
if(this.isAttached){
this.buildControlBindings();
}
};
DialogBinding.newInstance=function(_744){
var _745=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_744);
return UserInterface.registerBinding(_745,DialogBinding);
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
DialogHeadBinding.newInstance=function(_746){
var _747=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialoghead",_746);
return UserInterface.registerBinding(_747,DialogHeadBinding);
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
DialogBodyBinding.newInstance=function(_74a){
var _74b=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogbody",_74a);
return UserInterface.registerBinding(_74b,DialogBodyBinding);
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
DialogMatrixBinding.newInstance=function(_74c){
var _74d=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogmatrix",_74c);
return UserInterface.registerBinding(_74d,DialogMatrixBinding);
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
DialogSetBinding.prototype.handleAction=function(_74e){
DialogSetBinding.superclass.handleAction.call(this,_74e);
var _74f=_74e.target;
switch(_74e.type){
case Binding.ACTION_MOVETOTOP:
if(_74f instanceof DialogBinding){
this._moveToTop(_74f);
}
break;
case Binding.ACTION_MOVEDONTOP:
_74e.consume();
break;
}
};
DialogSetBinding.prototype._moveToTop=function(_750){
var _751=0;
var _752=this.getChildBindingsByLocalName("dialog");
_752.each(function(_753){
var _754=_753.getZIndex();
_751=_754>_751?_754:_751;
});
_750.setZIndex(_751+2);
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
DialogBorderBinding.newInstance=function(_756){
var _757=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogborder",_756);
return UserInterface.registerBinding(_757,DialogBorderBinding);
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
DialogCoverBinding.prototype.cover=function(_758){
this._dialogBinding=_758;
this._dialogBinding.addActionListener(DialogBinding.ACTION_OPEN,this);
this._dialogBinding.addActionListener(DialogBinding.ACTION_CLOSE,this);
this._dialogBinding.addActionListener(Binding.ACTION_MOVEDONTOP,this);
this.addEventListener(DOMEvents.MOUSEDOWN);
};
DialogCoverBinding.prototype.handleEvent=function(e){
DialogCoverBinding.superclass.handleEvent.call(this,e);
this._dialogBinding.alert();
};
DialogCoverBinding.prototype.handleAction=function(_75a){
DialogCoverBinding.superclass.handleAction.call(this,_75a);
var _75b=_75a.target;
if(this._dialogBinding.isModal){
switch(_75a.type){
case DialogBinding.ACTION_OPEN:
this.show();
break;
case DialogBinding.ACTION_CLOSE:
this.hide();
break;
case Binding.ACTION_MOVEDONTOP:
if(_75b==this._dialogBinding){
this.bindingElement.style.zIndex=new String(_75b.getZIndex()-1);
}
break;
}
}
};
DialogCoverBinding.prototype.handleBroadcast=function(_75c,arg){
DialogCoverBinding.superclass.handleBroadcast.call(this,_75c,arg);
switch(_75c){
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
var _75f=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.subscribe(_75f);
DialogCoverBinding.superclass.show.call(this);
};
DialogCoverBinding.prototype.hide=function(){
var _760=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.unsubscribe(_760);
DialogCoverBinding.superclass.hide.call(this);
};
DialogCoverBinding.newInstance=function(_761){
var _762=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogcover",_761);
return UserInterface.registerBinding(_762,DialogCoverBinding);
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
var _763=this.getProperty("image");
if(_763){
this.setImage(_763);
}
var _764=this.getProperty("label");
if(_764){
this.setLabel(_764);
}
};
DialogTitleBarBinding.prototype.setLabel=function(_765){
if(this.isAttached){
this.labelBinding.setLabel(_765);
}
this.setProperty("label",_765);
};
DialogTitleBarBinding.prototype.setImage=function(url){
if(this.isAttached&&Client.isWindows){
this.labelBinding.setImage(url);
}
this.setProperty("image",url);
};
DialogTitleBarBinding.prototype.addControl=function(_767){
if(!this._controlGroupBinding){
this._controlGroupBinding=this.bodyBinding.addFirst(ControlGroupBinding.newInstance(this.bindingDocument));
}
this._controlGroupBinding.add(_767);
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
DialogTitleBarBinding.newInstance=function(_768){
var _769=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebar",_768);
return UserInterface.registerBinding(_769,DialogTitleBarBinding);
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
DialogTitleBarBodyBinding.newInstance=function(_76a){
var _76b=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebarbody",_76a);
return UserInterface.registerBinding(_76b,DialogTitleBarBodyBinding);
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
DialogControlBinding.newInstance=function(_76c){
var _76d=DOMUtil.createElementNS(Constants.NS_UI,"ui:control",_76c);
return UserInterface.registerBinding(_76d,DialogControlBinding);
};
DialogControlImageProfile.prototype=new ControlImageProfile;
DialogControlImageProfile.prototype.constructor=DialogControlImageProfile;
DialogControlImageProfile.superclass=ControlImageProfile.prototype;
var os=Client.isVista?"vista/":(!Client.isWindows?"osx/":"");
DialogControlImageProfile.IMAGE_MINIMIZE="${root}/skins/system/controls/"+os+"control-minimize-${string}.png";
DialogControlImageProfile.IMAGE_MAXIMIZE="${root}/skins/system/controls/"+os+"control-maximize-${string}.png";
DialogControlImageProfile.IMAGE_RESTORE="${root}/skins/system/controls/"+os+"control-restore-${string}.png";
DialogControlImageProfile.IMAGE_CLOSE="${root}/skins/system/controls/"+os+"control-close-${string}.png";
function DialogControlImageProfile(_76e){
this.binding=_76e;
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
var _771=null;
if(node.nodeType==Node.ELEMENT_NODE){
var _772=node.nodeName.toLowerCase();
switch(_772){
case "script":
case "style":
case "textarea":
_771=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
break;
}
}
return _771;
});
var self=this;
this.addFilter(function(node,arg){
if(node.nodeType==Node.TEXT_NODE){
var text=node.nodeValue.toLowerCase();
self._map.each(function(key,exp){
var _779=true;
if(exp.test(text)){
self._textnodes.add(node);
_779=false;
}
return _779;
});
}
});
};
WindowBindingHighlightNodeCrawler.prototype.crawl=function(_77a,arg){
this._textnodes=new List();
WindowBindingHighlightNodeCrawler.superclass.crawl.call(this,_77a,arg);
};
WindowBindingHighlightNodeCrawler.prototype.setKeys=function(list){
list.reset();
this._map.empty();
while(list.hasNext()){
var key=list.getNext();
var _77e=key.toLowerCase().replace(/ /g,"\\W");
var exp=new RegExp("("+_77e+")");
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
WindowBindingHighlightNodeCrawler.prototype._getMarkup=function(_784){
var _785="";
var _786="<span class=\""+WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT+"\" style=\"background-color:yellow;color:black;\">";
var _787="</span>";
var self=this;
function iterate(_789){
var _78a=-1;
var _78b=null;
self._map.each(function(key,exp){
var low=_789.toLowerCase();
var _78f=low.search(exp);
if(_78f>-1){
if(_78a==-1){
_78a=_78f;
}
if(_78f<=_78a){
_78a=_78f;
_78b=key;
}
}
});
if(_78a>-1&&_78b!=null){
var pre=_789.substring(0,_78a);
var hit=_789.substring(_78a,_78a+_78b.length);
var pst=_789.substring(_78a+_78b.length,_789.length);
_785+=pre+_786+hit+_787;
iterate(pst);
}else{
_785+=_789;
}
}
iterate(_784);
return _785;
};
WindowBindingHighlightNodeCrawler.prototype.reset=function(_793){
var _794=new List(_793.getElementsByTagName("span"));
_794.each(function(span){
if(span.className==WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT){
var node=_793.ownerDocument.createTextNode(DOMUtil.getTextContent(span));
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
WindowBinding.getMarkup=function(_797){
var _798=null;
if(_797.isAttached){
var doc=_797.getContentDocument();
if(doc!=null){
var root=doc.getElementsByTagName("html").item(0);
var html="<html xmlns=\""+Constants.NS_XHTML+"\">"+root.innerHTML+"</html>";
WebServiceProxy.isFaultHandler=false;
_798=top.MarkupFormatService.HtmlToXhtml(html);
WebServiceProxy.isFaultHandler=true;
if(_798 instanceof SOAPFault){
_798=null;
}
}
}
return _798;
};
WindowBinding.highlightKeywords=function(_79c,list){
if(WindowBinding._highlightcrawler==null){
WindowBinding._highlightcrawler=new WindowBindingHighlightNodeCrawler();
}
if(_79c.isAttached){
var doc=_79c.getContentDocument();
if(doc!=null){
var _79f=WindowBinding._highlightcrawler;
_79f.reset(doc.body);
if(list!=null){
_79f.setKeys(list);
_79f.crawl(doc.body);
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
var _7a0=WindowBinding.superclass.serialize.call(this);
if(_7a0){
_7a0.url=this.getURL();
}
return _7a0;
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
var _7a2=this.getContentWindow().DocumentManager;
if(_7a2!=null){
_7a2.detachAllBindings();
this._pageBinding=null;
}
}
}
};
WindowBinding.prototype.handleAction=function(_7a3){
WindowBinding.superclass.handleAction.call(this,_7a3);
var _7a4=_7a3.target;
switch(_7a3.type){
case RootBinding.ACTION_PHASE_3:
if(_7a4.bindingDocument==this.getContentDocument()){
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
this._onPageInitialize(_7a4);
break;
case RootBinding.ACTION_ACTIVATED:
case RootBinding.ACTION_DEACTIVATED:
_7a3.consume();
break;
}
};
WindowBinding.prototype.fit=function(_7a5){
if(!this.isFit||_7a5){
if(this._pageBinding!=null){
this.setHeight(this._pageBinding.getHeight());
this.isFit=true;
}
}
};
WindowBinding.prototype._onPageInitialize=function(_7a6){
if(this._pageBinding==null){
if(_7a6.bindingWindow==this.getContentWindow()){
this._pageBinding=_7a6;
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
WindowBinding.prototype._registerOnloadListener=function(_7a7){
var _7a8=this.shadowTree.iframe;
var _7a9=_7a7?"addEventListener":"removeEventListener";
if(this._onloadHandler==null){
var self=this;
this._onloadHandler={handleEvent:function(e){
var _7ac=true;
if(Client.isExplorer){
_7ac=_7a8.readyState=="complete";
}
if(_7ac==true){
if(self.getURL()!=WindowBinding.DEFAULT_URL){
if(!self._hasLoadActionFired){
self.onWindowLoaded(self.getContentWindow());
}
}
}
}};
}
DOMEvents[_7a9](this.shadowTree.iframe,Client.isExplorer==true?"readystatechange":DOMEvents.LOAD,this._onloadHandler);
};
WindowBinding.prototype._registerUnloadListener=function(_7ad){
var _7ae=_7ad?"addEventListener":"removeEventListener";
if(this._unloadHandler==null){
var self=this;
this._unloadHandler={handleEvent:function(){
self._disposeContentDocument();
self._hasLoadActionFired=false;
}};
}
DOMEvents[_7ae](this.getContentWindow(),DOMEvents.UNLOAD,this._unloadHandler);
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
var _7b2=WindowBinding.DEFAULT_URL;
var url=this.getProperty("url");
if(url){
_7b2=url;
}
return _7b2;
};
WindowBinding.prototype.reload=function(_7b4){
this._disposeContentDocument();
if(Client.isPrism){
Prism.disableCache();
}
this._isReloading=true;
this.getContentDocument().location.reload();
};
WindowBinding.prototype.getFrameElement=function(){
var _7b5=null;
if(this.shadowTree.iframe){
_7b5=this.shadowTree.iframe;
}
return _7b5;
};
WindowBinding.prototype.getContentWindow=function(){
var _7b6=null,_7b7=this.getFrameElement();
if(_7b7){
_7b6=_7b7.contentWindow;
}
return _7b6;
};
WindowBinding.prototype.getContentDocument=function(){
var _7b8=null,win=this.getContentWindow();
if(win){
_7b8=win.document;
}
return _7b8;
};
WindowBinding.prototype.getRootBinding=function(){
var _7ba=null,doc=this.getContentDocument();
if(doc&&doc.body){
_7ba=UserInterface.getBinding(doc.body);
}
return _7ba;
};
WindowBinding.prototype.getPageBinding=function(){
return this._pageBinding;
};
WindowBinding.prototype.setHeight=function(_7bc){
this.bindingElement.style.height=_7bc+"px";
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
WindowBinding.prototype.handleCrawler=function(_7bd){
WindowBinding.superclass.handleCrawler.call(this,_7bd);
if(_7bd.type==NodeCrawler.TYPE_DESCENDING){
var root=this.getRootBinding();
if(root!=null){
_7bd.nextNode=root.bindingElement;
}else{
_7bd.response=NodeCrawler.SKIP_CHILDREN;
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
WindowBinding.newInstance=function(_7c2){
var _7c3=DOMUtil.createElementNS(Constants.NS_UI,"ui:window",_7c2);
var _7c4=UserInterface.registerBinding(_7c3,WindowBinding);
return _7c4;
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
this._windowBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_7c8){
_7c8.target.show();
_7c8.consume();
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
this._errorBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_7ca){
_7ca.target.show();
_7ca.consume();
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
PreviewWindowBinding.prototype.handleAction=function(_7cc){
PreviewWindowBinding.superclass.handleAction.call(this,_7cc);
switch(_7cc.type){
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
var _7cd=null;
this._getRadioButtonBindings().each(function(_7ce){
if(_7ce.getProperty("ischecked")){
_7cd=_7ce;
return false;
}else{
return true;
}
});
if(_7cd){
this._checkedRadioBinding=_7cd;
}
RadioGroupBinding.superclass.onBindingInitialize.call(this);
};
RadioGroupBinding.prototype.handleAction=function(_7cf){
RadioGroupBinding.superclass.handleAction.call(this,_7cf);
var _7d0=_7cf.target;
switch(_7cf.type){
case ButtonBinding.ACTION_RADIOBUTTON_ATTACHED:
this._isUpToDate=false;
_7cf.consume();
break;
case ButtonBinding.ACTION_COMMAND:
if(_7d0.isRadioButton&&!_7d0.isDisabled){
if(this._checkedRadioBinding){
this._unCheckRadioBindingsExcept(_7d0);
}
this._checkedRadioBinding=_7d0;
this.dispatchAction(RadioGroupBinding.ACTION_SELECTIONCHANGED);
_7cf.consume();
}
break;
}
};
RadioGroupBinding.prototype.setCheckedButtonBinding=function(_7d1,_7d2){
if(_7d1 instanceof RadioDataBinding){
_7d1=_7d1.getButton();
}
if(_7d1.isRadioButton){
switch(_7d2){
case true:
this._unCheckRadioBindingsExcept(_7d1);
this._checkedRadioBinding=_7d1;
_7d1.check(true);
break;
default:
_7d1.check();
break;
}
}
};
RadioGroupBinding.prototype.getCheckedButtonBinding=function(){
return this._checkedRadioBinding;
};
RadioGroupBinding.prototype._unCheckRadioBindingsExcept=function(_7d3){
var _7d4=this._getRadioButtonBindings();
_7d4.each(function(_7d5){
if(_7d5.isChecked&&_7d5!=_7d3){
_7d5.uncheck(true);
}
});
};
RadioGroupBinding.prototype._getRadioButtonBindings=function(){
if(this._radioButtonBindings===null||!this._isUpToDate){
var _7d6=new Crawler();
var list=new List();
_7d6.addFilter(function(_7d8){
var _7d9=true;
var _7da=UserInterface.getBinding(_7d8);
if(_7da instanceof RadioGroupBinding){
_7d9=NodeCrawler.SKIP_CHILDREN;
}else{
if(_7da instanceof ButtonBinding&&_7da.isRadioButton){
list.add(_7da);
}
}
return _7d9;
});
_7d6.crawl(this.bindingElement);
this._radioButtonBindings=list;
}
return this._radioButtonBindings;
};
RadioGroupBinding.newInstance=function(_7db){
var _7dc=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiogroup",_7db);
return UserInterface.registerBinding(_7dc,RadioGroupBinding);
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
var _7de=this.getProperty("regexrule");
if(_7de!=null){
this.expression=new RegExp(_7de);
}
var _7df=this.getProperty("onbindingblur");
if(_7df!=null){
this.onblur=function(){
Binding.evaluate(_7df,this);
};
}
var _7e0=this.getProperty("onvaluechange");
if(_7e0!=null){
this.onValueChange=function(){
Binding.evaluate(_7e0,this);
};
}
if(this.error==null&&this.type!=null){
var _7e1=DataBinding.errors[this.type];
if(_7e1!=null){
this.error=_7e1;
}
}
};
DataInputBinding.prototype._buildDOMContent=function(){
this.shadowTree.input=this._getInputElement();
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
if(Client.isExplorer==true){
this.bindingElement.hideFocus=true;
}
var _7e2=this.getProperty("value");
if(_7e2!=null){
this.setValue(String(_7e2));
}
var name=this.getProperty("name");
if(name!=null){
this.setName(name);
}
var _7e4=this.getProperty("isdisabled");
if(_7e4==true){
this.setDisabled(true);
}
var _7e5=this.getProperty("readonly");
if(_7e5==true){
this.setReadOnly(true);
}
var _7e6=this.getProperty("autoselect");
if(_7e6==true){
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
var _7e7=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_7e7.type=this.isPassword==true?"password":"text";
_7e7.tabIndex=-1;
return _7e7;
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
DataInputBinding.prototype._handleFocusAndBlur=function(_7ea){
if(_7ea){
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
DataInputBinding.prototype.handleBroadcast=function(_7ed,arg){
DataInputBinding.superclass.handleBroadcast.call(this,_7ed,arg);
var self=this;
switch(_7ed){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(Client.isExplorer==true){
var _7f0=DOMEvents.getTarget(arg);
if(_7f0!=this.shadowTree.input){
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
DataInputBinding.prototype.focus=function(_7f1){
if(!this.isFocused&&!this.isReadOnly&&!this.isDisabled){
DataInputBinding.superclass.focus.call(this);
if(this.isFocused==true){
this._focus();
if(this._isAutoSelect==true){
if(_7f1){
var self=this,_7f3=this.bindingElement,_7f4={handleEvent:function(){
self.select();
DOMEvents.removeEventListener(_7f3,DOMEvents.MOUSEUP,this);
}};
DOMEvents.addEventListener(_7f3,DOMEvents.MOUSEUP,_7f4);
}else{
this.select();
}
}
this.onfocus();
if(!_7f1){
var _7f5=this.shadowTree.input;
setTimeout(function(){
FocusBinding.focusElement(_7f5);
},0);
}
}
}
};
DataInputBinding.prototype.select=function(){
var _7f6=this.shadowTree.input;
setTimeout(function(){
if(Client.isExplorer==true){
var _7f7=_7f6.createTextRange();
_7f7.moveStart("character",0);
_7f7.moveEnd("character",_7f6.value.length);
_7f7.select();
}else{
_7f6.setSelectionRange(0,_7f6.value.length);
}
},0);
};
DataInputBinding.prototype.blur=function(_7f8){
if(this.isFocused==true){
DataInputBinding.superclass.blur.call(this);
if(!_7f8){
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
DataInputBinding.prototype.validate=function(_7fc){
if(_7fc==true||this._isValid){
var _7fd=this.isValid();
if(_7fd!=this._isValid){
this._isValid=_7fd;
if(!_7fd){
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._value=this.getValue();
this.dispatchAction(Binding.ACTION_INVALID);
if(!this.isFocused){
var _7fe=null;
if(this._isInvalidBecauseRequired==true){
_7fe=DataBinding.warnings["required"];
}else{
if(this._isInvalidBecauseMinLength==true){
_7fe=DataBinding.warnings["minlength"];
_7fe=_7fe.replace("${count}",String(this.minlength));
}else{
if(this._isInvalidBecauseMaxLength==true){
_7fe=DataBinding.warnings["maxlength"];
_7fe=_7fe.replace("${count}",String(this.maxlength));
}else{
_7fe=DataBinding.warnings[this.type];
}
}
}
this.shadowTree.input.className=DataBinding.CLASSNAME_WARNING;
if(_7fe!=null){
if(this.isPassword){
if(Client.isMozilla){
this.shadowTree.input.type="text";
this.setValue(_7fe);
}else{
alert(_7fe);
}
}else{
this.setValue(_7fe);
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
var _7ff=true;
this._isInvalidBecauseRequired=false;
this._isInvalidBecauseMinLength=false;
this._isInvalidaBecuaseMaxLength=false;
var _800=this.getValue();
if(_800==""){
if(this.isRequired==true){
_7ff=false;
this._isInvalidBecauseRequired=true;
}
}else{
if(this.type!=null){
var _801=DataBinding.expressions[this.type];
if(!_801.test(_800)){
_7ff=false;
}
}else{
if(this.expression!=null){
if(!this.expression.test(_800)){
_7ff=false;
}
}
}
}
if(_7ff&&this.minlength!=null){
if(_800.length<this.minlength){
this._isInvalidBecauseMinLength=true;
_7ff=false;
}
}
if(_7ff&&this.maxlength!=null){
if(_800.length>this.maxlength){
this._isInvalidBecauseMaxLength=true;
_7ff=false;
}
}
return _7ff;
};
DataInputBinding.prototype.setDisabled=function(_802){
if(_802!=this.isDisabled){
if(_802){
this.attachClassName("isdisabled");
}else{
this.detachClassName("isdisabled");
}
var _803=this.shadowTree.input;
if(_802){
this._disabledHandler={handleEvent:function(e){
DOMEvents.preventDefault(e);
DOMEvents.stopPropagation(e);
}};
DOMEvents.addEventListener(_803,DOMEvents.MOUSEDOWN,this._disabledHandler);
}else{
DOMEvents.removeEventListener(_803,DOMEvents.MOUSEDOWN,this._disabledHandler);
this._disabledHandler=null;
}
if(Client.isExplorer){
this.shadowTree.input.disabled=_802;
this.shadowTree.input.unselectable=_802?"on":"off";
}
this.isDisabled=_802;
this.isFocusable=!_802;
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
};
DataInputBinding.prototype.setReadOnly=function(_805){
if(_805!=this.isReadOnly){
if(_805){
this.attachClassName("readonly");
}else{
this.detachClassName("readonly");
}
this.shadowTree.input.readOnly=_805;
this.isReadOnly=_805;
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
DataInputBinding.prototype.handleElement=function(_806){
return true;
};
DataInputBinding.prototype.updateElement=function(_807){
var _808=value=_807.getAttribute("value");
if(_808==null){
_808="";
}
if(this.getValue()!=_808){
var _809=this.bindingWindow.UpdateManager;
_809.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_808);
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
DataInputBinding.prototype.setValue=function(_80a){
if(_80a===null){
_80a="";
}
if(_80a!=this.getValue()){
this.setProperty("value",_80a);
if(this.shadowTree.input!=null){
this.shadowTree.input.value=String(_80a);
}
}
};
DataInputBinding.prototype.getValue=function(){
var _80b=null;
if(this.shadowTree.input!=null){
_80b=this.shadowTree.input.value;
}else{
_80b=this.getProperty("value");
}
return _80b;
};
DataInputBinding.prototype.setName=function(name){
DataInputBinding.superclass.setName.call(this,name);
if(this.isAttached==true){
this.shadowTree.input.name=name;
}
};
DataInputBinding.prototype.getResult=function(){
var _80d=this.getValue();
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_80d=Number(_80d);
break;
}
return _80d;
};
DataInputBinding.prototype.setResult=DataInputBinding.prototype.setValue;
DataInputBinding.newInstance=function(_80e){
var _80f=DOMUtil.createElementNS(Constants.NS_UI,"ui:datainput",_80e);
return UserInterface.registerBinding(_80f,DataInputBinding);
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
var _810=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_810!=null){
this.setValue(_810.value);
_810.parentNode.removeChild(_810);
}
TextBoxBinding.superclass._buildDOMContent.call(this);
this.shadowTree.input.setAttribute("spellcheck","false");
if(!this._hasWordWrap){
this.shadowTree.input.setAttribute("wrap","off");
}
};
TextBoxBinding.prototype._getInputElement=function(){
var _811=DOMUtil.createElementNS(Constants.NS_XHTML,"textarea",this.bindingDocument);
_811.tabIndex=-1;
return _811;
};
TextBoxBinding.prototype.handleElement=function(_812){
return true;
};
TextBoxBinding.prototype.updateElement=function(_813){
var _814,area=_813.getElementsByTagName("textarea").item(0);
if(area!=null&&area.hasChildNodes()){
_814=DOMUtil.getTextContent(area);
}
if(_814==null){
_814="";
}
if(this.getValue()!=_814){
var _816=this.bindingWindow.UpdateManager;
_816.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_814);
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
IEEditorTextBoxBinding.prototype._handleTabKey=function(_81a){
var _81b=this.bindingDocument.selection.createRange();
var _81c=_81b.text=="";
if(_81c&&!_81a){
_81b.text="\t";
}else{
var text="";
var _81e=_81b.text.length;
while((_81b.moveStart("word",-1)&&_81b.text.charAt(1)!="\n")){
}
_81b.moveStart("character",1);
var _81f=0;
var i=0,line,_822=_81b.text.split("\n");
while((line=_822[i++])!=null){
if(_81a){
line=line.replace(/^(\s)/mg,"");
_81f++;
}else{
line=line.replace(/^(.)/mg,"\t$1");
}
text+=line+(_822[i+1]?"\n":"");
}
_81b.text=text;
_81b.moveStart("character",-_81e);
if(_81a){
_81b.moveStart("character",2*_822.length-2);
}
_81b.select();
}
};
IEEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _823=this.bindingDocument.selection.createRange();
var _824=_823.duplicate();
while((_824.moveStart("word",-1)&&_824.text.indexOf("\n")==-1)){
}
_824.moveStart("character",1);
_823.text="\n"+_824.text.match(/^(\s)*/)[0]+"!";
_823.moveStart("character",-1);
_823.select();
_823.text="";
_823.select();
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
MozEditorTextBoxBinding.prototype._handleTabKey=function(_825){
var _826;
var _827;
var oss;
var osy;
var i;
var fnd;
var _82c=this._getSelectedText();
var el=this.shadowTree.input;
_826=el.scrollLeft;
_827=el.scrollTop;
if(!_82c.match(/\n/)){
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
_82c=this._getSelectedText();
if(_825){
ntext=_82c.replace(/^(\s)/mg,"");
}else{
ntext=_82c.replace(/^(.)/mg,"\t$1");
}
el.value=el.value.substr(0,el.selectionStart)+ntext+el.value.substr(el.selectionEnd);
el.selectionStart=oss;
el.selectionEnd=osy+(ntext.length-_82c.length);
}
el.scrollLeft=_826;
el.scrollTop=_827;
};
MozEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _82e;
var _82f;
var oss;
var osy;
var el=this.shadowTree.input;
_82e=el.scrollLeft;
_82f=el.scrollTop;
oss=el.selectionStart;
osy=el.selectionEnd;
var bfs=el.value.substr(0,el.selectionStart);
var bfsm=bfs.split(/\r|\n/g);
var spm=bfsm[bfsm.length-1].match(/^(\s)*/);
el.value=el.value.substr(0,el.selectionStart)+"\n"+spm[0]+el.value.substr(el.selectionEnd);
el.selectionStart=oss+1+spm[0].length;
el.selectionEnd=oss+1+spm[0].length;
el.scrollLeft=_82e;
el.scrollTop=_82f;
};
MozEditorTextBoxBinding.prototype._getSelectedText=function(){
var _836=this.shadowTree.input.value;
var _837=this.shadowTree.input.selectionStart;
var end=this.shadowTree.input.selectionEnd;
return _836.substr(_837,end-_837);
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
var _839=this.getProperty("isdisabled");
if(this.isDisabled||_839){
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
var _83b=this.getProperty("label");
var _83c=this.getProperty("value");
var _83d=this.getProperty("width");
var _83e=this.getProperty("onchange");
var _83f=this.getProperty("required")==true;
if(!this.type&&type){
this.type=type;
}
if(!this.label&&_83b!=null){
this.label=_83b;
}
if(!this.value&&_83c!=null){
this.value=_83c;
}
if(!this.width&&_83d){
this.width=_83d;
}
if(_83f){
this.isRequired=true;
}
if(_83e){
this.onValueChange=function(){
Binding.evaluate(_83e,this);
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
var _840=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_840.name=this.getName();
_840.value=this.getValue();
_840.type="hidden";
if(this.hasCallBackID()){
_840.id=this.getCallBackID();
}
this.shadowTree.input=_840;
this.bindingElement.appendChild(_840);
};
SelectorBinding.prototype.buildButton=function(){
var _841=this.BUTTON_IMPLEMENTATION;
var _842=this.add(_841.newInstance(this.bindingDocument));
if(this.imageProfile!=null){
_842.imageProfile=this.imageProfile;
}
if(this.width!=null){
_842.setWidth(this.width);
}
this._buttonBinding=_842;
this.shadowTree.button=_842;
_842.attach();
};
SelectorBinding.prototype.buildIndicator=function(){
var img=this.bindingDocument.createElement("img");
img.src=SelectorBinding.INDICATOR_IMAGE;
img.className="selectorindicatorimage";
this._buttonBinding.bindingElement.appendChild(img);
this.shadowTree.selectorindicatorimage=img;
};
SelectorBinding.prototype.buildPopup=function(){
var _844=top.app.bindingMap.selectorpopupset;
var doc=_844.bindingDocument;
var _846=_844.add(PopupBinding.newInstance(doc));
var _847=_846.add(MenuBodyBinding.newInstance(doc));
this._popupBinding=_846;
this._menuBodyBinding=_847;
this._popupBinding.attachClassName(SelectorBinding.CLASSNAME_POPUP);
this._popupBinding.attachRecursive();
this._popupBinding.type=PopupBinding.TYPE_FIXED;
_846.attachClassName("selectorpopup");
_846.addActionListener(PopupBinding.ACTION_SHOW,this);
_846.addActionListener(MenuItemBinding.ACTION_COMMAND,this);
_846.addActionListener(PopupBinding.ACTION_HIDE,this);
this._buttonBinding.setPopup(_846);
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
var _84a=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_84a).each(function(_84b){
var _84c=_84b.getAttribute("label");
var _84d=_84b.getAttribute("value");
var _84e=_84b.getAttribute("selected");
var _84f=_84b.getAttribute("image");
var _850=_84b.getAttribute("image-hover");
var _851=_84b.getAttribute("image-active");
var _852=_84b.getAttribute("image-disabled");
var _853=null;
if(_84f||_850||_851||_852){
_853=new ImageProfile({image:_84f,imageHover:_850,imageActive:_851,imageDisabled:_852});
}
list.add(new SelectorBindingSelection(_84c?_84c:null,_84d?_84d:null,_84e&&_84e=="true",_853));
});
return list;
};
SelectorBinding.prototype.populateFromList=function(list){
if(this.isAttached){
this.clear();
if(list.hasEntries()){
var _855=null;
while(list.hasNext()){
var _856=list.getNext();
var item=this.addSelection(_856);
if(!_855){
_855=item;
}
}
if(!this._selectedItemBinding){
this.select(_855,true);
}
this.shadowTree.selectorindicatorimage.style.display="block";
}else{
this.shadowTree.selectorindicatorimage.style.display="none";
}
}else{
throw "Could not populate unattached selector";
}
};
SelectorBinding.prototype.addSelection=function(_858,_859){
var _85a=this.MENUITEM_IMPLEMENTATION;
var _85b=this._menuBodyBinding;
var _85c=_85b.bindingDocument;
var _85d=_85a.newInstance(_85c);
_85d.imageProfile=_858.imageProfile;
_85d.setLabel(_858.label);
_85d.selectionValue=_858.value;
if(_858.isSelected){
this.select(_85d,true);
}
_858.menuItemBinding=_85d;
if(_859){
_85b.addFirst(_85d);
this.selections.addFirst(_858);
}else{
_85b.add(_85d);
this.selections.add(_858);
}
this._isUpToDate=false;
return _85d;
};
SelectorBinding.prototype.addSelectionFirst=function(_85e){
return this.addSelection(_85e,true);
};
SelectorBinding.prototype.clear=function(_85f){
this._selectedItemBinding=null;
if(this._popupBinding){
this._popupBinding.clear();
this.selections.clear();
if(!_85f&&this.defaultSelection!=null){
var _860=this.addSelection(this.defaultSelection);
this.select(_860,true);
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
SelectorBinding.prototype.setDisabled=function(_861){
if(this.isAttached==true){
var _862=this._buttonBinding;
this.shadowTree.selectorindicatorimage.style.display=_861?"none":"block";
_862.setDisabled(_861);
}
if(_861){
this.setProperty("isdisabled",true);
}else{
this.deleteProperty("isdisabled");
}
};
SelectorBinding.prototype.reset=function(_863){
if(this.defaultSelection!=null){
this.selectByValue(this.defaultSelection.value,_863);
}
};
SelectorBinding.prototype.handleAction=function(_864){
SelectorBinding.superclass.handleAction.call(this,_864);
switch(_864.type){
case ButtonBinding.ACTION_COMMAND:
this._onButtonCommand();
_864.consume();
break;
case PopupBinding.ACTION_SHOW:
this._onPopupShowing();
_864.consume();
break;
case MenuItemBinding.ACTION_COMMAND:
this._onMenuItemCommand(_864.target);
_864.consume();
break;
case PopupBinding.ACTION_HIDE:
var self=this;
setTimeout(function(){
if(self.isFocused){
self._grabKeyboard();
}
},0);
_864.consume();
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
SelectorBinding.prototype._onMenuItemCommand=function(_866){
this.select(_866);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
SelectorBinding.prototype._restoreSelection=function(){
if(this._selectedItemBinding){
this._selectedItemBinding.focus();
}
};
SelectorBinding.prototype._fitMenuToSelector=function(){
var _867=this._buttonBinding.bindingElement.offsetWidth+"px";
var _868=this._popupBinding.bindingElement;
if(Client.isMozilla==true){
_868.style.minWidth=_867;
}else{
_868.style.width=_867;
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
SelectorBinding.prototype.handleBroadcast=function(_86a,arg){
SelectorBinding.superclass.handleBroadcast.call(this,_86a,arg);
switch(_86a){
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
SelectorBinding.prototype.select=function(_86d,_86e){
var _86f=false;
if(_86d!=this._selectedItemBinding){
this._selectedItemBinding=_86d;
_86f=true;
var _870=this._buttonBinding;
this._selectionValue=_86d.selectionValue;
_870.setLabel(_86d.getLabel());
if(_86d.imageProfile!=null){
_870.imageProfile=_86d.imageProfile;
}
if(_870.imageProfile!=null){
_870.setImage(this.isDisabled==true?_870.imageProfile.getDisabledImage():_870.imageProfile.getDefaultImage());
}
this._updateImageLayout();
if(!_86e){
this.onValueChange();
this.dispatchAction(SelectorBinding.ACTION_SELECTIONCHANGED);
this.dirty();
}
if(!this._isValid||(this.isRequired&&!_86e)){
this.validate();
}
}
return _86f;
};
SelectorBinding.prototype._relate=function(){
var _871=this.getProperty("relate");
if(_871){
var _872=this.bindingDocument.getElementById(_871);
if(_872){
var _873=UserInterface.getBinding(_872);
if(_873){
if(this.isChecked){
_873.show();
}else{
_873.hide();
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
SelectorBinding.prototype.selectByValue=function(_874,_875){
var _876=false;
var _877=this._menuBodyBinding;
var _878=_877.getDescendantElementsByLocalName("menuitem");
while(_878.hasNext()){
var _879=UserInterface.getBinding(_878.getNext());
if(_879.selectionValue==_874){
_876=this.select(_879,_875);
break;
}
}
return _876;
};
SelectorBinding.prototype.getValue=function(){
var _87a=this._selectionValue;
if(_87a!=null){
_87a=String(_87a);
}
return _87a;
};
SelectorBinding.prototype.setValue=function(_87b){
this.selectByValue(String(_87b),true);
};
SelectorBinding.prototype.getResult=function(){
var _87c=this._selectionValue;
if(_87c=="null"){
_87c=null;
}
if(_87c){
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_87c=Number(_87c);
break;
}
}
return _87c;
};
SelectorBinding.prototype.setResult=function(_87d){
this.selectByValue(_87d,true);
};
SelectorBinding.prototype.validate=function(){
var _87e=true;
if(this.isRequired==true&&this.defaultSelection!=null){
var _87f=this.getValue();
if(_87f==this.defaultSelection.value){
_87e=false;
}
if(_87e!=this._isValid){
if(_87e){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_87e;
}
return _87e;
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
var _880=this._popupBinding;
if(!this._isUpToDate){
_880.attachRecursive();
this._isUpToDate=true;
}
};
SelectorBinding.newInstance=function(_881){
var _882=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_881);
return UserInterface.registerBinding(_882,SelectorBinding);
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
var _885=this.getProperty("onchange");
this.isRequired=this.getProperty("required")==true;
if(this.hasCallBackID()){
this._select.id=this.getCallBackID();
}
if(_885){
this.onValueChange=function(){
Binding.evaluate(_885,this);
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
SimpleSelectorBinding.prototype.focus=function(_888){
SimpleSelectorBinding.superclass.focus.call(this);
if(this.isFocused){
if(!_888){
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
SimpleSelectorBinding.prototype._hack=function(_889){
if(Client.isExplorer){
this._select.style.width=_889?"auto":this._cachewidth+"px";
if(_889){
if(this._select.offsetWidth<=this._cachewidth){
this._hack(false);
}
}
}
};
SimpleSelectorBinding.prototype.validate=function(){
var _88a=true;
if(this.isRequired){
if(this.getValue()==null){
_88a=false;
}
}
if(_88a!=this._isValid){
if(_88a){
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.attachClassName(DataBinding.CLASSNAME_INVALID);
var _88b=this._select;
var _88c=_88b.options[_88b.selectedIndex];
var text=DOMUtil.getTextContent(_88c);
_88b.blur();
_88b.style.color="#A40000";
_88b.style.fontWeight="bold";
if(!Client.isExplorer6){
DOMUtil.setTextContent(_88c,DataBinding.warnings["required"]);
}
_88b.onfocus=function(){
this.style.color="black";
this.style.fontWeight="normal";
this.onfocus=null;
if(!Client.isExplorer6){
DOMUtil.setTextContent(_88c,text);
}
};
}
this._isValid=_88a;
}
return _88a;
};
SimpleSelectorBinding.prototype.manifest=function(){
};
SimpleSelectorBinding.prototype.getValue=function(){
var _88e=null;
var _88f=this._select;
var _890=_88f.options[_88f.selectedIndex];
var _891=true;
if(Client.isExplorer){
var html=_890.outerHTML.toLowerCase();
if(html.indexOf("value=")==-1){
_891=false;
}
}
if(_891){
_88e=_890.getAttribute("value");
}
return _88e;
};
SimpleSelectorBinding.prototype.setValue=function(_893){
};
SimpleSelectorBinding.prototype.getResult=function(){
return this.getValue();
};
SimpleSelectorBinding.prototype.setResult=function(_894){
this.setValue(_894);
};
SimpleSelectorBinding.newInstance=function(_895){
var _896=DOMUtil.createElementNS(Constants.NS_XHTML,"select",_895);
return UserInterface.registerBinding(_896,SimpleSelectorBinding);
};
function SelectorBindingSelection(_897,_898,_899,_89a){
this._init(_897,_898,_899,_89a);
}
SelectorBindingSelection.prototype={label:null,value:null,isSelected:null,imageProfile:null,menuItemBinding:null,_init:function(_89b,_89c,_89d,_89e){
if(_89b!=null){
this.label=String(_89b);
}
if(_89c!=null){
this.value=String(_89c);
}
if(_89e!=null){
this.imageProfile=_89e;
}
this.isSelected=_89d?true:false;
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
var _89f=this.addFirst(ToolBarButtonBinding.newInstance(this.bindingDocument));
_89f.popupBindingTargetElement=this.shadowTree.input;
_89f.setImage(DataInputSelectorBinding.INDICATOR_IMAGE);
_89f.attach();
var self=this;
_89f.oncommand=function(){
self._attachSelections();
};
this._buttonBinding=_89f;
};
DataInputSelectorBinding.prototype.buildPopup=SelectorBinding.prototype.buildPopup;
DataInputSelectorBinding.prototype.buildSelections=function(){
var list=new List();
var _8a2=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_8a2).each(function(_8a3){
if(_8a3.getAttribute("label")){
throw "label not supported - use value property!";
}else{
var _8a4=_8a3.getAttribute("value");
var _8a5=_8a3.getAttribute("selected");
var _8a6=_8a3.getAttribute("tooltip");
list.add({value:_8a4?_8a4:null,toolTip:_8a6?_8a6:null,isSelected:(_8a5&&_8a5=="true")?true:false});
}
});
if(list.hasEntries()){
this.populateFromList(list);
}
};
DataInputSelectorBinding.prototype.populateFromList=function(list){
var _8a8=this._menuBodyBinding;
var _8a9=_8a8.bindingDocument;
while(_8a8.bindingElement.hasChildNodes()){
var node=_8a8.bindingElement.lastChild;
if(node.nodeType==Node.ELEMENT_NODE&&UserInterface.hasBinding(node)){
UserInterface.getBinding(node).dispose();
}else{
_8a8.removeChild(node);
}
}
if(list.hasEntries()){
this._isUpToDate=false;
if(!this._buttonBinding.isVisible){
this._buttonBinding.show();
}
while(list.hasNext()){
var _8ab=list.getNext();
var _8ac=MenuItemBinding.newInstance(_8a9);
_8ac.setLabel(_8ab.value);
_8ac.selectionValue=_8ab.value;
if(_8ab.toolTip){
_8ac.setToolTip(_8ab.toolTip);
}
if(_8ab.isSelected){
this.select(_8ac,true);
}
_8a8.add(_8ac);
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
DataInputSelectorBinding.prototype._onMenuItemCommand=function(_8ad){
this.select(_8ad);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
DataInputSelectorBinding.prototype.handleBroadcast=function(_8ae,arg){
SelectorBinding.prototype.handleBroadcast.call(this,_8ae,arg);
switch(_8ae){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(arg!=this._buttonBinding){
DataInputSelectorBinding.superclass.handleBroadcast.call(this,_8ae,arg);
}
break;
}
};
DataInputSelectorBinding.prototype._grabKeyboard=SelectorBinding.prototype._grabKeyboard;
DataInputSelectorBinding.prototype._releaseKeyboard=SelectorBinding.prototype._releaseKeyboard;
DataInputSelectorBinding.prototype._handleArrowKey=SelectorBinding.prototype._handleArrowKey;
DataInputSelectorBinding.prototype.focus=function(_8b0){
if(!this.isFocused){
DataInputSelectorBinding.superclass.focus.call(this,_8b0);
if(this.isFocused==true){
this._grabKeyboard();
}
}
};
DataInputSelectorBinding.prototype.blur=function(_8b1){
if(this.isFocused==true){
DataInputSelectorBinding.superclass.blur.call(this,_8b1);
this._releaseKeyboard();
if(this._popupBinding.isVisible){
this._popupBinding.hide();
}
}
};
DataInputSelectorBinding.prototype._fitMenuToSelector=function(){
var _8b2=this.bindingElement.offsetWidth+"px";
var _8b3=this._popupBinding.bindingElement;
if(Client.isMozilla){
_8b3.style.minWidth=_8b2;
}else{
_8b3.style.width=_8b2;
}
};
DataInputSelectorBinding.prototype._restoreSelection=function(){
if(!this._isUpToDate){
this._attachSelections();
}
var _8b4=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
var _8b5=this.getValue();
var _8b6=null;
_8b4.each(function(item){
if(item.getLabel()==_8b5){
_8b6=item;
}
});
if(_8b6){
_8b6.focus();
}
};
DataInputSelectorBinding.prototype.select=function(item,_8b9){
if(item!=this._selectedItemBinding){
this._selectedItemBinding=item;
this.setValue(item.selectionValue);
if(!_8b9){
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
var _8ba=ToolBarButtonBinding.newInstance(this.bindingDocument);
_8ba.setImage("${icon:popup}");
this.addFirst(_8ba);
_8ba.attach();
var self=this;
_8ba.oncommand=function(){
self._isButtonClicked=true;
setTimeout(function(){
self._isButtonClicked=false;
},1000);
var _8bc=self.getProperty("handle");
var _8bd=ViewDefinitions[_8bc];
if(_8bd instanceof DialogViewDefinition){
_8bd.handler={handleDialogResponse:function(_8be,_8bf){
self._isButtonClicked=false;
if(_8be==Dialog.RESPONSE_ACCEPT){
self.logger.debug("Usecase scenario was hardcoded into DataInputDialogBinding#buildButton");
var _8c0=_8bf.getFirst();
self.setValue(_8c0);
self.validate(true);
}
self.focus();
}};
_8bd.argument.selectedResult=self.getValue();
StageBinding.presentViewDefinition(_8bd);
}else{
throw "Definition was either undefine or of a non-dialog type.";
}
};
DOMEvents.addEventListener(_8ba.getBindingElement(),DOMEvents.MOUSEDOWN,{handleEvent:function(e){
self._isButtonClicked=true;
}});
this._dialogButtonBinding=_8ba;
};
DataInputDialogBinding.prototype.oncommand=function(){
var _8c2=this._dialogButtonBinding;
if(_8c2!=null){
_8c2.oncommand();
}
};
DataInputDialogBinding.prototype.validate=function(arg){
var _8c4=true;
if(this._isButtonClicked==true){
this._isButtonClicked=false;
}else{
_8c4=DataInputDialogBinding.superclass.validate.call(this,arg);
}
return _8c4;
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
var _8c5=this.getProperty("label");
var _8c6=this.getProperty("tooltip");
this._buttonBinding=this.add(ClickButtonBinding.newInstance(this.bindingDocument));
if(_8c5!=null){
if(this.getProperty("handle")!=null||this.getProperty("url")!=null){
this._buttonBinding.setLabel(_8c5+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}else{
this._buttonBinding.setLabel(_8c5);
}
}
if(this.imageProfile){
this._buttonBinding.imageProfile=this.imageProfile;
}
if(_8c6!=null){
this._buttonBinding.setToolTip(_8c6);
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
DataDialogBinding.prototype.handleAction=function(_8c8){
DataDialogBinding.superclass.handleAction.call(this,_8c8);
var _8c9=_8c8.target;
var self=this;
switch(_8c8.type){
case ButtonBinding.ACTION_COMMAND:
if(this._handler==null){
this._handler={handleDialogResponse:function(_8cb,_8cc){
if(_8cb==Dialog.RESPONSE_ACCEPT){
if(_8cc instanceof DataBindingMap){
self._map=_8cc;
}else{
throw "Invalid dialog result";
}
}
}};
}
if(_8c9==this._buttonBinding){
_8c8.consume();
this.focus();
this.fireCommand();
}
break;
}
};
DataDialogBinding.prototype.handleBroadcast=function(_8cd,arg){
DataDialogBinding.superclass.handleBroadcast.call(this,_8cd,arg);
switch(_8cd){
case BroadcastMessages.KEY_SPACE:
this.fireCommand();
break;
}
};
DataDialogBinding.prototype.fireCommand=function(def){
this.dispatchAction(this.constructor.ACTION_COMMAND);
var _8d0=this.getProperty("handle");
var url=this.getURL();
var _8d2=null;
if(_8d0!=null||def!=null){
if(_8d0!=null){
_8d2=ViewDefinitions[_8d0];
}else{
_8d2=def;
}
if(_8d2 instanceof DialogViewDefinition){
_8d2.handler=this._handler;
if(this._map!=null){
_8d2.argument=this._map;
}
StageBinding.presentViewDefinition(_8d2);
}
}else{
if(url!=null){
_8d2=Dialog.invokeModal(url,this._handler,this._map);
}
}
if(_8d2!=null){
this._dialogViewHandle=_8d2.handle;
this._releaseKeyboard();
}
};
DataDialogBinding.prototype.setLabel=function(_8d3){
this.setProperty("label",_8d3);
if(this.isAttached){
this._buttonBinding.setLabel(_8d3+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}
};
DataDialogBinding.prototype.setImage=function(_8d4){
this.setProperty("image",_8d4);
if(this.imageProfile!=null){
this.imageProfile.setDefaultImage(_8d4);
if(this._buttonBinding!=null){
this._buttonBinding.imageProfile=this.imageProfile;
this._buttonBinding.setImage(this._buttonBinding.imageProfile.getDefaultImage());
}
}
};
DataDialogBinding.prototype.setToolTip=function(_8d5){
this.setProperty("tooltip",_8d5);
if(this.isAttached){
this._buttonBinding.setToolTip(_8d5);
}
};
DataDialogBinding.prototype.setHandle=function(_8d6){
this.setProperty("handle",_8d6);
};
DataDialogBinding.prototype.setURL=function(url){
this.setProperty("url",url);
};
DataDialogBinding.prototype.getURL=function(){
return this.getProperty("url");
};
DataDialogBinding.prototype.setHandler=function(_8d8){
this._handler=_8d8;
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
DataDialogBinding.newInstance=function(_8da){
var _8db=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_8da);
return UserInterface.registerBinding(_8db,DataDialogBinding);
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
this._handler={handleDialogResponse:function(_8dd,_8de){
if(_8dd==Dialog.RESPONSE_ACCEPT){
self._onDialogAccept(_8de);
}else{
self._onDialogCancel();
}
}};
};
PostBackDataDialogBinding.prototype._onDialogAccept=function(_8df){
_8df=new String(_8df);
this.dirty();
this.setValue(encodeURIComponent(_8df));
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
var _8e3=this.getValue();
if(_8e3==null){
_8e3="";
}
this.shadowTree.dotnetinput.value=_8e3;
};
PostBackDataDialogBinding.prototype.setValue=function(_8e4){
this.setProperty("value",_8e4);
};
PostBackDataDialogBinding.prototype.getValue=function(){
return this.getProperty("value");
};
PostBackDataDialogBinding.prototype.getResult=function(){
return null;
};
PostBackDataDialogBinding.prototype.setResult=function(_8e5){
};
PostBackDataDialogBinding.newInstance=function(_8e6){
var _8e7=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_8e6);
return UserInterface.registerBinding(_8e7,PostBackDataDialogBinding);
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
var _8e8=this.getProperty("dialoglabel");
var _8e9=this.getProperty("providersearch");
var key=this.getProperty("providerkey");
var _8eb=this.getProperty("handle");
if(_8eb!=null){
var def=ViewDefinition.clone(_8eb,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_8e8!=null){
if(def.argument==null){
def.argument={};
}
def.argument.label=_8e8;
}
if(_8e9!=null){
if(def.argument==null){
def.argument={};
}
if(def.argument.nodes==null){
def.argument.nodes=[];
}
def.argument.nodes[0].search=_8e9;
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
ViewDefinitionPostBackDataDialogBinding.newInstance=function(_8ed){
var _8ee=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_8ed);
return UserInterface.registerBinding(_8ee,ViewDefinitionPostBackDataDialogBinding);
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
this.propertyMethodMap["value"]=function(_8f0){
self._datathing.setValue(_8f0);
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
var _8f3=self.getValue();
if(_8f3==""||_8f3==null){
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
var _8f4=this.getProperty("value");
var _8f5=this.getProperty("selectorlabel");
if(_8f5==null){
_8f5=NullPostBackDataDialogBinding.LABEL_DEFAULT;
}
var list=new List();
list.add(new SelectorBindingSelection(NullPostBackDataDialogBinding.LABEL_NULL,NullPostBackDataDialogBinding.VALUE_NULL,_8f4==null));
list.add(new SelectorBindingSelection(_8f5+LabelBinding.DIALOG_INDECATOR_SUFFIX,NullPostBackDataDialogBinding.VALUE_SELECTED,_8f4!=null,new ImageProfile({image:"${icon:popup}"})));
this._selector.master=this;
this._selector.attach();
this._selector.populateFromList(list);
var _8f4=this.getValue();
if(_8f4==""||_8f4==null){
this._selector.setLabel(NullPostBackDataDialogBinding.LABEL_NULL);
}else{
this._selector.setLabel(this.getLabel());
}
};
NullPostBackDataDialogBinding.prototype.handleAction=function(_8f7){
NullPostBackDataDialogBinding.superclass.handleAction.call(this,_8f7);
switch(_8f7.type){
case PageBinding.ACTION_DOPOSTBACK:
if(_8f7.target==this._datathing){
var _8f8=this.getProperty("label");
this._selector.setLabel("");
this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
var self=this;
setTimeout(function(){
if(self.getProperty("label")==_8f8){
self._selector.setLabel(_8f8);
}
},500);
_8f7.consume();
}
break;
}
};
NullPostBackDataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
NullPostBackDataDialogBinding.prototype.setLabel=function(_8fa){
this.setProperty("label",_8fa);
if(this._selector!=null){
this._selector.setLabel(_8fa);
}
};
NullPostBackDataDialogBinding.prototype.getValue=function(){
return this._datathing.getValue();
};
NullPostBackDataDialogBinding.prototype.setValue=function(_8fb){
this._datathing.setValue(_8fb);
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
NullPostBackDataDialogSelectorBinding.prototype.select=function(_8fc,_8fd){
if(NullPostBackDataDialogSelectorBinding.superclass.select.call(this,_8fc,_8fd)){
this._buttonBinding.setImage(null);
this._updateImageLayout();
if(this._selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
if(this.master.getValue()!=null){
}
}
}
};
NullPostBackDataDialogSelectorBinding.prototype.setLabel=function(_8fe){
this._buttonBinding.setLabel(_8fe);
};
NullPostBackDataDialogSelectorBinding.prototype.setToolTip=function(_8ff){
this._buttonBinding.setToolTip(_8ff);
};
NullPostBackDataDialogSelectorBinding.prototype.handleAction=function(_900){
NullPostBackDataDialogSelectorBinding.superclass.handleAction.call(this,_900);
switch(_900.type){
case MenuItemBinding.ACTION_COMMAND:
var _901=_900.target;
var _902=this.master;
if(_901.selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
this.setLabel(_901.getLabel());
setTimeout(function(){
_902.action();
},0);
}else{
this.master.setValue("");
}
_902.dirty();
break;
}
};
NullPostBackDataDialogSelectorBinding.prototype.manifest=function(){
};
NullPostBackDataDialogSelectorBinding.newInstance=function(_903){
var _904=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_903);
return UserInterface.registerBinding(_904,NullPostBackDataDialogSelectorBinding);
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
var _905=this._dataDialogBinding;
if(_905!=null){
DOMEvents.addEventListener(this.shadowTree.box,DOMEvents.DOUBLECLICK,{handleEvent:function(){
_905.fireCommand();
}});
}
};
MultiSelectorBinding.prototype._buildDOMContent=function(){
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
this.bindingElement.appendChild(this.shadowTree.box);
};
MultiSelectorBinding.prototype._parseDOMProperties=function(){
var _906=this.getProperty("editable");
var _907=this.getProperty("selectable");
var _908=this.getProperty("display");
if(_906!=false){
this._buildEditorButton();
}else{
this.isEditable=false;
}
if(_907){
this.isSelectable=true;
this._selectionMap=new Map();
}
if(_908){
this._display=_908;
}
};
MultiSelectorBinding.prototype._buildEditorButton=function(){
if(this.isEditable){
var _909=MultiSelectorDataDialogBinding.newInstance(this.bindingDocument);
_909.selections=this.selections;
this.add(_909);
_909.attach();
this._dataDialogBinding=_909;
this.shadowTree.datadialog=_909;
}
};
MultiSelectorBinding.prototype.populateFromList=function(list){
list.reset();
var _90b=false;
this.shadowTree.box.innerHTML="";
while(list.hasNext()){
var _90c=list.getNext();
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_90b=_90c.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_90b=_90c.isSelected!=true;
break;
}
if(_90b){
this.shadowTree.box.appendChild(this._getElementForSelection(_90c));
}
}
this.selections=list;
if(this._dataDialogBinding){
this._dataDialogBinding.selections=this.selections;
}
};
MultiSelectorBinding.prototype.cumulateFromList=function(list,_90e){
var box=this.shadowTree.box;
var _910=false;
if(list.hasEntries()){
list.reverse().reset();
while(list.hasNext()){
var _911=list.getNext();
if(_90e){
_911.isSelected=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
_910=true;
}else{
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_910=_911.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_910=_911.isSelected!=true;
break;
}
}
if(_910){
var _912=this._getElementForSelection(_911);
box.insertBefore(_912,box.firstChild);
CSSUtil.attachClassName(_912,"selected");
this._selectionMap.set(_911.value,_912);
}
}
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
};
MultiSelectorBinding.prototype._getElementForSelection=function(_913){
var _914=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument);
_914.appendChild(this.bindingDocument.createTextNode(_913.label));
_914.setAttribute("label",_913.label);
_914.setAttribute("value",_913.value);
return _914;
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
var _916=DOMEvents.getTarget(e);
var _917=DOMUtil.getLocalName(_916);
if(_917=="div"){
this._handleMouseDown(_916);
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
break;
}
};
MultiSelectorBinding.prototype._handleMouseDown=function(_918){
if(Keyboard.isShiftPressed&&this._lastSelectedElement){
var _919=this._getElements();
var _91a=_918.getAttribute("value");
var _91b=this._lastSelectedElement.getAttribute("value");
var _91c=false;
while(_919.hasNext()){
var el=_919.getNext();
switch(el.getAttribute("value")){
case _91a:
case _91b:
_91c=!_91c;
break;
}
if(_91c){
this._hilite(el);
}else{
this._unhilite(el);
}
this._hilite(this._lastSelectedElement);
this._hilite(_918);
}
}else{
if(Keyboard.isControlPressed&&this._isHilited(_918)){
this._unhilite(_918);
}else{
this._hilite(_918);
}
if(!Keyboard.isControlPressed){
var self=this;
this._getElements().each(function(el){
if(el!=_918){
self._unhilite(el);
}
});
}
}
this._lastSelectedElement=_918;
};
MultiSelectorBinding.prototype._hilite=function(_920){
var _921=_920.getAttribute("value");
if(!this._selectionMap.has(_921)){
CSSUtil.attachClassName(_920,"selected");
this._selectionMap.set(_921,_920);
}
};
MultiSelectorBinding.prototype._unhilite=function(_922){
var _923=_922.getAttribute("value");
if(this._selectionMap.has(_923)){
CSSUtil.detachClassName(_922,"selected");
this._selectionMap.del(_923);
}
};
MultiSelectorBinding.prototype._isHilited=function(_924){
return CSSUtil.hasClassName(_924,"selected");
};
MultiSelectorBinding.prototype.handleAction=function(_925){
MultiSelectorBinding.superclass.handleAction.call(this,_925);
var _926=_925.target;
switch(_925.type){
case DataDialogBinding.ACTION_COMMAND:
if(_926==this._dataDialogBinding){
if(!this.isFocused){
this.focus();
}
this.dispatchAction(MultiSelectorBinding.ACTION_COMMAND);
_925.consume();
}
break;
case MultiSelectorDataDialogBinding.ACTION_RESULT:
this.populateFromList(_926.result);
this.dirty();
_926.result=null;
_925.consume();
break;
}
};
MultiSelectorBinding.prototype.extractSelected=function(){
var _927=null;
if(this.isSelectable){
_927=new List();
if(this._selectionMap&&this._selectionMap.hasEntries()){
var self=this;
this._getElements().each(function(_929){
if(self._isHilited(_929)){
_929.parentNode.removeChild(_929);
_927.add(new SelectorBindingSelection(_929.getAttribute("label"),_929.getAttribute("value"),true));
}
});
this._selectionMap=new Map();
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
return _927;
};
MultiSelectorBinding.prototype.reposition=function(isUp){
var _92b=this._getElements();
if(!isUp){
_92b.reverse();
}
var _92c=true;
while(_92c&&_92b.hasNext()){
var _92d=_92b.getNext();
if(this._isHilited(_92d)){
switch(isUp){
case true:
if(_92d.previousSibling){
_92d.parentNode.insertBefore(_92d,_92d.previousSibling);
}else{
_92c=false;
}
break;
case false:
if(_92d.nextSibling){
_92d.parentNode.insertBefore(_92d,_92d.nextSibling.nextSibling);
}else{
_92c=false;
}
break;
}
}
}
};
MultiSelectorBinding.prototype.toSelectionList=function(){
var _92e=new List();
var _92f=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
var self=this;
this._getElements().each(function(_931){
var _932=new SelectorBindingSelection(_931.getAttribute("label"),_931.getAttribute("value"),_92f);
_932.isHighlighted=self._isHilited(_931);
_92e.add(_932);
});
return _92e;
};
MultiSelectorBinding.prototype._getElements=function(){
return new List(DOMUtil.getElementsByTagName(this.shadowTree.box,"div"));
};
MultiSelectorBinding.prototype._getSelectionsList=SelectorBinding.prototype._getSelectionsList;
MultiSelectorBinding.prototype.validate=function(){
return true;
};
MultiSelectorBinding.prototype.manifest=function(){
var _933=new List(DOMUtil.getElementsByTagName(this.bindingElement,"input"));
if(_933.hasEntries()){
_933.each(function(_934){
_934.parentNode.removeChild(_934);
});
}
this.selections.reset();
while(this.selections.hasNext()){
var _935=this.selections.getNext();
if(_935.isSelected){
var _936=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_936.name=this._name;
_936.value=_935.value;
this.bindingElement.appendChild(_936);
}
}
};
MultiSelectorBinding.prototype.getValue=function(){
return "HEJ!";
};
MultiSelectorBinding.prototype.setValue=function(_937){
alert(_937);
};
MultiSelectorBinding.prototype.getResult=function(){
alert("TODO: MultiSelectorBinding#getResult");
return new Array();
};
MultiSelectorBinding.prototype.setResult=function(_938){
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
var _939={label:DataBinding.getAssociatedLabel(this),value:decodeURIComponent(this.getValue()),configuration:{"formattingconfiguration":this.getProperty("formattingconfiguration"),"elementclassconfiguration":this.getProperty("elementclassconfiguration"),"configurationstylesheet":this.getProperty("configurationstylesheet"),"presentationstylesheet":this.getProperty("presentationstylesheet"),"embedablefieldstypenames":this.getProperty("embedablefieldstypenames")}};
var _93a=ViewDefinitions["Composite.Management.VisualEditorDialog"];
_93a.handler=this._handler;
_93a.argument=_939;
StageBinding.presentViewDefinition(_93a);
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
var _93b={label:DataBinding.getAssociatedLabel(this),selections:this.selections};
var self=this;
var _93d={handleDialogResponse:function(_93e,_93f){
if(_93e==Dialog.RESPONSE_ACCEPT){
self.result=_93f;
self.dispatchAction(MultiSelectorDataDialogBinding.ACTION_RESULT);
}
}};
var _940=ViewDefinitions[this._dialogViewHandle];
_940.handler=_93d;
_940.argument=_93b;
StageBinding.presentViewDefinition(_940);
};
MultiSelectorDataDialogBinding.newInstance=function(_941){
var _942=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_941);
return UserInterface.registerBinding(_942,MultiSelectorDataDialogBinding);
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
LazyBindingBinding.wakeUp=function(_943){
var id=_943.bindingElement.id+LazyBindingBinding.ID_APPENDIX;
var _945=_943.bindingDocument.getElementById(id);
if(_945!=null){
var _946=UserInterface.getBinding(_945);
_946.setResult(true);
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
var _948=this.bindingDocument.getElementById(id);
if(_948!=null){
var _949=UserInterface.getBinding(_948);
if(_949&&!_949.isAttached){
_949.isLazy=true;
}else{
_948.setAttribute("lazy",true);
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
LazyBindingBinding.prototype.setResult=function(_94a){
this._isLazy=_94a;
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
var _94c=this.getProperty("stateprovider");
var _94d=this.getProperty("handle");
if(_94c!=null&&_94d!=null){
url=url.replace("${stateprovider}",_94c).replace("${handle}",_94d);
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
EditorDataBinding.prototype._onPageInitialize=function(_94e){
EditorDataBinding.superclass._onPageInitialize.call(this,_94e);
if(this._pageBinding!=null){
Application.unlock(this);
this._coverBinding.hide();
}
};
EditorDataBinding.prototype.setName=DataBinding.prototype.setName;
EditorDataBinding.prototype.validate=function(){
return this._pageBinding.validateAllDataBindings();
};
EditorDataBinding.prototype.handleAction=function(_94f){
EditorDataBinding.superclass.handleAction.call(this,_94f);
switch(_94f.type){
case Binding.ACTION_DIRTY:
if(_94f.target!=this){
if(!this.isDirty){
this.dirty();
}
_94f.consume();
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
EditorDataBinding.prototype.setValue=function(_950){
};
EditorDataBinding.prototype.getResult=function(){
return null;
};
EditorDataBinding.prototype.setResult=function(_951){
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
var _955=true;
if(this.getProperty("required")){
var fake=this.getDescendantBindingByLocalName("datainput");
_955=fake.getValue()!="";
}
if(!_955&&this._isValid){
this._isValid=false;
this.dispatchAction(Binding.ACTION_INVALID);
}else{
if(_955&&!this._isValid){
this.dispatchAction(Binding.ACTION_VALID);
}
}
return _955;
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
var _959=this.bindingDocument.getElementById(RequestBinding.INPUT_ID);
if(_959!=null){
_959.value=Application.CONSOLE_ID;
}
};
RequestBinding.prototype.postback=function(_95a){
_95a=_95a!=null?_95a:EditorPageBinding.message;
this.shadowTree.dotnetinput.value=_95a;
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
var _95b=Templates.getTemplateElementText("fieldgroupmatrix.xml");
var _95c=_95b.replace("MARKUP",this.bindingElement.innerHTML);
try{
this.bindingElement.innerHTML=_95c;
}
catch(exception1){
this.logger.error("Exeption in innerHTML!");
_95c=_95c.replace(/\&nbsp;/g,"");
this.bindingElement.innerHTML=_95c;
}
var self=this;
var _95e=DOMUtil.getElementsByTagName(this.bindingElement,"table").item(0);
new List(_95e.rows).each(function(row){
new List(row.cells).each(function(cell){
self.shadowTree[cell.className]=cell;
});
});
};
FieldGroupBinding.prototype._buildDOMContent=function(){
var _961=this.getProperty("label");
if(_961){
this.setLabel(_961);
}else{
this.attachClassName(FieldGroupBinding.CLASSNAME_NOLABEL);
}
};
FieldGroupBinding.prototype.setLabel=function(_962){
this.setProperty("label",_962);
if(this.shadowTree.labelBinding==null){
var _963=LabelBinding.newInstance(this.bindingDocument);
var cell=this.shadowTree[FieldGroupBinding.NORTH];
_963.attachClassName("fieldgrouplabel");
cell.insertBefore(_963.bindingElement,cell.getElementsByTagName("div").item(1));
_963.attach();
this.shadowTree.labelBinding=_963;
}
this.shadowTree.labelBinding.setLabel(Resolver.resolve(_962));
};
FieldGroupBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
FieldGroupBinding.prototype.add=function(_965){
this.shadowTree[FieldGroupBinding.CENTER].appendChild(_965.bindingElement);
return _965;
};
FieldGroupBinding.prototype.addFirst=function(_966){
var _967=this.shadowTree[FieldGroupBinding.CENTER];
_967.insertBefore(_966.bindingElement,_967.firstChild);
return _966;
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
var _968=this.getProperty("relation");
if(_968!=null){
this.bindingRelation=_968;
this.subscribe(BroadcastMessages.BINDING_RELATE);
this.hide();
}
};
FieldBinding.prototype.handleBroadcast=function(_969,arg){
FieldBinding.superclass.handleBroadcast.call(this,_969,arg);
switch(_969){
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
FieldBinding.newInstance=function(_96b){
var _96c=DOMUtil.createElementNS(Constants.NS_UI,"ui:field",_96b);
return UserInterface.registerBinding(_96c,FieldBinding);
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
var _96d=this.getDescendantBindingByLocalName("fieldgroup");
if(_96d!=null){
_96d.attachClassName(FieldGroupBinding.CLASSNAME_FIRST);
}
};
FieldsBinding.prototype.onBindingDispose=function(){
FieldsBinding.superclass.onBindingDispose.call(this);
if(this._invalidCount>0){
this.dispatchAction(Binding.ACTION_VALID);
}
};
FieldsBinding.prototype.validate=function(){
var _96e=true;
var _96f=this.getDescendantBindingsByLocalName("*");
while(_96f.hasNext()){
var _970=_96f.getNext();
if(Interfaces.isImplemented(IData,_970)){
var _971=_970.validate();
if(_96e&&!_971){
_96e=false;
}
}
}
return _96e;
};
FieldsBinding.prototype.handleAction=function(_972){
FieldsBinding.superclass.handleAction.call(this,_972);
var _973=_972.target;
if(_973!=this){
switch(_972.type){
case Binding.ACTION_INVALID:
var _974=DataBinding.getAssociatedLabel(_973);
if(_974){
this._invalidFieldLabels.set(_973.key,_974);
}
if(_973.error){
if(!_973.isInvalidBecauseRequired){
ErrorBinding.presentError({text:_973.error},_973);
}
}
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_INVALID);
}
this._invalidCount++;
_972.consume();
break;
case Binding.ACTION_VALID:
if(this._invalidFieldLabels.has(_973.key)){
this._invalidFieldLabels.del(_973.key);
}
this._invalidCount--;
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_VALID);
}
_972.consume();
break;
}
}
};
FieldsBinding.prototype.getInvalidLabels=function(){
var _975=null;
if(this._invalidFieldLabels.hasEntries()){
_975=this._invalidFieldLabels.toList();
}
return _975;
};
FieldsBinding.newInstance=function(_976){
var _977=DOMUtil.createElementNS(Constants.NS_UI,"ui:fields",_976);
return UserInterface.registerBinding(_977,FieldsBinding);
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
var _978=this.getProperty("image");
if(_978){
this.setImage(_978);
}
var _979=this.getProperty("tooltip");
if(_979){
this.setToolTip(_979);
}
var _97a=this.getProperty("label");
if(_97a){
this.setLabel(_97a);
}
};
FieldDescBinding.prototype.attachDOMEvents=function(){
this.addEventListener(DOMEvents.CLICK);
};
FieldDescBinding.prototype.handleEvent=function(e){
FieldDescBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.CLICK:
var _97c=this.getAncestorBindingByLocalName("field");
if(_97c){
var _97d=true;
_97c.getDescendantBindingsByLocalName("*").each(function(_97e){
if(Interfaces.isImplemented(IData,_97e)){
_97e.focus();
_97d=false;
}
return _97d;
});
}
break;
}
};
FieldDescBinding.prototype.setLabel=function(_97f){
this.setProperty("label",_97f);
if(this.isAttached){
this.bindingElement.innerHTML=Resolver.resolve(_97f);
}
};
FieldDescBinding.prototype.getLabel=function(){
var _980=this.getProperty("label");
if(!_980){
var node=this.bindingElement.firstChild;
if(node&&node.nodeType==Node.TEXT_NODE){
_980=node.data;
}
}
return _980;
};
FieldDescBinding.prototype.setImage=function(_982){
this.setProperty("image",_982);
if(this.isAttached){
throw "FieldDescBinding: Images not suppoerted!";
}
};
FieldDescBinding.prototype.setToolTip=function(_983){
this.setProperty("tooltip",_983);
if(this.isAttached){
this.bindingElement.title=_983;
}
};
FieldDescBinding.newInstance=function(_984){
var _985=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddesc",_984);
return UserInterface.registerBinding(_985,FieldDescBinding);
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
FieldDataBinding.newInstance=function(_986){
var _987=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddata",_986);
return UserInterface.registerBinding(_987,FieldDataBinding);
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
var _988=this._fieldHelpPopupBinding;
if(_988){
_988.dispose();
}
};
FieldHelpBinding.prototype.buildPopupBinding=function(){
var _989=app.bindingMap.fieldhelpopupset;
var doc=_989.bindingDocument;
var _98b=_989.add(PopupBinding.newInstance(doc));
var _98c=_98b.add(PopupBodyBinding.newInstance(doc));
_98b.position=PopupBinding.POSITION_RIGHT;
_98b.attachClassName("fieldhelppopup");
if(this.bindingElement.hasChildNodes()){
_98c.bindingElement.innerHTML=this.bindingElement.innerHTML;
}else{
var _98d=this.getProperty("label");
if(_98d){
_98c.bindingElement.innerHTML=Resolver.resolve(_98d);
}
}
this.bindingElement.innerHTML="";
this._fieldHelpPopupBinding=_98b;
};
FieldHelpBinding.prototype.buildPopupButton=function(){
var _98e=this.getAncestorBindingByLocalName("field");
if(_98e){
_98e.attachClassName("fieldhelp");
var _98f=ClickButtonBinding.newInstance(this.bindingDocument);
_98f.attachClassName("fieldhelp");
_98f.setImage(FieldHelpBinding.INDICATOR_IMAGE);
this.add(_98f);
_98f.attach();
var self=this;
_98f.oncommand=function(){
self.attachPopupBinding();
};
_98f.setPopup(this._fieldHelpPopupBinding);
this._fieldHelpButton=_98f;
}
};
FieldHelpBinding.prototype.attachPopupBinding=function(){
var _991=this._fieldHelpPopupBinding;
if(_991&&!_991.isAttached){
_991.attachRecursive();
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
RadioDataGroupBinding.prototype.handleAction=function(_993){
RadioDataGroupBinding.superclass.handleAction.call(this,_993);
switch(_993.type){
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
RadioDataGroupBinding.prototype.handleBroadcast=function(_995,arg){
RadioDataGroupBinding.superclass.handleBroadcast.call(this,_995,arg);
switch(_995){
case BroadcastMessages.KEY_ARROW:
var _997=null;
var next=null;
var _999=null;
switch(arg){
case KeyEventCodes.VK_DOWN:
case KeyEventCodes.VK_UP:
_999=this.getChildBindingsByLocalName("radio");
while(!_997&&_999.hasNext()){
var _99a=_999.getNext();
if(_99a.getProperty("ischecked")){
_997=_99a;
}
}
break;
}
if(_997){
switch(arg){
case KeyEventCodes.VK_DOWN:
next=_999.getFollowing(_997);
while(next!=null&&next.isDisabled){
next=_999.getFollowing(next);
}
break;
case KeyEventCodes.VK_UP:
next=_999.getPreceding(_997);
while(next!=null&&next.isDisabled){
next=_999.getPreceding(next);
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
RadioDataGroupBinding.prototype.focus=function(_99b){
if(!this.isFocused){
DataBinding.prototype.focus.call(this);
if(this.isFocused){
if(!_99b){
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
var _99c=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_99c.type="hidden";
_99c.name=this._name;
this.bindingElement.appendChild(_99c);
this.shadowTree.input=_99c;
}
this.shadowTree.input.value=this.getValue();
}
};
RadioDataGroupBinding.prototype.getValue=function(){
var _99d=null;
var _99e=this.getChildBindingsByLocalName("radio");
while(!_99d&&_99e.hasNext()){
var _99f=_99e.getNext();
if(_99f.isChecked){
_99d=_99f.getProperty("value");
}
}
return _99d;
};
RadioDataGroupBinding.prototype.getResult=RadioDataGroupBinding.prototype.getValue;
RadioDataGroupBinding.prototype.setValue=function(_9a0){
};
RadioDataGroupBinding.prototype.setResult=function(_9a1){
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
this.propertyMethodMap["checked"]=function(_9a2){
if(_9a2!=this.isChecked){
this.setChecked(_9a2,true);
}
};
this.propertyMethodMap["checksum"]=function(){
var _9a3=this.getProperty("ischecked");
if(_9a3!=this.isChecked){
this.setChecked(_9a3,true);
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
var _9a4=this.getProperty("relate");
var _9a5=this.getProperty("oncommand");
if(_9a4){
this.bindingRelate=_9a4;
this.relate();
}
if(_9a5){
this.oncommand=function(){
Binding.evaluate(_9a5,this);
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
var _9a7=this.getCallBackID();
this._buttonBinding.check=function(_9a8){
RadioButtonBinding.prototype.check.call(this,_9a8);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
};
this._buttonBinding.uncheck=function(_9a9){
RadioButtonBinding.prototype.uncheck.call(this,_9a9);
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
RadioDataBinding.prototype.setChecked=function(_9aa,_9ab){
this._buttonBinding.setChecked(_9aa,_9ab);
if(this.bindingRelate!=null){
this.relate();
}
this.setProperty("ischecked",_9aa);
};
RadioDataBinding.prototype.check=function(_9ac){
this.setChecked(true,_9ac);
};
RadioDataBinding.prototype.uncheck=function(_9ad){
this.setChecked(false,_9ad);
};
RadioDataBinding.prototype.setDisabled=function(_9ae){
if(_9ae!=this.isDisabled){
this.isDisabled=_9ae;
this._buttonBinding.setDisabled(_9ae);
if(_9ae){
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
var _9b0=DOMEvents.getTarget(e);
switch(_9b0){
case this.shadowTree.labelText:
if(!this.isChecked&&!this.isDisabled){
this.check();
}
break;
}
}
};
RadioDataBinding.prototype._buildLabelText=function(){
var _9b1=this.getProperty("label");
if(_9b1){
this.shadowTree.labelText=DOMUtil.createElementNS(Constants.NS_UI,"ui:datalabeltext",this.bindingDocument);
this.shadowTree.labelText.appendChild(this.bindingDocument.createTextNode(Resolver.resolve(_9b1)));
DOMEvents.addEventListener(this.shadowTree.labelText,DOMEvents.CLICK,this);
this.bindingElement.appendChild(this.shadowTree.labelText);
}
};
RadioDataBinding.prototype.setLabel=function(_9b2){
if(this.shadowTree.labelText!=null){
this.shadowTree.labelText.firstChild.data=_9b2;
}
this.setProperty("label",_9b2);
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
this.propertyMethodMap["checked"]=function(_9b3){
if(_9b3!=this.isChecked){
this.setChecked(_9b3,true);
}
};
this.propertyMethodMap["checksum"]=function(){
var _9b4=this.getProperty("ischecked");
if(_9b4!=this.isChecked){
this.setChecked(_9b4,true);
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
var _9b6=DOMEvents.getTarget(e);
switch(_9b6){
case this.shadowTree.labelText:
this.setChecked(!this.isChecked);
break;
}
}
};
CheckBoxBinding.prototype.relate=RadioDataBinding.prototype.relate;
CheckBoxBinding.prototype.handleBroadcast=function(_9b7,arg){
CheckBoxBinding.superclass.handleBroadcast.call(this,_9b7,arg);
switch(_9b7){
case BroadcastMessages.KEY_SPACE:
this.setChecked(!this.isChecked);
break;
}
};
CheckBoxBinding.prototype._buildButtonBinding=function(){
this._buttonBinding=this.add(CheckButtonBinding.newInstance(this.bindingDocument));
var self=this;
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_9ba){
_9ba.consume();
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
var _9bc=this.getCallBackID();
this._buttonBinding.check=function(_9bd){
ButtonBinding.prototype.check.call(this,_9bd);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
if(!_9bd){
self.focus();
}
};
this._buttonBinding.uncheck=function(_9be){
ButtonBinding.prototype.uncheck.call(this,_9be);
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
if(_9bc!=null){
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
var _9bf=true;
var _9c0=this.bindingElement.parentNode;
if(_9c0){
var _9c1=UserInterface.getBinding(_9c0);
if(_9c1&&_9c1 instanceof CheckBoxGroupBinding){
if(_9c1.isRequired){
if(_9c1.isValid){
_9bf=_9c1.validate();
}else{
_9bf=false;
}
}
}
}
return _9bf;
};
CheckBoxBinding.prototype.manifest=function(){
if(this.isAttached){
switch(this.isChecked){
case true:
if(!this.shadowTree.input){
var _9c2=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_9c2.type="hidden";
_9c2.name=this._name;
_9c2.style.display="none";
this.bindingElement.appendChild(_9c2);
this.shadowTree.input=_9c2;
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
var _9c3=null;
var _9c4=this.getProperty("value");
if(this.isChecked){
_9c3=_9c4?_9c4:"on";
}
return _9c3;
};
CheckBoxBinding.prototype.setValue=function(_9c5){
if(_9c5==this.getValue()||_9c5=="on"){
this.check(true);
}else{
if(_9c5!="on"){
this.setPropety("value",_9c5);
}
}
};
CheckBoxBinding.prototype.getResult=function(){
var _9c6=false;
if(this.isChecked){
_9c6=this._result!=null?this._result:true;
}
return _9c6;
};
CheckBoxBinding.prototype.setResult=function(_9c7){
if(typeof _9c7=="boolean"){
this.setChecked(_9c7,true);
}else{
this._result=_9c7;
}
};
CheckBoxBinding.newInstance=function(_9c8){
var _9c9=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbox",_9c8);
return UserInterface.registerBinding(_9c9,CheckBoxBinding);
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
var _9ca=true;
if(this.isRequired){
var _9cb=this.getDescendantBindingsByLocalName("checkbox");
if(_9cb.hasEntries()){
_9ca=false;
while(_9cb.hasNext()&&!_9ca){
if(_9cb.getNext().isChecked){
_9ca=true;
}
}
}
if(_9ca==false){
this._showWarning(true);
this.dispatchAction(Binding.ACTION_INVALID);
this.addActionListener(CheckBoxBinding.ACTION_COMMAND);
}
}
return _9ca;
};
CheckBoxGroupBinding.prototype._showWarning=function(_9cc){
if(_9cc){
if(!this._labelBinding){
var _9cd=LabelBinding.newInstance(this.bindingDocument);
_9cd.attachClassName("invalid");
_9cd.setImage("${icon:error}");
_9cd.setLabel("Selection required");
this._labelBinding=this.addFirst(_9cd);
this._labelBinding.attach();
}
}else{
if(this._labelBinding){
this._labelBinding.dispose();
this._labelBinding=null;
}
}
};
CheckBoxGroupBinding.prototype.handleAction=function(_9ce){
CheckBoxGroupBinding.superclass.handleAction.call(this,_9ce);
switch(_9ce.type){
case CheckBoxBinding.ACTION_COMMAND:
this._showWarning(false);
this.dispatchAction(Binding.ACTION_VALID);
this.removeActionListener(CheckBoxBinding.ACTION_COMMAND);
break;
}
};
CheckBoxGroupBinding.newInstance=function(_9cf){
var _9d0=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkboxgroup",_9cf);
return UserInterface.registerBinding(_9d0,CheckBoxGroupBinding);
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
var _9d1=DialogControlBinding.newInstance(this.bindingDocument);
_9d1.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_9d1);
this._controlGroupBinding.attachRecursive();
var _9d2=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloonspeak",this.bindingDocument);
this.bindingElement.appendChild(_9d2);
var _9d3=this.getLabel();
if(_9d3!=null){
this.setLabel(_9d3);
}
};
BalloonBinding.prototype.onBindingDispose=function(){
BalloonBinding.superclass.onBindingDispose.call(this);
if(this._updateInterval){
window.clearInterval(this._updateInterval);
this._updateInterval=null;
}
var _9d4=this._snapTargetBinding;
if(Binding.exists(_9d4)==true){
_9d4.removeActionListener(Binding.ACTION_BLURRED,this);
_9d4.removeActionListener(Binding.ACTION_VALID,this);
}
};
BalloonBinding.prototype.snapTo=function(_9d5){
if(Interfaces.isImplemented(IData,_9d5)){
this._snapTargetBinding=_9d5;
var _9d6=_9d5.dispatchAction(BalloonBinding.ACTION_INITIALIZE);
if(_9d6&&_9d6.isConsumed){
this._environmentBinding=_9d6.listener;
}
if(this._environmentBinding){
_9d5.addActionListener(Binding.ACTION_BLURRED,this);
_9d5.addActionListener(Binding.ACTION_VALID,this);
this.subscribe(BroadcastMessages.VIEW_CLOSED);
var self=this;
this._updateInterval=window.setInterval(function(){
if(Binding.exists(_9d5)==true){
self._updatePosition();
}else{
self.dispose();
}
},BalloonBinding.TIMEOUT);
_9d5.dispatchAction(BalloonBinding.ACTION_SNAP);
}else{
throw "No environment fit for balloons!";
}
}
};
BalloonBinding.prototype._updatePosition=function(){
var _9d8=this._snapTargetBinding;
var _9d9=this._environmentBinding;
var root=UserInterface.getBinding(_9d8.bindingDocument.body);
if(Binding.exists(_9d8)&&Binding.exists(_9d9)){
if(!root.isActivated){
if(this.isVisible==true){
this.hide();
}
}else{
if(_9d8.isAttached&&_9d9.isAttached){
var _9db=_9d8.boxObject.getUniversalPosition();
var _9dc=_9d9.boxObject.getUniversalPosition();
_9dc.y+=_9d9.bindingElement.scrollTop;
_9dc.x+=_9d9.bindingElement.scrollLeft;
var tDim=_9d8.boxObject.getDimension();
var eDim=_9d9.boxObject.getDimension();
var _9df=false;
if(_9db.y+tDim.h<_9dc.y){
_9df=true;
}else{
if(_9db.x+tDim.w<_9dc.x){
_9df=true;
}else{
if(_9db.y>_9dc.y+eDim.h){
_9df=true;
}else{
if(_9db.x>_9dc.x+eDim.w){
_9df=true;
}
}
}
}
if(!_9df){
this._setComputedPosition(_9db,_9dc,tDim,eDim);
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
BalloonBinding.prototype._setComputedPosition=function(_9e0,_9e1,tDim,eDim){
var wDim=WindowManager.getWindowDimensions();
var bDim=this._getDimension();
var _9e6=_9e0;
var _9e7=false;
if(_9e0.x+tDim.w+bDim.w+BalloonBinding.OFFSET_X>=wDim.w){
_9e7=true;
}else{
if(_9e0.x+tDim.w>=_9e1.x+eDim.w){
_9e7=true;
}
}
if(_9e7){
_9e6.x-=(bDim.w+BalloonBinding.OFFSET_X);
this.attachClassName(BalloonBinding.CLASSNAME_LEFT);
}else{
_9e6.x+=tDim.w+BalloonBinding.OFFSET_X;
this.detachClassName(BalloonBinding.CLASSNAME_LEFT);
}
_9e6.y-=(bDim.h);
_9e6.y+=BalloonBinding.OFFSET_Y;
this._setPosition(_9e6);
};
BalloonBinding.prototype.handleBroadcast=function(_9e8,arg){
BalloonBinding.superclass.handleBroadcast.call(this,_9e8,arg);
switch(_9e8){
case BroadcastMessages.VIEW_CLOSED:
if(this._isAssociatedView(arg)==true){
this.dispose();
}
break;
}
};
BalloonBinding.prototype._isAssociatedView=function(_9ea){
var _9eb=false;
if(this._snapTargetBinding){
var view=this._snapTargetBinding.getAncestorBindingByType(ViewBinding,true);
if(view&&view.getHandle()==_9ea){
_9eb=true;
}
}
return _9eb;
};
BalloonBinding.prototype._setPosition=function(_9ed){
var _9ee=false;
var pos=this.boxObject.getLocalPosition();
if(this._point!=null){
if(pos.x!=this._point.x||pos.y!=this._point.y){
_9ee=true;
}
}
if(!_9ee){
this.bindingElement.style.left=_9ed.x+"px";
this.bindingElement.style.top=_9ed.y+"px";
this._point=_9ed;
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
BalloonBinding.prototype.handleAction=function(_9f0){
BalloonBinding.superclass.handleAction.call(this,_9f0);
var _9f1=_9f0.target;
switch(_9f0.type){
case Binding.ACTION_ACTIVATED:
if(this._snapTargetBinding){
this._snapTargetBinding.dispatchAction(Binding.ACTION_ACTIVATED);
_9f0.consume();
}
case Binding.ACTION_BLURRED:
case Binding.ACTION_VALID:
if(_9f1==this._snapTargetBinding){
var self=this;
setTimeout(function(){
if(!Binding.exists(_9f1)){
self.dispose();
}else{
if(_9f1.validate()){
var _9f3=true;
if(_9f0.type==Binding.ACTION_BLURRED){
var root=_9f1.bindingDocument.body;
var bind=UserInterface.getBinding(root);
if(!root.isActivated){
_9f3=false;
}
}
if(_9f3){
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
BalloonBinding.prototype.setLabel=function(_9f6){
if(this.isAttached==true){
if(!this._isTableIndexed){
this._indexTable();
}
var _9f7=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloontext",this.bindingDocument);
var text=this.bindingDocument.createTextNode(_9f6);
_9f7.appendChild(text);
this.shadowTree[MatrixBinding.CENTER].appendChild(_9f7);
}
this.setProperty("label",_9f6);
};
BalloonBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
BalloonBinding.newInstance=function(_9f9){
var _9fa=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloon",_9f9);
var _9fb=UserInterface.registerBinding(_9fa,BalloonBinding);
_9fb.hide();
return _9fb;
};
ErrorBinding.prototype=new Binding;
ErrorBinding.prototype.constructor=ErrorBinding;
ErrorBinding.superclass=Binding.prototype;
ErrorBinding.ACTION_INITIALIZE="error initialize";
ErrorBinding.presentError=function(_9fc,_9fd){
if(Interfaces.isImplemented(IData,_9fd)==true){
var _9fe,_9ff=_9fd.dispatchAction(ErrorBinding.ACTION_INITIALIZE);
if(_9ff&&_9ff.isConsumed){
switch(_9ff.listener.constructor){
case StageBinding:
_9fe=false;
break;
case StageDialogBinding:
_9fe=true;
break;
}
}
var _a00=_9fe?top.app.bindingMap.dialogballoonset:top.app.bindingMap.balloonset;
var _a01=_a00.add(BalloonBinding.newInstance(top.app.document));
_a01.setLabel(_9fc.text);
_a01.snapTo(_9fd);
_a01.attach();
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
var _a02=this.bindingWindow.DataManager;
var text=this.getProperty("text");
var name=this.getProperty("targetname");
var _a05=_a02.getDataBinding(name);
if(_a05){
ErrorBinding.presentError({text:text},_a05);
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
FocusBinding.focusElement=function(_a06){
var _a07=true;
try{
_a06.focus();
Application.focused(true);
}
catch(exception){
var _a08=UserInterface.getBinding(_a06);
var _a09=SystemLogger.getLogger("FocusBinding.focusElement");
_a09.warn("Could not focus "+(_a08?_a08.toString():String(_a06)));
_a07=false;
}
return _a07;
};
FocusBinding.focusedBinding=null;
FocusBinding.activeInstance=null;
FocusBinding.getCachedFocus=function(_a0a){
var win=_a0a.bindingWindow;
var id=_a0a.bindingElement.id;
return {getBinding:function(){
var _a0d=null;
try{
if(Binding.exists(_a0a)){
_a0d=win.bindingMap[id];
}
}
catch(exception){
}
return _a0d;
}};
};
FocusBinding.navigateNext=function(_a0e){
if(Binding.exists(FocusBinding.activeInstance)){
FocusBinding.activeInstance.focusNext(_a0e);
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
var _a0f=this.dispatchAction(FocusBinding.ACTION_ATTACHED);
if(_a0f&&_a0f.isConsumed){
if(_a0f.listener.isStrongFocusManager){
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
FocusBinding.prototype.handleAction=function(_a10){
FocusBinding.superclass.handleAction.call(this,_a10);
var _a11=_a10.target;
var _a12=null;
if(this._isFocusManager){
switch(_a10.type){
case FocusBinding.ACTION_ATTACHED:
if(_a11!=this){
this._isUpToDate=false;
}
_a10.consume();
break;
case FocusBinding.ACTION_UPDATE:
if(_a11!=this){
this._isUpToDate=false;
_a10.consume();
}
break;
case FocusBinding.ACTION_BLUR:
if(Application.isOperational){
_a12=new FocusCrawler();
_a12.mode=FocusCrawler.MODE_BLUR;
_a12.crawl(_a11.bindingElement);
if(this._cachedFocus!=null){
this._cachedFocus=null;
}
}
_a10.consume();
break;
case FocusBinding.ACTION_FOCUS:
if(Application.isOperational&&_a11!=this){
_a12=new FocusCrawler();
_a12.mode=FocusCrawler.MODE_FOCUS;
_a12.crawl(_a11.bindingElement);
}
_a10.consume();
break;
case Binding.ACTION_FOCUSED:
if(Interfaces.isImplemented(IFocusable,_a11)){
this.claimFocus();
this._onFocusableFocused(_a11);
}
_a10.consume();
break;
case Binding.ACTION_BLURRED:
if(Interfaces.isImplemented(IFocusable,_a11)){
this._onFocusableBlurred(_a11);
}
_a10.consume();
break;
}
}
};
FocusBinding.prototype.focusNext=function(_a13){
var _a14=null;
var list=this._getFocusableList();
if(list.reset().hasEntries()){
while(_a14==null&&list.hasNext()){
var _a16=list.getNext();
if(this._cachedFocus&&_a16==this._cachedFocus.getBinding()){
_a14=_a16;
}
}
if(_a14!=null){
if(_a16.isFocused){
var next=_a13?list.getPreceding(_a14):list.getFollowing(_a14);
if(!next){
next=_a13?list.getLast():list.getFirst();
}
next.focus();
}else{
_a14.focus();
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
var _a18=new FocusCrawler();
var list=new List();
_a18.mode=FocusCrawler.MODE_INDEX;
_a18.crawl(this.bindingElement,list);
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
var _a1c=this._cachedFocus.getBinding();
if(_a1c&&!_a1c.isFocused){
_a1c.focus();
}
}
};
FocusBinding.prototype._onFocusableFocused=function(_a1d){
if(_a1d!=FocusBinding.focusedBinding){
if(FocusBinding.focusedBinding!=null){
if(Binding.exists(FocusBinding.focusedBinding)){
FocusBinding.focusedBinding.blur();
}
}
FocusBinding.focusedBinding=_a1d;
_a1d.setProperty(FocusBinding.MARKER,true);
this._cachedFocus=FocusBinding.getCachedFocus(_a1d);
}
};
FocusBinding.prototype._onFocusableBlurred=function(_a1e){
_a1e.deleteProperty(FocusBinding.MARKER);
if(_a1e==FocusBinding.focusedBinding){
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
TabsButtonBinding.prototype.show=function(_a20){
this.bindingElement.style.left=_a20+"px";
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
TabsButtonBinding.prototype.registerHiddenTabBinding=function(_a21){
this.hiddenTabBindings.add(_a21);
};
TabsButtonBinding.prototype.fireCommand=function(){
if(this.isChecked&&!this.isPopulated){
this.hiddenTabBindings.reset();
while(this.hiddenTabBindings.hasNext()){
var _a22=this.hiddenTabBindings.getNext();
var item=MenuItemBinding.newInstance(this.popupBinding.bindingDocument);
item.setLabel(_a22.getLabel());
item.setImage(_a22.getImage());
item.associatedTabBinding=_a22;
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
TabsButtonBinding.prototype.handleAction=function(_a25){
TabsButtonBinding.superclass.handleAction.call(this,_a25);
switch(_a25.type){
case PopupBinding.ACTION_HIDE:
this.popupBinding.removeActionListener(PopupBinding.ACTION_HIDE,this);
var _a26=this.selectedTabBinding;
if(_a26){
this.containingTabBoxBinding.moveToOrdinalPosition(_a26,0);
this.containingTabBoxBinding.select(_a26);
}
_a25.consume();
break;
}
};
TabsButtonBinding.newInstance=function(_a27){
var _a28=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_a27);
_a28.setAttribute("type","checkbox");
_a28.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_a28.className="tabbutton";
return UserInterface.registerBinding(_a28,TabsButtonBinding);
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
var _a29=TabBoxBinding.currentActiveInstance;
if(_a29!=null&&Binding.exists(_a29)){
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
var _a2a=this.getTabElements().getLength();
var _a2b=this.getTabPanelElements().getLength();
if(!this._tabsElement||!this._tabPanelsElement){
throw new Error(this.toString()+" DOM subtree invalid.");
}else{
if(_a2a!=_a2b){
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
var _a2c=this.getTabPanelElements();
while(_a2c.hasNext()){
this._setupWarningSystem(UserInterface.getBinding(_a2c.getNext()));
}
if(this.isEqualSize){
this.enforceEqualSize();
this.dispatchAction(PageBinding.ACTION_UNBLOCK_INIT);
}
this.dispatchAction(TabBoxBinding.ACTION_ATTACHED);
TabBoxBinding.superclass.onBindingInitialize.call(this);
};
TabBoxBinding.prototype.buildDOMContent=function(){
var _a2d=DOMUtil.getOrdinalPosition(this._tabsElement);
var _a2e=DOMUtil.getOrdinalPosition(this._tabPanelsElement);
var _a2f=_a2d>_a2e?"tabsbelow":"tabsontop";
this.attachClassName(_a2f);
};
TabBoxBinding.prototype._TEMPNAME=function(){
var tabs=this.getTabElements();
var _a31=this.getTabPanelElements();
var _a32=null;
var _a33=this.getProperty("selectedindex");
if(_a33!=null){
if(_a33>tabs.getLength()-1){
throw "Selectedindex out of range";
}
}
if(tabs.hasEntries()){
var _a34=0;
while(tabs.hasNext()){
var tab=tabs.getNext();
var _a36=_a31.getNext();
this.registerTabBoxPair(tab,_a36);
if(_a33&&_a34==_a33){
tab.setAttribute("selected","true");
}else{
if(tab.getAttribute("selected")=="true"){
_a32=tab;
}
}
_a34++;
}
if(!_a32){
_a32=tabs.getFirst();
_a32.setAttribute("selected","true");
}
}
};
TabBoxBinding.prototype.enforceEqualSize=function(_a37){
var _a38=null;
var _a39=null;
if(this.isEqualSize){
var _a3a=CSSComputer.getPadding(this._tabPanelsElement);
var max=0,_a3c=this.getTabPanelElements();
_a3c.each(function(_a3d){
max=_a3d.offsetHeight>max?_a3d.offsetHeight:max;
});
_a39=max+_a3a.top+_a3a.bottom;
if(_a37&&this._tabPanelsElement.style.height!=null){
_a38=this._tabPanelsElement.offsetHeight;
}
if(_a38!=null||_a39>_a38){
this._tabPanelsElement.style.height=_a39+"px";
}
}
};
TabBoxBinding.prototype._setupWarningSystem=function(_a3e){
_a3e._invalidCount=0;
_a3e.addActionListener(Binding.ACTION_INVALID,this);
_a3e.addActionListener(Binding.ACTION_VALID,this);
_a3e.addActionListener(BalloonBinding.ACTION_SNAP,this);
};
TabBoxBinding.prototype.handleAction=function(_a3f){
TabBoxBinding.superclass.handleAction.call(this,_a3f);
var _a40=_a3f.target;
var _a41=_a3f.listener;
switch(_a3f.type){
case Binding.ACTION_ATTACHED:
break;
case Binding.ACTION_DETACHED:
if(_a40.constructor==this._impl_tab){
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
_a3f.consume();
}
break;
case PageBinding.ACTION_INITIALIZED:
if(_a40.isDialogSubPage&&this.isEqualSize){
this.enforceEqualSize();
}
break;
case Binding.ACTION_INVALID:
_a41._invalidCount++;
if(_a41._invalidCount==1){
var self=this;
setTimeout(function(){
if(!_a41.isSelected){
self._showWarning(_a41,true);
}
},0);
}
break;
case Binding.ACTION_VALID:
if(_a41._invalidCount>0){
_a41._invalidCount--;
if(_a41._invalidCount==0){
if(_a41.isSelected){
this._showWarning(_a41,false);
}
}
}
break;
case BalloonBinding.ACTION_SNAP:
this._showBalloon(_a41,true);
break;
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FOCUSED:
if(_a3f._tabboxstamp==null){
TabBoxBinding.currentActiveInstance=this;
_a3f._tabboxstamp="stamped";
}
break;
}
};
TabBoxBinding.prototype.handleEvent=function(e){
TabBoxBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.AFTERUPDATE:
var _a44=DOMEvents.getTarget(e);
if(_a44==this.bindingDocument.documentElement){
if(this._hasBastardUpdates){
this._hasBastardUpdates=false;
var tabs=this.getTabElements();
var _a46=this.getTabPanelElements();
tabs.each(function(tab,_a48){
if(tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY)==null){
var _a49=_a46.get(_a48);
this.registerTabBoxPair(tab,_a49);
}
},this);
var _a4a=this._tabBoxPairs;
for(var key in _a4a){
var tab=_a4a[key].tab;
if(tab.parentNode==null){
this.unRegisterTabBoxPair(tab);
}
}
}
}else{
if(!this._hasBastardUpdates){
var name=DOMUtil.getLocalName(_a44);
switch(_a44.__updateType){
case Update.TYPE_INSERT:
switch(name){
case this._nodename_tab:
case this._nodename_tabpanel:
var _a4e=_a44.parentNode;
if(_a4e==this._tabsElement||_a4e==this._tabPanelsElement){
this._hasBastardUpdates=true;
}
break;
}
break;
case Update.TYPE_REMOVE:
switch(name){
case this._nodename_tabs:
case this._nodename_tabpanels:
if(_a44==this._tabsElement||_a44==this._tabPanelsElement){
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
TabBoxBinding.prototype.select=function(arg,_a50){
var _a51=this.getBindingForArgument(arg);
if(_a51!=null&&!_a51.isSelected){
if(this._selectedTabBinding!=null){
this._selectedTabBinding.unselect();
this.getTabPanelBinding(this._selectedTabBinding).unselect();
}
this.dispatchAction(TabBoxBinding.ACTION_UNSELECTED);
_a51.select(_a50);
this.getTabPanelBinding(_a51).select(_a50);
var _a52=this.getProperty("selectedindex");
if(_a52!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_a51.bindingElement,true));
}
this._selectedTabBinding=_a51;
this.dispatchAction(TabBoxBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
if(_a51.getImage()==TabBoxBinding.BALLOON_TAB_IMAGE){
var _a53=this.getTabPanelBinding(_a51);
this._showBalloon(_a53,false);
}
}
};
TabBoxBinding.prototype.registerTabBoxPair=function(tab,_a55){
var key=KeyMaster.getUniqueKey();
tab.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
_a55.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
this._tabBoxPairs[key]={tab:tab,tabPanel:_a55};
};
TabBoxBinding.prototype.unRegisterTabBoxPair=function(tab){
var key=tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY);
delete this._tabBoxPairs[key];
};
TabBoxBinding.prototype.getTabPanelBinding=function(_a59){
var _a5a=null;
try{
var key=_a59.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _a5c=this._tabBoxPairs[key].tabPanel;
_a5a=UserInterface.getBinding(_a5c);
}
catch(exception){
this.logger.error(exception);
SystemDebug.stack(arguments);
}
return _a5a;
};
TabBoxBinding.prototype.getTabBinding=function(_a5d){
var key=_a5d.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _a5f=this._tabBoxPairs[key].tab;
return UserInterface.getBinding(_a5f);
};
TabBoxBinding.prototype.summonTabBinding=function(){
return TabBinding.newInstance(this.bindingDocument);
};
TabBoxBinding.prototype.summonTabPanelBinding=function(){
var _a60=this._impl_tabpanel.newInstance(this.bindingDocument);
this._setupWarningSystem(_a60);
return _a60;
};
TabBoxBinding.prototype.appendTabByBindings=function(_a61,_a62){
var _a63=_a61.bindingElement;
_a61.setProperty("selected",true);
var _a64=this.summonTabPanelBinding();
var _a65=_a64.bindingElement;
if(_a62){
_a65.appendChild(_a62 instanceof Binding?_a62.bindingElement:_a62);
}
this.registerTabBoxPair(_a63,_a65);
UserInterface.getBinding(this._tabsElement).add(_a61);
this._tabPanelsElement.appendChild(_a65);
_a61.attach();
UserInterface.getBinding(_a65).attachRecursive();
this.updateType=TabBoxBinding.UPDATE_ATTACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
return _a61;
};
TabBoxBinding.prototype.importTabBinding=function(_a66){
var that=_a66.containingTabBoxBinding;
var _a68=that.getTabPanelBinding(_a66);
var _a69=_a68.getBindingElement();
var _a6a=_a66.getBindingElement();
that.dismissTabBinding(_a66);
this._tabsElement.appendChild(_a6a);
this._tabPanelsElement.appendChild(_a69);
this.registerTabBoxPair(_a6a,_a69);
_a66.containingTabBoxBinding=this;
this.select(_a66);
this.dispatchAction(Binding.ACTION_ACTIVATED);
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.removeTab=function(_a6b){
var _a6c=null;
if(_a6b.isSelected){
_a6c=this.getBestTab(_a6b);
this._selectedTabBinding=null;
}
var _a6d=this.getTabPanelBinding(_a6b);
this.unRegisterTabBoxPair(_a6b.bindingElement);
_a6b.dispose();
_a6d.dispose();
if(_a6c!=null){
this.select(_a6c);
}
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.dismissTabBinding=function(_a6e){
if(_a6e.isSelected){
this.selectBestTab(_a6e);
}
};
TabBoxBinding.prototype.selectBestTab=function(_a6f){
var _a70=this.getBestTab(_a6f);
if(_a70){
this.select(_a70);
}else{
this._selectedTabBinding=null;
}
};
TabBoxBinding.prototype.getBestTab=function(_a71){
var _a72=null;
var _a73=_a71.getOrdinalPosition(true);
var _a74=this.getTabBindings();
var _a75=_a74.getLength();
var _a76=_a75-1;
if(_a75==1){
_a72=null;
}else{
if(_a73==_a76){
_a72=_a74.get(_a73-1);
}else{
_a72=_a74.get(_a73+1);
}
}
return _a72;
};
TabBoxBinding.prototype.moveToOrdinalPosition=function(_a77,_a78){
var _a79=this.bindingDocument.getElementById(_a77.bindingElement.id);
var tab=this.getTabElements().get(_a78);
this._tabsElement.insertBefore(_a79,tab);
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
var _a7b=this._nodename_tab;
var _a7c=new List(this._tabsElement.childNodes);
var _a7d=new List();
while(_a7c.hasNext()){
var _a7e=_a7c.getNext();
if(_a7e.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_a7e)==_a7b){
_a7d.add(_a7e);
}
}
return _a7d;
};
TabBoxBinding.prototype.getTabPanelElements=function(){
var _a7f=this._nodename_tabpanel;
var _a80=new List(this._tabPanelsElement.childNodes);
var _a81=new List();
_a80.each(function(_a82){
if(_a82.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_a82)==_a7f){
_a81.add(_a82);
}
});
return _a81;
};
TabBoxBinding.prototype.getTabsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabs);
};
TabBoxBinding.prototype.getTabPanelsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabpanels);
};
TabBoxBinding.prototype.getTabBindings=function(){
var _a83=new List();
var _a84=this.getTabElements();
_a84.each(function(_a85){
_a83.add(UserInterface.getBinding(_a85));
});
return _a83;
};
TabBoxBinding.prototype.getTabPanelBindings=function(){
var _a86=new List();
this.getTabPanelElements().each(function(_a87){
_a86.add(UserInterface.getBinding(_a87));
});
return _a86;
};
TabBoxBinding.prototype.getSelectedTabBinding=function(){
return this._selectedTabBinding;
};
TabBoxBinding.prototype.getSelectedTabPanelBinding=function(){
var _a88=null;
if(this._selectedTabBinding){
_a88=this.getTabPanelBinding(this._selectedTabBinding);
}
return _a88;
};
TabBoxBinding.prototype._showWarning=function(_a89,_a8a){
var _a8b=this.getTabBinding(_a89);
if(_a8a){
if(_a8b.labelBinding.hasImage){
_a8b._backupImage=_a8b.getImage();
}
_a8b.setImage(TabBoxBinding.INVALID_TAB_IMAGE);
}else{
if(_a8b._backupImage){
_a8b.setImage(_a8b._backupImage);
}else{
_a8b.setImage(false);
}
}
};
TabBoxBinding.prototype._showBalloon=function(_a8c,_a8d){
var _a8e=this.getTabBinding(_a8c);
if((_a8d&&!_a8e.isSelected)||!_a8d){
if(_a8e.getImage()!=TabBoxBinding.INVALID_TAB_IMAGE){
if(_a8d){
if(_a8e.labelBinding.hasImage){
_a8e._backupImage=_a8e.getImage();
}
_a8e.setImage(TabBoxBinding.BALLOON_TAB_IMAGE);
}else{
if(_a8e._backupImage!=null){
_a8e.setImage(_a8e._backupImage);
}else{
_a8e.setImage(false);
}
}
}
}
};
TabBoxBinding.prototype.advanceSelection=function(_a8f){
var tab=this.getSelectedTabBinding();
var tabs=this.getTabBindings();
var _a92=tab.getOrdinalPosition(true);
var next=null;
var _a94=new List();
tabs.each(function(t){
if(t.isVisible){
_a94.add(t);
}
});
if(_a94.getLength()>1){
if(_a92==0&&!_a8f){
next=_a94.getLast();
}else{
if(_a92==_a94.getLength()-1&&_a8f){
next=_a94.getFirst();
}else{
if(_a8f){
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
var _a97=this.constructor.TABBUTTON_IMPLEMENTATION;
this.tabsButtonBinding=_a97.newInstance(this.bindingDocument);
this.shadowTree.tabsButton=this.tabsButtonBinding;
this.add(this.tabsButtonBinding);
this.tabsButtonBinding.attach();
};
TabsBinding.prototype.handleAction=function(_a98){
TabsBinding.superclass.handleAction.call(this,_a98);
switch(_a98.type){
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
var _a9b=self.bindingElement.offsetWidth;
if(_a9b!=self._cachedOffsetWidth){
self.manage();
}
self._cachedOffsetWidth=_a9b;
}
}
setTimeout(manage,0);
}
};
TabsBinding.prototype.add=function(_a9c){
if(_a9c instanceof TabBinding){
if(this.tabsButtonBinding&&this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
return TabsBinding.superclass.add.call(this,_a9c);
};
TabsBinding.prototype.manage=function(){
if(Binding.exists(this)==true&&this.isVisible){
this.isManaging=true;
var _a9d=false;
var _a9e,tab,tabs=this.containingTabBoxBinding.getTabElements();
var _aa1=this.constructor.TABBUTTON_IMPLEMENTATION;
var _aa2=this.bindingElement.offsetWidth-_aa1.RESERVED_SPACE;
var _aa3=null;
var sum=0,_aa5=0;
var _aa6=true;
if(tabs.hasEntries()){
this.tabsButtonBinding.reset();
while(tabs.hasNext()&&_aa6){
tab=tabs.getNext();
_a9e=UserInterface.getBinding(tab);
if(!_aa3){
_aa3=_a9e;
}
sum+=tab.offsetWidth;
if(sum>=_aa2){
_a9d=true;
if(_a9e.isSelected){
if(!DOMUtil.isFirstElement(_a9e.bindingElement,true)){
this.isManaging=false;
if(_aa3){
_aa3.hide();
if(this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
this.containingTabBoxBinding.moveToOrdinalPosition(_a9e,_aa5-1);
_aa6=false;
}
}else{
_a9e.hide();
this.tabsButtonBinding.registerHiddenTabBinding(_a9e);
}
}else{
_a9e.show();
_aa3=_a9e;
_aa5++;
}
}
if(_aa6){
if(_a9d&&this.tabsButtonBinding.hiddenTabBindings.hasEntries()){
var _aa7=_aa3.getBindingElement();
var _aa8=_aa7.offsetLeft+_aa7.offsetWidth;
var _aa9=this.tabsButtonBinding;
setTimeout(function(){
_aa9.show(_aa8+4);
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
var _aaa=TabBinding.superclass.serialize.call(this);
if(_aaa){
_aaa.label=this.getLabel();
_aaa.image=this.getImage();
_aaa.tooltip=this.getToolTip();
}
return _aaa;
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
var _aab=this.bindingElement.getAttribute("image");
var _aac=this.bindingElement.getAttribute("label");
var _aad=this.bindingElement.getAttribute("tooltip");
this.bindingElement.className="default";
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.shadowTree.labelBinding=this.labelBinding;
this.labelBinding.attachClassName("tablabel");
this.add(this.labelBinding);
if(_aac){
this.setLabel(_aac);
}
if(_aab){
this.setImage(_aab);
}
if(_aad){
this.setToolTip(_aad);
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
TabBinding.prototype.setLabel=function(_aaf){
if(_aaf!=null){
this.setProperty("label",_aaf);
if(this.isAttached){
this.labelBinding.setLabel(_aaf);
}
}
};
TabBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
TabBinding.prototype.setToolTip=function(_ab0){
if(_ab0){
this.setProperty("tooltip",_ab0);
if(this.isAttached){
this.labelBinding.setToolTip(_ab0);
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
var _ab2=false;
if(Client.isMozilla==true){
}
if(!_ab2){
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
TabBinding.prototype.select=function(_ab3){
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
TabBinding.newInstance=function(_ab4){
var _ab5=DOMUtil.createElementNS(Constants.NS_UI,"ui:tab",_ab4);
return UserInterface.registerBinding(_ab5,TabBinding);
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
var _ab6=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(dim2==null||!Dimension.isEqual(dim1,dim2)){
_ab6=true;
this._lastKnownDimension=dim1;
}
return _ab6;
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
TabPanelBinding.prototype.select=function(_ab9){
if(!this.isSelected){
if(this.isLazy){
this.wakeUp("select");
}else{
this.isSelected=true;
this.isVisible=true;
this.bindingElement.style.position="static";
this._invokeManagedRecursiveFlex();
if(_ab9!=true){
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
TabPanelBinding.prototype.handleAction=function(_aba){
TabPanelBinding.superclass.handleAction.call(this,_aba);
var _abb=_aba.target;
switch(_aba.type){
case BalloonBinding.ACTION_INITIALIZE:
_aba.consume();
break;
}
};
TabPanelBinding.newInstance=function(_abc){
var _abd=DOMUtil.createElementNS(Constants.NS_UI,"ui:tabpanel",_abc);
UserInterface.registerBinding(_abd,TabPanelBinding);
return UserInterface.getBinding(_abd);
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
var _abe=SplitBoxBinding.superclass.serialize.call(this);
if(_abe){
_abe.orient=this.getOrient();
_abe.layout=this.getLayout();
}
return _abe;
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
var _abf=this.getSplitPanelElements();
if(_abf.hasEntries()){
var _ac0=new List(this.getLayout().split(":"));
if(_ac0.getLength()!=_abf.getLength()){
throw new Error(this+" DOM subree invalid");
}else{
_abf.each(function(_ac1){
_ac1.setAttribute("ratio",_ac0.getNext());
});
}
}
this.isLayoutInitialized=true;
};
SplitBoxBinding.prototype._initializeOrient=function(){
var _ac2=this.getProperty("orient");
if(_ac2){
this._orient=_ac2;
}
this.attachClassName(this._orient);
};
SplitBoxBinding.prototype._initializeSplitters=function(){
var _ac3=this.getSplitterBindings();
while(_ac3.hasNext()){
var _ac4=_ac3.getNext();
if(_ac4&&_ac4.getProperty("collapsed")==true){
_ac4.collapse();
}
}
};
SplitBoxBinding.prototype.handleAction=function(_ac5){
SplitBoxBinding.superclass.handleAction.call(this,_ac5);
switch(_ac5.type){
case SplitterBinding.ACTION_DRAGGED:
this.refreshLayout();
_ac5.consume();
break;
case SplitterBinding.ACTION_COLLAPSE:
this.collapse(_ac5.target);
_ac5.consume();
break;
case SplitterBinding.ACTION_UNCOLLAPSE:
this.unCollapse(_ac5.target);
_ac5.consume();
break;
}
};
SplitBoxBinding.prototype.flex=function(){
SplitBoxBinding.superclass.flex.call(this);
if(this.isAttached==true){
this.invokeLayout(true);
}
};
SplitBoxBinding.prototype.collapse=function(_ac6){
this._getSplitPanelBindingForSplitter(_ac6).collapse();
this.invokeLayout();
};
SplitBoxBinding.prototype.unCollapse=function(_ac7){
this._getSplitPanelBindingForSplitter(_ac7).unCollapse();
this.invokeLayout();
};
SplitBoxBinding.prototype._getSplitPanelBindingForSplitter=function(_ac8){
var _ac9=DOMUtil.getOrdinalPosition(_ac8.bindingElement,true);
var _aca,_acb=this.getSplitPanelElements();
switch(_ac8.getCollapseDirection()){
case SplitterBinding.COLLAPSE_BEFORE:
_aca=_acb.get(_ac9);
break;
case SplitterBinding.COLLAPSE_AFTER:
_aca=_acb.get(_ac9+1);
break;
}
return UserInterface.getBinding(_aca);
};
SplitBoxBinding.prototype.invokeLayout=function(_acc){
var _acd=this.isHorizontalOrient();
var _ace=this.getSplitPanelBindings();
var _acf=this.getSplitterBindings();
var _ad0=new List();
var _ad1,sum=0;
var _ad3=0;
_ace.each(function(_ad4){
if(_ad4.isFixed==true){
if(!_ace.hasNext()){
_ad3+=_ad4.getFix();
}
_ad0.add(0);
sum+=0;
}else{
_ad1=_ad4.getRatio();
_ad0.add(_ad1);
sum+=_ad1;
}
});
if(sum==0){
this.logger.warn("Division by zero was hacked");
sum=1;
}
if(_ad0.getLength()!=_ace.getLength()){
throw new Error(this+" Invalid property (ratio)");
}else{
var _ad5=_acd?this.getWidth():this.getHeight();
_ad5-=_ad3;
_acf.each(function(_ad6){
if(_ad6.isVisible){
_ad5-=SplitterBinding.DIMENSION;
}
});
var unit=_ad5/sum;
var _ad8=0;
var self=this;
_ace.each(function(_ada){
var span=0;
var _adc=_ad0.getNext();
if(_ada.isFixed){
span=_ada.getFix();
}else{
span=Math.round(unit*_adc);
if(isNaN(span)){
alert("isNaN ( span ) ["+this.getProperty("layout")+"]");
}
}
_ad8+=span;
while(_ad8>_ad5){
_ad8--;
span--;
}
if(!_ada.isFixed){
if(_acd){
_ada.setWidth(span);
}else{
_ada.setHeight(span);
}
}
});
}
if(_acc!=true){
this.reflex();
}
if(this._persist&&this._persist.layout){
var _add=this.getLayout();
if(_add){
this.setProperty("layout",_add);
}
}
};
SplitBoxBinding.prototype.computeLayout=function(){
var _ade=this.isHorizontalOrient();
var _adf=this.getSplitPanelBindings();
var _ae0=this.getSplitterBindings();
var _ae1=null;
var _ae2=null;
var unit=null;
var _ae4=null;
var span=null;
_adf.each(function(_ae6){
if(!unit){
unit=_ade?_ae6.getWidth():_ae6.getHeight();
}
span=_ade?_ae6.getWidth():_ae6.getHeight();
if(_ae4){
span-=_ae4;
_ae4=null;
}
_ae1=_ae0.getNext();
if(_ae1&&_ae1.offset){
_ae4=_ae1.offset;
span+=_ae4;
}
_ae6.setRatio(span/unit);
});
};
SplitBoxBinding.prototype.refreshLayout=function(){
this.computeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.setLayout=function(_ae7){
this.logger.debug(_ae7);
this.setProperty("layout",_ae7);
this._initializeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.getLayout=function(){
if(!this.isLayoutInitialized){
if(!this.getProperty("layout")){
this.setProperty("layout",this.getDefaultLayout());
}
}else{
var _ae8="",_ae9=this.getSplitPanelBindings();
_ae9.each(function(_aea){
_ae8+=_aea.getRatio().toString();
_ae8+=_ae9.hasNext()?":":"";
});
this.setProperty("layout",_ae8);
}
return new String(this.getProperty("layout"));
};
SplitBoxBinding.prototype.getDefaultLayout=function(){
var _aeb=this.getSplitPanelElements();
_aeb.each(function(_aec){
layout+="1"+(_aeb.hasNext()?":":"");
});
this.setProperty("layout",layout);
};
SplitBoxBinding.prototype.setWidth=function(_aed){
this.bindingElement.style.width=_aed+"px";
};
SplitBoxBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
SplitBoxBinding.prototype.setHeight=function(_aee){
this.bindingElement.style.height=_aee+"px";
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
SplitBoxBinding.prototype.fit=function(_aef){
if(!this.isFit||_aef){
if(this.isHorizontalOrient()){
var max=0;
var _af1=this.getSplitPanelBindings();
_af1.each(function(_af2){
var _af3=_af2.bindingElement.offsetHeight;
max=_af3>max?_af3:max;
});
this._setFitnessHeight(max);
}else{
throw "SplitBoxBinding enforceFitness not supported vertically!";
}
this.isFit=true;
}
};
SplitBoxBinding.newInstance=function(_af4){
var _af5=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitbox",_af4);
return UserInterface.registerBinding(_af5,SplitBoxBinding);
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
var _af8=this.getProperty("hidden");
if(_af8){
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
var _af9=this.getProperty("ratiocache");
if(_af9){
this.setRatio(_af9);
this.deleteProperty("ratiocache");
}else{
this._containingSplitBoxBinding.computeLayout();
}
this.bindingElement.style.display="block";
this.deleteProperty("hidden");
this.isVisible=true;
}
};
SplitPanelBinding.prototype.setWidth=function(_afa){
if(!this.isFixed){
if(_afa!=this.getWidth()){
if(_afa<0){
_afa=this.getWidth();
this.logger.warn("SplitPanelBinding#setWidth bug in Internet Explorer!");
}
try{
this.bindingElement.style.width=_afa+"px";
}
catch(exception){
alert("SplitPanelBinding#setWidth: Occult width: "+_afa);
alert(arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getWidth=function(){
var _afb=null;
if(this.isFixed){
_afb=this.getFix();
}else{
_afb=this.bindingElement.offsetWidth;
}
return _afb;
};
SplitPanelBinding.prototype.setHeight=function(_afc){
if(!this.isFixed){
if(_afc!=this.getHeight()){
try{
this.bindingElement.style.height=_afc+"px";
}
catch(exception){
alert("SplitPanelBinding.prototype.setHeight"+arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getHeight=function(){
var _afd=null;
if(this.isFixed){
_afd=this.getFix();
}else{
_afd=this.bindingElement.offsetHeight;
}
return _afd;
};
SplitPanelBinding.prototype.setRatio=function(_afe){
this.setProperty("ratio",_afe);
};
SplitPanelBinding.prototype.getRatio=function(){
return this.getProperty("ratio");
};
SplitPanelBinding.prototype.setFix=function(_aff){
if(_aff){
this._fixedSpan=_aff;
switch(this._containingSplitBoxBinding.getOrient()){
case SplitBoxBinding.ORIENT_HORIZONTAL:
this.logger.warn("Fix not properly supported on horizontal splitboxes!");
this.setWidth(_aff);
break;
case SplitBoxBinding.ORIENT_VERTICAL:
this.setHeight(_aff);
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
SplitPanelBinding.newInstance=function(_b00){
var _b01=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitpanel",_b00);
return UserInterface.registerBinding(_b01,SplitPanelBinding);
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
var _b02=SplitBoxBinding.superclass.serialize.call(this);
if(_b02){
_b02.collapse=this.getProperty("collapse");
_b02.collapsed=this.getProperty("collapsed");
_b02.disabled=this.getProperty("isdisabled");
}
return _b02;
};
SplitterBinding.prototype.onBindingAttach=function(){
SplitterBinding.superclass.onBindingAttach.call(this);
this.addActionListener(Binding.ACTION_DRAG);
this._containingSplitBoxBinding=this.getAncestorBindingByLocalName("splitbox");
this.attachClassName(this._containingSplitBoxBinding.getOrient());
this._collapseDirection=this.getProperty("collapse");
this.buildDOMContent();
this.attachDOMEvents();
var _b03=this.getProperty("hidden");
if(_b03){
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
SplitterBinding.prototype.setCollapseDirection=function(_b05){
this.setProperty("collapse",_b05);
this._collapseDirection=_b05;
};
SplitterBinding.prototype.handleAction=function(_b06){
SplitterBinding.superclass.handleAction.call(this,_b06);
switch(_b06.type){
case Binding.ACTION_DRAG:
this.dragger.registerHandler(this);
_b06.consume();
break;
}
};
SplitterBinding.prototype.handleEvent=function(e){
SplitterBinding.superclass.handleEvent.call(this,e);
var _b08=this;
if(!this.isDragging&&!this.isDisabled){
switch(e.type){
case DOMEvents.MOUSEOVER:
window.splitterTimeout=window.setTimeout(function(){
_b08.shadowTree.splitterBody.className=SplitterBinding.CLASSNAME_HOVER;
},250);
break;
case DOMEvents.MOUSEOUT:
if(window.splitterTimeout){
window.clearTimeout(window.splitterTimeout);
}
if(_b08.shadowTree.splitterBody.className==SplitterBinding.CLASSNAME_HOVER){
this.shadowTree.splitterBody.className="";
}
break;
}
}
};
SplitterBinding.prototype.onDragStart=function(_b09){
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
SplitterBinding.newInstance=function(_b14){
var _b15=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitter",_b14);
return UserInterface.registerBinding(_b15,SplitterBinding);
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
var _b16=this.getProperty("selectedindex");
var _b17=this.getDeckElements();
if(_b17.hasEntries()){
var _b18=false;
var _b19=0;
while(_b17.hasNext()){
var deck=_b17.getNext();
if(_b16&&_b19==_b16){
deck.setAttribute("selected","true");
_b18=true;
}else{
if(deck.getAttribute("selected")=="true"){
_b18=true;
}
}
_b19++;
}
if(!_b18){
_b17.getFirst().setAttribute("selected","true");
}
}
};
DecksBinding.prototype.getDeckElements=function(){
return this.getChildElementsByLocalName(this.constructor.NODENAME_DECK);
};
DecksBinding.prototype.select=function(arg){
var _b1c=this.getBindingForArgument(arg);
if(_b1c!=null){
if(_b1c!=this._selectedDeckBinding){
if(this._selectedDeckBinding){
this._selectedDeckBinding.unselect();
}
_b1c.select();
this._selectedDeckBinding=_b1c;
var _b1d=this.getProperty("selectedindex");
if(_b1d!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_b1c.bindingElement,true));
}
this.dispatchAction(DecksBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
}else{
throw "No deck for argument "+arg;
}
};
DecksBinding.prototype.hasDimensionsChanged=function(){
var _b1e=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(!Dimension.isEqual(dim1,dim2)){
_b1e=true;
this._lastKnownDimension=dim1;
}
return _b1e;
};
DecksBinding.prototype.getSelectedDeckBinding=function(){
return this._selectedDeckBinding;
};
DecksBinding.newInstance=function(_b21){
var _b22=DOMUtil.createElementNS(Constants.NS_UI,"ui:decks",_b21);
return UserInterface.registerBinding(_b22,DecksBinding);
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
DeckBinding.prototype.handleAction=function(_b23){
DeckBinding.superclass.handleAction.call(this,_b23);
var _b24=_b23.target;
switch(_b23.type){
case BalloonBinding.ACTION_INITIALIZE:
_b23.consume();
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
DeckBinding.newInstance=function(_b26){
var _b27=DOMUtil.createElementNS(Constants.NS_UI,"ui:deck",_b26);
return UserInterface.registerBinding(_b27,DeckBinding);
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
ToolBarBinding.prototype.onMemberInitialize=function(_b28){
if(_b28 instanceof ToolBarBodyBinding){
if(_b28.isRightAligned){
if(!this._toolBarBodyRight){
this._toolBarBodyRight=_b28;
}
}else{
if(!this._toolBarBodyLeft){
this._toolBarBodyLeft=_b28;
}
}
}
ToolBarBinding.superclass.onMemberInitialize.call(this,_b28);
};
ToolBarBinding.prototype.parseDOMProperties=function(){
var _b29=this.getProperty("imagesize");
var type=this.getProperty("type");
if(_b29){
this.setImageSize(_b29);
}
if(type){
this.setType(type);
}else{
this.setType(this.type);
}
};
ToolBarBinding.prototype.buildDOMContent=function(){
if(this._hasDefaultContent==true&&!this._hasDOMContent){
var _b2b=ToolBarGroupBinding.newInstance(this.bindingDocument);
_b2b.add(ToolBarButtonBinding.newInstance(this.bindingDocument));
_b2b.isDefaultContent=true;
this.add(_b2b);
_b2b.attachRecursive();
this._hasDOMContent=true;
}
};
ToolBarBinding.prototype.flex=function(){
var left=this._toolBarBodyLeft;
var _b2d=this._toolBarBodyRight;
if(left!=null&&left.hasClassName("max")){
this._maxToolBarGroup(left,_b2d);
}
if(_b2d!=null&&_b2d.hasClassName("max")){
this._maxToolBarGroup(_b2d,left);
}
};
ToolBarBinding.prototype._maxToolBarGroup=function(max,_b2f){
var _b30=this.boxObject.getDimension().w;
var _b31=CSSComputer.getPadding(this.bindingElement);
_b30-=(_b31.left+_b31.right);
if(_b2f!=null){
_b30-=_b2f.boxObject.getDimension().w;
if(!Client.isWindows){
_b30-=1;
}
if(Client.isExplorer){
_b30-=15;
}
}
max.bindingElement.style.width=_b30+"px";
};
ToolBarBinding.prototype.getToolBarGroupByIndex=function(_b32){
return this.getDescendantBindingsByLocalName("toolbargroup").get(_b32);
};
ToolBarBinding.prototype.addLeft=function(_b33,_b34){
var _b35=null;
if(this._toolBarBodyLeft!=null){
_b35=this._toolBarBodyLeft.add(_b33,_b34);
}else{
throw new Error("No left toolbarbody");
}
return _b35;
};
ToolBarBinding.prototype.addLeftFirst=function(_b36,_b37){
var _b38=null;
if(this._toolBarBodyLeft){
_b38=this._toolBarBodyLeft.addFirst(_b36,_b37);
}else{
throw new Error("No left toolbarbody");
}
return _b38;
};
ToolBarBinding.prototype.addRight=function(_b39){
var _b3a=null;
if(this._toolBarBodyRight){
_b3a=this._toolBarBodyRight.add(_b39);
}else{
throw new Error("No left toolbarbody");
}
return _b3a;
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
ToolBarBinding.newInstance=function(_b3d){
var _b3e=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_b3d);
return UserInterface.registerBinding(_b3e,ToolBarBinding);
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
var _b3f=this.getDescendantBindingsByLocalName("toolbargroup");
var _b40=new List();
var _b41=true;
_b3f.each(function(_b42){
if(_b42.isVisible&&!_b42.isDefaultContent){
_b40.add(_b42);
}
});
while(_b40.hasNext()){
var _b43=_b40.getNext();
_b43.setLayout(ToolBarGroupBinding.LAYOUT_DEFAULT);
if(_b41){
_b43.setLayout(ToolBarGroupBinding.LAYOUT_FIRST);
_b41=false;
}
if(!_b40.hasNext()){
_b43.setLayout(ToolBarGroupBinding.LAYOUT_LAST);
}
}
if(this.getProperty("equalsize")){
this.enforceEqualSize();
}
};
ToolBarBodyBinding.prototype.enforceEqualSize=function(){
var max=0,list=this.getDescendantBindingsByLocalName("clickbutton");
while(list.hasNext()){
var _b46=list.getNext();
var _b47=_b46.getEqualSizeWidth();
if(_b47>max){
max=_b47;
}
}
if(max!=0){
list.reset();
while(list.hasNext()){
var _b46=list.getNext();
_b46.setEqualSizeWidth(max);
}
}
};
ToolBarBodyBinding.prototype.empty=function(){
this.detachRecursive();
this.bindingElement.innerHTML="";
};
ToolBarBodyBinding.prototype.add=function(_b48,_b49){
var _b4a=ToolBarBinding.superclass.add.call(this,_b48);
if(!_b49){
if(_b48 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _b4a;
};
ToolBarBodyBinding.prototype.addFirst=function(_b4b,_b4c){
var _b4d=ToolBarBinding.superclass.addFirst.call(this,_b4b);
if(!_b4c){
if(_b4b instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _b4d;
};
ToolBarBodyBinding.newInstance=function(_b4e){
var _b4f=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbody",_b4e);
return UserInterface.registerBinding(_b4f,ToolBarBodyBinding);
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
ToolBarGroupBinding.prototype.setLayout=function(_b50){
switch(_b50){
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
var _b51=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_b51)=="toolbarbody"){
UserInterface.getBinding(_b51).refreshToolBarGroups();
}
};
ToolBarGroupBinding.prototype.hide=function(){
ToolBarGroupBinding.superclass.hide.call(this);
var _b52=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_b52)=="toolbarbody"){
UserInterface.getBinding(_b52).refreshToolBarGroups();
}
};
ToolBarGroupBinding.newInstance=function(_b53){
var _b54=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbargroup",_b53);
return UserInterface.registerBinding(_b54,ToolBarGroupBinding);
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
ToolBarButtonBinding.newInstance=function(_b55){
var _b56=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_b55);
return UserInterface.registerBinding(_b56,ToolBarButtonBinding);
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
var _b57=this.getProperty("label");
var _b58=this.getProperty("image");
if(_b57){
this.setLabel(_b57);
}
if(_b58){
this.setImage(_b58);
}
};
ToolBarLabelBinding.prototype.setLabel=function(_b59,_b5a){
if(this.isAttached){
this._labelBinding.setLabel(_b59,_b5a);
}
this.setProperty("label",_b59);
};
ToolBarLabelBinding.prototype.setImage=function(_b5b,_b5c){
if(this.isAttached){
this._labelBinding.setImage(_b5b,_b5c);
}
this.setProperty("image",_b5b);
};
ToolBarLabelBinding.newInstance=function(_b5d){
var _b5e=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarlabel",_b5d);
return UserInterface.registerBinding(_b5e,ToolBarLabelBinding);
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
var _b5f=this.getDescendantBindingsByLocalName("clickbutton");
if(_b5f.hasEntries()){
while(_b5f.hasNext()){
var _b60=_b5f.getNext();
if(_b60.isDefault){
this._defaultButton=_b60;
_b60.attachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
if(!this._isListening&&_b60.isFocusable){
this.subscribe(BroadcastMessages.KEY_ENTER);
this._isListening=true;
}
}
this._buttons=_b5f;
}
};
DialogToolBarBinding.prototype.handleBroadcast=function(_b61,arg){
DialogToolBarBinding.superclass.handleBroadcast.call(this,_b61,arg);
switch(_b61){
case BroadcastMessages.KEY_ENTER:
if(!PopupBinding.hasActiveInstances()&&!EditorBinding.isActive){
if(Binding.exists(this)){
var _b63=this.getAncestorBindingByType(DialogBinding,true);
if(_b63!=null&&_b63.isActive){
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
DialogToolBarBinding.prototype.handleAction=function(_b64){
DialogToolBarBinding.superclass.handleAction.call(this,_b64);
var _b65=_b64.target;
var _b66=false;
var _b67=this._buttons.reset();
if(_b65 instanceof ClickButtonBinding){
switch(_b64.type){
case Binding.ACTION_FOCUSED:
_b65.attachClassName(ButtonBinding.CLASSNAME_FOCUSED);
this._focusedButton=_b65;
if(this._defaultButton){
this._defaultButton.detachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
break;
case Binding.ACTION_BLURRED:
_b65.detachClassName(ButtonBinding.CLASSNAME_FOCUSED);
break;
}
}
if(this._defaultButton){
while(!_b66&&_b67.hasNext()){
var _b68=_b67.getNext();
_b66=_b68.isFocused;
}
if(!_b66){
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
var _b69=this._views;
for(var _b6a in ViewDefinitions){
var def=ViewDefinitions[_b6a];
var key=def.perspective;
if(key!=null){
if(!_b69.has(key)){
_b69.set(key,new List());
}
var list=_b69.get(key);
list.add(def);
}
}
}else{
this.hide();
}
};
ToolBoxToolBarButtonBinding.prototype.handleBroadcast=function(_b6e,arg){
ToolBoxToolBarButtonBinding.superclass.handleBroadcast.call(this,_b6e,arg);
switch(_b6e){
case BroadcastMessages.PERSPECTIVE_CHANGED:
var tag=arg;
if(this._views.has(tag)){
if(tag!=this._lastGeneratedPerspective){
this._lastGeneratedPerspective=tag;
var list=this._views.get(tag);
var _b72=this.bindingWindow.bindingMap.toolboxpopup;
_b72.empty();
list.each(function(def){
var item=_b72.add(StageViewMenuItemBinding.newInstance(_b72.bindingDocument));
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
TreeBinding.grid=function(_b75){
var _b76=TreeNodeBinding.HEIGHT;
var ceil=Math.ceil(_b75);
var _b78=_b75%_b76;
if(_b78>0){
_b75=_b75-_b78+_b76;
}
return _b75+TreeBodyBinding.PADDING_TOP;
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
var _b79=this.getProperty("focusable");
if(_b79!=null){
this._isFocusable=_b79;
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
var _b7b=this.getProperty("builder");
if(_b7b){
this._buildFromTextArea(_b7b);
}else{
if(this._treeNodeBuffer.hasEntries()){
while(this._treeNodeBuffer.hasNext()){
this.add(this._treeNodeBuffer.getNext());
}
}
}
};
TreeBinding.prototype._setupTreeSelection=function(){
var _b7c=this.getProperty("selectable");
var _b7d=this.getProperty("selectionproperty");
var _b7e=this.getProperty("selectionvalue");
if(_b7c){
this.setSelectable(true);
if(_b7d){
this.setSelectionProperty(_b7d);
}
if(_b7e){
this.setSelectionValue(_b7e);
}
}
this._positionIndicatorBinding=this.add(TreePositionIndicatorBinding.newInstance(this.bindingDocument));
this.shadowTree.positionIndicator=this._positionIndicatorBinding;
this._positionIndicatorBinding.attach();
};
TreeBinding.prototype._buildFromTextArea=function(id){
var area=this.bindingDocument.getElementById(id);
if(area!=null){
var _b81=UserInterface.getBinding(area);
var _b82=this._treeBodyBinding;
function build(){
_b82.subTreeFromString(area.value);
}
_b81.addActionListener(Binding.ACTION_UPDATED,{handleAction:function(){
build();
}});
setTimeout(build,0);
}
};
TreeBinding.prototype.registerTreeNodeBinding=function(_b83){
var _b84=_b83.getHandle();
if(this._treeNodeBindings.has(_b84)){
throw "Duplicate treenodehandles registered: "+_b83.getLabel();
}else{
this._treeNodeBindings.set(_b84,_b83);
var map=this._openTreeNodesBackupMap;
if(map!=null&&map.has(_b84)){
_b83.open();
}
}
};
TreeBinding.prototype.unRegisterTreeNodeBinding=function(_b86){
this._treeNodeBindings.del(_b86.getHandle());
};
TreeBinding.prototype.getTreeNodeBindingByHandle=function(_b87){
var _b88=null;
if(this._treeNodeBindings.has(_b87)){
_b88=this._treeNodeBindings.get(_b87);
}else{
throw "No such treenode: "+_b87;
}
return _b88;
};
TreeBinding.prototype.handleAction=function(_b89){
TreeBinding.superclass.handleAction.call(this,_b89);
var _b8a=_b89.target;
switch(_b89.type){
case TreeNodeBinding.ACTION_OPEN:
_b89.consume();
break;
case TreeNodeBinding.ACTION_CLOSE:
this._blurDescendantBindings(_b8a);
_b89.consume();
break;
case TreeNodeBinding.ACTION_ONFOCUS:
this._nodePrimary=_b8a;
this.focusSingleTreeNodeBinding(_b8a);
if(!this.isFocused){
this.focus();
}
_b89.consume();
break;
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
switch(this._selectionType){
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodePrimary=_b8a;
this.focusSingleTreeNodeBinding(_b8a);
break;
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodeSecondary=_b8a;
if(!this._nodePrimary||this._nodeSecondary==this._nodePrimary){
this._nodePrimary=_b8a;
this.focusSingleTreeNodeBinding(_b8a);
}else{
this.focusMultipeTreeNodeBindings(this._getVisibleTreeNodeBindingsInRange(this._nodePrimary,this._nodeSecondary));
}
break;
}
if(!this.isFocused){
this.focus();
}
_b89.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
if(_b8a.isFocused){
this.blurSelectedTreeNodes();
}
_b89.consume();
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
TreeBinding.prototype._getVisibleTreeNodeBindingsInRange=function(_b8b,_b8c){
alert("TreeBinding#_getVisibleTreeNodeBindingsInRange");
};
TreeBinding.prototype.focusSingleTreeNodeBinding=function(_b8d){
if(_b8d!=null&&!_b8d.isFocused){
this.blurSelectedTreeNodes();
this._focusedTreeNodeBindings.add(_b8d);
_b8d.invokeManagedFocus();
if(this._isSelectable){
this._manageSelections();
}
}
};
TreeBinding.prototype.focusMultipeTreeNodeBindings=function(_b8e){
this.blurSelectedTreeNodes();
while(_b8e.hasNext()){
var _b8f=_b8e.getNext();
this._focusedTreeNodeBindings.add(_b8f);
_b8f.invokeManagedFocus();
}
if(this._isSelectable){
this._manageSelections();
}
};
TreeBinding.prototype._manageSelections=function(){
var _b90=this._selectedTreeNodeBindings;
this._selectedTreeNodeBindings={};
var _b91=false;
var _b92=null;
this._focusedTreeNodeBindings.reset();
while(this._focusedTreeNodeBindings.hasNext()){
var _b93=this._focusedTreeNodeBindings.getNext();
var _b94=_b93.getProperty(this._selectionProperty);
if(_b94!=null){
if(!this._selectionValue||this._selectionValue[_b94]){
_b92=(this._selectedTreeNodeBindings[_b93.key]=_b93);
var _b95=_b90[_b93.key];
if(!_b95||_b95!=_b92){
_b91=true;
}
}
}
}
if(_b92){
if(_b91){
this.dispatchAction(TreeBinding.ACTION_SELECTIONCHANGED);
}
}else{
if(_b90){
for(var key in _b90){
this.dispatchAction(TreeBinding.ACTION_NOSELECTION);
break;
}
}
}
};
TreeBinding.prototype.getSelectedTreeNodeBindings=function(){
var _b97=new List();
for(var key in this._selectedTreeNodeBindings){
_b97.add(this._selectedTreeNodeBindings[key]);
}
return _b97;
};
TreeBinding.prototype.blurSelectedTreeNodes=function(){
this._focusedTreeNodeBindings.reset().each(function(_b99){
_b99.blur();
});
this._focusedTreeNodeBindings.clear();
};
TreeBinding.prototype._blurDescendantBindings=function(_b9a){
var _b9b=_b9a.getDescendantBindingsByLocalName("treenode");
var _b9c=true;
var self=this;
_b9b.each(function(desc){
if(desc.isFocused){
desc.blur();
self._focusedTreeNodeBindings.del(self._focusedTreeNodeBindings.getIndex(desc));
}
return _b9c;
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
var _b9f=this._treeBodyBinding.getChildBindingByLocalName("treenode");
if(_b9f!=null){
this.focusSingleTreeNodeBinding(_b9f);
_b9f.callback();
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
TreeBinding.prototype.add=function(_ba0){
var _ba1=null;
if(this._treeBodyBinding){
_ba1=this._treeBodyBinding.add(_ba0);
}else{
this._treeNodeBuffer.add(_ba0);
_ba1=_ba0;
}
return _ba1;
};
TreeBinding.prototype.addFirst=function(_ba2){
throw new Error("Not implemented");
};
TreeBinding.prototype.empty=function(){
this._treeBodyBinding.detachRecursive();
var _ba3=this._treeBodyBinding.bindingElement;
_ba3.innerHTML="";
};
TreeBinding.prototype.isEmpty=function(){
return this._treeNodeBindings.hasEntries()==false;
};
TreeBinding.prototype.collapse=function(){
this.blurSelectedTreeNodes();
this._treeNodeBindings.each(function(_ba4,_ba5){
if(_ba5.isContainer&&_ba5.isOpen){
_ba5.close();
}
});
};
TreeBinding.prototype.setSelectable=function(_ba6){
this._isSelectable=_ba6;
if(_ba6){
this._selectedTreeNodeBindings={};
}else{
this._selectedTreeNodeBindings=null;
this._selectionProperty=null;
this._selectionValue=null;
}
};
TreeBinding.prototype.setSelectionProperty=function(_ba7){
this._selectionProperty=_ba7;
};
TreeBinding.prototype.setSelectionValue=function(_ba8){
if(_ba8){
var list=new List(_ba8.split(" "));
this._selectionValue={};
while(list.hasNext()){
this._selectionValue[list.getNext()]=true;
}
}
};
TreeBinding.prototype.handleBroadcast=function(_baa,arg){
TreeBinding.superclass.handleBroadcast.call(this,_baa,arg);
switch(_baa){
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
var _bac=this.getFocusedTreeNodeBindings();
if(_bac.hasEntries()){
var node=_bac.getFirst();
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
var _baf=this.getFocusedTreeNodeBindings();
if(_baf.hasEntries()){
var node=_baf.getFirst();
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
var _bb2=null;
while(next==null&&(_bb2=node.getAncestorBindingByLocalName("treenode"))!=null){
if(_bb2!=null){
next=_bb2.getNextBindingByLocalName("treenode");
}
node=_bb2;
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
var _bb4=DOMEvents.getTarget(e);
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
var _bb5=new TreeCrawler();
var list=new List();
_bb5.mode=TreeCrawler.MODE_GETOPEN;
_bb5.crawl(this.bindingElement,list);
var map=new Map();
if(list.hasEntries()){
while(list.hasNext()){
var _bb8=list.getNext();
map.set(_bb8.getHandle(),true);
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
var _bbd=this._positionIndicatorBinding;
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
if(y!=_bbd.getPosition().y){
_bbd.setPosition(new Point(this._acceptingPosition.x+TreeNodeBinding.INDENT,y));
}
if(!_bbd.isVisible){
_bbd.show();
}
}else{
if(_bbd.isVisible){
_bbd.hide();
}
}
}else{
if(_bbd.isVisible){
_bbd.hide();
}
}
};
TreeBinding.prototype.enablePositionIndicator=function(_bc0){
this._acceptingTreeNodeBinding=_bc0;
this._acceptingPosition=_bc0.boxObject.getLocalPosition();
this._acceptingDimension=_bc0.boxObject.getDimension();
this._acceptingPositions=this._getChildPositions(_bc0);
};
TreeBinding.prototype.disablePositionIndicator=function(){
this._acceptingTreeNodeBinding=null;
this._acceptingPosition=null;
this._acceptingDimension=null;
};
TreeBinding.prototype._getChildPositions=function(_bc1){
var map={};
var _bc3=_bc1.getChildBindingsByLocalName("treenode");
var _bc4,pos,dim,y;
y=TreeBinding.grid(_bc1.boxObject.getLocalPosition().y);
map[y]=true;
while(_bc3.hasNext()){
_bc4=_bc3.getNext();
pos=_bc4.boxObject.getLocalPosition();
dim=_bc4.boxObject.getDimension();
y=TreeBinding.grid(pos.y+dim.h)-TreeNodeBinding.HEIGHT;
map[y]=true;
}
return map;
};
TreeBinding.prototype.getDropIndex=function(){
var y=this._positionIndicatorBinding.getPosition().y;
var drop=0;
for(var _bca in this._acceptingPositions){
if(_bca==y){
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
TreeBinding.newInstance=function(_bcb){
var _bcc=DOMUtil.createElementNS(Constants.NS_UI,"ui:tree",_bcb);
var _bcd=UserInterface.registerBinding(_bcc,TreeBinding);
_bcd.treeBodyBinding=TreeBodyBinding.newInstance(_bcb);
return _bcd;
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
TreeBodyBinding.prototype.accept=function(_bce){
if(_bce instanceof TreeNodeBinding){
this.logger.debug(_bce);
}
};
TreeBodyBinding.prototype.handleAction=function(_bcf){
TreeBodyBinding.superclass.handleAction.call(this,_bcf);
switch(_bcf.type){
case TreeNodeBinding.ACTION_FOCUSED:
this._scrollIntoView(_bcf.target);
_bcf.consume();
break;
}
};
TreeBodyBinding.prototype._scrollIntoView=function(_bd0){
var a=this.boxObject.getDimension().h;
var y=_bd0.boxObject.getLocalPosition().y;
var h=_bd0.boxObject.getDimension().h;
var t=this.bindingElement.scrollTop;
var l=this.bindingElement.scrollLeft;
var _bd6=_bd0.labelBinding.bindingElement;
if(y-t<0){
_bd6.scrollIntoView(true);
}else{
if(y-t+h>a){
_bd6.scrollIntoView(false);
}
}
if(Client.isExplorer){
this.bindingElement.scrollLeft=l;
}
};
TreeBodyBinding.newInstance=function(_bd7){
var _bd8=DOMUtil.createElementNS(Constants.NS_UI,"ui:treebody",_bd7);
return UserInterface.registerBinding(_bd8,TreeBodyBinding);
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
var _bd9=TreeNodeBinding.superclass.serialize.call(this);
if(_bd9){
_bd9.label=this.getLabel();
_bd9.image=this.getImage();
var _bda=this.getHandle();
if(_bda&&_bda!=this.key){
_bd9.handle=_bda;
}
if(this.isOpen){
_bd9.open=true;
}
if(this.isDisabled){
_bd9.disabled=true;
}
if(this.dragType){
_bd9.dragtype=this.dragType;
}
if(this.dragAccept){
_bd9.dragaccept=this.dragAccept;
}
}
return _bd9;
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
var _bdc=UserInterface.getBinding(node);
if(_bdc&&_bdc.containingTreeBinding){
this.containingTreeBinding=_bdc.containingTreeBinding;
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
var _bdd=this.key;
var _bde=this.getProperty("handle");
if(_bde){
_bdd=_bde;
}
return _bdd;
};
TreeNodeBinding.prototype.setHandle=function(_bdf){
this.setProperty("handle",_bdf);
};
TreeNodeBinding.prototype.buildDOMContent=function(){
var url=this.getProperty("url");
var _be1=this.getProperty("label");
var _be2=this.getProperty("tooltip");
var _be3=this.getProperty("oncommand");
var _be4=this.getProperty("onbindingfocus");
var _be5=this.getProperty("onbindingblur");
var _be6=this.getProperty("focused");
var _be7=this.getProperty("callbackid");
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
if(_be1!=null){
this.setLabel(_be1);
}
if(_be2!=null){
this.setToolTip(_be2);
}
if(!this.imageProfile){
this._computeImageProfile();
}
this.setImage(this.computeImage());
if(this.isContainer){
this.updateClassNames();
}
var _be9=this.bindingWindow.WindowManager;
if(_be3!=null){
this.oncommand=function(){
Binding.evaluate(_be3,this);
};
}
if(_be4!=null){
this.onfocus=function(){
Binding.evaluate(_be4,this);
};
}
if(_be5!=null){
this.onblur=function(){
Binding.evaluate(_be5,this);
};
}
if(_be6==true){
this.focus();
}
if(_be7!=null){
Binding.dotnetify(this,_be7);
}
};
TreeNodeBinding.prototype.handleAction=function(_bea){
TreeNodeBinding.superclass.handleAction.call(this,_bea);
switch(_bea.type){
case TreeNodeBinding.ACTION_FOCUSED:
if(_bea.target!=this){
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
TreeNodeBinding.prototype.accept=function(_beb,_bec){
var _bed=true;
if(_beb instanceof TreeNodeBinding){
var _bee=false;
var _bef=this.bindingElement;
var _bf0=this.containingTreeBinding.bindingElement;
while(!_bee&&_bef!=_bf0){
if(_bef==_beb.getBindingElement()){
_bee=true;
}else{
_bef=_bef.parentNode;
}
}
if(_bee){
Dialog.error("Not Allowed","You cannot move a folder into itself.");
_bed=false;
}else{
this.acceptTreeNodeBinding(_beb,_bec);
}
}else{
_bed=false;
}
return _bed;
};
TreeNodeBinding.prototype.acceptTreeNodeBinding=function(_bf1,_bf2){
var _bf3=_bf1.serializeToString();
var _bf4=new BindingParser(this.bindingDocument);
var _bf5=_bf4.parseFromString(_bf3).getFirst();
_bf2=_bf2?_bf2:this.containingTreeBinding.getDropIndex();
var _bf6=this.getChildElementsByLocalName("treenode");
this.bindingElement.insertBefore(_bf5,_bf6.get(_bf2));
this.bindingWindow.DocumentManager.attachBindings(this.bindingElement);
_bf1.dispose();
};
TreeNodeBinding.prototype.showAcceptance=function(){
this.containingTreeBinding.enablePositionIndicator(this);
};
TreeNodeBinding.prototype.hideAcceptance=function(){
this.containingTreeBinding.disablePositionIndicator();
};
TreeNodeBinding.prototype._computeImageProfile=function(){
var _bf7=this.getProperty("image");
var _bf8=this.getProperty("image-active");
var _bf9=this.getProperty("image-disabled");
_bf8=_bf8?_bf8:this.isContainer?_bf7?_bf7:TreeNodeBinding.DEFAULT_FOLDER_OPEN:_bf7?_bf7:TreeNodeBinding.DEFAULT_ITEM;
_bf9=_bf9?_bf9:this.isContainer?_bf7?_bf7:TreeNodeBinding.DEFAULT_FOLDER_DISABLED:_bf7?_bf7:TreeNodeBinding.DEFAULT_ITEM_DISABLED;
_bf7=_bf7?_bf7:this.isContainer?TreeNodeBinding.DEFAULT_FOLDER_CLOSED:TreeNodeBinding.DEFAULT_ITEM;
this.imageProfile=new ImageProfile({image:_bf7,imageHover:null,imageActive:_bf8,imageDisabled:_bf9});
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
TreeNodeBinding.prototype.setLabel=function(_bfb){
this.setProperty("label",String(_bfb));
if(this.isAttached){
this.labelBinding.setLabel(String(_bfb));
}
};
TreeNodeBinding.prototype.setToolTip=function(_bfc){
this.setProperty("tooltip",String(_bfc));
if(this.isAttached){
this.labelBinding.setToolTip(String(_bfc));
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
var _bfd=this.imageProfile.getDefaultImage();
var _bfe=this.imageProfile.getActiveImage();
_bfe=_bfe?_bfe:_bfd;
return this.isOpen?_bfe:_bfd;
};
TreeNodeBinding.prototype.handleEvent=function(e){
TreeNodeBinding.superclass.handleEvent.call(this,e);
var _c00=DOMEvents.getTarget(e);
var _c01=this.labelBinding.bindingElement;
var _c02=this.labelBinding.shadowTree.labelBody;
var _c03=this.labelBinding.shadowTree.labelText;
switch(e.type){
case DOMEvents.MOUSEDOWN:
switch(_c00){
case _c01:
this._onAction(e);
break;
case _c02:
case _c03:
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
if(_c00.parentNode==this.bindingElement&&_c00.__updateType==Update.TYPE_INSERT){
var _c01=this.labelBinding.bindingElement;
if(DOMUtil.getLocalName(_c00)=="treenode"){
if(_c00==this.bindingElement.firstChild){
this.bindingElement.insertBefore(_c00,_c01.nextSibling);
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
switch(_c00){
case _c01:
case _c02:
case _c03:
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
var _c07=true;
if(e.type=="mousedown"){
var _c08=e.button==(e.target?0:1);
if(!_c08){
_c07=false;
}
}
if(_c07){
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
var _c0a=false;
if(e!=null){
_c0a=e.shiftKey;
}
this.dispatchAction(_c0a?TreeNodeBinding.ACTION_ONMULTIFOCUS:TreeNodeBinding.ACTION_ONFOCUS);
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
var _c0d=this.getDescendantBindingsByLocalName("treenode");
_c0d.each(function(_c0e){
_c0e.dispose();
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
TreeNodeBinding.prototype.handleElement=function(_c0f){
var _c10=_c0f.getAttribute("focused");
if(_c10=="true"){
if(!this.isFocused){
this.focus();
}
}
return false;
};
TreeNodeBinding.newInstance=function(_c11){
var _c12=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_c11);
return UserInterface.registerBinding(_c12,TreeNodeBinding);
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
TreeContentBinding.newInstance=function(_c13){
var _c14=DOMUtil.createElementNS(Constants.NS_UI,"ui:treecontent",_c13);
return UserInterface.registerBinding(_c14,TreeContentBinding);
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
TreePositionIndicatorBinding.prototype.setPosition=function(_c15){
this.bindingElement.style.left=_c15.x+"px";
this.bindingElement.style.top=_c15.y+"px";
this._geometry.x=_c15.x;
this._geometry.y=_c15.y;
};
TreePositionIndicatorBinding.prototype.getPosition=function(){
return new Point(this._geometry.x,this._geometry.y);
};
TreePositionIndicatorBinding.newInstance=function(_c16){
var _c17=DOMUtil.createElementNS(Constants.NS_UI,"ui:treepositionindicator",_c16);
return UserInterface.registerBinding(_c17,TreePositionIndicatorBinding);
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
this.addFilter(function(_c19){
var _c1a=UserInterface.getBinding(_c19);
var _c1b=null;
var _c1b=null;
if(!_c1a instanceof TreeNodeBinding){
_c1b=NodeCrawler.SKIP_NODE;
}
return _c1b;
});
this.addFilter(function(_c1c,list){
var _c1e=UserInterface.getBinding(_c1c);
var _c1f=null;
switch(self.mode){
case TreeCrawler.MODE_GETOPEN:
if(_c1e.isOpen){
list.add(_c1e);
}
break;
}
return _c1f;
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
ShadowBinding.prototype.shadow=function(_c20){
this.targetBinding=_c20;
_c20.addActionListener(Binding.ACTION_POSITIONCHANGED,this);
_c20.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_c20.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_c20.bindingElement.parentNode.appendChild(this.bindingElement);
if(_c20.isVisible){
this.show();
this.setPosition(_c20.getPosition());
this.setDimension(_c20.getDimension());
}else{
this.hide();
}
};
ShadowBinding.prototype.handleAction=function(_c21){
ShadowBinding.superclass.handleAction.call(this,_c21);
var _c22=_c21.target;
if(_c22==this.targetBinding){
switch(_c21.type){
case Binding.ACTION_POSITIONCHANGED:
this.setPosition(this.targetBinding.getPosition());
_c21.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
this.setDimension(this.targetBinding.getDimension());
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(_c22.isVisible){
this.show();
this.setPosition(_c22.getPosition());
this.setDimension(_c22.getDimension());
}else{
this.hide();
}
break;
}
}
};
ShadowBinding.prototype.setPosition=function(_c23){
var _c24=this.offset-this.expand;
this.bindingElement.style.left=new String(_c23.x+_c24)+"px";
this.bindingElement.style.top=new String(_c23.y+_c24)+"px";
};
ShadowBinding.prototype.setDimension=function(dim){
this.bindingElement.style.width=new String(dim.w+2*this.expand)+"px";
this.bindingElement.style.height=new String(dim.h+2*this.expand)+"px";
};
ShadowBinding.newInstance=function(_c26){
var _c27=DOMUtil.createElementNS(Constants.NS_UI,"ui:shadow",_c26);
return UserInterface.registerBinding(_c27,ShadowBinding);
};
DockControlImageProfile.prototype=new ControlImageProfile;
DockControlImageProfile.prototype.constructor=DockControlImageProfile;
DockControlImageProfile.superclass=ControlImageProfile.prototype;
DockControlImageProfile.IMAGE_MINIMIZE=Resolver.resolve("${skin}/docks/control-minimize-${string}.png");
DockControlImageProfile.IMAGE_MAXIMIZE=Resolver.resolve("${skin}/docks/control-maximize-${string}.png");
DockControlImageProfile.IMAGE_RESTORE=Resolver.resolve("${skin}/docks/control-restore-${string}.png");
DockControlImageProfile.IMAGE_CLOSE=null;
function DockControlImageProfile(_c28){
this.binding=_c28;
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
DockTabsButtonBinding.newInstance=function(_c29){
var _c2a=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_c29);
_c2a.setAttribute("type","checkbox");
_c2a.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_c2a.className="tabbutton";
return UserInterface.registerBinding(_c2a,DockTabsButtonBinding);
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
var _c2b=DockBinding.superclass.serialize.call(this);
if(_c2b){
_c2b.active=this.isActive?true:null;
_c2b.collapsed=this.isCollapsed?true:null;
}
return _c2b;
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
var _c2c=UserInterface.getBinding(this.bindingElement.parentNode);
var _c2d=MatrixBinding.newInstance(this.bindingDocument);
_c2d.attachClassName("dockliner");
this.shadowTree.dockLiner=_c2d;
_c2c.add(_c2d);
_c2d.attach();
_c2d.manifest();
var type=this.getProperty("type");
this.type=type?type:DockBinding.TYPE_TOOLS;
this.attachClassName(this.type);
if(this.getProperty("active")==true){
this.activate();
}
};
DockBinding.prototype.interceptDisplayChange=function(_c2f){
var _c30=this.getSelectedTabPanelBinding();
if(_c30){
_c30.isVisible=_c2f;
_c30.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
}
};
DockBinding.prototype.prepareNewView=function(_c31){
var _c32=this._getBindingForDefinition(_c31);
var _c33=DockTabBinding.newInstance(this.bindingDocument);
_c33.setHandle(_c31.handle);
_c33.setLabel(this.type==DockBinding.TYPE_EDITORS?null:_c31.label);
_c33.setImage(_c31.image);
_c33.setToolTip(_c31.toolTip);
_c33.setEntityToken(_c31.entityToken);
_c33.setAssociatedView(_c32);
this.appendTabByBindings(_c33,null);
this._setupPageBindingListeners(_c33);
var _c34=this.getTabPanelBinding(_c33);
_c32.snapToBinding(_c34);
var _c35=this.bindingWindow.bindingMap.views;
_c35.add(_c32);
if(!this.isActive){
this.activate();
}
_c32.attach();
};
DockBinding.prototype.prepareOpenView=function(_c36,_c37){
this.logger.debug("DockBinding.prototype.prepareOpenView: _setupDirtyStuff required?");
_c37.setLabel(_c36.label);
_c37.setImage(_c36.image);
_c37.setToolTip(_c36.toolTip);
this._setupPageBindingListeners(_c37);
var _c38=this.getTabPanelBinding(_c37);
var _c39=this._getBindingForDefinition(_c36);
_c37.setAssociatedView(_c39);
_c39.snapToBinding(_c38);
UserInterface.getBinding(this.bindingDocument.body).add(_c39);
_c39.attach();
};
DockBinding.prototype._getBindingForDefinition=function(_c3a){
var _c3b=this.bindingWindow.bindingMap.views;
var view=ViewBinding.newInstance(_c3b.bindingDocument);
view.setDefinition(_c3a);
return view;
};
DockBinding.prototype._setupPageBindingListeners=function(_c3d){
var _c3e=this.getTabPanelBinding(_c3d);
var self=this;
var _c40={handleAction:function(_c41){
var _c42=_c41.target;
switch(_c41.type){
case PageBinding.ACTION_ATTACHED:
TabBoxBinding.currentActiveInstance=self;
break;
case PageBinding.ACTION_INITIALIZED:
_c42.reflex(true);
var view=_c3d.getAssociatedView();
if(_c42.bindingWindow==view.getContentWindow()){
_c3d.updateDisplay(_c42);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_COMPLETED,view.getHandle());
if(StatusBar.state==StatusBar.BUSY){
StatusBar.clear();
}
}
_c3d.onPageInitialize(_c42);
_c41.consume();
break;
case DockTabBinding.ACTION_UPDATE_VISUAL:
_c3d.updateDisplay(_c42);
_c41.consume();
break;
case DockTabBinding.ACTION_UPDATE_TOKEN:
_c3d.updateEntityToken(_c42);
_c41.consume();
break;
case EditorPageBinding.ACTION_DIRTY:
_c3d.setDirty(true);
break;
case EditorPageBinding.ACTION_SAVE:
_c3d.onSaveStart();
break;
case ViewBinding.ACTION_ONCLOSE:
self.closeTab(_c3d);
_c41.consume();
break;
case ViewBinding.ACTION_ONCLOSE_FORCE:
self.closeTab(_c3d,true);
_c41.consume();
break;
case DockPanelBinding.ACTION_FORCE_SELECT:
self.select(_c3d);
break;
case Binding.ACTION_FORCE_REFLEX:
_c3e.reflex(true);
_c41.consume();
break;
case DockTabBinding.ACTION_FORCE_CLEAN:
case EditorPageBinding.ACTION_CLEAN:
if(_c3d.isDirty){
_c3d.setDirty(false);
}
break;
case WindowBinding.ACTION_ONLOAD:
alert("HWEJ");
break;
}
}};
new List([DockTabBinding.ACTION_UPDATE_VISUAL,DockTabBinding.ACTION_UPDATE_TOKEN,PageBinding.ACTION_ATTACHED,PageBinding.ACTION_INITIALIZED,EditorPageBinding.ACTION_DIRTY,EditorPageBinding.ACTION_CLEAN,EditorPageBinding.ACTION_SAVE,ViewBinding.ACTION_ONCLOSE,ViewBinding.ACTION_ONCLOSE_FORCE,DockPanelBinding.ACTION_FORCE_SELECT,Binding.ACTION_FORCE_REFLEX,DockTabBinding.ACTION_FORCE_CLEAN,WindowBinding.ACTION_ONLOAD]).each(function(_c44){
_c3e.addActionListener(_c44,_c40);
});
};
DockBinding.prototype.summonTabPanelBinding=function(){
return DockPanelBinding.newInstance(this.bindingDocument);
};
DockBinding.prototype.handleAction=function(_c45){
DockBinding.superclass.handleAction.call(this,_c45);
var _c46=_c45.target;
switch(_c45.type){
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_c45.consume();
break;
case TabBoxBinding.ACTION_UPDATED:
if(_c46 instanceof DockBinding){
if(_c46.updateType==TabBoxBinding.UPDATE_DETACH){
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
this._viewBindingList.add(_c46);
if(this.isActive){
_c46.onActivate();
}
break;
case ViewBinding.ACTION_CLOSED:
this._viewBindingList.del(_c46);
break;
}
};
DockBinding.prototype.handleBroadcast=function(_c47,arg){
DockBinding.superclass.handleBroadcast.call(this,_c47,arg);
switch(_c47){
case BroadcastMessages.SYSTEMTREENODEBINDING_FOCUS:
var _c49=arg;
if(_c49.perspectiveNode==this.perspectiveNode){
this._selectTabByEntityToken(_c49.node.getEntityToken());
}
break;
}
};
DockBinding.prototype._selectTabByEntityToken=function(_c4a){
var tabs=this.getTabBindings();
var _c4c=false;
while(tabs.hasNext()&&!_c4c){
var tab=tabs.getNext();
var _c4e=tab.getEntityToken();
if(_c4e!=null&&_c4e==_c4a){
if(!tab.isSelected){
this.select(tab,true);
_c4c=true;
}
}
}
};
DockBinding.prototype.collapse=function(_c4f){
this._handleCollapse(true,_c4f);
};
DockBinding.prototype.unCollapse=function(_c50){
this._handleCollapse(false,_c50);
};
DockBinding.prototype._handleCollapse=function(_c51,_c52){
var _c53=this.getChildBindingByLocalName("dockpanels");
var _c54=this.getAncestorBindingByLocalName("splitbox");
if(_c51){
_c53.hide();
this.bindingElement.style.height="auto";
this.isFlexible=false;
this.isActivatable=false;
this.setProperty("collapsed",true);
if(_c52&&_c54.hasBothPanelsVisible()){
this.setWidth(200);
}
}else{
_c53.show();
this.isFlexible=true;
this.isActivatable=true;
this.deleteProperty("collapsed");
if(_c52){
this.setWidth(false);
}
}
this.interceptDisplayChange(!_c51);
this.isCollapsed=_c51;
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
DockBinding.prototype.closeTab=function(_c59,_c5a){
if(_c59.isDirty&&!_c5a){
var _c5b=Resolver.resolve(_c59.getLabel());
var self=this;
Dialog.question(StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Title"),StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Text").replace("${resourcename}",_c5b),Dialog.BUTTONS_YES_NO_CANCEL,{handleDialogResponse:function(_c5d){
switch(_c5d){
case Dialog.RESPONSE_YES:
setTimeout(function(){
self.saveContainedEditor(_c59);
},0);
break;
case Dialog.RESPONSE_NO:
self.removeTab(_c59);
break;
}
}});
}else{
this.removeTab(_c59);
}
};
DockBinding.prototype.closeTabsExcept=function(_c5e){
var tabs=this.getTabBindings();
while(tabs.hasNext()){
var tab=tabs.getNext();
if(tab!=_c5e){
this.closeTab(tab);
}
}
};
DockBinding.prototype.saveContainedEditor=function(_c61){
var _c62=_c61.getAssociatedView();
_c62.saveContainedEditor();
var self=this;
var _c64={handleBroadcast:function(_c65,arg){
switch(_c65){
case BroadcastMessages.CURRENT_SAVED:
if(arg.handle==_c62.getHandle()){
EventBroadcaster.unsubscribe(BroadcastMessages.CURRENT_SAVED,_c64);
if(arg.isSuccess){
self.removeTab(_c61);
}
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.CURRENT_SAVED,_c64);
};
DockBinding.prototype.appendTabByBindings=function(_c67,_c68){
if(this.isEmpty){
this.isEmpty=false;
this.isActivatable=true;
this.setWidth(false);
this.dispatchAction(DockBinding.ACTION_OPENED);
}
DockBinding.superclass.appendTabByBindings.call(this,_c67,_c68);
};
DockBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
DockBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
DockBinding.prototype.setWidth=function(_c69){
_c69=_c69?_c69+"px":"100%";
this.bindingElement.style.width=_c69;
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
DockBinding.prototype.showControls=function(_c6a){
var tabs=this.getChildBindingByLocalName(this._nodename_tabs);
if(_c6a){
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
var _c6d=DockControlBinding.newInstance(this.bindingDocument);
_c6d.setControlType(type);
return _c6d;
};
DockTabsBinding.prototype.flex=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _c6f=self.containingTabBoxBinding.getWidth();
if(!isNaN(_c6f)){
_c6f=_c6f>0?_c6f-1:0;
self.bindingElement.style.width=new String(_c6f)+"px";
}
}
setTimeout(fix,250);
fix();
}
DockTabsBinding.superclass.flex.call(this);
};
DockTabsBinding.prototype.handleCrawler=function(_c70){
DockTabsBinding.superclass.handleCrawler.call(this,_c70);
switch(_c70.id){
case FlexBoxCrawler.ID:
this._explorerFlexHack();
break;
}
};
DockTabsBinding.prototype._explorerFlexHack=function(){
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
};
DockTabsBinding.newInstance=function(_c73){
var _c74=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktabs",_c73);
return UserInterface.registerBinding(_c74,DockTabsBinding);
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
DockTabBinding.prototype.setAssociatedView=function(_c75){
this._viewBinding=_c75;
};
DockTabBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
DockTabBinding.prototype.serialize=function(){
var _c76=DockTabBinding.superclass.serialize.call(this);
if(_c76){
_c76.label=null;
_c76.image=null;
_c76.handle=this.getHandle();
}
return _c76;
};
DockTabBinding.prototype.setHandle=function(_c77){
this.setProperty("handle",_c77);
};
DockTabBinding.prototype.getHandle=function(){
return this.getProperty("handle");
};
DockTabBinding.prototype.setEntityToken=function(_c78){
if(this._entityToken==null){
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
this._entityToken=_c78;
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
var _c79=DialogControlBinding.newInstance(this.bindingDocument);
_c79.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_c79);
this._controlGroupBinding.attachRecursive();
};
DockTabBinding.prototype.setDirty=function(_c7a){
if(this.containingTabBoxBinding.type==DockBinding.TYPE_EDITORS){
if(this.isDirty!=_c7a){
this.isDirty=_c7a;
if(Binding.exists(this.labelBinding)){
var _c7b=this.labelBinding.getLabel();
if(_c7b!=null){
this.labelBinding.setLabel(_c7a?"*"+_c7b:_c7b.slice(1,_c7b.length));
}else{
this.labelBinding.setLabel(_c7a?"*":"");
}
}
}
var _c7c=top.app.bindingMap.broadcasterCurrentTabDirty;
if(this.isDirty==true){
this.subscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_DIRTY,this);
_c7c.enable();
}else{
this.unsubscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_CLEAN,this);
_c7c.disable();
}
}else{
Dialog.warning("Dirty denied","Only editor docks should invoke the dirty state!");
}
};
DockTabBinding.prototype.updateDisplay=function(_c7d){
this.setLabel(_c7d.getLabel());
this.setImage(_c7d.getImage());
this.setToolTip(_c7d.getToolTip());
};
DockTabBinding.prototype.updateEntityToken=function(_c7e){
this.setEntityToken(_c7e.getEntityToken());
};
DockTabBinding.prototype.handleAction=function(_c7f){
DockTabBinding.superclass.handleAction.call(this,_c7f);
var _c80=_c7f.target;
switch(_c7f.type){
case ControlBinding.ACTION_COMMAND:
if(_c80.controlType==ControlBinding.TYPE_CLOSE){
this.close();
}
break;
case MenuItemBinding.ACTION_COMMAND:
if(_c7f.listener==this.contextMenuBinding){
this._handleContextMenuItemBinding(_c80);
}
break;
}
};
DockTabBinding.prototype._handleContextMenuItemBinding=function(_c81){
var cmd=_c81.getProperty("cmd");
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
DockTabBinding.prototype.setLabel=function(_c83){
if(!_c83){
if(!this.getLabel()){
_c83=DockTabBinding.LABEL_TABLOADING;
}else{
if(this.getLabel()==DockTabBinding.LABEL_TABLOADING){
_c83=DockTabBinding.LABEL_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setLabel.call(this,_c83);
};
DockTabBinding.prototype.setImage=function(_c84){
if(!_c84){
if(!this.getImage()){
_c84=DockTabBinding.IMG_TABLOADING;
}else{
if(this.getImage()==DockTabBinding.IMG_TABLOADING){
_c84=DockTabBinding.IMG_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setImage.call(this,_c84);
};
DockTabBinding.prototype._viewSource=function(cmd){
var def=ViewDefinitions["Composite.Management.SourceCodeViewer"];
def.argument={action:cmd,doc:this._viewBinding.windowBinding.getContentDocument()};
var _c87=Resolver.resolve(this.getLabel());
switch(cmd){
case DockTabPopupBinding.CMD_VIEWSOURCE:
def.label="Source: "+_c87;
break;
case DockTabPopupBinding.CMD_VIEWGENERATED:
def.label="Generated: "+_c87;
break;
case DockTabPopupBinding.CMD_VIEWSERIALIZED:
def.label="Serialized: "+_c87;
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
var _c89=this.bindingElement;
setTimeout(function(){
_c89.style.bottom="auto";
},25);
}
};
DockTabBinding.prototype.handleBroadcast=function(_c8a,arg){
DockTabBinding.superclass.handleBroadcast.call(this,_c8a,arg);
var body=this._viewBinding.getContentDocument().body;
var root=UserInterface.getBinding(body);
switch(_c8a){
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
DockTabBinding.prototype.select=function(_c8f){
DockTabBinding.superclass.select.call(this,_c8f);
this._updateBroadcasters();
if(_c8f!=true){
this._updateTree();
}
this._updateGlobalEntityToken();
};
DockTabBinding.prototype.close=function(){
this.containingTabBoxBinding.closeTab(this);
};
DockTabBinding.prototype._updateBroadcasters=function(){
if(this.isSelected){
var _c90=top.app.bindingMap.broadcasterCurrentTabDirty;
var _c91=top.app.bindingMap.broadcasterCurrentIsEditor;
if(this._isEditorDockTab()){
_c91.enable();
if(this.isDirty){
_c90.enable();
}else{
_c90.disable();
}
}else{
_c91.disable();
_c90.disable();
}
}
};
DockTabBinding.prototype._updateTree=function(_c92){
if(this._canUpdateTree||_c92){
EventBroadcaster.broadcast(BroadcastMessages.DOCKTABBINDING_SELECT,this);
}
};
DockTabBinding.prototype._isEditorDockTab=function(){
var _c93=false;
if(this._viewBinding!=null){
var win=this._viewBinding.getContentWindow();
if(win!=null&&win.bindingMap!=null){
var _c95=win.bindingMap.savebutton;
if(_c95!=null){
_c93=true;
}
}
}
return _c93;
};
DockTabBinding.prototype._updateGlobalEntityToken=function(){
StageBinding.entityToken=this._entityToken;
};
DockTabBinding.newInstance=function(_c96){
var _c97=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktab",_c96);
return UserInterface.registerBinding(_c97,DockTabBinding);
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
DockPanelsBinding.newInstance=function(_c98){
var _c99=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanels",_c98);
return UserInterface.registerBinding(_c99,DockPanelsBinding);
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
DockPanelBinding.prototype.select=function(_c9a){
DockPanelBinding.superclass.select.call(this,_c9a);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.unselect=function(){
DockPanelBinding.superclass.unselect.call(this);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.flex=function(){
this.dispatchAction(Binding.ACTION_DIMENSIONCHANGED);
};
DockPanelBinding.prototype.handleCrawler=function(_c9b){
DockPanelBinding.superclass.handleCrawler.call(this,_c9b);
if(_c9b.response==null){
if(_c9b.type==NodeCrawler.TYPE_DESCENDING){
if(this.viewBinding!=null){
if(_c9b.id==FocusCrawler.ID){
_c9b.nextNode=this.viewBinding.bindingElement;
}
}
}
}
};
DockPanelBinding.newInstance=function(_c9c){
var _c9d=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanel",_c9c);
return UserInterface.registerBinding(_c9d,DockPanelBinding);
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
DockControlBinding.newInstance=function(_c9e){
var _c9f=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_c9e);
return UserInterface.registerBinding(_c9f,DockControlBinding);
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
ViewBinding.getInstance=function(_ca0){
var _ca1=ViewBinding._instances.get(_ca0);
if(!_ca1){
var cry="ViewBinding.getInstance: No such instance: "+_ca0;
SystemLogger.getLogger("ViewBinding [static]").error(cry);
SystemDebug.stack(arguments);
if(Application.isDeveloperMode){
alert(cry);
}
}
return _ca1;
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
var _ca4=!System.hasActivePerspectives&&Client.isExplorer;
if(this.isFreeFloating==true&&!_ca4){
if(snap.isVisible==true){
if(snap.isAttached==true){
var _ca5=snap.boxObject.getGlobalPosition();
var _ca6=snap.boxObject.getDimension();
if(!Point.isEqual(_ca5,this._lastknownposition)){
this.setPosition(_ca5);
this._lastknownposition=_ca5;
}
if(!Dimension.isEqual(_ca6,this._lastknowndimension)){
this.setDimension(_ca6);
this._lastknowndimension=_ca6;
var _ca7=_ca6.h-ViewBinding.VERTICAL_ADJUST;
_ca7=_ca7<0?0:_ca7;
this.windowBinding.getBindingElement().style.height=new String(_ca7)+"px";
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
var _ca8=this._viewDefinition.flowHandle;
if(_ca8!=null){
FlowControllerService.CancelFlow(_ca8);
}
}
if(this._viewDefinition!=null){
var _ca9=this._viewDefinition.handle;
EventBroadcaster.broadcast(BroadcastMessages.VIEW_CLOSED,_ca9);
this.logger.fine("ViewBinding closed: \""+_ca9+"\"");
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
var _cab=null;
if(this._viewDefinition!=null){
_cab=this._viewDefinition.handle;
}
return _cab;
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
ViewBinding.prototype.setDefinition=function(_cac){
this._viewDefinition=_cac;
if(_cac.flowHandle!=null){
this.subscribe(BroadcastMessages.CLOSE_VIEWS);
}
};
ViewBinding.prototype.getDefinition=function(){
return this._viewDefinition;
};
ViewBinding.prototype.handleAction=function(_cad){
ViewBinding.superclass.handleAction.call(this,_cad);
var _cae=_cad.target;
switch(_cad.type){
case RootBinding.ACTION_PHASE_1:
case RootBinding.ACTION_PHASE_2:
case RootBinding.ACTION_PHASE_3:
if(_cad.type==RootBinding.ACTION_PHASE_1){
if(this.isActivated&&!_cae.isActivated){
_cae.onActivate();
}
}
_cad.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
if(this.isFreeFloating==true){
if(_cae==this._snapBinding){
if(this.isVisible==true){
this.updatePositionDimension();
_cad.consume();
}
}
}
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(this.isFreeFloating==true){
if(_cae==this._snapBinding){
if(_cae.isVisible==true){
this.show();
}else{
this.hide();
}
}
}
break;
case WindowBinding.ACTION_LOADED:
case WindowBinding.ACTION_ONLOAD:
if(_cae.getContentWindow().isPostBackDocument){
if(_cad.type==WindowBinding.ACTION_ONLOAD){
var arg=this._viewDefinition.argument;
if(arg!=null&&arg.list!=null&&arg.url!=null){
_cae.post(arg.list,arg.url);
arg.list=null;
arg.url=null;
}
}
}else{
if(Client.isExplorer==true){
if(_cae==this.windowBinding){
var self=this;
DOMEvents.addEventListener(_cae.getContentWindow(),DOMEvents.UNLOAD,{handleEvent:function(e){
if(Binding.exists(self._coverBinding)==true){
self._coverBinding.show();
}
}});
}
if(_cad.type==WindowBinding.ACTION_ONLOAD){
if(this._coverBinding){
this._coverBinding.hide();
}
}
}
}
if(_cad.type==WindowBinding.ACTION_ONLOAD){
var win=_cae.getContentWindow();
if(win.WindowManager==null){
if(!this._isLoaded){
this._onLoadingCompleted(_cae);
}
}
}
_cad.consume();
break;
case PageBinding.ACTION_ATTACHED:
if(!_cae.label&&this._viewDefinition.label){
_cae.label=this._viewDefinition.label;
}
if(!_cae.image&&this._viewDefinition.image){
_cae.image=this._viewDefinition.image;
}
if(_cae.bindingWindow==this.getContentWindow()){
this._pageBinding=_cae;
this._injectPageArgument();
}
case PageBinding.ACTION_INITIALIZED:
if(_cae.bindingWindow==this.getContentWindow()){
if(Client.isExplorer&&this._coverBinding){
this._coverBinding.hide();
}
if(!this._isLoaded){
this._onLoadingCompleted();
}
}
break;
case Binding.ACTION_DISPOSED:
if(this.isFreeFloating&&_cae==this._snapBinding){
this.removeActionListener(Binding.ACTION_DISPOSED);
this.dispose();
_cad.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
case WizardPageBinding.ACTION_FINISH:
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
_cad.consume();
break;
case ViewBinding.ACTION_DETACH:
this.setDefinition(ViewDefinitions["Composite.Management.Null"]);
ViewBinding._instances.set(this._viewDefinition.handle,this);
break;
}
};
ViewBinding.prototype.handleBroadcast=function(_cb3,arg){
ViewBinding.superclass.handleBroadcast.call(this,_cb3,arg);
switch(_cb3){
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
var _cb7=def.argument;
if(_cb7!=null){
page.setPageArgument(_cb7);
}
var _cb8=def.width;
if(_cb8!=null){
page.width=_cb8;
}
var _cb9=def.height;
if(_cb9!=null){
page.height=_cb9;
}
}
};
ViewBinding.prototype.handleCrawler=function(_cba){
ViewBinding.superclass.handleCrawler.call(this,_cba);
switch(_cba.type){
case NodeCrawler.TYPE_DESCENDING:
if(this.isFreeFloating==true){
if(_cba.id==FocusCrawler.ID){
if(_cba.previousNode!=this._snapBinding.bindingElement){
_cba.response=NodeCrawler.SKIP_NODE;
}
}
}
break;
case NodeCrawler.TYPE_ASCENDING:
if(this.isFreeFloating==true){
_cba.nextNode=this._snapBinding.bindingElement;
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
ViewBinding.prototype.setPosition=function(_cbb){
_cbb.x+=ViewBinding.HORIZONTAL_ADJUST;
this.bindingElement.style.left=_cbb.x+"px";
this.bindingElement.style.top=_cbb.y+"px";
};
ViewBinding.prototype.setDimension=function(_cbc){
_cbc.h-=ViewBinding.VERTICAL_ADJUST;
_cbc.w-=ViewBinding.HORIZONTAL_ADJUST;
_cbc.w-=1;
if(_cbc.h<0){
_cbc.h=0;
}
if(_cbc.w<0){
_cbc.w=0;
}
this.bindingElement.style.width=String(_cbc.w)+"px";
this.bindingElement.style.height=String(_cbc.h)+"px";
};
ViewBinding.prototype.snapToBinding=function(_cbd){
this.isFlexBoxBehavior=false;
_cbd.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_cbd.addActionListener(Binding.ACTION_POSITIONCHANGED,this);
_cbd.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_cbd.addActionListener(Binding.ACTION_DISPOSED,this);
if(this._snapBinding){
this._snapBinding.removeActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_POSITIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_DISPOSED,this);
this._snapBinding.viewBinding=null;
}
this._snapBinding=_cbd;
this._snapBinding.viewBinding=this;
this.isFreeFloating=true;
if(!this._isViewBindingInitialized){
this.initialize();
}
};
ViewBinding.prototype.getMigrationParent=function(){
var _cbe=null;
if(this.isFreeFloating==true){
_cbe=this._snapBinding.getBindingElement();
}else{
_cbe=ViewBinding.superclass.getMigrationParent.call(this);
}
return _cbe;
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
ViewBinding.prototype.reload=function(_cbf){
this._isLoaded=false;
this.windowBinding.reload(_cbf);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
};
ViewBinding.prototype.saveContainedEditor=function(){
var _cc0=false;
var page=this._pageBinding;
if(page!=null&&page instanceof EditorPageBinding){
if(page.canSave()){
page.doSave();
_cc0=true;
}
}
if(!_cc0){
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
ViewBinding.newInstance=function(_cc4){
var _cc5=DOMUtil.createElementNS(Constants.NS_UI,"ui:view",_cc4);
var _cc6=UserInterface.registerBinding(_cc5,ViewBinding);
_cc6.windowBinding=_cc6.add(WindowBinding.newInstance(_cc4));
_cc6.windowBinding.isFlexible=false;
return _cc6;
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
var _cce=this.bindingWindow.__doPostBack;
var _ccf=false;
if(!form.__isSetup){
DOMEvents.addEventListener(this.bindingWindow,DOMEvents.UNLOAD,{handleEvent:function(){
if(_ccf){
Application.unlock(self);
}
}});
}
this.bindingWindow.__doPostBack=function(_cd0,_cd1){
if(!form.__isSetup){
Application.lock(self);
_ccf=true;
}
self.manifestAllDataBindings();
_cce(_cd0,_cd1);
if(Application.isDeveloperMode){
self._debugDotNetPostback();
}
};
};
PageBinding.prototype.postMessage=function(_cd2,list){
var _cd4=this.bindingWindow.bindingMap.__REQUEST;
if(_cd4!=null&&this._isDotNet()){
switch(_cd2){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_PERSIST:
if(this.bindingWindow.DataManager.isDirty){
if(this.validateAllDataBindings()){
if(list!=null){
list.add(this);
}
_cd4.postback(_cd2);
}
}
break;
default:
_cd4.postback(_cd2);
break;
}
}
if(list!=null){
this._postMessageToDescendants(_cd2,list);
}
};
PageBinding.prototype._postMessageToDescendants=function(_cd5,list){
var _cd7=this.getDescendantBindingsByType(WindowBinding);
_cd7.each(function(win){
var page=win.getPageBinding();
if(page!=null){
page.postMessage(_cd5,list);
}
});
};
PageBinding.prototype._debugDotNetPostback=function(){
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_cdb){
list.add({name:_cdb.name,value:_cdb.value});
});
var out="";
list.each(function(_cdd){
out+=_cdd.name+": "+_cdd.value+"\n";
});
this.logger.debug(out);
};
PageBinding.prototype.handleAction=function(_cde){
PageBinding.superclass.handleAction.call(this,_cde);
var _cdf=_cde.target;
switch(_cde.type){
case RootBinding.ACTION_PHASE_3:
if(_cdf==UserInterface.getBinding(this.bindingDocument.body)){
_cdf.removeActionListener(RootBinding.ACTION_PHASE_3,this);
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
this.doPostBack(_cdf);
}
_cde.consume();
break;
case PageBinding.ACTION_DOVALIDATEDPOSTBACK:
if(this._isDotNet()){
var _ce0=this.validateAllDataBindings();
if(_ce0){
this.doPostBack(_cdf);
}
}
_cde.consume();
break;
case BalloonBinding.ACTION_INITIALIZE:
_cde.consume();
break;
case PageBinding.ACTION_BLOCK_INIT:
if(this._initBlockers==null){
this._initBlockers=new Map();
}
this._initBlockers.set(_cdf.key,true);
break;
case PageBinding.ACTION_UNBLOCK_INIT:
if(this._initBlockers!=null){
if(this._initBlockers.has(_cdf.key)){
this._initBlockers.del(_cdf.key);
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
var _ce2={handleAction:function(_ce3){
if(_ce3.target==self){
self.removeActionListener(PageBinding.ACTION_UPDATED,_ce2);
MessageQueue.udpdate();
}
}};
this.addActionListener(PageBinding.ACTION_UPDATED,_ce2);
}else{
MessageQueue.udpdate();
}
_cde.consume();
break;
}
};
PageBinding.prototype.handleBroadcast=function(_ce4,arg){
PageBinding.superclass.handleBroadcast.call(this,_ce4,arg);
switch(_ce4){
case BroadcastMessages.MESSAGEQUEUE_REQUESTED:
var _ce6=arg;
if(!this._canPostBack&&!_ce6){
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
PageBinding.prototype.doPostBack=function(_ce8){
if(this._canPostBack){
if(_ce8!=null&&this._isDotNet()){
var _ce9=_ce8.getCallBackID();
var _cea=_ce8.getCallBackArg();
if(_ce9!=null){
_ce9=_ce9.replace(/_/g,"$");
}else{
_ce9="";
}
if(_cea==null){
_cea="";
}
this.bindingWindow.__doPostBack(_ce9,_cea);
}
}
};
PageBinding.prototype.validateAllDataBindings=function(){
var _ceb=true;
var _cec=this.bindingWindow.DataManager.getAllDataBindings();
while(_cec.hasNext()&&_ceb){
var _ced=_cec.getNext();
if(_ced.isAttached){
var _cee=_ced.validate();
if(_ceb&&!_cee){
_ceb=false;
this.logger.debug("Invalid DataBinding: "+_ced.toString()+" ("+_ced.getName()+")");
break;
}
}
}
return _ceb;
};
PageBinding.prototype.manifestAllDataBindings=function(){
var list=new List();
var _cf0=this.bindingWindow.DataManager.getAllDataBindings();
while(_cf0.hasNext()){
var _cf1=_cf0.getNext();
if(_cf1.isAttached){
var _cf2=_cf1.manifest();
if(_cf2!=null){
list.add(_cf2);
}
}
}
return list;
};
PageBinding.prototype.cleanAllDataBindings=function(){
var _cf3=this.bindingWindow.DataManager.getAllDataBindings();
while(_cf3.hasNext()){
var _cf4=_cf3.getNext();
if(_cf4.isAttached){
_cf4.clean();
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
var _cf6=this._cachedFocus.getBinding();
if(_cf6){
_cf6.blur();
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
var _cf7=this.getProperty("width");
if(!_cf7){
_cf7=this.hasClassName(DialogPageBinding.CLASSNAME_TABBOXED)?DialogPageBinding.DEFAULT_TABBOXED_WIDTH:DialogPageBinding.DEFAULT_WIDTH;
}
this.width=_cf7;
}
if(this.height==null){
var _cf8=this.getProperty("height");
this.height=_cf8?_cf8:DialogPageBinding.DEFAULT_HEIGHT;
}
if(this.minheight==null){
var _cf9=this.getProperty("minheight");
if(_cf9!=null){
this.minheight=_cf9;
}
}
if(this.controls==null){
var _cfa=this.getProperty("controls");
this.controls=_cfa?_cfa:DialogPageBinding.DEFAULT_CONTROLS;
}
if(!this.isResizable){
var _cfb=this.getProperty("resizable");
this.isResizable=_cfb?_cfb:DialogPageBinding.DEFAULT_RESIZABLE;
}
if(this.height=="auto"){
this.enableAutoHeightLayoutMode(true);
}
};
DialogPageBinding.prototype.enableAutoHeightLayoutMode=function(_cfc){
if(_cfc!=this.isAutoHeightLayoutMode){
if(_cfc){
this.attachClassName("auto");
}else{
this.detachClassName("auto");
}
this.isAutoHeightLayoutMode=_cfc;
}
};
DialogPageBinding.prototype.handleAction=function(_cfd){
DialogPageBinding.superclass.handleAction.call(this,_cfd);
var _cfe=_cfd.target;
switch(_cfd.type){
case PageBinding.ACTION_ATTACHED:
if(_cfe!=this&&_cfe.isFitAsDialogSubPage){
_cfe.makeDialogSubPage();
}
break;
case ButtonBinding.ACTION_COMMAND:
_cfd.consume();
if(_cfe.response!=null){
this.response=_cfe.response;
switch(_cfe.response){
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
DialogPageBinding.prototype._disableAcceptButton=function(_cff){
var _d00=this.bindingWindow.bindingMap.buttonAccept;
if(_d00!=null){
_d00.setDisabled(_cff);
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
DialogPageBodyBinding.prototype._setFitnessHeight=function(_d01){
var _d02=CSSComputer.getPadding(this.bindingElement);
var _d03=CSSComputer.getBorder(this.bindingElement);
_d01+=_d02.top+_d02.bottom;
_d01+=_d03.top+_d03.bottom;
if(_d01>this.bindingElement.offsetHeight){
this.bindingElement.style.height=_d01+"px";
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
EditorPageBinding.prototype.handleAction=function(_d0b){
EditorPageBinding.superclass.handleAction.call(this,_d0b);
var _d0c=_d0b.target;
switch(_d0b.type){
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
var _d0d=-1;
this._messengers.each(function(page){
var res=page.bindingWindow==_d0c.bindingWindow;
if(res){
page.bindingWindow.DataManager.isDirty=false;
if(_d0d==-1){
_d0d=0;
}
}else{
_d0d++;
}
return res;
});
if(_d0d>-1){
this._messengers.del(_d0d);
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
_d0b.consume();
break;
case Binding.ACTION_INVALID:
this.enableSave(false);
this._invalidBindings.set(_d0c.key,_d0c);
if(_d0c instanceof FieldsBinding){
this._updateStatusBar();
}
break;
case Binding.ACTION_VALID:
this._invalidBindings.del(_d0c.key);
if(_d0c instanceof FieldsBinding){
this._updateStatusBar();
}
if(!this._invalidBindings.hasEntries()){
this.enableSave(true);
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_d0c==this._tabBoxBinding){
if(this._windowBinding!=null){
var tab=_d0c.getSelectedTabBinding();
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
_d0b.consume();
break;
case TabBoxBinding.ACTION_UNSELECTED:
if(_d0c==this._tabBoxBinding){
this.postMessage(EditorPageBinding.MESSAGE_PERSIST);
}
_d0b.consume();
break;
case WindowBinding.ACTION_LOADED:
if(_d0c==this._windowBinding){
if(this._isGeneratingPreview==true){
this._generatePreview();
this._isGeneratingPreview=false;
}
_d0b.consume();
}
break;
case WindowBinding.ACTION_ONLOAD:
if(_d0c==this._windowBinding){
if(_d0c.getContentWindow().isPostBackDocument!=true){
if(Client.isPrism){
Prism.enableCache();
}
var self=this;
setTimeout(function(){
Application.unlock(self);
},100);
if(EventBroadcaster.hasSubscribers(BroadcastMessages.XHTML_MARKUP_ON)){
var _d12=WindowBinding.getMarkup(this._windowBinding);
if(_d12!=null){
EventBroadcaster.broadcast(BroadcastMessages.XHTML_MARKUP_ON,_d12);
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
var _d13=this.bindingWindow.bindingMap.savebutton;
if(_d13!=null&&!_d13.isDisabled){
_d13.fireCommand();
}
};
EditorPageBinding.prototype._saveEditorPage=function(){
if(Application.isDeveloperMode){
}
if(this.validateAllDataBindings()){
this.bindingWindow.DataManager.isDirty=false;
var _d14=this.bindingWindow.bindingMap.__REQUEST;
if(_d14!=null){
_d14.postback(EditorPageBinding.MESSAGE_SAVE);
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
EditorPageBinding.prototype.postMessage=function(_d15){
this._message=null;
switch(_d15){
case EditorPageBinding.MESSAGE_SAVE:
this._postMessageToDescendants(_d15,this._messengers);
if(!this._messengers.hasEntries()){
this._saveEditorPage();
}else{
this._message=_d15;
}
break;
case EditorPageBinding.MESSAGE_PERSIST:
this._message=_d15;
EditorPageBinding.superclass.postMessage.call(this,_d15,this._messengers);
break;
case EditorPageBinding.MESSAGE_REFRESH:
EditorPageBinding.superclass.postMessage.call(this,_d15,this._messengers);
break;
}
};
EditorPageBinding.prototype.handleBroadcast=function(_d16,arg){
EditorPageBinding.superclass.handleBroadcast.call(this,_d16,arg);
switch(_d16){
case BroadcastMessages.HIGHLIGHT_KEYWORDS:
var _d18=arg;
if(UserInterface.isBindingVisible(this._windowBinding)){
WindowBinding.highlightKeywords(this._windowBinding,_d18);
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
var _d19=new List();
this._invalidBindings.each(function(key,_d1b){
var list=_d1b.getInvalidLabels();
if(list){
list.each(function(_d1d){
_d19.add(_d1d);
});
}
});
if(_d19.hasEntries()){
var _d1e="";
while(_d19.hasNext()){
_d1e+=_d19.getNext().toLowerCase();
if(_d19.hasNext()){
_d1e+=", ";
}else{
_d1e+=".";
}
}
var _d1f=StringBundle.getString("ui","Website.App.StatusBar.ErrorInField");
StatusBar.error(_d1f+" "+_d1e);
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
EditorPageBinding.prototype.enableSave=function(_d20){
var _d21=this.bindingDocument.getElementById("broadcasterCanSave");
if(_d21){
var _d22=UserInterface.getBinding(_d21);
if(_d20){
_d22.enable();
}else{
_d22.disable();
}
}else{
throw new Error("A required BroadcasterBinding could not be located.");
}
};
EditorPageBinding.prototype.enableSaveAs=function(){
var _d23=this.bindingDocument.getElementById(EditorPageBinding.ID_SAVEASBUTTON);
if(_d23!=null){
UserInterface.getBinding(_d23).enable();
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
var _d24=this._windowBinding.getContentDocument().title;
if(_d24==WindowBinding.POSTBACK_TITLE){
if(this.validateAllDataBindings()){
this.manifestAllDataBindings();
var _d25=this._tabBinding.getCallBackID();
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d27){
if(_d27.name=="__EVENTTARGET"&&_d25){
_d27.value=_d25;
}
list.add({name:_d27.name,value:_d27.value});
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
WizardPageBinding.prototype.handleAction=function(_d29){
WizardPageBinding.superclass.handleAction.call(this,_d29);
var _d2a=_d29.target;
switch(_d29.type){
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_FINISH:
if(this.validateAllDataBindings()==true){
this.doPostBack(_d2a);
}else{
_d29.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
this.doPostBack(_d2a);
break;
case Binding.ACTION_INVALID:
this._enableNextAndFinish(false);
_d29.consume();
break;
case Binding.ACTION_VALID:
this._enableNextAndFinish(true);
_d29.consume();
break;
}
};
WizardPageBinding.prototype._enableNextAndFinish=function(_d2b){
var next=this.bindingWindow.bindingMap.nextbutton;
var _d2d=this.bindingWindow.bindingMap.finishbutton;
if(next){
next.setDisabled(!_d2b);
}
if(_d2d){
_d2d.setDisabled(!_d2b);
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
MarkupAwarePageBinding.prototype.handleBroadcast=function(_d2e,arg){
MarkupAwarePageBinding.superclass.handleBroadcast.call(this,_d2e,arg);
var self=this;
switch(_d2e){
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
MarkupAwarePageBinding.prototype._handleMarkup=function(_d32){
};
MarkupAwarePageBinding.prototype._activate=function(_d33){
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
var _d34=this.bindingWindow.bindingMap.moreactionstoolbargroup;
this._moreActionsWidth=_d34.boxObject.getDimension().w;
_d34.hide();
var _d35=this.boxObject.getDimension().h;
this.bindingElement.style.height=_d35+"px";
var self=this;
var _d37=this.bindingWindow.bindingMap.moreactionsbutton;
_d37.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_d38){
self._showMoreActions();
_d38.consume();
}});
var _d39=this.bindingWindow.bindingMap.moreactionspopup;
_d39.addActionListener(MenuItemBinding.ACTION_COMMAND,{handleAction:function(_d3a){
var item=_d3a.target;
self._handleSystemAction(item.associatedSystemAction);
}});
SystemToolBarBinding.superclass.onBindingInitialize.call(this);
};
SystemToolBarBinding.prototype.handleBroadcast=function(_d3c,arg){
SystemToolBarBinding.superclass.handleBroadcast.call(this,_d3c,arg);
switch(_d3c){
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
var _d40=self.bindingWindow.bindingMap.moreactionstoolbargroup;
if(_d40!=null){
_d40.hide();
}
},0);
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
var _d41=this.bindingWindow.WindowManager;
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
var _d42=new String("");
this._actionProfile.each(function(_d43,list){
list.each(function(_d45){
_d42+=_d45.getHandle()+";";
});
});
return _d42;
};
SystemToolBarBinding.prototype.handleAction=function(_d46){
SystemToolBarBinding.superclass.handleAction.call(this,_d46);
switch(_d46.type){
case ButtonBinding.ACTION_COMMAND:
var _d47=_d46.target;
this._handleSystemAction(_d47.associatedSystemAction);
break;
}
};
SystemToolBarBinding.prototype._handleSystemAction=function(_d48){
if(_d48!=null){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _d4a=list.getFirst();
var _d4b=_d4a.node;
}
SystemAction.invoke(_d48,_d4b);
}
};
SystemToolBarBinding.prototype.buildLeft=function(){
if(this.isInitialized&&this._actionProfile!=null&&this._actionProfile.hasEntries()){
var doc=this.bindingDocument;
var self=this;
this._actionProfile.each(function(_d4e,list){
var _d50=new List();
list.reset();
while(list.hasNext()){
var _d51=list.getNext();
var _d52=null;
if(_d51.isInToolBar()){
if(_d51.isInFolder()){
alert("IsInFolder not implemented!");
}else{
_d52=self.getToolBarButtonBinding(_d51);
}
}
if(_d52!=null){
_d50.add(_d52);
}
}
if(_d50.hasEntries()){
var _d53=ToolBarGroupBinding.newInstance(doc);
_d50.each(function(_d54){
_d53.add(_d54);
});
self.addLeft(_d53);
}
});
this.attachRecursive();
this._containAllButtons();
}
};
SystemToolBarBinding.prototype._containAllButtons=function(){
var _d55=this.bindingWindow.bindingMap.toolsbutton;
var _d56=this.bindingWindow.bindingMap.moreactionstoolbargroup;
var _d57=_d55.bindingElement.offsetLeft-this._moreActionsWidth;
var _d58=0;
var _d59=new List();
var _d5a,_d5b=this._toolBarBodyLeft.getDescendantBindingsByLocalName("toolbarbutton");
while((_d5a=_d5b.getNext())!=null){
if(!_d5a.isVisible){
_d5a.show();
}
_d58+=_d5a.boxObject.getDimension().w;
if(_d58>=_d57){
_d59.add(_d5a);
_d5a.hide();
}
}
if(_d59.hasEntries()){
var _d5c=_d59.getFirst().bindingElement.parentNode;
UserInterface.getBinding(_d5c).setLayout(ToolBarGroupBinding.LAYOUT_LAST);
this._moreActions=new List();
while((_d5a=_d59.getNext())!=null){
this._moreActions.add(_d5a.associatedSystemAction);
}
_d56.show();
}else{
this._moreActions=null;
_d56.hide();
}
};
SystemToolBarBinding.prototype._showMoreActions=function(){
if(this._moreActions!=null){
var _d5d=this.bindingWindow.bindingMap.moreactionspopup;
_d5d.empty();
while((action=this._moreActions.getNext())!=null){
var item=MenuItemBinding.newInstance(_d5d.bindingDocument);
item.setLabel(action.getLabel());
item.setToolTip(action.getToolTip());
item.imageProfile=new ImageProfile({image:action.getImage(),imageDisabled:action.getDisabledImage()});
if(action.isDisabled()){
item.disable();
}
item.associatedSystemAction=action;
_d5d.add(item);
}
_d5d.attachRecursive();
this._moreActions=null;
}
};
SystemToolBarBinding.prototype.getToolBarButtonBinding=function(_d5f){
var _d60=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _d61=_d5f.getLabel();
var _d62=_d5f.getToolTip();
var _d63=_d5f.getImage();
var _d64=_d5f.isDisabled();
if(_d63&&_d63.indexOf("size=")==-1){
_d63=_d63+"&size="+this.getImageSize();
_d60.imageProfile=new ImageProfile({image:_d63});
}
if(_d61){
_d60.setLabel(_d61);
}
if(_d62){
_d60.setToolTip(_d62);
}
if(_d5f.isDisabled()){
_d60.disable();
}
_d60.associatedSystemAction=_d5f;
return _d60;
};
SystemToolBarBinding.prototype._invokeDefaultAction=function(){
var _d65=this.getDescendantBindingByLocalName("toolbarbutton");
if(_d65!=null){
_d65.fireCommand();
}
};
SystemToolBarBinding.newInstance=function(_d66){
var _d67=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_d66);
return UserInterface.registerBinding(_d67,SystemToolBarBinding);
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
SystemTreeBinding.prototype.add=function(_d68){
var _d69=SystemTreeBinding.superclass.add.call(this,_d68);
if(!this._defaultTreeNode){
if(_d68 instanceof SystemTreeNodeBinding){
this._defaultTreeNode=_d68;
}
}
return _d69;
};
SystemTreeBinding.prototype.handleAction=function(_d6a){
SystemTreeBinding.superclass.handleAction.call(this,_d6a);
var _d6b=_d6a.target;
switch(_d6a.type){
case TreeNodeBinding.ACTION_ONFOCUS:
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
this._restorableFocusHandle=null;
this._handleSystemTreeFocus();
break;
case SystemTreeNodeBinding.ACTION_REFRESHED_YEAH:
this._updateRefreshingTrees(_d6b.key);
_d6a.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
case TreeNodeBinding.ACTION_BLUR:
var self=this;
setTimeout(function(){
if(!self._focusedTreeNodeBindings.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,null);
}
},0);
if(_d6a.type==TreeNodeBinding.ACTION_BLUR){
this._restorableFocusHandle=_d6b.getHandle();
}
break;
case TreeNodeBinding.ACTION_COMMAND:
EventBroadcaster.broadcast(BroadcastMessages.INVOKE_DEFAULT_ACTION);
_d6a.consume();
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
var _d6d=this._treeNodeBindings.get(this._restorableFocusHandle);
this.focusSingleTreeNodeBinding(_d6d);
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
SystemTreeBinding.prototype.registerTreeNodeBinding=function(_d6e){
SystemTreeBinding.superclass.registerTreeNodeBinding.call(this,_d6e);
var reg=this._entityTokenRegistry;
var _d70=_d6e.node.getEntityToken();
if(reg.has(_d70)){
reg.get(_d70).add(_d6e);
}else{
reg.set(_d70,new List([_d6e]));
}
var _d71=null;
if(this.isLockedToEditor){
if(_d70==StageBinding.entityToken){
if(_d6e.node.isTreeLockEnabled()){
_d71=_d6e;
}
}
}else{
if(this._backupfocushandle!=null){
if(this._backupfocushandle==_d6e.node.getHandle()){
_d71=_d6e;
}
}
}
if(_d71!=null){
this.focusSingleTreeNodeBinding(_d71);
}
};
SystemTreeBinding.prototype.unRegisterTreeNodeBinding=function(_d72){
SystemTreeBinding.superclass.unRegisterTreeNodeBinding.call(this,_d72);
var reg=this._entityTokenRegistry;
var _d74=_d72.node.getEntityToken();
if(reg.has(_d74)){
var list=reg.get(_d74);
list.del(_d72);
if(!list.hasEntries()){
reg.del(_d74);
}
}else{
this.logger.fatal("SystemTreeBinding out of synch: unRegisterTreeNodeBinding");
if(Application.isDeveloperMode){
Dialog.error("Attention Developer","Tree is out of synch. Please reproduce this bug and file a report.");
}
}
if(_d72.isRefreshing){
this._updateRefreshingTrees(binding.key);
}
if(!this.isLockedToEditor){
if(_d72.isFocused&&this._backupfocushandle==null){
this._backupfocushandle=_d72.node.getHandle();
var self=this;
setTimeout(function(){
self._backupfocushandle=null;
},200);
}
}
};
SystemTreeBinding.prototype._updateRefreshingTrees=function(key){
var _d78=this._refreshingTreeNodes;
if(_d78.hasEntries()&&_d78.has(key)){
_d78.del(key);
if(!_d78.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this._refreshToken);
this._refreshToken=null;
this._attemptRestorableFocus();
}
}
};
SystemTreeBinding.prototype._computeClipboardSetup=function(){
var _d79=false;
var _d7a=this.getFocusedTreeNodeBindings();
if(_d7a.hasEntries()){
_d79=true;
while(_d79&&_d7a.hasNext()){
var _d7b=_d7a.getNext();
if(!_d7b.isDraggable){
_d79=false;
}
}
}
SystemTreePopupBinding.isCutAllowed=_d79;
};
SystemTreeBinding.prototype._computeRefreshSetup=function(){
SystemTreePopupBinding.isRefreshAllowed=SystemTreeBinding.clipboard===null;
};
SystemTreeBinding.prototype.handleBroadcast=function(_d7c,arg){
SystemTreeBinding.superclass.handleBroadcast.call(this,_d7c,arg);
switch(_d7c){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
if(arg!=null||this.isFocused){
this._handleCommandBroadcast(_d7c,arg);
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
if(this.isFocused){
this._handleCommandBroadcast(_d7c);
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
var _d80=tab.perspectiveNode==null;
if(!_d80){
_d80=tab.perspectiveNode==this.perspectiveNode;
}
if(_d80){
var self=this,_d82=tab.getEntityToken();
setTimeout(function(){
if(_d82==null){
self.blurSelectedTreeNodes();
}else{
self._focusTreeNodeByEntityToken(_d82);
}
},250);
}
};
SystemTreeBinding.prototype._focusTreeNodeByEntityToken=function(_d83,_d84){
this.isLockFeatureFocus=true;
var _d85=null;
if(this._entityTokenRegistry.has(_d83)){
var list=this._entityTokenRegistry.get(_d83);
list.each(function(tn){
var _d88=true;
if(tn.node.isTreeLockEnabled()){
_d85=tn;
_d88=false;
}
return _d88;
});
if(_d85!=null){
if(!_d85.isFocused){
this.focusSingleTreeNodeBinding(_d85,true);
}else{
_d85.dispatchAction(TreeNodeBinding.ACTION_FOCUSED);
}
}
}
this.isLockFeatureFocus=false;
if(_d85==null&&_d84!=true){
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._fetchTreeForEntityToken(_d83);
self._focusTreeNodeByEntityToken(_d83,true);
}
Application.unlock(self);
StatusBar.clear();
},0);
}
};
SystemTreeBinding.prototype._fetchTreeForEntityToken=function(_d8a){
var _d8b=StageBinding.perspectiveNode.getEntityToken();
var _d8c=this.getOpenSystemNodes();
var map=System.getInvisibleBranch(_d8b,_d8a,_d8c);
if(map==null){
this.isLockedToEditor=false;
if(Application.isDeveloperMode){
Dialog.warning("Ouch!","Because the web service failed, tree has disabled the lock-tree-to-editor "+"feature. Otherwise, re-focus would fire the error indefinitely. Please try again.");
}
}else{
if(map.hasEntries()){
var self=this;
var _d8f=this._treeNodeBindings;
var _d90=new Map();
function fix(_d91,list){
if(!_d91.hasBeenOpened){
if(list.hasEntries()){
list.each(function(node){
if(!_d8f.has(node.getHandle())){
var _d94=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
_d90.set(node.getHandle(),_d94);
_d91.add(_d94);
}
});
_d91.attachRecursive();
}
}
_d91.open(true);
}
map.each(function(_d95,list){
if(_d8f.has(_d95)){
var _d97=_d8f.get(_d95);
fix(_d97,list);
}else{
if(_d90.has(_d95)){
var _d98=_d90.get(_d95);
fix(_d98,list);
}else{
}
}
});
}
}
};
SystemTreeBinding.prototype._handleCommandBroadcast=function(_d99,arg){
switch(_d99){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _d9b=arg;
if(_d9b!=null){
this._invokeServerRefresh(_d9b);
}else{
this._invokeManualRefresh();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
if(SystemTreeBinding.clipboard!=null){
SystemTreeBinding.clipboard.hideDrag();
}
var _d9c=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_CUT;
SystemTreeBinding.clipboard=_d9c;
_d9c.showDrag();
break;
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
var _d9c=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_COPY;
SystemTreeBinding.clipboard=_d9c;
break;
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
this._handlePaste();
break;
}
};
SystemTreeBinding.prototype._invokeServerRefresh=function(_d9d){
if(_d9d!=null&&_d9d=="null"){
if(Application.isDeveloperMode){
alert("Saa har vi balladen.");
}
}
if(this._entityTokenRegistry.has(_d9d)){
var list=this._entityTokenRegistry.get(_d9d).reset();
this._refreshToken=_d9d;
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this._refreshToken);
while(list.hasNext()){
var _d9f=list.getNext();
this._refreshingTreeNodes.set(_d9f.key,true);
setTimeout(function(){
_d9f.refresh(true);
},0);
}
}
};
SystemTreeBinding.prototype._invokeManualRefresh=function(){
var _da0=this.getFocusedTreeNodeBindings().getFirst();
if(_da0){
var _da1=_da0.getLabel();
var _da2=_da0.getAncestorBindingByLocalName("treenode");
if(_da2){
_da0=_da2;
}
this._refreshToken=null;
this._refreshingTreeNodes.set(_da0.key,true);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,null);
if(!StatusBar.state){
var _da3=StringBundle.getString("ui","Website.App.StatusBar.Refreshing");
StatusBar.busy(_da3,[_da1]);
}
_da0.refresh();
}
};
SystemTreeBinding.prototype._handlePaste=function(){
var _da4=SystemTreeBinding.clipboard;
if(_da4){
var type=_da4.dragType;
var _da6=this.getFocusedTreeNodeBindings().getFirst();
if(_da6.dragAccept){
if(_da6.acceptor.isAccepting(type)){
this._performPaste(_da6);
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteTypeNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteTypeNotAllowed"));
}
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteNotAllowed"));
}
}
};
SystemTreeBinding.prototype._performPaste=function(_da7){
var self=this;
function update(){
MessageQueue.update();
Application.unlock(self);
}
if(_da7.node.hasDetailedDropSupport()){
if(_da7.node.hasChildren()){
var _da9=_da7.node.getChildren();
Dialog.invokeModal(SystemTreeBinding.URL_DIALOG_DETAILEDPASTE,{handleDialogResponse:function(_daa,_dab){
if(_daa==Dialog.RESPONSE_ACCEPT){
Application.lock(self);
var _dac=_dab.get("switch");
var _dad=_dab.get("sibling");
if(_dac=="after"){
_dad++;
}
var _dae=_da7.accept(SystemTreeBinding.clipboard,_dad);
if(_dae){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}},_da9);
}else{
Application.lock(self);
var _daf=_da7.accept(SystemTreeBinding.clipboard,0);
if(_daf){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}else{
Application.lock(self);
var _daf=_da7.accept(SystemTreeBinding.clipboard,0);
if(_daf){
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
SystemTreeBinding.prototype.collapse=function(_db0){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,null);
if(_db0){
this.blurSelectedTreeNodes();
var _db1=this.getRootTreeNodeBindings();
_db1.each(function(_db2){
if(_db2.isContainer&&_db2.isOpen){
_db2.close();
_db2.hasBeenOpened=false;
_db2.empty();
}
});
}else{
SystemTreeBinding.superclass.collapse.call(this);
}
};
SystemTreeBinding.prototype.setLockToEditor=function(_db3){
if(_db3!=this.isLockedToEditor){
this.isLockedToEditor=_db3;
if(_db3){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
}
};
SystemTreeBinding.prototype.getOpenSystemNodes=function(){
var list=new List([StageBinding.perspectiveNode]);
var _db5=this.getRootTreeNodeBindings();
_db5.each(function(_db6){
var _db7=_db6.getOpenSystemNodes();
if(_db7!=null&&_db7.hasEntries()){
list.merge(_db7);
}
});
return list;
};
SystemTreeBinding.prototype.focusSingleTreeNodeBinding=function(_db8){
SystemTreeBinding.superclass.focusSingleTreeNodeBinding.call(this,_db8);
if(_db8!=null){
this._handleSystemTreeFocus();
}
};
SystemTreeBinding.prototype.getCompiledActionProfile=function(){
var temp={};
var _dba=new Map();
var _dbb=this.getFocusedTreeNodeBindings();
_dba=_dbb.getFirst().node.getActionProfile();
return _dba;
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
SystemTreePopupBinding.prototype.handleBroadcast=function(_dbc,arg){
SystemTreePopupBinding.superclass.handleBroadcast.call(this,_dbc,arg);
switch(_dbc){
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
var _dc1=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_PASTE);
cut.setDisabled(!SystemTreePopupBinding.isCutAllowed);
copy.setDisabled(!SystemTreePopupBinding.isCutAllowed);
_dc1.setDisabled(SystemTreeBinding.clipboard==null);
};
SystemTreePopupBinding.prototype._setupRefreshItem=function(){
var _dc2=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_REFRESH);
_dc2.setDisabled(!SystemTreePopupBinding.isRefreshAllowed);
};
SystemTreePopupBinding.prototype.handleAction=function(_dc3){
SystemTreePopupBinding.superclass.handleAction.call(this,_dc3);
switch(_dc3.type){
case MenuItemBinding.ACTION_COMMAND:
var _dc4=_dc3.target;
var _dc5=_dc4.associatedSystemAction;
if(_dc5){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _dc7=list.getFirst();
var _dc8=_dc7.node;
}
SystemAction.invoke(_dc5,_dc8);
}else{
var cmd=_dc4.getProperty("cmd");
if(cmd){
this._handleCommand(cmd);
}
}
break;
}
};
SystemTreePopupBinding.prototype._handleCommand=function(cmd){
var _dcb=null;
switch(cmd){
case SystemTreePopupBinding.CMD_CUT:
_dcb=BroadcastMessages.SYSTEMTREEBINDING_CUT;
break;
case SystemTreePopupBinding.CMD_COPY:
_dcb=BroadcastMessages.SYSTEMTREEBINDING_COPY;
break;
case SystemTreePopupBinding.CMD_PASTE:
_dcb=BroadcastMessages.SYSTEMTREEBINDING_PASTE;
break;
case SystemTreePopupBinding.CMD_REFRESH:
_dcb=BroadcastMessages.SYSTEMTREEBINDING_REFRESH;
break;
}
if(_dcb){
setTimeout(function(){
EventBroadcaster.broadcast(_dcb);
},0);
}
};
SystemTreePopupBinding.prototype.disposeContent=function(){
var _dcc=new List(DOMUtil.getElementsByTagName(this.bindingElement,"menugroup"));
while(_dcc.hasNext()){
var _dcd=UserInterface.getBinding(_dcc.getNext());
if(!_dcd.getProperty("rel")){
_dcd.dispose();
}
}
};
SystemTreePopupBinding.prototype.constructContent=function(){
if(this._actionProfile!=null){
var doc=this.bindingDocument;
var _dcf=new List();
var self=this;
this._actionProfile.each(function(_dd1,list){
var _dd3=MenuGroupBinding.newInstance(doc);
list.each(function(_dd4){
var _dd5=self.getMenuItemBinding(_dd4);
_dd3.add(_dd5);
});
_dcf.add(_dd3);
});
_dcf.reverse();
while(_dcf.hasNext()){
this._bodyBinding.addFirst(_dcf.getNext());
}
this._bodyBinding.attachRecursive();
}
};
SystemTreePopupBinding.prototype.getMenuItemBinding=function(_dd6){
var _dd7=MenuItemBinding.newInstance(this.bindingDocument);
var _dd8=_dd6.getLabel();
var _dd9=_dd6.getToolTip();
var _dda=_dd6.getImage();
var _ddb=_dd6.getDisabledImage();
var _ddc=_dd6.isCheckBox();
if(_dd8){
_dd7.setLabel(_dd8);
}
if(_dd9){
_dd7.setToolTip(_dd9);
}
if(_dda){
_dd7.imageProfile=new ImageProfile({image:_dda,imageDisabled:_ddb});
}
if(_ddc){
_dd7.setType(MenuItemBinding.TYPE_CHECKBOX);
if(_dd6.isChecked()){
_dd7.check(true);
}
}
if(_dd6.isDisabled()){
_dd7.disable();
}
_dd7.associatedSystemAction=_dd6;
return _dd7;
};
SystemTreePopupBinding.prototype.snapToMouse=function(e){
var node=e.target?e.target:e.srcElement;
var name=DOMUtil.getLocalName(node);
var _de0=null;
if(name!="tree"){
switch(name){
case "treenode":
break;
default:
node=DOMUtil.getAncestorByLocalName("treenode",node);
if(node!=null){
_de0=UserInterface.getBinding(node);
if(_de0.isDisabled){
_de0=null;
}
}
break;
}
if(_de0!=null&&_de0.node!=null&&_de0.node.getActionProfile()!=null){
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
var _de1=this.node.getLabel();
if(_de1){
this.setLabel(_de1);
}
var _de2=this.node.getToolTip();
if(_de2){
this.setToolTip(_de2);
}
var _de3=this.node.getHandle();
if(_de3){
this.setHandle(_de3);
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
var _de6="";
var list=this.node.getDragAccept();
while(list.hasNext()){
_de6+=list.getNext();
if(list.hasNext()){
_de6+=" ";
}
}
this.setProperty("dragaccept",_de6);
}
SystemTreeNodeBinding.superclass._initializeBindingDragAndDropFeatures.call(this);
};
SystemTreeNodeBinding.prototype.handleAction=function(_de8){
SystemTreeNodeBinding.superclass.handleAction.call(this,_de8);
switch(_de8.type){
case SystemTreeNodeBinding.ACTION_REFRESHED:
if(_de8.target==this){
if(!this.isOpen){
this.hasBeenOpened=false;
_de8.consume();
}
}
break;
}
};
SystemTreeNodeBinding.prototype.handleBroadcast=function(_de9,arg){
SystemTreeNodeBinding.superclass.handleBroadcast.call(this,_de9,arg);
switch(_de9){
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
var _dec=null;
var _ded=this.node.getImageProfile();
if(_ded){
if(this.isOpen){
_dec=_ded.getActiveImage();
}else{
_dec=_ded.getDefaultImage();
}
}
if(!_dec){
_dec=SystemTreeNodeBinding.superclass.computeImage.call(this);
}
return _dec;
};
SystemTreeNodeBinding.prototype.open=function(_dee){
var _def=this.isContainer&&!this.isOpen;
var _df0=!this.hasBeenOpened;
SystemTreeNodeBinding.superclass.open.call(this);
if(_def&&(_df0||SystemTreeBinding.HAS_NO_MEMORY)&&_dee!=true){
this.refresh();
if(this._isForcedOpen){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN,this);
this._isForcedOpen=false;
}
}
};
SystemTreeNodeBinding.prototype.refresh=function(){
var _df1=null;
if(this.isContainer){
_df1=this.getOpenSystemNodes();
}
this.isRefreshing=true;
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._performRefresh(_df1);
Application.unlock(self);
StatusBar.clear();
}
},0);
};
SystemTreeNodeBinding.prototype._performRefresh=function(_df3){
if(_df3!=null){
this._refreshBranch(_df3);
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
var _df4=new List();
var _df5=this.node.getChildren();
this.empty();
if(_df5.hasEntries()){
this._insertTreeNodesRegulated(_df5);
}
};
SystemTreeNodeBinding.prototype._insertTreeNodesRegulated=function(_df6){
var _df7=0;
while(_df6.hasEntries()&&_df7<=SystemTreeNodeBinding.MAX_CHILD_IMPORT){
var _df8=SystemTreeNodeBinding.newInstance(_df6.extractFirst(),this.bindingDocument);
this.add(_df8);
_df8.attach();
_df7++;
}
if(_df6.hasEntries()){
this._insertBufferTreeNode(_df6);
}
};
SystemTreeNodeBinding.prototype._insertBufferTreeNode=function(_df9){
alert("Max treenode count reached. This is not handled!");
alert("TODO: SystemTreeNodeBinding#._insertBufferTreeNode");
};
SystemTreeNodeBinding.prototype._refreshBranch=function(list){
var _dfb=this.node.getDescendantBranch(list);
if(_dfb.hasEntries()){
this.XXX(_dfb);
}
};
SystemTreeNodeBinding.prototype.XXX=function(_dfc){
var self=this;
var map=new Map();
this.empty();
_dfc.each(function(key,_e00){
if(_e00.hasEntries()){
_e00.each(function(node){
var _e02=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e02);
if(map.has(key)){
var _e03=map.get(key);
_e03.add(_e02);
_e03.isOpen=true;
_e03.hasBeenOpened=true;
}else{
if(key==self.node.getHandle()){
self.add(_e02);
}else{
}
}
});
}
});
this.attachRecursive();
_dfc.dispose();
map.dispose();
};
SystemTreeNodeBinding.prototype.getOpenDescendants=function(){
var _e04=new TreeCrawler();
var _e05=new List();
_e04.mode=TreeCrawler.MODE_GETOPEN;
_e04.crawl(this.bindingElement,_e05);
if(_e05.hasEntries()){
_e05.extractFirst();
}
_e04.dispose();
return _e05;
};
SystemTreeNodeBinding.prototype.getOpenSystemNodes=function(){
var _e06=null;
var list=this.getOpenDescendants();
if(list.hasEntries()){
_e06=new List([this.node]);
list.each(function(_e08){
_e06.add(_e08.node);
});
}
return _e06;
};
SystemTreeNodeBinding.prototype.updateClassNames=function(){
if(!this.isRefreshing){
SystemTreeNodeBinding.superclass.updateClassNames.call(this);
}
};
SystemTreeNodeBinding.prototype.acceptTreeNodeBinding=function(_e09,_e0a){
var _e0b=(SystemTreeBinding.clipboardOperation==SystemTreePopupBinding.CMD_COPY);
if(_e09 instanceof SystemTreeNodeBinding){
if(TreeService.ExecuteDropElementAction){
TreeService.ExecuteDropElementAction(_e09.node.getData(),this.node.getData(),_e0a?_e0a:this.containingTreeBinding.getDropIndex(),Application.CONSOLE_ID,_e0b);
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
SystemTreeNodeBinding.newInstance=function(node,_e0f){
var _e10=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_e0f);
var _e11=UserInterface.registerBinding(_e10,SystemTreeNodeBinding);
_e11.node=node;
return _e11;
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
SystemPageBinding.prototype.setPageArgument=function(_e12){
this.node=_e12;
SystemPageBinding.superclass.setPageArgument.call(this,_e12);
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
var _e13=this.node.getChildren();
if(_e13.hasEntries()){
while(_e13.hasNext()){
var node=SystemTreeNodeBinding.newInstance(_e13.getNext(),this.bindingDocument);
this._tree.add(node);
node.attach();
}
}
};
SystemPageBinding.prototype._refreshTree=function(){
var _e15=this._tree._treeBodyBinding.getChildBindingsByLocalName("treenode");
_e15.each(function(root){
if(!root.isContainer){
root.isOpen=true;
}
});
var _e17=new TreeCrawler();
var _e18=new List();
_e17.mode=TreeCrawler.MODE_GETOPEN;
_e17.crawl(this.bindingElement,_e18);
_e17.dispose();
var list=new List([this.node]);
_e18.each(function(_e1a){
list.add(_e1a.node);
});
this._tree.empty();
var _e1b=this.node.getDescendantBranch(list);
if(_e1b.hasEntries()){
var self=this;
var map=new Map();
_e1b.each(function(key,_e1f){
_e1f.each(function(node){
var _e21=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e21);
if(map.has(key)){
var _e22=map.get(key);
_e22.add(_e21);
_e22.isOpen=true;
}else{
if(key==self.node.getHandle()){
self._tree.add(_e21);
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
SystemPageBinding.prototype.handleAction=function(_e23){
SystemPageBinding.superclass.handleAction.call(this,_e23);
switch(_e23.type){
case ButtonBinding.ACTION_COMMAND:
var _e24=_e23.target;
switch(_e24.getID()){
case "locktreebutton":
this._tree.setLockToEditor(_e24.isChecked);
break;
case "collapsebutton":
this._tree.collapse();
break;
}
break;
}
};
SystemPageBinding.prototype.handleBroadcast=function(_e25,arg){
SystemPageBinding.superclass.handleBroadcast.call(this,_e25,arg);
switch(_e25){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _e27=arg;
if(this.node&&this.node.getEntityToken()==_e27){
try{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,_e27);
var self=this;
Application.lock(this);
setTimeout(function(){
self._refreshTree();
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,_e27);
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
StageContainerBinding.prototype.handleBroadcast=function(_e29,arg){
StageContainerBinding.superclass.handleBroadcast.call(this,_e29,arg);
var _e2b=this.bindingWindow.WindowManager;
switch(_e29){
case BroadcastMessages.APPLICATION_OPERATIONAL:
this.subscribe(_e2b.WINDOW_RESIZED_BROADCAST);
this._fit();
this.reflex();
break;
case _e2b.WINDOW_RESIZED_BROADCAST:
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
var _e2d=this.bindingWindow.WindowManager;
this.bindingElement.style.width=_e2d.getWindowDimensions().w+"px";
};
StageBinding.prototype=new FocusBinding;
StageBinding.prototype.constructor=StageBinding;
StageBinding.superclass=FocusBinding.prototype;
StageBinding.bindingInstance=null;
StageBinding.perspectiveNode=null;
StageBinding.entityToken=null;
StageBinding.handleViewPresentation=function(_e2e){
if(StageBinding.isViewOpen(_e2e)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_e2e);
}else{
var _e2f=ViewDefinitions[_e2e];
StageBinding.presentViewDefinition(_e2f);
}
};
StageBinding.isViewOpen=function(_e30){
return StageBinding.bindingInstance._activeViewDefinitions[_e30]!=null;
};
StageBinding.presentViewDefinition=function(_e31){
if(_e31.label!=null){
var _e32=StringBundle.getString("ui","Website.App.StatusBar.Opening");
StatusBar.busy(_e32,[_e31.label]);
}else{
StatusBar.busy();
}
StageBinding.bindingInstance._presentViewDefinition(_e31);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,{handleBroadcast:function(_e34,arg){
if(arg==root.getEntityToken()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
}
}});
var _e36=System.getPerspectiveNodes();
if(_e36.hasEntries()){
this._initializeSystemViewDefinitions(_e36);
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
var _e38=null;
if(LocalStore.isEnabled){
_e38=LocalStore.getProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE);
}
if(_e38&&ViewDefinitions[_e38]){
alert("StageBinding#_initializeWorkbenchLayout !!!!");
this._explorerBinding.setSelectionByHandle(unescape(_e38));
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
var _e3a=root.getActionProfile();
if(_e3a&&_e3a.hasEntries()){
var _e3b=top.app.bindingMap.toolsmenugroup;
if(_e3b){
_e3a.each(function(_e3c,list){
list.each(function(_e3e){
var item=MenuItemBinding.newInstance(_e3b.bindingDocument);
item.setLabel(_e3e.getLabel());
item.setToolTip(_e3e.getToolTip());
item.setImage(_e3e.getImage());
item.setDisabled(_e3e.isDisabled());
item.associatedSystemAction=_e3e;
var _e40=_e3b;
var tag=_e3e.getTag();
if(tag!=null){
switch(tag){
case SystemAction.TAG_CHANGEFROMLANGUAGE:
_e40=top.app.bindingMap.translationsmenugroup;
break;
}
}
_e40.add(item);
});
});
_e3b.attachRecursive();
}
}
};
StageBinding.prototype._initializeSystemViewDefinitions=function(_e42){
while(_e42.hasNext()){
var node=_e42.getNext();
var _e44=node.getHandle();
ViewDefinitions[_e44]=new SystemViewDefinition(node);
}
};
StageBinding.prototype.handleAction=function(_e45){
StageBinding.superclass.handleAction.call(this,_e45);
var _e46=_e45.target;
switch(_e45.type){
case StageDecksBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._decksBinding=_e46;
this._inflateBinding(_e46);
_e45.consume();
break;
case ExplorerBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._explorerBinding=_e46;
this._inflateBinding(_e46);
_e45.consume();
break;
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
if(!Application.isOperational){
ProgressBarBinding.notch(5);
}
this.handlePerspectiveChange(_e46);
_e45.consume();
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_e46 instanceof DockBinding){
switch(_e46.reference){
case DockBinding.START:
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
this._dockBindings.set(_e46.reference,_e46);
break;
}
this.handleAttachedDock(_e46);
_e45.consume();
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_e46 instanceof DockBinding){
this.handleSelectedDockTab(_e46.getSelectedTabBinding());
_e45.consume();
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
_e45.consume();
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
_e45.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_e45);
};
StageBinding.prototype.handleBroadcast=function(_e48,arg){
StageBinding.superclass.handleBroadcast.call(this,_e48,arg);
switch(_e48){
case BroadcastMessages.VIEW_OPENED:
Application.unlock(this);
break;
case BroadcastMessages.VIEW_CLOSED:
var _e4a=arg;
this._dontView(_e4a);
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
StageBinding.prototype._showStart=function(_e4c){
if(_e4c!=this._isShowingStart){
var view=ViewBinding.getInstance("Composite.Management.Start");
var dock=this._dockBindings.get(DockBinding.START);
var _e4f=this.bindingWindow.bindingMap.maindecks;
if(_e4c){
_e4f.select("startdeck");
view.show();
}else{
view.hide();
_e4f.select("stagedeck");
if(dock!=null&&dock.isActive){
dock.deActivate();
}
}
this._isShowingStart=_e4c;
}
};
StageBinding.prototype._inflateBinding=function(_e50){
for(var _e51 in ViewDefinitions){
var _e52=ViewDefinitions[_e51];
if(_e52 instanceof SystemViewDefinition){
_e50.mountDefinition(_e52);
}
}
var _e53=(this._decksBinding&&this._explorerBinding);
if(_e53){
var self=this;
setTimeout(function(){
self._renameThisMethod();
},0);
}
};
StageBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _e56=new StageCrawler();
_e56.mode=mode;
_e56.crawl(this.bindingElement);
_e56.dispose();
};
StageBinding.prototype.handlePerspectiveChange=function(_e57){
var _e58=_e57.getSelectionHandle();
this._decksBinding.setSelectionByHandle(_e58);
if(LocalStore.isEnabled){
LocalStore.setProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE,escape(_e58));
}
};
StageBinding.prototype.handleAttachedDock=function(_e59){
var _e5a=_e59.getTabBindings();
if(_e5a.hasEntries()){
while(_e5a.hasNext()){
var _e5b=_e5a.getNext();
var _e5c=_e5b.getHandle();
if(_e5c){
if(_e5c=="Composite.Management.Start"&&(!Application.hasStartPage||!Application.hasExternalConnection)){
}else{
var _e5d=ViewDefinitions[_e5c];
if(_e5d){
this._view(_e59,_e5b,_e5d,false);
}else{
alert("StageBinding: no such predefined viewdefinition ("+_e5c+")");
}
}
}
}
}
};
StageBinding.prototype._presentViewDefinition=function(_e5e){
var _e5f=null;
var _e60=false;
switch(_e5e.position){
case Dialog.MODAL:
_e5f=app.bindingMap.masterdialogset.getModalInstance();
break;
case Dialog.NON_MODAL:
_e5f=app.bindingMap.masterdialogset.getInstance();
break;
default:
if(this._dockBindings.hasEntries()){
switch(_e5e.position){
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
_e5f=this._dockBindings.get(_e5e.position);
break;
default:
var _e61=this._decksBinding.getSelectedDeckBinding();
_e5f=_e61.getDockBindingByReference(_e5e.position);
if(this._isShowingStart){
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}else{
if(this._isShowingDefaultStart){
var _e62=this.bindingWindow.bindingMap.maindecks;
_e62.select("stagedeck");
this._isShowingDefaultStart=false;
}
}
break;
}
}else{
_e60=true;
}
break;
}
if(!_e60){
if(_e5f!=null){
this._view(_e5f,null,_e5e,true);
}else{
throw "StageBinding: Could not position view: "+_e5e.handle;
}
}
};
StageBinding.prototype._view=function(_e63,_e64,_e65,_e66){
var _e67=_e65.handle;
if(_e65.isMutable){
_e67+=KeyMaster.getUniqueKey();
}
if(this._activeViewDefinitions[_e67]){
var _e68=ViewBinding.getInstance(_e67);
if(_e68!=null){
_e68.update();
}else{
this.logger.error("Could not update ViewBinding (declared open): \n"+_e67);
}
}else{
this._activeViewDefinitions[_e67]=_e65;
Application.lock(this);
switch(_e63.constructor){
case DockBinding:
if(_e66){
_e63.prepareNewView(_e65);
}else{
_e63.prepareOpenView(_e65,_e64);
}
break;
case StageDialogBinding:
if(_e66){
_e63.prepareNewView(_e65);
}
break;
}
}
};
StageBinding.prototype._dontView=function(_e69){
if(this._activeViewDefinitions[_e69]!=null){
delete this._activeViewDefinitions[_e69];
}else{
this.logger.debug("Could not unregister active view: "+_e69);
}
};
StageBinding.prototype.handleSelectedDockTab=function(_e6a){
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
this.addFilter(function(_e6c){
var _e6d=UserInterface.getBinding(_e6c);
var _e6e=null;
if(_e6d){
switch(_e6d.constructor){
case StageSplitBoxBinding:
case StageSplitPanelBinding:
case StageSplitterBinding:
switch(self.mode){
case StageCrawler.MODE_MAXIMIZE:
_e6d.handleMaximization();
break;
case StageCrawler.MODE_UNMAXIMIZE:
_e6d.handleUnMaximization();
break;
}
break;
case DockBinding:
_e6e=NodeCrawler.SKIP_NODE;
break;
}
}
return _e6e;
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
var _e6f=null;
this._dialogs.each(function(_e70){
if(!_e70.isVisible){
_e6f=_e70;
}
return _e6f!=null;
});
if(!_e6f){
this._newInstance();
_e6f=this._dialogs.getLast();
}
_e6f.setModal(false);
return _e6f;
};
StageDialogSetBinding.prototype.getModalInstance=function(){
var _e71=this.getInstance();
_e71.setModal(true);
return _e71;
};
StageDialogSetBinding.prototype._newInstance=function(){
var _e72=this.add(StageDialogBinding.newInstance(this.bindingDocument));
this._dialogs.add(_e72);
_e72.attach();
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
StageDialogBinding.prototype.prepareNewView=function(_e73){
if(_e73 instanceof DialogViewDefinition){
var _e74=ViewBinding.newInstance(this.bindingDocument);
_e74.setDefinition(_e73);
_e74.setType(ViewBinding.TYPE_DIALOGVIEW);
if(_e73.handler){
if(Interfaces.isImplemented(IDialogResponseHandler,_e73.handler)){
this._dialogResponseHandler=_e73.handler;
}else{
throw "IDialogResponseHandler not implemented";
}
}
this._viewBinding=_e74;
this._body.add(_e74);
_e74.attach();
_e74.initialize();
}
};
StageDialogBinding.prototype.handleAction=function(_e75){
StageDialogBinding.superclass.handleAction.call(this,_e75);
var _e76=_e75.target;
switch(_e75.type){
case PageBinding.ACTION_INITIALIZED:
this._handleInitializedPageBinding(_e76);
_e75.consume();
break;
case PageBinding.ACTION_DETACHED:
if(_e76.bindingDocument==this._viewBinding.getContentDocument()){
this._pageBinding=null;
}
_e75.consume();
break;
case DialogPageBinding.ACTION_RESPONSE:
if(_e76.response){
this._handleDialogPageResponse(_e76);
}
_e75.consume();
break;
case Binding.ACTION_INVALID:
this._disableDialogAcceptButton(true);
_e75.consume();
break;
case Binding.ACTION_VALID:
this._disableDialogAcceptButton(false);
_e75.consume();
break;
case ViewBinding.ACTION_ONCLOSE:
this.close();
_e76.dispose();
_e75.consume();
break;
case ViewBinding.ACTION_CLOSED:
this._isFirstPage=true;
_e75.consume();
break;
case ErrorBinding.ACTION_INITIALIZE:
_e75.consume();
break;
case PageBinding.ACTION_UPDATING:
this._isUpdating=true;
_e75.consume();
break;
case PageBinding.ACTION_UPDATED:
if(this._isUpdating){
this._isUpdating=false;
this._fit();
}
_e75.consume();
break;
case Binding.ACTION_UPDATED:
if(!this._isUpdating){
this._fit();
}
_e75.consume();
break;
case DialogBinding.ACTION_CLOSE:
if(_e76==this){
this._viewBinding.dispose();
this.defaultSetup();
}
break;
}
};
StageDialogBinding.prototype.handleBroadcast=function(_e77,arg){
StageDialogBinding.superclass.handleBroadcast.call(this,_e77,arg);
switch(_e77){
case BroadcastMessages.KEY_ESCAPE:
if(this.isVisible==true){
if(!PopupBinding.hasActiveInstances()){
this._defaultClose();
}
}
break;
}
};
StageDialogBinding.prototype._fit=function(_e79){
var _e7a=new FitnessCrawler();
var list=new List();
if(_e79){
_e7a.mode=FitnessCrawler.MODE_BRUTAL;
}
_e7a.crawl(this.bindingElement,list);
_e7a.dispose();
if(list.hasEntries()){
list.reverse();
list.each(function(_e7c){
_e7c.fit(_e79);
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
var _e7d=this.getDimension().h;
this.reflex(true);
var self=this;
if(this.getDimension().h==_e7d){
var self=this;
setTimeout(function(){
self.reflex(true);
},0);
}
}
};
StageDialogBinding.prototype._handleContextMenuItemBinding=function(_e7f){
var cmd=_e7f.getProperty("cmd");
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
StageDialogBinding.prototype._handleInitializedPageBinding=function(_e81){
if(_e81.bindingDocument==this._viewBinding.getContentDocument()){
if(_e81 instanceof DialogPageBinding){
if(this._pageBinding==null){
this._parsePageBinding(_e81);
}
this._pageBinding=_e81;
if(_e81.height=="auto"){
_e81.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_e81);
_e81.enableAutoHeightLayoutMode(false);
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
if(_e81.isDialogSubPage){
this._pageBinding.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_e81);
this._pageBinding.enableAutoHeightLayoutMode(false);
this._fit(true);
this.reflex(true);
}
}
this._isFirstPage=false;
};
StageDialogBinding.prototype._disableDialogAcceptButton=function(_e82){
var _e83=this._viewBinding.getContentDocument().getElementById("dialogacceptbutton");
if(_e83){
var _e84=UserInterface.getBinding(_e83);
_e84.setDisabled(_e82);
}
};
StageDialogBinding.prototype._handleDialogPageResponse=function(_e85){
if(this._dialogResponseHandler!=null){
this._dialogResponseHandler.handleDialogResponse(_e85.response,_e85.result!=null?_e85.result:null);
}
this.close();
};
StageDialogBinding.prototype.handleInvokedControl=function(_e86){
if(_e86.controlType==ControlBinding.TYPE_CLOSE){
this._defaultClose();
}
StageDialogBinding.superclass.handleInvokedControl.call(this,_e86);
};
StageDialogBinding.prototype.buildDescendantBindings=function(){
StageDialogBinding.superclass.buildDescendantBindings.call(this);
this._titlebar.setContextMenu(app.bindingMap.dialogtitlebarpopup);
var self=this;
this._titlebar.handleAction=function(_e88){
switch(_e88.type){
case MenuItemBinding.ACTION_COMMAND:
if(_e88.listener==this.contextMenuBinding){
self._handleContextMenuItemBinding(_e88.target);
}
break;
}
};
};
StageDialogBinding.prototype._parsePageBinding=function(_e89){
var _e8a=_e89.label;
var _e8b=_e89.image;
var _e8c=_e89.width;
var _e8d=_e89.height;
var _e8e=_e89.controls;
var _e8f=_e89.isResizable;
if(_e8a){
this.setLabel(_e8a);
}
if(_e8b){
this.setImage(_e8b);
}
if(_e8c||_e8d){
var old=this.getDimension();
var nev=new Dimension();
if(this._isFirstPage){
nev.w=_e8c?_e8c:old.w;
}else{
nev.w=old.w;
}
nev.h=(_e8d!=null&&_e8d!="auto")?_e8d:old.h;
this.setDimension(nev);
}
if(_e8e){
this.controlBindings[ControlBinding.TYPE_MAXIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_MINIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_CLOSE].hide();
var type,_e93=new List(_e8e.split(" "));
while((type=_e93.getNext())!=null){
this.controlBindings[type].show();
}
}
if(_e8f!=this._isResizable){
this.setResizable(_e8f);
}
if(_e8d=="auto"){
this._fixAutoHeight(_e89);
}
if(_e89==this._pageBinding){
this.centerOnScreen();
}
if(!this.isOpen){
this.reflex(true);
this.open(true);
}
};
StageDialogBinding.prototype._fixAutoHeight=function(_e94){
var dim=this.getDimension();
var _e96=0;
var _e97=0;
if(_e94.isDialogSubPage){
_e94=this._pageBinding;
}
if(this._isFirstPage){
_e96=_e94.width!=null?_e94.width:dim.w;
}else{
_e96=dim.w;
}
_e97=_e94.bindingElement.offsetHeight;
_e97+=this._titlebar.bindingElement.offsetHeight;
_e97+=4;
if(_e97<dim.h){
_e97=dim.h;
}
if(_e94.minheight!=null){
if(_e97<_e94.minheight){
_e97=_e94.minheight;
}
}
this.setDimension(new Dimension(_e96,_e97));
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
StageDialogBinding.newInstance=function(_e9a){
var _e9b=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_e9a);
var _e9c=UserInterface.registerBinding(_e9b,StageDialogBinding);
_e9c.setProperty("controls","minimize maximize close");
return _e9c;
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
this.addFilter(function(_e9d,list){
var _e9f=null;
var _ea0=UserInterface.getBinding(_e9d);
if(!_ea0.isVisible){
_e9f=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _e9f;
});
this.addFilter(function(_ea1,list){
var _ea3=null;
var _ea4=UserInterface.getBinding(_ea1);
if(_ea4.isAttached){
if(Interfaces.isImplemented(IFit,_ea4)){
if(!_ea4.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_ea4);
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
StageDecksBinding.prototype.mountDefinition=function(_ea5){
var _ea6=StageDeckBinding.newInstance(this.bindingDocument);
_ea6.handle=_ea5.handle;
_ea6.perspectiveNode=_ea5.node;
this._decks[_ea6.handle]=_ea6;
this.add(_ea6);
_ea6.attach();
};
StageDecksBinding.prototype.setSelectionByHandle=function(_ea7){
var _ea8=this._decks[_ea7];
StageBinding.perspectiveNode=_ea8.perspectiveNode;
this.select(_ea8);
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
StageDeckBinding.prototype.handleAction=function(_ea9){
StageDeckBinding.superclass.handleAction.call(this,_ea9);
var _eaa=_ea9.target;
switch(_ea9.type){
case WindowBinding.ACTION_LOADED:
if(_eaa==this.windowBinding){
top.app.bindingMap.stagedeckscover.hide();
this.removeActionListener(WindowBinding.ACTION_LOADED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_OPENED);
this.dispatchAction(StageDeckBinding.ACTION_LOADED);
_ea9.consume();
}
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_eaa instanceof DockBinding){
this._dockBindings.set(_eaa.reference,_eaa);
_eaa.perspectiveNode=this.perspectiveNode;
}
break;
case StageSplitBoxBinding.ACTION_DOCK_OPENED:
this._dockBindingCount++;
if(this._dockBindingCount==2){
this._dockBindings.get("main").showControls(true);
}
_ea9.consume();
break;
case StageSplitBoxBinding.ACTION_DOCK_EMPTIED:
this._dockBindingCount--;
if(this._dockBindingCount==1){
this._dockBindings.get("main").showControls(false);
}
_ea9.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_ea9);
StageDeckBinding.superclass.handleAction.call(this,_ea9);
};
StageDeckBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _eac=new StageCrawler();
_eac.mode=mode;
_eac.crawl(this.windowBinding.getContentDocument().body);
_eac.dispose();
};
StageDeckBinding.prototype.select=function(){
if(!this._isStageDeckBindingInitialized){
this.initialize();
}
StageDeckBinding.superclass.select.call(this);
};
StageDeckBinding.prototype.getDockBindingByReference=function(_ead){
return this._dockBindings.get(_ead);
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
StageDeckBinding.newInstance=function(_eae){
var _eaf=DOMUtil.createElementNS(Constants.NS_UI,"ui:stagedeck",_eae);
var _eb0=UserInterface.registerBinding(_eaf,StageDeckBinding);
return _eb0;
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
StageSplitBoxBinding.prototype.handleAction=function(_eb1){
StageSplitBoxBinding.superclass.handleAction.call(this,_eb1);
StageBoxAbstraction.handleAction.call(this,_eb1);
var _eb2=_eb1.target;
var _eb3=null;
var _eb4=null;
switch(_eb1.type){
case DockBinding.ACTION_EMPTIED:
_eb4=this.getChildBindingByLocalName("splitter");
if(_eb4.isVisible){
_eb4.hide();
}
_eb3=this.getDescendantBindingsByLocalName("dock");
if(_eb3.getFirst().isEmpty&&_eb3.getLast().isEmpty){
if(_eb3.getFirst().type!=DockBinding.TYPE_EDITORS){
this.dispatchAction(StageSplitBoxBinding.ACTION_HIDE);
this.hide();
}
}else{
this.flex();
this.invokeLayout();
}
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
_eb1.consume();
break;
case DockBinding.ACTION_OPENED:
_eb3=this.getDescendantBindingsByLocalName("dock");
if(!_eb3.getFirst().isEmpty&&!_eb3.getLast().isEmpty){
_eb4=this.getChildBindingByLocalName("splitter");
if(!_eb4.isVisible){
_eb4.show();
}
}
if(!this.isVisible){
this.show();
this.dispatchAction(StageSplitBoxBinding.ACTION_SHOW);
}
this.flex();
this.invokeLayout();
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_OPENED);
_eb1.consume();
break;
case StageSplitBoxBinding.ACTION_HIDE:
if(_eb2!=this){
_eb4=this.getChildBindingByLocalName("splitter");
if(_eb4.isVisible){
_eb4.hide();
}
this.invokeLayout();
_eb1.consume();
}
break;
case StageSplitBoxBinding.ACTION_SHOW:
if(_eb2!=this){
var _eb5=this.getChildBindingsByLocalName("splitpanel");
if(_eb5.getFirst().isVisible&&_eb5.getLast().isVisible){
_eb4=this.getChildBindingByLocalName("splitter");
if(!_eb4.isVisible){
_eb4.show();
}
}
this.invokeLayout();
_eb1.consume();
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
StageSplitBoxBinding.prototype.handleCrawler=function(_eb6){
StageSplitBoxBinding.superclass.handleCrawler.call(this,_eb6);
switch(_eb6.id){
case FlexBoxCrawler.ID:
if(this.isMaximizedForReal==false){
_eb6.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
};
StageSplitBoxBinding.prototype.hasBothPanelsVisible=function(){
var _eb7=this.getChildBindingsByLocalName("splitpanel");
return _eb7.getFirst().isVisible&&_eb7.getLast().isVisible;
};
StageSplitBoxBinding.prototype.hasBothPanelsFixed=function(){
var _eb8=this.getChildBindingsByLocalName("splitpanel");
return _eb8.getFirst().isFixed&&_eb8.getLast().isFixed;
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
StageSplitPanelBinding.prototype.handleAction=function(_eb9){
StageSplitPanelBinding.superclass.handleAction.call(this,_eb9);
StageBoxAbstraction.handleAction.call(this,_eb9);
switch(_eb9.type){
case DockBinding.ACTION_EMPTIED:
case StageSplitBoxBinding.ACTION_HIDE:
if(this.isMaximized==true){
this.normalize();
}
var dock=this.getContainedDock();
if(dock&&dock.type==DockBinding.TYPE_EDITORS){
this._invisibilize(true);
if(_eb9.type==StageSplitBoxBinding.ACTION_HIDE){
_eb9.consume();
}
}else{
this.hide();
if(this.isFixed==true){
this.setFix(false);
}
}
if(_eb9.type==DockBinding.ACTION_EMPTIED){
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
if(_eb9.type==StageSplitBoxBinding.ACTION_SHOW){
_eb9.consume();
}
}else{
this.show();
if(this.isFixed==true){
this.setFix(false);
}
}
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
var _ebc=_eb9.target;
if(_ebc!=this&&_ebc.getContainedDock()){
if(this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_VERTICAL){
var _ebd=_ebc._containingSplitBoxBinding;
if(_ebd.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL){
var _ebe=_ebd.getChildBindingsByLocalName("splitpanel");
var _ebf=_ebe.getFirst();
var _ec0=_ebe.getLast();
if(this.isFixed==true){
if(!_ebf.isFixed||!_ec0.isFixed||(!_ebd.hasBothPanelsVisible()&&_ebc.isMinimizedForReal)){
this.setFix(false);
_eb9.consume();
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
}
}else{
if(_ebd.hasBothPanelsFixed()||(!_ebd.hasBothPanelsVisible()&&_ebc.isMinimizedForReal)){
this.setFix(_ebc.getContainedDock().getHeight());
_eb9.consume();
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
var _ec1=this.getContainedDock();
if(_ec1){
if(this.isMaximizePrepared==true){
}else{
_ec1.interceptDisplayChange(false);
}
}
};
StageSplitPanelBinding.prototype.handleUnMaximization=function(){
StageBoxAbstraction.handleUnMaximization.call(this);
var _ec2=this.getContainedDock();
if(_ec2){
if(_ec2.type==DockBinding.TYPE_EDITORS){
if(_ec2.isEmpty){
this._invisibilize(true);
}
}
if(this.isMaximized==true){
this.normalize();
}else{
_ec2.interceptDisplayChange(true);
}
}
};
StageSplitPanelBinding.prototype.maximize=function(){
if(this.isMinimized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.maximize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
var _ec3=this.getContainedDock();
if(_ec3){
_ec3.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MAXIMIZED,_ec3);
}
};
StageSplitPanelBinding.prototype.minimize=function(){
var _ec4=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _ec5=this.getContainedDock();
if(_ec5){
_ec5.collapse(_ec4);
if(!_ec4){
this.setFix(_ec5.getHeight());
}else{
this.setFix(_ec5.getWidth());
}
}
if(this.isMaximized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.minimize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_ec5&&_ec5.isActive){
_ec5.deActivate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MINIMIZED,_ec5);
}
};
StageSplitPanelBinding.prototype.normalize=function(_ec6){
var _ec7=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _ec8=this.getContainedDock();
if(_ec8){
if(this.isMinimized==true){
_ec8.unCollapse(_ec7);
this.setFix(false);
}
}
StageSplitPanelBinding.superclass.normalize.call(this);
if(!_ec6){
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_ec8){
_ec8.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_NORMALIZED,_ec8);
}
}
};
StageSplitPanelBinding.prototype.getContainedDock=function(){
return this.getChildBindingByLocalName("dock");
};
StageSplitPanelBinding.prototype.invisibilize=function(_ec9){
var _eca=true;
var dock=this.getContainedDock();
if(dock!=null&&dock.type==DockBinding.TYPE_EDITORS){
if(dock.isEmpty==true){
_eca=false;
}
}
if(_eca==true){
this._invisibilize(_ec9);
}
};
StageSplitPanelBinding.prototype._invisibilize=function(_ecc){
if(_ecc!=this._isInvisibilized){
if(_ecc){
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
StageSplitterBinding.prototype.onDragStart=function(_ecd){
var _ece=top.app.bindingMap.stagesplittercover;
var _ecf=this._containingSplitBoxBinding.getOrient();
switch(_ecf){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_ece.bindingElement.style.cursor="e-resize";
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_ece.bindingElement.style.cursor="n-resize";
break;
}
_ece.show();
var body=top.app.bindingMap.stagesplitterbody;
body.setPosition(this.getPosition());
body.setDimension(this.getDimension());
body.setOrient(_ecf);
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
StageSplitterBodyBinding.prototype.setOrient=function(_ed5){
this._orient=_ed5;
this.attachClassName(_ed5);
};
StageSplitterBodyBinding.prototype.setPosition=function(pos){
var _ed7=true;
var _ed8=true;
switch(this._orient){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_ed8=false;
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_ed7=false;
break;
}
if(_ed7){
this.bindingElement.style.left=pos.x+"px";
}
if(_ed8){
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
StageBoxAbstraction.handleAction=function(_eda){
switch(_eda.type){
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
if(_eda.target instanceof DockBinding){
if(this.isHiddenForReal){
this.dispatchAction(StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED);
}else{
if(this.isMinimizedForReal){
this.normalize();
}
}
}
_eda.consume();
break;
}
};
StageBoxAbstraction.handleMaximization=function(){
if(this.isMaximizePrepared==true){
this.isMaximizedForReal=true;
this.isHiddenForReal=false;
this.isFlexible=false;
if(Client.isMozilla==true){
var _edb=this.bindingElement.style;
_edb.position="absolute";
_edb.width="100%";
_edb.height="100%";
_edb.top="0";
_edb.left="0";
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
var _edc=this.bindingElement.style;
_edc.position="relative";
_edc.width="auto";
_edc.height="auto";
_edc.top="auto";
_edc.left="auto";
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
StageBoxAbstraction._emulateBasicCSS=function(_edd,_ede){
var _edf=_edd.bindingElement.style;
var _ee0=_edd.bindingElement.parentNode;
var box=_edd._containingSplitBoxBinding;
if(Client.isExplorer==true){
if(_ede){
_edd._unmodifiedFlexMethod=_edd.flex;
_edd.flex=function(){
_edf.width=_ee0.offsetWidth+"px";
_edf.height=_ee0.offsetHeight+"px";
};
}else{
_edf.width="100%";
_edf.height="100%";
if(!box.isHorizontalOrient()){
setTimeout(function(){
_edf.width="auto";
_edf.height="auto";
box.reflex(true);
},0);
}
_edd.flex=_edd._unmodifiedFlexMethod;
_edd._unmodifiedFlexMethod=null;
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
StageBoxHandlerAbstraction.handleAction=function(_ee2){
var _ee3=_ee2.target;
switch(_ee2.type){
case ControlBoxBinding.ACTION_MAXIMIZE:
case ControlBoxBinding.ACTION_NORMALIZE:
if(_ee3 instanceof StageSplitPanelBinding){
StageBoxHandlerAbstraction.handleControlBoxAction.call(this,_ee2);
_ee2.consume();
}
break;
case StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED:
if(this.isSubPanelMaximized){
this.iterateContainedStageBoxBindings(StageCrawler.MODE_UNMAXIMIZE);
this.isSubPanelMaximized=false;
}
_ee2.consume();
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
break;
}
};
StageBoxHandlerAbstraction.handleControlBoxAction=function(_ee4){
var mode=null;
switch(_ee4.type){
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
StageMenuBarBinding.prototype.handleAction=function(_ee6){
StageMenuBarBinding.superclass.handleAction.call(this,_ee6);
switch(_ee6.type){
case MenuItemBinding.ACTION_COMMAND:
var _ee7=_ee6.target.associatedSystemAction;
if(Application.isLoggedIn){
if(!this._rootNode){
this._rootNode=System.getRootNode();
}
if(_ee7){
SystemAction.invoke(_ee7,this._rootNode);
}
}
_ee6.consume();
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
var _ee8=this.getProperty("handle");
if(_ee8){
this._handle=_ee8;
if(StageBinding.isViewOpen(_ee8)){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
this.check(true);
}
}
this.oncommand=function(){
var self=this;
Application.lock(self);
setTimeout(function(){
StageBinding.handleViewPresentation(_ee8);
Application.unlock(self);
},Client.hasTransitions?Animation.DEFAULT_TIME:0);
};
}else{
throw new Error("StageViewMenuItemBinding: missing handle");
}
};
StageViewMenuItemBinding.prototype.setHandle=function(_eea){
this.setProperty("handle",_eea);
};
StageViewMenuItemBinding.prototype.handleBroadcast=function(_eeb,arg){
StageViewMenuItemBinding.superclass.handleBroadcast.call(this,_eeb,arg);
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
switch(_eeb){
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
StageViewMenuItemBinding.newInstance=function(_eed){
var _eee=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_eed);
UserInterface.registerBinding(_eee,StageViewMenuItemBinding);
return UserInterface.getBinding(_eee);
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
StageStatusBarBinding.prototype.setLabel=function(_eef){
this._label.setLabel(_eef);
};
StageStatusBarBinding.prototype.setImage=function(_ef0){
this._label.setImage(_ef0);
};
StageStatusBarBinding.prototype.clear=function(){
this._label.setLabel(null);
this._label.setImage(false);
};
StageStatusBarBinding.prototype.startFadeOut=function(_ef1){
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
var _ef2=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _ef3=_ef2.getAssociatedView();
var _ef4=_ef3.getContentWindow().bindingMap.tree;
return _ef4.getFocusedTreeNodeBindings();
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
ExplorerBinding.prototype.handleAction=function(_ef5){
ExplorerBinding.superclass.handleAction.call(this,_ef5);
var _ef6=_ef5.target;
switch(_ef5.type){
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
this._decksBinding.setSelectionByHandle(this._menuBinding.getSelectionHandle());
var tag=this._menuBinding.getSelectionTag();
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVE_CHANGED,tag);
break;
case ViewBinding.ACTION_LOADED:
this.dispatchAction(ExplorerBinding.ACTION_DECK_LOADED);
_ef5.consume();
break;
case Binding.ACTION_DRAG:
if(_ef6 instanceof ExplorerSplitterBinding){
_ef6.dragger.registerHandler(this);
}
_ef5.consume();
}
};
ExplorerBinding.prototype.setSelectionByHandle=function(_ef8){
this._menuBinding.setSelectionByHandle(_ef8);
};
ExplorerBinding.prototype.setSelectionDefault=function(){
this._menuBinding.setSelectionDefault();
};
ExplorerBinding.prototype.getSelectedDeckBinding=function(){
return this._decksBinding.getSelectedDeckBinding();
};
ExplorerBinding.prototype.mountDefinition=function(_ef9){
if(_ef9 instanceof SystemViewDefinition){
this._decksBinding.mountDefinition(_ef9);
this._menuBinding.mountDefinition(_ef9);
}else{
throw new Error("ExplorerBinding: No such ViewDefinition supported");
}
};
ExplorerBinding.prototype.onDragStart=function(_efa){
var _efb=this._menuBinding.getDescendantBindingsByLocalName("explorertoolbarbutton");
if(_efb.hasEntries()){
var _efc=_efb.getFirst();
this._dragStart=_efc.boxObject.getLocalPosition().y;
this._dragSlot=0;
if(this._dragHeight==0){
this._dragHeight=_efc.boxObject.getDimension().h;
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
ExplorerDecksBinding.prototype.mountDefinition=function(_f00){
if(_f00 instanceof SystemViewDefinition){
var _f01=ViewBinding.newInstance(this.bindingDocument);
_f01.setType(ViewBinding.TYPE_EXPLORERVIEW);
_f01.setDefinition(_f00);
var _f02=ExplorerDeckBinding.newInstance(this.bindingDocument);
_f02.setAssociatedView(_f01);
this._decks[_f00.handle]=_f02;
_f02.add(_f01);
this.add(_f02);
_f02.attach();
_f01.attach();
}
};
ExplorerDecksBinding.prototype.setSelectionByHandle=function(_f03){
var _f04=this._decks[_f03];
this.select(_f04);
};
DecksBinding.prototype.expandBy=function(_f05){
var deck=this.getSelectedDeckBinding();
if(deck){
var _f07=this.bindingElement.offsetHeight+_f05;
var view=deck.getAssociatedView();
this.bindingElement.style.height=_f07+"px";
this.reflex(true);
}
};
ExplorerDecksBinding.newInstance=function(_f09){
var _f0a=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdecks",_f09);
return UserInterface.registerBinding(_f0a,ExplorerDecksBinding);
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
ExplorerDeckBinding.prototype.setAssociatedView=function(_f0b){
this._viewBinding=_f0b;
};
ExplorerDeckBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
ExplorerDeckBinding.prototype.select=function(){
if(!this._isExplorerDeckBindingInitialized){
Application.lock(this);
var _f0c=StringBundle.getString("ui","Website.App.StatusBar.Loading");
var _f0d=this._viewBinding.getDefinition().label;
StatusBar.busy(_f0c,[_f0d]);
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
ExplorerDeckBinding.prototype.handleAction=function(_f0e){
ExplorerDeckBinding.superclass.handleAction.call(this,_f0e);
var _f0f=_f0e.target;
switch(_f0e.type){
case PageBinding.ACTION_INITIALIZED:
if(_f0f instanceof SystemPageBinding){
this._isExplorerDeckBindingInitialized=true;
this._entityToken=_f0f.node.getEntityToken();
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
ExplorerDeckBinding.prototype.handleBroadcast=function(_f10,arg){
ExplorerDeckBinding.superclass.handleBroadcast.call(this,_f10,arg);
switch(_f10){
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
var _f12=null;
if(this._isExplorerDeckBindingInitialized){
_f12=this._viewBinding.getDefinition().label;
}else{
_f12=DockTabBinding.LABEL_TABLOADING;
}
return _f12;
};
ExplorerDeckBinding.prototype.getImage=function(){
var _f13=null;
if(this._isExplorerDeckBindingInitialized){
_f13=this._viewBinding.getDefinition().image;
}else{
_f13=DockTabBinding.IMG_TABLOADING;
}
return _f13;
};
ExplorerDeckBinding.prototype.getToolTip=function(){
var _f14=null;
if(this._isExplorerDeckBindingInitialized){
_f14=this._viewBinding.getDefinition().toolTip;
}
return _f14;
};
ExplorerDeckBinding.newInstance=function(_f15){
var _f16=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdeck",_f15);
return UserInterface.registerBinding(_f16,ExplorerDeckBinding);
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
ExplorerMenuBinding.prototype.onMemberInitialize=function(_f17){
switch(_f17.constructor){
case ExplorerToolBarBinding:
this._maxGroup=_f17.getToolBarGroupByIndex(0);
break;
case ToolBarBinding:
this._minGroup=_f17.getToolBarGroupByIndex(0);
break;
}
ExplorerMenuBinding.superclass.onMemberInitialize.call(this,_f17);
};
ExplorerMenuBinding.prototype.mountDefinition=function(_f18){
this._maxButtons.set(_f18.handle,this._mountMaxButton(_f18));
this._minButtons.set(_f18.handle,this._mountMinButton(_f18));
this._index++;
};
ExplorerMenuBinding.prototype._mountMaxButton=function(_f19){
var _f1a=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_LARGE);
_f1a.setLabel(_f19.label);
_f1a.setToolTip(_f19.toolTip);
_f1a.handle=_f19.handle;
_f1a.node=_f19.node;
this._maxGroup.add(_f1a);
this._maxList.add(_f1a);
_f1a.attach();
return _f1a;
};
ExplorerMenuBinding.prototype._mountMinButton=function(_f1b){
var _f1c=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_NORMAL);
_f1c.setLabel(_f1b.label);
_f1c.setToolTip(_f1b.label);
_f1c.handle=_f1b.handle;
_f1c.node=_f1b.node;
this._minGroup.addFirst(_f1c);
this._minList.add(_f1c);
_f1c.attach();
_f1c.hide();
return _f1c;
};
ExplorerMenuBinding.prototype.handleAction=function(_f1d){
ExplorerMenuBinding.superclass.handleAction.call(this,_f1d);
switch(_f1d.type){
case RadioGroupBinding.ACTION_SELECTIONCHANGED:
var _f1e=_f1d.target;
var _f1f=_f1e.getCheckedButtonBinding();
var _f20=_f1f.handle;
switch(_f1e){
case this._maxGroup:
this._minGroup.setCheckedButtonBinding(this._minButtons.get(_f20),true);
break;
case this._minGroup:
this._maxGroup.setCheckedButtonBinding(this._maxButtons.get(_f20),true);
break;
}
this._selectedHandle=_f20;
this._selectedTag=_f1f.node.getTag();
this.dispatchAction(ExplorerMenuBinding.ACTION_SELECTIONCHANGED);
_f1d.consume();
break;
}
};
ExplorerMenuBinding.prototype.setSelectionByHandle=function(_f21){
var _f22=this._maxButtons.get(_f21);
if(_f22){
_f22.check();
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
var _f23=false;
var max=this._maxList.getLength()-1;
if(!this._maxList.get(max).isVisible){
this._index++;
this._maxList.get(this._index).show();
this._minList.get(this._index).hide();
_f23=true;
}
return _f23;
};
ExplorerMenuBinding.prototype.showLess=function(){
var _f25=false;
if(this._maxList.get(0).isVisible){
this._maxList.get(this._index).hide();
this._minList.get(this._index).show();
this._index--;
_f25=true;
}
return _f25;
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
ExplorerToolBarBinding.newInstance=function(_f26){
var _f27=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorertoolbar",_f26);
return UserInterface.registerBinding(_f27,ExplorerToolBarBinding);
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
var _f28=this.explorerToolBarButtonType==ExplorerToolBarButtonBinding.TYPE_LARGE;
var _f29=_f28?ToolBarBinding.IMAGESIZE_LARGE:ToolBarBinding.IMAGESIZE_NORMAL;
this.imageProfile=this.node.getImageProfile(_f29);
ExplorerToolBarButtonBinding.superclass.onBindingAttach.call(this);
};
ExplorerToolBarButtonBinding.newInstance=function(_f2a,_f2b){
var _f2c=(_f2b==ExplorerToolBarButtonBinding.TYPE_LARGE?"ui:explorertoolbarbutton":"ui:toolbarbutton");
var _f2d=DOMUtil.createElementNS(Constants.NS_UI,_f2c,_f2a);
var _f2e=UserInterface.registerBinding(_f2d,ExplorerToolBarButtonBinding);
_f2e.explorerToolBarButtonType=_f2b;
return _f2e;
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
EditorBinding.registerComponent=function(_f2f,_f30){
var _f31=EditorBinding._components;
var _f32=EditorBinding._editors;
var key=_f30.key;
var _f34=Interfaces.isImplemented(IWysiwygEditorComponent,_f2f);
if(!_f34){
_f34=Interfaces.isImplemented(ISourceEditorComponent,_f2f);
}
if(_f34){
if(_f32.has(key)){
_f32.get(key).initializeEditorComponent(_f2f);
}else{
if(!_f31.has(key)){
_f31.set(key,new List());
}
_f31.get(key).add(_f2f);
}
}else{
throw "Editor component interface not implemented: "+_f2f;
}
};
EditorBinding.claimComponents=function(_f35,_f36){
var _f37=EditorBinding._components;
var _f38=EditorBinding._editors;
var key=_f36.key;
_f38.set(key,_f35);
var list=null;
if(_f37.has(key)){
list=_f37.get(key).copy();
_f37.del(key);
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
var _f3c=this.getProperty("value");
if(_f3c!=null){
_f3c=decodeURIComponent(_f3c);
this._startContent=_f3c;
}
};
EditorBinding.prototype.onBindingDispose=function(){
EditorBinding.superclass.onBindingDispose.call(this);
var name=this.getProperty("name");
if(name!=null){
var _f3e=this.bindingWindow.DataManager;
_f3e.unRegisterDataBinding(name);
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
EditorBinding.prototype.initializeEditorComponents=function(_f40){
var _f41=EditorBinding.claimComponents(this,_f40);
if(_f41!=null){
while(_f41.hasNext()){
this.initializeEditorComponent(_f41.getNext());
}
}
};
EditorBinding.prototype._registerWithDataManager=function(name){
if(name&&name!=""){
var _f43=this.bindingWindow.DataManager;
if(_f43.getDataBinding(name)){
_f43.unRegisterDataBinding(name);
}
_f43.registerDataBinding(name,this);
}
};
EditorBinding.prototype.addEditorEvents=function(){
var _f44=this.getEditorDocument();
if(_f44!=null){
Application.framework(_f44);
DOMEvents.addEventListener(_f44,DOMEvents.CONTEXTMENU,this);
DOMEvents.addEventListener(_f44,DOMEvents.KEYPRESS,this);
DOMEvents.addEventListener(_f44,DOMEvents.MOUSEDOWN,this);
DOMEvents.addEventListener(_f44,DOMEvents.MOUSEMOVE,this);
}
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,{handleEvent:function(e){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}});
};
EditorBinding.prototype.checkForDirty=function(_f46){
if(!this.isDirty){
if(_f46==true){
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
var _f48=this.getCheckSum();
if(_f48!=this._checksum){
this.dispatchAction(Binding.ACTION_DIRTY);
this.isDirty=true;
this._checksum=_f48;
}
};
EditorBinding.prototype.getCheckSum=function(){
var _f49=null;
if(Binding.exists(this._pageBinding)){
_f49=this._pageBinding.getCheckSum(this._checksum);
}
return _f49;
};
EditorBinding.prototype.handleEvent=function(e){
EditorBinding.superclass.handleEvent.call(this,e);
var _f4b=DOMEvents.getTarget(e);
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
if(_f4b==this._bespinElement){
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
if(_f4b.ownerDocument==this.getEditorDocument()){
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
EditorBinding.prototype.handleBroadcast=function(_f4d,arg){
EditorBinding.superclass.handleBroadcast.call(this,_f4d,arg);
var _f4f=null;
switch(_f4d){
case BroadcastMessages.APPLICATION_BLURRED:
if(this._isActivated){
this._activateEditor(false);
}
break;
case BroadcastMessages.MOUSEEVENT_MOUSEUP:
if(!this.isDialogMode){
try{
var _f50=true;
if(arg instanceof Binding){
if(Interfaces.isImplemented(IEditorControlBinding,arg)==true){
if(arg.isEditorControlBinding){
_f50=false;
}
}
}else{
_f4f=DOMEvents.getTarget(arg);
if(this instanceof BespinEditorBinding){
if(_f4f==this._bespinElement){
_f50=false;
}
}else{
if(_f4f&&_f4f.ownerDocument==this.getEditorDocument()){
_f50=false;
}
}
}
if(_f50){
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
EditorBinding.prototype._activateEditor=function(_f51){
if(_f51!=this._isActivated){
this._isActivated=_f51;
EditorBinding.isActive=_f51;
var _f52=this.getEditorWindow().standardEventHandler;
var _f53=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_f53!=null){
if(_f51){
if(this.hasBookmark()){
this.deleteBookmark();
}
_f53.enable();
if(Client.isExplorer){
this._sanitizeExplorer();
}
this.focus();
_f52.enableNativeKeys(true);
}else{
_f53.disable();
_f52.disableNativeKeys();
this.blur();
}
}else{
throw "Required broadcaster not found";
}
}
};
EditorBinding.prototype._sanitizeExplorer=function(){
if(Client.isExplorer){
var _f54=this.getEditorDocument().selection.createRange();
_f54.select();
}
};
EditorBinding.prototype._sanitizeMozilla=function(){
};
EditorBinding.prototype.hasSelection=function(){
var _f55=false;
if(Client.isMozilla){
var _f56=this.getEditorWindow().getSelection();
if(_f56!=null){
_f55=_f56.toString().length>0;
if(!_f55){
var _f57=_f56.getRangeAt(0);
var frag=_f57.cloneContents();
var _f59=this.getEditorDocument().createElement("element");
while(frag.hasChildNodes()){
_f59.appendChild(frag.firstChild);
}
var img=_f59.getElementsByTagName("img").item(0);
if(img!=null){
if(!CSSUtil.hasClassName(img,VisualEditorBinding.FUNCTION_CLASSNAME)){
_f55=true;
}
}
}
}
}else{
var _f57=this.getEditorDocument().selection.createRange();
_f55=(_f57&&_f57.text)&&_f57.text.length>0;
}
return _f55;
};
EditorBinding.prototype.isCommandEnabled=function(_f5b){
var _f5c=true;
switch(_f5b){
case "Cut":
case "Copy":
case "Paste":
_f5c=this.getEditorDocument().queryCommandEnabled(_f5b);
break;
}
return _f5c;
};
EditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _f60=false;
this.restoreBookmark();
switch(cmd){
case "Cut":
case "Copy":
case "Paste":
var _f61=null;
if(cmd=="Paste"){
_f61=null;
}else{
_f61=this.hasSelection();
}
try{
this.getEditorDocument().execCommand(cmd,gui,_f61);
}
catch(mozillaSecurityException){
if(Client.isMozilla==true){
Dialog.invokeModal(EditorBinding.URL_DIALOG_MOZ_CONFIGURE);
}else{
throw "Clipboard operation malfunction. Contact your developer.";
}
}
finally{
_f60=true;
}
break;
}
return _f60;
};
EditorBinding.prototype.getButtonForCommand=function(cmd){
var _f63=this.getContentWindow().bindingMap.toolbar;
var _f64=_f63.getButtonForCommand(cmd);
if(!_f64){
throw "No button for command "+cmd;
}
return _f64;
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
var _f67=this.getContentDocument().getElementById("focusableinput");
if(_f67!=null){
_f67.style.display="block";
FocusBinding.focusElement(_f67);
_f67.style.display="none";
}else{
throw "Required element not found: focusableinput";
}
};
EditorBinding.prototype.handleAction=function(_f68){
EditorBinding.superclass.handleAction.call(this,_f68);
var _f69=_f68.target;
var self=this;
var _f6b=this.shadowTree.iframe;
switch(_f68.type){
case Binding.ACTION_DIRTY:
if(_f68.target!=this){
this.checkForDirty();
}
break;
}
};
EditorBinding.prototype._onPageInitialize=function(_f6c){
if(this._pageBinding==null){
this.reflex();
if(this._coverBinding!=null&&this._coverBinding.isVisible){
this._coverBinding.hide();
}
}
EditorBinding.superclass._onPageInitialize.call(this,_f6c);
};
EditorBinding.prototype.handleElement=function(_f6d){
return true;
};
EditorBinding.prototype.updateElement=function(_f6e){
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
this._menuGroups[rel].each(function(_f71){
_f71.show();
});
};
EditorPopupBinding.prototype._hideMenuGroups=function(rel){
this._menuGroups[rel].each(function(_f73){
_f73.hide();
});
};
EditorPopupBinding.prototype.handleAction=function(_f74){
EditorPopupBinding.superclass.handleAction.call(this,_f74);
var _f75=_f74.target;
if(_f74.type==MenuItemBinding.ACTION_COMMAND){
this.hide();
var cmd=_f75.getProperty("cmd");
var gui=_f75.getProperty("gui");
var val=_f75.getProperty("val");
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
var _f79=this.bindingWindow.bindingMap.tinywindow;
var _f7a=this.bindingWindow.bindingMap.codepresswindow;
if(_f79){
EditorBinding.registerComponent(this,_f79);
}else{
if(_f7a){
EditorBinding.registerComponent(this,_f7a);
}
}
};
EditorClickButtonBinding.prototype.buildDOMContent=function(){
EditorClickButtonBinding.superclass.buildDOMContent.call(this);
this._buildDesignModeSanitizer();
};
EditorClickButtonBinding.prototype.initializeComponent=function(_f7b,_f7c,_f7d,_f7e){
this._editorBinding=_f7b;
this._tinyEngine=_f7c;
this._tinyInstance=_f7d;
this._tinyTheme=_f7e;
this._setupEditorBookmarking();
};
EditorClickButtonBinding.prototype.initializeSourceEditorComponent=function(_f7f,_f80,_f81){
this._editorBinding=_f7f;
this._codePressFrame=_f80;
this._codePressEngine=_f81;
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
var _f83=this._editorBinding;
if(_f83!=null){
var self=this;
var _f85={handleEvent:function(e){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(!_f83.hasBookmark()){
_f83.createBookmark();
}
break;
case DOMEvents.MOUSEUP:
if(self.isEditorSimpleControl){
if(self.popupBinding==null){
if(_f83.hasBookmark()){
_f83.restoreBookmark();
}
}
}
break;
}
}};
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,_f85);
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEUP,_f85);
}
};
EditorClickButtonBinding.newInstance=function(_f87){
var _f88=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_f87);
return UserInterface.registerBinding(_f88,EditorClickButtonBinding);
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
EditorToolBarButtonBinding.newInstance=function(_f89){
var _f8a=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_f89);
return UserInterface.registerBinding(_f8a,EditorToolBarButtonBinding);
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
var _f8b=this.bindingWindow.bindingMap.tinywindow;
EditorBinding.registerComponent(this,_f8b);
EditorSelectorBinding.superclass.onBindingAttach.call(this);
};
EditorSelectorBinding.prototype.buildButton=function(){
EditorSelectorBinding.superclass.buildButton.call(this);
this._buttonBinding.isEditorSimpleControl=false;
if(this.isEditorControlBinding==false){
this._buttonBinding.isEditorControlBinding=false;
}
};
EditorSelectorBinding.prototype.initializeComponent=function(_f8c,_f8d,_f8e,_f8f){
this._editorBinding=_f8c;
this._tinyEngine=_f8d;
this._tinyInstance=_f8e;
this._tinyTheme=_f8f;
};
EditorSelectorBinding.prototype.handleAction=function(_f90){
EditorSelectorBinding.superclass.handleAction.call(this,_f90);
switch(_f90.type){
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
EditorSelectorBinding.superclass.handleAction.call(this,_f90);
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
EditorMenuItemBinding.newInstance=function(_f93){
var _f94=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_f93);
return UserInterface.registerBinding(_f94,EditorMenuItemBinding);
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
VisualEditorBinding.getTinyLessClassName=function(_f95){
var i=0,_f97,_f98="",_f99=_f95.split(" ");
while((_f97=_f99[i])!=null){
if(_f97.length>=3&&_f97.substring(0,3)=="mce"){
_f97="";
}else{
if(_f97.length>=14&&_f97.substring(0,14)=="compositemedia"){
_f97="";
}
}
_f98+=_f97;
if(_f99[i+1]){
_f98+=" ";
}
i++;
}
return _f98;
};
VisualEditorBinding.getStructuredContent=function(_f9a){
var _f9b=null;
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.TinyContentToStructuredContent(_f9a);
if(soap instanceof SOAPFault){
}else{
_f9b=soap.XhtmlFragment;
if(!_f9b){
_f9b="";
}
}
WebServiceProxy.isFaultHandler=true;
return _f9b;
};
VisualEditorBinding.getTinyContent=function(_f9d,_f9e){
var _f9f=null;
if(_f9d==null||_f9d==""){
_f9d=VisualEditorBinding.DEFAULT_CONTENT;
}
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.StructuredContentToTinyContent(_f9d);
if(soap instanceof SOAPFault){
var _fa1=soap;
var _fa2={handleDialogResponse:function(){
_f9e.dispatchAction(Binding.ACTION_VALID);
}};
Dialog.invokeModal(VisualEditorBinding.URL_DIALOG_CONTENTERROR,_fa2,_fa1);
}else{
_f9f=soap.XhtmlFragment;
if(_f9f==null){
_f9f=new String("");
}
}
WebServiceProxy.isFaultHandler=true;
return _f9f;
};
VisualEditorBinding.extractByIndex=function(html,_fa4){
var _fa5=null;
var doc=XMLParser.parse(html);
if(doc!=null){
var _fa7=new List(doc.documentElement.childNodes);
var _fa8=new List();
_fa7.each(function(_fa9){
if(_fa9.nodeType==Node.ELEMENT_NODE){
_fa8.add(_fa9);
}
});
var _faa=_fa8.get(_fa4);
if(_faa==null){
if(Application.isDeveloperMode){
alert("VisualEditorBinding: Bad HTML!"+"\n\n"+html);
}
}else{
if(_faa.hasChildNodes()){
var frag=doc.createDocumentFragment();
while(_faa.hasChildNodes()){
frag.appendChild(_faa.firstChild);
}
doc.removeChild(doc.documentElement);
doc.appendChild(DOMUtil.createElementNS(Constants.NS_XHTML,"ROOT",doc));
doc.documentElement.appendChild(frag);
_fa5=DOMSerializer.serialize(doc.documentElement);
_fa5=_fa5.substring(_fa5.indexOf(">")+1,_fa5.length);
_fa5=_fa5.substring(0,_fa5.lastIndexOf("<"));
}
}
}
if(_fa5==null){
_fa5=new String("");
}
return _fa5;
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
var _fac=this.getProperty("presentationstylesheet");
if(_fac!=null){
this.presentationStylesheet=_fac;
}
var _fad=this.getProperty("configurationstylesheet");
if(_fad!=null){
this.configurationStylesheet=_fad;
}
var _fae=this.getProperty("formattingconfiguration");
if(_fae!=null){
this.formattingConfiguration=VisualEditorFormattingConfiguration.getConfiguration(_fae);
}
var _faf=this.getProperty("elementclassconfiguration");
if(_faf!=null){
this.elementClassConfiguration=VisualEditorElementClassConfiguration.getConfiguration(_faf);
}
var _fb0=this.getProperty("embedablefieldstypenames");
if(_fb0!=null){
this.embedableFieldConfiguration=VisualEditorFieldGroupConfiguration.getConfiguration(_fb0);
}
};
VisualEditorBinding.prototype.handleBroadcast=function(_fb1,arg){
VisualEditorBinding.superclass.handleBroadcast.call(this,_fb1,arg);
var _fb3=this.getContentWindow().bindingMap.tinywindow;
var _fb4=_fb3.getContentWindow();
switch(_fb1){
case BroadcastMessages.VISUALEDITOR_HACKED:
if(arg.broadcastWindow==_fb4){
this._startContent=this.normalizeToDocument(this._startContent);
this.extractHead(this._startContent);
this._startContent=this.extractBody(this._startContent);
arg.textareaElement.value=VisualEditorBinding.getTinyContent(this._startContent);
this.unsubscribe(BroadcastMessages.VISUALEDITOR_HACKED);
}
break;
case BroadcastMessages.TINYMCE_INITIALIZED:
if(arg.broadcastWindow==_fb4){
this._tinyEngine=arg.tinyEngine;
this._tinyInstance=arg.tinyInstance;
this._tinyTheme=arg.tinyTheme;
this._tinyTheme.initC1(this,this._tinyEngine,this._tinyInstance);
this.initializeEditorComponents(_fb3);
this._initialize();
this.unsubscribe(BroadcastMessages.TINYMCE_INITIALIZED);
}
break;
}
};
VisualEditorBinding.prototype.initializeEditorComponent=function(_fb5){
_fb5.initializeComponent(this,this._tinyEngine,this._tinyInstance,this._tinyTheme);
};
VisualEditorBinding.prototype._finalize=function(){
VisualEditorBinding.superclass._finalize.call(this);
this._maybeShowEditor();
};
VisualEditorBinding.prototype._onPageInitialize=function(_fb6){
VisualEditorBinding.superclass._onPageInitialize.call(this,_fb6);
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
VisualEditorBinding.prototype.normalizeToDocument=function(_fb9){
var _fba=_fb9;
if(!this._isNormalizedDocument(_fb9)){
_fb9="\t\t"+_fb9.replace(/\n/g,"\n\t\t");
_fba=VisualEditorBinding.XHTML.replace("${head}",this._getHeadSection()).replace("${body}",_fb9);
}
return _fba;
};
VisualEditorBinding.prototype._isNormalizedDocument=function(_fbb){
var _fbc=false;
var doc=XMLParser.parse(_fbb,true);
if(doc!=null){
if(doc.documentElement.nodeName=="html"){
_fbc=true;
}
}
return _fbc;
};
VisualEditorBinding.prototype._getHeadSection=function(){
return this._head!=null?this._head:new String("");
};
VisualEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _fc1=VisualEditorBinding.superclass.handleCommand.call(this,cmd,gui,val);
if(!_fc1){
try{
this._tinyInstance.execCommand(cmd,gui,val);
this.checkForDirty();
}
catch(e){
SystemDebug.stack(arguments);
}
_fc1=true;
}
return _fc1;
};
VisualEditorBinding.prototype.handleContextMenu=function(e){
var _fc3=DOMEvents.getTarget(e);
this._popupBinding.configure(this._tinyInstance,this._tinyEngine,_fc3);
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
VisualEditorBinding.prototype.setValue=function(_fc4){
if(this._isFinalized){
if(Binding.exists(this._pageBinding)){
this._pageBinding.setContent(_fc4);
}
}else{
if(this._startContent==null){
this._startContent=_fc4;
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
VisualEditorBinding.prototype.setResult=function(_fc5){
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
VisualEditorPopupBinding.prototype.configure=function(_fc6,_fc7,_fc8){
var _fc9=this.editorBinding.hasSelection();
this.tinyInstance=_fc6;
this.tinyEngine=_fc7;
this.tinyElement=_fc8;
this.hasSelection=_fc9;
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
var _fcd=false;
if(this.hasSelection){
_fcd=true;
}else{
if(this.tinyElement){
if(this.tinyElement.nodeName=="A"&&!this.tinyElement.getAttribute("name")){
_fcd=true;
}else{
if(this.tinyElement.nodeName=="IMG"){
_fcd=true;
}
}
}
}
if(_fcd){
this._showMenuGroups("link");
this._configureLinkGroupDetails();
}else{
this._hideMenuGroups("link");
}
};
VisualEditorPopupBinding.prototype._configureLinkGroupDetails=function(){
var _fce=this.getMenuItemForCommand("compositeInsertLink");
var _fcf=this.getMenuItemForCommand("unlink");
var _fd0=this.editorBinding.getButtonForCommand("compositeInsertLink");
var _fd1=this.editorBinding.getButtonForCommand("unlink");
_fcf.setDisabled(_fd1.isDisabled);
if(_fcf.isDisabled){
_fce.setLabel("Link");
}else{
_fce.setLabel("Link properties");
}
};
VisualEditorPopupBinding.prototype._configureInsertGroup=function(){
var _fd2=this.editorBinding.embedableFieldConfiguration;
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
if(_fd2){
var _fd5=_fd2.getGroupNames();
if(_fd5.hasEntries()){
var _fd6=MenuPopupBinding.newInstance(doc);
var body=_fd6.add(MenuBodyBinding.newInstance(doc));
var _fd8=body.add(MenuGroupBinding.newInstance(doc));
_fd5.each(function(_fd9){
var _fda=_fd2.getFieldNames(_fd9);
_fda.each(function(_fdb){
var i=_fd8.add(MenuItemBinding.newInstance(doc));
i.setLabel(_fdb);
i.setImage("${icon:field}");
i.setProperty("cmd","compositeInsertField");
i.setProperty("val",_fd9+":"+_fdb);
_fd8.add(i);
});
});
item.add(_fd6);
}
}else{
item.disable();
}
this._menuGroups["insertions"].getFirst().add(item);
item.attachRecursive();
this._menuItems["compositeInsertFieldParent"]=item;
};
VisualEditorPopupBinding.prototype._configureTableGroup=function(){
var _fdd=this.tinyInstance.dom.getParent(this.tinyElement,"table,td");
var _fde=null;
var _fdf=null;
if(_fdd){
if(_fdd.nodeName=="TD"){
_fde=_fdd.getAttribute("colspan");
_fdf=_fdd.getAttribute("rowspan");
}
this._menuItems["mceTableSplitCells"].setDisabled(_fde=="1"&&_fdf=="1");
this._menuItems["mceTablePasteRowBefore"].setDisabled(this.tinyInstance.tableRowClipboard==null);
this._menuItems["mceTablePasteRowAfter"].setDisabled(this.tinyInstance.tableRowClipboard==null);
}
if(_fdd){
this._showMenuGroups("table");
}else{
this._hideMenuGroups("table");
}
};
VisualEditorPopupBinding.prototype._configureRenderingGroup=function(){
var _fe0=this._isRendering();
if(_fe0){
this._showMenuGroups("rendering");
}else{
this._hideMenuGroups("rendering");
}
this._isRenderingSelected=_fe0;
};
VisualEditorPopupBinding.prototype._configureFieldGroup=function(){
var _fe1=this._isField();
if(_fe1){
this._showMenuGroups("field");
}else{
this._hideMenuGroups("field");
}
this._isFieldSelected=_fe1;
};
VisualEditorPopupBinding.prototype._configureImageGroup=function(){
if(this._isImage()&&!this._isRenderingSelected&&!this._isFieldSelected){
this._showMenuGroups("image");
}else{
this._hideMenuGroups("image");
}
};
VisualEditorPopupBinding.prototype._isImage=function(){
var _fe2=false;
if(!this.hasSelection){
_fe2=this.tinyElement&&this.tinyElement.nodeName=="IMG";
}
return _fe2;
};
VisualEditorPopupBinding.prototype._isRendering=function(){
return this._isImage()&&CSSUtil.hasClassName(this.tinyElement,VisualEditorBinding.FUNCTION_CLASSNAME);
};
VisualEditorPopupBinding.prototype._isField=function(){
return this._isImage()&&CSSUtil.hasClassName(this.tinyElement,VisualEditorBinding.FIELD_CLASSNAME);
};
VisualEditorElementClassConfiguration._configurations=new Map();
VisualEditorElementClassConfiguration.getConfiguration=function(_fe3){
var _fe4=VisualEditorElementClassConfiguration._configurations;
if(!_fe4.has(_fe3)){
_fe4.set(_fe3,new VisualEditorElementClassConfiguration(EditorConfigurationService.GetElementClassConfiguration(_fe3)));
}
return _fe4.get(_fe3);
};
function VisualEditorElementClassConfiguration(doc){
this.logger=SystemLogger.getLogger("VisualEditorElementClassConfiguration");
this._elements={};
var _fe6=new XPathResolver();
var _fe7=_fe6.resolveAll("elements/element",doc);
while(_fe7.hasNext()){
var _fe8=_fe7.getNext();
var _fe9=_fe8.getAttribute("name");
this._elements[_fe9]=new List();
var _fea=_fe6.resolveAll("class",_fe8);
while(_fea.hasNext()){
var _feb=_fea.getNext().getAttribute("name");
this._elements[_fe9].add(_feb);
}
}
}
VisualEditorElementClassConfiguration.prototype.getClassNamesForElement=function(name){
var _fed=null;
if(this._elements[name]){
_fed=this._elements[name].copy();
}else{
_fed=new List();
}
return _fed;
};
VisualEditorFormattingConfiguration._configurations=new Map();
VisualEditorFormattingConfiguration._options=null;
VisualEditorFormattingConfiguration.getConfiguration=function(_fee){
var _fef=VisualEditorFormattingConfiguration._configurations;
if(!_fef.has(_fee)){
_fef.set(_fee,new VisualEditorFormattingConfiguration());
}
return _fef.get(_fee);
};
VisualEditorFormattingConfiguration._getOptions=function(){
if(VisualEditorFormattingConfiguration._options==null){
var p="Composite.Web.VisualEditor";
VisualEditorFormattingConfiguration._options={"p":StringBundle.getString(p,"FormatSelector.LabelParagraph"),"address":StringBundle.getString(p,"FormatSelector.LabelAddress"),"blockquote":StringBundle.getString(p,"FormatSelector.LabelBlockQuote"),"div":StringBundle.getString(p,"FormatSelector.LabelDivision"),"h1":StringBundle.getString(p,"FormatSelector.LabelHeading1"),"h2":StringBundle.getString(p,"FormatSelector.LabelHeading2"),"h3":StringBundle.getString(p,"FormatSelector.LabelHeading3"),"h4":StringBundle.getString(p,"FormatSelector.LabelHeading4"),"h5":StringBundle.getString(p,"FormatSelector.LabelHeading5"),"h6":StringBundle.getString(p,"FormatSelector.LabelHeading6")};
}
return VisualEditorFormattingConfiguration._options;
};
function VisualEditorFormattingConfiguration(_ff1){
this._options=VisualEditorFormattingConfiguration._getOptions();
}
VisualEditorFormattingConfiguration.prototype.getFormattingOptions=function(){
return this._options;
};
VisualEditorFieldGroupConfiguration._configurations=new Map();
VisualEditorFieldGroupConfiguration.getConfiguration=function(_ff2){
var _ff3=null;
var _ff4=VisualEditorFieldGroupConfiguration._configurations;
if(!_ff4.has(_ff2)){
_ff4.set(_ff2,new VisualEditorFieldGroupConfiguration(EditorConfigurationService.GetEmbedableFieldGroupConfigurations(_ff2)));
}
return _ff4.get(_ff2);
};
function VisualEditorFieldGroupConfiguration(_ff5){
var _ff6=new Map();
new List(_ff5).each(function(_ff7){
var map=new Map();
new List(_ff7.Fields).each(function(_ff9){
map.set(_ff9.Name,{xhtml:_ff9.XhtmlRepresentation,xml:_ff9.XhtmlRepresentation});
});
_ff6.set(_ff7.GroupName,map);
});
this._groups=_ff6;
}
VisualEditorFieldGroupConfiguration.prototype.getGroupNames=function(){
return this._groups.toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getFieldNames=function(_ffa){
return this._groups.get(_ffa).toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getTinyMarkup=function(_ffb,_ffc){
return this._groups.get(_ffb).get(_ffc).xhtml;
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
var _ffe=this.getDescendantElementsByLocalName("textarea");
while(_ffe.hasNext()){
var _fff=_ffe.getNext();
if(_fff.getAttribute("selected")=="true"){
this._startContent=_fff.value;
this._textareaname=_fff.getAttribute("placeholderid");
}
}
if(this._startContent==null){
this._startContent=VisualEditorBinding.DEFAULT_CONTENT;
}
};
VisualMultiEditorBinding.prototype._initialize=function(){
var self=this;
this._registerWithDataManager("generated"+KeyMaster.getUniqueKey());
var _1001=this.getContentWindow().bindingMap.templatetree;
_1001.addActionListener(TreeBinding.ACTION_SELECTIONCHANGED,{handleAction:function(_1002){
var _1003=_1001.getSelectedTreeNodeBindings().getFirst();
self._placeHolderSelected(_1003.textareaname);
_1002.consume();
}});
_1001.addActionListener(Binding.ACTION_FOCUSED,{handleAction:function(_1004){
self._activateEditor(false);
}});
this._updatePlaceHolders();
var _1005=this.getContentWindow().bindingMap.toolsplitter;
_1005.unCollapse();
VisualMultiEditorBinding.superclass._initialize.call(this);
};
VisualMultiEditorBinding.prototype._updatePlaceHolders=function(){
templatetree=this.getContentWindow().bindingMap.templatetree;
var _1006=this.getDescendantElementsByLocalName("textarea");
templatetree.empty();
if(_1006.hasEntries()){
this._hasPlaceHolders=true;
this._parsePlaceHolders(_1006);
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
VisualMultiEditorBinding.prototype._parsePlaceHolders=function(_1007){
this._textareas=new Map();
while(_1007.hasNext()){
var _1008=_1007.getNext();
var _1009=_1008.getAttribute("placeholderid");
this._textareas.set(_1009,{placeholderid:_1009,placeholdername:_1008.getAttribute("placeholdername"),placeholdermarkup:_1008.value,textareaelement:_1008,isSelected:_1008.getAttribute("selected")=="true"});
}
var _100a=new Map();
this._textareas.each(function(name,_100c){
var _100d=templatetree.add(TreeNodeBinding.newInstance(templatetree.bindingDocument));
_100d.setLabel(_100c.placeholdername);
_100d.setImage("${icon:placeholder}");
_100d.setProperty("placeholder",true);
_100d.textareaname=name;
_100a.set(_100c.placeholdername,_100d);
if(_100c.isSelected){
selected=_100d;
}
});
templatetree.attachRecursive();
if(selected!=null){
var _100e=this._textareas.get(selected.textareaname);
this._textareaname=selected.textareaname;
this._placeholdername=_100e.placeholdername;
this._setContentFromPlaceHolder(selected.textareaname);
selected.focus();
}
};
VisualMultiEditorBinding.prototype._noPlaceHolders=function(){
var _100f=this.getContentWindow().bindingMap.templatetree;
var _1010=_100f.add(TreeNodeBinding.newInstance(_100f.bindingDocument));
_1010.setLabel(StringBundle.getString("Composite.Web.VisualEditor","TemplateTree.NoTemplateWarning"));
_1010.setImage("${icon:warning}");
_1010.attach();
var _1011=this.getContentWindow().bindingMap.statusbar;
_1011.setPlaceHolderName(null);
};
VisualMultiEditorBinding.prototype._setContentFromPlaceHolder=function(name){
if(this._isFinalized==true){
var _1013=this._textareas.get(name);
var _1014=_1013.placeholdermarkup;
this.setValue(this.normalizeToDocument(_1014));
this.resetUndoRedo();
}
};
VisualMultiEditorBinding.prototype._placeHolderSelected=function(_1015){
if(this._isFinalized==true){
if(this._textareaname&&this._textareas.has(this._textareaname)){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
}
}
this._textareaname=_1015;
this._placeholdername=this._textareas.get(this._textareaname).placeholdername;
var _1016=this.getContentWindow().bindingMap.statusbar;
_1016.setPlaceHolderName(this._placeholdername);
if(this._isFinalized==true){
var self=this;
Application.lock(self);
setTimeout(function(){
self._setContentFromPlaceHolder(_1015);
Application.unlock(self);
},0);
}
};
VisualMultiEditorBinding.prototype.extractHead=function(html){
VisualMultiEditorBinding.superclass.extractHead.call(this,html);
this._heads.set(this._textareaname,this._head);
};
VisualMultiEditorBinding.prototype._getHeadSection=function(){
var _1019="";
if(this._heads.has(this._textareaname)){
_1019=this._heads.get(this._textareaname);
if(_1019==null){
_1019=new String("");
}
}
return _1019;
};
VisualMultiEditorBinding.prototype.manifest=function(){
if(this._textareas!=null&&this._textareas.hasEntries()){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
this._textareas.each(function(name,_101b){
_101b.textareaelement.value=_101b.placeholdermarkup;
});
}
};
VisualMultiEditorBinding.prototype.updateElement=function(_101c,_101d){
var _101e=_101c.getElementsByTagName("div").item(0);
var _101f=_101d.getElementsByTagName("div").item(0);
var _1020=new List(_101e.getElementsByTagName("textarea"));
var _1021=new List(_101f.getElementsByTagName("textarea"));
var _1022=false;
if(_1020.getLength()!=_1021.getLength()){
_1022=true;
}else{
var index=0;
_1020.each(function(_1024,index){
var _1026=_1021.get(index);
var newid=_1024.getAttribute("placeholderid");
var oldid=_1026.getAttribute("placeholderid");
var _1029=_1024.getAttribute("placeholdername");
var _102a=_1026.getAttribute("placeholdername");
if(newid!=oldid||_1029!=_102a){
_1022=true;
}
return !_1022;
});
}
if(_1022){
var html=null;
if(_101e.innerHTML!=null){
html=_101e.innerHTML;
}else{
html=DOMSerializer.serialize(_101e);
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
var _102e=this.getDescendantBindingByLocalName("selector");
_102e.attach();
this._populateTemplateSelector();
var _102f=this.getContentWindow().bindingMap.templateselector;
_102f.addActionListener(SelectorBinding.ACTION_SELECTIONCHANGED,{handleAction:function(){
setTimeout(function(){
self._onTemplateSelectionChanged();
},0);
}});
this.getContentWindow().bindingMap.templatetoolbar.show();
VisualMultiTemplateEditorBinding.superclass._initialize.call(this);
};
VisualMultiTemplateEditorBinding.prototype._populateTemplateSelector=function(){
var _1030=this.getDescendantBindingByLocalName("selector");
var _1031=this.getContentWindow().bindingMap.templateselector;
_1030.selections.each(function(_1032){
_1032.imageProfile=new ImageProfile({image:"${icon:page-template-template}"});
});
_1031.populateFromList(_1030.selections);
};
VisualMultiTemplateEditorBinding.prototype._onTemplateSelectionChanged=function(){
var _1033=this.getDescendantBindingByLocalName("selector");
var _1034=this.getContentWindow().bindingMap.templateselector;
_1033.selectByValue(_1034.getValue());
_1033.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
this.checkForDirty(true);
};
VisualMultiTemplateEditorBinding.prototype._parsePlaceHolders=function(_1035){
var nev=this._textareas;
var old=this._oldtextareas;
if(nev!=null){
nev.each(function(key,value){
old.set(key,value);
});
}
this._textareas=new Map();
function compute(_103a,_103b){
var _103c=_103b;
if(old.has(_103a)){
_103c=old.get(_103a).placeholdermarkup;
}
return _103c;
}
while(_1035.hasNext()){
var _103d=_1035.getNext();
var _103e=_103d.getAttribute("placeholderid");
this._textareas.set(_103e,{placeholderid:_103e,placeholdername:_103d.getAttribute("placeholdername"),placeholdermarkup:compute(_103e,_103d.value),textareaelement:_103d,isSelected:_103d.getAttribute("selected")=="true"});
}
var _103f=null;
var _1040=this.getContentWindow().bindingMap.templatetree;
var _1041=new Map();
this._textareas.each(function(name,_1043){
var _1044=_1040.add(TreeNodeBinding.newInstance(_1040.bindingDocument));
_1044.setLabel(_1043.placeholdername);
_1044.setImage("${icon:placeholder}");
_1044.setProperty("placeholder",true);
_1044.textareaname=name;
_1041.set(_1043.placeholdername,_1044);
if(_1043.isSelected){
_103f=_1044;
}
});
_1040.attachRecursive();
if(_103f!=null){
var _1045=true;
if(this._oldtextareas.hasEntries()){
_1045=false;
var map=new Map();
this._textareas.each(function(id,_1048){
map.set(_1048.placeholdername,true);
});
if(!map.has(this._placeholdername)){
_1045=true;
}
}
if(_1045){
var _1049=this._textareas.get(_103f.textareaname);
this._textareaname=_103f.textareaname;
this._placeholdername=_1049.placeholdername;
this._setContentFromPlaceHolder(_103f.textareaname);
_103f.focus();
}else{
var _104a=_1041.get(this._placeholdername);
this._textareaname=_104a.textareaname;
_104a.focus();
}
}
};
VisualMultiTemplateEditorBinding.prototype.updateElement=function(_104b,_104c){
var _104d=_104b.getElementsByTagName("ui:selector").item(0);
var _104e=_104c.getElementsByTagName("ui:selector").item(0);
var _104f=false;
if(_104d!=null&&_104e!=null){
var _1050=new List(_104d.getElementsByTagName("ui:selection"));
var _1051=new List(_104e.getElementsByTagName("ui:selection"));
if(_1050.getLength()!=_1051.getLength()){
_104f=true;
}else{
_1050.each(function(_1052,index){
var _1054=_1052.getAttribute("value");
var _1055=_1051.get(index).getAttribute("value");
if(_1054!=_1055){
_104f=true;
}
return !_104f;
});
}
}
if(_104f){
var div=this.bindingElement.getElementsByTagName("div").item(1);
this.bindingWindow.DocumentManager.detachBindings(div,true);
div.innerHTML=DOMSerializer.serialize(_104d);
this.bindingWindow.DocumentManager.attachBindings(div);
this._populateTemplateSelector();
}
return VisualMultiTemplateEditorBinding.superclass.updateElement.call(this,_104b,_104c);
};
SourceEditorPopupBinding.prototype=new EditorPopupBinding;
SourceEditorPopupBinding.prototype.constructor=SourceEditorPopupBinding;
SourceEditorPopupBinding.superclass=EditorPopupBinding.prototype;
SourceEditorPopupBinding.CONTENT_TEMPLATE="sourceeditor/popup.xml";
function SourceEditorPopupBinding(){
this.logger=SystemLogger.getLogger("SourceEditorPopupBinding");
this._editorBinding=null;
this._codePressFrame=null;
this._codePressEngine=null;
}
SourceEditorPopupBinding.prototype.toString=function(){
return "[SourceEditorPopupBinding]";
};
SourceEditorPopupBinding.prototype.configure=function(_1057,frame,_1059){
this._editorBinding=_1057;
this._codePressFrame=frame;
this._codePressEngine=_1059;
WysiwygEditorPopupBinding.superclass.configure.call(this);
};
SourceEditorPopupBinding.prototype._configure=function(){
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
SourceEditorPopupBinding.prototype.handleCommand=function(cmd,gui,val){
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
var _105f=this.getProperty("validate");
if(_105f==true){
this._hasStrictValidation=true;
}
var _1060=this.getProperty("validator");
if(_1060!=null){
this._validator=_1060;
}
this.syntax=this.getProperty("syntax");
switch(this.syntax){
case BespinEditorBinding.syntax.XML:
case BespinEditorBinding.syntax.XSL:
this.syntax=BespinEditorBinding.syntax.HTML;
break;
}
BespinEditorBinding.superclass.onBindingAttach.call(this);
};
BespinEditorBinding.prototype.handleBroadcast=function(_1061,arg){
BespinEditorBinding.superclass.handleBroadcast.call(this,_1061,arg);
switch(_1061){
case BroadcastMessages.BESPIN_LOADED:
var _1063=this.getContentWindow().bindingMap.bespinwindow;
if(_1063!=null){
var _1064=_1063.getContentWindow();
if(arg.broadcastWindow==_1064){
this._bespinEnvelope=arg.bespinEnvelope;
this._bespinEditor=arg.bespinEditor;
this._bespinElement=this._bespinEditor.textView.domNode;
this._bespinEditor.syntax=this.syntax;
this._bespinEnvelope.settings.set("theme","white");
this._bespinEnvelope.settings.set("fontsize",13);
this._bespinEnvelope.settings.set("tabstop",4);
this._bespinEnvelope.settings.set("fontface","monospace");
this.initializeEditorComponents(_1063);
this._bespinElement.addEventListener(DOMEvents.MOUSEDOWN,this,false);
var self=this;
this._bespinEditor.textChanged.add(function(_1066,_1067,_1068){
self.checkForDirty();
});
if(this._pageBinding!=null){
this._initialize();
}
this.unsubscribe(_1061);
}
}
break;
}
};
BespinEditorBinding.prototype._onPageInitialize=function(_1069){
BespinEditorBinding.superclass._onPageInitialize.call(this,_1069);
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
BespinEditorBinding.prototype._activateEditor=function(_106c){
if(_106c!=this._isActivated){
this._isActivated=_106c;
EditorBinding.isActive=_106c;
var _106d=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_106d!=null){
if(_106c){
_106d.enable();
}else{
_106d.disable();
}
}else{
throw "Required broadcaster not found";
}
}
};
BespinEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1071=BespinEditorBinding.superclass.handleCommand.call(this,cmd,val);
switch(cmd){
case "Paste":
this._codePressFrame.syntaxHighlight("generic");
break;
}
return _1071;
};
BespinEditorBinding.prototype._finalize=function(){
this.setContent(this._startContent);
BespinEditorBinding.superclass._finalize.call(this);
};
BespinEditorBinding.prototype.initializeEditorComponent=function(_1072){
_1072.initializeSourceEditorComponent(this,this._bespinEditor);
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
var _1074=null;
if(this._codePressFrame!=null){
_1074=this._codePressFrame.contentWindow.document;
}
return _1074;
};
BespinEditorBinding.prototype.setContent=function(_1075){
if(!this._isFinalized){
if(_1075!=this._startContent){
this._startContent=_1075;
}
}
if(this.isInitialized&&this.getContentWindow().bindingMap!=null){
this.getContentWindow().bindingMap.editorpage.setContent(_1075);
this.resetUndoRedo();
this._checksum=this.getCheckSum();
}
return true;
};
BespinEditorBinding.prototype.getContent=function(){
var _1076=this.getContentWindow().bindingMap.editorpage.getContent();
return _1076?_1076:"";
};
BespinEditorBinding.prototype.resetUndoRedo=function(){
};
BespinEditorBinding.prototype.cover=function(_1077){
if(this._pageBinding!=null){
this._pageBinding.cover(_1077);
}
};
BespinEditorBinding.prototype.updateElement=function(_1078){
if(_1078!=null&&this.shadowTree.dotnetinput!=null){
var value=_1078.getAttribute("value");
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
var _107a=true;
var _107b=this.getContent();
if(this._validator!=null){
_107a=Validator.validateInformed(_107b,this._validator);
}else{
switch(this.syntax){
case BespinEditorBinding.syntax.XML:
case BespinEditorBinding.syntax.XSL:
case BespinEditorBinding.syntax.HTML:
_107a=XMLParser.isWellFormedDocument(_107b,true);
if(_107a==true&&this._hasStrictValidation){
switch(this.syntax){
case BespinEditorBinding.syntax.HTML:
_107a=this._isValidHTML(_107b);
break;
}
}
break;
}
}
return _107a;
};
BespinEditorBinding.prototype._isValidHTML=function(xml){
var _107d=true;
var doc=XMLParser.parse(xml);
var _107f=new List();
if(doc!=null){
var root=doc.documentElement;
if(root.nodeName!="html"){
_107f.add("MissingHtml");
}
if(root.namespaceURI!=Constants.NS_XHTML){
_107f.add("NamespaceURI");
}
var head=null,body=null;
var _1083=new List(root.childNodes);
while(_1083.hasNext()){
var child=_1083.getNext();
if(child.nodeType==Node.ELEMENT_NODE){
switch(child.nodeName){
case "head":
if(head!=null){
_107f.add("MultipleHead");
}
if(body!=null){
_107f.add("HeadBodyIndex");
}
head=child;
break;
case "body":
if(body!=null){
_107f.add("MultipleBody");
}
body=child;
break;
}
}
}
if(head==null){
_107f.add("MissingHead");
}
if(body==null){
_107f.add("MissingBody");
}
}
if(_107f.hasEntries()){
_107d=false;
Dialog.error(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML.DialogTitle"),StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_107f.getFirst()));
}
return _107d;
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
var _1085=null;
var page=this._pageBinding;
if(page!=null){
_1085=page.getCheckSum();
}
return _1085;
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
ThrobberBinding.prototype.handleBroadcast=function(_1087,arg){
ThrobberBinding.superclass.handleBroadcast.call(this,_1087,arg);
switch(_1087){
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
ProgressBarBinding.notch=function(_108a){
var bar=ProgressBarBinding._bindingInstance;
if(bar!=null){
bar.notch(_108a);
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
ProgressBarBinding.prototype.notch=function(_108c){
_108c=_108c?_108c:1;
var width=this._cover.getWidth()-(ProgressBarBinding.NOTCH*_108c);
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
StartMenuItemBinding.prototype.handleBroadcast=function(_108e,arg){
StartMenuItemBinding.superclass.handleBroadcast.call(this,_108e,arg);
switch(_108e){
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
StartMenuItemBinding.prototype.setChecked=function(_1090,_1091){
StartMenuItemBinding.superclass.setChecked.call(this,_1090,_1091);
if(!_1091){
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
KeySetBinding.registerKeyEventHandler=function(doc,key,_1094,_1095){
var _1096=KeySetBinding.keyEventHandlers;
if(Interfaces.isImplemented(IKeyEventHandler,_1095,true)==true){
if(_1094!="*"){
_1094=KeySetBinding._sanitizeKeyModifiers(_1094);
}
var code=window.KeyEventCodes[key];
if(!code){
code=key.charCodeAt(0);
}
if(!_1096[doc]){
_1096[doc]={};
}
if(!_1096[doc][code]){
_1096[doc][code]={};
}
_1096[doc][code][_1094]=_1095;
}
};
KeySetBinding.handleKey=function(doc,e){
var _109a=false;
var code=e.keyCode;
var _109c=KeySetBinding.keyEventHandlers;
if(_109c[doc]&&_109c[doc][code]){
var _109d="[default]";
_109d+=code!=KeyEventCodes.VK_SHIFT?e.shiftKey?" shift":"":"";
_109d+=code!=KeyEventCodes.VK_CONTROL?e.ctrlKey?" control":"":"";
var _109e=_109c[doc][code][_109d];
if(_109e==null){
_109e=_109c[doc][code]["*"];
}
if(_109e!=null){
_109e.handleKeyEvent(e);
_109a=true;
}
}
return _109a;
};
KeySetBinding._sanitizeKeyModifiers=function(_109f){
var _10a0="[default]";
var mods={};
if(_109f){
new List(_109f.split(" ")).each(function(_10a2){
mods[_10a2]=true;
});
function check(_10a3){
if(mods[_10a3]){
_10a0+=" "+_10a3;
}
}
check("shift");
check("control");
}
return _10a0;
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
var _10a7=key.getAttribute("oncommand");
var _10a8=key.getAttribute("preventdefault")=="true";
KeySetBinding.registerKeyEventHandler(self.bindingDocument,key.getAttribute("key"),key.getAttribute("modifiers"),{handleKeyEvent:function(e){
DOMEvents.stopPropagation(e);
if(_10a8){
DOMEvents.preventDefault(e);
}
var _10aa=self.bindingWindow.WindowManager;
top.setTimeout(function(){
Binding.evaluate(_10a7,self);
},0);
}});
});
};
CursorBinding.prototype=new Binding;
CursorBinding.prototype.constructor=CursorBinding;
CursorBinding.superclass=Binding.prototype;
CursorBinding.fadeIn=function(_10ab){
if(_10ab instanceof CursorBinding){
_10ab.setOpacity(0);
_10ab.show();
new Animation({modifier:Client.isExplorer?18:9,onstep:function(_10ac){
_10ab.setOpacity(Math.sin(_10ac*Math.PI/180));
},onstop:function(){
_10ab.setOpacity(1);
}}).play();
}
};
CursorBinding.fadeOut=function(_10ad){
if(_10ad instanceof CursorBinding){
new Animation({modifier:Client.isExplorer?18:9,onstep:function(_10ae){
_10ad.setOpacity(Math.cos(_10ae*Math.PI/180));
},onstop:function(){
_10ad.hide();
}}).play();
}
};
CursorBinding.moveOut=function(_10af,_10b0,_10b1){
if(_10af instanceof CursorBinding){
_10b1.x-=16;
_10b1.y-=16;
new Animation({modifier:3,onstep:function(_10b2){
var tal=Math.sin(_10b2*Math.PI/180);
_10af.setPosition(new Point(((1-tal)*_10b0.x)+((0+tal)*_10b1.x),((1-tal)*_10b0.y)+((0+tal)*_10b1.y)));
},onstop:function(){
CursorBinding.fadeOut(_10af);
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
CursorBinding.prototype.setOpacity=function(_10b8){
if(Client.isMozilla){
this.bindingElement.style.MozOpacity=new String(_10b8);
}else{
this.bindingElement.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+new String(_10b8*100)+")";
}
this._opacity=_10b8;
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
function setOpacity(_10bb){
if(Client.isMozilla){
cover.bindingElement.style.opacity=new String(_10bb);
}else{
cover.bindingElement.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+new String(_10bb*100)+")";
}
}
if(cover instanceof CoverBinding){
new Animation({modifier:Client.isExplorer?30:18,onstep:function(_10bc){
if(Binding.exists(cover)){
setOpacity(Math.cos(_10bc*Math.PI/180));
}
},onstop:function(){
if(Binding.exists(cover)){
cover.hide();
}
}}).play();
}
};
CoverBinding.fadeIn=function(cover){
function setOpacity(_10be){
if(Client.isMozilla){
cover.bindingElement.style.MozOpacity=new String(_10be);
}else{
cover.bindingElement.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+new String(_10be*100)+")";
}
}
if(cover instanceof CoverBinding){
new Animation({modifier:Client.isExplorer?30:18,onstart:function(){
if(Binding.exists(cover)){
setOpacity(0);
cover.show();
}
},onstep:function(_10bf){
if(Binding.exists(cover)){
setOpacity(Math.sin(_10bf*Math.PI/180));
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
CoverBinding.prototype.setBusy=function(_10c1){
if(_10c1!=this._isBusy){
if(_10c1){
this.bindingElement.style.cursor="wait";
}else{
this.bindingElement.style.cursor="default";
}
this._isBusy=_10c1;
}
};
CoverBinding.prototype.setTransparent=function(_10c2){
if(_10c2!=this._isTransparent){
if(_10c2){
this.attachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}else{
this.detachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}
this._isTransparent=_10c2;
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
CoverBinding.prototype.setHeight=function(_10c4){
if(_10c4>=0){
this.bindingElement.style.height=new String(_10c4+"px");
}
};
CoverBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
CoverBinding.newInstance=function(_10c5){
var _10c6=DOMUtil.createElementNS(Constants.NS_UI,"ui:cover",_10c5);
return UserInterface.registerBinding(_10c6,CoverBinding);
};
UncoverBinding.prototype=new Binding;
UncoverBinding.prototype.constructor=UncoverBinding;
UncoverBinding.superclass=Binding.prototype;
UncoverBinding._bindingInstance=null;
UncoverBinding.uncover=function(pos){
var _10c8=UncoverBinding._bindingInstance;
if(Binding.exists(_10c8)){
_10c8.setPosition(pos);
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
TheatreBinding.prototype.play=function(_10cc){
this._isFading=_10cc==true;
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
var _10cd=this._canvas.getContext("2d");
var alpha=parseInt(0);
TheatreBinding._interval=top.setInterval(function(){
if(alpha<0.5){
_10cd.fillStyle="rgba(0,0,0,"+new String(alpha)+")";
_10cd.clearRect(0,0,300,150);
_10cd.fillRect(0,0,300,150);
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
var _10cf=this._canvas.getContext("2d");
_10cf.clearRect(0,0,300,150);
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
var _10d0=SourceCodeViewerBinding.stylesheets[this._syntax];
this._transformer=new XSLTransformer();
this._transformer.importStylesheet(_10d0);
break;
default:
throw "SourceCodeViewer: Syntax error!";
this._syntax=null;
break;
}
var _10d1=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_10d1){
this._startcontent=_10d1.value;
}
this.setURL(SourceCodeViewerBinding.URL_DEFAULT);
this.addActionListener(WindowBinding.ACTION_ONLOAD);
SourceCodeViewerBinding.superclass.onBindingAttach.call(this);
};
SourceCodeViewerBinding.prototype.handleAction=function(_10d2){
SourceCodeViewerBinding.superclass.handleAction.call(this,_10d2);
switch(_10d2.type){
case WindowBinding.ACTION_ONLOAD:
if(_10d2.target==this){
if(this._startcontent){
this.view(this._startcontent);
}
this.dispatchAction(SourceCodeViewerBinding.ACTION_INITIALIZED);
_10d2.consume();
}
break;
}
SourceCodeViewerBinding.superclass.handleAction.call(this,_10d2);
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
var _10d6=this._transformer.transformToString(doc);
this._inject(_10d6);
}
};
SourceCodeViewerBinding.prototype._viewHTML=function(arg){
};
SourceCodeViewerBinding.prototype._viewJavascript=function(arg){
};
SourceCodeViewerBinding.prototype._inject=function(_10d9){
this.getContentDocument().body.innerHTML=_10d9;
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
var _10e1=list.getNext();
var id=_10e1.getAttribute("id");
map[id]={};
var atts=this._resolver.resolveAll("p:att",_10e1);
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
var _10eb=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"persist",doc);
_10eb.setAttribute("id",id);
for(var name in map[id]){
var att=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"att",doc);
att.setAttribute("name",name);
att.setAttribute("value",map[id][name]);
_10eb.appendChild(att);
}
elm.appendChild(_10eb);
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
var _10f5=window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance;
if(_10f5){
doc=XMLParser.parse(_10f5);
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
var _10f9=DOMSerializer.serialize(doc,true);
window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance=_10f9;
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
LocalizationSelectorBinding.prototype.handleBroadcast=function(_10fa,arg){
LocalizationSelectorBinding.superclass.handleBroadcast.call(this,_10fa,arg);
switch(_10fa){
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
var _10fd=new List();
list.each(function(lang){
_10fd.add(new SelectorBindingSelection(lang.Name,lang.SerializedActionToken,lang.IsCurrent,null));
});
this.populateFromList(_10fd);
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
Dialog.warning(StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogTitle"),StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogText"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_1101){
switch(_1101){
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
var _1104=new SystemAction({Label:"Generated Action: Change Locale",ActionToken:token});
SystemAction.invoke(_1104,root);
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
var _1105=this.getProperty("status");
if(_1105!=null){
switch(_1105){
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
UserInterfaceMapping.prototype.merge=function(_1108){
for(var _1109 in _1108.map){
this.map[_1109]=_1108.getBindingImplementation(_1109);
}
};
UserInterfaceMapping.prototype.getBindingImplementation=function(_110a){
var _110b=null;
var name=_110a.nodeName;
if(Client.isExplorer){
var small=name.toLowerCase();
if(name==small){
name="ui:"+name;
}else{
name=small;
}
}
if(this.map[name]){
_110b=this.map[name];
}
return _110b;
};
var UserInterface=new function(){
var _110e=(Client.isMozilla?MozEditorTextBoxBinding:IEEditorTextBoxBinding);
var _110f=new UserInterfaceMapping({"body":RootBinding,"ui:binding":Binding,"ui:box":Binding,"ui:dialog":DialogBinding,"ui:dialoghead":DialogHeadBinding,"ui:dialogbody":DialogBodyBinding,"ui:dialogmatrix":DialogMatrixBinding,"ui:dialogset":DialogSetBinding,"ui:dialogborder":DialogBorderBinding,"ui:dialogcover":DialogCoverBinding,"ui:titlebar":DialogTitleBarBinding,"ui:titlebarbody":DialogTitleBarBodyBinding,"ui:window":WindowBinding,"ui:controlgroup":ControlGroupBinding,"ui:control":ControlBinding,"ui:menubar":MenuBarBinding,"ui:menu":MenuBinding,"ui:menubody":MenuBodyBinding,"ui:menugroup":MenuGroupBinding,"ui:menuitem":MenuItemBinding,"ui:menupopup":MenuPopupBinding,"ui:tabbox":TabBoxBinding,"ui:tabs":TabsBinding,"ui:tab":TabBinding,"ui:tabpanels":TabPanelsBinding,"ui:tabpanel":TabPanelBinding,"ui:splitbox":SplitBoxBinding,"ui:splitpanel":SplitPanelBinding,"ui:splitter":SplitterBinding,"ui:decks":DecksBinding,"ui:deck":DeckBinding,"ui:toolbar":ToolBarBinding,"ui:toolbargroup":ToolBarGroupBinding,"ui:toolbarbody":ToolBarBodyBinding,"ui:toolbarbutton":ToolBarButtonBinding,"ui:toolbarlabel":ToolBarLabelBinding,"ui:labelbox":LabelBinding,"ui:text":TextBinding,"ui:clickbutton":ClickButtonBinding,"ui:tree":TreeBinding,"ui:treebody":TreeBodyBinding,"ui:treenode":TreeNodeBinding,"ui:flexbox":FlexBoxBinding,"ui:scrollbox":ScrollBoxBinding,"ui:popupset":PopupSetBinding,"ui:popup":PopupBinding,"ui:shadow":ShadowBinding,"ui:matrix":MatrixBinding,"ui:sourceeditor":BespinEditorBinding,"ui:visualeditor":VisualEditorBinding,"ui:visualmultieditor":VisualMultiEditorBinding,"ui:visualmultitemplateeditor":VisualMultiTemplateEditorBinding,"ui:wysiwygeditortoolbarbutton":EditorToolBarButtonBinding,"ui:dock":DockBinding,"ui:docktabs":DockTabsBinding,"ui:docktab":DockTabBinding,"ui:dockpanels":DockPanelsBinding,"ui:dockpanel":DockPanelBinding,"ui:page":PageBinding,"ui:editorpage":EditorPageBinding,"ui:dialogpage":DialogPageBinding,"ui:pagebody":DialogPageBodyBinding,"ui:wizardpage":WizardPageBinding,"ui:explorer":ExplorerBinding,"ui:explorerdecks":ExplorerDecksBinding,"ui:explorerdeck":ExplorerDeckBinding,"ui:explorersplitter":ExplorerSplitterBinding,"ui:explorermenu":ExplorerMenuBinding,"ui:explorertoolbar":ExplorerToolBarBinding,"ui:explorertoolbarbutton":ExplorerToolBarButtonBinding,"ui:stagecontainer":StageContainerBinding,"ui:stage":StageBinding,"ui:stagedecks":StageDecksBinding,"ui:stagedeck":StageDeckBinding,"ui:viewset":ViewSetBinding,"ui:view":ViewBinding,"ui:broadcasterset":BroadcasterSetBinding,"ui:broadcaster":BroadcasterBinding,"ui:fields":FieldsBinding,"ui:fieldgroup":FieldGroupBinding,"ui:field":FieldBinding,"ui:fielddesc":FieldDescBinding,"ui:fielddata":FieldDataBinding,"ui:fieldhelp":FieldHelpBinding,"ui:datainput":DataInputBinding,"ui:selector":SelectorBinding,"ui:simpleselector":SimpleSelectorBinding,"ui:multiselector":MultiSelectorBinding,"ui:datainputselector":DataInputSelectorBinding,"ui:datainputdialog":DataInputDialogBinding,"ui:textbox":TextBoxBinding,"ui:editortextbox":_110e,"ui:radiodatagroup":RadioDataGroupBinding,"ui:radio":RadioDataBinding,"ui:checkbutton":CheckButtonBinding,"ui:checkbox":CheckBoxBinding,"ui:checkboxgroup":CheckBoxGroupBinding,"ui:datadialog":DataDialogBinding,"ui:postbackdialog":PostBackDataDialogBinding,"ui:nullpostbackdialog":NullPostBackDataDialogBinding,"ui:htmldatadialog":HTMLDataDialogBinding,"ui:functioneditor":FunctionEditorDataBinding,"ui:parametereditor":ParameterEditorDataBinding,"ui:keyset":KeySetBinding,"ui:cover":CoverBinding,"ui:uncover":UncoverBinding,"ui:cursor":CursorBinding,"ui:dialogtoolbar":DialogToolBarBinding,"ui:focus":FocusBinding,"ui:balloonset":BalloonSetBinding,"ui:balloon":BalloonBinding,"ui:error":ErrorBinding,"ui:throbber":ThrobberBinding,"ui:progressbar":ProgressBarBinding,"ui:lazybinding":LazyBindingBinding,"ui:sourcecodeviewer":SourceCodeViewerBinding,"ui:theatre":TheatreBinding,"ui:persistance":PersistanceBinding,"ui:filepicker":FilePickerBinding,"ui:request":RequestBinding,"ui:response":ResponseBinding});
var _1110=SystemLogger.getLogger("UserInterface");
var keys={};
this.registerBinding=function(_1112,impl){
var _1114=null;
if(!this.hasBinding(_1112)){
var _1115=DOMUtil.getParentWindow(_1112);
if(DOMUtil.getLocalName(_1112)!="bindingmapping"){
if(!impl&&_1112.getAttribute("binding")!=null){
var _1116=_1112.getAttribute("binding");
impl=_1115[_1116];
if(impl==null){
throw "No such binding in scope: "+_1116;
}
}
if(!impl){
var _1117=_1115.DocumentManager;
if(_1117){
var _1118=_1117.customUserInterfaceMapping;
if(_1118){
impl=_1118.getBindingImplementation(_1112);
}
}
}
if(!impl){
impl=_110f.getBindingImplementation(_1112);
}
if(impl!=null&&!Application.isMalFunctional){
try{
_1114=new impl();
}
catch(exception){
Application.isMalFunctional=true;
alert("No such binding!\n"+exception.message+(exception.stack?"\n"+exception.stack:""));
throw (exception);
}
}
if(_1114){
var key=KeyMaster.getUniqueKey();
_1112.setAttribute("key",key);
_1114.key=key;
if(!_1112.id){
_1112.id=key;
}
keys[key]={element:_1112,binding:_1114};
_1114.onBindingRegister();
}
}
}
return _1114;
};
this.unRegisterBinding=function(_111a){
terminate(_111a);
};
function terminate(_111b){
if(Binding.exists(_111b)==true){
var key=_111b.key;
Binding.destroy(_111b);
if(key){
if(keys[key]){
keys[key].binding=null;
keys[key].element=null;
delete keys[key];
_111b=null;
}else{
_1110.error("URGH: "+key);
}
}
}
}
this.getElement=function(_111d){
var _111e=null;
if(keys[_111d.key]){
_111e=keys[_111d.key].element;
}
return _111e;
};
this.getBinding=function(_111f){
var _1120=null;
if(_111f&&_111f.nodeType==Node.ELEMENT_NODE){
try{
var key=_111f.getAttribute("key");
if(key&&keys[key]){
_1120=keys[key].binding;
}
}
catch(exception){
alert("getBinding exception occured on element:\n\n\t\t"+_111f);
if(exception.stack){
alert(exception.stack);
}
}
}
return _1120;
};
this.getBindingByKey=function(key){
var _1123=null;
if(keys[key]){
_1123=keys[key].binding;
}
return _1123;
};
this.hasBinding=function(_1124){
return this.getBinding(_1124)!=null;
};
this.isBindingVisible=function(_1125){
var _1126=Application.isOperational;
if(_1126==true){
var _1127=new Crawler();
_1127.type=NodeCrawler.TYPE_ASCENDING;
_1127.id="visibilitycrawler";
_1127.addFilter(function(_1128){
var b=UserInterface.getBinding(_1128);
var res=0;
if(!b.isVisible){
_1126=false;
res=NodeCrawler.STOP_CRAWLING;
}
return res;
});
_1127.crawl(_1125.bindingElement);
_1127.dispose();
}
return _1126;
};
var _112b=null;
this.getBindingCount=function(){
var count=0;
for(var key in keys){
count++;
}
return count;
};
this.setPoint=function(){
_112b={};
for(var key in keys){
_112b[key]=true;
}
};
this.getPoint=function(){
var _112f=null;
if(_112b){
_112f=new List();
for(var key in keys){
if(!_112b[key]){
_112f.add(key);
}
}
}
return _112f;
};
this.clearPoint=function(){
_112b=null;
};
this.trackUndisposedBindings=function(){
var _1131=null;
for(var key in keys){
var entry=keys[key];
if(!entry.binding||!entry.element||!Binding.exists(entry.binding)){
if(!_1131){
_1131="Bindings illdisposed: ";
}
_1131+=entry.binding+" ";
}
}
if(_1131!=null){
_1110.error(_1131);
}
};
this.autoTrackDisposedBindings=function(_1134){
if(_1134){
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
SOAPRequest.newInstance=function(_1135,_1136){
var _1137=_1135+"/"+_1136;
var _1138=new SOAPRequest(_1137);
var _1139=SOAPRequest.resolver;
_1138.document=Templates.getTemplateDocument("soapenvelope.xml");
_1138.envelope=_1139.resolve("soap:Envelope",_1138.document);
_1138.header=_1139.resolve("soap:Header",_1138.envelope);
_1138.body=_1139.resolve("soap:Body",_1138.envelope);
return _1138;
};
SOAPRequest._parseResponse=function(_113a){
var _113b=null;
var _113c=false;
var doc=_113a.responseXML;
if(doc!=null&&doc.documentElement!=null){
switch(doc.documentElement.namespaceURI){
case Constants.NS_ENVELOPE:
_113b=SOAPRequestResponse.newInstance(_113a.responseXML);
if(Application.isOffLine){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_ONLINE);
}
break;
case Constants.NS_XHTML:
if(!Application.isOffLine){
var body=SOAPRequest.resolver.resolve("xhtml:html/xhtml:body",_113a.responseXML);
if(body&&body.getAttribute("id")=="offline"){
_113c=true;
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
var text=_113a.responseText;
if(text.indexOf("id=\"offline\"")>-1){
_113c=true;
}else{
var cry="Invalid SOAP response: \n\n"+_113a.responseText;
SystemLogger.getLogger("SOAPRequest._parseResponse (static)").error(cry);
if(Application.isDeveloperMode){
alert("Invalid SOAP response");
window.open("about:blank").document.write(_113a.responseText);
}
}
}
}
if(_113c==true){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_OFFLINE);
}
return _113b;
};
function SOAPRequest(_1141){
this.logger=SystemLogger.getLogger("SOAPRequest");
this.action=_1141;
return this;
}
SOAPRequest.prototype.invoke=function(url){
var _1143=DOMUtil.getXMLHTTPRequest();
var _1144=null;
_1143.open("post",url,false);
_1143.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_1143.setRequestHeader("SOAPAction",this.action);
try{
_1143.send(this.document);
_1144=SOAPRequest._parseResponse(_1143);
}
catch(exception){
var error="Dysfuntion in SOAP invoke: "+url;
if(this.document!=null){
error+="\n"+DOMSerializer.serialize(this.document,true);
}
this.logger.error(error);
throw exception;
}
_1143=null;
return _1144;
};
SOAPRequest.prototype.dispose=function(){
for(var _1146 in this){
this[_1146]=null;
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
var _1148=null;
if(doc&&doc.documentElement){
_1148=new SOAPRequestResponse();
var _1149=SOAPRequestResponse.resolver;
_1148.document=doc;
_1148.envelope=_1149.resolve("soap:Envelope",_1148.document);
_1148.header=_1149.resolve("soap:Header",_1148.envelope);
_1148.body=_1149.resolve("soap:Body",_1148.envelope);
var fault=_1149.resolve("soap:Fault",_1148.body);
if(fault){
SOAPRequestResponse.logger.fatal(DOMSerializer.serialize(fault,true));
_1148.fault={element:fault,faultNamespaceURI:fault.namespaceURI,faultCode:DOMUtil.getTextContent(_1149.resolve("faultcode",fault)),faultString:DOMUtil.getTextContent(_1149.resolve("faultstring",fault)),detail:fault.getElementsByTagName("detail").item(0)};
}
}
return _1148;
};
function SOAPFault(_114b,_114c,_114d){
this._operationName=_114b;
this._operationAddress=_114c;
this._faultString=_114d;
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
SOAPFault.newInstance=function(_114e,fault){
return new SOAPFault(_114e.name,_114e.address,fault.faultString);
};
function SOAPEncoder(wsdl,_1151){
this.logger=SystemLogger.getLogger("SOAPEncoder");
this._wsdl=wsdl;
this._operation=_1151;
this._namespace=wsdl.getTargetNamespace();
}
SOAPEncoder.prototype.encode=function(args){
var _1153=SOAPRequest.newInstance(this._namespace,this._operation);
var root=this._appendElement(_1153.body,this._operation);
var _1155=this._wsdl.getSchema();
var _1156=_1155.lookup(this._operation);
var _1157=_1156.getListedDefinitions();
while(_1157.hasNext()){
var def=_1157.getNext();
var elm=this._appendElement(root,def.name);
var val=args.getNext();
this._resolve(elm,def,val);
}
return _1153;
};
SOAPEncoder.prototype._resolve=function(_115b,_115c,value){
var _115e=this._wsdl.getSchema();
if(_115c.isSimpleValue){
this._appendText(_115b,value,_115c.type=="string");
}else{
var _115f=_115e.lookup(_115c.type);
if(_115f instanceof SchemaSimpleType){
alert("SOAPEncoder: SchemaSimpleType support not implemented!");
}else{
var defs=_115f.getListedDefinitions();
if(_115f.isArray){
var _1161=new List(value);
var def=defs.getNext();
while(_1161.hasNext()){
var elm=this._appendElement(_115b,def.name);
var val=_1161.getNext();
this._resolve(elm,def,val);
}
}else{
while(defs.hasNext()){
try{
var def=defs.getNext();
var elm=this._appendElement(_115b,def.name);
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
SOAPEncoder.prototype._appendText=function(_1168,value,_116a){
if(value!=null){
value=new String(value);
var safe=new String("");
var chars=value.split("");
var _116d=false;
var i=0,c;
while(c=chars[i++]){
var _1170=true;
var code=c.charCodeAt(0);
switch(code){
case 9:
case 10:
case 13:
_1170=false;
break;
default:
if((code>=32&&code<=55295)||(code>=57344&&code<=65533)||(code>=65536&&code<=1114111)){
_1170=false;
}
break;
}
if(!_1170){
safe+=c;
}else{
_116d=true;
}
}
if(_116d){
this.logger.debug("Illegal XML character(s) was deleted from the string: "+value);
}
_1168.appendChild(_1168.ownerDocument.createTextNode(safe));
}
};
function SOAPDecoder(wsdl,_1173){
this._wsdl=wsdl;
this._operation=_1173;
this._resolver=new XPathResolver();
this._resolver.setNamespacePrefixResolver({"result":wsdl.getTargetNamespace()});
}
SOAPDecoder.prototype.resolve=function(xpath,node){
return this._resolver.resolve("result:"+xpath,node);
};
SOAPDecoder.prototype.resolveAll=function(xpath,node){
return this._resolver.resolveAll("result:"+xpath,node);
};
SOAPDecoder.prototype.decode=function(_1178){
var _1179=null;
var _117a=this._wsdl.getSchema();
var id=this._operation+"Response";
var _117c=this.resolve(id,_1178.body);
var _117d=_117a.lookup(id);
var _117e=_117d.getListedDefinitions();
while(!_1179&&_117e.hasNext()){
var def=_117e.getNext();
var elm=this.resolve(def.name,_117c);
if(def.type==SchemaDefinition.TYPE_XML_DOCUMENT){
_1179=DOMUtil.getDOMDocument();
var e=elm.getElementsByTagName("*").item(0);
if(typeof _1179.importNode!=Types.UNDEFINED){
_1179.appendChild(_1179.importNode(e,true));
}else{
_1179.loadXML(DOMSerializer.serialize(e));
}
}else{
_1179=this._compute(elm,def);
}
}
return _1179;
};
SOAPDecoder.prototype._compute=function(_1182,_1183){
var _1184=null;
var _1185=this._wsdl.getSchema();
if(_1183.isSimpleValue){
_1184=this._getSimpleValue(_1182,_1183.type);
}else{
var _1186=_1185.lookup(_1183.type);
if(_1186 instanceof SchemaSimpleType){
_1184=this._getSimpleValue(_1182,_1186.restrictionType);
}else{
var defs=_1186.getListedDefinitions();
if(_1186.isArray){
_1184=[];
var def=defs.getNext();
var elms=this.resolveAll(def.type,_1182);
while(elms.hasNext()){
var elm=elms.getNext();
_1184.push(this._compute(elm,def));
}
}else{
_1184={};
defs.reset();
while(defs.hasNext()){
var def=defs.getNext();
var elm=this.resolve(def.name,_1182);
if(elm){
_1184[def.name]=this._compute(elm,def);
}else{
if(def.isRequired){
throw new Error("SOAPDecoder: invalid SOAP response.");
}
}
}
}
}
}
return _1184;
};
SOAPDecoder.prototype._getSimpleValue=function(_118b,type){
var _118d=null;
if(_118b.firstChild&&_118b.firstChild.nodeType==Node.TEXT_NODE){
if(Client.isMozilla&&_118b.childNodes.length>1){
_118b.normalize();
}
_118d=_118b.firstChild.data;
switch(type){
case Schema.types.STRING:
_118d=_118d;
break;
case Schema.types.INT:
case Schema.types.FLOAT:
case Schema.types.DOUBLE:
_118d=Number(_118d);
break;
case Schema.types.BOOLEAN:
_118d=_118d=="true";
break;
default:
throw ("SOAPDecoder: schema type \""+type+"\" not handled.");
break;
}
}
return _118d;
};
Schema.prototype=new XPathResolver;
Schema.prototype.constructor=Schema;
Schema.superclass=XPathResolver.prototype;
Schema.types={STRING:"string",INT:"int",FLOAT:"float",DOUBLE:"double",BOOLEAN:"boolean"};
Schema.notSupportedException=new Error("Schema: Schema structure not supported!");
function Schema(_118e){
this.logger=SystemLogger.getLogger("Schema");
this._map=this._parseSchema(_118e);
}
Schema.prototype._parseSchema=function(_118f){
this.setNamespacePrefixResolver({"wsdl":Constants.NS_WSDL,"soap":Constants.NS_SOAP,"s":Constants.NS_SCHEMA});
var _1190={};
var entry=null;
var rules=this.resolveAll("s:*[@name]",_118f);
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
_1190[rule.getAttribute("name")]=entry;
}
return _1190;
};
Schema.prototype.lookup=function(name){
return this._map[name];
};
SchemaDefinition.TYPE_XML_DOCUMENT="xmldocument";
function SchemaDefinition(_1195){
this.logger=SystemLogger.getLogger("SchemaDefinition");
this.isRequired=null;
this.type=null;
this._parse(_1195);
}
SchemaDefinition.prototype._parse=function(_1196){
var min=_1196.getAttribute("minOccurs");
var max=_1196.getAttribute("maxOccurs");
var type=_1196.getAttribute("type");
this.name=_1196.getAttribute("name");
this.isRequired=min!="0";
if(type){
var split=type.split(":");
var sort=split[0];
var _119c=split[1];
this.isSimpleValue=sort!="tns";
this.type=_119c;
}else{
var elm=_1196.getElementsByTagName("*").item(0);
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
function SchemaElementType(_119e,_119f){
this.logger=SystemLogger.getLogger("SchemaElementType");
this._definitions=new List();
this._parseListedDefinitions(_119e,_119f);
}
SchemaElementType.prototype._parseListedDefinitions=function(_11a0,_11a1){
var els=_11a0.resolveAll("s:complexType/s:sequence/s:element",_11a1);
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
function SchemaComplexType(_11a3,_11a4){
this._definitions=new List();
this._parseListedDefinitions(_11a3,_11a4);
this.isArray=_11a4.getAttribute("name").indexOf("ArrayOf")>-1;
}
SchemaComplexType.prototype._parseListedDefinitions=function(_11a5,_11a6){
var els=_11a5.resolveAll("s:sequence/s:element",_11a6);
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
function SchemaSimpleType(_11a9,_11aa){
this.restrictionType=null;
this._parse(_11a9,_11aa);
}
SchemaSimpleType.prototype._parse=function(_11ab,_11ac){
var _11ad=_11ab.resolve("s:restriction",_11ac);
if(_11ad){
this.restrictionType=_11ad.getAttribute("base").split(":")[1];
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
var _11b0=null;
var _11b1=DOMUtil.getXMLHTTPRequest();
_11b1.open("get",url,false);
_11b1.send(null);
if(_11b1.responseXML){
_11b0=_11b1.responseXML.documentElement;
}else{
alert(_11b1.responseText);
throw new Error("WebServiceResolver: Could not read WSDL: "+url);
}
return _11b0;
};
WebServiceResolver.prototype.getPortAddress=function(){
return this._WSDLURL.split("?WSDL")[0];
};
WebServiceResolver.prototype.getTargetNamespace=function(){
return this._root.getAttribute("targetNamespace");
};
WebServiceResolver.prototype.getOperations=function(){
var _11b2=new List();
var _11b3=this.resolveAll("wsdl:portType/wsdl:operation",this._root);
if(_11b3.hasEntries()){
while(_11b3.hasNext()){
var _11b4=_11b3.getNext();
var name=_11b4.getAttribute("name");
_11b2.add(new WebServiceOperation(name,this.getPortAddress(),new SOAPEncoder(this,name),new SOAPDecoder(this,name)));
}
}else{
throw new Error("WebServiceResolver: No portType found.");
}
return _11b2;
};
WebServiceResolver.prototype.getSchema=function(){
return this._schema;
};
function WebServiceOperation(name,_11b7,_11b8,_11b9){
this.name=name;
this.address=_11b7;
this.encoder=_11b8;
this.decoder=_11b9;
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
var _11bd=wsdl.getOperations();
_11bd.each(function(_11be){
proxy[_11be.name]=WebServiceProxy.createProxyOperation(_11be);
});
return proxy;
};
WebServiceProxy.prototype._log=function(_11bf,_11c0){
if(WebServiceProxy.isLoggingEnabled&&Application.isDeveloperMode&&_11c0){
var log=_11c0 instanceof SOAPRequest?"SOAPRequest for ":"SOAPResponse from ";
log+=_11bf.address+": "+_11bf.name+"\n\n";
log+=DOMSerializer.serialize(_11c0.document,true);
this.logger.fine(log);
}
};
WebServiceProxy.createProxyOperation=function(_11c2){
return function(){
var _11c3=null,_11c4=_11c2.encoder.encode(new List(arguments));
this._log(_11c2,_11c4);
var _11c5=_11c4.invoke(_11c2.address);
this._log(_11c2,_11c5);
if(_11c5){
if(_11c5.fault){
_11c3=SOAPFault.newInstance(_11c2,_11c5.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_11c3,_11c4,_11c5);
}
}else{
if(WebServiceProxy.isDOMResult){
_11c3=_11c5.document;
}else{
_11c3=_11c2.decoder.decode(_11c5);
}
}
}
_11c4.dispose();
return _11c3;
};
};
WebServiceProxy.handleFault=function(_11c6,_11c7,_11c8){
try{
Dialog.invokeModal(Dialog.URL_SERVICEFAULT,null,{soapFault:_11c6,soapRequest:_11c7,soapResponse:_11c8});
}
catch(exception){
alert(_11c6.getFaultString());
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
var _11c9=SystemLogger.getLogger("MessageQueue");
var _11ca=null;
var _11cb=0;
var _11cc=null;
var _11cd=new Map();
var _11ce=new Map();
var _11cf=false;
var _11d0=false;
var _11d1={"Main":DockBinding.MAIN,"BottomLeft":DockBinding.BOTTOMLEFT,"BottomRight":DockBinding.BOTTOMRIGHT,"RightTop":DockBinding.RIGHTTOP,"RightBottom":DockBinding.RIGHTBOTTOM,"AbsBottomLeft":DockBinding.ABSBOTTOMLEFT,"AbsBottomRight":DockBinding.ABSBOTTOMRIGHT};
this.initialize=function(){
_11ca=ConsoleMessageQueueService;
_11cb=_11ca.GetCurrentSequenceNumber("dummyparam!");
this.index=_11cb;
EventBroadcaster.subscribe(BroadcastMessages.VIEW_COMPLETED,this);
EventBroadcaster.subscribe(BroadcastMessages.VIEW_CLOSED,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_OFFLINE,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_ONLINE,this);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
};
this._autoupdate=function(){
if(!_11cf){
if(!MessageQueue._actions.hasEntries()){
var _11d2=WebServiceProxy.isLoggingEnabled;
if(Application.isLoggedIn){
_11d0=true;
WebServiceProxy.isLoggingEnabled=false;
MessageQueue.update();
WebServiceProxy.isLoggingEnabled=_11d2;
_11d0=false;
}
}
}
};
this._pokeserver=function(){
if(_11cf==true){
if(ReadyService.IsServerReady(true)){
MessageQueue._lockSystem(false);
}
}
};
this.update=function(){
if(Application.isLoggedIn){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_REQUESTED,_11d0);
var _11d3=_11ca.GetMessages(Application.CONSOLE_ID,this.index);
if(_11d3!=null){
if(Types.isDefined(_11d3.CurrentSequenceNumber)){
var _11d4=_11d3.CurrentSequenceNumber;
if(_11d4<this.index){
_11c9.debug("SERVER WAS RESTARTED! old messagequeue index: "+this.index+", new messagequeue index: "+_11d4);
}
this.index=_11d4;
var _11d5=new List(_11d3.ConsoleActions);
if(_11d5.hasEntries()){
this.evaluate(_11d5);
}else{
if(!this._actions.hasEntries()){
broadcastUpdateEvaluated();
}
}
}else{
_11c9.error("No sequencenumber in MessageQueue response!");
}
}
}
};
this.evaluate=function(_11d6){
var _11d7=new List();
if(_11d6.hasEntries()){
_11d6.each(function(_11d8){
if(this._index[_11d8.Id]!=true){
_11d7.add(_11d8);
}
this._index[_11d8.Id]=true;
},this);
if(_11d7.hasEntries()){
if(this._actions.hasEntries()){
this._actions.merge(_11d7);
}else{
this._actions=_11d7;
}
this._nextAction();
}
}
};
this._closeAllViews=function(_11d9){
var _11da="(No reason)";
if(_11d9!=null){
_11da=_11d9.Reason;
}
var title="Warning";
var text="The server has requested a close of all active editors for the following reason: \"${reason}\". It is recommended that you accept this request by clicking OK.";
text=text.replace("${reason}",_11da);
var self=this;
Dialog.warning(title,text,Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_11de){
if(_11de==Dialog.RESPONSE_ACCEPT){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEWS);
}
self._nextAction();
}});
};
this._nextAction=function(){
var _11df=null;
if(this._actions.hasEntries()){
var _11e0=this._actions.extractFirst();
_11cb=_11e0.SequenceNumber;
_11c9.debug("MessageQueue action: "+_11e0.ActionType+" > QUEUE-MAX-SEQNUM: "+this.index+" > CURRENT SEQNUM: "+_11cb+" > ACTIONS-LEFT: "+this._actions.getLength());
switch(_11e0.ActionType){
case "OpenView":
_11df=_11e0.OpenViewParams;
if(_11df.ViewType=="ModalDialog"){
openDialogView(_11df);
}else{
_11cc=_11df.ViewId;
openView(_11df);
}
break;
case "CloseView":
_11df=_11e0.CloseViewParams;
_11cc=_11df.ViewId;
closeView(_11df);
break;
case "RefreshTree":
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,_11e0.RefreshTreeParams.EntityToken);
var debug="REFRESHING TREES: "+_11cd.countEntries()+"\n";
_11cd.each(function(token){
debug+="\n\tTOKEN: "+token;
});
_11c9.debug(debug);
if(!_11cd.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "MessageBox":
openMessageBox(_11e0.MessageBoxParams);
break;
case "OpenViewDefinition":
_11df=_11e0.OpenViewDefinitionParams;
_11cc=_11df.Handle;
openViewDefinition(_11df);
break;
case "LogEntry":
logEntry(_11e0.LogEntryParams);
this._nextAction();
break;
case "Reboot":
Application.reload(true);
break;
case "LockSystem":
MessageQueue._lockSystem(true);
break;
case "BroadcastMessage":
_11df=_11e0.BroadcastMessageParams;
_11c9.debug("Server says: EventBroadcaster.broadcast ( \""+_11df.Name+"\", "+_11df.Value+" )");
EventBroadcaster.broadcast(_11df.Name,_11df.Value);
this._nextAction();
break;
case "CollapseAndRefresh":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_COLLAPSEALL);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
if(!_11cd.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "CloseAllViews":
this._closeAllViews(_11e0.CloseAllViewsParams);
break;
case "SaveStatus":
saveStatus(_11e0.SaveStatusParams);
this._nextAction();
break;
case "DownloadFile":
Download.init(_11e0.DownloadFileParams.Url);
this._nextAction();
break;
case "ExpandTreeNode":
this._nextAction();
break;
case "BindEntityTokenToView":
_11df=_11e0.BindEntityTokenToViewParams;
EventBroadcaster.broadcast(BroadcastMessages.BIND_TOKEN_TO_VIEW,{handle:_11df.ViewId,entityToken:_11df.EntityToken});
this._nextAction();
break;
case "OpenGenericView":
_11df=_11e0.OpenGenericViewParams;
openGenericView(_11df);
break;
default:
Dialog.error("Dysfunction","Unhandled action: "+_11e0.ActionType);
break;
}
}else{
broadcastUpdateEvaluated();
}
};
function broadcastUpdateEvaluated(){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_EVALUATED,_11d0);
}
function logEntry(_11e3){
var _11e4=_11e3.Level.toLowerCase();
SystemLogger.getLogger(_11e3.SenderId)[_11e4](_11e3.Message);
}
function openView(_11e5){
var list=paramsToList(_11e5.Argument);
if(list.hasEntries()){
var def=ViewDefinition.clone("Composite.Management.PostBackView",_11e5.ViewId);
def.entityToken=_11e5.EntityToken;
def.flowHandle=_11e5.FlowHandle;
def.position=_11d1[_11e5.ViewType],def.label=_11e5.Label;
def.image=_11e5.Image;
def.toolTip=_11e5.ToolTip;
def.argument={"url":_11e5.Url,"list":list};
StageBinding.presentViewDefinition(def);
}else{
StageBinding.presentViewDefinition(new HostedViewDefinition({handle:_11e5.ViewId,entityToken:_11e5.EntityToken,flowHandle:_11e5.FlowHandle,position:_11d1[_11e5.ViewType],url:_11e5.Url,label:_11e5.Label,image:_11e5.Image,toolTip:_11e5.ToolTip}));
}
}
function openDialogView(_11e8){
StageBinding.presentViewDefinition(new DialogViewDefinition({handle:_11e8.ViewId,flowHandle:_11e8.FlowHandle,position:Dialog.MODAL,url:_11e8.Url,handler:{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}}}));
}
function openMessageBox(_11e9){
var _11ea=_11e9.DialogType.toLowerCase();
if(_11ea=="question"){
throw "Not supported!";
}else{
Dialog[_11ea](_11e9.Title,_11e9.Message,null,{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}});
}
}
function openViewDefinition(_11eb){
var map={};
var _11ed=false;
new List(_11eb.Argument).each(function(entry){
map[entry.Key]=entry.Value;
_11ed=true;
});
var proto=ViewDefinitions[_11eb.Handle];
if(proto!=null){
var def=null;
if(proto.isMutable==false){
def=proto;
}else{
def=new HostedViewDefinition();
for(var prop in proto){
def[prop]=proto[prop];
}
def.handle=_11eb.ViewId;
}
def.argument=_11ed?map:null;
StageBinding.presentViewDefinition(def);
}else{
throw "Unknown ViewDefinition: "+param.Handle;
}
}
function openGenericView(_11f2){
var def=ViewBinding.clone("Composite.Management.GenericView",_11f2.ViewId);
def.label=_11f2.Label;
def.toolTip=_11f2.ToolTip;
def.image=_11f2.Image;
def.argument={"url":_11f2.Url,"list":paramsToList(_11f2.UrlPostArguments)};
StageBinding.presentViewDefinition(def);
}
function closeView(_11f4){
if(StageBinding.isViewOpen(_11f4.ViewId)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_11f4.ViewId);
}else{
MessageQueue._nextAction();
}
}
function saveStatus(_11f5){
EventBroadcaster.broadcast(BroadcastMessages.CURRENT_SAVED,{handle:_11f5.ViewId,isSuccess:_11f5.Succeeded});
}
this._lockSystem=function(_11f6){
var _11f7=top.bindingMap.offlinetheatre;
if(_11f6){
_11f7.play(true);
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._pokeserver,MessageQueue.INTERVAL_OFFLINE);
}else{
_11f7.stop();
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
var self=this;
setTimeout(function(){
if(self._actions.hasEntries()){
self._nextAction();
}
},0);
}
_11cf=_11f6;
};
this.handleBroadcast=function(_11f9,arg){
switch(_11f9){
case BroadcastMessages.APPLICATION_LOGIN:
this.initialize();
break;
case BroadcastMessages.VIEW_COMPLETED:
case BroadcastMessages.VIEW_CLOSED:
if(_11cc!=null&&arg==_11cc){
_11cc=null;
this._nextAction();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHING:
if(arg!=null){
_11cd.set(arg,true);
}else{
_11c9.debug("Saa har vi balladen!");
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED:
if(_11cd.hasEntries()){
_11cd.del(arg);
_11c9.debug("Refreshed tree: "+arg+"\n("+_11cd.countEntries()+" trees left!)");
if(!_11cd.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
setTimeout(function(){
MessageQueue._nextAction();
},0);
}
}
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN:
_11ce.set(arg,true);
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN:
if(_11ce.hasEntries()==true){
_11ce.del(arg);
if(!_11ce.hasEntries()){
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
function paramsToList(_11fb){
var list=new List();
new List(_11fb).each(function(entry){
list.add({name:entry.Key,value:entry.Value});
});
return list;
}
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
};
var ViewDefinitions={"Composite.Management.Null":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.Null"}),"Composite.Management.PostBackDialog":new DialogViewDefinition({handle:"Composite.Management.PostBackDialog",isMutable:true,position:Dialog.MODAL,url:"${root}/content/dialogs/postback/postbackdialog.aspx",argument:{"url":null,"list":null}}),"Composite.Management.PostBackView":new HostedViewDefinition({handle:"Composite.Management.PostBackView",isMutable:true,position:DockBinding.MAIN,url:"${root}/postback.aspx",argument:{"url":null,"list":null}}),"Composite.Management.GenericView":new HostedViewDefinition({handle:"Composite.Management.GenericView",isMutable:true,position:DockBinding.MAIN,url:"${root}/content/views/generic/generic.aspx",label:null,image:null,toolTip:null,argument:{"url":null,"list":null}}),"Composite.Management.Start":new HostedViewDefinition({handle:"Composite.Management.Start",position:DockBinding.START,label:"Welcome Travellers",url:"${root}/content/views/start/start.aspx"}),"Composite.Management.About":new DialogViewDefinition({handle:"Composite.Management.About",position:Dialog.MODAL,url:"${root}/content/dialogs/about/about.aspx"}),"Composite.Management.PermissionEditor":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.PermissionEditor",position:DockBinding.MAIN,url:"${root}/content/views/editors/permissioneditor/permissioneditor.aspx",argument:{serializedEntityToken:"entityTokenType='Composite\\.Plugins\\.Elements\\.ElementProviders\\.VirtualElementProvider\\.VirtualElementProviderEntityToken,Composite'entityToken='_EntityToken_Type_=\\'Composite\\\\\\.Plugins\\\\\\.Elements\\\\\\.ElementProviders\\\\\\.VirtualElementProvider\\\\\\.VirtualElementProviderEntityToken,Composite\\'_EntityToken_Source_=\\'VirtualElementProvider\\'_EntityToken_Id_=\\'DesignPerspective\\''\""}}),"Composite.Management.SystemLog":new HostedViewDefinition({handle:"Composite.Management.SystemLog",position:DockBinding.ABSBOTTOMLEFT,label:"System Log",url:"${root}/content/views/dev/systemlog/systemlog.aspx"}),"Composite.Management.Developer":new HostedViewDefinition({handle:"Composite.Management.Developer",position:DockBinding.ABSBOTTOMRIGHT,label:"Developer",url:"${root}/content/views/dev/developer/developer.aspx"}),"Composite.Management.IconPack.System":new HostedViewDefinition({handle:"Composite.Management.IconPack.System",position:DockBinding.ABSBOTTOMLEFT,label:"Freja",image:"${icon:icon}",url:"${root}/content/views/dev/icons/system/Default.aspx"}),"Composite.Management.IconPack.Republic":new HostedViewDefinition({handle:"Composite.Management.IconPack.Republic",position:DockBinding.ABSBOTTOMLEFT,label:"Republic",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/republic.aspx"}),"Composite.Management.IconPack.Harmony":new HostedViewDefinition({handle:"Composite.Management.IconPack.Harmony",position:DockBinding.ABSBOTTOMLEFT,label:"Harmony",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/harmony.aspx"}),"Composite.Management.Explorer":new HostedViewDefinition({handle:"Composite.Management.Explorer",position:DockBinding.EXPLORER,url:"${root}/content/views/explorer/explorer.aspx",label:"Explorer"}),"Composite.Management.Options":new DialogViewDefinition({handle:"Composite.Management.Options",position:Dialog.MODAL,url:"${root}/content/dialogs/options/options.aspx",label:"Options"}),"Composite.Management.VisualEditorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.VisualEditorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/wysiwygeditor/wysiwygeditordialog.aspx",width:600,argument:{"formattingconfiguration":null,"elementclassconfiguration":null,"configurationstylesheet":null,"presentationstylesheet":null,"embedablefieldstypenames":null}}),"Composite.Management.MultiSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MultiSelectorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/multiselector/multiselectordialog.aspx"}),"Composite.Management.Search":new HostedViewDefinition({handle:"Composite.Management.Search",position:DockBinding.RIGHTBOTTOM,url:"${root}/content/views/search/search.aspx",label:"Search",image:"${icon:view_search}",argument:null}),"Composite.Management.Browser":new HostedViewDefinition({isMutable:false,handle:"Composite.Management.Browser",position:DockBinding.MAIN,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,label:"Page Browser",image:"${icon:page-view-administrated-scope}",toolTip:"Browse unpublished pages",url:"${root}/content/views/browser/browser.aspx",argument:{"URL":null}}),"Composite.Management.SEOAssistant":new HostedViewDefinition({handle:"Composite.Management.SEOAssistant",position:DockBinding.RIGHTTOP,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,url:"${root}/content/views/seoassist/seoassist.aspx",label:"${string:Composite.Web.SEOAssistant:SEOAssistant}",image:"${icon:seoassistant}",toolTip:"Search engine optimization"}),"Composite.Management.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.SourceCodeViewer",position:DockBinding.ABSBOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.User.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.User.SourceCodeViewer",position:DockBinding.BOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.Management.Help":new HostedViewDefinition({label:"Help",image:"${icon:help}",handle:"Composite.Management.Help",position:DockBinding.ABSRIGHTTOP,url:"${root}/content/views/help/help.aspx"}),"Composite.Management.Dialog.Translations":new DialogViewDefinition({handle:"Composite.Management.TranslationsDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/translations/translations.aspx",label:"Translations",image:"${icon:users-changepublicculture}"}),"Composite.Management.ImageSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.ImageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_IMAGESELECTOR,argument:{label:"Select Image",image:"${icon:image}",selectionProperty:"ElementType",selectionValue:"image/jpeg image/gif image/png image/bmp image/tiff",selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WebImages"}]}}),"Composite.Management.EmbeddableMediaSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Media",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:null}]}}),"Composite.Management.FrontendFileSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Frontend File",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"LayoutFileElementProvider"}]}}),"Composite.Management.PageSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Page",image:"${icon:page}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.PageIdSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageIdSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Page",image:"${icon:page}",selectionProperty:"DataId",selectionValue:null,selectionResult:"DataId",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.LinkableSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.LinkableSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Page or File",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"},{key:"MediaFileElementProvider"}]}}),"Composite.Management.MediaSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.MediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Page or File",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider"}]}}),"Composite.Management.FunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.FunctionSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Function",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider"}]}}),"Composite.Management.WidgetFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.WidgetFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Widget",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllWidgetFunctionsElementProvider"}]}}),"Composite.Management.XhtmlDocumentFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.XhtmlDocumentFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Function",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider",search:"AllFunctionsElementProvider.XhtmlDocument"}]}})};
var KickStart=new function(){
var _11fe=false;
var _11ff=false;
var _1200=null;
var _1201=false;
var _1202=Client.qualifies();
var _1203="admin";
var _1204="123456";
this.fireOnLoad=function(){
if(_1202){
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
this.handleBroadcast=function(_1205){
switch(_1205){
case BroadcastMessages.AUDIO_INITIALIZED:
case BroadcastMessages.PERSISTANCE_INITIALIZED:
kickStart(_1205);
break;
case BroadcastMessages.APPLICATION_STARTUP:
break;
case BroadcastMessages.KEY_ENTER:
this.login();
break;
case BroadcastMessages.APPLICATION_LOGIN:
var _1206=window.bindingMap.appwindow;
_1206.setURL("app.aspx");
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
function fileEventBroadcasterSubscriptions(_1207){
new List([BroadcastMessages.AUDIO_INITIALIZED,BroadcastMessages.PERSISTANCE_INITIALIZED,BroadcastMessages.APPLICATION_STARTUP,BroadcastMessages.APPLICATION_LOGIN,BroadcastMessages.APPLICATION_OPERATIONAL]).each(function(_1208){
if(_1207){
EventBroadcaster.subscribe(_1208,KickStart);
}else{
EventBroadcaster.unsubscribe(_1208,KickStart);
}
});
}
function kickStart(_1209){
switch(_1209){
case BroadcastMessages.AUDIO_INITIALIZED:
_11ff=true;
setTimeout(function(){
Persistance.initialize();
},0);
break;
case BroadcastMessages.PERSISTANCE_INITIALIZED:
_11fe=true;
break;
}
if(_11fe&&_11ff){
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
DataManager.getDataBinding("username").setValue(_1203);
DataManager.getDataBinding("password").setValue(_1204);
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
this.doLogin=function(_120c,_120d){
var _120e=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _120f=false;
var _1210=LoginService.ValidateAndLogin(_120c,_120d);
if(_1210 instanceof SOAPFault){
alert(_1210.getFaultString());
}else{
_120f=_1210;
}
if(_120f){
EventBroadcaster.unsubscribe(BroadcastMessages.KEY_ENTER,KickStart);
accessGranted();
}else{
Application.unlock(KickStart);
if(bindingMap.decks!=null){
accesssDenied();
}
}
WebServiceProxy.isFaultHandler=true;
if(_120e){
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
var _1211=DataManager.getDataBinding("username");
var _1212=DataManager.getDataBinding("password");
_1211.blur();
_1212.blur();
_1211.setValue("");
_1212.setValue("");
_1211.clean();
_1212.clean();
_1211.focus();
document.getElementById("loginerror").style.display="block";
var _1213={handleAction:function(_1214){
document.getElementById("loginerror").style.display="none";
_1214.target.removeActionListener(Binding.ACTION_DIRTY,_1213);
}};
bindingMap.loginfields.addActionListener(Binding.ACTION_DIRTY,_1213);
}
WindowManager.fireOnLoad(this);
if(!_1202){
UpdateManager.isEnabled=false;
}
};

