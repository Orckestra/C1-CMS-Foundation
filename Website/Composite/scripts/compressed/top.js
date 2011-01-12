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
},toGrayScaleURL:function(_bd){
var _be=document.createElement("canvas");
var ctx=_be.getContext("2d");
var _bd=new Image();
var _c0=_bd.width;
var _c1=_bd.height;
_be.width=_c0;
_be.height=_c1;
ctx.drawImage(_bd,0,0);
var _c2=ctx.getImageData(0,0,_c0,_c1);
for(j=0;j<_c2.height;i++){
for(i=0;i<_c2.width;j++){
var _c3=(i*4)*_c2.width+(j*4);
var red=_c2.data[_c3];
var _c5=_c2.data[_c3+1];
var _c6=_c2.data[_c3+2];
var _c7=_c2.data[_c3+3];
var _c8=(red+_c5+_c6)/3;
_c2.data[_c3]=_c8;
_c2.data[_c3+1]=_c8;
_c2.data[_c3+2]=_c8;
_c2.data[_c3+3]=_c7;
}
}
return _be.toDataURL();
}};
var ImageProvider=new _ImageProvider();
function _Resolver(){
}
_Resolver.prototype={_logger:SystemLogger.getLogger("Resolver"),resolve:function(_c9){
if(typeof _c9!=Types.UNDEFINED){
_c9=String(_c9);
_c9=_c9.replace("${root}",Constants.APPROOT);
_c9=_c9.replace("${skin}",Constants.SKINROOT);
_c9=_c9.replace("${tinymce}",Constants.TINYMCEROOT);
_c9=_c9.replace("${tiny}",Constants.TINYROOT);
if(_c9.indexOf("${icon:")>-1){
_c9=this._resolveImage(_c9);
}else{
if(_c9.indexOf("${string:")>-1){
_c9=this._resolveString(_c9);
}
}
}
return _c9;
},resolveVars:function(_ca,_cb){
var i=0;
while(i<_cb.length){
_ca=_ca.replace("{"+i+"}",_cb[i]);
i++;
}
return _ca;
},_resolveString:function(_cd){
var _ce=null;
var _cf=null;
var key=_cd.split("${string:")[1].split("}")[0];
if(key.indexOf(":")>-1){
_cf=key.split(":")[0];
key=key.split(":")[1];
}else{
_cf=StringBundle.UI;
}
_ce=StringBundle.getString(_cf,key);
if(!_ce){
_ce="(?)";
}
return _ce;
},_resolveImage:function(_d1){
var _d2=null;
var _d3=null;
var _d4=null;
var _d5=null;
_d4=_d1.split("${icon:")[1].split("}")[0];
if(_d4.indexOf(":")>-1){
_d3=_d4.split(":")[0];
_d4=_d4.split(":")[1];
}else{
_d3=ImageProvider.UI;
}
if(_d4.indexOf("(")>-1){
_d5=_d4.split("(")[1].split(")")[0];
_d4=_d4.split("(")[0];
}
_d2=ImageProvider.getImageURL({ResourceNamespace:_d3,ResourceName:_d4},_d5);
return _d2;
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
_Cookies.prototype={createCookie:function(_d8,_d9,_da){
var _db="";
if(_da){
var _dc=new Date();
_dc.setTime(_dc.getTime()+(_da*24*60*60*1000));
_db="; expires="+_dc.toGMTString();
}
document.cookie=_d8+"="+escape(_d9)+_db+"; path=/";
return this.readCookie(_d8);
},readCookie:function(_dd){
var _de=null;
var _df=_dd+"=";
var ca=document.cookie.split(";");
for(var i=0;i<ca.length;i++){
var c=ca[i];
while(c.charAt(0)==" "){
c=c.substring(1,c.length);
}
if(c.indexOf(_df)==0){
_de=unescape(c.substring(_df.length,c.length));
}
}
return _de;
},eraseCookie:function(_e3){
this.createCookie(_e3,"",-1);
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
var _e4=SystemLogger.getLogger("StatusBar");
var _e5=null;
var _e6="${icon:error}";
var _e7="${icon:warning}";
var _e8="${icon:loading}";
var _e9="${icon:message}";
var _ea=null;
var _eb=null;
var _ec=null;
var _ed=null;
this.initialize=function(_ee){
_ea=StringBundle.getString("ui","Website.App.StatusBar.Error");
_eb=StringBundle.getString("ui","Website.App.StatusBar.Warn");
_ec=StringBundle.getString("ui","Website.App.StatusBar.Busy");
_ed=StringBundle.getString("ui","Website.App.StatusBar.Ready");
_e5=_ee;
this.document=_ee.bindingDocument;
};
this.error=function(_ef,_f0){
this.state=StatusBar.ERROR;
_ef=_ef?_ef:_ea;
show(_ef,_e6,_f0,false);
};
this.warn=function(_f1,_f2){
this.state=StatusBar.WARN;
_f1=_f1?_f1:_eb;
show(_f1,_e7,_f2,false);
};
this.busy=function(_f3,_f4){
this.state=StatusBar.BUSY;
_f3=_f3?_f3:_ec;
show(_f3,_e8,_f4,false);
};
this.ready=function(_f5,_f6){
this.state=StatusBar.READY;
_f5=_f5?_f5:_ed;
show(_f5,_e9,_f6,true);
};
this.report=function(_f7,_f8,_f9,_fa){
this.state=null;
show(_f7,_f8,_f9,_fa);
};
this.clear=function(){
this.state=null;
if(_e5){
_e5.clear();
}
};
function show(_fb,_fc,_fd,_fe){
if(_fd){
_fb=Resolver.resolveVars(_fb,_fd);
}
if(_e5){
_e5.setLabel(_fb);
_e5.setImage(_fc);
if(_fe){
_e5.startFadeOut(StatusBar.AUTOCLEAR_TIMEOUT);
}
}else{
_e4.error("Message not initialized for display: "+_fb);
}
}
this.addToGroup=function(_ff,_100){
if(!this._groups.has(_ff)){
this._groups.set(_ff,_e5.addRight(ToolBarGroupBinding.newInstance(this.document)));
}
this._groups.get(_ff).add(_100);
};
}
var StatusBar=new _StatusBar();
function _Localization(){
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
EventBroadcaster.subscribe(BroadcastMessages.LANGUAGES_UPDATED,this);
EventBroadcaster.subscribe(BroadcastMessages.FROMLANGUAGE_UPDATED,this);
}
_Localization.prototype={languages:null,source:null,target:null,handleBroadcast:function(_101,arg){
switch(_101){
case BroadcastMessages.APPLICATION_LOGIN:
case BroadcastMessages.LANGUAGES_UPDATED:
var _103=LocalizationService.GetActiveLocales(true);
if(_103.length>=1){
this.languages=new List(_103);
}else{
this.languages=null;
}
EventBroadcaster.broadcast(BroadcastMessages.UPDATE_LANGUAGES,this.languages);
break;
}
switch(_101){
case BroadcastMessages.APPLICATION_LOGIN:
case BroadcastMessages.FROMLANGUAGE_UPDATED:
var _104=LocalizationService.GetLocales(true);
this.source=_104.ForeignLocaleName;
this.target=_104.ActiveLocaleName;
EventBroadcaster.broadcast(BroadcastMessages.LOCALIZATION_CHANGED,{source:_104.ForeignLocaleName,target:_104.ActiveLocaleName});
break;
}
}};
var Localization=new _Localization();
function _Validator(){
}
_Validator.prototype={validate:function(_105,key,_107){
var _108=true;
var _109=SourceValidationService.ValidateSource(_105,key);
if(_109!="True"){
if(_107==true){
this._dialog(_109);
}
_108=false;
}
return _108;
},validateInformed:function(_10a,key){
return this.validate(_10a,key,true);
},_dialog:function(_10c){
setTimeout(function(){
Dialog.error("Source Invalid",_10c);
},0);
}};
var Validator=new _Validator();
function _DOMEvents(){
}
_DOMEvents.prototype={_logger:SystemLogger.getLogger("DOMEvents"),MOUSEDOWN:"mousedown",MOUSEUP:"mouseup",MOUSEOVER:"mouseover",MOUSEOUT:"mouseout",MOUSEMOVE:"mousemove",CLICK:"click",DOUBLECLICK:"dblclick",KEYPRESS:"keypress",KEYDOWN:"keydown",KEYUP:"keyup",CONTEXTMENU:"contextmenu",SCROLL:"scroll",LOAD:"load",BEFOREUNLOAD:"beforeunload",UNLOAD:"unload",RESIZE:"resize",FOCUS:"focus",BLUR:"blur",SUBMIT:"submit",CUT:"cut",COPY:"copy",PASTE:"paste",DOM:"DOMContentLoaded",ACTIVATE:"activate",DEACTIVATE:"deactivate",MOUSEENTER:"mouseenter",MOUSELEAVE:"mouseleave",SELECTSTART:"selectstart",FOCUSIN:"focusin",FOCUSOUT:"focusout",BEFOREUPDATE:"beforeupdate",AFTERUPDATE:"afterupdate",ERRORUPDATE:"errorupdate",_count:0,addEventListener:function(_10d,_10e,_10f,_110){
this._count++;
this._eventListener(true,_10d,_10e,_10f,_110);
if(_10d&&typeof _10d.nodeType!=Types.UNDEFINED){
if(_10d.nodeType==Node.ELEMENT_NODE){
var win=DOMUtil.getParentWindow(_10d);
if(win){
var _112={handleEvent:function(){
DOMEvents.removeEventListener(_10d,_10e,_10f,_110);
DOMEvents.removeEventListener(win,DOMEvents.UNLOAD,_112);
}};
DOMEvents.addEventListener(win,DOMEvents.UNLOAD,_112);
}
}
}
},removeEventListener:function(_113,_114,_115,_116){
this._count--;
this._eventListener(false,_113,_114,_115,_116);
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
},cleanupEventListeners:function(_11b){
this._deleteWrappedHandler(_11b);
},isCurrentTarget:function(e){
var _11d=false;
if(Client.isMozilla==true){
_11d=e.target==e.currentTarget;
}
return true;
},_isChildOf:function(_11e,_11f){
var _120=true;
if(_11e==_11f){
_120=false;
}
if(_120==true){
while(_11f!=null&&_11f.nodeType!=Node.DOCUMENT_NODE&&_11f!=_11e){
_11f=_11f.parentNode;
}
_120=(_11f==_11e);
}
return _120;
},_eventListener:function(_121,_122,_123,_124,_125,_126){
if(Interfaces.isImplemented(IEventListener,_124,true)){
if(typeof _123!=Types.UNDEFINED){
if(Client.isExplorer==true){
_124=this._getWrappedHandler(_122,_123,_124,_126);
_122[this._getAction(_121)]("on"+_123,_124);
}else{
switch(_123){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSELEAVE:
_123=_123==DOMEvents.MOUSEENTER?DOMEvents.MOUSEOVER:DOMEvents.MOUSEOUT;
_122[this._getAction(_121)](_123,{handleEvent:function(e){
var rel=e.relatedTarget;
if(e.currentTarget==rel||DOMEvents._isChildOf(e.currentTarget,rel)){
}else{
_124.handleEvent(e);
}
}},_125?true:false);
break;
default:
_122[this._getAction(_121)](_123,_124,_125?true:false);
break;
}
}
}else{
throw "No such event allowed!";
}
}
},_getAction:function(_129){
var _12a=null;
switch(_129){
case true:
_12a=Client.isMozilla==true?"addEventListener":"attachEvent";
break;
case false:
_12a=Client.isMozilla==true?"removeEventListener":"detachEvent";
break;
}
return _12a;
},_getWrappedHandler:function(_12b,_12c,_12d,_12e){
var _12f=null;
try{
if(!_12d._domEventHandlers){
_12d._domEventHandlers={};
}
if(!_12d._domEventHandlers[_12b]){
_12d._domEventHandlers[_12b]={};
}
if(!_12d._domEventHandlers[_12b][_12c]){
var win=_12b.nodeType?DOMUtil.getParentWindow(_12b):_12b;
if(win){
_12d._domEventHandlers[_12b][_12c]=function(){
if(win.event!=null&&_12d!=null){
_12d.handleEvent(win.event);
}
};
}
}
_12f=_12d._domEventHandlers[_12b][_12c];
}
catch(exception){
this._report(_12b,_12c,_12d,_12e);
}
return _12f;
},_deleteWrappedHandler:function(_131){
for(var _132 in _131._domEventHandlers){
if(_132){
for(var _133 in _131._domEventHandlers[_132]){
if(_133){
delete _131._domEventHandlers[_132][_133];
}
}
}
delete _131._domEventHandlers[_132];
}
},_report:function(_134,_135,_136,_137){
alert("DOMEvents.getWrappedHandler malfunction.\n\n"+"\ttarget: "+(_134?_134.nodeName:_134)+"\n"+"\tevent: "+_135+"\n"+"\thandler: "+_136+"\n\n"+"Offending invoker: "+(_137.callee?_137.callee.toString():_137.constructor));
}};
var DOMEvents=new _DOMEvents();
function _DOMSerializer(){
}
_DOMSerializer.prototype={_serializer:(Client.isMozilla?new XMLSerializer():null),serialize:function(node,_139){
var _13a=null;
var _13b=node;
if(node.nodeType==Node.DOCUMENT_NODE){
_13b=node.documentElement;
}
if(Client.isMozilla==true){
if(_139==true){
_13b=_13b.cloneNode(true);
_13b=DOMFormatter.format(_13b,DOMFormatter.INDENTED_TYPE_RESULT);
}
_13a=this._serializer.serializeToString(_13b);
}else{
_13a=_13b.xml;
}
return _13a;
}};
var DOMSerializer=new _DOMSerializer();
window.DOMFormatter=new function(){
var TAB="\t";
var NEW="\n";
var _13e=new RegExp(/[^\t\n\r ]/);
this.ignoreCDATASections=false;
function indent(_13f){
var doc=_13f.ownerDocument;
var _141=function(node,_143){
if(node.hasChildNodes()&&node.firstChild.nodeType!=Node.TEXT_NODE){
var _144="",i=0;
while(i++<_143){
_144+=TAB;
}
var _146=node.firstChild;
while(_146){
switch(_146.nodeType){
case Node.ELEMENT_NODE:
if(_146==node.lastChild){
node.appendChild(doc.createTextNode(NEW+_144));
}
node.insertBefore(doc.createTextNode(NEW+_144+TAB),_146);
_141(_146,_143+1);
break;
case Node.COMMENT_NODE:
case Node.PROCESSING_INSTRUCTION_NODE:
case Node.CDATA_SECTION_NODE:
node.insertBefore(doc.createTextNode(NEW+_144+TAB),_146);
break;
}
if(_146.nodeType==Node.CDATA_SECTION_NODE){
if(!this.ignoreCDATASections){
formatCDATASection(_146,_144+TAB);
}
}
_146=_146.nextSibling;
}
}
};
_141(_13f,0);
}
function strip(_147){
var _148=[];
var _149={acceptNode:function(_14a){
return (!_13e.test(_14a.nodeValue))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
}};
var _14b=_147.ownerDocument.createTreeWalker(_147,NodeFilter.SHOW_TEXT,_149,true);
while(_14b.nextNode()){
_148.push(_14b.currentNode);
}
var i=0,_14d;
while((_14d=_148[i++])!=null){
_14d.parentNode.removeChild(_14d);
}
}
function formatCDATASection(node,_14f){
if(node.textContent.indexOf(NEW)>-1){
var _150=node.textContent.split(NEW);
var _151="",line,_153=0,_154=true;
while((line=_150.shift())!=null){
if(_153==0&&line.charAt(0)==TAB){
while(line.charAt(_153++)==TAB){
}
}
line=line.substring(_153,line.length);
if(_150.length>0){
_151+=_14f+TAB+line;
_151+=_154?"":"\n";
}else{
_151+=_14f+line;
_14f=_14f.slice(1,_14f.length);
node.parentNode.appendChild(doc.createTextNode(NEW+_14f));
}
_154=false;
}
node.textContent=_151;
}
}
this.format=function(_155,_156){
var _157=1;
if(document.createTreeWalker){
try{
strip(_155);
if(_156!=_157){
indent(_155);
}
}
catch(exception){
throw new Error(exception);
}
}
return (_155);
};
};
DOMFormatter.INDENTED_TYPE_RESULT=0;
DOMFormatter.STRIPPED_TYPE_RESULT=1;
function _DOMUtil(){
}
_DOMUtil.prototype={_logger:SystemLogger.getLogger("DOMUtil"),MSXML_MAXVERSION:6,MSXML_MINVERSION:1,MSXML_HTTPREQUEST:"MSXML2.XMLHTTP.{$version}.0",MSXML_DOMDOCUMENT:"MSXML2.DOMDocument.{$version}.0",MSXML_FREETHREADED:"MSXML2.FreeThreadedDOMDocument.{$version}.0",MSXML_XSLTEMPLATE:"MSXML2.XSLTemplate.{$version}.0",getMSComponent:function(_158){
var sig,_15a=null,_15b=this.MSXML_MAXVERSION;
while(!_15a&&_15b>=this.MSXML_MINVERSION){
try{
sig=_158.replace("{$version}",_15b);
_15a=new ActiveXObject(sig);
}
catch(exception){
}
_15b--;
}
return _15a;
},getXMLHTTPRequest:function(){
var _15c=null;
if(Client.isExplorer){
_15c=this.getMSComponent(this.MSXML_HTTPREQUEST);
}else{
_15c=new XMLHttpRequest();
}
return _15c;
},getDOMDocument:function(_15d){
var _15e=null;
if(Client.isExplorer){
_15e=this.getMSComponent(_15d?this.MSXML_FREETHREADED:this.MSXML_DOMDOCUMENT);
}else{
var doc=XMLParser.parse("<?xml version=\"1.0\" encoding=\"UTF-8\"?><ROOT/>");
doc.removeChild(doc.documentElement);
_15e=doc;
}
return _15e;
},getMSXMLXSLTemplate:function(){
var _160=null;
if(Client.isExplorer){
_160=this.getMSComponent(this.MSXML_XSLTEMPLATE);
}
return _160;
},getLocalName:function(_161){
var _162=null;
if(_161.localName){
_162=_161.localName;
}else{
if(_161.baseName){
_162=_161.baseName;
}else{
_162=_161.nodeName.toLowerCase();
}
}
return _162;
},getComputedStyle:function(_163,_164){
var _165=null;
if(Client.isExplorer){
if(_163.currentStyle!=null){
_165=_163.currentStyle[_164];
}else{
this._logger.error("Could not compute style for element "+_163.nodeName);
SystemDebug.stack(arguments);
}
}else{
_165=_163.ownerDocument.defaultView.getComputedStyle(_163,null).getPropertyValue(_164);
}
return _165;
},getMaxIndex:function(doc){
var max=0,_168=new List(doc.getElementsByTagName("*"));
_168.each(function(_169){
var _16a=CSSComputer.getZIndex(_169);
if(_16a>max){
max=_16a;
}
});
return max;
},getOrdinalPosition:function(_16b,_16c){
var _16d=null;
var _16e=-1;
var _16f=this.getLocalName(_16b);
var _170=new List(_16b.parentNode.childNodes);
while(_170.hasNext()){
var _171=_170.getNext();
if(_171.nodeType==Node.ELEMENT_NODE){
if(!_16c||this.getLocalName(_171)==_16f){
_16e++;
if(_171==_16b||(_171.id!=""&&_171.id==_16b.id)){
_16d=_16e;
break;
}
}
}
}
return _16d;
},isFirstElement:function(_172,_173){
return (this.getOrdinalPosition(_172,_173)==0);
},isLastElement:function(_174,_175){
var _176=_174.parentNode.getElementsByTagName(_175?this.getLocalName(_174):"*");
return (this.getOrdinalPosition(_174)==_176.length);
},getParentWindow:function(node){
var doc=node.nodeType==Node.DOCUMENT_NODE?node:node.ownerDocument;
return doc.defaultView?doc.defaultView:doc.parentWindow;
},getTextContent:function(node){
var _17a=null;
if(node.textContent){
_17a=node.textContent;
}else{
if(node.text){
_17a=node.text;
}else{
_17a=node.innerText;
}
}
return _17a;
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
},getAncestorByLocalName:function(_17d,node,_17f){
var _180=null;
while(_180==null){
node=node.parentNode;
if(node.nodeType==Node.DOCUMENT_NODE){
if(_17f==true){
var win=this.getParentWindow(node);
node=win.frameElement;
}else{
break;
}
}
if(this.getLocalName(node)==_17d){
_180=node;
}
}
return _180;
},contains:function(_182,node){
return _182.contains?_182!=node&&_182.contains(node):!!(_182.compareDocumentPosition(node)&16);
},createElementNS:function(_184,_185,_186){
var _187=null;
if(_186==null){
alert("DOMUtil#createElementNS : Missing argument (DOMDocument)");
}else{
if(Client.isMozilla){
_187=_186.createElementNS(_184,_185);
}else{
if(_186.xml!=null){
_187=_186.createNode(Node.ELEMENT_NODE,_185,_184);
}else{
_187=_186.createElement(_185);
}
}
}
return _187;
},getElementsByTagName:function(node,_189){
var _18a=null;
if(Client.isMozilla){
_18a=node.getElementsByTagNameNS(Constants.NS_XHTML,_189);
}else{
_18a=node.getElementsByTagName(_189);
}
return _18a;
},getNextElementSibling:function(_18b){
return Client.isExplorer?_18b.nextSibling:_18b.nextElementSibling;
},getPreviousElementSibling:function(_18c){
return Client.isExplorer?_18c.previousSibling:_18c.previousElementSibling;
},cloneNode:function(node){
var _18e=null;
if(Client.isMozilla==true){
_18e=XMLParser.parse(DOMSerializer.serialize(node));
}else{
_18e=node.cloneNode(true);
}
return _18e;
},getLocalPosition:function(_18f){
var _190=new Point(_18f.offsetLeft,_18f.offsetTop);
if(Client.isExplorer&&_18f.parentNode&&_18f.parentNode.currentStyle){
if(_18f.parentNode.currentStyle.position=="static"){
var _191=this.getLocalPosition(_18f.parentNode);
_190.x+=_191.x;
_190.y+=_191.y;
}
}
return _190;
},getGlobalPosition:function(_192){
return this._getPosition(_192,false);
},getUniversalPosition:function(_193){
return this._getPosition(_193,true);
},_getPosition:function(_194,_195){
var _196=null;
if(typeof _194.getBoundingClientRect!=Types.UNDEFINED){
var rect=_194.getBoundingClientRect();
_196={x:rect.left,y:rect.top};
if(Client.isMozilla){
_196.x-=_194.scrollLeft;
_196.y-=_194.scrollTop;
}
}else{
_196={x:_194.offsetLeft-_194.scrollLeft,y:_194.offsetTop-_194.scrollTop};
while(_194.offsetParent){
_194=_194.offsetParent;
_196.x+=(_194.offsetLeft-_194.scrollLeft);
_196.y+=(_194.offsetTop-_194.scrollTop);
}
}
if(_195){
var win=DOMUtil.getParentWindow(_194);
if(win){
var _199=win.frameElement;
if(_199){
var add=DOMUtil.getUniversalPosition(_199);
_196.x+=add.x;
_196.y+=add.y;
}
}
}
return new Point(_196.x,_196.y);
},getGlobalMousePosition:function(e){
return this._getMousePosition(e,false);
},getUniversalMousePosition:function(e){
return this._getMousePosition(e,true);
},_getMousePosition:function(e,_19e){
var _19f=DOMEvents.getTarget(e);
var _1a0={x:e.pageX?e.pageX:e.clientX,y:e.pageY?e.pageY:e.clientY};
if(Client.isMozilla){
var doc=_19f.ownerDocument;
var win=this.getParentWindow(doc);
_1a0.x-=win.pageXOffset;
_1a0.y-=win.pageYOffset;
}
if(_19e){
var _1a3=this.getParentWindow(_19f).frameElement;
if(_1a3){
var add=this.getUniversalPosition(_1a3);
_1a0.x+=add.x;
_1a0.y+=add.y;
}
}
return _1a0;
}};
var DOMUtil=new _DOMUtil();
function _XMLParser(){
}
_XMLParser.prototype={_logger:SystemLogger.getLogger("XMLParser"),_domParser:(window.DOMParser!=null?new DOMParser():null),parse:function(xml,_1a6){
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
if(!_1a6){
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
if(!_1a6){
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
},isWellFormedDocument:function(xml,_1a9){
var _1aa=true;
var dec="<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
if(xml.indexOf("<?xml ")==-1){
xml=dec+xml;
}
var _1ac=SourceValidationService.IsWellFormedDocument(xml);
if(_1ac!="True"){
_1aa=false;
if(_1a9==true){
this._illFormedDialog(_1ac);
}
}
return _1aa;
},isWellFormedFragment:function(xml,_1ae){
var _1af=true;
var _1b0=SourceValidationService.IsWellFormedFragment(xml);
if(_1b0!="True"){
_1af=false;
if(_1ae==true){
this._illFormedDialog(_1b0);
}
}
return _1af;
},_illFormedDialog:function(_1b1){
setTimeout(function(){
Dialog.error("Not well-formed",_1b1);
},0);
}};
var XMLParser=new _XMLParser();
function XPathResolver(){
this.logger=SystemLogger.getLogger("XPathResolver");
this._evaluator=window.XPathEvaluator?new XPathEvaluator():null;
this._nsResolver=null;
}
XPathResolver.prototype.setNamespacePrefixResolver=function(_1b2){
if(this._evaluator){
this._nsResolver={lookupNamespaceURI:function(_1b3){
return _1b2[_1b3];
}};
}else{
this._nsResolver=_1b2;
}
};
XPathResolver.prototype.resolve=function(_1b4,node,_1b6){
var _1b7=null;
try{
if(this._evaluator){
_1b7=this._evaluateDOMXpath(_1b4,node,_1b6?true:false);
}else{
_1b7=this._evaluateMSXpath(_1b4,node,_1b6?true:false);
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
return _1b7;
};
XPathResolver.prototype.resolveAll=function(_1b8,node){
return this.resolve(_1b8,node,true);
};
XPathResolver.prototype._evaluateDOMXpath=function(_1ba,node,_1bc){
var _1bd=null;
if(node){
var _1bd=this._evaluator.evaluate(_1ba,node,this._nsResolver,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
if(_1bc){
var list=new List();
while((node=_1bd.iterateNext())!=null){
list.add(node);
}
_1bd=list;
}else{
_1bd=_1bd.iterateNext();
}
}else{
var cry="XPathResolver#_evaluateDOMXpath: No DOMNode to evaluate!";
if(Application.isDeveloperMode){
alert(cry);
}else{
this.logger.fatal(cry);
}
}
return _1bd;
};
XPathResolver.prototype._evaluateMSXpath=function(_1c0,node,_1c2){
var doc=(node.nodeType==Node.DOCUMENT_NODE?node:node.ownerDocument);
var _1c4="";
for(var _1c5 in this._nsResolver){
_1c4+="xmlns:"+_1c5+"=\""+this._nsResolver[_1c5]+"\" ";
}
doc.setProperty("SelectionNamespaces",_1c4);
if(_1c2){
var list=new List();
var i=0,_1c8=node.selectNodes(_1c0);
while(i<_1c8.length){
list.add(_1c8.item(i++));
}
result=list;
}else{
result=node.selectSingleNode(_1c0);
}
return result;
};
function XSLTransformer(){
this.logger=SystemLogger.getLogger("XSLTransformer");
this._processor=null;
this._cache=null;
}
XSLTransformer.prototype.importStylesheet=function(url){
var _1ca=this._import(Resolver.resolve(url));
if(Client.isMozilla){
this._processor=new XSLTProcessor();
this._processor.importStylesheet(_1ca);
}else{
this._cache=DOMUtil.getMSXMLXSLTemplate();
this._cache.stylesheet=_1ca;
}
};
XSLTransformer.prototype._import=function(url){
var _1cc=null;
if(Client.isMozilla){
var _1cd=DOMUtil.getXMLHTTPRequest();
_1cd.open("get",Resolver.resolve(url),false);
_1cd.send(null);
_1cc=_1cd.responseXML;
}else{
var _1cc=DOMUtil.getDOMDocument(true);
_1cc.async=false;
_1cc.load(url);
}
return _1cc;
};
XSLTransformer.prototype.transformToDocument=function(dom){
var _1cf=null;
if(Client.isMozilla){
_1cf=this._processor.transformToDocument(dom);
}else{
alert("TODO!");
}
return _1cf;
};
XSLTransformer.prototype.transformToString=function(dom,_1d1){
var _1d2=null;
if(Client.isMozilla){
var doc=this.transformToDocument(dom);
_1d2=DOMSerializer.serialize(doc,_1d1);
}else{
var proc=this._cache.createProcessor();
proc.input=dom;
proc.transform();
_1d2=proc.output;
}
return _1d2;
};
function _CSSUtil(){
}
_CSSUtil.prototype={_getCurrent:function(_1d5){
var _1d6=_1d5.style?_1d5.className:_1d5.getAttribute("class");
_1d6=_1d6?_1d6:"";
return _1d6;
},_contains:function(_1d7,sub){
return _1d7.indexOf(sub)>-1;
},_attach:function(_1d9,sub){
return _1d9+(_1d9==""?"":" ")+sub;
},_detach:function(_1db,sub){
if(this._contains(_1db," "+sub)){
sub=" "+sub;
}
return _1db.replace(sub,"");
},attachClassName:function(_1dd,_1de){
if(_1dd.classList!=null){
if(!_1dd.classList.contains(_1de)){
_1dd.classList.add(_1de);
}
}else{
var _1df=this._getCurrent(_1dd);
if(!this._contains(_1df,_1de)){
_1df=this._attach(_1df,_1de);
}
if(_1dd.style!=null){
_1dd.className=_1df;
}else{
_1dd.setAttribute("class",_1df);
}
}
},detachClassName:function(_1e0,_1e1){
if(_1e0.classList!=null){
if(_1e0.classList.contains(_1e1)){
_1e0.classList.remove(_1e1);
}
}else{
var _1e2=this._getCurrent(_1e0);
if(this._contains(_1e2,_1e1)){
_1e2=this._detach(_1e2,_1e1);
}
if(_1e0.style!=null){
_1e0.className=_1e2;
}else{
if(_1e2==""){
_1e0.removeAttribute("class");
}else{
_1e0.setAttribute("class",_1e2);
}
}
}
},hasClassName:function(_1e3,_1e4){
var _1e5=false;
if(_1e3.classList!=null){
_1e5=_1e3.classList.contains(_1e4);
}else{
_1e5=this._contains(this._getCurrent(_1e3),_1e4);
}
return _1e5;
}};
var CSSUtil=new _CSSUtil();
function _CSSComputer(){
}
_CSSComputer.prototype={_margins:{top:Client.isExplorer?"marginTop":"margin-top",right:Client.isExplorer?"marginRight":"margin-right",bottom:Client.isExplorer?"marginBottom":"margin-bottom",left:Client.isExplorer?"marginLeft":"margin-left"},_paddings:{top:Client.isExplorer?"paddingTop":"padding-top",right:Client.isExplorer?"paddingRight":"padding-right",bottom:Client.isExplorer?"paddingBottom":"padding-bottom",left:Client.isExplorer?"paddingLeft":"padding-left"},_borders:{top:Client.isExplorer?"borderTopWidth":"border-top-width",right:Client.isExplorer?"borderRightWidth":"border-right-width",bottom:Client.isExplorer?"borderBottomWidth":"border-bottom-width",left:Client.isExplorer?"borderLeftWidth":"border-left-width"},_getComplexResult:function(_1e6,_1e7){
var _1e8={};
for(var _1e9 in _1e6){
var ent=parseInt(DOMUtil.getComputedStyle(_1e7,_1e6[_1e9]));
_1e8[_1e9]=isNaN(ent)?0:ent;
}
return _1e8;
},_getMargin:function(_1eb){
return this._getComplexResult(this._margins,_1eb);
},getPadding:function(_1ec){
return this._getComplexResult(this._paddings,_1ec);
},getBorder:function(_1ed){
return this._getComplexResult(this._borders,_1ed);
},getPosition:function(_1ee){
return DOMUtil.getComputedStyle(_1ee,"position");
},getFloat:function(_1ef){
return DOMUtil.getComputedStyle(_1ef,Client.isExplorer?"styleFloat":"float");
},getZIndex:function(_1f0){
return parseInt(DOMUtil.getComputedStyle(_1f0,Client.isExplorer?"zIndex":"z-index"));
},getBackgroundColor:function(_1f1){
return DOMUtil.getComputedStyle(_1f1,Client.isExplorer?"backgroundColor":"background-color");
}};
var CSSComputer=new _CSSComputer();
var System=new function(){
var _1f2=SystemLogger.getLogger("System");
var root=null;
this.hasActivePerspectives=false;
this.getRootNode=function(){
if(root==null){
root=new SystemNode(TreeService.GetRootElements("")[0]);
}
return root;
};
this.getPerspectiveNodes=function(){
var _1f4=new List();
var _1f5=TreeService.GetActivePerspectiveElements("dummy");
var list=new List(_1f5);
if(list.hasEntries()){
this.hasActivePerspectives=true;
list.each(function(_1f7){
_1f4.add(new SystemNode(_1f7));
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVES_NONE);
}
return _1f4;
};
this.getChildNodes=function(node,_1f9){
var _1fa=new List();
var _1fb=null;
if(_1f9){
if(SearchTokens.hasToken(_1f9)){
_1f9=SearchTokens.getToken(_1f9);
}
_1fb=TreeService.GetElementsBySearchToken(node.getData(),_1f9);
}else{
_1fb=TreeService.GetElements(node.getData());
}
new List(_1fb).each(function(_1fc){
var _1fd=new SystemNode(_1fc);
if(_1f9){
_1fd.searchToken=_1f9;
}
_1fa.add(_1fd);
});
return _1fa;
};
this.getDescendantBranch=function(_1fe){
var map=new Map();
var arg=[];
_1fe.each(function(node){
arg.push({ProviderName:node.getProviderName(),EntityToken:node.getEntityToken(),Piggybag:node.getPiggyBag()});
});
var _202=TreeService.GetMultipleChildren(arg);
var _203=new List(_202);
while(_203.hasNext()){
this._listNodesInMap(_203.getNext(),map);
}
return map;
};
this.getInvisibleBranch=function(_204,_205,_206){
var map=new Map();
var arg=[];
_206.each(function(node){
arg.push({ProviderName:node.getProviderName(),EntityToken:node.getEntityToken(),Piggybag:node.getPiggyBag()});
});
var _20a=TreeService.FindEntityToken(_204,_205,arg);
if(_20a instanceof SOAPFault){
_1f2.error(_20a.getFaultString());
if(Application.isDeveloperMode){
alert(_20a.getFaultString());
}
map=null;
}else{
var _20b=new List(_20a);
while(_20b.hasNext()){
this._listNodesInMap(_20b.getNext(),map);
}
}
return map;
};
this._listNodesInMap=function(_20c,map){
var list=new List();
var key=_20c.ElementKey;
var _210=new List(_20c.ClientElements);
map.set(key,list);
while(_210.hasNext()){
var _211=_210.getNext();
list.add(new SystemNode(_211));
}
};
this.getChildNodesBySearchToken=function(node,_213){
return this.getChildNodes(node,_213);
};
this.getNamedRoots=function(key,_215){
var _216=new List();
var _217=null;
if(_215){
if(SearchTokens.hasToken(_215)){
_215=SearchTokens.getToken(_215);
}
_217=TreeService.GetNamedRootsBySearchToken(key,_215);
}else{
_217=TreeService.GetNamedRoots(key);
}
new List(_217).each(function(_218){
var node=new SystemNode(_218);
if(_215){
node.searchToken=_215;
}
_216.add(node);
});
return _216;
};
this.getNamedRootsBySearchToken=function(key,_21b){
return this.getNamedRoots(key,_21b);
};
function compileActionList(node,_21d,_21e){
var _21f=_21d.ClientElementActionGroupId;
if(_21f!=null){
var _220=_21e.get(_21f).ClientElementActionGroupItems;
if(_220&&_220.length>0){
node.setActionList(new List(_220));
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
new List(self._data.Actions).each(function(_226){
var _227=_226.ActionCategory.Name;
if(SystemAction.hasCategory(_227)){
var _228=new SystemAction(_226);
SystemAction.actionMap.set(_226.ActionKey,_228);
}else{
throw "No such action category: "+_227;
}
});
}
});
};
SystemNode.prototype.getData=function(){
return this._data;
};
SystemNode.prototype.getChildren=function(){
var _229=null;
if(this.searchToken){
_229=System.getChildNodesBySearchToken(this,this.searchToken);
}else{
_229=System.getChildNodes(this);
}
return _229;
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
var _22b=this._data.Piggybag;
if(_22b==null){
_22b="";
}
return _22b;
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
var _22d=null;
if(typeof this._data.ToolTip!="undefined"){
_22d=this._data.ToolTip;
}
return _22d;
};
SystemNode.prototype.getPropertyBag=function(){
if(!this._propertyBag&&this._data.PropertyBag&&this._data.PropertyBag.length!=0){
var map={};
new List(this._data.PropertyBag).each(function(_22f){
map[_22f.Key]=_22f.Value;
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
var _233=SystemAction.actionMap.get(key);
var _234=true;
if(_233.getCategory()==SystemAction.categories.DeveloperMode){
if(!Application.isDeveloperMode){
_234=false;
}
}
if(_234){
var id=_233.getGroupID();
if(!map.has(id)){
map.set(id,new List());
}
var list=map.get(id);
list.add(_233);
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
SystemAction.invoke=function(_237,arg){
var node=arg;
if(node instanceof SystemNode){
Application.lock(SystemAction);
_237.logger.debug("Execute \""+_237.getLabel()+"\" on \""+node.getLabel()+"\".");
setTimeout(function(){
TreeService.ExecuteSingleElementAction(node.getData(),_237.getHandle(),Application.CONSOLE_ID);
MessageQueue.update();
Application.unlock(SystemAction);
},0);
}else{
throw "Multiple actiontargets not supported.";
}
};
SystemAction.invokeTagged=function(_23a,_23b){
action=SystemAction.taggedActions.get(_23a);
node=SystemNode.taggedNodes.get(_23b);
SystemAction.invoke(action,node);
};
SystemAction.hasCategory=function(_23c){
return SystemAction.categories[_23c]?true:false;
};
function SystemAction(_23d){
this.logger=SystemLogger.getLogger("SystemAction");
this._data=_23d;
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
var _23e=null;
if(this.isInFolder()){
_23e=this._data.ActionCategory.FolderName;
}
return _23e;
};
SystemAction.prototype.isDisabled=function(){
return this._data.Disabled;
};
SystemAction.prototype.isCheckBox=function(){
return typeof this._data.CheckboxStatus!=Types.UNDEFINED;
};
SystemAction.prototype.getTag=function(){
var _23f=null;
if(typeof this._data.TagValue!="undefined"){
_23f=this._data.TagValue;
}
return _23f;
};
SystemAction.prototype.isChecked=function(){
var _240=null;
if(this.isCheckBox()){
_240=this._data.CheckboxStatus=="Checked";
}else{
throw "Not a checkbox!";
}
return _240;
};
function _UpdateManager(){
var _241=null;
if(!window.UpdateManager){
this._construct();
_241=this;
}
return _241;
}
_UpdateManager.prototype={version:"0.1",CLASSNAME_FORM:"updateform",CLASSNAME_ZONE:"updatezone",CLASSNAME_GONE:"updategone",EVENT_BEFOREUPDATE:"beforeupdate",EVENT_AFTERUPDATE:"afterupdate",EVENT_ERRORUPDATE:"errorupdate",xhtml:null,summary:null,isEnabled:true,isDebugging:false,isUpdating:false,hasSoftAttributes:false,hasSoftSiblings:false,pendingResponse:null,currentDOM:null,errormessage:null,_assistant:null,_updates:null,_replaced:null,_dotnetnames:["__VIEWSTATE","__EVENTVALIDATION","__EVENTTARGET","__EVENTARGUMENT","__LASTFOCUS"],plugins:[],toString:function(){
return "[object UpdateManager]";
},_construct:function(_242){
var root=document.documentElement;
var _244=root.namespaceURI;
if(_244==null){
_244=new String(root.getAttribute("xmlns"));
}
if(_244=="http://www.w3.org/1999/xhtml"){
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
var _245=decodeURIComponent(this.xhtml);
this.currentDOM=UpdateAssistant.parse(_245);
}else{
throw new TypeError();
}
}else{
var _246=this;
UpdateAssistant.getXMLHttpRequest("get",window.location.toString(),{handleResponse:function(dom){
_246.currentDOM=dom;
}}).send(null);
}
}
}
},setupForms:function(){
var _248=false;
Array.forEach(document.forms,function(form){
if(form.className.indexOf(this.CLASSNAME_FORM)>-1){
if(!form.__isSetup){
this._setupForm(form);
form.__isSetup=true;
}
_248=true;
}
},this);
return _248;
},_setupForm:function(form){
var _24b=this;
this._addListener(form,"submit");
form.__submit=form.submit;
form.submit=function(){
if(_24b.isEnabled){
_24b._submit(form);
}else{
form.__submit();
}
return false;
};
},_addListener:function(_24c,type){
if(_24c.addEventListener!=null){
_24c.addEventListener(type,this,false);
}else{
var _24e=this;
_24c.attachEvent("on"+type,function(){
_24e.handleEvent(window.event);
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
var _253=UpdateAssistant.getUpdateZones(dom);
var _254=UpdateAssistant.getUpdateZones(this.currentDOM);
this._updates=[];
this._replaced={};
_253.forEach(function(_255,_256){
var _257=_254[_256];
this._crawl(_255,_257);
},this);
this._updates.forEach(function(_258,_259){
_258.update();
_258.dispose();
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
},_crawl:function(_25b,_25c,_25d,id){
var _25f=true;
var _260=_25c.getAttribute("class");
if(_260==null||_260.indexOf(this.CLASSNAME_GONE)==-1){
if(_25c.nodeType==Node.ELEMENT_NODE){
var _261=_25c.getAttribute("id");
if(_261!=null){
_25d=_25b;
id=_261;
}
}
if(_25f=this._check(_25b,_25c,_25d,id)){
var _262=_25b.firstChild;
var _263=_25c.firstChild;
while(_262!=null&&_263!=null&&!this._replaced[id]){
switch(_262.nodeType){
case Node.TEXT_NODE:
_25f=this._check(_262,_263,_25d,id);
break;
case Node.DOCUMENT_NODE:
case Node.ELEMENT_NODE:
_25f=this._crawl(_262,_263,_25d,id);
break;
}
if(this._replaced[id]){
_25f=false;
}else{
_262=_262.nextSibling;
_263=_263.nextSibling;
}
}
}
}
return _25f;
},_check:function(_264,_265,_266,id){
var _268=true;
var _269=null;
var _26a=false;
var _26b=false;
if((_264!=null&&_265==null)||(_264==null&&_265!=null)){
_268=false;
}else{
if(_268=_264.nodeType==_265.nodeType){
switch(_265.nodeType){
case Node.ELEMENT_NODE:
if(_264.namespaceURI!=_265.namespaceURI||_264.nodeName!=_265.nodeName){
_268=false;
}else{
if(_268=(_264.nodeName==_265.nodeName)){
var _26c=_265.getAttribute("id");
var _26d=_264.getAttribute("id");
if(_26c!=null&&_26d!=null){
if(_26c!=_26d){
_268=false;
}else{
if((_269=this._getPlugin(_264,_265))!=null){
if(_269.updateElement(_264,_265)){
_26b=true;
_268=false;
}
}
}
}
if(_268){
if(_268=this._checkAttributes(_264,_265)){
if(this.hasSoftSiblings&&this._hasSoftChildren(_264)&&this._hasSoftChildren(_265)){
if(this._validateSoftChildren(_264,_265)){
this._updateSoftChildren(_264,_265);
_26a=true;
}
_268=false;
}else{
_268=_264.childNodes.length==_265.childNodes.length;
}
}
}
}
}
break;
case Node.TEXT_NODE:
if(_264.data.trim()!=_265.data.trim()){
_268=false;
}
break;
}
}
}
if(_268==false&&!_26a&&!_26b){
if(id!=null&&_266!=null){
this.addUpdate(new ReplaceUpdate(id,_266));
}
}
return _268;
},_checkAttributes:function(_26e,_26f){
var _270=true;
var _271=false;
var _272=_26e.attributes;
var _273=_26f.attributes;
if(_272.length!=_273.length){
_271=true;
}else{
_271=!Array.every(_272,function(att1,i){
var att2=_273.item(i);
return att1.nodeName==att2.nodeName&&att1.nodeValue==att2.nodeValue;
});
}
if(_271){
var _277=_26e.getAttribute("id");
var _278=_26f.getAttribute("id");
if(this.hasSoftAttributes&&_277!=null&&_277==_278){
this.addUpdate(new AttributesUpdate(_278,_26e,_26f));
}else{
_270=false;
}
}
return _270;
},_hasSoftChildren:function(_279){
var _27a=true;
if(_279.hasChildNodes()){
_27a=Array.every(_279.childNodes,function(node){
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
return _27a;
},_validateSoftChildren:function(_27d,_27e){
var _27f=true;
var _280=-1;
var _281=-1;
var _282=-1;
var news=this._toMap(_27d.childNodes,true);
var olds=this._toMap(_27e.childNodes,true);
for(var id in olds){
if(_27f){
var _286=olds[id];
_27f=_286>=_280;
if(news[id]!=null){
_282=news[id];
_27f=_282>=_281;
}
}
_280=_286;
if(_282>-1){
_281=_282;
}
}
return _27f;
},_updateSoftChildren:function(_287,_288){
var news=this._toMap(_287.childNodes);
var olds=this._toMap(_288.childNodes);
for(var id in olds){
if(news[id]==null){
this.addUpdate(new SiblingUpdate(Update.TYPE_REMOVE,id,null,null));
}else{
this._crawl(news[id],olds[id]);
}
}
var _28c=null;
for(id in news){
if(olds[id]==null){
var _28d=news[id];
if(_28c==null){
var _28e=_288.getAttribute("id");
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_28e,_28d,true));
}else{
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_28c,_28d,false));
}
}
_28c=id;
}
},addUpdate:function(_28f){
this._updates.push(_28f);
if(_28f instanceof ReplaceUpdate){
this._replaced[_28f.id]=true;
}
},_getPlugin:function(_290,_291){
var _292=null;
this.plugins.every(function(_293){
if(_293.handleElement(_290,_291)){
_292=_293;
}
return _292==null;
});
return _292;
},_toMap:function(_294,_295){
var _296={};
Array.forEach(_294,function(node,_298){
if(node.nodeType==Node.ELEMENT_NODE){
_296[node.getAttribute("id")]=_295?_298:node;
}
});
return _296;
},_getPost:function(form){
var _29a=new String("");
if(form!=null){
var last="";
Array.forEach(form.elements,function(_29c){
var name=_29c.name;
var _29e=encodeURIComponent(_29c.value);
switch(_29c.type){
case "button":
case "submit":
var _29f=UpdateAssistant.getActiveElement();
if(_29c==_29f&&name!=""){
_29a+=name+"="+_29e+"&";
}
break;
case "radio":
if(_29c.checked){
_29a+=name+"="+_29e+"&";
}
break;
case "checkbox":
if(_29c.checked){
if(_29c.name==last){
if(_29a.lastIndexOf("&")==_29a.length-1){
_29a=_29a.substr(0,_29a.length-1);
}
_29a+=","+_29e;
}else{
_29a+=name+"="+_29c.value;
}
last=name;
_29a+="&";
}
break;
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_29a+=name+"="+_29e+"&";
break;
}
});
}
return _29a.substr(0,_29a.length-1);
},_postRequest:function(form){
var _2a1=form.method!=""?form.method:"get";
var _2a2=form.action!=""?form.action:window.location.toString();
var _2a3=this._getPost(form);
if(_2a1=="get"){
if(_2a2.indexOf("?")>-1){
_2a2=_2a2+"&"+_2a3;
}else{
_2a2+"?"+_2a3;
}
}
var _2a4=this;
var _2a5=UpdateAssistant.getXMLHttpRequest(_2a1,_2a2,this);
if(_2a1=="post"){
_2a5.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
}
_2a5.send(_2a1=="post"?_2a3:null);
},_fixdotnet:function(dom,id){
var _2a8=document.getElementById(id);
if(_2a8!=null){
var _2a9=UpdateAssistant.getElementById(dom,id);
if(_2a9!=null){
var _2aa=_2a9.getAttribute("value");
if(_2aa!==_2a8.value){
_2a8.value=_2aa;
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
},report:function(_2ad){
this.summary+=_2ad+"\n";
}};
var UpdateManager=new _UpdateManager();
function _UpdateAssistant(){
var _2ae=null;
if(!window.UpdateAssistant){
this._construct();
_2ae=this;
}
return _2ae;
}
_UpdateAssistant.prototype={_serializer:window.XMLSerializer!=null?new XMLSerializer():null,_parser:window.DOMParser!=null?new DOMParser():null,_activeElement:null,_construct:function(){
if(!window.Node){
window.Node={ELEMENT_NODE:1,TEXT_NODE:3,DOCUMENT_NODE:9};
}
if(!Array.every){
Array.every=function(_2af,fun){
var _2b1=true;
var len=_2af.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2b3=arguments[2];
for(var i=0;i<len;i++){
if(typeof _2af[i]!="undefined"){
if(!fun.call(_2b3,_2af[i],i,_2af)){
_2b1=false;
break;
}
}
}
}
return _2b1;
};
}
if(!Array.prototype.every){
Array.prototype.every=function(fun){
var _2b6=arguments[1];
return Array.every(this,fun,_2b6);
};
}
if(!Array.forEach){
Array.forEach=function(_2b7,fun){
var len=_2b7.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _2ba=arguments[2];
for(var i=0;i<len;i++){
if(typeof _2b7[i]!="undefined"){
fun.call(_2ba,_2b7[i],i,_2b7);
}
}
}
};
}
if(!Array.prototype.forEach){
Array.prototype.forEach=function(fun){
var _2bd=arguments[1];
Array.forEach(this,fun,_2bd);
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
},getXMLHttpRequest:function(_2bf,_2c0,_2c1){
var _2c2=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Msxml2.XMLHTTP.3.0");
if(_2c2!=null){
_2c2.open(_2bf,_2c0,(_2c1!=null?true:false));
if(_2c1!=null){
function action(){
if(_2c2.readyState==4){
var text=_2c2.responseText;
UpdateManager.pendingResponse=text;
var dom=UpdateAssistant.parse(text);
if(dom!=null){
_2c1.handleResponse(dom);
}
}
}
if(_2c2.addEventListener!=null){
_2c2.addEventListener("readystatechange",{handleEvent:function(){
action();
}},false);
}else{
_2c2.onreadystatechange=action;
}
}
}
return _2c2;
},dispatchEvent:function(_2c5,name){
var _2c7=true;
if(_2c5.fireEvent!=null){
_2c7=_2c5.fireEvent("on"+name);
}else{
var _2c8=document.createEvent("UIEvents");
_2c8.initEvent(name,true,true);
_2c7=_2c5.dispatchEvent(_2c8);
}
return _2c7;
},getUpdateZones:function(dom){
var _2ca="//*[@id and contains(@class,'updatezone')]";
var _2cb=[];
var _2cc=null;
var _2cd=null;
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2cc=dom.evaluate(_2ca,dom,null,type,null);
while((_2cd=_2cc.iterateNext())!=null){
_2cb.push(_2cd);
}
}else{
_2cc=dom.documentElement.selectNodes(_2ca);
Array.forEach(_2cc,function(_2cf){
_2cb.push(_2cf);
});
}
return _2cb;
},getElementById:function(dom,id){
var _2d2="//*[@id='"+id+"']";
var _2d3=null;
var _2d4=null;
if(window.XPathResult!=null){
var type=XPathResult.FIRST_ORDERED_NODE_TYPE;
_2d3=dom.evaluate(_2d2,dom,null,type,null);
_2d4=_2d3.singleNodeValue;
}else{
_2d4=dom.documentElement.selectNodes(_2d2)[0];
}
return _2d4;
},_getIds:function(dom){
var _2d7="//*[@id]";
var _2d8=null;
var _2d9=[];
if(window.XPathResult!=null){
var type=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_2d8=dom.evaluate(_2d7,dom,null,type,null);
while((element=_2d8.iterateNext())!=null){
_2d9.push(element.getAttribute("id"));
}
}else{
_2d8=dom.documentElement.selectNodes(_2d7);
Array.forEach(_2d8,function(_2db){
_2d9.push(_2db.getAttribute("id"));
});
}
return _2d9;
},toHTMLElement:function(_2dc){
var _2dd=this.serialize(_2dc);
var temp=document.createElement("temp");
temp.innerHTML=_2dd;
return temp.firstChild;
},getActiveElement:function(){
var _2df=document.activeElement;
if(_2df==null||_2df==document.body){
_2df=this._activeElement;
}
return _2df;
},serialize:function(_2e0){
var _2e1=null;
if(this._serializer!=null){
_2e1=this._serializer.serializeToString(_2e0);
}else{
_2e1=_2e0.xml;
}
return _2e1;
},hasDifferences:function(_2e2,_2e3){
var s1=null;
var s2=null;
if(this._serializer!=null){
s1=this._serializer.serializeToString(_2e2);
s2=this._serializer.serializeToString(_2e3);
}else{
s1=_2e2.xml;
s2=_2e3.xml;
}
return s1!=s2;
},parse:function(_2e6){
var _2e7=null;
if(this._parser!=null){
_2e7=this._parser.parseFromString(_2e6,"text/xml");
}else{
_2e7=new ActiveXObject("Msxml2.DOMDocument.3.0");
_2e7.setProperty("SelectionLanguage","XPath");
_2e7.loadXML(_2e6);
}
return this._validate(_2e7);
},_validate:function(dom){
var out=null;
if(dom.parseError!=null&&dom.parseError.errorCode!=0){
out=dom.parseError.reason;
}else{
var _2ea=dom.getElementsByTagName("parsererror").item(0);
if(_2ea!=null){
out=_2ea.textContent.replace(/\^/g,"").replace(/\-/g,"");
}
}
if(out==null){
var has={},ids=this._getIds(dom);
ids.every(function(id){
var _2ee=!has[id];
has[id]=true;
if(!_2ee){
out="Element \""+id+"\" encountered twice.";
}
return _2ee;
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
this.handleElement=function(_2ef,_2f0){
var _2f1=false;
switch(_2ef.nodeName.toLowerCase()){
case "input":
case "textarea":
switch(_2ef.getAttribute("id")){
case "__EVENTTARGET":
case "__EVENTARGUMENT":
case "__VIEWSTATE":
case "__EVENTVALIDATION":
_2f1=false;
break;
}
break;
}
return _2f1;
};
this.updateElement=function(_2f2,_2f3){
var id=_2f2.getAttribute("id");
var _2f5=document.getElementById(id);
if(_2f5!=null){
var _2f6=null;
switch(_2f5.nodeName.toLowerCase()){
case "input":
_2f6=_2f2.getAttribute("value");
break;
case "textarea":
_2f6=_2f2.textContent?_2f2.textContent:_2f2.text;
break;
}
if(_2f6==null){
_2f6="";
}
if(_2f6!=_2f5.value){
_2f5.value=_2f6;
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
},_beforeUpdate:function(_2f7){
var _2f8=true;
if(_2f7!=null){
_2f7.__updateType=this.type;
_2f8=UpdateAssistant.dispatchEvent(_2f7,Update.EVENT_BEFOREUPDATE);
}
return _2f8;
},_afterUpdate:function(_2f9){
var _2fa=true;
if(_2f9!=null){
_2f9.__updateType=this.type;
_2fa=UpdateAssistant.dispatchEvent(_2f9,Update.EVENT_AFTERUPDATE);
}
return _2fa;
}};
ReplaceUpdate.prototype=new Update();
ReplaceUpdate.superclass=Update.prototype;
function ReplaceUpdate(id,_2fc){
this.type=Update.TYPE_REPLACE;
this.id=id;
this.element=_2fc;
return this;
}
ReplaceUpdate.prototype.update=function(){
var _2fd,_2fe,_2ff=UpdateAssistant.toHTMLElement(this.element);
if((_2fd=document.getElementById(this.id))!=null){
if((_2fe=_2fd.parentNode)!=null){
if(this._beforeUpdate(_2fd)){
_2fe.replaceChild(_2ff,_2fd);
this._afterUpdate(_2ff);
}
}
}else{
UpdateManager.error("Element null point: "+this.id);
}
};
ReplaceUpdate.prototype._afterUpdate=function(_300){
var _301=ReplaceUpdate.superclass._afterUpdate.call(this,_300);
UpdateManager.report("Replaced element id=\""+this.id+"\"");
if(_300.nodeName=="form"||_300.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
return _301;
};
SiblingUpdate.prototype=new Update();
SiblingUpdate.superclass=Update.prototype;
function SiblingUpdate(type,id,_304,_305){
this.type=type;
this.id=id;
this.element=_304;
this.isFirst=_305;
return this;
}
SiblingUpdate.prototype.update=function(){
var _306=document.getElementById(this.id);
switch(this.type){
case Update.TYPE_REMOVE:
this._remove(_306);
break;
case Update.TYPE_INSERT:
this._insert(this.element,_306);
break;
}
};
SiblingUpdate.prototype._remove=function(_307){
var _308=_307.parentNode;
if(_308!=null){
if(this._beforeUpdate(_307)){
_308.removeChild(_307);
this._afterUpdate(_308);
}
}
};
SiblingUpdate.prototype._insert=function(_309,_30a){
var _30b=UpdateAssistant.toHTMLElement(_309);
if(this.isFirst){
var _30c=_30a;
if(_30c!=null){
if(this._beforeUpdate(_30c)){
_30c.insertBefore(_30b,_30c.firstChild);
this._afterUpdate(_30b);
}
}
}else{
var _30c=_30a.parentNode;
if(_30c!=null){
if(this._beforeUpdate(_30c)){
_30c.insertBefore(_30b,_30a.nextSibling);
this._afterUpdate(_30b);
}
}
}
};
SiblingUpdate.prototype._beforeUpdate=function(_30d){
var _30e=SiblingUpdate.superclass._beforeUpdate.call(this,_30d);
if(this.type==Update.TYPE_REMOVE){
UpdateManager.report("Removed element id=\""+_30d.id+"\"");
}
return _30e;
};
SiblingUpdate.prototype._afterUpdate=function(_30f){
var _310=true;
if(_30f!=null){
_310=SiblingUpdate.superclass._afterUpdate.call(this,_30f);
if(this.type==Update.TYPE_INSERT){
UpdateManager.report("Inserted element id=\""+_30f.id+"\"");
if(_30f.nodeName=="form"||_30f.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
}
}
return _310;
};
AttributesUpdate.prototype=new Update();
AttributesUpdate.superclass=Update.prototype;
AttributesUpdate.prototype.currentElement=null;
function AttributesUpdate(id,_312,_313){
this.type=type=Update.TYPE_ATTRIBUTES;
this.id=id;
this.element=_312;
this.currentElement=_313;
this._summary=[];
return this;
}
AttributesUpdate.prototype.update=function(){
var _314=document.getElementById(this.id);
if(this._beforeUpdate(_314)){
this._updateAttributes(_314);
this._afterUpdate(_314);
}
};
AttributesUpdate.prototype._updateAttributes=function(_315){
Array.forEach(this.element.attributes,function(_316){
var _317=this.currentElement.getAttribute(_316.nodeName);
if(_317==null||_317!=_316.nodeValue){
this._setAttribute(_315,_316.nodeName,_316.nodeValue);
this._summary.push("@"+_316.nodeName);
}
},this);
Array.forEach(this.currentElement.attributes,function(_318){
if(this.element.getAttribute(_318.nodeName)==null){
this._setAttribute(_315,_318.nodeName,null);
this._summary.push("@"+_318.nodeName);
}
},this);
};
AttributesUpdate.prototype._setAttribute=function(_319,name,_31b){
if(_319==null){
alert(this.id+": "+document.getElementById(this.id)+"\n\n"+name+"="+_31b);
SystemLogger.getLogger("AttributesUpdate").fine(document.body.innerHTML);
}
var _31c=(_31b==null);
if(_31c){
_319.removeAttribute(name);
}else{
_319.setAttribute(name,_31b);
}
if(document.all!=null){
if(_31c){
_31b="";
}
switch(name.toLowerCase()){
case "class":
_319.className=_31b;
break;
case "disabled":
_319.disabled=!_31c;
break;
case "checked":
_319.checked=!_31c;
break;
case "readonly":
_319.readOnly=!_31c;
break;
}
}
};
AttributesUpdate.prototype._afterUpdate=function(_31d){
AttributesUpdate.superclass._afterUpdate.call(this,_31d);
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
_WindowManager.prototype={WINDOW_LOADED_BROADCAST:null,WINDOW_UNLOADED_BROADCAST:null,WINDOW_EVALUATED_BROADCAST:null,WINDOW_RESIZED_BROADCAST:null,isWindowLoaded:false,_logger:SystemLogger.getLogger("WindowManager ["+document.title+"]"),_ondomstatements:new List(),_onloadstatements:new List(),_onresizestatements:new List(),_currentDimensions:null,_newDimensions:null,_broadcastTimeout:null,_isHorizontalResize:false,_isVerticalResize:false,_broadcastTimeout:null,_compute:function(_31e,key){
return _31e.replace("${windowkey}",document.location+":"+key);
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
var _322=this._newDimensions.w!=this._currentDimensions.w;
var _323=this._newDimensions.h!=this._currentDimensions.h;
if(_322||_323){
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
},fireOnDOM:function(_325){
if(Interfaces.isImplemented(IDOMHandler,_325,true)){
this._ondomstatements.add(_325);
}
},fireOnLoad:function(_326){
if(Interfaces.isImplemented(ILoadHandler,_326,true)){
this._onloadstatements.add(_326);
}
},fireOnResize:function(_327){
if(Interfaces.isImplemented(IResizeHandler,_327,true)){
this._onresizestatements.add(_327);
}
},onDOMContentLoaded:function(){
while(this._ondomstatements.hasNext()){
this._ondomstatements.getNext().fireOnDOM();
}
},getWindowDimensions:function(){
return new Dimension(Client.isMozilla?window.innerWidth:document.body.clientWidth,Client.isMozilla?window.innerHeight:document.body.clientHeight);
},evaluate:function(_328){
return eval(_328);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMLOG_OPENED,{handleBroadcast:function(_329,_32a){
SystemLogger.unsuspend(_32a);
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
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_DIRTY,{handleBroadcast:function(_32b,arg){
var list=Application._dirtyTabs;
list.set(arg.key,arg);
if(list.countEntries()==1){
var _32e=top.app.bindingMap.broadcasterHasDirtyTabs;
_32e.enable();
}
}});
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,{handleBroadcast:function(_32f,arg){
var list=Application._dirtyTabs;
list.del(arg.key);
if(list.countEntries()==0){
var _332=top.app.bindingMap.broadcasterHasDirtyTabs;
_332.disable();
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
var _333=false;
if(this.isLoggedIn){
this.isLoggedIn=false;
this.isLoggedOut=true;
_333=LoginService.Logout(true);
if(!_333){
alert("Logout failed.");
}
}
return _333;
},lock:function(_334){
if(_334!=null){
this._lockthings[_334]=true;
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
},unlock:function(_335,_336){
if(_335!=null){
delete this._lockthings[_335];
if(top.bindingMap.mastercover!=null){
if(_336||this._lockers>0){
if(_336){
var out="Unlocked by "+new String(_335)+"\n";
for(var _338 in this._lockthings){
out+="Locked by "+new String(_338)+". ";
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
},hasLock:function(_339){
return this._lockthings[_339]==true;
},activate:function(_33a){
var _33b=this._activeBinding;
this._activeBinding=_33a;
this._activatedBindings.add(_33a);
if(_33b&&_33b.isActive){
_33b.deActivate();
}
},deActivate:function(_33c){
var _33d=null;
var _33e=null;
if(_33c==this._activeBinding){
while(!_33e&&this._activatedBindings.hasEntries()){
_33d=this._activatedBindings.extractLast();
if(_33d!=_33c&&_33d.isActivatable){
_33e=_33d;
}
}
if(!_33e){
_33e=app.bindingMap.explorerdock;
}
_33e.activate();
}
},focused:function(_33f){
this.isFocused=_33f;
if(_33f){
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
},handleAction:function(_344){
switch(_344.type){
case Application.REFRESH:
this.refresh();
break;
}
},declareTopLocal:function(win){
var _346=Resolver.resolve("/scripts/source/top/");
if(this._topLevelClasses==null){
this._topLevelClasses=new List();
var self=this;
new List(DOMUtil.getElementsByTagName(document,"script")).each(function(_348){
var src=_348.src;
if(src.indexOf(_346)>-1){
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
var _34d=false;
if(this._isMousePositionTracking){
_34d=true;
if(Client.isExplorer&&e.button!=1){
_34d=false;
}
if(_34d){
this._mousePosition=DOMUtil.getUniversalMousePosition(e);
}
}
return _34d;
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
},onDragStart:function(_34f){
var _350=BindingDragger.draggedBinding;
if(Interfaces.isImplemented(IDraggable,_350,true)==true){
if(!this._isDragging){
app.bindingMap.dragdropcursor.setImage(_350.getImage());
this._cursorStartPoint=_34f;
app.bindingMap.dragdropcursor.setPosition(this._cursorStartPoint);
CursorBinding.fadeIn(app.bindingMap.dragdropcursor);
if(_350.showDrag){
_350.showDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_START,_350.dragType);
this._isDragging=true;
}
}
},onDrag:function(diff){
if(this._isDragging){
var _352=new Point(this._cursorStartPoint.x+diff.x,this._cursorStartPoint.y+diff.y);
app.bindingMap.dragdropcursor.setPosition(_352);
}
},onDragStop:function(diff){
if(this._isDragging){
var _354=BindingDragger.draggedBinding;
if(_354.hideDrag){
_354.hideDrag();
}
EventBroadcaster.broadcast(BroadcastMessages.TYPEDRAG_STOP,_354.dragType);
this._isDragging=false;
_354=BindingAcceptor.acceptingBinding;
if(_354!=null){
if(Interfaces.isImplemented(IAcceptable,_354,true)==true){
_354.accept(BindingDragger.draggedBinding);
}else{
throw new Error("Application: IAcceptable not implemented "+_354);
}
BindingAcceptor.acceptingBinding=null;
CursorBinding.fadeOut(app.bindingMap.dragdropcursor);
}else{
app.bindingMap.dragdropcursor.hide();
}
}
},reload:function(_355){
if(this.isDeveloperMode||_355){
if(this.isDeveloperMode&&Client.isPrism){
Prism.clearCache();
}
Application.lock(Application);
setTimeout(function(){
top.window.location.reload(true);
},0);
}else{
if(Application.isOperational){
Dialog.question(StringBundle.getString("ui","Website.Application.DialogReload.Title"),StringBundle.getString("ui","Website.Application.DialogReload.Text"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_356){
if(_356==Dialog.RESPONSE_ACCEPT){
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
_Installation.prototype={versionString:null,versionPrettyString:null,installationID:null,handleBroadcast:function(_357){
switch(_357){
case BroadcastMessages.APPLICATION_KICKSTART:
var list=new List(InstallationService.GetInstallationInfo(true));
list.each(function(_359){
switch(_359.Key){
case "ProductVersion":
this.versionString=_359.Value;
break;
case "ProductTitle":
this.versionPrettyString=_359.Value;
break;
case "InstallationId":
this.installationID=_359.Value;
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
},initialize:function(_35c){
if(!this.isInitialized){
this.isInitialized=true;
if(_35c){
this._audio=_35c;
this.isEnabled=true;
}
EventBroadcaster.broadcast(BroadcastMessages.AUDIO_INITIALIZED);
}
},play:function(url){
var _35e=false;
if(this.isEnabled&&Preferences.getPref("audio")){
this._audio.fromURL(Resolver.resolve(url));
_35e=true;
}
return _35e;
}};
var Audio=new _Audio();
window.Preferences=new function(){
var _35f=SystemLogger.getLogger("Preferences");
this.AUDIO="audio";
this.LOGIN="login";
var _360={"audio":true,"login":true};
EventBroadcaster.subscribe(BroadcastMessages.LOCALSTORE_INITIALIZED,{handleBroadcast:function(){
if(LocalStore.isEnabled){
var _361=LocalStore.getProperty(LocalStore.PREFERENCES);
if(_361){
for(var key in _361){
_360[key]=_361[key];
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
LocalStore.setProperty(LocalStore.PREFERENCES,_360);
}
}});
this.getPref=function(key){
var _364=null;
if(key){
_364=_360[key];
}else{
throw "No such preference.";
}
return _364;
};
this.setPref=function(key,_366){
if(key){
_360[key]=_366;
}else{
throw "No such preference.";
}
};
function debug(_367){
var _368=_367?"Persisted preferences":"No persisted preferences. Using defaults";
_368+=":\n";
for(var key in _360){
var pref=_360[key];
_368+="\n\t"+key+": "+pref+" ["+typeof pref+"]";
}
_35f.fine(_368);
}
};
function _Persistance(){
}
_Persistance.prototype={_logger:SystemLogger.getLogger("Persistance"),_persistance:null,_isEnabled:false,isInitialized:false,isEnabled:false,getPersistedProperty:function(id,prop){
var _36d=null;
if(this.isInitialized==true){
if(this._persistance){
var _36e=this._persistance[id];
if(_36e){
_36d=_36e[prop];
}
}
}else{
throw "Persistance not initialized!";
}
return _36d;
},setPersistedProperty:function(id,prop,_371){
if(this.isInitialized==true){
if(this._persistance){
if(_371!=null){
if(!this._persistance[id]){
this._persistance[id]={};
}
this._persistance[id][prop]=String(_371);
}else{
this._logger.error("Cannot persist "+prop+" with value: null");
}
}
}else{
throw "Persistance not initialized!";
}
},clearAllPersistedProperties:function(){
this._logger.debug("TODO: clearAllPersistedProperties");
},handleBroadcast:function(_372){
switch(_372){
case BroadcastMessages.APPLICATION_SHUTDOWN:
var _373=top.bindingMap.persistance;
_373.persist(this._persistance);
break;
}
},initialize:function(){
if(!this.isInitialized){
this.isInitialized=true;
if(this._isEnabled==true){
var _374=top.bindingMap.persistance;
var map=_374.getPersistanceMap();
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
function StandardEventHandler(doc,_377){
this.logger=SystemLogger.getLogger("StandardEventHandler ["+doc.title+"]");
this._contextDocument=doc;
this._contextWindow=DOMUtil.getParentWindow(doc);
this.hasNativeKeys=false;
this._isAllowTabs=false;
this._isMouseHandlerOnly=_377;
this._addListeners();
}
StandardEventHandler.prototype._addListeners=function(){
var doc=this._contextDocument;
var _379=this._contextWindow.bespin!=undefined;
DOMEvents.addEventListener(doc,DOMEvents.MOUSEDOWN,this,_379);
DOMEvents.addEventListener(doc,DOMEvents.MOUSEUP,this);
DOMEvents.addEventListener(doc,DOMEvents.MOUSEMOVE,this);
if(_379){
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
var _37b={handleEvent:function(e){
switch(e.type){
case DOMEvents.BLUR:
Application.focused(false);
break;
case DOMEvents.FOCUS:
Application.focused(true);
break;
}
}};
DOMEvents.addEventListener(this._contextWindow,DOMEvents.BLUR,_37b);
DOMEvents.addEventListener(this._contextWindow,DOMEvents.FOCUS,_37b);
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
var _382=UserInterface.getBinding(node);
if(_382!=null){
_382.dispatchAction(Binding.ACTION_ACTIVATED);
}
node=_382!=null?null:node.parentNode;
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
var _385=Application.trackMousePosition(e);
if(_385){
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEMOVE,e);
}
}
catch(exception){
DOMEvents.removeEventListener(this._contextDocument,DOMEvents.MOUSEMOVE,this);
throw (exception);
}
};
StandardEventHandler.prototype._handleKeyDown=function(e,_387){
if(e.keyCode==KeyEventCodes.VK_TAB){
if(!this._isAllowTabs){
if(!_387){
this._handleTab(e);
DOMEvents.preventDefault(e);
}
}else{
if(e.shiftKey||e.ctrlKey){
DOMEvents.preventDefault(e);
}
}
_387=true;
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
if(!Client.isWebKit){
DOMEvents.preventDefault(e);
}
break;
}
}
if(e.keyCode==KeyEventCodes.VK_BACK){
if(!StandardEventHandler.isBackAllowed){
DOMEvents.preventDefault(e);
}
}
var _388=KeySetBinding.handleKey(this._contextDocument,e);
if(!_388){
switch(e.keyCode){
case KeyEventCodes.VK_PAGE_UP:
case KeyEventCodes.VK_PAGE_DOWN:
break;
default:
var _389=this._contextWindow.frameElement;
if(_389!=null){
var _38a=DOMUtil.getParentWindow(_389);
if(_38a.standardEventHandler!=null){
_38a.standardEventHandler._handleKeyDown(e,_387);
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
var _38d=false;
var _38e=DOMEvents.getTarget(e);
var name=_38e.nodeName.toLowerCase();
switch(name){
case "input":
case "textarea":
case "select":
_38d=(e.type==DOMEvents.FOCUS||e.type==DOMEvents.FOCUSIN);
if(name=="input"||name=="textarea"){
StandardEventHandler.isBackAllowed=_38d;
}
if(_38d){
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
StandardEventHandler.prototype.enableNativeKeys=function(_391){
this._isAllowTabs=(_391==true?true:false);
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
function Action(_394,type){
this.target=_394;
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
function Animation(_396){
this.id=KeyMaster.getUniqueKey();
this.interval=25;
this.iterator=0;
this.modifier=1;
this.endcount=90;
for(var _397 in _396){
this[_397]=_396[_397];
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
Animation.prototype.onstart=function(_39b){
};
Animation.prototype.onstep=function(_39c){
};
Animation.prototype.onstop=function(_39d){
};
Point.isEqual=function(p1,p2){
var _3a0=false;
if(p1&&p2){
_3a0=(p1.x==p2.x)&&(p1.y==p2.y);
}
return _3a0;
};
function Point(x,y){
this.x=x;
this.y=y;
}
Point.prototype={x:0,y:0};
Dimension.isEqual=function(dim1,dim2){
var _3a5=false;
if(dim1&&dim2){
_3a5=(dim1.w==dim2.w)&&(dim1.h==dim2.h);
}
return _3a5;
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
function BindingAcceptor(_3ac){
this.logger=SystemLogger.getLogger("BindingDragger");
this._binding=_3ac;
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
var _3ad=new List(this._binding.dragAccept.split(" "));
while(_3ad.hasNext()){
var type=_3ad.getNext();
this._acceptedList[type]=true;
}
}
};
BindingAcceptor.prototype.handleBroadcast=function(_3af,arg){
var type=arg;
try{
switch(_3af){
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
function BindingBoxObject(_3b4){
this._domElement=_3b4.getBindingElement();
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
function BindingDragger(_3b6){
this.logger=SystemLogger.getLogger("BindingDragger");
this.binding=_3b6;
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
BindingDragger.prototype.registerHandler=function(_3b8){
if(Interfaces.isImplemented(IDragHandler,_3b8)==true){
this.handler=_3b8;
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
var _3bb=e.button==(e.target?0:1);
if(_3bb){
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
var _3bd=Application.getMousePosition();
var dx=_3bd.x-this.startPoint.x;
var dy=_3bd.y-this.startPoint.y;
return new Point(dx,dy);
};
BindingDragger.prototype.handleBroadcast=function(_3c0,e){
switch(_3c0){
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
function BindingParser(_3c2){
this.logger=SystemLogger.getLogger("BindingParser");
this._ownerDocument=_3c2;
this._rootElement=null;
}
BindingParser.prototype.parseFromString=function(_3c3){
var _3c4=new List();
var xml=BindingParser.XML.replace("${markup}",_3c3);
var doc=XMLParser.parse(_3c3);
if(doc){
var _3c7=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this._ownerDocument);
this._iterate(doc.documentElement,_3c7);
var node=_3c7.firstChild;
while(node){
if(node.nodeType==Node.ELEMENT_NODE){
_3c4.add(node);
}
node=node.nextSibling;
}
}
return _3c4;
};
BindingParser.prototype._iterate=function(_3c9,_3ca){
var _3cb=null;
switch(_3c9.nodeType){
case Node.ELEMENT_NODE:
_3cb=this._cloneElement(_3c9);
UserInterface.registerBinding(_3cb);
break;
case Node.TEXT_NODE:
_3cb=this._ownerDocument.createTextNode(_3c9.nodeValue);
break;
}
if(_3cb){
_3ca.appendChild(_3cb);
}
if(_3cb&&_3c9.hasChildNodes()){
var _3cc=_3c9.firstChild;
while(_3cc){
this._iterate(_3cc,_3cb);
_3cc=_3cc.nextSibling;
}
}
};
BindingParser.prototype._cloneElement=function(_3cd){
var _3ce=DOMUtil.createElementNS(_3cd.namespaceURI?_3cd.namespaceURI:Constants.NS_XHTML,_3cd.nodeName,this._ownerDocument);
var i=0;
while(i<_3cd.attributes.length){
var attr=_3cd.attributes.item(i++);
_3ce.setAttribute(attr.nodeName,String(attr.nodeValue));
}
return _3ce;
};
BindingSerializer.activeInstance=null;
BindingSerializer.KEYPOINTER="bindingserializerkeypointer";
BindingSerializer.includeShadowTreeBindings=false;
BindingSerializer.filter=function(_3d1){
var _3d2=null;
var _3d3=false;
var _3d4=_3d1.parentNode.getAttribute(BindingSerializer.KEYPOINTER);
if(UserInterface.hasBinding(_3d1)){
var _3d5=UserInterface.getBinding(_3d1);
_3d3=BindingSerializer.activeInstance.indexBinding(_3d5);
if(_3d3){
_3d2=_3d5.key;
_3d1.setAttribute(BindingSerializer.KEYPOINTER,_3d2);
}
}
_3d2=_3d2?_3d2:_3d4;
var _3d6=new List(_3d1.childNodes);
_3d6.each(function(_3d7){
if(_3d7.nodeType==Node.ELEMENT_NODE){
_3d7.setAttribute(BindingSerializer.KEYPOINTER,_3d2);
}
});
if(_3d3){
BindingSerializer.activeInstance.append(_3d2,_3d4);
}
};
function BindingSerializer(){
this.logger=SystemLogger.getLogger("BindingSerializer");
this._dom=DOMUtil.getDOMDocument();
alert("BindingSerializer: Convert to Crawler!");
this._pointers=[];
}
BindingSerializer.prototype.serializeBinding=function(_3d8,_3d9){
BindingSerializer.includeShadowTreeBindings=_3d9?true:false;
BindingSerializer.activeInstance=this;
_3d8.bindingWindow.ElementIterator.iterate(_3d8.bindingElement,BindingSerializer.filter);
return DOMSerializer.serialize(this._dom,true);
};
BindingSerializer.prototype.indexBinding=function(_3da){
var _3db=false;
var _3dc=_3da.serialize();
if(_3dc!=false){
_3db=true;
var _3dd="ui:"+DOMUtil.getLocalName(_3da.bindingElement);
var _3de=DOMUtil.createElementNS(Constants.NS_UI,_3dd,this._dom);
this._pointers[_3da.key]=_3de;
for(var prop in _3dc){
if(_3dc[prop]!=null){
_3de.setAttribute(prop,String(_3dc[prop]));
}
}
}
return _3db;
};
BindingSerializer.prototype.append=function(_3e0,_3e1){
var _3e2=this._pointers[_3e0];
var _3e3=_3e1?this._pointers[_3e1]:this._dom;
_3e3.appendChild(_3e2);
};
function ImageProfile(_3e4){
this._default=_3e4.image;
this._hover=_3e4.imageHover;
this._active=_3e4.imageActive;
this._disabled=_3e4.imageDisabled;
}
ImageProfile.prototype.getDefaultImage=function(){
return this._default;
};
ImageProfile.prototype.setDefaultImage=function(_3e5){
this._default=_3e5;
};
ImageProfile.prototype.getHoverImage=function(){
return this._hover;
};
ImageProfile.prototype.setHoverImage=function(_3e6){
this._hover=_3e6;
};
ImageProfile.prototype.getActiveImage=function(){
return this._active;
};
ImageProfile.prototype.setActiveImage=function(_3e7){
this._active=_3e7;
};
ImageProfile.prototype.getDisabledImage=function(){
return this._disabled;
};
ImageProfile.prototype.setDisabledImage=function(_3e8){
this._disabled=_3e8;
};
function _BindingFinder(){
}
_BindingFinder.prototype={getDescendantBindingsByLocalName:function(_3e9,_3ea,_3eb){
var _3ec=null;
if(_3e9.isAttached){
_3ec=new List();
var _3ed=_3eb?_3e9.getChildElementsByLocalName(_3ea):_3e9.getDescendantElementsByLocalName(_3ea);
_3ed.each(function(_3ee){
var _3ef=UserInterface.getBinding(_3ee);
if(_3ef){
_3ec.add(_3ef);
}
});
}else{
var ouch="Could not resolve descendants of unattached binding "+_3e9.toString();
if(Application.isDeveloperMode){
throw ouch;
}
}
return _3ec;
},getAncestorBindingByType:function(_3f1,impl,_3f3){
var _3f4=null;
if(Binding.exists(_3f1)){
var node=_3f1.bindingElement;
while(_3f4==null&&node!=null){
node=node.parentNode;
if(node!=null){
if(UserInterface.hasBinding(node)){
var _3f6=UserInterface.getBinding(node);
if(_3f6 instanceof impl){
_3f4=_3f6;
}
}else{
if(_3f3&&node.nodeType==Node.DOCUMENT_NODE){
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
return _3f4;
},getAncestorBindingByLocalName:function(_3f8,_3f9,_3fa){
var _3fb=null;
if(_3f9=="*"){
var node=_3f8.bindingElement;
while(!_3fb&&(node=node.parentNode)!=null){
if(UserInterface.hasBinding(node)){
_3fb=UserInterface.getBinding(node);
}
}
}else{
_3fb=UserInterface.getBinding(DOMUtil.getAncestorByLocalName(_3f9,_3f8.bindingElement,_3fa));
}
return _3fb;
},getChildElementsByLocalName:function(_3fd,_3fe){
var _3ff=new List();
var _400=new List(_3fd.bindingElement.childNodes);
_400.each(function(_401){
if(_401.nodeType==Node.ELEMENT_NODE){
if(_3fe=="*"||DOMUtil.getLocalName(_401)==_3fe){
_3ff.add(_401);
}
}
});
return _3ff;
},getChildBindingByType:function(_402,impl){
var _404=null;
_402.getChildElementsByLocalName("*").each(function(_405){
var _406=UserInterface.getBinding(_405);
if(_406!=null&&_406 instanceof impl){
_404=_406;
return false;
}else{
return true;
}
});
return _404;
},getDescendantBindingByType:function(_407,impl){
var _409=null;
_407.getDescendantElementsByLocalName("*").each(function(_40a){
var _40b=UserInterface.getBinding(_40a);
if(_40b!=null&&_40b instanceof impl){
_409=_40b;
return false;
}else{
return true;
}
});
return _409;
},getDescendantBindingsByType:function(_40c,impl){
var _40e=new List();
_40c.getDescendantElementsByLocalName("*").each(function(_40f){
var _410=UserInterface.getBinding(_40f);
if(_410!=null&&_410 instanceof impl){
_40e.add(_410);
}
return true;
});
return _40e;
},getNextBindingByLocalName:function(_411,name){
var _413=null;
var _414=_411.bindingElement;
while((_414=DOMUtil.getNextElementSibling(_414))!=null&&DOMUtil.getLocalName(_414)!=name){
}
if(_414!=null){
_413=UserInterface.getBinding(_414);
}
return _413;
},getPreviousBindingByLocalName:function(_415,name){
var _417=null;
var _418=_415.bindingElement;
while((_418=DOMUtil.getPreviousElementSibling(_418))!=null&&DOMUtil.getLocalName(_418)!=name){
}
if(_418!=null){
_417=UserInterface.getBinding(_418);
}
return _417;
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
},addFilter:function(_419){
this._filters.add(_419);
},removeFilter:function(_41a){
var _41b=-1;
this._filters.each(function(fil){
_41b++;
var _41d=true;
if(fil==_41a){
_41d=false;
}
return _41d;
});
if(_41b>-1){
this._filters.del(_41b);
}
},_applyFilters:function(node,arg){
var _420=null;
var stop=NodeCrawler.STOP_CRAWLING;
var skip=NodeCrawler.SKIP_NODE;
var _423=NodeCrawler.SKIP_CHILDREN;
this._filters.reset();
var _424=true;
while(this._filters.hasNext()&&_424==true){
var _425=this._filters.getNext();
var res=_425.call(this,node,arg);
if(res!=null){
_420=res;
switch(res){
case stop:
case skip:
case skip+_423:
_424=false;
break;
}
}
}
return _420;
},crawl:function(_427,arg){
this.contextDocument=_427.ownerDocument;
this.onCrawlStart();
var _429=this.type==NodeCrawler.TYPE_ASCENDING;
var _42a=this._applyFilters(_427,arg);
if(_42a!=NodeCrawler.STOP_CRAWLING){
if(_429&&_42a==NodeCrawler.SKIP_CHILDREN){
}else{
var next=null;
if(this.nextNode!=null){
next=this.nextNode;
this.nextNode=null;
}else{
next=_429?_427.parentNode:_427;
}
this._crawl(next,arg);
}
}
this.onCrawlStop();
},onCrawlStart:function(){
},onCrawlStop:function(){
},_crawl:function(_42c,arg){
var _42e=null;
switch(this.type){
case NodeCrawler.TYPE_DESCENDING:
_42e=this._crawlDescending(_42c,arg);
break;
case NodeCrawler.TYPE_ASCENDING:
_42e=this._crawlAscending(_42c,arg);
break;
}
return _42e;
},_crawlDescending:function(_42f,arg){
var skip=NodeCrawler.SKIP_NODE;
var _432=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
var _434=null;
if(_42f.hasChildNodes()){
var node=_42f.firstChild;
while(node!=null&&_434!=stop){
this.currentNode=node;
_434=this._applyFilters(node,arg);
switch(_434){
case stop:
case _432:
case skip+_432:
break;
default:
if(node.nodeType==Node.ELEMENT_NODE){
if(this.nextNode==null){
var res=this._crawl(node,arg);
if(res==stop){
_434=stop;
break;
}
}
}
if(_434!=stop&&_434!=skip){
this.previousNode=node;
}
break;
}
if(_434!=stop){
node=this.nextNode?this.nextNode:node.nextSibling;
this.nextNode=null;
}
}
}
return _434;
},_crawlAscending:function(_437,arg){
var _439=null;
var skip=NodeCrawler.SKIP_CHILDREN;
var stop=NodeCrawler.STOP_CRAWLING;
if(_437!=null){
this.currentNode=_437;
_439=this._applyFilters(_437,arg);
if(_439!=stop){
var next=this.nextNode?this.nextNode:_437.parentNode;
this.nextNode=null;
if(next&&next.nodeType!=Node.DOCUMENT_NODE){
this.previousNode=_437;
_439=this._crawl(next,arg);
}
}
}else{
_439=stop;
}
return _439;
}};
NodeCrawler.prototype.dispose=function(){
this._filters.dispose();
for(var _43d in this){
this[_43d]=null;
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
var _440=null;
if(node.nodeType!=Node.ELEMENT_NODE){
_440=NodeCrawler.SKIP_NODE;
}
return _440;
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
this.addFilter(function(_441,arg){
var _443=null;
if(!UserInterface.hasBinding(_441)){
_443=NodeCrawler.SKIP_NODE;
}
return _443;
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
this.addFilter(function(_445,arg){
var _447=null;
var _448=UserInterface.getBinding(_445);
if(Interfaces.isImplemented(ICrawlerHandler,_448)==true){
self.response=null;
_448.handleCrawler(self);
_447=self.response;
}
return _447;
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
this.addFilter(function(_44a,list){
var _44c=null;
var _44d=UserInterface.getBinding(_44a);
if(Interfaces.isImplemented(IFlexible,_44d)==true){
switch(self.mode){
case FlexBoxCrawler.MODE_FORCE:
list.add(_44d);
break;
case FlexBoxCrawler.MODE_NORMAL:
if(_44d.isFlexSuspended==true){
_44c=NodeCrawler.SKIP_CHILDREN;
}else{
list.add(_44d);
}
break;
}
}
return _44c;
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
this.addFilter(function(_44e,list){
var _450=null;
var _451=UserInterface.getBinding(_44e);
if(_451.isAttached==true){
if(Interfaces.isImplemented(IFocusable,_451)==true){
if(_451.isFocusable&&_451.isVisible){
switch(this.mode){
case FocusCrawler.MODE_INDEX:
list.add(_451);
break;
case FocusCrawler.MODE_FOCUS:
if(!_451.isFocused){
_451.focus();
}
_450=NodeCrawler.STOP_CRAWLING;
break;
case FocusCrawler.MODE_BLUR:
if(_451.isFocused==true){
_451.blur();
_450=NodeCrawler.STOP_CRAWLING;
}
break;
}
}
}
}
return _450;
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
this.addFilter(function(_452,list){
var _454=null;
var _455=UserInterface.getBinding(_452);
if(!_455.isVisible){
_454=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _454;
});
this.addFilter(function(_456,list){
var _458=null;
var _459=UserInterface.getBinding(_456);
if(_459.isAttached){
if(Interfaces.isImplemented(IFit,_459)){
if(!_459.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_459);
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
UpdateAssistant.serialize=function(_45a){
_45a=_45a.cloneNode(true);
_45a.setAttributeNS(Constants.NS_NS,"xmlns",Constants.NS_XHTML);
_45a.setAttributeNS(Constants.NS_NS,"xmlns:ui",Constants.NS_UI);
return this._serializer.serializeToString(_45a);
};
}
},handleEvent:function(e){
var _45c=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.BEFOREUPDATE:
this._beforeUpdate(_45c);
break;
case DOMEvents.AFTERUPDATE:
this._afterUpdate(_45c);
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
},_beforeUpdate:function(_45d){
var _45e=(_45d==document.documentElement);
if(_45e){
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
var _461=FocusBinding.focusedBinding;
if(_461!=null){
this._focusID=_461.getID();
}
if(this.isDebugging){
this._oldDOM=DOMSerializer.serialize(UpdateManager.currentDOM,true);
}
}else{
switch(_45d.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_REMOVE:
DocumentManager.detachBindings(_45d);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_45d,false);
break;
}
}
},_afterUpdate:function(_462){
var _463=(_462==document.documentElement);
if(_463){
var _464=this._elementsbuffer;
if(_464.hasEntries()){
_464.each(function(_465){
DocumentManager.attachBindings(_465);
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
var _468=FocusBinding.focusedBinding;
if(_468==null){
var _469=document.getElementById(this._focusID);
if(_469!=null){
var _468=UserInterface.getBinding(_469);
if(_468!=null){
_468.focus();
}
}
}
this._focusID=null;
if(UpdateManager.summary!=""){
if(this.isDebugging){
var _46a=DOMSerializer.serialize(UpdateManager.currentDOM,true);
var _46b="NEW DOM: "+document.title+"\n\n"+_46a+"\n\n";
_46b+="OLD DOM: "+document.title+"\n\n"+this._oldDOM;
this._logger.debug(_46b);
this._oldDOM=null;
}
this._logger.fine(UpdateManager.summary);
}
}else{
switch(_462.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_INSERT:
this._elementsbuffer.add(_462);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_462,true);
break;
}
switch(_462.id){
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
var _468=UserInterface.getBinding(_462);
while(_468==null&&_462!=null){
_468=UserInterface.getBinding(_462);
_462=_462.parentNode;
}
if(_468!=null){
_468.dispatchAction(Binding.ACTION_UPDATED);
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
},_backupattributes:function(_46d,_46e){
var _46f=UserInterface.getBinding(_46d);
if(_46f!=null){
if(_46e){
var _470=this._attributesbuffer;
var map=new Map();
_470.each(function(name,old){
var now=_46d.getAttribute(name);
if(now!=null){
if(now!=old){
map.set(name,Types.castFromString(now));
}
}else{
map.set(name,null);
}
});
new List(_46d.attributes).each(function(att){
if(att.specified){
if(!_470.has(att.nodeName)){
map.set(att.nodeName,Types.castFromString(att.nodeValue));
}
}
});
map.each(function(name,_477){
var _478=_46f.propertyMethodMap[name];
if(_478!=null){
_478.call(_46f,_477);
}
});
}else{
var map=new Map();
new List(_46d.attributes).each(function(att){
if(att.specified){
map.set(att.nodeName,att.nodeValue);
}
});
this._attributesbuffer=map;
}
}
},handleElement:function(_47a,_47b){
var _47c=window.bindingMap[_47a.getAttribute("id")];
if(_47c!=null){
return _47c.handleElement(_47a,_47b);
}
},updateElement:function(_47d,_47e){
var _47f=window.bindingMap[_47d.getAttribute("id")];
if(_47f!=null){
return _47f.updateElement(_47d,_47e);
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
this.addFilter(function(_481,list){
var _483=UserInterface.getBinding(_481);
var _484=null;
switch(self.mode){
case DocumentCrawler.MODE_REGISTER:
if(_483==null){
UserInterface.registerBinding(_481);
}
break;
case DocumentCrawler.MODE_ATTACH:
if(_483!=null){
if(!_483.isAttached){
list.add(_483);
}
if(_483.isLazy==true){
_484=NodeCrawler.SKIP_CHILDREN;
}
}
break;
case DocumentCrawler.MODE_DETACH:
if(_483!=null){
list.add(_483);
}
break;
}
return _484;
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
},handleBroadcast:function(_485,arg){
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
var _488=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.SELECTSTART:
case DOMEvents.CONTEXTMENU:
if(!this._isTextInputElement(_488)){
DOMEvents.preventDefault(e);
}
break;
case DOMEvents.CLICK:
if(Client.isExplorer){
if(_488!=null){
if(_488.href!=null&&_488.href.indexOf(Constants.DUMMY_LINK)>-1){
DOMEvents.preventDefault(e);
}
}
}
break;
}
},_resolveCustomBindingMappings:function(){
var _489=DOMUtil.getElementsByTagName(document.documentElement,"bindingmappingset").item(0);
if(_489!=null){
var map={};
var _48b=DOMUtil.getElementsByTagName(_489,"bindingmapping");
new List(_48b).each(function(_48c){
var _48d=_48c.getAttribute("element");
var _48e=_48c.getAttribute("binding");
map[_48d]=eval(_48e);
});
this.setCustomUserInterfaceMapping(new UserInterfaceMapping(map));
}
},setCustomUserInterfaceMapping:function(_48f){
if(this.customUserInterfaceMapping==null){
this.customUserInterfaceMapping=_48f;
}else{
this.customUserInterfaceMapping.merge(_48f);
}
},_registerBindings:function(_490){
var _491=new DocumentCrawler();
_491.mode=DocumentCrawler.MODE_REGISTER;
_491.crawl(_490);
_491.dispose();
},_attachBindings:function(_492){
var _493=new DocumentCrawler();
_493.mode=DocumentCrawler.MODE_ATTACH;
var list=new List();
_493.crawl(_492,list);
var _495=false;
while(list.hasNext()){
var _496=list.getNext();
if(!_496.isAttached){
_496.onBindingAttach();
if(!_496.memberDependencies){
_496.onBindingInitialize();
}
if(Interfaces.isImplemented(IData,_496)){
_495=true;
}
}
}
if(_495){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_493.dispose();
list.dispose();
},attachBindings:function(_498){
this._registerBindings(_498);
this._attachBindings(_498);
},detachBindings:function(_499,_49a){
var _49b=new DocumentCrawler();
_49b.mode=DocumentCrawler.MODE_DETACH;
var list=new List();
_49b.crawl(_499,list);
if(_49a==true){
list.extractFirst();
}
var _49d=false;
list.reverse().each(function(_49e){
if(Interfaces.isImplemented(IData,_49e)){
_49d=true;
}
_49e.dispose(true);
});
if(_49d){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_49b.dispose();
list.dispose();
},detachAllBindings:function(){
this.detachBindings(document.documentElement);
},computeMaxIndex:function(){
if(this._maxIndex==-1){
this._maxIndex=DOMUtil.getMaxIndex(document);
}
return this._maxIndex++;
},_isTextInputElement:function(_4a0){
return (/textarea|input/.test(DOMUtil.getLocalName(_4a0)));
},_makeDocumentUnselectable:function(){
if(Client.isExplorer){
DOMEvents.addEventListener(document,DOMEvents.SELECTSTART,this);
}else{
}
}};
var DocumentManager=new _DocumentManager();
function _DataManager(){
}
_DataManager.prototype={isPostBackFun:false,_logger:SystemLogger.getLogger("DataManager ["+document.title+"]"),_dataBindings:{},isDirty:false,dirty:function(_4a1){
this.isDirty=true;
var _4a2=false;
if(_4a1!=null&&!_4a1.isDirty){
_4a1.isDirty=true;
_4a1.dispatchAction(Binding.ACTION_DIRTY);
_4a2=true;
}
return _4a2;
},clean:function(_4a3){
if(_4a3.isDirty){
_4a3.isDirty=false;
}
},registerDataBinding:function(name,_4a5){
if(Interfaces.isImplemented(IData,_4a5,true)){
if(this._dataBindings[name]!=null){
throw "no proper support for checkbox multiple values! "+name;
}else{
this._dataBindings[name]=_4a5;
}
}else{
throw "Invalid DataBinding: "+_4a5;
}
},unRegisterDataBinding:function(name){
if(this._dataBindings[name]!=null){
delete this._dataBindings[name];
}
},getDataBinding:function(name){
var _4a8=null;
if(this._dataBindings[name]!=null){
_4a8=this._dataBindings[name];
}
return _4a8;
},getAllDataBindings:function(_4a9){
var list=new List();
for(var name in this._dataBindings){
var _4ac=this._dataBindings[name];
list.add(_4ac);
if(_4a9&&_4ac instanceof WindowBinding){
var _4ad=_4ac.getContentWindow().DataManager;
if(_4ad!=null){
list.merge(_4ad.getAllDataBindings());
}
}
}
return list;
},hasDataBindings:function(){
var _4ae=false;
for(var name in this._dataBindings){
_4ae=true;
break;
}
return _4ae;
},populateDataBindings:function(map){
if(map instanceof DataBindingMap){
map.each(function(name,_4b2){
var _4b3=this._dataBindings[name];
if(_4b3!=null){
switch(map.type){
case DataBindingMap.TYPE_RESULT:
try{
_4b3.setResult(_4b2);
}
catch(exception){
if(Application.isDeveloperMode){
alert(_4b3);
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
var _4b4=new DataBindingMap();
_4b4.type=DataBindingMap.TYPE_VALUE;
for(var name in this._dataBindings){
var _4b6=this._dataBindings[name];
if(_4b6 instanceof DataDialogBinding){
throw "DataDialogBinding valuemap not supported!";
}
_4b4[name]=_4b6.getValue();
}
return _4b4;
},getDataBindingResultMap:function(){
var _4b7=new DataBindingMap();
_4b7.type=DataBindingMap.TYPE_RESULT;
for(var name in this._dataBindings){
var _4b9=this._dataBindings[name];
var res=_4b9.getResult();
if(res instanceof DataBindingMap){
res.each(function(name,_4bc){
_4b7.set(name,_4bc);
});
}else{
_4b7.set(name,res);
}
}
return _4b7;
},getPostBackString:function(){
var _4bd="";
var form=document.forms[0];
if(form!=null){
var _4bf="";
new List(form.elements).each(function(_4c0){
var name=_4c0.name;
var _4c2=encodeURIComponent(_4c0.value);
switch(_4c0.type){
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_4bd+=name+"="+_4c2+"&";
break;
case "submit":
if(document.activeElement==_4c0){
_4bd+=name+"="+_4c2+"&";
}
break;
case "radio":
if(_4c0.checked){
_4bd+=name+"="+_4c2+"&";
}
break;
case "checkbox":
if(_4c0.checked){
if(_4c0.name==_4bf){
if(_4bd.lastIndexOf("&")==_4bd.length-1){
_4bd=_4bd.substr(0,_4bd.length-1);
}
_4bd+=","+_4c2;
}else{
_4bd+=name+"="+_4c0.value;
}
_4bf=name;
_4bd+="&";
}
break;
}
});
}
return _4bd.substr(0,_4bd.length-1);
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
var _4cb=null;
var _4cc=null;
var _4cd=false;
if(!this._cache[name]){
_4cd=true;
var uri=Constants.TEMPLATESROOT+"/"+name;
var _4cf=DOMUtil.getXMLHTTPRequest();
_4cf.open("get",uri,false);
_4cf.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_4cf.send(null);
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4cc=_4cf.responseText;
break;
default:
_4cc=_4cf.responseXML;
break;
}
if(_4cc==null){
throw new Error("Templates: Could not read template. Malformed XML?");
}else{
this._cache[name]=_4cc;
}
}
_4cc=this._cache[name];
switch(this._mode){
case this._modes.MODE_PLAINTEXT:
_4cb=_4cc;
break;
case this._modes.MODE_DOCUMENT:
_4cb=DOMUtil.cloneNode(_4cc,true);
break;
case this._modes.MODE_ELEMENT:
_4cb=DOMUtil.cloneNode(_4cc.documentElement,true);
break;
case this._modes.MODE_DOCUMENTTEXT:
_4cb=DOMSerializer.serialize(_4cc,true);
break;
case this._modes.MODE_ELEMENTTEXT:
_4cb=DOMSerializer.serialize(_4cc.documentElement,true);
break;
}
if(_4cd&&Application.isDeveloperMode){
this._logger.fine(new String("Import \""+name+"\":\n\n"+_4cb));
}
return _4cb;
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
},invoke:function(url,_4d3,_4d4){
this._logger.error("Not implemented");
},invokeModal:function(url,_4d6,_4d7){
var _4d8=new DialogViewDefinition({handle:KeyMaster.getUniqueKey(),position:Dialog.MODAL,url:url,handler:_4d6,argument:_4d7});
StageBinding.presentViewDefinition(_4d8);
return _4d8;
},invokeDefinition:function(_4d9){
if(_4d9 instanceof DialogViewDefinition){
StageBinding.presentViewDefinition(_4d9);
}
return _4d9;
},question:function(_4da,text,_4dc,_4dd){
if(!_4dc){
_4dc=this.BUTTONS_ACCEPT_CANCEL;
}
this._standardDialog(this._TYPE_QUESTION,_4da,text,_4dc,_4dd);
},message:function(_4de,text,_4e0,_4e1){
if(!_4e0){
_4e0=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_MESSAGE,_4de,text,_4e0,_4e1);
},error:function(_4e2,text,_4e4,_4e5){
if(!_4e4){
_4e4=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_ERROR,_4e2,text,_4e4,_4e5);
},warning:function(_4e6,text,_4e8,_4e9){
if(!_4e8){
_4e8=this.BUTTONS_ACCEPT;
}
this._standardDialog(this._TYPE_WARNING,_4e6,text,_4e8,_4e9);
},_standardDialog:function(type,_4eb,text,_4ed,_4ee){
var _4ef=null;
if(!_4ed){
_4ef=new List(Dialog.BUTTONS_ACCEPT);
}else{
_4ef=new List();
new List(_4ed).each(function(_4f0){
var _4f1=null;
switch(typeof _4f0){
case "object":
_4f1=_4f0;
break;
case "string":
var _4f2=false;
if(_4f0.indexOf(":")>-1){
_4f0=_4f0.split(":")[0];
_4f2=true;
}
_4f1=Dialog._dialogButtons[_4f0];
if(_4f2){
_4f1.isDefault=true;
}
break;
}
_4ef.add(_4f1);
});
}
var _4f3={title:_4eb,text:text,type:type,image:this._dialogImages[type],buttons:_4ef};
var _4f4=new DialogViewDefinition({handle:"standarddialog:"+type,position:Dialog.MODAL,url:this._URL_STANDARDDIALOG,handler:_4ee,argument:_4f3});
StageBinding.presentViewDefinition(_4f4);
}};
var Dialog=new _Dialog();
function _Commands(){
this._construct();
}
_Commands.prototype={_URL_ABOUTDIALOG:"${root}/content/dialogs/about/about.aspx",_URL_PREFERENCES:"${root}/content/dialogs/preferences/preferences.aspx",_construct:function(){
var self=this;
EventBroadcaster.subscribe(BroadcastMessages.SAVE_ALL,{handleBroadcast:function(_4f6,arg){
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
},saveAll:function(_4f9){
var self=this;
var _4fb=Application.getDirtyDockTabsTabs();
if(_4fb.hasEntries()){
Dialog.invokeModal("${root}/content/dialogs/save/saveall.aspx",{handleDialogResponse:function(_4fc,_4fd){
switch(_4fc){
case Dialog.RESPONSE_ACCEPT:
self._handleSaveAllResult(_4fd,_4f9);
break;
case Dialog.RESPONSE_CANCEL:
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
break;
}
}},_4fb);
}else{
if(_4f9){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
},_handleSaveAllResult:function(_4fe,_4ff){
var _500=false;
var list=new List();
_4fe.each(function(name,tab){
if(tab!=false){
list.add(tab);
}
});
if(list.hasEntries()){
_500=true;
var _504=list.getLength();
var _505={handleBroadcast:function(_506,tab){
if(--_504==0){
EventBroadcaster.unsubscribe(BroadcastMessages.DOCKTAB_CLEAN,this);
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
if(_4ff){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_ALL);
}
}
}};
EventBroadcaster.subscribe(BroadcastMessages.DOCKTAB_CLEAN,_505);
list.each(function(tab){
tab.saveContainedEditor();
});
}else{
EventBroadcaster.broadcast(BroadcastMessages.SAVE_ALL_DONE);
}
return _500;
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
var _50a="Composite.Management.Help";
if(!StageBinding.isViewOpen(_50a)){
StageBinding.handleViewPresentation(_50a);
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
var _50c=document.createEvent("Events");
_50c.initEvent(type,true,true);
window.dispatchEvent(_50c);
}else{
this._logger.warn("Prism methods should only be invoked in Prism! ("+type+")");
}
}};
var Prism=new _Prism();
ViewDefinition.DEFAULT_URL="${root}/blank.aspx";
ViewDefinition.clone=function(_50d,_50e){
var _50f=null;
var _510=ViewDefinitions[_50d];
if(_510.isMutable){
var impl=null;
if(_510 instanceof DialogViewDefinition){
impl=DialogViewDefinition;
}else{
impl=HostedViewDefinition;
}
if(_50e!=null&&impl!=null){
var def=new impl();
for(var prop in _510){
def[prop]=_510[prop];
}
def.handle=_50e;
_50f=def;
}else{
throw "Cannot clone without newhandle";
}
}else{
throw "Cannot clone non-mutable definition";
}
return _50f;
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
Binding.evaluate=function(_519,_51a){
var _51b=null;
var _51c=_51a.bindingWindow.WindowManager;
if(_51c!=null){
var _51d=Binding.parseScriptStatement(_519,_51a.key);
_51b=_51c.evaluate(_51d);
}
return _51b;
};
Binding.parseScriptStatement=function(_51e,key){
if(_51e!=null&&key!=null){
var _520="UserInterface.getBindingByKey ( \""+key+"\" )";
_51e=_51e.replace(/(\W|^)this(,| +|\)|;)/g,_520);
_51e=_51e.replace(/(\W|^)this(\.)/g,_520+".");
}
return _51e;
};
Binding.exists=function(_521){
var _522=false;
try{
if(_521&&_521.bindingElement&&_521.bindingElement.nodeType&&_521.isDisposed==false){
_522=true;
}
}
catch(accessDeniedException){
_522=false;
}
finally{
return _522;
}
};
Binding.destroy=function(_523){
if(!_523.isDisposed){
if(_523.acceptor!=null){
_523.acceptor.dispose();
}
if(_523.dragger!=null){
_523.disableDragging();
}
if(_523.boxObject!=null){
_523.boxObject.dispose();
}
if(_523._domEventHandlers!=null){
DOMEvents.cleanupEventListeners(_523);
}
for(var _524 in _523.shadowTree){
var _525=_523.shadowTree[_524];
if(_525 instanceof Binding&&Binding.exists(_525)){
_525.dispose(true);
}
_523.shadowTree[_524]=null;
}
_523.isDisposed=true;
_523=null;
}
};
Binding.dotnetify=function(_526,_527){
var _528=_526.getCallBackID();
if(_528!=null){
var _529=DOMUtil.createElementNS(Constants.NS_XHTML,"input",_526.bindingDocument);
_529.type="hidden";
_529.id=_528;
_529.name=_528;
_529.value=_527!=null?_527:"";
_526.bindingElement.appendChild(_529);
_526.shadowTree.dotnetinput=_529;
}else{
throw _526.toString()+": Missing callback ID";
}
};
Binding.imageProfile=function(_52a){
var _52b=_52a.getProperty("image");
var _52c=_52a.getProperty("image-hover");
var _52d=_52a.getProperty("image-active");
var _52e=_52a.getProperty("image-disabled");
if(_52a.imageProfile==null){
if(_52a.image==null&&_52b!=null){
_52a.image=_52b;
}
if(_52a.imageHover==null&&_52c!=null){
_52a.imageHover=_52b;
}
if(_52a.imageActive==null&&_52d!=null){
_52a.imageActive=_52d;
}
if(_52a.imageDisabled==null&&_52e!=null){
_52a.imageDisabled=_52e;
}
if(_52a.image||_52a.imageHover||_52a.imageActive||_52a.imageDisabled){
_52a.imageProfile=new ImageProfile(_52a);
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
var _530=this.dependentBindings[key];
_530.onMemberInitialize(this);
}
}
this.isInitialized=true;
};
Binding.prototype.onMemberInitialize=function(_531){
if(_531){
this.memberDependencies[_531.key]=true;
var _532=true;
for(var key in this.memberDependencies){
if(this.memberDependencies[key]==false){
_532=false;
break;
}
}
if(_532){
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
Binding.prototype.detachRecursive=function(_534){
if(_534==null){
_534=false;
}
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement,!_534);
};
Binding.prototype.addMember=function(_535){
if(!this.isAttached){
throw "Cannot add members to unattached binding";
}else{
if(!_535.isInitialized){
if(!this.memberDependencies){
this.memberDependencies={};
}
this.memberDependencies[_535.key]=false;
_535.registerDependentBinding(this);
}
}
return _535;
};
Binding.prototype.addMembers=function(_536){
while(_536.hasNext()){
var _537=_536.getNext();
if(!_537.isInitialized){
this.addMember(_537);
}
}
return _536;
};
Binding.prototype.registerDependentBinding=function(_538){
if(!this.dependentBindings){
this.dependentBindings={};
}
this.dependentBindings[_538.key]=_538;
};
Binding.prototype._initializeBindingPersistanceFeatures=function(){
var _539=this.getProperty("persist");
if(_539&&Persistance.isEnabled){
var id=this.bindingElement.id;
if(!KeyMaster.hasKey(id)){
this._persist={};
var _53b=new List(_539.split(" "));
while(_53b.hasNext()){
var prop=_53b.getNext();
var _53d=Persistance.getPersistedProperty(id,prop);
if(_53d!=null){
this._persist[prop]=_53d;
this.setProperty(prop,_53d);
}else{
_53d=this.getProperty(prop);
if(_53d!=null){
this._persist[prop]=_53d;
}
}
}
}else{
throw "Persistable bindings must have a specified ID.";
}
}
};
Binding.prototype._initializeBindingGeneralFeatures=function(){
var _53e=this.getProperty("disabled");
var _53f=this.getProperty("contextmenu");
var _540=this.getProperty("observes");
var _541=this.getProperty("onattach");
var _542=this.getProperty("hidden");
var _543=this.getProperty("blockactionevents");
if(_542==true&&this.isVisible==true){
this.hide();
}
if(_53e&&this.logger!=null){
this.logger.error("The 'disabled' property has been renamed 'isdisbaled'");
}
if(_53f){
this.setContextMenu(_53f);
}
if(_540){
this.observe(this.getBindingForArgument(_540));
}
if(_543==true){
this.isBlockingActions=true;
}
if(this.isActivationAware==true){
var root=UserInterface.getBinding(this.bindingDocument.body);
root.makeActivationAware(this);
this._hasActivationAwareness=true;
}
if(_541!=null){
Binding.evaluate(_541,this);
}
};
Binding.prototype._initializeBindingDragAndDropFeatures=function(){
var _545=this.getProperty("draggable");
var _546=this.getProperty("dragtype");
var _547=this.getProperty("dragaccept");
var _548=this.getProperty("dragreject");
if(_545!=null){
this.isDraggable=_545;
}
if(_546!=null){
this.dragType=_546;
if(_545!=false){
this.isDraggable=true;
}
}
if(_547!=null){
this.dragAccept=_547;
}
if(_548!=null){
this.dragReject=_548;
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
Binding.prototype._updateBindingMap=function(_549){
try{
if(this.bindingWindow!=null){
var id=this.bindingElement.id;
var map=this.bindingWindow.bindingMap;
var _54c=null;
if(_549){
_54c=map[id];
if(_54c!=null&&_54c!=this){
var cry=this.toString()+" duplicate binding ID: "+id;
this.logger.error(cry);
if(Application.isDeveloperMode){
throw (cry);
}
}else{
map[id]=this;
}
}else{
_54c=map[id];
if(_54c!=null&&_54c==this){
delete map[id];
}
}
}else{
var _54e=new String("Binding#_updateBindingMap odd dysfunction: "+this.toString()+": "+_549);
if(Application.isDeveloperMode==true){
alert(_54e);
}else{
this.logger.error(_54e);
}
}
}
catch(exception){
this.logger.error(exception);
}
};
Binding.prototype.handleEvent=function(e){
};
Binding.prototype.handleAction=function(_550){
};
Binding.prototype.handleBroadcast=function(_551,arg){
};
Binding.prototype.handleElement=function(_553){
return false;
};
Binding.prototype.updateElement=function(_554){
return false;
};
Binding.prototype.getBindingForArgument=function(arg){
var _556=null;
switch(typeof arg){
case "object":
_556=arg;
break;
case "string":
_556=this.bindingDocument.getElementById(arg);
if(_556==null){
_556=Binding.evaluate(arg,this);
}
break;
}
if(_556!=null&&_556.nodeType!=null){
_556=UserInterface.getBinding(_556);
}
return _556;
};
Binding.prototype.serialize=function(){
var _557={};
var id=this.bindingElement.id;
if(id&&id!=this.key){
_557.id=id;
}
var _559=this.getProperty("binding");
if(_559){
_557.binding=_559;
}
if(!BindingSerializer.includeShadowTreeBindings){
var _55a=this.getAncestorBindingByLocalName("*");
if(_55a){
if(_55a.isShadowBinding){
this.isShadowBinding=true;
_557=false;
}else{
var tree=_55a.shadowTree;
for(var key in tree){
var _55d=tree[key];
if(_55d==this){
this.isShadowBinding=true;
_557=false;
}
}
}
}
}
return _557;
};
Binding.prototype.serializeToString=function(_55e){
var _55f=null;
if(this.isAttached){
_55f=new BindingSerializer().serializeBinding(this,_55e);
}else{
throw "cannot serialize unattached binding";
}
return _55f;
};
Binding.prototype.subTreeFromString=function(_560){
this.detachRecursive();
this.bindingElement.innerHTML=_560;
this.attachRecursive();
};
Binding.prototype.getProperty=function(_561){
var _562=this.bindingElement.getAttribute(_561);
if(_562){
_562=Types.castFromString(_562);
}
return _562;
};
Binding.prototype.setProperty=function(prop,_564){
if(_564!=null){
_564=_564.toString();
if(String(this.bindingElement.getAttribute(prop))!=_564){
this.bindingElement.setAttribute(prop,_564);
if(this.isAttached==true){
if(Persistance.isEnabled&&_564!=null){
if(this._persist!=null&&this._persist[prop]){
this._persist[prop]=_564;
Persistance.setPersistedProperty(this.bindingElement.id,prop,_564);
}
}
var _565=this.propertyMethodMap[prop];
if(_565){
_565.call(this,this.getProperty(prop));
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
var _567=null;
if(Binding.exists(this)){
_567=this.bindingElement.id;
}else{
SystemDebug.stack(arguments);
}
return _567;
};
Binding.prototype.attachClassName=function(_568){
CSSUtil.attachClassName(this.bindingElement,_568);
};
Binding.prototype.detachClassName=function(_569){
CSSUtil.detachClassName(this.bindingElement,_569);
};
Binding.prototype.hasClassName=function(_56a){
return CSSUtil.hasClassName(this.bindingElement,_56a);
};
Binding.prototype.addActionListener=function(type,_56c){
_56c=_56c!=null?_56c:this;
if(Action.isValid(type)){
if(Interfaces.isImplemented(IActionListener,_56c)){
if(!this.actionListeners[type]){
this.actionListeners[type]=[];
}
this.actionListeners[type].push(_56c);
}else{
throw new Error("Could not add action-event listener. Method handleAction not implemented.");
}
}else{
alert(this+"\nCould not add undefined Action ("+_56c+")");
}
};
Binding.prototype.removeActionListener=function(type,_56e){
_56e=_56e?_56e:this;
if(Action.isValid(type)){
var _56f=this.actionListeners[type];
if(_56f){
var i=0,_571;
while((_571=_56f[i])!=null){
if(_571==_56e){
_56f.splice(i,1);
break;
}
i++;
}
}
}
};
Binding.prototype.addEventListener=function(type,_573){
_573=_573?_573:this;
DOMEvents.addEventListener(this.bindingElement,type,_573);
};
Binding.prototype.removeEventListener=function(type,_575){
_575=_575?_575:this;
DOMEvents.removeEventListener(this.bindingElement,type,_575);
};
Binding.prototype.subscribe=function(_576){
if(!this.hasSubscription(_576)){
this._subscriptions.set(_576,true);
EventBroadcaster.subscribe(_576,this);
}else{
this.logger.error("Dubplicate subscription aborted:"+_576);
}
};
Binding.prototype.unsubscribe=function(_577){
if(this.hasSubscription(_577)){
this._subscriptions.del(_577);
EventBroadcaster.unsubscribe(_577,this);
}
};
Binding.prototype.hasSubscription=function(_578){
return this._subscriptions.has(_578);
};
Binding.prototype.observe=function(_579,_57a){
_579.addObserver(this,_57a);
};
Binding.prototype.unObserve=function(_57b,_57c){
_57b.removeObserver(this,_57c);
};
Binding.prototype.setContextMenu=function(arg){
this.contextMenuBinding=this.getBindingForArgument(arg);
if(this.contextMenuBinding){
var self=this;
var menu=this.contextMenuBinding;
this.addEventListener(DOMEvents.CONTEXTMENU,{handleEvent:function(e){
if(Interfaces.isImplemented(IActionListener,self)==true){
var _581={handleAction:function(){
menu.removeActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.removeActionListener(PopupBinding.ACTION_HIDE,_581);
}};
menu.addActionListener(MenuItemBinding.ACTION_COMMAND,self);
menu.addActionListener(PopupBinding.ACTION_HIDE,_581);
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
var _583=null;
var _584=null;
var _585=false;
if(arg instanceof Action){
_583=arg;
}else{
if(Action.isValid(arg)){
_583=new Action(this,arg);
_585=true;
}
}
if(_583!=null&&Action.isValid(_583.type)==true){
if(_583.isConsumed==true){
_584=_583;
}else{
var _586=this.actionListeners[_583.type];
if(_586!=null){
_583.listener=this;
var i=0,_588;
while((_588=_586[i++])!=null){
if(_588&&_588.handleAction){
_588.handleAction(_583);
}
}
}
var _589=true;
if(this.isBlockingActions==true){
switch(_583.type){
case Binding.ACTION_FOCUSED:
case Binding.ACTION_BLURRED:
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FORCE_REFLEX:
case DockTabBinding.ACTION_UPDATE_VISUAL:
case PageBinding.ACTION_DOPOSTBACK:
break;
default:
if(!_585){
_589=false;
}
break;
}
}
if(_589){
_584=this.migrateAction(_583);
}else{
_584=_583;
}
}
}
return _584;
};
Binding.prototype.migrateAction=function(_58a){
var _58b=null;
var _58c=null;
var node=this.getMigrationParent();
if(node){
while(node&&!_58b&&node.nodeType!=Node.DOCUMENT_NODE){
_58b=UserInterface.getBinding(node);
node=node.parentNode;
}
if(_58b){
_58c=_58b.dispatchAction(_58a);
}else{
_58c=_58a;
}
}
return _58c;
};
Binding.prototype.reflex=function(_58e){
if(Application.isOperational==true){
FlexBoxBinding.reflex(this,_58e);
}
};
Binding.prototype.getMigrationParent=function(){
var _58f=null;
if(true){
try{
var _590=this.bindingElement.parentNode;
if(_590!=null){
_58f=_590;
}
}
catch(wtfException){
this.logger.error("Binding#getMigrationParent exception");
SystemDebug.stack(arguments);
_58f=null;
}
}
return _58f;
};
Binding.prototype.add=function(_591){
if(_591.bindingDocument==this.bindingDocument){
this.bindingElement.appendChild(_591.bindingElement);
}else{
throw "Could not add "+_591.toString()+" of different document origin.";
}
return _591;
};
Binding.prototype.addFirst=function(_592){
if(_592.bindingDocument==this.bindingDocument){
this.bindingElement.insertBefore(_592.bindingElement,this.bindingElement.firstChild);
}else{
throw "Could not add "+_592.toString()+" of different document origin.";
}
return _592;
};
Binding.prototype.getAncestorBindingByLocalName=function(_593,_594){
return BindingFinder.getAncestorBindingByLocalName(this,_593,_594);
};
Binding.prototype.getAncestorBindingByType=function(impl,_596){
return BindingFinder.getAncestorBindingByType(this,impl,_596);
};
Binding.prototype.getChildBindingByType=function(impl){
return BindingFinder.getChildBindingByType(this,impl);
};
Binding.prototype.getChildElementsByLocalName=function(_598){
return BindingFinder.getChildElementsByLocalName(this,_598);
};
Binding.prototype.getChildElementByLocalName=function(_599){
return this.getChildElementsByLocalName(_599).getFirst();
};
Binding.prototype.getDescendantElementsByLocalName=function(_59a){
return new List(DOMUtil.getElementsByTagName(this.bindingElement,_59a));
};
Binding.prototype.getChildBindingsByLocalName=function(_59b){
return this.getDescendantBindingsByLocalName(_59b,true);
};
Binding.prototype.getChildBindingByLocalName=function(_59c){
return this.getChildBindingsByLocalName(_59c).getFirst();
};
Binding.prototype.getDescendantBindingsByLocalName=function(_59d,_59e){
return BindingFinder.getDescendantBindingsByLocalName(this,_59d,_59e);
};
Binding.prototype.getDescendantBindingByLocalName=function(_59f){
return this.getDescendantBindingsByLocalName(_59f,false).getFirst();
};
Binding.prototype.getDescendantBindingsByType=function(impl){
return BindingFinder.getDescendantBindingsByType(this,impl);
};
Binding.prototype.getDescendantBindingByType=function(impl){
return BindingFinder.getDescendantBindingByType(this,impl);
};
Binding.prototype.getNextBindingByLocalName=function(_5a2){
return BindingFinder.getNextBindingByLocalName(this,_5a2);
};
Binding.prototype.getPreviousBindingByLocalName=function(_5a3){
return BindingFinder.getPreviousBindingByLocalName(this,_5a3);
};
Binding.prototype.getBindingElement=function(){
return this.bindingDocument.getElementById(this.bindingElement.id);
};
Binding.prototype.getOrdinalPosition=function(_5a4){
return DOMUtil.getOrdinalPosition(this.bindingElement,_5a4);
};
Binding.prototype.isFirstBinding=function(_5a5){
return (this.getOrdinalPosition(_5a5)==0);
};
Binding.prototype.isLastBinding=function(_5a6){
return DOMUtil.isLastElement(this.bindingElement,_5a6);
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
Binding.prototype.setCallBackArg=function(_5a8){
this.setProperty(Binding.CALLBACKARG,_5a8);
};
Binding.prototype.dispose=function(_5a9){
if(!this.isDisposed){
if(!_5a9){
this.bindingWindow.DocumentManager.detachBindings(this.bindingElement);
var _5aa=this.bindingDocument.getElementById(this.bindingElement.id);
if(_5aa){
if(Client.isExplorer){
_5aa.outerHTML="";
}else{
_5aa.parentNode.removeChild(_5aa);
}
}
}else{
if(this._subscriptions.hasEntries()){
var self=this;
var list=new List();
this._subscriptions.each(function(_5ad){
list.add(_5ad);
});
list.each(function(_5ae){
self.unsubscribe(_5ae);
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
Binding.prototype.wakeUp=function(_5b0,_5b1){
_5b1=_5b1?_5b1:Binding.SNOOZE;
if(this.isLazy==true){
this.deleteProperty("lazy");
this.isLazy=false;
Application.lock(this);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
var self=this;
setTimeout(function(){
self.attachRecursive();
setTimeout(function(){
if(_5b0!==undefined){
self[_5b0]();
}
LazyBindingBinding.wakeUp(self);
Application.unlock(self);
},_5b1);
},0);
}
};
Binding.prototype.handleCrawler=function(_5b3){
if(_5b3.response==null&&this.isLazy==true){
if(_5b3.id==DocumentCrawler.ID&&_5b3.mode==DocumentCrawler.MODE_REGISTER){
_5b3.response=NodeCrawler.NORMAL;
}else{
_5b3.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5b3.response==null&&this.crawlerFilters!=null){
if(this.crawlerFilters.has(_5b3.id)){
_5b3.response=NodeCrawler.SKIP_CHILDREN;
}
}
if(_5b3.response==null){
switch(_5b3.id){
case FlexBoxCrawler.ID:
case FocusCrawler.ID:
if(!this.isVisible){
_5b3.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
}
};
Binding.newInstance=function(_5b4){
var _5b5=DOMUtil.createElementNS(Constants.NS_UI,"ui:binding",_5b4);
return UserInterface.registerBinding(_5b5,Binding);
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
var _5b6=new List(ConfigurationService.GetValidatingRegularExpressions("dummy"));
_5b6.each(function(_5b7){
DataBinding.expressions[_5b7.Key]=new RegExp(_5b7.Value);
});
}});
DataBinding.expressions={};
DataBinding.warnings={"required":"Required","number":"Numbers only","integer":"Integers only","programmingidentifier":"Invalid identifier","programmingnamespace":"Invalid namespace","url":"Invalid URL","minlength":"${count} characters minimum","maxlength":"${count} characters maximum","currency":"Invalid notation","email":"Invalid e-mail","guid":"Invalid GUID"};
DataBinding.errors={"programmingidentifier":"An identifier must not contain spaces or special characters. Only characters a-z, A-Z and 0-9 are allowed. An identifier must begin with a letter (not a number).","programmingnamespace":"A namespace must take the form Example.Name.Space where only characters a-z, A-Z, 0-9 and dots (.) are allowed. Each part of the namespace must begin with a letter (not a number).","url":"A valid URL must begin with a forward slash, designating the site root, or an URL scheme name such as http://. Simpliefied addresses such as www.example.com cannot be resolved reliably by the browser. Relative URLs are not supported."};
DataBinding.getAssociatedLabel=function(_5b8){
var _5b9=null;
var _5ba=_5b8.getAncestorBindingByLocalName("field");
if(_5ba&&_5ba instanceof FieldBinding){
var desc=_5ba.getDescendantBindingByLocalName("fielddesc");
if(desc&&desc instanceof FieldDescBinding){
_5b9=desc.getLabel();
}
}
return _5b9;
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
var _5bd=this.bindingWindow.DataManager;
_5bd.unRegisterDataBinding(this._name);
};
DataBinding.prototype.setName=function(name){
var _5bf=this.bindingWindow.DataManager;
if(_5bf.getDataBinding(name)){
_5bf.unRegisterDataBinding(name);
}
_5bf.registerDataBinding(name,this);
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
RootBinding.prototype.handleBroadcast=function(_5c0,arg){
RootBinding.superclass.handleBroadcast.call(this,_5c0,arg);
var _5c2=this.bindingWindow.WindowManager.WINDOW_EVALUATED_BROADCAST;
switch(_5c0){
case _5c2:
this.dispatchAction(RootBinding.ACTION_PHASE_1);
this.dispatchAction(RootBinding.ACTION_PHASE_2);
this.dispatchAction(RootBinding.ACTION_PHASE_3);
this.unsubscribe(_5c2);
break;
}
};
RootBinding.prototype.onActivate=function(){
this._onActivationChanged(true);
};
RootBinding.prototype.onDeactivate=function(){
this._onActivationChanged(false);
};
RootBinding.prototype._onActivationChanged=function(_5c3){
var _5c4=_5c3?RootBinding.ACTION_ACTIVATED:RootBinding.ACTION_DEACTIVATED;
if(_5c3!=this.isActivated){
this.isActivated=_5c3;
this.dispatchAction(_5c4);
var _5c5=new List();
var self=this;
this._activationawares.each(function(_5c7){
if(_5c7.isActivationAware){
try{
if(_5c3){
if(!_5c7.isActivated){
_5c7.onActivate();
}
}else{
if(_5c7.isActivated){
_5c7.onDeactivate();
}
}
}
catch(exception){
self.logger.error(exception);
_5c5.add(_5c7);
}
}
});
_5c5.each(function(_5c8){
this._activationawares.del(_5c8);
});
_5c5.dispose();
}else{
var _5c9="Activation dysfunction: "+this.bindingDocument.title;
if(Application.isDeveloperMode==true){
this.logger.error(_5c9);
}else{
this.logger.error(_5c9);
}
}
};
RootBinding.prototype.makeActivationAware=function(_5ca,_5cb){
if(Interfaces.isImplemented(IActivationAware,_5ca,true)==true){
if(_5cb==false){
this._activationawares.del(_5ca);
}else{
this._activationawares.add(_5ca);
if(this.isActivated==true){
_5ca.onActivate();
}
}
}else{
if(Application.isDeveloperMode==true){
alert("RootBinding: IActivationAware not implemented ("+_5ca+")");
}
}
};
RootBinding.prototype._setupActivationAwareness=function(_5cc){
var _5cd=this.getMigrationParent();
if(_5cd!=null){
var root=_5cd.ownerDocument.body;
var _5cf=UserInterface.getBinding(root);
if(_5cf!=null){
_5cf.makeActivationAware(this,_5cc);
}
}
};
RootBinding.prototype.handleCrawler=function(_5d0){
RootBinding.superclass.handleCrawler.call(this,_5d0);
if(_5d0.type==NodeCrawler.TYPE_ASCENDING){
_5d0.nextNode=this.bindingWindow.frameElement;
}
};
RootBinding.prototype.getMigrationParent=function(){
var _5d1=null;
if(this.bindingWindow.parent){
_5d1=this.bindingWindow.frameElement;
}
return _5d1;
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
var _5d2=new List(DOMUtil.getElementsByTagName(this.bindingElement,"td"));
while(_5d2.hasNext()){
var cell=_5d2.getNext();
this.shadowTree[cell.className]=cell;
}
};
MatrixBinding.prototype.add=function(_5d4){
var _5d5=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
this.shadowTree[MatrixBinding.CENTER].appendChild(_5d4.bindingElement);
_5d5=_5d4;
}else{
_5d5=MatrixBinding.superclass.add.call(this,_5d4);
}
return _5d5;
};
MatrixBinding.prototype.addFirst=function(_5d6){
var _5d7=null;
if(this.hasMatrix){
if(!this._isTableIndexed){
this._indexTable();
}
var _5d8=this.shadowTree[MatrixBinding.CENTER];
_5d8.insertBefore(_5d6.bindingElement,_5d8.firstChild);
_5d7=_5d6;
}else{
_5d7=MatrixBinding.superclass.addFirst.call(this,_5d6);
}
return _5d6;
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
MatrixBinding.newInstance=function(_5da){
var _5db=DOMUtil.createElementNS(Constants.NS_UI,"ui:matrix",_5da);
return UserInterface.registerBinding(_5db,MatrixBinding);
};
FlexBoxBinding.prototype=new Binding;
FlexBoxBinding.prototype.constructor=FlexBoxBinding;
FlexBoxBinding.superclass=Binding.prototype;
FlexBoxBinding.CLASSNAME="flexboxelement";
FlexBoxBinding.TIMEOUT=250;
FlexBoxBinding.reflex=function(_5dc,_5dd){
var list=new List();
var _5df=new FlexBoxCrawler();
_5df.mode=_5dd?FlexBoxCrawler.MODE_FORCE:FlexBoxCrawler.MODE_NORMAL;
_5df.startBinding=_5dc;
_5df.crawl(_5dc.bindingElement,list);
list.each(function(_5e0){
_5e0.flex();
});
if(Client.isExplorer){
setTimeout(function(){
list.each(function(_5e1){
if(Binding.exists(_5e1)){
_5e1.flex();
}
});
},0.5*FlexBoxBinding.TIMEOUT);
}
setTimeout(function(){
list.each(function(_5e2){
if(Binding.exists(_5e2)){
_5e2.isFlexSuspended=false;
}
});
list.dispose();
},FlexBoxBinding.TIMEOUT);
_5df.dispose();
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
FlexBoxBinding.prototype.handleAction=function(_5e3){
FlexBoxBinding.superclass.handleAction.call(this,_5e3);
switch(_5e3.type){
case Binding.ACTION_UPDATED:
this.isFit=false;
break;
}
};
FlexBoxBinding.prototype._getSiblingsSpan=function(_5e4){
var _5e5=0;
var _5e6=new List(this.bindingElement.parentNode.childNodes);
while(_5e6.hasNext()){
var _5e7=_5e6.getNext();
if(_5e7.nodeType==Node.ELEMENT_NODE&&_5e7!=this.bindingElement){
if(!this._isOutOfFlow(_5e7)){
var rect=_5e7.getBoundingClientRect();
if(_5e4){
height+=(rect.right-rect.left);
}else{
_5e5+=(rect.bottom-rect.top);
}
}
}
}
return _5e5;
};
FlexBoxBinding.prototype._isOutOfFlow=function(_5e9){
var _5ea=CSSComputer.getPosition(_5e9);
var _5eb=CSSComputer.getFloat(_5e9);
return (_5ea=="absolute"||_5eb!="none"?true:false);
};
FlexBoxBinding.prototype._getCalculatedHeight=function(){
var _5ec=this.bindingElement.parentNode;
var rect=_5ec.getBoundingClientRect();
var _5ee=rect.bottom-rect.top;
var _5ef=CSSComputer.getPadding(_5ec);
var _5f0=CSSComputer.getBorder(_5ec);
_5ee-=(_5ef.top+_5ef.bottom);
_5ee-=(_5f0.top+_5f0.bottom);
return _5ee;
};
FlexBoxBinding.prototype._getCalculatedWidth=function(){
var _5f1=this.bindingElement.parentNode;
var rect=_5f1.getBoundingClientRect();
var _5f3=rect.right-rect.left;
var _5f4=CSSComputer.getPadding(_5f1);
var _5f5=CSSComputer.getBorder(_5f1);
_5f3-=(_5f4.left+_5f4.right);
_5f3-=(_5f5.left+_5f5.right);
return _5f3;
};
FlexBoxBinding.prototype.setFlexibility=function(_5f6){
if(_5f6!=this.isFlexible){
if(_5f6){
this.attachClassName(FlexBoxBinding.CLASSNAME);
this.deleteProperty("flex");
}else{
this.detachClassName(FlexBoxBinding.CLASSNAME);
this.setProperty("flex",false);
}
this.isFlexible=_5f6;
}
};
FlexBoxBinding.prototype.flex=function(){
if(Binding.exists(this)){
if(this.isFlexible==true){
var _5f7=this._getSiblingsSpan();
_5f7=this._getCalculatedHeight()-_5f7;
if(!isNaN(_5f7)&&_5f7>=0){
if(_5f7!=this.bindingElement.offsetHeight){
this.bindingElement.style.height=String(_5f7)+"px";
}
}
}
}
};
FlexBoxBinding.prototype.fit=function(_5f8){
if(!this.isFit||_5f8){
var _5f9=0;
new List(this.bindingElement.childNodes).each(function(_5fa){
if(_5fa.nodeType==Node.ELEMENT_NODE){
if(!this._isOutOfFlow(_5fa)){
var rect=_5fa.getBoundingClientRect();
_5f9+=(rect.bottom-rect.top);
}
}
},this);
this._setFitnessHeight(_5f9);
this.isFit=true;
}
};
FlexBoxBinding.prototype._setFitnessHeight=function(_5fc){
var _5fd=CSSComputer.getPadding(this.bindingElement);
var _5fe=CSSComputer.getBorder(this.bindingElement);
_5fc+=_5fd.top+_5fd.bottom;
_5fc+=_5fe.top+_5fe.bottom;
this.bindingElement.style.height=_5fc+"px";
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
ScrollBoxBinding.prototype.handleAction=function(_5ff){
ScrollBoxBinding.superclass.handleAction.call(this,_5ff);
switch(_5ff.type){
case BalloonBinding.ACTION_INITIALIZE:
_5ff.consume();
break;
}
};
ScrollBoxBinding.prototype.setPosition=function(_600){
this.bindingElement.scrollLeft=_600.x;
this.bindingElement.scrollTop=_600.y;
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
var _601=this._getBuildElement("labeltext");
if(_601){
this.shadowTree.labelText=_601;
this.shadowTree.text=_601.firstChild;
this.hasLabel=true;
}
}else{
var _602=this.getProperty("label");
var _603=this.getProperty("image");
var _604=this.getProperty("tooltip");
if(_602){
this.setLabel(_602,false);
}
if(_603){
this.setImage(_603,false);
}
if(_604){
this.setToolTip(_604);
}
this.buildClassName();
}
};
LabelBinding.prototype.setLabel=function(_605,_606){
_605=_605?_605:"";
if(!this.hasLabel){
this.buildLabel();
}
this.shadowTree.text.data=Resolver.resolve(_605);
this.setProperty("label",_605);
if(!_606){
this.buildClassName();
}
};
LabelBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
LabelBinding.prototype.setImage=function(url,_608){
if(url!=false){
url=url?url:LabelBinding.DEFAULT_IMAGE;
this.setAlphaTransparentBackdrop(Resolver.resolve(url));
this.setProperty("image",url);
this.hasImage=true;
if(!_608){
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
LabelBinding.prototype.setToolTip=function(_60b){
this.setProperty("tooltip",_60b);
if(_60b!=this.getLabel()){
this.setProperty("title",Resolver.resolve(_60b));
}
};
LabelBinding.prototype.getToolTip=function(_60c){
return this.getProperty("tooltip");
};
LabelBinding.prototype.flip=function(_60d){
_60d=_60d==null?true:_60d;
var _60e=LabelBinding.CLASSNAME_FLIPPED;
if(!Client.isExplorer6){
this.isFlipped=_60d;
if(_60d){
this.attachClassName(_60e);
}else{
this.detachClassName(_60e);
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
var _60f="textonly";
var _610="imageonly";
var _611="both";
if(this.hasLabel&&this.hasImage){
this.detachClassName(_60f);
this.detachClassName(_610);
this.attachClassName(_611);
}else{
if(this.hasLabel){
this.detachClassName(_611);
this.detachClassName(_610);
this.attachClassName(_60f);
}else{
if(this.hasImage){
this.detachClassName(_611);
this.detachClassName(_60f);
this.attachClassName(_610);
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
LabelBinding.newInstance=function(_612){
var _613=DOMUtil.createElementNS(Constants.NS_UI,"ui:labelbox",_612);
return UserInterface.registerBinding(_613,LabelBinding);
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
var _614=this.getProperty("label");
if(!_614){
_614=DOMUtil.getTextContent(this.bindingElement);
}
var text=this.bindingDocument.createTextNode(Resolver.resolve(_614));
this.bindingElement.parentNode.replaceChild(text,this.bindingElement);
this.dispose();
};
TextBinding.prototype.setLabel=function(_616){
this.setProperty("label",_616);
};
TextBinding.newInstance=function(_617){
var _618=DOMUtil.createElementNS(Constants.NS_UI,"ui:text",_617);
return UserInterface.registerBinding(_618,TextBinding);
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
BroadcasterBinding.prototype.setProperty=function(_619,_61a){
BroadcasterBinding.superclass.setProperty.call(this,_619,_61a);
function update(list){
if(list){
list.each(function(_61c){
_61c.setProperty(_619,_61a);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _61d=this._observers[_619];
if(_61d){
update(_61d);
}
};
BroadcasterBinding.prototype.deleteProperty=function(_61e){
BroadcasterBinding.superclass.deleteProperty.call(this,_61e);
function update(list){
if(list){
list.each(function(_620){
_620.deleteProperty(_61e);
});
}
}
if(this._observers["*"]!=null){
update(this._observers["*"]);
}
var _621=this._observers[_61e];
if(_621){
update(_621);
}
};
BroadcasterBinding.prototype.addObserver=function(_622,_623){
_623=_623?_623:"*";
_623=new List(_623.split(" "));
while(_623.hasNext()){
var _624=_623.getNext();
switch(_624){
case "*":
this._setAllProperties(_622);
break;
default:
var _625=this.getProperty(_624);
_622.setProperty(_624,_625);
break;
}
if(!this._observers[_624]){
this._observers[_624]=new List();
}
this._observers[_624].add(_622);
}
};
BroadcasterBinding.prototype._setAllProperties=function(_626){
var atts=new List(this.bindingElement.attributes);
while(atts.hasNext()){
var att=atts.getNext();
if(att.specified){
var _629=att.nodeName;
switch(_629){
case "id":
case "key":
break;
default:
var _62a=this.getProperty(_629);
_626.setProperty(_629,_62a);
break;
}
}
}
};
BroadcasterBinding.prototype.removeObserver=function(_62b,_62c){
_62c=_62c?_62c:"*";
_62c=new List(_62c.split(" "));
while(_62c.hasNext()){
var list=this._observers[_62c.getNext()];
if(list){
while(list.hasNext()){
var _62e=list.getNext();
if(_62e==_62b){
list.del(_62e);
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
BroadcasterBinding.prototype.setDisabled=function(_62f){
this.setProperty("isdisabled",_62f);
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
var _631=this.getProperty("width");
var _632=this.getProperty("label");
var type=this.getProperty("type");
var _634=this.getProperty("popup");
var _635=this.getProperty("tooltip");
var _636=this.getProperty("isdisabled");
var _637=this.getProperty("response");
var _638=this.getProperty("oncommand");
var _639=this.getProperty("value");
var _63a=this.getProperty("ischecked");
var _63b=this.getProperty("callbackid");
var _63c=this.getProperty("focusable");
var _63d=this.getProperty("focused");
var _63e=this.getProperty("default");
var url=this.getProperty("url");
var _640=this.getProperty("flip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.add(this.labelBinding);
this.labelBinding.attach();
this.shadowTree.labelBinding=this.labelBinding;
if(_640){
this.flip(true);
}
if(!this._stateManager){
this._stateManager=new ButtonStateManager(this);
}
if(this.imageProfile!=null&&this.imageProfile.getDefaultImage()!=null){
this.setImage(this.imageProfile.getDefaultImage());
}
if(_632!=null){
this.setLabel(_632);
}
if(type!=null){
this.setType(type);
}
if(_635!=null){
this.setToolTip(_635);
}
if(_631!=null){
this.setWidth(_631);
}
if(_634!=null){
this.setPopup(_634);
}
if(_637!=null){
this.response=_637;
}
if(_63a==true){
if(this.isCheckButton||this.isRadioButton){
this.check(true);
}
}
if(_638!=null&&this.oncommand==null){
this.oncommand=function(){
Binding.evaluate(_638,this);
};
}
if(_63c||this.isFocusable){
this._makeFocusable();
if(_63e||this.isDefault){
this.isDefault=true;
}
if(_63d){
this.focus();
}
}
if(_636==true){
this.disable();
}
if(url!=null){
this.setURL(url);
}
if(_63b!=null){
this.bindingWindow.DataManager.registerDataBinding(_63b,this);
if(_639!=null){
Binding.dotnetify(this,_639);
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
ButtonBinding.prototype.setImage=function(_641){
if(this.isAttached){
this.labelBinding.setImage(_641);
}
this.setProperty("image",_641);
};
ButtonBinding.prototype.getImage=function(){
return this.getProperty("image");
};
ButtonBinding.prototype.setLabel=function(_642){
if(this.isAttached){
this.labelBinding.setLabel(_642);
}
this.setProperty("label",_642);
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
ButtonBinding.prototype.setToolTip=function(_644){
this.setProperty("tooltip",_644);
if(this.isAttached==true){
this.setProperty("title",Resolver.resolve(_644));
}
};
ButtonBinding.prototype.getToolTip=function(){
return this.getProperty("tooltip");
};
ButtonBinding.prototype.setImageProfile=function(_645){
this.imageProfile=new _645(this);
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
ButtonBinding.prototype.flip=function(_64a){
_64a=_64a==null?true:_64a;
this.isFlipped=_64a;
this.setProperty("flip",_64a);
if(this.isAttached){
this.labelBinding.flip(_64a);
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
ButtonBinding.prototype.check=function(_64b){
if((this.isCheckButton||this.isRadioButton)&&!this.isChecked){
if(this.isAttached==true){
this._check();
if(!_64b==true){
this.fireCommand();
}
}
this.setProperty("ischecked",true);
}
};
ButtonBinding.prototype._check=function(_64c){
this.isActive=true;
this.isChecked=true;
if(!_64c){
this._stateManager.invokeActiveState();
}
};
ButtonBinding.prototype.uncheck=function(_64d){
if((this.isCheckButton||this.isRadioButton)&&this.isChecked){
if(this.isAttached==true){
this._uncheck();
if(!_64d==true){
this.fireCommand();
}
}
this.setProperty("ischecked",false);
}
};
ButtonBinding.prototype._uncheck=function(_64e){
this.isActive=false;
this.isChecked=false;
if(!_64e){
this._stateManager.invokeNormalState();
}
};
ButtonBinding.prototype.setChecked=function(_64f,_650){
if(_64f==null){
_64f==false;
}
if(this.isCheckButton||this.isRadioButton){
switch(_64f){
case true:
this.check(_650);
break;
case false:
this.uncheck(_650);
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
var _652=this.getProperty("tooltip");
if(_652){
this.setToolTip(_652);
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
var _653=null;
if(this.isAttached==true){
this.labelBinding.bindingElement.style.marginLeft="0";
this.labelBinding.bindingElement.style.marginRight="0";
_653=this.labelBinding.bindingElement.offsetWidth;
}else{
throw "ButtonBinding: getEqualSizeWidth failed for non-attached button.";
}
return _653;
};
ButtonBinding.prototype.setEqualSizeWidth=function(goal){
if(this.isAttached==true){
var _655=this.getEqualSizeWidth();
if(goal>_655){
var diff=goal-_655;
var marg=Math.floor(diff*0.5);
this.labelBinding.bindingElement.style.marginLeft=marg+"px";
this.labelBinding.bindingElement.style.marginRight=marg+"px";
}
}
};
ButtonBinding.prototype.getWidth=function(){
var _658=null;
if(this.isAttached==true){
var _659=CSSComputer.getPadding(this.bindingElement);
var _65a=CSSComputer.getPadding(this.bindingElement);
_658=this.shadowTree.c.offsetWidth+this.shadowTree.e.offsetWidth+this.shadowTree.w.offsetWidth;
_658=_658+_659.left+_659.right;
_658=_658+_65a.left+_65a.right;
}else{
throw "ButtonBinding: getWidth failed for non-attached button.";
}
return _658;
};
ButtonBinding.prototype.setWidth=function(_65b){
if(this.isAttached==true){
var _65c=this.shadowTree.e.offsetWidth+this.shadowTree.w.offsetWidth;
var _65d=CSSComputer.getPadding(this.shadowTree.c);
var _65e=_65b-_65c;
_65e=_65e-_65d.left-_65d.right;
this.shadowTree.c.style.width=String(_65e)+"px";
if(this.getProperty("centered")){
this.labelBinding.bindingElement.style.marginLeft=String(0.5*(_65e-this.labelBinding.bindingElement.offsetWidth))+"px";
}
}
this.setProperty("width",_65b);
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
ButtonBinding.prototype.setValue=function(_65f){
this.shadowTree.dotnetinput.value=_65f;
};
ButtonBinding.prototype.getResult=function(){
return this.getValue();
};
ButtonBinding.prototype.setResult=function(_660){
this.setValue(_660);
};
ButtonStateManager.STATE_NORMAL=0;
ButtonStateManager.STATE_HOVER=1;
ButtonStateManager.STATE_ACTIVE=2;
ButtonStateManager.RIGHT_BUTTON=2;
function ButtonStateManager(_661){
this.logger=SystemLogger.getLogger("ButtonStateManager");
this.binding=_661;
this.imageProfile=_661.imageProfile;
this.assignDOMEvents(true);
}
ButtonStateManager.prototype.assignDOMEvents=function(_662){
var _663=_662?"addEventListener":"removeEventListener";
this.binding[_663](DOMEvents.MOUSEENTER,this);
this.binding[_663](DOMEvents.MOUSELEAVE,this);
this.binding[_663](DOMEvents.MOUSEDOWN,this);
this.binding[_663](DOMEvents.MOUSEUP,this);
};
ButtonStateManager.prototype.dispose=function(){
this.assignDOMEvents(false);
this.binding=null;
this.imageProfile=null;
};
ButtonStateManager.prototype.handleEvent=function(e){
if(Binding.exists(this.binding)&&!this.binding.isDisabled&&!BindingDragger.isDragging){
var _665=false,_666=null;
if(e.button==ButtonStateManager.RIGHT_BUTTON){
}else{
if(this.binding.isCheckBox){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_666=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_666=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_666=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSEUP:
this.binding.isChecked=!this.binding.isChecked;
_666=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_666==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_665=true;
break;
}
}else{
if(this.binding.isCheckButton||this.binding.isRadioButton){
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
if(!this.binding.isChecked){
_666=ButtonStateManager.STATE_HOVER;
}
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
if(!this.binding.isChecked){
_666=ButtonStateManager.STATE_NORMAL;
}
break;
case DOMEvents.MOUSEDOWN:
_666=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
if(this.binding.isCheckButton||!this.binding.isChecked){
this.binding.isChecked=!this.binding.isChecked;
_666=this.binding.isChecked?ButtonStateManager.STATE_ACTIVE:ButtonStateManager.STATE_NORMAL;
if(_666==ButtonStateManager.STATE_ACTIVE){
this.binding._check(true);
}else{
this.binding._uncheck(true);
}
_665=true;
}
break;
}
}else{
switch(e.type){
case DOMEvents.MOUSEENTER:
case DOMEvents.MOUSEOVER:
_666=ButtonStateManager.STATE_HOVER;
break;
case DOMEvents.MOUSELEAVE:
case DOMEvents.MOUSEOUT:
_666=ButtonStateManager.STATE_NORMAL;
break;
case DOMEvents.MOUSEDOWN:
_666=ButtonStateManager.STATE_ACTIVE;
break;
case DOMEvents.MOUSEUP:
_666=ButtonStateManager.STATE_NORMAL;
_665=true;
break;
}
}
}
}
switch(_666){
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
if(_665){
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
var _66a=this.imageProfile.getDisabledImage();
if(_66a){
this.binding.setImage(_66a);
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
ClickButtonBinding.newInstance=function(_66b){
var _66c=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_66b);
return UserInterface.registerBinding(_66c,ClickButtonBinding);
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
RadioButtonBinding.newInstance=function(_66d){
var _66e=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiobutton",_66d);
return UserInterface.registerBinding(_66e,RadioButtonBinding);
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
CheckButtonBinding.newInstance=function(_66f){
var _670=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbutton",_66f);
return UserInterface.registerBinding(_670,CheckButtonBinding);
};
CheckButtonImageProfile.IMG_DEFAULT="${skin}/buttons/checkbutton-default.png";
CheckButtonImageProfile.IMG_HOVER="${skin}/buttons/checkbutton-hover.png";
CheckButtonImageProfile.IMG_ACTIVE="${skin}/buttons/checkbutton-active.png";
CheckButtonImageProfile.IMG_ACTIVE_HOVER="${skin}/buttons/checkbutton-active-hover.png";
CheckButtonImageProfile.IMG_DISABLED=null;
CheckButtonImageProfile.IMG_DISABLED_ON=null;
function CheckButtonImageProfile(_671){
this._binding=_671;
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
var _672=this.getDescendantBindingsByLocalName("control");
_672.each(function(_673){
_673.setControlType(_673.controlType);
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
ControlGroupBinding.newInstance=function(_675){
var _676=DOMUtil.createElementNS(Constants.NS_UI,"ui:controlgroup",_675);
return UserInterface.registerBinding(_676,ControlGroupBinding);
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
ControlBinding.prototype.handleAction=function(_679){
ControlBinding.superclass.handleAction.call(this,_679);
switch(_679.type){
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
function ControlImageProfile(_67a){
this.binding=_67a;
}
ControlImageProfile.prototype._getImage=function(_67b){
var _67c=null;
switch(this.binding.controlType){
case ControlBinding.TYPE_MINIMIZE:
_67c=this.constructor.IMAGE_MINIMIZE;
break;
case ControlBinding.TYPE_MAXIMIZE:
_67c=this.constructor.IMAGE_MAXIMIZE;
break;
case ControlBinding.TYPE_UNMAXIMIZE:
case ControlBinding.TYPE_UNMINIMIZE:
_67c=this.constructor.IMAGE_RESTORE;
break;
case ControlBinding.TYPE_CLOSE:
_67c=this.constructor.IMAGE_CLOSE;
break;
}
return _67c.replace("${string}",_67b);
};
ControlImageProfile.prototype.getDefaultImage=function(){
var _67d=true;
if(this.binding.isGhostable&&this.binding.containingControlBoxBinding){
_67d=this.binding.containingControlBoxBinding.isActive?true:false;
}
return _67d?this._getImage("default"):this._getImage("ghosted");
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
ControlBoxBinding.prototype.handleAction=function(_67e){
ControlBoxBinding.superclass.handleAction.call(this,_67e);
switch(_67e.type){
case ControlBinding.ACTION_COMMAND:
var _67f=_67e.target;
Application.lock(this);
var self=this;
setTimeout(function(){
self.handleInvokedControl(_67f);
Application.unlock(self);
},0);
_67e.consume();
break;
}
};
ControlBoxBinding.prototype.handleInvokedControl=function(_681){
switch(_681.controlType){
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
ControlBoxBinding.prototype.setState=function(_682){
var _683=this.getState();
this.setProperty("state",_682);
this.detachClassName(_683);
this.attachClassName(_682);
this.dispatchAction(ControlBoxBinding.ACTION_STATECHANGE);
};
ControlBoxBinding.prototype.getState=function(){
var _684=this.getProperty("state");
if(!_684){
_684=ControlBoxBinding.STATE_NORMAL;
}
return _684;
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
MenuContainerBinding.prototype.isOpen=function(_685){
var _686=null;
if(!_685){
_686=this._isOpen;
}else{
_686=(_685==this._openElement);
}
return _686;
};
MenuContainerBinding.prototype.setOpenElement=function(_687){
if(_687){
if(this._openElement){
this._openElement.hide();
}
this._openElement=_687;
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
var _688=this.getChildBindingByLocalName("menupopup");
if(_688&&_688!=this.menuPopupBinding){
this.menuPopupBinding=_688;
this.menuPopupBinding.addActionListener(PopupBinding.ACTION_HIDE,this);
}
return this.menuPopupBinding;
};
MenuContainerBinding.prototype.show=function(){
var _689=this.getMenuContainerBinding();
_689.setOpenElement(this);
var _68a=this.getMenuPopupBinding();
_68a.snapTo(this.bindingElement);
_68a.show();
};
MenuContainerBinding.prototype.hide=function(){
this.reset();
this.getMenuPopupBinding().hide();
if(this._isOpen){
this._openElement.hide();
}
};
MenuContainerBinding.prototype.reset=Binding.ABSTRACT_METHOD;
MenuContainerBinding.prototype.handleAction=function(_68b){
MenuContainerBinding.superclass.handleAction.call(this,_68b);
if(_68b.type==PopupBinding.ACTION_HIDE){
var _68c=this.getMenuContainerBinding();
_68c.setOpenElement(false);
this.reset();
_68b.consume();
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
MenuBarBinding.prototype.handleAction=function(_68d){
MenuBarBinding.superclass.handleAction.call(this,_68d);
switch(_68d.type){
case MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY:
var _68e=_68d.target;
var _68f=this.getChildBindingsByLocalName("menu");
while(_68f.hasNext()){
var menu=_68f.getNext();
}
switch(_68e.arrowKey){
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
var _691=this.getProperty("image");
var _692=this.getProperty("label");
var _693=this.getProperty("tooltip");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menulabel");
this.add(this.labelBinding);
if(_692){
this.setLabel(_692);
}
if(_691){
this.setImage(_691);
}
if(_693){
this.setToolTip(_693);
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
MenuBinding.prototype.setLabel=function(_695){
this.setProperty("label",_695);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_695));
}
};
MenuBinding.prototype.setToolTip=function(_696){
this.setProperty("tooltip",_696);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_696));
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
var _698=this.getMenuContainerBinding();
if(!BindingDragger.isDragging){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(_698.isOpen(this)){
DOMEvents.stopPropagation(e);
}
break;
case DOMEvents.MOUSEOVER:
if(_698.isOpen()&&!_698.isOpen(this)){
this.show();
this.menuPopupBinding.grabKeyboard();
}
this.attachClassName("hover");
this.isFocused=true;
break;
case DOMEvents.MOUSEOUT:
if(!_698.isOpen()){
this.hide();
}
this.isFocused=false;
break;
case DOMEvents.MOUSEUP:
if(!_698.isOpen(this)){
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
MenuBodyBinding.handleBroadcast=function(_699,arg){
var body=MenuBodyBinding.activeInstance;
var key=arg;
if(body){
switch(_699){
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
this.addActionListener(MenuBodyBinding.ACTION_UNHANDLED_LEFTRIGHTKEY,{handleAction:function(_69e){
switch(_69e.target){
case self:
self.releaseKeyboard();
self._containingPopupBinding.hide();
break;
default:
var _69f=null;
var _6a0=true;
self._lastFocused.focus();
self.grabKeyboard();
_69e.consume();
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
MenuBodyBinding.prototype.handleFocusedItem=function(_6a2){
for(var key in this._focused){
if(key!=_6a2.key){
var item=this._focused[key];
item.blur();
}
}
this._focused[_6a2.key]=_6a2;
this._lastFocused=_6a2;
if(MenuBodyBinding.activeInstance!=this){
this.grabKeyboard();
}
};
MenuBodyBinding.prototype.handleBlurredItem=function(_6a5){
delete this._focused[_6a5.key];
};
MenuBodyBinding.prototype.resetFocusedItems=function(_6a6){
for(var key in this._focused){
var item=this._focused[key];
item.blur(_6a6);
}
if(_6a6){
this._lastFocused=null;
}
};
MenuBodyBinding.prototype.refreshMenuGroups=function(){
if(!this.isAttached){
throw "refreshMenuGroups: MenuBodyBinding not attached!";
}else{
var _6a9=this.getChildBindingsByLocalName("menugroup");
var _6aa=null;
var _6ab=null;
while(_6a9.hasNext()){
var _6ac=_6a9.getNext();
if(!_6ac.isDefaultContent){
_6ac.setLayout(MenuGroupBinding.LAYOUT_DEFAULT);
if(!_6aa&&_6ac.isVisible){
_6aa=_6ac;
}
if(_6ac.isVisible){
_6ab=_6ac;
}
}
}
if(_6aa&&_6ab){
_6aa.setLayout(MenuGroupBinding.LAYOUT_FIRST);
_6ab.setLayout(MenuGroupBinding.LAYOUT_LAST);
}
}
};
MenuBodyBinding.prototype.grabKeyboard=function(_6ad){
MenuBodyBinding.activeInstance=this;
if(_6ad){
var _6ae=this._getMenuItems().getFirst();
if(_6ae){
_6ae.focus();
}
}
};
MenuBodyBinding.prototype.releaseKeyboard=function(){
if(MenuBodyBinding.activeInstance==this){
MenuBodyBinding.activeInstance=null;
}
};
MenuBodyBinding.prototype.handleEnterKey=function(){
var _6af=this._lastFocused;
if((_6af!=null)&&(!_6af.isMenuContainer)){
_6af.fireCommand();
EventBroadcaster.broadcast(BroadcastMessages.MOUSEEVENT_MOUSEDOWN);
}
};
MenuBodyBinding.prototype.handleArrowKey=function(key){
this.arrowKey=key;
var _6b1=this._getMenuItems();
var _6b2=null;
var next=null;
if(this._lastFocused){
_6b2=this._lastFocused;
switch(key){
case KeyEventCodes.VK_UP:
next=_6b1.getPreceding(_6b2);
break;
case KeyEventCodes.VK_DOWN:
next=_6b1.getFollowing(_6b2);
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
next=_6b1.getFirst();
}
if(next){
next.focus();
}
};
MenuBodyBinding.prototype._getMenuItems=function(){
if(!this._menuItemsList||this.isDirty){
var list=new List();
var _6b5=null;
this.getChildBindingsByLocalName("menugroup").each(function(_6b6){
_6b5=_6b6.getChildBindingsByLocalName("menuitem");
_6b5.each(function(item){
list.add(item);
});
});
_6b5=this.getChildBindingsByLocalName("menuitem");
_6b5.each(function(item){
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
MenuBodyBinding.newInstance=function(_6ba){
var _6bb=DOMUtil.createElementNS(Constants.NS_UI,"ui:menubody",_6ba);
return UserInterface.registerBinding(_6bb,MenuBodyBinding);
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
MenuGroupBinding.prototype.setLayout=function(_6bc){
switch(_6bc){
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
MenuGroupBinding.newInstance=function(_6bd){
var _6be=DOMUtil.createElementNS(Constants.NS_UI,"ui:menugroup",_6bd);
return UserInterface.registerBinding(_6be,MenuGroupBinding);
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
MenuItemBinding.CHAR_SUBMENU="\xe2\u2013\xba";
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
var _6bf=this.getProperty("image");
var _6c0=this.getProperty("image-hover");
var _6c1=this.getProperty("image-active");
var _6c2=this.getProperty("image-disabled");
if(!this.image&&_6bf){
this.image=_6bf;
}
if(!this.imageHover&&_6c0){
this.imageHover=_6bf;
}
if(!this.imageActive&&_6c1){
this.imageActive=_6c1;
}
if(!this.imageDisabled&&_6c2){
this.imageDisabled=_6c2;
}
};
MenuItemBinding.prototype.buildDOMContent=function(){
var _6c3=this.getProperty("label");
var _6c4=this.getProperty("tooltip");
var type=this.getProperty("type");
var _6c6=this.getProperty("isdisabled");
var _6c7=this.getProperty("image");
var _6c8=this.getProperty("image-hover");
var _6c9=this.getProperty("image-active");
var _6ca=this.getProperty("image-disabled");
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.labelBinding.attachClassName("menuitemlabel");
this.add(this.labelBinding);
var _6cb=this.getMenuPopupBinding();
if(_6cb){
this.isMenuContainer=true;
this.setType(MenuItemBinding.TYPE_MENUCONTAINER);
}
if(!this.imageProfile){
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
if(this.image||this.imageHover||this.imageActive||this.imageDisabled){
this.imageProfile=new ImageProfile(this);
}
}
if(this.imageProfile){
this.setImage(this.imageProfile.getDefaultImage());
}else{
this.setImage(null);
}
if(_6c3){
this.setLabel(_6c3);
}
if(_6c4){
this.setToolTip(_6c4);
}
if(type){
this.setType(type);
}
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.getProperty("ischecked")==true){
this.check(true);
}
}
if(_6c6==true){
this.disable();
}
var _6cc=this.getProperty("oncommand");
if(_6cc){
if(this.isMenuContainer){
throw new Error("MenuItemBinding with contained menuitems cannot fire commands.");
}else{
this.oncommand=function(){
this.bindingWindow.eval(_6cc);
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
MenuItemBinding.prototype.setLabel=function(_6cf){
this.setProperty("label",_6cf);
if(this.isAttached){
this.labelBinding.setLabel(Resolver.resolve(_6cf));
}
};
MenuItemBinding.prototype.setToolTip=function(_6d0){
this.setProperty("tooltip",_6d0);
if(this.isAttached){
this.labelBinding.setToolTip(Resolver.resolve(_6d0));
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
var _6d2=this.bindingDocument.createElement("div");
_6d2.className=MenuItemBinding.CLASSNAME_CHECKBOX;
_6d2.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_CHECKBOX));
var _6d3=this.labelBinding.bindingElement;
_6d3.insertBefore(_6d2,_6d3.firstChild);
_6d2.style.display="none";
this.shadowTree.checkBoxIndicator=_6d2;
}else{
throw new Error("MenuItemBinding: checkboxes cannot contain menus");
}
break;
case MenuItemBinding.TYPE_MENUCONTAINER:
var _6d2=this.bindingDocument.createElement("div");
_6d2.className=MenuItemBinding.CLASSNAME_SUBMENU;
_6d2.appendChild(this.bindingDocument.createTextNode(MenuItemBinding.CHAR_SUBMENU));
var _6d3=this.labelBinding.bindingElement;
_6d3.insertBefore(_6d2,_6d3.firstChild);
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
var _6d5=this.imageProfile.getDisabledImage();
if(_6d5){
this.setImage(_6d5);
}
}
}else{
this.detachClassName("isdisabled");
if(this.imageProfile){
var _6d5=this.imageProfile.getDefaultImage();
if(_6d5){
this.setImage(_6d5);
}
}
}
}
};
MenuItemBinding.prototype.focus=function(e){
this.labelBinding.attachClassName(MenuItemBinding.CLASSNAME_HOVER);
var _6d7=this.getMenuContainerBinding();
if(_6d7.isOpen()&&!_6d7.isOpen(this)){
_6d7._openElement.hide();
_6d7.setOpenElement(false);
}
if(this.isMenuContainer&&e&&e.type==DOMEvents.MOUSEOVER){
var _6d7=this.getMenuContainerBinding();
if(!_6d7.isOpen(this)){
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
MenuItemBinding.prototype.blur=function(_6d9){
if(this._showSubMenuTimeout){
window.clearTimeout(this._showSubMenuTimeout);
this._showSubMenuTimeout=null;
}
if(this.isFocused){
var _6da=this.getMenuContainerBinding();
if(!_6da||!_6da.isOpen(this)||_6d9){
this.labelBinding.detachClassName(MenuItemBinding.CLASSNAME_HOVER);
this.isFocused=false;
this._containingMenuBodyBinding.handleBlurredItem(this);
}
}
};
MenuItemBinding.prototype.check=function(_6db){
this.setChecked(true,_6db);
};
MenuItemBinding.prototype.uncheck=function(_6dc){
this.setChecked(false,_6dc);
};
MenuItemBinding.prototype.show=function(){
this.menuPopupBinding.position=PopupBinding.POSITION_RIGHT;
MenuItemBinding.superclass.show.call(this);
};
MenuItemBinding.prototype.setChecked=function(_6dd,_6de){
this.setProperty("ischecked",_6dd);
if(this.isAttached){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
if(this.isChecked!=_6dd){
this.isChecked=_6dd;
this.shadowTree.checkBoxIndicator.style.display=_6dd?"block":"none";
if(!_6de){
this.fireCommand();
}
}
}
}
};
MenuItemBinding.newInstance=function(_6df){
var _6e0=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_6df);
UserInterface.registerBinding(_6e0,MenuItemBinding);
return UserInterface.getBinding(_6e0);
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
PopupBinding.handleBroadcast=function(_6e1,arg){
switch(_6e1){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
case BroadcastMessages.MOUSEEVENT_MOUSEUP:
if(PopupBinding.activeInstances.hasEntries()){
var list=new List();
PopupBinding.activeInstances.each(function(key){
var _6e5=PopupBinding.activeInstances.get(key);
var _6e6=(arg&&arg instanceof ButtonBinding&&arg.popupBinding==_6e5);
if(!_6e6){
list.add(_6e5);
}
});
list.each(function(_6e7){
_6e7.hide();
});
}
break;
case BroadcastMessages.KEY_ESCAPE:
if(PopupBinding.activeInstances.hasEntries()){
PopupBinding.activeInstances.each(function(key){
var _6e9=PopupBinding.activeInstances.get(key);
_6e9.hide();
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
var _6ea=DOMUtil.getElementsByTagName(this.bindingElement,"menubody").item(0);
var _6eb=DOMUtil.getElementsByTagName(this.bindingElement,"popupbody").item(0);
if(_6ea){
this._bodyBinding=UserInterface.getBinding(_6ea);
}else{
if(_6eb){
this._bodyBinding=UserInterface.getBinding(_6eb);
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
var _6ec=this.getProperty("position");
this.position=_6ec?_6ec:PopupBinding.POSITION_BOTTOM;
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
PopupBinding.prototype.add=function(_6ed){
var _6ee=null;
if(this._bodyBinding){
this._bodyBinding.add(_6ed);
_6ee=_6ed;
}else{
_6ee=PopupBinding.superclass.add.call(this,_6ed);
}
return _6ee;
};
PopupBinding.prototype.addFirst=function(_6ef){
var _6f0=null;
if(this._bodyBinding){
this._bodyBinding.addFirst(_6ef);
_6f0=_6ef;
}else{
_6f0=PopupBinding.superclass.addFirst.call(this,_6ef);
}
return _6f0;
};
PopupBinding.prototype.handleAction=function(_6f1){
PopupBinding.superclass.handleAction.call(this,_6f1);
var _6f2=_6f1.target;
switch(_6f1.type){
case Binding.ACTION_ATTACHED:
if(_6f2 instanceof MenuItemBinding){
this._count(true);
_6f1.consume();
}
break;
case Binding.ACTION_DETACHED:
if(_6f2 instanceof MenuItemBinding){
this._count(false);
_6f1.consume();
}
break;
}
};
PopupBinding.prototype._count=function(_6f3){
if(this.type==PopupBinding.TYPE_FIXED){
this._menuItemCount=this._menuItemCount+(_6f3?1:-1);
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
PopupBinding.prototype.snapTo=function(_6f4){
var _6f5=this._getElementPosition(_6f4);
switch(this.position){
case PopupBinding.POSITION_TOP:
_6f5.y-=this.bindingElement.offsetHeight;
break;
case PopupBinding.POSITION_RIGHT:
_6f5.x+=_6f4.offsetWidth;
break;
case PopupBinding.POSITION_BOTTOM:
_6f5.y+=_6f4.offsetHeight;
break;
case PopupBinding.POSITION_LEFT:
_6f5.x-=this.bindingElement.offsetWidth;
break;
}
this.targetElement=_6f4;
this.bindingElement.style.display="block";
this.setPosition(_6f5.x,_6f5.y);
};
PopupBinding.prototype.snapToMouse=function(e){
this.snapToPoint(this._getMousePosition(e));
};
PopupBinding.prototype.snapToPoint=function(_6f7){
this.bindingElement.style.display="block";
this.setPosition(_6f7.x,_6f7.y);
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
PopupBinding.prototype._getElementPosition=function(_6fc){
return _6fc.ownerDocument==this.bindingDocument?DOMUtil.getGlobalPosition(_6fc):DOMUtil.getUniversalPosition(_6fc);
};
PopupBinding.prototype._getMousePosition=function(e){
var _6fe=DOMEvents.getTarget(e);
return _6fe.ownerDocument==this.bindingDocument?DOMUtil.getGlobalMousePosition(e):DOMUtil.getUniversalMousePosition(e);
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
PopupBinding.prototype._makeVisible=function(_6ff){
var _700=this.bindingElement;
if(_6ff){
if(Client.hasTransitions){
_700.style.visibility="visible";
_700.style.opacity="1";
}else{
_700.style.visibility="visible";
}
}else{
_700.style.visibility="hidden";
_700.style.display="none";
if(Client.hasTransitions){
_700.style.opacity="0";
}
}
this.isVisible=_6ff;
};
PopupBinding.prototype._enableTab=function(_701){
var self=this;
var _703=this.getDescendantBindingsByLocalName("menuitem");
setTimeout(function(){
if(Binding.exists(self)==true){
_703.each(function(_704){
_704.bindingElement.tabIndex=_701?0:-1;
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
PopupBinding.prototype.grabKeyboard=function(_70d){
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
var _713=null;
if(this._menuItems){
if(this._menuItems[cmd]){
_713=this._menuItems[cmd];
}else{
throw "PopupBinding.getMenuItemForCommand: No binding for command "+cmd;
}
}else{
throw "Must invoke _indexMenuContent method first!";
}
return _713;
};
PopupBinding.prototype.clear=function(){
var _714=this._bodyBinding;
if(_714){
_714.detachRecursive();
_714.bindingElement.innerHTML="";
}
this._menuItemCount=0;
};
PopupBinding.newInstance=function(_715){
var _716=DOMUtil.createElementNS(Constants.NS_UI,"ui:popup",_715);
return UserInterface.registerBinding(_716,PopupBinding);
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
PopupBodyBinding.newInstance=function(_718){
var _719=DOMUtil.createElementNS(Constants.NS_UI,"ui:popupbody",_718);
return UserInterface.registerBinding(_719,PopupBodyBinding);
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
MenuPopupBinding.prototype._getElementPosition=function(_71a){
return new Point(_71a.offsetLeft,0);
};
MenuPopupBinding.newInstance=function(_71b){
var _71c=DOMUtil.createElementNS(Constants.NS_UI,"ui:menupopup",_71b);
return UserInterface.registerBinding(_71c,MenuPopupBinding);
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
var _71d=DOMUtil.getElementsByTagName(this.bindingElement,"dialogbody").item(0);
if(_71d){
this._body=UserInterface.getBinding(_71d);
}else{
this._body=DialogBodyBinding.newInstance(this.bindingDocument);
this.add(this._body);
}
};
DialogBinding.prototype.buildBorderBindings=function(){
var _71e=new List([DialogBorderBinding.TYPE_NORTH,DialogBorderBinding.TYPE_SOUTH,DialogBorderBinding.TYPE_EAST,DialogBorderBinding.TYPE_WEST]);
while(_71e.hasNext()){
var _71f=DialogBorderBinding.newInstance(this.bindingDocument);
_71f.setType(_71e.getNext());
this.add(_71f);
}
};
DialogBinding.prototype.buildShadowBinding=function(){
this.shadowBinding=ShadowBinding.newInstance(this.bindingDocument);
this.shadowBinding.attachClassName("dialogshadow");
this.shadowBinding.shadow(this);
this.shadowBinding.attach();
};
DialogBinding.prototype.buildControlBindings=function(){
var _720=this.getProperty("controls");
if(_720){
var _721=new List(_720.split(" "));
while(_721.hasNext()){
var type=_721.getNext();
switch(type){
case ControlBinding.TYPE_MAXIMIZE:
case ControlBinding.TYPE_MINIMIZE:
case ControlBinding.TYPE_CLOSE:
var _723=DialogControlBinding.newInstance(this.bindingDocument);
_723.setControlType(type);
this._titlebar.addControl(_723);
this.controlBindings[type]=_723;
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
var _724=this.getProperty("image");
var _725=this.getProperty("label");
var _726=this.getProperty("draggable");
var _727=this.getProperty("resizable");
var _728=this.getProperty("modal");
if(_724){
this.setImage(_724);
}
if(_725){
this.setLabel(_725);
}
if(_726==false){
this.isDialogDraggable=false;
}
if(_727==false){
this.isPanelResizable=false;
}
if(_728==true){
this.setModal(true);
}
};
DialogBinding.prototype.setModal=function(_729){
this.isModal=_729;
};
DialogBinding.prototype.setLabel=function(_72a){
this.setProperty("label",_72a);
if(this.isAttached==true){
this._titlebar.setLabel(Resolver.resolve(_72a));
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
DialogBinding.prototype.handleAction=function(_72c){
DialogBinding.superclass.handleAction.call(this,_72c);
switch(_72c.type){
case Binding.ACTION_DRAG:
var _72d=_72c.target;
if(this.getState()==ControlBoxBinding.STATE_NORMAL){
switch(_72d.constructor){
case DialogTitleBarBinding:
this.mode=DialogBinding.MODE_DRAGGING;
_72d.dragger.registerHandler(this);
break;
case DialogBorderBinding:
if(this._isResizable){
this.mode=DialogBinding.MODE_RESIZING;
this._border=_72d;
_72d.dragger.registerHandler(this);
}
break;
}
}
_72c.consume();
break;
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_72c.consume();
break;
}
};
DialogBinding.prototype.handleBroadcast=function(_72e,arg){
DialogBinding.superclass.handleBroadcast.call(this,_72e,arg);
switch(_72e){
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
this.startPoint=this.getPosition();
this._setComputedPosition(new Point(0,0));
break;
}
};
DialogBinding.prototype.handleInvokedControl=function(_730){
DialogBinding.superclass.handleInvokedControl.call(this,_730);
switch(_730.controlType){
case ControlBinding.TYPE_CLOSE:
this.close();
break;
}
};
DialogBinding.prototype.open=function(_731){
if(this.isModal&&this._cover==null){
this.buildDialogCoverBinding();
}
if(!this.isVisible){
this.setProperty("open","true");
this.isVisible=true;
this.isActivatable=true;
this.activate();
if(_731){
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
var _733=self.bindingElement;
setTimeout(function(){
_733.style.opacity="0";
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
DialogBinding.prototype.setZIndex=function(_734){
this.bindingElement.style.zIndex=new String(_734);
};
DialogBinding.prototype.onDragStart=function(_735){
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
DialogBinding.prototype.setResizable=function(_747){
if(this._isResizable!=_747){
if(_747){
this.attachClassName("resizable");
}else{
this.detachClassName("resizable");
}
this._isResizable=_747;
}
};
DialogBinding.prototype.computeDefaultGeometry=function(){
var _748=null;
var _749=this.bindingDocument.body.offsetWidth;
var _74a=this.bindingDocument.body.offsetHeight;
_748={x:0.125*_749,y:0.125*_74a,w:0.75*_749,h:0.5*_74a};
return _748;
};
DialogBinding.prototype.centerOnScreen=function(){
var _74b=this.bindingWindow.WindowManager.getWindowDimensions();
var dim=this.getDimension();
this.setPosition(new Point(0.5*(_74b.w-dim.w),0.5*(_74b.h-dim.h)));
};
DialogBinding.prototype.alert=function(){
var _74d=this;
var i=0;
function blink(){
if(i%2==0){
_74d.detachClassName("active");
}else{
_74d.attachClassName("active");
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
var _751="";
while(list.hasNext()){
var type=list.getNext();
_751+=type+list.hasNext()?" ":"";
}
this.setProperty("controls",_751);
if(this.isAttached){
this.buildControlBindings();
}
};
DialogBinding.newInstance=function(_752){
var _753=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_752);
return UserInterface.registerBinding(_753,DialogBinding);
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
DialogHeadBinding.newInstance=function(_754){
var _755=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialoghead",_754);
return UserInterface.registerBinding(_755,DialogHeadBinding);
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
DialogBodyBinding.newInstance=function(_758){
var _759=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogbody",_758);
return UserInterface.registerBinding(_759,DialogBodyBinding);
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
DialogMatrixBinding.newInstance=function(_75a){
var _75b=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogmatrix",_75a);
return UserInterface.registerBinding(_75b,DialogMatrixBinding);
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
DialogSetBinding.prototype.handleAction=function(_75c){
DialogSetBinding.superclass.handleAction.call(this,_75c);
var _75d=_75c.target;
switch(_75c.type){
case Binding.ACTION_MOVETOTOP:
if(_75d instanceof DialogBinding){
this._moveToTop(_75d);
}
break;
case Binding.ACTION_MOVEDONTOP:
_75c.consume();
break;
}
};
DialogSetBinding.prototype._moveToTop=function(_75e){
var _75f=0;
var _760=this.getChildBindingsByLocalName("dialog");
_760.each(function(_761){
var _762=_761.getZIndex();
_75f=_762>_75f?_762:_75f;
});
_75e.setZIndex(_75f+2);
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
DialogBorderBinding.newInstance=function(_764){
var _765=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogborder",_764);
return UserInterface.registerBinding(_765,DialogBorderBinding);
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
DialogCoverBinding.prototype.cover=function(_766){
this._dialogBinding=_766;
this._dialogBinding.addActionListener(DialogBinding.ACTION_OPEN,this);
this._dialogBinding.addActionListener(DialogBinding.ACTION_CLOSE,this);
this._dialogBinding.addActionListener(Binding.ACTION_MOVEDONTOP,this);
this.addEventListener(DOMEvents.MOUSEDOWN);
};
DialogCoverBinding.prototype.handleEvent=function(e){
DialogCoverBinding.superclass.handleEvent.call(this,e);
this._dialogBinding.alert();
};
DialogCoverBinding.prototype.handleAction=function(_768){
DialogCoverBinding.superclass.handleAction.call(this,_768);
var _769=_768.target;
if(this._dialogBinding.isModal){
switch(_768.type){
case DialogBinding.ACTION_OPEN:
this.show();
break;
case DialogBinding.ACTION_CLOSE:
this.hide();
break;
case Binding.ACTION_MOVEDONTOP:
if(_769==this._dialogBinding){
this.bindingElement.style.zIndex=new String(_769.getZIndex()-1);
}
break;
}
}
};
DialogCoverBinding.prototype.handleBroadcast=function(_76a,arg){
DialogCoverBinding.superclass.handleBroadcast.call(this,_76a,arg);
switch(_76a){
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
var _76d=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.subscribe(_76d);
DialogCoverBinding.superclass.show.call(this);
};
DialogCoverBinding.prototype.hide=function(){
var _76e=this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST;
this.unsubscribe(_76e);
DialogCoverBinding.superclass.hide.call(this);
};
DialogCoverBinding.newInstance=function(_76f){
var _770=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialogcover",_76f);
return UserInterface.registerBinding(_770,DialogCoverBinding);
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
var _771=this.getProperty("image");
if(_771){
this.setImage(_771);
}
var _772=this.getProperty("label");
if(_772){
this.setLabel(_772);
}
};
DialogTitleBarBinding.prototype.setLabel=function(_773){
if(this.isAttached){
this.labelBinding.setLabel(_773);
}
this.setProperty("label",_773);
};
DialogTitleBarBinding.prototype.setImage=function(url){
if(this.isAttached&&Client.isWindows){
this.labelBinding.setImage(url);
}
this.setProperty("image",url);
};
DialogTitleBarBinding.prototype.addControl=function(_775){
if(!this._controlGroupBinding){
this._controlGroupBinding=this.bodyBinding.addFirst(ControlGroupBinding.newInstance(this.bindingDocument));
}
this._controlGroupBinding.add(_775);
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
DialogTitleBarBinding.newInstance=function(_776){
var _777=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebar",_776);
return UserInterface.registerBinding(_777,DialogTitleBarBinding);
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
DialogTitleBarBodyBinding.newInstance=function(_778){
var _779=DOMUtil.createElementNS(Constants.NS_UI,"ui:titlebarbody",_778);
return UserInterface.registerBinding(_779,DialogTitleBarBodyBinding);
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
DialogControlBinding.newInstance=function(_77a){
var _77b=DOMUtil.createElementNS(Constants.NS_UI,"ui:control",_77a);
return UserInterface.registerBinding(_77b,DialogControlBinding);
};
DialogControlImageProfile.prototype=new ControlImageProfile;
DialogControlImageProfile.prototype.constructor=DialogControlImageProfile;
DialogControlImageProfile.superclass=ControlImageProfile.prototype;
var os=Client.isVista?"vista/":(!Client.isWindows?"osx/":"");
DialogControlImageProfile.IMAGE_MINIMIZE="${root}/skins/system/controls/"+os+"control-minimize-${string}.png";
DialogControlImageProfile.IMAGE_MAXIMIZE="${root}/skins/system/controls/"+os+"control-maximize-${string}.png";
DialogControlImageProfile.IMAGE_RESTORE="${root}/skins/system/controls/"+os+"control-restore-${string}.png";
DialogControlImageProfile.IMAGE_CLOSE="${root}/skins/system/controls/"+os+"control-close-${string}.png";
function DialogControlImageProfile(_77c){
this.binding=_77c;
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
var _77f=null;
if(node.nodeType==Node.ELEMENT_NODE){
var _780=node.nodeName.toLowerCase();
switch(_780){
case "script":
case "style":
case "textarea":
_77f=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
break;
}
}
return _77f;
});
var self=this;
this.addFilter(function(node,arg){
if(node.nodeType==Node.TEXT_NODE){
var text=node.nodeValue.toLowerCase();
self._map.each(function(key,exp){
var _787=true;
if(exp.test(text)){
self._textnodes.add(node);
_787=false;
}
return _787;
});
}
});
};
WindowBindingHighlightNodeCrawler.prototype.crawl=function(_788,arg){
this._textnodes=new List();
WindowBindingHighlightNodeCrawler.superclass.crawl.call(this,_788,arg);
};
WindowBindingHighlightNodeCrawler.prototype.setKeys=function(list){
list.reset();
this._map.empty();
while(list.hasNext()){
var key=list.getNext();
var _78c=key.toLowerCase().replace(/ /g,"\\W");
var exp=new RegExp("("+_78c+")");
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
WindowBindingHighlightNodeCrawler.prototype._getMarkup=function(_792){
var _793="";
var _794="<span class=\""+WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT+"\" style=\"background-color:yellow;color:black;\">";
var _795="</span>";
var self=this;
function iterate(_797){
var _798=-1;
var _799=null;
self._map.each(function(key,exp){
var low=_797.toLowerCase();
var _79d=low.search(exp);
if(_79d>-1){
if(_798==-1){
_798=_79d;
}
if(_79d<=_798){
_798=_79d;
_799=key;
}
}
});
if(_798>-1&&_799!=null){
var pre=_797.substring(0,_798);
var hit=_797.substring(_798,_798+_799.length);
var pst=_797.substring(_798+_799.length,_797.length);
_793+=pre+_794+hit+_795;
iterate(pst);
}else{
_793+=_797;
}
}
iterate(_792);
return _793;
};
WindowBindingHighlightNodeCrawler.prototype.reset=function(_7a1){
var _7a2=new List(_7a1.getElementsByTagName("span"));
_7a2.each(function(span){
if(span.className==WindowBindingHighlightNodeCrawler.CLASSNAME_HIGHLIGHT){
var node=_7a1.ownerDocument.createTextNode(DOMUtil.getTextContent(span));
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
WindowBinding.getMarkup=function(_7a5){
var _7a6=null;
if(_7a5.isAttached){
var doc=_7a5.getContentDocument();
if(doc!=null){
var root=doc.getElementsByTagName("html").item(0);
var html="<html xmlns=\""+Constants.NS_XHTML+"\">"+root.innerHTML+"</html>";
WebServiceProxy.isFaultHandler=false;
_7a6=top.MarkupFormatService.HtmlToXhtml(html);
WebServiceProxy.isFaultHandler=true;
if(_7a6 instanceof SOAPFault){
_7a6=null;
}
}
}
return _7a6;
};
WindowBinding.highlightKeywords=function(_7aa,list){
if(WindowBinding._highlightcrawler==null){
WindowBinding._highlightcrawler=new WindowBindingHighlightNodeCrawler();
}
if(_7aa.isAttached){
var doc=_7aa.getContentDocument();
if(doc!=null){
var _7ad=WindowBinding._highlightcrawler;
_7ad.reset(doc.body);
if(list!=null){
_7ad.setKeys(list);
_7ad.crawl(doc.body);
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
var _7ae=WindowBinding.superclass.serialize.call(this);
if(_7ae){
_7ae.url=this.getURL();
}
return _7ae;
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
var _7b0=this.getContentWindow().DocumentManager;
if(_7b0!=null){
_7b0.detachAllBindings();
this._pageBinding=null;
}
}
}
};
WindowBinding.prototype.handleAction=function(_7b1){
WindowBinding.superclass.handleAction.call(this,_7b1);
var _7b2=_7b1.target;
switch(_7b1.type){
case RootBinding.ACTION_PHASE_3:
if(_7b2.bindingDocument==this.getContentDocument()){
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
this._onPageInitialize(_7b2);
break;
case RootBinding.ACTION_ACTIVATED:
case RootBinding.ACTION_DEACTIVATED:
_7b1.consume();
break;
}
};
WindowBinding.prototype.fit=function(_7b3){
if(!this.isFit||_7b3){
if(this._pageBinding!=null){
this.setHeight(this._pageBinding.getHeight());
this.isFit=true;
}
}
};
WindowBinding.prototype._onPageInitialize=function(_7b4){
if(this._pageBinding==null){
if(_7b4.bindingWindow==this.getContentWindow()){
this._pageBinding=_7b4;
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
WindowBinding.prototype._registerOnloadListener=function(_7b5){
var _7b6=this.shadowTree.iframe;
var _7b7=_7b5?"addEventListener":"removeEventListener";
if(this._onloadHandler==null){
var self=this;
this._onloadHandler={handleEvent:function(e){
var _7ba=true;
if(Client.isExplorer){
_7ba=_7b6.readyState=="complete";
}
if(_7ba==true){
if(self.getURL()!=WindowBinding.DEFAULT_URL){
if(!self._hasLoadActionFired){
self.onWindowLoaded(self.getContentWindow());
}
}
}
}};
}
DOMEvents[_7b7](this.shadowTree.iframe,Client.isExplorer==true?"readystatechange":DOMEvents.LOAD,this._onloadHandler);
};
WindowBinding.prototype._registerUnloadListener=function(_7bb){
var _7bc=_7bb?"addEventListener":"removeEventListener";
if(this._unloadHandler==null){
var self=this;
this._unloadHandler={handleEvent:function(){
self._disposeContentDocument();
self._hasLoadActionFired=false;
}};
}
DOMEvents[_7bc](this.getContentWindow(),DOMEvents.UNLOAD,this._unloadHandler);
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
var _7c0=WindowBinding.DEFAULT_URL;
var url=this.getProperty("url");
if(url){
_7c0=url;
}
return _7c0;
};
WindowBinding.prototype.reload=function(_7c2){
this._disposeContentDocument();
if(Client.isPrism){
Prism.disableCache();
}
this._isReloading=true;
this.getContentDocument().location.reload();
};
WindowBinding.prototype.getFrameElement=function(){
var _7c3=null;
if(this.shadowTree.iframe!=null){
_7c3=this.shadowTree.iframe;
}
return _7c3;
};
WindowBinding.prototype.getContentWindow=function(){
var _7c4=null,_7c5=this.getFrameElement();
if(_7c5!==null){
try{
_7c4=_7c5.contentWindow;
}
catch(e){
this.logger.error("WindowBinding#getContentWindow: strange IE9 error");
}
}
return _7c4;
};
WindowBinding.prototype.getContentDocument=function(){
var _7c6=null,win=this.getContentWindow();
if(win){
_7c6=win.document;
}
return _7c6;
};
WindowBinding.prototype.getRootBinding=function(){
var _7c8=null,doc=this.getContentDocument();
if(doc&&doc.body){
_7c8=UserInterface.getBinding(doc.body);
}
return _7c8;
};
WindowBinding.prototype.getPageBinding=function(){
return this._pageBinding;
};
WindowBinding.prototype.setHeight=function(_7ca){
this.bindingElement.style.height=_7ca+"px";
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
WindowBinding.prototype.handleCrawler=function(_7cb){
WindowBinding.superclass.handleCrawler.call(this,_7cb);
if(_7cb.type==NodeCrawler.TYPE_DESCENDING){
var root=this.getRootBinding();
if(root!=null){
_7cb.nextNode=root.bindingElement;
}else{
_7cb.response=NodeCrawler.SKIP_CHILDREN;
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
WindowBinding.newInstance=function(_7d0){
var _7d1=DOMUtil.createElementNS(Constants.NS_UI,"ui:window",_7d0);
var _7d2=UserInterface.registerBinding(_7d1,WindowBinding);
return _7d2;
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
this._windowBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_7d6){
_7d6.target.show();
_7d6.consume();
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
this._errorBinding.addActionListener(WindowBinding.ACTION_LOADED,{handleAction:function(_7d8){
_7d8.target.show();
_7d8.consume();
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
PreviewWindowBinding.prototype.handleAction=function(_7da){
PreviewWindowBinding.superclass.handleAction.call(this,_7da);
switch(_7da.type){
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
var _7db=null;
this._getRadioButtonBindings().each(function(_7dc){
if(_7dc.getProperty("ischecked")){
_7db=_7dc;
return false;
}else{
return true;
}
});
if(_7db){
this._checkedRadioBinding=_7db;
}
RadioGroupBinding.superclass.onBindingInitialize.call(this);
};
RadioGroupBinding.prototype.handleAction=function(_7dd){
RadioGroupBinding.superclass.handleAction.call(this,_7dd);
var _7de=_7dd.target;
switch(_7dd.type){
case ButtonBinding.ACTION_RADIOBUTTON_ATTACHED:
this._isUpToDate=false;
_7dd.consume();
break;
case ButtonBinding.ACTION_COMMAND:
if(_7de.isRadioButton&&!_7de.isDisabled){
if(this._checkedRadioBinding){
this._unCheckRadioBindingsExcept(_7de);
}
this._checkedRadioBinding=_7de;
this.dispatchAction(RadioGroupBinding.ACTION_SELECTIONCHANGED);
_7dd.consume();
}
break;
}
};
RadioGroupBinding.prototype.setCheckedButtonBinding=function(_7df,_7e0){
if(_7df instanceof RadioDataBinding){
_7df=_7df.getButton();
}
if(_7df.isRadioButton){
switch(_7e0){
case true:
this._unCheckRadioBindingsExcept(_7df);
this._checkedRadioBinding=_7df;
_7df.check(true);
break;
default:
_7df.check();
break;
}
}
};
RadioGroupBinding.prototype.getCheckedButtonBinding=function(){
return this._checkedRadioBinding;
};
RadioGroupBinding.prototype._unCheckRadioBindingsExcept=function(_7e1){
var _7e2=this._getRadioButtonBindings();
_7e2.each(function(_7e3){
if(_7e3.isChecked&&_7e3!=_7e1){
_7e3.uncheck(true);
}
});
};
RadioGroupBinding.prototype._getRadioButtonBindings=function(){
if(this._radioButtonBindings===null||!this._isUpToDate){
var _7e4=new Crawler();
var list=new List();
_7e4.addFilter(function(_7e6){
var _7e7=true;
var _7e8=UserInterface.getBinding(_7e6);
if(_7e8 instanceof RadioGroupBinding){
_7e7=NodeCrawler.SKIP_CHILDREN;
}else{
if(_7e8 instanceof ButtonBinding&&_7e8.isRadioButton){
list.add(_7e8);
}
}
return _7e7;
});
_7e4.crawl(this.bindingElement);
this._radioButtonBindings=list;
}
return this._radioButtonBindings;
};
RadioGroupBinding.newInstance=function(_7e9){
var _7ea=DOMUtil.createElementNS(Constants.NS_UI,"ui:radiogroup",_7e9);
return UserInterface.registerBinding(_7ea,RadioGroupBinding);
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
var _7ec=this.getProperty("regexrule");
if(_7ec!=null){
this.expression=new RegExp(_7ec);
}
var _7ed=this.getProperty("onbindingblur");
if(_7ed!=null){
this.onblur=function(){
Binding.evaluate(_7ed,this);
};
}
var _7ee=this.getProperty("onvaluechange");
if(_7ee!=null){
this.onValueChange=function(){
Binding.evaluate(_7ee,this);
};
}
if(this.error==null&&this.type!=null){
var _7ef=DataBinding.errors[this.type];
if(_7ef!=null){
this.error=_7ef;
}
}
};
DataInputBinding.prototype._buildDOMContent=function(){
this.shadowTree.input=this._getInputElement();
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
if(Client.isExplorer==true){
this.bindingElement.hideFocus=true;
}
var _7f0=this.getProperty("value");
if(_7f0!=null){
this.setValue(String(_7f0));
}
var name=this.getProperty("name");
if(name!=null){
this.setName(name);
}
var _7f2=this.getProperty("isdisabled");
if(_7f2==true){
this.setDisabled(true);
}
var _7f3=this.getProperty("readonly");
if(_7f3==true){
this.setReadOnly(true);
}
var _7f4=this.getProperty("autoselect");
if(_7f4==true){
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
var _7f5=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_7f5.type=this.isPassword==true?"password":"text";
_7f5.tabIndex=-1;
return _7f5;
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
DataInputBinding.prototype._handleFocusAndBlur=function(_7f8){
if(_7f8){
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
DataInputBinding.prototype.handleBroadcast=function(_7fb,arg){
DataInputBinding.superclass.handleBroadcast.call(this,_7fb,arg);
var self=this;
switch(_7fb){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(Client.isExplorer==true){
var _7fe=DOMEvents.getTarget(arg);
if(_7fe!=this.shadowTree.input){
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
DataInputBinding.prototype.focus=function(_7ff){
if(!this.isFocused&&!this.isReadOnly&&!this.isDisabled){
DataInputBinding.superclass.focus.call(this);
if(this.isFocused==true){
this._focus();
if(this._isAutoSelect==true){
if(_7ff){
var self=this,_801=this.bindingElement,_802={handleEvent:function(){
self.select();
DOMEvents.removeEventListener(_801,DOMEvents.MOUSEUP,this);
}};
DOMEvents.addEventListener(_801,DOMEvents.MOUSEUP,_802);
}else{
this.select();
}
}
this.onfocus();
if(!_7ff){
var _803=this.shadowTree.input;
setTimeout(function(){
FocusBinding.focusElement(_803);
},0);
}
}
}
};
DataInputBinding.prototype.select=function(){
var _804=this.shadowTree.input;
setTimeout(function(){
if(Client.isExplorer==true){
var _805=_804.createTextRange();
_805.moveStart("character",0);
_805.moveEnd("character",_804.value.length);
_805.select();
}else{
_804.setSelectionRange(0,_804.value.length);
}
},0);
};
DataInputBinding.prototype.blur=function(_806){
if(this.isFocused==true){
DataInputBinding.superclass.blur.call(this);
if(!_806){
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
DataInputBinding.prototype.validate=function(_80a){
if(_80a==true||this._isValid){
var _80b=this.isValid();
if(_80b!=this._isValid){
this._isValid=_80b;
if(!_80b){
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._value=this.getValue();
this.dispatchAction(Binding.ACTION_INVALID);
if(!this.isFocused){
var _80c=null;
if(this._isInvalidBecauseRequired==true){
_80c=DataBinding.warnings["required"];
}else{
if(this._isInvalidBecauseMinLength==true){
_80c=DataBinding.warnings["minlength"];
_80c=_80c.replace("${count}",String(this.minlength));
}else{
if(this._isInvalidBecauseMaxLength==true){
_80c=DataBinding.warnings["maxlength"];
_80c=_80c.replace("${count}",String(this.maxlength));
}else{
_80c=DataBinding.warnings[this.type];
}
}
}
this.shadowTree.input.className=DataBinding.CLASSNAME_WARNING;
if(_80c!=null){
if(this.isPassword){
if(Client.isMozilla){
this.shadowTree.input.type="text";
this.setValue(_80c);
}else{
alert(_80c);
}
}else{
this.setValue(_80c);
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
var _80d=true;
this._isInvalidBecauseRequired=false;
this._isInvalidBecauseMinLength=false;
this._isInvalidaBecuaseMaxLength=false;
var _80e=this.getValue();
if(_80e==""){
if(this.isRequired==true){
_80d=false;
this._isInvalidBecauseRequired=true;
}
}else{
if(this.type!=null){
var _80f=DataBinding.expressions[this.type];
if(!_80f.test(_80e)){
_80d=false;
}
}else{
if(this.expression!=null){
if(!this.expression.test(_80e)){
_80d=false;
}
}
}
}
if(_80d&&this.minlength!=null){
if(_80e.length<this.minlength){
this._isInvalidBecauseMinLength=true;
_80d=false;
}
}
if(_80d&&this.maxlength!=null){
if(_80e.length>this.maxlength){
this._isInvalidBecauseMaxLength=true;
_80d=false;
}
}
return _80d;
};
DataInputBinding.prototype.setDisabled=function(_810){
if(_810!=this.isDisabled){
if(_810){
this.attachClassName("isdisabled");
}else{
this.detachClassName("isdisabled");
}
var _811=this.shadowTree.input;
if(_810){
this._disabledHandler={handleEvent:function(e){
DOMEvents.preventDefault(e);
DOMEvents.stopPropagation(e);
}};
DOMEvents.addEventListener(_811,DOMEvents.MOUSEDOWN,this._disabledHandler);
}else{
DOMEvents.removeEventListener(_811,DOMEvents.MOUSEDOWN,this._disabledHandler);
this._disabledHandler=null;
}
if(Client.isExplorer){
this.shadowTree.input.disabled=_810;
this.shadowTree.input.unselectable=_810?"on":"off";
}
this.isDisabled=_810;
this.isFocusable=!_810;
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
};
DataInputBinding.prototype.setReadOnly=function(_813){
if(_813!=this.isReadOnly){
if(_813){
this.attachClassName("readonly");
}else{
this.detachClassName("readonly");
}
this.shadowTree.input.readOnly=_813;
this.isReadOnly=_813;
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
DataInputBinding.prototype.handleElement=function(_814){
return true;
};
DataInputBinding.prototype.updateElement=function(_815){
var _816=_815.getAttribute("value");
var _817=_815.getAttribute("type");
var _818=_815.getAttribute("maxlength");
var _819=_815.getAttribute("minlength");
if(_816==null){
_816="";
}
var _81a=this.bindingWindow.UpdateManager;
if(this.getValue()!=_816){
_81a.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_816);
}
if(this.type!=_817){
_81a.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_817;
}
if(this.maxlength!=_818){
_81a.report("Property [maxlength] updated on binding \""+this.getID()+"\"");
this.maxlength=_818;
}
if(this.minlength!=_819){
_81a.report("Property [minlength] updated on binding \""+this.getID()+"\"");
this.minlength=_819;
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
DataInputBinding.prototype.setValue=function(_81b){
if(_81b===null){
_81b="";
}
if(_81b!=this.getValue()){
this.setProperty("value",_81b);
if(this.shadowTree.input!=null){
this.shadowTree.input.value=String(_81b);
}
}
};
DataInputBinding.prototype.getValue=function(){
var _81c=null;
if(this.shadowTree.input!=null){
_81c=this.shadowTree.input.value;
}else{
_81c=this.getProperty("value");
}
return _81c;
};
DataInputBinding.prototype.setName=function(name){
DataInputBinding.superclass.setName.call(this,name);
if(this.isAttached==true){
this.shadowTree.input.name=name;
}
};
DataInputBinding.prototype.getResult=function(){
var _81e=this.getValue();
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_81e=Number(_81e);
break;
}
return _81e;
};
DataInputBinding.prototype.setResult=DataInputBinding.prototype.setValue;
DataInputBinding.newInstance=function(_81f){
var _820=DOMUtil.createElementNS(Constants.NS_UI,"ui:datainput",_81f);
return UserInterface.registerBinding(_820,DataInputBinding);
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
var _821=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_821!=null){
this.setValue(_821.value);
_821.parentNode.removeChild(_821);
}
TextBoxBinding.superclass._buildDOMContent.call(this);
this.shadowTree.input.setAttribute("spellcheck","false");
if(!this._hasWordWrap){
this.shadowTree.input.setAttribute("wrap","off");
}
};
TextBoxBinding.prototype._getInputElement=function(){
var _822=DOMUtil.createElementNS(Constants.NS_XHTML,"textarea",this.bindingDocument);
_822.tabIndex=-1;
return _822;
};
TextBoxBinding.prototype.handleElement=function(_823){
return true;
};
TextBoxBinding.prototype.updateElement=function(_824){
var _825,area=_824.getElementsByTagName("textarea").item(0);
if(area!=null&&area.hasChildNodes()){
_825=DOMUtil.getTextContent(area);
}
if(_825==null){
_825="";
}
var _827=this.bindingWindow.UpdateManager;
if(this.getValue()!=_825){
_827.report("Property [value] updated on binding \""+this.getID()+"\"");
this.setValue(_825);
}
var _828=_824.getAttribute("type");
if(this.type!=_828){
_827.report("Property [type] updated on binding \""+this.getID()+"\"");
this.type=_828;
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
IEEditorTextBoxBinding.prototype._handleTabKey=function(_82c){
var _82d=this.bindingDocument.selection.createRange();
var _82e=_82d.text=="";
if(_82e&&!_82c){
_82d.text="\t";
}else{
var text="";
var _830=_82d.text.length;
while((_82d.moveStart("word",-1)&&_82d.text.charAt(1)!="\n")){
}
_82d.moveStart("character",1);
var _831=0;
var i=0,line,_834=_82d.text.split("\n");
while((line=_834[i++])!=null){
if(_82c){
line=line.replace(/^(\s)/mg,"");
_831++;
}else{
line=line.replace(/^(.)/mg,"\t$1");
}
text+=line+(_834[i+1]?"\n":"");
}
_82d.text=text;
_82d.moveStart("character",-_830);
if(_82c){
_82d.moveStart("character",2*_834.length-2);
}
_82d.select();
}
};
IEEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _835=this.bindingDocument.selection.createRange();
var _836=_835.duplicate();
while((_836.moveStart("word",-1)&&_836.text.indexOf("\n")==-1)){
}
_836.moveStart("character",1);
_835.text="\n"+_836.text.match(/^(\s)*/)[0]+"!";
_835.moveStart("character",-1);
_835.select();
_835.text="";
_835.select();
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
MozEditorTextBoxBinding.prototype._handleTabKey=function(_837){
var _838;
var _839;
var oss;
var osy;
var i;
var fnd;
var _83e=this._getSelectedText();
var el=this.shadowTree.input;
_838=el.scrollLeft;
_839=el.scrollTop;
if(!_83e.match(/\n/)){
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
_83e=this._getSelectedText();
if(_837){
ntext=_83e.replace(/^(\s)/mg,"");
}else{
ntext=_83e.replace(/^(.)/mg,"\t$1");
}
el.value=el.value.substr(0,el.selectionStart)+ntext+el.value.substr(el.selectionEnd);
el.selectionStart=oss;
el.selectionEnd=osy+(ntext.length-_83e.length);
}
el.scrollLeft=_838;
el.scrollTop=_839;
};
MozEditorTextBoxBinding.prototype._handleEnterKey=function(){
var _840;
var _841;
var oss;
var osy;
var el=this.shadowTree.input;
_840=el.scrollLeft;
_841=el.scrollTop;
oss=el.selectionStart;
osy=el.selectionEnd;
var bfs=el.value.substr(0,el.selectionStart);
var bfsm=bfs.split(/\r|\n/g);
var spm=bfsm[bfsm.length-1].match(/^(\s)*/);
el.value=el.value.substr(0,el.selectionStart)+"\n"+spm[0]+el.value.substr(el.selectionEnd);
el.selectionStart=oss+1+spm[0].length;
el.selectionEnd=oss+1+spm[0].length;
el.scrollLeft=_840;
el.scrollTop=_841;
};
MozEditorTextBoxBinding.prototype._getSelectedText=function(){
var _848=this.shadowTree.input.value;
var _849=this.shadowTree.input.selectionStart;
var end=this.shadowTree.input.selectionEnd;
return _848.substr(_849,end-_849);
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
var _84b=this.getProperty("isdisabled");
if(this.isDisabled||_84b){
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
var _84d=this.getProperty("label");
var _84e=this.getProperty("value");
var _84f=this.getProperty("width");
var _850=this.getProperty("onchange");
var _851=this.getProperty("required")==true;
if(!this.type&&type){
this.type=type;
}
if(!this.label&&_84d!=null){
this.label=_84d;
}
if(!this.value&&_84e!=null){
this.value=_84e;
}
if(!this.width&&_84f){
this.width=_84f;
}
if(_851){
this.isRequired=true;
}
if(_850){
this.onValueChange=function(){
Binding.evaluate(_850,this);
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
var _852=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_852.name=this.getName();
_852.value=this.getValue();
_852.type="hidden";
if(this.hasCallBackID()){
_852.id=this.getCallBackID();
}
this.shadowTree.input=_852;
this.bindingElement.appendChild(_852);
};
SelectorBinding.prototype.buildButton=function(){
var _853=this.BUTTON_IMPLEMENTATION;
var _854=this.add(_853.newInstance(this.bindingDocument));
if(this.imageProfile!=null){
_854.imageProfile=this.imageProfile;
}
if(this.width!=null){
_854.setWidth(this.width);
}
this._buttonBinding=_854;
this.shadowTree.button=_854;
_854.attach();
};
SelectorBinding.prototype.buildIndicator=function(){
var img=this.bindingDocument.createElement("img");
img.src=SelectorBinding.INDICATOR_IMAGE;
img.className="selectorindicatorimage";
this._buttonBinding.bindingElement.appendChild(img);
this.shadowTree.selectorindicatorimage=img;
};
SelectorBinding.prototype.buildPopup=function(){
var _856=top.app.bindingMap.selectorpopupset;
var doc=_856.bindingDocument;
var _858=_856.add(PopupBinding.newInstance(doc));
var _859=_858.add(MenuBodyBinding.newInstance(doc));
this._popupBinding=_858;
this._menuBodyBinding=_859;
this._popupBinding.attachClassName(SelectorBinding.CLASSNAME_POPUP);
this._popupBinding.attachRecursive();
this._popupBinding.type=PopupBinding.TYPE_FIXED;
_858.attachClassName("selectorpopup");
_858.addActionListener(PopupBinding.ACTION_SHOW,this);
_858.addActionListener(MenuItemBinding.ACTION_COMMAND,this);
_858.addActionListener(PopupBinding.ACTION_HIDE,this);
this._buttonBinding.setPopup(_858);
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
var _85c=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_85c).each(function(_85d){
var _85e=_85d.getAttribute("label");
var _85f=_85d.getAttribute("value");
var _860=_85d.getAttribute("selected");
var _861=_85d.getAttribute("image");
var _862=_85d.getAttribute("image-hover");
var _863=_85d.getAttribute("image-active");
var _864=_85d.getAttribute("image-disabled");
var _865=null;
if(_861||_862||_863||_864){
_865=new ImageProfile({image:_861,imageHover:_862,imageActive:_863,imageDisabled:_864});
}
list.add(new SelectorBindingSelection(_85e?_85e:null,_85f?_85f:null,_860&&_860=="true",_865));
});
return list;
};
SelectorBinding.prototype.populateFromList=function(list){
if(this.isAttached){
this.clear();
if(list.hasEntries()){
var _867=null;
while(list.hasNext()){
var _868=list.getNext();
var item=this.addSelection(_868);
if(!_867){
_867=item;
}
}
if(!this._selectedItemBinding){
this.select(_867,true);
}
this.shadowTree.selectorindicatorimage.style.display="block";
}else{
this.shadowTree.selectorindicatorimage.style.display="none";
}
}else{
throw "Could not populate unattached selector";
}
};
SelectorBinding.prototype.addSelection=function(_86a,_86b){
var _86c=this.MENUITEM_IMPLEMENTATION;
var _86d=this._menuBodyBinding;
var _86e=_86d.bindingDocument;
var _86f=_86c.newInstance(_86e);
_86f.imageProfile=_86a.imageProfile;
_86f.setLabel(_86a.label);
if(_86a.tooltip!=null){
_86f.setToolTip(_86a.tooltip);
}
_86f.selectionValue=_86a.value;
if(_86a.isSelected){
this.select(_86f,true);
}
_86a.menuItemBinding=_86f;
if(_86b){
_86d.addFirst(_86f);
this.selections.addFirst(_86a);
}else{
_86d.add(_86f);
this.selections.add(_86a);
}
this._isUpToDate=false;
return _86f;
};
SelectorBinding.prototype.addSelectionFirst=function(_870){
return this.addSelection(_870,true);
};
SelectorBinding.prototype.clear=function(_871){
this._selectedItemBinding=null;
if(this._popupBinding){
this._popupBinding.clear();
this.selections.clear();
if(!_871&&this.defaultSelection!=null){
var _872=this.addSelection(this.defaultSelection);
this.select(_872,true);
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
SelectorBinding.prototype.setDisabled=function(_873){
if(this.isAttached==true){
var _874=this._buttonBinding;
this.shadowTree.selectorindicatorimage.style.display=_873?"none":"block";
_874.setDisabled(_873);
}
if(_873){
this.setProperty("isdisabled",true);
}else{
this.deleteProperty("isdisabled");
}
};
SelectorBinding.prototype.reset=function(_875){
if(this.defaultSelection!=null){
this.selectByValue(this.defaultSelection.value,_875);
}
};
SelectorBinding.prototype.handleAction=function(_876){
SelectorBinding.superclass.handleAction.call(this,_876);
switch(_876.type){
case ButtonBinding.ACTION_COMMAND:
this._onButtonCommand();
_876.consume();
break;
case PopupBinding.ACTION_SHOW:
this._onPopupShowing();
_876.consume();
break;
case MenuItemBinding.ACTION_COMMAND:
this._onMenuItemCommand(_876.target);
_876.consume();
break;
case PopupBinding.ACTION_HIDE:
var self=this;
setTimeout(function(){
if(self.isFocused){
self._grabKeyboard();
}
},0);
_876.consume();
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
SelectorBinding.prototype._onMenuItemCommand=function(_878){
this.select(_878);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
SelectorBinding.prototype._restoreSelection=function(){
if(this._selectedItemBinding){
this._selectedItemBinding.focus();
}
};
SelectorBinding.prototype._fitMenuToSelector=function(){
var _879=this._buttonBinding.bindingElement.offsetWidth+"px";
var _87a=this._popupBinding.bindingElement;
if(Client.isMozilla==true){
_87a.style.minWidth=_879;
}else{
_87a.style.width=_879;
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
SelectorBinding.prototype.handleBroadcast=function(_87c,arg){
SelectorBinding.superclass.handleBroadcast.call(this,_87c,arg);
switch(_87c){
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
SelectorBinding.prototype.select=function(_87f,_880){
var _881=false;
if(_87f!=this._selectedItemBinding){
this._selectedItemBinding=_87f;
_881=true;
var _882=this._buttonBinding;
this._selectionValue=_87f.selectionValue;
_882.setLabel(_87f.getLabel());
if(_87f.imageProfile!=null){
_882.imageProfile=_87f.imageProfile;
}
if(_882.imageProfile!=null){
_882.setImage(this.isDisabled==true?_882.imageProfile.getDisabledImage():_882.imageProfile.getDefaultImage());
}
this._updateImageLayout();
if(!_880){
this.onValueChange();
this.dispatchAction(SelectorBinding.ACTION_SELECTIONCHANGED);
this.dirty();
}
if(!this._isValid||(this.isRequired&&!_880)){
this.validate();
}
}
return _881;
};
SelectorBinding.prototype._relate=function(){
var _883=this.getProperty("relate");
if(_883){
var _884=this.bindingDocument.getElementById(_883);
if(_884){
var _885=UserInterface.getBinding(_884);
if(_885){
if(this.isChecked){
_885.show();
}else{
_885.hide();
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
SelectorBinding.prototype.selectByValue=function(_886,_887){
var _888=false;
var _889=this._menuBodyBinding;
var _88a=_889.getDescendantElementsByLocalName("menuitem");
while(_88a.hasNext()){
var _88b=UserInterface.getBinding(_88a.getNext());
if(_88b.selectionValue==_886){
_888=this.select(_88b,_887);
break;
}
}
return _888;
};
SelectorBinding.prototype.getValue=function(){
var _88c=this._selectionValue;
if(_88c!=null){
_88c=String(_88c);
}
return _88c;
};
SelectorBinding.prototype.setValue=function(_88d){
this.selectByValue(String(_88d),true);
};
SelectorBinding.prototype.getResult=function(){
var _88e=this._selectionValue;
if(_88e=="null"){
_88e=null;
}
if(_88e){
switch(this.type){
case DataBinding.TYPE_NUMBER:
case DataBinding.TYPE_INTEGER:
_88e=Number(_88e);
break;
}
}
return _88e;
};
SelectorBinding.prototype.setResult=function(_88f){
this.selectByValue(_88f,true);
};
SelectorBinding.prototype.validate=function(){
var _890=true;
if(this.isRequired==true&&this.defaultSelection!=null){
var _891=this.getValue();
if(_891==this.defaultSelection.value){
_890=false;
}
if(_890!=this._isValid){
if(_890){
this.dispatchAction(Binding.ACTION_VALID);
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.dispatchAction(Binding.ACTION_INVALID);
this.attachClassName(DataBinding.CLASSNAME_INVALID);
this._buttonBinding.setLabel(DataBinding.warnings["required"]);
}
}
this._isValid=_890;
}
return _890;
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
var _892=this._popupBinding;
if(!this._isUpToDate){
_892.attachRecursive();
this._isUpToDate=true;
}
};
SelectorBinding.prototype.handleElement=function(){
return true;
};
SelectorBinding.prototype.updateElement=function(_893,_894){
this.bindingWindow.UpdateManager.addUpdate(new this.bindingWindow.ReplaceUpdate(this.getID(),_893));
return true;
};
SelectorBinding.newInstance=function(_895){
var _896=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_895);
return UserInterface.registerBinding(_896,SelectorBinding);
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
var _899=this.getProperty("onchange");
this.isRequired=this.getProperty("required")==true;
if(this.hasCallBackID()){
this._select.id=this.getCallBackID();
}
if(_899){
this.onValueChange=function(){
Binding.evaluate(_899,this);
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
SimpleSelectorBinding.prototype.focus=function(_89c){
SimpleSelectorBinding.superclass.focus.call(this);
if(this.isFocused){
if(!_89c){
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
SimpleSelectorBinding.prototype._hack=function(_89d){
if(Client.isExplorer){
this._select.style.width=_89d?"auto":this._cachewidth+"px";
if(_89d){
if(this._select.offsetWidth<=this._cachewidth){
this._hack(false);
}
}
}
};
SimpleSelectorBinding.prototype.validate=function(){
var _89e=true;
if(this.isRequired){
if(this.getValue()==null){
_89e=false;
}
}
if(_89e!=this._isValid){
if(_89e){
this.detachClassName(DataBinding.CLASSNAME_INVALID);
}else{
this.attachClassName(DataBinding.CLASSNAME_INVALID);
var _89f=this._select;
var _8a0=_89f.options[_89f.selectedIndex];
var text=DOMUtil.getTextContent(_8a0);
_89f.blur();
_89f.style.color="#A40000";
_89f.style.fontWeight="bold";
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8a0,DataBinding.warnings["required"]);
}
_89f.onfocus=function(){
this.style.color="black";
this.style.fontWeight="normal";
this.onfocus=null;
if(!Client.isExplorer6){
DOMUtil.setTextContent(_8a0,text);
}
};
}
this._isValid=_89e;
}
return _89e;
};
SimpleSelectorBinding.prototype.manifest=function(){
};
SimpleSelectorBinding.prototype.getValue=function(){
var _8a2=null;
var _8a3=this._select;
var _8a4=_8a3.options[_8a3.selectedIndex];
var _8a5=true;
if(Client.isExplorer){
var html=_8a4.outerHTML.toLowerCase();
if(html.indexOf("value=")==-1){
_8a5=false;
}
}
if(_8a5){
_8a2=_8a4.getAttribute("value");
}
return _8a2;
};
SimpleSelectorBinding.prototype.setValue=function(_8a7){
};
SimpleSelectorBinding.prototype.getResult=function(){
return this.getValue();
};
SimpleSelectorBinding.prototype.setResult=function(_8a8){
this.setValue(_8a8);
};
SimpleSelectorBinding.newInstance=function(_8a9){
var _8aa=DOMUtil.createElementNS(Constants.NS_XHTML,"select",_8a9);
return UserInterface.registerBinding(_8aa,SimpleSelectorBinding);
};
function SelectorBindingSelection(_8ab,_8ac,_8ad,_8ae,_8af){
this._init(_8ab,_8ac,_8ad,_8ae,_8af);
}
SelectorBindingSelection.prototype={label:null,value:null,tooltip:null,isSelected:null,imageProfile:null,menuItemBinding:null,_init:function(_8b0,_8b1,_8b2,_8b3,_8b4){
if(_8b0!=null){
this.label=String(_8b0);
}
if(_8b1!=null){
this.value=String(_8b1);
}
if(_8b3!=null){
this.imageProfile=_8b3;
}
if(_8b4!=null){
this.tooltip=_8b4;
}
this.isSelected=_8b2?true:false;
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
var _8b5=this.addFirst(ToolBarButtonBinding.newInstance(this.bindingDocument));
_8b5.popupBindingTargetElement=this.shadowTree.input;
_8b5.setImage(DataInputSelectorBinding.INDICATOR_IMAGE);
_8b5.attach();
var self=this;
_8b5.oncommand=function(){
self._attachSelections();
};
this._buttonBinding=_8b5;
};
DataInputSelectorBinding.prototype.buildPopup=SelectorBinding.prototype.buildPopup;
DataInputSelectorBinding.prototype.buildSelections=function(){
var list=new List();
var _8b8=DOMUtil.getElementsByTagName(this.bindingElement,"selection");
new List(_8b8).each(function(_8b9){
if(_8b9.getAttribute("label")){
throw "label not supported - use value property!";
}else{
var _8ba=_8b9.getAttribute("value");
var _8bb=_8b9.getAttribute("selected");
var _8bc=_8b9.getAttribute("tooltip");
list.add({value:_8ba?_8ba:null,toolTip:_8bc?_8bc:null,isSelected:(_8bb&&_8bb=="true")?true:false});
}
});
if(list.hasEntries()){
this.populateFromList(list);
}
};
DataInputSelectorBinding.prototype.populateFromList=function(list){
var _8be=this._menuBodyBinding;
var _8bf=_8be.bindingDocument;
while(_8be.bindingElement.hasChildNodes()){
var node=_8be.bindingElement.lastChild;
if(node.nodeType==Node.ELEMENT_NODE&&UserInterface.hasBinding(node)){
UserInterface.getBinding(node).dispose();
}else{
_8be.removeChild(node);
}
}
if(list.hasEntries()){
this._isUpToDate=false;
if(!this._buttonBinding.isVisible){
this._buttonBinding.show();
}
while(list.hasNext()){
var _8c1=list.getNext();
var _8c2=MenuItemBinding.newInstance(_8bf);
_8c2.setLabel(_8c1.value);
_8c2.selectionValue=_8c1.value;
if(_8c1.toolTip){
_8c2.setToolTip(_8c1.toolTip);
}
if(_8c1.isSelected){
this.select(_8c2,true);
}
_8be.add(_8c2);
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
DataInputSelectorBinding.prototype._onMenuItemCommand=function(_8c3){
this.select(_8c3);
FocusBinding.focusElement(this.bindingElement);
this._grabKeyboard();
};
DataInputSelectorBinding.prototype.handleBroadcast=function(_8c4,arg){
SelectorBinding.prototype.handleBroadcast.call(this,_8c4,arg);
switch(_8c4){
case BroadcastMessages.MOUSEEVENT_MOUSEDOWN:
if(arg!=this._buttonBinding){
DataInputSelectorBinding.superclass.handleBroadcast.call(this,_8c4,arg);
}
break;
}
};
DataInputSelectorBinding.prototype._grabKeyboard=SelectorBinding.prototype._grabKeyboard;
DataInputSelectorBinding.prototype._releaseKeyboard=SelectorBinding.prototype._releaseKeyboard;
DataInputSelectorBinding.prototype._handleArrowKey=SelectorBinding.prototype._handleArrowKey;
DataInputSelectorBinding.prototype.focus=function(_8c6){
if(!this.isFocused){
DataInputSelectorBinding.superclass.focus.call(this,_8c6);
if(this.isFocused==true){
this._grabKeyboard();
}
}
};
DataInputSelectorBinding.prototype.blur=function(_8c7){
if(this.isFocused==true){
DataInputSelectorBinding.superclass.blur.call(this,_8c7);
this._releaseKeyboard();
if(this._popupBinding.isVisible){
this._popupBinding.hide();
}
}
};
DataInputSelectorBinding.prototype._fitMenuToSelector=function(){
var _8c8=this.bindingElement.offsetWidth+"px";
var _8c9=this._popupBinding.bindingElement;
if(Client.isMozilla){
_8c9.style.minWidth=_8c8;
}else{
_8c9.style.width=_8c8;
}
};
DataInputSelectorBinding.prototype._restoreSelection=function(){
if(!this._isUpToDate){
this._attachSelections();
}
var _8ca=this._menuBodyBinding.getDescendantBindingsByLocalName("menuitem");
var _8cb=this.getValue();
var _8cc=null;
_8ca.each(function(item){
if(item.getLabel()==_8cb){
_8cc=item;
}
});
if(_8cc){
_8cc.focus();
}
};
DataInputSelectorBinding.prototype.select=function(item,_8cf){
if(item!=this._selectedItemBinding){
this._selectedItemBinding=item;
this.setValue(item.selectionValue);
if(!_8cf){
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
var _8d0=ToolBarButtonBinding.newInstance(this.bindingDocument);
_8d0.setImage("${icon:popup}");
this.addFirst(_8d0);
_8d0.attach();
var self=this;
_8d0.oncommand=function(){
self._isButtonClicked=true;
setTimeout(function(){
self._isButtonClicked=false;
},1000);
var _8d2=self.getProperty("handle");
var _8d3=ViewDefinitions[_8d2];
if(_8d3 instanceof DialogViewDefinition){
_8d3.handler={handleDialogResponse:function(_8d4,_8d5){
self._isButtonClicked=false;
if(_8d4==Dialog.RESPONSE_ACCEPT){
self.logger.debug("Usecase scenario was hardcoded into DataInputDialogBinding#buildButton");
var _8d6=_8d5.getFirst();
self.setValue(_8d6);
self.validate(true);
}
self.focus();
}};
_8d3.argument.selectedResult=self.getValue();
StageBinding.presentViewDefinition(_8d3);
}else{
throw "Definition was either undefine or of a non-dialog type.";
}
};
DOMEvents.addEventListener(_8d0.getBindingElement(),DOMEvents.MOUSEDOWN,{handleEvent:function(e){
self._isButtonClicked=true;
}});
this._dialogButtonBinding=_8d0;
};
DataInputDialogBinding.prototype.oncommand=function(){
var _8d8=this._dialogButtonBinding;
if(_8d8!=null){
_8d8.oncommand();
}
};
DataInputDialogBinding.prototype.validate=function(arg){
var _8da=true;
if(this._isButtonClicked==true){
this._isButtonClicked=false;
}else{
_8da=DataInputDialogBinding.superclass.validate.call(this,arg);
}
return _8da;
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
var _8db=this.getProperty("label");
var _8dc=this.getProperty("tooltip");
this._buttonBinding=this.add(ClickButtonBinding.newInstance(this.bindingDocument));
if(_8db!=null){
if(this.getProperty("handle")!=null||this.getProperty("url")!=null){
this._buttonBinding.setLabel(_8db+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}else{
this._buttonBinding.setLabel(_8db);
}
}
if(this.imageProfile){
this._buttonBinding.imageProfile=this.imageProfile;
}
if(_8dc!=null){
this._buttonBinding.setToolTip(_8dc);
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
DataDialogBinding.prototype.handleAction=function(_8de){
DataDialogBinding.superclass.handleAction.call(this,_8de);
var _8df=_8de.target;
var self=this;
switch(_8de.type){
case ButtonBinding.ACTION_COMMAND:
if(this._handler==null){
this._handler={handleDialogResponse:function(_8e1,_8e2){
if(_8e1==Dialog.RESPONSE_ACCEPT){
if(_8e2 instanceof DataBindingMap){
self._map=_8e2;
}else{
throw "Invalid dialog result";
}
}
}};
}
if(_8df==this._buttonBinding){
_8de.consume();
this.focus();
this.fireCommand();
}
break;
}
};
DataDialogBinding.prototype.handleBroadcast=function(_8e3,arg){
DataDialogBinding.superclass.handleBroadcast.call(this,_8e3,arg);
switch(_8e3){
case BroadcastMessages.KEY_SPACE:
this.fireCommand();
break;
}
};
DataDialogBinding.prototype.fireCommand=function(def){
this.dispatchAction(this.constructor.ACTION_COMMAND);
var _8e6=this.getProperty("handle");
var url=this.getURL();
var _8e8=null;
if(_8e6!=null||def!=null){
if(_8e6!=null){
_8e8=ViewDefinitions[_8e6];
}else{
_8e8=def;
}
if(_8e8 instanceof DialogViewDefinition){
_8e8.handler=this._handler;
if(this._map!=null){
_8e8.argument=this._map;
}
StageBinding.presentViewDefinition(_8e8);
}
}else{
if(url!=null){
_8e8=Dialog.invokeModal(url,this._handler,this._map);
}
}
if(_8e8!=null){
this._dialogViewHandle=_8e8.handle;
this._releaseKeyboard();
}
};
DataDialogBinding.prototype.setLabel=function(_8e9){
this.setProperty("label",_8e9);
if(this.isAttached){
this._buttonBinding.setLabel(_8e9+LabelBinding.DIALOG_INDECATOR_SUFFIX);
}
};
DataDialogBinding.prototype.setImage=function(_8ea){
this.setProperty("image",_8ea);
if(this.imageProfile!=null){
this.imageProfile.setDefaultImage(_8ea);
if(this._buttonBinding!=null){
this._buttonBinding.imageProfile=this.imageProfile;
this._buttonBinding.setImage(this._buttonBinding.imageProfile.getDefaultImage());
}
}
};
DataDialogBinding.prototype.setToolTip=function(_8eb){
this.setProperty("tooltip",_8eb);
if(this.isAttached){
this._buttonBinding.setToolTip(_8eb);
}
};
DataDialogBinding.prototype.setHandle=function(_8ec){
this.setProperty("handle",_8ec);
};
DataDialogBinding.prototype.setURL=function(url){
this.setProperty("url",url);
};
DataDialogBinding.prototype.getURL=function(){
return this.getProperty("url");
};
DataDialogBinding.prototype.setHandler=function(_8ee){
this._handler=_8ee;
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
DataDialogBinding.newInstance=function(_8f0){
var _8f1=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_8f0);
return UserInterface.registerBinding(_8f1,DataDialogBinding);
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
this._handler={handleDialogResponse:function(_8f3,_8f4){
if(_8f3==Dialog.RESPONSE_ACCEPT){
self._onDialogAccept(_8f4);
}else{
self._onDialogCancel();
}
}};
};
PostBackDataDialogBinding.prototype._onDialogAccept=function(_8f5){
_8f5=new String(_8f5);
this.dirty();
this.setValue(encodeURIComponent(_8f5));
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
var _8f9=this.getValue();
if(_8f9==null){
_8f9="";
}
this.shadowTree.dotnetinput.value=_8f9;
};
PostBackDataDialogBinding.prototype.setValue=function(_8fa){
this.setProperty("value",_8fa);
};
PostBackDataDialogBinding.prototype.getValue=function(){
return this.getProperty("value");
};
PostBackDataDialogBinding.prototype.getResult=function(){
return null;
};
PostBackDataDialogBinding.prototype.setResult=function(_8fb){
};
PostBackDataDialogBinding.newInstance=function(_8fc){
var _8fd=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_8fc);
return UserInterface.registerBinding(_8fd,PostBackDataDialogBinding);
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
var _8fe=this.getProperty("dialoglabel");
var _8ff=this.getProperty("providersearch");
var key=this.getProperty("providerkey");
var _901=this.getProperty("handle");
if(_901!=null){
var def=ViewDefinition.clone(_901,"Generated.ViewDefinition.Handle."+KeyMaster.getUniqueKey());
if(_8fe!=null){
if(def.argument==null){
def.argument={};
}
def.argument.label=_8fe;
}
if(_8ff!=null){
if(def.argument==null){
def.argument={};
}
if(def.argument.nodes==null){
def.argument.nodes=[];
}
def.argument.nodes[0].search=_8ff;
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
ViewDefinitionPostBackDataDialogBinding.newInstance=function(_903){
var _904=DOMUtil.createElementNS(Constants.NS_UI,"ui:postbackdialog",_903);
return UserInterface.registerBinding(_904,ViewDefinitionPostBackDataDialogBinding);
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
this.propertyMethodMap["value"]=function(_906){
self._datathing.setValue(_906);
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
var _909=self.getValue();
if(_909==""||_909==null){
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
var _90a=this.getProperty("value");
var _90b=this.getProperty("selectorlabel");
if(_90b==null){
_90b=NullPostBackDataDialogBinding.LABEL_DEFAULT;
}
var list=new List();
list.add(new SelectorBindingSelection(NullPostBackDataDialogBinding.LABEL_NULL,NullPostBackDataDialogBinding.VALUE_NULL,_90a==null));
list.add(new SelectorBindingSelection(_90b+LabelBinding.DIALOG_INDECATOR_SUFFIX,NullPostBackDataDialogBinding.VALUE_SELECTED,_90a!=null,new ImageProfile({image:"${icon:popup}"})));
this._selector.master=this;
this._selector.attach();
this._selector.populateFromList(list);
var _90a=this.getValue();
if(_90a==""||_90a==null){
this._selector.setLabel(NullPostBackDataDialogBinding.LABEL_NULL);
}else{
this._selector.setLabel(this.getLabel());
}
};
NullPostBackDataDialogBinding.prototype.handleAction=function(_90d){
NullPostBackDataDialogBinding.superclass.handleAction.call(this,_90d);
switch(_90d.type){
case PageBinding.ACTION_DOPOSTBACK:
if(_90d.target==this._datathing){
var _90e=this.getProperty("label");
this._selector.setLabel("");
this.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
var self=this;
setTimeout(function(){
if(self.getProperty("label")==_90e){
self._selector.setLabel(_90e);
}
},500);
_90d.consume();
}
break;
}
};
NullPostBackDataDialogBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
NullPostBackDataDialogBinding.prototype.setLabel=function(_910){
this.setProperty("label",_910);
if(this._selector!=null){
this._selector.setLabel(_910);
}
};
NullPostBackDataDialogBinding.prototype.getValue=function(){
return this._datathing.getValue();
};
NullPostBackDataDialogBinding.prototype.setValue=function(_911){
this._datathing.setValue(_911);
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
NullPostBackDataDialogSelectorBinding.prototype.select=function(_912,_913){
if(NullPostBackDataDialogSelectorBinding.superclass.select.call(this,_912,_913)){
this._buttonBinding.setImage(null);
this._updateImageLayout();
if(this._selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
if(this.master.getValue()!=null){
}
}
}
};
NullPostBackDataDialogSelectorBinding.prototype.setLabel=function(_914){
this._buttonBinding.setLabel(_914);
};
NullPostBackDataDialogSelectorBinding.prototype.setToolTip=function(_915){
this._buttonBinding.setToolTip(_915);
};
NullPostBackDataDialogSelectorBinding.prototype.handleAction=function(_916){
NullPostBackDataDialogSelectorBinding.superclass.handleAction.call(this,_916);
switch(_916.type){
case MenuItemBinding.ACTION_COMMAND:
var _917=_916.target;
var _918=this.master;
if(_917.selectionValue==NullPostBackDataDialogBinding.VALUE_SELECTED){
this.setLabel(_917.getLabel());
setTimeout(function(){
_918.action();
},0);
}else{
this.master.setValue("");
}
_918.dirty();
break;
}
};
NullPostBackDataDialogSelectorBinding.prototype.manifest=function(){
};
NullPostBackDataDialogSelectorBinding.newInstance=function(_919){
var _91a=DOMUtil.createElementNS(Constants.NS_UI,"ui:selector",_919);
return UserInterface.registerBinding(_91a,NullPostBackDataDialogSelectorBinding);
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
var _91b=this._dataDialogBinding;
if(_91b!=null){
DOMEvents.addEventListener(this.shadowTree.box,DOMEvents.DOUBLECLICK,{handleEvent:function(){
_91b.fireCommand();
}});
}
};
MultiSelectorBinding.prototype._buildDOMContent=function(){
this.shadowTree.box=DOMUtil.createElementNS(Constants.NS_UI,"ui:box",this.bindingDocument);
this.bindingElement.appendChild(this.shadowTree.box);
};
MultiSelectorBinding.prototype._parseDOMProperties=function(){
var _91c=this.getProperty("editable");
var _91d=this.getProperty("selectable");
var _91e=this.getProperty("display");
if(_91c!=false){
this._buildEditorButton();
}else{
this.isEditable=false;
}
if(_91d){
this.isSelectable=true;
this._selectionMap=new Map();
}
if(_91e){
this._display=_91e;
}
};
MultiSelectorBinding.prototype._buildEditorButton=function(){
if(this.isEditable){
var _91f=MultiSelectorDataDialogBinding.newInstance(this.bindingDocument);
_91f.selections=this.selections;
this.add(_91f);
_91f.attach();
this._dataDialogBinding=_91f;
this.shadowTree.datadialog=_91f;
}
};
MultiSelectorBinding.prototype.populateFromList=function(list){
list.reset();
var _921=false;
this.shadowTree.box.innerHTML="";
while(list.hasNext()){
var _922=list.getNext();
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_921=_922.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_921=_922.isSelected!=true;
break;
}
if(_921){
this.shadowTree.box.appendChild(this._getElementForSelection(_922));
}
}
this.selections=list;
if(this._dataDialogBinding){
this._dataDialogBinding.selections=this.selections;
}
};
MultiSelectorBinding.prototype.cumulateFromList=function(list,_924){
var box=this.shadowTree.box;
var _926=false;
if(list.hasEntries()){
list.reverse().reset();
while(list.hasNext()){
var _927=list.getNext();
if(_924){
_927.isSelected=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
_926=true;
}else{
switch(this._display){
case MultiSelectorBinding.DISPLAY_SELECTED:
_926=_927.isSelected;
break;
case MultiSelectorBinding.DISPLAY_UNSELECTED:
_926=_927.isSelected!=true;
break;
}
}
if(_926){
var _928=this._getElementForSelection(_927);
box.insertBefore(_928,box.firstChild);
CSSUtil.attachClassName(_928,"selected");
this._selectionMap.set(_927.value,_928);
}
}
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
};
MultiSelectorBinding.prototype._getElementForSelection=function(_929){
var _92a=DOMUtil.createElementNS(Constants.NS_XHTML,"div",this.bindingDocument);
_92a.appendChild(this.bindingDocument.createTextNode(_929.label));
_92a.setAttribute("label",_929.label);
_92a.setAttribute("value",_929.value);
return _92a;
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
var _92c=DOMEvents.getTarget(e);
var _92d=DOMUtil.getLocalName(_92c);
if(_92d=="div"){
this._handleMouseDown(_92c);
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
break;
}
};
MultiSelectorBinding.prototype._handleMouseDown=function(_92e){
if(Keyboard.isShiftPressed&&this._lastSelectedElement){
var _92f=this._getElements();
var _930=_92e.getAttribute("value");
var _931=this._lastSelectedElement.getAttribute("value");
var _932=false;
while(_92f.hasNext()){
var el=_92f.getNext();
switch(el.getAttribute("value")){
case _930:
case _931:
_932=!_932;
break;
}
if(_932){
this._hilite(el);
}else{
this._unhilite(el);
}
this._hilite(this._lastSelectedElement);
this._hilite(_92e);
}
}else{
if(Keyboard.isControlPressed&&this._isHilited(_92e)){
this._unhilite(_92e);
}else{
this._hilite(_92e);
}
if(!Keyboard.isControlPressed){
var self=this;
this._getElements().each(function(el){
if(el!=_92e){
self._unhilite(el);
}
});
}
}
this._lastSelectedElement=_92e;
};
MultiSelectorBinding.prototype._hilite=function(_936){
var _937=_936.getAttribute("value");
if(!this._selectionMap.has(_937)){
CSSUtil.attachClassName(_936,"selected");
this._selectionMap.set(_937,_936);
}
};
MultiSelectorBinding.prototype._unhilite=function(_938){
var _939=_938.getAttribute("value");
if(this._selectionMap.has(_939)){
CSSUtil.detachClassName(_938,"selected");
this._selectionMap.del(_939);
}
};
MultiSelectorBinding.prototype._isHilited=function(_93a){
return CSSUtil.hasClassName(_93a,"selected");
};
MultiSelectorBinding.prototype.handleAction=function(_93b){
MultiSelectorBinding.superclass.handleAction.call(this,_93b);
var _93c=_93b.target;
switch(_93b.type){
case DataDialogBinding.ACTION_COMMAND:
if(_93c==this._dataDialogBinding){
if(!this.isFocused){
this.focus();
}
this.dispatchAction(MultiSelectorBinding.ACTION_COMMAND);
_93b.consume();
}
break;
case MultiSelectorDataDialogBinding.ACTION_RESULT:
this.populateFromList(_93c.result);
this.dirty();
_93c.result=null;
_93b.consume();
break;
}
};
MultiSelectorBinding.prototype.extractSelected=function(){
var _93d=null;
if(this.isSelectable){
_93d=new List();
if(this._selectionMap&&this._selectionMap.hasEntries()){
var self=this;
this._getElements().each(function(_93f){
if(self._isHilited(_93f)){
_93f.parentNode.removeChild(_93f);
_93d.add(new SelectorBindingSelection(_93f.getAttribute("label"),_93f.getAttribute("value"),true));
}
});
this._selectionMap=new Map();
this.dispatchAction(MultiSelectorBinding.ACTION_SELECTIONCHANGED);
}
}
return _93d;
};
MultiSelectorBinding.prototype.reposition=function(isUp){
var _941=this._getElements();
if(!isUp){
_941.reverse();
}
var _942=true;
while(_942&&_941.hasNext()){
var _943=_941.getNext();
if(this._isHilited(_943)){
switch(isUp){
case true:
if(_943.previousSibling){
_943.parentNode.insertBefore(_943,_943.previousSibling);
}else{
_942=false;
}
break;
case false:
if(_943.nextSibling){
_943.parentNode.insertBefore(_943,_943.nextSibling.nextSibling);
}else{
_942=false;
}
break;
}
}
}
};
MultiSelectorBinding.prototype.toSelectionList=function(){
var _944=new List();
var _945=this._display==MultiSelectorBinding.DISPLAY_SELECTED;
var self=this;
this._getElements().each(function(_947){
var _948=new SelectorBindingSelection(_947.getAttribute("label"),_947.getAttribute("value"),_945);
_948.isHighlighted=self._isHilited(_947);
_944.add(_948);
});
return _944;
};
MultiSelectorBinding.prototype._getElements=function(){
return new List(DOMUtil.getElementsByTagName(this.shadowTree.box,"div"));
};
MultiSelectorBinding.prototype._getSelectionsList=SelectorBinding.prototype._getSelectionsList;
MultiSelectorBinding.prototype.validate=function(){
return true;
};
MultiSelectorBinding.prototype.manifest=function(){
var _949=new List(DOMUtil.getElementsByTagName(this.bindingElement,"input"));
if(_949.hasEntries()){
_949.each(function(_94a){
_94a.parentNode.removeChild(_94a);
});
}
this.selections.reset();
while(this.selections.hasNext()){
var _94b=this.selections.getNext();
if(_94b.isSelected){
var _94c=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_94c.name=this._name;
_94c.value=_94b.value;
this.bindingElement.appendChild(_94c);
}
}
};
MultiSelectorBinding.prototype.getValue=function(){
return "HEJ!";
};
MultiSelectorBinding.prototype.setValue=function(_94d){
alert(_94d);
};
MultiSelectorBinding.prototype.getResult=function(){
alert("TODO: MultiSelectorBinding#getResult");
return new Array();
};
MultiSelectorBinding.prototype.setResult=function(_94e){
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
var _94f={label:DataBinding.getAssociatedLabel(this),value:decodeURIComponent(this.getValue()),configuration:{"formattingconfiguration":this.getProperty("formattingconfiguration"),"elementclassconfiguration":this.getProperty("elementclassconfiguration"),"configurationstylesheet":this.getProperty("configurationstylesheet"),"presentationstylesheet":this.getProperty("presentationstylesheet"),"embedablefieldstypenames":this.getProperty("embedablefieldstypenames")}};
var _950=ViewDefinitions["Composite.Management.VisualEditorDialog"];
_950.handler=this._handler;
_950.argument=_94f;
StageBinding.presentViewDefinition(_950);
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
var _951={label:DataBinding.getAssociatedLabel(this),selections:this.selections};
var self=this;
var _953={handleDialogResponse:function(_954,_955){
if(_954==Dialog.RESPONSE_ACCEPT){
self.result=_955;
self.dispatchAction(MultiSelectorDataDialogBinding.ACTION_RESULT);
}
}};
var _956=ViewDefinitions[this._dialogViewHandle];
_956.handler=_953;
_956.argument=_951;
StageBinding.presentViewDefinition(_956);
};
MultiSelectorDataDialogBinding.newInstance=function(_957){
var _958=DOMUtil.createElementNS(Constants.NS_UI,"ui:datadialog",_957);
return UserInterface.registerBinding(_958,MultiSelectorDataDialogBinding);
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
LazyBindingBinding.wakeUp=function(_959){
var id=_959.bindingElement.id+LazyBindingBinding.ID_APPENDIX;
var _95b=_959.bindingDocument.getElementById(id);
if(_95b!=null){
var _95c=UserInterface.getBinding(_95b);
_95c.setResult(true);
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
var _95e=this.bindingDocument.getElementById(id);
if(_95e!=null){
var _95f=UserInterface.getBinding(_95e);
if(_95f&&!_95f.isAttached){
_95f.isLazy=true;
}else{
_95e.setAttribute("lazy",true);
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
LazyBindingBinding.prototype.setResult=function(_960){
this._isLazy=_960;
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
var _962=this.getProperty("stateprovider");
var _963=this.getProperty("handle");
if(_962!=null&&_963!=null){
url=url.replace("${stateprovider}",_962).replace("${handle}",_963);
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
EditorDataBinding.prototype._onPageInitialize=function(_964){
EditorDataBinding.superclass._onPageInitialize.call(this,_964);
if(this._pageBinding!=null){
Application.unlock(this);
this._coverBinding.hide();
}
};
EditorDataBinding.prototype.setName=DataBinding.prototype.setName;
EditorDataBinding.prototype.validate=function(){
return this._pageBinding.validateAllDataBindings();
};
EditorDataBinding.prototype.handleAction=function(_965){
EditorDataBinding.superclass.handleAction.call(this,_965);
switch(_965.type){
case Binding.ACTION_DIRTY:
if(_965.target!=this){
if(!this.isDirty){
this.dirty();
}
_965.consume();
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
EditorDataBinding.prototype.setValue=function(_966){
};
EditorDataBinding.prototype.getResult=function(){
return null;
};
EditorDataBinding.prototype.setResult=function(_967){
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
var _96c=true;
if(this.getProperty("required")){
var fake=this.getDescendantBindingByLocalName("datainput");
_96c=fake.getValue()!="";
}
if(!_96c&&this._isValid){
this._isValid=false;
this.dispatchAction(Binding.ACTION_INVALID);
}else{
if(_96c&&!this._isValid){
this.dispatchAction(Binding.ACTION_VALID);
}
}
return _96c;
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
var _970=this.bindingDocument.getElementById(RequestBinding.INPUT_ID);
if(_970!=null){
_970.value=Application.CONSOLE_ID;
}
};
RequestBinding.prototype.postback=function(_971){
_971=_971!=null?_971:EditorPageBinding.message;
this.shadowTree.dotnetinput.value=_971;
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
var _972=Templates.getTemplateElementText("fieldgroupmatrix.xml");
var _973=_972.replace("MARKUP",this.bindingElement.innerHTML);
try{
this.bindingElement.innerHTML=_973;
}
catch(exception1){
this.logger.error("Exeption in innerHTML!");
_973=_973.replace(/\&nbsp;/g,"");
this.bindingElement.innerHTML=_973;
}
var self=this;
var _975=DOMUtil.getElementsByTagName(this.bindingElement,"table").item(0);
new List(_975.rows).each(function(row){
new List(row.cells).each(function(cell){
self.shadowTree[cell.className]=cell;
});
});
};
FieldGroupBinding.prototype._buildDOMContent=function(){
var _978=this.getProperty("label");
if(_978){
this.setLabel(_978);
}else{
this.attachClassName(FieldGroupBinding.CLASSNAME_NOLABEL);
}
};
FieldGroupBinding.prototype.setLabel=function(_979){
this.setProperty("label",_979);
if(this.shadowTree.labelBinding==null){
var _97a=LabelBinding.newInstance(this.bindingDocument);
var cell=this.shadowTree[FieldGroupBinding.NORTH];
_97a.attachClassName("fieldgrouplabel");
cell.insertBefore(_97a.bindingElement,cell.getElementsByTagName("div").item(1));
_97a.attach();
this.shadowTree.labelBinding=_97a;
}
this.shadowTree.labelBinding.setLabel(Resolver.resolve(_979));
};
FieldGroupBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
FieldGroupBinding.prototype.add=function(_97c){
this.shadowTree[FieldGroupBinding.CENTER].appendChild(_97c.bindingElement);
return _97c;
};
FieldGroupBinding.prototype.addFirst=function(_97d){
var _97e=this.shadowTree[FieldGroupBinding.CENTER];
_97e.insertBefore(_97d.bindingElement,_97e.firstChild);
return _97d;
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
var _97f=this.getProperty("relation");
if(_97f!=null){
this.bindingRelation=_97f;
this.subscribe(BroadcastMessages.BINDING_RELATE);
this.hide();
}
};
FieldBinding.prototype.handleBroadcast=function(_980,arg){
FieldBinding.superclass.handleBroadcast.call(this,_980,arg);
switch(_980){
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
FieldBinding.newInstance=function(_982){
var _983=DOMUtil.createElementNS(Constants.NS_UI,"ui:field",_982);
return UserInterface.registerBinding(_983,FieldBinding);
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
var _984=this.getDescendantBindingByLocalName("fieldgroup");
if(_984!=null){
_984.attachClassName(FieldGroupBinding.CLASSNAME_FIRST);
}
};
FieldsBinding.prototype.onBindingDispose=function(){
FieldsBinding.superclass.onBindingDispose.call(this);
if(this._invalidCount>0){
this.dispatchAction(Binding.ACTION_VALID);
}
};
FieldsBinding.prototype.validate=function(){
var _985=true;
var _986=this.getDescendantBindingsByLocalName("*");
while(_986.hasNext()){
var _987=_986.getNext();
if(Interfaces.isImplemented(IData,_987)){
var _988=_987.validate();
if(_985&&!_988){
_985=false;
}
}
}
return _985;
};
FieldsBinding.prototype.handleAction=function(_989){
FieldsBinding.superclass.handleAction.call(this,_989);
var _98a=_989.target;
if(_98a!=this){
switch(_989.type){
case Binding.ACTION_INVALID:
var _98b=DataBinding.getAssociatedLabel(_98a);
if(_98b){
this._invalidFieldLabels.set(_98a.key,_98b);
}
if(_98a.error){
if(!_98a.isInvalidBecauseRequired){
ErrorBinding.presentError({text:_98a.error},_98a);
}
}
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_INVALID);
}
this._invalidCount++;
_989.consume();
break;
case Binding.ACTION_VALID:
if(this._invalidFieldLabels.has(_98a.key)){
this._invalidFieldLabels.del(_98a.key);
}
this._invalidCount--;
if(this._invalidCount==0){
this.dispatchAction(Binding.ACTION_VALID);
}
_989.consume();
break;
}
}
};
FieldsBinding.prototype.getInvalidLabels=function(){
var _98c=null;
if(this._invalidFieldLabels.hasEntries()){
_98c=this._invalidFieldLabels.toList();
}
return _98c;
};
FieldsBinding.newInstance=function(_98d){
var _98e=DOMUtil.createElementNS(Constants.NS_UI,"ui:fields",_98d);
return UserInterface.registerBinding(_98e,FieldsBinding);
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
var _98f=this.getProperty("image");
if(_98f){
this.setImage(_98f);
}
var _990=this.getProperty("tooltip");
if(_990){
this.setToolTip(_990);
}
var _991=this.getProperty("label");
if(_991){
this.setLabel(_991);
}
};
FieldDescBinding.prototype.attachDOMEvents=function(){
this.addEventListener(DOMEvents.CLICK);
};
FieldDescBinding.prototype.handleEvent=function(e){
FieldDescBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.CLICK:
var _993=this.getAncestorBindingByLocalName("field");
if(_993){
var _994=true;
_993.getDescendantBindingsByLocalName("*").each(function(_995){
if(Interfaces.isImplemented(IData,_995)){
_995.focus();
_994=false;
}
return _994;
});
}
break;
}
};
FieldDescBinding.prototype.setLabel=function(_996){
this.setProperty("label",_996);
if(this.isAttached){
this.bindingElement.innerHTML=Resolver.resolve(_996);
}
};
FieldDescBinding.prototype.getLabel=function(){
var _997=this.getProperty("label");
if(!_997){
var node=this.bindingElement.firstChild;
if(node&&node.nodeType==Node.TEXT_NODE){
_997=node.data;
}
}
return _997;
};
FieldDescBinding.prototype.setImage=function(_999){
this.setProperty("image",_999);
if(this.isAttached){
throw "FieldDescBinding: Images not suppoerted!";
}
};
FieldDescBinding.prototype.setToolTip=function(_99a){
this.setProperty("tooltip",_99a);
if(this.isAttached){
this.bindingElement.title=_99a;
}
};
FieldDescBinding.newInstance=function(_99b){
var _99c=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddesc",_99b);
return UserInterface.registerBinding(_99c,FieldDescBinding);
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
FieldDataBinding.newInstance=function(_99d){
var _99e=DOMUtil.createElementNS(Constants.NS_UI,"ui:fielddata",_99d);
return UserInterface.registerBinding(_99e,FieldDataBinding);
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
var _99f=this._fieldHelpPopupBinding;
if(_99f){
_99f.dispose();
}
};
FieldHelpBinding.prototype.buildPopupBinding=function(){
var _9a0=app.bindingMap.fieldhelpopupset;
var doc=_9a0.bindingDocument;
var _9a2=_9a0.add(PopupBinding.newInstance(doc));
var _9a3=_9a2.add(PopupBodyBinding.newInstance(doc));
_9a2.position=PopupBinding.POSITION_RIGHT;
_9a2.attachClassName("fieldhelppopup");
if(this.bindingElement.hasChildNodes()){
_9a3.bindingElement.innerHTML=this.bindingElement.innerHTML;
}else{
var _9a4=this.getProperty("label");
if(_9a4){
_9a3.bindingElement.innerHTML=Resolver.resolve(_9a4);
}
}
this.bindingElement.innerHTML="";
this._fieldHelpPopupBinding=_9a2;
};
FieldHelpBinding.prototype.buildPopupButton=function(){
var _9a5=this.getAncestorBindingByLocalName("field");
if(_9a5){
_9a5.attachClassName("fieldhelp");
var _9a6=ClickButtonBinding.newInstance(this.bindingDocument);
_9a6.attachClassName("fieldhelp");
_9a6.setImage(FieldHelpBinding.INDICATOR_IMAGE);
this.add(_9a6);
_9a6.attach();
var self=this;
_9a6.oncommand=function(){
self.attachPopupBinding();
};
_9a6.setPopup(this._fieldHelpPopupBinding);
this._fieldHelpButton=_9a6;
}
};
FieldHelpBinding.prototype.attachPopupBinding=function(){
var _9a8=this._fieldHelpPopupBinding;
if(_9a8&&!_9a8.isAttached){
_9a8.attachRecursive();
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
RadioDataGroupBinding.prototype.handleAction=function(_9aa){
RadioDataGroupBinding.superclass.handleAction.call(this,_9aa);
switch(_9aa.type){
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
RadioDataGroupBinding.prototype.handleBroadcast=function(_9ac,arg){
RadioDataGroupBinding.superclass.handleBroadcast.call(this,_9ac,arg);
switch(_9ac){
case BroadcastMessages.KEY_ARROW:
var _9ae=null;
var next=null;
var _9b0=null;
switch(arg){
case KeyEventCodes.VK_DOWN:
case KeyEventCodes.VK_UP:
_9b0=this.getChildBindingsByLocalName("radio");
while(!_9ae&&_9b0.hasNext()){
var _9b1=_9b0.getNext();
if(_9b1.getProperty("ischecked")){
_9ae=_9b1;
}
}
break;
}
if(_9ae){
switch(arg){
case KeyEventCodes.VK_DOWN:
next=_9b0.getFollowing(_9ae);
while(next!=null&&next.isDisabled){
next=_9b0.getFollowing(next);
}
break;
case KeyEventCodes.VK_UP:
next=_9b0.getPreceding(_9ae);
while(next!=null&&next.isDisabled){
next=_9b0.getPreceding(next);
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
RadioDataGroupBinding.prototype.focus=function(_9b2){
if(!this.isFocused){
DataBinding.prototype.focus.call(this);
if(this.isFocused){
if(!_9b2){
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
var _9b3=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_9b3.type="hidden";
_9b3.name=this._name;
this.bindingElement.appendChild(_9b3);
this.shadowTree.input=_9b3;
}
this.shadowTree.input.value=this.getValue();
}
};
RadioDataGroupBinding.prototype.getValue=function(){
var _9b4=null;
var _9b5=this.getChildBindingsByLocalName("radio");
while(!_9b4&&_9b5.hasNext()){
var _9b6=_9b5.getNext();
if(_9b6.isChecked){
_9b4=_9b6.getProperty("value");
}
}
return _9b4;
};
RadioDataGroupBinding.prototype.getResult=RadioDataGroupBinding.prototype.getValue;
RadioDataGroupBinding.prototype.setValue=function(_9b7){
};
RadioDataGroupBinding.prototype.setResult=function(_9b8){
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
this.propertyMethodMap["checked"]=function(_9b9){
if(_9b9!=this.isChecked){
this.setChecked(_9b9,true);
}
};
this.propertyMethodMap["checksum"]=function(){
var _9ba=this.getProperty("ischecked");
if(_9ba!=this.isChecked){
this.setChecked(_9ba,true);
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
var _9bb=this.getProperty("relate");
var _9bc=this.getProperty("oncommand");
if(_9bb){
this.bindingRelate=_9bb;
this.relate();
}
if(_9bc){
this.oncommand=function(){
Binding.evaluate(_9bc,this);
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
var _9be=this.getCallBackID();
this._buttonBinding.check=function(_9bf){
RadioButtonBinding.prototype.check.call(this,_9bf);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
};
this._buttonBinding.uncheck=function(_9c0){
RadioButtonBinding.prototype.uncheck.call(this,_9c0);
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
RadioDataBinding.prototype.setChecked=function(_9c1,_9c2){
this._buttonBinding.setChecked(_9c1,_9c2);
if(this.bindingRelate!=null){
this.relate();
}
this.setProperty("ischecked",_9c1);
};
RadioDataBinding.prototype.check=function(_9c3){
this.setChecked(true,_9c3);
};
RadioDataBinding.prototype.uncheck=function(_9c4){
this.setChecked(false,_9c4);
};
RadioDataBinding.prototype.setDisabled=function(_9c5){
if(_9c5!=this.isDisabled){
this.isDisabled=_9c5;
this._buttonBinding.setDisabled(_9c5);
if(_9c5){
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
var _9c7=DOMEvents.getTarget(e);
switch(_9c7){
case this.shadowTree.labelText:
if(!this.isChecked&&!this.isDisabled){
this.check();
}
break;
}
}
};
RadioDataBinding.prototype._buildLabelText=function(){
var _9c8=this.getProperty("label");
if(_9c8){
this.shadowTree.labelText=DOMUtil.createElementNS(Constants.NS_UI,"ui:datalabeltext",this.bindingDocument);
this.shadowTree.labelText.appendChild(this.bindingDocument.createTextNode(Resolver.resolve(_9c8)));
DOMEvents.addEventListener(this.shadowTree.labelText,DOMEvents.CLICK,this);
this.bindingElement.appendChild(this.shadowTree.labelText);
}
};
RadioDataBinding.prototype.setLabel=function(_9c9){
if(this.shadowTree.labelText!=null){
this.shadowTree.labelText.firstChild.data=_9c9;
}
this.setProperty("label",_9c9);
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
this.propertyMethodMap["checked"]=function(_9ca){
if(_9ca!=this.isChecked){
this.setChecked(_9ca,true);
}
};
this.propertyMethodMap["checksum"]=function(){
var _9cb=this.getProperty("ischecked");
if(_9cb!=this.isChecked){
this.setChecked(_9cb,true);
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
var _9cd=DOMEvents.getTarget(e);
switch(_9cd){
case this.shadowTree.labelText:
this.setChecked(!this.isChecked);
break;
}
}
};
CheckBoxBinding.prototype.relate=RadioDataBinding.prototype.relate;
CheckBoxBinding.prototype.handleBroadcast=function(_9ce,arg){
CheckBoxBinding.superclass.handleBroadcast.call(this,_9ce,arg);
switch(_9ce){
case BroadcastMessages.KEY_SPACE:
this.setChecked(!this.isChecked);
break;
}
};
CheckBoxBinding.prototype._buildButtonBinding=function(){
this._buttonBinding=this.add(CheckButtonBinding.newInstance(this.bindingDocument));
var self=this;
this._buttonBinding.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_9d1){
_9d1.consume();
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
var _9d3=this.getCallBackID();
this._buttonBinding.check=function(_9d4){
ButtonBinding.prototype.check.call(this,_9d4);
self.setProperty("ischecked",true);
self.isChecked=true;
self.relate();
if(!_9d4){
self.focus();
}
};
this._buttonBinding.uncheck=function(_9d5){
ButtonBinding.prototype.uncheck.call(this,_9d5);
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
if(_9d3!=null){
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
var _9d6=true;
var _9d7=this.bindingElement.parentNode;
if(_9d7){
var _9d8=UserInterface.getBinding(_9d7);
if(_9d8&&_9d8 instanceof CheckBoxGroupBinding){
if(_9d8.isRequired){
if(_9d8.isValid){
_9d6=_9d8.validate();
}else{
_9d6=false;
}
}
}
}
return _9d6;
};
CheckBoxBinding.prototype.manifest=function(){
if(this.isAttached){
switch(this.isChecked){
case true:
if(!this.shadowTree.input){
var _9d9=DOMUtil.createElementNS(Constants.NS_XHTML,"input",this.bindingDocument);
_9d9.type="hidden";
_9d9.name=this._name;
_9d9.style.display="none";
this.bindingElement.appendChild(_9d9);
this.shadowTree.input=_9d9;
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
var _9da=null;
var _9db=this.getProperty("value");
if(this.isChecked){
_9da=_9db?_9db:"on";
}
return _9da;
};
CheckBoxBinding.prototype.setValue=function(_9dc){
if(_9dc==this.getValue()||_9dc=="on"){
this.check(true);
}else{
if(_9dc!="on"){
this.setPropety("value",_9dc);
}
}
};
CheckBoxBinding.prototype.getResult=function(){
var _9dd=false;
if(this.isChecked){
_9dd=this._result!=null?this._result:true;
}
return _9dd;
};
CheckBoxBinding.prototype.setResult=function(_9de){
if(typeof _9de=="boolean"){
this.setChecked(_9de,true);
}else{
this._result=_9de;
}
};
CheckBoxBinding.newInstance=function(_9df){
var _9e0=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkbox",_9df);
return UserInterface.registerBinding(_9e0,CheckBoxBinding);
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
var _9e1=true;
if(this.isRequired){
var _9e2=this.getDescendantBindingsByLocalName("checkbox");
if(_9e2.hasEntries()){
_9e1=false;
while(_9e2.hasNext()&&!_9e1){
if(_9e2.getNext().isChecked){
_9e1=true;
}
}
}
if(_9e1==false){
this._showWarning(true);
this.dispatchAction(Binding.ACTION_INVALID);
this.addActionListener(CheckBoxBinding.ACTION_COMMAND);
}
}
return _9e1;
};
CheckBoxGroupBinding.prototype._showWarning=function(_9e3){
if(_9e3){
if(!this._labelBinding){
var _9e4=LabelBinding.newInstance(this.bindingDocument);
_9e4.attachClassName("invalid");
_9e4.setImage("${icon:error}");
_9e4.setLabel("Selection required");
this._labelBinding=this.addFirst(_9e4);
this._labelBinding.attach();
}
}else{
if(this._labelBinding){
this._labelBinding.dispose();
this._labelBinding=null;
}
}
};
CheckBoxGroupBinding.prototype.handleAction=function(_9e5){
CheckBoxGroupBinding.superclass.handleAction.call(this,_9e5);
switch(_9e5.type){
case CheckBoxBinding.ACTION_COMMAND:
this._showWarning(false);
this.dispatchAction(Binding.ACTION_VALID);
this.removeActionListener(CheckBoxBinding.ACTION_COMMAND);
break;
}
};
CheckBoxGroupBinding.newInstance=function(_9e6){
var _9e7=DOMUtil.createElementNS(Constants.NS_UI,"ui:checkboxgroup",_9e6);
return UserInterface.registerBinding(_9e7,CheckBoxGroupBinding);
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
var _9e8=DialogControlBinding.newInstance(this.bindingDocument);
_9e8.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_9e8);
this._controlGroupBinding.attachRecursive();
var _9e9=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloonspeak",this.bindingDocument);
this.bindingElement.appendChild(_9e9);
var _9ea=this.getLabel();
if(_9ea!=null){
this.setLabel(_9ea);
}
};
BalloonBinding.prototype.onBindingDispose=function(){
BalloonBinding.superclass.onBindingDispose.call(this);
if(this._updateInterval){
window.clearInterval(this._updateInterval);
this._updateInterval=null;
}
var _9eb=this._snapTargetBinding;
if(Binding.exists(_9eb)==true){
_9eb.removeActionListener(Binding.ACTION_BLURRED,this);
_9eb.removeActionListener(Binding.ACTION_VALID,this);
}
};
BalloonBinding.prototype.snapTo=function(_9ec){
if(Interfaces.isImplemented(IData,_9ec)){
this._snapTargetBinding=_9ec;
var _9ed=_9ec.dispatchAction(BalloonBinding.ACTION_INITIALIZE);
if(_9ed&&_9ed.isConsumed){
this._environmentBinding=_9ed.listener;
}
if(this._environmentBinding){
_9ec.addActionListener(Binding.ACTION_BLURRED,this);
_9ec.addActionListener(Binding.ACTION_VALID,this);
this.subscribe(BroadcastMessages.VIEW_CLOSED);
var self=this;
this._updateInterval=window.setInterval(function(){
if(Binding.exists(_9ec)==true){
self._updatePosition();
}else{
self.dispose();
}
},BalloonBinding.TIMEOUT);
_9ec.dispatchAction(BalloonBinding.ACTION_SNAP);
}else{
throw "No environment fit for balloons!";
}
}
};
BalloonBinding.prototype._updatePosition=function(){
var _9ef=this._snapTargetBinding;
var _9f0=this._environmentBinding;
var root=UserInterface.getBinding(_9ef.bindingDocument.body);
if(Binding.exists(_9ef)&&Binding.exists(_9f0)){
if(!root.isActivated){
if(this.isVisible==true){
this.hide();
}
}else{
if(_9ef.isAttached&&_9f0.isAttached){
var _9f2=_9ef.boxObject.getUniversalPosition();
var _9f3=_9f0.boxObject.getUniversalPosition();
_9f3.y+=_9f0.bindingElement.scrollTop;
_9f3.x+=_9f0.bindingElement.scrollLeft;
var tDim=_9ef.boxObject.getDimension();
var eDim=_9f0.boxObject.getDimension();
var _9f6=false;
if(_9f2.y+tDim.h<_9f3.y){
_9f6=true;
}else{
if(_9f2.x+tDim.w<_9f3.x){
_9f6=true;
}else{
if(_9f2.y>_9f3.y+eDim.h){
_9f6=true;
}else{
if(_9f2.x>_9f3.x+eDim.w){
_9f6=true;
}
}
}
}
if(!_9f6){
this._setComputedPosition(_9f2,_9f3,tDim,eDim);
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
BalloonBinding.prototype._setComputedPosition=function(_9f7,_9f8,tDim,eDim){
var wDim=WindowManager.getWindowDimensions();
var bDim=this._getDimension();
var _9fd=_9f7;
var _9fe=false;
if(_9f7.x+tDim.w+bDim.w+BalloonBinding.OFFSET_X>=wDim.w){
_9fe=true;
}else{
if(_9f7.x+tDim.w>=_9f8.x+eDim.w){
_9fe=true;
}
}
if(_9fe){
_9fd.x-=(bDim.w+BalloonBinding.OFFSET_X);
this.attachClassName(BalloonBinding.CLASSNAME_LEFT);
}else{
_9fd.x+=tDim.w+BalloonBinding.OFFSET_X;
this.detachClassName(BalloonBinding.CLASSNAME_LEFT);
}
_9fd.y-=(bDim.h);
_9fd.y+=BalloonBinding.OFFSET_Y;
this._setPosition(_9fd);
};
BalloonBinding.prototype.handleBroadcast=function(_9ff,arg){
BalloonBinding.superclass.handleBroadcast.call(this,_9ff,arg);
switch(_9ff){
case BroadcastMessages.VIEW_CLOSED:
if(this._isAssociatedView(arg)==true){
this.dispose();
}
break;
}
};
BalloonBinding.prototype._isAssociatedView=function(_a01){
var _a02=false;
if(this._snapTargetBinding){
var view=this._snapTargetBinding.getAncestorBindingByType(ViewBinding,true);
if(view&&view.getHandle()==_a01){
_a02=true;
}
}
return _a02;
};
BalloonBinding.prototype._setPosition=function(_a04){
var _a05=false;
var pos=this.boxObject.getLocalPosition();
if(this._point!=null){
if(pos.x!=this._point.x||pos.y!=this._point.y){
_a05=true;
}
}
if(!_a05){
this.bindingElement.style.left=_a04.x+"px";
this.bindingElement.style.top=_a04.y+"px";
this._point=_a04;
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
BalloonBinding.prototype.handleAction=function(_a07){
BalloonBinding.superclass.handleAction.call(this,_a07);
var _a08=_a07.target;
switch(_a07.type){
case Binding.ACTION_ACTIVATED:
if(this._snapTargetBinding){
this._snapTargetBinding.dispatchAction(Binding.ACTION_ACTIVATED);
_a07.consume();
}
case Binding.ACTION_BLURRED:
case Binding.ACTION_VALID:
if(_a08==this._snapTargetBinding){
var self=this;
setTimeout(function(){
if(!Binding.exists(_a08)){
self.dispose();
}else{
if(_a08.validate()){
var _a0a=true;
if(_a07.type==Binding.ACTION_BLURRED){
var root=_a08.bindingDocument.body;
var bind=UserInterface.getBinding(root);
if(!root.isActivated){
_a0a=false;
}
}
if(_a0a){
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
BalloonBinding.prototype.setLabel=function(_a0d){
if(this.isAttached==true){
if(!this._isTableIndexed){
this._indexTable();
}
var _a0e=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloontext",this.bindingDocument);
var text=this.bindingDocument.createTextNode(_a0d);
_a0e.appendChild(text);
this.shadowTree[MatrixBinding.CENTER].appendChild(_a0e);
}
this.setProperty("label",_a0d);
};
BalloonBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
BalloonBinding.newInstance=function(_a10){
var _a11=DOMUtil.createElementNS(Constants.NS_UI,"ui:balloon",_a10);
var _a12=UserInterface.registerBinding(_a11,BalloonBinding);
_a12.hide();
return _a12;
};
ErrorBinding.prototype=new Binding;
ErrorBinding.prototype.constructor=ErrorBinding;
ErrorBinding.superclass=Binding.prototype;
ErrorBinding.ACTION_INITIALIZE="error initialize";
ErrorBinding.presentError=function(_a13,_a14){
if(Interfaces.isImplemented(IData,_a14)==true){
var _a15,_a16=_a14.dispatchAction(ErrorBinding.ACTION_INITIALIZE);
if(_a16&&_a16.isConsumed){
switch(_a16.listener.constructor){
case StageBinding:
_a15=false;
break;
case StageDialogBinding:
_a15=true;
break;
}
}
var _a17=_a15?top.app.bindingMap.dialogballoonset:top.app.bindingMap.balloonset;
var _a18=_a17.add(BalloonBinding.newInstance(top.app.document));
_a18.setLabel(_a13.text);
_a18.snapTo(_a14);
_a18.attach();
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
var _a19=this.bindingWindow.DataManager;
var text=this.getProperty("text");
var name=this.getProperty("targetname");
var _a1c=_a19.getDataBinding(name);
if(_a1c){
ErrorBinding.presentError({text:text},_a1c);
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
FocusBinding.focusElement=function(_a1d){
var _a1e=true;
try{
_a1d.focus();
Application.focused(true);
}
catch(exception){
var _a1f=UserInterface.getBinding(_a1d);
var _a20=SystemLogger.getLogger("FocusBinding.focusElement");
_a20.warn("Could not focus "+(_a1f?_a1f.toString():String(_a1d)));
_a1e=false;
}
return _a1e;
};
FocusBinding.focusedBinding=null;
FocusBinding.activeInstance=null;
FocusBinding.getCachedFocus=function(_a21){
var win=_a21.bindingWindow;
var id=_a21.bindingElement.id;
return {getBinding:function(){
var _a24=null;
try{
if(Binding.exists(_a21)){
_a24=win.bindingMap[id];
}
}
catch(exception){
}
return _a24;
}};
};
FocusBinding.navigateNext=function(_a25){
if(Binding.exists(FocusBinding.activeInstance)){
FocusBinding.activeInstance.focusNext(_a25);
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
var _a26=this.dispatchAction(FocusBinding.ACTION_ATTACHED);
if(_a26&&_a26.isConsumed){
if(_a26.listener.isStrongFocusManager){
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
FocusBinding.prototype.handleAction=function(_a27){
FocusBinding.superclass.handleAction.call(this,_a27);
var _a28=_a27.target;
var _a29=null;
if(this._isFocusManager){
switch(_a27.type){
case FocusBinding.ACTION_ATTACHED:
if(_a28!=this){
this._isUpToDate=false;
}
_a27.consume();
break;
case FocusBinding.ACTION_UPDATE:
if(_a28!=this){
this._isUpToDate=false;
_a27.consume();
}
break;
case FocusBinding.ACTION_BLUR:
if(Application.isOperational){
_a29=new FocusCrawler();
_a29.mode=FocusCrawler.MODE_BLUR;
_a29.crawl(_a28.bindingElement);
if(this._cachedFocus!=null){
this._cachedFocus=null;
}
}
_a27.consume();
break;
case FocusBinding.ACTION_FOCUS:
if(Application.isOperational&&_a28!=this){
_a29=new FocusCrawler();
_a29.mode=FocusCrawler.MODE_FOCUS;
_a29.crawl(_a28.bindingElement);
}
_a27.consume();
break;
case Binding.ACTION_FOCUSED:
if(Interfaces.isImplemented(IFocusable,_a28)){
this.claimFocus();
this._onFocusableFocused(_a28);
}
_a27.consume();
break;
case Binding.ACTION_BLURRED:
if(Interfaces.isImplemented(IFocusable,_a28)){
this._onFocusableBlurred(_a28);
}
_a27.consume();
break;
}
}
};
FocusBinding.prototype.focusNext=function(_a2a){
var _a2b=null;
var list=this._getFocusableList();
if(list.reset().hasEntries()){
while(_a2b==null&&list.hasNext()){
var _a2d=list.getNext();
if(this._cachedFocus&&_a2d==this._cachedFocus.getBinding()){
_a2b=_a2d;
}
}
if(_a2b!=null){
if(_a2d.isFocused){
var next=_a2a?list.getPreceding(_a2b):list.getFollowing(_a2b);
if(!next){
next=_a2a?list.getLast():list.getFirst();
}
next.focus();
}else{
_a2b.focus();
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
var _a2f=new FocusCrawler();
var list=new List();
_a2f.mode=FocusCrawler.MODE_INDEX;
_a2f.crawl(this.bindingElement,list);
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
var _a33=this._cachedFocus.getBinding();
if(_a33&&!_a33.isFocused){
_a33.focus();
}
}
};
FocusBinding.prototype._onFocusableFocused=function(_a34){
if(_a34!=FocusBinding.focusedBinding){
if(FocusBinding.focusedBinding!=null){
if(Binding.exists(FocusBinding.focusedBinding)){
FocusBinding.focusedBinding.blur();
}
}
FocusBinding.focusedBinding=_a34;
_a34.setProperty(FocusBinding.MARKER,true);
this._cachedFocus=FocusBinding.getCachedFocus(_a34);
}
};
FocusBinding.prototype._onFocusableBlurred=function(_a35){
_a35.deleteProperty(FocusBinding.MARKER);
if(_a35==FocusBinding.focusedBinding){
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
TabsButtonBinding.prototype.show=function(_a37){
this.bindingElement.style.left=_a37+"px";
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
TabsButtonBinding.prototype.registerHiddenTabBinding=function(_a38){
this.hiddenTabBindings.add(_a38);
};
TabsButtonBinding.prototype.fireCommand=function(){
if(this.isChecked&&!this.isPopulated){
this.hiddenTabBindings.reset();
while(this.hiddenTabBindings.hasNext()){
var _a39=this.hiddenTabBindings.getNext();
var item=MenuItemBinding.newInstance(this.popupBinding.bindingDocument);
item.setLabel(_a39.getLabel());
item.setImage(_a39.getImage());
item.associatedTabBinding=_a39;
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
TabsButtonBinding.prototype.handleAction=function(_a3c){
TabsButtonBinding.superclass.handleAction.call(this,_a3c);
switch(_a3c.type){
case PopupBinding.ACTION_HIDE:
this.popupBinding.removeActionListener(PopupBinding.ACTION_HIDE,this);
var _a3d=this.selectedTabBinding;
if(_a3d){
this.containingTabBoxBinding.moveToOrdinalPosition(_a3d,0);
this.containingTabBoxBinding.select(_a3d);
}
_a3c.consume();
break;
}
};
TabsButtonBinding.newInstance=function(_a3e){
var _a3f=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_a3e);
_a3f.setAttribute("type","checkbox");
_a3f.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_a3f.className="tabbutton";
return UserInterface.registerBinding(_a3f,TabsButtonBinding);
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
var _a40=TabBoxBinding.currentActiveInstance;
if(_a40!=null&&Binding.exists(_a40)){
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
var _a41=this.getTabElements().getLength();
var _a42=this.getTabPanelElements().getLength();
if(!this._tabsElement||!this._tabPanelsElement){
throw new Error(this.toString()+" DOM subtree invalid.");
}else{
if(_a41!=_a42){
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
var _a43=this.getTabPanelElements();
while(_a43.hasNext()){
this._setupWarningSystem(UserInterface.getBinding(_a43.getNext()));
}
if(this.isEqualSize){
this.enforceEqualSize();
this.dispatchAction(PageBinding.ACTION_UNBLOCK_INIT);
}
this.dispatchAction(TabBoxBinding.ACTION_ATTACHED);
TabBoxBinding.superclass.onBindingInitialize.call(this);
};
TabBoxBinding.prototype.buildDOMContent=function(){
var _a44=DOMUtil.getOrdinalPosition(this._tabsElement);
var _a45=DOMUtil.getOrdinalPosition(this._tabPanelsElement);
var _a46=_a44>_a45?"tabsbelow":"tabsontop";
this.attachClassName(_a46);
};
TabBoxBinding.prototype._TEMPNAME=function(){
var tabs=this.getTabElements();
var _a48=this.getTabPanelElements();
var _a49=null;
var _a4a=this.getProperty("selectedindex");
if(_a4a!=null){
if(_a4a>tabs.getLength()-1){
throw "Selectedindex out of range";
}
}
if(tabs.hasEntries()){
var _a4b=0;
while(tabs.hasNext()){
var tab=tabs.getNext();
var _a4d=_a48.getNext();
this.registerTabBoxPair(tab,_a4d);
if(_a4a&&_a4b==_a4a){
tab.setAttribute("selected","true");
}else{
if(tab.getAttribute("selected")=="true"){
_a49=tab;
}
}
_a4b++;
}
if(!_a49){
_a49=tabs.getFirst();
_a49.setAttribute("selected","true");
}
}
};
TabBoxBinding.prototype.enforceEqualSize=function(_a4e){
var _a4f=null;
var _a50=null;
if(this.isEqualSize){
var _a51=CSSComputer.getPadding(this._tabPanelsElement);
var max=0,_a53=this.getTabPanelElements();
_a53.each(function(_a54){
max=_a54.offsetHeight>max?_a54.offsetHeight:max;
});
_a50=max+_a51.top+_a51.bottom;
if(_a4e&&this._tabPanelsElement.style.height!=null){
_a4f=this._tabPanelsElement.offsetHeight;
}
if(_a4f!=null||_a50>_a4f){
this._tabPanelsElement.style.height=_a50+"px";
}
}
};
TabBoxBinding.prototype._setupWarningSystem=function(_a55){
_a55._invalidCount=0;
_a55.addActionListener(Binding.ACTION_INVALID,this);
_a55.addActionListener(Binding.ACTION_VALID,this);
_a55.addActionListener(BalloonBinding.ACTION_SNAP,this);
};
TabBoxBinding.prototype.handleAction=function(_a56){
TabBoxBinding.superclass.handleAction.call(this,_a56);
var _a57=_a56.target;
var _a58=_a56.listener;
switch(_a56.type){
case Binding.ACTION_ATTACHED:
break;
case Binding.ACTION_DETACHED:
if(_a57.constructor==this._impl_tab){
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
_a56.consume();
}
break;
case PageBinding.ACTION_INITIALIZED:
if(_a57.isDialogSubPage&&this.isEqualSize){
this.enforceEqualSize();
}
break;
case Binding.ACTION_INVALID:
_a58._invalidCount++;
if(_a58._invalidCount==1){
var self=this;
setTimeout(function(){
if(!_a58.isSelected){
self._showWarning(_a58,true);
}
},0);
}
break;
case Binding.ACTION_VALID:
if(_a58._invalidCount>0){
_a58._invalidCount--;
if(_a58._invalidCount==0){
if(_a58.isSelected){
this._showWarning(_a58,false);
}
}
}
break;
case BalloonBinding.ACTION_SNAP:
this._showBalloon(_a58,true);
break;
case Binding.ACTION_ACTIVATED:
case Binding.ACTION_FOCUSED:
if(_a56._tabboxstamp==null){
TabBoxBinding.currentActiveInstance=this;
_a56._tabboxstamp="stamped";
}
break;
}
};
TabBoxBinding.prototype.handleEvent=function(e){
TabBoxBinding.superclass.handleEvent.call(this,e);
switch(e.type){
case DOMEvents.AFTERUPDATE:
var _a5b=DOMEvents.getTarget(e);
if(_a5b==this.bindingDocument.documentElement){
if(this._hasBastardUpdates){
this._hasBastardUpdates=false;
var tabs=this.getTabElements();
var _a5d=this.getTabPanelElements();
tabs.each(function(tab,_a5f){
if(tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY)==null){
var _a60=_a5d.get(_a5f);
this.registerTabBoxPair(tab,_a60);
}
},this);
var _a61=this._tabBoxPairs;
for(var key in _a61){
var tab=_a61[key].tab;
if(tab.parentNode==null){
this.unRegisterTabBoxPair(tab);
}
}
}
}else{
if(!this._hasBastardUpdates){
var name=DOMUtil.getLocalName(_a5b);
switch(_a5b.__updateType){
case Update.TYPE_INSERT:
switch(name){
case this._nodename_tab:
case this._nodename_tabpanel:
var _a65=_a5b.parentNode;
if(_a65==this._tabsElement||_a65==this._tabPanelsElement){
this._hasBastardUpdates=true;
}
break;
}
break;
case Update.TYPE_REMOVE:
switch(name){
case this._nodename_tabs:
case this._nodename_tabpanels:
if(_a5b==this._tabsElement||_a5b==this._tabPanelsElement){
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
TabBoxBinding.prototype.select=function(arg,_a67){
var _a68=this.getBindingForArgument(arg);
if(_a68!=null&&!_a68.isSelected){
if(this._selectedTabBinding!=null){
this._selectedTabBinding.unselect();
this.getTabPanelBinding(this._selectedTabBinding).unselect();
}
this.dispatchAction(TabBoxBinding.ACTION_UNSELECTED);
_a68.select(_a67);
this.getTabPanelBinding(_a68).select(_a67);
var _a69=this.getProperty("selectedindex");
if(_a69!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_a68.bindingElement,true));
}
this._selectedTabBinding=_a68;
this.dispatchAction(TabBoxBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
if(_a68.getImage()==TabBoxBinding.BALLOON_TAB_IMAGE){
var _a6a=this.getTabPanelBinding(_a68);
this._showBalloon(_a6a,false);
}
}
};
TabBoxBinding.prototype.registerTabBoxPair=function(tab,_a6c){
var key=KeyMaster.getUniqueKey();
tab.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
_a6c.setAttribute(TabBoxBinding.ASSOCIATION_KEY,key);
this._tabBoxPairs[key]={tab:tab,tabPanel:_a6c};
};
TabBoxBinding.prototype.unRegisterTabBoxPair=function(tab){
var key=tab.getAttribute(TabBoxBinding.ASSOCIATION_KEY);
delete this._tabBoxPairs[key];
};
TabBoxBinding.prototype.getTabPanelBinding=function(_a70){
var _a71=null;
try{
var key=_a70.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _a73=this._tabBoxPairs[key].tabPanel;
_a71=UserInterface.getBinding(_a73);
}
catch(exception){
this.logger.error(exception);
SystemDebug.stack(arguments);
}
return _a71;
};
TabBoxBinding.prototype.getTabBinding=function(_a74){
var key=_a74.getProperty(TabBoxBinding.ASSOCIATION_KEY);
var _a76=this._tabBoxPairs[key].tab;
return UserInterface.getBinding(_a76);
};
TabBoxBinding.prototype.summonTabBinding=function(){
return TabBinding.newInstance(this.bindingDocument);
};
TabBoxBinding.prototype.summonTabPanelBinding=function(){
var _a77=this._impl_tabpanel.newInstance(this.bindingDocument);
this._setupWarningSystem(_a77);
return _a77;
};
TabBoxBinding.prototype.appendTabByBindings=function(_a78,_a79){
var _a7a=_a78.bindingElement;
_a78.setProperty("selected",true);
var _a7b=this.summonTabPanelBinding();
var _a7c=_a7b.bindingElement;
if(_a79){
_a7c.appendChild(_a79 instanceof Binding?_a79.bindingElement:_a79);
}
this.registerTabBoxPair(_a7a,_a7c);
UserInterface.getBinding(this._tabsElement).add(_a78);
this._tabPanelsElement.appendChild(_a7c);
_a78.attach();
UserInterface.getBinding(_a7c).attachRecursive();
this.updateType=TabBoxBinding.UPDATE_ATTACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
return _a78;
};
TabBoxBinding.prototype.importTabBinding=function(_a7d){
var that=_a7d.containingTabBoxBinding;
var _a7f=that.getTabPanelBinding(_a7d);
var _a80=_a7f.getBindingElement();
var _a81=_a7d.getBindingElement();
that.dismissTabBinding(_a7d);
this._tabsElement.appendChild(_a81);
this._tabPanelsElement.appendChild(_a80);
this.registerTabBoxPair(_a81,_a80);
_a7d.containingTabBoxBinding=this;
this.select(_a7d);
this.dispatchAction(Binding.ACTION_ACTIVATED);
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.removeTab=function(_a82){
var _a83=null;
if(_a82.isSelected){
_a83=this.getBestTab(_a82);
this._selectedTabBinding=null;
}
var _a84=this.getTabPanelBinding(_a82);
this.unRegisterTabBoxPair(_a82.bindingElement);
_a82.dispose();
_a84.dispose();
if(_a83!=null){
this.select(_a83);
}
this.updateType=TabBoxBinding.UPDATE_DETACH;
this.dispatchAction(TabBoxBinding.ACTION_UPDATED);
};
TabBoxBinding.prototype.dismissTabBinding=function(_a85){
if(_a85.isSelected){
this.selectBestTab(_a85);
}
};
TabBoxBinding.prototype.selectBestTab=function(_a86){
var _a87=this.getBestTab(_a86);
if(_a87){
this.select(_a87);
}else{
this._selectedTabBinding=null;
}
};
TabBoxBinding.prototype.getBestTab=function(_a88){
var _a89=null;
var _a8a=_a88.getOrdinalPosition(true);
var _a8b=this.getTabBindings();
var _a8c=_a8b.getLength();
var _a8d=_a8c-1;
if(_a8c==1){
_a89=null;
}else{
if(_a8a==_a8d){
_a89=_a8b.get(_a8a-1);
}else{
_a89=_a8b.get(_a8a+1);
}
}
return _a89;
};
TabBoxBinding.prototype.moveToOrdinalPosition=function(_a8e,_a8f){
var _a90=this.bindingDocument.getElementById(_a8e.bindingElement.id);
var tab=this.getTabElements().get(_a8f);
this._tabsElement.insertBefore(_a90,tab);
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
var _a92=this._nodename_tab;
var _a93=new List(this._tabsElement.childNodes);
var _a94=new List();
while(_a93.hasNext()){
var _a95=_a93.getNext();
if(_a95.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_a95)==_a92){
_a94.add(_a95);
}
}
return _a94;
};
TabBoxBinding.prototype.getTabPanelElements=function(){
var _a96=this._nodename_tabpanel;
var _a97=new List(this._tabPanelsElement.childNodes);
var _a98=new List();
_a97.each(function(_a99){
if(_a99.nodeType==Node.ELEMENT_NODE&&DOMUtil.getLocalName(_a99)==_a96){
_a98.add(_a99);
}
});
return _a98;
};
TabBoxBinding.prototype.getTabsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabs);
};
TabBoxBinding.prototype.getTabPanelsBinding=function(){
return this.getChildBindingByLocalName(this._nodename_tabpanels);
};
TabBoxBinding.prototype.getTabBindings=function(){
var _a9a=new List();
var _a9b=this.getTabElements();
_a9b.each(function(_a9c){
_a9a.add(UserInterface.getBinding(_a9c));
});
return _a9a;
};
TabBoxBinding.prototype.getTabPanelBindings=function(){
var _a9d=new List();
this.getTabPanelElements().each(function(_a9e){
_a9d.add(UserInterface.getBinding(_a9e));
});
return _a9d;
};
TabBoxBinding.prototype.getSelectedTabBinding=function(){
return this._selectedTabBinding;
};
TabBoxBinding.prototype.getSelectedTabPanelBinding=function(){
var _a9f=null;
if(this._selectedTabBinding){
_a9f=this.getTabPanelBinding(this._selectedTabBinding);
}
return _a9f;
};
TabBoxBinding.prototype._showWarning=function(_aa0,_aa1){
var _aa2=this.getTabBinding(_aa0);
if(_aa1){
if(_aa2.labelBinding.hasImage){
_aa2._backupImage=_aa2.getImage();
}
_aa2.setImage(TabBoxBinding.INVALID_TAB_IMAGE);
}else{
if(_aa2._backupImage){
_aa2.setImage(_aa2._backupImage);
}else{
_aa2.setImage(false);
}
}
};
TabBoxBinding.prototype._showBalloon=function(_aa3,_aa4){
var _aa5=this.getTabBinding(_aa3);
if((_aa4&&!_aa5.isSelected)||!_aa4){
if(_aa5.getImage()!=TabBoxBinding.INVALID_TAB_IMAGE){
if(_aa4){
if(_aa5.labelBinding.hasImage){
_aa5._backupImage=_aa5.getImage();
}
_aa5.setImage(TabBoxBinding.BALLOON_TAB_IMAGE);
}else{
if(_aa5._backupImage!=null){
_aa5.setImage(_aa5._backupImage);
}else{
_aa5.setImage(false);
}
}
}
}
};
TabBoxBinding.prototype.advanceSelection=function(_aa6){
var tab=this.getSelectedTabBinding();
var tabs=this.getTabBindings();
var _aa9=tab.getOrdinalPosition(true);
var next=null;
var _aab=new List();
tabs.each(function(t){
if(t.isVisible){
_aab.add(t);
}
});
if(_aab.getLength()>1){
if(_aa9==0&&!_aa6){
next=_aab.getLast();
}else{
if(_aa9==_aab.getLength()-1&&_aa6){
next=_aab.getFirst();
}else{
if(_aa6){
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
var _aae=this.constructor.TABBUTTON_IMPLEMENTATION;
this.tabsButtonBinding=_aae.newInstance(this.bindingDocument);
this.shadowTree.tabsButton=this.tabsButtonBinding;
this.add(this.tabsButtonBinding);
this.tabsButtonBinding.attach();
};
TabsBinding.prototype.handleAction=function(_aaf){
TabsBinding.superclass.handleAction.call(this,_aaf);
switch(_aaf.type){
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
var _ab2=self.bindingElement.offsetWidth;
if(_ab2!=self._cachedOffsetWidth){
self.manage();
}
self._cachedOffsetWidth=_ab2;
}
}
setTimeout(manage,0);
}
};
TabsBinding.prototype.add=function(_ab3){
if(_ab3 instanceof TabBinding){
if(this.tabsButtonBinding&&this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
return TabsBinding.superclass.add.call(this,_ab3);
};
TabsBinding.prototype.manage=function(){
if(Binding.exists(this)==true&&this.isVisible){
this.isManaging=true;
var _ab4=false;
var _ab5,tab,tabs=this.containingTabBoxBinding.getTabElements();
var _ab8=this.constructor.TABBUTTON_IMPLEMENTATION;
var _ab9=this.bindingElement.offsetWidth-_ab8.RESERVED_SPACE;
var _aba=null;
var sum=0,_abc=0;
var _abd=true;
if(tabs.hasEntries()){
this.tabsButtonBinding.reset();
while(tabs.hasNext()&&_abd){
tab=tabs.getNext();
_ab5=UserInterface.getBinding(tab);
if(!_aba){
_aba=_ab5;
}
sum+=tab.offsetWidth;
if(sum>=_ab9){
_ab4=true;
if(_ab5.isSelected){
if(!DOMUtil.isFirstElement(_ab5.bindingElement,true)){
this.isManaging=false;
if(_aba){
_aba.hide();
if(this.tabsButtonBinding.isVisible){
this.tabsButtonBinding.hide();
}
}
this.containingTabBoxBinding.moveToOrdinalPosition(_ab5,_abc-1);
_abd=false;
}
}else{
_ab5.hide();
this.tabsButtonBinding.registerHiddenTabBinding(_ab5);
}
}else{
_ab5.show();
_aba=_ab5;
_abc++;
}
}
if(_abd){
if(_ab4&&this.tabsButtonBinding.hiddenTabBindings.hasEntries()){
var _abe=_aba.getBindingElement();
var _abf=_abe.offsetLeft+_abe.offsetWidth;
var _ac0=this.tabsButtonBinding;
setTimeout(function(){
_ac0.show(_abf+4);
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
var _ac1=TabBinding.superclass.serialize.call(this);
if(_ac1){
_ac1.label=this.getLabel();
_ac1.image=this.getImage();
_ac1.tooltip=this.getToolTip();
}
return _ac1;
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
var _ac2=this.bindingElement.getAttribute("image");
var _ac3=this.bindingElement.getAttribute("label");
var _ac4=this.bindingElement.getAttribute("tooltip");
this.bindingElement.className="default";
this.labelBinding=LabelBinding.newInstance(this.bindingDocument);
this.shadowTree.labelBinding=this.labelBinding;
this.labelBinding.attachClassName("tablabel");
this.add(this.labelBinding);
if(_ac3){
this.setLabel(_ac3);
}
if(_ac2){
this.setImage(_ac2);
}
if(_ac4){
this.setToolTip(_ac4);
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
TabBinding.prototype.setLabel=function(_ac6){
if(_ac6!=null){
this.setProperty("label",_ac6);
if(this.isAttached){
this.labelBinding.setLabel(_ac6);
}
}
};
TabBinding.prototype.getLabel=function(){
return this.getProperty("label");
};
TabBinding.prototype.setToolTip=function(_ac7){
if(_ac7){
this.setProperty("tooltip",_ac7);
if(this.isAttached){
this.labelBinding.setToolTip(_ac7);
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
var _ac9=false;
if(Client.isMozilla==true){
}
if(!_ac9){
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
TabBinding.prototype.select=function(_aca){
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
TabBinding.newInstance=function(_acb){
var _acc=DOMUtil.createElementNS(Constants.NS_UI,"ui:tab",_acb);
return UserInterface.registerBinding(_acc,TabBinding);
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
var _acd=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(dim2==null||!Dimension.isEqual(dim1,dim2)){
_acd=true;
this._lastKnownDimension=dim1;
}
return _acd;
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
TabPanelBinding.prototype.select=function(_ad0){
if(!this.isSelected){
if(this.isLazy){
this.wakeUp("select");
}else{
this.isSelected=true;
this.isVisible=true;
this.bindingElement.style.position="static";
this._invokeManagedRecursiveFlex();
if(_ad0!=true){
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
TabPanelBinding.prototype.handleAction=function(_ad1){
TabPanelBinding.superclass.handleAction.call(this,_ad1);
var _ad2=_ad1.target;
switch(_ad1.type){
case BalloonBinding.ACTION_INITIALIZE:
_ad1.consume();
break;
}
};
TabPanelBinding.newInstance=function(_ad3){
var _ad4=DOMUtil.createElementNS(Constants.NS_UI,"ui:tabpanel",_ad3);
UserInterface.registerBinding(_ad4,TabPanelBinding);
return UserInterface.getBinding(_ad4);
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
var _ad5=SplitBoxBinding.superclass.serialize.call(this);
if(_ad5){
_ad5.orient=this.getOrient();
_ad5.layout=this.getLayout();
}
return _ad5;
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
var _ad6=this.getSplitPanelElements();
if(_ad6.hasEntries()){
var _ad7=new List(this.getLayout().split(":"));
if(_ad7.getLength()!=_ad6.getLength()){
throw new Error(this+" DOM subree invalid");
}else{
_ad6.each(function(_ad8){
_ad8.setAttribute("ratio",_ad7.getNext());
});
}
}
this.isLayoutInitialized=true;
};
SplitBoxBinding.prototype._initializeOrient=function(){
var _ad9=this.getProperty("orient");
if(_ad9){
this._orient=_ad9;
}
this.attachClassName(this._orient);
};
SplitBoxBinding.prototype._initializeSplitters=function(){
var _ada=this.getSplitterBindings();
while(_ada.hasNext()){
var _adb=_ada.getNext();
if(_adb&&_adb.getProperty("collapsed")==true){
_adb.collapse();
}
}
};
SplitBoxBinding.prototype.handleAction=function(_adc){
SplitBoxBinding.superclass.handleAction.call(this,_adc);
switch(_adc.type){
case SplitterBinding.ACTION_DRAGGED:
this.refreshLayout();
_adc.consume();
break;
case SplitterBinding.ACTION_COLLAPSE:
this.collapse(_adc.target);
_adc.consume();
break;
case SplitterBinding.ACTION_UNCOLLAPSE:
this.unCollapse(_adc.target);
_adc.consume();
break;
}
};
SplitBoxBinding.prototype.flex=function(){
SplitBoxBinding.superclass.flex.call(this);
if(this.isAttached==true){
this.invokeLayout(true);
}
};
SplitBoxBinding.prototype.collapse=function(_add){
this._getSplitPanelBindingForSplitter(_add).collapse();
this.invokeLayout();
};
SplitBoxBinding.prototype.unCollapse=function(_ade){
this._getSplitPanelBindingForSplitter(_ade).unCollapse();
this.invokeLayout();
};
SplitBoxBinding.prototype._getSplitPanelBindingForSplitter=function(_adf){
var _ae0=DOMUtil.getOrdinalPosition(_adf.bindingElement,true);
var _ae1,_ae2=this.getSplitPanelElements();
switch(_adf.getCollapseDirection()){
case SplitterBinding.COLLAPSE_BEFORE:
_ae1=_ae2.get(_ae0);
break;
case SplitterBinding.COLLAPSE_AFTER:
_ae1=_ae2.get(_ae0+1);
break;
}
return UserInterface.getBinding(_ae1);
};
SplitBoxBinding.prototype.invokeLayout=function(_ae3){
var _ae4=this.isHorizontalOrient();
var _ae5=this.getSplitPanelBindings();
var _ae6=this.getSplitterBindings();
var _ae7=new List();
var _ae8,sum=0;
var _aea=0;
_ae5.each(function(_aeb){
if(_aeb.isFixed==true){
if(!_ae5.hasNext()){
_aea+=_aeb.getFix();
}
_ae7.add(0);
sum+=0;
}else{
_ae8=_aeb.getRatio();
_ae7.add(_ae8);
sum+=_ae8;
}
});
if(sum==0){
this.logger.warn("Division by zero was hacked");
sum=1;
}
if(_ae7.getLength()!=_ae5.getLength()){
throw new Error(this+" Invalid property (ratio)");
}else{
var _aec=_ae4?this.getWidth():this.getHeight();
_aec-=_aea;
_ae6.each(function(_aed){
if(_aed.isVisible){
_aec-=SplitterBinding.DIMENSION;
}
});
var unit=_aec/sum;
var _aef=0;
var self=this;
_ae5.each(function(_af1){
var span=0;
var _af3=_ae7.getNext();
if(_af1.isFixed){
span=_af1.getFix();
}else{
span=Math.round(unit*_af3);
if(isNaN(span)){
alert("isNaN ( span ) ["+this.getProperty("layout")+"]");
}
}
_aef+=span;
while(_aef>_aec){
_aef--;
span--;
}
if(!_af1.isFixed){
if(_ae4){
_af1.setWidth(span);
}else{
_af1.setHeight(span);
}
}
});
}
if(_ae3!=true){
this.reflex();
}
if(this._persist&&this._persist.layout){
var _af4=this.getLayout();
if(_af4){
this.setProperty("layout",_af4);
}
}
};
SplitBoxBinding.prototype.computeLayout=function(){
var _af5=this.isHorizontalOrient();
var _af6=this.getSplitPanelBindings();
var _af7=this.getSplitterBindings();
var _af8=null;
var _af9=null;
var unit=null;
var _afb=null;
var span=null;
_af6.each(function(_afd){
if(!unit){
unit=_af5?_afd.getWidth():_afd.getHeight();
}
span=_af5?_afd.getWidth():_afd.getHeight();
if(_afb){
span-=_afb;
_afb=null;
}
_af8=_af7.getNext();
if(_af8&&_af8.offset){
_afb=_af8.offset;
span+=_afb;
}
_afd.setRatio(span/unit);
});
};
SplitBoxBinding.prototype.refreshLayout=function(){
this.computeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.setLayout=function(_afe){
this.logger.debug(_afe);
this.setProperty("layout",_afe);
this._initializeLayout();
this.invokeLayout();
};
SplitBoxBinding.prototype.getLayout=function(){
if(!this.isLayoutInitialized){
if(!this.getProperty("layout")){
this.setProperty("layout",this.getDefaultLayout());
}
}else{
var _aff="",_b00=this.getSplitPanelBindings();
_b00.each(function(_b01){
_aff+=_b01.getRatio().toString();
_aff+=_b00.hasNext()?":":"";
});
this.setProperty("layout",_aff);
}
return new String(this.getProperty("layout"));
};
SplitBoxBinding.prototype.getDefaultLayout=function(){
var _b02=this.getSplitPanelElements();
_b02.each(function(_b03){
layout+="1"+(_b02.hasNext()?":":"");
});
this.setProperty("layout",layout);
};
SplitBoxBinding.prototype.setWidth=function(_b04){
this.bindingElement.style.width=_b04+"px";
};
SplitBoxBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
SplitBoxBinding.prototype.setHeight=function(_b05){
this.bindingElement.style.height=_b05+"px";
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
SplitBoxBinding.prototype.fit=function(_b06){
if(!this.isFit||_b06){
if(this.isHorizontalOrient()){
var max=0;
var _b08=this.getSplitPanelBindings();
_b08.each(function(_b09){
var _b0a=_b09.bindingElement.offsetHeight;
max=_b0a>max?_b0a:max;
});
this._setFitnessHeight(max);
}else{
throw "SplitBoxBinding enforceFitness not supported vertically!";
}
this.isFit=true;
}
};
SplitBoxBinding.newInstance=function(_b0b){
var _b0c=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitbox",_b0b);
return UserInterface.registerBinding(_b0c,SplitBoxBinding);
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
var _b0f=this.getProperty("hidden");
if(_b0f){
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
var _b10=this.getProperty("ratiocache");
if(_b10){
this.setRatio(_b10);
this.deleteProperty("ratiocache");
}else{
this._containingSplitBoxBinding.computeLayout();
}
this.bindingElement.style.display="block";
this.deleteProperty("hidden");
this.isVisible=true;
}
};
SplitPanelBinding.prototype.setWidth=function(_b11){
if(!this.isFixed){
if(_b11!=this.getWidth()){
if(_b11<0){
_b11=this.getWidth();
this.logger.warn("SplitPanelBinding#setWidth bug in Internet Explorer!");
}
try{
this.bindingElement.style.width=_b11+"px";
}
catch(exception){
alert("SplitPanelBinding#setWidth: Occult width: "+_b11);
alert(arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getWidth=function(){
var _b12=null;
if(this.isFixed){
_b12=this.getFix();
}else{
_b12=this.bindingElement.offsetWidth;
}
return _b12;
};
SplitPanelBinding.prototype.setHeight=function(_b13){
if(!this.isFixed){
if(_b13!=this.getHeight()){
try{
this.bindingElement.style.height=_b13+"px";
}
catch(exception){
alert("SplitPanelBinding.prototype.setHeight"+arguments.caller.callee);
}
}
}
};
SplitPanelBinding.prototype.getHeight=function(){
var _b14=null;
if(this.isFixed){
_b14=this.getFix();
}else{
_b14=this.bindingElement.offsetHeight;
}
return _b14;
};
SplitPanelBinding.prototype.setRatio=function(_b15){
this.setProperty("ratio",_b15);
};
SplitPanelBinding.prototype.getRatio=function(){
return this.getProperty("ratio");
};
SplitPanelBinding.prototype.setFix=function(_b16){
if(_b16){
this._fixedSpan=_b16;
switch(this._containingSplitBoxBinding.getOrient()){
case SplitBoxBinding.ORIENT_HORIZONTAL:
this.logger.warn("Fix not properly supported on horizontal splitboxes!");
this.setWidth(_b16);
break;
case SplitBoxBinding.ORIENT_VERTICAL:
this.setHeight(_b16);
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
SplitPanelBinding.newInstance=function(_b17){
var _b18=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitpanel",_b17);
return UserInterface.registerBinding(_b18,SplitPanelBinding);
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
var _b19=SplitBoxBinding.superclass.serialize.call(this);
if(_b19){
_b19.collapse=this.getProperty("collapse");
_b19.collapsed=this.getProperty("collapsed");
_b19.disabled=this.getProperty("isdisabled");
}
return _b19;
};
SplitterBinding.prototype.onBindingAttach=function(){
SplitterBinding.superclass.onBindingAttach.call(this);
this.addActionListener(Binding.ACTION_DRAG);
this._containingSplitBoxBinding=this.getAncestorBindingByLocalName("splitbox");
this.attachClassName(this._containingSplitBoxBinding.getOrient());
this._collapseDirection=this.getProperty("collapse");
this.buildDOMContent();
this.attachDOMEvents();
var _b1a=this.getProperty("hidden");
if(_b1a){
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
SplitterBinding.prototype.setCollapseDirection=function(_b1c){
this.setProperty("collapse",_b1c);
this._collapseDirection=_b1c;
};
SplitterBinding.prototype.handleAction=function(_b1d){
SplitterBinding.superclass.handleAction.call(this,_b1d);
switch(_b1d.type){
case Binding.ACTION_DRAG:
this.dragger.registerHandler(this);
_b1d.consume();
break;
}
};
SplitterBinding.prototype.handleEvent=function(e){
SplitterBinding.superclass.handleEvent.call(this,e);
var _b1f=this;
if(!this.isDragging&&!this.isDisabled){
switch(e.type){
case DOMEvents.MOUSEOVER:
window.splitterTimeout=window.setTimeout(function(){
_b1f.shadowTree.splitterBody.className=SplitterBinding.CLASSNAME_HOVER;
},250);
break;
case DOMEvents.MOUSEOUT:
if(window.splitterTimeout){
window.clearTimeout(window.splitterTimeout);
}
if(_b1f.shadowTree.splitterBody.className==SplitterBinding.CLASSNAME_HOVER){
this.shadowTree.splitterBody.className="";
}
break;
}
}
};
SplitterBinding.prototype.onDragStart=function(_b20){
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
SplitterBinding.newInstance=function(_b2b){
var _b2c=DOMUtil.createElementNS(Constants.NS_UI,"ui:splitter",_b2b);
return UserInterface.registerBinding(_b2c,SplitterBinding);
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
var _b2d=this.getProperty("selectedindex");
var _b2e=this.getDeckElements();
if(_b2e.hasEntries()){
var _b2f=false;
var _b30=0;
while(_b2e.hasNext()){
var deck=_b2e.getNext();
if(_b2d&&_b30==_b2d){
deck.setAttribute("selected","true");
_b2f=true;
}else{
if(deck.getAttribute("selected")=="true"){
_b2f=true;
}
}
_b30++;
}
if(!_b2f){
_b2e.getFirst().setAttribute("selected","true");
}
}
};
DecksBinding.prototype.getDeckElements=function(){
return this.getChildElementsByLocalName(this.constructor.NODENAME_DECK);
};
DecksBinding.prototype.select=function(arg){
var _b33=this.getBindingForArgument(arg);
if(_b33!=null){
if(_b33!=this._selectedDeckBinding){
if(this._selectedDeckBinding){
this._selectedDeckBinding.unselect();
}
_b33.select();
this._selectedDeckBinding=_b33;
var _b34=this.getProperty("selectedindex");
if(_b34!=null){
this.setProperty("selectedindex",DOMUtil.getOrdinalPosition(_b33.bindingElement,true));
}
this.dispatchAction(DecksBinding.ACTION_SELECTED);
this.dispatchAction(FocusBinding.ACTION_UPDATE);
}
}else{
throw "No deck for argument "+arg;
}
};
DecksBinding.prototype.hasDimensionsChanged=function(){
var _b35=false;
var dim1=this.boxObject.getDimension();
var dim2=this._lastKnownDimension;
if(!Dimension.isEqual(dim1,dim2)){
_b35=true;
this._lastKnownDimension=dim1;
}
return _b35;
};
DecksBinding.prototype.getSelectedDeckBinding=function(){
return this._selectedDeckBinding;
};
DecksBinding.newInstance=function(_b38){
var _b39=DOMUtil.createElementNS(Constants.NS_UI,"ui:decks",_b38);
return UserInterface.registerBinding(_b39,DecksBinding);
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
DeckBinding.prototype.handleAction=function(_b3a){
DeckBinding.superclass.handleAction.call(this,_b3a);
var _b3b=_b3a.target;
switch(_b3a.type){
case BalloonBinding.ACTION_INITIALIZE:
_b3a.consume();
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
DeckBinding.newInstance=function(_b3d){
var _b3e=DOMUtil.createElementNS(Constants.NS_UI,"ui:deck",_b3d);
return UserInterface.registerBinding(_b3e,DeckBinding);
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
ToolBarBinding.prototype.onMemberInitialize=function(_b3f){
if(_b3f instanceof ToolBarBodyBinding){
if(_b3f.isRightAligned){
if(!this._toolBarBodyRight){
this._toolBarBodyRight=_b3f;
}
}else{
if(!this._toolBarBodyLeft){
this._toolBarBodyLeft=_b3f;
}
}
}
ToolBarBinding.superclass.onMemberInitialize.call(this,_b3f);
};
ToolBarBinding.prototype.parseDOMProperties=function(){
var _b40=this.getProperty("imagesize");
var type=this.getProperty("type");
if(_b40){
this.setImageSize(_b40);
}
if(type){
this.setType(type);
}else{
this.setType(this.type);
}
};
ToolBarBinding.prototype.buildDOMContent=function(){
if(this._hasDefaultContent==true&&!this._hasDOMContent){
var _b42=ToolBarGroupBinding.newInstance(this.bindingDocument);
_b42.add(ToolBarButtonBinding.newInstance(this.bindingDocument));
_b42.isDefaultContent=true;
this.add(_b42);
_b42.attachRecursive();
this._hasDOMContent=true;
}
};
ToolBarBinding.prototype.flex=function(){
var left=this._toolBarBodyLeft;
var _b44=this._toolBarBodyRight;
if(left!=null&&left.hasClassName("max")){
this._maxToolBarGroup(left,_b44);
}
if(_b44!=null&&_b44.hasClassName("max")){
this._maxToolBarGroup(_b44,left);
}
};
ToolBarBinding.prototype._maxToolBarGroup=function(max,_b46){
var _b47=this.boxObject.getDimension().w;
var _b48=CSSComputer.getPadding(this.bindingElement);
_b47-=(_b48.left+_b48.right);
if(_b46!=null){
_b47-=_b46.boxObject.getDimension().w;
if(!Client.isWindows){
_b47-=1;
}
if(Client.isExplorer){
_b47-=15;
}
}
max.bindingElement.style.width=_b47+"px";
};
ToolBarBinding.prototype.getToolBarGroupByIndex=function(_b49){
return this.getDescendantBindingsByLocalName("toolbargroup").get(_b49);
};
ToolBarBinding.prototype.addLeft=function(_b4a,_b4b){
var _b4c=null;
if(this._toolBarBodyLeft!=null){
_b4c=this._toolBarBodyLeft.add(_b4a,_b4b);
}else{
throw new Error("No left toolbarbody");
}
return _b4c;
};
ToolBarBinding.prototype.addLeftFirst=function(_b4d,_b4e){
var _b4f=null;
if(this._toolBarBodyLeft){
_b4f=this._toolBarBodyLeft.addFirst(_b4d,_b4e);
}else{
throw new Error("No left toolbarbody");
}
return _b4f;
};
ToolBarBinding.prototype.addRight=function(_b50){
var _b51=null;
if(this._toolBarBodyRight){
_b51=this._toolBarBodyRight.add(_b50);
}else{
throw new Error("No left toolbarbody");
}
return _b51;
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
ToolBarBinding.newInstance=function(_b54){
var _b55=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_b54);
return UserInterface.registerBinding(_b55,ToolBarBinding);
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
var _b56=this.getDescendantBindingsByLocalName("toolbargroup");
var _b57=new List();
var _b58=true;
_b56.each(function(_b59){
if(_b59.isVisible&&!_b59.isDefaultContent){
_b57.add(_b59);
}
});
while(_b57.hasNext()){
var _b5a=_b57.getNext();
_b5a.setLayout(ToolBarGroupBinding.LAYOUT_DEFAULT);
if(_b58){
_b5a.setLayout(ToolBarGroupBinding.LAYOUT_FIRST);
_b58=false;
}
if(!_b57.hasNext()){
_b5a.setLayout(ToolBarGroupBinding.LAYOUT_LAST);
}
}
if(this.getProperty("equalsize")){
this.enforceEqualSize();
}
};
ToolBarBodyBinding.prototype.enforceEqualSize=function(){
var max=0,list=this.getDescendantBindingsByLocalName("clickbutton");
while(list.hasNext()){
var _b5d=list.getNext();
var _b5e=_b5d.getEqualSizeWidth();
if(_b5e>max){
max=_b5e;
}
}
if(max!=0){
list.reset();
while(list.hasNext()){
var _b5d=list.getNext();
_b5d.setEqualSizeWidth(max);
}
}
};
ToolBarBodyBinding.prototype.empty=function(){
this.detachRecursive();
this.bindingElement.innerHTML="";
};
ToolBarBodyBinding.prototype.add=function(_b5f,_b60){
var _b61=ToolBarBinding.superclass.add.call(this,_b5f);
if(!_b60){
if(_b5f instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _b61;
};
ToolBarBodyBinding.prototype.addFirst=function(_b62,_b63){
var _b64=ToolBarBinding.superclass.addFirst.call(this,_b62);
if(!_b63){
if(_b62 instanceof ToolBarGroupBinding&&this.isAttached){
this.refreshToolBarGroups();
}
}
return _b64;
};
ToolBarBodyBinding.newInstance=function(_b65){
var _b66=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbody",_b65);
return UserInterface.registerBinding(_b66,ToolBarBodyBinding);
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
ToolBarGroupBinding.prototype.setLayout=function(_b67){
switch(_b67){
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
var _b68=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_b68)=="toolbarbody"){
UserInterface.getBinding(_b68).refreshToolBarGroups();
}
};
ToolBarGroupBinding.prototype.hide=function(){
ToolBarGroupBinding.superclass.hide.call(this);
var _b69=this.bindingElement.parentNode;
if(DOMUtil.getLocalName(_b69)=="toolbarbody"){
UserInterface.getBinding(_b69).refreshToolBarGroups();
}
};
ToolBarGroupBinding.newInstance=function(_b6a){
var _b6b=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbargroup",_b6a);
return UserInterface.registerBinding(_b6b,ToolBarGroupBinding);
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
ToolBarButtonBinding.newInstance=function(_b6c){
var _b6d=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_b6c);
return UserInterface.registerBinding(_b6d,ToolBarButtonBinding);
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
var _b6e=this.getProperty("label");
var _b6f=this.getProperty("image");
if(_b6e){
this.setLabel(_b6e);
}
if(_b6f){
this.setImage(_b6f);
}
};
ToolBarLabelBinding.prototype.setLabel=function(_b70,_b71){
if(this.isAttached){
this._labelBinding.setLabel(_b70,_b71);
}
this.setProperty("label",_b70);
};
ToolBarLabelBinding.prototype.setImage=function(_b72,_b73){
if(this.isAttached){
this._labelBinding.setImage(_b72,_b73);
}
this.setProperty("image",_b72);
};
ToolBarLabelBinding.newInstance=function(_b74){
var _b75=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarlabel",_b74);
return UserInterface.registerBinding(_b75,ToolBarLabelBinding);
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
var _b76=this.getDescendantBindingsByLocalName("clickbutton");
if(_b76.hasEntries()){
while(_b76.hasNext()){
var _b77=_b76.getNext();
if(_b77.isDefault){
this._defaultButton=_b77;
_b77.attachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
if(!this._isListening&&_b77.isFocusable){
this.subscribe(BroadcastMessages.KEY_ENTER);
this._isListening=true;
}
}
this._buttons=_b76;
}
};
DialogToolBarBinding.prototype.handleBroadcast=function(_b78,arg){
DialogToolBarBinding.superclass.handleBroadcast.call(this,_b78,arg);
switch(_b78){
case BroadcastMessages.KEY_ENTER:
if(!PopupBinding.hasActiveInstances()&&!EditorBinding.isActive){
if(Binding.exists(this)){
var _b7a=this.getAncestorBindingByType(DialogBinding,true);
if(_b7a!=null&&_b7a.isActive){
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
DialogToolBarBinding.prototype.handleAction=function(_b7b){
DialogToolBarBinding.superclass.handleAction.call(this,_b7b);
var _b7c=_b7b.target;
var _b7d=false;
var _b7e=this._buttons.reset();
if(_b7c instanceof ClickButtonBinding){
switch(_b7b.type){
case Binding.ACTION_FOCUSED:
_b7c.attachClassName(ButtonBinding.CLASSNAME_FOCUSED);
this._focusedButton=_b7c;
if(this._defaultButton){
this._defaultButton.detachClassName(ButtonBinding.CLASSNAME_DEFAULT);
}
break;
case Binding.ACTION_BLURRED:
_b7c.detachClassName(ButtonBinding.CLASSNAME_FOCUSED);
break;
}
}
if(this._defaultButton){
while(!_b7d&&_b7e.hasNext()){
var _b7f=_b7e.getNext();
_b7d=_b7f.isFocused;
}
if(!_b7d){
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
var _b80=this._views;
for(var _b81 in ViewDefinitions){
var def=ViewDefinitions[_b81];
var key=def.perspective;
if(key!=null){
if(!_b80.has(key)){
_b80.set(key,new List());
}
var list=_b80.get(key);
list.add(def);
}
}
}else{
this.hide();
}
};
ToolBoxToolBarButtonBinding.prototype.handleBroadcast=function(_b85,arg){
ToolBoxToolBarButtonBinding.superclass.handleBroadcast.call(this,_b85,arg);
switch(_b85){
case BroadcastMessages.PERSPECTIVE_CHANGED:
var tag=arg;
if(this._views.has(tag)){
if(tag!=this._lastGeneratedPerspective){
this._lastGeneratedPerspective=tag;
var list=this._views.get(tag);
var _b89=this.bindingWindow.bindingMap.toolboxpopup;
_b89.empty();
list.each(function(def){
var item=_b89.add(StageViewMenuItemBinding.newInstance(_b89.bindingDocument));
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
TreeBinding.grid=function(_b8c){
var _b8d=TreeNodeBinding.HEIGHT;
var ceil=Math.ceil(_b8c);
var _b8f=_b8c%_b8d;
if(_b8f>0){
_b8c=_b8c-_b8f+_b8d;
}
return _b8c+TreeBodyBinding.PADDING_TOP;
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
var _b90=this.getProperty("focusable");
if(_b90!=null){
this._isFocusable=_b90;
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
var _b92=this.getProperty("builder");
if(_b92){
this._buildFromTextArea(_b92);
}else{
if(this._treeNodeBuffer.hasEntries()){
while(this._treeNodeBuffer.hasNext()){
this.add(this._treeNodeBuffer.getNext());
}
}
}
};
TreeBinding.prototype._setupTreeSelection=function(){
var _b93=this.getProperty("selectable");
var _b94=this.getProperty("selectionproperty");
var _b95=this.getProperty("selectionvalue");
if(_b93){
this.setSelectable(true);
if(_b94){
this.setSelectionProperty(_b94);
}
if(_b95){
this.setSelectionValue(_b95);
}
}
this._positionIndicatorBinding=this.add(TreePositionIndicatorBinding.newInstance(this.bindingDocument));
this.shadowTree.positionIndicator=this._positionIndicatorBinding;
this._positionIndicatorBinding.attach();
};
TreeBinding.prototype._buildFromTextArea=function(id){
var area=this.bindingDocument.getElementById(id);
if(area!=null){
var _b98=UserInterface.getBinding(area);
var _b99=this._treeBodyBinding;
function build(){
_b99.subTreeFromString(area.value);
}
_b98.addActionListener(Binding.ACTION_UPDATED,{handleAction:function(){
build();
}});
setTimeout(build,0);
}
};
TreeBinding.prototype.registerTreeNodeBinding=function(_b9a){
var _b9b=_b9a.getHandle();
if(this._treeNodeBindings.has(_b9b)){
throw "Duplicate treenodehandles registered: "+_b9a.getLabel();
}else{
this._treeNodeBindings.set(_b9b,_b9a);
var map=this._openTreeNodesBackupMap;
if(map!=null&&map.has(_b9b)){
_b9a.open();
}
}
};
TreeBinding.prototype.unRegisterTreeNodeBinding=function(_b9d){
this._treeNodeBindings.del(_b9d.getHandle());
};
TreeBinding.prototype.getTreeNodeBindingByHandle=function(_b9e){
var _b9f=null;
if(this._treeNodeBindings.has(_b9e)){
_b9f=this._treeNodeBindings.get(_b9e);
}else{
throw "No such treenode: "+_b9e;
}
return _b9f;
};
TreeBinding.prototype.handleAction=function(_ba0){
TreeBinding.superclass.handleAction.call(this,_ba0);
var _ba1=_ba0.target;
switch(_ba0.type){
case TreeNodeBinding.ACTION_OPEN:
_ba0.consume();
break;
case TreeNodeBinding.ACTION_CLOSE:
this._blurDescendantBindings(_ba1);
_ba0.consume();
break;
case TreeNodeBinding.ACTION_ONFOCUS:
this._nodePrimary=_ba1;
this.focusSingleTreeNodeBinding(_ba1);
if(!this.isFocused){
this.focus();
}
_ba0.consume();
break;
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
switch(this._selectionType){
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodePrimary=_ba1;
this.focusSingleTreeNodeBinding(_ba1);
break;
case TreeBinding.SELECTIONTYPE_SINGLE:
this._nodeSecondary=_ba1;
if(!this._nodePrimary||this._nodeSecondary==this._nodePrimary){
this._nodePrimary=_ba1;
this.focusSingleTreeNodeBinding(_ba1);
}else{
this.focusMultipeTreeNodeBindings(this._getVisibleTreeNodeBindingsInRange(this._nodePrimary,this._nodeSecondary));
}
break;
}
if(!this.isFocused){
this.focus();
}
_ba0.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
if(_ba1.isFocused){
this.blurSelectedTreeNodes();
}
_ba0.consume();
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
TreeBinding.prototype._getVisibleTreeNodeBindingsInRange=function(_ba2,_ba3){
alert("TreeBinding#_getVisibleTreeNodeBindingsInRange");
};
TreeBinding.prototype.focusSingleTreeNodeBinding=function(_ba4){
if(_ba4!=null&&!_ba4.isFocused){
this.blurSelectedTreeNodes();
this._focusedTreeNodeBindings.add(_ba4);
_ba4.invokeManagedFocus();
if(this._isSelectable){
this._manageSelections();
}
}
};
TreeBinding.prototype.focusMultipeTreeNodeBindings=function(_ba5){
this.blurSelectedTreeNodes();
while(_ba5.hasNext()){
var _ba6=_ba5.getNext();
this._focusedTreeNodeBindings.add(_ba6);
_ba6.invokeManagedFocus();
}
if(this._isSelectable){
this._manageSelections();
}
};
TreeBinding.prototype._manageSelections=function(){
var _ba7=this._selectedTreeNodeBindings;
this._selectedTreeNodeBindings={};
var _ba8=false;
var _ba9=null;
this._focusedTreeNodeBindings.reset();
while(this._focusedTreeNodeBindings.hasNext()){
var _baa=this._focusedTreeNodeBindings.getNext();
var _bab=_baa.getProperty(this._selectionProperty);
if(_bab!=null){
if(!this._selectionValue||this._selectionValue[_bab]){
_ba9=(this._selectedTreeNodeBindings[_baa.key]=_baa);
var _bac=_ba7[_baa.key];
if(!_bac||_bac!=_ba9){
_ba8=true;
}
}
}
}
if(_ba9){
if(_ba8){
this.dispatchAction(TreeBinding.ACTION_SELECTIONCHANGED);
}
}else{
if(_ba7){
for(var key in _ba7){
this.dispatchAction(TreeBinding.ACTION_NOSELECTION);
break;
}
}
}
};
TreeBinding.prototype.getSelectedTreeNodeBindings=function(){
var _bae=new List();
for(var key in this._selectedTreeNodeBindings){
_bae.add(this._selectedTreeNodeBindings[key]);
}
return _bae;
};
TreeBinding.prototype.blurSelectedTreeNodes=function(){
this._focusedTreeNodeBindings.reset().each(function(_bb0){
_bb0.blur();
});
this._focusedTreeNodeBindings.clear();
};
TreeBinding.prototype._blurDescendantBindings=function(_bb1){
var _bb2=_bb1.getDescendantBindingsByLocalName("treenode");
var _bb3=true;
var self=this;
_bb2.each(function(desc){
if(desc.isFocused){
desc.blur();
self._focusedTreeNodeBindings.del(self._focusedTreeNodeBindings.getIndex(desc));
}
return _bb3;
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
var _bb6=this._treeBodyBinding.getChildBindingByLocalName("treenode");
if(_bb6!=null){
this.focusSingleTreeNodeBinding(_bb6);
_bb6.callback();
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
TreeBinding.prototype.add=function(_bb7){
var _bb8=null;
if(this._treeBodyBinding){
_bb8=this._treeBodyBinding.add(_bb7);
}else{
this._treeNodeBuffer.add(_bb7);
_bb8=_bb7;
}
return _bb8;
};
TreeBinding.prototype.addFirst=function(_bb9){
throw new Error("Not implemented");
};
TreeBinding.prototype.empty=function(){
this._treeBodyBinding.detachRecursive();
var _bba=this._treeBodyBinding.bindingElement;
_bba.innerHTML="";
};
TreeBinding.prototype.isEmpty=function(){
return this._treeNodeBindings.hasEntries()==false;
};
TreeBinding.prototype.collapse=function(){
this.blurSelectedTreeNodes();
this._treeNodeBindings.each(function(_bbb,_bbc){
if(_bbc.isContainer&&_bbc.isOpen){
_bbc.close();
}
});
};
TreeBinding.prototype.setSelectable=function(_bbd){
this._isSelectable=_bbd;
if(_bbd){
this._selectedTreeNodeBindings={};
}else{
this._selectedTreeNodeBindings=null;
this._selectionProperty=null;
this._selectionValue=null;
}
};
TreeBinding.prototype.setSelectionProperty=function(_bbe){
this._selectionProperty=_bbe;
};
TreeBinding.prototype.setSelectionValue=function(_bbf){
if(_bbf){
var list=new List(_bbf.split(" "));
this._selectionValue={};
while(list.hasNext()){
this._selectionValue[list.getNext()]=true;
}
}
};
TreeBinding.prototype.handleBroadcast=function(_bc1,arg){
TreeBinding.superclass.handleBroadcast.call(this,_bc1,arg);
switch(_bc1){
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
var _bc3=this.getFocusedTreeNodeBindings();
if(_bc3.hasEntries()){
var node=_bc3.getFirst();
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
var _bc6=this.getFocusedTreeNodeBindings();
if(_bc6.hasEntries()){
var node=_bc6.getFirst();
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
var _bc9=null;
while(next==null&&(_bc9=node.getAncestorBindingByLocalName("treenode"))!=null){
if(_bc9!=null){
next=_bc9.getNextBindingByLocalName("treenode");
}
node=_bc9;
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
var _bcb=DOMEvents.getTarget(e);
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
var _bcc=new TreeCrawler();
var list=new List();
_bcc.mode=TreeCrawler.MODE_GETOPEN;
_bcc.crawl(this.bindingElement,list);
var map=new Map();
if(list.hasEntries()){
while(list.hasNext()){
var _bcf=list.getNext();
map.set(_bcf.getHandle(),true);
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
var _bd4=this._positionIndicatorBinding;
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
if(y!=_bd4.getPosition().y){
_bd4.setPosition(new Point(this._acceptingPosition.x+TreeNodeBinding.INDENT,y));
}
if(!_bd4.isVisible){
_bd4.show();
}
}else{
if(_bd4.isVisible){
_bd4.hide();
}
}
}else{
if(_bd4.isVisible){
_bd4.hide();
}
}
};
TreeBinding.prototype.enablePositionIndicator=function(_bd7){
this._acceptingTreeNodeBinding=_bd7;
this._acceptingPosition=_bd7.boxObject.getLocalPosition();
this._acceptingDimension=_bd7.boxObject.getDimension();
this._acceptingPositions=this._getChildPositions(_bd7);
};
TreeBinding.prototype.disablePositionIndicator=function(){
this._acceptingTreeNodeBinding=null;
this._acceptingPosition=null;
this._acceptingDimension=null;
};
TreeBinding.prototype._getChildPositions=function(_bd8){
var map={};
var _bda=_bd8.getChildBindingsByLocalName("treenode");
var _bdb,pos,dim,y;
y=TreeBinding.grid(_bd8.boxObject.getLocalPosition().y);
map[y]=true;
while(_bda.hasNext()){
_bdb=_bda.getNext();
pos=_bdb.boxObject.getLocalPosition();
dim=_bdb.boxObject.getDimension();
y=TreeBinding.grid(pos.y+dim.h)-TreeNodeBinding.HEIGHT;
map[y]=true;
}
return map;
};
TreeBinding.prototype.getDropIndex=function(){
var y=this._positionIndicatorBinding.getPosition().y;
var drop=0;
for(var _be1 in this._acceptingPositions){
if(_be1==y){
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
TreeBinding.newInstance=function(_be2){
var _be3=DOMUtil.createElementNS(Constants.NS_UI,"ui:tree",_be2);
var _be4=UserInterface.registerBinding(_be3,TreeBinding);
_be4.treeBodyBinding=TreeBodyBinding.newInstance(_be2);
return _be4;
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
TreeBodyBinding.prototype.accept=function(_be5){
if(_be5 instanceof TreeNodeBinding){
this.logger.debug(_be5);
}
};
TreeBodyBinding.prototype.handleAction=function(_be6){
TreeBodyBinding.superclass.handleAction.call(this,_be6);
switch(_be6.type){
case TreeNodeBinding.ACTION_FOCUSED:
this._scrollIntoView(_be6.target);
_be6.consume();
break;
}
};
TreeBodyBinding.prototype._scrollIntoView=function(_be7){
var a=this.boxObject.getDimension().h;
var y=_be7.boxObject.getLocalPosition().y;
var h=_be7.boxObject.getDimension().h;
var t=this.bindingElement.scrollTop;
var l=this.bindingElement.scrollLeft;
var _bed=_be7.labelBinding.bindingElement;
if(y-t<0){
_bed.scrollIntoView(true);
}else{
if(y-t+h>a){
_bed.scrollIntoView(false);
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
TreeBodyBinding.newInstance=function(_bee){
var _bef=DOMUtil.createElementNS(Constants.NS_UI,"ui:treebody",_bee);
return UserInterface.registerBinding(_bef,TreeBodyBinding);
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
var _bf0=TreeNodeBinding.superclass.serialize.call(this);
if(_bf0){
_bf0.label=this.getLabel();
_bf0.image=this.getImage();
var _bf1=this.getHandle();
if(_bf1&&_bf1!=this.key){
_bf0.handle=_bf1;
}
if(this.isOpen){
_bf0.open=true;
}
if(this.isDisabled){
_bf0.disabled=true;
}
if(this.dragType){
_bf0.dragtype=this.dragType;
}
if(this.dragAccept){
_bf0.dragaccept=this.dragAccept;
}
}
return _bf0;
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
var _bf3=UserInterface.getBinding(node);
if(_bf3&&_bf3.containingTreeBinding){
this.containingTreeBinding=_bf3.containingTreeBinding;
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
var _bf4=this.key;
var _bf5=this.getProperty("handle");
if(_bf5){
_bf4=_bf5;
}
return _bf4;
};
TreeNodeBinding.prototype.setHandle=function(_bf6){
this.setProperty("handle",_bf6);
};
TreeNodeBinding.prototype.buildDOMContent=function(){
var url=this.getProperty("url");
var _bf8=this.getProperty("label");
var _bf9=this.getProperty("tooltip");
var _bfa=this.getProperty("oncommand");
var _bfb=this.getProperty("onbindingfocus");
var _bfc=this.getProperty("onbindingblur");
var _bfd=this.getProperty("focused");
var _bfe=this.getProperty("callbackid");
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
if(_bf8!=null){
this.setLabel(_bf8);
}
if(_bf9!=null){
this.setToolTip(_bf9);
}
if(!this.imageProfile){
this._computeImageProfile();
}
this.setImage(this.computeImage());
if(this.isContainer){
this.updateClassNames();
}
var _c00=this.bindingWindow.WindowManager;
if(_bfa!=null){
this.oncommand=function(){
Binding.evaluate(_bfa,this);
};
}
if(_bfb!=null){
this.onfocus=function(){
Binding.evaluate(_bfb,this);
};
}
if(_bfc!=null){
this.onblur=function(){
Binding.evaluate(_bfc,this);
};
}
if(_bfd==true){
this.focus();
}
if(_bfe!=null){
Binding.dotnetify(this,_bfe);
}
};
TreeNodeBinding.prototype.handleAction=function(_c01){
TreeNodeBinding.superclass.handleAction.call(this,_c01);
switch(_c01.type){
case TreeNodeBinding.ACTION_FOCUSED:
if(_c01.target!=this){
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
TreeNodeBinding.prototype.accept=function(_c02,_c03){
var _c04=true;
if(_c02 instanceof TreeNodeBinding){
var _c05=false;
var _c06=this.bindingElement;
var _c07=this.containingTreeBinding.bindingElement;
while(!_c05&&_c06!=_c07){
if(_c06==_c02.getBindingElement()){
_c05=true;
}else{
_c06=_c06.parentNode;
}
}
if(_c05){
Dialog.error("Not Allowed","You cannot move a folder into itself.");
_c04=false;
}else{
this.acceptTreeNodeBinding(_c02,_c03);
}
}else{
_c04=false;
}
return _c04;
};
TreeNodeBinding.prototype.acceptTreeNodeBinding=function(_c08,_c09){
var _c0a=_c08.serializeToString();
var _c0b=new BindingParser(this.bindingDocument);
var _c0c=_c0b.parseFromString(_c0a).getFirst();
_c09=_c09?_c09:this.containingTreeBinding.getDropIndex();
var _c0d=this.getChildElementsByLocalName("treenode");
this.bindingElement.insertBefore(_c0c,_c0d.get(_c09));
this.bindingWindow.DocumentManager.attachBindings(this.bindingElement);
_c08.dispose();
};
TreeNodeBinding.prototype.showAcceptance=function(){
this.containingTreeBinding.enablePositionIndicator(this);
};
TreeNodeBinding.prototype.hideAcceptance=function(){
this.containingTreeBinding.disablePositionIndicator();
};
TreeNodeBinding.prototype._computeImageProfile=function(){
var _c0e=this.getProperty("image");
var _c0f=this.getProperty("image-active");
var _c10=this.getProperty("image-disabled");
_c0f=_c0f?_c0f:this.isContainer?_c0e?_c0e:TreeNodeBinding.DEFAULT_FOLDER_OPEN:_c0e?_c0e:TreeNodeBinding.DEFAULT_ITEM;
_c10=_c10?_c10:this.isContainer?_c0e?_c0e:TreeNodeBinding.DEFAULT_FOLDER_DISABLED:_c0e?_c0e:TreeNodeBinding.DEFAULT_ITEM_DISABLED;
_c0e=_c0e?_c0e:this.isContainer?TreeNodeBinding.DEFAULT_FOLDER_CLOSED:TreeNodeBinding.DEFAULT_ITEM;
this.imageProfile=new ImageProfile({image:_c0e,imageHover:null,imageActive:_c0f,imageDisabled:_c10});
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
TreeNodeBinding.prototype.setLabel=function(_c12){
this.setProperty("label",String(_c12));
if(this.isAttached){
this.labelBinding.setLabel(String(_c12));
}
};
TreeNodeBinding.prototype.setToolTip=function(_c13){
this.setProperty("tooltip",String(_c13));
if(this.isAttached){
this.labelBinding.setToolTip(String(_c13));
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
var _c14=this.imageProfile.getDefaultImage();
var _c15=this.imageProfile.getActiveImage();
_c15=_c15?_c15:_c14;
return this.isOpen?_c15:_c14;
};
TreeNodeBinding.prototype.handleEvent=function(e){
TreeNodeBinding.superclass.handleEvent.call(this,e);
var _c17=DOMEvents.getTarget(e);
var _c18=this.labelBinding.bindingElement;
var _c19=this.labelBinding.shadowTree.labelBody;
var _c1a=this.labelBinding.shadowTree.labelText;
switch(e.type){
case DOMEvents.MOUSEDOWN:
switch(_c17){
case _c18:
this._onAction(e);
break;
case _c19:
case _c1a:
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
if(_c17.parentNode==this.bindingElement&&_c17.__updateType==Update.TYPE_INSERT){
var _c18=this.labelBinding.bindingElement;
if(DOMUtil.getLocalName(_c17)=="treenode"){
if(_c17==this.bindingElement.firstChild){
this.bindingElement.insertBefore(_c17,_c18.nextSibling);
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
switch(_c17){
case _c18:
case _c19:
case _c1a:
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
var _c1e=true;
if(e.type=="mousedown"){
var _c1f=e.button==(e.target?0:1);
if(!_c1f){
_c1e=false;
}
}
if(_c1e){
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
var _c21=false;
if(e!=null){
_c21=e.shiftKey;
}
this.dispatchAction(_c21?TreeNodeBinding.ACTION_ONMULTIFOCUS:TreeNodeBinding.ACTION_ONFOCUS);
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
var _c24=this.getDescendantBindingsByLocalName("treenode");
_c24.each(function(_c25){
_c25.dispose();
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
TreeNodeBinding.prototype.handleElement=function(_c26){
var _c27=_c26.getAttribute("focused");
if(_c27=="true"){
if(!this.isFocused){
this.focus();
}
}
return false;
};
TreeNodeBinding.newInstance=function(_c28){
var _c29=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_c28);
return UserInterface.registerBinding(_c29,TreeNodeBinding);
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
TreeContentBinding.newInstance=function(_c2a){
var _c2b=DOMUtil.createElementNS(Constants.NS_UI,"ui:treecontent",_c2a);
return UserInterface.registerBinding(_c2b,TreeContentBinding);
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
TreePositionIndicatorBinding.prototype.setPosition=function(_c2c){
this.bindingElement.style.left=_c2c.x+"px";
this.bindingElement.style.top=_c2c.y+"px";
this._geometry.x=_c2c.x;
this._geometry.y=_c2c.y;
};
TreePositionIndicatorBinding.prototype.getPosition=function(){
return new Point(this._geometry.x,this._geometry.y);
};
TreePositionIndicatorBinding.newInstance=function(_c2d){
var _c2e=DOMUtil.createElementNS(Constants.NS_UI,"ui:treepositionindicator",_c2d);
return UserInterface.registerBinding(_c2e,TreePositionIndicatorBinding);
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
this.addFilter(function(_c30){
var _c31=UserInterface.getBinding(_c30);
var _c32=null;
var _c32=null;
if(!_c31 instanceof TreeNodeBinding){
_c32=NodeCrawler.SKIP_NODE;
}
return _c32;
});
this.addFilter(function(_c33,list){
var _c35=UserInterface.getBinding(_c33);
var _c36=null;
switch(self.mode){
case TreeCrawler.MODE_GETOPEN:
if(_c35.isOpen){
list.add(_c35);
}
break;
}
return _c36;
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
ShadowBinding.prototype.shadow=function(_c37){
this.targetBinding=_c37;
_c37.addActionListener(Binding.ACTION_POSITIONCHANGED,this);
_c37.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_c37.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_c37.bindingElement.parentNode.appendChild(this.bindingElement);
if(_c37.isVisible){
this.show();
this.setPosition(_c37.getPosition());
this.setDimension(_c37.getDimension());
}else{
this.hide();
}
};
ShadowBinding.prototype.handleAction=function(_c38){
ShadowBinding.superclass.handleAction.call(this,_c38);
var _c39=_c38.target;
if(_c39==this.targetBinding){
switch(_c38.type){
case Binding.ACTION_POSITIONCHANGED:
this.setPosition(this.targetBinding.getPosition());
_c38.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
this.setDimension(this.targetBinding.getDimension());
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(_c39.isVisible){
this.show();
this.setPosition(_c39.getPosition());
this.setDimension(_c39.getDimension());
}else{
this.hide();
}
break;
}
}
};
ShadowBinding.prototype.setPosition=function(_c3a){
var _c3b=this.offset-this.expand;
this.bindingElement.style.left=new String(_c3a.x+_c3b)+"px";
this.bindingElement.style.top=new String(_c3a.y+_c3b)+"px";
};
ShadowBinding.prototype.setDimension=function(dim){
this.bindingElement.style.width=new String(dim.w+2*this.expand)+"px";
this.bindingElement.style.height=new String(dim.h+2*this.expand)+"px";
};
ShadowBinding.newInstance=function(_c3d){
var _c3e=DOMUtil.createElementNS(Constants.NS_UI,"ui:shadow",_c3d);
return UserInterface.registerBinding(_c3e,ShadowBinding);
};
DockControlImageProfile.prototype=new ControlImageProfile;
DockControlImageProfile.prototype.constructor=DockControlImageProfile;
DockControlImageProfile.superclass=ControlImageProfile.prototype;
DockControlImageProfile.IMAGE_MINIMIZE=Resolver.resolve("${skin}/docks/control-minimize-${string}.png");
DockControlImageProfile.IMAGE_MAXIMIZE=Resolver.resolve("${skin}/docks/control-maximize-${string}.png");
DockControlImageProfile.IMAGE_RESTORE=Resolver.resolve("${skin}/docks/control-restore-${string}.png");
DockControlImageProfile.IMAGE_CLOSE=null;
function DockControlImageProfile(_c3f){
this.binding=_c3f;
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
DockTabsButtonBinding.newInstance=function(_c40){
var _c41=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_c40);
_c41.setAttribute("type","checkbox");
_c41.setAttribute("popup","app.bindingMap.tabsbuttonpopup");
_c41.className="tabbutton";
return UserInterface.registerBinding(_c41,DockTabsButtonBinding);
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
var _c42=DockBinding.superclass.serialize.call(this);
if(_c42){
_c42.active=this.isActive?true:null;
_c42.collapsed=this.isCollapsed?true:null;
}
return _c42;
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
var _c43=UserInterface.getBinding(this.bindingElement.parentNode);
var _c44=MatrixBinding.newInstance(this.bindingDocument);
_c44.attachClassName("dockliner");
this.shadowTree.dockLiner=_c44;
_c43.add(_c44);
_c44.attach();
_c44.manifest();
var type=this.getProperty("type");
this.type=type?type:DockBinding.TYPE_TOOLS;
this.attachClassName(this.type);
if(this.getProperty("active")==true){
this.activate();
}
};
DockBinding.prototype.interceptDisplayChange=function(_c46){
var _c47=this.getSelectedTabPanelBinding();
if(_c47){
_c47.isVisible=_c46;
_c47.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
}
};
DockBinding.prototype.prepareNewView=function(_c48){
var _c49=this._getBindingForDefinition(_c48);
var _c4a=DockTabBinding.newInstance(this.bindingDocument);
_c4a.setHandle(_c48.handle);
_c4a.setLabel(this.type==DockBinding.TYPE_EDITORS?null:_c48.label);
_c4a.setImage(_c48.image);
_c4a.setToolTip(_c48.toolTip);
_c4a.setEntityToken(_c48.entityToken);
_c4a.setAssociatedView(_c49);
this.appendTabByBindings(_c4a,null);
this._setupPageBindingListeners(_c4a);
var _c4b=this.getTabPanelBinding(_c4a);
_c49.snapToBinding(_c4b);
var _c4c=this.bindingWindow.bindingMap.views;
_c4c.add(_c49);
if(!this.isActive){
this.activate();
}
_c49.attach();
};
DockBinding.prototype.prepareOpenView=function(_c4d,_c4e){
this.logger.debug("DockBinding.prototype.prepareOpenView: _setupDirtyStuff required?");
_c4e.setLabel(_c4d.label);
_c4e.setImage(_c4d.image);
_c4e.setToolTip(_c4d.toolTip);
this._setupPageBindingListeners(_c4e);
var _c4f=this.getTabPanelBinding(_c4e);
var _c50=this._getBindingForDefinition(_c4d);
_c4e.setAssociatedView(_c50);
_c50.snapToBinding(_c4f);
UserInterface.getBinding(this.bindingDocument.body).add(_c50);
_c50.attach();
};
DockBinding.prototype._getBindingForDefinition=function(_c51){
var _c52=this.bindingWindow.bindingMap.views;
var view=ViewBinding.newInstance(_c52.bindingDocument);
view.setDefinition(_c51);
return view;
};
DockBinding.prototype._setupPageBindingListeners=function(_c54){
var _c55=this.getTabPanelBinding(_c54);
var self=this;
var _c57={handleAction:function(_c58){
var _c59=_c58.target;
switch(_c58.type){
case PageBinding.ACTION_ATTACHED:
TabBoxBinding.currentActiveInstance=self;
break;
case PageBinding.ACTION_INITIALIZED:
_c59.reflex(true);
var view=_c54.getAssociatedView();
if(_c59.bindingWindow==view.getContentWindow()){
_c54.updateDisplay(_c59);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_COMPLETED,view.getHandle());
if(StatusBar.state==StatusBar.BUSY){
StatusBar.clear();
}
}
_c54.onPageInitialize(_c59);
_c58.consume();
break;
case DockTabBinding.ACTION_UPDATE_VISUAL:
_c54.updateDisplay(_c59);
_c58.consume();
break;
case DockTabBinding.ACTION_UPDATE_TOKEN:
_c54.updateEntityToken(_c59);
_c58.consume();
break;
case EditorPageBinding.ACTION_DIRTY:
_c54.setDirty(true);
break;
case EditorPageBinding.ACTION_SAVE:
_c54.onSaveStart();
break;
case ViewBinding.ACTION_ONCLOSE:
self.closeTab(_c54);
_c58.consume();
break;
case ViewBinding.ACTION_ONCLOSE_FORCE:
self.closeTab(_c54,true);
_c58.consume();
break;
case DockPanelBinding.ACTION_FORCE_SELECT:
self.select(_c54);
break;
case Binding.ACTION_FORCE_REFLEX:
_c55.reflex(true);
_c58.consume();
break;
case DockTabBinding.ACTION_FORCE_CLEAN:
case EditorPageBinding.ACTION_CLEAN:
if(_c54.isDirty){
_c54.setDirty(false);
}
break;
case WindowBinding.ACTION_ONLOAD:
alert("HWEJ");
break;
}
}};
new List([DockTabBinding.ACTION_UPDATE_VISUAL,DockTabBinding.ACTION_UPDATE_TOKEN,PageBinding.ACTION_ATTACHED,PageBinding.ACTION_INITIALIZED,EditorPageBinding.ACTION_DIRTY,EditorPageBinding.ACTION_CLEAN,EditorPageBinding.ACTION_SAVE,ViewBinding.ACTION_ONCLOSE,ViewBinding.ACTION_ONCLOSE_FORCE,DockPanelBinding.ACTION_FORCE_SELECT,Binding.ACTION_FORCE_REFLEX,DockTabBinding.ACTION_FORCE_CLEAN,WindowBinding.ACTION_ONLOAD]).each(function(_c5b){
_c55.addActionListener(_c5b,_c57);
});
};
DockBinding.prototype.summonTabPanelBinding=function(){
return DockPanelBinding.newInstance(this.bindingDocument);
};
DockBinding.prototype.handleAction=function(_c5c){
DockBinding.superclass.handleAction.call(this,_c5c);
var _c5d=_c5c.target;
switch(_c5c.type){
case Binding.ACTION_ACTIVATED:
if(!this.isActive){
this.activate();
}
_c5c.consume();
break;
case TabBoxBinding.ACTION_UPDATED:
if(_c5d instanceof DockBinding){
if(_c5d.updateType==TabBoxBinding.UPDATE_DETACH){
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
this._viewBindingList.add(_c5d);
if(this.isActive){
_c5d.onActivate();
}
break;
case ViewBinding.ACTION_CLOSED:
this._viewBindingList.del(_c5d);
break;
}
};
DockBinding.prototype.handleBroadcast=function(_c5e,arg){
DockBinding.superclass.handleBroadcast.call(this,_c5e,arg);
switch(_c5e){
case BroadcastMessages.SYSTEMTREENODEBINDING_FOCUS:
var _c60=arg;
if(_c60.perspectiveNode==this.perspectiveNode){
this._selectTabByEntityToken(_c60.node.getEntityToken());
}
break;
}
};
DockBinding.prototype._selectTabByEntityToken=function(_c61){
var tabs=this.getTabBindings();
var _c63=false;
while(tabs.hasNext()&&!_c63){
var tab=tabs.getNext();
var _c65=tab.getEntityToken();
if(_c65!=null&&_c65==_c61){
if(!tab.isSelected){
this.select(tab,true);
_c63=true;
}
}
}
};
DockBinding.prototype.collapse=function(_c66){
this._handleCollapse(true,_c66);
};
DockBinding.prototype.unCollapse=function(_c67){
this._handleCollapse(false,_c67);
};
DockBinding.prototype._handleCollapse=function(_c68,_c69){
var _c6a=this.getChildBindingByLocalName("dockpanels");
var _c6b=this.getAncestorBindingByLocalName("splitbox");
if(_c68){
_c6a.hide();
this.bindingElement.style.height="auto";
this.isFlexible=false;
this.isActivatable=false;
this.setProperty("collapsed",true);
if(_c69&&_c6b.hasBothPanelsVisible()){
this.setWidth(200);
}
}else{
_c6a.show();
this.isFlexible=true;
this.isActivatable=true;
this.deleteProperty("collapsed");
if(_c69){
this.setWidth(false);
}
}
this.interceptDisplayChange(!_c68);
this.isCollapsed=_c68;
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
DockBinding.prototype.closeTab=function(_c70,_c71){
if(_c70.isDirty&&!_c71){
var _c72=Resolver.resolve(_c70.getLabel());
var self=this;
Dialog.question(StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Title"),StringBundle.getString("ui","WebSite.Application.DialogSaveResource.Text").replace("${resourcename}",_c72),Dialog.BUTTONS_YES_NO_CANCEL,{handleDialogResponse:function(_c74){
switch(_c74){
case Dialog.RESPONSE_YES:
setTimeout(function(){
self.saveContainedEditor(_c70);
},0);
break;
case Dialog.RESPONSE_NO:
self.removeTab(_c70);
break;
}
}});
}else{
this.removeTab(_c70);
}
};
DockBinding.prototype.closeTabsExcept=function(_c75){
var tabs=this.getTabBindings();
while(tabs.hasNext()){
var tab=tabs.getNext();
if(tab!=_c75){
this.closeTab(tab);
}
}
};
DockBinding.prototype.saveContainedEditor=function(_c78){
var _c79=_c78.getAssociatedView();
_c79.saveContainedEditor();
var self=this;
var _c7b={handleBroadcast:function(_c7c,arg){
switch(_c7c){
case BroadcastMessages.CURRENT_SAVED:
if(arg.handle==_c79.getHandle()){
EventBroadcaster.unsubscribe(BroadcastMessages.CURRENT_SAVED,_c7b);
if(arg.isSuccess){
self.removeTab(_c78);
}
}
break;
}
}};
EventBroadcaster.subscribe(BroadcastMessages.CURRENT_SAVED,_c7b);
};
DockBinding.prototype.appendTabByBindings=function(_c7e,_c7f){
if(this.isEmpty){
this.isEmpty=false;
this.isActivatable=true;
this.setWidth(false);
this.dispatchAction(DockBinding.ACTION_OPENED);
}
DockBinding.superclass.appendTabByBindings.call(this,_c7e,_c7f);
};
DockBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
DockBinding.prototype.getWidth=function(){
return this.bindingElement.offsetWidth;
};
DockBinding.prototype.setWidth=function(_c80){
_c80=_c80?_c80+"px":"100%";
this.bindingElement.style.width=_c80;
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
DockBinding.prototype.showControls=function(_c81){
var tabs=this.getChildBindingByLocalName(this._nodename_tabs);
if(_c81){
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
var _c84=DockControlBinding.newInstance(this.bindingDocument);
_c84.setControlType(type);
return _c84;
};
DockTabsBinding.prototype.flex=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _c86=self.containingTabBoxBinding.getWidth();
if(!isNaN(_c86)){
_c86=_c86>0?_c86-1:0;
self.bindingElement.style.width=new String(_c86)+"px";
}
}
setTimeout(fix,250);
fix();
}
DockTabsBinding.superclass.flex.call(this);
};
DockTabsBinding.prototype.handleCrawler=function(_c87){
DockTabsBinding.superclass.handleCrawler.call(this,_c87);
switch(_c87.id){
case FlexBoxCrawler.ID:
this._explorerFlexHack();
break;
}
};
DockTabsBinding.prototype._explorerFlexHack=function(){
if(Client.isExplorer&&this.containingTabBoxBinding!=null){
var self=this;
function fix(){
var _c89=self.containingTabBoxBinding.getWidth();
if(!isNaN(_c89)){
_c89=_c89>0?_c89-1:0;
self.bindingElement.style.width=new String(_c89)+"px";
}
}
setTimeout(fix,250);
fix();
}
};
DockTabsBinding.newInstance=function(_c8a){
var _c8b=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktabs",_c8a);
return UserInterface.registerBinding(_c8b,DockTabsBinding);
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
DockTabBinding.prototype.setAssociatedView=function(_c8c){
this._viewBinding=_c8c;
};
DockTabBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
DockTabBinding.prototype.serialize=function(){
var _c8d=DockTabBinding.superclass.serialize.call(this);
if(_c8d){
_c8d.label=null;
_c8d.image=null;
_c8d.handle=this.getHandle();
}
return _c8d;
};
DockTabBinding.prototype.setHandle=function(_c8e){
this.setProperty("handle",_c8e);
};
DockTabBinding.prototype.getHandle=function(){
return this.getProperty("handle");
};
DockTabBinding.prototype.setEntityToken=function(_c8f){
if(this._entityToken==null){
this.subscribe(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
this._entityToken=_c8f;
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
var _c90=DialogControlBinding.newInstance(this.bindingDocument);
_c90.setControlType(ControlBinding.TYPE_CLOSE);
this._controlGroupBinding.add(_c90);
this._controlGroupBinding.attachRecursive();
};
DockTabBinding.prototype.setDirty=function(_c91){
if(this.containingTabBoxBinding.type==DockBinding.TYPE_EDITORS){
if(this.isDirty!=_c91){
this.isDirty=_c91;
if(Binding.exists(this.labelBinding)){
var _c92=this.labelBinding.getLabel();
if(_c92!=null){
this.labelBinding.setLabel(_c91?"*"+_c92:_c92.slice(1,_c92.length));
}else{
this.labelBinding.setLabel(_c91?"*":"");
}
}
}
var _c93=top.app.bindingMap.broadcasterCurrentTabDirty;
if(this.isDirty==true){
this.subscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_DIRTY,this);
_c93.enable();
}else{
this.unsubscribe(BroadcastMessages.SAVE_CURRENT);
EventBroadcaster.broadcast(BroadcastMessages.DOCKTAB_CLEAN,this);
_c93.disable();
}
}else{
Dialog.warning("Dirty denied","Only editor docks should invoke the dirty state!");
}
};
DockTabBinding.prototype.updateDisplay=function(_c94){
this.setLabel(_c94.getLabel());
this.setImage(_c94.getImage());
this.setToolTip(_c94.getToolTip());
};
DockTabBinding.prototype.updateEntityToken=function(_c95){
this.setEntityToken(_c95.getEntityToken());
};
DockTabBinding.prototype.handleAction=function(_c96){
DockTabBinding.superclass.handleAction.call(this,_c96);
var _c97=_c96.target;
switch(_c96.type){
case ControlBinding.ACTION_COMMAND:
if(_c97.controlType==ControlBinding.TYPE_CLOSE){
this.close();
}
break;
case MenuItemBinding.ACTION_COMMAND:
if(_c96.listener==this.contextMenuBinding){
this._handleContextMenuItemBinding(_c97);
}
break;
}
};
DockTabBinding.prototype._handleContextMenuItemBinding=function(_c98){
var cmd=_c98.getProperty("cmd");
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
DockTabBinding.prototype.setLabel=function(_c9a){
if(!_c9a){
if(!this.getLabel()){
_c9a=DockTabBinding.LABEL_TABLOADING;
}else{
if(this.getLabel()==DockTabBinding.LABEL_TABLOADING){
_c9a=DockTabBinding.LABEL_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setLabel.call(this,_c9a);
};
DockTabBinding.prototype.setImage=function(_c9b){
if(!_c9b){
if(!this.getImage()){
_c9b=DockTabBinding.IMG_TABLOADING;
}else{
if(this.getImage()==DockTabBinding.IMG_TABLOADING){
_c9b=DockTabBinding.IMG_TABDEFAULT;
}
}
}
DockTabBinding.superclass.setImage.call(this,_c9b);
};
DockTabBinding.prototype._viewSource=function(cmd){
var def=ViewDefinitions["Composite.Management.SourceCodeViewer"];
def.argument={action:cmd,doc:this._viewBinding.windowBinding.getContentDocument()};
var _c9e=Resolver.resolve(this.getLabel());
switch(cmd){
case DockTabPopupBinding.CMD_VIEWSOURCE:
def.label="Source: "+_c9e;
break;
case DockTabPopupBinding.CMD_VIEWGENERATED:
def.label="Generated: "+_c9e;
break;
case DockTabPopupBinding.CMD_VIEWSERIALIZED:
def.label="Serialized: "+_c9e;
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
var _ca0=this.bindingElement;
setTimeout(function(){
_ca0.style.bottom="auto";
},25);
}
};
DockTabBinding.prototype.handleBroadcast=function(_ca1,arg){
DockTabBinding.superclass.handleBroadcast.call(this,_ca1,arg);
var body=this._viewBinding.getContentDocument().body;
var root=UserInterface.getBinding(body);
switch(_ca1){
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
DockTabBinding.prototype.select=function(_ca6){
DockTabBinding.superclass.select.call(this,_ca6);
this._updateBroadcasters();
if(_ca6!=true){
this._updateTree();
}
this._updateGlobalEntityToken();
};
DockTabBinding.prototype.close=function(){
this.containingTabBoxBinding.closeTab(this);
};
DockTabBinding.prototype._updateBroadcasters=function(){
if(this.isSelected){
var _ca7=top.app.bindingMap.broadcasterCurrentTabDirty;
var _ca8=top.app.bindingMap.broadcasterCurrentIsEditor;
if(this._isEditorDockTab()){
_ca8.enable();
if(this.isDirty){
_ca7.enable();
}else{
_ca7.disable();
}
}else{
_ca8.disable();
_ca7.disable();
}
}
};
DockTabBinding.prototype._updateTree=function(_ca9){
if(this._canUpdateTree||_ca9){
EventBroadcaster.broadcast(BroadcastMessages.DOCKTABBINDING_SELECT,this);
}
};
DockTabBinding.prototype._isEditorDockTab=function(){
var _caa=false;
if(this._viewBinding!=null){
var win=this._viewBinding.getContentWindow();
if(win!=null&&win.bindingMap!=null){
var _cac=win.bindingMap.savebutton;
if(_cac!=null){
_caa=true;
}
}
}
return _caa;
};
DockTabBinding.prototype._updateGlobalEntityToken=function(){
StageBinding.entityToken=this._entityToken;
};
DockTabBinding.newInstance=function(_cad){
var _cae=DOMUtil.createElementNS(Constants.NS_UI,"ui:docktab",_cad);
return UserInterface.registerBinding(_cae,DockTabBinding);
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
DockPanelsBinding.newInstance=function(_caf){
var _cb0=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanels",_caf);
return UserInterface.registerBinding(_cb0,DockPanelsBinding);
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
DockPanelBinding.prototype.select=function(_cb1){
DockPanelBinding.superclass.select.call(this,_cb1);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.unselect=function(){
DockPanelBinding.superclass.unselect.call(this);
this.dispatchAction(Binding.ACTION_VISIBILITYCHANGED);
};
DockPanelBinding.prototype.flex=function(){
this.dispatchAction(Binding.ACTION_DIMENSIONCHANGED);
};
DockPanelBinding.prototype.handleCrawler=function(_cb2){
DockPanelBinding.superclass.handleCrawler.call(this,_cb2);
if(_cb2.response==null){
if(_cb2.type==NodeCrawler.TYPE_DESCENDING){
if(this.viewBinding!=null){
if(_cb2.id==FocusCrawler.ID){
_cb2.nextNode=this.viewBinding.bindingElement;
}
}
}
}
};
DockPanelBinding.newInstance=function(_cb3){
var _cb4=DOMUtil.createElementNS(Constants.NS_UI,"ui:dockpanel",_cb3);
return UserInterface.registerBinding(_cb4,DockPanelBinding);
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
DockControlBinding.newInstance=function(_cb5){
var _cb6=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_cb5);
return UserInterface.registerBinding(_cb6,DockControlBinding);
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
ViewBinding.getInstance=function(_cb7){
var _cb8=ViewBinding._instances.get(_cb7);
if(!_cb8){
var cry="ViewBinding.getInstance: No such instance: "+_cb7;
SystemLogger.getLogger("ViewBinding [static]").error(cry);
SystemDebug.stack(arguments);
if(Application.isDeveloperMode){
alert(cry);
}
}
return _cb8;
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
var _cbb=!System.hasActivePerspectives&&Client.isExplorer;
if(this.isFreeFloating==true&&!_cbb){
if(snap.isVisible==true){
if(snap.isAttached==true){
var _cbc=snap.boxObject.getGlobalPosition();
var _cbd=snap.boxObject.getDimension();
if(!Point.isEqual(_cbc,this._lastknownposition)){
this.setPosition(_cbc);
this._lastknownposition=_cbc;
}
if(!Dimension.isEqual(_cbd,this._lastknowndimension)){
this.setDimension(_cbd);
this._lastknowndimension=_cbd;
var _cbe=_cbd.h-ViewBinding.VERTICAL_ADJUST;
_cbe=_cbe<0?0:_cbe;
this.windowBinding.getBindingElement().style.height=new String(_cbe)+"px";
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
var _cbf=this._viewDefinition.flowHandle;
if(_cbf!=null){
FlowControllerService.CancelFlow(_cbf);
}
}
if(this._viewDefinition!=null){
var _cc0=this._viewDefinition.handle;
EventBroadcaster.broadcast(BroadcastMessages.VIEW_CLOSED,_cc0);
this.logger.fine("ViewBinding closed: \""+_cc0+"\"");
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
var _cc2=null;
if(this._viewDefinition!=null){
_cc2=this._viewDefinition.handle;
}
return _cc2;
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
ViewBinding.prototype.setDefinition=function(_cc3){
this._viewDefinition=_cc3;
if(_cc3.flowHandle!=null){
this.subscribe(BroadcastMessages.CLOSE_VIEWS);
}
};
ViewBinding.prototype.getDefinition=function(){
return this._viewDefinition;
};
ViewBinding.prototype.handleAction=function(_cc4){
ViewBinding.superclass.handleAction.call(this,_cc4);
var _cc5=_cc4.target;
switch(_cc4.type){
case RootBinding.ACTION_PHASE_1:
case RootBinding.ACTION_PHASE_2:
case RootBinding.ACTION_PHASE_3:
if(_cc4.type==RootBinding.ACTION_PHASE_1){
if(this.isActivated&&!_cc5.isActivated){
_cc5.onActivate();
}
}
_cc4.consume();
break;
case Binding.ACTION_DIMENSIONCHANGED:
if(this.isFreeFloating==true){
if(_cc5==this._snapBinding){
if(this.isVisible==true){
this.updatePositionDimension();
_cc4.consume();
}
}
}
break;
case Binding.ACTION_VISIBILITYCHANGED:
if(this.isFreeFloating==true){
if(_cc5==this._snapBinding){
if(_cc5.isVisible==true){
this.show();
}else{
this.hide();
}
}
}
break;
case WindowBinding.ACTION_LOADED:
case WindowBinding.ACTION_ONLOAD:
if(_cc5.getContentWindow().isPostBackDocument){
if(_cc4.type==WindowBinding.ACTION_ONLOAD){
var arg=this._viewDefinition.argument;
if(arg!=null&&arg.list!=null&&arg.url!=null){
_cc5.post(arg.list,arg.url);
arg.list=null;
arg.url=null;
}
}
}else{
if(Client.isExplorer==true){
if(_cc5==this.windowBinding){
var self=this;
DOMEvents.addEventListener(_cc5.getContentWindow(),DOMEvents.UNLOAD,{handleEvent:function(e){
if(Binding.exists(self._coverBinding)==true){
self._coverBinding.show();
}
}});
}
if(_cc4.type==WindowBinding.ACTION_ONLOAD){
if(this._coverBinding){
this._coverBinding.hide();
}
}
}
}
if(_cc4.type==WindowBinding.ACTION_ONLOAD){
var win=_cc5.getContentWindow();
if(win.WindowManager==null){
if(!this._isLoaded){
this._onLoadingCompleted(_cc5);
}
}
}
_cc4.consume();
break;
case PageBinding.ACTION_ATTACHED:
if(!_cc5.label&&this._viewDefinition.label){
_cc5.label=this._viewDefinition.label;
}
if(!_cc5.image&&this._viewDefinition.image){
_cc5.image=this._viewDefinition.image;
}
if(_cc5.bindingWindow==this.getContentWindow()){
this._pageBinding=_cc5;
this._injectPageArgument();
}
case PageBinding.ACTION_INITIALIZED:
if(_cc5.bindingWindow==this.getContentWindow()){
if(Client.isExplorer&&this._coverBinding){
this._coverBinding.hide();
}
if(!this._isLoaded){
this._onLoadingCompleted();
}
}
break;
case Binding.ACTION_DISPOSED:
if(this.isFreeFloating&&_cc5==this._snapBinding){
this.removeActionListener(Binding.ACTION_DISPOSED);
this.dispose();
_cc4.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
case WizardPageBinding.ACTION_FINISH:
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
_cc4.consume();
break;
case ViewBinding.ACTION_DETACH:
this.setDefinition(ViewDefinitions["Composite.Management.Null"]);
ViewBinding._instances.set(this._viewDefinition.handle,this);
break;
}
};
ViewBinding.prototype.handleBroadcast=function(_cca,arg){
ViewBinding.superclass.handleBroadcast.call(this,_cca,arg);
switch(_cca){
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
var _cce=def.argument;
if(_cce!=null){
page.setPageArgument(_cce);
}
var _ccf=def.width;
if(_ccf!=null){
page.width=_ccf;
}
var _cd0=def.height;
if(_cd0!=null){
page.height=_cd0;
}
}
};
ViewBinding.prototype.handleCrawler=function(_cd1){
ViewBinding.superclass.handleCrawler.call(this,_cd1);
switch(_cd1.type){
case NodeCrawler.TYPE_DESCENDING:
if(this.isFreeFloating==true){
if(_cd1.id==FocusCrawler.ID){
if(_cd1.previousNode!=this._snapBinding.bindingElement){
_cd1.response=NodeCrawler.SKIP_NODE;
}
}
}
break;
case NodeCrawler.TYPE_ASCENDING:
if(this.isFreeFloating==true){
_cd1.nextNode=this._snapBinding.bindingElement;
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
ViewBinding.prototype.setPosition=function(_cd2){
_cd2.x+=ViewBinding.HORIZONTAL_ADJUST;
this.bindingElement.style.left=_cd2.x+"px";
this.bindingElement.style.top=_cd2.y+"px";
};
ViewBinding.prototype.setDimension=function(_cd3){
_cd3.h-=ViewBinding.VERTICAL_ADJUST;
_cd3.w-=ViewBinding.HORIZONTAL_ADJUST;
_cd3.w-=1;
if(_cd3.h<0){
_cd3.h=0;
}
if(_cd3.w<0){
_cd3.w=0;
}
this.bindingElement.style.width=String(_cd3.w)+"px";
this.bindingElement.style.height=String(_cd3.h)+"px";
};
ViewBinding.prototype.snapToBinding=function(_cd4){
this.isFlexBoxBehavior=false;
_cd4.addActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
_cd4.addActionListener(Binding.ACTION_POSITIONCHANGED,this);
_cd4.addActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
_cd4.addActionListener(Binding.ACTION_DISPOSED,this);
if(this._snapBinding){
this._snapBinding.removeActionListener(Binding.ACTION_DIMENSIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_POSITIONCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_VISIBILITYCHANGED,this);
this._snapBinding.removeActionListener(Binding.ACTION_DISPOSED,this);
this._snapBinding.viewBinding=null;
}
this._snapBinding=_cd4;
this._snapBinding.viewBinding=this;
this.isFreeFloating=true;
if(!this._isViewBindingInitialized){
this.initialize();
}
};
ViewBinding.prototype.getMigrationParent=function(){
var _cd5=null;
if(this.isFreeFloating==true){
_cd5=this._snapBinding.getBindingElement();
}else{
_cd5=ViewBinding.superclass.getMigrationParent.call(this);
}
return _cd5;
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
ViewBinding.prototype.reload=function(_cd6){
this._isLoaded=false;
this.windowBinding.reload(_cd6);
EventBroadcaster.broadcast(BroadcastMessages.VIEW_OPENING,this.getHandle());
};
ViewBinding.prototype.saveContainedEditor=function(){
var _cd7=false;
var page=this._pageBinding;
if(page!=null&&page instanceof EditorPageBinding){
if(page.canSave()){
page.doSave();
_cd7=true;
}
}
if(!_cd7){
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
ViewBinding.newInstance=function(_cdb){
var _cdc=DOMUtil.createElementNS(Constants.NS_UI,"ui:view",_cdb);
var _cdd=UserInterface.registerBinding(_cdc,ViewBinding);
_cdd.windowBinding=_cdd.add(WindowBinding.newInstance(_cdb));
_cdd.windowBinding.isFlexible=false;
return _cdd;
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
var _ce5=this.bindingWindow.__doPostBack;
var _ce6=false;
if(!form.__isSetup){
DOMEvents.addEventListener(this.bindingWindow,DOMEvents.UNLOAD,{handleEvent:function(){
if(_ce6){
Application.unlock(self);
}
}});
}
this.bindingWindow.__doPostBack=function(_ce7,_ce8){
if(!form.__isSetup){
Application.lock(self);
_ce6=true;
}
self.manifestAllDataBindings();
_ce5(_ce7,_ce8);
if(Application.isDeveloperMode){
self._debugDotNetPostback();
}
};
};
PageBinding.prototype.postMessage=function(_ce9,list){
var _ceb=this.bindingWindow.bindingMap.__REQUEST;
if(_ceb!=null&&this._isDotNet()){
switch(_ce9){
case EditorPageBinding.MESSAGE_SAVE:
case EditorPageBinding.MESSAGE_PERSIST:
if(this.bindingWindow.DataManager.isDirty){
if(this.validateAllDataBindings()){
if(list!=null){
list.add(this);
}
_ceb.postback(_ce9);
}
}
break;
default:
_ceb.postback(_ce9);
break;
}
}
if(list!=null){
this._postMessageToDescendants(_ce9,list);
}
};
PageBinding.prototype._postMessageToDescendants=function(_cec,list){
var _cee=this.getDescendantBindingsByType(WindowBinding);
_cee.each(function(win){
var page=win.getPageBinding();
if(page!=null){
page.postMessage(_cec,list);
}
});
};
PageBinding.prototype._debugDotNetPostback=function(){
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_cf2){
list.add({name:_cf2.name,value:_cf2.value});
});
var out="";
list.each(function(_cf4){
out+=_cf4.name+": "+_cf4.value+"\n";
});
this.logger.debug(out);
};
PageBinding.prototype.handleAction=function(_cf5){
PageBinding.superclass.handleAction.call(this,_cf5);
var _cf6=_cf5.target;
switch(_cf5.type){
case RootBinding.ACTION_PHASE_3:
if(_cf6==UserInterface.getBinding(this.bindingDocument.body)){
_cf6.removeActionListener(RootBinding.ACTION_PHASE_3,this);
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
this.doPostBack(_cf6);
}
_cf5.consume();
break;
case PageBinding.ACTION_DOVALIDATEDPOSTBACK:
if(this._isDotNet()){
var _cf7=this.validateAllDataBindings();
if(_cf7){
this.doPostBack(_cf6);
}
}
_cf5.consume();
break;
case BalloonBinding.ACTION_INITIALIZE:
_cf5.consume();
break;
case PageBinding.ACTION_BLOCK_INIT:
if(this._initBlockers==null){
this._initBlockers=new Map();
}
this._initBlockers.set(_cf6.key,true);
break;
case PageBinding.ACTION_UNBLOCK_INIT:
if(this._initBlockers!=null){
if(this._initBlockers.has(_cf6.key)){
this._initBlockers.del(_cf6.key);
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
var _cf9={handleAction:function(_cfa){
if(_cfa.target==self){
self.removeActionListener(PageBinding.ACTION_UPDATED,_cf9);
MessageQueue.udpdate();
}
}};
this.addActionListener(PageBinding.ACTION_UPDATED,_cf9);
}else{
MessageQueue.udpdate();
}
_cf5.consume();
break;
}
};
PageBinding.prototype.handleBroadcast=function(_cfb,arg){
PageBinding.superclass.handleBroadcast.call(this,_cfb,arg);
switch(_cfb){
case BroadcastMessages.MESSAGEQUEUE_REQUESTED:
var _cfd=arg;
if(!this._canPostBack&&!_cfd){
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
PageBinding.prototype.doPostBack=function(_cff){
if(this._canPostBack){
if(_cff!=null&&this._isDotNet()){
var _d00=_cff.getCallBackID();
var _d01=_cff.getCallBackArg();
if(_d00!=null){
_d00=_d00.replace(/_/g,"$");
}else{
_d00="";
}
if(_d01==null){
_d01="";
}
this.bindingWindow.__doPostBack(_d00,_d01);
}
}
};
PageBinding.prototype.validateAllDataBindings=function(){
var _d02=true;
var _d03=this.bindingWindow.DataManager.getAllDataBindings();
while(_d03.hasNext()&&_d02){
var _d04=_d03.getNext();
if(_d04.isAttached){
var _d05=_d04.validate();
if(_d02&&!_d05){
_d02=false;
this.logger.debug("Invalid DataBinding: "+_d04.toString()+" ("+_d04.getName()+")");
break;
}
}
}
return _d02;
};
PageBinding.prototype.manifestAllDataBindings=function(){
var list=new List();
var _d07=this.bindingWindow.DataManager.getAllDataBindings();
while(_d07.hasNext()){
var _d08=_d07.getNext();
if(_d08.isAttached){
var _d09=_d08.manifest();
if(_d09!=null){
list.add(_d09);
}
}
}
return list;
};
PageBinding.prototype.cleanAllDataBindings=function(){
var _d0a=this.bindingWindow.DataManager.getAllDataBindings();
while(_d0a.hasNext()){
var _d0b=_d0a.getNext();
if(_d0b.isAttached){
_d0b.clean();
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
var _d0d=this._cachedFocus.getBinding();
if(_d0d){
_d0d.blur();
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
var _d0e=this.getProperty("width");
if(!_d0e){
_d0e=this.hasClassName(DialogPageBinding.CLASSNAME_TABBOXED)?DialogPageBinding.DEFAULT_TABBOXED_WIDTH:DialogPageBinding.DEFAULT_WIDTH;
}
this.width=_d0e;
}
if(this.height==null){
var _d0f=this.getProperty("height");
this.height=_d0f?_d0f:DialogPageBinding.DEFAULT_HEIGHT;
}
if(this.minheight==null){
var _d10=this.getProperty("minheight");
if(_d10!=null){
this.minheight=_d10;
}
}
if(this.controls==null){
var _d11=this.getProperty("controls");
this.controls=_d11?_d11:DialogPageBinding.DEFAULT_CONTROLS;
}
if(!this.isResizable){
var _d12=this.getProperty("resizable");
this.isResizable=_d12?_d12:DialogPageBinding.DEFAULT_RESIZABLE;
}
if(this.height=="auto"){
this.enableAutoHeightLayoutMode(true);
}
};
DialogPageBinding.prototype.enableAutoHeightLayoutMode=function(_d13){
if(_d13!=this.isAutoHeightLayoutMode){
if(_d13){
this.attachClassName("auto");
}else{
this.detachClassName("auto");
}
this.isAutoHeightLayoutMode=_d13;
}
};
DialogPageBinding.prototype.handleAction=function(_d14){
DialogPageBinding.superclass.handleAction.call(this,_d14);
var _d15=_d14.target;
switch(_d14.type){
case PageBinding.ACTION_ATTACHED:
if(_d15!=this&&_d15.isFitAsDialogSubPage){
_d15.makeDialogSubPage();
}
break;
case ButtonBinding.ACTION_COMMAND:
_d14.consume();
if(_d15.response!=null){
this.response=_d15.response;
switch(_d15.response){
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
DialogPageBinding.prototype._disableAcceptButton=function(_d16){
var _d17=this.bindingWindow.bindingMap.buttonAccept;
if(_d17!=null){
_d17.setDisabled(_d16);
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
DialogPageBodyBinding.prototype._setFitnessHeight=function(_d18){
var _d19=CSSComputer.getPadding(this.bindingElement);
var _d1a=CSSComputer.getBorder(this.bindingElement);
_d18+=_d19.top+_d19.bottom;
_d18+=_d1a.top+_d1a.bottom;
if(_d18>this.bindingElement.offsetHeight){
this.bindingElement.style.height=_d18+"px";
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
EditorPageBinding.prototype.handleAction=function(_d22){
EditorPageBinding.superclass.handleAction.call(this,_d22);
var _d23=_d22.target;
switch(_d22.type){
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
var _d24=-1;
this._messengers.each(function(page){
var res=page.bindingWindow==_d23.bindingWindow;
if(res){
page.bindingWindow.DataManager.isDirty=false;
if(_d24==-1){
_d24=0;
}
}else{
_d24++;
}
return res;
});
if(_d24>-1){
this._messengers.del(_d24);
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
_d22.consume();
break;
case Binding.ACTION_INVALID:
this.enableSave(false);
this._invalidBindings.set(_d23.key,_d23);
if(_d23 instanceof FieldsBinding){
this._updateStatusBar();
}
break;
case Binding.ACTION_VALID:
this._invalidBindings.del(_d23.key);
if(_d23 instanceof FieldsBinding){
this._updateStatusBar();
}
if(!this._invalidBindings.hasEntries()){
this.enableSave(true);
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_d23==this._tabBoxBinding){
if(this._windowBinding!=null){
var tab=_d23.getSelectedTabBinding();
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
_d22.consume();
break;
case TabBoxBinding.ACTION_UNSELECTED:
if(_d23==this._tabBoxBinding){
this.postMessage(EditorPageBinding.MESSAGE_PERSIST);
}
_d22.consume();
break;
case WindowBinding.ACTION_LOADED:
if(_d23==this._windowBinding){
if(this._isGeneratingPreview==true){
this._generatePreview();
this._isGeneratingPreview=false;
}
_d22.consume();
}
break;
case WindowBinding.ACTION_ONLOAD:
if(_d23==this._windowBinding){
if(_d23.getContentWindow().isPostBackDocument!=true){
if(Client.isPrism){
Prism.enableCache();
}
var self=this;
setTimeout(function(){
Application.unlock(self);
},100);
if(EventBroadcaster.hasSubscribers(BroadcastMessages.XHTML_MARKUP_ON)){
var _d29=WindowBinding.getMarkup(this._windowBinding);
if(_d29!=null){
EventBroadcaster.broadcast(BroadcastMessages.XHTML_MARKUP_ON,_d29);
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
var _d2a=this.bindingWindow.bindingMap.savebutton;
if(_d2a!=null&&!_d2a.isDisabled){
_d2a.fireCommand();
}
};
EditorPageBinding.prototype._saveEditorPage=function(){
if(Application.isDeveloperMode){
}
if(this.validateAllDataBindings()){
this.bindingWindow.DataManager.isDirty=false;
var _d2b=this.bindingWindow.bindingMap.__REQUEST;
if(_d2b!=null){
_d2b.postback(EditorPageBinding.MESSAGE_SAVE);
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
EditorPageBinding.prototype.postMessage=function(_d2c){
this._message=null;
switch(_d2c){
case EditorPageBinding.MESSAGE_SAVE:
this._postMessageToDescendants(_d2c,this._messengers);
if(!this._messengers.hasEntries()){
this._saveEditorPage();
}else{
this._message=_d2c;
}
break;
case EditorPageBinding.MESSAGE_PERSIST:
this._message=_d2c;
EditorPageBinding.superclass.postMessage.call(this,_d2c,this._messengers);
break;
case EditorPageBinding.MESSAGE_REFRESH:
EditorPageBinding.superclass.postMessage.call(this,_d2c,this._messengers);
break;
}
};
EditorPageBinding.prototype.handleBroadcast=function(_d2d,arg){
EditorPageBinding.superclass.handleBroadcast.call(this,_d2d,arg);
switch(_d2d){
case BroadcastMessages.HIGHLIGHT_KEYWORDS:
var _d2f=arg;
if(UserInterface.isBindingVisible(this._windowBinding)){
WindowBinding.highlightKeywords(this._windowBinding,_d2f);
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
var _d30=new List();
this._invalidBindings.each(function(key,_d32){
var list=_d32.getInvalidLabels();
if(list){
list.each(function(_d34){
_d30.add(_d34);
});
}
});
if(_d30.hasEntries()){
var _d35="";
while(_d30.hasNext()){
_d35+=_d30.getNext().toLowerCase();
if(_d30.hasNext()){
_d35+=", ";
}else{
_d35+=".";
}
}
var _d36=StringBundle.getString("ui","Website.App.StatusBar.ErrorInField");
StatusBar.error(_d36+" "+_d35);
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
EditorPageBinding.prototype.enableSave=function(_d37){
var _d38=this.bindingDocument.getElementById("broadcasterCanSave");
if(_d38){
var _d39=UserInterface.getBinding(_d38);
if(_d37){
_d39.enable();
}else{
_d39.disable();
}
}else{
throw new Error("A required BroadcasterBinding could not be located.");
}
};
EditorPageBinding.prototype.enableSaveAs=function(){
var _d3a=this.bindingDocument.getElementById(EditorPageBinding.ID_SAVEASBUTTON);
if(_d3a!=null){
UserInterface.getBinding(_d3a).enable();
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
var _d3b=this._windowBinding.getContentDocument().title;
if(_d3b==WindowBinding.POSTBACK_TITLE){
if(this.validateAllDataBindings()){
this.manifestAllDataBindings();
var _d3c=this._tabBinding.getCallBackID();
var list=new List();
new List(this.bindingDocument.forms[0].elements).each(function(_d3e){
if(_d3e.name=="__EVENTTARGET"&&_d3c){
_d3e.value=_d3c;
}
list.add({name:_d3e.name,value:_d3e.value});
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
WizardPageBinding.prototype.handleAction=function(_d40){
WizardPageBinding.superclass.handleAction.call(this,_d40);
var _d41=_d40.target;
switch(_d40.type){
case WizardPageBinding.ACTION_NAVIGATE_NEXT:
case WizardPageBinding.ACTION_FINISH:
if(this.validateAllDataBindings()==true){
this.doPostBack(_d41);
}else{
_d40.consume();
}
break;
case WizardPageBinding.ACTION_NAVIGATE_PREVIOUS:
this.doPostBack(_d41);
break;
case Binding.ACTION_INVALID:
this._enableNextAndFinish(false);
_d40.consume();
break;
case Binding.ACTION_VALID:
this._enableNextAndFinish(true);
_d40.consume();
break;
}
};
WizardPageBinding.prototype._enableNextAndFinish=function(_d42){
var next=this.bindingWindow.bindingMap.nextbutton;
var _d44=this.bindingWindow.bindingMap.finishbutton;
if(next){
next.setDisabled(!_d42);
}
if(_d44){
_d44.setDisabled(!_d42);
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
MarkupAwarePageBinding.prototype.handleBroadcast=function(_d45,arg){
MarkupAwarePageBinding.superclass.handleBroadcast.call(this,_d45,arg);
var self=this;
switch(_d45){
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
MarkupAwarePageBinding.prototype._handleMarkup=function(_d49){
};
MarkupAwarePageBinding.prototype._activate=function(_d4a){
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
var _d4b=this.bindingWindow.bindingMap.moreactionstoolbargroup;
this._moreActionsWidth=_d4b.boxObject.getDimension().w;
_d4b.hide();
var _d4c=this.boxObject.getDimension().h;
this.bindingElement.style.height=_d4c+"px";
var self=this;
var _d4e=this.bindingWindow.bindingMap.moreactionsbutton;
_d4e.addActionListener(ButtonBinding.ACTION_COMMAND,{handleAction:function(_d4f){
self._showMoreActions();
_d4f.consume();
}});
var _d50=this.bindingWindow.bindingMap.moreactionspopup;
_d50.addActionListener(MenuItemBinding.ACTION_COMMAND,{handleAction:function(_d51){
var item=_d51.target;
self._handleSystemAction(item.associatedSystemAction);
}});
SystemToolBarBinding.superclass.onBindingInitialize.call(this);
};
SystemToolBarBinding.prototype.handleBroadcast=function(_d53,arg){
SystemToolBarBinding.superclass.handleBroadcast.call(this,_d53,arg);
switch(_d53){
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
var _d57=self.bindingWindow.bindingMap.moreactionstoolbargroup;
if(_d57!=null){
_d57.hide();
}
},0);
}
break;
case this.bindingWindow.WindowManager.WINDOW_RESIZED_BROADCAST:
var _d58=this.bindingWindow.WindowManager;
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
var _d59=new String("");
this._actionProfile.each(function(_d5a,list){
list.each(function(_d5c){
_d59+=_d5c.getHandle()+";";
});
});
return _d59;
};
SystemToolBarBinding.prototype.handleAction=function(_d5d){
SystemToolBarBinding.superclass.handleAction.call(this,_d5d);
switch(_d5d.type){
case ButtonBinding.ACTION_COMMAND:
var _d5e=_d5d.target;
this._handleSystemAction(_d5e.associatedSystemAction);
break;
}
};
SystemToolBarBinding.prototype._handleSystemAction=function(_d5f){
if(_d5f!=null){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _d61=list.getFirst();
var _d62=_d61.node;
}
SystemAction.invoke(_d5f,_d62);
}
};
SystemToolBarBinding.prototype.buildLeft=function(){
if(this.isInitialized&&this._actionProfile!=null&&this._actionProfile.hasEntries()){
var doc=this.bindingDocument;
var self=this;
this._actionProfile.each(function(_d65,list){
var _d67=new List();
list.reset();
while(list.hasNext()){
var _d68=list.getNext();
var _d69=null;
if(_d68.isInToolBar()){
if(_d68.isInFolder()){
alert("IsInFolder not implemented!");
}else{
_d69=self.getToolBarButtonBinding(_d68);
}
}
if(_d69!=null){
_d67.add(_d69);
}
}
if(_d67.hasEntries()){
var _d6a=ToolBarGroupBinding.newInstance(doc);
_d67.each(function(_d6b){
_d6a.add(_d6b);
});
self.addLeft(_d6a);
}
});
this.attachRecursive();
this._containAllButtons();
}
};
SystemToolBarBinding.prototype._containAllButtons=function(){
var _d6c=this.bindingWindow.bindingMap.toolsbutton;
var _d6d=this.bindingWindow.bindingMap.moreactionstoolbargroup;
var _d6e=_d6c.bindingElement.offsetLeft-this._moreActionsWidth;
var _d6f=0;
var _d70=new List();
var _d71,_d72=this._toolBarBodyLeft.getDescendantBindingsByLocalName("toolbarbutton");
while((_d71=_d72.getNext())!=null){
if(!_d71.isVisible){
_d71.show();
}
_d6f+=_d71.boxObject.getDimension().w;
if(_d6f>=_d6e){
_d70.add(_d71);
_d71.hide();
}
}
if(_d70.hasEntries()){
var _d73=_d70.getFirst().bindingElement.parentNode;
UserInterface.getBinding(_d73).setLayout(ToolBarGroupBinding.LAYOUT_LAST);
this._moreActions=new List();
while((_d71=_d70.getNext())!=null){
this._moreActions.add(_d71.associatedSystemAction);
}
_d6d.show();
}else{
this._moreActions=null;
_d6d.hide();
}
};
SystemToolBarBinding.prototype._showMoreActions=function(){
if(this._moreActions!=null){
var _d74=this.bindingWindow.bindingMap.moreactionspopup;
_d74.empty();
while((action=this._moreActions.getNext())!=null){
var item=MenuItemBinding.newInstance(_d74.bindingDocument);
item.setLabel(action.getLabel());
item.setToolTip(action.getToolTip());
item.imageProfile=new ImageProfile({image:action.getImage(),imageDisabled:action.getDisabledImage()});
if(action.isDisabled()){
item.disable();
}
item.associatedSystemAction=action;
_d74.add(item);
}
_d74.attachRecursive();
this._moreActions=null;
}
};
SystemToolBarBinding.prototype.getToolBarButtonBinding=function(_d76){
var _d77=ToolBarButtonBinding.newInstance(this.bindingDocument);
var _d78=_d76.getLabel();
var _d79=_d76.getToolTip();
var _d7a=_d76.getImage();
var _d7b=_d76.isDisabled();
if(_d7a&&_d7a.indexOf("size=")==-1){
_d7a=_d7a+"&size="+this.getImageSize();
_d77.imageProfile=new ImageProfile({image:_d7a});
}
if(_d78){
_d77.setLabel(_d78);
}
if(_d79){
_d77.setToolTip(_d79);
}
if(_d76.isDisabled()){
_d77.disable();
}
_d77.associatedSystemAction=_d76;
return _d77;
};
SystemToolBarBinding.prototype._invokeDefaultAction=function(){
var _d7c=this.getDescendantBindingByLocalName("toolbarbutton");
if(_d7c!=null){
_d7c.fireCommand();
}
};
SystemToolBarBinding.newInstance=function(_d7d){
var _d7e=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbar",_d7d);
return UserInterface.registerBinding(_d7e,SystemToolBarBinding);
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
SystemTreeBinding.prototype.add=function(_d7f){
var _d80=SystemTreeBinding.superclass.add.call(this,_d7f);
if(!this._defaultTreeNode){
if(_d7f instanceof SystemTreeNodeBinding){
this._defaultTreeNode=_d7f;
}
}
return _d80;
};
SystemTreeBinding.prototype.handleAction=function(_d81){
SystemTreeBinding.superclass.handleAction.call(this,_d81);
var _d82=_d81.target;
switch(_d81.type){
case TreeNodeBinding.ACTION_ONFOCUS:
case TreeNodeBinding.ACTION_ONMULTIFOCUS:
this._restorableFocusHandle=null;
this._handleSystemTreeFocus();
break;
case SystemTreeNodeBinding.ACTION_REFRESHED_YEAH:
this._updateRefreshingTrees(_d82.key);
_d81.consume();
break;
case TreeNodeBinding.ACTION_DISPOSE:
case TreeNodeBinding.ACTION_BLUR:
var self=this;
setTimeout(function(){
if(!self._focusedTreeNodeBindings.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,null);
}
},0);
if(_d81.type==TreeNodeBinding.ACTION_BLUR){
this._restorableFocusHandle=_d82.getHandle();
}
break;
case TreeNodeBinding.ACTION_COMMAND:
EventBroadcaster.broadcast(BroadcastMessages.INVOKE_DEFAULT_ACTION);
_d81.consume();
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
var _d84=this._treeNodeBindings.get(this._restorableFocusHandle);
this.focusSingleTreeNodeBinding(_d84);
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
SystemTreeBinding.prototype.registerTreeNodeBinding=function(_d85){
SystemTreeBinding.superclass.registerTreeNodeBinding.call(this,_d85);
var reg=this._entityTokenRegistry;
var _d87=_d85.node.getEntityToken();
if(reg.has(_d87)){
reg.get(_d87).add(_d85);
}else{
reg.set(_d87,new List([_d85]));
}
var _d88=null;
if(this.isLockedToEditor){
if(_d87==StageBinding.entityToken){
if(_d85.node.isTreeLockEnabled()){
_d88=_d85;
}
}
}else{
if(this._backupfocushandle!=null){
if(this._backupfocushandle==_d85.node.getHandle()){
_d88=_d85;
}
}
}
if(_d88!=null){
this.focusSingleTreeNodeBinding(_d88);
}
};
SystemTreeBinding.prototype.unRegisterTreeNodeBinding=function(_d89){
SystemTreeBinding.superclass.unRegisterTreeNodeBinding.call(this,_d89);
var reg=this._entityTokenRegistry;
var _d8b=_d89.node.getEntityToken();
if(reg.has(_d8b)){
var list=reg.get(_d8b);
list.del(_d89);
if(!list.hasEntries()){
reg.del(_d8b);
}
}else{
this.logger.fatal("SystemTreeBinding out of synch: unRegisterTreeNodeBinding");
if(Application.isDeveloperMode){
Dialog.error("Attention Developer","Tree is out of synch. Please reproduce this bug and file a report.");
}
}
if(_d89.isRefreshing){
this._updateRefreshingTrees(binding.key);
}
if(!this.isLockedToEditor){
if(_d89.isFocused&&this._backupfocushandle==null){
this._backupfocushandle=_d89.node.getHandle();
var self=this;
setTimeout(function(){
self._backupfocushandle=null;
},200);
}
}
};
SystemTreeBinding.prototype._updateRefreshingTrees=function(key){
var _d8f=this._refreshingTreeNodes;
if(_d8f.hasEntries()&&_d8f.has(key)){
_d8f.del(key);
if(!_d8f.hasEntries()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this._refreshToken);
this._refreshToken=null;
this._attemptRestorableFocus();
}
}
};
SystemTreeBinding.prototype._computeClipboardSetup=function(){
var _d90=false;
var _d91=this.getFocusedTreeNodeBindings();
if(_d91.hasEntries()){
_d90=true;
while(_d90&&_d91.hasNext()){
var _d92=_d91.getNext();
if(!_d92.isDraggable){
_d90=false;
}
}
}
SystemTreePopupBinding.isCutAllowed=_d90;
};
SystemTreeBinding.prototype._computeRefreshSetup=function(){
SystemTreePopupBinding.isRefreshAllowed=SystemTreeBinding.clipboard===null;
};
SystemTreeBinding.prototype.handleBroadcast=function(_d93,arg){
SystemTreeBinding.superclass.handleBroadcast.call(this,_d93,arg);
switch(_d93){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
if(arg!=null||this.isFocused){
this._handleCommandBroadcast(_d93,arg);
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
if(this.isFocused){
this._handleCommandBroadcast(_d93);
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
var _d97=tab.perspectiveNode==null;
if(!_d97){
_d97=tab.perspectiveNode==this.perspectiveNode;
}
if(_d97){
var self=this,_d99=tab.getEntityToken();
setTimeout(function(){
if(_d99==null){
self.blurSelectedTreeNodes();
}else{
self._focusTreeNodeByEntityToken(_d99);
}
},250);
}
};
SystemTreeBinding.prototype._focusTreeNodeByEntityToken=function(_d9a,_d9b){
this.isLockFeatureFocus=true;
var _d9c=null;
if(this._entityTokenRegistry.has(_d9a)){
var list=this._entityTokenRegistry.get(_d9a);
list.each(function(tn){
var _d9f=true;
if(tn.node.isTreeLockEnabled()){
_d9c=tn;
_d9f=false;
}
return _d9f;
});
if(_d9c!=null){
if(!_d9c.isFocused){
this.focusSingleTreeNodeBinding(_d9c,true);
}else{
_d9c.dispatchAction(TreeNodeBinding.ACTION_FOCUSED);
}
}
}
this.isLockFeatureFocus=false;
if(_d9c==null&&_d9b!=true){
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._fetchTreeForEntityToken(_d9a);
self._focusTreeNodeByEntityToken(_d9a,true);
}
Application.unlock(self);
StatusBar.clear();
},0);
}
};
SystemTreeBinding.prototype._fetchTreeForEntityToken=function(_da1){
var _da2=StageBinding.perspectiveNode.getEntityToken();
var _da3=this.getOpenSystemNodes();
var map=System.getInvisibleBranch(_da2,_da1,_da3);
if(map==null){
this.isLockedToEditor=false;
if(Application.isDeveloperMode){
Dialog.warning("Ouch!","Because the web service failed, tree has disabled the lock-tree-to-editor "+"feature. Otherwise, re-focus would fire the error indefinitely. Please try again.");
}
}else{
if(map.hasEntries()){
var self=this;
var _da6=this._treeNodeBindings;
var _da7=new Map();
function fix(_da8,list){
if(!_da8.hasBeenOpened){
if(list.hasEntries()){
list.each(function(node){
if(!_da6.has(node.getHandle())){
var _dab=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
_da7.set(node.getHandle(),_dab);
_da8.add(_dab);
}
});
_da8.attachRecursive();
}
}
_da8.open(true);
}
map.each(function(_dac,list){
if(_da6.has(_dac)){
var _dae=_da6.get(_dac);
fix(_dae,list);
}else{
if(_da7.has(_dac)){
var _daf=_da7.get(_dac);
fix(_daf,list);
}else{
}
}
});
}
}
};
SystemTreeBinding.prototype._handleCommandBroadcast=function(_db0,arg){
switch(_db0){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _db2=arg;
if(_db2!=null){
this._invokeServerRefresh(_db2);
}else{
this._invokeManualRefresh();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_CUT:
if(SystemTreeBinding.clipboard!=null){
SystemTreeBinding.clipboard.hideDrag();
}
var _db3=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_CUT;
SystemTreeBinding.clipboard=_db3;
_db3.showDrag();
break;
case BroadcastMessages.SYSTEMTREEBINDING_COPY:
var _db3=this.getFocusedTreeNodeBindings().getFirst();
SystemTreeBinding.clipboardOperation=SystemTreePopupBinding.CMD_COPY;
SystemTreeBinding.clipboard=_db3;
break;
case BroadcastMessages.SYSTEMTREEBINDING_PASTE:
this._handlePaste();
break;
}
};
SystemTreeBinding.prototype._invokeServerRefresh=function(_db4){
if(_db4!=null&&_db4=="null"){
if(Application.isDeveloperMode){
alert("Saa har vi balladen.");
}
}
if(this._entityTokenRegistry.has(_db4)){
var list=this._entityTokenRegistry.get(_db4).reset();
this._refreshToken=_db4;
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this._refreshToken);
while(list.hasNext()){
var _db6=list.getNext();
this._refreshingTreeNodes.set(_db6.key,true);
setTimeout(function(){
_db6.refresh(true);
},0);
}
}
};
SystemTreeBinding.prototype._invokeManualRefresh=function(){
var _db7=this.getFocusedTreeNodeBindings().getFirst();
if(_db7){
var _db8=_db7.getLabel();
var _db9=_db7.getAncestorBindingByLocalName("treenode");
if(_db9){
_db7=_db9;
}
this._refreshToken=null;
this._refreshingTreeNodes.set(_db7.key,true);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,null);
if(!StatusBar.state){
var _dba=StringBundle.getString("ui","Website.App.StatusBar.Refreshing");
StatusBar.busy(_dba,[_db8]);
}
_db7.refresh();
}
};
SystemTreeBinding.prototype._handlePaste=function(){
var _dbb=SystemTreeBinding.clipboard;
if(_dbb){
var type=_dbb.dragType;
var _dbd=this.getFocusedTreeNodeBindings().getFirst();
if(_dbd.dragAccept){
if(_dbd.acceptor.isAccepting(type)){
this._performPaste(_dbd);
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteTypeNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteTypeNotAllowed"));
}
}else{
Dialog.message(StringBundle.getString("ui","Website.Misc.Trees.DialogTitle.PasteNotAllowed"),StringBundle.getString("ui","Website.Misc.Trees.DialogText.PasteNotAllowed"));
}
}
};
SystemTreeBinding.prototype._performPaste=function(_dbe){
var self=this;
function update(){
MessageQueue.update();
Application.unlock(self);
}
if(_dbe.node.hasDetailedDropSupport()){
if(_dbe.node.hasChildren()){
var _dc0=_dbe.node.getChildren();
Dialog.invokeModal(SystemTreeBinding.URL_DIALOG_DETAILEDPASTE,{handleDialogResponse:function(_dc1,_dc2){
if(_dc1==Dialog.RESPONSE_ACCEPT){
Application.lock(self);
var _dc3=_dc2.get("switch");
var _dc4=_dc2.get("sibling");
if(_dc3=="after"){
_dc4++;
}
var _dc5=_dbe.accept(SystemTreeBinding.clipboard,_dc4);
if(_dc5){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}},_dc0);
}else{
Application.lock(self);
var _dc6=_dbe.accept(SystemTreeBinding.clipboard,0);
if(_dc6){
SystemTreeBinding.clipboard=null;
SystemTreeBinding.clipboardOperation=null;
setTimeout(update,0);
}else{
update();
}
}
}else{
Application.lock(self);
var _dc6=_dbe.accept(SystemTreeBinding.clipboard,0);
if(_dc6){
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
SystemTreeBinding.prototype.collapse=function(_dc7){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEM_ACTIONPROFILE_PUBLISHED,null);
if(_dc7){
this.blurSelectedTreeNodes();
var _dc8=this.getRootTreeNodeBindings();
_dc8.each(function(_dc9){
if(_dc9.isContainer&&_dc9.isOpen){
_dc9.close();
_dc9.hasBeenOpened=false;
_dc9.empty();
}
});
}else{
SystemTreeBinding.superclass.collapse.call(this);
}
};
SystemTreeBinding.prototype.setLockToEditor=function(_dca){
if(_dca!=this.isLockedToEditor){
this.isLockedToEditor=_dca;
if(_dca){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_LOCKTOEDITOR);
}
}
};
SystemTreeBinding.prototype.getOpenSystemNodes=function(){
var list=new List([StageBinding.perspectiveNode]);
var _dcc=this.getRootTreeNodeBindings();
_dcc.each(function(_dcd){
var _dce=_dcd.getOpenSystemNodes();
if(_dce!=null&&_dce.hasEntries()){
list.merge(_dce);
}
});
return list;
};
SystemTreeBinding.prototype.focusSingleTreeNodeBinding=function(_dcf){
SystemTreeBinding.superclass.focusSingleTreeNodeBinding.call(this,_dcf);
if(_dcf!=null){
this._handleSystemTreeFocus();
}
};
SystemTreeBinding.prototype.getCompiledActionProfile=function(){
var temp={};
var _dd1=new Map();
var _dd2=this.getFocusedTreeNodeBindings();
_dd1=_dd2.getFirst().node.getActionProfile();
return _dd1;
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
SystemTreePopupBinding.prototype.handleBroadcast=function(_dd3,arg){
SystemTreePopupBinding.superclass.handleBroadcast.call(this,_dd3,arg);
switch(_dd3){
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
var _dd8=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_PASTE);
cut.setDisabled(!SystemTreePopupBinding.isCutAllowed);
copy.setDisabled(!SystemTreePopupBinding.isCutAllowed);
_dd8.setDisabled(SystemTreeBinding.clipboard==null);
};
SystemTreePopupBinding.prototype._setupRefreshItem=function(){
var _dd9=this.getMenuItemForCommand(SystemTreePopupBinding.CMD_REFRESH);
_dd9.setDisabled(!SystemTreePopupBinding.isRefreshAllowed);
};
SystemTreePopupBinding.prototype.handleAction=function(_dda){
SystemTreePopupBinding.superclass.handleAction.call(this,_dda);
switch(_dda.type){
case MenuItemBinding.ACTION_COMMAND:
var _ddb=_dda.target;
var _ddc=_ddb.associatedSystemAction;
if(_ddc){
var list=ExplorerBinding.getFocusedTreeNodeBindings();
if(list.hasEntries()){
var _dde=list.getFirst();
var _ddf=_dde.node;
}
SystemAction.invoke(_ddc,_ddf);
}else{
var cmd=_ddb.getProperty("cmd");
if(cmd){
this._handleCommand(cmd);
}
}
break;
}
};
SystemTreePopupBinding.prototype._handleCommand=function(cmd){
var _de2=null;
switch(cmd){
case SystemTreePopupBinding.CMD_CUT:
_de2=BroadcastMessages.SYSTEMTREEBINDING_CUT;
break;
case SystemTreePopupBinding.CMD_COPY:
_de2=BroadcastMessages.SYSTEMTREEBINDING_COPY;
break;
case SystemTreePopupBinding.CMD_PASTE:
_de2=BroadcastMessages.SYSTEMTREEBINDING_PASTE;
break;
case SystemTreePopupBinding.CMD_REFRESH:
_de2=BroadcastMessages.SYSTEMTREEBINDING_REFRESH;
break;
}
if(_de2){
setTimeout(function(){
EventBroadcaster.broadcast(_de2);
},0);
}
};
SystemTreePopupBinding.prototype.disposeContent=function(){
var _de3=new List(DOMUtil.getElementsByTagName(this.bindingElement,"menugroup"));
while(_de3.hasNext()){
var _de4=UserInterface.getBinding(_de3.getNext());
if(!_de4.getProperty("rel")){
_de4.dispose();
}
}
};
SystemTreePopupBinding.prototype.constructContent=function(){
if(this._actionProfile!=null){
var doc=this.bindingDocument;
var _de6=new List();
var self=this;
this._actionProfile.each(function(_de8,list){
var _dea=MenuGroupBinding.newInstance(doc);
list.each(function(_deb){
var _dec=self.getMenuItemBinding(_deb);
_dea.add(_dec);
});
_de6.add(_dea);
});
_de6.reverse();
while(_de6.hasNext()){
this._bodyBinding.addFirst(_de6.getNext());
}
this._bodyBinding.attachRecursive();
}
};
SystemTreePopupBinding.prototype.getMenuItemBinding=function(_ded){
var _dee=MenuItemBinding.newInstance(this.bindingDocument);
var _def=_ded.getLabel();
var _df0=_ded.getToolTip();
var _df1=_ded.getImage();
var _df2=_ded.getDisabledImage();
var _df3=_ded.isCheckBox();
if(_def){
_dee.setLabel(_def);
}
if(_df0){
_dee.setToolTip(_df0);
}
if(_df1){
_dee.imageProfile=new ImageProfile({image:_df1,imageDisabled:_df2});
}
if(_df3){
_dee.setType(MenuItemBinding.TYPE_CHECKBOX);
if(_ded.isChecked()){
_dee.check(true);
}
}
if(_ded.isDisabled()){
_dee.disable();
}
_dee.associatedSystemAction=_ded;
return _dee;
};
SystemTreePopupBinding.prototype.snapToMouse=function(e){
var node=e.target?e.target:e.srcElement;
var name=DOMUtil.getLocalName(node);
var _df7=null;
if(name!="tree"){
switch(name){
case "treenode":
break;
default:
node=DOMUtil.getAncestorByLocalName("treenode",node);
if(node!=null){
_df7=UserInterface.getBinding(node);
if(_df7.isDisabled){
_df7=null;
}
}
break;
}
if(_df7!=null&&_df7.node!=null&&_df7.node.getActionProfile()!=null){
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
var _df8=this.node.getLabel();
if(_df8){
this.setLabel(_df8);
}
var _df9=this.node.getToolTip();
if(_df9){
this.setToolTip(_df9);
}
var _dfa=this.node.getHandle();
if(_dfa){
this.setHandle(_dfa);
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
var _dfd="";
var list=this.node.getDragAccept();
while(list.hasNext()){
_dfd+=list.getNext();
if(list.hasNext()){
_dfd+=" ";
}
}
this.setProperty("dragaccept",_dfd);
}
SystemTreeNodeBinding.superclass._initializeBindingDragAndDropFeatures.call(this);
};
SystemTreeNodeBinding.prototype.handleAction=function(_dff){
SystemTreeNodeBinding.superclass.handleAction.call(this,_dff);
switch(_dff.type){
case SystemTreeNodeBinding.ACTION_REFRESHED:
if(_dff.target==this){
if(!this.isOpen){
this.hasBeenOpened=false;
_dff.consume();
}
}
break;
}
};
SystemTreeNodeBinding.prototype.handleBroadcast=function(_e00,arg){
SystemTreeNodeBinding.superclass.handleBroadcast.call(this,_e00,arg);
switch(_e00){
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
var _e03=null;
var _e04=this.node.getImageProfile();
if(_e04){
if(this.isOpen){
_e03=_e04.getActiveImage();
}else{
_e03=_e04.getDefaultImage();
}
}
if(!_e03){
_e03=SystemTreeNodeBinding.superclass.computeImage.call(this);
}
return _e03;
};
SystemTreeNodeBinding.prototype.open=function(_e05){
var _e06=this.isContainer&&!this.isOpen;
var _e07=!this.hasBeenOpened;
SystemTreeNodeBinding.superclass.open.call(this);
if(_e06&&(_e07||SystemTreeBinding.HAS_NO_MEMORY)&&_e05!=true){
this.refresh();
if(this._isForcedOpen){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN,this);
this._isForcedOpen=false;
}
}
};
SystemTreeNodeBinding.prototype.refresh=function(){
var _e08=null;
if(this.isContainer){
_e08=this.getOpenSystemNodes();
}
this.isRefreshing=true;
Application.lock(this);
StatusBar.busy();
var self=this;
setTimeout(function(){
if(Binding.exists(self)){
self._performRefresh(_e08);
Application.unlock(self);
StatusBar.clear();
}
},0);
};
SystemTreeNodeBinding.prototype._performRefresh=function(_e0a){
if(_e0a!=null){
this._refreshBranch(_e0a);
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
var _e0b=new List();
var _e0c=this.node.getChildren();
this.empty();
if(_e0c.hasEntries()){
this._insertTreeNodesRegulated(_e0c);
}
};
SystemTreeNodeBinding.prototype._insertTreeNodesRegulated=function(_e0d){
var _e0e=0;
while(_e0d.hasEntries()&&_e0e<=SystemTreeNodeBinding.MAX_CHILD_IMPORT){
var _e0f=SystemTreeNodeBinding.newInstance(_e0d.extractFirst(),this.bindingDocument);
this.add(_e0f);
_e0f.attach();
_e0e++;
}
if(_e0d.hasEntries()){
this._insertBufferTreeNode(_e0d);
}
};
SystemTreeNodeBinding.prototype._insertBufferTreeNode=function(_e10){
alert("Max treenode count reached. This is not handled!");
alert("TODO: SystemTreeNodeBinding#._insertBufferTreeNode");
};
SystemTreeNodeBinding.prototype._refreshBranch=function(list){
var _e12=this.node.getDescendantBranch(list);
if(_e12.hasEntries()){
this.XXX(_e12);
}
};
SystemTreeNodeBinding.prototype.XXX=function(_e13){
var self=this;
var map=new Map();
this.empty();
_e13.each(function(key,_e17){
if(_e17.hasEntries()){
_e17.each(function(node){
var _e19=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e19);
if(map.has(key)){
var _e1a=map.get(key);
_e1a.add(_e19);
_e1a.isOpen=true;
_e1a.hasBeenOpened=true;
}else{
if(key==self.node.getHandle()){
self.add(_e19);
}else{
}
}
});
}
});
this.attachRecursive();
_e13.dispose();
map.dispose();
};
SystemTreeNodeBinding.prototype.getOpenDescendants=function(){
var _e1b=new TreeCrawler();
var _e1c=new List();
_e1b.mode=TreeCrawler.MODE_GETOPEN;
_e1b.crawl(this.bindingElement,_e1c);
if(_e1c.hasEntries()){
_e1c.extractFirst();
}
_e1b.dispose();
return _e1c;
};
SystemTreeNodeBinding.prototype.getOpenSystemNodes=function(){
var _e1d=null;
var list=this.getOpenDescendants();
if(list.hasEntries()){
_e1d=new List([this.node]);
list.each(function(_e1f){
_e1d.add(_e1f.node);
});
}
return _e1d;
};
SystemTreeNodeBinding.prototype.updateClassNames=function(){
if(!this.isRefreshing){
SystemTreeNodeBinding.superclass.updateClassNames.call(this);
}
};
SystemTreeNodeBinding.prototype.acceptTreeNodeBinding=function(_e20,_e21){
var _e22=(SystemTreeBinding.clipboardOperation==SystemTreePopupBinding.CMD_COPY);
if(_e20 instanceof SystemTreeNodeBinding){
if(TreeService.ExecuteDropElementAction){
TreeService.ExecuteDropElementAction(_e20.node.getData(),this.node.getData(),_e21?_e21:this.containingTreeBinding.getDropIndex(),Application.CONSOLE_ID,_e22);
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
SystemTreeNodeBinding.newInstance=function(node,_e26){
var _e27=DOMUtil.createElementNS(Constants.NS_UI,"ui:treenode",_e26);
var _e28=UserInterface.registerBinding(_e27,SystemTreeNodeBinding);
_e28.node=node;
return _e28;
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
SystemPageBinding.prototype.setPageArgument=function(_e29){
this.node=_e29;
SystemPageBinding.superclass.setPageArgument.call(this,_e29);
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
var _e2a=this.node.getChildren();
if(_e2a.hasEntries()){
while(_e2a.hasNext()){
var node=SystemTreeNodeBinding.newInstance(_e2a.getNext(),this.bindingDocument);
this._tree.add(node);
node.attach();
}
}
};
SystemPageBinding.prototype._refreshTree=function(){
var _e2c=this._tree._treeBodyBinding.getChildBindingsByLocalName("treenode");
_e2c.each(function(root){
if(!root.isContainer){
root.isOpen=true;
}
});
var _e2e=new TreeCrawler();
var _e2f=new List();
_e2e.mode=TreeCrawler.MODE_GETOPEN;
_e2e.crawl(this.bindingElement,_e2f);
_e2e.dispose();
var list=new List([this.node]);
_e2f.each(function(_e31){
list.add(_e31.node);
});
this._tree.empty();
var _e32=this.node.getDescendantBranch(list);
if(_e32.hasEntries()){
var self=this;
var map=new Map();
_e32.each(function(key,_e36){
_e36.each(function(node){
var _e38=SystemTreeNodeBinding.newInstance(node,self.bindingDocument);
map.set(node.getHandle(),_e38);
if(map.has(key)){
var _e39=map.get(key);
_e39.add(_e38);
_e39.isOpen=true;
}else{
if(key==self.node.getHandle()){
self._tree.add(_e38);
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
SystemPageBinding.prototype.handleAction=function(_e3a){
SystemPageBinding.superclass.handleAction.call(this,_e3a);
switch(_e3a.type){
case ButtonBinding.ACTION_COMMAND:
var _e3b=_e3a.target;
switch(_e3b.getID()){
case "locktreebutton":
this._tree.setLockToEditor(_e3b.isChecked);
break;
case "collapsebutton":
this._tree.collapse();
break;
}
break;
}
};
SystemPageBinding.prototype.handleBroadcast=function(_e3c,arg){
SystemPageBinding.superclass.handleBroadcast.call(this,_e3c,arg);
switch(_e3c){
case BroadcastMessages.SYSTEMTREEBINDING_REFRESH:
var _e3e=arg;
if(this.node&&this.node.getEntityToken()==_e3e){
try{
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,_e3e);
var self=this;
Application.lock(this);
setTimeout(function(){
self._refreshTree();
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,_e3e);
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
StageContainerBinding.prototype.handleBroadcast=function(_e40,arg){
StageContainerBinding.superclass.handleBroadcast.call(this,_e40,arg);
var _e42=this.bindingWindow.WindowManager;
switch(_e40){
case BroadcastMessages.APPLICATION_OPERATIONAL:
this.subscribe(_e42.WINDOW_RESIZED_BROADCAST);
this._fit();
this.reflex();
break;
case _e42.WINDOW_RESIZED_BROADCAST:
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
var _e44=this.bindingWindow.WindowManager;
this.bindingElement.style.width=_e44.getWindowDimensions().w+"px";
};
StageBinding.prototype=new FocusBinding;
StageBinding.prototype.constructor=StageBinding;
StageBinding.superclass=FocusBinding.prototype;
StageBinding.bindingInstance=null;
StageBinding.perspectiveNode=null;
StageBinding.entityToken=null;
StageBinding.handleViewPresentation=function(_e45){
if(StageBinding.isViewOpen(_e45)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_e45);
}else{
var _e46=ViewDefinitions[_e45];
StageBinding.presentViewDefinition(_e46);
}
};
StageBinding.isViewOpen=function(_e47){
return StageBinding.bindingInstance._activeViewDefinitions[_e47]!=null;
};
StageBinding.presentViewDefinition=function(_e48){
if(_e48.label!=null){
var _e49=StringBundle.getString("ui","Website.App.StatusBar.Opening");
StatusBar.busy(_e49,[_e48.label]);
}else{
StatusBar.busy();
}
StageBinding.bindingInstance._presentViewDefinition(_e48);
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
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,{handleBroadcast:function(_e4b,arg){
if(arg==root.getEntityToken()){
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
}
}});
var _e4d=System.getPerspectiveNodes();
if(_e4d.hasEntries()){
this._initializeSystemViewDefinitions(_e4d);
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
var _e4f=null;
if(LocalStore.isEnabled){
_e4f=LocalStore.getProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE);
}
if(_e4f&&ViewDefinitions[_e4f]){
alert("StageBinding#_initializeWorkbenchLayout !!!!");
this._explorerBinding.setSelectionByHandle(unescape(_e4f));
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
var _e51=root.getActionProfile();
if(_e51&&_e51.hasEntries()){
var _e52=top.app.bindingMap.toolsmenugroup;
if(_e52){
_e51.each(function(_e53,list){
list.each(function(_e55){
var item=MenuItemBinding.newInstance(_e52.bindingDocument);
item.setLabel(_e55.getLabel());
item.setToolTip(_e55.getToolTip());
item.setImage(_e55.getImage());
item.setDisabled(_e55.isDisabled());
item.associatedSystemAction=_e55;
var _e57=_e52;
var tag=_e55.getTag();
if(tag!=null){
switch(tag){
case SystemAction.TAG_CHANGEFROMLANGUAGE:
_e57=top.app.bindingMap.translationsmenugroup;
break;
}
}
_e57.add(item);
});
});
_e52.attachRecursive();
}
}
};
StageBinding.prototype._initializeSystemViewDefinitions=function(_e59){
while(_e59.hasNext()){
var node=_e59.getNext();
var _e5b=node.getHandle();
ViewDefinitions[_e5b]=new SystemViewDefinition(node);
}
};
StageBinding.prototype.handleAction=function(_e5c){
StageBinding.superclass.handleAction.call(this,_e5c);
var _e5d=_e5c.target;
switch(_e5c.type){
case StageDecksBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._decksBinding=_e5d;
this._inflateBinding(_e5d);
_e5c.consume();
break;
case ExplorerBinding.ACTION_INITIALIZED:
if(!Application.isOperational){
ProgressBarBinding.notch(4);
}
this._explorerBinding=_e5d;
this._inflateBinding(_e5d);
_e5c.consume();
break;
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
if(!Application.isOperational){
ProgressBarBinding.notch(5);
}
this.handlePerspectiveChange(_e5d);
_e5c.consume();
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_e5d instanceof DockBinding){
switch(_e5d.reference){
case DockBinding.START:
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
this._dockBindings.set(_e5d.reference,_e5d);
break;
}
this.handleAttachedDock(_e5d);
_e5c.consume();
}
break;
case TabBoxBinding.ACTION_SELECTED:
if(_e5d instanceof DockBinding){
this.handleSelectedDockTab(_e5d.getSelectedTabBinding());
_e5c.consume();
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
_e5c.consume();
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
_e5c.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_e5c);
};
StageBinding.prototype.handleBroadcast=function(_e5f,arg){
StageBinding.superclass.handleBroadcast.call(this,_e5f,arg);
switch(_e5f){
case BroadcastMessages.VIEW_OPENED:
Application.unlock(this);
break;
case BroadcastMessages.VIEW_CLOSED:
var _e61=arg;
this._dontView(_e61);
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
StageBinding.prototype._showStart=function(_e63){
if(_e63!=this._isShowingStart){
var view=ViewBinding.getInstance("Composite.Management.Start");
var dock=this._dockBindings.get(DockBinding.START);
var _e66=this.bindingWindow.bindingMap.maindecks;
if(_e63){
_e66.select("startdeck");
view.show();
}else{
view.hide();
_e66.select("stagedeck");
if(dock!=null&&dock.isActive){
dock.deActivate();
}
}
this._isShowingStart=_e63;
}
};
StageBinding.prototype._inflateBinding=function(_e67){
for(var _e68 in ViewDefinitions){
var _e69=ViewDefinitions[_e68];
if(_e69 instanceof SystemViewDefinition){
_e67.mountDefinition(_e69);
}
}
var _e6a=(this._decksBinding!=null&&this._explorerBinding!=null);
if(_e6a){
var self=this;
setTimeout(function(){
self._renameThisMethod();
},0);
}
};
StageBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _e6d=new StageCrawler();
_e6d.mode=mode;
_e6d.crawl(this.bindingElement);
_e6d.dispose();
};
StageBinding.prototype.handlePerspectiveChange=function(_e6e){
var _e6f=_e6e.getSelectionHandle();
this._decksBinding.setSelectionByHandle(_e6f);
if(LocalStore.isEnabled){
LocalStore.setProperty(LocalStore.SELECTED_PERSPECTIVE_HANDLE,escape(_e6f));
}
};
StageBinding.prototype.handleAttachedDock=function(_e70){
var _e71=_e70.getTabBindings();
if(_e71.hasEntries()){
while(_e71.hasNext()){
var _e72=_e71.getNext();
var _e73=_e72.getHandle();
if(_e73){
if(_e73=="Composite.Management.Start"&&(!Application.hasStartPage||!Application.hasExternalConnection)){
}else{
var _e74=ViewDefinitions[_e73];
if(_e74){
this._view(_e70,_e72,_e74,false);
}else{
alert("StageBinding: no such predefined viewdefinition ("+_e73+")");
}
}
}
}
}
};
StageBinding.prototype._presentViewDefinition=function(_e75){
var _e76=null;
var _e77=false;
switch(_e75.position){
case Dialog.MODAL:
_e76=app.bindingMap.masterdialogset.getModalInstance();
break;
case Dialog.NON_MODAL:
_e76=app.bindingMap.masterdialogset.getInstance();
break;
default:
if(this._dockBindings.hasEntries()){
switch(_e75.position){
case DockBinding.ABSBOTTOMLEFT:
case DockBinding.ABSBOTTOMRIGHT:
case DockBinding.ABSRIGHTTOP:
case DockBinding.ABSRIGHTBOTTOM:
_e76=this._dockBindings.get(_e75.position);
break;
default:
var _e78=this._decksBinding.getSelectedDeckBinding();
_e76=_e78.getDockBindingByReference(_e75.position);
if(this._isShowingStart){
EventBroadcaster.broadcast(BroadcastMessages.STOP_COMPOSITE);
}else{
if(this._isShowingDefaultStart){
var _e79=this.bindingWindow.bindingMap.maindecks;
_e79.select("stagedeck");
this._isShowingDefaultStart=false;
}
}
break;
}
}else{
_e77=true;
}
break;
}
if(!_e77){
if(_e76!=null){
this._view(_e76,null,_e75,true);
}else{
throw "StageBinding: Could not position view: "+_e75.handle;
}
}
};
StageBinding.prototype._view=function(_e7a,_e7b,_e7c,_e7d){
var _e7e=_e7c.handle;
if(_e7c.isMutable){
_e7e+=KeyMaster.getUniqueKey();
}
if(this._activeViewDefinitions[_e7e]){
var _e7f=ViewBinding.getInstance(_e7e);
if(_e7f!=null){
_e7f.update();
}else{
this.logger.error("Could not update ViewBinding (declared open): \n"+_e7e);
}
}else{
this._activeViewDefinitions[_e7e]=_e7c;
Application.lock(this);
switch(_e7a.constructor){
case DockBinding:
if(_e7d){
_e7a.prepareNewView(_e7c);
}else{
_e7a.prepareOpenView(_e7c,_e7b);
}
break;
case StageDialogBinding:
if(_e7d){
_e7a.prepareNewView(_e7c);
}
break;
}
}
};
StageBinding.prototype._dontView=function(_e80){
if(this._activeViewDefinitions[_e80]!=null){
delete this._activeViewDefinitions[_e80];
}else{
this.logger.debug("Could not unregister active view: "+_e80);
}
};
StageBinding.prototype.handleSelectedDockTab=function(_e81){
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
this.addFilter(function(_e83){
var _e84=UserInterface.getBinding(_e83);
var _e85=null;
if(_e84){
switch(_e84.constructor){
case StageSplitBoxBinding:
case StageSplitPanelBinding:
case StageSplitterBinding:
switch(self.mode){
case StageCrawler.MODE_MAXIMIZE:
_e84.handleMaximization();
break;
case StageCrawler.MODE_UNMAXIMIZE:
_e84.handleUnMaximization();
break;
}
break;
case DockBinding:
_e85=NodeCrawler.SKIP_NODE;
break;
}
}
return _e85;
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
var _e86=null;
this._dialogs.each(function(_e87){
if(!_e87.isVisible){
_e86=_e87;
}
return _e86!=null;
});
if(!_e86){
this._newInstance();
_e86=this._dialogs.getLast();
}
_e86.setModal(false);
return _e86;
};
StageDialogSetBinding.prototype.getModalInstance=function(){
var _e88=this.getInstance();
_e88.setModal(true);
return _e88;
};
StageDialogSetBinding.prototype._newInstance=function(){
var _e89=this.add(StageDialogBinding.newInstance(this.bindingDocument));
this._dialogs.add(_e89);
_e89.attach();
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
StageDialogBinding.prototype.prepareNewView=function(_e8a){
if(_e8a instanceof DialogViewDefinition){
var _e8b=ViewBinding.newInstance(this.bindingDocument);
_e8b.setDefinition(_e8a);
_e8b.setType(ViewBinding.TYPE_DIALOGVIEW);
if(_e8a.handler){
if(Interfaces.isImplemented(IDialogResponseHandler,_e8a.handler)){
this._dialogResponseHandler=_e8a.handler;
}else{
throw "IDialogResponseHandler not implemented";
}
}
this._viewBinding=_e8b;
this._body.add(_e8b);
_e8b.attach();
_e8b.initialize();
}
};
StageDialogBinding.prototype.handleAction=function(_e8c){
StageDialogBinding.superclass.handleAction.call(this,_e8c);
var _e8d=_e8c.target;
switch(_e8c.type){
case PageBinding.ACTION_INITIALIZED:
this._handleInitializedPageBinding(_e8d);
_e8c.consume();
break;
case PageBinding.ACTION_DETACHED:
if(_e8d.bindingDocument==this._viewBinding.getContentDocument()){
this._pageBinding=null;
}
_e8c.consume();
break;
case DialogPageBinding.ACTION_RESPONSE:
if(_e8d.response){
this._handleDialogPageResponse(_e8d);
}
_e8c.consume();
break;
case Binding.ACTION_INVALID:
this._disableDialogAcceptButton(true);
_e8c.consume();
break;
case Binding.ACTION_VALID:
this._disableDialogAcceptButton(false);
_e8c.consume();
break;
case ViewBinding.ACTION_ONCLOSE:
this.close();
_e8d.dispose();
_e8c.consume();
break;
case ViewBinding.ACTION_CLOSED:
this._isFirstPage=true;
_e8c.consume();
break;
case ErrorBinding.ACTION_INITIALIZE:
_e8c.consume();
break;
case PageBinding.ACTION_UPDATING:
this._isUpdating=true;
_e8c.consume();
break;
case PageBinding.ACTION_UPDATED:
if(this._isUpdating){
this._isUpdating=false;
this._fit();
}
_e8c.consume();
break;
case Binding.ACTION_UPDATED:
if(!this._isUpdating){
this._fit();
}
_e8c.consume();
break;
case DialogBinding.ACTION_CLOSE:
if(_e8d==this){
this._viewBinding.dispose();
this.defaultSetup();
}
break;
}
};
StageDialogBinding.prototype.handleBroadcast=function(_e8e,arg){
StageDialogBinding.superclass.handleBroadcast.call(this,_e8e,arg);
switch(_e8e){
case BroadcastMessages.KEY_ESCAPE:
if(this.isVisible==true){
if(!PopupBinding.hasActiveInstances()){
this._defaultClose();
}
}
break;
}
};
StageDialogBinding.prototype._fit=function(_e90){
var _e91=new FitnessCrawler();
var list=new List();
if(_e90){
_e91.mode=FitnessCrawler.MODE_BRUTAL;
}
_e91.crawl(this.bindingElement,list);
_e91.dispose();
if(list.hasEntries()){
list.reverse();
list.each(function(_e93){
_e93.fit(_e90);
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
var _e94=this.getDimension().h;
this.reflex(true);
var self=this;
if(this.getDimension().h==_e94){
var self=this;
setTimeout(function(){
self.reflex(true);
},0);
}
}
};
StageDialogBinding.prototype._handleContextMenuItemBinding=function(_e96){
var cmd=_e96.getProperty("cmd");
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
StageDialogBinding.prototype._handleInitializedPageBinding=function(_e98){
if(_e98.bindingDocument==this._viewBinding.getContentDocument()){
if(_e98 instanceof DialogPageBinding){
if(this._pageBinding==null){
this._parsePageBinding(_e98);
}
this._pageBinding=_e98;
if(_e98.height=="auto"){
_e98.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_e98);
_e98.enableAutoHeightLayoutMode(false);
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
if(_e98.isDialogSubPage){
this._pageBinding.enableAutoHeightLayoutMode(true);
this._fixAutoHeight(_e98);
this._pageBinding.enableAutoHeightLayoutMode(false);
this._fit(true);
this.reflex(true);
}
}
this._isFirstPage=false;
};
StageDialogBinding.prototype._disableDialogAcceptButton=function(_e99){
var _e9a=this._viewBinding.getContentDocument().getElementById("dialogacceptbutton");
if(_e9a){
var _e9b=UserInterface.getBinding(_e9a);
_e9b.setDisabled(_e99);
}
};
StageDialogBinding.prototype._handleDialogPageResponse=function(_e9c){
if(this._dialogResponseHandler!=null){
this._dialogResponseHandler.handleDialogResponse(_e9c.response,_e9c.result!=null?_e9c.result:null);
}
this.close();
};
StageDialogBinding.prototype.handleInvokedControl=function(_e9d){
if(_e9d.controlType==ControlBinding.TYPE_CLOSE){
this._defaultClose();
}
StageDialogBinding.superclass.handleInvokedControl.call(this,_e9d);
};
StageDialogBinding.prototype.buildDescendantBindings=function(){
StageDialogBinding.superclass.buildDescendantBindings.call(this);
this._titlebar.setContextMenu(app.bindingMap.dialogtitlebarpopup);
var self=this;
this._titlebar.handleAction=function(_e9f){
switch(_e9f.type){
case MenuItemBinding.ACTION_COMMAND:
if(_e9f.listener==this.contextMenuBinding){
self._handleContextMenuItemBinding(_e9f.target);
}
break;
}
};
};
StageDialogBinding.prototype._parsePageBinding=function(_ea0){
var _ea1=_ea0.label;
var _ea2=_ea0.image;
var _ea3=_ea0.width;
var _ea4=_ea0.height;
var _ea5=_ea0.controls;
var _ea6=_ea0.isResizable;
if(_ea1){
this.setLabel(_ea1);
}
if(_ea2){
this.setImage(_ea2);
}
if(_ea3||_ea4){
var old=this.getDimension();
var nev=new Dimension();
if(this._isFirstPage){
nev.w=_ea3?_ea3:old.w;
}else{
nev.w=old.w;
}
nev.h=(_ea4!=null&&_ea4!="auto")?_ea4:old.h;
this.setDimension(nev);
}
if(_ea5){
this.controlBindings[ControlBinding.TYPE_MAXIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_MINIMIZE].hide();
this.controlBindings[ControlBinding.TYPE_CLOSE].hide();
var type,_eaa=new List(_ea5.split(" "));
while((type=_eaa.getNext())!=null){
this.controlBindings[type].show();
}
}
if(_ea6!=this._isResizable){
this.setResizable(_ea6);
}
if(_ea4=="auto"){
this._fixAutoHeight(_ea0);
}
if(_ea0==this._pageBinding){
this.centerOnScreen();
}
if(!this.isOpen){
this.reflex(true);
this.open(true);
}
};
StageDialogBinding.prototype._fixAutoHeight=function(_eab){
var dim=this.getDimension();
var _ead=0;
var _eae=0;
if(_eab.isDialogSubPage){
_eab=this._pageBinding;
}
if(this._isFirstPage){
_ead=_eab.width!=null?_eab.width:dim.w;
}else{
_ead=dim.w;
}
_eae=_eab.bindingElement.offsetHeight;
_eae+=this._titlebar.bindingElement.offsetHeight;
_eae+=4;
if(_eae<dim.h){
_eae=dim.h;
}
if(_eab.minheight!=null){
if(_eae<_eab.minheight){
_eae=_eab.minheight;
}
}
this.setDimension(new Dimension(_ead,_eae));
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
StageDialogBinding.newInstance=function(_eb1){
var _eb2=DOMUtil.createElementNS(Constants.NS_UI,"ui:dialog",_eb1);
var _eb3=UserInterface.registerBinding(_eb2,StageDialogBinding);
_eb3.setProperty("controls","minimize maximize close");
return _eb3;
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
this.addFilter(function(_eb4,list){
var _eb6=null;
var _eb7=UserInterface.getBinding(_eb4);
if(!_eb7.isVisible){
_eb6=NodeCrawler.SKIP_NODE+NodeCrawler.SKIP_CHILDREN;
}
return _eb6;
});
this.addFilter(function(_eb8,list){
var _eba=null;
var _ebb=UserInterface.getBinding(_eb8);
if(_ebb.isAttached){
if(Interfaces.isImplemented(IFit,_ebb)){
if(!_ebb.isFit||this.mode==FitnessCrawler.MODE_BRUTAL){
list.add(_ebb);
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
StageDecksBinding.prototype.mountDefinition=function(_ebc){
var _ebd=StageDeckBinding.newInstance(this.bindingDocument);
_ebd.handle=_ebc.handle;
_ebd.perspectiveNode=_ebc.node;
this._decks[_ebd.handle]=_ebd;
this.add(_ebd);
_ebd.attach();
};
StageDecksBinding.prototype.setSelectionByHandle=function(_ebe){
var _ebf=this._decks[_ebe];
StageBinding.perspectiveNode=_ebf.perspectiveNode;
this.select(_ebf);
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
StageDeckBinding.prototype.handleAction=function(_ec0){
StageDeckBinding.superclass.handleAction.call(this,_ec0);
var _ec1=_ec0.target;
switch(_ec0.type){
case WindowBinding.ACTION_LOADED:
if(_ec1==this.windowBinding){
top.app.bindingMap.stagedeckscover.hide();
this.removeActionListener(WindowBinding.ACTION_LOADED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
this.addActionListener(StageSplitBoxBinding.ACTION_DOCK_OPENED);
this.dispatchAction(StageDeckBinding.ACTION_LOADED);
_ec0.consume();
}
break;
case TabBoxBinding.ACTION_ATTACHED:
if(_ec1 instanceof DockBinding){
this._dockBindings.set(_ec1.reference,_ec1);
_ec1.perspectiveNode=this.perspectiveNode;
}
break;
case StageSplitBoxBinding.ACTION_DOCK_OPENED:
this._dockBindingCount++;
if(this._dockBindingCount==2){
this._dockBindings.get("main").showControls(true);
}
_ec0.consume();
break;
case StageSplitBoxBinding.ACTION_DOCK_EMPTIED:
this._dockBindingCount--;
if(this._dockBindingCount==1){
this._dockBindings.get("main").showControls(false);
}
_ec0.consume();
break;
}
StageBoxHandlerAbstraction.handleAction.call(this,_ec0);
StageDeckBinding.superclass.handleAction.call(this,_ec0);
};
StageDeckBinding.prototype.iterateContainedStageBoxBindings=function(mode){
var _ec3=new StageCrawler();
_ec3.mode=mode;
_ec3.crawl(this.windowBinding.getContentDocument().body);
_ec3.dispose();
};
StageDeckBinding.prototype.select=function(){
if(!this._isStageDeckBindingInitialized){
this.initialize();
}
StageDeckBinding.superclass.select.call(this);
};
StageDeckBinding.prototype.getDockBindingByReference=function(_ec4){
return this._dockBindings.get(_ec4);
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
StageDeckBinding.newInstance=function(_ec6){
var _ec7=DOMUtil.createElementNS(Constants.NS_UI,"ui:stagedeck",_ec6);
var _ec8=UserInterface.registerBinding(_ec7,StageDeckBinding);
return _ec8;
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
StageSplitBoxBinding.prototype.handleAction=function(_ec9){
StageSplitBoxBinding.superclass.handleAction.call(this,_ec9);
StageBoxAbstraction.handleAction.call(this,_ec9);
var _eca=_ec9.target;
var _ecb=null;
var _ecc=null;
switch(_ec9.type){
case DockBinding.ACTION_EMPTIED:
_ecc=this.getChildBindingByLocalName("splitter");
if(_ecc.isVisible){
_ecc.hide();
}
_ecb=this.getDescendantBindingsByLocalName("dock");
if(_ecb.getFirst().isEmpty&&_ecb.getLast().isEmpty){
if(_ecb.getFirst().type!=DockBinding.TYPE_EDITORS){
this.dispatchAction(StageSplitBoxBinding.ACTION_HIDE);
this.hide();
}
}else{
this.flex();
this.invokeLayout();
}
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_EMPTIED);
_ec9.consume();
break;
case DockBinding.ACTION_OPENED:
_ecb=this.getDescendantBindingsByLocalName("dock");
if(!_ecb.getFirst().isEmpty&&!_ecb.getLast().isEmpty){
_ecc=this.getChildBindingByLocalName("splitter");
if(!_ecc.isVisible){
_ecc.show();
}
}
if(!this.isVisible){
this.show();
this.dispatchAction(StageSplitBoxBinding.ACTION_SHOW);
}
this.flex();
this.invokeLayout();
this.dispatchAction(StageSplitBoxBinding.ACTION_DOCK_OPENED);
_ec9.consume();
break;
case StageSplitBoxBinding.ACTION_HIDE:
if(_eca!=this){
_ecc=this.getChildBindingByLocalName("splitter");
if(_ecc.isVisible){
_ecc.hide();
}
this.invokeLayout();
_ec9.consume();
}
break;
case StageSplitBoxBinding.ACTION_SHOW:
if(_eca!=this){
var _ecd=this.getChildBindingsByLocalName("splitpanel");
if(_ecd.getFirst().isVisible&&_ecd.getLast().isVisible){
_ecc=this.getChildBindingByLocalName("splitter");
if(!_ecc.isVisible){
_ecc.show();
}
}
this.invokeLayout();
_ec9.consume();
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
StageSplitBoxBinding.prototype.handleCrawler=function(_ece){
StageSplitBoxBinding.superclass.handleCrawler.call(this,_ece);
switch(_ece.id){
case FlexBoxCrawler.ID:
if(this.isMaximizedForReal==false){
_ece.response=NodeCrawler.SKIP_CHILDREN;
}
break;
}
};
StageSplitBoxBinding.prototype.hasBothPanelsVisible=function(){
var _ecf=this.getChildBindingsByLocalName("splitpanel");
return _ecf.getFirst().isVisible&&_ecf.getLast().isVisible;
};
StageSplitBoxBinding.prototype.hasBothPanelsFixed=function(){
var _ed0=this.getChildBindingsByLocalName("splitpanel");
return _ed0.getFirst().isFixed&&_ed0.getLast().isFixed;
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
StageSplitPanelBinding.prototype.handleAction=function(_ed1){
StageSplitPanelBinding.superclass.handleAction.call(this,_ed1);
StageBoxAbstraction.handleAction.call(this,_ed1);
switch(_ed1.type){
case DockBinding.ACTION_EMPTIED:
case StageSplitBoxBinding.ACTION_HIDE:
if(this.isMaximized==true){
this.normalize();
}
var dock=this.getContainedDock();
if(dock&&dock.type==DockBinding.TYPE_EDITORS){
this._invisibilize(true);
if(_ed1.type==StageSplitBoxBinding.ACTION_HIDE){
_ed1.consume();
}
}else{
this.hide();
if(this.isFixed==true){
this.setFix(false);
}
}
if(_ed1.type==DockBinding.ACTION_EMPTIED){
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
if(_ed1.type==StageSplitBoxBinding.ACTION_SHOW){
_ed1.consume();
}
}else{
this.show();
if(this.isFixed==true){
this.setFix(false);
}
}
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
var _ed4=_ed1.target;
if(_ed4!=this&&_ed4.getContainedDock()){
if(this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_VERTICAL){
var _ed5=_ed4._containingSplitBoxBinding;
if(_ed5.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL){
var _ed6=_ed5.getChildBindingsByLocalName("splitpanel");
var _ed7=_ed6.getFirst();
var _ed8=_ed6.getLast();
if(this.isFixed==true){
if(!_ed7.isFixed||!_ed8.isFixed||(!_ed5.hasBothPanelsVisible()&&_ed4.isMinimizedForReal)){
this.setFix(false);
_ed1.consume();
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
}
}else{
if(_ed5.hasBothPanelsFixed()||(!_ed5.hasBothPanelsVisible()&&_ed4.isMinimizedForReal)){
this.setFix(_ed4.getContainedDock().getHeight());
_ed1.consume();
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
var _ed9=this.getContainedDock();
if(_ed9){
if(this.isMaximizePrepared==true){
}else{
_ed9.interceptDisplayChange(false);
}
}
};
StageSplitPanelBinding.prototype.handleUnMaximization=function(){
StageBoxAbstraction.handleUnMaximization.call(this);
var _eda=this.getContainedDock();
if(_eda){
if(_eda.type==DockBinding.TYPE_EDITORS){
if(_eda.isEmpty){
this._invisibilize(true);
}
}
if(this.isMaximized==true){
this.normalize();
}else{
_eda.interceptDisplayChange(true);
}
}
};
StageSplitPanelBinding.prototype.maximize=function(){
if(this.isMinimized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.maximize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
var _edb=this.getContainedDock();
if(_edb){
_edb.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MAXIMIZED,_edb);
}
};
StageSplitPanelBinding.prototype.minimize=function(){
var _edc=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _edd=this.getContainedDock();
if(_edd){
_edd.collapse(_edc);
if(!_edc){
this.setFix(_edd.getHeight());
}else{
this.setFix(_edd.getWidth());
}
}
if(this.isMaximized==true){
this.normalize(true);
}
StageSplitPanelBinding.superclass.minimize.call(this);
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_edd&&_edd.isActive){
_edd.deActivate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_MINIMIZED,_edd);
}
};
StageSplitPanelBinding.prototype.normalize=function(_ede){
var _edf=this._containingSplitBoxBinding.getOrient()==SplitBoxBinding.ORIENT_HORIZONTAL;
var _ee0=this.getContainedDock();
if(_ee0){
if(this.isMinimized==true){
_ee0.unCollapse(_edf);
this.setFix(false);
}
}
StageSplitPanelBinding.superclass.normalize.call(this);
if(!_ede){
this.dispatchAction(StageSplitPanelBinding.ACTION_LAYOUTUPDATE);
if(_ee0){
_ee0.activate();
EventBroadcaster.broadcast(BroadcastMessages.DOCK_NORMALIZED,_ee0);
}
}
};
StageSplitPanelBinding.prototype.getContainedDock=function(){
return this.getChildBindingByLocalName("dock");
};
StageSplitPanelBinding.prototype.invisibilize=function(_ee1){
var _ee2=true;
var dock=this.getContainedDock();
if(dock!=null&&dock.type==DockBinding.TYPE_EDITORS){
if(dock.isEmpty==true){
_ee2=false;
}
}
if(_ee2==true){
this._invisibilize(_ee1);
}
};
StageSplitPanelBinding.prototype._invisibilize=function(_ee4){
if(_ee4!=this._isInvisibilized){
if(_ee4){
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
StageSplitterBinding.prototype.onDragStart=function(_ee5){
var _ee6=top.app.bindingMap.stagesplittercover;
var _ee7=this._containingSplitBoxBinding.getOrient();
switch(_ee7){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_ee6.bindingElement.style.cursor="e-resize";
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_ee6.bindingElement.style.cursor="n-resize";
break;
}
_ee6.show();
var body=top.app.bindingMap.stagesplitterbody;
body.setPosition(this.getPosition());
body.setDimension(this.getDimension());
body.setOrient(_ee7);
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
StageSplitterBodyBinding.prototype.setOrient=function(_eed){
this._orient=_eed;
this.attachClassName(_eed);
};
StageSplitterBodyBinding.prototype.setPosition=function(pos){
var _eef=true;
var _ef0=true;
switch(this._orient){
case SplitBoxBinding.ORIENT_HORIZONTAL:
_ef0=false;
break;
case SplitBoxBinding.ORIENT_VERTICAL:
_eef=false;
break;
}
if(_eef){
this.bindingElement.style.left=pos.x+"px";
}
if(_ef0){
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
StageBoxAbstraction.handleAction=function(_ef2){
switch(_ef2.type){
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
if(_ef2.target instanceof DockBinding){
if(this.isHiddenForReal){
this.dispatchAction(StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED);
}else{
if(this.isMinimizedForReal){
this.normalize();
}
}
}
_ef2.consume();
break;
}
};
StageBoxAbstraction.handleMaximization=function(){
if(this.isMaximizePrepared==true){
this.isMaximizedForReal=true;
this.isHiddenForReal=false;
this.isFlexible=false;
if(Client.isMozilla==true){
var _ef3=this.bindingElement.style;
_ef3.position="absolute";
_ef3.width="100%";
_ef3.height="100%";
_ef3.top="0";
_ef3.left="0";
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
var _ef4=this.bindingElement.style;
_ef4.position="relative";
_ef4.width="auto";
_ef4.height="auto";
_ef4.top="auto";
_ef4.left="auto";
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
StageBoxAbstraction._emulateBasicCSS=function(_ef5,_ef6){
var _ef7=_ef5.bindingElement.style;
var _ef8=_ef5.bindingElement.parentNode;
var box=_ef5._containingSplitBoxBinding;
if(Client.isExplorer==true){
if(_ef6){
_ef5._unmodifiedFlexMethod=_ef5.flex;
_ef5.flex=function(){
_ef7.width=_ef8.offsetWidth+"px";
_ef7.height=_ef8.offsetHeight+"px";
};
}else{
_ef7.width="100%";
_ef7.height="100%";
if(!box.isHorizontalOrient()){
setTimeout(function(){
_ef7.width="auto";
_ef7.height="auto";
box.reflex(true);
},0);
}
_ef5.flex=_ef5._unmodifiedFlexMethod;
_ef5._unmodifiedFlexMethod=null;
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
StageBoxHandlerAbstraction.handleAction=function(_efa){
var _efb=_efa.target;
switch(_efa.type){
case ControlBoxBinding.ACTION_MAXIMIZE:
case ControlBoxBinding.ACTION_NORMALIZE:
if(_efb instanceof StageSplitPanelBinding){
StageBoxHandlerAbstraction.handleControlBoxAction.call(this,_efa);
_efa.consume();
}
break;
case StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED:
if(this.isSubPanelMaximized){
this.iterateContainedStageBoxBindings(StageCrawler.MODE_UNMAXIMIZE);
this.isSubPanelMaximized=false;
}
_efa.consume();
break;
case StageSplitPanelBinding.ACTION_LAYOUTUPDATE:
break;
}
};
StageBoxHandlerAbstraction.handleControlBoxAction=function(_efc){
var mode=null;
switch(_efc.type){
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
StageMenuBarBinding.prototype.handleAction=function(_efe){
StageMenuBarBinding.superclass.handleAction.call(this,_efe);
switch(_efe.type){
case MenuItemBinding.ACTION_COMMAND:
var _eff=_efe.target.associatedSystemAction;
if(Application.isLoggedIn){
if(!this._rootNode){
this._rootNode=System.getRootNode();
}
if(_eff){
SystemAction.invoke(_eff,this._rootNode);
}
}
_efe.consume();
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
var _f00=this.getProperty("handle");
if(_f00){
this._handle=_f00;
if(StageBinding.isViewOpen(_f00)){
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
this.check(true);
}
}
this.oncommand=function(){
var self=this;
Application.lock(self);
setTimeout(function(){
StageBinding.handleViewPresentation(_f00);
Application.unlock(self);
},Client.hasTransitions?Animation.DEFAULT_TIME:0);
};
}else{
throw new Error("StageViewMenuItemBinding: missing handle");
}
};
StageViewMenuItemBinding.prototype.setHandle=function(_f02){
this.setProperty("handle",_f02);
};
StageViewMenuItemBinding.prototype.handleBroadcast=function(_f03,arg){
StageViewMenuItemBinding.superclass.handleBroadcast.call(this,_f03,arg);
if(this.type==MenuItemBinding.TYPE_CHECKBOX){
switch(_f03){
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
StageViewMenuItemBinding.newInstance=function(_f05){
var _f06=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_f05);
UserInterface.registerBinding(_f06,StageViewMenuItemBinding);
return UserInterface.getBinding(_f06);
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
StageStatusBarBinding.prototype.setLabel=function(_f07){
this._label.setLabel(_f07);
};
StageStatusBarBinding.prototype.setImage=function(_f08){
this._label.setImage(_f08);
};
StageStatusBarBinding.prototype.clear=function(){
this._label.setLabel(null);
this._label.setImage(false);
};
StageStatusBarBinding.prototype.startFadeOut=function(_f09){
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
var _f0a=ExplorerBinding.bindingInstance.getSelectedDeckBinding();
var _f0b=_f0a.getAssociatedView();
var _f0c=_f0b.getContentWindow().bindingMap.tree;
return _f0c.getFocusedTreeNodeBindings();
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
ExplorerBinding.prototype.handleAction=function(_f0d){
ExplorerBinding.superclass.handleAction.call(this,_f0d);
var _f0e=_f0d.target;
switch(_f0d.type){
case ExplorerMenuBinding.ACTION_SELECTIONCHANGED:
this._decksBinding.setSelectionByHandle(this._menuBinding.getSelectionHandle());
var tag=this._menuBinding.getSelectionTag();
EventBroadcaster.broadcast(BroadcastMessages.PERSPECTIVE_CHANGED,tag);
break;
case ViewBinding.ACTION_LOADED:
this.dispatchAction(ExplorerBinding.ACTION_DECK_LOADED);
_f0d.consume();
break;
case Binding.ACTION_DRAG:
if(_f0e instanceof ExplorerSplitterBinding){
_f0e.dragger.registerHandler(this);
}
_f0d.consume();
}
};
ExplorerBinding.prototype.setSelectionByHandle=function(_f10){
this._menuBinding.setSelectionByHandle(_f10);
};
ExplorerBinding.prototype.setSelectionDefault=function(){
this._menuBinding.setSelectionDefault();
};
ExplorerBinding.prototype.getSelectedDeckBinding=function(){
return this._decksBinding.getSelectedDeckBinding();
};
ExplorerBinding.prototype.mountDefinition=function(_f11){
if(_f11 instanceof SystemViewDefinition){
this._decksBinding.mountDefinition(_f11);
this._menuBinding.mountDefinition(_f11);
}
};
ExplorerBinding.prototype.onDragStart=function(_f12){
var _f13=this._menuBinding.getDescendantBindingsByLocalName("explorertoolbarbutton");
if(_f13.hasEntries()){
var _f14=_f13.getFirst();
this._dragStart=_f14.boxObject.getLocalPosition().y;
this._dragSlot=0;
if(this._dragHeight==0){
this._dragHeight=_f14.boxObject.getDimension().h;
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
ExplorerDecksBinding.prototype.mountDefinition=function(_f18){
if(_f18 instanceof SystemViewDefinition){
var _f19=ViewBinding.newInstance(this.bindingDocument);
_f19.setType(ViewBinding.TYPE_EXPLORERVIEW);
_f19.setDefinition(_f18);
var _f1a=ExplorerDeckBinding.newInstance(this.bindingDocument);
_f1a.setAssociatedView(_f19);
this._decks[_f18.handle]=_f1a;
_f1a.add(_f19);
this.add(_f1a);
function attach(){
_f1a.attach();
_f19.attach();
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
ExplorerDecksBinding.prototype.setSelectionByHandle=function(_f1b){
var _f1c=this._decks[_f1b];
this.select(_f1c);
};
DecksBinding.prototype.expandBy=function(_f1d){
var deck=this.getSelectedDeckBinding();
if(deck){
var _f1f=this.bindingElement.offsetHeight+_f1d;
var view=deck.getAssociatedView();
this.bindingElement.style.height=_f1f+"px";
this.reflex(true);
}
};
ExplorerDecksBinding.newInstance=function(_f21){
var _f22=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdecks",_f21);
return UserInterface.registerBinding(_f22,ExplorerDecksBinding);
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
ExplorerDeckBinding.prototype.setAssociatedView=function(_f23){
this._viewBinding=_f23;
};
ExplorerDeckBinding.prototype.getAssociatedView=function(){
return this._viewBinding;
};
ExplorerDeckBinding.prototype.select=function(){
if(!this._isExplorerDeckBindingInitialized){
Application.lock(this);
var _f24=StringBundle.getString("ui","Website.App.StatusBar.Loading");
var _f25=this._viewBinding.getDefinition().label;
StatusBar.busy(_f24,[_f25]);
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
ExplorerDeckBinding.prototype.handleAction=function(_f26){
ExplorerDeckBinding.superclass.handleAction.call(this,_f26);
var _f27=_f26.target;
switch(_f26.type){
case PageBinding.ACTION_INITIALIZED:
if(_f27 instanceof SystemPageBinding){
this._isExplorerDeckBindingInitialized=true;
this._entityToken=_f27.node.getEntityToken();
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
ExplorerDeckBinding.prototype.handleBroadcast=function(_f28,arg){
ExplorerDeckBinding.superclass.handleBroadcast.call(this,_f28,arg);
switch(_f28){
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
var _f2a=null;
if(this._isExplorerDeckBindingInitialized){
_f2a=this._viewBinding.getDefinition().label;
}else{
_f2a=DockTabBinding.LABEL_TABLOADING;
}
return _f2a;
};
ExplorerDeckBinding.prototype.getImage=function(){
var _f2b=null;
if(this._isExplorerDeckBindingInitialized){
_f2b=this._viewBinding.getDefinition().image;
}else{
_f2b=DockTabBinding.IMG_TABLOADING;
}
return _f2b;
};
ExplorerDeckBinding.prototype.getToolTip=function(){
var _f2c=null;
if(this._isExplorerDeckBindingInitialized){
_f2c=this._viewBinding.getDefinition().toolTip;
}
return _f2c;
};
ExplorerDeckBinding.newInstance=function(_f2d){
var _f2e=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorerdeck",_f2d);
return UserInterface.registerBinding(_f2e,ExplorerDeckBinding);
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
ExplorerMenuBinding.prototype.onMemberInitialize=function(_f2f){
switch(_f2f.constructor){
case ExplorerToolBarBinding:
this._maxGroup=_f2f.getToolBarGroupByIndex(0);
break;
case ToolBarBinding:
this._minGroup=_f2f.getToolBarGroupByIndex(0);
break;
}
ExplorerMenuBinding.superclass.onMemberInitialize.call(this,_f2f);
};
ExplorerMenuBinding.prototype.mountDefinition=function(_f30){
this._maxButtons.set(_f30.handle,this._mountMaxButton(_f30));
this._minButtons.set(_f30.handle,this._mountMinButton(_f30));
this._index++;
};
ExplorerMenuBinding.prototype._mountMaxButton=function(_f31){
var _f32=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_LARGE);
_f32.setLabel(_f31.label);
_f32.setToolTip(_f31.toolTip);
_f32.handle=_f31.handle;
_f32.node=_f31.node;
this._maxGroup.add(_f32);
this._maxList.add(_f32);
_f32.attach();
return _f32;
};
ExplorerMenuBinding.prototype._mountMinButton=function(_f33){
var _f34=ExplorerToolBarButtonBinding.newInstance(this.bindingDocument,ExplorerToolBarButtonBinding.TYPE_NORMAL);
_f34.setLabel(_f33.label);
_f34.setToolTip(_f33.label);
_f34.handle=_f33.handle;
_f34.node=_f33.node;
this._minGroup.addFirst(_f34);
this._minList.add(_f34);
_f34.attach();
_f34.hide();
return _f34;
};
ExplorerMenuBinding.prototype.handleAction=function(_f35){
ExplorerMenuBinding.superclass.handleAction.call(this,_f35);
switch(_f35.type){
case RadioGroupBinding.ACTION_SELECTIONCHANGED:
var _f36=_f35.target;
var _f37=_f36.getCheckedButtonBinding();
var _f38=_f37.handle;
switch(_f36){
case this._maxGroup:
this._minGroup.setCheckedButtonBinding(this._minButtons.get(_f38),true);
break;
case this._minGroup:
this._maxGroup.setCheckedButtonBinding(this._maxButtons.get(_f38),true);
break;
}
this._selectedHandle=_f38;
this._selectedTag=_f37.node.getTag();
this.dispatchAction(ExplorerMenuBinding.ACTION_SELECTIONCHANGED);
_f35.consume();
break;
}
};
ExplorerMenuBinding.prototype.setSelectionByHandle=function(_f39){
var _f3a=this._maxButtons.get(_f39);
if(_f3a){
_f3a.check();
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
var _f3b=false;
var max=this._maxList.getLength()-1;
if(!this._maxList.get(max).isVisible){
this._index++;
this._maxList.get(this._index).show();
this._minList.get(this._index).hide();
_f3b=true;
}
return _f3b;
};
ExplorerMenuBinding.prototype.showLess=function(){
var _f3d=false;
if(this._maxList.get(0).isVisible){
this._maxList.get(this._index).hide();
this._minList.get(this._index).show();
this._index--;
_f3d=true;
}
return _f3d;
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
ExplorerToolBarBinding.newInstance=function(_f3e){
var _f3f=DOMUtil.createElementNS(Constants.NS_UI,"ui:explorertoolbar",_f3e);
return UserInterface.registerBinding(_f3f,ExplorerToolBarBinding);
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
var _f40=this.explorerToolBarButtonType==ExplorerToolBarButtonBinding.TYPE_LARGE;
var _f41=_f40?ToolBarBinding.IMAGESIZE_LARGE:ToolBarBinding.IMAGESIZE_NORMAL;
this.imageProfile=this.node.getImageProfile(_f41);
ExplorerToolBarButtonBinding.superclass.onBindingAttach.call(this);
};
ExplorerToolBarButtonBinding.newInstance=function(_f42,_f43){
var _f44=(_f43==ExplorerToolBarButtonBinding.TYPE_LARGE?"ui:explorertoolbarbutton":"ui:toolbarbutton");
var _f45=DOMUtil.createElementNS(Constants.NS_UI,_f44,_f42);
var _f46=UserInterface.registerBinding(_f45,ExplorerToolBarButtonBinding);
_f46.explorerToolBarButtonType=_f43;
return _f46;
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
EditorBinding.registerComponent=function(_f47,_f48){
var _f49=EditorBinding._components;
var _f4a=EditorBinding._editors;
var key=_f48.key;
var _f4c=Interfaces.isImplemented(IWysiwygEditorComponent,_f47);
if(!_f4c){
_f4c=Interfaces.isImplemented(ISourceEditorComponent,_f47);
}
if(_f4c){
if(_f4a.has(key)){
_f4a.get(key).initializeEditorComponent(_f47);
}else{
if(!_f49.has(key)){
_f49.set(key,new List());
}
_f49.get(key).add(_f47);
}
}else{
throw "Editor component interface not implemented: "+_f47;
}
};
EditorBinding.claimComponents=function(_f4d,_f4e){
var _f4f=EditorBinding._components;
var _f50=EditorBinding._editors;
var key=_f4e.key;
_f50.set(key,_f4d);
var list=null;
if(_f4f.has(key)){
list=_f4f.get(key).copy();
_f4f.del(key);
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
var _f54=this.getProperty("value");
if(_f54!=null){
_f54=decodeURIComponent(_f54);
this._startContent=_f54;
}
};
EditorBinding.prototype.onBindingDispose=function(){
EditorBinding.superclass.onBindingDispose.call(this);
var name=this.getProperty("name");
if(name!=null){
var _f56=this.bindingWindow.DataManager;
_f56.unRegisterDataBinding(name);
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
EditorBinding.prototype.initializeEditorComponents=function(_f58){
var _f59=EditorBinding.claimComponents(this,_f58);
if(_f59!=null){
while(_f59.hasNext()){
this.initializeEditorComponent(_f59.getNext());
}
}
};
EditorBinding.prototype._registerWithDataManager=function(name){
if(name&&name!=""){
var _f5b=this.bindingWindow.DataManager;
if(_f5b.getDataBinding(name)){
_f5b.unRegisterDataBinding(name);
}
_f5b.registerDataBinding(name,this);
}
};
EditorBinding.prototype.addEditorEvents=function(){
var _f5c=this.getEditorDocument();
if(_f5c!=null){
Application.framework(_f5c);
DOMEvents.addEventListener(_f5c,DOMEvents.CONTEXTMENU,this);
DOMEvents.addEventListener(_f5c,DOMEvents.KEYPRESS,this);
DOMEvents.addEventListener(_f5c,DOMEvents.MOUSEDOWN,this);
DOMEvents.addEventListener(_f5c,DOMEvents.MOUSEMOVE,this);
}
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,{handleEvent:function(e){
DOMEvents.stopPropagation(e);
DOMEvents.preventDefault(e);
}});
};
EditorBinding.prototype.checkForDirty=function(_f5e){
if(!this.isDirty){
if(_f5e==true){
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
var _f60=this.getCheckSum();
if(_f60!=this._checksum){
this.dispatchAction(Binding.ACTION_DIRTY);
this.isDirty=true;
this._checksum=_f60;
}
};
EditorBinding.prototype.getCheckSum=function(){
var _f61=null;
if(Binding.exists(this._pageBinding)){
_f61=this._pageBinding.getCheckSum(this._checksum);
}
return _f61;
};
EditorBinding.prototype.handleEvent=function(e){
EditorBinding.superclass.handleEvent.call(this,e);
var _f63=DOMEvents.getTarget(e);
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
if(_f63==this._bespinElement){
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
if(_f63.ownerDocument==this.getEditorDocument()){
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
EditorBinding.prototype.handleBroadcast=function(_f65,arg){
EditorBinding.superclass.handleBroadcast.call(this,_f65,arg);
var _f67=null;
switch(_f65){
case BroadcastMessages.APPLICATION_BLURRED:
if(this._isActivated){
this._activateEditor(false);
}
break;
case BroadcastMessages.MOUSEEVENT_MOUSEUP:
if(!this.isDialogMode){
try{
var _f68=true;
if(arg instanceof Binding){
if(Interfaces.isImplemented(IEditorControlBinding,arg)==true){
if(arg.isEditorControlBinding){
_f68=false;
}
}
}else{
_f67=DOMEvents.getTarget(arg);
if(this instanceof BespinEditorBinding){
if(_f67==this._bespinElement){
_f68=false;
}
}else{
if(_f67&&_f67.ownerDocument==this.getEditorDocument()){
_f68=false;
}
}
}
if(_f68){
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
EditorBinding.prototype._activateEditor=function(_f69){
if(_f69!=this._isActivated){
this._isActivated=_f69;
EditorBinding.isActive=_f69;
var _f6a=this.getEditorWindow().standardEventHandler;
var _f6b=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_f6b!=null){
if(_f69){
if(this.hasBookmark()){
this.deleteBookmark();
}
_f6b.enable();
if(Client.isExplorer){
this._sanitizeExplorer();
}
this.focus();
_f6a.enableNativeKeys(true);
}else{
_f6b.disable();
_f6a.disableNativeKeys();
this.blur();
}
}else{
throw "Required broadcaster not found";
}
}
};
EditorBinding.prototype._sanitizeExplorer=function(){
if(Client.isExplorer){
var _f6c=this.getEditorDocument().selection.createRange();
_f6c.select();
}
};
EditorBinding.prototype._sanitizeMozilla=function(){
};
EditorBinding.prototype.hasSelection=function(){
var _f6d=false;
try{
if(!Client.isExplorer){
var _f6e=this.getEditorWindow().getSelection();
if(_f6e!=null){
_f6d=_f6e.toString().length>0;
if(!_f6d){
var _f6f=_f6e.getRangeAt(0);
var frag=_f6f.cloneContents();
var _f71=this.getEditorDocument().createElement("element");
while(frag.hasChildNodes()){
_f71.appendChild(frag.firstChild);
}
var img=_f71.getElementsByTagName("img").item(0);
if(img!=null){
if(!CSSUtil.hasClassName(img,VisualEditorBinding.FUNCTION_CLASSNAME)){
_f6d=true;
}
}
}
}
}else{
var _f6f=this.getEditorDocument().selection.createRange();
_f6d=(_f6f&&_f6f.text)&&_f6f.text.length>0;
}
}
catch(exception){
}
return _f6d;
};
EditorBinding.prototype.isCommandEnabled=function(_f73){
var _f74=true;
switch(_f73){
case "Cut":
case "Copy":
case "Paste":
_f74=this.getEditorDocument().queryCommandEnabled(_f73);
break;
}
return _f74;
};
EditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _f78=false;
this.restoreBookmark();
switch(cmd){
case "Cut":
case "Copy":
case "Paste":
var _f79=null;
if(cmd=="Paste"){
_f79=null;
}else{
_f79=this.hasSelection();
}
try{
this.getEditorDocument().execCommand(cmd,gui,_f79);
}
catch(mozillaSecurityException){
if(Client.isMozilla==true){
Dialog.invokeModal(EditorBinding.URL_DIALOG_MOZ_CONFIGURE);
}else{
throw "Clipboard operation malfunction. Contact your developer.";
}
}
finally{
_f78=true;
}
break;
}
return _f78;
};
EditorBinding.prototype.getButtonForCommand=function(cmd){
var _f7b=this.getContentWindow().bindingMap.toolbar;
var _f7c=_f7b.getButtonForCommand(cmd);
if(!_f7c){
throw "No button for command "+cmd;
}
return _f7c;
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
var _f7f=this.getContentDocument().getElementById("focusableinput");
if(_f7f!=null){
_f7f.style.display="block";
FocusBinding.focusElement(_f7f);
_f7f.style.display="none";
}else{
throw "Required element not found: focusableinput";
}
};
EditorBinding.prototype.handleAction=function(_f80){
EditorBinding.superclass.handleAction.call(this,_f80);
var _f81=_f80.target;
var self=this;
var _f83=this.shadowTree.iframe;
switch(_f80.type){
case Binding.ACTION_DIRTY:
if(_f80.target!=this){
this.checkForDirty();
}
break;
}
};
EditorBinding.prototype._onPageInitialize=function(_f84){
if(this._pageBinding==null){
this.reflex();
if(this._coverBinding!=null&&this._coverBinding.isVisible){
this._coverBinding.hide();
}
}
EditorBinding.superclass._onPageInitialize.call(this,_f84);
};
EditorBinding.prototype.handleElement=function(_f85){
return true;
};
EditorBinding.prototype.updateElement=function(_f86){
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
this._menuGroups[rel].each(function(_f89){
_f89.show();
});
};
EditorPopupBinding.prototype._hideMenuGroups=function(rel){
this._menuGroups[rel].each(function(_f8b){
_f8b.hide();
});
};
EditorPopupBinding.prototype.handleAction=function(_f8c){
EditorPopupBinding.superclass.handleAction.call(this,_f8c);
var _f8d=_f8c.target;
if(_f8c.type==MenuItemBinding.ACTION_COMMAND){
this.hide();
var cmd=_f8d.getProperty("cmd");
var gui=_f8d.getProperty("gui");
var val=_f8d.getProperty("val");
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
var _f91=this.bindingWindow.bindingMap.tinywindow;
var _f92=this.bindingWindow.bindingMap.codepresswindow;
if(_f91){
EditorBinding.registerComponent(this,_f91);
}else{
if(_f92){
EditorBinding.registerComponent(this,_f92);
}
}
};
EditorClickButtonBinding.prototype.buildDOMContent=function(){
EditorClickButtonBinding.superclass.buildDOMContent.call(this);
this._buildDesignModeSanitizer();
};
EditorClickButtonBinding.prototype.initializeComponent=function(_f93,_f94,_f95,_f96){
this._editorBinding=_f93;
this._tinyEngine=_f94;
this._tinyInstance=_f95;
this._tinyTheme=_f96;
this._setupEditorBookmarking();
};
EditorClickButtonBinding.prototype.initializeSourceEditorComponent=function(_f97,_f98,_f99){
this._editorBinding=_f97;
this._codePressFrame=_f98;
this._codePressEngine=_f99;
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
var _f9b=this._editorBinding;
if(_f9b!=null){
var self=this;
var _f9d={handleEvent:function(e){
switch(e.type){
case DOMEvents.MOUSEDOWN:
if(!_f9b.hasBookmark()){
_f9b.createBookmark();
}
break;
case DOMEvents.MOUSEUP:
if(self.isEditorSimpleControl){
if(self.popupBinding==null){
if(_f9b.hasBookmark()){
_f9b.restoreBookmark();
}
}
}
break;
}
}};
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEDOWN,_f9d);
DOMEvents.addEventListener(this.bindingElement,DOMEvents.MOUSEUP,_f9d);
}
};
EditorClickButtonBinding.newInstance=function(_f9f){
var _fa0=DOMUtil.createElementNS(Constants.NS_UI,"ui:clickbutton",_f9f);
return UserInterface.registerBinding(_fa0,EditorClickButtonBinding);
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
EditorToolBarButtonBinding.newInstance=function(_fa1){
var _fa2=DOMUtil.createElementNS(Constants.NS_UI,"ui:toolbarbutton",_fa1);
return UserInterface.registerBinding(_fa2,EditorToolBarButtonBinding);
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
var _fa3=this.bindingWindow.bindingMap.tinywindow;
EditorBinding.registerComponent(this,_fa3);
EditorSelectorBinding.superclass.onBindingAttach.call(this);
};
EditorSelectorBinding.prototype.buildButton=function(){
EditorSelectorBinding.superclass.buildButton.call(this);
this._buttonBinding.isEditorSimpleControl=false;
if(this.isEditorControlBinding==false){
this._buttonBinding.isEditorControlBinding=false;
}
};
EditorSelectorBinding.prototype.initializeComponent=function(_fa4,_fa5,_fa6,_fa7){
this._editorBinding=_fa4;
this._tinyEngine=_fa5;
this._tinyInstance=_fa6;
this._tinyTheme=_fa7;
};
EditorSelectorBinding.prototype.handleAction=function(_fa8){
EditorSelectorBinding.superclass.handleAction.call(this,_fa8);
switch(_fa8.type){
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
EditorSelectorBinding.superclass.handleAction.call(this,_fa8);
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
EditorMenuItemBinding.newInstance=function(_fab){
var _fac=DOMUtil.createElementNS(Constants.NS_UI,"ui:menuitem",_fab);
return UserInterface.registerBinding(_fac,EditorMenuItemBinding);
};
VisualEditorBinding.prototype=new EditorBinding;
VisualEditorBinding.prototype.constructor=VisualEditorBinding;
VisualEditorBinding.superclass=EditorBinding.prototype;
VisualEditorBinding.FUNCTION_CLASSNAME="compositeFunctionWysiwygRepresentation";
VisualEditorBinding.FIELD_CLASSNAME="compositeFieldReferenceWysiwygRepresentation";
VisualEditorBinding.ACTION_INITIALIZED="visualeditor initialized";
VisualEditorBinding.DEFAULT_CONTENT="<p><br/></p>";
VisualEditorBinding.URL_DIALOG_CONTENTERROR="${root}/content/dialogs/wysiwygeditor/errors/contenterror.aspx";
VisualEditorBinding.XHTML="<html xmlns=\"http://www.w3.org/1999/xhtml\">\n\t<head>${head}</head>\n\t<body>\n${body}\n\t</body>\n</html>";
VisualEditorBinding.getTinyLessClassName=function(_fad){
var i=0,_faf,_fb0="",_fb1=_fad.split(" ");
while((_faf=_fb1[i])!=null){
if(_faf.length>=3&&_faf.substring(0,3)=="mce"){
_faf="";
}else{
if(_faf.length>=14&&_faf.substring(0,14)=="compositemedia"){
_faf="";
}
}
_fb0+=_faf;
if(_fb1[i+1]){
_fb0+=" ";
}
i++;
}
return _fb0;
};
VisualEditorBinding.getStructuredContent=function(_fb2){
var _fb3=null;
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.TinyContentToStructuredContent(_fb2);
if(soap instanceof SOAPFault){
}else{
_fb3=soap.XhtmlFragment;
if(!_fb3){
_fb3="";
}
}
WebServiceProxy.isFaultHandler=true;
return _fb3;
};
VisualEditorBinding.getTinyContent=function(_fb5,_fb6){
var _fb7=null;
if(_fb5==null||_fb5==""){
_fb5=VisualEditorBinding.DEFAULT_CONTENT;
}
WebServiceProxy.isFaultHandler=false;
var soap=XhtmlTransformationsService.StructuredContentToTinyContent(_fb5);
if(soap instanceof SOAPFault){
var _fb9=soap;
var _fba={handleDialogResponse:function(){
_fb6.dispatchAction(Binding.ACTION_VALID);
}};
Dialog.invokeModal(VisualEditorBinding.URL_DIALOG_CONTENTERROR,_fba,_fb9);
}else{
_fb7=soap.XhtmlFragment;
if(_fb7==null){
_fb7=new String("");
}
}
WebServiceProxy.isFaultHandler=true;
return _fb7;
};
VisualEditorBinding.extractByIndex=function(html,_fbc){
var _fbd=null;
var doc=XMLParser.parse(html);
if(doc!=null){
var _fbf=new List(doc.documentElement.childNodes);
var _fc0=new List();
_fbf.each(function(_fc1){
if(_fc1.nodeType==Node.ELEMENT_NODE){
_fc0.add(_fc1);
}
});
var _fc2=_fc0.get(_fbc);
if(_fc2==null){
if(Application.isDeveloperMode){
alert("VisualEditorBinding: Bad HTML!"+"\n\n"+html);
}
}else{
if(_fc2.hasChildNodes()){
var frag=doc.createDocumentFragment();
while(_fc2.hasChildNodes()){
frag.appendChild(_fc2.firstChild);
}
doc.removeChild(doc.documentElement);
doc.appendChild(DOMUtil.createElementNS(Constants.NS_XHTML,"ROOT",doc));
doc.documentElement.appendChild(frag);
_fbd=DOMSerializer.serialize(doc.documentElement);
_fbd=_fbd.substring(_fbd.indexOf(">")+1,_fbd.length);
_fbd=_fbd.substring(0,_fbd.lastIndexOf("<"));
}
}
}
if(_fbd==null){
_fbd=new String("");
}
return _fbd;
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
var _fc4=this.getProperty("embedablefieldstypenames");
if(_fc4!=null){
this.embedableFieldConfiguration=VisualEditorFieldGroupConfiguration.getConfiguration(_fc4);
}
var _fc5=this.getProperty("formattingconfiguration");
if(_fc5!=null){
this._url+="?config="+_fc5;
}
VisualEditorBinding.superclass.onBindingAttach.call(this);
this.subscribe(BroadcastMessages.TINYMCE_INITIALIZED);
this.subscribe(BroadcastMessages.VISUALEDITOR_HACKED);
};
VisualEditorBinding.prototype.toString=function(){
return "[VisualEditorBinding]";
};
VisualEditorBinding.prototype.handleBroadcast=function(_fc6,arg){
VisualEditorBinding.superclass.handleBroadcast.call(this,_fc6,arg);
var _fc8=this.getContentWindow().bindingMap.tinywindow;
var _fc9=_fc8.getContentWindow();
switch(_fc6){
case BroadcastMessages.VISUALEDITOR_HACKED:
if(arg.broadcastWindow==_fc9){
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
if(arg.broadcastWindow==_fc9){
this._tinyEngine=arg.tinyEngine;
this._tinyInstance=arg.tinyInstance;
this._tinyTheme=arg.tinyTheme;
this._tinyTheme.initC1(this,this._tinyEngine,this._tinyInstance);
this.initializeEditorComponents(_fc8);
this._initialize();
this.unsubscribe(BroadcastMessages.TINYMCE_INITIALIZED);
}
break;
}
};
VisualEditorBinding.prototype.initializeEditorComponent=function(_fca){
_fca.initializeComponent(this,this._tinyEngine,this._tinyInstance,this._tinyTheme);
};
VisualEditorBinding.prototype._finalize=function(){
VisualEditorBinding.superclass._finalize.call(this);
this._maybeShowEditor();
};
VisualEditorBinding.prototype._onPageInitialize=function(_fcb){
VisualEditorBinding.superclass._onPageInitialize.call(this,_fcb);
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
VisualEditorBinding.prototype.normalizeToDocument=function(_fce){
var _fcf=_fce;
if(!this._isNormalizedDocument(_fce)){
_fce="\t\t"+_fce.replace(/\n/g,"\n\t\t");
_fcf=VisualEditorBinding.XHTML.replace("${head}",this._getHeadSection()).replace("${body}",_fce);
}
return _fcf;
};
VisualEditorBinding.prototype._isNormalizedDocument=function(_fd0){
var _fd1=false;
var doc=XMLParser.parse(_fd0,true);
if(doc!=null){
if(doc.documentElement.nodeName=="html"){
_fd1=true;
}
}
return _fd1;
};
VisualEditorBinding.prototype._getHeadSection=function(){
return this._head!=null?this._head:new String("");
};
VisualEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _fd6=VisualEditorBinding.superclass.handleCommand.call(this,cmd,gui,val);
if(!_fd6){
try{
this._tinyInstance.execCommand(cmd,gui,val);
this.checkForDirty();
}
catch(e){
SystemDebug.stack(arguments);
}
_fd6=true;
}
return _fd6;
};
VisualEditorBinding.prototype.handleContextMenu=function(e){
var _fd8=DOMEvents.getTarget(e);
this._popupBinding.configure(this._tinyInstance,this._tinyEngine,_fd8);
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
VisualEditorBinding.prototype.setValue=function(_fd9){
if(this._isFinalized){
if(Binding.exists(this._pageBinding)){
this._pageBinding.setContent(_fd9);
}
}else{
if(this._startContent==null){
this._startContent=_fd9;
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
VisualEditorBinding.prototype.setResult=function(_fda){
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
VisualEditorPopupBinding.prototype.configure=function(_fdb,_fdc,_fdd){
var _fde=this.editorBinding.hasSelection();
this.tinyInstance=_fdb;
this.tinyEngine=_fdc;
this.tinyElement=_fdd;
this.hasSelection=_fde;
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
var _fe2=false;
if(this.hasSelection){
_fe2=true;
}else{
if(this.tinyElement){
if(this.tinyElement.nodeName=="A"&&!this.tinyElement.getAttribute("name")){
_fe2=true;
}else{
if(this.tinyElement.nodeName=="IMG"){
_fe2=true;
}
}
}
}
if(_fe2){
this._showMenuGroups("link");
this._configureLinkGroupDetails();
}else{
this._hideMenuGroups("link");
}
};
VisualEditorPopupBinding.prototype._configureLinkGroupDetails=function(){
var _fe3=this.getMenuItemForCommand("compositeInsertLink");
var _fe4=this.getMenuItemForCommand("unlink");
var _fe5=this.editorBinding.getButtonForCommand("compositeInsertLink");
var _fe6=this.editorBinding.getButtonForCommand("unlink");
_fe4.setDisabled(_fe6.isDisabled);
if(_fe4.isDisabled){
_fe3.setLabel("Link");
}else{
_fe3.setLabel("Link properties");
}
};
VisualEditorPopupBinding.prototype._configureInsertGroup=function(){
var _fe7=this.editorBinding.embedableFieldConfiguration;
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
if(_fe7){
var _fea=_fe7.getGroupNames();
if(_fea.hasEntries()){
var _feb=MenuPopupBinding.newInstance(doc);
var body=_feb.add(MenuBodyBinding.newInstance(doc));
var _fed=body.add(MenuGroupBinding.newInstance(doc));
_fea.each(function(_fee){
var _fef=_fe7.getFieldNames(_fee);
_fef.each(function(_ff0){
var i=_fed.add(MenuItemBinding.newInstance(doc));
i.setLabel(_ff0);
i.setImage("${icon:field}");
i.setProperty("cmd","compositeInsertField");
i.setProperty("val",_fee+":"+_ff0);
_fed.add(i);
});
});
item.add(_feb);
}
}else{
item.disable();
}
this._menuGroups["insertions"].getFirst().add(item);
item.attachRecursive();
this._menuItems["compositeInsertFieldParent"]=item;
};
VisualEditorPopupBinding.prototype._configureTableGroup=function(){
var _ff2=this.tinyInstance.dom.getParent(this.tinyElement,"table,td");
var _ff3=null;
var _ff4=null;
if(_ff2){
if(_ff2.nodeName=="TD"){
_ff3=_ff2.getAttribute("colspan");
_ff4=_ff2.getAttribute("rowspan");
}
this._menuItems["mceTableSplitCells"].setDisabled(_ff3=="1"&&_ff4=="1");
this._menuItems["mceTablePasteRowBefore"].setDisabled(this.tinyInstance.tableRowClipboard==null);
this._menuItems["mceTablePasteRowAfter"].setDisabled(this.tinyInstance.tableRowClipboard==null);
}
if(_ff2){
this._showMenuGroups("table");
}else{
this._hideMenuGroups("table");
}
};
VisualEditorPopupBinding.prototype._configureRenderingGroup=function(){
var _ff5=this._isRendering();
if(_ff5){
this._showMenuGroups("rendering");
}else{
this._hideMenuGroups("rendering");
}
this._isRenderingSelected=_ff5;
};
VisualEditorPopupBinding.prototype._configureFieldGroup=function(){
var _ff6=this._isField();
if(_ff6){
this._showMenuGroups("field");
}else{
this._hideMenuGroups("field");
}
this._isFieldSelected=_ff6;
};
VisualEditorPopupBinding.prototype._configureImageGroup=function(){
if(this._isImage()&&!this._isRenderingSelected&&!this._isFieldSelected){
this._showMenuGroups("image");
}else{
this._hideMenuGroups("image");
}
};
VisualEditorPopupBinding.prototype._isImage=function(){
var _ff7=false;
if(!this.hasSelection){
_ff7=this.tinyElement&&this.tinyElement.nodeName=="IMG";
}
return _ff7;
};
VisualEditorPopupBinding.prototype._isRendering=function(){
return this._isImage()&&CSSUtil.hasClassName(this.tinyElement,VisualEditorBinding.FUNCTION_CLASSNAME);
};
VisualEditorPopupBinding.prototype._isField=function(){
return this._isImage()&&CSSUtil.hasClassName(this.tinyElement,VisualEditorBinding.FIELD_CLASSNAME);
};
VisualEditorElementClassConfiguration._configurations=new Map();
VisualEditorElementClassConfiguration.getConfiguration=function(_ff8){
var _ff9=VisualEditorElementClassConfiguration._configurations;
if(!_ff9.has(_ff8)){
_ff9.set(_ff8,new VisualEditorElementClassConfiguration(EditorConfigurationService.GetElementClassConfiguration(_ff8)));
}
return _ff9.get(_ff8);
};
function VisualEditorElementClassConfiguration(doc){
this.logger=SystemLogger.getLogger("VisualEditorElementClassConfiguration");
this._elements={};
var _ffb=new XPathResolver();
var _ffc=_ffb.resolveAll("elements/element",doc);
while(_ffc.hasNext()){
var _ffd=_ffc.getNext();
var _ffe=_ffd.getAttribute("name");
this._elements[_ffe]=new List();
var _fff=_ffb.resolveAll("class",_ffd);
while(_fff.hasNext()){
var _1000=_fff.getNext().getAttribute("name");
this._elements[_ffe].add(_1000);
}
}
}
VisualEditorElementClassConfiguration.prototype.getClassNamesForElement=function(name){
var _1002=null;
if(this._elements[name]){
_1002=this._elements[name].copy();
}else{
_1002=new List();
}
return _1002;
};
VisualEditorFormattingConfiguration._configurations=new Map();
VisualEditorFormattingConfiguration._options=null;
VisualEditorFormattingConfiguration.getConfiguration=function(_1003){
var _1004=VisualEditorFormattingConfiguration._configurations;
if(!_1004.has(_1003)){
_1004.set(_1003,new VisualEditorFormattingConfiguration());
}
return _1004.get(_1003);
};
VisualEditorFormattingConfiguration._getOptions=function(){
if(VisualEditorFormattingConfiguration._options==null){
var p="Composite.Web.VisualEditor";
VisualEditorFormattingConfiguration._options={"p":StringBundle.getString(p,"FormatSelector.LabelParagraph"),"address":StringBundle.getString(p,"FormatSelector.LabelAddress"),"blockquote":StringBundle.getString(p,"FormatSelector.LabelBlockQuote"),"div":StringBundle.getString(p,"FormatSelector.LabelDivision"),"h1":StringBundle.getString(p,"FormatSelector.LabelHeading1"),"h2":StringBundle.getString(p,"FormatSelector.LabelHeading2"),"h3":StringBundle.getString(p,"FormatSelector.LabelHeading3"),"h4":StringBundle.getString(p,"FormatSelector.LabelHeading4"),"h5":StringBundle.getString(p,"FormatSelector.LabelHeading5"),"h6":StringBundle.getString(p,"FormatSelector.LabelHeading6")};
}
return VisualEditorFormattingConfiguration._options;
};
function VisualEditorFormattingConfiguration(_1006){
this._options=VisualEditorFormattingConfiguration._getOptions();
}
VisualEditorFormattingConfiguration.prototype.getFormattingOptions=function(){
return this._options;
};
VisualEditorFieldGroupConfiguration._configurations=new Map();
VisualEditorFieldGroupConfiguration.getConfiguration=function(_1007){
var _1008=null;
var _1009=VisualEditorFieldGroupConfiguration._configurations;
if(!_1009.has(_1007)){
_1009.set(_1007,new VisualEditorFieldGroupConfiguration(EditorConfigurationService.GetEmbedableFieldGroupConfigurations(_1007)));
}
return _1009.get(_1007);
};
function VisualEditorFieldGroupConfiguration(_100a){
var _100b=new Map();
new List(_100a).each(function(group){
var map=new Map();
new List(group.Fields).each(function(field){
map.set(field.Name,{xhtml:field.XhtmlRepresentation,xml:field.XhtmlRepresentation});
});
_100b.set(group.GroupName,map);
});
this._groups=_100b;
}
VisualEditorFieldGroupConfiguration.prototype.getGroupNames=function(){
return this._groups.toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getFieldNames=function(_100f){
return this._groups.get(_100f).toList(true);
};
VisualEditorFieldGroupConfiguration.prototype.getTinyMarkup=function(_1010,_1011){
return this._groups.get(_1010).get(_1011).xhtml;
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
var _1013=this.getDescendantElementsByLocalName("textarea");
while(_1013.hasNext()){
var _1014=_1013.getNext();
if(_1014.getAttribute("selected")=="true"){
this._startContent=_1014.value;
this._textareaname=_1014.getAttribute("placeholderid");
}
}
if(this._startContent==null){
this._startContent=VisualEditorBinding.DEFAULT_CONTENT;
}
};
VisualMultiEditorBinding.prototype._initialize=function(){
var self=this;
this._registerWithDataManager("generated"+KeyMaster.getUniqueKey());
var _1016=this.getContentWindow().bindingMap.templatetree;
_1016.addActionListener(TreeBinding.ACTION_SELECTIONCHANGED,{handleAction:function(_1017){
var _1018=_1016.getSelectedTreeNodeBindings().getFirst();
self._placeHolderSelected(_1018.textareaname);
_1017.consume();
}});
_1016.addActionListener(Binding.ACTION_FOCUSED,{handleAction:function(_1019){
self._activateEditor(false);
}});
this._updatePlaceHolders();
var _101a=this.getContentWindow().bindingMap.toolsplitter;
_101a.unCollapse();
VisualMultiEditorBinding.superclass._initialize.call(this);
};
VisualMultiEditorBinding.prototype._updatePlaceHolders=function(){
templatetree=this.getContentWindow().bindingMap.templatetree;
var _101b=this.getDescendantElementsByLocalName("textarea");
templatetree.empty();
if(_101b.hasEntries()){
this._hasPlaceHolders=true;
this._parsePlaceHolders(_101b);
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
VisualMultiEditorBinding.prototype._parsePlaceHolders=function(_101c){
this._textareas=new Map();
while(_101c.hasNext()){
var _101d=_101c.getNext();
var _101e=_101d.getAttribute("placeholderid");
this._textareas.set(_101e,{placeholderid:_101e,placeholdername:_101d.getAttribute("placeholdername"),placeholdermarkup:_101d.value,textareaelement:_101d,isSelected:_101d.getAttribute("selected")=="true"});
}
var _101f=new Map();
this._textareas.each(function(name,_1021){
var _1022=templatetree.add(TreeNodeBinding.newInstance(templatetree.bindingDocument));
_1022.setLabel(_1021.placeholdername);
_1022.setImage("${icon:placeholder}");
_1022.setProperty("placeholder",true);
_1022.textareaname=name;
_101f.set(_1021.placeholdername,_1022);
if(_1021.isSelected){
selected=_1022;
}
});
templatetree.attachRecursive();
if(selected!=null){
var _1023=this._textareas.get(selected.textareaname);
this._textareaname=selected.textareaname;
this._placeholdername=_1023.placeholdername;
this._setContentFromPlaceHolder(selected.textareaname);
selected.focus();
}
};
VisualMultiEditorBinding.prototype._noPlaceHolders=function(){
var _1024=this.getContentWindow().bindingMap.templatetree;
var _1025=_1024.add(TreeNodeBinding.newInstance(_1024.bindingDocument));
_1025.setLabel(StringBundle.getString("Composite.Web.VisualEditor","TemplateTree.NoTemplateWarning"));
_1025.setImage("${icon:warning}");
_1025.attach();
var _1026=this.getContentWindow().bindingMap.statusbar;
_1026.setPlaceHolderName(null);
};
VisualMultiEditorBinding.prototype._setContentFromPlaceHolder=function(name){
if(this._isFinalized==true){
var _1028=this._textareas.get(name);
var _1029=_1028.placeholdermarkup;
this.setValue(this.normalizeToDocument(_1029));
this.resetUndoRedo();
}
};
VisualMultiEditorBinding.prototype._placeHolderSelected=function(_102a){
if(this._isFinalized==true){
if(this._textareaname&&this._textareas.has(this._textareaname)){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
}
}
this._textareaname=_102a;
this._placeholdername=this._textareas.get(this._textareaname).placeholdername;
var _102b=this.getContentWindow().bindingMap.statusbar;
_102b.setPlaceHolderName(this._placeholdername);
if(this._isFinalized==true){
var self=this;
Application.lock(self);
setTimeout(function(){
self._setContentFromPlaceHolder(_102a);
Application.unlock(self);
},0);
}
};
VisualMultiEditorBinding.prototype.extractHead=function(html){
VisualMultiEditorBinding.superclass.extractHead.call(this,html);
this._heads.set(this._textareaname,this._head);
};
VisualMultiEditorBinding.prototype._getHeadSection=function(){
var _102e="";
if(this._heads.has(this._textareaname)){
_102e=this._heads.get(this._textareaname);
if(_102e==null){
_102e=new String("");
}
}
return _102e;
};
VisualMultiEditorBinding.prototype.manifest=function(){
if(this._textareas!=null&&this._textareas.hasEntries()){
this._textareas.get(this._textareaname).placeholdermarkup=this.getValue();
this._textareas.each(function(name,_1030){
_1030.textareaelement.value=_1030.placeholdermarkup;
});
}
};
VisualMultiEditorBinding.prototype.updateElement=function(_1031,_1032){
var _1033=_1031.getElementsByTagName("div").item(0);
var _1034=_1032.getElementsByTagName("div").item(0);
var _1035=new List(_1033.getElementsByTagName("textarea"));
var _1036=new List(_1034.getElementsByTagName("textarea"));
var _1037=false;
if(_1035.getLength()!=_1036.getLength()){
_1037=true;
}else{
var index=0;
_1035.each(function(_1039,index){
var _103b=_1036.get(index);
var newid=_1039.getAttribute("placeholderid");
var oldid=_103b.getAttribute("placeholderid");
var _103e=_1039.getAttribute("placeholdername");
var _103f=_103b.getAttribute("placeholdername");
if(newid!=oldid||_103e!=_103f){
_1037=true;
}
return !_1037;
});
}
if(_1037){
var html=null;
if(_1033.innerHTML!=null){
html=_1033.innerHTML;
}else{
html=DOMSerializer.serialize(_1033);
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
var _1043=this.getDescendantBindingByLocalName("selector");
_1043.attach();
this._populateTemplateSelector();
var _1044=this.getContentWindow().bindingMap.templateselector;
_1044.addActionListener(SelectorBinding.ACTION_SELECTIONCHANGED,{handleAction:function(){
setTimeout(function(){
self._onTemplateSelectionChanged();
},0);
}});
this.getContentWindow().bindingMap.templatetoolbar.show();
VisualMultiTemplateEditorBinding.superclass._initialize.call(this);
};
VisualMultiTemplateEditorBinding.prototype._populateTemplateSelector=function(){
var _1045=this.getDescendantBindingByLocalName("selector");
var _1046=this.getContentWindow().bindingMap.templateselector;
_1045.selections.each(function(_1047){
_1047.imageProfile=new ImageProfile({image:"${icon:page-template-template}"});
});
_1046.populateFromList(_1045.selections);
};
VisualMultiTemplateEditorBinding.prototype._onTemplateSelectionChanged=function(){
var _1048=this.getDescendantBindingByLocalName("selector");
var _1049=this.getContentWindow().bindingMap.templateselector;
_1048.selectByValue(_1049.getValue());
_1048.dispatchAction(PageBinding.ACTION_DOPOSTBACK);
this.checkForDirty(true);
};
VisualMultiTemplateEditorBinding.prototype._parsePlaceHolders=function(_104a){
var nev=this._textareas;
var old=this._oldtextareas;
if(nev!=null){
nev.each(function(key,value){
old.set(key,value);
});
}
this._textareas=new Map();
function compute(_104f,_1050){
var _1051=_1050;
if(old.has(_104f)){
_1051=old.get(_104f).placeholdermarkup;
}
return _1051;
}
while(_104a.hasNext()){
var _1052=_104a.getNext();
var _1053=_1052.getAttribute("placeholderid");
this._textareas.set(_1053,{placeholderid:_1053,placeholdername:_1052.getAttribute("placeholdername"),placeholdermarkup:compute(_1053,_1052.value),textareaelement:_1052,isSelected:_1052.getAttribute("selected")=="true"});
}
var _1054=null;
var _1055=this.getContentWindow().bindingMap.templatetree;
var _1056=new Map();
this._textareas.each(function(name,_1058){
var _1059=_1055.add(TreeNodeBinding.newInstance(_1055.bindingDocument));
_1059.setLabel(_1058.placeholdername);
_1059.setImage("${icon:placeholder}");
_1059.setProperty("placeholder",true);
_1059.textareaname=name;
_1056.set(_1058.placeholdername,_1059);
if(_1058.isSelected){
_1054=_1059;
}
});
_1055.attachRecursive();
if(_1054!=null){
var _105a=true;
if(this._oldtextareas.hasEntries()){
_105a=false;
var map=new Map();
this._textareas.each(function(id,_105d){
map.set(_105d.placeholdername,true);
});
if(!map.has(this._placeholdername)){
_105a=true;
}
}
if(_105a){
var _105e=this._textareas.get(_1054.textareaname);
this._textareaname=_1054.textareaname;
this._placeholdername=_105e.placeholdername;
this._setContentFromPlaceHolder(_1054.textareaname);
_1054.focus();
}else{
var _105f=_1056.get(this._placeholdername);
this._textareaname=_105f.textareaname;
_105f.focus();
}
}
};
VisualMultiTemplateEditorBinding.prototype.updateElement=function(_1060,_1061){
var _1062=_1060.getElementsByTagName("ui:selector").item(0);
var _1063=_1061.getElementsByTagName("ui:selector").item(0);
var _1064=false;
if(_1062!=null&&_1063!=null){
var _1065=new List(_1062.getElementsByTagName("ui:selection"));
var _1066=new List(_1063.getElementsByTagName("ui:selection"));
if(_1065.getLength()!=_1066.getLength()){
_1064=true;
}else{
_1065.each(function(_1067,index){
var _1069=_1067.getAttribute("value");
var _106a=_1066.get(index).getAttribute("value");
if(_1069!=_106a){
_1064=true;
}
return !_1064;
});
}
}
if(_1064){
var div=this.bindingElement.getElementsByTagName("div").item(1);
this.bindingWindow.DocumentManager.detachBindings(div,true);
div.innerHTML=DOMSerializer.serialize(_1062);
this.bindingWindow.DocumentManager.attachBindings(div);
this._populateTemplateSelector();
}
return VisualMultiTemplateEditorBinding.superclass.updateElement.call(this,_1060,_1061);
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
BespinEditorPopupBinding.prototype.configure=function(_106c,frame,_106e){
this._editorBinding=_106c;
this._codePressFrame=frame;
this._codePressEngine=_106e;
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
var _1074=this.getProperty("validate");
if(_1074==true){
this._hasStrictValidation=true;
}
var _1075=this.getProperty("validator");
if(_1075!=null){
this._validator=_1075;
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
BespinEditorBinding.prototype.handleBroadcast=function(_1076,arg){
BespinEditorBinding.superclass.handleBroadcast.call(this,_1076,arg);
switch(_1076){
case BroadcastMessages.BESPIN_LOADED:
var _1078=this.getContentWindow().bindingMap.bespinwindow;
if(_1078!=null){
var _1079=_1078.getContentWindow();
if(arg.broadcastWindow==_1079){
this._bespinWindow=_1079;
this._bespinEnvelope=arg.bespinEnvelope;
this._bespinEditor=arg.bespinEditor;
this._bespinElement=this._bespinEditor.textView.domNode;
this._bespinEditor.syntax=this.syntax;
this._bespinEnvelope.settings.set("theme","white");
this._bespinEnvelope.settings.set("fontface","monospace");
this._bespinEnvelope.settings.set("fontsize",13);
this._bespinEnvelope.settings.set("tabstop",4);
this.initializeEditorComponents(_1078);
this._bespinElement.addEventListener(DOMEvents.MOUSEDOWN,this,false);
var self=this;
this._bespinEditor.textChanged.add(function(_107b,_107c,_107d){
self.checkForDirty();
});
if(this._pageBinding!=null){
this._initialize();
}
this.unsubscribe(_1076);
}
}
break;
}
};
BespinEditorBinding.prototype._onPageInitialize=function(_107e){
BespinEditorBinding.superclass._onPageInitialize.call(this,_107e);
if(Client.isExplorer||this._bespinEditor!=null){
this._initialize();
}
};
BespinEditorBinding.prototype._activateEditor=function(_107f){
if(_107f!=this._isActivated){
this._isActivated=_107f;
EditorBinding.isActive=_107f;
var _1080=this.getContentWindow().standardEventHandler;
if(_107f){
_1080.enableNativeKeys(true);
}else{
_1080.disableNativeKeys();
}
var _1081=this.getContentWindow().bindingMap.broadcasterIsActive;
if(_1081!=null){
if(_107f){
_1081.enable();
}else{
_1081.disable();
}
}
if(_107f){
this.focus();
var _1082=this._bespinEditor;
}else{
this.blur();
}
}
};
BespinEditorBinding.prototype.handleCommand=function(cmd,gui,val){
var _1086=BespinEditorBinding.superclass.handleCommand.call(this,cmd,val);
return _1086;
};
BespinEditorBinding.prototype._finalize=function(){
this.setContent(this._startContent);
BespinEditorBinding.superclass._finalize.call(this);
};
BespinEditorBinding.prototype.initializeEditorComponent=function(_1087){
_1087.initializeSourceEditorComponent(this,this._bespinEditor);
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
BespinEditorBinding.prototype.setContent=function(_1089){
if(!this._isFinalized){
if(_1089!=this._startContent){
this._startContent=_1089;
}
}
if(this.isInitialized&&this.getContentWindow().bindingMap!=null){
this.getContentWindow().bindingMap.editorpage.setContent(_1089);
this.resetUndoRedo();
this._checksum=this.getCheckSum();
}
return true;
};
BespinEditorBinding.prototype.getContent=function(){
var _108a=this.getContentWindow().bindingMap.editorpage.getContent();
return _108a?_108a:"";
};
BespinEditorBinding.prototype.resetUndoRedo=function(){
};
BespinEditorBinding.prototype.cover=function(_108b){
if(this._pageBinding!=null){
this._pageBinding.cover(_108b);
}
};
BespinEditorBinding.prototype.updateElement=function(_108c){
if(_108c!=null&&this.shadowTree.dotnetinput!=null){
var value=_108c.getAttribute("value");
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
var _108e=true;
var _108f=this.getContent();
if(this._validator!=null){
_108e=Validator.validateInformed(_108f,this._validator);
}else{
switch(this.syntax){
case BespinEditorBinding.syntax.XML:
case BespinEditorBinding.syntax.XSL:
case BespinEditorBinding.syntax.HTML:
_108e=XMLParser.isWellFormedDocument(_108f,true);
if(_108e==true&&this._hasStrictValidation){
switch(this.syntax){
case BespinEditorBinding.syntax.HTML:
_108e=this._isValidHTML(_108f);
break;
}
}
break;
}
}
return _108e;
};
BespinEditorBinding.prototype._isValidHTML=function(xml){
var _1091=true;
var doc=XMLParser.parse(xml);
var _1093=new List();
if(doc!=null){
var root=doc.documentElement;
if(root.nodeName!="html"){
_1093.add("MissingHtml");
}
if(root.namespaceURI!=Constants.NS_XHTML){
_1093.add("NamespaceURI");
}
var head=null,body=null;
var _1097=new List(root.childNodes);
while(_1097.hasNext()){
var child=_1097.getNext();
if(child.nodeType==Node.ELEMENT_NODE){
switch(child.nodeName){
case "head":
if(head!=null){
_1093.add("MultipleHead");
}
if(body!=null){
_1093.add("HeadBodyIndex");
}
head=child;
break;
case "body":
if(body!=null){
_1093.add("MultipleBody");
}
body=child;
break;
}
}
}
if(head==null){
_1093.add("MissingHead");
}
if(body==null){
_1093.add("MissingBody");
}
}
if(_1093.hasEntries()){
_1091=false;
Dialog.error(StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML.DialogTitle"),StringBundle.getString("Composite.Web.SourceEditor","Invalid.HTML."+_1093.getFirst()));
}
return _1091;
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
var _1099=null;
var page=this._pageBinding;
if(page!=null){
_1099=page.getCheckSum();
}
return _1099;
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
ThrobberBinding.prototype.handleBroadcast=function(_109b,arg){
ThrobberBinding.superclass.handleBroadcast.call(this,_109b,arg);
switch(_109b){
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
ProgressBarBinding.notch=function(_109e){
var bar=ProgressBarBinding._bindingInstance;
if(bar!=null){
bar.notch(_109e);
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
ProgressBarBinding.prototype.notch=function(_10a0){
_10a0=_10a0?_10a0:1;
var width=this._cover.getWidth()-(ProgressBarBinding.NOTCH*_10a0);
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
StartMenuItemBinding.prototype.handleBroadcast=function(_10a2,arg){
StartMenuItemBinding.superclass.handleBroadcast.call(this,_10a2,arg);
switch(_10a2){
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
StartMenuItemBinding.prototype.setChecked=function(_10a4,_10a5){
StartMenuItemBinding.superclass.setChecked.call(this,_10a4,_10a5);
if(!_10a5){
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
KeySetBinding.registerKeyEventHandler=function(doc,key,_10a8,_10a9){
var _10aa=KeySetBinding.keyEventHandlers;
if(Interfaces.isImplemented(IKeyEventHandler,_10a9,true)==true){
if(_10a8!="*"){
_10a8=KeySetBinding._sanitizeKeyModifiers(_10a8);
}
var code=window.KeyEventCodes[key];
if(!code){
code=key.charCodeAt(0);
}
if(!_10aa[doc]){
_10aa[doc]={};
}
if(!_10aa[doc][code]){
_10aa[doc][code]={};
}
_10aa[doc][code][_10a8]=_10a9;
}
};
KeySetBinding.handleKey=function(doc,e){
var _10ae=false;
var code=e.keyCode;
var _10b0=KeySetBinding.keyEventHandlers;
if(_10b0[doc]&&_10b0[doc][code]){
var _10b1="[default]";
_10b1+=code!=KeyEventCodes.VK_SHIFT?e.shiftKey?" shift":"":"";
_10b1+=code!=KeyEventCodes.VK_CONTROL?e.ctrlKey?" control":"":"";
var _10b2=_10b0[doc][code][_10b1];
if(_10b2==null){
_10b2=_10b0[doc][code]["*"];
}
if(_10b2!=null){
_10b2.handleKeyEvent(e);
_10ae=true;
}
}
return _10ae;
};
KeySetBinding._sanitizeKeyModifiers=function(_10b3){
var _10b4="[default]";
var mods={};
if(_10b3){
new List(_10b3.split(" ")).each(function(_10b6){
mods[_10b6]=true;
});
function check(_10b7){
if(mods[_10b7]){
_10b4+=" "+_10b7;
}
}
check("shift");
check("control");
}
return _10b4;
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
var _10bb=key.getAttribute("oncommand");
var _10bc=key.getAttribute("preventdefault")=="true";
KeySetBinding.registerKeyEventHandler(self.bindingDocument,key.getAttribute("key"),key.getAttribute("modifiers"),{handleKeyEvent:function(e){
DOMEvents.stopPropagation(e);
if(_10bc){
DOMEvents.preventDefault(e);
}
var _10be=self.bindingWindow.WindowManager;
top.setTimeout(function(){
Binding.evaluate(_10bb,self);
},0);
}});
});
};
CursorBinding.prototype=new Binding;
CursorBinding.prototype.constructor=CursorBinding;
CursorBinding.superclass=Binding.prototype;
CursorBinding.fadeIn=function(_10bf){
if(_10bf instanceof CursorBinding){
_10bf.setOpacity(0);
_10bf.show();
new Animation({modifier:Client.isExplorer?18:9,onstep:function(_10c0){
_10bf.setOpacity(Math.sin(_10c0*Math.PI/180));
},onstop:function(){
_10bf.setOpacity(1);
}}).play();
}
};
CursorBinding.fadeOut=function(_10c1){
if(_10c1 instanceof CursorBinding){
new Animation({modifier:Client.isExplorer?18:9,onstep:function(_10c2){
_10c1.setOpacity(Math.cos(_10c2*Math.PI/180));
},onstop:function(){
_10c1.hide();
}}).play();
}
};
CursorBinding.moveOut=function(_10c3,_10c4,_10c5){
if(_10c3 instanceof CursorBinding){
_10c5.x-=16;
_10c5.y-=16;
new Animation({modifier:3,onstep:function(_10c6){
var tal=Math.sin(_10c6*Math.PI/180);
_10c3.setPosition(new Point(((1-tal)*_10c4.x)+((0+tal)*_10c5.x),((1-tal)*_10c4.y)+((0+tal)*_10c5.y)));
},onstop:function(){
CursorBinding.fadeOut(_10c3);
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
CursorBinding.prototype.setOpacity=function(_10cc){
if(Client.isMozilla){
this.bindingElement.style.MozOpacity=new String(_10cc);
}else{
this.bindingElement.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+new String(_10cc*100)+")";
}
this._opacity=_10cc;
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
function setOpacity(_10cf){
if(Client.isMozilla){
cover.bindingElement.style.opacity=new String(_10cf);
}else{
cover.bindingElement.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+new String(_10cf*100)+")";
}
}
if(cover instanceof CoverBinding){
new Animation({modifier:Client.isExplorer?30:18,onstep:function(_10d0){
if(Binding.exists(cover)){
setOpacity(Math.cos(_10d0*Math.PI/180));
}
},onstop:function(){
if(Binding.exists(cover)){
cover.hide();
}
}}).play();
}
};
CoverBinding.fadeIn=function(cover){
function setOpacity(_10d2){
if(Client.isMozilla){
cover.bindingElement.style.MozOpacity=new String(_10d2);
}else{
cover.bindingElement.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+new String(_10d2*100)+")";
}
}
if(cover instanceof CoverBinding){
new Animation({modifier:Client.isExplorer?30:18,onstart:function(){
if(Binding.exists(cover)){
setOpacity(0);
cover.show();
}
},onstep:function(_10d3){
if(Binding.exists(cover)){
setOpacity(Math.sin(_10d3*Math.PI/180));
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
CoverBinding.prototype.setBusy=function(_10d5){
if(_10d5!=this._isBusy){
if(_10d5){
this.bindingElement.style.cursor="wait";
}else{
this.bindingElement.style.cursor="default";
}
this._isBusy=_10d5;
}
};
CoverBinding.prototype.setTransparent=function(_10d6){
if(_10d6!=this._isTransparent){
if(_10d6){
this.attachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}else{
this.detachClassName(CoverBinding.CLASSNAME_TRANSPARENT);
}
this._isTransparent=_10d6;
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
CoverBinding.prototype.setHeight=function(_10d8){
if(_10d8>=0){
this.bindingElement.style.height=new String(_10d8+"px");
}
};
CoverBinding.prototype.getHeight=function(){
return this.bindingElement.offsetHeight;
};
CoverBinding.newInstance=function(_10d9){
var _10da=DOMUtil.createElementNS(Constants.NS_UI,"ui:cover",_10d9);
return UserInterface.registerBinding(_10da,CoverBinding);
};
UncoverBinding.prototype=new Binding;
UncoverBinding.prototype.constructor=UncoverBinding;
UncoverBinding.superclass=Binding.prototype;
UncoverBinding._bindingInstance=null;
UncoverBinding.uncover=function(pos){
var _10dc=UncoverBinding._bindingInstance;
if(Binding.exists(_10dc)){
_10dc.setPosition(pos);
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
TheatreBinding.prototype.play=function(_10e0){
this._isFading=_10e0==true;
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
var _10e1=this._canvas.getContext("2d");
var alpha=parseInt(0);
TheatreBinding._interval=top.setInterval(function(){
if(alpha<0.5){
_10e1.fillStyle="rgba(0,0,0,"+new String(alpha)+")";
_10e1.clearRect(0,0,300,150);
_10e1.fillRect(0,0,300,150);
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
var _10e3=this._canvas.getContext("2d");
_10e3.clearRect(0,0,300,150);
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
var _10e4=SourceCodeViewerBinding.stylesheets[this._syntax];
this._transformer=new XSLTransformer();
this._transformer.importStylesheet(_10e4);
break;
default:
throw "SourceCodeViewer: Syntax error!";
this._syntax=null;
break;
}
var _10e5=DOMUtil.getElementsByTagName(this.bindingElement,"textarea").item(0);
if(_10e5){
this._startcontent=_10e5.value;
}
this.setURL(SourceCodeViewerBinding.URL_DEFAULT);
this.addActionListener(WindowBinding.ACTION_ONLOAD);
SourceCodeViewerBinding.superclass.onBindingAttach.call(this);
};
SourceCodeViewerBinding.prototype.handleAction=function(_10e6){
SourceCodeViewerBinding.superclass.handleAction.call(this,_10e6);
switch(_10e6.type){
case WindowBinding.ACTION_ONLOAD:
if(_10e6.target==this){
if(this._startcontent){
this.view(this._startcontent);
}
this.dispatchAction(SourceCodeViewerBinding.ACTION_INITIALIZED);
_10e6.consume();
}
break;
}
SourceCodeViewerBinding.superclass.handleAction.call(this,_10e6);
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
var _10ea=this._transformer.transformToString(doc);
this._inject(_10ea);
}
};
SourceCodeViewerBinding.prototype._viewHTML=function(arg){
};
SourceCodeViewerBinding.prototype._viewJavascript=function(arg){
};
SourceCodeViewerBinding.prototype._inject=function(_10ed){
this.getContentDocument().body.innerHTML=_10ed;
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
var _10f5=list.getNext();
var id=_10f5.getAttribute("id");
map[id]={};
var atts=this._resolver.resolveAll("p:att",_10f5);
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
var _10ff=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"persist",doc);
_10ff.setAttribute("id",id);
for(var name in map[id]){
var att=DOMUtil.createElementNS(Constants.NS_PERSISTANCE,"att",doc);
att.setAttribute("name",name);
att.setAttribute("value",map[id][name]);
_10ff.appendChild(att);
}
elm.appendChild(_10ff);
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
var _1109=window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance;
if(_1109){
doc=XMLParser.parse(_1109);
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
var _110d=DOMSerializer.serialize(doc,true);
window.globalStorage[PersistanceBinding.GLOBALSTOREKEY].persistance=_110d;
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
LocalizationSelectorBinding.prototype.handleBroadcast=function(_110e,arg){
LocalizationSelectorBinding.superclass.handleBroadcast.call(this,_110e,arg);
switch(_110e){
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
var _1111=new List();
list.each(function(lang){
_1111.add(new SelectorBindingSelection(lang.Name,lang.SerializedActionToken,lang.IsCurrent,null));
});
this.populateFromList(_1111);
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
Dialog.warning(StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogTitle"),StringBundle.getString(StringBundle.UI,"UserElementProvider.ChangeOtherActiveLocaleDialogText"),Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_1115){
switch(_1115){
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
var _1118=new SystemAction({Label:"Generated Action: Change Locale",ActionToken:token});
SystemAction.invoke(_1118,root);
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
var _1119=this.getProperty("status");
if(_1119!=null){
switch(_1119){
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
UserInterfaceMapping.prototype.merge=function(_111c){
for(var _111d in _111c.map){
this.map[_111d]=_111c.getBindingImplementation(_111d);
}
};
UserInterfaceMapping.prototype.getBindingImplementation=function(_111e){
var _111f=null;
var name=_111e.nodeName;
if(Client.isExplorer){
var small=name.toLowerCase();
if(name==small){
name="ui:"+name;
}else{
name=small;
}
}
if(this.map[name]){
_111f=this.map[name];
}
return _111f;
};
var UserInterface=new function(){
var _1122=(Client.isMozilla?MozEditorTextBoxBinding:IEEditorTextBoxBinding);
var _1123=new UserInterfaceMapping({"body":RootBinding,"ui:binding":Binding,"ui:box":Binding,"ui:dialog":DialogBinding,"ui:dialoghead":DialogHeadBinding,"ui:dialogbody":DialogBodyBinding,"ui:dialogmatrix":DialogMatrixBinding,"ui:dialogset":DialogSetBinding,"ui:dialogborder":DialogBorderBinding,"ui:dialogcover":DialogCoverBinding,"ui:titlebar":DialogTitleBarBinding,"ui:titlebarbody":DialogTitleBarBodyBinding,"ui:window":WindowBinding,"ui:controlgroup":ControlGroupBinding,"ui:control":ControlBinding,"ui:menubar":MenuBarBinding,"ui:menu":MenuBinding,"ui:menubody":MenuBodyBinding,"ui:menugroup":MenuGroupBinding,"ui:menuitem":MenuItemBinding,"ui:menupopup":MenuPopupBinding,"ui:tabbox":TabBoxBinding,"ui:tabs":TabsBinding,"ui:tab":TabBinding,"ui:tabpanels":TabPanelsBinding,"ui:tabpanel":TabPanelBinding,"ui:splitbox":SplitBoxBinding,"ui:splitpanel":SplitPanelBinding,"ui:splitter":SplitterBinding,"ui:decks":DecksBinding,"ui:deck":DeckBinding,"ui:toolbar":ToolBarBinding,"ui:toolbargroup":ToolBarGroupBinding,"ui:toolbarbody":ToolBarBodyBinding,"ui:toolbarbutton":ToolBarButtonBinding,"ui:toolbarlabel":ToolBarLabelBinding,"ui:labelbox":LabelBinding,"ui:text":TextBinding,"ui:clickbutton":ClickButtonBinding,"ui:tree":TreeBinding,"ui:treebody":TreeBodyBinding,"ui:treenode":TreeNodeBinding,"ui:flexbox":FlexBoxBinding,"ui:scrollbox":ScrollBoxBinding,"ui:popupset":PopupSetBinding,"ui:popup":PopupBinding,"ui:shadow":ShadowBinding,"ui:matrix":MatrixBinding,"ui:sourceeditor":BespinEditorBinding,"ui:visualeditor":VisualEditorBinding,"ui:visualmultieditor":VisualMultiEditorBinding,"ui:visualmultitemplateeditor":VisualMultiTemplateEditorBinding,"ui:wysiwygeditortoolbarbutton":EditorToolBarButtonBinding,"ui:dock":DockBinding,"ui:docktabs":DockTabsBinding,"ui:docktab":DockTabBinding,"ui:dockpanels":DockPanelsBinding,"ui:dockpanel":DockPanelBinding,"ui:page":PageBinding,"ui:editorpage":EditorPageBinding,"ui:dialogpage":DialogPageBinding,"ui:pagebody":DialogPageBodyBinding,"ui:wizardpage":WizardPageBinding,"ui:explorer":ExplorerBinding,"ui:explorerdecks":ExplorerDecksBinding,"ui:explorerdeck":ExplorerDeckBinding,"ui:explorersplitter":ExplorerSplitterBinding,"ui:explorermenu":ExplorerMenuBinding,"ui:explorertoolbar":ExplorerToolBarBinding,"ui:explorertoolbarbutton":ExplorerToolBarButtonBinding,"ui:stagecontainer":StageContainerBinding,"ui:stage":StageBinding,"ui:stagedecks":StageDecksBinding,"ui:stagedeck":StageDeckBinding,"ui:viewset":ViewSetBinding,"ui:view":ViewBinding,"ui:broadcasterset":BroadcasterSetBinding,"ui:broadcaster":BroadcasterBinding,"ui:fields":FieldsBinding,"ui:fieldgroup":FieldGroupBinding,"ui:field":FieldBinding,"ui:fielddesc":FieldDescBinding,"ui:fielddata":FieldDataBinding,"ui:fieldhelp":FieldHelpBinding,"ui:datainput":DataInputBinding,"ui:selector":SelectorBinding,"ui:simpleselector":SimpleSelectorBinding,"ui:multiselector":MultiSelectorBinding,"ui:datainputselector":DataInputSelectorBinding,"ui:datainputdialog":DataInputDialogBinding,"ui:textbox":TextBoxBinding,"ui:editortextbox":_1122,"ui:radiodatagroup":RadioDataGroupBinding,"ui:radio":RadioDataBinding,"ui:checkbutton":CheckButtonBinding,"ui:checkbox":CheckBoxBinding,"ui:checkboxgroup":CheckBoxGroupBinding,"ui:datadialog":DataDialogBinding,"ui:postbackdialog":PostBackDataDialogBinding,"ui:nullpostbackdialog":NullPostBackDataDialogBinding,"ui:htmldatadialog":HTMLDataDialogBinding,"ui:functioneditor":FunctionEditorDataBinding,"ui:parametereditor":ParameterEditorDataBinding,"ui:keyset":KeySetBinding,"ui:cover":CoverBinding,"ui:uncover":UncoverBinding,"ui:cursor":CursorBinding,"ui:dialogtoolbar":DialogToolBarBinding,"ui:focus":FocusBinding,"ui:balloonset":BalloonSetBinding,"ui:balloon":BalloonBinding,"ui:error":ErrorBinding,"ui:throbber":ThrobberBinding,"ui:progressbar":ProgressBarBinding,"ui:lazybinding":LazyBindingBinding,"ui:sourcecodeviewer":SourceCodeViewerBinding,"ui:theatre":TheatreBinding,"ui:persistance":PersistanceBinding,"ui:filepicker":FilePickerBinding,"ui:request":RequestBinding,"ui:response":ResponseBinding});
var _1124=SystemLogger.getLogger("UserInterface");
var keys={};
this.registerBinding=function(_1126,impl){
var _1128=null;
if(!this.hasBinding(_1126)){
var _1129=DOMUtil.getParentWindow(_1126);
if(DOMUtil.getLocalName(_1126)!="bindingmapping"){
if(!impl&&_1126.getAttribute("binding")!=null){
var _112a=_1126.getAttribute("binding");
impl=_1129[_112a];
if(impl==null){
throw "No such binding in scope: "+_112a;
}
}
if(!impl){
var _112b=_1129.DocumentManager;
if(_112b){
var _112c=_112b.customUserInterfaceMapping;
if(_112c){
impl=_112c.getBindingImplementation(_1126);
}
}
}
if(!impl){
impl=_1123.getBindingImplementation(_1126);
}
if(impl!=null&&!Application.isMalFunctional){
try{
_1128=new impl();
}
catch(exception){
Application.isMalFunctional=true;
alert("No such binding!\n"+exception.message+(exception.stack?"\n"+exception.stack:""));
throw (exception);
}
}
if(_1128){
var key=KeyMaster.getUniqueKey();
_1126.setAttribute("key",key);
_1128.key=key;
if(!_1126.id){
_1126.id=key;
}
keys[key]={element:_1126,binding:_1128};
_1128.onBindingRegister();
}
}
}
return _1128;
};
this.unRegisterBinding=function(_112e){
terminate(_112e);
};
function terminate(_112f){
if(Binding.exists(_112f)==true){
var key=_112f.key;
Binding.destroy(_112f);
if(key){
if(keys[key]){
keys[key].binding=null;
keys[key].element=null;
delete keys[key];
_112f=null;
}else{
_1124.error("URGH: "+key);
}
}
}
}
this.getElement=function(_1131){
var _1132=null;
if(keys[_1131.key]){
_1132=keys[_1131.key].element;
}
return _1132;
};
this.getBinding=function(_1133){
var _1134=null;
if(_1133&&_1133.nodeType==Node.ELEMENT_NODE){
try{
var key=_1133.getAttribute("key");
if(key&&keys[key]){
_1134=keys[key].binding;
}
}
catch(exception){
alert("getBinding exception occured on element:\n\n\t\t"+_1133);
if(exception.stack){
alert(exception.stack);
}
}
}
return _1134;
};
this.getBindingByKey=function(key){
var _1137=null;
if(keys[key]){
_1137=keys[key].binding;
}
return _1137;
};
this.hasBinding=function(_1138){
return this.getBinding(_1138)!=null;
};
this.isBindingVisible=function(_1139){
var _113a=Application.isOperational;
if(_113a==true){
var _113b=new Crawler();
_113b.type=NodeCrawler.TYPE_ASCENDING;
_113b.id="visibilitycrawler";
_113b.addFilter(function(_113c){
var b=UserInterface.getBinding(_113c);
var res=0;
if(!b.isVisible){
_113a=false;
res=NodeCrawler.STOP_CRAWLING;
}
return res;
});
_113b.crawl(_1139.bindingElement);
_113b.dispose();
}
return _113a;
};
var _113f=null;
this.getBindingCount=function(){
var count=0;
for(var key in keys){
count++;
}
return count;
};
this.setPoint=function(){
_113f={};
for(var key in keys){
_113f[key]=true;
}
};
this.getPoint=function(){
var _1143=null;
if(_113f){
_1143=new List();
for(var key in keys){
if(!_113f[key]){
_1143.add(key);
}
}
}
return _1143;
};
this.clearPoint=function(){
_113f=null;
};
this.trackUndisposedBindings=function(){
var _1145=null;
for(var key in keys){
var entry=keys[key];
if(!entry.binding||!entry.element||!Binding.exists(entry.binding)){
if(!_1145){
_1145="Bindings illdisposed: ";
}
_1145+=entry.binding+" ";
}
}
if(_1145!=null){
_1124.error(_1145);
}
};
this.autoTrackDisposedBindings=function(_1148){
if(_1148){
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
SOAPRequest.newInstance=function(_1149,_114a){
var _114b=_1149+"/"+_114a;
var _114c=new SOAPRequest(_114b);
var _114d=SOAPRequest.resolver;
_114c.document=Templates.getTemplateDocument("soapenvelope.xml");
_114c.envelope=_114d.resolve("soap:Envelope",_114c.document);
_114c.header=_114d.resolve("soap:Header",_114c.envelope);
_114c.body=_114d.resolve("soap:Body",_114c.envelope);
return _114c;
};
SOAPRequest._parseResponse=function(_114e){
var _114f=null;
var _1150=false;
var doc=_114e.responseXML;
if(doc!=null&&doc.documentElement!=null){
switch(doc.documentElement.namespaceURI){
case Constants.NS_ENVELOPE:
_114f=SOAPRequestResponse.newInstance(_114e.responseXML);
if(Application.isOffLine){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_ONLINE);
}
break;
case Constants.NS_XHTML:
if(!Application.isOffLine){
var body=SOAPRequest.resolver.resolve("xhtml:html/xhtml:body",_114e.responseXML);
if(body&&body.getAttribute("id")=="offline"){
_1150=true;
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
var text=_114e.responseText;
if(text.indexOf("id=\"offline\"")>-1){
_1150=true;
}else{
var cry="Invalid SOAP response: \n\n"+_114e.responseText;
SystemLogger.getLogger("SOAPRequest._parseResponse (static)").error(cry);
if(Application.isDeveloperMode){
alert("Invalid SOAP response");
window.open("about:blank").document.write(_114e.responseText);
}
}
}
}
if(_1150==true){
EventBroadcaster.broadcast(BroadcastMessages.SERVER_OFFLINE);
}
return _114f;
};
function SOAPRequest(_1155){
this.logger=SystemLogger.getLogger("SOAPRequest");
this.action=_1155;
return this;
}
SOAPRequest.prototype.invoke=function(url){
var _1157=DOMUtil.getXMLHTTPRequest();
var _1158=null;
_1157.open("post",url,false);
_1157.setRequestHeader("Content-Type","text/xml; charset=UTF-8");
_1157.setRequestHeader("SOAPAction",this.action);
try{
_1157.send(this.document);
_1158=SOAPRequest._parseResponse(_1157);
}
catch(exception){
var error="Dysfuntion in SOAP invoke: "+url;
if(this.document!=null){
error+="\n"+DOMSerializer.serialize(this.document,true);
}
this.logger.error(error);
throw exception;
}
_1157=null;
return _1158;
};
SOAPRequest.prototype.dispose=function(){
for(var _115a in this){
this[_115a]=null;
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
var _115c=null;
if(doc&&doc.documentElement){
_115c=new SOAPRequestResponse();
var _115d=SOAPRequestResponse.resolver;
_115c.document=doc;
_115c.envelope=_115d.resolve("soap:Envelope",_115c.document);
_115c.header=_115d.resolve("soap:Header",_115c.envelope);
_115c.body=_115d.resolve("soap:Body",_115c.envelope);
var fault=_115d.resolve("soap:Fault",_115c.body);
if(fault){
SOAPRequestResponse.logger.fatal(DOMSerializer.serialize(fault,true));
_115c.fault={element:fault,faultNamespaceURI:fault.namespaceURI,faultCode:DOMUtil.getTextContent(_115d.resolve("faultcode",fault)),faultString:DOMUtil.getTextContent(_115d.resolve("faultstring",fault)),detail:fault.getElementsByTagName("detail").item(0)};
}
}
return _115c;
};
function SOAPFault(_115f,_1160,_1161){
this._operationName=_115f;
this._operationAddress=_1160;
this._faultString=_1161;
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
SOAPFault.newInstance=function(_1162,fault){
return new SOAPFault(_1162.name,_1162.address,fault.faultString);
};
function SOAPEncoder(wsdl,_1165){
this.logger=SystemLogger.getLogger("SOAPEncoder");
this._wsdl=wsdl;
this._operation=_1165;
this._namespace=wsdl.getTargetNamespace();
}
SOAPEncoder.prototype.encode=function(args){
var _1167=SOAPRequest.newInstance(this._namespace,this._operation);
var root=this._appendElement(_1167.body,this._operation);
var _1169=this._wsdl.getSchema();
var _116a=_1169.lookup(this._operation);
var _116b=_116a.getListedDefinitions();
while(_116b.hasNext()){
var def=_116b.getNext();
var elm=this._appendElement(root,def.name);
var val=args.getNext();
this._resolve(elm,def,val);
}
return _1167;
};
SOAPEncoder.prototype._resolve=function(_116f,_1170,value){
var _1172=this._wsdl.getSchema();
if(_1170.isSimpleValue){
this._appendText(_116f,value,_1170.type=="string");
}else{
var _1173=_1172.lookup(_1170.type);
if(_1173 instanceof SchemaSimpleType){
alert("SOAPEncoder: SchemaSimpleType support not implemented!");
}else{
var defs=_1173.getListedDefinitions();
if(_1173.isArray){
var _1175=new List(value);
var def=defs.getNext();
while(_1175.hasNext()){
var elm=this._appendElement(_116f,def.name);
var val=_1175.getNext();
this._resolve(elm,def,val);
}
}else{
while(defs.hasNext()){
try{
var def=defs.getNext();
var elm=this._appendElement(_116f,def.name);
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
SOAPEncoder.prototype._appendText=function(_117c,value,_117e){
if(value!=null){
value=new String(value);
var safe=new String("");
var chars=value.split("");
var _1181=false;
var i=0,c;
while(c=chars[i++]){
var _1184=true;
var code=c.charCodeAt(0);
switch(code){
case 9:
case 10:
case 13:
_1184=false;
break;
default:
if((code>=32&&code<=55295)||(code>=57344&&code<=65533)||(code>=65536&&code<=1114111)){
_1184=false;
}
break;
}
if(!_1184){
safe+=c;
}else{
_1181=true;
}
}
if(_1181){
this.logger.debug("Illegal XML character(s) was deleted from the string: "+value);
}
_117c.appendChild(_117c.ownerDocument.createTextNode(safe));
}
};
function SOAPDecoder(wsdl,_1187){
this._wsdl=wsdl;
this._operation=_1187;
this._resolver=new XPathResolver();
this._resolver.setNamespacePrefixResolver({"result":wsdl.getTargetNamespace()});
}
SOAPDecoder.prototype.resolve=function(xpath,node){
return this._resolver.resolve("result:"+xpath,node);
};
SOAPDecoder.prototype.resolveAll=function(xpath,node){
return this._resolver.resolveAll("result:"+xpath,node);
};
SOAPDecoder.prototype.decode=function(_118c){
var _118d=null;
var _118e=this._wsdl.getSchema();
var id=this._operation+"Response";
var _1190=this.resolve(id,_118c.body);
var _1191=_118e.lookup(id);
var _1192=_1191.getListedDefinitions();
while(!_118d&&_1192.hasNext()){
var def=_1192.getNext();
var elm=this.resolve(def.name,_1190);
if(def.type==SchemaDefinition.TYPE_XML_DOCUMENT){
_118d=DOMUtil.getDOMDocument();
var e=elm.getElementsByTagName("*").item(0);
if(typeof _118d.importNode!=Types.UNDEFINED){
_118d.appendChild(_118d.importNode(e,true));
}else{
_118d.loadXML(DOMSerializer.serialize(e));
}
}else{
_118d=this._compute(elm,def);
}
}
return _118d;
};
SOAPDecoder.prototype._compute=function(_1196,_1197){
var _1198=null;
var _1199=this._wsdl.getSchema();
if(_1197.isSimpleValue){
_1198=this._getSimpleValue(_1196,_1197.type);
}else{
var _119a=_1199.lookup(_1197.type);
if(_119a instanceof SchemaSimpleType){
_1198=this._getSimpleValue(_1196,_119a.restrictionType);
}else{
var defs=_119a.getListedDefinitions();
if(_119a.isArray){
_1198=[];
var def=defs.getNext();
var elms=this.resolveAll(def.type,_1196);
while(elms.hasNext()){
var elm=elms.getNext();
_1198.push(this._compute(elm,def));
}
}else{
_1198={};
defs.reset();
while(defs.hasNext()){
var def=defs.getNext();
var elm=this.resolve(def.name,_1196);
if(elm){
_1198[def.name]=this._compute(elm,def);
}else{
if(def.isRequired){
throw new Error("SOAPDecoder: invalid SOAP response.");
}
}
}
}
}
}
return _1198;
};
SOAPDecoder.prototype._getSimpleValue=function(_119f,type){
var _11a1=null;
if(_119f.firstChild&&_119f.firstChild.nodeType==Node.TEXT_NODE){
if(Client.isMozilla&&_119f.childNodes.length>1){
_119f.normalize();
}
_11a1=_119f.firstChild.data;
switch(type){
case Schema.types.STRING:
_11a1=_11a1;
break;
case Schema.types.INT:
case Schema.types.FLOAT:
case Schema.types.DOUBLE:
_11a1=Number(_11a1);
break;
case Schema.types.BOOLEAN:
_11a1=_11a1=="true";
break;
default:
throw ("SOAPDecoder: schema type \""+type+"\" not handled.");
break;
}
}
return _11a1;
};
Schema.prototype=new XPathResolver;
Schema.prototype.constructor=Schema;
Schema.superclass=XPathResolver.prototype;
Schema.types={STRING:"string",INT:"int",FLOAT:"float",DOUBLE:"double",BOOLEAN:"boolean"};
Schema.notSupportedException=new Error("Schema: Schema structure not supported!");
function Schema(_11a2){
this.logger=SystemLogger.getLogger("Schema");
this._map=this._parseSchema(_11a2);
}
Schema.prototype._parseSchema=function(_11a3){
this.setNamespacePrefixResolver({"wsdl":Constants.NS_WSDL,"soap":Constants.NS_SOAP,"s":Constants.NS_SCHEMA});
var _11a4={};
var entry=null;
var rules=this.resolveAll("s:*[@name]",_11a3);
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
_11a4[rule.getAttribute("name")]=entry;
}
return _11a4;
};
Schema.prototype.lookup=function(name){
return this._map[name];
};
SchemaDefinition.TYPE_XML_DOCUMENT="xmldocument";
function SchemaDefinition(_11a9){
this.logger=SystemLogger.getLogger("SchemaDefinition");
this.isRequired=null;
this.type=null;
this._parse(_11a9);
}
SchemaDefinition.prototype._parse=function(_11aa){
var min=_11aa.getAttribute("minOccurs");
var max=_11aa.getAttribute("maxOccurs");
var type=_11aa.getAttribute("type");
this.name=_11aa.getAttribute("name");
this.isRequired=min!="0";
if(type){
var split=type.split(":");
var sort=split[0];
var _11b0=split[1];
this.isSimpleValue=sort!="tns";
this.type=_11b0;
}else{
var elm=_11aa.getElementsByTagName("*").item(0);
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
function SchemaElementType(_11b2,_11b3){
this.logger=SystemLogger.getLogger("SchemaElementType");
this._definitions=new List();
this._parseListedDefinitions(_11b2,_11b3);
}
SchemaElementType.prototype._parseListedDefinitions=function(_11b4,_11b5){
var els=_11b4.resolveAll("s:complexType/s:sequence/s:element",_11b5);
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
function SchemaComplexType(_11b7,_11b8){
this._definitions=new List();
this._parseListedDefinitions(_11b7,_11b8);
this.isArray=_11b8.getAttribute("name").indexOf("ArrayOf")>-1;
}
SchemaComplexType.prototype._parseListedDefinitions=function(_11b9,_11ba){
var els=_11b9.resolveAll("s:sequence/s:element",_11ba);
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
function SchemaSimpleType(_11bd,_11be){
this.restrictionType=null;
this._parse(_11bd,_11be);
}
SchemaSimpleType.prototype._parse=function(_11bf,_11c0){
var _11c1=_11bf.resolve("s:restriction",_11c0);
if(_11c1){
this.restrictionType=_11c1.getAttribute("base").split(":")[1];
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
var _11c4=null;
var _11c5=DOMUtil.getXMLHTTPRequest();
_11c5.open("get",url,false);
_11c5.send(null);
if(_11c5.responseXML){
_11c4=_11c5.responseXML.documentElement;
}else{
alert(_11c5.responseText);
throw new Error("WebServiceResolver: Could not read WSDL: "+url);
}
return _11c4;
};
WebServiceResolver.prototype.getPortAddress=function(){
return this._WSDLURL.split("?WSDL")[0];
};
WebServiceResolver.prototype.getTargetNamespace=function(){
return this._root.getAttribute("targetNamespace");
};
WebServiceResolver.prototype.getOperations=function(){
var _11c6=new List();
var _11c7=this.resolveAll("wsdl:portType/wsdl:operation",this._root);
if(_11c7.hasEntries()){
while(_11c7.hasNext()){
var _11c8=_11c7.getNext();
var name=_11c8.getAttribute("name");
_11c6.add(new WebServiceOperation(name,this.getPortAddress(),new SOAPEncoder(this,name),new SOAPDecoder(this,name)));
}
}else{
throw new Error("WebServiceResolver: No portType found.");
}
return _11c6;
};
WebServiceResolver.prototype.getSchema=function(){
return this._schema;
};
function WebServiceOperation(name,_11cb,_11cc,_11cd){
this.name=name;
this.address=_11cb;
this.encoder=_11cc;
this.decoder=_11cd;
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
var _11d1=wsdl.getOperations();
_11d1.each(function(_11d2){
proxy[_11d2.name]=WebServiceProxy.createProxyOperation(_11d2);
});
return proxy;
};
WebServiceProxy.prototype._log=function(_11d3,_11d4){
if(WebServiceProxy.isLoggingEnabled&&Application.isDeveloperMode&&_11d4){
var log=_11d4 instanceof SOAPRequest?"SOAPRequest for ":"SOAPResponse from ";
log+=_11d3.address+": "+_11d3.name+"\n\n";
log+=DOMSerializer.serialize(_11d4.document,true);
this.logger.fine(log);
}
};
WebServiceProxy.createProxyOperation=function(_11d6){
return function(){
var _11d7=null,_11d8=_11d6.encoder.encode(new List(arguments));
this._log(_11d6,_11d8);
var _11d9=_11d8.invoke(_11d6.address);
this._log(_11d6,_11d9);
if(_11d9){
if(_11d9.fault){
_11d7=SOAPFault.newInstance(_11d6,_11d9.fault);
if(WebServiceProxy.isFaultHandler){
WebServiceProxy.handleFault(_11d7,_11d8,_11d9);
}
}else{
if(WebServiceProxy.isDOMResult){
_11d7=_11d9.document;
}else{
_11d7=_11d6.decoder.decode(_11d9);
}
}
}
_11d8.dispose();
return _11d7;
};
};
WebServiceProxy.handleFault=function(_11da,_11db,_11dc){
try{
Dialog.invokeModal(Dialog.URL_SERVICEFAULT,null,{soapFault:_11da,soapRequest:_11db,soapResponse:_11dc});
}
catch(exception){
alert(_11da.getFaultString());
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
var _11dd=SystemLogger.getLogger("MessageQueue");
var _11de=null;
var _11df=0;
var _11e0=null;
var _11e1=new Map();
var _11e2=new Map();
var _11e3=false;
var _11e4=false;
var _11e5={"Main":DockBinding.MAIN,"BottomLeft":DockBinding.BOTTOMLEFT,"BottomRight":DockBinding.BOTTOMRIGHT,"RightTop":DockBinding.RIGHTTOP,"RightBottom":DockBinding.RIGHTBOTTOM,"AbsBottomLeft":DockBinding.ABSBOTTOMLEFT,"AbsBottomRight":DockBinding.ABSBOTTOMRIGHT};
this.initialize=function(){
_11de=ConsoleMessageQueueService;
_11df=_11de.GetCurrentSequenceNumber("dummyparam!");
this.index=_11df;
EventBroadcaster.subscribe(BroadcastMessages.VIEW_COMPLETED,this);
EventBroadcaster.subscribe(BroadcastMessages.VIEW_CLOSED,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_OFFLINE,this);
EventBroadcaster.subscribe(BroadcastMessages.SERVER_ONLINE,this);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
};
this._autoupdate=function(){
if(!_11e3){
if(!MessageQueue._actions.hasEntries()){
var _11e6=WebServiceProxy.isLoggingEnabled;
if(Application.isLoggedIn){
_11e4=true;
WebServiceProxy.isLoggingEnabled=false;
MessageQueue.update();
WebServiceProxy.isLoggingEnabled=_11e6;
_11e4=false;
}
}
}
};
this._pokeserver=function(){
if(_11e3==true){
if(ReadyService.IsServerReady(true)){
MessageQueue._lockSystem(false);
}
}
};
this.update=function(){
if(Application.isLoggedIn){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_REQUESTED,_11e4);
var _11e7=_11de.GetMessages(Application.CONSOLE_ID,this.index);
if(_11e7!=null){
if(Types.isDefined(_11e7.CurrentSequenceNumber)){
var _11e8=_11e7.CurrentSequenceNumber;
if(_11e8<this.index){
_11dd.debug("SERVER WAS RESTARTED! old messagequeue index: "+this.index+", new messagequeue index: "+_11e8);
}
this.index=_11e8;
var _11e9=new List(_11e7.ConsoleActions);
if(_11e9.hasEntries()){
this.evaluate(_11e9);
}else{
if(!this._actions.hasEntries()){
broadcastUpdateEvaluated();
}
}
}else{
_11dd.error("No sequencenumber in MessageQueue response!");
}
}
}
};
this.evaluate=function(_11ea){
var _11eb=new List();
if(_11ea.hasEntries()){
_11ea.each(function(_11ec){
if(this._index[_11ec.Id]!=true){
_11eb.add(_11ec);
}
this._index[_11ec.Id]=true;
},this);
if(_11eb.hasEntries()){
if(this._actions.hasEntries()){
this._actions.merge(_11eb);
}else{
this._actions=_11eb;
}
this._nextAction();
}
}
};
this._closeAllViews=function(_11ed){
var _11ee="(No reason)";
if(_11ed!=null){
_11ee=_11ed.Reason;
}
var title="Warning";
var text="The server has requested a close of all active editors for the following reason: \"${reason}\". It is recommended that you accept this request by clicking OK.";
text=text.replace("${reason}",_11ee);
var self=this;
Dialog.warning(title,text,Dialog.BUTTONS_ACCEPT_CANCEL,{handleDialogResponse:function(_11f2){
if(_11f2==Dialog.RESPONSE_ACCEPT){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEWS);
}
self._nextAction();
}});
};
this._nextAction=function(){
var _11f3=null;
if(this._actions.hasEntries()){
var _11f4=this._actions.extractFirst();
_11df=_11f4.SequenceNumber;
_11dd.debug("MessageQueue action: "+_11f4.ActionType+" > QUEUE-MAX-SEQNUM: "+this.index+" > CURRENT SEQNUM: "+_11df+" > ACTIONS-LEFT: "+this._actions.getLength());
switch(_11f4.ActionType){
case "OpenView":
_11f3=_11f4.OpenViewParams;
if(_11f3.ViewType=="ModalDialog"){
openDialogView(_11f3);
}else{
_11e0=_11f3.ViewId;
openView(_11f3);
}
break;
case "CloseView":
_11f3=_11f4.CloseViewParams;
_11e0=_11f3.ViewId;
closeView(_11f3);
break;
case "RefreshTree":
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESH,_11f4.RefreshTreeParams.EntityToken);
var debug="REFRESHING TREES: "+_11e1.countEntries()+"\n";
_11e1.each(function(token){
debug+="\n\tTOKEN: "+token;
});
_11dd.debug(debug);
if(!_11e1.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "MessageBox":
openMessageBox(_11f4.MessageBoxParams);
break;
case "OpenViewDefinition":
_11f3=_11f4.OpenViewDefinitionParams;
_11e0=_11f3.Handle;
openViewDefinition(_11f3);
break;
case "LogEntry":
logEntry(_11f4.LogEntryParams);
this._nextAction();
break;
case "Reboot":
Application.reload(true);
break;
case "LockSystem":
MessageQueue._lockSystem(true);
break;
case "BroadcastMessage":
_11f3=_11f4.BroadcastMessageParams;
_11dd.debug("Server says: EventBroadcaster.broadcast ( \""+_11f3.Name+"\", "+_11f3.Value+" )");
EventBroadcaster.broadcast(_11f3.Name,_11f3.Value);
this._nextAction();
break;
case "CollapseAndRefresh":
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_COLLAPSEALL);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.subscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
EventBroadcaster.broadcast(BroadcastMessages.SYSTEMTREEBINDING_REFRESHALL);
if(!_11e1.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
this._nextAction();
}
break;
case "CloseAllViews":
this._closeAllViews(_11f4.CloseAllViewsParams);
break;
case "SaveStatus":
saveStatus(_11f4.SaveStatusParams);
this._nextAction();
break;
case "DownloadFile":
Download.init(_11f4.DownloadFileParams.Url);
this._nextAction();
break;
case "ExpandTreeNode":
this._nextAction();
break;
case "BindEntityTokenToView":
_11f3=_11f4.BindEntityTokenToViewParams;
EventBroadcaster.broadcast(BroadcastMessages.BIND_TOKEN_TO_VIEW,{handle:_11f3.ViewId,entityToken:_11f3.EntityToken});
this._nextAction();
break;
case "OpenGenericView":
_11f3=_11f4.OpenGenericViewParams;
openGenericView(_11f3);
break;
default:
Dialog.error("Dysfunction","Unhandled action: "+_11f4.ActionType);
break;
}
}else{
broadcastUpdateEvaluated();
}
};
function broadcastUpdateEvaluated(){
EventBroadcaster.broadcast(BroadcastMessages.MESSAGEQUEUE_EVALUATED,_11e4);
}
function logEntry(_11f7){
var _11f8=_11f7.Level.toLowerCase();
SystemLogger.getLogger(_11f7.SenderId)[_11f8](_11f7.Message);
}
function openView(_11f9){
var list=paramsToList(_11f9.Argument);
if(list.hasEntries()){
var def=ViewDefinition.clone("Composite.Management.PostBackView",_11f9.ViewId);
def.entityToken=_11f9.EntityToken;
def.flowHandle=_11f9.FlowHandle;
def.position=_11e5[_11f9.ViewType],def.label=_11f9.Label;
def.image=_11f9.Image;
def.toolTip=_11f9.ToolTip;
def.argument={"url":_11f9.Url,"list":list};
StageBinding.presentViewDefinition(def);
}else{
StageBinding.presentViewDefinition(new HostedViewDefinition({handle:_11f9.ViewId,entityToken:_11f9.EntityToken,flowHandle:_11f9.FlowHandle,position:_11e5[_11f9.ViewType],url:_11f9.Url,label:_11f9.Label,image:_11f9.Image,toolTip:_11f9.ToolTip}));
}
}
function openDialogView(_11fc){
StageBinding.presentViewDefinition(new DialogViewDefinition({handle:_11fc.ViewId,flowHandle:_11fc.FlowHandle,position:Dialog.MODAL,url:_11fc.Url,handler:{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}}}));
}
function openMessageBox(_11fd){
var _11fe=_11fd.DialogType.toLowerCase();
if(_11fe=="question"){
throw "Not supported!";
}else{
Dialog[_11fe](_11fd.Title,_11fd.Message,null,{handleDialogResponse:function(){
setTimeout(function(){
MessageQueue._nextAction();
},250);
}});
}
}
function openViewDefinition(_11ff){
var map={};
var _1201=false;
new List(_11ff.Argument).each(function(entry){
map[entry.Key]=entry.Value;
_1201=true;
});
var proto=ViewDefinitions[_11ff.Handle];
if(proto!=null){
var def=null;
if(proto.isMutable==false){
def=proto;
}else{
def=new HostedViewDefinition();
for(var prop in proto){
def[prop]=proto[prop];
}
def.handle=_11ff.ViewId;
}
def.argument=_1201?map:null;
StageBinding.presentViewDefinition(def);
}else{
throw "Unknown ViewDefinition: "+param.Handle;
}
}
function openGenericView(_1206){
var def=ViewBinding.clone("Composite.Management.GenericView",_1206.ViewId);
def.label=_1206.Label;
def.toolTip=_1206.ToolTip;
def.image=_1206.Image;
def.argument={"url":_1206.Url,"list":paramsToList(_1206.UrlPostArguments)};
StageBinding.presentViewDefinition(def);
}
function closeView(_1208){
if(StageBinding.isViewOpen(_1208.ViewId)){
EventBroadcaster.broadcast(BroadcastMessages.CLOSE_VIEW,_1208.ViewId);
}else{
MessageQueue._nextAction();
}
}
function saveStatus(_1209){
EventBroadcaster.broadcast(BroadcastMessages.CURRENT_SAVED,{handle:_1209.ViewId,isSuccess:_1209.Succeeded});
}
this._lockSystem=function(_120a){
var _120b=top.bindingMap.offlinetheatre;
if(_120a){
_120b.play(true);
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._pokeserver,MessageQueue.INTERVAL_OFFLINE);
}else{
_120b.stop();
window.clearInterval(window.messageQueueInterval);
window.messageQueueInterval=window.setInterval(MessageQueue._autoupdate,MessageQueue.INTERVAL_ONLINE);
var self=this;
setTimeout(function(){
if(self._actions.hasEntries()){
self._nextAction();
}
},0);
}
_11e3=_120a;
};
this.handleBroadcast=function(_120d,arg){
switch(_120d){
case BroadcastMessages.APPLICATION_LOGIN:
this.initialize();
break;
case BroadcastMessages.VIEW_COMPLETED:
case BroadcastMessages.VIEW_CLOSED:
if(_11e0!=null&&arg==_11e0){
_11e0=null;
this._nextAction();
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHING:
if(arg!=null){
_11e1.set(arg,true);
}else{
_11dd.debug("Saa har vi balladen!");
}
break;
case BroadcastMessages.SYSTEMTREEBINDING_REFRESHED:
if(_11e1.hasEntries()){
_11e1.del(arg);
_11dd.debug("Refreshed tree: "+arg+"\n("+_11e1.countEntries()+" trees left!)");
if(!_11e1.hasEntries()){
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHING,this);
EventBroadcaster.unsubscribe(BroadcastMessages.SYSTEMTREEBINDING_REFRESHED,this);
setTimeout(function(){
MessageQueue._nextAction();
},0);
}
}
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCING_OPEN:
_11e2.set(arg,true);
break;
case BroadcastMessages.SYSTEMTREENODEBINDING_FORCED_OPEN:
if(_11e2.hasEntries()==true){
_11e2.del(arg);
if(!_11e2.hasEntries()){
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
function paramsToList(_120f){
var list=new List();
new List(_120f).each(function(entry){
list.add({name:entry.Key,value:entry.Value});
});
return list;
}
EventBroadcaster.subscribe(BroadcastMessages.APPLICATION_LOGIN,this);
};
var ViewDefinitions={"Composite.Management.Null":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.Null"}),"Composite.Management.PostBackDialog":new DialogViewDefinition({handle:"Composite.Management.PostBackDialog",isMutable:true,position:Dialog.MODAL,url:"${root}/content/dialogs/postback/postbackdialog.aspx",argument:{"url":null,"list":null}}),"Composite.Management.PostBackView":new HostedViewDefinition({handle:"Composite.Management.PostBackView",isMutable:true,position:DockBinding.MAIN,url:"${root}/postback.aspx",argument:{"url":null,"list":null}}),"Composite.Management.GenericView":new HostedViewDefinition({handle:"Composite.Management.GenericView",isMutable:true,position:DockBinding.MAIN,url:"${root}/content/views/generic/generic.aspx",label:null,image:null,toolTip:null,argument:{"url":null,"list":null}}),"Composite.Management.Start":new HostedViewDefinition({handle:"Composite.Management.Start",position:DockBinding.START,label:"Welcome Travellers",url:"${root}/content/views/start/start.aspx"}),"Composite.Management.About":new DialogViewDefinition({handle:"Composite.Management.About",position:Dialog.MODAL,url:"${root}/content/dialogs/about/about.aspx"}),"Composite.Management.PermissionEditor":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.PermissionEditor",position:DockBinding.MAIN,url:"${root}/content/views/editors/permissioneditor/permissioneditor.aspx",argument:{serializedEntityToken:"entityTokenType='Composite\\.Plugins\\.Elements\\.ElementProviders\\.VirtualElementProvider\\.VirtualElementProviderEntityToken,Composite'entityToken='_EntityToken_Type_=\\'Composite\\\\\\.Plugins\\\\\\.Elements\\\\\\.ElementProviders\\\\\\.VirtualElementProvider\\\\\\.VirtualElementProviderEntityToken,Composite\\'_EntityToken_Source_=\\'VirtualElementProvider\\'_EntityToken_Id_=\\'DesignPerspective\\''\""}}),"Composite.Management.SystemLog":new HostedViewDefinition({handle:"Composite.Management.SystemLog",position:DockBinding.ABSBOTTOMLEFT,label:"System Log",url:"${root}/content/views/dev/systemlog/systemlog.aspx"}),"Composite.Management.Developer":new HostedViewDefinition({handle:"Composite.Management.Developer",position:DockBinding.ABSBOTTOMRIGHT,label:"Developer",url:"${root}/content/views/dev/developer/developer.aspx"}),"Composite.Management.IconPack.System":new HostedViewDefinition({handle:"Composite.Management.IconPack.System",position:DockBinding.ABSBOTTOMLEFT,label:"Freja",image:"${icon:icon}",url:"${root}/content/views/dev/icons/system/Default.aspx"}),"Composite.Management.IconPack.Republic":new HostedViewDefinition({handle:"Composite.Management.IconPack.Republic",position:DockBinding.ABSBOTTOMLEFT,label:"Republic",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/republic.aspx"}),"Composite.Management.IconPack.Harmony":new HostedViewDefinition({handle:"Composite.Management.IconPack.Harmony",position:DockBinding.ABSBOTTOMLEFT,label:"Harmony",image:"${icon:icon}",url:"${root}/content/views/dev/icons/files/harmony.aspx"}),"Composite.Management.Explorer":new HostedViewDefinition({handle:"Composite.Management.Explorer",position:DockBinding.EXPLORER,url:"${root}/content/views/explorer/explorer.aspx",label:"Explorer"}),"Composite.Management.Options":new DialogViewDefinition({handle:"Composite.Management.Options",position:Dialog.MODAL,url:"${root}/content/dialogs/options/options.aspx",label:"Options"}),"Composite.Management.VisualEditorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.VisualEditorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/wysiwygeditor/wysiwygeditordialog.aspx",width:600,argument:{"formattingconfiguration":null,"elementclassconfiguration":null,"configurationstylesheet":null,"presentationstylesheet":null,"embedablefieldstypenames":null}}),"Composite.Management.MultiSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.MultiSelectorDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/multiselector/multiselectordialog.aspx"}),"Composite.Management.Search":new HostedViewDefinition({handle:"Composite.Management.Search",position:DockBinding.RIGHTBOTTOM,url:"${root}/content/views/search/search.aspx",label:"Search",image:"${icon:view_search}",argument:null}),"Composite.Management.Browser":new HostedViewDefinition({isMutable:false,handle:"Composite.Management.Browser",position:DockBinding.MAIN,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,label:"Page Browser",image:"${icon:page-view-administrated-scope}",toolTip:"Browse unpublished pages",url:"${root}/content/views/browser/browser.aspx",argument:{"URL":null}}),"Composite.Management.SEOAssistant":new HostedViewDefinition({handle:"Composite.Management.SEOAssistant",position:DockBinding.RIGHTTOP,perspective:ExplorerBinding.PERSPECTIVE_CONTENT,url:"${root}/content/views/seoassist/seoassist.aspx",label:"${string:Composite.Web.SEOAssistant:SEOAssistant}",image:"${icon:seoassistant}",toolTip:"Search engine optimization"}),"Composite.Management.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.Management.SourceCodeViewer",position:DockBinding.ABSBOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.User.SourceCodeViewer":new HostedViewDefinition({isMutable:true,handle:"Composite.User.SourceCodeViewer",position:DockBinding.BOTTOMLEFT,url:"${root}/content/views/dev/viewsource/viewsource.aspx",argument:{"action":null,"viewBinding":null}}),"Composite.Management.Help":new HostedViewDefinition({label:"Help",image:"${icon:help}",handle:"Composite.Management.Help",position:DockBinding.ABSRIGHTTOP,url:"${root}/content/views/help/help.aspx"}),"Composite.Management.Dialog.Translations":new DialogViewDefinition({handle:"Composite.Management.TranslationsDialog",position:Dialog.MODAL,url:"${root}/content/dialogs/translations/translations.aspx",label:"Translations",image:"${icon:users-changepublicculture}"}),"Composite.Management.ImageSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.ImageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_IMAGESELECTOR,argument:{label:"Select Image",image:"${icon:image}",selectionProperty:"ElementType",selectionValue:"image/jpeg image/gif image/png image/bmp image/tiff",selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:"MediaFileElementProvider.WebImages"}]}}),"Composite.Management.EmbeddableMediaSelectorDialog":new DialogViewDefinition({isMutable:true,handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Media",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider",search:null}]}}),"Composite.Management.FrontendFileSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.EmbeddableMediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Frontend File",image:"${icon:media}",selectionProperty:"ElementType",selectionValue:null,selectionResult:"Uri",nodes:[{key:"LayoutFileElementProvider"}]}}),"Composite.Management.PageSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Page",image:"${icon:page}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.PageIdSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.PageIdSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Page",image:"${icon:page}",selectionProperty:"DataId",selectionValue:null,selectionResult:"DataId",nodes:[{key:"PageElementProvider"}]}}),"Composite.Management.LinkableSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.LinkableSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Page or File",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"PageElementProvider"},{key:"MediaFileElementProvider"}]}}),"Composite.Management.MediaSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.MediaSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Page or File",image:"${icon:link}",selectionProperty:"Uri",selectionValue:null,selectionResult:"Uri",nodes:[{key:"MediaFileElementProvider"}]}}),"Composite.Management.FunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.FunctionSelectorDialog",isMutable:true,position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Function",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider"}]}}),"Composite.Management.WidgetFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.WidgetFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Widget",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllWidgetFunctionsElementProvider"}]}}),"Composite.Management.XhtmlDocumentFunctionSelectorDialog":new DialogViewDefinition({handle:"Composite.Management.XhtmlDocumentFunctionSelectorDialog",position:Dialog.MODAL,url:Dialog.URL_TREESELECTOR,argument:{label:"Select Function",image:"${icon:functioncall}",selectionProperty:"ElementType",selectionValue:MimeTypes.COMPOSITEFUNCTION,selectionResult:"ElementId",nodes:[{key:"AllFunctionsElementProvider",search:"AllFunctionsElementProvider.XhtmlDocument"}]}})};
var KickStart=new function(){
var _1212=false;
var _1213=false;
var _1214=null;
var _1215=false;
var _1216=Client.qualifies();
var _1217="admin";
var _1218="123456";
this.fireOnLoad=function(){
if(_1216){
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
this.handleBroadcast=function(_1219){
switch(_1219){
case BroadcastMessages.AUDIO_INITIALIZED:
case BroadcastMessages.PERSISTANCE_INITIALIZED:
kickStart(_1219);
break;
case BroadcastMessages.APPLICATION_STARTUP:
break;
case BroadcastMessages.KEY_ENTER:
this.login();
break;
case BroadcastMessages.APPLICATION_LOGIN:
var _121a=window.bindingMap.appwindow;
_121a.setURL("app.aspx");
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
function fileEventBroadcasterSubscriptions(_121b){
new List([BroadcastMessages.AUDIO_INITIALIZED,BroadcastMessages.PERSISTANCE_INITIALIZED,BroadcastMessages.APPLICATION_STARTUP,BroadcastMessages.APPLICATION_LOGIN,BroadcastMessages.APPLICATION_OPERATIONAL]).each(function(_121c){
if(_121b){
EventBroadcaster.subscribe(_121c,KickStart);
}else{
EventBroadcaster.unsubscribe(_121c,KickStart);
}
});
}
function kickStart(_121d){
switch(_121d){
case BroadcastMessages.AUDIO_INITIALIZED:
_1213=true;
setTimeout(function(){
Persistance.initialize();
},0);
break;
case BroadcastMessages.PERSISTANCE_INITIALIZED:
_1212=true;
break;
}
if(_1212&&_1213){
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
DataManager.getDataBinding("username").setValue(_1217);
DataManager.getDataBinding("password").setValue(_1218);
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
this.doLogin=function(_1220,_1221){
var _1222=WebServiceProxy.isLoggingEnabled;
WebServiceProxy.isLoggingEnabled=false;
WebServiceProxy.isFaultHandler=false;
var _1223=false;
var _1224=LoginService.ValidateAndLogin(_1220,_1221);
if(_1224 instanceof SOAPFault){
alert(_1224.getFaultString());
}else{
_1223=_1224;
}
if(_1223){
EventBroadcaster.unsubscribe(BroadcastMessages.KEY_ENTER,KickStart);
accessGranted();
}else{
Application.unlock(KickStart);
if(bindingMap.decks!=null){
accesssDenied();
}
}
WebServiceProxy.isFaultHandler=true;
if(_1222){
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
var _1225=DataManager.getDataBinding("username");
var _1226=DataManager.getDataBinding("password");
_1225.blur();
_1226.blur();
_1225.setValue("");
_1226.setValue("");
_1225.clean();
_1226.clean();
_1225.focus();
document.getElementById("loginerror").style.display="block";
var _1227={handleAction:function(_1228){
document.getElementById("loginerror").style.display="none";
_1228.target.removeActionListener(Binding.ACTION_DIRTY,_1227);
}};
bindingMap.loginfields.addActionListener(Binding.ACTION_DIRTY,_1227);
}
WindowManager.fireOnLoad(this);
if(!_1216){
UpdateManager.isEnabled=false;
}
};

