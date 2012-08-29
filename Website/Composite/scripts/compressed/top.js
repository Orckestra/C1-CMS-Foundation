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
}else{
if(this.isWebKit){
if(top.document.location.toString().indexOf("mode=develop")==-1){
_76=false;
}
}
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
if(win.event!=null&&_121!=null){
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
setTimeout(function(){
EventBroadcaster.broadcast(BroadcastMessages.APPLICATION_LOGIN);
},0);
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
if(_47c!=null){
if(_47c.href!=null&&_47c.href.indexOf(Constants.DUMMY_LINK)>-1){
DOMEvents.preventDefault(e);
}
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
var _524=this.dependentBindings[key];
_524.onMemberInitialize(this);
}
}
this.isInitialized=true;
};
Binding.prototype.onMemberInitialize=function(_525){
if(_525){
this.memberDependencies[_525.key]=true;
var _526=true;
for(var key in this.memberDependencies){
if(this.memberDependencies[key]==false){
_526=false;
break;
}
}
if(_526){
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
Binding.prototype.detachRecursive=function(_528){
if(_528==null){
_528=false;
}
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement,!_528);
};
Binding.prototype.addMember=function(_529){
if(!this.isAttached){
throw "Cannot add members to unattached binding";
}else{
if(!_529.isInitialized){
if(!this.memberDependencies){
this.memberDependencies={};
}
this.memberDependencies[_529.key]=false;
_529.registerDependentBinding(this);
}
}
return _529;
};
Binding.prototype.addMembers=function(_52a){
while(_52a.hasNext()){
var _52b=_52a.getNext();
if(!_52b.isInitialized){
this.addMember(_52b);
}
}
return _52a;
};
Binding.prototype.registerDependentBinding=function(_52c){
if(!this.dependentBindings){
this.dependentBindings={};
}
this.dependentBindings[_52c.key]=_52c;
};
Binding.prototype._initializeBindingPersistanceFeatures=function(){
var _52d=this.getProperty("persist");
if(_52d&&Persistance.isEnabled){
var id=this.bindingElement.id;
if(!KeyMaster.hasKey(id)){
this._persist={};
var _52f=new List(_52d.split(" "));
while(_52f.hasNext()){
var prop=_52f.getNext();
var _531=Persistance.getPersistedProperty(id,prop);
if(_531!=null){
this._persist[prop]=_531;
this.setProperty(prop,_531);
}else{
_531=this.getProperty(prop);
if(_531!=null){
this._persist[prop]=_531;
}
}
}
}else{
throw "Persistable bindings must have a specified ID.";
}
}
};
Binding.prototype._initializeBindingGeneralFeatures=function(){
var _532=this.getProperty("disabled");
var _533=this.getProperty("contextmenu");
var _534=this.getProperty("observes");
var _535=this.getProperty("onattach");
var _536=this.getProperty("hidden");
var _537=this.getProperty("blockactionevents");
if(_536==true&&this.isVisible==true){
this.hide();
}
if(_532&&this.logger!=null){
this.logger.error("The 'disabled' property has been renamed 'isdisbaled'");
}
if(_533){
this.setContextMenu(_533);
}
if(_534){
this.observe(this.getBindingForArgument(_534));
}
if(_537==true){
this.isBlockingActions=true;
}
if(this.isActivationAware==true){
var root=UserInterface.getBinding(this.bindingDocument.body);
root.makeActivationAware(this);
this._hasActivationAwareness=true;
}
if(_535!=null){
Binding.evaluate(_535,this);
}
};
Binding.prototype._initializeBindingDragAndDropFeatures=function(){
var _539=this.getProperty("draggable");
var _53a=this.getProperty("dragtype");
var _53b=this.getProperty("dragaccept");
var _53c=this.getProperty("dragreject");
if(_539!=null){
this.isDraggable=_539;
}
if(_53a!=null){
this.dragType=_53a;
if(_539!=false){
this.isDraggable=true;
}
}
if(_53b!=null){
this.dragAccept=_53b;
}
if(_53c!=null){
this.dragReject=_53c;
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
Binding.prototype._updateBindingMap=function(_53d){
try{
if(this.bindingWindow!=null){
var id=this.bindingElement.id;
var map=this.bindingWindow.bindingMap;
var _540=null;
if(_53d){
_540=map[id];
if(_540!=null&&_540!=this){
var cry=this.toString()+" duplicate binding ID: "+id;
this.logger.error(cry);
if(Application.isDeveloperMode){
throw (cry);
}
}else{
map[id]=this;
}
}else{
_540=map[id];
if(_540!=null&&_540==this){
delete map[id];
}
}
}else{
var _542=new String("Binding#_updateBindingMap odd dysfunction: "+this.toString()+": "+_53d);
if(Application.isDeveloperMode==true){
alert(_542);
}else{
this.logger.error(_542);
}
}
}
catch(exception){
this.logger.error(exception);
}
};
Binding.prototype.handleEvent=function(e){
};
Binding.prototype.handleAction=function(_544){
};
Binding.prototype.handleBroadcast=function(_545,arg){
};
Binding.prototype.handleElement=function(_547){
return false;
};
Binding.prototype.updateElement=function(_548){
return false;
};
Binding.prototype.getBindingForArgument=function(arg){
var _54a=null;
switch(typeof arg){
case "object":
_54a=arg;
break;
case "string":
_54a=this.bindingDocument.getElementById(arg);
if(_54a==null){
_54a=Binding.evaluate(arg,this);
}
break;
}
if(_54a!=null&&_54a.nodeType!=null){
_54a=UserInterface.getBinding(_54a);
}
return _54a;
};
Binding.prototype.serialize=function(){
var _54b={};
var id=this.bindingElement.id;
if(id&&id!=this.key){
_54b.id=id;
}
var _54d=this.getProperty("binding");
if(_54d){
_54b.binding=_54d;
}
if(!BindingSerializer.includeShadowTreeBindings){
var _54e=this.getAncestorBindingByLocalName("*");
if(_54e){
if(_54e.isShadowBinding){
this.isShadowBinding=true;
_54b=false;
}else{
var tree=_54e.shadowTree;
for(var key in tree){
var _551=tree[key];
if(_551==this){
this.isShadowBinding=true;
_54b=false;
}
}
}
}
}
return _54b;
};
Binding.prototype.serializeToString=function(_552){
var _553=null;
if(this.isAttached){
_553=new BindingSerializer().serializeBinding(this,_552);
}else{
throw "cannot serialize unattached binding";
}
return _553;
};
Binding.prototype.subTreeFromString=function(_554){
this.detachRecursive();
this.bindingElement.innerHTML=_554;
this.attachRecursive();
};
Binding.prototype.getProperty=function(_555){
var _556=this.bindingElement.getAttribute(_555);
if(_556){
_556=Types.castFromString(_556);
}
return _556;
};
Binding.prototype.setProperty=function(prop,_558){
if(_558!=null){
_558=_558.toString();
if(String(this.bindingElement.getAttribute(prop))!=_558){
this.bindingElement.setAttribute(prop,_558);
if(this.isAttached==true){
if(Persistance.isEnabled&&_558!=null){
if(this._persist!=null&&this._persist[prop]){
this._persist[prop]=_558;
Persistance.setPersistedProperty(this.bindingElement.id,prop,_558);
}
}
var _559=this.propertyMethodMap[prop];
if(_559){
_559.call(this,this.getProperty(prop));
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
var _55b=null;
if(Binding.exists(this)){
_55b=this.bindingElement.id;
}else{
SystemDebug.stack(arguments);
}
return _55b;
};
Binding.prototype.attachClassName=function(_55c){
CSSUtil.attachClassName(this.bindingElement,_55c);
};
Binding.prototype.detachClassName=function(_55d){
CSSUtil.detachClassName(this.bindingElement,_55d);
};
Binding.prototype.hasClassName=function(_55e){
return CSSUtil.hasClassName(this.bindingElement,_55e);
};
Binding.prototype.addActionListener=function(type,_560){
_560=_560!=null?_560:this;
if(Action.isValid(type)){
if(Interfaces.isImplemented(IActionListener,_560)){
if(!this.actionListeners[type]){
this.actionListeners[type]=[];
}
this.actionListeners[type].push(_560);
}else{
throw new Error("Could not add action-event listener. Method handleAction not implemented.");
}
}else{
alert(this+"\nCould not add undefined Action ("+_560+")");
}
};
Binding.prototype.removeActionListener=function(type,_562){
_562=_562?_562:this;
if(Action.isValid(type)){
var _563=this.actionListeners[type];
if(_563){
var i=0,_565;
while((_565=_563[i])!=null){
if(_565==_562){
_563.splice(i,1);
break;
}
i++;
}
}
}
};
Binding.prototype.addEventListener=function(type,_567){
_567=_567?_567:this;
DOMEvents.addEventListener(this.bindingElement,type,_567);
};
Binding.prototype.removeEventListener=function(type,_569){
_569=_569?_569:this;
DOMEvents.removeEventListener(this.bindingElement,type,_569);
};
Binding.prototype.subscribe=function(_56a){
if(!this.hasSubscription(_56a)){
this._subscriptions.set(_56a,true);
EventBroadcaster.subscribe(_56a,this);
}else{
this.logger.error("Dubplicate subscription aborted:"+_56a);
}
};
Binding.prototype.unsubscribe=function(_56b){
if(this.hasSubscription(_56b)){
this._subscriptions.del(_56b);
EventBroadcaster.unsubscribe(_56b,this);
}
};
Binding.prototype.hasSubscription=function(_56c){
return this._subscriptions.has(_56c);
};
Binding.prototype.observe=function(_56d,_56e){
_56d.addObserver(this,_56e);
};
Binding.prototype.unObserve=function(_56f,_570){
_56f.removeObserver(this,_570);
};
Binding.prototype.setContextMenu=function(arg){
this.contextMenuBinding=this.getBindingForArgument(arg);
if(this.contextMenuBinding){
var self=this;
var menu=this.contextMenuBinding;
this.addEventListener(DOMEvents.CONTEXTMENU,{handleEvent:function(e){
if(Interfaces.isImplemented(IActionListener,self)==true){
var _575={handleAction:function(){
menu.removeActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.removeActionListener(PopupBinding.ACTION_HIDE,_575);
}};
menu.addActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.addActionListener(PopupBinding.ACTION_HIDE,_575);
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
var _577=null;
var _578=null;
var _579=false;
if(arg instanceof Action){
_577=arg;
}else{
if(Action.isValid(arg)){
_577=new Action(this,arg);
_579=true;
}
}
if(_577!=null&&Action.isValid(_577.type)==true){
if(_577.isConsumed==true){
_578=_577;
}else{
var _57a=this.actionListeners[_577.type];
if(_57a!=null){
_577.listener=this;
var i=0,_57c;
while((_57c=_57a[i++])!=null){
if(_57c&&_57c.handleAction){
_57c.handleAction(_577);
}
}
}
var _57d=true;
if(this.isBlockingActions==true){
switch(_577.type){
case Binding.ACTION_FOCUSED:
case Binding.ACTION_BLURRED:
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FORCE_REFLEX:
case DockTabBinding.ACTION_UPDATE_VISUAL:
case PageBinding.ACTION_DOPOSTBACK:
break;
default:
if(!_579){
_57d=false;
}
break;
}
}
if(_57d){
_578=this.migrateAction(_577);
}else{
_578=_577;
}
}
}
return _578;
};
Binding.prototype.migrateAction=function(_57e){
var _57f=null;
var _580=null;
var node=this.getMigrationParent();
if(node){
while(node&&!_57f&&node.nodeType!=Node.DOCUMENT_NODE){
_57f=UserInterface.getBinding(node);
node=node.parentNode;
}
if(_57f){
_580=_57f.dispatchAction(_57e);
}else{
_580=_57e;
}
}
return _580;
};
Binding.prototype.reflex=function(_582){
if(Application.isOperational==true){
FlexBoxBinding.reflex(this,_582);
}
};
Binding.prototype.getMigrationParent=function(){
var _583=null;
if(true){
try{
var _584=this.bindingElement.parentNode;
if(_584!=null){
_583=_584;
}
}
catch(wtfException){
this.logger.error("Binding#getMigrationParent exception");
SystemDebug.stack(arguments);
_583=null;
}
}
return _583;
};
Binding.prototype.add=function(_585){
if(_585.bindingDocument==this.bindingDocument){
this.bindingElement.appendChild(_585.bindingElement);
}else{
throw "Could not add "+_585.toString()+" of different document origin.";
}
return _585;
};
Binding.prototype.addFirst=function(_586){
if(_586.bindingDocument==this.bindingDocument){
this.bindingElement.insertBefore(_586.bindingElement,this.bindingElement.firstChild);
}else{
throw "Could not add "+_586.toString()+" of different document origin.";
}
return _586;
};
Binding.prototype.getAncestorBindingByLocalName=function(_587,_588){
return BindingFinder.getAncestorBindingByLocalName(this,_587,_588);
};
Binding.prototype.getAncestorBindingByType=function(impl,_58a){
return BindingFinder.getAncestorBindingByType(this,impl,_58a);
};
Binding.prototype.getChildBindingByType=function(impl){
return BindingFinder.getChildBindingByType(this,impl);
};
Binding.prototype.getChildElementsByLocalName=function(_58c){
return BindingFinder.getChildElementsByLocalName(this,_58c);
};
Binding.prototype.getChildElementByLocalName=function(_58d){
return this.getChildElementsByLocalName(_58d).getFirst();
};
Binding.prototype.getDescendantElementsByLocalName=function(_58e){
return new List(DOMUtil.getElementsByTagName(this.bindingElement,_58e));
};
Binding.prototype.getChildBindingsByLocalName=function(_58f){
return this.getDescendantBindingsByLocalName(_58f,true);
};
Binding.prototype.getChildBindingByLocalName=function(_590){
return this.getChildBindingsByLocalName(_590).getFirst();
};
Binding.prototype.getDescendantBindingsByLocalName=function(_591,_592){
return BindingFinder.getDescendantBindingsByLocalName(this,_591,_592);
};
Binding.prototype.getDescendantBindingByLocalName=function(_593){
return this.getDescendantBindingsByLocalName(_593,false).getFirst();
};
Binding.prototype.getDescendantBindingsByType=function(impl){
return BindingFinder.getDescendantBindingsByType(this,impl);
};
Binding.prototype.getDescendantBindingByType=function(impl){
return BindingFinder.getDescendantBindingByType(this,impl);
};
Binding.prototype.getNextBindingByLocalName=function(_596){
return BindingFinder.getNextBindingByLocalName(this,_596);
};
Binding.prototype.getPreviousBindingByLocalName=function(_597){
return BindingFinder.getPreviousBindingByLocalName(this,_597);
};
Binding.prototype.getBindingElement=function(){
return this.bindingDocument.getElementById(this.bindingElement.id);
};
Binding.prototype.getOrdinalPosition=function(_598){
return DOMUtil.getOrdinalPosition(this.bindingElement,_598);
};
Binding.prototype.isFirstBinding=function(_599){
return (this.getOrdinalPosition(_599)==0);
};
Binding.prototype.isLastBinding=function(_59a){
return DOMUtil.isLastElement(this.bindingElement,_59a);
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
Binding.prototype.setCallBackArg=function(_59c){
this.setProperty(Binding.CALLBACKARG,_59c);
};
Binding.prototype.dispose=function(_59d){
if(!this.isDisposed){
if(!_59d){
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement);
var _59e=this.bindingDocument.getElementById(this.bindingElement.id);
if(_59e){
if(Client.isExplorer){
_59e.outerHTML="";
}else{
_59e.parentNode.removeChild(_59e);
}
}
}else{
if(this._subscriptions.hasEntries()){
var self=this;
var list=new List();
this._subscriptions.each(function(_5a1){
list.add(_5a1);
});
list.each(function(_5a2){
self.unsubscribe(_5a2);
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
Binding.prototype.wakeUp=function(_5a4,_5a5){
_5a5=_5a5?_5a5:Binding.SNOOZE;
if(this.isLazy==true){
this.deleteProperty("lazy");
this.isLazy=false;
Application.lock(this);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
var self=this;
setTimeout(function(){
self.attachRecursive();
setTimeout(function(){
if(_5a4!==undefined){
self[_5a4]();
}
LazyBindingBinding.wakeUp(self);
Application.unlock(self);
},_5a5);
},0);
}
};
Binding.prototype.handleCrawler=function(_5a7){
if(_5a7.response==null&&this.isLazy==true){
if(_5a7.id==DocumentCrawler.ID&&_5a7.mode==DocumentCrawler.MODE_REGISTER){
_5a7.response=NodeCrawler.NORMAL;
}else{
_5a7.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5a7.response==null&&this.crawlerFilters!=null){
if(this.crawlerFilters.has(_5a7.id)){
_5a7.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5a7.response==null){
switch(_5a7.id){
case FlexBoxCrawler.ID:
case FocusCrawler.ID:
if(!this.isVisible){
_5a7.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
}
};
Binding.newInstance=function(_5a8){
var _5a9=DOMUtil.createElementNS(Constants.NS_UI,"ui:binding",_5a8);
return UserInterface.registerBinding(_5a9,Binding);
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
var _5aa=new List(ConfigurationService.GetValidatingRegularExpressions("dummy"));
_5aa.each(function(_5ab){
DataBinding.expressions[_5ab.Key]=new RegExp(_5ab.Value);
});
}});
DataBinding.expressions={};
DataBinding.warnings={"required":"Required","number":"Numbers only","integer":"Integers only","programmingidentifier":"Invalid identifier","programmingnamespace":"Invalid namespace","url":"Invalid URL","minlength":"${count} characters minimum","maxlength":"${count} characters maximum","currency":"Invalid notation","email":"Invalid e-mail","guid":"Invalid GUID"};
DataBinding.errors={"programmingidentifier":"An identifier must not contain spaces or special characters. Only characters a-z, A-Z and 0-9 are allowed. An identifier must begin with a letter (not a number).","programmingnamespace":"A namespace must take the form Example.Name.Space where only characters a-z, A-Z, 0-9 and dots (.) are allowed. Each part of the namespace must begin with a letter (not a number).","url":"A valid URL must begin with a forward slash, designating the site root, or an URL scheme name such as http://. Simpliefied addresses such as www.example.com cannot be resolved reliably by the browser. Relative URLs are not supported."};
DataBinding.getAssociatedLabel=function(_5ac){
var _5ad=null;
var _5ae=_5ac.getAncestorBindingByLocalName("field");
if(_5ae&&_5ae instanceof FieldBinding){
var desc=_5ae.getDescendantBindingByLocalName("fielddesc");
if(desc&&desc instanceof FieldDescBinding){
_5ad=desc.getLabel();
}
}
return _5ad;
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
var _5b1=this.bindingWindow.DataManager;
_5b1.unRegisterDataBinding(this._name);
};
DataBinding.prototype.setName=function(name){
var _5b3=this.bindingWindow.DataManager;
if(_5b3.getDataBinding(name)){
_5b3.unRegisterDataBinding(name);
}
_5b3.registerDataBinding(name,this);
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
RootBinding.prototype.handleBroadcast=function(_5b4,arg){
RootBinding.superclass.handleBroadcast.call(this,_5b4,arg);
var _5b6=this.bindingWindow.WindowManager.WINDOW_EVALUATED_BROADCAST;
switch(_5b4){
case _5b6:
this.dispatchAction(RootBinding.ACTION_PHASE_1);
this.dispatchAction(RootBinding.ACTION_PHASE_2);
this.dispatchAction(RootBinding.ACTION_PHASE_3);
this.unsubscribe(_5b6);
break;
}
};
RootBinding.prototype.onActivate=function(){
this._onActivationChanged(true);
};
RootBinding.prototype.onDeactivate=function(){
this._onActivationChanged(false);
};
RootBinding.prototype._onActivationChanged=function(_5b7){
var _5b8=_5b7?RootBinding.ACTION_ACTIVATED:RootBinding.ACTION_DEACTIVATED;
if(_5b7!=this.isActivated){
this.isActivated=_5b7;
this.dispatchAction(_5b8);
var _5b9=new List();
var self=this;
this._activationawares.each(function(_5bb){
if(_5bb.isActivationAware){
try{
if(_5b7){
if(!_5bb.isActivated){
_5bb.onActivate();
}
}else{
if(_5bb.isActivated){
_5bb.onDeactivate();
}
}
}
catch(exception){
self.logger.error(exception);
_5b9.add(_5bb);
}
}
});
_5b9.each(function(_5bc){
this._activationawares.del(_5bc);
});
_5b9.dispose();
}else{
var _5bd="Activation dysfunction: "+this.bindingDocument.title;
if(Application.isDeveloperMode==true){
this.logger.error(_5bd);
}else{
this.logger.error(_5bd);
}
}
};
RootBinding.prototype.makeActivationAware=function(_5be,_5bf){
if(Interfaces.isImplemented(IActivationAware,_5be,true)==true){
if(_5bf==false){
this._activationawares.del(_5be);
}else{
this._activationawares.add(_5be);
if(this.isActivated==true){
_5be.onActivate();
}
}
}else{
if(Application.isDeveloperMode==true){
alert("RootBinding: IActivationAware not implemented ("+_5be+")");
}
}
};
RootBinding.prototype._setupActivationAwareness=function(_5c0){
var _5c1=this.getMigrationParent();
if(_5c1!=null){
var root=_5c1.ownerDocument.body;
var _5c3=UserInterface.getBinding(root);
if(_5c3!=null){
_5c3.makeActivationAware(this,_5c0);
}
}
};
RootBinding.prototype.handleCrawler=function(_5c4){
RootBinding.superclass.handleCrawler.call(this,_5c4);
if(_5c4.type==NodeCrawler.TYPE_ASCENDING){
_5c4.nextNode=this.bindingWindow.frameElement;
}
};
RootBinding.prototype.getMigrationParent=function(){
var _5c5=null;
if(this.bindingWindow.parent){
_5c5=this.bindingWindow.frameElement;
}
return _5c5;
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
var _5c6=new List(DOMUtil.getElementsByTagName(this.bindingElement,"td"));
while(_5c6.hasNext()){
var cell=_5c6.getNext();
this.shadowTree[cell.className]=cell;
}
};
MatrixBinding.prototype.add=function(_5c8){
var _5c9=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
this.shadowTree[MatrixBinding.CENTER].appendChild(_5c8.bindingElement);
_5c9=_5c8;
}else{
_5c9=MatrixBinding.superclass.add.call(this,_5c8);
}
return _5c9;
};
MatrixBinding.prototype.addFirst=function(_5ca){
var _5cb=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
var _5cc=this.shadowTree[MatrixBinding.CENTER];
_5cc.insertBefore(_5ca.bindingElement,_5cc.firstChild);
_5cb=_5ca;
}else{
_5cb=MatrixBinding.superclass.addFirst.call(this,_5ca);
}
return _5ca;
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
MatrixBinding.newInstance=function(_5ce){
var _5cf=DOMUtil.createElementNS(Constants.NS_UI,"ui:matrix",_5ce);
return UserInterface.registerBinding(_5cf,MatrixBinding);
};
FlexBoxBinding.prototype=new Binding;
FlexBoxBinding.prototype.constructor=FlexBoxBinding;
FlexBoxBinding.superclass=Binding.prototype;
FlexBoxBinding.CLASSNAME="flexboxelement";
FlexBoxBinding.TIMEOUT=250;
FlexBoxBinding.reflex=function(_5d0,_5d1){
var list=new List();
var _5d3=new FlexBoxCrawler();
_5d3.mode=_5d1?FlexBoxCrawler.MODE_FORCE:FlexBoxCrawler.MODE_NORMAL;
_5d3.startBinding=_5d0;
_5d3.crawl(_5d0.bindingElement,list);
list.each(function(_5d4){
_5d4.flex();
});
if(Client.isExplorer){
setTimeout(function(){
list.each(function(_5d5){
if(Binding.exists(_5d5)){
_5d5.flex();
}
});
},0.5*FlexBoxBinding.TIMEOUT);
}
setTimeout(function(){
list.each(function(_5d6){
if(Binding.exists(_5d6)){
_5d6.isFlexSuspended=false;
}
});
list.dispose();
},FlexBoxBinding.TIMEOUT);
_5d3.dispose();
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
FlexBoxBinding.prototype.handleAction=function(_5d7){
FlexBoxBinding.superclass.handleAction.call(this,_5d7);
switch(_5d7.type){
case Binding.ACTION_UPDATED:
this.isFit=false;
break;
}
};
FlexBoxBinding.prototype._getSiblingsSpan=function(_5d8){
var _5d9=0;
var _5da=new List(this.bindingElement.parentNode.childNodes);
while(_5da.hasNext()){
var _5db=_5da.getNext();
if(_5db.nodeType==Node.ELEMENT_NODE&&_5db!=this.bindingElement){
if(!this._isOutOfFlow(_5db)){
var rect=_5db.getBoundingClientRect();
if(_5d8){
height+=(rect.right-rect.left);
}else{
_5d9+=(rect.bottom-rect.top);
}
}
}
}
return _5d9;
};
FlexBoxBinding.prototype._isOutOfFlow=function(_5dd){
var _5de=CSSComputer.getPosition(_5dd);
var _5df=CSSComputer.getFloat(_5dd);
return (_5de=="absolute"||_5df!="none"?true:false);
};
FlexBoxBinding.prototype._getCalculatedHeight=function(){
var _5e0=this.bindingElement.parentNode;
var rect=_5e0.getBoundingClientRect();
var _5e2=rect.bottom-rect.top;
var _5e3=CSSComputer.getPadding(_5e0);
var _5e4=CSSComputer.getBorder(_5e0);
_5e2-=(_5e3.top+_5e3.bottom);
_5e2-=(_5e4.top+_5e4.bottom);
return _5e2;
};
FlexBoxBinding.prototype._getCalculatedWidth=function(){
var _5e5=this.bindingElement.parentNode;
var rect=_5e5.getBoundingClientRect();
var _5e7=rect.right-rect.left;
var _5e8=CSSComputer.getPadding(_5e5);
var _5e9=CSSComputer.getBorder(_5e5);
_5e7-=(_5e8.left+_5e8.right);
_5e7-=(_5e9.left+_5e9.right);
return _5e7;
};
FlexBoxBinding.prototype.setFlexibility=function(_5ea){
if(_5ea!=this.isFlexible){
if(_5ea){
this.attachClassName(FlexBoxBinding.CLASSNAME);
this.deleteProperty("flex");
}else{
this.detachClassName(FlexBoxBinding.CLASSNAME);
this.setProperty("flex",false);
}
this.isFlexible=_5ea;
}
};
FlexBoxBinding.prototype.flex=function(){
if(Binding.exists(this)){
if(this.isFlexible==true){
var _5eb=this._getSiblingsSpan();
_5eb=this._getCalculatedHeight()-_5eb;
if(!isNaN(_5eb)&&_5eb>=0){
if(_5eb!=this.bindingElement.offsetHeight){
this.bindingElement.style.height=String(_5eb)+"px";
}
}
}
}
};
FlexBoxBinding.prototype.fit=function(_5ec){
if(!this.isFit||_5ec){
var _5ed=0;
new List(this.bindingElement.childNodes).each(function(_5ee){
if(_5ee.nodeType==Node.ELEMENT_NODE){
if(!this._isOutOfFlow(_5ee)){
var rect=_5ee.getBoundingClientRect();
_5ed+=(rect.bottom-rect.top);
}
}
},this);
this._setFitnessHeight(_5ed);
this.isFit=true;
}
};
FlexBoxBinding.prototype._setFitnessHeight=function(_5f0){
var _5f1=CSSComputer.getPadding(this.bindingElement);
var _5f2=CSSComputer.getBorder(this.bindingElement);
_5f0+=_5f1.top+_5f1.bottom;
_5f0+=_5f2.top+_5f2.bottom;
this.bindingElement.style.height=_5f0+"px";
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
ScrollBoxBinding.prototype.handleAction=function(_5f3){
ScrollBoxBinding.superclass.handleAction.call(this,_5f3);
switch(_5f3.type){
case BalloonBinding.ACTION_INITIALIZE:
_5f3.consume();
break;
}
};
ScrollBoxBinding.prototype.setPosition=function(_5f4){
this.bindingElement.scrollLeft=_5f4.x;
this.bindingElement.scrollTop=_5f4.y;
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
var _5f5=this._getBuildElement("labeltext");
if(_5f5){
this.shadowTree.labelText=_5f5;
this.shadowTree.text=_5f5.firstChild;
this.hasLabel=true;
}
}else{
var _5f6=this.getProperty("label");
var _5f7=this.getProperty("image");
var _5f8=this.getProperty("tooltip");
if(_5f6){
this.setLabel(_5f6,false);
}
if(_5f7){
this.setImage(_5f7,false);
}
if(_5f8){
this.setToolTip(_5f8);
}
this.buildClassName();
}
};
LabelBinding.prototype.setLabel=function(_5f9,_5fa){
_5f9=_5f9?_5f9:"";
if(!this.hasLabel){
this.buildLabel();
}
this.shadowTree.text.data=Resolver.resolve(_5f9);
this.setProperty("label",_5f9);
if(!_5fa){
this.buildClassName();
}
};
LabelBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
LabelBinding.prototype.setImage=function(url,_5fc){
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
if(!_5fc){
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
LabelBinding.prototype.setToolTip=function(_5ff){
this.setProperty("tooltip",_5ff);
if(_5ff!=this.getLabel()){
this.setProperty("title",Resolver.resolve(_5ff));
}
};
LabelBinding.prototype.getToolTip=function(_600){
return this.getProperty("tooltip");
};
LabelBinding.prototype.flip=function(_601){
_601=_601==null?true:_601;
var _602=LabelBinding.CLASSNAME_FLIPPED;
if(!Client.isExplorer6){
this.isFlipped=_601;
if(_601){
this.attachClassName(_602);
}else{
this.detachClassName(_602);
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
var _603="textonly";
var _604="imageonly";
var _605="both";
if(this.hasLabel&&this.hasImage){
this.detachClassName(_603);
this.detachClassName(_604);
this.attachClassName(_605);
}else{
if(this.hasLabel){
this.detachClassName(_605);
this.detachClassName(_604);
this.attachClassName(_603);
}else{
if(this.hasImage){
this.detachClassName(_605);
this.detachClassName(_603);
this.attachClassName(_604);
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
LabelBinding.newInstance=function(_606){
var _607=DOMUtil.createElementNS(Constants.NS_UI,"ui:labelbox",_606);
return UserInterface.registerBinding(_607,LabelBinding);
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
var _608=this.getProperty("label");
if(!_608){
_608=DOMUtil.getTextContent(this.bindingElement);
}
var text=this.bindingDocument.createTextNode(Resolver.resolve(_608));
this.bindingElement.parentNode.replaceChild(text,this.bindingElement);
this.dispose();
};
TextBinding.prototype.setLabel=function(_60a){
this.setProperty("label",_60a);
};
TextBinding.newInstance=function(_60b){
var _60c=DOMUtil.createElementNS(Constants.NS_UI,"ui:text",_60b);
return UserInterface.registerBinding(_60c,TextBinding);
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
BroadcasterBinding.prototype.setProperty=function(_60d,_60e){
BroadcasterBinding.superclass.setProperty.call(this,_60d,_60e);
function update(list){
if(list){
list.each(function(_610){
_610.setProperty(_60d,_60e);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _611=this._observers[_60d];
if(_611){
update(_611);
}
};
BroadcasterBinding.prototype.deleteProperty=function(_612){
BroadcasterBinding.superclass.deleteProperty.call(this,_612);
function update(list){
if(list){
list.each(function(_614){
_614.deleteProperty(_612);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _615=this._observers[_612];
if(_615){
update(_615);
}
};
BroadcasterBinding.prototype.addObserver=function(_616,_617){
_617=_617?_617:"*";
_617=new List(_617.split(" "));
while(_617.hasNext()){
var _618=_617.getNext();
switch(_618){
case "*":
this._setAllProperties(_616);
break;
default:
var _619=this.getProperty(_618);
_616.setProperty(_618,_619);
break;
}
if(!this._observers[_618]){
this._observers[_618]=new List();
}
this._observers[_618].add(_616);
}
};
BroadcasterBinding.prototype._setAllProperties=function(_61a){
var atts=new List(this.bindingElement.attributes);
while(atts.hasNext()){
var att=atts.getNext();
if(att.specified){
var _61d=att.nodeName;
switch(_61d){
case "id":
case "key":
break;
default:
var _61e=this.getProperty(_61d);
_61a.setProperty(_61d,_61e);
break;
}
}
}
};
BroadcasterBinding.prototype.removeObserver=function(_61f,_620){
_620=_620?_620:"*";
_620=new List(_620.split(" "));
while(_620.hasNext()){
var list=this._observers[_620.getNext()];
if(list){
while(list.hasNext()){
var _622=list.getNext();
if(_622==_61f){
list.del(_622);
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
BroadcasterBinding.prototype.setDisabled=function(_623){
this.setProperty("isdisabled",_623);
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
var _625=this.getProperty("width");
var _626=this.getProperty("label");
var type=this.getProperty("type");
var _628=this.getProperty("popup");
var _629=this.getProperty("tooltip");
var _62a=this.getProperty("isdisabled");
var _62b=this.getProperty("response");
var _62c=this.getProperty("oncommand");
var _62d=this.getProperty("value");
var _62e=this.getProperty("ischecked");
var _62f=this.getProperty("callbackid");
var _630=this.getProperty("focusable");
var _631=this.getProperty("focused");
var _632=this.getProperty("default");
var url=this.getProperty("url");
var _634=this.getProperty("flip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.add(this.labelBinding);
this.labelBinding.attach();
this.shadowTree.labelBinding=this.labelBinding;
if(_634){
this.flip(true);
}
if(!this._stateManager){
this._stateManager=new ButtonStateManager(this);
}
if(this.imageProfile!=null&&this.imageProfile.getDefaultImage()!=null){
this.setImage(this.imageProfile.getDefaultImage());
}
if(_626!=null){
this.setLabel(_626);
}
if(type!=null){
this.setType(type);
}
if(_629!=null){
this.setToolTip(_629);
}
if(_625!=null){
this.setWidth(_625);
}
if(_628!=null){
this.setPopup(_628);
}
if(_62b!=null){
this.response=_62b;
}
if(_62e==true){
if(this.isCheckButton||this.isRadioButton){
this.check(true);
}
}
if(_62c!=null&&this.oncommand==null){
this.oncommand=function(){
Binding.evaluate(_62c,this);
};
}
if(_630||this.isFocusable){
this._makeFocusable();
if(_632||this.isDefault){
this.isDefault=true;
}
if(_631){
this.focus();
}
}
if(_62a==true){
this.disable();
}
if(url!=null){
this.setURL(url);
}
if(_62f!=null){
this.bindingWindow.DataManager.registerDataBinding(_62f,this);
if(_62d!=null){
Binding.dotnetify(this,_62d);
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
ButtonBinding.prototype.setImage=function(_635){
if(this.isAttached){
this.labelBinding.setImage(_635);
}
this.setProperty("image",_635);
};
ButtonBinding.prototype.getImage=function(){
return this.getProperty("image");
};
ButtonBinding.prototype.setLabel=function(_636){
if(this.isAttached){
this.labelBinding.setLabel(_636);
}
this.setProperty("label",_636);
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
ButtonBinding.prototype.setToolTip=function(_638){
this.setProperty("tooltip",_638);
if(this.isAttached==true){
this.setProperty("title",Resolver.resolve(_638));
}
};
ButtonBinding.prototype.getToolTip=function(){
return this.getProperty("tooltip");
};
ButtonBinding.prototype.setImageProfile=function(_639){
this.imageProfile=new _639(this);
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
ButtonBinding.prototype.flip=function(_63e){
_63e=_63e==null?true:_63e;
this.isFlipped=_63e;
this.setProperty("flip",_63e);
if(this.isAttached){
this.labelBinding.flip(_63e);
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
ButtonBinding.prototype.check=function(_63f){
if((this.isCheckButton||this.isRadioButton)&&!this.isChecked){
if(this.isAttached==true){
this._check();
if(!_63f==true){
this.fireCommand();
}
}
this.setProperty("ischecked",true);
}
};
ButtonBinding.prototype._check=function(_640){
this.isActive=true;
this.isChecked=true;
if(!_640){
this._stateManager.invokeActiveState();
}
};
ButtonBinding.prototype.uncheck=function(_641){
if((this.isCheckButton||this.isRadioButton)&&this.isChecked){
if(this.isAttached==true){
this._uncheck();
if(!_641==true){
this.fireCommand();
}
}
this.setProperty("ischecked",false);
}
};
ButtonBinding.prototype._uncheck=function(_642){
this.isActive=false;
this.isChecked=false;
if(!_642){
this._stateManager.invokeNormalState();
}
};
ButtonBinding.prototype.setChecked=function(_643,_644){
if(_643==null){
_643==false;
}
if(this.isCheckButton||this.isRadioButton){
switch(_643){
case true:
this.check(_644);
break;
case false:
this.uncheck(_644);
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
var _646=this.getProperty("tooltip");
if(_646){
this.setToolTip(_646);
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
var _647=null;
if(this.isAttached==true){
this.labelBinding.bindingElement.style.marginLeft="0";
this.labelBinding.bindingElement.style.marginRight="0";
_647=this.labelBinding.bindingElement.offsetWidth;
}else{
throw "ButtonBinding: getEqualSizeWidth failed for non-attached button.";
}
return _647;
};
ButtonBinding.prototype.setEqualSizeWidth=function(goal){
if(this.isAttached==true){
var _649=this.getEqualSizeWidth();
if(goal>_649){
var diff=goal-_649;
var marg=Math.floor(diff*0.5);
this.labelBinding.bindingElement.style.marginLeft=marg+"px";
this.labelBinding.bindingElement.style.marginRight=marg+"px";
}
}
};
ButtonBinding.prototype.getWidth=function(){
var _64c=null;
if(this.isAttached==true){
var _64d=CSSComputer.getPadding(this.bindingElement);
var _64e=CSSComputer.getPadding(this.bindingElement);
_64c=this.shadowTree.c.offsetWidth+this.shadowTree.e.offsetWidth+this.shadowTree.w.offsetWidth;
_64c=_64c+_64d.left+_64d.right;
_64c=_64c+_64e.left+_64e.right;
}else{
throw "ButtonBinding: getWidth failed for non-attached button.";
}
return _64c;
};
ButtonBinding.prototype.setWidth=function(_64f){
if(this.isAttached==true){
var _650=this.shadowTree.e.offsetWidth+this.shadowTree.w.offsetWidth;
var _651=CSSComputer.getPadding(this.shadowTree.c);
var _652=_64f-_650;
_652=_652-_651.left-_651.right;
this.shadowTree.c.style.width=String(_652)+"px";
if(this.getProperty("centered")){
this.labelBinding.bindingElement.style.marginLeft=String(0.5*(_652-this.labelBinding.bindingElement.offsetWidth))+"px";
}
}
this.setProperty("width",_64f);
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
ButtonBinding.prototype.setValue=function(_653){
this.shadowTree.dotnetinput.value=_653;
};
ButtonBinding.prototype.getResult=function(){
return this.getValue();
};
ButtonBinding.prototype.setResult=function(_654){
this.setValue(_654);
};
ButtonStateManager.STATE_NORMAL=0;
ButtonStateManager.STATE_HOVER=1;
ButtonStateManager.STATE_ACTIVE=2;
ButtonStateManager.RIGHT_BUTTON=2;
function ButtonStateManager(_655){
this.logger=SystemLogger.getLogger("ButtonStateManager");
this.binding=_655;
this.imageProfile=_655.imageProfile;
this.assignDOMEvents(true);
}
ButtonStateManager.prototype.assignDOMEvents=function(_656){
var _657=_656?"addEventListener":"removeEventListener";
this.binding[_657](DOMEvents.MOUSEENTER,this);
this.binding[_657](DOMEvents.MOUSELEAVE,this);
this.binding[_657](DOMEvents.MOUSEDOWN,this);
this.binding[_657](DOMEvents.MOUSEUP,this);
};
ButtonStateManager.prototype.dispose=function(){
this.assignDOMEvents(false);
this.binding=null;
this.imageProfile=null;
};
ButtonStateManager.prototype.handleEvent=function(e){
if(Binding.exists(this.binding)&&!this.binding.isDisabled&&!BindingDragger.isDragging){
var _659=false,_65a=null;
if(e.button==ButtonStateManager.RIGHT_BUTTON){
}else{
if(this.binding.isCheckBox){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_65a=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_65a=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_65a=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSEUP:
this.binding.isChecked=!this.binding.isChecked;
_65a=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_65a==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_659=true;
break;
}
}else{
if(this.binding.isCheckButton||this.binding.isRadioButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
if(!this.binding.isChecked){
_65a=ButtonStateManager.STATE_HOVER;
}
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
if(!this.binding.isChecked){
_65a=ButtonStateManager.STATE_NORMAL;
}
break;
case DOMEvents.MOUSEDOWN:
_65a=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
if(this.binding.isCheckButton||!this.binding.isChecked){
this.binding.isChecked=!this.binding.isChecked;
_65a=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_65a==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_659=true;
}
break;
}
}else{
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_65a=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_65a=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_65a=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_65a=ButtonStateManager.STATE_NORMAL;
_659=true;
break;
}
}
}
}
switch(_65a){
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
if(_659){
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
var _65e=this.imageProfile.getDisabledImage();
if(_65e){
this.binding.setImage(_65e);
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
ClickButtonBinding.newInstance=function(_65f){
var _660=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_65f);
return UserInterface.registerBinding(_660,ClickButtonBinding);
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
RadioButtonBinding.newInstance=function(_661){
var _662=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiobutton",_661);
return UserInterface.registerBinding(_662,RadioButtonBinding);
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
CheckButtonBinding.newInstance=function(_663){
var _664=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbutton",_663);
return UserInterface.registerBinding(_664,CheckButtonBinding);
};
CheckButtonImageProfile.IMG_DEFAULT="${skin}/buttons/checkbutton-default.png";
CheckButtonImageProfile.IMG_HOVER="${skin}/buttons/checkbutton-hover.png";
CheckButtonImageProfile.IMG_ACTIVE="${skin}/buttons/checkbutton-active.png";
CheckButtonImageProfile.IMG_ACTIVE_HOVER="${skin}/buttons/checkbutton-active-hover.png";
CheckButtonImageProfile.IMG_DISABLED=null;
CheckButtonImageProfile.IMG_DISABLED_ON=null;
function CheckButtonImageProfile(_665){
this._binding=_665;
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
var _666=this.getDescendantBindingsByLocalName("control");
_666.each(function(_667){
_667.setControlType(_667.controlType);
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
ControlGroupBinding.newInstance=function(_669){
var _66a=DOMUtil.createElementNS(Constants.NS_UI,"ui:controlgroup",_669);
return UserInterface.registerBinding(_66a,ControlGroupBinding);
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
ControlBinding.prototype.handleAction=function(_66d){
ControlBinding.superclass.handleAction.call(this,_66d);
switch(_66d.type){
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
function ControlImageProfile(_66e){
this.binding=_66e;
}
ControlImageProfile.prototype._getImage=function(_66f){
var _670=null;
switch(this.binding.controlType){
case ControlBinding.TYPE_MINIMIZE:
_670=this.constructor.IMAGE_MINIMIZE;
break;
case ControlBinding.TYPE_MAXIMIZE:
_670=this.constructor.IMAGE_MAXIMIZE;
break;
case ControlBinding.TYPE_UNMAXIMIZE:
case ControlBinding.TYPE_UNMINIMIZE:
_670=this.constructor.IMAGE_RESTORE;
break;
case ControlBinding.TYPE_CLOSE:
_670=this.constructor.IMAGE_CLOSE;
break;
}
return _670.replace("${string}",_66f);
};
ControlImageProfile.prototype.getDefaultImage=function(){
var _671=true;
if(this.binding.isGhostable&&this.binding.containingControlBoxBinding){
_671=this.binding.containingControlBoxBinding.isActive?true:false;
}
return _671?this._getImage("default"):this._getImage("ghosted");
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
ControlBoxBinding.prototype.handleAction=function(_672){
ControlBoxBinding.superclass.handleAction.call(this,_672);
switch(_672.type){
case ControlBinding.ACTION_COMMAND:
var _673=_672.target;
Application.lock(this);
var self=this;
setTimeout(function(){
self.handleInvokedControl(_673);
Application.unlock(self);
},0);
_672.consume();
break;
}
};
ControlBoxBinding.prototype.handleInvokedControl=function(_675){
switch(_675.controlType){
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
ControlBoxBinding.prototype.setState=function(_676){
var _677=this.getState();
this.setProperty("state",_676);
this.detachClassName(_677);
this.attachClassName(_676);
this.dispatchAction(ControlBoxBinding.ACTION_STATECHANGE);
};
ControlBoxBinding.prototype.getState=function(){
var _678=this.getProperty("state");
if(!_678){
_678=ControlBoxBinding.STATE_NORMAL;
}
return _678;
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
MenuContainerBinding.prototype.isOpen=function(_679){
var _67a=null;
if(!_679){
_67a=this._isOpen;
}else{
_67a=(_679==this._openElement);
}
return _67a;
};
MenuContainerBinding.prototype.setOpenElement=function(_67b){
if(_67b){
if(this._openElement){
this._openElement.hide();
}
this._openElement=_67b;
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
var _67c=this.getChildBindingByLocalName("menupopup");
if(_67c&&_67c!=this.menuPopupBinding){
this.menuPopupBinding=_67c;
this.menuPopupBinding.addActionListener(PopupBinding.ACTION_HIDE,this);
}
return this.menuPopupBinding;
};
MenuContainerBinding.prototype.show=function(){
var _67d=this.getMenuContainerBinding();
_67d.setOpenElement(this);
var _67e=this.getMenuPopupBinding();
_67e.snapTo(this.bindingElement);
_67e.show();
};
MenuContainerBinding.prototype.hide=function(){
this.reset();
this.getMenuPopupBinding().hide();
if(this._isOpen){
this._openElement.hide();
}
};
MenuContainerBinding.prototype.reset=Binding.ABSTRACT_METHOD;
MenuContainerBinding.prototype.handleAction=function(_67f){
MenuContainerBinding.superclass.handleAction.call(this,_67f);
if(_67f.type==PopupBinding.ACTION_HIDE){
var _680=this.getMenuContainerBinding();
_680.setOpenElement(false);
this.reset();
_67f.consume();
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
MenuBarBinding.prototype.handleAction=function(_681){
MenuBarBinding.superclass.handleAction.call(this,_681);
switch(_681.type){
case MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY:
var _682=_681.target;
var _683=this.getChildBindingsByLocalName("menu");
while(_683.hasNext()){
var menu=_683.getNext();
}
switch(_682.arrowKey){
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
var _685=this.getProperty("image");
var _686=this.getProperty("label");
var _687=this.getProperty("tooltip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menulabel");
this.add(this.labelBinding);
if(_686){
this.setLabel(_686);
}
if(_685){
this.setImage(_685);
}
if(_687){
this.setToolTip(_687);
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
MenuBinding.prototype.setLabel=function(_689){
this.setProperty("label",_689);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_689));
}
};
MenuBinding.prototype.setToolTip=function(_68a){
this.setProperty("tooltip",_68a);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_68a));
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
var _68c=this.getMenuContainerBinding();
if(!BindingDragger.isDragging){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(_68c.isOpen(this)){
DOMEvents.stopPropagation(e);
}
break;
case DOMEvents.MOUSEOVER:
if(_68c.isOpen()&&!_68c.isOpen(this)){
this.show();
this.menuPopupBinding.grabKeyboard();
}
this.attachClassName("hover");
this.isFocused=true;
break;
case DOMEvents.MOUSEOUT:
if(!_68c.isOpen()){
this.hide();
}
this.isFocused=false;
break;
case DOMEvents.MOUSEUP:
if(!_68c.isOpen(this)){
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
MenuBodyBinding.handleBroadcast=function(_68d,arg){
var body=MenuBodyBinding.activeInstance;
var key=arg;
if(body){
switch(_68d){
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
this.addActionListener(MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY,{handleAction:function(_692){
switch(_692.target){
case self:
self.releaseKeyboard();
self._containingPopupBinding.hide();
break;
default:
var _693=null;
var _694=true;
self._lastFocused.focus();
self.grabKeyboard();
_692.consume();
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
MenuBodyBinding.prototype.handleFocusedItem=function(_696){
for(var key in this._focused){
if(key!=_696.key){
var item=this._focused[key];
item.blur();
}
}
this._focused[_696.key]=_696;
this._lastFocused=_696;
if(MenuBodyBinding.activeInstance!=this){
this.grabKeyboard();
}
};
MenuBodyBinding.prototype.handleBlurredItem=function(_699){
delete this._focused[_699.key];
};
MenuBodyBinding.prototype.resetFocusedItems=function(_69a){
for(var key in this._focused){
var item=this._focused[key];
item.blur(_69a);
}
if(_69a){
this._lastFocused=null;
}
};
MenuBodyBinding.prototype.refreshMenuGroups=function(){
if(!this.isAttached){
throw "refreshMenuGroups: MenuBodyBinding not attached!";
}else{
var _69d=this.getChildBindingsByLocalName("menugroup");
var _69e=null;
var _69f=null;
while(_69d.hasNext()){
var _6a0=_69d.getNext();
if(!_6a0.isDefaultContent){
_6a0.setLayout(MenuGroupBinding.LAYOUT_DEFAULT);
if(!_69e&&_6a0.isVisible){
_69e=_6a0;
}
if(_6a0.isVisible){
_69f=_6a0;
}
}
}
if(_69e&&_69f){
_69e.setLayout(MenuGroupBinding.LAYOUT_FIRST);
_69f.setLayout(MenuGroupBinding.LAYOUT_LAST);
}
}
};
MenuBodyBinding.prototype.grabKeyboard=function(_6a1){
MenuBodyBinding.activeInstance=this;
if(_6a1){
var _6a2=this._getMenuItems().getFirst();
if(_6a2){
_6a2.focus();
}
}
};
MenuBodyBinding.prototype.releaseKeyboard=function(){
if(MenuBodyBinding.activeInstance==this){
MenuBodyBinding.activeInstance=null;
}
};
MenuBodyBinding.prototype.handleEnterKey=function(){
var _6a3=this._lastFocused;
if((_6a3!=null)&&(!_6a3.isMenuContainer)){
_6a3.fireCommand();
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEDOWN);
}
};
MenuBodyBinding.prototype.handleArrowKey=function(key){
this.arrowKey=key;
var _6a5=this._getMenuItems();
var _6a6=null;
var next=null;
if(this._lastFocused){
_6a6=this._lastFocused;
switch(key){
case KeyEventCodes.VK_UP:
next=_6a5.getPreceding(_6a6);
break;
case KeyEventCodes.VK_DOWN:
next=_6a5.getFollowing(_6a6);
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
next=_6a5.getFirst();
}
if(next){
next.focus();
}
};
MenuBodyBinding.prototype._getMenuItems=function(){
if(!this._menuItemsList||this.isDirty){
var list=new List();
var _6a9=null;
this.getChildBindingsByLocalName("menugroup").each(function(_6aa){
_6a9=_6aa.getChildBindingsByLocalName("menuitem");
_6a9.each(function(item){
list.add(item);
});
});
_6a9=this.getChildBindingsByLocalName("menuitem");
_6a9.each(function(item){
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
MenuBodyBinding.newInstance=function(_6ae){
var _6af=DOMUtil.createElementNS(Constants.NS_UI,"ui:menubody",_6ae);
return UserInterface.registerBinding(_6af,MenuBodyBinding);
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
MenuGroupBinding.prototype.setLayout=function(_6b0){
switch(_6b0){
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
MenuGroupBinding.newInstance=function(_6b1){
var _6b2=DOMUtil.createElementNS(Constants.NS_UI,"ui:menugroup",_6b1);
return UserInterface.registerBinding(_6b2,MenuGroupBinding);
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
var _6b3=this.getProperty("image");
var _6b4=this.getProperty("image-hover");
var _6b5=this.getProperty("image-active");
var _6b6=this.getProperty("image-disabled");
if(!this.image&&_6b3){
this.image=_6b3;
}
if(!this.imageHover&&_6b4){
this.imageHover=_6b3;
}
if(!this.imageActive&&_6b5){
this.imageActive=_6b5;
}
if(!this.imageDisabled&&_6b6){
this.imageDisabled=_6b6;
}
};
MenuItemBinding.prototype.buildDOMContent=function(){
var _6b7=this.getProperty("label");
var _6b8=this.getProperty("tooltip");
var type=this.getProperty("type");
var _6ba=this.getProperty("isdisabled");
var _6bb=this.getProperty("image");
var _6bc=this.getProperty("image-hover");
var _6bd=this.getProperty("image-active");
var _6be=this.getProperty("image-disabled");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menuitemlabel");
this.add(this.labelBinding);
var _6bf=this.getMenuPopupBinding();
if(_6bf){
this.isMenuContainer=true;
this.setType(MenuItemBinding.TYPE_MENUCONTAINER);
}
if(!this.imageProfile){
if(!this.image&&_6bb){
this.image=_6bb;
}
if(!this.imageHover&&_6bc){
this.imageHover=_6bb;
}
if(!this.imageActive&&_6bd){
this.imageActive=_6bd;
}
if(!this.imageDisabled&&_6be){
this.imageDisabled=_6be;
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
if(_6b7){
this.setLabel(_6b7);
}
if(_6b8){
this.setToolTip(_6b8);
}
if(type){
this.setType(type);
}
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.getProperty("ischecked")==true){
this.check(true);
}
}
if(_6ba==true){
this.disable();
}
var _6c0=this.getProperty("oncommand");
if(_6c0){
if(this.isMenuContainer){
throw new Error("MenuItemBinding with contained menuitems cannot fire commands.");
}else{
this.oncommand=function(){
this.bindingWindow.eval(_6c0);
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
MenuItemBinding.prototype.setLabel=function(_6c3){
this.setProperty("label",_6c3);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6c3));
}
};
MenuItemBinding.prototype.setToolTip=function(_6c4){
this.setProperty("tooltip",_6c4);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6c4));
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
var _6c6=this.bindingDocument.createElement("div");
_6c6.className=MenuItemBinding.CLASSNAME_CHECKBOX;
_6c6.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_CHECKBOX));
var _6c7=this.labelBinding.bindingElement;
_6c7.insertBefore(_6c6,_6c7.firstChild);
_6c6.style.display="none";
this.shadowTree.checkBoxIndicator=_6c6;
}else{
throw new Error("MenuItemBinding: checkboxes cannot contain menus");
}
break;
case MenuItemBinding.TYPE_MENUCONTAINER:
var _6c6=this.bindingDocument.createElement("div");
_6c6.className=MenuItemBinding.CLASSNAME_SUBMENU;
_6c6.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_SUBMENU));
var _6c7=this.labelBinding.bindingElement;
_6c7.insertBefore(_6c6,_6c7.firstChild);
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
var _6c9=this.imageProfile.getDisabledImage();
if(_6c9){
this.setImage(_6c9);
}
}
}else{
this.detachClassName("isdisabled");
if(this.imageProfile){
var _6c9=this.imageProfile.getDefaultImage();
if(_6c9){
this.setImage(_6c9);
}
}
}
}
};
MenuItemBinding.prototype.focus=function(e){
this.labelBinding.attachClassName(MenuItemBinding.CLASSNAME_HOVER);
var _6cb=this.getMenuContainerBinding();
if(_6cb.isOpen()&&!_6cb.isOpen(this)){
_6cb._openElement.hide();
_6cb.setOpenElement(false);
}
if(this.isMenuContainer&&e&&e.type==DOMEvents.MOUSEOVER){
var _6cb=this.getMenuContainerBinding();
if(!_6cb.isOpen(this)){
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
MenuItemBinding.prototype.blur=function(_6cd){
if(this._showSubMenuTimeout){
window.clearTimeout(this._showSubMenuTimeout);
this._showSubMenuTimeout=null;
}
if(this.isFocused){
var _6ce=this.getMenuContainerBinding();
if(!_6ce||!_6ce.isOpen(this)||_6cd){
this.labelBinding.detachClassName(MenuItemBinding.CLASSNAME_HOVER);
this.isFocused=false;
this._containingMenuBodyBinding.handleBlurredItem(this);
}
}
};
MenuItemBinding.prototype.check=function(_6cf){
this.setChecked(true,_6cf);
};
MenuItemBinding.prototype.uncheck=function(_6d0){
this.setChecked(false,_6d0);
};
MenuItemBinding.prototype.show=function(){
this.menuPopupBinding.position=PopupBinding.POSITION_RIGHT;
MenuItemBinding.superclass.show.call(this);
};
MenuItemBinding.prototype.setChecked=function(_6d1,_6d2){
this.setProperty("ischecked",_6d1);
if(this.isAttached){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.isChecked!=_6d1){
this.isChecked=_6d1;
this.shadowTree.checkBoxIndicator.style.display=_6d1?"block":"none";
if(!_6d2){
this.fireCommand();
}
}
}
}
};
MenuItemBinding.newInstance=function(_6d3){
var _6d4=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_6d3);
UserInterface.registerBinding(_6d4,MenuItemBinding);
return UserInterface.getBinding(_6d4);
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
PopupBinding.handleBroadcast=function(_6d5,arg){
switch(_6d5){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
case BroadcastMessages.MOUSEEVENT_MOUSEUP:
if(PopupBinding.activeInstances.hasEntries()){
var list=new List();
PopupBinding.activeInstances.each(function(key){
var _6d9=PopupBinding.activeInstances.get(key);
var _6da=(arg&&arg instanceof ButtonBinding&&arg.popupBinding==_6d9);
if(!_6da){
list.add(_6d9);
}
});
list.each(function(_6db){
_6db.hide();
});
}
break;
case BroadcastMessages.KEY_ESCAPE:
if(PopupBinding.activeInstances.hasEntries()){
PopupBinding.activeInstances.each(function(key){
var _6dd=PopupBinding.activeInstances.get(key);
_6dd.hide();
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
var _6de=DOMUtil.getElementsByTagName(this.bindingElement,"menubody").item(0);
var _6df=DOMUtil.getElementsByTagName(this.bindingElement,"popupbody").item(0);
if(_6de){
this._bodyBinding=UserInterface.getBinding(_6de);
}else{
if(_6df){
this._bodyBinding=UserInterface.getBinding(_6df);
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
var _6e0=this.getProperty("position");
this.position=_6e0?_6e0:PopupBinding.POSITION_BOTTOM;
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
PopupBinding.prototype.add=function(_6e1){
var _6e2=null;
if(this._bodyBinding){
this._bodyBinding.add(_6e1);
_6e2=_6e1;
}else{
_6e2=PopupBinding.superclass.add.call(this,_6e1);
}
return _6e2;
};
PopupBinding.prototype.addFirst=function(_6e3){
var _6e4=null;
if(this._bodyBinding){
this._bodyBinding.addFirst(_6e3);
_6e4=_6e3;
}else{
_6e4=PopupBinding.superclass.addFirst.call(this,_6e3);
}
return _6e4;
};
PopupBinding.prototype.handleAction=function(_6e5){
PopupBinding.superclass.handleAction.call(this,_6e5);
var _6e6=_6e5.target;
switch(_6e5.type){
case Binding.ACTION_ATTACHED:
if(_6e6 instanceof MenuItemBinding){
this._count(true);
_6e5.consume();
}
break;
case Binding.ACTION_DETACHED:
if(_6e6 instanceof MenuItemBinding){
this._count(false);
_6e5.consume();
}
break;
}
};
PopupBinding.prototype._count=function(_6e7){
if(this.type==PopupBinding.TYPE_FIXED){
this._menuItemCount=this._menuItemCount+(_6e7?1:-1);
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
PopupBinding.prototype.snapTo=function(_6e8){
var _6e9=this._getElementPosition(_6e8);
switch(this.position){
case PopupBinding.POSITION_TOP:
_6e9.y-=this.bindingElement.offsetHeight;
break;
case PopupBinding.POSITION_RIGHT:
_6e9.x+=_6e8.offsetWidth;
break;
case PopupBinding.POSITION_BOTTOM:
_6e9.y+=_6e8.offsetHeight;
break;
case PopupBinding.POSITION_LEFT:
_6e9.x-=this.bindingElement.offsetWidth;
break;
}
this.targetElement=_6e8;
this.bindingElement.style.display="block";
this.setPosition(_6e9.x,_6e9.y);
};
PopupBinding.prototype.snapToMouse=function(e){
this.snapToPoint(this._getMousePosition(e));
};
PopupBinding.prototype.snapToPoint=function(_6eb){
this.bindingElement.style.display="block";
this.setPosition(_6eb.x,_6eb.y);
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
PopupBinding.prototype._getElementPosition=function(_6f0){
return _6f0.ownerDocument==this.bindingDocument?DOMUtil.getGlobalPosition(_6f0):DOMUtil.getUniversalPosition(_6f0);
};
PopupBinding.prototype._getMousePosition=function(e){
var _6f2=DOMEvents.getTarget(e);
return _6f2.ownerDocument==this.bindingDocument?DOMUtil.getGlobalMousePosition(e):DOMUtil.getUniversalMousePosition(e);
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
PopupBinding.prototype._makeVisible=function(_6f3){
var _6f4=this.bindingElement;
if(_6f3){
if(Client.hasTransitions){
_6f4.style.visibility="visible";
_6f4.style.opacity="1";
}else{
_6f4.style.visibility="visible";
}
}else{
_6f4.style.visibility="hidden";
_6f4.style.display="none";
if(Client.hasTransitions){
_6f4.style.opacity="0";
}
}
this.isVisible=_6f3;
};
PopupBinding.prototype._enableTab=function(_6f5){
var self=this;
var _6f7=this.getDescendantBindingsByLocalName("menuitem");
setTimeout(function(){
if(Binding.exists(self)==true){
_6f7.each(function(_6f8){
_6f8.bindingElement.tabIndex=_6f5?0:-1;
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
PopupBinding.prototype.grabKeyboard=function(_701){
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
var _707=null;
if(this._menuItems){
if(this._menuItems[cmd]){
_707=this._menuItems[cmd];
}else{
throw "PopupBinding.getMenuItemForCommand: No binding for command "+cmd;
}
}else{
throw "Must invoke _indexMenuContent method first!";
}
return _707;
};
PopupBinding.prototype.clear=function(){
var _708=this._bodyBinding;
if(_708){
_708.detachRecursive();
_708.bindingElement.innerHTML="";
}
this._menuItemCount=0;
};
PopupBinding.newInstance=function(_709){
var _70a=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_709);
return UserInterface.registerBinding(_70a,PopupBinding);
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
PopupBodyBinding.newInstance=function(_70c){
var _70d=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupbody",_70c);
return UserInterface.registerBinding(_70d,PopupBodyBinding);
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
MenuPopupBinding.prototype._getElementPosition=function(_70e){
return new Point(_70e.offsetLeft,0);
};
MenuPopupBinding.newInstance=function(_70f){
var _710=DOMUtil.createElementNS(Constants.NS_UI,"ui:menupopup",_70f);
return UserInterface.registerBinding(_710,MenuPopupBinding);
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
var _711=DOMUtil.getElementsByTagName(this.bindingElement,"dialogbody").item(0);
if(_711){
this._body=UserInterface.getBinding(_711);
}else{
this._body=DialogBodyBinding.newInstance(this.bindingDocument);
this.add(this._body);
}
};
DialogBinding.prototype.buildBorderBindings=function(){
var _712=new List([DialogBorderBinding.TYPE_NORTH,DialogBorderBinding.TYPE_SOUTH,DialogBorderBinding.TYPE_EAST,DialogBorderBinding.TYPE_WEST]);
while(_712.hasNext()){
var _713=DialogBorderBinding.newInstance(this.bindingDocument);
_713.setType(_712.getNext());
this.add(_713);
}
};
DialogBinding.prototype.buildShadowBinding=function(){
this.shadowBinding=ShadowBinding.newInstance(this.bindingDocument);
this.shadowBinding.attachClassName("dialogshadow");
this.shadowBinding.shadow(this);
this.shadowBinding.attach();
};
DialogBinding.prototype.buildControlBindings=function(){
var _714=this.getProperty("controls");
if(_714){
var _715=new List(_714.split(" "));
while(_715.hasNext()){
var type=_715.getNext();
switch(type){
case ControlBinding.TYPE_MAXIMIZE:
case ControlBinding.TYPE_MINIMIZE:
case ControlBinding.TYPE_CLOSE:
var _717=DialogControlBinding.newInstance(this.bindingDocument);
_717.setControlType(type);
this._titlebar.addControl(_717);
this.controlBindings[type]=_717;
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
var _718=this.getProperty("image");
var _719=this.getProperty("label");
var _71a=this.getProperty("draggable");
var _71b=this.getProperty("resizable");
var _71c=this.getProperty("modal");
if(_718){
this.setImage(_718);
}
if(_719){
this.setLabel(_719);
}
if(_71a==false){
this.isDialogDraggable=false;
}
if(_71b==false){
this.isPanelResizable=false;
}
if(_71c==true){
this.setModal(true);
}
};
DialogBinding.prototype.setModal=function(_71d){
this.isModal=_71d;
};
DialogBinding.prototype.setLabel=function(_71e){
this.setProperty("label",_71e);
if(this.isAttached==true){
this._titlebar.setLabel(Resolver.resolve(_71e));
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
DialogBinding.prototype.handleAction=function(_720){
DialogBinding.superclass.handleAction.call(this,_720);
switch(_720.type){
case Binding.ACTION_DRAG:
var _721=_720.target;
if(this.getState()==ControlBoxBinding.STATE_NORMAL){
switch(_721.constructor){
case DialogTitleBarBinding:
this.mode=DialogBinding.MODE_DRAGGING;
_721.dragger.registerHandler(this);
break;
case DialogBorderBinding:
if(this._isResizable){
this.mode=DialogBinding.MODE_RESIZING;
this._border=_721;
_721.dragger.registerHandler(this);
}
break;
}
}
_720.consume();
break;
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_720.consume();
break;
}
};
DialogBinding.prototype.handleBroadcast=function(_722,arg){
DialogBinding.superclass.handleBroadcast.call(this,_722,arg);
switch(_722){
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.startPoint=this.getPosition();
this._setComputedPosition(new Point(0,0));
break;
}
};
DialogBinding.prototype.handleInvokedControl=function(_724){
DialogBinding.superclass.handleInvokedControl.call(this,_724);
switch(_724.controlType){
case ControlBinding.TYPE_CLOSE:
this.close();
break;
}
};
DialogBinding.prototype.open=function(_725){
if(this.isModal&&this._cover==null){
this.buildDialogCoverBinding();
}
if(!this.isVisible){
this.setProperty("open","true");
this.isVisible=true;
this.isActivatable=true;
this.activate();
if(_725){
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
var _727=self.bindingElement;
setTimeout(function(){
_727.style.opacity="0";
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
DialogBinding.prototype.setZIndex=function(_728){
this.bindingElement.style.zIndex=new String(_728);
};
DialogBinding.prototype.onDragStart=function(_729){
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
DialogBinding.prototype.setResizable=function(_73b){
if(this._isResizable!=_73b){
if(_73b){
this.attachClassName("resizable");
}else{
this.detachClassName("resizable");
}
this._isResizable=_73b;
}
};
DialogBinding.prototype.computeDefaultGeometry=function(){
var _73c=null;
var _73d=this.bindingDocument.body.offsetWidth;
var _73e=this.bindingDocument.body.offsetHeight;
_73c={x:0.125*_73d,y:0.125*_73e,w:0.75*_73d,h:0.5*_73e};
return _73c;
};
DialogBinding.prototype.centerOnScreen=function(){
var _73f=this.bindingWindow.WindowManager.getWindowDimensions();
var dim=this.getDimension();
this.setPosition(new Point(0.5*(_73f.w-dim.w),0.5*(_73f.h-dim.h)));
};
DialogBinding.prototype.alert=function(){
var _741=this;
var i=0;
function blink(){
if(i%2==0){
_741.detachClassName("active");
}else{
_741.attachClassName("active");
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
var _745="";
while(list.hasNext()){
var type=list.getNext();
_745+=type+list.hasNext()?" ":"";
}
this.setProperty("controls",_745);
if(this.isAttached){
this.buildControlBindings();
}
};
DialogBinding.newInstance=function(_746){
var _747=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_746);
return UserInterface.registerBinding(_747,DialogBinding);
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
DialogHeadBinding.newInstance=function(_748){
var _749=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialoghead",_748);
return UserInterface.registerBinding(_749,DialogHeadBinding);
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
DialogBodyBinding.newInstance=function(_74c){
var _74d=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogbody",_74c);
return UserInterface.registerBinding(_74d,DialogBodyBinding);
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
DialogMatrixBinding.newInstance=function(_74e){
var _74f=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogmatrix",_74e);
return UserInterface.registerBinding(_74f,DialogMatrixBinding);
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
DialogSetBinding.prototype.handleAction=function(_750){
DialogSetBinding.superclass.handleAction.call(this,_750);
var _751=_750.target;
switch(_750.type){
case Binding.ACTION_MOVETOTOP:
if(_751 instanceof DialogBinding){
this._moveToTop(_751);
}
break;
case Binding.ACTION_MOVEDONTOP:
_750.consume();
break;
}
};
DialogSetBinding.prototype._moveToTop=function(_752){
var _753=0;
var _754=this.getChildBindingsByLocalName("dialog");
_754.each(function(_755){
var _756=_755.getZIndex();
_753=_756>_753?_756:_753;
});
_752.setZIndex(_753+2);
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
DialogBorderBinding.newInstance=function(_758){
var _759=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogborder",_758);
return UserInterface.registerBinding(_759,DialogBorderBinding);
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
DialogCoverBinding.prototype.cover=function(_75a){
this._dialogBinding=_75a;
this._dialogBinding.addActionListener(DialogBinding.ACTION_OPEN,this);
this._dialogBinding.addActionListener(DialogBinding.ACTION_CLOSE,this);
this._dialogBinding.addActionListener(Binding.ACTION_MOVEDONTOP,this);
this.addEventListener(DOMEvents.MOUSEDOWN);
};
DialogCoverBinding.prototype.handleEvent=function(e){
DialogCoverBinding.superclass.handleEvent.call(this,e);
this._dialogBinding.alert();
};
DialogCoverBinding.prototype.handleAction=function(_75c){
DialogCoverBinding.superclass.handleAction.call(this,_75c);
var _75d=_75c.target;
if(this._dialogBinding.isModal){
switch(_75c.type){
case DialogBinding.ACTION_OPEN:
this.show();
break;
case DialogBinding.ACTION_CLOSE:
this.hide();
break;
case Binding.ACTION_MOVEDONTOP:
if(_75d==this._dialogBinding){
this.bindingElement.style.zIndex=new String(_75d.getZIndex()-1);
}
break;
}
}
};
DialogCoverBinding.prototype.handleBroadcast=function(_75e,arg){
DialogCoverBinding.superclass.handleBroadcast.call(this,_75e,arg);
switch(_75e){
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
var _761=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.subscribe(_761);
DialogCoverBinding.superclass.show.call(this);
};
DialogCoverBinding.prototype.hide=function(){
var _762=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.unsubscribe(_762);
DialogCoverBinding.superclass.hide.call(this);
};
DialogCoverBinding.newInstance=function(_763){
var _764=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogcover",_763);
return UserInterface.registerBinding(_764,DialogCoverBinding);
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
var _765=this.getProperty("image");
if(_765){
this.setImage(_765);
}
var _766=this.getProperty("label");
if(_766){
this.setLabel(_766);
}
};
DialogTitleBarBinding.prototype.setLabel=function(_767){
if(this.isAttached){
this.labelBinding.setLabel(_767);
}
this.setProperty("label",_767);
};
DialogTitleBarBinding.prototype.setImage=function(url){
if(this.isAttached&&Client.isWindows){
this.labelBinding.setImage(url);
}
this.setProperty("image",url);
};
DialogTitleBarBinding.prototype.addControl=function(_769){
if(!this._controlGroupBinding){
this._controlGroupBinding=this.bodyBinding.addFirst(ControlGroupBinding.newInstance(this.bindingDocument));
}
this._controlGroupBinding.add(_769);
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
DialogTitleBarBinding.newInstance=function(_76a){
var _76b=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebar",_76a);
return UserInterface.registerBinding(_76b,DialogTitleBarBinding);
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
DialogTitleBarBodyBinding.newInstance=function(_76c){
var _76d=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebarbody",_76c);
return UserInterface.registerBinding(_76d,DialogTitleBarBodyBinding);
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
DialogControlBinding.newInstance=function(_76e){
var _76f=DOMUtil.createElementNS(Constants.NS_UI,"ui:control",_76e);
return UserInterface.registerBinding(_76f,DialogControlBinding);
};
DialogControlImageProfile.prototype=new ControlImageProfile;
DialogControlImageProfile.prototype.constructor=DialogControlImageProfile;
DialogControlImageProfile.superclass=ControlImageProfile.prototype;
var os=Client.isVista?"vista/":(!Client.isWindows?"osx/":"");
DialogControlImageProfile.IMAGE_MINIMIZE="${root}/skins/system/controls/"+os+"control-minimize-${string}.png";
DialogControlImageProfile.IMAGE_MAXIMIZE="${root}/skins/system/controls/"+os+"control-maximize-${string}.png";
DialogControlImageProfile.IMAGE_RESTORE="${root}/skins/system/controls/"+os+"control-restore-${string}.png";
DialogControlImageProfile.IMAGE_CLOSE="${root}/skins/system/controls/"+os+"control-close-${string}.png";
function DialogControlImageProfile(_770){
this.binding=_770;
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
var _773=null;
if(node.nodeType==Node.ELEMENT_NODE){
var _774=node.nodeName.toLowerCase();
switch(_774){
case "script":
case "style":
case "textarea":
_773=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
break;
}
}
return _773;
});
var self=this;
this.addFilter(function(node,arg){
if(node.nodeType==Node.TEXT_NODE){
var text=node.nodeValue.toLowerCase();
self._map.each(function(key,exp){
var _77b=true;
if(exp.test(text)){
self._textnodes.add(node);
_77b=false;
}
return _77b;
});
}
});
};
WindowBindingHighlightNodeCrawler.prototype.crawl=function(_77c,arg){
this._textnodes=new List();
WindowBindingHighlightNodeCrawler.superclass.crawl.call(this,_77c,arg);
};
WindowBindingHighlightNodeCrawler.prototype.setKeys=function(list){
list.reset();
this._map.empty();
while(list.hasNext()){
var key=list.getNext();
var _780=key.toLowerCase().replace(/ /g,"\\W");
var exp=new RegExp("("+_780+")");
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
WindowBindingHighlightNodeCrawler.prototype._getMarkup=function(_786){
var _787="";
var _788="<span class=\""+WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT+"\" style=\"background-color:yellow;color:black;\">";
var _789="</span>";
var self=this;
function iterate(_78b){
var _78c=-1;
var _78d=null;
self._map.each(function(key,exp){
var low=_78b.toLowerCase();
var _791=low.search(exp);
if(_791>-1){
if(_78c==-1){
_78c=_791;
}
if(_791<=_78c){
_78c=_791;
_78d=key;
}
}
});
if(_78c>-1&&_78d!=null){
var pre=_78b.substring(0,_78c);
var hit=_78b.substring(_78c,_78c+_78d.length);
var pst=_78b.substring(_78c+_78d.length,_78b.length);
_787+=pre+_788+hit+_789;
iterate(pst);
}else{
_787+=_78b;
}
}
iterate(_786);
return _787;
};
WindowBindingHighlightNodeCrawler.prototype.reset=function(_795){
var _796=new List(_795.getElementsByTagName("span"));
_796.each(function(span){
if(span.className==WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT){
var node=_795.ownerDocument.createTextNode(DOMUtil.getTextContent(span));
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
WindowBinding.getMarkup=function(_799){
var _79a=null;
if(_799.isAttached){
var doc=_799.getContentDocument();
if(doc!=null){
var root=doc.getElementsByTagName("html").item(0);
var html="<html xmlns=\""+Constants.NS_XHTML+"\">"+root.innerHTML+"</html>";
WebServiceProxy.isFaultHandler=false;
_79a=top.MarkupFormatService.HtmlToXhtml(html);
WebServiceProxy.isFaultHandler=true;
if(_79a instanceof SOAPFault){
_79a=null;
}
}
}
return _79a;
};
WindowBinding.highlightKeywords=function(_79e,list){
if(WindowBinding._highlightcrawler==null){
WindowBinding._highlightcrawler=new WindowBindingHighlightNodeCrawler();
}
if(_79e.isAttached){
var doc=_79e.getContentDocument();
if(doc!=null){
var _7a1=WindowBinding._highlightcrawler;
_7a1.reset(doc.body);
if(list!=null){
_7a1.setKeys(list);
_7a1.crawl(doc.body);
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
var _7a2=WindowBinding.superclass.serialize.call(this);
if(_7a2){
_7a2.url=this.getURL();
}
return _7a2;
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
var _7a4=this.getContentWindow().DocumentManager;
if(_7a4!=null){
_7a4.detachAllBindings();
this._pageBinding=null;
}
}
}
};
WindowBinding.prototype.handleAction=function(_7a5){
WindowBinding.superclass.handleAction.call(this,_7a5);
var _7a6=_7a5.target;
switch(_7a5.type){
case RootBinding.ACTION_PHASE_3:
if(_7a6.bindingDocument==this.getContentDocument()){
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
this._onPageInitialize(_7a6);
break;
case RootBinding.ACTION_ACTIVATED:
case RootBinding.ACTION_DEACTIVATED:
_7a5.consume();
break;
}
};
WindowBinding.prototype.fit=function(_7a7){
if(!this.isFit||_7a7){
if(this._pageBinding!=null){
this.setHeight(this._pageBinding.getHeight());
this.isFit=true;
}
}
};
WindowBinding.prototype._onPageInitialize=function(_7a8){
if(this._pageBinding==null){
if(_7a8.bindingWindow==this.getContentWindow()){
this._pageBinding=_7a8;
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
WindowBinding.prototype._registerOnloadListener=function(_7a9){
var _7aa=this.shadowTree.iframe;
var _7ab=_7a9?"addEventListener":"removeEventListener";
if(this._onloadHandler==null){
var self=this;
this._onloadHandler={handleEvent:function(e){
var _7ae=true;
if(Client.isExplorer){
_7ae=_7aa.readyState=="complete";
}
if(_7ae==true){
if(self.getURL()!=WindowBinding.DEFAULT_URL){
if(!self._hasLoadActionFired){
self.onWindowLoaded(self.getContentWindow());
}
}
}
}};
}
DOMEvents[_7ab](this.shadowTree.iframe,Client.isExplorer==true?"readystatechange":DOMEvents.LOAD,this._onloadHandler);
};
WindowBinding.prototype._registerUnloadListener=function(_7af){
var _7b0=_7af?"addEventListener":"removeEventListener";
if(this._unloadHandler==null){
var self=this;
this._unloadHandler={handleEvent:function(){
self._disposeContentDocument();
self._hasLoadActionFired=false;
}};
}
DOMEvents[_7b0](this.getContentWindow(),DOMEvents.UNLOAD,this._unloadHandler);
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
var _7b4=WindowBinding.DEFAULT_URL;
var url=this.getProperty("url");
if(url){
_7b4=url;
}
return _7b4;
};
WindowBinding.prototype.reload=function(_7b6){
this._disposeContentDocument();
if(Client.isPrism){
Prism.disableCache();
}
this._isReloading=true;
this.getContentDocument().location.reload();
};
WindowBinding.prototype.getFrameElement=function(){
var _7b7=null;
if(this.shadowTree.iframe!=null){
_7b7=this.shadowTree.iframe;
}
return _7b7;
};
WindowBinding.prototype.getContentWindow=function(){
var _7b8=null,_7b9=this.getFrameElement();
if(_7b9!==null){
try{
_7b8=_7b9.contentWindow;
}
catch(e){
this.logger.error("WindowBinding#getContentWindow: strange IE9 error");
}
}
return _7b8;
};
WindowBinding.prototype.getContentDocument=function(){
var _7ba=null,win=this.getContentWindow();
if(win){
_7ba=win.document;
}
return _7ba;
};
WindowBinding.prototype.getRootBinding=function(){
var _7bc=null,doc=this.getContentDocument();
if(doc&&doc.body){
_7bc=UserInterface.getBinding(doc.body);
}
return _7bc;
};
WindowBinding.prototype.getPageBinding=function(){
return this._pageBinding;
};
WindowBinding.prototype.setHeight=function(_7be){
this.bindingElement.style.height=_7be+"px";
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
WindowBinding.prototype.handleCrawler=function(_7bf){
WindowBinding.superclass.handleCrawler.call(this,_7bf);
if(_7bf.type==NodeCrawler.TYPE_DESCENDING){
var root=this.getRootBinding();
if(root!=null){
_7bf.nextNode=root.bindingElement;
}else{
_7bf.response=NodeCrawler.SKIP_CHILDREN;
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
WindowBinding.newInstance=function(_7c4){
var _7c5=DOMUtil.createElementNS(Constants.NS_UI,"ui:window",_7c4);
var _7c6=UserInterface.registerBinding(_7c5,WindowBinding);
return _7c6;
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
this._windowBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_7ca){
_7ca.target.show();
_7ca.consume();
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
this._errorBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_7cc){
_7cc.target.show();
_7cc.consume();
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
PreviewWindowBinding.prototype.handleAction=function(_7ce){
PreviewWindowBinding.superclass.handleAction.call(this,_7ce);
switch(_7ce.type){
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
var _7cf=null;
this._getRadioButtonBindings().each(function(_7d0){
if(_7d0.getProperty("ischecked")){
_7cf=_7d0;
return false;
}else{
return true;
}
});
if(_7cf){
this._checkedRadioBinding=_7cf;
}
RadioGroupBinding.superclass.onBindingInitialize.call(this);
};
RadioGroupBinding.prototype.handleAction=function(_7d1){
RadioGroupBinding.superclass.handleAction.call(this,_7d1);
var _7d2=_7d1.target;
switch(_7d1.type){
case ButtonBinding.ACTION_RADIOBUTTON_ATTACHED:
this._isUpToDate=false;
_7d1.consume();
break;
case ButtonBinding.ACTION_COMMAND:
if(_7d2.isRadioButton&&!_7d2.isDisabled){
if(this._checkedRadioBinding){
this._unCheckRadioBindingsExcept(_7d2);
}
this._checkedRadioBinding=_7d2;
this.dispatchAction(RadioGroupBinding.ACTION_SELECTIONCHANGED);
_7d1.consume();
}
break;
}
};
RadioGroupBinding.prototype.setCheckedButtonBinding=function(_7d3,_7d4){
if(_7d3 instanceof RadioDataBinding){
_7d3=_7d3.getButton();
}
if(_7d3.isRadioButton){
switch(_7d4){
case true:
this._unCheckRadioBindingsExcept(_7d3);
this._checkedRadioBinding=_7d3;
_7d3.check(true);
break;
default:
_7d3.check();
break;
}
}
};
RadioGroupBinding.prototype.getCheckedButtonBinding=function(){
return this._checkedRadioBinding;
};
RadioGroupBinding.prototype._unCheckRadioBindingsExcept=function(_7d5){
var _7d6=this._getRadioButtonBindings();
_7d6.each(function(_7d7){
if(_7d7.isChecked&&_7d7!=_7d5){
_7d7.uncheck(true);
}
});
};
RadioGroupBinding.prototype._getRadioButtonBindings=function(){
if(this._radioButtonBindings===null||!this._isUpToDate){
var _7d8=new Crawler();
var list=new List();
_7d8.addFilter(function(_7da){
var _7db=true;
var _7dc=UserInterface.getBinding(_7da);
if(_7dc instanceof RadioGroupBinding){
_7db=NodeCrawler.SKIP_CHILDREN;
}else{
if(_7dc instanceof ButtonBinding&&_7dc.isRadioButton){
list.add(_7dc);
}
}
return _7db;
});
_7d8.crawl(this.bindingElement);
this._radioButtonBindings=list;
}
return this._radioButtonBindings;
};
RadioGroupBinding.newInstance=function(_7dd){
var _7de=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiogroup",_7dd);
return UserInterface.registerBinding(_7de,RadioGroupBinding);
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
var _7e0=this.getProperty("regexrule");
if(_7e0!=null){
this.expression=new RegExp(_7e0);
}
var _7e1=this.getProperty("onbindingblur");
if(_7e1!=null){
this.onblur=function(){
Binding.evaluate(_7e1,this);
};
}
var _7e2=this.getProperty("onvaluechange");
if(_7e2!=null){
this.onValueChange=function(){
Binding.evaluate(_7e2,this);
};
}
if(this.error==null&&this.type!=null){
var _7e3=DataBinding.errors[this.type];
if(_7e3!=null){
this.error=_7e3;
}
}
};
DataInputBinding.prototype._buildDOMContent=function(){
this.shadowTree.input=this._getInputElement();
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
if(Client.isExplorer==true){
this.bindingElement.hideFocus=true;
}
var _7e4=this.getProperty("value");
if(_7e4!=null){
this.setValue(String(_7e4));
}
var name=this.getProperty("name");
if(name!=null){
this.setName(name);
}
var _7e6=this.getProperty("isdisabled");
if(_7e6==true){
this.setDisabled(true);
}
var _7e7=this.getProperty("readonly");
if(_7e7==true){
this.setReadOnly(true);
}
var _7e8=this.getProperty("autoselect");
if(_7e8==true){
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
var _7e9=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_7e9.type=this.isPassword==true?"password":"text";
_7e9.tabIndex=-1;
return _7e9;
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
DataInputBinding.prototype._handleFocusAndBlur=function(_7ec){
if(_7ec){
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
DataInputBinding.prototype.handleBroadcast=function(_7ef,arg){
DataInputBinding.superclass.handleBroadcast.call(this,_7ef,arg);
var self=this;
switch(_7ef){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(Client.isExplorer==true){
var _7f2=DOMEvents.getTarget(arg);
if(_7f2!=this.shadowTree.input){
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
DataInputBinding.prototype.focus=function(_7f3){
if(!this.isFocused&&!this.isReadOnly&&!this.isDisabled){
DataInputBinding.superclass.focus.call(this);
if(this.isFocused==true){
this._focus();
if(this._isAutoSelect==true){
if(_7f3){
var self=this,_7f5=this.bindingElement,_7f6={handleEvent:function(){
self.select();
DOMEvents.removeEventListener(_7f5,DOMEvents.MOUSEUP,this);
}};
DOMEvents.addEventListener(_7f5,DOMEvents.MOUSEUP,_7f6);
}else{
this.select();
}
}
this.onfocus();
if(!_7f3){
var _7f7=this.shadowTree.input;
setTimeout(function(){
FocusBinding.focusElement(_7f7);
},0);
}
}
}
};
DataInputBinding.prototype.select=function(){
var _7f8=this.shadowTree.input;
setTimeout(function(){
if(Client.isExplorer==true){
var _7f9=_7f8.createTextRange();
_7f9.moveStart("character",0);
_7f9.moveEnd("character",_7f8.value.length);
_7f9.select();
}else{
_7f8.setSelectionRange(0,_7f8.value.length);
}
},0);
};
DataInputBinding.prototype.blur=function(_7fa){
if(this.isFocused==true){
DataInputBinding.superclass.blur.call(this);
if(!_7fa){
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
DataInputBinding.prototype.validate=function(_7fe){
if(_7fe==true||this._isValid){
var _7ff=this.isValid();
if(_7ff!=this._isValid){
this._isValid=_7ff;
if(!_7ff){
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._value=this.getValue();
this.dispatchAction(Binding.ACTION_INVALID);
if(!this.isFocused){
var _800=null;
if(this._isInvalidBecauseRequired==true){
_800=DataBinding.warnings["required"];
}else{
if(this._isInvalidBecauseMinLength==true){
_800=DataBinding.warnings["minlength"];
_800=_800.replace("${count}",String(this.minlength));
}else{
if(this._isInvalidBecauseMaxLength==true){
_800=DataBinding.warnings["maxlength"];
_800=_800.replace("${count}",String(this.maxlength));
}else{
_800=DataBinding.warnings[this.type];
}
}
}
this.shadowTree.input.className=DataBinding.CLASSNAME_WARNING;
if(_800!=null){
if(this.isPassword){
if(Client.isMozilla){
this.shadowTree.input.type="text";
this.setValue(_800);
}else{
alert(_800);
}
}else{
this.setValue(_800);
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
var _801=true;
this._isInvalidBecauseRequired=false;
this._isInvalidBecauseMinLength=false;
this._isInvalidaBecuaseMaxLength=false;
var _802=this.getValue();
if(_802==""){
if(this.isRequired==true){
_801=false;
this._isInvalidBecauseRequired=true;
}
}else{
if(this.type!=null){
var _803=DataBinding.expressions[this.type];
if(!_803.test(_802)){
_801=false;
}
}else{
if(this.expression!=null){
if(!this.expression.test(_802)){
_801=false;
}
}
}
}
if(_801&&this.minlength!=null){
if(_802.length<this.minlength){
this._isInvalidBecauseMinLength=true;
_801=false;
}
}
if(_801&&this.maxlength!=null){
if(_802.length>this.maxlength){
this._isInvalidBecauseMaxLength=true;
_801=false;
}
}
return _801;
};
DataInputBinding.prototype.setDisabled=function(_804){
if(_804!=this.isDisabled){
if(_804){
this.attachClassName("isdisabled");
}else{
this.detachClassName("isdisabled");
}
var _805=this.shadowTree.input;
if(_804){
this._disabledHandler={handleEvent:function(e){
DOMEvents.preventDefault(e);
DOMEvents.stopPropagation(e);
}};
DOMEvents.addEventListener(_805,DOMEvents.MOUSEDOWN,this._disabledHandler);
}else{
DOMEvents.removeEventListener(_805,DOMEvents.MOUSEDOWN,this._disabledHandler);
this._disabledHandler=null;
}
if(Client.isExplorer){
this.shadowTree.input.disabled=_804;
this.shadowTree.input.unselectable=_804?"on":"off";
}
this.isDisabled=_804;
this.isFocusable=!_804;
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
};
DataInputBinding.prototype.setReadOnly=function(_807){
if(_807!=this.isReadOnly){
if(_807){
this.attachClassName("readonly");
}else{
this.detachClassName("readonly");
}
this.shadowTree.input.readOnly=_807;
this.isReadOnly=_807;
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
DataInputBinding.prototype.handleElement=function(_808){
return true;
};
DataInputBinding.prototype.updateElement=function(_809){
var _80a=_809.getAttribute("value");
var _80b=_809.getAttribute("type");
var _80c=_809.getAttribute("maxlength");
var _80d=_809.getAttribute("minlength");
if(_80a==null){
_80a="";
}
var _80e=this.bindingWindow.UpdateManager;
if(this.getValue()!=_80a){
_80e.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_80a);
}
if(this.type!=_80b){
_80e.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_80b;
}
if(this.maxlength!=_80c){
_80e.report("Property [maxlength] updated on binding \""+this.getID()+"\"");
this.maxlength=_80c;
}
if(this.minlength!=_80d){
_80e.report("Property [minlength] updated on binding \""+this.getID()+"\"");
this.minlength=_80d;
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
DataInputBinding.prototype.setValue=function(_80f){
if(_80f===null){
_80f="";
}
if(_80f!=this.getValue()){
this.setProperty("value",_80f);
if(this.shadowTree.input!=null){
this.shadowTree.input.value=String(_80f);
}
}
};
DataInputBinding.prototype.getValue=function(){
var _810=null;
if(this.shadowTree.input!=null){
_810=this.shadowTree.input.value;
}else{
_810=this.getProperty("value");
}
return _810;
};
DataInputBinding.prototype.setName=function(name){
DataInputBinding.superclass.setName.call(this,name);
if(this.isAttached==true){
this.shadowTree.input.name=name;
}
};
DataInputBinding.prototype.getResult=function(){
var _812=this.getValue();
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_812=Number(_812);
break;
}
return _812;
};
DataInputBinding.prototype.setResult=DataInputBinding.prototype.setValue;
DataInputBinding.newInstance=function(_813){
var _814=DOMUtil.createElementNS(Constants.NS_UI,"ui:datainput",_813);
return UserInterface.registerBinding(_814,DataInputBinding);
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
var _815=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_815!=null){
this.setValue(_815.value);
_815.parentNode.removeChild(_815);
}
TextBoxBinding.superclass._buildDOMContent.call(this);
this.shadowTree.input.setAttribute("spellcheck","false");
if(!this._hasWordWrap){
this.shadowTree.input.setAttribute("wrap","off");
}
};
TextBoxBinding.prototype._getInputElement=function(){
var _816=DOMUtil.createElementNS(Constants.NS_XHTML,"textarea",this.bindingDocument);
_816.tabIndex=-1;
return _816;
};
TextBoxBinding.prototype.handleElement=function(_817){
return true;
};
TextBoxBinding.prototype.updateElement=function(_818){
var _819,area=_818.getElementsByTagName("textarea").item(0);
if(area!=null&&area.hasChildNodes()){
_819=DOMUtil.getTextContent(area);
}
if(_819==null){
_819="";
}
var _81b=this.bindingWindow.UpdateManager;
if(this.getValue()!=_819){
_81b.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_819);
}
var _81c=_818.getAttribute("type");
if(this.type!=_81c){
_81b.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_81c;
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
IEEditorTextBoxBinding.prototype._handleTabKey=function(_820){
var _821=this.bindingDocument.selection.createRange();
var _822=_821.text=="";
if(_822&&!_820){
_821.text="\t";
}else{
var text="";
var _824=_821.text.length;
while((_821.moveStart("word",-1)&&_821.text.charAt(1)!="\n")){
}
_821.moveStart("character",1);
var _825=0;
var i=0,line,_828=_821.text.split("\n");
while((line=_828[i++])!=null){
if(_820){
line=line.replace(/^(\s)/mg,"");
_825++;
}else{
line=line.replace(/^(.)/mg,"\t$1");
}
text+=line+(_828[i+1]?"\n":"");
}
_821.text=text;
_821.moveStart("character",-_824);
if(_820){
_821.moveStart("character",2*_828.length-2);
}
_821.select();
}
};
IEEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _829=this.bindingDocument.selection.createRange();
var _82a=_829.duplicate();
while((_82a.moveStart("word",-1)&&_82a.text.indexOf("\n")==-1)){
}
_82a.moveStart("character",1);
_829.text="\n"+_82a.text.match(/^(\s)*/)[0]+"!";
_829.moveStart("character",-1);
_829.select();
_829.text="";
_829.select();
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
MozEditorTextBoxBinding.prototype._handleTabKey=function(_82b){
var _82c;
var _82d;
var oss;
var osy;
var i;
var fnd;
var _832=this._getSelectedText();
var el=this.shadowTree.input;
_82c=el.scrollLeft;
_82d=el.scrollTop;
if(!_832.match(/\n/)){
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
_832=this._getSelectedText();
if(_82b){
ntext=_832.replace(/^(\s)/mg,"");
}else{
ntext=_832.replace(/^(.)/mg,"\t$1");
}
el.value=el.value.substr(0,el.selectionStart)+ntext+el.value.substr(el.selectionEnd);
el.selectionStart=oss;
el.selectionEnd=osy+(ntext.length-_832.length);
}
el.scrollLeft=_82c;
el.scrollTop=_82d;
};
MozEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _834;
var _835;
var oss;
var osy;
var el=this.shadowTree.input;
_834=el.scrollLeft;
_835=el.scrollTop;
oss=el.selectionStart;
osy=el.selectionEnd;
var bfs=el.value.substr(0,el.selectionStart);
var bfsm=bfs.split(/\r|\n/g);
var spm=bfsm[bfsm.length-1].match(/^(\s)*/);
el.value=el.value.substr(0,el.selectionStart)+"\n"+spm[0]+el.value.substr(el.selectionEnd);
el.selectionStart=oss+1+spm[0].length;
el.selectionEnd=oss+1+spm[0].length;
el.scrollLeft=_834;
el.scrollTop=_835;
};
MozEditorTextBoxBinding.prototype._getSelectedText=function(){
var _83c=this.shadowTree.input.value;
var _83d=this.shadowTree.input.selectionStart;
var end=this.shadowTree.input.selectionEnd;
return _83c.substr(_83d,end-_83d);
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
var _83f=this.getProperty("isdisabled");
if(this.isDisabled||_83f){
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
var _841=this.getProperty("label");
var _842=this.getProperty("value");
var _843=this.getProperty("width");
var _844=this.getProperty("onchange");
var _845=this.getProperty("required")==true;
if(!this.type&&type){
this.type=type;
}
if(!this.label&&_841!=null){
this.label=_841;
}
if(!this.value&&_842!=null){
this.value=_842;
}
if(!this.width&&_843){
this.width=_843;
}
if(_845){
this.isRequired=true;
}
if(_844){
this.onValueChange=function(){
Binding.evaluate(_844,this);
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
var _846=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_846.name=this.getName();
_846.value=this.getValue();
_846.type="hidden";
if(this.hasCallBackID()){
_846.id=this.getCallBackID();
}
this.shadowTree.input=_846;
this.bindingElement.appendChild(_846);
};
SelectorBinding.prototype.buildButton=function(){
var _847=this.BUTTON_IMPLEMENTATION;
var _848=this.add(_847.newInstance(this.bindingDocument));
if(this.imageProfile!=null){
_848.imageProfile=this.imageProfile;
}
if(this.width!=null){
_848.setWidth(this.width);
}
this._buttonBinding=_848;
this.shadowTree.button=_848;
_848.attach();
};
SelectorBinding.prototype.buildIndicator=function(){
var img=this.bindingDocument.createElement("img");
img.src=SelectorBinding.INDICATOR_IMAGE;
img.className="selectorindicatorimage";
this._buttonBinding.bindingElement.appendChild(img);
this.shadowTree.selectorindicatorimage=img;
};
SelectorBinding.prototype.buildPopup=function(){
var _84a=top.app.bindingMap.selectorpopupset;
var doc=_84a.bindingDocument;
var _84c=_84a.add(PopupBinding.newInstance(doc));
var _84d=_84c.add(MenuBodyBinding.newInstance(doc));
this._popupBinding=_84c;
this._menuBodyBinding=_84d;
this._popupBinding.attachClassName(SelectorBinding.CLASSNAME_POPUP);
this._popupBinding.attachRecursive();
this._popupBinding.type=PopupBinding.TYPE_FIXED;
_84c.attachClassName("selectorpopup");
_84c.addActionListener(PopupBinding.ACTION_SHOW,this);
_84c.addActionListener(MenuItemBinding.ACTION_COMMAND,this);
_84c.addActionListener(PopupBinding.ACTION_HIDE,this);
this._buttonBinding.setPopup(_84c);
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
var _850=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_850).each(function(_851){
var _852=_851.getAttribute("label");
var _853=_851.getAttribute("value");
var _854=_851.getAttribute("selected");
var _855=_851.getAttribute("image");
var _856=_851.getAttribute("image-hover");
var _857=_851.getAttribute("image-active");
var _858=_851.getAttribute("image-disabled");
var _859=null;
if(_855||_856||_857||_858){
_859=new ImageProfile({image:_855,imageHover:_856,imageActive:_857,imageDisabled:_858});
}
list.add(new SelectorBindingSelection(_852?_852:null,_853?_853:null,_854&&_854=="true",_859));
});
return list;
};
SelectorBinding.prototype.populateFromList=function(list){
if(this.isAttached){
this.clear();
if(list.hasEntries()){
var _85b=null;
while(list.hasNext()){
var _85c=list.getNext();
var item=this.addSelection(_85c);
if(!_85b){
_85b=item;
}
}
if(!this._selectedItemBinding){
this.select(_85b,true);
}
this.shadowTree.selectorindicatorimage.style.display="block";
}else{
this.shadowTree.selectorindicatorimage.style.display="none";
}
}else{
throw "Could not populate unattached selector";
}
};
SelectorBinding.prototype.addSelection=function(_85e,_85f){
var _860=this.MENUITEM_IMPLEMENTATION;
var _861=this._menuBodyBinding;
var _862=_861.bindingDocument;
var _863=_860.newInstance(_862);
_863.imageProfile=_85e.imageProfile;
_863.setLabel(_85e.label);
_863.selectionValue=_85e.value;
if(_85e.isSelected){
this.select(_863,true);
}
_85e.menuItemBinding=_863;
if(_85f){
_861.addFirst(_863);
this.selections.addFirst(_85e);
}else{
_861.add(_863);
this.selections.add(_85e);
}
this._isUpToDate=false;
return _863;
};
SelectorBinding.prototype.addSelectionFirst=function(_864){
return this.addSelection(_864,true);
};
SelectorBinding.prototype.clear=function(_865){
this._selectedItemBinding=null;
if(this._popupBinding){
this._popupBinding.clear();
this.selections.clear();
if(!_865&&this.defaultSelection!=null){
var _866=this.addSelection(this.defaultSelection);
this.select(_866,true);
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
SelectorBinding.prototype.setDisabled=function(_867){
if(this.isAttached==true){
var _868=this._buttonBinding;
this.shadowTree.selectorindicatorimage.style.display=_867?"none":"block";
_868.setDisabled(_867);
}
if(_867){
this.setProperty("isdisabled",true);
}else{
this.deleteProperty("isdisabled");
}
};
SelectorBinding.prototype.reset=function(_869){
if(this.defaultSelection!=null){
this.selectByValue(this.defaultSelection.value,_869);
}
};
SelectorBinding.prototype.handleAction=function(_86a){
SelectorBinding.superclass.handleAction.call(this,_86a);
switch(_86a.type){
case ButtonBinding.ACTION_COMMAND:
this._onButtonCommand();
_86a.consume();
break;
case PopupBinding.ACTION_SHOW:
this._onPopupShowing();
_86a.consume();
break;
case MenuItemBinding.ACTION_COMMAND:
this._onMenuItemCommand(_86a.target);
_86a.consume();
break;
case PopupBinding.ACTION_HIDE:
var self=this;
setTimeout(function(){
if(self.isFocused){
self._grabKeyboard();
}
},0);
_86a.consume();
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
SelectorBinding.prototype._onMenuItemCommand=function(_86c){
this.select(_86c);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
SelectorBinding.prototype._restoreSelection=function(){
if(this._selectedItemBinding){
this._selectedItemBinding.focus();
}
};
SelectorBinding.prototype._fitMenuToSelector=function(){
var _86d=this._buttonBinding.bindingElement.offsetWidth+"px";
var _86e=this._popupBinding.bindingElement;
if(Client.isMozilla==true){
_86e.style.minWidth=_86d;
}else{
_86e.style.width=_86d;
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
SelectorBinding.prototype.handleBroadcast=function(_870,arg){
SelectorBinding.superclass.handleBroadcast.call(this,_870,arg);
switch(_870){
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
SelectorBinding.prototype.select=function(_873,_874){
var _875=false;
if(_873!=this._selectedItemBinding){
this._selectedItemBinding=_873;
_875=true;
var _876=this._buttonBinding;
this._selectionValue=_873.selectionValue;
_876.setLabel(_873.getLabel());
if(_873.imageProfile!=null){
_876.imageProfile=_873.imageProfile;
}
if(_876.imageProfile!=null){
_876.setImage(this.isDisabled==true?_876.imageProfile.getDisabledImage():_876.imageProfile.getDefaultImage());
}
this._updateImageLayout();
if(!_874){
this.onValueChange();
this.dispatchAction(SelectorBinding.ACTION_SELECTIONCHANGED);
this.dirty();
}
if(!this._isValid||(this.isRequired&&!_874)){
this.validate();
}
}
return _875;
};
SelectorBinding.prototype._relate=function(){
var _877=this.getProperty("relate");
if(_877){
var _878=this.bindingDocument.getElementById(_877);
if(_878){
var _879=UserInterface.getBinding(_878);
if(_879){
if(this.isChecked){
_879.show();
}else{
_879.hide();
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
SelectorBinding.prototype.selectByValue=function(_87a,_87b){
var _87c=false;
var _87d=this._menuBodyBinding;
var _87e=_87d.getDescendantElementsByLocalName("menuitem");
while(_87e.hasNext()){
var _87f=UserInterface.getBinding(_87e.getNext());
if(_87f.selectionValue==_87a){
_87c=this.select(_87f,_87b);
break;
}
}
return _87c;
};
SelectorBinding.prototype.getValue=function(){
var _880=this._selectionValue;
if(_880!=null){
_880=String(_880);
}
return _880;
};
SelectorBinding.prototype.setValue=function(_881){
this.selectByValue(String(_881),true);
};
SelectorBinding.prototype.getResult=function(){
var _882=this._selectionValue;
if(_882=="null"){
_882=null;
}
if(_882){
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_882=Number(_882);
break;
}
}
return _882;
};
SelectorBinding.prototype.setResult=function(_883){
this.selectByValue(_883,true);
};
SelectorBinding.prototype.validate=function(){
var _884=true;
if(this.isRequired==true&&this.defaultSelection!=null){
var _885=this.getValue();
if(_885==this.defaultSelection.value){
_884=false;
}
if(_884!=this._isValid){
if(_884){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_884;
}
return _884;
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
var _886=this._popupBinding;
if(!this._isUpToDate){
_886.attachRecursive();
this._isUpToDate=true;
}
};
SelectorBinding.prototype.handleElement=function(){
return true;
};
SelectorBinding.prototype.updateElement=function(_887,_888){
this.bindingWindow.UpdateManager.addUpdate(new this.bindingWindow.ReplaceUpdate(this.getID(),_887));
return true;
};
SelectorBinding.newInstance=function(_889){
var _88a=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_889);
return UserInterface.registerBinding(_88a,SelectorBinding);
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
var _88d=this.getProperty("onchange");
this.isRequired=this.getProperty("required")==true;
if(this.hasCallBackID()){
this._select.id=this.getCallBackID();
}
if(_88d){
this.onValueChange=function(){
Binding.evaluate(_88d,this);
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
SimpleSelectorBinding.prototype.focus=function(_890){
SimpleSelectorBinding.superclass.focus.call(this);
if(this.isFocused){
if(!_890){
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
SimpleSelectorBinding.prototype._hack=function(_891){
if(Client.isExplorer){
this._select.style.width=_891?"auto":this._cachewidth+"px";
if(_891){
if(this._select.offsetWidth<=this._cachewidth){
this._hack(false);
}
}
}
};
SimpleSelectorBinding.prototype.validate=function(){
var _892=true;
if(this.isRequired){
if(this.getValue()==null){
_892=false;
}
}
if(_892!=this._isValid){
if(_892){
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.attachClassName(DataBinding.CLASSNAME_INVALID);
var _893=this._select;
var _894=_893.options[_893.selectedIndex];
var text=DOMUtil.getTextContent(_894);
_893.blur();
_893.style.color="#A40000";
_893.style.fontWeight="bold";
if(!Client.isExplorer6){
DOMUtil.setTextContent(_894,DataBinding.warnings["required"]);
}
_893.onfocus=function(){
this.style.color="black";
this.style.fontWeight="normal";
this.onfocus=null;
if(!Client.isExplorer6){
DOMUtil.setTextContent(_894,text);
}
};
}
this._isValid=_892;
}
return _892;
};
SimpleSelectorBinding.prototype.manifest=function(){
};
SimpleSelectorBinding.prototype.getValue=function(){
var _896=null;
var _897=this._select;
var _898=_897.options[_897.selectedIndex];
var _899=true;
if(Client.isExplorer){
var html=_898.outerHTML.toLowerCase();
if(html.indexOf("value=")==-1){
_899=false;
}
}
if(_899){
_896=_898.getAttribute("value");
}
return _896;
};
SimpleSelectorBinding.prototype.setValue=function(_89b){
};
SimpleSelectorBinding.prototype.getResult=function(){
return this.getValue();
};
SimpleSelectorBinding.prototype.setResult=function(_89c){
this.setValue(_89c);
};
SimpleSelectorBinding.newInstance=function(_89d){
var _89e=DOMUtil.createElementNS(Constants.NS_XHTML,"select",_89d);
return UserInterface.registerBinding(_89e,SimpleSelectorBinding);
};
function SelectorBindingSelection(_89f,_8a0,_8a1,_8a2){
this._init(_89f,_8a0,_8a1,_8a2);
}
SelectorBindingSelection.prototype={label:null,value:null,isSelected:null,imageProfile:null,menuItemBinding:null,_init:function(_8a3,_8a4,_8a5,_8a6){
if(_8a3!=null){
this.label=String(_8a3);
}
if(_8a4!=null){
this.value=String(_8a4);
}
if(_8a6!=null){
this.imageProfile=_8a6;
}
this.isSelected=_8a5?true:false;
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
var _8a7=this.addFirst(ToolBarButtonBinding.newInstance(this.bindingDocument));
_8a7.popupBindingTargetElement=this.shadowTree.input;
_8a7.setImage(DataInputSelectorBinding.INDICATOR_IMAGE);
_8a7.attach();
var self=this;
_8a7.oncommand=function(){
self._attachSelections();
};
this._buttonBinding=_8a7;
};
DataInputSelectorBinding.prototype.buildPopup=SelectorBinding.prototype.buildPopup;
DataInputSelectorBinding.prototype.buildSelections=function(){
var list=new List();
var _8aa=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_8aa).each(function(_8ab){
if(_8ab.getAttribute("label")){
throw "label not supported - use value property!";
}else{
var _8ac=_8ab.getAttribute("value");
var _8ad=_8ab.getAttribute("selected");
var _8ae=_8ab.getAttribute("tooltip");
list.add({value:_8ac?_8ac:null,toolTip:_8ae?_8ae:null,isSelected:(_8ad&&_8ad=="true")?true:false});
}
});
if(list.hasEntries()){
this.populateFromList(list);
}
};
DataInputSelectorBinding.prototype.populateFromList=function(list){
var _8b0=this._menuBodyBinding;
var _8b1=_8b0.bindingDocument;
while(_8b0.bindingElement.hasChildNodes()){
var node=_8b0.bindingElement.lastChild;
if(node.nodeType==Node.ELEMENT_NODE&&UserInterface.hasBinding(node)){
UserInterface.getBinding(node).dispose();
}else{
_8b0.removeChild(node);
}
}
if(list.hasEntries()){
this._isUpToDate=false;
if(!this._buttonBinding.isVisible){
this._buttonBinding.show();
}
while(list.hasNext()){
var _8b3=list.getNext();
var _8b4=MenuItemBinding.newInstance(_8b1);
_8b4.setLabel(_8b3.value);
_8b4.selectionValue=_8b3.value;
if(_8b3.toolTip){
_8b4.setToolTip(_8b3.toolTip);
}
if(_8b3.isSelected){
this.select(_8b4,true);
}
_8b0.add(_8b4);
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
DataInputSelectorBinding.prototype._onMenuItemCommand=function(_8b5){
this.select(_8b5);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
DataInputSelectorBinding.prototype.handleBroadcast=function(_8b6,arg){
SelectorBinding.prototype.handleBroadcast.call(this,_8b6,arg);
switch(_8b6){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(arg!=this._buttonBinding){
DataInputSelectorBinding.superclass.handleBroadcast.call(this,_8b6,arg);
}
break;
}
};
DataInputSelectorBinding.prototype._grabKeyboard=SelectorBinding.prototype._grabKeyboard;
DataInputSelectorBinding.prototype._releaseKeyboard=SelectorBinding.prototype._releaseKeyboard;
DataInputSelectorBinding.prototype._handleArrowKey=SelectorBinding.prototype._handleArrowKey;
DataInputSelectorBinding.prototype.focus=function(_8b8){
if(!this.isFocused){
DataInputSelectorBinding.superclass.focus.call(this,_8b8);
if(this.isFocused==true){
this._grabKeyboard();
}
}
};
DataInputSelectorBinding.prototype.blur=function(_8b9){
if(this.isFocused==true){
DataInputSelectorBinding.superclass.blur.call(this,_8b9);
this._releaseKeyboard();
if(this._popupBinding.isVisible){
this._popupBinding.hide();
}
}
};
DataInputSelectorBinding.prototype._fitMenuToSelector=function(){
var _8ba=this.bindingElement.offsetWidth+"px";
var _8bb=this._popupBinding.bindingElement;
if(Client.isMozilla){
_8bb.style.minWidth=_8ba;
}else{
_8bb.style.width=_8ba;
}
};
DataInputSelectorBinding.prototype._restoreSelection=function(){
if(!this._isUpToDate){
this._attachSelections();
}
var _8bc=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
var _8bd=this.getValue();
var _8be=null;
_8bc.each(function(item){
if(item.getLabel()==_8bd){
_8be=item;
}
});
if(_8be){
_8be.focus();
}
};
DataInputSelectorBinding.prototype.select=function(item,_8c1){
if(item!=this._selectedItemBinding){
this._selectedItemBinding=item;
this.setValue(item.selectionValue);
if(!_8c1){
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
var _8c2=ToolBarButtonBinding.newInstance(this.bindingDocument);
_8c2.setImage("${icon:popup}");
this.addFirst(_8c2);
_8c2.attach();
var self=this;
_8c2.oncommand=function(){
self._isButtonClicked=true;
setTimeout(function(){
self._isButtonClicked=false;
},1000);
var _8c4=self.getProperty("handle");
var _8c5=ViewDefinitions[_8c4];
if(_8c5 instanceof DialogViewDefinition){
_8c5.handler={handleDialogResponse:function(_8c6,_8c7){
self._isButtonClicked=false;
if(_8c6==Dialog.RESPONSE_ACCEPT){
self.logger.debug("Usecase scenario was hardcoded into DataInputDialogBinding#buildButton");
var _8c8=_8c7.getFirst();
self.setValue(_8c8);
self.validate(true);
}
self.focus();
}};
_8c5.argument.selectedResult=self.getValue();
StageBinding.presentViewDefinition(_8c5);
}else{
throw "Definition was either undefine or of a non-dialog type.";
}
};
DOMEvents.addEventListener(_8c2.getBindingElement(),DOMEvents.MOUSEDOWN,{handleEvent:function(e){
self._isButtonClicked=true;
}});
this._dialogButtonBinding=_8c2;
};
DataInputDialogBinding.prototype.oncommand=function(){
var _8ca=this._dialogButtonBinding;
if(_8ca!=null){
_8ca.oncommand();
}
};
DataInputDialogBinding.prototype.validate=function(arg){
var _8cc=true;
if(this._isButtonClicked==true){
this._isButtonClicked=false;
}else{
_8cc=DataInputDialogBinding.superclass.validate.call(this,arg);
}
return _8cc;
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
var _8cd=this.getProperty("label");
var _8ce=this.getProperty("tooltip");
this._buttonBinding=this.add(ClickButtonBinding.newInstance(this.bindingDocument));
if(_8cd!=null){
if(this.getProperty("handle")!=null||this.getProperty("url")!=null){
this._buttonBinding.setLabel(_8cd+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}else{
this._buttonBinding.setLabel(_8cd);
}
}
if(this.imageProfile){
this._buttonBinding.imageProfile=this.imageProfile;
}
if(_8ce!=null){
this._buttonBinding.setToolTip(_8ce);
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
DataDialogBinding.prototype.handleAction=function(_8d0){
DataDialogBinding.superclass.handleAction.call(this,_8d0);
var _8d1=_8d0.target;
var self=this;
switch(_8d0.type){
case ButtonBinding.ACTION_COMMAND:
if(this._handler==null){
this._handler={handleDialogResponse:function(_8d3,_8d4){
if(_8d3==Dialog.RESPONSE_ACCEPT){
if(_8d4 instanceof DataBindingMap){
self._map=_8d4;
}else{
throw "Invalid dialog result";
}
}
}};
}
if(_8d1==this._buttonBinding){
_8d0.consume();
this.focus();
this.fireCommand();
}
break;
}
};
DataDialogBinding.prototype.handleBroadcast=function(_8d5,arg){
DataDialogBinding.superclass.handleBroadcast.call(this,_8d5,arg);
switch(_8d5){
case BroadcastMessages.KEY_SPACE:
this.fireCommand();
break;
}
};
DataDialogBinding.prototype.fireCommand=function(def){
this.dispatchAction(this.constructor.ACTION_COMMAND);
var _8d8=this.getProperty("handle");
var url=this.getURL();
var _8da=null;
if(_8d8!=null||def!=null){
if(_8d8!=null){
_8da=ViewDefinitions[_8d8];
}else{
_8da=def;
}
if(_8da instanceof DialogViewDefinition){
_8da.handler=this._handler;
if(this._map!=null){
_8da.argument=this._map;
}
StageBinding.presentViewDefinition(_8da);
}
}else{
if(url!=null){
_8da=Dialog.invokeModal(url,this._handler,this._map);
}
}
if(_8da!=null){
this._dialogViewHandle=_8da.handle;
this._releaseKeyboard();
}
};
DataDialogBinding.prototype.setLabel=function(_8db){
this.setProperty("label",_8db);
if(this.isAttached){
this._buttonBinding.setLabel(_8db+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}
};
DataDialogBinding.prototype.setImage=function(_8dc){
this.setProperty("image",_8dc);
if(this.imageProfile!=null){
this.imageProfile.setDefaultImage(_8dc);
if(this._buttonBinding!=null){
this._buttonBinding.imageProfile=this.imageProfile;
this._buttonBinding.setImage(this._buttonBinding.imageProfile.getDefaultImage());
}
}
};
DataDialogBinding.prototype.setToolTip=function(_8dd){
this.setProperty("tooltip",_8dd);
if(this.isAttached){
this._buttonBinding.setToolTip(_8dd);
}
};
DataDialogBinding.prototype.setHandle=function(_8de){
this.setProperty("handle",_8de);
};
DataDialogBinding.prototype.setURL=function(url){
this.setProperty("url",url);
};
DataDialogBinding.prototype.getURL=function(){
return this.getProperty("url");
};
DataDialogBinding.prototype.setHandler=function(_8e0){
this._handler=_8e0;
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
DataDialogBinding.newInstance=function(_8e2){
var _8e3=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_8e2);
return UserInterface.registerBinding(_8e3,DataDialogBinding);
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
this._handler={handleDialogResponse:function(_8e5,_8e6){
if(_8e5==Dialog.RESPONSE_ACCEPT){
self._onDialogAccept(_8e6);
}else{
self._onDialogCancel();
}
}};
};
PostBackDataDialogBinding.prototype._onDialogAccept=function(_8e7){
_8e7=new String(_8e7);
this.dirty();
this.setValue(encodeURIComponent(_8e7));
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
var _8eb=this.getValue();
if(_8eb==null){
_8eb="";
}
this.shadowTree.dotnetinput.value=_8eb;
};
PostBackDataDialogBinding.prototype.setValue=function(_8ec){
this.setProperty("value",_8ec);
};
PostBackDataDialogBinding.prototype.getValue=function(){
return this.getProperty("value");
};
PostBackDataDialogBinding.prototype.getResult=function(){
return null;
};
PostBackDataDialogBinding.prototype.setResult=function(_8ed){
};
PostBackDataDialogBinding.newInstance=function(_8ee){
var _8ef=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_8ee);
return UserInterface.registerBinding(_8ef,PostBackDataDialogBinding);
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
var _8f0=this.getProperty("dialoglabel");
var _8f1=this.getProperty("providersearch");
var key=this.getProperty("providerkey");
var _8f3=this.getProperty("handle");
if(_8f3!=null){
var def=ViewDefinition.clone(_8f3,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_8f0!=null){
if(def.argument==null){
def.argument={};
}
def.argument.label=_8f0;
}
if(_8f1!=null){
if(def.argument==null){
def.argument={};
}
if(def.argument.nodes==null){
def.argument.nodes=[];
}
def.argument.nodes[0].search=_8f1;
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
ViewDefinitionPostBackDataDialogBinding.newInstance=function(_8f5){
var _8f6=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_8f5);
return UserInterface.registerBinding(_8f6,ViewDefinitionPostBackDataDialogBinding);
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
this.propertyMethodMap["value"]=function(_8f8){
self._datathing.setValue(_8f8);
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
var _8fb=self.getValue();
if(_8fb==""||_8fb==null){
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
var _8fc=this.getProperty("value");
var _8fd=this.getProperty("selectorlabel");
if(_8fd==null){
_8fd=NullPostBackDataDialogBinding.LABEL_DEFAULT;
}
var list=new List();
list.add(new SelectorBindingSelection(NullPostBackDataDialogBinding.LABEL_NULL,NullPostBackDataDialogBinding.VALUE_NULL,_8fc==null));
list.add(new SelectorBindingSelection(_8fd+LabelBinding.DIALOG_INDECATOR_SUFFIX,NullPostBackDataDialogBinding.VALUE_SELECTED,_8fc!=null,new ImageProfile({image:"${icon:popup}"})));
this._selector.master=this;
this._selector.attach();
this._selector.populateFromList(list);
var _8fc=this.getValue();
if(_8fc==""||_8fc==null){
this._selector.setLabel(NullPostBackDataDialogBinding.LABEL_NULL);
}else{
this._selector.setLabel(this.getLabel());
}
};
NullPostBackDataDialogBinding.prototype.handleAction=function(_8ff){
NullPostBackDataDialogBinding.superclass.handleAction.call(this,_8ff);
switch(_8ff.type){
case PageBinding.ACTION_DOPOSTBACK:
if(_8ff.target==this._datathing){
var _900=this.getProperty("label");
this._selector.setLabel("");
this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
var self=this;
setTimeout(function(){
if(self.getProperty("label")==_900){
self._selector.setLabel(_900);
}
},500);
_8ff.consume();
}
break;
}
};
NullPostBackDataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
NullPostBackDataDialogBinding.prototype.setLabel=function(_902){
this.setProperty("label",_902);
if(this._selector!=null){
this._selector.setLabel(_902);
}
};
NullPostBackDataDialogBinding.prototype.getValue=function(){
return this._datathing.getValue();
};
NullPostBackDataDialogBinding.prototype.setValue=function(_903){
this._datathing.setValue(_903);
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
NullPostBackDataDialogSelectorBinding.prototype.select=function(_904,_905){
if(NullPostBackDataDialogSelectorBinding.superclass.select.call(this,_904,_905)){
this._buttonBinding.setImage(null);
this._updateImageLayout();
if(this._selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
if(this.master.getValue()!=null){
}
}
}
};
NullPostBackDataDialogSelectorBinding.prototype.setLabel=function(_906){
this._buttonBinding.setLabel(_906);
};
NullPostBackDataDialogSelectorBinding.prototype.setToolTip=function(_907){
this._buttonBinding.setToolTip(_907);
};
NullPostBackDataDialogSelectorBinding.prototype.handleAction=function(_908){
NullPostBackDataDialogSelectorBinding.superclass.handleAction.call(this,_908);
switch(_908.type){
case MenuItemBinding.ACTION_COMMAND:
var _909=_908.target;
var _90a=this.master;
if(_909.selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
this.setLabel(_909.getLabel());
setTimeout(function(){
_90a.action();
},0);
}else{
this.master.setValue("");
}
_90a.dirty();
break;
}
};
NullPostBackDataDialogSelectorBinding.prototype.manifest=function(){
};
NullPostBackDataDialogSelectorBinding.newInstance=function(_90b){
var _90c=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_90b);
return UserInterface.registerBinding(_90c,NullPostBackDataDialogSelectorBinding);
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
var _90d=this._dataDialogBinding;
if(_90d!=null){
DOMEvents.addEventListener(this.shadowTree.box,DOMEvents.DOUBLECLICK,{handleEvent:function(){
_90d.fireCommand();
}});
}
};
MultiSelectorBinding.prototype._buildDOMContent=function(){
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
this.bindingElement.appendChild(this.shadowTree.box);
};
MultiSelectorBinding.prototype._parseDOMProperties=function(){
var _90e=this.getProperty("editable");
var _90f=this.getProperty("selectable");
var _910=this.getProperty("display");
if(_90e!=false){
this._buildEditorButton();
}else{
this.isEditable=false;
}
if(_90f){
this.isSelectable=true;
this._selectionMap=new Map();
}
if(_910){
this._display=_910;
}
};
MultiSelectorBinding.prototype._buildEditorButton=function(){
if(this.isEditable){
var _911=MultiSelectorDataDialogBinding.newInstance(this.bindingDocument);
_911.selections=this.selections;
this.add(_911);
_911.attach();
this._dataDialogBinding=_911;
this.shadowTree.datadialog=_911;
}
};
MultiSelectorBinding.prototype.populateFromList=function(list){
list.reset();
var _913=false;
this.shadowTree.box.innerHTML="";
while(list.hasNext()){
var _914=list.getNext();
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_913=_914.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_913=_914.isSelected!=true;
break;
}
if(_913){
this.shadowTree.box.appendChild(this._getElementForSelection(_914));
}
}
this.selections=list;
if(this._dataDialogBinding){
this._dataDialogBinding.selections=this.selections;
}
};
MultiSelectorBinding.prototype.cumulateFromList=function(list,_916){
var box=this.shadowTree.box;
var _918=false;
if(list.hasEntries()){
list.reverse().reset();
while(list.hasNext()){
var _919=list.getNext();
if(_916){
_919.isSelected=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
_918=true;
}else{
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_918=_919.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_918=_919.isSelected!=true;
break;
}
}
if(_918){
var _91a=this._getElementForSelection(_919);
box.insertBefore(_91a,box.firstChild);
CSSUtil.attachClassName(_91a,"selected");
this._selectionMap.set(_919.value,_91a);
}
}
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
};
MultiSelectorBinding.prototype._getElementForSelection=function(_91b){
var _91c=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument);
_91c.appendChild(this.bindingDocument.createTextNode(_91b.label));
_91c.setAttribute("label",_91b.label);
_91c.setAttribute("value",_91b.value);
return _91c;
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
var _91e=DOMEvents.getTarget(e);
var _91f=DOMUtil.getLocalName(_91e);
if(_91f=="div"){
this._handleMouseDown(_91e);
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
break;
}
};
MultiSelectorBinding.prototype._handleMouseDown=function(_920){
if(Keyboard.isShiftPressed&&this._lastSelectedElement){
var _921=this._getElements();
var _922=_920.getAttribute("value");
var _923=this._lastSelectedElement.getAttribute("value");
var _924=false;
while(_921.hasNext()){
var el=_921.getNext();
switch(el.getAttribute("value")){
case _922:
case _923:
_924=!_924;
break;
}
if(_924){
this._hilite(el);
}else{
this._unhilite(el);
}
this._hilite(this._lastSelectedElement);
this._hilite(_920);
}
}else{
if(Keyboard.isControlPressed&&this._isHilited(_920)){
this._unhilite(_920);
}else{
this._hilite(_920);
}
if(!Keyboard.isControlPressed){
var self=this;
this._getElements().each(function(el){
if(el!=_920){
self._unhilite(el);
}
});
}
}
this._lastSelectedElement=_920;
};
MultiSelectorBinding.prototype._hilite=function(_928){
var _929=_928.getAttribute("value");
if(!this._selectionMap.has(_929)){
CSSUtil.attachClassName(_928,"selected");
this._selectionMap.set(_929,_928);
}
};
MultiSelectorBinding.prototype._unhilite=function(_92a){
var _92b=_92a.getAttribute("value");
if(this._selectionMap.has(_92b)){
CSSUtil.detachClassName(_92a,"selected");
this._selectionMap.del(_92b);
}
};
MultiSelectorBinding.prototype._isHilited=function(_92c){
return CSSUtil.hasClassName(_92c,"selected");
};
MultiSelectorBinding.prototype.handleAction=function(_92d){
MultiSelectorBinding.superclass.handleAction.call(this,_92d);
var _92e=_92d.target;
switch(_92d.type){
case DataDialogBinding.ACTION_COMMAND:
if(_92e==this._dataDialogBinding){
if(!this.isFocused){
this.focus();
}
this.dispatchAction(MultiSelectorBinding.ACTION_COMMAND);
_92d.consume();
}
break;
case MultiSelectorDataDialogBinding.ACTION_RESULT:
this.populateFromList(_92e.result);
this.dirty();
_92e.result=null;
_92d.consume();
break;
}
};
MultiSelectorBinding.prototype.extractSelected=function(){
var _92f=null;
if(this.isSelectable){
_92f=new List();
if(this._selectionMap&&this._selectionMap.hasEntries()){
var self=this;
this._getElements().each(function(_931){
if(self._isHilited(_931)){
_931.parentNode.removeChild(_931);
_92f.add(new SelectorBindingSelection(_931.getAttribute("label"),_931.getAttribute("value"),true));
}
});
this._selectionMap=new Map();
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
return _92f;
};
MultiSelectorBinding.prototype.reposition=function(isUp){
var _933=this._getElements();
if(!isUp){
_933.reverse();
}
var _934=true;
while(_934&&_933.hasNext()){
var _935=_933.getNext();
if(this._isHilited(_935)){
switch(isUp){
case true:
if(_935.previousSibling){
_935.parentNode.insertBefore(_935,_935.previousSibling);
}else{
_934=false;
}
break;
case false:
if(_935.nextSibling){
_935.parentNode.insertBefore(_935,_935.nextSibling.nextSibling);
}else{
_934=false;
}
break;
}
}
}
};
MultiSelectorBinding.prototype.toSelectionList=function(){
var _936=new List();
var _937=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
var self=this;
this._getElements().each(function(_939){
var _93a=new SelectorBindingSelection(_939.getAttribute("label"),_939.getAttribute("value"),_937);
_93a.isHighlighted=self._isHilited(_939);
_936.add(_93a);
});
return _936;
};
MultiSelectorBinding.prototype._getElements=function(){
return new List(DOMUtil.getElementsByTagName(this.shadowTree.box,"div"));
};
MultiSelectorBinding.prototype._getSelectionsList=SelectorBinding.prototype._getSelectionsList;
MultiSelectorBinding.prototype.validate=function(){
return true;
};
MultiSelectorBinding.prototype.manifest=function(){
var _93b=new List(DOMUtil.getElementsByTagName(this.bindingElement,"input"));
if(_93b.hasEntries()){
_93b.each(function(_93c){
_93c.parentNode.removeChild(_93c);
});
}
this.selections.reset();
while(this.selections.hasNext()){
var _93d=this.selections.getNext();
if(_93d.isSelected){
var _93e=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_93e.name=this._name;
_93e.value=_93d.value;
this.bindingElement.appendChild(_93e);
}
}
};
MultiSelectorBinding.prototype.getValue=function(){
return "HEJ!";
};
MultiSelectorBinding.prototype.setValue=function(_93f){
alert(_93f);
};
MultiSelectorBinding.prototype.getResult=function(){
alert("TODO: MultiSelectorBinding#getResult");
return new Array();
};
MultiSelectorBinding.prototype.setResult=function(_940){
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
var _941={label:DataBinding.getAssociatedLabel(this),value:decodeURIComponent(this.getValue()),configuration:{"formattingconfiguration":this.getProperty("formattingconfiguration"),"elementclassconfiguration":this.getProperty("elementclassconfiguration"),"configurationstylesheet":this.getProperty("configurationstylesheet"),"presentationstylesheet":this.getProperty("presentationstylesheet"),"embedablefieldstypenames":this.getProperty("embedablefieldstypenames")}};
var _942=ViewDefinitions["Composite.Management.VisualEditorDialog"];
_942.handler=this._handler;
_942.argument=_941;
StageBinding.presentViewDefinition(_942);
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
var _943={label:DataBinding.getAssociatedLabel(this),selections:this.selections};
var self=this;
var _945={handleDialogResponse:function(_946,_947){
if(_946==Dialog.RESPONSE_ACCEPT){
self.result=_947;
self.dispatchAction(MultiSelectorDataDialogBinding.ACTION_RESULT);
}
}};
var _948=ViewDefinitions[this._dialogViewHandle];
_948.handler=_945;
_948.argument=_943;
StageBinding.presentViewDefinition(_948);
};
MultiSelectorDataDialogBinding.newInstance=function(_949){
var _94a=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_949);
return UserInterface.registerBinding(_94a,MultiSelectorDataDialogBinding);
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
LazyBindingBinding.wakeUp=function(_94b){
var id=_94b.bindingElement.id+LazyBindingBinding.ID_APPENDIX;
var _94d=_94b.bindingDocument.getElementById(id);
if(_94d!=null){
var _94e=UserInterface.getBinding(_94d);
_94e.setResult(true);
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
var _950=this.bindingDocument.getElementById(id);
if(_950!=null){
var _951=UserInterface.getBinding(_950);
if(_951&&!_951.isAttached){
_951.isLazy=true;
}else{
_950.setAttribute("lazy",true);
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
LazyBindingBinding.prototype.setResult=function(_952){
this._isLazy=_952;
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
var _954=this.getProperty("stateprovider");
var _955=this.getProperty("handle");
if(_954!=null&&_955!=null){
url=url.replace("${stateprovider}",_954).replace("${handle}",_955);
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
EditorDataBinding.prototype._onPageInitialize=function(_956){
EditorDataBinding.superclass._onPageInitialize.call(this,_956);
if(this._pageBinding!=null){
Application.unlock(this);
this._coverBinding.hide();
}
};
EditorDataBinding.prototype.setName=DataBinding.prototype.setName;
EditorDataBinding.prototype.validate=function(){
return this._pageBinding.validateAllDataBindings();
};
EditorDataBinding.prototype.handleAction=function(_957){
EditorDataBinding.superclass.handleAction.call(this,_957);
switch(_957.type){
case Binding.ACTION_DIRTY:
if(_957.target!=this){
if(!this.isDirty){
this.dirty();
}
_957.consume();
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
EditorDataBinding.prototype.setValue=function(_958){
};
EditorDataBinding.prototype.getResult=function(){
return null;
};
EditorDataBinding.prototype.setResult=function(_959){
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
var _95d=true;
if(this.getProperty("required")){
var fake=this.getDescendantBindingByLocalName("datainput");
_95d=fake.getValue()!="";
}
if(!_95d&&this._isValid){
this._isValid=false;
this.dispatchAction(Binding.ACTION_INVALID);
}else{
if(_95d&&!this._isValid){
this.dispatchAction(Binding.ACTION_VALID);
}
}
return _95d;
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
var _961=this.bindingDocument.getElementById(RequestBinding.INPUT_ID);
if(_961!=null){
_961.value=Application.CONSOLE_ID;
}
};
RequestBinding.prototype.postback=function(_962){
_962=_962!=null?_962:EditorPageBinding.message;
this.shadowTree.dotnetinput.value=_962;
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
var _963=Templates.getTemplateElementText("fieldgroupmatrix.xml");
var _964=_963.replace("MARKUP",this.bindingElement.innerHTML);
try{
this.bindingElement.innerHTML=_964;
}
catch(exception1){
this.logger.error("Exeption in innerHTML!");
_964=_964.replace(/\&nbsp;/g,"");
this.bindingElement.innerHTML=_964;
}
var self=this;
var _966=DOMUtil.getElementsByTagName(this.bindingElement,"table").item(0);
new List(_966.rows).each(function(row){
new List(row.cells).each(function(cell){
self.shadowTree[cell.className]=cell;
});
});
};
FieldGroupBinding.prototype._buildDOMContent=function(){
var _969=this.getProperty("label");
if(_969){
this.setLabel(_969);
}else{
this.attachClassName(FieldGroupBinding.CLASSNAME_NOLABEL);
}
};
FieldGroupBinding.prototype.setLabel=function(_96a){
this.setProperty("label",_96a);
if(this.shadowTree.labelBinding==null){
var _96b=LabelBinding.newInstance(this.bindingDocument);
var cell=this.shadowTree[FieldGroupBinding.NORTH];
_96b.attachClassName("fieldgrouplabel");
cell.insertBefore(_96b.bindingElement,cell.getElementsByTagName("div").item(1));
_96b.attach();
this.shadowTree.labelBinding=_96b;
}
this.shadowTree.labelBinding.setLabel(Resolver.resolve(_96a));
};
FieldGroupBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
FieldGroupBinding.prototype.add=function(_96d){
this.shadowTree[FieldGroupBinding.CENTER].appendChild(_96d.bindingElement);
return _96d;
};
FieldGroupBinding.prototype.addFirst=function(_96e){
var _96f=this.shadowTree[FieldGroupBinding.CENTER];
_96f.insertBefore(_96e.bindingElement,_96f.firstChild);
return _96e;
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
var _970=this.getProperty("relation");
if(_970!=null){
this.bindingRelation=_970;
this.subscribe(BroadcastMessages.BINDING_RELATE);
this.hide();
}
};
FieldBinding.prototype.handleBroadcast=function(_971,arg){
FieldBinding.superclass.handleBroadcast.call(this,_971,arg);
switch(_971){
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
FieldBinding.newInstance=function(_973){
var _974=DOMUtil.createElementNS(Constants.NS_UI,"ui:field",_973);
return UserInterface.registerBinding(_974,FieldBinding);
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
var _975=this.getDescendantBindingByLocalName("fieldgroup");
if(_975!=null){
_975.attachClassName(FieldGroupBinding.CLASSNAME_FIRST);
}
};
FieldsBinding.prototype.onBindingDispose=function(){
FieldsBinding.superclass.onBindingDispose.call(this);
if(this._invalidCount>0){
this.dispatchAction(Binding.ACTION_VALID);
}
};
FieldsBinding.prototype.validate=function(){
var _976=true;
var _977=this.getDescendantBindingsByLocalName("*");
while(_977.hasNext()){
var _978=_977.getNext();
if(Interfaces.isImplemented(IData,_978)){
var _979=_978.validate();
if(_976&&!_979){
_976=false;
}
}
}
return _976;
};
FieldsBinding.prototype.handleAction=function(_97a){
FieldsBinding.superclass.handleAction.call(this,_97a);
var _97b=_97a.target;
if(_97b!=this){
switch(_97a.type){
case Binding.ACTION_INVALID:
var _97c=DataBinding.getAssociatedLabel(_97b);
if(_97c){
this._invalidFieldLabels.set(_97b.key,_97c);
}
if(_97b.error){
if(!_97b.isInvalidBecauseRequired){
ErrorBinding.presentError({text:_97b.error},_97b);
}
}
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_INVALID);
}
this._invalidCount++;
_97a.consume();
break;
case Binding.ACTION_VALID:
if(this._invalidFieldLabels.has(_97b.key)){
this._invalidFieldLabels.del(_97b.key);
}
this._invalidCount--;
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_VALID);
}
_97a.consume();
break;
}
}
};
FieldsBinding.prototype.getInvalidLabels=function(){
var _97d=null;
if(this._invalidFieldLabels.hasEntries()){
_97d=this._invalidFieldLabels.toList();
}
return _97d;
};
FieldsBinding.newInstance=function(_97e){
var _97f=DOMUtil.createElementNS(Constants.NS_UI,"ui:fields",_97e);
return UserInterface.registerBinding(_97f,FieldsBinding);
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
var _980=this.getProperty("image");
if(_980){
this.setImage(_980);
}
var _981=this.getProperty("tooltip");
if(_981){
this.setToolTip(_981);
}
var _982=this.getProperty("label");
if(_982){
this.setLabel(_982);
}
};
FieldDescBinding.prototype.attachDOMEvents=function(){
this.addEventListener(DOMEvents.CLICK);
};
FieldDescBinding.prototype.handleEvent=function(e){
FieldDescBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.CLICK:
var _984=this.getAncestorBindingByLocalName("field");
if(_984){
var _985=true;
_984.getDescendantBindingsByLocalName("*").each(function(_986){
if(Interfaces.isImplemented(IData,_986)){
_986.focus();
_985=false;
}
return _985;
});
}
break;
}
};
FieldDescBinding.prototype.setLabel=function(_987){
this.setProperty("label",_987);
if(this.isAttached){
this.bindingElement.innerHTML=Resolver.resolve(_987);
}
};
FieldDescBinding.prototype.getLabel=function(){
var _988=this.getProperty("label");
if(!_988){
var node=this.bindingElement.firstChild;
if(node&&node.nodeType==Node.TEXT_NODE){
_988=node.data;
}
}
return _988;
};
FieldDescBinding.prototype.setImage=function(_98a){
this.setProperty("image",_98a);
if(this.isAttached){
throw "FieldDescBinding: Images not suppoerted!";
}
};
FieldDescBinding.prototype.setToolTip=function(_98b){
this.setProperty("tooltip",_98b);
if(this.isAttached){
this.bindingElement.title=_98b;
}
};
FieldDescBinding.newInstance=function(_98c){
var _98d=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddesc",_98c);
return UserInterface.registerBinding(_98d,FieldDescBinding);
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
FieldDataBinding.newInstance=function(_98e){
var _98f=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddata",_98e);
return UserInterface.registerBinding(_98f,FieldDataBinding);
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
var _990=this._fieldHelpPopupBinding;
if(_990){
_990.dispose();
}
};
FieldHelpBinding.prototype.buildPopupBinding=function(){
var _991=app.bindingMap.fieldhelpopupset;
var doc=_991.bindingDocument;
var _993=_991.add(PopupBinding.newInstance(doc));
var _994=_993.add(PopupBodyBinding.newInstance(doc));
_993.position=PopupBinding.POSITION_RIGHT;
_993.attachClassName("fieldhelppopup");
if(this.bindingElement.hasChildNodes()){
_994.bindingElement.innerHTML=this.bindingElement.innerHTML;
}else{
var _995=this.getProperty("label");
if(_995){
_994.bindingElement.innerHTML=Resolver.resolve(_995);
}
}
this.bindingElement.innerHTML="";
this._fieldHelpPopupBinding=_993;
};
FieldHelpBinding.prototype.buildPopupButton=function(){
var _996=this.getAncestorBindingByLocalName("field");
if(_996){
_996.attachClassName("fieldhelp");
var _997=ClickButtonBinding.newInstance(this.bindingDocument);
_997.attachClassName("fieldhelp");
_997.setImage(FieldHelpBinding.INDICATOR_IMAGE);
this.add(_997);
_997.attach();
var self=this;
_997.oncommand=function(){
self.attachPopupBinding();
};
_997.setPopup(this._fieldHelpPopupBinding);
this._fieldHelpButton=_997;
}
};
FieldHelpBinding.prototype.attachPopupBinding=function(){
var _999=this._fieldHelpPopupBinding;
if(_999&&!_999.isAttached){
_999.attachRecursive();
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
RadioDataGroupBinding.prototype.handleAction=function(_99b){
RadioDataGroupBinding.superclass.handleAction.call(this,_99b);
switch(_99b.type){
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
RadioDataGroupBinding.prototype.handleBroadcast=function(_99d,arg){
RadioDataGroupBinding.superclass.handleBroadcast.call(this,_99d,arg);
switch(_99d){
case BroadcastMessages.KEY_ARROW:
var _99f=null;
var next=null;
var _9a1=null;
switch(arg){
case KeyEventCodes.VK_DOWN:
case KeyEventCodes.VK_UP:
_9a1=this.getChildBindingsByLocalName("radio");
while(!_99f&&_9a1.hasNext()){
var _9a2=_9a1.getNext();
if(_9a2.getProperty("ischecked")){
_99f=_9a2;
}
}
break;
}
if(_99f){
switch(arg){
case KeyEventCodes.VK_DOWN:
next=_9a1.getFollowing(_99f);
while(next!=null&&next.isDisabled){
next=_9a1.getFollowing(next);
}
break;
case KeyEventCodes.VK_UP:
next=_9a1.getPreceding(_99f);
while(next!=null&&next.isDisabled){
next=_9a1.getPreceding(next);
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
RadioDataGroupBinding.prototype.focus=function(_9a3){
if(!this.isFocused){
DataBinding.prototype.focus.call(this);
if(this.isFocused){
if(!_9a3){
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
var _9a4=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_9a4.type="hidden";
_9a4.name=this._name;
this.bindingElement.appendChild(_9a4);
this.shadowTree.input=_9a4;
}
this.shadowTree.input.value=this.getValue();
}
};
RadioDataGroupBinding.prototype.getValue=function(){
var _9a5=null;
var _9a6=this.getChildBindingsByLocalName("radio");
while(!_9a5&&_9a6.hasNext()){
var _9a7=_9a6.getNext();
if(_9a7.isChecked){
_9a5=_9a7.getProperty("value");
}
}
return _9a5;
};
RadioDataGroupBinding.prototype.getResult=RadioDataGroupBinding.prototype.getValue;
RadioDataGroupBinding.prototype.setValue=function(_9a8){
};
RadioDataGroupBinding.prototype.setResult=function(_9a9){
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
this.propertyMethodMap["checked"]=function(_9aa){
if(_9aa!=this.isChecked){
this.setChecked(_9aa,true);
}
};
this.propertyMethodMap["checksum"]=function(){
var _9ab=this.getProperty("ischecked");
if(_9ab!=this.isChecked){
this.setChecked(_9ab,true);
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
var _9ac=this.getProperty("relate");
var _9ad=this.getProperty("oncommand");
if(_9ac){
this.bindingRelate=_9ac;
this.relate();
}
if(_9ad){
this.oncommand=function(){
Binding.evaluate(_9ad,this);
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
var _9af=this.getCallBackID();
this._buttonBinding.check=function(_9b0){
RadioButtonBinding.prototype.check.call(this,_9b0);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
};
this._buttonBinding.uncheck=function(_9b1){
RadioButtonBinding.prototype.uncheck.call(this,_9b1);
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
RadioDataBinding.prototype.setChecked=function(_9b2,_9b3){
this._buttonBinding.setChecked(_9b2,_9b3);
if(this.bindingRelate!=null){
this.relate();
}
this.setProperty("ischecked",_9b2);
};
RadioDataBinding.prototype.check=function(_9b4){
this.setChecked(true,_9b4);
};
RadioDataBinding.prototype.uncheck=function(_9b5){
this.setChecked(false,_9b5);
};
RadioDataBinding.prototype.setDisabled=function(_9b6){
if(_9b6!=this.isDisabled){
this.isDisabled=_9b6;
this._buttonBinding.setDisabled(_9b6);
if(_9b6){
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
var _9b8=DOMEvents.getTarget(e);
switch(_9b8){
case this.shadowTree.labelText:
if(!this.isChecked&&!this.isDisabled){
this.check();
}
break;
}
}
};
RadioDataBinding.prototype._buildLabelText=function(){
var _9b9=this.getProperty("label");
if(_9b9){
this.shadowTree.labelText=DOMUtil.createElementNS(Constants.NS_UI,"ui:datalabeltext",this.bindingDocument);
this.shadowTree.labelText.appendChild(this.bindingDocument.createTextNode(Resolver.resolve(_9b9)));
DOMEvents.addEventListener(this.shadowTree.labelText,DOMEvents.CLICK,this);
this.bindingElement.appendChild(this.shadowTree.labelText);
}
};
RadioDataBinding.prototype.setLabel=function(_9ba){
if(this.shadowTree.labelText!=null){
this.shadowTree.labelText.firstChild.data=_9ba;
}
this.setProperty("label",_9ba);
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
this.propertyMethodMap["checked"]=function(_9bb){
if(_9bb!=this.isChecked){
this.setChecked(_9bb,true);
}
};
this.propertyMethodMap["checksum"]=function(){
var _9bc=this.getProperty("ischecked");
if(_9bc!=this.isChecked){
this.setChecked(_9bc,true);
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
var _9be=DOMEvents.getTarget(e);
switch(_9be){
case this.shadowTree.labelText:
this.setChecked(!this.isChecked);
break;
}
}
};
CheckBoxBinding.prototype.relate=RadioDataBinding.prototype.relate;
CheckBoxBinding.prototype.handleBroadcast=function(_9bf,arg){
CheckBoxBinding.superclass.handleBroadcast.call(this,_9bf,arg);
switch(_9bf){
case BroadcastMessages.KEY_SPACE:
this.setChecked(!this.isChecked);
break;
}
};
CheckBoxBinding.prototype._buildButtonBinding=function(){
this._buttonBinding=this.add(CheckButtonBinding.newInstance(this.bindingDocument));
var self=this;
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_9c2){
_9c2.consume();
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
var _9c4=this.getCallBackID();
this._buttonBinding.check=function(_9c5){
ButtonBinding.prototype.check.call(this,_9c5);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
if(!_9c5){
self.focus();
}
};
this._buttonBinding.uncheck=function(_9c6){
ButtonBinding.prototype.uncheck.call(this,_9c6);
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
if(_9c4!=null){
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
var _9c7=true;
var _9c8=this.bindingElement.parentNode;
if(_9c8){
var _9c9=UserInterface.getBinding(_9c8);
if(_9c9&&_9c9 instanceof CheckBoxGroupBinding){
if(_9c9.isRequired){
if(_9c9.isValid){
_9c7=_9c9.validate();
}else{
_9c7=false;
}
}
}
}
return _9c7;
};
CheckBoxBinding.prototype.manifest=function(){
if(this.isAttached){
switch(this.isChecked){
case true:
if(!this.shadowTree.input){
var _9ca=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_9ca.type="hidden";
_9ca.name=this._name;
_9ca.style.display="none";
this.bindingElement.appendChild(_9ca);
this.shadowTree.input=_9ca;
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
var _9cb=null;
var _9cc=this.getProperty("value");
if(this.isChecked){
_9cb=_9cc?_9cc:"on";
}
return _9cb;
};
CheckBoxBinding.prototype.setValue=function(_9cd){
if(_9cd==this.getValue()||_9cd=="on"){
this.check(true);
}else{
if(_9cd!="on"){
this.setPropety("value",_9cd);
}
}
};
CheckBoxBinding.prototype.getResult=function(){
var _9ce=false;
if(this.isChecked){
_9ce=this._result!=null?this._result:true;
}
return _9ce;
};
CheckBoxBinding.prototype.setResult=function(_9cf){
if(typeof _9cf=="boolean"){
this.setChecked(_9cf,true);
}else{
this._result=_9cf;
}
};
CheckBoxBinding.newInstance=function(_9d0){
var _9d1=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbox",_9d0);
return UserInterface.registerBinding(_9d1,CheckBoxBinding);
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
var _9d2=true;
if(this.isRequired){
var _9d3=this.getDescendantBindingsByLocalName("checkbox");
if(_9d3.hasEntries()){
_9d2=false;
while(_9d3.hasNext()&&!_9d2){
if(_9d3.getNext().isChecked){
_9d2=true;
}
}
}
if(_9d2==false){
this._showWarning(true);
this.dispatchAction(Binding.ACTION_INVALID);
this.addActionListener(CheckBoxBinding.ACTION_COMMAND);
}
}
return _9d2;
};
CheckBoxGroupBinding.prototype._showWarning=function(_9d4){
if(_9d4){
if(!this._labelBinding){
var _9d5=LabelBinding.newInstance(this.bindingDocument);
_9d5.attachClassName("invalid");
_9d5.setImage("${icon:error}");
_9d5.setLabel("Selection required");
this._labelBinding=this.addFirst(_9d5);
this._labelBinding.attach();
}
}else{
if(this._labelBinding){
this._labelBinding.dispose();
this._labelBinding=null;
}
}
};
CheckBoxGroupBinding.prototype.handleAction=function(_9d6){
CheckBoxGroupBinding.superclass.handleAction.call(this,_9d6);
switch(_9d6.type){
case CheckBoxBinding.ACTION_COMMAND:
this._showWarning(false);
this.dispatchAction(Binding.ACTION_VALID);
this.removeActionListener(CheckBoxBinding.ACTION_COMMAND);
break;
}
};
CheckBoxGroupBinding.newInstance=function(_9d7){
var _9d8=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkboxgroup",_9d7);
return UserInterface.registerBinding(_9d8,CheckBoxGroupBinding);
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
var _9d9=DialogControlBinding.newInstance(this.bindingDocument);
_9d9.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_9d9);
this._controlGroupBinding.attachRecursive();
var _9da=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloonspeak",this.bindingDocument);
this.bindingElement.appendChild(_9da);
var _9db=this.getLabel();
if(_9db!=null){
this.setLabel(_9db);
}
};
BalloonBinding.prototype.onBindingDispose=function(){
BalloonBinding.superclass.onBindingDispose.call(this);
if(this._updateInterval){
window.clearInterval(this._updateInterval);
this._updateInterval=null;
}
var _9dc=this._snapTargetBinding;
if(Binding.exists(_9dc)==true){
_9dc.removeActionListener(Binding.ACTION_BLURRED,this);
_9dc.removeActionListener(Binding.ACTION_VALID,this);
}
};
BalloonBinding.prototype.snapTo=function(_9dd){
if(Interfaces.isImplemented(IData,_9dd)){
this._snapTargetBinding=_9dd;
var _9de=_9dd.dispatchAction(BalloonBinding.ACTION_INITIALIZE);
if(_9de&&_9de.isConsumed){
this._environmentBinding=_9de.listener;
}
if(this._environmentBinding){
_9dd.addActionListener(Binding.ACTION_BLURRED,this);
_9dd.addActionListener(Binding.ACTION_VALID,this);
this.subscribe(BroadcastMessages.VIEW_CLOSED);
var self=this;
this._updateInterval=window.setInterval(function(){
if(Binding.exists(_9dd)==true){
self._updatePosition();
}else{
self.dispose();
}
},BalloonBinding.TIMEOUT);
_9dd.dispatchAction(BalloonBinding.ACTION_SNAP);
}else{
throw "No environment fit for balloons!";
}
}
};
BalloonBinding.prototype._updatePosition=function(){
var _9e0=this._snapTargetBinding;
var _9e1=this._environmentBinding;
var root=UserInterface.getBinding(_9e0.bindingDocument.body);
if(Binding.exists(_9e0)&&Binding.exists(_9e1)){
if(!root.isActivated){
if(this.isVisible==true){
this.hide();
}
}else{
if(_9e0.isAttached&&_9e1.isAttached){
var _9e3=_9e0.boxObject.getUniversalPosition();
var _9e4=_9e1.boxObject.getUniversalPosition();
_9e4.y+=_9e1.bindingElement.scrollTop;
_9e4.x+=_9e1.bindingElement.scrollLeft;
var tDim=_9e0.boxObject.getDimension();
var eDim=_9e1.boxObject.getDimension();
var _9e7=false;
if(_9e3.y+tDim.h<_9e4.y){
_9e7=true;
}else{
if(_9e3.x+tDim.w<_9e4.x){
_9e7=true;
}else{
if(_9e3.y>_9e4.y+eDim.h){
_9e7=true;
}else{
if(_9e3.x>_9e4.x+eDim.w){
_9e7=true;
}
}
}
}
if(!_9e7){
this._setComputedPosition(_9e3,_9e4,tDim,eDim);
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
BalloonBinding.prototype._setComputedPosition=function(_9e8,_9e9,tDim,eDim){
var wDim=WindowManager.getWindowDimensions();
var bDim=this._getDimension();
var _9ee=_9e8;
var _9ef=false;
if(_9e8.x+tDim.w+bDim.w+BalloonBinding.OFFSET_X>=wDim.w){
_9ef=true;
}else{
if(_9e8.x+tDim.w>=_9e9.x+eDim.w){
_9ef=true;
}
}
if(_9ef){
_9ee.x-=(bDim.w+BalloonBinding.OFFSET_X);
this.attachClassName(BalloonBinding.CLASSNAME_LEFT);
}else{
_9ee.x+=tDim.w+BalloonBinding.OFFSET_X;
this.detachClassName(BalloonBinding.CLASSNAME_LEFT);
}
_9ee.y-=(bDim.h);
_9ee.y+=BalloonBinding.OFFSET_Y;
this._setPosition(_9ee);
};
BalloonBinding.prototype.handleBroadcast=function(_9f0,arg){
BalloonBinding.superclass.handleBroadcast.call(this,_9f0,arg);
switch(_9f0){
case BroadcastMessages.VIEW_CLOSED:
if(this._isAssociatedView(arg)==true){
this.dispose();
}
break;
}
};
BalloonBinding.prototype._isAssociatedView=function(_9f2){
var _9f3=false;
if(this._snapTargetBinding){
var view=this._snapTargetBinding.getAncestorBindingByType(ViewBinding,true);
if(view&&view.getHandle()==_9f2){
_9f3=true;
}
}
return _9f3;
};
BalloonBinding.prototype._setPosition=function(_9f5){
var _9f6=false;
var pos=this.boxObject.getLocalPosition();
if(this._point!=null){
if(pos.x!=this._point.x||pos.y!=this._point.y){
_9f6=true;
}
}
if(!_9f6){
this.bindingElement.style.left=_9f5.x+"px";
this.bindingElement.style.top=_9f5.y+"px";
this._point=_9f5;
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
BalloonBinding.prototype.handleAction=function(_9f8){
BalloonBinding.superclass.handleAction.call(this,_9f8);
var _9f9=_9f8.target;
switch(_9f8.type){
case Binding.ACTION_ACTIVATED:
if(this._snapTargetBinding){
this._snapTargetBinding.dispatchAction(Binding.ACTION_ACTIVATED);
_9f8.consume();
}
case Binding.ACTION_BLURRED:
case Binding.ACTION_VALID:
if(_9f9==this._snapTargetBinding){
var self=this;
setTimeout(function(){
if(!Binding.exists(_9f9)){
self.dispose();
}else{
if(_9f9.validate()){
var _9fb=true;
if(_9f8.type==Binding.ACTION_BLURRED){
var root=_9f9.bindingDocument.body;
var bind=UserInterface.getBinding(root);
if(!root.isActivated){
_9fb=false;
}
}
if(_9fb){
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
BalloonBinding.prototype.setLabel=function(_9fe){
if(this.isAttached==true){
if(!this._isTableIndexed){
this._indexTable();
}
var _9ff=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloontext",this.bindingDocument);
var text=this.bindingDocument.createTextNode(_9fe);
_9ff.appendChild(text);
this.shadowTree[MatrixBinding.CENTER].appendChild(_9ff);
}
this.setProperty("label",_9fe);
};
BalloonBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
BalloonBinding.newInstance=function(_a01){
var _a02=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloon",_a01);
var _a03=UserInterface.registerBinding(_a02,BalloonBinding);
_a03.hide();
return _a03;
};
ErrorBinding.prototype=new Binding;
ErrorBinding.prototype.constructor=ErrorBinding;
ErrorBinding.superclass=Binding.prototype;
ErrorBinding.ACTION_INITIALIZE="error initialize";
ErrorBinding.presentError=function(_a04,_a05){
if(Interfaces.isImplemented(IData,_a05)==true){
var _a06,_a07=_a05.dispatchAction(ErrorBinding.ACTION_INITIALIZE);
if(_a07&&_a07.isConsumed){
switch(_a07.listener.constructor){
case StageBinding:
_a06=false;
break;
case StageDialogBinding:
_a06=true;
break;
}
}
var _a08=_a06?top.app.bindingMap.dialogballoonset:top.app.bindingMap.balloonset;
var _a09=_a08.add(BalloonBinding.newInstance(top.app.document));
_a09.setLabel(_a04.text);
_a09.snapTo(_a05);
_a09.attach();
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
var _a0a=this.bindingWindow.DataManager;
var text=this.getProperty("text");
var name=this.getProperty("targetname");
var _a0d=_a0a.getDataBinding(name);
if(_a0d){
ErrorBinding.presentError({text:text},_a0d);
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
FocusBinding.focusElement=function(_a0e){
var _a0f=true;
try{
_a0e.focus();
Application.focused(true);
}
catch(exception){
var _a10=UserInterface.getBinding(_a0e);
var _a11=SystemLogger.getLogger("FocusBinding.focusElement");
_a11.warn("Could not focus "+(_a10?_a10.toString():String(_a0e)));
_a0f=false;
}
return _a0f;
};
FocusBinding.focusedBinding=null;
FocusBinding.activeInstance=null;
FocusBinding.getCachedFocus=function(_a12){
var win=_a12.bindingWindow;
var id=_a12.bindingElement.id;
return {getBinding:function(){
var _a15=null;
try{
if(Binding.exists(_a12)){
_a15=win.bindingMap[id];
}
}
catch(exception){
}
return _a15;
}};
};
FocusBinding.navigateNext=function(_a16){
if(Binding.exists(FocusBinding.activeInstance)){
FocusBinding.activeInstance.focusNext(_a16);
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
var _a17=this.dispatchAction(FocusBinding.ACTION_ATTACHED);
if(_a17&&_a17.isConsumed){
if(_a17.listener.isStrongFocusManager){
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
FocusBinding.prototype.handleAction=function(_a18){
FocusBinding.superclass.handleAction.call(this,_a18);
var _a19=_a18.target;
var _a1a=null;
if(this._isFocusManager){
switch(_a18.type){
case FocusBinding.ACTION_ATTACHED:
if(_a19!=this){
this._isUpToDate=false;
}
_a18.consume();
break;
case FocusBinding.ACTION_UPDATE:
if(_a19!=this){
this._isUpToDate=false;
_a18.consume();
}
break;
case FocusBinding.ACTION_BLUR:
if(Application.isOperational){
_a1a=new FocusCrawler();
_a1a.mode=FocusCrawler.MODE_BLUR;
_a1a.crawl(_a19.bindingElement);
if(this._cachedFocus!=null){
this._cachedFocus=null;
}
}
_a18.consume();
break;
case FocusBinding.ACTION_FOCUS:
if(Application.isOperational&&_a19!=this){
_a1a=new FocusCrawler();
_a1a.mode=FocusCrawler.MODE_FOCUS;
_a1a.crawl(_a19.bindingElement);
}
_a18.consume();
break;
case Binding.ACTION_FOCUSED:
if(Interfaces.isImplemented(IFocusable,_a19)){
this.claimFocus();
this._onFocusableFocused(_a19);
}
_a18.consume();
break;
case Binding.ACTION_BLURRED:
if(Interfaces.isImplemented(IFocusable,_a19)){
this._onFocusableBlurred(_a19);
}
_a18.consume();
break;
}
}
};
FocusBinding.prototype.focusNext=function(_a1b){
var _a1c=null;
var list=this._getFocusableList();
if(list.reset().hasEntries()){
while(_a1c==null&&list.hasNext()){
var _a1e=list.getNext();
if(this._cachedFocus&&_a1e==this._cachedFocus.getBinding()){
_a1c=_a1e;
}
}
if(_a1c!=null){
if(_a1e.isFocused){
var next=_a1b?list.getPreceding(_a1c):list.getFollowing(_a1c);
if(!next){
next=_a1b?list.getLast():list.getFirst();
}
next.focus();
}else{
_a1c.focus();
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
var _a20=new FocusCrawler();
var list=new List();
_a20.mode=FocusCrawler.MODE_INDEX;
_a20.crawl(this.bindingElement,list);
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
var _a24=this._cachedFocus.getBinding();
if(_a24&&!_a24.isFocused){
_a24.focus();
}
}
};
FocusBinding.prototype._onFocusableFocused=function(_a25){
if(_a25!=FocusBinding.focusedBinding){
if(FocusBinding.focusedBinding!=null){
if(Binding.exists(FocusBinding.focusedBinding)){
FocusBinding.focusedBinding.blur();
}
}
FocusBinding.focusedBinding=_a25;
_a25.setProperty(FocusBinding.MARKER,true);
this._cachedFocus=FocusBinding.getCachedFocus(_a25);
}
};
FocusBinding.prototype._onFocusableBlurred=function(_a26){
_a26.deleteProperty(FocusBinding.MARKER);
if(_a26==FocusBinding.focusedBinding){
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
TabsButtonBinding.prototype.show=function(_a28){
this.bindingElement.style.left=_a28+"px";
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
TabsButtonBinding.prototype.registerHiddenTabBinding=function(_a29){
this.hiddenTabBindings.add(_a29);
};
TabsButtonBinding.prototype.fireCommand=function(){
if(this.isChecked&&!this.isPopulated){
this.hiddenTabBindings.reset();
while(this.hiddenTabBindings.hasNext()){
var _a2a=this.hiddenTabBindings.getNext();
var item=MenuItemBinding.newInstance(this.popupBinding.bindingDocument);
item.setLabel(_a2a.getLabel());
item.setImage(_a2a.getImage());
item.associatedTabBinding=_a2a;
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
TabsButtonBinding.prototype.handleAction=function(_a2d){
TabsButtonBinding.superclass.handleAction.call(this,_a2d);
switch(_a2d.type){
case PopupBinding.ACTION_HIDE:
this.popupBinding.removeActionListener(PopupBinding.ACTION_HIDE,this);
var _a2e=this.selectedTabBinding;
if(_a2e){
this.containingTabBoxBinding.moveToOrdinalPosition(_a2e,0);
this.containingTabBoxBinding.select(_a2e);
}
_a2d.consume();
break;
}
};
TabsButtonBinding.newInstance=function(_a2f){
var _a30=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_a2f);
_a30.setAttribute("type","checkbox");
_a30.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_a30.className="tabbutton";
return UserInterface.registerBinding(_a30,TabsButtonBinding);
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
var _a31=TabBoxBinding.currentActiveInstance;
if(_a31!=null&&Binding.exists(_a31)){
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
var _a32=this.getTabElements().getLength();
var _a33=this.getTabPanelElements().getLength();
if(!this._tabsElement||!this._tabPanelsElement){
throw new Error(this.toString()+" DOM subtree invalid.");
}else{
if(_a32!=_a33){
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
var _a34=this.getTabPanelElements();
while(_a34.hasNext()){
this._setupWarningSystem(UserInterface.getBinding(_a34.getNext()));
}
if(this.isEqualSize){
this.enforceEqualSize();
this.dispatchAction(PageBinding.ACTION_UNBLOCK_INIT);
}
this.dispatchAction(TabBoxBinding.ACTION_ATTACHED);
TabBoxBinding.superclass.onBindingInitialize.call(this);
};
TabBoxBinding.prototype.buildDOMContent=function(){
var _a35=DOMUtil.getOrdinalPosition(this._tabsElement);
var _a36=DOMUtil.getOrdinalPosition(this._tabPanelsElement);
var _a37=_a35>_a36?"tabsbelow":"tabsontop";
this.attachClassName(_a37);
};
TabBoxBinding.prototype._TEMPNAME=function(){
var tabs=this.getTabElements();
var _a39=this.getTabPanelElements();
var _a3a=null;
var _a3b=this.getProperty("selectedindex");
if(_a3b!=null){
if(_a3b>tabs.getLength()-1){
throw "Selectedindex out of range";
}
}
if(tabs.hasEntries()){
var _a3c=0;
while(tabs.hasNext()){
var tab=tabs.getNext();
var _a3e=_a39.getNext();
this.registerTabBoxPair(tab,_a3e);
if(_a3b&&_a3c==_a3b){
tab.setAttribute("selected","true");
}else{
if(tab.getAttribute("selected")=="true"){
_a3a=tab;
}
}
_a3c++;
}
if(!_a3a){
_a3a=tabs.getFirst();
_a3a.setAttribute("selected","true");
}
}
};
TabBoxBinding.prototype.enforceEqualSize=function(_a3f){
var _a40=null;
var _a41=null;
if(this.isEqualSize){
var _a42=CSSComputer.getPadding(this._tabPanelsElement);
var max=0,_a44=this.getTabPanelElements();
_a44.each(function(_a45){
max=_a45.offsetHeight>max?_a45.offsetHeight:max;
});
_a41=max+_a42.top+_a42.bottom;
if(_a3f&&this._tabPanelsElement.style.height!=null){
_a40=this._tabPanelsElement.offsetHeight;
}
if(_a40!=null||_a41>_a40){
this._tabPanelsElement.style.height=_a41+"px";
}
}
};
TabBoxBinding.prototype._setupWarningSystem=function(_a46){
_a46._invalidCount=0;
_a46.addActionListener(Binding.ACTION_INVALID,this);
_a46.addActionListener(Binding.ACTION_VALID,this);
_a46.addActionListener(BalloonBinding.ACTION_SNAP,this);
};
TabBoxBinding.prototype.handleAction=function(_a47){
TabBoxBinding.superclass.handleAction.call(this,_a47);
var _a48=_a47.target;
var _a49=_a47.listener;
switch(_a47.type){
case Binding.ACTION_ATTACHED:
break;
case Binding.ACTION_DETACHED:
if(_a48.constructor==this._impl_tab){
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
_a47.consume();
}
break;
case PageBinding.ACTION_INITIALIZED:
if(_a48.isDialogSubPage&&this.isEqualSize){
this.enforceEqualSize();
}
break;
case Binding.ACTION_INVALID:
_a49._invalidCount++;
if(_a49._invalidCount==1){
var self=this;
setTimeout(function(){
if(!_a49.isSelected){
self._showWarning(_a49,true);
}
},0);
}
break;
case Binding.ACTION_VALID:
if(_a49._invalidCount>0){
_a49._invalidCount--;
if(_a49._invalidCount==0){
if(_a49.isSelected){
this._showWarning(_a49,false);
}
}
}
break;
case BalloonBinding.ACTION_SNAP:
this._showBalloon(_a49,true);
break;
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FOCUSED:
if(_a47._tabboxstamp==null){
TabBoxBinding.currentActiveInstance=this;
_a47._tabboxstamp="stamped";
}
break;
}
};
TabBoxBinding.prototype.handleEvent=function(e){
TabBoxBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.AFTERUPDATE:
var _a4c=DOMEvents.getTarget(e);
if(_a4c==this.bindingDocument.documentElement){
if(this._hasBastardUpdates){
this._hasBastardUpdates=false;
var tabs=this.getTabElements();
var _a4e=this.getTabPanelElements();
tabs.each(function(tab,_a50){
if(tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY)==null){
var _a51=_a4e.get(_a50);
this.registerTabBoxPair(tab,_a51);
}
},this);
var _a52=this._tabBoxPairs;
for(var key in _a52){
var tab=_a52[key].tab;
if(tab.parentNode==null){
this.unRegisterTabBoxPair(tab);
}
}
}
}else{
if(!this._hasBastardUpdates){
var name=DOMUtil.getLocalName(_a4c);
switch(_a4c.__updateType){
case Update.TYPE_INSERT:
switch(name){
case this._nodename_tab:
case this._nodename_tabpanel:
var _a56=_a4c.parentNode;
if(_a56==this._tabsElement||_a56==this._tabPanelsElement){
this._hasBastardUpdates=true;
}
break;
}
break;
case Update.TYPE_REMOVE:
switch(name){
case this._nodename_tabs:
case this._nodename_tabpanels:
if(_a4c==this._tabsElement||_a4c==this._tabPanelsElement){
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
TabBoxBinding.prototype.select=function(arg,_a58){
var _a59=this.getBindingForArgument(arg);
if(_a59!=null&&!_a59.isSelected){
if(this._selectedTabBinding!=null){
this._selectedTabBinding.unselect();
this.getTabPanelBinding(this._selectedTabBinding).unselect();
}
this.dispatchAction(TabBoxBinding.ACTION_UNSELECTED);
_a59.select(_a58);
this.getTabPanelBinding(_a59).select(_a58);
var _a5a=this.getProperty("selectedindex");
if(_a5a!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_a59.bindingElement,true));
}
this._selectedTabBinding=_a59;
this.dispatchAction(TabBoxBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
if(_a59.getImage()==TabBoxBinding.BALLOON_TAB_IMAGE){
var _a5b=this.getTabPanelBinding(_a59);
this._showBalloon(_a5b,false);
}
}
};
TabBoxBinding.prototype.registerTabBoxPair=function(tab,_a5d){
var key=KeyMaster.getUniqueKey();
tab.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
_a5d.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
this._tabBoxPairs[key]={tab:tab,tabPanel:_a5d};
};
TabBoxBinding.prototype.unRegisterTabBoxPair=function(tab){
var key=tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY);
delete this._tabBoxPairs[key];
};
TabBoxBinding.prototype.getTabPanelBinding=function(_a61){
var _a62=null;
try{
var key=_a61.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _a64=this._tabBoxPairs[key].tabPanel;
_a62=UserInterface.getBinding(_a64);
}
catch(exception){
this.logger.error(exception);
SystemDebug.stack(arguments);
}
return _a62;
};
TabBoxBinding.prototype.getTabBinding=function(_a65){
var key=_a65.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _a67=this._tabBoxPairs[key].tab;
return UserInterface.getBinding(_a67);
};
TabBoxBinding.prototype.summonTabBinding=function(){
return TabBinding.newInstance(this.bindingDocument);
};
TabBoxBinding.prototype.summonTabPanelBinding=function(){
var _a68=this._impl_tabpanel.newInstance(this.bindingDocument);
this._setupWarningSystem(_a68);
return _a68;
};
TabBoxBinding.prototype.appendTabByBindings=function(_a69,_a6a){
var _a6b=_a69.bindingElement;
_a69.setProperty("selected",true);
var _a6c=this.summonTabPanelBinding();
var _a6d=_a6c.bindingElement;
if(_a6a){
_a6d.appendChild(_a6a instanceof Binding?_a6a.bindingElement:_a6a);
}
this.registerTabBoxPair(_a6b,_a6d);
UserInterface.getBinding(this._tabsElement).add(_a69);
this._tabPanelsElement.appendChild(_a6d);
_a69.attach();
UserInterface.getBinding(_a6d).attachRecursive();
this.updateType=TabBoxBinding.UPDATE_ATTACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
return _a69;
};
TabBoxBinding.prototype.importTabBinding=function(_a6e){
var that=_a6e.containingTabBoxBinding;
var _a70=that.getTabPanelBinding(_a6e);
var _a71=_a70.getBindingElement();
var _a72=_a6e.getBindingElement();
that.dismissTabBinding(_a6e);
this._tabsElement.appendChild(_a72);
this._tabPanelsElement.appendChild(_a71);
this.registerTabBoxPair(_a72,_a71);
_a6e.containingTabBoxBinding=this;
this.select(_a6e);
this.dispatchAction(Binding.ACTION_ACTIVATED);
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.removeTab=function(_a73){
var _a74=null;
if(_a73.isSelected){
_a74=this.getBestTab(_a73);
this._selectedTabBinding=null;
}
var _a75=this.getTabPanelBinding(_a73);
this.unRegisterTabBoxPair(_a73.bindingElement);
_a73.dispose();
_a75.dispose();
if(_a74!=null){
this.select(_a74);
}
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.dismissTabBinding=function(_a76){
if(_a76.isSelected){
this.selectBestTab(_a76);
}
};
TabBoxBinding.prototype.selectBestTab=function(_a77){
var _a78=this.getBestTab(_a77);
if(_a78){
this.select(_a78);
}else{
this._selectedTabBinding=null;
}
};
TabBoxBinding.prototype.getBestTab=function(_a79){
var _a7a=null;
var _a7b=_a79.getOrdinalPosition(true);
var _a7c=this.getTabBindings();
var _a7d=_a7c.getLength();
var _a7e=_a7d-1;
if(_a7d==1){
_a7a=null;
}else{
if(_a7b==_a7e){
_a7a=_a7c.get(_a7b-1);
}else{
_a7a=_a7c.get(_a7b+1);
}
}
return _a7a;
};
TabBoxBinding.prototype.moveToOrdinalPosition=function(_a7f,_a80){
var _a81=this.bindingDocument.getElementById(_a7f.bindingElement.id);
var tab=this.getTabElements().get(_a80);
this._tabsElement.insertBefore(_a81,tab);
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
var _a83=this._nodename_tab;
var _a84=new List(this._tabsElement.childNodes);
var _a85=new List();
while(_a84.hasNext()){
var _a86=_a84.getNext();
if(_a86.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_a86)==_a83){
_a85.add(_a86);
}
}
return _a85;
};
TabBoxBinding.prototype.getTabPanelElements=function(){
var _a87=this._nodename_tabpanel;
var _a88=new List(this._tabPanelsElement.childNodes);
var _a89=new List();
_a88.each(function(_a8a){
if(_a8a.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_a8a)==_a87){
_a89.add(_a8a);
}
});
return _a89;
};
TabBoxBinding.prototype.getTabsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabs);
};
TabBoxBinding.prototype.getTabPanelsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabpanels);
};
TabBoxBinding.prototype.getTabBindings=function(){
var _a8b=new List();
var _a8c=this.getTabElements();
_a8c.each(function(_a8d){
_a8b.add(UserInterface.getBinding(_a8d));
});
return _a8b;
};
TabBoxBinding.prototype.getTabPanelBindings=function(){
var _a8e=new List();
this.getTabPanelElements().each(function(_a8f){
_a8e.add(UserInterface.getBinding(_a8f));
});
return _a8e;
};
TabBoxBinding.prototype.getSelectedTabBinding=function(){
return this._selectedTabBinding;
};
TabBoxBinding.prototype.getSelectedTabPanelBinding=function(){
var _a90=null;
if(this._selectedTabBinding){
_a90=this.getTabPanelBinding(this._selectedTabBinding);
}
return _a90;
};
TabBoxBinding.prototype._showWarning=function(_a91,_a92){
var _a93=this.getTabBinding(_a91);
if(_a92){
if(_a93.labelBinding.hasImage){
_a93._backupImage=_a93.getImage();
}
_a93.setImage(TabBoxBinding.INVALID_TAB_IMAGE);
}else{
if(_a93._backupImage){
_a93.setImage(_a93._backupImage);
}else{
_a93.setImage(false);
}
}
};
TabBoxBinding.prototype._showBalloon=function(_a94,_a95){
var _a96=this.getTabBinding(_a94);
if((_a95&&!_a96.isSelected)||!_a95){
if(_a96.getImage()!=TabBoxBinding.INVALID_TAB_IMAGE){
if(_a95){
if(_a96.labelBinding.hasImage){
_a96._backupImage=_a96.getImage();
}
_a96.setImage(TabBoxBinding.BALLOON_TAB_IMAGE);
}else{
if(_a96._backupImage!=null){
_a96.setImage(_a96._backupImage);
}else{
_a96.setImage(false);
}
}
}
}
};
TabBoxBinding.prototype.advanceSelection=function(_a97){
var tab=this.getSelectedTabBinding();
var tabs=this.getTabBindings();
var _a9a=tab.getOrdinalPosition(true);
var next=null;
var _a9c=new List();
tabs.each(function(t){
if(t.isVisible){
_a9c.add(t);
}
});
if(_a9c.getLength()>1){
if(_a9a==0&&!_a97){
next=_a9c.getLast();
}else{
if(_a9a==_a9c.getLength()-1&&_a97){
next=_a9c.getFirst();
}else{
if(_a97){
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
var _a9f=this.constructor.TABBUTTON_IMPLEMENTATION;
this.tabsButtonBinding=_a9f.newInstance(this.bindingDocument);
this.shadowTree.tabsButton=this.tabsButtonBinding;
this.add(this.tabsButtonBinding);
this.tabsButtonBinding.attach();
};
TabsBinding.prototype.handleAction=function(_aa0){
TabsBinding.superclass.handleAction.call(this,_aa0);
switch(_aa0.type){
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
var _aa3=self.bindingElement.offsetWidth;
if(_aa3!=self._cachedOffsetWidth){
self.manage();
}
self._cachedOffsetWidth=_aa3;
}
}
setTimeout(manage,0);
}
};
TabsBinding.prototype.add=function(_aa4){
if(_aa4 instanceof TabBinding){
if(this.tabsButtonBinding&&this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
return TabsBinding.superclass.add.call(this,_aa4);
};
TabsBinding.prototype.manage=function(){
if(Binding.exists(this)==true&&this.isVisible){
this.isManaging=true;
var _aa5=false;
var _aa6,tab,tabs=this.containingTabBoxBinding.getTabElements();
var _aa9=this.constructor.TABBUTTON_IMPLEMENTATION;
var _aaa=this.bindingElement.offsetWidth-_aa9.RESERVED_SPACE;
var _aab=null;
var sum=0,_aad=0;
var _aae=true;
if(tabs.hasEntries()){
this.tabsButtonBinding.reset();
while(tabs.hasNext()&&_aae){
tab=tabs.getNext();
_aa6=UserInterface.getBinding(tab);
if(!_aab){
_aab=_aa6;
}
sum+=tab.offsetWidth;
if(sum>=_aaa){
_aa5=true;
if(_aa6.isSelected){
if(!DOMUtil.isFirstElement(_aa6.bindingElement,true)){
this.isManaging=false;
if(_aab){
_aab.hide();
if(this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
this.containingTabBoxBinding.moveToOrdinalPosition(_aa6,_aad-1);
_aae=false;
}
}else{
_aa6.hide();
this.tabsButtonBinding.registerHiddenTabBinding(_aa6);
}
}else{
_aa6.show();
_aab=_aa6;
_aad++;
}
}
if(_aae){
if(_aa5&&this.tabsButtonBinding.hiddenTabBindings.hasEntries()){
var _aaf=_aab.getBindingElement();
var _ab0=_aaf.offsetLeft+_aaf.offsetWidth;
var _ab1=this.tabsButtonBinding;
setTimeout(function(){
_ab1.show(_ab0+4);
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
var _ab2=TabBinding.superclass.serialize.call(this);
if(_ab2){
_ab2.label=this.getLabel();
_ab2.image=this.getImage();
_ab2.tooltip=this.getToolTip();
}
return _ab2;
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
var _ab3=this.bindingElement.getAttribute("image");
var _ab4=this.bindingElement.getAttribute("label");
var _ab5=this.bindingElement.getAttribute("tooltip");
this.bindingElement.className="default";
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.shadowTree.labelBinding=this.labelBinding;
this.labelBinding.attachClassName("tablabel");
this.add(this.labelBinding);
if(_ab4){
this.setLabel(_ab4);
}
if(_ab3){
this.setImage(_ab3);
}
if(_ab5){
this.setToolTip(_ab5);
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
TabBinding.prototype.setLabel=function(_ab7){
if(_ab7!=null){
this.setProperty("label",_ab7);
if(this.isAttached){
this.labelBinding.setLabel(_ab7);
}
}
};
TabBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
TabBinding.prototype.setToolTip=function(_ab8){
if(_ab8){
this.setProperty("tooltip",_ab8);
if(this.isAttached){
this.labelBinding.setToolTip(_ab8);
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
var _aba=false;
if(Client.isMozilla==true){
}
if(!_aba){
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
TabBinding.prototype.select=function(_abb){
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
TabBinding.newInstance=function(_abc){
var _abd=DOMUtil.createElementNS(Constants.NS_UI,"ui:tab",_abc);
return UserInterface.registerBinding(_abd,TabBinding);
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
var _abe=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(dim2==null||!Dimension.isEqual(dim1,dim2)){
_abe=true;
this._lastKnownDimension=dim1;
}
return _abe;
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
TabPanelBinding.prototype.select=function(_ac1){
if(!this.isSelected){
if(this.isLazy){
this.wakeUp("select");
}else{
this.isSelected=true;
this.isVisible=true;
this.bindingElement.style.position="static";
this._invokeManagedRecursiveFlex();
if(_ac1!=true){
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
TabPanelBinding.prototype.handleAction=function(_ac2){
TabPanelBinding.superclass.handleAction.call(this,_ac2);
var _ac3=_ac2.target;
switch(_ac2.type){
case BalloonBinding.ACTION_INITIALIZE:
_ac2.consume();
break;
}
};
TabPanelBinding.newInstance=function(_ac4){
var _ac5=DOMUtil.createElementNS(Constants.NS_UI,"ui:tabpanel",_ac4);
UserInterface.registerBinding(_ac5,TabPanelBinding);
return UserInterface.getBinding(_ac5);
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
var _ac6=SplitBoxBinding.superclass.serialize.call(this);
if(_ac6){
_ac6.orient=this.getOrient();
_ac6.layout=this.getLayout();
}
return _ac6;
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
var _ac7=this.getSplitPanelElements();
if(_ac7.hasEntries()){
var _ac8=new List(this.getLayout().split(":"));
if(_ac8.getLength()!=_ac7.getLength()){
throw new Error(this+" DOM subree invalid");
}else{
_ac7.each(function(_ac9){
_ac9.setAttribute("ratio",_ac8.getNext());
});
}
}
this.isLayoutInitialized=true;
};
SplitBoxBinding.prototype._initializeOrient=function(){
var _aca=this.getProperty("orient");
if(_aca){
this._orient=_aca;
}
this.attachClassName(this._orient);
};
SplitBoxBinding.prototype._initializeSplitters=function(){
var _acb=this.getSplitterBindings();
while(_acb.hasNext()){
var _acc=_acb.getNext();
if(_acc&&_acc.getProperty("collapsed")==true){
_acc.collapse();
}
}
};
SplitBoxBinding.prototype.handleAction=function(_acd){
SplitBoxBinding.superclass.handleAction.call(this,_acd);
switch(_acd.type){
case SplitterBinding.ACTION_DRAGGED:
this.refreshLayout();
_acd.consume();
break;
case SplitterBinding.ACTION_COLLAPSE:
this.collapse(_acd.target);
_acd.consume();
break;
case SplitterBinding.ACTION_UNCOLLAPSE:
this.unCollapse(_acd.target);
_acd.consume();
break;
}
};
SplitBoxBinding.prototype.flex=function(){
SplitBoxBinding.superclass.flex.call(this);
if(this.isAttached==true){
this.invokeLayout(true);
}
};
SplitBoxBinding.prototype.collapse=function(_ace){
this._getSplitPanelBindingForSplitter(_ace).collapse();
this.invokeLayout();
};
SplitBoxBinding.prototype.unCollapse=function(_acf){
this._getSplitPanelBindingForSplitter(_acf).unCollapse();
this.invokeLayout();
};
SplitBoxBinding.prototype._getSplitPanelBindingForSplitter=function(_ad0){
var _ad1=DOMUtil.getOrdinalPosition(_ad0.bindingElement,true);
var _ad2,_ad3=this.getSplitPanelElements();
switch(_ad0.getCollapseDirection()){
case SplitterBinding.COLLAPSE_BEFORE:
_ad2=_ad3.get(_ad1);
break;
case SplitterBinding.COLLAPSE_AFTER:
_ad2=_ad3.get(_ad1+1);
break;
}
return UserInterface.getBinding(_ad2);
};
SplitBoxBinding.prototype.invokeLayout=function(_ad4){
var _ad5=this.isHorizontalOrient();
var _ad6=this.getSplitPanelBindings();
var _ad7=this.getSplitterBindings();
var _ad8=new List();
var _ad9,sum=0;
var _adb=0;
_ad6.each(function(_adc){
if(_adc.isFixed==true){
if(!_ad6.hasNext()){
_adb+=_adc.getFix();
}
_ad8.add(0);
sum+=0;
}else{
_ad9=_adc.getRatio();
_ad8.add(_ad9);
sum+=_ad9;
}
});
if(sum==0){
this.logger.warn("Division by zero was hacked");
sum=1;
}
if(_ad8.getLength()!=_ad6.getLength()){
throw new Error(this+" Invalid property (ratio)");
}else{
var _add=_ad5?this.getWidth():this.getHeight();
_add-=_adb;
_ad7.each(function(_ade){
if(_ade.isVisible){
_add-=SplitterBinding.DIMENSION;
}
});
var unit=_add/sum;
var _ae0=0;
var self=this;
_ad6.each(function(_ae2){
var span=0;
var _ae4=_ad8.getNext();
if(_ae2.isFixed){
span=_ae2.getFix();
}else{
span=Math.round(unit*_ae4);
if(isNaN(span)){
alert("isNaN ( span ) ["+this.getProperty("layout")+"]");
}
}
_ae0+=span;
while(_ae0>_add){
_ae0--;
span--;
}
if(!_ae2.isFixed){
if(_ad5){
_ae2.setWidth(span);
}else{
_ae2.setHeight(span);
}
}
});
}
if(_ad4!=true){
this.reflex();
}
if(this._persist&&this._persist.layout){
var _ae5=this.getLayout();
if(_ae5){
this.setProperty("layout",_ae5);
}
}
};
SplitBoxBinding.prototype.computeLayout=function(){
var _ae6=this.isHorizontalOrient();
var _ae7=this.getSplitPanelBindings();
var _ae8=this.getSplitterBindings();
var _ae9=null;
var _aea=null;
var unit=null;
var _aec=null;
var span=null;
_ae7.each(function(_aee){
if(!unit){
unit=_ae6?_aee.getWidth():_aee.getHeight();
}
span=_ae6?_aee.getWidth():_aee.getHeight();
if(_aec){
span-=_aec;
_aec=null;
}
_ae9=_ae8.getNext();
if(_ae9&&_ae9.offset){
_aec=_ae9.offset;
span+=_aec;
}
_aee.setRatio(span/unit);
});
};
SplitBoxBinding.prototype.refreshLayout=function(){
this.computeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.setLayout=function(_aef){
this.logger.debug(_aef);
this.setProperty("layout",_aef);
this._initializeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.getLayout=function(){
if(!this.isLayoutInitialized){
if(!this.getProperty("layout")){
this.setProperty("layout",this.getDefaultLayout());
}
}else{
var _af0="",_af1=this.getSplitPanelBindings();
_af1.each(function(_af2){
_af0+=_af2.getRatio().toString();
_af0+=_af1.hasNext()?":":"";
});
this.setProperty("layout",_af0);
}
return new String(this.getProperty("layout"));
};
SplitBoxBinding.prototype.getDefaultLayout=function(){
var _af3=this.getSplitPanelElements();
_af3.each(function(_af4){
layout+="1"+(_af3.hasNext()?":":"");
});
this.setProperty("layout",layout);
};
SplitBoxBinding.prototype.setWidth=function(_af5){
this.bindingElement.style.width=_af5+"px";
};
SplitBoxBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
SplitBoxBinding.prototype.setHeight=function(_af6){
this.bindingElement.style.height=_af6+"px";
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
SplitBoxBinding.prototype.fit=function(_af7){
if(!this.isFit||_af7){
if(this.isHorizontalOrient()){
var max=0;
var _af9=this.getSplitPanelBindings();
_af9.each(function(_afa){
var _afb=_afa.bindingElement.offsetHeight;
max=_afb>max?_afb:max;
});
this._setFitnessHeight(max);
}else{
throw "SplitBoxBinding enforceFitness not supported vertically!";
}
this.isFit=true;
}
};
SplitBoxBinding.newInstance=function(_afc){
var _afd=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitbox",_afc);
return UserInterface.registerBinding(_afd,SplitBoxBinding);
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
var _b00=this.getProperty("hidden");
if(_b00){
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
var _b01=this.getProperty("ratiocache");
if(_b01){
this.setRatio(_b01);
this.deleteProperty("ratiocache");
}else{
this._containingSplitBoxBinding.computeLayout();
}
this.bindingElement.style.display="block";
this.deleteProperty("hidden");
this.isVisible=true;
}
};
SplitPanelBinding.prototype.setWidth=function(_b02){
if(!this.isFixed){
if(_b02!=this.getWidth()){
if(_b02<0){
_b02=this.getWidth();
this.logger.warn("SplitPanelBinding#setWidth bug in Internet Explorer!");
}
try{
this.bindingElement.style.width=_b02+"px";
}
catch(exception){
alert("SplitPanelBinding#setWidth: Occult width: "+_b02);
alert(arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getWidth=function(){
var _b03=null;
if(this.isFixed){
_b03=this.getFix();
}else{
_b03=this.bindingElement.offsetWidth;
}
return _b03;
};
SplitPanelBinding.prototype.setHeight=function(_b04){
if(!this.isFixed){
if(_b04!=this.getHeight()){
try{
this.bindingElement.style.height=_b04+"px";
}
catch(exception){
alert("SplitPanelBinding.prototype.setHeight"+arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getHeight=function(){
var _b05=null;
if(this.isFixed){
_b05=this.getFix();
}else{
_b05=this.bindingElement.offsetHeight;
}
return _b05;
};
SplitPanelBinding.prototype.setRatio=function(_b06){
this.setProperty("ratio",_b06);
};
SplitPanelBinding.prototype.getRatio=function(){
return this.getProperty("ratio");
};
SplitPanelBinding.prototype.setFix=function(_b07){
if(_b07){
this._fixedSpan=_b07;
switch(this._containingSplitBoxBinding.getOrient()){
case SplitBoxBinding.ORIENT_HORIZONTAL:
this.logger.warn("Fix not properly supported on horizontal splitboxes!");
this.setWidth(_b07);
break;
case SplitBoxBinding.ORIENT_VERTICAL:
this.setHeight(_b07);
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
SplitPanelBinding.newInstance=function(_b08){
var _b09=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitpanel",_b08);
return UserInterface.registerBinding(_b09,SplitPanelBinding);
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
var _b0a=SplitBoxBinding.superclass.serialize.call(this);
if(_b0a){
_b0a.collapse=this.getProperty("collapse");
_b0a.collapsed=this.getProperty("collapsed");
_b0a.disabled=this.getProperty("isdisabled");
}
return _b0a;
};
SplitterBinding.prototype.onBindingAttach=function(){
SplitterBinding.superclass.onBindingAttach.call(this);
this.addActionListener(Binding.ACTION_DRAG);
this._containingSplitBoxBinding=this.getAncestorBindingByLocalName("splitbox");
this.attachClassName(this._containingSplitBoxBinding.getOrient());
this._collapseDirection=this.getProperty("collapse");
this.buildDOMContent();
this.attachDOMEvents();
var _b0b=this.getProperty("hidden");
if(_b0b){
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
SplitterBinding.prototype.setCollapseDirection=function(_b0d){
this.setProperty("collapse",_b0d);
this._collapseDirection=_b0d;
};
SplitterBinding.prototype.handleAction=function(_b0e){
SplitterBinding.superclass.handleAction.call(this,_b0e);
switch(_b0e.type){
case Binding.ACTION_DRAG:
this.dragger.registerHandler(this);
_b0e.consume();
break;
}
};
SplitterBinding.prototype.handleEvent=function(e){
SplitterBinding.superclass.handleEvent.call(this,e);
var _b10=this;
if(!this.isDragging&&!this.isDisabled){
switch(e.type){
case DOMEvents.MOUSEOVER:
window.splitterTimeout=window.setTimeout(function(){
_b10.shadowTree.splitterBody.className=SplitterBinding.CLASSNAME_HOVER;
},250);
break;
case DOMEvents.MOUSEOUT:
if(window.splitterTimeout){
window.clearTimeout(window.splitterTimeout);
}
if(_b10.shadowTree.splitterBody.className==SplitterBinding.CLASSNAME_HOVER){
this.shadowTree.splitterBody.className="";
}
break;
}
}
};
SplitterBinding.prototype.onDragStart=function(_b11){
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
SplitterBinding.newInstance=function(_b1c){
var _b1d=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitter",_b1c);
return UserInterface.registerBinding(_b1d,SplitterBinding);
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
var _b1e=this.getProperty("selectedindex");
var _b1f=this.getDeckElements();
if(_b1f.hasEntries()){
var _b20=false;
var _b21=0;
while(_b1f.hasNext()){
var deck=_b1f.getNext();
if(_b1e&&_b21==_b1e){
deck.setAttribute("selected","true");
_b20=true;
}else{
if(deck.getAttribute("selected")=="true"){
_b20=true;
}
}
_b21++;
}
if(!_b20){
_b1f.getFirst().setAttribute("selected","true");
}
}
};
DecksBinding.prototype.getDeckElements=function(){
return this.getChildElementsByLocalName(this.constructor.NODENAME_DECK);
};
DecksBinding.prototype.select=function(arg){
var _b24=this.getBindingForArgument(arg);
if(_b24!=null){
if(_b24!=this._selectedDeckBinding){
if(this._selectedDeckBinding){
this._selectedDeckBinding.unselect();
}
_b24.select();
this._selectedDeckBinding=_b24;
var _b25=this.getProperty("selectedindex");
if(_b25!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_b24.bindingElement,true));
}
this.dispatchAction(DecksBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
}else{
throw "No deck for argument "+arg;
}
};
DecksBinding.prototype.hasDimensionsChanged=function(){
var _b26=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(!Dimension.isEqual(dim1,dim2)){
_b26=true;
this._lastKnownDimension=dim1;
}
return _b26;
};
DecksBinding.prototype.getSelectedDeckBinding=function(){
return this._selectedDeckBinding;
};
DecksBinding.newInstance=function(_b29){
var _b2a=DOMUtil.createElementNS(Constants.NS_UI,"ui:decks",_b29);
return UserInterface.registerBinding(_b2a,DecksBinding);
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
DeckBinding.prototype.handleAction=function(_b2b){
DeckBinding.superclass.handleAction.call(this,_b2b);
var _b2c=_b2b.target;
switch(_b2b.type){
case BalloonBinding.ACTION_INITIALIZE:
_b2b.consume();
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
DeckBinding.newInstance=function(_b2e){
var _b2f=DOMUtil.createElementNS(Constants.NS_UI,"ui:deck",_b2e);
return UserInterface.registerBinding(_b2f,DeckBinding);
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
ToolBarBinding.prototype.onMemberInitialize=function(_b30){
if(_b30 instanceof ToolBarBodyBinding){
if(_b30.isRightAligned){
if(!this._toolBarBodyRight){
this._toolBarBodyRight=_b30;
}
}else{
if(!this._toolBarBodyLeft){
this._toolBarBodyLeft=_b30;
}
}
}
ToolBarBinding.superclass.onMemberInitialize.call(this,_b30);
};
ToolBarBinding.prototype.parseDOMProperties=function(){
var _b31=this.getProperty("imagesize");
var type=this.getProperty("type");
if(_b31){
this.setImageSize(_b31);
}
if(type){
this.setType(type);
}else{
this.setType(this.type);
}
};
ToolBarBinding.prototype.buildDOMContent=function(){
if(this._hasDefaultContent==true&&!this._hasDOMContent){
var _b33=ToolBarGroupBinding.newInstance(this.bindingDocument);
_b33.add(ToolBarButtonBinding.newInstance(this.bindingDocument));
_b33.isDefaultContent=true;
this.add(_b33);
_b33.attachRecursive();
this._hasDOMContent=true;
}
};
ToolBarBinding.prototype.flex=function(){
var left=this._toolBarBodyLeft;
var _b35=this._toolBarBodyRight;
if(left!=null&&left.hasClassName("max")){
this._maxToolBarGroup(left,_b35);
}
if(_b35!=null&&_b35.hasClassName("max")){
this._maxToolBarGroup(_b35,left);
}
};
ToolBarBinding.prototype._maxToolBarGroup=function(max,_b37){
var _b38=this.boxObject.getDimension().w;
var _b39=CSSComputer.getPadding(this.bindingElement);
_b38-=(_b39.left+_b39.right);
if(_b37!=null){
_b38-=_b37.boxObject.getDimension().w;
if(!Client.isWindows){
_b38-=1;
}
if(Client.isExplorer){
_b38-=15;
}
}
max.bindingElement.style.width=_b38+"px";
};
ToolBarBinding.prototype.getToolBarGroupByIndex=function(_b3a){
return this.getDescendantBindingsByLocalName("toolbargroup").get(_b3a);
};
ToolBarBinding.prototype.addLeft=function(_b3b,_b3c){
var _b3d=null;
if(this._toolBarBodyLeft!=null){
_b3d=this._toolBarBodyLeft.add(_b3b,_b3c);
}else{
throw new Error("No left toolbarbody");
}
return _b3d;
};
ToolBarBinding.prototype.addLeftFirst=function(_b3e,_b3f){
var _b40=null;
if(this._toolBarBodyLeft){
_b40=this._toolBarBodyLeft.addFirst(_b3e,_b3f);
}else{
throw new Error("No left toolbarbody");
}
return _b40;
};
ToolBarBinding.prototype.addRight=function(_b41){
var _b42=null;
if(this._toolBarBodyRight){
_b42=this._toolBarBodyRight.add(_b41);
}else{
throw new Error("No left toolbarbody");
}
return _b42;
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
ToolBarBinding.newInstance=function(_b45){
var _b46=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_b45);
return UserInterface.registerBinding(_b46,ToolBarBinding);
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
var _b47=this.getDescendantBindingsByLocalName("toolbargroup");
var _b48=new List();
var _b49=true;
_b47.each(function(_b4a){
if(_b4a.isVisible&&!_b4a.isDefaultContent){
_b48.add(_b4a);
}
});
while(_b48.hasNext()){
var _b4b=_b48.getNext();
_b4b.setLayout(ToolBarGroupBinding.LAYOUT_DEFAULT);
if(_b49){
_b4b.setLayout(ToolBarGroupBinding.LAYOUT_FIRST);
_b49=false;
}
if(!_b48.hasNext()){
_b4b.setLayout(ToolBarGroupBinding.LAYOUT_LAST);
}
}
if(this.getProperty("equalsize")){
this.enforceEqualSize();
}
};
ToolBarBodyBinding.prototype.enforceEqualSize=function(){
var max=0,list=this.getDescendantBindingsByLocalName("clickbutton");
while(list.hasNext()){
var _b4e=list.getNext();
var _b4f=_b4e.getEqualSizeWidth();
if(_b4f>max){
max=_b4f;
}
}
if(max!=0){
list.reset();
while(list.hasNext()){
var _b4e=list.getNext();
_b4e.setEqualSizeWidth(max);
}
}
};
ToolBarBodyBinding.prototype.empty=function(){
this.detachRecursive();
this.bindingElement.innerHTML="";
};
ToolBarBodyBinding.prototype.add=function(_b50,_b51){
var _b52=ToolBarBinding.superclass.add.call(this,_b50);
if(!_b51){
if(_b50 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _b52;
};
ToolBarBodyBinding.prototype.addFirst=function(_b53,_b54){
var _b55=ToolBarBinding.superclass.addFirst.call(this,_b53);
if(!_b54){
if(_b53 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _b55;
};
ToolBarBodyBinding.newInstance=function(_b56){
var _b57=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbody",_b56);
return UserInterface.registerBinding(_b57,ToolBarBodyBinding);
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
ToolBarGroupBinding.prototype.setLayout=function(_b58){
switch(_b58){
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
var _b59=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_b59)=="toolbarbody"){
UserInterface.getBinding(_b59).refreshToolBarGroups();
}
};
ToolBarGroupBinding.prototype.hide=function(){
ToolBarGroupBinding.superclass.hide.call(this);
var _b5a=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_b5a)=="toolbarbody"){
UserInterface.getBinding(_b5a).refreshToolBarGroups();
}
};
ToolBarGroupBinding.newInstance=function(_b5b){
var _b5c=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbargroup",_b5b);
return UserInterface.registerBinding(_b5c,ToolBarGroupBinding);
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
ToolBarButtonBinding.newInstance=function(_b5d){
var _b5e=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_b5d);
return UserInterface.registerBinding(_b5e,ToolBarButtonBinding);
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
var _b5f=this.getProperty("label");
var _b60=this.getProperty("image");
if(_b5f){
this.setLabel(_b5f);
}
if(_b60){
this.setImage(_b60);
}
};
ToolBarLabelBinding.prototype.setLabel=function(_b61,_b62){
if(this.isAttached){
this._labelBinding.setLabel(_b61,_b62);
}
this.setProperty("label",_b61);
};
ToolBarLabelBinding.prototype.setImage=function(_b63,_b64){
if(this.isAttached){
this._labelBinding.setImage(_b63,_b64);
}
this.setProperty("image",_b63);
};
ToolBarLabelBinding.newInstance=function(_b65){
var _b66=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarlabel",_b65);
return UserInterface.registerBinding(_b66,ToolBarLabelBinding);
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
var _b67=this.getDescendantBindingsByLocalName("clickbutton");
if(_b67.hasEntries()){
while(_b67.hasNext()){
var _b68=_b67.getNext();
if(_b68.isDefault){
this._defaultButton=_b68;
_b68.attachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
if(!this._isListening&&_b68.isFocusable){
this.subscribe(BroadcastMessages.KEY_ENTER);
this._isListening=true;
}
}
this._buttons=_b67;
}
};
DialogToolBarBinding.prototype.handleBroadcast=function(_b69,arg){
DialogToolBarBinding.superclass.handleBroadcast.call(this,_b69,arg);
switch(_b69){
case BroadcastMessages.KEY_ENTER:
if(!PopupBinding.hasActiveInstances()&&!EditorBinding.isActive){
if(Binding.exists(this)){
var _b6b=this.getAncestorBindingByType(DialogBinding,true);
if(_b6b!=null&&_b6b.isActive){
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
DialogToolBarBinding.prototype.handleAction=function(_b6c){
DialogToolBarBinding.superclass.handleAction.call(this,_b6c);
var _b6d=_b6c.target;
var _b6e=false;
var _b6f=this._buttons.reset();
if(_b6d instanceof ClickButtonBinding){
switch(_b6c.type){
case Binding.ACTION_FOCUSED:
_b6d.attachClassName(ButtonBinding.CLASSNAME_FOCUSED);
this._focusedButton=_b6d;
if(this._defaultButton){
this._defaultButton.detachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
break;
case Binding.ACTION_BLURRED:
_b6d.detachClassName(ButtonBinding.CLASSNAME_FOCUSED);
break;
}
}
if(this._defaultButton){
while(!_b6e&&_b6f.hasNext()){
var _b70=_b6f.getNext();
_b6e=_b70.isFocused;
}
if(!_b6e){
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
var _b71=this._views;
for(var _b72 in ViewDefinitions){
var def=ViewDefinitions[_b72];
var key=def.perspective;
if(key!=null){
if(!_b71.has(key)){
_b71.set(key,new List());
}
var list=_b71.get(key);
list.add(def);
}
}
}else{
this.hide();
}
};
ToolBoxToolBarButtonBinding.prototype.handleBroadcast=function(_b76,arg){
ToolBoxToolBarButtonBinding.superclass.handleBroadcast.call(this,_b76,arg);
switch(_b76){
case BroadcastMessages.PERSPECTIVE_CHANGED:
var tag=arg;
if(this._views.has(tag)){
if(tag!=this._lastGeneratedPerspective){
this._lastGeneratedPerspective=tag;
var list=this._views.get(tag);
var _b7a=this.bindingWindow.bindingMap.toolboxpopup;
_b7a.empty();
list.each(function(def){
var item=_b7a.add(StageViewMenuItemBinding.newInstance(_b7a.bindingDocument));
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
TreeBinding.grid=function(_b7d){
var _b7e=TreeNodeBinding.HEIGHT;
var ceil=Math.ceil(_b7d);
var _b80=_b7d%_b7e;
if(_b80>0){
_b7d=_b7d-_b80+_b7e;
}
return _b7d+TreeBodyBinding.PADDING_TOP;
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
var _b81=this.getProperty("focusable");
if(_b81!=null){
this._isFocusable=_b81;
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
var _b83=this.getProperty("builder");
if(_b83){
this._buildFromTextArea(_b83);
}else{
if(this._treeNodeBuffer.hasEntries()){
while(this._treeNodeBuffer.hasNext()){
this.add(this._treeNodeBuffer.getNext());
}
}
}
};
TreeBinding.prototype._setupTreeSelection=function(){
var _b84=this.getProperty("selectable");
var _b85=this.getProperty("selectionproperty");
var _b86=this.getProperty("selectionvalue");
if(_b84){
this.setSelectable(true);
if(_b85){
this.setSelectionProperty(_b85);
}
if(_b86){
this.setSelectionValue(_b86);
}
}
this._positionIndicatorBinding=this.add(TreePositionIndicatorBinding.newInstance(this.bindingDocument));
this.shadowTree.positionIndicator=this._positionIndicatorBinding;
this._positionIndicatorBinding.attach();
};
TreeBinding.prototype._buildFromTextArea=function(id){
var area=this.bindingDocument.getElementById(id);
if(area!=null){
var _b89=UserInterface.getBinding(area);
var _b8a=this._treeBodyBinding;
function build(){
_b8a.subTreeFromString(area.value);
}
_b89.addActionListener(Binding.ACTION_UPDATED,{handleAction:function(){
build();
}});
setTimeout(build,0);
}
};
TreeBinding.prototype.registerTreeNodeBinding=function(_b8b){
var _b8c=_b8b.getHandle();
if(this._treeNodeBindings.has(_b8c)){
throw "Duplicate treenodehandles registered: "+_b8b.getLabel();
}else{
this._treeNodeBindings.set(_b8c,_b8b);
var map=this._openTreeNodesBackupMap;
if(map!=null&&map.has(_b8c)){
_b8b.open();
}
}
};
TreeBinding.prototype.unRegisterTreeNodeBinding=function(_b8e){
this._treeNodeBindings.del(_b8e.getHandle());
};
TreeBinding.prototype.getTreeNodeBindingByHandle=function(_b8f){
var _b90=null;
if(this._treeNodeBindings.has(_b8f)){
_b90=this._treeNodeBindings.get(_b8f);
}else{
throw "No such treenode: "+_b8f;
}
return _b90;
};
TreeBinding.prototype.handleAction=function(_b91){
TreeBinding.superclass.handleAction.call(this,_b91);
var _b92=_b91.target;
switch(_b91.type){
case TreeNodeBinding.ACTION_OPEN:
_b91.consume();
break;
case TreeNodeBinding.ACTION_CLOSE:
this._blurDescendantBindings(_b92);
_b91.consume();
break;
case TreeNodeBinding.ACTION_ONFOCUS:
this._nodePrimary=_b92;
this.focusSingleTreeNodeBinding(_b92);
if(!this.isFocused){
this.focus();
}
_b91.consume();
break;
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
switch(this._selectionType){
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodePrimary=_b92;
this.focusSingleTreeNodeBinding(_b92);
break;
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodeSecondary=_b92;
if(!this._nodePrimary||this._nodeSecondary==this._nodePrimary){
this._nodePrimary=_b92;
this.focusSingleTreeNodeBinding(_b92);
}else{
this.focusMultipeTreeNodeBindings(this._getVisibleTreeNodeBindingsInRange(this._nodePrimary,this._nodeSecondary));
}
break;
}
if(!this.isFocused){
this.focus();
}
_b91.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
if(_b92.isFocused){
this.blurSelectedTreeNodes();
}
_b91.consume();
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
TreeBinding.prototype._getVisibleTreeNodeBindingsInRange=function(_b93,_b94){
alert("TreeBinding#_getVisibleTreeNodeBindingsInRange");
};
TreeBinding.prototype.focusSingleTreeNodeBinding=function(_b95){
if(_b95!=null&&!_b95.isFocused){
this.blurSelectedTreeNodes();
this._focusedTreeNodeBindings.add(_b95);
_b95.invokeManagedFocus();
if(this._isSelectable){
this._manageSelections();
}
}
};
TreeBinding.prototype.focusMultipeTreeNodeBindings=function(_b96){
this.blurSelectedTreeNodes();
while(_b96.hasNext()){
var _b97=_b96.getNext();
this._focusedTreeNodeBindings.add(_b97);
_b97.invokeManagedFocus();
}
if(this._isSelectable){
this._manageSelections();
}
};
TreeBinding.prototype._manageSelections=function(){
var _b98=this._selectedTreeNodeBindings;
this._selectedTreeNodeBindings={};
var _b99=false;
var _b9a=null;
this._focusedTreeNodeBindings.reset();
while(this._focusedTreeNodeBindings.hasNext()){
var _b9b=this._focusedTreeNodeBindings.getNext();
var _b9c=_b9b.getProperty(this._selectionProperty);
if(_b9c!=null){
if(!this._selectionValue||this._selectionValue[_b9c]){
_b9a=(this._selectedTreeNodeBindings[_b9b.key]=_b9b);
var _b9d=_b98[_b9b.key];
if(!_b9d||_b9d!=_b9a){
_b99=true;
}
}
}
}
if(_b9a){
if(_b99){
this.dispatchAction(TreeBinding.ACTION_SELECTIONCHANGED);
}
}else{
if(_b98){
for(var key in _b98){
this.dispatchAction(TreeBinding.ACTION_NOSELECTION);
break;
}
}
}
};
TreeBinding.prototype.getSelectedTreeNodeBindings=function(){
var _b9f=new List();
for(var key in this._selectedTreeNodeBindings){
_b9f.add(this._selectedTreeNodeBindings[key]);
}
return _b9f;
};
TreeBinding.prototype.blurSelectedTreeNodes=function(){
this._focusedTreeNodeBindings.reset().each(function(_ba1){
_ba1.blur();
});
this._focusedTreeNodeBindings.clear();
};
TreeBinding.prototype._blurDescendantBindings=function(_ba2){
var _ba3=_ba2.getDescendantBindingsByLocalName("treenode");
var _ba4=true;
var self=this;
_ba3.each(function(desc){
if(desc.isFocused){
desc.blur();
self._focusedTreeNodeBindings.del(self._focusedTreeNodeBindings.getIndex(desc));
}
return _ba4;
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
var _ba7=this._treeBodyBinding.getChildBindingByLocalName("treenode");
if(_ba7!=null){
this.focusSingleTreeNodeBinding(_ba7);
_ba7.callback();
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
TreeBinding.prototype.add=function(_ba8){
var _ba9=null;
if(this._treeBodyBinding){
_ba9=this._treeBodyBinding.add(_ba8);
}else{
this._treeNodeBuffer.add(_ba8);
_ba9=_ba8;
}
return _ba9;
};
TreeBinding.prototype.addFirst=function(_baa){
throw new Error("Not implemented");
};
TreeBinding.prototype.empty=function(){
this._treeBodyBinding.detachRecursive();
var _bab=this._treeBodyBinding.bindingElement;
_bab.innerHTML="";
};
TreeBinding.prototype.isEmpty=function(){
return this._treeNodeBindings.hasEntries()==false;
};
TreeBinding.prototype.collapse=function(){
this.blurSelectedTreeNodes();
this._treeNodeBindings.each(function(_bac,_bad){
if(_bad.isContainer&&_bad.isOpen){
_bad.close();
}
});
};
TreeBinding.prototype.setSelectable=function(_bae){
this._isSelectable=_bae;
if(_bae){
this._selectedTreeNodeBindings={};
}else{
this._selectedTreeNodeBindings=null;
this._selectionProperty=null;
this._selectionValue=null;
}
};
TreeBinding.prototype.setSelectionProperty=function(_baf){
this._selectionProperty=_baf;
};
TreeBinding.prototype.setSelectionValue=function(_bb0){
if(_bb0){
var list=new List(_bb0.split(" "));
this._selectionValue={};
while(list.hasNext()){
this._selectionValue[list.getNext()]=true;
}
}
};
TreeBinding.prototype.handleBroadcast=function(_bb2,arg){
TreeBinding.superclass.handleBroadcast.call(this,_bb2,arg);
switch(_bb2){
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
var _bb4=this.getFocusedTreeNodeBindings();
if(_bb4.hasEntries()){
var node=_bb4.getFirst();
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
var _bb7=this.getFocusedTreeNodeBindings();
if(_bb7.hasEntries()){
var node=_bb7.getFirst();
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
var _bba=null;
while(next==null&&(_bba=node.getAncestorBindingByLocalName("treenode"))!=null){
if(_bba!=null){
next=_bba.getNextBindingByLocalName("treenode");
}
node=_bba;
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
var _bbc=DOMEvents.getTarget(e);
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
var _bbd=new TreeCrawler();
var list=new List();
_bbd.mode=TreeCrawler.MODE_GETOPEN;
_bbd.crawl(this.bindingElement,list);
var map=new Map();
if(list.hasEntries()){
while(list.hasNext()){
var _bc0=list.getNext();
map.set(_bc0.getHandle(),true);
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
var _bc5=this._positionIndicatorBinding;
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
if(y!=_bc5.getPosition().y){
_bc5.setPosition(new Point(this._acceptingPosition.x+TreeNodeBinding.INDENT,y));
}
if(!_bc5.isVisible){
_bc5.show();
}
}else{
if(_bc5.isVisible){
_bc5.hide();
}
}
}else{
if(_bc5.isVisible){
_bc5.hide();
}
}
};
TreeBinding.prototype.enablePositionIndicator=function(_bc8){
this._acceptingTreeNodeBinding=_bc8;
this._acceptingPosition=_bc8.boxObject.getLocalPosition();
this._acceptingDimension=_bc8.boxObject.getDimension();
this._acceptingPositions=this._getChildPositions(_bc8);
};
TreeBinding.prototype.disablePositionIndicator=function(){
this._acceptingTreeNodeBinding=null;
this._acceptingPosition=null;
this._acceptingDimension=null;
};
TreeBinding.prototype._getChildPositions=function(_bc9){
var map={};
var _bcb=_bc9.getChildBindingsByLocalName("treenode");
var _bcc,pos,dim,y;
y=TreeBinding.grid(_bc9.boxObject.getLocalPosition().y);
map[y]=true;
while(_bcb.hasNext()){
_bcc=_bcb.getNext();
pos=_bcc.boxObject.getLocalPosition();
dim=_bcc.boxObject.getDimension();
y=TreeBinding.grid(pos.y+dim.h)-TreeNodeBinding.HEIGHT;
map[y]=true;
}
return map;
};
TreeBinding.prototype.getDropIndex=function(){
var y=this._positionIndicatorBinding.getPosition().y;
var drop=0;
for(var _bd2 in this._acceptingPositions){
if(_bd2==y){
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
TreeBinding.newInstance=function(_bd3){
var _bd4=DOMUtil.createElementNS(Constants.NS_UI,"ui:tree",_bd3);
var _bd5=UserInterface.registerBinding(_bd4,TreeBinding);
_bd5.treeBodyBinding=TreeBodyBinding.newInstance(_bd3);
return _bd5;
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
TreeBodyBinding.prototype.accept=function(_bd6){
if(_bd6 instanceof TreeNodeBinding){
this.logger.debug(_bd6);
}
};
TreeBodyBinding.prototype.handleAction=function(_bd7){
TreeBodyBinding.superclass.handleAction.call(this,_bd7);
switch(_bd7.type){
case TreeNodeBinding.ACTION_FOCUSED:
this._scrollIntoView(_bd7.target);
_bd7.consume();
break;
}
};
TreeBodyBinding.prototype._scrollIntoView=function(_bd8){
var a=this.boxObject.getDimension().h;
var y=_bd8.boxObject.getLocalPosition().y;
var h=_bd8.boxObject.getDimension().h;
var t=this.bindingElement.scrollTop;
var l=this.bindingElement.scrollLeft;
var _bde=_bd8.labelBinding.bindingElement;
if(y-t<0){
_bde.scrollIntoView(true);
}else{
if(y-t+h>a){
_bde.scrollIntoView(false);
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
TreeBodyBinding.newInstance=function(_bdf){
var _be0=DOMUtil.createElementNS(Constants.NS_UI,"ui:treebody",_bdf);
return UserInterface.registerBinding(_be0,TreeBodyBinding);
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
var _be1=TreeNodeBinding.superclass.serialize.call(this);
if(_be1){
_be1.label=this.getLabel();
_be1.image=this.getImage();
var _be2=this.getHandle();
if(_be2&&_be2!=this.key){
_be1.handle=_be2;
}
if(this.isOpen){
_be1.open=true;
}
if(this.isDisabled){
_be1.disabled=true;
}
if(this.dragType){
_be1.dragtype=this.dragType;
}
if(this.dragAccept){
_be1.dragaccept=this.dragAccept;
}
}
return _be1;
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
var _be4=UserInterface.getBinding(node);
if(_be4&&_be4.containingTreeBinding){
this.containingTreeBinding=_be4.containingTreeBinding;
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
var _be5=this.key;
var _be6=this.getProperty("handle");
if(_be6){
_be5=_be6;
}
return _be5;
};
TreeNodeBinding.prototype.setHandle=function(_be7){
this.setProperty("handle",_be7);
};
TreeNodeBinding.prototype.buildDOMContent=function(){
var url=this.getProperty("url");
var _be9=this.getProperty("label");
var _bea=this.getProperty("tooltip");
var _beb=this.getProperty("oncommand");
var _bec=this.getProperty("onbindingfocus");
var _bed=this.getProperty("onbindingblur");
var _bee=this.getProperty("focused");
var _bef=this.getProperty("callbackid");
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
if(_be9!=null){
this.setLabel(_be9);
}
if(_bea!=null){
this.setToolTip(_bea);
}
if(!this.imageProfile){
this._computeImageProfile();
}
this.setImage(this.computeImage());
if(this.isContainer){
this.updateClassNames();
}
var _bf1=this.bindingWindow.WindowManager;
if(_beb!=null){
this.oncommand=function(){
Binding.evaluate(_beb,this);
};
}
if(_bec!=null){
this.onfocus=function(){
Binding.evaluate(_bec,this);
};
}
if(_bed!=null){
this.onblur=function(){
Binding.evaluate(_bed,this);
};
}
if(_bee==true){
this.focus();
}
if(_bef!=null){
Binding.dotnetify(this,_bef);
}
};
TreeNodeBinding.prototype.handleAction=function(_bf2){
TreeNodeBinding.superclass.handleAction.call(this,_bf2);
switch(_bf2.type){
case TreeNodeBinding.ACTION_FOCUSED:
if(_bf2.target!=this){
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
TreeNodeBinding.prototype.accept=function(_bf3,_bf4){
var _bf5=true;
if(_bf3 instanceof TreeNodeBinding){
var _bf6=false;
var _bf7=this.bindingElement;
var _bf8=this.containingTreeBinding.bindingElement;
while(!_bf6&&_bf7!=_bf8){
if(_bf7==_bf3.getBindingElement()){
_bf6=true;
}else{
_bf7=_bf7.parentNode;
}
}
if(_bf6){
Dialog.error("Not Allowed","You cannot move a folder into itself.");
_bf5=false;
}else{
this.acceptTreeNodeBinding(_bf3,_bf4);
}
}else{
_bf5=false;
}
return _bf5;
};
TreeNodeBinding.prototype.acceptTreeNodeBinding=function(_bf9,_bfa){
var _bfb=_bf9.serializeToString();
var _bfc=new BindingParser(this.bindingDocument);
var _bfd=_bfc.parseFromString(_bfb).getFirst();
_bfa=_bfa?_bfa:this.containingTreeBinding.getDropIndex();
var _bfe=this.getChildElementsByLocalName("treenode");
this.bindingElement.insertBefore(_bfd,_bfe.get(_bfa));
this.bindingWindow.DocumentManager.attachBindings(this.bindingElement);
_bf9.dispose();
};
TreeNodeBinding.prototype.showAcceptance=function(){
this.containingTreeBinding.enablePositionIndicator(this);
};
TreeNodeBinding.prototype.hideAcceptance=function(){
this.containingTreeBinding.disablePositionIndicator();
};
TreeNodeBinding.prototype._computeImageProfile=function(){
var _bff=this.getProperty("image");
var _c00=this.getProperty("image-active");
var _c01=this.getProperty("image-disabled");
_c00=_c00?_c00:this.isContainer?_bff?_bff:TreeNodeBinding.DEFAULT_FOLDER_OPEN:_bff?_bff:TreeNodeBinding.DEFAULT_ITEM;
_c01=_c01?_c01:this.isContainer?_bff?_bff:TreeNodeBinding.DEFAULT_FOLDER_DISABLED:_bff?_bff:TreeNodeBinding.DEFAULT_ITEM_DISABLED;
_bff=_bff?_bff:this.isContainer?TreeNodeBinding.DEFAULT_FOLDER_CLOSED:TreeNodeBinding.DEFAULT_ITEM;
this.imageProfile=new ImageProfile({image:_bff,imageHover:null,imageActive:_c00,imageDisabled:_c01});
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
TreeNodeBinding.prototype.setLabel=function(_c03){
this.setProperty("label",String(_c03));
if(this.isAttached){
this.labelBinding.setLabel(String(_c03));
}
};
TreeNodeBinding.prototype.setToolTip=function(_c04){
this.setProperty("tooltip",String(_c04));
if(this.isAttached){
this.labelBinding.setToolTip(String(_c04));
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
var _c05=this.imageProfile.getDefaultImage();
var _c06=this.imageProfile.getActiveImage();
_c06=_c06?_c06:_c05;
return this.isOpen?_c06:_c05;
};
TreeNodeBinding.prototype.handleEvent=function(e){
TreeNodeBinding.superclass.handleEvent.call(this,e);
var _c08=DOMEvents.getTarget(e);
var _c09=this.labelBinding.bindingElement;
var _c0a=this.labelBinding.shadowTree.labelBody;
var _c0b=this.labelBinding.shadowTree.labelText;
switch(e.type){
case DOMEvents.MOUSEDOWN:
switch(_c08){
case _c09:
this._onAction(e);
break;
case _c0a:
case _c0b:
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
if(_c08.parentNode==this.bindingElement&&_c08.__updateType==Update.TYPE_INSERT){
var _c09=this.labelBinding.bindingElement;
if(DOMUtil.getLocalName(_c08)=="treenode"){
if(_c08==this.bindingElement.firstChild){
this.bindingElement.insertBefore(_c08,_c09.nextSibling);
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
switch(_c08){
case _c09:
case _c0a:
case _c0b:
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
var _c0f=true;
if(e.type=="mousedown"){
var _c10=e.button==(e.target?0:1);
if(!_c10){
_c0f=false;
}
}
if(_c0f){
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
var _c12=false;
if(e!=null){
_c12=e.shiftKey;
}
this.dispatchAction(_c12?TreeNodeBinding.ACTION_ONMULTIFOCUS:TreeNodeBinding.ACTION_ONFOCUS);
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
var _c15=this.getDescendantBindingsByLocalName("treenode");
_c15.each(function(_c16){
_c16.dispose();
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
TreeNodeBinding.prototype.handleElement=function(_c17){
var _c18=_c17.getAttribute("focused");
if(_c18=="true"){
if(!this.isFocused){
this.focus();
}
}
return false;
};
TreeNodeBinding.newInstance=function(_c19){
var _c1a=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_c19);
return UserInterface.registerBinding(_c1a,TreeNodeBinding);
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
TreeContentBinding.newInstance=function(_c1b){
var _c1c=DOMUtil.createElementNS(Constants.NS_UI,"ui:treecontent",_c1b);
return UserInterface.registerBinding(_c1c,TreeContentBinding);
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
TreePositionIndicatorBinding.prototype.setPosition=function(_c1d){
this.bindingElement.style.left=_c1d.x+"px";
this.bindingElement.style.top=_c1d.y+"px";
this._geometry.x=_c1d.x;
this._geometry.y=_c1d.y;
};
TreePositionIndicatorBinding.prototype.getPosition=function(){
return new Point(this._geometry.x,this._geometry.y);
};
TreePositionIndicatorBinding.newInstance=function(_c1e){
var _c1f=DOMUtil.createElementNS(Constants.NS_UI,"ui:treepositionindicator",_c1e);
return UserInterface.registerBinding(_c1f,TreePositionIndicatorBinding);
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
this.addFilter(function(_c21){
var _c22=UserInterface.getBinding(_c21);
var _c23=null;
var _c23=null;
if(!_c22 instanceof TreeNodeBinding){
_c23=NodeCrawler.SKIP_NODE;
}
return _c23;
});
this.addFilter(function(_c24,list){
var _c26=UserInterface.getBinding(_c24);
var _c27=null;
switch(self.mode){
case TreeCrawler.MODE_GETOPEN:
if(_c26.isOpen){
list.add(_c26);
}
break;
}
return _c27;
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
ShadowBinding.prototype.shadow=function(_c28){
this.targetBinding=_c28;
_c28.addActionListener(Binding.ACTION_POSITIONCHANGED,this);
_c28.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_c28.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_c28.bindingElement.parentNode.appendChild(this.bindingElement);
if(_c28.isVisible){
this.show();
this.setPosition(_c28.getPosition());
this.setDimension(_c28.getDimension());
}else{
this.hide();
}
};
ShadowBinding.prototype.handleAction=function(_c29){
ShadowBinding.superclass.handleAction.call(this,_c29);
var _c2a=_c29.target;
if(_c2a==this.targetBinding){
switch(_c29.type){
case Binding.ACTION_POSITIONCHANGED:
this.setPosition(this.targetBinding.getPosition());
_c29.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
this.setDimension(this.targetBinding.getDimension());
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(_c2a.isVisible){
this.show();
this.setPosition(_c2a.getPosition());
this.setDimension(_c2a.getDimension());
}else{
this.hide();
}
break;
}
}
};
ShadowBinding.prototype.setPosition=function(_c2b){
var _c2c=this.offset-this.expand;
this.bindingElement.style.left=new String(_c2b.x+_c2c)+"px";
this.bindingElement.style.top=new String(_c2b.y+_c2c)+"px";
};
ShadowBinding.prototype.setDimension=function(dim){
this.bindingElement.style.width=new String(dim.w+2*this.expand)+"px";
this.bindingElement.style.height=new String(dim.h+2*this.expand)+"px";
};
ShadowBinding.newInstance=function(_c2e){
var _c2f=DOMUtil.createElementNS(Constants.NS_UI,"ui:shadow",_c2e);
return UserInterface.registerBinding(_c2f,ShadowBinding);
};
DockControlImageProfile.prototype=new ControlImageProfile;
DockControlImageProfile.prototype.constructor=DockControlImageProfile;
DockControlImageProfile.superclass=ControlImageProfile.prototype;
DockControlImageProfile.IMAGE_MINIMIZE=Resolver.resolve("${skin}/docks/control-minimize-${string}.png");
DockControlImageProfile.IMAGE_MAXIMIZE=Resolver.resolve("${skin}/docks/control-maximize-${string}.png");
DockControlImageProfile.IMAGE_RESTORE=Resolver.resolve("${skin}/docks/control-restore-${string}.png");
DockControlImageProfile.IMAGE_CLOSE=null;
function DockControlImageProfile(_c30){
this.binding=_c30;
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
DockTabsButtonBinding.newInstance=function(_c31){
var _c32=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_c31);
_c32.setAttribute("type","checkbox");
_c32.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_c32.className="tabbutton";
return UserInterface.registerBinding(_c32,DockTabsButtonBinding);
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
var _c33=DockBinding.superclass.serialize.call(this);
if(_c33){
_c33.active=this.isActive?true:null;
_c33.collapsed=this.isCollapsed?true:null;
}
return _c33;
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
var _c34=UserInterface.getBinding(this.bindingElement.parentNode);
var _c35=MatrixBinding.newInstance(this.bindingDocument);
_c35.attachClassName("dockliner");
this.shadowTree.dockLiner=_c35;
_c34.add(_c35);
_c35.attach();
_c35.manifest();
var type=this.getProperty("type");
this.type=type?type:DockBinding.TYPE_TOOLS;
this.attachClassName(this.type);
if(this.getProperty("active")==true){
this.activate();
}
};
DockBinding.prototype.interceptDisplayChange=function(_c37){
var _c38=this.getSelectedTabPanelBinding();
if(_c38){
_c38.isVisible=_c37;
_c38.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
}
};
DockBinding.prototype.prepareNewView=function(_c39){
var _c3a=this._getBindingForDefinition(_c39);
var _c3b=DockTabBinding.newInstance(this.bindingDocument);
_c3b.setHandle(_c39.handle);
_c3b.setLabel(this.type==DockBinding.TYPE_EDITORS?null:_c39.label);
_c3b.setImage(_c39.image);
_c3b.setToolTip(_c39.toolTip);
_c3b.setEntityToken(_c39.entityToken);
_c3b.setAssociatedView(_c3a);
this.appendTabByBindings(_c3b,null);
this._setupPageBindingListeners(_c3b);
var _c3c=this.getTabPanelBinding(_c3b);
_c3a.snapToBinding(_c3c);
var _c3d=this.bindingWindow.bindingMap.views;
_c3d.add(_c3a);
if(!this.isActive){
this.activate();
}
_c3a.attach();
};
DockBinding.prototype.prepareOpenView=function(_c3e,_c3f){
this.logger.debug("DockBinding.prototype.prepareOpenView: _setupDirtyStuff required?");
_c3f.setLabel(_c3e.label);
_c3f.setImage(_c3e.image);
_c3f.setToolTip(_c3e.toolTip);
this._setupPageBindingListeners(_c3f);
var _c40=this.getTabPanelBinding(_c3f);
var _c41=this._getBindingForDefinition(_c3e);
_c3f.setAssociatedView(_c41);
_c41.snapToBinding(_c40);
UserInterface.getBinding(this.bindingDocument.body).add(_c41);
_c41.attach();
};
DockBinding.prototype._getBindingForDefinition=function(_c42){
var _c43=this.bindingWindow.bindingMap.views;
var view=ViewBinding.newInstance(_c43.bindingDocument);
view.setDefinition(_c42);
return view;
};
DockBinding.prototype._setupPageBindingListeners=function(_c45){
var _c46=this.getTabPanelBinding(_c45);
var self=this;
var _c48={handleAction:function(_c49){
var _c4a=_c49.target;
switch(_c49.type){
case PageBinding.ACTION_ATTACHED:
TabBoxBinding.currentActiveInstance=self;
break;
case PageBinding.ACTION_INITIALIZED:
_c4a.reflex(true);
var view=_c45.getAssociatedView();
if(_c4a.bindingWindow==view.getContentWindow()){
_c45.updateDisplay(_c4a);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_COMPLETED,view.getHandle());
if(StatusBar.state==StatusBar.BUSY){
StatusBar.clear();
}
}
_c45.onPageInitialize(_c4a);
_c49.consume();
break;
case DockTabBinding.ACTION_UPDATE_VISUAL:
_c45.updateDisplay(_c4a);
_c49.consume();
break;
case DockTabBinding.ACTION_UPDATE_TOKEN:
_c45.updateEntityToken(_c4a);
_c49.consume();
break;
case EditorPageBinding.ACTION_DIRTY:
_c45.setDirty(true);
break;
case EditorPageBinding.ACTION_SAVE:
_c45.onSaveStart();
break;
case ViewBinding.ACTION_ONCLOSE:
self.closeTab(_c45);
_c49.consume();
break;
case ViewBinding.ACTION_ONCLOSE_FORCE:
self.closeTab(_c45,true);
_c49.consume();
break;
case DockPanelBinding.ACTION_FORCE_SELECT:
self.select(_c45);
break;
case Binding.ACTION_FORCE_REFLEX:
_c46.reflex(true);
_c49.consume();
break;
case DockTabBinding.ACTION_FORCE_CLEAN:
case EditorPageBinding.ACTION_CLEAN:
if(_c45.isDirty){
_c45.setDirty(false);
}
break;
case WindowBinding.ACTION_ONLOAD:
alert("HWEJ");
break;
}
}};
new List([DockTabBinding.ACTION_UPDATE_VISUAL,DockTabBinding.ACTION_UPDATE_TOKEN,PageBinding.ACTION_ATTACHED,PageBinding.ACTION_INITIALIZED,EditorPageBinding.ACTION_DIRTY,EditorPageBinding.ACTION_CLEAN,EditorPageBinding.ACTION_SAVE,ViewBinding.ACTION_ONCLOSE,ViewBinding.ACTION_ONCLOSE_FORCE,DockPanelBinding.ACTION_FORCE_SELECT,Binding.ACTION_FORCE_REFLEX,DockTabBinding.ACTION_FORCE_CLEAN,WindowBinding.ACTION_ONLOAD]).each(function(_c4c){
_c46.addActionListener(_c4c,_c48);
});
};
DockBinding.prototype.summonTabPanelBinding=function(){
return DockPanelBinding.newInstance(this.bindingDocument);
};
DockBinding.prototype.handleAction=function(_c4d){
DockBinding.superclass.handleAction.call(this,_c4d);
var _c4e=_c4d.target;
switch(_c4d.type){
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_c4d.consume();
break;
case TabBoxBinding.ACTION_UPDATED:
if(_c4e instanceof DockBinding){
if(_c4e.updateType==TabBoxBinding.UPDATE_DETACH){
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
this._viewBindingList.add(_c4e);
if(this.isActive){
_c4e.onActivate();
}
break;
case ViewBinding.ACTION_CLOSED:
this._viewBindingList.del(_c4e);
break;
}
};
DockBinding.prototype.handleBroadcast=function(_c4f,arg){
DockBinding.superclass.handleBroadcast.call(this,_c4f,arg);
switch(_c4f){
case BroadcastMessages.SYSTEMTREENODEBINDING_FOCUS:
var _c51=arg;
if(_c51.perspectiveNode==this.perspectiveNode){
this._selectTabByEntityToken(_c51.node.getEntityToken());
}
break;
}
};
DockBinding.prototype._selectTabByEntityToken=function(_c52){
var tabs=this.getTabBindings();
var _c54=false;
while(tabs.hasNext()&&!_c54){
var tab=tabs.getNext();
var _c56=tab.getEntityToken();
if(_c56!=null&&_c56==_c52){
if(!tab.isSelected){
this.select(tab,true);
_c54=true;
}
}
}
};
DockBinding.prototype.collapse=function(_c57){
this._handleCollapse(true,_c57);
};
DockBinding.prototype.unCollapse=function(_c58){
this._handleCollapse(false,_c58);
};
DockBinding.prototype._handleCollapse=function(_c59,_c5a){
var _c5b=this.getChildBindingByLocalName("dockpanels");
var _c5c=this.getAncestorBindingByLocalName("splitbox");
if(_c59){
_c5b.hide();
this.bindingElement.style.height="auto";
this.isFlexible=false;
this.isActivatable=false;
this.setProperty("collapsed",true);
if(_c5a&&_c5c.hasBothPanelsVisible()){
this.setWidth(200);
}
}else{
_c5b.show();
this.isFlexible=true;
this.isActivatable=true;
this.deleteProperty("collapsed");
if(_c5a){
this.setWidth(false);
}
}
this.interceptDisplayChange(!_c59);
this.isCollapsed=_c59;
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
DockBinding.prototype.closeTab=function(_c61,_c62){
if(_c61.isDirty&&!_c62){
var _c63=Resolver.resolve(_c61.getLabel());
var self=this;
Dialog.question(StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Title"),StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Text").replace("${resourcename}",_c63),Dialog.BUTTONS_YES_NO_CANCEL,{handleDialogResponse:function(_c65){
switch(_c65){
case Dialog.RESPONSE_YES:
setTimeout(function(){
self.saveContainedEditor(_c61);
},0);
break;
case Dialog.RESPONSE_NO:
self.removeTab(_c61);
break;
}
}});
}else{
this.removeTab(_c61);
}
};
DockBinding.prototype.closeTabsExcept=function(_c66){
var tabs=this.getTabBindings();
while(tabs.hasNext()){
var tab=tabs.getNext();
if(tab!=_c66){
this.closeTab(tab);
}
}
};
DockBinding.prototype.saveContainedEditor=function(_c69){
var _c6a=_c69.getAssociatedView();
_c6a.saveContainedEditor();
var self=this;
var _c6c={handleBroadcast:function(_c6d,arg){
switch(_c6d){
case BroadcastMessages.CURRENT_SAVED:
if(arg.handle==_c6a.getHandle()){
EventBroadcaster.unsubscribe(BroadcastMessages.CURRENT_SAVED,_c6c);
if(arg.isSuccess){
self.removeTab(_c69);
}
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.CURRENT_SAVED,_c6c);
};
DockBinding.prototype.appendTabByBindings=function(_c6f,_c70){
if(this.isEmpty){
this.isEmpty=false;
this.isActivatable=true;
this.setWidth(false);
this.dispatchAction(DockBinding.ACTION_OPENED);
}
DockBinding.superclass.appendTabByBindings.call(this,_c6f,_c70);
};
DockBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
DockBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
DockBinding.prototype.setWidth=function(_c71){
_c71=_c71?_c71+"px":"100%";
this.bindingElement.style.width=_c71;
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
DockBinding.prototype.showControls=function(_c72){
var tabs=this.getChildBindingByLocalName(this._nodename_tabs);
if(_c72){
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
var _c75=DockControlBinding.newInstance(this.bindingDocument);
_c75.setControlType(type);
return _c75;
};
DockTabsBinding.prototype.flex=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _c77=self.containingTabBoxBinding.getWidth();
if(!isNaN(_c77)){
_c77=_c77>0?_c77-1:0;
self.bindingElement.style.width=new String(_c77)+"px";
}
}
setTimeout(fix,250);
fix();
}
DockTabsBinding.superclass.flex.call(this);
};
DockTabsBinding.prototype.handleCrawler=function(_c78){
DockTabsBinding.superclass.handleCrawler.call(this,_c78);
switch(_c78.id){
case FlexBoxCrawler.ID:
this._explorerFlexHack();
break;
}
};
DockTabsBinding.prototype._explorerFlexHack=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _c7a=self.containingTabBoxBinding.getWidth();
if(!isNaN(_c7a)){
_c7a=_c7a>0?_c7a-1:0;
self.bindingElement.style.width=new String(_c7a)+"px";
}
}
setTimeout(fix,250);
fix();
}
};
DockTabsBinding.newInstance=function(_c7b){
var _c7c=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktabs",_c7b);
return UserInterface.registerBinding(_c7c,DockTabsBinding);
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
DockTabBinding.prototype.setAssociatedView=function(_c7d){
this._viewBinding=_c7d;
};
DockTabBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
DockTabBinding.prototype.serialize=function(){
var _c7e=DockTabBinding.superclass.serialize.call(this);
if(_c7e){
_c7e.label=null;
_c7e.image=null;
_c7e.handle=this.getHandle();
}
return _c7e;
};
DockTabBinding.prototype.setHandle=function(_c7f){
this.setProperty("handle",_c7f);
};
DockTabBinding.prototype.getHandle=function(){
return this.getProperty("handle");
};
DockTabBinding.prototype.setEntityToken=function(_c80){
if(this._entityToken==null){
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
this._entityToken=_c80;
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
var _c81=DialogControlBinding.newInstance(this.bindingDocument);
_c81.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_c81);
this._controlGroupBinding.attachRecursive();
};
DockTabBinding.prototype.setDirty=function(_c82){
if(this.containingTabBoxBinding.type==DockBinding.TYPE_EDITORS){
if(this.isDirty!=_c82){
this.isDirty=_c82;
if(Binding.exists(this.labelBinding)){
var _c83=this.labelBinding.getLabel();
if(_c83!=null){
this.labelBinding.setLabel(_c82?"*"+_c83:_c83.slice(1,_c83.length));
}else{
this.labelBinding.setLabel(_c82?"*":"");
}
}
}
var _c84=top.app.bindingMap.broadcasterCurrentTabDirty;
if(this.isDirty==true){
this.subscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_DIRTY,this);
_c84.enable();
}else{
this.unsubscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_CLEAN,this);
_c84.disable();
}
}else{
Dialog.warning("Dirty denied","Only editor docks should invoke the dirty state!");
}
};
DockTabBinding.prototype.updateDisplay=function(_c85){
this.setLabel(_c85.getLabel());
this.setImage(_c85.getImage());
this.setToolTip(_c85.getToolTip());
};
DockTabBinding.prototype.updateEntityToken=function(_c86){
this.setEntityToken(_c86.getEntityToken());
};
DockTabBinding.prototype.handleAction=function(_c87){
DockTabBinding.superclass.handleAction.call(this,_c87);
var _c88=_c87.target;
switch(_c87.type){
case ControlBinding.ACTION_COMMAND:
if(_c88.controlType==ControlBinding.TYPE_CLOSE){
this.close();
}
break;
case MenuItemBinding.ACTION_COMMAND:
if(_c87.listener==this.contextMenuBinding){
this._handleContextMenuItemBinding(_c88);
}
break;
}
};
DockTabBinding.prototype._handleContextMenuItemBinding=function(_c89){
var cmd=_c89.getProperty("cmd");
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
DockTabBinding.prototype.setLabel=function(_c8b){
if(!_c8b){
if(!this.getLabel()){
_c8b=DockTabBinding.LABEL_TABLOADING;
}else{
if(this.getLabel()==DockTabBinding.LABEL_TABLOADING){
_c8b=DockTabBinding.LABEL_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setLabel.call(this,_c8b);
};
DockTabBinding.prototype.setImage=function(_c8c){
if(!_c8c){
if(!this.getImage()){
_c8c=DockTabBinding.IMG_TABLOADING;
}else{
if(this.getImage()==DockTabBinding.IMG_TABLOADING){
_c8c=DockTabBinding.IMG_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setImage.call(this,_c8c);
};
DockTabBinding.prototype._viewSource=function(cmd){
var def=ViewDefinitions["Composite.Management.SourceCodeViewer"];
def.argument={action:cmd,doc:this._viewBinding.windowBinding.getContentDocument()};
var _c8f=Resolver.resolve(this.getLabel());
switch(cmd){
case DockTabPopupBinding.CMD_VIEWSOURCE:
def.label="Source: "+_c8f;
break;
case DockTabPopupBinding.CMD_VIEWGENERATED:
def.label="Generated: "+_c8f;
break;
case DockTabPopupBinding.CMD_VIEWSERIALIZED:
def.label="Serialized: "+_c8f;
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
var _c91=this.bindingElement;
setTimeout(function(){
_c91.style.bottom="auto";
},25);
}
};
DockTabBinding.prototype.handleBroadcast=function(_c92,arg){
DockTabBinding.superclass.handleBroadcast.call(this,_c92,arg);
var body=this._viewBinding.getContentDocument().body;
var root=UserInterface.getBinding(body);
switch(_c92){
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
DockTabBinding.prototype.select=function(_c97){
DockTabBinding.superclass.select.call(this,_c97);
this._updateBroadcasters();
if(_c97!=true){
this._updateTree();
}
this._updateGlobalEntityToken();
};
DockTabBinding.prototype.close=function(){
this.containingTabBoxBinding.closeTab(this);
};
DockTabBinding.prototype._updateBroadcasters=function(){
if(this.isSelected){
var _c98=top.app.bindingMap.broadcasterCurrentTabDirty;
var _c99=top.app.bindingMap.broadcasterCurrentIsEditor;
if(this._isEditorDockTab()){
_c99.enable();
if(this.isDirty){
_c98.enable();
}else{
_c98.disable();
}
}else{
_c99.disable();
_c98.disable();
}
}
};
DockTabBinding.prototype._updateTree=function(_c9a){
if(this._canUpdateTree||_c9a){
EventBroadcaster.broadcast(BroadcastMessages.DOCKTABBINDING_SELECT,this);
}
};
DockTabBinding.prototype._isEditorDockTab=function(){
var _c9b=false;
if(this._viewBinding!=null){
var win=this._viewBinding.getContentWindow();
if(win!=null&&win.bindingMap!=null){
var _c9d=win.bindingMap.savebutton;
if(_c9d!=null){
_c9b=true;
}
}
}
return _c9b;
};
DockTabBinding.prototype._updateGlobalEntityToken=function(){
StageBinding.entityToken=this._entityToken;
};
DockTabBinding.newInstance=function(_c9e){
var _c9f=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktab",_c9e);
return UserInterface.registerBinding(_c9f,DockTabBinding);
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
DockPanelsBinding.newInstance=function(_ca0){
var _ca1=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanels",_ca0);
return UserInterface.registerBinding(_ca1,DockPanelsBinding);
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
DockPanelBinding.prototype.select=function(_ca2){
DockPanelBinding.superclass.select.call(this,_ca2);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.unselect=function(){
DockPanelBinding.superclass.unselect.call(this);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.flex=function(){
this.dispatchAction(Binding.ACTION_DIMENSIONCHANGED);
};
DockPanelBinding.prototype.handleCrawler=function(_ca3){
DockPanelBinding.superclass.handleCrawler.call(this,_ca3);
if(_ca3.response==null){
if(_ca3.type==NodeCrawler.TYPE_DESCENDING){
if(this.viewBinding!=null){
if(_ca3.id==FocusCrawler.ID){
_ca3.nextNode=this.viewBinding.bindingElement;
}
}
}
}
};
DockPanelBinding.newInstance=function(_ca4){
var _ca5=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanel",_ca4);
return UserInterface.registerBinding(_ca5,DockPanelBinding);
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
DockControlBinding.newInstance=function(_ca6){
var _ca7=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_ca6);
return UserInterface.registerBinding(_ca7,DockControlBinding);
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
ViewBinding.getInstance=function(_ca8){
var _ca9=ViewBinding._instances.get(_ca8);
if(!_ca9){
var cry="ViewBinding.getInstance: No such instance: "+_ca8;
SystemLogger.getLogger("ViewBinding [static]").error(cry);
SystemDebug.stack(arguments);
if(Application.isDeveloperMode){
alert(cry);
}
}
return _ca9;
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
var _cac=!System.hasActivePerspectives&&Client.isExplorer;
if(this.isFreeFloating==true&&!_cac){
if(snap.isVisible==true){
if(snap.isAttached==true){
var _cad=snap.boxObject.getGlobalPosition();
var _cae=snap.boxObject.getDimension();
if(!Point.isEqual(_cad,this._lastknownposition)){
this.setPosition(_cad);
this._lastknownposition=_cad;
}
if(!Dimension.isEqual(_cae,this._lastknowndimension)){
this.setDimension(_cae);
this._lastknowndimension=_cae;
var _caf=_cae.h-ViewBinding.VERTICAL_ADJUST;
_caf=_caf<0?0:_caf;
this.windowBinding.getBindingElement().style.height=new String(_caf)+"px";
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
var _cb0=this._viewDefinition.flowHandle;
if(_cb0!=null){
FlowControllerService.CancelFlow(_cb0);
}
}
if(this._viewDefinition!=null){
var _cb1=this._viewDefinition.handle;
EventBroadcaster.broadcast(BroadcastMessages.VIEW_CLOSED,_cb1);
this.logger.fine("ViewBinding closed: \""+_cb1+"\"");
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
var _cb3=null;
if(this._viewDefinition!=null){
_cb3=this._viewDefinition.handle;
}
return _cb3;
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
ViewBinding.prototype.setDefinition=function(_cb4){
this._viewDefinition=_cb4;
if(_cb4.flowHandle!=null){
this.subscribe(BroadcastMessages.CLOSE_VIEWS);
}
};
ViewBinding.prototype.getDefinition=function(){
return this._viewDefinition;
};
ViewBinding.prototype.handleAction=function(_cb5){
ViewBinding.superclass.handleAction.call(this,_cb5);
var _cb6=_cb5.target;
switch(_cb5.type){
case RootBinding.ACTION_PHASE_1:
case RootBinding.ACTION_PHASE_2:
case RootBinding.ACTION_PHASE_3:
if(_cb5.type==RootBinding.ACTION_PHASE_1){
if(this.isActivated&&!_cb6.isActivated){
_cb6.onActivate();
}
}
_cb5.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
if(this.isFreeFloating==true){
if(_cb6==this._snapBinding){
if(this.isVisible==true){
this.updatePositionDimension();
_cb5.consume();
}
}
}
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(this.isFreeFloating==true){
if(_cb6==this._snapBinding){
if(_cb6.isVisible==true){
this.show();
}else{
this.hide();
}
}
}
break;
case WindowBinding.ACTION_LOADED:
case WindowBinding.ACTION_ONLOAD:
if(_cb6.getContentWindow().isPostBackDocument){
if(_cb5.type==WindowBinding.ACTION_ONLOAD){
var arg=this._viewDefinition.argument;
if(arg!=null&&arg.list!=null&&arg.url!=null){
_cb6.post(arg.list,arg.url);
arg.list=null;
arg.url=null;
}
}
}else{
if(Client.isExplorer==true){
if(_cb6==this.windowBinding){
var self=this;
DOMEvents.addEventListener(_cb6.getContentWindow(),DOMEvents.UNLOAD,{handleEvent:function(e){
if(Binding.exists(self._coverBinding)==true){
self._coverBinding.show();
}
}});
}
if(_cb5.type==WindowBinding.ACTION_ONLOAD){
if(this._coverBinding){
this._coverBinding.hide();
}
}
}
}
if(_cb5.type==WindowBinding.ACTION_ONLOAD){
var win=_cb6.getContentWindow();
if(win.WindowManager==null){
if(!this._isLoaded){
this._onLoadingCompleted(_cb6);
}
}
}
_cb5.consume();
break;
case PageBinding.ACTION_ATTACHED:
if(!_cb6.label&&this._viewDefinition.label){
_cb6.label=this._viewDefinition.label;
}
if(!_cb6.image&&this._viewDefinition.image){
_cb6.image=this._viewDefinition.image;
}
if(_cb6.bindingWindow==this.getContentWindow()){
this._pageBinding=_cb6;
this._injectPageArgument();
}
case PageBinding.ACTION_INITIALIZED:
if(_cb6.bindingWindow==this.getContentWindow()){
if(Client.isExplorer&&this._coverBinding){
this._coverBinding.hide();
}
if(!this._isLoaded){
this._onLoadingCompleted();
}
}
break;
case Binding.ACTION_DISPOSED:
if(this.isFreeFloating&&_cb6==this._snapBinding){
this.removeActionListener(Binding.ACTION_DISPOSED);
this.dispose();
_cb5.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
case WizardPageBinding.ACTION_FINISH:
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
_cb5.consume();
break;
case ViewBinding.ACTION_DETACH:
this.setDefinition(ViewDefinitions["Composite.Management.Null"]);
ViewBinding._instances.set(this._viewDefinition.handle,this);
break;
}
};
ViewBinding.prototype.handleBroadcast=function(_cbb,arg){
ViewBinding.superclass.handleBroadcast.call(this,_cbb,arg);
switch(_cbb){
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
var _cbf=def.argument;
if(_cbf!=null){
page.setPageArgument(_cbf);
}
var _cc0=def.width;
if(_cc0!=null){
page.width=_cc0;
}
var _cc1=def.height;
if(_cc1!=null){
page.height=_cc1;
}
}
};
ViewBinding.prototype.handleCrawler=function(_cc2){
ViewBinding.superclass.handleCrawler.call(this,_cc2);
switch(_cc2.type){
case NodeCrawler.TYPE_DESCENDING:
if(this.isFreeFloating==true){
if(_cc2.id==FocusCrawler.ID){
if(_cc2.previousNode!=this._snapBinding.bindingElement){
_cc2.response=NodeCrawler.SKIP_NODE;
}
}
}
break;
case NodeCrawler.TYPE_ASCENDING:
if(this.isFreeFloating==true){
_cc2.nextNode=this._snapBinding.bindingElement;
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
ViewBinding.prototype.setPosition=function(_cc3){
_cc3.x+=ViewBinding.HORIZONTAL_ADJUST;
this.bindingElement.style.left=_cc3.x+"px";
this.bindingElement.style.top=_cc3.y+"px";
};
ViewBinding.prototype.setDimension=function(_cc4){
_cc4.h-=ViewBinding.VERTICAL_ADJUST;
_cc4.w-=ViewBinding.HORIZONTAL_ADJUST;
_cc4.w-=1;
if(_cc4.h<0){
_cc4.h=0;
}
if(_cc4.w<0){
_cc4.w=0;
}
this.bindingElement.style.width=String(_cc4.w)+"px";
this.bindingElement.style.height=String(_cc4.h)+"px";
};
ViewBinding.prototype.snapToBinding=function(_cc5){
this.isFlexBoxBehavior=false;
_cc5.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_cc5.addActionListener(Binding.ACTION_POSITIONCHANGED,this);
_cc5.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_cc5.addActionListener(Binding.ACTION_DISPOSED,this);
if(this._snapBinding){
this._snapBinding.removeActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_POSITIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_DISPOSED,this);
this._snapBinding.viewBinding=null;
}
this._snapBinding=_cc5;
this._snapBinding.viewBinding=this;
this.isFreeFloating=true;
if(!this._isViewBindingInitialized){
this.initialize();
}
};
ViewBinding.prototype.getMigrationParent=function(){
var _cc6=null;
if(this.isFreeFloating==true){
_cc6=this._snapBinding.getBindingElement();
}else{
_cc6=ViewBinding.superclass.getMigrationParent.call(this);
}
return _cc6;
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
ViewBinding.prototype.reload=function(_cc7){
this._isLoaded=false;
this.windowBinding.reload(_cc7);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
};
ViewBinding.prototype.saveContainedEditor=function(){
var _cc8=false;
var page=this._pageBinding;
if(page!=null&&page instanceof EditorPageBinding){
if(page.canSave()){
page.doSave();
_cc8=true;
}
}
if(!_cc8){
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
ViewBinding.newInstance=function(_ccc){
var _ccd=DOMUtil.createElementNS(Constants.NS_UI,"ui:view",_ccc);
var _cce=UserInterface.registerBinding(_ccd,ViewBinding);
_cce.windowBinding=_cce.add(WindowBinding.newInstance(_ccc));
_cce.windowBinding.isFlexible=false;
return _cce;
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
var _cd6=this.bindingWindow.__doPostBack;
var _cd7=false;
if(!form.__isSetup){
DOMEvents.addEventListener(this.bindingWindow,DOMEvents.UNLOAD,{handleEvent:function(){
if(_cd7){
Application.unlock(self);
}
}});
}
this.bindingWindow.__doPostBack=function(_cd8,_cd9){
if(!form.__isSetup){
Application.lock(self);
_cd7=true;
}
self.manifestAllDataBindings();
_cd6(_cd8,_cd9);
if(Application.isDeveloperMode){
self._debugDotNetPostback();
}
};
};
PageBinding.prototype.postMessage=function(_cda,list){
var _cdc=this.bindingWindow.bindingMap.__REQUEST;
if(_cdc!=null&&this._isDotNet()){
switch(_cda){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_PERSIST:
if(this.bindingWindow.DataManager.isDirty){
if(this.validateAllDataBindings()){
if(list!=null){
list.add(this);
}
_cdc.postback(_cda);
}
}
break;
default:
_cdc.postback(_cda);
break;
}
}
if(list!=null){
this._postMessageToDescendants(_cda,list);
}
};
PageBinding.prototype._postMessageToDescendants=function(_cdd,list){
var _cdf=this.getDescendantBindingsByType(WindowBinding);
_cdf.each(function(win){
var page=win.getPageBinding();
if(page!=null){
page.postMessage(_cdd,list);
}
});
};
PageBinding.prototype._debugDotNetPostback=function(){
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_ce3){
list.add({name:_ce3.name,value:_ce3.value});
});
var out="";
list.each(function(_ce5){
out+=_ce5.name+": "+_ce5.value+"\n";
});
this.logger.debug(out);
};
PageBinding.prototype.handleAction=function(_ce6){
PageBinding.superclass.handleAction.call(this,_ce6);
var _ce7=_ce6.target;
switch(_ce6.type){
case RootBinding.ACTION_PHASE_3:
if(_ce7==UserInterface.getBinding(this.bindingDocument.body)){
_ce7.removeActionListener(RootBinding.ACTION_PHASE_3,this);
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
this.doPostBack(_ce7);
}
_ce6.consume();
break;
case PageBinding.ACTION_DOVALIDATEDPOSTBACK:
if(this._isDotNet()){
var _ce8=this.validateAllDataBindings();
if(_ce8){
this.doPostBack(_ce7);
}
}
_ce6.consume();
break;
case BalloonBinding.ACTION_INITIALIZE:
_ce6.consume();
break;
case PageBinding.ACTION_BLOCK_INIT:
if(this._initBlockers==null){
this._initBlockers=new Map();
}
this._initBlockers.set(_ce7.key,true);
break;
case PageBinding.ACTION_UNBLOCK_INIT:
if(this._initBlockers!=null){
if(this._initBlockers.has(_ce7.key)){
this._initBlockers.del(_ce7.key);
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
var _cea={handleAction:function(_ceb){
if(_ceb.target==self){
self.removeActionListener(PageBinding.ACTION_UPDATED,_cea);
MessageQueue.udpdate();
}
}};
this.addActionListener(PageBinding.ACTION_UPDATED,_cea);
}else{
MessageQueue.udpdate();
}
_ce6.consume();
break;
}
};
PageBinding.prototype.handleBroadcast=function(_cec,arg){
PageBinding.superclass.handleBroadcast.call(this,_cec,arg);
switch(_cec){
case BroadcastMessages.MESSAGEQUEUE_REQUESTED:
var _cee=arg;
if(!this._canPostBack&&!_cee){
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
PageBinding.prototype.doPostBack=function(_cf0){
if(this._canPostBack){
if(_cf0!=null&&this._isDotNet()){
var _cf1=_cf0.getCallBackID();
var _cf2=_cf0.getCallBackArg();
if(_cf1!=null){
_cf1=_cf1.replace(/_/g,"$");
}else{
_cf1="";
}
if(_cf2==null){
_cf2="";
}
this.bindingWindow.__doPostBack(_cf1,_cf2);
}
}
};
PageBinding.prototype.validateAllDataBindings=function(){
var _cf3=true;
var _cf4=this.bindingWindow.DataManager.getAllDataBindings();
while(_cf4.hasNext()&&_cf3){
var _cf5=_cf4.getNext();
if(_cf5.isAttached){
var _cf6=_cf5.validate();
if(_cf3&&!_cf6){
_cf3=false;
this.logger.debug("Invalid DataBinding: "+_cf5.toString()+" ("+_cf5.getName()+")");
break;
}
}
}
return _cf3;
};
PageBinding.prototype.manifestAllDataBindings=function(){
var list=new List();
var _cf8=this.bindingWindow.DataManager.getAllDataBindings();
while(_cf8.hasNext()){
var _cf9=_cf8.getNext();
if(_cf9.isAttached){
var _cfa=_cf9.manifest();
if(_cfa!=null){
list.add(_cfa);
}
}
}
return list;
};
PageBinding.prototype.cleanAllDataBindings=function(){
var _cfb=this.bindingWindow.DataManager.getAllDataBindings();
while(_cfb.hasNext()){
var _cfc=_cfb.getNext();
if(_cfc.isAttached){
_cfc.clean();
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
var _cfe=this._cachedFocus.getBinding();
if(_cfe){
_cfe.blur();
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
var _cff=this.getProperty("width");
if(!_cff){
_cff=this.hasClassName(DialogPageBinding.CLASSNAME_TABBOXED)?DialogPageBinding.DEFAULT_TABBOXED_WIDTH:DialogPageBinding.DEFAULT_WIDTH;
}
this.width=_cff;
}
if(this.height==null){
var _d00=this.getProperty("height");
this.height=_d00?_d00:DialogPageBinding.DEFAULT_HEIGHT;
}
if(this.minheight==null){
var _d01=this.getProperty("minheight");
if(_d01!=null){
this.minheight=_d01;
}
}
if(this.controls==null){
var _d02=this.getProperty("controls");
this.controls=_d02?_d02:DialogPageBinding.DEFAULT_CONTROLS;
}
if(!this.isResizable){
var _d03=this.getProperty("resizable");
this.isResizable=_d03?_d03:DialogPageBinding.DEFAULT_RESIZABLE;
}
if(this.height=="auto"){
this.enableAutoHeightLayoutMode(true);
}
};
DialogPageBinding.prototype.enableAutoHeightLayoutMode=function(_d04){
if(_d04!=this.isAutoHeightLayoutMode){
if(_d04){
this.attachClassName("auto");
}else{
this.detachClassName("auto");
}
this.isAutoHeightLayoutMode=_d04;
}
};
DialogPageBinding.prototype.handleAction=function(_d05){
DialogPageBinding.superclass.handleAction.call(this,_d05);
var _d06=_d05.target;
switch(_d05.type){
case PageBinding.ACTION_ATTACHED:
if(_d06!=this&&_d06.isFitAsDialogSubPage){
_d06.makeDialogSubPage();
}
break;
case ButtonBinding.ACTION_COMMAND:
_d05.consume();
if(_d06.response!=null){
this.response=_d06.response;
switch(_d06.response){
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
DialogPageBinding.prototype._disableAcceptButton=function(_d07){
var _d08=this.bindingWindow.bindingMap.buttonAccept;
if(_d08!=null){
_d08.setDisabled(_d07);
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
DialogPageBodyBinding.prototype._setFitnessHeight=function(_d09){
var _d0a=CSSComputer.getPadding(this.bindingElement);
var _d0b=CSSComputer.getBorder(this.bindingElement);
_d09+=_d0a.top+_d0a.bottom;
_d09+=_d0b.top+_d0b.bottom;
if(_d09>this.bindingElement.offsetHeight){
this.bindingElement.style.height=_d09+"px";
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
EditorPageBinding.prototype.handleAction=function(_d13){
EditorPageBinding.superclass.handleAction.call(this,_d13);
var _d14=_d13.target;
switch(_d13.type){
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
var _d15=-1;
this._messengers.each(function(page){
var res=page.bindingWindow==_d14.bindingWindow;
if(res){
page.bindingWindow.DataManager.isDirty=false;
if(_d15==-1){
_d15=0;
}
}else{
_d15++;
}
return res;
});
if(_d15>-1){
this._messengers.del(_d15);
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
_d13.consume();
break;
case Binding.ACTION_INVALID:
this.enableSave(false);
this._invalidBindings.set(_d14.key,_d14);
if(_d14 instanceof FieldsBinding){
this._updateStatusBar();
}
break;
case Binding.ACTION_VALID:
this._invalidBindings.del(_d14.key);
if(_d14 instanceof FieldsBinding){
this._updateStatusBar();
}
if(!this._invalidBindings.hasEntries()){
this.enableSave(true);
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_d14==this._tabBoxBinding){
if(this._windowBinding!=null){
var tab=_d14.getSelectedTabBinding();
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
_d13.consume();
break;
case TabBoxBinding.ACTION_UNSELECTED:
if(_d14==this._tabBoxBinding){
this.postMessage(EditorPageBinding.MESSAGE_PERSIST);
}
_d13.consume();
break;
case WindowBinding.ACTION_LOADED:
if(_d14==this._windowBinding){
if(this._isGeneratingPreview==true){
this._generatePreview();
this._isGeneratingPreview=false;
}
_d13.consume();
}
break;
case WindowBinding.ACTION_ONLOAD:
if(_d14==this._windowBinding){
if(_d14.getContentWindow().isPostBackDocument!=true){
if(Client.isPrism){
Prism.enableCache();
}
var self=this;
setTimeout(function(){
Application.unlock(self);
},100);
if(EventBroadcaster.hasSubscribers(BroadcastMessages.XHTML_MARKUP_ON)){
var _d1a=WindowBinding.getMarkup(this._windowBinding);
if(_d1a!=null){
EventBroadcaster.broadcast(BroadcastMessages.XHTML_MARKUP_ON,_d1a);
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
var _d1b=this.bindingWindow.bindingMap.savebutton;
if(_d1b!=null&&!_d1b.isDisabled){
_d1b.fireCommand();
}
};
EditorPageBinding.prototype._saveEditorPage=function(){
if(Application.isDeveloperMode){
}
if(this.validateAllDataBindings()){
this.bindingWindow.DataManager.isDirty=false;
var _d1c=this.bindingWindow.bindingMap.__REQUEST;
if(_d1c!=null){
_d1c.postback(EditorPageBinding.MESSAGE_SAVE);
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
EditorPageBinding.prototype.postMessage=function(_d1d){
this._message=null;
switch(_d1d){
case EditorPageBinding.MESSAGE_SAVE:
this._postMessageToDescendants(_d1d,this._messengers);
if(!this._messengers.hasEntries()){
this._saveEditorPage();
}else{
this._message=_d1d;
}
break;
case EditorPageBinding.MESSAGE_PERSIST:
this._message=_d1d;
EditorPageBinding.superclass.postMessage.call(this,_d1d,this._messengers);
break;
case EditorPageBinding.MESSAGE_REFRESH:
EditorPageBinding.superclass.postMessage.call(this,_d1d,this._messengers);
break;
}
};
EditorPageBinding.prototype.handleBroadcast=function(_d1e,arg){
EditorPageBinding.superclass.handleBroadcast.call(this,_d1e,arg);
switch(_d1e){
case BroadcastMessages.HIGHLIGHT_KEYWORDS:
var _d20=arg;
if(UserInterface.isBindingVisible(this._windowBinding)){
WindowBinding.highlightKeywords(this._windowBinding,_d20);
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
var _d21=new List();
this._invalidBindings.each(function(key,_d23){
var list=_d23.getInvalidLabels();
if(list){
list.each(function(_d25){
_d21.add(_d25);
});
}
});
if(_d21.hasEntries()){
var _d26="";
while(_d21.hasNext()){
_d26+=_d21.getNext().toLowerCase();
if(_d21.hasNext()){
_d26+=", ";
}else{
_d26+=".";
}
}
var _d27=StringBundle.getString("ui","Website.App.StatusBar.ErrorInField");
StatusBar.error(_d27+" "+_d26);
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
EditorPageBinding.prototype.enableSave=function(_d28){
var _d29=this.bindingDocument.getElementById("broadcasterCanSave");
if(_d29){
var _d2a=UserInterface.getBinding(_d29);
if(_d28){
_d2a.enable();
}else{
_d2a.disable();
}
}else{
throw new Error("A required BroadcasterBinding could not be located.");
}
};
EditorPageBinding.prototype.enableSaveAs=function(){
var _d2b=this.bindingDocument.getElementById(EditorPageBinding.ID_SAVEASBUTTON);
if(_d2b!=null){
UserInterface.getBinding(_d2b).enable();
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
var _d2c=this._windowBinding.getContentDocument().title;
if(_d2c==WindowBinding.POSTBACK_TITLE){
if(this.validateAllDataBindings()){
this.manifestAllDataBindings();
var _d2d=this._tabBinding.getCallBackID();
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d2f){
if(_d2f.name=="__EVENTTARGET"&&_d2d){
_d2f.value=_d2d;
}
list.add({name:_d2f.name,value:_d2f.value});
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
WizardPageBinding.prototype.handleAction=function(_d31){
WizardPageBinding.superclass.handleAction.call(this,_d31);
var _d32=_d31.target;
switch(_d31.type){
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_FINISH:
if(this.validateAllDataBindings()==true){
this.doPostBack(_d32);
}else{
_d31.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
this.doPostBack(_d32);
break;
case Binding.ACTION_INVALID:
this._enableNextAndFinish(false);
_d31.consume();
break;
case Binding.ACTION_VALID:
this._enableNextAndFinish(true);
_d31.consume();
break;
}
};
WizardPageBinding.prototype._enableNextAndFinish=function(_d33){
var next=this.bindingWindow.bindingMap.nextbutton;
var _d35=this.bindingWindow.bindingMap.finishbutton;
if(next){
next.setDisabled(!_d33);
}
if(_d35){
_d35.setDisabled(!_d33);
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
MarkupAwarePageBinding.prototype.handleBroadcast=function(_d36,arg){
MarkupAwarePageBinding.superclass.handleBroadcast.call(this,_d36,arg);
var self=this;
switch(_d36){
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
MarkupAwarePageBinding.prototype._handleMarkup=function(_d3a){
};
MarkupAwarePageBinding.prototype._activate=function(_d3b){
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
var _d3c=this.bindingWindow.bindingMap.moreactionstoolbargroup;
this._moreActionsWidth=_d3c.boxObject.getDimension().w;
_d3c.hide();
var _d3d=this.boxObject.getDimension().h;
this.bindingElement.style.height=_d3d+"px";
var self=this;
var _d3f=this.bindingWindow.bindingMap.moreactionsbutton;
_d3f.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_d40){
self._showMoreActions();
_d40.consume();
}});
var _d41=this.bindingWindow.bindingMap.moreactionspopup;
_d41.addActionListener(MenuItemBinding.ACTION_COMMAND,{handleAction:function(_d42){
var item=_d42.target;
self._handleSystemAction(item.associatedSystemAction);
}});
SystemToolBarBinding.superclass.onBindingInitialize.call(this);
};
SystemToolBarBinding.prototype.handleBroadcast=function(_d44,arg){
SystemToolBarBinding.superclass.handleBroadcast.call(this,_d44,arg);
switch(_d44){
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
var _d48=self.bindingWindow.bindingMap.moreactionstoolbargroup;
if(_d48!=null){
_d48.hide();
}
},0);
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
var _d49=this.bindingWindow.WindowManager;
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
var _d4a=new String("");
this._actionProfile.each(function(_d4b,list){
list.each(function(_d4d){
_d4a+=_d4d.getHandle()+";";
});
});
return _d4a;
};
SystemToolBarBinding.prototype.handleAction=function(_d4e){
SystemToolBarBinding.superclass.handleAction.call(this,_d4e);
switch(_d4e.type){
case ButtonBinding.ACTION_COMMAND:
var _d4f=_d4e.target;
this._handleSystemAction(_d4f.associatedSystemAction);
break;
}
};
SystemToolBarBinding.prototype._handleSystemAction=function(_d50){
if(_d50!=null){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _d52=list.getFirst();
var _d53=_d52.node;
}
SystemAction.invoke(_d50,_d53);
}
};
SystemToolBarBinding.prototype.buildLeft=function(){
if(this.isInitialized&&this._actionProfile!=null&&this._actionProfile.hasEntries()){
var doc=this.bindingDocument;
var self=this;
this._actionProfile.each(function(_d56,list){
var _d58=new List();
list.reset();
while(list.hasNext()){
var _d59=list.getNext();
var _d5a=null;
if(_d59.isInToolBar()){
if(_d59.isInFolder()){
alert("IsInFolder not implemented!");
}else{
_d5a=self.getToolBarButtonBinding(_d59);
}
}
if(_d5a!=null){
_d58.add(_d5a);
}
}
if(_d58.hasEntries()){
var _d5b=ToolBarGroupBinding.newInstance(doc);
_d58.each(function(_d5c){
_d5b.add(_d5c);
});
self.addLeft(_d5b);
}
});
this.attachRecursive();
this._containAllButtons();
}
};
SystemToolBarBinding.prototype._containAllButtons=function(){
var _d5d=this.bindingWindow.bindingMap.toolsbutton;
var _d5e=this.bindingWindow.bindingMap.moreactionstoolbargroup;
var _d5f=_d5d.bindingElement.offsetLeft-this._moreActionsWidth;
var _d60=0;
var _d61=new List();
var _d62,_d63=this._toolBarBodyLeft.getDescendantBindingsByLocalName("toolbarbutton");
while((_d62=_d63.getNext())!=null){
if(!_d62.isVisible){
_d62.show();
}
_d60+=_d62.boxObject.getDimension().w;
if(_d60>=_d5f){
_d61.add(_d62);
_d62.hide();
}
}
if(_d61.hasEntries()){
var _d64=_d61.getFirst().bindingElement.parentNode;
UserInterface.getBinding(_d64).setLayout(ToolBarGroupBinding.LAYOUT_LAST);
this._moreActions=new List();
while((_d62=_d61.getNext())!=null){
this._moreActions.add(_d62.associatedSystemAction);
}
_d5e.show();
}else{
this._moreActions=null;
_d5e.hide();
}
};
SystemToolBarBinding.prototype._showMoreActions=function(){
if(this._moreActions!=null){
var _d65=this.bindingWindow.bindingMap.moreactionspopup;
_d65.empty();
while((action=this._moreActions.getNext())!=null){
var item=MenuItemBinding.newInstance(_d65.bindingDocument);
item.setLabel(action.getLabel());
item.setToolTip(action.getToolTip());
item.imageProfile=new ImageProfile({image:action.getImage(),imageDisabled:action.getDisabledImage()});
if(action.isDisabled()){
item.disable();
}
item.associatedSystemAction=action;
_d65.add(item);
}
_d65.attachRecursive();
this._moreActions=null;
}
};
SystemToolBarBinding.prototype.getToolBarButtonBinding=function(_d67){
var _d68=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _d69=_d67.getLabel();
var _d6a=_d67.getToolTip();
var _d6b=_d67.getImage();
var _d6c=_d67.isDisabled();
if(_d6b&&_d6b.indexOf("size=")==-1){
_d6b=_d6b+"&size="+this.getImageSize();
_d68.imageProfile=new ImageProfile({image:_d6b});
}
if(_d69){
_d68.setLabel(_d69);
}
if(_d6a){
_d68.setToolTip(_d6a);
}
if(_d67.isDisabled()){
_d68.disable();
}
_d68.associatedSystemAction=_d67;
return _d68;
};
SystemToolBarBinding.prototype._invokeDefaultAction=function(){
var _d6d=this.getDescendantBindingByLocalName("toolbarbutton");
if(_d6d!=null){
_d6d.fireCommand();
}
};
SystemToolBarBinding.newInstance=function(_d6e){
var _d6f=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_d6e);
return UserInterface.registerBinding(_d6f,SystemToolBarBinding);
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
SystemTreeBinding.prototype.add=function(_d70){
var _d71=SystemTreeBinding.superclass.add.call(this,_d70);
if(!this._defaultTreeNode){
if(_d70 instanceof SystemTreeNodeBinding){
this._defaultTreeNode=_d70;
}
}
return _d71;
};
SystemTreeBinding.prototype.handleAction=function(_d72){
SystemTreeBinding.superclass.handleAction.call(this,_d72);
var _d73=_d72.target;
switch(_d72.type){
case TreeNodeBinding.ACTION_ONFOCUS:
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
this._restorableFocusHandle=null;
this._handleSystemTreeFocus();
break;
case SystemTreeNodeBinding.ACTION_REFRESHED_YEAH:
this._updateRefreshingTrees(_d73.key);
_d72.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
case TreeNodeBinding.ACTION_BLUR:
var self=this;
setTimeout(function(){
if(!self._focusedTreeNodeBindings.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,null);
}
},0);
if(_d72.type==TreeNodeBinding.ACTION_BLUR){
this._restorableFocusHandle=_d73.getHandle();
}
break;
case TreeNodeBinding.ACTION_COMMAND:
EventBroadcaster.broadcast(BroadcastMessages.INVOKE_DEFAULT_ACTION);
_d72.consume();
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
var _d75=this._treeNodeBindings.get(this._restorableFocusHandle);
this.focusSingleTreeNodeBinding(_d75);
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
SystemTreeBinding.prototype.registerTreeNodeBinding=function(_d76){
SystemTreeBinding.superclass.registerTreeNodeBinding.call(this,_d76);
var reg=this._entityTokenRegistry;
var _d78=_d76.node.getEntityToken();
if(reg.has(_d78)){
reg.get(_d78).add(_d76);
}else{
reg.set(_d78,new List([_d76]));
}
var _d79=null;
if(this.isLockedToEditor){
if(_d78==StageBinding.entityToken){
if(_d76.node.isTreeLockEnabled()){
_d79=_d76;
}
}
}else{
if(this._backupfocushandle!=null){
if(this._backupfocushandle==_d76.node.getHandle()){
_d79=_d76;
}
}
}
if(_d79!=null){
this.focusSingleTreeNodeBinding(_d79);
}
};
SystemTreeBinding.prototype.unRegisterTreeNodeBinding=function(_d7a){
SystemTreeBinding.superclass.unRegisterTreeNodeBinding.call(this,_d7a);
var reg=this._entityTokenRegistry;
var _d7c=_d7a.node.getEntityToken();
if(reg.has(_d7c)){
var list=reg.get(_d7c);
list.del(_d7a);
if(!list.hasEntries()){
reg.del(_d7c);
}
}else{
this.logger.fatal("SystemTreeBinding out of synch: unRegisterTreeNodeBinding");
if(Application.isDeveloperMode){
Dialog.error("Attention Developer","Tree is out of synch. Please reproduce this bug and file a report.");
}
}
if(_d7a.isRefreshing){
this._updateRefreshingTrees(binding.key);
}
if(!this.isLockedToEditor){
if(_d7a.isFocused&&this._backupfocushandle==null){
this._backupfocushandle=_d7a.node.getHandle();
var self=this;
setTimeout(function(){
self._backupfocushandle=null;
},200);
}
}
};
SystemTreeBinding.prototype._updateRefreshingTrees=function(key){
var _d80=this._refreshingTreeNodes;
if(_d80.hasEntries()&&_d80.has(key)){
_d80.del(key);
if(!_d80.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this._refreshToken);
this._refreshToken=null;
this._attemptRestorableFocus();
}
}
};
SystemTreeBinding.prototype._computeClipboardSetup=function(){
var _d81=false;
var _d82=this.getFocusedTreeNodeBindings();
if(_d82.hasEntries()){
_d81=true;
while(_d81&&_d82.hasNext()){
var _d83=_d82.getNext();
if(!_d83.isDraggable){
_d81=false;
}
}
}
SystemTreePopupBinding.isCutAllowed=_d81;
};
SystemTreeBinding.prototype._computeRefreshSetup=function(){
SystemTreePopupBinding.isRefreshAllowed=SystemTreeBinding.clipboard===null;
};
SystemTreeBinding.prototype.handleBroadcast=function(_d84,arg){
SystemTreeBinding.superclass.handleBroadcast.call(this,_d84,arg);
switch(_d84){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
if(arg!=null||this.isFocused){
this._handleCommandBroadcast(_d84,arg);
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
if(this.isFocused){
this._handleCommandBroadcast(_d84);
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
var _d88=tab.perspectiveNode==null;
if(!_d88){
_d88=tab.perspectiveNode==this.perspectiveNode;
}
if(_d88){
var self=this,_d8a=tab.getEntityToken();
setTimeout(function(){
if(_d8a==null){
self.blurSelectedTreeNodes();
}else{
self._focusTreeNodeByEntityToken(_d8a);
}
},250);
}
};
SystemTreeBinding.prototype._focusTreeNodeByEntityToken=function(_d8b,_d8c){
this.isLockFeatureFocus=true;
var _d8d=null;
if(this._entityTokenRegistry.has(_d8b)){
var list=this._entityTokenRegistry.get(_d8b);
list.each(function(tn){
var _d90=true;
if(tn.node.isTreeLockEnabled()){
_d8d=tn;
_d90=false;
}
return _d90;
});
if(_d8d!=null){
if(!_d8d.isFocused){
this.focusSingleTreeNodeBinding(_d8d,true);
}else{
_d8d.dispatchAction(TreeNodeBinding.ACTION_FOCUSED);
}
}
}
this.isLockFeatureFocus=false;
if(_d8d==null&&_d8c!=true){
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._fetchTreeForEntityToken(_d8b);
self._focusTreeNodeByEntityToken(_d8b,true);
}
Application.unlock(self);
StatusBar.clear();
},0);
}
};
SystemTreeBinding.prototype._fetchTreeForEntityToken=function(_d92){
var _d93=StageBinding.perspectiveNode.getEntityToken();
var _d94=this.getOpenSystemNodes();
var map=System.getInvisibleBranch(_d93,_d92,_d94);
if(map==null){
this.isLockedToEditor=false;
if(Application.isDeveloperMode){
Dialog.warning("Ouch!","Because the web service failed, tree has disabled the lock-tree-to-editor "+"feature. Otherwise, re-focus would fire the error indefinitely. Please try again.");
}
}else{
if(map.hasEntries()){
var self=this;
var _d97=this._treeNodeBindings;
var _d98=new Map();
function fix(_d99,list){
if(!_d99.hasBeenOpened){
if(list.hasEntries()){
list.each(function(node){
if(!_d97.has(node.getHandle())){
var _d9c=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
_d98.set(node.getHandle(),_d9c);
_d99.add(_d9c);
}
});
_d99.attachRecursive();
}
}
_d99.open(true);
}
map.each(function(_d9d,list){
if(_d97.has(_d9d)){
var _d9f=_d97.get(_d9d);
fix(_d9f,list);
}else{
if(_d98.has(_d9d)){
var _da0=_d98.get(_d9d);
fix(_da0,list);
}else{
}
}
});
}
}
};
SystemTreeBinding.prototype._handleCommandBroadcast=function(_da1,arg){
switch(_da1){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _da3=arg;
if(_da3!=null){
this._invokeServerRefresh(_da3);
}else{
this._invokeManualRefresh();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
if(SystemTreeBinding.clipboard!=null){
SystemTreeBinding.clipboard.hideDrag();
}
var _da4=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_CUT;
SystemTreeBinding.clipboard=_da4;
_da4.showDrag();
break;
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
var _da4=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_COPY;
SystemTreeBinding.clipboard=_da4;
break;
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
this._handlePaste();
break;
}
};
SystemTreeBinding.prototype._invokeServerRefresh=function(_da5){
if(_da5!=null&&_da5=="null"){
if(Application.isDeveloperMode){
alert("Saa har vi balladen.");
}
}
if(this._entityTokenRegistry.has(_da5)){
var list=this._entityTokenRegistry.get(_da5).reset();
this._refreshToken=_da5;
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this._refreshToken);
while(list.hasNext()){
var _da7=list.getNext();
this._refreshingTreeNodes.set(_da7.key,true);
setTimeout(function(){
_da7.refresh(true);
},0);
}
}
};
SystemTreeBinding.prototype._invokeManualRefresh=function(){
var _da8=this.getFocusedTreeNodeBindings().getFirst();
if(_da8){
var _da9=_da8.getLabel();
var _daa=_da8.getAncestorBindingByLocalName("treenode");
if(_daa){
_da8=_daa;
}
this._refreshToken=null;
this._refreshingTreeNodes.set(_da8.key,true);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,null);
if(!StatusBar.state){
var _dab=StringBundle.getString("ui","Website.App.StatusBar.Refreshing");
StatusBar.busy(_dab,[_da9]);
}
_da8.refresh();
}
};
SystemTreeBinding.prototype._handlePaste=function(){
var _dac=SystemTreeBinding.clipboard;
if(_dac){
var type=_dac.dragType;
var _dae=this.getFocusedTreeNodeBindings().getFirst();
if(_dae.dragAccept){
if(_dae.acceptor.isAccepting(type)){
this._performPaste(_dae);
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteTypeNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteTypeNotAllowed"));
}
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteNotAllowed"));
}
}
};
SystemTreeBinding.prototype._performPaste=function(_daf){
var self=this;
function update(){
MessageQueue.update();
Application.unlock(self);
}
if(_daf.node.hasDetailedDropSupport()){
if(_daf.node.hasChildren()){
var _db1=_daf.node.getChildren();
Dialog.invokeModal(SystemTreeBinding.URL_DIALOG_DETAILEDPASTE,{handleDialogResponse:function(_db2,_db3){
if(_db2==Dialog.RESPONSE_ACCEPT){
Application.lock(self);
var _db4=_db3.get("switch");
var _db5=_db3.get("sibling");
if(_db4=="after"){
_db5++;
}
var _db6=_daf.accept(SystemTreeBinding.clipboard,_db5);
if(_db6){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}},_db1);
}else{
Application.lock(self);
var _db7=_daf.accept(SystemTreeBinding.clipboard,0);
if(_db7){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}else{
Application.lock(self);
var _db7=_daf.accept(SystemTreeBinding.clipboard,0);
if(_db7){
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
SystemTreeBinding.prototype.collapse=function(_db8){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,null);
if(_db8){
this.blurSelectedTreeNodes();
var _db9=this.getRootTreeNodeBindings();
_db9.each(function(_dba){
if(_dba.isContainer&&_dba.isOpen){
_dba.close();
_dba.hasBeenOpened=false;
_dba.empty();
}
});
}else{
SystemTreeBinding.superclass.collapse.call(this);
}
};
SystemTreeBinding.prototype.setLockToEditor=function(_dbb){
if(_dbb!=this.isLockedToEditor){
this.isLockedToEditor=_dbb;
if(_dbb){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
}
};
SystemTreeBinding.prototype.getOpenSystemNodes=function(){
var list=new List([StageBinding.perspectiveNode]);
var _dbd=this.getRootTreeNodeBindings();
_dbd.each(function(_dbe){
var _dbf=_dbe.getOpenSystemNodes();
if(_dbf!=null&&_dbf.hasEntries()){
list.merge(_dbf);
}
});
return list;
};
SystemTreeBinding.prototype.focusSingleTreeNodeBinding=function(_dc0){
SystemTreeBinding.superclass.focusSingleTreeNodeBinding.call(this,_dc0);
if(_dc0!=null){
this._handleSystemTreeFocus();
}
};
SystemTreeBinding.prototype.getCompiledActionProfile=function(){
var temp={};
var _dc2=new Map();
var _dc3=this.getFocusedTreeNodeBindings();
_dc2=_dc3.getFirst().node.getActionProfile();
return _dc2;
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
SystemTreePopupBinding.prototype.handleBroadcast=function(_dc4,arg){
SystemTreePopupBinding.superclass.handleBroadcast.call(this,_dc4,arg);
switch(_dc4){
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
var _dc9=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_PASTE);
cut.setDisabled(!SystemTreePopupBinding.isCutAllowed);
copy.setDisabled(!SystemTreePopupBinding.isCutAllowed);
_dc9.setDisabled(SystemTreeBinding.clipboard==null);
};
SystemTreePopupBinding.prototype._setupRefreshItem=function(){
var _dca=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_REFRESH);
_dca.setDisabled(!SystemTreePopupBinding.isRefreshAllowed);
};
SystemTreePopupBinding.prototype.handleAction=function(_dcb){
SystemTreePopupBinding.superclass.handleAction.call(this,_dcb);
switch(_dcb.type){
case MenuItemBinding.ACTION_COMMAND:
var _dcc=_dcb.target;
var _dcd=_dcc.associatedSystemAction;
if(_dcd){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _dcf=list.getFirst();
var _dd0=_dcf.node;
}
SystemAction.invoke(_dcd,_dd0);
}else{
var cmd=_dcc.getProperty("cmd");
if(cmd){
this._handleCommand(cmd);
}
}
break;
}
};
SystemTreePopupBinding.prototype._handleCommand=function(cmd){
var _dd3=null;
switch(cmd){
case SystemTreePopupBinding.CMD_CUT:
_dd3=BroadcastMessages.SYSTEMTREEBINDING_CUT;
break;
case SystemTreePopupBinding.CMD_COPY:
_dd3=BroadcastMessages.SYSTEMTREEBINDING_COPY;
break;
case SystemTreePopupBinding.CMD_PASTE:
_dd3=BroadcastMessages.SYSTEMTREEBINDING_PASTE;
break;
case SystemTreePopupBinding.CMD_REFRESH:
_dd3=BroadcastMessages.SYSTEMTREEBINDING_REFRESH;
break;
}
if(_dd3){
setTimeout(function(){
EventBroadcaster.broadcast(_dd3);
},0);
}
};
SystemTreePopupBinding.prototype.disposeContent=function(){
var _dd4=new List(DOMUtil.getElementsByTagName(this.bindingElement,"menugroup"));
while(_dd4.hasNext()){
var _dd5=UserInterface.getBinding(_dd4.getNext());
if(!_dd5.getProperty("rel")){
_dd5.dispose();
}
}
};
SystemTreePopupBinding.prototype.constructContent=function(){
if(this._actionProfile!=null){
var doc=this.bindingDocument;
var _dd7=new List();
var self=this;
this._actionProfile.each(function(_dd9,list){
var _ddb=MenuGroupBinding.newInstance(doc);
list.each(function(_ddc){
var _ddd=self.getMenuItemBinding(_ddc);
_ddb.add(_ddd);
});
_dd7.add(_ddb);
});
_dd7.reverse();
while(_dd7.hasNext()){
this._bodyBinding.addFirst(_dd7.getNext());
}
this._bodyBinding.attachRecursive();
}
};
SystemTreePopupBinding.prototype.getMenuItemBinding=function(_dde){
var _ddf=MenuItemBinding.newInstance(this.bindingDocument);
var _de0=_dde.getLabel();
var _de1=_dde.getToolTip();
var _de2=_dde.getImage();
var _de3=_dde.getDisabledImage();
var _de4=_dde.isCheckBox();
if(_de0){
_ddf.setLabel(_de0);
}
if(_de1){
_ddf.setToolTip(_de1);
}
if(_de2){
_ddf.imageProfile=new ImageProfile({image:_de2,imageDisabled:_de3});
}
if(_de4){
_ddf.setType(MenuItemBinding.TYPE_CHECKBOX);
if(_dde.isChecked()){
_ddf.check(true);
}
}
if(_dde.isDisabled()){
_ddf.disable();
}
_ddf.associatedSystemAction=_dde;
return _ddf;
};
SystemTreePopupBinding.prototype.snapToMouse=function(e){
var node=e.target?e.target:e.srcElement;
var name=DOMUtil.getLocalName(node);
var _de8=null;
if(name!="tree"){
switch(name){
case "treenode":
break;
default:
node=DOMUtil.getAncestorByLocalName("treenode",node);
if(node!=null){
_de8=UserInterface.getBinding(node);
if(_de8.isDisabled){
_de8=null;
}
}
break;
}
if(_de8!=null&&_de8.node!=null&&_de8.node.getActionProfile()!=null){
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
var _de9=this.node.getLabel();
if(_de9){
this.setLabel(_de9);
}
var _dea=this.node.getToolTip();
if(_dea){
this.setToolTip(_dea);
}
var _deb=this.node.getHandle();
if(_deb){
this.setHandle(_deb);
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
var _dee="";
var list=this.node.getDragAccept();
while(list.hasNext()){
_dee+=list.getNext();
if(list.hasNext()){
_dee+=" ";
}
}
this.setProperty("dragaccept",_dee);
}
SystemTreeNodeBinding.superclass._initializeBindingDragAndDropFeatures.call(this);
};
SystemTreeNodeBinding.prototype.handleAction=function(_df0){
SystemTreeNodeBinding.superclass.handleAction.call(this,_df0);
switch(_df0.type){
case SystemTreeNodeBinding.ACTION_REFRESHED:
if(_df0.target==this){
if(!this.isOpen){
this.hasBeenOpened=false;
_df0.consume();
}
}
break;
}
};
SystemTreeNodeBinding.prototype.handleBroadcast=function(_df1,arg){
SystemTreeNodeBinding.superclass.handleBroadcast.call(this,_df1,arg);
switch(_df1){
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
var _df4=null;
var _df5=this.node.getImageProfile();
if(_df5){
if(this.isOpen){
_df4=_df5.getActiveImage();
}else{
_df4=_df5.getDefaultImage();
}
}
if(!_df4){
_df4=SystemTreeNodeBinding.superclass.computeImage.call(this);
}
return _df4;
};
SystemTreeNodeBinding.prototype.open=function(_df6){
var _df7=this.isContainer&&!this.isOpen;
var _df8=!this.hasBeenOpened;
SystemTreeNodeBinding.superclass.open.call(this);
if(_df7&&(_df8||SystemTreeBinding.HAS_NO_MEMORY)&&_df6!=true){
this.refresh();
if(this._isForcedOpen){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN,this);
this._isForcedOpen=false;
}
}
};
SystemTreeNodeBinding.prototype.refresh=function(){
var _df9=null;
if(this.isContainer){
_df9=this.getOpenSystemNodes();
}
this.isRefreshing=true;
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._performRefresh(_df9);
Application.unlock(self);
StatusBar.clear();
}
},0);
};
SystemTreeNodeBinding.prototype._performRefresh=function(_dfb){
if(_dfb!=null){
this._refreshBranch(_dfb);
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
var _dfc=new List();
var _dfd=this.node.getChildren();
this.empty();
if(_dfd.hasEntries()){
this._insertTreeNodesRegulated(_dfd);
}
};
SystemTreeNodeBinding.prototype._insertTreeNodesRegulated=function(_dfe){
var _dff=0;
while(_dfe.hasEntries()&&_dff<=SystemTreeNodeBinding.MAX_CHILD_IMPORT){
var _e00=SystemTreeNodeBinding.newInstance(_dfe.extractFirst(),this.bindingDocument);
this.add(_e00);
_e00.attach();
_dff++;
}
if(_dfe.hasEntries()){
this._insertBufferTreeNode(_dfe);
}
};
SystemTreeNodeBinding.prototype._insertBufferTreeNode=function(_e01){
alert("Max treenode count reached. This is not handled!");
alert("TODO: SystemTreeNodeBinding#._insertBufferTreeNode");
};
SystemTreeNodeBinding.prototype._refreshBranch=function(list){
var _e03=this.node.getDescendantBranch(list);
if(_e03.hasEntries()){
this.XXX(_e03);
}
};
SystemTreeNodeBinding.prototype.XXX=function(_e04){
var self=this;
var map=new Map();
this.empty();
_e04.each(function(key,_e08){
if(_e08.hasEntries()){
_e08.each(function(node){
var _e0a=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e0a);
if(map.has(key)){
var _e0b=map.get(key);
_e0b.add(_e0a);
_e0b.isOpen=true;
_e0b.hasBeenOpened=true;
}else{
if(key==self.node.getHandle()){
self.add(_e0a);
}else{
}
}
});
}
});
this.attachRecursive();
_e04.dispose();
map.dispose();
};
SystemTreeNodeBinding.prototype.getOpenDescendants=function(){
var _e0c=new TreeCrawler();
var _e0d=new List();
_e0c.mode=TreeCrawler.MODE_GETOPEN;
_e0c.crawl(this.bindingElement,_e0d);
if(_e0d.hasEntries()){
_e0d.extractFirst();
}
_e0c.dispose();
return _e0d;
};
SystemTreeNodeBinding.prototype.getOpenSystemNodes=function(){
var _e0e=null;
var list=this.getOpenDescendants();
if(list.hasEntries()){
_e0e=new List([this.node]);
list.each(function(_e10){
_e0e.add(_e10.node);
});
}
return _e0e;
};
SystemTreeNodeBinding.prototype.updateClassNames=function(){
if(!this.isRefreshing){
SystemTreeNodeBinding.superclass.updateClassNames.call(this);
}
};
SystemTreeNodeBinding.prototype.acceptTreeNodeBinding=function(_e11,_e12){
var _e13=(SystemTreeBinding.clipboardOperation==SystemTreePopupBinding.CMD_COPY);
if(_e11 instanceof SystemTreeNodeBinding){
if(TreeService.ExecuteDropElementAction){
TreeService.ExecuteDropElementAction(_e11.node.getData(),this.node.getData(),_e12?_e12:this.containingTreeBinding.getDropIndex(),Application.CONSOLE_ID,_e13);
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
SystemTreeNodeBinding.newInstance=function(node,_e17){
var _e18=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_e17);
var _e19=UserInterface.registerBinding(_e18,SystemTreeNodeBinding);
_e19.node=node;
return _e19;
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
SystemPageBinding.prototype.setPageArgument=function(_e1a){
this.node=_e1a;
SystemPageBinding.superclass.setPageArgument.call(this,_e1a);
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
var _e1b=this.node.getChildren();
if(_e1b.hasEntries()){
while(_e1b.hasNext()){
var node=SystemTreeNodeBinding.newInstance(_e1b.getNext(),this.bindingDocument);
this._tree.add(node);
node.attach();
}
}
};
SystemPageBinding.prototype._refreshTree=function(){
var _e1d=this._tree._treeBodyBinding.getChildBindingsByLocalName("treenode");
_e1d.each(function(root){
if(!root.isContainer){
root.isOpen=true;
}
});
var _e1f=new TreeCrawler();
var _e20=new List();
_e1f.mode=TreeCrawler.MODE_GETOPEN;
_e1f.crawl(this.bindingElement,_e20);
_e1f.dispose();
var list=new List([this.node]);
_e20.each(function(_e22){
list.add(_e22.node);
});
this._tree.empty();
var _e23=this.node.getDescendantBranch(list);
if(_e23.hasEntries()){
var self=this;
var map=new Map();
_e23.each(function(key,_e27){
_e27.each(function(node){
var _e29=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e29);
if(map.has(key)){
var _e2a=map.get(key);
_e2a.add(_e29);
_e2a.isOpen=true;
}else{
if(key==self.node.getHandle()){
self._tree.add(_e29);
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
SystemPageBinding.prototype.handleAction=function(_e2b){
SystemPageBinding.superclass.handleAction.call(this,_e2b);
switch(_e2b.type){
case ButtonBinding.ACTION_COMMAND:
var _e2c=_e2b.target;
switch(_e2c.getID()){
case "locktreebutton":
this._tree.setLockToEditor(_e2c.isChecked);
break;
case "collapsebutton":
this._tree.collapse();
break;
}
break;
}
};
SystemPageBinding.prototype.handleBroadcast=function(_e2d,arg){
SystemPageBinding.superclass.handleBroadcast.call(this,_e2d,arg);
switch(_e2d){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _e2f=arg;
if(this.node&&this.node.getEntityToken()==_e2f){
try{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,_e2f);
var self=this;
Application.lock(this);
setTimeout(function(){
self._refreshTree();
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,_e2f);
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
StageContainerBinding.prototype.handleBroadcast=function(_e31,arg){
StageContainerBinding.superclass.handleBroadcast.call(this,_e31,arg);
var _e33=this.bindingWindow.WindowManager;
switch(_e31){
case BroadcastMessages.APPLICATION_OPERATIONAL:
this.subscribe(_e33.WINDOW_RESIZED_BROADCAST);
this._fit();
this.reflex();
break;
case _e33.WINDOW_RESIZED_BROADCAST:
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
var _e35=this.bindingWindow.WindowManager;
this.bindingElement.style.width=_e35.getWindowDimensions().w+"px";
};
StageBinding.prototype=new FocusBinding;
StageBinding.prototype.constructor=StageBinding;
StageBinding.superclass=FocusBinding.prototype;
StageBinding.bindingInstance=null;
StageBinding.perspectiveNode=null;
StageBinding.entityToken=null;
StageBinding.handleViewPresentation=function(_e36){
if(StageBinding.isViewOpen(_e36)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_e36);
}else{
var _e37=ViewDefinitions[_e36];
StageBinding.presentViewDefinition(_e37);
}
};
StageBinding.isViewOpen=function(_e38){
return StageBinding.bindingInstance._activeViewDefinitions[_e38]!=null;
};
StageBinding.presentViewDefinition=function(_e39){
if(_e39.label!=null){
var _e3a=StringBundle.getString("ui","Website.App.StatusBar.Opening");
StatusBar.busy(_e3a,[_e39.label]);
}else{
StatusBar.busy();
}
StageBinding.bindingInstance._presentViewDefinition(_e39);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,{handleBroadcast:function(_e3c,arg){
if(arg==root.getEntityToken()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
}
}});
var _e3e=System.getPerspectiveNodes();
if(_e3e.hasEntries()){
this._initializeSystemViewDefinitions(_e3e);
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
var _e40=null;
if(LocalStore.isEnabled){
_e40=LocalStore.getProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE);
}
if(_e40&&ViewDefinitions[_e40]){
alert("StageBinding#_initializeWorkbenchLayout !!!!");
this._explorerBinding.setSelectionByHandle(unescape(_e40));
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
var _e42=root.getActionProfile();
if(_e42&&_e42.hasEntries()){
var _e43=top.app.bindingMap.toolsmenugroup;
if(_e43){
_e42.each(function(_e44,list){
list.each(function(_e46){
var item=MenuItemBinding.newInstance(_e43.bindingDocument);
item.setLabel(_e46.getLabel());
item.setToolTip(_e46.getToolTip());
item.setImage(_e46.getImage());
item.setDisabled(_e46.isDisabled());
item.associatedSystemAction=_e46;
var _e48=_e43;
var tag=_e46.getTag();
if(tag!=null){
switch(tag){
case SystemAction.TAG_CHANGEFROMLANGUAGE:
_e48=top.app.bindingMap.translationsmenugroup;
break;
}
}
_e48.add(item);
});
});
_e43.attachRecursive();
}
}
};
StageBinding.prototype._initializeSystemViewDefinitions=function(_e4a){
while(_e4a.hasNext()){
var node=_e4a.getNext();
var _e4c=node.getHandle();
ViewDefinitions[_e4c]=new SystemViewDefinition(node);
}
};
StageBinding.prototype.handleAction=function(_e4d){
StageBinding.superclass.handleAction.call(this,_e4d);
var _e4e=_e4d.target;
switch(_e4d.type){
case StageDecksBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._decksBinding=_e4e;
this._inflateBinding(_e4e);
_e4d.consume();
break;
case ExplorerBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._explorerBinding=_e4e;
this._inflateBinding(_e4e);
_e4d.consume();
break;
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
if(!Application.isOperational){
ProgressBarBinding.notch(5);
}
this.handlePerspectiveChange(_e4e);
_e4d.consume();
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_e4e instanceof DockBinding){
switch(_e4e.reference){
case DockBinding.START:
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
this._dockBindings.set(_e4e.reference,_e4e);
break;
}
this.handleAttachedDock(_e4e);
_e4d.consume();
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_e4e instanceof DockBinding){
this.handleSelectedDockTab(_e4e.getSelectedTabBinding());
_e4d.consume();
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
_e4d.consume();
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
_e4d.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_e4d);
};
StageBinding.prototype.handleBroadcast=function(_e50,arg){
StageBinding.superclass.handleBroadcast.call(this,_e50,arg);
switch(_e50){
case BroadcastMessages.VIEW_OPENED:
Application.unlock(this);
break;
case BroadcastMessages.VIEW_CLOSED:
var _e52=arg;
this._dontView(_e52);
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
StageBinding.prototype._showStart=function(_e54){
if(_e54!=this._isShowingStart){
var view=ViewBinding.getInstance("Composite.Management.Start");
var dock=this._dockBindings.get(DockBinding.START);
var _e57=this.bindingWindow.bindingMap.maindecks;
if(_e54){
_e57.select("startdeck");
view.show();
}else{
view.hide();
_e57.select("stagedeck");
if(dock!=null&&dock.isActive){
dock.deActivate();
}
}
this._isShowingStart=_e54;
}
};
StageBinding.prototype._inflateBinding=function(_e58){
for(var _e59 in ViewDefinitions){
var _e5a=ViewDefinitions[_e59];
if(_e5a instanceof SystemViewDefinition){
_e58.mountDefinition(_e5a);
}
}
var _e5b=(this._decksBinding!=null&&this._explorerBinding!=null);
if(_e5b){
var self=this;
setTimeout(function(){
self._renameThisMethod();
},0);
}
};
StageBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _e5e=new StageCrawler();
_e5e.mode=mode;
_e5e.crawl(this.bindingElement);
_e5e.dispose();
};
StageBinding.prototype.handlePerspectiveChange=function(_e5f){
var _e60=_e5f.getSelectionHandle();
this._decksBinding.setSelectionByHandle(_e60);
if(LocalStore.isEnabled){
LocalStore.setProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE,escape(_e60));
}
};
StageBinding.prototype.handleAttachedDock=function(_e61){
var _e62=_e61.getTabBindings();
if(_e62.hasEntries()){
while(_e62.hasNext()){
var _e63=_e62.getNext();
var _e64=_e63.getHandle();
if(_e64){
if(_e64=="Composite.Management.Start"&&(!Application.hasStartPage||!Application.hasExternalConnection)){
}else{
var _e65=ViewDefinitions[_e64];
if(_e65){
this._view(_e61,_e63,_e65,false);
}else{
alert("StageBinding: no such predefined viewdefinition ("+_e64+")");
}
}
}
}
}
};
StageBinding.prototype._presentViewDefinition=function(_e66){
var _e67=null;
var _e68=false;
switch(_e66.position){
case Dialog.MODAL:
_e67=app.bindingMap.masterdialogset.getModalInstance();
break;
case Dialog.NON_MODAL:
_e67=app.bindingMap.masterdialogset.getInstance();
break;
default:
if(this._dockBindings.hasEntries()){
switch(_e66.position){
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
_e67=this._dockBindings.get(_e66.position);
break;
default:
var _e69=this._decksBinding.getSelectedDeckBinding();
_e67=_e69.getDockBindingByReference(_e66.position);
if(this._isShowingStart){
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}else{
if(this._isShowingDefaultStart){
var _e6a=this.bindingWindow.bindingMap.maindecks;
_e6a.select("stagedeck");
this._isShowingDefaultStart=false;
}
}
break;
}
}else{
_e68=true;
}
break;
}
if(!_e68){
if(_e67!=null){
this._view(_e67,null,_e66,true);
}else{
throw "StageBinding: Could not position view: "+_e66.handle;
}
}
};
StageBinding.prototype._view=function(_e6b,_e6c,_e6d,_e6e){
var _e6f=_e6d.handle;
if(_e6d.isMutable){
_e6f+=KeyMaster.getUniqueKey();
}
if(this._activeViewDefinitions[_e6f]){
var _e70=ViewBinding.getInstance(_e6f);
if(_e70!=null){
_e70.update();
}else{
this.logger.error("Could not update ViewBinding (declared open): \n"+_e6f);
}
}else{
this._activeViewDefinitions[_e6f]=_e6d;
Application.lock(this);
switch(_e6b.constructor){
case DockBinding:
if(_e6e){
_e6b.prepareNewView(_e6d);
}else{
_e6b.prepareOpenView(_e6d,_e6c);
}
break;
case StageDialogBinding:
if(_e6e){
_e6b.prepareNewView(_e6d);
}
break;
}
}
};
StageBinding.prototype._dontView=function(_e71){
if(this._activeViewDefinitions[_e71]!=null){
delete this._activeViewDefinitions[_e71];
}else{
this.logger.debug("Could not unregister active view: "+_e71);
}
};
StageBinding.prototype.handleSelectedDockTab=function(_e72){
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
this.addFilter(function(_e74){
var _e75=UserInterface.getBinding(_e74);
var _e76=null;
if(_e75){
switch(_e75.constructor){
case StageSplitBoxBinding:
case StageSplitPanelBinding:
case StageSplitterBinding:
switch(self.mode){
case StageCrawler.MODE_MAXIMIZE:
_e75.handleMaximization();
break;
case StageCrawler.MODE_UNMAXIMIZE:
_e75.handleUnMaximization();
break;
}
break;
case DockBinding:
_e76=NodeCrawler.SKIP_NODE;
break;
}
}
return _e76;
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
var _e77=null;
this._dialogs.each(function(_e78){
if(!_e78.isVisible){
_e77=_e78;
}
return _e77!=null;
});
if(!_e77){
this._newInstance();
_e77=this._dialogs.getLast();
}
_e77.setModal(false);
return _e77;
};
StageDialogSetBinding.prototype.getModalInstance=function(){
var _e79=this.getInstance();
_e79.setModal(true);
return _e79;
};
StageDialogSetBinding.prototype._newInstance=function(){
var _e7a=this.add(StageDialogBinding.newInstance(this.bindingDocument));
this._dialogs.add(_e7a);
_e7a.attach();
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
StageDialogBinding.prototype.prepareNewView=function(_e7b){
if(_e7b instanceof DialogViewDefinition){
var _e7c=ViewBinding.newInstance(this.bindingDocument);
_e7c.setDefinition(_e7b);
_e7c.setType(ViewBinding.TYPE_DIALOGVIEW);
if(_e7b.handler){
if(Interfaces.isImplemented(IDialogResponseHandler,_e7b.handler)){
this._dialogResponseHandler=_e7b.handler;
}else{
throw "IDialogResponseHandler not implemented";
}
}
this._viewBinding=_e7c;
this._body.add(_e7c);
_e7c.attach();
_e7c.initialize();
}
};
StageDialogBinding.prototype.handleAction=function(_e7d){
StageDialogBinding.superclass.handleAction.call(this,_e7d);
var _e7e=_e7d.target;
switch(_e7d.type){
case PageBinding.ACTION_INITIALIZED:
this._handleInitializedPageBinding(_e7e);
_e7d.consume();
break;
case PageBinding.ACTION_DETACHED:
if(_e7e.bindingDocument==this._viewBinding.getContentDocument()){
this._pageBinding=null;
}
_e7d.consume();
break;
case DialogPageBinding.ACTION_RESPONSE:
if(_e7e.response){
this._handleDialogPageResponse(_e7e);
}
_e7d.consume();
break;
case Binding.ACTION_INVALID:
this._disableDialogAcceptButton(true);
_e7d.consume();
break;
case Binding.ACTION_VALID:
this._disableDialogAcceptButton(false);
_e7d.consume();
break;
case ViewBinding.ACTION_ONCLOSE:
this.close();
_e7e.dispose();
_e7d.consume();
break;
case ViewBinding.ACTION_CLOSED:
this._isFirstPage=true;
_e7d.consume();
break;
case ErrorBinding.ACTION_INITIALIZE:
_e7d.consume();
break;
case PageBinding.ACTION_UPDATING:
this._isUpdating=true;
_e7d.consume();
break;
case PageBinding.ACTION_UPDATED:
if(this._isUpdating){
this._isUpdating=false;
this._fit();
}
_e7d.consume();
break;
case Binding.ACTION_UPDATED:
if(!this._isUpdating){
this._fit();
}
_e7d.consume();
break;
case DialogBinding.ACTION_CLOSE:
if(_e7e==this){
this._viewBinding.dispose();
this.defaultSetup();
}
break;
}
};
StageDialogBinding.prototype.handleBroadcast=function(_e7f,arg){
StageDialogBinding.superclass.handleBroadcast.call(this,_e7f,arg);
switch(_e7f){
case BroadcastMessages.KEY_ESCAPE:
if(this.isVisible==true){
if(!PopupBinding.hasActiveInstances()){
this._defaultClose();
}
}
break;
}
};
StageDialogBinding.prototype._fit=function(_e81){
var _e82=new FitnessCrawler();
var list=new List();
if(_e81){
_e82.mode=FitnessCrawler.MODE_BRUTAL;
}
_e82.crawl(this.bindingElement,list);
_e82.dispose();
if(list.hasEntries()){
list.reverse();
list.each(function(_e84){
_e84.fit(_e81);
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
var _e85=this.getDimension().h;
this.reflex(true);
var self=this;
if(this.getDimension().h==_e85){
var self=this;
setTimeout(function(){
self.reflex(true);
},0);
}
}
};
StageDialogBinding.prototype._handleContextMenuItemBinding=function(_e87){
var cmd=_e87.getProperty("cmd");
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
StageDialogBinding.prototype._handleInitializedPageBinding=function(_e89){
if(_e89.bindingDocument==this._viewBinding.getContentDocument()){
if(_e89 instanceof DialogPageBinding){
if(this._pageBinding==null){
this._parsePageBinding(_e89);
}
this._pageBinding=_e89;
if(_e89.height=="auto"){
_e89.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_e89);
_e89.enableAutoHeightLayoutMode(false);
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
if(_e89.isDialogSubPage){
this._pageBinding.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_e89);
this._pageBinding.enableAutoHeightLayoutMode(false);
this._fit(true);
this.reflex(true);
}
}
this._isFirstPage=false;
};
StageDialogBinding.prototype._disableDialogAcceptButton=function(_e8a){
var _e8b=this._viewBinding.getContentDocument().getElementById("dialogacceptbutton");
if(_e8b){
var _e8c=UserInterface.getBinding(_e8b);
_e8c.setDisabled(_e8a);
}
};
StageDialogBinding.prototype._handleDialogPageResponse=function(_e8d){
if(this._dialogResponseHandler!=null){
this._dialogResponseHandler.handleDialogResponse(_e8d.response,_e8d.result!=null?_e8d.result:null);
}
this.close();
};
StageDialogBinding.prototype.handleInvokedControl=function(_e8e){
if(_e8e.controlType==ControlBinding.TYPE_CLOSE){
this._defaultClose();
}
StageDialogBinding.superclass.handleInvokedControl.call(this,_e8e);
};
StageDialogBinding.prototype.buildDescendantBindings=function(){
StageDialogBinding.superclass.buildDescendantBindings.call(this);
this._titlebar.setContextMenu(app.bindingMap.dialogtitlebarpopup);
var self=this;
this._titlebar.handleAction=function(_e90){
switch(_e90.type){
case MenuItemBinding.ACTION_COMMAND:
if(_e90.listener==this.contextMenuBinding){
self._handleContextMenuItemBinding(_e90.target);
}
break;
}
};
};
StageDialogBinding.prototype._parsePageBinding=function(_e91){
var _e92=_e91.label;
var _e93=_e91.image;
var _e94=_e91.width;
var _e95=_e91.height;
var _e96=_e91.controls;
var _e97=_e91.isResizable;
if(_e92){
this.setLabel(_e92);
}
if(_e93){
this.setImage(_e93);
}
if(_e94||_e95){
var old=this.getDimension();
var nev=new Dimension();
if(this._isFirstPage){
nev.w=_e94?_e94:old.w;
}else{
nev.w=old.w;
}
nev.h=(_e95!=null&&_e95!="auto")?_e95:old.h;
this.setDimension(nev);
}
if(_e96){
this.controlBindings[ControlBinding.TYPE_MAXIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_MINIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_CLOSE].hide();
var type,_e9b=new List(_e96.split(" "));
while((type=_e9b.getNext())!=null){
this.controlBindings[type].show();
}
}
if(_e97!=this._isResizable){
this.setResizable(_e97);
}
if(_e95=="auto"){
this._fixAutoHeight(_e91);
}
if(_e91==this._pageBinding){
this.centerOnScreen();
}
if(!this.isOpen){
this.reflex(true);
this.open(true);
}
};
StageDialogBinding.prototype._fixAutoHeight=function(_e9c){
var dim=this.getDimension();
var _e9e=0;
var _e9f=0;
if(_e9c.isDialogSubPage){
_e9c=this._pageBinding;
}
if(this._isFirstPage){
_e9e=_e9c.width!=null?_e9c.width:dim.w;
}else{
_e9e=dim.w;
}
_e9f=_e9c.bindingElement.offsetHeight;
_e9f+=this._titlebar.bindingElement.offsetHeight;
_e9f+=4;
if(_e9f<dim.h){
_e9f=dim.h;
}
if(_e9c.minheight!=null){
if(_e9f<_e9c.minheight){
_e9f=_e9c.minheight;
}
}
this.setDimension(new Dimension(_e9e,_e9f));
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
StageDialogBinding.newInstance=function(_ea2){
var _ea3=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_ea2);
var _ea4=UserInterface.registerBinding(_ea3,StageDialogBinding);
_ea4.setProperty("controls","minimize maximize close");
return _ea4;
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
this.addFilter(function(_ea5,list){
var _ea7=null;
var _ea8=UserInterface.getBinding(_ea5);
if(!_ea8.isVisible){
_ea7=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _ea7;
});
this.addFilter(function(_ea9,list){
var _eab=null;
var _eac=UserInterface.getBinding(_ea9);
if(_eac.isAttached){
if(Interfaces.isImplemented(IFit,_eac)){
if(!_eac.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_eac);
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
StageDecksBinding.prototype.mountDefinition=function(_ead){
var _eae=StageDeckBinding.newInstance(this.bindingDocument);
_eae.handle=_ead.handle;
_eae.perspectiveNode=_ead.node;
this._decks[_eae.handle]=_eae;
this.add(_eae);
_eae.attach();
};
StageDecksBinding.prototype.setSelectionByHandle=function(_eaf){
var _eb0=this._decks[_eaf];
StageBinding.perspectiveNode=_eb0.perspectiveNode;
this.select(_eb0);
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
StageDeckBinding.prototype.handleAction=function(_eb1){
StageDeckBinding.superclass.handleAction.call(this,_eb1);
var _eb2=_eb1.target;
switch(_eb1.type){
case WindowBinding.ACTION_LOADED:
if(_eb2==this.windowBinding){
top.app.bindingMap.stagedeckscover.hide();
this.removeActionListener(WindowBinding.ACTION_LOADED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_OPENED);
this.dispatchAction(StageDeckBinding.ACTION_LOADED);
_eb1.consume();
}
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_eb2 instanceof DockBinding){
this._dockBindings.set(_eb2.reference,_eb2);
_eb2.perspectiveNode=this.perspectiveNode;
}
break;
case StageSplitBoxBinding.ACTION_DOCK_OPENED:
this._dockBindingCount++;
if(this._dockBindingCount==2){
this._dockBindings.get("main").showControls(true);
}
_eb1.consume();
break;
case StageSplitBoxBinding.ACTION_DOCK_EMPTIED:
this._dockBindingCount--;
if(this._dockBindingCount==1){
this._dockBindings.get("main").showControls(false);
}
_eb1.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_eb1);
StageDeckBinding.superclass.handleAction.call(this,_eb1);
};
StageDeckBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _eb4=new StageCrawler();
_eb4.mode=mode;
_eb4.crawl(this.windowBinding.getContentDocument().body);
_eb4.dispose();
};
StageDeckBinding.prototype.select=function(){
if(!this._isStageDeckBindingInitialized){
this.initialize();
}
StageDeckBinding.superclass.select.call(this);
};
StageDeckBinding.prototype.getDockBindingByReference=function(_eb5){
return this._dockBindings.get(_eb5);
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
StageDeckBinding.newInstance=function(_eb7){
var _eb8=DOMUtil.createElementNS(Constants.NS_UI,"ui:stagedeck",_eb7);
var _eb9=UserInterface.registerBinding(_eb8,StageDeckBinding);
return _eb9;
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
StageSplitBoxBinding.prototype.handleAction=function(_eba){
StageSplitBoxBinding.superclass.handleAction.call(this,_eba);
StageBoxAbstraction.handleAction.call(this,_eba);
var _ebb=_eba.target;
var _ebc=null;
var _ebd=null;
switch(_eba.type){
case DockBinding.ACTION_EMPTIED:
_ebd=this.getChildBindingByLocalName("splitter");
if(_ebd.isVisible){
_ebd.hide();
}
_ebc=this.getDescendantBindingsByLocalName("dock");
if(_ebc.getFirst().isEmpty&&_ebc.getLast().isEmpty){
if(_ebc.getFirst().type!=DockBinding.TYPE_EDITORS){
this.dispatchAction(StageSplitBoxBinding.ACTION_HIDE);
this.hide();
}
}else{
this.flex();
this.invokeLayout();
}
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
_eba.consume();
break;
case DockBinding.ACTION_OPENED:
_ebc=this.getDescendantBindingsByLocalName("dock");
if(!_ebc.getFirst().isEmpty&&!_ebc.getLast().isEmpty){
_ebd=this.getChildBindingByLocalName("splitter");
if(!_ebd.isVisible){
_ebd.show();
}
}
if(!this.isVisible){
this.show();
this.dispatchAction(StageSplitBoxBinding.ACTION_SHOW);
}
this.flex();
this.invokeLayout();
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_OPENED);
_eba.consume();
break;
case StageSplitBoxBinding.ACTION_HIDE:
if(_ebb!=this){
_ebd=this.getChildBindingByLocalName("splitter");
if(_ebd.isVisible){
_ebd.hide();
}
this.invokeLayout();
_eba.consume();
}
break;
case StageSplitBoxBinding.ACTION_SHOW:
if(_ebb!=this){
var _ebe=this.getChildBindingsByLocalName("splitpanel");
if(_ebe.getFirst().isVisible&&_ebe.getLast().isVisible){
_ebd=this.getChildBindingByLocalName("splitter");
if(!_ebd.isVisible){
_ebd.show();
}
}
this.invokeLayout();
_eba.consume();
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
StageSplitBoxBinding.prototype.handleCrawler=function(_ebf){
StageSplitBoxBinding.superclass.handleCrawler.call(this,_ebf);
switch(_ebf.id){
case FlexBoxCrawler.ID:
if(this.isMaximizedForReal==false){
_ebf.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
};
StageSplitBoxBinding.prototype.hasBothPanelsVisible=function(){
var _ec0=this.getChildBindingsByLocalName("splitpanel");
return _ec0.getFirst().isVisible&&_ec0.getLast().isVisible;
};
StageSplitBoxBinding.prototype.hasBothPanelsFixed=function(){
var _ec1=this.getChildBindingsByLocalName("splitpanel");
return _ec1.getFirst().isFixed&&_ec1.getLast().isFixed;
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
StageSplitPanelBinding.prototype.handleAction=function(_ec2){
StageSplitPanelBinding.superclass.handleAction.call(this,_ec2);
StageBoxAbstraction.handleAction.call(this,_ec2);
switch(_ec2.type){
case DockBinding.ACTION_EMPTIED:
case StageSplitBoxBinding.ACTION_HIDE:
if(this.isMaximized==true){
this.normalize();
}
var dock=this.getContainedDock();
if(dock&&dock.type==DockBinding.TYPE_EDITORS){
this._invisibilize(true);
if(_ec2.type==StageSplitBoxBinding.ACTION_HIDE){
_ec2.consume();
}
}else{
this.hide();
if(this.isFixed==true){
this.setFix(false);
}
}
if(_ec2.type==DockBinding.ACTION_EMPTIED){
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
if(_ec2.type==StageSplitBoxBinding.ACTION_SHOW){
_ec2.consume();
}
}else{
this.show();
if(this.isFixed==true){
this.setFix(false);
}
}
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
var _ec5=_ec2.target;
if(_ec5!=this&&_ec5.getContainedDock()){
if(this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_VERTICAL){
var _ec6=_ec5._containingSplitBoxBinding;
if(_ec6.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL){
var _ec7=_ec6.getChildBindingsByLocalName("splitpanel");
var _ec8=_ec7.getFirst();
var _ec9=_ec7.getLast();
if(this.isFixed==true){
if(!_ec8.isFixed||!_ec9.isFixed||(!_ec6.hasBothPanelsVisible()&&_ec5.isMinimizedForReal)){
this.setFix(false);
_ec2.consume();
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
}
}else{
if(_ec6.hasBothPanelsFixed()||(!_ec6.hasBothPanelsVisible()&&_ec5.isMinimizedForReal)){
this.setFix(_ec5.getContainedDock().getHeight());
_ec2.consume();
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
var _eca=this.getContainedDock();
if(_eca){
if(this.isMaximizePrepared==true){
}else{
_eca.interceptDisplayChange(false);
}
}
};
StageSplitPanelBinding.prototype.handleUnMaximization=function(){
StageBoxAbstraction.handleUnMaximization.call(this);
var _ecb=this.getContainedDock();
if(_ecb){
if(_ecb.type==DockBinding.TYPE_EDITORS){
if(_ecb.isEmpty){
this._invisibilize(true);
}
}
if(this.isMaximized==true){
this.normalize();
}else{
_ecb.interceptDisplayChange(true);
}
}
};
StageSplitPanelBinding.prototype.maximize=function(){
if(this.isMinimized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.maximize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
var _ecc=this.getContainedDock();
if(_ecc){
_ecc.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MAXIMIZED,_ecc);
}
};
StageSplitPanelBinding.prototype.minimize=function(){
var _ecd=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _ece=this.getContainedDock();
if(_ece){
_ece.collapse(_ecd);
if(!_ecd){
this.setFix(_ece.getHeight());
}else{
this.setFix(_ece.getWidth());
}
}
if(this.isMaximized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.minimize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_ece&&_ece.isActive){
_ece.deActivate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MINIMIZED,_ece);
}
};
StageSplitPanelBinding.prototype.normalize=function(_ecf){
var _ed0=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _ed1=this.getContainedDock();
if(_ed1){
if(this.isMinimized==true){
_ed1.unCollapse(_ed0);
this.setFix(false);
}
}
StageSplitPanelBinding.superclass.normalize.call(this);
if(!_ecf){
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_ed1){
_ed1.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_NORMALIZED,_ed1);
}
}
};
StageSplitPanelBinding.prototype.getContainedDock=function(){
return this.getChildBindingByLocalName("dock");
};
StageSplitPanelBinding.prototype.invisibilize=function(_ed2){
var _ed3=true;
var dock=this.getContainedDock();
if(dock!=null&&dock.type==DockBinding.TYPE_EDITORS){
if(dock.isEmpty==true){
_ed3=false;
}
}
if(_ed3==true){
this._invisibilize(_ed2);
}
};
StageSplitPanelBinding.prototype._invisibilize=function(_ed5){
if(_ed5!=this._isInvisibilized){
if(_ed5){
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
StageSplitterBinding.prototype.onDragStart=function(_ed6){
var _ed7=top.app.bindingMap.stagesplittercover;
var _ed8=this._containingSplitBoxBinding.getOrient();
switch(_ed8){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_ed7.bindingElement.style.cursor="e-resize";
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_ed7.bindingElement.style.cursor="n-resize";
break;
}
_ed7.show();
var body=top.app.bindingMap.stagesplitterbody;
body.setPosition(this.getPosition());
body.setDimension(this.getDimension());
body.setOrient(_ed8);
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
StageSplitterBodyBinding.prototype.setOrient=function(_ede){
this._orient=_ede;
this.attachClassName(_ede);
};
StageSplitterBodyBinding.prototype.setPosition=function(pos){
var _ee0=true;
var _ee1=true;
switch(this._orient){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_ee1=false;
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_ee0=false;
break;
}
if(_ee0){
this.bindingElement.style.left=pos.x+"px";
}
if(_ee1){
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
StageBoxAbstraction.handleAction=function(_ee3){
switch(_ee3.type){
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
if(_ee3.target instanceof DockBinding){
if(this.isHiddenForReal){
this.dispatchAction(StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED);
}else{
if(this.isMinimizedForReal){
this.normalize();
}
}
}
_ee3.consume();
break;
}
};
StageBoxAbstraction.handleMaximization=function(){
if(this.isMaximizePrepared==true){
this.isMaximizedForReal=true;
this.isHiddenForReal=false;
this.isFlexible=false;
if(Client.isMozilla==true){
var _ee4=this.bindingElement.style;
_ee4.position="absolute";
_ee4.width="100%";
_ee4.height="100%";
_ee4.top="0";
_ee4.left="0";
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
var _ee5=this.bindingElement.style;
_ee5.position="relative";
_ee5.width="auto";
_ee5.height="auto";
_ee5.top="auto";
_ee5.left="auto";
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
StageBoxAbstraction._emulateBasicCSS=function(_ee6,_ee7){
var _ee8=_ee6.bindingElement.style;
var _ee9=_ee6.bindingElement.parentNode;
var box=_ee6._containingSplitBoxBinding;
if(Client.isExplorer==true){
if(_ee7){
_ee6._unmodifiedFlexMethod=_ee6.flex;
_ee6.flex=function(){
_ee8.width=_ee9.offsetWidth+"px";
_ee8.height=_ee9.offsetHeight+"px";
};
}else{
_ee8.width="100%";
_ee8.height="100%";
if(!box.isHorizontalOrient()){
setTimeout(function(){
_ee8.width="auto";
_ee8.height="auto";
box.reflex(true);
},0);
}
_ee6.flex=_ee6._unmodifiedFlexMethod;
_ee6._unmodifiedFlexMethod=null;
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
StageBoxHandlerAbstraction.handleAction=function(_eeb){
var _eec=_eeb.target;
switch(_eeb.type){
case ControlBoxBinding.ACTION_MAXIMIZE:
case ControlBoxBinding.ACTION_NORMALIZE:
if(_eec instanceof StageSplitPanelBinding){
StageBoxHandlerAbstraction.handleControlBoxAction.call(this,_eeb);
_eeb.consume();
}
break;
case StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED:
if(this.isSubPanelMaximized){
this.iterateContainedStageBoxBindings(StageCrawler.MODE_UNMAXIMIZE);
this.isSubPanelMaximized=false;
}
_eeb.consume();
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
break;
}
};
StageBoxHandlerAbstraction.handleControlBoxAction=function(_eed){
var mode=null;
switch(_eed.type){
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
StageMenuBarBinding.prototype.handleAction=function(_eef){
StageMenuBarBinding.superclass.handleAction.call(this,_eef);
switch(_eef.type){
case MenuItemBinding.ACTION_COMMAND:
var _ef0=_eef.target.associatedSystemAction;
if(Application.isLoggedIn){
if(!this._rootNode){
this._rootNode=System.getRootNode();
}
if(_ef0){
SystemAction.invoke(_ef0,this._rootNode);
}
}
_eef.consume();
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
var _ef1=this.getProperty("handle");
if(_ef1){
this._handle=_ef1;
if(StageBinding.isViewOpen(_ef1)){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
this.check(true);
}
}
this.oncommand=function(){
var self=this;
Application.lock(self);
setTimeout(function(){
StageBinding.handleViewPresentation(_ef1);
Application.unlock(self);
},Client.hasTransitions?Animation.DEFAULT_TIME:0);
};
}else{
throw new Error("StageViewMenuItemBinding: missing handle");
}
};
StageViewMenuItemBinding.prototype.setHandle=function(_ef3){
this.setProperty("handle",_ef3);
};
StageViewMenuItemBinding.prototype.handleBroadcast=function(_ef4,arg){
StageViewMenuItemBinding.superclass.handleBroadcast.call(this,_ef4,arg);
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
switch(_ef4){
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
StageViewMenuItemBinding.newInstance=function(_ef6){
var _ef7=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_ef6);
UserInterface.registerBinding(_ef7,StageViewMenuItemBinding);
return UserInterface.getBinding(_ef7);
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
StageStatusBarBinding.prototype.setLabel=function(_ef8){
this._label.setLabel(_ef8);
};
StageStatusBarBinding.prototype.setImage=function(_ef9){
this._label.setImage(_ef9);
};
StageStatusBarBinding.prototype.clear=function(){
this._label.setLabel(null);
this._label.setImage(false);
};
StageStatusBarBinding.prototype.startFadeOut=function(_efa){
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
var _efb=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _efc=_efb.getAssociatedView();
var _efd=_efc.getContentWindow().bindingMap.tree;
return _efd.getFocusedTreeNodeBindings();
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
ExplorerBinding.prototype.handleAction=function(_efe){
ExplorerBinding.superclass.handleAction.call(this,_efe);
var _eff=_efe.target;
switch(_efe.type){
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
this._decksBinding.setSelectionByHandle(this._menuBinding.getSelectionHandle());
var tag=this._menuBinding.getSelectionTag();
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVE_CHANGED,tag);
break;
case ViewBinding.ACTION_LOADED:
this.dispatchAction(ExplorerBinding.ACTION_DECK_LOADED);
_efe.consume();
break;
case Binding.ACTION_DRAG:
if(_eff instanceof ExplorerSplitterBinding){
_eff.dragger.registerHandler(this);
}
_efe.consume();
}
};
ExplorerBinding.prototype.setSelectionByHandle=function(_f01){
this._menuBinding.setSelectionByHandle(_f01);
};
ExplorerBinding.prototype.setSelectionDefault=function(){
this._menuBinding.setSelectionDefault();
};
ExplorerBinding.prototype.getSelectedDeckBinding=function(){
return this._decksBinding.getSelectedDeckBinding();
};
ExplorerBinding.prototype.mountDefinition=function(_f02){
if(_f02 instanceof SystemViewDefinition){
this._decksBinding.mountDefinition(_f02);
this._menuBinding.mountDefinition(_f02);
}
};
ExplorerBinding.prototype.onDragStart=function(_f03){
var _f04=this._menuBinding.getDescendantBindingsByLocalName("explorertoolbarbutton");
if(_f04.hasEntries()){
var _f05=_f04.getFirst();
this._dragStart=_f05.boxObject.getLocalPosition().y;
this._dragSlot=0;
if(this._dragHeight==0){
this._dragHeight=_f05.boxObject.getDimension().h;
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
ExplorerDecksBinding.prototype.mountDefinition=function(_f09){
if(_f09 instanceof SystemViewDefinition){
var _f0a=ViewBinding.newInstance(this.bindingDocument);
_f0a.setType(ViewBinding.TYPE_EXPLORERVIEW);
_f0a.setDefinition(_f09);
var _f0b=ExplorerDeckBinding.newInstance(this.bindingDocument);
_f0b.setAssociatedView(_f0a);
this._decks[_f09.handle]=_f0b;
_f0b.add(_f0a);
this.add(_f0b);
setTimeout(function(){
_f0b.attach();
_f0a.attach();
},0);
}
};
ExplorerDecksBinding.prototype.setSelectionByHandle=function(_f0c){
var _f0d=this._decks[_f0c];
this.select(_f0d);
};
DecksBinding.prototype.expandBy=function(_f0e){
var deck=this.getSelectedDeckBinding();
if(deck){
var _f10=this.bindingElement.offsetHeight+_f0e;
var view=deck.getAssociatedView();
this.bindingElement.style.height=_f10+"px";
this.reflex(true);
}
};
ExplorerDecksBinding.newInstance=function(_f12){
var _f13=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdecks",_f12);
return UserInterface.registerBinding(_f13,ExplorerDecksBinding);
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
ExplorerDeckBinding.prototype.setAssociatedView=function(_f14){
this._viewBinding=_f14;
};
ExplorerDeckBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
ExplorerDeckBinding.prototype.select=function(){
if(!this._isExplorerDeckBindingInitialized){
Application.lock(this);
var _f15=StringBundle.getString("ui","Website.App.StatusBar.Loading");
var _f16=this._viewBinding.getDefinition().label;
StatusBar.busy(_f15,[_f16]);
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
ExplorerDeckBinding.prototype.handleAction=function(_f17){
ExplorerDeckBinding.superclass.handleAction.call(this,_f17);
var _f18=_f17.target;
switch(_f17.type){
case PageBinding.ACTION_INITIALIZED:
if(_f18 instanceof SystemPageBinding){
this._isExplorerDeckBindingInitialized=true;
this._entityToken=_f18.node.getEntityToken();
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
ExplorerDeckBinding.prototype.handleBroadcast=function(_f19,arg){
ExplorerDeckBinding.superclass.handleBroadcast.call(this,_f19,arg);
switch(_f19){
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
var _f1b=null;
if(this._isExplorerDeckBindingInitialized){
_f1b=this._viewBinding.getDefinition().label;
}else{
_f1b=DockTabBinding.LABEL_TABLOADING;
}
return _f1b;
};
ExplorerDeckBinding.prototype.getImage=function(){
var _f1c=null;
if(this._isExplorerDeckBindingInitialized){
_f1c=this._viewBinding.getDefinition().image;
}else{
_f1c=DockTabBinding.IMG_TABLOADING;
}
return _f1c;
};
ExplorerDeckBinding.prototype.getToolTip=function(){
var _f1d=null;
if(this._isExplorerDeckBindingInitialized){
_f1d=this._viewBinding.getDefinition().toolTip;
}
return _f1d;
};
ExplorerDeckBinding.newInstance=function(_f1e){
var _f1f=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdeck",_f1e);
return UserInterface.registerBinding(_f1f,ExplorerDeckBinding);
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
ExplorerMenuBinding.prototype.onMemberInitialize=function(_f20){
switch(_f20.constructor){
case ExplorerToolBarBinding:
this._maxGroup=_f20.getToolBarGroupByIndex(0);
break;
case ToolBarBinding:
this._minGroup=_f20.getToolBarGroupByIndex(0);
break;
}
ExplorerMenuBinding.superclass.onMemberInitialize.call(this,_f20);
};
ExplorerMenuBinding.prototype.mountDefinition=function(_f21){
this._maxButtons.set(_f21.handle,this._mountMaxButton(_f21));
this._minButtons.set(_f21.handle,this._mountMinButton(_f21));
this._index++;
};
ExplorerMenuBinding.prototype._mountMaxButton=function(_f22){
var _f23=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_LARGE);
_f23.setLabel(_f22.label);
_f23.setToolTip(_f22.toolTip);
_f23.handle=_f22.handle;
_f23.node=_f22.node;
this._maxGroup.add(_f23);
this._maxList.add(_f23);
_f23.attach();
return _f23;
};
ExplorerMenuBinding.prototype._mountMinButton=function(_f24){
var _f25=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_NORMAL);
_f25.setLabel(_f24.label);
_f25.setToolTip(_f24.label);
_f25.handle=_f24.handle;
_f25.node=_f24.node;
this._minGroup.addFirst(_f25);
this._minList.add(_f25);
_f25.attach();
_f25.hide();
return _f25;
};
ExplorerMenuBinding.prototype.handleAction=function(_f26){
ExplorerMenuBinding.superclass.handleAction.call(this,_f26);
switch(_f26.type){
case RadioGroupBinding.ACTION_SELECTIONCHANGED:
var _f27=_f26.target;
var _f28=_f27.getCheckedButtonBinding();
var _f29=_f28.handle;
switch(_f27){
case this._maxGroup:
this._minGroup.setCheckedButtonBinding(this._minButtons.get(_f29),true);
break;
case this._minGroup:
this._maxGroup.setCheckedButtonBinding(this._maxButtons.get(_f29),true);
break;
}
this._selectedHandle=_f29;
this._selectedTag=_f28.node.getTag();
this.dispatchAction(ExplorerMenuBinding.ACTION_SELECTIONCHANGED);
_f26.consume();
break;
}
};
ExplorerMenuBinding.prototype.setSelectionByHandle=function(_f2a){
var _f2b=this._maxButtons.get(_f2a);
if(_f2b){
_f2b.check();
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
var _f2c=false;
var max=this._maxList.getLength()-1;
if(!this._maxList.get(max).isVisible){
this._index++;
this._maxList.get(this._index).show();
this._minList.get(this._index).hide();
_f2c=true;
}
return _f2c;
};
ExplorerMenuBinding.prototype.showLess=function(){
var _f2e=false;
if(this._maxList.get(0).isVisible){
this._maxList.get(this._index).hide();
this._minList.get(this._index).show();
this._index--;
_f2e=true;
}
return _f2e;
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
ExplorerToolBarBinding.newInstance=function(_f2f){
var _f30=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorertoolbar",_f2f);
return UserInterface.registerBinding(_f30,ExplorerToolBarBinding);
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
var _f31=this.explorerToolBarButtonType==ExplorerToolBarButtonBinding.TYPE_LARGE;
var _f32=_f31?ToolBarBinding.IMAGESIZE_LARGE:ToolBarBinding.IMAGESIZE_NORMAL;
this.imageProfile=this.node.getImageProfile(_f32);
ExplorerToolBarButtonBinding.superclass.onBindingAttach.call(this);
};
ExplorerToolBarButtonBinding.newInstance=function(_f33,_f34){
var _f35=(_f34==ExplorerToolBarButtonBinding.TYPE_LARGE?"ui:explorertoolbarbutton":"ui:toolbarbutton");
var _f36=DOMUtil.createElementNS(Constants.NS_UI,_f35,_f33);
var _f37=UserInterface.registerBinding(_f36,ExplorerToolBarButtonBinding);
_f37.explorerToolBarButtonType=_f34;
return _f37;
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
EditorBinding.registerComponent=function(_f38,_f39){
var _f3a=EditorBinding._components;
var _f3b=EditorBinding._editors;
var key=_f39.key;
var _f3d=Interfaces.isImplemented(IWysiwygEditorComponent,_f38);
if(!_f3d){
_f3d=Interfaces.isImplemented(ISourceEditorComponent,_f38);
}
if(_f3d){
if(_f3b.has(key)){
_f3b.get(key).initializeEditorComponent(_f38);
}else{
if(!_f3a.has(key)){
_f3a.set(key,new List());
}
_f3a.get(key).add(_f38);
}
}else{
throw "Editor component interface not implemented: "+_f38;
}
};
EditorBinding.claimComponents=function(_f3e,_f3f){
var _f40=EditorBinding._components;
var _f41=EditorBinding._editors;
var key=_f3f.key;
_f41.set(key,_f3e);
var list=null;
if(_f40.has(key)){
list=_f40.get(key).copy();
_f40.del(key);
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
var _f45=this.getProperty("value");
if(_f45!=null){
_f45=decodeURIComponent(_f45);
this._startContent=_f45;
}
};
EditorBinding.prototype.onBindingDispose=function(){
EditorBinding.superclass.onBindingDispose.call(this);
var name=this.getProperty("name");
if(name!=null){
var _f47=this.bindingWindow.DataManager;
_f47.unRegisterDataBinding(name);
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
EditorBinding.prototype.initializeEditorComponents=function(_f49){
var _f4a=EditorBinding.claimComponents(this,_f49);
if(_f4a!=null){
while(_f4a.hasNext()){
this.initializeEditorComponent(_f4a.getNext());
}
}
};
EditorBinding.prototype._registerWithDataManager=function(name){
if(name&&name!=""){
var _f4c=this.bindingWindow.DataManager;
if(_f4c.getDataBinding(name)){
_f4c.unRegisterDataBinding(name);
}
_f4c.registerDataBinding(name,this);
}
};
EditorBinding.prototype.addEditorEvents=function(){
var _f4d=this.getEditorDocument();
if(_f4d!=null){
Application.framework(_f4d);
DOMEvents.addEventListener(_f4d,DOMEvents.CONTEXTMENU,this);
DOMEvents.addEventListener(_f4d,DOMEvents.KEYPRESS,this);
DOMEvents.addEventListener(_f4d,DOMEvents.MOUSEDOWN,this);
DOMEvents.addEventListener(_f4d,DOMEvents.MOUSEMOVE,this);
}
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,{handleEvent:function(e){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}});
};
EditorBinding.prototype.checkForDirty=function(_f4f){
if(!this.isDirty){
if(_f4f==true){
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
var _f51=this.getCheckSum();
if(_f51!=this._checksum){
this.dispatchAction(Binding.ACTION_DIRTY);
this.isDirty=true;
this._checksum=_f51;
}
};
EditorBinding.prototype.getCheckSum=function(){
var _f52=null;
if(Binding.exists(this._pageBinding)){
_f52=this._pageBinding.getCheckSum(this._checksum);
}
return _f52;
};
EditorBinding.prototype.handleEvent=function(e){
EditorBinding.superclass.handleEvent.call(this,e);
var _f54=DOMEvents.getTarget(e);
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
if(_f54==this._bespinElement){
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
if(_f54.ownerDocument==this.getEditorDocument()){
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
EditorBinding.prototype.handleBroadcast=function(_f56,arg){
EditorBinding.superclass.handleBroadcast.call(this,_f56,arg);
var _f58=null;
switch(_f56){
case BroadcastMessages.APPLICATION_BLURRED:
if(this._isActivated){
this._activateEditor(false);
}
break;
case BroadcastMessages.MOUSEEVENT_MOUSEUP:
if(!this.isDialogMode){
try{
var _f59=true;
if(arg instanceof Binding){
if(Interfaces.isImplemented(IEditorControlBinding,arg)==true){
if(arg.isEditorControlBinding){
_f59=false;
}
}
}else{
_f58=DOMEvents.getTarget(arg);
if(this instanceof BespinEditorBinding){
if(_f58==this._bespinElement){
_f59=false;
}
}else{
if(_f58&&_f58.ownerDocument==this.getEditorDocument()){
_f59=false;
}
}
}
if(_f59){
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
EditorBinding.prototype._activateEditor=function(_f5a){
if(_f5a!=this._isActivated){
this._isActivated=_f5a;
EditorBinding.isActive=_f5a;
var _f5b=this.getEditorWindow().standardEventHandler;
var _f5c=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_f5c!=null){
if(_f5a){
if(this.hasBookmark()){
this.deleteBookmark();
}
_f5c.enable();
if(Client.isExplorer){
this._sanitizeExplorer();
}
this.focus();
_f5b.enableNativeKeys(true);
}else{
_f5c.disable();
_f5b.disableNativeKeys();
this.blur();
}
}else{
throw "Required broadcaster not found";
}
}
};
EditorBinding.prototype._sanitizeExplorer=function(){
if(Client.isExplorer){
var _f5d=this.getEditorDocument().selection.createRange();
_f5d.select();
}
};
EditorBinding.prototype._sanitizeMozilla=function(){
};
EditorBinding.prototype.hasSelection=function(){
var _f5e=false;
if(Client.isMozilla){
var _f5f=this.getEditorWindow().getSelection();
if(_f5f!=null){
_f5e=_f5f.toString().length>0;
if(!_f5e){
var _f60=_f5f.getRangeAt(0);
var frag=_f60.cloneContents();
var _f62=this.getEditorDocument().createElement("element");
while(frag.hasChildNodes()){
_f62.appendChild(frag.firstChild);
}
var img=_f62.getElementsByTagName("img").item(0);
if(img!=null){
if(!CSSUtil.hasClassName(img,VisualEditorBinding.FUNCTION_CLASSNAME)){
_f5e=true;
}
}
}
}
}else{
var _f60=this.getEditorDocument().selection.createRange();
_f5e=(_f60&&_f60.text)&&_f60.text.length>0;
}
return _f5e;
};
EditorBinding.prototype.isCommandEnabled=function(_f64){
var _f65=true;
switch(_f64){
case "Cut":
case "Copy":
case "Paste":
_f65=this.getEditorDocument().queryCommandEnabled(_f64);
break;
}
return _f65;
};
EditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _f69=false;
this.restoreBookmark();
switch(cmd){
case "Cut":
case "Copy":
case "Paste":
var _f6a=null;
if(cmd=="Paste"){
_f6a=null;
}else{
_f6a=this.hasSelection();
}
try{
this.getEditorDocument().execCommand(cmd,gui,_f6a);
}
catch(mozillaSecurityException){
if(Client.isMozilla==true){
Dialog.invokeModal(EditorBinding.URL_DIALOG_MOZ_CONFIGURE);
}else{
throw "Clipboard operation malfunction. Contact your developer.";
}
}
finally{
_f69=true;
}
break;
}
return _f69;
};
EditorBinding.prototype.getButtonForCommand=function(cmd){
var _f6c=this.getContentWindow().bindingMap.toolbar;
var _f6d=_f6c.getButtonForCommand(cmd);
if(!_f6d){
throw "No button for command "+cmd;
}
return _f6d;
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
var _f70=this.getContentDocument().getElementById("focusableinput");
if(_f70!=null){
_f70.style.display="block";
FocusBinding.focusElement(_f70);
_f70.style.display="none";
}else{
throw "Required element not found: focusableinput";
}
};
EditorBinding.prototype.handleAction=function(_f71){
EditorBinding.superclass.handleAction.call(this,_f71);
var _f72=_f71.target;
var self=this;
var _f74=this.shadowTree.iframe;
switch(_f71.type){
case Binding.ACTION_DIRTY:
if(_f71.target!=this){
this.checkForDirty();
}
break;
}
};
EditorBinding.prototype._onPageInitialize=function(_f75){
if(this._pageBinding==null){
this.reflex();
if(this._coverBinding!=null&&this._coverBinding.isVisible){
this._coverBinding.hide();
}
}
EditorBinding.superclass._onPageInitialize.call(this,_f75);
};
EditorBinding.prototype.handleElement=function(_f76){
return true;
};
EditorBinding.prototype.updateElement=function(_f77){
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
this._menuGroups[rel].each(function(_f7a){
_f7a.show();
});
};
EditorPopupBinding.prototype._hideMenuGroups=function(rel){
this._menuGroups[rel].each(function(_f7c){
_f7c.hide();
});
};
EditorPopupBinding.prototype.handleAction=function(_f7d){
EditorPopupBinding.superclass.handleAction.call(this,_f7d);
var _f7e=_f7d.target;
if(_f7d.type==MenuItemBinding.ACTION_COMMAND){
this.hide();
var cmd=_f7e.getProperty("cmd");
var gui=_f7e.getProperty("gui");
var val=_f7e.getProperty("val");
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
var _f82=this.bindingWindow.bindingMap.tinywindow;
var _f83=this.bindingWindow.bindingMap.codepresswindow;
if(_f82){
EditorBinding.registerComponent(this,_f82);
}else{
if(_f83){
EditorBinding.registerComponent(this,_f83);
}
}
};
EditorClickButtonBinding.prototype.buildDOMContent=function(){
EditorClickButtonBinding.superclass.buildDOMContent.call(this);
this._buildDesignModeSanitizer();
};
EditorClickButtonBinding.prototype.initializeComponent=function(_f84,_f85,_f86,_f87){
this._editorBinding=_f84;
this._tinyEngine=_f85;
this._tinyInstance=_f86;
this._tinyTheme=_f87;
this._setupEditorBookmarking();
};
EditorClickButtonBinding.prototype.initializeSourceEditorComponent=function(_f88,_f89,_f8a){
this._editorBinding=_f88;
this._codePressFrame=_f89;
this._codePressEngine=_f8a;
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
var _f8c=this._editorBinding;
if(_f8c!=null){
var self=this;
var _f8e={handleEvent:function(e){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(!_f8c.hasBookmark()){
_f8c.createBookmark();
}
break;
case DOMEvents.MOUSEUP:
if(self.isEditorSimpleControl){
if(self.popupBinding==null){
if(_f8c.hasBookmark()){
_f8c.restoreBookmark();
}
}
}
break;
}
}};
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,_f8e);
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEUP,_f8e);
}
};
EditorClickButtonBinding.newInstance=function(_f90){
var _f91=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_f90);
return UserInterface.registerBinding(_f91,EditorClickButtonBinding);
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
EditorToolBarButtonBinding.newInstance=function(_f92){
var _f93=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_f92);
return UserInterface.registerBinding(_f93,EditorToolBarButtonBinding);
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
var _f94=this.bindingWindow.bindingMap.tinywindow;
EditorBinding.registerComponent(this,_f94);
EditorSelectorBinding.superclass.onBindingAttach.call(this);
};
EditorSelectorBinding.prototype.buildButton=function(){
EditorSelectorBinding.superclass.buildButton.call(this);
this._buttonBinding.isEditorSimpleControl=false;
if(this.isEditorControlBinding==false){
this._buttonBinding.isEditorControlBinding=false;
}
};
EditorSelectorBinding.prototype.initializeComponent=function(_f95,_f96,_f97,_f98){
this._editorBinding=_f95;
this._tinyEngine=_f96;
this._tinyInstance=_f97;
this._tinyTheme=_f98;
};
EditorSelectorBinding.prototype.handleAction=function(_f99){
EditorSelectorBinding.superclass.handleAction.call(this,_f99);
switch(_f99.type){
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
EditorSelectorBinding.superclass.handleAction.call(this,_f99);
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
EditorMenuItemBinding.newInstance=function(_f9c){
var _f9d=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_f9c);
return UserInterface.registerBinding(_f9d,EditorMenuItemBinding);
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
VisualEditorBinding.getTinyLessClassName=function(_f9e){
var i=0,_fa0,_fa1="",_fa2=_f9e.split(" ");
while((_fa0=_fa2[i])!=null){
if(_fa0.length>=3&&_fa0.substring(0,3)=="mce"){
_fa0="";
}else{
if(_fa0.length>=14&&_fa0.substring(0,14)=="compositemedia"){
_fa0="";
}
}
_fa1+=_fa0;
if(_fa2[i+1]){
_fa1+=" ";
}
i++;
}
return _fa1;
};
VisualEditorBinding.getStructuredContent=function(_fa3){
var _fa4=null;
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.TinyContentToStructuredContent(_fa3);
if(soap instanceof SOAPFault){
}else{
_fa4=soap.XhtmlFragment;
if(!_fa4){
_fa4="";
}
}
WebServiceProxy.isFaultHandler=true;
return _fa4;
};
VisualEditorBinding.getTinyContent=function(_fa6,_fa7){
var _fa8=null;
if(_fa6==null||_fa6==""){
_fa6=VisualEditorBinding.DEFAULT_CONTENT;
}
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.StructuredContentToTinyContent(_fa6);
if(soap instanceof SOAPFault){
var _faa=soap;
var _fab={handleDialogResponse:function(){
_fa7.dispatchAction(Binding.ACTION_VALID);
}};
Dialog.invokeModal(VisualEditorBinding.URL_DIALOG_CONTENTERROR,_fab,_faa);
}else{
_fa8=soap.XhtmlFragment;
if(_fa8==null){
_fa8=new String("");
}
}
WebServiceProxy.isFaultHandler=true;
return _fa8;
};
VisualEditorBinding.extractByIndex=function(html,_fad){
var _fae=null;
var doc=XMLParser.parse(html);
if(doc!=null){
var _fb0=new List(doc.documentElement.childNodes);
var _fb1=new List();
_fb0.each(function(_fb2){
if(_fb2.nodeType==Node.ELEMENT_NODE){
_fb1.add(_fb2);
}
});
var _fb3=_fb1.get(_fad);
if(_fb3==null){
if(Application.isDeveloperMode){
alert("VisualEditorBinding: Bad HTML!"+"\n\n"+html);
}
}else{
if(_fb3.hasChildNodes()){
var frag=doc.createDocumentFragment();
while(_fb3.hasChildNodes()){
frag.appendChild(_fb3.firstChild);
}
doc.removeChild(doc.documentElement);
doc.appendChild(DOMUtil.createElementNS(Constants.NS_XHTML,"ROOT",doc));
doc.documentElement.appendChild(frag);
_fae=DOMSerializer.serialize(doc.documentElement);
_fae=_fae.substring(_fae.indexOf(">")+1,_fae.length);
_fae=_fae.substring(0,_fae.lastIndexOf("<"));
}
}
}
if(_fae==null){
_fae=new String("");
}
return _fae;
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
var _fb5=this.getProperty("presentationstylesheet");
if(_fb5!=null){
this.presentationStylesheet=_fb5;
}
var _fb6=this.getProperty("configurationstylesheet");
if(_fb6!=null){
this.configurationStylesheet=_fb6;
}
var _fb7=this.getProperty("formattingconfiguration");
if(_fb7!=null){
this.formattingConfiguration=VisualEditorFormattingConfiguration.getConfiguration(_fb7);
}
var _fb8=this.getProperty("elementclassconfiguration");
if(_fb8!=null){
this.elementClassConfiguration=VisualEditorElementClassConfiguration.getConfiguration(_fb8);
}
var _fb9=this.getProperty("embedablefieldstypenames");
if(_fb9!=null){
this.embedableFieldConfiguration=VisualEditorFieldGroupConfiguration.getConfiguration(_fb9);
}
};
VisualEditorBinding.prototype.handleBroadcast=function(_fba,arg){
VisualEditorBinding.superclass.handleBroadcast.call(this,_fba,arg);
var _fbc=this.getContentWindow().bindingMap.tinywindow;
var _fbd=_fbc.getContentWindow();
switch(_fba){
case BroadcastMessages.VISUALEDITOR_HACKED:
if(arg.broadcastWindow==_fbd){
this._startContent=this.normalizeToDocument(this._startContent);
this.extractHead(this._startContent);
this._startContent=this.extractBody(this._startContent);
arg.textareaElement.value=VisualEditorBinding.getTinyContent(this._startContent);
this.unsubscribe(BroadcastMessages.VISUALEDITOR_HACKED);
}
break;
case BroadcastMessages.TINYMCE_INITIALIZED:
if(arg.broadcastWindow==_fbd){
this._tinyEngine=arg.tinyEngine;
this._tinyInstance=arg.tinyInstance;
this._tinyTheme=arg.tinyTheme;
this._tinyTheme.initC1(this,this._tinyEngine,this._tinyInstance);
this.initializeEditorComponents(_fbc);
this._initialize();
this.unsubscribe(BroadcastMessages.TINYMCE_INITIALIZED);
}
break;
}
};
VisualEditorBinding.prototype.initializeEditorComponent=function(_fbe){
_fbe.initializeComponent(this,this._tinyEngine,this._tinyInstance,this._tinyTheme);
};
VisualEditorBinding.prototype._finalize=function(){
VisualEditorBinding.superclass._finalize.call(this);
this._maybeShowEditor();
};
VisualEditorBinding.prototype._onPageInitialize=function(_fbf){
VisualEditorBinding.superclass._onPageInitialize.call(this,_fbf);
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
VisualEditorBinding.prototype.normalizeToDocument=function(_fc2){
var _fc3=_fc2;
if(!this._isNormalizedDocument(_fc2)){
_fc2="\t\t"+_fc2.replace(/\n/g,"\n\t\t");
_fc3=VisualEditorBinding.XHTML.replace("${head}",this._getHeadSection()).replace("${body}",_fc2);
}
return _fc3;
};
VisualEditorBinding.prototype._isNormalizedDocument=function(_fc4){
var _fc5=false;
var doc=XMLParser.parse(_fc4,true);
if(doc!=null){
if(doc.documentElement.nodeName=="html"){
_fc5=true;
}
}
return _fc5;
};
VisualEditorBinding.prototype._getHeadSection=function(){
return this._head!=null?this._head:new String("");
};
VisualEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _fca=VisualEditorBinding.superclass.handleCommand.call(this,cmd,gui,val);
if(!_fca){
try{
this._tinyInstance.execCommand(cmd,gui,val);
this.checkForDirty();
}
catch(e){
SystemDebug.stack(arguments);
}
_fca=true;
}
return _fca;
};
VisualEditorBinding.prototype.handleContextMenu=function(e){
var _fcc=DOMEvents.getTarget(e);
this._popupBinding.configure(this._tinyInstance,this._tinyEngine,_fcc);
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
VisualEditorBinding.prototype.setValue=function(_fcd){
if(this._isFinalized){
if(Binding.exists(this._pageBinding)){
this._pageBinding.setContent(_fcd);
}
}else{
if(this._startContent==null){
this._startContent=_fcd;
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
VisualEditorBinding.prototype.setResult=function(_fce){
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
VisualEditorPopupBinding.prototype.configure=function(_fcf,_fd0,_fd1){
var _fd2=this.editorBinding.hasSelection();
this.tinyInstance=_fcf;
this.tinyEngine=_fd0;
this.tinyElement=_fd1;
this.hasSelection=_fd2;
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
var _fd6=false;
if(this.hasSelection){
_fd6=true;
}else{
if(this.tinyElement){
if(this.tinyElement.nodeName=="A"&&!this.tinyElement.getAttribute("name")){
_fd6=true;
}else{
if(this.tinyElement.nodeName=="IMG"){
_fd6=true;
}
}
}
}
if(_fd6){
this._showMenuGroups("link");
this._configureLinkGroupDetails();
}else{
this._hideMenuGroups("link");
}
};
VisualEditorPopupBinding.prototype._configureLinkGroupDetails=function(){
var _fd7=this.getMenuItemForCommand("compositeInsertLink");
var _fd8=this.getMenuItemForCommand("unlink");
var _fd9=this.editorBinding.getButtonForCommand("compositeInsertLink");
var _fda=this.editorBinding.getButtonForCommand("unlink");
_fd8.setDisabled(_fda.isDisabled);
if(_fd8.isDisabled){
_fd7.setLabel("Link");
}else{
_fd7.setLabel("Link properties");
}
};
VisualEditorPopupBinding.prototype._configureInsertGroup=function(){
var _fdb=this.editorBinding.embedableFieldConfiguration;
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
if(_fdb){
var _fde=_fdb.getGroupNames();
if(_fde.hasEntries()){
var _fdf=MenuPopupBinding.newInstance(doc);
var body=_fdf.add(MenuBodyBinding.newInstance(doc));
var _fe1=body.add(MenuGroupBinding.newInstance(doc));
_fde.each(function(_fe2){
var _fe3=_fdb.getFieldNames(_fe2);
_fe3.each(function(_fe4){
var i=_fe1.add(MenuItemBinding.newInstance(doc));
i.setLabel(_fe4);
i.setImage("${icon:field}");
i.setProperty("cmd","compositeInsertField");
i.setProperty("val",_fe2+":"+_fe4);
_fe1.add(i);
});
});
item.add(_fdf);
}
}else{
item.disable();
}
this._menuGroups["insertions"].getFirst().add(item);
item.attachRecursive();
this._menuItems["compositeInsertFieldParent"]=item;
};
VisualEditorPopupBinding.prototype._configureTableGroup=function(){
var _fe6=this.tinyInstance.dom.getParent(this.tinyElement,"table,td");
var _fe7=null;
var _fe8=null;
if(_fe6){
if(_fe6.nodeName=="TD"){
_fe7=_fe6.getAttribute("colspan");
_fe8=_fe6.getAttribute("rowspan");
}
this._menuItems["mceTableSplitCells"].setDisabled(_fe7=="1"&&_fe8=="1");
this._menuItems["mceTablePasteRowBefore"].setDisabled(this.tinyInstance.tableRowClipboard==null);
this._menuItems["mceTablePasteRowAfter"].setDisabled(this.tinyInstance.tableRowClipboard==null);
}
if(_fe6){
this._showMenuGroups("table");
}else{
this._hideMenuGroups("table");
}
};
VisualEditorPopupBinding.prototype._configureRenderingGroup=function(){
var _fe9=this._isRendering();
if(_fe9){
this._showMenuGroups("rendering");
}else{
this._hideMenuGroups("rendering");
}
this._isRenderingSelected=_fe9;
};
VisualEditorPopupBinding.prototype._configureFieldGroup=function(){
var _fea=this._isField();
if(_fea){
this._showMenuGroups("field");
}else{
this._hideMenuGroups("field");
}
this._isFieldSelected=_fea;
};
VisualEditorPopupBinding.prototype._configureImageGroup=function(){
if(this._isImage()&&!this._isRenderingSelected&&!this._isFieldSelected){
this._showMenuGroups("image");
}else{
this._hideMenuGroups("image");
}
};
VisualEditorPopupBinding.prototype._isImage=function(){
var _feb=false;
if(!this.hasSelection){
_feb=this.tinyElement&&this.tinyElement.nodeName=="IMG";
}
return _feb;
};
VisualEditorPopupBinding.prototype._isRendering=function(){
return this._isImage()&&CSSUtil.hasClassName(this.tinyElement,VisualEditorBinding.FUNCTION_CLASSNAME);
};
VisualEditorPopupBinding.prototype._isField=function(){
return this._isImage()&&CSSUtil.hasClassName(this.tinyElement,VisualEditorBinding.FIELD_CLASSNAME);
};
VisualEditorElementClassConfiguration._configurations=new Map();
VisualEditorElementClassConfiguration.getConfiguration=function(_fec){
var _fed=VisualEditorElementClassConfiguration._configurations;
if(!_fed.has(_fec)){
_fed.set(_fec,new VisualEditorElementClassConfiguration(EditorConfigurationService.GetElementClassConfiguration(_fec)));
}
return _fed.get(_fec);
};
function VisualEditorElementClassConfiguration(doc){
this.logger=SystemLogger.getLogger("VisualEditorElementClassConfiguration");
this._elements={};
var _fef=new XPathResolver();
var _ff0=_fef.resolveAll("elements/element",doc);
while(_ff0.hasNext()){
var _ff1=_ff0.getNext();
var _ff2=_ff1.getAttribute("name");
this._elements[_ff2]=new List();
var _ff3=_fef.resolveAll("class",_ff1);
while(_ff3.hasNext()){
var _ff4=_ff3.getNext().getAttribute("name");
this._elements[_ff2].add(_ff4);
}
}
}
VisualEditorElementClassConfiguration.prototype.getClassNamesForElement=function(name){
var _ff6=null;
if(this._elements[name]){
_ff6=this._elements[name].copy();
}else{
_ff6=new List();
}
return _ff6;
};
VisualEditorFormattingConfiguration._configurations=new Map();
VisualEditorFormattingConfiguration._options=null;
VisualEditorFormattingConfiguration.getConfiguration=function(_ff7){
var _ff8=VisualEditorFormattingConfiguration._configurations;
if(!_ff8.has(_ff7)){
_ff8.set(_ff7,new VisualEditorFormattingConfiguration());
}
return _ff8.get(_ff7);
};
VisualEditorFormattingConfiguration._getOptions=function(){
if(VisualEditorFormattingConfiguration._options==null){
var p="Composite.Web.VisualEditor";
VisualEditorFormattingConfiguration._options={"p":StringBundle.getString(p,"FormatSelector.LabelParagraph"),"address":StringBundle.getString(p,"FormatSelector.LabelAddress"),"blockquote":StringBundle.getString(p,"FormatSelector.LabelBlockQuote"),"div":StringBundle.getString(p,"FormatSelector.LabelDivision"),"h1":StringBundle.getString(p,"FormatSelector.LabelHeading1"),"h2":StringBundle.getString(p,"FormatSelector.LabelHeading2"),"h3":StringBundle.getString(p,"FormatSelector.LabelHeading3"),"h4":StringBundle.getString(p,"FormatSelector.LabelHeading4"),"h5":StringBundle.getString(p,"FormatSelector.LabelHeading5"),"h6":StringBundle.getString(p,"FormatSelector.LabelHeading6")};
}
return VisualEditorFormattingConfiguration._options;
};
function VisualEditorFormattingConfiguration(_ffa){
this._options=VisualEditorFormattingConfiguration._getOptions();
}
VisualEditorFormattingConfiguration.prototype.getFormattingOptions=function(){
return this._options;
};
VisualEditorFieldGroupConfiguration._configurations=new Map();
VisualEditorFieldGroupConfiguration.getConfiguration=function(_ffb){
var _ffc=null;
var _ffd=VisualEditorFieldGroupConfiguration._configurations;
if(!_ffd.has(_ffb)){
_ffd.set(_ffb,new VisualEditorFieldGroupConfiguration(EditorConfigurationService.GetEmbedableFieldGroupConfigurations(_ffb)));
}
return _ffd.get(_ffb);
};
function VisualEditorFieldGroupConfiguration(_ffe){
var _fff=new Map();
new List(_ffe).each(function(group){
var map=new Map();
new List(group.Fields).each(function(field){
map.set(field.Name,{xhtml:field.XhtmlRepresentation,xml:field.XhtmlRepresentation});
});
_fff.set(group.GroupName,map);
});
this._groups=_fff;
}
VisualEditorFieldGroupConfiguration.prototype.getGroupNames=function(){
return this._groups.toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getFieldNames=function(_1003){
return this._groups.get(_1003).toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getTinyMarkup=function(_1004,_1005){
return this._groups.get(_1004).get(_1005).xhtml;
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
var _1007=this.getDescendantElementsByLocalName("textarea");
while(_1007.hasNext()){
var _1008=_1007.getNext();
if(_1008.getAttribute("selected")=="true"){
this._startContent=_1008.value;
this._textareaname=_1008.getAttribute("placeholderid");
}
}
if(this._startContent==null){
this._startContent=VisualEditorBinding.DEFAULT_CONTENT;
}
};
VisualMultiEditorBinding.prototype._initialize=function(){
var self=this;
this._registerWithDataManager("generated"+KeyMaster.getUniqueKey());
var _100a=this.getContentWindow().bindingMap.templatetree;
_100a.addActionListener(TreeBinding.ACTION_SELECTIONCHANGED,{handleAction:function(_100b){
var _100c=_100a.getSelectedTreeNodeBindings().getFirst();
self._placeHolderSelected(_100c.textareaname);
_100b.consume();
}});
_100a.addActionListener(Binding.ACTION_FOCUSED,{handleAction:function(_100d){
self._activateEditor(false);
}});
this._updatePlaceHolders();
var _100e=this.getContentWindow().bindingMap.toolsplitter;
_100e.unCollapse();
VisualMultiEditorBinding.superclass._initialize.call(this);
};
VisualMultiEditorBinding.prototype._updatePlaceHolders=function(){
templatetree=this.getContentWindow().bindingMap.templatetree;
var _100f=this.getDescendantElementsByLocalName("textarea");
templatetree.empty();
if(_100f.hasEntries()){
this._hasPlaceHolders=true;
this._parsePlaceHolders(_100f);
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
VisualMultiEditorBinding.prototype._parsePlaceHolders=function(_1010){
this._textareas=new Map();
while(_1010.hasNext()){
var _1011=_1010.getNext();
var _1012=_1011.getAttribute("placeholderid");
this._textareas.set(_1012,{placeholderid:_1012,placeholdername:_1011.getAttribute("placeholdername"),placeholdermarkup:_1011.value,textareaelement:_1011,isSelected:_1011.getAttribute("selected")=="true"});
}
var _1013=new Map();
this._textareas.each(function(name,_1015){
var _1016=templatetree.add(TreeNodeBinding.newInstance(templatetree.bindingDocument));
_1016.setLabel(_1015.placeholdername);
_1016.setImage("${icon:placeholder}");
_1016.setProperty("placeholder",true);
_1016.textareaname=name;
_1013.set(_1015.placeholdername,_1016);
if(_1015.isSelected){
selected=_1016;
}
});
templatetree.attachRecursive();
if(selected!=null){
var _1017=this._textareas.get(selected.textareaname);
this._textareaname=selected.textareaname;
this._placeholdername=_1017.placeholdername;
this._setContentFromPlaceHolder(selected.textareaname);
selected.focus();
}
};
VisualMultiEditorBinding.prototype._noPlaceHolders=function(){
var _1018=this.getContentWindow().bindingMap.templatetree;
var _1019=_1018.add(TreeNodeBinding.newInstance(_1018.bindingDocument));
_1019.setLabel(StringBundle.getString("Composite.Web.VisualEditor","TemplateTree.NoTemplateWarning"));
_1019.setImage("${icon:warning}");
_1019.attach();
var _101a=this.getContentWindow().bindingMap.statusbar;
_101a.setPlaceHolderName(null);
};
VisualMultiEditorBinding.prototype._setContentFromPlaceHolder=function(name){
if(this._isFinalized==true){
var _101c=this._textareas.get(name);
var _101d=_101c.placeholdermarkup;
this.setValue(this.normalizeToDocument(_101d));
this.resetUndoRedo();
}
};
VisualMultiEditorBinding.prototype._placeHolderSelected=function(_101e){
if(this._isFinalized==true){
if(this._textareaname&&this._textareas.has(this._textareaname)){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
}
}
this._textareaname=_101e;
this._placeholdername=this._textareas.get(this._textareaname).placeholdername;
var _101f=this.getContentWindow().bindingMap.statusbar;
_101f.setPlaceHolderName(this._placeholdername);
if(this._isFinalized==true){
var self=this;
Application.lock(self);
setTimeout(function(){
self._setContentFromPlaceHolder(_101e);
Application.unlock(self);
},0);
}
};
VisualMultiEditorBinding.prototype.extractHead=function(html){
VisualMultiEditorBinding.superclass.extractHead.call(this,html);
this._heads.set(this._textareaname,this._head);
};
VisualMultiEditorBinding.prototype._getHeadSection=function(){
var _1022="";
if(this._heads.has(this._textareaname)){
_1022=this._heads.get(this._textareaname);
if(_1022==null){
_1022=new String("");
}
}
return _1022;
};
VisualMultiEditorBinding.prototype.manifest=function(){
if(this._textareas!=null&&this._textareas.hasEntries()){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
this._textareas.each(function(name,_1024){
_1024.textareaelement.value=_1024.placeholdermarkup;
});
}
};
VisualMultiEditorBinding.prototype.updateElement=function(_1025,_1026){
var _1027=_1025.getElementsByTagName("div").item(0);
var _1028=_1026.getElementsByTagName("div").item(0);
var _1029=new List(_1027.getElementsByTagName("textarea"));
var _102a=new List(_1028.getElementsByTagName("textarea"));
var _102b=false;
if(_1029.getLength()!=_102a.getLength()){
_102b=true;
}else{
var index=0;
_1029.each(function(_102d,index){
var _102f=_102a.get(index);
var newid=_102d.getAttribute("placeholderid");
var oldid=_102f.getAttribute("placeholderid");
var _1032=_102d.getAttribute("placeholdername");
var _1033=_102f.getAttribute("placeholdername");
if(newid!=oldid||_1032!=_1033){
_102b=true;
}
return !_102b;
});
}
if(_102b){
var html=null;
if(_1027.innerHTML!=null){
html=_1027.innerHTML;
}else{
html=DOMSerializer.serialize(_1027);
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
var _1037=this.getDescendantBindingByLocalName("selector");
_1037.attach();
this._populateTemplateSelector();
var _1038=this.getContentWindow().bindingMap.templateselector;
_1038.addActionListener(SelectorBinding.ACTION_SELECTIONCHANGED,{handleAction:function(){
setTimeout(function(){
self._onTemplateSelectionChanged();
},0);
}});
this.getContentWindow().bindingMap.templatetoolbar.show();
VisualMultiTemplateEditorBinding.superclass._initialize.call(this);
};
VisualMultiTemplateEditorBinding.prototype._populateTemplateSelector=function(){
var _1039=this.getDescendantBindingByLocalName("selector");
var _103a=this.getContentWindow().bindingMap.templateselector;
_1039.selections.each(function(_103b){
_103b.imageProfile=new ImageProfile({image:"${icon:page-template-template}"});
});
_103a.populateFromList(_1039.selections);
};
VisualMultiTemplateEditorBinding.prototype._onTemplateSelectionChanged=function(){
var _103c=this.getDescendantBindingByLocalName("selector");
var _103d=this.getContentWindow().bindingMap.templateselector;
_103c.selectByValue(_103d.getValue());
_103c.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
this.checkForDirty(true);
};
VisualMultiTemplateEditorBinding.prototype._parsePlaceHolders=function(_103e){
var nev=this._textareas;
var old=this._oldtextareas;
if(nev!=null){
nev.each(function(key,value){
old.set(key,value);
});
}
this._textareas=new Map();
function compute(_1043,_1044){
var _1045=_1044;
if(old.has(_1043)){
_1045=old.get(_1043).placeholdermarkup;
}
return _1045;
}
while(_103e.hasNext()){
var _1046=_103e.getNext();
var _1047=_1046.getAttribute("placeholderid");
this._textareas.set(_1047,{placeholderid:_1047,placeholdername:_1046.getAttribute("placeholdername"),placeholdermarkup:compute(_1047,_1046.value),textareaelement:_1046,isSelected:_1046.getAttribute("selected")=="true"});
}
var _1048=null;
var _1049=this.getContentWindow().bindingMap.templatetree;
var _104a=new Map();
this._textareas.each(function(name,_104c){
var _104d=_1049.add(TreeNodeBinding.newInstance(_1049.bindingDocument));
_104d.setLabel(_104c.placeholdername);
_104d.setImage("${icon:placeholder}");
_104d.setProperty("placeholder",true);
_104d.textareaname=name;
_104a.set(_104c.placeholdername,_104d);
if(_104c.isSelected){
_1048=_104d;
}
});
_1049.attachRecursive();
if(_1048!=null){
var _104e=true;
if(this._oldtextareas.hasEntries()){
_104e=false;
var map=new Map();
this._textareas.each(function(id,_1051){
map.set(_1051.placeholdername,true);
});
if(!map.has(this._placeholdername)){
_104e=true;
}
}
if(_104e){
var _1052=this._textareas.get(_1048.textareaname);
this._textareaname=_1048.textareaname;
this._placeholdername=_1052.placeholdername;
this._setContentFromPlaceHolder(_1048.textareaname);
_1048.focus();
}else{
var _1053=_104a.get(this._placeholdername);
this._textareaname=_1053.textareaname;
_1053.focus();
}
}
};
VisualMultiTemplateEditorBinding.prototype.updateElement=function(_1054,_1055){
var _1056=_1054.getElementsByTagName("ui:selector").item(0);
var _1057=_1055.getElementsByTagName("ui:selector").item(0);
var _1058=false;
if(_1056!=null&&_1057!=null){
var _1059=new List(_1056.getElementsByTagName("ui:selection"));
var _105a=new List(_1057.getElementsByTagName("ui:selection"));
if(_1059.getLength()!=_105a.getLength()){
_1058=true;
}else{
_1059.each(function(_105b,index){
var _105d=_105b.getAttribute("value");
var _105e=_105a.get(index).getAttribute("value");
if(_105d!=_105e){
_1058=true;
}
return !_1058;
});
}
}
if(_1058){
var div=this.bindingElement.getElementsByTagName("div").item(1);
this.bindingWindow.DocumentManager.detachBindings(div,true);
div.innerHTML=DOMSerializer.serialize(_1056);
this.bindingWindow.DocumentManager.attachBindings(div);
this._populateTemplateSelector();
}
return VisualMultiTemplateEditorBinding.superclass.updateElement.call(this,_1054,_1055);
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
BespinEditorPopupBinding.prototype.configure=function(_1060,frame,_1062){
this._editorBinding=_1060;
this._codePressFrame=frame;
this._codePressEngine=_1062;
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
this._bespinWindow=null;
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
var _1068=this.getProperty("validate");
if(_1068==true){
this._hasStrictValidation=true;
}
var _1069=this.getProperty("validator");
if(_1069!=null){
this._validator=_1069;
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
BespinEditorBinding.prototype.handleBroadcast=function(_106a,arg){
BespinEditorBinding.superclass.handleBroadcast.call(this,_106a,arg);
switch(_106a){
case BroadcastMessages.BESPIN_LOADED:
var _106c=this.getContentWindow().bindingMap.bespinwindow;
if(_106c!=null){
var _106d=_106c.getContentWindow();
if(arg.broadcastWindow==_106d){
this._bespinWindow=_106d;
this._bespinEnvelope=arg.bespinEnvelope;
this._bespinEditor=arg.bespinEditor;
this._bespinElement=this._bespinEditor.textView.domNode;
this._bespinEditor.syntax=this.syntax;
this._bespinEnvelope.settings.set("theme","white");
this._bespinEnvelope.settings.set("fontface","monospace");
this._bespinEnvelope.settings.set("fontsize",13);
this._bespinEnvelope.settings.set("tabstop",4);
this.initializeEditorComponents(_106c);
this._bespinElement.addEventListener(DOMEvents.MOUSEDOWN,this,false);
var self=this;
this._bespinEditor.textChanged.add(function(_106f,_1070,_1071){
self.checkForDirty();
});
if(this._pageBinding!=null){
this._initialize();
}
this.unsubscribe(_106a);
}
}
break;
}
};
BespinEditorBinding.prototype._onPageInitialize=function(_1072){
BespinEditorBinding.superclass._onPageInitialize.call(this,_1072);
if(Client.isExplorer||this._bespinEditor!=null){
this._initialize();
}
};
BespinEditorBinding.prototype._activateEditor=function(_1073){
if(_1073!=this._isActivated){
this._isActivated=_1073;
EditorBinding.isActive=_1073;
var _1074=this.getContentWindow().standardEventHandler;
if(_1073){
_1074.enableNativeKeys(true);
}else{
_1074.disableNativeKeys();
}
var _1075=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_1075!=null){
if(_1073){
_1075.enable();
}else{
_1075.disable();
}
}
if(_1073){
this.focus();
var _1076=this._bespinEditor;
}else{
this.blur();
}
}
};
BespinEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _107a=BespinEditorBinding.superclass.handleCommand.call(this,cmd,val);
return _107a;
};
BespinEditorBinding.prototype._finalize=function(){
this.setContent(this._startContent);
BespinEditorBinding.superclass._finalize.call(this);
};
BespinEditorBinding.prototype.initializeEditorComponent=function(_107b){
_107b.initializeSourceEditorComponent(this,this._bespinEditor);
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
return this._bespinWindow;
};
BespinEditorBinding.prototype.getEditorDocument=function(){
return this._bespinWindow.document;
};
BespinEditorBinding.prototype.setContent=function(_107d){
if(!this._isFinalized){
if(_107d!=this._startContent){
this._startContent=_107d;
}
}
if(this.isInitialized&&this.getContentWindow().bindingMap!=null){
this.getContentWindow().bindingMap.editorpage.setContent(_107d);
this.resetUndoRedo();
this._checksum=this.getCheckSum();
}
return true;
};
BespinEditorBinding.prototype.getContent=function(){
var _107e=this.getContentWindow().bindingMap.editorpage.getContent();
return _107e?_107e:"";
};
BespinEditorBinding.prototype.resetUndoRedo=function(){
};
BespinEditorBinding.prototype.cover=function(_107f){
if(this._pageBinding!=null){
this._pageBinding.cover(_107f);
}
};
BespinEditorBinding.prototype.updateElement=function(_1080){
if(_1080!=null&&this.shadowTree.dotnetinput!=null){
var value=_1080.getAttribute("value");
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
var _1082=true;
var _1083=this.getContent();
if(this._validator!=null){
_1082=Validator.validateInformed(_1083,this._validator);
}else{
switch(this.syntax){
case BespinEditorBinding.syntax.XML:
case BespinEditorBinding.syntax.XSL:
case BespinEditorBinding.syntax.HTML:
_1082=XMLParser.isWellFormedDocument(_1083,true);
if(_1082==true&&this._hasStrictValidation){
switch(this.syntax){
case BespinEditorBinding.syntax.HTML:
_1082=this._isValidHTML(_1083);
break;
}
}
break;
}
}
return _1082;
};
BespinEditorBinding.prototype._isValidHTML=function(xml){
var _1085=true;
var doc=XMLParser.parse(xml);
var _1087=new List();
if(doc!=null){
var root=doc.documentElement;
if(root.nodeName!="html"){
_1087.add("MissingHtml");
}
if(root.namespaceURI!=Constants.NS_XHTML){
_1087.add("NamespaceURI");
}
var head=null,body=null;
var _108b=new List(root.childNodes);
while(_108b.hasNext()){
var child=_108b.getNext();
if(child.nodeType==Node.ELEMENT_NODE){
switch(child.nodeName){
case "head":
if(head!=null){
_1087.add("MultipleHead");
}
if(body!=null){
_1087.add("HeadBodyIndex");
}
head=child;
break;
case "body":
if(body!=null){
_1087.add("MultipleBody");
}
body=child;
break;
}
}
}
if(head==null){
_1087.add("MissingHead");
}
if(body==null){
_1087.add("MissingBody");
}
}
if(_1087.hasEntries()){
_1085=false;
Dialog.error(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML.DialogTitle"),StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_1087.getFirst()));
}
return _1085;
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
var _108d=null;
var page=this._pageBinding;
if(page!=null){
_108d=page.getCheckSum();
}
return _108d;
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
ThrobberBinding.prototype.handleBroadcast=function(_108f,arg){
ThrobberBinding.superclass.handleBroadcast.call(this,_108f,arg);
switch(_108f){
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
ProgressBarBinding.notch=function(_1092){
var bar=ProgressBarBinding._bindingInstance;
if(bar!=null){
bar.notch(_1092);
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
ProgressBarBinding.prototype.notch=function(_1094){
_1094=_1094?_1094:1;
var width=this._cover.getWidth()-(ProgressBarBinding.NOTCH*_1094);
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
StartMenuItemBinding.prototype.handleBroadcast=function(_1096,arg){
StartMenuItemBinding.superclass.handleBroadcast.call(this,_1096,arg);
switch(_1096){
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
StartMenuItemBinding.prototype.setChecked=function(_1098,_1099){
StartMenuItemBinding.superclass.setChecked.call(this,_1098,_1099);
if(!_1099){
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
KeySetBinding.registerKeyEventHandler=function(doc,key,_109c,_109d){
var _109e=KeySetBinding.keyEventHandlers;
if(Interfaces.isImplemented(IKeyEventHandler,_109d,true)==true){
if(_109c!="*"){
_109c=KeySetBinding._sanitizeKeyModifiers(_109c);
}
var code=window.KeyEventCodes[key];
if(!code){
code=key.charCodeAt(0);
}
if(!_109e[doc]){
_109e[doc]={};
}
if(!_109e[doc][code]){
_109e[doc][code]={};
}
_109e[doc][code][_109c]=_109d;
}
};
KeySetBinding.handleKey=function(doc,e){
var _10a2=false;
var code=e.keyCode;
var _10a4=KeySetBinding.keyEventHandlers;
if(_10a4[doc]&&_10a4[doc][code]){
var _10a5="[default]";
_10a5+=code!=KeyEventCodes.VK_SHIFT?e.shiftKey?" shift":"":"";
_10a5+=code!=KeyEventCodes.VK_CONTROL?e.ctrlKey?" control":"":"";
var _10a6=_10a4[doc][code][_10a5];
if(_10a6==null){
_10a6=_10a4[doc][code]["*"];
}
if(_10a6!=null){
_10a6.handleKeyEvent(e);
_10a2=true;
}
}
return _10a2;
};
KeySetBinding._sanitizeKeyModifiers=function(_10a7){
var _10a8="[default]";
var mods={};
if(_10a7){
new List(_10a7.split(" ")).each(function(_10aa){
mods[_10aa]=true;
});
function check(_10ab){
if(mods[_10ab]){
_10a8+=" "+_10ab;
}
}
check("shift");
check("control");
}
return _10a8;
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
var _10af=key.getAttribute("oncommand");
var _10b0=key.getAttribute("preventdefault")=="true";
KeySetBinding.registerKeyEventHandler(self.bindingDocument,key.getAttribute("key"),key.getAttribute("modifiers"),{handleKeyEvent:function(e){
DOMEvents.stopPropagation(e);
if(_10b0){
DOMEvents.preventDefault(e);
}
var _10b2=self.bindingWindow.WindowManager;
top.setTimeout(function(){
Binding.evaluate(_10af,self);
},0);
}});
});
};
CursorBinding.prototype=new Binding;
CursorBinding.prototype.constructor=CursorBinding;
CursorBinding.superclass=Binding.prototype;
CursorBinding.fadeIn=function(_10b3){
if(_10b3 instanceof CursorBinding){
_10b3.setOpacity(0);
_10b3.show();
new Animation({modifier:Client.isExplorer?18:9,onstep:function(_10b4){
_10b3.setOpacity(Math.sin(_10b4*Math.PI/180));
},onstop:function(){
_10b3.setOpacity(1);
}}).play();
}
};
CursorBinding.fadeOut=function(_10b5){
if(_10b5 instanceof CursorBinding){
new Animation({modifier:Client.isExplorer?18:9,onstep:function(_10b6){
_10b5.setOpacity(Math.cos(_10b6*Math.PI/180));
},onstop:function(){
_10b5.hide();
}}).play();
}
};
CursorBinding.moveOut=function(_10b7,_10b8,_10b9){
if(_10b7 instanceof CursorBinding){
_10b9.x-=16;
_10b9.y-=16;
new Animation({modifier:3,onstep:function(_10ba){
var tal=Math.sin(_10ba*Math.PI/180);
_10b7.setPosition(new Point(((1-tal)*_10b8.x)+((0+tal)*_10b9.x),((1-tal)*_10b8.y)+((0+tal)*_10b9.y)));
},onstop:function(){
CursorBinding.fadeOut(_10b7);
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
CursorBinding.prototype.setOpacity=function(_10c0){
if(Client.isMozilla){
this.bindingElement.style.MozOpacity=new String(_10c0);
}else{
this.bindingElement.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+new String(_10c0*100)+")";
}
this._opacity=_10c0;
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
function setOpacity(_10c3){
if(Client.isMozilla){
cover.bindingElement.style.opacity=new String(_10c3);
}else{
cover.bindingElement.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+new String(_10c3*100)+")";
}
}
if(cover instanceof CoverBinding){
new Animation({modifier:Client.isExplorer?30:18,onstep:function(_10c4){
if(Binding.exists(cover)){
setOpacity(Math.cos(_10c4*Math.PI/180));
}
},onstop:function(){
if(Binding.exists(cover)){
cover.hide();
}
}}).play();
}
};
CoverBinding.fadeIn=function(cover){
function setOpacity(_10c6){
if(Client.isMozilla){
cover.bindingElement.style.MozOpacity=new String(_10c6);
}else{
cover.bindingElement.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+new String(_10c6*100)+")";
}
}
if(cover instanceof CoverBinding){
new Animation({modifier:Client.isExplorer?30:18,onstart:function(){
if(Binding.exists(cover)){
setOpacity(0);
cover.show();
}
},onstep:function(_10c7){
if(Binding.exists(cover)){
setOpacity(Math.sin(_10c7*Math.PI/180));
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
CoverBinding.prototype.setBusy=function(_10c9){
if(_10c9!=this._isBusy){
if(_10c9){
this.bindingElement.style.cursor="wait";
}else{
this.bindingElement.style.cursor="default";
}
this._isBusy=_10c9;
}
};
CoverBinding.prototype.setTransparent=function(_10ca){
if(_10ca!=this._isTransparent){
if(_10ca){
this.attachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}else{
this.detachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}
this._isTransparent=_10ca;
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
CoverBinding.prototype.setHeight=function(_10cc){
if(_10cc>=0){
this.bindingElement.style.height=new String(_10cc+"px");
}
};
CoverBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
CoverBinding.newInstance=function(_10cd){
var _10ce=DOMUtil.createElementNS(Constants.NS_UI,"ui:cover",_10cd);
return UserInterface.registerBinding(_10ce,CoverBinding);
};
UncoverBinding.prototype=new Binding;
UncoverBinding.prototype.constructor=UncoverBinding;
UncoverBinding.superclass=Binding.prototype;
UncoverBinding._bindingInstance=null;
UncoverBinding.uncover=function(pos){
var _10d0=UncoverBinding._bindingInstance;
if(Binding.exists(_10d0)){
_10d0.setPosition(pos);
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
TheatreBinding.prototype.play=function(_10d4){
this._isFading=_10d4==true;
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
var _10d5=this._canvas.getContext("2d");
var alpha=parseInt(0);
TheatreBinding._interval=top.setInterval(function(){
if(alpha<0.5){
_10d5.fillStyle="rgba(0,0,0,"+new String(alpha)+")";
_10d5.clearRect(0,0,300,150);
_10d5.fillRect(0,0,300,150);
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
var _10d7=this._canvas.getContext("2d");
_10d7.clearRect(0,0,300,150);
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
var _10d8=SourceCodeViewerBinding.stylesheets[this._syntax];
this._transformer=new XSLTransformer();
this._transformer.importStylesheet(_10d8);
break;
default:
throw "SourceCodeViewer: Syntax error!";
this._syntax=null;
break;
}
var _10d9=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_10d9){
this._startcontent=_10d9.value;
}
this.setURL(SourceCodeViewerBinding.URL_DEFAULT);
this.addActionListener(WindowBinding.ACTION_ONLOAD);
SourceCodeViewerBinding.superclass.onBindingAttach.call(this);
};
SourceCodeViewerBinding.prototype.handleAction=function(_10da){
SourceCodeViewerBinding.superclass.handleAction.call(this,_10da);
switch(_10da.type){
case WindowBinding.ACTION_ONLOAD:
if(_10da.target==this){
if(this._startcontent){
this.view(this._startcontent);
}
this.dispatchAction(SourceCodeViewerBinding.ACTION_INITIALIZED);
_10da.consume();
}
break;
}
SourceCodeViewerBinding.superclass.handleAction.call(this,_10da);
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
var _10de=this._transformer.transformToString(doc);
this._inject(_10de);
}
};
SourceCodeViewerBinding.prototype._viewHTML=function(arg){
};
SourceCodeViewerBinding.prototype._viewJavascript=function(arg){
};
SourceCodeViewerBinding.prototype._inject=function(_10e1){
this.getContentDocument().body.innerHTML=_10e1;
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
var _10e9=list.getNext();
var id=_10e9.getAttribute("id");
map[id]={};
var atts=this._resolver.resolveAll("p:att",_10e9);
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
var _10f3=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"persist",doc);
_10f3.setAttribute("id",id);
for(var name in map[id]){
var att=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"att",doc);
att.setAttribute("name",name);
att.setAttribute("value",map[id][name]);
_10f3.appendChild(att);
}
elm.appendChild(_10f3);
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
var _10fd=window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance;
if(_10fd){
doc=XMLParser.parse(_10fd);
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
var _1101=DOMSerializer.serialize(doc,true);
window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance=_1101;
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
LocalizationSelectorBinding.prototype.handleBroadcast=function(_1102,arg){
LocalizationSelectorBinding.superclass.handleBroadcast.call(this,_1102,arg);
switch(_1102){
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
var _1105=new List();
list.each(function(lang){
_1105.add(new SelectorBindingSelection(lang.Name,lang.SerializedActionToken,lang.IsCurrent,null));
});
this.populateFromList(_1105);
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
Dialog.warning(StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogTitle"),StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogText"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_1109){
switch(_1109){
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
var _110c=new SystemAction({Label:"Generated Action: Change Locale",ActionToken:token});
SystemAction.invoke(_110c,root);
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
var _110d=this.getProperty("status");
if(_110d!=null){
switch(_110d){
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
UserInterfaceMapping.prototype.merge=function(_1110){
for(var _1111 in _1110.map){
this.map[_1111]=_1110.getBindingImplementation(_1111);
}
};
UserInterfaceMapping.prototype.getBindingImplementation=function(_1112){
var _1113=null;
var name=_1112.nodeName;
if(Client.isExplorer){
var small=name.toLowerCase();
if(name==small){
name="ui:"+name;
}else{
name=small;
}
}
if(this.map[name]){
_1113=this.map[name];
}
return _1113;
};
var UserInterface=new function(){
var _1116=(Client.isMozilla?MozEditorTextBoxBinding:IEEditorTextBoxBinding);
var _1117=new UserInterfaceMapping({"body":RootBinding,"ui:binding":Binding,"ui:box":Binding,"ui:dialog":DialogBinding,"ui:dialoghead":DialogHeadBinding,"ui:dialogbody":DialogBodyBinding,"ui:dialogmatrix":DialogMatrixBinding,"ui:dialogset":DialogSetBinding,"ui:dialogborder":DialogBorderBinding,"ui:dialogcover":DialogCoverBinding,"ui:titlebar":DialogTitleBarBinding,"ui:titlebarbody":DialogTitleBarBodyBinding,"ui:window":WindowBinding,"ui:controlgroup":ControlGroupBinding,"ui:control":ControlBinding,"ui:menubar":MenuBarBinding,"ui:menu":MenuBinding,"ui:menubody":MenuBodyBinding,"ui:menugroup":MenuGroupBinding,"ui:menuitem":MenuItemBinding,"ui:menupopup":MenuPopupBinding,"ui:tabbox":TabBoxBinding,"ui:tabs":TabsBinding,"ui:tab":TabBinding,"ui:tabpanels":TabPanelsBinding,"ui:tabpanel":TabPanelBinding,"ui:splitbox":SplitBoxBinding,"ui:splitpanel":SplitPanelBinding,"ui:splitter":SplitterBinding,"ui:decks":DecksBinding,"ui:deck":DeckBinding,"ui:toolbar":ToolBarBinding,"ui:toolbargroup":ToolBarGroupBinding,"ui:toolbarbody":ToolBarBodyBinding,"ui:toolbarbutton":ToolBarButtonBinding,"ui:toolbarlabel":ToolBarLabelBinding,"ui:labelbox":LabelBinding,"ui:text":TextBinding,"ui:clickbutton":ClickButtonBinding,"ui:tree":TreeBinding,"ui:treebody":TreeBodyBinding,"ui:treenode":TreeNodeBinding,"ui:flexbox":FlexBoxBinding,"ui:scrollbox":ScrollBoxBinding,"ui:popupset":PopupSetBinding,"ui:popup":PopupBinding,"ui:shadow":ShadowBinding,"ui:matrix":MatrixBinding,"ui:sourceeditor":BespinEditorBinding,"ui:visualeditor":VisualEditorBinding,"ui:visualmultieditor":VisualMultiEditorBinding,"ui:visualmultitemplateeditor":VisualMultiTemplateEditorBinding,"ui:wysiwygeditortoolbarbutton":EditorToolBarButtonBinding,"ui:dock":DockBinding,"ui:docktabs":DockTabsBinding,"ui:docktab":DockTabBinding,"ui:dockpanels":DockPanelsBinding,"ui:dockpanel":DockPanelBinding,"ui:page":PageBinding,"ui:editorpage":EditorPageBinding,"ui:dialogpage":DialogPageBinding,"ui:pagebody":DialogPageBodyBinding,"ui:wizardpage":WizardPageBinding,"ui:explorer":ExplorerBinding,"ui:explorerdecks":ExplorerDecksBinding,"ui:explorerdeck":ExplorerDeckBinding,"ui:explorersplitter":ExplorerSplitterBinding,"ui:explorermenu":ExplorerMenuBinding,"ui:explorertoolbar":ExplorerToolBarBinding,"ui:explorertoolbarbutton":ExplorerToolBarButtonBinding,"ui:stagecontainer":StageContainerBinding,"ui:stage":StageBinding,"ui:stagedecks":StageDecksBinding,"ui:stagedeck":StageDeckBinding,"ui:viewset":ViewSetBinding,"ui:view":ViewBinding,"ui:broadcasterset":BroadcasterSetBinding,"ui:broadcaster":BroadcasterBinding,"ui:fields":FieldsBinding,"ui:fieldgroup":FieldGroupBinding,"ui:field":FieldBinding,"ui:fielddesc":FieldDescBinding,"ui:fielddata":FieldDataBinding,"ui:fieldhelp":FieldHelpBinding,"ui:datainput":DataInputBinding,"ui:selector":SelectorBinding,"ui:simpleselector":SimpleSelectorBinding,"ui:multiselector":MultiSelectorBinding,"ui:datainputselector":DataInputSelectorBinding,"ui:datainputdialog":DataInputDialogBinding,"ui:textbox":TextBoxBinding,"ui:editortextbox":_1116,"ui:radiodatagroup":RadioDataGroupBinding,"ui:radio":RadioDataBinding,"ui:checkbutton":CheckButtonBinding,"ui:checkbox":CheckBoxBinding,"ui:checkboxgroup":CheckBoxGroupBinding,"ui:datadialog":DataDialogBinding,"ui:postbackdialog":PostBackDataDialogBinding,"ui:nullpostbackdialog":NullPostBackDataDialogBinding,"ui:htmldatadialog":HTMLDataDialogBinding,"ui:functioneditor":FunctionEditorDataBinding,"ui:parametereditor":ParameterEditorDataBinding,"ui:keyset":KeySetBinding,"ui:cover":CoverBinding,"ui:uncover":UncoverBinding,"ui:cursor":CursorBinding,"ui:dialogtoolbar":DialogToolBarBinding,"ui:focus":FocusBinding,"ui:balloonset":BalloonSetBinding,"ui:balloon":BalloonBinding,"ui:error":ErrorBinding,"ui:throbber":ThrobberBinding,"ui:progressbar":ProgressBarBinding,"ui:lazybinding":LazyBindingBinding,"ui:sourcecodeviewer":SourceCodeViewerBinding,"ui:theatre":TheatreBinding,"ui:persistance":PersistanceBinding,"ui:filepicker":FilePickerBinding,"ui:request":RequestBinding,"ui:response":ResponseBinding});
var _1118=SystemLogger.getLogger("UserInterface");
var keys={};
this.registerBinding=function(_111a,impl){
var _111c=null;
if(!this.hasBinding(_111a)){
var _111d=DOMUtil.getParentWindow(_111a);
if(DOMUtil.getLocalName(_111a)!="bindingmapping"){
if(!impl&&_111a.getAttribute("binding")!=null){
var _111e=_111a.getAttribute("binding");
impl=_111d[_111e];
if(impl==null){
throw "No such binding in scope: "+_111e;
}
}
if(!impl){
var _111f=_111d.DocumentManager;
if(_111f){
var _1120=_111f.customUserInterfaceMapping;
if(_1120){
impl=_1120.getBindingImplementation(_111a);
}
}
}
if(!impl){
impl=_1117.getBindingImplementation(_111a);
}
if(impl!=null&&!Application.isMalFunctional){
try{
_111c=new impl();
}
catch(exception){
Application.isMalFunctional=true;
alert("No such binding!\n"+exception.message+(exception.stack?"\n"+exception.stack:""));
throw (exception);
}
}
if(_111c){
var key=KeyMaster.getUniqueKey();
_111a.setAttribute("key",key);
_111c.key=key;
if(!_111a.id){
_111a.id=key;
}
keys[key]={element:_111a,binding:_111c};
_111c.onBindingRegister();
}
}
}
return _111c;
};
this.unRegisterBinding=function(_1122){
terminate(_1122);
};
function terminate(_1123){
if(Binding.exists(_1123)==true){
var key=_1123.key;
Binding.destroy(_1123);
if(key){
if(keys[key]){
keys[key].binding=null;
keys[key].element=null;
delete keys[key];
_1123=null;
}else{
_1118.error("URGH: "+key);
}
}
}
}
this.getElement=function(_1125){
var _1126=null;
if(keys[_1125.key]){
_1126=keys[_1125.key].element;
}
return _1126;
};
this.getBinding=function(_1127){
var _1128=null;
if(_1127&&_1127.nodeType==Node.ELEMENT_NODE){
try{
var key=_1127.getAttribute("key");
if(key&&keys[key]){
_1128=keys[key].binding;
}
}
catch(exception){
alert("getBinding exception occured on element:\n\n\t\t"+_1127);
if(exception.stack){
alert(exception.stack);
}
}
}
return _1128;
};
this.getBindingByKey=function(key){
var _112b=null;
if(keys[key]){
_112b=keys[key].binding;
}
return _112b;
};
this.hasBinding=function(_112c){
return this.getBinding(_112c)!=null;
};
this.isBindingVisible=function(_112d){
var _112e=Application.isOperational;
if(_112e==true){
var _112f=new Crawler();
_112f.type=NodeCrawler.TYPE_ASCENDING;
_112f.id="visibilitycrawler";
_112f.addFilter(function(_1130){
var b=UserInterface.getBinding(_1130);
var res=0;
if(!b.isVisible){
_112e=false;
res=NodeCrawler.STOP_CRAWLING;
}
return res;
});
_112f.crawl(_112d.bindingElement);
_112f.dispose();
}
return _112e;
};
var _1133=null;
this.getBindingCount=function(){
var count=0;
for(var key in keys){
count++;
}
return count;
};
this.setPoint=function(){
_1133={};
for(var key in keys){
_1133[key]=true;
}
};
this.getPoint=function(){
var _1137=null;
if(_1133){
_1137=new List();
for(var key in keys){
if(!_1133[key]){
_1137.add(key);
}
}
}
return _1137;
};
this.clearPoint=function(){
_1133=null;
};
this.trackUndisposedBindings=function(){
var _1139=null;
for(var key in keys){
var entry=keys[key];
if(!entry.binding||!entry.element||!Binding.exists(entry.binding)){
if(!_1139){
_1139="Bindings illdisposed: ";
}
_1139+=entry.binding+" ";
}
}
if(_1139!=null){
_1118.error(_1139);
}
};
this.autoTrackDisposedBindings=function(_113c){
if(_113c){
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
SOAPRequest.newInstance=function(_113d,_113e){
var _113f=_113d+"/"+_113e;
var _1140=new SOAPRequest(_113f);
var _1141=SOAPRequest.resolver;
_1140.document=Templates.getTemplateDocument("soapenvelope.xml");
_1140.envelope=_1141.resolve("soap:Envelope",_1140.document);
_1140.header=_1141.resolve("soap:Header",_1140.envelope);
_1140.body=_1141.resolve("soap:Body",_1140.envelope);
return _1140;
};
SOAPRequest._parseResponse=function(_1142){
var _1143=null;
var _1144=false;
var doc=_1142.responseXML;
if(doc!=null&&doc.documentElement!=null){
switch(doc.documentElement.namespaceURI){
case Constants.NS_ENVELOPE:
_1143=SOAPRequestResponse.newInstance(_1142.responseXML);
if(Application.isOffLine){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_ONLINE);
}
break;
case Constants.NS_XHTML:
if(!Application.isOffLine){
var body=SOAPRequest.resolver.resolve("xhtml:html/xhtml:body",_1142.responseXML);
if(body&&body.getAttribute("id")=="offline"){
_1144=true;
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
var text=_1142.responseText;
if(text.indexOf("id=\"offline\"")>-1){
_1144=true;
}else{
var cry="Invalid SOAP response: \n\n"+_1142.responseText;
SystemLogger.getLogger("SOAPRequest._parseResponse (static)").error(cry);
if(Application.isDeveloperMode){
alert("Invalid SOAP response");
window.open("about:blank").document.write(_1142.responseText);
}
}
}
}
if(_1144==true){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_OFFLINE);
}
return _1143;
};
function SOAPRequest(_1149){
this.logger=SystemLogger.getLogger("SOAPRequest");
this.action=_1149;
return this;
}
SOAPRequest.prototype.invoke=function(url){
var _114b=DOMUtil.getXMLHTTPRequest();
var _114c=null;
_114b.open("post",url,false);
_114b.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_114b.setRequestHeader("SOAPAction",this.action);
try{
_114b.send(this.document);
_114c=SOAPRequest._parseResponse(_114b);
}
catch(exception){
var error="Dysfuntion in SOAP invoke: "+url;
if(this.document!=null){
error+="\n"+DOMSerializer.serialize(this.document,true);
}
this.logger.error(error);
throw exception;
}
_114b=null;
return _114c;
};
SOAPRequest.prototype.dispose=function(){
for(var _114e in this){
this[_114e]=null;
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
var _1150=null;
if(doc&&doc.documentElement){
_1150=new SOAPRequestResponse();
var _1151=SOAPRequestResponse.resolver;
_1150.document=doc;
_1150.envelope=_1151.resolve("soap:Envelope",_1150.document);
_1150.header=_1151.resolve("soap:Header",_1150.envelope);
_1150.body=_1151.resolve("soap:Body",_1150.envelope);
var fault=_1151.resolve("soap:Fault",_1150.body);
if(fault){
SOAPRequestResponse.logger.fatal(DOMSerializer.serialize(fault,true));
_1150.fault={element:fault,faultNamespaceURI:fault.namespaceURI,faultCode:DOMUtil.getTextContent(_1151.resolve("faultcode",fault)),faultString:DOMUtil.getTextContent(_1151.resolve("faultstring",fault)),detail:fault.getElementsByTagName("detail").item(0)};
}
}
return _1150;
};
function SOAPFault(_1153,_1154,_1155){
this._operationName=_1153;
this._operationAddress=_1154;
this._faultString=_1155;
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
SOAPFault.newInstance=function(_1156,fault){
return new SOAPFault(_1156.name,_1156.address,fault.faultString);
};
function SOAPEncoder(wsdl,_1159){
this.logger=SystemLogger.getLogger("SOAPEncoder");
this._wsdl=wsdl;
this._operation=_1159;
this._namespace=wsdl.getTargetNamespace();
}
SOAPEncoder.prototype.encode=function(args){
var _115b=SOAPRequest.newInstance(this._namespace,this._operation);
var root=this._appendElement(_115b.body,this._operation);
var _115d=this._wsdl.getSchema();
var _115e=_115d.lookup(this._operation);
var _115f=_115e.getListedDefinitions();
while(_115f.hasNext()){
var def=_115f.getNext();
var elm=this._appendElement(root,def.name);
var val=args.getNext();
this._resolve(elm,def,val);
}
return _115b;
};
SOAPEncoder.prototype._resolve=function(_1163,_1164,value){
var _1166=this._wsdl.getSchema();
if(_1164.isSimpleValue){
this._appendText(_1163,value,_1164.type=="string");
}else{
var _1167=_1166.lookup(_1164.type);
if(_1167 instanceof SchemaSimpleType){
alert("SOAPEncoder: SchemaSimpleType support not implemented!");
}else{
var defs=_1167.getListedDefinitions();
if(_1167.isArray){
var _1169=new List(value);
var def=defs.getNext();
while(_1169.hasNext()){
var elm=this._appendElement(_1163,def.name);
var val=_1169.getNext();
this._resolve(elm,def,val);
}
}else{
while(defs.hasNext()){
try{
var def=defs.getNext();
var elm=this._appendElement(_1163,def.name);
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
SOAPEncoder.prototype._appendText=function(_1170,value,_1172){
if(value!=null){
value=new String(value);
var safe=new String("");
var chars=value.split("");
var _1175=false;
var i=0,c;
while(c=chars[i++]){
var _1178=true;
var code=c.charCodeAt(0);
switch(code){
case 9:
case 10:
case 13:
_1178=false;
break;
default:
if((code>=32&&code<=55295)||(code>=57344&&code<=65533)||(code>=65536&&code<=1114111)){
_1178=false;
}
break;
}
if(!_1178){
safe+=c;
}else{
_1175=true;
}
}
if(_1175){
this.logger.debug("Illegal XML character(s) was deleted from the string: "+value);
}
_1170.appendChild(_1170.ownerDocument.createTextNode(safe));
}
};
function SOAPDecoder(wsdl,_117b){
this._wsdl=wsdl;
this._operation=_117b;
this._resolver=new XPathResolver();
this._resolver.setNamespacePrefixResolver({"result":wsdl.getTargetNamespace()});
}
SOAPDecoder.prototype.resolve=function(xpath,node){
return this._resolver.resolve("result:"+xpath,node);
};
SOAPDecoder.prototype.resolveAll=function(xpath,node){
return this._resolver.resolveAll("result:"+xpath,node);
};
SOAPDecoder.prototype.decode=function(_1180){
var _1181=null;
var _1182=this._wsdl.getSchema();
var id=this._operation+"Response";
var _1184=this.resolve(id,_1180.body);
var _1185=_1182.lookup(id);
var _1186=_1185.getListedDefinitions();
while(!_1181&&_1186.hasNext()){
var def=_1186.getNext();
var elm=this.resolve(def.name,_1184);
if(def.type==SchemaDefinition.TYPE_XML_DOCUMENT){
_1181=DOMUtil.getDOMDocument();
var e=elm.getElementsByTagName("*").item(0);
if(typeof _1181.importNode!=Types.UNDEFINED){
_1181.appendChild(_1181.importNode(e,true));
}else{
_1181.loadXML(DOMSerializer.serialize(e));
}
}else{
_1181=this._compute(elm,def);
}
}
return _1181;
};
SOAPDecoder.prototype._compute=function(_118a,_118b){
var _118c=null;
var _118d=this._wsdl.getSchema();
if(_118b.isSimpleValue){
_118c=this._getSimpleValue(_118a,_118b.type);
}else{
var _118e=_118d.lookup(_118b.type);
if(_118e instanceof SchemaSimpleType){
_118c=this._getSimpleValue(_118a,_118e.restrictionType);
}else{
var defs=_118e.getListedDefinitions();
if(_118e.isArray){
_118c=[];
var def=defs.getNext();
var elms=this.resolveAll(def.type,_118a);
while(elms.hasNext()){
var elm=elms.getNext();
_118c.push(this._compute(elm,def));
}
}else{
_118c={};
defs.reset();
while(defs.hasNext()){
var def=defs.getNext();
var elm=this.resolve(def.name,_118a);
if(elm){
_118c[def.name]=this._compute(elm,def);
}else{
if(def.isRequired){
throw new Error("SOAPDecoder: invalid SOAP response.");
}
}
}
}
}
}
return _118c;
};
SOAPDecoder.prototype._getSimpleValue=function(_1193,type){
var _1195=null;
if(_1193.firstChild&&_1193.firstChild.nodeType==Node.TEXT_NODE){
if(Client.isMozilla&&_1193.childNodes.length>1){
_1193.normalize();
}
_1195=_1193.firstChild.data;
switch(type){
case Schema.types.STRING:
_1195=_1195;
break;
case Schema.types.INT:
case Schema.types.FLOAT:
case Schema.types.DOUBLE:
_1195=Number(_1195);
break;
case Schema.types.BOOLEAN:
_1195=_1195=="true";
break;
default:
throw ("SOAPDecoder: schema type \""+type+"\" not handled.");
break;
}
}
return _1195;
};
Schema.prototype=new XPathResolver;
Schema.prototype.constructor=Schema;
Schema.superclass=XPathResolver.prototype;
Schema.types={STRING:"string",INT:"int",FLOAT:"float",DOUBLE:"double",BOOLEAN:"boolean"};
Schema.notSupportedException=new Error("Schema: Schema structure not supported!");
function Schema(_1196){
this.logger=SystemLogger.getLogger("Schema");
this._map=this._parseSchema(_1196);
}
Schema.prototype._parseSchema=function(_1197){
this.setNamespacePrefixResolver({"wsdl":Constants.NS_WSDL,"soap":Constants.NS_SOAP,"s":Constants.NS_SCHEMA});
var _1198={};
var entry=null;
var rules=this.resolveAll("s:*[@name]",_1197);
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
_1198[rule.getAttribute("name")]=entry;
}
return _1198;
};
Schema.prototype.lookup=function(name){
return this._map[name];
};
SchemaDefinition.TYPE_XML_DOCUMENT="xmldocument";
function SchemaDefinition(_119d){
this.logger=SystemLogger.getLogger("SchemaDefinition");
this.isRequired=null;
this.type=null;
this._parse(_119d);
}
SchemaDefinition.prototype._parse=function(_119e){
var min=_119e.getAttribute("minOccurs");
var max=_119e.getAttribute("maxOccurs");
var type=_119e.getAttribute("type");
this.name=_119e.getAttribute("name");
this.isRequired=min!="0";
if(type){
var split=type.split(":");
var sort=split[0];
var _11a4=split[1];
this.isSimpleValue=sort!="tns";
this.type=_11a4;
}else{
var elm=_119e.getElementsByTagName("*").item(0);
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
function SchemaElementType(_11a6,_11a7){
this.logger=SystemLogger.getLogger("SchemaElementType");
this._definitions=new List();
this._parseListedDefinitions(_11a6,_11a7);
}
SchemaElementType.prototype._parseListedDefinitions=function(_11a8,_11a9){
var els=_11a8.resolveAll("s:complexType/s:sequence/s:element",_11a9);
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
function SchemaComplexType(_11ab,_11ac){
this._definitions=new List();
this._parseListedDefinitions(_11ab,_11ac);
this.isArray=_11ac.getAttribute("name").indexOf("ArrayOf")>-1;
}
SchemaComplexType.prototype._parseListedDefinitions=function(_11ad,_11ae){
var els=_11ad.resolveAll("s:sequence/s:element",_11ae);
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
function SchemaSimpleType(_11b1,_11b2){
this.restrictionType=null;
this._parse(_11b1,_11b2);
}
SchemaSimpleType.prototype._parse=function(_11b3,_11b4){
var _11b5=_11b3.resolve("s:restriction",_11b4);
if(_11b5){
this.restrictionType=_11b5.getAttribute("base").split(":")[1];
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
var _11b8=null;
var _11b9=DOMUtil.getXMLHTTPRequest();
_11b9.open("get",url,false);
_11b9.send(null);
if(_11b9.responseXML){
_11b8=_11b9.responseXML.documentElement;
}else{
alert(_11b9.responseText);
throw new Error("WebServiceResolver: Could not read WSDL: "+url);
}
return _11b8;
};
WebServiceResolver.prototype.getPortAddress=function(){
return this._WSDLURL.split("?WSDL")[0];
};
WebServiceResolver.prototype.getTargetNamespace=function(){
return this._root.getAttribute("targetNamespace");
};
WebServiceResolver.prototype.getOperations=function(){
var _11ba=new List();
var _11bb=this.resolveAll("wsdl:portType/wsdl:operation",this._root);
if(_11bb.hasEntries()){
while(_11bb.hasNext()){
var _11bc=_11bb.getNext();
var name=_11bc.getAttribute("name");
_11ba.add(new WebServiceOperation(name,this.getPortAddress(),new SOAPEncoder(this,name),new SOAPDecoder(this,name)));
}
}else{
throw new Error("WebServiceResolver: No portType found.");
}
return _11ba;
};
WebServiceResolver.prototype.getSchema=function(){
return this._schema;
};
function WebServiceOperation(name,_11bf,_11c0,_11c1){
this.name=name;
this.address=_11bf;
this.encoder=_11c0;
this.decoder=_11c1;
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
var _11c5=wsdl.getOperations();
_11c5.each(function(_11c6){
proxy[_11c6.name]=WebServiceProxy.createProxyOperation(_11c6);
});
return proxy;
};
WebServiceProxy.prototype._log=function(_11c7,_11c8){
if(WebServiceProxy.isLoggingEnabled&&Application.isDeveloperMode&&_11c8){
var log=_11c8 instanceof SOAPRequest?"SOAPRequest for ":"SOAPResponse from ";
log+=_11c7.address+": "+_11c7.name+"\n\n";
log+=DOMSerializer.serialize(_11c8.document,true);
this.logger.fine(log);
}
};
WebServiceProxy.createProxyOperation=function(_11ca){
return function(){
var _11cb=null,_11cc=_11ca.encoder.encode(new List(arguments));
this._log(_11ca,_11cc);
var _11cd=_11cc.invoke(_11ca.address);
this._log(_11ca,_11cd);
if(_11cd){
if(_11cd.fault){
_11cb=SOAPFault.newInstance(_11ca,_11cd.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_11cb,_11cc,_11cd);
}
}else{
if(WebServiceProxy.isDOMResult){
_11cb=_11cd.document;
}else{
_11cb=_11ca.decoder.decode(_11cd);
}
}
}
_11cc.dispose();
return _11cb;
};
};
WebServiceProxy.handleFault=function(_11ce,_11cf,_11d0){
try{
Dialog.invokeModal(Dialog.URL_SERVICEFAULT,null,{soapFault:_11ce,soapRequest:_11cf,soapResponse:_11d0});
}
catch(exception){
alert(_11ce.getFaultString());
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
var _11d1=SystemLogger.getLogger("MessageQueue");
var _11d2=null;
var _11d3=0;
var _11d4=null;
var _11d5=new Map();
var _11d6=new Map();
var _11d7=false;
var _11d8=false;
var _11d9={"Main":DockBinding.MAIN,"BottomLeft":DockBinding.BOTTOMLEFT,"BottomRight":DockBinding.BOTTOMRIGHT,"RightTop":DockBinding.RIGHTTOP,"RightBottom":DockBinding.RIGHTBOTTOM,"AbsBottomLeft":DockBinding.ABSBOTTOMLEFT,"AbsBottomRight":DockBinding.ABSBOTTOMRIGHT};
this.initialize=function(){
_11d2=ConsoleMessageQueueService;
_11d3=_11d2.GetCurrentSequenceNumber("dummyparam!");
this.index=_11d3;
EventBroadcaster.subscribe(BroadcastMessages.VIEW_COMPLETED,this);
EventBroadcaster.subscribe(BroadcastMessages.VIEW_CLOSED,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_OFFLINE,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_ONLINE,this);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
};
this._autoupdate=function(){
if(!_11d7){
if(!MessageQueue._actions.hasEntries()){
var _11da=WebServiceProxy.isLoggingEnabled;
if(Application.isLoggedIn){
_11d8=true;
WebServiceProxy.isLoggingEnabled=false;
MessageQueue.update();
WebServiceProxy.isLoggingEnabled=_11da;
_11d8=false;
}
}
}
};
this._pokeserver=function(){
if(_11d7==true){
if(ReadyService.IsServerReady(true)){
MessageQueue._lockSystem(false);
}
}
};
this.update=function(){
if(Application.isLoggedIn){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_REQUESTED,_11d8);
var _11db=_11d2.GetMessages(Application.CONSOLE_ID,this.index);
if(_11db!=null){
if(Types.isDefined(_11db.CurrentSequenceNumber)){
var _11dc=_11db.CurrentSequenceNumber;
if(_11dc<this.index){
_11d1.debug("SERVER WAS RESTARTED! old messagequeue index: "+this.index+", new messagequeue index: "+_11dc);
}
this.index=_11dc;
var _11dd=new List(_11db.ConsoleActions);
if(_11dd.hasEntries()){
this.evaluate(_11dd);
}else{
if(!this._actions.hasEntries()){
broadcastUpdateEvaluated();
}
}
}else{
_11d1.error("No sequencenumber in MessageQueue response!");
}
}
}
};
this.evaluate=function(_11de){
var _11df=new List();
if(_11de.hasEntries()){
_11de.each(function(_11e0){
if(this._index[_11e0.Id]!=true){
_11df.add(_11e0);
}
this._index[_11e0.Id]=true;
},this);
if(_11df.hasEntries()){
if(this._actions.hasEntries()){
this._actions.merge(_11df);
}else{
this._actions=_11df;
}
this._nextAction();
}
}
};
this._closeAllViews=function(_11e1){
var _11e2="(No reason)";
if(_11e1!=null){
_11e2=_11e1.Reason;
}
var title="Warning";
var text="The server has requested a close of all active editors for the following reason: \"${reason}\". It is recommended that you accept this request by clicking OK.";
text=text.replace("${reason}",_11e2);
var self=this;
Dialog.warning(title,text,Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_11e6){
if(_11e6==Dialog.RESPONSE_ACCEPT){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEWS);
}
self._nextAction();
}});
};
this._nextAction=function(){
var _11e7=null;
if(this._actions.hasEntries()){
var _11e8=this._actions.extractFirst();
_11d3=_11e8.SequenceNumber;
_11d1.debug("MessageQueue action: "+_11e8.ActionType+" > QUEUE-MAX-SEQNUM: "+this.index+" > CURRENT SEQNUM: "+_11d3+" > ACTIONS-LEFT: "+this._actions.getLength());
switch(_11e8.ActionType){
case "OpenView":
_11e7=_11e8.OpenViewParams;
if(_11e7.ViewType=="ModalDialog"){
openDialogView(_11e7);
}else{
_11d4=_11e7.ViewId;
openView(_11e7);
}
break;
case "CloseView":
_11e7=_11e8.CloseViewParams;
_11d4=_11e7.ViewId;
closeView(_11e7);
break;
case "RefreshTree":
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,_11e8.RefreshTreeParams.EntityToken);
var debug="REFRESHING TREES: "+_11d5.countEntries()+"\n";
_11d5.each(function(token){
debug+="\n\tTOKEN: "+token;
});
_11d1.debug(debug);
if(!_11d5.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "MessageBox":
openMessageBox(_11e8.MessageBoxParams);
break;
case "OpenViewDefinition":
_11e7=_11e8.OpenViewDefinitionParams;
_11d4=_11e7.Handle;
openViewDefinition(_11e7);
break;
case "LogEntry":
logEntry(_11e8.LogEntryParams);
this._nextAction();
break;
case "Reboot":
Application.reload(true);
break;
case "LockSystem":
MessageQueue._lockSystem(true);
break;
case "BroadcastMessage":
_11e7=_11e8.BroadcastMessageParams;
_11d1.debug("Server says: EventBroadcaster.broadcast ( \""+_11e7.Name+"\", "+_11e7.Value+" )");
EventBroadcaster.broadcast(_11e7.Name,_11e7.Value);
this._nextAction();
break;
case "CollapseAndRefresh":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_COLLAPSEALL);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
if(!_11d5.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "CloseAllViews":
this._closeAllViews(_11e8.CloseAllViewsParams);
break;
case "SaveStatus":
saveStatus(_11e8.SaveStatusParams);
this._nextAction();
break;
case "DownloadFile":
Download.init(_11e8.DownloadFileParams.Url);
this._nextAction();
break;
case "ExpandTreeNode":
this._nextAction();
break;
case "BindEntityTokenToView":
_11e7=_11e8.BindEntityTokenToViewParams;
EventBroadcaster.broadcast(BroadcastMessages.BIND_TOKEN_TO_VIEW,{handle:_11e7.ViewId,entityToken:_11e7.EntityToken});
this._nextAction();
break;
case "OpenGenericView":
_11e7=_11e8.OpenGenericViewParams;
openGenericView(_11e7);
break;
default:
Dialog.error("Dysfunction","Unhandled action: "+_11e8.ActionType);
break;
}
}else{
broadcastUpdateEvaluated();
}
};
function broadcastUpdateEvaluated(){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_EVALUATED,_11d8);
}
function logEntry(_11eb){
var _11ec=_11eb.Level.toLowerCase();
SystemLogger.getLogger(_11eb.SenderId)[_11ec](_11eb.Message);
}
function openView(_11ed){
var list=paramsToList(_11ed.Argument);
if(list.hasEntries()){
var def=ViewDefinition.clone("Composite.Management.PostBackView",_11ed.ViewId);
def.entityToken=_11ed.EntityToken;
def.flowHandle=_11ed.FlowHandle;
def.position=_11d9[_11ed.ViewType],def.label=_11ed.Label;
def.image=_11ed.Image;
def.toolTip=_11ed.ToolTip;
def.argument={"url":_11ed.Url,"list":list};
StageBinding.presentViewDefinition(def);
}else{
StageBinding.presentViewDefinition(new HostedViewDefinition({handle:_11ed.ViewId,entityToken:_11ed.EntityToken,flowHandle:_11ed.FlowHandle,position:_11d9[_11ed.ViewType],url:_11ed.Url,label:_11ed.Label,image:_11ed.Image,toolTip:_11ed.ToolTip}));
}
}
function openDialogView(_11f0){
StageBinding.presentViewDefinition(new DialogViewDefinition({handle:_11f0.ViewId,flowHandle:_11f0.FlowHandle,position:Dialog.MODAL,url:_11f0.Url,handler:{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}}}));
}
function openMessageBox(_11f1){
var _11f2=_11f1.DialogType.toLowerCase();
if(_11f2=="question"){
throw "Not supported!";
}else{
Dialog[_11f2](_11f1.Title,_11f1.Message,null,{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}});
}
}
function openViewDefinition(_11f3){
var map={};
var _11f5=false;
new List(_11f3.Argument).each(function(entry){
map[entry.Key]=entry.Value;
_11f5=true;
});
var proto=ViewDefinitions[_11f3.Handle];
if(proto!=null){
var def=null;
if(proto.isMutable==false){
def=proto;
}else{
def=new HostedViewDefinition();
for(var prop in proto){
def[prop]=proto[prop];
}
def.handle=_11f3.ViewId;
}
def.argument=_11f5?map:null;
StageBinding.presentViewDefinition(def);
}else{
throw "Unknown ViewDefinition: "+param.Handle;
}
}
function openGenericView(_11fa){
var def=ViewBinding.clone("Composite.Management.GenericView",_11fa.ViewId);
def.label=_11fa.Label;
def.toolTip=_11fa.ToolTip;
def.image=_11fa.Image;
def.argument={"url":_11fa.Url,"list":paramsToList(_11fa.UrlPostArguments)};
StageBinding.presentViewDefinition(def);
}
function closeView(_11fc){
if(StageBinding.isViewOpen(_11fc.ViewId)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_11fc.ViewId);
}else{
MessageQueue._nextAction();
}
}
function saveStatus(_11fd){
EventBroadcaster.broadcast(BroadcastMessages.CURRENT_SAVED,{handle:_11fd.ViewId,isSuccess:_11fd.Succeeded});
}
this._lockSystem=function(_11fe){
var _11ff=top.bindingMap.offlinetheatre;
if(_11fe){
_11ff.play(true);
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._pokeserver,MessageQueue.INTERVAL_OFFLINE);
}else{
_11ff.stop();
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
var self=this;
setTimeout(function(){
if(self._actions.hasEntries()){
self._nextAction();
}
},0);
}
_11d7=_11fe;
};
this.handleBroadcast=function(_1201,arg){
switch(_1201){
case BroadcastMessages.APPLICATION_LOGIN:
this.initialize();
break;
case BroadcastMessages.VIEW_COMPLETED:
case BroadcastMessages.VIEW_CLOSED:
if(_11d4!=null&&arg==_11d4){
_11d4=null;
this._nextAction();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHING:
if(arg!=null){
_11d5.set(arg,true);
}else{
_11d1.debug("Saa har vi balladen!");
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED:
if(_11d5.hasEntries()){
_11d5.del(arg);
_11d1.debug("Refreshed tree: "+arg+"\n("+_11d5.countEntries()+" trees left!)");
if(!_11d5.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
setTimeout(function(){
MessageQueue._nextAction();
},0);
}
}
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN:
_11d6.set(arg,true);
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN:
if(_11d6.hasEntries()==true){
_11d6.del(arg);
if(!_11d6.hasEntries()){
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
function paramsToList(_1203){
var list=new List();
new List(_1203).each(function(entry){
list.add({name:entry.Key,value:entry.Value});
});
return list;
}
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
};
var ViewDefinitions={"Composite.Management.Null":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.Null"}),"Composite.Management.PostBackDialog":new DialogViewDefinition({handle:"Composite.Management.PostBackDialog",isMutable:true,position:Dialog.MODAL,url:"${root}/content/dialogs/postback/postbackdialog.aspx",argument:{"url":null,"list":null}}),"Composite.Management.PostBackView":new HostedViewDefinition({handle:"Composite.Management.PostBackView",isMutable:true,position:DockBinding.MAIN,url:"${root}/postback.aspx",argument:{"url":null,"list":null}}),"Composite.Management.GenericView":new HostedViewDefinition({handle:"Composite.Management.GenericView",isMutable:true,position:DockBinding.MAIN,url:"${root}/content/views/generic/generic.aspx",label:null,image:null,toolTip:null,argument:{"url":null,"list":null}}),"Composite.Management.Start":new HostedViewDefinition({handle:"Composite.Management.Start",position:DockBinding.START,label:"Welcome Travellers",url:"${root}/content/views/start/start.aspx"}),"Composite.Management.About":new DialogViewDefinition({handle:"Composite.Management.About",position:Dialog.MODAL,url:"${root}/content/dialogs/about/about.aspx"}),"Composite.Management.PermissionEditor":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.PermissionEditor",position:DockBinding.MAIN,url:"${root}/content/views/editors/permissioneditor/permissioneditor.aspx",argument:{serializedEntityToken:"entityTokenType='Composite\\.Plugins\\.Elements\\.ElementProviders\\.VirtualElementProvider\\.VirtualElementProviderEntityToken,Composite'entityToken='_EntityToken_Type_=\\'Composite\\\\\\.Plugins\\\\\\.Elements\\\\\\.ElementProviders\\\\\\.VirtualElementProvider\\\\\\.VirtualElementProviderEntityToken,Composite\\'_EntityToken_Source_=\\'VirtualElementProvider\\'_EntityToken_Id_=\\'DesignPerspective\\''\""}}),"Composite.Management.SystemLog":new HostedViewDefinition({handle:"Composite.Management.SystemLog",position:DockBinding.ABSBOTTOMLEFT,label:"System Log",url:"${root}/content/views/dev/systemlog/systemlog.aspx"}),"Composite.Management.Developer":new HostedViewDefinition({handle:"Composite.Management.Developer",position:DockBinding.ABSBOTTOMRIGHT,label:"Developer",url:"${root}/content/views/dev/developer/developer.aspx"}),"Composite.Management.IconPack.System":new HostedViewDefinition({handle:"Composite.Management.IconPack.System",position:DockBinding.ABSBOTTOMLEFT,label:"Freja",image:"${icon:icon}",url:"${root}/content/views/dev/icons/system/Default.aspx"}),"Composite.Management.IconPack.Republic":new HostedViewDefinition({handle:"Composite.Management.IconPack.Republic",position:DockBinding.ABSBOTTOMLEFT,label:"Republic",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/republic.aspx"}),"Composite.Management.IconPack.Harmony":new HostedViewDefinition({handle:"Composite.Management.IconPack.Harmony",position:DockBinding.ABSBOTTOMLEFT,label:"Harmony",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/harmony.aspx"}),"Composite.Management.Explorer":new HostedViewDefinition({handle:"Composite.Management.Explorer",position:DockBinding.EXPLORER,url:"${root}/content/views/explorer/explorer.aspx",label:"Explorer"}),"Composite.Management.Options":new DialogViewDefinition({handle:"Composite.Management.Options",position:Dialog.MODAL,url:"${root}/content/dialogs/options/options.aspx",label:"Options"}),"Composite.Management.VisualEditorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.VisualEditorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/wysiwygeditor/wysiwygeditordialog.aspx",width:600,argument:{"formattingconfiguration":null,"elementclassconfiguration":null,"configurationstylesheet":null,"presentationstylesheet":null,"embedablefieldstypenames":null}}),"Composite.Management.MultiSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MultiSelectorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/multiselector/multiselectordialog.aspx"}),"Composite.Management.Search":new HostedViewDefinition({handle:"Composite.Management.Search",position:DockBinding.RIGHTBOTTOM,url:"${root}/content/views/search/search.aspx",label:"Search",image:"${icon:view_search}",argument:null}),"Composite.Management.Browser":new HostedViewDefinition({isMutable:false,handle:"Composite.Management.Browser",position:DockBinding.MAIN,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,label:"Page Browser",image:"${icon:page-view-administrated-scope}",toolTip:"Browse unpublished pages",url:"${root}/content/views/browser/browser.aspx",argument:{"URL":null}}),"Composite.Management.SEOAssistant":new HostedViewDefinition({handle:"Composite.Management.SEOAssistant",position:DockBinding.RIGHTTOP,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,url:"${root}/content/views/seoassist/seoassist.aspx",label:"${string:Composite.Web.SEOAssistant:SEOAssistant}",image:"${icon:seoassistant}",toolTip:"Search engine optimization"}),"Composite.Management.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.SourceCodeViewer",position:DockBinding.ABSBOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.User.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.User.SourceCodeViewer",position:DockBinding.BOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.Management.Help":new HostedViewDefinition({label:"Help",image:"${icon:help}",handle:"Composite.Management.Help",position:DockBinding.ABSRIGHTTOP,url:"${root}/content/views/help/help.aspx"}),"Composite.Management.Dialog.Translations":new DialogViewDefinition({handle:"Composite.Management.TranslationsDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/translations/translations.aspx",label:"Translations",image:"${icon:users-changepublicculture}"}),"Composite.Management.ImageSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.ImageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_IMAGESELECTOR,argument:{label:"Select Image",image:"${icon:image}",selectionProperty:"ElementType",selectionValue:"image/jpeg image/gif image/png image/bmp image/tiff",selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WebImages"}]}}),"Composite.Management.EmbeddableMediaSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Media",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:null}]}}),"Composite.Management.FrontendFileSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Frontend File",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"LayoutFileElementProvider"}]}}),"Composite.Management.PageSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Page",image:"${icon:page}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.PageIdSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageIdSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Page",image:"${icon:page}",selectionProperty:"DataId",selectionValue:null,selectionResult:"DataId",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.LinkableSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.LinkableSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Page or File",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"},{key:"MediaFileElementProvider"}]}}),"Composite.Management.MediaSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.MediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Page or File",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider"}]}}),"Composite.Management.FunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.FunctionSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Function",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider"}]}}),"Composite.Management.WidgetFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.WidgetFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Widget",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllWidgetFunctionsElementProvider"}]}}),"Composite.Management.XhtmlDocumentFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.XhtmlDocumentFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Function",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider",search:"AllFunctionsElementProvider.XhtmlDocument"}]}})};
var KickStart=new function(){
var _1206=false;
var _1207=false;
var _1208=null;
var _1209=false;
var _120a=Client.qualifies();
var _120b="admin";
var _120c="123456";
this.fireOnLoad=function(){
if(_120a){
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
this.handleBroadcast=function(_120d){
switch(_120d){
case BroadcastMessages.AUDIO_INITIALIZED:
case BroadcastMessages.PERSISTANCE_INITIALIZED:
kickStart(_120d);
break;
case BroadcastMessages.APPLICATION_STARTUP:
break;
case BroadcastMessages.KEY_ENTER:
this.login();
break;
case BroadcastMessages.APPLICATION_LOGIN:
var _120e=window.bindingMap.appwindow;
_120e.setURL("app.aspx");
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
function fileEventBroadcasterSubscriptions(_120f){
new List([BroadcastMessages.AUDIO_INITIALIZED,BroadcastMessages.PERSISTANCE_INITIALIZED,BroadcastMessages.APPLICATION_STARTUP,BroadcastMessages.APPLICATION_LOGIN,BroadcastMessages.APPLICATION_OPERATIONAL]).each(function(_1210){
if(_120f){
EventBroadcaster.subscribe(_1210,KickStart);
}else{
EventBroadcaster.unsubscribe(_1210,KickStart);
}
});
}
function kickStart(_1211){
switch(_1211){
case BroadcastMessages.AUDIO_INITIALIZED:
_1207=true;
setTimeout(function(){
Persistance.initialize();
},0);
break;
case BroadcastMessages.PERSISTANCE_INITIALIZED:
_1206=true;
break;
}
if(_1206&&_1207){
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
DataManager.getDataBinding("username").setValue(_120b);
DataManager.getDataBinding("password").setValue(_120c);
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
this.doLogin=function(_1214,_1215){
var _1216=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _1217=false;
var _1218=LoginService.ValidateAndLogin(_1214,_1215);
if(_1218 instanceof SOAPFault){
alert(_1218.getFaultString());
}else{
_1217=_1218;
}
if(_1217){
EventBroadcaster.unsubscribe(BroadcastMessages.KEY_ENTER,KickStart);
accessGranted();
}else{
Application.unlock(KickStart);
if(bindingMap.decks!=null){
accesssDenied();
}
}
WebServiceProxy.isFaultHandler=true;
if(_1216){
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
var _1219=DataManager.getDataBinding("username");
var _121a=DataManager.getDataBinding("password");
_1219.blur();
_121a.blur();
_1219.setValue("");
_121a.setValue("");
_1219.clean();
_121a.clean();
_1219.focus();
document.getElementById("loginerror").style.display="block";
var _121b={handleAction:function(_121c){
document.getElementById("loginerror").style.display="none";
_121c.target.removeActionListener(Binding.ACTION_DIRTY,_121b);
}};
bindingMap.loginfields.addActionListener(Binding.ACTION_DIRTY,_121b);
}
WindowManager.fireOnLoad(this);
if(!_120a){
UpdateManager.isEnabled=false;
}
};

