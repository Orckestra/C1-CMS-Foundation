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
_Constants.prototype={COMPOSITE_HOME:"http://www.composite.net",DUMMY_LINK:"javascript:void(false);",APPROOT:temproot,CONFIGROOT:temproot.toLowerCase().replace("composite","Frontend")+"/Config/VisualEditor/",TEMPLATESROOT:temproot+"/templates",SKINROOT:temproot+"/skins/system",TINYMCEROOT:temproot+"/content/misc/editors/wysiwygeditor/tiny_mce",TINYROOT:temproot+"/content/misc/editors/visualeditor/tiny_mce",URL_WSDL_SETUPSERVICE:temproot+"/services/Setup/SetupService.asmx?WSDL",URL_WSDL_CONFIGURATION:temproot+"/services/Configuration/ConfigurationService.asmx?WSDL",URL_WSDL_LOGINSERVICE:temproot+"/services/Login/Login.asmx?WSDL",URL_WSDL_INSTALLSERVICE:temproot+"/services/Installation/InstallationService.asmx?WSDL",URL_WSDL_MESSAGEQUEUE:temproot+"/services/ConsoleMessageQueue/ConsoleMessageQueueServices.asmx?WSDL",URL_WSDL_EDITORCONFIG:temproot+"/services/WysiwygEditor/ConfigurationServices.asmx?WSDL",URL_WSDL_FLOWCONTROLLER:temproot+"/services/FlowController/FlowControllerServices.asmx?WSDL",URL_WSDL_STRINGSERVICE:temproot+"/services/StringResource/StringService.asmx?WSDL",URL_WSDL_TREESERVICE:temproot+"/services/Tree/TreeServices.asmx?WSDL",URL_WSDL_XHTMLTRANSFORM:temproot+"/services/WysiwygEditor/XhtmlTransformations.asmx?WSDL",URL_WSDL_SECURITYSERVICE:temproot+"/services/Tree/SecurityServices.asmx?WSDL",URL_WSDL_READYSERVICE:temproot+"/services/Ready/ReadyService.asmx?WSDL",URL_WSDL_LOCALIZATION:temproot+"/services/Localization/LocalizationService.asmx?WSDL",URL_WSDL_SOURCEVALIDATION:temproot+"/services/SourceEditor/SourceValidationService.asmx?WSDL",URL_WSDL_MARKUPFORMAT:temproot+"/services/SourceEditor/MarkupFormatService.asmx?WSDL",URL_WSDL_SEOSERVICE:temproot+"/services/SearchEngineOptimizationKeyword/SearchEngineOptimizationKeyword.asmx?WSDL",URL_WSDL_PAGESERVICE:temproot+"/services/Page/PageService.asmx?WSDL",URL_WSDL_DIFFSERVICE:temproot+"/services/StringResource/DiffService.asmx?WSDL",NS_XHTML:"http://www.w3.org/1999/xhtml",NS_UI:"http://www.w3.org/1999/xhtml",NX_XUL:"http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",NS_XBL:"http://www.mozilla.org/xbl",NS_WSDL:"http://schemas.xmlsoap.org/wsdl/",NS_SOAP:"http://schemas.xmlsoap.org/wsdl/soap/",NS_ENVELOPE:"http://schemas.xmlsoap.org/soap/envelope/",NS_ENCODING:"http://schemas.xmlsoap.org/soap/encoding/",NS_SCHEMA:"http://www.w3.org/2001/XMLSchema",NS_SCHEMA_INSTANCE:"http://www.w3.org/1999/XMLSchema-instance",NS_DOMPARSEERROR:"http://www.mozilla.org/newlayout/xml/parsererror.xml",NS_NS:"http://www.w3.org/2000/xmlns/",NS_PERSISTANCE:"http://www.composite.net/ns/localstore/persistance",NS_FUNCTION:"http://www.composite.net/ns/function/1.0",SCROLLBAR_DIMENSION_HARDCODED_VALUE:19};
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
def[prop]=_515[prop];
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
Binding.evaluate=function(_51e,_51f){
var _520=null;
var _521=_51f.bindingWindow.WindowManager;
if(_521!=null){
var _522=Binding.parseScriptStatement(_51e,_51f.key);
_520=_521.evaluate(_522);
}
return _520;
};
Binding.parseScriptStatement=function(_523,key){
if(_523!=null&&key!=null){
var _525="UserInterface.getBindingByKey ( \""+key+"\" )";
_523=_523.replace(/(\W|^)this(,| +|\)|;)/g,_525);
_523=_523.replace(/(\W|^)this(\.)/g,_525+".");
}
return _523;
};
Binding.exists=function(_526){
var _527=false;
try{
if(_526&&_526.bindingElement&&_526.bindingElement.nodeType&&_526.isDisposed==false){
_527=true;
}
}
catch(accessDeniedException){
_527=false;
}
finally{
return _527;
}
};
Binding.destroy=function(_528){
if(!_528.isDisposed){
if(_528.acceptor!=null){
_528.acceptor.dispose();
}
if(_528.dragger!=null){
_528.disableDragging();
}
if(_528.boxObject!=null){
_528.boxObject.dispose();
}
if(_528._domEventHandlers!=null){
DOMEvents.cleanupEventListeners(_528);
}
for(var _529 in _528.shadowTree){
var _52a=_528.shadowTree[_529];
if(_52a instanceof Binding&&Binding.exists(_52a)){
_52a.dispose(true);
}
_528.shadowTree[_529]=null;
}
_528.isDisposed=true;
_528=null;
}
};
Binding.dotnetify=function(_52b,_52c){
var _52d=_52b.getCallBackID();
if(_52d!=null){
var _52e=DOMUtil.createElementNS(Constants.NS_XHTML,"input",_52b.bindingDocument);
_52e.type="hidden";
_52e.id=_52d;
_52e.name=_52d;
_52e.value=_52c!=null?_52c:"";
_52b.bindingElement.appendChild(_52e);
_52b.shadowTree.dotnetinput=_52e;
}else{
throw _52b.toString()+": Missing callback ID";
}
};
Binding.imageProfile=function(_52f){
var _530=_52f.getProperty("image");
var _531=_52f.getProperty("image-hover");
var _532=_52f.getProperty("image-active");
var _533=_52f.getProperty("image-disabled");
if(_52f.imageProfile==null){
if(_52f.image==null&&_530!=null){
_52f.image=_530;
}
if(_52f.imageHover==null&&_531!=null){
_52f.imageHover=_530;
}
if(_52f.imageActive==null&&_532!=null){
_52f.imageActive=_532;
}
if(_52f.imageDisabled==null&&_533!=null){
_52f.imageDisabled=_533;
}
if(_52f.image||_52f.imageHover||_52f.imageActive||_52f.imageDisabled){
_52f.imageProfile=new ImageProfile(_52f);
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
var _535=this.dependentBindings[key];
_535.onMemberInitialize(this);
}
}
this.isInitialized=true;
};
Binding.prototype.onMemberInitialize=function(_536){
if(_536){
this.memberDependencies[_536.key]=true;
var _537=true;
for(var key in this.memberDependencies){
if(this.memberDependencies[key]==false){
_537=false;
break;
}
}
if(_537){
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
Binding.prototype.detachRecursive=function(_539){
if(_539==null){
_539=false;
}
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement,!_539);
};
Binding.prototype.addMember=function(_53a){
if(!this.isAttached){
throw "Cannot add members to unattached binding";
}else{
if(!_53a.isInitialized){
if(!this.memberDependencies){
this.memberDependencies={};
}
this.memberDependencies[_53a.key]=false;
_53a.registerDependentBinding(this);
}
}
return _53a;
};
Binding.prototype.addMembers=function(_53b){
while(_53b.hasNext()){
var _53c=_53b.getNext();
if(!_53c.isInitialized){
this.addMember(_53c);
}
}
return _53b;
};
Binding.prototype.registerDependentBinding=function(_53d){
if(!this.dependentBindings){
this.dependentBindings={};
}
this.dependentBindings[_53d.key]=_53d;
};
Binding.prototype._initializeBindingPersistanceFeatures=function(){
var _53e=this.getProperty("persist");
if(_53e&&Persistance.isEnabled){
var id=this.bindingElement.id;
if(!KeyMaster.hasKey(id)){
this._persist={};
var _540=new List(_53e.split(" "));
while(_540.hasNext()){
var prop=_540.getNext();
var _542=Persistance.getPersistedProperty(id,prop);
if(_542!=null){
this._persist[prop]=_542;
this.setProperty(prop,_542);
}else{
_542=this.getProperty(prop);
if(_542!=null){
this._persist[prop]=_542;
}
}
}
}else{
throw "Persistable bindings must have a specified ID.";
}
}
};
Binding.prototype._initializeBindingGeneralFeatures=function(){
var _543=this.getProperty("disabled");
var _544=this.getProperty("contextmenu");
var _545=this.getProperty("observes");
var _546=this.getProperty("onattach");
var _547=this.getProperty("hidden");
var _548=this.getProperty("blockactionevents");
if(_547==true&&this.isVisible==true){
this.hide();
}
if(_543&&this.logger!=null){
this.logger.error("The 'disabled' property has been renamed 'isdisbaled'");
}
if(_544){
this.setContextMenu(_544);
}
if(_545){
this.observe(this.getBindingForArgument(_545));
}
if(_548==true){
this.isBlockingActions=true;
}
if(this.isActivationAware==true){
var root=UserInterface.getBinding(this.bindingDocument.body);
root.makeActivationAware(this);
this._hasActivationAwareness=true;
}
if(_546!=null){
Binding.evaluate(_546,this);
}
};
Binding.prototype._initializeBindingDragAndDropFeatures=function(){
var _54a=this.getProperty("draggable");
var _54b=this.getProperty("dragtype");
var _54c=this.getProperty("dragaccept");
var _54d=this.getProperty("dragreject");
if(_54a!=null){
this.isDraggable=_54a;
}
if(_54b!=null){
this.dragType=_54b;
if(_54a!=false){
this.isDraggable=true;
}
}
if(_54c!=null){
this.dragAccept=_54c;
}
if(_54d!=null){
this.dragReject=_54d;
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
Binding.prototype._updateBindingMap=function(_54e){
try{
if(this.bindingWindow!=null){
var id=this.bindingElement.id;
var map=this.bindingWindow.bindingMap;
var _551=null;
if(_54e){
_551=map[id];
if(_551!=null&&_551!=this){
var cry=this.toString()+" duplicate binding ID: "+id;
this.logger.error(cry);
if(Application.isDeveloperMode){
throw (cry);
}
}else{
map[id]=this;
}
}else{
_551=map[id];
if(_551!=null&&_551==this){
delete map[id];
}
}
}else{
var _553=new String("Binding#_updateBindingMap odd dysfunction: "+this.toString()+": "+_54e);
if(Application.isDeveloperMode==true){
alert(_553);
}else{
this.logger.error(_553);
}
}
}
catch(exception){
this.logger.error(exception);
}
};
Binding.prototype.handleEvent=function(e){
};
Binding.prototype.handleAction=function(_555){
};
Binding.prototype.handleBroadcast=function(_556,arg){
};
Binding.prototype.handleElement=function(_558){
return false;
};
Binding.prototype.updateElement=function(_559){
return false;
};
Binding.prototype.getBindingForArgument=function(arg){
var _55b=null;
switch(typeof arg){
case "object":
_55b=arg;
break;
case "string":
_55b=this.bindingDocument.getElementById(arg);
if(_55b==null){
_55b=Binding.evaluate(arg,this);
}
break;
}
if(_55b!=null&&_55b.nodeType!=null){
_55b=UserInterface.getBinding(_55b);
}
return _55b;
};
Binding.prototype.serialize=function(){
var _55c={};
var id=this.bindingElement.id;
if(id&&id!=this.key){
_55c.id=id;
}
var _55e=this.getProperty("binding");
if(_55e){
_55c.binding=_55e;
}
if(!BindingSerializer.includeShadowTreeBindings){
var _55f=this.getAncestorBindingByLocalName("*");
if(_55f){
if(_55f.isShadowBinding){
this.isShadowBinding=true;
_55c=false;
}else{
var tree=_55f.shadowTree;
for(var key in tree){
var _562=tree[key];
if(_562==this){
this.isShadowBinding=true;
_55c=false;
}
}
}
}
}
return _55c;
};
Binding.prototype.serializeToString=function(_563){
var _564=null;
if(this.isAttached){
_564=new BindingSerializer().serializeBinding(this,_563);
}else{
throw "cannot serialize unattached binding";
}
return _564;
};
Binding.prototype.subTreeFromString=function(_565){
this.detachRecursive();
this.bindingElement.innerHTML=_565;
this.attachRecursive();
};
Binding.prototype.getProperty=function(_566){
var _567=this.bindingElement.getAttribute(_566);
if(_567){
_567=Types.castFromString(_567);
}
return _567;
};
Binding.prototype.setProperty=function(prop,_569){
if(_569!=null){
_569=_569.toString();
if(String(this.bindingElement.getAttribute(prop))!=_569){
this.bindingElement.setAttribute(prop,_569);
if(this.isAttached==true){
if(Persistance.isEnabled&&_569!=null){
if(this._persist!=null&&this._persist[prop]){
this._persist[prop]=_569;
Persistance.setPersistedProperty(this.bindingElement.id,prop,_569);
}
}
var _56a=this.propertyMethodMap[prop];
if(_56a){
_56a.call(this,this.getProperty(prop));
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
var _56c=null;
if(Binding.exists(this)){
_56c=this.bindingElement.id;
}else{
SystemDebug.stack(arguments);
}
return _56c;
};
Binding.prototype.attachClassName=function(_56d){
CSSUtil.attachClassName(this.bindingElement,_56d);
};
Binding.prototype.detachClassName=function(_56e){
CSSUtil.detachClassName(this.bindingElement,_56e);
};
Binding.prototype.hasClassName=function(_56f){
return CSSUtil.hasClassName(this.bindingElement,_56f);
};
Binding.prototype.addActionListener=function(type,_571){
_571=_571!=null?_571:this;
if(Action.isValid(type)){
if(Interfaces.isImplemented(IActionListener,_571)){
if(!this.actionListeners[type]){
this.actionListeners[type]=[];
}
this.actionListeners[type].push(_571);
}else{
throw new Error("Could not add action-event listener. Method handleAction not implemented.");
}
}else{
alert(this+"\nCould not add undefined Action ("+_571+")");
}
};
Binding.prototype.removeActionListener=function(type,_573){
_573=_573?_573:this;
if(Action.isValid(type)){
var _574=this.actionListeners[type];
if(_574){
var i=0,_576;
while((_576=_574[i])!=null){
if(_576==_573){
_574.splice(i,1);
break;
}
i++;
}
}
}
};
Binding.prototype.addEventListener=function(type,_578){
_578=_578?_578:this;
DOMEvents.addEventListener(this.bindingElement,type,_578);
};
Binding.prototype.removeEventListener=function(type,_57a){
_57a=_57a?_57a:this;
DOMEvents.removeEventListener(this.bindingElement,type,_57a);
};
Binding.prototype.subscribe=function(_57b){
if(!this.hasSubscription(_57b)){
this._subscriptions.set(_57b,true);
EventBroadcaster.subscribe(_57b,this);
}else{
this.logger.error("Dubplicate subscription aborted:"+_57b);
}
};
Binding.prototype.unsubscribe=function(_57c){
if(this.hasSubscription(_57c)){
this._subscriptions.del(_57c);
EventBroadcaster.unsubscribe(_57c,this);
}
};
Binding.prototype.hasSubscription=function(_57d){
return this._subscriptions.has(_57d);
};
Binding.prototype.observe=function(_57e,_57f){
_57e.addObserver(this,_57f);
};
Binding.prototype.unObserve=function(_580,_581){
_580.removeObserver(this,_581);
};
Binding.prototype.setContextMenu=function(arg){
this.contextMenuBinding=this.getBindingForArgument(arg);
if(this.contextMenuBinding){
var self=this;
var menu=this.contextMenuBinding;
this.addEventListener(DOMEvents.CONTEXTMENU,{handleEvent:function(e){
if(Interfaces.isImplemented(IActionListener,self)==true){
var _586={handleAction:function(){
menu.removeActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.removeActionListener(PopupBinding.ACTION_HIDE,_586);
}};
menu.addActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.addActionListener(PopupBinding.ACTION_HIDE,_586);
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
var _588=null;
var _589=null;
var _58a=false;
if(arg instanceof Action){
_588=arg;
}else{
if(Action.isValid(arg)){
_588=new Action(this,arg);
_58a=true;
}
}
if(_588!=null&&Action.isValid(_588.type)==true){
if(_588.isConsumed==true){
_589=_588;
}else{
var _58b=this.actionListeners[_588.type];
if(_58b!=null){
_588.listener=this;
var i=0,_58d;
while((_58d=_58b[i++])!=null){
if(_58d&&_58d.handleAction){
_58d.handleAction(_588);
}
}
}
var _58e=true;
if(this.isBlockingActions==true){
switch(_588.type){
case Binding.ACTION_FOCUSED:
case Binding.ACTION_BLURRED:
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FORCE_REFLEX:
case DockTabBinding.ACTION_UPDATE_VISUAL:
case PageBinding.ACTION_DOPOSTBACK:
break;
default:
if(!_58a){
_58e=false;
}
break;
}
}
if(_58e){
_589=this.migrateAction(_588);
}else{
_589=_588;
}
}
}
return _589;
};
Binding.prototype.migrateAction=function(_58f){
var _590=null;
var _591=null;
var node=this.getMigrationParent();
if(node){
while(node&&!_590&&node.nodeType!=Node.DOCUMENT_NODE){
_590=UserInterface.getBinding(node);
node=node.parentNode;
}
if(_590){
_591=_590.dispatchAction(_58f);
}else{
_591=_58f;
}
}
return _591;
};
Binding.prototype.reflex=function(_593){
if(Application.isOperational==true){
FlexBoxBinding.reflex(this,_593);
}
};
Binding.prototype.getMigrationParent=function(){
var _594=null;
if(true){
try{
var _595=this.bindingElement.parentNode;
if(_595!=null){
_594=_595;
}
}
catch(wtfException){
this.logger.error("Binding#getMigrationParent exception");
SystemDebug.stack(arguments);
_594=null;
}
}
return _594;
};
Binding.prototype.add=function(_596){
if(_596.bindingDocument==this.bindingDocument){
this.bindingElement.appendChild(_596.bindingElement);
}else{
throw "Could not add "+_596.toString()+" of different document origin.";
}
return _596;
};
Binding.prototype.addFirst=function(_597){
if(_597.bindingDocument==this.bindingDocument){
this.bindingElement.insertBefore(_597.bindingElement,this.bindingElement.firstChild);
}else{
throw "Could not add "+_597.toString()+" of different document origin.";
}
return _597;
};
Binding.prototype.getAncestorBindingByLocalName=function(_598,_599){
return BindingFinder.getAncestorBindingByLocalName(this,_598,_599);
};
Binding.prototype.getAncestorBindingByType=function(impl,_59b){
return BindingFinder.getAncestorBindingByType(this,impl,_59b);
};
Binding.prototype.getChildBindingByType=function(impl){
return BindingFinder.getChildBindingByType(this,impl);
};
Binding.prototype.getChildElementsByLocalName=function(_59d){
return BindingFinder.getChildElementsByLocalName(this,_59d);
};
Binding.prototype.getChildElementByLocalName=function(_59e){
return this.getChildElementsByLocalName(_59e).getFirst();
};
Binding.prototype.getDescendantElementsByLocalName=function(_59f){
return new List(DOMUtil.getElementsByTagName(this.bindingElement,_59f));
};
Binding.prototype.getChildBindingsByLocalName=function(_5a0){
return this.getDescendantBindingsByLocalName(_5a0,true);
};
Binding.prototype.getChildBindingByLocalName=function(_5a1){
return this.getChildBindingsByLocalName(_5a1).getFirst();
};
Binding.prototype.getDescendantBindingsByLocalName=function(_5a2,_5a3){
return BindingFinder.getDescendantBindingsByLocalName(this,_5a2,_5a3);
};
Binding.prototype.getDescendantBindingByLocalName=function(_5a4){
return this.getDescendantBindingsByLocalName(_5a4,false).getFirst();
};
Binding.prototype.getDescendantBindingsByType=function(impl){
return BindingFinder.getDescendantBindingsByType(this,impl);
};
Binding.prototype.getDescendantBindingByType=function(impl){
return BindingFinder.getDescendantBindingByType(this,impl);
};
Binding.prototype.getNextBindingByLocalName=function(_5a7){
return BindingFinder.getNextBindingByLocalName(this,_5a7);
};
Binding.prototype.getPreviousBindingByLocalName=function(_5a8){
return BindingFinder.getPreviousBindingByLocalName(this,_5a8);
};
Binding.prototype.getBindingElement=function(){
return this.bindingDocument.getElementById(this.bindingElement.id);
};
Binding.prototype.getOrdinalPosition=function(_5a9){
return DOMUtil.getOrdinalPosition(this.bindingElement,_5a9);
};
Binding.prototype.isFirstBinding=function(_5aa){
return (this.getOrdinalPosition(_5aa)==0);
};
Binding.prototype.isLastBinding=function(_5ab){
return DOMUtil.isLastElement(this.bindingElement,_5ab);
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
Binding.prototype.setCallBackArg=function(_5ad){
this.setProperty(Binding.CALLBACKARG,_5ad);
};
Binding.prototype.dispose=function(_5ae){
if(!this.isDisposed){
if(!_5ae){
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement);
var _5af=this.bindingDocument.getElementById(this.bindingElement.id);
if(_5af){
if(Client.isExplorer){
_5af.outerHTML="";
}else{
_5af.parentNode.removeChild(_5af);
}
}
}else{
if(this._subscriptions.hasEntries()){
var self=this;
var list=new List();
this._subscriptions.each(function(_5b2){
list.add(_5b2);
});
list.each(function(_5b3){
self.unsubscribe(_5b3);
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
Binding.prototype.wakeUp=function(_5b5,_5b6){
_5b6=_5b6?_5b6:Binding.SNOOZE;
if(this.isLazy==true){
this.deleteProperty("lazy");
this.isLazy=false;
Application.lock(this);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
var self=this;
setTimeout(function(){
self.attachRecursive();
setTimeout(function(){
if(_5b5!==undefined){
self[_5b5]();
}
LazyBindingBinding.wakeUp(self);
Application.unlock(self);
},_5b6);
},0);
}
};
Binding.prototype.handleCrawler=function(_5b8){
if(_5b8.response==null&&this.isLazy==true){
if(_5b8.id==DocumentCrawler.ID&&_5b8.mode==DocumentCrawler.MODE_REGISTER){
_5b8.response=NodeCrawler.NORMAL;
}else{
_5b8.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5b8.response==null&&this.crawlerFilters!=null){
if(this.crawlerFilters.has(_5b8.id)){
_5b8.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5b8.response==null){
switch(_5b8.id){
case FlexBoxCrawler.ID:
case FocusCrawler.ID:
if(!this.isVisible){
_5b8.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
}
};
Binding.newInstance=function(_5b9){
var _5ba=DOMUtil.createElementNS(Constants.NS_UI,"ui:binding",_5b9);
return UserInterface.registerBinding(_5ba,Binding);
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
var _5bb=new List(ConfigurationService.GetValidatingRegularExpressions("dummy"));
_5bb.each(function(_5bc){
DataBinding.expressions[_5bc.Key]=new RegExp(_5bc.Value);
});
}});
DataBinding.expressions={};
DataBinding.warnings={"required":"Required","number":"Numbers only","integer":"Integers only","programmingidentifier":"Invalid identifier","programmingnamespace":"Invalid namespace","url":"Invalid URL","minlength":"${count} characters minimum","maxlength":"${count} characters maximum","currency":"Invalid notation","email":"Invalid e-mail","guid":"Invalid GUID"};
DataBinding.errors={"programmingidentifier":"An identifier must not contain spaces or special characters. Only characters a-z, A-Z and 0-9 are allowed. An identifier must begin with a letter (not a number).","programmingnamespace":"A namespace must take the form Example.Name.Space where only characters a-z, A-Z, 0-9 and dots (.) are allowed. Each part of the namespace must begin with a letter (not a number).","url":"A valid URL must begin with a forward slash, designating the site root, or an URL scheme name such as http://. Simpliefied addresses such as www.example.com cannot be resolved reliably by the browser. Relative URLs are not supported."};
DataBinding.getAssociatedLabel=function(_5bd){
var _5be=null;
var _5bf=_5bd.getAncestorBindingByLocalName("field");
if(_5bf&&_5bf instanceof FieldBinding){
var desc=_5bf.getDescendantBindingByLocalName("fielddesc");
if(desc&&desc instanceof FieldDescBinding){
_5be=desc.getLabel();
}
}
return _5be;
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
var _5c2=this.bindingWindow.DataManager;
_5c2.unRegisterDataBinding(this._name);
};
DataBinding.prototype.setName=function(name){
var _5c4=this.bindingWindow.DataManager;
if(_5c4.getDataBinding(name)){
_5c4.unRegisterDataBinding(name);
}
_5c4.registerDataBinding(name,this);
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
RootBinding.prototype.handleBroadcast=function(_5c5,arg){
RootBinding.superclass.handleBroadcast.call(this,_5c5,arg);
var _5c7=this.bindingWindow.WindowManager.WINDOW_EVALUATED_BROADCAST;
switch(_5c5){
case _5c7:
this.dispatchAction(RootBinding.ACTION_PHASE_1);
this.dispatchAction(RootBinding.ACTION_PHASE_2);
this.dispatchAction(RootBinding.ACTION_PHASE_3);
this.unsubscribe(_5c7);
break;
}
};
RootBinding.prototype.onActivate=function(){
this._onActivationChanged(true);
};
RootBinding.prototype.onDeactivate=function(){
this._onActivationChanged(false);
};
RootBinding.prototype._onActivationChanged=function(_5c8){
var _5c9=_5c8?RootBinding.ACTION_ACTIVATED:RootBinding.ACTION_DEACTIVATED;
if(_5c8!=this.isActivated){
this.isActivated=_5c8;
this.dispatchAction(_5c9);
var _5ca=new List();
var self=this;
this._activationawares.each(function(_5cc){
if(_5cc.isActivationAware){
try{
if(_5c8){
if(!_5cc.isActivated){
_5cc.onActivate();
}
}else{
if(_5cc.isActivated){
_5cc.onDeactivate();
}
}
}
catch(exception){
self.logger.error(exception);
_5ca.add(_5cc);
}
}
});
_5ca.each(function(_5cd){
this._activationawares.del(_5cd);
});
_5ca.dispose();
}else{
var _5ce="Activation dysfunction: "+this.bindingDocument.title;
if(Application.isDeveloperMode==true){
this.logger.error(_5ce);
}else{
this.logger.error(_5ce);
}
}
};
RootBinding.prototype.makeActivationAware=function(_5cf,_5d0){
if(Interfaces.isImplemented(IActivationAware,_5cf,true)==true){
if(_5d0==false){
this._activationawares.del(_5cf);
}else{
this._activationawares.add(_5cf);
if(this.isActivated==true){
_5cf.onActivate();
}
}
}else{
if(Application.isDeveloperMode==true){
alert("RootBinding: IActivationAware not implemented ("+_5cf+")");
}
}
};
RootBinding.prototype._setupActivationAwareness=function(_5d1){
var _5d2=this.getMigrationParent();
if(_5d2!=null){
var root=_5d2.ownerDocument.body;
var _5d4=UserInterface.getBinding(root);
if(_5d4!=null){
_5d4.makeActivationAware(this,_5d1);
}
}
};
RootBinding.prototype.handleCrawler=function(_5d5){
RootBinding.superclass.handleCrawler.call(this,_5d5);
if(_5d5.type==NodeCrawler.TYPE_ASCENDING){
_5d5.nextNode=this.bindingWindow.frameElement;
}
};
RootBinding.prototype.getMigrationParent=function(){
var _5d6=null;
if(this.bindingWindow.parent){
_5d6=this.bindingWindow.frameElement;
}
return _5d6;
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
var _5d7=new List(DOMUtil.getElementsByTagName(this.bindingElement,"td"));
while(_5d7.hasNext()){
var cell=_5d7.getNext();
this.shadowTree[cell.className]=cell;
}
};
MatrixBinding.prototype.add=function(_5d9){
var _5da=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
this.shadowTree[MatrixBinding.CENTER].appendChild(_5d9.bindingElement);
_5da=_5d9;
}else{
_5da=MatrixBinding.superclass.add.call(this,_5d9);
}
return _5da;
};
MatrixBinding.prototype.addFirst=function(_5db){
var _5dc=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
var _5dd=this.shadowTree[MatrixBinding.CENTER];
_5dd.insertBefore(_5db.bindingElement,_5dd.firstChild);
_5dc=_5db;
}else{
_5dc=MatrixBinding.superclass.addFirst.call(this,_5db);
}
return _5db;
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
MatrixBinding.newInstance=function(_5df){
var _5e0=DOMUtil.createElementNS(Constants.NS_UI,"ui:matrix",_5df);
return UserInterface.registerBinding(_5e0,MatrixBinding);
};
FlexBoxBinding.prototype=new Binding;
FlexBoxBinding.prototype.constructor=FlexBoxBinding;
FlexBoxBinding.superclass=Binding.prototype;
FlexBoxBinding.CLASSNAME="flexboxelement";
FlexBoxBinding.TIMEOUT=250;
FlexBoxBinding.reflex=function(_5e1,_5e2){
var list=new List();
var _5e4=new FlexBoxCrawler();
_5e4.mode=_5e2?FlexBoxCrawler.MODE_FORCE:FlexBoxCrawler.MODE_NORMAL;
_5e4.startBinding=_5e1;
_5e4.crawl(_5e1.bindingElement,list);
list.each(function(_5e5){
_5e5.flex();
});
if(Client.isExplorer){
setTimeout(function(){
list.each(function(_5e6){
if(Binding.exists(_5e6)){
_5e6.flex();
}
});
},0.5*FlexBoxBinding.TIMEOUT);
}
setTimeout(function(){
list.each(function(_5e7){
if(Binding.exists(_5e7)){
_5e7.isFlexSuspended=false;
}
});
list.dispose();
},FlexBoxBinding.TIMEOUT);
_5e4.dispose();
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
FlexBoxBinding.prototype.handleAction=function(_5e8){
FlexBoxBinding.superclass.handleAction.call(this,_5e8);
switch(_5e8.type){
case Binding.ACTION_UPDATED:
this.isFit=false;
break;
}
};
FlexBoxBinding.prototype._getSiblingsSpan=function(_5e9){
var _5ea=0;
var _5eb=new List(this.bindingElement.parentNode.childNodes);
while(_5eb.hasNext()){
var _5ec=_5eb.getNext();
if(_5ec.nodeType==Node.ELEMENT_NODE&&_5ec!=this.bindingElement){
if(!this._isOutOfFlow(_5ec)){
var rect=_5ec.getBoundingClientRect();
if(_5e9){
height+=(rect.right-rect.left);
}else{
_5ea+=(rect.bottom-rect.top);
}
}
}
}
return _5ea;
};
FlexBoxBinding.prototype._isOutOfFlow=function(_5ee){
var _5ef=CSSComputer.getPosition(_5ee);
var _5f0=CSSComputer.getFloat(_5ee);
return (_5ef=="absolute"||_5f0!="none"?true:false);
};
FlexBoxBinding.prototype._getCalculatedHeight=function(){
var _5f1=this.bindingElement.parentNode;
var rect=_5f1.getBoundingClientRect();
var _5f3=rect.bottom-rect.top;
var _5f4=CSSComputer.getPadding(_5f1);
var _5f5=CSSComputer.getBorder(_5f1);
_5f3-=(_5f4.top+_5f4.bottom);
_5f3-=(_5f5.top+_5f5.bottom);
return _5f3;
};
FlexBoxBinding.prototype._getCalculatedWidth=function(){
var _5f6=this.bindingElement.parentNode;
var rect=_5f6.getBoundingClientRect();
var _5f8=rect.right-rect.left;
var _5f9=CSSComputer.getPadding(_5f6);
var _5fa=CSSComputer.getBorder(_5f6);
_5f8-=(_5f9.left+_5f9.right);
_5f8-=(_5fa.left+_5fa.right);
return _5f8;
};
FlexBoxBinding.prototype.setFlexibility=function(_5fb){
if(_5fb!=this.isFlexible){
if(_5fb){
this.attachClassName(FlexBoxBinding.CLASSNAME);
this.deleteProperty("flex");
}else{
this.detachClassName(FlexBoxBinding.CLASSNAME);
this.setProperty("flex",false);
}
this.isFlexible=_5fb;
}
};
FlexBoxBinding.prototype.flex=function(){
if(Binding.exists(this)){
if(this.isFlexible==true){
var _5fc=this._getSiblingsSpan();
_5fc=this._getCalculatedHeight()-_5fc;
if(!isNaN(_5fc)&&_5fc>=0){
if(_5fc!=this.bindingElement.offsetHeight){
this.bindingElement.style.height=String(_5fc)+"px";
}
}
}
}
};
FlexBoxBinding.prototype.fit=function(_5fd){
if(!this.isFit||_5fd){
var _5fe=0;
new List(this.bindingElement.childNodes).each(function(_5ff){
if(_5ff.nodeType==Node.ELEMENT_NODE){
if(!this._isOutOfFlow(_5ff)){
var rect=_5ff.getBoundingClientRect();
_5fe+=(rect.bottom-rect.top);
}
}
},this);
this._setFitnessHeight(_5fe);
this.isFit=true;
}
};
FlexBoxBinding.prototype._setFitnessHeight=function(_601){
var _602=CSSComputer.getPadding(this.bindingElement);
var _603=CSSComputer.getBorder(this.bindingElement);
_601+=_602.top+_602.bottom;
_601+=_603.top+_603.bottom;
this.bindingElement.style.height=_601+"px";
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
ScrollBoxBinding.prototype.handleAction=function(_604){
ScrollBoxBinding.superclass.handleAction.call(this,_604);
switch(_604.type){
case BalloonBinding.ACTION_INITIALIZE:
_604.consume();
break;
}
};
ScrollBoxBinding.prototype.setPosition=function(_605){
this.bindingElement.scrollLeft=_605.x;
this.bindingElement.scrollTop=_605.y;
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
var _606=this._getBuildElement("labeltext");
if(_606){
this.shadowTree.labelText=_606;
this.shadowTree.text=_606.firstChild;
this.hasLabel=true;
}
}else{
var _607=this.getProperty("label");
var _608=this.getProperty("image");
var _609=this.getProperty("tooltip");
if(_607){
this.setLabel(_607,false);
}
if(_608){
this.setImage(_608,false);
}
if(_609){
this.setToolTip(_609);
}
this.buildClassName();
}
};
LabelBinding.prototype.setLabel=function(_60a,_60b){
_60a=_60a?_60a:"";
if(!this.hasLabel){
this.buildLabel();
}
this.shadowTree.text.data=Resolver.resolve(_60a);
this.setProperty("label",_60a);
if(!_60b){
this.buildClassName();
}
};
LabelBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
LabelBinding.prototype.setImage=function(url,_60d){
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
if(!_60d){
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
LabelBinding.prototype.setToolTip=function(_610){
this.setProperty("tooltip",_610);
if(_610!=this.getLabel()){
this.setProperty("title",Resolver.resolve(_610));
}
};
LabelBinding.prototype.getToolTip=function(_611){
return this.getProperty("tooltip");
};
LabelBinding.prototype.flip=function(_612){
_612=_612==null?true:_612;
var _613=LabelBinding.CLASSNAME_FLIPPED;
if(!Client.isExplorer6){
this.isFlipped=_612;
if(_612){
this.attachClassName(_613);
}else{
this.detachClassName(_613);
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
var _614="textonly";
var _615="imageonly";
var _616="both";
if(this.hasLabel&&this.hasImage){
this.detachClassName(_614);
this.detachClassName(_615);
this.attachClassName(_616);
}else{
if(this.hasLabel){
this.detachClassName(_616);
this.detachClassName(_615);
this.attachClassName(_614);
}else{
if(this.hasImage){
this.detachClassName(_616);
this.detachClassName(_614);
this.attachClassName(_615);
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
LabelBinding.newInstance=function(_617){
var _618=DOMUtil.createElementNS(Constants.NS_UI,"ui:labelbox",_617);
return UserInterface.registerBinding(_618,LabelBinding);
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
var _619=this.getProperty("label");
if(!_619){
_619=DOMUtil.getTextContent(this.bindingElement);
}
var text=this.bindingDocument.createTextNode(Resolver.resolve(_619));
this.bindingElement.parentNode.replaceChild(text,this.bindingElement);
this.dispose();
};
TextBinding.prototype.setLabel=function(_61b){
this.setProperty("label",_61b);
};
TextBinding.newInstance=function(_61c){
var _61d=DOMUtil.createElementNS(Constants.NS_UI,"ui:text",_61c);
return UserInterface.registerBinding(_61d,TextBinding);
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
BroadcasterBinding.prototype.setProperty=function(_61e,_61f){
BroadcasterBinding.superclass.setProperty.call(this,_61e,_61f);
function update(list){
if(list){
list.each(function(_621){
_621.setProperty(_61e,_61f);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _622=this._observers[_61e];
if(_622){
update(_622);
}
};
BroadcasterBinding.prototype.deleteProperty=function(_623){
BroadcasterBinding.superclass.deleteProperty.call(this,_623);
function update(list){
if(list){
list.each(function(_625){
_625.deleteProperty(_623);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _626=this._observers[_623];
if(_626){
update(_626);
}
};
BroadcasterBinding.prototype.addObserver=function(_627,_628){
_628=_628?_628:"*";
_628=new List(_628.split(" "));
while(_628.hasNext()){
var _629=_628.getNext();
switch(_629){
case "*":
this._setAllProperties(_627);
break;
default:
var _62a=this.getProperty(_629);
_627.setProperty(_629,_62a);
break;
}
if(!this._observers[_629]){
this._observers[_629]=new List();
}
this._observers[_629].add(_627);
}
};
BroadcasterBinding.prototype._setAllProperties=function(_62b){
var atts=new List(this.bindingElement.attributes);
while(atts.hasNext()){
var att=atts.getNext();
if(att.specified){
var _62e=att.nodeName;
switch(_62e){
case "id":
case "key":
break;
default:
var _62f=this.getProperty(_62e);
_62b.setProperty(_62e,_62f);
break;
}
}
}
};
BroadcasterBinding.prototype.removeObserver=function(_630,_631){
_631=_631?_631:"*";
_631=new List(_631.split(" "));
while(_631.hasNext()){
var list=this._observers[_631.getNext()];
if(list){
while(list.hasNext()){
var _633=list.getNext();
if(_633==_630){
list.del(_633);
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
BroadcasterBinding.prototype.setDisabled=function(_634){
this.setProperty("isdisabled",_634);
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
var _636=this.getProperty("width");
var _637=this.getProperty("label");
var type=this.getProperty("type");
var _639=this.getProperty("popup");
var _63a=this.getProperty("tooltip");
var _63b=this.getProperty("isdisabled");
var _63c=this.getProperty("response");
var _63d=this.getProperty("oncommand");
var _63e=this.getProperty("value");
var _63f=this.getProperty("ischecked");
var _640=this.getProperty("callbackid");
var _641=this.getProperty("focusable");
var _642=this.getProperty("focused");
var _643=this.getProperty("default");
var url=this.getProperty("url");
var _645=this.getProperty("flip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.add(this.labelBinding);
this.labelBinding.attach();
this.shadowTree.labelBinding=this.labelBinding;
if(_645){
this.flip(true);
}
if(!this._stateManager){
this._stateManager=new ButtonStateManager(this);
}
if(this.imageProfile!=null&&this.imageProfile.getDefaultImage()!=null){
this.setImage(this.imageProfile.getDefaultImage());
}
if(_637!=null){
this.setLabel(_637);
}
if(type!=null){
this.setType(type);
}
if(_63a!=null){
this.setToolTip(_63a);
}
if(_636!=null){
this.setWidth(_636);
}
if(_639!=null){
this.setPopup(_639);
}
if(_63c!=null){
this.response=_63c;
}
if(_63f==true){
if(this.isCheckButton||this.isRadioButton){
this.check(true);
}
}
if(_63d!=null&&this.oncommand==null){
this.oncommand=function(){
Binding.evaluate(_63d,this);
};
}
if(_641||this.isFocusable){
this._makeFocusable();
if(_643||this.isDefault){
this.isDefault=true;
}
if(_642){
this.focus();
}
}
if(_63b==true){
this.disable();
}
if(url!=null){
this.setURL(url);
}
if(_640!=null){
this.bindingWindow.DataManager.registerDataBinding(_640,this);
if(_63e!=null){
Binding.dotnetify(this,_63e);
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
ButtonBinding.prototype.setImage=function(_646){
if(this.isAttached){
this.labelBinding.setImage(_646);
}
this.setProperty("image",_646);
};
ButtonBinding.prototype.getImage=function(){
return this.getProperty("image");
};
ButtonBinding.prototype.setLabel=function(_647){
if(this.isAttached){
this.labelBinding.setLabel(_647);
}
this.setProperty("label",_647);
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
ButtonBinding.prototype.setToolTip=function(_649){
this.setProperty("tooltip",_649);
if(this.isAttached==true){
this.setProperty("title",Resolver.resolve(_649));
}
};
ButtonBinding.prototype.getToolTip=function(){
return this.getProperty("tooltip");
};
ButtonBinding.prototype.setImageProfile=function(_64a){
this.imageProfile=new _64a(this);
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
ButtonBinding.prototype.flip=function(_64f){
_64f=_64f==null?true:_64f;
this.isFlipped=_64f;
this.setProperty("flip",_64f);
if(this.isAttached){
this.labelBinding.flip(_64f);
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
ButtonBinding.prototype.check=function(_650){
if((this.isCheckButton||this.isRadioButton)&&!this.isChecked){
if(this.isAttached==true){
this._check();
if(!_650==true){
this.fireCommand();
}
}
this.setProperty("ischecked",true);
}
};
ButtonBinding.prototype._check=function(_651){
this.isActive=true;
this.isChecked=true;
if(!_651){
this._stateManager.invokeActiveState();
}
};
ButtonBinding.prototype.uncheck=function(_652){
if((this.isCheckButton||this.isRadioButton)&&this.isChecked){
if(this.isAttached==true){
this._uncheck();
if(!_652==true){
this.fireCommand();
}
}
this.setProperty("ischecked",false);
}
};
ButtonBinding.prototype._uncheck=function(_653){
this.isActive=false;
this.isChecked=false;
if(!_653){
this._stateManager.invokeNormalState();
}
};
ButtonBinding.prototype.setChecked=function(_654,_655){
if(_654==null){
_654==false;
}
if(this.isCheckButton||this.isRadioButton){
switch(_654){
case true:
this.check(_655);
break;
case false:
this.uncheck(_655);
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
var _657=this.getProperty("tooltip");
if(_657){
this.setToolTip(_657);
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
var _658=null;
if(this.isAttached==true){
this.labelBinding.bindingElement.style.marginLeft="0";
this.labelBinding.bindingElement.style.marginRight="0";
_658=this.labelBinding.bindingElement.offsetWidth;
}else{
throw "ButtonBinding: getEqualSizeWidth failed for non-attached button.";
}
return _658;
};
ButtonBinding.prototype.setEqualSizeWidth=function(goal){
if(this.isAttached==true){
var _65a=this.getEqualSizeWidth();
if(goal>_65a){
var diff=goal-_65a;
var marg=Math.floor(diff*0.5);
this.labelBinding.bindingElement.style.marginLeft=marg+"px";
this.labelBinding.bindingElement.style.marginRight=marg+"px";
}
}
};
ButtonBinding.prototype.getWidth=function(){
var _65d=null;
if(this.isAttached==true){
var _65e=CSSComputer.getPadding(this.bindingElement);
var _65f=CSSComputer.getPadding(this.bindingElement);
_65d=this.shadowTree.c.offsetWidth+this.shadowTree.e.offsetWidth+this.shadowTree.w.offsetWidth;
_65d=_65d+_65e.left+_65e.right;
_65d=_65d+_65f.left+_65f.right;
}else{
throw "ButtonBinding: getWidth failed for non-attached button.";
}
return _65d;
};
ButtonBinding.prototype.setWidth=function(_660){
if(this.isAttached==true){
var _661=this.shadowTree.e.offsetWidth+this.shadowTree.w.offsetWidth;
var _662=CSSComputer.getPadding(this.shadowTree.c);
var _663=_660-_661;
_663=_663-_662.left-_662.right;
this.shadowTree.c.style.width=String(_663)+"px";
if(this.getProperty("centered")){
this.labelBinding.bindingElement.style.marginLeft=String(0.5*(_663-this.labelBinding.bindingElement.offsetWidth))+"px";
}
}
this.setProperty("width",_660);
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
ButtonBinding.prototype.setValue=function(_664){
this.shadowTree.dotnetinput.value=_664;
};
ButtonBinding.prototype.getResult=function(){
return this.getValue();
};
ButtonBinding.prototype.setResult=function(_665){
this.setValue(_665);
};
ButtonStateManager.STATE_NORMAL=0;
ButtonStateManager.STATE_HOVER=1;
ButtonStateManager.STATE_ACTIVE=2;
ButtonStateManager.RIGHT_BUTTON=2;
function ButtonStateManager(_666){
this.logger=SystemLogger.getLogger("ButtonStateManager");
this.binding=_666;
this.imageProfile=_666.imageProfile;
this.assignDOMEvents(true);
}
ButtonStateManager.prototype.assignDOMEvents=function(_667){
var _668=_667?"addEventListener":"removeEventListener";
this.binding[_668](DOMEvents.MOUSEENTER,this);
this.binding[_668](DOMEvents.MOUSELEAVE,this);
this.binding[_668](DOMEvents.MOUSEDOWN,this);
this.binding[_668](DOMEvents.MOUSEUP,this);
};
ButtonStateManager.prototype.dispose=function(){
this.assignDOMEvents(false);
this.binding=null;
this.imageProfile=null;
};
ButtonStateManager.prototype.handleEvent=function(e){
if(Binding.exists(this.binding)&&!this.binding.isDisabled&&!BindingDragger.isDragging){
var _66a=false,_66b=null;
if(e.button==ButtonStateManager.RIGHT_BUTTON){
}else{
if(this.binding.isCheckBox){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_66b=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_66b=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_66b=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSEUP:
this.binding.isChecked=!this.binding.isChecked;
_66b=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_66b==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_66a=true;
break;
}
}else{
if(this.binding.isCheckButton||this.binding.isRadioButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
if(!this.binding.isChecked){
_66b=ButtonStateManager.STATE_HOVER;
}
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
if(!this.binding.isChecked){
_66b=ButtonStateManager.STATE_NORMAL;
}
break;
case DOMEvents.MOUSEDOWN:
_66b=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
if(this.binding.isCheckButton||!this.binding.isChecked){
this.binding.isChecked=!this.binding.isChecked;
_66b=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_66b==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_66a=true;
}
break;
}
}else{
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_66b=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_66b=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_66b=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_66b=ButtonStateManager.STATE_NORMAL;
_66a=true;
break;
}
}
}
}
switch(_66b){
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
if(_66a){
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
var _66f=this.imageProfile.getDisabledImage();
if(_66f){
this.binding.setImage(_66f);
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
ClickButtonBinding.newInstance=function(_670){
var _671=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_670);
return UserInterface.registerBinding(_671,ClickButtonBinding);
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
RadioButtonBinding.newInstance=function(_672){
var _673=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiobutton",_672);
return UserInterface.registerBinding(_673,RadioButtonBinding);
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
CheckButtonBinding.newInstance=function(_674){
var _675=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbutton",_674);
return UserInterface.registerBinding(_675,CheckButtonBinding);
};
CheckButtonImageProfile.IMG_DEFAULT="${skin}/buttons/checkbutton-default.png";
CheckButtonImageProfile.IMG_HOVER="${skin}/buttons/checkbutton-hover.png";
CheckButtonImageProfile.IMG_ACTIVE="${skin}/buttons/checkbutton-active.png";
CheckButtonImageProfile.IMG_ACTIVE_HOVER="${skin}/buttons/checkbutton-active-hover.png";
CheckButtonImageProfile.IMG_DISABLED=null;
CheckButtonImageProfile.IMG_DISABLED_ON=null;
function CheckButtonImageProfile(_676){
this._binding=_676;
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
var _677=this.getDescendantBindingsByLocalName("control");
_677.each(function(_678){
_678.setControlType(_678.controlType);
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
ControlGroupBinding.newInstance=function(_67a){
var _67b=DOMUtil.createElementNS(Constants.NS_UI,"ui:controlgroup",_67a);
return UserInterface.registerBinding(_67b,ControlGroupBinding);
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
ControlBinding.prototype.handleAction=function(_67e){
ControlBinding.superclass.handleAction.call(this,_67e);
switch(_67e.type){
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
function ControlImageProfile(_67f){
this.binding=_67f;
}
ControlImageProfile.prototype._getImage=function(_680){
var _681=null;
switch(this.binding.controlType){
case ControlBinding.TYPE_MINIMIZE:
_681=this.constructor.IMAGE_MINIMIZE;
break;
case ControlBinding.TYPE_MAXIMIZE:
_681=this.constructor.IMAGE_MAXIMIZE;
break;
case ControlBinding.TYPE_UNMAXIMIZE:
case ControlBinding.TYPE_UNMINIMIZE:
_681=this.constructor.IMAGE_RESTORE;
break;
case ControlBinding.TYPE_CLOSE:
_681=this.constructor.IMAGE_CLOSE;
break;
}
return _681.replace("${string}",_680);
};
ControlImageProfile.prototype.getDefaultImage=function(){
var _682=true;
if(this.binding.isGhostable&&this.binding.containingControlBoxBinding){
_682=this.binding.containingControlBoxBinding.isActive?true:false;
}
return _682?this._getImage("default"):this._getImage("ghosted");
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
ControlBoxBinding.prototype.handleAction=function(_683){
ControlBoxBinding.superclass.handleAction.call(this,_683);
switch(_683.type){
case ControlBinding.ACTION_COMMAND:
var _684=_683.target;
Application.lock(this);
var self=this;
setTimeout(function(){
self.handleInvokedControl(_684);
Application.unlock(self);
},0);
_683.consume();
break;
}
};
ControlBoxBinding.prototype.handleInvokedControl=function(_686){
switch(_686.controlType){
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
ControlBoxBinding.prototype.setState=function(_687){
var _688=this.getState();
this.setProperty("state",_687);
this.detachClassName(_688);
this.attachClassName(_687);
this.dispatchAction(ControlBoxBinding.ACTION_STATECHANGE);
};
ControlBoxBinding.prototype.getState=function(){
var _689=this.getProperty("state");
if(!_689){
_689=ControlBoxBinding.STATE_NORMAL;
}
return _689;
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
MenuContainerBinding.prototype.isOpen=function(_68a){
var _68b=null;
if(!_68a){
_68b=this._isOpen;
}else{
_68b=(_68a==this._openElement);
}
return _68b;
};
MenuContainerBinding.prototype.setOpenElement=function(_68c){
if(_68c){
if(this._openElement){
this._openElement.hide();
}
this._openElement=_68c;
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
var _68d=this.getChildBindingByLocalName("menupopup");
if(_68d&&_68d!=this.menuPopupBinding){
this.menuPopupBinding=_68d;
this.menuPopupBinding.addActionListener(PopupBinding.ACTION_HIDE,this);
}
return this.menuPopupBinding;
};
MenuContainerBinding.prototype.show=function(){
var _68e=this.getMenuContainerBinding();
_68e.setOpenElement(this);
var _68f=this.getMenuPopupBinding();
_68f.snapTo(this.bindingElement);
_68f.show();
};
MenuContainerBinding.prototype.hide=function(){
this.reset();
this.getMenuPopupBinding().hide();
if(this._isOpen){
this._openElement.hide();
}
};
MenuContainerBinding.prototype.reset=Binding.ABSTRACT_METHOD;
MenuContainerBinding.prototype.handleAction=function(_690){
MenuContainerBinding.superclass.handleAction.call(this,_690);
if(_690.type==PopupBinding.ACTION_HIDE){
var _691=this.getMenuContainerBinding();
_691.setOpenElement(false);
this.reset();
_690.consume();
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
MenuBarBinding.prototype.handleAction=function(_692){
MenuBarBinding.superclass.handleAction.call(this,_692);
switch(_692.type){
case MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY:
var _693=_692.target;
var _694=this.getChildBindingsByLocalName("menu");
while(_694.hasNext()){
var menu=_694.getNext();
}
switch(_693.arrowKey){
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
var _696=this.getProperty("image");
var _697=this.getProperty("label");
var _698=this.getProperty("tooltip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menulabel");
this.add(this.labelBinding);
if(_697){
this.setLabel(_697);
}
if(_696){
this.setImage(_696);
}
if(_698){
this.setToolTip(_698);
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
MenuBinding.prototype.setLabel=function(_69a){
this.setProperty("label",_69a);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_69a));
}
};
MenuBinding.prototype.setToolTip=function(_69b){
this.setProperty("tooltip",_69b);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_69b));
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
var _69d=this.getMenuContainerBinding();
if(!BindingDragger.isDragging){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(_69d.isOpen(this)){
DOMEvents.stopPropagation(e);
}
break;
case DOMEvents.MOUSEOVER:
if(_69d.isOpen()&&!_69d.isOpen(this)){
this.show();
this.menuPopupBinding.grabKeyboard();
}
this.attachClassName("hover");
this.isFocused=true;
break;
case DOMEvents.MOUSEOUT:
if(!_69d.isOpen()){
this.hide();
}
this.isFocused=false;
break;
case DOMEvents.MOUSEUP:
if(!_69d.isOpen(this)){
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
MenuBodyBinding.handleBroadcast=function(_69e,arg){
var body=MenuBodyBinding.activeInstance;
var key=arg;
if(body){
switch(_69e){
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
this.addActionListener(MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY,{handleAction:function(_6a3){
switch(_6a3.target){
case self:
self.releaseKeyboard();
self._containingPopupBinding.hide();
break;
default:
var _6a4=null;
var _6a5=true;
self._lastFocused.focus();
self.grabKeyboard();
_6a3.consume();
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
MenuBodyBinding.prototype.handleFocusedItem=function(_6a7){
for(var key in this._focused){
if(key!=_6a7.key){
var item=this._focused[key];
item.blur();
}
}
this._focused[_6a7.key]=_6a7;
this._lastFocused=_6a7;
if(MenuBodyBinding.activeInstance!=this){
this.grabKeyboard();
}
};
MenuBodyBinding.prototype.handleBlurredItem=function(_6aa){
delete this._focused[_6aa.key];
};
MenuBodyBinding.prototype.resetFocusedItems=function(_6ab){
for(var key in this._focused){
var item=this._focused[key];
item.blur(_6ab);
}
if(_6ab){
this._lastFocused=null;
}
};
MenuBodyBinding.prototype.refreshMenuGroups=function(){
if(!this.isAttached){
throw "refreshMenuGroups: MenuBodyBinding not attached!";
}else{
var _6ae=this.getChildBindingsByLocalName("menugroup");
var _6af=null;
var _6b0=null;
while(_6ae.hasNext()){
var _6b1=_6ae.getNext();
if(!_6b1.isDefaultContent){
_6b1.setLayout(MenuGroupBinding.LAYOUT_DEFAULT);
if(!_6af&&_6b1.isVisible){
_6af=_6b1;
}
if(_6b1.isVisible){
_6b0=_6b1;
}
}
}
if(_6af&&_6b0){
_6af.setLayout(MenuGroupBinding.LAYOUT_FIRST);
_6b0.setLayout(MenuGroupBinding.LAYOUT_LAST);
}
}
};
MenuBodyBinding.prototype.grabKeyboard=function(_6b2){
MenuBodyBinding.activeInstance=this;
if(_6b2){
var _6b3=this._getMenuItems().getFirst();
if(_6b3){
_6b3.focus();
}
}
};
MenuBodyBinding.prototype.releaseKeyboard=function(){
if(MenuBodyBinding.activeInstance==this){
MenuBodyBinding.activeInstance=null;
}
};
MenuBodyBinding.prototype.handleEnterKey=function(){
var _6b4=this._lastFocused;
if((_6b4!=null)&&(!_6b4.isMenuContainer)){
_6b4.fireCommand();
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEDOWN);
}
};
MenuBodyBinding.prototype.handleArrowKey=function(key){
this.arrowKey=key;
var _6b6=this._getMenuItems();
var _6b7=null;
var next=null;
if(this._lastFocused){
_6b7=this._lastFocused;
switch(key){
case KeyEventCodes.VK_UP:
next=_6b6.getPreceding(_6b7);
break;
case KeyEventCodes.VK_DOWN:
next=_6b6.getFollowing(_6b7);
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
next=_6b6.getFirst();
}
if(next){
next.focus();
}
};
MenuBodyBinding.prototype._getMenuItems=function(){
if(!this._menuItemsList||this.isDirty){
var list=new List();
var _6ba=null;
this.getChildBindingsByLocalName("menugroup").each(function(_6bb){
_6ba=_6bb.getChildBindingsByLocalName("menuitem");
_6ba.each(function(item){
list.add(item);
});
});
_6ba=this.getChildBindingsByLocalName("menuitem");
_6ba.each(function(item){
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
MenuBodyBinding.newInstance=function(_6bf){
var _6c0=DOMUtil.createElementNS(Constants.NS_UI,"ui:menubody",_6bf);
return UserInterface.registerBinding(_6c0,MenuBodyBinding);
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
MenuGroupBinding.prototype.setLayout=function(_6c1){
switch(_6c1){
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
MenuGroupBinding.newInstance=function(_6c2){
var _6c3=DOMUtil.createElementNS(Constants.NS_UI,"ui:menugroup",_6c2);
return UserInterface.registerBinding(_6c3,MenuGroupBinding);
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
var _6c4=this.getProperty("image");
var _6c5=this.getProperty("image-hover");
var _6c6=this.getProperty("image-active");
var _6c7=this.getProperty("image-disabled");
if(!this.image&&_6c4){
this.image=_6c4;
}
if(!this.imageHover&&_6c5){
this.imageHover=_6c4;
}
if(!this.imageActive&&_6c6){
this.imageActive=_6c6;
}
if(!this.imageDisabled&&_6c7){
this.imageDisabled=_6c7;
}
};
MenuItemBinding.prototype.buildDOMContent=function(){
var _6c8=this.getProperty("label");
var _6c9=this.getProperty("tooltip");
var type=this.getProperty("type");
var _6cb=this.getProperty("isdisabled");
var _6cc=this.getProperty("image");
var _6cd=this.getProperty("image-hover");
var _6ce=this.getProperty("image-active");
var _6cf=this.getProperty("image-disabled");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menuitemlabel");
this.add(this.labelBinding);
var _6d0=this.getMenuPopupBinding();
if(_6d0){
this.isMenuContainer=true;
this.setType(MenuItemBinding.TYPE_MENUCONTAINER);
}
if(!this.imageProfile){
if(!this.image&&_6cc){
this.image=_6cc;
}
if(!this.imageHover&&_6cd){
this.imageHover=_6cc;
}
if(!this.imageActive&&_6ce){
this.imageActive=_6ce;
}
if(!this.imageDisabled&&_6cf){
this.imageDisabled=_6cf;
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
if(_6c8){
this.setLabel(_6c8);
}
if(_6c9){
this.setToolTip(_6c9);
}
if(type){
this.setType(type);
}
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.getProperty("ischecked")==true){
this.check(true);
}
}
if(_6cb==true){
this.disable();
}
var _6d1=this.getProperty("oncommand");
if(_6d1){
if(this.isMenuContainer){
throw new Error("MenuItemBinding with contained menuitems cannot fire commands.");
}else{
this.oncommand=function(){
this.bindingWindow.eval(_6d1);
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
MenuItemBinding.prototype.setLabel=function(_6d4){
this.setProperty("label",_6d4);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6d4));
}
};
MenuItemBinding.prototype.setToolTip=function(_6d5){
this.setProperty("tooltip",_6d5);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6d5));
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
var _6d7=this.bindingDocument.createElement("div");
_6d7.className=MenuItemBinding.CLASSNAME_CHECKBOX;
_6d7.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_CHECKBOX));
var _6d8=this.labelBinding.bindingElement;
_6d8.insertBefore(_6d7,_6d8.firstChild);
_6d7.style.display="none";
this.shadowTree.checkBoxIndicator=_6d7;
}else{
throw new Error("MenuItemBinding: checkboxes cannot contain menus");
}
break;
case MenuItemBinding.TYPE_MENUCONTAINER:
var _6d7=this.bindingDocument.createElement("div");
_6d7.className=MenuItemBinding.CLASSNAME_SUBMENU;
_6d7.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_SUBMENU));
var _6d8=this.labelBinding.bindingElement;
_6d8.insertBefore(_6d7,_6d8.firstChild);
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
var _6da=this.imageProfile.getDisabledImage();
if(_6da){
this.setImage(_6da);
}
}
}else{
this.detachClassName("isdisabled");
if(this.imageProfile){
var _6da=this.imageProfile.getDefaultImage();
if(_6da){
this.setImage(_6da);
}
}
}
}
};
MenuItemBinding.prototype.focus=function(e){
this.labelBinding.attachClassName(MenuItemBinding.CLASSNAME_HOVER);
var _6dc=this.getMenuContainerBinding();
if(_6dc.isOpen()&&!_6dc.isOpen(this)){
_6dc._openElement.hide();
_6dc.setOpenElement(false);
}
if(this.isMenuContainer&&e&&e.type==DOMEvents.MOUSEOVER){
var _6dc=this.getMenuContainerBinding();
if(!_6dc.isOpen(this)){
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
MenuItemBinding.prototype.blur=function(_6de){
if(this._showSubMenuTimeout){
window.clearTimeout(this._showSubMenuTimeout);
this._showSubMenuTimeout=null;
}
if(this.isFocused){
var _6df=this.getMenuContainerBinding();
if(!_6df||!_6df.isOpen(this)||_6de){
this.labelBinding.detachClassName(MenuItemBinding.CLASSNAME_HOVER);
this.isFocused=false;
this._containingMenuBodyBinding.handleBlurredItem(this);
}
}
};
MenuItemBinding.prototype.check=function(_6e0){
this.setChecked(true,_6e0);
};
MenuItemBinding.prototype.uncheck=function(_6e1){
this.setChecked(false,_6e1);
};
MenuItemBinding.prototype.show=function(){
this.menuPopupBinding.position=PopupBinding.POSITION_RIGHT;
MenuItemBinding.superclass.show.call(this);
};
MenuItemBinding.prototype.setChecked=function(_6e2,_6e3){
this.setProperty("ischecked",_6e2);
if(this.isAttached){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.isChecked!=_6e2){
this.isChecked=_6e2;
this.shadowTree.checkBoxIndicator.style.display=_6e2?"block":"none";
if(!_6e3){
this.fireCommand();
}
}
}
}
};
MenuItemBinding.newInstance=function(_6e4){
var _6e5=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_6e4);
UserInterface.registerBinding(_6e5,MenuItemBinding);
return UserInterface.getBinding(_6e5);
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
PopupBinding.handleBroadcast=function(_6e6,arg){
switch(_6e6){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
case BroadcastMessages.MOUSEEVENT_MOUSEUP:
if(PopupBinding.activeInstances.hasEntries()){
var list=new List();
PopupBinding.activeInstances.each(function(key){
var _6ea=PopupBinding.activeInstances.get(key);
var _6eb=(arg&&arg instanceof ButtonBinding&&arg.popupBinding==_6ea);
if(!_6eb){
list.add(_6ea);
}
});
list.each(function(_6ec){
_6ec.hide();
});
}
break;
case BroadcastMessages.KEY_ESCAPE:
if(PopupBinding.activeInstances.hasEntries()){
PopupBinding.activeInstances.each(function(key){
var _6ee=PopupBinding.activeInstances.get(key);
_6ee.hide();
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
var _6ef=DOMUtil.getElementsByTagName(this.bindingElement,"menubody").item(0);
var _6f0=DOMUtil.getElementsByTagName(this.bindingElement,"popupbody").item(0);
if(_6ef){
this._bodyBinding=UserInterface.getBinding(_6ef);
}else{
if(_6f0){
this._bodyBinding=UserInterface.getBinding(_6f0);
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
var _6f1=this.getProperty("position");
this.position=_6f1?_6f1:PopupBinding.POSITION_BOTTOM;
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
PopupBinding.prototype.add=function(_6f2){
var _6f3=null;
if(this._bodyBinding){
this._bodyBinding.add(_6f2);
_6f3=_6f2;
}else{
_6f3=PopupBinding.superclass.add.call(this,_6f2);
}
return _6f3;
};
PopupBinding.prototype.addFirst=function(_6f4){
var _6f5=null;
if(this._bodyBinding){
this._bodyBinding.addFirst(_6f4);
_6f5=_6f4;
}else{
_6f5=PopupBinding.superclass.addFirst.call(this,_6f4);
}
return _6f5;
};
PopupBinding.prototype.handleAction=function(_6f6){
PopupBinding.superclass.handleAction.call(this,_6f6);
var _6f7=_6f6.target;
switch(_6f6.type){
case Binding.ACTION_ATTACHED:
if(_6f7 instanceof MenuItemBinding){
this._count(true);
_6f6.consume();
}
break;
case Binding.ACTION_DETACHED:
if(_6f7 instanceof MenuItemBinding){
this._count(false);
_6f6.consume();
}
break;
}
};
PopupBinding.prototype._count=function(_6f8){
if(this.type==PopupBinding.TYPE_FIXED){
this._menuItemCount=this._menuItemCount+(_6f8?1:-1);
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
PopupBinding.prototype.snapTo=function(_6f9){
var _6fa=this._getElementPosition(_6f9);
switch(this.position){
case PopupBinding.POSITION_TOP:
_6fa.y-=this.bindingElement.offsetHeight;
break;
case PopupBinding.POSITION_RIGHT:
_6fa.x+=_6f9.offsetWidth;
break;
case PopupBinding.POSITION_BOTTOM:
_6fa.y+=_6f9.offsetHeight;
break;
case PopupBinding.POSITION_LEFT:
_6fa.x-=this.bindingElement.offsetWidth;
break;
}
this.targetElement=_6f9;
this.bindingElement.style.display="block";
this.setPosition(_6fa.x,_6fa.y);
};
PopupBinding.prototype.snapToMouse=function(e){
this.snapToPoint(this._getMousePosition(e));
};
PopupBinding.prototype.snapToPoint=function(_6fc){
this.bindingElement.style.display="block";
this.setPosition(_6fc.x,_6fc.y);
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
PopupBinding.prototype._getElementPosition=function(_701){
return _701.ownerDocument==this.bindingDocument?DOMUtil.getGlobalPosition(_701):DOMUtil.getUniversalPosition(_701);
};
PopupBinding.prototype._getMousePosition=function(e){
var _703=DOMEvents.getTarget(e);
return _703.ownerDocument==this.bindingDocument?DOMUtil.getGlobalMousePosition(e):DOMUtil.getUniversalMousePosition(e);
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
PopupBinding.prototype._makeVisible=function(_704){
var _705=this.bindingElement;
if(_704){
if(Client.hasTransitions){
_705.style.visibility="visible";
_705.style.opacity="1";
}else{
_705.style.visibility="visible";
}
}else{
_705.style.visibility="hidden";
_705.style.display="none";
if(Client.hasTransitions){
_705.style.opacity="0";
}
}
this.isVisible=_704;
};
PopupBinding.prototype._enableTab=function(_706){
var self=this;
var _708=this.getDescendantBindingsByLocalName("menuitem");
setTimeout(function(){
if(Binding.exists(self)==true){
_708.each(function(_709){
_709.bindingElement.tabIndex=_706?0:-1;
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
PopupBinding.prototype.grabKeyboard=function(_712){
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
var _718=null;
if(this._menuItems){
if(this._menuItems[cmd]){
_718=this._menuItems[cmd];
}else{
throw "PopupBinding.getMenuItemForCommand: No binding for command "+cmd;
}
}else{
throw "Must invoke _indexMenuContent method first!";
}
return _718;
};
PopupBinding.prototype.clear=function(){
var _719=this._bodyBinding;
if(_719){
_719.detachRecursive();
_719.bindingElement.innerHTML="";
}
this._menuItemCount=0;
};
PopupBinding.newInstance=function(_71a){
var _71b=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_71a);
return UserInterface.registerBinding(_71b,PopupBinding);
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
PopupBodyBinding.newInstance=function(_71d){
var _71e=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupbody",_71d);
return UserInterface.registerBinding(_71e,PopupBodyBinding);
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
MenuPopupBinding.prototype._getElementPosition=function(_71f){
return new Point(_71f.offsetLeft,0);
};
MenuPopupBinding.newInstance=function(_720){
var _721=DOMUtil.createElementNS(Constants.NS_UI,"ui:menupopup",_720);
return UserInterface.registerBinding(_721,MenuPopupBinding);
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
var _722=DOMUtil.getElementsByTagName(this.bindingElement,"dialogbody").item(0);
if(_722){
this._body=UserInterface.getBinding(_722);
}else{
this._body=DialogBodyBinding.newInstance(this.bindingDocument);
this.add(this._body);
}
};
DialogBinding.prototype.buildBorderBindings=function(){
var _723=new List([DialogBorderBinding.TYPE_NORTH,DialogBorderBinding.TYPE_SOUTH,DialogBorderBinding.TYPE_EAST,DialogBorderBinding.TYPE_WEST]);
while(_723.hasNext()){
var _724=DialogBorderBinding.newInstance(this.bindingDocument);
_724.setType(_723.getNext());
this.add(_724);
}
};
DialogBinding.prototype.buildShadowBinding=function(){
this.shadowBinding=ShadowBinding.newInstance(this.bindingDocument);
this.shadowBinding.attachClassName("dialogshadow");
this.shadowBinding.shadow(this);
this.shadowBinding.attach();
};
DialogBinding.prototype.buildControlBindings=function(){
var _725=this.getProperty("controls");
if(_725){
var _726=new List(_725.split(" "));
while(_726.hasNext()){
var type=_726.getNext();
switch(type){
case ControlBinding.TYPE_MAXIMIZE:
case ControlBinding.TYPE_MINIMIZE:
case ControlBinding.TYPE_CLOSE:
var _728=DialogControlBinding.newInstance(this.bindingDocument);
_728.setControlType(type);
this._titlebar.addControl(_728);
this.controlBindings[type]=_728;
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
var _729=this.getProperty("image");
var _72a=this.getProperty("label");
var _72b=this.getProperty("draggable");
var _72c=this.getProperty("resizable");
var _72d=this.getProperty("modal");
if(_729){
this.setImage(_729);
}
if(_72a){
this.setLabel(_72a);
}
if(_72b==false){
this.isDialogDraggable=false;
}
if(_72c==false){
this.isPanelResizable=false;
}
if(_72d==true){
this.setModal(true);
}
};
DialogBinding.prototype.setModal=function(_72e){
this.isModal=_72e;
};
DialogBinding.prototype.setLabel=function(_72f){
this.setProperty("label",_72f);
if(this.isAttached==true){
this._titlebar.setLabel(Resolver.resolve(_72f));
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
DialogBinding.prototype.handleAction=function(_731){
DialogBinding.superclass.handleAction.call(this,_731);
switch(_731.type){
case Binding.ACTION_DRAG:
var _732=_731.target;
if(this.getState()==ControlBoxBinding.STATE_NORMAL){
switch(_732.constructor){
case DialogTitleBarBinding:
this.mode=DialogBinding.MODE_DRAGGING;
_732.dragger.registerHandler(this);
break;
case DialogBorderBinding:
if(this._isResizable){
this.mode=DialogBinding.MODE_RESIZING;
this._border=_732;
_732.dragger.registerHandler(this);
}
break;
}
}
_731.consume();
break;
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_731.consume();
break;
}
};
DialogBinding.prototype.handleBroadcast=function(_733,arg){
DialogBinding.superclass.handleBroadcast.call(this,_733,arg);
switch(_733){
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.startPoint=this.getPosition();
this._setComputedPosition(new Point(0,0));
break;
}
};
DialogBinding.prototype.handleInvokedControl=function(_735){
DialogBinding.superclass.handleInvokedControl.call(this,_735);
switch(_735.controlType){
case ControlBinding.TYPE_CLOSE:
this.close();
break;
}
};
DialogBinding.prototype.open=function(_736){
if(this.isModal&&this._cover==null){
this.buildDialogCoverBinding();
}
if(!this.isVisible){
this.setProperty("open","true");
this.isVisible=true;
this.isActivatable=true;
this.activate();
if(_736){
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
var _738=self.bindingElement;
setTimeout(function(){
_738.style.opacity="0";
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
DialogBinding.prototype.setZIndex=function(_739){
this.bindingElement.style.zIndex=new String(_739);
};
DialogBinding.prototype.onDragStart=function(_73a){
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
DialogBinding.prototype.setResizable=function(_74c){
if(this._isResizable!=_74c){
if(_74c){
this.attachClassName("resizable");
}else{
this.detachClassName("resizable");
}
this._isResizable=_74c;
}
};
DialogBinding.prototype.computeDefaultGeometry=function(){
var _74d=null;
var _74e=this.bindingDocument.body.offsetWidth;
var _74f=this.bindingDocument.body.offsetHeight;
_74d={x:0.125*_74e,y:0.125*_74f,w:0.75*_74e,h:0.5*_74f};
return _74d;
};
DialogBinding.prototype.centerOnScreen=function(){
var _750=this.bindingWindow.WindowManager.getWindowDimensions();
var dim=this.getDimension();
this.setPosition(new Point(0.5*(_750.w-dim.w),0.5*(_750.h-dim.h)));
};
DialogBinding.prototype.alert=function(){
var _752=this;
var i=0;
function blink(){
if(i%2==0){
_752.detachClassName("active");
}else{
_752.attachClassName("active");
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
var _756="";
while(list.hasNext()){
var type=list.getNext();
_756+=type+list.hasNext()?" ":"";
}
this.setProperty("controls",_756);
if(this.isAttached){
this.buildControlBindings();
}
};
DialogBinding.newInstance=function(_757){
var _758=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_757);
return UserInterface.registerBinding(_758,DialogBinding);
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
DialogHeadBinding.newInstance=function(_759){
var _75a=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialoghead",_759);
return UserInterface.registerBinding(_75a,DialogHeadBinding);
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
DialogBodyBinding.newInstance=function(_75d){
var _75e=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogbody",_75d);
return UserInterface.registerBinding(_75e,DialogBodyBinding);
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
DialogMatrixBinding.newInstance=function(_75f){
var _760=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogmatrix",_75f);
return UserInterface.registerBinding(_760,DialogMatrixBinding);
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
DialogSetBinding.prototype.handleAction=function(_761){
DialogSetBinding.superclass.handleAction.call(this,_761);
var _762=_761.target;
switch(_761.type){
case Binding.ACTION_MOVETOTOP:
if(_762 instanceof DialogBinding){
this._moveToTop(_762);
}
break;
case Binding.ACTION_MOVEDONTOP:
_761.consume();
break;
}
};
DialogSetBinding.prototype._moveToTop=function(_763){
var _764=0;
var _765=this.getChildBindingsByLocalName("dialog");
_765.each(function(_766){
var _767=_766.getZIndex();
_764=_767>_764?_767:_764;
});
_763.setZIndex(_764+2);
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
DialogBorderBinding.newInstance=function(_769){
var _76a=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogborder",_769);
return UserInterface.registerBinding(_76a,DialogBorderBinding);
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
DialogCoverBinding.prototype.cover=function(_76b){
this._dialogBinding=_76b;
this._dialogBinding.addActionListener(DialogBinding.ACTION_OPEN,this);
this._dialogBinding.addActionListener(DialogBinding.ACTION_CLOSE,this);
this._dialogBinding.addActionListener(Binding.ACTION_MOVEDONTOP,this);
this.addEventListener(DOMEvents.MOUSEDOWN);
};
DialogCoverBinding.prototype.handleEvent=function(e){
DialogCoverBinding.superclass.handleEvent.call(this,e);
this._dialogBinding.alert();
};
DialogCoverBinding.prototype.handleAction=function(_76d){
DialogCoverBinding.superclass.handleAction.call(this,_76d);
var _76e=_76d.target;
if(this._dialogBinding.isModal){
switch(_76d.type){
case DialogBinding.ACTION_OPEN:
this.show();
break;
case DialogBinding.ACTION_CLOSE:
this.hide();
break;
case Binding.ACTION_MOVEDONTOP:
if(_76e==this._dialogBinding){
this.bindingElement.style.zIndex=new String(_76e.getZIndex()-1);
}
break;
}
}
};
DialogCoverBinding.prototype.handleBroadcast=function(_76f,arg){
DialogCoverBinding.superclass.handleBroadcast.call(this,_76f,arg);
switch(_76f){
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
var _772=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.subscribe(_772);
DialogCoverBinding.superclass.show.call(this);
};
DialogCoverBinding.prototype.hide=function(){
var _773=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.unsubscribe(_773);
DialogCoverBinding.superclass.hide.call(this);
};
DialogCoverBinding.newInstance=function(_774){
var _775=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogcover",_774);
return UserInterface.registerBinding(_775,DialogCoverBinding);
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
var _776=this.getProperty("image");
if(_776){
this.setImage(_776);
}
var _777=this.getProperty("label");
if(_777){
this.setLabel(_777);
}
};
DialogTitleBarBinding.prototype.setLabel=function(_778){
if(this.isAttached){
this.labelBinding.setLabel(_778);
}
this.setProperty("label",_778);
};
DialogTitleBarBinding.prototype.setImage=function(url){
if(this.isAttached&&Client.isWindows){
this.labelBinding.setImage(url);
}
this.setProperty("image",url);
};
DialogTitleBarBinding.prototype.addControl=function(_77a){
if(!this._controlGroupBinding){
this._controlGroupBinding=this.bodyBinding.addFirst(ControlGroupBinding.newInstance(this.bindingDocument));
}
this._controlGroupBinding.add(_77a);
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
DialogTitleBarBinding.newInstance=function(_77b){
var _77c=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebar",_77b);
return UserInterface.registerBinding(_77c,DialogTitleBarBinding);
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
DialogTitleBarBodyBinding.newInstance=function(_77d){
var _77e=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebarbody",_77d);
return UserInterface.registerBinding(_77e,DialogTitleBarBodyBinding);
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
DialogControlBinding.newInstance=function(_77f){
var _780=DOMUtil.createElementNS(Constants.NS_UI,"ui:control",_77f);
return UserInterface.registerBinding(_780,DialogControlBinding);
};
DialogControlImageProfile.prototype=new ControlImageProfile;
DialogControlImageProfile.prototype.constructor=DialogControlImageProfile;
DialogControlImageProfile.superclass=ControlImageProfile.prototype;
var os=Client.isVista?"vista/":(!Client.isWindows?"osx/":"");
DialogControlImageProfile.IMAGE_MINIMIZE="${root}/skins/system/controls/"+os+"control-minimize-${string}.png";
DialogControlImageProfile.IMAGE_MAXIMIZE="${root}/skins/system/controls/"+os+"control-maximize-${string}.png";
DialogControlImageProfile.IMAGE_RESTORE="${root}/skins/system/controls/"+os+"control-restore-${string}.png";
DialogControlImageProfile.IMAGE_CLOSE="${root}/skins/system/controls/"+os+"control-close-${string}.png";
function DialogControlImageProfile(_781){
this.binding=_781;
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
var _784=null;
if(node.nodeType==Node.ELEMENT_NODE){
var _785=node.nodeName.toLowerCase();
switch(_785){
case "script":
case "style":
case "textarea":
_784=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
break;
}
}
return _784;
});
var self=this;
this.addFilter(function(node,arg){
if(node.nodeType==Node.TEXT_NODE){
var text=node.nodeValue.toLowerCase();
self._map.each(function(key,exp){
var _78c=true;
if(exp.test(text)){
self._textnodes.add(node);
_78c=false;
}
return _78c;
});
}
});
};
WindowBindingHighlightNodeCrawler.prototype.crawl=function(_78d,arg){
this._textnodes=new List();
WindowBindingHighlightNodeCrawler.superclass.crawl.call(this,_78d,arg);
};
WindowBindingHighlightNodeCrawler.prototype.setKeys=function(list){
list.reset();
this._map.empty();
while(list.hasNext()){
var key=list.getNext();
var _791=key.toLowerCase().replace(/ /g,"\\W");
var exp=new RegExp("("+_791+")");
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
WindowBindingHighlightNodeCrawler.prototype._getMarkup=function(_797){
var _798="";
var _799="<span class=\""+WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT+"\" style=\"background-color:yellow;color:black;\">";
var _79a="</span>";
var self=this;
function iterate(_79c){
var _79d=-1;
var _79e=null;
self._map.each(function(key,exp){
var low=_79c.toLowerCase();
var _7a2=low.search(exp);
if(_7a2>-1){
if(_79d==-1){
_79d=_7a2;
}
if(_7a2<=_79d){
_79d=_7a2;
_79e=key;
}
}
});
if(_79d>-1&&_79e!=null){
var pre=_79c.substring(0,_79d);
var hit=_79c.substring(_79d,_79d+_79e.length);
var pst=_79c.substring(_79d+_79e.length,_79c.length);
_798+=pre+_799+hit+_79a;
iterate(pst);
}else{
_798+=_79c;
}
}
iterate(_797);
return _798;
};
WindowBindingHighlightNodeCrawler.prototype.reset=function(_7a6){
var _7a7=new List(_7a6.getElementsByTagName("span"));
_7a7.each(function(span){
if(span.className==WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT){
var node=_7a6.ownerDocument.createTextNode(DOMUtil.getTextContent(span));
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
WindowBinding.getMarkup=function(_7aa){
var _7ab=null;
if(_7aa.isAttached){
var doc=_7aa.getContentDocument();
if(doc!=null){
var root=doc.getElementsByTagName("html").item(0);
var html="<html xmlns=\""+Constants.NS_XHTML+"\">"+root.innerHTML+"</html>";
WebServiceProxy.isFaultHandler=false;
_7ab=top.MarkupFormatService.HtmlToXhtml(html);
WebServiceProxy.isFaultHandler=true;
if(_7ab instanceof SOAPFault){
_7ab=null;
}
}
}
return _7ab;
};
WindowBinding.highlightKeywords=function(_7af,list){
if(WindowBinding._highlightcrawler==null){
WindowBinding._highlightcrawler=new WindowBindingHighlightNodeCrawler();
}
if(_7af.isAttached){
var doc=_7af.getContentDocument();
if(doc!=null){
var _7b2=WindowBinding._highlightcrawler;
_7b2.reset(doc.body);
if(list!=null){
_7b2.setKeys(list);
_7b2.crawl(doc.body);
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
var _7b3=WindowBinding.superclass.serialize.call(this);
if(_7b3){
_7b3.url=this.getURL();
}
return _7b3;
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
var _7b5=this.getContentWindow().DocumentManager;
if(_7b5!=null){
_7b5.detachAllBindings();
this._pageBinding=null;
}
}
}
};
WindowBinding.prototype.handleAction=function(_7b6){
WindowBinding.superclass.handleAction.call(this,_7b6);
var _7b7=_7b6.target;
switch(_7b6.type){
case RootBinding.ACTION_PHASE_3:
if(_7b7.bindingDocument==this.getContentDocument()){
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
this._onPageInitialize(_7b7);
break;
case RootBinding.ACTION_ACTIVATED:
case RootBinding.ACTION_DEACTIVATED:
_7b6.consume();
break;
}
};
WindowBinding.prototype.fit=function(_7b8){
if(!this.isFit||_7b8){
if(this._pageBinding!=null){
this.setHeight(this._pageBinding.getHeight());
this.isFit=true;
}
}
};
WindowBinding.prototype._onPageInitialize=function(_7b9){
if(this._pageBinding==null){
if(_7b9.bindingWindow==this.getContentWindow()){
this._pageBinding=_7b9;
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
WindowBinding.prototype._registerOnloadListener=function(_7ba){
var _7bb=this.shadowTree.iframe;
var _7bc=_7ba?"addEventListener":"removeEventListener";
if(this._onloadHandler==null){
var self=this;
this._onloadHandler={handleEvent:function(e){
var _7bf=true;
if(Client.isExplorer){
_7bf=_7bb.readyState=="complete";
}
if(_7bf==true){
if(self.getURL()!=WindowBinding.DEFAULT_URL){
if(!self._hasLoadActionFired){
self.onWindowLoaded(self.getContentWindow());
}
}
}
}};
}
DOMEvents[_7bc](this.shadowTree.iframe,Client.isExplorer==true?"readystatechange":DOMEvents.LOAD,this._onloadHandler);
};
WindowBinding.prototype._registerUnloadListener=function(_7c0){
var _7c1=_7c0?"addEventListener":"removeEventListener";
if(this._unloadHandler==null){
var self=this;
this._unloadHandler={handleEvent:function(){
self._disposeContentDocument();
self._hasLoadActionFired=false;
}};
}
DOMEvents[_7c1](this.getContentWindow(),DOMEvents.UNLOAD,this._unloadHandler);
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
var _7c5=WindowBinding.DEFAULT_URL;
var url=this.getProperty("url");
if(url){
_7c5=url;
}
return _7c5;
};
WindowBinding.prototype.reload=function(_7c7){
this._disposeContentDocument();
if(Client.isPrism){
Prism.disableCache();
}
this._isReloading=true;
this.getContentDocument().location.reload();
};
WindowBinding.prototype.getFrameElement=function(){
var _7c8=null;
if(this.shadowTree.iframe!=null){
_7c8=this.shadowTree.iframe;
}
return _7c8;
};
WindowBinding.prototype.getContentWindow=function(){
var _7c9=null,_7ca=this.getFrameElement();
if(_7ca!==null){
try{
_7c9=_7ca.contentWindow;
}
catch(e){
this.logger.error("WindowBinding#getContentWindow: strange IE9 error");
}
}
return _7c9;
};
WindowBinding.prototype.getContentDocument=function(){
var _7cb=null,win=this.getContentWindow();
if(win){
_7cb=win.document;
}
return _7cb;
};
WindowBinding.prototype.getRootBinding=function(){
var _7cd=null,doc=this.getContentDocument();
if(doc&&doc.body){
_7cd=UserInterface.getBinding(doc.body);
}
return _7cd;
};
WindowBinding.prototype.getPageBinding=function(){
return this._pageBinding;
};
WindowBinding.prototype.setHeight=function(_7cf){
this.bindingElement.style.height=_7cf+"px";
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
WindowBinding.prototype.handleCrawler=function(_7d0){
WindowBinding.superclass.handleCrawler.call(this,_7d0);
if(_7d0.type==NodeCrawler.TYPE_DESCENDING){
var root=this.getRootBinding();
if(root!=null){
_7d0.nextNode=root.bindingElement;
}else{
_7d0.response=NodeCrawler.SKIP_CHILDREN;
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
WindowBinding.newInstance=function(_7d5){
var _7d6=DOMUtil.createElementNS(Constants.NS_UI,"ui:window",_7d5);
var _7d7=UserInterface.registerBinding(_7d6,WindowBinding);
return _7d7;
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
this._windowBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_7db){
_7db.target.show();
_7db.consume();
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
this._errorBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_7dd){
_7dd.target.show();
_7dd.consume();
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
PreviewWindowBinding.prototype.handleAction=function(_7df){
PreviewWindowBinding.superclass.handleAction.call(this,_7df);
switch(_7df.type){
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
var _7e0=null;
this._getRadioButtonBindings().each(function(_7e1){
if(_7e1.getProperty("ischecked")){
_7e0=_7e1;
return false;
}else{
return true;
}
});
if(_7e0){
this._checkedRadioBinding=_7e0;
}
RadioGroupBinding.superclass.onBindingInitialize.call(this);
};
RadioGroupBinding.prototype.handleAction=function(_7e2){
RadioGroupBinding.superclass.handleAction.call(this,_7e2);
var _7e3=_7e2.target;
switch(_7e2.type){
case ButtonBinding.ACTION_RADIOBUTTON_ATTACHED:
this._isUpToDate=false;
_7e2.consume();
break;
case ButtonBinding.ACTION_COMMAND:
if(_7e3.isRadioButton&&!_7e3.isDisabled){
if(this._checkedRadioBinding){
this._unCheckRadioBindingsExcept(_7e3);
}
this._checkedRadioBinding=_7e3;
this.dispatchAction(RadioGroupBinding.ACTION_SELECTIONCHANGED);
_7e2.consume();
}
break;
}
};
RadioGroupBinding.prototype.setCheckedButtonBinding=function(_7e4,_7e5){
if(_7e4 instanceof RadioDataBinding){
_7e4=_7e4.getButton();
}
if(_7e4.isRadioButton){
switch(_7e5){
case true:
this._unCheckRadioBindingsExcept(_7e4);
this._checkedRadioBinding=_7e4;
_7e4.check(true);
break;
default:
_7e4.check();
break;
}
}
};
RadioGroupBinding.prototype.getCheckedButtonBinding=function(){
return this._checkedRadioBinding;
};
RadioGroupBinding.prototype._unCheckRadioBindingsExcept=function(_7e6){
var _7e7=this._getRadioButtonBindings();
_7e7.each(function(_7e8){
if(_7e8.isChecked&&_7e8!=_7e6){
_7e8.uncheck(true);
}
});
};
RadioGroupBinding.prototype._getRadioButtonBindings=function(){
if(this._radioButtonBindings===null||!this._isUpToDate){
var _7e9=new Crawler();
var list=new List();
_7e9.addFilter(function(_7eb){
var _7ec=true;
var _7ed=UserInterface.getBinding(_7eb);
if(_7ed instanceof RadioGroupBinding){
_7ec=NodeCrawler.SKIP_CHILDREN;
}else{
if(_7ed instanceof ButtonBinding&&_7ed.isRadioButton){
list.add(_7ed);
}
}
return _7ec;
});
_7e9.crawl(this.bindingElement);
this._radioButtonBindings=list;
}
return this._radioButtonBindings;
};
RadioGroupBinding.newInstance=function(_7ee){
var _7ef=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiogroup",_7ee);
return UserInterface.registerBinding(_7ef,RadioGroupBinding);
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
var _7f1=this.getProperty("regexrule");
if(_7f1!=null){
this.expression=new RegExp(_7f1);
}
var _7f2=this.getProperty("onbindingblur");
if(_7f2!=null){
this.onblur=function(){
Binding.evaluate(_7f2,this);
};
}
var _7f3=this.getProperty("onvaluechange");
if(_7f3!=null){
this.onValueChange=function(){
Binding.evaluate(_7f3,this);
};
}
if(this.error==null&&this.type!=null){
var _7f4=DataBinding.errors[this.type];
if(_7f4!=null){
this.error=_7f4;
}
}
};
DataInputBinding.prototype._buildDOMContent=function(){
this.shadowTree.input=this._getInputElement();
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
if(Client.isExplorer==true){
this.bindingElement.hideFocus=true;
}
var _7f5=this.getProperty("value");
if(_7f5!=null){
this.setValue(String(_7f5));
}
var name=this.getProperty("name");
if(name!=null){
this.setName(name);
}
var _7f7=this.getProperty("isdisabled");
if(_7f7==true){
this.setDisabled(true);
}
var _7f8=this.getProperty("readonly");
if(_7f8==true){
this.setReadOnly(true);
}
var _7f9=this.getProperty("autoselect");
if(_7f9==true){
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
var _7fa=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_7fa.type=this.isPassword==true?"password":"text";
_7fa.tabIndex=-1;
return _7fa;
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
DataInputBinding.prototype._handleFocusAndBlur=function(_7fd){
if(_7fd){
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
DataInputBinding.prototype.handleBroadcast=function(_800,arg){
DataInputBinding.superclass.handleBroadcast.call(this,_800,arg);
var self=this;
switch(_800){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(Client.isExplorer==true){
var _803=DOMEvents.getTarget(arg);
if(_803!=this.shadowTree.input){
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
DataInputBinding.prototype.focus=function(_804){
if(!this.isFocused&&!this.isReadOnly&&!this.isDisabled){
DataInputBinding.superclass.focus.call(this);
if(this.isFocused==true){
this._focus();
if(this._isAutoSelect==true){
if(_804){
var self=this,_806=this.bindingElement,_807={handleEvent:function(){
self.select();
DOMEvents.removeEventListener(_806,DOMEvents.MOUSEUP,this);
}};
DOMEvents.addEventListener(_806,DOMEvents.MOUSEUP,_807);
}else{
this.select();
}
}
this.onfocus();
if(!_804){
var _808=this.shadowTree.input;
setTimeout(function(){
FocusBinding.focusElement(_808);
},0);
}
}
}
};
DataInputBinding.prototype.select=function(){
var _809=this.shadowTree.input;
setTimeout(function(){
if(Client.isExplorer==true){
var _80a=_809.createTextRange();
_80a.moveStart("character",0);
_80a.moveEnd("character",_809.value.length);
_80a.select();
}else{
_809.setSelectionRange(0,_809.value.length);
}
},0);
};
DataInputBinding.prototype.blur=function(_80b){
if(this.isFocused==true){
DataInputBinding.superclass.blur.call(this);
if(!_80b){
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
DataInputBinding.prototype.validate=function(_80f){
if(_80f==true||this._isValid){
var _810=this.isValid();
if(_810!=this._isValid){
this._isValid=_810;
if(!_810){
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._value=this.getValue();
this.dispatchAction(Binding.ACTION_INVALID);
if(!this.isFocused){
var _811=null;
if(this._isInvalidBecauseRequired==true){
_811=DataBinding.warnings["required"];
}else{
if(this._isInvalidBecauseMinLength==true){
_811=DataBinding.warnings["minlength"];
_811=_811.replace("${count}",String(this.minlength));
}else{
if(this._isInvalidBecauseMaxLength==true){
_811=DataBinding.warnings["maxlength"];
_811=_811.replace("${count}",String(this.maxlength));
}else{
_811=DataBinding.warnings[this.type];
}
}
}
this.shadowTree.input.className=DataBinding.CLASSNAME_WARNING;
if(_811!=null){
if(this.isPassword){
if(Client.isMozilla){
this.shadowTree.input.type="text";
this.setValue(_811);
}else{
alert(_811);
}
}else{
this.setValue(_811);
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
var _812=true;
this._isInvalidBecauseRequired=false;
this._isInvalidBecauseMinLength=false;
this._isInvalidaBecuaseMaxLength=false;
var _813=this.getValue();
if(_813==""){
if(this.isRequired==true){
_812=false;
this._isInvalidBecauseRequired=true;
}
}else{
if(this.type!=null){
var _814=DataBinding.expressions[this.type];
if(!_814.test(_813)){
_812=false;
}
}else{
if(this.expression!=null){
if(!this.expression.test(_813)){
_812=false;
}
}
}
}
if(_812&&this.minlength!=null){
if(_813.length<this.minlength){
this._isInvalidBecauseMinLength=true;
_812=false;
}
}
if(_812&&this.maxlength!=null){
if(_813.length>this.maxlength){
this._isInvalidBecauseMaxLength=true;
_812=false;
}
}
return _812;
};
DataInputBinding.prototype.setDisabled=function(_815){
if(_815!=this.isDisabled){
if(_815){
this.attachClassName("isdisabled");
}else{
this.detachClassName("isdisabled");
}
var _816=this.shadowTree.input;
if(_815){
this._disabledHandler={handleEvent:function(e){
DOMEvents.preventDefault(e);
DOMEvents.stopPropagation(e);
}};
DOMEvents.addEventListener(_816,DOMEvents.MOUSEDOWN,this._disabledHandler);
}else{
DOMEvents.removeEventListener(_816,DOMEvents.MOUSEDOWN,this._disabledHandler);
this._disabledHandler=null;
}
if(Client.isExplorer){
this.shadowTree.input.disabled=_815;
this.shadowTree.input.unselectable=_815?"on":"off";
}
this.isDisabled=_815;
this.isFocusable=!_815;
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
};
DataInputBinding.prototype.setReadOnly=function(_818){
if(_818!=this.isReadOnly){
if(_818){
this.attachClassName("readonly");
}else{
this.detachClassName("readonly");
}
this.shadowTree.input.readOnly=_818;
this.isReadOnly=_818;
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
DataInputBinding.prototype.handleElement=function(_819){
return true;
};
DataInputBinding.prototype.updateElement=function(_81a){
var _81b=_81a.getAttribute("value");
var _81c=_81a.getAttribute("type");
var _81d=_81a.getAttribute("maxlength");
var _81e=_81a.getAttribute("minlength");
if(_81b==null){
_81b="";
}
var _81f=this.bindingWindow.UpdateManager;
if(this.getValue()!=_81b){
_81f.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_81b);
}
if(this.type!=_81c){
_81f.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_81c;
}
if(this.maxlength!=_81d){
_81f.report("Property [maxlength] updated on binding \""+this.getID()+"\"");
this.maxlength=_81d;
}
if(this.minlength!=_81e){
_81f.report("Property [minlength] updated on binding \""+this.getID()+"\"");
this.minlength=_81e;
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
DataInputBinding.prototype.setValue=function(_820){
if(_820===null){
_820="";
}
if(_820!=this.getValue()){
this.setProperty("value",_820);
if(this.shadowTree.input!=null){
this.shadowTree.input.value=String(_820);
}
}
};
DataInputBinding.prototype.getValue=function(){
var _821=null;
if(this.shadowTree.input!=null){
_821=this.shadowTree.input.value;
}else{
_821=this.getProperty("value");
}
return _821;
};
DataInputBinding.prototype.setName=function(name){
DataInputBinding.superclass.setName.call(this,name);
if(this.isAttached==true){
this.shadowTree.input.name=name;
}
};
DataInputBinding.prototype.getResult=function(){
var _823=this.getValue();
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_823=Number(_823);
break;
}
return _823;
};
DataInputBinding.prototype.setResult=DataInputBinding.prototype.setValue;
DataInputBinding.newInstance=function(_824){
var _825=DOMUtil.createElementNS(Constants.NS_UI,"ui:datainput",_824);
return UserInterface.registerBinding(_825,DataInputBinding);
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
var _826=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_826!=null){
this.setValue(_826.value);
_826.parentNode.removeChild(_826);
}
TextBoxBinding.superclass._buildDOMContent.call(this);
this.shadowTree.input.setAttribute("spellcheck","false");
if(!this._hasWordWrap){
this.shadowTree.input.setAttribute("wrap","off");
}
};
TextBoxBinding.prototype._getInputElement=function(){
var _827=DOMUtil.createElementNS(Constants.NS_XHTML,"textarea",this.bindingDocument);
_827.tabIndex=-1;
return _827;
};
TextBoxBinding.prototype.handleElement=function(_828){
return true;
};
TextBoxBinding.prototype.updateElement=function(_829){
var _82a,area=_829.getElementsByTagName("textarea").item(0);
if(area!=null&&area.hasChildNodes()){
_82a=DOMUtil.getTextContent(area);
}
if(_82a==null){
_82a="";
}
var _82c=this.bindingWindow.UpdateManager;
if(this.getValue()!=_82a){
_82c.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_82a);
}
var _82d=_829.getAttribute("type");
if(this.type!=_82d){
_82c.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_82d;
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
IEEditorTextBoxBinding.prototype._handleTabKey=function(_831){
var _832=this.bindingDocument.selection.createRange();
var _833=_832.text=="";
if(_833&&!_831){
_832.text="\t";
}else{
var text="";
var _835=_832.text.length;
while((_832.moveStart("word",-1)&&_832.text.charAt(1)!="\n")){
}
_832.moveStart("character",1);
var _836=0;
var i=0,line,_839=_832.text.split("\n");
while((line=_839[i++])!=null){
if(_831){
line=line.replace(/^(\s)/mg,"");
_836++;
}else{
line=line.replace(/^(.)/mg,"\t$1");
}
text+=line+(_839[i+1]?"\n":"");
}
_832.text=text;
_832.moveStart("character",-_835);
if(_831){
_832.moveStart("character",2*_839.length-2);
}
_832.select();
}
};
IEEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _83a=this.bindingDocument.selection.createRange();
var _83b=_83a.duplicate();
while((_83b.moveStart("word",-1)&&_83b.text.indexOf("\n")==-1)){
}
_83b.moveStart("character",1);
_83a.text="\n"+_83b.text.match(/^(\s)*/)[0]+"!";
_83a.moveStart("character",-1);
_83a.select();
_83a.text="";
_83a.select();
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
MozEditorTextBoxBinding.prototype._handleTabKey=function(_83c){
var _83d;
var _83e;
var oss;
var osy;
var i;
var fnd;
var _843=this._getSelectedText();
var el=this.shadowTree.input;
_83d=el.scrollLeft;
_83e=el.scrollTop;
if(!_843.match(/\n/)){
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
_843=this._getSelectedText();
if(_83c){
ntext=_843.replace(/^(\s)/mg,"");
}else{
ntext=_843.replace(/^(.)/mg,"\t$1");
}
el.value=el.value.substr(0,el.selectionStart)+ntext+el.value.substr(el.selectionEnd);
el.selectionStart=oss;
el.selectionEnd=osy+(ntext.length-_843.length);
}
el.scrollLeft=_83d;
el.scrollTop=_83e;
};
MozEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _845;
var _846;
var oss;
var osy;
var el=this.shadowTree.input;
_845=el.scrollLeft;
_846=el.scrollTop;
oss=el.selectionStart;
osy=el.selectionEnd;
var bfs=el.value.substr(0,el.selectionStart);
var bfsm=bfs.split(/\r|\n/g);
var spm=bfsm[bfsm.length-1].match(/^(\s)*/);
el.value=el.value.substr(0,el.selectionStart)+"\n"+spm[0]+el.value.substr(el.selectionEnd);
el.selectionStart=oss+1+spm[0].length;
el.selectionEnd=oss+1+spm[0].length;
el.scrollLeft=_845;
el.scrollTop=_846;
};
MozEditorTextBoxBinding.prototype._getSelectedText=function(){
var _84d=this.shadowTree.input.value;
var _84e=this.shadowTree.input.selectionStart;
var end=this.shadowTree.input.selectionEnd;
return _84d.substr(_84e,end-_84e);
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
var _850=this.getProperty("isdisabled");
if(this.isDisabled||_850){
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
var _852=this.getProperty("label");
var _853=this.getProperty("value");
var _854=this.getProperty("width");
var _855=this.getProperty("onchange");
var _856=this.getProperty("required")==true;
if(!this.type&&type){
this.type=type;
}
if(!this.label&&_852!=null){
this.label=_852;
}
if(!this.value&&_853!=null){
this.value=_853;
}
if(!this.width&&_854){
this.width=_854;
}
if(_856){
this.isRequired=true;
}
if(_855){
this.onValueChange=function(){
Binding.evaluate(_855,this);
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
var _857=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_857.name=this.getName();
_857.value=this.getValue();
_857.type="hidden";
if(this.hasCallBackID()){
_857.id=this.getCallBackID();
}
this.shadowTree.input=_857;
this.bindingElement.appendChild(_857);
};
SelectorBinding.prototype.buildButton=function(){
var _858=this.BUTTON_IMPLEMENTATION;
var _859=this.add(_858.newInstance(this.bindingDocument));
if(this.imageProfile!=null){
_859.imageProfile=this.imageProfile;
}
if(this.width!=null){
_859.setWidth(this.width);
}
this._buttonBinding=_859;
this.shadowTree.button=_859;
_859.attach();
};
SelectorBinding.prototype.buildIndicator=function(){
var img=this.bindingDocument.createElement("img");
img.src=SelectorBinding.INDICATOR_IMAGE;
img.className="selectorindicatorimage";
this._buttonBinding.bindingElement.appendChild(img);
this.shadowTree.selectorindicatorimage=img;
};
SelectorBinding.prototype.buildPopup=function(){
var _85b=top.app.bindingMap.selectorpopupset;
var doc=_85b.bindingDocument;
var _85d=_85b.add(PopupBinding.newInstance(doc));
var _85e=_85d.add(MenuBodyBinding.newInstance(doc));
this._popupBinding=_85d;
this._menuBodyBinding=_85e;
this._popupBinding.attachClassName(SelectorBinding.CLASSNAME_POPUP);
this._popupBinding.attachRecursive();
this._popupBinding.type=PopupBinding.TYPE_FIXED;
_85d.attachClassName("selectorpopup");
_85d.addActionListener(PopupBinding.ACTION_SHOW,this);
_85d.addActionListener(MenuItemBinding.ACTION_COMMAND,this);
_85d.addActionListener(PopupBinding.ACTION_HIDE,this);
this._buttonBinding.setPopup(_85d);
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
var _861=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_861).each(function(_862){
var _863=_862.getAttribute("label");
var _864=_862.getAttribute("value");
var _865=_862.getAttribute("selected");
var _866=_862.getAttribute("image");
var _867=_862.getAttribute("image-hover");
var _868=_862.getAttribute("image-active");
var _869=_862.getAttribute("image-disabled");
var _86a=null;
if(_866||_867||_868||_869){
_86a=new ImageProfile({image:_866,imageHover:_867,imageActive:_868,imageDisabled:_869});
}
list.add(new SelectorBindingSelection(_863?_863:null,_864?_864:null,_865&&_865=="true",_86a));
});
return list;
};
SelectorBinding.prototype.populateFromList=function(list){
if(this.isAttached){
this.clear();
if(list.hasEntries()){
var _86c=null;
while(list.hasNext()){
var _86d=list.getNext();
var item=this.addSelection(_86d);
if(!_86c){
_86c=item;
}
}
if(!this._selectedItemBinding){
this.select(_86c,true);
}
this.shadowTree.selectorindicatorimage.style.display="block";
}else{
this.shadowTree.selectorindicatorimage.style.display="none";
}
}else{
throw "Could not populate unattached selector";
}
};
SelectorBinding.prototype.addSelection=function(_86f,_870){
var _871=this.MENUITEM_IMPLEMENTATION;
var _872=this._menuBodyBinding;
var _873=_872.bindingDocument;
var _874=_871.newInstance(_873);
_874.imageProfile=_86f.imageProfile;
_874.setLabel(_86f.label);
if(_86f.tooltip!=null){
_874.setToolTip(_86f.tooltip);
}
_874.selectionValue=_86f.value;
if(_86f.isSelected){
this.select(_874,true);
}
_86f.menuItemBinding=_874;
if(_870){
_872.addFirst(_874);
this.selections.addFirst(_86f);
}else{
_872.add(_874);
this.selections.add(_86f);
}
this._isUpToDate=false;
return _874;
};
SelectorBinding.prototype.addSelectionFirst=function(_875){
return this.addSelection(_875,true);
};
SelectorBinding.prototype.clear=function(_876){
this._selectedItemBinding=null;
if(this._popupBinding){
this._popupBinding.clear();
this.selections.clear();
if(!_876&&this.defaultSelection!=null){
var _877=this.addSelection(this.defaultSelection);
this.select(_877,true);
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
SelectorBinding.prototype.setDisabled=function(_878){
if(this.isAttached==true){
var _879=this._buttonBinding;
this.shadowTree.selectorindicatorimage.style.display=_878?"none":"block";
_879.setDisabled(_878);
}
if(_878){
this.setProperty("isdisabled",true);
}else{
this.deleteProperty("isdisabled");
}
};
SelectorBinding.prototype.reset=function(_87a){
if(this.defaultSelection!=null){
this.selectByValue(this.defaultSelection.value,_87a);
}
};
SelectorBinding.prototype.handleAction=function(_87b){
SelectorBinding.superclass.handleAction.call(this,_87b);
switch(_87b.type){
case ButtonBinding.ACTION_COMMAND:
this._onButtonCommand();
_87b.consume();
break;
case PopupBinding.ACTION_SHOW:
this._onPopupShowing();
_87b.consume();
break;
case MenuItemBinding.ACTION_COMMAND:
this._onMenuItemCommand(_87b.target);
_87b.consume();
break;
case PopupBinding.ACTION_HIDE:
var self=this;
setTimeout(function(){
if(self.isFocused){
self._grabKeyboard();
}
},0);
_87b.consume();
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
SelectorBinding.prototype._onMenuItemCommand=function(_87d){
this.select(_87d);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
SelectorBinding.prototype._restoreSelection=function(){
if(this._selectedItemBinding){
this._selectedItemBinding.focus();
}
};
SelectorBinding.prototype._fitMenuToSelector=function(){
var _87e=this._buttonBinding.bindingElement.offsetWidth+"px";
var _87f=this._popupBinding.bindingElement;
if(Client.isMozilla==true){
_87f.style.minWidth=_87e;
}else{
_87f.style.width=_87e;
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
SelectorBinding.prototype.handleBroadcast=function(_881,arg){
SelectorBinding.superclass.handleBroadcast.call(this,_881,arg);
switch(_881){
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
SelectorBinding.prototype.select=function(_884,_885){
var _886=false;
if(_884!=this._selectedItemBinding){
this._selectedItemBinding=_884;
_886=true;
var _887=this._buttonBinding;
this._selectionValue=_884.selectionValue;
_887.setLabel(_884.getLabel());
if(_884.imageProfile!=null){
_887.imageProfile=_884.imageProfile;
}
if(_887.imageProfile!=null){
_887.setImage(this.isDisabled==true?_887.imageProfile.getDisabledImage():_887.imageProfile.getDefaultImage());
}
this._updateImageLayout();
if(!_885){
this.onValueChange();
this.dispatchAction(SelectorBinding.ACTION_SELECTIONCHANGED);
this.dirty();
}
if(!this._isValid||(this.isRequired&&!_885)){
this.validate();
}
}
return _886;
};
SelectorBinding.prototype._relate=function(){
var _888=this.getProperty("relate");
if(_888){
var _889=this.bindingDocument.getElementById(_888);
if(_889){
var _88a=UserInterface.getBinding(_889);
if(_88a){
if(this.isChecked){
_88a.show();
}else{
_88a.hide();
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
SelectorBinding.prototype.selectByValue=function(_88b,_88c){
var _88d=false;
var _88e=this._menuBodyBinding;
var _88f=_88e.getDescendantElementsByLocalName("menuitem");
while(_88f.hasNext()){
var _890=UserInterface.getBinding(_88f.getNext());
if(_890.selectionValue==_88b){
_88d=this.select(_890,_88c);
break;
}
}
return _88d;
};
SelectorBinding.prototype.getValue=function(){
var _891=this._selectionValue;
if(_891!=null){
_891=String(_891);
}
return _891;
};
SelectorBinding.prototype.setValue=function(_892){
this.selectByValue(String(_892),true);
};
SelectorBinding.prototype.getResult=function(){
var _893=this._selectionValue;
if(_893=="null"){
_893=null;
}
if(_893){
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_893=Number(_893);
break;
}
}
return _893;
};
SelectorBinding.prototype.setResult=function(_894){
this.selectByValue(_894,true);
};
SelectorBinding.prototype.validate=function(){
var _895=true;
if(this.isRequired==true&&this.defaultSelection!=null){
var _896=this.getValue();
if(_896==this.defaultSelection.value){
_895=false;
}
if(_895!=this._isValid){
if(_895){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_895;
}
return _895;
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
var _897=this._popupBinding;
if(!this._isUpToDate){
_897.attachRecursive();
this._isUpToDate=true;
}
};
SelectorBinding.prototype.handleElement=function(){
return true;
};
SelectorBinding.prototype.updateElement=function(_898,_899){
this.bindingWindow.UpdateManager.addUpdate(new this.bindingWindow.ReplaceUpdate(this.getID(),_898));
return true;
};
SelectorBinding.newInstance=function(_89a){
var _89b=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_89a);
return UserInterface.registerBinding(_89b,SelectorBinding);
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
var _89e=this.getProperty("onchange");
this.isRequired=this.getProperty("required")==true;
if(this.hasCallBackID()){
this._select.id=this.getCallBackID();
}
if(_89e){
this.onValueChange=function(){
Binding.evaluate(_89e,this);
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
SimpleSelectorBinding.prototype.focus=function(_8a1){
SimpleSelectorBinding.superclass.focus.call(this);
if(this.isFocused){
if(!_8a1){
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
SimpleSelectorBinding.prototype._hack=function(_8a2){
if(Client.isExplorer){
this._select.style.width=_8a2?"auto":this._cachewidth+"px";
if(_8a2){
if(this._select.offsetWidth<=this._cachewidth){
this._hack(false);
}
}
}
};
SimpleSelectorBinding.prototype.validate=function(){
var _8a3=true;
if(this.isRequired){
if(this.getValue()==null){
_8a3=false;
}
}
if(_8a3!=this._isValid){
if(_8a3){
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.attachClassName(DataBinding.CLASSNAME_INVALID);
var _8a4=this._select;
var _8a5=_8a4.options[_8a4.selectedIndex];
var text=DOMUtil.getTextContent(_8a5);
_8a4.blur();
_8a4.style.color="#A40000";
_8a4.style.fontWeight="bold";
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8a5,DataBinding.warnings["required"]);
}
_8a4.onfocus=function(){
this.style.color="black";
this.style.fontWeight="normal";
this.onfocus=null;
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8a5,text);
}
};
}
this._isValid=_8a3;
}
return _8a3;
};
SimpleSelectorBinding.prototype.manifest=function(){
};
SimpleSelectorBinding.prototype.getValue=function(){
var _8a7=null;
var _8a8=this._select;
var _8a9=_8a8.options[_8a8.selectedIndex];
var _8aa=true;
if(Client.isExplorer){
var html=_8a9.outerHTML.toLowerCase();
if(html.indexOf("value=")==-1){
_8aa=false;
}
}
if(_8aa){
_8a7=_8a9.getAttribute("value");
}
return _8a7;
};
SimpleSelectorBinding.prototype.setValue=function(_8ac){
};
SimpleSelectorBinding.prototype.getResult=function(){
return this.getValue();
};
SimpleSelectorBinding.prototype.setResult=function(_8ad){
this.setValue(_8ad);
};
SimpleSelectorBinding.newInstance=function(_8ae){
var _8af=DOMUtil.createElementNS(Constants.NS_XHTML,"select",_8ae);
return UserInterface.registerBinding(_8af,SimpleSelectorBinding);
};
function SelectorBindingSelection(_8b0,_8b1,_8b2,_8b3,_8b4){
this._init(_8b0,_8b1,_8b2,_8b3,_8b4);
}
SelectorBindingSelection.prototype={label:null,value:null,tooltip:null,isSelected:null,imageProfile:null,menuItemBinding:null,_init:function(_8b5,_8b6,_8b7,_8b8,_8b9){
if(_8b5!=null){
this.label=String(_8b5);
}
if(_8b6!=null){
this.value=String(_8b6);
}
if(_8b8!=null){
this.imageProfile=_8b8;
}
if(_8b9!=null){
this.tooltip=_8b9;
}
this.isSelected=_8b7?true:false;
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
var _8ba=this.addFirst(ToolBarButtonBinding.newInstance(this.bindingDocument));
_8ba.popupBindingTargetElement=this.shadowTree.input;
_8ba.setImage(DataInputSelectorBinding.INDICATOR_IMAGE);
_8ba.attach();
var self=this;
_8ba.oncommand=function(){
self._attachSelections();
};
this._buttonBinding=_8ba;
};
DataInputSelectorBinding.prototype.buildPopup=SelectorBinding.prototype.buildPopup;
DataInputSelectorBinding.prototype.buildSelections=function(){
var list=new List();
var _8bd=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_8bd).each(function(_8be){
if(_8be.getAttribute("label")){
throw "label not supported - use value property!";
}else{
var _8bf=_8be.getAttribute("value");
var _8c0=_8be.getAttribute("selected");
var _8c1=_8be.getAttribute("tooltip");
list.add({value:_8bf?_8bf:null,toolTip:_8c1?_8c1:null,isSelected:(_8c0&&_8c0=="true")?true:false});
}
});
if(list.hasEntries()){
this.populateFromList(list);
}
};
DataInputSelectorBinding.prototype.populateFromList=function(list){
var _8c3=this._menuBodyBinding;
var _8c4=_8c3.bindingDocument;
while(_8c3.bindingElement.hasChildNodes()){
var node=_8c3.bindingElement.lastChild;
if(node.nodeType==Node.ELEMENT_NODE&&UserInterface.hasBinding(node)){
UserInterface.getBinding(node).dispose();
}else{
_8c3.removeChild(node);
}
}
if(list.hasEntries()){
this._isUpToDate=false;
if(!this._buttonBinding.isVisible){
this._buttonBinding.show();
}
while(list.hasNext()){
var _8c6=list.getNext();
var _8c7=MenuItemBinding.newInstance(_8c4);
_8c7.setLabel(_8c6.value);
_8c7.selectionValue=_8c6.value;
if(_8c6.toolTip){
_8c7.setToolTip(_8c6.toolTip);
}
if(_8c6.isSelected){
this.select(_8c7,true);
}
_8c3.add(_8c7);
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
DataInputSelectorBinding.prototype._onMenuItemCommand=function(_8c8){
this.select(_8c8);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
DataInputSelectorBinding.prototype.handleBroadcast=function(_8c9,arg){
SelectorBinding.prototype.handleBroadcast.call(this,_8c9,arg);
switch(_8c9){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(arg!=this._buttonBinding){
DataInputSelectorBinding.superclass.handleBroadcast.call(this,_8c9,arg);
}
break;
}
};
DataInputSelectorBinding.prototype._grabKeyboard=SelectorBinding.prototype._grabKeyboard;
DataInputSelectorBinding.prototype._releaseKeyboard=SelectorBinding.prototype._releaseKeyboard;
DataInputSelectorBinding.prototype._handleArrowKey=SelectorBinding.prototype._handleArrowKey;
DataInputSelectorBinding.prototype.focus=function(_8cb){
if(!this.isFocused){
DataInputSelectorBinding.superclass.focus.call(this,_8cb);
if(this.isFocused==true){
this._grabKeyboard();
}
}
};
DataInputSelectorBinding.prototype.blur=function(_8cc){
if(this.isFocused==true){
DataInputSelectorBinding.superclass.blur.call(this,_8cc);
this._releaseKeyboard();
if(this._popupBinding.isVisible){
this._popupBinding.hide();
}
}
};
DataInputSelectorBinding.prototype._fitMenuToSelector=function(){
var _8cd=this.bindingElement.offsetWidth+"px";
var _8ce=this._popupBinding.bindingElement;
if(Client.isMozilla){
_8ce.style.minWidth=_8cd;
}else{
_8ce.style.width=_8cd;
}
};
DataInputSelectorBinding.prototype._restoreSelection=function(){
if(!this._isUpToDate){
this._attachSelections();
}
var _8cf=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
var _8d0=this.getValue();
var _8d1=null;
_8cf.each(function(item){
if(item.getLabel()==_8d0){
_8d1=item;
}
});
if(_8d1){
_8d1.focus();
}
};
DataInputSelectorBinding.prototype.select=function(item,_8d4){
if(item!=this._selectedItemBinding){
this._selectedItemBinding=item;
this.setValue(item.selectionValue);
if(!_8d4){
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
var _8d5=ToolBarButtonBinding.newInstance(this.bindingDocument);
_8d5.setImage("${icon:popup}");
this.addFirst(_8d5);
_8d5.attach();
var self=this;
_8d5.oncommand=function(){
self._isButtonClicked=true;
setTimeout(function(){
self._isButtonClicked=false;
},1000);
var _8d7=self.getProperty("handle");
var _8d8=ViewDefinitions[_8d7];
if(_8d8 instanceof DialogViewDefinition){
_8d8.handler={handleDialogResponse:function(_8d9,_8da){
self._isButtonClicked=false;
if(_8d9==Dialog.RESPONSE_ACCEPT){
self.logger.debug("Usecase scenario was hardcoded into DataInputDialogBinding#buildButton");
var _8db=_8da.getFirst();
self.setValue(_8db);
self.validate(true);
}
self.focus();
}};
_8d8.argument.selectedResult=self.getValue();
StageBinding.presentViewDefinition(_8d8);
}else{
throw "Definition was either undefine or of a non-dialog type.";
}
};
DOMEvents.addEventListener(_8d5.getBindingElement(),DOMEvents.MOUSEDOWN,{handleEvent:function(e){
self._isButtonClicked=true;
}});
this._dialogButtonBinding=_8d5;
};
DataInputDialogBinding.prototype.oncommand=function(){
var _8dd=this._dialogButtonBinding;
if(_8dd!=null){
_8dd.oncommand();
}
};
DataInputDialogBinding.prototype.validate=function(arg){
var _8df=true;
if(this._isButtonClicked==true){
this._isButtonClicked=false;
}else{
_8df=DataInputDialogBinding.superclass.validate.call(this,arg);
}
return _8df;
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
var _8e0=this.getProperty("label");
var _8e1=this.getProperty("tooltip");
this._buttonBinding=this.add(ClickButtonBinding.newInstance(this.bindingDocument));
if(_8e0!=null){
if(this.getProperty("handle")!=null||this.getProperty("url")!=null){
this._buttonBinding.setLabel(_8e0+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}else{
this._buttonBinding.setLabel(_8e0);
}
}
if(this.imageProfile){
this._buttonBinding.imageProfile=this.imageProfile;
}
if(_8e1!=null){
this._buttonBinding.setToolTip(_8e1);
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
DataDialogBinding.prototype.handleAction=function(_8e3){
DataDialogBinding.superclass.handleAction.call(this,_8e3);
var _8e4=_8e3.target;
var self=this;
switch(_8e3.type){
case ButtonBinding.ACTION_COMMAND:
if(this._handler==null){
this._handler={handleDialogResponse:function(_8e6,_8e7){
if(_8e6==Dialog.RESPONSE_ACCEPT){
if(_8e7 instanceof DataBindingMap){
self._map=_8e7;
}else{
throw "Invalid dialog result";
}
}
}};
}
if(_8e4==this._buttonBinding){
_8e3.consume();
this.focus();
this.fireCommand();
}
break;
}
};
DataDialogBinding.prototype.handleBroadcast=function(_8e8,arg){
DataDialogBinding.superclass.handleBroadcast.call(this,_8e8,arg);
switch(_8e8){
case BroadcastMessages.KEY_SPACE:
this.fireCommand();
break;
}
};
DataDialogBinding.prototype.fireCommand=function(def){
this.dispatchAction(this.constructor.ACTION_COMMAND);
var _8eb=this.getProperty("handle");
var url=this.getURL();
var _8ed=null;
if(_8eb!=null||def!=null){
if(_8eb!=null){
_8ed=ViewDefinitions[_8eb];
}else{
_8ed=def;
}
if(_8ed instanceof DialogViewDefinition){
_8ed.handler=this._handler;
if(this._map!=null){
_8ed.argument=this._map;
}
StageBinding.presentViewDefinition(_8ed);
}
}else{
if(url!=null){
_8ed=Dialog.invokeModal(url,this._handler,this._map);
}
}
if(_8ed!=null){
this._dialogViewHandle=_8ed.handle;
this._releaseKeyboard();
}
};
DataDialogBinding.prototype.setLabel=function(_8ee){
this.setProperty("label",_8ee);
if(this.isAttached){
this._buttonBinding.setLabel(_8ee+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}
};
DataDialogBinding.prototype.setImage=function(_8ef){
this.setProperty("image",_8ef);
if(this.imageProfile!=null){
this.imageProfile.setDefaultImage(_8ef);
if(this._buttonBinding!=null){
this._buttonBinding.imageProfile=this.imageProfile;
this._buttonBinding.setImage(this._buttonBinding.imageProfile.getDefaultImage());
}
}
};
DataDialogBinding.prototype.setToolTip=function(_8f0){
this.setProperty("tooltip",_8f0);
if(this.isAttached){
this._buttonBinding.setToolTip(_8f0);
}
};
DataDialogBinding.prototype.setHandle=function(_8f1){
this.setProperty("handle",_8f1);
};
DataDialogBinding.prototype.setURL=function(url){
this.setProperty("url",url);
};
DataDialogBinding.prototype.getURL=function(){
return this.getProperty("url");
};
DataDialogBinding.prototype.setHandler=function(_8f3){
this._handler=_8f3;
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
DataDialogBinding.newInstance=function(_8f5){
var _8f6=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_8f5);
return UserInterface.registerBinding(_8f6,DataDialogBinding);
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
this._handler={handleDialogResponse:function(_8f8,_8f9){
if(_8f8==Dialog.RESPONSE_ACCEPT){
self._onDialogAccept(_8f9);
}else{
self._onDialogCancel();
}
}};
};
PostBackDataDialogBinding.prototype._onDialogAccept=function(_8fa){
_8fa=new String(_8fa);
this.dirty();
this.setValue(encodeURIComponent(_8fa));
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
var _8fe=this.getValue();
if(_8fe==null){
_8fe="";
}
this.shadowTree.dotnetinput.value=_8fe;
};
PostBackDataDialogBinding.prototype.setValue=function(_8ff){
this.setProperty("value",_8ff);
};
PostBackDataDialogBinding.prototype.getValue=function(){
return this.getProperty("value");
};
PostBackDataDialogBinding.prototype.getResult=function(){
return null;
};
PostBackDataDialogBinding.prototype.setResult=function(_900){
};
PostBackDataDialogBinding.newInstance=function(_901){
var _902=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_901);
return UserInterface.registerBinding(_902,PostBackDataDialogBinding);
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
var _903=this.getProperty("dialoglabel");
var _904=this.getProperty("providersearch");
var key=this.getProperty("providerkey");
var _906=this.getProperty("handle");
if(_906!=null){
var def=ViewDefinition.clone(_906,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_903!=null){
if(def.argument==null){
def.argument={};
}
def.argument.label=_903;
}
if(_904!=null){
if(def.argument==null){
def.argument={};
}
if(def.argument.nodes==null){
def.argument.nodes=[];
}
def.argument.nodes[0].search=_904;
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
ViewDefinitionPostBackDataDialogBinding.newInstance=function(_908){
var _909=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_908);
return UserInterface.registerBinding(_909,ViewDefinitionPostBackDataDialogBinding);
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
this.propertyMethodMap["value"]=function(_90b){
self._datathing.setValue(_90b);
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
var _90e=self.getValue();
if(_90e==""||_90e==null){
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
var _90f=this.getProperty("value");
var _910=this.getProperty("selectorlabel");
if(_910==null){
_910=NullPostBackDataDialogBinding.LABEL_DEFAULT;
}
var list=new List();
list.add(new SelectorBindingSelection(NullPostBackDataDialogBinding.LABEL_NULL,NullPostBackDataDialogBinding.VALUE_NULL,_90f==null));
list.add(new SelectorBindingSelection(_910+LabelBinding.DIALOG_INDECATOR_SUFFIX,NullPostBackDataDialogBinding.VALUE_SELECTED,_90f!=null,new ImageProfile({image:"${icon:popup}"})));
this._selector.master=this;
this._selector.attach();
this._selector.populateFromList(list);
var _90f=this.getValue();
if(_90f==""||_90f==null){
this._selector.setLabel(NullPostBackDataDialogBinding.LABEL_NULL);
}else{
this._selector.setLabel(this.getLabel());
}
};
NullPostBackDataDialogBinding.prototype.handleAction=function(_912){
NullPostBackDataDialogBinding.superclass.handleAction.call(this,_912);
switch(_912.type){
case PageBinding.ACTION_DOPOSTBACK:
if(_912.target==this._datathing){
var _913=this.getProperty("label");
this._selector.setLabel("");
this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
var self=this;
setTimeout(function(){
if(self.getProperty("label")==_913){
self._selector.setLabel(_913);
}
},500);
_912.consume();
}
break;
}
};
NullPostBackDataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
NullPostBackDataDialogBinding.prototype.setLabel=function(_915){
this.setProperty("label",_915);
if(this._selector!=null){
this._selector.setLabel(_915);
}
};
NullPostBackDataDialogBinding.prototype.getValue=function(){
return this._datathing.getValue();
};
NullPostBackDataDialogBinding.prototype.setValue=function(_916){
this._datathing.setValue(_916);
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
NullPostBackDataDialogSelectorBinding.prototype.select=function(_917,_918){
if(NullPostBackDataDialogSelectorBinding.superclass.select.call(this,_917,_918)){
this._buttonBinding.setImage(null);
this._updateImageLayout();
if(this._selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
if(this.master.getValue()!=null){
}
}
}
};
NullPostBackDataDialogSelectorBinding.prototype.setLabel=function(_919){
this._buttonBinding.setLabel(_919);
};
NullPostBackDataDialogSelectorBinding.prototype.setToolTip=function(_91a){
this._buttonBinding.setToolTip(_91a);
};
NullPostBackDataDialogSelectorBinding.prototype.handleAction=function(_91b){
NullPostBackDataDialogSelectorBinding.superclass.handleAction.call(this,_91b);
switch(_91b.type){
case MenuItemBinding.ACTION_COMMAND:
var _91c=_91b.target;
var _91d=this.master;
if(_91c.selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
this.setLabel(_91c.getLabel());
setTimeout(function(){
_91d.action();
},0);
}else{
this.master.setValue("");
}
_91d.dirty();
break;
}
};
NullPostBackDataDialogSelectorBinding.prototype.manifest=function(){
};
NullPostBackDataDialogSelectorBinding.newInstance=function(_91e){
var _91f=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_91e);
return UserInterface.registerBinding(_91f,NullPostBackDataDialogSelectorBinding);
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
var _920=this._dataDialogBinding;
if(_920!=null){
DOMEvents.addEventListener(this.shadowTree.box,DOMEvents.DOUBLECLICK,{handleEvent:function(){
_920.fireCommand();
}});
}
};
MultiSelectorBinding.prototype._buildDOMContent=function(){
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
this.bindingElement.appendChild(this.shadowTree.box);
};
MultiSelectorBinding.prototype._parseDOMProperties=function(){
var _921=this.getProperty("editable");
var _922=this.getProperty("selectable");
var _923=this.getProperty("display");
if(_921!=false){
this._buildEditorButton();
}else{
this.isEditable=false;
}
if(_922){
this.isSelectable=true;
this._selectionMap=new Map();
}
if(_923){
this._display=_923;
}
};
MultiSelectorBinding.prototype._buildEditorButton=function(){
if(this.isEditable){
var _924=MultiSelectorDataDialogBinding.newInstance(this.bindingDocument);
_924.selections=this.selections;
this.add(_924);
_924.attach();
this._dataDialogBinding=_924;
this.shadowTree.datadialog=_924;
}
};
MultiSelectorBinding.prototype.populateFromList=function(list){
list.reset();
var _926=false;
this.shadowTree.box.innerHTML="";
while(list.hasNext()){
var _927=list.getNext();
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_926=_927.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_926=_927.isSelected!=true;
break;
}
if(_926){
this.shadowTree.box.appendChild(this._getElementForSelection(_927));
}
}
this.selections=list;
if(this._dataDialogBinding){
this._dataDialogBinding.selections=this.selections;
}
};
MultiSelectorBinding.prototype.cumulateFromList=function(list,_929){
var box=this.shadowTree.box;
var _92b=false;
if(list.hasEntries()){
list.reverse().reset();
while(list.hasNext()){
var _92c=list.getNext();
if(_929){
_92c.isSelected=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
_92b=true;
}else{
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_92b=_92c.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_92b=_92c.isSelected!=true;
break;
}
}
if(_92b){
var _92d=this._getElementForSelection(_92c);
box.insertBefore(_92d,box.firstChild);
CSSUtil.attachClassName(_92d,"selected");
this._selectionMap.set(_92c.value,_92d);
}
}
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
};
MultiSelectorBinding.prototype._getElementForSelection=function(_92e){
var _92f=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument);
_92f.appendChild(this.bindingDocument.createTextNode(_92e.label));
_92f.setAttribute("label",_92e.label);
_92f.setAttribute("value",_92e.value);
return _92f;
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
var _931=DOMEvents.getTarget(e);
var _932=DOMUtil.getLocalName(_931);
if(_932=="div"){
this._handleMouseDown(_931);
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
break;
}
};
MultiSelectorBinding.prototype._handleMouseDown=function(_933){
if(Keyboard.isShiftPressed&&this._lastSelectedElement){
var _934=this._getElements();
var _935=_933.getAttribute("value");
var _936=this._lastSelectedElement.getAttribute("value");
var _937=false;
while(_934.hasNext()){
var el=_934.getNext();
switch(el.getAttribute("value")){
case _935:
case _936:
_937=!_937;
break;
}
if(_937){
this._hilite(el);
}else{
this._unhilite(el);
}
this._hilite(this._lastSelectedElement);
this._hilite(_933);
}
}else{
if(Keyboard.isControlPressed&&this._isHilited(_933)){
this._unhilite(_933);
}else{
this._hilite(_933);
}
if(!Keyboard.isControlPressed){
var self=this;
this._getElements().each(function(el){
if(el!=_933){
self._unhilite(el);
}
});
}
}
this._lastSelectedElement=_933;
};
MultiSelectorBinding.prototype._hilite=function(_93b){
var _93c=_93b.getAttribute("value");
if(!this._selectionMap.has(_93c)){
CSSUtil.attachClassName(_93b,"selected");
this._selectionMap.set(_93c,_93b);
}
};
MultiSelectorBinding.prototype._unhilite=function(_93d){
var _93e=_93d.getAttribute("value");
if(this._selectionMap.has(_93e)){
CSSUtil.detachClassName(_93d,"selected");
this._selectionMap.del(_93e);
}
};
MultiSelectorBinding.prototype._isHilited=function(_93f){
return CSSUtil.hasClassName(_93f,"selected");
};
MultiSelectorBinding.prototype.handleAction=function(_940){
MultiSelectorBinding.superclass.handleAction.call(this,_940);
var _941=_940.target;
switch(_940.type){
case DataDialogBinding.ACTION_COMMAND:
if(_941==this._dataDialogBinding){
if(!this.isFocused){
this.focus();
}
this.dispatchAction(MultiSelectorBinding.ACTION_COMMAND);
_940.consume();
}
break;
case MultiSelectorDataDialogBinding.ACTION_RESULT:
this.populateFromList(_941.result);
this.dirty();
_941.result=null;
_940.consume();
break;
}
};
MultiSelectorBinding.prototype.extractSelected=function(){
var _942=null;
if(this.isSelectable){
_942=new List();
if(this._selectionMap&&this._selectionMap.hasEntries()){
var self=this;
this._getElements().each(function(_944){
if(self._isHilited(_944)){
_944.parentNode.removeChild(_944);
_942.add(new SelectorBindingSelection(_944.getAttribute("label"),_944.getAttribute("value"),true));
}
});
this._selectionMap=new Map();
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
return _942;
};
MultiSelectorBinding.prototype.reposition=function(isUp){
var _946=this._getElements();
if(!isUp){
_946.reverse();
}
var _947=true;
while(_947&&_946.hasNext()){
var _948=_946.getNext();
if(this._isHilited(_948)){
switch(isUp){
case true:
if(_948.previousSibling){
_948.parentNode.insertBefore(_948,_948.previousSibling);
}else{
_947=false;
}
break;
case false:
if(_948.nextSibling){
_948.parentNode.insertBefore(_948,_948.nextSibling.nextSibling);
}else{
_947=false;
}
break;
}
}
}
};
MultiSelectorBinding.prototype.toSelectionList=function(){
var _949=new List();
var _94a=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
var self=this;
this._getElements().each(function(_94c){
var _94d=new SelectorBindingSelection(_94c.getAttribute("label"),_94c.getAttribute("value"),_94a);
_94d.isHighlighted=self._isHilited(_94c);
_949.add(_94d);
});
return _949;
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
var _94e=new List(DOMUtil.getElementsByTagName(this.bindingElement,"input"));
if(_94e.hasEntries()){
_94e.each(function(_94f){
_94f.parentNode.removeChild(_94f);
});
}
this.selections.reset();
while(this.selections.hasNext()){
var _950=this.selections.getNext();
if(_950.isSelected){
var _951=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_951.name=this._name;
_951.value=_950.value;
this.bindingElement.appendChild(_951);
}
}
};
MultiSelectorBinding.prototype.getValue=function(){
return "HEJ!";
};
MultiSelectorBinding.prototype.setValue=function(_952){
alert(_952);
};
MultiSelectorBinding.prototype.getResult=function(){
alert("TODO: MultiSelectorBinding#getResult");
return new Array();
};
MultiSelectorBinding.prototype.setResult=function(_953){
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
var _954={label:DataBinding.getAssociatedLabel(this),value:decodeURIComponent(this.getValue()),configuration:{"formattingconfiguration":this.getProperty("formattingconfiguration"),"elementclassconfiguration":this.getProperty("elementclassconfiguration"),"configurationstylesheet":this.getProperty("configurationstylesheet"),"presentationstylesheet":this.getProperty("presentationstylesheet"),"embedablefieldstypenames":this.getProperty("embedablefieldstypenames")}};
var _955=ViewDefinitions["Composite.Management.VisualEditorDialog"];
_955.handler=this._handler;
_955.argument=_954;
StageBinding.presentViewDefinition(_955);
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
var _956={label:DataBinding.getAssociatedLabel(this),selections:this.selections};
var self=this;
var _958={handleDialogResponse:function(_959,_95a){
if(_959==Dialog.RESPONSE_ACCEPT){
self.result=_95a;
self.dispatchAction(MultiSelectorDataDialogBinding.ACTION_RESULT);
}
}};
var _95b=ViewDefinitions[this._dialogViewHandle];
_95b.handler=_958;
_95b.argument=_956;
StageBinding.presentViewDefinition(_95b);
};
MultiSelectorDataDialogBinding.newInstance=function(_95c){
var _95d=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_95c);
return UserInterface.registerBinding(_95d,MultiSelectorDataDialogBinding);
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
LazyBindingBinding.wakeUp=function(_95e){
var id=_95e.bindingElement.id+LazyBindingBinding.ID_APPENDIX;
var _960=_95e.bindingDocument.getElementById(id);
if(_960!=null){
var _961=UserInterface.getBinding(_960);
_961.setResult(true);
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
var _963=this.bindingDocument.getElementById(id);
if(_963!=null){
var _964=UserInterface.getBinding(_963);
if(_964&&!_964.isAttached){
_964.isLazy=true;
}else{
_963.setAttribute("lazy",true);
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
LazyBindingBinding.prototype.setResult=function(_965){
this._isLazy=_965;
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
var _967=this.getProperty("stateprovider");
var _968=this.getProperty("handle");
if(_967!=null&&_968!=null){
url=url.replace("${stateprovider}",_967).replace("${handle}",_968);
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
EditorDataBinding.prototype._onPageInitialize=function(_969){
EditorDataBinding.superclass._onPageInitialize.call(this,_969);
if(this._pageBinding!=null){
Application.unlock(this);
this._coverBinding.hide();
}
};
EditorDataBinding.prototype.setName=DataBinding.prototype.setName;
EditorDataBinding.prototype.validate=function(){
return this._pageBinding.validateAllDataBindings();
};
EditorDataBinding.prototype.handleAction=function(_96a){
EditorDataBinding.superclass.handleAction.call(this,_96a);
switch(_96a.type){
case Binding.ACTION_DIRTY:
if(_96a.target!=this){
if(!this.isDirty){
this.dirty();
}
_96a.consume();
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
EditorDataBinding.prototype.setValue=function(_96b){
};
EditorDataBinding.prototype.getResult=function(){
return null;
};
EditorDataBinding.prototype.setResult=function(_96c){
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
var _971=true;
if(this.getProperty("required")){
var fake=this.getDescendantBindingByLocalName("datainput");
_971=fake.getValue()!="";
}
if(!_971&&this._isValid){
this._isValid=false;
this.dispatchAction(Binding.ACTION_INVALID);
}else{
if(_971&&!this._isValid){
this.dispatchAction(Binding.ACTION_VALID);
}
}
return _971;
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
var _975=this.bindingDocument.getElementById(RequestBinding.INPUT_ID);
if(_975!=null){
_975.value=Application.CONSOLE_ID;
}
};
RequestBinding.prototype.postback=function(_976){
_976=_976!=null?_976:EditorPageBinding.message;
this.shadowTree.dotnetinput.value=_976;
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
var _977=Templates.getTemplateElementText("fieldgroupmatrix.xml");
var _978=_977.replace("MARKUP",this.bindingElement.innerHTML);
try{
this.bindingElement.innerHTML=_978;
}
catch(exception1){
this.logger.error("Exeption in innerHTML!");
_978=_978.replace(/\&nbsp;/g,"");
this.bindingElement.innerHTML=_978;
}
var self=this;
var _97a=DOMUtil.getElementsByTagName(this.bindingElement,"table").item(0);
new List(_97a.rows).each(function(row){
new List(row.cells).each(function(cell){
self.shadowTree[cell.className]=cell;
});
});
};
FieldGroupBinding.prototype._buildDOMContent=function(){
var _97d=this.getProperty("label");
if(_97d){
this.setLabel(_97d);
}else{
this.attachClassName(FieldGroupBinding.CLASSNAME_NOLABEL);
}
};
FieldGroupBinding.prototype.setLabel=function(_97e){
this.setProperty("label",_97e);
if(this.shadowTree.labelBinding==null){
var _97f=LabelBinding.newInstance(this.bindingDocument);
var cell=this.shadowTree[FieldGroupBinding.NORTH];
_97f.attachClassName("fieldgrouplabel");
cell.insertBefore(_97f.bindingElement,cell.getElementsByTagName("div").item(1));
_97f.attach();
this.shadowTree.labelBinding=_97f;
}
this.shadowTree.labelBinding.setLabel(Resolver.resolve(_97e));
};
FieldGroupBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
FieldGroupBinding.prototype.add=function(_981){
this.shadowTree[FieldGroupBinding.CENTER].appendChild(_981.bindingElement);
return _981;
};
FieldGroupBinding.prototype.addFirst=function(_982){
var _983=this.shadowTree[FieldGroupBinding.CENTER];
_983.insertBefore(_982.bindingElement,_983.firstChild);
return _982;
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
var _984=this.getProperty("relation");
if(_984!=null){
this.bindingRelation=_984;
this.subscribe(BroadcastMessages.BINDING_RELATE);
this.hide();
}
};
FieldBinding.prototype.handleBroadcast=function(_985,arg){
FieldBinding.superclass.handleBroadcast.call(this,_985,arg);
switch(_985){
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
FieldBinding.newInstance=function(_987){
var _988=DOMUtil.createElementNS(Constants.NS_UI,"ui:field",_987);
return UserInterface.registerBinding(_988,FieldBinding);
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
var _989=this.getDescendantBindingByLocalName("fieldgroup");
if(_989!=null){
_989.attachClassName(FieldGroupBinding.CLASSNAME_FIRST);
}
};
FieldsBinding.prototype.onBindingDispose=function(){
FieldsBinding.superclass.onBindingDispose.call(this);
if(this._invalidCount>0){
this.dispatchAction(Binding.ACTION_VALID);
}
};
FieldsBinding.prototype.validate=function(){
var _98a=true;
var _98b=this.getDescendantBindingsByLocalName("*");
while(_98b.hasNext()){
var _98c=_98b.getNext();
if(Interfaces.isImplemented(IData,_98c)){
var _98d=_98c.validate();
if(_98a&&!_98d){
_98a=false;
}
}
}
return _98a;
};
FieldsBinding.prototype.handleAction=function(_98e){
FieldsBinding.superclass.handleAction.call(this,_98e);
var _98f=_98e.target;
if(_98f!=this){
switch(_98e.type){
case Binding.ACTION_INVALID:
var _990=DataBinding.getAssociatedLabel(_98f);
if(_990){
this._invalidFieldLabels.set(_98f.key,_990);
}
if(_98f.error){
if(!_98f.isInvalidBecauseRequired){
ErrorBinding.presentError({text:_98f.error},_98f);
}
}
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_INVALID);
}
this._invalidCount++;
_98e.consume();
break;
case Binding.ACTION_VALID:
if(this._invalidFieldLabels.has(_98f.key)){
this._invalidFieldLabels.del(_98f.key);
}
this._invalidCount--;
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_VALID);
}
_98e.consume();
break;
}
}
};
FieldsBinding.prototype.getInvalidLabels=function(){
var _991=null;
if(this._invalidFieldLabels.hasEntries()){
_991=this._invalidFieldLabels.toList();
}
return _991;
};
FieldsBinding.newInstance=function(_992){
var _993=DOMUtil.createElementNS(Constants.NS_UI,"ui:fields",_992);
return UserInterface.registerBinding(_993,FieldsBinding);
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
var _994=this.getProperty("image");
if(_994){
this.setImage(_994);
}
var _995=this.getProperty("tooltip");
if(_995){
this.setToolTip(_995);
}
var _996=this.getProperty("label");
if(_996){
this.setLabel(_996);
}
};
FieldDescBinding.prototype.attachDOMEvents=function(){
this.addEventListener(DOMEvents.CLICK);
};
FieldDescBinding.prototype.handleEvent=function(e){
FieldDescBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.CLICK:
var _998=this.getAncestorBindingByLocalName("field");
if(_998){
var _999=true;
_998.getDescendantBindingsByLocalName("*").each(function(_99a){
if(Interfaces.isImplemented(IData,_99a)){
_99a.focus();
_999=false;
}
return _999;
});
}
break;
}
};
FieldDescBinding.prototype.setLabel=function(_99b){
this.setProperty("label",_99b);
if(this.isAttached){
this.bindingElement.innerHTML=Resolver.resolve(_99b);
}
};
FieldDescBinding.prototype.getLabel=function(){
var _99c=this.getProperty("label");
if(!_99c){
var node=this.bindingElement.firstChild;
if(node&&node.nodeType==Node.TEXT_NODE){
_99c=node.data;
}
}
return _99c;
};
FieldDescBinding.prototype.setImage=function(_99e){
this.setProperty("image",_99e);
if(this.isAttached){
throw "FieldDescBinding: Images not suppoerted!";
}
};
FieldDescBinding.prototype.setToolTip=function(_99f){
this.setProperty("tooltip",_99f);
if(this.isAttached){
this.bindingElement.title=_99f;
}
};
FieldDescBinding.newInstance=function(_9a0){
var _9a1=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddesc",_9a0);
return UserInterface.registerBinding(_9a1,FieldDescBinding);
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
FieldDataBinding.newInstance=function(_9a2){
var _9a3=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddata",_9a2);
return UserInterface.registerBinding(_9a3,FieldDataBinding);
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
var _9a4=this._fieldHelpPopupBinding;
if(_9a4){
_9a4.dispose();
}
};
FieldHelpBinding.prototype.buildPopupBinding=function(){
var _9a5=app.bindingMap.fieldhelpopupset;
var doc=_9a5.bindingDocument;
var _9a7=_9a5.add(PopupBinding.newInstance(doc));
var _9a8=_9a7.add(PopupBodyBinding.newInstance(doc));
_9a7.position=PopupBinding.POSITION_RIGHT;
_9a7.attachClassName("fieldhelppopup");
if(this.bindingElement.hasChildNodes()){
_9a8.bindingElement.innerHTML=this.bindingElement.innerHTML;
}else{
var _9a9=this.getProperty("label");
if(_9a9){
_9a8.bindingElement.innerHTML=Resolver.resolve(_9a9);
}
}
this.bindingElement.innerHTML="";
this._fieldHelpPopupBinding=_9a7;
};
FieldHelpBinding.prototype.buildPopupButton=function(){
var _9aa=this.getAncestorBindingByLocalName("field");
if(_9aa){
_9aa.attachClassName("fieldhelp");
var _9ab=ClickButtonBinding.newInstance(this.bindingDocument);
_9ab.attachClassName("fieldhelp");
_9ab.setImage(FieldHelpBinding.INDICATOR_IMAGE);
this.add(_9ab);
_9ab.attach();
var self=this;
_9ab.oncommand=function(){
self.attachPopupBinding();
};
_9ab.setPopup(this._fieldHelpPopupBinding);
this._fieldHelpButton=_9ab;
}
};
FieldHelpBinding.prototype.attachPopupBinding=function(){
var _9ad=this._fieldHelpPopupBinding;
if(_9ad&&!_9ad.isAttached){
_9ad.attachRecursive();
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
RadioDataGroupBinding.prototype.handleAction=function(_9af){
RadioDataGroupBinding.superclass.handleAction.call(this,_9af);
switch(_9af.type){
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
RadioDataGroupBinding.prototype.handleBroadcast=function(_9b1,arg){
RadioDataGroupBinding.superclass.handleBroadcast.call(this,_9b1,arg);
switch(_9b1){
case BroadcastMessages.KEY_ARROW:
var _9b3=null;
var next=null;
var _9b5=null;
switch(arg){
case KeyEventCodes.VK_DOWN:
case KeyEventCodes.VK_UP:
_9b5=this.getChildBindingsByLocalName("radio");
while(!_9b3&&_9b5.hasNext()){
var _9b6=_9b5.getNext();
if(_9b6.getProperty("ischecked")){
_9b3=_9b6;
}
}
break;
}
if(_9b3){
switch(arg){
case KeyEventCodes.VK_DOWN:
next=_9b5.getFollowing(_9b3);
while(next!=null&&next.isDisabled){
next=_9b5.getFollowing(next);
}
break;
case KeyEventCodes.VK_UP:
next=_9b5.getPreceding(_9b3);
while(next!=null&&next.isDisabled){
next=_9b5.getPreceding(next);
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
RadioDataGroupBinding.prototype.focus=function(_9b7){
if(!this.isFocused){
DataBinding.prototype.focus.call(this);
if(this.isFocused){
if(!_9b7){
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
var _9b8=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_9b8.type="hidden";
_9b8.name=this._name;
this.bindingElement.appendChild(_9b8);
this.shadowTree.input=_9b8;
}
this.shadowTree.input.value=this.getValue();
}
};
RadioDataGroupBinding.prototype.getValue=function(){
var _9b9=null;
var _9ba=this.getChildBindingsByLocalName("radio");
while(!_9b9&&_9ba.hasNext()){
var _9bb=_9ba.getNext();
if(_9bb.isChecked){
_9b9=_9bb.getProperty("value");
}
}
return _9b9;
};
RadioDataGroupBinding.prototype.getResult=RadioDataGroupBinding.prototype.getValue;
RadioDataGroupBinding.prototype.setValue=function(_9bc){
};
RadioDataGroupBinding.prototype.setResult=function(_9bd){
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
this.propertyMethodMap["checked"]=function(_9be){
if(_9be!=this.isChecked){
this.setChecked(_9be,true);
}
};
this.propertyMethodMap["checksum"]=function(){
var _9bf=this.getProperty("ischecked");
if(_9bf!=this.isChecked){
this.setChecked(_9bf,true);
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
var _9c0=this.getProperty("relate");
var _9c1=this.getProperty("oncommand");
if(_9c0){
this.bindingRelate=_9c0;
this.relate();
}
if(_9c1){
this.oncommand=function(){
Binding.evaluate(_9c1,this);
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
var _9c3=this.getCallBackID();
this._buttonBinding.check=function(_9c4){
RadioButtonBinding.prototype.check.call(this,_9c4);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
};
this._buttonBinding.uncheck=function(_9c5){
RadioButtonBinding.prototype.uncheck.call(this,_9c5);
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
RadioDataBinding.prototype.setChecked=function(_9c6,_9c7){
this._buttonBinding.setChecked(_9c6,_9c7);
if(this.bindingRelate!=null){
this.relate();
}
this.setProperty("ischecked",_9c6);
};
RadioDataBinding.prototype.check=function(_9c8){
this.setChecked(true,_9c8);
};
RadioDataBinding.prototype.uncheck=function(_9c9){
this.setChecked(false,_9c9);
};
RadioDataBinding.prototype.setDisabled=function(_9ca){
if(_9ca!=this.isDisabled){
this.isDisabled=_9ca;
this._buttonBinding.setDisabled(_9ca);
if(_9ca){
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
var _9cc=DOMEvents.getTarget(e);
switch(_9cc){
case this.shadowTree.labelText:
if(!this.isChecked&&!this.isDisabled){
this.check();
}
break;
}
}
};
RadioDataBinding.prototype._buildLabelText=function(){
var _9cd=this.getProperty("label");
if(_9cd){
this.shadowTree.labelText=DOMUtil.createElementNS(Constants.NS_UI,"ui:datalabeltext",this.bindingDocument);
this.shadowTree.labelText.appendChild(this.bindingDocument.createTextNode(Resolver.resolve(_9cd)));
DOMEvents.addEventListener(this.shadowTree.labelText,DOMEvents.CLICK,this);
this.bindingElement.appendChild(this.shadowTree.labelText);
}
};
RadioDataBinding.prototype.setLabel=function(_9ce){
if(this.shadowTree.labelText!=null){
this.shadowTree.labelText.firstChild.data=_9ce;
}
this.setProperty("label",_9ce);
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
this.propertyMethodMap["checked"]=function(_9cf){
if(_9cf!=this.isChecked){
this.setChecked(_9cf,true);
}
};
this.propertyMethodMap["checksum"]=function(){
var _9d0=this.getProperty("ischecked");
if(_9d0!=this.isChecked){
this.setChecked(_9d0,true);
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
var _9d2=DOMEvents.getTarget(e);
switch(_9d2){
case this.shadowTree.labelText:
this.setChecked(!this.isChecked);
break;
}
}
};
CheckBoxBinding.prototype.relate=RadioDataBinding.prototype.relate;
CheckBoxBinding.prototype.handleBroadcast=function(_9d3,arg){
CheckBoxBinding.superclass.handleBroadcast.call(this,_9d3,arg);
switch(_9d3){
case BroadcastMessages.KEY_SPACE:
this.setChecked(!this.isChecked);
break;
}
};
CheckBoxBinding.prototype._buildButtonBinding=function(){
this._buttonBinding=this.add(CheckButtonBinding.newInstance(this.bindingDocument));
var self=this;
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_9d6){
_9d6.consume();
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
var _9d8=this.getCallBackID();
this._buttonBinding.check=function(_9d9){
ButtonBinding.prototype.check.call(this,_9d9);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
if(!_9d9){
self.focus();
}
};
this._buttonBinding.uncheck=function(_9da){
ButtonBinding.prototype.uncheck.call(this,_9da);
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
if(_9d8!=null){
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
var _9db=true;
var _9dc=this.bindingElement.parentNode;
if(_9dc){
var _9dd=UserInterface.getBinding(_9dc);
if(_9dd&&_9dd instanceof CheckBoxGroupBinding){
if(_9dd.isRequired){
if(_9dd.isValid){
_9db=_9dd.validate();
}else{
_9db=false;
}
}
}
}
return _9db;
};
CheckBoxBinding.prototype.manifest=function(){
if(this.isAttached){
switch(this.isChecked){
case true:
if(!this.shadowTree.input){
var _9de=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_9de.type="hidden";
_9de.name=this._name;
_9de.style.display="none";
this.bindingElement.appendChild(_9de);
this.shadowTree.input=_9de;
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
var _9df=null;
var _9e0=this.getProperty("value");
if(this.isChecked){
_9df=_9e0?_9e0:"on";
}
return _9df;
};
CheckBoxBinding.prototype.setValue=function(_9e1){
if(_9e1==this.getValue()||_9e1=="on"){
this.check(true);
}else{
if(_9e1!="on"){
this.setPropety("value",_9e1);
}
}
};
CheckBoxBinding.prototype.getResult=function(){
var _9e2=false;
if(this.isChecked){
_9e2=this._result!=null?this._result:true;
}
return _9e2;
};
CheckBoxBinding.prototype.setResult=function(_9e3){
if(typeof _9e3=="boolean"){
this.setChecked(_9e3,true);
}else{
this._result=_9e3;
}
};
CheckBoxBinding.newInstance=function(_9e4){
var _9e5=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbox",_9e4);
return UserInterface.registerBinding(_9e5,CheckBoxBinding);
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
var _9e6=true;
if(this.isRequired){
var _9e7=this.getDescendantBindingsByLocalName("checkbox");
if(_9e7.hasEntries()){
_9e6=false;
while(_9e7.hasNext()&&!_9e6){
if(_9e7.getNext().isChecked){
_9e6=true;
}
}
}
if(_9e6==false){
this._showWarning(true);
this.dispatchAction(Binding.ACTION_INVALID);
this.addActionListener(CheckBoxBinding.ACTION_COMMAND);
}
}
return _9e6;
};
CheckBoxGroupBinding.prototype._showWarning=function(_9e8){
if(_9e8){
if(!this._labelBinding){
var _9e9=LabelBinding.newInstance(this.bindingDocument);
_9e9.attachClassName("invalid");
_9e9.setImage("${icon:error}");
_9e9.setLabel("Selection required");
this._labelBinding=this.addFirst(_9e9);
this._labelBinding.attach();
}
}else{
if(this._labelBinding){
this._labelBinding.dispose();
this._labelBinding=null;
}
}
};
CheckBoxGroupBinding.prototype.handleAction=function(_9ea){
CheckBoxGroupBinding.superclass.handleAction.call(this,_9ea);
switch(_9ea.type){
case CheckBoxBinding.ACTION_COMMAND:
this._showWarning(false);
this.dispatchAction(Binding.ACTION_VALID);
this.removeActionListener(CheckBoxBinding.ACTION_COMMAND);
break;
}
};
CheckBoxGroupBinding.newInstance=function(_9eb){
var _9ec=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkboxgroup",_9eb);
return UserInterface.registerBinding(_9ec,CheckBoxGroupBinding);
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
var _9ed=DialogControlBinding.newInstance(this.bindingDocument);
_9ed.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_9ed);
this._controlGroupBinding.attachRecursive();
var _9ee=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloonspeak",this.bindingDocument);
this.bindingElement.appendChild(_9ee);
var _9ef=this.getLabel();
if(_9ef!=null){
this.setLabel(_9ef);
}
};
BalloonBinding.prototype.onBindingDispose=function(){
BalloonBinding.superclass.onBindingDispose.call(this);
if(this._updateInterval){
window.clearInterval(this._updateInterval);
this._updateInterval=null;
}
var _9f0=this._snapTargetBinding;
if(Binding.exists(_9f0)==true){
_9f0.removeActionListener(Binding.ACTION_BLURRED,this);
_9f0.removeActionListener(Binding.ACTION_VALID,this);
}
};
BalloonBinding.prototype.snapTo=function(_9f1){
if(Interfaces.isImplemented(IData,_9f1)){
this._snapTargetBinding=_9f1;
var _9f2=_9f1.dispatchAction(BalloonBinding.ACTION_INITIALIZE);
if(_9f2&&_9f2.isConsumed){
this._environmentBinding=_9f2.listener;
}
if(this._environmentBinding){
_9f1.addActionListener(Binding.ACTION_BLURRED,this);
_9f1.addActionListener(Binding.ACTION_VALID,this);
this.subscribe(BroadcastMessages.VIEW_CLOSED);
var self=this;
this._updateInterval=window.setInterval(function(){
if(Binding.exists(_9f1)==true){
self._updatePosition();
}else{
self.dispose();
}
},BalloonBinding.TIMEOUT);
_9f1.dispatchAction(BalloonBinding.ACTION_SNAP);
}else{
throw "No environment fit for balloons!";
}
}
};
BalloonBinding.prototype._updatePosition=function(){
var _9f4=this._snapTargetBinding;
var _9f5=this._environmentBinding;
var root=UserInterface.getBinding(_9f4.bindingDocument.body);
if(Binding.exists(_9f4)&&Binding.exists(_9f5)){
if(!root.isActivated){
if(this.isVisible==true){
this.hide();
}
}else{
if(_9f4.isAttached&&_9f5.isAttached){
var _9f7=_9f4.boxObject.getUniversalPosition();
var _9f8=_9f5.boxObject.getUniversalPosition();
_9f8.y+=_9f5.bindingElement.scrollTop;
_9f8.x+=_9f5.bindingElement.scrollLeft;
var tDim=_9f4.boxObject.getDimension();
var eDim=_9f5.boxObject.getDimension();
var _9fb=false;
if(_9f7.y+tDim.h<_9f8.y){
_9fb=true;
}else{
if(_9f7.x+tDim.w<_9f8.x){
_9fb=true;
}else{
if(_9f7.y>_9f8.y+eDim.h){
_9fb=true;
}else{
if(_9f7.x>_9f8.x+eDim.w){
_9fb=true;
}
}
}
}
if(!_9fb){
this._setComputedPosition(_9f7,_9f8,tDim,eDim);
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
BalloonBinding.prototype._setComputedPosition=function(_9fc,_9fd,tDim,eDim){
var wDim=WindowManager.getWindowDimensions();
var bDim=this._getDimension();
var _a02=_9fc;
var _a03=false;
if(_9fc.x+tDim.w+bDim.w+BalloonBinding.OFFSET_X>=wDim.w){
_a03=true;
}else{
if(_9fc.x+tDim.w>=_9fd.x+eDim.w){
_a03=true;
}
}
if(_a03){
_a02.x-=(bDim.w+BalloonBinding.OFFSET_X);
this.attachClassName(BalloonBinding.CLASSNAME_LEFT);
}else{
_a02.x+=tDim.w+BalloonBinding.OFFSET_X;
this.detachClassName(BalloonBinding.CLASSNAME_LEFT);
}
_a02.y-=(bDim.h);
_a02.y+=BalloonBinding.OFFSET_Y;
this._setPosition(_a02);
};
BalloonBinding.prototype.handleBroadcast=function(_a04,arg){
BalloonBinding.superclass.handleBroadcast.call(this,_a04,arg);
switch(_a04){
case BroadcastMessages.VIEW_CLOSED:
if(this._isAssociatedView(arg)==true){
this.dispose();
}
break;
}
};
BalloonBinding.prototype._isAssociatedView=function(_a06){
var _a07=false;
if(this._snapTargetBinding){
var view=this._snapTargetBinding.getAncestorBindingByType(ViewBinding,true);
if(view&&view.getHandle()==_a06){
_a07=true;
}
}
return _a07;
};
BalloonBinding.prototype._setPosition=function(_a09){
var _a0a=false;
var pos=this.boxObject.getLocalPosition();
if(this._point!=null){
if(pos.x!=this._point.x||pos.y!=this._point.y){
_a0a=true;
}
}
if(!_a0a){
this.bindingElement.style.left=_a09.x+"px";
this.bindingElement.style.top=_a09.y+"px";
this._point=_a09;
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
BalloonBinding.prototype.handleAction=function(_a0c){
BalloonBinding.superclass.handleAction.call(this,_a0c);
var _a0d=_a0c.target;
switch(_a0c.type){
case Binding.ACTION_ACTIVATED:
if(this._snapTargetBinding){
this._snapTargetBinding.dispatchAction(Binding.ACTION_ACTIVATED);
_a0c.consume();
}
case Binding.ACTION_BLURRED:
case Binding.ACTION_VALID:
if(_a0d==this._snapTargetBinding){
var self=this;
setTimeout(function(){
if(!Binding.exists(_a0d)){
self.dispose();
}else{
if(_a0d.validate()){
var _a0f=true;
if(_a0c.type==Binding.ACTION_BLURRED){
var root=_a0d.bindingDocument.body;
var bind=UserInterface.getBinding(root);
if(!root.isActivated){
_a0f=false;
}
}
if(_a0f){
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
BalloonBinding.prototype.setLabel=function(_a12){
if(this.isAttached==true){
if(!this._isTableIndexed){
this._indexTable();
}
var _a13=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloontext",this.bindingDocument);
var text=this.bindingDocument.createTextNode(_a12);
_a13.appendChild(text);
this.shadowTree[MatrixBinding.CENTER].appendChild(_a13);
}
this.setProperty("label",_a12);
};
BalloonBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
BalloonBinding.newInstance=function(_a15){
var _a16=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloon",_a15);
var _a17=UserInterface.registerBinding(_a16,BalloonBinding);
_a17.hide();
return _a17;
};
ErrorBinding.prototype=new Binding;
ErrorBinding.prototype.constructor=ErrorBinding;
ErrorBinding.superclass=Binding.prototype;
ErrorBinding.ACTION_INITIALIZE="error initialize";
ErrorBinding.presentError=function(_a18,_a19){
if(Interfaces.isImplemented(IData,_a19)==true){
var _a1a,_a1b=_a19.dispatchAction(ErrorBinding.ACTION_INITIALIZE);
if(_a1b&&_a1b.isConsumed){
switch(_a1b.listener.constructor){
case StageBinding:
_a1a=false;
break;
case StageDialogBinding:
_a1a=true;
break;
}
}
var _a1c=_a1a?top.app.bindingMap.dialogballoonset:top.app.bindingMap.balloonset;
var _a1d=_a1c.add(BalloonBinding.newInstance(top.app.document));
_a1d.setLabel(_a18.text);
_a1d.snapTo(_a19);
_a1d.attach();
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
var _a1e=this.bindingWindow.DataManager;
var text=this.getProperty("text");
var name=this.getProperty("targetname");
var _a21=_a1e.getDataBinding(name);
if(_a21){
ErrorBinding.presentError({text:text},_a21);
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
FocusBinding.focusElement=function(_a22){
var _a23=true;
try{
_a22.focus();
Application.focused(true);
}
catch(exception){
var _a24=UserInterface.getBinding(_a22);
var _a25=SystemLogger.getLogger("FocusBinding.focusElement");
_a25.warn("Could not focus "+(_a24?_a24.toString():String(_a22)));
_a23=false;
}
return _a23;
};
FocusBinding.focusedBinding=null;
FocusBinding.activeInstance=null;
FocusBinding.getCachedFocus=function(_a26){
var win=_a26.bindingWindow;
var id=_a26.bindingElement.id;
return {getBinding:function(){
var _a29=null;
try{
if(Binding.exists(_a26)){
_a29=win.bindingMap[id];
}
}
catch(exception){
}
return _a29;
}};
};
FocusBinding.navigateNext=function(_a2a){
if(Binding.exists(FocusBinding.activeInstance)){
FocusBinding.activeInstance.focusNext(_a2a);
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
var _a2b=this.dispatchAction(FocusBinding.ACTION_ATTACHED);
if(_a2b&&_a2b.isConsumed){
if(_a2b.listener.isStrongFocusManager){
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
FocusBinding.prototype.handleAction=function(_a2c){
FocusBinding.superclass.handleAction.call(this,_a2c);
var _a2d=_a2c.target;
var _a2e=null;
if(this._isFocusManager){
switch(_a2c.type){
case FocusBinding.ACTION_ATTACHED:
if(_a2d!=this){
this._isUpToDate=false;
}
_a2c.consume();
break;
case FocusBinding.ACTION_UPDATE:
if(_a2d!=this){
this._isUpToDate=false;
_a2c.consume();
}
break;
case FocusBinding.ACTION_BLUR:
if(Application.isOperational){
_a2e=new FocusCrawler();
_a2e.mode=FocusCrawler.MODE_BLUR;
_a2e.crawl(_a2d.bindingElement);
if(this._cachedFocus!=null){
this._cachedFocus=null;
}
}
_a2c.consume();
break;
case FocusBinding.ACTION_FOCUS:
if(Application.isOperational&&_a2d!=this){
_a2e=new FocusCrawler();
_a2e.mode=FocusCrawler.MODE_FOCUS;
_a2e.crawl(_a2d.bindingElement);
}
_a2c.consume();
break;
case Binding.ACTION_FOCUSED:
if(Interfaces.isImplemented(IFocusable,_a2d)){
this.claimFocus();
this._onFocusableFocused(_a2d);
}
_a2c.consume();
break;
case Binding.ACTION_BLURRED:
if(Interfaces.isImplemented(IFocusable,_a2d)){
this._onFocusableBlurred(_a2d);
}
_a2c.consume();
break;
}
}
};
FocusBinding.prototype.focusNext=function(_a2f){
var _a30=null;
var list=this._getFocusableList();
if(list.reset().hasEntries()){
while(_a30==null&&list.hasNext()){
var _a32=list.getNext();
if(this._cachedFocus&&_a32==this._cachedFocus.getBinding()){
_a30=_a32;
}
}
if(_a30!=null){
if(_a32.isFocused){
var next=_a2f?list.getPreceding(_a30):list.getFollowing(_a30);
if(!next){
next=_a2f?list.getLast():list.getFirst();
}
next.focus();
}else{
_a30.focus();
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
var _a34=new FocusCrawler();
var list=new List();
_a34.mode=FocusCrawler.MODE_INDEX;
_a34.crawl(this.bindingElement,list);
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
var _a38=this._cachedFocus.getBinding();
if(_a38&&!_a38.isFocused){
_a38.focus();
}
}
};
FocusBinding.prototype._onFocusableFocused=function(_a39){
if(_a39!=FocusBinding.focusedBinding){
if(FocusBinding.focusedBinding!=null){
if(Binding.exists(FocusBinding.focusedBinding)){
FocusBinding.focusedBinding.blur();
}
}
FocusBinding.focusedBinding=_a39;
_a39.setProperty(FocusBinding.MARKER,true);
this._cachedFocus=FocusBinding.getCachedFocus(_a39);
}
};
FocusBinding.prototype._onFocusableBlurred=function(_a3a){
_a3a.deleteProperty(FocusBinding.MARKER);
if(_a3a==FocusBinding.focusedBinding){
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
TabsButtonBinding.prototype.show=function(_a3c){
this.bindingElement.style.left=_a3c+"px";
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
TabsButtonBinding.prototype.registerHiddenTabBinding=function(_a3d){
this.hiddenTabBindings.add(_a3d);
};
TabsButtonBinding.prototype.fireCommand=function(){
if(this.isChecked&&!this.isPopulated){
this.hiddenTabBindings.reset();
while(this.hiddenTabBindings.hasNext()){
var _a3e=this.hiddenTabBindings.getNext();
var item=MenuItemBinding.newInstance(this.popupBinding.bindingDocument);
item.setLabel(_a3e.getLabel());
item.setImage(_a3e.getImage());
item.associatedTabBinding=_a3e;
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
TabsButtonBinding.prototype.handleAction=function(_a41){
TabsButtonBinding.superclass.handleAction.call(this,_a41);
switch(_a41.type){
case PopupBinding.ACTION_HIDE:
this.popupBinding.removeActionListener(PopupBinding.ACTION_HIDE,this);
var _a42=this.selectedTabBinding;
if(_a42){
this.containingTabBoxBinding.moveToOrdinalPosition(_a42,0);
this.containingTabBoxBinding.select(_a42);
}
_a41.consume();
break;
}
};
TabsButtonBinding.newInstance=function(_a43){
var _a44=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_a43);
_a44.setAttribute("type","checkbox");
_a44.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_a44.className="tabbutton";
return UserInterface.registerBinding(_a44,TabsButtonBinding);
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
var _a45=TabBoxBinding.currentActiveInstance;
if(_a45!=null&&Binding.exists(_a45)){
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
var _a46=this.getTabElements().getLength();
var _a47=this.getTabPanelElements().getLength();
if(!this._tabsElement||!this._tabPanelsElement){
throw new Error(this.toString()+" DOM subtree invalid.");
}else{
if(_a46!=_a47){
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
var _a48=this.getTabPanelElements();
while(_a48.hasNext()){
this._setupWarningSystem(UserInterface.getBinding(_a48.getNext()));
}
if(this.isEqualSize){
this.enforceEqualSize();
this.dispatchAction(PageBinding.ACTION_UNBLOCK_INIT);
}
this.dispatchAction(TabBoxBinding.ACTION_ATTACHED);
TabBoxBinding.superclass.onBindingInitialize.call(this);
};
TabBoxBinding.prototype.buildDOMContent=function(){
var _a49=DOMUtil.getOrdinalPosition(this._tabsElement);
var _a4a=DOMUtil.getOrdinalPosition(this._tabPanelsElement);
var _a4b=_a49>_a4a?"tabsbelow":"tabsontop";
this.attachClassName(_a4b);
};
TabBoxBinding.prototype._TEMPNAME=function(){
var tabs=this.getTabElements();
var _a4d=this.getTabPanelElements();
var _a4e=null;
var _a4f=this.getProperty("selectedindex");
if(_a4f!=null){
if(_a4f>tabs.getLength()-1){
throw "Selectedindex out of range";
}
}
if(tabs.hasEntries()){
var _a50=0;
while(tabs.hasNext()){
var tab=tabs.getNext();
var _a52=_a4d.getNext();
this.registerTabBoxPair(tab,_a52);
if(_a4f&&_a50==_a4f){
tab.setAttribute("selected","true");
}else{
if(tab.getAttribute("selected")=="true"){
_a4e=tab;
}
}
_a50++;
}
if(!_a4e){
_a4e=tabs.getFirst();
_a4e.setAttribute("selected","true");
}
}
};
TabBoxBinding.prototype.enforceEqualSize=function(_a53){
var _a54=null;
var _a55=null;
if(this.isEqualSize){
var _a56=CSSComputer.getPadding(this._tabPanelsElement);
var max=0,_a58=this.getTabPanelElements();
_a58.each(function(_a59){
max=_a59.offsetHeight>max?_a59.offsetHeight:max;
});
_a55=max+_a56.top+_a56.bottom;
if(_a53&&this._tabPanelsElement.style.height!=null){
_a54=this._tabPanelsElement.offsetHeight;
}
if(_a54!=null||_a55>_a54){
this._tabPanelsElement.style.height=_a55+"px";
}
}
};
TabBoxBinding.prototype._setupWarningSystem=function(_a5a){
_a5a._invalidCount=0;
_a5a.addActionListener(Binding.ACTION_INVALID,this);
_a5a.addActionListener(Binding.ACTION_VALID,this);
_a5a.addActionListener(BalloonBinding.ACTION_SNAP,this);
};
TabBoxBinding.prototype.handleAction=function(_a5b){
TabBoxBinding.superclass.handleAction.call(this,_a5b);
var _a5c=_a5b.target;
var _a5d=_a5b.listener;
switch(_a5b.type){
case Binding.ACTION_ATTACHED:
break;
case Binding.ACTION_DETACHED:
if(_a5c.constructor==this._impl_tab){
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
_a5b.consume();
}
break;
case PageBinding.ACTION_INITIALIZED:
if(_a5c.isDialogSubPage&&this.isEqualSize){
this.enforceEqualSize();
}
break;
case Binding.ACTION_INVALID:
_a5d._invalidCount++;
if(_a5d._invalidCount==1){
var self=this;
setTimeout(function(){
if(!_a5d.isSelected){
self._showWarning(_a5d,true);
}
},0);
}
break;
case Binding.ACTION_VALID:
if(_a5d._invalidCount>0){
_a5d._invalidCount--;
if(_a5d._invalidCount==0){
if(_a5d.isSelected){
this._showWarning(_a5d,false);
}
}
}
break;
case BalloonBinding.ACTION_SNAP:
this._showBalloon(_a5d,true);
break;
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FOCUSED:
if(_a5b._tabboxstamp==null){
TabBoxBinding.currentActiveInstance=this;
_a5b._tabboxstamp="stamped";
}
break;
}
};
TabBoxBinding.prototype.handleEvent=function(e){
TabBoxBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.AFTERUPDATE:
var _a60=DOMEvents.getTarget(e);
if(_a60==this.bindingDocument.documentElement){
if(this._hasBastardUpdates){
this._hasBastardUpdates=false;
var tabs=this.getTabElements();
var _a62=this.getTabPanelElements();
tabs.each(function(tab,_a64){
if(tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY)==null){
var _a65=_a62.get(_a64);
this.registerTabBoxPair(tab,_a65);
}
},this);
var _a66=this._tabBoxPairs;
for(var key in _a66){
var tab=_a66[key].tab;
if(tab.parentNode==null){
this.unRegisterTabBoxPair(tab);
}
}
}
}else{
if(!this._hasBastardUpdates){
var name=DOMUtil.getLocalName(_a60);
switch(_a60.__updateType){
case Update.TYPE_INSERT:
switch(name){
case this._nodename_tab:
case this._nodename_tabpanel:
var _a6a=_a60.parentNode;
if(_a6a==this._tabsElement||_a6a==this._tabPanelsElement){
this._hasBastardUpdates=true;
}
break;
}
break;
case Update.TYPE_REMOVE:
switch(name){
case this._nodename_tabs:
case this._nodename_tabpanels:
if(_a60==this._tabsElement||_a60==this._tabPanelsElement){
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
TabBoxBinding.prototype.select=function(arg,_a6c){
var _a6d=this.getBindingForArgument(arg);
if(_a6d!=null&&!_a6d.isSelected){
if(this._selectedTabBinding!=null){
this._selectedTabBinding.unselect();
this.getTabPanelBinding(this._selectedTabBinding).unselect();
}
this.dispatchAction(TabBoxBinding.ACTION_UNSELECTED);
_a6d.select(_a6c);
this.getTabPanelBinding(_a6d).select(_a6c);
var _a6e=this.getProperty("selectedindex");
if(_a6e!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_a6d.bindingElement,true));
}
this._selectedTabBinding=_a6d;
this.dispatchAction(TabBoxBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
if(_a6d.getImage()==TabBoxBinding.BALLOON_TAB_IMAGE){
var _a6f=this.getTabPanelBinding(_a6d);
this._showBalloon(_a6f,false);
}
}
};
TabBoxBinding.prototype.registerTabBoxPair=function(tab,_a71){
var key=KeyMaster.getUniqueKey();
tab.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
_a71.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
this._tabBoxPairs[key]={tab:tab,tabPanel:_a71};
};
TabBoxBinding.prototype.unRegisterTabBoxPair=function(tab){
var key=tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY);
delete this._tabBoxPairs[key];
};
TabBoxBinding.prototype.getTabPanelBinding=function(_a75){
var _a76=null;
try{
var key=_a75.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _a78=this._tabBoxPairs[key].tabPanel;
_a76=UserInterface.getBinding(_a78);
}
catch(exception){
this.logger.error(exception);
SystemDebug.stack(arguments);
}
return _a76;
};
TabBoxBinding.prototype.getTabBinding=function(_a79){
var key=_a79.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _a7b=this._tabBoxPairs[key].tab;
return UserInterface.getBinding(_a7b);
};
TabBoxBinding.prototype.summonTabBinding=function(){
return TabBinding.newInstance(this.bindingDocument);
};
TabBoxBinding.prototype.summonTabPanelBinding=function(){
var _a7c=this._impl_tabpanel.newInstance(this.bindingDocument);
this._setupWarningSystem(_a7c);
return _a7c;
};
TabBoxBinding.prototype.appendTabByBindings=function(_a7d,_a7e){
var _a7f=_a7d.bindingElement;
_a7d.setProperty("selected",true);
var _a80=this.summonTabPanelBinding();
var _a81=_a80.bindingElement;
if(_a7e){
_a81.appendChild(_a7e instanceof Binding?_a7e.bindingElement:_a7e);
}
this.registerTabBoxPair(_a7f,_a81);
UserInterface.getBinding(this._tabsElement).add(_a7d);
this._tabPanelsElement.appendChild(_a81);
_a7d.attach();
UserInterface.getBinding(_a81).attachRecursive();
this.updateType=TabBoxBinding.UPDATE_ATTACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
return _a7d;
};
TabBoxBinding.prototype.importTabBinding=function(_a82){
var that=_a82.containingTabBoxBinding;
var _a84=that.getTabPanelBinding(_a82);
var _a85=_a84.getBindingElement();
var _a86=_a82.getBindingElement();
that.dismissTabBinding(_a82);
this._tabsElement.appendChild(_a86);
this._tabPanelsElement.appendChild(_a85);
this.registerTabBoxPair(_a86,_a85);
_a82.containingTabBoxBinding=this;
this.select(_a82);
this.dispatchAction(Binding.ACTION_ACTIVATED);
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.removeTab=function(_a87){
var _a88=null;
if(_a87.isSelected){
_a88=this.getBestTab(_a87);
this._selectedTabBinding=null;
}
var _a89=this.getTabPanelBinding(_a87);
this.unRegisterTabBoxPair(_a87.bindingElement);
_a87.dispose();
_a89.dispose();
if(_a88!=null){
this.select(_a88);
}
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.dismissTabBinding=function(_a8a){
if(_a8a.isSelected){
this.selectBestTab(_a8a);
}
};
TabBoxBinding.prototype.selectBestTab=function(_a8b){
var _a8c=this.getBestTab(_a8b);
if(_a8c){
this.select(_a8c);
}else{
this._selectedTabBinding=null;
}
};
TabBoxBinding.prototype.getBestTab=function(_a8d){
var _a8e=null;
var _a8f=_a8d.getOrdinalPosition(true);
var _a90=this.getTabBindings();
var _a91=_a90.getLength();
var _a92=_a91-1;
if(_a91==1){
_a8e=null;
}else{
if(_a8f==_a92){
_a8e=_a90.get(_a8f-1);
}else{
_a8e=_a90.get(_a8f+1);
}
}
return _a8e;
};
TabBoxBinding.prototype.moveToOrdinalPosition=function(_a93,_a94){
var _a95=this.bindingDocument.getElementById(_a93.bindingElement.id);
var tab=this.getTabElements().get(_a94);
this._tabsElement.insertBefore(_a95,tab);
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
var _a97=this._nodename_tab;
var _a98=new List(this._tabsElement.childNodes);
var _a99=new List();
while(_a98.hasNext()){
var _a9a=_a98.getNext();
if(_a9a.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_a9a)==_a97){
_a99.add(_a9a);
}
}
return _a99;
};
TabBoxBinding.prototype.getTabPanelElements=function(){
var _a9b=this._nodename_tabpanel;
var _a9c=new List(this._tabPanelsElement.childNodes);
var _a9d=new List();
_a9c.each(function(_a9e){
if(_a9e.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_a9e)==_a9b){
_a9d.add(_a9e);
}
});
return _a9d;
};
TabBoxBinding.prototype.getTabsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabs);
};
TabBoxBinding.prototype.getTabPanelsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabpanels);
};
TabBoxBinding.prototype.getTabBindings=function(){
var _a9f=new List();
var _aa0=this.getTabElements();
_aa0.each(function(_aa1){
_a9f.add(UserInterface.getBinding(_aa1));
});
return _a9f;
};
TabBoxBinding.prototype.getTabPanelBindings=function(){
var _aa2=new List();
this.getTabPanelElements().each(function(_aa3){
_aa2.add(UserInterface.getBinding(_aa3));
});
return _aa2;
};
TabBoxBinding.prototype.getSelectedTabBinding=function(){
return this._selectedTabBinding;
};
TabBoxBinding.prototype.getSelectedTabPanelBinding=function(){
var _aa4=null;
if(this._selectedTabBinding){
_aa4=this.getTabPanelBinding(this._selectedTabBinding);
}
return _aa4;
};
TabBoxBinding.prototype._showWarning=function(_aa5,_aa6){
var _aa7=this.getTabBinding(_aa5);
if(_aa6){
if(_aa7.labelBinding.hasImage){
_aa7._backupImage=_aa7.getImage();
}
_aa7.setImage(TabBoxBinding.INVALID_TAB_IMAGE);
}else{
if(_aa7._backupImage){
_aa7.setImage(_aa7._backupImage);
}else{
_aa7.setImage(false);
}
}
};
TabBoxBinding.prototype._showBalloon=function(_aa8,_aa9){
var _aaa=this.getTabBinding(_aa8);
if((_aa9&&!_aaa.isSelected)||!_aa9){
if(_aaa.getImage()!=TabBoxBinding.INVALID_TAB_IMAGE){
if(_aa9){
if(_aaa.labelBinding.hasImage){
_aaa._backupImage=_aaa.getImage();
}
_aaa.setImage(TabBoxBinding.BALLOON_TAB_IMAGE);
}else{
if(_aaa._backupImage!=null){
_aaa.setImage(_aaa._backupImage);
}else{
_aaa.setImage(false);
}
}
}
}
};
TabBoxBinding.prototype.advanceSelection=function(_aab){
var tab=this.getSelectedTabBinding();
var tabs=this.getTabBindings();
var _aae=tab.getOrdinalPosition(true);
var next=null;
var _ab0=new List();
tabs.each(function(t){
if(t.isVisible){
_ab0.add(t);
}
});
if(_ab0.getLength()>1){
if(_aae==0&&!_aab){
next=_ab0.getLast();
}else{
if(_aae==_ab0.getLength()-1&&_aab){
next=_ab0.getFirst();
}else{
if(_aab){
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
var _ab3=this.constructor.TABBUTTON_IMPLEMENTATION;
this.tabsButtonBinding=_ab3.newInstance(this.bindingDocument);
this.shadowTree.tabsButton=this.tabsButtonBinding;
this.add(this.tabsButtonBinding);
this.tabsButtonBinding.attach();
};
TabsBinding.prototype.handleAction=function(_ab4){
TabsBinding.superclass.handleAction.call(this,_ab4);
switch(_ab4.type){
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
var _ab7=self.bindingElement.offsetWidth;
if(_ab7!=self._cachedOffsetWidth){
self.manage();
}
self._cachedOffsetWidth=_ab7;
}
}
setTimeout(manage,0);
}
};
TabsBinding.prototype.add=function(_ab8){
if(_ab8 instanceof TabBinding){
if(this.tabsButtonBinding&&this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
return TabsBinding.superclass.add.call(this,_ab8);
};
TabsBinding.prototype.manage=function(){
if(Binding.exists(this)==true&&this.isVisible){
this.isManaging=true;
var _ab9=false;
var _aba,tab,tabs=this.containingTabBoxBinding.getTabElements();
var _abd=this.constructor.TABBUTTON_IMPLEMENTATION;
var _abe=this.bindingElement.offsetWidth-_abd.RESERVED_SPACE;
var _abf=null;
var sum=0,_ac1=0;
var _ac2=true;
if(tabs.hasEntries()){
this.tabsButtonBinding.reset();
while(tabs.hasNext()&&_ac2){
tab=tabs.getNext();
_aba=UserInterface.getBinding(tab);
if(!_abf){
_abf=_aba;
}
sum+=tab.offsetWidth;
if(sum>=_abe){
_ab9=true;
if(_aba.isSelected){
if(!DOMUtil.isFirstElement(_aba.bindingElement,true)){
this.isManaging=false;
if(_abf){
_abf.hide();
if(this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
this.containingTabBoxBinding.moveToOrdinalPosition(_aba,_ac1-1);
_ac2=false;
}
}else{
_aba.hide();
this.tabsButtonBinding.registerHiddenTabBinding(_aba);
}
}else{
_aba.show();
_abf=_aba;
_ac1++;
}
}
if(_ac2){
if(_ab9&&this.tabsButtonBinding.hiddenTabBindings.hasEntries()){
var _ac3=_abf.getBindingElement();
var _ac4=_ac3.offsetLeft+_ac3.offsetWidth;
var _ac5=this.tabsButtonBinding;
setTimeout(function(){
_ac5.show(_ac4+4);
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
var _ac6=TabBinding.superclass.serialize.call(this);
if(_ac6){
_ac6.label=this.getLabel();
_ac6.image=this.getImage();
_ac6.tooltip=this.getToolTip();
}
return _ac6;
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
var _ac7=this.bindingElement.getAttribute("image");
var _ac8=this.bindingElement.getAttribute("label");
var _ac9=this.bindingElement.getAttribute("tooltip");
this.bindingElement.className="default";
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.shadowTree.labelBinding=this.labelBinding;
this.labelBinding.attachClassName("tablabel");
this.add(this.labelBinding);
if(_ac8){
this.setLabel(_ac8);
}
if(_ac7){
this.setImage(_ac7);
}
if(_ac9){
this.setToolTip(_ac9);
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
TabBinding.prototype.setLabel=function(_acb){
if(_acb!=null){
this.setProperty("label",_acb);
if(this.isAttached){
this.labelBinding.setLabel(_acb);
}
}
};
TabBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
TabBinding.prototype.setToolTip=function(_acc){
if(_acc){
this.setProperty("tooltip",_acc);
if(this.isAttached){
this.labelBinding.setToolTip(_acc);
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
var _ace=false;
if(Client.isMozilla==true){
}
if(!_ace){
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
TabBinding.prototype.select=function(_acf){
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
TabBinding.newInstance=function(_ad0){
var _ad1=DOMUtil.createElementNS(Constants.NS_UI,"ui:tab",_ad0);
return UserInterface.registerBinding(_ad1,TabBinding);
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
var _ad2=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(dim2==null||!Dimension.isEqual(dim1,dim2)){
_ad2=true;
this._lastKnownDimension=dim1;
}
return _ad2;
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
TabPanelBinding.prototype.select=function(_ad5){
if(!this.isSelected){
if(this.isLazy){
this.wakeUp("select");
}else{
this.isSelected=true;
this.isVisible=true;
this.bindingElement.style.position="static";
this._invokeManagedRecursiveFlex();
if(_ad5!=true){
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
TabPanelBinding.prototype.handleAction=function(_ad6){
TabPanelBinding.superclass.handleAction.call(this,_ad6);
var _ad7=_ad6.target;
switch(_ad6.type){
case BalloonBinding.ACTION_INITIALIZE:
_ad6.consume();
break;
}
};
TabPanelBinding.newInstance=function(_ad8){
var _ad9=DOMUtil.createElementNS(Constants.NS_UI,"ui:tabpanel",_ad8);
UserInterface.registerBinding(_ad9,TabPanelBinding);
return UserInterface.getBinding(_ad9);
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
var _ada=SplitBoxBinding.superclass.serialize.call(this);
if(_ada){
_ada.orient=this.getOrient();
_ada.layout=this.getLayout();
}
return _ada;
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
var _adb=this.getSplitPanelElements();
if(_adb.hasEntries()){
var _adc=new List(this.getLayout().split(":"));
if(_adc.getLength()!=_adb.getLength()){
throw new Error(this+" DOM subree invalid");
}else{
_adb.each(function(_add){
_add.setAttribute("ratio",_adc.getNext());
});
}
}
this.isLayoutInitialized=true;
};
SplitBoxBinding.prototype._initializeOrient=function(){
var _ade=this.getProperty("orient");
if(_ade){
this._orient=_ade;
}
this.attachClassName(this._orient);
};
SplitBoxBinding.prototype._initializeSplitters=function(){
var _adf=this.getSplitterBindings();
while(_adf.hasNext()){
var _ae0=_adf.getNext();
if(_ae0&&_ae0.getProperty("collapsed")==true){
_ae0.collapse();
}
}
};
SplitBoxBinding.prototype.handleAction=function(_ae1){
SplitBoxBinding.superclass.handleAction.call(this,_ae1);
switch(_ae1.type){
case SplitterBinding.ACTION_DRAGGED:
this.refreshLayout();
_ae1.consume();
break;
case SplitterBinding.ACTION_COLLAPSE:
this.collapse(_ae1.target);
_ae1.consume();
break;
case SplitterBinding.ACTION_UNCOLLAPSE:
this.unCollapse(_ae1.target);
_ae1.consume();
break;
}
};
SplitBoxBinding.prototype.flex=function(){
SplitBoxBinding.superclass.flex.call(this);
if(this.isAttached==true){
this.invokeLayout(true);
}
};
SplitBoxBinding.prototype.collapse=function(_ae2){
this._getSplitPanelBindingForSplitter(_ae2).collapse();
this.invokeLayout();
};
SplitBoxBinding.prototype.unCollapse=function(_ae3){
this._getSplitPanelBindingForSplitter(_ae3).unCollapse();
this.invokeLayout();
};
SplitBoxBinding.prototype._getSplitPanelBindingForSplitter=function(_ae4){
var _ae5=DOMUtil.getOrdinalPosition(_ae4.bindingElement,true);
var _ae6,_ae7=this.getSplitPanelElements();
switch(_ae4.getCollapseDirection()){
case SplitterBinding.COLLAPSE_BEFORE:
_ae6=_ae7.get(_ae5);
break;
case SplitterBinding.COLLAPSE_AFTER:
_ae6=_ae7.get(_ae5+1);
break;
}
return UserInterface.getBinding(_ae6);
};
SplitBoxBinding.prototype.invokeLayout=function(_ae8){
var _ae9=this.isHorizontalOrient();
var _aea=this.getSplitPanelBindings();
var _aeb=this.getSplitterBindings();
var _aec=new List();
var _aed,sum=0;
var _aef=0;
_aea.each(function(_af0){
if(_af0.isFixed==true){
if(!_aea.hasNext()){
_aef+=_af0.getFix();
}
_aec.add(0);
sum+=0;
}else{
_aed=_af0.getRatio();
_aec.add(_aed);
sum+=_aed;
}
});
if(sum==0){
this.logger.warn("Division by zero was hacked");
sum=1;
}
if(_aec.getLength()!=_aea.getLength()){
throw new Error(this+" Invalid property (ratio)");
}else{
var _af1=_ae9?this.getWidth():this.getHeight();
_af1-=_aef;
_aeb.each(function(_af2){
if(_af2.isVisible){
_af1-=SplitterBinding.DIMENSION;
}
});
var unit=_af1/sum;
var _af4=0;
var self=this;
_aea.each(function(_af6){
var span=0;
var _af8=_aec.getNext();
if(_af6.isFixed){
span=_af6.getFix();
}else{
span=Math.round(unit*_af8);
if(isNaN(span)){
alert("isNaN ( span ) ["+this.getProperty("layout")+"]");
}
}
_af4+=span;
while(_af4>_af1){
_af4--;
span--;
}
if(!_af6.isFixed){
if(_ae9){
_af6.setWidth(span);
}else{
_af6.setHeight(span);
}
}
});
}
if(_ae8!=true){
this.reflex();
}
if(this._persist&&this._persist.layout){
var _af9=this.getLayout();
if(_af9){
this.setProperty("layout",_af9);
}
}
};
SplitBoxBinding.prototype.computeLayout=function(){
var _afa=this.isHorizontalOrient();
var _afb=this.getSplitPanelBindings();
var _afc=this.getSplitterBindings();
var _afd=null;
var _afe=null;
var unit=null;
var _b00=null;
var span=null;
_afb.each(function(_b02){
if(!unit){
unit=_afa?_b02.getWidth():_b02.getHeight();
}
span=_afa?_b02.getWidth():_b02.getHeight();
if(_b00){
span-=_b00;
_b00=null;
}
_afd=_afc.getNext();
if(_afd&&_afd.offset){
_b00=_afd.offset;
span+=_b00;
}
_b02.setRatio(span/unit);
});
};
SplitBoxBinding.prototype.refreshLayout=function(){
this.computeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.setLayout=function(_b03){
this.logger.debug(_b03);
this.setProperty("layout",_b03);
this._initializeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.getLayout=function(){
if(!this.isLayoutInitialized){
if(!this.getProperty("layout")){
this.setProperty("layout",this.getDefaultLayout());
}
}else{
var _b04="",_b05=this.getSplitPanelBindings();
_b05.each(function(_b06){
_b04+=_b06.getRatio().toString();
_b04+=_b05.hasNext()?":":"";
});
this.setProperty("layout",_b04);
}
return new String(this.getProperty("layout"));
};
SplitBoxBinding.prototype.getDefaultLayout=function(){
var _b07=this.getSplitPanelElements();
_b07.each(function(_b08){
layout+="1"+(_b07.hasNext()?":":"");
});
this.setProperty("layout",layout);
};
SplitBoxBinding.prototype.setWidth=function(_b09){
this.bindingElement.style.width=_b09+"px";
};
SplitBoxBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
SplitBoxBinding.prototype.setHeight=function(_b0a){
this.bindingElement.style.height=_b0a+"px";
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
SplitBoxBinding.prototype.fit=function(_b0b){
if(!this.isFit||_b0b){
if(this.isHorizontalOrient()){
var max=0;
var _b0d=this.getSplitPanelBindings();
_b0d.each(function(_b0e){
var _b0f=_b0e.bindingElement.offsetHeight;
max=_b0f>max?_b0f:max;
});
this._setFitnessHeight(max);
}else{
throw "SplitBoxBinding enforceFitness not supported vertically!";
}
this.isFit=true;
}
};
SplitBoxBinding.newInstance=function(_b10){
var _b11=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitbox",_b10);
return UserInterface.registerBinding(_b11,SplitBoxBinding);
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
var _b14=this.getProperty("hidden");
if(_b14){
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
var _b15=this.getProperty("ratiocache");
if(_b15){
this.setRatio(_b15);
this.deleteProperty("ratiocache");
}else{
this._containingSplitBoxBinding.computeLayout();
}
this.bindingElement.style.display="block";
this.deleteProperty("hidden");
this.isVisible=true;
}
};
SplitPanelBinding.prototype.setWidth=function(_b16){
if(!this.isFixed){
if(_b16!=this.getWidth()){
if(_b16<0){
_b16=this.getWidth();
this.logger.warn("SplitPanelBinding#setWidth bug in Internet Explorer!");
}
try{
this.bindingElement.style.width=_b16+"px";
}
catch(exception){
alert("SplitPanelBinding#setWidth: Occult width: "+_b16);
alert(arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getWidth=function(){
var _b17=null;
if(this.isFixed){
_b17=this.getFix();
}else{
_b17=this.bindingElement.offsetWidth;
}
return _b17;
};
SplitPanelBinding.prototype.setHeight=function(_b18){
if(!this.isFixed){
if(_b18!=this.getHeight()){
try{
this.bindingElement.style.height=_b18+"px";
}
catch(exception){
alert("SplitPanelBinding.prototype.setHeight"+arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getHeight=function(){
var _b19=null;
if(this.isFixed){
_b19=this.getFix();
}else{
_b19=this.bindingElement.offsetHeight;
}
return _b19;
};
SplitPanelBinding.prototype.setRatio=function(_b1a){
this.setProperty("ratio",_b1a);
};
SplitPanelBinding.prototype.getRatio=function(){
return this.getProperty("ratio");
};
SplitPanelBinding.prototype.setFix=function(_b1b){
if(_b1b){
this._fixedSpan=_b1b;
switch(this._containingSplitBoxBinding.getOrient()){
case SplitBoxBinding.ORIENT_HORIZONTAL:
this.logger.warn("Fix not properly supported on horizontal splitboxes!");
this.setWidth(_b1b);
break;
case SplitBoxBinding.ORIENT_VERTICAL:
this.setHeight(_b1b);
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
SplitPanelBinding.newInstance=function(_b1c){
var _b1d=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitpanel",_b1c);
return UserInterface.registerBinding(_b1d,SplitPanelBinding);
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
var _b1e=SplitBoxBinding.superclass.serialize.call(this);
if(_b1e){
_b1e.collapse=this.getProperty("collapse");
_b1e.collapsed=this.getProperty("collapsed");
_b1e.disabled=this.getProperty("isdisabled");
}
return _b1e;
};
SplitterBinding.prototype.onBindingAttach=function(){
SplitterBinding.superclass.onBindingAttach.call(this);
this.addActionListener(Binding.ACTION_DRAG);
this._containingSplitBoxBinding=this.getAncestorBindingByLocalName("splitbox");
this.attachClassName(this._containingSplitBoxBinding.getOrient());
this._collapseDirection=this.getProperty("collapse");
this.buildDOMContent();
this.attachDOMEvents();
var _b1f=this.getProperty("hidden");
if(_b1f){
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
SplitterBinding.prototype.setCollapseDirection=function(_b21){
this.setProperty("collapse",_b21);
this._collapseDirection=_b21;
};
SplitterBinding.prototype.handleAction=function(_b22){
SplitterBinding.superclass.handleAction.call(this,_b22);
switch(_b22.type){
case Binding.ACTION_DRAG:
this.dragger.registerHandler(this);
_b22.consume();
break;
}
};
SplitterBinding.prototype.handleEvent=function(e){
SplitterBinding.superclass.handleEvent.call(this,e);
var _b24=this;
if(!this.isDragging&&!this.isDisabled){
switch(e.type){
case DOMEvents.MOUSEOVER:
window.splitterTimeout=window.setTimeout(function(){
_b24.shadowTree.splitterBody.className=SplitterBinding.CLASSNAME_HOVER;
},250);
break;
case DOMEvents.MOUSEOUT:
if(window.splitterTimeout){
window.clearTimeout(window.splitterTimeout);
}
if(_b24.shadowTree.splitterBody.className==SplitterBinding.CLASSNAME_HOVER){
this.shadowTree.splitterBody.className="";
}
break;
}
}
};
SplitterBinding.prototype.onDragStart=function(_b25){
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
SplitterBinding.newInstance=function(_b30){
var _b31=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitter",_b30);
return UserInterface.registerBinding(_b31,SplitterBinding);
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
var _b32=this.getProperty("selectedindex");
var _b33=this.getDeckElements();
if(_b33.hasEntries()){
var _b34=false;
var _b35=0;
while(_b33.hasNext()){
var deck=_b33.getNext();
if(_b32&&_b35==_b32){
deck.setAttribute("selected","true");
_b34=true;
}else{
if(deck.getAttribute("selected")=="true"){
_b34=true;
}
}
_b35++;
}
if(!_b34){
_b33.getFirst().setAttribute("selected","true");
}
}
};
DecksBinding.prototype.getDeckElements=function(){
return this.getChildElementsByLocalName(this.constructor.NODENAME_DECK);
};
DecksBinding.prototype.select=function(arg){
var _b38=this.getBindingForArgument(arg);
if(_b38!=null){
if(_b38!=this._selectedDeckBinding){
if(this._selectedDeckBinding){
this._selectedDeckBinding.unselect();
}
_b38.select();
this._selectedDeckBinding=_b38;
var _b39=this.getProperty("selectedindex");
if(_b39!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_b38.bindingElement,true));
}
this.dispatchAction(DecksBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
}else{
throw "No deck for argument "+arg;
}
};
DecksBinding.prototype.hasDimensionsChanged=function(){
var _b3a=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(!Dimension.isEqual(dim1,dim2)){
_b3a=true;
this._lastKnownDimension=dim1;
}
return _b3a;
};
DecksBinding.prototype.getSelectedDeckBinding=function(){
return this._selectedDeckBinding;
};
DecksBinding.newInstance=function(_b3d){
var _b3e=DOMUtil.createElementNS(Constants.NS_UI,"ui:decks",_b3d);
return UserInterface.registerBinding(_b3e,DecksBinding);
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
DeckBinding.prototype.handleAction=function(_b3f){
DeckBinding.superclass.handleAction.call(this,_b3f);
var _b40=_b3f.target;
switch(_b3f.type){
case BalloonBinding.ACTION_INITIALIZE:
_b3f.consume();
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
DeckBinding.newInstance=function(_b42){
var _b43=DOMUtil.createElementNS(Constants.NS_UI,"ui:deck",_b42);
return UserInterface.registerBinding(_b43,DeckBinding);
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
ToolBarBinding.prototype.onMemberInitialize=function(_b44){
if(_b44 instanceof ToolBarBodyBinding){
if(_b44.isRightAligned){
if(!this._toolBarBodyRight){
this._toolBarBodyRight=_b44;
}
}else{
if(!this._toolBarBodyLeft){
this._toolBarBodyLeft=_b44;
}
}
}
ToolBarBinding.superclass.onMemberInitialize.call(this,_b44);
};
ToolBarBinding.prototype.parseDOMProperties=function(){
var _b45=this.getProperty("imagesize");
var type=this.getProperty("type");
if(_b45){
this.setImageSize(_b45);
}
if(type){
this.setType(type);
}else{
this.setType(this.type);
}
};
ToolBarBinding.prototype.buildDOMContent=function(){
if(this._hasDefaultContent==true&&!this._hasDOMContent){
var _b47=ToolBarGroupBinding.newInstance(this.bindingDocument);
_b47.add(ToolBarButtonBinding.newInstance(this.bindingDocument));
_b47.isDefaultContent=true;
this.add(_b47);
_b47.attachRecursive();
this._hasDOMContent=true;
}
};
ToolBarBinding.prototype.flex=function(){
var left=this._toolBarBodyLeft;
var _b49=this._toolBarBodyRight;
if(left!=null&&left.hasClassName("max")){
this._maxToolBarGroup(left,_b49);
}
if(_b49!=null&&_b49.hasClassName("max")){
this._maxToolBarGroup(_b49,left);
}
};
ToolBarBinding.prototype._maxToolBarGroup=function(max,_b4b){
var _b4c=this.boxObject.getDimension().w;
var _b4d=CSSComputer.getPadding(this.bindingElement);
_b4c-=(_b4d.left+_b4d.right);
if(_b4b!=null){
_b4c-=_b4b.boxObject.getDimension().w;
if(!Client.isWindows){
_b4c-=1;
}
if(Client.isExplorer){
_b4c-=15;
}
}
max.bindingElement.style.width=_b4c+"px";
};
ToolBarBinding.prototype.getToolBarGroupByIndex=function(_b4e){
return this.getDescendantBindingsByLocalName("toolbargroup").get(_b4e);
};
ToolBarBinding.prototype.addLeft=function(_b4f,_b50){
var _b51=null;
if(this._toolBarBodyLeft!=null){
_b51=this._toolBarBodyLeft.add(_b4f,_b50);
}else{
throw new Error("No left toolbarbody");
}
return _b51;
};
ToolBarBinding.prototype.addLeftFirst=function(_b52,_b53){
var _b54=null;
if(this._toolBarBodyLeft){
_b54=this._toolBarBodyLeft.addFirst(_b52,_b53);
}else{
throw new Error("No left toolbarbody");
}
return _b54;
};
ToolBarBinding.prototype.addRight=function(_b55){
var _b56=null;
if(this._toolBarBodyRight){
_b56=this._toolBarBodyRight.add(_b55);
}else{
throw new Error("No left toolbarbody");
}
return _b56;
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
ToolBarBinding.newInstance=function(_b59){
var _b5a=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_b59);
return UserInterface.registerBinding(_b5a,ToolBarBinding);
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
var _b5b=this.getDescendantBindingsByLocalName("toolbargroup");
var _b5c=new List();
var _b5d=true;
_b5b.each(function(_b5e){
if(_b5e.isVisible&&!_b5e.isDefaultContent){
_b5c.add(_b5e);
}
});
while(_b5c.hasNext()){
var _b5f=_b5c.getNext();
_b5f.setLayout(ToolBarGroupBinding.LAYOUT_DEFAULT);
if(_b5d){
_b5f.setLayout(ToolBarGroupBinding.LAYOUT_FIRST);
_b5d=false;
}
if(!_b5c.hasNext()){
_b5f.setLayout(ToolBarGroupBinding.LAYOUT_LAST);
}
}
if(this.getProperty("equalsize")){
this.enforceEqualSize();
}
};
ToolBarBodyBinding.prototype.enforceEqualSize=function(){
var max=0,list=this.getDescendantBindingsByLocalName("clickbutton");
while(list.hasNext()){
var _b62=list.getNext();
var _b63=_b62.getEqualSizeWidth();
if(_b63>max){
max=_b63;
}
}
if(max!=0){
list.reset();
while(list.hasNext()){
var _b62=list.getNext();
_b62.setEqualSizeWidth(max);
}
}
};
ToolBarBodyBinding.prototype.empty=function(){
this.detachRecursive();
this.bindingElement.innerHTML="";
};
ToolBarBodyBinding.prototype.add=function(_b64,_b65){
var _b66=ToolBarBinding.superclass.add.call(this,_b64);
if(!_b65){
if(_b64 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _b66;
};
ToolBarBodyBinding.prototype.addFirst=function(_b67,_b68){
var _b69=ToolBarBinding.superclass.addFirst.call(this,_b67);
if(!_b68){
if(_b67 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _b69;
};
ToolBarBodyBinding.newInstance=function(_b6a){
var _b6b=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbody",_b6a);
return UserInterface.registerBinding(_b6b,ToolBarBodyBinding);
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
ToolBarGroupBinding.prototype.setLayout=function(_b6c){
switch(_b6c){
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
var _b6d=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_b6d)=="toolbarbody"){
UserInterface.getBinding(_b6d).refreshToolBarGroups();
}
};
ToolBarGroupBinding.prototype.hide=function(){
ToolBarGroupBinding.superclass.hide.call(this);
var _b6e=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_b6e)=="toolbarbody"){
UserInterface.getBinding(_b6e).refreshToolBarGroups();
}
};
ToolBarGroupBinding.newInstance=function(_b6f){
var _b70=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbargroup",_b6f);
return UserInterface.registerBinding(_b70,ToolBarGroupBinding);
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
ToolBarButtonBinding.newInstance=function(_b71){
var _b72=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_b71);
return UserInterface.registerBinding(_b72,ToolBarButtonBinding);
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
var _b73=this.getProperty("label");
var _b74=this.getProperty("image");
if(_b73){
this.setLabel(_b73);
}
if(_b74){
this.setImage(_b74);
}
};
ToolBarLabelBinding.prototype.setLabel=function(_b75,_b76){
if(this.isAttached){
this._labelBinding.setLabel(_b75,_b76);
}
this.setProperty("label",_b75);
};
ToolBarLabelBinding.prototype.setImage=function(_b77,_b78){
if(this.isAttached){
this._labelBinding.setImage(_b77,_b78);
}
this.setProperty("image",_b77);
};
ToolBarLabelBinding.newInstance=function(_b79){
var _b7a=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarlabel",_b79);
return UserInterface.registerBinding(_b7a,ToolBarLabelBinding);
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
var _b7b=this.getDescendantBindingsByLocalName("clickbutton");
if(_b7b.hasEntries()){
while(_b7b.hasNext()){
var _b7c=_b7b.getNext();
if(_b7c.isDefault){
this._defaultButton=_b7c;
_b7c.attachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
if(!this._isListening&&_b7c.isFocusable){
this.subscribe(BroadcastMessages.KEY_ENTER);
this._isListening=true;
}
}
this._buttons=_b7b;
}
};
DialogToolBarBinding.prototype.handleBroadcast=function(_b7d,arg){
DialogToolBarBinding.superclass.handleBroadcast.call(this,_b7d,arg);
switch(_b7d){
case BroadcastMessages.KEY_ENTER:
if(!PopupBinding.hasActiveInstances()&&!EditorBinding.isActive){
if(Binding.exists(this)){
var _b7f=this.getAncestorBindingByType(DialogBinding,true);
if(_b7f!=null&&_b7f.isActive){
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
DialogToolBarBinding.prototype.handleAction=function(_b80){
DialogToolBarBinding.superclass.handleAction.call(this,_b80);
var _b81=_b80.target;
var _b82=false;
var _b83=this._buttons.reset();
if(_b81 instanceof ClickButtonBinding){
switch(_b80.type){
case Binding.ACTION_FOCUSED:
_b81.attachClassName(ButtonBinding.CLASSNAME_FOCUSED);
this._focusedButton=_b81;
if(this._defaultButton){
this._defaultButton.detachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
break;
case Binding.ACTION_BLURRED:
_b81.detachClassName(ButtonBinding.CLASSNAME_FOCUSED);
break;
}
}
if(this._defaultButton){
while(!_b82&&_b83.hasNext()){
var _b84=_b83.getNext();
_b82=_b84.isFocused;
}
if(!_b82){
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
var _b85=this._views;
for(var _b86 in ViewDefinitions){
var def=ViewDefinitions[_b86];
var key=def.perspective;
if(key!=null){
if(!_b85.has(key)){
_b85.set(key,new List());
}
var list=_b85.get(key);
list.add(def);
}
}
}else{
this.hide();
}
};
ToolBoxToolBarButtonBinding.prototype.handleBroadcast=function(_b8a,arg){
ToolBoxToolBarButtonBinding.superclass.handleBroadcast.call(this,_b8a,arg);
switch(_b8a){
case BroadcastMessages.PERSPECTIVE_CHANGED:
var tag=arg;
if(this._views.has(tag)){
if(tag!=this._lastGeneratedPerspective){
this._lastGeneratedPerspective=tag;
var list=this._views.get(tag);
var _b8e=this.bindingWindow.bindingMap.toolboxpopup;
_b8e.empty();
list.each(function(def){
var item=_b8e.add(StageViewMenuItemBinding.newInstance(_b8e.bindingDocument));
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
TreeBinding.grid=function(_b91){
var _b92=TreeNodeBinding.HEIGHT;
var ceil=Math.ceil(_b91);
var _b94=_b91%_b92;
if(_b94>0){
_b91=_b91-_b94+_b92;
}
return _b91+TreeBodyBinding.PADDING_TOP;
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
var _b95=this.getProperty("focusable");
if(_b95!=null){
this._isFocusable=_b95;
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
var _b97=this.getProperty("builder");
if(_b97){
this._buildFromTextArea(_b97);
}else{
if(this._treeNodeBuffer.hasEntries()){
while(this._treeNodeBuffer.hasNext()){
this.add(this._treeNodeBuffer.getNext());
}
}
}
};
TreeBinding.prototype._setupTreeSelection=function(){
var _b98=this.getProperty("selectable");
var _b99=this.getProperty("selectionproperty");
var _b9a=this.getProperty("selectionvalue");
if(_b98){
this.setSelectable(true);
if(_b99){
this.setSelectionProperty(_b99);
}
if(_b9a){
this.setSelectionValue(_b9a);
}
}
this._positionIndicatorBinding=this.add(TreePositionIndicatorBinding.newInstance(this.bindingDocument));
this.shadowTree.positionIndicator=this._positionIndicatorBinding;
this._positionIndicatorBinding.attach();
};
TreeBinding.prototype._buildFromTextArea=function(id){
var area=this.bindingDocument.getElementById(id);
if(area!=null){
var _b9d=UserInterface.getBinding(area);
var _b9e=this._treeBodyBinding;
function build(){
_b9e.subTreeFromString(area.value);
}
_b9d.addActionListener(Binding.ACTION_UPDATED,{handleAction:function(){
build();
}});
setTimeout(build,0);
}
};
TreeBinding.prototype.registerTreeNodeBinding=function(_b9f){
var _ba0=_b9f.getHandle();
if(this._treeNodeBindings.has(_ba0)){
throw "Duplicate treenodehandles registered: "+_b9f.getLabel();
}else{
this._treeNodeBindings.set(_ba0,_b9f);
var map=this._openTreeNodesBackupMap;
if(map!=null&&map.has(_ba0)){
_b9f.open();
}
}
};
TreeBinding.prototype.unRegisterTreeNodeBinding=function(_ba2){
this._treeNodeBindings.del(_ba2.getHandle());
};
TreeBinding.prototype.getTreeNodeBindingByHandle=function(_ba3){
var _ba4=null;
if(this._treeNodeBindings.has(_ba3)){
_ba4=this._treeNodeBindings.get(_ba3);
}else{
throw "No such treenode: "+_ba3;
}
return _ba4;
};
TreeBinding.prototype.handleAction=function(_ba5){
TreeBinding.superclass.handleAction.call(this,_ba5);
var _ba6=_ba5.target;
switch(_ba5.type){
case TreeNodeBinding.ACTION_OPEN:
_ba5.consume();
break;
case TreeNodeBinding.ACTION_CLOSE:
this._blurDescendantBindings(_ba6);
_ba5.consume();
break;
case TreeNodeBinding.ACTION_ONFOCUS:
this._nodePrimary=_ba6;
this.focusSingleTreeNodeBinding(_ba6);
if(!this.isFocused){
this.focus();
}
_ba5.consume();
break;
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
switch(this._selectionType){
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodePrimary=_ba6;
this.focusSingleTreeNodeBinding(_ba6);
break;
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodeSecondary=_ba6;
if(!this._nodePrimary||this._nodeSecondary==this._nodePrimary){
this._nodePrimary=_ba6;
this.focusSingleTreeNodeBinding(_ba6);
}else{
this.focusMultipeTreeNodeBindings(this._getVisibleTreeNodeBindingsInRange(this._nodePrimary,this._nodeSecondary));
}
break;
}
if(!this.isFocused){
this.focus();
}
_ba5.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
if(_ba6.isFocused){
this.blurSelectedTreeNodes();
}
_ba5.consume();
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
TreeBinding.prototype._getVisibleTreeNodeBindingsInRange=function(_ba7,_ba8){
alert("TreeBinding#_getVisibleTreeNodeBindingsInRange");
};
TreeBinding.prototype.focusSingleTreeNodeBinding=function(_ba9){
if(_ba9!=null&&!_ba9.isFocused){
this.blurSelectedTreeNodes();
this._focusedTreeNodeBindings.add(_ba9);
_ba9.invokeManagedFocus();
if(this._isSelectable){
this._manageSelections();
}
}
};
TreeBinding.prototype.focusMultipeTreeNodeBindings=function(_baa){
this.blurSelectedTreeNodes();
while(_baa.hasNext()){
var _bab=_baa.getNext();
this._focusedTreeNodeBindings.add(_bab);
_bab.invokeManagedFocus();
}
if(this._isSelectable){
this._manageSelections();
}
};
TreeBinding.prototype._manageSelections=function(){
var _bac=this._selectedTreeNodeBindings;
this._selectedTreeNodeBindings={};
var _bad=false;
var _bae=null;
this._focusedTreeNodeBindings.reset();
while(this._focusedTreeNodeBindings.hasNext()){
var _baf=this._focusedTreeNodeBindings.getNext();
var _bb0=_baf.getProperty(this._selectionProperty);
if(_bb0!=null){
if(!this._selectionValue||this._selectionValue[_bb0]){
_bae=(this._selectedTreeNodeBindings[_baf.key]=_baf);
var _bb1=_bac[_baf.key];
if(!_bb1||_bb1!=_bae){
_bad=true;
}
}
}
}
if(_bae){
if(_bad){
this.dispatchAction(TreeBinding.ACTION_SELECTIONCHANGED);
}
}else{
if(_bac){
for(var key in _bac){
this.dispatchAction(TreeBinding.ACTION_NOSELECTION);
break;
}
}
}
};
TreeBinding.prototype.getSelectedTreeNodeBindings=function(){
var _bb3=new List();
for(var key in this._selectedTreeNodeBindings){
_bb3.add(this._selectedTreeNodeBindings[key]);
}
return _bb3;
};
TreeBinding.prototype.blurSelectedTreeNodes=function(){
this._focusedTreeNodeBindings.reset().each(function(_bb5){
_bb5.blur();
});
this._focusedTreeNodeBindings.clear();
};
TreeBinding.prototype._blurDescendantBindings=function(_bb6){
var _bb7=_bb6.getDescendantBindingsByLocalName("treenode");
var _bb8=true;
var self=this;
_bb7.each(function(desc){
if(desc.isFocused){
desc.blur();
self._focusedTreeNodeBindings.del(self._focusedTreeNodeBindings.getIndex(desc));
}
return _bb8;
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
var _bbb=this._treeBodyBinding.getChildBindingByLocalName("treenode");
if(_bbb!=null){
this.focusSingleTreeNodeBinding(_bbb);
_bbb.callback();
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
TreeBinding.prototype.add=function(_bbc){
var _bbd=null;
if(this._treeBodyBinding){
_bbd=this._treeBodyBinding.add(_bbc);
}else{
this._treeNodeBuffer.add(_bbc);
_bbd=_bbc;
}
return _bbd;
};
TreeBinding.prototype.addFirst=function(_bbe){
throw new Error("Not implemented");
};
TreeBinding.prototype.empty=function(){
this._treeBodyBinding.detachRecursive();
var _bbf=this._treeBodyBinding.bindingElement;
_bbf.innerHTML="";
};
TreeBinding.prototype.isEmpty=function(){
return this._treeNodeBindings.hasEntries()==false;
};
TreeBinding.prototype.collapse=function(){
this.blurSelectedTreeNodes();
this._treeNodeBindings.each(function(_bc0,_bc1){
if(_bc1.isContainer&&_bc1.isOpen){
_bc1.close();
}
});
};
TreeBinding.prototype.setSelectable=function(_bc2){
this._isSelectable=_bc2;
if(_bc2){
this._selectedTreeNodeBindings={};
}else{
this._selectedTreeNodeBindings=null;
this._selectionProperty=null;
this._selectionValue=null;
}
};
TreeBinding.prototype.setSelectionProperty=function(_bc3){
this._selectionProperty=_bc3;
};
TreeBinding.prototype.setSelectionValue=function(_bc4){
if(_bc4){
var list=new List(_bc4.split(" "));
this._selectionValue={};
while(list.hasNext()){
this._selectionValue[list.getNext()]=true;
}
}
};
TreeBinding.prototype.handleBroadcast=function(_bc6,arg){
TreeBinding.superclass.handleBroadcast.call(this,_bc6,arg);
switch(_bc6){
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
var _bc8=this.getFocusedTreeNodeBindings();
if(_bc8.hasEntries()){
var node=_bc8.getFirst();
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
var _bcb=this.getFocusedTreeNodeBindings();
if(_bcb.hasEntries()){
var node=_bcb.getFirst();
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
var _bce=null;
while(next==null&&(_bce=node.getAncestorBindingByLocalName("treenode"))!=null){
if(_bce!=null){
next=_bce.getNextBindingByLocalName("treenode");
}
node=_bce;
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
var _bd0=DOMEvents.getTarget(e);
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
var _bd1=new TreeCrawler();
var list=new List();
_bd1.mode=TreeCrawler.MODE_GETOPEN;
_bd1.crawl(this.bindingElement,list);
var map=new Map();
if(list.hasEntries()){
while(list.hasNext()){
var _bd4=list.getNext();
map.set(_bd4.getHandle(),true);
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
var _bd9=this._positionIndicatorBinding;
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
if(y!=_bd9.getPosition().y){
_bd9.setPosition(new Point(this._acceptingPosition.x+TreeNodeBinding.INDENT,y));
}
if(!_bd9.isVisible){
_bd9.show();
}
}else{
if(_bd9.isVisible){
_bd9.hide();
}
}
}else{
if(_bd9.isVisible){
_bd9.hide();
}
}
};
TreeBinding.prototype.enablePositionIndicator=function(_bdc){
this._acceptingTreeNodeBinding=_bdc;
this._acceptingPosition=_bdc.boxObject.getLocalPosition();
this._acceptingDimension=_bdc.boxObject.getDimension();
this._acceptingPositions=this._getChildPositions(_bdc);
};
TreeBinding.prototype.disablePositionIndicator=function(){
this._acceptingTreeNodeBinding=null;
this._acceptingPosition=null;
this._acceptingDimension=null;
};
TreeBinding.prototype._getChildPositions=function(_bdd){
var map={};
var _bdf=_bdd.getChildBindingsByLocalName("treenode");
var _be0,pos,dim,y;
y=TreeBinding.grid(_bdd.boxObject.getLocalPosition().y);
map[y]=true;
while(_bdf.hasNext()){
_be0=_bdf.getNext();
pos=_be0.boxObject.getLocalPosition();
dim=_be0.boxObject.getDimension();
y=TreeBinding.grid(pos.y+dim.h)-TreeNodeBinding.HEIGHT;
map[y]=true;
}
return map;
};
TreeBinding.prototype.getDropIndex=function(){
var y=this._positionIndicatorBinding.getPosition().y;
var drop=0;
for(var _be6 in this._acceptingPositions){
if(_be6==y){
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
TreeBinding.newInstance=function(_be7){
var _be8=DOMUtil.createElementNS(Constants.NS_UI,"ui:tree",_be7);
var _be9=UserInterface.registerBinding(_be8,TreeBinding);
_be9.treeBodyBinding=TreeBodyBinding.newInstance(_be7);
return _be9;
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
TreeBodyBinding.prototype.accept=function(_bea){
if(_bea instanceof TreeNodeBinding){
this.logger.debug(_bea);
}
};
TreeBodyBinding.prototype.handleAction=function(_beb){
TreeBodyBinding.superclass.handleAction.call(this,_beb);
switch(_beb.type){
case TreeNodeBinding.ACTION_FOCUSED:
this._scrollIntoView(_beb.target);
_beb.consume();
break;
}
};
TreeBodyBinding.prototype._scrollIntoView=function(_bec){
var a=this.boxObject.getDimension().h;
var y=_bec.boxObject.getLocalPosition().y;
var h=_bec.boxObject.getDimension().h;
var t=this.bindingElement.scrollTop;
var l=this.bindingElement.scrollLeft;
var _bf2=_bec.labelBinding.bindingElement;
if(y-t<0){
_bf2.scrollIntoView(true);
}else{
if(y-t+h>a){
_bf2.scrollIntoView(false);
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
TreeBodyBinding.newInstance=function(_bf3){
var _bf4=DOMUtil.createElementNS(Constants.NS_UI,"ui:treebody",_bf3);
return UserInterface.registerBinding(_bf4,TreeBodyBinding);
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
var _bf5=TreeNodeBinding.superclass.serialize.call(this);
if(_bf5){
_bf5.label=this.getLabel();
_bf5.image=this.getImage();
var _bf6=this.getHandle();
if(_bf6&&_bf6!=this.key){
_bf5.handle=_bf6;
}
if(this.isOpen){
_bf5.open=true;
}
if(this.isDisabled){
_bf5.disabled=true;
}
if(this.dragType){
_bf5.dragtype=this.dragType;
}
if(this.dragAccept){
_bf5.dragaccept=this.dragAccept;
}
}
return _bf5;
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
var _bf8=UserInterface.getBinding(node);
if(_bf8&&_bf8.containingTreeBinding){
this.containingTreeBinding=_bf8.containingTreeBinding;
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
var _bf9=this.key;
var _bfa=this.getProperty("handle");
if(_bfa){
_bf9=_bfa;
}
return _bf9;
};
TreeNodeBinding.prototype.setHandle=function(_bfb){
this.setProperty("handle",_bfb);
};
TreeNodeBinding.prototype.buildDOMContent=function(){
var url=this.getProperty("url");
var _bfd=this.getProperty("label");
var _bfe=this.getProperty("tooltip");
var _bff=this.getProperty("oncommand");
var _c00=this.getProperty("onbindingfocus");
var _c01=this.getProperty("onbindingblur");
var _c02=this.getProperty("focused");
var _c03=this.getProperty("callbackid");
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
if(_bfd!=null){
this.setLabel(_bfd);
}
if(_bfe!=null){
this.setToolTip(_bfe);
}
if(!this.imageProfile){
this._computeImageProfile();
}
this.setImage(this.computeImage());
if(this.isContainer){
this.updateClassNames();
}
var _c05=this.bindingWindow.WindowManager;
if(_bff!=null){
this.oncommand=function(){
Binding.evaluate(_bff,this);
};
}
if(_c00!=null){
this.onfocus=function(){
Binding.evaluate(_c00,this);
};
}
if(_c01!=null){
this.onblur=function(){
Binding.evaluate(_c01,this);
};
}
if(_c02==true){
this.focus();
}
if(_c03!=null){
Binding.dotnetify(this,_c03);
}
};
TreeNodeBinding.prototype.handleAction=function(_c06){
TreeNodeBinding.superclass.handleAction.call(this,_c06);
switch(_c06.type){
case TreeNodeBinding.ACTION_FOCUSED:
if(_c06.target!=this){
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
TreeNodeBinding.prototype.accept=function(_c07,_c08){
var _c09=true;
if(_c07 instanceof TreeNodeBinding){
var _c0a=false;
var _c0b=this.bindingElement;
var _c0c=this.containingTreeBinding.bindingElement;
while(!_c0a&&_c0b!=_c0c){
if(_c0b==_c07.getBindingElement()){
_c0a=true;
}else{
_c0b=_c0b.parentNode;
}
}
if(_c0a){
Dialog.error("Not Allowed","You cannot move a folder into itself.");
_c09=false;
}else{
this.acceptTreeNodeBinding(_c07,_c08);
}
}else{
_c09=false;
}
return _c09;
};
TreeNodeBinding.prototype.acceptTreeNodeBinding=function(_c0d,_c0e){
var _c0f=_c0d.serializeToString();
var _c10=new BindingParser(this.bindingDocument);
var _c11=_c10.parseFromString(_c0f).getFirst();
_c0e=_c0e?_c0e:this.containingTreeBinding.getDropIndex();
var _c12=this.getChildElementsByLocalName("treenode");
this.bindingElement.insertBefore(_c11,_c12.get(_c0e));
this.bindingWindow.DocumentManager.attachBindings(this.bindingElement);
_c0d.dispose();
};
TreeNodeBinding.prototype.showAcceptance=function(){
this.containingTreeBinding.enablePositionIndicator(this);
};
TreeNodeBinding.prototype.hideAcceptance=function(){
this.containingTreeBinding.disablePositionIndicator();
};
TreeNodeBinding.prototype._computeImageProfile=function(){
var _c13=this.getProperty("image");
var _c14=this.getProperty("image-active");
var _c15=this.getProperty("image-disabled");
_c14=_c14?_c14:this.isContainer?_c13?_c13:TreeNodeBinding.DEFAULT_FOLDER_OPEN:_c13?_c13:TreeNodeBinding.DEFAULT_ITEM;
_c15=_c15?_c15:this.isContainer?_c13?_c13:TreeNodeBinding.DEFAULT_FOLDER_DISABLED:_c13?_c13:TreeNodeBinding.DEFAULT_ITEM_DISABLED;
_c13=_c13?_c13:this.isContainer?TreeNodeBinding.DEFAULT_FOLDER_CLOSED:TreeNodeBinding.DEFAULT_ITEM;
this.imageProfile=new ImageProfile({image:_c13,imageHover:null,imageActive:_c14,imageDisabled:_c15});
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
TreeNodeBinding.prototype.setLabel=function(_c17){
this.setProperty("label",String(_c17));
if(this.isAttached){
this.labelBinding.setLabel(String(_c17));
}
};
TreeNodeBinding.prototype.setToolTip=function(_c18){
this.setProperty("tooltip",String(_c18));
if(this.isAttached){
this.labelBinding.setToolTip(String(_c18));
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
var _c19=this.imageProfile.getDefaultImage();
var _c1a=this.imageProfile.getActiveImage();
_c1a=_c1a?_c1a:_c19;
return this.isOpen?_c1a:_c19;
};
TreeNodeBinding.prototype.handleEvent=function(e){
TreeNodeBinding.superclass.handleEvent.call(this,e);
var _c1c=DOMEvents.getTarget(e);
var _c1d=this.labelBinding.bindingElement;
var _c1e=this.labelBinding.shadowTree.labelBody;
var _c1f=this.labelBinding.shadowTree.labelText;
switch(e.type){
case DOMEvents.MOUSEDOWN:
switch(_c1c){
case _c1d:
this._onAction(e);
break;
case _c1e:
case _c1f:
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
if(_c1c.parentNode==this.bindingElement&&_c1c.__updateType==Update.TYPE_INSERT){
var _c1d=this.labelBinding.bindingElement;
if(DOMUtil.getLocalName(_c1c)=="treenode"){
if(_c1c==this.bindingElement.firstChild){
this.bindingElement.insertBefore(_c1c,_c1d.nextSibling);
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
switch(_c1c){
case _c1d:
case _c1e:
case _c1f:
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
var _c23=true;
if(e.type=="mousedown"){
var _c24=e.button==(e.target?0:1);
if(!_c24){
_c23=false;
}
}
if(_c23){
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
var _c26=false;
if(e!=null){
_c26=e.shiftKey;
}
this.dispatchAction(_c26?TreeNodeBinding.ACTION_ONMULTIFOCUS:TreeNodeBinding.ACTION_ONFOCUS);
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
var _c29=this.getDescendantBindingsByLocalName("treenode");
_c29.each(function(_c2a){
_c2a.dispose();
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
TreeNodeBinding.prototype.handleElement=function(_c2b){
var _c2c=_c2b.getAttribute("focused");
if(_c2c=="true"){
if(!this.isFocused){
this.focus();
}
}
return false;
};
TreeNodeBinding.newInstance=function(_c2d){
var _c2e=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_c2d);
return UserInterface.registerBinding(_c2e,TreeNodeBinding);
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
TreeContentBinding.newInstance=function(_c2f){
var _c30=DOMUtil.createElementNS(Constants.NS_UI,"ui:treecontent",_c2f);
return UserInterface.registerBinding(_c30,TreeContentBinding);
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
TreePositionIndicatorBinding.prototype.setPosition=function(_c31){
this.bindingElement.style.left=_c31.x+"px";
this.bindingElement.style.top=_c31.y+"px";
this._geometry.x=_c31.x;
this._geometry.y=_c31.y;
};
TreePositionIndicatorBinding.prototype.getPosition=function(){
return new Point(this._geometry.x,this._geometry.y);
};
TreePositionIndicatorBinding.newInstance=function(_c32){
var _c33=DOMUtil.createElementNS(Constants.NS_UI,"ui:treepositionindicator",_c32);
return UserInterface.registerBinding(_c33,TreePositionIndicatorBinding);
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
this.addFilter(function(_c35){
var _c36=UserInterface.getBinding(_c35);
var _c37=null;
var _c37=null;
if(!_c36 instanceof TreeNodeBinding){
_c37=NodeCrawler.SKIP_NODE;
}
return _c37;
});
this.addFilter(function(_c38,list){
var _c3a=UserInterface.getBinding(_c38);
var _c3b=null;
switch(self.mode){
case TreeCrawler.MODE_GETOPEN:
if(_c3a.isOpen){
list.add(_c3a);
}
break;
}
return _c3b;
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
ShadowBinding.prototype.shadow=function(_c3c){
this.targetBinding=_c3c;
_c3c.addActionListener(Binding.ACTION_POSITIONCHANGED,this);
_c3c.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_c3c.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_c3c.bindingElement.parentNode.appendChild(this.bindingElement);
if(_c3c.isVisible){
this.show();
this.setPosition(_c3c.getPosition());
this.setDimension(_c3c.getDimension());
}else{
this.hide();
}
};
ShadowBinding.prototype.handleAction=function(_c3d){
ShadowBinding.superclass.handleAction.call(this,_c3d);
var _c3e=_c3d.target;
if(_c3e==this.targetBinding){
switch(_c3d.type){
case Binding.ACTION_POSITIONCHANGED:
this.setPosition(this.targetBinding.getPosition());
_c3d.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
this.setDimension(this.targetBinding.getDimension());
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(_c3e.isVisible){
this.show();
this.setPosition(_c3e.getPosition());
this.setDimension(_c3e.getDimension());
}else{
this.hide();
}
break;
}
}
};
ShadowBinding.prototype.setPosition=function(_c3f){
var _c40=this.offset-this.expand;
this.bindingElement.style.left=new String(_c3f.x+_c40)+"px";
this.bindingElement.style.top=new String(_c3f.y+_c40)+"px";
};
ShadowBinding.prototype.setDimension=function(dim){
this.bindingElement.style.width=new String(dim.w+2*this.expand)+"px";
this.bindingElement.style.height=new String(dim.h+2*this.expand)+"px";
};
ShadowBinding.newInstance=function(_c42){
var _c43=DOMUtil.createElementNS(Constants.NS_UI,"ui:shadow",_c42);
return UserInterface.registerBinding(_c43,ShadowBinding);
};
DockControlImageProfile.prototype=new ControlImageProfile;
DockControlImageProfile.prototype.constructor=DockControlImageProfile;
DockControlImageProfile.superclass=ControlImageProfile.prototype;
DockControlImageProfile.IMAGE_MINIMIZE=Resolver.resolve("${skin}/docks/control-minimize-${string}.png");
DockControlImageProfile.IMAGE_MAXIMIZE=Resolver.resolve("${skin}/docks/control-maximize-${string}.png");
DockControlImageProfile.IMAGE_RESTORE=Resolver.resolve("${skin}/docks/control-restore-${string}.png");
DockControlImageProfile.IMAGE_CLOSE=null;
function DockControlImageProfile(_c44){
this.binding=_c44;
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
DockTabsButtonBinding.newInstance=function(_c45){
var _c46=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_c45);
_c46.setAttribute("type","checkbox");
_c46.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_c46.className="tabbutton";
return UserInterface.registerBinding(_c46,DockTabsButtonBinding);
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
var _c47=DockBinding.superclass.serialize.call(this);
if(_c47){
_c47.active=this.isActive?true:null;
_c47.collapsed=this.isCollapsed?true:null;
}
return _c47;
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
var _c48=UserInterface.getBinding(this.bindingElement.parentNode);
var _c49=MatrixBinding.newInstance(this.bindingDocument);
_c49.attachClassName("dockliner");
this.shadowTree.dockLiner=_c49;
_c48.add(_c49);
_c49.attach();
_c49.manifest();
var type=this.getProperty("type");
this.type=type?type:DockBinding.TYPE_TOOLS;
this.attachClassName(this.type);
if(this.getProperty("active")==true){
this.activate();
}
};
DockBinding.prototype.interceptDisplayChange=function(_c4b){
var _c4c=this.getSelectedTabPanelBinding();
if(_c4c){
_c4c.isVisible=_c4b;
_c4c.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
}
};
DockBinding.prototype.prepareNewView=function(_c4d){
var _c4e=this._getBindingForDefinition(_c4d);
var _c4f=DockTabBinding.newInstance(this.bindingDocument);
_c4f.setHandle(_c4d.handle);
_c4f.setLabel(this.type==DockBinding.TYPE_EDITORS?null:_c4d.label);
_c4f.setImage(_c4d.image);
_c4f.setToolTip(_c4d.toolTip);
_c4f.setEntityToken(_c4d.entityToken);
_c4f.setAssociatedView(_c4e);
this.appendTabByBindings(_c4f,null);
this._setupPageBindingListeners(_c4f);
var _c50=this.getTabPanelBinding(_c4f);
_c4e.snapToBinding(_c50);
var _c51=this.bindingWindow.bindingMap.views;
_c51.add(_c4e);
if(!this.isActive){
this.activate();
}
_c4e.attach();
};
DockBinding.prototype.prepareOpenView=function(_c52,_c53){
this.logger.debug("DockBinding.prototype.prepareOpenView: _setupDirtyStuff required?");
_c53.setLabel(_c52.label);
_c53.setImage(_c52.image);
_c53.setToolTip(_c52.toolTip);
this._setupPageBindingListeners(_c53);
var _c54=this.getTabPanelBinding(_c53);
var _c55=this._getBindingForDefinition(_c52);
_c53.setAssociatedView(_c55);
_c55.snapToBinding(_c54);
UserInterface.getBinding(this.bindingDocument.body).add(_c55);
_c55.attach();
};
DockBinding.prototype._getBindingForDefinition=function(_c56){
var _c57=this.bindingWindow.bindingMap.views;
var view=ViewBinding.newInstance(_c57.bindingDocument);
view.setDefinition(_c56);
return view;
};
DockBinding.prototype._setupPageBindingListeners=function(_c59){
var _c5a=this.getTabPanelBinding(_c59);
var self=this;
var _c5c={handleAction:function(_c5d){
var _c5e=_c5d.target;
switch(_c5d.type){
case PageBinding.ACTION_ATTACHED:
TabBoxBinding.currentActiveInstance=self;
break;
case PageBinding.ACTION_INITIALIZED:
_c5e.reflex(true);
var view=_c59.getAssociatedView();
if(_c5e.bindingWindow==view.getContentWindow()){
_c59.updateDisplay(_c5e);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_COMPLETED,view.getHandle());
if(StatusBar.state==StatusBar.BUSY){
StatusBar.clear();
}
}
_c59.onPageInitialize(_c5e);
_c5d.consume();
break;
case DockTabBinding.ACTION_UPDATE_VISUAL:
_c59.updateDisplay(_c5e);
_c5d.consume();
break;
case DockTabBinding.ACTION_UPDATE_TOKEN:
_c59.updateEntityToken(_c5e);
_c5d.consume();
break;
case EditorPageBinding.ACTION_DIRTY:
_c59.setDirty(true);
break;
case EditorPageBinding.ACTION_SAVE:
_c59.onSaveStart();
break;
case ViewBinding.ACTION_ONCLOSE:
self.closeTab(_c59);
_c5d.consume();
break;
case ViewBinding.ACTION_ONCLOSE_FORCE:
self.closeTab(_c59,true);
_c5d.consume();
break;
case DockPanelBinding.ACTION_FORCE_SELECT:
self.select(_c59);
break;
case Binding.ACTION_FORCE_REFLEX:
_c5a.reflex(true);
_c5d.consume();
break;
case DockTabBinding.ACTION_FORCE_CLEAN:
case EditorPageBinding.ACTION_CLEAN:
if(_c59.isDirty){
_c59.setDirty(false);
}
break;
case WindowBinding.ACTION_ONLOAD:
alert("HWEJ");
break;
}
}};
new List([DockTabBinding.ACTION_UPDATE_VISUAL,DockTabBinding.ACTION_UPDATE_TOKEN,PageBinding.ACTION_ATTACHED,PageBinding.ACTION_INITIALIZED,EditorPageBinding.ACTION_DIRTY,EditorPageBinding.ACTION_CLEAN,EditorPageBinding.ACTION_SAVE,ViewBinding.ACTION_ONCLOSE,ViewBinding.ACTION_ONCLOSE_FORCE,DockPanelBinding.ACTION_FORCE_SELECT,Binding.ACTION_FORCE_REFLEX,DockTabBinding.ACTION_FORCE_CLEAN,WindowBinding.ACTION_ONLOAD]).each(function(_c60){
_c5a.addActionListener(_c60,_c5c);
});
};
DockBinding.prototype.summonTabPanelBinding=function(){
return DockPanelBinding.newInstance(this.bindingDocument);
};
DockBinding.prototype.handleAction=function(_c61){
DockBinding.superclass.handleAction.call(this,_c61);
var _c62=_c61.target;
switch(_c61.type){
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_c61.consume();
break;
case TabBoxBinding.ACTION_UPDATED:
if(_c62 instanceof DockBinding){
if(_c62.updateType==TabBoxBinding.UPDATE_DETACH){
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
this._viewBindingList.add(_c62);
if(this.isActive){
_c62.onActivate();
}
break;
case ViewBinding.ACTION_CLOSED:
this._viewBindingList.del(_c62);
break;
}
};
DockBinding.prototype.handleBroadcast=function(_c63,arg){
DockBinding.superclass.handleBroadcast.call(this,_c63,arg);
switch(_c63){
case BroadcastMessages.SYSTEMTREENODEBINDING_FOCUS:
var _c65=arg;
if(_c65.perspectiveNode==this.perspectiveNode){
this._selectTabByEntityToken(_c65.node.getEntityToken());
}
break;
}
};
DockBinding.prototype._selectTabByEntityToken=function(_c66){
var tabs=this.getTabBindings();
var _c68=false;
while(tabs.hasNext()&&!_c68){
var tab=tabs.getNext();
var _c6a=tab.getEntityToken();
if(_c6a!=null&&_c6a==_c66){
if(!tab.isSelected){
this.select(tab,true);
_c68=true;
}
}
}
};
DockBinding.prototype.collapse=function(_c6b){
this._handleCollapse(true,_c6b);
};
DockBinding.prototype.unCollapse=function(_c6c){
this._handleCollapse(false,_c6c);
};
DockBinding.prototype._handleCollapse=function(_c6d,_c6e){
var _c6f=this.getChildBindingByLocalName("dockpanels");
var _c70=this.getAncestorBindingByLocalName("splitbox");
if(_c6d){
_c6f.hide();
this.bindingElement.style.height="auto";
this.isFlexible=false;
this.isActivatable=false;
this.setProperty("collapsed",true);
if(_c6e&&_c70.hasBothPanelsVisible()){
this.setWidth(200);
}
}else{
_c6f.show();
this.isFlexible=true;
this.isActivatable=true;
this.deleteProperty("collapsed");
if(_c6e){
this.setWidth(false);
}
}
this.interceptDisplayChange(!_c6d);
this.isCollapsed=_c6d;
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
DockBinding.prototype.closeTab=function(_c75,_c76){
if(_c75.isDirty&&!_c76){
var _c77=Resolver.resolve(_c75.getLabel());
var self=this;
Dialog.question(StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Title"),StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Text").replace("${resourcename}",_c77),Dialog.BUTTONS_YES_NO_CANCEL,{handleDialogResponse:function(_c79){
switch(_c79){
case Dialog.RESPONSE_YES:
setTimeout(function(){
self.saveContainedEditor(_c75);
},0);
break;
case Dialog.RESPONSE_NO:
self.removeTab(_c75);
break;
}
}});
}else{
this.removeTab(_c75);
}
};
DockBinding.prototype.closeTabsExcept=function(_c7a){
var tabs=this.getTabBindings();
while(tabs.hasNext()){
var tab=tabs.getNext();
if(tab!=_c7a){
this.closeTab(tab);
}
}
};
DockBinding.prototype.saveContainedEditor=function(_c7d){
var _c7e=_c7d.getAssociatedView();
_c7e.saveContainedEditor();
var self=this;
var _c80={handleBroadcast:function(_c81,arg){
switch(_c81){
case BroadcastMessages.CURRENT_SAVED:
if(arg.handle==_c7e.getHandle()){
EventBroadcaster.unsubscribe(BroadcastMessages.CURRENT_SAVED,_c80);
if(arg.isSuccess){
self.removeTab(_c7d);
}
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.CURRENT_SAVED,_c80);
};
DockBinding.prototype.appendTabByBindings=function(_c83,_c84){
if(this.isEmpty){
this.isEmpty=false;
this.isActivatable=true;
this.setWidth(false);
this.dispatchAction(DockBinding.ACTION_OPENED);
}
DockBinding.superclass.appendTabByBindings.call(this,_c83,_c84);
};
DockBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
DockBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
DockBinding.prototype.setWidth=function(_c85){
_c85=_c85?_c85+"px":"100%";
this.bindingElement.style.width=_c85;
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
DockBinding.prototype.showControls=function(_c86){
var tabs=this.getChildBindingByLocalName(this._nodename_tabs);
if(_c86){
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
var _c89=DockControlBinding.newInstance(this.bindingDocument);
_c89.setControlType(type);
return _c89;
};
DockTabsBinding.prototype.flex=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _c8b=self.containingTabBoxBinding.getWidth();
if(!isNaN(_c8b)){
_c8b=_c8b>0?_c8b-1:0;
self.bindingElement.style.width=new String(_c8b)+"px";
}
}
setTimeout(fix,250);
fix();
}
DockTabsBinding.superclass.flex.call(this);
};
DockTabsBinding.prototype.handleCrawler=function(_c8c){
DockTabsBinding.superclass.handleCrawler.call(this,_c8c);
switch(_c8c.id){
case FlexBoxCrawler.ID:
this._explorerFlexHack();
break;
}
};
DockTabsBinding.prototype._explorerFlexHack=function(){
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
};
DockTabsBinding.newInstance=function(_c8f){
var _c90=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktabs",_c8f);
return UserInterface.registerBinding(_c90,DockTabsBinding);
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
DockTabBinding.prototype.setAssociatedView=function(_c91){
this._viewBinding=_c91;
};
DockTabBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
DockTabBinding.prototype.serialize=function(){
var _c92=DockTabBinding.superclass.serialize.call(this);
if(_c92){
_c92.label=null;
_c92.image=null;
_c92.handle=this.getHandle();
}
return _c92;
};
DockTabBinding.prototype.setHandle=function(_c93){
this.setProperty("handle",_c93);
};
DockTabBinding.prototype.getHandle=function(){
return this.getProperty("handle");
};
DockTabBinding.prototype.setEntityToken=function(_c94){
if(this._entityToken==null){
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
this._entityToken=_c94;
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
var _c95=DialogControlBinding.newInstance(this.bindingDocument);
_c95.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_c95);
this._controlGroupBinding.attachRecursive();
};
DockTabBinding.prototype.setDirty=function(_c96){
if(this.containingTabBoxBinding.type==DockBinding.TYPE_EDITORS){
if(this.isDirty!=_c96){
this.isDirty=_c96;
if(Binding.exists(this.labelBinding)){
var _c97=this.labelBinding.getLabel();
if(_c97!=null){
this.labelBinding.setLabel(_c96?"*"+_c97:_c97.slice(1,_c97.length));
}else{
this.labelBinding.setLabel(_c96?"*":"");
}
}
}
var _c98=top.app.bindingMap.broadcasterCurrentTabDirty;
if(this.isDirty==true){
this.subscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_DIRTY,this);
_c98.enable();
}else{
this.unsubscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_CLEAN,this);
_c98.disable();
}
}else{
Dialog.warning("Dirty denied","Only editor docks should invoke the dirty state!");
}
};
DockTabBinding.prototype.updateDisplay=function(_c99){
this.setLabel(_c99.getLabel());
this.setImage(_c99.getImage());
this.setToolTip(_c99.getToolTip());
};
DockTabBinding.prototype.updateEntityToken=function(_c9a){
this.setEntityToken(_c9a.getEntityToken());
};
DockTabBinding.prototype.handleAction=function(_c9b){
DockTabBinding.superclass.handleAction.call(this,_c9b);
var _c9c=_c9b.target;
switch(_c9b.type){
case ControlBinding.ACTION_COMMAND:
if(_c9c.controlType==ControlBinding.TYPE_CLOSE){
this.close();
}
break;
case MenuItemBinding.ACTION_COMMAND:
if(_c9b.listener==this.contextMenuBinding){
this._handleContextMenuItemBinding(_c9c);
}
break;
}
};
DockTabBinding.prototype._handleContextMenuItemBinding=function(_c9d){
var cmd=_c9d.getProperty("cmd");
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
DockTabBinding.prototype.setLabel=function(_c9f){
if(!_c9f){
if(!this.getLabel()){
_c9f=DockTabBinding.LABEL_TABLOADING;
}else{
if(this.getLabel()==DockTabBinding.LABEL_TABLOADING){
_c9f=DockTabBinding.LABEL_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setLabel.call(this,_c9f);
};
DockTabBinding.prototype.setImage=function(_ca0){
if(!_ca0){
if(!this.getImage()){
_ca0=DockTabBinding.IMG_TABLOADING;
}else{
if(this.getImage()==DockTabBinding.IMG_TABLOADING){
_ca0=DockTabBinding.IMG_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setImage.call(this,_ca0);
};
DockTabBinding.prototype._viewSource=function(cmd){
var def=ViewDefinitions["Composite.Management.SourceCodeViewer"];
def.argument={action:cmd,doc:this._viewBinding.windowBinding.getContentDocument()};
var _ca3=Resolver.resolve(this.getLabel());
switch(cmd){
case DockTabPopupBinding.CMD_VIEWSOURCE:
def.label="Source: "+_ca3;
break;
case DockTabPopupBinding.CMD_VIEWGENERATED:
def.label="Generated: "+_ca3;
break;
case DockTabPopupBinding.CMD_VIEWSERIALIZED:
def.label="Serialized: "+_ca3;
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
var _ca5=this.bindingElement;
setTimeout(function(){
_ca5.style.bottom="auto";
},25);
}
};
DockTabBinding.prototype.handleBroadcast=function(_ca6,arg){
DockTabBinding.superclass.handleBroadcast.call(this,_ca6,arg);
var body=this._viewBinding.getContentDocument().body;
var root=UserInterface.getBinding(body);
switch(_ca6){
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
DockTabBinding.prototype.select=function(_cab){
DockTabBinding.superclass.select.call(this,_cab);
this._updateBroadcasters();
if(_cab!=true){
this._updateTree();
}
this._updateGlobalEntityToken();
};
DockTabBinding.prototype.close=function(){
this.containingTabBoxBinding.closeTab(this);
};
DockTabBinding.prototype._updateBroadcasters=function(){
if(this.isSelected){
var _cac=top.app.bindingMap.broadcasterCurrentTabDirty;
var _cad=top.app.bindingMap.broadcasterCurrentIsEditor;
if(this._isEditorDockTab()){
_cad.enable();
if(this.isDirty){
_cac.enable();
}else{
_cac.disable();
}
}else{
_cad.disable();
_cac.disable();
}
}
};
DockTabBinding.prototype._updateTree=function(_cae){
if(this._canUpdateTree||_cae){
EventBroadcaster.broadcast(BroadcastMessages.DOCKTABBINDING_SELECT,this);
}
};
DockTabBinding.prototype._isEditorDockTab=function(){
var _caf=false;
if(this._viewBinding!=null){
var win=this._viewBinding.getContentWindow();
if(win!=null&&win.bindingMap!=null){
var _cb1=win.bindingMap.savebutton;
if(_cb1!=null){
_caf=true;
}
}
}
return _caf;
};
DockTabBinding.prototype._updateGlobalEntityToken=function(){
StageBinding.entityToken=this._entityToken;
};
DockTabBinding.newInstance=function(_cb2){
var _cb3=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktab",_cb2);
return UserInterface.registerBinding(_cb3,DockTabBinding);
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
DockPanelsBinding.newInstance=function(_cb4){
var _cb5=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanels",_cb4);
return UserInterface.registerBinding(_cb5,DockPanelsBinding);
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
DockPanelBinding.prototype.select=function(_cb6){
DockPanelBinding.superclass.select.call(this,_cb6);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.unselect=function(){
DockPanelBinding.superclass.unselect.call(this);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.flex=function(){
this.dispatchAction(Binding.ACTION_DIMENSIONCHANGED);
};
DockPanelBinding.prototype.handleCrawler=function(_cb7){
DockPanelBinding.superclass.handleCrawler.call(this,_cb7);
if(_cb7.response==null){
if(_cb7.type==NodeCrawler.TYPE_DESCENDING){
if(this.viewBinding!=null){
if(_cb7.id==FocusCrawler.ID){
_cb7.nextNode=this.viewBinding.bindingElement;
}
}
}
}
};
DockPanelBinding.newInstance=function(_cb8){
var _cb9=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanel",_cb8);
return UserInterface.registerBinding(_cb9,DockPanelBinding);
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
DockControlBinding.newInstance=function(_cba){
var _cbb=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_cba);
return UserInterface.registerBinding(_cbb,DockControlBinding);
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
ViewBinding.getInstance=function(_cbc){
var _cbd=ViewBinding._instances.get(_cbc);
if(!_cbd){
var cry="ViewBinding.getInstance: No such instance: "+_cbc;
SystemLogger.getLogger("ViewBinding [static]").error(cry);
SystemDebug.stack(arguments);
if(Application.isDeveloperMode){
alert(cry);
}
}
return _cbd;
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
var _cc0=!System.hasActivePerspectives&&Client.isExplorer;
if(this.isFreeFloating==true&&!_cc0){
if(snap.isVisible==true){
if(snap.isAttached==true){
var _cc1=snap.boxObject.getGlobalPosition();
var _cc2=snap.boxObject.getDimension();
if(!Point.isEqual(_cc1,this._lastknownposition)){
this.setPosition(_cc1);
this._lastknownposition=_cc1;
}
if(!Dimension.isEqual(_cc2,this._lastknowndimension)){
this.setDimension(_cc2);
this._lastknowndimension=_cc2;
var _cc3=_cc2.h-ViewBinding.VERTICAL_ADJUST;
_cc3=_cc3<0?0:_cc3;
this.windowBinding.getBindingElement().style.height=new String(_cc3)+"px";
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
var _cc4=this._viewDefinition.flowHandle;
if(_cc4!=null){
FlowControllerService.CancelFlow(_cc4);
}
}
if(this._viewDefinition!=null){
var _cc5=this._viewDefinition.handle;
EventBroadcaster.broadcast(BroadcastMessages.VIEW_CLOSED,_cc5);
this.logger.fine("ViewBinding closed: \""+_cc5+"\"");
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
var _cc7=null;
if(this._viewDefinition!=null){
_cc7=this._viewDefinition.handle;
}
return _cc7;
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
ViewBinding.prototype.setDefinition=function(_cc8){
this._viewDefinition=_cc8;
if(_cc8.flowHandle!=null){
this.subscribe(BroadcastMessages.CLOSE_VIEWS);
}
};
ViewBinding.prototype.getDefinition=function(){
return this._viewDefinition;
};
ViewBinding.prototype.handleAction=function(_cc9){
ViewBinding.superclass.handleAction.call(this,_cc9);
var _cca=_cc9.target;
switch(_cc9.type){
case RootBinding.ACTION_PHASE_1:
case RootBinding.ACTION_PHASE_2:
case RootBinding.ACTION_PHASE_3:
if(_cc9.type==RootBinding.ACTION_PHASE_1){
if(this.isActivated&&!_cca.isActivated){
_cca.onActivate();
}
}
_cc9.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
if(this.isFreeFloating==true){
if(_cca==this._snapBinding){
if(this.isVisible==true){
this.updatePositionDimension();
_cc9.consume();
}
}
}
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(this.isFreeFloating==true){
if(_cca==this._snapBinding){
if(_cca.isVisible==true){
this.show();
}else{
this.hide();
}
}
}
break;
case WindowBinding.ACTION_LOADED:
case WindowBinding.ACTION_ONLOAD:
if(_cca.getContentWindow().isPostBackDocument){
if(_cc9.type==WindowBinding.ACTION_ONLOAD){
var arg=this._viewDefinition.argument;
if(arg!=null&&arg.list!=null&&arg.url!=null){
_cca.post(arg.list,arg.url);
arg.list=null;
arg.url=null;
}
}
}else{
if(Client.isExplorer==true){
if(_cca==this.windowBinding){
var self=this;
DOMEvents.addEventListener(_cca.getContentWindow(),DOMEvents.UNLOAD,{handleEvent:function(e){
if(Binding.exists(self._coverBinding)==true){
self._coverBinding.show();
}
}});
}
if(_cc9.type==WindowBinding.ACTION_ONLOAD){
if(this._coverBinding){
this._coverBinding.hide();
}
}
}
}
if(_cc9.type==WindowBinding.ACTION_ONLOAD){
var win=_cca.getContentWindow();
if(win.WindowManager==null){
if(!this._isLoaded){
this._onLoadingCompleted(_cca);
}
}
}
_cc9.consume();
break;
case PageBinding.ACTION_ATTACHED:
if(!_cca.label&&this._viewDefinition.label){
_cca.label=this._viewDefinition.label;
}
if(!_cca.image&&this._viewDefinition.image){
_cca.image=this._viewDefinition.image;
}
if(_cca.bindingWindow==this.getContentWindow()){
this._pageBinding=_cca;
this._injectPageArgument();
}
case PageBinding.ACTION_INITIALIZED:
if(_cca.bindingWindow==this.getContentWindow()){
if(Client.isExplorer&&this._coverBinding){
this._coverBinding.hide();
}
if(!this._isLoaded){
this._onLoadingCompleted();
}
}
break;
case Binding.ACTION_DISPOSED:
if(this.isFreeFloating&&_cca==this._snapBinding){
this.removeActionListener(Binding.ACTION_DISPOSED);
this.dispose();
_cc9.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
case WizardPageBinding.ACTION_FINISH:
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
_cc9.consume();
break;
case ViewBinding.ACTION_DETACH:
this.setDefinition(ViewDefinitions["Composite.Management.Null"]);
ViewBinding._instances.set(this._viewDefinition.handle,this);
break;
}
};
ViewBinding.prototype.handleBroadcast=function(_ccf,arg){
ViewBinding.superclass.handleBroadcast.call(this,_ccf,arg);
switch(_ccf){
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
var _cd3=def.argument;
if(_cd3!=null){
page.setPageArgument(_cd3);
}
var _cd4=def.width;
if(_cd4!=null){
page.width=_cd4;
}
var _cd5=def.height;
if(_cd5!=null){
page.height=_cd5;
}
}
};
ViewBinding.prototype.handleCrawler=function(_cd6){
ViewBinding.superclass.handleCrawler.call(this,_cd6);
switch(_cd6.type){
case NodeCrawler.TYPE_DESCENDING:
if(this.isFreeFloating==true){
if(_cd6.id==FocusCrawler.ID){
if(_cd6.previousNode!=this._snapBinding.bindingElement){
_cd6.response=NodeCrawler.SKIP_NODE;
}
}
}
break;
case NodeCrawler.TYPE_ASCENDING:
if(this.isFreeFloating==true){
_cd6.nextNode=this._snapBinding.bindingElement;
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
ViewBinding.prototype.setPosition=function(_cd7){
_cd7.x+=ViewBinding.HORIZONTAL_ADJUST;
this.bindingElement.style.left=_cd7.x+"px";
this.bindingElement.style.top=_cd7.y+"px";
};
ViewBinding.prototype.setDimension=function(_cd8){
_cd8.h-=ViewBinding.VERTICAL_ADJUST;
_cd8.w-=ViewBinding.HORIZONTAL_ADJUST;
_cd8.w-=1;
if(_cd8.h<0){
_cd8.h=0;
}
if(_cd8.w<0){
_cd8.w=0;
}
this.bindingElement.style.width=String(_cd8.w)+"px";
this.bindingElement.style.height=String(_cd8.h)+"px";
};
ViewBinding.prototype.snapToBinding=function(_cd9){
this.isFlexBoxBehavior=false;
_cd9.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_cd9.addActionListener(Binding.ACTION_POSITIONCHANGED,this);
_cd9.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_cd9.addActionListener(Binding.ACTION_DISPOSED,this);
if(this._snapBinding){
this._snapBinding.removeActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_POSITIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_DISPOSED,this);
this._snapBinding.viewBinding=null;
}
this._snapBinding=_cd9;
this._snapBinding.viewBinding=this;
this.isFreeFloating=true;
if(!this._isViewBindingInitialized){
this.initialize();
}
};
ViewBinding.prototype.getMigrationParent=function(){
var _cda=null;
if(this.isFreeFloating==true){
_cda=this._snapBinding.getBindingElement();
}else{
_cda=ViewBinding.superclass.getMigrationParent.call(this);
}
return _cda;
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
ViewBinding.prototype.reload=function(_cdb){
this._isLoaded=false;
this.windowBinding.reload(_cdb);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
};
ViewBinding.prototype.saveContainedEditor=function(){
var _cdc=false;
var page=this._pageBinding;
if(page!=null&&page instanceof EditorPageBinding){
if(page.canSave()){
page.doSave();
_cdc=true;
}
}
if(!_cdc){
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
ViewBinding.newInstance=function(_ce0){
var _ce1=DOMUtil.createElementNS(Constants.NS_UI,"ui:view",_ce0);
var _ce2=UserInterface.registerBinding(_ce1,ViewBinding);
_ce2.windowBinding=_ce2.add(WindowBinding.newInstance(_ce0));
_ce2.windowBinding.isFlexible=false;
return _ce2;
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
var _cea=this.bindingWindow.__doPostBack;
var _ceb=false;
if(!form.__isSetup){
DOMEvents.addEventListener(this.bindingWindow,DOMEvents.UNLOAD,{handleEvent:function(){
if(_ceb){
Application.unlock(self);
}
}});
}
this.bindingWindow.__doPostBack=function(_cec,_ced){
if(!form.__isSetup){
Application.lock(self);
_ceb=true;
}
self.manifestAllDataBindings();
_cea(_cec,_ced);
if(Application.isDeveloperMode){
self._debugDotNetPostback();
}
};
};
PageBinding.prototype.postMessage=function(_cee,list){
var _cf0=this.bindingWindow.bindingMap.__REQUEST;
if(_cf0!=null&&this._isDotNet()){
switch(_cee){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_PERSIST:
if(this.bindingWindow.DataManager.isDirty){
if(this.validateAllDataBindings()){
if(list!=null){
list.add(this);
}
_cf0.postback(_cee);
}
}
break;
default:
_cf0.postback(_cee);
break;
}
}
if(list!=null){
this._postMessageToDescendants(_cee,list);
}
};
PageBinding.prototype._postMessageToDescendants=function(_cf1,list){
var _cf3=this.getDescendantBindingsByType(WindowBinding);
_cf3.each(function(win){
var page=win.getPageBinding();
if(page!=null){
page.postMessage(_cf1,list);
}
});
};
PageBinding.prototype._debugDotNetPostback=function(){
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_cf7){
list.add({name:_cf7.name,value:_cf7.value});
});
var out="";
list.each(function(_cf9){
out+=_cf9.name+": "+_cf9.value+"\n";
});
this.logger.debug(out);
};
PageBinding.prototype.handleAction=function(_cfa){
PageBinding.superclass.handleAction.call(this,_cfa);
var _cfb=_cfa.target;
switch(_cfa.type){
case RootBinding.ACTION_PHASE_3:
if(_cfb==UserInterface.getBinding(this.bindingDocument.body)){
_cfb.removeActionListener(RootBinding.ACTION_PHASE_3,this);
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
this.doPostBack(_cfb);
}
_cfa.consume();
break;
case PageBinding.ACTION_DOVALIDATEDPOSTBACK:
if(this._isDotNet()){
var _cfc=this.validateAllDataBindings();
if(_cfc){
this.doPostBack(_cfb);
}
}
_cfa.consume();
break;
case BalloonBinding.ACTION_INITIALIZE:
_cfa.consume();
break;
case PageBinding.ACTION_BLOCK_INIT:
if(this._initBlockers==null){
this._initBlockers=new Map();
}
this._initBlockers.set(_cfb.key,true);
break;
case PageBinding.ACTION_UNBLOCK_INIT:
if(this._initBlockers!=null){
if(this._initBlockers.has(_cfb.key)){
this._initBlockers.del(_cfb.key);
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
var _cfe={handleAction:function(_cff){
if(_cff.target==self){
self.removeActionListener(PageBinding.ACTION_UPDATED,_cfe);
MessageQueue.udpdate();
}
}};
this.addActionListener(PageBinding.ACTION_UPDATED,_cfe);
}else{
MessageQueue.udpdate();
}
_cfa.consume();
break;
}
};
PageBinding.prototype.handleBroadcast=function(_d00,arg){
PageBinding.superclass.handleBroadcast.call(this,_d00,arg);
switch(_d00){
case BroadcastMessages.MESSAGEQUEUE_REQUESTED:
var _d02=arg;
if(!this._canPostBack&&!_d02){
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
PageBinding.prototype.doPostBack=function(_d04){
if(this._canPostBack){
if(_d04!=null&&this._isDotNet()){
var _d05=_d04.getCallBackID();
var _d06=_d04.getCallBackArg();
if(_d05!=null){
_d05=_d05.replace(/_/g,"$");
}else{
_d05="";
}
if(_d06==null){
_d06="";
}
this.bindingWindow.__doPostBack(_d05,_d06);
}
}
};
PageBinding.prototype.validateAllDataBindings=function(){
var _d07=true;
var _d08=this.bindingWindow.DataManager.getAllDataBindings();
while(_d08.hasNext()&&_d07){
var _d09=_d08.getNext();
if(_d09.isAttached){
var _d0a=_d09.validate();
if(_d07&&!_d0a){
_d07=false;
this.logger.debug("Invalid DataBinding: "+_d09.toString()+" ("+_d09.getName()+")");
break;
}
}
}
return _d07;
};
PageBinding.prototype.manifestAllDataBindings=function(){
var list=new List();
var _d0c=this.bindingWindow.DataManager.getAllDataBindings();
while(_d0c.hasNext()){
var _d0d=_d0c.getNext();
if(_d0d.isAttached){
var _d0e=_d0d.manifest();
if(_d0e!=null){
list.add(_d0e);
}
}
}
return list;
};
PageBinding.prototype.cleanAllDataBindings=function(){
var _d0f=this.bindingWindow.DataManager.getAllDataBindings();
while(_d0f.hasNext()){
var _d10=_d0f.getNext();
if(_d10.isAttached){
_d10.clean();
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
var _d12=this._cachedFocus.getBinding();
if(_d12){
_d12.blur();
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
var _d13=this.getProperty("width");
if(!_d13){
_d13=this.hasClassName(DialogPageBinding.CLASSNAME_TABBOXED)?DialogPageBinding.DEFAULT_TABBOXED_WIDTH:DialogPageBinding.DEFAULT_WIDTH;
}
this.width=_d13;
}
if(this.height==null){
var _d14=this.getProperty("height");
this.height=_d14?_d14:DialogPageBinding.DEFAULT_HEIGHT;
}
if(this.minheight==null){
var _d15=this.getProperty("minheight");
if(_d15!=null){
this.minheight=_d15;
}
}
if(this.controls==null){
var _d16=this.getProperty("controls");
this.controls=_d16?_d16:DialogPageBinding.DEFAULT_CONTROLS;
}
if(!this.isResizable){
var _d17=this.getProperty("resizable");
this.isResizable=_d17?_d17:DialogPageBinding.DEFAULT_RESIZABLE;
}
if(this.height=="auto"){
this.enableAutoHeightLayoutMode(true);
}
};
DialogPageBinding.prototype.enableAutoHeightLayoutMode=function(_d18){
if(_d18!=this.isAutoHeightLayoutMode){
if(_d18){
this.attachClassName("auto");
}else{
this.detachClassName("auto");
}
this.isAutoHeightLayoutMode=_d18;
}
};
DialogPageBinding.prototype.handleAction=function(_d19){
DialogPageBinding.superclass.handleAction.call(this,_d19);
var _d1a=_d19.target;
switch(_d19.type){
case PageBinding.ACTION_ATTACHED:
if(_d1a!=this&&_d1a.isFitAsDialogSubPage){
_d1a.makeDialogSubPage();
}
break;
case ButtonBinding.ACTION_COMMAND:
_d19.consume();
if(_d1a.response!=null){
this.response=_d1a.response;
switch(_d1a.response){
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
DialogPageBinding.prototype._disableAcceptButton=function(_d1b){
var _d1c=this.bindingWindow.bindingMap.buttonAccept;
if(_d1c!=null){
_d1c.setDisabled(_d1b);
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
DialogPageBodyBinding.prototype._setFitnessHeight=function(_d1d){
var _d1e=CSSComputer.getPadding(this.bindingElement);
var _d1f=CSSComputer.getBorder(this.bindingElement);
_d1d+=_d1e.top+_d1e.bottom;
_d1d+=_d1f.top+_d1f.bottom;
if(_d1d>this.bindingElement.offsetHeight){
this.bindingElement.style.height=_d1d+"px";
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
EditorPageBinding.prototype.handleAction=function(_d27){
EditorPageBinding.superclass.handleAction.call(this,_d27);
var _d28=_d27.target;
switch(_d27.type){
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
var _d29=-1;
this._messengers.each(function(page){
var res=page.bindingWindow==_d28.bindingWindow;
if(res){
page.bindingWindow.DataManager.isDirty=false;
if(_d29==-1){
_d29=0;
}
}else{
_d29++;
}
return res;
});
if(_d29>-1){
this._messengers.del(_d29);
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
_d27.consume();
break;
case Binding.ACTION_INVALID:
this.enableSave(false);
this._invalidBindings.set(_d28.key,_d28);
if(_d28 instanceof FieldsBinding){
this._updateStatusBar();
}
break;
case Binding.ACTION_VALID:
this._invalidBindings.del(_d28.key);
if(_d28 instanceof FieldsBinding){
this._updateStatusBar();
}
if(!this._invalidBindings.hasEntries()){
this.enableSave(true);
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_d28==this._tabBoxBinding){
if(this._windowBinding!=null){
var tab=_d28.getSelectedTabBinding();
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
_d27.consume();
break;
case TabBoxBinding.ACTION_UNSELECTED:
if(_d28==this._tabBoxBinding){
this.postMessage(EditorPageBinding.MESSAGE_PERSIST);
}
_d27.consume();
break;
case WindowBinding.ACTION_LOADED:
if(_d28==this._windowBinding){
if(this._isGeneratingPreview==true){
this._generatePreview();
this._isGeneratingPreview=false;
}
_d27.consume();
}
break;
case WindowBinding.ACTION_ONLOAD:
if(_d28==this._windowBinding){
if(_d28.getContentWindow().isPostBackDocument!=true){
if(Client.isPrism){
Prism.enableCache();
}
var self=this;
setTimeout(function(){
Application.unlock(self);
},100);
if(EventBroadcaster.hasSubscribers(BroadcastMessages.XHTML_MARKUP_ON)){
var _d2e=WindowBinding.getMarkup(this._windowBinding);
if(_d2e!=null){
EventBroadcaster.broadcast(BroadcastMessages.XHTML_MARKUP_ON,_d2e);
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
var _d2f=this.bindingWindow.bindingMap.savebutton;
if(_d2f!=null&&!_d2f.isDisabled){
_d2f.fireCommand();
}
};
EditorPageBinding.prototype._saveEditorPage=function(){
if(Application.isDeveloperMode){
}
if(this.validateAllDataBindings()){
this.bindingWindow.DataManager.isDirty=false;
var _d30=this.bindingWindow.bindingMap.__REQUEST;
if(_d30!=null){
_d30.postback(EditorPageBinding.MESSAGE_SAVE);
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
EditorPageBinding.prototype.postMessage=function(_d31){
this._message=null;
switch(_d31){
case EditorPageBinding.MESSAGE_SAVE:
this._postMessageToDescendants(_d31,this._messengers);
if(!this._messengers.hasEntries()){
this._saveEditorPage();
}else{
this._message=_d31;
}
break;
case EditorPageBinding.MESSAGE_PERSIST:
this._message=_d31;
EditorPageBinding.superclass.postMessage.call(this,_d31,this._messengers);
break;
case EditorPageBinding.MESSAGE_REFRESH:
EditorPageBinding.superclass.postMessage.call(this,_d31,this._messengers);
break;
}
};
EditorPageBinding.prototype.handleBroadcast=function(_d32,arg){
EditorPageBinding.superclass.handleBroadcast.call(this,_d32,arg);
switch(_d32){
case BroadcastMessages.HIGHLIGHT_KEYWORDS:
var _d34=arg;
if(UserInterface.isBindingVisible(this._windowBinding)){
WindowBinding.highlightKeywords(this._windowBinding,_d34);
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
var _d35=new List();
this._invalidBindings.each(function(key,_d37){
var list=_d37.getInvalidLabels();
if(list){
list.each(function(_d39){
_d35.add(_d39);
});
}
});
if(_d35.hasEntries()){
var _d3a="";
while(_d35.hasNext()){
_d3a+=_d35.getNext().toLowerCase();
if(_d35.hasNext()){
_d3a+=", ";
}else{
_d3a+=".";
}
}
var _d3b=StringBundle.getString("ui","Website.App.StatusBar.ErrorInField");
StatusBar.error(_d3b+" "+_d3a);
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
EditorPageBinding.prototype.enableSave=function(_d3c){
var _d3d=this.bindingDocument.getElementById("broadcasterCanSave");
if(_d3d){
var _d3e=UserInterface.getBinding(_d3d);
if(_d3c){
_d3e.enable();
}else{
_d3e.disable();
}
}else{
throw new Error("A required BroadcasterBinding could not be located.");
}
};
EditorPageBinding.prototype.enableSaveAs=function(){
var _d3f=this.bindingDocument.getElementById(EditorPageBinding.ID_SAVEASBUTTON);
if(_d3f!=null){
UserInterface.getBinding(_d3f).enable();
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
var _d40=this._windowBinding.getContentDocument().title;
if(_d40==WindowBinding.POSTBACK_TITLE){
if(this.validateAllDataBindings()){
this.manifestAllDataBindings();
var _d41=this._tabBinding.getCallBackID();
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d43){
if(_d43.name=="__EVENTTARGET"&&_d41){
_d43.value=_d41;
}
list.add({name:_d43.name,value:_d43.value});
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
WizardPageBinding.prototype.handleAction=function(_d45){
WizardPageBinding.superclass.handleAction.call(this,_d45);
var _d46=_d45.target;
switch(_d45.type){
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_FINISH:
if(this.validateAllDataBindings()==true){
this.doPostBack(_d46);
}else{
_d45.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
this.doPostBack(_d46);
break;
case Binding.ACTION_INVALID:
this._enableNextAndFinish(false);
_d45.consume();
break;
case Binding.ACTION_VALID:
this._enableNextAndFinish(true);
_d45.consume();
break;
}
};
WizardPageBinding.prototype._enableNextAndFinish=function(_d47){
var next=this.bindingWindow.bindingMap.nextbutton;
var _d49=this.bindingWindow.bindingMap.finishbutton;
if(next){
next.setDisabled(!_d47);
}
if(_d49){
_d49.setDisabled(!_d47);
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
MarkupAwarePageBinding.prototype.handleBroadcast=function(_d4a,arg){
MarkupAwarePageBinding.superclass.handleBroadcast.call(this,_d4a,arg);
var self=this;
switch(_d4a){
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
MarkupAwarePageBinding.prototype._handleMarkup=function(_d4e){
};
MarkupAwarePageBinding.prototype._activate=function(_d4f){
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
var _d50=this.bindingWindow.bindingMap.moreactionstoolbargroup;
this._moreActionsWidth=_d50.boxObject.getDimension().w;
_d50.hide();
var _d51=this.boxObject.getDimension().h;
this.bindingElement.style.height=_d51+"px";
var self=this;
var _d53=this.bindingWindow.bindingMap.moreactionsbutton;
_d53.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_d54){
self._showMoreActions();
_d54.consume();
}});
var _d55=this.bindingWindow.bindingMap.moreactionspopup;
_d55.addActionListener(MenuItemBinding.ACTION_COMMAND,{handleAction:function(_d56){
var item=_d56.target;
self._handleSystemAction(item.associatedSystemAction);
}});
SystemToolBarBinding.superclass.onBindingInitialize.call(this);
};
SystemToolBarBinding.prototype.handleBroadcast=function(_d58,arg){
SystemToolBarBinding.superclass.handleBroadcast.call(this,_d58,arg);
switch(_d58){
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
var _d5c=self.bindingWindow.bindingMap.moreactionstoolbargroup;
if(_d5c!=null){
_d5c.hide();
}
},0);
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
var _d5d=this.bindingWindow.WindowManager;
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
var _d5e=new String("");
this._actionProfile.each(function(_d5f,list){
list.each(function(_d61){
_d5e+=_d61.getHandle()+";"+_d61.getKey()+";";
if(_d61.isDisabled()){
_d5e+="isDisabled='true';";
}
});
});
return _d5e;
};
SystemToolBarBinding.prototype.handleAction=function(_d62){
SystemToolBarBinding.superclass.handleAction.call(this,_d62);
switch(_d62.type){
case ButtonBinding.ACTION_COMMAND:
var _d63=_d62.target;
this._handleSystemAction(_d63.associatedSystemAction);
break;
}
};
SystemToolBarBinding.prototype._handleSystemAction=function(_d64){
if(_d64!=null){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _d66=list.getFirst();
var _d67=_d66.node;
}
SystemAction.invoke(_d64,_d67);
}
};
SystemToolBarBinding.prototype.buildLeft=function(){
if(this.isInitialized&&this._actionProfile!=null&&this._actionProfile.hasEntries()){
var doc=this.bindingDocument;
var self=this;
this._actionProfile.each(function(_d6a,list){
var _d6c=new List();
list.reset();
while(list.hasNext()){
var _d6d=list.getNext();
var _d6e=null;
if(_d6d.isInToolBar()){
if(_d6d.isInFolder()){
alert("IsInFolder not implemented!");
}else{
_d6e=self.getToolBarButtonBinding(_d6d);
}
}
if(_d6e!=null){
_d6c.add(_d6e);
}
}
if(_d6c.hasEntries()){
var _d6f=ToolBarGroupBinding.newInstance(doc);
_d6c.each(function(_d70){
_d6f.add(_d70);
});
self.addLeft(_d6f);
}
});
this.attachRecursive();
this._containAllButtons();
}
};
SystemToolBarBinding.prototype._containAllButtons=function(){
var _d71=this.bindingWindow.bindingMap.toolsbutton;
var _d72=this.bindingWindow.bindingMap.moreactionstoolbargroup;
var _d73=_d71.bindingElement.offsetLeft-this._moreActionsWidth;
var _d74=0;
var _d75=new List();
var _d76,_d77=this._toolBarBodyLeft.getDescendantBindingsByLocalName("toolbarbutton");
while((_d76=_d77.getNext())!=null){
if(!_d76.isVisible){
_d76.show();
}
_d74+=_d76.boxObject.getDimension().w;
if(_d74>=_d73){
_d75.add(_d76);
_d76.hide();
}
}
if(_d75.hasEntries()){
var _d78=_d75.getFirst().bindingElement.parentNode;
UserInterface.getBinding(_d78).setLayout(ToolBarGroupBinding.LAYOUT_LAST);
this._moreActions=new List();
while((_d76=_d75.getNext())!=null){
this._moreActions.add(_d76.associatedSystemAction);
}
_d72.show();
}else{
this._moreActions=null;
_d72.hide();
}
};
SystemToolBarBinding.prototype._showMoreActions=function(){
if(this._moreActions!=null){
var _d79=this.bindingWindow.bindingMap.moreactionspopup;
_d79.empty();
while((action=this._moreActions.getNext())!=null){
var item=MenuItemBinding.newInstance(_d79.bindingDocument);
item.setLabel(action.getLabel());
item.setToolTip(action.getToolTip());
item.imageProfile=new ImageProfile({image:action.getImage(),imageDisabled:action.getDisabledImage()});
if(action.isDisabled()){
item.disable();
}
item.associatedSystemAction=action;
_d79.add(item);
}
_d79.attachRecursive();
this._moreActions=null;
}
};
SystemToolBarBinding.prototype.getToolBarButtonBinding=function(_d7b){
var _d7c=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _d7d=_d7b.getLabel();
var _d7e=_d7b.getToolTip();
var _d7f=_d7b.getImage();
var _d80=_d7b.isDisabled();
if(_d7f&&_d7f.indexOf("size=")==-1){
_d7f=_d7f+"&size="+this.getImageSize();
_d7c.imageProfile=new ImageProfile({image:_d7f});
}
if(_d7d){
_d7c.setLabel(_d7d);
}
if(_d7e){
_d7c.setToolTip(_d7e);
}
if(_d7b.isDisabled()){
_d7c.disable();
}
_d7c.associatedSystemAction=_d7b;
return _d7c;
};
SystemToolBarBinding.prototype._invokeDefaultAction=function(){
var _d81=this.getDescendantBindingByLocalName("toolbarbutton");
if(_d81!=null){
_d81.fireCommand();
}
};
SystemToolBarBinding.prototype.getActivePosition=function(){
return this._activePosition;
};
SystemToolBarBinding.newInstance=function(_d82){
var _d83=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_d82);
return UserInterface.registerBinding(_d83,SystemToolBarBinding);
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
SystemTreeBinding.prototype.add=function(_d84){
var _d85=SystemTreeBinding.superclass.add.call(this,_d84);
if(!this._defaultTreeNode){
if(_d84 instanceof SystemTreeNodeBinding){
this._defaultTreeNode=_d84;
}
}
return _d85;
};
SystemTreeBinding.prototype.handleAction=function(_d86){
SystemTreeBinding.superclass.handleAction.call(this,_d86);
var _d87=_d86.target;
switch(_d86.type){
case TreeNodeBinding.ACTION_ONFOCUS:
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
this._restorableFocusHandle=null;
this._handleSystemTreeFocus();
break;
case SystemTreeNodeBinding.ACTION_REFRESHED_YEAH:
this._updateRefreshingTrees(_d87.key);
_d86.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
case TreeNodeBinding.ACTION_BLUR:
var self=this;
setTimeout(function(){
if(!self._focusedTreeNodeBindings.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,null);
}
},0);
if(_d86.type==TreeNodeBinding.ACTION_BLUR){
this._restorableFocusHandle=_d87.getHandle();
}
break;
case TreeNodeBinding.ACTION_COMMAND:
EventBroadcaster.broadcast(BroadcastMessages.INVOKE_DEFAULT_ACTION);
_d86.consume();
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
var _d89=this._treeNodeBindings.get(this._restorableFocusHandle);
this.focusSingleTreeNodeBinding(_d89);
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
SystemTreeBinding.prototype.registerTreeNodeBinding=function(_d8a){
SystemTreeBinding.superclass.registerTreeNodeBinding.call(this,_d8a);
var reg=this._entityTokenRegistry;
var _d8c=_d8a.node.getEntityToken();
if(reg.has(_d8c)){
reg.get(_d8c).add(_d8a);
}else{
reg.set(_d8c,new List([_d8a]));
}
var _d8d=null;
if(this.isLockedToEditor){
if(_d8c==StageBinding.entityToken){
if(_d8a.node.isTreeLockEnabled()){
_d8d=_d8a;
}
}
}else{
if(this._backupfocushandle!=null){
if(this._backupfocushandle==_d8a.node.getHandle()){
_d8d=_d8a;
}
}
}
if(_d8d!=null){
this.focusSingleTreeNodeBinding(_d8d);
}
};
SystemTreeBinding.prototype.unRegisterTreeNodeBinding=function(_d8e){
SystemTreeBinding.superclass.unRegisterTreeNodeBinding.call(this,_d8e);
var reg=this._entityTokenRegistry;
var _d90=_d8e.node.getEntityToken();
if(reg.has(_d90)){
var list=reg.get(_d90);
list.del(_d8e);
if(!list.hasEntries()){
reg.del(_d90);
}
}else{
this.logger.fatal("SystemTreeBinding out of synch: unRegisterTreeNodeBinding");
if(Application.isDeveloperMode){
Dialog.error("Attention Developer","Tree is out of synch. Please reproduce this bug and file a report.");
}
}
if(_d8e.isRefreshing){
this._updateRefreshingTrees(binding.key);
}
if(!this.isLockedToEditor){
if(_d8e.isFocused&&this._backupfocushandle==null){
this._backupfocushandle=_d8e.node.getHandle();
var self=this;
setTimeout(function(){
self._backupfocushandle=null;
},200);
}
}
};
SystemTreeBinding.prototype._updateRefreshingTrees=function(key){
var _d94=this._refreshingTreeNodes;
if(_d94.hasEntries()&&_d94.has(key)){
_d94.del(key);
if(!_d94.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this._refreshToken);
this._refreshToken=null;
this._attemptRestorableFocus();
}
}
};
SystemTreeBinding.prototype._computeClipboardSetup=function(){
var _d95=false;
var _d96=this.getFocusedTreeNodeBindings();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
_d95=false;
}else{
if(_d96.hasEntries()){
_d95=true;
while(_d95&&_d96.hasNext()){
var _d97=_d96.getNext();
if(!_d97.isDraggable){
_d95=false;
}
}
}
}
SystemTreePopupBinding.isCutAllowed=_d95;
};
SystemTreeBinding.prototype._computeRefreshSetup=function(){
SystemTreePopupBinding.isRefreshAllowed=SystemTreeBinding.clipboard===null;
};
SystemTreeBinding.prototype.handleBroadcast=function(_d98,arg){
SystemTreeBinding.superclass.handleBroadcast.call(this,_d98,arg);
switch(_d98){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
if(arg!=null||this.isFocused){
this._handleCommandBroadcast(_d98,arg);
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
if(this.isFocused){
this._handleCommandBroadcast(_d98);
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
var self=this,_d9c=arg;
setTimeout(function(){
if(_d9c!=null){
self._focusTreeNodeByEntityToken(_d9c);
}
},250);
break;
}
};
SystemTreeBinding.prototype._handleDockTabSelect=function(tab){
var _d9e=tab.perspectiveNode==null;
if(!_d9e){
_d9e=tab.perspectiveNode==this.perspectiveNode;
}
if(_d9e){
var self=this,_da0=tab.getEntityToken();
setTimeout(function(){
if(_da0==null){
self.blurSelectedTreeNodes();
}else{
self._focusTreeNodeByEntityToken(_da0);
}
},250);
}
};
SystemTreeBinding.prototype._focusTreeNodeByEntityToken=function(_da1,_da2){
this.isLockFeatureFocus=true;
var _da3=null;
if(this._entityTokenRegistry.has(_da1)){
var list=this._entityTokenRegistry.get(_da1);
list.each(function(tn){
var _da6=true;
if(tn.node.isTreeLockEnabled()){
_da3=tn;
_da6=false;
}
return _da6;
});
if(_da3!=null){
if(!_da3.isFocused){
this.focusSingleTreeNodeBinding(_da3,true);
}else{
_da3.dispatchAction(TreeNodeBinding.ACTION_FOCUSED);
}
}
}
this.isLockFeatureFocus=false;
if(_da3==null&&_da2!=true){
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._fetchTreeForEntityToken(_da1);
self._focusTreeNodeByEntityToken(_da1,true);
}
Application.unlock(self);
StatusBar.clear();
},0);
}
};
SystemTreeBinding.prototype._fetchTreeForEntityToken=function(_da8){
var _da9=StageBinding.perspectiveNode.getEntityToken();
if(this._activePosition==SystemAction.activePositions.SelectorTree){
var _da9=this.getRootTreeNodeBindings().getFirst().node.getEntityToken();
}
var _daa=this.getOpenSystemNodes();
var map=System.getInvisibleBranch(_da9,_da8,_daa);
if(map==null){
this.isLockedToEditor=false;
if(Application.isDeveloperMode){
Dialog.warning("Ouch!","Because the web service failed, tree has disabled the lock-tree-to-editor "+"feature. Otherwise, re-focus would fire the error indefinitely. Please try again.");
}
}else{
if(map.hasEntries()){
var self=this;
var _dad=this._treeNodeBindings;
var _dae=new Map();
function fix(_daf,list){
if(!_daf.hasBeenOpened){
if(list.hasEntries()){
list.each(function(node){
if(!_dad.has(node.getHandle())){
var _db2=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
_dae.set(node.getHandle(),_db2);
_daf.add(_db2);
}
});
_daf.attachRecursive();
}
}
_daf.open(true);
}
map.each(function(_db3,list){
if(_dad.has(_db3)){
var _db5=_dad.get(_db3);
fix(_db5,list);
}else{
if(_dae.has(_db3)){
var _db6=_dae.get(_db3);
fix(_db6,list);
}else{
}
}
});
}
}
};
SystemTreeBinding.prototype._handleCommandBroadcast=function(_db7,arg){
switch(_db7){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _db9=arg;
if(_db9!=null){
this._invokeServerRefresh(_db9);
}else{
this._invokeManualRefresh();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
if(SystemTreeBinding.clipboard!=null){
SystemTreeBinding.clipboard.hideDrag();
}
var _dba=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_CUT;
SystemTreeBinding.clipboard=_dba;
_dba.showDrag();
break;
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
var _dba=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_COPY;
SystemTreeBinding.clipboard=_dba;
break;
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
this._handlePaste();
break;
}
};
SystemTreeBinding.prototype._invokeServerRefresh=function(_dbb){
if(_dbb!=null&&_dbb=="null"){
if(Application.isDeveloperMode){
alert("Saa har vi balladen.");
}
}
if(this._entityTokenRegistry.has(_dbb)){
var list=this._entityTokenRegistry.get(_dbb).reset();
this._refreshToken=_dbb;
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this._refreshToken);
while(list.hasNext()){
var _dbd=list.getNext();
this._refreshingTreeNodes.set(_dbd.key,true);
setTimeout(function(){
_dbd.refresh(true);
},0);
}
}
};
SystemTreeBinding.prototype._invokeManualRefresh=function(){
var _dbe=this.getFocusedTreeNodeBindings().getFirst();
if(_dbe){
var _dbf=_dbe.getLabel();
var _dc0=_dbe.getAncestorBindingByLocalName("treenode");
if(_dc0){
_dbe=_dc0;
}
this._refreshToken=null;
this._refreshingTreeNodes.set(_dbe.key,true);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,null);
if(!StatusBar.state){
var _dc1=StringBundle.getString("ui","Website.App.StatusBar.Refreshing");
StatusBar.busy(_dc1,[_dbf]);
}
_dbe.refresh();
}
};
SystemTreeBinding.prototype._handlePaste=function(){
var _dc2=SystemTreeBinding.clipboard;
if(_dc2){
var type=_dc2.dragType;
var _dc4=this.getFocusedTreeNodeBindings().getFirst();
if(_dc4.dragAccept){
if(_dc4.acceptor.isAccepting(type)){
this._performPaste(_dc4);
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteTypeNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteTypeNotAllowed"));
}
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteNotAllowed"));
}
}
};
SystemTreeBinding.prototype._performPaste=function(_dc5){
var self=this;
function update(){
MessageQueue.update();
Application.unlock(self);
}
if(_dc5.node.hasDetailedDropSupport()){
if(_dc5.node.hasChildren()){
var _dc7=_dc5.node.getChildren();
Dialog.invokeModal(SystemTreeBinding.URL_DIALOG_DETAILEDPASTE,{handleDialogResponse:function(_dc8,_dc9){
if(_dc8==Dialog.RESPONSE_ACCEPT){
Application.lock(self);
var _dca=_dc9.get("switch");
var _dcb=_dc9.get("sibling");
if(_dca=="after"){
_dcb++;
}
var _dcc=_dc5.accept(SystemTreeBinding.clipboard,_dcb);
if(_dcc){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}},_dc7);
}else{
Application.lock(self);
var _dcd=_dc5.accept(SystemTreeBinding.clipboard,0);
if(_dcd){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}else{
Application.lock(self);
var _dcd=_dc5.accept(SystemTreeBinding.clipboard,0);
if(_dcd){
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
SystemTreeBinding.prototype.collapse=function(_dce){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,null);
if(_dce){
this.blurSelectedTreeNodes();
var _dcf=this.getRootTreeNodeBindings();
_dcf.each(function(_dd0){
if(_dd0.isContainer&&_dd0.isOpen){
_dd0.close();
_dd0.hasBeenOpened=false;
_dd0.empty();
}
});
}else{
SystemTreeBinding.superclass.collapse.call(this);
}
};
SystemTreeBinding.prototype.setLockToEditor=function(_dd1){
if(_dd1!=this.isLockedToEditor){
this.isLockedToEditor=_dd1;
if(_dd1){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
}
};
SystemTreeBinding.prototype.getOpenSystemNodes=function(){
var list=new List([StageBinding.perspectiveNode]);
if(this._activePosition==SystemAction.activePositions.SelectorTree){
list=new List();
}
var _dd3=this.getRootTreeNodeBindings();
_dd3.each(function(_dd4){
var _dd5=_dd4.getOpenSystemNodes();
if(_dd5!=null&&_dd5.hasEntries()){
list.merge(_dd5);
}
});
return list;
};
SystemTreeBinding.prototype.focusSingleTreeNodeBinding=function(_dd6){
SystemTreeBinding.superclass.focusSingleTreeNodeBinding.call(this,_dd6);
if(_dd6!=null){
this._handleSystemTreeFocus();
}
};
SystemTreeBinding.prototype.getCompiledActionProfile=function(){
var temp={};
var _dd8=new Map();
var _dd9=this.getFocusedTreeNodeBindings();
var _dda=_dd9.getFirst().node.getActionProfile();
var self=this;
_dda.each(function(_ddc,list){
var _dde=new List();
list.each(function(_ddf){
if(_ddf.getActivePositions()&self._activePosition){
_dde.add(_ddf);
}
});
if(_dde.hasEntries()){
_dd8.set(_ddc,_dde);
}
});
_dd8.activePosition=this._activePosition;
return _dd8;
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
SystemTreePopupBinding.prototype.handleBroadcast=function(_de0,arg){
SystemTreePopupBinding.superclass.handleBroadcast.call(this,_de0,arg);
switch(_de0){
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
var _de5=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_PASTE);
cut.setDisabled(!SystemTreePopupBinding.isCutAllowed);
copy.setDisabled(!SystemTreePopupBinding.isCutAllowed);
_de5.setDisabled(SystemTreeBinding.clipboard==null);
};
SystemTreePopupBinding.prototype._setupRefreshItem=function(){
var _de6=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_REFRESH);
_de6.setDisabled(!SystemTreePopupBinding.isRefreshAllowed);
};
SystemTreePopupBinding.prototype.handleAction=function(_de7){
SystemTreePopupBinding.superclass.handleAction.call(this,_de7);
switch(_de7.type){
case MenuItemBinding.ACTION_COMMAND:
var _de8=_de7.target;
var _de9=_de8.associatedSystemAction;
if(_de9){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _deb=list.getFirst();
var _dec=_deb.node;
}
SystemAction.invoke(_de9,_dec);
}else{
var cmd=_de8.getProperty("cmd");
if(cmd){
this._handleCommand(cmd);
}
}
break;
}
};
SystemTreePopupBinding.prototype._handleCommand=function(cmd){
var _def=null;
switch(cmd){
case SystemTreePopupBinding.CMD_CUT:
_def=BroadcastMessages.SYSTEMTREEBINDING_CUT;
break;
case SystemTreePopupBinding.CMD_COPY:
_def=BroadcastMessages.SYSTEMTREEBINDING_COPY;
break;
case SystemTreePopupBinding.CMD_PASTE:
_def=BroadcastMessages.SYSTEMTREEBINDING_PASTE;
break;
case SystemTreePopupBinding.CMD_REFRESH:
_def=BroadcastMessages.SYSTEMTREEBINDING_REFRESH;
break;
}
if(_def){
setTimeout(function(){
EventBroadcaster.broadcast(_def);
},0);
}
};
SystemTreePopupBinding.prototype.disposeContent=function(){
var _df0=new List(DOMUtil.getElementsByTagName(this.bindingElement,"menugroup"));
while(_df0.hasNext()){
var _df1=UserInterface.getBinding(_df0.getNext());
if(!_df1.getProperty("rel")){
_df1.dispose();
}
}
};
SystemTreePopupBinding.prototype.constructContent=function(){
if(this._actionProfile!=null){
var doc=this.bindingDocument;
var _df3=new List();
var self=this;
this._actionProfile.each(function(_df5,list){
var _df7=MenuGroupBinding.newInstance(doc);
list.each(function(_df8){
var _df9=self.getMenuItemBinding(_df8);
_df7.add(_df9);
});
_df3.add(_df7);
});
_df3.reverse();
while(_df3.hasNext()){
this._bodyBinding.addFirst(_df3.getNext());
}
this._bodyBinding.attachRecursive();
}
};
SystemTreePopupBinding.prototype.getMenuItemBinding=function(_dfa){
var _dfb=MenuItemBinding.newInstance(this.bindingDocument);
var _dfc=_dfa.getLabel();
var _dfd=_dfa.getToolTip();
var _dfe=_dfa.getImage();
var _dff=_dfa.getDisabledImage();
var _e00=_dfa.isCheckBox();
if(_dfc){
_dfb.setLabel(_dfc);
}
if(_dfd){
_dfb.setToolTip(_dfd);
}
if(_dfe){
_dfb.imageProfile=new ImageProfile({image:_dfe,imageDisabled:_dff});
}
if(_e00){
_dfb.setType(MenuItemBinding.TYPE_CHECKBOX);
if(_dfa.isChecked()){
_dfb.check(true);
}
}
if(_dfa.isDisabled()){
_dfb.disable();
}
_dfb.associatedSystemAction=_dfa;
return _dfb;
};
SystemTreePopupBinding.prototype.snapToMouse=function(e){
var node=e.target?e.target:e.srcElement;
var name=DOMUtil.getLocalName(node);
var _e04=null;
if(name!="tree"){
switch(name){
case "treenode":
break;
default:
node=DOMUtil.getAncestorByLocalName("treenode",node);
if(node!=null){
_e04=UserInterface.getBinding(node);
if(_e04.isDisabled){
_e04=null;
}
}
break;
}
if(_e04!=null&&_e04.node!=null&&_e04.node.getActionProfile()!=null){
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
var _e05=this.node.getLabel();
if(_e05){
this.setLabel(_e05);
}
var _e06=this.node.getToolTip();
if(_e06){
this.setToolTip(_e06);
}
var _e07=this.node.getHandle();
if(_e07){
this.setHandle(_e07);
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
var _e0a="";
var list=this.node.getDragAccept();
while(list.hasNext()){
_e0a+=list.getNext();
if(list.hasNext()){
_e0a+=" ";
}
}
this.setProperty("dragaccept",_e0a);
}
SystemTreeNodeBinding.superclass._initializeBindingDragAndDropFeatures.call(this);
};
SystemTreeNodeBinding.prototype.handleAction=function(_e0c){
SystemTreeNodeBinding.superclass.handleAction.call(this,_e0c);
switch(_e0c.type){
case SystemTreeNodeBinding.ACTION_REFRESHED:
if(_e0c.target==this){
if(!this.isOpen){
this.hasBeenOpened=false;
_e0c.consume();
}
}
break;
}
};
SystemTreeNodeBinding.prototype.handleBroadcast=function(_e0d,arg){
SystemTreeNodeBinding.superclass.handleBroadcast.call(this,_e0d,arg);
switch(_e0d){
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
var _e10=null;
var _e11=this.node.getImageProfile();
if(_e11){
if(this.isOpen){
_e10=_e11.getActiveImage();
}else{
_e10=_e11.getDefaultImage();
}
}
if(!_e10){
_e10=SystemTreeNodeBinding.superclass.computeImage.call(this);
}
return _e10;
};
SystemTreeNodeBinding.prototype.open=function(_e12){
var _e13=this.isContainer&&!this.isOpen;
var _e14=!this.hasBeenOpened;
SystemTreeNodeBinding.superclass.open.call(this);
if(_e13&&(_e14||SystemTreeBinding.HAS_NO_MEMORY)&&_e12!=true){
this.refresh();
if(this._isForcedOpen){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN,this);
this._isForcedOpen=false;
}
}
};
SystemTreeNodeBinding.prototype.refresh=function(){
var _e15=null;
if(this.isContainer){
_e15=this.getOpenSystemNodes();
}
this.isRefreshing=true;
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._performRefresh(_e15);
Application.unlock(self);
StatusBar.clear();
}
},0);
};
SystemTreeNodeBinding.prototype._performRefresh=function(_e17){
if(_e17!=null){
this._refreshBranch(_e17);
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
var _e18=new List();
var _e19=this.node.getChildren();
this.empty();
if(_e19.hasEntries()){
this._insertTreeNodesRegulated(_e19);
}
};
SystemTreeNodeBinding.prototype._insertTreeNodesRegulated=function(_e1a){
var _e1b=0;
var _e1c=new List([]);
while(_e1a.hasEntries()&&_e1b<=SystemTreeNodeBinding.MAX_CHILD_IMPORT){
var _e1d=SystemTreeNodeBinding.newInstance(_e1a.extractFirst(),this.bindingDocument);
_e1d.autoExpand=this.autoExpand;
this.add(_e1d);
_e1d.attach();
_e1b++;
if(this.autoExpand){
if(_e1b==1&&!_e1a.hasEntries()||LastOpenedSystemNodes.isOpen(_e1d)){
_e1c.add(_e1d);
}
}
}
if(_e1a.hasEntries()){
this._insertBufferTreeNode(_e1a);
}
_e1c.each(function(node){
if(node.isContainer&&!node.isOpen){
var self=node;
setTimeout(function(){
self.open();
},0);
}
});
};
SystemTreeNodeBinding.prototype._insertBufferTreeNode=function(_e20){
alert("Max treenode count reached. This is not handled!");
alert("TODO: SystemTreeNodeBinding#._insertBufferTreeNode");
};
SystemTreeNodeBinding.prototype._refreshBranch=function(list){
var _e22=this.node.getDescendantBranch(list);
if(_e22.hasEntries()){
this.XXX(_e22);
}
};
SystemTreeNodeBinding.prototype.XXX=function(_e23){
var self=this;
var map=new Map();
this.empty();
_e23.each(function(key,_e27){
if(_e27.hasEntries()){
_e27.each(function(node){
var _e29=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e29);
if(map.has(key)){
var _e2a=map.get(key);
_e2a.add(_e29);
_e2a.isOpen=true;
_e2a.hasBeenOpened=true;
}else{
if(key==self.node.getHandle()){
self.add(_e29);
}else{
}
}
});
}
});
this.attachRecursive();
_e23.dispose();
map.dispose();
};
SystemTreeNodeBinding.prototype.getOpenDescendants=function(){
var _e2b=new TreeCrawler();
var _e2c=new List();
_e2b.mode=TreeCrawler.MODE_GETOPEN;
_e2b.crawl(this.bindingElement,_e2c);
if(_e2c.hasEntries()){
_e2c.extractFirst();
}
_e2b.dispose();
return _e2c;
};
SystemTreeNodeBinding.prototype.getOpenSystemNodes=function(){
var _e2d=null;
var list=this.getOpenDescendants();
if(list.hasEntries()){
_e2d=new List([this.node]);
list.each(function(_e2f){
_e2d.add(_e2f.node);
});
}else{
if(this.isOpen){
_e2d=new List([this.node]);
}
}
return _e2d;
};
SystemTreeNodeBinding.prototype.updateClassNames=function(){
if(!this.isRefreshing){
SystemTreeNodeBinding.superclass.updateClassNames.call(this);
}
};
SystemTreeNodeBinding.prototype.acceptTreeNodeBinding=function(_e30,_e31){
var _e32=(SystemTreeBinding.clipboardOperation==SystemTreePopupBinding.CMD_COPY);
if(_e30 instanceof SystemTreeNodeBinding){
if(TreeService.ExecuteDropElementAction){
TreeService.ExecuteDropElementAction(_e30.node.getData(),this.node.getData(),_e31?_e31:this.containingTreeBinding.getDropIndex(),Application.CONSOLE_ID,_e32);
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
SystemTreeNodeBinding.newInstance=function(node,_e36){
var _e37=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_e36);
var _e38=UserInterface.registerBinding(_e37,SystemTreeNodeBinding);
_e38.node=node;
return _e38;
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
SystemPageBinding.prototype.setPageArgument=function(_e39){
this.node=_e39;
SystemPageBinding.superclass.setPageArgument.call(this,_e39);
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
var _e3a=this.node.getChildren();
if(_e3a.hasEntries()){
while(_e3a.hasNext()){
var node=SystemTreeNodeBinding.newInstance(_e3a.getNext(),this.bindingDocument);
this._tree.add(node);
node.attach();
}
}
};
SystemPageBinding.prototype._refreshTree=function(){
var _e3c=this._tree._treeBodyBinding.getChildBindingsByLocalName("treenode");
_e3c.each(function(root){
if(!root.isContainer){
root.isOpen=true;
}
});
var _e3e=new TreeCrawler();
var _e3f=new List();
_e3e.mode=TreeCrawler.MODE_GETOPEN;
_e3e.crawl(this.bindingElement,_e3f);
_e3e.dispose();
var list=new List([this.node]);
_e3f.each(function(_e41){
list.add(_e41.node);
});
this._tree.empty();
var _e42=this.node.getDescendantBranch(list);
if(_e42.hasEntries()){
var self=this;
var map=new Map();
_e42.each(function(key,_e46){
_e46.each(function(node){
var _e48=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e48);
if(map.has(key)){
var _e49=map.get(key);
_e49.add(_e48);
_e49.isOpen=true;
}else{
if(key==self.node.getHandle()){
self._tree.add(_e48);
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
SystemPageBinding.prototype.handleAction=function(_e4a){
SystemPageBinding.superclass.handleAction.call(this,_e4a);
switch(_e4a.type){
case ButtonBinding.ACTION_COMMAND:
var _e4b=_e4a.target;
switch(_e4b.getID()){
case "locktreebutton":
this._tree.setLockToEditor(_e4b.isChecked);
break;
case "collapsebutton":
this._tree.collapse();
break;
}
break;
}
};
SystemPageBinding.prototype.handleBroadcast=function(_e4c,arg){
SystemPageBinding.superclass.handleBroadcast.call(this,_e4c,arg);
switch(_e4c){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _e4e=arg;
if(this.node&&this.node.getEntityToken()==_e4e){
try{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,_e4e);
var self=this;
Application.lock(this);
setTimeout(function(){
self._refreshTree();
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,_e4e);
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
StageContainerBinding.prototype.handleBroadcast=function(_e50,arg){
StageContainerBinding.superclass.handleBroadcast.call(this,_e50,arg);
var _e52=this.bindingWindow.WindowManager;
switch(_e50){
case BroadcastMessages.APPLICATION_OPERATIONAL:
this.subscribe(_e52.WINDOW_RESIZED_BROADCAST);
this._fit();
this.reflex();
break;
case _e52.WINDOW_RESIZED_BROADCAST:
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
var _e54=this.bindingWindow.WindowManager;
this.bindingElement.style.width=_e54.getWindowDimensions().w+"px";
};
StageBinding.prototype=new FocusBinding;
StageBinding.prototype.constructor=StageBinding;
StageBinding.superclass=FocusBinding.prototype;
StageBinding.bindingInstance=null;
StageBinding.perspectiveNode=null;
StageBinding.entityToken=null;
StageBinding.treeSelector=null;
StageBinding.handleViewPresentation=function(_e55){
if(StageBinding.isViewOpen(_e55)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_e55);
}else{
var _e56=ViewDefinitions[_e55];
StageBinding.presentViewDefinition(_e56);
}
};
StageBinding.isViewOpen=function(_e57){
return StageBinding.bindingInstance._activeViewDefinitions[_e57]!=null;
};
StageBinding.presentViewDefinition=function(_e58){
if(_e58.label!=null){
var _e59=StringBundle.getString("ui","Website.App.StatusBar.Opening");
StatusBar.busy(_e59,[_e58.label]);
}else{
StatusBar.busy();
}
StageBinding.bindingInstance._presentViewDefinition(_e58);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,{handleBroadcast:function(_e5b,arg){
if(arg==root.getEntityToken()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
}
}});
var _e5d=System.getPerspectiveNodes();
if(_e5d.hasEntries()){
this._initializeSystemViewDefinitions(_e5d);
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
var _e5f=null;
if(LocalStore.isEnabled){
_e5f=LocalStore.getProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE);
}
if(_e5f&&ViewDefinitions[_e5f]){
alert("StageBinding#_initializeWorkbenchLayout !!!!");
this._explorerBinding.setSelectionByHandle(unescape(_e5f));
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
var _e61=root.getActionProfile();
if(_e61&&_e61.hasEntries()){
var _e62=top.app.bindingMap.toolsmenugroup;
if(_e62){
_e61.each(function(_e63,list){
list.each(function(_e65){
var item=MenuItemBinding.newInstance(_e62.bindingDocument);
item.setLabel(_e65.getLabel());
item.setToolTip(_e65.getToolTip());
item.setImage(_e65.getImage());
item.setDisabled(_e65.isDisabled());
item.associatedSystemAction=_e65;
var _e67=_e62;
var tag=_e65.getTag();
if(tag!=null){
switch(tag){
case SystemAction.TAG_CHANGEFROMLANGUAGE:
_e67=top.app.bindingMap.translationsmenugroup;
break;
}
}
_e67.add(item);
});
});
_e62.attachRecursive();
}
}
};
StageBinding.prototype._initializeSystemViewDefinitions=function(_e69){
while(_e69.hasNext()){
var node=_e69.getNext();
var _e6b=node.getHandle();
ViewDefinitions[_e6b]=new SystemViewDefinition(node);
}
};
StageBinding.prototype.handleAction=function(_e6c){
StageBinding.superclass.handleAction.call(this,_e6c);
var _e6d=_e6c.target;
switch(_e6c.type){
case StageDecksBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._decksBinding=_e6d;
this._inflateBinding(_e6d);
_e6c.consume();
break;
case ExplorerBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._explorerBinding=_e6d;
this._inflateBinding(_e6d);
_e6c.consume();
break;
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
if(!Application.isOperational){
ProgressBarBinding.notch(5);
}
this.handlePerspectiveChange(_e6d);
_e6c.consume();
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_e6d instanceof DockBinding){
switch(_e6d.reference){
case DockBinding.START:
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
this._dockBindings.set(_e6d.reference,_e6d);
break;
}
this.handleAttachedDock(_e6d);
_e6c.consume();
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_e6d instanceof DockBinding){
this.handleSelectedDockTab(_e6d.getSelectedTabBinding());
_e6c.consume();
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
_e6c.consume();
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
_e6c.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_e6c);
};
StageBinding.prototype.handleBroadcast=function(_e6f,arg){
StageBinding.superclass.handleBroadcast.call(this,_e6f,arg);
switch(_e6f){
case BroadcastMessages.VIEW_OPENED:
Application.unlock(this);
break;
case BroadcastMessages.VIEW_CLOSED:
var _e71=arg;
this._dontView(_e71);
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
StageBinding.prototype._showStart=function(_e73){
if(_e73!=this._isShowingStart){
var view=ViewBinding.getInstance("Composite.Management.Start");
var dock=this._dockBindings.get(DockBinding.START);
var _e76=this.bindingWindow.bindingMap.maindecks;
if(_e73){
_e76.select("startdeck");
view.show();
}else{
view.hide();
_e76.select("stagedeck");
if(dock!=null&&dock.isActive){
dock.deActivate();
}
}
this._isShowingStart=_e73;
}
};
StageBinding.prototype._inflateBinding=function(_e77){
for(var _e78 in ViewDefinitions){
var _e79=ViewDefinitions[_e78];
if(_e79 instanceof SystemViewDefinition){
_e77.mountDefinition(_e79);
}
}
var _e7a=(this._decksBinding!=null&&this._explorerBinding!=null);
if(_e7a){
var self=this;
setTimeout(function(){
self._renameThisMethod();
},0);
}
};
StageBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _e7d=new StageCrawler();
_e7d.mode=mode;
_e7d.crawl(this.bindingElement);
_e7d.dispose();
};
StageBinding.prototype.handlePerspectiveChange=function(_e7e){
var _e7f=_e7e.getSelectionHandle();
this._decksBinding.setSelectionByHandle(_e7f);
if(LocalStore.isEnabled){
LocalStore.setProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE,escape(_e7f));
}
};
StageBinding.prototype.handleAttachedDock=function(_e80){
var _e81=_e80.getTabBindings();
if(_e81.hasEntries()){
while(_e81.hasNext()){
var _e82=_e81.getNext();
var _e83=_e82.getHandle();
if(_e83){
if(_e83=="Composite.Management.Start"&&(!Application.hasStartPage||!Application.hasExternalConnection)){
}else{
var _e84=ViewDefinitions[_e83];
if(_e84){
this._view(_e80,_e82,_e84,false);
}else{
alert("StageBinding: no such predefined viewdefinition ("+_e83+")");
}
}
}
}
}
};
StageBinding.prototype._presentViewDefinition=function(_e85){
var _e86=null;
var _e87=false;
switch(_e85.position){
case Dialog.MODAL:
_e86=app.bindingMap.masterdialogset.getModalInstance();
break;
case Dialog.NON_MODAL:
_e86=app.bindingMap.masterdialogset.getInstance();
break;
default:
if(this._dockBindings.hasEntries()){
switch(_e85.position){
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
_e86=this._dockBindings.get(_e85.position);
break;
default:
var _e88=this._decksBinding.getSelectedDeckBinding();
_e86=_e88.getDockBindingByReference(_e85.position);
if(this._isShowingStart){
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}else{
if(this._isShowingDefaultStart){
var _e89=this.bindingWindow.bindingMap.maindecks;
_e89.select("stagedeck");
this._isShowingDefaultStart=false;
}
}
break;
}
}else{
_e87=true;
}
break;
}
if(!_e87){
if(_e86!=null){
this._view(_e86,null,_e85,true);
}else{
throw "StageBinding: Could not position view: "+_e85.handle;
}
}
};
StageBinding.prototype._view=function(_e8a,_e8b,_e8c,_e8d){
var _e8e=_e8c.handle;
if(_e8c.isMutable){
_e8e+=KeyMaster.getUniqueKey();
}
if(this._activeViewDefinitions[_e8e]){
var _e8f=ViewBinding.getInstance(_e8e);
if(_e8f!=null){
_e8f.update();
}else{
this.logger.error("Could not update ViewBinding (declared open): \n"+_e8e);
}
}else{
this._activeViewDefinitions[_e8e]=_e8c;
Application.lock(this);
switch(_e8a.constructor){
case DockBinding:
if(_e8d){
_e8a.prepareNewView(_e8c);
}else{
_e8a.prepareOpenView(_e8c,_e8b);
}
break;
case StageDialogBinding:
if(_e8d){
_e8a.prepareNewView(_e8c);
}
break;
}
}
};
StageBinding.prototype._dontView=function(_e90){
if(this._activeViewDefinitions[_e90]!=null){
delete this._activeViewDefinitions[_e90];
}else{
this.logger.debug("Could not unregister active view: "+_e90);
}
};
StageBinding.prototype.handleSelectedDockTab=function(_e91){
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
this.addFilter(function(_e93){
var _e94=UserInterface.getBinding(_e93);
var _e95=null;
if(_e94){
switch(_e94.constructor){
case StageSplitBoxBinding:
case StageSplitPanelBinding:
case StageSplitterBinding:
switch(self.mode){
case StageCrawler.MODE_MAXIMIZE:
_e94.handleMaximization();
break;
case StageCrawler.MODE_UNMAXIMIZE:
_e94.handleUnMaximization();
break;
}
break;
case DockBinding:
_e95=NodeCrawler.SKIP_NODE;
break;
}
}
return _e95;
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
var _e96=null;
this._dialogs.each(function(_e97){
if(!_e97.isVisible){
_e96=_e97;
}
return _e96!=null;
});
if(!_e96){
this._newInstance();
_e96=this._dialogs.getLast();
}
_e96.setModal(false);
return _e96;
};
StageDialogSetBinding.prototype.getModalInstance=function(){
var _e98=this.getInstance();
_e98.setModal(true);
return _e98;
};
StageDialogSetBinding.prototype._newInstance=function(){
var _e99=this.add(StageDialogBinding.newInstance(this.bindingDocument));
this._dialogs.add(_e99);
_e99.attach();
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
StageDialogBinding.prototype.prepareNewView=function(_e9a){
if(_e9a instanceof DialogViewDefinition){
var _e9b=ViewBinding.newInstance(this.bindingDocument);
_e9b.setDefinition(_e9a);
_e9b.setType(ViewBinding.TYPE_DIALOGVIEW);
if(_e9a.handler){
if(Interfaces.isImplemented(IDialogResponseHandler,_e9a.handler)){
this._dialogResponseHandler=_e9a.handler;
}else{
throw "IDialogResponseHandler not implemented";
}
}
this._viewBinding=_e9b;
this._body.add(_e9b);
_e9b.attach();
_e9b.initialize();
}
};
StageDialogBinding.prototype.handleAction=function(_e9c){
StageDialogBinding.superclass.handleAction.call(this,_e9c);
var _e9d=_e9c.target;
switch(_e9c.type){
case PageBinding.ACTION_INITIALIZED:
this._handleInitializedPageBinding(_e9d);
_e9c.consume();
break;
case PageBinding.ACTION_DETACHED:
if(_e9d.bindingDocument==this._viewBinding.getContentDocument()){
this._pageBinding=null;
}
_e9c.consume();
break;
case DialogPageBinding.ACTION_RESPONSE:
if(_e9d.response){
this._handleDialogPageResponse(_e9d);
}
_e9c.consume();
break;
case Binding.ACTION_INVALID:
this._disableDialogAcceptButton(true);
_e9c.consume();
break;
case Binding.ACTION_VALID:
this._disableDialogAcceptButton(false);
_e9c.consume();
break;
case ViewBinding.ACTION_ONCLOSE:
this.close();
_e9d.dispose();
_e9c.consume();
break;
case ViewBinding.ACTION_CLOSED:
this._isFirstPage=true;
_e9c.consume();
break;
case ErrorBinding.ACTION_INITIALIZE:
_e9c.consume();
break;
case PageBinding.ACTION_UPDATING:
this._isUpdating=true;
_e9c.consume();
break;
case PageBinding.ACTION_UPDATED:
if(this._isUpdating){
this._isUpdating=false;
this._fit();
}
_e9c.consume();
break;
case Binding.ACTION_UPDATED:
if(!this._isUpdating){
this._fit();
}
_e9c.consume();
break;
case DialogBinding.ACTION_CLOSE:
if(_e9d==this){
this._viewBinding.dispose();
this.defaultSetup();
}
break;
}
};
StageDialogBinding.prototype.handleBroadcast=function(_e9e,arg){
StageDialogBinding.superclass.handleBroadcast.call(this,_e9e,arg);
switch(_e9e){
case BroadcastMessages.KEY_ESCAPE:
if(this.isVisible==true){
if(!PopupBinding.hasActiveInstances()){
this._defaultClose();
}
}
break;
}
};
StageDialogBinding.prototype._fit=function(_ea0){
var _ea1=new FitnessCrawler();
var list=new List();
if(_ea0){
_ea1.mode=FitnessCrawler.MODE_BRUTAL;
}
_ea1.crawl(this.bindingElement,list);
_ea1.dispose();
if(list.hasEntries()){
list.reverse();
list.each(function(_ea3){
_ea3.fit(_ea0);
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
var _ea4=this.getDimension().h;
this.reflex(true);
var self=this;
if(this.getDimension().h==_ea4){
var self=this;
setTimeout(function(){
self.reflex(true);
},0);
}
}
};
StageDialogBinding.prototype._handleContextMenuItemBinding=function(_ea6){
var cmd=_ea6.getProperty("cmd");
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
StageDialogBinding.prototype._handleInitializedPageBinding=function(_ea8){
if(_ea8.bindingDocument==this._viewBinding.getContentDocument()){
if(_ea8 instanceof DialogPageBinding){
if(this._pageBinding==null){
this._parsePageBinding(_ea8);
}
this._pageBinding=_ea8;
if(_ea8.height=="auto"){
_ea8.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_ea8);
_ea8.enableAutoHeightLayoutMode(false);
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
if(_ea8.isDialogSubPage){
this._pageBinding.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_ea8);
this._pageBinding.enableAutoHeightLayoutMode(false);
this._fit(true);
this.reflex(true);
}
}
this._isFirstPage=false;
};
StageDialogBinding.prototype._disableDialogAcceptButton=function(_ea9){
var _eaa=this._viewBinding.getContentDocument().getElementById("dialogacceptbutton");
if(_eaa){
var _eab=UserInterface.getBinding(_eaa);
_eab.setDisabled(_ea9);
}
};
StageDialogBinding.prototype._handleDialogPageResponse=function(_eac){
if(this._dialogResponseHandler!=null){
this._dialogResponseHandler.handleDialogResponse(_eac.response,_eac.result!=null?_eac.result:null);
}
this.close();
};
StageDialogBinding.prototype.handleInvokedControl=function(_ead){
if(_ead.controlType==ControlBinding.TYPE_CLOSE){
this._defaultClose();
}
StageDialogBinding.superclass.handleInvokedControl.call(this,_ead);
};
StageDialogBinding.prototype.buildDescendantBindings=function(){
StageDialogBinding.superclass.buildDescendantBindings.call(this);
this._titlebar.setContextMenu(app.bindingMap.dialogtitlebarpopup);
var self=this;
this._titlebar.handleAction=function(_eaf){
switch(_eaf.type){
case MenuItemBinding.ACTION_COMMAND:
if(_eaf.listener==this.contextMenuBinding){
self._handleContextMenuItemBinding(_eaf.target);
}
break;
}
};
};
StageDialogBinding.prototype._parsePageBinding=function(_eb0){
var _eb1=_eb0.label;
var _eb2=_eb0.image;
var _eb3=_eb0.width;
var _eb4=_eb0.height;
var _eb5=_eb0.controls;
var _eb6=_eb0.isResizable;
if(_eb1){
this.setLabel(_eb1);
}
if(_eb2){
this.setImage(_eb2);
}
if(_eb3||_eb4){
var old=this.getDimension();
var nev=new Dimension();
if(this._isFirstPage){
nev.w=_eb3?_eb3:old.w;
}else{
nev.w=old.w;
}
nev.h=(_eb4!=null&&_eb4!="auto")?_eb4:old.h;
this.setDimension(nev);
}
if(_eb5){
this.controlBindings[ControlBinding.TYPE_MAXIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_MINIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_CLOSE].hide();
var type,_eba=new List(_eb5.split(" "));
while((type=_eba.getNext())!=null){
this.controlBindings[type].show();
}
}
if(_eb6!=this._isResizable){
this.setResizable(_eb6);
}
if(_eb4=="auto"){
this._fixAutoHeight(_eb0);
}
if(_eb0==this._pageBinding){
this.centerOnScreen();
}
if(!this.isOpen){
this.reflex(true);
this.open(true);
}
};
StageDialogBinding.prototype._fixAutoHeight=function(_ebb){
var dim=this.getDimension();
var _ebd=0;
var _ebe=0;
if(_ebb.isDialogSubPage){
_ebb=this._pageBinding;
}
if(this._isFirstPage){
_ebd=_ebb.width!=null?_ebb.width:dim.w;
}else{
_ebd=dim.w;
}
_ebe=_ebb.bindingElement.offsetHeight;
_ebe+=this._titlebar.bindingElement.offsetHeight;
_ebe+=4;
if(_ebe<dim.h){
_ebe=dim.h;
}
if(_ebb.minheight!=null){
if(_ebe<_ebb.minheight){
_ebe=_ebb.minheight;
}
}
this.setDimension(new Dimension(_ebd,_ebe));
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
StageDialogBinding.newInstance=function(_ec1){
var _ec2=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_ec1);
var _ec3=UserInterface.registerBinding(_ec2,StageDialogBinding);
_ec3.setProperty("controls","minimize maximize close");
return _ec3;
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
this.addFilter(function(_ec4,list){
var _ec6=null;
var _ec7=UserInterface.getBinding(_ec4);
if(!_ec7.isVisible){
_ec6=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _ec6;
});
this.addFilter(function(_ec8,list){
var _eca=null;
var _ecb=UserInterface.getBinding(_ec8);
if(_ecb.isAttached){
if(Interfaces.isImplemented(IFit,_ecb)){
if(!_ecb.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_ecb);
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
StageDecksBinding.prototype.mountDefinition=function(_ecc){
var _ecd=StageDeckBinding.newInstance(this.bindingDocument);
_ecd.handle=_ecc.handle;
_ecd.perspectiveNode=_ecc.node;
this._decks[_ecd.handle]=_ecd;
this.add(_ecd);
_ecd.attach();
};
StageDecksBinding.prototype.setSelectionByHandle=function(_ece){
var _ecf=this._decks[_ece];
StageBinding.perspectiveNode=_ecf.perspectiveNode;
this.select(_ecf);
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
StageDeckBinding.prototype.handleAction=function(_ed0){
StageDeckBinding.superclass.handleAction.call(this,_ed0);
var _ed1=_ed0.target;
switch(_ed0.type){
case WindowBinding.ACTION_LOADED:
if(_ed1==this.windowBinding){
top.app.bindingMap.stagedeckscover.hide();
this.removeActionListener(WindowBinding.ACTION_LOADED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_OPENED);
this.dispatchAction(StageDeckBinding.ACTION_LOADED);
_ed0.consume();
}
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_ed1 instanceof DockBinding){
this._dockBindings.set(_ed1.reference,_ed1);
_ed1.perspectiveNode=this.perspectiveNode;
}
break;
case StageSplitBoxBinding.ACTION_DOCK_OPENED:
this._dockBindingCount++;
if(this._dockBindingCount==2){
this._dockBindings.get("main").showControls(true);
}
_ed0.consume();
break;
case StageSplitBoxBinding.ACTION_DOCK_EMPTIED:
this._dockBindingCount--;
if(this._dockBindingCount==1){
this._dockBindings.get("main").showControls(false);
}
_ed0.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_ed0);
StageDeckBinding.superclass.handleAction.call(this,_ed0);
};
StageDeckBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _ed3=new StageCrawler();
_ed3.mode=mode;
_ed3.crawl(this.windowBinding.getContentDocument().body);
_ed3.dispose();
};
StageDeckBinding.prototype.select=function(){
if(!this._isStageDeckBindingInitialized){
this.initialize();
}
StageDeckBinding.superclass.select.call(this);
};
StageDeckBinding.prototype.getDockBindingByReference=function(_ed4){
return this._dockBindings.get(_ed4);
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
StageDeckBinding.newInstance=function(_ed6){
var _ed7=DOMUtil.createElementNS(Constants.NS_UI,"ui:stagedeck",_ed6);
var _ed8=UserInterface.registerBinding(_ed7,StageDeckBinding);
return _ed8;
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
StageSplitBoxBinding.prototype.handleAction=function(_ed9){
StageSplitBoxBinding.superclass.handleAction.call(this,_ed9);
StageBoxAbstraction.handleAction.call(this,_ed9);
var _eda=_ed9.target;
var _edb=null;
var _edc=null;
switch(_ed9.type){
case DockBinding.ACTION_EMPTIED:
_edc=this.getChildBindingByLocalName("splitter");
if(_edc.isVisible){
_edc.hide();
}
_edb=this.getDescendantBindingsByLocalName("dock");
if(_edb.getFirst().isEmpty&&_edb.getLast().isEmpty){
if(_edb.getFirst().type!=DockBinding.TYPE_EDITORS){
this.dispatchAction(StageSplitBoxBinding.ACTION_HIDE);
this.hide();
}
}else{
this.flex();
this.invokeLayout();
}
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
_ed9.consume();
break;
case DockBinding.ACTION_OPENED:
_edb=this.getDescendantBindingsByLocalName("dock");
if(!_edb.getFirst().isEmpty&&!_edb.getLast().isEmpty){
_edc=this.getChildBindingByLocalName("splitter");
if(!_edc.isVisible){
_edc.show();
}
}
if(!this.isVisible){
this.show();
this.dispatchAction(StageSplitBoxBinding.ACTION_SHOW);
}
this.flex();
this.invokeLayout();
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_OPENED);
_ed9.consume();
break;
case StageSplitBoxBinding.ACTION_HIDE:
if(_eda!=this){
_edc=this.getChildBindingByLocalName("splitter");
if(_edc.isVisible){
_edc.hide();
}
this.invokeLayout();
_ed9.consume();
}
break;
case StageSplitBoxBinding.ACTION_SHOW:
if(_eda!=this){
var _edd=this.getChildBindingsByLocalName("splitpanel");
if(_edd.getFirst().isVisible&&_edd.getLast().isVisible){
_edc=this.getChildBindingByLocalName("splitter");
if(!_edc.isVisible){
_edc.show();
}
}
this.invokeLayout();
_ed9.consume();
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
StageSplitBoxBinding.prototype.handleCrawler=function(_ede){
StageSplitBoxBinding.superclass.handleCrawler.call(this,_ede);
switch(_ede.id){
case FlexBoxCrawler.ID:
if(this.isMaximizedForReal==false){
_ede.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
};
StageSplitBoxBinding.prototype.hasBothPanelsVisible=function(){
var _edf=this.getChildBindingsByLocalName("splitpanel");
return _edf.getFirst().isVisible&&_edf.getLast().isVisible;
};
StageSplitBoxBinding.prototype.hasBothPanelsFixed=function(){
var _ee0=this.getChildBindingsByLocalName("splitpanel");
return _ee0.getFirst().isFixed&&_ee0.getLast().isFixed;
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
StageSplitPanelBinding.prototype.handleAction=function(_ee1){
StageSplitPanelBinding.superclass.handleAction.call(this,_ee1);
StageBoxAbstraction.handleAction.call(this,_ee1);
switch(_ee1.type){
case DockBinding.ACTION_EMPTIED:
case StageSplitBoxBinding.ACTION_HIDE:
if(this.isMaximized==true){
this.normalize();
}
var dock=this.getContainedDock();
if(dock&&dock.type==DockBinding.TYPE_EDITORS){
this._invisibilize(true);
if(_ee1.type==StageSplitBoxBinding.ACTION_HIDE){
_ee1.consume();
}
}else{
this.hide();
if(this.isFixed==true){
this.setFix(false);
}
}
if(_ee1.type==DockBinding.ACTION_EMPTIED){
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
if(_ee1.type==StageSplitBoxBinding.ACTION_SHOW){
_ee1.consume();
}
}else{
this.show();
if(this.isFixed==true){
this.setFix(false);
}
}
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
var _ee4=_ee1.target;
if(_ee4!=this&&_ee4.getContainedDock()){
if(this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_VERTICAL){
var _ee5=_ee4._containingSplitBoxBinding;
if(_ee5.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL){
var _ee6=_ee5.getChildBindingsByLocalName("splitpanel");
var _ee7=_ee6.getFirst();
var _ee8=_ee6.getLast();
if(this.isFixed==true){
if(!_ee7.isFixed||!_ee8.isFixed||(!_ee5.hasBothPanelsVisible()&&_ee4.isMinimizedForReal)){
this.setFix(false);
_ee1.consume();
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
}
}else{
if(_ee5.hasBothPanelsFixed()||(!_ee5.hasBothPanelsVisible()&&_ee4.isMinimizedForReal)){
this.setFix(_ee4.getContainedDock().getHeight());
_ee1.consume();
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
var _ee9=this.getContainedDock();
if(_ee9){
if(this.isMaximizePrepared==true){
}else{
_ee9.interceptDisplayChange(false);
}
}
};
StageSplitPanelBinding.prototype.handleUnMaximization=function(){
StageBoxAbstraction.handleUnMaximization.call(this);
var _eea=this.getContainedDock();
if(_eea){
if(_eea.type==DockBinding.TYPE_EDITORS){
if(_eea.isEmpty){
this._invisibilize(true);
}
}
if(this.isMaximized==true){
this.normalize();
}else{
_eea.interceptDisplayChange(true);
}
}
};
StageSplitPanelBinding.prototype.maximize=function(){
if(this.isMinimized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.maximize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
var _eeb=this.getContainedDock();
if(_eeb){
_eeb.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MAXIMIZED,_eeb);
}
};
StageSplitPanelBinding.prototype.minimize=function(){
var _eec=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _eed=this.getContainedDock();
if(_eed){
_eed.collapse(_eec);
if(!_eec){
this.setFix(_eed.getHeight());
}else{
this.setFix(_eed.getWidth());
}
}
if(this.isMaximized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.minimize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_eed&&_eed.isActive){
_eed.deActivate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MINIMIZED,_eed);
}
};
StageSplitPanelBinding.prototype.normalize=function(_eee){
var _eef=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _ef0=this.getContainedDock();
if(_ef0){
if(this.isMinimized==true){
_ef0.unCollapse(_eef);
this.setFix(false);
}
}
StageSplitPanelBinding.superclass.normalize.call(this);
if(!_eee){
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_ef0){
_ef0.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_NORMALIZED,_ef0);
}
}
};
StageSplitPanelBinding.prototype.getContainedDock=function(){
return this.getChildBindingByLocalName("dock");
};
StageSplitPanelBinding.prototype.invisibilize=function(_ef1){
var _ef2=true;
var dock=this.getContainedDock();
if(dock!=null&&dock.type==DockBinding.TYPE_EDITORS){
if(dock.isEmpty==true){
_ef2=false;
}
}
if(_ef2==true){
this._invisibilize(_ef1);
}
};
StageSplitPanelBinding.prototype._invisibilize=function(_ef4){
if(_ef4!=this._isInvisibilized){
if(_ef4){
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
StageSplitterBinding.prototype.onDragStart=function(_ef5){
var _ef6=top.app.bindingMap.stagesplittercover;
var _ef7=this._containingSplitBoxBinding.getOrient();
switch(_ef7){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_ef6.bindingElement.style.cursor="e-resize";
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_ef6.bindingElement.style.cursor="n-resize";
break;
}
_ef6.show();
var body=top.app.bindingMap.stagesplitterbody;
body.setPosition(this.getPosition());
body.setDimension(this.getDimension());
body.setOrient(_ef7);
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
StageSplitterBodyBinding.prototype.setOrient=function(_efd){
this._orient=_efd;
this.attachClassName(_efd);
};
StageSplitterBodyBinding.prototype.setPosition=function(pos){
var _eff=true;
var _f00=true;
switch(this._orient){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_f00=false;
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_eff=false;
break;
}
if(_eff){
this.bindingElement.style.left=pos.x+"px";
}
if(_f00){
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
StageBoxAbstraction.handleAction=function(_f02){
switch(_f02.type){
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
if(_f02.target instanceof DockBinding){
if(this.isHiddenForReal){
this.dispatchAction(StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED);
}else{
if(this.isMinimizedForReal){
this.normalize();
}
}
}
_f02.consume();
break;
}
};
StageBoxAbstraction.handleMaximization=function(){
if(this.isMaximizePrepared==true){
this.isMaximizedForReal=true;
this.isHiddenForReal=false;
this.isFlexible=false;
if(Client.isMozilla==true){
var _f03=this.bindingElement.style;
_f03.position="absolute";
_f03.width="100%";
_f03.height="100%";
_f03.top="0";
_f03.left="0";
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
var _f04=this.bindingElement.style;
_f04.position="relative";
_f04.width="auto";
_f04.height="auto";
_f04.top="auto";
_f04.left="auto";
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
StageBoxAbstraction._emulateBasicCSS=function(_f05,_f06){
var _f07=_f05.bindingElement.style;
var _f08=_f05.bindingElement.parentNode;
var box=_f05._containingSplitBoxBinding;
if(Client.isExplorer==true){
if(_f06){
_f05._unmodifiedFlexMethod=_f05.flex;
_f05.flex=function(){
_f07.width=_f08.offsetWidth+"px";
_f07.height=_f08.offsetHeight+"px";
};
}else{
_f07.width="100%";
_f07.height="100%";
if(!box.isHorizontalOrient()){
setTimeout(function(){
_f07.width="auto";
_f07.height="auto";
box.reflex(true);
},0);
}
_f05.flex=_f05._unmodifiedFlexMethod;
_f05._unmodifiedFlexMethod=null;
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
StageBoxHandlerAbstraction.handleAction=function(_f0a){
var _f0b=_f0a.target;
switch(_f0a.type){
case ControlBoxBinding.ACTION_MAXIMIZE:
case ControlBoxBinding.ACTION_NORMALIZE:
if(_f0b instanceof StageSplitPanelBinding){
StageBoxHandlerAbstraction.handleControlBoxAction.call(this,_f0a);
_f0a.consume();
}
break;
case StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED:
if(this.isSubPanelMaximized){
this.iterateContainedStageBoxBindings(StageCrawler.MODE_UNMAXIMIZE);
this.isSubPanelMaximized=false;
}
_f0a.consume();
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
break;
}
};
StageBoxHandlerAbstraction.handleControlBoxAction=function(_f0c){
var mode=null;
switch(_f0c.type){
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
StageMenuBarBinding.prototype.handleAction=function(_f0e){
StageMenuBarBinding.superclass.handleAction.call(this,_f0e);
switch(_f0e.type){
case MenuItemBinding.ACTION_COMMAND:
var _f0f=_f0e.target.associatedSystemAction;
if(Application.isLoggedIn){
if(!this._rootNode){
this._rootNode=System.getRootNode();
}
if(_f0f){
SystemAction.invoke(_f0f,this._rootNode);
}
}
_f0e.consume();
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
var _f10=this.getProperty("handle");
if(_f10){
this._handle=_f10;
if(StageBinding.isViewOpen(_f10)){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
this.check(true);
}
}
this.oncommand=function(){
var self=this;
Application.lock(self);
setTimeout(function(){
StageBinding.handleViewPresentation(_f10);
Application.unlock(self);
},Client.hasTransitions?Animation.DEFAULT_TIME:0);
};
}else{
throw new Error("StageViewMenuItemBinding: missing handle");
}
};
StageViewMenuItemBinding.prototype.setHandle=function(_f12){
this.setProperty("handle",_f12);
};
StageViewMenuItemBinding.prototype.handleBroadcast=function(_f13,arg){
StageViewMenuItemBinding.superclass.handleBroadcast.call(this,_f13,arg);
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
switch(_f13){
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
StageViewMenuItemBinding.newInstance=function(_f15){
var _f16=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_f15);
UserInterface.registerBinding(_f16,StageViewMenuItemBinding);
return UserInterface.getBinding(_f16);
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
StageStatusBarBinding.prototype.setLabel=function(_f17){
this._label.setLabel(_f17);
};
StageStatusBarBinding.prototype.setImage=function(_f18){
this._label.setImage(_f18);
};
StageStatusBarBinding.prototype.clear=function(){
this._label.setLabel(null);
this._label.setImage(false);
};
StageStatusBarBinding.prototype.startFadeOut=function(_f19){
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
var _f1a=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _f1b=_f1a.getAssociatedView();
var _f1c=_f1b.getContentWindow().bindingMap.tree;
var _f1d=_f1c.getFocusedTreeNodeBindings();
if(!_f1d.hasEntries()&&StageBinding.treeSelector){
_f1d=StageBinding.treeSelector.getFocusedTreeNodeBindings();
}
return _f1d;
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
ExplorerBinding.prototype.handleAction=function(_f1e){
ExplorerBinding.superclass.handleAction.call(this,_f1e);
var _f1f=_f1e.target;
switch(_f1e.type){
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
this._decksBinding.setSelectionByHandle(this._menuBinding.getSelectionHandle());
var tag=this._menuBinding.getSelectionTag();
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVE_CHANGED,tag);
break;
case ViewBinding.ACTION_LOADED:
this.dispatchAction(ExplorerBinding.ACTION_DECK_LOADED);
_f1e.consume();
break;
case Binding.ACTION_DRAG:
if(_f1f instanceof ExplorerSplitterBinding){
_f1f.dragger.registerHandler(this);
}
_f1e.consume();
}
};
ExplorerBinding.prototype.setSelectionByHandle=function(_f21){
this._menuBinding.setSelectionByHandle(_f21);
};
ExplorerBinding.prototype.setSelectionDefault=function(){
this._menuBinding.setSelectionDefault();
};
ExplorerBinding.prototype.getSelectedDeckBinding=function(){
return this._decksBinding.getSelectedDeckBinding();
};
ExplorerBinding.prototype.mountDefinition=function(_f22){
if(_f22 instanceof SystemViewDefinition){
this._decksBinding.mountDefinition(_f22);
this._menuBinding.mountDefinition(_f22);
}
};
ExplorerBinding.prototype.onDragStart=function(_f23){
var _f24=this._menuBinding.getDescendantBindingsByLocalName("explorertoolbarbutton");
if(_f24.hasEntries()){
var _f25=_f24.getFirst();
this._dragStart=_f25.boxObject.getLocalPosition().y;
this._dragSlot=0;
if(this._dragHeight==0){
this._dragHeight=_f25.boxObject.getDimension().h;
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
ExplorerDecksBinding.prototype.mountDefinition=function(_f29){
if(_f29 instanceof SystemViewDefinition){
var _f2a=ViewBinding.newInstance(this.bindingDocument);
_f2a.setType(ViewBinding.TYPE_EXPLORERVIEW);
_f2a.setDefinition(_f29);
var _f2b=ExplorerDeckBinding.newInstance(this.bindingDocument);
_f2b.setAssociatedView(_f2a);
this._decks[_f29.handle]=_f2b;
_f2b.add(_f2a);
this.add(_f2b);
function attach(){
_f2b.attach();
_f2a.attach();
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
ExplorerDecksBinding.prototype.setSelectionByHandle=function(_f2c){
var _f2d=this._decks[_f2c];
this.select(_f2d);
};
DecksBinding.prototype.expandBy=function(_f2e){
var deck=this.getSelectedDeckBinding();
if(deck){
var _f30=this.bindingElement.offsetHeight+_f2e;
var view=deck.getAssociatedView();
this.bindingElement.style.height=_f30+"px";
this.reflex(true);
}
};
ExplorerDecksBinding.newInstance=function(_f32){
var _f33=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdecks",_f32);
return UserInterface.registerBinding(_f33,ExplorerDecksBinding);
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
ExplorerDeckBinding.prototype.setAssociatedView=function(_f34){
this._viewBinding=_f34;
};
ExplorerDeckBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
ExplorerDeckBinding.prototype.select=function(){
if(!this._isExplorerDeckBindingInitialized){
Application.lock(this);
var _f35=StringBundle.getString("ui","Website.App.StatusBar.Loading");
var _f36=this._viewBinding.getDefinition().label;
StatusBar.busy(_f35,[_f36]);
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
ExplorerDeckBinding.prototype.handleAction=function(_f37){
ExplorerDeckBinding.superclass.handleAction.call(this,_f37);
var _f38=_f37.target;
switch(_f37.type){
case PageBinding.ACTION_INITIALIZED:
if(_f38 instanceof SystemPageBinding){
this._isExplorerDeckBindingInitialized=true;
this._entityToken=_f38.node.getEntityToken();
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
ExplorerDeckBinding.prototype.handleBroadcast=function(_f39,arg){
ExplorerDeckBinding.superclass.handleBroadcast.call(this,_f39,arg);
switch(_f39){
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
var _f3b=null;
if(this._isExplorerDeckBindingInitialized){
_f3b=this._viewBinding.getDefinition().label;
}else{
_f3b=DockTabBinding.LABEL_TABLOADING;
}
return _f3b;
};
ExplorerDeckBinding.prototype.getImage=function(){
var _f3c=null;
if(this._isExplorerDeckBindingInitialized){
_f3c=this._viewBinding.getDefinition().image;
}else{
_f3c=DockTabBinding.IMG_TABLOADING;
}
return _f3c;
};
ExplorerDeckBinding.prototype.getToolTip=function(){
var _f3d=null;
if(this._isExplorerDeckBindingInitialized){
_f3d=this._viewBinding.getDefinition().toolTip;
}
return _f3d;
};
ExplorerDeckBinding.newInstance=function(_f3e){
var _f3f=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdeck",_f3e);
return UserInterface.registerBinding(_f3f,ExplorerDeckBinding);
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
ExplorerMenuBinding.prototype.onMemberInitialize=function(_f40){
switch(_f40.constructor){
case ExplorerToolBarBinding:
this._maxGroup=_f40.getToolBarGroupByIndex(0);
break;
case ToolBarBinding:
this._minGroup=_f40.getToolBarGroupByIndex(0);
break;
}
ExplorerMenuBinding.superclass.onMemberInitialize.call(this,_f40);
};
ExplorerMenuBinding.prototype.mountDefinition=function(_f41){
this._maxButtons.set(_f41.handle,this._mountMaxButton(_f41));
this._minButtons.set(_f41.handle,this._mountMinButton(_f41));
this._index++;
};
ExplorerMenuBinding.prototype._mountMaxButton=function(_f42){
var _f43=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_LARGE);
_f43.setLabel(_f42.label);
_f43.setToolTip(_f42.toolTip);
_f43.handle=_f42.handle;
_f43.node=_f42.node;
this._maxGroup.add(_f43);
this._maxList.add(_f43);
_f43.attach();
return _f43;
};
ExplorerMenuBinding.prototype._mountMinButton=function(_f44){
var _f45=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_NORMAL);
_f45.setLabel(_f44.label);
_f45.setToolTip(_f44.label);
_f45.handle=_f44.handle;
_f45.node=_f44.node;
this._minGroup.addFirst(_f45);
this._minList.add(_f45);
_f45.attach();
_f45.hide();
return _f45;
};
ExplorerMenuBinding.prototype.handleAction=function(_f46){
ExplorerMenuBinding.superclass.handleAction.call(this,_f46);
switch(_f46.type){
case RadioGroupBinding.ACTION_SELECTIONCHANGED:
var _f47=_f46.target;
var _f48=_f47.getCheckedButtonBinding();
var _f49=_f48.handle;
switch(_f47){
case this._maxGroup:
this._minGroup.setCheckedButtonBinding(this._minButtons.get(_f49),true);
break;
case this._minGroup:
this._maxGroup.setCheckedButtonBinding(this._maxButtons.get(_f49),true);
break;
}
this._selectedHandle=_f49;
this._selectedTag=_f48.node.getTag();
this.dispatchAction(ExplorerMenuBinding.ACTION_SELECTIONCHANGED);
_f46.consume();
break;
}
};
ExplorerMenuBinding.prototype.setSelectionByHandle=function(_f4a){
var _f4b=this._maxButtons.get(_f4a);
if(_f4b){
_f4b.check();
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
var _f4c=false;
var max=this._maxList.getLength()-1;
if(!this._maxList.get(max).isVisible){
this._index++;
this._maxList.get(this._index).show();
this._minList.get(this._index).hide();
_f4c=true;
}
return _f4c;
};
ExplorerMenuBinding.prototype.showLess=function(){
var _f4e=false;
if(this._maxList.get(0).isVisible){
this._maxList.get(this._index).hide();
this._minList.get(this._index).show();
this._index--;
_f4e=true;
}
return _f4e;
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
ExplorerToolBarBinding.newInstance=function(_f4f){
var _f50=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorertoolbar",_f4f);
return UserInterface.registerBinding(_f50,ExplorerToolBarBinding);
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
var _f51=this.explorerToolBarButtonType==ExplorerToolBarButtonBinding.TYPE_LARGE;
var _f52=_f51?ToolBarBinding.IMAGESIZE_LARGE:ToolBarBinding.IMAGESIZE_NORMAL;
this.imageProfile=this.node.getImageProfile(_f52);
ExplorerToolBarButtonBinding.superclass.onBindingAttach.call(this);
};
ExplorerToolBarButtonBinding.newInstance=function(_f53,_f54){
var _f55=(_f54==ExplorerToolBarButtonBinding.TYPE_LARGE?"ui:explorertoolbarbutton":"ui:toolbarbutton");
var _f56=DOMUtil.createElementNS(Constants.NS_UI,_f55,_f53);
var _f57=UserInterface.registerBinding(_f56,ExplorerToolBarButtonBinding);
_f57.explorerToolBarButtonType=_f54;
return _f57;
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
EditorBinding.registerComponent=function(_f58,_f59){
var _f5a=EditorBinding._components;
var _f5b=EditorBinding._editors;
var key=_f59.key;
var _f5d=Interfaces.isImplemented(IWysiwygEditorComponent,_f58);
if(!_f5d){
_f5d=Interfaces.isImplemented(ISourceEditorComponent,_f58);
}
if(_f5d){
if(_f5b.has(key)){
_f5b.get(key).initializeEditorComponent(_f58);
}else{
if(!_f5a.has(key)){
_f5a.set(key,new List());
}
_f5a.get(key).add(_f58);
}
}else{
throw "Editor component interface not implemented: "+_f58;
}
};
EditorBinding.claimComponents=function(_f5e,_f5f){
var _f60=EditorBinding._components;
var _f61=EditorBinding._editors;
var key=_f5f.key;
_f61.set(key,_f5e);
var list=null;
if(_f60.has(key)){
list=_f60.get(key).copy();
_f60.del(key);
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
var _f65=this.getProperty("value");
if(_f65!=null){
_f65=decodeURIComponent(_f65);
this._startContent=_f65;
}
};
EditorBinding.prototype.onBindingDispose=function(){
EditorBinding.superclass.onBindingDispose.call(this);
var name=this.getProperty("name");
if(name!=null){
var _f67=this.bindingWindow.DataManager;
_f67.unRegisterDataBinding(name);
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
EditorBinding.prototype.initializeEditorComponents=function(_f69){
var _f6a=EditorBinding.claimComponents(this,_f69);
if(_f6a!=null){
while(_f6a.hasNext()){
this.initializeEditorComponent(_f6a.getNext());
}
}
};
EditorBinding.prototype._registerWithDataManager=function(name){
if(name&&name!=""){
var _f6c=this.bindingWindow.DataManager;
if(_f6c.getDataBinding(name)){
_f6c.unRegisterDataBinding(name);
}
_f6c.registerDataBinding(name,this);
}
};
EditorBinding.prototype.addEditorEvents=function(){
var _f6d=this.getEditorDocument();
if(_f6d!=null){
Application.framework(_f6d);
DOMEvents.addEventListener(_f6d,DOMEvents.CONTEXTMENU,this);
DOMEvents.addEventListener(_f6d,DOMEvents.KEYPRESS,this);
DOMEvents.addEventListener(_f6d,DOMEvents.MOUSEDOWN,this);
DOMEvents.addEventListener(_f6d,DOMEvents.MOUSEMOVE,this);
}
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,{handleEvent:function(e){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}});
};
EditorBinding.prototype.checkForDirty=function(_f6f){
if(!this.isDirty){
if(_f6f==true){
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
var _f71=this.getCheckSum();
if(_f71!=this._checksum){
this.dispatchAction(Binding.ACTION_DIRTY);
this.isDirty=true;
this._checksum=_f71;
}
};
EditorBinding.prototype.getCheckSum=function(){
var _f72=null;
if(Binding.exists(this._pageBinding)){
_f72=this._pageBinding.getCheckSum(this._checksum);
}
return _f72;
};
EditorBinding.prototype.handleEvent=function(e){
EditorBinding.superclass.handleEvent.call(this,e);
var _f74=DOMEvents.getTarget(e);
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
if(_f74.ownerDocument==this.getEditorDocument()){
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
EditorBinding.prototype.handleBroadcast=function(_f76,arg){
EditorBinding.superclass.handleBroadcast.call(this,_f76,arg);
var _f78=null;
switch(_f76){
case BroadcastMessages.APPLICATION_BLURRED:
if(this._isActivated){
this._activateEditor(false);
}
break;
case BroadcastMessages.MOUSEEVENT_MOUSEUP:
if(!this.isDialogMode){
try{
var _f79=true;
if(arg instanceof Binding){
if(Interfaces.isImplemented(IEditorControlBinding,arg)==true){
if(arg.isEditorControlBinding){
_f79=false;
}
}
}else{
_f78=DOMEvents.getTarget(arg);
if(_f78&&_f78.ownerDocument==this.getEditorDocument()){
_f79=false;
}
}
if(_f79){
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
EditorBinding.prototype._activateEditor=function(_f7a){
if(_f7a!=this._isActivated){
this._isActivated=_f7a;
EditorBinding.isActive=_f7a;
var _f7b=this.getEditorWindow().standardEventHandler;
var _f7c=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_f7c!=null){
if(_f7a){
if(this.hasBookmark()){
this.deleteBookmark();
}
_f7c.enable();
if(Client.isExplorer){
this._sanitizeExplorer();
}
this.focus();
_f7b.enableNativeKeys(true);
}else{
_f7c.disable();
_f7b.disableNativeKeys();
this.blur();
}
}else{
throw "Required broadcaster not found";
}
}
};
EditorBinding.prototype._sanitizeExplorer=function(){
if(Client.isExplorer){
var _f7d=this.getEditorDocument().selection.createRange();
_f7d.select();
}
};
EditorBinding.prototype._sanitizeMozilla=function(){
};
EditorBinding.prototype.hasSelection=function(){
var _f7e=false;
try{
if(!Client.isExplorer){
var _f7f=this.getEditorWindow().getSelection();
if(_f7f!=null){
_f7e=_f7f.toString().length>0;
if(!_f7e){
var _f80=_f7f.getRangeAt(0);
var frag=_f80.cloneContents();
var _f82=this.getEditorDocument().createElement("element");
while(frag.hasChildNodes()){
_f82.appendChild(frag.firstChild);
}
var img=_f82.getElementsByTagName("img").item(0);
if(img!=null){
if(!VisualEditorBinding.isReservedElement(img)){
_f7e=true;
}
}
}
}
}else{
var _f80=this.getEditorDocument().selection.createRange();
_f7e=(_f80&&_f80.text)&&_f80.text.length>0;
}
}
catch(exception){
}
return _f7e;
};
EditorBinding.prototype.isCommandEnabled=function(_f84){
var _f85=true;
switch(_f84){
case "Cut":
case "Copy":
case "Paste":
_f85=this.getEditorDocument().queryCommandEnabled(_f84);
break;
}
return _f85;
};
EditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _f89=false;
this.restoreBookmark();
switch(cmd){
case "Cut":
case "Copy":
case "Paste":
var _f8a=null;
if(cmd=="Paste"){
_f8a=null;
}else{
_f8a=this.hasSelection();
}
try{
this.getEditorDocument().execCommand(cmd,gui,_f8a);
}
catch(mozillaSecurityException){
if(Client.isMozilla==true){
Dialog.invokeModal(EditorBinding.URL_DIALOG_MOZ_CONFIGURE);
}else{
throw "Clipboard operation malfunction. Contact your developer.";
}
}
finally{
_f89=true;
}
break;
}
return _f89;
};
EditorBinding.prototype.getButtonForCommand=function(cmd){
var _f8c=this.getContentWindow().bindingMap.toolbar;
var _f8d=_f8c.getButtonForCommand(cmd);
if(!_f8d){
throw "No button for command "+cmd;
}
return _f8d;
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
var _f90=this.getContentDocument().getElementById("focusableinput");
if(_f90!=null){
_f90.style.display="block";
FocusBinding.focusElement(_f90);
_f90.style.display="none";
}else{
throw "Required element not found: focusableinput";
}
};
EditorBinding.prototype.handleAction=function(_f91){
EditorBinding.superclass.handleAction.call(this,_f91);
var _f92=_f91.target;
var self=this;
var _f94=this.shadowTree.iframe;
switch(_f91.type){
case Binding.ACTION_DIRTY:
if(_f91.target!=this){
this.checkForDirty();
}
break;
}
};
EditorBinding.prototype._onPageInitialize=function(_f95){
if(this._pageBinding==null){
this.reflex();
if(this._coverBinding!=null&&this._coverBinding.isVisible){
this._coverBinding.hide();
}
}
EditorBinding.superclass._onPageInitialize.call(this,_f95);
};
EditorBinding.prototype.handleElement=function(_f96){
return true;
};
EditorBinding.prototype.updateElement=function(_f97){
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
this._menuGroups[rel].each(function(_f9a){
_f9a.show();
});
};
EditorPopupBinding.prototype._hideMenuGroups=function(rel){
this._menuGroups[rel].each(function(_f9c){
_f9c.hide();
});
};
EditorPopupBinding.prototype.handleAction=function(_f9d){
EditorPopupBinding.superclass.handleAction.call(this,_f9d);
var _f9e=_f9d.target;
if(_f9d.type==MenuItemBinding.ACTION_COMMAND){
this.hide();
var cmd=_f9e.getProperty("cmd");
var gui=_f9e.getProperty("gui");
var val=_f9e.getProperty("val");
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
var _fa2=this.bindingWindow.bindingMap.tinywindow;
var _fa3=this.bindingWindow.bindingMap.codepresswindow;
if(_fa2){
EditorBinding.registerComponent(this,_fa2);
}else{
if(_fa3){
EditorBinding.registerComponent(this,_fa3);
}
}
};
EditorClickButtonBinding.prototype.buildDOMContent=function(){
EditorClickButtonBinding.superclass.buildDOMContent.call(this);
this._buildDesignModeSanitizer();
};
EditorClickButtonBinding.prototype.initializeComponent=function(_fa4,_fa5,_fa6,_fa7){
this._editorBinding=_fa4;
this._tinyEngine=_fa5;
this._tinyInstance=_fa6;
this._tinyTheme=_fa7;
this._setupEditorBookmarking();
};
EditorClickButtonBinding.prototype.initializeSourceEditorComponent=function(_fa8,_fa9,_faa){
this._editorBinding=_fa8;
this._codePressFrame=_fa9;
this._codePressEngine=_faa;
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
var _fac=this._editorBinding;
if(_fac!=null){
var self=this;
var _fae={handleEvent:function(e){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(!_fac.hasBookmark()){
_fac.createBookmark();
}
break;
case DOMEvents.MOUSEUP:
if(self.isEditorSimpleControl){
if(self.popupBinding==null){
if(_fac.hasBookmark()){
_fac.restoreBookmark();
}
}
}
break;
}
}};
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,_fae);
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEUP,_fae);
}
};
EditorClickButtonBinding.newInstance=function(_fb0){
var _fb1=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_fb0);
return UserInterface.registerBinding(_fb1,EditorClickButtonBinding);
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
EditorToolBarButtonBinding.newInstance=function(_fb2){
var _fb3=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_fb2);
return UserInterface.registerBinding(_fb3,EditorToolBarButtonBinding);
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
var _fb4=this.bindingWindow.bindingMap.tinywindow;
EditorBinding.registerComponent(this,_fb4);
EditorSelectorBinding.superclass.onBindingAttach.call(this);
};
EditorSelectorBinding.prototype.buildButton=function(){
EditorSelectorBinding.superclass.buildButton.call(this);
this._buttonBinding.isEditorSimpleControl=false;
if(this.isEditorControlBinding==false){
this._buttonBinding.isEditorControlBinding=false;
}
};
EditorSelectorBinding.prototype.initializeComponent=function(_fb5,_fb6,_fb7,_fb8){
this._editorBinding=_fb5;
this._tinyEngine=_fb6;
this._tinyInstance=_fb7;
this._tinyTheme=_fb8;
};
EditorSelectorBinding.prototype.handleAction=function(_fb9){
EditorSelectorBinding.superclass.handleAction.call(this,_fb9);
switch(_fb9.type){
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
EditorSelectorBinding.superclass.handleAction.call(this,_fb9);
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
EditorMenuItemBinding.newInstance=function(_fbc){
var _fbd=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_fbc);
return UserInterface.registerBinding(_fbd,EditorMenuItemBinding);
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
VisualEditorBinding.getTinyLessClassName=function(_fbe){
var i=0,_fc0,_fc1="",_fc2=_fbe.split(" ");
while((_fc0=_fc2[i])!=null){
if(_fc0.length>=3&&_fc0.substring(0,3)=="mce"){
_fc0="";
}else{
if(_fc0.length>=14&&_fc0.substring(0,14)=="compositemedia"){
_fc0="";
}
}
_fc1+=_fc0;
if(_fc2[i+1]){
_fc1+=" ";
}
i++;
}
return _fc1;
};
VisualEditorBinding.getStructuredContent=function(_fc3){
var _fc4=null;
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.TinyContentToStructuredContent(_fc3);
if(soap instanceof SOAPFault){
}else{
_fc4=soap.XhtmlFragment;
if(!_fc4){
_fc4="";
}
}
WebServiceProxy.isFaultHandler=true;
return _fc4;
};
VisualEditorBinding.getTinyContent=function(_fc6,_fc7){
var _fc8=null;
if(_fc6==null||_fc6==""){
_fc6=VisualEditorBinding.DEFAULT_CONTENT;
}
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.StructuredContentToTinyContent(_fc6);
if(soap instanceof SOAPFault){
var _fca=soap;
var _fcb={handleDialogResponse:function(){
_fc7.dispatchAction(Binding.ACTION_VALID);
}};
Dialog.invokeModal(VisualEditorBinding.URL_DIALOG_CONTENTERROR,_fcb,_fca);
}else{
_fc8=soap.XhtmlFragment;
if(_fc8==null){
_fc8=new String("");
}
}
WebServiceProxy.isFaultHandler=true;
return _fc8;
};
VisualEditorBinding.extractByIndex=function(html,_fcd){
var _fce=null;
var doc=XMLParser.parse(html);
if(doc!=null){
var _fd0=new List(doc.documentElement.childNodes);
var _fd1=new List();
_fd0.each(function(_fd2){
if(_fd2.nodeType==Node.ELEMENT_NODE){
_fd1.add(_fd2);
}
});
var _fd3=_fd1.get(_fcd);
if(_fd3==null){
if(Application.isDeveloperMode){
alert("VisualEditorBinding: Bad HTML!"+"\n\n"+html);
}
}else{
if(_fd3.hasChildNodes()){
var frag=doc.createDocumentFragment();
while(_fd3.hasChildNodes()){
frag.appendChild(_fd3.firstChild);
}
doc.removeChild(doc.documentElement);
doc.appendChild(DOMUtil.createElementNS(Constants.NS_XHTML,"ROOT",doc));
doc.documentElement.appendChild(frag);
_fce=DOMSerializer.serialize(doc.documentElement);
_fce=_fce.substring(_fce.indexOf(">")+1,_fce.length);
_fce=_fce.substring(0,_fce.lastIndexOf("<"));
}
}
}
if(_fce==null){
_fce=new String("");
}
return _fce;
};
VisualEditorBinding.isImage=function(_fd5){
result=_fd5&&_fd5.nodeName=="IMG";
return result;
};
VisualEditorBinding.isImageElement=function(_fd6){
return VisualEditorBinding.isImage(_fd6)&&!VisualEditorBinding.isReservedElement(_fd6);
};
VisualEditorBinding.isReservedElement=function(_fd7){
if(VisualEditorBinding.isFunctionElement(_fd7)){
return true;
}
if(VisualEditorBinding.isFieldElement(_fd7)){
return true;
}
if(VisualEditorBinding.isHtmlElement(_fd7)){
return true;
}
return false;
};
VisualEditorBinding.isFunctionElement=function(_fd8){
return VisualEditorBinding.isImage(_fd8)&&CSSUtil.hasClassName(_fd8,VisualEditorBinding.FUNCTION_CLASSNAME);
};
VisualEditorBinding.isFieldElement=function(_fd9){
return VisualEditorBinding.isImage(_fd9)&&CSSUtil.hasClassName(_fd9,VisualEditorBinding.FIELD_CLASSNAME);
};
VisualEditorBinding.isHtmlElement=function(_fda){
return VisualEditorBinding.isImage(_fda)&&CSSUtil.hasClassName(_fda,VisualEditorBinding.HTML_CLASSNAME);
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
var _fdb=this.getProperty("embedablefieldstypenames");
if(_fdb!=null){
this.embedableFieldConfiguration=VisualEditorFieldGroupConfiguration.getConfiguration(_fdb);
}
var _fdc=this.getProperty("formattingconfiguration");
if(_fdc!=null){
this._url+="?config="+_fdc;
}
VisualEditorBinding.superclass.onBindingAttach.call(this);
this.subscribe(BroadcastMessages.TINYMCE_INITIALIZED);
this.subscribe(BroadcastMessages.VISUALEDITOR_HACKED);
};
VisualEditorBinding.prototype.toString=function(){
return "[VisualEditorBinding]";
};
VisualEditorBinding.prototype.handleBroadcast=function(_fdd,arg){
VisualEditorBinding.superclass.handleBroadcast.call(this,_fdd,arg);
var _fdf=this.getContentWindow().bindingMap.tinywindow;
var _fe0=_fdf.getContentWindow();
switch(_fdd){
case BroadcastMessages.VISUALEDITOR_HACKED:
if(arg.broadcastWindow==_fe0){
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
if(arg.broadcastWindow==_fe0){
this._tinyEngine=arg.tinyEngine;
this._tinyInstance=arg.tinyInstance;
this._tinyTheme=arg.tinyTheme;
this._tinyTheme.initC1(this,this._tinyEngine,this._tinyInstance);
this.initializeEditorComponents(_fdf);
this._initialize();
this.unsubscribe(BroadcastMessages.TINYMCE_INITIALIZED);
}
break;
}
};
VisualEditorBinding.prototype.initializeEditorComponent=function(_fe1){
_fe1.initializeComponent(this,this._tinyEngine,this._tinyInstance,this._tinyTheme);
};
VisualEditorBinding.prototype._finalize=function(){
VisualEditorBinding.superclass._finalize.call(this);
this._maybeShowEditor();
};
VisualEditorBinding.prototype._onPageInitialize=function(_fe2){
VisualEditorBinding.superclass._onPageInitialize.call(this,_fe2);
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
VisualEditorBinding.prototype.normalizeToDocument=function(_fe5){
var _fe6=_fe5;
if(!this._isNormalizedDocument(_fe5)){
_fe6=VisualEditorBinding.XHTML.replace("${head}",this._getHeadSection()).replace("${body}",_fe5);
}
return _fe6;
};
VisualEditorBinding.prototype._isNormalizedDocument=function(_fe7){
var _fe8=false;
var doc=XMLParser.parse(_fe7,true);
if(doc!=null){
if(doc.documentElement.nodeName=="html"){
_fe8=true;
}
}
if(Client.isWebKit){
if(_fe7.indexOf("<html")!==0){
_fe8=false;
}
}
return _fe8;
};
VisualEditorBinding.prototype._getHeadSection=function(){
return this._head!=null?this._head:new String("");
};
VisualEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _fed=VisualEditorBinding.superclass.handleCommand.call(this,cmd,gui,val);
if(!_fed){
try{
this._tinyInstance.execCommand(cmd,gui,val);
this.checkForDirty();
}
catch(e){
SystemDebug.stack(arguments);
}
_fed=true;
}
return _fed;
};
VisualEditorBinding.prototype.handleContextMenu=function(e){
var _fef=DOMEvents.getTarget(e);
this._popupBinding.configure(this._tinyInstance,this._tinyEngine,_fef);
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
VisualEditorBinding.prototype.setValue=function(_ff0){
if(this._isFinalized){
if(Binding.exists(this._pageBinding)){
this._pageBinding.setContent(_ff0);
}
}else{
if(this._startContent==null){
this._startContent=_ff0;
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
VisualEditorBinding.prototype.setResult=function(_ff1){
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
VisualEditorPopupBinding.prototype.configure=function(_ff2,_ff3,_ff4){
var _ff5=this.editorBinding.hasSelection();
this.tinyInstance=_ff2;
this.tinyEngine=_ff3;
this.tinyElement=_ff4;
this.hasSelection=_ff5;
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
var _ff9=false;
if(this.hasSelection){
_ff9=true;
}else{
if(this.tinyElement){
if(this.tinyElement.nodeName=="A"&&!this.tinyElement.getAttribute("name")){
_ff9=true;
}else{
if(this.tinyElement.nodeName=="IMG"){
_ff9=true;
}
}
}
}
if(_ff9){
this._showMenuGroups("link");
this._configureLinkGroupDetails();
}else{
this._hideMenuGroups("link");
}
};
VisualEditorPopupBinding.prototype._configureLinkGroupDetails=function(){
var _ffa=this.getMenuItemForCommand("compositeInsertLink");
var _ffb=this.getMenuItemForCommand("unlink");
var _ffc=this.editorBinding.getButtonForCommand("compositeInsertLink");
var _ffd=this.editorBinding.getButtonForCommand("unlink");
_ffb.setDisabled(_ffd.isDisabled);
if(_ffb.isDisabled){
_ffa.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLink}");
}else{
_ffa.setLabel("${string:Composite.Web.VisualEditor:ContextMenu.LabelLinkProperties}");
}
};
VisualEditorPopupBinding.prototype._configureInsertGroup=function(){
var _ffe=this.editorBinding.embedableFieldConfiguration;
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
if(_ffe){
var _1001=_ffe.getGroupNames();
if(_1001.hasEntries()){
var popup=MenuPopupBinding.newInstance(doc);
var body=popup.add(MenuBodyBinding.newInstance(doc));
var group=body.add(MenuGroupBinding.newInstance(doc));
_1001.each(function(_1005){
var _1006=_ffe.getFieldNames(_1005);
_1006.each(function(_1007){
var i=group.add(MenuItemBinding.newInstance(doc));
i.setLabel(_1007);
i.setImage("${icon:field}");
i.setProperty("cmd","compositeInsertField");
i.setProperty("val",_1005+":"+_1007);
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
var _1009=this.tinyInstance.dom.getParent(this.tinyElement,"table,td");
var _100a=null;
var _100b=null;
if(_1009){
if(_1009.nodeName=="TD"){
_100a=_1009.getAttribute("colspan");
_100b=_1009.getAttribute("rowspan");
}
this._menuItems["mceTableSplitCells"].setDisabled(_100a=="1"&&_100b=="1");
this._menuItems["mceTablePasteRowBefore"].setDisabled(this.tinyInstance.tableRowClipboard==null);
this._menuItems["mceTablePasteRowAfter"].setDisabled(this.tinyInstance.tableRowClipboard==null);
}
if(_1009){
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
VisualEditorElementClassConfiguration.getConfiguration=function(_100c){
var _100d=VisualEditorElementClassConfiguration._configurations;
if(!_100d.has(_100c)){
_100d.set(_100c,new VisualEditorElementClassConfiguration(EditorConfigurationService.GetElementClassConfiguration(_100c)));
}
return _100d.get(_100c);
};
function VisualEditorElementClassConfiguration(doc){
this.logger=SystemLogger.getLogger("VisualEditorElementClassConfiguration");
this._elements={};
var _100f=new XPathResolver();
var _1010=_100f.resolveAll("elements/element",doc);
while(_1010.hasNext()){
var _1011=_1010.getNext();
var _1012=_1011.getAttribute("name");
this._elements[_1012]=new List();
var _1013=_100f.resolveAll("class",_1011);
while(_1013.hasNext()){
var _1014=_1013.getNext().getAttribute("name");
this._elements[_1012].add(_1014);
}
}
}
VisualEditorElementClassConfiguration.prototype.getClassNamesForElement=function(name){
var _1016=null;
if(this._elements[name]){
_1016=this._elements[name].copy();
}else{
_1016=new List();
}
return _1016;
};
VisualEditorFormattingConfiguration._configurations=new Map();
VisualEditorFormattingConfiguration._options=null;
VisualEditorFormattingConfiguration.getConfiguration=function(_1017){
var _1018=VisualEditorFormattingConfiguration._configurations;
if(!_1018.has(_1017)){
_1018.set(_1017,new VisualEditorFormattingConfiguration());
}
return _1018.get(_1017);
};
VisualEditorFormattingConfiguration._getOptions=function(){
if(VisualEditorFormattingConfiguration._options==null){
var p="Composite.Web.VisualEditor";
VisualEditorFormattingConfiguration._options={"p":StringBundle.getString(p,"FormatSelector.LabelParagraph"),"address":StringBundle.getString(p,"FormatSelector.LabelAddress"),"blockquote":StringBundle.getString(p,"FormatSelector.LabelBlockQuote"),"div":StringBundle.getString(p,"FormatSelector.LabelDivision"),"h1":StringBundle.getString(p,"FormatSelector.LabelHeading1"),"h2":StringBundle.getString(p,"FormatSelector.LabelHeading2"),"h3":StringBundle.getString(p,"FormatSelector.LabelHeading3"),"h4":StringBundle.getString(p,"FormatSelector.LabelHeading4"),"h5":StringBundle.getString(p,"FormatSelector.LabelHeading5"),"h6":StringBundle.getString(p,"FormatSelector.LabelHeading6")};
}
return VisualEditorFormattingConfiguration._options;
};
function VisualEditorFormattingConfiguration(_101a){
this._options=VisualEditorFormattingConfiguration._getOptions();
}
VisualEditorFormattingConfiguration.prototype.getFormattingOptions=function(){
return this._options;
};
VisualEditorFieldGroupConfiguration._configurations=new Map();
VisualEditorFieldGroupConfiguration.getConfiguration=function(_101b){
var _101c=null;
var _101d=VisualEditorFieldGroupConfiguration._configurations;
if(!_101d.has(_101b)){
_101d.set(_101b,new VisualEditorFieldGroupConfiguration(EditorConfigurationService.GetEmbedableFieldGroupConfigurations(_101b)));
}
return _101d.get(_101b);
};
function VisualEditorFieldGroupConfiguration(_101e){
var _101f=new Map();
new List(_101e).each(function(group){
var map=new Map();
new List(group.Fields).each(function(field){
map.set(field.Name,{xhtml:field.XhtmlRepresentation,xml:field.XhtmlRepresentation});
});
_101f.set(group.GroupName,map);
});
this._groups=_101f;
}
VisualEditorFieldGroupConfiguration.prototype.getGroupNames=function(){
return this._groups.toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getFieldNames=function(_1023){
return this._groups.get(_1023).toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getTinyMarkup=function(_1024,_1025){
return this._groups.get(_1024).get(_1025).xhtml;
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
var _1027=this.getDescendantElementsByLocalName("textarea");
while(_1027.hasNext()){
var _1028=_1027.getNext();
if(_1028.getAttribute("selected")=="true"){
this._startContent=_1028.value;
this._textareaname=_1028.getAttribute("placeholderid");
}
}
if(this._startContent==null){
this._startContent=VisualEditorBinding.DEFAULT_CONTENT;
}
};
VisualMultiEditorBinding.prototype._initialize=function(){
var self=this;
this._registerWithDataManager("generated"+KeyMaster.getUniqueKey());
var _102a=this.getContentWindow().bindingMap.templatetree;
_102a.addActionListener(TreeBinding.ACTION_SELECTIONCHANGED,{handleAction:function(_102b){
var _102c=_102a.getSelectedTreeNodeBindings().getFirst();
self._placeHolderSelected(_102c.textareaname);
_102b.consume();
}});
_102a.addActionListener(Binding.ACTION_FOCUSED,{handleAction:function(_102d){
self._activateEditor(false);
}});
this._updatePlaceHolders();
var _102e=this.getContentWindow().bindingMap.toolsplitter;
_102e.unCollapse();
VisualMultiEditorBinding.superclass._initialize.call(this);
};
VisualMultiEditorBinding.prototype._updatePlaceHolders=function(){
templatetree=this.getContentWindow().bindingMap.templatetree;
var _102f=this.getDescendantElementsByLocalName("textarea");
templatetree.empty();
if(_102f.hasEntries()){
this._hasPlaceHolders=true;
this._parsePlaceHolders(_102f);
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
VisualMultiEditorBinding.prototype._parsePlaceHolders=function(_1030){
this._textareas=new Map();
while(_1030.hasNext()){
var _1031=_1030.getNext();
var _1032=_1031.getAttribute("placeholderid");
this._textareas.set(_1032,{placeholderid:_1032,placeholdername:_1031.getAttribute("placeholdername"),placeholdermarkup:_1031.value,textareaelement:_1031,isSelected:_1031.getAttribute("selected")=="true"});
}
var _1033=new Map();
this._textareas.each(function(name,_1035){
var _1036=templatetree.add(TreeNodeBinding.newInstance(templatetree.bindingDocument));
_1036.setLabel(_1035.placeholdername);
_1036.setImage("${icon:placeholder}");
_1036.setProperty("placeholder",true);
_1036.textareaname=name;
_1033.set(_1035.placeholdername,_1036);
if(_1035.isSelected){
selected=_1036;
}
});
templatetree.attachRecursive();
if(selected!=null){
var _1037=this._textareas.get(selected.textareaname);
this._textareaname=selected.textareaname;
this._placeholdername=_1037.placeholdername;
this._setContentFromPlaceHolder(selected.textareaname);
selected.focus();
}
};
VisualMultiEditorBinding.prototype._noPlaceHolders=function(){
var _1038=this.getContentWindow().bindingMap.templatetree;
var _1039=_1038.add(TreeNodeBinding.newInstance(_1038.bindingDocument));
_1039.setLabel(StringBundle.getString("Composite.Web.VisualEditor","TemplateTree.NoTemplateWarning"));
_1039.setImage("${icon:warning}");
_1039.attach();
var _103a=this.getContentWindow().bindingMap.statusbar;
_103a.setPlaceHolderName(null);
};
VisualMultiEditorBinding.prototype._setContentFromPlaceHolder=function(name){
if(this._isFinalized==true){
var _103c=this._textareas.get(name);
var _103d=_103c.placeholdermarkup;
this.setValue(this.normalizeToDocument(_103d));
this.resetUndoRedo();
}
};
VisualMultiEditorBinding.prototype._placeHolderSelected=function(_103e){
if(this._isFinalized==true){
if(this._textareaname&&this._textareas.has(this._textareaname)){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
}
}
this._textareaname=_103e;
this._placeholdername=this._textareas.get(this._textareaname).placeholdername;
var _103f=this.getContentWindow().bindingMap.statusbar;
_103f.setPlaceHolderName(this._placeholdername);
if(this._isFinalized==true){
var self=this;
Application.lock(self);
setTimeout(function(){
self._setContentFromPlaceHolder(_103e);
Application.unlock(self);
},0);
}
};
VisualMultiEditorBinding.prototype.extractHead=function(html){
VisualMultiEditorBinding.superclass.extractHead.call(this,html);
this._heads.set(this._textareaname,this._head);
};
VisualMultiEditorBinding.prototype._getHeadSection=function(){
var _1042="";
if(this._heads.has(this._textareaname)){
_1042=this._heads.get(this._textareaname);
if(_1042==null){
_1042=new String("");
}
}
return _1042;
};
VisualMultiEditorBinding.prototype.manifest=function(){
if(this._textareas!=null&&this._textareas.hasEntries()){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
this._textareas.each(function(name,_1044){
_1044.textareaelement.value=_1044.placeholdermarkup;
});
}
};
VisualMultiEditorBinding.prototype.updateElement=function(_1045,_1046){
var _1047=_1045.getElementsByTagName("div").item(0);
var _1048=_1046.getElementsByTagName("div").item(0);
var _1049=new List(_1047.getElementsByTagName("textarea"));
var _104a=new List(_1048.getElementsByTagName("textarea"));
var _104b=false;
if(_1049.getLength()!=_104a.getLength()){
_104b=true;
}else{
var index=0;
_1049.each(function(_104d,index){
var _104f=_104a.get(index);
var newid=_104d.getAttribute("placeholderid");
var oldid=_104f.getAttribute("placeholderid");
var _1052=_104d.getAttribute("placeholdername");
var _1053=_104f.getAttribute("placeholdername");
if(newid!=oldid||_1052!=_1053){
_104b=true;
}
return !_104b;
});
}
if(_104b){
var html=null;
if(_1047.innerHTML!=null){
html=_1047.innerHTML;
}else{
html=DOMSerializer.serialize(_1047);
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
var _1057=this.getDescendantBindingByLocalName("selector");
_1057.attach();
this._populateTemplateSelector();
var _1058=this.getContentWindow().bindingMap.templateselector;
_1058.addActionListener(SelectorBinding.ACTION_SELECTIONCHANGED,{handleAction:function(){
setTimeout(function(){
self._onTemplateSelectionChanged();
},0);
}});
this.getContentWindow().bindingMap.templatetoolbar.show();
VisualMultiTemplateEditorBinding.superclass._initialize.call(this);
};
VisualMultiTemplateEditorBinding.prototype._populateTemplateSelector=function(){
var _1059=this.getDescendantBindingByLocalName("selector");
var _105a=this.getContentWindow().bindingMap.templateselector;
_1059.selections.each(function(_105b){
_105b.imageProfile=new ImageProfile({image:"${icon:page-template-template}"});
});
_105a.populateFromList(_1059.selections);
};
VisualMultiTemplateEditorBinding.prototype._onTemplateSelectionChanged=function(){
var _105c=this.getDescendantBindingByLocalName("selector");
var _105d=this.getContentWindow().bindingMap.templateselector;
_105c.selectByValue(_105d.getValue());
_105c.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
this.checkForDirty(true);
};
VisualMultiTemplateEditorBinding.prototype._parsePlaceHolders=function(_105e){
var nev=this._textareas;
var old=this._oldtextareas;
if(nev!=null){
nev.each(function(key,value){
old.set(key,value);
});
}
this._textareas=new Map();
function compute(_1063,_1064){
var _1065=_1064;
if(old.has(_1063)){
_1065=old.get(_1063).placeholdermarkup;
}
return _1065;
}
while(_105e.hasNext()){
var _1066=_105e.getNext();
var _1067=_1066.getAttribute("placeholderid");
this._textareas.set(_1067,{placeholderid:_1067,placeholdername:_1066.getAttribute("placeholdername"),placeholdermarkup:compute(_1067,_1066.value),textareaelement:_1066,isSelected:_1066.getAttribute("selected")=="true"});
}
var _1068=null;
var _1069=this.getContentWindow().bindingMap.templatetree;
var _106a=new Map();
this._textareas.each(function(name,_106c){
var _106d=_1069.add(TreeNodeBinding.newInstance(_1069.bindingDocument));
_106d.setLabel(_106c.placeholdername);
_106d.setImage("${icon:placeholder}");
_106d.setProperty("placeholder",true);
_106d.textareaname=name;
_106a.set(_106c.placeholdername,_106d);
if(_106c.isSelected){
_1068=_106d;
}
});
_1069.attachRecursive();
if(_1068!=null){
var _106e=true;
if(this._oldtextareas.hasEntries()){
_106e=false;
var map=new Map();
this._textareas.each(function(id,_1071){
map.set(_1071.placeholdername,true);
});
if(!map.has(this._placeholdername)){
_106e=true;
}
}
if(_106e){
var _1072=this._textareas.get(_1068.textareaname);
this._textareaname=_1068.textareaname;
this._placeholdername=_1072.placeholdername;
this._setContentFromPlaceHolder(_1068.textareaname);
_1068.focus();
}else{
var _1073=_106a.get(this._placeholdername);
this._textareaname=_1073.textareaname;
_1073.focus();
}
}
};
VisualMultiTemplateEditorBinding.prototype.updateElement=function(_1074,_1075){
var _1076=_1074.getElementsByTagName("ui:selector").item(0);
var _1077=_1075.getElementsByTagName("ui:selector").item(0);
var _1078=false;
if(_1076!=null&&_1077!=null){
var _1079=new List(_1076.getElementsByTagName("ui:selection"));
var _107a=new List(_1077.getElementsByTagName("ui:selection"));
if(_1079.getLength()!=_107a.getLength()){
_1078=true;
}else{
_1079.each(function(_107b,index){
var _107d=_107b.getAttribute("value");
var _107e=_107a.get(index).getAttribute("value");
if(_107d!=_107e){
_1078=true;
}
return !_1078;
});
}
}
if(_1078){
var div=this.bindingElement.getElementsByTagName("div").item(1);
this.bindingWindow.DocumentManager.detachBindings(div,true);
div.innerHTML=DOMSerializer.serialize(_1076);
this.bindingWindow.DocumentManager.attachBindings(div);
this._populateTemplateSelector();
}
return VisualMultiTemplateEditorBinding.superclass.updateElement.call(this,_1074,_1075);
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
CodeMirrorEditorPopupBinding.prototype.configure=function(_1080,frame,_1082){
this._editorBinding=_1080;
this._codePressFrame=frame;
this._codePressEngine=_1082;
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
var _1088=this.getProperty("validate");
if(_1088==true){
this._hasStrictValidation=true;
}
var _1089=this.getProperty("validator");
if(_1089!=null){
this._validator=_1089;
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
CodeMirrorEditorBinding.prototype.handleBroadcast=function(_108a,arg){
CodeMirrorEditorBinding.superclass.handleBroadcast.call(this,_108a,arg);
switch(_108a){
case BroadcastMessages.CODEMIRROR_LOADED:
var _108c=this.getContentWindow().bindingMap.codemirrorwindow;
if(_108c!=null){
var _108d=_108c.getContentWindow();
if(arg.broadcastWindow==_108d){
this._codemirrorWindow=_108d;
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
this.initializeEditorComponents(_108c);
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
this.unsubscribe(_108a);
}
}
break;
}
};
CodeMirrorEditorBinding.prototype._onPageInitialize=function(_1091){
CodeMirrorEditorBinding.superclass._onPageInitialize.call(this,_1091);
if(Client.isExplorer||this._codemirrorEditor!=null){
this._initialize();
}
};
CodeMirrorEditorBinding.prototype._activateEditor=function(_1092){
if(_1092!=this._isActivated||this.isFocusable&&!this.isFocused){
this._isActivated=_1092;
EditorBinding.isActive=_1092;
var _1093=this.getContentWindow().standardEventHandler;
if(_1092){
_1093.enableNativeKeys(true);
}else{
_1093.disableNativeKeys();
}
var _1094=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_1094!=null){
if(_1092){
_1094.enable();
}else{
_1094.disable();
}
}
if(_1092){
this.focus();
var _1095=this._codemirrorEditor;
}else{
this.blur();
}
}
};
CodeMirrorEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1099=CodeMirrorEditorBinding.superclass.handleCommand.call(this,cmd,val);
return _1099;
};
CodeMirrorEditorBinding.prototype._finalize=function(){
this.setContent(this._startContent);
CodeMirrorEditorBinding.superclass._finalize.call(this);
};
CodeMirrorEditorBinding.prototype.initializeEditorComponent=function(_109a){
_109a.initializeSourceEditorComponent(this,this._codemirrorEditor);
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
CodeMirrorEditorBinding.prototype.setContent=function(_109c){
if(!this._isFinalized){
if(_109c!=this._startContent){
this._startContent=_109c;
}
}
if(this.isInitialized&&this.getContentWindow().bindingMap!=null){
this.getContentWindow().bindingMap.editorpage.setContent(_109c);
this.resetUndoRedo();
this._checksum=this.getCheckSum();
}
return true;
};
CodeMirrorEditorBinding.prototype.getContent=function(){
var _109d=this.getContentWindow().bindingMap.editorpage.getContent();
return _109d?_109d:"";
};
CodeMirrorEditorBinding.prototype.resetUndoRedo=function(){
};
CodeMirrorEditorBinding.prototype.cover=function(_109e){
if(this._pageBinding!=null){
this._pageBinding.cover(_109e);
}
};
CodeMirrorEditorBinding.prototype.updateElement=function(_109f){
if(_109f!=null&&this.shadowTree.dotnetinput!=null){
var value=_109f.getAttribute("value");
if(value!=null&&value!=this.shadowTree.dotnetinput.value){
this.setValue(decodeURIComponent(value));
}
}
return true;
};
CodeMirrorEditorBinding.prototype.blurEditor=function(){
};
CodeMirrorEditorBinding.prototype.validate=function(){
var _10a1=true;
var _10a2=this.getContent();
if(this._validator!=null){
_10a1=Validator.validateInformed(_10a2,this._validator);
}else{
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.XML:
case CodeMirrorEditorBinding.syntax.XSL:
case CodeMirrorEditorBinding.syntax.HTML:
_10a1=XMLParser.isWellFormedDocument(_10a2,true);
if(_10a1==true&&this._hasStrictValidation){
switch(this.syntax){
case CodeMirrorEditorBinding.syntax.HTML:
_10a1=this._isValidHTML(_10a2);
break;
}
}
break;
}
}
return _10a1;
};
CodeMirrorEditorBinding.prototype._isValidHTML=function(xml){
var _10a4=true;
var doc=XMLParser.parse(xml);
var _10a6=new List();
if(doc!=null){
var root=doc.documentElement;
if(root.nodeName!="html"){
_10a6.add("MissingHtml");
}
if(root.namespaceURI!=Constants.NS_XHTML){
_10a6.add("NamespaceURI");
}
var head=null,body=null;
var _10aa=new List(root.childNodes);
while(_10aa.hasNext()){
var child=_10aa.getNext();
if(child.nodeType==Node.ELEMENT_NODE){
switch(child.nodeName){
case "head":
if(head!=null){
_10a6.add("MultipleHead");
}
if(body!=null){
_10a6.add("HeadBodyIndex");
}
head=child;
break;
case "body":
if(body!=null){
_10a6.add("MultipleBody");
}
body=child;
break;
}
}
}
if(head==null){
_10a6.add("MissingHead");
}
if(body==null){
_10a6.add("MissingBody");
}
}
if(_10a6.hasEntries()){
_10a4=false;
Dialog.error(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML.DialogTitle"),StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_10a6.getFirst()));
}
return _10a4;
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
var _10ac=null;
var page=this._pageBinding;
if(page!=null){
_10ac=page.getCheckSum();
}
return _10ac;
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
ThrobberBinding.prototype.handleBroadcast=function(_10ae,arg){
ThrobberBinding.superclass.handleBroadcast.call(this,_10ae,arg);
switch(_10ae){
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
ProgressBarBinding.notch=function(_10b1){
var bar=ProgressBarBinding._bindingInstance;
if(bar!=null){
bar.notch(_10b1);
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
ProgressBarBinding.prototype.notch=function(_10b3){
_10b3=_10b3?_10b3:1;
var width=this._cover.getWidth()-(ProgressBarBinding.NOTCH*_10b3);
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
StartMenuItemBinding.prototype.handleBroadcast=function(_10b5,arg){
StartMenuItemBinding.superclass.handleBroadcast.call(this,_10b5,arg);
switch(_10b5){
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
StartMenuItemBinding.prototype.setChecked=function(_10b7,_10b8){
StartMenuItemBinding.superclass.setChecked.call(this,_10b7,_10b8);
if(!_10b8){
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
KeySetBinding.registerKeyEventHandler=function(doc,key,_10bb,_10bc){
var _10bd=KeySetBinding.keyEventHandlers;
if(Interfaces.isImplemented(IKeyEventHandler,_10bc,true)==true){
if(_10bb!="*"){
_10bb=KeySetBinding._sanitizeKeyModifiers(_10bb);
}
var code=window.KeyEventCodes[key];
if(!code){
code=key.charCodeAt(0);
}
if(!_10bd[doc]){
_10bd[doc]={};
}
if(!_10bd[doc][code]){
_10bd[doc][code]={};
}
_10bd[doc][code][_10bb]=_10bc;
}
};
KeySetBinding.handleKey=function(doc,e){
var _10c1=false;
var code=e.keyCode;
var _10c3=KeySetBinding.keyEventHandlers;
if(_10c3[doc]&&_10c3[doc][code]){
var _10c4="[default]";
_10c4+=code!=KeyEventCodes.VK_SHIFT?e.shiftKey?" shift":"":"";
_10c4+=code!=KeyEventCodes.VK_CONTROL?e.ctrlKey?" control":"":"";
var _10c5=_10c3[doc][code][_10c4];
if(_10c5==null){
_10c5=_10c3[doc][code]["*"];
}
if(_10c5!=null){
_10c5.handleKeyEvent(e);
_10c1=true;
}
}
return _10c1;
};
KeySetBinding._sanitizeKeyModifiers=function(_10c6){
var _10c7="[default]";
var mods={};
if(_10c6){
new List(_10c6.split(" ")).each(function(_10c9){
mods[_10c9]=true;
});
function check(_10ca){
if(mods[_10ca]){
_10c7+=" "+_10ca;
}
}
check("shift");
check("control");
}
return _10c7;
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
var _10ce=key.getAttribute("oncommand");
var _10cf=key.getAttribute("preventdefault")=="true";
KeySetBinding.registerKeyEventHandler(self.bindingDocument,key.getAttribute("key"),key.getAttribute("modifiers"),{handleKeyEvent:function(e){
DOMEvents.stopPropagation(e);
if(_10cf){
DOMEvents.preventDefault(e);
}
var _10d1=self.bindingWindow.WindowManager;
top.setTimeout(function(){
Binding.evaluate(_10ce,self);
},0);
}});
});
};
CursorBinding.prototype=new Binding;
CursorBinding.prototype.constructor=CursorBinding;
CursorBinding.superclass=Binding.prototype;
CursorBinding.fadeIn=function(_10d2){
if(_10d2 instanceof CursorBinding){
_10d2.setOpacity(0);
_10d2.show();
new Animation({modifier:Client.isExplorer?18:9,onstep:function(_10d3){
_10d2.setOpacity(Math.sin(_10d3*Math.PI/180));
},onstop:function(){
_10d2.setOpacity(1);
}}).play();
}
};
CursorBinding.fadeOut=function(_10d4){
if(_10d4 instanceof CursorBinding){
new Animation({modifier:Client.isExplorer?18:9,onstep:function(_10d5){
_10d4.setOpacity(Math.cos(_10d5*Math.PI/180));
},onstop:function(){
_10d4.hide();
}}).play();
}
};
CursorBinding.moveOut=function(_10d6,_10d7,_10d8){
if(_10d6 instanceof CursorBinding){
_10d8.x-=16;
_10d8.y-=16;
new Animation({modifier:3,onstep:function(_10d9){
var tal=Math.sin(_10d9*Math.PI/180);
_10d6.setPosition(new Point(((1-tal)*_10d7.x)+((0+tal)*_10d8.x),((1-tal)*_10d7.y)+((0+tal)*_10d8.y)));
},onstop:function(){
CursorBinding.fadeOut(_10d6);
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
CursorBinding.prototype.setOpacity=function(_10df){
if(Client.isMozilla){
this.bindingElement.style.MozOpacity=new String(_10df);
}else{
this.bindingElement.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+new String(_10df*100)+")";
}
this._opacity=_10df;
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
function setOpacity(_10e2){
if(Client.isMozilla){
cover.bindingElement.style.opacity=new String(_10e2);
}else{
cover.bindingElement.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+new String(_10e2*100)+")";
}
}
if(cover instanceof CoverBinding){
new Animation({modifier:Client.isExplorer?30:18,onstep:function(_10e3){
if(Binding.exists(cover)){
setOpacity(Math.cos(_10e3*Math.PI/180));
}
},onstop:function(){
if(Binding.exists(cover)){
cover.hide();
}
}}).play();
}
};
CoverBinding.fadeIn=function(cover){
function setOpacity(_10e5){
if(Client.isMozilla){
cover.bindingElement.style.MozOpacity=new String(_10e5);
}else{
cover.bindingElement.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+new String(_10e5*100)+")";
}
}
if(cover instanceof CoverBinding){
new Animation({modifier:Client.isExplorer?30:18,onstart:function(){
if(Binding.exists(cover)){
setOpacity(0);
cover.show();
}
},onstep:function(_10e6){
if(Binding.exists(cover)){
setOpacity(Math.sin(_10e6*Math.PI/180));
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
CoverBinding.prototype.setBusy=function(_10e8){
if(_10e8!=this._isBusy){
if(_10e8){
this.bindingElement.style.cursor="wait";
}else{
this.bindingElement.style.cursor="default";
}
this._isBusy=_10e8;
}
};
CoverBinding.prototype.setTransparent=function(_10e9){
if(_10e9!=this._isTransparent){
if(_10e9){
this.attachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}else{
this.detachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}
this._isTransparent=_10e9;
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
CoverBinding.prototype.setHeight=function(_10eb){
if(_10eb>=0){
this.bindingElement.style.height=new String(_10eb+"px");
}
};
CoverBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
CoverBinding.newInstance=function(_10ec){
var _10ed=DOMUtil.createElementNS(Constants.NS_UI,"ui:cover",_10ec);
return UserInterface.registerBinding(_10ed,CoverBinding);
};
UncoverBinding.prototype=new Binding;
UncoverBinding.prototype.constructor=UncoverBinding;
UncoverBinding.superclass=Binding.prototype;
UncoverBinding._bindingInstance=null;
UncoverBinding.uncover=function(pos){
var _10ef=UncoverBinding._bindingInstance;
if(Binding.exists(_10ef)){
_10ef.setPosition(pos);
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
TheatreBinding.prototype.play=function(_10f3){
this._isFading=_10f3==true;
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
var _10f4=this._canvas.getContext("2d");
var alpha=parseInt(0);
TheatreBinding._interval=top.setInterval(function(){
if(alpha<0.5){
_10f4.fillStyle="rgba(0,0,0,"+new String(alpha)+")";
_10f4.clearRect(0,0,300,150);
_10f4.fillRect(0,0,300,150);
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
var _10f6=this._canvas.getContext("2d");
_10f6.clearRect(0,0,300,150);
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
var _10f7=SourceCodeViewerBinding.stylesheets[this._syntax];
this._transformer=new XSLTransformer();
this._transformer.importStylesheet(_10f7);
break;
default:
throw "SourceCodeViewer: Syntax error!";
this._syntax=null;
break;
}
var _10f8=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_10f8){
this._startcontent=_10f8.value;
}
this.setURL(SourceCodeViewerBinding.URL_DEFAULT);
this.addActionListener(WindowBinding.ACTION_ONLOAD);
SourceCodeViewerBinding.superclass.onBindingAttach.call(this);
};
SourceCodeViewerBinding.prototype.handleAction=function(_10f9){
SourceCodeViewerBinding.superclass.handleAction.call(this,_10f9);
switch(_10f9.type){
case WindowBinding.ACTION_ONLOAD:
if(_10f9.target==this){
if(this._startcontent){
this.view(this._startcontent);
}
this.dispatchAction(SourceCodeViewerBinding.ACTION_INITIALIZED);
_10f9.consume();
}
break;
}
SourceCodeViewerBinding.superclass.handleAction.call(this,_10f9);
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
var _10fd=this._transformer.transformToString(doc);
this._inject(_10fd);
}
};
SourceCodeViewerBinding.prototype._viewHTML=function(arg){
};
SourceCodeViewerBinding.prototype._viewJavascript=function(arg){
};
SourceCodeViewerBinding.prototype._inject=function(_1100){
this.getContentDocument().body.innerHTML=_1100;
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
var _1108=list.getNext();
var id=_1108.getAttribute("id");
map[id]={};
var atts=this._resolver.resolveAll("p:att",_1108);
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
var _1112=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"persist",doc);
_1112.setAttribute("id",id);
for(var name in map[id]){
var att=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"att",doc);
att.setAttribute("name",name);
att.setAttribute("value",map[id][name]);
_1112.appendChild(att);
}
elm.appendChild(_1112);
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
var _111c=window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance;
if(_111c){
doc=XMLParser.parse(_111c);
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
var _1120=DOMSerializer.serialize(doc,true);
window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance=_1120;
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
LocalizationSelectorBinding.prototype.handleBroadcast=function(_1121,arg){
LocalizationSelectorBinding.superclass.handleBroadcast.call(this,_1121,arg);
switch(_1121){
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
var _1124=new List();
list.each(function(lang){
_1124.add(new SelectorBindingSelection(lang.Name,lang.SerializedActionToken,lang.IsCurrent,null));
});
this.populateFromList(_1124);
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
Dialog.warning(StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogTitle"),StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogText"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_1128){
switch(_1128){
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
var _112b=new SystemAction({Label:"Generated Action: Change Locale",ActionToken:token});
SystemAction.invoke(_112b,root);
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
var _112c=this.getProperty("status");
if(_112c!=null){
switch(_112c){
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
UserInterfaceMapping.prototype.merge=function(_112f){
for(var _1130 in _112f.map){
this.map[_1130]=_112f.getBindingImplementation(_1130);
}
};
UserInterfaceMapping.prototype.getBindingImplementation=function(_1131){
var _1132=null;
var name=_1131.nodeName;
if(Client.isExplorer){
var small=name.toLowerCase();
if(name==small){
name="ui:"+name;
}else{
name=small;
}
}
if(this.map[name]){
_1132=this.map[name];
}
return _1132;
};
var UserInterface=new function(){
var _1135=(Client.isMozilla?MozEditorTextBoxBinding:IEEditorTextBoxBinding);
var _1136=new UserInterfaceMapping({"body":RootBinding,"ui:binding":Binding,"ui:box":Binding,"ui:dialog":DialogBinding,"ui:dialoghead":DialogHeadBinding,"ui:dialogbody":DialogBodyBinding,"ui:dialogmatrix":DialogMatrixBinding,"ui:dialogset":DialogSetBinding,"ui:dialogborder":DialogBorderBinding,"ui:dialogcover":DialogCoverBinding,"ui:titlebar":DialogTitleBarBinding,"ui:titlebarbody":DialogTitleBarBodyBinding,"ui:window":WindowBinding,"ui:controlgroup":ControlGroupBinding,"ui:control":ControlBinding,"ui:menubar":MenuBarBinding,"ui:menu":MenuBinding,"ui:menubody":MenuBodyBinding,"ui:menugroup":MenuGroupBinding,"ui:menuitem":MenuItemBinding,"ui:menupopup":MenuPopupBinding,"ui:tabbox":TabBoxBinding,"ui:tabs":TabsBinding,"ui:tab":TabBinding,"ui:tabpanels":TabPanelsBinding,"ui:tabpanel":TabPanelBinding,"ui:splitbox":SplitBoxBinding,"ui:splitpanel":SplitPanelBinding,"ui:splitter":SplitterBinding,"ui:decks":DecksBinding,"ui:deck":DeckBinding,"ui:toolbar":ToolBarBinding,"ui:toolbargroup":ToolBarGroupBinding,"ui:toolbarbody":ToolBarBodyBinding,"ui:toolbarbutton":ToolBarButtonBinding,"ui:toolbarlabel":ToolBarLabelBinding,"ui:labelbox":LabelBinding,"ui:text":TextBinding,"ui:clickbutton":ClickButtonBinding,"ui:tree":TreeBinding,"ui:treebody":TreeBodyBinding,"ui:treenode":TreeNodeBinding,"ui:flexbox":FlexBoxBinding,"ui:scrollbox":ScrollBoxBinding,"ui:popupset":PopupSetBinding,"ui:popup":PopupBinding,"ui:shadow":ShadowBinding,"ui:matrix":MatrixBinding,"ui:sourceeditor":CodeMirrorEditorBinding,"ui:visualeditor":VisualEditorBinding,"ui:visualmultieditor":VisualMultiEditorBinding,"ui:visualmultitemplateeditor":VisualMultiTemplateEditorBinding,"ui:wysiwygeditortoolbarbutton":EditorToolBarButtonBinding,"ui:dock":DockBinding,"ui:docktabs":DockTabsBinding,"ui:docktab":DockTabBinding,"ui:dockpanels":DockPanelsBinding,"ui:dockpanel":DockPanelBinding,"ui:page":PageBinding,"ui:editorpage":EditorPageBinding,"ui:dialogpage":DialogPageBinding,"ui:pagebody":DialogPageBodyBinding,"ui:wizardpage":WizardPageBinding,"ui:explorer":ExplorerBinding,"ui:explorerdecks":ExplorerDecksBinding,"ui:explorerdeck":ExplorerDeckBinding,"ui:explorersplitter":ExplorerSplitterBinding,"ui:explorermenu":ExplorerMenuBinding,"ui:explorertoolbar":ExplorerToolBarBinding,"ui:explorertoolbarbutton":ExplorerToolBarButtonBinding,"ui:stagecontainer":StageContainerBinding,"ui:stage":StageBinding,"ui:stagedecks":StageDecksBinding,"ui:stagedeck":StageDeckBinding,"ui:viewset":ViewSetBinding,"ui:view":ViewBinding,"ui:broadcasterset":BroadcasterSetBinding,"ui:broadcaster":BroadcasterBinding,"ui:fields":FieldsBinding,"ui:fieldgroup":FieldGroupBinding,"ui:field":FieldBinding,"ui:fielddesc":FieldDescBinding,"ui:fielddata":FieldDataBinding,"ui:fieldhelp":FieldHelpBinding,"ui:datainput":DataInputBinding,"ui:selector":SelectorBinding,"ui:simpleselector":SimpleSelectorBinding,"ui:multiselector":MultiSelectorBinding,"ui:datainputselector":DataInputSelectorBinding,"ui:datainputdialog":DataInputDialogBinding,"ui:textbox":TextBoxBinding,"ui:editortextbox":_1135,"ui:radiodatagroup":RadioDataGroupBinding,"ui:radio":RadioDataBinding,"ui:checkbutton":CheckButtonBinding,"ui:checkbox":CheckBoxBinding,"ui:checkboxgroup":CheckBoxGroupBinding,"ui:datadialog":DataDialogBinding,"ui:postbackdialog":PostBackDataDialogBinding,"ui:nullpostbackdialog":NullPostBackDataDialogBinding,"ui:htmldatadialog":HTMLDataDialogBinding,"ui:functioneditor":FunctionEditorDataBinding,"ui:parametereditor":ParameterEditorDataBinding,"ui:keyset":KeySetBinding,"ui:cover":CoverBinding,"ui:uncover":UncoverBinding,"ui:cursor":CursorBinding,"ui:dialogtoolbar":DialogToolBarBinding,"ui:focus":FocusBinding,"ui:balloonset":BalloonSetBinding,"ui:balloon":BalloonBinding,"ui:error":ErrorBinding,"ui:throbber":ThrobberBinding,"ui:progressbar":ProgressBarBinding,"ui:lazybinding":LazyBindingBinding,"ui:sourcecodeviewer":SourceCodeViewerBinding,"ui:theatre":TheatreBinding,"ui:persistance":PersistanceBinding,"ui:filepicker":FilePickerBinding,"ui:request":RequestBinding,"ui:response":ResponseBinding});
var _1137=SystemLogger.getLogger("UserInterface");
var keys={};
this.registerBinding=function(_1139,impl){
var _113b=null;
if(!this.hasBinding(_1139)){
var _113c=DOMUtil.getParentWindow(_1139);
if(DOMUtil.getLocalName(_1139)!="bindingmapping"){
if(!impl&&_1139.getAttribute("binding")!=null){
var _113d=_1139.getAttribute("binding");
impl=_113c[_113d];
if(impl==null){
throw "No such binding in scope: "+_113d;
}
}
if(!impl){
var _113e=_113c.DocumentManager;
if(_113e){
var _113f=_113e.customUserInterfaceMapping;
if(_113f){
impl=_113f.getBindingImplementation(_1139);
}
}
}
if(!impl){
impl=_1136.getBindingImplementation(_1139);
}
if(impl!=null&&!Application.isMalFunctional){
try{
_113b=new impl();
}
catch(exception){
Application.isMalFunctional=true;
alert("No such binding!\n"+exception.message+(exception.stack?"\n"+exception.stack:""));
throw (exception);
}
}
if(_113b){
var key=KeyMaster.getUniqueKey();
_1139.setAttribute("key",key);
_113b.key=key;
if(!_1139.id){
_1139.id=key;
}
keys[key]={element:_1139,binding:_113b};
_113b.onBindingRegister();
}
}
}
return _113b;
};
this.unRegisterBinding=function(_1141){
terminate(_1141);
};
function terminate(_1142){
if(Binding.exists(_1142)==true){
var key=_1142.key;
Binding.destroy(_1142);
if(key){
if(keys[key]){
keys[key].binding=null;
keys[key].element=null;
delete keys[key];
_1142=null;
}else{
_1137.error("URGH: "+key);
}
}
}
}
this.getElement=function(_1144){
var _1145=null;
if(keys[_1144.key]){
_1145=keys[_1144.key].element;
}
return _1145;
};
this.getBinding=function(_1146){
var _1147=null;
if(_1146&&_1146.nodeType==Node.ELEMENT_NODE){
try{
var key=_1146.getAttribute("key");
if(key&&keys[key]){
_1147=keys[key].binding;
}
}
catch(exception){
alert("getBinding exception occured on element:\n\n\t\t"+_1146);
if(exception.stack){
alert(exception.stack);
}
}
}
return _1147;
};
this.getBindingByKey=function(key){
var _114a=null;
if(keys[key]){
_114a=keys[key].binding;
}
return _114a;
};
this.hasBinding=function(_114b){
return this.getBinding(_114b)!=null;
};
this.isBindingVisible=function(_114c){
var _114d=Application.isOperational;
if(_114d==true){
var _114e=new Crawler();
_114e.type=NodeCrawler.TYPE_ASCENDING;
_114e.id="visibilitycrawler";
_114e.addFilter(function(_114f){
var b=UserInterface.getBinding(_114f);
var res=0;
if(!b.isVisible){
_114d=false;
res=NodeCrawler.STOP_CRAWLING;
}
return res;
});
_114e.crawl(_114c.bindingElement);
_114e.dispose();
}
return _114d;
};
var _1152=null;
this.getBindingCount=function(){
var count=0;
for(var key in keys){
count++;
}
return count;
};
this.setPoint=function(){
_1152={};
for(var key in keys){
_1152[key]=true;
}
};
this.getPoint=function(){
var _1156=null;
if(_1152){
_1156=new List();
for(var key in keys){
if(!_1152[key]){
_1156.add(key);
}
}
}
return _1156;
};
this.clearPoint=function(){
_1152=null;
};
this.trackUndisposedBindings=function(){
var _1158=null;
for(var key in keys){
var entry=keys[key];
if(!entry.binding||!entry.element||!Binding.exists(entry.binding)){
if(!_1158){
_1158="Bindings illdisposed: ";
}
_1158+=entry.binding+" ";
}
}
if(_1158!=null){
_1137.error(_1158);
}
};
this.autoTrackDisposedBindings=function(_115b){
if(_115b){
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
SOAPRequest.newInstance=function(_115c,_115d){
var _115e=_115c+"/"+_115d;
var _115f=new SOAPRequest(_115e);
var _1160=SOAPRequest.resolver;
_115f.document=Templates.getTemplateDocument("soapenvelope.xml");
_115f.envelope=_1160.resolve("soap:Envelope",_115f.document);
_115f.header=_1160.resolve("soap:Header",_115f.envelope);
_115f.body=_1160.resolve("soap:Body",_115f.envelope);
return _115f;
};
SOAPRequest._parseResponse=function(_1161){
var _1162=null;
var _1163=false;
var doc=_1161.responseXML;
if(doc!=null&&doc.documentElement!=null){
switch(doc.documentElement.namespaceURI){
case Constants.NS_ENVELOPE:
_1162=SOAPRequestResponse.newInstance(_1161.responseXML);
if(Application.isOffLine){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_ONLINE);
}
break;
case Constants.NS_XHTML:
if(!Application.isOffLine){
var body=SOAPRequest.resolver.resolve("xhtml:html/xhtml:body",_1161.responseXML);
if(body&&body.getAttribute("id")=="offline"){
_1163=true;
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
var text=_1161.responseText;
if(text.indexOf("id=\"offline\"")>-1){
_1163=true;
}else{
var cry="Invalid SOAP response: \n\n"+_1161.responseText;
SystemLogger.getLogger("SOAPRequest._parseResponse (static)").error(cry);
if(Application.isDeveloperMode){
alert("Invalid SOAP response");
window.open("about:blank").document.write(_1161.responseText);
}
}
}
}
if(_1163==true){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_OFFLINE);
}
return _1162;
};
function SOAPRequest(_1168){
this.logger=SystemLogger.getLogger("SOAPRequest");
this.action=_1168;
return this;
}
SOAPRequest.prototype.invoke=function(url){
var _116a=DOMUtil.getXMLHTTPRequest();
var _116b=null;
_116a.open("post",url,false);
_116a.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_116a.setRequestHeader("SOAPAction",this.action);
try{
_116a.send(this.document);
_116b=SOAPRequest._parseResponse(_116a);
}
catch(exception){
var error="Dysfuntion in SOAP invoke: "+url;
if(this.document!=null){
error+="\n"+DOMSerializer.serialize(this.document,true);
}
this.logger.error(error);
throw exception;
}
_116a=null;
return _116b;
};
SOAPRequest.prototype.dispose=function(){
for(var _116d in this){
this[_116d]=null;
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
var _116f=null;
if(doc&&doc.documentElement){
_116f=new SOAPRequestResponse();
var _1170=SOAPRequestResponse.resolver;
_116f.document=doc;
_116f.envelope=_1170.resolve("soap:Envelope",_116f.document);
_116f.header=_1170.resolve("soap:Header",_116f.envelope);
_116f.body=_1170.resolve("soap:Body",_116f.envelope);
var fault=_1170.resolve("soap:Fault",_116f.body);
if(fault){
SOAPRequestResponse.logger.fatal(DOMSerializer.serialize(fault,true));
_116f.fault={element:fault,faultNamespaceURI:fault.namespaceURI,faultCode:DOMUtil.getTextContent(_1170.resolve("faultcode",fault)),faultString:DOMUtil.getTextContent(_1170.resolve("faultstring",fault)),detail:fault.getElementsByTagName("detail").item(0)};
}
}
return _116f;
};
function SOAPFault(_1172,_1173,_1174){
this._operationName=_1172;
this._operationAddress=_1173;
this._faultString=_1174;
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
SOAPFault.newInstance=function(_1175,fault){
return new SOAPFault(_1175.name,_1175.address,fault.faultString);
};
function SOAPEncoder(wsdl,_1178){
this.logger=SystemLogger.getLogger("SOAPEncoder");
this._wsdl=wsdl;
this._operation=_1178;
this._namespace=wsdl.getTargetNamespace();
}
SOAPEncoder.prototype.encode=function(args){
var _117a=SOAPRequest.newInstance(this._namespace,this._operation);
var root=this._appendElement(_117a.body,this._operation);
var _117c=this._wsdl.getSchema();
var _117d=_117c.lookup(this._operation);
var _117e=_117d.getListedDefinitions();
while(_117e.hasNext()){
var def=_117e.getNext();
var elm=this._appendElement(root,def.name);
var val=args.getNext();
this._resolve(elm,def,val);
}
return _117a;
};
SOAPEncoder.prototype._resolve=function(_1182,_1183,value){
var _1185=this._wsdl.getSchema();
if(_1183.isSimpleValue){
this._appendText(_1182,value,_1183.type=="string");
}else{
var _1186=_1185.lookup(_1183.type);
if(_1186 instanceof SchemaSimpleType){
alert("SOAPEncoder: SchemaSimpleType support not implemented!");
}else{
var defs=_1186.getListedDefinitions();
if(_1186.isArray){
var _1188=new List(value);
var def=defs.getNext();
while(_1188.hasNext()){
var elm=this._appendElement(_1182,def.name);
var val=_1188.getNext();
this._resolve(elm,def,val);
}
}else{
while(defs.hasNext()){
try{
var def=defs.getNext();
var elm=this._appendElement(_1182,def.name);
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
SOAPEncoder.prototype._appendText=function(_118f,value,_1191){
if(value!=null){
value=new String(value);
var safe=new String("");
var chars=value.split("");
var _1194=false;
var i=0,c;
while(c=chars[i++]){
var _1197=true;
var code=c.charCodeAt(0);
switch(code){
case 9:
case 10:
case 13:
_1197=false;
break;
default:
if((code>=32&&code<=55295)||(code>=57344&&code<=65533)||(code>=65536&&code<=1114111)){
_1197=false;
}
break;
}
if(!_1197){
safe+=c;
}else{
_1194=true;
}
}
if(_1194){
this.logger.debug("Illegal XML character(s) was deleted from the string: "+value);
}
_118f.appendChild(_118f.ownerDocument.createTextNode(safe));
}
};
function SOAPDecoder(wsdl,_119a){
this._wsdl=wsdl;
this._operation=_119a;
this._resolver=new XPathResolver();
this._resolver.setNamespacePrefixResolver({"result":wsdl.getTargetNamespace()});
}
SOAPDecoder.prototype.resolve=function(xpath,node){
return this._resolver.resolve("result:"+xpath,node);
};
SOAPDecoder.prototype.resolveAll=function(xpath,node){
return this._resolver.resolveAll("result:"+xpath,node);
};
SOAPDecoder.prototype.decode=function(_119f){
var _11a0=null;
var _11a1=this._wsdl.getSchema();
var id=this._operation+"Response";
var _11a3=this.resolve(id,_119f.body);
var _11a4=_11a1.lookup(id);
var _11a5=_11a4.getListedDefinitions();
while(!_11a0&&_11a5.hasNext()){
var def=_11a5.getNext();
var elm=this.resolve(def.name,_11a3);
if(def.type==SchemaDefinition.TYPE_XML_DOCUMENT){
_11a0=DOMUtil.getDOMDocument();
var e=elm.getElementsByTagName("*").item(0);
if(typeof _11a0.importNode!=Types.UNDEFINED){
_11a0.appendChild(_11a0.importNode(e,true));
}else{
_11a0.loadXML(DOMSerializer.serialize(e));
}
}else{
_11a0=this._compute(elm,def);
}
}
return _11a0;
};
SOAPDecoder.prototype._compute=function(_11a9,_11aa){
var _11ab=null;
var _11ac=this._wsdl.getSchema();
if(_11aa.isSimpleValue){
_11ab=this._getSimpleValue(_11a9,_11aa.type);
}else{
var _11ad=_11ac.lookup(_11aa.type);
if(_11ad instanceof SchemaSimpleType){
_11ab=this._getSimpleValue(_11a9,_11ad.restrictionType);
}else{
var defs=_11ad.getListedDefinitions();
if(_11ad.isArray){
_11ab=[];
var def=defs.getNext();
var elms=this.resolveAll(def.type,_11a9);
while(elms.hasNext()){
var elm=elms.getNext();
_11ab.push(this._compute(elm,def));
}
}else{
_11ab={};
defs.reset();
while(defs.hasNext()){
var def=defs.getNext();
var elm=this.resolve(def.name,_11a9);
if(elm){
_11ab[def.name]=this._compute(elm,def);
}else{
if(def.isRequired){
throw new Error("SOAPDecoder: invalid SOAP response.");
}
}
}
}
}
}
return _11ab;
};
SOAPDecoder.prototype._getSimpleValue=function(_11b2,type){
var _11b4=null;
if(_11b2.firstChild&&_11b2.firstChild.nodeType==Node.TEXT_NODE){
if(Client.isMozilla&&_11b2.childNodes.length>1){
_11b2.normalize();
}
_11b4=_11b2.firstChild.data;
switch(type){
case Schema.types.STRING:
_11b4=_11b4;
break;
case Schema.types.INT:
case Schema.types.FLOAT:
case Schema.types.DOUBLE:
_11b4=Number(_11b4);
break;
case Schema.types.BOOLEAN:
_11b4=_11b4=="true";
break;
default:
throw ("SOAPDecoder: schema type \""+type+"\" not handled.");
break;
}
}
return _11b4;
};
Schema.prototype=new XPathResolver;
Schema.prototype.constructor=Schema;
Schema.superclass=XPathResolver.prototype;
Schema.types={STRING:"string",INT:"int",FLOAT:"float",DOUBLE:"double",BOOLEAN:"boolean"};
Schema.notSupportedException=new Error("Schema: Schema structure not supported!");
function Schema(_11b5){
this.logger=SystemLogger.getLogger("Schema");
this._map=this._parseSchema(_11b5);
}
Schema.prototype._parseSchema=function(_11b6){
this.setNamespacePrefixResolver({"wsdl":Constants.NS_WSDL,"soap":Constants.NS_SOAP,"s":Constants.NS_SCHEMA});
var _11b7={};
var entry=null;
var rules=this.resolveAll("s:*[@name]",_11b6);
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
_11b7[rule.getAttribute("name")]=entry;
}
return _11b7;
};
Schema.prototype.lookup=function(name){
return this._map[name];
};
SchemaDefinition.TYPE_XML_DOCUMENT="xmldocument";
function SchemaDefinition(_11bc){
this.logger=SystemLogger.getLogger("SchemaDefinition");
this.isRequired=null;
this.type=null;
this._parse(_11bc);
}
SchemaDefinition.prototype._parse=function(_11bd){
var min=_11bd.getAttribute("minOccurs");
var max=_11bd.getAttribute("maxOccurs");
var type=_11bd.getAttribute("type");
this.name=_11bd.getAttribute("name");
this.isRequired=min!="0";
if(type){
var split=type.split(":");
var sort=split[0];
var _11c3=split[1];
this.isSimpleValue=sort!="tns";
this.type=_11c3;
}else{
var elm=_11bd.getElementsByTagName("*").item(0);
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
function SchemaElementType(_11c5,_11c6){
this.logger=SystemLogger.getLogger("SchemaElementType");
this._definitions=new List();
this._parseListedDefinitions(_11c5,_11c6);
}
SchemaElementType.prototype._parseListedDefinitions=function(_11c7,_11c8){
var els=_11c7.resolveAll("s:complexType/s:sequence/s:element",_11c8);
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
function SchemaComplexType(_11ca,_11cb){
this._definitions=new List();
this._parseListedDefinitions(_11ca,_11cb);
this.isArray=_11cb.getAttribute("name").indexOf("ArrayOf")>-1;
}
SchemaComplexType.prototype._parseListedDefinitions=function(_11cc,_11cd){
var els=_11cc.resolveAll("s:sequence/s:element",_11cd);
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
function SchemaSimpleType(_11d0,_11d1){
this.restrictionType=null;
this._parse(_11d0,_11d1);
}
SchemaSimpleType.prototype._parse=function(_11d2,_11d3){
var _11d4=_11d2.resolve("s:restriction",_11d3);
if(_11d4){
this.restrictionType=_11d4.getAttribute("base").split(":")[1];
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
var _11d7=null;
var _11d8=DOMUtil.getXMLHTTPRequest();
_11d8.open("get",url,false);
_11d8.send(null);
if(_11d8.responseXML){
_11d7=_11d8.responseXML.documentElement;
}else{
alert(_11d8.responseText);
throw new Error("WebServiceResolver: Could not read WSDL: "+url);
}
return _11d7;
};
WebServiceResolver.prototype.getPortAddress=function(){
return this._WSDLURL.split("?WSDL")[0];
};
WebServiceResolver.prototype.getTargetNamespace=function(){
return this._root.getAttribute("targetNamespace");
};
WebServiceResolver.prototype.getOperations=function(){
var _11d9=new List();
var _11da=this.resolveAll("wsdl:portType/wsdl:operation",this._root);
if(_11da.hasEntries()){
while(_11da.hasNext()){
var _11db=_11da.getNext();
var name=_11db.getAttribute("name");
_11d9.add(new WebServiceOperation(name,this.getPortAddress(),new SOAPEncoder(this,name),new SOAPDecoder(this,name)));
}
}else{
throw new Error("WebServiceResolver: No portType found.");
}
return _11d9;
};
WebServiceResolver.prototype.getSchema=function(){
return this._schema;
};
function WebServiceOperation(name,_11de,_11df,_11e0){
this.name=name;
this.address=_11de;
this.encoder=_11df;
this.decoder=_11e0;
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
var _11e4=wsdl.getOperations();
_11e4.each(function(_11e5){
proxy[_11e5.name]=WebServiceProxy.createProxyOperation(_11e5);
});
return proxy;
};
WebServiceProxy.prototype._log=function(_11e6,_11e7){
if(WebServiceProxy.isLoggingEnabled&&Application.isDeveloperMode&&_11e7){
var log=_11e7 instanceof SOAPRequest?"SOAPRequest for ":"SOAPResponse from ";
log+=_11e6.address+": "+_11e6.name+"\n\n";
log+=DOMSerializer.serialize(_11e7.document,true);
this.logger.fine(log);
}
};
WebServiceProxy.createProxyOperation=function(_11e9){
return function(){
var _11ea=null,_11eb=_11e9.encoder.encode(new List(arguments));
this._log(_11e9,_11eb);
var _11ec=_11eb.invoke(_11e9.address);
this._log(_11e9,_11ec);
if(_11ec){
if(_11ec.fault){
_11ea=SOAPFault.newInstance(_11e9,_11ec.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_11ea,_11eb,_11ec);
}
}else{
if(WebServiceProxy.isDOMResult){
_11ea=_11ec.document;
}else{
_11ea=_11e9.decoder.decode(_11ec);
}
}
}
_11eb.dispose();
return _11ea;
};
};
WebServiceProxy.handleFault=function(_11ed,_11ee,_11ef){
try{
Dialog.invokeModal(Dialog.URL_SERVICEFAULT,null,{soapFault:_11ed,soapRequest:_11ee,soapResponse:_11ef});
}
catch(exception){
alert(_11ed.getFaultString());
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
var _11f0=SystemLogger.getLogger("MessageQueue");
var _11f1=null;
var _11f2=0;
var _11f3=null;
var _11f4=new Map();
var _11f5=new Map();
var _11f6=false;
var _11f7=false;
var _11f8={"Main":DockBinding.MAIN,"BottomLeft":DockBinding.BOTTOMLEFT,"BottomRight":DockBinding.BOTTOMRIGHT,"RightTop":DockBinding.RIGHTTOP,"RightBottom":DockBinding.RIGHTBOTTOM,"AbsBottomLeft":DockBinding.ABSBOTTOMLEFT,"AbsBottomRight":DockBinding.ABSBOTTOMRIGHT};
this.initialize=function(){
_11f1=ConsoleMessageQueueService;
_11f2=_11f1.GetCurrentSequenceNumber("dummyparam!");
this.index=_11f2;
EventBroadcaster.subscribe(BroadcastMessages.VIEW_COMPLETED,this);
EventBroadcaster.subscribe(BroadcastMessages.VIEW_CLOSED,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_OFFLINE,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_ONLINE,this);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
};
this._autoupdate=function(){
if(!_11f6){
if(!MessageQueue._actions.hasEntries()){
var _11f9=WebServiceProxy.isLoggingEnabled;
if(Application.isLoggedIn){
_11f7=true;
WebServiceProxy.isLoggingEnabled=false;
MessageQueue.update();
WebServiceProxy.isLoggingEnabled=_11f9;
_11f7=false;
}
}
}
};
this._pokeserver=function(){
if(_11f6==true){
if(ReadyService.IsServerReady(true)){
MessageQueue._lockSystem(false);
}
}
};
this.update=function(){
if(Application.isLoggedIn){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_REQUESTED,_11f7);
var _11fa=_11f1.GetMessages(Application.CONSOLE_ID,this.index);
if(_11fa!=null){
if(Types.isDefined(_11fa.CurrentSequenceNumber)){
var _11fb=_11fa.CurrentSequenceNumber;
if(_11fb<this.index){
_11f0.debug("SERVER WAS RESTARTED! old messagequeue index: "+this.index+", new messagequeue index: "+_11fb);
}
this.index=_11fb;
var _11fc=new List(_11fa.ConsoleActions);
if(_11fc.hasEntries()){
this.evaluate(_11fc);
}else{
if(!this._actions.hasEntries()){
broadcastUpdateEvaluated();
}
}
}else{
_11f0.error("No sequencenumber in MessageQueue response!");
}
}
}
};
this.evaluate=function(_11fd){
var _11fe=new List();
if(_11fd.hasEntries()){
_11fd.each(function(_11ff){
if(this._index[_11ff.Id]!=true){
_11fe.add(_11ff);
}
this._index[_11ff.Id]=true;
},this);
if(_11fe.hasEntries()){
if(this._actions.hasEntries()){
this._actions.merge(_11fe);
}else{
this._actions=_11fe;
}
this._nextAction();
}
}
};
this._closeAllViews=function(_1200){
var _1201="(No reason)";
if(_1200!=null){
_1201=_1200.Reason;
}
var title="Warning";
var text="The server has requested a close of all active editors for the following reason: \"${reason}\". It is recommended that you accept this request by clicking OK.";
text=text.replace("${reason}",_1201);
var self=this;
Dialog.warning(title,text,Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_1205){
if(_1205==Dialog.RESPONSE_ACCEPT){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEWS);
}
self._nextAction();
}});
};
this._nextAction=function(){
var _1206=null;
if(this._actions.hasEntries()){
var _1207=this._actions.extractFirst();
_11f2=_1207.SequenceNumber;
_11f0.debug("MessageQueue action: "+_1207.ActionType+" > QUEUE-MAX-SEQNUM: "+this.index+" > CURRENT SEQNUM: "+_11f2+" > ACTIONS-LEFT: "+this._actions.getLength());
switch(_1207.ActionType){
case "OpenView":
_1206=_1207.OpenViewParams;
if(_1206.ViewType=="ModalDialog"){
openDialogView(_1206);
}else{
_11f3=_1206.ViewId;
openView(_1206);
}
break;
case "CloseView":
_1206=_1207.CloseViewParams;
_11f3=_1206.ViewId;
closeView(_1206);
break;
case "RefreshTree":
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,_1207.RefreshTreeParams.EntityToken);
var debug="REFRESHING TREES: "+_11f4.countEntries()+"\n";
_11f4.each(function(token){
debug+="\n\tTOKEN: "+token;
});
_11f0.debug(debug);
if(!_11f4.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "SelectElement":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_FOCUS,_1207.BindEntityTokenToViewParams.EntityToken);
this._nextAction();
break;
case "MessageBox":
openMessageBox(_1207.MessageBoxParams);
break;
case "OpenViewDefinition":
_1206=_1207.OpenViewDefinitionParams;
_11f3=_1206.Handle;
openViewDefinition(_1206);
break;
case "LogEntry":
logEntry(_1207.LogEntryParams);
this._nextAction();
break;
case "Reboot":
Application.reload(true);
break;
case "LockSystem":
MessageQueue._lockSystem(true);
break;
case "BroadcastMessage":
_1206=_1207.BroadcastMessageParams;
_11f0.debug("Server says: EventBroadcaster.broadcast ( \""+_1206.Name+"\", "+_1206.Value+" )");
EventBroadcaster.broadcast(_1206.Name,_1206.Value);
this._nextAction();
break;
case "CollapseAndRefresh":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_COLLAPSEALL);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
if(!_11f4.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "CloseAllViews":
this._closeAllViews(_1207.CloseAllViewsParams);
break;
case "SaveStatus":
saveStatus(_1207.SaveStatusParams);
this._nextAction();
break;
case "DownloadFile":
Download.init(_1207.DownloadFileParams.Url);
this._nextAction();
break;
case "ExpandTreeNode":
this._nextAction();
break;
case "BindEntityTokenToView":
_1206=_1207.BindEntityTokenToViewParams;
EventBroadcaster.broadcast(BroadcastMessages.BIND_TOKEN_TO_VIEW,{handle:_1206.ViewId,entityToken:_1206.EntityToken});
this._nextAction();
break;
case "OpenGenericView":
_1206=_1207.OpenGenericViewParams;
openGenericView(_1206);
break;
default:
Dialog.error("Dysfunction","Unhandled action: "+_1207.ActionType);
break;
}
}else{
broadcastUpdateEvaluated();
}
};
function broadcastUpdateEvaluated(){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_EVALUATED,_11f7);
}
function logEntry(_120a){
var _120b=_120a.Level.toLowerCase();
SystemLogger.getLogger(_120a.SenderId)[_120b](_120a.Message);
}
function openView(_120c){
var list=paramsToList(_120c.Argument);
if(list.hasEntries()){
var def=ViewDefinition.clone("Composite.Management.PostBackView",_120c.ViewId);
def.entityToken=_120c.EntityToken;
def.flowHandle=_120c.FlowHandle;
def.position=_11f8[_120c.ViewType],def.label=_120c.Label;
def.image=_120c.Image;
def.toolTip=_120c.ToolTip;
def.argument={"url":_120c.Url,"list":list};
StageBinding.presentViewDefinition(def);
}else{
StageBinding.presentViewDefinition(new HostedViewDefinition({handle:_120c.ViewId,entityToken:_120c.EntityToken,flowHandle:_120c.FlowHandle,position:_11f8[_120c.ViewType],url:_120c.Url,label:_120c.Label,image:_120c.Image,toolTip:_120c.ToolTip}));
}
}
function openDialogView(_120f){
StageBinding.presentViewDefinition(new DialogViewDefinition({handle:_120f.ViewId,flowHandle:_120f.FlowHandle,position:Dialog.MODAL,url:_120f.Url,handler:{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}}}));
}
function openMessageBox(_1210){
var _1211=_1210.DialogType.toLowerCase();
if(_1211=="question"){
throw "Not supported!";
}else{
Dialog[_1211](_1210.Title,_1210.Message,null,{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}});
}
}
function openViewDefinition(_1212){
var map={};
var _1214=false;
new List(_1212.Argument).each(function(entry){
map[entry.Key]=entry.Value;
_1214=true;
});
var proto=ViewDefinitions[_1212.Handle];
if(proto!=null){
var def=null;
if(proto.isMutable==false){
def=proto;
}else{
def=new HostedViewDefinition();
for(var prop in proto){
def[prop]=proto[prop];
}
def.handle=_1212.ViewId;
}
def.argument=_1214?map:null;
StageBinding.presentViewDefinition(def);
}else{
throw "Unknown ViewDefinition: "+param.Handle;
}
}
function openGenericView(_1219){
var def=ViewBinding.clone("Composite.Management.GenericView",_1219.ViewId);
def.label=_1219.Label;
def.toolTip=_1219.ToolTip;
def.image=_1219.Image;
def.argument={"url":_1219.Url,"list":paramsToList(_1219.UrlPostArguments)};
StageBinding.presentViewDefinition(def);
}
function closeView(_121b){
if(StageBinding.isViewOpen(_121b.ViewId)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_121b.ViewId);
}else{
MessageQueue._nextAction();
}
}
function saveStatus(_121c){
EventBroadcaster.broadcast(BroadcastMessages.CURRENT_SAVED,{handle:_121c.ViewId,isSuccess:_121c.Succeeded});
}
this._lockSystem=function(_121d){
var _121e=top.bindingMap.offlinetheatre;
if(_121d){
_121e.play(true);
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._pokeserver,MessageQueue.INTERVAL_OFFLINE);
}else{
_121e.stop();
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
var self=this;
setTimeout(function(){
if(self._actions.hasEntries()){
self._nextAction();
}
},0);
}
_11f6=_121d;
};
this.handleBroadcast=function(_1220,arg){
switch(_1220){
case BroadcastMessages.APPLICATION_LOGIN:
this.initialize();
break;
case BroadcastMessages.VIEW_COMPLETED:
case BroadcastMessages.VIEW_CLOSED:
if(_11f3!=null&&arg==_11f3){
_11f3=null;
this._nextAction();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHING:
if(arg!=null){
_11f4.set(arg,true);
}else{
_11f0.debug("Saa har vi balladen!");
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED:
if(_11f4.hasEntries()){
_11f4.del(arg);
_11f0.debug("Refreshed tree: "+arg+"\n("+_11f4.countEntries()+" trees left!)");
if(!_11f4.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
setTimeout(function(){
MessageQueue._nextAction();
},0);
}
}
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN:
_11f5.set(arg,true);
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN:
if(_11f5.hasEntries()==true){
_11f5.del(arg);
if(!_11f5.hasEntries()){
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
function paramsToList(_1222){
var list=new List();
new List(_1222).each(function(entry){
list.add({name:entry.Key,value:entry.Value});
});
return list;
}
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
};
var ViewDefinitions={"Composite.Management.Null":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.Null"}),"Composite.Management.PostBackDialog":new DialogViewDefinition({handle:"Composite.Management.PostBackDialog",isMutable:true,position:Dialog.MODAL,url:"${root}/content/dialogs/postback/postbackdialog.aspx",argument:{"url":null,"list":null}}),"Composite.Management.PostBackView":new HostedViewDefinition({handle:"Composite.Management.PostBackView",isMutable:true,position:DockBinding.MAIN,url:"${root}/postback.aspx",argument:{"url":null,"list":null}}),"Composite.Management.GenericView":new HostedViewDefinition({handle:"Composite.Management.GenericView",isMutable:true,position:DockBinding.MAIN,url:"${root}/content/views/generic/generic.aspx",label:null,image:null,toolTip:null,argument:{"url":null,"list":null}}),"Composite.Management.Start":new HostedViewDefinition({handle:"Composite.Management.Start",position:DockBinding.START,label:"Welcome Travellers",url:"${root}/content/views/start/start.aspx"}),"Composite.Management.About":new DialogViewDefinition({handle:"Composite.Management.About",position:Dialog.MODAL,url:"${root}/content/dialogs/about/about.aspx"}),"Composite.Management.PermissionEditor":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.PermissionEditor",position:DockBinding.MAIN,url:"${root}/content/views/editors/permissioneditor/permissioneditor.aspx",argument:{serializedEntityToken:"entityTokenType='Composite\\.Plugins\\.Elements\\.ElementProviders\\.VirtualElementProvider\\.VirtualElementProviderEntityToken,Composite'entityToken='_EntityToken_Type_=\\'Composite\\\\\\.Plugins\\\\\\.Elements\\\\\\.ElementProviders\\\\\\.VirtualElementProvider\\\\\\.VirtualElementProviderEntityToken,Composite\\'_EntityToken_Source_=\\'VirtualElementProvider\\'_EntityToken_Id_=\\'DesignPerspective\\''\""}}),"Composite.Management.SystemLog":new HostedViewDefinition({handle:"Composite.Management.SystemLog",position:DockBinding.ABSBOTTOMLEFT,label:"System Log",url:"${root}/content/views/dev/systemlog/systemlog.aspx"}),"Composite.Management.Developer":new HostedViewDefinition({handle:"Composite.Management.Developer",position:DockBinding.ABSBOTTOMRIGHT,label:"Developer",url:"${root}/content/views/dev/developer/developer.aspx"}),"Composite.Management.IconPack.System":new HostedViewDefinition({handle:"Composite.Management.IconPack.System",position:DockBinding.ABSBOTTOMLEFT,label:"Freja",image:"${icon:icon}",url:"${root}/content/views/dev/icons/system/Default.aspx"}),"Composite.Management.IconPack.Republic":new HostedViewDefinition({handle:"Composite.Management.IconPack.Republic",position:DockBinding.ABSBOTTOMLEFT,label:"Republic",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/republic.aspx"}),"Composite.Management.IconPack.Harmony":new HostedViewDefinition({handle:"Composite.Management.IconPack.Harmony",position:DockBinding.ABSBOTTOMLEFT,label:"Harmony",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/harmony.aspx"}),"Composite.Management.Explorer":new HostedViewDefinition({handle:"Composite.Management.Explorer",position:DockBinding.EXPLORER,url:"${root}/content/views/explorer/explorer.aspx",label:"Explorer"}),"Composite.Management.Options":new DialogViewDefinition({handle:"Composite.Management.Options",position:Dialog.MODAL,url:"${root}/content/dialogs/options/options.aspx",label:"Options"}),"Composite.Management.VisualEditorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.VisualEditorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/wysiwygeditor/wysiwygeditordialog.aspx",width:600,argument:{"formattingconfiguration":null,"elementclassconfiguration":null,"configurationstylesheet":null,"presentationstylesheet":null,"embedablefieldstypenames":null}}),"Composite.Management.MultiSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MultiSelectorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/multiselector/multiselectordialog.aspx"}),"Composite.Management.Search":new HostedViewDefinition({handle:"Composite.Management.Search",position:DockBinding.RIGHTBOTTOM,url:"${root}/content/views/search/search.aspx",label:"Search",image:"${icon:view_search}",argument:null}),"Composite.Management.Browser":new HostedViewDefinition({isMutable:false,handle:"Composite.Management.Browser",position:DockBinding.MAIN,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,label:"Page Browser",image:"${icon:page-view-administrated-scope}",toolTip:"Browse unpublished pages",url:"${root}/content/views/browser/browser.aspx",argument:{"URL":null}}),"Composite.Management.SEOAssistant":new HostedViewDefinition({handle:"Composite.Management.SEOAssistant",position:DockBinding.RIGHTTOP,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,url:"${root}/content/views/seoassist/seoassist.aspx",label:"${string:Composite.Web.SEOAssistant:SEOAssistant}",image:"${icon:seoassistant}",toolTip:"Search engine optimization"}),"Composite.Management.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.SourceCodeViewer",position:DockBinding.ABSBOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.User.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.User.SourceCodeViewer",position:DockBinding.BOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.Management.Help":new HostedViewDefinition({label:"${string:Website.App.LabelHelp}",image:"${icon:help}",handle:"Composite.Management.Help",position:DockBinding.ABSRIGHTTOP,url:"${root}/content/views/help/help.aspx"}),"Composite.Management.Dialog.Translations":new DialogViewDefinition({handle:"Composite.Management.TranslationsDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/translations/translations.aspx",label:"Translations",image:"${icon:users-changepublicculture}"}),"Composite.Management.ImageSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.ImageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_IMAGESELECTOR,argument:{label:"${string:Composite.Management:Website.Image.SelectDialog.Title}",image:"${icon:image}",selectionProperty:"ElementType",selectionValue:"image/jpeg image/gif image/png image/bmp image/tiff",selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WebImages"}]}}),"Composite.Management.EmbeddableMediaSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Media.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:null}]}}),"Composite.Management.FrontendFileSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.FrontendFile.SelectDialog.Title}",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"LayoutFileElementProvider"}]}}),"Composite.Management.PageSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.PageIdSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageIdSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Page.SelectDialog.Title}",image:"${icon:page}",selectionProperty:"DataId",selectionValue:null,selectionResult:"DataId",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.LinkableSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.LinkableSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"},{key:"MediaFileElementProvider"}]}}),"Composite.Management.MediaSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.MediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.ContentLink.SelectDialog.Title}",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider"}]}}),"Composite.Management.FunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.FunctionSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider"}]}}),"Composite.Management.WidgetFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.WidgetFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Widget.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllWidgetFunctionsElementProvider"}]}}),"Composite.Management.XhtmlDocumentFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.XhtmlDocumentFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"${string:Composite.Management:Website.Function.SelectDialog.Title}",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider",search:"AllFunctionsElementProvider.XhtmlDocument"}]}})};
var KickStart=new function(){
var _1225=false;
var _1226=false;
var _1227=null;
var _1228=false;
var _1229=Client.qualifies();
var _122a="admin";
var _122b="123456";
this.fireOnLoad=function(){
if(_1229){
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
this.handleBroadcast=function(_122c){
switch(_122c){
case BroadcastMessages.AUDIO_INITIALIZED:
case BroadcastMessages.PERSISTANCE_INITIALIZED:
kickStart(_122c);
break;
case BroadcastMessages.APPLICATION_STARTUP:
break;
case BroadcastMessages.KEY_ENTER:
this.login();
break;
case BroadcastMessages.APPLICATION_LOGIN:
var _122d=window.bindingMap.appwindow;
_122d.setURL("app.aspx");
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
function fileEventBroadcasterSubscriptions(_122e){
new List([BroadcastMessages.AUDIO_INITIALIZED,BroadcastMessages.PERSISTANCE_INITIALIZED,BroadcastMessages.APPLICATION_STARTUP,BroadcastMessages.APPLICATION_LOGIN,BroadcastMessages.APPLICATION_OPERATIONAL]).each(function(_122f){
if(_122e){
EventBroadcaster.subscribe(_122f,KickStart);
}else{
EventBroadcaster.unsubscribe(_122f,KickStart);
}
});
}
function kickStart(_1230){
switch(_1230){
case BroadcastMessages.AUDIO_INITIALIZED:
_1226=true;
setTimeout(function(){
Persistance.initialize();
},0);
break;
case BroadcastMessages.PERSISTANCE_INITIALIZED:
_1225=true;
break;
}
if(_1225&&_1226){
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
DataManager.getDataBinding("username").setValue(_122a);
DataManager.getDataBinding("password").setValue(_122b);
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
this.doLogin=function(_1233,_1234){
var _1235=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _1236=false;
var _1237=LoginService.ValidateAndLogin(_1233,_1234);
if(_1237 instanceof SOAPFault){
alert(_1237.getFaultString());
}else{
_1236=_1237;
}
if(_1236){
EventBroadcaster.unsubscribe(BroadcastMessages.KEY_ENTER,KickStart);
accessGranted();
}else{
Application.unlock(KickStart);
if(bindingMap.decks!=null){
accesssDenied();
}
}
WebServiceProxy.isFaultHandler=true;
if(_1235){
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
var _1238=DataManager.getDataBinding("username");
var _1239=DataManager.getDataBinding("password");
_1238.blur();
_1239.blur();
_1238.setValue("");
_1239.setValue("");
_1238.clean();
_1239.clean();
_1238.focus();
document.getElementById("loginerror").style.display="block";
var _123a={handleAction:function(_123b){
document.getElementById("loginerror").style.display="none";
_123b.target.removeActionListener(Binding.ACTION_DIRTY,_123a);
}};
bindingMap.loginfields.addActionListener(Binding.ACTION_DIRTY,_123a);
}
WindowManager.fireOnLoad(this);
if(!_1229){
UpdateManager.isEnabled=false;
}
};

