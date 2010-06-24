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
_BroadcastMessages.prototype={APPLICATION_STARTUP:"application startup",APPLICATION_LOGIN:"application login",APPLICATION_LOGOUT:"application logout",APPLICATION_OPERATIONAL:"application operational",APPLICATION_ONSHUTDOWN:"application onshutdown",APPLICATION_SHUTDOWN:"application shutdown",APPLICATION_ERROR:"application error",APPLICATION_BLURRED:"application blurred",APPLICATION_FOCUSED:"application focused",APPLICATION_KICKSTART:"application kickstart",MOUSEEVENT_MOUSEDOWN:"mouseevent mousedown",MOUSEEVENT_MOUSEUP:"mouseevent mouseup",MOUSEEVENT_MOUSEMOVE:"mouseevent mousemove",$WINKEY_LOADED:"${windowkey} loaded",$WINKEY_UNLOADED:"${windowkey} unloaded",$WINKEY_EVALUATED:"${windowkey} evaluated",$WINKEY_RESIZED:"${windowkey} resized",$WINKEY_HRESIZED:"${windowkey} horizontally resized",$WINKEY_VRESIZED:"${windowkey} vertically resized",LOADED_NAVIGATOR:"navigator loaded",LOADED_MAINSTAGE:"mainstage loaded",LOCALSTORE_INITIALIZED:"localstore initialized",PERSISTANCE_INITIALIZED:"persistance initialized",AUDIO_INITIALIZED:"audio initialized",STAGE_INITIALIZED:"stage initialized",KEY_SHIFT_DOWN:"shiftkeydown",KEY_SHIFT_UP:"shiftkeyup",KEY_CONTROL_DOWN:"controlkeydown",KEY_CONTROL_UP:"controlkeyup",KEY_ARROW:"arrowkey",KEY_ENTER:"enterkeydown",KEY_ESCAPE:"escapekeydown",KEY_SPACE:"spacekeydown",KEY_TAB:"tabkeydown",KEY_ALT:"altkeydown",KEY_CONTROLTAB:"controltabkeysdown",TYPEDRAG_START:"typedrag start",TYPEDRAG_STOP:"typedrag stop",TYPEDRAG_PAUSE:"typedrag pause",DOCK_MAXIMIZED:"dockmaximized",DOCK_MINIMIZED:"dockminimized",DOCK_NORMALIZED:"docknormalized",DOCKTABBINDING_SELECT:"docktab select",SYSTEMTREEBINDING_REFRESH:"systemtree refresh",SYSTEMTREEBINDING_REFRESHALL:"systemtree refresh all",SYSTEMTREEBINDING_REFRESHING:"systemtree refreshing",SYSTEMTREEBINDING_REFRESHED:"systemtree refreshed",SYSTEMTREEBINDING_CUT:"systemtree cut",SYSTEMTREEBINDING_COPY:"systemtree copy",SYSTEMTREEBINDING_PASTE:"systemtree paste",SYSTEMTREEBINDING_COLLAPSEALL:"systemtree collapse all",SYSTEMTREENODEBINDING_FOCUS:"systemtreenode focus",SYSTEMTREEBINDING_LOCKTOEDITOR:"systemtreenode lock to editor",SYSTEMTREENODEBINDING_FORCE_OPEN:"systemtreenode force open",SYSTEMTREENODEBINDING_FORCING_OPEN:"systemtreenode forcing open",SYSTEMTREENODEBINDING_FORCED_OPEN:"systemtreenode forced open",START_COMPOSITE:"startcomposite",STOP_COMPOSITE:"stopcomposite",COMPOSITE_START:"compositestart",COMPOSITE_STOP:"compositestop",VIEW_OPENING:"view opening",VIEW_OPENED:"view opened",VIEW_COMPLETED:"view completed",CLOSE_VIEW:"close view",CLOSE_VIEWS:"close views",VIEW_CLOSED:"view closed",TINYMCE_INITIALIZED:"tinymce initialized",CODEPRESS_INITIALIZED:"codepress initialized",VISUALEDITOR_FOCUSED:"visualeditor focused",VISUALEDITOR_BLURRED:"visualditor blurred",VISUALEDITOR_HACKED:"visualeditor hacked",PERSPECTIVE_CHANGED:"perspective changed",SYSTEMLOG_OPENED:"systemlog opened",SYSTEMLOG_CLOSED:"systemlog closed",SYSTEMACTION_INVOKE:"systemaction invoke",SYSTEMACTION_INVOKED:"systemaction invoked",SYSTEM_ACTIONPROFILE_PUBLISHED:"system actionprofile published",NAVIGATOR_TREENODE_SELECTED:"navigator treenode selected",MODAL_DIALOG_OPENED:"modal dialog invoked",MODAL_DIALOG_CLOSED:"modal dialog closed",COVERBINDING_MOUSEDOWN:"userinterfacecoverbinding mousedown",SERVER_OFFLINE:"server offline",SERVER_ONLINE:"server online",OFFLINE_FLASH_INITIALIZED:"offline flash initialized",CLOSE_CURRENT:"close current",CLOSE_ALL:"close all",CLOSE_ALL_DONE:"close all done",SAVE_CURRENT:"save current",CURRENT_SAVED:"current saved",SAVE_ALL:"save all",SAVE_ALL_DONE:"save all done",DOCKTAB_DIRTY:"docktab dirty",DOCKTAB_CLEAN:"docktab clean",BINDING_RELATE:"binding relate",LOCALIZATION_CHANGED:"localization changed",XHTML_MARKUP_ON:"xhtml markup on",XHTML_MARKUP_OFF:"xhtml markup off",XHTML_MARKUP_ACTIVATE:"xhtml markup activate",XHTML_MARKUP_DEACTIVATE:"xhtml markup deactivate",HIGHLIGHT_KEYWORDS:"highlight keywords",BIND_TOKEN_TO_VIEW:"bind entitytoken to view",STAGEDIALOG_OPENED:"stage dialog opened",INVOKE_DEFAULT_ACTION:"invoke default action",LANGUAGES_UPDATED:"LocalesUpdated",FROMLANGUAGE_UPDATED:"ForeignLocaleChanged",TOLANGUAGE_UPDATED:"ActiveLocaleChanged",MESSAGEQUEUE_REQUESTED:"messagequeue requested",MESSAGEQUEUE_EVALUATED:"messagequeue evaluated",UPDATE_LANGUAGES:"update languages"};
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
_Constants.prototype={COMPOSITE_HOME:"http://www.composite.net",DUMMY_LINK:"javascript:void(false);",APPROOT:temproot,TEMPLATESROOT:temproot+"/templates",SKINROOT:temproot+"/skins/system",TINYMCEROOT:temproot+"/content/misc/editors/wysiwygeditor/tiny_mce",TINYROOT:temproot+"/content/misc/editors/visualeditor/tiny_mce",URL_WSDL_CONFIGURATION:temproot+"/services/Configuration/ConfigurationService.asmx?WSDL",URL_WSDL_LOGINSERVICE:temproot+"/services/Login/Login.asmx?WSDL",URL_WSDL_LICENSINGSERVICE:temproot+"/services/Licensing/Licensing.asmx?WSDL",URL_WSDL_MESSAGEQUEUE:temproot+"/services/ConsoleMessageQueue/ConsoleMessageQueueServices.asmx?WSDL",URL_WSDL_EDITORCONFIG:temproot+"/services/WysiwygEditor/ConfigurationServices.asmx?WSDL",URL_WSDL_FLOWCONTROLLER:temproot+"/services/FlowController/FlowControllerServices.asmx?WSDL",URL_WSDL_STRINGSERVICE:temproot+"/services/StringResource/StringService.asmx?WSDL",URL_WSDL_TREESERVICE:temproot+"/services/Tree/TreeServices.asmx?WSDL",URL_WSDL_XHTMLTRANSFORM:temproot+"/services/WysiwygEditor/XhtmlTransformations.asmx?WSDL",URL_WSDL_SECURITYSERVICE:temproot+"/services/Tree/SecurityServices.asmx?WSDL",URL_WSDL_READYSERVICE:temproot+"/services/Ready/ReadyService.asmx?WSDL",URL_WSDL_LOCALIZATION:temproot+"/services/Localization/LocalizationService.asmx?WSDL",URL_WSDL_SOURCEVALIDATION:temproot+"/services/SourceEditor/SourceValidationService.asmx?WSDL",URL_WSDL_MARKUPFORMAT:temproot+"/services/SourceEditor/MarkupFormatService.asmx?WSDL",URL_WSDL_SEOSERVICE:temproot+"/services/SearchEngineOptimizationKeyword/SearchEngineOptimizationKeyword.asmx?WSDL",URL_WSDL_PAGESERVICE:temproot+"/services/Page/PageService.asmx?WSDL",URL_WSDL_DIFFSERVICE:temproot+"/services/StringResource/DiffService.asmx?WSDL",NS_XHTML:"http://www.w3.org/1999/xhtml",NS_UI:"http://www.w3.org/1999/xhtml",NX_XUL:"http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",NS_XBL:"http://www.mozilla.org/xbl",NS_WSDL:"http://schemas.xmlsoap.org/wsdl/",NS_SOAP:"http://schemas.xmlsoap.org/wsdl/soap/",NS_ENVELOPE:"http://schemas.xmlsoap.org/soap/envelope/",NS_ENCODING:"http://schemas.xmlsoap.org/soap/encoding/",NS_SCHEMA:"http://www.w3.org/2001/XMLSchema",NS_SCHEMA_INSTANCE:"http://www.w3.org/1999/XMLSchema-instance",NS_DOMPARSEERROR:"http://www.mozilla.org/newlayout/xml/parsererror.xml",NS_NS:"http://www.w3.org/2000/xmlns/",NS_PERSISTANCE:"http://www.composite.net/ns/localstore/persistance",NS_FUNCTION:"http://www.composite.net/ns/function/1.0",SCROLLBAR_DIMENSION_HARDCODED_VALUE:19};
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
_DOMEvents.prototype={_logger:SystemLogger.getLogger("DOMEvents"),MOUSEDOWN:"mousedown",MOUSEUP:"mouseup",MOUSEOVER:"mouseover",MOUSEOUT:"mouseout",MOUSEMOVE:"mousemove",CLICK:"click",DOUBLECLICK:"dblclick",KEYPRESS:"keypress",KEYDOWN:"keydown",KEYUP:"keyup",CONTEXTMENU:"contextmenu",SCROLL:"scroll",LOAD:"load",BEFOREUNLOAD:"beforeunload",UNLOAD:"unload",RESIZE:"resize",FOCUS:"focus",BLUR:"blur",SUBMIT:"submit",CUT:"cut",COPY:"copy",PASTE:"paste",DOM:"DOMContentLoaded",ACTIVATE:"activate",DEACTIVATE:"deactivate",MOUSEENTER:"mouseenter",MOUSELEAVE:"mouseleave",SELECTSTART:"selectstart",BEFOREUPDATE:"beforeupdate",AFTERUPDATE:"afterupdate",ERRORUPDATE:"errorupdate",_count:0,addEventListener:function(_fe,_ff,_100,_101){
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
this.getRootNode=function(){
if(root==null){
root=new SystemNode(TreeService.GetRootElements("")[0]);
}
return root;
};
this.getPerspectiveNodes=function(){
var _1e5=new List();
var _1e6=TreeService.GetActivePerspectiveElements("dummy");
new List(_1e6).each(function(_1e7){
_1e5.add(new SystemNode(_1e7));
});
return _1e5;
};
this.getChildNodes=function(node,_1e9){
var _1ea=new List();
var _1eb=null;
if(_1e9){
if(SearchTokens.hasToken(_1e9)){
_1e9=SearchTokens.getToken(_1e9);
}
_1eb=TreeService.GetElementsBySearchToken(node.getData(),_1e9);
}else{
_1eb=TreeService.GetElements(node.getData());
}
new List(_1eb).each(function(_1ec){
var _1ed=new SystemNode(_1ec);
if(_1e9){
_1ed.searchToken=_1e9;
}
_1ea.add(_1ed);
});
return _1ea;
};
this.getDescendantBranch=function(_1ee){
var map=new Map();
var arg=[];
_1ee.each(function(node){
arg.push({ProviderName:node.getProviderName(),EntityToken:node.getEntityToken(),Piggybag:node.getPiggyBag()});
});
var _1f2=TreeService.GetMultipleChildren(arg);
var _1f3=new List(_1f2);
while(_1f3.hasNext()){
this._listNodesInMap(_1f3.getNext(),map);
}
return map;
};
this.getInvisibleBranch=function(_1f4,_1f5,_1f6){
var map=new Map();
var arg=[];
_1f6.each(function(node){
arg.push({ProviderName:node.getProviderName(),EntityToken:node.getEntityToken(),Piggybag:node.getPiggyBag()});
});
var _1fa=TreeService.FindEntityToken(_1f4,_1f5,arg);
if(_1fa instanceof SOAPFault){
_1e3.error(_1fa.getFaultString());
if(Application.isDeveloperMode){
alert(_1fa.getFaultString());
}
map=null;
}else{
var _1fb=new List(_1fa);
while(_1fb.hasNext()){
this._listNodesInMap(_1fb.getNext(),map);
}
}
return map;
};
this._listNodesInMap=function(_1fc,map){
var list=new List();
var key=_1fc.ElementKey;
var _200=new List(_1fc.ClientElements);
map.set(key,list);
while(_200.hasNext()){
var _201=_200.getNext();
list.add(new SystemNode(_201));
}
};
this.getChildNodesBySearchToken=function(node,_203){
return this.getChildNodes(node,_203);
};
this.getNamedRoots=function(key,_205){
var _206=new List();
var _207=null;
if(_205){
if(SearchTokens.hasToken(_205)){
_205=SearchTokens.getToken(_205);
}
_207=TreeService.GetNamedRootsBySearchToken(key,_205);
}else{
_207=TreeService.GetNamedRoots(key);
}
new List(_207).each(function(_208){
var node=new SystemNode(_208);
if(_205){
node.searchToken=_205;
}
_206.add(node);
});
return _206;
};
this.getNamedRootsBySearchToken=function(key,_20b){
return this.getNamedRoots(key,_20b);
};
function compileActionList(node,_20d,_20e){
var _20f=_20d.ClientElementActionGroupId;
if(_20f!=null){
var _210=_20e.get(_20f).ClientElementActionGroupItems;
if(_210&&_210.length>0){
node.setActionList(new List(_210));
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
new List(self._data.Actions).each(function(_216){
var _217=_216.ActionCategory.Name;
if(SystemAction.hasCategory(_217)){
var _218=new SystemAction(_216);
SystemAction.actionMap.set(_216.ActionKey,_218);
}else{
throw "No such action category: "+_217;
}
});
}
});
};
SystemNode.prototype.getData=function(){
return this._data;
};
SystemNode.prototype.getChildren=function(){
var _219=null;
if(this.searchToken){
_219=System.getChildNodesBySearchToken(this,this.searchToken);
}else{
_219=System.getChildNodes(this);
}
return _219;
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
var _21b=this._data.Piggybag;
if(_21b==null){
_21b="";
}
return _21b;
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
var _21d=null;
if(typeof this._data.ToolTip!="undefined"){
_21d=this._data.ToolTip;
}
return _21d;
};
SystemNode.prototype.getPropertyBag=function(){
if(!this._propertyBag&&this._data.PropertyBag&&this._data.PropertyBag.length!=0){
var map={};
new List(this._data.PropertyBag).each(function(_21f){
map[_21f.Key]=_21f.Value;
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
var _223=SystemAction.actionMap.get(key);
var _224=true;
if(_223.getCategory()==SystemAction.categories.DeveloperMode){
if(!Application.isDeveloperMode){
_224=false;
}
}
if(_224){
var id=_223.getGroupID();
if(!map.has(id)){
map.set(id,new List());
}
var list=map.get(id);
list.add(_223);
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
SystemAction.invoke=function(_227,arg){
var node=arg;
if(node instanceof SystemNode){
Application.lock(SystemAction);
_227.logger.debug("Execute \""+_227.getLabel()+"\" on \""+node.getLabel()+"\".");
setTimeout(function(){
TreeService.ExecuteSingleElementAction(node.getData(),_227.getHandle(),Application.CONSOLE_ID);
MessageQueue.update();
Application.unlock(SystemAction);
},0);
}else{
throw "Multiple actiontargets not supported.";
}
};
SystemAction.invokeTagged=function(_22a,_22b){
action=SystemAction.taggedActions.get(_22a);
node=SystemNode.taggedNodes.get(_22b);
SystemAction.invoke(action,node);
};
SystemAction.hasCategory=function(_22c){
return SystemAction.categories[_22c]?true:false;
};
function SystemAction(_22d){
this.logger=SystemLogger.getLogger("SystemAction");
this._data=_22d;
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
var _22e=null;
if(this.isInFolder()){
_22e=this._data.ActionCategory.FolderName;
}
return _22e;
};
SystemAction.prototype.isDisabled=function(){
return this._data.Disabled;
};
SystemAction.prototype.isCheckBox=function(){
return typeof this._data.CheckboxStatus!=Types.UNDEFINED;
};
SystemAction.prototype.getTag=function(){
var _22f=null;
if(typeof this._data.TagValue!="undefined"){
_22f=this._data.TagValue;
}
return _22f;
};
SystemAction.prototype.isChecked=function(){
var _230=null;
if(this.isCheckBox()){
_230=this._data.CheckboxStatus=="Checked";
}else{
throw "Not a checkbox!";
}
return _230;
};
function _UpdateManager(){
var _231=null;
if(!window.UpdateManager){
this._construct();
_231=this;
}
return _231;
}
_UpdateManager.prototype={version:"0.1",CLASSNAME_FORM:"updateform",CLASSNAME_ZONE:"updatezone",CLASSNAME_GONE:"updategone",EVENT_BEFOREUPDATE:"beforeupdate",EVENT_AFTERUPDATE:"afterupdate",EVENT_ERRORUPDATE:"errorupdate",xhtml:null,summary:null,isEnabled:true,isDebugging:false,isUpdating:false,hasSoftAttributes:false,hasSoftSiblings:false,pendingResponse:null,currentDOM:null,errormessage:null,_assistant:null,_updates:null,_replaced:null,_dotnetnames:["__VIEWSTATE","__EVENTVALIDATION","__EVENTTARGET","__EVENTARGUMENT","__LASTFOCUS"],plugins:[],toString:function(){
return "[object UpdateManager]";
},_construct:function(_232){
var root=document.documentElement;
var _234=root.namespaceURI;
if(_234==null){
_234=new String(root.getAttribute("xmlns"));
}
if(_234=="http://www.w3.org/1999/xhtml"){
this._addListener(window,"load");
}else{
this.error("Not an XHTML document!");
}
},_setup:function(){
this.setupForms();
if(this.xhtml!=null){
if(typeof this.xhtml=="string"){
var _235=decodeURIComponent(this.xhtml);
this.currentDOM=UpdateAssistant.parse(_235);
}else{
throw new TypeError();
}
}else{
var _236=this;
UpdateAssistant.getXMLHttpRequest("get",window.location.toString(),{handleResponse:function(dom){
_236.currentDOM=dom;
}}).send(null);
}
},setupForms:function(){
Array.forEach(document.forms,function(form){
if(form.className.indexOf(this.CLASSNAME_FORM)>-1){
if(!form.__isSetup){
this._setupForm(form);
form.__isSetup=true;
}
}
},this);
},_setupForm:function(form){
var _23a=this;
this._addListener(form,"submit");
form.__submit=form.submit;
form.submit=function(){
if(_23a.isEnabled){
_23a._submit(form);
}else{
form.__submit();
}
return false;
};
},_addListener:function(_23b,type){
if(_23b.addEventListener!=null){
_23b.addEventListener(type,this,false);
}else{
var _23d=this;
_23b.attachEvent("on"+type,function(){
_23d.handleEvent(window.event);
});
}
},handleEvent:function(e){
switch(e.type){
case "load":
this._setup();
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
this.summary=new String("");
this.errors=new String("");
if(dom!=null){
var _242=UpdateAssistant.getUpdateZones(dom);
var _243=UpdateAssistant.getUpdateZones(this.currentDOM);
this._updates=[];
this._replaced={};
_242.forEach(function(_244,_245){
var _246=_243[_245];
this._crawl(_244,_246);
},this);
this._updates.forEach(function(_247,_248){
_247.update();
_247.dispose();
},this);
this._dotnetnames.forEach(function(name){
this._fixdotnet(dom,name);
},this);
this.currentDOM=dom;
}
this.isUpdating=false;
UpdateAssistant.dispatchEvent(document.documentElement,this.EVENT_AFTERUPDATE);
},handleSimilarResponse:function(){
UpdateAssistant.dispatchEvent(document.documentElement,this.EVENT_AFTERUPDATE);
},_crawl:function(_24a,_24b,_24c,id){
var _24e=true;
var _24f=_24b.getAttribute("class");
if(_24f==null||_24f.indexOf(this.CLASSNAME_GONE)==-1){
if(_24b.nodeType==Node.ELEMENT_NODE){
var _250=_24b.getAttribute("id");
if(_250!=null){
_24c=_24a;
id=_250;
}
}
if(_24e=this._check(_24a,_24b,_24c,id)){
var _251=_24a.firstChild;
var _252=_24b.firstChild;
while(_251!=null&&_252!=null&&!this._replaced[id]){
switch(_251.nodeType){
case Node.TEXT_NODE:
_24e=this._check(_251,_252,_24c,id);
break;
case Node.DOCUMENT_NODE:
case Node.ELEMENT_NODE:
_24e=this._crawl(_251,_252,_24c,id);
break;
}
if(this._replaced[id]){
_24e=false;
}else{
_251=_251.nextSibling;
_252=_252.nextSibling;
}
}
}
}
return _24e;
},_check:function(_253,_254,_255,id){
var _257=true;
var _258=null;
var _259=false;
var _25a=false;
if((_253!=null&&_254==null)||(_253==null&&_254!=null)){
_257=false;
}else{
if(_257=_253.nodeType==_254.nodeType){
switch(_254.nodeType){
case Node.ELEMENT_NODE:
if(_253.namespaceURI!=_254.namespaceURI||_253.nodeName!=_254.nodeName){
_257=false;
}else{
if(_257=(_253.nodeName==_254.nodeName)){
var _25b=_254.getAttribute("id");
var _25c=_253.getAttribute("id");
if(_25b!=null&&_25c!=null){
if(_25b!=_25c){
_257=false;
}else{
if((_258=this._getPlugin(_253,_254))!=null){
if(_258.updateElement(_253,_254)){
_25a=true;
_257=false;
}
}
}
}
if(_257){
if(_257=this._checkAttributes(_253,_254)){
if(this.hasSoftSiblings&&this._hasSoftChildren(_253)&&this._hasSoftChildren(_254)){
if(this._validateSoftChildren(_253,_254)){
this._updateSoftChildren(_253,_254);
_259=true;
}
_257=false;
}else{
_257=_253.childNodes.length==_254.childNodes.length;
}
}
}
}
}
break;
case Node.TEXT_NODE:
if(_253.data.trim()!=_254.data.trim()){
_257=false;
}
break;
}
}
}
if(_257==false&&!_259&&!_25a){
if(id!=null&&_255!=null){
this.addUpdate(new ReplaceUpdate(id,_255));
}
}
return _257;
},_checkAttributes:function(_25d,_25e){
var _25f=true;
var _260=false;
var _261=_25d.attributes;
var _262=_25e.attributes;
if(_261.length!=_262.length){
_260=true;
}else{
_260=!Array.every(_261,function(att1,i){
var att2=_262.item(i);
return att1.nodeName==att2.nodeName&&att1.nodeValue==att2.nodeValue;
});
}
if(_260){
var _266=_25d.getAttribute("id");
var _267=_25e.getAttribute("id");
if(this.hasSoftAttributes&&_266!=null&&_266==_267){
this.addUpdate(new AttributesUpdate(_267,_25d,_25e));
}else{
_25f=false;
}
}
return _25f;
},_hasSoftChildren:function(_268){
var _269=true;
if(_268.hasChildNodes()){
_269=Array.every(_268.childNodes,function(node){
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
return _269;
},_validateSoftChildren:function(_26c,_26d){
var _26e=true;
var _26f=-1;
var _270=-1;
var _271=-1;
var news=this._toMap(_26c.childNodes,true);
var olds=this._toMap(_26d.childNodes,true);
for(var id in olds){
if(_26e){
var _275=olds[id];
_26e=_275>=_26f;
if(news[id]!=null){
_271=news[id];
_26e=_271>=_270;
}
}
_26f=_275;
if(_271>-1){
_270=_271;
}
}
return _26e;
},_updateSoftChildren:function(_276,_277){
var news=this._toMap(_276.childNodes);
var olds=this._toMap(_277.childNodes);
for(var id in olds){
if(news[id]==null){
this.addUpdate(new SiblingUpdate(Update.TYPE_REMOVE,id,null,null));
}else{
this._crawl(news[id],olds[id]);
}
}
var _27b=null;
for(id in news){
if(olds[id]==null){
var _27c=news[id];
if(_27b==null){
var _27d=_277.getAttribute("id");
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_27d,_27c,true));
}else{
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_27b,_27c,false));
}
}
_27b=id;
}
},addUpdate:function(_27e){
this._updates.push(_27e);
if(_27e instanceof ReplaceUpdate){
this._replaced[_27e.id]=true;
}
},_getPlugin:function(_27f,_280){
var _281=null;
this.plugins.every(function(_282){
if(_282.handleElement(_27f,_280)){
_281=_282;
}
return _281==null;
});
return _281;
},_toMap:function(_283,_284){
var _285={};
Array.forEach(_283,function(node,_287){
if(node.nodeType==Node.ELEMENT_NODE){
_285[node.getAttribute("id")]=_284?_287:node;
}
});
return _285;
},_getPost:function(form){
var _289=new String("");
if(form!=null){
var last="";
Array.forEach(form.elements,function(_28b){
var name=_28b.name;
var _28d=encodeURIComponent(_28b.value);
switch(_28b.type){
case "button":
case "submit":
var _28e=UpdateAssistant.getActiveElement();
if(_28b==_28e&&name!=""){
_289+=name+"="+_28d+"&";
}
break;
case "radio":
if(_28b.checked){
_289+=name+"="+_28d+"&";
}
break;
case "checkbox":
if(_28b.checked){
if(_28b.name==last){
if(_289.lastIndexOf("&")==_289.length-1){
_289=_289.substr(0,_289.length-1);
}
_289+=","+_28d;
}else{
_289+=name+"="+_28b.value;
}
last=name;
_289+="&";
}
break;
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_289+=name+"="+_28d+"&";
break;
}
});
}
return _289.substr(0,_289.length-1);
},_postRequest:function(form){
var _290=form.method!=""?form.method:"get";
var _291=form.action!=""?form.action:window.location.toString();
var _292=this._getPost(form);
if(_290=="get"){
if(_291.indexOf("?")>-1){
_291=_291+"&"+_292;
}else{
_291+"?"+_292;
}
}
var _293=this;
var _294=UpdateAssistant.getXMLHttpRequest(_290,_291,this);
if(_290=="post"){
_294.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
}
_294.send(_290=="post"?_292:null);
},_fixdotnet:function(dom,id){
var _297=document.getElementById(id);
if(_297!=null){
var _298=UpdateAssistant.getElementById(dom,id);
if(_298!=null){
var _299=_298.getAttribute("value");
if(_299!==_297.value){
_297.value=_299;
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
},report:function(_29c){
this.summary+=_29c+"\n";
}};
var UpdateManager=new _UpdateManager();
function _UpdateAssistant(){
var _29d=null;
if(!window.UpdateAssistant){
this._construct();
_29d=this;
}
return _29d;
}
_UpdateAssistant.prototype={_serializer:window.XMLSerializer!=null?new XMLSerializer():null,_parser:window.DOMParser!=null?new DOMParser():null,_activeElement:null,_construct:function(){
if(!window.Node){
window.Node={ELEMENT_NODE:1,TEXT_NODE:3,DOCUMENT_NODE:9};
}
if(!Array.every){
Array.every=function(_29e,fun){
var _2a0=true;
var len=_29e.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2a2=arguments[2];
for(var i=0;i<len;i++){
if(typeof _29e[i]!="undefined"){
if(!fun.call(_2a2,_29e[i],i,_29e)){
_2a0=false;
break;
}
}
}
}
return _2a0;
};
}
if(!Array.prototype.every){
Array.prototype.every=function(fun){
var _2a5=arguments[1];
return Array.every(this,fun,_2a5);
};
}
if(!Array.forEach){
Array.forEach=function(_2a6,fun){
var len=_2a6.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2a9=arguments[2];
for(var i=0;i<len;i++){
if(typeof _2a6[i]!="undefined"){
fun.call(_2a9,_2a6[i],i,_2a6);
}
}
}
};
}
if(!Array.prototype.forEach){
Array.prototype.forEach=function(fun){
var _2ac=arguments[1];
Array.forEach(this,fun,_2ac);
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
},getXMLHttpRequest:function(_2ae,_2af,_2b0){
var _2b1=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Msxml2.XMLHTTP.3.0");
if(_2b1!=null){
_2b1.open(_2ae,_2af,(_2b0!=null?true:false));
if(_2b0!=null){
var _2b2=this;
_2b1.onreadystatechange=function(){
if(_2b1.readyState==4){
var text=_2b1.responseText;
UpdateManager.pendingResponse=text;
var dom=_2b2.parse(text);
if(dom!=null){
_2b0.handleResponse(dom);
}
}
};
}
}
return _2b1;
},dispatchEvent:function(_2b5,name){
var _2b7=true;
if(_2b5.fireEvent!=null){
_2b7=_2b5.fireEvent("on"+name);
}else{
var _2b8=document.createEvent("UIEvents");
_2b8.initEvent(name,true,true);
_2b7=_2b5.dispatchEvent(_2b8);
}
return _2b7;
},getUpdateZones:function(dom){
var _2ba="//*[@id and contains(@class,'updatezone')]";
var _2bb=[];
var _2bc=null;
var _2bd=null;
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2bc=dom.evaluate(_2ba,dom,null,type,null);
while((_2bd=_2bc.iterateNext())!=null){
_2bb.push(_2bd);
}
}else{
_2bc=dom.documentElement.selectNodes(_2ba);
Array.forEach(_2bc,function(_2bf){
_2bb.push(_2bf);
});
}
return _2bb;
},getElementById:function(dom,id){
var _2c2="//*[@id='"+id+"']";
var _2c3=null;
var _2c4=null;
if(window.XPathResult!=null){
var type=XPathResult.FIRST_ORDERED_NODE_TYPE;
_2c3=dom.evaluate(_2c2,dom,null,type,null);
_2c4=_2c3.singleNodeValue;
}else{
_2c4=dom.documentElement.selectNodes(_2c2)[0];
}
return _2c4;
},_getIds:function(dom){
var _2c7="//*[@id]";
var _2c8=null;
var _2c9=[];
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2c8=dom.evaluate(_2c7,dom,null,type,null);
while((element=_2c8.iterateNext())!=null){
_2c9.push(element.getAttribute("id"));
}
}else{
_2c8=dom.documentElement.selectNodes(_2c7);
Array.forEach(_2c8,function(_2cb){
_2c9.push(_2cb.getAttribute("id"));
});
}
return _2c9;
},toHTMLElement:function(_2cc){
var _2cd=this.serialize(_2cc);
var temp=document.createElement("temp");
temp.innerHTML=_2cd;
return temp.firstChild;
},getActiveElement:function(){
var _2cf=document.activeElement;
if(_2cf==null||_2cf==document.body){
_2cf=this._activeElement;
}
return _2cf;
},serialize:function(_2d0){
var _2d1=null;
if(this._serializer!=null){
_2d1=this._serializer.serializeToString(_2d0);
}else{
_2d1=_2d0.xml;
}
return _2d1;
},hasDifferences:function(_2d2,_2d3){
var s1=null;
var s2=null;
if(this._serializer!=null){
s1=this._serializer.serializeToString(_2d2);
s2=this._serializer.serializeToString(_2d3);
}else{
s1=_2d2.xml;
s2=_2d3.xml;
}
return s1!=s2;
},parse:function(_2d6){
var _2d7=null;
if(this._parser!=null){
_2d7=this._parser.parseFromString(_2d6,"text/xml");
}else{
_2d7=new ActiveXObject("Msxml2.DOMDocument.3.0");
_2d7.setProperty("SelectionLanguage","XPath");
_2d7.loadXML(_2d6);
}
return this._validate(_2d7);
},_validate:function(dom){
var out=null;
if(dom.parseError!=null&&dom.parseError.errorCode!=0){
out=dom.parseError.reason;
}else{
var _2da=dom.getElementsByTagName("parsererror").item(0);
if(_2da!=null){
out=_2da.textContent.replace(/\^/g,"").replace(/\-/g,"");
}
}
if(out==null){
var has={},ids=this._getIds(dom);
ids.every(function(id){
var _2de=!has[id];
has[id]=true;
if(!_2de){
out="Element \""+id+"\" encountered twice.";
}
return _2de;
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
this.handleElement=function(_2df,_2e0){
var _2e1=false;
switch(_2df.nodeName.toLowerCase()){
case "input":
case "textarea":
switch(_2df.getAttribute("id")){
case "__EVENTTARGET":
case "__EVENTARGUMENT":
case "__VIEWSTATE":
case "__EVENTVALIDATION":
_2e1=false;
break;
}
break;
}
return _2e1;
};
this.updateElement=function(_2e2,_2e3){
var id=_2e2.getAttribute("id");
var _2e5=document.getElementById(id);
if(_2e5!=null){
var _2e6=null;
switch(_2e5.nodeName.toLowerCase()){
case "input":
_2e6=_2e2.getAttribute("value");
break;
case "textarea":
_2e6=_2e2.textContent?_2e2.textContent:_2e2.text;
break;
}
if(_2e6==null){
_2e6="";
}
if(_2e6!=_2e5.value){
_2e5.value=_2e6;
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
},_beforeUpdate:function(_2e7){
var _2e8=true;
if(_2e7!=null){
_2e7.__updateType=this.type;
_2e8=UpdateAssistant.dispatchEvent(_2e7,Update.EVENT_BEFOREUPDATE);
}
return _2e8;
},_afterUpdate:function(_2e9){
var _2ea=true;
if(_2e9!=null){
_2e9.__updateType=this.type;
_2ea=UpdateAssistant.dispatchEvent(_2e9,Update.EVENT_AFTERUPDATE);
}
return _2ea;
}};
ReplaceUpdate.prototype=new Update();
ReplaceUpdate.superclass=Update.prototype;
function ReplaceUpdate(id,_2ec){
this.type=Update.TYPE_REPLACE;
this.id=id;
this.element=_2ec;
return this;
}
ReplaceUpdate.prototype.update=function(){
var _2ed,_2ee,_2ef=UpdateAssistant.toHTMLElement(this.element);
if((_2ed=document.getElementById(this.id))!=null){
if((_2ee=_2ed.parentNode)!=null){
if(this._beforeUpdate(_2ed)){
_2ee.replaceChild(_2ef,_2ed);
this._afterUpdate(_2ef);
}
}
}else{
UpdateManager.error("Element null point: "+this.id);
}
};
ReplaceUpdate.prototype._afterUpdate=function(_2f0){
var _2f1=ReplaceUpdate.superclass._afterUpdate.call(this,_2f0);
UpdateManager.report("Replaced element id=\""+this.id+"\"");
if(_2f0.nodeName=="form"||_2f0.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
return _2f1;
};
SiblingUpdate.prototype=new Update();
SiblingUpdate.superclass=Update.prototype;
function SiblingUpdate(type,id,_2f4,_2f5){
this.type=type;
this.id=id;
this.element=_2f4;
this.isFirst=_2f5;
return this;
}
SiblingUpdate.prototype.update=function(){
var _2f6=document.getElementById(this.id);
switch(this.type){
case Update.TYPE_REMOVE:
this._remove(_2f6);
break;
case Update.TYPE_INSERT:
this._insert(this.element,_2f6);
break;
}
};
SiblingUpdate.prototype._remove=function(_2f7){
var _2f8=_2f7.parentNode;
if(_2f8!=null){
if(this._beforeUpdate(_2f7)){
_2f8.removeChild(_2f7);
this._afterUpdate(_2f8);
}
}
};
SiblingUpdate.prototype._insert=function(_2f9,_2fa){
var _2fb=UpdateAssistant.toHTMLElement(_2f9);
if(this.isFirst){
var _2fc=_2fa;
if(_2fc!=null){
if(this._beforeUpdate(_2fc)){
_2fc.insertBefore(_2fb,_2fc.firstChild);
this._afterUpdate(_2fb);
}
}
}else{
var _2fc=_2fa.parentNode;
if(_2fc!=null){
if(this._beforeUpdate(_2fc)){
_2fc.insertBefore(_2fb,_2fa.nextSibling);
this._afterUpdate(_2fb);
}
}
}
};
SiblingUpdate.prototype._beforeUpdate=function(_2fd){
var _2fe=SiblingUpdate.superclass._beforeUpdate.call(this,_2fd);
if(this.type==Update.TYPE_REMOVE){
UpdateManager.report("Removed element id=\""+_2fd.id+"\"");
}
return _2fe;
};
SiblingUpdate.prototype._afterUpdate=function(_2ff){
var _300=true;
if(_2ff!=null){
_300=SiblingUpdate.superclass._afterUpdate.call(this,_2ff);
if(this.type==Update.TYPE_INSERT){
UpdateManager.report("Inserted element id=\""+_2ff.id+"\"");
if(_2ff.nodeName=="form"||_2ff.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
}
}
return _300;
};
AttributesUpdate.prototype=new Update();
AttributesUpdate.superclass=Update.prototype;
AttributesUpdate.prototype.currentElement=null;
function AttributesUpdate(id,_302,_303){
this.type=type=Update.TYPE_ATTRIBUTES;
this.id=id;
this.element=_302;
this.currentElement=_303;
this._summary=[];
return this;
}
AttributesUpdate.prototype.update=function(){
var _304=document.getElementById(this.id);
if(this._beforeUpdate(_304)){
this._updateAttributes(_304);
this._afterUpdate(_304);
}
};
AttributesUpdate.prototype._updateAttributes=function(_305){
Array.forEach(this.element.attributes,function(_306){
var _307=this.currentElement.getAttribute(_306.nodeName);
if(_307==null||_307!=_306.nodeValue){
this._setAttribute(_305,_306.nodeName,_306.nodeValue);
this._summary.push("@"+_306.nodeName);
}
},this);
Array.forEach(this.currentElement.attributes,function(_308){
if(this.element.getAttribute(_308.nodeName)==null){
this._setAttribute(_305,_308.nodeName,null);
this._summary.push("@"+_308.nodeName);
}
},this);
};
AttributesUpdate.prototype._setAttribute=function(_309,name,_30b){
var _30c=(_30b==null);
if(_30c){
_309.removeAttribute(name);
}else{
_309.setAttribute(name,_30b);
}
if(document.all!=null){
if(_30c){
_30b="";
}
switch(name.toLowerCase()){
case "class":
_309.className=_30b;
break;
case "disabled":
_309.disabled=!_30c;
break;
case "checked":
_309.checked=!_30c;
break;
case "readonly":
_309.readOnly=!_30c;
break;
}
}
};
AttributesUpdate.prototype._afterUpdate=function(_30d){
AttributesUpdate.superclass._afterUpdate.call(this,_30d);
UpdateManager.report("Attributes updated on element id=\""+this.id+"\": "+this._summary.toString());
};
AttributesUpdate.prototype.dispose=function(){
Update.prototype.dispose.call(this);
this.currentElement=null;
};
if(!window.Node){
window.Node={ELEMENT_NODE:1,ATTRIBUTE_NODE:2,TEXT_NODE:3,CDATA_SECTION_NODE:4,ENTITY_REFERENCE_NODE:5,ENTITY_NODE:6,PROCESSING_INSTRUCTION_NODE:7,COMMENT_NODE:8,DOCUMENT_NODE:9,DOCUMENT_TYPE_NODE:10,DOCUMENT_FRAGMENT_NODE:11,NOTATION_NODE:12};
}
window.KeyEventCodes={VK_BACK:8,VK_TAB:9,VK_ENTER:13,VK_SHIFT:16,VK_CONTROL:17,VK_ALT:null,VK_ESCAPE:27,VK_SPACE:32,VK_PAGE_UP:33,VK_PAGE_DOWN:34,VK_END:35,VK_HOME:36,VK_LEFT:37,VK_UP:38,VK_RIGHT:39,VK_DOWN:40,VK_INSERT:null,VK_DELETE:127,VK_PLUS:187,VK_MINUS:189,VK_NUMPLUS:107,VK_NUMMINUS:109};
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
_WindowManager.prototype={WINDOW_LOADED_BROADCAST:null,WINDOW_UNLOADED_BROADCAST:null,WINDOW_EVALUATED_BROADCAST:null,WINDOW_RESIZED_BROADCAST:null,isWindowLoaded:false,_logger:SystemLogger.getLogger("WindowManager ["+document.title+"]"),_ondomstatements:new List(),_onloadstatements:new List(),_onresizestatements:new List(),_currentDimensions:null,_newDimensions:null,_broadcastTimeout:null,_isHorizontalResize:false,_isVerticalResize:false,_broadcastTimeout:null,_compute:function(_30e,key){
return _30e.replace("${windowkey}",document.location+":"+key);
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
var _312=this._newDimensions.w!=this._currentDimensions.w;
var _313=this._newDimensions.h!=this._currentDimensions.h;
if(_312||_313){
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
},fireOnDOM:function(_315){
if(Interfaces.isImplemented(IDOMHandler,_315,true)){
this._ondomstatements.add(_315);
}
},fireOnLoad:function(_316){
if(Interfaces.isImplemented(ILoadHandler,_316,true)){
this._onloadstatements.add(_316);
}
},fireOnResize:function(_317){
if(Interfaces.isImplemented(IResizeHandler,_317,true)){
this._onresizestatements.add(_317);
}
},onDOMContentLoaded:function(){
while(this._ondomstatements.hasNext()){
this._ondomstatements.getNext().fireOnDOM();
}
},getWindowDimensions:function(){
return new Dimension(Client.isMozilla?window.innerWidth:document.body.clientWidth,Client.isMozilla?window.innerHeight:document.body.clientHeight);
},evaluate:function(_318){
return eval(_318);
}};
var WindowManager=new _WindowManager();
top.app=null;
function _Application(){
this._construct();
}
_Application.prototype={CONSOLE_ID:KeyMaster.getUniqueKey(),logger:SystemLogger.getLogger("Application"),timer:SystemTimer.getTimer("Application"),isDeveloperMode:false,isLocalHost:false,hasExternalConnection:false,isLoggedIn:false,isLoggedOut:false,isLocked:false,hasStartPage:true,isMalFunctional:false,isOperational:false,isShuttingDown:false,isOffLine:false,_isMousePositionTracking:false,_mousePosition:null,_cursorStartPoint:null,_isDragging:false,_isShutDownAllowed:true,_lockers:0,_isRegistered:null,_activeBinding:null,_activatedBindings:new List(),_dirtyTabs:new Map(),_topLevelClasses:typeof topLevelClassNames!="undefined"?new List(topLevelClassNames):null,_construct:function(){
EventBroadcaster.subscribe(WindowManager.WINDOW_EVALUATED_BROADCAST,{handleBroadcast:function(){
try{
Application.initialize();
}
catch(exception){
SystemDebug.stack(arguments);
throw (exception);
}
}});
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMLOG_OPENED,{handleBroadcast:function(_319,_31a){
SystemLogger.unsuspend(_31a);
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
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_DIRTY,{handleBroadcast:function(_31b,arg){
var list=Application._dirtyTabs;
list.set(arg.key,arg);
if(list.countEntries()==1){
var _31e=top.app.bindingMap.broadcasterHasDirtyTabs;
_31e.enable();
}
}});
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,{handleBroadcast:function(_31f,arg){
var list=Application._dirtyTabs;
list.del(arg.key);
if(list.countEntries()==0){
var _322=top.app.bindingMap.broadcasterHasDirtyTabs;
_322.disable();
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
var _323=false;
if(this.isLoggedIn){
this.isLoggedIn=false;
this.isLoggedOut=true;
_323=LoginService.Logout(true);
if(!_323){
alert("Logout failed.");
}
}
return _323;
},lock:function(_324){
if(_324!=null){
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
},unlock:function(_325,_326){
if(_325!=null){
if(top.bindingMap.mastercover!=null){
if(_326||this._lockers>0){
if(_326){
this._lockers=0;
this.logger.debug("Interface unlocked by "+_325);
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
},activate:function(_327){
var _328=this._activeBinding;
this._activeBinding=_327;
this._activatedBindings.add(_327);
if(_328&&_328.isActive){
_328.deActivate();
}
},deActivate:function(_329){
var _32a=null;
var _32b=null;
if(_329==this._activeBinding){
while(!_32b&&this._activatedBindings.hasEntries()){
_32a=this._activatedBindings.extractLast();
if(_32a!=_329&&_32a.isActivatable){
_32b=_32a;
}
}
if(!_32b){
_32b=app.bindingMap.explorerdock;
}
_32b.activate();
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
if(win){
if(!win.standardEventHandler){
win.standardEventHandler=new StandardEventHandler(doc);
}else{
}
}
},handleAction:function(_32f){
switch(_32f.type){
case Application.REFRESH:
this.refresh();
break;
}
},declareTopLocal:function(win){
var _331=Resolver.resolve("/scripts/source/top/");
if(this._topLevelClasses==null){
this._topLevelClasses=new List();
var self=this;
new List(DOMUtil.getElementsByTagName(document,"script")).each(function(_333){
var src=_333.src;
if(src.indexOf(_331)>-1){
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
var _338=false;
if(this._isMousePositionTracking){
_338=true;
if(Client.isExplorer&&e.button!=1){
_338=false;
}
if(_338){
this._mousePosition=DOMUtil.getUniversalMousePosition(e);
}
}
return _338;
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
},onDragStart:function(_33a){
var _33b=BindingDragger.draggedBinding;
if(Interfaces.isImplemented(IDraggable,_33b,true)==true){
if(!this._isDragging){
app.bindingMap.dragdropcursor.setImage(_33b.getImage());
this._cursorStartPoint=_33a;
app.bindingMap.dragdropcursor.setPosition(this._cursorStartPoint);
CursorBinding.fadeIn(app.bindingMap.dragdropcursor);
if(_33b.showDrag){
_33b.showDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_START,_33b.dragType);
this._isDragging=true;
}
}
},onDrag:function(diff){
if(this._isDragging){
var _33d=new Point(this._cursorStartPoint.x+diff.x,this._cursorStartPoint.y+diff.y);
app.bindingMap.dragdropcursor.setPosition(_33d);
}
},onDragStop:function(diff){
if(this._isDragging){
var _33f=BindingDragger.draggedBinding;
if(_33f.hideDrag){
_33f.hideDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_STOP,_33f.dragType);
this._isDragging=false;
_33f=BindingAcceptor.acceptingBinding;
if(_33f!=null){
if(Interfaces.isImplemented(IAcceptable,_33f,true)==true){
_33f.accept(BindingDragger.draggedBinding);
}else{
throw new Error("Application: IAcceptable not implemented "+_33f);
}
BindingAcceptor.acceptingBinding=null;
CursorBinding.fadeOut(app.bindingMap.dragdropcursor);
}else{
app.bindingMap.dragdropcursor.hide();
}
}
},reload:function(_340){
if(this.isDeveloperMode||_340){
if(this.isDeveloperMode&&Client.isPrism){
Prism.clearCache();
}
Application.lock(Application);
setTimeout(function(){
top.window.location.reload(true);
},0);
}else{
if(Application.isOperational){
Dialog.question(StringBundle.getString("ui","Website.Application.DialogReload.Title"),StringBundle.getString("ui","Website.Application.DialogReload.Text"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_341){
if(_341==Dialog.RESPONSE_ACCEPT){
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
window.License=new function(){
this.isRegistered=false;
this.isExpired=false;
this.registrationName=null;
this.registrationURL=null;
this.statusURL=null;
this.versionString=null;
this.versionPrettyString=null;
this.installationID=null;
this.refresh=function(_342){
if(_342){
LicensingService.InvokeLicenseFetch(true);
}
this.isRegistered=LicensingService.Registered(true);
var self=this;
new List(LicensingService.GetLicenseInfo(true)).each(function(_344){
switch(_344.Key){
case "RegistrationURL":
self.registrationURL=_344.Value;
break;
case "StatusURL":
self.statusURL=_344.Value;
break;
case "ProductVersion":
self.versionString=_344.Value;
break;
case "ProductTitle":
self.versionPrettyString=_344.Value;
break;
case "RegisteredTo":
self.registrationName=_344.Value;
break;
case "Expired":
self.isExpired=_344.Value=="True";
break;
case "InstallationId":
self.installationID=_344.Value;
break;
}
});
};
};
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
},initialize:function(_347){
if(!this.isInitialized){
this.isInitialized=true;
if(_347){
this._audio=_347;
this.isEnabled=true;
}
EventBroadcaster.broadcast(BroadcastMessages.AUDIO_INITIALIZED);
}
},play:function(url){
var _349=false;
if(this.isEnabled&&Preferences.getPref("audio")){
this._audio.fromURL(Resolver.resolve(url));
_349=true;
}
return _349;
}};
var Audio=new _Audio();
window.Preferences=new function(){
var _34a=SystemLogger.getLogger("Preferences");
this.AUDIO="audio";
this.LOGIN="login";
var _34b={"audio":true,"login":true};
EventBroadcaster.subscribe(BroadcastMessages.LOCALSTORE_INITIALIZED,{handleBroadcast:function(){
if(LocalStore.isEnabled){
var _34c=LocalStore.getProperty(LocalStore.PREFERENCES);
if(_34c){
for(var key in _34c){
_34b[key]=_34c[key];
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
LocalStore.setProperty(LocalStore.PREFERENCES,_34b);
}
}});
this.getPref=function(key){
var _34f=null;
if(key){
_34f=_34b[key];
}else{
throw "No such preference.";
}
return _34f;
};
this.setPref=function(key,_351){
if(key){
_34b[key]=_351;
}else{
throw "No such preference.";
}
};
function debug(_352){
var _353=_352?"Persisted preferences":"No persisted preferences. Using defaults";
_353+=":\n";
for(var key in _34b){
var pref=_34b[key];
_353+="\n\t"+key+": "+pref+" ["+typeof pref+"]";
}
_34a.fine(_353);
}
};
function _Persistance(){
}
_Persistance.prototype={_logger:SystemLogger.getLogger("Persistance"),_persistance:null,_isEnabled:false,isInitialized:false,isEnabled:false,getPersistedProperty:function(id,prop){
var _358=null;
if(this.isInitialized==true){
if(this._persistance){
var _359=this._persistance[id];
if(_359){
_358=_359[prop];
}
}
}else{
throw "Persistance not initialized!";
}
return _358;
},setPersistedProperty:function(id,prop,_35c){
if(this.isInitialized==true){
if(this._persistance){
if(_35c!=null){
if(!this._persistance[id]){
this._persistance[id]={};
}
this._persistance[id][prop]=String(_35c);
}else{
this._logger.error("Cannot persist "+prop+" with value: null");
}
}
}else{
throw "Persistance not initialized!";
}
},clearAllPersistedProperties:function(){
this._logger.debug("TODO: clearAllPersistedProperties");
},handleBroadcast:function(_35d){
switch(_35d){
case BroadcastMessages.APPLICATION_SHUTDOWN:
var _35e=top.bindingMap.persistance;
_35e.persist(this._persistance);
break;
}
},initialize:function(){
if(!this.isInitialized){
this.isInitialized=true;
if(this._isEnabled==true){
var _35f=top.bindingMap.persistance;
var map=_35f.getPersistanceMap();
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
function StandardEventHandler(doc,_362){
this.logger=SystemLogger.getLogger("StandardEventHandler ["+doc.title+"]");
this._contextDocument=doc;
this._contextWindow=DOMUtil.getParentWindow(doc);
this.hasNativeKeys=false;
this._isAllowTabs=false;
this._isMouseHandlerOnly=_362;
this._addListeners();
}
StandardEventHandler.prototype._addListeners=function(){
var doc=this._contextDocument;
DOMEvents.addEventListener(doc,DOMEvents.MOUSEDOWN,this);
DOMEvents.addEventListener(doc,DOMEvents.MOUSEUP,this);
DOMEvents.addEventListener(doc,DOMEvents.MOUSEMOVE,this);
if(!this._isMouseHandlerOnly){
DOMEvents.addEventListener(doc,DOMEvents.KEYDOWN,this);
DOMEvents.addEventListener(doc,DOMEvents.KEYUP,this);
}
if(Client.isMozilla){
doc.addEventListener(DOMEvents.KEYDOWN,{handleEvent:function(e){
if(e.ctrlKey&&e.keyCode==83){
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
}
};
StandardEventHandler.prototype._handleMouseDown=function(e){
Application.trackMousePosition(e);
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEDOWN,e);
if(e.button!=ButtonStateManager.RIGHT_BUTTON){
var node=DOMEvents.getTarget(e);
while(node){
switch(node.nodeType){
case Node.ELEMENT_NODE:
var _368=UserInterface.getBinding(node);
if(_368){
_368.dispatchAction(Binding.ACTION_ACTIVATED);
}
node=_368?false:node.parentNode;
break;
case Node.DOCUMENT_NODE:
node=DOMUtil.getParentWindow(node).frameElement;
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
var _36b=Application.trackMousePosition(e);
if(_36b){
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEMOVE,e);
}
}
catch(exception){
DOMEvents.removeEventListener(this._contextDocument,DOMEvents.MOUSEMOVE,this);
throw (exception);
}
};
StandardEventHandler.prototype._handleKeyDown=function(e,_36d){
if(e.keyCode==KeyEventCodes.VK_TAB){
if(!this._isAllowTabs){
if(!_36d){
this._handleTab(e);
DOMEvents.preventDefault(e);
}
}else{
if(e.shiftKey||e.ctrlKey){
DOMEvents.preventDefault(e);
}
}
_36d=true;
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
var _36e=KeySetBinding.handleKey(this._contextDocument,e);
if(!_36e){
var _36f=this._contextWindow.frameElement;
if(_36f){
var _370=DOMUtil.getParentWindow(_36f);
if(_370.standardEventHandler!=null){
_370.standardEventHandler._handleKeyDown(e,_36d);
}
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
StandardEventHandler.prototype._handleKeyUp=function(e){
Keyboard.keyUp(e);
};
StandardEventHandler.prototype.enableNativeKeys=function(_373){
this._isAllowTabs=(_373==true?true:false);
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
function Action(_376,type){
this.target=_376;
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
function Animation(_378){
this.id=KeyMaster.getUniqueKey();
this.interval=25;
this.iterator=0;
this.modifier=1;
this.endcount=90;
for(var _379 in _378){
this[_379]=_378[_379];
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
Animation.prototype.onstart=function(_37d){
};
Animation.prototype.onstep=function(_37e){
};
Animation.prototype.onstop=function(_37f){
};
Point.isEqual=function(p1,p2){
var _382=false;
if(p1&&p2){
_382=(p1.x==p2.x)&&(p1.y==p2.y);
}
return _382;
};
function Point(x,y){
this.x=x;
this.y=y;
}
Point.prototype={x:0,y:0};
Dimension.isEqual=function(dim1,dim2){
var _387=false;
if(dim1&&dim2){
_387=(dim1.w==dim2.w)&&(dim1.h==dim2.h);
}
return _387;
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
function BindingAcceptor(_38e){
this.logger=SystemLogger.getLogger("BindingDragger");
this._binding=_38e;
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
var _38f=new List(this._binding.dragAccept.split(" "));
while(_38f.hasNext()){
var type=_38f.getNext();
this._acceptedList[type]=true;
}
}
};
BindingAcceptor.prototype.handleBroadcast=function(_391,arg){
var type=arg;
try{
switch(_391){
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
function BindingBoxObject(_396){
this._domElement=_396.getBindingElement();
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
function BindingDragger(_398){
this.logger=SystemLogger.getLogger("BindingDragger");
this.binding=_398;
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
BindingDragger.prototype.registerHandler=function(_39a){
if(Interfaces.isImplemented(IDragHandler,_39a)==true){
this.handler=_39a;
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
var _39d=e.button==(e.target?0:1);
if(_39d){
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
var _39f=Application.getMousePosition();
var dx=_39f.x-this.startPoint.x;
var dy=_39f.y-this.startPoint.y;
return new Point(dx,dy);
};
BindingDragger.prototype.handleBroadcast=function(_3a2,e){
switch(_3a2){
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
function BindingParser(_3a4){
this.logger=SystemLogger.getLogger("BindingParser");
this._ownerDocument=_3a4;
this._rootElement=null;
}
BindingParser.prototype.parseFromString=function(_3a5){
var _3a6=new List();
var xml=BindingParser.XML.replace("${markup}",_3a5);
var doc=XMLParser.parse(_3a5);
if(doc){
var _3a9=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this._ownerDocument);
this._iterate(doc.documentElement,_3a9);
var node=_3a9.firstChild;
while(node){
if(node.nodeType==Node.ELEMENT_NODE){
_3a6.add(node);
}
node=node.nextSibling;
}
}
return _3a6;
};
BindingParser.prototype._iterate=function(_3ab,_3ac){
var _3ad=null;
switch(_3ab.nodeType){
case Node.ELEMENT_NODE:
_3ad=this._cloneElement(_3ab);
UserInterface.registerBinding(_3ad);
break;
case Node.TEXT_NODE:
_3ad=this._ownerDocument.createTextNode(_3ab.nodeValue);
break;
}
if(_3ad){
_3ac.appendChild(_3ad);
}
if(_3ad&&_3ab.hasChildNodes()){
var _3ae=_3ab.firstChild;
while(_3ae){
this._iterate(_3ae,_3ad);
_3ae=_3ae.nextSibling;
}
}
};
BindingParser.prototype._cloneElement=function(_3af){
var _3b0=DOMUtil.createElementNS(_3af.namespaceURI?_3af.namespaceURI:Constants.NS_XHTML,_3af.nodeName,this._ownerDocument);
var i=0;
while(i<_3af.attributes.length){
var attr=_3af.attributes.item(i++);
_3b0.setAttribute(attr.nodeName,String(attr.nodeValue));
}
return _3b0;
};
BindingSerializer.activeInstance=null;
BindingSerializer.KEYPOINTER="bindingserializerkeypointer";
BindingSerializer.includeShadowTreeBindings=false;
BindingSerializer.filter=function(_3b3){
var _3b4=null;
var _3b5=false;
var _3b6=_3b3.parentNode.getAttribute(BindingSerializer.KEYPOINTER);
if(UserInterface.hasBinding(_3b3)){
var _3b7=UserInterface.getBinding(_3b3);
_3b5=BindingSerializer.activeInstance.indexBinding(_3b7);
if(_3b5){
_3b4=_3b7.key;
_3b3.setAttribute(BindingSerializer.KEYPOINTER,_3b4);
}
}
_3b4=_3b4?_3b4:_3b6;
var _3b8=new List(_3b3.childNodes);
_3b8.each(function(_3b9){
if(_3b9.nodeType==Node.ELEMENT_NODE){
_3b9.setAttribute(BindingSerializer.KEYPOINTER,_3b4);
}
});
if(_3b5){
BindingSerializer.activeInstance.append(_3b4,_3b6);
}
};
function BindingSerializer(){
this.logger=SystemLogger.getLogger("BindingSerializer");
this._dom=DOMUtil.getDOMDocument();
alert("BindingSerializer: Convert to Crawler!");
this._pointers=[];
}
BindingSerializer.prototype.serializeBinding=function(_3ba,_3bb){
BindingSerializer.includeShadowTreeBindings=_3bb?true:false;
BindingSerializer.activeInstance=this;
_3ba.bindingWindow.ElementIterator.iterate(_3ba.bindingElement,BindingSerializer.filter);
return DOMSerializer.serialize(this._dom,true);
};
BindingSerializer.prototype.indexBinding=function(_3bc){
var _3bd=false;
var _3be=_3bc.serialize();
if(_3be!=false){
_3bd=true;
var _3bf="ui:"+DOMUtil.getLocalName(_3bc.bindingElement);
var _3c0=DOMUtil.createElementNS(Constants.NS_UI,_3bf,this._dom);
this._pointers[_3bc.key]=_3c0;
for(var prop in _3be){
if(_3be[prop]!=null){
_3c0.setAttribute(prop,String(_3be[prop]));
}
}
}
return _3bd;
};
BindingSerializer.prototype.append=function(_3c2,_3c3){
var _3c4=this._pointers[_3c2];
var _3c5=_3c3?this._pointers[_3c3]:this._dom;
_3c5.appendChild(_3c4);
};
function ImageProfile(_3c6){
this._default=_3c6.image;
this._hover=_3c6.imageHover;
this._active=_3c6.imageActive;
this._disabled=_3c6.imageDisabled;
}
ImageProfile.prototype.getDefaultImage=function(){
return this._default;
};
ImageProfile.prototype.setDefaultImage=function(_3c7){
this._default=_3c7;
};
ImageProfile.prototype.getHoverImage=function(){
return this._hover;
};
ImageProfile.prototype.setHoverImage=function(_3c8){
this._hover=_3c8;
};
ImageProfile.prototype.getActiveImage=function(){
return this._active;
};
ImageProfile.prototype.setActiveImage=function(_3c9){
this._active=_3c9;
};
ImageProfile.prototype.getDisabledImage=function(){
return this._disabled;
};
ImageProfile.prototype.setDisabledImage=function(_3ca){
this._disabled=_3ca;
};
function _BindingFinder(){
}
_BindingFinder.prototype={getDescendantBindingsByLocalName:function(_3cb,_3cc,_3cd){
var _3ce=null;
if(_3cb.isAttached){
_3ce=new List();
var _3cf=_3cd?_3cb.getChildElementsByLocalName(_3cc):_3cb.getDescendantElementsByLocalName(_3cc);
_3cf.each(function(_3d0){
var _3d1=UserInterface.getBinding(_3d0);
if(_3d1){
_3ce.add(_3d1);
}
});
}else{
var ouch="Could not resolve descendants of unattached binding "+_3cb.toString();
if(Application.isDeveloperMode){
throw ouch;
}
}
return _3ce;
},getAncestorBindingByType:function(_3d3,impl,_3d5){
var _3d6=null;
var node=_3d3.bindingElement;
while(!_3d6&&node){
node=node.parentNode;
if(UserInterface.hasBinding(node)){
var _3d8=UserInterface.getBinding(node);
if(_3d8 instanceof impl){
_3d6=_3d8;
}
}else{
if(_3d5&&node.nodeType==Node.DOCUMENT_NODE){
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
return _3d6;
},getAncestorBindingByLocalName:function(_3da,_3db,_3dc){
var _3dd=null;
if(_3db=="*"){
var node=_3da.bindingElement;
while(!_3dd&&(node=node.parentNode)!=null){
if(UserInterface.hasBinding(node)){
_3dd=UserInterface.getBinding(node);
}
}
}else{
_3dd=UserInterface.getBinding(DOMUtil.getAncestorByLocalName(_3db,_3da.bindingElement,_3dc));
}
return _3dd;
},getChildElementsByLocalName:function(_3df,_3e0){
var _3e1=new List();
var _3e2=new List(_3df.bindingElement.childNodes);
_3e2.each(function(_3e3){
if(_3e3.nodeType==Node.ELEMENT_NODE){
if(_3e0=="*"||DOMUtil.getLocalName(_3e3)==_3e0){
_3e1.add(_3e3);
}
}
});
return _3e1;
},getChildBindingByType:function(_3e4,impl){
var _3e6=null;
_3e4.getChildElementsByLocalName("*").each(function(_3e7){
var _3e8=UserInterface.getBinding(_3e7);
if(_3e8!=null&&_3e8 instanceof impl){
_3e6=_3e8;
return false;
}else{
return true;
}
});
return _3e6;
},getDescendantBindingByType:function(_3e9,impl){
var _3eb=null;
_3e9.getDescendantElementsByLocalName("*").each(function(_3ec){
var _3ed=UserInterface.getBinding(_3ec);
if(_3ed!=null&&_3ed instanceof impl){
_3eb=_3ed;
return false;
}else{
return true;
}
});
return _3eb;
},getDescendantBindingsByType:function(_3ee,impl){
var _3f0=new List();
_3ee.getDescendantElementsByLocalName("*").each(function(_3f1){
var _3f2=UserInterface.getBinding(_3f1);
if(_3f2!=null&&_3f2 instanceof impl){
_3f0.add(_3f2);
}
return true;
});
return _3f0;
},getNextBindingByLocalName:function(_3f3,name){
var _3f5=null;
var _3f6=_3f3.bindingElement;
while((_3f6=DOMUtil.getNextElementSibling(_3f6))!=null&&DOMUtil.getLocalName(_3f6)!=name){
}
if(_3f6!=null){
_3f5=UserInterface.getBinding(_3f6);
}
return _3f5;
},getPreviousBindingByLocalName:function(_3f7,name){
var _3f9=null;
var _3fa=_3f7.bindingElement;
while((_3fa=DOMUtil.getPreviousElementSibling(_3fa))!=null&&DOMUtil.getLocalName(_3fa)!=name){
}
if(_3fa!=null){
_3f9=UserInterface.getBinding(_3fa);
}
return _3f9;
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
},addFilter:function(_3fb){
this._filters.add(_3fb);
},removeFilter:function(_3fc){
var _3fd=-1;
this._filters.each(function(fil){
_3fd++;
var _3ff=true;
if(fil==_3fc){
_3ff=false;
}
return _3ff;
});
if(_3fd>-1){
this._filters.del(_3fd);
}
},_applyFilters:function(node,arg){
var _402=null;
var stop=NodeCrawler.STOP_CRAWLING;
var skip=NodeCrawler.SKIP_NODE;
var _405=NodeCrawler.SKIP_CHILDREN;
this._filters.reset();
var _406=true;
while(this._filters.hasNext()&&_406==true){
var _407=this._filters.getNext();
var res=_407.call(this,node,arg);
if(res!=null){
_402=res;
switch(res){
case stop:
case skip:
case skip+_405:
_406=false;
break;
}
}
}
return _402;
},crawl:function(_409,arg){
this.contextDocument=_409.ownerDocument;
this.onCrawlStart();
var _40b=this.type==NodeCrawler.TYPE_ASCENDING;
var _40c=this._applyFilters(_409,arg);
if(_40c!=NodeCrawler.STOP_CRAWLING){
if(_40b&&_40c==NodeCrawler.SKIP_CHILDREN){
}else{
var next=null;
if(this.nextNode!=null){
next=this.nextNode;
this.nextNode=null;
}else{
next=_40b?_409.parentNode:_409;
}
this._crawl(next,arg);
}
}
this.onCrawlStop();
},onCrawlStart:function(){
},onCrawlStop:function(){
},_crawl:function(_40e,arg){
var _410=null;
switch(this.type){
case NodeCrawler.TYPE_DESCENDING:
_410=this._crawlDescending(_40e,arg);
break;
case NodeCrawler.TYPE_ASCENDING:
_410=this._crawlAscending(_40e,arg);
break;
}
return _410;
},_crawlDescending:function(_411,arg){
var skip=NodeCrawler.SKIP_NODE;
var _414=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
var _416=null;
if(_411.hasChildNodes()){
var node=_411.firstChild;
while(node!=null&&_416!=stop){
this.currentNode=node;
_416=this._applyFilters(node,arg);
switch(_416){
case stop:
case _414:
case skip+_414:
break;
default:
if(node.nodeType==Node.ELEMENT_NODE){
if(this.nextNode==null){
var res=this._crawl(node,arg);
if(res==stop){
_416=stop;
break;
}
}
}
if(_416!=stop&&_416!=skip){
this.previousNode=node;
}
break;
}
if(_416!=stop){
node=this.nextNode?this.nextNode:node.nextSibling;
this.nextNode=null;
}
}
}
return _416;
},_crawlAscending:function(_419,arg){
var _41b=null;
var skip=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
if(_419!=null){
this.currentNode=_419;
_41b=this._applyFilters(_419,arg);
if(_41b!=stop){
var next=this.nextNode?this.nextNode:_419.parentNode;
this.nextNode=null;
if(next&&next.nodeType!=Node.DOCUMENT_NODE){
this.previousNode=_419;
_41b=this._crawl(next,arg);
}
}
}else{
_41b=stop;
}
return _41b;
}};
NodeCrawler.prototype.dispose=function(){
this._filters.dispose();
for(var _41f in this){
this[_41f]=null;
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
var _422=null;
if(node.nodeType!=Node.ELEMENT_NODE){
_422=NodeCrawler.SKIP_NODE;
}
return _422;
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
this.addFilter(function(_423,arg){
var _425=null;
if(!UserInterface.hasBinding(_423)){
_425=NodeCrawler.SKIP_NODE;
}
return _425;
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
this.addFilter(function(_427,arg){
var _429=null;
var _42a=UserInterface.getBinding(_427);
if(Interfaces.isImplemented(ICrawlerHandler,_42a)==true){
self.response=null;
_42a.handleCrawler(self);
_429=self.response;
}
return _429;
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
this.addFilter(function(_42c,list){
var _42e=null;
var _42f=UserInterface.getBinding(_42c);
if(Interfaces.isImplemented(IFlexible,_42f)==true){
switch(self.mode){
case FlexBoxCrawler.MODE_FORCE:
list.add(_42f);
break;
case FlexBoxCrawler.MODE_NORMAL:
if(_42f.isFlexSuspended==true){
_42e=NodeCrawler.SKIP_CHILDREN;
}else{
list.add(_42f);
}
break;
}
}
return _42e;
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
this.addFilter(function(_430,list){
var _432=null;
var _433=UserInterface.getBinding(_430);
if(_433.isAttached==true){
if(Interfaces.isImplemented(IFocusable,_433)==true){
if(_433.isFocusable==true){
switch(this.mode){
case FocusCrawler.MODE_INDEX:
list.add(_433);
break;
case FocusCrawler.MODE_FOCUS:
if(!_433.isFocused){
_433.focus();
}
_432=NodeCrawler.STOP_CRAWLING;
break;
case FocusCrawler.MODE_BLUR:
if(_433.isFocused==true){
_433.blur();
_432=NodeCrawler.STOP_CRAWLING;
}
break;
}
}
}
}
return _432;
});
};
function _DocumentUpdatePlugin(){
if(window.UpdateManager!=null){
UpdateManager.plugins.push(this);
this._setup();
}
}
_DocumentUpdatePlugin.prototype={_logger:SystemLogger.getLogger("DocumentUpdatePlugin ["+document.title+"]"),_isUpdating:false,_attributesbuffer:null,_attributesbuffer:null,isDebugging:Application.isDeveloperMode,_oldDOM:null,_focusID:null,_setup:function(){
UpdateManager.isDebugging=Application.isDeveloperMode;
UpdateManager.hasSoftAttributes=true;
UpdateManager.hasSoftSiblings=true;
DOMEvents.addEventListener(document,DOMEvents.BEFOREUPDATE,this);
DOMEvents.addEventListener(document,DOMEvents.AFTERUPDATE,this);
DOMEvents.addEventListener(document,DOMEvents.ERRORUPDATE,this);
if(Client.isMozilla){
UpdateAssistant.serialize=function(_434){
_434=_434.cloneNode(true);
_434.setAttributeNS(Constants.NS_NS,"xmlns",Constants.NS_XHTML);
_434.setAttributeNS(Constants.NS_NS,"xmlns:ui",Constants.NS_UI);
return this._serializer.serializeToString(_434);
};
}
},handleEvent:function(e){
var _436=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.BEFOREUPDATE:
this._beforeUpdate(_436);
break;
case DOMEvents.AFTERUPDATE:
this._afterUpdate(_436);
break;
case DOMEvents.ERRORUPDATE:
this._errorUpdate();
break;
}
},_beforeUpdate:function(_437){
var _438=(_437==document.documentElement);
if(_438){
this._isUpdating=true;
Application.lock(this);
var root=UserInterface.getBinding(document.body);
if(root!=null){
var page=root.getDescendantBindingByType(PageBinding);
if(page!=null){
page.onBeforeUpdates();
}
}
var _43b=FocusBinding.focusedBinding;
if(_43b!=null){
this._focusID=_43b.getID();
}
if(this.isDebugging){
this._oldDOM=DOMSerializer.serialize(UpdateManager.currentDOM,true);
}
}else{
switch(_437.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_REMOVE:
DocumentManager.detachBindings(_437);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_437,false);
break;
}
}
},_afterUpdate:function(_43c){
var _43d=(_43c==document.documentElement);
if(_43d){
this._isUpdating=false;
Application.unlock(this);
var root=UserInterface.getBinding(document.body);
if(root!=null){
var page=root.getDescendantBindingByType(PageBinding);
if(page!=null){
page.onAfterUpdates();
}
}
var _440=FocusBinding.focusedBinding;
if(_440==null){
var _441=document.getElementById(this._focusID);
if(_441!=null){
var _440=UserInterface.getBinding(_441);
if(_440!=null){
_440.focus();
}
}
}
this._focusID=null;
if(UpdateManager.summary!=""){
if(this.isDebugging){
var _442=DOMSerializer.serialize(UpdateManager.currentDOM,true);
var _443="NEW DOM: "+document.title+"\n\n"+_442+"\n\n";
_443+="OLD DOM: "+document.title+"\n\n"+this._oldDOM;
this._logger.debug(_443);
this._oldDOM=null;
}
this._logger.fine(UpdateManager.summary);
}
}else{
switch(_43c.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_INSERT:
DocumentManager.attachBindings(_43c);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_43c,true);
break;
}
switch(_43c.id){
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
var _440=UserInterface.getBinding(_43c);
while(_440==null&&_43c!=null){
_440=UserInterface.getBinding(_43c);
_43c=_43c.parentNode;
}
if(_440!=null){
_440.dispatchAction(Binding.ACTION_UPDATED);
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
},_backupattributes:function(_445,_446){
var _447=UserInterface.getBinding(_445);
if(_447!=null){
if(_446){
var _448=this._attributesbuffer;
var map=new Map();
_448.each(function(name,old){
var now=_445.getAttribute(name);
if(now!=null){
if(now!=old){
map.set(name,Types.castFromString(now));
}
}else{
map.set(name,null);
}
});
new List(_445.attributes).each(function(att){
if(att.specified){
if(!_448.has(att.nodeName)){
map.set(att.nodeName,Types.castFromString(att.nodeValue));
}
}
});
map.each(function(name,_44f){
var _450=_447.propertyMethodMap[name];
if(_450!=null){
_450.call(_447,_44f);
}
});
}else{
var map=new Map();
new List(_445.attributes).each(function(att){
if(att.specified){
map.set(att.nodeName,att.nodeValue);
}
});
this._attributesbuffer=map;
}
}
},handleElement:function(_452,_453){
var _454=window.bindingMap[_452.getAttribute("id")];
if(_454!=null){
return _454.handleElement(_452,_453);
}
},updateElement:function(_455,_456){
var _457=window.bindingMap[_455.getAttribute("id")];
if(_457!=null){
return _457.updateElement(_455,_456);
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
this.addFilter(function(_459,list){
var _45b=UserInterface.getBinding(_459);
var _45c=null;
switch(self.mode){
case DocumentCrawler.MODE_REGISTER:
if(_45b==null){
UserInterface.registerBinding(_459);
}
break;
case DocumentCrawler.MODE_ATTACH:
if(_45b!=null){
if(!_45b.isAttached){
list.add(_45b);
}
if(_45b.isLazy==true){
_45c=NodeCrawler.SKIP_CHILDREN;
}
}
break;
case DocumentCrawler.MODE_DETACH:
if(_45b!=null){
list.add(_45b);
}
break;
}
return _45c;
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
},handleBroadcast:function(_45d,arg){
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
var _460=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.SELECTSTART:
case DOMEvents.CONTEXTMENU:
if(!this._isTextInputElement(_460)){
DOMEvents.preventDefault(e);
}
break;
case DOMEvents.CLICK:
if(Client.isExplorer){
if(_460.href&&_460.href.indexOf(Constants.DUMMY_LINK)>-1){
DOMEvents.preventDefault(e);
}
}
break;
}
},_resolveCustomBindingMappings:function(){
var _461=DOMUtil.getElementsByTagName(document.documentElement,"bindingmappingset").item(0);
if(_461!=null){
var map={};
var _463=DOMUtil.getElementsByTagName(_461,"bindingmapping");
new List(_463).each(function(_464){
var _465=_464.getAttribute("element");
var _466=_464.getAttribute("binding");
map[_465]=eval(_466);
});
this.setCustomUserInterfaceMapping(new UserInterfaceMapping(map));
}
},setCustomUserInterfaceMapping:function(_467){
if(this.customUserInterfaceMapping==null){
this.customUserInterfaceMapping=_467;
}else{
this.customUserInterfaceMapping.merge(_467);
}
},_registerBindings:function(_468){
var _469=new DocumentCrawler();
_469.mode=DocumentCrawler.MODE_REGISTER;
_469.crawl(_468);
_469.dispose();
},_attachBindings:function(_46a){
var _46b=new DocumentCrawler();
_46b.mode=DocumentCrawler.MODE_ATTACH;
var list=new List();
_46b.crawl(_46a,list);
var _46d=false;
while(list.hasNext()){
var _46e=list.getNext();
if(!_46e.isAttached){
_46e.onBindingAttach();
if(!_46e.memberDependencies){
_46e.onBindingInitialize();
}
if(Interfaces.isImplemented(IData,_46e)){
_46d=true;
}
}
}
if(_46d){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_46b.dispose();
list.dispose();
},attachBindings:function(_470){
this._registerBindings(_470);
this._attachBindings(_470);
},detachBindings:function(_471,_472){
var _473=new DocumentCrawler();
_473.mode=DocumentCrawler.MODE_DETACH;
var list=new List();
_473.crawl(_471,list);
if(_472==true){
list.extractFirst();
}
var _475=false;
list.reverse().each(function(_476){
if(Interfaces.isImplemented(IData,_476)){
_475=true;
}
_476.dispose(true);
});
if(_475){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_473.dispose();
list.dispose();
},detachAllBindings:function(){
this.detachBindings(document.documentElement);
},computeMaxIndex:function(){
if(this._maxIndex==-1){
this._maxIndex=DOMUtil.getMaxIndex(document);
}
return this._maxIndex++;
},_isTextInputElement:function(_478){
return (/textarea|input/.test(DOMUtil.getLocalName(_478)));
},_makeDocumentUnselectable:function(){
if(Client.isExplorer){
DOMEvents.addEventListener(document,DOMEvents.SELECTSTART,this);
}else{
}
}};
var DocumentManager=new _DocumentManager();
function _DataManager(){
}
_DataManager.prototype={isPostBackFun:false,_logger:SystemLogger.getLogger("DataManager ["+document.title+"]"),_dataBindings:{},isDirty:false,dirty:function(_479){
this.isDirty=true;
var _47a=false;
if(!_479.isDirty){
_479.isDirty=true;
_479.dispatchAction(Binding.ACTION_DIRTY);
_47a=true;
}
return _47a;
},clean:function(_47b){
_47b.isDirty=false;
},registerDataBinding:function(name,_47d){
if(Interfaces.isImplemented(IData,_47d,true)){
if(this._dataBindings[name]!=null){
throw "no proper support for checkbox multiple values! "+name;
}else{
this._dataBindings[name]=_47d;
}
}else{
throw "Invalid DataBinding: "+_47d;
}
},unRegisterDataBinding:function(name){
if(this._dataBindings[name]!=null){
delete this._dataBindings[name];
}
},getDataBinding:function(name){
var _480=null;
if(this._dataBindings[name]!=null){
_480=this._dataBindings[name];
}
return _480;
},getAllDataBindings:function(_481){
var list=new List();
for(var name in this._dataBindings){
var _484=this._dataBindings[name];
list.add(_484);
if(_481&&_484 instanceof WindowBinding){
var _485=_484.getContentWindow().DataManager;
if(_485!=null){
list.merge(_485.getAllDataBindings());
}
}
}
return list;
},hasDataBindings:function(){
var _486=false;
for(var name in this._dataBindings){
_486=true;
break;
}
return _486;
},populateDataBindings:function(map){
if(map instanceof DataBindingMap){
map.each(function(name,_48a){
var _48b=this._dataBindings[name];
if(_48b!=null){
switch(map.type){
case DataBindingMap.TYPE_RESULT:
try{
_48b.setResult(_48a);
}
catch(exception){
if(Application.isDeveloperMode){
alert(_48b);
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
var _48c=new DataBindingMap();
_48c.type=DataBindingMap.TYPE_VALUE;
for(var name in this._dataBindings){
var _48e=this._dataBindings[name];
if(_48e instanceof DataDialogBinding){
throw "DataDialogBinding valuemap not supported!";
}
_48c[name]=_48e.getValue();
}
return _48c;
},getDataBindingResultMap:function(){
var _48f=new DataBindingMap();
_48f.type=DataBindingMap.TYPE_RESULT;
for(var name in this._dataBindings){
var _491=this._dataBindings[name];
var res=_491.getResult();
if(res instanceof DataBindingMap){
res.each(function(name,_494){
_48f.set(name,_494);
});
}else{
_48f.set(name,res);
}
}
return _48f;
},getPostBackString:function(){
var _495="";
var form=document.forms[0];
if(form!=null){
var _497="";
new List(form.elements).each(function(_498){
var name=_498.name;
var _49a=encodeURIComponent(_498.value);
switch(_498.type){
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_495+=name+"="+_49a+"&";
break;
case "submit":
if(document.activeElement==_498){
_495+=name+"="+_49a+"&";
}
break;
case "radio":
if(_498.checked){
_495+=name+"="+_49a+"&";
}
break;
case "checkbox":
if(_498.checked){
if(_498.name==_497){
if(_495.lastIndexOf("&")==_495.length-1){
_495=_495.substr(0,_495.length-1);
}
_495+=","+_49a;
}else{
_495+=name+"="+_498.value;
}
_497=name;
_495+="&";
}
break;
}
});
}
return _495.substr(0,_495.length-1);
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
var _4a3=null;
var _4a4=null;
var _4a5=false;
if(!this._cache[name]){
_4a5=true;
var uri=Constants.TEMPLATESROOT+"/"+name;
var _4a7=DOMUtil.getXMLHTTPRequest();
_4a7.open("get",uri,false);
_4a7.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_4a7.send(null);
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4a4=_4a7.responseText;
break;
default:
_4a4=_4a7.responseXML;
break;
}
if(_4a4==null){
throw new Error("Templates: Could not read template. Malformed XML?");
}else{
this._cache[name]=_4a4;
}
}
_4a4=this._cache[name];
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4a3=_4a4;
break;
case this._modes.MODE_DOCUMENT:
_4a3=DOMUtil.cloneNode(_4a4,true);
break;
case this._modes.MODE_ELEMENT:
_4a3=DOMUtil.cloneNode(_4a4.documentElement,true);
break;
case this._modes.MODE_DOCUMENTTEXT:
_4a3=DOMSerializer.serialize(_4a4,true);
break;
case this._modes.MODE_ELEMENTTEXT:
_4a3=DOMSerializer.serialize(_4a4.documentElement,true);
break;
}
if(_4a5&&Application.isDeveloperMode){
this._logger.fine(new String("Import \""+name+"\":\n\n"+_4a3));
}
return _4a3;
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
},invoke:function(url,_4ab,_4ac){
this._logger.error("Not implemented");
},invokeModal:function(url,_4ae,_4af){
var _4b0=new DialogViewDefinition({handle:KeyMaster.getUniqueKey(),position:Dialog.MODAL,url:url,handler:_4ae,argument:_4af});
StageBinding.presentViewDefinition(_4b0);
return _4b0;
},invokeDefinition:function(_4b1){
if(_4b1 instanceof DialogViewDefinition){
StageBinding.presentViewDefinition(_4b1);
}
return _4b1;
},question:function(_4b2,text,_4b4,_4b5){
if(!_4b4){
_4b4=this.BUTTONS_ACCEPT_CANCEL;
}
this._standardDialog(this._TYPE_QUESTION,_4b2,text,_4b4,_4b5);
},message:function(_4b6,text,_4b8,_4b9){
if(!_4b8){
_4b8=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_MESSAGE,_4b6,text,_4b8,_4b9);
},error:function(_4ba,text,_4bc,_4bd){
if(!_4bc){
_4bc=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_ERROR,_4ba,text,_4bc,_4bd);
},warning:function(_4be,text,_4c0,_4c1){
if(!_4c0){
_4c0=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_WARNING,_4be,text,_4c0,_4c1);
},_standardDialog:function(type,_4c3,text,_4c5,_4c6){
var _4c7=null;
if(!_4c5){
_4c7=new List(Dialog.BUTTONS_ACCEPT);
}else{
_4c7=new List();
new List(_4c5).each(function(_4c8){
var _4c9=null;
switch(typeof _4c8){
case "object":
_4c9=_4c8;
break;
case "string":
var _4ca=false;
if(_4c8.indexOf(":")>-1){
_4c8=_4c8.split(":")[0];
_4ca=true;
}
_4c9=Dialog._dialogButtons[_4c8];
if(_4ca){
_4c9.isDefault=true;
}
break;
}
_4c7.add(_4c9);
});
}
var _4cb={title:_4c3,text:text,type:type,image:this._dialogImages[type],buttons:_4c7};
var _4cc=new DialogViewDefinition({handle:"standarddialog:"+type,position:Dialog.MODAL,url:this._URL_STANDARDDIALOG,handler:_4c6,argument:_4cb});
StageBinding.presentViewDefinition(_4cc);
}};
var Dialog=new _Dialog();
function _Commands(){
this._construct();
}
_Commands.prototype={_URL_ABOUTDIALOG:"${root}/content/dialogs/about/about.aspx",_URL_PREFERENCES:"${root}/content/dialogs/preferences/preferences.aspx",_construct:function(){
var self=this;
EventBroadcaster.subscribe(BroadcastMessages.SAVE_ALL,{handleBroadcast:function(_4ce,arg){
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
},saveAll:function(_4d1){
var self=this;
var _4d3=Application.getDirtyDockTabsTabs();
if(_4d3.hasEntries()){
Dialog.invokeModal("${root}/content/dialogs/save/saveall.aspx",{handleDialogResponse:function(_4d4,_4d5){
switch(_4d4){
case Dialog.RESPONSE_ACCEPT:
self._handleSaveAllResult(_4d5,_4d1);
break;
case Dialog.RESPONSE_CANCEL:
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
break;
}
}},_4d3);
}else{
if(_4d1){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
},_handleSaveAllResult:function(_4d6,_4d7){
var _4d8=false;
var list=new List();
_4d6.each(function(name,tab){
if(tab!=false){
list.add(tab);
}
});
if(list.hasEntries()){
_4d8=true;
var _4dc=list.getLength();
var _4dd={handleBroadcast:function(_4de,tab){
if(--_4dc==0){
EventBroadcaster.unsubscribe(BroadcastMessages.DOCKTAB_CLEAN,this);
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
if(_4d7){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
}};
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,_4dd);
list.each(function(tab){
tab.saveContainedEditor();
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
}
return _4d8;
},systemLog:function(){
if(Application.isOperational){
StageBinding.handleViewPresentation("Composite.Management.SystemLog");
}else{
var win=window.open(Constants.APPROOT+"/content/views/dev/systemlog/systemlogoutput.html");
win.onload=function(){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMLOG_OPENED,this);
};
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
var _4e3=document.createEvent("Events");
_4e3.initEvent(type,true,true);
window.dispatchEvent(_4e3);
}else{
this._logger.warn("Prism methods should only be invoked in Prism! ("+type+")");
}
}};
var Prism=new _Prism();
ViewDefinition.DEFAULT_URL="${root}/blank.aspx";
ViewDefinition.clone=function(_4e4,_4e5){
var _4e6=null;
var _4e7=ViewDefinitions[_4e4];
if(_4e7.isMutable){
var impl=null;
if(_4e7 instanceof DialogViewDefinition){
impl=DialogViewDefinition;
}else{
impl=HostedViewDefinition;
}
if(_4e5!=null&&impl!=null){
var def=new impl();
for(var prop in _4e7){
def[prop]=_4e7[prop];
}
def.handle=_4e5;
_4e6=def;
}else{
throw "Cannot clone without newhandle";
}
}else{
throw "Cannot clone non-mutable definition";
}
return _4e6;
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
Binding.parseScriptStatement=function(_4f0,key){
if(_4f0&&key){
try{
var _4f2="UserInterface.getBindingByKey ( \""+key+"\" )";
_4f0=_4f0.replace(/(\W|^)this(,| +|\)|;)/g,_4f2);
_4f0=_4f0.replace(/(\W|^)this(\.)/g,_4f2+".");
}
catch(exception){
alert("exception");
}
}
return _4f0;
};
Binding.exists=function(_4f3){
var _4f4=false;
try{
if(_4f3&&_4f3.bindingElement&&_4f3.bindingElement.nodeType&&_4f3.isDisposed==false){
_4f4=true;
}
}
catch(accessDeniedException){
_4f4=false;
}
finally{
return _4f4;
}
};
Binding.destroy=function(_4f5){
if(!_4f5.isDisposed){
if(_4f5.acceptor!=null){
_4f5.acceptor.dispose();
}
if(_4f5.dragger!=null){
_4f5.disableDragging();
}
if(_4f5.boxObject!=null){
_4f5.boxObject.dispose();
}
if(_4f5._domEventHandlers!=null){
DOMEvents.cleanupEventListeners(_4f5);
}
for(var _4f6 in _4f5.shadowTree){
var _4f7=_4f5.shadowTree[_4f6];
if(_4f7 instanceof Binding&&Binding.exists(_4f7)){
_4f7.dispose(true);
}
_4f5.shadowTree[_4f6]=null;
}
_4f5.isDisposed=true;
_4f5=null;
}
};
Binding.dotnetify=function(_4f8,_4f9){
var _4fa=_4f8.getProperty("callbackid");
if(_4fa!=null){
var _4fb=DOMUtil.createElementNS(Constants.NS_XHTML,"input",_4f8.bindingDocument);
_4fb.type="hidden";
_4fb.id=_4fa;
_4fb.name=_4fa;
_4fb.value=_4f9!=null?_4f9:"";
_4f8.bindingElement.appendChild(_4fb);
_4f8.shadowTree.dotnetinput=_4fb;
}else{
throw _4f8.toString()+": Missing callback ID";
}
};
Binding.imageProfile=function(_4fc){
var _4fd=_4fc.getProperty("image");
var _4fe=_4fc.getProperty("image-hover");
var _4ff=_4fc.getProperty("image-active");
var _500=_4fc.getProperty("image-disabled");
if(_4fc.imageProfile==null){
if(_4fc.image==null&&_4fd!=null){
_4fc.image=_4fd;
}
if(_4fc.imageHover==null&&_4fe!=null){
_4fc.imageHover=_4fd;
}
if(_4fc.imageActive==null&&_4ff!=null){
_4fc.imageActive=_4ff;
}
if(_4fc.imageDisabled==null&&_500!=null){
_4fc.imageDisabled=_500;
}
if(_4fc.image||_4fc.imageHover||_4fc.imageActive||_4fc.imageDisabled){
_4fc.imageProfile=new ImageProfile(_4fc);
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
var _503=this.dependentBindings[key];
_503.onMemberInitialize(this);
}
}
this.isInitialized=true;
};
Binding.prototype.onMemberInitialize=function(_504){
if(_504){
this.memberDependencies[_504.key]=true;
var _505=true;
for(var key in this.memberDependencies){
if(this.memberDependencies[key]==false){
_505=false;
break;
}
}
if(_505){
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
Binding.prototype.detachRecursive=function(_507){
if(_507==null){
_507=false;
}
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement,!_507);
};
Binding.prototype.addMember=function(_508){
if(!this.isAttached){
throw "Cannot add members to unattached binding";
}else{
if(!_508.isInitialized){
if(!this.memberDependencies){
this.memberDependencies={};
}
this.memberDependencies[_508.key]=false;
_508.registerDependentBinding(this);
}
}
return _508;
};
Binding.prototype.addMembers=function(_509){
while(_509.hasNext()){
var _50a=_509.getNext();
if(!_50a.isInitialized){
this.addMember(_50a);
}
}
return _509;
};
Binding.prototype.registerDependentBinding=function(_50b){
if(!this.dependentBindings){
this.dependentBindings={};
}
this.dependentBindings[_50b.key]=_50b;
};
Binding.prototype._initializeBindingPersistanceFeatures=function(){
var _50c=this.getProperty("persist");
if(_50c&&Persistance.isEnabled){
var id=this.bindingElement.id;
if(!KeyMaster.hasKey(id)){
this._persist={};
var _50e=new List(_50c.split(" "));
while(_50e.hasNext()){
var prop=_50e.getNext();
var _510=Persistance.getPersistedProperty(id,prop);
if(_510!=null){
this._persist[prop]=_510;
this.setProperty(prop,_510);
}else{
_510=this.getProperty(prop);
if(_510!=null){
this._persist[prop]=_510;
}
}
}
}else{
throw "Persistable bindings must have a specified ID.";
}
}
};
Binding.prototype._initializeBindingGeneralFeatures=function(){
var _511=this.getProperty("disabled");
var _512=this.getProperty("contextmenu");
var _513=this.getProperty("observes");
var _514=this.getProperty("onattach");
var _515=this.getProperty("hidden");
var _516=this.getProperty("blockactionevents");
if(_515==true&&this.isVisible==true){
this.hide();
}
if(_511&&this.logger!=null){
this.logger.error("The 'disabled' property has been renamed 'isdisbaled'");
}
if(_512){
this.setContextMenu(_512);
}
if(_513){
this.observe(this.getBindingForArgument(_513));
}
if(_516==true){
this.isBlockingActions=true;
}
if(this.isActivationAware==true){
var root=UserInterface.getBinding(this.bindingDocument.body);
root.makeActivationAware(this);
this._hasActivationAwareness=true;
}
if(_514){
if(Client.isExplorer==true){
_514=Binding.parseScriptStatement(_514,this.key);
}
this.bindingWindow.eval(_514);
}
};
Binding.prototype._initializeBindingDragAndDropFeatures=function(){
var _518=this.getProperty("draggable");
var _519=this.getProperty("dragtype");
var _51a=this.getProperty("dragaccept");
var _51b=this.getProperty("dragreject");
if(_518!=null){
this.isDraggable=_518;
}
if(_519!=null){
this.dragType=_519;
if(_518!=false){
this.isDraggable=true;
}
}
if(_51a!=null){
this.dragAccept=_51a;
}
if(_51b!=null){
this.dragReject=_51b;
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
Binding.prototype._updateBindingMap=function(_51c){
try{
if(this.bindingWindow){
var id=this.bindingElement.id;
var map=this.bindingWindow.bindingMap;
var _51f=null;
if(_51c){
_51f=map[id];
if(_51f!=null&&_51f!=this){
var cry=this.toString()+" duplicate binding ID: "+id;
this.logger.error(cry);
if(Application.isDeveloperMode){
throw (cry);
}
}else{
map[id]=this;
}
}else{
_51f=map[id];
if(_51f!=null&&_51f==this){
delete map[id];
}
}
}else{
var _521=new String("Binding#_updateBindingMap odd dysfunction: "+this.toString()+": "+_51c);
if(Application.isDeveloperMode==true){
alert(_521);
}else{
this.logger.error(_521);
}
}
}
catch(exception){
this.logger.error(exception);
}
};
Binding.prototype.handleEvent=function(e){
};
Binding.prototype.handleAction=function(_523){
};
Binding.prototype.handleBroadcast=function(_524,arg){
};
Binding.prototype.handleElement=function(_526){
return false;
};
Binding.prototype.updateElement=function(_527){
return false;
};
Binding.prototype.getBindingForArgument=function(arg){
var _529=null;
switch(typeof arg){
case "object":
_529=arg;
break;
case "string":
_529=this.bindingDocument.getElementById(arg);
if(!_529){
if(Client.isExplorer){
arg=Binding.parseScriptStatement(arg,this.key);
}
_529=this.bindingWindow.WindowManager.evaluate(arg);
}
break;
}
if(_529!=null&&_529.nodeType!=null){
_529=UserInterface.getBinding(_529);
}
return _529;
};
Binding.prototype.serialize=function(){
var _52a={};
var id=this.bindingElement.id;
if(id&&id!=this.key){
_52a.id=id;
}
var _52c=this.getProperty("binding");
if(_52c){
_52a.binding=_52c;
}
if(!BindingSerializer.includeShadowTreeBindings){
var _52d=this.getAncestorBindingByLocalName("*");
if(_52d){
if(_52d.isShadowBinding){
this.isShadowBinding=true;
_52a=false;
}else{
var tree=_52d.shadowTree;
for(var key in tree){
var _530=tree[key];
if(_530==this){
this.isShadowBinding=true;
_52a=false;
}
}
}
}
}
return _52a;
};
Binding.prototype.serializeToString=function(_531){
var _532=null;
if(this.isAttached){
_532=new BindingSerializer().serializeBinding(this,_531);
}else{
throw "cannot serialize unattached binding";
}
return _532;
};
Binding.prototype.subTreeFromString=function(_533){
this.detachRecursive();
this.bindingElement.innerHTML=_533;
this.attachRecursive();
};
Binding.prototype.getProperty=function(_534){
var _535=this.bindingElement.getAttribute(_534);
if(_535){
_535=Types.castFromString(_535);
}
return _535;
};
Binding.prototype.setProperty=function(prop,_537){
if(_537!=null){
_537=_537.toString();
if(String(this.bindingElement.getAttribute(prop))!=_537){
this.bindingElement.setAttribute(prop,_537);
if(this.isAttached==true){
if(Persistance.isEnabled&&_537!=null){
if(this._persist!=null&&this._persist[prop]){
this._persist[prop]=_537;
Persistance.setPersistedProperty(this.bindingElement.id,prop,_537);
}
}
var _538=this.propertyMethodMap[prop];
if(_538){
_538.call(this,this.getProperty(prop));
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
return this.bindingElement.id;
};
Binding.prototype.attachClassName=function(_53a){
CSSUtil.attachClassName(this.bindingElement,_53a);
};
Binding.prototype.detachClassName=function(_53b){
CSSUtil.detachClassName(this.bindingElement,_53b);
};
Binding.prototype.hasClassName=function(_53c){
return CSSUtil.hasClassName(this.bindingElement,_53c);
};
Binding.prototype.addActionListener=function(type,_53e){
_53e=_53e!=null?_53e:this;
if(Action.isValid(type)){
if(Interfaces.isImplemented(IActionListener,_53e)){
if(!this.actionListeners[type]){
this.actionListeners[type]=[];
}
this.actionListeners[type].push(_53e);
}else{
throw new Error("Could not add action-event listener. Method handleAction not implemented.");
}
}else{
alert(this+"\nCould not add undefined Action ("+_53e+")");
}
};
Binding.prototype.removeActionListener=function(type,_540){
_540=_540?_540:this;
if(Action.isValid(type)){
var _541=this.actionListeners[type];
if(_541){
var i=0,_543;
while((_543=_541[i])!=null){
if(_543==_540){
_541.splice(i,1);
break;
}
i++;
}
}
}
};
Binding.prototype.addEventListener=function(type,_545){
_545=_545?_545:this;
DOMEvents.addEventListener(this.bindingElement,type,_545);
};
Binding.prototype.removeEventListener=function(type,_547){
_547=_547?_547:this;
DOMEvents.removeEventListener(this.bindingElement,type,_547);
};
Binding.prototype.subscribe=function(_548){
if(!this.hasSubscription(_548)){
this._subscriptions.set(_548,true);
EventBroadcaster.subscribe(_548,this);
}else{
this.logger.error("Dubplicate subscription aborted:"+_548);
}
};
Binding.prototype.unsubscribe=function(_549){
if(this.hasSubscription(_549)){
this._subscriptions.del(_549);
EventBroadcaster.unsubscribe(_549,this);
}
};
Binding.prototype.hasSubscription=function(_54a){
return this._subscriptions.has(_54a);
};
Binding.prototype.observe=function(_54b,_54c){
_54b.addObserver(this,_54c);
};
Binding.prototype.unObserve=function(_54d,_54e){
_54d.removeObserver(this,_54e);
};
Binding.prototype.setContextMenu=function(arg){
this.contextMenuBinding=this.getBindingForArgument(arg);
if(this.contextMenuBinding){
var self=this;
var menu=this.contextMenuBinding;
this.addEventListener(DOMEvents.CONTEXTMENU,{handleEvent:function(e){
if(Interfaces.isImplemented(IActionListener,self)==true){
var _553={handleAction:function(){
menu.removeActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.removeActionListener(PopupBinding.ACTION_HIDE,_553);
}};
menu.addActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.addActionListener(PopupBinding.ACTION_HIDE,_553);
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
var _555=null;
var _556=null;
var _557=false;
if(arg instanceof Action){
_555=arg;
}else{
if(Action.isValid(arg)){
_555=new Action(this,arg);
_557=true;
}
}
if(_555!=null&&Action.isValid(_555.type)==true){
if(_555.isConsumed==true){
_556=_555;
}else{
var _558=this.actionListeners[_555.type];
if(_558!=null){
_555.listener=this;
var i=0,_55a;
while((_55a=_558[i++])!=null){
if(_55a&&_55a.handleAction){
_55a.handleAction(_555);
}
}
}
var _55b=true;
if(this.isBlockingActions==true){
switch(_555.type){
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FORCE_REFLEX:
case DockTabBinding.ACTION_UPDATE_VISUAL:
case PageBinding.ACTION_DOPOSTBACK:
break;
default:
if(!_557){
_55b=false;
}
break;
}
}
if(_55b){
_556=this.migrateAction(_555);
}else{
_556=_555;
}
}
}
return _556;
};
Binding.prototype.migrateAction=function(_55c){
var _55d=null;
var _55e=null;
var node=this.getMigrationParent();
if(node){
while(node&&!_55d&&node.nodeType!=Node.DOCUMENT_NODE){
_55d=UserInterface.getBinding(node);
node=node.parentNode;
}
if(_55d){
_55e=_55d.dispatchAction(_55c);
}else{
_55e=_55c;
}
}
return _55e;
};
Binding.prototype.reflex=function(_560){
if(Application.isOperational==true){
FlexBoxBinding.reflex(this,_560);
}
};
Binding.prototype.getMigrationParent=function(){
var _561=null;
if(true){
try{
var _562=this.bindingElement.parentNode;
if(_562!=null){
_561=_562;
}
}
catch(wtfException){
this.logger.error("Binding#getMigrationParent exception");
SystemDebug.stack(arguments,20);
_561=null;
}
}
return _561;
};
Binding.prototype.add=function(_563){
if(_563.bindingDocument==this.bindingDocument){
this.bindingElement.appendChild(_563.bindingElement);
}else{
throw "Could not add "+_563.toString()+" of different document origin.";
}
return _563;
};
Binding.prototype.addFirst=function(_564){
if(_564.bindingDocument==this.bindingDocument){
this.bindingElement.insertBefore(_564.bindingElement,this.bindingElement.firstChild);
}else{
throw "Could not add "+_564.toString()+" of different document origin.";
}
return _564;
};
Binding.prototype.getAncestorBindingByLocalName=function(_565,_566){
return BindingFinder.getAncestorBindingByLocalName(this,_565,_566);
};
Binding.prototype.getAncestorBindingByType=function(impl,_568){
return BindingFinder.getAncestorBindingByType(this,impl,_568);
};
Binding.prototype.getChildBindingByType=function(impl){
return BindingFinder.getChildBindingByType(this,impl);
};
Binding.prototype.getChildElementsByLocalName=function(_56a){
return BindingFinder.getChildElementsByLocalName(this,_56a);
};
Binding.prototype.getChildElementByLocalName=function(_56b){
return this.getChildElementsByLocalName(_56b).getFirst();
};
Binding.prototype.getDescendantElementsByLocalName=function(_56c){
return new List(DOMUtil.getElementsByTagName(this.bindingElement,_56c));
};
Binding.prototype.getChildBindingsByLocalName=function(_56d){
return this.getDescendantBindingsByLocalName(_56d,true);
};
Binding.prototype.getChildBindingByLocalName=function(_56e){
return this.getChildBindingsByLocalName(_56e).getFirst();
};
Binding.prototype.getDescendantBindingsByLocalName=function(_56f,_570){
return BindingFinder.getDescendantBindingsByLocalName(this,_56f,_570);
};
Binding.prototype.getDescendantBindingByLocalName=function(_571){
return this.getDescendantBindingsByLocalName(_571,false).getFirst();
};
Binding.prototype.getDescendantBindingsByType=function(impl){
return BindingFinder.getDescendantBindingsByType(this,impl);
};
Binding.prototype.getDescendantBindingByType=function(impl){
return BindingFinder.getDescendantBindingByType(this,impl);
};
Binding.prototype.getNextBindingByLocalName=function(_574){
return BindingFinder.getNextBindingByLocalName(this,_574);
};
Binding.prototype.getPreviousBindingByLocalName=function(_575){
return BindingFinder.getPreviousBindingByLocalName(this,_575);
};
Binding.prototype.getBindingElement=function(){
return this.bindingDocument.getElementById(this.bindingElement.id);
};
Binding.prototype.getOrdinalPosition=function(_576){
return DOMUtil.getOrdinalPosition(this.bindingElement,_576);
};
Binding.prototype.isFirstBinding=function(_577){
return (this.getOrdinalPosition(_577)==0);
};
Binding.prototype.isLastBinding=function(_578){
return DOMUtil.isLastElement(this.bindingElement,_578);
};
Binding.prototype.dispose=function(_579){
if(!this.isDisposed){
if(!_579){
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement);
var _57a=this.bindingDocument.getElementById(this.bindingElement.id);
if(_57a){
if(Client.isExplorer){
_57a.outerHTML="";
}else{
_57a.parentNode.removeChild(_57a);
}
}
}else{
if(this._subscriptions.hasEntries()){
var self=this;
var list=new List();
this._subscriptions.each(function(_57d){
list.add(_57d);
});
list.each(function(_57e){
self.unsubscribe(_57e);
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
Binding.prototype.wakeUp=function(_580,_581){
_581=_581?_581:Binding.SNOOZE;
if(this.isLazy==true){
this.deleteProperty("lazy");
this.isLazy=false;
Application.lock(this);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
var self=this;
setTimeout(function(){
self.attachRecursive();
setTimeout(function(){
if(_580){
self[_580]();
}
Application.unlock(self);
},_581);
},0);
LazyBindingBinding.wakeUp(this);
}
};
Binding.prototype.handleCrawler=function(_583){
if(_583.response==null&&this.isLazy==true){
if(_583.id==DocumentCrawler.ID&&_583.mode==DocumentCrawler.MODE_REGISTER){
_583.response=NodeCrawler.NORMAL;
}else{
_583.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_583.response==null&&this.crawlerFilters!=null){
if(this.crawlerFilters.has(_583.id)){
_583.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_583.response==null){
switch(_583.id){
case FlexBoxCrawler.ID:
if(!this.isVisible){
_583.response=NodeCrawler.SKIP_CHILDREN;
}
break;
case FocusCrawler.ID:
if(!this.isVisible){
_583.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
}
};
Binding.newInstance=function(_584){
var _585=DOMUtil.createElementNS(Constants.NS_UI,"ui:binding",_584);
return UserInterface.registerBinding(_585,Binding);
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
var _586=new List(ConfigurationService.GetValidatingRegularExpressions("dummy"));
_586.each(function(_587){
DataBinding.expressions[_587.Key]=new RegExp(_587.Value);
});
}});
DataBinding.expressions={};
DataBinding.warnings={"required":"Required","number":"Numbers only","integer":"Integers only","programmingidentifier":"Invalid identifier","programmingnamespace":"Invalid namespace","url":"Invalid URL","minlength":"${count} characters minimum","maxlength":"${count} characters maximum","currency":"Invalid notation","email":"Invalid e-mail","guid":"Invalid GUID"};
DataBinding.errors={"programmingidentifier":"An identifier must not contain spaces or special characters. Only characters a-z, A-Z and 0-9 are allowed. An identifier must begin with a letter (not a number).","programmingnamespace":"A namespace must take the form Example.Name.Space where only characters a-z, A-Z, 0-9 and dots (.) are allowed. Each part of the namespace must begin with a letter (not a number).","url":"A valid URL must begin with a forward slash, designating the site root, or an URL scheme name such as http://. Simpliefied addresses such as www.example.com cannot be resolved reliably by the browser. Relative URLs are not supported."};
DataBinding.getAssociatedLabel=function(_588){
var _589=null;
var _58a=_588.getAncestorBindingByLocalName("field");
if(_58a&&_58a instanceof FieldBinding){
var desc=_58a.getDescendantBindingByLocalName("fielddesc");
if(desc&&desc instanceof FieldDescBinding){
_589=desc.getLabel();
}
}
return _589;
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
if(!name){
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
var _58d=this.bindingWindow.DataManager;
_58d.unRegisterDataBinding(this._name);
};
DataBinding.prototype.setName=function(name){
var _58f=this.bindingWindow.DataManager;
if(_58f.getDataBinding(name)){
_58f.unRegisterDataBinding(name);
}
_58f.registerDataBinding(name,this);
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
RootBinding.prototype.handleBroadcast=function(_590,arg){
RootBinding.superclass.handleBroadcast.call(this,_590,arg);
var _592=this.bindingWindow.WindowManager.WINDOW_EVALUATED_BROADCAST;
switch(_590){
case _592:
this.dispatchAction(RootBinding.ACTION_PHASE_1);
this.dispatchAction(RootBinding.ACTION_PHASE_2);
this.dispatchAction(RootBinding.ACTION_PHASE_3);
this.unsubscribe(_592);
break;
}
};
RootBinding.prototype.onActivate=function(){
this._onActivationChanged(true);
};
RootBinding.prototype.onDeactivate=function(){
this._onActivationChanged(false);
};
RootBinding.prototype._onActivationChanged=function(_593){
var _594=_593?RootBinding.ACTION_ACTIVATED:RootBinding.ACTION_DEACTIVATED;
if(_593!=this.isActivated){
this.isActivated=_593;
this.dispatchAction(_594);
var _595=new List();
var self=this;
this._activationawares.each(function(_597){
if(_597.isActivationAware){
try{
if(_593){
if(!_597.isActivated){
_597.onActivate();
}
}else{
if(_597.isActivated){
_597.onDeactivate();
}
}
}
catch(exception){
self.logger.error(exception);
_595.add(_597);
}
}
});
_595.each(function(_598){
this._activationawares.del(_598);
});
_595.dispose();
}else{
var _599="Activation dysfunction: "+this.bindingDocument.title;
if(Application.isDeveloperMode==true){
this.logger.error(_599);
}else{
this.logger.error(_599);
}
}
};
RootBinding.prototype.makeActivationAware=function(_59a,_59b){
if(Interfaces.isImplemented(IActivationAware,_59a,true)==true){
if(_59b==false){
this._activationawares.del(_59a);
}else{
this._activationawares.add(_59a);
if(this.isActivated==true){
_59a.onActivate();
}
}
}else{
if(Application.isDeveloperMode==true){
alert("RootBinding: IActivationAware not implemented ("+_59a+")");
}
}
};
RootBinding.prototype._setupActivationAwareness=function(_59c){
var _59d=this.getMigrationParent();
if(_59d!=null){
var root=_59d.ownerDocument.body;
var _59f=UserInterface.getBinding(root);
if(_59f!=null){
_59f.makeActivationAware(this,_59c);
}
}
};
RootBinding.prototype.handleCrawler=function(_5a0){
RootBinding.superclass.handleCrawler.call(this,_5a0);
if(_5a0.type==NodeCrawler.TYPE_ASCENDING){
_5a0.nextNode=this.bindingWindow.frameElement;
}
};
RootBinding.prototype.getMigrationParent=function(){
var _5a1=null;
if(this.bindingWindow.parent){
_5a1=this.bindingWindow.frameElement;
}
return _5a1;
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
if(this.hasMatrix==true){
if(this.isBindingBuild==true){
this.shadowTree.table=this._getBuildElement("matrixtable");
}else{
if(this.bindingElement.hasChildNodes()){
throw new Error("MatrixBinding: No support for childnodes!");
}else{
this.bindingElement.innerHTML=Templates.getTemplateElementText(this.template);
this.shadowTree.table=this.bindingElement.firstChild;
}
}
}
};
MatrixBinding.prototype._indexTable=function(){
var _5a2=new List(DOMUtil.getElementsByTagName(this.bindingElement,"td"));
while(_5a2.hasNext()){
var cell=_5a2.getNext();
this.shadowTree[cell.className]=cell;
}
};
MatrixBinding.prototype.add=function(_5a4){
var _5a5=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
this.shadowTree[MatrixBinding.CENTER].appendChild(_5a4.bindingElement);
_5a5=_5a4;
}else{
_5a5=MatrixBinding.superclass.add.call(this,_5a4);
}
return _5a5;
};
MatrixBinding.prototype.addFirst=function(_5a6){
var _5a7=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
var _5a8=this.shadowTree[MatrixBinding.CENTER];
_5a8.insertBefore(_5a6.bindingElement,_5a8.firstChild);
_5a7=_5a6;
}else{
_5a7=MatrixBinding.superclass.addFirst.call(this,_5a6);
}
return _5a6;
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
MatrixBinding.newInstance=function(_5aa){
var _5ab=DOMUtil.createElementNS(Constants.NS_UI,"ui:matrix",_5aa);
return UserInterface.registerBinding(_5ab,MatrixBinding);
};
FlexBoxBinding.prototype=new Binding;
FlexBoxBinding.prototype.constructor=FlexBoxBinding;
FlexBoxBinding.superclass=Binding.prototype;
FlexBoxBinding.CLASSNAME="flexboxelement";
FlexBoxBinding.TIMEOUT=250;
FlexBoxBinding.reflex=function(_5ac,_5ad){
var list=new List();
var _5af=new FlexBoxCrawler();
_5af.mode=_5ad?FlexBoxCrawler.MODE_FORCE:FlexBoxCrawler.MODE_NORMAL;
_5af.startBinding=_5ac;
_5af.crawl(_5ac.bindingElement,list);
list.each(function(_5b0){
_5b0.flex();
_5b0.isFlexSuspended=true;
});
if(Client.isExplorer){
setTimeout(function(){
list.each(function(_5b1){
_5b1.flex();
});
},0.5*FlexBoxBinding.TIMEOUT);
}
setTimeout(function(){
list.each(function(_5b2){
_5b2.isFlexSuspended=false;
});
list.dispose();
},FlexBoxBinding.TIMEOUT);
_5af.dispose();
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
FlexBoxBinding.prototype._getSiblingsSpan=function(_5b3){
var _5b4=0;
var _5b5=new List(this.bindingElement.parentNode.childNodes);
while(_5b5.hasNext()){
var _5b6=_5b5.getNext();
if(_5b6.nodeType==Node.ELEMENT_NODE&&_5b6!=this.bindingElement){
if(!this._isOutOfFlow(_5b6)){
var rect=_5b6.getBoundingClientRect();
if(_5b3){
height+=(rect.right-rect.left);
}else{
_5b4+=(rect.bottom-rect.top);
}
}
}
}
return _5b4;
};
FlexBoxBinding.prototype._isOutOfFlow=function(_5b8){
var _5b9=CSSComputer.getPosition(_5b8);
var _5ba=CSSComputer.getFloat(_5b8);
return (_5b9=="absolute"||_5ba!="none"?true:false);
};
FlexBoxBinding.prototype._getCalculatedHeight=function(){
var _5bb=this.bindingElement.parentNode;
var rect=_5bb.getBoundingClientRect();
var _5bd=rect.bottom-rect.top;
var _5be=CSSComputer.getPadding(_5bb);
var _5bf=CSSComputer.getBorder(_5bb);
_5bd-=(_5be.top+_5be.bottom);
_5bd-=(_5bf.top+_5bf.bottom);
return _5bd;
};
FlexBoxBinding.prototype._getCalculatedWidth=function(){
var _5c0=this.bindingElement.parentNode;
var rect=_5c0.getBoundingClientRect();
var _5c2=rect.right-rect.left;
var _5c3=CSSComputer.getPadding(_5c0);
var _5c4=CSSComputer.getBorder(_5c0);
_5c2-=(_5c3.left+_5c3.right);
_5c2-=(_5c4.left+_5c4.right);
return _5c2;
};
FlexBoxBinding.prototype.setFlexibility=function(_5c5){
if(_5c5!=this.isFlexible){
if(_5c5){
this.attachClassName(FlexBoxBinding.CLASSNAME);
this.deleteProperty("flex");
}else{
this.detachClassName(FlexBoxBinding.CLASSNAME);
this.setProperty("flex",false);
}
this.isFlexible=_5c5;
}
};
FlexBoxBinding.prototype.flex=function(){
if(this.isFlexible==true){
var _5c6=this._getSiblingsSpan();
_5c6=this._getCalculatedHeight()-_5c6;
if(!isNaN(_5c6)&&_5c6>=0){
if(_5c6!=this.bindingElement.offsetHeight){
this.bindingElement.style.height=String(_5c6)+"px";
}
}
}
};
FlexBoxBinding.prototype.handleAction=function(_5c7){
FlexBoxBinding.superclass.handleAction.call(this,_5c7);
switch(_5c7.type){
case Binding.ACTION_UPDATED:
this.isFit=false;
break;
}
};
FlexBoxBinding.prototype.fit=function(_5c8){
if(!this.isFit||_5c8){
var _5c9=0;
new List(this.bindingElement.childNodes).each(function(_5ca){
if(_5ca.nodeType==Node.ELEMENT_NODE){
var rect=_5ca.getBoundingClientRect();
_5c9+=(rect.bottom-rect.top);
}
});
if(_5c9>this._getFitnessHeight()){
this._setFitnessHeight(_5c9);
}
this.isFit=true;
}
};
FlexBoxBinding.prototype._getFitnessHeight=function(){
var _5cc=CSSComputer.getPadding(this.bindingElement);
var _5cd=CSSComputer.getBorder(this.bindingElement);
var _5ce=this.bindingElement.offsetHeight;
_5ce+=_5cc.top+_5cc.bottom;
_5ce+=_5cd.top+_5cd.bottom;
return _5ce;
};
FlexBoxBinding.prototype._setFitnessHeight=function(_5cf){
var _5d0=CSSComputer.getPadding(this.bindingElement);
var _5d1=CSSComputer.getBorder(this.bindingElement);
_5cf+=_5d0.top+_5d0.bottom;
_5cf+=_5d1.top+_5d1.bottom;
this.bindingElement.style.height=_5cf+"px";
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
ScrollBoxBinding.prototype.handleAction=function(_5d2){
ScrollBoxBinding.superclass.handleAction.call(this,_5d2);
switch(_5d2.type){
case BalloonBinding.ACTION_INITIALIZE:
_5d2.consume();
break;
}
};
ScrollBoxBinding.prototype.setPosition=function(_5d3){
this.bindingElement.scrollLeft=_5d3.x;
this.bindingElement.scrollTop=_5d3.y;
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
var _5d4=this._getBuildElement("labeltext");
if(_5d4){
this.shadowTree.labelText=_5d4;
this.shadowTree.text=_5d4.firstChild;
this.hasLabel=true;
}
}else{
var _5d5=this.getProperty("label");
var _5d6=this.getProperty("image");
var _5d7=this.getProperty("tooltip");
if(_5d5){
this.setLabel(_5d5,false);
}
if(_5d6){
this.setImage(_5d6,false);
}
if(_5d7){
this.setToolTip(_5d7);
}
this.buildClassName();
}
};
LabelBinding.prototype.setLabel=function(_5d8,_5d9){
_5d8=_5d8?_5d8:"";
if(!this.hasLabel){
this.buildLabel();
}
this.shadowTree.text.data=Resolver.resolve(_5d8);
this.setProperty("label",_5d8);
if(!_5d9){
this.buildClassName();
}
};
LabelBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
LabelBinding.prototype.setImage=function(url,_5db){
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
if(!_5db){
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
LabelBinding.prototype.setToolTip=function(_5de){
this.setProperty("tooltip",_5de);
if(_5de!=this.getLabel()){
this.setProperty("title",Resolver.resolve(_5de));
}
};
LabelBinding.prototype.getToolTip=function(_5df){
return this.getProperty("tooltip");
};
LabelBinding.prototype.flip=function(_5e0){
_5e0=_5e0==null?true:_5e0;
var _5e1=LabelBinding.CLASSNAME_FLIPPED;
if(!Client.isExplorer6){
this.isFlipped=_5e0;
if(_5e0){
this.attachClassName(_5e1);
}else{
this.detachClassName(_5e1);
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
var _5e2="textonly";
var _5e3="imageonly";
var _5e4="both";
if(this.hasLabel&&this.hasImage){
this.detachClassName(_5e2);
this.detachClassName(_5e3);
this.attachClassName(_5e4);
}else{
if(this.hasLabel){
this.detachClassName(_5e4);
this.detachClassName(_5e3);
this.attachClassName(_5e2);
}else{
if(this.hasImage){
this.detachClassName(_5e4);
this.detachClassName(_5e2);
this.attachClassName(_5e3);
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
LabelBinding.newInstance=function(_5e5){
var _5e6=DOMUtil.createElementNS(Constants.NS_UI,"ui:labelbox",_5e5);
return UserInterface.registerBinding(_5e6,LabelBinding);
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
var _5e7=this.getProperty("label");
if(!_5e7){
_5e7=DOMUtil.getTextContent(this.bindingElement);
}
var text=this.bindingDocument.createTextNode(Resolver.resolve(_5e7));
this.bindingElement.parentNode.replaceChild(text,this.bindingElement);
this.dispose();
};
TextBinding.prototype.setLabel=function(_5e9){
this.setProperty("label",_5e9);
};
TextBinding.newInstance=function(_5ea){
var _5eb=DOMUtil.createElementNS(Constants.NS_UI,"ui:text",_5ea);
return UserInterface.registerBinding(_5eb,TextBinding);
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
BroadcasterBinding.prototype.setProperty=function(_5ec,_5ed){
BroadcasterBinding.superclass.setProperty.call(this,_5ec,_5ed);
function update(list){
if(list){
list.each(function(_5ef){
_5ef.setProperty(_5ec,_5ed);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _5f0=this._observers[_5ec];
if(_5f0){
update(_5f0);
}
};
BroadcasterBinding.prototype.deleteProperty=function(_5f1){
BroadcasterBinding.superclass.deleteProperty.call(this,_5f1);
function update(list){
if(list){
list.each(function(_5f3){
_5f3.deleteProperty(_5f1);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _5f4=this._observers[_5f1];
if(_5f4){
update(_5f4);
}
};
BroadcasterBinding.prototype.addObserver=function(_5f5,_5f6){
_5f6=_5f6?_5f6:"*";
_5f6=new List(_5f6.split(" "));
while(_5f6.hasNext()){
var _5f7=_5f6.getNext();
switch(_5f7){
case "*":
this._setAllProperties(_5f5);
break;
default:
var _5f8=this.getProperty(_5f7);
_5f5.setProperty(_5f7,_5f8);
break;
}
if(!this._observers[_5f7]){
this._observers[_5f7]=new List();
}
this._observers[_5f7].add(_5f5);
}
};
BroadcasterBinding.prototype._setAllProperties=function(_5f9){
var atts=new List(this.bindingElement.attributes);
while(atts.hasNext()){
var att=atts.getNext();
if(att.specified){
var _5fc=att.nodeName;
switch(_5fc){
case "id":
case "key":
break;
default:
var _5fd=this.getProperty(_5fc);
_5f9.setProperty(_5fc,_5fd);
break;
}
}
}
};
BroadcasterBinding.prototype.removeObserver=function(_5fe,_5ff){
_5ff=_5ff?_5ff:"*";
_5ff=new List(_5ff.split(" "));
while(_5ff.hasNext()){
var list=this._observers[_5ff.getNext()];
if(list){
while(list.hasNext()){
var _601=list.getNext();
if(_601==_5fe){
list.del(_601);
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
BroadcasterBinding.prototype.setDisabled=function(_602){
this.setProperty("isdisabled",_602);
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
this.crawlerFilters=new List([DocumentCrawler.ID,FlexBoxCrawler.ID,FocusCrawler.ID]);
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
var _604=this.getProperty("width");
var _605=this.getProperty("label");
var type=this.getProperty("type");
var _607=this.getProperty("popup");
var _608=this.getProperty("tooltip");
var _609=this.getProperty("isdisabled");
var _60a=this.getProperty("response");
var _60b=this.getProperty("oncommand");
var _60c=this.getProperty("value");
var _60d=this.getProperty("checked");
var _60e=this.getProperty("callbackid");
var _60f=this.getProperty("focusable");
var _610=this.getProperty("focused");
var _611=this.getProperty("default");
var url=this.getProperty("url");
var _613=this.getProperty("flip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.add(this.labelBinding);
this.labelBinding.attach();
this.shadowTree.labelBinding=this.labelBinding;
if(_613){
this.flip(true);
}
if(!this._stateManager){
this._stateManager=new ButtonStateManager(this);
}
if(this.imageProfile!=null&&this.imageProfile.getDefaultImage()!=null){
this.setImage(this.imageProfile.getDefaultImage());
}
if(_605!=null){
this.setLabel(_605);
}
if(type!=null){
this.setType(type);
}
if(_608!=null){
this.setToolTip(_608);
}
if(_604!=null){
this.setWidth(_604);
}
if(_607!=null){
this.setPopup(_607);
}
if(_60a!=null){
this.response=_60a;
}
if(_60d==true){
if(this.isCheckButton||this.isRadioButton){
this.check(true);
}
}
if(_60b!=null&&this.oncommand==null){
if(Client.isExplorer==true){
_60b=Binding.parseScriptStatement(_60b,this.key);
}
this.oncommand=function(){
this.bindingWindow.eval(_60b);
};
}
if(_60f||this.isFocusable){
this._makeFocusable();
if(_611||this.isDefault){
this.isDefault=true;
}
if(_610){
this.focus();
}
}
if(_609==true){
this.disable();
}
if(url!=null){
this.setURL(url);
}
if(_60e!=null){
if(_60c!=null){
Binding.dotnetify(this,_60c);
}
if(this.oncommand==null){
this.oncommand=function(){
this.dirty();
this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
};
}
}
};
ButtonBinding.prototype._makeFocusable=function(){
this.isFocusable=true;
this.attachClassName(ButtonBinding.CLASSNAME_FOCUSABLE);
this._isFocusableButton=true;
};
ButtonBinding.prototype.setImage=function(_614){
if(this.isAttached){
this.labelBinding.setImage(_614);
}
this.setProperty("image",_614);
};
ButtonBinding.prototype.getImage=function(){
return this.getProperty("image");
};
ButtonBinding.prototype.setLabel=function(_615){
if(this.isAttached){
this.labelBinding.setLabel(_615);
}
this.setProperty("label",_615);
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
ButtonBinding.prototype.setToolTip=function(_617){
this.setProperty("tooltip",_617);
if(this.isAttached==true){
this.setProperty("title",Resolver.resolve(_617));
}
};
ButtonBinding.prototype.getToolTip=function(){
return this.getProperty("tooltip");
};
ButtonBinding.prototype.setImageProfile=function(_618){
this.imageProfile=new _618(this);
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
ButtonBinding.prototype.flip=function(_61d){
_61d=_61d==null?true:_61d;
this.isFlipped=_61d;
this.setProperty("flip",_61d);
if(this.isAttached){
this.labelBinding.flip(_61d);
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
ButtonBinding.prototype.check=function(_61e){
if((this.isCheckButton||this.isRadioButton)&&!this.isChecked){
if(this.isAttached==true){
this._check();
if(!_61e==true){
this.fireCommand();
}
}
this.setProperty("checked",true);
}
};
ButtonBinding.prototype._check=function(_61f){
this.isActive=true;
this.isChecked=true;
if(!_61f){
this._stateManager.invokeActiveState();
}
};
ButtonBinding.prototype.uncheck=function(_620){
if((this.isCheckButton||this.isRadioButton)&&this.isChecked){
if(this.isAttached==true){
this._uncheck();
if(!_620==true){
this.fireCommand();
}
}
this.setProperty("checked",false);
}
};
ButtonBinding.prototype._uncheck=function(_621){
this.isActive=false;
this.isChecked=false;
if(!_621){
this._stateManager.invokeNormalState();
}
};
ButtonBinding.prototype.setChecked=function(_622,_623){
if(_622==null){
_622==false;
}
if(this.isCheckButton||this.isRadioButton){
switch(_622){
case true:
this.check(_623);
break;
case false:
this.uncheck(_623);
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
var _625=this.getProperty("tooltip");
if(_625){
this.setToolTip(_625);
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
var _626=null;
if(this.isAttached==true){
this.labelBinding.bindingElement.style.marginLeft="0";
this.labelBinding.bindingElement.style.marginRight="0";
_626=this.labelBinding.bindingElement.offsetWidth;
}else{
throw "ButtonBinding: getEqualSizeWidth failed for non-attached button.";
}
return _626;
};
ButtonBinding.prototype.setEqualSizeWidth=function(goal){
if(this.isAttached==true){
var _628=this.getEqualSizeWidth();
if(goal>_628){
var diff=goal-_628;
var marg=Math.floor(diff*0.5);
this.labelBinding.bindingElement.style.marginLeft=marg+"px";
this.labelBinding.bindingElement.style.marginRight=marg+"px";
}
}
};
ButtonBinding.prototype.getWidth=function(){
var _62b=null;
if(this.isAttached==true){
var _62c=CSSComputer.getPadding(this.bindingElement);
var _62d=CSSComputer.getPadding(this.bindingElement);
_62b=this.shadowTree.c.offsetWidth+this.shadowTree.e.offsetWidth+this.shadowTree.w.offsetWidth;
_62b=_62b+_62c.left+_62c.right;
_62b=_62b+_62d.left+_62d.right;
}else{
throw "ButtonBinding: getWidth failed for non-attached button.";
}
return _62b;
};
ButtonBinding.prototype.setWidth=function(_62e){
if(this.isAttached==true){
var _62f=this.shadowTree.e.offsetWidth+this.shadowTree.w.offsetWidth;
var _630=CSSComputer.getPadding(this.shadowTree.c);
var _631=_62e-_62f;
_631=_631-_630.left-_630.right;
this.shadowTree.c.style.width=String(_631)+"px";
if(this.getProperty("centered")){
this.labelBinding.bindingElement.style.marginLeft=String(0.5*(_631-this.labelBinding.bindingElement.offsetWidth))+"px";
}
}
this.setProperty("width",_62e);
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
ButtonBinding.prototype.setValue=function(_632){
this.shadowTree.dotnetinput.value=_632;
};
ButtonBinding.prototype.getResult=function(){
return this.getValue();
};
ButtonBinding.prototype.setResult=function(_633){
this.setValue(_633);
};
ButtonStateManager.STATE_NORMAL=0;
ButtonStateManager.STATE_HOVER=1;
ButtonStateManager.STATE_ACTIVE=2;
ButtonStateManager.RIGHT_BUTTON=2;
function ButtonStateManager(_634){
this.logger=SystemLogger.getLogger("ButtonStateManager");
this.binding=_634;
this.imageProfile=_634.imageProfile;
this.assignDOMEvents(true);
}
ButtonStateManager.prototype.assignDOMEvents=function(_635){
var _636=_635?"addEventListener":"removeEventListener";
this.binding[_636](DOMEvents.MOUSEENTER,this);
this.binding[_636](DOMEvents.MOUSELEAVE,this);
this.binding[_636](DOMEvents.MOUSEDOWN,this);
this.binding[_636](DOMEvents.MOUSEUP,this);
};
ButtonStateManager.prototype.dispose=function(){
this.assignDOMEvents(false);
this.binding=null;
this.imageProfile=null;
};
ButtonStateManager.prototype.handleEvent=function(e){
if(Binding.exists(this.binding)&&!this.binding.isDisabled&&!BindingDragger.isDragging){
var _638=false,_639=null;
if(e.button==ButtonStateManager.RIGHT_BUTTON){
}else{
if(this.binding.isCheckBox){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_639=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_639=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_639=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSEUP:
this.binding.isChecked=!this.binding.isChecked;
_639=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_639==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_638=true;
break;
}
}else{
if(this.binding.isCheckButton||this.binding.isRadioButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
if(!this.binding.isChecked){
_639=ButtonStateManager.STATE_HOVER;
}
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
if(!this.binding.isChecked){
_639=ButtonStateManager.STATE_NORMAL;
}
break;
case DOMEvents.MOUSEDOWN:
_639=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
if(this.binding.isCheckButton||!this.binding.isChecked){
this.binding.isChecked=!this.binding.isChecked;
_639=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_639==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_638=true;
}
break;
}
}else{
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_639=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_639=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_639=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_639=ButtonStateManager.STATE_NORMAL;
_638=true;
break;
}
}
}
}
switch(_639){
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
if(_638){
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
var _63d=this.imageProfile.getDisabledImage();
if(_63d){
this.binding.setImage(_63d);
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
ClickButtonBinding.newInstance=function(_63e){
var _63f=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_63e);
return UserInterface.registerBinding(_63f,ClickButtonBinding);
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
RadioButtonBinding.newInstance=function(_640){
var _641=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiobutton",_640);
return UserInterface.registerBinding(_641,RadioButtonBinding);
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
CheckButtonBinding.newInstance=function(_642){
var _643=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbutton",_642);
return UserInterface.registerBinding(_643,CheckButtonBinding);
};
CheckButtonImageProfile.IMG_DEFAULT="${skin}/buttons/checkbutton-default.png";
CheckButtonImageProfile.IMG_HOVER="${skin}/buttons/checkbutton-hover.png";
CheckButtonImageProfile.IMG_ACTIVE="${skin}/buttons/checkbutton-active.png";
CheckButtonImageProfile.IMG_ACTIVE_HOVER="${skin}/buttons/checkbutton-active-hover.png";
CheckButtonImageProfile.IMG_DISABLED=null;
CheckButtonImageProfile.IMG_DISABLED_ON=null;
function CheckButtonImageProfile(_644){
this._binding=_644;
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
var _645=this.getDescendantBindingsByLocalName("control");
_645.each(function(_646){
_646.setControlType(_646.controlType);
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
ControlGroupBinding.newInstance=function(_648){
var _649=DOMUtil.createElementNS(Constants.NS_UI,"ui:controlgroup",_648);
return UserInterface.registerBinding(_649,ControlGroupBinding);
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
ControlBinding.prototype.handleAction=function(_64c){
ControlBinding.superclass.handleAction.call(this,_64c);
switch(_64c.type){
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
function ControlImageProfile(_64d){
this.binding=_64d;
}
ControlImageProfile.prototype._getImage=function(_64e){
var _64f=null;
switch(this.binding.controlType){
case ControlBinding.TYPE_MINIMIZE:
_64f=this.constructor.IMAGE_MINIMIZE;
break;
case ControlBinding.TYPE_MAXIMIZE:
_64f=this.constructor.IMAGE_MAXIMIZE;
break;
case ControlBinding.TYPE_UNMAXIMIZE:
case ControlBinding.TYPE_UNMINIMIZE:
_64f=this.constructor.IMAGE_RESTORE;
break;
case ControlBinding.TYPE_CLOSE:
_64f=this.constructor.IMAGE_CLOSE;
break;
}
return _64f.replace("${string}",_64e);
};
ControlImageProfile.prototype.getDefaultImage=function(){
var _650=true;
if(this.binding.isGhostable&&this.binding.containingControlBoxBinding){
_650=this.binding.containingControlBoxBinding.isActive?true:false;
}
return _650?this._getImage("default"):this._getImage("ghosted");
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
ControlBoxBinding.prototype.handleAction=function(_651){
ControlBoxBinding.superclass.handleAction.call(this,_651);
switch(_651.type){
case ControlBinding.ACTION_COMMAND:
var _652=_651.target;
Application.lock(this);
var self=this;
setTimeout(function(){
self.handleInvokedControl(_652);
Application.unlock(self);
},0);
_651.consume();
break;
}
};
ControlBoxBinding.prototype.handleInvokedControl=function(_654){
switch(_654.controlType){
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
ControlBoxBinding.prototype.setState=function(_655){
var _656=this.getState();
this.setProperty("state",_655);
this.detachClassName(_656);
this.attachClassName(_655);
this.dispatchAction(ControlBoxBinding.ACTION_STATECHANGE);
};
ControlBoxBinding.prototype.getState=function(){
var _657=this.getProperty("state");
if(!_657){
_657=ControlBoxBinding.STATE_NORMAL;
}
return _657;
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
MenuContainerBinding.prototype.isOpen=function(_658){
var _659=null;
if(!_658){
_659=this._isOpen;
}else{
_659=(_658==this._openElement);
}
return _659;
};
MenuContainerBinding.prototype.setOpenElement=function(_65a){
if(_65a){
if(this._openElement){
this._openElement.hide();
}
this._openElement=_65a;
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
var _65b=this.getChildBindingByLocalName("menupopup");
if(_65b&&_65b!=this.menuPopupBinding){
this.menuPopupBinding=_65b;
this.menuPopupBinding.addActionListener(PopupBinding.ACTION_HIDE,this);
}
return this.menuPopupBinding;
};
MenuContainerBinding.prototype.show=function(){
var _65c=this.getMenuContainerBinding();
_65c.setOpenElement(this);
var _65d=this.getMenuPopupBinding();
_65d.snapTo(this.bindingElement);
_65d.show();
};
MenuContainerBinding.prototype.hide=function(){
this.reset();
this.getMenuPopupBinding().hide();
if(this._isOpen){
this._openElement.hide();
}
};
MenuContainerBinding.prototype.reset=Binding.ABSTRACT_METHOD;
MenuContainerBinding.prototype.handleAction=function(_65e){
MenuContainerBinding.superclass.handleAction.call(this,_65e);
if(_65e.type==PopupBinding.ACTION_HIDE){
var _65f=this.getMenuContainerBinding();
_65f.setOpenElement(false);
this.reset();
_65e.consume();
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
MenuBarBinding.prototype.handleAction=function(_660){
MenuBarBinding.superclass.handleAction.call(this,_660);
switch(_660.type){
case MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY:
var _661=_660.target;
var _662=this.getChildBindingsByLocalName("menu");
while(_662.hasNext()){
var menu=_662.getNext();
}
switch(_661.arrowKey){
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
var _664=this.getProperty("image");
var _665=this.getProperty("label");
var _666=this.getProperty("tooltip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menulabel");
this.add(this.labelBinding);
if(_665){
this.setLabel(_665);
}
if(_664){
this.setImage(_664);
}
if(_666){
this.setToolTip(_666);
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
MenuBinding.prototype.setLabel=function(_668){
this.setProperty("label",_668);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_668));
}
};
MenuBinding.prototype.setToolTip=function(_669){
this.setProperty("tooltip",_669);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_669));
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
var _66b=this.getMenuContainerBinding();
if(!BindingDragger.isDragging){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(_66b.isOpen(this)){
DOMEvents.stopPropagation(e);
}
break;
case DOMEvents.MOUSEOVER:
if(_66b.isOpen()&&!_66b.isOpen(this)){
this.show();
this.menuPopupBinding.grabKeyboard();
}
this.attachClassName("hover");
this.isFocused=true;
break;
case DOMEvents.MOUSEOUT:
if(!_66b.isOpen()){
this.hide();
}
this.isFocused=false;
break;
case DOMEvents.MOUSEUP:
if(!_66b.isOpen(this)){
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
MenuBodyBinding.handleBroadcast=function(_66c,arg){
var body=MenuBodyBinding.activeInstance;
var key=arg;
if(body){
switch(_66c){
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
this.addActionListener(MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY,{handleAction:function(_671){
switch(_671.target){
case self:
self.releaseKeyboard();
self._containingPopupBinding.hide();
break;
default:
var _672=null;
var _673=true;
self._lastFocused.focus();
self.grabKeyboard();
_671.consume();
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
MenuBodyBinding.prototype.handleFocusedItem=function(_675){
for(var key in this._focused){
if(key!=_675.key){
var item=this._focused[key];
item.blur();
}
}
this._focused[_675.key]=_675;
this._lastFocused=_675;
if(MenuBodyBinding.activeInstance!=this){
this.grabKeyboard();
}
};
MenuBodyBinding.prototype.handleBlurredItem=function(_678){
delete this._focused[_678.key];
};
MenuBodyBinding.prototype.resetFocusedItems=function(_679){
for(var key in this._focused){
var item=this._focused[key];
item.blur(_679);
}
if(_679){
this._lastFocused=null;
}
};
MenuBodyBinding.prototype.refreshMenuGroups=function(){
if(!this.isAttached){
throw "refreshMenuGroups: MenuBodyBinding not attached!";
}else{
var _67c=this.getChildBindingsByLocalName("menugroup");
var _67d=null;
var _67e=null;
while(_67c.hasNext()){
var _67f=_67c.getNext();
if(!_67f.isDefaultContent){
_67f.setLayout(MenuGroupBinding.LAYOUT_DEFAULT);
if(!_67d&&_67f.isVisible){
_67d=_67f;
}
if(_67f.isVisible){
_67e=_67f;
}
}
}
if(_67d&&_67e){
_67d.setLayout(MenuGroupBinding.LAYOUT_FIRST);
_67e.setLayout(MenuGroupBinding.LAYOUT_LAST);
}
}
};
MenuBodyBinding.prototype.grabKeyboard=function(_680){
MenuBodyBinding.activeInstance=this;
if(_680){
var _681=this._getMenuItems().getFirst();
if(_681){
_681.focus();
}
}
};
MenuBodyBinding.prototype.releaseKeyboard=function(){
if(MenuBodyBinding.activeInstance==this){
MenuBodyBinding.activeInstance=null;
}
};
MenuBodyBinding.prototype.handleEnterKey=function(){
var _682=this._lastFocused;
if((_682!=null)&&(!_682.isMenuContainer)){
_682.fireCommand();
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEDOWN);
}
};
MenuBodyBinding.prototype.handleArrowKey=function(key){
this.arrowKey=key;
var _684=this._getMenuItems();
var _685=null;
var next=null;
if(this._lastFocused){
_685=this._lastFocused;
switch(key){
case KeyEventCodes.VK_UP:
next=_684.getPreceding(_685);
break;
case KeyEventCodes.VK_DOWN:
next=_684.getFollowing(_685);
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
next=_684.getFirst();
}
if(next){
next.focus();
}
};
MenuBodyBinding.prototype._getMenuItems=function(){
if(!this._menuItemsList||this.isDirty){
var list=new List();
var _688=null;
this.getChildBindingsByLocalName("menugroup").each(function(_689){
_688=_689.getChildBindingsByLocalName("menuitem");
_688.each(function(item){
list.add(item);
});
});
_688=this.getChildBindingsByLocalName("menuitem");
_688.each(function(item){
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
MenuBodyBinding.newInstance=function(_68d){
var _68e=DOMUtil.createElementNS(Constants.NS_UI,"ui:menubody",_68d);
return UserInterface.registerBinding(_68e,MenuBodyBinding);
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
MenuGroupBinding.prototype.setLayout=function(_68f){
switch(_68f){
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
MenuGroupBinding.newInstance=function(_690){
var _691=DOMUtil.createElementNS(Constants.NS_UI,"ui:menugroup",_690);
return UserInterface.registerBinding(_691,MenuGroupBinding);
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
var _692=this.getProperty("image");
var _693=this.getProperty("image-hover");
var _694=this.getProperty("image-active");
var _695=this.getProperty("image-disabled");
if(!this.image&&_692){
this.image=_692;
}
if(!this.imageHover&&_693){
this.imageHover=_692;
}
if(!this.imageActive&&_694){
this.imageActive=_694;
}
if(!this.imageDisabled&&_695){
this.imageDisabled=_695;
}
};
MenuItemBinding.prototype.buildDOMContent=function(){
var _696=this.getProperty("label");
var _697=this.getProperty("tooltip");
var type=this.getProperty("type");
var _699=this.getProperty("isdisabled");
var _69a=this.getProperty("image");
var _69b=this.getProperty("image-hover");
var _69c=this.getProperty("image-active");
var _69d=this.getProperty("image-disabled");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menuitemlabel");
this.add(this.labelBinding);
var _69e=this.getMenuPopupBinding();
if(_69e){
this.isMenuContainer=true;
this.setType(MenuItemBinding.TYPE_MENUCONTAINER);
}
if(!this.imageProfile){
if(!this.image&&_69a){
this.image=_69a;
}
if(!this.imageHover&&_69b){
this.imageHover=_69a;
}
if(!this.imageActive&&_69c){
this.imageActive=_69c;
}
if(!this.imageDisabled&&_69d){
this.imageDisabled=_69d;
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
if(_696){
this.setLabel(_696);
}
if(_697){
this.setToolTip(_697);
}
if(type){
this.setType(type);
}
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.getProperty("checked")==true){
this.check(true);
}
}
if(_699==true){
this.disable();
}
var _69f=this.getProperty("oncommand");
if(_69f){
if(this.isMenuContainer){
throw new Error("MenuItemBinding with contained menuitems cannot fire commands.");
}else{
this.oncommand=function(){
this.bindingWindow.eval(_69f);
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
MenuItemBinding.prototype.setLabel=function(_6a2){
this.setProperty("label",_6a2);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6a2));
}
};
MenuItemBinding.prototype.setToolTip=function(_6a3){
this.setProperty("tooltip",_6a3);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6a3));
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
var _6a5=this.bindingDocument.createElement("div");
_6a5.className=MenuItemBinding.CLASSNAME_CHECKBOX;
_6a5.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_CHECKBOX));
var _6a6=this.labelBinding.bindingElement;
_6a6.insertBefore(_6a5,_6a6.firstChild);
_6a5.style.display="none";
this.shadowTree.checkBoxIndicator=_6a5;
}else{
throw new Error("MenuItemBinding: checkboxes cannot contain menus");
}
break;
case MenuItemBinding.TYPE_MENUCONTAINER:
var _6a5=this.bindingDocument.createElement("div");
_6a5.className=MenuItemBinding.CLASSNAME_SUBMENU;
_6a5.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_SUBMENU));
var _6a6=this.labelBinding.bindingElement;
_6a6.insertBefore(_6a5,_6a6.firstChild);
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
var _6a8=this.imageProfile.getDisabledImage();
if(_6a8){
this.setImage(_6a8);
}
}
}else{
this.detachClassName("isdisabled");
if(this.imageProfile){
var _6a8=this.imageProfile.getDefaultImage();
if(_6a8){
this.setImage(_6a8);
}
}
}
}
};
MenuItemBinding.prototype.focus=function(e){
this.labelBinding.attachClassName(MenuItemBinding.CLASSNAME_HOVER);
var _6aa=this.getMenuContainerBinding();
if(_6aa.isOpen()&&!_6aa.isOpen(this)){
_6aa._openElement.hide();
_6aa.setOpenElement(false);
}
if(this.isMenuContainer&&e&&e.type==DOMEvents.MOUSEOVER){
var _6aa=this.getMenuContainerBinding();
if(!_6aa.isOpen(this)){
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
MenuItemBinding.prototype.blur=function(_6ac){
if(this._showSubMenuTimeout){
window.clearTimeout(this._showSubMenuTimeout);
this._showSubMenuTimeout=null;
}
if(this.isFocused){
var _6ad=this.getMenuContainerBinding();
if(!_6ad||!_6ad.isOpen(this)||_6ac){
this.labelBinding.detachClassName(MenuItemBinding.CLASSNAME_HOVER);
this.isFocused=false;
this._containingMenuBodyBinding.handleBlurredItem(this);
}
}
};
MenuItemBinding.prototype.check=function(_6ae){
this.setChecked(true,_6ae);
};
MenuItemBinding.prototype.uncheck=function(_6af){
this.setChecked(false,_6af);
};
MenuItemBinding.prototype.show=function(){
this.menuPopupBinding.position=PopupBinding.POSITION_RIGHT;
MenuItemBinding.superclass.show.call(this);
};
MenuItemBinding.prototype.setChecked=function(_6b0,_6b1){
this.setProperty("checked",_6b0);
if(this.isAttached){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.isChecked!=_6b0){
this.isChecked=_6b0;
this.shadowTree.checkBoxIndicator.style.display=_6b0?"block":"none";
if(!_6b1){
this.fireCommand();
}
}
}
}
};
MenuItemBinding.newInstance=function(_6b2){
var _6b3=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_6b2);
UserInterface.registerBinding(_6b3,MenuItemBinding);
return UserInterface.getBinding(_6b3);
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
PopupBinding.handleBroadcast=function(_6b4,arg){
switch(_6b4){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
case BroadcastMessages.MOUSEEVENT_MOUSEUP:
if(PopupBinding.activeInstances.hasEntries()){
var list=new List();
PopupBinding.activeInstances.each(function(key){
var _6b8=PopupBinding.activeInstances.get(key);
var _6b9=(arg&&arg instanceof ButtonBinding&&arg.popupBinding==_6b8);
if(!_6b9){
list.add(_6b8);
}
});
list.each(function(_6ba){
_6ba.hide();
});
}
break;
case BroadcastMessages.KEY_ESCAPE:
if(PopupBinding.activeInstances.hasEntries()){
PopupBinding.activeInstances.each(function(key){
var _6bc=PopupBinding.activeInstances.get(key);
_6bc.hide();
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
var _6bd=DOMUtil.getElementsByTagName(this.bindingElement,"menubody").item(0);
var _6be=DOMUtil.getElementsByTagName(this.bindingElement,"popupbody").item(0);
if(_6bd){
this._bodyBinding=UserInterface.getBinding(_6bd);
}else{
if(_6be){
this._bodyBinding=UserInterface.getBinding(_6be);
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
var _6bf=this.getProperty("position");
this.position=_6bf?_6bf:PopupBinding.POSITION_BOTTOM;
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
PopupBinding.prototype.add=function(_6c0){
var _6c1=null;
if(this._bodyBinding){
this._bodyBinding.add(_6c0);
_6c1=_6c0;
}else{
_6c1=PopupBinding.superclass.add.call(this,_6c0);
}
return _6c1;
};
PopupBinding.prototype.addFirst=function(_6c2){
var _6c3=null;
if(this._bodyBinding){
this._bodyBinding.addFirst(_6c2);
_6c3=_6c2;
}else{
_6c3=PopupBinding.superclass.addFirst.call(this,_6c2);
}
return _6c3;
};
PopupBinding.prototype.handleAction=function(_6c4){
PopupBinding.superclass.handleAction.call(this,_6c4);
var _6c5=_6c4.target;
switch(_6c4.type){
case Binding.ACTION_ATTACHED:
if(_6c5 instanceof MenuItemBinding){
this._count(true);
_6c4.consume();
}
break;
case Binding.ACTION_DETACHED:
if(_6c5 instanceof MenuItemBinding){
this._count(false);
_6c4.consume();
}
break;
}
};
PopupBinding.prototype._count=function(_6c6){
if(this.type==PopupBinding.TYPE_FIXED){
this._menuItemCount=this._menuItemCount+(_6c6?1:-1);
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
PopupBinding.prototype.snapTo=function(_6c7){
var _6c8=this._getElementPosition(_6c7);
switch(this.position){
case PopupBinding.POSITION_TOP:
_6c8.y-=this.bindingElement.offsetHeight;
break;
case PopupBinding.POSITION_RIGHT:
_6c8.x+=_6c7.offsetWidth;
break;
case PopupBinding.POSITION_BOTTOM:
_6c8.y+=_6c7.offsetHeight;
break;
case PopupBinding.POSITION_LEFT:
_6c8.x-=this.bindingElement.offsetWidth;
break;
}
this.targetElement=_6c7;
this.bindingElement.style.display="block";
this.setPosition(_6c8.x,_6c8.y);
};
PopupBinding.prototype.snapToMouse=function(e){
this.snapToPoint(this._getMousePosition(e));
};
PopupBinding.prototype.snapToPoint=function(_6ca){
this.bindingElement.style.display="block";
this.setPosition(_6ca.x,_6ca.y);
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
PopupBinding.prototype._getElementPosition=function(_6cf){
return _6cf.ownerDocument==this.bindingDocument?DOMUtil.getGlobalPosition(_6cf):DOMUtil.getUniversalPosition(_6cf);
};
PopupBinding.prototype._getMousePosition=function(e){
var _6d1=DOMEvents.getTarget(e);
return _6d1.ownerDocument==this.bindingDocument?DOMUtil.getGlobalMousePosition(e):DOMUtil.getUniversalMousePosition(e);
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
PopupBinding.prototype._makeVisible=function(_6d2){
var _6d3=this.bindingElement;
if(_6d2){
if(Client.hasTransitions){
_6d3.style.visibility="visible";
_6d3.style.opacity="1";
}else{
_6d3.style.visibility="visible";
}
}else{
_6d3.style.visibility="hidden";
_6d3.style.display="none";
if(Client.hasTransitions){
_6d3.style.opacity="0";
}
}
this.isVisible=_6d2;
};
PopupBinding.prototype._enableTab=function(_6d4){
var self=this;
var _6d6=this.getDescendantBindingsByLocalName("menuitem");
setTimeout(function(){
if(Binding.exists(self)==true){
_6d6.each(function(_6d7){
_6d7.bindingElement.tabIndex=_6d4?0:-1;
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
PopupBinding.prototype.grabKeyboard=function(_6e0){
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
var _6e6=null;
if(this._menuItems){
if(this._menuItems[cmd]){
_6e6=this._menuItems[cmd];
}else{
throw "PopupBinding.getMenuItemForCommand: No binding for command "+cmd;
}
}else{
throw "Must invoke _indexMenuContent method first!";
}
return _6e6;
};
PopupBinding.prototype.clear=function(){
var _6e7=this._bodyBinding;
if(_6e7){
_6e7.detachRecursive();
_6e7.bindingElement.innerHTML="";
}
this._menuItemCount=0;
};
PopupBinding.newInstance=function(_6e8){
var _6e9=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_6e8);
return UserInterface.registerBinding(_6e9,PopupBinding);
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
PopupBodyBinding.newInstance=function(_6eb){
var _6ec=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupbody",_6eb);
return UserInterface.registerBinding(_6ec,PopupBodyBinding);
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
MenuPopupBinding.prototype._getElementPosition=function(_6ed){
return new Point(_6ed.offsetLeft,0);
};
MenuPopupBinding.newInstance=function(_6ee){
var _6ef=DOMUtil.createElementNS(Constants.NS_UI,"ui:menupopup",_6ee);
return UserInterface.registerBinding(_6ef,MenuPopupBinding);
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
var _6f0=DOMUtil.getElementsByTagName(this.bindingElement,"dialogbody").item(0);
if(_6f0){
this._body=UserInterface.getBinding(_6f0);
}else{
this._body=DialogBodyBinding.newInstance(this.bindingDocument);
this.add(this._body);
}
};
DialogBinding.prototype.buildBorderBindings=function(){
var _6f1=new List([DialogBorderBinding.TYPE_NORTH,DialogBorderBinding.TYPE_SOUTH,DialogBorderBinding.TYPE_EAST,DialogBorderBinding.TYPE_WEST]);
while(_6f1.hasNext()){
var _6f2=DialogBorderBinding.newInstance(this.bindingDocument);
_6f2.setType(_6f1.getNext());
this.add(_6f2);
}
};
DialogBinding.prototype.buildShadowBinding=function(){
this.shadowBinding=ShadowBinding.newInstance(this.bindingDocument);
this.shadowBinding.attachClassName("dialogshadow");
this.shadowBinding.shadow(this);
this.shadowBinding.attach();
};
DialogBinding.prototype.buildControlBindings=function(){
var _6f3=this.getProperty("controls");
if(_6f3){
var _6f4=new List(_6f3.split(" "));
while(_6f4.hasNext()){
var type=_6f4.getNext();
switch(type){
case ControlBinding.TYPE_MAXIMIZE:
case ControlBinding.TYPE_MINIMIZE:
case ControlBinding.TYPE_CLOSE:
var _6f6=DialogControlBinding.newInstance(this.bindingDocument);
_6f6.setControlType(type);
this._titlebar.addControl(_6f6);
this.controlBindings[type]=_6f6;
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
var _6f7=this.getProperty("image");
var _6f8=this.getProperty("label");
var _6f9=this.getProperty("draggable");
var _6fa=this.getProperty("resizable");
var _6fb=this.getProperty("modal");
if(_6f7){
this.setImage(_6f7);
}
if(_6f8){
this.setLabel(_6f8);
}
if(_6f9==false){
this.isDialogDraggable=false;
}
if(_6fa==false){
this.isPanelResizable=false;
}
if(_6fb==true){
this.setModal(true);
}
};
DialogBinding.prototype.setModal=function(_6fc){
this.isModal=_6fc;
};
DialogBinding.prototype.setLabel=function(_6fd){
this.setProperty("label",_6fd);
if(this.isAttached==true){
this._titlebar.setLabel(Resolver.resolve(_6fd));
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
DialogBinding.prototype.handleAction=function(_6ff){
DialogBinding.superclass.handleAction.call(this,_6ff);
switch(_6ff.type){
case Binding.ACTION_DRAG:
var _700=_6ff.target;
if(this.getState()==ControlBoxBinding.STATE_NORMAL){
switch(_700.constructor){
case DialogTitleBarBinding:
this.mode=DialogBinding.MODE_DRAGGING;
_700.dragger.registerHandler(this);
break;
case DialogBorderBinding:
if(this._isResizable){
this.mode=DialogBinding.MODE_RESIZING;
this._border=_700;
_700.dragger.registerHandler(this);
}
break;
}
}
_6ff.consume();
break;
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_6ff.consume();
break;
}
};
DialogBinding.prototype.handleBroadcast=function(_701,arg){
DialogBinding.superclass.handleBroadcast.call(this,_701,arg);
switch(_701){
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.startPoint=this.getPosition();
this._setComputedPosition(new Point(0,0));
break;
}
};
DialogBinding.prototype.handleInvokedControl=function(_703){
DialogBinding.superclass.handleInvokedControl.call(this,_703);
switch(_703.controlType){
case ControlBinding.TYPE_CLOSE:
this.close();
break;
}
};
DialogBinding.prototype.open=function(_704){
if(this.isModal&&this._cover==null){
this.buildDialogCoverBinding();
}
if(!this.isVisible){
this.setProperty("open","true");
this.isVisible=true;
this.isActivatable=true;
this.activate();
if(_704){
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
var _706=self.bindingElement;
setTimeout(function(){
_706.style.opacity="0";
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
DialogBinding.prototype.setZIndex=function(_707){
this.bindingElement.style.zIndex=new String(_707);
};
DialogBinding.prototype.onDragStart=function(_708){
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
DialogBinding.prototype.setResizable=function(_71a){
if(this._isResizable!=_71a){
if(_71a){
this.attachClassName("resizable");
}else{
this.detachClassName("resizable");
}
this._isResizable=_71a;
}
};
DialogBinding.prototype.computeDefaultGeometry=function(){
var _71b=null;
var _71c=this.bindingDocument.body.offsetWidth;
var _71d=this.bindingDocument.body.offsetHeight;
_71b={x:0.125*_71c,y:0.125*_71d,w:0.75*_71c,h:0.5*_71d};
return _71b;
};
DialogBinding.prototype.centerOnScreen=function(){
var _71e=this.bindingWindow.WindowManager.getWindowDimensions();
var dim=this.getDimension();
this.setPosition(new Point(0.5*(_71e.w-dim.w),0.5*(_71e.h-dim.h)));
};
DialogBinding.prototype.alert=function(){
var _720=this;
var i=0;
function blink(){
if(i%2==0){
_720.detachClassName("active");
}else{
_720.attachClassName("active");
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
var _724="";
while(list.hasNext()){
var type=list.getNext();
_724+=type+list.hasNext()?" ":"";
}
this.setProperty("controls",_724);
if(this.isAttached){
this.buildControlBindings();
}
};
DialogBinding.newInstance=function(_725){
var _726=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_725);
return UserInterface.registerBinding(_726,DialogBinding);
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
DialogHeadBinding.newInstance=function(_727){
var _728=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialoghead",_727);
return UserInterface.registerBinding(_728,DialogHeadBinding);
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
DialogBodyBinding.newInstance=function(_72b){
var _72c=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogbody",_72b);
return UserInterface.registerBinding(_72c,DialogBodyBinding);
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
DialogMatrixBinding.newInstance=function(_72d){
var _72e=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogmatrix",_72d);
return UserInterface.registerBinding(_72e,DialogMatrixBinding);
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
DialogSetBinding.prototype.handleAction=function(_72f){
DialogSetBinding.superclass.handleAction.call(this,_72f);
var _730=_72f.target;
switch(_72f.type){
case Binding.ACTION_MOVETOTOP:
if(_730 instanceof DialogBinding){
this._moveToTop(_730);
}
break;
case Binding.ACTION_MOVEDONTOP:
_72f.consume();
break;
}
};
DialogSetBinding.prototype._moveToTop=function(_731){
var _732=0;
var _733=this.getChildBindingsByLocalName("dialog");
_733.each(function(_734){
var _735=_734.getZIndex();
_732=_735>_732?_735:_732;
});
_731.setZIndex(_732+2);
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
DialogBorderBinding.newInstance=function(_737){
var _738=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogborder",_737);
return UserInterface.registerBinding(_738,DialogBorderBinding);
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
DialogCoverBinding.prototype.cover=function(_739){
this._dialogBinding=_739;
this._dialogBinding.addActionListener(DialogBinding.ACTION_OPEN,this);
this._dialogBinding.addActionListener(DialogBinding.ACTION_CLOSE,this);
this._dialogBinding.addActionListener(Binding.ACTION_MOVEDONTOP,this);
this.addEventListener(DOMEvents.MOUSEDOWN);
};
DialogCoverBinding.prototype.handleEvent=function(e){
DialogCoverBinding.superclass.handleEvent.call(this,e);
this._dialogBinding.alert();
};
DialogCoverBinding.prototype.handleAction=function(_73b){
DialogCoverBinding.superclass.handleAction.call(this,_73b);
var _73c=_73b.target;
if(this._dialogBinding.isModal){
switch(_73b.type){
case DialogBinding.ACTION_OPEN:
this.show();
break;
case DialogBinding.ACTION_CLOSE:
this.hide();
break;
case Binding.ACTION_MOVEDONTOP:
if(_73c==this._dialogBinding){
this.bindingElement.style.zIndex=new String(_73c.getZIndex()-1);
}
break;
}
}
};
DialogCoverBinding.prototype.handleBroadcast=function(_73d,arg){
DialogCoverBinding.superclass.handleBroadcast.call(this,_73d,arg);
switch(_73d){
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
var _740=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.subscribe(_740);
DialogCoverBinding.superclass.show.call(this);
};
DialogCoverBinding.prototype.hide=function(){
var _741=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.unsubscribe(_741);
DialogCoverBinding.superclass.hide.call(this);
};
DialogCoverBinding.newInstance=function(_742){
var _743=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogcover",_742);
return UserInterface.registerBinding(_743,DialogCoverBinding);
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
};
DialogTitleBarBinding.prototype.onBindingAttach=function(){
DialogTitleBarBinding.superclass.onBindingAttach.call(this);
var _744=this.getProperty("image");
if(_744){
this.setImage(_744);
}
var _745=this.getProperty("label");
if(_745){
this.setLabel(_745);
}
};
DialogTitleBarBinding.prototype.setLabel=function(_746){
if(this.isAttached){
this.labelBinding.setLabel(_746);
}
this.setProperty("label",_746);
};
DialogTitleBarBinding.prototype.setImage=function(url){
if(this.isAttached){
this.labelBinding.setImage(url);
}
this.setProperty("image",url);
};
DialogTitleBarBinding.prototype.addControl=function(_748){
if(!this._controlGroupBinding){
this._controlGroupBinding=this.bodyBinding.addFirst(ControlGroupBinding.newInstance(this.bindingDocument));
}
this._controlGroupBinding.add(_748);
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
DialogTitleBarBinding.newInstance=function(_749){
var _74a=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebar",_749);
return UserInterface.registerBinding(_74a,DialogTitleBarBinding);
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
DialogTitleBarBodyBinding.newInstance=function(_74b){
var _74c=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebarbody",_74b);
return UserInterface.registerBinding(_74c,DialogTitleBarBodyBinding);
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
DialogControlBinding.newInstance=function(_74d){
var _74e=DOMUtil.createElementNS(Constants.NS_UI,"ui:control",_74d);
return UserInterface.registerBinding(_74e,DialogControlBinding);
};
DialogControlImageProfile.prototype=new ControlImageProfile;
DialogControlImageProfile.prototype.constructor=DialogControlImageProfile;
DialogControlImageProfile.superclass=ControlImageProfile.prototype;
var os=Client.isVista?"vista/":"";
DialogControlImageProfile.IMAGE_MINIMIZE="${root}/skins/system/controls/"+os+"control-minimize-${string}.png";
DialogControlImageProfile.IMAGE_MAXIMIZE="${root}/skins/system/controls/"+os+"control-maximize-${string}.png";
DialogControlImageProfile.IMAGE_RESTORE="${root}/skins/system/controls/"+os+"control-restore-${string}.png";
DialogControlImageProfile.IMAGE_CLOSE="${root}/skins/system/controls/"+os+"control-close-${string}.png";
function DialogControlImageProfile(_74f){
this.binding=_74f;
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
var _752=null;
if(node.nodeType==Node.ELEMENT_NODE){
var _753=node.nodeName.toLowerCase();
switch(_753){
case "script":
case "style":
case "textarea":
_752=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
break;
}
}
return _752;
});
var self=this;
this.addFilter(function(node,arg){
if(node.nodeType==Node.TEXT_NODE){
var text=node.nodeValue.toLowerCase();
self._map.each(function(key,exp){
var _75a=true;
if(exp.test(text)){
self._textnodes.add(node);
_75a=false;
}
return _75a;
});
}
});
};
WindowBindingHighlightNodeCrawler.prototype.crawl=function(_75b,arg){
this._textnodes=new List();
WindowBindingHighlightNodeCrawler.superclass.crawl.call(this,_75b,arg);
};
WindowBindingHighlightNodeCrawler.prototype.setKeys=function(list){
list.reset();
this._map.empty();
while(list.hasNext()){
var key=list.getNext();
var _75f=key.toLowerCase().replace(/ /g,"\\W");
var exp=new RegExp("("+_75f+")");
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
WindowBindingHighlightNodeCrawler.prototype._getMarkup=function(_765){
var _766="";
var _767="<span class=\""+WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT+"\" style=\"background-color:yellow;color:black;\">";
var _768="</span>";
var self=this;
function iterate(_76a){
var _76b=-1;
var _76c=null;
self._map.each(function(key,exp){
var low=_76a.toLowerCase();
var _770=low.search(exp);
if(_770>-1){
if(_76b==-1){
_76b=_770;
}
if(_770<=_76b){
_76b=_770;
_76c=key;
}
}
});
if(_76b>-1&&_76c!=null){
var pre=_76a.substring(0,_76b);
var hit=_76a.substring(_76b,_76b+_76c.length);
var pst=_76a.substring(_76b+_76c.length,_76a.length);
_766+=pre+_767+hit+_768;
iterate(pst);
}else{
_766+=_76a;
}
}
iterate(_765);
return _766;
};
WindowBindingHighlightNodeCrawler.prototype.reset=function(_774){
var _775=new List(_774.getElementsByTagName("span"));
_775.each(function(span){
if(span.className==WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT){
var node=_774.ownerDocument.createTextNode(DOMUtil.getTextContent(span));
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
WindowBinding.getMarkup=function(_778){
var _779=null;
if(_778.isAttached){
var doc=_778.getContentDocument();
if(doc!=null){
var root=doc.getElementsByTagName("html").item(0);
var html="<html xmlns=\""+Constants.NS_XHTML+"\">"+root.innerHTML+"</html>";
WebServiceProxy.isFaultHandler=false;
_779=top.MarkupFormatService.HtmlToXhtml(html);
WebServiceProxy.isFaultHandler=true;
if(_779 instanceof SOAPFault){
_779=null;
}
}
}
return _779;
};
WindowBinding.highlightKeywords=function(_77d,list){
if(WindowBinding._highlightcrawler==null){
WindowBinding._highlightcrawler=new WindowBindingHighlightNodeCrawler();
}
if(_77d.isAttached){
var doc=_77d.getContentDocument();
if(doc!=null){
var _780=WindowBinding._highlightcrawler;
_780.reset(doc.body);
if(list!=null){
_780.setKeys(list);
_780.crawl(doc.body);
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
var _781=WindowBinding.superclass.serialize.call(this);
if(_781){
_781.url=this.getURL();
}
return _781;
};
WindowBinding.prototype.onBindingRegister=function(){
WindowBinding.superclass.onBindingRegister.call(this);
this.addActionListener(RootBinding.ACTION_PHASE_3);
this.addActionListener(PageBinding.ACTION_INITIALIZED);
this.addActionListener(RootBinding.ACTION_ACTIVATED);
this.addActionListener(RootBinding.ACTION_DEACTIVATED);
};
WindowBinding.prototype.onBindingAttach=function(){
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
var _783=this.getContentWindow().DocumentManager;
if(_783!=null){
_783.detachAllBindings();
this._pageBinding=null;
}
}
}
};
WindowBinding.prototype.handleAction=function(_784){
WindowBinding.superclass.handleAction.call(this,_784);
var _785=_784.target;
switch(_784.type){
case RootBinding.ACTION_PHASE_3:
if(_785.bindingDocument==this.getContentDocument()){
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
this._onPageInitialize(_785);
break;
case RootBinding.ACTION_ACTIVATED:
case RootBinding.ACTION_DEACTIVATED:
_784.consume();
break;
}
};
WindowBinding.prototype.fit=function(_786){
if(!this.isFit||_786){
if(this._pageBinding!=null){
this.setHeight(this._pageBinding.getHeight());
this.isFit=true;
}
}
};
WindowBinding.prototype._onPageInitialize=function(_787){
if(this._pageBinding==null){
if(_787.bindingWindow==this.getContentWindow()){
this._pageBinding=_787;
}
}
};
WindowBinding.prototype.buildDOMContent=function(){
if(this.shadowTree.iframe!=null){
this.bindingElement.removeChild(this.shadowTree.iframe);
this.shadowTree.iframe=null;
}
this.shadowTree.iframe=DOMUtil.createElementNS(Constants.NS_XHTML,"iframe",this.bindingDocument);
this.shadowTree.iframe.setAttribute("frameborder","0");
this.shadowTree.iframe.frameBorder=0;
this.bindingElement.appendChild(this.shadowTree.iframe);
this._registerOnloadListener(true);
};
WindowBinding.prototype._registerOnloadListener=function(_788){
var _789=this.shadowTree.iframe;
var _78a=_788?"addEventListener":"removeEventListener";
if(this._onloadHandler==null){
var self=this;
this._onloadHandler={handleEvent:function(e){
var _78d=true;
if(Client.isExplorer){
_78d=_789.readyState=="complete";
}
if(_78d==true){
if(self.getURL()!=WindowBinding.DEFAULT_URL){
if(!self._hasLoadActionFired){
self.onWindowLoaded(self.getContentWindow());
}
}
}
}};
}
DOMEvents[_78a](this.shadowTree.iframe,Client.isExplorer==true?"readystatechange":DOMEvents.LOAD,this._onloadHandler);
};
WindowBinding.prototype._registerUnloadListener=function(_78e){
var _78f=_78e?"addEventListener":"removeEventListener";
if(this._unloadHandler==null){
var self=this;
this._unloadHandler={handleEvent:function(){
self._disposeContentDocument();
self._hasLoadActionFired=false;
}};
}
DOMEvents[_78f](this.getContentWindow(),DOMEvents.UNLOAD,this._unloadHandler);
};
WindowBinding.prototype.onWindowLoaded=function(win){
if(win==null){
this.logger.error("WindowBinding#onWindowLoaded: Bad argument: "+this.getURL());
}else{
if(this.getURL()!=WindowBinding.DEFAULT_URL){
if(!this._hasLoadActionFired){
if(win!=null&&win.WindowManager==null&&win.document!=null&&win.document.body!=null){
Application.framework(win.document);
win.document.body.style.border="none";
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
if(this.shadowTree.iframe==null){
this.buildDOMContent();
}
this._disposeContentDocument();
this.getFrameElement().src=Resolver.resolve(url);
}
};
WindowBinding.prototype.getURL=function(){
var _793=WindowBinding.DEFAULT_URL;
var url=this.getProperty("url");
if(url){
_793=url;
}
return _793;
};
WindowBinding.prototype.reload=function(_795){
this._disposeContentDocument();
if(Client.isPrism){
Prism.disableCache();
}
this._isReloading=true;
this.getContentDocument().location.reload();
};
WindowBinding.prototype.getFrameElement=function(){
var _796=null;
if(this.shadowTree.iframe){
_796=this.shadowTree.iframe;
}
return _796;
};
WindowBinding.prototype.getContentWindow=function(){
var _797=null,_798=this.getFrameElement();
if(_798){
_797=_798.contentWindow;
}
return _797;
};
WindowBinding.prototype.getContentDocument=function(){
var _799=null,win=this.getContentWindow();
if(win){
_799=win.document;
}
return _799;
};
WindowBinding.prototype.getRootBinding=function(){
var _79b=null,doc=this.getContentDocument();
if(doc&&doc.body){
_79b=UserInterface.getBinding(doc.body);
}
return _79b;
};
WindowBinding.prototype.getPageBinding=function(){
return this._pageBinding;
};
WindowBinding.prototype.setHeight=function(_79d){
this.bindingElement.style.height=_79d+"px";
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
WindowBinding.prototype.handleCrawler=function(_79e){
WindowBinding.superclass.handleCrawler.call(this,_79e);
if(_79e.type==NodeCrawler.TYPE_DESCENDING){
var root=this.getRootBinding();
if(root!=null){
_79e.nextNode=root.bindingElement;
}else{
_79e.response=NodeCrawler.SKIP_CHILDREN;
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
WindowBinding.newInstance=function(_7a3){
var _7a4=DOMUtil.createElementNS(Constants.NS_UI,"ui:window",_7a3);
var _7a5=UserInterface.registerBinding(_7a4,WindowBinding);
return _7a5;
};
PreviewWindowBinding.prototype=new WindowBinding;
PreviewWindowBinding.prototype.constructor=PreviewWindowBinding;
PreviewWindowBinding.superclass=WindowBinding.prototype;
PreviewWindowBinding.URL_FULL_STOP="${root}/content/misc/preview/stop.aspx";
PreviewWindowBinding.ACTION_RETURN="return";
PreviewWindowBinding.TIMEOUT_RETURN=parseInt(2300);
function PreviewWindowBinding(){
this.logger=SystemLogger.getLogger("PreviewWindowBinding");
this._postBackList=null;
this._postBackURL=null;
this._coverBinding=null;
this._windowBinding=null;
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
if(this._windowBinding==null){
this._windowBinding=this._coverBinding.add(WindowBinding.newInstance(this.bindingDocument));
this._windowBinding.setURL(PreviewWindowBinding.URL_FULL_STOP);
this._windowBinding.hide();
this._windowBinding.attach();
this._windowBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_7a9){
_7a9.target.show();
_7a9.consume();
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
PreviewWindowBinding.prototype.handleAction=function(_7ab){
PreviewWindowBinding.superclass.handleAction.call(this,_7ab);
switch(_7ab.type){
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
if(this._loadhandler!=null){
if(this.getURL()!=WindowBinding.DEFAULT_URL){
DOMEvents.removeEventListener(this.getContentWindow(),DOMEvents.BEFOREUNLOAD,this._loadhandler);
this._hasFullStop=false;
this._isReturning=false;
this._coverBinding.show();
if(this._windowBinding!=null){
this._windowBinding.hide();
}
this.setURL(WindowBinding.DEFAULT_URL);
}
}
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
RadioGroupBinding.prototype.onBindingAttach=function(){
RadioGroupBinding.superclass.onBindingAttach.call(this);
};
RadioGroupBinding.prototype.onBindingInitialize=function(){
var _7ac=null;
this._getRadioButtonBindings().each(function(_7ad){
if(_7ad.getProperty("checked")){
_7ac=_7ad;
return false;
}else{
return true;
}
});
if(_7ac){
this._checkedRadioBinding=_7ac;
}
RadioGroupBinding.superclass.onBindingInitialize.call(this);
};
RadioGroupBinding.prototype.handleAction=function(_7ae){
RadioGroupBinding.superclass.handleAction.call(this,_7ae);
var _7af=_7ae.target;
switch(_7ae.type){
case ButtonBinding.ACTION_RADIOBUTTON_ATTACHED:
this._isUpToDate=false;
_7ae.consume();
break;
case ButtonBinding.ACTION_COMMAND:
if(_7af.isRadioButton&&!_7af.isDisabled){
if(this._checkedRadioBinding){
this._unCheckRadioBindingsExcept(_7af);
}
this._checkedRadioBinding=_7af;
this.dispatchAction(RadioGroupBinding.ACTION_SELECTIONCHANGED);
_7ae.consume();
}
break;
}
};
RadioGroupBinding.prototype.setCheckedButtonBinding=function(_7b0,_7b1){
if(_7b0 instanceof RadioDataBinding){
_7b0=_7b0.getButton();
}
if(_7b0.isRadioButton){
switch(_7b1){
case true:
this._unCheckRadioBindingsExcept(_7b0);
this._checkedRadioBinding=_7b0;
_7b0.check(true);
break;
default:
_7b0.check();
break;
}
}
};
RadioGroupBinding.prototype.getCheckedButtonBinding=function(){
return this._checkedRadioBinding;
};
RadioGroupBinding.prototype._unCheckRadioBindingsExcept=function(_7b2){
var _7b3=this._getRadioButtonBindings();
_7b3.each(function(_7b4){
if(_7b4.isChecked&&_7b4!=_7b2){
_7b4.uncheck(true);
}
});
};
RadioGroupBinding.prototype._getRadioButtonBindings=function(){
if(this._radioButtonBindings===null||!this._isUpToDate){
var _7b5=new List();
var _7b6=this.getDescendantBindingsByLocalName("*");
_7b6.each(function(_7b7){
if(_7b7 instanceof ButtonBinding&&_7b7.isRadioButton){
_7b5.add(_7b7);
}
});
this._radioButtonBindings=_7b5;
}
return this._radioButtonBindings;
};
RadioGroupBinding.newInstance=function(_7b8){
var _7b9=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiogroup",_7b8);
return UserInterface.registerBinding(_7b9,RadioGroupBinding);
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
this._time=750;
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
var _7bb=this.getProperty("regexrule");
if(_7bb!=null){
this.expression=new RegExp(_7bb);
}
var _7bc=this.getProperty("onbindingblur");
if(_7bc!=null){
if(Client.isExplorer==true){
_7bc=Binding.parseScriptStatement(_7bc,this.key);
}
this.onblur=function(){
this.bindingWindow.eval(_7bc);
};
}
var _7bd=this.getProperty("onvaluechange");
if(_7bd!=null){
if(Client.isExplorer==true){
_7bd=Binding.parseScriptStatement(_7bd,this.key);
}
this.onValueChange=function(){
this.bindingWindow.eval(_7bd);
};
}
if(this.error==null&&this.type!=null){
var _7be=DataBinding.errors[this.type];
if(_7be!=null){
this.error=_7be;
}
}
};
DataInputBinding.prototype._buildDOMContent=function(){
this.shadowTree.input=this._getInputElement();
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
if(Client.isExplorer==true){
this.bindingElement.hideFocus=true;
}
var _7bf=this.getProperty("value");
if(_7bf!=null){
this.setValue(String(_7bf));
}
var name=this.getProperty("name");
if(name!=null){
this.setName(name);
}
var _7c1=this.getProperty("isdisabled");
if(_7c1==true){
this.setDisabled(true);
}
var _7c2=this.getProperty("readonly");
if(_7c2==true){
this.setReadOnly(true);
}
var _7c3=this.getProperty("autoselect");
if(_7c3==true){
this._isAutoSelect=true;
}
this.shadowTree.box.appendChild(this.shadowTree.input);
this.bindingElement.appendChild(this.shadowTree.box);
if(this.getProperty("callbackid")!=null){
}else{
if(this._isAutoPost){
this.logger.warn("Autopost "+this.toString()+" without a callbackid?");
}
}
};
DataInputBinding.prototype._getInputElement=function(){
var _7c4=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_7c4.type=this.isPassword==true?"password":"text";
_7c4.tabIndex=-1;
return _7c4;
};
DataInputBinding.prototype._attachDOMEvents=function(){
DOMEvents.addEventListener(this.shadowTree.input,DOMEvents.FOCUS,this);
DOMEvents.addEventListener(this.shadowTree.input,DOMEvents.BLUR,this);
DOMEvents.addEventListener(this.shadowTree.input,DOMEvents.KEYDOWN,this);
};
DataInputBinding.prototype.handleEvent=function(e){
DataInputBinding.superclass.handleEvent.call(this,e);
if(this.isFocusable==true){
switch(e.type){
case DOMEvents.FOCUS:
case DOMEvents.BLUR:
this._handleFocusAndBlur(e.type==DOMEvents.FOCUS);
break;
case DOMEvents.KEYDOWN:
var val=this.getValue();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
if(self.getValue()!=val){
self.bindingWindow.DataManager.isDirty=true;
}
}
},0);
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
DataInputBinding.prototype._handleFocusAndBlur=function(_7c8){
if(_7c8){
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
DataInputBinding.prototype.handleBroadcast=function(_7cb,arg){
DataInputBinding.superclass.handleBroadcast.call(this,_7cb,arg);
var self=this;
switch(_7cb){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(Client.isExplorer==true){
var _7ce=DOMEvents.getTarget(arg);
if(_7ce!=this.shadowTree.input){
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
DataInputBinding.prototype.focus=function(_7cf){
if(!this.isFocused&&!this.isReadOnly&&!this.isDisabled){
DataInputBinding.superclass.focus.call(this);
if(this.isFocused==true){
this._focus();
if(this._isAutoSelect==true){
if(_7cf){
var self=this,_7d1=this.bindingElement,_7d2={handleEvent:function(){
self.select();
DOMEvents.removeEventListener(_7d1,DOMEvents.MOUSEUP,this);
}};
DOMEvents.addEventListener(_7d1,DOMEvents.MOUSEUP,_7d2);
}else{
this.select();
}
}
this.onfocus();
if(!_7cf){
var _7d3=this.shadowTree.input;
setTimeout(function(){
FocusBinding.focusElement(_7d3);
},0);
}
}
}
};
DataInputBinding.prototype.select=function(){
var _7d4=this.shadowTree.input;
setTimeout(function(){
if(Client.isExplorer==true){
var _7d5=_7d4.createTextRange();
_7d5.moveStart("character",0);
_7d5.moveEnd("character",_7d4.value.length);
_7d5.select();
}else{
_7d4.setSelectionRange(0,_7d4.value.length);
}
},0);
};
DataInputBinding.prototype.blur=function(_7d6){
if(this.isFocused==true){
DataInputBinding.superclass.blur.call(this);
if(!_7d6){
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
DataInputBinding.prototype.onValueChange=function(){
};
DataInputBinding.prototype.validate=function(_7d8){
if(_7d8==true||this._isValid==true){
var _7d9=this.isValid();
if(_7d9!=this._isValid){
this._isValid=_7d9;
if(!_7d9){
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._value=this.getValue();
this.dispatchAction(Binding.ACTION_INVALID);
if(!this.isFocused){
var _7da=null;
if(this._isInvalidBecauseRequired==true){
_7da=DataBinding.warnings["required"];
}else{
if(this._isInvalidBecauseMinLength==true){
_7da=DataBinding.warnings["minlength"];
_7da=_7da.replace("${count}",String(this.minlength));
}else{
if(this._isInvalidBecauseMaxLength==true){
_7da=DataBinding.warnings["maxlength"];
_7da=_7da.replace("${count}",String(this.maxlength));
}else{
_7da=DataBinding.warnings[this.type];
}
}
}
this.shadowTree.input.className=DataBinding.CLASSNAME_WARNING;
if(_7da!=null){
if(this.isPassword){
if(Client.isMozilla){
this.shadowTree.input.type="text";
this.setValue(_7da);
}else{
alert(_7da);
}
}else{
this.setValue(_7da);
}
}
}
}else{
if(this.hasClassName(DataBinding.CLASSNAME_INVALID)){
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}
this.shadowTree.input.className="";
this.dispatchAction(Binding.ACTION_VALID);
}
}
}
return this._isValid;
};
DataInputBinding.prototype.isValid=function(){
var _7db=true;
this._isInvalidBecauseRequired=false;
this._isInvalidBecauseMinLength=false;
this._isInvalidaBecuaseMaxLength=false;
var _7dc=this.getValue();
if(_7dc==""){
if(this.isRequired==true){
_7db=false;
this._isInvalidBecauseRequired=true;
}
}else{
if(this.type!=null){
var _7dd=DataBinding.expressions[this.type];
if(!_7dd.test(_7dc)){
_7db=false;
}
}else{
if(this.expression!=null){
if(!this.expression.test(_7dc)){
_7db=false;
}
}
}
}
if(_7db&&this.minlength!=null){
if(_7dc.length<this.minlength){
this._isInvalidBecauseMinLength=true;
_7db=false;
}
}
if(_7db&&this.maxlength!=null){
if(_7dc.length>this.maxlength){
this._isInvalidBecauseMaxLength=true;
_7db=false;
}
}
return _7db;
};
DataInputBinding.prototype.setDisabled=function(_7de){
if(_7de!=this.isDisabled){
if(_7de){
this.attachClassName("isdisabled");
}else{
this.detachClassName("isdisabled");
}
var _7df=this.shadowTree.input;
if(_7de){
this._disabledHandler={handleEvent:function(e){
DOMEvents.preventDefault(e);
DOMEvents.stopPropagation(e);
}};
DOMEvents.addEventListener(_7df,DOMEvents.MOUSEDOWN,this._disabledHandler);
}else{
DOMEvents.removeEventListener(_7df,DOMEvents.MOUSEDOWN,this._disabledHandler);
this._disabledHandler=null;
}
if(Client.isExplorer){
this.shadowTree.input.disabled=_7de;
this.shadowTree.input.unselectable=_7de?"on":"off";
}
this.isDisabled=_7de;
this.isFocusable=!_7de;
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
};
DataInputBinding.prototype.setReadOnly=function(_7e1){
if(_7e1!=this.isReadOnly){
if(_7e1){
this.attachClassName("readonly");
}else{
this.detachClassName("readonly");
}
this.shadowTree.input.readOnly=_7e1;
this.isReadOnly=_7e1;
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
DataInputBinding.prototype.handleElement=function(_7e2){
return true;
};
DataInputBinding.prototype.updateElement=function(_7e3){
var _7e4=value=_7e3.getAttribute("value");
if(_7e4==null){
_7e4="";
}
if(this.getValue()!=_7e4){
var _7e5=this.bindingWindow.UpdateManager;
_7e5.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_7e4);
}
return true;
};
DataInputBinding.prototype.manifest=function(){
};
DataInputBinding.prototype.clean=function(){
DataInputBinding.superclass.clean.call(this);
this._sessionResult=this.getResult();
};
DataInputBinding.prototype.setValue=function(_7e6){
if(_7e6===null){
_7e6="";
}
if(_7e6!=this.getValue()){
this.setProperty("value",_7e6);
if(this.shadowTree.input!=null){
this.shadowTree.input.value=String(_7e6);
}
}
};
DataInputBinding.prototype.getValue=function(){
var _7e7=null;
if(this.shadowTree.input!=null){
_7e7=this.shadowTree.input.value;
}else{
_7e7=this.getProperty("value");
}
return _7e7;
};
DataInputBinding.prototype.setName=function(name){
DataInputBinding.superclass.setName.call(this,name);
if(this.isAttached==true){
this.shadowTree.input.name=name;
}
};
DataInputBinding.prototype.getResult=function(){
var _7e9=this.getValue();
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_7e9=Number(_7e9);
break;
}
return _7e9;
};
DataInputBinding.prototype.setResult=DataInputBinding.prototype.setValue;
DataInputBinding.newInstance=function(_7ea){
var _7eb=DOMUtil.createElementNS(Constants.NS_UI,"ui:datainput",_7ea);
return UserInterface.registerBinding(_7eb,DataInputBinding);
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
var _7ec=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_7ec!=null){
this.setValue(_7ec.value);
_7ec.parentNode.removeChild(_7ec);
}
TextBoxBinding.superclass._buildDOMContent.call(this);
this.shadowTree.input.setAttribute("spellcheck","false");
if(!this._hasWordWrap){
this.shadowTree.input.setAttribute("wrap","off");
}
};
TextBoxBinding.prototype._getInputElement=function(){
var _7ed=DOMUtil.createElementNS(Constants.NS_XHTML,"textarea",this.bindingDocument);
_7ed.tabIndex=-1;
return _7ed;
};
TextBoxBinding.prototype.handleElement=function(_7ee){
return true;
};
TextBoxBinding.prototype.updateElement=function(_7ef){
var _7f0,area=_7ef.getElementsByTagName("textarea").item(0);
if(area!=null&&area.hasChildNodes()){
_7f0=DOMUtil.getTextContent(area);
}
if(_7f0==null){
_7f0="";
}
if(this.getValue()!=_7f0){
var _7f2=this.bindingWindow.UpdateManager;
_7f2.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_7f0);
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
IEEditorTextBoxBinding.prototype._handleTabKey=function(_7f6){
var _7f7=this.bindingDocument.selection.createRange();
var _7f8=_7f7.text=="";
if(_7f8&&!_7f6){
_7f7.text="\t";
}else{
var text="";
var _7fa=_7f7.text.length;
while((_7f7.moveStart("word",-1)&&_7f7.text.charAt(1)!="\n")){
}
_7f7.moveStart("character",1);
var _7fb=0;
var i=0,line,_7fe=_7f7.text.split("\n");
while((line=_7fe[i++])!=null){
if(_7f6){
line=line.replace(/^(\s)/mg,"");
_7fb++;
}else{
line=line.replace(/^(.)/mg,"\t$1");
}
text+=line+(_7fe[i+1]?"\n":"");
}
_7f7.text=text;
_7f7.moveStart("character",-_7fa);
if(_7f6){
_7f7.moveStart("character",2*_7fe.length-2);
}
_7f7.select();
}
};
IEEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _7ff=this.bindingDocument.selection.createRange();
var _800=_7ff.duplicate();
while((_800.moveStart("word",-1)&&_800.text.indexOf("\n")==-1)){
}
_800.moveStart("character",1);
_7ff.text="\n"+_800.text.match(/^(\s)*/)[0]+"!";
_7ff.moveStart("character",-1);
_7ff.select();
_7ff.text="";
_7ff.select();
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
MozEditorTextBoxBinding.prototype._handleTabKey=function(_801){
var _802;
var _803;
var oss;
var osy;
var i;
var fnd;
var _808=this._getSelectedText();
var el=this.shadowTree.input;
_802=el.scrollLeft;
_803=el.scrollTop;
if(!_808.match(/\n/)){
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
_808=this._getSelectedText();
if(_801){
ntext=_808.replace(/^(\s)/mg,"");
}else{
ntext=_808.replace(/^(.)/mg,"\t$1");
}
el.value=el.value.substr(0,el.selectionStart)+ntext+el.value.substr(el.selectionEnd);
el.selectionStart=oss;
el.selectionEnd=osy+(ntext.length-_808.length);
}
el.scrollLeft=_802;
el.scrollTop=_803;
};
MozEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _80a;
var _80b;
var oss;
var osy;
var el=this.shadowTree.input;
_80a=el.scrollLeft;
_80b=el.scrollTop;
oss=el.selectionStart;
osy=el.selectionEnd;
var bfs=el.value.substr(0,el.selectionStart);
var bfsm=bfs.split(/\r|\n/g);
var spm=bfsm[bfsm.length-1].match(/^(\s)*/);
el.value=el.value.substr(0,el.selectionStart)+"\n"+spm[0]+el.value.substr(el.selectionEnd);
el.selectionStart=oss+1+spm[0].length;
el.selectionEnd=oss+1+spm[0].length;
el.scrollLeft=_80a;
el.scrollTop=_80b;
};
MozEditorTextBoxBinding.prototype._getSelectedText=function(){
var _812=this.shadowTree.input.value;
var _813=this.shadowTree.input.selectionStart;
var end=this.shadowTree.input.selectionEnd;
return _812.substr(_813,end-_813);
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
var _815=this.getProperty("isdisabled");
if(this.isDisabled||_815){
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
var _817=this.getProperty("label");
var _818=this.getProperty("value");
var _819=this.getProperty("width");
var _81a=this.getProperty("onchange");
var _81b=this.getProperty("required")==true;
if(!this.type&&type){
this.type=type;
}
if(!this.label&&_817!=null){
this.label=_817;
}
if(!this.value&&_818!=null){
this.value=_818;
}
if(!this.width&&_819){
this.width=_819;
}
if(_81b){
this.isRequired=true;
}
if(_81a){
if(Client.isExplorer==true){
_81a=Binding.parseScriptStatement(_81a,this.key);
}
this.onValueChange=function(){
this.bindingWindow.eval(_81a);
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
var _81c=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_81c.name=this.getName();
_81c.value=this.getValue();
_81c.type="hidden";
if(this.getProperty("callbackid")){
_81c.id=this.getProperty("callbackid");
}
this.shadowTree.input=_81c;
this.bindingElement.appendChild(_81c);
};
SelectorBinding.prototype.buildButton=function(){
var _81d=this.BUTTON_IMPLEMENTATION;
var _81e=this.add(_81d.newInstance(this.bindingDocument));
if(this.imageProfile!=null){
_81e.imageProfile=this.imageProfile;
}
if(this.width!=null){
_81e.setWidth(this.width);
}
this._buttonBinding=_81e;
this.shadowTree.button=_81e;
_81e.attach();
};
SelectorBinding.prototype.buildIndicator=function(){
var img=this.bindingDocument.createElement("img");
img.src=SelectorBinding.INDICATOR_IMAGE;
img.className="selectorindicatorimage";
this._buttonBinding.bindingElement.appendChild(img);
this.shadowTree.selectorindicatorimage=img;
};
SelectorBinding.prototype.buildPopup=function(){
var _820=top.app.bindingMap.selectorpopupset;
var doc=_820.bindingDocument;
var _822=_820.add(PopupBinding.newInstance(doc));
var _823=_822.add(MenuBodyBinding.newInstance(doc));
this._popupBinding=_822;
this._menuBodyBinding=_823;
this._popupBinding.attachClassName(SelectorBinding.CLASSNAME_POPUP);
this._popupBinding.attachRecursive();
this._popupBinding.type=PopupBinding.TYPE_FIXED;
_822.attachClassName("selectorpopup");
_822.addActionListener(PopupBinding.ACTION_SHOW,this);
_822.addActionListener(MenuItemBinding.ACTION_COMMAND,this);
_822.addActionListener(PopupBinding.ACTION_HIDE,this);
this._buttonBinding.setPopup(_822);
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
var _826=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_826).each(function(_827){
var _828=_827.getAttribute("label");
var _829=_827.getAttribute("value");
var _82a=_827.getAttribute("selected");
var _82b=_827.getAttribute("image");
var _82c=_827.getAttribute("image-hover");
var _82d=_827.getAttribute("image-active");
var _82e=_827.getAttribute("image-disabled");
var _82f=null;
if(_82b||_82c||_82d||_82e){
_82f=new ImageProfile({image:_82b,imageHover:_82c,imageActive:_82d,imageDisabled:_82e});
}
list.add(new SelectorBindingSelection(_828?_828:null,_829?_829:null,_82a&&_82a=="true",_82f));
});
return list;
};
SelectorBinding.prototype.populateFromList=function(list){
this.clear();
if(list.hasEntries()){
var _831=null;
while(list.hasNext()){
var _832=list.getNext();
var item=this.addSelection(_832);
if(!_831){
_831=item;
}
}
if(!this._selectedItemBinding){
this.select(_831,true);
}
this.shadowTree.selectorindicatorimage.style.display="block";
}else{
this.shadowTree.selectorindicatorimage.style.display="none";
}
};
SelectorBinding.prototype.addSelection=function(_834,_835){
var _836=this.MENUITEM_IMPLEMENTATION;
var _837=this._menuBodyBinding;
var _838=_837.bindingDocument;
var _839=_836.newInstance(_838);
_839.imageProfile=_834.imageProfile;
_839.setLabel(_834.label);
_839.selectionValue=_834.value;
if(_834.isSelected){
this.select(_839,true);
}
_834.menuItemBinding=_839;
if(_835){
_837.addFirst(_839);
this.selections.addFirst(_834);
}else{
_837.add(_839);
this.selections.add(_834);
}
this._isUpToDate=false;
return _839;
};
SelectorBinding.prototype.addSelectionFirst=function(_83a){
return this.addSelection(_83a,true);
};
SelectorBinding.prototype.clear=function(_83b){
this._selectedItemBinding=null;
if(this._popupBinding){
this._popupBinding.clear();
this.selections.clear();
if(!_83b&&this.defaultSelection!=null){
var _83c=this.addSelection(this.defaultSelection);
this.select(_83c,true);
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
SelectorBinding.prototype.setDisabled=function(_83d){
if(this.isAttached==true){
var _83e=this._buttonBinding;
this.shadowTree.selectorindicatorimage.style.display=_83d?"none":"block";
_83e.setDisabled(_83d);
}
if(_83d){
this.setProperty("isdisabled",true);
}else{
this.deleteProperty("isdisabled");
}
};
SelectorBinding.prototype.reset=function(_83f){
if(this.defaultSelection!=null){
this.selectByValue(this.defaultSelection.value,_83f);
}
};
SelectorBinding.prototype.handleAction=function(_840){
SelectorBinding.superclass.handleAction.call(this,_840);
switch(_840.type){
case ButtonBinding.ACTION_COMMAND:
this._onButtonCommand();
_840.consume();
break;
case PopupBinding.ACTION_SHOW:
this._onPopupShowing();
_840.consume();
break;
case MenuItemBinding.ACTION_COMMAND:
this._onMenuItemCommand(_840.target);
_840.consume();
break;
case PopupBinding.ACTION_HIDE:
var self=this;
setTimeout(function(){
if(self.isFocused){
self._grabKeyboard();
}
},0);
_840.consume();
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
SelectorBinding.prototype._onMenuItemCommand=function(_842){
this.select(_842);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
SelectorBinding.prototype._restoreSelection=function(){
if(this._selectedItemBinding){
this._selectedItemBinding.focus();
}
};
SelectorBinding.prototype._fitMenuToSelector=function(){
var _843=this._buttonBinding.bindingElement.offsetWidth+"px";
var _844=this._popupBinding.bindingElement;
if(Client.isMozilla==true){
_844.style.minWidth=_843;
}else{
_844.style.width=_843;
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
SelectorBinding.prototype.handleBroadcast=function(_846,arg){
SelectorBinding.superclass.handleBroadcast.call(this,_846,arg);
switch(_846){
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
SelectorBinding.prototype.select=function(_849,_84a){
var _84b=false;
if(_849!=this._selectedItemBinding){
this._selectedItemBinding=_849;
_84b=true;
var _84c=this._buttonBinding;
this._selectionValue=_849.selectionValue;
_84c.setLabel(_849.getLabel());
if(_849.imageProfile!=null){
_84c.imageProfile=_849.imageProfile;
}
if(_84c.imageProfile!=null){
_84c.setImage(this.isDisabled==true?_84c.imageProfile.getDisabledImage():_84c.imageProfile.getDefaultImage());
}
this._updateImageLayout();
if(!_84a){
this.onValueChange();
this.dispatchAction(SelectorBinding.ACTION_SELECTIONCHANGED);
this.dirty();
}
if(!this._isValid||(this.isRequired&&!_84a)){
this.validate();
}
}
return _84b;
};
SelectorBinding.prototype._relate=function(){
var _84d=this.getProperty("relate");
if(_84d){
var _84e=this.bindingDocument.getElementById(_84d);
if(_84e){
var _84f=UserInterface.getBinding(_84e);
if(_84f){
if(this.isChecked){
_84f.show();
}else{
_84f.hide();
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
SelectorBinding.prototype.selectByValue=function(_850,_851){
var _852=false;
var _853=this._menuBodyBinding;
var _854=_853.getDescendantElementsByLocalName("menuitem");
while(_854.hasNext()){
var _855=UserInterface.getBinding(_854.getNext());
if(_855.selectionValue==_850){
_852=this.select(_855,_851);
break;
}
}
return _852;
};
SelectorBinding.prototype.getValue=function(){
var _856=this._selectionValue;
if(_856!=null){
_856=String(_856);
}
return _856;
};
SelectorBinding.prototype.setValue=function(_857){
this.selectByValue(String(_857),true);
};
SelectorBinding.prototype.getResult=function(){
var _858=this._selectionValue;
if(_858=="null"){
_858=null;
}
if(_858){
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_858=Number(_858);
break;
}
}
return _858;
};
SelectorBinding.prototype.setResult=function(_859){
this.selectByValue(_859,true);
};
SelectorBinding.prototype.validate=function(){
var _85a=true;
if(this.isRequired==true&&this.defaultSelection!=null){
var _85b=this.getValue();
if(_85b==this.defaultSelection.value){
_85a=false;
}
if(_85a!=this._isValid){
if(_85a){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_85a;
}
return _85a;
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
var _85c=this._popupBinding;
if(!this._isUpToDate){
_85c.attachRecursive();
this._isUpToDate=true;
}
};
SelectorBinding.newInstance=function(_85d){
var _85e=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_85d);
return UserInterface.registerBinding(_85e,SelectorBinding);
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
var _861=this.getProperty("onchange");
this.isRequired=this.getProperty("required")==true;
if(this.getProperty("callbackid")){
this._select.id=this.getProperty("callbackid");
}
if(_861){
if(Client.isExplorer==true){
_861=Binding.parseScriptStatement(_861,this.key);
}
this.onValueChange=function(){
this.bindingWindow.eval(_861);
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
SimpleSelectorBinding.prototype.focus=function(_864){
SimpleSelectorBinding.superclass.focus.call(this);
if(this.isFocused){
if(!_864){
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
SimpleSelectorBinding.prototype._hack=function(_865){
if(Client.isExplorer){
this._select.style.width=_865?"auto":this._cachewidth+"px";
if(_865){
if(this._select.offsetWidth<=this._cachewidth){
this._hack(false);
}
}
}
};
SimpleSelectorBinding.prototype.validate=function(){
var _866=true;
if(this.isRequired){
if(this.getValue()==null){
_866=false;
}
}
if(_866!=this._isValid){
if(_866){
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.attachClassName(DataBinding.CLASSNAME_INVALID);
var _867=this._select;
var _868=_867.options[_867.selectedIndex];
var text=DOMUtil.getTextContent(_868);
_867.blur();
_867.style.color="#A40000";
_867.style.fontWeight="bold";
if(!Client.isExplorer6){
DOMUtil.setTextContent(_868,DataBinding.warnings["required"]);
}
_867.onfocus=function(){
this.style.color="black";
this.style.fontWeight="normal";
this.onfocus=null;
if(!Client.isExplorer6){
DOMUtil.setTextContent(_868,text);
}
};
}
this._isValid=_866;
}
return _866;
};
SimpleSelectorBinding.prototype.manifest=function(){
};
SimpleSelectorBinding.prototype.getValue=function(){
var _86a=null;
var _86b=this._select;
var _86c=_86b.options[_86b.selectedIndex];
var _86d=true;
if(Client.isExplorer){
var html=_86c.outerHTML.toLowerCase();
if(html.indexOf("value=")==-1){
_86d=false;
}
}
if(_86d){
_86a=_86c.getAttribute("value");
}
return _86a;
};
SimpleSelectorBinding.prototype.setValue=function(_86f){
};
SimpleSelectorBinding.prototype.getResult=function(){
return this.getValue();
};
SimpleSelectorBinding.prototype.setResult=function(_870){
this.setValue(_870);
};
SimpleSelectorBinding.newInstance=function(_871){
var _872=DOMUtil.createElementNS(Constants.NS_XHTML,"select",_871);
return UserInterface.registerBinding(_872,SimpleSelectorBinding);
};
function SelectorBindingSelection(_873,_874,_875,_876){
this._init(_873,_874,_875,_876);
}
SelectorBindingSelection.prototype={label:null,value:null,isSelected:null,imageProfile:null,menuItemBinding:null,_init:function(_877,_878,_879,_87a){
if(_877!=null){
this.label=String(_877);
}
if(_878!=null){
this.value=String(_878);
}
if(_87a!=null){
this.imageProfile=_87a;
}
this.isSelected=_879?true:false;
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
var _87b=this.addFirst(ToolBarButtonBinding.newInstance(this.bindingDocument));
_87b.popupBindingTargetElement=this.shadowTree.input;
_87b.setImage(DataInputSelectorBinding.INDICATOR_IMAGE);
_87b.attach();
var self=this;
_87b.oncommand=function(){
self._attachSelections();
};
this._buttonBinding=_87b;
};
DataInputSelectorBinding.prototype.buildPopup=SelectorBinding.prototype.buildPopup;
DataInputSelectorBinding.prototype.buildSelections=function(){
var list=new List();
var _87e=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_87e).each(function(_87f){
if(_87f.getAttribute("label")){
throw "label not supported - use value property!";
}else{
var _880=_87f.getAttribute("value");
var _881=_87f.getAttribute("selected");
var _882=_87f.getAttribute("tooltip");
list.add({value:_880?_880:null,toolTip:_882?_882:null,isSelected:(_881&&_881=="true")?true:false});
}
});
if(list.hasEntries()){
this.populateFromList(list);
}
};
DataInputSelectorBinding.prototype.populateFromList=function(list){
var _884=this._menuBodyBinding;
var _885=_884.bindingDocument;
while(_884.bindingElement.hasChildNodes()){
var node=_884.bindingElement.lastChild;
if(node.nodeType==Node.ELEMENT_NODE&&UserInterface.hasBinding(node)){
UserInterface.getBinding(node).dispose();
}else{
_884.removeChild(node);
}
}
if(list.hasEntries()){
this._isUpToDate=false;
if(!this._buttonBinding.isVisible){
this._buttonBinding.show();
}
while(list.hasNext()){
var _887=list.getNext();
var _888=MenuItemBinding.newInstance(_885);
_888.setLabel(_887.value);
_888.selectionValue=_887.value;
if(_887.toolTip){
_888.setToolTip(_887.toolTip);
}
if(_887.isSelected){
this.select(_888,true);
}
_884.add(_888);
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
DataInputSelectorBinding.prototype._onMenuItemCommand=function(_889){
this.select(_889);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
DataInputSelectorBinding.prototype.handleBroadcast=function(_88a,arg){
SelectorBinding.prototype.handleBroadcast.call(this,_88a,arg);
switch(_88a){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(arg!=this._buttonBinding){
DataInputSelectorBinding.superclass.handleBroadcast.call(this,_88a,arg);
}
break;
}
};
DataInputSelectorBinding.prototype._grabKeyboard=SelectorBinding.prototype._grabKeyboard;
DataInputSelectorBinding.prototype._releaseKeyboard=SelectorBinding.prototype._releaseKeyboard;
DataInputSelectorBinding.prototype._handleArrowKey=SelectorBinding.prototype._handleArrowKey;
DataInputSelectorBinding.prototype.focus=function(_88c){
if(!this.isFocused){
DataInputSelectorBinding.superclass.focus.call(this,_88c);
if(this.isFocused==true){
this._grabKeyboard();
}
}
};
DataInputSelectorBinding.prototype.blur=function(_88d){
if(this.isFocused==true){
DataInputSelectorBinding.superclass.blur.call(this,_88d);
this._releaseKeyboard();
if(this._popupBinding.isVisible){
this._popupBinding.hide();
}
}
};
DataInputSelectorBinding.prototype._fitMenuToSelector=function(){
var _88e=this.bindingElement.offsetWidth+"px";
var _88f=this._popupBinding.bindingElement;
if(Client.isMozilla){
_88f.style.minWidth=_88e;
}else{
_88f.style.width=_88e;
}
};
DataInputSelectorBinding.prototype._restoreSelection=function(){
if(!this._isUpToDate){
this._attachSelections();
}
var _890=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
var _891=this.getValue();
var _892=null;
_890.each(function(item){
if(item.getLabel()==_891){
_892=item;
}
});
if(_892){
_892.focus();
}
};
DataInputSelectorBinding.prototype.select=function(item,_895){
if(item!=this._selectedItemBinding){
this._selectedItemBinding=item;
this.setValue(item.selectionValue);
if(!_895){
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
var _896=ToolBarButtonBinding.newInstance(this.bindingDocument);
_896.setImage("${icon:popup}");
this.addFirst(_896);
_896.attach();
var self=this;
_896.oncommand=function(){
self._isButtonClicked=true;
setTimeout(function(){
self._isButtonClicked=false;
},1000);
var _898=self.getProperty("handle");
var _899=ViewDefinitions[_898];
if(_899 instanceof DialogViewDefinition){
_899.handler={handleDialogResponse:function(_89a,_89b){
self._isButtonClicked=false;
if(_89a==Dialog.RESPONSE_ACCEPT){
self.logger.debug("Usecase scenario was hardcoded into DataInputDialogBinding#buildButton");
var _89c=_89b.getFirst();
self.setValue(_89c);
self.validate(true);
}
self.focus();
}};
_899.argument.selectedResult=self.getValue();
StageBinding.presentViewDefinition(_899);
}else{
throw "Definition was either undefine or of a non-dialog type.";
}
};
DOMEvents.addEventListener(_896.getBindingElement(),DOMEvents.MOUSEDOWN,{handleEvent:function(e){
self._isButtonClicked=true;
}});
this._dialogButtonBinding=_896;
};
DataInputDialogBinding.prototype.oncommand=function(){
var _89e=this._dialogButtonBinding;
if(_89e!=null){
_89e.oncommand();
}
};
DataInputDialogBinding.prototype.validate=function(arg){
var _8a0=true;
if(this._isButtonClicked==true){
this._isButtonClicked=false;
}else{
_8a0=DataInputDialogBinding.superclass.validate.call(this,arg);
}
return _8a0;
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
var _8a1=this.getProperty("label");
var _8a2=this.getProperty("tooltip");
this._buttonBinding=this.add(ClickButtonBinding.newInstance(this.bindingDocument));
if(_8a1!=null){
if(this.getProperty("handle")!=null||this.getProperty("url")!=null){
this._buttonBinding.setLabel(_8a1+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}else{
this._buttonBinding.setLabel(_8a1);
}
}
if(this.imageProfile){
this._buttonBinding.imageProfile=this.imageProfile;
}
if(_8a2!=null){
this._buttonBinding.setToolTip(_8a2);
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
DataDialogBinding.prototype.handleAction=function(_8a4){
DataDialogBinding.superclass.handleAction.call(this,_8a4);
var _8a5=_8a4.target;
var self=this;
switch(_8a4.type){
case ButtonBinding.ACTION_COMMAND:
if(this._handler==null){
this._handler={handleDialogResponse:function(_8a7,_8a8){
if(_8a7==Dialog.RESPONSE_ACCEPT){
if(_8a8 instanceof DataBindingMap){
self._map=_8a8;
}else{
throw "Invalid dialog result";
}
}
}};
}
if(_8a5==this._buttonBinding){
_8a4.consume();
this.focus();
this.fireCommand();
}
break;
}
};
DataDialogBinding.prototype.handleBroadcast=function(_8a9,arg){
DataDialogBinding.superclass.handleBroadcast.call(this,_8a9,arg);
switch(_8a9){
case BroadcastMessages.KEY_SPACE:
this.fireCommand();
break;
}
};
DataDialogBinding.prototype.fireCommand=function(def){
this.dispatchAction(this.constructor.ACTION_COMMAND);
var _8ac=this.getProperty("handle");
var url=this.getURL();
var _8ae=null;
if(_8ac!=null||def!=null){
if(_8ac!=null){
_8ae=ViewDefinitions[_8ac];
}else{
_8ae=def;
}
if(_8ae instanceof DialogViewDefinition){
_8ae.handler=this._handler;
if(this._map!=null){
_8ae.argument=this._map;
}
StageBinding.presentViewDefinition(_8ae);
}
}else{
if(url!=null){
_8ae=Dialog.invokeModal(url,this._handler,this._map);
}
}
if(_8ae!=null){
this._dialogViewHandle=_8ae.handle;
this._releaseKeyboard();
}
};
DataDialogBinding.prototype.setLabel=function(_8af){
this.setProperty("label",_8af);
if(this.isAttached){
this._buttonBinding.setLabel(_8af+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}
};
DataDialogBinding.prototype.setImage=function(_8b0){
this.setProperty("image",_8b0);
if(this.imageProfile!=null){
this.imageProfile.setDefaultImage(_8b0);
if(this._buttonBinding!=null){
this._buttonBinding.imageProfile=this.imageProfile;
this._buttonBinding.setImage(this._buttonBinding.imageProfile.getDefaultImage());
}
}
};
DataDialogBinding.prototype.setToolTip=function(_8b1){
this.setProperty("tooltip",_8b1);
if(this.isAttached){
this._buttonBinding.setToolTip(_8b1);
}
};
DataDialogBinding.prototype.setHandle=function(_8b2){
this.setProperty("handle",_8b2);
};
DataDialogBinding.prototype.setURL=function(url){
this.setProperty("url",url);
};
DataDialogBinding.prototype.getURL=function(){
return this.getProperty("url");
};
DataDialogBinding.prototype.setHandler=function(_8b4){
this._handler=_8b4;
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
DataDialogBinding.newInstance=function(_8b6){
var _8b7=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_8b6);
return UserInterface.registerBinding(_8b7,DataDialogBinding);
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
this._handler={handleDialogResponse:function(_8b9,_8ba){
if(_8b9==Dialog.RESPONSE_ACCEPT){
self._onDialogAccept(_8ba);
}else{
self._onDialogCancel();
}
}};
};
PostBackDataDialogBinding.prototype._onDialogAccept=function(_8bb){
_8bb=new String(_8bb);
this.dirty();
this.setValue(encodeURIComponent(_8bb));
var self=this;
setTimeout(function(){
self.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
},0);
};
PostBackDataDialogBinding.prototype._onDialogCancel=function(){
};
PostBackDataDialogBinding.prototype.getURL=function(){
var url=this.getProperty("url");
var suf=this.getValue();
return new String(url+suf);
};
PostBackDataDialogBinding.prototype.manifest=function(){
this.shadowTree.dotnetinput.value=this.getValue();
};
PostBackDataDialogBinding.prototype.setValue=function(_8bf){
this.setProperty("value",_8bf);
};
PostBackDataDialogBinding.prototype.getValue=function(){
return this.getProperty("value");
};
PostBackDataDialogBinding.prototype.getResult=function(){
return null;
};
DataDialogBinding.prototype.setResult=function(_8c0){
};
FunctionPostBackDataDialogBinding.prototype=new PostBackDataDialogBinding;
FunctionPostBackDataDialogBinding.prototype.constructor=FunctionPostBackDataDialogBinding;
FunctionPostBackDataDialogBinding.superclass=PostBackDataDialogBinding.prototype;
function FunctionPostBackDataDialogBinding(){
this.logger=SystemLogger.getLogger("FunctionPostBackDataDialogBinding");
return this;
}
FunctionPostBackDataDialogBinding.prototype.toString=function(){
return "[FunctionPostBackDataDialogBinding]";
};
FunctionPostBackDataDialogBinding.prototype.fireCommand=function(){
var _8c1=this.getProperty("dialoglabel");
var _8c2=this.getProperty("providersearch");
var def=ViewDefinition.clone("Composite.Management.FunctionSelectorDialog","Generated.FunctionSelectorDialog.Handle."+KeyMaster.getUniqueKey());
if(_8c1!=null){
def.argument.label=_8c1;
}
if(_8c2!=null){
def.argument.nodes[0].search=_8c2;
}
FunctionPostBackDataDialogBinding.superclass.fireCommand.call(this,def);
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
var _8c4=this._dataDialogBinding;
if(_8c4!=null){
DOMEvents.addEventListener(this.shadowTree.box,DOMEvents.DOUBLECLICK,{handleEvent:function(){
_8c4.fireCommand();
}});
}
};
MultiSelectorBinding.prototype._buildDOMContent=function(){
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
this.bindingElement.appendChild(this.shadowTree.box);
};
MultiSelectorBinding.prototype._parseDOMProperties=function(){
var _8c5=this.getProperty("editable");
var _8c6=this.getProperty("selectable");
var _8c7=this.getProperty("display");
if(_8c5!=false){
this._buildEditorButton();
}else{
this.isEditable=false;
}
if(_8c6){
this.isSelectable=true;
this._selectionMap=new Map();
}
if(_8c7){
this._display=_8c7;
}
};
MultiSelectorBinding.prototype._buildEditorButton=function(){
if(this.isEditable){
var _8c8=MultiSelectorDataDialogBinding.newInstance(this.bindingDocument);
_8c8.selections=this.selections;
this.add(_8c8);
_8c8.attach();
this._dataDialogBinding=_8c8;
this.shadowTree.datadialog=_8c8;
}
};
MultiSelectorBinding.prototype.populateFromList=function(list){
list.reset();
var _8ca=false;
this.shadowTree.box.innerHTML="";
while(list.hasNext()){
var _8cb=list.getNext();
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_8ca=_8cb.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_8ca=_8cb.isSelected!=true;
break;
}
if(_8ca){
this.shadowTree.box.appendChild(this._getElementForSelection(_8cb));
}
}
this.selections=list;
if(this._dataDialogBinding){
this._dataDialogBinding.selections=this.selections;
}
};
MultiSelectorBinding.prototype.cumulateFromList=function(list,_8cd){
var box=this.shadowTree.box;
var _8cf=false;
if(list.hasEntries()){
list.reverse().reset();
while(list.hasNext()){
var _8d0=list.getNext();
if(_8cd){
_8d0.isSelected=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
_8cf=true;
}else{
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_8cf=_8d0.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_8cf=_8d0.isSelected!=true;
break;
}
}
if(_8cf){
var _8d1=this._getElementForSelection(_8d0);
box.insertBefore(_8d1,box.firstChild);
CSSUtil.attachClassName(_8d1,"selected");
this._selectionMap.set(_8d0.value,_8d1);
}
}
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
};
MultiSelectorBinding.prototype._getElementForSelection=function(_8d2){
var _8d3=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument);
_8d3.appendChild(this.bindingDocument.createTextNode(_8d2.label));
_8d3.setAttribute("label",_8d2.label);
_8d3.setAttribute("value",_8d2.value);
return _8d3;
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
var _8d5=DOMEvents.getTarget(e);
var _8d6=DOMUtil.getLocalName(_8d5);
if(_8d6=="div"){
this._handleMouseDown(_8d5);
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
break;
}
};
MultiSelectorBinding.prototype._handleMouseDown=function(_8d7){
if(Keyboard.isShiftPressed&&this._lastSelectedElement){
var _8d8=this._getElements();
var _8d9=_8d7.getAttribute("value");
var _8da=this._lastSelectedElement.getAttribute("value");
var _8db=false;
while(_8d8.hasNext()){
var el=_8d8.getNext();
switch(el.getAttribute("value")){
case _8d9:
case _8da:
_8db=!_8db;
break;
}
if(_8db){
this._hilite(el);
}else{
this._unhilite(el);
}
this._hilite(this._lastSelectedElement);
this._hilite(_8d7);
}
}else{
if(Keyboard.isControlPressed&&this._isHilited(_8d7)){
this._unhilite(_8d7);
}else{
this._hilite(_8d7);
}
if(!Keyboard.isControlPressed){
var self=this;
this._getElements().each(function(el){
if(el!=_8d7){
self._unhilite(el);
}
});
}
}
this._lastSelectedElement=_8d7;
};
MultiSelectorBinding.prototype._hilite=function(_8df){
var _8e0=_8df.getAttribute("value");
if(!this._selectionMap.has(_8e0)){
CSSUtil.attachClassName(_8df,"selected");
this._selectionMap.set(_8e0,_8df);
}
};
MultiSelectorBinding.prototype._unhilite=function(_8e1){
var _8e2=_8e1.getAttribute("value");
if(this._selectionMap.has(_8e2)){
CSSUtil.detachClassName(_8e1,"selected");
this._selectionMap.del(_8e2);
}
};
MultiSelectorBinding.prototype._isHilited=function(_8e3){
return CSSUtil.hasClassName(_8e3,"selected");
};
MultiSelectorBinding.prototype.handleAction=function(_8e4){
MultiSelectorBinding.superclass.handleAction.call(this,_8e4);
var _8e5=_8e4.target;
switch(_8e4.type){
case DataDialogBinding.ACTION_COMMAND:
if(_8e5==this._dataDialogBinding){
if(!this.isFocused){
this.focus();
}
this.dispatchAction(MultiSelectorBinding.ACTION_COMMAND);
_8e4.consume();
}
break;
case MultiSelectorDataDialogBinding.ACTION_RESULT:
this.populateFromList(_8e5.result);
this.dirty();
_8e5.result=null;
_8e4.consume();
break;
}
};
MultiSelectorBinding.prototype.extractSelected=function(){
var _8e6=null;
if(this.isSelectable){
_8e6=new List();
if(this._selectionMap&&this._selectionMap.hasEntries()){
var self=this;
this._getElements().each(function(_8e8){
if(self._isHilited(_8e8)){
_8e8.parentNode.removeChild(_8e8);
_8e6.add(new SelectorBindingSelection(_8e8.getAttribute("label"),_8e8.getAttribute("value"),true));
}
});
this._selectionMap=new Map();
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
return _8e6;
};
MultiSelectorBinding.prototype.reposition=function(isUp){
var _8ea=this._getElements();
if(!isUp){
_8ea.reverse();
}
var _8eb=true;
while(_8eb&&_8ea.hasNext()){
var _8ec=_8ea.getNext();
if(this._isHilited(_8ec)){
switch(isUp){
case true:
if(_8ec.previousSibling){
_8ec.parentNode.insertBefore(_8ec,_8ec.previousSibling);
}else{
_8eb=false;
}
break;
case false:
if(_8ec.nextSibling){
_8ec.parentNode.insertBefore(_8ec,_8ec.nextSibling.nextSibling);
}else{
_8eb=false;
}
break;
}
}
}
};
MultiSelectorBinding.prototype.toSelectionList=function(){
var _8ed=new List();
var _8ee=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
var self=this;
this._getElements().each(function(_8f0){
var _8f1=new SelectorBindingSelection(_8f0.getAttribute("label"),_8f0.getAttribute("value"),_8ee);
_8f1.isHighlighted=self._isHilited(_8f0);
_8ed.add(_8f1);
});
return _8ed;
};
MultiSelectorBinding.prototype._getElements=function(){
return new List(DOMUtil.getElementsByTagName(this.shadowTree.box,"div"));
};
MultiSelectorBinding.prototype._getSelectionsList=SelectorBinding.prototype._getSelectionsList;
MultiSelectorBinding.prototype.validate=function(){
return true;
};
MultiSelectorBinding.prototype.manifest=function(){
var _8f2=new List(DOMUtil.getElementsByTagName(this.bindingElement,"input"));
if(_8f2.hasEntries()){
_8f2.each(function(_8f3){
_8f3.parentNode.removeChild(_8f3);
});
}
this.selections.reset();
while(this.selections.hasNext()){
var _8f4=this.selections.getNext();
if(_8f4.isSelected){
var _8f5=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_8f5.name=this._name;
_8f5.value=_8f4.value;
this.bindingElement.appendChild(_8f5);
}
}
};
MultiSelectorBinding.prototype.getValue=function(){
return "HEJ!";
};
MultiSelectorBinding.prototype.setValue=function(_8f6){
alert(_8f6);
};
MultiSelectorBinding.prototype.getResult=function(){
alert("TODO: MultiSelectorBinding#getResult");
return new Array();
};
MultiSelectorBinding.prototype.setResult=function(_8f7){
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
var _8f8={label:DataBinding.getAssociatedLabel(this),value:decodeURIComponent(this.getValue()),configuration:{"formattingconfiguration":this.getProperty("formattingconfiguration"),"elementclassconfiguration":this.getProperty("elementclassconfiguration"),"configurationstylesheet":this.getProperty("configurationstylesheet"),"presentationstylesheet":this.getProperty("presentationstylesheet"),"embedablefieldstypenames":this.getProperty("embedablefieldstypenames")}};
var _8f9=ViewDefinitions["Composite.Management.VisualEditorDialog"];
_8f9.handler=this._handler;
_8f9.argument=_8f8;
StageBinding.presentViewDefinition(_8f9);
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
var _8fa={label:DataBinding.getAssociatedLabel(this),selections:this.selections};
var self=this;
var _8fc={handleDialogResponse:function(_8fd,_8fe){
if(_8fd==Dialog.RESPONSE_ACCEPT){
self.result=_8fe;
self.dispatchAction(MultiSelectorDataDialogBinding.ACTION_RESULT);
}
}};
var _8ff=ViewDefinitions[this._dialogViewHandle];
_8ff.handler=_8fc;
_8ff.argument=_8fa;
StageBinding.presentViewDefinition(_8ff);
};
MultiSelectorDataDialogBinding.newInstance=function(_900){
var _901=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_900);
return UserInterface.registerBinding(_901,MultiSelectorDataDialogBinding);
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
LazyBindingBinding.wakeUp=function(_902){
var id=_902.bindingElement.id+LazyBindingBinding.ID_APPENDIX;
var _904=_902.bindingDocument.getElementById(id);
if(_904){
var _905=UserInterface.getBinding(_904);
_905.setResult(true);
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
if(id){
this.bindingElement.id=id+LazyBindingBinding.ID_APPENDIX;
var _907=this.bindingDocument.getElementById(id);
if(_907){
var _908=UserInterface.getBinding(_907);
if(_908&&!_908.isAttached){
_908.isLazy=true;
}else{
_907.setAttribute("lazy",true);
}
}
}
};
LazyBindingBinding.prototype.validate=function(){
return true;
};
LazyBindingBinding.prototype.manifest=function(){
if(this.isAttached==true){
if(!this.shadowTree.input){
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
LazyBindingBinding.prototype.setResult=function(_909){
this._isLazy=_909;
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
var url=this._url;
var _90b=this.getProperty("stateprovider");
var _90c=this.getProperty("handle");
if(_90b!=null&&_90c!=null){
url=url.replace("${stateprovider}",_90b).replace("${handle}",_90c);
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
EditorDataBinding.prototype._onPageInitialize=function(_90d){
EditorDataBinding.superclass._onPageInitialize.call(this,_90d);
if(this._pageBinding!=null){
Application.unlock(this);
}
};
EditorDataBinding.prototype.setName=DataBinding.prototype.setName;
EditorDataBinding.prototype.validate=function(){
return this._pageBinding.validateAllDataBindings();
};
EditorDataBinding.prototype.handleAction=function(_90e){
EditorDataBinding.superclass.handleAction.call(this,_90e);
switch(_90e.type){
case Binding.ACTION_DIRTY:
if(_90e.target!=this){
if(!this.isDirty){
this.dirty();
}
_90e.consume();
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
EditorDataBinding.prototype.setValue=function(_90f){
};
EditorDataBinding.prototype.getResult=function(){
return null;
};
EditorDataBinding.prototype.setResult=function(_910){
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
var _914=true;
if(this.getProperty("required")){
var fake=this.getDescendantBindingByLocalName("datainput");
_914=fake.getValue()!="";
}
if(!_914&&this._isValid){
this._isValid=false;
this.dispatchAction(Binding.ACTION_INVALID);
}else{
if(_914&&!this._isValid){
this.dispatchAction(Binding.ACTION_VALID);
}
}
return _914;
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
this.setProperty("callbackid",RequestBinding.CALLBACK_ID);
Binding.dotnetify(this);
var _918=this.bindingDocument.getElementById(RequestBinding.INPUT_ID);
if(_918!=null){
_918.value=Application.CONSOLE_ID;
}
};
RequestBinding.prototype.postback=function(_919){
_919=_919!=null?_919:EditorPageBinding.message;
this.shadowTree.dotnetinput.value=_919;
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
var _91a=Templates.getTemplateElementText("fieldgroupmatrix.xml");
var _91b=_91a.replace("${markup}",this.bindingElement.innerHTML);
try{
this.bindingElement.innerHTML=_91b;
}
catch(exception1){
this.logger.error("Exeption in innerHTML!");
_91b=_91b.replace(/\&nbsp;/g,"");
this.bindingElement.innerHTML=_91b;
}
var self=this;
var _91d=DOMUtil.getElementsByTagName(this.bindingElement,"table").item(0);
new List(_91d.rows).each(function(row){
new List(row.cells).each(function(cell){
self.shadowTree[cell.className]=cell;
});
});
};
FieldGroupBinding.prototype._buildDOMContent=function(){
var _920=this.getProperty("label");
if(_920){
this.setLabel(_920);
}else{
this.attachClassName(FieldGroupBinding.CLASSNAME_NOLABEL);
}
};
FieldGroupBinding.prototype.setLabel=function(_921){
this.setProperty("label",_921);
if(this.shadowTree.labelBinding==null){
var _922=LabelBinding.newInstance(this.bindingDocument);
var cell=this.shadowTree[FieldGroupBinding.NORTH];
_922.attachClassName("fieldgrouplabel");
cell.insertBefore(_922.bindingElement,cell.getElementsByTagName("div").item(1));
_922.attach();
this.shadowTree.labelBinding=_922;
}
this.shadowTree.labelBinding.setLabel(Resolver.resolve(_921));
};
FieldGroupBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
FieldGroupBinding.prototype.add=function(_924){
this.shadowTree[FieldGroupBinding.CENTER].appendChild(_924.bindingElement);
return _924;
};
FieldGroupBinding.prototype.addFirst=function(_925){
var _926=this.shadowTree[FieldGroupBinding.CENTER];
_926.insertBefore(_925.bindingElement,_926.firstChild);
return _925;
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
var _927=this.getProperty("relation");
if(_927!=null){
this.bindingRelation=_927;
this.subscribe(BroadcastMessages.BINDING_RELATE);
}
};
FieldBinding.prototype.handleBroadcast=function(_928,arg){
FieldBinding.superclass.handleBroadcast.call(this,_928,arg);
switch(_928){
case BroadcastMessages.BINDING_RELATE:
if(arg.relate==this.bindingRelation&&arg.origin==this.bindingDocument){
if(arg.result==true){
this.show();
}else{
this.hide();
}
this.dispatchAction(Binding.ACTION_UPDATED);
}
break;
}
};
FieldBinding.newInstance=function(_92a){
var _92b=DOMUtil.createElementNS(Constants.NS_UI,"ui:field",_92a);
return UserInterface.registerBinding(_92b,FieldBinding);
};
FieldsBinding.prototype=new Binding;
FieldsBinding.prototype.constructor=FieldsBinding;
FieldsBinding.superclass=Binding.prototype;
FieldsBinding.ACTION_LAYOUT_UPDATED="fieldslayoutupdated";
function FieldsBinding(){
this.logger=SystemLogger.getLogger("FieldsBinding");
this._invalidCount=0;
this._invalidFieldLabels=null;
this.crawlerFilters=new List([FlexBoxCrawler.ID]);
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
var _92c=this.getDescendantBindingByLocalName("fieldgroup");
if(_92c!=null){
_92c.attachClassName(FieldGroupBinding.CLASSNAME_FIRST);
}
};
FieldsBinding.prototype.onBindingDispose=function(){
FieldsBinding.superclass.onBindingDispose.call(this);
if(this._invalidCount>0){
this.dispatchAction(Binding.ACTION_VALID);
}
};
FieldsBinding.prototype.validate=function(){
var _92d=true;
var _92e=this.getDescendantBindingsByLocalName("*");
while(_92e.hasNext()){
var _92f=_92e.getNext();
if(Interfaces.isImplemented(IData,_92f)){
var _930=_92f.validate();
if(_92d&&!_930){
_92d=false;
}
}
}
return _92d;
};
FieldsBinding.prototype.handleAction=function(_931){
FieldsBinding.superclass.handleAction.call(this,_931);
var _932=_931.target;
if(_932!=this){
switch(_931.type){
case Binding.ACTION_INVALID:
var _933=DataBinding.getAssociatedLabel(_932);
if(_933){
this._invalidFieldLabels.set(_932.key,_933);
}
if(_932.error){
if(!_932.isInvalidBecauseRequired){
ErrorBinding.presentError({text:_932.error},_932);
}
}
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_INVALID);
}
this._invalidCount++;
_931.consume();
break;
case Binding.ACTION_VALID:
if(this._invalidFieldLabels.has(_932.key)){
this._invalidFieldLabels.del(_932.key);
}
this._invalidCount--;
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_VALID);
}
_931.consume();
break;
}
}
};
FieldsBinding.prototype.getInvalidLabels=function(){
var _934=null;
if(this._invalidFieldLabels.hasEntries()){
_934=this._invalidFieldLabels.toList();
}
return _934;
};
FieldsBinding.newInstance=function(_935){
var _936=DOMUtil.createElementNS(Constants.NS_UI,"ui:fields",_935);
return UserInterface.registerBinding(_936,FieldsBinding);
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
var _937=this.getProperty("image");
if(_937){
this.setImage(_937);
}
var _938=this.getProperty("tooltip");
if(_938){
this.setToolTip(_938);
}
var _939=this.getProperty("label");
if(_939){
this.setLabel(_939);
}
};
FieldDescBinding.prototype.attachDOMEvents=function(){
this.addEventListener(DOMEvents.CLICK);
};
FieldDescBinding.prototype.handleEvent=function(e){
FieldDescBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.CLICK:
var _93b=this.getAncestorBindingByLocalName("field");
if(_93b){
var _93c=true;
_93b.getDescendantBindingsByLocalName("*").each(function(_93d){
if(Interfaces.isImplemented(IData,_93d)){
_93d.focus();
_93c=false;
}
return _93c;
});
}
break;
}
};
FieldDescBinding.prototype.setLabel=function(_93e){
this.setProperty("label",_93e);
if(this.isAttached){
this.bindingElement.innerHTML=Resolver.resolve(_93e);
}
};
FieldDescBinding.prototype.getLabel=function(){
var _93f=this.getProperty("label");
if(!_93f){
var node=this.bindingElement.firstChild;
if(node&&node.nodeType==Node.TEXT_NODE){
_93f=node.data;
}
}
return _93f;
};
FieldDescBinding.prototype.setImage=function(_941){
this.setProperty("image",_941);
if(this.isAttached){
throw "FieldDescBinding: Images not suppoerted!";
}
};
FieldDescBinding.prototype.setToolTip=function(_942){
this.setProperty("tooltip",_942);
if(this.isAttached){
this.bindingElement.title=_942;
}
};
FieldDescBinding.newInstance=function(_943){
var _944=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddesc",_943);
return UserInterface.registerBinding(_944,FieldDescBinding);
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
FieldDataBinding.newInstance=function(_945){
var _946=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddata",_945);
return UserInterface.registerBinding(_946,FieldDataBinding);
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
var _947=this._fieldHelpPopupBinding;
if(_947){
_947.dispose();
}
};
FieldHelpBinding.prototype.buildPopupBinding=function(){
var _948=app.bindingMap.fieldhelpopupset;
var doc=_948.bindingDocument;
var _94a=_948.add(PopupBinding.newInstance(doc));
var _94b=_94a.add(PopupBodyBinding.newInstance(doc));
_94a.position=PopupBinding.POSITION_RIGHT;
_94a.attachClassName("fieldhelppopup");
if(this.bindingElement.hasChildNodes()){
_94b.bindingElement.innerHTML=this.bindingElement.innerHTML;
}else{
var _94c=this.getProperty("label");
if(_94c){
_94b.bindingElement.innerHTML=Resolver.resolve(_94c);
}
}
this.bindingElement.innerHTML="";
this._fieldHelpPopupBinding=_94a;
};
FieldHelpBinding.prototype.buildPopupButton=function(){
var _94d=this.getAncestorBindingByLocalName("field");
if(_94d){
_94d.attachClassName("fieldhelp");
var _94e=ClickButtonBinding.newInstance(this.bindingDocument);
_94e.attachClassName("fieldhelp");
_94e.setImage(FieldHelpBinding.INDICATOR_IMAGE);
this.add(_94e);
_94e.attach();
var self=this;
_94e.oncommand=function(){
self.attachPopupBinding();
};
_94e.setPopup(this._fieldHelpPopupBinding);
this._fieldHelpButton=_94e;
}
};
FieldHelpBinding.prototype.attachPopupBinding=function(){
var _950=this._fieldHelpPopupBinding;
if(_950&&!_950.isAttached){
_950.attachRecursive();
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
RadioDataGroupBinding.prototype.handleAction=function(_952){
RadioDataGroupBinding.superclass.handleAction.call(this,_952);
switch(_952.type){
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
RadioDataGroupBinding.prototype.handleBroadcast=function(_954,arg){
RadioDataGroupBinding.superclass.handleBroadcast.call(this,_954,arg);
switch(_954){
case BroadcastMessages.KEY_ARROW:
var _956=null;
var next=null;
var _958=null;
switch(arg){
case KeyEventCodes.VK_DOWN:
case KeyEventCodes.VK_UP:
_958=this.getChildBindingsByLocalName("radio");
while(!_956&&_958.hasNext()){
var _959=_958.getNext();
if(_959.getProperty("checked")){
_956=_959;
}
}
break;
}
if(_956){
switch(arg){
case KeyEventCodes.VK_DOWN:
next=_958.getFollowing(_956);
while(next!=null&&next.isDisabled){
next=_958.getFollowing(next);
}
break;
case KeyEventCodes.VK_UP:
next=_958.getPreceding(_956);
while(next!=null&&next.isDisabled){
next=_958.getPreceding(next);
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
RadioDataGroupBinding.prototype.focus=function(_95a){
if(!this.isFocused){
DataBinding.prototype.focus.call(this);
if(this.isFocused){
if(!_95a){
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
var _95b=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_95b.type="hidden";
_95b.name=this._name;
this.bindingElement.appendChild(_95b);
this.shadowTree.input=_95b;
}
this.shadowTree.input.value=this.getValue();
}
};
RadioDataGroupBinding.prototype.getValue=function(){
var _95c=null;
var _95d=this.getChildBindingsByLocalName("radio");
while(!_95c&&_95d.hasNext()){
var _95e=_95d.getNext();
if(_95e.isChecked){
_95c=_95e.getProperty("value");
}
}
return _95c;
};
RadioDataGroupBinding.prototype.getResult=RadioDataGroupBinding.prototype.getValue;
RadioDataGroupBinding.prototype.setValue=function(_95f){
};
RadioDataGroupBinding.prototype.setResult=function(_960){
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
this.propertyMethodMap["checked"]=this.setChecked;
this._buttonBinding=this.add(RadioButtonBinding.newInstance(this.bindingDocument));
this._hack();
if(this.getProperty("checked")==true){
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
var _961=this.getProperty("relate");
var _962=this.getProperty("oncommand");
if(_961){
this.bindingRelate=_961;
this.relate();
}
if(_962){
if(Client.isExplorer==true){
_962=Binding.parseScriptStatement(_962,this.key);
}
this.oncommand=function(){
this.bindingWindow.eval(_962);
};
}
if(this.getProperty("callbackid")!=null){
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
var _964=this.getProperty("callbackid");
this._buttonBinding.check=function(_965){
RadioButtonBinding.prototype.check.call(this,_965);
self.setProperty("checked",true);
self.isChecked=true;
self.relate();
};
this._buttonBinding.uncheck=function(_966){
RadioButtonBinding.prototype.uncheck.call(this,_966);
self.deleteProperty("checked");
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
RadioDataBinding.prototype.setChecked=function(_967,_968){
this._buttonBinding.setChecked(_967,_968);
if(this.bindingRelate!=null){
this.relate();
}
this.setProperty("checked",_967);
};
RadioDataBinding.prototype.check=function(_969){
this.setChecked(true,_969);
};
RadioDataBinding.prototype.uncheck=function(_96a){
this.setChecked(false,_96a);
};
RadioDataBinding.prototype.setDisabled=function(_96b){
if(_96b!=this.isDisabled){
this.isDisabled=_96b;
this._buttonBinding.setDisabled(_96b);
if(_96b){
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
var _96d=DOMEvents.getTarget(e);
switch(_96d){
case this.shadowTree.labelText:
if(!this.isChecked&&!this.isDisabled){
this.check();
}
break;
}
}
};
RadioDataBinding.prototype._buildLabelText=function(){
var _96e=this.getProperty("label");
if(_96e){
this.shadowTree.labelText=DOMUtil.createElementNS(Constants.NS_UI,"ui:datalabeltext",this.bindingDocument);
this.shadowTree.labelText.appendChild(this.bindingDocument.createTextNode(Resolver.resolve(_96e)));
DOMEvents.addEventListener(this.shadowTree.labelText,DOMEvents.CLICK,this);
this.bindingElement.appendChild(this.shadowTree.labelText);
}
};
RadioDataBinding.prototype.setLabel=function(_96f){
if(this.shadowTree.labelText!=null){
this.shadowTree.labelText.firstChild.data=_96f;
}
this.setProperty("label",_96f);
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
var self=this;
this.propertyMethodMap["checked"]=function(_971){
self.setChecked(_971,true);
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
var _973=DOMEvents.getTarget(e);
switch(_973){
case this.shadowTree.labelText:
this.setChecked(!this.isChecked);
break;
}
}
};
CheckBoxBinding.prototype.relate=RadioDataBinding.prototype.relate;
CheckBoxBinding.prototype.handleBroadcast=function(_974,arg){
CheckBoxBinding.superclass.handleBroadcast.call(this,_974,arg);
switch(_974){
case BroadcastMessages.KEY_SPACE:
this.setChecked(!this.isChecked);
break;
}
};
CheckBoxBinding.prototype._buildButtonBinding=function(){
this._buttonBinding=this.add(CheckButtonBinding.newInstance(this.bindingDocument));
var self=this;
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_977){
_977.consume();
self.dispatchAction(CheckBoxBinding.ACTION_COMMAND);
}});
this._hack();
this._buttonBinding.attach();
if(this.getProperty("checked")){
this.check(true);
}
};
CheckBoxBinding.prototype._hack=function(){
var self=this;
var _979=this.getProperty("callbackid");
this._buttonBinding.check=function(_97a){
ButtonBinding.prototype.check.call(this,_97a);
self.setProperty("checked",true);
self.isChecked=true;
self.relate();
if(!_97a){
self.focus();
}
};
this._buttonBinding.uncheck=function(_97b){
ButtonBinding.prototype.uncheck.call(this,_97b);
self.setProperty("checked",false);
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
if(_979!=null){
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
var _97c=true;
var _97d=this.bindingElement.parentNode;
if(_97d){
var _97e=UserInterface.getBinding(_97d);
if(_97e&&_97e instanceof CheckBoxGroupBinding){
if(_97e.isRequired){
if(_97e.isValid){
_97c=_97e.validate();
}else{
_97c=false;
}
}
}
}
return _97c;
};
CheckBoxBinding.prototype.manifest=function(){
if(this.isAttached){
switch(this.isChecked){
case true:
if(!this.shadowTree.input){
var _97f=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_97f.type="hidden";
_97f.name=this._name;
_97f.style.display="none";
this.bindingElement.appendChild(_97f);
this.shadowTree.input=_97f;
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
var _980=null;
var _981=this.getProperty("value");
if(this.isChecked){
_980=_981?_981:"on";
}
return _980;
};
CheckBoxBinding.prototype.setValue=function(_982){
if(_982==this.getValue()||_982=="on"){
this.check(true);
}else{
if(_982!="on"){
this.setPropety("value",_982);
}
}
};
CheckBoxBinding.prototype.getResult=function(){
var _983=false;
if(this.isChecked){
_983=this._result!=null?this._result:true;
}
return _983;
};
CheckBoxBinding.prototype.setResult=function(_984){
if(typeof _984=="boolean"){
this.setChecked(_984,true);
}else{
this._result=_984;
}
};
CheckBoxBinding.newInstance=function(_985){
var _986=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbox",_985);
return UserInterface.registerBinding(_986,CheckBoxBinding);
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
var _987=true;
if(this.isRequired){
var _988=this.getDescendantBindingsByLocalName("checkbox");
if(_988.hasEntries()){
_987=false;
while(_988.hasNext()&&!_987){
if(_988.getNext().isChecked){
_987=true;
}
}
}
if(_987==false){
this._showWarning(true);
this.dispatchAction(Binding.ACTION_INVALID);
this.addActionListener(CheckBoxBinding.ACTION_COMMAND);
}
}
return _987;
};
CheckBoxGroupBinding.prototype._showWarning=function(_989){
if(_989){
if(!this._labelBinding){
var _98a=LabelBinding.newInstance(this.bindingDocument);
_98a.attachClassName("invalid");
_98a.setImage("${icon:error}");
_98a.setLabel("Selection required");
this._labelBinding=this.addFirst(_98a);
this._labelBinding.attach();
}
}else{
if(this._labelBinding){
this._labelBinding.dispose();
this._labelBinding=null;
}
}
};
CheckBoxGroupBinding.prototype.handleAction=function(_98b){
CheckBoxGroupBinding.superclass.handleAction.call(this,_98b);
switch(_98b.type){
case CheckBoxBinding.ACTION_COMMAND:
this._showWarning(false);
this.dispatchAction(Binding.ACTION_VALID);
this.removeActionListener(CheckBoxBinding.ACTION_COMMAND);
break;
}
};
CheckBoxGroupBinding.newInstance=function(_98c){
var _98d=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkboxgroup",_98c);
return UserInterface.registerBinding(_98d,CheckBoxGroupBinding);
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
var _98e=DialogControlBinding.newInstance(this.bindingDocument);
_98e.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_98e);
this._controlGroupBinding.attachRecursive();
var _98f=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloonspeak",this.bindingDocument);
this.bindingElement.appendChild(_98f);
var _990=this.getLabel();
if(_990!=null){
this.setLabel(_990);
}
};
BalloonBinding.prototype.onBindingDispose=function(){
BalloonBinding.superclass.onBindingDispose.call(this);
if(this._updateInterval){
window.clearInterval(this._updateInterval);
this._updateInterval=null;
}
var _991=this._snapTargetBinding;
if(Binding.exists(_991)==true){
_991.removeActionListener(Binding.ACTION_BLURRED,this);
_991.removeActionListener(Binding.ACTION_VALID,this);
}
};
BalloonBinding.prototype.snapTo=function(_992){
if(Interfaces.isImplemented(IData,_992)){
this._snapTargetBinding=_992;
var _993=_992.dispatchAction(BalloonBinding.ACTION_INITIALIZE);
if(_993&&_993.isConsumed){
this._environmentBinding=_993.listener;
}
if(this._environmentBinding){
_992.addActionListener(Binding.ACTION_BLURRED,this);
_992.addActionListener(Binding.ACTION_VALID,this);
this.subscribe(BroadcastMessages.VIEW_CLOSED);
var self=this;
this._updateInterval=window.setInterval(function(){
if(Binding.exists(_992)==true){
self._updatePosition();
}else{
self.dispose();
}
},BalloonBinding.TIMEOUT);
_992.dispatchAction(BalloonBinding.ACTION_SNAP);
}else{
throw "No environment fit for balloons!";
}
}
};
BalloonBinding.prototype._updatePosition=function(){
var _995=this._snapTargetBinding;
var _996=this._environmentBinding;
var root=UserInterface.getBinding(_995.bindingDocument.body);
if(Binding.exists(_995)&&Binding.exists(_996)){
if(!root.isActivated){
if(this.isVisible==true){
this.hide();
}
}else{
if(_995.isAttached&&_996.isAttached){
var _998=_995.boxObject.getUniversalPosition();
var _999=_996.boxObject.getUniversalPosition();
_999.y+=_996.bindingElement.scrollTop;
_999.x+=_996.bindingElement.scrollLeft;
var tDim=_995.boxObject.getDimension();
var eDim=_996.boxObject.getDimension();
var _99c=false;
if(_998.y+tDim.h<_999.y){
_99c=true;
}else{
if(_998.x+tDim.w<_999.x){
_99c=true;
}else{
if(_998.y>_999.y+eDim.h){
_99c=true;
}else{
if(_998.x>_999.x+eDim.w){
_99c=true;
}
}
}
}
if(!_99c){
this._setComputedPosition(_998,_999,tDim,eDim);
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
BalloonBinding.prototype._setComputedPosition=function(_99d,_99e,tDim,eDim){
var wDim=WindowManager.getWindowDimensions();
var bDim=this._getDimension();
var _9a3=_99d;
var _9a4=false;
if(_99d.x+tDim.w+bDim.w+BalloonBinding.OFFSET_X>=wDim.w){
_9a4=true;
}else{
if(_99d.x+tDim.w>=_99e.x+eDim.w){
_9a4=true;
}
}
if(_9a4){
_9a3.x-=(bDim.w+BalloonBinding.OFFSET_X);
this.attachClassName(BalloonBinding.CLASSNAME_LEFT);
}else{
_9a3.x+=tDim.w+BalloonBinding.OFFSET_X;
this.detachClassName(BalloonBinding.CLASSNAME_LEFT);
}
_9a3.y-=(bDim.h);
_9a3.y+=BalloonBinding.OFFSET_Y;
this._setPosition(_9a3);
};
BalloonBinding.prototype.handleBroadcast=function(_9a5,arg){
BalloonBinding.superclass.handleBroadcast.call(this,_9a5,arg);
switch(_9a5){
case BroadcastMessages.VIEW_CLOSED:
if(this._isAssociatedView(arg)==true){
this.dispose();
}
break;
}
};
BalloonBinding.prototype._isAssociatedView=function(_9a7){
var _9a8=false;
if(this._snapTargetBinding){
var view=this._snapTargetBinding.getAncestorBindingByType(ViewBinding,true);
if(view&&view.getHandle()==_9a7){
_9a8=true;
}
}
return _9a8;
};
BalloonBinding.prototype._setPosition=function(_9aa){
var _9ab=false;
var pos=this.boxObject.getLocalPosition();
if(this._point!=null){
if(pos.x!=this._point.x||pos.y!=this._point.y){
_9ab=true;
}
}
if(!_9ab){
this.bindingElement.style.left=_9aa.x+"px";
this.bindingElement.style.top=_9aa.y+"px";
this._point=_9aa;
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
BalloonBinding.prototype.handleAction=function(_9ad){
BalloonBinding.superclass.handleAction.call(this,_9ad);
var _9ae=_9ad.target;
switch(_9ad.type){
case Binding.ACTION_ACTIVATED:
if(this._snapTargetBinding){
this._snapTargetBinding.dispatchAction(Binding.ACTION_ACTIVATED);
_9ad.consume();
}
case Binding.ACTION_BLURRED:
case Binding.ACTION_VALID:
if(_9ae==this._snapTargetBinding){
var self=this;
setTimeout(function(){
if(!Binding.exists(_9ae)){
self.dispose();
}else{
if(_9ae.validate()){
var _9b0=true;
if(_9ad.type==Binding.ACTION_BLURRED){
var root=_9ae.bindingDocument.body;
var bind=UserInterface.getBinding(root);
if(!root.isActivated){
_9b0=false;
}
}
if(_9b0){
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
BalloonBinding.prototype.setLabel=function(_9b3){
if(this.isAttached==true){
if(!this._isTableIndexed){
this._indexTable();
}
var _9b4=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloontext",this.bindingDocument);
var text=this.bindingDocument.createTextNode(_9b3);
_9b4.appendChild(text);
this.shadowTree[MatrixBinding.CENTER].appendChild(_9b4);
}
this.setProperty("label",_9b3);
};
BalloonBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
BalloonBinding.newInstance=function(_9b6){
var _9b7=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloon",_9b6);
var _9b8=UserInterface.registerBinding(_9b7,BalloonBinding);
_9b8.hide();
return _9b8;
};
ErrorBinding.prototype=new Binding;
ErrorBinding.prototype.constructor=ErrorBinding;
ErrorBinding.superclass=Binding.prototype;
ErrorBinding.ACTION_INITIALIZE="error initialize";
ErrorBinding.presentError=function(_9b9,_9ba){
if(Interfaces.isImplemented(IData,_9ba)==true){
var _9bb,_9bc=_9ba.dispatchAction(ErrorBinding.ACTION_INITIALIZE);
if(_9bc&&_9bc.isConsumed){
switch(_9bc.listener.constructor){
case StageBinding:
_9bb=false;
break;
case StageDialogBinding:
_9bb=true;
break;
}
}
var _9bd=_9bb?top.app.bindingMap.dialogballoonset:top.app.bindingMap.balloonset;
var _9be=_9bd.add(BalloonBinding.newInstance(top.app.document));
_9be.setLabel(_9b9.text);
_9be.snapTo(_9ba);
_9be.attach();
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
var _9bf=this.bindingWindow.DataManager;
var text=this.getProperty("text");
var name=this.getProperty("targetname");
var _9c2=_9bf.getDataBinding(name);
if(_9c2){
ErrorBinding.presentError({text:text},_9c2);
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
FocusBinding.focusElement=function(_9c3){
var _9c4=true;
try{
_9c3.focus();
}
catch(exception){
var _9c5=UserInterface.getBinding(_9c3);
var _9c6=SystemLogger.getLogger("FocusBinding.focusElement");
_9c6.warn("Could not focus "+(_9c5?_9c5.toString():String(_9c3)));
_9c4=false;
}
return _9c4;
};
FocusBinding.focusedBinding=null;
FocusBinding.activeInstance=null;
FocusBinding.getCachedFocus=function(_9c7){
var win=_9c7.bindingWindow;
var id=_9c7.bindingElement.id;
return {getBinding:function(){
var _9ca=null;
try{
if(Binding.exists(_9c7)){
_9ca=win.bindingMap[id];
}
}
catch(exception){
}
return _9ca;
}};
};
FocusBinding.navigateNext=function(_9cb){
if(Binding.exists(FocusBinding.activeInstance)){
FocusBinding.activeInstance.focusNext(_9cb);
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
var _9cc=this.dispatchAction(FocusBinding.ACTION_ATTACHED);
if(_9cc&&_9cc.isConsumed){
if(_9cc.listener.isStrongFocusManager){
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
FocusBinding.prototype.handleAction=function(_9cd){
FocusBinding.superclass.handleAction.call(this,_9cd);
var _9ce=_9cd.target;
var _9cf=null;
if(this._isFocusManager){
switch(_9cd.type){
case FocusBinding.ACTION_ATTACHED:
if(_9ce!=this){
this._isUpToDate=false;
}
_9cd.consume();
break;
case FocusBinding.ACTION_UPDATE:
if(_9ce!=this){
this._isUpToDate=false;
_9cd.consume();
}
break;
case FocusBinding.ACTION_BLUR:
if(Application.isOperational){
_9cf=new FocusCrawler();
_9cf.mode=FocusCrawler.MODE_BLUR;
_9cf.crawl(_9ce.bindingElement);
if(this._cachedFocus!=null){
this._cachedFocus=null;
}
}
_9cd.consume();
break;
case FocusBinding.ACTION_FOCUS:
if(Application.isOperational&&_9ce!=this){
_9cf=new FocusCrawler();
_9cf.mode=FocusCrawler.MODE_FOCUS;
_9cf.crawl(_9ce.bindingElement);
}
_9cd.consume();
break;
case Binding.ACTION_FOCUSED:
if(Interfaces.isImplemented(IFocusable,_9ce)){
this.claimFocus();
this._onFocusableFocused(_9ce);
}
_9cd.consume();
break;
case Binding.ACTION_BLURRED:
if(Interfaces.isImplemented(IFocusable,_9ce)){
this._onFocusableBlurred(_9ce);
}
_9cd.consume();
break;
}
}
};
FocusBinding.prototype.focusNext=function(_9d0){
var _9d1=null;
var list=this._getFocusableList();
if(list.reset().hasEntries()){
while(_9d1==null&&list.hasNext()){
var _9d3=list.getNext();
if(this._cachedFocus&&_9d3==this._cachedFocus.getBinding()){
_9d1=_9d3;
}
}
if(_9d1!=null){
if(_9d3.isFocused){
var next=_9d0?list.getPreceding(_9d1):list.getFollowing(_9d1);
if(!next){
next=_9d0?list.getLast():list.getFirst();
}
next.focus();
}else{
_9d1.focus();
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
var _9d5=new FocusCrawler();
var list=new List();
_9d5.mode=FocusCrawler.MODE_INDEX;
_9d5.crawl(this.bindingElement,list);
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
var _9d9=this._cachedFocus.getBinding();
if(_9d9&&!_9d9.isFocused){
_9d9.focus();
}
}
};
FocusBinding.prototype._onFocusableFocused=function(_9da){
if(_9da!=FocusBinding.focusedBinding){
if(FocusBinding.focusedBinding!=null){
if(Binding.exists(FocusBinding.focusedBinding)){
FocusBinding.focusedBinding.blur();
}
}
FocusBinding.focusedBinding=_9da;
_9da.setProperty(FocusBinding.MARKER,true);
this._cachedFocus=FocusBinding.getCachedFocus(_9da);
}
};
FocusBinding.prototype._onFocusableBlurred=function(_9db){
_9db.deleteProperty(FocusBinding.MARKER);
if(_9db==FocusBinding.focusedBinding){
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
TabsButtonBinding.prototype.show=function(_9dd){
this.bindingElement.style.left=_9dd+"px";
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
TabsButtonBinding.prototype.registerHiddenTabBinding=function(_9de){
this.hiddenTabBindings.add(_9de);
};
TabsButtonBinding.prototype.fireCommand=function(){
if(this.isChecked&&!this.isPopulated){
this.hiddenTabBindings.reset();
while(this.hiddenTabBindings.hasNext()){
var _9df=this.hiddenTabBindings.getNext();
var item=MenuItemBinding.newInstance(this.popupBinding.bindingDocument);
item.setLabel(_9df.getLabel());
item.setImage(_9df.getImage());
item.associatedTabBinding=_9df;
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
TabsButtonBinding.prototype.handleAction=function(_9e2){
TabsButtonBinding.superclass.handleAction.call(this,_9e2);
switch(_9e2.type){
case PopupBinding.ACTION_HIDE:
this.popupBinding.removeActionListener(PopupBinding.ACTION_HIDE,this);
var _9e3=this.selectedTabBinding;
if(_9e3){
this.containingTabBoxBinding.moveToOrdinalPosition(_9e3,0);
this.containingTabBoxBinding.select(_9e3);
}
_9e2.consume();
break;
}
};
TabsButtonBinding.newInstance=function(_9e4){
var _9e5=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_9e4);
_9e5.setAttribute("type","checkbox");
_9e5.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_9e5.className="tabbutton";
return UserInterface.registerBinding(_9e5,TabsButtonBinding);
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
var _9e6=TabBoxBinding.currentActiveInstance;
if(_9e6!=null&&Binding.exists(_9e6)){
_9e6.advanceSelection(!Keyboard.isShiftPressed);
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
};
TabBoxBinding.prototype.onBindingAttach=function(){
TabBoxBinding.superclass.onBindingAttach.call(this);
TabBoxBinding.currentActiveInstance=this;
this._tabsElement=this.getTabsElement();
this._tabPanelsElement=this.getTabPanelsElement();
var _9e7=this.getTabElements().getLength();
var _9e8=this.getTabPanelElements().getLength();
if(!this._tabsElement||!this._tabPanelsElement){
throw new Error(this.toString()+" DOM subtree invalid.");
}else{
if(_9e7!=_9e8){
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
var _9e9=this.getTabPanelElements();
while(_9e9.hasNext()){
this._setupWarningSystem(UserInterface.getBinding(_9e9.getNext()));
}
if(this.isEqualSize){
this.enforceEqualSize();
this.dispatchAction(PageBinding.ACTION_UNBLOCK_INIT);
}
this.dispatchAction(TabBoxBinding.ACTION_ATTACHED);
TabBoxBinding.superclass.onBindingInitialize.call(this);
};
TabBoxBinding.prototype.buildDOMContent=function(){
var _9ea=DOMUtil.getOrdinalPosition(this._tabsElement);
var _9eb=DOMUtil.getOrdinalPosition(this._tabPanelsElement);
var _9ec=_9ea>_9eb?"tabsbelow":"tabsontop";
this.attachClassName(_9ec);
};
TabBoxBinding.prototype._TEMPNAME=function(){
var tabs=this.getTabElements();
var _9ee=this.getTabPanelElements();
var _9ef=null;
var _9f0=this.getProperty("selectedindex");
if(_9f0!=null){
if(_9f0>tabs.getLength()-1){
throw "Selectedindex out of range";
}
}
if(tabs.hasEntries()){
var _9f1=0;
while(tabs.hasNext()){
var tab=tabs.getNext();
var _9f3=_9ee.getNext();
this.registerTabBoxPair(tab,_9f3);
if(_9f0&&_9f1==_9f0){
tab.setAttribute("selected","true");
}else{
if(tab.getAttribute("selected")=="true"){
_9ef=tab;
}
}
_9f1++;
}
if(!_9ef){
_9ef=tabs.getFirst();
_9ef.setAttribute("selected","true");
}
}
};
TabBoxBinding.prototype.enforceEqualSize=function(_9f4){
var _9f5=null;
var _9f6=null;
if(this.isEqualSize){
var _9f7=CSSComputer.getPadding(this._tabPanelsElement);
var max=0,_9f9=this.getTabPanelElements();
_9f9.each(function(_9fa){
max=_9fa.offsetHeight>max?_9fa.offsetHeight:max;
});
_9f6=max+_9f7.top+_9f7.bottom;
if(_9f4&&this._tabPanelsElement.style.height!=null){
_9f5=this._tabPanelsElement.offsetHeight;
}
if(_9f5!=null||_9f6>_9f5){
this._tabPanelsElement.style.height=_9f6+"px";
}
}
};
TabBoxBinding.prototype._setupWarningSystem=function(_9fb){
_9fb._invalidCount=0;
_9fb.addActionListener(Binding.ACTION_INVALID,this);
_9fb.addActionListener(Binding.ACTION_VALID,this);
_9fb.addActionListener(BalloonBinding.ACTION_SNAP,this);
};
TabBoxBinding.prototype.handleAction=function(_9fc){
TabBoxBinding.superclass.handleAction.call(this,_9fc);
var _9fd=_9fc.target;
var _9fe=_9fc.listener;
switch(_9fc.type){
case Binding.ACTION_ATTACHED:
break;
case Binding.ACTION_DETACHED:
if(_9fd.constructor==this._impl_tab){
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
_9fc.consume();
}
break;
case PageBinding.ACTION_INITIALIZED:
if(_9fd.isDialogSubPage&&this.isEqualSize){
this.enforceEqualSize();
}
break;
case Binding.ACTION_INVALID:
_9fe._invalidCount++;
if(_9fe._invalidCount==1){
var self=this;
setTimeout(function(){
if(!_9fe.isSelected){
self._showWarning(_9fe,true);
}
},0);
}
break;
case Binding.ACTION_VALID:
if(_9fe._invalidCount>0){
_9fe._invalidCount--;
if(_9fe._invalidCount==0){
if(_9fe.isSelected){
this._showWarning(_9fe,false);
}
}
}
break;
case BalloonBinding.ACTION_SNAP:
this._showBalloon(_9fe,true);
break;
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FOCUSED:
if(_9fc._tabboxstamp==null){
TabBoxBinding.currentActiveInstance=this;
_9fc._tabboxstamp="stamped";
}
break;
}
};
TabBoxBinding.prototype.select=function(arg,_a01){
var _a02=this.getBindingForArgument(arg);
if(_a02!=null&&!_a02.isSelected){
if(this._selectedTabBinding!=null){
this._selectedTabBinding.unselect();
this.getTabPanelBinding(this._selectedTabBinding).unselect();
}
this.dispatchAction(TabBoxBinding.ACTION_UNSELECTED);
_a02.select(_a01);
this.getTabPanelBinding(_a02).select(_a01);
var _a03=this.getProperty("selectedindex");
if(_a03!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_a02.bindingElement,true));
}
this._selectedTabBinding=_a02;
this.dispatchAction(TabBoxBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
if(_a02.getImage()==TabBoxBinding.BALLOON_TAB_IMAGE){
var _a04=this.getTabPanelBinding(_a02);
this._showBalloon(_a04,false);
}
}
};
TabBoxBinding.prototype.registerTabBoxPair=function(tab,_a06){
var key=KeyMaster.getUniqueKey();
tab.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
_a06.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
this._tabBoxPairs[key]={tab:tab,tabPanel:_a06};
};
TabBoxBinding.prototype.unRegisterTabBoxPair=function(tab){
var key=tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY);
delete this._tabBoxPairs[key];
};
TabBoxBinding.prototype.getTabPanelBinding=function(_a0a){
var _a0b=null;
try{
var key=_a0a.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _a0d=this._tabBoxPairs[key].tabPanel;
_a0b=UserInterface.getBinding(_a0d);
}
catch(exception){
this.logger.error(exception);
SystemDebug.stack(arguments);
}
return _a0b;
};
TabBoxBinding.prototype.getTabBinding=function(_a0e){
var key=_a0e.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _a10=this._tabBoxPairs[key].tab;
return UserInterface.getBinding(_a10);
};
TabBoxBinding.prototype.summonTabBinding=function(){
return TabBinding.newInstance(this.bindingDocument);
};
TabBoxBinding.prototype.summonTabPanelBinding=function(){
var _a11=this._impl_tabpanel.newInstance(this.bindingDocument);
this._setupWarningSystem(_a11);
return _a11;
};
TabBoxBinding.prototype.appendTabByBindings=function(_a12,_a13){
var _a14=_a12.bindingElement;
_a12.setProperty("selected",true);
var _a15=this.summonTabPanelBinding();
var _a16=_a15.bindingElement;
if(_a13){
_a16.appendChild(_a13 instanceof Binding?_a13.bindingElement:_a13);
}
this.registerTabBoxPair(_a14,_a16);
UserInterface.getBinding(this._tabsElement).add(_a12);
this._tabPanelsElement.appendChild(_a16);
_a12.attach();
UserInterface.getBinding(_a16).attachRecursive();
this.updateType=TabBoxBinding.UPDATE_ATTACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
return _a12;
};
TabBoxBinding.prototype.importTabBinding=function(_a17){
var that=_a17.containingTabBoxBinding;
var _a19=that.getTabPanelBinding(_a17);
var _a1a=_a19.getBindingElement();
var _a1b=_a17.getBindingElement();
that.dismissTabBinding(_a17);
this._tabsElement.appendChild(_a1b);
this._tabPanelsElement.appendChild(_a1a);
this.registerTabBoxPair(_a1b,_a1a);
_a17.containingTabBoxBinding=this;
this.select(_a17);
this.dispatchAction(Binding.ACTION_ACTIVATED);
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.removeTab=function(_a1c){
var _a1d=null;
if(_a1c.isSelected){
_a1d=this.getBestTab(_a1c);
this._selectedTabBinding=null;
}
var _a1e=this.getTabPanelBinding(_a1c);
this.unRegisterTabBoxPair(_a1c.bindingElement);
_a1c.dispose();
_a1e.dispose();
if(_a1d!=null){
this.select(_a1d);
}
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.dismissTabBinding=function(_a1f){
if(_a1f.isSelected){
this.selectBestTab(_a1f);
}
};
TabBoxBinding.prototype.selectBestTab=function(_a20){
var _a21=this.getBestTab(_a20);
if(_a21){
this.select(_a21);
}else{
this._selectedTabBinding=null;
}
};
TabBoxBinding.prototype.getBestTab=function(_a22){
var _a23=null;
var _a24=_a22.getOrdinalPosition(true);
var _a25=this.getTabBindings();
var _a26=_a25.getLength();
var _a27=_a26-1;
if(_a26==1){
_a23=null;
}else{
if(_a24==_a27){
_a23=_a25.get(_a24-1);
}else{
_a23=_a25.get(_a24+1);
}
}
return _a23;
};
TabBoxBinding.prototype.moveToOrdinalPosition=function(_a28,_a29){
var _a2a=this.bindingDocument.getElementById(_a28.bindingElement.id);
var tab=this.getTabElements().get(_a29);
this._tabsElement.insertBefore(_a2a,tab);
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
var _a2c=this._nodename_tab;
var _a2d=new List(this._tabsElement.childNodes);
var _a2e=new List();
while(_a2d.hasNext()){
var _a2f=_a2d.getNext();
if(_a2f.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_a2f)==_a2c){
_a2e.add(_a2f);
}
}
return _a2e;
};
TabBoxBinding.prototype.getTabPanelElements=function(){
var _a30=this._nodename_tabpanel;
var _a31=new List(this._tabPanelsElement.childNodes);
var _a32=new List();
_a31.each(function(_a33){
if(_a33.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_a33)==_a30){
_a32.add(_a33);
}
});
return _a32;
};
TabBoxBinding.prototype.getTabsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabs);
};
TabBoxBinding.prototype.getTabPanelsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabpanels);
};
TabBoxBinding.prototype.getTabBindings=function(){
var _a34=new List();
var _a35=this.getTabElements();
_a35.each(function(_a36){
_a34.add(UserInterface.getBinding(_a36));
});
return _a34;
};
TabBoxBinding.prototype.getTabPanelBindings=function(){
var _a37=new List();
this.getTabPanelElements().each(function(_a38){
_a37.add(UserInterface.getBinding(_a38));
});
return _a37;
};
TabBoxBinding.prototype.getSelectedTabBinding=function(){
return this._selectedTabBinding;
};
TabBoxBinding.prototype.getSelectedTabPanelBinding=function(){
var _a39=null;
if(this._selectedTabBinding){
_a39=this.getTabPanelBinding(this._selectedTabBinding);
}
return _a39;
};
TabBoxBinding.prototype._showWarning=function(_a3a,_a3b){
var _a3c=this.getTabBinding(_a3a);
if(_a3b){
if(_a3c.labelBinding.hasImage){
_a3c._backupImage=_a3c.getImage();
}
_a3c.setImage(TabBoxBinding.INVALID_TAB_IMAGE);
}else{
if(_a3c._backupImage){
_a3c.setImage(_a3c._backupImage);
}else{
_a3c.setImage(false);
}
}
};
TabBoxBinding.prototype._showBalloon=function(_a3d,_a3e){
var _a3f=this.getTabBinding(_a3d);
if((_a3e&&!_a3f.isSelected)||!_a3e){
if(_a3f.getImage()!=TabBoxBinding.INVALID_TAB_IMAGE){
if(_a3e){
if(_a3f.labelBinding.hasImage){
_a3f._backupImage=_a3f.getImage();
}
_a3f.setImage(TabBoxBinding.BALLOON_TAB_IMAGE);
}else{
if(_a3f._backupImage!=null){
_a3f.setImage(_a3f._backupImage);
}else{
_a3f.setImage(false);
}
}
}
}
};
TabBoxBinding.prototype.advanceSelection=function(_a40){
var tab=this.getSelectedTabBinding();
var tabs=this.getTabBindings();
var _a43=tab.getOrdinalPosition(true);
var next=null;
var _a45=new List();
tabs.each(function(t){
if(t.isVisible){
_a45.add(t);
}
});
if(_a45.getLength()>1){
if(_a43==0&&!_a40){
next=_a45.getLast();
}else{
if(_a43==_a45.getLength()-1&&_a40){
next=_a45.getFirst();
}else{
if(_a40){
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
var _a48=this.constructor.TABBUTTON_IMPLEMENTATION;
this.tabsButtonBinding=_a48.newInstance(this.bindingDocument);
this.shadowTree.tabsButton=this.tabsButtonBinding;
this.add(this.tabsButtonBinding);
this.tabsButtonBinding.attach();
};
TabsBinding.prototype.handleAction=function(_a49){
TabsBinding.superclass.handleAction.call(this,_a49);
switch(_a49.type){
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
var _a4c=self.bindingElement.offsetWidth;
if(_a4c!=self._cachedOffsetWidth){
self.manage();
}
self._cachedOffsetWidth=_a4c;
}
}
setTimeout(manage,0);
}
};
TabsBinding.prototype.add=function(_a4d){
if(_a4d instanceof TabBinding){
if(this.tabsButtonBinding&&this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
return TabsBinding.superclass.add.call(this,_a4d);
};
TabsBinding.prototype.manage=function(){
if(Binding.exists(this)==true&&this.isVisible){
this.isManaging=true;
var _a4e=false;
var _a4f,tab,tabs=this.containingTabBoxBinding.getTabElements();
var _a52=this.constructor.TABBUTTON_IMPLEMENTATION;
var _a53=this.bindingElement.offsetWidth-_a52.RESERVED_SPACE;
var _a54=null;
var sum=0,_a56=0;
var _a57=true;
if(tabs.hasEntries()){
this.tabsButtonBinding.reset();
while(tabs.hasNext()&&_a57){
tab=tabs.getNext();
_a4f=UserInterface.getBinding(tab);
if(!_a54){
_a54=_a4f;
}
sum+=tab.offsetWidth;
if(sum>=_a53){
_a4e=true;
if(_a4f.isSelected){
if(!DOMUtil.isFirstElement(_a4f.bindingElement,true)){
this.isManaging=false;
if(_a54){
_a54.hide();
if(this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
this.containingTabBoxBinding.moveToOrdinalPosition(_a4f,_a56-1);
_a57=false;
}
}else{
_a4f.hide();
this.tabsButtonBinding.registerHiddenTabBinding(_a4f);
}
}else{
_a4f.show();
_a54=_a4f;
_a56++;
}
}
if(_a57){
if(_a4e&&this.tabsButtonBinding.hiddenTabBindings.hasEntries()){
var _a58=_a54.getBindingElement();
var _a59=_a58.offsetLeft+_a58.offsetWidth;
var _a5a=this.tabsButtonBinding;
setTimeout(function(){
_a5a.show(_a59+4);
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
var _a5b=TabBinding.superclass.serialize.call(this);
if(_a5b){
_a5b.label=this.getLabel();
_a5b.image=this.getImage();
_a5b.tooltip=this.getToolTip();
}
return _a5b;
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
var _a5c=this.bindingElement.getAttribute("image");
var _a5d=this.bindingElement.getAttribute("label");
var _a5e=this.bindingElement.getAttribute("tooltip");
this.bindingElement.className="default";
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.shadowTree.labelBinding=this.labelBinding;
this.labelBinding.attachClassName("tablabel");
this.add(this.labelBinding);
if(_a5d){
this.setLabel(_a5d);
}
if(_a5c){
this.setImage(_a5c);
}
if(_a5e){
this.setToolTip(_a5e);
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
TabBinding.prototype.setLabel=function(_a60){
if(_a60!=null){
this.setProperty("label",_a60);
if(this.isAttached){
this.labelBinding.setLabel(_a60);
}
}
};
TabBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
TabBinding.prototype.setToolTip=function(_a61){
if(_a61){
this.setProperty("tooltip",_a61);
if(this.isAttached){
this.labelBinding.setToolTip(_a61);
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
var _a63=false;
if(Client.isMozilla==true){
}
if(!_a63){
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
TabBinding.prototype.select=function(_a64){
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
TabBinding.newInstance=function(_a65){
var _a66=DOMUtil.createElementNS(Constants.NS_UI,"ui:tab",_a65);
return UserInterface.registerBinding(_a66,TabBinding);
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
var _a67=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(dim2==null||!Dimension.isEqual(dim1,dim2)){
_a67=true;
this._lastKnownDimension=dim1;
}
return _a67;
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
TabPanelBinding.prototype.select=function(_a6a){
if(!this.isSelected){
if(this.isLazy==true){
this.wakeUp("select");
}else{
this.isSelected=true;
this.isVisible=true;
this.bindingElement.style.position="static";
this._invokeManagedRecursiveFlex();
if(_a6a!=true){
this.dispatchAction(FocusBinding.ACTION_FOCUS);
}
}
}
};
TabPanelBinding.prototype.unselect=function(){
if(this.isSelected==true){
this.dispatchAction(FocusBinding.ACTION_BLUR);
this.isSelected=false;
this.isVisible=false;
this.bindingElement.style.position="absolute";
}
};
TabPanelBinding.prototype._invokeManagedRecursiveFlex=function(){
this.reflex(true);
};
TabPanelBinding.prototype.handleAction=function(_a6b){
TabPanelBinding.superclass.handleAction.call(this,_a6b);
var _a6c=_a6b.target;
switch(_a6b.type){
case BalloonBinding.ACTION_INITIALIZE:
_a6b.consume();
break;
}
};
TabPanelBinding.newInstance=function(_a6d){
var _a6e=DOMUtil.createElementNS(Constants.NS_UI,"ui:tabpanel",_a6d);
UserInterface.registerBinding(_a6e,TabPanelBinding);
return UserInterface.getBinding(_a6e);
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
var _a6f=SplitBoxBinding.superclass.serialize.call(this);
if(_a6f){
_a6f.orient=this.getOrient();
_a6f.layout=this.getLayout();
}
return _a6f;
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
var _a70=this.getSplitPanelElements();
if(_a70.hasEntries()){
var _a71=new List(this.getLayout().split(":"));
if(_a71.getLength()!=_a70.getLength()){
throw new Error(this+" DOM subree invalid");
}else{
_a70.each(function(_a72){
_a72.setAttribute("ratio",_a71.getNext());
});
}
}
this.isLayoutInitialized=true;
};
SplitBoxBinding.prototype._initializeOrient=function(){
var _a73=this.getProperty("orient");
if(_a73){
this._orient=_a73;
}
this.attachClassName(this._orient);
};
SplitBoxBinding.prototype._initializeSplitters=function(){
var _a74=this.getSplitterBindings();
while(_a74.hasNext()){
var _a75=_a74.getNext();
if(_a75&&_a75.getProperty("collapsed")==true){
_a75.collapse();
}
}
};
SplitBoxBinding.prototype.handleAction=function(_a76){
SplitBoxBinding.superclass.handleAction.call(this,_a76);
switch(_a76.type){
case SplitterBinding.ACTION_DRAGGED:
this.refreshLayout();
_a76.consume();
break;
case SplitterBinding.ACTION_COLLAPSE:
this.collapse(_a76.target);
_a76.consume();
break;
case SplitterBinding.ACTION_UNCOLLAPSE:
this.unCollapse(_a76.target);
_a76.consume();
break;
}
};
SplitBoxBinding.prototype.flex=function(){
SplitBoxBinding.superclass.flex.call(this);
if(this.isAttached==true){
this.invokeLayout(true);
}
};
SplitBoxBinding.prototype.collapse=function(_a77){
this._getSplitPanelBindingForSplitter(_a77).collapse();
this.invokeLayout();
};
SplitBoxBinding.prototype.unCollapse=function(_a78){
this._getSplitPanelBindingForSplitter(_a78).unCollapse();
this.invokeLayout();
};
SplitBoxBinding.prototype._getSplitPanelBindingForSplitter=function(_a79){
var _a7a=DOMUtil.getOrdinalPosition(_a79.bindingElement,true);
var _a7b,_a7c=this.getSplitPanelElements();
switch(_a79.getCollapseDirection()){
case SplitterBinding.COLLAPSE_BEFORE:
_a7b=_a7c.get(_a7a);
break;
case SplitterBinding.COLLAPSE_AFTER:
_a7b=_a7c.get(_a7a+1);
break;
}
return UserInterface.getBinding(_a7b);
};
SplitBoxBinding.prototype.invokeLayout=function(_a7d){
var _a7e=this.isHorizontalOrient();
var _a7f=this.getSplitPanelBindings();
var _a80=this.getSplitterBindings();
var _a81=new List();
var _a82,sum=0;
var _a84=0;
_a7f.each(function(_a85){
if(_a85.isFixed==true){
if(!_a7f.hasNext()){
_a84+=_a85.getFix();
}
_a81.add(0);
sum+=0;
}else{
_a82=_a85.getRatio();
_a81.add(_a82);
sum+=_a82;
}
});
if(sum==0){
this.logger.warn("Division by zero was hacked");
sum=1;
}
if(_a81.getLength()!=_a7f.getLength()){
throw new Error(this+" Invalid property (ratio)");
}else{
var _a86=_a7e?this.getWidth():this.getHeight();
_a86-=_a84;
_a80.each(function(_a87){
if(_a87.isVisible){
_a86-=SplitterBinding.DIMENSION;
}
});
var unit=_a86/sum;
var _a89=0;
var self=this;
_a7f.each(function(_a8b){
var span=0;
var _a8d=_a81.getNext();
if(_a8b.isFixed){
span=_a8b.getFix();
}else{
span=Math.round(unit*_a8d);
if(isNaN(span)){
alert("isNaN ( span ) ["+this.getProperty("layout")+"]");
}
}
_a89+=span;
while(_a89>_a86){
_a89--;
span--;
}
if(!_a8b.isFixed){
if(_a7e){
_a8b.setWidth(span);
}else{
_a8b.setHeight(span);
}
}
});
}
if(_a7d!=true){
this.reflex();
}
if(this._persist&&this._persist.layout){
var _a8e=this.getLayout();
if(_a8e){
this.setProperty("layout",_a8e);
}
}
};
SplitBoxBinding.prototype.computeLayout=function(){
var _a8f=this.isHorizontalOrient();
var _a90=this.getSplitPanelBindings();
var _a91=this.getSplitterBindings();
var _a92=null;
var _a93=null;
var unit=null;
var _a95=null;
var span=null;
_a90.each(function(_a97){
if(!unit){
unit=_a8f?_a97.getWidth():_a97.getHeight();
}
span=_a8f?_a97.getWidth():_a97.getHeight();
if(_a95){
span-=_a95;
_a95=null;
}
_a92=_a91.getNext();
if(_a92&&_a92.offset){
_a95=_a92.offset;
span+=_a95;
}
_a97.setRatio(span/unit);
});
};
SplitBoxBinding.prototype.refreshLayout=function(){
this.computeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.setLayout=function(_a98){
this.logger.debug(_a98);
this.setProperty("layout",_a98);
this._initializeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.getLayout=function(){
if(!this.isLayoutInitialized){
if(!this.getProperty("layout")){
this.setProperty("layout",this.getDefaultLayout());
}
}else{
var _a99="",_a9a=this.getSplitPanelBindings();
_a9a.each(function(_a9b){
_a99+=_a9b.getRatio().toString();
_a99+=_a9a.hasNext()?":":"";
});
this.setProperty("layout",_a99);
}
return new String(this.getProperty("layout"));
};
SplitBoxBinding.prototype.getDefaultLayout=function(){
var _a9c=this.getSplitPanelElements();
_a9c.each(function(_a9d){
layout+="1"+(_a9c.hasNext()?":":"");
});
this.setProperty("layout",layout);
};
SplitBoxBinding.prototype.setWidth=function(_a9e){
this.bindingElement.style.width=_a9e+"px";
};
SplitBoxBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
SplitBoxBinding.prototype.setHeight=function(_a9f){
this.bindingElement.style.height=_a9f+"px";
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
SplitBoxBinding.prototype.fit=function(_aa0){
if(!this.isFit||_aa0){
if(this.isHorizontalOrient()){
var max=0;
var _aa2=this.getSplitPanelBindings();
_aa2.each(function(_aa3){
var _aa4=_aa3.bindingElement.offsetHeight;
max=_aa4>max?_aa4:max;
});
if(max>this._getFitnessHeight()){
this._setFitnessHeight(max);
}
}else{
throw "SplitBoxBinding enforceFitness not supported vertically!";
}
this.isFit=true;
}
};
SplitBoxBinding.newInstance=function(_aa5){
var _aa6=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitbox",_aa5);
return UserInterface.registerBinding(_aa6,SplitBoxBinding);
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
var _aa9=this.getProperty("hidden");
if(_aa9){
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
var _aaa=this.getProperty("ratiocache");
if(_aaa){
this.setRatio(_aaa);
this.deleteProperty("ratiocache");
}else{
this._containingSplitBoxBinding.computeLayout();
}
this.bindingElement.style.display="block";
this.deleteProperty("hidden");
this.isVisible=true;
}
};
SplitPanelBinding.prototype.setWidth=function(_aab){
if(!this.isFixed){
if(_aab!=this.getWidth()){
if(_aab<0){
_aab=this.getWidth();
this.logger.warn("SplitPanelBinding#setWidth bug in Internet Explorer!");
}
try{
this.bindingElement.style.width=_aab+"px";
}
catch(exception){
alert("SplitPanelBinding#setWidth: Occult width: "+_aab);
alert(arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getWidth=function(){
var _aac=null;
if(this.isFixed){
_aac=this.getFix();
}else{
_aac=this.bindingElement.offsetWidth;
}
return _aac;
};
SplitPanelBinding.prototype.setHeight=function(_aad){
if(!this.isFixed){
if(_aad!=this.getHeight()){
try{
this.bindingElement.style.height=_aad+"px";
}
catch(exception){
alert("SplitPanelBinding.prototype.setHeight"+arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getHeight=function(){
var _aae=null;
if(this.isFixed){
_aae=this.getFix();
}else{
_aae=this.bindingElement.offsetHeight;
}
return _aae;
};
SplitPanelBinding.prototype.setRatio=function(_aaf){
this.setProperty("ratio",_aaf);
};
SplitPanelBinding.prototype.getRatio=function(){
return this.getProperty("ratio");
};
SplitPanelBinding.prototype.setFix=function(_ab0){
if(_ab0){
this._fixedSpan=_ab0;
switch(this._containingSplitBoxBinding.getOrient()){
case SplitBoxBinding.ORIENT_HORIZONTAL:
this.logger.warn("Fix not properly supported on horizontal splitboxes!");
this.setWidth(_ab0);
break;
case SplitBoxBinding.ORIENT_VERTICAL:
this.setHeight(_ab0);
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
SplitPanelBinding.newInstance=function(_ab1){
var _ab2=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitpanel",_ab1);
return UserInterface.registerBinding(_ab2,SplitPanelBinding);
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
var _ab3=SplitBoxBinding.superclass.serialize.call(this);
if(_ab3){
_ab3.collapse=this.getProperty("collapse");
_ab3.collapsed=this.getProperty("collapsed");
_ab3.disabled=this.getProperty("isdisabled");
}
return _ab3;
};
SplitterBinding.prototype.onBindingAttach=function(){
SplitterBinding.superclass.onBindingAttach.call(this);
this.addActionListener(Binding.ACTION_DRAG);
this._containingSplitBoxBinding=this.getAncestorBindingByLocalName("splitbox");
this.attachClassName(this._containingSplitBoxBinding.getOrient());
this._collapseDirection=this.getProperty("collapse");
this.buildDOMContent();
this.attachDOMEvents();
var _ab4=this.getProperty("hidden");
if(_ab4){
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
SplitterBinding.prototype.setCollapseDirection=function(_ab6){
this.setProperty("collapse",_ab6);
this._collapseDirection=_ab6;
};
SplitterBinding.prototype.handleAction=function(_ab7){
SplitterBinding.superclass.handleAction.call(this,_ab7);
switch(_ab7.type){
case Binding.ACTION_DRAG:
this.dragger.registerHandler(this);
_ab7.consume();
break;
}
};
SplitterBinding.prototype.handleEvent=function(e){
SplitterBinding.superclass.handleEvent.call(this,e);
var _ab9=this;
if(!this.isDragging&&!this.isDisabled){
switch(e.type){
case DOMEvents.MOUSEOVER:
window.splitterTimeout=window.setTimeout(function(){
_ab9.shadowTree.splitterBody.className=SplitterBinding.CLASSNAME_HOVER;
},250);
break;
case DOMEvents.MOUSEOUT:
if(window.splitterTimeout){
window.clearTimeout(window.splitterTimeout);
}
if(_ab9.shadowTree.splitterBody.className==SplitterBinding.CLASSNAME_HOVER){
this.shadowTree.splitterBody.className="";
}
break;
}
}
};
SplitterBinding.prototype.onDragStart=function(_aba){
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
SplitterBinding.newInstance=function(_ac5){
var _ac6=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitter",_ac5);
return UserInterface.registerBinding(_ac6,SplitterBinding);
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
var _ac7=this.getProperty("selectedindex");
var _ac8=this.getDeckElements();
if(_ac8.hasEntries()){
var _ac9=false;
var _aca=0;
while(_ac8.hasNext()){
var deck=_ac8.getNext();
if(_ac7&&_aca==_ac7){
deck.setAttribute("selected","true");
_ac9=true;
}else{
if(deck.getAttribute("selected")=="true"){
_ac9=true;
}
}
_aca++;
}
if(!_ac9){
_ac8.getFirst().setAttribute("selected","true");
}
}
};
DecksBinding.prototype.getDeckElements=function(){
return this.getChildElementsByLocalName(this.constructor.NODENAME_DECK);
};
DecksBinding.prototype.select=function(arg){
var _acd=this.getBindingForArgument(arg);
if(_acd!=null){
if(_acd!=this._selectedDeckBinding){
if(this._selectedDeckBinding){
this._selectedDeckBinding.unselect();
}
_acd.select();
this._selectedDeckBinding=_acd;
var _ace=this.getProperty("selectedindex");
if(_ace!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_acd.bindingElement,true));
}
this.dispatchAction(DecksBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
}else{
throw "No deck for argument "+arg;
}
};
DecksBinding.prototype.hasDimensionsChanged=function(){
var _acf=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(!Dimension.isEqual(dim1,dim2)){
_acf=true;
this._lastKnownDimension=dim1;
}
return _acf;
};
DecksBinding.prototype.getSelectedDeckBinding=function(){
return this._selectedDeckBinding;
};
DecksBinding.newInstance=function(_ad2){
var _ad3=DOMUtil.createElementNS(Constants.NS_UI,"ui:decks",_ad2);
return UserInterface.registerBinding(_ad3,DecksBinding);
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
DeckBinding.prototype.handleAction=function(_ad4){
DeckBinding.superclass.handleAction.call(this,_ad4);
var _ad5=_ad4.target;
switch(_ad4.type){
case BalloonBinding.ACTION_INITIALIZE:
_ad4.consume();
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
if(this.isSelected==true){
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
DeckBinding.newInstance=function(_ad7){
var _ad8=DOMUtil.createElementNS(Constants.NS_UI,"ui:deck",_ad7);
return UserInterface.registerBinding(_ad8,DeckBinding);
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
this.crawlerFilters=new List([FlexBoxCrawler.ID,FocusCrawler.ID]);
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
ToolBarBinding.prototype.onMemberInitialize=function(_ad9){
if(_ad9 instanceof ToolBarBodyBinding){
if(_ad9.isRightAligned){
if(!this._toolBarBodyRight){
this._toolBarBodyRight=_ad9;
}
}else{
if(!this._toolBarBodyLeft){
this._toolBarBodyLeft=_ad9;
}
}
}
ToolBarBinding.superclass.onMemberInitialize.call(this,_ad9);
};
ToolBarBinding.prototype.parseDOMProperties=function(){
var _ada=this.getProperty("imagesize");
var type=this.getProperty("type");
if(_ada){
this.setImageSize(_ada);
}
if(type){
this.setType(type);
}else{
this.setType(this.type);
}
};
ToolBarBinding.prototype.buildDOMContent=function(){
if(this._hasDefaultContent==true&&!this._hasDOMContent){
var _adc=ToolBarGroupBinding.newInstance(this.bindingDocument);
_adc.add(ToolBarButtonBinding.newInstance(this.bindingDocument));
_adc.isDefaultContent=true;
this.add(_adc);
_adc.attachRecursive();
this._hasDOMContent=true;
}
};
ToolBarBinding.prototype.flex=function(){
var left=this._toolBarBodyLeft;
var _ade=this._toolBarBodyRight;
if(left!=null&&left.hasClassName("max")){
this._maxToolBarGroup(left,_ade);
}
if(_ade!=null&&_ade.hasClassName("max")){
this._maxToolBarGroup(_ade,left);
}
};
ToolBarBinding.prototype._maxToolBarGroup=function(max,_ae0){
var _ae1=this.boxObject.getDimension().w;
var _ae2=CSSComputer.getPadding(this.bindingElement);
_ae1-=(_ae2.left+_ae2.right);
if(_ae0!=null){
_ae1-=_ae0.boxObject.getDimension().w;
if(!Client.isWindows){
_ae1-=1;
}
if(Client.isExplorer){
_ae1-=15;
}
}
max.bindingElement.style.width=_ae1+"px";
};
ToolBarBinding.prototype.getToolBarGroupByIndex=function(_ae3){
return this.getDescendantBindingsByLocalName("toolbargroup").get(_ae3);
};
ToolBarBinding.prototype.addLeft=function(_ae4,_ae5){
var _ae6=null;
if(this._toolBarBodyLeft!=null){
_ae6=this._toolBarBodyLeft.add(_ae4,_ae5);
}else{
throw new Error("No left toolbarbody");
}
return _ae6;
};
ToolBarBinding.prototype.addLeftFirst=function(_ae7,_ae8){
var _ae9=null;
if(this._toolBarBodyLeft){
_ae9=this._toolBarBodyLeft.addFirst(_ae7,_ae8);
}else{
throw new Error("No left toolbarbody");
}
return _ae9;
};
ToolBarBinding.prototype.addRight=function(_aea){
var _aeb=null;
if(this._toolBarBodyRight){
_aeb=this._toolBarBodyRight.add(_aea);
}else{
throw new Error("No left toolbarbody");
}
return _aeb;
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
ToolBarBinding.newInstance=function(_aee){
var _aef=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_aee);
return UserInterface.registerBinding(_aef,ToolBarBinding);
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
var _af0=this.getDescendantBindingsByLocalName("toolbargroup");
var _af1=new List();
var _af2=true;
_af0.each(function(_af3){
if(_af3.isVisible&&!_af3.isDefaultContent){
_af1.add(_af3);
}
});
while(_af1.hasNext()){
var _af4=_af1.getNext();
_af4.setLayout(ToolBarGroupBinding.LAYOUT_DEFAULT);
if(_af2){
_af4.setLayout(ToolBarGroupBinding.LAYOUT_FIRST);
_af2=false;
}
if(!_af1.hasNext()){
_af4.setLayout(ToolBarGroupBinding.LAYOUT_LAST);
}
}
if(this.getProperty("equalsize")){
this.enforceEqualSize();
}
};
ToolBarBodyBinding.prototype.enforceEqualSize=function(){
var max=0,list=this.getDescendantBindingsByLocalName("clickbutton");
while(list.hasNext()){
var _af7=list.getNext();
var _af8=_af7.getEqualSizeWidth();
if(_af8>max){
max=_af8;
}
}
if(max!=0){
list.reset();
while(list.hasNext()){
var _af7=list.getNext();
_af7.setEqualSizeWidth(max);
}
}
};
ToolBarBodyBinding.prototype.empty=function(){
this.detachRecursive();
this.bindingElement.innerHTML="";
};
ToolBarBodyBinding.prototype.add=function(_af9,_afa){
var _afb=ToolBarBinding.superclass.add.call(this,_af9);
if(!_afa){
if(_af9 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _afb;
};
ToolBarBodyBinding.prototype.addFirst=function(_afc,_afd){
var _afe=ToolBarBinding.superclass.addFirst.call(this,_afc);
if(!_afd){
if(_afc instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _afe;
};
ToolBarBodyBinding.newInstance=function(_aff){
var _b00=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbody",_aff);
return UserInterface.registerBinding(_b00,ToolBarBodyBinding);
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
ToolBarGroupBinding.prototype.setLayout=function(_b01){
switch(_b01){
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
var _b02=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_b02)=="toolbarbody"){
UserInterface.getBinding(_b02).refreshToolBarGroups();
}
};
ToolBarGroupBinding.prototype.hide=function(){
ToolBarGroupBinding.superclass.hide.call(this);
var _b03=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_b03)=="toolbarbody"){
UserInterface.getBinding(_b03).refreshToolBarGroups();
}
};
ToolBarGroupBinding.newInstance=function(_b04){
var _b05=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbargroup",_b04);
return UserInterface.registerBinding(_b05,ToolBarGroupBinding);
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
ToolBarButtonBinding.newInstance=function(_b06){
var _b07=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_b06);
return UserInterface.registerBinding(_b07,ToolBarButtonBinding);
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
var _b08=this.getProperty("label");
var _b09=this.getProperty("image");
if(_b08){
this.setLabel(_b08);
}
if(_b09){
this.setImage(_b09);
}
};
ToolBarLabelBinding.prototype.setLabel=function(_b0a,_b0b){
if(this.isAttached){
this._labelBinding.setLabel(_b0a,_b0b);
}
this.setProperty("label",_b0a);
};
ToolBarLabelBinding.prototype.setImage=function(_b0c,_b0d){
if(this.isAttached){
this._labelBinding.setImage(_b0c,_b0d);
}
this.setProperty("image",_b0c);
};
ToolBarLabelBinding.newInstance=function(_b0e){
var _b0f=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarlabel",_b0e);
return UserInterface.registerBinding(_b0f,ToolBarLabelBinding);
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
var _b10=this.getDescendantBindingsByLocalName("clickbutton");
if(_b10.hasEntries()){
while(_b10.hasNext()){
var _b11=_b10.getNext();
if(_b11.isDefault){
this._defaultButton=_b11;
_b11.attachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
if(!this._isListening&&_b11.isFocusable){
this.subscribe(BroadcastMessages.KEY_ENTER);
this._isListening=true;
}
}
this._buttons=_b10;
}
};
DialogToolBarBinding.prototype.handleBroadcast=function(_b12,arg){
DialogToolBarBinding.superclass.handleBroadcast.call(this,_b12,arg);
switch(_b12){
case BroadcastMessages.KEY_ENTER:
if(!PopupBinding.hasActiveInstances()){
var _b14=this.getAncestorBindingByType(DialogBinding,true);
if(_b14&&_b14.isActive){
if(this._focusedButton){
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
}
break;
}
};
DialogToolBarBinding.prototype.handleAction=function(_b15){
DialogToolBarBinding.superclass.handleAction.call(this,_b15);
var _b16=_b15.target;
var _b17=false;
var _b18=this._buttons.reset();
if(_b16 instanceof ClickButtonBinding){
switch(_b15.type){
case Binding.ACTION_FOCUSED:
_b16.attachClassName(ButtonBinding.CLASSNAME_FOCUSED);
this._focusedButton=_b16;
if(this._defaultButton){
this._defaultButton.detachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
break;
case Binding.ACTION_BLURRED:
_b16.detachClassName(ButtonBinding.CLASSNAME_FOCUSED);
break;
}
}
if(this._defaultButton){
while(!_b17&&_b18.hasNext()){
var _b19=_b18.getNext();
_b17=_b19.isFocused;
}
if(!_b17){
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
this.subscribe(BroadcastMessages.PERSPECTIVE_CHANGED);
var _b1a=this._views;
for(var _b1b in ViewDefinitions){
var def=ViewDefinitions[_b1b];
var key=def.perspective;
if(key!=null){
if(!_b1a.has(key)){
_b1a.set(key,new List());
}
var list=_b1a.get(key);
list.add(def);
}
}
};
ToolBoxToolBarButtonBinding.prototype.handleBroadcast=function(_b1f,arg){
ToolBoxToolBarButtonBinding.superclass.handleBroadcast.call(this,_b1f,arg);
switch(_b1f){
case BroadcastMessages.PERSPECTIVE_CHANGED:
var tag=arg;
if(this._views.has(tag)){
if(tag!=this._lastGeneratedPerspective){
this._lastGeneratedPerspective=tag;
var list=this._views.get(tag);
var _b23=this.bindingWindow.bindingMap.toolboxpopup;
_b23.empty();
list.each(function(def){
var item=_b23.add(StageViewMenuItemBinding.newInstance(_b23.bindingDocument));
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
TreeBinding.grid=function(_b26){
var _b27=TreeNodeBinding.HEIGHT;
var ceil=Math.ceil(_b26);
var _b29=_b26%_b27;
if(_b29>0){
_b26=_b26-_b29+_b27;
}
return _b26+TreeBodyBinding.PADDING_TOP;
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
this.crawlerFilters=new List([FlexBoxCrawler.ID,FocusCrawler.ID]);
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
var _b2a=this.getProperty("focusable");
if(_b2a!=null){
this._isFocusable=_b2a;
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
var _b2c=this.getProperty("builder");
if(_b2c){
this._buildFromTextArea(_b2c);
}else{
if(this._treeNodeBuffer.hasEntries()){
while(this._treeNodeBuffer.hasNext()){
this.add(this._treeNodeBuffer.getNext());
}
}
}
};
TreeBinding.prototype._setupTreeSelection=function(){
var _b2d=this.getProperty("selectable");
var _b2e=this.getProperty("selectionproperty");
var _b2f=this.getProperty("selectionvalue");
if(_b2d){
this.setSelectable(true);
if(_b2e){
this.setSelectionProperty(_b2e);
}
if(_b2f){
this.setSelectionValue(_b2f);
}
}
this._positionIndicatorBinding=this.add(TreePositionIndicatorBinding.newInstance(this.bindingDocument));
this.shadowTree.positionIndicator=this._positionIndicatorBinding;
this._positionIndicatorBinding.attach();
};
TreeBinding.prototype._buildFromTextArea=function(id){
var area=this.bindingDocument.getElementById(id);
if(area!=null){
var _b32=UserInterface.getBinding(area);
var _b33=this._treeBodyBinding;
function build(){
_b33.subTreeFromString(area.value);
}
_b32.addActionListener(Binding.ACTION_UPDATED,{handleAction:function(){
build();
}});
setTimeout(build,0);
}
};
TreeBinding.prototype.registerTreeNodeBinding=function(_b34){
var _b35=_b34.getHandle();
if(this._treeNodeBindings.has(_b35)){
throw "Duplicate treenodehandles registered: "+_b34.getLabel();
}else{
this._treeNodeBindings.set(_b35,_b34);
var map=this._openTreeNodesBackupMap;
if(map!=null&&map.has(_b35)){
_b34.open();
}
}
};
TreeBinding.prototype.unRegisterTreeNodeBinding=function(_b37){
this._treeNodeBindings.del(_b37.getHandle());
};
TreeBinding.prototype.getTreeNodeBindingByHandle=function(_b38){
var _b39=null;
if(this._treeNodeBindings.has(_b38)){
_b39=this._treeNodeBindings.get(_b38);
}else{
throw "No such treenode: "+_b38;
}
return _b39;
};
TreeBinding.prototype.handleAction=function(_b3a){
TreeBinding.superclass.handleAction.call(this,_b3a);
var _b3b=_b3a.target;
switch(_b3a.type){
case TreeNodeBinding.ACTION_OPEN:
_b3a.consume();
break;
case TreeNodeBinding.ACTION_CLOSE:
this._blurDescendantBindings(_b3b);
_b3a.consume();
break;
case TreeNodeBinding.ACTION_ONFOCUS:
this._nodePrimary=_b3b;
this.focusSingleTreeNodeBinding(_b3b);
if(!this.isFocused){
this.focus();
}
_b3a.consume();
break;
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
switch(this._selectionType){
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodePrimary=_b3b;
this.focusSingleTreeNodeBinding(_b3b);
break;
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodeSecondary=_b3b;
if(!this._nodePrimary||this._nodeSecondary==this._nodePrimary){
this._nodePrimary=_b3b;
this.focusSingleTreeNodeBinding(_b3b);
}else{
this.focusMultipeTreeNodeBindings(this._getVisibleTreeNodeBindingsInRange(this._nodePrimary,this._nodeSecondary));
}
break;
}
if(!this.isFocused){
this.focus();
}
_b3a.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
if(_b3b.isFocused){
this.blurSelectedTreeNodes();
}
_b3a.consume();
break;
case TreeNodeBinding.ACTION_BLUR:
break;
}
};
TreeBinding.prototype._getVisibleTreeNodeBindingsInRange=function(_b3c,_b3d){
alert("TreeBinding#_getVisibleTreeNodeBindingsInRange");
};
TreeBinding.prototype.focusSingleTreeNodeBinding=function(_b3e){
if(_b3e!=null&&!_b3e.isFocused){
this.blurSelectedTreeNodes();
this._focusedTreeNodeBindings.add(_b3e);
_b3e.invokeManagedFocus();
if(this._isSelectable){
this._manageSelections();
}
}
};
TreeBinding.prototype.focusMultipeTreeNodeBindings=function(_b3f){
this.blurSelectedTreeNodes();
while(_b3f.hasNext()){
var _b40=_b3f.getNext();
this._focusedTreeNodeBindings.add(_b40);
_b40.invokeManagedFocus();
}
if(this._isSelectable){
this._manageSelections();
}
};
TreeBinding.prototype._manageSelections=function(){
var _b41=this._selectedTreeNodeBindings;
this._selectedTreeNodeBindings={};
var _b42=false;
var _b43=null;
this._focusedTreeNodeBindings.reset();
while(this._focusedTreeNodeBindings.hasNext()){
var _b44=this._focusedTreeNodeBindings.getNext();
var _b45=_b44.getProperty(this._selectionProperty);
if(_b45!=null){
if(!this._selectionValue||this._selectionValue[_b45]){
_b43=(this._selectedTreeNodeBindings[_b44.key]=_b44);
var _b46=_b41[_b44.key];
if(!_b46||_b46!=_b43){
_b42=true;
}
}
}
}
if(_b43){
if(_b42){
this.dispatchAction(TreeBinding.ACTION_SELECTIONCHANGED);
}
}else{
if(_b41){
for(var key in _b41){
this.dispatchAction(TreeBinding.ACTION_NOSELECTION);
break;
}
}
}
};
TreeBinding.prototype.getSelectedTreeNodeBindings=function(){
var _b48=new List();
for(var key in this._selectedTreeNodeBindings){
_b48.add(this._selectedTreeNodeBindings[key]);
}
return _b48;
};
TreeBinding.prototype.blurSelectedTreeNodes=function(){
this._focusedTreeNodeBindings.reset().each(function(_b4a){
_b4a.blur();
});
this._focusedTreeNodeBindings.clear();
};
TreeBinding.prototype._blurDescendantBindings=function(_b4b){
var _b4c=_b4b.getDescendantBindingsByLocalName("treenode");
var _b4d=true;
var self=this;
_b4c.each(function(desc){
if(desc.isFocused){
desc.blur();
self._focusedTreeNodeBindings.del(self._focusedTreeNodeBindings.getIndex(desc));
}
return _b4d;
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
var _b50=this._treeBodyBinding.getChildBindingByLocalName("treenode");
if(_b50!=null){
this.focusSingleTreeNodeBinding(_b50);
_b50.callback();
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
TreeBinding.prototype.add=function(_b51){
var _b52=null;
if(this._treeBodyBinding){
_b52=this._treeBodyBinding.add(_b51);
}else{
this._treeNodeBuffer.add(_b51);
_b52=_b51;
}
return _b52;
};
TreeBinding.prototype.addFirst=function(_b53){
throw new Error("Not implemented");
};
TreeBinding.prototype.empty=function(){
this._treeBodyBinding.detachRecursive();
var _b54=this._treeBodyBinding.bindingElement;
_b54.innerHTML="";
};
TreeBinding.prototype.isEmpty=function(){
return this._treeNodeBindings.hasEntries()==false;
};
TreeBinding.prototype.collapse=function(){
this.blurSelectedTreeNodes();
this._treeNodeBindings.each(function(_b55,_b56){
if(_b56.isContainer&&_b56.isOpen){
_b56.close();
}
});
};
TreeBinding.prototype.setSelectable=function(_b57){
this._isSelectable=_b57;
if(_b57){
this._selectedTreeNodeBindings={};
}else{
this._selectedTreeNodeBindings=null;
this._selectionProperty=null;
this._selectionValue=null;
}
};
TreeBinding.prototype.setSelectionProperty=function(_b58){
this._selectionProperty=_b58;
};
TreeBinding.prototype.setSelectionValue=function(_b59){
if(_b59){
var list=new List(_b59.split(" "));
this._selectionValue={};
while(list.hasNext()){
this._selectionValue[list.getNext()]=true;
}
}
};
TreeBinding.prototype.handleBroadcast=function(_b5b,arg){
TreeBinding.superclass.handleBroadcast.call(this,_b5b,arg);
switch(_b5b){
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
var _b5d=this.getFocusedTreeNodeBindings();
if(_b5d.hasEntries()){
var node=_b5d.getFirst();
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
var _b60=this.getFocusedTreeNodeBindings();
if(_b60.hasEntries()){
var node=_b60.getFirst();
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
var _b63=null;
while(next==null&&(_b63=node.getAncestorBindingByLocalName("treenode"))!=null){
if(_b63!=null){
next=_b63.getNextBindingByLocalName("treenode");
}
node=_b63;
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
var _b65=DOMEvents.getTarget(e);
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
var _b66=new TreeCrawler();
var list=new List();
_b66.mode=TreeCrawler.MODE_GETOPEN;
_b66.crawl(this.bindingElement,list);
var map=new Map();
if(list.hasEntries()){
while(list.hasNext()){
var _b69=list.getNext();
map.set(_b69.getHandle(),true);
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
var _b6e=this._positionIndicatorBinding;
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
if(y!=_b6e.getPosition().y){
_b6e.setPosition(new Point(this._acceptingPosition.x+TreeNodeBinding.INDENT,y));
}
if(!_b6e.isVisible){
_b6e.show();
}
}else{
if(_b6e.isVisible){
_b6e.hide();
}
}
}else{
if(_b6e.isVisible){
_b6e.hide();
}
}
};
TreeBinding.prototype.enablePositionIndicator=function(_b71){
this._acceptingTreeNodeBinding=_b71;
this._acceptingPosition=_b71.boxObject.getLocalPosition();
this._acceptingDimension=_b71.boxObject.getDimension();
this._acceptingPositions=this._getChildPositions(_b71);
};
TreeBinding.prototype.disablePositionIndicator=function(){
this._acceptingTreeNodeBinding=null;
this._acceptingPosition=null;
this._acceptingDimension=null;
};
TreeBinding.prototype._getChildPositions=function(_b72){
var map={};
var _b74=_b72.getChildBindingsByLocalName("treenode");
var _b75,pos,dim,y;
y=TreeBinding.grid(_b72.boxObject.getLocalPosition().y);
map[y]=true;
while(_b74.hasNext()){
_b75=_b74.getNext();
pos=_b75.boxObject.getLocalPosition();
dim=_b75.boxObject.getDimension();
y=TreeBinding.grid(pos.y+dim.h)-TreeNodeBinding.HEIGHT;
map[y]=true;
}
return map;
};
TreeBinding.prototype.getDropIndex=function(){
var y=this._positionIndicatorBinding.getPosition().y;
var drop=0;
for(var _b7b in this._acceptingPositions){
if(_b7b==y){
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
TreeBinding.newInstance=function(_b7c){
var _b7d=DOMUtil.createElementNS(Constants.NS_UI,"ui:tree",_b7c);
var _b7e=UserInterface.registerBinding(_b7d,TreeBinding);
_b7e.treeBodyBinding=TreeBodyBinding.newInstance(_b7c);
return _b7e;
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
TreeBodyBinding.prototype.accept=function(_b7f){
if(_b7f instanceof TreeNodeBinding){
this.logger.debug(_b7f);
}
};
TreeBodyBinding.prototype.handleAction=function(_b80){
TreeBodyBinding.superclass.handleAction.call(this,_b80);
switch(_b80.type){
case TreeNodeBinding.ACTION_FOCUSED:
this._scrollIntoView(_b80.target);
_b80.consume();
break;
}
};
TreeBodyBinding.prototype._scrollIntoView=function(_b81){
var a=this.boxObject.getDimension().h;
var y=_b81.boxObject.getLocalPosition().y;
var h=_b81.boxObject.getDimension().h;
var s=this.bindingElement.scrollTop;
var _b86=_b81.labelBinding.bindingElement;
if(y-s<0){
_b86.scrollIntoView(true);
}else{
if(y-s+h>a){
_b86.scrollIntoView(false);
}
}
};
TreeBodyBinding.newInstance=function(_b87){
var _b88=DOMUtil.createElementNS(Constants.NS_UI,"ui:treebody",_b87);
return UserInterface.registerBinding(_b88,TreeBodyBinding);
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
var _b89=TreeNodeBinding.superclass.serialize.call(this);
if(_b89){
_b89.label=this.getLabel();
_b89.image=this.getImage();
var _b8a=this.getHandle();
if(_b8a&&_b8a!=this.key){
_b89.handle=_b8a;
}
if(this.isOpen){
_b89.open=true;
}
if(this.isDisabled){
_b89.disabled=true;
}
if(this.dragType){
_b89.dragtype=this.dragType;
}
if(this.dragAccept){
_b89.dragaccept=this.dragAccept;
}
}
return _b89;
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
var _b8c=UserInterface.getBinding(node);
if(_b8c&&_b8c.containingTreeBinding){
this.containingTreeBinding=_b8c.containingTreeBinding;
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
var _b8d=this.key;
var _b8e=this.getProperty("handle");
if(_b8e){
_b8d=_b8e;
}
return _b8d;
};
TreeNodeBinding.prototype.setHandle=function(_b8f){
this.setProperty("handle",_b8f);
};
TreeNodeBinding.prototype.buildDOMContent=function(){
var url=this.getProperty("url");
var _b91=this.getProperty("label");
var _b92=this.getProperty("tooltip");
var _b93=this.getProperty("oncommand");
var _b94=this.getProperty("onbindingfocus");
var _b95=this.getProperty("onbindingblur");
var _b96=this.getProperty("focused");
var _b97=this.getProperty("callbackid");
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
if(_b91!=null){
this.setLabel(_b91);
}
if(_b92!=null){
this.setToolTip(_b92);
}
if(!this.imageProfile){
this._computeImageProfile();
}
this.setImage(this.computeImage());
if(this.isContainer){
this.updateClassNames();
}
var _b99=this.bindingWindow.WindowManager;
if(_b93!=null){
if(Client.isExplorer){
_b93=Binding.parseScriptStatement(_b93,this.key);
}
this.oncommand=function(){
_b99.evaluate(_b93);
};
}
if(_b94!=null){
if(Client.isExplorer){
_b94=Binding.parseScriptStatement(_b94,this.key);
}
this.onfocus=function(){
_b99.evaluate(_b94);
};
}
if(_b95!=null){
if(Client.isExplorer){
_b95=Binding.parseScriptStatement(_b95,this.key);
}
this.onblur=function(){
_b99.evaluate(_b95);
};
}
if(_b96==true){
this.focus();
}
if(_b97!=null){
Binding.dotnetify(this,_b97);
}
};
TreeNodeBinding.prototype.handleAction=function(_b9a){
TreeNodeBinding.superclass.handleAction.call(this,_b9a);
switch(_b9a.type){
case TreeNodeBinding.ACTION_FOCUSED:
if(_b9a.target!=this){
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
TreeNodeBinding.prototype.accept=function(_b9b,_b9c){
var _b9d=true;
if(_b9b instanceof TreeNodeBinding){
var _b9e=false;
var _b9f=this.bindingElement;
var _ba0=this.containingTreeBinding.bindingElement;
while(!_b9e&&_b9f!=_ba0){
if(_b9f==_b9b.getBindingElement()){
_b9e=true;
}else{
_b9f=_b9f.parentNode;
}
}
if(_b9e){
Dialog.error("Not Allowed","You cannot move a folder into itself.");
_b9d=false;
}else{
this.acceptTreeNodeBinding(_b9b,_b9c);
}
}else{
_b9d=false;
}
return _b9d;
};
TreeNodeBinding.prototype.acceptTreeNodeBinding=function(_ba1,_ba2){
var _ba3=_ba1.serializeToString();
var _ba4=new BindingParser(this.bindingDocument);
var _ba5=_ba4.parseFromString(_ba3).getFirst();
_ba2=_ba2?_ba2:this.containingTreeBinding.getDropIndex();
var _ba6=this.getChildElementsByLocalName("treenode");
this.bindingElement.insertBefore(_ba5,_ba6.get(_ba2));
this.bindingWindow.DocumentManager.attachBindings(this.bindingElement);
_ba1.dispose();
};
TreeNodeBinding.prototype.showAcceptance=function(){
this.containingTreeBinding.enablePositionIndicator(this);
};
TreeNodeBinding.prototype.hideAcceptance=function(){
this.containingTreeBinding.disablePositionIndicator();
};
TreeNodeBinding.prototype._computeImageProfile=function(){
var _ba7=this.getProperty("image");
var _ba8=this.getProperty("image-active");
var _ba9=this.getProperty("image-disabled");
_ba8=_ba8?_ba8:this.isContainer?_ba7?_ba7:TreeNodeBinding.DEFAULT_FOLDER_OPEN:_ba7?_ba7:TreeNodeBinding.DEFAULT_ITEM;
_ba9=_ba9?_ba9:this.isContainer?_ba7?_ba7:TreeNodeBinding.DEFAULT_FOLDER_DISABLED:_ba7?_ba7:TreeNodeBinding.DEFAULT_ITEM_DISABLED;
_ba7=_ba7?_ba7:this.isContainer?TreeNodeBinding.DEFAULT_FOLDER_CLOSED:TreeNodeBinding.DEFAULT_ITEM;
this.imageProfile=new ImageProfile({image:_ba7,imageHover:null,imageActive:_ba8,imageDisabled:_ba9});
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
TreeNodeBinding.prototype.setLabel=function(_bab){
this.setProperty("label",String(_bab));
if(this.isAttached){
this.labelBinding.setLabel(String(_bab));
}
};
TreeNodeBinding.prototype.setToolTip=function(_bac){
this.setProperty("tooltip",String(_bac));
if(this.isAttached){
this.labelBinding.setToolTip(String(_bac));
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
var _bad=this.imageProfile.getDefaultImage();
var _bae=this.imageProfile.getActiveImage();
_bae=_bae?_bae:_bad;
return this.isOpen?_bae:_bad;
};
TreeNodeBinding.prototype.handleEvent=function(e){
TreeNodeBinding.superclass.handleEvent.call(this,e);
var _bb0=DOMEvents.getTarget(e);
var _bb1=this.labelBinding.bindingElement;
var _bb2=this.labelBinding.shadowTree.labelBody;
var _bb3=this.labelBinding.shadowTree.labelText;
switch(e.type){
case DOMEvents.MOUSEDOWN:
switch(_bb0){
case _bb1:
this._onAction(e);
break;
case _bb2:
case _bb3:
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
if(_bb0.parentNode==this.bindingElement&&_bb0.__updateType==Update.TYPE_INSERT){
var _bb1=this.labelBinding.bindingElement;
if(DOMUtil.getLocalName(_bb0)=="treenode"){
if(_bb0==this.bindingElement.firstChild){
this.bindingElement.insertBefore(_bb0,_bb1.nextSibling);
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
switch(_bb0){
case _bb1:
case _bb2:
case _bb3:
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
var _bb7=true;
if(e.type=="mousedown"){
var _bb8=e.button==(e.target?0:1);
if(!_bb8){
_bb7=false;
}
}
if(_bb7){
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
var _bba=false;
if(e!=null){
_bba=e.shiftKey;
}
this.dispatchAction(_bba?TreeNodeBinding.ACTION_ONMULTIFOCUS:TreeNodeBinding.ACTION_ONFOCUS);
if(e!=null){
this.stopPropagation(e);
}
if(this.onfocus!=null){
this.onfocus();
}
if(e!=null){
if(this.getProperty("callbackid")!=null){
this.callback();
}
}
};
TreeNodeBinding.prototype.callback=function(){
var _bbb=this.getProperty("callbackid");
if(_bbb!=null){
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
var _bbe=this.getDescendantBindingsByLocalName("treenode");
_bbe.each(function(_bbf){
_bbf.dispose();
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
TreeNodeBinding.prototype.handleElement=function(_bc0){
var _bc1=_bc0.getAttribute("focused");
if(_bc1=="true"){
if(!this.isFocused){
this.focus();
}
}
return false;
};
TreeNodeBinding.newInstance=function(_bc2){
var _bc3=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_bc2);
return UserInterface.registerBinding(_bc3,TreeNodeBinding);
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
TreeContentBinding.newInstance=function(_bc4){
var _bc5=DOMUtil.createElementNS(Constants.NS_UI,"ui:treecontent",_bc4);
return UserInterface.registerBinding(_bc5,TreeContentBinding);
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
TreePositionIndicatorBinding.prototype.setPosition=function(_bc6){
this.bindingElement.style.left=_bc6.x+"px";
this.bindingElement.style.top=_bc6.y+"px";
this._geometry.x=_bc6.x;
this._geometry.y=_bc6.y;
};
TreePositionIndicatorBinding.prototype.getPosition=function(){
return new Point(this._geometry.x,this._geometry.y);
};
TreePositionIndicatorBinding.newInstance=function(_bc7){
var _bc8=DOMUtil.createElementNS(Constants.NS_UI,"ui:treepositionindicator",_bc7);
return UserInterface.registerBinding(_bc8,TreePositionIndicatorBinding);
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
this.addFilter(function(_bca){
var _bcb=UserInterface.getBinding(_bca);
var _bcc=null;
var _bcc=null;
if(!_bcb instanceof TreeNodeBinding){
_bcc=NodeCrawler.SKIP_NODE;
}
return _bcc;
});
this.addFilter(function(_bcd,list){
var _bcf=UserInterface.getBinding(_bcd);
var _bd0=null;
switch(self.mode){
case TreeCrawler.MODE_GETOPEN:
if(_bcf.isOpen){
list.add(_bcf);
}
break;
}
return _bd0;
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
ShadowBinding.prototype.shadow=function(_bd1){
this.targetBinding=_bd1;
_bd1.addActionListener(Binding.ACTION_POSITIONCHANGED,this);
_bd1.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_bd1.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_bd1.bindingElement.parentNode.appendChild(this.bindingElement);
if(_bd1.isVisible){
this.show();
this.setPosition(_bd1.getPosition());
this.setDimension(_bd1.getDimension());
}else{
this.hide();
}
};
ShadowBinding.prototype.handleAction=function(_bd2){
ShadowBinding.superclass.handleAction.call(this,_bd2);
var _bd3=_bd2.target;
if(_bd3==this.targetBinding){
switch(_bd2.type){
case Binding.ACTION_POSITIONCHANGED:
this.setPosition(this.targetBinding.getPosition());
_bd2.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
this.setDimension(this.targetBinding.getDimension());
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(_bd3.isVisible){
this.show();
this.setPosition(_bd3.getPosition());
this.setDimension(_bd3.getDimension());
}else{
this.hide();
}
break;
}
}
};
ShadowBinding.prototype.setPosition=function(_bd4){
var _bd5=this.offset-this.expand;
this.bindingElement.style.left=new String(_bd4.x+_bd5)+"px";
this.bindingElement.style.top=new String(_bd4.y+_bd5)+"px";
};
ShadowBinding.prototype.setDimension=function(dim){
this.bindingElement.style.width=new String(dim.w+2*this.expand)+"px";
this.bindingElement.style.height=new String(dim.h+2*this.expand)+"px";
};
ShadowBinding.newInstance=function(_bd7){
var _bd8=DOMUtil.createElementNS(Constants.NS_UI,"ui:shadow",_bd7);
return UserInterface.registerBinding(_bd8,ShadowBinding);
};
DockControlImageProfile.prototype=new ControlImageProfile;
DockControlImageProfile.prototype.constructor=DockControlImageProfile;
DockControlImageProfile.superclass=ControlImageProfile.prototype;
DockControlImageProfile.IMAGE_MINIMIZE=Resolver.resolve("${skin}/docks/control-minimize-${string}.png");
DockControlImageProfile.IMAGE_MAXIMIZE=Resolver.resolve("${skin}/docks/control-maximize-${string}.png");
DockControlImageProfile.IMAGE_RESTORE=Resolver.resolve("${skin}/docks/control-restore-${string}.png");
DockControlImageProfile.IMAGE_CLOSE=null;
function DockControlImageProfile(_bd9){
this.binding=_bd9;
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
DockTabsButtonBinding.newInstance=function(_bda){
var _bdb=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_bda);
_bdb.setAttribute("type","checkbox");
_bdb.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_bdb.className="tabbutton";
return UserInterface.registerBinding(_bdb,DockTabsButtonBinding);
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
var _bdc=DockBinding.superclass.serialize.call(this);
if(_bdc){
_bdc.active=this.isActive?true:null;
_bdc.collapsed=this.isCollapsed?true:null;
}
return _bdc;
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
var _bdd=UserInterface.getBinding(this.bindingElement.parentNode);
var _bde=MatrixBinding.newInstance(this.bindingDocument);
_bde.attachClassName("dockliner");
this.shadowTree.dockLiner=_bde;
_bdd.add(_bde);
_bde.attach();
_bde.manifest();
var type=this.getProperty("type");
this.type=type?type:DockBinding.TYPE_TOOLS;
this.attachClassName(this.type);
if(this.getProperty("active")==true){
this.activate();
}
};
DockBinding.prototype.interceptDisplayChange=function(_be0){
var _be1=this.getSelectedTabPanelBinding();
if(_be1){
_be1.isVisible=_be0;
_be1.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
}
};
DockBinding.prototype.prepareNewView=function(_be2){
var _be3=this._getBindingForDefinition(_be2);
var _be4=DockTabBinding.newInstance(this.bindingDocument);
_be4.setHandle(_be2.handle);
_be4.setLabel(this.type==DockBinding.TYPE_EDITORS?null:_be2.label);
_be4.setImage(_be2.image);
_be4.setToolTip(_be2.toolTip);
_be4.setEntityToken(_be2.entityToken);
_be4.setAssociatedView(_be3);
this.appendTabByBindings(_be4,null);
this._setupPageBindingListeners(_be4);
var _be5=this.getTabPanelBinding(_be4);
_be3.snapToBinding(_be5);
var _be6=this.bindingWindow.bindingMap.views;
_be6.add(_be3);
if(!this.isActive){
this.activate();
}
_be3.attach();
};
DockBinding.prototype.prepareOpenView=function(_be7,_be8){
this.logger.debug("DockBinding.prototype.prepareOpenView: _setupDirtyStuff required?");
_be8.setLabel(_be7.label);
_be8.setImage(_be7.image);
_be8.setToolTip(_be7.toolTip);
this._setupPageBindingListeners(_be8);
var _be9=this.getTabPanelBinding(_be8);
var _bea=this._getBindingForDefinition(_be7);
_be8.setAssociatedView(_bea);
_bea.snapToBinding(_be9);
UserInterface.getBinding(this.bindingDocument.body).add(_bea);
_bea.attach();
};
DockBinding.prototype._getBindingForDefinition=function(_beb){
var _bec=this.bindingWindow.bindingMap.views;
var view=ViewBinding.newInstance(_bec.bindingDocument);
view.setDefinition(_beb);
return view;
};
DockBinding.prototype._setupPageBindingListeners=function(_bee){
var _bef=this.getTabPanelBinding(_bee);
var self=this;
var _bf1={handleAction:function(_bf2){
var _bf3=_bf2.target;
switch(_bf2.type){
case PageBinding.ACTION_ATTACHED:
TabBoxBinding.currentActiveInstance=self;
break;
case PageBinding.ACTION_INITIALIZED:
_bf3.reflex(true);
var view=_bee.getAssociatedView();
if(_bf3.bindingWindow==view.getContentWindow()){
_bee.updateDisplay(_bf3);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_COMPLETED,view.getHandle());
if(StatusBar.state==StatusBar.BUSY){
StatusBar.clear();
}
}
_bee.onPageInitialize(_bf3);
_bf2.consume();
break;
case DockTabBinding.ACTION_UPDATE_VISUAL:
_bee.updateDisplay(_bf3);
_bf2.consume();
break;
case DockTabBinding.ACTION_UPDATE_TOKEN:
_bee.updateEntityToken(_bf3);
_bf2.consume();
break;
case EditorPageBinding.ACTION_DIRTY:
_bee.setDirty(true);
break;
case EditorPageBinding.ACTION_SAVE:
_bee.onSaveStart();
break;
case ViewBinding.ACTION_ONCLOSE:
self.closeTab(_bee);
_bf2.consume();
break;
case ViewBinding.ACTION_ONCLOSE_FORCE:
self.closeTab(_bee,true);
_bf2.consume();
break;
case DockPanelBinding.ACTION_FORCE_SELECT:
self.select(_bee);
break;
case Binding.ACTION_FORCE_REFLEX:
_bef.reflex(true);
_bf2.consume();
break;
case DockTabBinding.ACTION_FORCE_CLEAN:
case EditorPageBinding.ACTION_CLEAN:
if(_bee.isDirty){
_bee.setDirty(false);
}
break;
}
}};
new List([DockTabBinding.ACTION_UPDATE_VISUAL,DockTabBinding.ACTION_UPDATE_TOKEN,PageBinding.ACTION_ATTACHED,PageBinding.ACTION_INITIALIZED,EditorPageBinding.ACTION_DIRTY,EditorPageBinding.ACTION_CLEAN,EditorPageBinding.ACTION_SAVE,ViewBinding.ACTION_ONCLOSE,ViewBinding.ACTION_ONCLOSE_FORCE,DockPanelBinding.ACTION_FORCE_SELECT,Binding.ACTION_FORCE_REFLEX,DockTabBinding.ACTION_FORCE_CLEAN]).each(function(_bf5){
_bef.addActionListener(_bf5,_bf1);
});
};
DockBinding.prototype.summonTabPanelBinding=function(){
return DockPanelBinding.newInstance(this.bindingDocument);
};
DockBinding.prototype.handleAction=function(_bf6){
DockBinding.superclass.handleAction.call(this,_bf6);
var _bf7=_bf6.target;
switch(_bf6.type){
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_bf6.consume();
break;
case TabBoxBinding.ACTION_UPDATED:
if(_bf7 instanceof DockBinding){
if(_bf7.updateType==TabBoxBinding.UPDATE_DETACH){
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
this._viewBindingList.add(_bf7);
if(this.isActive){
_bf7.onActivate();
}
break;
case ViewBinding.ACTION_CLOSED:
this._viewBindingList.del(_bf7);
break;
}
};
DockBinding.prototype.handleBroadcast=function(_bf8,arg){
DockBinding.superclass.handleBroadcast.call(this,_bf8,arg);
switch(_bf8){
case BroadcastMessages.SYSTEMTREENODEBINDING_FOCUS:
var _bfa=arg;
if(_bfa.perspectiveNode==this.perspectiveNode){
this._selectTabByEntityToken(_bfa.node.getEntityToken());
}
break;
}
};
DockBinding.prototype._selectTabByEntityToken=function(_bfb){
var tabs=this.getTabBindings();
var _bfd=false;
while(tabs.hasNext()&&!_bfd){
var tab=tabs.getNext();
var _bff=tab.getEntityToken();
if(_bff!=null&&_bff==_bfb){
if(!tab.isSelected){
this.select(tab,true);
_bfd=true;
}
}
}
};
DockBinding.prototype.collapse=function(_c00){
this._handleCollapse(true,_c00);
};
DockBinding.prototype.unCollapse=function(_c01){
this._handleCollapse(false,_c01);
};
DockBinding.prototype._handleCollapse=function(_c02,_c03){
var _c04=this.getChildBindingByLocalName("dockpanels");
var _c05=this.getAncestorBindingByLocalName("splitbox");
if(_c02){
_c04.hide();
this.bindingElement.style.height="auto";
this.isFlexible=false;
this.isActivatable=false;
this.setProperty("collapsed",true);
if(_c03&&_c05.hasBothPanelsVisible()){
this.setWidth(200);
}
}else{
_c04.show();
this.isFlexible=true;
this.isActivatable=true;
this.deleteProperty("collapsed");
if(_c03){
this.setWidth(false);
}
}
this.interceptDisplayChange(!_c02);
this.isCollapsed=_c02;
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
DockBinding.prototype.closeTab=function(_c0a,_c0b){
if(_c0a.isDirty&&!_c0b){
var _c0c=Resolver.resolve(_c0a.getLabel());
var self=this;
Dialog.question(StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Title"),StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Text").replace("${resourcename}",_c0c),Dialog.BUTTONS_YES_NO_CANCEL,{handleDialogResponse:function(_c0e){
switch(_c0e){
case Dialog.RESPONSE_YES:
setTimeout(function(){
self.saveContainedEditor(_c0a);
},0);
break;
case Dialog.RESPONSE_NO:
self.removeTab(_c0a);
break;
}
}});
}else{
this.removeTab(_c0a);
}
};
DockBinding.prototype.closeTabsExcept=function(_c0f){
var tabs=this.getTabBindings();
while(tabs.hasNext()){
var tab=tabs.getNext();
if(tab!=_c0f){
this.closeTab(tab);
}
}
};
DockBinding.prototype.saveContainedEditor=function(_c12){
var _c13=_c12.getAssociatedView();
_c13.saveContainedEditor();
var self=this;
var _c15={handleBroadcast:function(_c16,arg){
switch(_c16){
case BroadcastMessages.CURRENT_SAVED:
if(arg.handle==_c13.getHandle()){
EventBroadcaster.unsubscribe(BroadcastMessages.CURRENT_SAVED,_c15);
if(arg.isSuccess){
self.removeTab(_c12);
}
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.CURRENT_SAVED,_c15);
};
DockBinding.prototype.appendTabByBindings=function(_c18,_c19){
if(this.isEmpty){
this.isEmpty=false;
this.isActivatable=true;
this.setWidth(false);
this.dispatchAction(DockBinding.ACTION_OPENED);
}
DockBinding.superclass.appendTabByBindings.call(this,_c18,_c19);
};
DockBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
DockBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
DockBinding.prototype.setWidth=function(_c1a){
_c1a=_c1a?_c1a+"px":"100%";
this.bindingElement.style.width=_c1a;
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
DockBinding.prototype.showControls=function(_c1b){
var tabs=this.getChildBindingByLocalName(this._nodename_tabs);
if(_c1b){
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
var _c1e=DockControlBinding.newInstance(this.bindingDocument);
_c1e.setControlType(type);
return _c1e;
};
DockTabsBinding.prototype.flex=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _c20=self.containingTabBoxBinding.getWidth();
if(!isNaN(_c20)){
_c20=_c20>0?_c20-1:0;
self.bindingElement.style.width=new String(_c20)+"px";
}
}
setTimeout(fix,250);
fix();
}
DockTabsBinding.superclass.flex.call(this);
};
DockTabsBinding.prototype.handleCrawler=function(_c21){
DockTabsBinding.superclass.handleCrawler.call(this,_c21);
switch(_c21.id){
case FlexBoxCrawler.ID:
this._explorerFlexHack();
break;
}
};
DockTabsBinding.prototype._explorerFlexHack=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _c23=self.containingTabBoxBinding.getWidth();
if(!isNaN(_c23)){
_c23=_c23>0?_c23-1:0;
self.bindingElement.style.width=new String(_c23)+"px";
}
}
setTimeout(fix,250);
fix();
}
};
DockTabsBinding.newInstance=function(_c24){
var _c25=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktabs",_c24);
return UserInterface.registerBinding(_c25,DockTabsBinding);
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
DockTabBinding.prototype.setAssociatedView=function(_c26){
this._viewBinding=_c26;
};
DockTabBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
DockTabBinding.prototype.serialize=function(){
var _c27=DockTabBinding.superclass.serialize.call(this);
if(_c27){
_c27.label=null;
_c27.image=null;
_c27.handle=this.getHandle();
}
return _c27;
};
DockTabBinding.prototype.setHandle=function(_c28){
this.setProperty("handle",_c28);
};
DockTabBinding.prototype.getHandle=function(){
return this.getProperty("handle");
};
DockTabBinding.prototype.setEntityToken=function(_c29){
if(this._entityToken==null){
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
this._entityToken=_c29;
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
var _c2a=DialogControlBinding.newInstance(this.bindingDocument);
_c2a.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_c2a);
this._controlGroupBinding.attachRecursive();
};
DockTabBinding.prototype.setDirty=function(_c2b){
if(this.containingTabBoxBinding.type==DockBinding.TYPE_EDITORS){
if(this.isDirty!=_c2b){
this.isDirty=_c2b;
if(Binding.exists(this.labelBinding)){
var _c2c=this.labelBinding.getLabel();
if(_c2c!=null){
this.labelBinding.setLabel(_c2b?"*"+_c2c:_c2c.slice(1,_c2c.length));
}else{
this.labelBinding.setLabel(_c2b?"*":"");
}
}
}
var _c2d=top.app.bindingMap.broadcasterCurrentTabDirty;
if(this.isDirty==true){
this.subscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_DIRTY,this);
_c2d.enable();
}else{
this.unsubscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_CLEAN,this);
_c2d.disable();
}
}else{
Dialog.warning("Dirty denied","Only editor docks should invoke the dirty state!");
}
};
DockTabBinding.prototype.updateDisplay=function(_c2e){
this.setLabel(_c2e.getLabel());
this.setImage(_c2e.getImage());
this.setToolTip(_c2e.getToolTip());
};
DockTabBinding.prototype.updateEntityToken=function(_c2f){
this.setEntityToken(_c2f.getEntityToken());
};
DockTabBinding.prototype.handleAction=function(_c30){
DockTabBinding.superclass.handleAction.call(this,_c30);
var _c31=_c30.target;
switch(_c30.type){
case ControlBinding.ACTION_COMMAND:
if(_c31.controlType==ControlBinding.TYPE_CLOSE){
this.close();
}
break;
case MenuItemBinding.ACTION_COMMAND:
if(_c30.listener==this.contextMenuBinding){
this._handleContextMenuItemBinding(_c31);
}
break;
}
};
DockTabBinding.prototype._handleContextMenuItemBinding=function(_c32){
var cmd=_c32.getProperty("cmd");
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
DockTabBinding.prototype.setLabel=function(_c34){
if(!_c34){
if(!this.getLabel()){
_c34=DockTabBinding.LABEL_TABLOADING;
}else{
if(this.getLabel()==DockTabBinding.LABEL_TABLOADING){
_c34=DockTabBinding.LABEL_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setLabel.call(this,_c34);
};
DockTabBinding.prototype.setImage=function(_c35){
if(!_c35){
if(!this.getImage()){
_c35=DockTabBinding.IMG_TABLOADING;
}else{
if(this.getImage()==DockTabBinding.IMG_TABLOADING){
_c35=DockTabBinding.IMG_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setImage.call(this,_c35);
};
DockTabBinding.prototype._viewSource=function(cmd){
var def=ViewDefinitions["Composite.Management.SourceCodeViewer"];
def.argument={action:cmd,doc:this._viewBinding.windowBinding.getContentDocument()};
var _c38=Resolver.resolve(this.getLabel());
switch(cmd){
case DockTabPopupBinding.CMD_VIEWSOURCE:
def.label="Source: "+_c38;
break;
case DockTabPopupBinding.CMD_VIEWGENERATED:
def.label="Generated: "+_c38;
break;
case DockTabPopupBinding.CMD_VIEWSERIALIZED:
def.label="Serialized: "+_c38;
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
var _c3a=this.bindingElement;
setTimeout(function(){
_c3a.style.bottom="auto";
},25);
}
};
DockTabBinding.prototype.handleBroadcast=function(_c3b,arg){
DockTabBinding.superclass.handleBroadcast.call(this,_c3b,arg);
var body=this._viewBinding.getContentDocument().body;
var root=UserInterface.getBinding(body);
switch(_c3b){
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
DockTabBinding.prototype.select=function(_c40){
DockTabBinding.superclass.select.call(this,_c40);
this._updateBroadcasters();
if(_c40!=true){
this._updateTree();
}
this._updateGlobalEntityToken();
};
DockTabBinding.prototype.close=function(){
this.containingTabBoxBinding.closeTab(this);
};
DockTabBinding.prototype._updateBroadcasters=function(){
if(this.isSelected){
var _c41=top.app.bindingMap.broadcasterCurrentTabDirty;
var _c42=top.app.bindingMap.broadcasterCurrentIsEditor;
if(this._isEditorDockTab()){
_c42.enable();
if(this.isDirty){
_c41.enable();
}else{
_c41.disable();
}
}else{
_c42.disable();
_c41.disable();
}
}
};
DockTabBinding.prototype._updateTree=function(_c43){
if(this._canUpdateTree||_c43){
EventBroadcaster.broadcast(BroadcastMessages.DOCKTABBINDING_SELECT,this);
}
};
DockTabBinding.prototype._isEditorDockTab=function(){
var _c44=false;
if(this._viewBinding!=null){
var win=this._viewBinding.getContentWindow();
if(win!=null&&win.bindingMap!=null){
var _c46=win.bindingMap.savebutton;
if(_c46!=null){
_c44=true;
}
}
}
return _c44;
};
DockTabBinding.prototype._updateGlobalEntityToken=function(){
StageBinding.entityToken=this._entityToken;
};
DockTabBinding.newInstance=function(_c47){
var _c48=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktab",_c47);
return UserInterface.registerBinding(_c48,DockTabBinding);
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
DockPanelsBinding.newInstance=function(_c49){
var _c4a=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanels",_c49);
return UserInterface.registerBinding(_c4a,DockPanelsBinding);
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
DockPanelBinding.prototype.select=function(_c4b){
DockPanelBinding.superclass.select.call(this,_c4b);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.unselect=function(){
DockPanelBinding.superclass.unselect.call(this);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.flex=function(){
this.dispatchAction(Binding.ACTION_DIMENSIONCHANGED);
};
DockPanelBinding.prototype.handleCrawler=function(_c4c){
DockPanelBinding.superclass.handleCrawler.call(this,_c4c);
if(_c4c.response==null){
if(_c4c.type==NodeCrawler.TYPE_DESCENDING){
if(this.viewBinding!=null){
if(_c4c.id==FocusCrawler.ID){
_c4c.nextNode=this.viewBinding.bindingElement;
}
}
}
}
};
DockPanelBinding.newInstance=function(_c4d){
var _c4e=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanel",_c4d);
return UserInterface.registerBinding(_c4e,DockPanelBinding);
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
DockControlBinding.newInstance=function(_c4f){
var _c50=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_c4f);
return UserInterface.registerBinding(_c50,DockControlBinding);
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
ViewBinding.getInstance=function(_c51){
var _c52=ViewBinding._instances.get(_c51);
if(!_c52){
var cry="ViewBinding.getInstance: No such instance: "+_c51;
SystemLogger.getLogger("ViewBinding [static]").error(cry);
SystemDebug.stack(arguments);
if(Application.isDeveloperMode){
alert(cry);
}
}
return _c52;
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
if(this.isFreeFloating==true){
if(snap.isVisible==true){
if(snap.isAttached==true){
var _c55=snap.boxObject.getGlobalPosition();
var _c56=snap.boxObject.getDimension();
if(!Point.isEqual(_c55,this._lastknownposition)){
this.setPosition(_c55);
this._lastknownposition=_c55;
}
if(!Dimension.isEqual(_c56,this._lastknowndimension)){
this.setDimension(_c56);
this._lastknowndimension=_c56;
var _c57=_c56.h-ViewBinding.VERTICAL_ADJUST;
_c57=_c57<0?0:_c57;
this.windowBinding.getBindingElement().style.height=new String(_c57)+"px";
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
var _c58=this._viewDefinition.flowHandle;
if(_c58!=null){
FlowControllerService.CancelFlow(_c58);
}
}
if(this._viewDefinition!=null){
var _c59=this._viewDefinition.handle;
EventBroadcaster.broadcast(BroadcastMessages.VIEW_CLOSED,_c59);
this.logger.fine("ViewBinding closed: \""+_c59+"\"");
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
var _c5b=null;
if(this._viewDefinition!=null){
_c5b=this._viewDefinition.handle;
}
return _c5b;
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
ViewBinding.prototype.setDefinition=function(_c5c){
this._viewDefinition=_c5c;
if(_c5c.flowHandle!=null){
this.subscribe(BroadcastMessages.CLOSE_VIEWS);
}
};
ViewBinding.prototype.getDefinition=function(){
return this._viewDefinition;
};
ViewBinding.prototype.handleAction=function(_c5d){
ViewBinding.superclass.handleAction.call(this,_c5d);
var _c5e=_c5d.target;
switch(_c5d.type){
case RootBinding.ACTION_PHASE_1:
case RootBinding.ACTION_PHASE_2:
case RootBinding.ACTION_PHASE_3:
if(_c5d.type==RootBinding.ACTION_PHASE_1){
if(this.isActivated&&!_c5e.isActivated){
_c5e.onActivate();
}
}
_c5d.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
if(this.isFreeFloating==true){
if(_c5e==this._snapBinding){
if(this.isVisible==true){
this.updatePositionDimension();
_c5d.consume();
}
}
}
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(this.isFreeFloating==true){
if(_c5e==this._snapBinding){
if(_c5e.isVisible==true){
this.show();
}else{
this.hide();
}
}
}
break;
case WindowBinding.ACTION_LOADED:
case WindowBinding.ACTION_ONLOAD:
if(_c5e.getContentWindow().isPostBackDocument){
if(_c5d.type==WindowBinding.ACTION_ONLOAD){
var arg=this._viewDefinition.argument;
if(arg!=null&&arg.list!=null&&arg.url!=null){
_c5e.post(arg.list,arg.url);
arg.list=null;
arg.url=null;
}
}
}else{
if(Client.isExplorer==true){
if(_c5e==this.windowBinding){
var self=this;
DOMEvents.addEventListener(_c5e.getContentWindow(),DOMEvents.UNLOAD,{handleEvent:function(e){
if(Binding.exists(self._coverBinding)==true){
self._coverBinding.show();
}
}});
}
if(_c5d.type==WindowBinding.ACTION_ONLOAD){
if(this._coverBinding){
this._coverBinding.hide();
}
}
}
}
_c5d.consume();
break;
case PageBinding.ACTION_ATTACHED:
if(!_c5e.label&&this._viewDefinition.label){
_c5e.label=this._viewDefinition.label;
}
if(!_c5e.image&&this._viewDefinition.image){
_c5e.image=this._viewDefinition.image;
}
if(_c5e.bindingWindow==this.getContentWindow()){
this._pageBinding=_c5e;
this._injectPageArgument();
}
case PageBinding.ACTION_INITIALIZED:
if(_c5e.bindingWindow==this.getContentWindow()){
if(Client.isExplorer&&this._coverBinding){
this._coverBinding.hide();
}
if(!this._isLoaded){
this._onLoadingCompleted(_c5e);
}
}
break;
case Binding.ACTION_DISPOSED:
if(this.isFreeFloating&&_c5e==this._snapBinding){
this.removeActionListener(Binding.ACTION_DISPOSED);
this.dispose();
_c5d.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
case WizardPageBinding.ACTION_FINISH:
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
_c5d.consume();
break;
case ViewBinding.ACTION_DETACH:
this.setDefinition(ViewDefinitions["Composite.Management.Null"]);
ViewBinding._instances.set(this._viewDefinition.handle,this);
break;
}
};
ViewBinding.prototype.handleBroadcast=function(_c62,arg){
ViewBinding.superclass.handleBroadcast.call(this,_c62,arg);
switch(_c62){
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
ViewBinding.prototype._onLoadingCompleted=function(_c64){
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
var _c67=def.argument;
if(_c67!=null){
page.setPageArgument(_c67);
}
var _c68=def.width;
if(_c68!=null){
page.width=_c68;
}
var _c69=def.height;
if(_c69!=null){
page.height=_c69;
}
}
};
ViewBinding.prototype.handleCrawler=function(_c6a){
ViewBinding.superclass.handleCrawler.call(this,_c6a);
switch(_c6a.type){
case NodeCrawler.TYPE_DESCENDING:
if(this.isFreeFloating==true){
if(_c6a.id==FocusCrawler.ID){
if(_c6a.previousNode!=this._snapBinding.bindingElement){
_c6a.response=NodeCrawler.SKIP_NODE;
}
}
}
break;
case NodeCrawler.TYPE_ASCENDING:
if(this.isFreeFloating==true){
_c6a.nextNode=this._snapBinding.bindingElement;
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
ViewBinding.prototype.setPosition=function(_c6b){
_c6b.x+=ViewBinding.HORIZONTAL_ADJUST;
this.bindingElement.style.left=_c6b.x+"px";
this.bindingElement.style.top=_c6b.y+"px";
};
ViewBinding.prototype.setDimension=function(_c6c){
_c6c.h-=ViewBinding.VERTICAL_ADJUST;
_c6c.w-=ViewBinding.HORIZONTAL_ADJUST;
_c6c.w-=1;
if(_c6c.h<0){
_c6c.h=0;
}
if(_c6c.w<0){
_c6c.w=0;
}
this.bindingElement.style.width=String(_c6c.w)+"px";
this.bindingElement.style.height=String(_c6c.h)+"px";
};
ViewBinding.prototype.snapToBinding=function(_c6d){
this.isFlexBoxBehavior=false;
_c6d.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_c6d.addActionListener(Binding.ACTION_POSITIONCHANGED,this);
_c6d.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_c6d.addActionListener(Binding.ACTION_DISPOSED,this);
if(this._snapBinding){
this._snapBinding.removeActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_POSITIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_DISPOSED,this);
this._snapBinding.viewBinding=null;
}
this._snapBinding=_c6d;
this._snapBinding.viewBinding=this;
this.isFreeFloating=true;
if(!this._isViewBindingInitialized){
this.initialize();
}
};
ViewBinding.prototype.getMigrationParent=function(){
var _c6e=null;
if(this.isFreeFloating==true){
_c6e=this._snapBinding.getBindingElement();
}else{
_c6e=ViewBinding.superclass.getMigrationParent.call(this);
}
return _c6e;
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
ViewBinding.prototype.reload=function(_c6f){
this._isLoaded=false;
this.windowBinding.reload(_c6f);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
};
ViewBinding.prototype.saveContainedEditor=function(){
var _c70=false;
if(this._pageBinding instanceof EditorPageBinding){
var _c71=this.getContentWindow().bindingMap.savebutton;
if(_c71!=null){
_c71.fireCommand();
_c70=true;
}
}
if(!_c70){
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
ViewBinding.newInstance=function(_c74){
var _c75=DOMUtil.createElementNS(Constants.NS_UI,"ui:view",_c74);
var _c76=UserInterface.registerBinding(_c75,ViewBinding);
_c76.windowBinding=_c76.add(WindowBinding.newInstance(_c74));
_c76.windowBinding.isFlexible=false;
return _c76;
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
if(!this._canPostBack){
Application.unlock(this);
}
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
var _c7e=this.bindingWindow.__doPostBack;
this.bindingWindow.__doPostBack=function(_c7f,_c80){
self.manifestAllDataBindings();
_c7e(_c7f,_c80);
if(Application.isDeveloperMode){
self._debugDotNetPostback();
}
};
};
PageBinding.prototype.postMessage=function(_c81,list){
var _c83=this.bindingWindow.bindingMap.__REQUEST;
if(_c83!=null&&this._isDotNet()){
switch(_c81){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_PERSIST:
if(this.bindingWindow.DataManager.isDirty){
if(this.validateAllDataBindings()){
if(list!=null){
if(Application.isDeveloperMode){
var _c84=_c81==EditorPageBinding.MESSAGE_SAVE?"SAVING ":"PERSISTING ";
}
list.add(this);
}
_c83.postback(_c81);
}
}
break;
default:
_c83.postback(_c81);
break;
}
}
if(list!=null){
this._postMessageToDescendants(_c81,list);
}
};
PageBinding.prototype._postMessageToDescendants=function(_c85,list){
var _c87=this.getDescendantBindingsByType(WindowBinding);
_c87.each(function(win){
var page=win.getPageBinding();
if(page!=null){
page.postMessage(_c85,list);
}
});
};
PageBinding.prototype._debugDotNetPostback=function(){
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_c8b){
list.add({name:_c8b.name,value:_c8b.value});
});
var out="";
list.each(function(_c8d){
out+=_c8d.name+": "+_c8d.value+"\n";
});
this.logger.debug(out);
};
PageBinding.prototype.handleAction=function(_c8e){
PageBinding.superclass.handleAction.call(this,_c8e);
var _c8f=_c8e.target;
switch(_c8e.type){
case RootBinding.ACTION_PHASE_3:
if(_c8f==UserInterface.getBinding(this.bindingDocument.body)){
_c8f.removeActionListener(RootBinding.ACTION_PHASE_3,this);
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
this.doPostBack(_c8f);
}
_c8e.consume();
break;
case PageBinding.ACTION_DOVALIDATEDPOSTBACK:
if(this._isDotNet()){
var _c90=this.validateAllDataBindings();
if(_c90){
this.doPostBack(_c8f);
}
}
_c8e.consume();
break;
case BalloonBinding.ACTION_INITIALIZE:
_c8e.consume();
break;
case PageBinding.ACTION_BLOCK_INIT:
if(this._initBlockers==null){
this._initBlockers=new Map();
}
this._initBlockers.set(_c8f.key,true);
break;
case PageBinding.ACTION_UNBLOCK_INIT:
if(this._initBlockers!=null){
if(this._initBlockers.has(_c8f.key)){
this._initBlockers.del(_c8f.key);
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
var _c92={handleAction:function(_c93){
if(_c93.target==self){
self.removeActionListener(PageBinding.ACTION_UPDATED,_c92);
MessageQueue.udpdate();
}
}};
this.addActionListener(PageBinding.ACTION_UPDATED,_c92);
}else{
MessageQueue.udpdate();
}
_c8e.consume();
break;
}
};
PageBinding.prototype.handleBroadcast=function(_c94,arg){
PageBinding.superclass.handleBroadcast.call(this,_c94,arg);
switch(_c94){
case BroadcastMessages.MESSAGEQUEUE_REQUESTED:
var _c96=arg;
if(!this._canPostBack&&!_c96){
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
PageBinding.prototype.doPostBack=function(_c98){
if(this._canPostBack){
if(_c98!=null&&this._isDotNet()){
var _c99=_c98.getProperty("callbackid");
if(_c99!=null){
_c99=_c99.replace(/_/g,"$");
}else{
_c99="";
}
this.bindingWindow.__doPostBack(_c99,"");
}
}
};
PageBinding.prototype.validateAllDataBindings=function(){
var _c9a=true;
var _c9b=this.bindingWindow.DataManager.getAllDataBindings();
while(_c9b.hasNext()&&_c9a){
var _c9c=_c9b.getNext();
if(_c9c.isAttached){
var _c9d=_c9c.validate();
if(_c9a&&!_c9d){
_c9a=false;
this.logger.debug("Invalid DataBinding: "+_c9c.toString()+" ("+_c9c.getName()+")");
break;
}
}
}
return _c9a;
};
PageBinding.prototype.manifestAllDataBindings=function(){
var list=new List();
var _c9f=this.bindingWindow.DataManager.getAllDataBindings();
while(_c9f.hasNext()){
var _ca0=_c9f.getNext();
if(_ca0.isAttached){
var _ca1=_ca0.manifest();
if(_ca1!=null){
list.add(_ca1);
}
}
}
return list;
};
PageBinding.prototype.cleanAllDataBindings=function(){
var _ca2=this.bindingWindow.DataManager.getAllDataBindings();
while(_ca2.hasNext()){
var _ca3=_ca2.getNext();
if(_ca3.isAttached){
_ca3.clean();
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
var _ca5=this._cachedFocus.getBinding();
if(_ca5){
_ca5.blur();
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
DialogPageBinding.ACTION_LAYOUT_UPDATED="dialoglayoutupdated";
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
var _ca6=this.getProperty("width");
if(!_ca6){
_ca6=this.hasClassName(DialogPageBinding.CLASSNAME_TABBOXED)?DialogPageBinding.DEFAULT_TABBOXED_WIDTH:DialogPageBinding.DEFAULT_WIDTH;
}
this.width=_ca6;
}
if(this.height==null){
var _ca7=this.getProperty("height");
this.height=_ca7?_ca7:DialogPageBinding.DEFAULT_HEIGHT;
}
if(this.minheight==null){
var _ca8=this.getProperty("minheight");
if(_ca8!=null){
this.minheight=_ca8;
}
}
if(this.controls==null){
var _ca9=this.getProperty("controls");
this.controls=_ca9?_ca9:DialogPageBinding.DEFAULT_CONTROLS;
}
if(!this.isResizable){
var _caa=this.getProperty("resizable");
this.isResizable=_caa?_caa:DialogPageBinding.DEFAULT_RESIZABLE;
}
if(this.height=="auto"){
this.enableAutoHeightLayoutMode(true);
}
};
DialogPageBinding.prototype.enableAutoHeightLayoutMode=function(_cab){
if(_cab!=this.isAutoHeightLayoutMode){
if(_cab){
this.attachClassName("auto");
}else{
this.detachClassName("auto");
}
this.isAutoHeightLayoutMode=_cab;
}
};
DialogPageBinding.prototype.handleAction=function(_cac){
DialogPageBinding.superclass.handleAction.call(this,_cac);
var _cad=_cac.target;
switch(_cac.type){
case PageBinding.ACTION_ATTACHED:
if(_cad!=this&&_cad.isFitAsDialogSubPage){
_cad.makeDialogSubPage();
}
break;
case ButtonBinding.ACTION_COMMAND:
_cac.consume();
if(_cad.response!=null){
this.response=_cad.response;
switch(_cad.response){
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
DialogPageBinding.prototype._disableAcceptButton=function(_cae){
var _caf=this.bindingWindow.bindingMap.buttonAccept;
if(_caf){
_caf.setDisabled(_cae);
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
EditorPageBinding.prototype.handleAction=function(_cb7){
EditorPageBinding.superclass.handleAction.call(this,_cb7);
var _cb8=_cb7.target;
switch(_cb7.type){
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
var _cb9=-1;
this._messengers.each(function(page){
var res=page.bindingWindow==_cb8.bindingWindow;
if(res){
page.bindingWindow.DataManager.isDirty=false;
if(_cb9==-1){
_cb9=0;
}
}else{
_cb9++;
}
return res;
});
if(_cb9>-1){
this._messengers.del(_cb9);
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
if(!this.isDirty){
this.enableSave(true);
this.isDirty=true;
this.dispatchAction(EditorPageBinding.ACTION_DIRTY);
}
_cb7.consume();
break;
case Binding.ACTION_INVALID:
this.enableSave(false);
this._invalidBindings.set(_cb8.key,_cb8);
if(_cb8 instanceof FieldsBinding){
this._updateStatusBar();
}
break;
case Binding.ACTION_VALID:
this._invalidBindings.del(_cb8.key);
if(_cb8 instanceof FieldsBinding){
this._updateStatusBar();
}
if(!this._invalidBindings.hasEntries()){
this.enableSave(true);
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_cb8==this._tabBoxBinding){
if(this._windowBinding!=null){
var tab=_cb8.getSelectedTabBinding();
if(tab.getID()==EditorPageBinding.ID_PREVIEWTAB){
if(this._messengers.hasEntries()){
this._isWaitingForPreview=true;
}else{
this._isPreviewing=true;
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
_cb7.consume();
break;
case TabBoxBinding.ACTION_UNSELECTED:
if(_cb8==this._tabBoxBinding){
this.postMessage(EditorPageBinding.MESSAGE_PERSIST);
}
_cb7.consume();
break;
case WindowBinding.ACTION_LOADED:
if(_cb8==this._windowBinding){
if(this._isGeneratingPreview==true){
this._generatePreview();
this._isGeneratingPreview=false;
}
_cb7.consume();
}
break;
case WindowBinding.ACTION_ONLOAD:
if(_cb8==this._windowBinding){
if(_cb8.getContentWindow().isPostBackDocument!=true){
if(Client.isPrism){
Prism.enableCache();
}
var self=this;
setTimeout(function(){
Application.unlock(self);
},100);
if(EventBroadcaster.hasSubscribers(BroadcastMessages.XHTML_MARKUP_ON)){
var _cbe=WindowBinding.getMarkup(this._windowBinding);
if(_cbe!=null){
EventBroadcaster.broadcast(BroadcastMessages.XHTML_MARKUP_ON,_cbe);
}
}
}
}
break;
}
};
EditorPageBinding.prototype._saveEditorPage=function(){
if(Application.isDeveloperMode){
}
var _cbf=this.bindingWindow.bindingMap.__REQUEST;
if(this.validateAllDataBindings()){
this.bindingWindow.DataManager.isDirty=false;
_cbf.postback(EditorPageBinding.MESSAGE_SAVE);
}
};
EditorPageBinding.prototype._refresh=function(){
if(Application.isDeveloperMode){
}
this.postMessage(EditorPageBinding.MESSAGE_REFRESH);
};
EditorPageBinding.prototype.postMessage=function(_cc0){
this._message=null;
switch(_cc0){
case EditorPageBinding.MESSAGE_SAVE:
this._postMessageToDescendants(_cc0,this._messengers);
if(!this._messengers.hasEntries()){
this._saveEditorPage();
}else{
this._message=_cc0;
}
break;
case EditorPageBinding.MESSAGE_PERSIST:
this._message=_cc0;
EditorPageBinding.superclass.postMessage.call(this,_cc0,this._messengers);
break;
case EditorPageBinding.MESSAGE_REFRESH:
EditorPageBinding.superclass.postMessage.call(this,_cc0,this._messengers);
break;
}
};
EditorPageBinding.prototype.handleBroadcast=function(_cc1,arg){
EditorPageBinding.superclass.handleBroadcast.call(this,_cc1,arg);
switch(_cc1){
case BroadcastMessages.HIGHLIGHT_KEYWORDS:
var _cc3=arg;
if(UserInterface.isBindingVisible(this._windowBinding)){
WindowBinding.highlightKeywords(this._windowBinding,_cc3);
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
var _cc4=new List();
this._invalidBindings.each(function(key,_cc6){
var list=_cc6.getInvalidLabels();
if(list){
list.each(function(_cc8){
_cc4.add(_cc8);
});
}
});
if(_cc4.hasEntries()){
var _cc9="";
while(_cc4.hasNext()){
_cc9+=_cc4.getNext().toLowerCase();
if(_cc4.hasNext()){
_cc9+=", ";
}else{
_cc9+=".";
}
}
var _cca=StringBundle.getString("ui","Website.App.StatusBar.ErrorInField");
StatusBar.error(_cca+" "+_cc9);
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
EditorPageBinding.prototype.enableSave=function(_ccb){
var _ccc=this.bindingDocument.getElementById("broadcasterCanSave");
if(_ccc){
var _ccd=UserInterface.getBinding(_ccc);
if(_ccb){
_ccd.enable();
}else{
_ccd.disable();
}
}else{
throw new Error("A required BroadcasterBinding could not be located.");
}
};
EditorPageBinding.prototype.enableSaveAs=function(){
var _cce=this.bindingDocument.getElementById(EditorPageBinding.ID_SAVEASBUTTON);
if(_cce!=null){
UserInterface.getBinding(_cce).enable();
}
};
EditorPageBinding.prototype.handleInvalidData=function(){
this.logger.error("INVALID DATA :(");
};
EditorPageBinding.prototype._generatePreview=function(){
var _ccf=this._windowBinding.getContentDocument().title;
if(_ccf==WindowBinding.POSTBACK_TITLE){
if(this.validateAllDataBindings()==true){
this.manifestAllDataBindings();
var _cd0=this._tabBinding.getProperty("callbackid");
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_cd2){
if(_cd2.name=="__EVENTTARGET"&&_cd0){
_cd2.value=_cd0;
}
list.add({name:_cd2.name,value:_cd2.value});
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
WizardPageBinding.prototype.handleAction=function(_cd4){
WizardPageBinding.superclass.handleAction.call(this,_cd4);
var _cd5=_cd4.target;
switch(_cd4.type){
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_FINISH:
if(this.validateAllDataBindings()==true){
this.doPostBack(_cd5);
}else{
_cd4.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
this.doPostBack(_cd5);
break;
case Binding.ACTION_INVALID:
this._enableNextAndFinish(false);
_cd4.consume();
break;
case Binding.ACTION_VALID:
this._enableNextAndFinish(true);
_cd4.consume();
break;
}
};
WizardPageBinding.prototype._enableNextAndFinish=function(_cd6){
var next=this.bindingWindow.bindingMap.nextbutton;
var _cd8=this.bindingWindow.bindingMap.finishbutton;
if(next){
next.setDisabled(!_cd6);
}
if(_cd8){
_cd8.setDisabled(!_cd6);
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
MarkupAwarePageBinding.prototype.handleBroadcast=function(_cd9,arg){
MarkupAwarePageBinding.superclass.handleBroadcast.call(this,_cd9,arg);
var self=this;
switch(_cd9){
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
MarkupAwarePageBinding.prototype._handleMarkup=function(_cdd){
};
MarkupAwarePageBinding.prototype._activate=function(_cde){
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
SystemToolBarBinding.prototype.onBindingRegister=function(){
SystemToolBarBinding.superclass.onBindingRegister.call(this);
this.subscribe(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED);
this.subscribe(this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST);
this.subscribe(BroadcastMessages.INVOKE_DEFAULT_ACTION);
this.addActionListener(ButtonBinding.ACTION_COMMAND);
};
SystemToolBarBinding.prototype.onBindingInitialize=function(){
var _cdf=this.bindingWindow.bindingMap.moreactionstoolbargroup;
this._moreActionsWidth=_cdf.boxObject.getDimension().w;
_cdf.hide();
var _ce0=this.boxObject.getDimension().h;
this.bindingElement.style.height=_ce0+"px";
var self=this;
var _ce2=this.bindingWindow.bindingMap.moreactionsbutton;
_ce2.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_ce3){
self._showMoreActions();
_ce3.consume();
}});
var _ce4=this.bindingWindow.bindingMap.moreactionspopup;
_ce4.addActionListener(MenuItemBinding.ACTION_COMMAND,{handleAction:function(_ce5){
var item=_ce5.target;
self._handleSystemAction(item.associatedSystemAction);
}});
SystemToolBarBinding.superclass.onBindingInitialize.call(this);
};
SystemToolBarBinding.prototype.handleBroadcast=function(_ce7,arg){
SystemToolBarBinding.superclass.handleBroadcast.call(this,_ce7,arg);
switch(_ce7){
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
var _ceb=self.bindingWindow.bindingMap.moreactionstoolbargroup;
if(_ceb!=null){
_ceb.hide();
}
},0);
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
var _cec=this.bindingWindow.WindowManager;
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
var _ced=new String("");
this._actionProfile.each(function(_cee,list){
list.each(function(_cf0){
_ced+=_cf0.getHandle()+";";
});
});
return _ced;
};
SystemToolBarBinding.prototype.handleAction=function(_cf1){
SystemToolBarBinding.superclass.handleAction.call(this,_cf1);
switch(_cf1.type){
case ButtonBinding.ACTION_COMMAND:
var _cf2=_cf1.target;
this._handleSystemAction(_cf2.associatedSystemAction);
break;
}
};
SystemToolBarBinding.prototype._handleSystemAction=function(_cf3){
if(_cf3!=null){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _cf5=list.getFirst();
var _cf6=_cf5.node;
}
SystemAction.invoke(_cf3,_cf6);
}
};
SystemToolBarBinding.prototype.buildLeft=function(){
if(this.isInitialized&&this._actionProfile!=null&&this._actionProfile.hasEntries()){
var doc=this.bindingDocument;
var self=this;
this._actionProfile.each(function(_cf9,list){
var _cfb=new List();
list.reset();
while(list.hasNext()){
var _cfc=list.getNext();
var _cfd=null;
if(_cfc.isInToolBar()){
if(_cfc.isInFolder()){
alert("IsInFolder not implemented!");
}else{
_cfd=self.getToolBarButtonBinding(_cfc);
}
}
if(_cfd!=null){
_cfb.add(_cfd);
}
}
if(_cfb.hasEntries()){
var _cfe=ToolBarGroupBinding.newInstance(doc);
_cfb.each(function(_cff){
_cfe.add(_cff);
});
self.addLeft(_cfe);
}
});
this.attachRecursive();
this._containAllButtons();
}
};
SystemToolBarBinding.prototype._containAllButtons=function(){
var _d00=this.bindingWindow.bindingMap.toolsbutton;
var _d01=this.bindingWindow.bindingMap.moreactionstoolbargroup;
var _d02=_d00.bindingElement.offsetLeft-this._moreActionsWidth;
var _d03=0;
var _d04=new List();
var _d05,_d06=this._toolBarBodyLeft.getDescendantBindingsByLocalName("toolbarbutton");
while((_d05=_d06.getNext())!=null){
if(!_d05.isVisible){
_d05.show();
}
_d03+=_d05.boxObject.getDimension().w;
if(_d03>=_d02){
_d04.add(_d05);
_d05.hide();
}
}
if(_d04.hasEntries()){
var _d07=_d04.getFirst().bindingElement.parentNode;
UserInterface.getBinding(_d07).setLayout(ToolBarGroupBinding.LAYOUT_LAST);
this._moreActions=new List();
while((_d05=_d04.getNext())!=null){
this._moreActions.add(_d05.associatedSystemAction);
}
_d01.show();
}else{
this._moreActions=null;
_d01.hide();
}
};
SystemToolBarBinding.prototype._showMoreActions=function(){
if(this._moreActions!=null){
var _d08=this.bindingWindow.bindingMap.moreactionspopup;
_d08.empty();
while((action=this._moreActions.getNext())!=null){
var item=MenuItemBinding.newInstance(_d08.bindingDocument);
item.setLabel(action.getLabel());
item.setToolTip(action.getToolTip());
item.imageProfile=new ImageProfile({image:action.getImage(),imageDisabled:action.getDisabledImage()});
if(action.isDisabled()){
item.disable();
}
item.associatedSystemAction=action;
_d08.add(item);
}
_d08.attachRecursive();
this._moreActions=null;
}
};
SystemToolBarBinding.prototype.getToolBarButtonBinding=function(_d0a){
var _d0b=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _d0c=_d0a.getLabel();
var _d0d=_d0a.getToolTip();
var _d0e=_d0a.getImage();
var _d0f=_d0a.isDisabled();
if(_d0e&&_d0e.indexOf("size=")==-1){
_d0e=_d0e+"&size="+this.getImageSize();
_d0b.imageProfile=new ImageProfile({image:_d0e});
}
if(_d0c){
_d0b.setLabel(_d0c);
}
if(_d0d){
_d0b.setToolTip(_d0d);
}
if(_d0a.isDisabled()){
_d0b.disable();
}
_d0b.associatedSystemAction=_d0a;
return _d0b;
};
SystemToolBarBinding.prototype._invokeDefaultAction=function(){
var _d10=this.getDescendantBindingByLocalName("toolbarbutton");
if(_d10!=null){
_d10.fireCommand();
}
};
SystemToolBarBinding.newInstance=function(_d11){
var _d12=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_d11);
return UserInterface.registerBinding(_d12,SystemToolBarBinding);
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
SystemTreeBinding.prototype.add=function(_d13){
var _d14=SystemTreeBinding.superclass.add.call(this,_d13);
if(!this._defaultTreeNode){
if(_d13 instanceof SystemTreeNodeBinding){
this._defaultTreeNode=_d13;
}
}
return _d14;
};
SystemTreeBinding.prototype.handleAction=function(_d15){
SystemTreeBinding.superclass.handleAction.call(this,_d15);
var _d16=_d15.target;
switch(_d15.type){
case TreeNodeBinding.ACTION_ONFOCUS:
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
this._restorableFocusHandle=null;
this._handleSystemTreeFocus();
break;
case SystemTreeNodeBinding.ACTION_REFRESHED_YEAH:
if(this._refreshingTreeNodes.hasEntries()){
this._refreshingTreeNodes.del(_d16.key);
if(!this._refreshingTreeNodes.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this._refreshToken);
this._refreshToken=null;
this._attemptRestorableFocus();
}
}
_d15.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
case TreeNodeBinding.ACTION_BLUR:
var self=this;
setTimeout(function(){
if(!self._focusedTreeNodeBindings.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,null);
}
},0);
if(_d15.type==TreeNodeBinding.ACTION_BLUR){
this._restorableFocusHandle=_d16.getHandle();
}
break;
case TreeNodeBinding.ACTION_COMMAND:
EventBroadcaster.broadcast(BroadcastMessages.INVOKE_DEFAULT_ACTION);
_d15.consume();
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
var _d18=this._treeNodeBindings.get(this._restorableFocusHandle);
this.focusSingleTreeNodeBinding(_d18);
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
SystemTreeBinding.prototype.registerTreeNodeBinding=function(_d19){
SystemTreeBinding.superclass.registerTreeNodeBinding.call(this,_d19);
var reg=this._entityTokenRegistry;
var _d1b=_d19.node.getEntityToken();
if(reg.has(_d1b)){
reg.get(_d1b).add(_d19);
}else{
reg.set(_d1b,new List([_d19]));
}
var _d1c=null;
if(this.isLockedToEditor){
if(_d1b==StageBinding.entityToken){
if(_d19.node.isTreeLockEnabled()){
_d1c=_d19;
}
}
}else{
if(this._backupfocushandle!=null){
if(this._backupfocushandle==_d19.node.getHandle()){
_d1c=_d19;
}
}
}
if(_d1c!=null){
this.focusSingleTreeNodeBinding(_d1c);
}
};
SystemTreeBinding.prototype.unRegisterTreeNodeBinding=function(_d1d){
SystemTreeBinding.superclass.unRegisterTreeNodeBinding.call(this,_d1d);
var reg=this._entityTokenRegistry;
var _d1f=_d1d.node.getEntityToken();
if(reg.has(_d1f)){
var list=reg.get(_d1f);
list.del(_d1d);
if(!list.hasEntries()){
reg.del(_d1f);
}
}else{
this.logger.fatal("SystemTreeBinding out of synch: unRegisterTreeNodeBinding");
if(Application.isDeveloperMode){
Dialog.error("Attention Developer","Tree is out of synch. Please reproduce this bug and file a report.");
}
}
if(!this.isLockedToEditor){
if(_d1d.isFocused&&this._backupfocushandle==null){
this._backupfocushandle=_d1d.node.getHandle();
var self=this;
setTimeout(function(){
self._backupfocushandle=null;
},200);
}
}
};
SystemTreeBinding.prototype._computeClipboardSetup=function(){
var _d22=false;
var _d23=this.getFocusedTreeNodeBindings();
if(_d23.hasEntries()){
_d22=true;
while(_d22&&_d23.hasNext()){
var _d24=_d23.getNext();
if(!_d24.isDraggable){
_d22=false;
}
}
}
SystemTreePopupBinding.isCutAllowed=_d22;
};
SystemTreeBinding.prototype._computeRefreshSetup=function(){
SystemTreePopupBinding.isRefreshAllowed=SystemTreeBinding.clipboard===null;
};
SystemTreeBinding.prototype.handleBroadcast=function(_d25,arg){
SystemTreeBinding.superclass.handleBroadcast.call(this,_d25,arg);
switch(_d25){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
if(arg!=null||this.isFocused){
this._handleCommandBroadcast(_d25,arg);
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
if(this.isFocused){
this._handleCommandBroadcast(_d25);
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
var _d29=tab.perspectiveNode==null;
if(!_d29){
_d29=tab.perspectiveNode==this.perspectiveNode;
}
if(_d29){
var self=this,_d2b=tab.getEntityToken();
setTimeout(function(){
if(_d2b==null){
self.blurSelectedTreeNodes();
}else{
self._focusTreeNodeByEntityToken(_d2b);
}
},250);
}
};
SystemTreeBinding.prototype._focusTreeNodeByEntityToken=function(_d2c,_d2d){
this.isLockFeatureFocus=true;
var _d2e=null;
if(this._entityTokenRegistry.has(_d2c)){
var list=this._entityTokenRegistry.get(_d2c);
list.each(function(tn){
var _d31=true;
if(tn.node.isTreeLockEnabled()){
_d2e=tn;
_d31=false;
}
return _d31;
});
if(_d2e!=null){
if(!_d2e.isFocused){
this.focusSingleTreeNodeBinding(_d2e,true);
}else{
_d2e.dispatchAction(TreeNodeBinding.ACTION_FOCUSED);
}
}
}
this.isLockFeatureFocus=false;
if(_d2e==null&&_d2d!=true){
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._fetchTreeForEntityToken(_d2c);
self._focusTreeNodeByEntityToken(_d2c,true);
}
Application.unlock(self);
StatusBar.clear();
},0);
}
};
SystemTreeBinding.prototype._fetchTreeForEntityToken=function(_d33){
var _d34=StageBinding.perspectiveNode.getEntityToken();
var _d35=this.getOpenSystemNodes();
var map=System.getInvisibleBranch(_d34,_d33,_d35);
if(map==null){
this.isLockedToEditor=false;
if(Application.isDeveloperMode){
Dialog.warning("Ouch!","Because the web service failed, tree has disabled the lock-tree-to-editor "+"feature. Otherwise, re-focus would fire the error indefinitely. Please try again.");
}
}else{
if(map.hasEntries()){
var self=this;
var _d38=this._treeNodeBindings;
var _d39=new Map();
function fix(_d3a,list){
if(!_d3a.hasBeenOpened){
if(list.hasEntries()){
list.each(function(node){
if(!_d38.has(node.getHandle())){
var _d3d=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
_d39.set(node.getHandle(),_d3d);
_d3a.add(_d3d);
}
});
_d3a.attachRecursive();
}
}
_d3a.open(true);
}
map.each(function(_d3e,list){
if(_d38.has(_d3e)){
var _d40=_d38.get(_d3e);
fix(_d40,list);
}else{
if(_d39.has(_d3e)){
var _d41=_d39.get(_d3e);
fix(_d41,list);
}else{
}
}
});
}
}
};
SystemTreeBinding.prototype._handleCommandBroadcast=function(_d42,arg){
switch(_d42){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _d44=arg;
if(_d44!=null){
this._invokeServerRefresh(_d44);
}else{
this._invokeManualRefresh();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
if(SystemTreeBinding.clipboard!=null){
SystemTreeBinding.clipboard.hideDrag();
}
var _d45=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_CUT;
SystemTreeBinding.clipboard=_d45;
_d45.showDrag();
break;
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
var _d45=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_COPY;
SystemTreeBinding.clipboard=_d45;
break;
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
this._handlePaste();
break;
}
};
SystemTreeBinding.prototype._invokeServerRefresh=function(_d46){
if(this._entityTokenRegistry.has(_d46)){
var list=this._entityTokenRegistry.get(_d46).reset();
this._refreshToken=_d46;
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this._refreshToken);
while(list.hasNext()){
var _d48=list.getNext();
this._refreshingTreeNodes.set(_d48.key,true);
setTimeout(function(){
_d48.refresh(true);
},0);
}
}
};
SystemTreeBinding.prototype._invokeManualRefresh=function(){
var _d49=this.getFocusedTreeNodeBindings().getFirst();
if(_d49){
var _d4a=_d49.getLabel();
var _d4b=_d49.getAncestorBindingByLocalName("treenode");
if(_d4b){
_d49=_d4b;
}
this._refreshToken=null;
this._refreshingTreeNodes.set(_d49.key,true);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,null);
if(!StatusBar.state){
var _d4c=StringBundle.getString("ui","Website.App.StatusBar.Refreshing");
StatusBar.busy(_d4c,[_d4a]);
}
_d49.refresh();
}
};
SystemTreeBinding.prototype._handlePaste=function(){
var _d4d=SystemTreeBinding.clipboard;
if(_d4d){
var type=_d4d.dragType;
var _d4f=this.getFocusedTreeNodeBindings().getFirst();
if(_d4f.dragAccept){
if(_d4f.acceptor.isAccepting(type)){
this._performPaste(_d4f);
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteTypeNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteTypeNotAllowed"));
}
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteNotAllowed"));
}
}
};
SystemTreeBinding.prototype._performPaste=function(_d50){
var self=this;
function update(){
MessageQueue.update();
Application.unlock(self);
}
if(_d50.node.hasDetailedDropSupport()){
if(_d50.node.hasChildren()){
var _d52=_d50.node.getChildren();
Dialog.invokeModal(SystemTreeBinding.URL_DIALOG_DETAILEDPASTE,{handleDialogResponse:function(_d53,_d54){
if(_d53==Dialog.RESPONSE_ACCEPT){
Application.lock(self);
var _d55=_d54.get("switch");
var _d56=_d54.get("sibling");
if(_d55=="after"){
_d56++;
}
var _d57=_d50.accept(SystemTreeBinding.clipboard,_d56);
if(_d57){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}},_d52);
}else{
Application.lock(self);
var _d58=_d50.accept(SystemTreeBinding.clipboard,0);
if(_d58){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}else{
Application.lock(self);
var _d58=_d50.accept(SystemTreeBinding.clipboard,0);
if(_d58){
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
SystemTreeBinding.prototype.collapse=function(_d59){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,null);
if(_d59){
this.blurSelectedTreeNodes();
var _d5a=this.getRootTreeNodeBindings();
_d5a.each(function(_d5b){
if(_d5b.isContainer&&_d5b.isOpen){
_d5b.close();
_d5b.hasBeenOpened=false;
_d5b.empty();
}
});
}else{
SystemTreeBinding.superclass.collapse.call(this);
}
};
SystemTreeBinding.prototype.setLockToEditor=function(_d5c){
if(_d5c!=this.isLockedToEditor){
this.isLockedToEditor=_d5c;
if(_d5c){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
}
};
SystemTreeBinding.prototype.getOpenSystemNodes=function(){
var list=new List([StageBinding.perspectiveNode]);
var _d5e=this.getRootTreeNodeBindings();
_d5e.each(function(_d5f){
var _d60=_d5f.getOpenSystemNodes();
if(_d60!=null&&_d60.hasEntries()){
list.merge(_d60);
}
});
return list;
};
SystemTreeBinding.prototype.focusSingleTreeNodeBinding=function(_d61){
SystemTreeBinding.superclass.focusSingleTreeNodeBinding.call(this,_d61);
if(_d61!=null){
this._handleSystemTreeFocus();
}
};
SystemTreeBinding.prototype.getCompiledActionProfile=function(){
var temp={};
var _d63=new Map();
var _d64=this.getFocusedTreeNodeBindings();
_d63=_d64.getFirst().node.getActionProfile();
return _d63;
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
SystemTreePopupBinding.prototype.handleBroadcast=function(_d65,arg){
SystemTreePopupBinding.superclass.handleBroadcast.call(this,_d65,arg);
switch(_d65){
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
var _d6a=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_PASTE);
cut.setDisabled(!SystemTreePopupBinding.isCutAllowed);
copy.setDisabled(!SystemTreePopupBinding.isCutAllowed);
_d6a.setDisabled(SystemTreeBinding.clipboard==null);
};
SystemTreePopupBinding.prototype._setupRefreshItem=function(){
var _d6b=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_REFRESH);
_d6b.setDisabled(!SystemTreePopupBinding.isRefreshAllowed);
};
SystemTreePopupBinding.prototype.handleAction=function(_d6c){
SystemTreePopupBinding.superclass.handleAction.call(this,_d6c);
switch(_d6c.type){
case MenuItemBinding.ACTION_COMMAND:
var _d6d=_d6c.target;
var _d6e=_d6d.associatedSystemAction;
if(_d6e){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _d70=list.getFirst();
var _d71=_d70.node;
}
SystemAction.invoke(_d6e,_d71);
}else{
var cmd=_d6d.getProperty("cmd");
if(cmd){
this._handleCommand(cmd);
}
}
break;
}
};
SystemTreePopupBinding.prototype._handleCommand=function(cmd){
var _d74=null;
switch(cmd){
case SystemTreePopupBinding.CMD_CUT:
_d74=BroadcastMessages.SYSTEMTREEBINDING_CUT;
break;
case SystemTreePopupBinding.CMD_COPY:
_d74=BroadcastMessages.SYSTEMTREEBINDING_COPY;
break;
case SystemTreePopupBinding.CMD_PASTE:
_d74=BroadcastMessages.SYSTEMTREEBINDING_PASTE;
break;
case SystemTreePopupBinding.CMD_REFRESH:
_d74=BroadcastMessages.SYSTEMTREEBINDING_REFRESH;
break;
}
if(_d74){
setTimeout(function(){
EventBroadcaster.broadcast(_d74);
},0);
}
};
SystemTreePopupBinding.prototype.disposeContent=function(){
var _d75=new List(DOMUtil.getElementsByTagName(this.bindingElement,"menugroup"));
while(_d75.hasNext()){
var _d76=UserInterface.getBinding(_d75.getNext());
if(!_d76.getProperty("rel")){
_d76.dispose();
}
}
};
SystemTreePopupBinding.prototype.constructContent=function(){
if(this._actionProfile!=null){
var doc=this.bindingDocument;
var _d78=new List();
var self=this;
this._actionProfile.each(function(_d7a,list){
var _d7c=MenuGroupBinding.newInstance(doc);
list.each(function(_d7d){
var _d7e=self.getMenuItemBinding(_d7d);
_d7c.add(_d7e);
});
_d78.add(_d7c);
});
_d78.reverse();
while(_d78.hasNext()){
this._bodyBinding.addFirst(_d78.getNext());
}
this._bodyBinding.attachRecursive();
}
};
SystemTreePopupBinding.prototype.getMenuItemBinding=function(_d7f){
var _d80=MenuItemBinding.newInstance(this.bindingDocument);
var _d81=_d7f.getLabel();
var _d82=_d7f.getToolTip();
var _d83=_d7f.getImage();
var _d84=_d7f.getDisabledImage();
var _d85=_d7f.isCheckBox();
if(_d81){
_d80.setLabel(_d81);
}
if(_d82){
_d80.setToolTip(_d82);
}
if(_d83){
_d80.imageProfile=new ImageProfile({image:_d83,imageDisabled:_d84});
}
if(_d85){
_d80.setType(MenuItemBinding.TYPE_CHECKBOX);
if(_d7f.isChecked()){
_d80.check(true);
}
}
if(_d7f.isDisabled()){
_d80.disable();
}
_d80.associatedSystemAction=_d7f;
return _d80;
};
SystemTreePopupBinding.prototype.snapToMouse=function(e){
var node=e.target?e.target:e.srcElement;
var name=DOMUtil.getLocalName(node);
var _d89=null;
if(name!="tree"){
switch(name){
case "treenode":
break;
default:
node=DOMUtil.getAncestorByLocalName("treenode",node);
if(node!=null){
_d89=UserInterface.getBinding(node);
if(_d89.isDisabled){
_d89=null;
}
}
break;
}
if(_d89!=null&&_d89.node!=null&&_d89.node.getActionProfile()!=null){
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
var _d8a=this.node.getLabel();
if(_d8a){
this.setLabel(_d8a);
}
var _d8b=this.node.getToolTip();
if(_d8b){
this.setToolTip(_d8b);
}
var _d8c=this.node.getHandle();
if(_d8c){
this.setHandle(_d8c);
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
var _d8f="";
var list=this.node.getDragAccept();
while(list.hasNext()){
_d8f+=list.getNext();
if(list.hasNext()){
_d8f+=" ";
}
}
this.setProperty("dragaccept",_d8f);
}
SystemTreeNodeBinding.superclass._initializeBindingDragAndDropFeatures.call(this);
};
SystemTreeNodeBinding.prototype.handleAction=function(_d91){
SystemTreeNodeBinding.superclass.handleAction.call(this,_d91);
switch(_d91.type){
case SystemTreeNodeBinding.ACTION_REFRESHED:
if(_d91.target==this){
if(!this.isOpen){
this.hasBeenOpened=false;
_d91.consume();
}
}
break;
}
};
SystemTreeNodeBinding.prototype.handleBroadcast=function(_d92,arg){
SystemTreeNodeBinding.superclass.handleBroadcast.call(this,_d92,arg);
switch(_d92){
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
var _d95=null;
var _d96=this.node.getImageProfile();
if(_d96){
if(this.isOpen){
_d95=_d96.getActiveImage();
}else{
_d95=_d96.getDefaultImage();
}
}
if(!_d95){
_d95=SystemTreeNodeBinding.superclass.computeImage.call(this);
}
return _d95;
};
SystemTreeNodeBinding.prototype.open=function(_d97){
var _d98=this.isContainer&&!this.isOpen;
var _d99=!this.hasBeenOpened;
SystemTreeNodeBinding.superclass.open.call(this);
if(_d98&&(_d99||SystemTreeBinding.HAS_NO_MEMORY)&&_d97!=true){
this.refresh();
if(this._isForcedOpen){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN,this);
this._isForcedOpen=false;
}
}
};
SystemTreeNodeBinding.prototype.refresh=function(){
var _d9a=null;
if(this.isContainer){
_d9a=this.getOpenSystemNodes();
}
this.isRefreshing=true;
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._performRefresh(_d9a);
Application.unlock(self);
StatusBar.clear();
}
},0);
};
SystemTreeNodeBinding.prototype._performRefresh=function(_d9c){
if(_d9c!=null){
this._refreshBranch(_d9c);
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
var _d9d=new List();
var _d9e=this.node.getChildren();
this.empty();
if(_d9e.hasEntries()){
this._insertTreeNodesRegulated(_d9e);
}
};
SystemTreeNodeBinding.prototype._insertTreeNodesRegulated=function(_d9f){
var _da0=0;
while(_d9f.hasEntries()&&_da0<=SystemTreeNodeBinding.MAX_CHILD_IMPORT){
var _da1=SystemTreeNodeBinding.newInstance(_d9f.extractFirst(),this.bindingDocument);
this.add(_da1);
_da1.attach();
_da0++;
}
if(_d9f.hasEntries()){
this._insertBufferTreeNode(_d9f);
}
};
SystemTreeNodeBinding.prototype._insertBufferTreeNode=function(_da2){
alert("Max treenode count reached. This is not handled!");
alert("TODO: SystemTreeNodeBinding#._insertBufferTreeNode");
};
SystemTreeNodeBinding.prototype._refreshBranch=function(list){
var _da4=this.node.getDescendantBranch(list);
if(_da4.hasEntries()){
this.XXX(_da4);
}
};
SystemTreeNodeBinding.prototype.XXX=function(_da5){
var self=this;
var map=new Map();
this.empty();
_da5.each(function(key,_da9){
if(_da9.hasEntries()){
_da9.each(function(node){
var _dab=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_dab);
if(map.has(key)){
var _dac=map.get(key);
_dac.add(_dab);
_dac.isOpen=true;
_dac.hasBeenOpened=true;
}else{
if(key==self.node.getHandle()){
self.add(_dab);
}else{
}
}
});
}
});
this.attachRecursive();
_da5.dispose();
map.dispose();
};
SystemTreeNodeBinding.prototype.getOpenDescendants=function(){
var _dad=new TreeCrawler();
var _dae=new List();
_dad.mode=TreeCrawler.MODE_GETOPEN;
_dad.crawl(this.bindingElement,_dae);
if(_dae.hasEntries()){
_dae.extractFirst();
}
_dad.dispose();
return _dae;
};
SystemTreeNodeBinding.prototype.getOpenSystemNodes=function(){
var _daf=null;
var list=this.getOpenDescendants();
if(list.hasEntries()){
_daf=new List([this.node]);
list.each(function(_db1){
_daf.add(_db1.node);
});
}
return _daf;
};
SystemTreeNodeBinding.prototype.updateClassNames=function(){
if(!this.isRefreshing){
SystemTreeNodeBinding.superclass.updateClassNames.call(this);
}
};
SystemTreeNodeBinding.prototype.acceptTreeNodeBinding=function(_db2,_db3){
var _db4=(SystemTreeBinding.clipboardOperation==SystemTreePopupBinding.CMD_COPY);
if(_db2 instanceof SystemTreeNodeBinding){
if(TreeService.ExecuteDropElementAction){
TreeService.ExecuteDropElementAction(_db2.node.getData(),this.node.getData(),_db3?_db3:this.containingTreeBinding.getDropIndex(),Application.CONSOLE_ID,_db4);
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
SystemTreeNodeBinding.newInstance=function(node,_db8){
var _db9=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_db8);
var _dba=UserInterface.registerBinding(_db9,SystemTreeNodeBinding);
_dba.node=node;
return _dba;
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
SystemPageBinding.prototype.setPageArgument=function(_dbb){
this.node=_dbb;
SystemPageBinding.superclass.setPageArgument.call(this,_dbb);
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
var _dbc=this.node.getChildren();
if(_dbc.hasEntries()){
while(_dbc.hasNext()){
var node=SystemTreeNodeBinding.newInstance(_dbc.getNext(),this.bindingDocument);
this._tree.add(node);
node.attach();
}
}
};
SystemPageBinding.prototype._refreshTree=function(){
var _dbe=this._tree._treeBodyBinding.getChildBindingsByLocalName("treenode");
_dbe.each(function(root){
if(!root.isContainer){
root.isOpen=true;
}
});
var _dc0=new TreeCrawler();
var _dc1=new List();
_dc0.mode=TreeCrawler.MODE_GETOPEN;
_dc0.crawl(this.bindingElement,_dc1);
_dc0.dispose();
var list=new List([this.node]);
_dc1.each(function(_dc3){
list.add(_dc3.node);
});
this._tree.empty();
var _dc4=this.node.getDescendantBranch(list);
if(_dc4.hasEntries()){
var self=this;
var map=new Map();
_dc4.each(function(key,_dc8){
_dc8.each(function(node){
var _dca=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_dca);
if(map.has(key)){
var _dcb=map.get(key);
_dcb.add(_dca);
_dcb.isOpen=true;
}else{
if(key==self.node.getHandle()){
self._tree.add(_dca);
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
SystemPageBinding.prototype.handleAction=function(_dcc){
SystemPageBinding.superclass.handleAction.call(this,_dcc);
switch(_dcc.type){
case ButtonBinding.ACTION_COMMAND:
var _dcd=_dcc.target;
switch(_dcd.getID()){
case "locktreebutton":
this._tree.setLockToEditor(_dcd.isChecked);
break;
case "collapsebutton":
this._tree.collapse();
break;
}
break;
}
};
SystemPageBinding.prototype.handleBroadcast=function(_dce,arg){
SystemPageBinding.superclass.handleBroadcast.call(this,_dce,arg);
switch(_dce){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _dd0=arg;
if(this.node&&this.node.getEntityToken()==_dd0){
try{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,_dd0);
var self=this;
Application.lock(this);
setTimeout(function(){
self._refreshTree();
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,_dd0);
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
StageContainerBinding.prototype.handleBroadcast=function(_dd2,arg){
StageContainerBinding.superclass.handleBroadcast.call(this,_dd2,arg);
var _dd4=this.bindingWindow.WindowManager;
switch(_dd2){
case BroadcastMessages.APPLICATION_OPERATIONAL:
this.subscribe(_dd4.WINDOW_RESIZED_BROADCAST);
this._fit();
this.reflex();
break;
case _dd4.WINDOW_RESIZED_BROADCAST:
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
var _dd6=this.bindingWindow.WindowManager;
this.bindingElement.style.width=_dd6.getWindowDimensions().w+"px";
};
StageBinding.prototype=new FocusBinding;
StageBinding.prototype.constructor=StageBinding;
StageBinding.superclass=FocusBinding.prototype;
StageBinding.bindingInstance=null;
StageBinding.perspectiveNode=null;
StageBinding.entityToken=null;
StageBinding.handleViewPresentation=function(_dd7){
if(StageBinding.isViewOpen(_dd7)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_dd7);
}else{
var _dd8=ViewDefinitions[_dd7];
StageBinding.presentViewDefinition(_dd8);
}
};
StageBinding.isViewOpen=function(_dd9){
return StageBinding.bindingInstance._activeViewDefinitions[_dd9]!=null;
};
StageBinding.presentViewDefinition=function(_dda){
if(_dda.label!=null){
var _ddb=StringBundle.getString("ui","Website.App.StatusBar.Opening");
StatusBar.busy(_ddb,[_dda.label]);
}else{
StatusBar.busy();
}
StageBinding.bindingInstance._presentViewDefinition(_dda);
};
function StageBinding(){
this.logger=SystemLogger.getLogger("StageBinding");
this._activeViewDefinitions={};
this._decksBinding=null;
this._explorerBinding=null;
this._isStageReady=false;
this._isExplorerReady=false;
this._isDecksReady=false;
this._dockBindings={};
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,{handleBroadcast:function(_ddd,arg){
if(arg==root.getEntityToken()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
}
}});
var _ddf=System.getPerspectiveNodes();
if(_ddf.hasEntries()){
this._initializeSystemViewDefinitions(_ddf);
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
var _de1=null;
if(LocalStore.isEnabled){
_de1=LocalStore.getProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE);
}
if(_de1&&ViewDefinitions[_de1]){
alert("StageBinding#_initializeWorkbenchLayout !!!!");
this._explorerBinding.setSelectionByHandle(unescape(_de1));
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
var _de3=root.getActionProfile();
if(_de3&&_de3.hasEntries()){
var _de4=top.app.bindingMap.toolsmenugroup;
if(_de4){
_de3.each(function(_de5,list){
list.each(function(_de7){
var item=MenuItemBinding.newInstance(_de4.bindingDocument);
item.setLabel(_de7.getLabel());
item.setToolTip(_de7.getToolTip());
item.setImage(_de7.getImage());
item.setDisabled(_de7.isDisabled());
item.associatedSystemAction=_de7;
var _de9=_de4;
var tag=_de7.getTag();
if(tag!=null){
switch(tag){
case SystemAction.TAG_CHANGEFROMLANGUAGE:
_de9=top.app.bindingMap.translationsmenugroup;
break;
}
}
_de9.add(item);
});
});
_de4.attachRecursive();
}
}
};
StageBinding.prototype._initializeSystemViewDefinitions=function(_deb){
while(_deb.hasNext()){
var node=_deb.getNext();
var _ded=node.getHandle();
ViewDefinitions[_ded]=new SystemViewDefinition(node);
}
};
StageBinding.prototype.handleAction=function(_dee){
StageBinding.superclass.handleAction.call(this,_dee);
var _def=_dee.target;
switch(_dee.type){
case StageDecksBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._decksBinding=_def;
this._inflateBinding(_def);
_dee.consume();
break;
case ExplorerBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._explorerBinding=_def;
this._inflateBinding(_def);
_dee.consume();
break;
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
if(!Application.isOperational){
ProgressBarBinding.notch(5);
}
this.handlePerspectiveChange(_def);
_dee.consume();
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_def instanceof DockBinding){
switch(_def.reference){
case DockBinding.START:
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
this._dockBindings[_def.reference]=_def;
break;
}
this.handleAttachedDock(_def);
_dee.consume();
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_def instanceof DockBinding){
this.handleSelectedDockTab(_def.getSelectedTabBinding());
_dee.consume();
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
_dee.consume();
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
_dee.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_dee);
};
StageBinding.prototype.handleBroadcast=function(_df1,arg){
StageBinding.superclass.handleBroadcast.call(this,_df1,arg);
switch(_df1){
case BroadcastMessages.VIEW_OPENED:
Application.unlock(this);
break;
case BroadcastMessages.VIEW_CLOSED:
var _df3=arg;
this._dontView(_df3);
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
StageBinding.prototype._showStart=function(_df5){
if(_df5!=this._isShowingStart){
var view=ViewBinding.getInstance("Composite.Management.Start");
var dock=this._dockBindings[DockBinding.START];
var _df8=this.bindingWindow.bindingMap.maindecks;
if(_df5){
_df8.select("startdeck");
view.show();
}else{
view.hide();
_df8.select("stagedeck");
if(dock!=null&&dock.isActive){
dock.deActivate();
}
}
this._isShowingStart=_df5;
}
};
StageBinding.prototype._inflateBinding=function(_df9){
for(var _dfa in ViewDefinitions){
var _dfb=ViewDefinitions[_dfa];
if(_dfb instanceof SystemViewDefinition){
_df9.mountDefinition(_dfb);
}
}
var _dfc=(this._decksBinding&&this._explorerBinding);
if(_dfc){
var self=this;
setTimeout(function(){
self._renameThisMethod();
},0);
}
};
StageBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _dff=new StageCrawler();
_dff.mode=mode;
_dff.crawl(this.bindingElement);
_dff.dispose();
};
StageBinding.prototype.handlePerspectiveChange=function(_e00){
var _e01=_e00.getSelectionHandle();
this._decksBinding.setSelectionByHandle(_e01);
if(LocalStore.isEnabled){
LocalStore.setProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE,escape(_e01));
}
};
StageBinding.prototype.handleAttachedDock=function(_e02){
var _e03=_e02.getTabBindings();
if(_e03.hasEntries()){
while(_e03.hasNext()){
var _e04=_e03.getNext();
var _e05=_e04.getHandle();
if(_e05){
if(_e05=="Composite.Management.Start"&&(!Application.hasStartPage||!Application.hasExternalConnection)){
}else{
var _e06=ViewDefinitions[_e05];
if(_e06){
this._view(_e02,_e04,_e06,false);
}else{
alert("StageBinding: no such predefined viewdefinition ("+_e05+")");
}
}
}
}
}
};
StageBinding.prototype._presentViewDefinition=function(_e07){
var _e08=null;
switch(_e07.position){
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
_e08=this._dockBindings[_e07.position];
break;
case Dialog.MODAL:
_e08=app.bindingMap.masterdialogset.getModalInstance();
break;
case Dialog.NON_MODAL:
_e08=app.bindingMap.masterdialogset.getInstance();
break;
default:
var _e09=this._decksBinding.getSelectedDeckBinding();
_e08=_e09.getDockBindingByReference(_e07.position);
if(this._isShowingStart){
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}else{
if(this._isShowingDefaultStart){
var _e0a=this.bindingWindow.bindingMap.maindecks;
_e0a.select("stagedeck");
this._isShowingDefaultStart=false;
}
}
break;
}
if(_e08!=null){
this._view(_e08,null,_e07,true);
}else{
throw "StageBinding: Could not position view: "+_e07.handle;
}
};
StageBinding.prototype._view=function(_e0b,_e0c,_e0d,_e0e){
var _e0f=_e0d.handle;
if(_e0d.isMutable){
_e0f+=KeyMaster.getUniqueKey();
}
if(this._activeViewDefinitions[_e0f]){
var _e10=ViewBinding.getInstance(_e0f);
if(_e10!=null){
_e10.update();
}else{
this.logger.error("Could not update ViewBinding (declared open): \n"+_e0f);
}
}else{
this._activeViewDefinitions[_e0f]=_e0d;
Application.lock(this);
switch(_e0b.constructor){
case DockBinding:
if(_e0e){
_e0b.prepareNewView(_e0d);
}else{
_e0b.prepareOpenView(_e0d,_e0c);
}
break;
case StageDialogBinding:
if(_e0e){
_e0b.prepareNewView(_e0d);
}
break;
}
}
};
StageBinding.prototype._dontView=function(_e11){
if(this._activeViewDefinitions[_e11]!=null){
delete this._activeViewDefinitions[_e11];
}else{
this.logger.debug("Could not unregister active view: "+_e11);
}
};
StageBinding.prototype.handleSelectedDockTab=function(_e12){
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
this.addFilter(function(_e14){
var _e15=UserInterface.getBinding(_e14);
var _e16=null;
if(_e15){
switch(_e15.constructor){
case StageSplitBoxBinding:
case StageSplitPanelBinding:
case StageSplitterBinding:
switch(self.mode){
case StageCrawler.MODE_MAXIMIZE:
_e15.handleMaximization();
break;
case StageCrawler.MODE_UNMAXIMIZE:
_e15.handleUnMaximization();
break;
}
break;
case DockBinding:
_e16=NodeCrawler.SKIP_NODE;
break;
}
}
return _e16;
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
var _e17=null;
this._dialogs.each(function(_e18){
if(!_e18.isVisible){
_e17=_e18;
}
return _e17!=null;
});
if(!_e17){
this._newInstance();
_e17=this._dialogs.getLast();
}
_e17.setModal(false);
return _e17;
};
StageDialogSetBinding.prototype.getModalInstance=function(){
var _e19=this.getInstance();
_e19.setModal(true);
return _e19;
};
StageDialogSetBinding.prototype._newInstance=function(){
var _e1a=this.add(StageDialogBinding.newInstance(this.bindingDocument));
this._dialogs.add(_e1a);
_e1a.attach();
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
StageDialogBinding.prototype.prepareNewView=function(_e1b){
if(_e1b instanceof DialogViewDefinition){
var _e1c=ViewBinding.newInstance(this.bindingDocument);
_e1c.setDefinition(_e1b);
_e1c.setType(ViewBinding.TYPE_DIALOGVIEW);
if(_e1b.handler){
if(Interfaces.isImplemented(IDialogResponseHandler,_e1b.handler)){
this._dialogResponseHandler=_e1b.handler;
}else{
throw "IDialogResponseHandler not implemented";
}
}
this._viewBinding=_e1c;
this._body.add(_e1c);
_e1c.attach();
_e1c.initialize();
}
};
StageDialogBinding.prototype.handleAction=function(_e1d){
StageDialogBinding.superclass.handleAction.call(this,_e1d);
var _e1e=_e1d.target;
switch(_e1d.type){
case PageBinding.ACTION_INITIALIZED:
this._handleInitializedPageBinding(_e1e);
_e1d.consume();
break;
case PageBinding.ACTION_DETACHED:
if(_e1e.bindingDocument==this._viewBinding.getContentDocument()){
this._pageBinding=null;
}
_e1d.consume();
break;
case DialogPageBinding.ACTION_RESPONSE:
if(_e1e.response){
this._handleDialogPageResponse(_e1e);
}
_e1d.consume();
break;
case Binding.ACTION_INVALID:
this._disableDialogAcceptButton(true);
_e1d.consume();
break;
case Binding.ACTION_VALID:
this._disableDialogAcceptButton(false);
_e1d.consume();
break;
case ViewBinding.ACTION_ONCLOSE:
this.close();
_e1e.dispose();
_e1d.consume();
break;
case ViewBinding.ACTION_CLOSED:
this._isFirstPage=true;
_e1d.consume();
break;
case ErrorBinding.ACTION_INITIALIZE:
_e1d.consume();
break;
case PageBinding.ACTION_UPDATING:
this._isUpdating=true;
_e1d.consume();
break;
case PageBinding.ACTION_UPDATED:
if(this._isUpdating){
this._isUpdating=false;
this._fit();
}
_e1d.consume();
break;
case Binding.ACTION_UPDATED:
if(!this._isUpdating){
this._fit();
}
_e1d.consume();
break;
case DialogBinding.ACTION_CLOSE:
if(_e1e==this){
this._viewBinding.dispose();
this.defaultSetup();
}
break;
}
};
StageDialogBinding.prototype.handleBroadcast=function(_e1f,arg){
StageDialogBinding.superclass.handleBroadcast.call(this,_e1f,arg);
switch(_e1f){
case BroadcastMessages.KEY_ESCAPE:
if(this.isVisible==true){
if(!PopupBinding.hasActiveInstances()){
this._defaultClose();
}
}
break;
}
};
StageDialogBinding.prototype._fit=function(_e21){
var _e22=new FitnessCrawler();
var list=new List();
if(_e21){
_e22.mode=FitnessCrawler.MODE_BRUTAL;
}
_e22.crawl(this.bindingElement,list);
_e22.dispose();
if(list.hasEntries()){
list.reverse();
list.each(function(_e24){
_e24.fit(_e21);
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
var _e25=this.getDimension().h;
this.reflex(true);
var self=this;
if(this.getDimension().h==_e25){
var self=this;
setTimeout(function(){
self.reflex(true);
},0);
}
}
};
StageDialogBinding.prototype._handleContextMenuItemBinding=function(_e27){
var cmd=_e27.getProperty("cmd");
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
StageDialogBinding.prototype._handleInitializedPageBinding=function(_e29){
if(_e29.bindingDocument==this._viewBinding.getContentDocument()){
if(_e29 instanceof DialogPageBinding){
if(this._pageBinding==null){
this._parsePageBinding(_e29);
}
this._pageBinding=_e29;
if(_e29.height=="auto"){
_e29.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_e29);
_e29.enableAutoHeightLayoutMode(false);
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
if(_e29.isDialogSubPage){
this._pageBinding.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_e29);
this._pageBinding.enableAutoHeightLayoutMode(false);
this._fit(true);
this.reflex(true);
}
}
this._isFirstPage=false;
};
StageDialogBinding.prototype._disableDialogAcceptButton=function(_e2a){
var _e2b=this._viewBinding.getContentDocument().getElementById("dialogacceptbutton");
if(_e2b){
var _e2c=UserInterface.getBinding(_e2b);
_e2c.setDisabled(_e2a);
}
};
StageDialogBinding.prototype._handleDialogPageResponse=function(_e2d){
if(this._dialogResponseHandler!=null){
this._dialogResponseHandler.handleDialogResponse(_e2d.response,_e2d.result!=null?_e2d.result:null);
}
this.close();
};
StageDialogBinding.prototype.handleInvokedControl=function(_e2e){
StageDialogBinding.superclass.handleInvokedControl.call(this,_e2e);
if(_e2e.controlType==ControlBinding.TYPE_CLOSE){
this._defaultClose();
}
};
StageDialogBinding.prototype.buildDescendantBindings=function(){
StageDialogBinding.superclass.buildDescendantBindings.call(this);
this._titlebar.setContextMenu(app.bindingMap.dialogtitlebarpopup);
var self=this;
this._titlebar.handleAction=function(_e30){
switch(_e30.type){
case MenuItemBinding.ACTION_COMMAND:
if(_e30.listener==this.contextMenuBinding){
self._handleContextMenuItemBinding(_e30.target);
}
break;
}
};
};
StageDialogBinding.prototype._parsePageBinding=function(_e31){
var _e32=_e31.label;
var _e33=_e31.image;
var _e34=_e31.width;
var _e35=_e31.height;
var _e36=_e31.controls;
var _e37=_e31.isResizable;
if(_e32){
this.setLabel(_e32);
}
if(_e33){
this.setImage(_e33);
}
if(_e34||_e35){
var old=this.getDimension();
var nev=new Dimension();
if(this._isFirstPage){
nev.w=_e34?_e34:old.w;
}else{
nev.w=old.w;
}
nev.h=(_e35!=null&&_e35!="auto")?_e35:old.h;
this.setDimension(nev);
}
if(_e36){
this.controlBindings[ControlBinding.TYPE_MAXIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_MINIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_CLOSE].hide();
var type,_e3b=new List(_e36.split(" "));
while((type=_e3b.getNext())!=null){
this.controlBindings[type].show();
}
}
if(_e37!=this._isResizable){
this.setResizable(_e37);
}
if(_e35=="auto"){
this._fixAutoHeight(_e31);
}
if(_e31==this._pageBinding){
this.centerOnScreen();
}
if(!this.isOpen){
this.reflex(true);
this.open(true);
}
};
StageDialogBinding.prototype._fixAutoHeight=function(_e3c){
var dim=this.getDimension();
var _e3e=0;
var _e3f=0;
if(_e3c.isDialogSubPage){
_e3c=this._pageBinding;
}
if(this._isFirstPage){
_e3e=_e3c.width!=null?_e3c.width:dim.w;
}else{
_e3e=dim.w;
}
_e3f=_e3c.bindingElement.offsetHeight;
_e3f+=this._titlebar.bindingElement.offsetHeight;
_e3f+=4;
if(_e3f<dim.h){
_e3f=dim.h;
}
if(_e3c.minheight!=null){
if(_e3f<_e3c.minheight){
_e3f=_e3c.minheight;
}
}
this.setDimension(new Dimension(_e3e,_e3f));
};
StageDialogBinding.prototype._defaultClose=function(){
if(this._dialogResponseHandler){
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
StageDialogBinding.newInstance=function(_e42){
var _e43=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_e42);
var _e44=UserInterface.registerBinding(_e43,StageDialogBinding);
_e44.setProperty("controls","minimize maximize close");
return _e44;
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
this.addFilter(function(_e45,list){
var _e47=null;
var _e48=UserInterface.getBinding(_e45);
if(_e48.isAttached){
if(Interfaces.isImplemented(IFit,_e48)){
if(!_e48.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_e48);
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
StageDecksBinding.prototype.mountDefinition=function(_e49){
var _e4a=StageDeckBinding.newInstance(this.bindingDocument);
_e4a.handle=_e49.handle;
_e4a.perspectiveNode=_e49.node;
this._decks[_e4a.handle]=_e4a;
this.add(_e4a);
_e4a.attach();
};
StageDecksBinding.prototype.setSelectionByHandle=function(_e4b){
var _e4c=this._decks[_e4b];
StageBinding.perspectiveNode=_e4c.perspectiveNode;
this.select(_e4c);
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
StageDeckBinding.prototype.handleAction=function(_e4d){
StageDeckBinding.superclass.handleAction.call(this,_e4d);
var _e4e=_e4d.target;
switch(_e4d.type){
case WindowBinding.ACTION_LOADED:
if(_e4e==this.windowBinding){
top.app.bindingMap.stagedeckscover.hide();
this.removeActionListener(WindowBinding.ACTION_LOADED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_OPENED);
this.dispatchAction(StageDeckBinding.ACTION_LOADED);
_e4d.consume();
}
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_e4e instanceof DockBinding){
this._dockBindings.set(_e4e.reference,_e4e);
_e4e.perspectiveNode=this.perspectiveNode;
}
break;
case StageSplitBoxBinding.ACTION_DOCK_OPENED:
this._dockBindingCount++;
if(this._dockBindingCount==2){
this._dockBindings.get("main").showControls(true);
}
_e4d.consume();
break;
case StageSplitBoxBinding.ACTION_DOCK_EMPTIED:
this._dockBindingCount--;
if(this._dockBindingCount==1){
this._dockBindings.get("main").showControls(false);
}
_e4d.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_e4d);
StageDeckBinding.superclass.handleAction.call(this,_e4d);
};
StageDeckBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _e50=new StageCrawler();
_e50.mode=mode;
_e50.crawl(this.windowBinding.getContentDocument().body);
_e50.dispose();
};
StageDeckBinding.prototype.select=function(){
if(!this._isStageDeckBindingInitialized){
this.initialize();
}
StageDeckBinding.superclass.select.call(this);
};
StageDeckBinding.prototype.getDockBindingByReference=function(_e51){
return this._dockBindings.get(_e51);
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
StageDeckBinding.newInstance=function(_e52){
var _e53=DOMUtil.createElementNS(Constants.NS_UI,"ui:stagedeck",_e52);
var _e54=UserInterface.registerBinding(_e53,StageDeckBinding);
return _e54;
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
StageSplitBoxBinding.prototype.handleAction=function(_e55){
StageSplitBoxBinding.superclass.handleAction.call(this,_e55);
StageBoxAbstraction.handleAction.call(this,_e55);
var _e56=_e55.target;
var _e57=null;
var _e58=null;
switch(_e55.type){
case DockBinding.ACTION_EMPTIED:
_e58=this.getChildBindingByLocalName("splitter");
if(_e58.isVisible){
_e58.hide();
}
_e57=this.getDescendantBindingsByLocalName("dock");
if(_e57.getFirst().isEmpty&&_e57.getLast().isEmpty){
if(_e57.getFirst().type!=DockBinding.TYPE_EDITORS){
this.dispatchAction(StageSplitBoxBinding.ACTION_HIDE);
this.hide();
}
}else{
this.flex();
this.invokeLayout();
}
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
_e55.consume();
break;
case DockBinding.ACTION_OPENED:
_e57=this.getDescendantBindingsByLocalName("dock");
if(!_e57.getFirst().isEmpty&&!_e57.getLast().isEmpty){
_e58=this.getChildBindingByLocalName("splitter");
if(!_e58.isVisible){
_e58.show();
}
}
if(!this.isVisible){
this.show();
this.dispatchAction(StageSplitBoxBinding.ACTION_SHOW);
}
this.flex();
this.invokeLayout();
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_OPENED);
_e55.consume();
break;
case StageSplitBoxBinding.ACTION_HIDE:
if(_e56!=this){
_e58=this.getChildBindingByLocalName("splitter");
if(_e58.isVisible){
_e58.hide();
}
this.invokeLayout();
_e55.consume();
}
break;
case StageSplitBoxBinding.ACTION_SHOW:
if(_e56!=this){
var _e59=this.getChildBindingsByLocalName("splitpanel");
if(_e59.getFirst().isVisible&&_e59.getLast().isVisible){
_e58=this.getChildBindingByLocalName("splitter");
if(!_e58.isVisible){
_e58.show();
}
}
this.invokeLayout();
_e55.consume();
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
StageSplitBoxBinding.prototype.handleCrawler=function(_e5a){
StageSplitBoxBinding.superclass.handleCrawler.call(this,_e5a);
switch(_e5a.id){
case FlexBoxCrawler.ID:
if(this.isMaximizedForReal==false){
_e5a.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
};
StageSplitBoxBinding.prototype.hasBothPanelsVisible=function(){
var _e5b=this.getChildBindingsByLocalName("splitpanel");
return _e5b.getFirst().isVisible&&_e5b.getLast().isVisible;
};
StageSplitBoxBinding.prototype.hasBothPanelsFixed=function(){
var _e5c=this.getChildBindingsByLocalName("splitpanel");
return _e5c.getFirst().isFixed&&_e5c.getLast().isFixed;
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
StageSplitPanelBinding.prototype.handleAction=function(_e5d){
StageSplitPanelBinding.superclass.handleAction.call(this,_e5d);
StageBoxAbstraction.handleAction.call(this,_e5d);
switch(_e5d.type){
case DockBinding.ACTION_EMPTIED:
case StageSplitBoxBinding.ACTION_HIDE:
if(this.isMaximized==true){
this.normalize();
}
var dock=this.getContainedDock();
if(dock&&dock.type==DockBinding.TYPE_EDITORS){
this._invisibilize(true);
if(_e5d.type==StageSplitBoxBinding.ACTION_HIDE){
_e5d.consume();
}
}else{
this.hide();
if(this.isFixed==true){
this.setFix(false);
}
}
if(_e5d.type==DockBinding.ACTION_EMPTIED){
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
if(_e5d.type==StageSplitBoxBinding.ACTION_SHOW){
_e5d.consume();
}
}else{
this.show();
if(this.isFixed==true){
this.setFix(false);
}
}
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
var _e60=_e5d.target;
if(_e60!=this&&_e60.getContainedDock()){
if(this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_VERTICAL){
var _e61=_e60._containingSplitBoxBinding;
if(_e61.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL){
var _e62=_e61.getChildBindingsByLocalName("splitpanel");
var _e63=_e62.getFirst();
var _e64=_e62.getLast();
if(this.isFixed==true){
if(!_e63.isFixed||!_e64.isFixed||(!_e61.hasBothPanelsVisible()&&_e60.isMinimizedForReal)){
this.setFix(false);
_e5d.consume();
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
}
}else{
if(_e61.hasBothPanelsFixed()||(!_e61.hasBothPanelsVisible()&&_e60.isMinimizedForReal)){
this.setFix(_e60.getContainedDock().getHeight());
_e5d.consume();
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
var _e65=this.getContainedDock();
if(_e65){
if(this.isMaximizePrepared==true){
}else{
_e65.interceptDisplayChange(false);
}
}
};
StageSplitPanelBinding.prototype.handleUnMaximization=function(){
StageBoxAbstraction.handleUnMaximization.call(this);
var _e66=this.getContainedDock();
if(_e66){
if(_e66.type==DockBinding.TYPE_EDITORS){
if(_e66.isEmpty){
this._invisibilize(true);
}
}
if(this.isMaximized==true){
this.normalize();
}else{
_e66.interceptDisplayChange(true);
}
}
};
StageSplitPanelBinding.prototype.maximize=function(){
if(this.isMinimized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.maximize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
var _e67=this.getContainedDock();
if(_e67){
_e67.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MAXIMIZED,_e67);
}
};
StageSplitPanelBinding.prototype.minimize=function(){
var _e68=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _e69=this.getContainedDock();
if(_e69){
_e69.collapse(_e68);
if(!_e68){
this.setFix(_e69.getHeight());
}else{
this.setFix(_e69.getWidth());
}
}
if(this.isMaximized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.minimize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_e69&&_e69.isActive){
_e69.deActivate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MINIMIZED,_e69);
}
};
StageSplitPanelBinding.prototype.normalize=function(_e6a){
var _e6b=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _e6c=this.getContainedDock();
if(_e6c){
if(this.isMinimized==true){
_e6c.unCollapse(_e6b);
this.setFix(false);
}
}
StageSplitPanelBinding.superclass.normalize.call(this);
if(!_e6a){
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_e6c){
_e6c.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_NORMALIZED,_e6c);
}
}
};
StageSplitPanelBinding.prototype.getContainedDock=function(){
return this.getChildBindingByLocalName("dock");
};
StageSplitPanelBinding.prototype.invisibilize=function(_e6d){
var _e6e=true;
var dock=this.getContainedDock();
if(dock!=null&&dock.type==DockBinding.TYPE_EDITORS){
if(dock.isEmpty==true){
_e6e=false;
}
}
if(_e6e==true){
this._invisibilize(_e6d);
}
};
StageSplitPanelBinding.prototype._invisibilize=function(_e70){
if(_e70!=this._isInvisibilized){
if(_e70){
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
StageSplitterBinding.prototype.onDragStart=function(_e71){
var _e72=top.app.bindingMap.stagesplittercover;
var _e73=this._containingSplitBoxBinding.getOrient();
switch(_e73){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_e72.bindingElement.style.cursor="e-resize";
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_e72.bindingElement.style.cursor="n-resize";
break;
}
_e72.show();
var body=top.app.bindingMap.stagesplitterbody;
body.setPosition(this.getPosition());
body.setDimension(this.getDimension());
body.setOrient(_e73);
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
StageSplitterBodyBinding.prototype.setOrient=function(_e79){
this._orient=_e79;
this.attachClassName(_e79);
};
StageSplitterBodyBinding.prototype.setPosition=function(pos){
var _e7b=true;
var _e7c=true;
switch(this._orient){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_e7c=false;
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_e7b=false;
break;
}
if(_e7b){
this.bindingElement.style.left=pos.x+"px";
}
if(_e7c){
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
StageBoxAbstraction.handleAction=function(_e7e){
switch(_e7e.type){
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
if(_e7e.target instanceof DockBinding){
if(this.isHiddenForReal){
this.dispatchAction(StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED);
}else{
if(this.isMinimizedForReal){
this.normalize();
}
}
}
_e7e.consume();
break;
}
};
StageBoxAbstraction.handleMaximization=function(){
if(this.isMaximizePrepared==true){
this.isMaximizedForReal=true;
this.isHiddenForReal=false;
this.isFlexible=false;
if(Client.isMozilla==true){
var _e7f=this.bindingElement.style;
_e7f.position="absolute";
_e7f.width="100%";
_e7f.height="100%";
_e7f.top="0";
_e7f.left="0";
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
var _e80=this.bindingElement.style;
_e80.position="relative";
_e80.width="auto";
_e80.height="auto";
_e80.top="auto";
_e80.left="auto";
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
StageBoxAbstraction._emulateBasicCSS=function(_e81,_e82){
var _e83=_e81.bindingElement.style;
var _e84=_e81.bindingElement.parentNode;
var box=_e81._containingSplitBoxBinding;
if(Client.isExplorer==true){
if(_e82){
_e81._unmodifiedFlexMethod=_e81.flex;
_e81.flex=function(){
_e83.width=_e84.offsetWidth+"px";
_e83.height=_e84.offsetHeight+"px";
};
}else{
_e83.width="100%";
_e83.height="100%";
if(!box.isHorizontalOrient()){
setTimeout(function(){
_e83.width="auto";
_e83.height="auto";
box.reflex(true);
},0);
}
_e81.flex=_e81._unmodifiedFlexMethod;
_e81._unmodifiedFlexMethod=null;
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
StageBoxHandlerAbstraction.handleAction=function(_e86){
var _e87=_e86.target;
switch(_e86.type){
case ControlBoxBinding.ACTION_MAXIMIZE:
case ControlBoxBinding.ACTION_NORMALIZE:
if(_e87 instanceof StageSplitPanelBinding){
StageBoxHandlerAbstraction.handleControlBoxAction.call(this,_e86);
_e86.consume();
}
break;
case StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED:
if(this.isSubPanelMaximized){
this.iterateContainedStageBoxBindings(StageCrawler.MODE_UNMAXIMIZE);
this.isSubPanelMaximized=false;
}
_e86.consume();
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
break;
}
};
StageBoxHandlerAbstraction.handleControlBoxAction=function(_e88){
var mode=null;
switch(_e88.type){
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
StageMenuBarBinding.prototype.onBindingRegister=function(){
StageMenuBarBinding.superclass.onBindingRegister.call(this);
this.addActionListener(MenuItemBinding.ACTION_COMMAND);
};
StageMenuBarBinding.prototype.handleAction=function(_e8a){
StageMenuBarBinding.superclass.handleAction.call(this,_e8a);
switch(_e8a.type){
case MenuItemBinding.ACTION_COMMAND:
var _e8b=_e8a.target.associatedSystemAction;
if(Application.isLoggedIn){
if(!this._rootNode){
this._rootNode=System.getRootNode();
}
if(_e8b){
SystemAction.invoke(_e8b,this._rootNode);
}
}
_e8a.consume();
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
var _e8c=this.getProperty("handle");
if(_e8c){
this._handle=_e8c;
if(StageBinding.isViewOpen(_e8c)){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
this.check(true);
}
}
this.oncommand=function(){
var self=this;
Application.lock(self);
setTimeout(function(){
StageBinding.handleViewPresentation(_e8c);
Application.unlock(self);
},Client.hasTransitions?Animation.DEFAULT_TIME:0);
};
}else{
throw new Error("StageViewMenuItemBinding: missing handle");
}
};
StageViewMenuItemBinding.prototype.setHandle=function(_e8e){
this.setProperty("handle",_e8e);
};
StageViewMenuItemBinding.prototype.handleBroadcast=function(_e8f,arg){
StageViewMenuItemBinding.superclass.handleBroadcast.call(this,_e8f,arg);
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
switch(_e8f){
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
StageViewMenuItemBinding.newInstance=function(_e91){
var _e92=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_e91);
UserInterface.registerBinding(_e92,StageViewMenuItemBinding);
return UserInterface.getBinding(_e92);
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
StageStatusBarBinding.prototype.setLabel=function(_e93){
this._label.setLabel(_e93);
};
StageStatusBarBinding.prototype.setImage=function(_e94){
this._label.setImage(_e94);
};
StageStatusBarBinding.prototype.clear=function(){
this._label.setLabel(null);
this._label.setImage(false);
};
StageStatusBarBinding.prototype.startFadeOut=function(_e95){
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
var _e96=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _e97=_e96.getAssociatedView();
var _e98=_e97.getContentWindow().bindingMap.tree;
return _e98.getFocusedTreeNodeBindings();
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
ExplorerBinding.prototype.handleAction=function(_e99){
ExplorerBinding.superclass.handleAction.call(this,_e99);
var _e9a=_e99.target;
switch(_e99.type){
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
this._decksBinding.setSelectionByHandle(this._menuBinding.getSelectionHandle());
var tag=this._menuBinding.getSelectionTag();
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVE_CHANGED,tag);
break;
case ViewBinding.ACTION_LOADED:
this.dispatchAction(ExplorerBinding.ACTION_DECK_LOADED);
_e99.consume();
break;
case Binding.ACTION_DRAG:
if(_e9a instanceof ExplorerSplitterBinding){
_e9a.dragger.registerHandler(this);
}
_e99.consume();
}
};
ExplorerBinding.prototype.setSelectionByHandle=function(_e9c){
this._menuBinding.setSelectionByHandle(_e9c);
};
ExplorerBinding.prototype.setSelectionDefault=function(){
this._menuBinding.setSelectionDefault();
};
ExplorerBinding.prototype.getSelectedDeckBinding=function(){
return this._decksBinding.getSelectedDeckBinding();
};
ExplorerBinding.prototype.mountDefinition=function(_e9d){
if(_e9d instanceof SystemViewDefinition){
this._decksBinding.mountDefinition(_e9d);
this._menuBinding.mountDefinition(_e9d);
}else{
throw new Error("ExplorerBinding: No such ViewDefinition supported");
}
};
ExplorerBinding.prototype.onDragStart=function(_e9e){
var _e9f=this._menuBinding.getDescendantBindingsByLocalName("explorertoolbarbutton");
if(_e9f.hasEntries()){
var _ea0=_e9f.getFirst();
this._dragStart=_ea0.boxObject.getLocalPosition().y;
this._dragSlot=0;
if(this._dragHeight==0){
this._dragHeight=_ea0.boxObject.getDimension().h;
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
ExplorerDecksBinding.prototype.mountDefinition=function(_ea4){
if(_ea4 instanceof SystemViewDefinition){
var _ea5=ViewBinding.newInstance(this.bindingDocument);
_ea5.setType(ViewBinding.TYPE_EXPLORERVIEW);
_ea5.setDefinition(_ea4);
var _ea6=ExplorerDeckBinding.newInstance(this.bindingDocument);
_ea6.setAssociatedView(_ea5);
this._decks[_ea4.handle]=_ea6;
_ea6.add(_ea5);
this.add(_ea6);
_ea6.attach();
_ea5.attach();
}
};
ExplorerDecksBinding.prototype.setSelectionByHandle=function(_ea7){
var _ea8=this._decks[_ea7];
this.select(_ea8);
};
DecksBinding.prototype.expandBy=function(_ea9){
var deck=this.getSelectedDeckBinding();
if(deck){
var _eab=this.bindingElement.offsetHeight+_ea9;
var view=deck.getAssociatedView();
this.bindingElement.style.height=_eab+"px";
this.reflex(true);
}
};
ExplorerDecksBinding.newInstance=function(_ead){
var _eae=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdecks",_ead);
return UserInterface.registerBinding(_eae,ExplorerDecksBinding);
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
ExplorerDeckBinding.prototype.setAssociatedView=function(_eaf){
this._viewBinding=_eaf;
};
ExplorerDeckBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
ExplorerDeckBinding.prototype.select=function(){
if(!this._isExplorerDeckBindingInitialized){
Application.lock(this);
var _eb0=StringBundle.getString("ui","Website.App.StatusBar.Loading");
var _eb1=this._viewBinding.getDefinition().label;
StatusBar.busy(_eb0,[_eb1]);
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
ExplorerDeckBinding.prototype.handleAction=function(_eb2){
ExplorerDeckBinding.superclass.handleAction.call(this,_eb2);
var _eb3=_eb2.target;
switch(_eb2.type){
case PageBinding.ACTION_INITIALIZED:
if(_eb3 instanceof SystemPageBinding){
this._isExplorerDeckBindingInitialized=true;
this._entityToken=_eb3.node.getEntityToken();
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
ExplorerDeckBinding.prototype.handleBroadcast=function(_eb4,arg){
ExplorerDeckBinding.superclass.handleBroadcast.call(this,_eb4,arg);
switch(_eb4){
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
var _eb6=null;
if(this._isExplorerDeckBindingInitialized){
_eb6=this._viewBinding.getDefinition().label;
}else{
_eb6=DockTabBinding.LABEL_TABLOADING;
}
return _eb6;
};
ExplorerDeckBinding.prototype.getImage=function(){
var _eb7=null;
if(this._isExplorerDeckBindingInitialized){
_eb7=this._viewBinding.getDefinition().image;
}else{
_eb7=DockTabBinding.IMG_TABLOADING;
}
return _eb7;
};
ExplorerDeckBinding.prototype.getToolTip=function(){
var _eb8=null;
if(this._isExplorerDeckBindingInitialized){
_eb8=this._viewBinding.getDefinition().toolTip;
}
return _eb8;
};
ExplorerDeckBinding.newInstance=function(_eb9){
var _eba=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdeck",_eb9);
return UserInterface.registerBinding(_eba,ExplorerDeckBinding);
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
ExplorerMenuBinding.prototype.onMemberInitialize=function(_ebb){
switch(_ebb.constructor){
case ExplorerToolBarBinding:
this._maxGroup=_ebb.getToolBarGroupByIndex(0);
break;
case ToolBarBinding:
this._minGroup=_ebb.getToolBarGroupByIndex(0);
break;
}
ExplorerMenuBinding.superclass.onMemberInitialize.call(this,_ebb);
};
ExplorerMenuBinding.prototype.mountDefinition=function(_ebc){
this._maxButtons.set(_ebc.handle,this._mountMaxButton(_ebc));
this._minButtons.set(_ebc.handle,this._mountMinButton(_ebc));
this._index++;
};
ExplorerMenuBinding.prototype._mountMaxButton=function(_ebd){
var _ebe=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_LARGE);
_ebe.setLabel(_ebd.label);
_ebe.setToolTip(_ebd.toolTip);
_ebe.handle=_ebd.handle;
_ebe.node=_ebd.node;
this._maxGroup.add(_ebe);
this._maxList.add(_ebe);
_ebe.attach();
return _ebe;
};
ExplorerMenuBinding.prototype._mountMinButton=function(_ebf){
var _ec0=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_NORMAL);
_ec0.setLabel(_ebf.label);
_ec0.setToolTip(_ebf.toolTip);
_ec0.handle=_ebf.handle;
_ec0.node=_ebf.node;
this._minGroup.addFirst(_ec0);
this._minList.add(_ec0);
_ec0.attach();
_ec0.hide();
return _ec0;
};
ExplorerMenuBinding.prototype.handleAction=function(_ec1){
ExplorerMenuBinding.superclass.handleAction.call(this,_ec1);
switch(_ec1.type){
case RadioGroupBinding.ACTION_SELECTIONCHANGED:
var _ec2=_ec1.target;
var _ec3=_ec2.getCheckedButtonBinding();
var _ec4=_ec3.handle;
switch(_ec2){
case this._maxGroup:
this._minGroup.setCheckedButtonBinding(this._minButtons.get(_ec4),true);
break;
case this._minGroup:
this._maxGroup.setCheckedButtonBinding(this._maxButtons.get(_ec4),true);
break;
}
this._selectedHandle=_ec4;
this._selectedTag=_ec3.node.getTag();
this.dispatchAction(ExplorerMenuBinding.ACTION_SELECTIONCHANGED);
_ec1.consume();
break;
}
};
ExplorerMenuBinding.prototype.setSelectionByHandle=function(_ec5){
var _ec6=this._maxButtons.get(_ec5);
if(_ec6){
_ec6.check();
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
var _ec7=false;
var max=this._maxList.getLength()-1;
if(!this._maxList.get(max).isVisible){
this._index++;
this._maxList.get(this._index).show();
this._minList.get(this._index).hide();
_ec7=true;
}
return _ec7;
};
ExplorerMenuBinding.prototype.showLess=function(){
var _ec9=false;
if(this._maxList.get(0).isVisible){
this._maxList.get(this._index).hide();
this._minList.get(this._index).show();
this._index--;
_ec9=true;
}
return _ec9;
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
ExplorerToolBarBinding.newInstance=function(_eca){
var _ecb=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorertoolbar",_eca);
return UserInterface.registerBinding(_ecb,ExplorerToolBarBinding);
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
var _ecc=this.explorerToolBarButtonType==ExplorerToolBarButtonBinding.TYPE_LARGE;
var _ecd=_ecc?ToolBarBinding.IMAGESIZE_LARGE:ToolBarBinding.IMAGESIZE_NORMAL;
this.imageProfile=this.node.getImageProfile(_ecd);
ExplorerToolBarButtonBinding.superclass.onBindingAttach.call(this);
};
ExplorerToolBarButtonBinding.newInstance=function(_ece,_ecf){
var _ed0=(_ecf==ExplorerToolBarButtonBinding.TYPE_LARGE?"ui:explorertoolbarbutton":"ui:toolbarbutton");
var _ed1=DOMUtil.createElementNS(Constants.NS_UI,_ed0,_ece);
var _ed2=UserInterface.registerBinding(_ed1,ExplorerToolBarButtonBinding);
_ed2.explorerToolBarButtonType=_ecf;
return _ed2;
};
EditorBinding.prototype=new WindowBinding;
EditorBinding.prototype.constructor=EditorBinding;
EditorBinding.superclass=WindowBinding.prototype;
EditorBinding.ACTION_ATTACHED=null;
EditorBinding.URL_DIALOG_MOZ_CONFIGURE="${root}/content/dialogs/wysiwygeditor/mozsecuritynote/mozsecuritynote.aspx";
EditorBinding.ABSURD_NUMBER=-999999999;
EditorBinding._components=new Map();
EditorBinding._editors=new Map();
EditorBinding.registerComponent=function(_ed3,_ed4){
var _ed5=EditorBinding._components;
var _ed6=EditorBinding._editors;
var key=_ed4.key;
var _ed8=Interfaces.isImplemented(IWysiwygEditorComponent,_ed3);
if(!_ed8){
_ed8=Interfaces.isImplemented(ISourceEditorComponent,_ed3);
}
if(_ed8){
if(_ed6.has(key)){
_ed6.get(key).initializeEditorComponent(_ed3);
}else{
if(!_ed5.has(key)){
_ed5.set(key,new List());
}
_ed5.get(key).add(_ed3);
}
}else{
throw "Editor component interface not implemented: "+_ed3;
}
};
EditorBinding.claimComponents=function(_ed9,_eda){
var _edb=EditorBinding._components;
var _edc=EditorBinding._editors;
var key=_eda.key;
_edc.set(key,_ed9);
var list=null;
if(_edb.has(key)){
list=_edb.get(key).copy();
_edb.del(key);
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
this.crawlerFilters=new List(FocusCrawler.ID);
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
if(this.getProperty("callbackid")!=null){
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
var _ee0=this.getProperty("value");
if(_ee0!=null){
this._startContent=decodeURIComponent(_ee0);
}
};
EditorBinding.prototype.onBindingDispose=function(){
EditorBinding.superclass.onBindingDispose.call(this);
var name=this.getProperty("name");
if(name!=null){
var _ee2=this.bindingWindow.DataManager;
_ee2.unRegisterDataBinding(name);
}
};
EditorBinding.prototype._initialize=function(){
this.subscribe(BroadcastMessages.MOUSEEVENT_MOUSEUP);
if(this._startContent==null){
this._startContent="";
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
EditorBinding.prototype.initializeEditorComponents=function(_ee4){
var _ee5=EditorBinding.claimComponents(this,_ee4);
if(_ee5!=null){
while(_ee5.hasNext()){
this.initializeEditorComponent(_ee5.getNext());
}
}
};
EditorBinding.prototype._registerWithDataManager=function(name){
if(name&&name!=""){
var _ee7=this.bindingWindow.DataManager;
if(_ee7.getDataBinding(name)){
_ee7.unRegisterDataBinding(name);
}
_ee7.registerDataBinding(name,this);
}
};
EditorBinding.prototype.addEditorEvents=function(){
var _ee8=this.getEditorDocument();
if(_ee8!=null){
Application.framework(_ee8);
DOMEvents.addEventListener(_ee8,DOMEvents.CONTEXTMENU,this);
DOMEvents.addEventListener(_ee8,DOMEvents.KEYPRESS,this);
DOMEvents.addEventListener(_ee8,DOMEvents.MOUSEDOWN,this);
}
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,{handleEvent:function(e){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}});
};
EditorBinding.prototype.checkForDirty=function(_eea){
if(!this.isDirty){
if(_eea==true){
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
var _eec=this.getCheckSum();
if(_eec!=this._checksum){
this.dispatchAction(Binding.ACTION_DIRTY);
this.isDirty=true;
this._checksum=_eec;
}
};
EditorBinding.prototype.getCheckSum=function(){
var _eed=null;
if(Binding.exists(this._pageBinding)){
_eed=this._pageBinding.getCheckSum(this._checksum);
}
return _eed;
};
EditorBinding.prototype.handleEvent=function(e){
EditorBinding.superclass.handleEvent.call(this,e);
var _eef=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.CONTEXTMENU:
DOMEvents.preventDefault(e);
this._popupBinding.editorBinding=this;
this.handleContextMenu(e);
break;
case DOMEvents.KEYPRESS:
this.checkForDirty();
break;
case DOMEvents.MOUSEDOWN:
if(_eef.ownerDocument==this.getEditorDocument()){
if(!this._isActivated){
this._activateEditor(true);
}
}
break;
}
};
EditorBinding.prototype.handleContextMenu=function(e){
this.createBookmark();
this._popupBinding.snapToMouse(e);
};
EditorBinding.prototype.handleBroadcast=function(_ef1,arg){
EditorBinding.superclass.handleBroadcast.call(this,_ef1,arg);
var _ef3=null;
switch(_ef1){
case BroadcastMessages.MOUSEEVENT_MOUSEUP:
if(!this.isDialogMode){
try{
var _ef4=true;
if(arg instanceof Binding){
if(Interfaces.isImplemented(IEditorControlBinding,arg)==true){
if(arg.isEditorControlBinding){
_ef4=false;
}
}
}else{
_ef3=DOMEvents.getTarget(arg);
if(_ef3&&_ef3.ownerDocument==this.getEditorDocument()){
_ef4=false;
}
}
if(_ef4){
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
EditorBinding.prototype._activateEditor=function(_ef5){
if(_ef5!=this._isActivated){
this._isActivated=_ef5;
var _ef6=this.getEditorWindow().standardEventHandler;
var _ef7=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_ef7!=null){
if(_ef5==true){
if(this.hasBookmark()){
this.deleteBookmark();
}
_ef7.enable();
_ef6.enableNativeKeys(true);
if(Client.isExplorer){
this._sanitizeExplorer();
}
}else{
_ef7.disable();
_ef6.disableNativeKeys();
}
}else{
throw "Required broadcaster not found";
}
}
};
EditorBinding.prototype._sanitizeExplorer=function(){
var _ef8=this.getEditorDocument().selection.createRange();
_ef8.select();
};
EditorBinding.prototype.hasSelection=function(){
var _ef9=false;
if(Client.isMozilla==true){
var _efa=this.getEditorWindow().getSelection();
_ef9=_efa&&(_efa.toString().length>0);
}else{
var _efb=this.getEditorDocument().selection.createRange();
_ef9=(_efb&&_efb.text)&&_efb.text.length>0;
}
return _ef9;
};
EditorBinding.prototype.isCommandEnabled=function(_efc){
var _efd=true;
switch(_efc){
case "Cut":
case "Copy":
case "Paste":
_efd=this.getEditorDocument().queryCommandEnabled(_efc);
break;
}
return _efd;
};
EditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _f01=false;
this.restoreBookmark();
switch(cmd){
case "Cut":
case "Copy":
case "Paste":
var _f02=null;
if(cmd=="Paste"){
_f02=null;
}else{
_f02=this.hasSelection();
}
try{
this.getEditorDocument().execCommand(cmd,gui,_f02);
}
catch(mozillaSecurityException){
if(Client.isMozilla==true){
Dialog.invokeModal(EditorBinding.URL_DIALOG_MOZ_CONFIGURE);
}else{
throw "Clipboard operation malfunction. Contact your developer.";
}
}
finally{
_f01=true;
}
break;
}
return _f01;
};
EditorBinding.prototype.getButtonForCommand=function(cmd){
var _f04=this.getContentWindow().bindingMap.toolbar;
var _f05=_f04.getButtonForCommand(cmd);
if(!_f05){
throw "No button for command "+cmd;
}
return _f05;
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
var _f08=this.getContentDocument().getElementById("focusableinput");
if(_f08!=null){
_f08.style.display="block";
FocusBinding.focusElement(_f08);
_f08.style.display="none";
}else{
throw "Required element not found: focusableinput";
}
};
EditorBinding.prototype.handleAction=function(_f09){
EditorBinding.superclass.handleAction.call(this,_f09);
var _f0a=_f09.target;
var self=this;
var _f0c=this.shadowTree.iframe;
switch(_f09.type){
case Binding.ACTION_DIRTY:
if(_f09.target!=this){
this.checkForDirty();
}
break;
}
};
EditorBinding.prototype._onPageInitialize=function(_f0d){
if(this._pageBinding==null){
this.reflex();
if(this._coverBinding!=null&&this._coverBinding.isVisible){
this._coverBinding.hide();
}
}
EditorBinding.superclass._onPageInitialize.call(this,_f0d);
};
EditorBinding.prototype.handleElement=function(_f0e){
return true;
};
EditorBinding.prototype.updateElement=function(_f0f){
return true;
};
EditorBinding.prototype.focus=Binding.ABSTRACT_METHOD;
EditorBinding.prototype.blur=Binding.ABSTRACT_METHOD;
EditorBinding.prototype.validate=Binding.ABSTRACT_METHOD;
EditorBinding.prototype.manifest=Binding.ABSTRACT_METHOD;
EditorBinding.prototype.getValue=Binding.ABSTRACT_METHOD;
EditorBinding.prototype.getResult=Binding.ABSTRACT_METHOD;
EditorBinding.prototype.getEditorWindow=Binding.ABSTRACT_METHOD;
EditorBinding.prototype.getEditorDocument=Binding.ABSTRACT_METHOD;
EditorBinding.prototype.getEditorPopupBinding=Binding.ABSTRACT_METHOD;
EditorBinding.prototype.createBookmark=Binding.ABSTRACT_METHOD;
EditorBinding.prototype.restoreBookmark=Binding.ABSTRACT_METHOD;
EditorBinding.prototype.hasBookmark=Binding.ABSTRACT_METHOD;
EditorBinding.prototype.deleteBookmark=Binding.ABSTRACT_METHOD;
EditorBinding.prototype.resetUndoRedo=Binding.ABSTRACT_METHOD;
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
this._menuGroups[rel].each(function(_f12){
_f12.show();
});
};
EditorPopupBinding.prototype._hideMenuGroups=function(rel){
this._menuGroups[rel].each(function(_f14){
_f14.hide();
});
};
EditorPopupBinding.prototype.handleAction=function(_f15){
EditorPopupBinding.superclass.handleAction.call(this,_f15);
var _f16=_f15.target;
if(_f15.type==MenuItemBinding.ACTION_COMMAND){
this.hide();
var cmd=_f16.getProperty("cmd");
var gui=_f16.getProperty("gui");
var val=_f16.getProperty("val");
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
var _f1a=this.bindingWindow.bindingMap.tinywindow;
var _f1b=this.bindingWindow.bindingMap.codepresswindow;
if(_f1a){
EditorBinding.registerComponent(this,_f1a);
}else{
if(_f1b){
EditorBinding.registerComponent(this,_f1b);
}
}
};
EditorClickButtonBinding.prototype.buildDOMContent=function(){
EditorClickButtonBinding.superclass.buildDOMContent.call(this);
this._buildDesignModeSanitizer();
};
EditorClickButtonBinding.prototype.initializeComponent=function(_f1c,_f1d,_f1e,_f1f){
this._editorBinding=_f1c;
this._tinyEngine=_f1d;
this._tinyInstance=_f1e;
this._tinyTheme=_f1f;
this._setupEditorBookmarking();
};
EditorClickButtonBinding.prototype.initializeSourceEditorComponent=function(_f20,_f21,_f22){
this._editorBinding=_f20;
this._codePressFrame=_f21;
this._codePressEngine=_f22;
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
var _f24=this._editorBinding;
if(_f24!=null){
var self=this;
var _f26={handleEvent:function(e){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(!_f24.hasBookmark()){
_f24.createBookmark();
}
break;
case DOMEvents.MOUSEUP:
if(self.isEditorSimpleControl){
if(self.popupBinding==null){
if(_f24.hasBookmark()){
_f24.restoreBookmark();
}
}
}
break;
}
}};
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,_f26);
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEUP,_f26);
}
};
EditorClickButtonBinding.newInstance=function(_f28){
var _f29=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_f28);
return UserInterface.registerBinding(_f29,EditorClickButtonBinding);
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
EditorToolBarButtonBinding.newInstance=function(_f2a){
var _f2b=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_f2a);
return UserInterface.registerBinding(_f2b,EditorToolBarButtonBinding);
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
var _f2c=this.bindingWindow.bindingMap.tinywindow;
EditorBinding.registerComponent(this,_f2c);
EditorSelectorBinding.superclass.onBindingAttach.call(this);
};
EditorSelectorBinding.prototype.buildButton=function(){
EditorSelectorBinding.superclass.buildButton.call(this);
this._buttonBinding.isEditorSimpleControl=false;
if(this.isEditorControlBinding==false){
this._buttonBinding.isEditorControlBinding=false;
}
};
EditorSelectorBinding.prototype.initializeComponent=function(_f2d,_f2e,_f2f,_f30){
this._editorBinding=_f2d;
this._tinyEngine=_f2e;
this._tinyInstance=_f2f;
this._tinyTheme=_f30;
};
EditorSelectorBinding.prototype.handleAction=function(_f31){
EditorSelectorBinding.superclass.handleAction.call(this,_f31);
switch(_f31.type){
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
EditorSelectorBinding.superclass.handleAction.call(this,_f31);
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
EditorMenuItemBinding.newInstance=function(_f34){
var _f35=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_f34);
return UserInterface.registerBinding(_f35,EditorMenuItemBinding);
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
VisualEditorBinding.getTinyLessClassName=function(_f36){
var i=0,_f38,_f39="",_f3a=_f36.split(" ");
while((_f38=_f3a[i])!=null){
if(_f38.length>=3&&_f38.substring(0,3)=="mce"){
_f38="";
}else{
if(_f38.length>=14&&_f38.substring(0,14)=="compositemedia"){
_f38="";
}
}
_f39+=_f38;
if(_f3a[i+1]){
_f39+=" ";
}
i++;
}
return _f39;
};
VisualEditorBinding.getStructuredContent=function(_f3b){
var _f3c=null;
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.TinyContentToStructuredContent(_f3b);
if(soap instanceof SOAPFault){
}else{
_f3c=soap.XhtmlFragment;
if(!_f3c){
_f3c="";
}
}
WebServiceProxy.isFaultHandler=true;
return _f3c;
};
VisualEditorBinding.getTinyContent=function(_f3e,_f3f){
var _f40=null;
if(_f3e==null||_f3e==""){
_f3e=VisualEditorBinding.DEFAULT_CONTENT;
}
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.StructuredContentToTinyContent(_f3e);
if(soap instanceof SOAPFault){
var _f42=soap;
var _f43={handleDialogResponse:function(){
_f3f.dispatchAction(Binding.ACTION_VALID);
}};
Dialog.invokeModal(VisualEditorBinding.URL_DIALOG_CONTENTERROR,_f43,_f42);
}else{
_f40=soap.XhtmlFragment;
if(_f40==null){
_f40=new String("");
}
}
WebServiceProxy.isFaultHandler=true;
return _f40;
};
VisualEditorBinding.extractByIndex=function(html,_f45){
var _f46=null;
var doc=XMLParser.parse(html);
if(doc!=null){
var _f48=new List(doc.documentElement.childNodes);
var _f49=new List();
_f48.each(function(_f4a){
if(_f4a.nodeType==Node.ELEMENT_NODE){
_f49.add(_f4a);
}
});
var _f4b=_f49.get(_f45);
if(_f4b==null){
if(Application.isDeveloperMode){
alert("VisualEditorBinding: Bad HTML!"+"\n\n"+html);
}
}else{
if(_f4b.hasChildNodes()){
var frag=doc.createDocumentFragment();
while(_f4b.hasChildNodes()){
frag.appendChild(_f4b.firstChild);
}
doc.removeChild(doc.documentElement);
doc.appendChild(DOMUtil.createElementNS(Constants.NS_XHTML,"ROOT",doc));
doc.documentElement.appendChild(frag);
_f46=DOMSerializer.serialize(doc.documentElement);
_f46=_f46.substring(_f46.indexOf(">")+1,_f46.length);
_f46=_f46.substring(0,_f46.lastIndexOf("<"));
}
}
}
if(_f46==null){
_f46=new String("");
}
return _f46;
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
var _f4d=this.getProperty("presentationstylesheet");
if(_f4d!=null){
this.presentationStylesheet=_f4d;
}
var _f4e=this.getProperty("configurationstylesheet");
if(_f4e!=null){
this.configurationStylesheet=_f4e;
}
var _f4f=this.getProperty("formattingconfiguration");
if(_f4f!=null){
this.formattingConfiguration=VisualEditorFormattingConfiguration.getConfiguration(_f4f);
}
var _f50=this.getProperty("elementclassconfiguration");
if(_f50!=null){
this.elementClassConfiguration=VisualEditorElementClassConfiguration.getConfiguration(_f50);
}
var _f51=this.getProperty("embedablefieldstypenames");
if(_f51!=null){
this.embedableFieldConfiguration=VisualEditorFieldGroupConfiguration.getConfiguration(_f51);
}
};
VisualEditorBinding.prototype.handleBroadcast=function(_f52,arg){
VisualEditorBinding.superclass.handleBroadcast.call(this,_f52,arg);
var _f54=this.getContentWindow().bindingMap.tinywindow;
var _f55=_f54.getContentWindow();
switch(_f52){
case BroadcastMessages.VISUALEDITOR_HACKED:
if(arg.broadcastWindow==_f55){
this._startContent=this.normalizeToDocument(this._startContent);
this.extractHead(this._startContent);
this._startContent=this.extractBody(this._startContent);
arg.textareaElement.value=VisualEditorBinding.getTinyContent(this._startContent);
this.unsubscribe(BroadcastMessages.VISUALEDITOR_HACKED);
}
break;
case BroadcastMessages.TINYMCE_INITIALIZED:
if(arg.broadcastWindow==_f55){
this._tinyEngine=arg.tinyEngine;
this._tinyInstance=arg.tinyInstance;
this._tinyTheme=arg.tinyTheme;
this._tinyTheme.initC1(this,this._tinyEngine,this._tinyInstance);
this.initializeEditorComponents(_f54);
this._initialize();
this.unsubscribe(BroadcastMessages.TINYMCE_INITIALIZED);
}
break;
}
};
VisualEditorBinding.prototype.initializeEditorComponent=function(_f56){
_f56.initializeComponent(this,this._tinyEngine,this._tinyInstance,this._tinyTheme);
};
VisualEditorBinding.prototype._finalize=function(){
VisualEditorBinding.superclass._finalize.call(this);
this._maybeShowEditor();
};
VisualEditorBinding.prototype._onPageInitialize=function(_f57){
VisualEditorBinding.superclass._onPageInitialize.call(this,_f57);
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
VisualEditorBinding.prototype.normalizeToDocument=function(_f5a){
var _f5b=_f5a;
if(!this._isNormalizedDocument(_f5a)){
_f5a="\t\t"+_f5a.replace(/\n/g,"\n\t\t");
_f5b=VisualEditorBinding.XHTML.replace("${head}",this._getHeadSection()).replace("${body}",_f5a);
}
return _f5b;
};
VisualEditorBinding.prototype._isNormalizedDocument=function(_f5c){
var _f5d=false;
var doc=XMLParser.parse(_f5c,true);
if(doc!=null){
if(doc.documentElement.nodeName=="html"){
_f5d=true;
}
}
return _f5d;
};
VisualEditorBinding.prototype._getHeadSection=function(){
return this._head!=null?this._head:new String("");
};
VisualEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _f62=VisualEditorBinding.superclass.handleCommand.call(this,cmd,gui,val);
if(!_f62){
try{
this._tinyInstance.execCommand(cmd,gui,val);
this.checkForDirty();
}
catch(e){
SystemDebug.stack(arguments);
}
_f62=true;
}
return _f62;
};
VisualEditorBinding.prototype.handleContextMenu=function(e){
var _f64=DOMEvents.getTarget(e);
this._popupBinding.configure(this._tinyInstance,this._tinyEngine,_f64);
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
VisualEditorBinding.prototype.focus=function(){
};
VisualEditorBinding.prototype.blur=function(){
};
VisualEditorBinding.prototype.validate=function(){
return this._pageBinding.validate();
};
VisualEditorBinding.prototype.manifest=function(){
this.shadowTree.dotnetinput.value=encodeURIComponent(this.getValue());
};
VisualEditorBinding.prototype.getValue=function(){
return this._pageBinding.getContent();
};
VisualEditorBinding.prototype.setValue=function(_f65){
if(this._isFinalized){
if(Binding.exists(this._pageBinding)){
this._pageBinding.setContent(_f65);
}
}else{
if(this._startContent==null){
this._startContent=_f65;
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
VisualEditorBinding.prototype.setResult=function(_f66){
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
VisualEditorPopupBinding.prototype.configure=function(_f67,_f68,_f69){
var _f6a=this.editorBinding.hasSelection();
this.tinyInstance=_f67;
this.tinyEngine=_f68;
this.tinyElement=_f69;
this.hasSelection=_f6a;
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
var _f6e=false;
if(this.hasSelection){
_f6e=true;
}else{
if(this.tinyElement){
if(this.tinyElement.nodeName=="A"&&!this.tinyElement.getAttribute("name")){
_f6e=true;
}else{
if(this.tinyElement.nodeName=="IMG"){
_f6e=true;
}
}
}
}
if(_f6e){
this._showMenuGroups("link");
this._configureLinkGroupDetails();
}else{
this._hideMenuGroups("link");
}
};
VisualEditorPopupBinding.prototype._configureLinkGroupDetails=function(){
var _f6f=this.getMenuItemForCommand("compositeInsertLink");
var _f70=this.getMenuItemForCommand("unlink");
var _f71=this.editorBinding.getButtonForCommand("compositeInsertLink");
var _f72=this.editorBinding.getButtonForCommand("unlink");
_f70.setDisabled(_f72.isDisabled);
if(_f70.isDisabled){
_f6f.setLabel("Link");
}else{
_f6f.setLabel("Link properties");
}
};
VisualEditorPopupBinding.prototype._configureInsertGroup=function(){
var _f73=this.editorBinding.embedableFieldConfiguration;
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
if(_f73){
var _f76=_f73.getGroupNames();
if(_f76.hasEntries()){
var _f77=MenuPopupBinding.newInstance(doc);
var body=_f77.add(MenuBodyBinding.newInstance(doc));
var _f79=body.add(MenuGroupBinding.newInstance(doc));
_f76.each(function(_f7a){
var _f7b=_f73.getFieldNames(_f7a);
_f7b.each(function(_f7c){
var i=_f79.add(MenuItemBinding.newInstance(doc));
i.setLabel(_f7c);
i.setImage("${icon:field}");
i.setProperty("cmd","compositeInsertField");
i.setProperty("val",_f7a+":"+_f7c);
_f79.add(i);
});
});
item.add(_f77);
}
}else{
item.disable();
}
this._menuGroups["insertions"].getFirst().add(item);
item.attachRecursive();
this._menuItems["compositeInsertFieldParent"]=item;
};
VisualEditorPopupBinding.prototype._configureTableGroup=function(){
var _f7e=this.tinyInstance.dom.getParent(this.tinyElement,"table,td");
var _f7f=null;
var _f80=null;
if(_f7e){
if(_f7e.nodeName=="TD"){
_f7f=_f7e.getAttribute("colspan");
_f80=_f7e.getAttribute("rowspan");
}
this._menuItems["mceTableSplitCells"].setDisabled(_f7f=="1"&&_f80=="1");
this._menuItems["mceTablePasteRowBefore"].setDisabled(this.tinyInstance.tableRowClipboard==null);
this._menuItems["mceTablePasteRowAfter"].setDisabled(this.tinyInstance.tableRowClipboard==null);
}
if(_f7e){
this._showMenuGroups("table");
}else{
this._hideMenuGroups("table");
}
};
VisualEditorPopupBinding.prototype._configureRenderingGroup=function(){
var _f81=this._isRendering();
if(_f81){
this._showMenuGroups("rendering");
}else{
this._hideMenuGroups("rendering");
}
this._isRenderingSelected=_f81;
};
VisualEditorPopupBinding.prototype._configureFieldGroup=function(){
var _f82=this._isField();
if(_f82){
this._showMenuGroups("field");
}else{
this._hideMenuGroups("field");
}
this._isFieldSelected=_f82;
};
VisualEditorPopupBinding.prototype._configureImageGroup=function(){
if(this._isImage()&&!this._isRenderingSelected&&!this._isFieldSelected){
this._showMenuGroups("image");
}else{
this._hideMenuGroups("image");
}
};
VisualEditorPopupBinding.prototype._isImage=function(){
var _f83=false;
if(!this.hasSelection){
_f83=this.tinyElement&&this.tinyElement.nodeName=="IMG";
}
return _f83;
};
VisualEditorPopupBinding.prototype._isRendering=function(){
return this._isImage()&&CSSUtil.hasClassName(this.tinyElement,VisualEditorBinding.FUNCTION_CLASSNAME);
};
VisualEditorPopupBinding.prototype._isField=function(){
return this._isImage()&&CSSUtil.hasClassName(this.tinyElement,VisualEditorBinding.FIELD_CLASSNAME);
};
VisualEditorElementClassConfiguration._configurations=new Map();
VisualEditorElementClassConfiguration.getConfiguration=function(_f84){
var _f85=VisualEditorElementClassConfiguration._configurations;
if(!_f85.has(_f84)){
_f85.set(_f84,new VisualEditorElementClassConfiguration(EditorConfigurationService.GetElementClassConfiguration(_f84)));
}
return _f85.get(_f84);
};
function VisualEditorElementClassConfiguration(doc){
this.logger=SystemLogger.getLogger("VisualEditorElementClassConfiguration");
this._elements={};
var _f87=new XPathResolver();
var _f88=_f87.resolveAll("elements/element",doc);
while(_f88.hasNext()){
var _f89=_f88.getNext();
var _f8a=_f89.getAttribute("name");
this._elements[_f8a]=new List();
var _f8b=_f87.resolveAll("class",_f89);
while(_f8b.hasNext()){
var _f8c=_f8b.getNext().getAttribute("name");
this._elements[_f8a].add(_f8c);
}
}
}
VisualEditorElementClassConfiguration.prototype.getClassNamesForElement=function(name){
var _f8e=null;
if(this._elements[name]){
_f8e=this._elements[name].copy();
}else{
_f8e=new List();
}
return _f8e;
};
VisualEditorFormattingConfiguration._configurations=new Map();
VisualEditorFormattingConfiguration._options=null;
VisualEditorFormattingConfiguration.getConfiguration=function(_f8f){
var _f90=VisualEditorFormattingConfiguration._configurations;
if(!_f90.has(_f8f)){
_f90.set(_f8f,new VisualEditorFormattingConfiguration());
}
return _f90.get(_f8f);
};
VisualEditorFormattingConfiguration._getOptions=function(){
if(VisualEditorFormattingConfiguration._options==null){
var p="Composite.Web.VisualEditor";
VisualEditorFormattingConfiguration._options={"p":StringBundle.getString(p,"FormatSelector.LabelParagraph"),"address":StringBundle.getString(p,"FormatSelector.LabelAddress"),"blockquote":StringBundle.getString(p,"FormatSelector.LabelBlockQuote"),"div":StringBundle.getString(p,"FormatSelector.LabelDivision"),"h1":StringBundle.getString(p,"FormatSelector.LabelHeading1"),"h2":StringBundle.getString(p,"FormatSelector.LabelHeading2"),"h3":StringBundle.getString(p,"FormatSelector.LabelHeading3"),"h4":StringBundle.getString(p,"FormatSelector.LabelHeading4"),"h5":StringBundle.getString(p,"FormatSelector.LabelHeading5"),"h6":StringBundle.getString(p,"FormatSelector.LabelHeading6")};
}
return VisualEditorFormattingConfiguration._options;
};
function VisualEditorFormattingConfiguration(_f92){
this._options=VisualEditorFormattingConfiguration._getOptions();
}
VisualEditorFormattingConfiguration.prototype.getFormattingOptions=function(){
return this._options;
};
VisualEditorFieldGroupConfiguration._configurations=new Map();
VisualEditorFieldGroupConfiguration.getConfiguration=function(_f93){
var _f94=null;
var _f95=VisualEditorFieldGroupConfiguration._configurations;
if(!_f95.has(_f93)){
_f95.set(_f93,new VisualEditorFieldGroupConfiguration(EditorConfigurationService.GetEmbedableFieldGroupConfigurations(_f93)));
}
return _f95.get(_f93);
};
function VisualEditorFieldGroupConfiguration(_f96){
var _f97=new Map();
new List(_f96).each(function(_f98){
var map=new Map();
new List(_f98.Fields).each(function(_f9a){
map.set(_f9a.Name,{xhtml:_f9a.XhtmlRepresentation,xml:_f9a.XhtmlRepresentation});
});
_f97.set(_f98.GroupName,map);
});
this._groups=_f97;
}
VisualEditorFieldGroupConfiguration.prototype.getGroupNames=function(){
return this._groups.toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getFieldNames=function(_f9b){
return this._groups.get(_f9b).toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getTinyMarkup=function(_f9c,_f9d){
return this._groups.get(_f9c).get(_f9d).xhtml;
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
var _f9f=this.getDescendantElementsByLocalName("textarea");
while(_f9f.hasNext()){
var _fa0=_f9f.getNext();
if(_fa0.getAttribute("selected")=="true"){
this._startContent=_fa0.value;
this._textareaname=_fa0.getAttribute("placeholderid");
}
}
if(this._startContent==null){
this._startContent=VisualEditorBinding.DEFAULT_CONTENT;
}
};
VisualMultiEditorBinding.prototype._initialize=function(){
var self=this;
this._registerWithDataManager("generated"+KeyMaster.getUniqueKey());
var _fa2=this.getContentWindow().bindingMap.templatetree;
_fa2.addActionListener(TreeBinding.ACTION_SELECTIONCHANGED,{handleAction:function(_fa3){
var _fa4=_fa2.getSelectedTreeNodeBindings().getFirst();
self._placeHolderSelected(_fa4.textareaname);
_fa3.consume();
}});
this._updatePlaceHolders();
var _fa5=this.getContentWindow().bindingMap.toolsplitter;
_fa5.unCollapse();
VisualMultiEditorBinding.superclass._initialize.call(this);
};
VisualMultiEditorBinding.prototype._updatePlaceHolders=function(){
templatetree=this.getContentWindow().bindingMap.templatetree;
var _fa6=this.getDescendantElementsByLocalName("textarea");
templatetree.empty();
if(_fa6.hasEntries()){
this._hasPlaceHolders=true;
this._parsePlaceHolders(_fa6);
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
VisualMultiEditorBinding.prototype._parsePlaceHolders=function(_fa7){
this._textareas=new Map();
while(_fa7.hasNext()){
var _fa8=_fa7.getNext();
var _fa9=_fa8.getAttribute("placeholderid");
this._textareas.set(_fa9,{placeholderid:_fa9,placeholdername:_fa8.getAttribute("placeholdername"),placeholdermarkup:_fa8.value,textareaelement:_fa8,isSelected:_fa8.getAttribute("selected")=="true"});
}
var _faa=new Map();
this._textareas.each(function(name,_fac){
var _fad=templatetree.add(TreeNodeBinding.newInstance(templatetree.bindingDocument));
_fad.setLabel(_fac.placeholdername);
_fad.setImage("${icon:placeholder}");
_fad.setProperty("placeholder",true);
_fad.textareaname=name;
_faa.set(_fac.placeholdername,_fad);
if(_fac.isSelected){
selected=_fad;
}
});
templatetree.attachRecursive();
if(selected!=null){
var _fae=this._textareas.get(selected.textareaname);
this._textareaname=selected.textareaname;
this._placeholdername=_fae.placeholdername;
this._setContentFromPlaceHolder(selected.textareaname);
selected.focus();
}
};
VisualMultiEditorBinding.prototype._noPlaceHolders=function(){
var _faf=this.getContentWindow().bindingMap.templatetree;
var _fb0=_faf.add(TreeNodeBinding.newInstance(_faf.bindingDocument));
_fb0.setLabel(StringBundle.getString("Composite.Web.VisualEditor","TemplateTree.NoTemplateWarning"));
_fb0.setImage("${icon:warning}");
_fb0.attach();
var _fb1=this.getContentWindow().bindingMap.statusbar;
_fb1.setPlaceHolderName(null);
};
VisualMultiEditorBinding.prototype._setContentFromPlaceHolder=function(name){
if(this._isFinalized==true){
var _fb3=this._textareas.get(name);
var _fb4=_fb3.placeholdermarkup;
this.setValue(this.normalizeToDocument(_fb4));
this.resetUndoRedo();
}
};
VisualMultiEditorBinding.prototype._placeHolderSelected=function(_fb5){
if(this._isFinalized==true){
if(this._textareaname&&this._textareas.has(this._textareaname)){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
}
}
this._textareaname=_fb5;
this._placeholdername=this._textareas.get(this._textareaname).placeholdername;
var _fb6=this.getContentWindow().bindingMap.statusbar;
_fb6.setPlaceHolderName(this._placeholdername);
if(this._isFinalized==true){
var self=this;
Application.lock(self);
setTimeout(function(){
self._setContentFromPlaceHolder(_fb5);
Application.unlock(self);
},0);
}
};
VisualMultiEditorBinding.prototype.extractHead=function(html){
VisualMultiEditorBinding.superclass.extractHead.call(this,html);
this._heads.set(this._textareaname,this._head);
};
VisualMultiEditorBinding.prototype._getHeadSection=function(){
var _fb9="";
if(this._heads.has(this._textareaname)){
_fb9=this._heads.get(this._textareaname);
if(_fb9==null){
_fb9=new String("");
}
}
return _fb9;
};
VisualMultiEditorBinding.prototype.manifest=function(){
if(this._textareas!=null&&this._textareas.hasEntries()){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
this._textareas.each(function(name,_fbb){
_fbb.textareaelement.value=_fbb.placeholdermarkup;
});
}
};
VisualMultiEditorBinding.prototype.updateElement=function(_fbc,_fbd){
var _fbe=_fbc.getElementsByTagName("div").item(0);
var _fbf=_fbd.getElementsByTagName("div").item(0);
var _fc0=new List(_fbe.getElementsByTagName("textarea"));
var _fc1=new List(_fbf.getElementsByTagName("textarea"));
var _fc2=false;
if(_fc0.getLength()!=_fc1.getLength()){
_fc2=true;
}else{
var _fc3=0;
_fc0.each(function(_fc4,_fc5){
var _fc6=_fc1.get(_fc5);
var _fc7=_fc4.getAttribute("placeholderid");
var _fc8=_fc6.getAttribute("placeholderid");
var _fc9=_fc4.getAttribute("placeholdername");
var _fca=_fc6.getAttribute("placeholdername");
if(_fc7!=_fc8||_fc9!=_fca){
_fc2=true;
}
return !_fc2;
});
}
if(_fc2){
var html=null;
if(_fbe.innerHTML!=null){
html=_fbe.innerHTML;
}else{
html=DOMSerializer.serialize(_fbe);
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
var _fce=this.getDescendantBindingByLocalName("selector");
_fce.attach();
var _fcf=this.getContentWindow().bindingMap.templateselector;
_fce.selections.each(function(_fd0){
_fd0.imageProfile=new ImageProfile({image:"${icon:page-template-template}"});
});
_fcf.populateFromList(_fce.selections);
_fcf.addActionListener(SelectorBinding.ACTION_SELECTIONCHANGED,{handleAction:function(){
_fce.selectByValue(_fcf.getValue());
_fce.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
self.checkForDirty(true);
}});
this.getContentWindow().bindingMap.templatetoolbar.show();
VisualMultiTemplateEditorBinding.superclass._initialize.call(this);
};
VisualMultiTemplateEditorBinding.prototype._parsePlaceHolders=function(_fd1){
var nev=this._textareas;
var old=this._oldtextareas;
if(nev!=null){
nev.each(function(key,_fd5){
old.set(key,_fd5);
});
}
this._textareas=new Map();
function compute(_fd6,_fd7){
var _fd8=_fd7;
if(old.has(_fd6)){
_fd8=old.get(_fd6).placeholdermarkup;
}
return _fd8;
}
while(_fd1.hasNext()){
var _fd9=_fd1.getNext();
var _fda=_fd9.getAttribute("placeholderid");
this._textareas.set(_fda,{placeholderid:_fda,placeholdername:_fd9.getAttribute("placeholdername"),placeholdermarkup:compute(_fda,_fd9.value),textareaelement:_fd9,isSelected:_fd9.getAttribute("selected")=="true"});
}
var _fdb=null;
var _fdc=this.getContentWindow().bindingMap.templatetree;
var _fdd=new Map();
this._textareas.each(function(name,_fdf){
var _fe0=_fdc.add(TreeNodeBinding.newInstance(_fdc.bindingDocument));
_fe0.setLabel(_fdf.placeholdername);
_fe0.setImage("${icon:placeholder}");
_fe0.setProperty("placeholder",true);
_fe0.textareaname=name;
_fdd.set(_fdf.placeholdername,_fe0);
if(_fdf.isSelected){
_fdb=_fe0;
}
});
_fdc.attachRecursive();
if(_fdb!=null){
var _fe1=true;
if(this._oldtextareas.hasEntries()){
_fe1=false;
var map=new Map();
this._textareas.each(function(id,_fe4){
map.set(_fe4.placeholdername,true);
});
if(!map.has(this._placeholdername)){
_fe1=true;
}
}
if(_fe1){
var _fe5=this._textareas.get(_fdb.textareaname);
this._textareaname=_fdb.textareaname;
this._placeholdername=_fe5.placeholdername;
this._setContentFromPlaceHolder(_fdb.textareaname);
_fdb.focus();
}else{
var _fe6=_fdd.get(this._placeholdername);
this._textareaname=_fe6.textareaname;
_fe6.focus();
}
}
};
SourceEditorBinding.prototype=new EditorBinding;
SourceEditorBinding.prototype.constructor=SourceEditorBinding;
SourceEditorBinding.superclass=EditorBinding.prototype;
SourceEditorBinding.ACTION_INITIALIZED="sourceeditor initialized";
SourceEditorBinding.syntax={XML:"xml",ASP:"asp",CSHARP:"csharp",CSS:"css",HTML:"html",JAVA:"java",JAVASCRIPT:"javascript",PERL:"perl",PHP:"php",RUBY:"ruby",SQL:"sql",TEXT:"text",VBSCRIPT:"vbscript",XSL:"xsl"};
function SourceEditorBinding(){
this.logger=SystemLogger.getLogger("SourceEditorBinding");
this.action_initialized=SourceEditorBinding.ACTION_INITIALIZED;
this.url_default="${root}/content/misc/editors/sourceeditor/sourceeditor.aspx?language=${syntax}";
this._editorWindowBinding=null;
this._codePressFrame=null;
this._codePressEngine=null;
this.syntax=new String(SourceEditorBinding.syntax.TEXT);
this._isPlainEditMode=false;
this.isFocusable=true;
this._isEmbedded=false;
this._hasStrictValidation=false;
this._validator=null;
return this;
}
SourceEditorBinding.prototype.toString=function(){
return "[SourceEditorBinding]";
};
SourceEditorBinding.prototype.onBindingAttach=function(){
if(Client.isMozilla==true){
this.subscribe(BroadcastMessages.CODEPRESS_INITIALIZED);
}
if(this.getProperty("embedded")==true){
this._isEmbedded=true;
}
var _fe7=this.getProperty("validate");
if(_fe7==true){
this._hasStrictValidation=true;
}
var _fe8=this.getProperty("validator");
if(_fe8!=null){
this._validator=_fe8;
}
this.syntax=this.getProperty("syntax");
this._url=this._url.replace("${syntax}",this.syntax);
if(this.getProperty("debug")){
this._startContent=Templates.getPlainText("sourcecodeeditor/"+this.syntax+".txt");
}
SourceEditorBinding.superclass.onBindingAttach.call(this);
};
SourceEditorBinding.prototype.handleBroadcast=function(_fe9,arg){
SourceEditorBinding.superclass.handleBroadcast.call(this,_fe9,arg);
switch(_fe9){
case BroadcastMessages.CODEPRESS_INITIALIZED:
var _feb=this.getContentWindow().bindingMap.codepresswindow;
if(_feb){
var _fec=_feb.getContentWindow();
if(arg.broadcastWindow==_fec){
this._editorWindowBinding=_feb;
this._codePressFrame=arg.codePressFrame;
this._codePressEngine=arg.codePressFrame.editor;
this.initializeEditorComponents(_feb);
if(this._pageBinding!=null){
this._initialize();
}
if(!this._isEmbedded){
this.blurEditor();
}
this.unsubscribe(BroadcastMessages.CODEPRESS_INITIALIZED);
}
}
break;
}
};
SourceEditorBinding.prototype._onPageInitialize=function(_fed){
SourceEditorBinding.superclass._onPageInitialize.call(this,_fed);
if(Client.isExplorer||this._codePressEngine!=null){
this._initialize();
}
};
SourceEditorBinding.prototype.debug=function(){
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
SourceEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _ff3=SourceEditorBinding.superclass.handleCommand.call(this,cmd,val);
switch(cmd){
case "Paste":
this._codePressFrame.syntaxHighlight("generic");
break;
}
return _ff3;
};
SourceEditorBinding.prototype._finalize=function(){
this.setContent(this._startContent);
SourceEditorBinding.superclass._finalize.call(this);
};
SourceEditorBinding.prototype.initializeEditorComponent=function(_ff4){
_ff4.initializeSourceEditorComponent(this,this._codePressFrame,this._codePressEngine);
};
SourceEditorBinding.prototype.clean=function(){
SourceEditorBinding.superclass.clean.call(this);
this.getContentWindow().bindingMap.editorpage.clean();
};
SourceEditorBinding.prototype.handleContextMenu=function(e){
this._popupBinding.configure(this,this._codePressFrame,this._codePressEngine);
SourceEditorBinding.superclass.handleContextMenu.call(this,e);
};
SourceEditorBinding.prototype.getEditorPopupBinding=function(){
return top.app.bindingMap.sourcecodeeditorpopup;
};
SourceEditorBinding.prototype.getEditorWindow=function(){
return this._codePressFrame.contentWindow;
};
SourceEditorBinding.prototype.getEditorDocument=function(){
var _ff6=null;
if(this._codePressFrame!=null){
_ff6=this._codePressFrame.contentWindow.document;
}
return _ff6;
};
SourceEditorBinding.prototype.setContent=function(_ff7){
if(!this._isFinalized){
if(_ff7!=this._startContent){
this._startContent=_ff7;
}
}
if(this.isInitialized){
_ff7=_ff7.replace(/&#xA;/g,"\n");
this.getContentWindow().bindingMap.editorpage.setContent(_ff7);
this.resetUndoRedo();
this._checksum=this.getCheckSum();
}
return true;
};
SourceEditorBinding.prototype.getContent=function(){
var _ff8=this.getContentWindow().bindingMap.editorpage.getContent();
return _ff8?_ff8:"";
};
SourceEditorBinding.prototype.resetUndoRedo=function(){
this.logger.warn("SourceEditorBinding.prototype.resetUndoRedo!!!");
if(this._codePressEngine){
this._codePressEngine.actions.pos=-1;
}
};
SourceEditorBinding.prototype.cover=function(_ff9){
this._pageBinding.cover(_ff9);
};
SourceEditorBinding.prototype.updateElement=function(_ffa){
if(_ffa!=null&&this.shadowTree.dotnetinput!=null){
var _ffb=_ffa.getAttribute("value");
if(_ffb!=null&&_ffb!=this.shadowTree.dotnetinput.value){
this.setValue(decodeURIComponent(_ffb));
}
}
return true;
};
SourceEditorBinding.prototype.focus=function(){
};
SourceEditorBinding.prototype.blur=function(){
};
SourceEditorBinding.prototype.validate=function(){
var _ffc=true;
var _ffd=this.getContent();
if(this._validator!=null){
_ffc=Validator.validateInformed(_ffd,this._validator);
}else{
switch(this.syntax){
case SourceEditorBinding.syntax.XML:
case SourceEditorBinding.syntax.XSL:
case SourceEditorBinding.syntax.HTML:
_ffc=XMLParser.isWellFormedDocument(_ffd,true);
if(_ffc==true&&this._hasStrictValidation){
switch(this.syntax){
case SourceEditorBinding.syntax.HTML:
_ffc=this._isValidHTML(_ffd);
break;
}
}
break;
}
}
return _ffc;
};
SourceEditorBinding.prototype._isValidHTML=function(xml){
var _fff=true;
var doc=XMLParser.parse(xml);
var _1001=new List();
if(doc!=null){
var root=doc.documentElement;
if(root.nodeName!="html"){
_1001.add("MissingHtml");
}
if(root.namespaceURI!=Constants.NS_XHTML){
_1001.add("NamespaceURI");
}
var head=null,body=null;
var _1005=new List(root.childNodes);
while(_1005.hasNext()){
var child=_1005.getNext();
if(child.nodeType==Node.ELEMENT_NODE){
switch(child.nodeName){
case "head":
if(head!=null){
_1001.add("MultipleHead");
}
if(body!=null){
_1001.add("HeadBodyIndex");
}
head=child;
break;
case "body":
if(body!=null){
_1001.add("MultipleBody");
}
body=child;
break;
}
}
}
if(head==null){
_1001.add("MissingHead");
}
if(body==null){
_1001.add("MissingBody");
}
}
if(_1001.hasEntries()){
_fff=false;
Dialog.error(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML.DialogTitle"),StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_1001.getFirst()));
}
return _fff;
};
SourceEditorBinding.prototype._isValidXSL=function(){
return true;
};
SourceEditorBinding.prototype.manifest=function(){
this.shadowTree.dotnetinput.value=encodeURIComponent(this.getValue());
};
SourceEditorBinding.prototype.getValue=SourceEditorBinding.prototype.getContent;
SourceEditorBinding.prototype.setValue=SourceEditorBinding.prototype.setContent;
SourceEditorBinding.prototype.getResult=SourceEditorBinding.prototype.getContent;
SourceEditorBinding.prototype.setResult=SourceEditorBinding.prototype.setContent;
SourceEditorBinding.prototype.createBookmark=function(){
};
SourceEditorBinding.prototype.restoreBookmark=function(){
};
SourceEditorBinding.prototype.hasBookmark=function(){
};
SourceEditorBinding.prototype.deleteBookmark=function(){
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
SourceEditorPopupBinding.prototype.configure=function(_1007,frame,_1009){
this._editorBinding=_1007;
this._codePressFrame=frame;
this._codePressEngine=_1009;
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
ThrobberBinding.prototype.handleBroadcast=function(_100f,arg){
ThrobberBinding.superclass.handleBroadcast.call(this,_100f,arg);
switch(_100f){
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
ProgressBarBinding.notch=function(_1012){
ProgressBarBinding._bindingInstance.notch(_1012);
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
ProgressBarBinding.prototype.notch=function(_1013){
_1013=_1013?_1013:1;
var width=this._cover.getWidth()-(ProgressBarBinding.NOTCH*_1013);
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
StartMenuItemBinding.prototype.handleBroadcast=function(_1015,arg){
StartMenuItemBinding.superclass.handleBroadcast.call(this,_1015,arg);
switch(_1015){
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
StartMenuItemBinding.prototype.setChecked=function(_1017,_1018){
StartMenuItemBinding.superclass.setChecked.call(this,_1017,_1018);
if(!_1018){
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
KeySetBinding.registerKeyEventHandler=function(doc,key,_101b,_101c){
var _101d=KeySetBinding.keyEventHandlers;
if(Interfaces.isImplemented(IKeyEventHandler,_101c,true)==true){
if(_101b!="*"){
_101b=KeySetBinding._sanitizeKeyModifiers(_101b);
}
var code=window.KeyEventCodes[key];
if(!code){
code=key.charCodeAt(0);
}
if(!_101d[doc]){
_101d[doc]={};
}
if(!_101d[doc][code]){
_101d[doc][code]={};
}
_101d[doc][code][_101b]=_101c;
}
};
KeySetBinding.handleKey=function(doc,e){
var _1021=false;
var code=e.keyCode;
var _1023=KeySetBinding.keyEventHandlers;
if(_1023[doc]&&_1023[doc][code]){
var _1024="[default]";
_1024+=code!=KeyEventCodes.VK_SHIFT?e.shiftKey?" shift":"":"";
_1024+=code!=KeyEventCodes.VK_CONTROL?e.ctrlKey?" control":"":"";
var _1025=_1023[doc][code][_1024];
if(_1025==null){
_1025=_1023[doc][code]["*"];
}
if(_1025!=null){
_1025.handleKeyEvent(e);
_1021=true;
}
}
return _1021;
};
KeySetBinding._sanitizeKeyModifiers=function(_1026){
var _1027="[default]";
var mods={};
if(_1026){
new List(_1026.split(" ")).each(function(_1029){
mods[_1029]=true;
});
function check(_102a){
if(mods[_102a]){
_1027+=" "+_102a;
}
}
check("shift");
check("control");
}
return _1027;
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
var _102e=key.getAttribute("oncommand");
var _102f=key.getAttribute("preventdefault")=="true";
if(Client.isExplorer){
_102e=Binding.parseScriptStatement(_102e,self.key);
}
KeySetBinding.registerKeyEventHandler(self.bindingDocument,key.getAttribute("key"),key.getAttribute("modifiers"),{handleKeyEvent:function(e){
DOMEvents.stopPropagation(e);
if(_102f){
DOMEvents.preventDefault(e);
}
var _1031=self.bindingWindow.WindowManager;
top.setTimeout(function(){
_1031.evaluate(_102e);
},0);
}});
});
};
CursorBinding.prototype=new Binding;
CursorBinding.prototype.constructor=CursorBinding;
CursorBinding.superclass=Binding.prototype;
CursorBinding.fadeIn=function(_1032){
if(_1032 instanceof CursorBinding){
_1032.setOpacity(0);
_1032.show();
new Animation({modifier:Client.isExplorer?18:9,onstep:function(_1033){
_1032.setOpacity(Math.sin(_1033*Math.PI/180));
},onstop:function(){
_1032.setOpacity(1);
}}).play();
}
};
CursorBinding.fadeOut=function(_1034){
if(_1034 instanceof CursorBinding){
new Animation({modifier:Client.isExplorer?18:9,onstep:function(_1035){
_1034.setOpacity(Math.cos(_1035*Math.PI/180));
},onstop:function(){
_1034.hide();
}}).play();
}
};
CursorBinding.moveOut=function(_1036,_1037,_1038){
if(_1036 instanceof CursorBinding){
_1038.x-=16;
_1038.y-=16;
new Animation({modifier:3,onstep:function(_1039){
var tal=Math.sin(_1039*Math.PI/180);
_1036.setPosition(new Point(((1-tal)*_1037.x)+((0+tal)*_1038.x),((1-tal)*_1037.y)+((0+tal)*_1038.y)));
},onstop:function(){
CursorBinding.fadeOut(_1036);
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
CursorBinding.prototype.setOpacity=function(_103f){
if(Client.isMozilla){
this.bindingElement.style.MozOpacity=new String(_103f);
}else{
this.bindingElement.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+new String(_103f*100)+")";
}
this._opacity=_103f;
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
function setOpacity(_1042){
if(Client.isMozilla){
cover.bindingElement.style.opacity=new String(_1042);
}else{
cover.bindingElement.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+new String(_1042*100)+")";
}
}
if(cover instanceof CoverBinding){
new Animation({modifier:Client.isExplorer?30:18,onstep:function(_1043){
if(Binding.exists(cover)){
setOpacity(Math.cos(_1043*Math.PI/180));
}
},onstop:function(){
if(Binding.exists(cover)){
cover.hide();
}
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
CoverBinding.prototype.setBusy=function(_1045){
if(_1045!=this._isBusy){
if(_1045){
this.bindingElement.style.cursor="wait";
}else{
this.bindingElement.style.cursor="default";
}
this._isBusy=_1045;
}
};
CoverBinding.prototype.setTransparent=function(_1046){
if(_1046!=this._isTransparent){
if(_1046){
this.attachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}else{
this.detachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}
this._isTransparent=_1046;
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
CoverBinding.prototype.setHeight=function(_1048){
if(_1048>=0){
this.bindingElement.style.height=new String(_1048+"px");
}
};
CoverBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
CoverBinding.newInstance=function(_1049){
var _104a=DOMUtil.createElementNS(Constants.NS_UI,"ui:cover",_1049);
return UserInterface.registerBinding(_104a,CoverBinding);
};
UncoverBinding.prototype=new Binding;
UncoverBinding.prototype.constructor=UncoverBinding;
UncoverBinding.superclass=Binding.prototype;
UncoverBinding._bindingInstance=null;
UncoverBinding.uncover=function(pos){
var _104c=UncoverBinding._bindingInstance;
if(Binding.exists(_104c)){
_104c.setPosition(pos);
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
return this;
}
TheatreBinding.prototype.toString=function(){
return "[TheatreBinding]";
};
TheatreBinding.prototype.onBindingAttach=function(){
TheatreBinding.superclass.onBindingAttach.call(this);
var self=this;
function init(){
self.hide();
self.bindingElement.style.top="0";
self.bindingElement.style.left="0";
}
if(Client.isExplorer&&Client.hasFlash){
var html="";
html+="<object id=\"offlineflash\" type=\"application/x-shockwave-flash\" data=\"flash/CompositeMasterBlock2.swf\" height=\"100%\" width=\"100%\">";
html+="<param name=\"movie\" value=\"flash/CompositeMasterBlock2.swf\"/>";
html+="<param name=\"scale\" value=\"exactfit\"/>";
html+="<param name=\"wmode\" value=\"transparent\"/>";
html+="<param name=\"allowScriptAccess\" value=\"always\"/>";
html+="</object>";
var self=this;
EventBroadcaster.subscribe(BroadcastMessages.OFFLINE_FLASH_INITIALIZED,{handleBroadcast:function(){
init();
}});
var div=this.bindingDocument.getElementById("offlinemovie");
div.innerHTML=html;
}else{
init();
}
};
TheatreBinding.prototype.play=function(){
if(!this._isPlaying){
Application.lock(this);
this.show();
this._fadeInFlash();
this._isPlaying=true;
}
};
TheatreBinding.prototype._fadeInFlash=function(){
if(Client.isExplorer&&Client.hasFlash){
var flash=this.bindingDocument.getElementById("offlineflash");
if(typeof flash.fadeIn!=Types.UNDEFINED){
flash.fadeIn();
}else{
this.logger.error("Flash object could not be scripted!");
}
}
};
TheatreBinding.prototype.stop=function(){
if(this._isPlaying==true){
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
var _1054=SourceCodeViewerBinding.stylesheets[this._syntax];
this._transformer=new XSLTransformer();
this._transformer.importStylesheet(_1054);
break;
default:
throw "SourceCodeViewer: Syntax error!";
this._syntax=null;
break;
}
var _1055=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_1055){
this._startcontent=_1055.value;
}
this.setURL(SourceCodeViewerBinding.URL_DEFAULT);
this.addActionListener(WindowBinding.ACTION_ONLOAD);
SourceCodeViewerBinding.superclass.onBindingAttach.call(this);
};
SourceCodeViewerBinding.prototype.handleAction=function(_1056){
SourceCodeViewerBinding.superclass.handleAction.call(this,_1056);
switch(_1056.type){
case WindowBinding.ACTION_ONLOAD:
if(_1056.target==this){
if(this._startcontent){
this.view(this._startcontent);
}
this.dispatchAction(SourceCodeViewerBinding.ACTION_INITIALIZED);
_1056.consume();
}
break;
}
SourceCodeViewerBinding.superclass.handleAction.call(this,_1056);
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
var _105a=this._transformer.transformToString(doc);
this._inject(_105a);
}
};
SourceCodeViewerBinding.prototype._viewHTML=function(arg){
};
SourceCodeViewerBinding.prototype._viewJavascript=function(arg){
};
SourceCodeViewerBinding.prototype._inject=function(_105d){
this.getContentDocument().body.innerHTML=_105d;
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
var _1065=list.getNext();
var id=_1065.getAttribute("id");
map[id]={};
var atts=this._resolver.resolveAll("p:att",_1065);
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
elm.setAttribute("version",License.versionString);
while(elm.hasChildNodes()){
elm.removeChild(elm.lastChild);
}
for(var id in map){
var _106f=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"persist",doc);
_106f.setAttribute("id",id);
for(var name in map[id]){
var att=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"att",doc);
att.setAttribute("name",name);
att.setAttribute("value",map[id][name]);
_106f.appendChild(att);
}
elm.appendChild(_106f);
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
var _1079=window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance;
if(_1079){
doc=XMLParser.parse(_1079);
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
var _107d=DOMSerializer.serialize(doc,true);
window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance=_107d;
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
LocalizationSelectorBinding.prototype.handleBroadcast=function(_107e,arg){
LocalizationSelectorBinding.superclass.handleBroadcast.call(this,_107e,arg);
switch(_107e){
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
var _1081=new List();
list.each(function(lang){
_1081.add(new SelectorBindingSelection(lang.Name,lang.SerializedActionToken,lang.IsCurrent,null));
});
this.populateFromList(_1081);
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
Dialog.warning(StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogTitle"),StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogText"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_1085){
switch(_1085){
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
var _1088=new SystemAction({Label:"Generated Action: Change Locale",ActionToken:token});
SystemAction.invoke(_1088,root);
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
var _1089=this.getProperty("status");
if(_1089!=null){
switch(_1089){
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
this.logger.debug("Client MessageQueue index: "+MessageQueue.index+"\n"+"Server MessageQueue index: "+index);
if(index>MessageQueue.index){
this.logger.debug("Updating the MessageQueue :)");
MessageQueue.update();
}
}
};
function UserInterfaceMapping(map){
this.logger=SystemLogger.getLogger("UserInterfaceMapping");
this.map=map;
}
UserInterfaceMapping.prototype.merge=function(_108c){
for(var _108d in _108c.map){
this.map[_108d]=_108c.getBindingImplementation(_108d);
}
};
UserInterfaceMapping.prototype.getBindingImplementation=function(_108e){
var _108f=null;
var name=_108e.nodeName;
if(Client.isExplorer){
var small=name.toLowerCase();
if(name==small){
name="ui:"+name;
}else{
name=small;
}
}
if(this.map[name]){
_108f=this.map[name];
}
return _108f;
};
var UserInterface=new function(){
var _1092=(Client.isMozilla?MozEditorTextBoxBinding:IEEditorTextBoxBinding);
var _1093=new UserInterfaceMapping({"body":RootBinding,"ui:binding":Binding,"ui:box":Binding,"ui:dialog":DialogBinding,"ui:dialoghead":DialogHeadBinding,"ui:dialogbody":DialogBodyBinding,"ui:dialogmatrix":DialogMatrixBinding,"ui:dialogset":DialogSetBinding,"ui:dialogborder":DialogBorderBinding,"ui:dialogcover":DialogCoverBinding,"ui:titlebar":DialogTitleBarBinding,"ui:titlebarbody":DialogTitleBarBodyBinding,"ui:window":WindowBinding,"ui:controlgroup":ControlGroupBinding,"ui:control":ControlBinding,"ui:menubar":MenuBarBinding,"ui:menu":MenuBinding,"ui:menubody":MenuBodyBinding,"ui:menugroup":MenuGroupBinding,"ui:menuitem":MenuItemBinding,"ui:menupopup":MenuPopupBinding,"ui:tabbox":TabBoxBinding,"ui:tabs":TabsBinding,"ui:tab":TabBinding,"ui:tabpanels":TabPanelsBinding,"ui:tabpanel":TabPanelBinding,"ui:splitbox":SplitBoxBinding,"ui:splitpanel":SplitPanelBinding,"ui:splitter":SplitterBinding,"ui:decks":DecksBinding,"ui:deck":DeckBinding,"ui:toolbar":ToolBarBinding,"ui:toolbargroup":ToolBarGroupBinding,"ui:toolbarbody":ToolBarBodyBinding,"ui:toolbarbutton":ToolBarButtonBinding,"ui:toolbarlabel":ToolBarLabelBinding,"ui:labelbox":LabelBinding,"ui:text":TextBinding,"ui:clickbutton":ClickButtonBinding,"ui:tree":TreeBinding,"ui:treebody":TreeBodyBinding,"ui:treenode":TreeNodeBinding,"ui:flexbox":FlexBoxBinding,"ui:scrollbox":ScrollBoxBinding,"ui:popupset":PopupSetBinding,"ui:popup":PopupBinding,"ui:shadow":ShadowBinding,"ui:matrix":MatrixBinding,"ui:sourceeditor":SourceEditorBinding,"ui:visualeditor":VisualEditorBinding,"ui:visualmultieditor":VisualMultiEditorBinding,"ui:visualmultitemplateeditor":VisualMultiTemplateEditorBinding,"ui:wysiwygeditortoolbarbutton":EditorToolBarButtonBinding,"ui:dock":DockBinding,"ui:docktabs":DockTabsBinding,"ui:docktab":DockTabBinding,"ui:dockpanels":DockPanelsBinding,"ui:dockpanel":DockPanelBinding,"ui:page":PageBinding,"ui:editorpage":EditorPageBinding,"ui:dialogpage":DialogPageBinding,"ui:pagebody":DialogPageBodyBinding,"ui:wizardpage":WizardPageBinding,"ui:explorer":ExplorerBinding,"ui:explorerdecks":ExplorerDecksBinding,"ui:explorerdeck":ExplorerDeckBinding,"ui:explorersplitter":ExplorerSplitterBinding,"ui:explorermenu":ExplorerMenuBinding,"ui:explorertoolbar":ExplorerToolBarBinding,"ui:explorertoolbarbutton":ExplorerToolBarButtonBinding,"ui:stagecontainer":StageContainerBinding,"ui:stage":StageBinding,"ui:stagedecks":StageDecksBinding,"ui:stagedeck":StageDeckBinding,"ui:viewset":ViewSetBinding,"ui:view":ViewBinding,"ui:broadcasterset":BroadcasterSetBinding,"ui:broadcaster":BroadcasterBinding,"ui:fields":FieldsBinding,"ui:fieldgroup":FieldGroupBinding,"ui:field":FieldBinding,"ui:fielddesc":FieldDescBinding,"ui:fielddata":FieldDataBinding,"ui:fieldhelp":FieldHelpBinding,"ui:datainput":DataInputBinding,"ui:selector":SelectorBinding,"ui:simpleselector":SimpleSelectorBinding,"ui:multiselector":MultiSelectorBinding,"ui:datainputselector":DataInputSelectorBinding,"ui:datainputdialog":DataInputDialogBinding,"ui:textbox":TextBoxBinding,"ui:editortextbox":_1092,"ui:radiodatagroup":RadioDataGroupBinding,"ui:radio":RadioDataBinding,"ui:checkbutton":CheckButtonBinding,"ui:checkbox":CheckBoxBinding,"ui:checkboxgroup":CheckBoxGroupBinding,"ui:datadialog":DataDialogBinding,"ui:postbackdialog":PostBackDataDialogBinding,"ui:htmldatadialog":HTMLDataDialogBinding,"ui:functioneditor":FunctionEditorDataBinding,"ui:parametereditor":ParameterEditorDataBinding,"ui:keyset":KeySetBinding,"ui:cover":CoverBinding,"ui:uncover":UncoverBinding,"ui:cursor":CursorBinding,"ui:dialogtoolbar":DialogToolBarBinding,"ui:focus":FocusBinding,"ui:balloonset":BalloonSetBinding,"ui:balloon":BalloonBinding,"ui:error":ErrorBinding,"ui:throbber":ThrobberBinding,"ui:progressbar":ProgressBarBinding,"ui:lazybinding":LazyBindingBinding,"ui:sourcecodeviewer":SourceCodeViewerBinding,"ui:theatre":TheatreBinding,"ui:persistance":PersistanceBinding,"ui:filepicker":FilePickerBinding,"ui:request":RequestBinding,"ui:response":ResponseBinding});
var _1094=SystemLogger.getLogger("UserInterface");
var keys={};
this.registerBinding=function(_1096,impl){
var _1098=null;
if(!this.hasBinding(_1096)){
var _1099=DOMUtil.getParentWindow(_1096);
if(DOMUtil.getLocalName(_1096)!="bindingmapping"){
if(!impl&&_1096.getAttribute("binding")!=null){
var _109a=_1096.getAttribute("binding");
impl=_1099[_109a];
if(impl==null){
throw "No such binding in scope: "+_109a;
}
}
if(!impl){
var _109b=_1099.DocumentManager;
if(_109b){
var _109c=_109b.customUserInterfaceMapping;
if(_109c){
impl=_109c.getBindingImplementation(_1096);
}
}
}
if(!impl){
impl=_1093.getBindingImplementation(_1096);
}
if(impl!=null&&!Application.isMalFunctional){
try{
_1098=new impl();
}
catch(exception){
Application.isMalFunctional=true;
alert("No such binding!\n"+exception.message+(exception.stack?"\n"+exception.stack:""));
throw (exception);
}
}
if(_1098){
var key=KeyMaster.getUniqueKey();
_1096.setAttribute("key",key);
_1098.key=key;
if(!_1096.id){
_1096.id=key;
}
keys[key]={element:_1096,binding:_1098};
_1098.onBindingRegister();
}
}
}
return _1098;
};
this.unRegisterBinding=function(_109e){
terminate(_109e);
};
function terminate(_109f){
if(Binding.exists(_109f)==true){
var key=_109f.key;
Binding.destroy(_109f);
if(key){
if(keys[key]){
keys[key].binding=null;
keys[key].element=null;
delete keys[key];
_109f=null;
}else{
_1094.error("URGH: "+key);
}
}
}
}
this.getElement=function(_10a1){
var _10a2=null;
if(keys[_10a1.key]){
_10a2=keys[_10a1.key].element;
}
return _10a2;
};
this.getBinding=function(_10a3){
var _10a4=null;
if(_10a3&&_10a3.nodeType==Node.ELEMENT_NODE){
try{
var key=_10a3.getAttribute("key");
if(key&&keys[key]){
_10a4=keys[key].binding;
}
}
catch(exception){
alert("getBinding exception occured on element:\n\n\t\t"+_10a3);
if(exception.stack){
alert(exception.stack);
}
}
}
return _10a4;
};
this.getBindingByKey=function(key){
var _10a7=null;
if(keys[key]){
_10a7=keys[key].binding;
}
return _10a7;
};
this.hasBinding=function(_10a8){
return this.getBinding(_10a8)!=null;
};
this.isBindingVisible=function(_10a9){
var _10aa=Application.isOperational;
if(_10aa==true){
var _10ab=new Crawler();
_10ab.type=NodeCrawler.TYPE_ASCENDING;
_10ab.id="visibilitycrawler";
_10ab.addFilter(function(_10ac){
var b=UserInterface.getBinding(_10ac);
var res=0;
if(!b.isVisible){
_10aa=false;
res=NodeCrawler.STOP_CRAWLING;
}
return res;
});
_10ab.crawl(_10a9.bindingElement);
_10ab.dispose();
}
return _10aa;
};
var _10af=null;
this.getBindingCount=function(){
var count=0;
for(var key in keys){
count++;
}
return count;
};
this.setPoint=function(){
_10af={};
for(var key in keys){
_10af[key]=true;
}
};
this.getPoint=function(){
var _10b3=null;
if(_10af){
_10b3=new List();
for(var key in keys){
if(!_10af[key]){
_10b3.add(key);
}
}
}
return _10b3;
};
this.clearPoint=function(){
_10af=null;
};
this.trackUndisposedBindings=function(){
var _10b5=null;
for(var key in keys){
var entry=keys[key];
if(!entry.binding||!entry.element||!Binding.exists(entry.binding)){
if(!_10b5){
_10b5="Bindings illdisposed: ";
}
_10b5+=entry.binding+" ";
}
}
if(_10b5!=null){
_1094.error(_10b5);
}
};
this.autoTrackDisposedBindings=function(_10b8){
if(_10b8){
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
SOAPRequest.newInstance=function(_10b9,_10ba){
var _10bb=_10b9+"/"+_10ba;
var _10bc=new SOAPRequest(_10bb);
var _10bd=SOAPRequest.resolver;
_10bc.document=Templates.getTemplateDocument("soapenvelope.xml");
_10bc.envelope=_10bd.resolve("soap:Envelope",_10bc.document);
_10bc.header=_10bd.resolve("soap:Header",_10bc.envelope);
_10bc.body=_10bd.resolve("soap:Body",_10bc.envelope);
return _10bc;
};
SOAPRequest._parseResponse=function(_10be){
var _10bf=null;
var _10c0=false;
var doc=_10be.responseXML;
if(doc!=null&&doc.documentElement!=null){
switch(doc.documentElement.namespaceURI){
case Constants.NS_ENVELOPE:
_10bf=SOAPRequestResponse.newInstance(_10be.responseXML);
if(Application.isOffLine){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_ONLINE);
}
break;
case Constants.NS_XHTML:
if(!Application.isOffLine){
var body=SOAPRequest.resolver.resolve("xhtml:html/xhtml:body",_10be.responseXML);
if(body&&body.getAttribute("id")=="offline"){
_10c0=true;
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
var text=_10be.responseText;
if(text.indexOf("id=\"offline\"")>-1){
_10c0=true;
}else{
var cry="Invalid SOAP response: \n\n"+_10be.responseText;
SystemLogger.getLogger("SOAPRequest._parseResponse (static)").error(cry);
if(Application.isDeveloperMode){
alert("Invalid SOAP response");
window.open("about:blank").document.write(_10be.responseText);
}
}
}
}
if(_10c0==true){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_OFFLINE);
}
return _10bf;
};
function SOAPRequest(_10c5){
this.logger=SystemLogger.getLogger("SOAPRequest");
this.action=_10c5;
return this;
}
SOAPRequest.prototype.invoke=function(url){
var _10c7=DOMUtil.getXMLHTTPRequest();
var _10c8=null;
_10c7.open("post",url,false);
_10c7.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_10c7.setRequestHeader("SOAPAction",this.action);
try{
_10c7.send(this.document);
_10c8=SOAPRequest._parseResponse(_10c7);
}
catch(exception){
var error="Dysfuntion in SOAP invoke: "+url;
if(this.document!=null){
error+="\n"+DOMSerializer.serialize(this.document,true);
}
this.logger.error(error);
throw exception;
}
_10c7=null;
return _10c8;
};
SOAPRequest.prototype.dispose=function(){
for(var _10ca in this){
this[_10ca]=null;
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
var _10cc=null;
if(doc&&doc.documentElement){
_10cc=new SOAPRequestResponse();
var _10cd=SOAPRequestResponse.resolver;
_10cc.document=doc;
_10cc.envelope=_10cd.resolve("soap:Envelope",_10cc.document);
_10cc.header=_10cd.resolve("soap:Header",_10cc.envelope);
_10cc.body=_10cd.resolve("soap:Body",_10cc.envelope);
var fault=_10cd.resolve("soap:Fault",_10cc.body);
if(fault){
SOAPRequestResponse.logger.fatal(DOMSerializer.serialize(fault,true));
_10cc.fault={element:fault,faultNamespaceURI:fault.namespaceURI,faultCode:DOMUtil.getTextContent(_10cd.resolve("faultcode",fault)),faultString:DOMUtil.getTextContent(_10cd.resolve("faultstring",fault)),detail:fault.getElementsByTagName("detail").item(0)};
}
}
return _10cc;
};
function SOAPFault(_10cf,_10d0,_10d1){
this._operationName=_10cf;
this._operationAddress=_10d0;
this._faultString=_10d1;
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
SOAPFault.newInstance=function(_10d2,fault){
return new SOAPFault(_10d2.name,_10d2.address,fault.faultString);
};
function SOAPEncoder(wsdl,_10d5){
this.logger=SystemLogger.getLogger("SOAPEncoder");
this._wsdl=wsdl;
this._operation=_10d5;
this._namespace=wsdl.getTargetNamespace();
}
SOAPEncoder.prototype.encode=function(args){
var _10d7=SOAPRequest.newInstance(this._namespace,this._operation);
var root=this._appendElement(_10d7.body,this._operation);
var _10d9=this._wsdl.getSchema();
var _10da=_10d9.lookup(this._operation);
var _10db=_10da.getListedDefinitions();
while(_10db.hasNext()){
var def=_10db.getNext();
var elm=this._appendElement(root,def.name);
var val=args.getNext();
this._resolve(elm,def,val);
}
return _10d7;
};
SOAPEncoder.prototype._resolve=function(_10df,_10e0,value){
var _10e2=this._wsdl.getSchema();
if(_10e0.isSimpleValue){
this._appendText(_10df,value,_10e0.type=="string");
}else{
var _10e3=_10e2.lookup(_10e0.type);
if(_10e3 instanceof SchemaSimpleType){
alert("SOAPEncoder: SchemaSimpleType support not implemented!");
}else{
var defs=_10e3.getListedDefinitions();
if(_10e3.isArray){
var _10e5=new List(value);
var def=defs.getNext();
while(_10e5.hasNext()){
var elm=this._appendElement(_10df,def.name);
var val=_10e5.getNext();
this._resolve(elm,def,val);
}
}else{
while(defs.hasNext()){
try{
var def=defs.getNext();
var elm=this._appendElement(_10df,def.name);
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
SOAPEncoder.prototype._appendText=function(_10ec,value,_10ee){
if(value!=null){
value=new String(value);
var safe=new String("");
var chars=value.split("");
var _10f1=false;
var i=0,c;
while(c=chars[i++]){
var _10f4=true;
var code=c.charCodeAt(0);
switch(code){
case 9:
case 10:
case 13:
_10f4=false;
break;
default:
if((code>=32&&code<=55295)||(code>=57344&&code<=65533)||(code>=65536&&code<=1114111)){
_10f4=false;
}
break;
}
if(!_10f4){
safe+=c;
}else{
_10f1=true;
}
}
if(_10f1){
this.logger.debug("Illegal XML character(s) was deleted from the string: "+value);
}
_10ec.appendChild(_10ec.ownerDocument.createTextNode(safe));
}
};
function SOAPDecoder(wsdl,_10f7){
this._wsdl=wsdl;
this._operation=_10f7;
this._resolver=new XPathResolver();
this._resolver.setNamespacePrefixResolver({"result":wsdl.getTargetNamespace()});
}
SOAPDecoder.prototype.resolve=function(xpath,node){
return this._resolver.resolve("result:"+xpath,node);
};
SOAPDecoder.prototype.resolveAll=function(xpath,node){
return this._resolver.resolveAll("result:"+xpath,node);
};
SOAPDecoder.prototype.decode=function(_10fc){
var _10fd=null;
var _10fe=this._wsdl.getSchema();
var id=this._operation+"Response";
var _1100=this.resolve(id,_10fc.body);
var _1101=_10fe.lookup(id);
var _1102=_1101.getListedDefinitions();
while(!_10fd&&_1102.hasNext()){
var def=_1102.getNext();
var elm=this.resolve(def.name,_1100);
if(def.type==SchemaDefinition.TYPE_XML_DOCUMENT){
_10fd=DOMUtil.getDOMDocument();
var e=elm.getElementsByTagName("*").item(0);
if(typeof _10fd.importNode!=Types.UNDEFINED){
_10fd.appendChild(_10fd.importNode(e,true));
}else{
_10fd.loadXML(DOMSerializer.serialize(e));
}
}else{
_10fd=this._compute(elm,def);
}
}
return _10fd;
};
SOAPDecoder.prototype._compute=function(_1106,_1107){
var _1108=null;
var _1109=this._wsdl.getSchema();
if(_1107.isSimpleValue){
_1108=this._getSimpleValue(_1106,_1107.type);
}else{
var _110a=_1109.lookup(_1107.type);
if(_110a instanceof SchemaSimpleType){
_1108=this._getSimpleValue(_1106,_110a.restrictionType);
}else{
var defs=_110a.getListedDefinitions();
if(_110a.isArray){
_1108=[];
var def=defs.getNext();
var elms=this.resolveAll(def.type,_1106);
while(elms.hasNext()){
var elm=elms.getNext();
_1108.push(this._compute(elm,def));
}
}else{
_1108={};
defs.reset();
while(defs.hasNext()){
var def=defs.getNext();
var elm=this.resolve(def.name,_1106);
if(elm){
_1108[def.name]=this._compute(elm,def);
}else{
if(def.isRequired){
throw new Error("SOAPDecoder: invalid SOAP response.");
}
}
}
}
}
}
return _1108;
};
SOAPDecoder.prototype._getSimpleValue=function(_110f,type){
var _1111=null;
if(_110f.firstChild&&_110f.firstChild.nodeType==Node.TEXT_NODE){
if(Client.isMozilla&&_110f.childNodes.length>1){
_110f.normalize();
}
_1111=_110f.firstChild.data;
switch(type){
case Schema.types.STRING:
_1111=_1111;
break;
case Schema.types.INT:
case Schema.types.FLOAT:
case Schema.types.DOUBLE:
_1111=Number(_1111);
break;
case Schema.types.BOOLEAN:
_1111=_1111=="true";
break;
default:
throw ("SOAPDecoder: schema type \""+type+"\" not handled.");
break;
}
}
return _1111;
};
Schema.prototype=new XPathResolver;
Schema.prototype.constructor=Schema;
Schema.superclass=XPathResolver.prototype;
Schema.types={STRING:"string",INT:"int",FLOAT:"float",DOUBLE:"double",BOOLEAN:"boolean"};
Schema.notSupportedException=new Error("Schema: Schema structure not supported!");
function Schema(_1112){
this.logger=SystemLogger.getLogger("Schema");
this._map=this._parseSchema(_1112);
}
Schema.prototype._parseSchema=function(_1113){
this.setNamespacePrefixResolver({"wsdl":Constants.NS_WSDL,"soap":Constants.NS_SOAP,"s":Constants.NS_SCHEMA});
var _1114={};
var entry=null;
var rules=this.resolveAll("s:*[@name]",_1113);
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
_1114[rule.getAttribute("name")]=entry;
}
return _1114;
};
Schema.prototype.lookup=function(name){
return this._map[name];
};
SchemaDefinition.TYPE_XML_DOCUMENT="xmldocument";
function SchemaDefinition(_1119){
this.logger=SystemLogger.getLogger("SchemaDefinition");
this.isRequired=null;
this.type=null;
this._parse(_1119);
}
SchemaDefinition.prototype._parse=function(_111a){
var min=_111a.getAttribute("minOccurs");
var max=_111a.getAttribute("maxOccurs");
var type=_111a.getAttribute("type");
this.name=_111a.getAttribute("name");
this.isRequired=min!="0";
if(type){
var split=type.split(":");
var sort=split[0];
var _1120=split[1];
this.isSimpleValue=sort!="tns";
this.type=_1120;
}else{
var elm=_111a.getElementsByTagName("*").item(0);
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
function SchemaElementType(_1122,_1123){
this.logger=SystemLogger.getLogger("SchemaElementType");
this._definitions=new List();
this._parseListedDefinitions(_1122,_1123);
}
SchemaElementType.prototype._parseListedDefinitions=function(_1124,_1125){
var els=_1124.resolveAll("s:complexType/s:sequence/s:element",_1125);
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
function SchemaComplexType(_1127,_1128){
this._definitions=new List();
this._parseListedDefinitions(_1127,_1128);
this.isArray=_1128.getAttribute("name").indexOf("ArrayOf")>-1;
}
SchemaComplexType.prototype._parseListedDefinitions=function(_1129,_112a){
var els=_1129.resolveAll("s:sequence/s:element",_112a);
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
function SchemaSimpleType(_112d,_112e){
this.restrictionType=null;
this._parse(_112d,_112e);
}
SchemaSimpleType.prototype._parse=function(_112f,_1130){
var _1131=_112f.resolve("s:restriction",_1130);
if(_1131){
this.restrictionType=_1131.getAttribute("base").split(":")[1];
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
var _1134=null;
var _1135=DOMUtil.getXMLHTTPRequest();
_1135.open("get",url,false);
_1135.send(null);
if(_1135.responseXML){
_1134=_1135.responseXML.documentElement;
}else{
alert(_1135.responseText);
throw new Error("WebServiceResolver: Could not read WSDL: "+url);
}
return _1134;
};
WebServiceResolver.prototype.getPortAddress=function(){
return this._WSDLURL.split("?WSDL")[0];
};
WebServiceResolver.prototype.getTargetNamespace=function(){
return this._root.getAttribute("targetNamespace");
};
WebServiceResolver.prototype.getOperations=function(){
var _1136=new List();
var _1137=this.resolveAll("wsdl:portType/wsdl:operation",this._root);
if(_1137.hasEntries()){
while(_1137.hasNext()){
var _1138=_1137.getNext();
var name=_1138.getAttribute("name");
_1136.add(new WebServiceOperation(name,this.getPortAddress(),new SOAPEncoder(this,name),new SOAPDecoder(this,name)));
}
}else{
throw new Error("WebServiceResolver: No portType found.");
}
return _1136;
};
WebServiceResolver.prototype.getSchema=function(){
return this._schema;
};
function WebServiceOperation(name,_113b,_113c,_113d){
this.name=name;
this.address=_113b;
this.encoder=_113c;
this.decoder=_113d;
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
var _1141=wsdl.getOperations();
_1141.each(function(_1142){
proxy[_1142.name]=WebServiceProxy.createProxyOperation(_1142);
});
return proxy;
};
WebServiceProxy.prototype._log=function(_1143,_1144){
if(WebServiceProxy.isLoggingEnabled&&Application.isDeveloperMode&&_1144){
var log=_1144 instanceof SOAPRequest?"SOAPRequest for ":"SOAPResponse from ";
log+=_1143.address+": "+_1143.name+"\n\n";
log+=DOMSerializer.serialize(_1144.document,true);
this.logger.fine(log);
}
};
WebServiceProxy.createProxyOperation=function(_1146){
return function(){
var _1147=null,_1148=_1146.encoder.encode(new List(arguments));
this._log(_1146,_1148);
var _1149=_1148.invoke(_1146.address);
this._log(_1146,_1149);
if(_1149){
if(_1149.fault){
_1147=SOAPFault.newInstance(_1146,_1149.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_1147,_1148,_1149);
}
}else{
if(WebServiceProxy.isDOMResult){
_1147=_1149.document;
}else{
_1147=_1146.decoder.decode(_1149);
}
}
}
_1148.dispose();
return _1147;
};
};
WebServiceProxy.handleFault=function(_114a,_114b,_114c){
try{
Dialog.invokeModal(Dialog.URL_SERVICEFAULT,null,{soapFault:_114a,soapRequest:_114b,soapResponse:_114c});
}
catch(exception){
alert(_114a.getFaultString());
}
};
var ConfigurationService=null;
var ConsoleMessageQueueService=null;
var EditorConfigurationService=null;
var FlowControllerService=null;
var LicensingService=null;
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
this.index=0;
var _114d=SystemLogger.getLogger("MessageQueue");
var _114e=null;
var _114f=0;
var _1150=null;
var _1151=new Map();
var _1152=new Map();
var _1153=false;
var _1154=false;
var _1155={"Main":DockBinding.MAIN,"BottomLeft":DockBinding.BOTTOMLEFT,"BottomRight":DockBinding.BOTTOMRIGHT,"RightTop":DockBinding.RIGHTTOP,"RightBottom":DockBinding.RIGHTBOTTOM,"AbsBottomLeft":DockBinding.ABSBOTTOMLEFT,"AbsBottomRight":DockBinding.ABSBOTTOMRIGHT};
this.initialize=function(){
_114e=ConsoleMessageQueueService;
_114f=_114e.GetCurrentSequenceNumber("dummyparam!");
this.index=_114f;
EventBroadcaster.subscribe(BroadcastMessages.VIEW_COMPLETED,this);
EventBroadcaster.subscribe(BroadcastMessages.VIEW_CLOSED,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_OFFLINE,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_ONLINE,this);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
};
this._autoupdate=function(){
if(!_1153){
if(!MessageQueue._actions.hasEntries()){
var _1156=WebServiceProxy.isLoggingEnabled;
if(Application.isLoggedIn){
_1154=true;
WebServiceProxy.isLoggingEnabled=false;
MessageQueue.update();
WebServiceProxy.isLoggingEnabled=_1156;
_1154=false;
}
}
}
};
this._pokeserver=function(){
if(_1153==true){
if(ReadyService.IsServerReady(true)){
MessageQueue._lockSystem(false);
}
}
};
this.update=function(){
if(Application.isLoggedIn){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_REQUESTED,_1154);
var _1157=new List(_114e.GetMessages(Application.CONSOLE_ID,this.index));
if(_1157.hasEntries()){
this.evaluate(_1157);
}else{
if(!this._actions.hasEntries()){
broadcastUpdateEvaluated();
}
}
}
};
this.evaluate=function(_1158){
if(_1158.hasEntries()){
while(_1158.hasNext()){
var num=_1158.getNext().SequenceNumber;
if(num>this.index){
this.index=num;
}
}
_1158.reset();
if(this._actions.hasEntries()){
this._actions.merge(_1158);
}else{
this._actions=_1158;
}
this._nextAction();
}
};
this._closeAllViews=function(_115a){
var _115b="(No reason)";
if(_115a!=null){
_115b=_115a.Reason;
}
var title="Warning";
var text="The server has requested a close of all active editors for the following reason: \"${reason}\". It is recommended that you accept this request by clicking OK.";
text=text.replace("${reason}",_115b);
var self=this;
Dialog.warning(title,text,Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_115f){
if(_115f==Dialog.RESPONSE_ACCEPT){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEWS);
}
self._nextAction();
}});
};
this._nextAction=function(){
var _1160=null;
if(this._actions.hasEntries()){
var _1161=this._actions.extractFirst();
_114d.debug("MessageQueue action: "+_1161.ActionType);
_114f=_1161.SequenceNumber;
switch(_1161.ActionType){
case "OpenView":
_1160=_1161.OpenViewParams;
if(_1160.ViewType=="ModalDialog"){
openDialogView(_1160);
}else{
_1150=_1160.ViewId;
openView(_1160);
}
break;
case "CloseView":
_1160=_1161.CloseViewParams;
_1150=_1160.ViewId;
closeView(_1160);
break;
case "RefreshTree":
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,_1161.RefreshTreeParams.EntityToken);
_114d.debug("refreshingtrees = "+_1151.countEntries());
if(!_1151.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "MessageBox":
openMessageBox(_1161.MessageBoxParams);
break;
case "OpenViewDefinition":
_1160=_1161.OpenViewDefinitionParams;
_1150=_1160.Handle;
openViewDefinition(_1160);
break;
case "LogEntry":
logEntry(_1161.LogEntryParams);
this._nextAction();
break;
case "Reboot":
Application.reload(true);
break;
case "LockSystem":
MessageQueue._lockSystem(true);
break;
case "BroadcastMessage":
_1160=_1161.BroadcastMessageParams;
_114d.debug("Server says: EventBroadcaster.broadcast ( \""+_1160.Name+"\", "+_1160.Value+" )");
EventBroadcaster.broadcast(_1160.Name,_1160.Value);
this._nextAction();
break;
case "CollapseAndRefresh":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_COLLAPSEALL);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
if(!_1151.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "CloseAllViews":
this._closeAllViews(_1161.CloseAllViewsParams);
break;
case "SaveStatus":
saveStatus(_1161.SaveStatusParams);
this._nextAction();
break;
case "DownloadFile":
Download.init(_1161.DownloadFileParams.Url);
this._nextAction();
break;
case "ExpandTreeNode":
this._nextAction();
break;
case "BindEntityTokenToView":
_1160=_1161.BindEntityTokenToViewParams;
EventBroadcaster.broadcast(BroadcastMessages.BIND_TOKEN_TO_VIEW,{handle:_1160.ViewId,entityToken:_1160.EntityToken});
this._nextAction();
break;
case "OpenGenericView":
_1160=_1161.OpenGenericViewParams;
openGenericView(_1160);
break;
default:
Dialog.error("Dysfunction","Unhandled action: "+_1161.ActionType);
break;
}
}else{
broadcastUpdateEvaluated();
}
};
function broadcastUpdateEvaluated(){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_EVALUATED,_1154);
}
function logEntry(_1162){
var _1163=_1162.Level.toLowerCase();
SystemLogger.getLogger(_1162.SenderId)[_1163](_1162.Message);
}
function openView(_1164){
var list=paramsToList(_1164.Argument);
if(list.hasEntries()){
var def=ViewDefinition.clone("Composite.Management.PostBackView",_1164.ViewId);
def.entityToken=_1164.EntityToken;
def.flowHandle=_1164.FlowHandle;
def.position=_1155[_1164.ViewType],def.label=_1164.Label;
def.image=_1164.Image;
def.toolTip=_1164.ToolTip;
def.argument={"url":_1164.Url,"list":list};
StageBinding.presentViewDefinition(def);
}else{
StageBinding.presentViewDefinition(new HostedViewDefinition({handle:_1164.ViewId,entityToken:_1164.EntityToken,flowHandle:_1164.FlowHandle,position:_1155[_1164.ViewType],url:_1164.Url,label:_1164.Label,image:_1164.Image,toolTip:_1164.ToolTip}));
}
}
function openDialogView(_1167){
StageBinding.presentViewDefinition(new DialogViewDefinition({handle:_1167.ViewId,flowHandle:_1167.FlowHandle,position:Dialog.MODAL,url:_1167.Url,handler:{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}}}));
}
function openMessageBox(_1168){
var _1169=_1168.DialogType.toLowerCase();
if(_1169=="question"){
throw "Not supported!";
}else{
Dialog[_1169](_1168.Title,_1168.Message,null,{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}});
}
}
function openViewDefinition(_116a){
var map={};
var _116c=false;
new List(_116a.Argument).each(function(entry){
map[entry.Key]=entry.Value;
_116c=true;
});
var proto=ViewDefinitions[_116a.Handle];
if(proto!=null){
var def=null;
if(proto.isMutable==false){
def=proto;
}else{
def=new HostedViewDefinition();
for(var prop in proto){
def[prop]=proto[prop];
}
def.handle=_116a.ViewId;
}
def.argument=_116c?map:null;
StageBinding.presentViewDefinition(def);
}else{
throw "Unknown ViewDefinition: "+param.Handle;
}
}
function openGenericView(_1171){
var def=ViewBinding.clone("Composite.Management.GenericView",_1171.ViewId);
def.label=_1171.Label;
def.toolTip=_1171.ToolTip;
def.image=_1171.Image;
def.argument={"url":_1171.Url,"list":paramsToList(_1171.UrlPostArguments)};
StageBinding.presentViewDefinition(def);
}
function closeView(_1173){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_1173.ViewId);
}
function saveStatus(_1174){
EventBroadcaster.broadcast(BroadcastMessages.CURRENT_SAVED,{handle:_1174.ViewId,isSuccess:_1174.Succeeded});
}
this._lockSystem=function(_1175){
var _1176=top.bindingMap.offlinetheatre;
if(_1175){
_1176.play();
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._pokeserver,MessageQueue.INTERVAL_OFFLINE);
}else{
_1176.stop();
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
var self=this;
setTimeout(function(){
if(self._actions.hasEntries()){
self._nextAction();
}
},0);
}
_1153=_1175;
};
this.handleBroadcast=function(_1178,arg){
switch(_1178){
case BroadcastMessages.APPLICATION_LOGIN:
this.initialize();
break;
case BroadcastMessages.VIEW_COMPLETED:
case BroadcastMessages.VIEW_CLOSED:
if(_1150!=null&&arg==_1150){
_1150=null;
this._nextAction();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHING:
_1151.set(arg,true);
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED:
if(_1151.hasEntries()){
_1151.del(arg);
if(!_1151.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
setTimeout(function(){
MessageQueue._nextAction();
},0);
}
}
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN:
_1152.set(arg,true);
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN:
if(_1152.hasEntries()==true){
_1152.del(arg);
if(!_1152.hasEntries()){
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
function paramsToList(_117a){
var list=new List();
new List(_117a).each(function(entry){
list.add({name:entry.Key,value:entry.Value});
});
return list;
}
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
};
var ViewDefinitions={"Composite.Management.Null":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.Null"}),"Composite.Management.PostBackDialog":new DialogViewDefinition({handle:"Composite.Management.PostBackDialog",isMutable:true,position:Dialog.MODAL,url:"${root}/content/dialogs/postback/postbackdialog.aspx",argument:{"url":null,"list":null}}),"Composite.Management.PostBackView":new HostedViewDefinition({handle:"Composite.Management.PostBackView",isMutable:true,position:DockBinding.MAIN,url:"${root}/postback.aspx",argument:{"url":null,"list":null}}),"Composite.Management.GenericView":new HostedViewDefinition({handle:"Composite.Management.GenericView",isMutable:true,position:DockBinding.MAIN,url:"${root}/content/views/generic/generic.aspx",label:null,image:null,toolTip:null,argument:{"url":null,"list":null}}),"Composite.Management.Start":new HostedViewDefinition({handle:"Composite.Management.Start",position:DockBinding.START,label:"Welcome Travellers",url:"${root}/content/views/start/start.aspx"}),"Composite.Management.About":new DialogViewDefinition({handle:"Composite.Management.About",position:Dialog.MODAL,url:"${root}/content/dialogs/about/about.aspx"}),"Composite.Management.PermissionEditor":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.PermissionEditor",position:DockBinding.MAIN,url:"${root}/content/views/editors/permissioneditor/permissioneditor.aspx",argument:{serializedEntityToken:"entityTokenType='Composite\\.StandardPlugins\\.Elements\\.ElementProviders\\.VirtualElementProvider\\.VirtualElementProviderEntityToken,Composite'entityToken='_EntityToken_Type_=\\'Composite\\\\\\.StandardPlugins\\\\\\.Elements\\\\\\.ElementProviders\\\\\\.VirtualElementProvider\\\\\\.VirtualElementProviderEntityToken,Composite\\'_EntityToken_Source_=\\'VirtualElementProvider\\'_EntityToken_Id_=\\'DesignPerspective\\''\""}}),"Composite.Management.SystemLog":new HostedViewDefinition({handle:"Composite.Management.SystemLog",position:DockBinding.ABSBOTTOMLEFT,label:"System Log",url:"${root}/content/views/dev/systemlog/systemlog.aspx"}),"Composite.Management.Developer":new HostedViewDefinition({handle:"Composite.Management.Developer",position:DockBinding.ABSBOTTOMRIGHT,label:"Developer",url:"${root}/content/views/dev/developer/developer.aspx"}),"Composite.Management.IconPack.System":new HostedViewDefinition({handle:"Composite.Management.IconPack.System",position:DockBinding.ABSBOTTOMLEFT,label:"Freja",image:"${icon:icon}",url:"${root}/content/views/dev/icons/system/Default.aspx"}),"Composite.Management.IconPack.Republic":new HostedViewDefinition({handle:"Composite.Management.IconPack.Republic",position:DockBinding.ABSBOTTOMLEFT,label:"Republic",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/republic.aspx"}),"Composite.Management.IconPack.Harmony":new HostedViewDefinition({handle:"Composite.Management.IconPack.Harmony",position:DockBinding.ABSBOTTOMLEFT,label:"Harmony",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/harmony.aspx"}),"Composite.Management.Explorer":new HostedViewDefinition({handle:"Composite.Management.Explorer",position:DockBinding.EXPLORER,url:"${root}/content/views/explorer/explorer.aspx",label:"Explorer"}),"Composite.Management.Options":new DialogViewDefinition({handle:"Composite.Management.Options",position:Dialog.MODAL,url:"${root}/content/dialogs/options/options.aspx",label:"Options"}),"Composite.Management.VisualEditorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.VisualEditorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/wysiwygeditor/wysiwygeditordialog.aspx",width:600,argument:{"formattingconfiguration":null,"elementclassconfiguration":null,"configurationstylesheet":null,"presentationstylesheet":null,"embedablefieldstypenames":null}}),"Composite.Management.MultiSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MultiSelectorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/multiselector/multiselectordialog.aspx"}),"Composite.Management.Search":new HostedViewDefinition({handle:"Composite.Management.Search",position:DockBinding.RIGHTBOTTOM,url:"${root}/content/views/search/search.aspx",label:"Search",image:"${icon:view_search}",argument:null}),"Composite.Management.Browser":new HostedViewDefinition({isMutable:false,handle:"Composite.Management.Browser",position:DockBinding.MAIN,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,label:"Page Browser",image:"${icon:page-view-administrated-scope}",toolTip:"Browse unpublished pages",url:"${root}/content/views/browser/browser.aspx",argument:{"URL":null}}),"Composite.Management.SEOAssistant":new HostedViewDefinition({handle:"Composite.Management.SEOAssistant",position:DockBinding.RIGHTTOP,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,url:"${root}/content/views/seoassist/seoassist.aspx",label:"${string:Composite.Web.SEOAssistant:SEOAssistant}",image:"${icon:seoassistant}",toolTip:"Search engine optimization"}),"Composite.Management.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.SourceCodeViewer",position:DockBinding.ABSBOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.User.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.User.SourceCodeViewer",position:DockBinding.BOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.Management.Help":new HostedViewDefinition({label:"Help",image:"${root}/images/icons/republic/republic_0534/0534_16px_Republic_32bit_PNG.png",handle:"Composite.Management.Help",position:DockBinding.ABSRIGHTTOP,url:"${root}/content/views/help/help.aspx"}),"Composite.Management.Dialog.Translations":new DialogViewDefinition({handle:"Composite.Management.TranslationsDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/translations/translations.aspx",label:"Translations",image:"${icon:users-changepublicculture}"}),"Composite.Management.ImageSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.ImageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_IMAGESELECTOR,argument:{label:"Select Image",image:"${icon:image}",selectionProperty:"ElementType",selectionValue:"image/jpeg image/gif image/png image/bmp image/tiff",selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WebImages"}]}}),"Composite.Management.EmbeddableMediaSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Media",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:null}]}}),"Composite.Management.FrontendFileSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Frontend File",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"LayoutFileElementProvider"}]}}),"Composite.Management.PageSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Page",image:"${icon:page}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.PageIdSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageIdSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Page",image:"${icon:page}",selectionProperty:"DataId",selectionValue:null,selectionResult:"DataId",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.LinkableSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.LinkableSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Page or File",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"},{key:"MediaFileElementProvider"}]}}),"Composite.Management.MediaSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.MediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Page or File",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider"}]}}),"Composite.Management.FunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.FunctionSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Function",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider"}]}}),"Composite.Management.WidgetFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.WidgetFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Widget",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllWidgetFunctionsElementProvider"}]}}),"Composite.Management.XhtmlDocumentFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.XhtmlDocumentFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Function",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider",search:"AllFunctionsElementProvider.XhtmlDocument"}]}})};
var KickStart=new function(){
var _117d=false;
var _117e=false;
var _117f=null;
var _1180=false;
var _1181="admin";
var _1182="123456";
this.fireOnDOM=function(){
if(Client.qualifies()){
Application.lock(this);
WindowManager.fireOnLoad(this);
ReadyService=WebServiceProxy.createProxy(Constants.URL_WSDL_READYSERVICE);
LoginService=WebServiceProxy.createProxy(Constants.URL_WSDL_LOGINSERVICE);
LicensingService=WebServiceProxy.createProxy(Constants.URL_WSDL_LICENSINGSERVICE);
}else{
document.location="unsupported.aspx";
}
};
this.fireOnLoad=function(){
fileEventBroadcasterSubscriptions(true);
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_SHUTDOWN,this);
EventBroadcaster.broadcast(BroadcastMessages.APPLICATION_KICKSTART);
};
this.handleBroadcast=function(_1183){
switch(_1183){
case BroadcastMessages.AUDIO_INITIALIZED:
case BroadcastMessages.PERSISTANCE_INITIALIZED:
kickStart(_1183);
break;
case BroadcastMessages.APPLICATION_STARTUP:
break;
case BroadcastMessages.KEY_ENTER:
this.login();
break;
case BroadcastMessages.APPLICATION_LOGIN:
var _1184=window.bindingMap.appwindow;
_1184.setURL("app.aspx");
break;
case BroadcastMessages.APPLICATION_OPERATIONAL:
showWorkbench();
break;
case BroadcastMessages.APPLICATION_SHUTDOWN:
bindingMap.decks.select("shutdowndeck");
bindingMap.cover.show();
break;
}
};
function fileEventBroadcasterSubscriptions(_1185){
new List([BroadcastMessages.AUDIO_INITIALIZED,BroadcastMessages.PERSISTANCE_INITIALIZED,BroadcastMessages.APPLICATION_STARTUP,BroadcastMessages.APPLICATION_LOGIN,BroadcastMessages.APPLICATION_OPERATIONAL]).each(function(_1186){
if(_1185){
EventBroadcaster.subscribe(_1186,KickStart);
}else{
EventBroadcaster.unsubscribe(_1186,KickStart);
}
});
}
function kickStart(_1187){
switch(_1187){
case BroadcastMessages.AUDIO_INITIALIZED:
_117e=true;
setTimeout(function(){
Persistance.initialize();
},0);
break;
case BroadcastMessages.PERSISTANCE_INITIALIZED:
_117d=true;
break;
}
if(_117d&&_117e){
License.refresh();
if(License.isRegistered){
if(License.isExpired){
showExpiration();
}else{
if(LoginService.IsLoggedIn(true)){
accessGranted();
}else{
splashScreenData();
showLogin();
}
}
}else{
_1180=true;
showRegistration();
}
}
}
function splashScreenData(){
var ver=document.getElementById("version");
var reg=document.getElementById("registration");
ver.firstChild.data=ver.firstChild.data.replace("${version}",License.versionPrettyString);
reg.firstChild.data=reg.firstChild.data.replace("${registration}",License.registrationName);
}
function showLogin(){
EventBroadcaster.subscribe(BroadcastMessages.KEY_ENTER,KickStart);
Application.unlock(KickStart);
bindingMap.decks.select("logindeck");
setTimeout(function(){
if(Application.isDeveloperMode&&Application.isLocalHost){
DataManager.getDataBinding("username").setValue(_1181);
DataManager.getDataBinding("password").setValue(_1182);
}
setTimeout(function(){
DataManager.getDataBinding("username").focus();
},250);
},0);
}
function showRegistration(){
bindingMap.decks.select("registrationdeck");
document.getElementById("registrationlink").href=License.registrationURL;
Application.unlock(KickStart);
}
function showExpiration(){
bindingMap.decks.select("expirationdeck");
document.getElementById("expirationlink").href=License.statusURL;
Application.unlock(KickStart);
}
this.checkRegistration=function(){
Application.lock(KickStart);
setTimeout(function(){
License.refresh(true);
Application.unlock(KickStart);
if(License.isRegistered){
if(_1180){
bindingMap.decks.select("firsttimedeck");
watchProgress();
}else{
splashScreenData();
showLogin();
}
}else{
if(!KickStart._hasTimeout){
var error=document.getElementById("registrationerror");
error.style.display="block";
KickStart._hasTimeout=true;
setTimeout(function(){
error.style.display="none";
KickStart._hasTimeout=false;
},2000);
}
}
},25);
};
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
this.checkExpiration=function(){
License.refresh(true);
if(!License.isExpired){
splashScreenData();
showLogin();
}else{
if(!KickStart._hasTimeout){
var error=document.getElementById("expirationerror");
error.style.display="block";
KickStart._hasTimeout=true;
setTimeout(function(){
error.style.display="none";
KickStart._hasTimeout=false;
},2000);
}
}
};
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
var _118c=DataManager.getDataBinding("username").getResult();
var _118d=DataManager.getDataBinding("password").getResult();
var _118e=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _118f=false;
var _1190=LoginService.ValidateAndLogin(_118c,_118d);
if(_1190 instanceof SOAPFault){
alert(_1190.getFaultString());
}else{
_118f=_1190;
}
if(_118f){
EventBroadcaster.unsubscribe(BroadcastMessages.KEY_ENTER,KickStart);
accessGranted();
}else{
Application.unlock(KickStart);
accesssDenied();
}
WebServiceProxy.isFaultHandler=true;
if(_118e){
WebServiceProxy.isLoggingEnabled=true;
}
}else{
Application.unlock(KickStart);
}
},25);
};
function accessGranted(){
setTimeout(function(){
bindingMap.decks.select("loadingdeck");
setTimeout(function(){
Application.login();
},0);
},0);
}
function accesssDenied(){
var _1191=DataManager.getDataBinding("username");
var _1192=DataManager.getDataBinding("password");
_1191.blur();
_1192.blur();
_1191.setValue("");
_1192.setValue("");
_1191.clean();
_1192.clean();
_1191.focus();
document.getElementById("loginerror").style.display="block";
var _1193={handleAction:function(_1194){
document.getElementById("loginerror").style.display="none";
_1194.target.removeActionListener(Binding.ACTION_DIRTY,_1193);
}};
bindingMap.loginfields.addActionListener(Binding.ACTION_DIRTY,_1193);
}
if(window.WindowManager!=null){
WindowManager.fireOnDOM(this);
}else{
alert("Script loading not synchronized.");
}
};

