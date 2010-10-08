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
var _36a=this._contextWindow.bespin!=undefined;
DOMEvents.addEventListener(doc,DOMEvents.MOUSEDOWN,this,_36a);
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
var _36b={handleEvent:function(e){
switch(e.type){
case DOMEvents.BLUR:
Application.focused(false);
break;
case DOMEvents.FOCUS:
Application.focused(true);
break;
}
}};
DOMEvents.addEventListener(this._contextWindow,DOMEvents.BLUR,_36b);
DOMEvents.addEventListener(this._contextWindow,DOMEvents.FOCUS,_36b);
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
var _372=UserInterface.getBinding(node);
if(_372!=null){
_372.dispatchAction(Binding.ACTION_ACTIVATED);
}
node=_372!=null?null:node.parentNode;
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
var _375=Application.trackMousePosition(e);
if(_375){
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEMOVE,e);
}
}
catch(exception){
DOMEvents.removeEventListener(this._contextDocument,DOMEvents.MOUSEMOVE,this);
throw (exception);
}
};
StandardEventHandler.prototype._handleKeyDown=function(e,_377){
if(e.keyCode==KeyEventCodes.VK_TAB){
if(!this._isAllowTabs){
if(!_377){
this._handleTab(e);
DOMEvents.preventDefault(e);
}
}else{
if(e.shiftKey||e.ctrlKey){
DOMEvents.preventDefault(e);
}
}
_377=true;
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
var _378=KeySetBinding.handleKey(this._contextDocument,e);
if(!_378){
switch(e.keyCode){
case KeyEventCodes.VK_PAGE_UP:
case KeyEventCodes.VK_PAGE_DOWN:
break;
default:
var _379=this._contextWindow.frameElement;
if(_379!=null){
var _37a=DOMUtil.getParentWindow(_379);
if(_37a.standardEventHandler!=null){
_37a.standardEventHandler._handleKeyDown(e,_377);
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
var _37d=false;
var _37e=DOMEvents.getTarget(e);
var name=_37e.nodeName.toLowerCase();
switch(name){
case "input":
case "textarea":
case "select":
_37d=(e.type==DOMEvents.FOCUS||e.type==DOMEvents.FOCUSIN);
if(name=="input"||name=="textarea"){
StandardEventHandler.isBackAllowed=_37d;
}
if(_37d){
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
StandardEventHandler.prototype.enableNativeKeys=function(_381){
this._isAllowTabs=(_381==true?true:false);
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
function Action(_384,type){
this.target=_384;
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
function Animation(_386){
this.id=KeyMaster.getUniqueKey();
this.interval=25;
this.iterator=0;
this.modifier=1;
this.endcount=90;
for(var _387 in _386){
this[_387]=_386[_387];
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
Animation.prototype.onstart=function(_38b){
};
Animation.prototype.onstep=function(_38c){
};
Animation.prototype.onstop=function(_38d){
};
Point.isEqual=function(p1,p2){
var _390=false;
if(p1&&p2){
_390=(p1.x==p2.x)&&(p1.y==p2.y);
}
return _390;
};
function Point(x,y){
this.x=x;
this.y=y;
}
Point.prototype={x:0,y:0};
Dimension.isEqual=function(dim1,dim2){
var _395=false;
if(dim1&&dim2){
_395=(dim1.w==dim2.w)&&(dim1.h==dim2.h);
}
return _395;
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
function BindingAcceptor(_39c){
this.logger=SystemLogger.getLogger("BindingDragger");
this._binding=_39c;
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
var _39d=new List(this._binding.dragAccept.split(" "));
while(_39d.hasNext()){
var type=_39d.getNext();
this._acceptedList[type]=true;
}
}
};
BindingAcceptor.prototype.handleBroadcast=function(_39f,arg){
var type=arg;
try{
switch(_39f){
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
function BindingBoxObject(_3a4){
this._domElement=_3a4.getBindingElement();
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
function BindingDragger(_3a6){
this.logger=SystemLogger.getLogger("BindingDragger");
this.binding=_3a6;
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
BindingDragger.prototype.registerHandler=function(_3a8){
if(Interfaces.isImplemented(IDragHandler,_3a8)==true){
this.handler=_3a8;
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
var _3ab=e.button==(e.target?0:1);
if(_3ab){
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
var _3ad=Application.getMousePosition();
var dx=_3ad.x-this.startPoint.x;
var dy=_3ad.y-this.startPoint.y;
return new Point(dx,dy);
};
BindingDragger.prototype.handleBroadcast=function(_3b0,e){
switch(_3b0){
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
function BindingParser(_3b2){
this.logger=SystemLogger.getLogger("BindingParser");
this._ownerDocument=_3b2;
this._rootElement=null;
}
BindingParser.prototype.parseFromString=function(_3b3){
var _3b4=new List();
var xml=BindingParser.XML.replace("${markup}",_3b3);
var doc=XMLParser.parse(_3b3);
if(doc){
var _3b7=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this._ownerDocument);
this._iterate(doc.documentElement,_3b7);
var node=_3b7.firstChild;
while(node){
if(node.nodeType==Node.ELEMENT_NODE){
_3b4.add(node);
}
node=node.nextSibling;
}
}
return _3b4;
};
BindingParser.prototype._iterate=function(_3b9,_3ba){
var _3bb=null;
switch(_3b9.nodeType){
case Node.ELEMENT_NODE:
_3bb=this._cloneElement(_3b9);
UserInterface.registerBinding(_3bb);
break;
case Node.TEXT_NODE:
_3bb=this._ownerDocument.createTextNode(_3b9.nodeValue);
break;
}
if(_3bb){
_3ba.appendChild(_3bb);
}
if(_3bb&&_3b9.hasChildNodes()){
var _3bc=_3b9.firstChild;
while(_3bc){
this._iterate(_3bc,_3bb);
_3bc=_3bc.nextSibling;
}
}
};
BindingParser.prototype._cloneElement=function(_3bd){
var _3be=DOMUtil.createElementNS(_3bd.namespaceURI?_3bd.namespaceURI:Constants.NS_XHTML,_3bd.nodeName,this._ownerDocument);
var i=0;
while(i<_3bd.attributes.length){
var attr=_3bd.attributes.item(i++);
_3be.setAttribute(attr.nodeName,String(attr.nodeValue));
}
return _3be;
};
BindingSerializer.activeInstance=null;
BindingSerializer.KEYPOINTER="bindingserializerkeypointer";
BindingSerializer.includeShadowTreeBindings=false;
BindingSerializer.filter=function(_3c1){
var _3c2=null;
var _3c3=false;
var _3c4=_3c1.parentNode.getAttribute(BindingSerializer.KEYPOINTER);
if(UserInterface.hasBinding(_3c1)){
var _3c5=UserInterface.getBinding(_3c1);
_3c3=BindingSerializer.activeInstance.indexBinding(_3c5);
if(_3c3){
_3c2=_3c5.key;
_3c1.setAttribute(BindingSerializer.KEYPOINTER,_3c2);
}
}
_3c2=_3c2?_3c2:_3c4;
var _3c6=new List(_3c1.childNodes);
_3c6.each(function(_3c7){
if(_3c7.nodeType==Node.ELEMENT_NODE){
_3c7.setAttribute(BindingSerializer.KEYPOINTER,_3c2);
}
});
if(_3c3){
BindingSerializer.activeInstance.append(_3c2,_3c4);
}
};
function BindingSerializer(){
this.logger=SystemLogger.getLogger("BindingSerializer");
this._dom=DOMUtil.getDOMDocument();
alert("BindingSerializer: Convert to Crawler!");
this._pointers=[];
}
BindingSerializer.prototype.serializeBinding=function(_3c8,_3c9){
BindingSerializer.includeShadowTreeBindings=_3c9?true:false;
BindingSerializer.activeInstance=this;
_3c8.bindingWindow.ElementIterator.iterate(_3c8.bindingElement,BindingSerializer.filter);
return DOMSerializer.serialize(this._dom,true);
};
BindingSerializer.prototype.indexBinding=function(_3ca){
var _3cb=false;
var _3cc=_3ca.serialize();
if(_3cc!=false){
_3cb=true;
var _3cd="ui:"+DOMUtil.getLocalName(_3ca.bindingElement);
var _3ce=DOMUtil.createElementNS(Constants.NS_UI,_3cd,this._dom);
this._pointers[_3ca.key]=_3ce;
for(var prop in _3cc){
if(_3cc[prop]!=null){
_3ce.setAttribute(prop,String(_3cc[prop]));
}
}
}
return _3cb;
};
BindingSerializer.prototype.append=function(_3d0,_3d1){
var _3d2=this._pointers[_3d0];
var _3d3=_3d1?this._pointers[_3d1]:this._dom;
_3d3.appendChild(_3d2);
};
function ImageProfile(_3d4){
this._default=_3d4.image;
this._hover=_3d4.imageHover;
this._active=_3d4.imageActive;
this._disabled=_3d4.imageDisabled;
}
ImageProfile.prototype.getDefaultImage=function(){
return this._default;
};
ImageProfile.prototype.setDefaultImage=function(_3d5){
this._default=_3d5;
};
ImageProfile.prototype.getHoverImage=function(){
return this._hover;
};
ImageProfile.prototype.setHoverImage=function(_3d6){
this._hover=_3d6;
};
ImageProfile.prototype.getActiveImage=function(){
return this._active;
};
ImageProfile.prototype.setActiveImage=function(_3d7){
this._active=_3d7;
};
ImageProfile.prototype.getDisabledImage=function(){
return this._disabled;
};
ImageProfile.prototype.setDisabledImage=function(_3d8){
this._disabled=_3d8;
};
function _BindingFinder(){
}
_BindingFinder.prototype={getDescendantBindingsByLocalName:function(_3d9,_3da,_3db){
var _3dc=null;
if(_3d9.isAttached){
_3dc=new List();
var _3dd=_3db?_3d9.getChildElementsByLocalName(_3da):_3d9.getDescendantElementsByLocalName(_3da);
_3dd.each(function(_3de){
var _3df=UserInterface.getBinding(_3de);
if(_3df){
_3dc.add(_3df);
}
});
}else{
var ouch="Could not resolve descendants of unattached binding "+_3d9.toString();
if(Application.isDeveloperMode){
throw ouch;
}
}
return _3dc;
},getAncestorBindingByType:function(_3e1,impl,_3e3){
var _3e4=null;
if(Binding.exists(_3e1)){
var node=_3e1.bindingElement;
while(_3e4==null&&node!=null){
node=node.parentNode;
if(node!=null){
if(UserInterface.hasBinding(node)){
var _3e6=UserInterface.getBinding(node);
if(_3e6 instanceof impl){
_3e4=_3e6;
}
}else{
if(_3e3&&node.nodeType==Node.DOCUMENT_NODE){
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
return _3e4;
},getAncestorBindingByLocalName:function(_3e8,_3e9,_3ea){
var _3eb=null;
if(_3e9=="*"){
var node=_3e8.bindingElement;
while(!_3eb&&(node=node.parentNode)!=null){
if(UserInterface.hasBinding(node)){
_3eb=UserInterface.getBinding(node);
}
}
}else{
_3eb=UserInterface.getBinding(DOMUtil.getAncestorByLocalName(_3e9,_3e8.bindingElement,_3ea));
}
return _3eb;
},getChildElementsByLocalName:function(_3ed,_3ee){
var _3ef=new List();
var _3f0=new List(_3ed.bindingElement.childNodes);
_3f0.each(function(_3f1){
if(_3f1.nodeType==Node.ELEMENT_NODE){
if(_3ee=="*"||DOMUtil.getLocalName(_3f1)==_3ee){
_3ef.add(_3f1);
}
}
});
return _3ef;
},getChildBindingByType:function(_3f2,impl){
var _3f4=null;
_3f2.getChildElementsByLocalName("*").each(function(_3f5){
var _3f6=UserInterface.getBinding(_3f5);
if(_3f6!=null&&_3f6 instanceof impl){
_3f4=_3f6;
return false;
}else{
return true;
}
});
return _3f4;
},getDescendantBindingByType:function(_3f7,impl){
var _3f9=null;
_3f7.getDescendantElementsByLocalName("*").each(function(_3fa){
var _3fb=UserInterface.getBinding(_3fa);
if(_3fb!=null&&_3fb instanceof impl){
_3f9=_3fb;
return false;
}else{
return true;
}
});
return _3f9;
},getDescendantBindingsByType:function(_3fc,impl){
var _3fe=new List();
_3fc.getDescendantElementsByLocalName("*").each(function(_3ff){
var _400=UserInterface.getBinding(_3ff);
if(_400!=null&&_400 instanceof impl){
_3fe.add(_400);
}
return true;
});
return _3fe;
},getNextBindingByLocalName:function(_401,name){
var _403=null;
var _404=_401.bindingElement;
while((_404=DOMUtil.getNextElementSibling(_404))!=null&&DOMUtil.getLocalName(_404)!=name){
}
if(_404!=null){
_403=UserInterface.getBinding(_404);
}
return _403;
},getPreviousBindingByLocalName:function(_405,name){
var _407=null;
var _408=_405.bindingElement;
while((_408=DOMUtil.getPreviousElementSibling(_408))!=null&&DOMUtil.getLocalName(_408)!=name){
}
if(_408!=null){
_407=UserInterface.getBinding(_408);
}
return _407;
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
},addFilter:function(_409){
this._filters.add(_409);
},removeFilter:function(_40a){
var _40b=-1;
this._filters.each(function(fil){
_40b++;
var _40d=true;
if(fil==_40a){
_40d=false;
}
return _40d;
});
if(_40b>-1){
this._filters.del(_40b);
}
},_applyFilters:function(node,arg){
var _410=null;
var stop=NodeCrawler.STOP_CRAWLING;
var skip=NodeCrawler.SKIP_NODE;
var _413=NodeCrawler.SKIP_CHILDREN;
this._filters.reset();
var _414=true;
while(this._filters.hasNext()&&_414==true){
var _415=this._filters.getNext();
var res=_415.call(this,node,arg);
if(res!=null){
_410=res;
switch(res){
case stop:
case skip:
case skip+_413:
_414=false;
break;
}
}
}
return _410;
},crawl:function(_417,arg){
this.contextDocument=_417.ownerDocument;
this.onCrawlStart();
var _419=this.type==NodeCrawler.TYPE_ASCENDING;
var _41a=this._applyFilters(_417,arg);
if(_41a!=NodeCrawler.STOP_CRAWLING){
if(_419&&_41a==NodeCrawler.SKIP_CHILDREN){
}else{
var next=null;
if(this.nextNode!=null){
next=this.nextNode;
this.nextNode=null;
}else{
next=_419?_417.parentNode:_417;
}
this._crawl(next,arg);
}
}
this.onCrawlStop();
},onCrawlStart:function(){
},onCrawlStop:function(){
},_crawl:function(_41c,arg){
var _41e=null;
switch(this.type){
case NodeCrawler.TYPE_DESCENDING:
_41e=this._crawlDescending(_41c,arg);
break;
case NodeCrawler.TYPE_ASCENDING:
_41e=this._crawlAscending(_41c,arg);
break;
}
return _41e;
},_crawlDescending:function(_41f,arg){
var skip=NodeCrawler.SKIP_NODE;
var _422=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
var _424=null;
if(_41f.hasChildNodes()){
var node=_41f.firstChild;
while(node!=null&&_424!=stop){
this.currentNode=node;
_424=this._applyFilters(node,arg);
switch(_424){
case stop:
case _422:
case skip+_422:
break;
default:
if(node.nodeType==Node.ELEMENT_NODE){
if(this.nextNode==null){
var res=this._crawl(node,arg);
if(res==stop){
_424=stop;
break;
}
}
}
if(_424!=stop&&_424!=skip){
this.previousNode=node;
}
break;
}
if(_424!=stop){
node=this.nextNode?this.nextNode:node.nextSibling;
this.nextNode=null;
}
}
}
return _424;
},_crawlAscending:function(_427,arg){
var _429=null;
var skip=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
if(_427!=null){
this.currentNode=_427;
_429=this._applyFilters(_427,arg);
if(_429!=stop){
var next=this.nextNode?this.nextNode:_427.parentNode;
this.nextNode=null;
if(next&&next.nodeType!=Node.DOCUMENT_NODE){
this.previousNode=_427;
_429=this._crawl(next,arg);
}
}
}else{
_429=stop;
}
return _429;
}};
NodeCrawler.prototype.dispose=function(){
this._filters.dispose();
for(var _42d in this){
this[_42d]=null;
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
var _430=null;
if(node.nodeType!=Node.ELEMENT_NODE){
_430=NodeCrawler.SKIP_NODE;
}
return _430;
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
this.addFilter(function(_431,arg){
var _433=null;
if(!UserInterface.hasBinding(_431)){
_433=NodeCrawler.SKIP_NODE;
}
return _433;
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
this.addFilter(function(_435,arg){
var _437=null;
var _438=UserInterface.getBinding(_435);
if(Interfaces.isImplemented(ICrawlerHandler,_438)==true){
self.response=null;
_438.handleCrawler(self);
_437=self.response;
}
return _437;
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
this.addFilter(function(_43a,list){
var _43c=null;
var _43d=UserInterface.getBinding(_43a);
if(Interfaces.isImplemented(IFlexible,_43d)==true){
switch(self.mode){
case FlexBoxCrawler.MODE_FORCE:
list.add(_43d);
break;
case FlexBoxCrawler.MODE_NORMAL:
if(_43d.isFlexSuspended==true){
_43c=NodeCrawler.SKIP_CHILDREN;
}else{
list.add(_43d);
}
break;
}
}
return _43c;
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
this.addFilter(function(_43e,list){
var _440=null;
var _441=UserInterface.getBinding(_43e);
if(_441.isAttached==true){
if(Interfaces.isImplemented(IFocusable,_441)==true){
if(_441.isFocusable&&_441.isVisible){
switch(this.mode){
case FocusCrawler.MODE_INDEX:
list.add(_441);
break;
case FocusCrawler.MODE_FOCUS:
if(!_441.isFocused){
_441.focus();
}
_440=NodeCrawler.STOP_CRAWLING;
break;
case FocusCrawler.MODE_BLUR:
if(_441.isFocused==true){
_441.blur();
_440=NodeCrawler.STOP_CRAWLING;
}
break;
}
}
}
}
return _440;
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
this.addFilter(function(_442,list){
var _444=null;
var _445=UserInterface.getBinding(_442);
if(!_445.isVisible){
_444=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _444;
});
this.addFilter(function(_446,list){
var _448=null;
var _449=UserInterface.getBinding(_446);
if(_449.isAttached){
if(Interfaces.isImplemented(IFit,_449)){
if(!_449.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_449);
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
UpdateAssistant.serialize=function(_44a){
_44a=_44a.cloneNode(true);
_44a.setAttributeNS(Constants.NS_NS,"xmlns",Constants.NS_XHTML);
_44a.setAttributeNS(Constants.NS_NS,"xmlns:ui",Constants.NS_UI);
return this._serializer.serializeToString(_44a);
};
}
},handleEvent:function(e){
var _44c=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.BEFOREUPDATE:
this._beforeUpdate(_44c);
break;
case DOMEvents.AFTERUPDATE:
this._afterUpdate(_44c);
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
},_beforeUpdate:function(_44d){
var _44e=(_44d==document.documentElement);
if(_44e){
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
var _451=FocusBinding.focusedBinding;
if(_451!=null){
this._focusID=_451.getID();
}
if(this.isDebugging){
this._oldDOM=DOMSerializer.serialize(UpdateManager.currentDOM,true);
}
}else{
switch(_44d.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_REMOVE:
DocumentManager.detachBindings(_44d);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_44d,false);
break;
}
}
},_afterUpdate:function(_452){
var _453=(_452==document.documentElement);
if(_453){
var _454=this._elementsbuffer;
if(_454.hasEntries()){
_454.each(function(_455){
DocumentManager.attachBindings(_455);
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
var _458=FocusBinding.focusedBinding;
if(_458==null){
var _459=document.getElementById(this._focusID);
if(_459!=null){
var _458=UserInterface.getBinding(_459);
if(_458!=null){
_458.focus();
}
}
}
this._focusID=null;
if(UpdateManager.summary!=""){
if(this.isDebugging){
var _45a=DOMSerializer.serialize(UpdateManager.currentDOM,true);
var _45b="NEW DOM: "+document.title+"\n\n"+_45a+"\n\n";
_45b+="OLD DOM: "+document.title+"\n\n"+this._oldDOM;
this._logger.debug(_45b);
this._oldDOM=null;
}
this._logger.fine(UpdateManager.summary);
}
}else{
switch(_452.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_INSERT:
this._elementsbuffer.add(_452);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_452,true);
break;
}
switch(_452.id){
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
var _458=UserInterface.getBinding(_452);
while(_458==null&&_452!=null){
_458=UserInterface.getBinding(_452);
_452=_452.parentNode;
}
if(_458!=null){
_458.dispatchAction(Binding.ACTION_UPDATED);
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
},_backupattributes:function(_45d,_45e){
var _45f=UserInterface.getBinding(_45d);
if(_45f!=null){
if(_45e){
var _460=this._attributesbuffer;
var map=new Map();
_460.each(function(name,old){
var now=_45d.getAttribute(name);
if(now!=null){
if(now!=old){
map.set(name,Types.castFromString(now));
}
}else{
map.set(name,null);
}
});
new List(_45d.attributes).each(function(att){
if(att.specified){
if(!_460.has(att.nodeName)){
map.set(att.nodeName,Types.castFromString(att.nodeValue));
}
}
});
map.each(function(name,_467){
var _468=_45f.propertyMethodMap[name];
if(_468!=null){
_468.call(_45f,_467);
}
});
}else{
var map=new Map();
new List(_45d.attributes).each(function(att){
if(att.specified){
map.set(att.nodeName,att.nodeValue);
}
});
this._attributesbuffer=map;
}
}
},handleElement:function(_46a,_46b){
var _46c=window.bindingMap[_46a.getAttribute("id")];
if(_46c!=null){
return _46c.handleElement(_46a,_46b);
}
},updateElement:function(_46d,_46e){
var _46f=window.bindingMap[_46d.getAttribute("id")];
if(_46f!=null){
return _46f.updateElement(_46d,_46e);
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
this.addFilter(function(_471,list){
var _473=UserInterface.getBinding(_471);
var _474=null;
switch(self.mode){
case DocumentCrawler.MODE_REGISTER:
if(_473==null){
UserInterface.registerBinding(_471);
}
break;
case DocumentCrawler.MODE_ATTACH:
if(_473!=null){
if(!_473.isAttached){
list.add(_473);
}
if(_473.isLazy==true){
_474=NodeCrawler.SKIP_CHILDREN;
}
}
break;
case DocumentCrawler.MODE_DETACH:
if(_473!=null){
list.add(_473);
}
break;
}
return _474;
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
},handleBroadcast:function(_475,arg){
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
var _478=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.SELECTSTART:
case DOMEvents.CONTEXTMENU:
if(!this._isTextInputElement(_478)){
DOMEvents.preventDefault(e);
}
break;
case DOMEvents.CLICK:
if(Client.isExplorer){
if(_478.href&&_478.href.indexOf(Constants.DUMMY_LINK)>-1){
DOMEvents.preventDefault(e);
}
}
break;
}
},_resolveCustomBindingMappings:function(){
var _479=DOMUtil.getElementsByTagName(document.documentElement,"bindingmappingset").item(0);
if(_479!=null){
var map={};
var _47b=DOMUtil.getElementsByTagName(_479,"bindingmapping");
new List(_47b).each(function(_47c){
var _47d=_47c.getAttribute("element");
var _47e=_47c.getAttribute("binding");
map[_47d]=eval(_47e);
});
this.setCustomUserInterfaceMapping(new UserInterfaceMapping(map));
}
},setCustomUserInterfaceMapping:function(_47f){
if(this.customUserInterfaceMapping==null){
this.customUserInterfaceMapping=_47f;
}else{
this.customUserInterfaceMapping.merge(_47f);
}
},_registerBindings:function(_480){
var _481=new DocumentCrawler();
_481.mode=DocumentCrawler.MODE_REGISTER;
_481.crawl(_480);
_481.dispose();
},_attachBindings:function(_482){
var _483=new DocumentCrawler();
_483.mode=DocumentCrawler.MODE_ATTACH;
var list=new List();
_483.crawl(_482,list);
var _485=false;
while(list.hasNext()){
var _486=list.getNext();
if(!_486.isAttached){
_486.onBindingAttach();
if(!_486.memberDependencies){
_486.onBindingInitialize();
}
if(Interfaces.isImplemented(IData,_486)){
_485=true;
}
}
}
if(_485){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_483.dispose();
list.dispose();
},attachBindings:function(_488){
this._registerBindings(_488);
this._attachBindings(_488);
},detachBindings:function(_489,_48a){
var _48b=new DocumentCrawler();
_48b.mode=DocumentCrawler.MODE_DETACH;
var list=new List();
_48b.crawl(_489,list);
if(_48a==true){
list.extractFirst();
}
var _48d=false;
list.reverse().each(function(_48e){
if(Interfaces.isImplemented(IData,_48e)){
_48d=true;
}
_48e.dispose(true);
});
if(_48d){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_48b.dispose();
list.dispose();
},detachAllBindings:function(){
this.detachBindings(document.documentElement);
},computeMaxIndex:function(){
if(this._maxIndex==-1){
this._maxIndex=DOMUtil.getMaxIndex(document);
}
return this._maxIndex++;
},_isTextInputElement:function(_490){
return (/textarea|input/.test(DOMUtil.getLocalName(_490)));
},_makeDocumentUnselectable:function(){
if(Client.isExplorer){
DOMEvents.addEventListener(document,DOMEvents.SELECTSTART,this);
}else{
}
}};
var DocumentManager=new _DocumentManager();
function _DataManager(){
}
_DataManager.prototype={isPostBackFun:false,_logger:SystemLogger.getLogger("DataManager ["+document.title+"]"),_dataBindings:{},isDirty:false,dirty:function(_491){
this.isDirty=true;
var _492=false;
if(_491!=null&&!_491.isDirty){
_491.isDirty=true;
_491.dispatchAction(Binding.ACTION_DIRTY);
_492=true;
}
return _492;
},clean:function(_493){
if(_493.isDirty){
_493.isDirty=false;
}
},registerDataBinding:function(name,_495){
if(Interfaces.isImplemented(IData,_495,true)){
if(this._dataBindings[name]!=null){
throw "no proper support for checkbox multiple values! "+name;
}else{
this._dataBindings[name]=_495;
}
}else{
throw "Invalid DataBinding: "+_495;
}
},unRegisterDataBinding:function(name){
if(this._dataBindings[name]!=null){
delete this._dataBindings[name];
}
},getDataBinding:function(name){
var _498=null;
if(this._dataBindings[name]!=null){
_498=this._dataBindings[name];
}
return _498;
},getAllDataBindings:function(_499){
var list=new List();
for(var name in this._dataBindings){
var _49c=this._dataBindings[name];
list.add(_49c);
if(_499&&_49c instanceof WindowBinding){
var _49d=_49c.getContentWindow().DataManager;
if(_49d!=null){
list.merge(_49d.getAllDataBindings());
}
}
}
return list;
},hasDataBindings:function(){
var _49e=false;
for(var name in this._dataBindings){
_49e=true;
break;
}
return _49e;
},populateDataBindings:function(map){
if(map instanceof DataBindingMap){
map.each(function(name,_4a2){
var _4a3=this._dataBindings[name];
if(_4a3!=null){
switch(map.type){
case DataBindingMap.TYPE_RESULT:
try{
_4a3.setResult(_4a2);
}
catch(exception){
if(Application.isDeveloperMode){
alert(_4a3);
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
var _4a4=new DataBindingMap();
_4a4.type=DataBindingMap.TYPE_VALUE;
for(var name in this._dataBindings){
var _4a6=this._dataBindings[name];
if(_4a6 instanceof DataDialogBinding){
throw "DataDialogBinding valuemap not supported!";
}
_4a4[name]=_4a6.getValue();
}
return _4a4;
},getDataBindingResultMap:function(){
var _4a7=new DataBindingMap();
_4a7.type=DataBindingMap.TYPE_RESULT;
for(var name in this._dataBindings){
var _4a9=this._dataBindings[name];
var res=_4a9.getResult();
if(res instanceof DataBindingMap){
res.each(function(name,_4ac){
_4a7.set(name,_4ac);
});
}else{
_4a7.set(name,res);
}
}
return _4a7;
},getPostBackString:function(){
var _4ad="";
var form=document.forms[0];
if(form!=null){
var _4af="";
new List(form.elements).each(function(_4b0){
var name=_4b0.name;
var _4b2=encodeURIComponent(_4b0.value);
switch(_4b0.type){
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_4ad+=name+"="+_4b2+"&";
break;
case "submit":
if(document.activeElement==_4b0){
_4ad+=name+"="+_4b2+"&";
}
break;
case "radio":
if(_4b0.checked){
_4ad+=name+"="+_4b2+"&";
}
break;
case "checkbox":
if(_4b0.checked){
if(_4b0.name==_4af){
if(_4ad.lastIndexOf("&")==_4ad.length-1){
_4ad=_4ad.substr(0,_4ad.length-1);
}
_4ad+=","+_4b2;
}else{
_4ad+=name+"="+_4b0.value;
}
_4af=name;
_4ad+="&";
}
break;
}
});
}
return _4ad.substr(0,_4ad.length-1);
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
var _4bb=null;
var _4bc=null;
var _4bd=false;
if(!this._cache[name]){
_4bd=true;
var uri=Constants.TEMPLATESROOT+"/"+name;
var _4bf=DOMUtil.getXMLHTTPRequest();
_4bf.open("get",uri,false);
_4bf.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_4bf.send(null);
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4bc=_4bf.responseText;
break;
default:
_4bc=_4bf.responseXML;
break;
}
if(_4bc==null){
throw new Error("Templates: Could not read template. Malformed XML?");
}else{
this._cache[name]=_4bc;
}
}
_4bc=this._cache[name];
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4bb=_4bc;
break;
case this._modes.MODE_DOCUMENT:
_4bb=DOMUtil.cloneNode(_4bc,true);
break;
case this._modes.MODE_ELEMENT:
_4bb=DOMUtil.cloneNode(_4bc.documentElement,true);
break;
case this._modes.MODE_DOCUMENTTEXT:
_4bb=DOMSerializer.serialize(_4bc,true);
break;
case this._modes.MODE_ELEMENTTEXT:
_4bb=DOMSerializer.serialize(_4bc.documentElement,true);
break;
}
if(_4bd&&Application.isDeveloperMode){
this._logger.fine(new String("Import \""+name+"\":\n\n"+_4bb));
}
return _4bb;
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
},invoke:function(url,_4c3,_4c4){
this._logger.error("Not implemented");
},invokeModal:function(url,_4c6,_4c7){
var _4c8=new DialogViewDefinition({handle:KeyMaster.getUniqueKey(),position:Dialog.MODAL,url:url,handler:_4c6,argument:_4c7});
StageBinding.presentViewDefinition(_4c8);
return _4c8;
},invokeDefinition:function(_4c9){
if(_4c9 instanceof DialogViewDefinition){
StageBinding.presentViewDefinition(_4c9);
}
return _4c9;
},question:function(_4ca,text,_4cc,_4cd){
if(!_4cc){
_4cc=this.BUTTONS_ACCEPT_CANCEL;
}
this._standardDialog(this._TYPE_QUESTION,_4ca,text,_4cc,_4cd);
},message:function(_4ce,text,_4d0,_4d1){
if(!_4d0){
_4d0=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_MESSAGE,_4ce,text,_4d0,_4d1);
},error:function(_4d2,text,_4d4,_4d5){
if(!_4d4){
_4d4=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_ERROR,_4d2,text,_4d4,_4d5);
},warning:function(_4d6,text,_4d8,_4d9){
if(!_4d8){
_4d8=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_WARNING,_4d6,text,_4d8,_4d9);
},_standardDialog:function(type,_4db,text,_4dd,_4de){
var _4df=null;
if(!_4dd){
_4df=new List(Dialog.BUTTONS_ACCEPT);
}else{
_4df=new List();
new List(_4dd).each(function(_4e0){
var _4e1=null;
switch(typeof _4e0){
case "object":
_4e1=_4e0;
break;
case "string":
var _4e2=false;
if(_4e0.indexOf(":")>-1){
_4e0=_4e0.split(":")[0];
_4e2=true;
}
_4e1=Dialog._dialogButtons[_4e0];
if(_4e2){
_4e1.isDefault=true;
}
break;
}
_4df.add(_4e1);
});
}
var _4e3={title:_4db,text:text,type:type,image:this._dialogImages[type],buttons:_4df};
var _4e4=new DialogViewDefinition({handle:"standarddialog:"+type,position:Dialog.MODAL,url:this._URL_STANDARDDIALOG,handler:_4de,argument:_4e3});
StageBinding.presentViewDefinition(_4e4);
}};
var Dialog=new _Dialog();
function _Commands(){
this._construct();
}
_Commands.prototype={_URL_ABOUTDIALOG:"${root}/content/dialogs/about/about.aspx",_URL_PREFERENCES:"${root}/content/dialogs/preferences/preferences.aspx",_construct:function(){
var self=this;
EventBroadcaster.subscribe(BroadcastMessages.SAVE_ALL,{handleBroadcast:function(_4e6,arg){
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
},saveAll:function(_4e9){
var self=this;
var _4eb=Application.getDirtyDockTabsTabs();
if(_4eb.hasEntries()){
Dialog.invokeModal("${root}/content/dialogs/save/saveall.aspx",{handleDialogResponse:function(_4ec,_4ed){
switch(_4ec){
case Dialog.RESPONSE_ACCEPT:
self._handleSaveAllResult(_4ed,_4e9);
break;
case Dialog.RESPONSE_CANCEL:
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
break;
}
}},_4eb);
}else{
if(_4e9){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
},_handleSaveAllResult:function(_4ee,_4ef){
var _4f0=false;
var list=new List();
_4ee.each(function(name,tab){
if(tab!=false){
list.add(tab);
}
});
if(list.hasEntries()){
_4f0=true;
var _4f4=list.getLength();
var _4f5={handleBroadcast:function(_4f6,tab){
if(--_4f4==0){
EventBroadcaster.unsubscribe(BroadcastMessages.DOCKTAB_CLEAN,this);
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
if(_4ef){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
}};
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,_4f5);
list.each(function(tab){
tab.saveContainedEditor();
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
}
return _4f0;
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
var _4fa="Composite.Management.Help";
if(!StageBinding.isViewOpen(_4fa)){
StageBinding.handleViewPresentation(_4fa);
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
var _4fc=document.createEvent("Events");
_4fc.initEvent(type,true,true);
window.dispatchEvent(_4fc);
}else{
this._logger.warn("Prism methods should only be invoked in Prism! ("+type+")");
}
}};
var Prism=new _Prism();
ViewDefinition.DEFAULT_URL="${root}/blank.aspx";
ViewDefinition.clone=function(_4fd,_4fe){
var _4ff=null;
var _500=ViewDefinitions[_4fd];
if(_500.isMutable){
var impl=null;
if(_500 instanceof DialogViewDefinition){
impl=DialogViewDefinition;
}else{
impl=HostedViewDefinition;
}
if(_4fe!=null&&impl!=null){
var def=new impl();
for(var prop in _500){
def[prop]=_500[prop];
}
def.handle=_4fe;
_4ff=def;
}else{
throw "Cannot clone without newhandle";
}
}else{
throw "Cannot clone non-mutable definition";
}
return _4ff;
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
Binding.evaluate=function(_509,_50a){
var _50b=null;
var _50c=_50a.bindingWindow.WindowManager;
if(_50c!=null){
var _50d=Binding.parseScriptStatement(_509,_50a.key);
_50b=_50c.evaluate(_50d);
}
return _50b;
};
Binding.parseScriptStatement=function(_50e,key){
if(_50e!=null&&key!=null){
var _510="UserInterface.getBindingByKey ( \""+key+"\" )";
_50e=_50e.replace(/(\W|^)this(,| +|\)|;)/g,_510);
_50e=_50e.replace(/(\W|^)this(\.)/g,_510+".");
}
return _50e;
};
Binding.exists=function(_511){
var _512=false;
try{
if(_511&&_511.bindingElement&&_511.bindingElement.nodeType&&_511.isDisposed==false){
_512=true;
}
}
catch(accessDeniedException){
_512=false;
}
finally{
return _512;
}
};
Binding.destroy=function(_513){
if(!_513.isDisposed){
if(_513.acceptor!=null){
_513.acceptor.dispose();
}
if(_513.dragger!=null){
_513.disableDragging();
}
if(_513.boxObject!=null){
_513.boxObject.dispose();
}
if(_513._domEventHandlers!=null){
DOMEvents.cleanupEventListeners(_513);
}
for(var _514 in _513.shadowTree){
var _515=_513.shadowTree[_514];
if(_515 instanceof Binding&&Binding.exists(_515)){
_515.dispose(true);
}
_513.shadowTree[_514]=null;
}
_513.isDisposed=true;
_513=null;
}
};
Binding.dotnetify=function(_516,_517){
var _518=_516.getCallBackID();
if(_518!=null){
var _519=DOMUtil.createElementNS(Constants.NS_XHTML,"input",_516.bindingDocument);
_519.type="hidden";
_519.id=_518;
_519.name=_518;
_519.value=_517!=null?_517:"";
_516.bindingElement.appendChild(_519);
_516.shadowTree.dotnetinput=_519;
}else{
throw _516.toString()+": Missing callback ID";
}
};
Binding.imageProfile=function(_51a){
var _51b=_51a.getProperty("image");
var _51c=_51a.getProperty("image-hover");
var _51d=_51a.getProperty("image-active");
var _51e=_51a.getProperty("image-disabled");
if(_51a.imageProfile==null){
if(_51a.image==null&&_51b!=null){
_51a.image=_51b;
}
if(_51a.imageHover==null&&_51c!=null){
_51a.imageHover=_51b;
}
if(_51a.imageActive==null&&_51d!=null){
_51a.imageActive=_51d;
}
if(_51a.imageDisabled==null&&_51e!=null){
_51a.imageDisabled=_51e;
}
if(_51a.image||_51a.imageHover||_51a.imageActive||_51a.imageDisabled){
_51a.imageProfile=new ImageProfile(_51a);
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
var _521=this.dependentBindings[key];
_521.onMemberInitialize(this);
}
}
this.isInitialized=true;
};
Binding.prototype.onMemberInitialize=function(_522){
if(_522){
this.memberDependencies[_522.key]=true;
var _523=true;
for(var key in this.memberDependencies){
if(this.memberDependencies[key]==false){
_523=false;
break;
}
}
if(_523){
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
Binding.prototype.detachRecursive=function(_525){
if(_525==null){
_525=false;
}
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement,!_525);
};
Binding.prototype.addMember=function(_526){
if(!this.isAttached){
throw "Cannot add members to unattached binding";
}else{
if(!_526.isInitialized){
if(!this.memberDependencies){
this.memberDependencies={};
}
this.memberDependencies[_526.key]=false;
_526.registerDependentBinding(this);
}
}
return _526;
};
Binding.prototype.addMembers=function(_527){
while(_527.hasNext()){
var _528=_527.getNext();
if(!_528.isInitialized){
this.addMember(_528);
}
}
return _527;
};
Binding.prototype.registerDependentBinding=function(_529){
if(!this.dependentBindings){
this.dependentBindings={};
}
this.dependentBindings[_529.key]=_529;
};
Binding.prototype._initializeBindingPersistanceFeatures=function(){
var _52a=this.getProperty("persist");
if(_52a&&Persistance.isEnabled){
var id=this.bindingElement.id;
if(!KeyMaster.hasKey(id)){
this._persist={};
var _52c=new List(_52a.split(" "));
while(_52c.hasNext()){
var prop=_52c.getNext();
var _52e=Persistance.getPersistedProperty(id,prop);
if(_52e!=null){
this._persist[prop]=_52e;
this.setProperty(prop,_52e);
}else{
_52e=this.getProperty(prop);
if(_52e!=null){
this._persist[prop]=_52e;
}
}
}
}else{
throw "Persistable bindings must have a specified ID.";
}
}
};
Binding.prototype._initializeBindingGeneralFeatures=function(){
var _52f=this.getProperty("disabled");
var _530=this.getProperty("contextmenu");
var _531=this.getProperty("observes");
var _532=this.getProperty("onattach");
var _533=this.getProperty("hidden");
var _534=this.getProperty("blockactionevents");
if(_533==true&&this.isVisible==true){
this.hide();
}
if(_52f&&this.logger!=null){
this.logger.error("The 'disabled' property has been renamed 'isdisbaled'");
}
if(_530){
this.setContextMenu(_530);
}
if(_531){
this.observe(this.getBindingForArgument(_531));
}
if(_534==true){
this.isBlockingActions=true;
}
if(this.isActivationAware==true){
var root=UserInterface.getBinding(this.bindingDocument.body);
root.makeActivationAware(this);
this._hasActivationAwareness=true;
}
if(_532!=null){
Binding.evaluate(_532,this);
}
};
Binding.prototype._initializeBindingDragAndDropFeatures=function(){
var _536=this.getProperty("draggable");
var _537=this.getProperty("dragtype");
var _538=this.getProperty("dragaccept");
var _539=this.getProperty("dragreject");
if(_536!=null){
this.isDraggable=_536;
}
if(_537!=null){
this.dragType=_537;
if(_536!=false){
this.isDraggable=true;
}
}
if(_538!=null){
this.dragAccept=_538;
}
if(_539!=null){
this.dragReject=_539;
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
Binding.prototype._updateBindingMap=function(_53a){
try{
if(this.bindingWindow){
var id=this.bindingElement.id;
var map=this.bindingWindow.bindingMap;
var _53d=null;
if(_53a){
_53d=map[id];
if(_53d!=null&&_53d!=this){
var cry=this.toString()+" duplicate binding ID: "+id;
this.logger.error(cry);
if(Application.isDeveloperMode){
throw (cry);
}
}else{
map[id]=this;
}
}else{
_53d=map[id];
if(_53d!=null&&_53d==this){
delete map[id];
}
}
}else{
var _53f=new String("Binding#_updateBindingMap odd dysfunction: "+this.toString()+": "+_53a);
if(Application.isDeveloperMode==true){
alert(_53f);
}else{
this.logger.error(_53f);
}
}
}
catch(exception){
this.logger.error(exception);
}
};
Binding.prototype.handleEvent=function(e){
};
Binding.prototype.handleAction=function(_541){
};
Binding.prototype.handleBroadcast=function(_542,arg){
};
Binding.prototype.handleElement=function(_544){
return false;
};
Binding.prototype.updateElement=function(_545){
return false;
};
Binding.prototype.getBindingForArgument=function(arg){
var _547=null;
switch(typeof arg){
case "object":
_547=arg;
break;
case "string":
_547=this.bindingDocument.getElementById(arg);
if(_547==null){
_547=Binding.evaluate(arg,this);
}
break;
}
if(_547!=null&&_547.nodeType!=null){
_547=UserInterface.getBinding(_547);
}
return _547;
};
Binding.prototype.serialize=function(){
var _548={};
var id=this.bindingElement.id;
if(id&&id!=this.key){
_548.id=id;
}
var _54a=this.getProperty("binding");
if(_54a){
_548.binding=_54a;
}
if(!BindingSerializer.includeShadowTreeBindings){
var _54b=this.getAncestorBindingByLocalName("*");
if(_54b){
if(_54b.isShadowBinding){
this.isShadowBinding=true;
_548=false;
}else{
var tree=_54b.shadowTree;
for(var key in tree){
var _54e=tree[key];
if(_54e==this){
this.isShadowBinding=true;
_548=false;
}
}
}
}
}
return _548;
};
Binding.prototype.serializeToString=function(_54f){
var _550=null;
if(this.isAttached){
_550=new BindingSerializer().serializeBinding(this,_54f);
}else{
throw "cannot serialize unattached binding";
}
return _550;
};
Binding.prototype.subTreeFromString=function(_551){
this.detachRecursive();
this.bindingElement.innerHTML=_551;
this.attachRecursive();
};
Binding.prototype.getProperty=function(_552){
var _553=this.bindingElement.getAttribute(_552);
if(_553){
_553=Types.castFromString(_553);
}
return _553;
};
Binding.prototype.setProperty=function(prop,_555){
if(_555!=null){
_555=_555.toString();
if(String(this.bindingElement.getAttribute(prop))!=_555){
this.bindingElement.setAttribute(prop,_555);
if(this.isAttached==true){
if(Persistance.isEnabled&&_555!=null){
if(this._persist!=null&&this._persist[prop]){
this._persist[prop]=_555;
Persistance.setPersistedProperty(this.bindingElement.id,prop,_555);
}
}
var _556=this.propertyMethodMap[prop];
if(_556){
_556.call(this,this.getProperty(prop));
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
var _558=null;
if(Binding.exists(this)){
_558=this.bindingElement.id;
}else{
SystemDebug.stack(arguments);
}
return _558;
};
Binding.prototype.attachClassName=function(_559){
CSSUtil.attachClassName(this.bindingElement,_559);
};
Binding.prototype.detachClassName=function(_55a){
CSSUtil.detachClassName(this.bindingElement,_55a);
};
Binding.prototype.hasClassName=function(_55b){
return CSSUtil.hasClassName(this.bindingElement,_55b);
};
Binding.prototype.addActionListener=function(type,_55d){
_55d=_55d!=null?_55d:this;
if(Action.isValid(type)){
if(Interfaces.isImplemented(IActionListener,_55d)){
if(!this.actionListeners[type]){
this.actionListeners[type]=[];
}
this.actionListeners[type].push(_55d);
}else{
throw new Error("Could not add action-event listener. Method handleAction not implemented.");
}
}else{
alert(this+"\nCould not add undefined Action ("+_55d+")");
}
};
Binding.prototype.removeActionListener=function(type,_55f){
_55f=_55f?_55f:this;
if(Action.isValid(type)){
var _560=this.actionListeners[type];
if(_560){
var i=0,_562;
while((_562=_560[i])!=null){
if(_562==_55f){
_560.splice(i,1);
break;
}
i++;
}
}
}
};
Binding.prototype.addEventListener=function(type,_564){
_564=_564?_564:this;
DOMEvents.addEventListener(this.bindingElement,type,_564);
};
Binding.prototype.removeEventListener=function(type,_566){
_566=_566?_566:this;
DOMEvents.removeEventListener(this.bindingElement,type,_566);
};
Binding.prototype.subscribe=function(_567){
if(!this.hasSubscription(_567)){
this._subscriptions.set(_567,true);
EventBroadcaster.subscribe(_567,this);
}else{
this.logger.error("Dubplicate subscription aborted:"+_567);
}
};
Binding.prototype.unsubscribe=function(_568){
if(this.hasSubscription(_568)){
this._subscriptions.del(_568);
EventBroadcaster.unsubscribe(_568,this);
}
};
Binding.prototype.hasSubscription=function(_569){
return this._subscriptions.has(_569);
};
Binding.prototype.observe=function(_56a,_56b){
_56a.addObserver(this,_56b);
};
Binding.prototype.unObserve=function(_56c,_56d){
_56c.removeObserver(this,_56d);
};
Binding.prototype.setContextMenu=function(arg){
this.contextMenuBinding=this.getBindingForArgument(arg);
if(this.contextMenuBinding){
var self=this;
var menu=this.contextMenuBinding;
this.addEventListener(DOMEvents.CONTEXTMENU,{handleEvent:function(e){
if(Interfaces.isImplemented(IActionListener,self)==true){
var _572={handleAction:function(){
menu.removeActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.removeActionListener(PopupBinding.ACTION_HIDE,_572);
}};
menu.addActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.addActionListener(PopupBinding.ACTION_HIDE,_572);
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
var _574=null;
var _575=null;
var _576=false;
if(arg instanceof Action){
_574=arg;
}else{
if(Action.isValid(arg)){
_574=new Action(this,arg);
_576=true;
}
}
if(_574!=null&&Action.isValid(_574.type)==true){
if(_574.isConsumed==true){
_575=_574;
}else{
var _577=this.actionListeners[_574.type];
if(_577!=null){
_574.listener=this;
var i=0,_579;
while((_579=_577[i++])!=null){
if(_579&&_579.handleAction){
_579.handleAction(_574);
}
}
}
var _57a=true;
if(this.isBlockingActions==true){
switch(_574.type){
case Binding.ACTION_FOCUSED:
case Binding.ACTION_BLURRED:
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FORCE_REFLEX:
case DockTabBinding.ACTION_UPDATE_VISUAL:
case PageBinding.ACTION_DOPOSTBACK:
break;
default:
if(!_576){
_57a=false;
}
break;
}
}
if(_57a){
_575=this.migrateAction(_574);
}else{
_575=_574;
}
}
}
return _575;
};
Binding.prototype.migrateAction=function(_57b){
var _57c=null;
var _57d=null;
var node=this.getMigrationParent();
if(node){
while(node&&!_57c&&node.nodeType!=Node.DOCUMENT_NODE){
_57c=UserInterface.getBinding(node);
node=node.parentNode;
}
if(_57c){
_57d=_57c.dispatchAction(_57b);
}else{
_57d=_57b;
}
}
return _57d;
};
Binding.prototype.reflex=function(_57f){
if(Application.isOperational==true){
FlexBoxBinding.reflex(this,_57f);
}
};
Binding.prototype.getMigrationParent=function(){
var _580=null;
if(true){
try{
var _581=this.bindingElement.parentNode;
if(_581!=null){
_580=_581;
}
}
catch(wtfException){
this.logger.error("Binding#getMigrationParent exception");
SystemDebug.stack(arguments);
_580=null;
}
}
return _580;
};
Binding.prototype.add=function(_582){
if(_582.bindingDocument==this.bindingDocument){
this.bindingElement.appendChild(_582.bindingElement);
}else{
throw "Could not add "+_582.toString()+" of different document origin.";
}
return _582;
};
Binding.prototype.addFirst=function(_583){
if(_583.bindingDocument==this.bindingDocument){
this.bindingElement.insertBefore(_583.bindingElement,this.bindingElement.firstChild);
}else{
throw "Could not add "+_583.toString()+" of different document origin.";
}
return _583;
};
Binding.prototype.getAncestorBindingByLocalName=function(_584,_585){
return BindingFinder.getAncestorBindingByLocalName(this,_584,_585);
};
Binding.prototype.getAncestorBindingByType=function(impl,_587){
return BindingFinder.getAncestorBindingByType(this,impl,_587);
};
Binding.prototype.getChildBindingByType=function(impl){
return BindingFinder.getChildBindingByType(this,impl);
};
Binding.prototype.getChildElementsByLocalName=function(_589){
return BindingFinder.getChildElementsByLocalName(this,_589);
};
Binding.prototype.getChildElementByLocalName=function(_58a){
return this.getChildElementsByLocalName(_58a).getFirst();
};
Binding.prototype.getDescendantElementsByLocalName=function(_58b){
return new List(DOMUtil.getElementsByTagName(this.bindingElement,_58b));
};
Binding.prototype.getChildBindingsByLocalName=function(_58c){
return this.getDescendantBindingsByLocalName(_58c,true);
};
Binding.prototype.getChildBindingByLocalName=function(_58d){
return this.getChildBindingsByLocalName(_58d).getFirst();
};
Binding.prototype.getDescendantBindingsByLocalName=function(_58e,_58f){
return BindingFinder.getDescendantBindingsByLocalName(this,_58e,_58f);
};
Binding.prototype.getDescendantBindingByLocalName=function(_590){
return this.getDescendantBindingsByLocalName(_590,false).getFirst();
};
Binding.prototype.getDescendantBindingsByType=function(impl){
return BindingFinder.getDescendantBindingsByType(this,impl);
};
Binding.prototype.getDescendantBindingByType=function(impl){
return BindingFinder.getDescendantBindingByType(this,impl);
};
Binding.prototype.getNextBindingByLocalName=function(_593){
return BindingFinder.getNextBindingByLocalName(this,_593);
};
Binding.prototype.getPreviousBindingByLocalName=function(_594){
return BindingFinder.getPreviousBindingByLocalName(this,_594);
};
Binding.prototype.getBindingElement=function(){
return this.bindingDocument.getElementById(this.bindingElement.id);
};
Binding.prototype.getOrdinalPosition=function(_595){
return DOMUtil.getOrdinalPosition(this.bindingElement,_595);
};
Binding.prototype.isFirstBinding=function(_596){
return (this.getOrdinalPosition(_596)==0);
};
Binding.prototype.isLastBinding=function(_597){
return DOMUtil.isLastElement(this.bindingElement,_597);
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
Binding.prototype.setCallBackArg=function(_599){
this.setProperty(Binding.CALLBACKARG,_599);
};
Binding.prototype.dispose=function(_59a){
if(!this.isDisposed){
if(!_59a){
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement);
var _59b=this.bindingDocument.getElementById(this.bindingElement.id);
if(_59b){
if(Client.isExplorer){
_59b.outerHTML="";
}else{
_59b.parentNode.removeChild(_59b);
}
}
}else{
if(this._subscriptions.hasEntries()){
var self=this;
var list=new List();
this._subscriptions.each(function(_59e){
list.add(_59e);
});
list.each(function(_59f){
self.unsubscribe(_59f);
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
Binding.prototype.wakeUp=function(_5a1,_5a2){
_5a2=_5a2?_5a2:Binding.SNOOZE;
if(this.isLazy==true){
this.deleteProperty("lazy");
this.isLazy=false;
Application.lock(this);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
var self=this;
setTimeout(function(){
self.attachRecursive();
setTimeout(function(){
if(_5a1!==undefined){
self[_5a1]();
}
LazyBindingBinding.wakeUp(self);
Application.unlock(self);
},_5a2);
},0);
}
};
Binding.prototype.handleCrawler=function(_5a4){
if(_5a4.response==null&&this.isLazy==true){
if(_5a4.id==DocumentCrawler.ID&&_5a4.mode==DocumentCrawler.MODE_REGISTER){
_5a4.response=NodeCrawler.NORMAL;
}else{
_5a4.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5a4.response==null&&this.crawlerFilters!=null){
if(this.crawlerFilters.has(_5a4.id)){
_5a4.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5a4.response==null){
switch(_5a4.id){
case FlexBoxCrawler.ID:
case FocusCrawler.ID:
if(!this.isVisible){
_5a4.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
}
};
Binding.newInstance=function(_5a5){
var _5a6=DOMUtil.createElementNS(Constants.NS_UI,"ui:binding",_5a5);
return UserInterface.registerBinding(_5a6,Binding);
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
var _5a7=new List(ConfigurationService.GetValidatingRegularExpressions("dummy"));
_5a7.each(function(_5a8){
DataBinding.expressions[_5a8.Key]=new RegExp(_5a8.Value);
});
}});
DataBinding.expressions={};
DataBinding.warnings={"required":"Required","number":"Numbers only","integer":"Integers only","programmingidentifier":"Invalid identifier","programmingnamespace":"Invalid namespace","url":"Invalid URL","minlength":"${count} characters minimum","maxlength":"${count} characters maximum","currency":"Invalid notation","email":"Invalid e-mail","guid":"Invalid GUID"};
DataBinding.errors={"programmingidentifier":"An identifier must not contain spaces or special characters. Only characters a-z, A-Z and 0-9 are allowed. An identifier must begin with a letter (not a number).","programmingnamespace":"A namespace must take the form Example.Name.Space where only characters a-z, A-Z, 0-9 and dots (.) are allowed. Each part of the namespace must begin with a letter (not a number).","url":"A valid URL must begin with a forward slash, designating the site root, or an URL scheme name such as http://. Simpliefied addresses such as www.example.com cannot be resolved reliably by the browser. Relative URLs are not supported."};
DataBinding.getAssociatedLabel=function(_5a9){
var _5aa=null;
var _5ab=_5a9.getAncestorBindingByLocalName("field");
if(_5ab&&_5ab instanceof FieldBinding){
var desc=_5ab.getDescendantBindingByLocalName("fielddesc");
if(desc&&desc instanceof FieldDescBinding){
_5aa=desc.getLabel();
}
}
return _5aa;
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
var _5ae=this.bindingWindow.DataManager;
_5ae.unRegisterDataBinding(this._name);
};
DataBinding.prototype.setName=function(name){
var _5b0=this.bindingWindow.DataManager;
if(_5b0.getDataBinding(name)){
_5b0.unRegisterDataBinding(name);
}
_5b0.registerDataBinding(name,this);
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
RootBinding.prototype.handleBroadcast=function(_5b1,arg){
RootBinding.superclass.handleBroadcast.call(this,_5b1,arg);
var _5b3=this.bindingWindow.WindowManager.WINDOW_EVALUATED_BROADCAST;
switch(_5b1){
case _5b3:
this.dispatchAction(RootBinding.ACTION_PHASE_1);
this.dispatchAction(RootBinding.ACTION_PHASE_2);
this.dispatchAction(RootBinding.ACTION_PHASE_3);
this.unsubscribe(_5b3);
break;
}
};
RootBinding.prototype.onActivate=function(){
this._onActivationChanged(true);
};
RootBinding.prototype.onDeactivate=function(){
this._onActivationChanged(false);
};
RootBinding.prototype._onActivationChanged=function(_5b4){
var _5b5=_5b4?RootBinding.ACTION_ACTIVATED:RootBinding.ACTION_DEACTIVATED;
if(_5b4!=this.isActivated){
this.isActivated=_5b4;
this.dispatchAction(_5b5);
var _5b6=new List();
var self=this;
this._activationawares.each(function(_5b8){
if(_5b8.isActivationAware){
try{
if(_5b4){
if(!_5b8.isActivated){
_5b8.onActivate();
}
}else{
if(_5b8.isActivated){
_5b8.onDeactivate();
}
}
}
catch(exception){
self.logger.error(exception);
_5b6.add(_5b8);
}
}
});
_5b6.each(function(_5b9){
this._activationawares.del(_5b9);
});
_5b6.dispose();
}else{
var _5ba="Activation dysfunction: "+this.bindingDocument.title;
if(Application.isDeveloperMode==true){
this.logger.error(_5ba);
}else{
this.logger.error(_5ba);
}
}
};
RootBinding.prototype.makeActivationAware=function(_5bb,_5bc){
if(Interfaces.isImplemented(IActivationAware,_5bb,true)==true){
if(_5bc==false){
this._activationawares.del(_5bb);
}else{
this._activationawares.add(_5bb);
if(this.isActivated==true){
_5bb.onActivate();
}
}
}else{
if(Application.isDeveloperMode==true){
alert("RootBinding: IActivationAware not implemented ("+_5bb+")");
}
}
};
RootBinding.prototype._setupActivationAwareness=function(_5bd){
var _5be=this.getMigrationParent();
if(_5be!=null){
var root=_5be.ownerDocument.body;
var _5c0=UserInterface.getBinding(root);
if(_5c0!=null){
_5c0.makeActivationAware(this,_5bd);
}
}
};
RootBinding.prototype.handleCrawler=function(_5c1){
RootBinding.superclass.handleCrawler.call(this,_5c1);
if(_5c1.type==NodeCrawler.TYPE_ASCENDING){
_5c1.nextNode=this.bindingWindow.frameElement;
}
};
RootBinding.prototype.getMigrationParent=function(){
var _5c2=null;
if(this.bindingWindow.parent){
_5c2=this.bindingWindow.frameElement;
}
return _5c2;
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
var _5c3=new List(DOMUtil.getElementsByTagName(this.bindingElement,"td"));
while(_5c3.hasNext()){
var cell=_5c3.getNext();
this.shadowTree[cell.className]=cell;
}
};
MatrixBinding.prototype.add=function(_5c5){
var _5c6=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
this.shadowTree[MatrixBinding.CENTER].appendChild(_5c5.bindingElement);
_5c6=_5c5;
}else{
_5c6=MatrixBinding.superclass.add.call(this,_5c5);
}
return _5c6;
};
MatrixBinding.prototype.addFirst=function(_5c7){
var _5c8=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
var _5c9=this.shadowTree[MatrixBinding.CENTER];
_5c9.insertBefore(_5c7.bindingElement,_5c9.firstChild);
_5c8=_5c7;
}else{
_5c8=MatrixBinding.superclass.addFirst.call(this,_5c7);
}
return _5c7;
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
MatrixBinding.newInstance=function(_5cb){
var _5cc=DOMUtil.createElementNS(Constants.NS_UI,"ui:matrix",_5cb);
return UserInterface.registerBinding(_5cc,MatrixBinding);
};
FlexBoxBinding.prototype=new Binding;
FlexBoxBinding.prototype.constructor=FlexBoxBinding;
FlexBoxBinding.superclass=Binding.prototype;
FlexBoxBinding.CLASSNAME="flexboxelement";
FlexBoxBinding.TIMEOUT=250;
FlexBoxBinding.reflex=function(_5cd,_5ce){
var list=new List();
var _5d0=new FlexBoxCrawler();
_5d0.mode=_5ce?FlexBoxCrawler.MODE_FORCE:FlexBoxCrawler.MODE_NORMAL;
_5d0.startBinding=_5cd;
_5d0.crawl(_5cd.bindingElement,list);
list.each(function(_5d1){
_5d1.flex();
});
if(Client.isExplorer){
setTimeout(function(){
list.each(function(_5d2){
if(Binding.exists(_5d2)){
_5d2.flex();
}
});
},0.5*FlexBoxBinding.TIMEOUT);
}
setTimeout(function(){
list.each(function(_5d3){
if(Binding.exists(_5d3)){
_5d3.isFlexSuspended=false;
}
});
list.dispose();
},FlexBoxBinding.TIMEOUT);
_5d0.dispose();
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
FlexBoxBinding.prototype.handleAction=function(_5d4){
FlexBoxBinding.superclass.handleAction.call(this,_5d4);
switch(_5d4.type){
case Binding.ACTION_UPDATED:
this.isFit=false;
break;
}
};
FlexBoxBinding.prototype._getSiblingsSpan=function(_5d5){
var _5d6=0;
var _5d7=new List(this.bindingElement.parentNode.childNodes);
while(_5d7.hasNext()){
var _5d8=_5d7.getNext();
if(_5d8.nodeType==Node.ELEMENT_NODE&&_5d8!=this.bindingElement){
if(!this._isOutOfFlow(_5d8)){
var rect=_5d8.getBoundingClientRect();
if(_5d5){
height+=(rect.right-rect.left);
}else{
_5d6+=(rect.bottom-rect.top);
}
}
}
}
return _5d6;
};
FlexBoxBinding.prototype._isOutOfFlow=function(_5da){
var _5db=CSSComputer.getPosition(_5da);
var _5dc=CSSComputer.getFloat(_5da);
return (_5db=="absolute"||_5dc!="none"?true:false);
};
FlexBoxBinding.prototype._getCalculatedHeight=function(){
var _5dd=this.bindingElement.parentNode;
var rect=_5dd.getBoundingClientRect();
var _5df=rect.bottom-rect.top;
var _5e0=CSSComputer.getPadding(_5dd);
var _5e1=CSSComputer.getBorder(_5dd);
_5df-=(_5e0.top+_5e0.bottom);
_5df-=(_5e1.top+_5e1.bottom);
return _5df;
};
FlexBoxBinding.prototype._getCalculatedWidth=function(){
var _5e2=this.bindingElement.parentNode;
var rect=_5e2.getBoundingClientRect();
var _5e4=rect.right-rect.left;
var _5e5=CSSComputer.getPadding(_5e2);
var _5e6=CSSComputer.getBorder(_5e2);
_5e4-=(_5e5.left+_5e5.right);
_5e4-=(_5e6.left+_5e6.right);
return _5e4;
};
FlexBoxBinding.prototype.setFlexibility=function(_5e7){
if(_5e7!=this.isFlexible){
if(_5e7){
this.attachClassName(FlexBoxBinding.CLASSNAME);
this.deleteProperty("flex");
}else{
this.detachClassName(FlexBoxBinding.CLASSNAME);
this.setProperty("flex",false);
}
this.isFlexible=_5e7;
}
};
FlexBoxBinding.prototype.flex=function(){
if(Binding.exists(this)){
if(this.isFlexible==true){
var _5e8=this._getSiblingsSpan();
_5e8=this._getCalculatedHeight()-_5e8;
if(!isNaN(_5e8)&&_5e8>=0){
if(_5e8!=this.bindingElement.offsetHeight){
this.bindingElement.style.height=String(_5e8)+"px";
}
}
}
}
};
FlexBoxBinding.prototype.fit=function(_5e9){
if(!this.isFit||_5e9){
var _5ea=0;
new List(this.bindingElement.childNodes).each(function(_5eb){
if(_5eb.nodeType==Node.ELEMENT_NODE){
if(!this._isOutOfFlow(_5eb)){
var rect=_5eb.getBoundingClientRect();
_5ea+=(rect.bottom-rect.top);
}
}
},this);
this._setFitnessHeight(_5ea);
this.isFit=true;
}
};
FlexBoxBinding.prototype._setFitnessHeight=function(_5ed){
var _5ee=CSSComputer.getPadding(this.bindingElement);
var _5ef=CSSComputer.getBorder(this.bindingElement);
_5ed+=_5ee.top+_5ee.bottom;
_5ed+=_5ef.top+_5ef.bottom;
this.bindingElement.style.height=_5ed+"px";
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
ScrollBoxBinding.prototype.handleAction=function(_5f0){
ScrollBoxBinding.superclass.handleAction.call(this,_5f0);
switch(_5f0.type){
case BalloonBinding.ACTION_INITIALIZE:
_5f0.consume();
break;
}
};
ScrollBoxBinding.prototype.setPosition=function(_5f1){
this.bindingElement.scrollLeft=_5f1.x;
this.bindingElement.scrollTop=_5f1.y;
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
var _5f2=this._getBuildElement("labeltext");
if(_5f2){
this.shadowTree.labelText=_5f2;
this.shadowTree.text=_5f2.firstChild;
this.hasLabel=true;
}
}else{
var _5f3=this.getProperty("label");
var _5f4=this.getProperty("image");
var _5f5=this.getProperty("tooltip");
if(_5f3){
this.setLabel(_5f3,false);
}
if(_5f4){
this.setImage(_5f4,false);
}
if(_5f5){
this.setToolTip(_5f5);
}
this.buildClassName();
}
};
LabelBinding.prototype.setLabel=function(_5f6,_5f7){
_5f6=_5f6?_5f6:"";
if(!this.hasLabel){
this.buildLabel();
}
this.shadowTree.text.data=Resolver.resolve(_5f6);
this.setProperty("label",_5f6);
if(!_5f7){
this.buildClassName();
}
};
LabelBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
LabelBinding.prototype.setImage=function(url,_5f9){
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
if(!_5f9){
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
LabelBinding.prototype.setToolTip=function(_5fc){
this.setProperty("tooltip",_5fc);
if(_5fc!=this.getLabel()){
this.setProperty("title",Resolver.resolve(_5fc));
}
};
LabelBinding.prototype.getToolTip=function(_5fd){
return this.getProperty("tooltip");
};
LabelBinding.prototype.flip=function(_5fe){
_5fe=_5fe==null?true:_5fe;
var _5ff=LabelBinding.CLASSNAME_FLIPPED;
if(!Client.isExplorer6){
this.isFlipped=_5fe;
if(_5fe){
this.attachClassName(_5ff);
}else{
this.detachClassName(_5ff);
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
var _600="textonly";
var _601="imageonly";
var _602="both";
if(this.hasLabel&&this.hasImage){
this.detachClassName(_600);
this.detachClassName(_601);
this.attachClassName(_602);
}else{
if(this.hasLabel){
this.detachClassName(_602);
this.detachClassName(_601);
this.attachClassName(_600);
}else{
if(this.hasImage){
this.detachClassName(_602);
this.detachClassName(_600);
this.attachClassName(_601);
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
LabelBinding.newInstance=function(_603){
var _604=DOMUtil.createElementNS(Constants.NS_UI,"ui:labelbox",_603);
return UserInterface.registerBinding(_604,LabelBinding);
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
var _605=this.getProperty("label");
if(!_605){
_605=DOMUtil.getTextContent(this.bindingElement);
}
var text=this.bindingDocument.createTextNode(Resolver.resolve(_605));
this.bindingElement.parentNode.replaceChild(text,this.bindingElement);
this.dispose();
};
TextBinding.prototype.setLabel=function(_607){
this.setProperty("label",_607);
};
TextBinding.newInstance=function(_608){
var _609=DOMUtil.createElementNS(Constants.NS_UI,"ui:text",_608);
return UserInterface.registerBinding(_609,TextBinding);
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
BroadcasterBinding.prototype.setProperty=function(_60a,_60b){
BroadcasterBinding.superclass.setProperty.call(this,_60a,_60b);
function update(list){
if(list){
list.each(function(_60d){
_60d.setProperty(_60a,_60b);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _60e=this._observers[_60a];
if(_60e){
update(_60e);
}
};
BroadcasterBinding.prototype.deleteProperty=function(_60f){
BroadcasterBinding.superclass.deleteProperty.call(this,_60f);
function update(list){
if(list){
list.each(function(_611){
_611.deleteProperty(_60f);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _612=this._observers[_60f];
if(_612){
update(_612);
}
};
BroadcasterBinding.prototype.addObserver=function(_613,_614){
_614=_614?_614:"*";
_614=new List(_614.split(" "));
while(_614.hasNext()){
var _615=_614.getNext();
switch(_615){
case "*":
this._setAllProperties(_613);
break;
default:
var _616=this.getProperty(_615);
_613.setProperty(_615,_616);
break;
}
if(!this._observers[_615]){
this._observers[_615]=new List();
}
this._observers[_615].add(_613);
}
};
BroadcasterBinding.prototype._setAllProperties=function(_617){
var atts=new List(this.bindingElement.attributes);
while(atts.hasNext()){
var att=atts.getNext();
if(att.specified){
var _61a=att.nodeName;
switch(_61a){
case "id":
case "key":
break;
default:
var _61b=this.getProperty(_61a);
_617.setProperty(_61a,_61b);
break;
}
}
}
};
BroadcasterBinding.prototype.removeObserver=function(_61c,_61d){
_61d=_61d?_61d:"*";
_61d=new List(_61d.split(" "));
while(_61d.hasNext()){
var list=this._observers[_61d.getNext()];
if(list){
while(list.hasNext()){
var _61f=list.getNext();
if(_61f==_61c){
list.del(_61f);
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
BroadcasterBinding.prototype.setDisabled=function(_620){
this.setProperty("isdisabled",_620);
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
var _622=this.getProperty("width");
var _623=this.getProperty("label");
var type=this.getProperty("type");
var _625=this.getProperty("popup");
var _626=this.getProperty("tooltip");
var _627=this.getProperty("isdisabled");
var _628=this.getProperty("response");
var _629=this.getProperty("oncommand");
var _62a=this.getProperty("value");
var _62b=this.getProperty("ischecked");
var _62c=this.getProperty("callbackid");
var _62d=this.getProperty("focusable");
var _62e=this.getProperty("focused");
var _62f=this.getProperty("default");
var url=this.getProperty("url");
var _631=this.getProperty("flip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.add(this.labelBinding);
this.labelBinding.attach();
this.shadowTree.labelBinding=this.labelBinding;
if(_631){
this.flip(true);
}
if(!this._stateManager){
this._stateManager=new ButtonStateManager(this);
}
if(this.imageProfile!=null&&this.imageProfile.getDefaultImage()!=null){
this.setImage(this.imageProfile.getDefaultImage());
}
if(_623!=null){
this.setLabel(_623);
}
if(type!=null){
this.setType(type);
}
if(_626!=null){
this.setToolTip(_626);
}
if(_622!=null){
this.setWidth(_622);
}
if(_625!=null){
this.setPopup(_625);
}
if(_628!=null){
this.response=_628;
}
if(_62b==true){
if(this.isCheckButton||this.isRadioButton){
this.check(true);
}
}
if(_629!=null&&this.oncommand==null){
this.oncommand=function(){
Binding.evaluate(_629,this);
};
}
if(_62d||this.isFocusable){
this._makeFocusable();
if(_62f||this.isDefault){
this.isDefault=true;
}
if(_62e){
this.focus();
}
}
if(_627==true){
this.disable();
}
if(url!=null){
this.setURL(url);
}
if(_62c!=null){
this.bindingWindow.DataManager.registerDataBinding(_62c,this);
if(_62a!=null){
Binding.dotnetify(this,_62a);
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
ButtonBinding.prototype.setImage=function(_632){
if(this.isAttached){
this.labelBinding.setImage(_632);
}
this.setProperty("image",_632);
};
ButtonBinding.prototype.getImage=function(){
return this.getProperty("image");
};
ButtonBinding.prototype.setLabel=function(_633){
if(this.isAttached){
this.labelBinding.setLabel(_633);
}
this.setProperty("label",_633);
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
ButtonBinding.prototype.setToolTip=function(_635){
this.setProperty("tooltip",_635);
if(this.isAttached==true){
this.setProperty("title",Resolver.resolve(_635));
}
};
ButtonBinding.prototype.getToolTip=function(){
return this.getProperty("tooltip");
};
ButtonBinding.prototype.setImageProfile=function(_636){
this.imageProfile=new _636(this);
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
ButtonBinding.prototype.flip=function(_63b){
_63b=_63b==null?true:_63b;
this.isFlipped=_63b;
this.setProperty("flip",_63b);
if(this.isAttached){
this.labelBinding.flip(_63b);
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
ButtonBinding.prototype.check=function(_63c){
if((this.isCheckButton||this.isRadioButton)&&!this.isChecked){
if(this.isAttached==true){
this._check();
if(!_63c==true){
this.fireCommand();
}
}
this.setProperty("ischecked",true);
}
};
ButtonBinding.prototype._check=function(_63d){
this.isActive=true;
this.isChecked=true;
if(!_63d){
this._stateManager.invokeActiveState();
}
};
ButtonBinding.prototype.uncheck=function(_63e){
if((this.isCheckButton||this.isRadioButton)&&this.isChecked){
if(this.isAttached==true){
this._uncheck();
if(!_63e==true){
this.fireCommand();
}
}
this.setProperty("ischecked",false);
}
};
ButtonBinding.prototype._uncheck=function(_63f){
this.isActive=false;
this.isChecked=false;
if(!_63f){
this._stateManager.invokeNormalState();
}
};
ButtonBinding.prototype.setChecked=function(_640,_641){
if(_640==null){
_640==false;
}
if(this.isCheckButton||this.isRadioButton){
switch(_640){
case true:
this.check(_641);
break;
case false:
this.uncheck(_641);
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
var _643=this.getProperty("tooltip");
if(_643){
this.setToolTip(_643);
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
var _644=null;
if(this.isAttached==true){
this.labelBinding.bindingElement.style.marginLeft="0";
this.labelBinding.bindingElement.style.marginRight="0";
_644=this.labelBinding.bindingElement.offsetWidth;
}else{
throw "ButtonBinding: getEqualSizeWidth failed for non-attached button.";
}
return _644;
};
ButtonBinding.prototype.setEqualSizeWidth=function(goal){
if(this.isAttached==true){
var _646=this.getEqualSizeWidth();
if(goal>_646){
var diff=goal-_646;
var marg=Math.floor(diff*0.5);
this.labelBinding.bindingElement.style.marginLeft=marg+"px";
this.labelBinding.bindingElement.style.marginRight=marg+"px";
}
}
};
ButtonBinding.prototype.getWidth=function(){
var _649=null;
if(this.isAttached==true){
var _64a=CSSComputer.getPadding(this.bindingElement);
var _64b=CSSComputer.getPadding(this.bindingElement);
_649=this.shadowTree.c.offsetWidth+this.shadowTree.e.offsetWidth+this.shadowTree.w.offsetWidth;
_649=_649+_64a.left+_64a.right;
_649=_649+_64b.left+_64b.right;
}else{
throw "ButtonBinding: getWidth failed for non-attached button.";
}
return _649;
};
ButtonBinding.prototype.setWidth=function(_64c){
if(this.isAttached==true){
var _64d=this.shadowTree.e.offsetWidth+this.shadowTree.w.offsetWidth;
var _64e=CSSComputer.getPadding(this.shadowTree.c);
var _64f=_64c-_64d;
_64f=_64f-_64e.left-_64e.right;
this.shadowTree.c.style.width=String(_64f)+"px";
if(this.getProperty("centered")){
this.labelBinding.bindingElement.style.marginLeft=String(0.5*(_64f-this.labelBinding.bindingElement.offsetWidth))+"px";
}
}
this.setProperty("width",_64c);
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
ButtonBinding.prototype.setValue=function(_650){
this.shadowTree.dotnetinput.value=_650;
};
ButtonBinding.prototype.getResult=function(){
return this.getValue();
};
ButtonBinding.prototype.setResult=function(_651){
this.setValue(_651);
};
ButtonStateManager.STATE_NORMAL=0;
ButtonStateManager.STATE_HOVER=1;
ButtonStateManager.STATE_ACTIVE=2;
ButtonStateManager.RIGHT_BUTTON=2;
function ButtonStateManager(_652){
this.logger=SystemLogger.getLogger("ButtonStateManager");
this.binding=_652;
this.imageProfile=_652.imageProfile;
this.assignDOMEvents(true);
}
ButtonStateManager.prototype.assignDOMEvents=function(_653){
var _654=_653?"addEventListener":"removeEventListener";
this.binding[_654](DOMEvents.MOUSEENTER,this);
this.binding[_654](DOMEvents.MOUSELEAVE,this);
this.binding[_654](DOMEvents.MOUSEDOWN,this);
this.binding[_654](DOMEvents.MOUSEUP,this);
};
ButtonStateManager.prototype.dispose=function(){
this.assignDOMEvents(false);
this.binding=null;
this.imageProfile=null;
};
ButtonStateManager.prototype.handleEvent=function(e){
if(Binding.exists(this.binding)&&!this.binding.isDisabled&&!BindingDragger.isDragging){
var _656=false,_657=null;
if(e.button==ButtonStateManager.RIGHT_BUTTON){
}else{
if(this.binding.isCheckBox){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_657=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_657=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_657=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSEUP:
this.binding.isChecked=!this.binding.isChecked;
_657=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_657==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_656=true;
break;
}
}else{
if(this.binding.isCheckButton||this.binding.isRadioButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
if(!this.binding.isChecked){
_657=ButtonStateManager.STATE_HOVER;
}
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
if(!this.binding.isChecked){
_657=ButtonStateManager.STATE_NORMAL;
}
break;
case DOMEvents.MOUSEDOWN:
_657=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
if(this.binding.isCheckButton||!this.binding.isChecked){
this.binding.isChecked=!this.binding.isChecked;
_657=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_657==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_656=true;
}
break;
}
}else{
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_657=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_657=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_657=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_657=ButtonStateManager.STATE_NORMAL;
_656=true;
break;
}
}
}
}
switch(_657){
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
if(_656){
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
var _65b=this.imageProfile.getDisabledImage();
if(_65b){
this.binding.setImage(_65b);
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
ClickButtonBinding.newInstance=function(_65c){
var _65d=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_65c);
return UserInterface.registerBinding(_65d,ClickButtonBinding);
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
RadioButtonBinding.newInstance=function(_65e){
var _65f=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiobutton",_65e);
return UserInterface.registerBinding(_65f,RadioButtonBinding);
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
CheckButtonBinding.newInstance=function(_660){
var _661=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbutton",_660);
return UserInterface.registerBinding(_661,CheckButtonBinding);
};
CheckButtonImageProfile.IMG_DEFAULT="${skin}/buttons/checkbutton-default.png";
CheckButtonImageProfile.IMG_HOVER="${skin}/buttons/checkbutton-hover.png";
CheckButtonImageProfile.IMG_ACTIVE="${skin}/buttons/checkbutton-active.png";
CheckButtonImageProfile.IMG_ACTIVE_HOVER="${skin}/buttons/checkbutton-active-hover.png";
CheckButtonImageProfile.IMG_DISABLED=null;
CheckButtonImageProfile.IMG_DISABLED_ON=null;
function CheckButtonImageProfile(_662){
this._binding=_662;
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
var _663=this.getDescendantBindingsByLocalName("control");
_663.each(function(_664){
_664.setControlType(_664.controlType);
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
ControlGroupBinding.newInstance=function(_666){
var _667=DOMUtil.createElementNS(Constants.NS_UI,"ui:controlgroup",_666);
return UserInterface.registerBinding(_667,ControlGroupBinding);
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
ControlBinding.prototype.handleAction=function(_66a){
ControlBinding.superclass.handleAction.call(this,_66a);
switch(_66a.type){
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
function ControlImageProfile(_66b){
this.binding=_66b;
}
ControlImageProfile.prototype._getImage=function(_66c){
var _66d=null;
switch(this.binding.controlType){
case ControlBinding.TYPE_MINIMIZE:
_66d=this.constructor.IMAGE_MINIMIZE;
break;
case ControlBinding.TYPE_MAXIMIZE:
_66d=this.constructor.IMAGE_MAXIMIZE;
break;
case ControlBinding.TYPE_UNMAXIMIZE:
case ControlBinding.TYPE_UNMINIMIZE:
_66d=this.constructor.IMAGE_RESTORE;
break;
case ControlBinding.TYPE_CLOSE:
_66d=this.constructor.IMAGE_CLOSE;
break;
}
return _66d.replace("${string}",_66c);
};
ControlImageProfile.prototype.getDefaultImage=function(){
var _66e=true;
if(this.binding.isGhostable&&this.binding.containingControlBoxBinding){
_66e=this.binding.containingControlBoxBinding.isActive?true:false;
}
return _66e?this._getImage("default"):this._getImage("ghosted");
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
ControlBoxBinding.prototype.handleAction=function(_66f){
ControlBoxBinding.superclass.handleAction.call(this,_66f);
switch(_66f.type){
case ControlBinding.ACTION_COMMAND:
var _670=_66f.target;
Application.lock(this);
var self=this;
setTimeout(function(){
self.handleInvokedControl(_670);
Application.unlock(self);
},0);
_66f.consume();
break;
}
};
ControlBoxBinding.prototype.handleInvokedControl=function(_672){
switch(_672.controlType){
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
ControlBoxBinding.prototype.setState=function(_673){
var _674=this.getState();
this.setProperty("state",_673);
this.detachClassName(_674);
this.attachClassName(_673);
this.dispatchAction(ControlBoxBinding.ACTION_STATECHANGE);
};
ControlBoxBinding.prototype.getState=function(){
var _675=this.getProperty("state");
if(!_675){
_675=ControlBoxBinding.STATE_NORMAL;
}
return _675;
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
MenuContainerBinding.prototype.isOpen=function(_676){
var _677=null;
if(!_676){
_677=this._isOpen;
}else{
_677=(_676==this._openElement);
}
return _677;
};
MenuContainerBinding.prototype.setOpenElement=function(_678){
if(_678){
if(this._openElement){
this._openElement.hide();
}
this._openElement=_678;
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
var _679=this.getChildBindingByLocalName("menupopup");
if(_679&&_679!=this.menuPopupBinding){
this.menuPopupBinding=_679;
this.menuPopupBinding.addActionListener(PopupBinding.ACTION_HIDE,this);
}
return this.menuPopupBinding;
};
MenuContainerBinding.prototype.show=function(){
var _67a=this.getMenuContainerBinding();
_67a.setOpenElement(this);
var _67b=this.getMenuPopupBinding();
_67b.snapTo(this.bindingElement);
_67b.show();
};
MenuContainerBinding.prototype.hide=function(){
this.reset();
this.getMenuPopupBinding().hide();
if(this._isOpen){
this._openElement.hide();
}
};
MenuContainerBinding.prototype.reset=Binding.ABSTRACT_METHOD;
MenuContainerBinding.prototype.handleAction=function(_67c){
MenuContainerBinding.superclass.handleAction.call(this,_67c);
if(_67c.type==PopupBinding.ACTION_HIDE){
var _67d=this.getMenuContainerBinding();
_67d.setOpenElement(false);
this.reset();
_67c.consume();
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
MenuBarBinding.prototype.handleAction=function(_67e){
MenuBarBinding.superclass.handleAction.call(this,_67e);
switch(_67e.type){
case MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY:
var _67f=_67e.target;
var _680=this.getChildBindingsByLocalName("menu");
while(_680.hasNext()){
var menu=_680.getNext();
}
switch(_67f.arrowKey){
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
var _682=this.getProperty("image");
var _683=this.getProperty("label");
var _684=this.getProperty("tooltip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menulabel");
this.add(this.labelBinding);
if(_683){
this.setLabel(_683);
}
if(_682){
this.setImage(_682);
}
if(_684){
this.setToolTip(_684);
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
MenuBinding.prototype.setLabel=function(_686){
this.setProperty("label",_686);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_686));
}
};
MenuBinding.prototype.setToolTip=function(_687){
this.setProperty("tooltip",_687);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_687));
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
var _689=this.getMenuContainerBinding();
if(!BindingDragger.isDragging){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(_689.isOpen(this)){
DOMEvents.stopPropagation(e);
}
break;
case DOMEvents.MOUSEOVER:
if(_689.isOpen()&&!_689.isOpen(this)){
this.show();
this.menuPopupBinding.grabKeyboard();
}
this.attachClassName("hover");
this.isFocused=true;
break;
case DOMEvents.MOUSEOUT:
if(!_689.isOpen()){
this.hide();
}
this.isFocused=false;
break;
case DOMEvents.MOUSEUP:
if(!_689.isOpen(this)){
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
MenuBodyBinding.handleBroadcast=function(_68a,arg){
var body=MenuBodyBinding.activeInstance;
var key=arg;
if(body){
switch(_68a){
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
this.addActionListener(MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY,{handleAction:function(_68f){
switch(_68f.target){
case self:
self.releaseKeyboard();
self._containingPopupBinding.hide();
break;
default:
var _690=null;
var _691=true;
self._lastFocused.focus();
self.grabKeyboard();
_68f.consume();
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
MenuBodyBinding.prototype.handleFocusedItem=function(_693){
for(var key in this._focused){
if(key!=_693.key){
var item=this._focused[key];
item.blur();
}
}
this._focused[_693.key]=_693;
this._lastFocused=_693;
if(MenuBodyBinding.activeInstance!=this){
this.grabKeyboard();
}
};
MenuBodyBinding.prototype.handleBlurredItem=function(_696){
delete this._focused[_696.key];
};
MenuBodyBinding.prototype.resetFocusedItems=function(_697){
for(var key in this._focused){
var item=this._focused[key];
item.blur(_697);
}
if(_697){
this._lastFocused=null;
}
};
MenuBodyBinding.prototype.refreshMenuGroups=function(){
if(!this.isAttached){
throw "refreshMenuGroups: MenuBodyBinding not attached!";
}else{
var _69a=this.getChildBindingsByLocalName("menugroup");
var _69b=null;
var _69c=null;
while(_69a.hasNext()){
var _69d=_69a.getNext();
if(!_69d.isDefaultContent){
_69d.setLayout(MenuGroupBinding.LAYOUT_DEFAULT);
if(!_69b&&_69d.isVisible){
_69b=_69d;
}
if(_69d.isVisible){
_69c=_69d;
}
}
}
if(_69b&&_69c){
_69b.setLayout(MenuGroupBinding.LAYOUT_FIRST);
_69c.setLayout(MenuGroupBinding.LAYOUT_LAST);
}
}
};
MenuBodyBinding.prototype.grabKeyboard=function(_69e){
MenuBodyBinding.activeInstance=this;
if(_69e){
var _69f=this._getMenuItems().getFirst();
if(_69f){
_69f.focus();
}
}
};
MenuBodyBinding.prototype.releaseKeyboard=function(){
if(MenuBodyBinding.activeInstance==this){
MenuBodyBinding.activeInstance=null;
}
};
MenuBodyBinding.prototype.handleEnterKey=function(){
var _6a0=this._lastFocused;
if((_6a0!=null)&&(!_6a0.isMenuContainer)){
_6a0.fireCommand();
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEDOWN);
}
};
MenuBodyBinding.prototype.handleArrowKey=function(key){
this.arrowKey=key;
var _6a2=this._getMenuItems();
var _6a3=null;
var next=null;
if(this._lastFocused){
_6a3=this._lastFocused;
switch(key){
case KeyEventCodes.VK_UP:
next=_6a2.getPreceding(_6a3);
break;
case KeyEventCodes.VK_DOWN:
next=_6a2.getFollowing(_6a3);
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
next=_6a2.getFirst();
}
if(next){
next.focus();
}
};
MenuBodyBinding.prototype._getMenuItems=function(){
if(!this._menuItemsList||this.isDirty){
var list=new List();
var _6a6=null;
this.getChildBindingsByLocalName("menugroup").each(function(_6a7){
_6a6=_6a7.getChildBindingsByLocalName("menuitem");
_6a6.each(function(item){
list.add(item);
});
});
_6a6=this.getChildBindingsByLocalName("menuitem");
_6a6.each(function(item){
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
MenuBodyBinding.newInstance=function(_6ab){
var _6ac=DOMUtil.createElementNS(Constants.NS_UI,"ui:menubody",_6ab);
return UserInterface.registerBinding(_6ac,MenuBodyBinding);
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
MenuGroupBinding.prototype.setLayout=function(_6ad){
switch(_6ad){
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
MenuGroupBinding.newInstance=function(_6ae){
var _6af=DOMUtil.createElementNS(Constants.NS_UI,"ui:menugroup",_6ae);
return UserInterface.registerBinding(_6af,MenuGroupBinding);
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
var _6b0=this.getProperty("image");
var _6b1=this.getProperty("image-hover");
var _6b2=this.getProperty("image-active");
var _6b3=this.getProperty("image-disabled");
if(!this.image&&_6b0){
this.image=_6b0;
}
if(!this.imageHover&&_6b1){
this.imageHover=_6b0;
}
if(!this.imageActive&&_6b2){
this.imageActive=_6b2;
}
if(!this.imageDisabled&&_6b3){
this.imageDisabled=_6b3;
}
};
MenuItemBinding.prototype.buildDOMContent=function(){
var _6b4=this.getProperty("label");
var _6b5=this.getProperty("tooltip");
var type=this.getProperty("type");
var _6b7=this.getProperty("isdisabled");
var _6b8=this.getProperty("image");
var _6b9=this.getProperty("image-hover");
var _6ba=this.getProperty("image-active");
var _6bb=this.getProperty("image-disabled");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menuitemlabel");
this.add(this.labelBinding);
var _6bc=this.getMenuPopupBinding();
if(_6bc){
this.isMenuContainer=true;
this.setType(MenuItemBinding.TYPE_MENUCONTAINER);
}
if(!this.imageProfile){
if(!this.image&&_6b8){
this.image=_6b8;
}
if(!this.imageHover&&_6b9){
this.imageHover=_6b8;
}
if(!this.imageActive&&_6ba){
this.imageActive=_6ba;
}
if(!this.imageDisabled&&_6bb){
this.imageDisabled=_6bb;
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
if(_6b4){
this.setLabel(_6b4);
}
if(_6b5){
this.setToolTip(_6b5);
}
if(type){
this.setType(type);
}
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.getProperty("ischecked")==true){
this.check(true);
}
}
if(_6b7==true){
this.disable();
}
var _6bd=this.getProperty("oncommand");
if(_6bd){
if(this.isMenuContainer){
throw new Error("MenuItemBinding with contained menuitems cannot fire commands.");
}else{
this.oncommand=function(){
this.bindingWindow.eval(_6bd);
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
MenuItemBinding.prototype.setLabel=function(_6c0){
this.setProperty("label",_6c0);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6c0));
}
};
MenuItemBinding.prototype.setToolTip=function(_6c1){
this.setProperty("tooltip",_6c1);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6c1));
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
var _6c3=this.bindingDocument.createElement("div");
_6c3.className=MenuItemBinding.CLASSNAME_CHECKBOX;
_6c3.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_CHECKBOX));
var _6c4=this.labelBinding.bindingElement;
_6c4.insertBefore(_6c3,_6c4.firstChild);
_6c3.style.display="none";
this.shadowTree.checkBoxIndicator=_6c3;
}else{
throw new Error("MenuItemBinding: checkboxes cannot contain menus");
}
break;
case MenuItemBinding.TYPE_MENUCONTAINER:
var _6c3=this.bindingDocument.createElement("div");
_6c3.className=MenuItemBinding.CLASSNAME_SUBMENU;
_6c3.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_SUBMENU));
var _6c4=this.labelBinding.bindingElement;
_6c4.insertBefore(_6c3,_6c4.firstChild);
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
var _6c6=this.imageProfile.getDisabledImage();
if(_6c6){
this.setImage(_6c6);
}
}
}else{
this.detachClassName("isdisabled");
if(this.imageProfile){
var _6c6=this.imageProfile.getDefaultImage();
if(_6c6){
this.setImage(_6c6);
}
}
}
}
};
MenuItemBinding.prototype.focus=function(e){
this.labelBinding.attachClassName(MenuItemBinding.CLASSNAME_HOVER);
var _6c8=this.getMenuContainerBinding();
if(_6c8.isOpen()&&!_6c8.isOpen(this)){
_6c8._openElement.hide();
_6c8.setOpenElement(false);
}
if(this.isMenuContainer&&e&&e.type==DOMEvents.MOUSEOVER){
var _6c8=this.getMenuContainerBinding();
if(!_6c8.isOpen(this)){
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
MenuItemBinding.prototype.blur=function(_6ca){
if(this._showSubMenuTimeout){
window.clearTimeout(this._showSubMenuTimeout);
this._showSubMenuTimeout=null;
}
if(this.isFocused){
var _6cb=this.getMenuContainerBinding();
if(!_6cb||!_6cb.isOpen(this)||_6ca){
this.labelBinding.detachClassName(MenuItemBinding.CLASSNAME_HOVER);
this.isFocused=false;
this._containingMenuBodyBinding.handleBlurredItem(this);
}
}
};
MenuItemBinding.prototype.check=function(_6cc){
this.setChecked(true,_6cc);
};
MenuItemBinding.prototype.uncheck=function(_6cd){
this.setChecked(false,_6cd);
};
MenuItemBinding.prototype.show=function(){
this.menuPopupBinding.position=PopupBinding.POSITION_RIGHT;
MenuItemBinding.superclass.show.call(this);
};
MenuItemBinding.prototype.setChecked=function(_6ce,_6cf){
this.setProperty("ischecked",_6ce);
if(this.isAttached){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.isChecked!=_6ce){
this.isChecked=_6ce;
this.shadowTree.checkBoxIndicator.style.display=_6ce?"block":"none";
if(!_6cf){
this.fireCommand();
}
}
}
}
};
MenuItemBinding.newInstance=function(_6d0){
var _6d1=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_6d0);
UserInterface.registerBinding(_6d1,MenuItemBinding);
return UserInterface.getBinding(_6d1);
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
PopupBinding.handleBroadcast=function(_6d2,arg){
switch(_6d2){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
case BroadcastMessages.MOUSEEVENT_MOUSEUP:
if(PopupBinding.activeInstances.hasEntries()){
var list=new List();
PopupBinding.activeInstances.each(function(key){
var _6d6=PopupBinding.activeInstances.get(key);
var _6d7=(arg&&arg instanceof ButtonBinding&&arg.popupBinding==_6d6);
if(!_6d7){
list.add(_6d6);
}
});
list.each(function(_6d8){
_6d8.hide();
});
}
break;
case BroadcastMessages.KEY_ESCAPE:
if(PopupBinding.activeInstances.hasEntries()){
PopupBinding.activeInstances.each(function(key){
var _6da=PopupBinding.activeInstances.get(key);
_6da.hide();
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
var _6db=DOMUtil.getElementsByTagName(this.bindingElement,"menubody").item(0);
var _6dc=DOMUtil.getElementsByTagName(this.bindingElement,"popupbody").item(0);
if(_6db){
this._bodyBinding=UserInterface.getBinding(_6db);
}else{
if(_6dc){
this._bodyBinding=UserInterface.getBinding(_6dc);
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
var _6dd=this.getProperty("position");
this.position=_6dd?_6dd:PopupBinding.POSITION_BOTTOM;
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
PopupBinding.prototype.add=function(_6de){
var _6df=null;
if(this._bodyBinding){
this._bodyBinding.add(_6de);
_6df=_6de;
}else{
_6df=PopupBinding.superclass.add.call(this,_6de);
}
return _6df;
};
PopupBinding.prototype.addFirst=function(_6e0){
var _6e1=null;
if(this._bodyBinding){
this._bodyBinding.addFirst(_6e0);
_6e1=_6e0;
}else{
_6e1=PopupBinding.superclass.addFirst.call(this,_6e0);
}
return _6e1;
};
PopupBinding.prototype.handleAction=function(_6e2){
PopupBinding.superclass.handleAction.call(this,_6e2);
var _6e3=_6e2.target;
switch(_6e2.type){
case Binding.ACTION_ATTACHED:
if(_6e3 instanceof MenuItemBinding){
this._count(true);
_6e2.consume();
}
break;
case Binding.ACTION_DETACHED:
if(_6e3 instanceof MenuItemBinding){
this._count(false);
_6e2.consume();
}
break;
}
};
PopupBinding.prototype._count=function(_6e4){
if(this.type==PopupBinding.TYPE_FIXED){
this._menuItemCount=this._menuItemCount+(_6e4?1:-1);
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
PopupBinding.prototype.snapTo=function(_6e5){
var _6e6=this._getElementPosition(_6e5);
switch(this.position){
case PopupBinding.POSITION_TOP:
_6e6.y-=this.bindingElement.offsetHeight;
break;
case PopupBinding.POSITION_RIGHT:
_6e6.x+=_6e5.offsetWidth;
break;
case PopupBinding.POSITION_BOTTOM:
_6e6.y+=_6e5.offsetHeight;
break;
case PopupBinding.POSITION_LEFT:
_6e6.x-=this.bindingElement.offsetWidth;
break;
}
this.targetElement=_6e5;
this.bindingElement.style.display="block";
this.setPosition(_6e6.x,_6e6.y);
};
PopupBinding.prototype.snapToMouse=function(e){
this.snapToPoint(this._getMousePosition(e));
};
PopupBinding.prototype.snapToPoint=function(_6e8){
this.bindingElement.style.display="block";
this.setPosition(_6e8.x,_6e8.y);
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
PopupBinding.prototype._getElementPosition=function(_6ed){
return _6ed.ownerDocument==this.bindingDocument?DOMUtil.getGlobalPosition(_6ed):DOMUtil.getUniversalPosition(_6ed);
};
PopupBinding.prototype._getMousePosition=function(e){
var _6ef=DOMEvents.getTarget(e);
return _6ef.ownerDocument==this.bindingDocument?DOMUtil.getGlobalMousePosition(e):DOMUtil.getUniversalMousePosition(e);
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
PopupBinding.prototype._makeVisible=function(_6f0){
var _6f1=this.bindingElement;
if(_6f0){
if(Client.hasTransitions){
_6f1.style.visibility="visible";
_6f1.style.opacity="1";
}else{
_6f1.style.visibility="visible";
}
}else{
_6f1.style.visibility="hidden";
_6f1.style.display="none";
if(Client.hasTransitions){
_6f1.style.opacity="0";
}
}
this.isVisible=_6f0;
};
PopupBinding.prototype._enableTab=function(_6f2){
var self=this;
var _6f4=this.getDescendantBindingsByLocalName("menuitem");
setTimeout(function(){
if(Binding.exists(self)==true){
_6f4.each(function(_6f5){
_6f5.bindingElement.tabIndex=_6f2?0:-1;
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
PopupBinding.prototype.grabKeyboard=function(_6fe){
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
var _704=null;
if(this._menuItems){
if(this._menuItems[cmd]){
_704=this._menuItems[cmd];
}else{
throw "PopupBinding.getMenuItemForCommand: No binding for command "+cmd;
}
}else{
throw "Must invoke _indexMenuContent method first!";
}
return _704;
};
PopupBinding.prototype.clear=function(){
var _705=this._bodyBinding;
if(_705){
_705.detachRecursive();
_705.bindingElement.innerHTML="";
}
this._menuItemCount=0;
};
PopupBinding.newInstance=function(_706){
var _707=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_706);
return UserInterface.registerBinding(_707,PopupBinding);
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
PopupBodyBinding.newInstance=function(_709){
var _70a=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupbody",_709);
return UserInterface.registerBinding(_70a,PopupBodyBinding);
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
MenuPopupBinding.prototype._getElementPosition=function(_70b){
return new Point(_70b.offsetLeft,0);
};
MenuPopupBinding.newInstance=function(_70c){
var _70d=DOMUtil.createElementNS(Constants.NS_UI,"ui:menupopup",_70c);
return UserInterface.registerBinding(_70d,MenuPopupBinding);
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
var _70e=DOMUtil.getElementsByTagName(this.bindingElement,"dialogbody").item(0);
if(_70e){
this._body=UserInterface.getBinding(_70e);
}else{
this._body=DialogBodyBinding.newInstance(this.bindingDocument);
this.add(this._body);
}
};
DialogBinding.prototype.buildBorderBindings=function(){
var _70f=new List([DialogBorderBinding.TYPE_NORTH,DialogBorderBinding.TYPE_SOUTH,DialogBorderBinding.TYPE_EAST,DialogBorderBinding.TYPE_WEST]);
while(_70f.hasNext()){
var _710=DialogBorderBinding.newInstance(this.bindingDocument);
_710.setType(_70f.getNext());
this.add(_710);
}
};
DialogBinding.prototype.buildShadowBinding=function(){
this.shadowBinding=ShadowBinding.newInstance(this.bindingDocument);
this.shadowBinding.attachClassName("dialogshadow");
this.shadowBinding.shadow(this);
this.shadowBinding.attach();
};
DialogBinding.prototype.buildControlBindings=function(){
var _711=this.getProperty("controls");
if(_711){
var _712=new List(_711.split(" "));
while(_712.hasNext()){
var type=_712.getNext();
switch(type){
case ControlBinding.TYPE_MAXIMIZE:
case ControlBinding.TYPE_MINIMIZE:
case ControlBinding.TYPE_CLOSE:
var _714=DialogControlBinding.newInstance(this.bindingDocument);
_714.setControlType(type);
this._titlebar.addControl(_714);
this.controlBindings[type]=_714;
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
var _715=this.getProperty("image");
var _716=this.getProperty("label");
var _717=this.getProperty("draggable");
var _718=this.getProperty("resizable");
var _719=this.getProperty("modal");
if(_715){
this.setImage(_715);
}
if(_716){
this.setLabel(_716);
}
if(_717==false){
this.isDialogDraggable=false;
}
if(_718==false){
this.isPanelResizable=false;
}
if(_719==true){
this.setModal(true);
}
};
DialogBinding.prototype.setModal=function(_71a){
this.isModal=_71a;
};
DialogBinding.prototype.setLabel=function(_71b){
this.setProperty("label",_71b);
if(this.isAttached==true){
this._titlebar.setLabel(Resolver.resolve(_71b));
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
DialogBinding.prototype.handleAction=function(_71d){
DialogBinding.superclass.handleAction.call(this,_71d);
switch(_71d.type){
case Binding.ACTION_DRAG:
var _71e=_71d.target;
if(this.getState()==ControlBoxBinding.STATE_NORMAL){
switch(_71e.constructor){
case DialogTitleBarBinding:
this.mode=DialogBinding.MODE_DRAGGING;
_71e.dragger.registerHandler(this);
break;
case DialogBorderBinding:
if(this._isResizable){
this.mode=DialogBinding.MODE_RESIZING;
this._border=_71e;
_71e.dragger.registerHandler(this);
}
break;
}
}
_71d.consume();
break;
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_71d.consume();
break;
}
};
DialogBinding.prototype.handleBroadcast=function(_71f,arg){
DialogBinding.superclass.handleBroadcast.call(this,_71f,arg);
switch(_71f){
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.startPoint=this.getPosition();
this._setComputedPosition(new Point(0,0));
break;
}
};
DialogBinding.prototype.handleInvokedControl=function(_721){
DialogBinding.superclass.handleInvokedControl.call(this,_721);
switch(_721.controlType){
case ControlBinding.TYPE_CLOSE:
this.close();
break;
}
};
DialogBinding.prototype.open=function(_722){
if(this.isModal&&this._cover==null){
this.buildDialogCoverBinding();
}
if(!this.isVisible){
this.setProperty("open","true");
this.isVisible=true;
this.isActivatable=true;
this.activate();
if(_722){
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
var _724=self.bindingElement;
setTimeout(function(){
_724.style.opacity="0";
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
DialogBinding.prototype.setZIndex=function(_725){
this.bindingElement.style.zIndex=new String(_725);
};
DialogBinding.prototype.onDragStart=function(_726){
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
DialogBinding.prototype.setResizable=function(_738){
if(this._isResizable!=_738){
if(_738){
this.attachClassName("resizable");
}else{
this.detachClassName("resizable");
}
this._isResizable=_738;
}
};
DialogBinding.prototype.computeDefaultGeometry=function(){
var _739=null;
var _73a=this.bindingDocument.body.offsetWidth;
var _73b=this.bindingDocument.body.offsetHeight;
_739={x:0.125*_73a,y:0.125*_73b,w:0.75*_73a,h:0.5*_73b};
return _739;
};
DialogBinding.prototype.centerOnScreen=function(){
var _73c=this.bindingWindow.WindowManager.getWindowDimensions();
var dim=this.getDimension();
this.setPosition(new Point(0.5*(_73c.w-dim.w),0.5*(_73c.h-dim.h)));
};
DialogBinding.prototype.alert=function(){
var _73e=this;
var i=0;
function blink(){
if(i%2==0){
_73e.detachClassName("active");
}else{
_73e.attachClassName("active");
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
var _742="";
while(list.hasNext()){
var type=list.getNext();
_742+=type+list.hasNext()?" ":"";
}
this.setProperty("controls",_742);
if(this.isAttached){
this.buildControlBindings();
}
};
DialogBinding.newInstance=function(_743){
var _744=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_743);
return UserInterface.registerBinding(_744,DialogBinding);
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
DialogHeadBinding.newInstance=function(_745){
var _746=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialoghead",_745);
return UserInterface.registerBinding(_746,DialogHeadBinding);
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
DialogBodyBinding.newInstance=function(_749){
var _74a=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogbody",_749);
return UserInterface.registerBinding(_74a,DialogBodyBinding);
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
DialogMatrixBinding.newInstance=function(_74b){
var _74c=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogmatrix",_74b);
return UserInterface.registerBinding(_74c,DialogMatrixBinding);
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
DialogSetBinding.prototype.handleAction=function(_74d){
DialogSetBinding.superclass.handleAction.call(this,_74d);
var _74e=_74d.target;
switch(_74d.type){
case Binding.ACTION_MOVETOTOP:
if(_74e instanceof DialogBinding){
this._moveToTop(_74e);
}
break;
case Binding.ACTION_MOVEDONTOP:
_74d.consume();
break;
}
};
DialogSetBinding.prototype._moveToTop=function(_74f){
var _750=0;
var _751=this.getChildBindingsByLocalName("dialog");
_751.each(function(_752){
var _753=_752.getZIndex();
_750=_753>_750?_753:_750;
});
_74f.setZIndex(_750+2);
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
DialogBorderBinding.newInstance=function(_755){
var _756=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogborder",_755);
return UserInterface.registerBinding(_756,DialogBorderBinding);
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
DialogCoverBinding.prototype.cover=function(_757){
this._dialogBinding=_757;
this._dialogBinding.addActionListener(DialogBinding.ACTION_OPEN,this);
this._dialogBinding.addActionListener(DialogBinding.ACTION_CLOSE,this);
this._dialogBinding.addActionListener(Binding.ACTION_MOVEDONTOP,this);
this.addEventListener(DOMEvents.MOUSEDOWN);
};
DialogCoverBinding.prototype.handleEvent=function(e){
DialogCoverBinding.superclass.handleEvent.call(this,e);
this._dialogBinding.alert();
};
DialogCoverBinding.prototype.handleAction=function(_759){
DialogCoverBinding.superclass.handleAction.call(this,_759);
var _75a=_759.target;
if(this._dialogBinding.isModal){
switch(_759.type){
case DialogBinding.ACTION_OPEN:
this.show();
break;
case DialogBinding.ACTION_CLOSE:
this.hide();
break;
case Binding.ACTION_MOVEDONTOP:
if(_75a==this._dialogBinding){
this.bindingElement.style.zIndex=new String(_75a.getZIndex()-1);
}
break;
}
}
};
DialogCoverBinding.prototype.handleBroadcast=function(_75b,arg){
DialogCoverBinding.superclass.handleBroadcast.call(this,_75b,arg);
switch(_75b){
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
var _75e=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.subscribe(_75e);
DialogCoverBinding.superclass.show.call(this);
};
DialogCoverBinding.prototype.hide=function(){
var _75f=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.unsubscribe(_75f);
DialogCoverBinding.superclass.hide.call(this);
};
DialogCoverBinding.newInstance=function(_760){
var _761=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogcover",_760);
return UserInterface.registerBinding(_761,DialogCoverBinding);
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
var _762=this.getProperty("image");
if(_762){
this.setImage(_762);
}
var _763=this.getProperty("label");
if(_763){
this.setLabel(_763);
}
};
DialogTitleBarBinding.prototype.setLabel=function(_764){
if(this.isAttached){
this.labelBinding.setLabel(_764);
}
this.setProperty("label",_764);
};
DialogTitleBarBinding.prototype.setImage=function(url){
if(this.isAttached&&Client.isWindows){
this.labelBinding.setImage(url);
}
this.setProperty("image",url);
};
DialogTitleBarBinding.prototype.addControl=function(_766){
if(!this._controlGroupBinding){
this._controlGroupBinding=this.bodyBinding.addFirst(ControlGroupBinding.newInstance(this.bindingDocument));
}
this._controlGroupBinding.add(_766);
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
DialogTitleBarBinding.newInstance=function(_767){
var _768=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebar",_767);
return UserInterface.registerBinding(_768,DialogTitleBarBinding);
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
DialogTitleBarBodyBinding.newInstance=function(_769){
var _76a=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebarbody",_769);
return UserInterface.registerBinding(_76a,DialogTitleBarBodyBinding);
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
DialogControlBinding.newInstance=function(_76b){
var _76c=DOMUtil.createElementNS(Constants.NS_UI,"ui:control",_76b);
return UserInterface.registerBinding(_76c,DialogControlBinding);
};
DialogControlImageProfile.prototype=new ControlImageProfile;
DialogControlImageProfile.prototype.constructor=DialogControlImageProfile;
DialogControlImageProfile.superclass=ControlImageProfile.prototype;
var os=Client.isVista?"vista/":(!Client.isWindows?"osx/":"");
DialogControlImageProfile.IMAGE_MINIMIZE="${root}/skins/system/controls/"+os+"control-minimize-${string}.png";
DialogControlImageProfile.IMAGE_MAXIMIZE="${root}/skins/system/controls/"+os+"control-maximize-${string}.png";
DialogControlImageProfile.IMAGE_RESTORE="${root}/skins/system/controls/"+os+"control-restore-${string}.png";
DialogControlImageProfile.IMAGE_CLOSE="${root}/skins/system/controls/"+os+"control-close-${string}.png";
function DialogControlImageProfile(_76d){
this.binding=_76d;
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
var _770=null;
if(node.nodeType==Node.ELEMENT_NODE){
var _771=node.nodeName.toLowerCase();
switch(_771){
case "script":
case "style":
case "textarea":
_770=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
break;
}
}
return _770;
});
var self=this;
this.addFilter(function(node,arg){
if(node.nodeType==Node.TEXT_NODE){
var text=node.nodeValue.toLowerCase();
self._map.each(function(key,exp){
var _778=true;
if(exp.test(text)){
self._textnodes.add(node);
_778=false;
}
return _778;
});
}
});
};
WindowBindingHighlightNodeCrawler.prototype.crawl=function(_779,arg){
this._textnodes=new List();
WindowBindingHighlightNodeCrawler.superclass.crawl.call(this,_779,arg);
};
WindowBindingHighlightNodeCrawler.prototype.setKeys=function(list){
list.reset();
this._map.empty();
while(list.hasNext()){
var key=list.getNext();
var _77d=key.toLowerCase().replace(/ /g,"\\W");
var exp=new RegExp("("+_77d+")");
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
WindowBindingHighlightNodeCrawler.prototype._getMarkup=function(_783){
var _784="";
var _785="<span class=\""+WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT+"\" style=\"background-color:yellow;color:black;\">";
var _786="</span>";
var self=this;
function iterate(_788){
var _789=-1;
var _78a=null;
self._map.each(function(key,exp){
var low=_788.toLowerCase();
var _78e=low.search(exp);
if(_78e>-1){
if(_789==-1){
_789=_78e;
}
if(_78e<=_789){
_789=_78e;
_78a=key;
}
}
});
if(_789>-1&&_78a!=null){
var pre=_788.substring(0,_789);
var hit=_788.substring(_789,_789+_78a.length);
var pst=_788.substring(_789+_78a.length,_788.length);
_784+=pre+_785+hit+_786;
iterate(pst);
}else{
_784+=_788;
}
}
iterate(_783);
return _784;
};
WindowBindingHighlightNodeCrawler.prototype.reset=function(_792){
var _793=new List(_792.getElementsByTagName("span"));
_793.each(function(span){
if(span.className==WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT){
var node=_792.ownerDocument.createTextNode(DOMUtil.getTextContent(span));
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
WindowBinding.getMarkup=function(_796){
var _797=null;
if(_796.isAttached){
var doc=_796.getContentDocument();
if(doc!=null){
var root=doc.getElementsByTagName("html").item(0);
var html="<html xmlns=\""+Constants.NS_XHTML+"\">"+root.innerHTML+"</html>";
WebServiceProxy.isFaultHandler=false;
_797=top.MarkupFormatService.HtmlToXhtml(html);
WebServiceProxy.isFaultHandler=true;
if(_797 instanceof SOAPFault){
_797=null;
}
}
}
return _797;
};
WindowBinding.highlightKeywords=function(_79b,list){
if(WindowBinding._highlightcrawler==null){
WindowBinding._highlightcrawler=new WindowBindingHighlightNodeCrawler();
}
if(_79b.isAttached){
var doc=_79b.getContentDocument();
if(doc!=null){
var _79e=WindowBinding._highlightcrawler;
_79e.reset(doc.body);
if(list!=null){
_79e.setKeys(list);
_79e.crawl(doc.body);
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
var _79f=WindowBinding.superclass.serialize.call(this);
if(_79f){
_79f.url=this.getURL();
}
return _79f;
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
var _7a1=this.getContentWindow().DocumentManager;
if(_7a1!=null){
_7a1.detachAllBindings();
this._pageBinding=null;
}
}
}
};
WindowBinding.prototype.handleAction=function(_7a2){
WindowBinding.superclass.handleAction.call(this,_7a2);
var _7a3=_7a2.target;
switch(_7a2.type){
case RootBinding.ACTION_PHASE_3:
if(_7a3.bindingDocument==this.getContentDocument()){
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
this._onPageInitialize(_7a3);
break;
case RootBinding.ACTION_ACTIVATED:
case RootBinding.ACTION_DEACTIVATED:
_7a2.consume();
break;
}
};
WindowBinding.prototype.fit=function(_7a4){
if(!this.isFit||_7a4){
if(this._pageBinding!=null){
this.setHeight(this._pageBinding.getHeight());
this.isFit=true;
}
}
};
WindowBinding.prototype._onPageInitialize=function(_7a5){
if(this._pageBinding==null){
if(_7a5.bindingWindow==this.getContentWindow()){
this._pageBinding=_7a5;
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
WindowBinding.prototype._registerOnloadListener=function(_7a6){
var _7a7=this.shadowTree.iframe;
var _7a8=_7a6?"addEventListener":"removeEventListener";
if(this._onloadHandler==null){
var self=this;
this._onloadHandler={handleEvent:function(e){
var _7ab=true;
if(Client.isExplorer){
_7ab=_7a7.readyState=="complete";
}
if(_7ab==true){
if(self.getURL()!=WindowBinding.DEFAULT_URL){
if(!self._hasLoadActionFired){
self.onWindowLoaded(self.getContentWindow());
}
}
}
}};
}
DOMEvents[_7a8](this.shadowTree.iframe,Client.isExplorer==true?"readystatechange":DOMEvents.LOAD,this._onloadHandler);
};
WindowBinding.prototype._registerUnloadListener=function(_7ac){
var _7ad=_7ac?"addEventListener":"removeEventListener";
if(this._unloadHandler==null){
var self=this;
this._unloadHandler={handleEvent:function(){
self._disposeContentDocument();
self._hasLoadActionFired=false;
}};
}
DOMEvents[_7ad](this.getContentWindow(),DOMEvents.UNLOAD,this._unloadHandler);
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
var _7b1=WindowBinding.DEFAULT_URL;
var url=this.getProperty("url");
if(url){
_7b1=url;
}
return _7b1;
};
WindowBinding.prototype.reload=function(_7b3){
this._disposeContentDocument();
if(Client.isPrism){
Prism.disableCache();
}
this._isReloading=true;
this.getContentDocument().location.reload();
};
WindowBinding.prototype.getFrameElement=function(){
var _7b4=null;
if(this.shadowTree.iframe){
_7b4=this.shadowTree.iframe;
}
return _7b4;
};
WindowBinding.prototype.getContentWindow=function(){
var _7b5=null,_7b6=this.getFrameElement();
if(_7b6){
_7b5=_7b6.contentWindow;
}
return _7b5;
};
WindowBinding.prototype.getContentDocument=function(){
var _7b7=null,win=this.getContentWindow();
if(win){
_7b7=win.document;
}
return _7b7;
};
WindowBinding.prototype.getRootBinding=function(){
var _7b9=null,doc=this.getContentDocument();
if(doc&&doc.body){
_7b9=UserInterface.getBinding(doc.body);
}
return _7b9;
};
WindowBinding.prototype.getPageBinding=function(){
return this._pageBinding;
};
WindowBinding.prototype.setHeight=function(_7bb){
this.bindingElement.style.height=_7bb+"px";
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
WindowBinding.prototype.handleCrawler=function(_7bc){
WindowBinding.superclass.handleCrawler.call(this,_7bc);
if(_7bc.type==NodeCrawler.TYPE_DESCENDING){
var root=this.getRootBinding();
if(root!=null){
_7bc.nextNode=root.bindingElement;
}else{
_7bc.response=NodeCrawler.SKIP_CHILDREN;
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
WindowBinding.newInstance=function(_7c1){
var _7c2=DOMUtil.createElementNS(Constants.NS_UI,"ui:window",_7c1);
var _7c3=UserInterface.registerBinding(_7c2,WindowBinding);
return _7c3;
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
this._windowBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_7c7){
_7c7.target.show();
_7c7.consume();
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
this._errorBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_7c9){
_7c9.target.show();
_7c9.consume();
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
PreviewWindowBinding.prototype.handleAction=function(_7cb){
PreviewWindowBinding.superclass.handleAction.call(this,_7cb);
switch(_7cb.type){
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
var _7cc=null;
this._getRadioButtonBindings().each(function(_7cd){
if(_7cd.getProperty("ischecked")){
_7cc=_7cd;
return false;
}else{
return true;
}
});
if(_7cc){
this._checkedRadioBinding=_7cc;
}
RadioGroupBinding.superclass.onBindingInitialize.call(this);
};
RadioGroupBinding.prototype.handleAction=function(_7ce){
RadioGroupBinding.superclass.handleAction.call(this,_7ce);
var _7cf=_7ce.target;
switch(_7ce.type){
case ButtonBinding.ACTION_RADIOBUTTON_ATTACHED:
this._isUpToDate=false;
_7ce.consume();
break;
case ButtonBinding.ACTION_COMMAND:
if(_7cf.isRadioButton&&!_7cf.isDisabled){
if(this._checkedRadioBinding){
this._unCheckRadioBindingsExcept(_7cf);
}
this._checkedRadioBinding=_7cf;
this.dispatchAction(RadioGroupBinding.ACTION_SELECTIONCHANGED);
_7ce.consume();
}
break;
}
};
RadioGroupBinding.prototype.setCheckedButtonBinding=function(_7d0,_7d1){
if(_7d0 instanceof RadioDataBinding){
_7d0=_7d0.getButton();
}
if(_7d0.isRadioButton){
switch(_7d1){
case true:
this._unCheckRadioBindingsExcept(_7d0);
this._checkedRadioBinding=_7d0;
_7d0.check(true);
break;
default:
_7d0.check();
break;
}
}
};
RadioGroupBinding.prototype.getCheckedButtonBinding=function(){
return this._checkedRadioBinding;
};
RadioGroupBinding.prototype._unCheckRadioBindingsExcept=function(_7d2){
var _7d3=this._getRadioButtonBindings();
_7d3.each(function(_7d4){
if(_7d4.isChecked&&_7d4!=_7d2){
_7d4.uncheck(true);
}
});
};
RadioGroupBinding.prototype._getRadioButtonBindings=function(){
if(this._radioButtonBindings===null||!this._isUpToDate){
var _7d5=new Crawler();
var list=new List();
_7d5.addFilter(function(_7d7){
var _7d8=true;
var _7d9=UserInterface.getBinding(_7d7);
if(_7d9 instanceof RadioGroupBinding){
_7d8=NodeCrawler.SKIP_CHILDREN;
}else{
if(_7d9 instanceof ButtonBinding&&_7d9.isRadioButton){
list.add(_7d9);
}
}
return _7d8;
});
_7d5.crawl(this.bindingElement);
this._radioButtonBindings=list;
}
return this._radioButtonBindings;
};
RadioGroupBinding.newInstance=function(_7da){
var _7db=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiogroup",_7da);
return UserInterface.registerBinding(_7db,RadioGroupBinding);
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
var _7dd=this.getProperty("regexrule");
if(_7dd!=null){
this.expression=new RegExp(_7dd);
}
var _7de=this.getProperty("onbindingblur");
if(_7de!=null){
this.onblur=function(){
Binding.evaluate(_7de,this);
};
}
var _7df=this.getProperty("onvaluechange");
if(_7df!=null){
this.onValueChange=function(){
Binding.evaluate(_7df,this);
};
}
if(this.error==null&&this.type!=null){
var _7e0=DataBinding.errors[this.type];
if(_7e0!=null){
this.error=_7e0;
}
}
};
DataInputBinding.prototype._buildDOMContent=function(){
this.shadowTree.input=this._getInputElement();
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
if(Client.isExplorer==true){
this.bindingElement.hideFocus=true;
}
var _7e1=this.getProperty("value");
if(_7e1!=null){
this.setValue(String(_7e1));
}
var name=this.getProperty("name");
if(name!=null){
this.setName(name);
}
var _7e3=this.getProperty("isdisabled");
if(_7e3==true){
this.setDisabled(true);
}
var _7e4=this.getProperty("readonly");
if(_7e4==true){
this.setReadOnly(true);
}
var _7e5=this.getProperty("autoselect");
if(_7e5==true){
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
var _7e6=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_7e6.type=this.isPassword==true?"password":"text";
_7e6.tabIndex=-1;
return _7e6;
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
DataInputBinding.prototype._handleFocusAndBlur=function(_7e9){
if(_7e9){
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
DataInputBinding.prototype.handleBroadcast=function(_7ec,arg){
DataInputBinding.superclass.handleBroadcast.call(this,_7ec,arg);
var self=this;
switch(_7ec){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(Client.isExplorer==true){
var _7ef=DOMEvents.getTarget(arg);
if(_7ef!=this.shadowTree.input){
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
DataInputBinding.prototype.focus=function(_7f0){
if(!this.isFocused&&!this.isReadOnly&&!this.isDisabled){
DataInputBinding.superclass.focus.call(this);
if(this.isFocused==true){
this._focus();
if(this._isAutoSelect==true){
if(_7f0){
var self=this,_7f2=this.bindingElement,_7f3={handleEvent:function(){
self.select();
DOMEvents.removeEventListener(_7f2,DOMEvents.MOUSEUP,this);
}};
DOMEvents.addEventListener(_7f2,DOMEvents.MOUSEUP,_7f3);
}else{
this.select();
}
}
this.onfocus();
if(!_7f0){
var _7f4=this.shadowTree.input;
setTimeout(function(){
FocusBinding.focusElement(_7f4);
},0);
}
}
}
};
DataInputBinding.prototype.select=function(){
var _7f5=this.shadowTree.input;
setTimeout(function(){
if(Client.isExplorer==true){
var _7f6=_7f5.createTextRange();
_7f6.moveStart("character",0);
_7f6.moveEnd("character",_7f5.value.length);
_7f6.select();
}else{
_7f5.setSelectionRange(0,_7f5.value.length);
}
},0);
};
DataInputBinding.prototype.blur=function(_7f7){
if(this.isFocused==true){
DataInputBinding.superclass.blur.call(this);
if(!_7f7){
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
DataInputBinding.prototype.validate=function(_7fb){
if(_7fb==true||this._isValid){
var _7fc=this.isValid();
if(_7fc!=this._isValid){
this._isValid=_7fc;
if(!_7fc){
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._value=this.getValue();
this.dispatchAction(Binding.ACTION_INVALID);
if(!this.isFocused){
var _7fd=null;
if(this._isInvalidBecauseRequired==true){
_7fd=DataBinding.warnings["required"];
}else{
if(this._isInvalidBecauseMinLength==true){
_7fd=DataBinding.warnings["minlength"];
_7fd=_7fd.replace("${count}",String(this.minlength));
}else{
if(this._isInvalidBecauseMaxLength==true){
_7fd=DataBinding.warnings["maxlength"];
_7fd=_7fd.replace("${count}",String(this.maxlength));
}else{
_7fd=DataBinding.warnings[this.type];
}
}
}
this.shadowTree.input.className=DataBinding.CLASSNAME_WARNING;
if(_7fd!=null){
if(this.isPassword){
if(Client.isMozilla){
this.shadowTree.input.type="text";
this.setValue(_7fd);
}else{
alert(_7fd);
}
}else{
this.setValue(_7fd);
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
var _7fe=true;
this._isInvalidBecauseRequired=false;
this._isInvalidBecauseMinLength=false;
this._isInvalidaBecuaseMaxLength=false;
var _7ff=this.getValue();
if(_7ff==""){
if(this.isRequired==true){
_7fe=false;
this._isInvalidBecauseRequired=true;
}
}else{
if(this.type!=null){
var _800=DataBinding.expressions[this.type];
if(!_800.test(_7ff)){
_7fe=false;
}
}else{
if(this.expression!=null){
if(!this.expression.test(_7ff)){
_7fe=false;
}
}
}
}
if(_7fe&&this.minlength!=null){
if(_7ff.length<this.minlength){
this._isInvalidBecauseMinLength=true;
_7fe=false;
}
}
if(_7fe&&this.maxlength!=null){
if(_7ff.length>this.maxlength){
this._isInvalidBecauseMaxLength=true;
_7fe=false;
}
}
return _7fe;
};
DataInputBinding.prototype.setDisabled=function(_801){
if(_801!=this.isDisabled){
if(_801){
this.attachClassName("isdisabled");
}else{
this.detachClassName("isdisabled");
}
var _802=this.shadowTree.input;
if(_801){
this._disabledHandler={handleEvent:function(e){
DOMEvents.preventDefault(e);
DOMEvents.stopPropagation(e);
}};
DOMEvents.addEventListener(_802,DOMEvents.MOUSEDOWN,this._disabledHandler);
}else{
DOMEvents.removeEventListener(_802,DOMEvents.MOUSEDOWN,this._disabledHandler);
this._disabledHandler=null;
}
if(Client.isExplorer){
this.shadowTree.input.disabled=_801;
this.shadowTree.input.unselectable=_801?"on":"off";
}
this.isDisabled=_801;
this.isFocusable=!_801;
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
};
DataInputBinding.prototype.setReadOnly=function(_804){
if(_804!=this.isReadOnly){
if(_804){
this.attachClassName("readonly");
}else{
this.detachClassName("readonly");
}
this.shadowTree.input.readOnly=_804;
this.isReadOnly=_804;
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
DataInputBinding.prototype.handleElement=function(_805){
return true;
};
DataInputBinding.prototype.updateElement=function(_806){
var _807=value=_806.getAttribute("value");
if(_807==null){
_807="";
}
if(this.getValue()!=_807){
var _808=this.bindingWindow.UpdateManager;
_808.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_807);
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
DataInputBinding.prototype.setValue=function(_809){
if(_809===null){
_809="";
}
if(_809!=this.getValue()){
this.setProperty("value",_809);
if(this.shadowTree.input!=null){
this.shadowTree.input.value=String(_809);
}
}
};
DataInputBinding.prototype.getValue=function(){
var _80a=null;
if(this.shadowTree.input!=null){
_80a=this.shadowTree.input.value;
}else{
_80a=this.getProperty("value");
}
return _80a;
};
DataInputBinding.prototype.setName=function(name){
DataInputBinding.superclass.setName.call(this,name);
if(this.isAttached==true){
this.shadowTree.input.name=name;
}
};
DataInputBinding.prototype.getResult=function(){
var _80c=this.getValue();
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_80c=Number(_80c);
break;
}
return _80c;
};
DataInputBinding.prototype.setResult=DataInputBinding.prototype.setValue;
DataInputBinding.newInstance=function(_80d){
var _80e=DOMUtil.createElementNS(Constants.NS_UI,"ui:datainput",_80d);
return UserInterface.registerBinding(_80e,DataInputBinding);
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
var _80f=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_80f!=null){
this.setValue(_80f.value);
_80f.parentNode.removeChild(_80f);
}
TextBoxBinding.superclass._buildDOMContent.call(this);
this.shadowTree.input.setAttribute("spellcheck","false");
if(!this._hasWordWrap){
this.shadowTree.input.setAttribute("wrap","off");
}
};
TextBoxBinding.prototype._getInputElement=function(){
var _810=DOMUtil.createElementNS(Constants.NS_XHTML,"textarea",this.bindingDocument);
_810.tabIndex=-1;
return _810;
};
TextBoxBinding.prototype.handleElement=function(_811){
return true;
};
TextBoxBinding.prototype.updateElement=function(_812){
var _813,area=_812.getElementsByTagName("textarea").item(0);
if(area!=null&&area.hasChildNodes()){
_813=DOMUtil.getTextContent(area);
}
if(_813==null){
_813="";
}
if(this.getValue()!=_813){
var _815=this.bindingWindow.UpdateManager;
_815.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_813);
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
IEEditorTextBoxBinding.prototype._handleTabKey=function(_819){
var _81a=this.bindingDocument.selection.createRange();
var _81b=_81a.text=="";
if(_81b&&!_819){
_81a.text="\t";
}else{
var text="";
var _81d=_81a.text.length;
while((_81a.moveStart("word",-1)&&_81a.text.charAt(1)!="\n")){
}
_81a.moveStart("character",1);
var _81e=0;
var i=0,line,_821=_81a.text.split("\n");
while((line=_821[i++])!=null){
if(_819){
line=line.replace(/^(\s)/mg,"");
_81e++;
}else{
line=line.replace(/^(.)/mg,"\t$1");
}
text+=line+(_821[i+1]?"\n":"");
}
_81a.text=text;
_81a.moveStart("character",-_81d);
if(_819){
_81a.moveStart("character",2*_821.length-2);
}
_81a.select();
}
};
IEEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _822=this.bindingDocument.selection.createRange();
var _823=_822.duplicate();
while((_823.moveStart("word",-1)&&_823.text.indexOf("\n")==-1)){
}
_823.moveStart("character",1);
_822.text="\n"+_823.text.match(/^(\s)*/)[0]+"!";
_822.moveStart("character",-1);
_822.select();
_822.text="";
_822.select();
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
MozEditorTextBoxBinding.prototype._handleTabKey=function(_824){
var _825;
var _826;
var oss;
var osy;
var i;
var fnd;
var _82b=this._getSelectedText();
var el=this.shadowTree.input;
_825=el.scrollLeft;
_826=el.scrollTop;
if(!_82b.match(/\n/)){
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
_82b=this._getSelectedText();
if(_824){
ntext=_82b.replace(/^(\s)/mg,"");
}else{
ntext=_82b.replace(/^(.)/mg,"\t$1");
}
el.value=el.value.substr(0,el.selectionStart)+ntext+el.value.substr(el.selectionEnd);
el.selectionStart=oss;
el.selectionEnd=osy+(ntext.length-_82b.length);
}
el.scrollLeft=_825;
el.scrollTop=_826;
};
MozEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _82d;
var _82e;
var oss;
var osy;
var el=this.shadowTree.input;
_82d=el.scrollLeft;
_82e=el.scrollTop;
oss=el.selectionStart;
osy=el.selectionEnd;
var bfs=el.value.substr(0,el.selectionStart);
var bfsm=bfs.split(/\r|\n/g);
var spm=bfsm[bfsm.length-1].match(/^(\s)*/);
el.value=el.value.substr(0,el.selectionStart)+"\n"+spm[0]+el.value.substr(el.selectionEnd);
el.selectionStart=oss+1+spm[0].length;
el.selectionEnd=oss+1+spm[0].length;
el.scrollLeft=_82d;
el.scrollTop=_82e;
};
MozEditorTextBoxBinding.prototype._getSelectedText=function(){
var _835=this.shadowTree.input.value;
var _836=this.shadowTree.input.selectionStart;
var end=this.shadowTree.input.selectionEnd;
return _835.substr(_836,end-_836);
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
var _838=this.getProperty("isdisabled");
if(this.isDisabled||_838){
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
var _83a=this.getProperty("label");
var _83b=this.getProperty("value");
var _83c=this.getProperty("width");
var _83d=this.getProperty("onchange");
var _83e=this.getProperty("required")==true;
if(!this.type&&type){
this.type=type;
}
if(!this.label&&_83a!=null){
this.label=_83a;
}
if(!this.value&&_83b!=null){
this.value=_83b;
}
if(!this.width&&_83c){
this.width=_83c;
}
if(_83e){
this.isRequired=true;
}
if(_83d){
this.onValueChange=function(){
Binding.evaluate(_83d,this);
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
var _83f=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_83f.name=this.getName();
_83f.value=this.getValue();
_83f.type="hidden";
if(this.hasCallBackID()){
_83f.id=this.getCallBackID();
}
this.shadowTree.input=_83f;
this.bindingElement.appendChild(_83f);
};
SelectorBinding.prototype.buildButton=function(){
var _840=this.BUTTON_IMPLEMENTATION;
var _841=this.add(_840.newInstance(this.bindingDocument));
if(this.imageProfile!=null){
_841.imageProfile=this.imageProfile;
}
if(this.width!=null){
_841.setWidth(this.width);
}
this._buttonBinding=_841;
this.shadowTree.button=_841;
_841.attach();
};
SelectorBinding.prototype.buildIndicator=function(){
var img=this.bindingDocument.createElement("img");
img.src=SelectorBinding.INDICATOR_IMAGE;
img.className="selectorindicatorimage";
this._buttonBinding.bindingElement.appendChild(img);
this.shadowTree.selectorindicatorimage=img;
};
SelectorBinding.prototype.buildPopup=function(){
var _843=top.app.bindingMap.selectorpopupset;
var doc=_843.bindingDocument;
var _845=_843.add(PopupBinding.newInstance(doc));
var _846=_845.add(MenuBodyBinding.newInstance(doc));
this._popupBinding=_845;
this._menuBodyBinding=_846;
this._popupBinding.attachClassName(SelectorBinding.CLASSNAME_POPUP);
this._popupBinding.attachRecursive();
this._popupBinding.type=PopupBinding.TYPE_FIXED;
_845.attachClassName("selectorpopup");
_845.addActionListener(PopupBinding.ACTION_SHOW,this);
_845.addActionListener(MenuItemBinding.ACTION_COMMAND,this);
_845.addActionListener(PopupBinding.ACTION_HIDE,this);
this._buttonBinding.setPopup(_845);
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
var _849=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_849).each(function(_84a){
var _84b=_84a.getAttribute("label");
var _84c=_84a.getAttribute("value");
var _84d=_84a.getAttribute("selected");
var _84e=_84a.getAttribute("image");
var _84f=_84a.getAttribute("image-hover");
var _850=_84a.getAttribute("image-active");
var _851=_84a.getAttribute("image-disabled");
var _852=null;
if(_84e||_84f||_850||_851){
_852=new ImageProfile({image:_84e,imageHover:_84f,imageActive:_850,imageDisabled:_851});
}
list.add(new SelectorBindingSelection(_84b?_84b:null,_84c?_84c:null,_84d&&_84d=="true",_852));
});
return list;
};
SelectorBinding.prototype.populateFromList=function(list){
if(this.isAttached){
this.clear();
if(list.hasEntries()){
var _854=null;
while(list.hasNext()){
var _855=list.getNext();
var item=this.addSelection(_855);
if(!_854){
_854=item;
}
}
if(!this._selectedItemBinding){
this.select(_854,true);
}
this.shadowTree.selectorindicatorimage.style.display="block";
}else{
this.shadowTree.selectorindicatorimage.style.display="none";
}
}else{
throw "Could not populate unattached selector";
}
};
SelectorBinding.prototype.addSelection=function(_857,_858){
var _859=this.MENUITEM_IMPLEMENTATION;
var _85a=this._menuBodyBinding;
var _85b=_85a.bindingDocument;
var _85c=_859.newInstance(_85b);
_85c.imageProfile=_857.imageProfile;
_85c.setLabel(_857.label);
_85c.selectionValue=_857.value;
if(_857.isSelected){
this.select(_85c,true);
}
_857.menuItemBinding=_85c;
if(_858){
_85a.addFirst(_85c);
this.selections.addFirst(_857);
}else{
_85a.add(_85c);
this.selections.add(_857);
}
this._isUpToDate=false;
return _85c;
};
SelectorBinding.prototype.addSelectionFirst=function(_85d){
return this.addSelection(_85d,true);
};
SelectorBinding.prototype.clear=function(_85e){
this._selectedItemBinding=null;
if(this._popupBinding){
this._popupBinding.clear();
this.selections.clear();
if(!_85e&&this.defaultSelection!=null){
var _85f=this.addSelection(this.defaultSelection);
this.select(_85f,true);
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
SelectorBinding.prototype.setDisabled=function(_860){
if(this.isAttached==true){
var _861=this._buttonBinding;
this.shadowTree.selectorindicatorimage.style.display=_860?"none":"block";
_861.setDisabled(_860);
}
if(_860){
this.setProperty("isdisabled",true);
}else{
this.deleteProperty("isdisabled");
}
};
SelectorBinding.prototype.reset=function(_862){
if(this.defaultSelection!=null){
this.selectByValue(this.defaultSelection.value,_862);
}
};
SelectorBinding.prototype.handleAction=function(_863){
SelectorBinding.superclass.handleAction.call(this,_863);
switch(_863.type){
case ButtonBinding.ACTION_COMMAND:
this._onButtonCommand();
_863.consume();
break;
case PopupBinding.ACTION_SHOW:
this._onPopupShowing();
_863.consume();
break;
case MenuItemBinding.ACTION_COMMAND:
this._onMenuItemCommand(_863.target);
_863.consume();
break;
case PopupBinding.ACTION_HIDE:
var self=this;
setTimeout(function(){
if(self.isFocused){
self._grabKeyboard();
}
},0);
_863.consume();
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
SelectorBinding.prototype._onMenuItemCommand=function(_865){
this.select(_865);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
SelectorBinding.prototype._restoreSelection=function(){
if(this._selectedItemBinding){
this._selectedItemBinding.focus();
}
};
SelectorBinding.prototype._fitMenuToSelector=function(){
var _866=this._buttonBinding.bindingElement.offsetWidth+"px";
var _867=this._popupBinding.bindingElement;
if(Client.isMozilla==true){
_867.style.minWidth=_866;
}else{
_867.style.width=_866;
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
SelectorBinding.prototype.handleBroadcast=function(_869,arg){
SelectorBinding.superclass.handleBroadcast.call(this,_869,arg);
switch(_869){
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
SelectorBinding.prototype.select=function(_86c,_86d){
var _86e=false;
if(_86c!=this._selectedItemBinding){
this._selectedItemBinding=_86c;
_86e=true;
var _86f=this._buttonBinding;
this._selectionValue=_86c.selectionValue;
_86f.setLabel(_86c.getLabel());
if(_86c.imageProfile!=null){
_86f.imageProfile=_86c.imageProfile;
}
if(_86f.imageProfile!=null){
_86f.setImage(this.isDisabled==true?_86f.imageProfile.getDisabledImage():_86f.imageProfile.getDefaultImage());
}
this._updateImageLayout();
if(!_86d){
this.onValueChange();
this.dispatchAction(SelectorBinding.ACTION_SELECTIONCHANGED);
this.dirty();
}
if(!this._isValid||(this.isRequired&&!_86d)){
this.validate();
}
}
return _86e;
};
SelectorBinding.prototype._relate=function(){
var _870=this.getProperty("relate");
if(_870){
var _871=this.bindingDocument.getElementById(_870);
if(_871){
var _872=UserInterface.getBinding(_871);
if(_872){
if(this.isChecked){
_872.show();
}else{
_872.hide();
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
SelectorBinding.prototype.selectByValue=function(_873,_874){
var _875=false;
var _876=this._menuBodyBinding;
var _877=_876.getDescendantElementsByLocalName("menuitem");
while(_877.hasNext()){
var _878=UserInterface.getBinding(_877.getNext());
if(_878.selectionValue==_873){
_875=this.select(_878,_874);
break;
}
}
return _875;
};
SelectorBinding.prototype.getValue=function(){
var _879=this._selectionValue;
if(_879!=null){
_879=String(_879);
}
return _879;
};
SelectorBinding.prototype.setValue=function(_87a){
this.selectByValue(String(_87a),true);
};
SelectorBinding.prototype.getResult=function(){
var _87b=this._selectionValue;
if(_87b=="null"){
_87b=null;
}
if(_87b){
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_87b=Number(_87b);
break;
}
}
return _87b;
};
SelectorBinding.prototype.setResult=function(_87c){
this.selectByValue(_87c,true);
};
SelectorBinding.prototype.validate=function(){
var _87d=true;
if(this.isRequired==true&&this.defaultSelection!=null){
var _87e=this.getValue();
if(_87e==this.defaultSelection.value){
_87d=false;
}
if(_87d!=this._isValid){
if(_87d){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_87d;
}
return _87d;
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
var _87f=this._popupBinding;
if(!this._isUpToDate){
_87f.attachRecursive();
this._isUpToDate=true;
}
};
SelectorBinding.newInstance=function(_880){
var _881=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_880);
return UserInterface.registerBinding(_881,SelectorBinding);
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
var _884=this.getProperty("onchange");
this.isRequired=this.getProperty("required")==true;
if(this.hasCallBackID()){
this._select.id=this.getCallBackID();
}
if(_884){
this.onValueChange=function(){
Binding.evaluate(_884,this);
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
SimpleSelectorBinding.prototype.focus=function(_887){
SimpleSelectorBinding.superclass.focus.call(this);
if(this.isFocused){
if(!_887){
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
SimpleSelectorBinding.prototype._hack=function(_888){
if(Client.isExplorer){
this._select.style.width=_888?"auto":this._cachewidth+"px";
if(_888){
if(this._select.offsetWidth<=this._cachewidth){
this._hack(false);
}
}
}
};
SimpleSelectorBinding.prototype.validate=function(){
var _889=true;
if(this.isRequired){
if(this.getValue()==null){
_889=false;
}
}
if(_889!=this._isValid){
if(_889){
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.attachClassName(DataBinding.CLASSNAME_INVALID);
var _88a=this._select;
var _88b=_88a.options[_88a.selectedIndex];
var text=DOMUtil.getTextContent(_88b);
_88a.blur();
_88a.style.color="#A40000";
_88a.style.fontWeight="bold";
if(!Client.isExplorer6){
DOMUtil.setTextContent(_88b,DataBinding.warnings["required"]);
}
_88a.onfocus=function(){
this.style.color="black";
this.style.fontWeight="normal";
this.onfocus=null;
if(!Client.isExplorer6){
DOMUtil.setTextContent(_88b,text);
}
};
}
this._isValid=_889;
}
return _889;
};
SimpleSelectorBinding.prototype.manifest=function(){
};
SimpleSelectorBinding.prototype.getValue=function(){
var _88d=null;
var _88e=this._select;
var _88f=_88e.options[_88e.selectedIndex];
var _890=true;
if(Client.isExplorer){
var html=_88f.outerHTML.toLowerCase();
if(html.indexOf("value=")==-1){
_890=false;
}
}
if(_890){
_88d=_88f.getAttribute("value");
}
return _88d;
};
SimpleSelectorBinding.prototype.setValue=function(_892){
};
SimpleSelectorBinding.prototype.getResult=function(){
return this.getValue();
};
SimpleSelectorBinding.prototype.setResult=function(_893){
this.setValue(_893);
};
SimpleSelectorBinding.newInstance=function(_894){
var _895=DOMUtil.createElementNS(Constants.NS_XHTML,"select",_894);
return UserInterface.registerBinding(_895,SimpleSelectorBinding);
};
function SelectorBindingSelection(_896,_897,_898,_899){
this._init(_896,_897,_898,_899);
}
SelectorBindingSelection.prototype={label:null,value:null,isSelected:null,imageProfile:null,menuItemBinding:null,_init:function(_89a,_89b,_89c,_89d){
if(_89a!=null){
this.label=String(_89a);
}
if(_89b!=null){
this.value=String(_89b);
}
if(_89d!=null){
this.imageProfile=_89d;
}
this.isSelected=_89c?true:false;
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
var _89e=this.addFirst(ToolBarButtonBinding.newInstance(this.bindingDocument));
_89e.popupBindingTargetElement=this.shadowTree.input;
_89e.setImage(DataInputSelectorBinding.INDICATOR_IMAGE);
_89e.attach();
var self=this;
_89e.oncommand=function(){
self._attachSelections();
};
this._buttonBinding=_89e;
};
DataInputSelectorBinding.prototype.buildPopup=SelectorBinding.prototype.buildPopup;
DataInputSelectorBinding.prototype.buildSelections=function(){
var list=new List();
var _8a1=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_8a1).each(function(_8a2){
if(_8a2.getAttribute("label")){
throw "label not supported - use value property!";
}else{
var _8a3=_8a2.getAttribute("value");
var _8a4=_8a2.getAttribute("selected");
var _8a5=_8a2.getAttribute("tooltip");
list.add({value:_8a3?_8a3:null,toolTip:_8a5?_8a5:null,isSelected:(_8a4&&_8a4=="true")?true:false});
}
});
if(list.hasEntries()){
this.populateFromList(list);
}
};
DataInputSelectorBinding.prototype.populateFromList=function(list){
var _8a7=this._menuBodyBinding;
var _8a8=_8a7.bindingDocument;
while(_8a7.bindingElement.hasChildNodes()){
var node=_8a7.bindingElement.lastChild;
if(node.nodeType==Node.ELEMENT_NODE&&UserInterface.hasBinding(node)){
UserInterface.getBinding(node).dispose();
}else{
_8a7.removeChild(node);
}
}
if(list.hasEntries()){
this._isUpToDate=false;
if(!this._buttonBinding.isVisible){
this._buttonBinding.show();
}
while(list.hasNext()){
var _8aa=list.getNext();
var _8ab=MenuItemBinding.newInstance(_8a8);
_8ab.setLabel(_8aa.value);
_8ab.selectionValue=_8aa.value;
if(_8aa.toolTip){
_8ab.setToolTip(_8aa.toolTip);
}
if(_8aa.isSelected){
this.select(_8ab,true);
}
_8a7.add(_8ab);
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
DataInputSelectorBinding.prototype._onMenuItemCommand=function(_8ac){
this.select(_8ac);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
DataInputSelectorBinding.prototype.handleBroadcast=function(_8ad,arg){
SelectorBinding.prototype.handleBroadcast.call(this,_8ad,arg);
switch(_8ad){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(arg!=this._buttonBinding){
DataInputSelectorBinding.superclass.handleBroadcast.call(this,_8ad,arg);
}
break;
}
};
DataInputSelectorBinding.prototype._grabKeyboard=SelectorBinding.prototype._grabKeyboard;
DataInputSelectorBinding.prototype._releaseKeyboard=SelectorBinding.prototype._releaseKeyboard;
DataInputSelectorBinding.prototype._handleArrowKey=SelectorBinding.prototype._handleArrowKey;
DataInputSelectorBinding.prototype.focus=function(_8af){
if(!this.isFocused){
DataInputSelectorBinding.superclass.focus.call(this,_8af);
if(this.isFocused==true){
this._grabKeyboard();
}
}
};
DataInputSelectorBinding.prototype.blur=function(_8b0){
if(this.isFocused==true){
DataInputSelectorBinding.superclass.blur.call(this,_8b0);
this._releaseKeyboard();
if(this._popupBinding.isVisible){
this._popupBinding.hide();
}
}
};
DataInputSelectorBinding.prototype._fitMenuToSelector=function(){
var _8b1=this.bindingElement.offsetWidth+"px";
var _8b2=this._popupBinding.bindingElement;
if(Client.isMozilla){
_8b2.style.minWidth=_8b1;
}else{
_8b2.style.width=_8b1;
}
};
DataInputSelectorBinding.prototype._restoreSelection=function(){
if(!this._isUpToDate){
this._attachSelections();
}
var _8b3=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
var _8b4=this.getValue();
var _8b5=null;
_8b3.each(function(item){
if(item.getLabel()==_8b4){
_8b5=item;
}
});
if(_8b5){
_8b5.focus();
}
};
DataInputSelectorBinding.prototype.select=function(item,_8b8){
if(item!=this._selectedItemBinding){
this._selectedItemBinding=item;
this.setValue(item.selectionValue);
if(!_8b8){
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
var _8b9=ToolBarButtonBinding.newInstance(this.bindingDocument);
_8b9.setImage("${icon:popup}");
this.addFirst(_8b9);
_8b9.attach();
var self=this;
_8b9.oncommand=function(){
self._isButtonClicked=true;
setTimeout(function(){
self._isButtonClicked=false;
},1000);
var _8bb=self.getProperty("handle");
var _8bc=ViewDefinitions[_8bb];
if(_8bc instanceof DialogViewDefinition){
_8bc.handler={handleDialogResponse:function(_8bd,_8be){
self._isButtonClicked=false;
if(_8bd==Dialog.RESPONSE_ACCEPT){
self.logger.debug("Usecase scenario was hardcoded into DataInputDialogBinding#buildButton");
var _8bf=_8be.getFirst();
self.setValue(_8bf);
self.validate(true);
}
self.focus();
}};
_8bc.argument.selectedResult=self.getValue();
StageBinding.presentViewDefinition(_8bc);
}else{
throw "Definition was either undefine or of a non-dialog type.";
}
};
DOMEvents.addEventListener(_8b9.getBindingElement(),DOMEvents.MOUSEDOWN,{handleEvent:function(e){
self._isButtonClicked=true;
}});
this._dialogButtonBinding=_8b9;
};
DataInputDialogBinding.prototype.oncommand=function(){
var _8c1=this._dialogButtonBinding;
if(_8c1!=null){
_8c1.oncommand();
}
};
DataInputDialogBinding.prototype.validate=function(arg){
var _8c3=true;
if(this._isButtonClicked==true){
this._isButtonClicked=false;
}else{
_8c3=DataInputDialogBinding.superclass.validate.call(this,arg);
}
return _8c3;
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
var _8c4=this.getProperty("label");
var _8c5=this.getProperty("tooltip");
this._buttonBinding=this.add(ClickButtonBinding.newInstance(this.bindingDocument));
if(_8c4!=null){
if(this.getProperty("handle")!=null||this.getProperty("url")!=null){
this._buttonBinding.setLabel(_8c4+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}else{
this._buttonBinding.setLabel(_8c4);
}
}
if(this.imageProfile){
this._buttonBinding.imageProfile=this.imageProfile;
}
if(_8c5!=null){
this._buttonBinding.setToolTip(_8c5);
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
DataDialogBinding.prototype.handleAction=function(_8c7){
DataDialogBinding.superclass.handleAction.call(this,_8c7);
var _8c8=_8c7.target;
var self=this;
switch(_8c7.type){
case ButtonBinding.ACTION_COMMAND:
if(this._handler==null){
this._handler={handleDialogResponse:function(_8ca,_8cb){
if(_8ca==Dialog.RESPONSE_ACCEPT){
if(_8cb instanceof DataBindingMap){
self._map=_8cb;
}else{
throw "Invalid dialog result";
}
}
}};
}
if(_8c8==this._buttonBinding){
_8c7.consume();
this.focus();
this.fireCommand();
}
break;
}
};
DataDialogBinding.prototype.handleBroadcast=function(_8cc,arg){
DataDialogBinding.superclass.handleBroadcast.call(this,_8cc,arg);
switch(_8cc){
case BroadcastMessages.KEY_SPACE:
this.fireCommand();
break;
}
};
DataDialogBinding.prototype.fireCommand=function(def){
this.dispatchAction(this.constructor.ACTION_COMMAND);
var _8cf=this.getProperty("handle");
var url=this.getURL();
var _8d1=null;
if(_8cf!=null||def!=null){
if(_8cf!=null){
_8d1=ViewDefinitions[_8cf];
}else{
_8d1=def;
}
if(_8d1 instanceof DialogViewDefinition){
_8d1.handler=this._handler;
if(this._map!=null){
_8d1.argument=this._map;
}
StageBinding.presentViewDefinition(_8d1);
}
}else{
if(url!=null){
_8d1=Dialog.invokeModal(url,this._handler,this._map);
}
}
if(_8d1!=null){
this._dialogViewHandle=_8d1.handle;
this._releaseKeyboard();
}
};
DataDialogBinding.prototype.setLabel=function(_8d2){
this.setProperty("label",_8d2);
if(this.isAttached){
this._buttonBinding.setLabel(_8d2+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}
};
DataDialogBinding.prototype.setImage=function(_8d3){
this.setProperty("image",_8d3);
if(this.imageProfile!=null){
this.imageProfile.setDefaultImage(_8d3);
if(this._buttonBinding!=null){
this._buttonBinding.imageProfile=this.imageProfile;
this._buttonBinding.setImage(this._buttonBinding.imageProfile.getDefaultImage());
}
}
};
DataDialogBinding.prototype.setToolTip=function(_8d4){
this.setProperty("tooltip",_8d4);
if(this.isAttached){
this._buttonBinding.setToolTip(_8d4);
}
};
DataDialogBinding.prototype.setHandle=function(_8d5){
this.setProperty("handle",_8d5);
};
DataDialogBinding.prototype.setURL=function(url){
this.setProperty("url",url);
};
DataDialogBinding.prototype.getURL=function(){
return this.getProperty("url");
};
DataDialogBinding.prototype.setHandler=function(_8d7){
this._handler=_8d7;
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
DataDialogBinding.newInstance=function(_8d9){
var _8da=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_8d9);
return UserInterface.registerBinding(_8da,DataDialogBinding);
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
this._handler={handleDialogResponse:function(_8dc,_8dd){
if(_8dc==Dialog.RESPONSE_ACCEPT){
self._onDialogAccept(_8dd);
}else{
self._onDialogCancel();
}
}};
};
PostBackDataDialogBinding.prototype._onDialogAccept=function(_8de){
_8de=new String(_8de);
this.dirty();
this.setValue(encodeURIComponent(_8de));
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
var _8e2=this.getValue();
if(_8e2==null){
_8e2="";
}
this.shadowTree.dotnetinput.value=_8e2;
};
PostBackDataDialogBinding.prototype.setValue=function(_8e3){
this.setProperty("value",_8e3);
};
PostBackDataDialogBinding.prototype.getValue=function(){
return this.getProperty("value");
};
PostBackDataDialogBinding.prototype.getResult=function(){
return null;
};
PostBackDataDialogBinding.prototype.setResult=function(_8e4){
};
PostBackDataDialogBinding.newInstance=function(_8e5){
var _8e6=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_8e5);
return UserInterface.registerBinding(_8e6,PostBackDataDialogBinding);
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
var _8e7=this.getProperty("dialoglabel");
var _8e8=this.getProperty("providersearch");
var key=this.getProperty("providerkey");
var _8ea=this.getProperty("handle");
if(_8ea!=null){
var def=ViewDefinition.clone(_8ea,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_8e7!=null){
if(def.argument==null){
def.argument={};
}
def.argument.label=_8e7;
}
if(_8e8!=null){
if(def.argument==null){
def.argument={};
}
if(def.argument.nodes==null){
def.argument.nodes=[];
}
def.argument.nodes[0].search=_8e8;
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
ViewDefinitionPostBackDataDialogBinding.newInstance=function(_8ec){
var _8ed=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_8ec);
return UserInterface.registerBinding(_8ed,ViewDefinitionPostBackDataDialogBinding);
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
this.propertyMethodMap["value"]=function(_8ef){
self._datathing.setValue(_8ef);
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
var _8f2=self.getValue();
if(_8f2==""||_8f2==null){
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
var _8f3=this.getProperty("value");
var _8f4=this.getProperty("selectorlabel");
if(_8f4==null){
_8f4=NullPostBackDataDialogBinding.LABEL_DEFAULT;
}
var list=new List();
list.add(new SelectorBindingSelection(NullPostBackDataDialogBinding.LABEL_NULL,NullPostBackDataDialogBinding.VALUE_NULL,_8f3==null));
list.add(new SelectorBindingSelection(_8f4+LabelBinding.DIALOG_INDECATOR_SUFFIX,NullPostBackDataDialogBinding.VALUE_SELECTED,_8f3!=null,new ImageProfile({image:"${icon:popup}"})));
this._selector.master=this;
this._selector.attach();
this._selector.populateFromList(list);
var _8f3=this.getValue();
if(_8f3==""||_8f3==null){
this._selector.setLabel(NullPostBackDataDialogBinding.LABEL_NULL);
}else{
this._selector.setLabel(this.getLabel());
}
};
NullPostBackDataDialogBinding.prototype.handleAction=function(_8f6){
NullPostBackDataDialogBinding.superclass.handleAction.call(this,_8f6);
switch(_8f6.type){
case PageBinding.ACTION_DOPOSTBACK:
if(_8f6.target==this._datathing){
var _8f7=this.getProperty("label");
this._selector.setLabel("");
this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
var self=this;
setTimeout(function(){
if(self.getProperty("label")==_8f7){
self._selector.setLabel(_8f7);
}
},500);
_8f6.consume();
}
break;
}
};
NullPostBackDataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
NullPostBackDataDialogBinding.prototype.setLabel=function(_8f9){
this.setProperty("label",_8f9);
if(this._selector!=null){
this._selector.setLabel(_8f9);
}
};
NullPostBackDataDialogBinding.prototype.getValue=function(){
return this._datathing.getValue();
};
NullPostBackDataDialogBinding.prototype.setValue=function(_8fa){
this._datathing.setValue(_8fa);
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
NullPostBackDataDialogSelectorBinding.prototype.select=function(_8fb,_8fc){
if(NullPostBackDataDialogSelectorBinding.superclass.select.call(this,_8fb,_8fc)){
this._buttonBinding.setImage(null);
this._updateImageLayout();
if(this._selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
if(this.master.getValue()!=null){
}
}
}
};
NullPostBackDataDialogSelectorBinding.prototype.setLabel=function(_8fd){
this._buttonBinding.setLabel(_8fd);
};
NullPostBackDataDialogSelectorBinding.prototype.setToolTip=function(_8fe){
this._buttonBinding.setToolTip(_8fe);
};
NullPostBackDataDialogSelectorBinding.prototype.handleAction=function(_8ff){
NullPostBackDataDialogSelectorBinding.superclass.handleAction.call(this,_8ff);
switch(_8ff.type){
case MenuItemBinding.ACTION_COMMAND:
var _900=_8ff.target;
var _901=this.master;
if(_900.selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
this.setLabel(_900.getLabel());
setTimeout(function(){
_901.action();
},0);
}else{
this.master.setValue("");
}
_901.dirty();
break;
}
};
NullPostBackDataDialogSelectorBinding.prototype.manifest=function(){
};
NullPostBackDataDialogSelectorBinding.newInstance=function(_902){
var _903=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_902);
return UserInterface.registerBinding(_903,NullPostBackDataDialogSelectorBinding);
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
var _904=this._dataDialogBinding;
if(_904!=null){
DOMEvents.addEventListener(this.shadowTree.box,DOMEvents.DOUBLECLICK,{handleEvent:function(){
_904.fireCommand();
}});
}
};
MultiSelectorBinding.prototype._buildDOMContent=function(){
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
this.bindingElement.appendChild(this.shadowTree.box);
};
MultiSelectorBinding.prototype._parseDOMProperties=function(){
var _905=this.getProperty("editable");
var _906=this.getProperty("selectable");
var _907=this.getProperty("display");
if(_905!=false){
this._buildEditorButton();
}else{
this.isEditable=false;
}
if(_906){
this.isSelectable=true;
this._selectionMap=new Map();
}
if(_907){
this._display=_907;
}
};
MultiSelectorBinding.prototype._buildEditorButton=function(){
if(this.isEditable){
var _908=MultiSelectorDataDialogBinding.newInstance(this.bindingDocument);
_908.selections=this.selections;
this.add(_908);
_908.attach();
this._dataDialogBinding=_908;
this.shadowTree.datadialog=_908;
}
};
MultiSelectorBinding.prototype.populateFromList=function(list){
list.reset();
var _90a=false;
this.shadowTree.box.innerHTML="";
while(list.hasNext()){
var _90b=list.getNext();
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_90a=_90b.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_90a=_90b.isSelected!=true;
break;
}
if(_90a){
this.shadowTree.box.appendChild(this._getElementForSelection(_90b));
}
}
this.selections=list;
if(this._dataDialogBinding){
this._dataDialogBinding.selections=this.selections;
}
};
MultiSelectorBinding.prototype.cumulateFromList=function(list,_90d){
var box=this.shadowTree.box;
var _90f=false;
if(list.hasEntries()){
list.reverse().reset();
while(list.hasNext()){
var _910=list.getNext();
if(_90d){
_910.isSelected=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
_90f=true;
}else{
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_90f=_910.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_90f=_910.isSelected!=true;
break;
}
}
if(_90f){
var _911=this._getElementForSelection(_910);
box.insertBefore(_911,box.firstChild);
CSSUtil.attachClassName(_911,"selected");
this._selectionMap.set(_910.value,_911);
}
}
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
};
MultiSelectorBinding.prototype._getElementForSelection=function(_912){
var _913=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument);
_913.appendChild(this.bindingDocument.createTextNode(_912.label));
_913.setAttribute("label",_912.label);
_913.setAttribute("value",_912.value);
return _913;
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
var _915=DOMEvents.getTarget(e);
var _916=DOMUtil.getLocalName(_915);
if(_916=="div"){
this._handleMouseDown(_915);
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
break;
}
};
MultiSelectorBinding.prototype._handleMouseDown=function(_917){
if(Keyboard.isShiftPressed&&this._lastSelectedElement){
var _918=this._getElements();
var _919=_917.getAttribute("value");
var _91a=this._lastSelectedElement.getAttribute("value");
var _91b=false;
while(_918.hasNext()){
var el=_918.getNext();
switch(el.getAttribute("value")){
case _919:
case _91a:
_91b=!_91b;
break;
}
if(_91b){
this._hilite(el);
}else{
this._unhilite(el);
}
this._hilite(this._lastSelectedElement);
this._hilite(_917);
}
}else{
if(Keyboard.isControlPressed&&this._isHilited(_917)){
this._unhilite(_917);
}else{
this._hilite(_917);
}
if(!Keyboard.isControlPressed){
var self=this;
this._getElements().each(function(el){
if(el!=_917){
self._unhilite(el);
}
});
}
}
this._lastSelectedElement=_917;
};
MultiSelectorBinding.prototype._hilite=function(_91f){
var _920=_91f.getAttribute("value");
if(!this._selectionMap.has(_920)){
CSSUtil.attachClassName(_91f,"selected");
this._selectionMap.set(_920,_91f);
}
};
MultiSelectorBinding.prototype._unhilite=function(_921){
var _922=_921.getAttribute("value");
if(this._selectionMap.has(_922)){
CSSUtil.detachClassName(_921,"selected");
this._selectionMap.del(_922);
}
};
MultiSelectorBinding.prototype._isHilited=function(_923){
return CSSUtil.hasClassName(_923,"selected");
};
MultiSelectorBinding.prototype.handleAction=function(_924){
MultiSelectorBinding.superclass.handleAction.call(this,_924);
var _925=_924.target;
switch(_924.type){
case DataDialogBinding.ACTION_COMMAND:
if(_925==this._dataDialogBinding){
if(!this.isFocused){
this.focus();
}
this.dispatchAction(MultiSelectorBinding.ACTION_COMMAND);
_924.consume();
}
break;
case MultiSelectorDataDialogBinding.ACTION_RESULT:
this.populateFromList(_925.result);
this.dirty();
_925.result=null;
_924.consume();
break;
}
};
MultiSelectorBinding.prototype.extractSelected=function(){
var _926=null;
if(this.isSelectable){
_926=new List();
if(this._selectionMap&&this._selectionMap.hasEntries()){
var self=this;
this._getElements().each(function(_928){
if(self._isHilited(_928)){
_928.parentNode.removeChild(_928);
_926.add(new SelectorBindingSelection(_928.getAttribute("label"),_928.getAttribute("value"),true));
}
});
this._selectionMap=new Map();
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
return _926;
};
MultiSelectorBinding.prototype.reposition=function(isUp){
var _92a=this._getElements();
if(!isUp){
_92a.reverse();
}
var _92b=true;
while(_92b&&_92a.hasNext()){
var _92c=_92a.getNext();
if(this._isHilited(_92c)){
switch(isUp){
case true:
if(_92c.previousSibling){
_92c.parentNode.insertBefore(_92c,_92c.previousSibling);
}else{
_92b=false;
}
break;
case false:
if(_92c.nextSibling){
_92c.parentNode.insertBefore(_92c,_92c.nextSibling.nextSibling);
}else{
_92b=false;
}
break;
}
}
}
};
MultiSelectorBinding.prototype.toSelectionList=function(){
var _92d=new List();
var _92e=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
var self=this;
this._getElements().each(function(_930){
var _931=new SelectorBindingSelection(_930.getAttribute("label"),_930.getAttribute("value"),_92e);
_931.isHighlighted=self._isHilited(_930);
_92d.add(_931);
});
return _92d;
};
MultiSelectorBinding.prototype._getElements=function(){
return new List(DOMUtil.getElementsByTagName(this.shadowTree.box,"div"));
};
MultiSelectorBinding.prototype._getSelectionsList=SelectorBinding.prototype._getSelectionsList;
MultiSelectorBinding.prototype.validate=function(){
return true;
};
MultiSelectorBinding.prototype.manifest=function(){
var _932=new List(DOMUtil.getElementsByTagName(this.bindingElement,"input"));
if(_932.hasEntries()){
_932.each(function(_933){
_933.parentNode.removeChild(_933);
});
}
this.selections.reset();
while(this.selections.hasNext()){
var _934=this.selections.getNext();
if(_934.isSelected){
var _935=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_935.name=this._name;
_935.value=_934.value;
this.bindingElement.appendChild(_935);
}
}
};
MultiSelectorBinding.prototype.getValue=function(){
return "HEJ!";
};
MultiSelectorBinding.prototype.setValue=function(_936){
alert(_936);
};
MultiSelectorBinding.prototype.getResult=function(){
alert("TODO: MultiSelectorBinding#getResult");
return new Array();
};
MultiSelectorBinding.prototype.setResult=function(_937){
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
var _938={label:DataBinding.getAssociatedLabel(this),value:decodeURIComponent(this.getValue()),configuration:{"formattingconfiguration":this.getProperty("formattingconfiguration"),"elementclassconfiguration":this.getProperty("elementclassconfiguration"),"configurationstylesheet":this.getProperty("configurationstylesheet"),"presentationstylesheet":this.getProperty("presentationstylesheet"),"embedablefieldstypenames":this.getProperty("embedablefieldstypenames")}};
var _939=ViewDefinitions["Composite.Management.VisualEditorDialog"];
_939.handler=this._handler;
_939.argument=_938;
StageBinding.presentViewDefinition(_939);
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
var _93a={label:DataBinding.getAssociatedLabel(this),selections:this.selections};
var self=this;
var _93c={handleDialogResponse:function(_93d,_93e){
if(_93d==Dialog.RESPONSE_ACCEPT){
self.result=_93e;
self.dispatchAction(MultiSelectorDataDialogBinding.ACTION_RESULT);
}
}};
var _93f=ViewDefinitions[this._dialogViewHandle];
_93f.handler=_93c;
_93f.argument=_93a;
StageBinding.presentViewDefinition(_93f);
};
MultiSelectorDataDialogBinding.newInstance=function(_940){
var _941=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_940);
return UserInterface.registerBinding(_941,MultiSelectorDataDialogBinding);
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
LazyBindingBinding.wakeUp=function(_942){
var id=_942.bindingElement.id+LazyBindingBinding.ID_APPENDIX;
var _944=_942.bindingDocument.getElementById(id);
if(_944!=null){
var _945=UserInterface.getBinding(_944);
_945.setResult(true);
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
var _947=this.bindingDocument.getElementById(id);
if(_947!=null){
var _948=UserInterface.getBinding(_947);
if(_948&&!_948.isAttached){
_948.isLazy=true;
}else{
_947.setAttribute("lazy",true);
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
LazyBindingBinding.prototype.setResult=function(_949){
this._isLazy=_949;
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
var _94b=this.getProperty("stateprovider");
var _94c=this.getProperty("handle");
if(_94b!=null&&_94c!=null){
url=url.replace("${stateprovider}",_94b).replace("${handle}",_94c);
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
EditorDataBinding.prototype._onPageInitialize=function(_94d){
EditorDataBinding.superclass._onPageInitialize.call(this,_94d);
if(this._pageBinding!=null){
Application.unlock(this);
this._coverBinding.hide();
}
};
EditorDataBinding.prototype.setName=DataBinding.prototype.setName;
EditorDataBinding.prototype.validate=function(){
return this._pageBinding.validateAllDataBindings();
};
EditorDataBinding.prototype.handleAction=function(_94e){
EditorDataBinding.superclass.handleAction.call(this,_94e);
switch(_94e.type){
case Binding.ACTION_DIRTY:
if(_94e.target!=this){
if(!this.isDirty){
this.dirty();
}
_94e.consume();
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
EditorDataBinding.prototype.setValue=function(_94f){
};
EditorDataBinding.prototype.getResult=function(){
return null;
};
EditorDataBinding.prototype.setResult=function(_950){
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
var _954=true;
if(this.getProperty("required")){
var fake=this.getDescendantBindingByLocalName("datainput");
_954=fake.getValue()!="";
}
if(!_954&&this._isValid){
this._isValid=false;
this.dispatchAction(Binding.ACTION_INVALID);
}else{
if(_954&&!this._isValid){
this.dispatchAction(Binding.ACTION_VALID);
}
}
return _954;
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
var _958=this.bindingDocument.getElementById(RequestBinding.INPUT_ID);
if(_958!=null){
_958.value=Application.CONSOLE_ID;
}
};
RequestBinding.prototype.postback=function(_959){
_959=_959!=null?_959:EditorPageBinding.message;
this.shadowTree.dotnetinput.value=_959;
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
var _95a=Templates.getTemplateElementText("fieldgroupmatrix.xml");
var _95b=_95a.replace("MARKUP",this.bindingElement.innerHTML);
try{
this.bindingElement.innerHTML=_95b;
}
catch(exception1){
this.logger.error("Exeption in innerHTML!");
_95b=_95b.replace(/\&nbsp;/g,"");
this.bindingElement.innerHTML=_95b;
}
var self=this;
var _95d=DOMUtil.getElementsByTagName(this.bindingElement,"table").item(0);
new List(_95d.rows).each(function(row){
new List(row.cells).each(function(cell){
self.shadowTree[cell.className]=cell;
});
});
};
FieldGroupBinding.prototype._buildDOMContent=function(){
var _960=this.getProperty("label");
if(_960){
this.setLabel(_960);
}else{
this.attachClassName(FieldGroupBinding.CLASSNAME_NOLABEL);
}
};
FieldGroupBinding.prototype.setLabel=function(_961){
this.setProperty("label",_961);
if(this.shadowTree.labelBinding==null){
var _962=LabelBinding.newInstance(this.bindingDocument);
var cell=this.shadowTree[FieldGroupBinding.NORTH];
_962.attachClassName("fieldgrouplabel");
cell.insertBefore(_962.bindingElement,cell.getElementsByTagName("div").item(1));
_962.attach();
this.shadowTree.labelBinding=_962;
}
this.shadowTree.labelBinding.setLabel(Resolver.resolve(_961));
};
FieldGroupBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
FieldGroupBinding.prototype.add=function(_964){
this.shadowTree[FieldGroupBinding.CENTER].appendChild(_964.bindingElement);
return _964;
};
FieldGroupBinding.prototype.addFirst=function(_965){
var _966=this.shadowTree[FieldGroupBinding.CENTER];
_966.insertBefore(_965.bindingElement,_966.firstChild);
return _965;
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
var _967=this.getProperty("relation");
if(_967!=null){
this.bindingRelation=_967;
this.subscribe(BroadcastMessages.BINDING_RELATE);
this.hide();
}
};
FieldBinding.prototype.handleBroadcast=function(_968,arg){
FieldBinding.superclass.handleBroadcast.call(this,_968,arg);
switch(_968){
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
FieldBinding.newInstance=function(_96a){
var _96b=DOMUtil.createElementNS(Constants.NS_UI,"ui:field",_96a);
return UserInterface.registerBinding(_96b,FieldBinding);
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
var _96c=this.getDescendantBindingByLocalName("fieldgroup");
if(_96c!=null){
_96c.attachClassName(FieldGroupBinding.CLASSNAME_FIRST);
}
};
FieldsBinding.prototype.onBindingDispose=function(){
FieldsBinding.superclass.onBindingDispose.call(this);
if(this._invalidCount>0){
this.dispatchAction(Binding.ACTION_VALID);
}
};
FieldsBinding.prototype.validate=function(){
var _96d=true;
var _96e=this.getDescendantBindingsByLocalName("*");
while(_96e.hasNext()){
var _96f=_96e.getNext();
if(Interfaces.isImplemented(IData,_96f)){
var _970=_96f.validate();
if(_96d&&!_970){
_96d=false;
}
}
}
return _96d;
};
FieldsBinding.prototype.handleAction=function(_971){
FieldsBinding.superclass.handleAction.call(this,_971);
var _972=_971.target;
if(_972!=this){
switch(_971.type){
case Binding.ACTION_INVALID:
var _973=DataBinding.getAssociatedLabel(_972);
if(_973){
this._invalidFieldLabels.set(_972.key,_973);
}
if(_972.error){
if(!_972.isInvalidBecauseRequired){
ErrorBinding.presentError({text:_972.error},_972);
}
}
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_INVALID);
}
this._invalidCount++;
_971.consume();
break;
case Binding.ACTION_VALID:
if(this._invalidFieldLabels.has(_972.key)){
this._invalidFieldLabels.del(_972.key);
}
this._invalidCount--;
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_VALID);
}
_971.consume();
break;
}
}
};
FieldsBinding.prototype.getInvalidLabels=function(){
var _974=null;
if(this._invalidFieldLabels.hasEntries()){
_974=this._invalidFieldLabels.toList();
}
return _974;
};
FieldsBinding.newInstance=function(_975){
var _976=DOMUtil.createElementNS(Constants.NS_UI,"ui:fields",_975);
return UserInterface.registerBinding(_976,FieldsBinding);
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
var _977=this.getProperty("image");
if(_977){
this.setImage(_977);
}
var _978=this.getProperty("tooltip");
if(_978){
this.setToolTip(_978);
}
var _979=this.getProperty("label");
if(_979){
this.setLabel(_979);
}
};
FieldDescBinding.prototype.attachDOMEvents=function(){
this.addEventListener(DOMEvents.CLICK);
};
FieldDescBinding.prototype.handleEvent=function(e){
FieldDescBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.CLICK:
var _97b=this.getAncestorBindingByLocalName("field");
if(_97b){
var _97c=true;
_97b.getDescendantBindingsByLocalName("*").each(function(_97d){
if(Interfaces.isImplemented(IData,_97d)){
_97d.focus();
_97c=false;
}
return _97c;
});
}
break;
}
};
FieldDescBinding.prototype.setLabel=function(_97e){
this.setProperty("label",_97e);
if(this.isAttached){
this.bindingElement.innerHTML=Resolver.resolve(_97e);
}
};
FieldDescBinding.prototype.getLabel=function(){
var _97f=this.getProperty("label");
if(!_97f){
var node=this.bindingElement.firstChild;
if(node&&node.nodeType==Node.TEXT_NODE){
_97f=node.data;
}
}
return _97f;
};
FieldDescBinding.prototype.setImage=function(_981){
this.setProperty("image",_981);
if(this.isAttached){
throw "FieldDescBinding: Images not suppoerted!";
}
};
FieldDescBinding.prototype.setToolTip=function(_982){
this.setProperty("tooltip",_982);
if(this.isAttached){
this.bindingElement.title=_982;
}
};
FieldDescBinding.newInstance=function(_983){
var _984=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddesc",_983);
return UserInterface.registerBinding(_984,FieldDescBinding);
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
FieldDataBinding.newInstance=function(_985){
var _986=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddata",_985);
return UserInterface.registerBinding(_986,FieldDataBinding);
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
var _987=this._fieldHelpPopupBinding;
if(_987){
_987.dispose();
}
};
FieldHelpBinding.prototype.buildPopupBinding=function(){
var _988=app.bindingMap.fieldhelpopupset;
var doc=_988.bindingDocument;
var _98a=_988.add(PopupBinding.newInstance(doc));
var _98b=_98a.add(PopupBodyBinding.newInstance(doc));
_98a.position=PopupBinding.POSITION_RIGHT;
_98a.attachClassName("fieldhelppopup");
if(this.bindingElement.hasChildNodes()){
_98b.bindingElement.innerHTML=this.bindingElement.innerHTML;
}else{
var _98c=this.getProperty("label");
if(_98c){
_98b.bindingElement.innerHTML=Resolver.resolve(_98c);
}
}
this.bindingElement.innerHTML="";
this._fieldHelpPopupBinding=_98a;
};
FieldHelpBinding.prototype.buildPopupButton=function(){
var _98d=this.getAncestorBindingByLocalName("field");
if(_98d){
_98d.attachClassName("fieldhelp");
var _98e=ClickButtonBinding.newInstance(this.bindingDocument);
_98e.attachClassName("fieldhelp");
_98e.setImage(FieldHelpBinding.INDICATOR_IMAGE);
this.add(_98e);
_98e.attach();
var self=this;
_98e.oncommand=function(){
self.attachPopupBinding();
};
_98e.setPopup(this._fieldHelpPopupBinding);
this._fieldHelpButton=_98e;
}
};
FieldHelpBinding.prototype.attachPopupBinding=function(){
var _990=this._fieldHelpPopupBinding;
if(_990&&!_990.isAttached){
_990.attachRecursive();
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
RadioDataGroupBinding.prototype.handleAction=function(_992){
RadioDataGroupBinding.superclass.handleAction.call(this,_992);
switch(_992.type){
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
RadioDataGroupBinding.prototype.handleBroadcast=function(_994,arg){
RadioDataGroupBinding.superclass.handleBroadcast.call(this,_994,arg);
switch(_994){
case BroadcastMessages.KEY_ARROW:
var _996=null;
var next=null;
var _998=null;
switch(arg){
case KeyEventCodes.VK_DOWN:
case KeyEventCodes.VK_UP:
_998=this.getChildBindingsByLocalName("radio");
while(!_996&&_998.hasNext()){
var _999=_998.getNext();
if(_999.getProperty("ischecked")){
_996=_999;
}
}
break;
}
if(_996){
switch(arg){
case KeyEventCodes.VK_DOWN:
next=_998.getFollowing(_996);
while(next!=null&&next.isDisabled){
next=_998.getFollowing(next);
}
break;
case KeyEventCodes.VK_UP:
next=_998.getPreceding(_996);
while(next!=null&&next.isDisabled){
next=_998.getPreceding(next);
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
RadioDataGroupBinding.prototype.focus=function(_99a){
if(!this.isFocused){
DataBinding.prototype.focus.call(this);
if(this.isFocused){
if(!_99a){
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
var _99b=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_99b.type="hidden";
_99b.name=this._name;
this.bindingElement.appendChild(_99b);
this.shadowTree.input=_99b;
}
this.shadowTree.input.value=this.getValue();
}
};
RadioDataGroupBinding.prototype.getValue=function(){
var _99c=null;
var _99d=this.getChildBindingsByLocalName("radio");
while(!_99c&&_99d.hasNext()){
var _99e=_99d.getNext();
if(_99e.isChecked){
_99c=_99e.getProperty("value");
}
}
return _99c;
};
RadioDataGroupBinding.prototype.getResult=RadioDataGroupBinding.prototype.getValue;
RadioDataGroupBinding.prototype.setValue=function(_99f){
};
RadioDataGroupBinding.prototype.setResult=function(_9a0){
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
this.propertyMethodMap["checked"]=function(_9a1){
if(_9a1!=this.isChecked){
this.setChecked(_9a1,true);
}
};
this.propertyMethodMap["checksum"]=function(){
var _9a2=this.getProperty("ischecked");
if(_9a2!=this.isChecked){
this.setChecked(_9a2,true);
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
var _9a3=this.getProperty("relate");
var _9a4=this.getProperty("oncommand");
if(_9a3){
this.bindingRelate=_9a3;
this.relate();
}
if(_9a4){
this.oncommand=function(){
Binding.evaluate(_9a4,this);
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
var _9a6=this.getCallBackID();
this._buttonBinding.check=function(_9a7){
RadioButtonBinding.prototype.check.call(this,_9a7);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
};
this._buttonBinding.uncheck=function(_9a8){
RadioButtonBinding.prototype.uncheck.call(this,_9a8);
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
RadioDataBinding.prototype.setChecked=function(_9a9,_9aa){
this._buttonBinding.setChecked(_9a9,_9aa);
if(this.bindingRelate!=null){
this.relate();
}
this.setProperty("ischecked",_9a9);
};
RadioDataBinding.prototype.check=function(_9ab){
this.setChecked(true,_9ab);
};
RadioDataBinding.prototype.uncheck=function(_9ac){
this.setChecked(false,_9ac);
};
RadioDataBinding.prototype.setDisabled=function(_9ad){
if(_9ad!=this.isDisabled){
this.isDisabled=_9ad;
this._buttonBinding.setDisabled(_9ad);
if(_9ad){
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
var _9af=DOMEvents.getTarget(e);
switch(_9af){
case this.shadowTree.labelText:
if(!this.isChecked&&!this.isDisabled){
this.check();
}
break;
}
}
};
RadioDataBinding.prototype._buildLabelText=function(){
var _9b0=this.getProperty("label");
if(_9b0){
this.shadowTree.labelText=DOMUtil.createElementNS(Constants.NS_UI,"ui:datalabeltext",this.bindingDocument);
this.shadowTree.labelText.appendChild(this.bindingDocument.createTextNode(Resolver.resolve(_9b0)));
DOMEvents.addEventListener(this.shadowTree.labelText,DOMEvents.CLICK,this);
this.bindingElement.appendChild(this.shadowTree.labelText);
}
};
RadioDataBinding.prototype.setLabel=function(_9b1){
if(this.shadowTree.labelText!=null){
this.shadowTree.labelText.firstChild.data=_9b1;
}
this.setProperty("label",_9b1);
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
this.propertyMethodMap["checked"]=function(_9b2){
if(_9b2!=this.isChecked){
this.setChecked(_9b2,true);
}
};
this.propertyMethodMap["checksum"]=function(){
var _9b3=this.getProperty("ischecked");
if(_9b3!=this.isChecked){
this.setChecked(_9b3,true);
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
var _9b5=DOMEvents.getTarget(e);
switch(_9b5){
case this.shadowTree.labelText:
this.setChecked(!this.isChecked);
break;
}
}
};
CheckBoxBinding.prototype.relate=RadioDataBinding.prototype.relate;
CheckBoxBinding.prototype.handleBroadcast=function(_9b6,arg){
CheckBoxBinding.superclass.handleBroadcast.call(this,_9b6,arg);
switch(_9b6){
case BroadcastMessages.KEY_SPACE:
this.setChecked(!this.isChecked);
break;
}
};
CheckBoxBinding.prototype._buildButtonBinding=function(){
this._buttonBinding=this.add(CheckButtonBinding.newInstance(this.bindingDocument));
var self=this;
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_9b9){
_9b9.consume();
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
var _9bb=this.getCallBackID();
this._buttonBinding.check=function(_9bc){
ButtonBinding.prototype.check.call(this,_9bc);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
if(!_9bc){
self.focus();
}
};
this._buttonBinding.uncheck=function(_9bd){
ButtonBinding.prototype.uncheck.call(this,_9bd);
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
if(_9bb!=null){
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
var _9be=true;
var _9bf=this.bindingElement.parentNode;
if(_9bf){
var _9c0=UserInterface.getBinding(_9bf);
if(_9c0&&_9c0 instanceof CheckBoxGroupBinding){
if(_9c0.isRequired){
if(_9c0.isValid){
_9be=_9c0.validate();
}else{
_9be=false;
}
}
}
}
return _9be;
};
CheckBoxBinding.prototype.manifest=function(){
if(this.isAttached){
switch(this.isChecked){
case true:
if(!this.shadowTree.input){
var _9c1=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_9c1.type="hidden";
_9c1.name=this._name;
_9c1.style.display="none";
this.bindingElement.appendChild(_9c1);
this.shadowTree.input=_9c1;
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
var _9c2=null;
var _9c3=this.getProperty("value");
if(this.isChecked){
_9c2=_9c3?_9c3:"on";
}
return _9c2;
};
CheckBoxBinding.prototype.setValue=function(_9c4){
if(_9c4==this.getValue()||_9c4=="on"){
this.check(true);
}else{
if(_9c4!="on"){
this.setPropety("value",_9c4);
}
}
};
CheckBoxBinding.prototype.getResult=function(){
var _9c5=false;
if(this.isChecked){
_9c5=this._result!=null?this._result:true;
}
return _9c5;
};
CheckBoxBinding.prototype.setResult=function(_9c6){
if(typeof _9c6=="boolean"){
this.setChecked(_9c6,true);
}else{
this._result=_9c6;
}
};
CheckBoxBinding.newInstance=function(_9c7){
var _9c8=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbox",_9c7);
return UserInterface.registerBinding(_9c8,CheckBoxBinding);
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
var _9c9=true;
if(this.isRequired){
var _9ca=this.getDescendantBindingsByLocalName("checkbox");
if(_9ca.hasEntries()){
_9c9=false;
while(_9ca.hasNext()&&!_9c9){
if(_9ca.getNext().isChecked){
_9c9=true;
}
}
}
if(_9c9==false){
this._showWarning(true);
this.dispatchAction(Binding.ACTION_INVALID);
this.addActionListener(CheckBoxBinding.ACTION_COMMAND);
}
}
return _9c9;
};
CheckBoxGroupBinding.prototype._showWarning=function(_9cb){
if(_9cb){
if(!this._labelBinding){
var _9cc=LabelBinding.newInstance(this.bindingDocument);
_9cc.attachClassName("invalid");
_9cc.setImage("${icon:error}");
_9cc.setLabel("Selection required");
this._labelBinding=this.addFirst(_9cc);
this._labelBinding.attach();
}
}else{
if(this._labelBinding){
this._labelBinding.dispose();
this._labelBinding=null;
}
}
};
CheckBoxGroupBinding.prototype.handleAction=function(_9cd){
CheckBoxGroupBinding.superclass.handleAction.call(this,_9cd);
switch(_9cd.type){
case CheckBoxBinding.ACTION_COMMAND:
this._showWarning(false);
this.dispatchAction(Binding.ACTION_VALID);
this.removeActionListener(CheckBoxBinding.ACTION_COMMAND);
break;
}
};
CheckBoxGroupBinding.newInstance=function(_9ce){
var _9cf=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkboxgroup",_9ce);
return UserInterface.registerBinding(_9cf,CheckBoxGroupBinding);
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
var _9d0=DialogControlBinding.newInstance(this.bindingDocument);
_9d0.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_9d0);
this._controlGroupBinding.attachRecursive();
var _9d1=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloonspeak",this.bindingDocument);
this.bindingElement.appendChild(_9d1);
var _9d2=this.getLabel();
if(_9d2!=null){
this.setLabel(_9d2);
}
};
BalloonBinding.prototype.onBindingDispose=function(){
BalloonBinding.superclass.onBindingDispose.call(this);
if(this._updateInterval){
window.clearInterval(this._updateInterval);
this._updateInterval=null;
}
var _9d3=this._snapTargetBinding;
if(Binding.exists(_9d3)==true){
_9d3.removeActionListener(Binding.ACTION_BLURRED,this);
_9d3.removeActionListener(Binding.ACTION_VALID,this);
}
};
BalloonBinding.prototype.snapTo=function(_9d4){
if(Interfaces.isImplemented(IData,_9d4)){
this._snapTargetBinding=_9d4;
var _9d5=_9d4.dispatchAction(BalloonBinding.ACTION_INITIALIZE);
if(_9d5&&_9d5.isConsumed){
this._environmentBinding=_9d5.listener;
}
if(this._environmentBinding){
_9d4.addActionListener(Binding.ACTION_BLURRED,this);
_9d4.addActionListener(Binding.ACTION_VALID,this);
this.subscribe(BroadcastMessages.VIEW_CLOSED);
var self=this;
this._updateInterval=window.setInterval(function(){
if(Binding.exists(_9d4)==true){
self._updatePosition();
}else{
self.dispose();
}
},BalloonBinding.TIMEOUT);
_9d4.dispatchAction(BalloonBinding.ACTION_SNAP);
}else{
throw "No environment fit for balloons!";
}
}
};
BalloonBinding.prototype._updatePosition=function(){
var _9d7=this._snapTargetBinding;
var _9d8=this._environmentBinding;
var root=UserInterface.getBinding(_9d7.bindingDocument.body);
if(Binding.exists(_9d7)&&Binding.exists(_9d8)){
if(!root.isActivated){
if(this.isVisible==true){
this.hide();
}
}else{
if(_9d7.isAttached&&_9d8.isAttached){
var _9da=_9d7.boxObject.getUniversalPosition();
var _9db=_9d8.boxObject.getUniversalPosition();
_9db.y+=_9d8.bindingElement.scrollTop;
_9db.x+=_9d8.bindingElement.scrollLeft;
var tDim=_9d7.boxObject.getDimension();
var eDim=_9d8.boxObject.getDimension();
var _9de=false;
if(_9da.y+tDim.h<_9db.y){
_9de=true;
}else{
if(_9da.x+tDim.w<_9db.x){
_9de=true;
}else{
if(_9da.y>_9db.y+eDim.h){
_9de=true;
}else{
if(_9da.x>_9db.x+eDim.w){
_9de=true;
}
}
}
}
if(!_9de){
this._setComputedPosition(_9da,_9db,tDim,eDim);
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
BalloonBinding.prototype._setComputedPosition=function(_9df,_9e0,tDim,eDim){
var wDim=WindowManager.getWindowDimensions();
var bDim=this._getDimension();
var _9e5=_9df;
var _9e6=false;
if(_9df.x+tDim.w+bDim.w+BalloonBinding.OFFSET_X>=wDim.w){
_9e6=true;
}else{
if(_9df.x+tDim.w>=_9e0.x+eDim.w){
_9e6=true;
}
}
if(_9e6){
_9e5.x-=(bDim.w+BalloonBinding.OFFSET_X);
this.attachClassName(BalloonBinding.CLASSNAME_LEFT);
}else{
_9e5.x+=tDim.w+BalloonBinding.OFFSET_X;
this.detachClassName(BalloonBinding.CLASSNAME_LEFT);
}
_9e5.y-=(bDim.h);
_9e5.y+=BalloonBinding.OFFSET_Y;
this._setPosition(_9e5);
};
BalloonBinding.prototype.handleBroadcast=function(_9e7,arg){
BalloonBinding.superclass.handleBroadcast.call(this,_9e7,arg);
switch(_9e7){
case BroadcastMessages.VIEW_CLOSED:
if(this._isAssociatedView(arg)==true){
this.dispose();
}
break;
}
};
BalloonBinding.prototype._isAssociatedView=function(_9e9){
var _9ea=false;
if(this._snapTargetBinding){
var view=this._snapTargetBinding.getAncestorBindingByType(ViewBinding,true);
if(view&&view.getHandle()==_9e9){
_9ea=true;
}
}
return _9ea;
};
BalloonBinding.prototype._setPosition=function(_9ec){
var _9ed=false;
var pos=this.boxObject.getLocalPosition();
if(this._point!=null){
if(pos.x!=this._point.x||pos.y!=this._point.y){
_9ed=true;
}
}
if(!_9ed){
this.bindingElement.style.left=_9ec.x+"px";
this.bindingElement.style.top=_9ec.y+"px";
this._point=_9ec;
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
BalloonBinding.prototype.handleAction=function(_9ef){
BalloonBinding.superclass.handleAction.call(this,_9ef);
var _9f0=_9ef.target;
switch(_9ef.type){
case Binding.ACTION_ACTIVATED:
if(this._snapTargetBinding){
this._snapTargetBinding.dispatchAction(Binding.ACTION_ACTIVATED);
_9ef.consume();
}
case Binding.ACTION_BLURRED:
case Binding.ACTION_VALID:
if(_9f0==this._snapTargetBinding){
var self=this;
setTimeout(function(){
if(!Binding.exists(_9f0)){
self.dispose();
}else{
if(_9f0.validate()){
var _9f2=true;
if(_9ef.type==Binding.ACTION_BLURRED){
var root=_9f0.bindingDocument.body;
var bind=UserInterface.getBinding(root);
if(!root.isActivated){
_9f2=false;
}
}
if(_9f2){
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
BalloonBinding.prototype.setLabel=function(_9f5){
if(this.isAttached==true){
if(!this._isTableIndexed){
this._indexTable();
}
var _9f6=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloontext",this.bindingDocument);
var text=this.bindingDocument.createTextNode(_9f5);
_9f6.appendChild(text);
this.shadowTree[MatrixBinding.CENTER].appendChild(_9f6);
}
this.setProperty("label",_9f5);
};
BalloonBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
BalloonBinding.newInstance=function(_9f8){
var _9f9=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloon",_9f8);
var _9fa=UserInterface.registerBinding(_9f9,BalloonBinding);
_9fa.hide();
return _9fa;
};
ErrorBinding.prototype=new Binding;
ErrorBinding.prototype.constructor=ErrorBinding;
ErrorBinding.superclass=Binding.prototype;
ErrorBinding.ACTION_INITIALIZE="error initialize";
ErrorBinding.presentError=function(_9fb,_9fc){
if(Interfaces.isImplemented(IData,_9fc)==true){
var _9fd,_9fe=_9fc.dispatchAction(ErrorBinding.ACTION_INITIALIZE);
if(_9fe&&_9fe.isConsumed){
switch(_9fe.listener.constructor){
case StageBinding:
_9fd=false;
break;
case StageDialogBinding:
_9fd=true;
break;
}
}
var _9ff=_9fd?top.app.bindingMap.dialogballoonset:top.app.bindingMap.balloonset;
var _a00=_9ff.add(BalloonBinding.newInstance(top.app.document));
_a00.setLabel(_9fb.text);
_a00.snapTo(_9fc);
_a00.attach();
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
var _a01=this.bindingWindow.DataManager;
var text=this.getProperty("text");
var name=this.getProperty("targetname");
var _a04=_a01.getDataBinding(name);
if(_a04){
ErrorBinding.presentError({text:text},_a04);
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
FocusBinding.focusElement=function(_a05){
var _a06=true;
try{
_a05.focus();
Application.focused(true);
}
catch(exception){
var _a07=UserInterface.getBinding(_a05);
var _a08=SystemLogger.getLogger("FocusBinding.focusElement");
_a08.warn("Could not focus "+(_a07?_a07.toString():String(_a05)));
_a06=false;
}
return _a06;
};
FocusBinding.focusedBinding=null;
FocusBinding.activeInstance=null;
FocusBinding.getCachedFocus=function(_a09){
var win=_a09.bindingWindow;
var id=_a09.bindingElement.id;
return {getBinding:function(){
var _a0c=null;
try{
if(Binding.exists(_a09)){
_a0c=win.bindingMap[id];
}
}
catch(exception){
}
return _a0c;
}};
};
FocusBinding.navigateNext=function(_a0d){
if(Binding.exists(FocusBinding.activeInstance)){
FocusBinding.activeInstance.focusNext(_a0d);
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
var _a0e=this.dispatchAction(FocusBinding.ACTION_ATTACHED);
if(_a0e&&_a0e.isConsumed){
if(_a0e.listener.isStrongFocusManager){
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
FocusBinding.prototype.handleAction=function(_a0f){
FocusBinding.superclass.handleAction.call(this,_a0f);
var _a10=_a0f.target;
var _a11=null;
if(this._isFocusManager){
switch(_a0f.type){
case FocusBinding.ACTION_ATTACHED:
if(_a10!=this){
this._isUpToDate=false;
}
_a0f.consume();
break;
case FocusBinding.ACTION_UPDATE:
if(_a10!=this){
this._isUpToDate=false;
_a0f.consume();
}
break;
case FocusBinding.ACTION_BLUR:
if(Application.isOperational){
_a11=new FocusCrawler();
_a11.mode=FocusCrawler.MODE_BLUR;
_a11.crawl(_a10.bindingElement);
if(this._cachedFocus!=null){
this._cachedFocus=null;
}
}
_a0f.consume();
break;
case FocusBinding.ACTION_FOCUS:
if(Application.isOperational&&_a10!=this){
_a11=new FocusCrawler();
_a11.mode=FocusCrawler.MODE_FOCUS;
_a11.crawl(_a10.bindingElement);
}
_a0f.consume();
break;
case Binding.ACTION_FOCUSED:
if(Interfaces.isImplemented(IFocusable,_a10)){
this.claimFocus();
this._onFocusableFocused(_a10);
}
_a0f.consume();
break;
case Binding.ACTION_BLURRED:
if(Interfaces.isImplemented(IFocusable,_a10)){
this._onFocusableBlurred(_a10);
}
_a0f.consume();
break;
}
}
};
FocusBinding.prototype.focusNext=function(_a12){
var _a13=null;
var list=this._getFocusableList();
if(list.reset().hasEntries()){
while(_a13==null&&list.hasNext()){
var _a15=list.getNext();
if(this._cachedFocus&&_a15==this._cachedFocus.getBinding()){
_a13=_a15;
}
}
if(_a13!=null){
if(_a15.isFocused){
var next=_a12?list.getPreceding(_a13):list.getFollowing(_a13);
if(!next){
next=_a12?list.getLast():list.getFirst();
}
next.focus();
}else{
_a13.focus();
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
var _a17=new FocusCrawler();
var list=new List();
_a17.mode=FocusCrawler.MODE_INDEX;
_a17.crawl(this.bindingElement,list);
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
var _a1b=this._cachedFocus.getBinding();
if(_a1b&&!_a1b.isFocused){
_a1b.focus();
}
}
};
FocusBinding.prototype._onFocusableFocused=function(_a1c){
if(_a1c!=FocusBinding.focusedBinding){
if(FocusBinding.focusedBinding!=null){
if(Binding.exists(FocusBinding.focusedBinding)){
FocusBinding.focusedBinding.blur();
}
}
FocusBinding.focusedBinding=_a1c;
_a1c.setProperty(FocusBinding.MARKER,true);
this._cachedFocus=FocusBinding.getCachedFocus(_a1c);
}
};
FocusBinding.prototype._onFocusableBlurred=function(_a1d){
_a1d.deleteProperty(FocusBinding.MARKER);
if(_a1d==FocusBinding.focusedBinding){
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
TabsButtonBinding.prototype.show=function(_a1f){
this.bindingElement.style.left=_a1f+"px";
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
TabsButtonBinding.prototype.registerHiddenTabBinding=function(_a20){
this.hiddenTabBindings.add(_a20);
};
TabsButtonBinding.prototype.fireCommand=function(){
if(this.isChecked&&!this.isPopulated){
this.hiddenTabBindings.reset();
while(this.hiddenTabBindings.hasNext()){
var _a21=this.hiddenTabBindings.getNext();
var item=MenuItemBinding.newInstance(this.popupBinding.bindingDocument);
item.setLabel(_a21.getLabel());
item.setImage(_a21.getImage());
item.associatedTabBinding=_a21;
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
TabsButtonBinding.prototype.handleAction=function(_a24){
TabsButtonBinding.superclass.handleAction.call(this,_a24);
switch(_a24.type){
case PopupBinding.ACTION_HIDE:
this.popupBinding.removeActionListener(PopupBinding.ACTION_HIDE,this);
var _a25=this.selectedTabBinding;
if(_a25){
this.containingTabBoxBinding.moveToOrdinalPosition(_a25,0);
this.containingTabBoxBinding.select(_a25);
}
_a24.consume();
break;
}
};
TabsButtonBinding.newInstance=function(_a26){
var _a27=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_a26);
_a27.setAttribute("type","checkbox");
_a27.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_a27.className="tabbutton";
return UserInterface.registerBinding(_a27,TabsButtonBinding);
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
var _a28=TabBoxBinding.currentActiveInstance;
if(_a28!=null&&Binding.exists(_a28)){
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
var _a29=this.getTabElements().getLength();
var _a2a=this.getTabPanelElements().getLength();
if(!this._tabsElement||!this._tabPanelsElement){
throw new Error(this.toString()+" DOM subtree invalid.");
}else{
if(_a29!=_a2a){
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
var _a2b=this.getTabPanelElements();
while(_a2b.hasNext()){
this._setupWarningSystem(UserInterface.getBinding(_a2b.getNext()));
}
if(this.isEqualSize){
this.enforceEqualSize();
this.dispatchAction(PageBinding.ACTION_UNBLOCK_INIT);
}
this.dispatchAction(TabBoxBinding.ACTION_ATTACHED);
TabBoxBinding.superclass.onBindingInitialize.call(this);
};
TabBoxBinding.prototype.buildDOMContent=function(){
var _a2c=DOMUtil.getOrdinalPosition(this._tabsElement);
var _a2d=DOMUtil.getOrdinalPosition(this._tabPanelsElement);
var _a2e=_a2c>_a2d?"tabsbelow":"tabsontop";
this.attachClassName(_a2e);
};
TabBoxBinding.prototype._TEMPNAME=function(){
var tabs=this.getTabElements();
var _a30=this.getTabPanelElements();
var _a31=null;
var _a32=this.getProperty("selectedindex");
if(_a32!=null){
if(_a32>tabs.getLength()-1){
throw "Selectedindex out of range";
}
}
if(tabs.hasEntries()){
var _a33=0;
while(tabs.hasNext()){
var tab=tabs.getNext();
var _a35=_a30.getNext();
this.registerTabBoxPair(tab,_a35);
if(_a32&&_a33==_a32){
tab.setAttribute("selected","true");
}else{
if(tab.getAttribute("selected")=="true"){
_a31=tab;
}
}
_a33++;
}
if(!_a31){
_a31=tabs.getFirst();
_a31.setAttribute("selected","true");
}
}
};
TabBoxBinding.prototype.enforceEqualSize=function(_a36){
var _a37=null;
var _a38=null;
if(this.isEqualSize){
var _a39=CSSComputer.getPadding(this._tabPanelsElement);
var max=0,_a3b=this.getTabPanelElements();
_a3b.each(function(_a3c){
max=_a3c.offsetHeight>max?_a3c.offsetHeight:max;
});
_a38=max+_a39.top+_a39.bottom;
if(_a36&&this._tabPanelsElement.style.height!=null){
_a37=this._tabPanelsElement.offsetHeight;
}
if(_a37!=null||_a38>_a37){
this._tabPanelsElement.style.height=_a38+"px";
}
}
};
TabBoxBinding.prototype._setupWarningSystem=function(_a3d){
_a3d._invalidCount=0;
_a3d.addActionListener(Binding.ACTION_INVALID,this);
_a3d.addActionListener(Binding.ACTION_VALID,this);
_a3d.addActionListener(BalloonBinding.ACTION_SNAP,this);
};
TabBoxBinding.prototype.handleAction=function(_a3e){
TabBoxBinding.superclass.handleAction.call(this,_a3e);
var _a3f=_a3e.target;
var _a40=_a3e.listener;
switch(_a3e.type){
case Binding.ACTION_ATTACHED:
break;
case Binding.ACTION_DETACHED:
if(_a3f.constructor==this._impl_tab){
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
_a3e.consume();
}
break;
case PageBinding.ACTION_INITIALIZED:
if(_a3f.isDialogSubPage&&this.isEqualSize){
this.enforceEqualSize();
}
break;
case Binding.ACTION_INVALID:
_a40._invalidCount++;
if(_a40._invalidCount==1){
var self=this;
setTimeout(function(){
if(!_a40.isSelected){
self._showWarning(_a40,true);
}
},0);
}
break;
case Binding.ACTION_VALID:
if(_a40._invalidCount>0){
_a40._invalidCount--;
if(_a40._invalidCount==0){
if(_a40.isSelected){
this._showWarning(_a40,false);
}
}
}
break;
case BalloonBinding.ACTION_SNAP:
this._showBalloon(_a40,true);
break;
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FOCUSED:
if(_a3e._tabboxstamp==null){
TabBoxBinding.currentActiveInstance=this;
_a3e._tabboxstamp="stamped";
}
break;
}
};
TabBoxBinding.prototype.handleEvent=function(e){
TabBoxBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.AFTERUPDATE:
var _a43=DOMEvents.getTarget(e);
if(_a43==this.bindingDocument.documentElement){
if(this._hasBastardUpdates){
this._hasBastardUpdates=false;
var tabs=this.getTabElements();
var _a45=this.getTabPanelElements();
tabs.each(function(tab,_a47){
if(tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY)==null){
var _a48=_a45.get(_a47);
this.registerTabBoxPair(tab,_a48);
}
},this);
var _a49=this._tabBoxPairs;
for(var key in _a49){
var tab=_a49[key].tab;
if(tab.parentNode==null){
this.unRegisterTabBoxPair(tab);
}
}
}
}else{
if(!this._hasBastardUpdates){
var name=DOMUtil.getLocalName(_a43);
switch(_a43.__updateType){
case Update.TYPE_INSERT:
switch(name){
case this._nodename_tab:
case this._nodename_tabpanel:
var _a4d=_a43.parentNode;
if(_a4d==this._tabsElement||_a4d==this._tabPanelsElement){
this._hasBastardUpdates=true;
}
break;
}
break;
case Update.TYPE_REMOVE:
switch(name){
case this._nodename_tabs:
case this._nodename_tabpanels:
if(_a43==this._tabsElement||_a43==this._tabPanelsElement){
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
TabBoxBinding.prototype.select=function(arg,_a4f){
var _a50=this.getBindingForArgument(arg);
if(_a50!=null&&!_a50.isSelected){
if(this._selectedTabBinding!=null){
this._selectedTabBinding.unselect();
this.getTabPanelBinding(this._selectedTabBinding).unselect();
}
this.dispatchAction(TabBoxBinding.ACTION_UNSELECTED);
_a50.select(_a4f);
this.getTabPanelBinding(_a50).select(_a4f);
var _a51=this.getProperty("selectedindex");
if(_a51!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_a50.bindingElement,true));
}
this._selectedTabBinding=_a50;
this.dispatchAction(TabBoxBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
if(_a50.getImage()==TabBoxBinding.BALLOON_TAB_IMAGE){
var _a52=this.getTabPanelBinding(_a50);
this._showBalloon(_a52,false);
}
}
};
TabBoxBinding.prototype.registerTabBoxPair=function(tab,_a54){
var key=KeyMaster.getUniqueKey();
tab.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
_a54.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
this._tabBoxPairs[key]={tab:tab,tabPanel:_a54};
};
TabBoxBinding.prototype.unRegisterTabBoxPair=function(tab){
var key=tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY);
delete this._tabBoxPairs[key];
};
TabBoxBinding.prototype.getTabPanelBinding=function(_a58){
var _a59=null;
try{
var key=_a58.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _a5b=this._tabBoxPairs[key].tabPanel;
_a59=UserInterface.getBinding(_a5b);
}
catch(exception){
this.logger.error(exception);
SystemDebug.stack(arguments);
}
return _a59;
};
TabBoxBinding.prototype.getTabBinding=function(_a5c){
var key=_a5c.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _a5e=this._tabBoxPairs[key].tab;
return UserInterface.getBinding(_a5e);
};
TabBoxBinding.prototype.summonTabBinding=function(){
return TabBinding.newInstance(this.bindingDocument);
};
TabBoxBinding.prototype.summonTabPanelBinding=function(){
var _a5f=this._impl_tabpanel.newInstance(this.bindingDocument);
this._setupWarningSystem(_a5f);
return _a5f;
};
TabBoxBinding.prototype.appendTabByBindings=function(_a60,_a61){
var _a62=_a60.bindingElement;
_a60.setProperty("selected",true);
var _a63=this.summonTabPanelBinding();
var _a64=_a63.bindingElement;
if(_a61){
_a64.appendChild(_a61 instanceof Binding?_a61.bindingElement:_a61);
}
this.registerTabBoxPair(_a62,_a64);
UserInterface.getBinding(this._tabsElement).add(_a60);
this._tabPanelsElement.appendChild(_a64);
_a60.attach();
UserInterface.getBinding(_a64).attachRecursive();
this.updateType=TabBoxBinding.UPDATE_ATTACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
return _a60;
};
TabBoxBinding.prototype.importTabBinding=function(_a65){
var that=_a65.containingTabBoxBinding;
var _a67=that.getTabPanelBinding(_a65);
var _a68=_a67.getBindingElement();
var _a69=_a65.getBindingElement();
that.dismissTabBinding(_a65);
this._tabsElement.appendChild(_a69);
this._tabPanelsElement.appendChild(_a68);
this.registerTabBoxPair(_a69,_a68);
_a65.containingTabBoxBinding=this;
this.select(_a65);
this.dispatchAction(Binding.ACTION_ACTIVATED);
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.removeTab=function(_a6a){
var _a6b=null;
if(_a6a.isSelected){
_a6b=this.getBestTab(_a6a);
this._selectedTabBinding=null;
}
var _a6c=this.getTabPanelBinding(_a6a);
this.unRegisterTabBoxPair(_a6a.bindingElement);
_a6a.dispose();
_a6c.dispose();
if(_a6b!=null){
this.select(_a6b);
}
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.dismissTabBinding=function(_a6d){
if(_a6d.isSelected){
this.selectBestTab(_a6d);
}
};
TabBoxBinding.prototype.selectBestTab=function(_a6e){
var _a6f=this.getBestTab(_a6e);
if(_a6f){
this.select(_a6f);
}else{
this._selectedTabBinding=null;
}
};
TabBoxBinding.prototype.getBestTab=function(_a70){
var _a71=null;
var _a72=_a70.getOrdinalPosition(true);
var _a73=this.getTabBindings();
var _a74=_a73.getLength();
var _a75=_a74-1;
if(_a74==1){
_a71=null;
}else{
if(_a72==_a75){
_a71=_a73.get(_a72-1);
}else{
_a71=_a73.get(_a72+1);
}
}
return _a71;
};
TabBoxBinding.prototype.moveToOrdinalPosition=function(_a76,_a77){
var _a78=this.bindingDocument.getElementById(_a76.bindingElement.id);
var tab=this.getTabElements().get(_a77);
this._tabsElement.insertBefore(_a78,tab);
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
var _a7a=this._nodename_tab;
var _a7b=new List(this._tabsElement.childNodes);
var _a7c=new List();
while(_a7b.hasNext()){
var _a7d=_a7b.getNext();
if(_a7d.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_a7d)==_a7a){
_a7c.add(_a7d);
}
}
return _a7c;
};
TabBoxBinding.prototype.getTabPanelElements=function(){
var _a7e=this._nodename_tabpanel;
var _a7f=new List(this._tabPanelsElement.childNodes);
var _a80=new List();
_a7f.each(function(_a81){
if(_a81.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_a81)==_a7e){
_a80.add(_a81);
}
});
return _a80;
};
TabBoxBinding.prototype.getTabsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabs);
};
TabBoxBinding.prototype.getTabPanelsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabpanels);
};
TabBoxBinding.prototype.getTabBindings=function(){
var _a82=new List();
var _a83=this.getTabElements();
_a83.each(function(_a84){
_a82.add(UserInterface.getBinding(_a84));
});
return _a82;
};
TabBoxBinding.prototype.getTabPanelBindings=function(){
var _a85=new List();
this.getTabPanelElements().each(function(_a86){
_a85.add(UserInterface.getBinding(_a86));
});
return _a85;
};
TabBoxBinding.prototype.getSelectedTabBinding=function(){
return this._selectedTabBinding;
};
TabBoxBinding.prototype.getSelectedTabPanelBinding=function(){
var _a87=null;
if(this._selectedTabBinding){
_a87=this.getTabPanelBinding(this._selectedTabBinding);
}
return _a87;
};
TabBoxBinding.prototype._showWarning=function(_a88,_a89){
var _a8a=this.getTabBinding(_a88);
if(_a89){
if(_a8a.labelBinding.hasImage){
_a8a._backupImage=_a8a.getImage();
}
_a8a.setImage(TabBoxBinding.INVALID_TAB_IMAGE);
}else{
if(_a8a._backupImage){
_a8a.setImage(_a8a._backupImage);
}else{
_a8a.setImage(false);
}
}
};
TabBoxBinding.prototype._showBalloon=function(_a8b,_a8c){
var _a8d=this.getTabBinding(_a8b);
if((_a8c&&!_a8d.isSelected)||!_a8c){
if(_a8d.getImage()!=TabBoxBinding.INVALID_TAB_IMAGE){
if(_a8c){
if(_a8d.labelBinding.hasImage){
_a8d._backupImage=_a8d.getImage();
}
_a8d.setImage(TabBoxBinding.BALLOON_TAB_IMAGE);
}else{
if(_a8d._backupImage!=null){
_a8d.setImage(_a8d._backupImage);
}else{
_a8d.setImage(false);
}
}
}
}
};
TabBoxBinding.prototype.advanceSelection=function(_a8e){
var tab=this.getSelectedTabBinding();
var tabs=this.getTabBindings();
var _a91=tab.getOrdinalPosition(true);
var next=null;
var _a93=new List();
tabs.each(function(t){
if(t.isVisible){
_a93.add(t);
}
});
if(_a93.getLength()>1){
if(_a91==0&&!_a8e){
next=_a93.getLast();
}else{
if(_a91==_a93.getLength()-1&&_a8e){
next=_a93.getFirst();
}else{
if(_a8e){
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
var _a96=this.constructor.TABBUTTON_IMPLEMENTATION;
this.tabsButtonBinding=_a96.newInstance(this.bindingDocument);
this.shadowTree.tabsButton=this.tabsButtonBinding;
this.add(this.tabsButtonBinding);
this.tabsButtonBinding.attach();
};
TabsBinding.prototype.handleAction=function(_a97){
TabsBinding.superclass.handleAction.call(this,_a97);
switch(_a97.type){
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
var _a9a=self.bindingElement.offsetWidth;
if(_a9a!=self._cachedOffsetWidth){
self.manage();
}
self._cachedOffsetWidth=_a9a;
}
}
setTimeout(manage,0);
}
};
TabsBinding.prototype.add=function(_a9b){
if(_a9b instanceof TabBinding){
if(this.tabsButtonBinding&&this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
return TabsBinding.superclass.add.call(this,_a9b);
};
TabsBinding.prototype.manage=function(){
if(Binding.exists(this)==true&&this.isVisible){
this.isManaging=true;
var _a9c=false;
var _a9d,tab,tabs=this.containingTabBoxBinding.getTabElements();
var _aa0=this.constructor.TABBUTTON_IMPLEMENTATION;
var _aa1=this.bindingElement.offsetWidth-_aa0.RESERVED_SPACE;
var _aa2=null;
var sum=0,_aa4=0;
var _aa5=true;
if(tabs.hasEntries()){
this.tabsButtonBinding.reset();
while(tabs.hasNext()&&_aa5){
tab=tabs.getNext();
_a9d=UserInterface.getBinding(tab);
if(!_aa2){
_aa2=_a9d;
}
sum+=tab.offsetWidth;
if(sum>=_aa1){
_a9c=true;
if(_a9d.isSelected){
if(!DOMUtil.isFirstElement(_a9d.bindingElement,true)){
this.isManaging=false;
if(_aa2){
_aa2.hide();
if(this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
this.containingTabBoxBinding.moveToOrdinalPosition(_a9d,_aa4-1);
_aa5=false;
}
}else{
_a9d.hide();
this.tabsButtonBinding.registerHiddenTabBinding(_a9d);
}
}else{
_a9d.show();
_aa2=_a9d;
_aa4++;
}
}
if(_aa5){
if(_a9c&&this.tabsButtonBinding.hiddenTabBindings.hasEntries()){
var _aa6=_aa2.getBindingElement();
var _aa7=_aa6.offsetLeft+_aa6.offsetWidth;
var _aa8=this.tabsButtonBinding;
setTimeout(function(){
_aa8.show(_aa7+4);
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
var _aa9=TabBinding.superclass.serialize.call(this);
if(_aa9){
_aa9.label=this.getLabel();
_aa9.image=this.getImage();
_aa9.tooltip=this.getToolTip();
}
return _aa9;
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
var _aaa=this.bindingElement.getAttribute("image");
var _aab=this.bindingElement.getAttribute("label");
var _aac=this.bindingElement.getAttribute("tooltip");
this.bindingElement.className="default";
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.shadowTree.labelBinding=this.labelBinding;
this.labelBinding.attachClassName("tablabel");
this.add(this.labelBinding);
if(_aab){
this.setLabel(_aab);
}
if(_aaa){
this.setImage(_aaa);
}
if(_aac){
this.setToolTip(_aac);
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
TabBinding.prototype.setLabel=function(_aae){
if(_aae!=null){
this.setProperty("label",_aae);
if(this.isAttached){
this.labelBinding.setLabel(_aae);
}
}
};
TabBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
TabBinding.prototype.setToolTip=function(_aaf){
if(_aaf){
this.setProperty("tooltip",_aaf);
if(this.isAttached){
this.labelBinding.setToolTip(_aaf);
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
var _ab1=false;
if(Client.isMozilla==true){
}
if(!_ab1){
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
TabBinding.prototype.select=function(_ab2){
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
TabBinding.newInstance=function(_ab3){
var _ab4=DOMUtil.createElementNS(Constants.NS_UI,"ui:tab",_ab3);
return UserInterface.registerBinding(_ab4,TabBinding);
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
var _ab5=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(dim2==null||!Dimension.isEqual(dim1,dim2)){
_ab5=true;
this._lastKnownDimension=dim1;
}
return _ab5;
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
TabPanelBinding.prototype.select=function(_ab8){
if(!this.isSelected){
if(this.isLazy){
this.wakeUp("select");
}else{
this.isSelected=true;
this.isVisible=true;
this.bindingElement.style.position="static";
this._invokeManagedRecursiveFlex();
if(_ab8!=true){
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
TabPanelBinding.prototype.handleAction=function(_ab9){
TabPanelBinding.superclass.handleAction.call(this,_ab9);
var _aba=_ab9.target;
switch(_ab9.type){
case BalloonBinding.ACTION_INITIALIZE:
_ab9.consume();
break;
}
};
TabPanelBinding.newInstance=function(_abb){
var _abc=DOMUtil.createElementNS(Constants.NS_UI,"ui:tabpanel",_abb);
UserInterface.registerBinding(_abc,TabPanelBinding);
return UserInterface.getBinding(_abc);
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
var _abd=SplitBoxBinding.superclass.serialize.call(this);
if(_abd){
_abd.orient=this.getOrient();
_abd.layout=this.getLayout();
}
return _abd;
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
var _abe=this.getSplitPanelElements();
if(_abe.hasEntries()){
var _abf=new List(this.getLayout().split(":"));
if(_abf.getLength()!=_abe.getLength()){
throw new Error(this+" DOM subree invalid");
}else{
_abe.each(function(_ac0){
_ac0.setAttribute("ratio",_abf.getNext());
});
}
}
this.isLayoutInitialized=true;
};
SplitBoxBinding.prototype._initializeOrient=function(){
var _ac1=this.getProperty("orient");
if(_ac1){
this._orient=_ac1;
}
this.attachClassName(this._orient);
};
SplitBoxBinding.prototype._initializeSplitters=function(){
var _ac2=this.getSplitterBindings();
while(_ac2.hasNext()){
var _ac3=_ac2.getNext();
if(_ac3&&_ac3.getProperty("collapsed")==true){
_ac3.collapse();
}
}
};
SplitBoxBinding.prototype.handleAction=function(_ac4){
SplitBoxBinding.superclass.handleAction.call(this,_ac4);
switch(_ac4.type){
case SplitterBinding.ACTION_DRAGGED:
this.refreshLayout();
_ac4.consume();
break;
case SplitterBinding.ACTION_COLLAPSE:
this.collapse(_ac4.target);
_ac4.consume();
break;
case SplitterBinding.ACTION_UNCOLLAPSE:
this.unCollapse(_ac4.target);
_ac4.consume();
break;
}
};
SplitBoxBinding.prototype.flex=function(){
SplitBoxBinding.superclass.flex.call(this);
if(this.isAttached==true){
this.invokeLayout(true);
}
};
SplitBoxBinding.prototype.collapse=function(_ac5){
this._getSplitPanelBindingForSplitter(_ac5).collapse();
this.invokeLayout();
};
SplitBoxBinding.prototype.unCollapse=function(_ac6){
this._getSplitPanelBindingForSplitter(_ac6).unCollapse();
this.invokeLayout();
};
SplitBoxBinding.prototype._getSplitPanelBindingForSplitter=function(_ac7){
var _ac8=DOMUtil.getOrdinalPosition(_ac7.bindingElement,true);
var _ac9,_aca=this.getSplitPanelElements();
switch(_ac7.getCollapseDirection()){
case SplitterBinding.COLLAPSE_BEFORE:
_ac9=_aca.get(_ac8);
break;
case SplitterBinding.COLLAPSE_AFTER:
_ac9=_aca.get(_ac8+1);
break;
}
return UserInterface.getBinding(_ac9);
};
SplitBoxBinding.prototype.invokeLayout=function(_acb){
var _acc=this.isHorizontalOrient();
var _acd=this.getSplitPanelBindings();
var _ace=this.getSplitterBindings();
var _acf=new List();
var _ad0,sum=0;
var _ad2=0;
_acd.each(function(_ad3){
if(_ad3.isFixed==true){
if(!_acd.hasNext()){
_ad2+=_ad3.getFix();
}
_acf.add(0);
sum+=0;
}else{
_ad0=_ad3.getRatio();
_acf.add(_ad0);
sum+=_ad0;
}
});
if(sum==0){
this.logger.warn("Division by zero was hacked");
sum=1;
}
if(_acf.getLength()!=_acd.getLength()){
throw new Error(this+" Invalid property (ratio)");
}else{
var _ad4=_acc?this.getWidth():this.getHeight();
_ad4-=_ad2;
_ace.each(function(_ad5){
if(_ad5.isVisible){
_ad4-=SplitterBinding.DIMENSION;
}
});
var unit=_ad4/sum;
var _ad7=0;
var self=this;
_acd.each(function(_ad9){
var span=0;
var _adb=_acf.getNext();
if(_ad9.isFixed){
span=_ad9.getFix();
}else{
span=Math.round(unit*_adb);
if(isNaN(span)){
alert("isNaN ( span ) ["+this.getProperty("layout")+"]");
}
}
_ad7+=span;
while(_ad7>_ad4){
_ad7--;
span--;
}
if(!_ad9.isFixed){
if(_acc){
_ad9.setWidth(span);
}else{
_ad9.setHeight(span);
}
}
});
}
if(_acb!=true){
this.reflex();
}
if(this._persist&&this._persist.layout){
var _adc=this.getLayout();
if(_adc){
this.setProperty("layout",_adc);
}
}
};
SplitBoxBinding.prototype.computeLayout=function(){
var _add=this.isHorizontalOrient();
var _ade=this.getSplitPanelBindings();
var _adf=this.getSplitterBindings();
var _ae0=null;
var _ae1=null;
var unit=null;
var _ae3=null;
var span=null;
_ade.each(function(_ae5){
if(!unit){
unit=_add?_ae5.getWidth():_ae5.getHeight();
}
span=_add?_ae5.getWidth():_ae5.getHeight();
if(_ae3){
span-=_ae3;
_ae3=null;
}
_ae0=_adf.getNext();
if(_ae0&&_ae0.offset){
_ae3=_ae0.offset;
span+=_ae3;
}
_ae5.setRatio(span/unit);
});
};
SplitBoxBinding.prototype.refreshLayout=function(){
this.computeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.setLayout=function(_ae6){
this.logger.debug(_ae6);
this.setProperty("layout",_ae6);
this._initializeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.getLayout=function(){
if(!this.isLayoutInitialized){
if(!this.getProperty("layout")){
this.setProperty("layout",this.getDefaultLayout());
}
}else{
var _ae7="",_ae8=this.getSplitPanelBindings();
_ae8.each(function(_ae9){
_ae7+=_ae9.getRatio().toString();
_ae7+=_ae8.hasNext()?":":"";
});
this.setProperty("layout",_ae7);
}
return new String(this.getProperty("layout"));
};
SplitBoxBinding.prototype.getDefaultLayout=function(){
var _aea=this.getSplitPanelElements();
_aea.each(function(_aeb){
layout+="1"+(_aea.hasNext()?":":"");
});
this.setProperty("layout",layout);
};
SplitBoxBinding.prototype.setWidth=function(_aec){
this.bindingElement.style.width=_aec+"px";
};
SplitBoxBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
SplitBoxBinding.prototype.setHeight=function(_aed){
this.bindingElement.style.height=_aed+"px";
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
SplitBoxBinding.prototype.fit=function(_aee){
if(!this.isFit||_aee){
if(this.isHorizontalOrient()){
var max=0;
var _af0=this.getSplitPanelBindings();
_af0.each(function(_af1){
var _af2=_af1.bindingElement.offsetHeight;
max=_af2>max?_af2:max;
});
this._setFitnessHeight(max);
}else{
throw "SplitBoxBinding enforceFitness not supported vertically!";
}
this.isFit=true;
}
};
SplitBoxBinding.newInstance=function(_af3){
var _af4=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitbox",_af3);
return UserInterface.registerBinding(_af4,SplitBoxBinding);
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
var _af7=this.getProperty("hidden");
if(_af7){
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
var _af8=this.getProperty("ratiocache");
if(_af8){
this.setRatio(_af8);
this.deleteProperty("ratiocache");
}else{
this._containingSplitBoxBinding.computeLayout();
}
this.bindingElement.style.display="block";
this.deleteProperty("hidden");
this.isVisible=true;
}
};
SplitPanelBinding.prototype.setWidth=function(_af9){
if(!this.isFixed){
if(_af9!=this.getWidth()){
if(_af9<0){
_af9=this.getWidth();
this.logger.warn("SplitPanelBinding#setWidth bug in Internet Explorer!");
}
try{
this.bindingElement.style.width=_af9+"px";
}
catch(exception){
alert("SplitPanelBinding#setWidth: Occult width: "+_af9);
alert(arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getWidth=function(){
var _afa=null;
if(this.isFixed){
_afa=this.getFix();
}else{
_afa=this.bindingElement.offsetWidth;
}
return _afa;
};
SplitPanelBinding.prototype.setHeight=function(_afb){
if(!this.isFixed){
if(_afb!=this.getHeight()){
try{
this.bindingElement.style.height=_afb+"px";
}
catch(exception){
alert("SplitPanelBinding.prototype.setHeight"+arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getHeight=function(){
var _afc=null;
if(this.isFixed){
_afc=this.getFix();
}else{
_afc=this.bindingElement.offsetHeight;
}
return _afc;
};
SplitPanelBinding.prototype.setRatio=function(_afd){
this.setProperty("ratio",_afd);
};
SplitPanelBinding.prototype.getRatio=function(){
return this.getProperty("ratio");
};
SplitPanelBinding.prototype.setFix=function(_afe){
if(_afe){
this._fixedSpan=_afe;
switch(this._containingSplitBoxBinding.getOrient()){
case SplitBoxBinding.ORIENT_HORIZONTAL:
this.logger.warn("Fix not properly supported on horizontal splitboxes!");
this.setWidth(_afe);
break;
case SplitBoxBinding.ORIENT_VERTICAL:
this.setHeight(_afe);
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
SplitPanelBinding.newInstance=function(_aff){
var _b00=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitpanel",_aff);
return UserInterface.registerBinding(_b00,SplitPanelBinding);
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
var _b01=SplitBoxBinding.superclass.serialize.call(this);
if(_b01){
_b01.collapse=this.getProperty("collapse");
_b01.collapsed=this.getProperty("collapsed");
_b01.disabled=this.getProperty("isdisabled");
}
return _b01;
};
SplitterBinding.prototype.onBindingAttach=function(){
SplitterBinding.superclass.onBindingAttach.call(this);
this.addActionListener(Binding.ACTION_DRAG);
this._containingSplitBoxBinding=this.getAncestorBindingByLocalName("splitbox");
this.attachClassName(this._containingSplitBoxBinding.getOrient());
this._collapseDirection=this.getProperty("collapse");
this.buildDOMContent();
this.attachDOMEvents();
var _b02=this.getProperty("hidden");
if(_b02){
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
SplitterBinding.prototype.setCollapseDirection=function(_b04){
this.setProperty("collapse",_b04);
this._collapseDirection=_b04;
};
SplitterBinding.prototype.handleAction=function(_b05){
SplitterBinding.superclass.handleAction.call(this,_b05);
switch(_b05.type){
case Binding.ACTION_DRAG:
this.dragger.registerHandler(this);
_b05.consume();
break;
}
};
SplitterBinding.prototype.handleEvent=function(e){
SplitterBinding.superclass.handleEvent.call(this,e);
var _b07=this;
if(!this.isDragging&&!this.isDisabled){
switch(e.type){
case DOMEvents.MOUSEOVER:
window.splitterTimeout=window.setTimeout(function(){
_b07.shadowTree.splitterBody.className=SplitterBinding.CLASSNAME_HOVER;
},250);
break;
case DOMEvents.MOUSEOUT:
if(window.splitterTimeout){
window.clearTimeout(window.splitterTimeout);
}
if(_b07.shadowTree.splitterBody.className==SplitterBinding.CLASSNAME_HOVER){
this.shadowTree.splitterBody.className="";
}
break;
}
}
};
SplitterBinding.prototype.onDragStart=function(_b08){
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
SplitterBinding.newInstance=function(_b13){
var _b14=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitter",_b13);
return UserInterface.registerBinding(_b14,SplitterBinding);
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
var _b15=this.getProperty("selectedindex");
var _b16=this.getDeckElements();
if(_b16.hasEntries()){
var _b17=false;
var _b18=0;
while(_b16.hasNext()){
var deck=_b16.getNext();
if(_b15&&_b18==_b15){
deck.setAttribute("selected","true");
_b17=true;
}else{
if(deck.getAttribute("selected")=="true"){
_b17=true;
}
}
_b18++;
}
if(!_b17){
_b16.getFirst().setAttribute("selected","true");
}
}
};
DecksBinding.prototype.getDeckElements=function(){
return this.getChildElementsByLocalName(this.constructor.NODENAME_DECK);
};
DecksBinding.prototype.select=function(arg){
var _b1b=this.getBindingForArgument(arg);
if(_b1b!=null){
if(_b1b!=this._selectedDeckBinding){
if(this._selectedDeckBinding){
this._selectedDeckBinding.unselect();
}
_b1b.select();
this._selectedDeckBinding=_b1b;
var _b1c=this.getProperty("selectedindex");
if(_b1c!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_b1b.bindingElement,true));
}
this.dispatchAction(DecksBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
}else{
throw "No deck for argument "+arg;
}
};
DecksBinding.prototype.hasDimensionsChanged=function(){
var _b1d=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(!Dimension.isEqual(dim1,dim2)){
_b1d=true;
this._lastKnownDimension=dim1;
}
return _b1d;
};
DecksBinding.prototype.getSelectedDeckBinding=function(){
return this._selectedDeckBinding;
};
DecksBinding.newInstance=function(_b20){
var _b21=DOMUtil.createElementNS(Constants.NS_UI,"ui:decks",_b20);
return UserInterface.registerBinding(_b21,DecksBinding);
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
DeckBinding.prototype.handleAction=function(_b22){
DeckBinding.superclass.handleAction.call(this,_b22);
var _b23=_b22.target;
switch(_b22.type){
case BalloonBinding.ACTION_INITIALIZE:
_b22.consume();
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
DeckBinding.newInstance=function(_b25){
var _b26=DOMUtil.createElementNS(Constants.NS_UI,"ui:deck",_b25);
return UserInterface.registerBinding(_b26,DeckBinding);
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
ToolBarBinding.prototype.onMemberInitialize=function(_b27){
if(_b27 instanceof ToolBarBodyBinding){
if(_b27.isRightAligned){
if(!this._toolBarBodyRight){
this._toolBarBodyRight=_b27;
}
}else{
if(!this._toolBarBodyLeft){
this._toolBarBodyLeft=_b27;
}
}
}
ToolBarBinding.superclass.onMemberInitialize.call(this,_b27);
};
ToolBarBinding.prototype.parseDOMProperties=function(){
var _b28=this.getProperty("imagesize");
var type=this.getProperty("type");
if(_b28){
this.setImageSize(_b28);
}
if(type){
this.setType(type);
}else{
this.setType(this.type);
}
};
ToolBarBinding.prototype.buildDOMContent=function(){
if(this._hasDefaultContent==true&&!this._hasDOMContent){
var _b2a=ToolBarGroupBinding.newInstance(this.bindingDocument);
_b2a.add(ToolBarButtonBinding.newInstance(this.bindingDocument));
_b2a.isDefaultContent=true;
this.add(_b2a);
_b2a.attachRecursive();
this._hasDOMContent=true;
}
};
ToolBarBinding.prototype.flex=function(){
var left=this._toolBarBodyLeft;
var _b2c=this._toolBarBodyRight;
if(left!=null&&left.hasClassName("max")){
this._maxToolBarGroup(left,_b2c);
}
if(_b2c!=null&&_b2c.hasClassName("max")){
this._maxToolBarGroup(_b2c,left);
}
};
ToolBarBinding.prototype._maxToolBarGroup=function(max,_b2e){
var _b2f=this.boxObject.getDimension().w;
var _b30=CSSComputer.getPadding(this.bindingElement);
_b2f-=(_b30.left+_b30.right);
if(_b2e!=null){
_b2f-=_b2e.boxObject.getDimension().w;
if(!Client.isWindows){
_b2f-=1;
}
if(Client.isExplorer){
_b2f-=15;
}
}
max.bindingElement.style.width=_b2f+"px";
};
ToolBarBinding.prototype.getToolBarGroupByIndex=function(_b31){
return this.getDescendantBindingsByLocalName("toolbargroup").get(_b31);
};
ToolBarBinding.prototype.addLeft=function(_b32,_b33){
var _b34=null;
if(this._toolBarBodyLeft!=null){
_b34=this._toolBarBodyLeft.add(_b32,_b33);
}else{
throw new Error("No left toolbarbody");
}
return _b34;
};
ToolBarBinding.prototype.addLeftFirst=function(_b35,_b36){
var _b37=null;
if(this._toolBarBodyLeft){
_b37=this._toolBarBodyLeft.addFirst(_b35,_b36);
}else{
throw new Error("No left toolbarbody");
}
return _b37;
};
ToolBarBinding.prototype.addRight=function(_b38){
var _b39=null;
if(this._toolBarBodyRight){
_b39=this._toolBarBodyRight.add(_b38);
}else{
throw new Error("No left toolbarbody");
}
return _b39;
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
ToolBarBinding.newInstance=function(_b3c){
var _b3d=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_b3c);
return UserInterface.registerBinding(_b3d,ToolBarBinding);
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
var _b3e=this.getDescendantBindingsByLocalName("toolbargroup");
var _b3f=new List();
var _b40=true;
_b3e.each(function(_b41){
if(_b41.isVisible&&!_b41.isDefaultContent){
_b3f.add(_b41);
}
});
while(_b3f.hasNext()){
var _b42=_b3f.getNext();
_b42.setLayout(ToolBarGroupBinding.LAYOUT_DEFAULT);
if(_b40){
_b42.setLayout(ToolBarGroupBinding.LAYOUT_FIRST);
_b40=false;
}
if(!_b3f.hasNext()){
_b42.setLayout(ToolBarGroupBinding.LAYOUT_LAST);
}
}
if(this.getProperty("equalsize")){
this.enforceEqualSize();
}
};
ToolBarBodyBinding.prototype.enforceEqualSize=function(){
var max=0,list=this.getDescendantBindingsByLocalName("clickbutton");
while(list.hasNext()){
var _b45=list.getNext();
var _b46=_b45.getEqualSizeWidth();
if(_b46>max){
max=_b46;
}
}
if(max!=0){
list.reset();
while(list.hasNext()){
var _b45=list.getNext();
_b45.setEqualSizeWidth(max);
}
}
};
ToolBarBodyBinding.prototype.empty=function(){
this.detachRecursive();
this.bindingElement.innerHTML="";
};
ToolBarBodyBinding.prototype.add=function(_b47,_b48){
var _b49=ToolBarBinding.superclass.add.call(this,_b47);
if(!_b48){
if(_b47 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _b49;
};
ToolBarBodyBinding.prototype.addFirst=function(_b4a,_b4b){
var _b4c=ToolBarBinding.superclass.addFirst.call(this,_b4a);
if(!_b4b){
if(_b4a instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _b4c;
};
ToolBarBodyBinding.newInstance=function(_b4d){
var _b4e=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbody",_b4d);
return UserInterface.registerBinding(_b4e,ToolBarBodyBinding);
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
ToolBarGroupBinding.prototype.setLayout=function(_b4f){
switch(_b4f){
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
var _b50=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_b50)=="toolbarbody"){
UserInterface.getBinding(_b50).refreshToolBarGroups();
}
};
ToolBarGroupBinding.prototype.hide=function(){
ToolBarGroupBinding.superclass.hide.call(this);
var _b51=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_b51)=="toolbarbody"){
UserInterface.getBinding(_b51).refreshToolBarGroups();
}
};
ToolBarGroupBinding.newInstance=function(_b52){
var _b53=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbargroup",_b52);
return UserInterface.registerBinding(_b53,ToolBarGroupBinding);
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
ToolBarButtonBinding.newInstance=function(_b54){
var _b55=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_b54);
return UserInterface.registerBinding(_b55,ToolBarButtonBinding);
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
var _b56=this.getProperty("label");
var _b57=this.getProperty("image");
if(_b56){
this.setLabel(_b56);
}
if(_b57){
this.setImage(_b57);
}
};
ToolBarLabelBinding.prototype.setLabel=function(_b58,_b59){
if(this.isAttached){
this._labelBinding.setLabel(_b58,_b59);
}
this.setProperty("label",_b58);
};
ToolBarLabelBinding.prototype.setImage=function(_b5a,_b5b){
if(this.isAttached){
this._labelBinding.setImage(_b5a,_b5b);
}
this.setProperty("image",_b5a);
};
ToolBarLabelBinding.newInstance=function(_b5c){
var _b5d=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarlabel",_b5c);
return UserInterface.registerBinding(_b5d,ToolBarLabelBinding);
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
var _b5e=this.getDescendantBindingsByLocalName("clickbutton");
if(_b5e.hasEntries()){
while(_b5e.hasNext()){
var _b5f=_b5e.getNext();
if(_b5f.isDefault){
this._defaultButton=_b5f;
_b5f.attachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
if(!this._isListening&&_b5f.isFocusable){
this.subscribe(BroadcastMessages.KEY_ENTER);
this._isListening=true;
}
}
this._buttons=_b5e;
}
};
DialogToolBarBinding.prototype.handleBroadcast=function(_b60,arg){
DialogToolBarBinding.superclass.handleBroadcast.call(this,_b60,arg);
switch(_b60){
case BroadcastMessages.KEY_ENTER:
if(!PopupBinding.hasActiveInstances()&&!EditorBinding.isActive){
if(Binding.exists(this)){
var _b62=this.getAncestorBindingByType(DialogBinding,true);
if(_b62!=null&&_b62.isActive){
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
DialogToolBarBinding.prototype.handleAction=function(_b63){
DialogToolBarBinding.superclass.handleAction.call(this,_b63);
var _b64=_b63.target;
var _b65=false;
var _b66=this._buttons.reset();
if(_b64 instanceof ClickButtonBinding){
switch(_b63.type){
case Binding.ACTION_FOCUSED:
_b64.attachClassName(ButtonBinding.CLASSNAME_FOCUSED);
this._focusedButton=_b64;
if(this._defaultButton){
this._defaultButton.detachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
break;
case Binding.ACTION_BLURRED:
_b64.detachClassName(ButtonBinding.CLASSNAME_FOCUSED);
break;
}
}
if(this._defaultButton){
while(!_b65&&_b66.hasNext()){
var _b67=_b66.getNext();
_b65=_b67.isFocused;
}
if(!_b65){
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
var _b68=this._views;
for(var _b69 in ViewDefinitions){
var def=ViewDefinitions[_b69];
var key=def.perspective;
if(key!=null){
if(!_b68.has(key)){
_b68.set(key,new List());
}
var list=_b68.get(key);
list.add(def);
}
}
}else{
this.hide();
}
};
ToolBoxToolBarButtonBinding.prototype.handleBroadcast=function(_b6d,arg){
ToolBoxToolBarButtonBinding.superclass.handleBroadcast.call(this,_b6d,arg);
switch(_b6d){
case BroadcastMessages.PERSPECTIVE_CHANGED:
var tag=arg;
if(this._views.has(tag)){
if(tag!=this._lastGeneratedPerspective){
this._lastGeneratedPerspective=tag;
var list=this._views.get(tag);
var _b71=this.bindingWindow.bindingMap.toolboxpopup;
_b71.empty();
list.each(function(def){
var item=_b71.add(StageViewMenuItemBinding.newInstance(_b71.bindingDocument));
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
TreeBinding.grid=function(_b74){
var _b75=TreeNodeBinding.HEIGHT;
var ceil=Math.ceil(_b74);
var _b77=_b74%_b75;
if(_b77>0){
_b74=_b74-_b77+_b75;
}
return _b74+TreeBodyBinding.PADDING_TOP;
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
var _b78=this.getProperty("focusable");
if(_b78!=null){
this._isFocusable=_b78;
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
var _b7a=this.getProperty("builder");
if(_b7a){
this._buildFromTextArea(_b7a);
}else{
if(this._treeNodeBuffer.hasEntries()){
while(this._treeNodeBuffer.hasNext()){
this.add(this._treeNodeBuffer.getNext());
}
}
}
};
TreeBinding.prototype._setupTreeSelection=function(){
var _b7b=this.getProperty("selectable");
var _b7c=this.getProperty("selectionproperty");
var _b7d=this.getProperty("selectionvalue");
if(_b7b){
this.setSelectable(true);
if(_b7c){
this.setSelectionProperty(_b7c);
}
if(_b7d){
this.setSelectionValue(_b7d);
}
}
this._positionIndicatorBinding=this.add(TreePositionIndicatorBinding.newInstance(this.bindingDocument));
this.shadowTree.positionIndicator=this._positionIndicatorBinding;
this._positionIndicatorBinding.attach();
};
TreeBinding.prototype._buildFromTextArea=function(id){
var area=this.bindingDocument.getElementById(id);
if(area!=null){
var _b80=UserInterface.getBinding(area);
var _b81=this._treeBodyBinding;
function build(){
_b81.subTreeFromString(area.value);
}
_b80.addActionListener(Binding.ACTION_UPDATED,{handleAction:function(){
build();
}});
setTimeout(build,0);
}
};
TreeBinding.prototype.registerTreeNodeBinding=function(_b82){
var _b83=_b82.getHandle();
if(this._treeNodeBindings.has(_b83)){
throw "Duplicate treenodehandles registered: "+_b82.getLabel();
}else{
this._treeNodeBindings.set(_b83,_b82);
var map=this._openTreeNodesBackupMap;
if(map!=null&&map.has(_b83)){
_b82.open();
}
}
};
TreeBinding.prototype.unRegisterTreeNodeBinding=function(_b85){
this._treeNodeBindings.del(_b85.getHandle());
};
TreeBinding.prototype.getTreeNodeBindingByHandle=function(_b86){
var _b87=null;
if(this._treeNodeBindings.has(_b86)){
_b87=this._treeNodeBindings.get(_b86);
}else{
throw "No such treenode: "+_b86;
}
return _b87;
};
TreeBinding.prototype.handleAction=function(_b88){
TreeBinding.superclass.handleAction.call(this,_b88);
var _b89=_b88.target;
switch(_b88.type){
case TreeNodeBinding.ACTION_OPEN:
_b88.consume();
break;
case TreeNodeBinding.ACTION_CLOSE:
this._blurDescendantBindings(_b89);
_b88.consume();
break;
case TreeNodeBinding.ACTION_ONFOCUS:
this._nodePrimary=_b89;
this.focusSingleTreeNodeBinding(_b89);
if(!this.isFocused){
this.focus();
}
_b88.consume();
break;
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
switch(this._selectionType){
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodePrimary=_b89;
this.focusSingleTreeNodeBinding(_b89);
break;
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodeSecondary=_b89;
if(!this._nodePrimary||this._nodeSecondary==this._nodePrimary){
this._nodePrimary=_b89;
this.focusSingleTreeNodeBinding(_b89);
}else{
this.focusMultipeTreeNodeBindings(this._getVisibleTreeNodeBindingsInRange(this._nodePrimary,this._nodeSecondary));
}
break;
}
if(!this.isFocused){
this.focus();
}
_b88.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
if(_b89.isFocused){
this.blurSelectedTreeNodes();
}
_b88.consume();
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
TreeBinding.prototype._getVisibleTreeNodeBindingsInRange=function(_b8a,_b8b){
alert("TreeBinding#_getVisibleTreeNodeBindingsInRange");
};
TreeBinding.prototype.focusSingleTreeNodeBinding=function(_b8c){
if(_b8c!=null&&!_b8c.isFocused){
this.blurSelectedTreeNodes();
this._focusedTreeNodeBindings.add(_b8c);
_b8c.invokeManagedFocus();
if(this._isSelectable){
this._manageSelections();
}
}
};
TreeBinding.prototype.focusMultipeTreeNodeBindings=function(_b8d){
this.blurSelectedTreeNodes();
while(_b8d.hasNext()){
var _b8e=_b8d.getNext();
this._focusedTreeNodeBindings.add(_b8e);
_b8e.invokeManagedFocus();
}
if(this._isSelectable){
this._manageSelections();
}
};
TreeBinding.prototype._manageSelections=function(){
var _b8f=this._selectedTreeNodeBindings;
this._selectedTreeNodeBindings={};
var _b90=false;
var _b91=null;
this._focusedTreeNodeBindings.reset();
while(this._focusedTreeNodeBindings.hasNext()){
var _b92=this._focusedTreeNodeBindings.getNext();
var _b93=_b92.getProperty(this._selectionProperty);
if(_b93!=null){
if(!this._selectionValue||this._selectionValue[_b93]){
_b91=(this._selectedTreeNodeBindings[_b92.key]=_b92);
var _b94=_b8f[_b92.key];
if(!_b94||_b94!=_b91){
_b90=true;
}
}
}
}
if(_b91){
if(_b90){
this.dispatchAction(TreeBinding.ACTION_SELECTIONCHANGED);
}
}else{
if(_b8f){
for(var key in _b8f){
this.dispatchAction(TreeBinding.ACTION_NOSELECTION);
break;
}
}
}
};
TreeBinding.prototype.getSelectedTreeNodeBindings=function(){
var _b96=new List();
for(var key in this._selectedTreeNodeBindings){
_b96.add(this._selectedTreeNodeBindings[key]);
}
return _b96;
};
TreeBinding.prototype.blurSelectedTreeNodes=function(){
this._focusedTreeNodeBindings.reset().each(function(_b98){
_b98.blur();
});
this._focusedTreeNodeBindings.clear();
};
TreeBinding.prototype._blurDescendantBindings=function(_b99){
var _b9a=_b99.getDescendantBindingsByLocalName("treenode");
var _b9b=true;
var self=this;
_b9a.each(function(desc){
if(desc.isFocused){
desc.blur();
self._focusedTreeNodeBindings.del(self._focusedTreeNodeBindings.getIndex(desc));
}
return _b9b;
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
var _b9e=this._treeBodyBinding.getChildBindingByLocalName("treenode");
if(_b9e!=null){
this.focusSingleTreeNodeBinding(_b9e);
_b9e.callback();
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
TreeBinding.prototype.add=function(_b9f){
var _ba0=null;
if(this._treeBodyBinding){
_ba0=this._treeBodyBinding.add(_b9f);
}else{
this._treeNodeBuffer.add(_b9f);
_ba0=_b9f;
}
return _ba0;
};
TreeBinding.prototype.addFirst=function(_ba1){
throw new Error("Not implemented");
};
TreeBinding.prototype.empty=function(){
this._treeBodyBinding.detachRecursive();
var _ba2=this._treeBodyBinding.bindingElement;
_ba2.innerHTML="";
};
TreeBinding.prototype.isEmpty=function(){
return this._treeNodeBindings.hasEntries()==false;
};
TreeBinding.prototype.collapse=function(){
this.blurSelectedTreeNodes();
this._treeNodeBindings.each(function(_ba3,_ba4){
if(_ba4.isContainer&&_ba4.isOpen){
_ba4.close();
}
});
};
TreeBinding.prototype.setSelectable=function(_ba5){
this._isSelectable=_ba5;
if(_ba5){
this._selectedTreeNodeBindings={};
}else{
this._selectedTreeNodeBindings=null;
this._selectionProperty=null;
this._selectionValue=null;
}
};
TreeBinding.prototype.setSelectionProperty=function(_ba6){
this._selectionProperty=_ba6;
};
TreeBinding.prototype.setSelectionValue=function(_ba7){
if(_ba7){
var list=new List(_ba7.split(" "));
this._selectionValue={};
while(list.hasNext()){
this._selectionValue[list.getNext()]=true;
}
}
};
TreeBinding.prototype.handleBroadcast=function(_ba9,arg){
TreeBinding.superclass.handleBroadcast.call(this,_ba9,arg);
switch(_ba9){
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
var _bab=this.getFocusedTreeNodeBindings();
if(_bab.hasEntries()){
var node=_bab.getFirst();
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
var _bae=this.getFocusedTreeNodeBindings();
if(_bae.hasEntries()){
var node=_bae.getFirst();
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
var _bb1=null;
while(next==null&&(_bb1=node.getAncestorBindingByLocalName("treenode"))!=null){
if(_bb1!=null){
next=_bb1.getNextBindingByLocalName("treenode");
}
node=_bb1;
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
var _bb3=DOMEvents.getTarget(e);
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
var _bb4=new TreeCrawler();
var list=new List();
_bb4.mode=TreeCrawler.MODE_GETOPEN;
_bb4.crawl(this.bindingElement,list);
var map=new Map();
if(list.hasEntries()){
while(list.hasNext()){
var _bb7=list.getNext();
map.set(_bb7.getHandle(),true);
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
var _bbc=this._positionIndicatorBinding;
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
if(y!=_bbc.getPosition().y){
_bbc.setPosition(new Point(this._acceptingPosition.x+TreeNodeBinding.INDENT,y));
}
if(!_bbc.isVisible){
_bbc.show();
}
}else{
if(_bbc.isVisible){
_bbc.hide();
}
}
}else{
if(_bbc.isVisible){
_bbc.hide();
}
}
};
TreeBinding.prototype.enablePositionIndicator=function(_bbf){
this._acceptingTreeNodeBinding=_bbf;
this._acceptingPosition=_bbf.boxObject.getLocalPosition();
this._acceptingDimension=_bbf.boxObject.getDimension();
this._acceptingPositions=this._getChildPositions(_bbf);
};
TreeBinding.prototype.disablePositionIndicator=function(){
this._acceptingTreeNodeBinding=null;
this._acceptingPosition=null;
this._acceptingDimension=null;
};
TreeBinding.prototype._getChildPositions=function(_bc0){
var map={};
var _bc2=_bc0.getChildBindingsByLocalName("treenode");
var _bc3,pos,dim,y;
y=TreeBinding.grid(_bc0.boxObject.getLocalPosition().y);
map[y]=true;
while(_bc2.hasNext()){
_bc3=_bc2.getNext();
pos=_bc3.boxObject.getLocalPosition();
dim=_bc3.boxObject.getDimension();
y=TreeBinding.grid(pos.y+dim.h)-TreeNodeBinding.HEIGHT;
map[y]=true;
}
return map;
};
TreeBinding.prototype.getDropIndex=function(){
var y=this._positionIndicatorBinding.getPosition().y;
var drop=0;
for(var _bc9 in this._acceptingPositions){
if(_bc9==y){
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
TreeBinding.newInstance=function(_bca){
var _bcb=DOMUtil.createElementNS(Constants.NS_UI,"ui:tree",_bca);
var _bcc=UserInterface.registerBinding(_bcb,TreeBinding);
_bcc.treeBodyBinding=TreeBodyBinding.newInstance(_bca);
return _bcc;
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
TreeBodyBinding.prototype.accept=function(_bcd){
if(_bcd instanceof TreeNodeBinding){
this.logger.debug(_bcd);
}
};
TreeBodyBinding.prototype.handleAction=function(_bce){
TreeBodyBinding.superclass.handleAction.call(this,_bce);
switch(_bce.type){
case TreeNodeBinding.ACTION_FOCUSED:
this._scrollIntoView(_bce.target);
_bce.consume();
break;
}
};
TreeBodyBinding.prototype._scrollIntoView=function(_bcf){
var a=this.boxObject.getDimension().h;
var y=_bcf.boxObject.getLocalPosition().y;
var h=_bcf.boxObject.getDimension().h;
var t=this.bindingElement.scrollTop;
var l=this.bindingElement.scrollLeft;
var _bd5=_bcf.labelBinding.bindingElement;
if(y-t<0){
_bd5.scrollIntoView(true);
}else{
if(y-t+h>a){
_bd5.scrollIntoView(false);
}
}
if(Client.isExplorer){
this.bindingElement.scrollLeft=l;
}
};
TreeBodyBinding.newInstance=function(_bd6){
var _bd7=DOMUtil.createElementNS(Constants.NS_UI,"ui:treebody",_bd6);
return UserInterface.registerBinding(_bd7,TreeBodyBinding);
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
var _bd8=TreeNodeBinding.superclass.serialize.call(this);
if(_bd8){
_bd8.label=this.getLabel();
_bd8.image=this.getImage();
var _bd9=this.getHandle();
if(_bd9&&_bd9!=this.key){
_bd8.handle=_bd9;
}
if(this.isOpen){
_bd8.open=true;
}
if(this.isDisabled){
_bd8.disabled=true;
}
if(this.dragType){
_bd8.dragtype=this.dragType;
}
if(this.dragAccept){
_bd8.dragaccept=this.dragAccept;
}
}
return _bd8;
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
var _bdb=UserInterface.getBinding(node);
if(_bdb&&_bdb.containingTreeBinding){
this.containingTreeBinding=_bdb.containingTreeBinding;
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
var _bdc=this.key;
var _bdd=this.getProperty("handle");
if(_bdd){
_bdc=_bdd;
}
return _bdc;
};
TreeNodeBinding.prototype.setHandle=function(_bde){
this.setProperty("handle",_bde);
};
TreeNodeBinding.prototype.buildDOMContent=function(){
var url=this.getProperty("url");
var _be0=this.getProperty("label");
var _be1=this.getProperty("tooltip");
var _be2=this.getProperty("oncommand");
var _be3=this.getProperty("onbindingfocus");
var _be4=this.getProperty("onbindingblur");
var _be5=this.getProperty("focused");
var _be6=this.getProperty("callbackid");
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
if(_be0!=null){
this.setLabel(_be0);
}
if(_be1!=null){
this.setToolTip(_be1);
}
if(!this.imageProfile){
this._computeImageProfile();
}
this.setImage(this.computeImage());
if(this.isContainer){
this.updateClassNames();
}
var _be8=this.bindingWindow.WindowManager;
if(_be2!=null){
this.oncommand=function(){
Binding.evaluate(_be2,this);
};
}
if(_be3!=null){
this.onfocus=function(){
Binding.evaluate(_be3,this);
};
}
if(_be4!=null){
this.onblur=function(){
Binding.evaluate(_be4,this);
};
}
if(_be5==true){
this.focus();
}
if(_be6!=null){
Binding.dotnetify(this,_be6);
}
};
TreeNodeBinding.prototype.handleAction=function(_be9){
TreeNodeBinding.superclass.handleAction.call(this,_be9);
switch(_be9.type){
case TreeNodeBinding.ACTION_FOCUSED:
if(_be9.target!=this){
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
TreeNodeBinding.prototype.accept=function(_bea,_beb){
var _bec=true;
if(_bea instanceof TreeNodeBinding){
var _bed=false;
var _bee=this.bindingElement;
var _bef=this.containingTreeBinding.bindingElement;
while(!_bed&&_bee!=_bef){
if(_bee==_bea.getBindingElement()){
_bed=true;
}else{
_bee=_bee.parentNode;
}
}
if(_bed){
Dialog.error("Not Allowed","You cannot move a folder into itself.");
_bec=false;
}else{
this.acceptTreeNodeBinding(_bea,_beb);
}
}else{
_bec=false;
}
return _bec;
};
TreeNodeBinding.prototype.acceptTreeNodeBinding=function(_bf0,_bf1){
var _bf2=_bf0.serializeToString();
var _bf3=new BindingParser(this.bindingDocument);
var _bf4=_bf3.parseFromString(_bf2).getFirst();
_bf1=_bf1?_bf1:this.containingTreeBinding.getDropIndex();
var _bf5=this.getChildElementsByLocalName("treenode");
this.bindingElement.insertBefore(_bf4,_bf5.get(_bf1));
this.bindingWindow.DocumentManager.attachBindings(this.bindingElement);
_bf0.dispose();
};
TreeNodeBinding.prototype.showAcceptance=function(){
this.containingTreeBinding.enablePositionIndicator(this);
};
TreeNodeBinding.prototype.hideAcceptance=function(){
this.containingTreeBinding.disablePositionIndicator();
};
TreeNodeBinding.prototype._computeImageProfile=function(){
var _bf6=this.getProperty("image");
var _bf7=this.getProperty("image-active");
var _bf8=this.getProperty("image-disabled");
_bf7=_bf7?_bf7:this.isContainer?_bf6?_bf6:TreeNodeBinding.DEFAULT_FOLDER_OPEN:_bf6?_bf6:TreeNodeBinding.DEFAULT_ITEM;
_bf8=_bf8?_bf8:this.isContainer?_bf6?_bf6:TreeNodeBinding.DEFAULT_FOLDER_DISABLED:_bf6?_bf6:TreeNodeBinding.DEFAULT_ITEM_DISABLED;
_bf6=_bf6?_bf6:this.isContainer?TreeNodeBinding.DEFAULT_FOLDER_CLOSED:TreeNodeBinding.DEFAULT_ITEM;
this.imageProfile=new ImageProfile({image:_bf6,imageHover:null,imageActive:_bf7,imageDisabled:_bf8});
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
TreeNodeBinding.prototype.setLabel=function(_bfa){
this.setProperty("label",String(_bfa));
if(this.isAttached){
this.labelBinding.setLabel(String(_bfa));
}
};
TreeNodeBinding.prototype.setToolTip=function(_bfb){
this.setProperty("tooltip",String(_bfb));
if(this.isAttached){
this.labelBinding.setToolTip(String(_bfb));
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
var _bfc=this.imageProfile.getDefaultImage();
var _bfd=this.imageProfile.getActiveImage();
_bfd=_bfd?_bfd:_bfc;
return this.isOpen?_bfd:_bfc;
};
TreeNodeBinding.prototype.handleEvent=function(e){
TreeNodeBinding.superclass.handleEvent.call(this,e);
var _bff=DOMEvents.getTarget(e);
var _c00=this.labelBinding.bindingElement;
var _c01=this.labelBinding.shadowTree.labelBody;
var _c02=this.labelBinding.shadowTree.labelText;
switch(e.type){
case DOMEvents.MOUSEDOWN:
switch(_bff){
case _c00:
this._onAction(e);
break;
case _c01:
case _c02:
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
if(_bff.parentNode==this.bindingElement&&_bff.__updateType==Update.TYPE_INSERT){
var _c00=this.labelBinding.bindingElement;
if(DOMUtil.getLocalName(_bff)=="treenode"){
if(_bff==this.bindingElement.firstChild){
this.bindingElement.insertBefore(_bff,_c00.nextSibling);
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
switch(_bff){
case _c00:
case _c01:
case _c02:
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
var _c06=true;
if(e.type=="mousedown"){
var _c07=e.button==(e.target?0:1);
if(!_c07){
_c06=false;
}
}
if(_c06){
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
var _c09=false;
if(e!=null){
_c09=e.shiftKey;
}
this.dispatchAction(_c09?TreeNodeBinding.ACTION_ONMULTIFOCUS:TreeNodeBinding.ACTION_ONFOCUS);
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
var _c0c=this.getDescendantBindingsByLocalName("treenode");
_c0c.each(function(_c0d){
_c0d.dispose();
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
TreeNodeBinding.prototype.handleElement=function(_c0e){
var _c0f=_c0e.getAttribute("focused");
if(_c0f=="true"){
if(!this.isFocused){
this.focus();
}
}
return false;
};
TreeNodeBinding.newInstance=function(_c10){
var _c11=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_c10);
return UserInterface.registerBinding(_c11,TreeNodeBinding);
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
TreeContentBinding.newInstance=function(_c12){
var _c13=DOMUtil.createElementNS(Constants.NS_UI,"ui:treecontent",_c12);
return UserInterface.registerBinding(_c13,TreeContentBinding);
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
TreePositionIndicatorBinding.prototype.setPosition=function(_c14){
this.bindingElement.style.left=_c14.x+"px";
this.bindingElement.style.top=_c14.y+"px";
this._geometry.x=_c14.x;
this._geometry.y=_c14.y;
};
TreePositionIndicatorBinding.prototype.getPosition=function(){
return new Point(this._geometry.x,this._geometry.y);
};
TreePositionIndicatorBinding.newInstance=function(_c15){
var _c16=DOMUtil.createElementNS(Constants.NS_UI,"ui:treepositionindicator",_c15);
return UserInterface.registerBinding(_c16,TreePositionIndicatorBinding);
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
this.addFilter(function(_c18){
var _c19=UserInterface.getBinding(_c18);
var _c1a=null;
var _c1a=null;
if(!_c19 instanceof TreeNodeBinding){
_c1a=NodeCrawler.SKIP_NODE;
}
return _c1a;
});
this.addFilter(function(_c1b,list){
var _c1d=UserInterface.getBinding(_c1b);
var _c1e=null;
switch(self.mode){
case TreeCrawler.MODE_GETOPEN:
if(_c1d.isOpen){
list.add(_c1d);
}
break;
}
return _c1e;
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
ShadowBinding.prototype.shadow=function(_c1f){
this.targetBinding=_c1f;
_c1f.addActionListener(Binding.ACTION_POSITIONCHANGED,this);
_c1f.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_c1f.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_c1f.bindingElement.parentNode.appendChild(this.bindingElement);
if(_c1f.isVisible){
this.show();
this.setPosition(_c1f.getPosition());
this.setDimension(_c1f.getDimension());
}else{
this.hide();
}
};
ShadowBinding.prototype.handleAction=function(_c20){
ShadowBinding.superclass.handleAction.call(this,_c20);
var _c21=_c20.target;
if(_c21==this.targetBinding){
switch(_c20.type){
case Binding.ACTION_POSITIONCHANGED:
this.setPosition(this.targetBinding.getPosition());
_c20.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
this.setDimension(this.targetBinding.getDimension());
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(_c21.isVisible){
this.show();
this.setPosition(_c21.getPosition());
this.setDimension(_c21.getDimension());
}else{
this.hide();
}
break;
}
}
};
ShadowBinding.prototype.setPosition=function(_c22){
var _c23=this.offset-this.expand;
this.bindingElement.style.left=new String(_c22.x+_c23)+"px";
this.bindingElement.style.top=new String(_c22.y+_c23)+"px";
};
ShadowBinding.prototype.setDimension=function(dim){
this.bindingElement.style.width=new String(dim.w+2*this.expand)+"px";
this.bindingElement.style.height=new String(dim.h+2*this.expand)+"px";
};
ShadowBinding.newInstance=function(_c25){
var _c26=DOMUtil.createElementNS(Constants.NS_UI,"ui:shadow",_c25);
return UserInterface.registerBinding(_c26,ShadowBinding);
};
DockControlImageProfile.prototype=new ControlImageProfile;
DockControlImageProfile.prototype.constructor=DockControlImageProfile;
DockControlImageProfile.superclass=ControlImageProfile.prototype;
DockControlImageProfile.IMAGE_MINIMIZE=Resolver.resolve("${skin}/docks/control-minimize-${string}.png");
DockControlImageProfile.IMAGE_MAXIMIZE=Resolver.resolve("${skin}/docks/control-maximize-${string}.png");
DockControlImageProfile.IMAGE_RESTORE=Resolver.resolve("${skin}/docks/control-restore-${string}.png");
DockControlImageProfile.IMAGE_CLOSE=null;
function DockControlImageProfile(_c27){
this.binding=_c27;
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
DockTabsButtonBinding.newInstance=function(_c28){
var _c29=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_c28);
_c29.setAttribute("type","checkbox");
_c29.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_c29.className="tabbutton";
return UserInterface.registerBinding(_c29,DockTabsButtonBinding);
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
var _c2a=DockBinding.superclass.serialize.call(this);
if(_c2a){
_c2a.active=this.isActive?true:null;
_c2a.collapsed=this.isCollapsed?true:null;
}
return _c2a;
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
var _c2b=UserInterface.getBinding(this.bindingElement.parentNode);
var _c2c=MatrixBinding.newInstance(this.bindingDocument);
_c2c.attachClassName("dockliner");
this.shadowTree.dockLiner=_c2c;
_c2b.add(_c2c);
_c2c.attach();
_c2c.manifest();
var type=this.getProperty("type");
this.type=type?type:DockBinding.TYPE_TOOLS;
this.attachClassName(this.type);
if(this.getProperty("active")==true){
this.activate();
}
};
DockBinding.prototype.interceptDisplayChange=function(_c2e){
var _c2f=this.getSelectedTabPanelBinding();
if(_c2f){
_c2f.isVisible=_c2e;
_c2f.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
}
};
DockBinding.prototype.prepareNewView=function(_c30){
var _c31=this._getBindingForDefinition(_c30);
var _c32=DockTabBinding.newInstance(this.bindingDocument);
_c32.setHandle(_c30.handle);
_c32.setLabel(this.type==DockBinding.TYPE_EDITORS?null:_c30.label);
_c32.setImage(_c30.image);
_c32.setToolTip(_c30.toolTip);
_c32.setEntityToken(_c30.entityToken);
_c32.setAssociatedView(_c31);
this.appendTabByBindings(_c32,null);
this._setupPageBindingListeners(_c32);
var _c33=this.getTabPanelBinding(_c32);
_c31.snapToBinding(_c33);
var _c34=this.bindingWindow.bindingMap.views;
_c34.add(_c31);
if(!this.isActive){
this.activate();
}
_c31.attach();
};
DockBinding.prototype.prepareOpenView=function(_c35,_c36){
this.logger.debug("DockBinding.prototype.prepareOpenView: _setupDirtyStuff required?");
_c36.setLabel(_c35.label);
_c36.setImage(_c35.image);
_c36.setToolTip(_c35.toolTip);
this._setupPageBindingListeners(_c36);
var _c37=this.getTabPanelBinding(_c36);
var _c38=this._getBindingForDefinition(_c35);
_c36.setAssociatedView(_c38);
_c38.snapToBinding(_c37);
UserInterface.getBinding(this.bindingDocument.body).add(_c38);
_c38.attach();
};
DockBinding.prototype._getBindingForDefinition=function(_c39){
var _c3a=this.bindingWindow.bindingMap.views;
var view=ViewBinding.newInstance(_c3a.bindingDocument);
view.setDefinition(_c39);
return view;
};
DockBinding.prototype._setupPageBindingListeners=function(_c3c){
var _c3d=this.getTabPanelBinding(_c3c);
var self=this;
var _c3f={handleAction:function(_c40){
var _c41=_c40.target;
switch(_c40.type){
case PageBinding.ACTION_ATTACHED:
TabBoxBinding.currentActiveInstance=self;
break;
case PageBinding.ACTION_INITIALIZED:
_c41.reflex(true);
var view=_c3c.getAssociatedView();
if(_c41.bindingWindow==view.getContentWindow()){
_c3c.updateDisplay(_c41);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_COMPLETED,view.getHandle());
if(StatusBar.state==StatusBar.BUSY){
StatusBar.clear();
}
}
_c3c.onPageInitialize(_c41);
_c40.consume();
break;
case DockTabBinding.ACTION_UPDATE_VISUAL:
_c3c.updateDisplay(_c41);
_c40.consume();
break;
case DockTabBinding.ACTION_UPDATE_TOKEN:
_c3c.updateEntityToken(_c41);
_c40.consume();
break;
case EditorPageBinding.ACTION_DIRTY:
_c3c.setDirty(true);
break;
case EditorPageBinding.ACTION_SAVE:
_c3c.onSaveStart();
break;
case ViewBinding.ACTION_ONCLOSE:
self.closeTab(_c3c);
_c40.consume();
break;
case ViewBinding.ACTION_ONCLOSE_FORCE:
self.closeTab(_c3c,true);
_c40.consume();
break;
case DockPanelBinding.ACTION_FORCE_SELECT:
self.select(_c3c);
break;
case Binding.ACTION_FORCE_REFLEX:
_c3d.reflex(true);
_c40.consume();
break;
case DockTabBinding.ACTION_FORCE_CLEAN:
case EditorPageBinding.ACTION_CLEAN:
if(_c3c.isDirty){
_c3c.setDirty(false);
}
break;
case WindowBinding.ACTION_ONLOAD:
alert("HWEJ");
break;
}
}};
new List([DockTabBinding.ACTION_UPDATE_VISUAL,DockTabBinding.ACTION_UPDATE_TOKEN,PageBinding.ACTION_ATTACHED,PageBinding.ACTION_INITIALIZED,EditorPageBinding.ACTION_DIRTY,EditorPageBinding.ACTION_CLEAN,EditorPageBinding.ACTION_SAVE,ViewBinding.ACTION_ONCLOSE,ViewBinding.ACTION_ONCLOSE_FORCE,DockPanelBinding.ACTION_FORCE_SELECT,Binding.ACTION_FORCE_REFLEX,DockTabBinding.ACTION_FORCE_CLEAN,WindowBinding.ACTION_ONLOAD]).each(function(_c43){
_c3d.addActionListener(_c43,_c3f);
});
};
DockBinding.prototype.summonTabPanelBinding=function(){
return DockPanelBinding.newInstance(this.bindingDocument);
};
DockBinding.prototype.handleAction=function(_c44){
DockBinding.superclass.handleAction.call(this,_c44);
var _c45=_c44.target;
switch(_c44.type){
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_c44.consume();
break;
case TabBoxBinding.ACTION_UPDATED:
if(_c45 instanceof DockBinding){
if(_c45.updateType==TabBoxBinding.UPDATE_DETACH){
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
this._viewBindingList.add(_c45);
if(this.isActive){
_c45.onActivate();
}
break;
case ViewBinding.ACTION_CLOSED:
this._viewBindingList.del(_c45);
break;
}
};
DockBinding.prototype.handleBroadcast=function(_c46,arg){
DockBinding.superclass.handleBroadcast.call(this,_c46,arg);
switch(_c46){
case BroadcastMessages.SYSTEMTREENODEBINDING_FOCUS:
var _c48=arg;
if(_c48.perspectiveNode==this.perspectiveNode){
this._selectTabByEntityToken(_c48.node.getEntityToken());
}
break;
}
};
DockBinding.prototype._selectTabByEntityToken=function(_c49){
var tabs=this.getTabBindings();
var _c4b=false;
while(tabs.hasNext()&&!_c4b){
var tab=tabs.getNext();
var _c4d=tab.getEntityToken();
if(_c4d!=null&&_c4d==_c49){
if(!tab.isSelected){
this.select(tab,true);
_c4b=true;
}
}
}
};
DockBinding.prototype.collapse=function(_c4e){
this._handleCollapse(true,_c4e);
};
DockBinding.prototype.unCollapse=function(_c4f){
this._handleCollapse(false,_c4f);
};
DockBinding.prototype._handleCollapse=function(_c50,_c51){
var _c52=this.getChildBindingByLocalName("dockpanels");
var _c53=this.getAncestorBindingByLocalName("splitbox");
if(_c50){
_c52.hide();
this.bindingElement.style.height="auto";
this.isFlexible=false;
this.isActivatable=false;
this.setProperty("collapsed",true);
if(_c51&&_c53.hasBothPanelsVisible()){
this.setWidth(200);
}
}else{
_c52.show();
this.isFlexible=true;
this.isActivatable=true;
this.deleteProperty("collapsed");
if(_c51){
this.setWidth(false);
}
}
this.interceptDisplayChange(!_c50);
this.isCollapsed=_c50;
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
DockBinding.prototype.closeTab=function(_c58,_c59){
if(_c58.isDirty&&!_c59){
var _c5a=Resolver.resolve(_c58.getLabel());
var self=this;
Dialog.question(StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Title"),StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Text").replace("${resourcename}",_c5a),Dialog.BUTTONS_YES_NO_CANCEL,{handleDialogResponse:function(_c5c){
switch(_c5c){
case Dialog.RESPONSE_YES:
setTimeout(function(){
self.saveContainedEditor(_c58);
},0);
break;
case Dialog.RESPONSE_NO:
self.removeTab(_c58);
break;
}
}});
}else{
this.removeTab(_c58);
}
};
DockBinding.prototype.closeTabsExcept=function(_c5d){
var tabs=this.getTabBindings();
while(tabs.hasNext()){
var tab=tabs.getNext();
if(tab!=_c5d){
this.closeTab(tab);
}
}
};
DockBinding.prototype.saveContainedEditor=function(_c60){
var _c61=_c60.getAssociatedView();
_c61.saveContainedEditor();
var self=this;
var _c63={handleBroadcast:function(_c64,arg){
switch(_c64){
case BroadcastMessages.CURRENT_SAVED:
if(arg.handle==_c61.getHandle()){
EventBroadcaster.unsubscribe(BroadcastMessages.CURRENT_SAVED,_c63);
if(arg.isSuccess){
self.removeTab(_c60);
}
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.CURRENT_SAVED,_c63);
};
DockBinding.prototype.appendTabByBindings=function(_c66,_c67){
if(this.isEmpty){
this.isEmpty=false;
this.isActivatable=true;
this.setWidth(false);
this.dispatchAction(DockBinding.ACTION_OPENED);
}
DockBinding.superclass.appendTabByBindings.call(this,_c66,_c67);
};
DockBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
DockBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
DockBinding.prototype.setWidth=function(_c68){
_c68=_c68?_c68+"px":"100%";
this.bindingElement.style.width=_c68;
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
DockBinding.prototype.showControls=function(_c69){
var tabs=this.getChildBindingByLocalName(this._nodename_tabs);
if(_c69){
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
var _c6c=DockControlBinding.newInstance(this.bindingDocument);
_c6c.setControlType(type);
return _c6c;
};
DockTabsBinding.prototype.flex=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _c6e=self.containingTabBoxBinding.getWidth();
if(!isNaN(_c6e)){
_c6e=_c6e>0?_c6e-1:0;
self.bindingElement.style.width=new String(_c6e)+"px";
}
}
setTimeout(fix,250);
fix();
}
DockTabsBinding.superclass.flex.call(this);
};
DockTabsBinding.prototype.handleCrawler=function(_c6f){
DockTabsBinding.superclass.handleCrawler.call(this,_c6f);
switch(_c6f.id){
case FlexBoxCrawler.ID:
this._explorerFlexHack();
break;
}
};
DockTabsBinding.prototype._explorerFlexHack=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _c71=self.containingTabBoxBinding.getWidth();
if(!isNaN(_c71)){
_c71=_c71>0?_c71-1:0;
self.bindingElement.style.width=new String(_c71)+"px";
}
}
setTimeout(fix,250);
fix();
}
};
DockTabsBinding.newInstance=function(_c72){
var _c73=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktabs",_c72);
return UserInterface.registerBinding(_c73,DockTabsBinding);
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
DockTabBinding.prototype.setAssociatedView=function(_c74){
this._viewBinding=_c74;
};
DockTabBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
DockTabBinding.prototype.serialize=function(){
var _c75=DockTabBinding.superclass.serialize.call(this);
if(_c75){
_c75.label=null;
_c75.image=null;
_c75.handle=this.getHandle();
}
return _c75;
};
DockTabBinding.prototype.setHandle=function(_c76){
this.setProperty("handle",_c76);
};
DockTabBinding.prototype.getHandle=function(){
return this.getProperty("handle");
};
DockTabBinding.prototype.setEntityToken=function(_c77){
if(this._entityToken==null){
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
this._entityToken=_c77;
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
var _c78=DialogControlBinding.newInstance(this.bindingDocument);
_c78.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_c78);
this._controlGroupBinding.attachRecursive();
};
DockTabBinding.prototype.setDirty=function(_c79){
if(this.containingTabBoxBinding.type==DockBinding.TYPE_EDITORS){
if(this.isDirty!=_c79){
this.isDirty=_c79;
if(Binding.exists(this.labelBinding)){
var _c7a=this.labelBinding.getLabel();
if(_c7a!=null){
this.labelBinding.setLabel(_c79?"*"+_c7a:_c7a.slice(1,_c7a.length));
}else{
this.labelBinding.setLabel(_c79?"*":"");
}
}
}
var _c7b=top.app.bindingMap.broadcasterCurrentTabDirty;
if(this.isDirty==true){
this.subscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_DIRTY,this);
_c7b.enable();
}else{
this.unsubscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_CLEAN,this);
_c7b.disable();
}
}else{
Dialog.warning("Dirty denied","Only editor docks should invoke the dirty state!");
}
};
DockTabBinding.prototype.updateDisplay=function(_c7c){
this.setLabel(_c7c.getLabel());
this.setImage(_c7c.getImage());
this.setToolTip(_c7c.getToolTip());
};
DockTabBinding.prototype.updateEntityToken=function(_c7d){
this.setEntityToken(_c7d.getEntityToken());
};
DockTabBinding.prototype.handleAction=function(_c7e){
DockTabBinding.superclass.handleAction.call(this,_c7e);
var _c7f=_c7e.target;
switch(_c7e.type){
case ControlBinding.ACTION_COMMAND:
if(_c7f.controlType==ControlBinding.TYPE_CLOSE){
this.close();
}
break;
case MenuItemBinding.ACTION_COMMAND:
if(_c7e.listener==this.contextMenuBinding){
this._handleContextMenuItemBinding(_c7f);
}
break;
}
};
DockTabBinding.prototype._handleContextMenuItemBinding=function(_c80){
var cmd=_c80.getProperty("cmd");
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
DockTabBinding.prototype.setLabel=function(_c82){
if(!_c82){
if(!this.getLabel()){
_c82=DockTabBinding.LABEL_TABLOADING;
}else{
if(this.getLabel()==DockTabBinding.LABEL_TABLOADING){
_c82=DockTabBinding.LABEL_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setLabel.call(this,_c82);
};
DockTabBinding.prototype.setImage=function(_c83){
if(!_c83){
if(!this.getImage()){
_c83=DockTabBinding.IMG_TABLOADING;
}else{
if(this.getImage()==DockTabBinding.IMG_TABLOADING){
_c83=DockTabBinding.IMG_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setImage.call(this,_c83);
};
DockTabBinding.prototype._viewSource=function(cmd){
var def=ViewDefinitions["Composite.Management.SourceCodeViewer"];
def.argument={action:cmd,doc:this._viewBinding.windowBinding.getContentDocument()};
var _c86=Resolver.resolve(this.getLabel());
switch(cmd){
case DockTabPopupBinding.CMD_VIEWSOURCE:
def.label="Source: "+_c86;
break;
case DockTabPopupBinding.CMD_VIEWGENERATED:
def.label="Generated: "+_c86;
break;
case DockTabPopupBinding.CMD_VIEWSERIALIZED:
def.label="Serialized: "+_c86;
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
var _c88=this.bindingElement;
setTimeout(function(){
_c88.style.bottom="auto";
},25);
}
};
DockTabBinding.prototype.handleBroadcast=function(_c89,arg){
DockTabBinding.superclass.handleBroadcast.call(this,_c89,arg);
var body=this._viewBinding.getContentDocument().body;
var root=UserInterface.getBinding(body);
switch(_c89){
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
DockTabBinding.prototype.select=function(_c8e){
DockTabBinding.superclass.select.call(this,_c8e);
this._updateBroadcasters();
if(_c8e!=true){
this._updateTree();
}
this._updateGlobalEntityToken();
};
DockTabBinding.prototype.close=function(){
this.containingTabBoxBinding.closeTab(this);
};
DockTabBinding.prototype._updateBroadcasters=function(){
if(this.isSelected){
var _c8f=top.app.bindingMap.broadcasterCurrentTabDirty;
var _c90=top.app.bindingMap.broadcasterCurrentIsEditor;
if(this._isEditorDockTab()){
_c90.enable();
if(this.isDirty){
_c8f.enable();
}else{
_c8f.disable();
}
}else{
_c90.disable();
_c8f.disable();
}
}
};
DockTabBinding.prototype._updateTree=function(_c91){
if(this._canUpdateTree||_c91){
EventBroadcaster.broadcast(BroadcastMessages.DOCKTABBINDING_SELECT,this);
}
};
DockTabBinding.prototype._isEditorDockTab=function(){
var _c92=false;
if(this._viewBinding!=null){
var win=this._viewBinding.getContentWindow();
if(win!=null&&win.bindingMap!=null){
var _c94=win.bindingMap.savebutton;
if(_c94!=null){
_c92=true;
}
}
}
return _c92;
};
DockTabBinding.prototype._updateGlobalEntityToken=function(){
StageBinding.entityToken=this._entityToken;
};
DockTabBinding.newInstance=function(_c95){
var _c96=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktab",_c95);
return UserInterface.registerBinding(_c96,DockTabBinding);
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
DockPanelsBinding.newInstance=function(_c97){
var _c98=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanels",_c97);
return UserInterface.registerBinding(_c98,DockPanelsBinding);
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
DockPanelBinding.prototype.select=function(_c99){
DockPanelBinding.superclass.select.call(this,_c99);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.unselect=function(){
DockPanelBinding.superclass.unselect.call(this);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.flex=function(){
this.dispatchAction(Binding.ACTION_DIMENSIONCHANGED);
};
DockPanelBinding.prototype.handleCrawler=function(_c9a){
DockPanelBinding.superclass.handleCrawler.call(this,_c9a);
if(_c9a.response==null){
if(_c9a.type==NodeCrawler.TYPE_DESCENDING){
if(this.viewBinding!=null){
if(_c9a.id==FocusCrawler.ID){
_c9a.nextNode=this.viewBinding.bindingElement;
}
}
}
}
};
DockPanelBinding.newInstance=function(_c9b){
var _c9c=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanel",_c9b);
return UserInterface.registerBinding(_c9c,DockPanelBinding);
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
DockControlBinding.newInstance=function(_c9d){
var _c9e=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_c9d);
return UserInterface.registerBinding(_c9e,DockControlBinding);
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
ViewBinding.getInstance=function(_c9f){
var _ca0=ViewBinding._instances.get(_c9f);
if(!_ca0){
var cry="ViewBinding.getInstance: No such instance: "+_c9f;
SystemLogger.getLogger("ViewBinding [static]").error(cry);
SystemDebug.stack(arguments);
if(Application.isDeveloperMode){
alert(cry);
}
}
return _ca0;
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
var _ca3=!System.hasActivePerspectives&&Client.isExplorer;
if(this.isFreeFloating==true&&!_ca3){
if(snap.isVisible==true){
if(snap.isAttached==true){
var _ca4=snap.boxObject.getGlobalPosition();
var _ca5=snap.boxObject.getDimension();
if(!Point.isEqual(_ca4,this._lastknownposition)){
this.setPosition(_ca4);
this._lastknownposition=_ca4;
}
if(!Dimension.isEqual(_ca5,this._lastknowndimension)){
this.setDimension(_ca5);
this._lastknowndimension=_ca5;
var _ca6=_ca5.h-ViewBinding.VERTICAL_ADJUST;
_ca6=_ca6<0?0:_ca6;
this.windowBinding.getBindingElement().style.height=new String(_ca6)+"px";
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
var _ca7=this._viewDefinition.flowHandle;
if(_ca7!=null){
FlowControllerService.CancelFlow(_ca7);
}
}
if(this._viewDefinition!=null){
var _ca8=this._viewDefinition.handle;
EventBroadcaster.broadcast(BroadcastMessages.VIEW_CLOSED,_ca8);
this.logger.fine("ViewBinding closed: \""+_ca8+"\"");
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
var _caa=null;
if(this._viewDefinition!=null){
_caa=this._viewDefinition.handle;
}
return _caa;
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
ViewBinding.prototype.setDefinition=function(_cab){
this._viewDefinition=_cab;
if(_cab.flowHandle!=null){
this.subscribe(BroadcastMessages.CLOSE_VIEWS);
}
};
ViewBinding.prototype.getDefinition=function(){
return this._viewDefinition;
};
ViewBinding.prototype.handleAction=function(_cac){
ViewBinding.superclass.handleAction.call(this,_cac);
var _cad=_cac.target;
switch(_cac.type){
case RootBinding.ACTION_PHASE_1:
case RootBinding.ACTION_PHASE_2:
case RootBinding.ACTION_PHASE_3:
if(_cac.type==RootBinding.ACTION_PHASE_1){
if(this.isActivated&&!_cad.isActivated){
_cad.onActivate();
}
}
_cac.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
if(this.isFreeFloating==true){
if(_cad==this._snapBinding){
if(this.isVisible==true){
this.updatePositionDimension();
_cac.consume();
}
}
}
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(this.isFreeFloating==true){
if(_cad==this._snapBinding){
if(_cad.isVisible==true){
this.show();
}else{
this.hide();
}
}
}
break;
case WindowBinding.ACTION_LOADED:
case WindowBinding.ACTION_ONLOAD:
if(_cad.getContentWindow().isPostBackDocument){
if(_cac.type==WindowBinding.ACTION_ONLOAD){
var arg=this._viewDefinition.argument;
if(arg!=null&&arg.list!=null&&arg.url!=null){
_cad.post(arg.list,arg.url);
arg.list=null;
arg.url=null;
}
}
}else{
if(Client.isExplorer==true){
if(_cad==this.windowBinding){
var self=this;
DOMEvents.addEventListener(_cad.getContentWindow(),DOMEvents.UNLOAD,{handleEvent:function(e){
if(Binding.exists(self._coverBinding)==true){
self._coverBinding.show();
}
}});
}
if(_cac.type==WindowBinding.ACTION_ONLOAD){
if(this._coverBinding){
this._coverBinding.hide();
}
}
}
}
if(_cac.type==WindowBinding.ACTION_ONLOAD){
var win=_cad.getContentWindow();
if(win.WindowManager==null){
if(!this._isLoaded){
this._onLoadingCompleted(_cad);
}
}
}
_cac.consume();
break;
case PageBinding.ACTION_ATTACHED:
if(!_cad.label&&this._viewDefinition.label){
_cad.label=this._viewDefinition.label;
}
if(!_cad.image&&this._viewDefinition.image){
_cad.image=this._viewDefinition.image;
}
if(_cad.bindingWindow==this.getContentWindow()){
this._pageBinding=_cad;
this._injectPageArgument();
}
case PageBinding.ACTION_INITIALIZED:
if(_cad.bindingWindow==this.getContentWindow()){
if(Client.isExplorer&&this._coverBinding){
this._coverBinding.hide();
}
if(!this._isLoaded){
this._onLoadingCompleted();
}
}
break;
case Binding.ACTION_DISPOSED:
if(this.isFreeFloating&&_cad==this._snapBinding){
this.removeActionListener(Binding.ACTION_DISPOSED);
this.dispose();
_cac.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
case WizardPageBinding.ACTION_FINISH:
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
_cac.consume();
break;
case ViewBinding.ACTION_DETACH:
this.setDefinition(ViewDefinitions["Composite.Management.Null"]);
ViewBinding._instances.set(this._viewDefinition.handle,this);
break;
}
};
ViewBinding.prototype.handleBroadcast=function(_cb2,arg){
ViewBinding.superclass.handleBroadcast.call(this,_cb2,arg);
switch(_cb2){
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
var _cb6=def.argument;
if(_cb6!=null){
page.setPageArgument(_cb6);
}
var _cb7=def.width;
if(_cb7!=null){
page.width=_cb7;
}
var _cb8=def.height;
if(_cb8!=null){
page.height=_cb8;
}
}
};
ViewBinding.prototype.handleCrawler=function(_cb9){
ViewBinding.superclass.handleCrawler.call(this,_cb9);
switch(_cb9.type){
case NodeCrawler.TYPE_DESCENDING:
if(this.isFreeFloating==true){
if(_cb9.id==FocusCrawler.ID){
if(_cb9.previousNode!=this._snapBinding.bindingElement){
_cb9.response=NodeCrawler.SKIP_NODE;
}
}
}
break;
case NodeCrawler.TYPE_ASCENDING:
if(this.isFreeFloating==true){
_cb9.nextNode=this._snapBinding.bindingElement;
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
ViewBinding.prototype.setPosition=function(_cba){
_cba.x+=ViewBinding.HORIZONTAL_ADJUST;
this.bindingElement.style.left=_cba.x+"px";
this.bindingElement.style.top=_cba.y+"px";
};
ViewBinding.prototype.setDimension=function(_cbb){
_cbb.h-=ViewBinding.VERTICAL_ADJUST;
_cbb.w-=ViewBinding.HORIZONTAL_ADJUST;
_cbb.w-=1;
if(_cbb.h<0){
_cbb.h=0;
}
if(_cbb.w<0){
_cbb.w=0;
}
this.bindingElement.style.width=String(_cbb.w)+"px";
this.bindingElement.style.height=String(_cbb.h)+"px";
};
ViewBinding.prototype.snapToBinding=function(_cbc){
this.isFlexBoxBehavior=false;
_cbc.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_cbc.addActionListener(Binding.ACTION_POSITIONCHANGED,this);
_cbc.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_cbc.addActionListener(Binding.ACTION_DISPOSED,this);
if(this._snapBinding){
this._snapBinding.removeActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_POSITIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_DISPOSED,this);
this._snapBinding.viewBinding=null;
}
this._snapBinding=_cbc;
this._snapBinding.viewBinding=this;
this.isFreeFloating=true;
if(!this._isViewBindingInitialized){
this.initialize();
}
};
ViewBinding.prototype.getMigrationParent=function(){
var _cbd=null;
if(this.isFreeFloating==true){
_cbd=this._snapBinding.getBindingElement();
}else{
_cbd=ViewBinding.superclass.getMigrationParent.call(this);
}
return _cbd;
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
ViewBinding.prototype.reload=function(_cbe){
this._isLoaded=false;
this.windowBinding.reload(_cbe);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
};
ViewBinding.prototype.saveContainedEditor=function(){
var _cbf=false;
var page=this._pageBinding;
if(page!=null&&page instanceof EditorPageBinding){
if(page.canSave()){
page.doSave();
_cbf=true;
}
}
if(!_cbf){
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
ViewBinding.newInstance=function(_cc3){
var _cc4=DOMUtil.createElementNS(Constants.NS_UI,"ui:view",_cc3);
var _cc5=UserInterface.registerBinding(_cc4,ViewBinding);
_cc5.windowBinding=_cc5.add(WindowBinding.newInstance(_cc3));
_cc5.windowBinding.isFlexible=false;
return _cc5;
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
var _ccd=this.bindingWindow.__doPostBack;
var _cce=false;
if(!form.__isSetup){
DOMEvents.addEventListener(this.bindingWindow,DOMEvents.UNLOAD,{handleEvent:function(){
if(_cce){
Application.unlock(self);
}
}});
}
this.bindingWindow.__doPostBack=function(_ccf,_cd0){
if(!form.__isSetup){
Application.lock(self);
_cce=true;
}
self.manifestAllDataBindings();
_ccd(_ccf,_cd0);
if(Application.isDeveloperMode){
self._debugDotNetPostback();
}
};
};
PageBinding.prototype.postMessage=function(_cd1,list){
var _cd3=this.bindingWindow.bindingMap.__REQUEST;
if(_cd3!=null&&this._isDotNet()){
switch(_cd1){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_PERSIST:
if(this.bindingWindow.DataManager.isDirty){
if(this.validateAllDataBindings()){
if(list!=null){
list.add(this);
}
_cd3.postback(_cd1);
}
}
break;
default:
_cd3.postback(_cd1);
break;
}
}
if(list!=null){
this._postMessageToDescendants(_cd1,list);
}
};
PageBinding.prototype._postMessageToDescendants=function(_cd4,list){
var _cd6=this.getDescendantBindingsByType(WindowBinding);
_cd6.each(function(win){
var page=win.getPageBinding();
if(page!=null){
page.postMessage(_cd4,list);
}
});
};
PageBinding.prototype._debugDotNetPostback=function(){
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_cda){
list.add({name:_cda.name,value:_cda.value});
});
var out="";
list.each(function(_cdc){
out+=_cdc.name+": "+_cdc.value+"\n";
});
this.logger.debug(out);
};
PageBinding.prototype.handleAction=function(_cdd){
PageBinding.superclass.handleAction.call(this,_cdd);
var _cde=_cdd.target;
switch(_cdd.type){
case RootBinding.ACTION_PHASE_3:
if(_cde==UserInterface.getBinding(this.bindingDocument.body)){
_cde.removeActionListener(RootBinding.ACTION_PHASE_3,this);
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
this.doPostBack(_cde);
}
_cdd.consume();
break;
case PageBinding.ACTION_DOVALIDATEDPOSTBACK:
if(this._isDotNet()){
var _cdf=this.validateAllDataBindings();
if(_cdf){
this.doPostBack(_cde);
}
}
_cdd.consume();
break;
case BalloonBinding.ACTION_INITIALIZE:
_cdd.consume();
break;
case PageBinding.ACTION_BLOCK_INIT:
if(this._initBlockers==null){
this._initBlockers=new Map();
}
this._initBlockers.set(_cde.key,true);
break;
case PageBinding.ACTION_UNBLOCK_INIT:
if(this._initBlockers!=null){
if(this._initBlockers.has(_cde.key)){
this._initBlockers.del(_cde.key);
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
var _ce1={handleAction:function(_ce2){
if(_ce2.target==self){
self.removeActionListener(PageBinding.ACTION_UPDATED,_ce1);
MessageQueue.udpdate();
}
}};
this.addActionListener(PageBinding.ACTION_UPDATED,_ce1);
}else{
MessageQueue.udpdate();
}
_cdd.consume();
break;
}
};
PageBinding.prototype.handleBroadcast=function(_ce3,arg){
PageBinding.superclass.handleBroadcast.call(this,_ce3,arg);
switch(_ce3){
case BroadcastMessages.MESSAGEQUEUE_REQUESTED:
var _ce5=arg;
if(!this._canPostBack&&!_ce5){
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
PageBinding.prototype.doPostBack=function(_ce7){
if(this._canPostBack){
if(_ce7!=null&&this._isDotNet()){
var _ce8=_ce7.getCallBackID();
var _ce9=_ce7.getCallBackArg();
if(_ce8!=null){
_ce8=_ce8.replace(/_/g,"$");
}else{
_ce8="";
}
if(_ce9==null){
_ce9="";
}
this.bindingWindow.__doPostBack(_ce8,_ce9);
}
}
};
PageBinding.prototype.validateAllDataBindings=function(){
var _cea=true;
var _ceb=this.bindingWindow.DataManager.getAllDataBindings();
while(_ceb.hasNext()&&_cea){
var _cec=_ceb.getNext();
if(_cec.isAttached){
var _ced=_cec.validate();
if(_cea&&!_ced){
_cea=false;
this.logger.debug("Invalid DataBinding: "+_cec.toString()+" ("+_cec.getName()+")");
break;
}
}
}
return _cea;
};
PageBinding.prototype.manifestAllDataBindings=function(){
var list=new List();
var _cef=this.bindingWindow.DataManager.getAllDataBindings();
while(_cef.hasNext()){
var _cf0=_cef.getNext();
if(_cf0.isAttached){
var _cf1=_cf0.manifest();
if(_cf1!=null){
list.add(_cf1);
}
}
}
return list;
};
PageBinding.prototype.cleanAllDataBindings=function(){
var _cf2=this.bindingWindow.DataManager.getAllDataBindings();
while(_cf2.hasNext()){
var _cf3=_cf2.getNext();
if(_cf3.isAttached){
_cf3.clean();
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
var _cf5=this._cachedFocus.getBinding();
if(_cf5){
_cf5.blur();
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
var _cf6=this.getProperty("width");
if(!_cf6){
_cf6=this.hasClassName(DialogPageBinding.CLASSNAME_TABBOXED)?DialogPageBinding.DEFAULT_TABBOXED_WIDTH:DialogPageBinding.DEFAULT_WIDTH;
}
this.width=_cf6;
}
if(this.height==null){
var _cf7=this.getProperty("height");
this.height=_cf7?_cf7:DialogPageBinding.DEFAULT_HEIGHT;
}
if(this.minheight==null){
var _cf8=this.getProperty("minheight");
if(_cf8!=null){
this.minheight=_cf8;
}
}
if(this.controls==null){
var _cf9=this.getProperty("controls");
this.controls=_cf9?_cf9:DialogPageBinding.DEFAULT_CONTROLS;
}
if(!this.isResizable){
var _cfa=this.getProperty("resizable");
this.isResizable=_cfa?_cfa:DialogPageBinding.DEFAULT_RESIZABLE;
}
if(this.height=="auto"){
this.enableAutoHeightLayoutMode(true);
}
};
DialogPageBinding.prototype.enableAutoHeightLayoutMode=function(_cfb){
if(_cfb!=this.isAutoHeightLayoutMode){
if(_cfb){
this.attachClassName("auto");
}else{
this.detachClassName("auto");
}
this.isAutoHeightLayoutMode=_cfb;
}
};
DialogPageBinding.prototype.handleAction=function(_cfc){
DialogPageBinding.superclass.handleAction.call(this,_cfc);
var _cfd=_cfc.target;
switch(_cfc.type){
case PageBinding.ACTION_ATTACHED:
if(_cfd!=this&&_cfd.isFitAsDialogSubPage){
_cfd.makeDialogSubPage();
}
break;
case ButtonBinding.ACTION_COMMAND:
_cfc.consume();
if(_cfd.response!=null){
this.response=_cfd.response;
switch(_cfd.response){
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
DialogPageBinding.prototype._disableAcceptButton=function(_cfe){
var _cff=this.bindingWindow.bindingMap.buttonAccept;
if(_cff!=null){
_cff.setDisabled(_cfe);
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
DialogPageBodyBinding.prototype._setFitnessHeight=function(_d00){
var _d01=CSSComputer.getPadding(this.bindingElement);
var _d02=CSSComputer.getBorder(this.bindingElement);
_d00+=_d01.top+_d01.bottom;
_d00+=_d02.top+_d02.bottom;
if(_d00>this.bindingElement.offsetHeight){
this.bindingElement.style.height=_d00+"px";
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
EditorPageBinding.prototype.handleAction=function(_d0a){
EditorPageBinding.superclass.handleAction.call(this,_d0a);
var _d0b=_d0a.target;
switch(_d0a.type){
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
var _d0c=-1;
this._messengers.each(function(page){
var res=page.bindingWindow==_d0b.bindingWindow;
if(res){
page.bindingWindow.DataManager.isDirty=false;
if(_d0c==-1){
_d0c=0;
}
}else{
_d0c++;
}
return res;
});
if(_d0c>-1){
this._messengers.del(_d0c);
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
_d0a.consume();
break;
case Binding.ACTION_INVALID:
this.enableSave(false);
this._invalidBindings.set(_d0b.key,_d0b);
if(_d0b instanceof FieldsBinding){
this._updateStatusBar();
}
break;
case Binding.ACTION_VALID:
this._invalidBindings.del(_d0b.key);
if(_d0b instanceof FieldsBinding){
this._updateStatusBar();
}
if(!this._invalidBindings.hasEntries()){
this.enableSave(true);
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_d0b==this._tabBoxBinding){
if(this._windowBinding!=null){
var tab=_d0b.getSelectedTabBinding();
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
_d0a.consume();
break;
case TabBoxBinding.ACTION_UNSELECTED:
if(_d0b==this._tabBoxBinding){
this.postMessage(EditorPageBinding.MESSAGE_PERSIST);
}
_d0a.consume();
break;
case WindowBinding.ACTION_LOADED:
if(_d0b==this._windowBinding){
if(this._isGeneratingPreview==true){
this._generatePreview();
this._isGeneratingPreview=false;
}
_d0a.consume();
}
break;
case WindowBinding.ACTION_ONLOAD:
if(_d0b==this._windowBinding){
if(_d0b.getContentWindow().isPostBackDocument!=true){
if(Client.isPrism){
Prism.enableCache();
}
var self=this;
setTimeout(function(){
Application.unlock(self);
},100);
if(EventBroadcaster.hasSubscribers(BroadcastMessages.XHTML_MARKUP_ON)){
var _d11=WindowBinding.getMarkup(this._windowBinding);
if(_d11!=null){
EventBroadcaster.broadcast(BroadcastMessages.XHTML_MARKUP_ON,_d11);
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
var _d12=this.bindingWindow.bindingMap.savebutton;
if(_d12!=null&&!_d12.isDisabled){
_d12.fireCommand();
}
};
EditorPageBinding.prototype._saveEditorPage=function(){
if(Application.isDeveloperMode){
}
if(this.validateAllDataBindings()){
this.bindingWindow.DataManager.isDirty=false;
var _d13=this.bindingWindow.bindingMap.__REQUEST;
if(_d13!=null){
_d13.postback(EditorPageBinding.MESSAGE_SAVE);
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
EditorPageBinding.prototype.postMessage=function(_d14){
this._message=null;
switch(_d14){
case EditorPageBinding.MESSAGE_SAVE:
this._postMessageToDescendants(_d14,this._messengers);
if(!this._messengers.hasEntries()){
this._saveEditorPage();
}else{
this._message=_d14;
}
break;
case EditorPageBinding.MESSAGE_PERSIST:
this._message=_d14;
EditorPageBinding.superclass.postMessage.call(this,_d14,this._messengers);
break;
case EditorPageBinding.MESSAGE_REFRESH:
EditorPageBinding.superclass.postMessage.call(this,_d14,this._messengers);
break;
}
};
EditorPageBinding.prototype.handleBroadcast=function(_d15,arg){
EditorPageBinding.superclass.handleBroadcast.call(this,_d15,arg);
switch(_d15){
case BroadcastMessages.HIGHLIGHT_KEYWORDS:
var _d17=arg;
if(UserInterface.isBindingVisible(this._windowBinding)){
WindowBinding.highlightKeywords(this._windowBinding,_d17);
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
var _d18=new List();
this._invalidBindings.each(function(key,_d1a){
var list=_d1a.getInvalidLabels();
if(list){
list.each(function(_d1c){
_d18.add(_d1c);
});
}
});
if(_d18.hasEntries()){
var _d1d="";
while(_d18.hasNext()){
_d1d+=_d18.getNext().toLowerCase();
if(_d18.hasNext()){
_d1d+=", ";
}else{
_d1d+=".";
}
}
var _d1e=StringBundle.getString("ui","Website.App.StatusBar.ErrorInField");
StatusBar.error(_d1e+" "+_d1d);
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
EditorPageBinding.prototype.enableSave=function(_d1f){
var _d20=this.bindingDocument.getElementById("broadcasterCanSave");
if(_d20){
var _d21=UserInterface.getBinding(_d20);
if(_d1f){
_d21.enable();
}else{
_d21.disable();
}
}else{
throw new Error("A required BroadcasterBinding could not be located.");
}
};
EditorPageBinding.prototype.enableSaveAs=function(){
var _d22=this.bindingDocument.getElementById(EditorPageBinding.ID_SAVEASBUTTON);
if(_d22!=null){
UserInterface.getBinding(_d22).enable();
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
var _d23=this._windowBinding.getContentDocument().title;
if(_d23==WindowBinding.POSTBACK_TITLE){
if(this.validateAllDataBindings()){
this.manifestAllDataBindings();
var _d24=this._tabBinding.getCallBackID();
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d26){
if(_d26.name=="__EVENTTARGET"&&_d24){
_d26.value=_d24;
}
list.add({name:_d26.name,value:_d26.value});
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
WizardPageBinding.prototype.handleAction=function(_d28){
WizardPageBinding.superclass.handleAction.call(this,_d28);
var _d29=_d28.target;
switch(_d28.type){
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_FINISH:
if(this.validateAllDataBindings()==true){
this.doPostBack(_d29);
}else{
_d28.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
this.doPostBack(_d29);
break;
case Binding.ACTION_INVALID:
this._enableNextAndFinish(false);
_d28.consume();
break;
case Binding.ACTION_VALID:
this._enableNextAndFinish(true);
_d28.consume();
break;
}
};
WizardPageBinding.prototype._enableNextAndFinish=function(_d2a){
var next=this.bindingWindow.bindingMap.nextbutton;
var _d2c=this.bindingWindow.bindingMap.finishbutton;
if(next){
next.setDisabled(!_d2a);
}
if(_d2c){
_d2c.setDisabled(!_d2a);
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
MarkupAwarePageBinding.prototype.handleBroadcast=function(_d2d,arg){
MarkupAwarePageBinding.superclass.handleBroadcast.call(this,_d2d,arg);
var self=this;
switch(_d2d){
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
MarkupAwarePageBinding.prototype._handleMarkup=function(_d31){
};
MarkupAwarePageBinding.prototype._activate=function(_d32){
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
var _d33=this.bindingWindow.bindingMap.moreactionstoolbargroup;
this._moreActionsWidth=_d33.boxObject.getDimension().w;
_d33.hide();
var _d34=this.boxObject.getDimension().h;
this.bindingElement.style.height=_d34+"px";
var self=this;
var _d36=this.bindingWindow.bindingMap.moreactionsbutton;
_d36.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_d37){
self._showMoreActions();
_d37.consume();
}});
var _d38=this.bindingWindow.bindingMap.moreactionspopup;
_d38.addActionListener(MenuItemBinding.ACTION_COMMAND,{handleAction:function(_d39){
var item=_d39.target;
self._handleSystemAction(item.associatedSystemAction);
}});
SystemToolBarBinding.superclass.onBindingInitialize.call(this);
};
SystemToolBarBinding.prototype.handleBroadcast=function(_d3b,arg){
SystemToolBarBinding.superclass.handleBroadcast.call(this,_d3b,arg);
switch(_d3b){
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
var _d3f=self.bindingWindow.bindingMap.moreactionstoolbargroup;
if(_d3f!=null){
_d3f.hide();
}
},0);
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
var _d40=this.bindingWindow.WindowManager;
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
var _d41=new String("");
this._actionProfile.each(function(_d42,list){
list.each(function(_d44){
_d41+=_d44.getHandle()+";";
});
});
return _d41;
};
SystemToolBarBinding.prototype.handleAction=function(_d45){
SystemToolBarBinding.superclass.handleAction.call(this,_d45);
switch(_d45.type){
case ButtonBinding.ACTION_COMMAND:
var _d46=_d45.target;
this._handleSystemAction(_d46.associatedSystemAction);
break;
}
};
SystemToolBarBinding.prototype._handleSystemAction=function(_d47){
if(_d47!=null){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _d49=list.getFirst();
var _d4a=_d49.node;
}
SystemAction.invoke(_d47,_d4a);
}
};
SystemToolBarBinding.prototype.buildLeft=function(){
if(this.isInitialized&&this._actionProfile!=null&&this._actionProfile.hasEntries()){
var doc=this.bindingDocument;
var self=this;
this._actionProfile.each(function(_d4d,list){
var _d4f=new List();
list.reset();
while(list.hasNext()){
var _d50=list.getNext();
var _d51=null;
if(_d50.isInToolBar()){
if(_d50.isInFolder()){
alert("IsInFolder not implemented!");
}else{
_d51=self.getToolBarButtonBinding(_d50);
}
}
if(_d51!=null){
_d4f.add(_d51);
}
}
if(_d4f.hasEntries()){
var _d52=ToolBarGroupBinding.newInstance(doc);
_d4f.each(function(_d53){
_d52.add(_d53);
});
self.addLeft(_d52);
}
});
this.attachRecursive();
this._containAllButtons();
}
};
SystemToolBarBinding.prototype._containAllButtons=function(){
var _d54=this.bindingWindow.bindingMap.toolsbutton;
var _d55=this.bindingWindow.bindingMap.moreactionstoolbargroup;
var _d56=_d54.bindingElement.offsetLeft-this._moreActionsWidth;
var _d57=0;
var _d58=new List();
var _d59,_d5a=this._toolBarBodyLeft.getDescendantBindingsByLocalName("toolbarbutton");
while((_d59=_d5a.getNext())!=null){
if(!_d59.isVisible){
_d59.show();
}
_d57+=_d59.boxObject.getDimension().w;
if(_d57>=_d56){
_d58.add(_d59);
_d59.hide();
}
}
if(_d58.hasEntries()){
var _d5b=_d58.getFirst().bindingElement.parentNode;
UserInterface.getBinding(_d5b).setLayout(ToolBarGroupBinding.LAYOUT_LAST);
this._moreActions=new List();
while((_d59=_d58.getNext())!=null){
this._moreActions.add(_d59.associatedSystemAction);
}
_d55.show();
}else{
this._moreActions=null;
_d55.hide();
}
};
SystemToolBarBinding.prototype._showMoreActions=function(){
if(this._moreActions!=null){
var _d5c=this.bindingWindow.bindingMap.moreactionspopup;
_d5c.empty();
while((action=this._moreActions.getNext())!=null){
var item=MenuItemBinding.newInstance(_d5c.bindingDocument);
item.setLabel(action.getLabel());
item.setToolTip(action.getToolTip());
item.imageProfile=new ImageProfile({image:action.getImage(),imageDisabled:action.getDisabledImage()});
if(action.isDisabled()){
item.disable();
}
item.associatedSystemAction=action;
_d5c.add(item);
}
_d5c.attachRecursive();
this._moreActions=null;
}
};
SystemToolBarBinding.prototype.getToolBarButtonBinding=function(_d5e){
var _d5f=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _d60=_d5e.getLabel();
var _d61=_d5e.getToolTip();
var _d62=_d5e.getImage();
var _d63=_d5e.isDisabled();
if(_d62&&_d62.indexOf("size=")==-1){
_d62=_d62+"&size="+this.getImageSize();
_d5f.imageProfile=new ImageProfile({image:_d62});
}
if(_d60){
_d5f.setLabel(_d60);
}
if(_d61){
_d5f.setToolTip(_d61);
}
if(_d5e.isDisabled()){
_d5f.disable();
}
_d5f.associatedSystemAction=_d5e;
return _d5f;
};
SystemToolBarBinding.prototype._invokeDefaultAction=function(){
var _d64=this.getDescendantBindingByLocalName("toolbarbutton");
if(_d64!=null){
_d64.fireCommand();
}
};
SystemToolBarBinding.newInstance=function(_d65){
var _d66=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_d65);
return UserInterface.registerBinding(_d66,SystemToolBarBinding);
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
SystemTreeBinding.prototype.add=function(_d67){
var _d68=SystemTreeBinding.superclass.add.call(this,_d67);
if(!this._defaultTreeNode){
if(_d67 instanceof SystemTreeNodeBinding){
this._defaultTreeNode=_d67;
}
}
return _d68;
};
SystemTreeBinding.prototype.handleAction=function(_d69){
SystemTreeBinding.superclass.handleAction.call(this,_d69);
var _d6a=_d69.target;
switch(_d69.type){
case TreeNodeBinding.ACTION_ONFOCUS:
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
this._restorableFocusHandle=null;
this._handleSystemTreeFocus();
break;
case SystemTreeNodeBinding.ACTION_REFRESHED_YEAH:
this._updateRefreshingTrees(_d6a.key);
_d69.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
case TreeNodeBinding.ACTION_BLUR:
var self=this;
setTimeout(function(){
if(!self._focusedTreeNodeBindings.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,null);
}
},0);
if(_d69.type==TreeNodeBinding.ACTION_BLUR){
this._restorableFocusHandle=_d6a.getHandle();
}
break;
case TreeNodeBinding.ACTION_COMMAND:
EventBroadcaster.broadcast(BroadcastMessages.INVOKE_DEFAULT_ACTION);
_d69.consume();
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
var _d6c=this._treeNodeBindings.get(this._restorableFocusHandle);
this.focusSingleTreeNodeBinding(_d6c);
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
SystemTreeBinding.prototype.registerTreeNodeBinding=function(_d6d){
SystemTreeBinding.superclass.registerTreeNodeBinding.call(this,_d6d);
var reg=this._entityTokenRegistry;
var _d6f=_d6d.node.getEntityToken();
if(reg.has(_d6f)){
reg.get(_d6f).add(_d6d);
}else{
reg.set(_d6f,new List([_d6d]));
}
var _d70=null;
if(this.isLockedToEditor){
if(_d6f==StageBinding.entityToken){
if(_d6d.node.isTreeLockEnabled()){
_d70=_d6d;
}
}
}else{
if(this._backupfocushandle!=null){
if(this._backupfocushandle==_d6d.node.getHandle()){
_d70=_d6d;
}
}
}
if(_d70!=null){
this.focusSingleTreeNodeBinding(_d70);
}
};
SystemTreeBinding.prototype.unRegisterTreeNodeBinding=function(_d71){
SystemTreeBinding.superclass.unRegisterTreeNodeBinding.call(this,_d71);
var reg=this._entityTokenRegistry;
var _d73=_d71.node.getEntityToken();
if(reg.has(_d73)){
var list=reg.get(_d73);
list.del(_d71);
if(!list.hasEntries()){
reg.del(_d73);
}
}else{
this.logger.fatal("SystemTreeBinding out of synch: unRegisterTreeNodeBinding");
if(Application.isDeveloperMode){
Dialog.error("Attention Developer","Tree is out of synch. Please reproduce this bug and file a report.");
}
}
if(_d71.isRefreshing){
this._updateRefreshingTrees(binding.key);
}
if(!this.isLockedToEditor){
if(_d71.isFocused&&this._backupfocushandle==null){
this._backupfocushandle=_d71.node.getHandle();
var self=this;
setTimeout(function(){
self._backupfocushandle=null;
},200);
}
}
};
SystemTreeBinding.prototype._updateRefreshingTrees=function(key){
var _d77=this._refreshingTreeNodes;
if(_d77.hasEntries()&&_d77.has(key)){
_d77.del(key);
if(!_d77.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this._refreshToken);
this._refreshToken=null;
this._attemptRestorableFocus();
}
}
};
SystemTreeBinding.prototype._computeClipboardSetup=function(){
var _d78=false;
var _d79=this.getFocusedTreeNodeBindings();
if(_d79.hasEntries()){
_d78=true;
while(_d78&&_d79.hasNext()){
var _d7a=_d79.getNext();
if(!_d7a.isDraggable){
_d78=false;
}
}
}
SystemTreePopupBinding.isCutAllowed=_d78;
};
SystemTreeBinding.prototype._computeRefreshSetup=function(){
SystemTreePopupBinding.isRefreshAllowed=SystemTreeBinding.clipboard===null;
};
SystemTreeBinding.prototype.handleBroadcast=function(_d7b,arg){
SystemTreeBinding.superclass.handleBroadcast.call(this,_d7b,arg);
switch(_d7b){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
if(arg!=null||this.isFocused){
this._handleCommandBroadcast(_d7b,arg);
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
if(this.isFocused){
this._handleCommandBroadcast(_d7b);
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
var _d7f=tab.perspectiveNode==null;
if(!_d7f){
_d7f=tab.perspectiveNode==this.perspectiveNode;
}
if(_d7f){
var self=this,_d81=tab.getEntityToken();
setTimeout(function(){
if(_d81==null){
self.blurSelectedTreeNodes();
}else{
self._focusTreeNodeByEntityToken(_d81);
}
},250);
}
};
SystemTreeBinding.prototype._focusTreeNodeByEntityToken=function(_d82,_d83){
this.isLockFeatureFocus=true;
var _d84=null;
if(this._entityTokenRegistry.has(_d82)){
var list=this._entityTokenRegistry.get(_d82);
list.each(function(tn){
var _d87=true;
if(tn.node.isTreeLockEnabled()){
_d84=tn;
_d87=false;
}
return _d87;
});
if(_d84!=null){
if(!_d84.isFocused){
this.focusSingleTreeNodeBinding(_d84,true);
}else{
_d84.dispatchAction(TreeNodeBinding.ACTION_FOCUSED);
}
}
}
this.isLockFeatureFocus=false;
if(_d84==null&&_d83!=true){
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._fetchTreeForEntityToken(_d82);
self._focusTreeNodeByEntityToken(_d82,true);
}
Application.unlock(self);
StatusBar.clear();
},0);
}
};
SystemTreeBinding.prototype._fetchTreeForEntityToken=function(_d89){
var _d8a=StageBinding.perspectiveNode.getEntityToken();
var _d8b=this.getOpenSystemNodes();
var map=System.getInvisibleBranch(_d8a,_d89,_d8b);
if(map==null){
this.isLockedToEditor=false;
if(Application.isDeveloperMode){
Dialog.warning("Ouch!","Because the web service failed, tree has disabled the lock-tree-to-editor "+"feature. Otherwise, re-focus would fire the error indefinitely. Please try again.");
}
}else{
if(map.hasEntries()){
var self=this;
var _d8e=this._treeNodeBindings;
var _d8f=new Map();
function fix(_d90,list){
if(!_d90.hasBeenOpened){
if(list.hasEntries()){
list.each(function(node){
if(!_d8e.has(node.getHandle())){
var _d93=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
_d8f.set(node.getHandle(),_d93);
_d90.add(_d93);
}
});
_d90.attachRecursive();
}
}
_d90.open(true);
}
map.each(function(_d94,list){
if(_d8e.has(_d94)){
var _d96=_d8e.get(_d94);
fix(_d96,list);
}else{
if(_d8f.has(_d94)){
var _d97=_d8f.get(_d94);
fix(_d97,list);
}else{
}
}
});
}
}
};
SystemTreeBinding.prototype._handleCommandBroadcast=function(_d98,arg){
switch(_d98){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _d9a=arg;
if(_d9a!=null){
this._invokeServerRefresh(_d9a);
}else{
this._invokeManualRefresh();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
if(SystemTreeBinding.clipboard!=null){
SystemTreeBinding.clipboard.hideDrag();
}
var _d9b=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_CUT;
SystemTreeBinding.clipboard=_d9b;
_d9b.showDrag();
break;
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
var _d9b=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_COPY;
SystemTreeBinding.clipboard=_d9b;
break;
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
this._handlePaste();
break;
}
};
SystemTreeBinding.prototype._invokeServerRefresh=function(_d9c){
if(_d9c!=null&&_d9c=="null"){
if(Application.isDeveloperMode){
alert("Saa har vi balladen.");
}
}
if(this._entityTokenRegistry.has(_d9c)){
var list=this._entityTokenRegistry.get(_d9c).reset();
this._refreshToken=_d9c;
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this._refreshToken);
while(list.hasNext()){
var _d9e=list.getNext();
this._refreshingTreeNodes.set(_d9e.key,true);
setTimeout(function(){
_d9e.refresh(true);
},0);
}
}
};
SystemTreeBinding.prototype._invokeManualRefresh=function(){
var _d9f=this.getFocusedTreeNodeBindings().getFirst();
if(_d9f){
var _da0=_d9f.getLabel();
var _da1=_d9f.getAncestorBindingByLocalName("treenode");
if(_da1){
_d9f=_da1;
}
this._refreshToken=null;
this._refreshingTreeNodes.set(_d9f.key,true);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,null);
if(!StatusBar.state){
var _da2=StringBundle.getString("ui","Website.App.StatusBar.Refreshing");
StatusBar.busy(_da2,[_da0]);
}
_d9f.refresh();
}
};
SystemTreeBinding.prototype._handlePaste=function(){
var _da3=SystemTreeBinding.clipboard;
if(_da3){
var type=_da3.dragType;
var _da5=this.getFocusedTreeNodeBindings().getFirst();
if(_da5.dragAccept){
if(_da5.acceptor.isAccepting(type)){
this._performPaste(_da5);
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteTypeNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteTypeNotAllowed"));
}
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteNotAllowed"));
}
}
};
SystemTreeBinding.prototype._performPaste=function(_da6){
var self=this;
function update(){
MessageQueue.update();
Application.unlock(self);
}
if(_da6.node.hasDetailedDropSupport()){
if(_da6.node.hasChildren()){
var _da8=_da6.node.getChildren();
Dialog.invokeModal(SystemTreeBinding.URL_DIALOG_DETAILEDPASTE,{handleDialogResponse:function(_da9,_daa){
if(_da9==Dialog.RESPONSE_ACCEPT){
Application.lock(self);
var _dab=_daa.get("switch");
var _dac=_daa.get("sibling");
if(_dab=="after"){
_dac++;
}
var _dad=_da6.accept(SystemTreeBinding.clipboard,_dac);
if(_dad){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}},_da8);
}else{
Application.lock(self);
var _dae=_da6.accept(SystemTreeBinding.clipboard,0);
if(_dae){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}else{
Application.lock(self);
var _dae=_da6.accept(SystemTreeBinding.clipboard,0);
if(_dae){
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
SystemTreeBinding.prototype.collapse=function(_daf){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,null);
if(_daf){
this.blurSelectedTreeNodes();
var _db0=this.getRootTreeNodeBindings();
_db0.each(function(_db1){
if(_db1.isContainer&&_db1.isOpen){
_db1.close();
_db1.hasBeenOpened=false;
_db1.empty();
}
});
}else{
SystemTreeBinding.superclass.collapse.call(this);
}
};
SystemTreeBinding.prototype.setLockToEditor=function(_db2){
if(_db2!=this.isLockedToEditor){
this.isLockedToEditor=_db2;
if(_db2){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
}
};
SystemTreeBinding.prototype.getOpenSystemNodes=function(){
var list=new List([StageBinding.perspectiveNode]);
var _db4=this.getRootTreeNodeBindings();
_db4.each(function(_db5){
var _db6=_db5.getOpenSystemNodes();
if(_db6!=null&&_db6.hasEntries()){
list.merge(_db6);
}
});
return list;
};
SystemTreeBinding.prototype.focusSingleTreeNodeBinding=function(_db7){
SystemTreeBinding.superclass.focusSingleTreeNodeBinding.call(this,_db7);
if(_db7!=null){
this._handleSystemTreeFocus();
}
};
SystemTreeBinding.prototype.getCompiledActionProfile=function(){
var temp={};
var _db9=new Map();
var _dba=this.getFocusedTreeNodeBindings();
_db9=_dba.getFirst().node.getActionProfile();
return _db9;
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
SystemTreePopupBinding.prototype.handleBroadcast=function(_dbb,arg){
SystemTreePopupBinding.superclass.handleBroadcast.call(this,_dbb,arg);
switch(_dbb){
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
var _dc0=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_PASTE);
cut.setDisabled(!SystemTreePopupBinding.isCutAllowed);
copy.setDisabled(!SystemTreePopupBinding.isCutAllowed);
_dc0.setDisabled(SystemTreeBinding.clipboard==null);
};
SystemTreePopupBinding.prototype._setupRefreshItem=function(){
var _dc1=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_REFRESH);
_dc1.setDisabled(!SystemTreePopupBinding.isRefreshAllowed);
};
SystemTreePopupBinding.prototype.handleAction=function(_dc2){
SystemTreePopupBinding.superclass.handleAction.call(this,_dc2);
switch(_dc2.type){
case MenuItemBinding.ACTION_COMMAND:
var _dc3=_dc2.target;
var _dc4=_dc3.associatedSystemAction;
if(_dc4){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _dc6=list.getFirst();
var _dc7=_dc6.node;
}
SystemAction.invoke(_dc4,_dc7);
}else{
var cmd=_dc3.getProperty("cmd");
if(cmd){
this._handleCommand(cmd);
}
}
break;
}
};
SystemTreePopupBinding.prototype._handleCommand=function(cmd){
var _dca=null;
switch(cmd){
case SystemTreePopupBinding.CMD_CUT:
_dca=BroadcastMessages.SYSTEMTREEBINDING_CUT;
break;
case SystemTreePopupBinding.CMD_COPY:
_dca=BroadcastMessages.SYSTEMTREEBINDING_COPY;
break;
case SystemTreePopupBinding.CMD_PASTE:
_dca=BroadcastMessages.SYSTEMTREEBINDING_PASTE;
break;
case SystemTreePopupBinding.CMD_REFRESH:
_dca=BroadcastMessages.SYSTEMTREEBINDING_REFRESH;
break;
}
if(_dca){
setTimeout(function(){
EventBroadcaster.broadcast(_dca);
},0);
}
};
SystemTreePopupBinding.prototype.disposeContent=function(){
var _dcb=new List(DOMUtil.getElementsByTagName(this.bindingElement,"menugroup"));
while(_dcb.hasNext()){
var _dcc=UserInterface.getBinding(_dcb.getNext());
if(!_dcc.getProperty("rel")){
_dcc.dispose();
}
}
};
SystemTreePopupBinding.prototype.constructContent=function(){
if(this._actionProfile!=null){
var doc=this.bindingDocument;
var _dce=new List();
var self=this;
this._actionProfile.each(function(_dd0,list){
var _dd2=MenuGroupBinding.newInstance(doc);
list.each(function(_dd3){
var _dd4=self.getMenuItemBinding(_dd3);
_dd2.add(_dd4);
});
_dce.add(_dd2);
});
_dce.reverse();
while(_dce.hasNext()){
this._bodyBinding.addFirst(_dce.getNext());
}
this._bodyBinding.attachRecursive();
}
};
SystemTreePopupBinding.prototype.getMenuItemBinding=function(_dd5){
var _dd6=MenuItemBinding.newInstance(this.bindingDocument);
var _dd7=_dd5.getLabel();
var _dd8=_dd5.getToolTip();
var _dd9=_dd5.getImage();
var _dda=_dd5.getDisabledImage();
var _ddb=_dd5.isCheckBox();
if(_dd7){
_dd6.setLabel(_dd7);
}
if(_dd8){
_dd6.setToolTip(_dd8);
}
if(_dd9){
_dd6.imageProfile=new ImageProfile({image:_dd9,imageDisabled:_dda});
}
if(_ddb){
_dd6.setType(MenuItemBinding.TYPE_CHECKBOX);
if(_dd5.isChecked()){
_dd6.check(true);
}
}
if(_dd5.isDisabled()){
_dd6.disable();
}
_dd6.associatedSystemAction=_dd5;
return _dd6;
};
SystemTreePopupBinding.prototype.snapToMouse=function(e){
var node=e.target?e.target:e.srcElement;
var name=DOMUtil.getLocalName(node);
var _ddf=null;
if(name!="tree"){
switch(name){
case "treenode":
break;
default:
node=DOMUtil.getAncestorByLocalName("treenode",node);
if(node!=null){
_ddf=UserInterface.getBinding(node);
if(_ddf.isDisabled){
_ddf=null;
}
}
break;
}
if(_ddf!=null&&_ddf.node!=null&&_ddf.node.getActionProfile()!=null){
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
var _de0=this.node.getLabel();
if(_de0){
this.setLabel(_de0);
}
var _de1=this.node.getToolTip();
if(_de1){
this.setToolTip(_de1);
}
var _de2=this.node.getHandle();
if(_de2){
this.setHandle(_de2);
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
var _de5="";
var list=this.node.getDragAccept();
while(list.hasNext()){
_de5+=list.getNext();
if(list.hasNext()){
_de5+=" ";
}
}
this.setProperty("dragaccept",_de5);
}
SystemTreeNodeBinding.superclass._initializeBindingDragAndDropFeatures.call(this);
};
SystemTreeNodeBinding.prototype.handleAction=function(_de7){
SystemTreeNodeBinding.superclass.handleAction.call(this,_de7);
switch(_de7.type){
case SystemTreeNodeBinding.ACTION_REFRESHED:
if(_de7.target==this){
if(!this.isOpen){
this.hasBeenOpened=false;
_de7.consume();
}
}
break;
}
};
SystemTreeNodeBinding.prototype.handleBroadcast=function(_de8,arg){
SystemTreeNodeBinding.superclass.handleBroadcast.call(this,_de8,arg);
switch(_de8){
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
var _deb=null;
var _dec=this.node.getImageProfile();
if(_dec){
if(this.isOpen){
_deb=_dec.getActiveImage();
}else{
_deb=_dec.getDefaultImage();
}
}
if(!_deb){
_deb=SystemTreeNodeBinding.superclass.computeImage.call(this);
}
return _deb;
};
SystemTreeNodeBinding.prototype.open=function(_ded){
var _dee=this.isContainer&&!this.isOpen;
var _def=!this.hasBeenOpened;
SystemTreeNodeBinding.superclass.open.call(this);
if(_dee&&(_def||SystemTreeBinding.HAS_NO_MEMORY)&&_ded!=true){
this.refresh();
if(this._isForcedOpen){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN,this);
this._isForcedOpen=false;
}
}
};
SystemTreeNodeBinding.prototype.refresh=function(){
var _df0=null;
if(this.isContainer){
_df0=this.getOpenSystemNodes();
}
this.isRefreshing=true;
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._performRefresh(_df0);
Application.unlock(self);
StatusBar.clear();
}
},0);
};
SystemTreeNodeBinding.prototype._performRefresh=function(_df2){
if(_df2!=null){
this._refreshBranch(_df2);
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
var _df3=new List();
var _df4=this.node.getChildren();
this.empty();
if(_df4.hasEntries()){
this._insertTreeNodesRegulated(_df4);
}
};
SystemTreeNodeBinding.prototype._insertTreeNodesRegulated=function(_df5){
var _df6=0;
while(_df5.hasEntries()&&_df6<=SystemTreeNodeBinding.MAX_CHILD_IMPORT){
var _df7=SystemTreeNodeBinding.newInstance(_df5.extractFirst(),this.bindingDocument);
this.add(_df7);
_df7.attach();
_df6++;
}
if(_df5.hasEntries()){
this._insertBufferTreeNode(_df5);
}
};
SystemTreeNodeBinding.prototype._insertBufferTreeNode=function(_df8){
alert("Max treenode count reached. This is not handled!");
alert("TODO: SystemTreeNodeBinding#._insertBufferTreeNode");
};
SystemTreeNodeBinding.prototype._refreshBranch=function(list){
var _dfa=this.node.getDescendantBranch(list);
if(_dfa.hasEntries()){
this.XXX(_dfa);
}
};
SystemTreeNodeBinding.prototype.XXX=function(_dfb){
var self=this;
var map=new Map();
this.empty();
_dfb.each(function(key,_dff){
if(_dff.hasEntries()){
_dff.each(function(node){
var _e01=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e01);
if(map.has(key)){
var _e02=map.get(key);
_e02.add(_e01);
_e02.isOpen=true;
_e02.hasBeenOpened=true;
}else{
if(key==self.node.getHandle()){
self.add(_e01);
}else{
}
}
});
}
});
this.attachRecursive();
_dfb.dispose();
map.dispose();
};
SystemTreeNodeBinding.prototype.getOpenDescendants=function(){
var _e03=new TreeCrawler();
var _e04=new List();
_e03.mode=TreeCrawler.MODE_GETOPEN;
_e03.crawl(this.bindingElement,_e04);
if(_e04.hasEntries()){
_e04.extractFirst();
}
_e03.dispose();
return _e04;
};
SystemTreeNodeBinding.prototype.getOpenSystemNodes=function(){
var _e05=null;
var list=this.getOpenDescendants();
if(list.hasEntries()){
_e05=new List([this.node]);
list.each(function(_e07){
_e05.add(_e07.node);
});
}
return _e05;
};
SystemTreeNodeBinding.prototype.updateClassNames=function(){
if(!this.isRefreshing){
SystemTreeNodeBinding.superclass.updateClassNames.call(this);
}
};
SystemTreeNodeBinding.prototype.acceptTreeNodeBinding=function(_e08,_e09){
var _e0a=(SystemTreeBinding.clipboardOperation==SystemTreePopupBinding.CMD_COPY);
if(_e08 instanceof SystemTreeNodeBinding){
if(TreeService.ExecuteDropElementAction){
TreeService.ExecuteDropElementAction(_e08.node.getData(),this.node.getData(),_e09?_e09:this.containingTreeBinding.getDropIndex(),Application.CONSOLE_ID,_e0a);
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
SystemTreeNodeBinding.newInstance=function(node,_e0e){
var _e0f=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_e0e);
var _e10=UserInterface.registerBinding(_e0f,SystemTreeNodeBinding);
_e10.node=node;
return _e10;
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
SystemPageBinding.prototype.setPageArgument=function(_e11){
this.node=_e11;
SystemPageBinding.superclass.setPageArgument.call(this,_e11);
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
var _e12=this.node.getChildren();
if(_e12.hasEntries()){
while(_e12.hasNext()){
var node=SystemTreeNodeBinding.newInstance(_e12.getNext(),this.bindingDocument);
this._tree.add(node);
node.attach();
}
}
};
SystemPageBinding.prototype._refreshTree=function(){
var _e14=this._tree._treeBodyBinding.getChildBindingsByLocalName("treenode");
_e14.each(function(root){
if(!root.isContainer){
root.isOpen=true;
}
});
var _e16=new TreeCrawler();
var _e17=new List();
_e16.mode=TreeCrawler.MODE_GETOPEN;
_e16.crawl(this.bindingElement,_e17);
_e16.dispose();
var list=new List([this.node]);
_e17.each(function(_e19){
list.add(_e19.node);
});
this._tree.empty();
var _e1a=this.node.getDescendantBranch(list);
if(_e1a.hasEntries()){
var self=this;
var map=new Map();
_e1a.each(function(key,_e1e){
_e1e.each(function(node){
var _e20=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e20);
if(map.has(key)){
var _e21=map.get(key);
_e21.add(_e20);
_e21.isOpen=true;
}else{
if(key==self.node.getHandle()){
self._tree.add(_e20);
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
SystemPageBinding.prototype.handleAction=function(_e22){
SystemPageBinding.superclass.handleAction.call(this,_e22);
switch(_e22.type){
case ButtonBinding.ACTION_COMMAND:
var _e23=_e22.target;
switch(_e23.getID()){
case "locktreebutton":
this._tree.setLockToEditor(_e23.isChecked);
break;
case "collapsebutton":
this._tree.collapse();
break;
}
break;
}
};
SystemPageBinding.prototype.handleBroadcast=function(_e24,arg){
SystemPageBinding.superclass.handleBroadcast.call(this,_e24,arg);
switch(_e24){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _e26=arg;
if(this.node&&this.node.getEntityToken()==_e26){
try{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,_e26);
var self=this;
Application.lock(this);
setTimeout(function(){
self._refreshTree();
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,_e26);
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
StageContainerBinding.prototype.handleBroadcast=function(_e28,arg){
StageContainerBinding.superclass.handleBroadcast.call(this,_e28,arg);
var _e2a=this.bindingWindow.WindowManager;
switch(_e28){
case BroadcastMessages.APPLICATION_OPERATIONAL:
this.subscribe(_e2a.WINDOW_RESIZED_BROADCAST);
this._fit();
this.reflex();
break;
case _e2a.WINDOW_RESIZED_BROADCAST:
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
var _e2c=this.bindingWindow.WindowManager;
this.bindingElement.style.width=_e2c.getWindowDimensions().w+"px";
};
StageBinding.prototype=new FocusBinding;
StageBinding.prototype.constructor=StageBinding;
StageBinding.superclass=FocusBinding.prototype;
StageBinding.bindingInstance=null;
StageBinding.perspectiveNode=null;
StageBinding.entityToken=null;
StageBinding.handleViewPresentation=function(_e2d){
if(StageBinding.isViewOpen(_e2d)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_e2d);
}else{
var _e2e=ViewDefinitions[_e2d];
StageBinding.presentViewDefinition(_e2e);
}
};
StageBinding.isViewOpen=function(_e2f){
return StageBinding.bindingInstance._activeViewDefinitions[_e2f]!=null;
};
StageBinding.presentViewDefinition=function(_e30){
if(_e30.label!=null){
var _e31=StringBundle.getString("ui","Website.App.StatusBar.Opening");
StatusBar.busy(_e31,[_e30.label]);
}else{
StatusBar.busy();
}
StageBinding.bindingInstance._presentViewDefinition(_e30);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,{handleBroadcast:function(_e33,arg){
if(arg==root.getEntityToken()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
}
}});
var _e35=System.getPerspectiveNodes();
if(_e35.hasEntries()){
this._initializeSystemViewDefinitions(_e35);
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
var _e37=null;
if(LocalStore.isEnabled){
_e37=LocalStore.getProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE);
}
if(_e37&&ViewDefinitions[_e37]){
alert("StageBinding#_initializeWorkbenchLayout !!!!");
this._explorerBinding.setSelectionByHandle(unescape(_e37));
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
var _e39=root.getActionProfile();
if(_e39&&_e39.hasEntries()){
var _e3a=top.app.bindingMap.toolsmenugroup;
if(_e3a){
_e39.each(function(_e3b,list){
list.each(function(_e3d){
var item=MenuItemBinding.newInstance(_e3a.bindingDocument);
item.setLabel(_e3d.getLabel());
item.setToolTip(_e3d.getToolTip());
item.setImage(_e3d.getImage());
item.setDisabled(_e3d.isDisabled());
item.associatedSystemAction=_e3d;
var _e3f=_e3a;
var tag=_e3d.getTag();
if(tag!=null){
switch(tag){
case SystemAction.TAG_CHANGEFROMLANGUAGE:
_e3f=top.app.bindingMap.translationsmenugroup;
break;
}
}
_e3f.add(item);
});
});
_e3a.attachRecursive();
}
}
};
StageBinding.prototype._initializeSystemViewDefinitions=function(_e41){
while(_e41.hasNext()){
var node=_e41.getNext();
var _e43=node.getHandle();
ViewDefinitions[_e43]=new SystemViewDefinition(node);
}
};
StageBinding.prototype.handleAction=function(_e44){
StageBinding.superclass.handleAction.call(this,_e44);
var _e45=_e44.target;
switch(_e44.type){
case StageDecksBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._decksBinding=_e45;
this._inflateBinding(_e45);
_e44.consume();
break;
case ExplorerBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._explorerBinding=_e45;
this._inflateBinding(_e45);
_e44.consume();
break;
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
if(!Application.isOperational){
ProgressBarBinding.notch(5);
}
this.handlePerspectiveChange(_e45);
_e44.consume();
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_e45 instanceof DockBinding){
switch(_e45.reference){
case DockBinding.START:
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
this._dockBindings.set(_e45.reference,_e45);
break;
}
this.handleAttachedDock(_e45);
_e44.consume();
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_e45 instanceof DockBinding){
this.handleSelectedDockTab(_e45.getSelectedTabBinding());
_e44.consume();
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
_e44.consume();
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
_e44.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_e44);
};
StageBinding.prototype.handleBroadcast=function(_e47,arg){
StageBinding.superclass.handleBroadcast.call(this,_e47,arg);
switch(_e47){
case BroadcastMessages.VIEW_OPENED:
Application.unlock(this);
break;
case BroadcastMessages.VIEW_CLOSED:
var _e49=arg;
this._dontView(_e49);
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
StageBinding.prototype._showStart=function(_e4b){
if(_e4b!=this._isShowingStart){
var view=ViewBinding.getInstance("Composite.Management.Start");
var dock=this._dockBindings.get(DockBinding.START);
var _e4e=this.bindingWindow.bindingMap.maindecks;
if(_e4b){
_e4e.select("startdeck");
view.show();
}else{
view.hide();
_e4e.select("stagedeck");
if(dock!=null&&dock.isActive){
dock.deActivate();
}
}
this._isShowingStart=_e4b;
}
};
StageBinding.prototype._inflateBinding=function(_e4f){
for(var _e50 in ViewDefinitions){
var _e51=ViewDefinitions[_e50];
if(_e51 instanceof SystemViewDefinition){
_e4f.mountDefinition(_e51);
}
}
var _e52=(this._decksBinding&&this._explorerBinding);
if(_e52){
var self=this;
setTimeout(function(){
self._renameThisMethod();
},0);
}
};
StageBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _e55=new StageCrawler();
_e55.mode=mode;
_e55.crawl(this.bindingElement);
_e55.dispose();
};
StageBinding.prototype.handlePerspectiveChange=function(_e56){
var _e57=_e56.getSelectionHandle();
this._decksBinding.setSelectionByHandle(_e57);
if(LocalStore.isEnabled){
LocalStore.setProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE,escape(_e57));
}
};
StageBinding.prototype.handleAttachedDock=function(_e58){
var _e59=_e58.getTabBindings();
if(_e59.hasEntries()){
while(_e59.hasNext()){
var _e5a=_e59.getNext();
var _e5b=_e5a.getHandle();
if(_e5b){
if(_e5b=="Composite.Management.Start"&&(!Application.hasStartPage||!Application.hasExternalConnection)){
}else{
var _e5c=ViewDefinitions[_e5b];
if(_e5c){
this._view(_e58,_e5a,_e5c,false);
}else{
alert("StageBinding: no such predefined viewdefinition ("+_e5b+")");
}
}
}
}
}
};
StageBinding.prototype._presentViewDefinition=function(_e5d){
var _e5e=null;
var _e5f=false;
switch(_e5d.position){
case Dialog.MODAL:
_e5e=app.bindingMap.masterdialogset.getModalInstance();
break;
case Dialog.NON_MODAL:
_e5e=app.bindingMap.masterdialogset.getInstance();
break;
default:
if(this._dockBindings.hasEntries()){
switch(_e5d.position){
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
_e5e=this._dockBindings.get(_e5d.position);
break;
default:
var _e60=this._decksBinding.getSelectedDeckBinding();
_e5e=_e60.getDockBindingByReference(_e5d.position);
if(this._isShowingStart){
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}else{
if(this._isShowingDefaultStart){
var _e61=this.bindingWindow.bindingMap.maindecks;
_e61.select("stagedeck");
this._isShowingDefaultStart=false;
}
}
break;
}
}else{
_e5f=true;
}
break;
}
if(!_e5f){
if(_e5e!=null){
this._view(_e5e,null,_e5d,true);
}else{
throw "StageBinding: Could not position view: "+_e5d.handle;
}
}
};
StageBinding.prototype._view=function(_e62,_e63,_e64,_e65){
var _e66=_e64.handle;
if(_e64.isMutable){
_e66+=KeyMaster.getUniqueKey();
}
if(this._activeViewDefinitions[_e66]){
var _e67=ViewBinding.getInstance(_e66);
if(_e67!=null){
_e67.update();
}else{
this.logger.error("Could not update ViewBinding (declared open): \n"+_e66);
}
}else{
this._activeViewDefinitions[_e66]=_e64;
Application.lock(this);
switch(_e62.constructor){
case DockBinding:
if(_e65){
_e62.prepareNewView(_e64);
}else{
_e62.prepareOpenView(_e64,_e63);
}
break;
case StageDialogBinding:
if(_e65){
_e62.prepareNewView(_e64);
}
break;
}
}
};
StageBinding.prototype._dontView=function(_e68){
if(this._activeViewDefinitions[_e68]!=null){
delete this._activeViewDefinitions[_e68];
}else{
this.logger.debug("Could not unregister active view: "+_e68);
}
};
StageBinding.prototype.handleSelectedDockTab=function(_e69){
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
this.addFilter(function(_e6b){
var _e6c=UserInterface.getBinding(_e6b);
var _e6d=null;
if(_e6c){
switch(_e6c.constructor){
case StageSplitBoxBinding:
case StageSplitPanelBinding:
case StageSplitterBinding:
switch(self.mode){
case StageCrawler.MODE_MAXIMIZE:
_e6c.handleMaximization();
break;
case StageCrawler.MODE_UNMAXIMIZE:
_e6c.handleUnMaximization();
break;
}
break;
case DockBinding:
_e6d=NodeCrawler.SKIP_NODE;
break;
}
}
return _e6d;
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
var _e6e=null;
this._dialogs.each(function(_e6f){
if(!_e6f.isVisible){
_e6e=_e6f;
}
return _e6e!=null;
});
if(!_e6e){
this._newInstance();
_e6e=this._dialogs.getLast();
}
_e6e.setModal(false);
return _e6e;
};
StageDialogSetBinding.prototype.getModalInstance=function(){
var _e70=this.getInstance();
_e70.setModal(true);
return _e70;
};
StageDialogSetBinding.prototype._newInstance=function(){
var _e71=this.add(StageDialogBinding.newInstance(this.bindingDocument));
this._dialogs.add(_e71);
_e71.attach();
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
StageDialogBinding.prototype.prepareNewView=function(_e72){
if(_e72 instanceof DialogViewDefinition){
var _e73=ViewBinding.newInstance(this.bindingDocument);
_e73.setDefinition(_e72);
_e73.setType(ViewBinding.TYPE_DIALOGVIEW);
if(_e72.handler){
if(Interfaces.isImplemented(IDialogResponseHandler,_e72.handler)){
this._dialogResponseHandler=_e72.handler;
}else{
throw "IDialogResponseHandler not implemented";
}
}
this._viewBinding=_e73;
this._body.add(_e73);
_e73.attach();
_e73.initialize();
}
};
StageDialogBinding.prototype.handleAction=function(_e74){
StageDialogBinding.superclass.handleAction.call(this,_e74);
var _e75=_e74.target;
switch(_e74.type){
case PageBinding.ACTION_INITIALIZED:
this._handleInitializedPageBinding(_e75);
_e74.consume();
break;
case PageBinding.ACTION_DETACHED:
if(_e75.bindingDocument==this._viewBinding.getContentDocument()){
this._pageBinding=null;
}
_e74.consume();
break;
case DialogPageBinding.ACTION_RESPONSE:
if(_e75.response){
this._handleDialogPageResponse(_e75);
}
_e74.consume();
break;
case Binding.ACTION_INVALID:
this._disableDialogAcceptButton(true);
_e74.consume();
break;
case Binding.ACTION_VALID:
this._disableDialogAcceptButton(false);
_e74.consume();
break;
case ViewBinding.ACTION_ONCLOSE:
this.close();
_e75.dispose();
_e74.consume();
break;
case ViewBinding.ACTION_CLOSED:
this._isFirstPage=true;
_e74.consume();
break;
case ErrorBinding.ACTION_INITIALIZE:
_e74.consume();
break;
case PageBinding.ACTION_UPDATING:
this._isUpdating=true;
_e74.consume();
break;
case PageBinding.ACTION_UPDATED:
if(this._isUpdating){
this._isUpdating=false;
this._fit();
}
_e74.consume();
break;
case Binding.ACTION_UPDATED:
if(!this._isUpdating){
this._fit();
}
_e74.consume();
break;
case DialogBinding.ACTION_CLOSE:
if(_e75==this){
this._viewBinding.dispose();
this.defaultSetup();
}
break;
}
};
StageDialogBinding.prototype.handleBroadcast=function(_e76,arg){
StageDialogBinding.superclass.handleBroadcast.call(this,_e76,arg);
switch(_e76){
case BroadcastMessages.KEY_ESCAPE:
if(this.isVisible==true){
if(!PopupBinding.hasActiveInstances()){
this._defaultClose();
}
}
break;
}
};
StageDialogBinding.prototype._fit=function(_e78){
var _e79=new FitnessCrawler();
var list=new List();
if(_e78){
_e79.mode=FitnessCrawler.MODE_BRUTAL;
}
_e79.crawl(this.bindingElement,list);
_e79.dispose();
if(list.hasEntries()){
list.reverse();
list.each(function(_e7b){
_e7b.fit(_e78);
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
var _e7c=this.getDimension().h;
this.reflex(true);
var self=this;
if(this.getDimension().h==_e7c){
var self=this;
setTimeout(function(){
self.reflex(true);
},0);
}
}
};
StageDialogBinding.prototype._handleContextMenuItemBinding=function(_e7e){
var cmd=_e7e.getProperty("cmd");
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
StageDialogBinding.prototype._handleInitializedPageBinding=function(_e80){
if(_e80.bindingDocument==this._viewBinding.getContentDocument()){
if(_e80 instanceof DialogPageBinding){
if(this._pageBinding==null){
this._parsePageBinding(_e80);
}
this._pageBinding=_e80;
if(_e80.height=="auto"){
_e80.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_e80);
_e80.enableAutoHeightLayoutMode(false);
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
if(_e80.isDialogSubPage){
this._pageBinding.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_e80);
this._pageBinding.enableAutoHeightLayoutMode(false);
this._fit(true);
this.reflex(true);
}
}
this._isFirstPage=false;
};
StageDialogBinding.prototype._disableDialogAcceptButton=function(_e81){
var _e82=this._viewBinding.getContentDocument().getElementById("dialogacceptbutton");
if(_e82){
var _e83=UserInterface.getBinding(_e82);
_e83.setDisabled(_e81);
}
};
StageDialogBinding.prototype._handleDialogPageResponse=function(_e84){
if(this._dialogResponseHandler!=null){
this._dialogResponseHandler.handleDialogResponse(_e84.response,_e84.result!=null?_e84.result:null);
}
this.close();
};
StageDialogBinding.prototype.handleInvokedControl=function(_e85){
if(_e85.controlType==ControlBinding.TYPE_CLOSE){
this._defaultClose();
}
StageDialogBinding.superclass.handleInvokedControl.call(this,_e85);
};
StageDialogBinding.prototype.buildDescendantBindings=function(){
StageDialogBinding.superclass.buildDescendantBindings.call(this);
this._titlebar.setContextMenu(app.bindingMap.dialogtitlebarpopup);
var self=this;
this._titlebar.handleAction=function(_e87){
switch(_e87.type){
case MenuItemBinding.ACTION_COMMAND:
if(_e87.listener==this.contextMenuBinding){
self._handleContextMenuItemBinding(_e87.target);
}
break;
}
};
};
StageDialogBinding.prototype._parsePageBinding=function(_e88){
var _e89=_e88.label;
var _e8a=_e88.image;
var _e8b=_e88.width;
var _e8c=_e88.height;
var _e8d=_e88.controls;
var _e8e=_e88.isResizable;
if(_e89){
this.setLabel(_e89);
}
if(_e8a){
this.setImage(_e8a);
}
if(_e8b||_e8c){
var old=this.getDimension();
var nev=new Dimension();
if(this._isFirstPage){
nev.w=_e8b?_e8b:old.w;
}else{
nev.w=old.w;
}
nev.h=(_e8c!=null&&_e8c!="auto")?_e8c:old.h;
this.setDimension(nev);
}
if(_e8d){
this.controlBindings[ControlBinding.TYPE_MAXIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_MINIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_CLOSE].hide();
var type,_e92=new List(_e8d.split(" "));
while((type=_e92.getNext())!=null){
this.controlBindings[type].show();
}
}
if(_e8e!=this._isResizable){
this.setResizable(_e8e);
}
if(_e8c=="auto"){
this._fixAutoHeight(_e88);
}
if(_e88==this._pageBinding){
this.centerOnScreen();
}
if(!this.isOpen){
this.reflex(true);
this.open(true);
}
};
StageDialogBinding.prototype._fixAutoHeight=function(_e93){
var dim=this.getDimension();
var _e95=0;
var _e96=0;
if(_e93.isDialogSubPage){
_e93=this._pageBinding;
}
if(this._isFirstPage){
_e95=_e93.width!=null?_e93.width:dim.w;
}else{
_e95=dim.w;
}
_e96=_e93.bindingElement.offsetHeight;
_e96+=this._titlebar.bindingElement.offsetHeight;
_e96+=4;
if(_e96<dim.h){
_e96=dim.h;
}
if(_e93.minheight!=null){
if(_e96<_e93.minheight){
_e96=_e93.minheight;
}
}
this.setDimension(new Dimension(_e95,_e96));
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
StageDialogBinding.newInstance=function(_e99){
var _e9a=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_e99);
var _e9b=UserInterface.registerBinding(_e9a,StageDialogBinding);
_e9b.setProperty("controls","minimize maximize close");
return _e9b;
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
this.addFilter(function(_e9c,list){
var _e9e=null;
var _e9f=UserInterface.getBinding(_e9c);
if(!_e9f.isVisible){
_e9e=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _e9e;
});
this.addFilter(function(_ea0,list){
var _ea2=null;
var _ea3=UserInterface.getBinding(_ea0);
if(_ea3.isAttached){
if(Interfaces.isImplemented(IFit,_ea3)){
if(!_ea3.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_ea3);
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
StageDecksBinding.prototype.mountDefinition=function(_ea4){
var _ea5=StageDeckBinding.newInstance(this.bindingDocument);
_ea5.handle=_ea4.handle;
_ea5.perspectiveNode=_ea4.node;
this._decks[_ea5.handle]=_ea5;
this.add(_ea5);
_ea5.attach();
};
StageDecksBinding.prototype.setSelectionByHandle=function(_ea6){
var _ea7=this._decks[_ea6];
StageBinding.perspectiveNode=_ea7.perspectiveNode;
this.select(_ea7);
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
StageDeckBinding.prototype.handleAction=function(_ea8){
StageDeckBinding.superclass.handleAction.call(this,_ea8);
var _ea9=_ea8.target;
switch(_ea8.type){
case WindowBinding.ACTION_LOADED:
if(_ea9==this.windowBinding){
top.app.bindingMap.stagedeckscover.hide();
this.removeActionListener(WindowBinding.ACTION_LOADED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_OPENED);
this.dispatchAction(StageDeckBinding.ACTION_LOADED);
_ea8.consume();
}
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_ea9 instanceof DockBinding){
this._dockBindings.set(_ea9.reference,_ea9);
_ea9.perspectiveNode=this.perspectiveNode;
}
break;
case StageSplitBoxBinding.ACTION_DOCK_OPENED:
this._dockBindingCount++;
if(this._dockBindingCount==2){
this._dockBindings.get("main").showControls(true);
}
_ea8.consume();
break;
case StageSplitBoxBinding.ACTION_DOCK_EMPTIED:
this._dockBindingCount--;
if(this._dockBindingCount==1){
this._dockBindings.get("main").showControls(false);
}
_ea8.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_ea8);
StageDeckBinding.superclass.handleAction.call(this,_ea8);
};
StageDeckBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _eab=new StageCrawler();
_eab.mode=mode;
_eab.crawl(this.windowBinding.getContentDocument().body);
_eab.dispose();
};
StageDeckBinding.prototype.select=function(){
if(!this._isStageDeckBindingInitialized){
this.initialize();
}
StageDeckBinding.superclass.select.call(this);
};
StageDeckBinding.prototype.getDockBindingByReference=function(_eac){
return this._dockBindings.get(_eac);
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
StageDeckBinding.newInstance=function(_ead){
var _eae=DOMUtil.createElementNS(Constants.NS_UI,"ui:stagedeck",_ead);
var _eaf=UserInterface.registerBinding(_eae,StageDeckBinding);
return _eaf;
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
StageSplitBoxBinding.prototype.handleAction=function(_eb0){
StageSplitBoxBinding.superclass.handleAction.call(this,_eb0);
StageBoxAbstraction.handleAction.call(this,_eb0);
var _eb1=_eb0.target;
var _eb2=null;
var _eb3=null;
switch(_eb0.type){
case DockBinding.ACTION_EMPTIED:
_eb3=this.getChildBindingByLocalName("splitter");
if(_eb3.isVisible){
_eb3.hide();
}
_eb2=this.getDescendantBindingsByLocalName("dock");
if(_eb2.getFirst().isEmpty&&_eb2.getLast().isEmpty){
if(_eb2.getFirst().type!=DockBinding.TYPE_EDITORS){
this.dispatchAction(StageSplitBoxBinding.ACTION_HIDE);
this.hide();
}
}else{
this.flex();
this.invokeLayout();
}
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
_eb0.consume();
break;
case DockBinding.ACTION_OPENED:
_eb2=this.getDescendantBindingsByLocalName("dock");
if(!_eb2.getFirst().isEmpty&&!_eb2.getLast().isEmpty){
_eb3=this.getChildBindingByLocalName("splitter");
if(!_eb3.isVisible){
_eb3.show();
}
}
if(!this.isVisible){
this.show();
this.dispatchAction(StageSplitBoxBinding.ACTION_SHOW);
}
this.flex();
this.invokeLayout();
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_OPENED);
_eb0.consume();
break;
case StageSplitBoxBinding.ACTION_HIDE:
if(_eb1!=this){
_eb3=this.getChildBindingByLocalName("splitter");
if(_eb3.isVisible){
_eb3.hide();
}
this.invokeLayout();
_eb0.consume();
}
break;
case StageSplitBoxBinding.ACTION_SHOW:
if(_eb1!=this){
var _eb4=this.getChildBindingsByLocalName("splitpanel");
if(_eb4.getFirst().isVisible&&_eb4.getLast().isVisible){
_eb3=this.getChildBindingByLocalName("splitter");
if(!_eb3.isVisible){
_eb3.show();
}
}
this.invokeLayout();
_eb0.consume();
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
StageSplitBoxBinding.prototype.handleCrawler=function(_eb5){
StageSplitBoxBinding.superclass.handleCrawler.call(this,_eb5);
switch(_eb5.id){
case FlexBoxCrawler.ID:
if(this.isMaximizedForReal==false){
_eb5.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
};
StageSplitBoxBinding.prototype.hasBothPanelsVisible=function(){
var _eb6=this.getChildBindingsByLocalName("splitpanel");
return _eb6.getFirst().isVisible&&_eb6.getLast().isVisible;
};
StageSplitBoxBinding.prototype.hasBothPanelsFixed=function(){
var _eb7=this.getChildBindingsByLocalName("splitpanel");
return _eb7.getFirst().isFixed&&_eb7.getLast().isFixed;
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
StageSplitPanelBinding.prototype.handleAction=function(_eb8){
StageSplitPanelBinding.superclass.handleAction.call(this,_eb8);
StageBoxAbstraction.handleAction.call(this,_eb8);
switch(_eb8.type){
case DockBinding.ACTION_EMPTIED:
case StageSplitBoxBinding.ACTION_HIDE:
if(this.isMaximized==true){
this.normalize();
}
var dock=this.getContainedDock();
if(dock&&dock.type==DockBinding.TYPE_EDITORS){
this._invisibilize(true);
if(_eb8.type==StageSplitBoxBinding.ACTION_HIDE){
_eb8.consume();
}
}else{
this.hide();
if(this.isFixed==true){
this.setFix(false);
}
}
if(_eb8.type==DockBinding.ACTION_EMPTIED){
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
if(_eb8.type==StageSplitBoxBinding.ACTION_SHOW){
_eb8.consume();
}
}else{
this.show();
if(this.isFixed==true){
this.setFix(false);
}
}
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
var _ebb=_eb8.target;
if(_ebb!=this&&_ebb.getContainedDock()){
if(this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_VERTICAL){
var _ebc=_ebb._containingSplitBoxBinding;
if(_ebc.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL){
var _ebd=_ebc.getChildBindingsByLocalName("splitpanel");
var _ebe=_ebd.getFirst();
var _ebf=_ebd.getLast();
if(this.isFixed==true){
if(!_ebe.isFixed||!_ebf.isFixed||(!_ebc.hasBothPanelsVisible()&&_ebb.isMinimizedForReal)){
this.setFix(false);
_eb8.consume();
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
}
}else{
if(_ebc.hasBothPanelsFixed()||(!_ebc.hasBothPanelsVisible()&&_ebb.isMinimizedForReal)){
this.setFix(_ebb.getContainedDock().getHeight());
_eb8.consume();
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
var _ec0=this.getContainedDock();
if(_ec0){
if(this.isMaximizePrepared==true){
}else{
_ec0.interceptDisplayChange(false);
}
}
};
StageSplitPanelBinding.prototype.handleUnMaximization=function(){
StageBoxAbstraction.handleUnMaximization.call(this);
var _ec1=this.getContainedDock();
if(_ec1){
if(_ec1.type==DockBinding.TYPE_EDITORS){
if(_ec1.isEmpty){
this._invisibilize(true);
}
}
if(this.isMaximized==true){
this.normalize();
}else{
_ec1.interceptDisplayChange(true);
}
}
};
StageSplitPanelBinding.prototype.maximize=function(){
if(this.isMinimized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.maximize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
var _ec2=this.getContainedDock();
if(_ec2){
_ec2.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MAXIMIZED,_ec2);
}
};
StageSplitPanelBinding.prototype.minimize=function(){
var _ec3=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _ec4=this.getContainedDock();
if(_ec4){
_ec4.collapse(_ec3);
if(!_ec3){
this.setFix(_ec4.getHeight());
}else{
this.setFix(_ec4.getWidth());
}
}
if(this.isMaximized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.minimize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_ec4&&_ec4.isActive){
_ec4.deActivate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MINIMIZED,_ec4);
}
};
StageSplitPanelBinding.prototype.normalize=function(_ec5){
var _ec6=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _ec7=this.getContainedDock();
if(_ec7){
if(this.isMinimized==true){
_ec7.unCollapse(_ec6);
this.setFix(false);
}
}
StageSplitPanelBinding.superclass.normalize.call(this);
if(!_ec5){
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_ec7){
_ec7.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_NORMALIZED,_ec7);
}
}
};
StageSplitPanelBinding.prototype.getContainedDock=function(){
return this.getChildBindingByLocalName("dock");
};
StageSplitPanelBinding.prototype.invisibilize=function(_ec8){
var _ec9=true;
var dock=this.getContainedDock();
if(dock!=null&&dock.type==DockBinding.TYPE_EDITORS){
if(dock.isEmpty==true){
_ec9=false;
}
}
if(_ec9==true){
this._invisibilize(_ec8);
}
};
StageSplitPanelBinding.prototype._invisibilize=function(_ecb){
if(_ecb!=this._isInvisibilized){
if(_ecb){
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
StageSplitterBinding.prototype.onDragStart=function(_ecc){
var _ecd=top.app.bindingMap.stagesplittercover;
var _ece=this._containingSplitBoxBinding.getOrient();
switch(_ece){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_ecd.bindingElement.style.cursor="e-resize";
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_ecd.bindingElement.style.cursor="n-resize";
break;
}
_ecd.show();
var body=top.app.bindingMap.stagesplitterbody;
body.setPosition(this.getPosition());
body.setDimension(this.getDimension());
body.setOrient(_ece);
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
StageSplitterBodyBinding.prototype.setOrient=function(_ed4){
this._orient=_ed4;
this.attachClassName(_ed4);
};
StageSplitterBodyBinding.prototype.setPosition=function(pos){
var _ed6=true;
var _ed7=true;
switch(this._orient){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_ed7=false;
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_ed6=false;
break;
}
if(_ed6){
this.bindingElement.style.left=pos.x+"px";
}
if(_ed7){
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
StageBoxAbstraction.handleAction=function(_ed9){
switch(_ed9.type){
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
if(_ed9.target instanceof DockBinding){
if(this.isHiddenForReal){
this.dispatchAction(StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED);
}else{
if(this.isMinimizedForReal){
this.normalize();
}
}
}
_ed9.consume();
break;
}
};
StageBoxAbstraction.handleMaximization=function(){
if(this.isMaximizePrepared==true){
this.isMaximizedForReal=true;
this.isHiddenForReal=false;
this.isFlexible=false;
if(Client.isMozilla==true){
var _eda=this.bindingElement.style;
_eda.position="absolute";
_eda.width="100%";
_eda.height="100%";
_eda.top="0";
_eda.left="0";
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
var _edb=this.bindingElement.style;
_edb.position="relative";
_edb.width="auto";
_edb.height="auto";
_edb.top="auto";
_edb.left="auto";
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
StageBoxAbstraction._emulateBasicCSS=function(_edc,_edd){
var _ede=_edc.bindingElement.style;
var _edf=_edc.bindingElement.parentNode;
var box=_edc._containingSplitBoxBinding;
if(Client.isExplorer==true){
if(_edd){
_edc._unmodifiedFlexMethod=_edc.flex;
_edc.flex=function(){
_ede.width=_edf.offsetWidth+"px";
_ede.height=_edf.offsetHeight+"px";
};
}else{
_ede.width="100%";
_ede.height="100%";
if(!box.isHorizontalOrient()){
setTimeout(function(){
_ede.width="auto";
_ede.height="auto";
box.reflex(true);
},0);
}
_edc.flex=_edc._unmodifiedFlexMethod;
_edc._unmodifiedFlexMethod=null;
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
StageBoxHandlerAbstraction.handleAction=function(_ee1){
var _ee2=_ee1.target;
switch(_ee1.type){
case ControlBoxBinding.ACTION_MAXIMIZE:
case ControlBoxBinding.ACTION_NORMALIZE:
if(_ee2 instanceof StageSplitPanelBinding){
StageBoxHandlerAbstraction.handleControlBoxAction.call(this,_ee1);
_ee1.consume();
}
break;
case StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED:
if(this.isSubPanelMaximized){
this.iterateContainedStageBoxBindings(StageCrawler.MODE_UNMAXIMIZE);
this.isSubPanelMaximized=false;
}
_ee1.consume();
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
break;
}
};
StageBoxHandlerAbstraction.handleControlBoxAction=function(_ee3){
var mode=null;
switch(_ee3.type){
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
StageMenuBarBinding.prototype.handleAction=function(_ee5){
StageMenuBarBinding.superclass.handleAction.call(this,_ee5);
switch(_ee5.type){
case MenuItemBinding.ACTION_COMMAND:
var _ee6=_ee5.target.associatedSystemAction;
if(Application.isLoggedIn){
if(!this._rootNode){
this._rootNode=System.getRootNode();
}
if(_ee6){
SystemAction.invoke(_ee6,this._rootNode);
}
}
_ee5.consume();
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
var _ee7=this.getProperty("handle");
if(_ee7){
this._handle=_ee7;
if(StageBinding.isViewOpen(_ee7)){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
this.check(true);
}
}
this.oncommand=function(){
var self=this;
Application.lock(self);
setTimeout(function(){
StageBinding.handleViewPresentation(_ee7);
Application.unlock(self);
},Client.hasTransitions?Animation.DEFAULT_TIME:0);
};
}else{
throw new Error("StageViewMenuItemBinding: missing handle");
}
};
StageViewMenuItemBinding.prototype.setHandle=function(_ee9){
this.setProperty("handle",_ee9);
};
StageViewMenuItemBinding.prototype.handleBroadcast=function(_eea,arg){
StageViewMenuItemBinding.superclass.handleBroadcast.call(this,_eea,arg);
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
switch(_eea){
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
StageViewMenuItemBinding.newInstance=function(_eec){
var _eed=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_eec);
UserInterface.registerBinding(_eed,StageViewMenuItemBinding);
return UserInterface.getBinding(_eed);
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
StageStatusBarBinding.prototype.setLabel=function(_eee){
this._label.setLabel(_eee);
};
StageStatusBarBinding.prototype.setImage=function(_eef){
this._label.setImage(_eef);
};
StageStatusBarBinding.prototype.clear=function(){
this._label.setLabel(null);
this._label.setImage(false);
};
StageStatusBarBinding.prototype.startFadeOut=function(_ef0){
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
var _ef1=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _ef2=_ef1.getAssociatedView();
var _ef3=_ef2.getContentWindow().bindingMap.tree;
return _ef3.getFocusedTreeNodeBindings();
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
ExplorerBinding.prototype.handleAction=function(_ef4){
ExplorerBinding.superclass.handleAction.call(this,_ef4);
var _ef5=_ef4.target;
switch(_ef4.type){
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
this._decksBinding.setSelectionByHandle(this._menuBinding.getSelectionHandle());
var tag=this._menuBinding.getSelectionTag();
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVE_CHANGED,tag);
break;
case ViewBinding.ACTION_LOADED:
this.dispatchAction(ExplorerBinding.ACTION_DECK_LOADED);
_ef4.consume();
break;
case Binding.ACTION_DRAG:
if(_ef5 instanceof ExplorerSplitterBinding){
_ef5.dragger.registerHandler(this);
}
_ef4.consume();
}
};
ExplorerBinding.prototype.setSelectionByHandle=function(_ef7){
this._menuBinding.setSelectionByHandle(_ef7);
};
ExplorerBinding.prototype.setSelectionDefault=function(){
this._menuBinding.setSelectionDefault();
};
ExplorerBinding.prototype.getSelectedDeckBinding=function(){
return this._decksBinding.getSelectedDeckBinding();
};
ExplorerBinding.prototype.mountDefinition=function(_ef8){
if(_ef8 instanceof SystemViewDefinition){
this._decksBinding.mountDefinition(_ef8);
this._menuBinding.mountDefinition(_ef8);
}else{
throw new Error("ExplorerBinding: No such ViewDefinition supported");
}
};
ExplorerBinding.prototype.onDragStart=function(_ef9){
var _efa=this._menuBinding.getDescendantBindingsByLocalName("explorertoolbarbutton");
if(_efa.hasEntries()){
var _efb=_efa.getFirst();
this._dragStart=_efb.boxObject.getLocalPosition().y;
this._dragSlot=0;
if(this._dragHeight==0){
this._dragHeight=_efb.boxObject.getDimension().h;
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
ExplorerDecksBinding.prototype.mountDefinition=function(_eff){
if(_eff instanceof SystemViewDefinition){
var _f00=ViewBinding.newInstance(this.bindingDocument);
_f00.setType(ViewBinding.TYPE_EXPLORERVIEW);
_f00.setDefinition(_eff);
var _f01=ExplorerDeckBinding.newInstance(this.bindingDocument);
_f01.setAssociatedView(_f00);
this._decks[_eff.handle]=_f01;
_f01.add(_f00);
this.add(_f01);
_f01.attach();
_f00.attach();
}
};
ExplorerDecksBinding.prototype.setSelectionByHandle=function(_f02){
var _f03=this._decks[_f02];
this.select(_f03);
};
DecksBinding.prototype.expandBy=function(_f04){
var deck=this.getSelectedDeckBinding();
if(deck){
var _f06=this.bindingElement.offsetHeight+_f04;
var view=deck.getAssociatedView();
this.bindingElement.style.height=_f06+"px";
this.reflex(true);
}
};
ExplorerDecksBinding.newInstance=function(_f08){
var _f09=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdecks",_f08);
return UserInterface.registerBinding(_f09,ExplorerDecksBinding);
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
ExplorerDeckBinding.prototype.setAssociatedView=function(_f0a){
this._viewBinding=_f0a;
};
ExplorerDeckBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
ExplorerDeckBinding.prototype.select=function(){
if(!this._isExplorerDeckBindingInitialized){
Application.lock(this);
var _f0b=StringBundle.getString("ui","Website.App.StatusBar.Loading");
var _f0c=this._viewBinding.getDefinition().label;
StatusBar.busy(_f0b,[_f0c]);
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
ExplorerDeckBinding.prototype.handleAction=function(_f0d){
ExplorerDeckBinding.superclass.handleAction.call(this,_f0d);
var _f0e=_f0d.target;
switch(_f0d.type){
case PageBinding.ACTION_INITIALIZED:
if(_f0e instanceof SystemPageBinding){
this._isExplorerDeckBindingInitialized=true;
this._entityToken=_f0e.node.getEntityToken();
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
ExplorerDeckBinding.prototype.handleBroadcast=function(_f0f,arg){
ExplorerDeckBinding.superclass.handleBroadcast.call(this,_f0f,arg);
switch(_f0f){
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
var _f11=null;
if(this._isExplorerDeckBindingInitialized){
_f11=this._viewBinding.getDefinition().label;
}else{
_f11=DockTabBinding.LABEL_TABLOADING;
}
return _f11;
};
ExplorerDeckBinding.prototype.getImage=function(){
var _f12=null;
if(this._isExplorerDeckBindingInitialized){
_f12=this._viewBinding.getDefinition().image;
}else{
_f12=DockTabBinding.IMG_TABLOADING;
}
return _f12;
};
ExplorerDeckBinding.prototype.getToolTip=function(){
var _f13=null;
if(this._isExplorerDeckBindingInitialized){
_f13=this._viewBinding.getDefinition().toolTip;
}
return _f13;
};
ExplorerDeckBinding.newInstance=function(_f14){
var _f15=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdeck",_f14);
return UserInterface.registerBinding(_f15,ExplorerDeckBinding);
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
ExplorerMenuBinding.prototype.onMemberInitialize=function(_f16){
switch(_f16.constructor){
case ExplorerToolBarBinding:
this._maxGroup=_f16.getToolBarGroupByIndex(0);
break;
case ToolBarBinding:
this._minGroup=_f16.getToolBarGroupByIndex(0);
break;
}
ExplorerMenuBinding.superclass.onMemberInitialize.call(this,_f16);
};
ExplorerMenuBinding.prototype.mountDefinition=function(_f17){
this._maxButtons.set(_f17.handle,this._mountMaxButton(_f17));
this._minButtons.set(_f17.handle,this._mountMinButton(_f17));
this._index++;
};
ExplorerMenuBinding.prototype._mountMaxButton=function(_f18){
var _f19=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_LARGE);
_f19.setLabel(_f18.label);
_f19.setToolTip(_f18.toolTip);
_f19.handle=_f18.handle;
_f19.node=_f18.node;
this._maxGroup.add(_f19);
this._maxList.add(_f19);
_f19.attach();
return _f19;
};
ExplorerMenuBinding.prototype._mountMinButton=function(_f1a){
var _f1b=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_NORMAL);
_f1b.setLabel(_f1a.label);
_f1b.setToolTip(_f1a.label);
_f1b.handle=_f1a.handle;
_f1b.node=_f1a.node;
this._minGroup.addFirst(_f1b);
this._minList.add(_f1b);
_f1b.attach();
_f1b.hide();
return _f1b;
};
ExplorerMenuBinding.prototype.handleAction=function(_f1c){
ExplorerMenuBinding.superclass.handleAction.call(this,_f1c);
switch(_f1c.type){
case RadioGroupBinding.ACTION_SELECTIONCHANGED:
var _f1d=_f1c.target;
var _f1e=_f1d.getCheckedButtonBinding();
var _f1f=_f1e.handle;
switch(_f1d){
case this._maxGroup:
this._minGroup.setCheckedButtonBinding(this._minButtons.get(_f1f),true);
break;
case this._minGroup:
this._maxGroup.setCheckedButtonBinding(this._maxButtons.get(_f1f),true);
break;
}
this._selectedHandle=_f1f;
this._selectedTag=_f1e.node.getTag();
this.dispatchAction(ExplorerMenuBinding.ACTION_SELECTIONCHANGED);
_f1c.consume();
break;
}
};
ExplorerMenuBinding.prototype.setSelectionByHandle=function(_f20){
var _f21=this._maxButtons.get(_f20);
if(_f21){
_f21.check();
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
var _f22=false;
var max=this._maxList.getLength()-1;
if(!this._maxList.get(max).isVisible){
this._index++;
this._maxList.get(this._index).show();
this._minList.get(this._index).hide();
_f22=true;
}
return _f22;
};
ExplorerMenuBinding.prototype.showLess=function(){
var _f24=false;
if(this._maxList.get(0).isVisible){
this._maxList.get(this._index).hide();
this._minList.get(this._index).show();
this._index--;
_f24=true;
}
return _f24;
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
ExplorerToolBarBinding.newInstance=function(_f25){
var _f26=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorertoolbar",_f25);
return UserInterface.registerBinding(_f26,ExplorerToolBarBinding);
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
var _f27=this.explorerToolBarButtonType==ExplorerToolBarButtonBinding.TYPE_LARGE;
var _f28=_f27?ToolBarBinding.IMAGESIZE_LARGE:ToolBarBinding.IMAGESIZE_NORMAL;
this.imageProfile=this.node.getImageProfile(_f28);
ExplorerToolBarButtonBinding.superclass.onBindingAttach.call(this);
};
ExplorerToolBarButtonBinding.newInstance=function(_f29,_f2a){
var _f2b=(_f2a==ExplorerToolBarButtonBinding.TYPE_LARGE?"ui:explorertoolbarbutton":"ui:toolbarbutton");
var _f2c=DOMUtil.createElementNS(Constants.NS_UI,_f2b,_f29);
var _f2d=UserInterface.registerBinding(_f2c,ExplorerToolBarButtonBinding);
_f2d.explorerToolBarButtonType=_f2a;
return _f2d;
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
EditorBinding.registerComponent=function(_f2e,_f2f){
var _f30=EditorBinding._components;
var _f31=EditorBinding._editors;
var key=_f2f.key;
var _f33=Interfaces.isImplemented(IWysiwygEditorComponent,_f2e);
if(!_f33){
_f33=Interfaces.isImplemented(ISourceEditorComponent,_f2e);
}
if(_f33){
if(_f31.has(key)){
_f31.get(key).initializeEditorComponent(_f2e);
}else{
if(!_f30.has(key)){
_f30.set(key,new List());
}
_f30.get(key).add(_f2e);
}
}else{
throw "Editor component interface not implemented: "+_f2e;
}
};
EditorBinding.claimComponents=function(_f34,_f35){
var _f36=EditorBinding._components;
var _f37=EditorBinding._editors;
var key=_f35.key;
_f37.set(key,_f34);
var list=null;
if(_f36.has(key)){
list=_f36.get(key).copy();
_f36.del(key);
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
var _f3b=this.getProperty("value");
if(_f3b!=null){
_f3b=decodeURIComponent(_f3b);
this._startContent=_f3b;
}
};
EditorBinding.prototype.onBindingDispose=function(){
EditorBinding.superclass.onBindingDispose.call(this);
var name=this.getProperty("name");
if(name!=null){
var _f3d=this.bindingWindow.DataManager;
_f3d.unRegisterDataBinding(name);
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
EditorBinding.prototype.initializeEditorComponents=function(_f3f){
var _f40=EditorBinding.claimComponents(this,_f3f);
if(_f40!=null){
while(_f40.hasNext()){
this.initializeEditorComponent(_f40.getNext());
}
}
};
EditorBinding.prototype._registerWithDataManager=function(name){
if(name&&name!=""){
var _f42=this.bindingWindow.DataManager;
if(_f42.getDataBinding(name)){
_f42.unRegisterDataBinding(name);
}
_f42.registerDataBinding(name,this);
}
};
EditorBinding.prototype.addEditorEvents=function(){
var _f43=this.getEditorDocument();
if(_f43!=null){
Application.framework(_f43);
DOMEvents.addEventListener(_f43,DOMEvents.CONTEXTMENU,this);
DOMEvents.addEventListener(_f43,DOMEvents.KEYPRESS,this);
DOMEvents.addEventListener(_f43,DOMEvents.MOUSEDOWN,this);
DOMEvents.addEventListener(_f43,DOMEvents.MOUSEMOVE,this);
}
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,{handleEvent:function(e){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}});
};
EditorBinding.prototype.checkForDirty=function(_f45){
if(!this.isDirty){
if(_f45==true){
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
var _f47=this.getCheckSum();
if(_f47!=this._checksum){
this.dispatchAction(Binding.ACTION_DIRTY);
this.isDirty=true;
this._checksum=_f47;
}
};
EditorBinding.prototype.getCheckSum=function(){
var _f48=null;
if(Binding.exists(this._pageBinding)){
_f48=this._pageBinding.getCheckSum(this._checksum);
}
return _f48;
};
EditorBinding.prototype.handleEvent=function(e){
EditorBinding.superclass.handleEvent.call(this,e);
var _f4a=DOMEvents.getTarget(e);
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
if(_f4a==this._bespinElement){
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
if(_f4a.ownerDocument==this.getEditorDocument()){
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
EditorBinding.prototype.handleBroadcast=function(_f4c,arg){
EditorBinding.superclass.handleBroadcast.call(this,_f4c,arg);
var _f4e=null;
switch(_f4c){
case BroadcastMessages.APPLICATION_BLURRED:
if(this._isActivated){
this._activateEditor(false);
}
break;
case BroadcastMessages.MOUSEEVENT_MOUSEUP:
if(!this.isDialogMode){
try{
var _f4f=true;
if(arg instanceof Binding){
if(Interfaces.isImplemented(IEditorControlBinding,arg)==true){
if(arg.isEditorControlBinding){
_f4f=false;
}
}
}else{
_f4e=DOMEvents.getTarget(arg);
if(this instanceof BespinEditorBinding){
if(_f4e==this._bespinElement){
_f4f=false;
}
}else{
if(_f4e&&_f4e.ownerDocument==this.getEditorDocument()){
_f4f=false;
}
}
}
if(_f4f){
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
EditorBinding.prototype._activateEditor=function(_f50){
if(_f50!=this._isActivated){
this._isActivated=_f50;
EditorBinding.isActive=_f50;
var _f51=this.getEditorWindow().standardEventHandler;
var _f52=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_f52!=null){
if(_f50){
if(this.hasBookmark()){
this.deleteBookmark();
}
_f52.enable();
if(Client.isExplorer){
this._sanitizeExplorer();
}
this.focus();
_f51.enableNativeKeys(true);
}else{
_f52.disable();
_f51.disableNativeKeys();
this.blur();
}
}else{
throw "Required broadcaster not found";
}
}
};
EditorBinding.prototype._sanitizeExplorer=function(){
if(Client.isExplorer){
var _f53=this.getEditorDocument().selection.createRange();
_f53.select();
}
};
EditorBinding.prototype._sanitizeMozilla=function(){
};
EditorBinding.prototype.hasSelection=function(){
var _f54=false;
if(Client.isMozilla){
var _f55=this.getEditorWindow().getSelection();
if(_f55!=null){
_f54=_f55.toString().length>0;
if(!_f54){
var _f56=_f55.getRangeAt(0);
var frag=_f56.cloneContents();
var _f58=this.getEditorDocument().createElement("element");
while(frag.hasChildNodes()){
_f58.appendChild(frag.firstChild);
}
var img=_f58.getElementsByTagName("img").item(0);
if(img!=null){
if(!CSSUtil.hasClassName(img,VisualEditorBinding.FUNCTION_CLASSNAME)){
_f54=true;
}
}
}
}
}else{
var _f56=this.getEditorDocument().selection.createRange();
_f54=(_f56&&_f56.text)&&_f56.text.length>0;
}
return _f54;
};
EditorBinding.prototype.isCommandEnabled=function(_f5a){
var _f5b=true;
switch(_f5a){
case "Cut":
case "Copy":
case "Paste":
_f5b=this.getEditorDocument().queryCommandEnabled(_f5a);
break;
}
return _f5b;
};
EditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _f5f=false;
this.restoreBookmark();
switch(cmd){
case "Cut":
case "Copy":
case "Paste":
var _f60=null;
if(cmd=="Paste"){
_f60=null;
}else{
_f60=this.hasSelection();
}
try{
this.getEditorDocument().execCommand(cmd,gui,_f60);
}
catch(mozillaSecurityException){
if(Client.isMozilla==true){
Dialog.invokeModal(EditorBinding.URL_DIALOG_MOZ_CONFIGURE);
}else{
throw "Clipboard operation malfunction. Contact your developer.";
}
}
finally{
_f5f=true;
}
break;
}
return _f5f;
};
EditorBinding.prototype.getButtonForCommand=function(cmd){
var _f62=this.getContentWindow().bindingMap.toolbar;
var _f63=_f62.getButtonForCommand(cmd);
if(!_f63){
throw "No button for command "+cmd;
}
return _f63;
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
var _f66=this.getContentDocument().getElementById("focusableinput");
if(_f66!=null){
_f66.style.display="block";
FocusBinding.focusElement(_f66);
_f66.style.display="none";
}else{
throw "Required element not found: focusableinput";
}
};
EditorBinding.prototype.handleAction=function(_f67){
EditorBinding.superclass.handleAction.call(this,_f67);
var _f68=_f67.target;
var self=this;
var _f6a=this.shadowTree.iframe;
switch(_f67.type){
case Binding.ACTION_DIRTY:
if(_f67.target!=this){
this.checkForDirty();
}
break;
}
};
EditorBinding.prototype._onPageInitialize=function(_f6b){
if(this._pageBinding==null){
this.reflex();
if(this._coverBinding!=null&&this._coverBinding.isVisible){
this._coverBinding.hide();
}
}
EditorBinding.superclass._onPageInitialize.call(this,_f6b);
};
EditorBinding.prototype.handleElement=function(_f6c){
return true;
};
EditorBinding.prototype.updateElement=function(_f6d){
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
this._menuGroups[rel].each(function(_f70){
_f70.show();
});
};
EditorPopupBinding.prototype._hideMenuGroups=function(rel){
this._menuGroups[rel].each(function(_f72){
_f72.hide();
});
};
EditorPopupBinding.prototype.handleAction=function(_f73){
EditorPopupBinding.superclass.handleAction.call(this,_f73);
var _f74=_f73.target;
if(_f73.type==MenuItemBinding.ACTION_COMMAND){
this.hide();
var cmd=_f74.getProperty("cmd");
var gui=_f74.getProperty("gui");
var val=_f74.getProperty("val");
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
var _f78=this.bindingWindow.bindingMap.tinywindow;
var _f79=this.bindingWindow.bindingMap.codepresswindow;
if(_f78){
EditorBinding.registerComponent(this,_f78);
}else{
if(_f79){
EditorBinding.registerComponent(this,_f79);
}
}
};
EditorClickButtonBinding.prototype.buildDOMContent=function(){
EditorClickButtonBinding.superclass.buildDOMContent.call(this);
this._buildDesignModeSanitizer();
};
EditorClickButtonBinding.prototype.initializeComponent=function(_f7a,_f7b,_f7c,_f7d){
this._editorBinding=_f7a;
this._tinyEngine=_f7b;
this._tinyInstance=_f7c;
this._tinyTheme=_f7d;
this._setupEditorBookmarking();
};
EditorClickButtonBinding.prototype.initializeSourceEditorComponent=function(_f7e,_f7f,_f80){
this._editorBinding=_f7e;
this._codePressFrame=_f7f;
this._codePressEngine=_f80;
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
var _f82=this._editorBinding;
if(_f82!=null){
var self=this;
var _f84={handleEvent:function(e){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(!_f82.hasBookmark()){
_f82.createBookmark();
}
break;
case DOMEvents.MOUSEUP:
if(self.isEditorSimpleControl){
if(self.popupBinding==null){
if(_f82.hasBookmark()){
_f82.restoreBookmark();
}
}
}
break;
}
}};
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,_f84);
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEUP,_f84);
}
};
EditorClickButtonBinding.newInstance=function(_f86){
var _f87=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_f86);
return UserInterface.registerBinding(_f87,EditorClickButtonBinding);
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
EditorToolBarButtonBinding.newInstance=function(_f88){
var _f89=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_f88);
return UserInterface.registerBinding(_f89,EditorToolBarButtonBinding);
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
var _f8a=this.bindingWindow.bindingMap.tinywindow;
EditorBinding.registerComponent(this,_f8a);
EditorSelectorBinding.superclass.onBindingAttach.call(this);
};
EditorSelectorBinding.prototype.buildButton=function(){
EditorSelectorBinding.superclass.buildButton.call(this);
this._buttonBinding.isEditorSimpleControl=false;
if(this.isEditorControlBinding==false){
this._buttonBinding.isEditorControlBinding=false;
}
};
EditorSelectorBinding.prototype.initializeComponent=function(_f8b,_f8c,_f8d,_f8e){
this._editorBinding=_f8b;
this._tinyEngine=_f8c;
this._tinyInstance=_f8d;
this._tinyTheme=_f8e;
};
EditorSelectorBinding.prototype.handleAction=function(_f8f){
EditorSelectorBinding.superclass.handleAction.call(this,_f8f);
switch(_f8f.type){
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
EditorSelectorBinding.superclass.handleAction.call(this,_f8f);
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
EditorMenuItemBinding.newInstance=function(_f92){
var _f93=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_f92);
return UserInterface.registerBinding(_f93,EditorMenuItemBinding);
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
VisualEditorBinding.getTinyLessClassName=function(_f94){
var i=0,_f96,_f97="",_f98=_f94.split(" ");
while((_f96=_f98[i])!=null){
if(_f96.length>=3&&_f96.substring(0,3)=="mce"){
_f96="";
}else{
if(_f96.length>=14&&_f96.substring(0,14)=="compositemedia"){
_f96="";
}
}
_f97+=_f96;
if(_f98[i+1]){
_f97+=" ";
}
i++;
}
return _f97;
};
VisualEditorBinding.getStructuredContent=function(_f99){
var _f9a=null;
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.TinyContentToStructuredContent(_f99);
if(soap instanceof SOAPFault){
}else{
_f9a=soap.XhtmlFragment;
if(!_f9a){
_f9a="";
}
}
WebServiceProxy.isFaultHandler=true;
return _f9a;
};
VisualEditorBinding.getTinyContent=function(_f9c,_f9d){
var _f9e=null;
if(_f9c==null||_f9c==""){
_f9c=VisualEditorBinding.DEFAULT_CONTENT;
}
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.StructuredContentToTinyContent(_f9c);
if(soap instanceof SOAPFault){
var _fa0=soap;
var _fa1={handleDialogResponse:function(){
_f9d.dispatchAction(Binding.ACTION_VALID);
}};
Dialog.invokeModal(VisualEditorBinding.URL_DIALOG_CONTENTERROR,_fa1,_fa0);
}else{
_f9e=soap.XhtmlFragment;
if(_f9e==null){
_f9e=new String("");
}
}
WebServiceProxy.isFaultHandler=true;
return _f9e;
};
VisualEditorBinding.extractByIndex=function(html,_fa3){
var _fa4=null;
var doc=XMLParser.parse(html);
if(doc!=null){
var _fa6=new List(doc.documentElement.childNodes);
var _fa7=new List();
_fa6.each(function(_fa8){
if(_fa8.nodeType==Node.ELEMENT_NODE){
_fa7.add(_fa8);
}
});
var _fa9=_fa7.get(_fa3);
if(_fa9==null){
if(Application.isDeveloperMode){
alert("VisualEditorBinding: Bad HTML!"+"\n\n"+html);
}
}else{
if(_fa9.hasChildNodes()){
var frag=doc.createDocumentFragment();
while(_fa9.hasChildNodes()){
frag.appendChild(_fa9.firstChild);
}
doc.removeChild(doc.documentElement);
doc.appendChild(DOMUtil.createElementNS(Constants.NS_XHTML,"ROOT",doc));
doc.documentElement.appendChild(frag);
_fa4=DOMSerializer.serialize(doc.documentElement);
_fa4=_fa4.substring(_fa4.indexOf(">")+1,_fa4.length);
_fa4=_fa4.substring(0,_fa4.lastIndexOf("<"));
}
}
}
if(_fa4==null){
_fa4=new String("");
}
return _fa4;
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
var _fab=this.getProperty("presentationstylesheet");
if(_fab!=null){
this.presentationStylesheet=_fab;
}
var _fac=this.getProperty("configurationstylesheet");
if(_fac!=null){
this.configurationStylesheet=_fac;
}
var _fad=this.getProperty("formattingconfiguration");
if(_fad!=null){
this.formattingConfiguration=VisualEditorFormattingConfiguration.getConfiguration(_fad);
}
var _fae=this.getProperty("elementclassconfiguration");
if(_fae!=null){
this.elementClassConfiguration=VisualEditorElementClassConfiguration.getConfiguration(_fae);
}
var _faf=this.getProperty("embedablefieldstypenames");
if(_faf!=null){
this.embedableFieldConfiguration=VisualEditorFieldGroupConfiguration.getConfiguration(_faf);
}
};
VisualEditorBinding.prototype.handleBroadcast=function(_fb0,arg){
VisualEditorBinding.superclass.handleBroadcast.call(this,_fb0,arg);
var _fb2=this.getContentWindow().bindingMap.tinywindow;
var _fb3=_fb2.getContentWindow();
switch(_fb0){
case BroadcastMessages.VISUALEDITOR_HACKED:
if(arg.broadcastWindow==_fb3){
this._startContent=this.normalizeToDocument(this._startContent);
this.extractHead(this._startContent);
this._startContent=this.extractBody(this._startContent);
arg.textareaElement.value=VisualEditorBinding.getTinyContent(this._startContent);
this.unsubscribe(BroadcastMessages.VISUALEDITOR_HACKED);
}
break;
case BroadcastMessages.TINYMCE_INITIALIZED:
if(arg.broadcastWindow==_fb3){
this._tinyEngine=arg.tinyEngine;
this._tinyInstance=arg.tinyInstance;
this._tinyTheme=arg.tinyTheme;
this._tinyTheme.initC1(this,this._tinyEngine,this._tinyInstance);
this.initializeEditorComponents(_fb2);
this._initialize();
this.unsubscribe(BroadcastMessages.TINYMCE_INITIALIZED);
}
break;
}
};
VisualEditorBinding.prototype.initializeEditorComponent=function(_fb4){
_fb4.initializeComponent(this,this._tinyEngine,this._tinyInstance,this._tinyTheme);
};
VisualEditorBinding.prototype._finalize=function(){
VisualEditorBinding.superclass._finalize.call(this);
this._maybeShowEditor();
};
VisualEditorBinding.prototype._onPageInitialize=function(_fb5){
VisualEditorBinding.superclass._onPageInitialize.call(this,_fb5);
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
VisualEditorBinding.prototype.normalizeToDocument=function(_fb8){
var _fb9=_fb8;
if(!this._isNormalizedDocument(_fb8)){
_fb8="\t\t"+_fb8.replace(/\n/g,"\n\t\t");
_fb9=VisualEditorBinding.XHTML.replace("${head}",this._getHeadSection()).replace("${body}",_fb8);
}
return _fb9;
};
VisualEditorBinding.prototype._isNormalizedDocument=function(_fba){
var _fbb=false;
var doc=XMLParser.parse(_fba,true);
if(doc!=null){
if(doc.documentElement.nodeName=="html"){
_fbb=true;
}
}
return _fbb;
};
VisualEditorBinding.prototype._getHeadSection=function(){
return this._head!=null?this._head:new String("");
};
VisualEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _fc0=VisualEditorBinding.superclass.handleCommand.call(this,cmd,gui,val);
if(!_fc0){
try{
this._tinyInstance.execCommand(cmd,gui,val);
this.checkForDirty();
}
catch(e){
SystemDebug.stack(arguments);
}
_fc0=true;
}
return _fc0;
};
VisualEditorBinding.prototype.handleContextMenu=function(e){
var _fc2=DOMEvents.getTarget(e);
this._popupBinding.configure(this._tinyInstance,this._tinyEngine,_fc2);
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
VisualEditorBinding.prototype.setValue=function(_fc3){
if(this._isFinalized){
if(Binding.exists(this._pageBinding)){
this._pageBinding.setContent(_fc3);
}
}else{
if(this._startContent==null){
this._startContent=_fc3;
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
VisualEditorBinding.prototype.setResult=function(_fc4){
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
VisualEditorPopupBinding.prototype.configure=function(_fc5,_fc6,_fc7){
var _fc8=this.editorBinding.hasSelection();
this.tinyInstance=_fc5;
this.tinyEngine=_fc6;
this.tinyElement=_fc7;
this.hasSelection=_fc8;
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
var _fcc=false;
if(this.hasSelection){
_fcc=true;
}else{
if(this.tinyElement){
if(this.tinyElement.nodeName=="A"&&!this.tinyElement.getAttribute("name")){
_fcc=true;
}else{
if(this.tinyElement.nodeName=="IMG"){
_fcc=true;
}
}
}
}
if(_fcc){
this._showMenuGroups("link");
this._configureLinkGroupDetails();
}else{
this._hideMenuGroups("link");
}
};
VisualEditorPopupBinding.prototype._configureLinkGroupDetails=function(){
var _fcd=this.getMenuItemForCommand("compositeInsertLink");
var _fce=this.getMenuItemForCommand("unlink");
var _fcf=this.editorBinding.getButtonForCommand("compositeInsertLink");
var _fd0=this.editorBinding.getButtonForCommand("unlink");
_fce.setDisabled(_fd0.isDisabled);
if(_fce.isDisabled){
_fcd.setLabel("Link");
}else{
_fcd.setLabel("Link properties");
}
};
VisualEditorPopupBinding.prototype._configureInsertGroup=function(){
var _fd1=this.editorBinding.embedableFieldConfiguration;
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
if(_fd1){
var _fd4=_fd1.getGroupNames();
if(_fd4.hasEntries()){
var _fd5=MenuPopupBinding.newInstance(doc);
var body=_fd5.add(MenuBodyBinding.newInstance(doc));
var _fd7=body.add(MenuGroupBinding.newInstance(doc));
_fd4.each(function(_fd8){
var _fd9=_fd1.getFieldNames(_fd8);
_fd9.each(function(_fda){
var i=_fd7.add(MenuItemBinding.newInstance(doc));
i.setLabel(_fda);
i.setImage("${icon:field}");
i.setProperty("cmd","compositeInsertField");
i.setProperty("val",_fd8+":"+_fda);
_fd7.add(i);
});
});
item.add(_fd5);
}
}else{
item.disable();
}
this._menuGroups["insertions"].getFirst().add(item);
item.attachRecursive();
this._menuItems["compositeInsertFieldParent"]=item;
};
VisualEditorPopupBinding.prototype._configureTableGroup=function(){
var _fdc=this.tinyInstance.dom.getParent(this.tinyElement,"table,td");
var _fdd=null;
var _fde=null;
if(_fdc){
if(_fdc.nodeName=="TD"){
_fdd=_fdc.getAttribute("colspan");
_fde=_fdc.getAttribute("rowspan");
}
this._menuItems["mceTableSplitCells"].setDisabled(_fdd=="1"&&_fde=="1");
this._menuItems["mceTablePasteRowBefore"].setDisabled(this.tinyInstance.tableRowClipboard==null);
this._menuItems["mceTablePasteRowAfter"].setDisabled(this.tinyInstance.tableRowClipboard==null);
}
if(_fdc){
this._showMenuGroups("table");
}else{
this._hideMenuGroups("table");
}
};
VisualEditorPopupBinding.prototype._configureRenderingGroup=function(){
var _fdf=this._isRendering();
if(_fdf){
this._showMenuGroups("rendering");
}else{
this._hideMenuGroups("rendering");
}
this._isRenderingSelected=_fdf;
};
VisualEditorPopupBinding.prototype._configureFieldGroup=function(){
var _fe0=this._isField();
if(_fe0){
this._showMenuGroups("field");
}else{
this._hideMenuGroups("field");
}
this._isFieldSelected=_fe0;
};
VisualEditorPopupBinding.prototype._configureImageGroup=function(){
if(this._isImage()&&!this._isRenderingSelected&&!this._isFieldSelected){
this._showMenuGroups("image");
}else{
this._hideMenuGroups("image");
}
};
VisualEditorPopupBinding.prototype._isImage=function(){
var _fe1=false;
if(!this.hasSelection){
_fe1=this.tinyElement&&this.tinyElement.nodeName=="IMG";
}
return _fe1;
};
VisualEditorPopupBinding.prototype._isRendering=function(){
return this._isImage()&&CSSUtil.hasClassName(this.tinyElement,VisualEditorBinding.FUNCTION_CLASSNAME);
};
VisualEditorPopupBinding.prototype._isField=function(){
return this._isImage()&&CSSUtil.hasClassName(this.tinyElement,VisualEditorBinding.FIELD_CLASSNAME);
};
VisualEditorElementClassConfiguration._configurations=new Map();
VisualEditorElementClassConfiguration.getConfiguration=function(_fe2){
var _fe3=VisualEditorElementClassConfiguration._configurations;
if(!_fe3.has(_fe2)){
_fe3.set(_fe2,new VisualEditorElementClassConfiguration(EditorConfigurationService.GetElementClassConfiguration(_fe2)));
}
return _fe3.get(_fe2);
};
function VisualEditorElementClassConfiguration(doc){
this.logger=SystemLogger.getLogger("VisualEditorElementClassConfiguration");
this._elements={};
var _fe5=new XPathResolver();
var _fe6=_fe5.resolveAll("elements/element",doc);
while(_fe6.hasNext()){
var _fe7=_fe6.getNext();
var _fe8=_fe7.getAttribute("name");
this._elements[_fe8]=new List();
var _fe9=_fe5.resolveAll("class",_fe7);
while(_fe9.hasNext()){
var _fea=_fe9.getNext().getAttribute("name");
this._elements[_fe8].add(_fea);
}
}
}
VisualEditorElementClassConfiguration.prototype.getClassNamesForElement=function(name){
var _fec=null;
if(this._elements[name]){
_fec=this._elements[name].copy();
}else{
_fec=new List();
}
return _fec;
};
VisualEditorFormattingConfiguration._configurations=new Map();
VisualEditorFormattingConfiguration._options=null;
VisualEditorFormattingConfiguration.getConfiguration=function(_fed){
var _fee=VisualEditorFormattingConfiguration._configurations;
if(!_fee.has(_fed)){
_fee.set(_fed,new VisualEditorFormattingConfiguration());
}
return _fee.get(_fed);
};
VisualEditorFormattingConfiguration._getOptions=function(){
if(VisualEditorFormattingConfiguration._options==null){
var p="Composite.Web.VisualEditor";
VisualEditorFormattingConfiguration._options={"p":StringBundle.getString(p,"FormatSelector.LabelParagraph"),"address":StringBundle.getString(p,"FormatSelector.LabelAddress"),"blockquote":StringBundle.getString(p,"FormatSelector.LabelBlockQuote"),"div":StringBundle.getString(p,"FormatSelector.LabelDivision"),"h1":StringBundle.getString(p,"FormatSelector.LabelHeading1"),"h2":StringBundle.getString(p,"FormatSelector.LabelHeading2"),"h3":StringBundle.getString(p,"FormatSelector.LabelHeading3"),"h4":StringBundle.getString(p,"FormatSelector.LabelHeading4"),"h5":StringBundle.getString(p,"FormatSelector.LabelHeading5"),"h6":StringBundle.getString(p,"FormatSelector.LabelHeading6")};
}
return VisualEditorFormattingConfiguration._options;
};
function VisualEditorFormattingConfiguration(_ff0){
this._options=VisualEditorFormattingConfiguration._getOptions();
}
VisualEditorFormattingConfiguration.prototype.getFormattingOptions=function(){
return this._options;
};
VisualEditorFieldGroupConfiguration._configurations=new Map();
VisualEditorFieldGroupConfiguration.getConfiguration=function(_ff1){
var _ff2=null;
var _ff3=VisualEditorFieldGroupConfiguration._configurations;
if(!_ff3.has(_ff1)){
_ff3.set(_ff1,new VisualEditorFieldGroupConfiguration(EditorConfigurationService.GetEmbedableFieldGroupConfigurations(_ff1)));
}
return _ff3.get(_ff1);
};
function VisualEditorFieldGroupConfiguration(_ff4){
var _ff5=new Map();
new List(_ff4).each(function(_ff6){
var map=new Map();
new List(_ff6.Fields).each(function(_ff8){
map.set(_ff8.Name,{xhtml:_ff8.XhtmlRepresentation,xml:_ff8.XhtmlRepresentation});
});
_ff5.set(_ff6.GroupName,map);
});
this._groups=_ff5;
}
VisualEditorFieldGroupConfiguration.prototype.getGroupNames=function(){
return this._groups.toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getFieldNames=function(_ff9){
return this._groups.get(_ff9).toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getTinyMarkup=function(_ffa,_ffb){
return this._groups.get(_ffa).get(_ffb).xhtml;
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
var _ffd=this.getDescendantElementsByLocalName("textarea");
while(_ffd.hasNext()){
var _ffe=_ffd.getNext();
if(_ffe.getAttribute("selected")=="true"){
this._startContent=_ffe.value;
this._textareaname=_ffe.getAttribute("placeholderid");
}
}
if(this._startContent==null){
this._startContent=VisualEditorBinding.DEFAULT_CONTENT;
}
};
VisualMultiEditorBinding.prototype._initialize=function(){
var self=this;
this._registerWithDataManager("generated"+KeyMaster.getUniqueKey());
var _1000=this.getContentWindow().bindingMap.templatetree;
_1000.addActionListener(TreeBinding.ACTION_SELECTIONCHANGED,{handleAction:function(_1001){
var _1002=_1000.getSelectedTreeNodeBindings().getFirst();
self._placeHolderSelected(_1002.textareaname);
_1001.consume();
}});
_1000.addActionListener(Binding.ACTION_FOCUSED,{handleAction:function(_1003){
self._activateEditor(false);
}});
this._updatePlaceHolders();
var _1004=this.getContentWindow().bindingMap.toolsplitter;
_1004.unCollapse();
VisualMultiEditorBinding.superclass._initialize.call(this);
};
VisualMultiEditorBinding.prototype._updatePlaceHolders=function(){
templatetree=this.getContentWindow().bindingMap.templatetree;
var _1005=this.getDescendantElementsByLocalName("textarea");
templatetree.empty();
if(_1005.hasEntries()){
this._hasPlaceHolders=true;
this._parsePlaceHolders(_1005);
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
VisualMultiEditorBinding.prototype._parsePlaceHolders=function(_1006){
this._textareas=new Map();
while(_1006.hasNext()){
var _1007=_1006.getNext();
var _1008=_1007.getAttribute("placeholderid");
this._textareas.set(_1008,{placeholderid:_1008,placeholdername:_1007.getAttribute("placeholdername"),placeholdermarkup:_1007.value,textareaelement:_1007,isSelected:_1007.getAttribute("selected")=="true"});
}
var _1009=new Map();
this._textareas.each(function(name,_100b){
var _100c=templatetree.add(TreeNodeBinding.newInstance(templatetree.bindingDocument));
_100c.setLabel(_100b.placeholdername);
_100c.setImage("${icon:placeholder}");
_100c.setProperty("placeholder",true);
_100c.textareaname=name;
_1009.set(_100b.placeholdername,_100c);
if(_100b.isSelected){
selected=_100c;
}
});
templatetree.attachRecursive();
if(selected!=null){
var _100d=this._textareas.get(selected.textareaname);
this._textareaname=selected.textareaname;
this._placeholdername=_100d.placeholdername;
this._setContentFromPlaceHolder(selected.textareaname);
selected.focus();
}
};
VisualMultiEditorBinding.prototype._noPlaceHolders=function(){
var _100e=this.getContentWindow().bindingMap.templatetree;
var _100f=_100e.add(TreeNodeBinding.newInstance(_100e.bindingDocument));
_100f.setLabel(StringBundle.getString("Composite.Web.VisualEditor","TemplateTree.NoTemplateWarning"));
_100f.setImage("${icon:warning}");
_100f.attach();
var _1010=this.getContentWindow().bindingMap.statusbar;
_1010.setPlaceHolderName(null);
};
VisualMultiEditorBinding.prototype._setContentFromPlaceHolder=function(name){
if(this._isFinalized==true){
var _1012=this._textareas.get(name);
var _1013=_1012.placeholdermarkup;
this.setValue(this.normalizeToDocument(_1013));
this.resetUndoRedo();
}
};
VisualMultiEditorBinding.prototype._placeHolderSelected=function(_1014){
if(this._isFinalized==true){
if(this._textareaname&&this._textareas.has(this._textareaname)){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
}
}
this._textareaname=_1014;
this._placeholdername=this._textareas.get(this._textareaname).placeholdername;
var _1015=this.getContentWindow().bindingMap.statusbar;
_1015.setPlaceHolderName(this._placeholdername);
if(this._isFinalized==true){
var self=this;
Application.lock(self);
setTimeout(function(){
self._setContentFromPlaceHolder(_1014);
Application.unlock(self);
},0);
}
};
VisualMultiEditorBinding.prototype.extractHead=function(html){
VisualMultiEditorBinding.superclass.extractHead.call(this,html);
this._heads.set(this._textareaname,this._head);
};
VisualMultiEditorBinding.prototype._getHeadSection=function(){
var _1018="";
if(this._heads.has(this._textareaname)){
_1018=this._heads.get(this._textareaname);
if(_1018==null){
_1018=new String("");
}
}
return _1018;
};
VisualMultiEditorBinding.prototype.manifest=function(){
if(this._textareas!=null&&this._textareas.hasEntries()){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
this._textareas.each(function(name,_101a){
_101a.textareaelement.value=_101a.placeholdermarkup;
});
}
};
VisualMultiEditorBinding.prototype.updateElement=function(_101b,_101c){
var _101d=_101b.getElementsByTagName("div").item(0);
var _101e=_101c.getElementsByTagName("div").item(0);
var _101f=new List(_101d.getElementsByTagName("textarea"));
var _1020=new List(_101e.getElementsByTagName("textarea"));
var _1021=false;
if(_101f.getLength()!=_1020.getLength()){
_1021=true;
}else{
var index=0;
_101f.each(function(_1023,index){
var _1025=_1020.get(index);
var newid=_1023.getAttribute("placeholderid");
var oldid=_1025.getAttribute("placeholderid");
var _1028=_1023.getAttribute("placeholdername");
var _1029=_1025.getAttribute("placeholdername");
if(newid!=oldid||_1028!=_1029){
_1021=true;
}
return !_1021;
});
}
if(_1021){
var html=null;
if(_101d.innerHTML!=null){
html=_101d.innerHTML;
}else{
html=DOMSerializer.serialize(_101d);
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
var _102d=this.getDescendantBindingByLocalName("selector");
_102d.attach();
this._populateTemplateSelector();
var _102e=this.getContentWindow().bindingMap.templateselector;
_102e.addActionListener(SelectorBinding.ACTION_SELECTIONCHANGED,{handleAction:function(){
setTimeout(function(){
self._onTemplateSelectionChanged();
},0);
}});
this.getContentWindow().bindingMap.templatetoolbar.show();
VisualMultiTemplateEditorBinding.superclass._initialize.call(this);
};
VisualMultiTemplateEditorBinding.prototype._populateTemplateSelector=function(){
var _102f=this.getDescendantBindingByLocalName("selector");
var _1030=this.getContentWindow().bindingMap.templateselector;
_102f.selections.each(function(_1031){
_1031.imageProfile=new ImageProfile({image:"${icon:page-template-template}"});
});
_1030.populateFromList(_102f.selections);
};
VisualMultiTemplateEditorBinding.prototype._onTemplateSelectionChanged=function(){
var _1032=this.getDescendantBindingByLocalName("selector");
var _1033=this.getContentWindow().bindingMap.templateselector;
_1032.selectByValue(_1033.getValue());
_1032.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
this.checkForDirty(true);
};
VisualMultiTemplateEditorBinding.prototype._parsePlaceHolders=function(_1034){
var nev=this._textareas;
var old=this._oldtextareas;
if(nev!=null){
nev.each(function(key,value){
old.set(key,value);
});
}
this._textareas=new Map();
function compute(_1039,_103a){
var _103b=_103a;
if(old.has(_1039)){
_103b=old.get(_1039).placeholdermarkup;
}
return _103b;
}
while(_1034.hasNext()){
var _103c=_1034.getNext();
var _103d=_103c.getAttribute("placeholderid");
this._textareas.set(_103d,{placeholderid:_103d,placeholdername:_103c.getAttribute("placeholdername"),placeholdermarkup:compute(_103d,_103c.value),textareaelement:_103c,isSelected:_103c.getAttribute("selected")=="true"});
}
var _103e=null;
var _103f=this.getContentWindow().bindingMap.templatetree;
var _1040=new Map();
this._textareas.each(function(name,_1042){
var _1043=_103f.add(TreeNodeBinding.newInstance(_103f.bindingDocument));
_1043.setLabel(_1042.placeholdername);
_1043.setImage("${icon:placeholder}");
_1043.setProperty("placeholder",true);
_1043.textareaname=name;
_1040.set(_1042.placeholdername,_1043);
if(_1042.isSelected){
_103e=_1043;
}
});
_103f.attachRecursive();
if(_103e!=null){
var _1044=true;
if(this._oldtextareas.hasEntries()){
_1044=false;
var map=new Map();
this._textareas.each(function(id,_1047){
map.set(_1047.placeholdername,true);
});
if(!map.has(this._placeholdername)){
_1044=true;
}
}
if(_1044){
var _1048=this._textareas.get(_103e.textareaname);
this._textareaname=_103e.textareaname;
this._placeholdername=_1048.placeholdername;
this._setContentFromPlaceHolder(_103e.textareaname);
_103e.focus();
}else{
var _1049=_1040.get(this._placeholdername);
this._textareaname=_1049.textareaname;
_1049.focus();
}
}
};
VisualMultiTemplateEditorBinding.prototype.updateElement=function(_104a,_104b){
var _104c=_104a.getElementsByTagName("ui:selector").item(0);
var _104d=_104b.getElementsByTagName("ui:selector").item(0);
var _104e=false;
if(_104c!=null&&_104d!=null){
var _104f=new List(_104c.getElementsByTagName("ui:selection"));
var _1050=new List(_104d.getElementsByTagName("ui:selection"));
if(_104f.getLength()!=_1050.getLength()){
_104e=true;
}else{
_104f.each(function(_1051,index){
var _1053=_1051.getAttribute("value");
var _1054=_1050.get(index).getAttribute("value");
if(_1053!=_1054){
_104e=true;
}
return !_104e;
});
}
}
if(_104e){
var div=this.bindingElement.getElementsByTagName("div").item(1);
this.bindingWindow.DocumentManager.detachBindings(div,true);
div.innerHTML=DOMSerializer.serialize(_104c);
this.bindingWindow.DocumentManager.attachBindings(div);
this._populateTemplateSelector();
}
return VisualMultiTemplateEditorBinding.superclass.updateElement.call(this,_104a,_104b);
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
BespinEditorPopupBinding.prototype.configure=function(_1056,frame,_1058){
this._editorBinding=_1056;
this._codePressFrame=frame;
this._codePressEngine=_1058;
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
var _105e=this.getProperty("validate");
if(_105e==true){
this._hasStrictValidation=true;
}
var _105f=this.getProperty("validator");
if(_105f!=null){
this._validator=_105f;
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
BespinEditorBinding.prototype.handleBroadcast=function(_1060,arg){
BespinEditorBinding.superclass.handleBroadcast.call(this,_1060,arg);
switch(_1060){
case BroadcastMessages.BESPIN_LOADED:
var _1062=this.getContentWindow().bindingMap.bespinwindow;
if(_1062!=null){
var _1063=_1062.getContentWindow();
if(arg.broadcastWindow==_1063){
this._bespinEnvelope=arg.bespinEnvelope;
this._bespinEditor=arg.bespinEditor;
this._bespinElement=this._bespinEditor.textView.domNode;
this._bespinEditor.syntax=this.syntax;
this._bespinEnvelope.settings.set("theme","white");
this._bespinEnvelope.settings.set("fontface","monospace");
this._bespinEnvelope.settings.set("fontsize",13);
this._bespinEnvelope.settings.set("tabmode","tabs");
this._bespinEnvelope.settings.set("tabstop",4);
this.initializeEditorComponents(_1062);
this._bespinElement.addEventListener(DOMEvents.MOUSEDOWN,this,false);
var self=this;
this._bespinEditor.textChanged.add(function(_1065,_1066,_1067){
self.checkForDirty();
});
if(this._pageBinding!=null){
this._initialize();
}
this.unsubscribe(_1060);
}
}
break;
}
};
BespinEditorBinding.prototype._onPageInitialize=function(_1068){
BespinEditorBinding.superclass._onPageInitialize.call(this,_1068);
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
BespinEditorBinding.prototype._activateEditor=function(_106b){
if(_106b!=this._isActivated){
this._isActivated=_106b;
EditorBinding.isActive=_106b;
var _106c=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_106c!=null){
if(_106b){
_106c.enable();
this.focus();
}else{
_106c.disable();
this.blur();
}
}else{
throw "Required broadcaster not found";
}
}
};
BespinEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1070=BespinEditorBinding.superclass.handleCommand.call(this,cmd,val);
switch(cmd){
case "Paste":
this._codePressFrame.syntaxHighlight("generic");
break;
}
return _1070;
};
BespinEditorBinding.prototype._finalize=function(){
this.setContent(this._startContent);
BespinEditorBinding.superclass._finalize.call(this);
};
BespinEditorBinding.prototype.initializeEditorComponent=function(_1071){
_1071.initializeSourceEditorComponent(this,this._bespinEditor);
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
var _1073=null;
if(this._codePressFrame!=null){
_1073=this._codePressFrame.contentWindow.document;
}
return _1073;
};
BespinEditorBinding.prototype.setContent=function(_1074){
if(!this._isFinalized){
if(_1074!=this._startContent){
this._startContent=_1074;
}
}
if(this.isInitialized&&this.getContentWindow().bindingMap!=null){
this.getContentWindow().bindingMap.editorpage.setContent(_1074);
this.resetUndoRedo();
this._checksum=this.getCheckSum();
}
return true;
};
BespinEditorBinding.prototype.getContent=function(){
var _1075=this.getContentWindow().bindingMap.editorpage.getContent();
return _1075?_1075:"";
};
BespinEditorBinding.prototype.resetUndoRedo=function(){
};
BespinEditorBinding.prototype.cover=function(_1076){
if(this._pageBinding!=null){
this._pageBinding.cover(_1076);
}
};
BespinEditorBinding.prototype.updateElement=function(_1077){
if(_1077!=null&&this.shadowTree.dotnetinput!=null){
var value=_1077.getAttribute("value");
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
var _1079=true;
var _107a=this.getContent();
if(this._validator!=null){
_1079=Validator.validateInformed(_107a,this._validator);
}else{
switch(this.syntax){
case BespinEditorBinding.syntax.XML:
case BespinEditorBinding.syntax.XSL:
case BespinEditorBinding.syntax.HTML:
_1079=XMLParser.isWellFormedDocument(_107a,true);
if(_1079==true&&this._hasStrictValidation){
switch(this.syntax){
case BespinEditorBinding.syntax.HTML:
_1079=this._isValidHTML(_107a);
break;
}
}
break;
}
}
return _1079;
};
BespinEditorBinding.prototype._isValidHTML=function(xml){
var _107c=true;
var doc=XMLParser.parse(xml);
var _107e=new List();
if(doc!=null){
var root=doc.documentElement;
if(root.nodeName!="html"){
_107e.add("MissingHtml");
}
if(root.namespaceURI!=Constants.NS_XHTML){
_107e.add("NamespaceURI");
}
var head=null,body=null;
var _1082=new List(root.childNodes);
while(_1082.hasNext()){
var child=_1082.getNext();
if(child.nodeType==Node.ELEMENT_NODE){
switch(child.nodeName){
case "head":
if(head!=null){
_107e.add("MultipleHead");
}
if(body!=null){
_107e.add("HeadBodyIndex");
}
head=child;
break;
case "body":
if(body!=null){
_107e.add("MultipleBody");
}
body=child;
break;
}
}
}
if(head==null){
_107e.add("MissingHead");
}
if(body==null){
_107e.add("MissingBody");
}
}
if(_107e.hasEntries()){
_107c=false;
Dialog.error(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML.DialogTitle"),StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_107e.getFirst()));
}
return _107c;
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
var _1084=null;
var page=this._pageBinding;
if(page!=null){
_1084=page.getCheckSum();
}
return _1084;
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
ThrobberBinding.prototype.handleBroadcast=function(_1086,arg){
ThrobberBinding.superclass.handleBroadcast.call(this,_1086,arg);
switch(_1086){
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
ProgressBarBinding.notch=function(_1089){
var bar=ProgressBarBinding._bindingInstance;
if(bar!=null){
bar.notch(_1089);
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
ProgressBarBinding.prototype.notch=function(_108b){
_108b=_108b?_108b:1;
var width=this._cover.getWidth()-(ProgressBarBinding.NOTCH*_108b);
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
StartMenuItemBinding.prototype.handleBroadcast=function(_108d,arg){
StartMenuItemBinding.superclass.handleBroadcast.call(this,_108d,arg);
switch(_108d){
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
StartMenuItemBinding.prototype.setChecked=function(_108f,_1090){
StartMenuItemBinding.superclass.setChecked.call(this,_108f,_1090);
if(!_1090){
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
KeySetBinding.registerKeyEventHandler=function(doc,key,_1093,_1094){
var _1095=KeySetBinding.keyEventHandlers;
if(Interfaces.isImplemented(IKeyEventHandler,_1094,true)==true){
if(_1093!="*"){
_1093=KeySetBinding._sanitizeKeyModifiers(_1093);
}
var code=window.KeyEventCodes[key];
if(!code){
code=key.charCodeAt(0);
}
if(!_1095[doc]){
_1095[doc]={};
}
if(!_1095[doc][code]){
_1095[doc][code]={};
}
_1095[doc][code][_1093]=_1094;
}
};
KeySetBinding.handleKey=function(doc,e){
var _1099=false;
var code=e.keyCode;
var _109b=KeySetBinding.keyEventHandlers;
if(_109b[doc]&&_109b[doc][code]){
var _109c="[default]";
_109c+=code!=KeyEventCodes.VK_SHIFT?e.shiftKey?" shift":"":"";
_109c+=code!=KeyEventCodes.VK_CONTROL?e.ctrlKey?" control":"":"";
var _109d=_109b[doc][code][_109c];
if(_109d==null){
_109d=_109b[doc][code]["*"];
}
if(_109d!=null){
_109d.handleKeyEvent(e);
_1099=true;
}
}
return _1099;
};
KeySetBinding._sanitizeKeyModifiers=function(_109e){
var _109f="[default]";
var mods={};
if(_109e){
new List(_109e.split(" ")).each(function(_10a1){
mods[_10a1]=true;
});
function check(_10a2){
if(mods[_10a2]){
_109f+=" "+_10a2;
}
}
check("shift");
check("control");
}
return _109f;
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
var _10a6=key.getAttribute("oncommand");
var _10a7=key.getAttribute("preventdefault")=="true";
KeySetBinding.registerKeyEventHandler(self.bindingDocument,key.getAttribute("key"),key.getAttribute("modifiers"),{handleKeyEvent:function(e){
DOMEvents.stopPropagation(e);
if(_10a7){
DOMEvents.preventDefault(e);
}
var _10a9=self.bindingWindow.WindowManager;
top.setTimeout(function(){
Binding.evaluate(_10a6,self);
},0);
}});
});
};
CursorBinding.prototype=new Binding;
CursorBinding.prototype.constructor=CursorBinding;
CursorBinding.superclass=Binding.prototype;
CursorBinding.fadeIn=function(_10aa){
if(_10aa instanceof CursorBinding){
_10aa.setOpacity(0);
_10aa.show();
new Animation({modifier:Client.isExplorer?18:9,onstep:function(_10ab){
_10aa.setOpacity(Math.sin(_10ab*Math.PI/180));
},onstop:function(){
_10aa.setOpacity(1);
}}).play();
}
};
CursorBinding.fadeOut=function(_10ac){
if(_10ac instanceof CursorBinding){
new Animation({modifier:Client.isExplorer?18:9,onstep:function(_10ad){
_10ac.setOpacity(Math.cos(_10ad*Math.PI/180));
},onstop:function(){
_10ac.hide();
}}).play();
}
};
CursorBinding.moveOut=function(_10ae,_10af,_10b0){
if(_10ae instanceof CursorBinding){
_10b0.x-=16;
_10b0.y-=16;
new Animation({modifier:3,onstep:function(_10b1){
var tal=Math.sin(_10b1*Math.PI/180);
_10ae.setPosition(new Point(((1-tal)*_10af.x)+((0+tal)*_10b0.x),((1-tal)*_10af.y)+((0+tal)*_10b0.y)));
},onstop:function(){
CursorBinding.fadeOut(_10ae);
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
CursorBinding.prototype.setOpacity=function(_10b7){
if(Client.isMozilla){
this.bindingElement.style.MozOpacity=new String(_10b7);
}else{
this.bindingElement.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+new String(_10b7*100)+")";
}
this._opacity=_10b7;
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
function setOpacity(_10ba){
if(Client.isMozilla){
cover.bindingElement.style.opacity=new String(_10ba);
}else{
cover.bindingElement.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+new String(_10ba*100)+")";
}
}
if(cover instanceof CoverBinding){
new Animation({modifier:Client.isExplorer?30:18,onstep:function(_10bb){
if(Binding.exists(cover)){
setOpacity(Math.cos(_10bb*Math.PI/180));
}
},onstop:function(){
if(Binding.exists(cover)){
cover.hide();
}
}}).play();
}
};
CoverBinding.fadeIn=function(cover){
function setOpacity(_10bd){
if(Client.isMozilla){
cover.bindingElement.style.MozOpacity=new String(_10bd);
}else{
cover.bindingElement.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+new String(_10bd*100)+")";
}
}
if(cover instanceof CoverBinding){
new Animation({modifier:Client.isExplorer?30:18,onstart:function(){
if(Binding.exists(cover)){
setOpacity(0);
cover.show();
}
},onstep:function(_10be){
if(Binding.exists(cover)){
setOpacity(Math.sin(_10be*Math.PI/180));
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
CoverBinding.prototype.setBusy=function(_10c0){
if(_10c0!=this._isBusy){
if(_10c0){
this.bindingElement.style.cursor="wait";
}else{
this.bindingElement.style.cursor="default";
}
this._isBusy=_10c0;
}
};
CoverBinding.prototype.setTransparent=function(_10c1){
if(_10c1!=this._isTransparent){
if(_10c1){
this.attachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}else{
this.detachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}
this._isTransparent=_10c1;
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
CoverBinding.prototype.setHeight=function(_10c3){
if(_10c3>=0){
this.bindingElement.style.height=new String(_10c3+"px");
}
};
CoverBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
CoverBinding.newInstance=function(_10c4){
var _10c5=DOMUtil.createElementNS(Constants.NS_UI,"ui:cover",_10c4);
return UserInterface.registerBinding(_10c5,CoverBinding);
};
UncoverBinding.prototype=new Binding;
UncoverBinding.prototype.constructor=UncoverBinding;
UncoverBinding.superclass=Binding.prototype;
UncoverBinding._bindingInstance=null;
UncoverBinding.uncover=function(pos){
var _10c7=UncoverBinding._bindingInstance;
if(Binding.exists(_10c7)){
_10c7.setPosition(pos);
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
TheatreBinding.prototype.play=function(_10cb){
this._isFading=_10cb==true;
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
var _10cc=this._canvas.getContext("2d");
var alpha=parseInt(0);
TheatreBinding._interval=top.setInterval(function(){
if(alpha<0.5){
_10cc.fillStyle="rgba(0,0,0,"+new String(alpha)+")";
_10cc.clearRect(0,0,300,150);
_10cc.fillRect(0,0,300,150);
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
var _10ce=this._canvas.getContext("2d");
_10ce.clearRect(0,0,300,150);
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
var _10cf=SourceCodeViewerBinding.stylesheets[this._syntax];
this._transformer=new XSLTransformer();
this._transformer.importStylesheet(_10cf);
break;
default:
throw "SourceCodeViewer: Syntax error!";
this._syntax=null;
break;
}
var _10d0=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_10d0){
this._startcontent=_10d0.value;
}
this.setURL(SourceCodeViewerBinding.URL_DEFAULT);
this.addActionListener(WindowBinding.ACTION_ONLOAD);
SourceCodeViewerBinding.superclass.onBindingAttach.call(this);
};
SourceCodeViewerBinding.prototype.handleAction=function(_10d1){
SourceCodeViewerBinding.superclass.handleAction.call(this,_10d1);
switch(_10d1.type){
case WindowBinding.ACTION_ONLOAD:
if(_10d1.target==this){
if(this._startcontent){
this.view(this._startcontent);
}
this.dispatchAction(SourceCodeViewerBinding.ACTION_INITIALIZED);
_10d1.consume();
}
break;
}
SourceCodeViewerBinding.superclass.handleAction.call(this,_10d1);
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
var _10d5=this._transformer.transformToString(doc);
this._inject(_10d5);
}
};
SourceCodeViewerBinding.prototype._viewHTML=function(arg){
};
SourceCodeViewerBinding.prototype._viewJavascript=function(arg){
};
SourceCodeViewerBinding.prototype._inject=function(_10d8){
this.getContentDocument().body.innerHTML=_10d8;
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
var _10e0=list.getNext();
var id=_10e0.getAttribute("id");
map[id]={};
var atts=this._resolver.resolveAll("p:att",_10e0);
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
var _10ea=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"persist",doc);
_10ea.setAttribute("id",id);
for(var name in map[id]){
var att=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"att",doc);
att.setAttribute("name",name);
att.setAttribute("value",map[id][name]);
_10ea.appendChild(att);
}
elm.appendChild(_10ea);
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
var _10f4=window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance;
if(_10f4){
doc=XMLParser.parse(_10f4);
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
var _10f8=DOMSerializer.serialize(doc,true);
window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance=_10f8;
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
LocalizationSelectorBinding.prototype.handleBroadcast=function(_10f9,arg){
LocalizationSelectorBinding.superclass.handleBroadcast.call(this,_10f9,arg);
switch(_10f9){
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
var _10fc=new List();
list.each(function(lang){
_10fc.add(new SelectorBindingSelection(lang.Name,lang.SerializedActionToken,lang.IsCurrent,null));
});
this.populateFromList(_10fc);
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
Dialog.warning(StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogTitle"),StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogText"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_1100){
switch(_1100){
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
var _1103=new SystemAction({Label:"Generated Action: Change Locale",ActionToken:token});
SystemAction.invoke(_1103,root);
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
var _1104=this.getProperty("status");
if(_1104!=null){
switch(_1104){
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
UserInterfaceMapping.prototype.merge=function(_1107){
for(var _1108 in _1107.map){
this.map[_1108]=_1107.getBindingImplementation(_1108);
}
};
UserInterfaceMapping.prototype.getBindingImplementation=function(_1109){
var _110a=null;
var name=_1109.nodeName;
if(Client.isExplorer){
var small=name.toLowerCase();
if(name==small){
name="ui:"+name;
}else{
name=small;
}
}
if(this.map[name]){
_110a=this.map[name];
}
return _110a;
};
var UserInterface=new function(){
var _110d=(Client.isMozilla?MozEditorTextBoxBinding:IEEditorTextBoxBinding);
var _110e=new UserInterfaceMapping({"body":RootBinding,"ui:binding":Binding,"ui:box":Binding,"ui:dialog":DialogBinding,"ui:dialoghead":DialogHeadBinding,"ui:dialogbody":DialogBodyBinding,"ui:dialogmatrix":DialogMatrixBinding,"ui:dialogset":DialogSetBinding,"ui:dialogborder":DialogBorderBinding,"ui:dialogcover":DialogCoverBinding,"ui:titlebar":DialogTitleBarBinding,"ui:titlebarbody":DialogTitleBarBodyBinding,"ui:window":WindowBinding,"ui:controlgroup":ControlGroupBinding,"ui:control":ControlBinding,"ui:menubar":MenuBarBinding,"ui:menu":MenuBinding,"ui:menubody":MenuBodyBinding,"ui:menugroup":MenuGroupBinding,"ui:menuitem":MenuItemBinding,"ui:menupopup":MenuPopupBinding,"ui:tabbox":TabBoxBinding,"ui:tabs":TabsBinding,"ui:tab":TabBinding,"ui:tabpanels":TabPanelsBinding,"ui:tabpanel":TabPanelBinding,"ui:splitbox":SplitBoxBinding,"ui:splitpanel":SplitPanelBinding,"ui:splitter":SplitterBinding,"ui:decks":DecksBinding,"ui:deck":DeckBinding,"ui:toolbar":ToolBarBinding,"ui:toolbargroup":ToolBarGroupBinding,"ui:toolbarbody":ToolBarBodyBinding,"ui:toolbarbutton":ToolBarButtonBinding,"ui:toolbarlabel":ToolBarLabelBinding,"ui:labelbox":LabelBinding,"ui:text":TextBinding,"ui:clickbutton":ClickButtonBinding,"ui:tree":TreeBinding,"ui:treebody":TreeBodyBinding,"ui:treenode":TreeNodeBinding,"ui:flexbox":FlexBoxBinding,"ui:scrollbox":ScrollBoxBinding,"ui:popupset":PopupSetBinding,"ui:popup":PopupBinding,"ui:shadow":ShadowBinding,"ui:matrix":MatrixBinding,"ui:sourceeditor":BespinEditorBinding,"ui:visualeditor":VisualEditorBinding,"ui:visualmultieditor":VisualMultiEditorBinding,"ui:visualmultitemplateeditor":VisualMultiTemplateEditorBinding,"ui:wysiwygeditortoolbarbutton":EditorToolBarButtonBinding,"ui:dock":DockBinding,"ui:docktabs":DockTabsBinding,"ui:docktab":DockTabBinding,"ui:dockpanels":DockPanelsBinding,"ui:dockpanel":DockPanelBinding,"ui:page":PageBinding,"ui:editorpage":EditorPageBinding,"ui:dialogpage":DialogPageBinding,"ui:pagebody":DialogPageBodyBinding,"ui:wizardpage":WizardPageBinding,"ui:explorer":ExplorerBinding,"ui:explorerdecks":ExplorerDecksBinding,"ui:explorerdeck":ExplorerDeckBinding,"ui:explorersplitter":ExplorerSplitterBinding,"ui:explorermenu":ExplorerMenuBinding,"ui:explorertoolbar":ExplorerToolBarBinding,"ui:explorertoolbarbutton":ExplorerToolBarButtonBinding,"ui:stagecontainer":StageContainerBinding,"ui:stage":StageBinding,"ui:stagedecks":StageDecksBinding,"ui:stagedeck":StageDeckBinding,"ui:viewset":ViewSetBinding,"ui:view":ViewBinding,"ui:broadcasterset":BroadcasterSetBinding,"ui:broadcaster":BroadcasterBinding,"ui:fields":FieldsBinding,"ui:fieldgroup":FieldGroupBinding,"ui:field":FieldBinding,"ui:fielddesc":FieldDescBinding,"ui:fielddata":FieldDataBinding,"ui:fieldhelp":FieldHelpBinding,"ui:datainput":DataInputBinding,"ui:selector":SelectorBinding,"ui:simpleselector":SimpleSelectorBinding,"ui:multiselector":MultiSelectorBinding,"ui:datainputselector":DataInputSelectorBinding,"ui:datainputdialog":DataInputDialogBinding,"ui:textbox":TextBoxBinding,"ui:editortextbox":_110d,"ui:radiodatagroup":RadioDataGroupBinding,"ui:radio":RadioDataBinding,"ui:checkbutton":CheckButtonBinding,"ui:checkbox":CheckBoxBinding,"ui:checkboxgroup":CheckBoxGroupBinding,"ui:datadialog":DataDialogBinding,"ui:postbackdialog":PostBackDataDialogBinding,"ui:nullpostbackdialog":NullPostBackDataDialogBinding,"ui:htmldatadialog":HTMLDataDialogBinding,"ui:functioneditor":FunctionEditorDataBinding,"ui:parametereditor":ParameterEditorDataBinding,"ui:keyset":KeySetBinding,"ui:cover":CoverBinding,"ui:uncover":UncoverBinding,"ui:cursor":CursorBinding,"ui:dialogtoolbar":DialogToolBarBinding,"ui:focus":FocusBinding,"ui:balloonset":BalloonSetBinding,"ui:balloon":BalloonBinding,"ui:error":ErrorBinding,"ui:throbber":ThrobberBinding,"ui:progressbar":ProgressBarBinding,"ui:lazybinding":LazyBindingBinding,"ui:sourcecodeviewer":SourceCodeViewerBinding,"ui:theatre":TheatreBinding,"ui:persistance":PersistanceBinding,"ui:filepicker":FilePickerBinding,"ui:request":RequestBinding,"ui:response":ResponseBinding});
var _110f=SystemLogger.getLogger("UserInterface");
var keys={};
this.registerBinding=function(_1111,impl){
var _1113=null;
if(!this.hasBinding(_1111)){
var _1114=DOMUtil.getParentWindow(_1111);
if(DOMUtil.getLocalName(_1111)!="bindingmapping"){
if(!impl&&_1111.getAttribute("binding")!=null){
var _1115=_1111.getAttribute("binding");
impl=_1114[_1115];
if(impl==null){
throw "No such binding in scope: "+_1115;
}
}
if(!impl){
var _1116=_1114.DocumentManager;
if(_1116){
var _1117=_1116.customUserInterfaceMapping;
if(_1117){
impl=_1117.getBindingImplementation(_1111);
}
}
}
if(!impl){
impl=_110e.getBindingImplementation(_1111);
}
if(impl!=null&&!Application.isMalFunctional){
try{
_1113=new impl();
}
catch(exception){
Application.isMalFunctional=true;
alert("No such binding!\n"+exception.message+(exception.stack?"\n"+exception.stack:""));
throw (exception);
}
}
if(_1113){
var key=KeyMaster.getUniqueKey();
_1111.setAttribute("key",key);
_1113.key=key;
if(!_1111.id){
_1111.id=key;
}
keys[key]={element:_1111,binding:_1113};
_1113.onBindingRegister();
}
}
}
return _1113;
};
this.unRegisterBinding=function(_1119){
terminate(_1119);
};
function terminate(_111a){
if(Binding.exists(_111a)==true){
var key=_111a.key;
Binding.destroy(_111a);
if(key){
if(keys[key]){
keys[key].binding=null;
keys[key].element=null;
delete keys[key];
_111a=null;
}else{
_110f.error("URGH: "+key);
}
}
}
}
this.getElement=function(_111c){
var _111d=null;
if(keys[_111c.key]){
_111d=keys[_111c.key].element;
}
return _111d;
};
this.getBinding=function(_111e){
var _111f=null;
if(_111e&&_111e.nodeType==Node.ELEMENT_NODE){
try{
var key=_111e.getAttribute("key");
if(key&&keys[key]){
_111f=keys[key].binding;
}
}
catch(exception){
alert("getBinding exception occured on element:\n\n\t\t"+_111e);
if(exception.stack){
alert(exception.stack);
}
}
}
return _111f;
};
this.getBindingByKey=function(key){
var _1122=null;
if(keys[key]){
_1122=keys[key].binding;
}
return _1122;
};
this.hasBinding=function(_1123){
return this.getBinding(_1123)!=null;
};
this.isBindingVisible=function(_1124){
var _1125=Application.isOperational;
if(_1125==true){
var _1126=new Crawler();
_1126.type=NodeCrawler.TYPE_ASCENDING;
_1126.id="visibilitycrawler";
_1126.addFilter(function(_1127){
var b=UserInterface.getBinding(_1127);
var res=0;
if(!b.isVisible){
_1125=false;
res=NodeCrawler.STOP_CRAWLING;
}
return res;
});
_1126.crawl(_1124.bindingElement);
_1126.dispose();
}
return _1125;
};
var _112a=null;
this.getBindingCount=function(){
var count=0;
for(var key in keys){
count++;
}
return count;
};
this.setPoint=function(){
_112a={};
for(var key in keys){
_112a[key]=true;
}
};
this.getPoint=function(){
var _112e=null;
if(_112a){
_112e=new List();
for(var key in keys){
if(!_112a[key]){
_112e.add(key);
}
}
}
return _112e;
};
this.clearPoint=function(){
_112a=null;
};
this.trackUndisposedBindings=function(){
var _1130=null;
for(var key in keys){
var entry=keys[key];
if(!entry.binding||!entry.element||!Binding.exists(entry.binding)){
if(!_1130){
_1130="Bindings illdisposed: ";
}
_1130+=entry.binding+" ";
}
}
if(_1130!=null){
_110f.error(_1130);
}
};
this.autoTrackDisposedBindings=function(_1133){
if(_1133){
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
SOAPRequest.newInstance=function(_1134,_1135){
var _1136=_1134+"/"+_1135;
var _1137=new SOAPRequest(_1136);
var _1138=SOAPRequest.resolver;
_1137.document=Templates.getTemplateDocument("soapenvelope.xml");
_1137.envelope=_1138.resolve("soap:Envelope",_1137.document);
_1137.header=_1138.resolve("soap:Header",_1137.envelope);
_1137.body=_1138.resolve("soap:Body",_1137.envelope);
return _1137;
};
SOAPRequest._parseResponse=function(_1139){
var _113a=null;
var _113b=false;
var doc=_1139.responseXML;
if(doc!=null&&doc.documentElement!=null){
switch(doc.documentElement.namespaceURI){
case Constants.NS_ENVELOPE:
_113a=SOAPRequestResponse.newInstance(_1139.responseXML);
if(Application.isOffLine){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_ONLINE);
}
break;
case Constants.NS_XHTML:
if(!Application.isOffLine){
var body=SOAPRequest.resolver.resolve("xhtml:html/xhtml:body",_1139.responseXML);
if(body&&body.getAttribute("id")=="offline"){
_113b=true;
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
var text=_1139.responseText;
if(text.indexOf("id=\"offline\"")>-1){
_113b=true;
}else{
var cry="Invalid SOAP response: \n\n"+_1139.responseText;
SystemLogger.getLogger("SOAPRequest._parseResponse (static)").error(cry);
if(Application.isDeveloperMode){
alert("Invalid SOAP response");
window.open("about:blank").document.write(_1139.responseText);
}
}
}
}
if(_113b==true){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_OFFLINE);
}
return _113a;
};
function SOAPRequest(_1140){
this.logger=SystemLogger.getLogger("SOAPRequest");
this.action=_1140;
return this;
}
SOAPRequest.prototype.invoke=function(url){
var _1142=DOMUtil.getXMLHTTPRequest();
var _1143=null;
_1142.open("post",url,false);
_1142.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_1142.setRequestHeader("SOAPAction",this.action);
try{
_1142.send(this.document);
_1143=SOAPRequest._parseResponse(_1142);
}
catch(exception){
var error="Dysfuntion in SOAP invoke: "+url;
if(this.document!=null){
error+="\n"+DOMSerializer.serialize(this.document,true);
}
this.logger.error(error);
throw exception;
}
_1142=null;
return _1143;
};
SOAPRequest.prototype.dispose=function(){
for(var _1145 in this){
this[_1145]=null;
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
var _1147=null;
if(doc&&doc.documentElement){
_1147=new SOAPRequestResponse();
var _1148=SOAPRequestResponse.resolver;
_1147.document=doc;
_1147.envelope=_1148.resolve("soap:Envelope",_1147.document);
_1147.header=_1148.resolve("soap:Header",_1147.envelope);
_1147.body=_1148.resolve("soap:Body",_1147.envelope);
var fault=_1148.resolve("soap:Fault",_1147.body);
if(fault){
SOAPRequestResponse.logger.fatal(DOMSerializer.serialize(fault,true));
_1147.fault={element:fault,faultNamespaceURI:fault.namespaceURI,faultCode:DOMUtil.getTextContent(_1148.resolve("faultcode",fault)),faultString:DOMUtil.getTextContent(_1148.resolve("faultstring",fault)),detail:fault.getElementsByTagName("detail").item(0)};
}
}
return _1147;
};
function SOAPFault(_114a,_114b,_114c){
this._operationName=_114a;
this._operationAddress=_114b;
this._faultString=_114c;
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
SOAPFault.newInstance=function(_114d,fault){
return new SOAPFault(_114d.name,_114d.address,fault.faultString);
};
function SOAPEncoder(wsdl,_1150){
this.logger=SystemLogger.getLogger("SOAPEncoder");
this._wsdl=wsdl;
this._operation=_1150;
this._namespace=wsdl.getTargetNamespace();
}
SOAPEncoder.prototype.encode=function(args){
var _1152=SOAPRequest.newInstance(this._namespace,this._operation);
var root=this._appendElement(_1152.body,this._operation);
var _1154=this._wsdl.getSchema();
var _1155=_1154.lookup(this._operation);
var _1156=_1155.getListedDefinitions();
while(_1156.hasNext()){
var def=_1156.getNext();
var elm=this._appendElement(root,def.name);
var val=args.getNext();
this._resolve(elm,def,val);
}
return _1152;
};
SOAPEncoder.prototype._resolve=function(_115a,_115b,value){
var _115d=this._wsdl.getSchema();
if(_115b.isSimpleValue){
this._appendText(_115a,value,_115b.type=="string");
}else{
var _115e=_115d.lookup(_115b.type);
if(_115e instanceof SchemaSimpleType){
alert("SOAPEncoder: SchemaSimpleType support not implemented!");
}else{
var defs=_115e.getListedDefinitions();
if(_115e.isArray){
var _1160=new List(value);
var def=defs.getNext();
while(_1160.hasNext()){
var elm=this._appendElement(_115a,def.name);
var val=_1160.getNext();
this._resolve(elm,def,val);
}
}else{
while(defs.hasNext()){
try{
var def=defs.getNext();
var elm=this._appendElement(_115a,def.name);
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
SOAPEncoder.prototype._appendText=function(_1167,value,_1169){
if(value!=null){
value=new String(value);
var safe=new String("");
var chars=value.split("");
var _116c=false;
var i=0,c;
while(c=chars[i++]){
var _116f=true;
var code=c.charCodeAt(0);
switch(code){
case 9:
case 10:
case 13:
_116f=false;
break;
default:
if((code>=32&&code<=55295)||(code>=57344&&code<=65533)||(code>=65536&&code<=1114111)){
_116f=false;
}
break;
}
if(!_116f){
safe+=c;
}else{
_116c=true;
}
}
if(_116c){
this.logger.debug("Illegal XML character(s) was deleted from the string: "+value);
}
_1167.appendChild(_1167.ownerDocument.createTextNode(safe));
}
};
function SOAPDecoder(wsdl,_1172){
this._wsdl=wsdl;
this._operation=_1172;
this._resolver=new XPathResolver();
this._resolver.setNamespacePrefixResolver({"result":wsdl.getTargetNamespace()});
}
SOAPDecoder.prototype.resolve=function(xpath,node){
return this._resolver.resolve("result:"+xpath,node);
};
SOAPDecoder.prototype.resolveAll=function(xpath,node){
return this._resolver.resolveAll("result:"+xpath,node);
};
SOAPDecoder.prototype.decode=function(_1177){
var _1178=null;
var _1179=this._wsdl.getSchema();
var id=this._operation+"Response";
var _117b=this.resolve(id,_1177.body);
var _117c=_1179.lookup(id);
var _117d=_117c.getListedDefinitions();
while(!_1178&&_117d.hasNext()){
var def=_117d.getNext();
var elm=this.resolve(def.name,_117b);
if(def.type==SchemaDefinition.TYPE_XML_DOCUMENT){
_1178=DOMUtil.getDOMDocument();
var e=elm.getElementsByTagName("*").item(0);
if(typeof _1178.importNode!=Types.UNDEFINED){
_1178.appendChild(_1178.importNode(e,true));
}else{
_1178.loadXML(DOMSerializer.serialize(e));
}
}else{
_1178=this._compute(elm,def);
}
}
return _1178;
};
SOAPDecoder.prototype._compute=function(_1181,_1182){
var _1183=null;
var _1184=this._wsdl.getSchema();
if(_1182.isSimpleValue){
_1183=this._getSimpleValue(_1181,_1182.type);
}else{
var _1185=_1184.lookup(_1182.type);
if(_1185 instanceof SchemaSimpleType){
_1183=this._getSimpleValue(_1181,_1185.restrictionType);
}else{
var defs=_1185.getListedDefinitions();
if(_1185.isArray){
_1183=[];
var def=defs.getNext();
var elms=this.resolveAll(def.type,_1181);
while(elms.hasNext()){
var elm=elms.getNext();
_1183.push(this._compute(elm,def));
}
}else{
_1183={};
defs.reset();
while(defs.hasNext()){
var def=defs.getNext();
var elm=this.resolve(def.name,_1181);
if(elm){
_1183[def.name]=this._compute(elm,def);
}else{
if(def.isRequired){
throw new Error("SOAPDecoder: invalid SOAP response.");
}
}
}
}
}
}
return _1183;
};
SOAPDecoder.prototype._getSimpleValue=function(_118a,type){
var _118c=null;
if(_118a.firstChild&&_118a.firstChild.nodeType==Node.TEXT_NODE){
if(Client.isMozilla&&_118a.childNodes.length>1){
_118a.normalize();
}
_118c=_118a.firstChild.data;
switch(type){
case Schema.types.STRING:
_118c=_118c;
break;
case Schema.types.INT:
case Schema.types.FLOAT:
case Schema.types.DOUBLE:
_118c=Number(_118c);
break;
case Schema.types.BOOLEAN:
_118c=_118c=="true";
break;
default:
throw ("SOAPDecoder: schema type \""+type+"\" not handled.");
break;
}
}
return _118c;
};
Schema.prototype=new XPathResolver;
Schema.prototype.constructor=Schema;
Schema.superclass=XPathResolver.prototype;
Schema.types={STRING:"string",INT:"int",FLOAT:"float",DOUBLE:"double",BOOLEAN:"boolean"};
Schema.notSupportedException=new Error("Schema: Schema structure not supported!");
function Schema(_118d){
this.logger=SystemLogger.getLogger("Schema");
this._map=this._parseSchema(_118d);
}
Schema.prototype._parseSchema=function(_118e){
this.setNamespacePrefixResolver({"wsdl":Constants.NS_WSDL,"soap":Constants.NS_SOAP,"s":Constants.NS_SCHEMA});
var _118f={};
var entry=null;
var rules=this.resolveAll("s:*[@name]",_118e);
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
_118f[rule.getAttribute("name")]=entry;
}
return _118f;
};
Schema.prototype.lookup=function(name){
return this._map[name];
};
SchemaDefinition.TYPE_XML_DOCUMENT="xmldocument";
function SchemaDefinition(_1194){
this.logger=SystemLogger.getLogger("SchemaDefinition");
this.isRequired=null;
this.type=null;
this._parse(_1194);
}
SchemaDefinition.prototype._parse=function(_1195){
var min=_1195.getAttribute("minOccurs");
var max=_1195.getAttribute("maxOccurs");
var type=_1195.getAttribute("type");
this.name=_1195.getAttribute("name");
this.isRequired=min!="0";
if(type){
var split=type.split(":");
var sort=split[0];
var _119b=split[1];
this.isSimpleValue=sort!="tns";
this.type=_119b;
}else{
var elm=_1195.getElementsByTagName("*").item(0);
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
function SchemaElementType(_119d,_119e){
this.logger=SystemLogger.getLogger("SchemaElementType");
this._definitions=new List();
this._parseListedDefinitions(_119d,_119e);
}
SchemaElementType.prototype._parseListedDefinitions=function(_119f,_11a0){
var els=_119f.resolveAll("s:complexType/s:sequence/s:element",_11a0);
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
function SchemaComplexType(_11a2,_11a3){
this._definitions=new List();
this._parseListedDefinitions(_11a2,_11a3);
this.isArray=_11a3.getAttribute("name").indexOf("ArrayOf")>-1;
}
SchemaComplexType.prototype._parseListedDefinitions=function(_11a4,_11a5){
var els=_11a4.resolveAll("s:sequence/s:element",_11a5);
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
function SchemaSimpleType(_11a8,_11a9){
this.restrictionType=null;
this._parse(_11a8,_11a9);
}
SchemaSimpleType.prototype._parse=function(_11aa,_11ab){
var _11ac=_11aa.resolve("s:restriction",_11ab);
if(_11ac){
this.restrictionType=_11ac.getAttribute("base").split(":")[1];
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
var _11af=null;
var _11b0=DOMUtil.getXMLHTTPRequest();
_11b0.open("get",url,false);
_11b0.send(null);
if(_11b0.responseXML){
_11af=_11b0.responseXML.documentElement;
}else{
alert(_11b0.responseText);
throw new Error("WebServiceResolver: Could not read WSDL: "+url);
}
return _11af;
};
WebServiceResolver.prototype.getPortAddress=function(){
return this._WSDLURL.split("?WSDL")[0];
};
WebServiceResolver.prototype.getTargetNamespace=function(){
return this._root.getAttribute("targetNamespace");
};
WebServiceResolver.prototype.getOperations=function(){
var _11b1=new List();
var _11b2=this.resolveAll("wsdl:portType/wsdl:operation",this._root);
if(_11b2.hasEntries()){
while(_11b2.hasNext()){
var _11b3=_11b2.getNext();
var name=_11b3.getAttribute("name");
_11b1.add(new WebServiceOperation(name,this.getPortAddress(),new SOAPEncoder(this,name),new SOAPDecoder(this,name)));
}
}else{
throw new Error("WebServiceResolver: No portType found.");
}
return _11b1;
};
WebServiceResolver.prototype.getSchema=function(){
return this._schema;
};
function WebServiceOperation(name,_11b6,_11b7,_11b8){
this.name=name;
this.address=_11b6;
this.encoder=_11b7;
this.decoder=_11b8;
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
var _11bc=wsdl.getOperations();
_11bc.each(function(_11bd){
proxy[_11bd.name]=WebServiceProxy.createProxyOperation(_11bd);
});
return proxy;
};
WebServiceProxy.prototype._log=function(_11be,_11bf){
if(WebServiceProxy.isLoggingEnabled&&Application.isDeveloperMode&&_11bf){
var log=_11bf instanceof SOAPRequest?"SOAPRequest for ":"SOAPResponse from ";
log+=_11be.address+": "+_11be.name+"\n\n";
log+=DOMSerializer.serialize(_11bf.document,true);
this.logger.fine(log);
}
};
WebServiceProxy.createProxyOperation=function(_11c1){
return function(){
var _11c2=null,_11c3=_11c1.encoder.encode(new List(arguments));
this._log(_11c1,_11c3);
var _11c4=_11c3.invoke(_11c1.address);
this._log(_11c1,_11c4);
if(_11c4){
if(_11c4.fault){
_11c2=SOAPFault.newInstance(_11c1,_11c4.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_11c2,_11c3,_11c4);
}
}else{
if(WebServiceProxy.isDOMResult){
_11c2=_11c4.document;
}else{
_11c2=_11c1.decoder.decode(_11c4);
}
}
}
_11c3.dispose();
return _11c2;
};
};
WebServiceProxy.handleFault=function(_11c5,_11c6,_11c7){
try{
Dialog.invokeModal(Dialog.URL_SERVICEFAULT,null,{soapFault:_11c5,soapRequest:_11c6,soapResponse:_11c7});
}
catch(exception){
alert(_11c5.getFaultString());
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
var _11c8=SystemLogger.getLogger("MessageQueue");
var _11c9=null;
var _11ca=0;
var _11cb=null;
var _11cc=new Map();
var _11cd=new Map();
var _11ce=false;
var _11cf=false;
var _11d0={"Main":DockBinding.MAIN,"BottomLeft":DockBinding.BOTTOMLEFT,"BottomRight":DockBinding.BOTTOMRIGHT,"RightTop":DockBinding.RIGHTTOP,"RightBottom":DockBinding.RIGHTBOTTOM,"AbsBottomLeft":DockBinding.ABSBOTTOMLEFT,"AbsBottomRight":DockBinding.ABSBOTTOMRIGHT};
this.initialize=function(){
_11c9=ConsoleMessageQueueService;
_11ca=_11c9.GetCurrentSequenceNumber("dummyparam!");
this.index=_11ca;
EventBroadcaster.subscribe(BroadcastMessages.VIEW_COMPLETED,this);
EventBroadcaster.subscribe(BroadcastMessages.VIEW_CLOSED,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_OFFLINE,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_ONLINE,this);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
};
this._autoupdate=function(){
if(!_11ce){
if(!MessageQueue._actions.hasEntries()){
var _11d1=WebServiceProxy.isLoggingEnabled;
if(Application.isLoggedIn){
_11cf=true;
WebServiceProxy.isLoggingEnabled=false;
MessageQueue.update();
WebServiceProxy.isLoggingEnabled=_11d1;
_11cf=false;
}
}
}
};
this._pokeserver=function(){
if(_11ce==true){
if(ReadyService.IsServerReady(true)){
MessageQueue._lockSystem(false);
}
}
};
this.update=function(){
if(Application.isLoggedIn){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_REQUESTED,_11cf);
var _11d2=_11c9.GetMessages(Application.CONSOLE_ID,this.index);
if(_11d2!=null){
if(Types.isDefined(_11d2.CurrentSequenceNumber)){
var _11d3=_11d2.CurrentSequenceNumber;
if(_11d3<this.index){
_11c8.debug("SERVER WAS RESTARTED! old messagequeue index: "+this.index+", new messagequeue index: "+_11d3);
}
this.index=_11d3;
var _11d4=new List(_11d2.ConsoleActions);
if(_11d4.hasEntries()){
this.evaluate(_11d4);
}else{
if(!this._actions.hasEntries()){
broadcastUpdateEvaluated();
}
}
}else{
_11c8.error("No sequencenumber in MessageQueue response!");
}
}
}
};
this.evaluate=function(_11d5){
var _11d6=new List();
if(_11d5.hasEntries()){
_11d5.each(function(_11d7){
if(this._index[_11d7.Id]!=true){
_11d6.add(_11d7);
}
this._index[_11d7.Id]=true;
},this);
if(_11d6.hasEntries()){
if(this._actions.hasEntries()){
this._actions.merge(_11d6);
}else{
this._actions=_11d6;
}
this._nextAction();
}
}
};
this._closeAllViews=function(_11d8){
var _11d9="(No reason)";
if(_11d8!=null){
_11d9=_11d8.Reason;
}
var title="Warning";
var text="The server has requested a close of all active editors for the following reason: \"${reason}\". It is recommended that you accept this request by clicking OK.";
text=text.replace("${reason}",_11d9);
var self=this;
Dialog.warning(title,text,Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_11dd){
if(_11dd==Dialog.RESPONSE_ACCEPT){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEWS);
}
self._nextAction();
}});
};
this._nextAction=function(){
var _11de=null;
if(this._actions.hasEntries()){
var _11df=this._actions.extractFirst();
_11ca=_11df.SequenceNumber;
_11c8.debug("MessageQueue action: "+_11df.ActionType+" > QUEUE-MAX-SEQNUM: "+this.index+" > CURRENT SEQNUM: "+_11ca+" > ACTIONS-LEFT: "+this._actions.getLength());
switch(_11df.ActionType){
case "OpenView":
_11de=_11df.OpenViewParams;
if(_11de.ViewType=="ModalDialog"){
openDialogView(_11de);
}else{
_11cb=_11de.ViewId;
openView(_11de);
}
break;
case "CloseView":
_11de=_11df.CloseViewParams;
_11cb=_11de.ViewId;
closeView(_11de);
break;
case "RefreshTree":
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,_11df.RefreshTreeParams.EntityToken);
var debug="REFRESHING TREES: "+_11cc.countEntries()+"\n";
_11cc.each(function(token){
debug+="\n\tTOKEN: "+token;
});
_11c8.debug(debug);
if(!_11cc.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "MessageBox":
openMessageBox(_11df.MessageBoxParams);
break;
case "OpenViewDefinition":
_11de=_11df.OpenViewDefinitionParams;
_11cb=_11de.Handle;
openViewDefinition(_11de);
break;
case "LogEntry":
logEntry(_11df.LogEntryParams);
this._nextAction();
break;
case "Reboot":
Application.reload(true);
break;
case "LockSystem":
MessageQueue._lockSystem(true);
break;
case "BroadcastMessage":
_11de=_11df.BroadcastMessageParams;
_11c8.debug("Server says: EventBroadcaster.broadcast ( \""+_11de.Name+"\", "+_11de.Value+" )");
EventBroadcaster.broadcast(_11de.Name,_11de.Value);
this._nextAction();
break;
case "CollapseAndRefresh":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_COLLAPSEALL);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
if(!_11cc.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "CloseAllViews":
this._closeAllViews(_11df.CloseAllViewsParams);
break;
case "SaveStatus":
saveStatus(_11df.SaveStatusParams);
this._nextAction();
break;
case "DownloadFile":
Download.init(_11df.DownloadFileParams.Url);
this._nextAction();
break;
case "ExpandTreeNode":
this._nextAction();
break;
case "BindEntityTokenToView":
_11de=_11df.BindEntityTokenToViewParams;
EventBroadcaster.broadcast(BroadcastMessages.BIND_TOKEN_TO_VIEW,{handle:_11de.ViewId,entityToken:_11de.EntityToken});
this._nextAction();
break;
case "OpenGenericView":
_11de=_11df.OpenGenericViewParams;
openGenericView(_11de);
break;
default:
Dialog.error("Dysfunction","Unhandled action: "+_11df.ActionType);
break;
}
}else{
broadcastUpdateEvaluated();
}
};
function broadcastUpdateEvaluated(){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_EVALUATED,_11cf);
}
function logEntry(_11e2){
var _11e3=_11e2.Level.toLowerCase();
SystemLogger.getLogger(_11e2.SenderId)[_11e3](_11e2.Message);
}
function openView(_11e4){
var list=paramsToList(_11e4.Argument);
if(list.hasEntries()){
var def=ViewDefinition.clone("Composite.Management.PostBackView",_11e4.ViewId);
def.entityToken=_11e4.EntityToken;
def.flowHandle=_11e4.FlowHandle;
def.position=_11d0[_11e4.ViewType],def.label=_11e4.Label;
def.image=_11e4.Image;
def.toolTip=_11e4.ToolTip;
def.argument={"url":_11e4.Url,"list":list};
StageBinding.presentViewDefinition(def);
}else{
StageBinding.presentViewDefinition(new HostedViewDefinition({handle:_11e4.ViewId,entityToken:_11e4.EntityToken,flowHandle:_11e4.FlowHandle,position:_11d0[_11e4.ViewType],url:_11e4.Url,label:_11e4.Label,image:_11e4.Image,toolTip:_11e4.ToolTip}));
}
}
function openDialogView(_11e7){
StageBinding.presentViewDefinition(new DialogViewDefinition({handle:_11e7.ViewId,flowHandle:_11e7.FlowHandle,position:Dialog.MODAL,url:_11e7.Url,handler:{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}}}));
}
function openMessageBox(_11e8){
var _11e9=_11e8.DialogType.toLowerCase();
if(_11e9=="question"){
throw "Not supported!";
}else{
Dialog[_11e9](_11e8.Title,_11e8.Message,null,{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}});
}
}
function openViewDefinition(_11ea){
var map={};
var _11ec=false;
new List(_11ea.Argument).each(function(entry){
map[entry.Key]=entry.Value;
_11ec=true;
});
var proto=ViewDefinitions[_11ea.Handle];
if(proto!=null){
var def=null;
if(proto.isMutable==false){
def=proto;
}else{
def=new HostedViewDefinition();
for(var prop in proto){
def[prop]=proto[prop];
}
def.handle=_11ea.ViewId;
}
def.argument=_11ec?map:null;
StageBinding.presentViewDefinition(def);
}else{
throw "Unknown ViewDefinition: "+param.Handle;
}
}
function openGenericView(_11f1){
var def=ViewBinding.clone("Composite.Management.GenericView",_11f1.ViewId);
def.label=_11f1.Label;
def.toolTip=_11f1.ToolTip;
def.image=_11f1.Image;
def.argument={"url":_11f1.Url,"list":paramsToList(_11f1.UrlPostArguments)};
StageBinding.presentViewDefinition(def);
}
function closeView(_11f3){
if(StageBinding.isViewOpen(_11f3.ViewId)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_11f3.ViewId);
}else{
MessageQueue._nextAction();
}
}
function saveStatus(_11f4){
EventBroadcaster.broadcast(BroadcastMessages.CURRENT_SAVED,{handle:_11f4.ViewId,isSuccess:_11f4.Succeeded});
}
this._lockSystem=function(_11f5){
var _11f6=top.bindingMap.offlinetheatre;
if(_11f5){
_11f6.play(true);
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._pokeserver,MessageQueue.INTERVAL_OFFLINE);
}else{
_11f6.stop();
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
var self=this;
setTimeout(function(){
if(self._actions.hasEntries()){
self._nextAction();
}
},0);
}
_11ce=_11f5;
};
this.handleBroadcast=function(_11f8,arg){
switch(_11f8){
case BroadcastMessages.APPLICATION_LOGIN:
this.initialize();
break;
case BroadcastMessages.VIEW_COMPLETED:
case BroadcastMessages.VIEW_CLOSED:
if(_11cb!=null&&arg==_11cb){
_11cb=null;
this._nextAction();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHING:
if(arg!=null){
_11cc.set(arg,true);
}else{
_11c8.debug("Saa har vi balladen!");
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED:
if(_11cc.hasEntries()){
_11cc.del(arg);
_11c8.debug("Refreshed tree: "+arg+"\n("+_11cc.countEntries()+" trees left!)");
if(!_11cc.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
setTimeout(function(){
MessageQueue._nextAction();
},0);
}
}
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN:
_11cd.set(arg,true);
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN:
if(_11cd.hasEntries()==true){
_11cd.del(arg);
if(!_11cd.hasEntries()){
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
function paramsToList(_11fa){
var list=new List();
new List(_11fa).each(function(entry){
list.add({name:entry.Key,value:entry.Value});
});
return list;
}
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
};
var ViewDefinitions={"Composite.Management.Null":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.Null"}),"Composite.Management.PostBackDialog":new DialogViewDefinition({handle:"Composite.Management.PostBackDialog",isMutable:true,position:Dialog.MODAL,url:"${root}/content/dialogs/postback/postbackdialog.aspx",argument:{"url":null,"list":null}}),"Composite.Management.PostBackView":new HostedViewDefinition({handle:"Composite.Management.PostBackView",isMutable:true,position:DockBinding.MAIN,url:"${root}/postback.aspx",argument:{"url":null,"list":null}}),"Composite.Management.GenericView":new HostedViewDefinition({handle:"Composite.Management.GenericView",isMutable:true,position:DockBinding.MAIN,url:"${root}/content/views/generic/generic.aspx",label:null,image:null,toolTip:null,argument:{"url":null,"list":null}}),"Composite.Management.Start":new HostedViewDefinition({handle:"Composite.Management.Start",position:DockBinding.START,label:"Welcome Travellers",url:"${root}/content/views/start/start.aspx"}),"Composite.Management.About":new DialogViewDefinition({handle:"Composite.Management.About",position:Dialog.MODAL,url:"${root}/content/dialogs/about/about.aspx"}),"Composite.Management.PermissionEditor":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.PermissionEditor",position:DockBinding.MAIN,url:"${root}/content/views/editors/permissioneditor/permissioneditor.aspx",argument:{serializedEntityToken:"entityTokenType='Composite\\.Plugins\\.Elements\\.ElementProviders\\.VirtualElementProvider\\.VirtualElementProviderEntityToken,Composite'entityToken='_EntityToken_Type_=\\'Composite\\\\\\.Plugins\\\\\\.Elements\\\\\\.ElementProviders\\\\\\.VirtualElementProvider\\\\\\.VirtualElementProviderEntityToken,Composite\\'_EntityToken_Source_=\\'VirtualElementProvider\\'_EntityToken_Id_=\\'DesignPerspective\\''\""}}),"Composite.Management.SystemLog":new HostedViewDefinition({handle:"Composite.Management.SystemLog",position:DockBinding.ABSBOTTOMLEFT,label:"System Log",url:"${root}/content/views/dev/systemlog/systemlog.aspx"}),"Composite.Management.Developer":new HostedViewDefinition({handle:"Composite.Management.Developer",position:DockBinding.ABSBOTTOMRIGHT,label:"Developer",url:"${root}/content/views/dev/developer/developer.aspx"}),"Composite.Management.IconPack.System":new HostedViewDefinition({handle:"Composite.Management.IconPack.System",position:DockBinding.ABSBOTTOMLEFT,label:"Freja",image:"${icon:icon}",url:"${root}/content/views/dev/icons/system/Default.aspx"}),"Composite.Management.IconPack.Republic":new HostedViewDefinition({handle:"Composite.Management.IconPack.Republic",position:DockBinding.ABSBOTTOMLEFT,label:"Republic",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/republic.aspx"}),"Composite.Management.IconPack.Harmony":new HostedViewDefinition({handle:"Composite.Management.IconPack.Harmony",position:DockBinding.ABSBOTTOMLEFT,label:"Harmony",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/harmony.aspx"}),"Composite.Management.Explorer":new HostedViewDefinition({handle:"Composite.Management.Explorer",position:DockBinding.EXPLORER,url:"${root}/content/views/explorer/explorer.aspx",label:"Explorer"}),"Composite.Management.Options":new DialogViewDefinition({handle:"Composite.Management.Options",position:Dialog.MODAL,url:"${root}/content/dialogs/options/options.aspx",label:"Options"}),"Composite.Management.VisualEditorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.VisualEditorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/wysiwygeditor/wysiwygeditordialog.aspx",width:600,argument:{"formattingconfiguration":null,"elementclassconfiguration":null,"configurationstylesheet":null,"presentationstylesheet":null,"embedablefieldstypenames":null}}),"Composite.Management.MultiSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MultiSelectorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/multiselector/multiselectordialog.aspx"}),"Composite.Management.Search":new HostedViewDefinition({handle:"Composite.Management.Search",position:DockBinding.RIGHTBOTTOM,url:"${root}/content/views/search/search.aspx",label:"Search",image:"${icon:view_search}",argument:null}),"Composite.Management.Browser":new HostedViewDefinition({isMutable:false,handle:"Composite.Management.Browser",position:DockBinding.MAIN,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,label:"Page Browser",image:"${icon:page-view-administrated-scope}",toolTip:"Browse unpublished pages",url:"${root}/content/views/browser/browser.aspx",argument:{"URL":null}}),"Composite.Management.SEOAssistant":new HostedViewDefinition({handle:"Composite.Management.SEOAssistant",position:DockBinding.RIGHTTOP,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,url:"${root}/content/views/seoassist/seoassist.aspx",label:"${string:Composite.Web.SEOAssistant:SEOAssistant}",image:"${icon:seoassistant}",toolTip:"Search engine optimization"}),"Composite.Management.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.SourceCodeViewer",position:DockBinding.ABSBOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.User.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.User.SourceCodeViewer",position:DockBinding.BOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.Management.Help":new HostedViewDefinition({label:"Help",image:"${icon:help}",handle:"Composite.Management.Help",position:DockBinding.ABSRIGHTTOP,url:"${root}/content/views/help/help.aspx"}),"Composite.Management.Dialog.Translations":new DialogViewDefinition({handle:"Composite.Management.TranslationsDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/translations/translations.aspx",label:"Translations",image:"${icon:users-changepublicculture}"}),"Composite.Management.ImageSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.ImageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_IMAGESELECTOR,argument:{label:"Select Image",image:"${icon:image}",selectionProperty:"ElementType",selectionValue:"image/jpeg image/gif image/png image/bmp image/tiff",selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WebImages"}]}}),"Composite.Management.EmbeddableMediaSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Media",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:null}]}}),"Composite.Management.FrontendFileSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Frontend File",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"LayoutFileElementProvider"}]}}),"Composite.Management.PageSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Page",image:"${icon:page}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.PageIdSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageIdSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Page",image:"${icon:page}",selectionProperty:"DataId",selectionValue:null,selectionResult:"DataId",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.LinkableSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.LinkableSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Page or File",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"},{key:"MediaFileElementProvider"}]}}),"Composite.Management.MediaSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.MediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Page or File",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider"}]}}),"Composite.Management.FunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.FunctionSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Function",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider"}]}}),"Composite.Management.WidgetFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.WidgetFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Widget",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllWidgetFunctionsElementProvider"}]}}),"Composite.Management.XhtmlDocumentFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.XhtmlDocumentFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Function",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider",search:"AllFunctionsElementProvider.XhtmlDocument"}]}})};
var KickStart=new function(){
var _11fd=false;
var _11fe=false;
var _11ff=null;
var _1200=false;
var _1201=Client.qualifies();
var _1202="admin";
var _1203="123456";
this.fireOnLoad=function(){
if(_1201){
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
this.handleBroadcast=function(_1204){
switch(_1204){
case BroadcastMessages.AUDIO_INITIALIZED:
case BroadcastMessages.PERSISTANCE_INITIALIZED:
kickStart(_1204);
break;
case BroadcastMessages.APPLICATION_STARTUP:
break;
case BroadcastMessages.KEY_ENTER:
this.login();
break;
case BroadcastMessages.APPLICATION_LOGIN:
var _1205=window.bindingMap.appwindow;
_1205.setURL("app.aspx");
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
function fileEventBroadcasterSubscriptions(_1206){
new List([BroadcastMessages.AUDIO_INITIALIZED,BroadcastMessages.PERSISTANCE_INITIALIZED,BroadcastMessages.APPLICATION_STARTUP,BroadcastMessages.APPLICATION_LOGIN,BroadcastMessages.APPLICATION_OPERATIONAL]).each(function(_1207){
if(_1206){
EventBroadcaster.subscribe(_1207,KickStart);
}else{
EventBroadcaster.unsubscribe(_1207,KickStart);
}
});
}
function kickStart(_1208){
switch(_1208){
case BroadcastMessages.AUDIO_INITIALIZED:
_11fe=true;
setTimeout(function(){
Persistance.initialize();
},0);
break;
case BroadcastMessages.PERSISTANCE_INITIALIZED:
_11fd=true;
break;
}
if(_11fd&&_11fe){
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
DataManager.getDataBinding("username").setValue(_1202);
DataManager.getDataBinding("password").setValue(_1203);
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
this.doLogin=function(_120b,_120c){
var _120d=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _120e=false;
var _120f=LoginService.ValidateAndLogin(_120b,_120c);
if(_120f instanceof SOAPFault){
alert(_120f.getFaultString());
}else{
_120e=_120f;
}
if(_120e){
EventBroadcaster.unsubscribe(BroadcastMessages.KEY_ENTER,KickStart);
accessGranted();
}else{
Application.unlock(KickStart);
if(bindingMap.decks!=null){
accesssDenied();
}
}
WebServiceProxy.isFaultHandler=true;
if(_120d){
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
var _1210=DataManager.getDataBinding("username");
var _1211=DataManager.getDataBinding("password");
_1210.blur();
_1211.blur();
_1210.setValue("");
_1211.setValue("");
_1210.clean();
_1211.clean();
_1210.focus();
document.getElementById("loginerror").style.display="block";
var _1212={handleAction:function(_1213){
document.getElementById("loginerror").style.display="none";
_1213.target.removeActionListener(Binding.ACTION_DIRTY,_1212);
}};
bindingMap.loginfields.addActionListener(Binding.ACTION_DIRTY,_1212);
}
WindowManager.fireOnLoad(this);
if(!_1201){
UpdateManager.isEnabled=false;
}
};

