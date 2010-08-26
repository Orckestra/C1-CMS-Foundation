/*
 * Created: 26. august 2010 14:08:21
 */


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
_UpdateAssistant.prototype={_serializer:window.XMLSerializer!=null?new XMLSerializer():null,_parser:window.DOMParser!=null?new DOMParser():null,_activeElement:null,_construct:function(){
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
var _83=_82.responseText;
UpdateManager.pendingResponse=_83;
var dom=UpdateAssistant.parse(_83);
if(dom!=null){
_81.handleResponse(dom);
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
},dispatchEvent:function(_85,_86){
var _87=true;
if(_85.fireEvent!=null){
_87=_85.fireEvent("on"+_86);
}else{
var _88=document.createEvent("UIEvents");
_88.initEvent(_86,true,true);
_87=_85.dispatchEvent(_88);
}
return _87;
},getUpdateZones:function(dom){
var _8a="//*[@id and contains(@class,'updatezone')]";
var _8b=[];
var _8c=null;
var _8d=null;
if(window.XPathResult!=null){
var _8e=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_8c=dom.evaluate(_8a,dom,null,_8e,null);
while((_8d=_8c.iterateNext())!=null){
_8b.push(_8d);
}
}else{
_8c=dom.documentElement.selectNodes(_8a);
Array.forEach(_8c,function(_8f){
_8b.push(_8f);
});
}
return _8b;
},getElementById:function(dom,id){
var _92="//*[@id='"+id+"']";
var _93=null;
var _94=null;
if(window.XPathResult!=null){
var _95=XPathResult.FIRST_ORDERED_NODE_TYPE;
_93=dom.evaluate(_92,dom,null,_95,null);
_94=_93.singleNodeValue;
}else{
_94=dom.documentElement.selectNodes(_92)[0];
}
return _94;
},_getIds:function(dom){
var _97="//*[@id]";
var _98=null;
var _99=[];
if(window.XPathResult!=null){
var _9a=XPathResult.ORDERED_NODE_ITERATOR_TYPE;
_98=dom.evaluate(_97,dom,null,_9a,null);
while((element=_98.iterateNext())!=null){
_99.push(element.getAttribute("id"));
}
}else{
_98=dom.documentElement.selectNodes(_97);
Array.forEach(_98,function(_9b){
_99.push(_9b.getAttribute("id"));
});
}
return _99;
},toHTMLElement:function(_9c){
var _9d=this.serialize(_9c);
var _9e=document.createElement("temp");
_9e.innerHTML=_9d;
return _9e.firstChild;
},getActiveElement:function(){
var _9f=document.activeElement;
if(_9f==null||_9f==document.body){
_9f=this._activeElement;
}
return _9f;
},serialize:function(_a0){
var _a1=null;
if(this._serializer!=null){
_a1=this._serializer.serializeToString(_a0);
}else{
_a1=_a0.xml;
}
return _a1;
},hasDifferences:function(_a2,_a3){
var s1=null;
var s2=null;
if(this._serializer!=null){
s1=this._serializer.serializeToString(_a2);
s2=this._serializer.serializeToString(_a3);
}else{
s1=_a2.xml;
s2=_a3.xml;
}
return s1!=s2;
},parse:function(_a6){
var _a7=null;
if(this._parser!=null){
_a7=this._parser.parseFromString(_a6,"text/xml");
}else{
_a7=new ActiveXObject("Msxml2.DOMDocument.3.0");
_a7.setProperty("SelectionLanguage","XPath");
_a7.loadXML(_a6);
}
return this._validate(_a7);
},_validate:function(dom){
var out=null;
if(dom.parseError!=null&&dom.parseError.errorCode!=0){
out=dom.parseError.reason;
}else{
var _aa=dom.getElementsByTagName("parsererror").item(0);
if(_aa!=null){
out=_aa.textContent.replace(/\^/g,"").replace(/\-/g,"");
}
}
if(out==null){
var has={},ids=this._getIds(dom);
ids.every(function(id){
var _ae=!has[id];
has[id]=true;
if(!_ae){
out="Element \""+id+"\" encountered twice.";
}
return _ae;
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
this.handleElement=function(_af,_b0){
var _b1=false;
switch(_af.nodeName.toLowerCase()){
case "input":
case "textarea":
switch(_af.getAttribute("id")){
case "__EVENTTARGET":
case "__EVENTARGUMENT":
case "__VIEWSTATE":
case "__EVENTVALIDATION":
_b1=false;
break;
}
break;
}
return _b1;
};
this.updateElement=function(_b2,_b3){
var id=_b2.getAttribute("id");
var _b5=document.getElementById(id);
if(_b5!=null){
var _b6=null;
switch(_b5.nodeName.toLowerCase()){
case "input":
_b6=_b2.getAttribute("value");
break;
case "textarea":
_b6=_b2.textContent?_b2.textContent:_b2.text;
break;
}
if(_b6==null){
_b6="";
}
if(_b6!=_b5.value){
_b5.value=_b6;
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
},_beforeUpdate:function(_b7){
var _b8=true;
if(_b7!=null){
_b7.__updateType=this.type;
_b8=UpdateAssistant.dispatchEvent(_b7,Update.EVENT_BEFOREUPDATE);
}
return _b8;
},_afterUpdate:function(_b9){
var _ba=true;
if(_b9!=null){
_b9.__updateType=this.type;
_ba=UpdateAssistant.dispatchEvent(_b9,Update.EVENT_AFTERUPDATE);
}
return _ba;
}};
ReplaceUpdate.prototype=new Update();
ReplaceUpdate.superclass=Update.prototype;
function ReplaceUpdate(id,_bc){
this.type=Update.TYPE_REPLACE;
this.id=id;
this.element=_bc;
return this;
}
ReplaceUpdate.prototype.update=function(){
var _bd,_be,_bf=UpdateAssistant.toHTMLElement(this.element);
if((_bd=document.getElementById(this.id))!=null){
if((_be=_bd.parentNode)!=null){
if(this._beforeUpdate(_bd)){
_be.replaceChild(_bf,_bd);
this._afterUpdate(_bf);
}
}
}else{
UpdateManager.error("Element null point: "+this.id);
}
};
ReplaceUpdate.prototype._afterUpdate=function(_c0){
var _c1=ReplaceUpdate.superclass._afterUpdate.call(this,_c0);
UpdateManager.report("Replaced element id=\""+this.id+"\"");
if(_c0.nodeName=="form"||_c0.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
return _c1;
};
SiblingUpdate.prototype=new Update();
SiblingUpdate.superclass=Update.prototype;
function SiblingUpdate(_c2,id,_c4,_c5){
this.type=_c2;
this.id=id;
this.element=_c4;
this.isFirst=_c5;
return this;
}
SiblingUpdate.prototype.update=function(){
var _c6=document.getElementById(this.id);
switch(this.type){
case Update.TYPE_REMOVE:
this._remove(_c6);
break;
case Update.TYPE_INSERT:
this._insert(this.element,_c6);
break;
}
};
SiblingUpdate.prototype._remove=function(_c7){
var _c8=_c7.parentNode;
if(_c8!=null){
if(this._beforeUpdate(_c7)){
_c8.removeChild(_c7);
this._afterUpdate(_c8);
}
}
};
SiblingUpdate.prototype._insert=function(_c9,_ca){
var _cb=UpdateAssistant.toHTMLElement(_c9);
if(this.isFirst){
var _cc=_ca;
if(_cc!=null){
if(this._beforeUpdate(_cc)){
_cc.insertBefore(_cb,_cc.firstChild);
this._afterUpdate(_cb);
}
}
}else{
var _cc=_ca.parentNode;
if(_cc!=null){
if(this._beforeUpdate(_cc)){
_cc.insertBefore(_cb,_ca.nextSibling);
this._afterUpdate(_cb);
}
}
}
};
SiblingUpdate.prototype._beforeUpdate=function(_cd){
var _ce=SiblingUpdate.superclass._beforeUpdate.call(this,_cd);
if(this.type==Update.TYPE_REMOVE){
UpdateManager.report("Removed element id=\""+_cd.id+"\"");
}
return _ce;
};
SiblingUpdate.prototype._afterUpdate=function(_cf){
var _d0=true;
if(_cf!=null){
_d0=SiblingUpdate.superclass._afterUpdate.call(this,_cf);
if(this.type==Update.TYPE_INSERT){
UpdateManager.report("Inserted element id=\""+_cf.id+"\"");
if(_cf.nodeName=="form"||_cf.getElementsByTagName("form").item(0)!=null){
UpdateManager.setupForms();
}
}
}
return _d0;
};
AttributesUpdate.prototype=new Update();
AttributesUpdate.superclass=Update.prototype;
AttributesUpdate.prototype.currentElement=null;
function AttributesUpdate(id,_d2,_d3){
this.type=type=Update.TYPE_ATTRIBUTES;
this.id=id;
this.element=_d2;
this.currentElement=_d3;
this._summary=[];
return this;
}
AttributesUpdate.prototype.update=function(){
var _d4=document.getElementById(this.id);
if(this._beforeUpdate(_d4)){
this._updateAttributes(_d4);
this._afterUpdate(_d4);
}
};
AttributesUpdate.prototype._updateAttributes=function(_d5){
Array.forEach(this.element.attributes,function(_d6){
var _d7=this.currentElement.getAttribute(_d6.nodeName);
if(_d7==null||_d7!=_d6.nodeValue){
this._setAttribute(_d5,_d6.nodeName,_d6.nodeValue);
this._summary.push("@"+_d6.nodeName);
}
},this);
Array.forEach(this.currentElement.attributes,function(_d8){
if(this.element.getAttribute(_d8.nodeName)==null){
this._setAttribute(_d5,_d8.nodeName,null);
this._summary.push("@"+_d8.nodeName);
}
},this);
};
AttributesUpdate.prototype._setAttribute=function(_d9,_da,_db){
if(_d9==null){
alert(this.id+": "+document.getElementById(this.id)+"\n\n"+_da+"="+_db);
SystemLogger.getLogger("AttributesUpdate").fine(document.body.innerHTML);
}
var _dc=(_db==null);
if(_dc){
_d9.removeAttribute(_da);
}else{
_d9.setAttribute(_da,_db);
}
if(document.all!=null){
if(_dc){
_db="";
}
switch(_da.toLowerCase()){
case "class":
_d9.className=_db;
break;
case "disabled":
_d9.disabled=!_dc;
break;
case "checked":
_d9.checked=!_dc;
break;
case "readonly":
_d9.readOnly=!_dc;
break;
}
}
};
AttributesUpdate.prototype._afterUpdate=function(_dd){
AttributesUpdate.superclass._afterUpdate.call(this,_dd);
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
_WindowManager.prototype={WINDOW_LOADED_BROADCAST:null,WINDOW_UNLOADED_BROADCAST:null,WINDOW_EVALUATED_BROADCAST:null,WINDOW_RESIZED_BROADCAST:null,isWindowLoaded:false,_logger:SystemLogger.getLogger("WindowManager ["+document.title+"]"),_ondomstatements:new List(),_onloadstatements:new List(),_onresizestatements:new List(),_currentDimensions:null,_newDimensions:null,_broadcastTimeout:null,_isHorizontalResize:false,_isVerticalResize:false,_broadcastTimeout:null,_compute:function(_de,key){
return _de.replace("${windowkey}",document.location+":"+key);
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
var _e2=this._newDimensions.w!=this._currentDimensions.w;
var _e3=this._newDimensions.h!=this._currentDimensions.h;
if(_e2||_e3){
if(this._broadcastTimeout!=null){
clearTimeout(this._broadcastTimeout);
this._broadcastTimeout=null;
}
var _e4=this;
this._broadcastTimeout=setTimeout(function(){
_e4._broadcastResizeEvent();
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
},fireOnDOM:function(_e5){
if(Interfaces.isImplemented(IDOMHandler,_e5,true)){
this._ondomstatements.add(_e5);
}
},fireOnLoad:function(_e6){
if(Interfaces.isImplemented(ILoadHandler,_e6,true)){
this._onloadstatements.add(_e6);
}
},fireOnResize:function(_e7){
if(Interfaces.isImplemented(IResizeHandler,_e7,true)){
this._onresizestatements.add(_e7);
}
},onDOMContentLoaded:function(){
while(this._ondomstatements.hasNext()){
this._ondomstatements.getNext().fireOnDOM();
}
},getWindowDimensions:function(){
return new Dimension(Client.isMozilla?window.innerWidth:document.body.clientWidth,Client.isMozilla?window.innerHeight:document.body.clientHeight);
},evaluate:function(_e8){
return eval(_e8);
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
if(Client.isMozilla){
UpdateAssistant.serialize=function(_e9){
_e9=_e9.cloneNode(true);
_e9.setAttributeNS(Constants.NS_NS,"xmlns",Constants.NS_XHTML);
_e9.setAttributeNS(Constants.NS_NS,"xmlns:ui",Constants.NS_UI);
return this._serializer.serializeToString(_e9);
};
}
},handleEvent:function(e){
var _eb=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.BEFOREUPDATE:
this._beforeUpdate(_eb);
break;
case DOMEvents.AFTERUPDATE:
this._afterUpdate(_eb);
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
},_beforeUpdate:function(_ec){
var _ed=(_ec==document.documentElement);
if(_ed){
this._elementsbuffer=new List();
this._isUpdating=true;
Application.lock(this);
var _ee=UserInterface.getBinding(document.body);
if(_ee!=null){
var _ef=_ee.getDescendantBindingByType(PageBinding);
if(_ef!=null){
_ef.onBeforeUpdates();
}
}
var _f0=FocusBinding.focusedBinding;
if(_f0!=null){
this._focusID=_f0.getID();
}
if(this.isDebugging){
this._oldDOM=DOMSerializer.serialize(UpdateManager.currentDOM,true);
}
}else{
switch(_ec.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_REMOVE:
DocumentManager.detachBindings(_ec);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_ec,false);
break;
}
}
},_afterUpdate:function(_f1){
var _f2=(_f1==document.documentElement);
if(_f2){
var _f3=this._elementsbuffer;
if(_f3.hasEntries()){
_f3.each(function(_f4){
DocumentManager.attachBindings(_f4);
});
}
this._isUpdating=false;
Application.unlock(this);
var _f5=UserInterface.getBinding(document.body);
if(_f5!=null){
var _f6=_f5.getDescendantBindingByType(PageBinding);
if(_f6!=null){
_f6.onAfterUpdates();
}
}
var _f7=FocusBinding.focusedBinding;
if(_f7==null){
var _f8=document.getElementById(this._focusID);
if(_f8!=null){
var _f7=UserInterface.getBinding(_f8);
if(_f7!=null){
_f7.focus();
}
}
}
this._focusID=null;
if(UpdateManager.summary!=""){
if(this.isDebugging){
var _f9=DOMSerializer.serialize(UpdateManager.currentDOM,true);
var _fa="NEW DOM: "+document.title+"\n\n"+_f9+"\n\n";
_fa+="OLD DOM: "+document.title+"\n\n"+this._oldDOM;
this._logger.debug(_fa);
this._oldDOM=null;
}
this._logger.fine(UpdateManager.summary);
}
}else{
switch(_f1.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_INSERT:
this._elementsbuffer.add(_f1);
break;
case Update.TYPE_ATTRIBUTES:
this._backupattributes(_f1,true);
break;
}
switch(_f1.id){
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
var _f7=UserInterface.getBinding(_f1);
while(_f7==null&&_f1!=null){
_f7=UserInterface.getBinding(_f1);
_f1=_f1.parentNode;
}
if(_f7!=null){
_f7.dispatchAction(Binding.ACTION_UPDATED);
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
},_backupattributes:function(_fc,_fd){
var _fe=UserInterface.getBinding(_fc);
if(_fe!=null){
if(_fd){
var _ff=this._attributesbuffer;
var map=new Map();
_ff.each(function(name,old){
var now=_fc.getAttribute(name);
if(now!=null){
if(now!=old){
map.set(name,Types.castFromString(now));
}
}else{
map.set(name,null);
}
});
new List(_fc.attributes).each(function(att){
if(att.specified){
if(!_ff.has(att.nodeName)){
map.set(att.nodeName,Types.castFromString(att.nodeValue));
}
}
});
map.each(function(name,_106){
var _107=_fe.propertyMethodMap[name];
if(_107!=null){
_107.call(_fe,_106);
}
});
}else{
var map=new Map();
new List(_fc.attributes).each(function(att){
if(att.specified){
map.set(att.nodeName,att.nodeValue);
}
});
this._attributesbuffer=map;
}
}
},handleElement:function(_109,_10a){
var _10b=window.bindingMap[_109.getAttribute("id")];
if(_10b!=null){
return _10b.handleElement(_109,_10a);
}
},updateElement:function(_10c,_10d){
var _10e=window.bindingMap[_10c.getAttribute("id")];
if(_10e!=null){
return _10e.updateElement(_10c,_10d);
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
this.addFilter(function(_110,list){
var _112=UserInterface.getBinding(_110);
var _113=null;
switch(self.mode){
case DocumentCrawler.MODE_REGISTER:
if(_112==null){
UserInterface.registerBinding(_110);
}
break;
case DocumentCrawler.MODE_ATTACH:
if(_112!=null){
if(!_112.isAttached){
list.add(_112);
}
if(_112.isLazy==true){
_113=NodeCrawler.SKIP_CHILDREN;
}
}
break;
case DocumentCrawler.MODE_DETACH:
if(_112!=null){
list.add(_112);
}
break;
}
return _113;
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
},handleBroadcast:function(_114,arg){
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
var _117=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.SELECTSTART:
case DOMEvents.CONTEXTMENU:
if(!this._isTextInputElement(_117)){
DOMEvents.preventDefault(e);
}
break;
case DOMEvents.CLICK:
if(Client.isExplorer){
if(_117.href&&_117.href.indexOf(Constants.DUMMY_LINK)>-1){
DOMEvents.preventDefault(e);
}
}
break;
}
},_resolveCustomBindingMappings:function(){
var _118=DOMUtil.getElementsByTagName(document.documentElement,"bindingmappingset").item(0);
if(_118!=null){
var map={};
var _11a=DOMUtil.getElementsByTagName(_118,"bindingmapping");
new List(_11a).each(function(_11b){
var _11c=_11b.getAttribute("element");
var _11d=_11b.getAttribute("binding");
map[_11c]=eval(_11d);
});
this.setCustomUserInterfaceMapping(new UserInterfaceMapping(map));
}
},setCustomUserInterfaceMapping:function(_11e){
if(this.customUserInterfaceMapping==null){
this.customUserInterfaceMapping=_11e;
}else{
this.customUserInterfaceMapping.merge(_11e);
}
},_registerBindings:function(_11f){
var _120=new DocumentCrawler();
_120.mode=DocumentCrawler.MODE_REGISTER;
_120.crawl(_11f);
_120.dispose();
},_attachBindings:function(_121){
var _122=new DocumentCrawler();
_122.mode=DocumentCrawler.MODE_ATTACH;
var list=new List();
_122.crawl(_121,list);
var _124=false;
while(list.hasNext()){
var _125=list.getNext();
if(!_125.isAttached){
_125.onBindingAttach();
if(!_125.memberDependencies){
_125.onBindingInitialize();
}
if(Interfaces.isImplemented(IData,_125)){
_124=true;
}
}
}
if(_124){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_122.dispose();
list.dispose();
},attachBindings:function(_127){
this._registerBindings(_127);
this._attachBindings(_127);
},detachBindings:function(_128,_129){
var _12a=new DocumentCrawler();
_12a.mode=DocumentCrawler.MODE_DETACH;
var list=new List();
_12a.crawl(_128,list);
if(_129==true){
list.extractFirst();
}
var _12c=false;
list.reverse().each(function(_12d){
if(Interfaces.isImplemented(IData,_12d)){
_12c=true;
}
_12d.dispose(true);
});
if(_12c){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_12a.dispose();
list.dispose();
},detachAllBindings:function(){
this.detachBindings(document.documentElement);
},computeMaxIndex:function(){
if(this._maxIndex==-1){
this._maxIndex=DOMUtil.getMaxIndex(document);
}
return this._maxIndex++;
},_isTextInputElement:function(_12f){
return (/textarea|input/.test(DOMUtil.getLocalName(_12f)));
},_makeDocumentUnselectable:function(){
if(Client.isExplorer){
DOMEvents.addEventListener(document,DOMEvents.SELECTSTART,this);
}else{
}
}};
var DocumentManager=new _DocumentManager();
function _DataManager(){
}
_DataManager.prototype={isPostBackFun:false,_logger:SystemLogger.getLogger("DataManager ["+document.title+"]"),_dataBindings:{},isDirty:false,dirty:function(_130){
this.isDirty=true;
var _131=false;
if(_130!=null&&!_130.isDirty){
_130.isDirty=true;
_130.dispatchAction(Binding.ACTION_DIRTY);
_131=true;
}
return _131;
},clean:function(_132){
if(_132.isDirty){
_132.isDirty=false;
}
},registerDataBinding:function(name,_134){
if(Interfaces.isImplemented(IData,_134,true)){
if(this._dataBindings[name]!=null){
throw "no proper support for checkbox multiple values! "+name;
}else{
this._dataBindings[name]=_134;
}
}else{
throw "Invalid DataBinding: "+_134;
}
},unRegisterDataBinding:function(name){
if(this._dataBindings[name]!=null){
delete this._dataBindings[name];
}
},getDataBinding:function(name){
var _137=null;
if(this._dataBindings[name]!=null){
_137=this._dataBindings[name];
}
return _137;
},getAllDataBindings:function(_138){
var list=new List();
for(var name in this._dataBindings){
var _13b=this._dataBindings[name];
list.add(_13b);
if(_138&&_13b instanceof WindowBinding){
var _13c=_13b.getContentWindow().DataManager;
if(_13c!=null){
list.merge(_13c.getAllDataBindings());
}
}
}
return list;
},hasDataBindings:function(){
var _13d=false;
for(var name in this._dataBindings){
_13d=true;
break;
}
return _13d;
},populateDataBindings:function(map){
if(map instanceof DataBindingMap){
map.each(function(name,_141){
var _142=this._dataBindings[name];
if(_142!=null){
switch(map.type){
case DataBindingMap.TYPE_RESULT:
try{
_142.setResult(_141);
}
catch(exception){
if(Application.isDeveloperMode){
alert(_142);
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
var _143=new DataBindingMap();
_143.type=DataBindingMap.TYPE_VALUE;
for(var name in this._dataBindings){
var _145=this._dataBindings[name];
if(_145 instanceof DataDialogBinding){
throw "DataDialogBinding valuemap not supported!";
}
_143[name]=_145.getValue();
}
return _143;
},getDataBindingResultMap:function(){
var _146=new DataBindingMap();
_146.type=DataBindingMap.TYPE_RESULT;
for(var name in this._dataBindings){
var _148=this._dataBindings[name];
var res=_148.getResult();
if(res instanceof DataBindingMap){
res.each(function(name,_14b){
_146.set(name,_14b);
});
}else{
_146.set(name,res);
}
}
return _146;
},getPostBackString:function(){
var _14c="";
var form=document.forms[0];
if(form!=null){
var _14e="";
new List(form.elements).each(function(_14f){
var name=_14f.name;
var _151=encodeURIComponent(_14f.value);
switch(_14f.type){
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_14c+=name+"="+_151+"&";
break;
case "submit":
if(document.activeElement==_14f){
_14c+=name+"="+_151+"&";
}
break;
case "radio":
if(_14f.checked){
_14c+=name+"="+_151+"&";
}
break;
case "checkbox":
if(_14f.checked){
if(_14f.name==_14e){
if(_14c.lastIndexOf("&")==_14c.length-1){
_14c=_14c.substr(0,_14c.length-1);
}
_14c+=","+_151;
}else{
_14c+=name+"="+_14f.value;
}
_14e=name;
_14c+="&";
}
break;
}
});
}
return _14c.substr(0,_14c.length-1);
}};
var DataManager=new _DataManager();

