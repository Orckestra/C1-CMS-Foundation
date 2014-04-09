function _UpdateManager(){
var _1=null;
if(!window.UpdateManager){
this._construct();
_1=this;
}
return _1;
}
_UpdateManager.prototype={version:"0.1",CLASSNAME_FORM:"updateform",CLASSNAME_ZONE:"updatezone",CLASSNAME_GONE:"updategone",EVENT_BEFOREUPDATE:"beforeupdate",EVENT_AFTERUPDATE:"afterupdate",EVENT_ERRORUPDATE:"errorupdate",xhtml:null,summary:null,isEnabled:true,isDebugging:false,isUpdating:false,hasSoftAttributes:false,hasSoftSiblings:false,pendingResponse:null,currentDOM:null,errormessage:null,_assistant:null,_updates:null,_replaced:null,_dotnetnames:["__VIEWSTATE","__EVENTVALIDATION","__EVENTTARGET","__EVENTARGUMENT","__LASTFOCUS"],plugins:[],toString:function(){
return "[object UpdateManager]";
},_construct:function(_2){
var _3=document.documentElement;
var _4=_3.namespaceURI;
if(_4==null){
_4=new String(_3.getAttribute("xmlns"));
}
if(_4=="http://www.w3.org/1999/xhtml"){
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
var _5=decodeURIComponent(this.xhtml);
this.currentDOM=UpdateAssistant.parse(_5);
}else{
throw new TypeError();
}
}else{
var _6=this;
UpdateAssistant.getXMLHttpRequest("get",window.location.toString(),{handleResponse:function(_7){
_6.currentDOM=_7;
}}).send(null);
}
}
}
},setupForms:function(){
var _8=false;
Array.forEach(document.forms,function(_9){
if(_9.className.indexOf(this.CLASSNAME_FORM)>-1){
if(!_9.__isSetup){
this._setupForm(_9);
_9.__isSetup=true;
}
_8=true;
}
},this);
return _8;
},_setupForm:function(_a){
var _b=this;
this._addListener(_a,"submit");
_a.__submit=_a.submit;
_a.submit=function(){
if(_b.isEnabled){
_b._submit(_a);
}else{
_a.__submit();
}
return false;
};
},_addListener:function(_c,_d){
if(_c.addEventListener!=null){
_c.addEventListener(_d,this,false);
}else{
var _e=this;
_c.attachEvent("on"+_d,function(){
_e.handleEvent(window.event);
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
var _10=e.target?e.target:e.srcElement;
this._submit(_10);
}
break;
}
},_submit:function(_11){
if(!this.isUpdating){
this.isUpdating=true;
UpdateAssistant.dispatchEvent(document.documentElement,this.EVENT_BEFOREUPDATE);
this._postRequest(_11);
}
},handleResponse:function(dom){
if(this.isEnabled){
this.summary=new String("");
this.errors=new String("");
if(dom!=null){
var _13=UpdateAssistant.getUpdateZones(dom);
var _14=UpdateAssistant.getUpdateZones(this.currentDOM);
this._updates=[];
this._replaced={};
_13.forEach(function(_15,_16){
var _17=_14[_16];
this._crawl(_15,_17);
},this);
this._updates.forEach(function(_18,_19){
_18.update();
_18.dispose();
},this);
this._dotnetnames.forEach(function(_1a){
this._fixdotnet(dom,_1a);
},this);
this.currentDOM=dom;
}
}
this.isUpdating=false;
UpdateAssistant.dispatchEvent(document.documentElement,this.EVENT_AFTERUPDATE);
},handleSimilarResponse:function(){
UpdateAssistant.dispatchEvent(document.documentElement,this.EVENT_AFTERUPDATE);
},_crawl:function(_1b,_1c,_1d,id){
var _1f=true;
var _20=_1c.getAttribute("class");
if(_20==null||_20.indexOf(this.CLASSNAME_GONE)==-1){
if(_1c.nodeType==Node.ELEMENT_NODE){
var _21=_1c.getAttribute("id");
if(_21!=null){
_1d=_1b;
id=_21;
}
}
if(_1f=this._check(_1b,_1c,_1d,id)){
var _22=_1b.firstChild;
var _23=_1c.firstChild;
while(_22!=null&&_23!=null&&!this._replaced[id]){
switch(_22.nodeType){
case Node.TEXT_NODE:
_1f=this._check(_22,_23,_1d,id);
break;
case Node.DOCUMENT_NODE:
case Node.ELEMENT_NODE:
_1f=this._crawl(_22,_23,_1d,id);
break;
}
if(this._replaced[id]){
_1f=false;
}else{
_22=_22.nextSibling;
_23=_23.nextSibling;
}
}
}
}
return _1f;
},_check:function(_24,_25,_26,id){
var _28=true;
var _29=null;
var _2a=false;
var _2b=false;
if((_24!=null&&_25==null)||(_24==null&&_25!=null)){
_28=false;
}else{
if(_28=_24.nodeType==_25.nodeType){
switch(_25.nodeType){
case Node.ELEMENT_NODE:
if(_24.namespaceURI!=_25.namespaceURI||_24.nodeName!=_25.nodeName){
_28=false;
}else{
if(_28=(_24.nodeName==_25.nodeName)){
var _2c=_25.getAttribute("id");
var _2d=_24.getAttribute("id");
if(_2c!=null&&_2d!=null){
if(_2c!=_2d){
_28=false;
}else{
if((_29=this._getPlugin(_24,_25))!=null){
if(_29.updateElement(_24,_25)){
_2b=true;
_28=false;
}
}
}
}
if(_28){
if(_28=this._checkAttributes(_24,_25)){
if(this.hasSoftSiblings&&this._hasSoftChildren(_24)&&this._hasSoftChildren(_25)){
if(this._validateSoftChildren(_24,_25)){
this._updateSoftChildren(_24,_25);
_2a=true;
}
_28=false;
}else{
_28=_24.childNodes.length==_25.childNodes.length;
}
}
}
}
}
break;
case Node.TEXT_NODE:
if(_24.data.trim()!=_25.data.trim()){
_28=false;
}
break;
}
}
}
if(_28==false&&!_2a&&!_2b){
if(id!=null&&_26!=null){
this.addUpdate(new ReplaceUpdate(id,_26));
}
}
return _28;
},_checkAttributes:function(_2e,_2f){
var _30=true;
var _31=false;
var _32=_2e.attributes;
var _33=_2f.attributes;
if(_32.length!=_33.length){
_31=true;
}else{
_31=!Array.every(_32,function(_34,i){
var _36=_33.item(i);
return _34.nodeName==_36.nodeName&&_34.nodeValue==_36.nodeValue;
});
}
if(_31){
var _37=_2e.getAttribute("id");
var _38=_2f.getAttribute("id");
if(this.hasSoftAttributes&&_37!=null&&_37==_38){
this.addUpdate(new AttributesUpdate(_38,_2e,_2f));
}else{
_30=false;
}
}
return _30;
},_hasSoftChildren:function(_39){
var _3a=true;
if(_39.hasChildNodes()){
_3a=Array.every(_39.childNodes,function(_3b){
var res=true;
switch(_3b.nodeType){
case Node.TEXT_NODE:
res=!/[^\t\n\r ]/.test(_3b.nodeValue);
break;
case Node.ELEMENT_NODE:
res=_3b.getAttribute("id")!=null;
break;
}
return res;
});
}
return _3a;
},_validateSoftChildren:function(_3d,_3e){
var _3f=true;
var _40=-1;
var _41=-1;
var _42=-1;
var _43=this._toMap(_3d.childNodes,true);
var _44=this._toMap(_3e.childNodes,true);
for(var id in _44){
if(_3f){
var _46=_44[id];
_3f=_46>=_40;
if(_43[id]!=null){
_42=_43[id];
_3f=_42>=_41;
}
}
_40=_46;
if(_42>-1){
_41=_42;
}
}
return _3f;
},_updateSoftChildren:function(_47,_48){
var _49=this._toMap(_47.childNodes);
var _4a=this._toMap(_48.childNodes);
for(var id in _4a){
if(_49[id]==null){
this.addUpdate(new SiblingUpdate(Update.TYPE_REMOVE,id,null,null));
}else{
this._crawl(_49[id],_4a[id]);
}
}
var _4c=null;
for(id in _49){
if(_4a[id]==null){
var _4d=_49[id];
if(_4c==null){
var _4e=_48.getAttribute("id");
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_4e,_4d,true));
}else{
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_4c,_4d,false));
}
}
_4c=id;
}
},addUpdate:function(_4f){
this._updates.push(_4f);
if(_4f instanceof ReplaceUpdate){
this._replaced[_4f.id]=true;
}
},_getPlugin:function(_50,_51){
var _52=null;
this.plugins.every(function(_53){
if(_53.handleElement(_50,_51)){
_52=_53;
}
return _52==null;
});
return _52;
},_toMap:function(_54,_55){
var _56={};
Array.forEach(_54,function(_57,_58){
if(_57.nodeType==Node.ELEMENT_NODE){
_56[_57.getAttribute("id")]=_55?_58:_57;
}
});
return _56;
},_getPost:function(_59){
var _5a=new String("");
if(_59!=null){
var _5b="";
Array.forEach(_59.elements,function(_5c){
if(_5c.name==null||_5c.name==""){
return;
}
var _5d=_5c.name;
var _5e=encodeURIComponent(_5c.value);
switch(_5c.type){
case "button":
case "submit":
var _5f=UpdateAssistant.getActiveElement();
if(_5c==_5f&&_5d!=""){
_5a+=_5d+"="+_5e+"&";
}
break;
case "radio":
if(_5c.checked){
_5a+=_5d+"="+_5e+"&";
}
break;
case "checkbox":
if(_5c.checked){
if(_5c.name==_5b){
if(_5a.lastIndexOf("&")==_5a.length-1){
_5a=_5a.substr(0,_5a.length-1);
}
_5a+=","+_5e;
}else{
_5a+=_5d+"="+_5c.value;
}
_5b=_5d;
_5a+="&";
}
break;
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_5a+=_5d+"="+_5e+"&";
break;
}
});
}
return _5a.substr(0,_5a.length-1);
},_postRequest:function(_60){
var _61=_60.method!=""?_60.method:"get";
var _62=_60.action!=""?_60.action:window.location.toString();
var _63=this._getPost(_60);
if(_61=="get"){
if(_62.indexOf("?")>-1){
_62=_62+"&"+_63;
}else{
_62+"?"+_63;
}
}
var _64=this;
var _65=UpdateAssistant.getXMLHttpRequest(_61,_62,this);
if(_61=="post"){
_65.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
}
_65.send(_61=="post"?_63:null);
},_fixdotnet:function(dom,id){
var _68=document.getElementById(id);
if(_68!=null){
var _69=UpdateAssistant.getElementById(dom,id);
if(_69!=null){
var _6a=_69.getAttribute("value");
if(_6a!==_68.value){
_68.value=_6a;
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
},report:function(_6d){
this.summary+=_6d+"\n";
}};
var UpdateManager=new _UpdateManager();
function _UpdateAssistant(){
var _6e=null;
if(!window.UpdateAssistant){
this._construct();
_6e=this;
}
return _6e;
}
_UpdateAssistant.prototype={_serializer:window.XMLSerializer!=null?new XMLSerializer():null,_parser:(window.DOMParser!=null&&window.XPathResult!=null)?new DOMParser():null,_activeElement:null,_construct:function(){
if(!window.Node){
window.Node={ELEMENT_NODE:1,TEXT_NODE:3,DOCUMENT_NODE:9};
}
if(!Array.every){
Array.every=function(_6f,fun){
var _71=true;
var len=_6f.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _73=arguments[2];
for(var i=0;i<len;i++){
if(typeof _6f[i]!="undefined"){
if(!fun.call(_73,_6f[i],i,_6f)){
_71=false;
break;
}
}
}
}
return _71;
};
}
if(!Array.prototype.every){
Array.prototype.every=function(fun){
var _76=arguments[1];
return Array.every(this,fun,_76);
};
}
if(!Array.forEach){
Array.forEach=function(_77,fun){
var len=_77.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _7a=arguments[2];
for(var i=0;i<len;i++){
if(typeof _77[i]!="undefined"){
fun.call(_7a,_77[i],i,_77);
}
}
}
};
}
if(!Array.prototype.forEach){
Array.prototype.forEach=function(fun){
var _7d=arguments[1];
Array.forEach(this,fun,_7d);
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
},getXMLHttpRequest:function(_7f,_80,_81){
var _82=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Msxml2.XMLHTTP.3.0");
if(_82!=null){
_82.open(_7f,_80,(_81!=null?true:false));
if(_81!=null){
function action(){
if(_82.readyState==4){
var _83=_82.getResponseHeader("X-Error-Type");
if(_83){
var _84="";
for(var i=0;i<10;i++){
var _86=i?i:"";
var _83=_82.getResponseHeader("X-Error-Type"+_86);
if(!_83){
break;
}
var _87=_82.getResponseHeader("X-Error-Message"+_86);
_84+=_83+"\n"+_87+"\n";
}
Dialog.error("Error",_84);
}else{
var _88=_82.responseText;
UpdateManager.pendingResponse=_88;
var dom=UpdateAssistant.parse(_88);
if(dom!=null){
_81.handleResponse(dom);
}
}
}
}
if(_82.addEventListener!=null){
_82.addEventListener("readystatechange",{handleEvent:function(){
action();
}},false);
}else{
_82.onreadystatechange=action;
}
}
}
return _82;
},dispatchEvent:function(_8a,_8b){
var _8c=true;
var _8d=document.createEvent("UIEvents");
_8d.initEvent(_8b,true,true);
_8c=_8a.dispatchEvent(_8d);
return _8c;
},getUpdateZones:function(dom){
var _8f="//*[@id and contains(@class,'updatezone')]";
var _90=[];
var _91=null;
var _92=null;
if(window.XPathResult!=null){
var _93=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_91=dom.evaluate(_8f,dom,null,_93,null);
while((_92=_91.iterateNext())!=null){
_90.push(_92);
}
}else{
_91=dom.documentElement.selectNodes(_8f);
Array.forEach(_91,function(_94){
_90.push(_94);
});
}
return _90;
},getElementById:function(dom,id){
var _97="//*[@id='"+id+"']";
var _98=null;
var _99=null;
if(window.XPathResult!=null){
var _9a=XPathResult.FIRST_ORDERED_NODE_TYPE;
_98=dom.evaluate(_97,dom,null,_9a,null);
_99=_98.singleNodeValue;
}else{
_99=dom.documentElement.selectNodes(_97)[0];
}
return _99;
},_getIds:function(dom){
var _9c="//*[@id]";
var _9d=null;
var _9e=[];
if(window.XPathResult!=null){
var _9f=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_9d=dom.evaluate(_9c,dom,null,_9f,null);
while((element=_9d.iterateNext())!=null){
_9e.push(element.getAttribute("id"));
}
}else{
_9d=dom.documentElement.selectNodes(_9c);
Array.forEach(_9d,function(_a0){
_9e.push(_a0.getAttribute("id"));
});
}
return _9e;
},toHTMLElement:function(_a1){
var _a2=this.serialize(_a1);
var _a3=document.createElement("temp");
_a3.innerHTML=_a2;
return _a3.firstChild;
},getActiveElement:function(){
var _a4=document.activeElement;
if(_a4==null||_a4==document.body){
_a4=this._activeElement;
}
return _a4;
},serialize:function(_a5){
var _a6=null;
if(_a5.xml!=null){
_a6=_a5.xml;
}else{
if(this._serializer!=null){
_a6=this._serializer.serializeToString(_a5);
}
}
return _a6;
},hasDifferences:function(_a7,_a8){
var s1=null;
var s2=null;
if(_a7.xml!=null){
s1=_a7.xml;
s2=_a8.xml;
}else{
if(this._serializer!=null){
s1=this._serializer.serializeToString(_a7);
s2=this._serializer.serializeToString(_a8);
}
}
return s1!=s2;
},parse:function(_ab){
var _ac=null;
if(this._parser!=null&&window.XPathResult!=null){
_ac=this._parser.parseFromString(_ab,"text/xml");
}else{
_ac=new ActiveXObject("Msxml2.DOMDocument.3.0");
_ac.setProperty("SelectionLanguage","XPath");
_ac.loadXML(_ab);
}
return this._validate(_ac);
},_validate:function(dom){
var out=null;
if(dom.parseError!=null&&dom.parseError.errorCode!=0){
out=dom.parseError.reason;
}else{
var _af=dom.getElementsByTagName("parsererror").item(0);
if(_af!=null){
out=_af.textContent.replace(/\^/g,"").replace(/\-/g,"");
}
}
if(out==null){
var has={},ids=this._getIds(dom);
ids.every(function(id){
var _b3=!has[id];
has[id]=true;
if(!_b3){
out="Element \""+id+"\" encountered twice.";
}
return _b3;
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
this.handleElement=function(_b4,_b5){
var _b6=false;
switch(_b4.nodeName.toLowerCase()){
case "input":
case "textarea":
switch(_b4.getAttribute("id")){
case "__EVENTTARGET":
case "__EVENTARGUMENT":
case "__VIEWSTATE":
case "__EVENTVALIDATION":
_b6=false;
break;
}
break;
}
return _b6;
};
this.updateElement=function(_b7,_b8){
var id=_b7.getAttribute("id");
var _ba=document.getElementById(id);
if(_ba!=null){
var _bb=null;
switch(_ba.nodeName.toLowerCase()){
case "input":
_bb=_b7.getAttribute("value");
break;
case "textarea":
_bb=_b7.textContent?_b7.textContent:_b7.text;
break;
}
if(_bb==null){
_bb="";
}
if(_bb!=_ba.value){
_ba.value=_bb;
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
},_beforeUpdate:function(_bc){
var _bd=true;
if(_bc!=null){
_bc.__updateType=this.type;
_bd=UpdateAssistant.dispatchEvent(_bc,Update.EVENT_BEFOREUPDATE);
}
return _bd;
},_afterUpdate:function(_be){
var _bf=true;
if(_be!=null){
_be.__updateType=this.type;
_bf=UpdateAssistant.dispatchEvent(_be,Update.EVENT_AFTERUPDATE);
}
return _bf;
}};
ReplaceUpdate.prototype=new Update();
ReplaceUpdate.superclass=Update.prototype;
function ReplaceUpdate(id,_c1){
this.type=Update.TYPE_REPLACE;
this.id=id;
this.element=_c1;
return this;
}
ReplaceUpdate.prototype.update=function(){
var _c2,_c3,_c4=UpdateAssistant.toHTMLElement(this.element);
if((_c2=document.getElementById(this.id))!=null){
if((_c3=_c2.parentNode)!=null){
var _c5=UserInterface.getBinding(_c2);
if(_c5!=null){
_c4.__isAttached=_c5.isAttached;
}
if(this._beforeUpdate(_c2)){
_c3.replaceChild(_c4,_c2);
this._afterUpdate(_c4);
}
}
}else{
UpdateManager.error("Element null point: "+this.id);
}
};
ReplaceUpdate.prototype._afterUpdate=function(_c6){
var _c7=ReplaceUpdate.superclass._afterUpdate.call(this,_c6);
UpdateManager.report("Replaced element id=\""+this.id+"\"");
if(_c6.nodeName=="form"||_c6.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
return _c7;
};
SiblingUpdate.prototype=new Update();
SiblingUpdate.superclass=Update.prototype;
function SiblingUpdate(_c8,id,_ca,_cb){
this.type=_c8;
this.id=id;
this.element=_ca;
this.isFirst=_cb;
return this;
}
SiblingUpdate.prototype.update=function(){
var _cc=document.getElementById(this.id);
switch(this.type){
case Update.TYPE_REMOVE:
this._remove(_cc);
break;
case Update.TYPE_INSERT:
this._insert(this.element,_cc);
break;
}
};
SiblingUpdate.prototype._remove=function(_cd){
var _ce=_cd.parentNode;
if(_ce!=null){
if(this._beforeUpdate(_cd)){
_ce.removeChild(_cd);
this._afterUpdate(_ce);
}
}
};
SiblingUpdate.prototype._insert=function(_cf,_d0){
var _d1=UpdateAssistant.toHTMLElement(_cf);
if(this.isFirst){
var _d2=_d0;
if(_d2!=null){
if(this._beforeUpdate(_d2)){
_d2.insertBefore(_d1,_d2.firstChild);
this._afterUpdate(_d1);
}
}
}else{
var _d2=_d0.parentNode;
if(_d2!=null){
if(this._beforeUpdate(_d2)){
_d2.insertBefore(_d1,_d0.nextSibling);
this._afterUpdate(_d1);
}
}
}
};
SiblingUpdate.prototype._beforeUpdate=function(_d3){
var _d4=SiblingUpdate.superclass._beforeUpdate.call(this,_d3);
if(this.type==Update.TYPE_REMOVE){
UpdateManager.report("Removed element id=\""+_d3.id+"\"");
}
return _d4;
};
SiblingUpdate.prototype._afterUpdate=function(_d5){
var _d6=true;
if(_d5!=null){
_d6=SiblingUpdate.superclass._afterUpdate.call(this,_d5);
if(this.type==Update.TYPE_INSERT){
UpdateManager.report("Inserted element id=\""+_d5.id+"\"");
if(_d5.nodeName=="form"||_d5.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
}
}
return _d6;
};
AttributesUpdate.prototype=new Update();
AttributesUpdate.superclass=Update.prototype;
AttributesUpdate.prototype.currentElement=null;
function AttributesUpdate(id,_d8,_d9){
this.type=type=Update.TYPE_ATTRIBUTES;
this.id=id;
this.element=_d8;
this.currentElement=_d9;
this._summary=[];
return this;
}
AttributesUpdate.prototype.update=function(){
var _da=document.getElementById(this.id);
if(this._beforeUpdate(_da)){
this._updateAttributes(_da);
this._afterUpdate(_da);
}
};
AttributesUpdate.prototype._updateAttributes=function(_db){
Array.forEach(this.element.attributes,function(_dc){
var _dd=this.currentElement.getAttribute(_dc.nodeName);
if(_dd==null||_dd!=_dc.nodeValue){
this._setAttribute(_db,_dc.nodeName,_dc.nodeValue);
this._summary.push("@"+_dc.nodeName);
}
},this);
Array.forEach(this.currentElement.attributes,function(_de){
if(this.element.getAttribute(_de.nodeName)==null){
this._setAttribute(_db,_de.nodeName,null);
this._summary.push("@"+_de.nodeName);
}
},this);
};
AttributesUpdate.prototype._setAttribute=function(_df,_e0,_e1){
if(_df==null){
alert(this.id+": "+document.getElementById(this.id)+"\n\n"+_e0+"="+_e1);
SystemLogger.getLogger("AttributesUpdate").fine(document.body.innerHTML);
}
var _e2=(_e1==null);
if(_e2){
_df.removeAttribute(_e0);
}else{
_df.setAttribute(_e0,_e1);
}
if(document.all!=null){
if(_e2){
_e1="";
}
switch(_e0.toLowerCase()){
case "class":
_df.className=_e1;
break;
case "disabled":
_df.disabled=!_e2;
break;
case "checked":
_df.checked=!_e2;
break;
case "readonly":
_df.readOnly=!_e2;
break;
}
}
};
AttributesUpdate.prototype._afterUpdate=function(_e3){
AttributesUpdate.superclass._afterUpdate.call(this,_e3);
UpdateManager.report("Attributes updated on element id=\""+this.id+"\": "+this._summary.toString());
};
AttributesUpdate.prototype.dispose=function(){
Update.prototype.dispose.call(this);
this.currentElement=null;
};
if(!window.Node){
window.Node={ELEMENT_NODE:1,ATTRIBUTE_NODE:2,TEXT_NODE:3,CDATA_SECTION_NODE:4,ENTITY_REFERENCE_NODE:5,ENTITY_NODE:6,PROCESSING_INSTRUCTION_NODE:7,COMMENT_NODE:8,DOCUMENT_NODE:9,DOCUMENT_TYPE_NODE:10,DOCUMENT_FRAGMENT_NODE:11,NOTATION_NODE:12};
}
window.KeyEventCodes={VK_BACK:8,VK_TAB:9,VK_ENTER:13,VK_SHIFT:16,VK_CONTROL:17,VK_ALT:18,VK_ESCAPE:27,VK_SPACE:32,VK_PAGE_UP:33,VK_PAGE_DOWN:34,VK_END:35,VK_HOME:36,VK_LEFT:37,VK_UP:38,VK_RIGHT:39,VK_DOWN:40,VK_COMMAND:91,VK_INSERT:null,VK_DELETE:127,VK_PLUS:187,VK_MINUS:189,VK_NUMPLUS:107,VK_NUMMINUS:109,VK_F1:112};
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
_WindowManager.prototype={WINDOW_LOADED_BROADCAST:null,WINDOW_UNLOADED_BROADCAST:null,WINDOW_EVALUATED_BROADCAST:null,WINDOW_RESIZED_BROADCAST:null,isWindowLoaded:false,_logger:SystemLogger.getLogger("WindowManager ["+document.title+"]"),_ondomstatements:new List(),_onloadstatements:new List(),_onresizestatements:new List(),_currentDimensions:null,_newDimensions:null,_broadcastTimeout:null,_isHorizontalResize:false,_isVerticalResize:false,_broadcastTimeout:null,_compute:function(_e4,key){
return _e4.replace("${windowkey}",document.location+":"+key);
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
var _e8=this._newDimensions.w!=this._currentDimensions.w;
var _e9=this._newDimensions.h!=this._currentDimensions.h;
if(_e8||_e9){
if(this._broadcastTimeout!=null){
clearTimeout(this._broadcastTimeout);
this._broadcastTimeout=null;
}
var _ea=this;
this._broadcastTimeout=setTimeout(function(){
_ea._broadcastResizeEvent();
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
},fireOnDOM:function(_eb){
if(Interfaces.isImplemented(IDOMHandler,_eb,true)){
this._ondomstatements.add(_eb);
}
},fireOnLoad:function(_ec){
if(Interfaces.isImplemented(ILoadHandler,_ec,true)){
this._onloadstatements.add(_ec);
}
},fireOnResize:function(_ed){
if(Interfaces.isImplemented(IResizeHandler,_ed,true)){
this._onresizestatements.add(_ed);
}
},onDOMContentLoaded:function(){
while(this._ondomstatements.hasNext()){
this._ondomstatements.getNext().fireOnDOM();
}
},getWindowDimensions:function(){
return new Dimension(Client.isMozilla?window.innerWidth:document.body.clientWidth,Client.isMozilla?window.innerHeight:document.body.clientHeight);
},evaluate:function(_ee){
return eval(_ee);
}};
var WindowManager=new _WindowManager();
new function WindowAssistant(){
if(Client.isExplorer){
WindowManager.onDOMContentLoaded();
}
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
if(Client.isFirefox){
UpdateAssistant.serialize=function(_ef){
_ef=_ef.cloneNode(true);
_ef.setAttributeNS(Constants.NS_NS,"xmlns",Constants.NS_XHTML);
_ef.setAttributeNS(Constants.NS_NS,"xmlns:ui",Constants.NS_UI);
return this._serializer.serializeToString(_ef);
};
}
},handleEvent:function(e){
var _f1=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.BEFOREUPDATE:
this._beforeUpdate(_f1);
break;
case DOMEvents.AFTERUPDATE:
this._afterUpdate(_f1);
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
},_beforeUpdate:function(_f2){
var _f3=(_f2==document.documentElement);
if(_f3){
this._elementsbuffer=new List();
this._isUpdating=true;
Application.lock(this);
var _f4=UserInterface.getBinding(document.body);
if(_f4!=null){
var _f5=_f4.getDescendantBindingByType(PageBinding);
if(_f5!=null){
_f5.onBeforeUpdates();
}
}
var _f6=FocusBinding.focusedBinding;
if(_f6!=null){
this._focusID=_f6.getID();
}
if(this.isDebugging){
this._oldDOM=DOMSerializer.serialize(UpdateManager.currentDOM,true);
}
}else{
switch(_f2.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_REMOVE:
DocumentManager.detachBindings(_f2);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_f2,false);
break;
}
}
},_afterUpdate:function(_f7){
var _f8=(_f7==document.documentElement);
if(_f8){
var _f9=this._elementsbuffer;
if(_f9.hasEntries()){
_f9.each(function(_fa){
DocumentManager.attachBindings(_fa);
});
}
this._isUpdating=false;
Application.unlock(this);
var _fb=UserInterface.getBinding(document.body);
if(_fb!=null){
var _fc=_fb.getDescendantBindingByType(PageBinding);
if(_fc!=null){
_fc.onAfterUpdates();
}
}
var _fd=FocusBinding.focusedBinding;
if(_fd==null){
var _fe=document.getElementById(this._focusID);
if(_fe!=null){
var _fd=UserInterface.getBinding(_fe);
if(_fd!=null){
_fd.focus();
}
}
}
this._focusID=null;
if(UpdateManager.summary!=""){
if(this.isDebugging){
var _ff=DOMSerializer.serialize(UpdateManager.currentDOM,true);
var _100="NEW DOM: "+document.title+"\n\n"+_ff+"\n\n";
_100+="OLD DOM: "+document.title+"\n\n"+this._oldDOM;
this._logger.debug(_100);
this._oldDOM=null;
}
this._logger.fine(UpdateManager.summary);
}
}else{
switch(_f7.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_INSERT:
if(_f7.__isAttached!==false){
this._elementsbuffer.add(_f7);
}
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_f7,true);
break;
}
switch(_f7.id){
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
var _fd=UserInterface.getBinding(_f7);
while(_fd==null&&_f7!=null){
_fd=UserInterface.getBinding(_f7);
_f7=_f7.parentNode;
}
if(_fd!=null){
_fd.dispatchAction(Binding.ACTION_UPDATED);
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
},_backupattributes:function(_102,_103){
var _104=UserInterface.getBinding(_102);
if(_104!=null){
if(_103){
var _105=this._attributesbuffer;
var map=new Map();
_105.each(function(name,old){
var now=_102.getAttribute(name);
if(now!=null){
if(now!=old){
map.set(name,Types.castFromString(now));
}
}else{
map.set(name,null);
}
});
new List(_102.attributes).each(function(att){
if(att.specified){
if(!_105.has(att.nodeName)){
map.set(att.nodeName,Types.castFromString(att.nodeValue));
}
}
});
map.each(function(name,_10c){
var _10d=_104.propertyMethodMap[name];
if(_10d!=null){
_10d.call(_104,_10c);
}
});
}else{
var map=new Map();
new List(_102.attributes).each(function(att){
if(att.specified){
map.set(att.nodeName,att.nodeValue);
}
});
this._attributesbuffer=map;
}
}
},handleElement:function(_10f,_110){
var _111=window.bindingMap[_10f.getAttribute("id")];
if(_111!=null){
return _111.handleElement(_10f,_110);
}
},updateElement:function(_112,_113){
var _114=window.bindingMap[_112.getAttribute("id")];
if(_114!=null){
return _114.updateElement(_112,_113);
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
this.addFilter(function(_116,list){
var _118=UserInterface.getBinding(_116);
var _119=null;
switch(self.mode){
case DocumentCrawler.MODE_REGISTER:
if(_118==null){
UserInterface.registerBinding(_116);
}
break;
case DocumentCrawler.MODE_ATTACH:
if(_118!=null){
if(!_118.isAttached){
list.add(_118);
}
if(_118.isLazy==true){
_119=NodeCrawler.SKIP_CHILDREN;
}
}
break;
case DocumentCrawler.MODE_DETACH:
if(_118!=null){
list.add(_118);
}
break;
}
return _119;
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
},handleBroadcast:function(_11a,arg){
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
var _11d=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.SELECTSTART:
case DOMEvents.CONTEXTMENU:
if(!this._isTextInputElement(_11d)){
DOMEvents.preventDefault(e);
}
break;
case DOMEvents.CLICK:
if(Client.isExplorer){
if(_11d!=null){
if(_11d.href!=null&&_11d.href.indexOf(Constants.DUMMY_LINK)>-1){
DOMEvents.preventDefault(e);
}
}
}
break;
}
},_resolveCustomBindingMappings:function(){
var _11e=DOMUtil.getElementsByTagName(document.documentElement,"bindingmappingset").item(0);
if(_11e!=null){
var map={};
var _120=DOMUtil.getElementsByTagName(_11e,"bindingmapping");
new List(_120).each(function(_121){
var _122=_121.getAttribute("element");
var _123=_121.getAttribute("binding");
map[_122]=eval(_123);
});
this.setCustomUserInterfaceMapping(new UserInterfaceMapping(map));
}
},setCustomUserInterfaceMapping:function(_124){
if(this.customUserInterfaceMapping==null){
this.customUserInterfaceMapping=_124;
}else{
this.customUserInterfaceMapping.merge(_124);
}
},_registerBindings:function(_125){
var _126=new DocumentCrawler();
_126.mode=DocumentCrawler.MODE_REGISTER;
_126.crawl(_125);
_126.dispose();
},_attachBindings:function(_127){
var _128=new DocumentCrawler();
_128.mode=DocumentCrawler.MODE_ATTACH;
var list=new List();
_128.crawl(_127,list);
var _12a=false;
while(list.hasNext()){
var _12b=list.getNext();
if(!_12b.isAttached){
_12b.onBindingAttach();
if(!_12b.memberDependencies){
_12b.onBindingInitialize();
}
if(Interfaces.isImplemented(IData,_12b)){
_12a=true;
}
}
}
if(_12a){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_128.dispose();
list.dispose();
},attachBindings:function(_12d){
this._registerBindings(_12d);
this._attachBindings(_12d);
},detachBindings:function(_12e,_12f){
var _130=new DocumentCrawler();
_130.mode=DocumentCrawler.MODE_DETACH;
var list=new List();
_130.crawl(_12e,list);
if(_12f==true){
list.extractFirst();
}
var _132=false;
list.reverse().each(function(_133){
if(Interfaces.isImplemented(IData,_133)){
_132=true;
}
_133.dispose(true);
});
if(_132){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_130.dispose();
list.dispose();
},detachAllBindings:function(){
this.detachBindings(document.documentElement);
},computeMaxIndex:function(){
if(this._maxIndex==-1){
this._maxIndex=DOMUtil.getMaxIndex(document);
}
return this._maxIndex++;
},_isTextInputElement:function(_135){
return (/textarea|input/.test(DOMUtil.getLocalName(_135)));
},_makeDocumentUnselectable:function(){
if(Client.isExplorer){
DOMEvents.addEventListener(document,DOMEvents.SELECTSTART,this);
}else{
}
}};
var DocumentManager=new _DocumentManager();
function _DataManager(){
}
_DataManager.prototype={isPostBackFun:false,_logger:SystemLogger.getLogger("DataManager ["+document.title+"]"),_dataBindings:{},isDirty:false,dirty:function(_136){
this.isDirty=true;
var _137=false;
if(_136!=null&&!_136.isDirty){
_136.isDirty=true;
_136.dispatchAction(Binding.ACTION_DIRTY);
_137=true;
}
return _137;
},clean:function(_138){
if(_138.isDirty){
_138.isDirty=false;
}
},registerDataBinding:function(name,_13a){
if(Interfaces.isImplemented(IData,_13a,true)){
if(this._dataBindings[name]!=null){
throw "no proper support for checkbox multiple values! "+name;
}else{
this._dataBindings[name]=_13a;
}
}else{
throw "Invalid DataBinding: "+_13a;
}
},unRegisterDataBinding:function(name){
if(this._dataBindings[name]!=null){
delete this._dataBindings[name];
}
},getDataBinding:function(name){
var _13d=null;
if(this._dataBindings[name]!=null){
_13d=this._dataBindings[name];
}
return _13d;
},getAllDataBindings:function(_13e){
var list=new List();
for(var name in this._dataBindings){
var _141=this._dataBindings[name];
list.add(_141);
if(_13e&&_141 instanceof WindowBinding){
var _142=_141.getContentWindow().DataManager;
if(_142!=null){
list.merge(_142.getAllDataBindings());
}
}
}
return list;
},hasDataBindings:function(){
var _143=false;
for(var name in this._dataBindings){
_143=true;
break;
}
return _143;
},populateDataBindings:function(map){
if(map instanceof DataBindingMap){
map.each(function(name,_147){
var _148=this._dataBindings[name];
if(_148!=null){
switch(map.type){
case DataBindingMap.TYPE_RESULT:
try{
_148.setResult(_147);
}
catch(exception){
if(Application.isDeveloperMode){
alert(_148);
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
var _149=new DataBindingMap();
_149.type=DataBindingMap.TYPE_VALUE;
for(var name in this._dataBindings){
var _14b=this._dataBindings[name];
if(_14b instanceof DataDialogBinding){
throw "DataDialogBinding valuemap not supported!";
}
_149[name]=_14b.getValue();
}
return _149;
},getDataBindingResultMap:function(){
var _14c=new DataBindingMap();
_14c.type=DataBindingMap.TYPE_RESULT;
for(var name in this._dataBindings){
var _14e=this._dataBindings[name];
var res=_14e.getResult();
if(res instanceof DataBindingMap){
res.each(function(name,_151){
_14c.set(name,_151);
});
}else{
_14c.set(name,res);
}
}
return _14c;
},getPostBackString:function(){
var _152="";
var form=document.forms[0];
if(form!=null){
var _154="";
new List(form.elements).each(function(_155){
var name=_155.name;
var _157=encodeURIComponent(_155.value);
switch(_155.type){
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_152+=name+"="+_157+"&";
break;
case "submit":
if(document.activeElement==_155){
_152+=name+"="+_157+"&";
}
break;
case "radio":
if(_155.checked){
_152+=name+"="+_157+"&";
}
break;
case "checkbox":
if(_155.checked){
if(_155.name==_154){
if(_152.lastIndexOf("&")==_152.length-1){
_152=_152.substr(0,_152.length-1);
}
_152+=","+_157;
}else{
_152+=name+"="+_155.value;
}
_154=name;
_152+="&";
}
break;
}
});
}
return _152.substr(0,_152.length-1);
}};
var DataManager=new _DataManager();

