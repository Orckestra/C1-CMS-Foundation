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
}else{
this.error("Not an XHTML document!");
}
},_setup:function(){
this.setupForms();
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
},setupForms:function(){
Array.forEach(document.forms,function(_8){
if(_8.className.indexOf(this.CLASSNAME_FORM)>-1){
if(!_8.__isSetup){
this._setupForm(_8);
_8.__isSetup=true;
}
}
},this);
},_setupForm:function(_9){
var _a=this;
this._addListener(_9,"submit");
_9.__submit=_9.submit;
_9.submit=function(){
if(_a.isEnabled){
_a._submit(_9);
}else{
_9.__submit();
}
return false;
};
},_addListener:function(_b,_c){
if(_b.addEventListener!=null){
_b.addEventListener(_c,this,false);
}else{
var _d=this;
_b.attachEvent("on"+_c,function(){
_d.handleEvent(window.event);
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
var _f=e.target?e.target:e.srcElement;
this._submit(_f);
}
break;
}
},_submit:function(_10){
if(!this.isUpdating){
this.isUpdating=true;
UpdateAssistant.dispatchEvent(document.documentElement,this.EVENT_BEFOREUPDATE);
this._postRequest(_10);
}
},handleResponse:function(dom){
this.summary=new String("");
this.errors=new String("");
if(dom!=null){
var _12=UpdateAssistant.getUpdateZones(dom);
var _13=UpdateAssistant.getUpdateZones(this.currentDOM);
this._updates=[];
this._replaced={};
_12.forEach(function(_14,_15){
var _16=_13[_15];
this._crawl(_14,_16);
},this);
this._updates.forEach(function(_17,_18){
_17.update();
_17.dispose();
},this);
this._dotnetnames.forEach(function(_19){
this._fixdotnet(dom,_19);
},this);
this.currentDOM=dom;
}
this.isUpdating=false;
UpdateAssistant.dispatchEvent(document.documentElement,this.EVENT_AFTERUPDATE);
},handleSimilarResponse:function(){
UpdateAssistant.dispatchEvent(document.documentElement,this.EVENT_AFTERUPDATE);
},_crawl:function(_1a,_1b,_1c,id){
var _1e=true;
var _1f=_1b.getAttribute("class");
if(_1f==null||_1f.indexOf(this.CLASSNAME_GONE)==-1){
if(_1b.nodeType==Node.ELEMENT_NODE){
var _20=_1b.getAttribute("id");
if(_20!=null){
_1c=_1a;
id=_20;
}
}
if(_1e=this._check(_1a,_1b,_1c,id)){
var _21=_1a.firstChild;
var _22=_1b.firstChild;
while(_21!=null&&_22!=null&&!this._replaced[id]){
switch(_21.nodeType){
case Node.TEXT_NODE:
_1e=this._check(_21,_22,_1c,id);
break;
case Node.DOCUMENT_NODE:
case Node.ELEMENT_NODE:
_1e=this._crawl(_21,_22,_1c,id);
break;
}
if(this._replaced[id]){
_1e=false;
}else{
_21=_21.nextSibling;
_22=_22.nextSibling;
}
}
}
}
return _1e;
},_check:function(_23,_24,_25,id){
var _27=true;
var _28=null;
var _29=false;
var _2a=false;
if((_23!=null&&_24==null)||(_23==null&&_24!=null)){
_27=false;
}else{
if(_27=_23.nodeType==_24.nodeType){
switch(_24.nodeType){
case Node.ELEMENT_NODE:
if(_23.namespaceURI!=_24.namespaceURI||_23.nodeName!=_24.nodeName){
_27=false;
}else{
if(_27=(_23.nodeName==_24.nodeName)){
var _2b=_24.getAttribute("id");
var _2c=_23.getAttribute("id");
if(_2b!=null&&_2c!=null){
if(_2b!=_2c){
_27=false;
}else{
if((_28=this._getPlugin(_23,_24))!=null){
if(_28.updateElement(_23,_24)){
_2a=true;
_27=false;
}
}
}
}
if(_27){
if(_27=this._checkAttributes(_23,_24)){
if(this.hasSoftSiblings&&this._hasSoftChildren(_23)&&this._hasSoftChildren(_24)){
if(this._validateSoftChildren(_23,_24)){
this._updateSoftChildren(_23,_24);
_29=true;
}
_27=false;
}else{
_27=_23.childNodes.length==_24.childNodes.length;
}
}
}
}
}
break;
case Node.TEXT_NODE:
if(_23.data.trim()!=_24.data.trim()){
_27=false;
}
break;
}
}
}
if(_27==false&&!_29&&!_2a){
if(id!=null&&_25!=null){
this.addUpdate(new ReplaceUpdate(id,_25));
}
}
return _27;
},_checkAttributes:function(_2d,_2e){
var _2f=true;
var _30=false;
var _31=_2d.attributes;
var _32=_2e.attributes;
if(_31.length!=_32.length){
_30=true;
}else{
_30=!Array.every(_31,function(_33,i){
var _35=_32.item(i);
return _33.nodeName==_35.nodeName&&_33.nodeValue==_35.nodeValue;
});
}
if(_30){
var _36=_2d.getAttribute("id");
var _37=_2e.getAttribute("id");
if(this.hasSoftAttributes&&_36!=null&&_36==_37){
this.addUpdate(new AttributesUpdate(_37,_2d,_2e));
}else{
_2f=false;
}
}
return _2f;
},_hasSoftChildren:function(_38){
var _39=true;
if(_38.hasChildNodes()){
_39=Array.every(_38.childNodes,function(_3a){
var res=true;
switch(_3a.nodeType){
case Node.TEXT_NODE:
res=!/[^\t\n\r ]/.test(_3a.nodeValue);
break;
case Node.ELEMENT_NODE:
res=_3a.getAttribute("id")!=null;
break;
}
return res;
});
}
return _39;
},_validateSoftChildren:function(_3c,_3d){
var _3e=true;
var _3f=-1;
var _40=-1;
var _41=-1;
var _42=this._toMap(_3c.childNodes,true);
var _43=this._toMap(_3d.childNodes,true);
for(var id in _43){
if(_3e){
var _45=_43[id];
_3e=_45>=_3f;
if(_42[id]!=null){
_41=_42[id];
_3e=_41>=_40;
}
}
_3f=_45;
if(_41>-1){
_40=_41;
}
}
return _3e;
},_updateSoftChildren:function(_46,_47){
var _48=this._toMap(_46.childNodes);
var _49=this._toMap(_47.childNodes);
for(var id in _49){
if(_48[id]==null){
this.addUpdate(new SiblingUpdate(Update.TYPE_REMOVE,id,null,null));
}else{
this._crawl(_48[id],_49[id]);
}
}
var _4b=null;
for(id in _48){
if(_49[id]==null){
var _4c=_48[id];
if(_4b==null){
var _4d=_47.getAttribute("id");
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_4d,_4c,true));
}else{
this.addUpdate(new SiblingUpdate(Update.TYPE_INSERT,_4b,_4c,false));
}
}
_4b=id;
}
},addUpdate:function(_4e){
this._updates.push(_4e);
if(_4e instanceof ReplaceUpdate){
this._replaced[_4e.id]=true;
}
},_getPlugin:function(_4f,_50){
var _51=null;
this.plugins.every(function(_52){
if(_52.handleElement(_4f,_50)){
_51=_52;
}
return _51==null;
});
return _51;
},_toMap:function(_53,_54){
var _55={};
Array.forEach(_53,function(_56,_57){
if(_56.nodeType==Node.ELEMENT_NODE){
_55[_56.getAttribute("id")]=_54?_57:_56;
}
});
return _55;
},_getPost:function(_58){
var _59=new String("");
if(_58!=null){
var _5a="";
Array.forEach(_58.elements,function(_5b){
var _5c=_5b.name;
var _5d=encodeURIComponent(_5b.value);
switch(_5b.type){
case "button":
case "submit":
var _5e=UpdateAssistant.getActiveElement();
if(_5b==_5e&&_5c!=""){
_59+=_5c+"="+_5d+"&";
}
break;
case "radio":
if(_5b.checked){
_59+=_5c+"="+_5d+"&";
}
break;
case "checkbox":
if(_5b.checked){
if(_5b.name==_5a){
if(_59.lastIndexOf("&")==_59.length-1){
_59=_59.substr(0,_59.length-1);
}
_59+=","+_5d;
}else{
_59+=_5c+"="+_5b.value;
}
_5a=_5c;
_59+="&";
}
break;
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_59+=_5c+"="+_5d+"&";
break;
}
});
}
return _59.substr(0,_59.length-1);
},_postRequest:function(_5f){
var _60=_5f.method!=""?_5f.method:"get";
var _61=_5f.action!=""?_5f.action:window.location.toString();
var _62=this._getPost(_5f);
if(_60=="get"){
if(_61.indexOf("?")>-1){
_61=_61+"&"+_62;
}else{
_61+"?"+_62;
}
}
var _63=this;
var _64=UpdateAssistant.getXMLHttpRequest(_60,_61,this);
if(_60=="post"){
_64.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
}
_64.send(_60=="post"?_62:null);
},_fixdotnet:function(dom,id){
var _67=document.getElementById(id);
if(_67!=null){
var _68=UpdateAssistant.getElementById(dom,id);
if(_68!=null){
var _69=_68.getAttribute("value");
if(_69!==_67.value){
_67.value=_69;
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
},report:function(_6c){
this.summary+=_6c+"\n";
}};
var UpdateManager=new _UpdateManager();
function _UpdateAssistant(){
var _6d=null;
if(!window.UpdateAssistant){
this._construct();
_6d=this;
}
return _6d;
}
_UpdateAssistant.prototype={_serializer:window.XMLSerializer!=null?new XMLSerializer():null,_parser:window.DOMParser!=null?new DOMParser():null,_activeElement:null,_construct:function(){
if(!window.Node){
window.Node={ELEMENT_NODE:1,TEXT_NODE:3,DOCUMENT_NODE:9};
}
if(!Array.every){
Array.every=function(_6e,fun){
var _70=true;
var len=_6e.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _72=arguments[2];
for(var i=0;i<len;i++){
if(typeof _6e[i]!="undefined"){
if(!fun.call(_72,_6e[i],i,_6e)){
_70=false;
break;
}
}
}
}
return _70;
};
}
if(!Array.prototype.every){
Array.prototype.every=function(fun){
var _75=arguments[1];
return Array.every(this,fun,_75);
};
}
if(!Array.forEach){
Array.forEach=function(_76,fun){
var len=_76.length>>>0;
if(typeof fun!="function"){
throw new TypeError();
}else{
var _79=arguments[2];
for(var i=0;i<len;i++){
if(typeof _76[i]!="undefined"){
fun.call(_79,_76[i],i,_76);
}
}
}
};
}
if(!Array.prototype.forEach){
Array.prototype.forEach=function(fun){
var _7c=arguments[1];
Array.forEach(this,fun,_7c);
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
},getXMLHttpRequest:function(_7e,_7f,_80){
var _81=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Msxml2.XMLHTTP.3.0");
if(_81!=null){
_81.open(_7e,_7f,(_80!=null?true:false));
if(_80!=null){
var _82=this;
_81.onreadystatechange=function(){
if(_81.readyState==4){
var _83=_81.responseText;
UpdateManager.pendingResponse=_83;
var dom=_82.parse(_83);
if(dom!=null){
_80.handleResponse(dom);
}
}
};
}
}
return _81;
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
}
},_beforeUpdate:function(_ec){
var _ed=(_ec==document.documentElement);
if(_ed){
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
this._isUpdating=false;
Application.unlock(this);
var _f3=UserInterface.getBinding(document.body);
if(_f3!=null){
var _f4=_f3.getDescendantBindingByType(PageBinding);
if(_f4!=null){
_f4.onAfterUpdates();
}
}
var _f5=FocusBinding.focusedBinding;
if(_f5==null){
var _f6=document.getElementById(this._focusID);
if(_f6!=null){
var _f5=UserInterface.getBinding(_f6);
if(_f5!=null){
_f5.focus();
}
}
}
this._focusID=null;
if(UpdateManager.summary!=""){
if(this.isDebugging){
var _f7=DOMSerializer.serialize(UpdateManager.currentDOM,true);
var _f8="NEW DOM: "+document.title+"\n\n"+_f7+"\n\n";
_f8+="OLD DOM: "+document.title+"\n\n"+this._oldDOM;
this._logger.debug(_f8);
this._oldDOM=null;
}
this._logger.fine(UpdateManager.summary);
}
}else{
switch(_f1.__updateType){
case Update.TYPE_REPLACE:
case Update.TYPE_INSERT:
DocumentManager.attachBindings(_f1);
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
var _f5=UserInterface.getBinding(_f1);
while(_f5==null&&_f1!=null){
_f5=UserInterface.getBinding(_f1);
_f1=_f1.parentNode;
}
if(_f5!=null){
_f5.dispatchAction(Binding.ACTION_UPDATED);
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
},_backupattributes:function(_fa,_fb){
var _fc=UserInterface.getBinding(_fa);
if(_fc!=null){
if(_fb){
var _fd=this._attributesbuffer;
var map=new Map();
_fd.each(function(_ff,old){
var now=_fa.getAttribute(_ff);
if(now!=null){
if(now!=old){
map.set(_ff,Types.castFromString(now));
}
}else{
map.set(_ff,null);
}
});
new List(_fa.attributes).each(function(att){
if(att.specified){
if(!_fd.has(att.nodeName)){
map.set(att.nodeName,Types.castFromString(att.nodeValue));
}
}
});
map.each(function(name,_104){
var _105=_fc.propertyMethodMap[name];
if(_105!=null){
_105.call(_fc,_104);
}
});
}else{
var map=new Map();
new List(_fa.attributes).each(function(att){
if(att.specified){
map.set(att.nodeName,att.nodeValue);
}
});
this._attributesbuffer=map;
}
}
},handleElement:function(_107,_108){
var _109=window.bindingMap[_107.getAttribute("id")];
if(_109!=null){
return _109.handleElement(_107,_108);
}
},updateElement:function(_10a,_10b){
var _10c=window.bindingMap[_10a.getAttribute("id")];
if(_10c!=null){
return _10c.updateElement(_10a,_10b);
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
this.addFilter(function(_10e,list){
var _110=UserInterface.getBinding(_10e);
var _111=null;
switch(self.mode){
case DocumentCrawler.MODE_REGISTER:
if(_110==null){
UserInterface.registerBinding(_10e);
}
break;
case DocumentCrawler.MODE_ATTACH:
if(_110!=null){
if(!_110.isAttached){
list.add(_110);
}
if(_110.isLazy==true){
_111=NodeCrawler.SKIP_CHILDREN;
}
}
break;
case DocumentCrawler.MODE_DETACH:
if(_110!=null){
list.add(_110);
}
break;
}
return _111;
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
},handleBroadcast:function(_112,arg){
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
var _115=DOMEvents.getTarget(e);
switch(e.type){
case DOMEvents.SELECTSTART:
case DOMEvents.CONTEXTMENU:
if(!this._isTextInputElement(_115)){
DOMEvents.preventDefault(e);
}
break;
case DOMEvents.CLICK:
if(Client.isExplorer){
if(_115.href&&_115.href.indexOf(Constants.DUMMY_LINK)>-1){
DOMEvents.preventDefault(e);
}
}
break;
}
},_resolveCustomBindingMappings:function(){
var _116=DOMUtil.getElementsByTagName(document.documentElement,"bindingmappingset").item(0);
if(_116!=null){
var map={};
var _118=DOMUtil.getElementsByTagName(_116,"bindingmapping");
new List(_118).each(function(_119){
var _11a=_119.getAttribute("element");
var _11b=_119.getAttribute("binding");
map[_11a]=eval(_11b);
});
this.setCustomUserInterfaceMapping(new UserInterfaceMapping(map));
}
},setCustomUserInterfaceMapping:function(_11c){
if(this.customUserInterfaceMapping==null){
this.customUserInterfaceMapping=_11c;
}else{
this.customUserInterfaceMapping.merge(_11c);
}
},_registerBindings:function(_11d){
var _11e=new DocumentCrawler();
_11e.mode=DocumentCrawler.MODE_REGISTER;
_11e.crawl(_11d);
_11e.dispose();
},_attachBindings:function(_11f){
var _120=new DocumentCrawler();
_120.mode=DocumentCrawler.MODE_ATTACH;
var list=new List();
_120.crawl(_11f,list);
var _122=false;
while(list.hasNext()){
var _123=list.getNext();
if(!_123.isAttached){
_123.onBindingAttach();
if(!_123.memberDependencies){
_123.onBindingInitialize();
}
if(Interfaces.isImplemented(IData,_123)){
_122=true;
}
}
}
if(_122){
var root=UserInterface.getBinding(document.body);
if(root!=null){
setTimeout(function(){
if(Binding.exists(root)){
root.dispatchAction(FocusBinding.ACTION_UPDATE);
}
},250);
}
}
_120.dispose();
list.dispose();
},attachBindings:function(_125){
this._registerBindings(_125);
this._attachBindings(_125);
},detachBindings:function(_126,_127){
var _128=new DocumentCrawler();
_128.mode=DocumentCrawler.MODE_DETACH;
var list=new List();
_128.crawl(_126,list);
if(_127==true){
list.extractFirst();
}
var _12a=false;
list.reverse().each(function(_12b){
if(Interfaces.isImplemented(IData,_12b)){
_12a=true;
}
_12b.dispose(true);
});
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
},detachAllBindings:function(){
this.detachBindings(document.documentElement);
},computeMaxIndex:function(){
if(this._maxIndex==-1){
this._maxIndex=DOMUtil.getMaxIndex(document);
}
return this._maxIndex++;
},_isTextInputElement:function(_12d){
return (/textarea|input/.test(DOMUtil.getLocalName(_12d)));
},_makeDocumentUnselectable:function(){
if(Client.isExplorer){
DOMEvents.addEventListener(document,DOMEvents.SELECTSTART,this);
}else{
}
}};
var DocumentManager=new _DocumentManager();
function _DataManager(){
}
_DataManager.prototype={isPostBackFun:false,_logger:SystemLogger.getLogger("DataManager ["+document.title+"]"),_dataBindings:{},isDirty:false,dirty:function(_12e){
this.isDirty=true;
var _12f=false;
if(!_12e.isDirty){
_12e.isDirty=true;
_12e.dispatchAction(Binding.ACTION_DIRTY);
_12f=true;
}
return _12f;
},clean:function(_130){
_130.isDirty=false;
},registerDataBinding:function(name,_132){
if(Interfaces.isImplemented(IData,_132,true)){
if(this._dataBindings[name]!=null){
throw "no proper support for checkbox multiple values! "+name;
}else{
this._dataBindings[name]=_132;
}
}else{
throw "Invalid DataBinding: "+_132;
}
},unRegisterDataBinding:function(name){
if(this._dataBindings[name]!=null){
delete this._dataBindings[name];
}
},getDataBinding:function(name){
var _135=null;
if(this._dataBindings[name]!=null){
_135=this._dataBindings[name];
}
return _135;
},getAllDataBindings:function(_136){
var list=new List();
for(var name in this._dataBindings){
var _139=this._dataBindings[name];
list.add(_139);
if(_136&&_139 instanceof WindowBinding){
var _13a=_139.getContentWindow().DataManager;
if(_13a!=null){
list.merge(_13a.getAllDataBindings());
}
}
}
return list;
},hasDataBindings:function(){
var _13b=false;
for(var name in this._dataBindings){
_13b=true;
break;
}
return _13b;
},populateDataBindings:function(map){
if(map instanceof DataBindingMap){
map.each(function(name,_13f){
var _140=this._dataBindings[name];
if(_140!=null){
switch(map.type){
case DataBindingMap.TYPE_RESULT:
try{
_140.setResult(_13f);
}
catch(exception){
if(Application.isDeveloperMode){
alert(_140);
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
var _141=new DataBindingMap();
_141.type=DataBindingMap.TYPE_VALUE;
for(var name in this._dataBindings){
var _143=this._dataBindings[name];
if(_143 instanceof DataDialogBinding){
throw "DataDialogBinding valuemap not supported!";
}
_141[name]=_143.getValue();
}
return _141;
},getDataBindingResultMap:function(){
var _144=new DataBindingMap();
_144.type=DataBindingMap.TYPE_RESULT;
for(var name in this._dataBindings){
var _146=this._dataBindings[name];
var res=_146.getResult();
if(res instanceof DataBindingMap){
res.each(function(name,_149){
_144.set(name,_149);
});
}else{
_144.set(name,res);
}
}
return _144;
},getPostBackString:function(){
var _14a="";
var form=document.forms[0];
if(form!=null){
var _14c="";
new List(form.elements).each(function(_14d){
var name=_14d.name;
var _14f=encodeURIComponent(_14d.value);
switch(_14d.type){
case "text":
case "hidden":
case "password":
case "textarea":
case "select-one":
_14a+=name+"="+_14f+"&";
break;
case "submit":
if(document.activeElement==_14d){
_14a+=name+"="+_14f+"&";
}
break;
case "radio":
if(_14d.checked){
_14a+=name+"="+_14f+"&";
}
break;
case "checkbox":
if(_14d.checked){
if(_14d.name==_14c){
if(_14a.lastIndexOf("&")==_14a.length-1){
_14a=_14a.substr(0,_14a.length-1);
}
_14a+=","+_14f;
}else{
_14a+=name+"="+_14d.value;
}
_14c=name;
_14a+="&";
}
break;
}
});
}
return _14a.substr(0,_14a.length-1);
}};
var DataManager=new _DataManager();

