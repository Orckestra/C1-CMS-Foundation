<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
<%@ Page Language="C#" %>    

	<control:httpheaders ID="Httpheaders1" runat="server"/>
	<head>
		<title>${string:Composite.Web.VisualEditor:SearchAndReplace.LabelTitle}</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
        <script src="VisualSearchAndReplace.js" type="text/javascript"></script>
	</head>
	<body>        
        <ui:broadcasterset>
            <ui:broadcaster id="broadcasterFind" isdisabled="false"/>
            <ui:broadcaster id="broadcasterReplace" isdisabled="false"/>
            <ui:broadcaster id="broadcasterReplaceAll" isdisabled="false"/>                
            <ui:broadcaster id="broadcasterPrev" isdisabled="false"/>
            <ui:broadcaster id="broadcasterNext" isdisabled="false"/>            
		</ui:broadcasterset>
		<ui:dialogpage 
            label="${string:Composite.Web.VisualEditor:SearchAndReplace.LabelTitle}" 
            image="${icon:composite}" 
            height="auto" 
            resizable="false" 
            style="padding: 10px;"             
            binding="VisualSearchAndReplace">
            <ui:pagebody>                
				<ui:flexbox>                    
                    <ui:fields style="padding-bottom: 20px;">
                        <ui:fieldgroup>
                            <ui:field>
                                <label style="height: 30px" id="nothingWasFound">Does this work?</label>
                            </ui:field>
                            <ui:field>
                                <ui:fielddesc label="${string:Composite.Web.VisualEditor:SearchAndReplace.LabelFind}"/>                            
                                <ui:fielddata>  
                                    <ui:datainput id="searchFor" default="true">
                                    </ui:datainput>
                                </ui:fielddata>
                            </ui:field>
                            <ui:field>
                                <ui:fielddesc label="${string:Composite.Web.VisualEditor:SearchAndReplace.LabelReplaceWith}"/>
                                <ui:fielddata>
                                    <ui:datainput id="replaceWith"></ui:datainput>
                                </ui:fielddata>
                            </ui:field>
                            <ui:field>
                                <ui:fielddesc label="${string:Composite.Web.VisualEditor:SearchAndReplace.LabelWholeWords}"/>
                                <ui:fielddata>
                                    <ui:checkbox id="matchWholeWord"></ui:checkbox>
                                </ui:fielddata>                                
                            </ui:field>
                            <ui:field>
                                <ui:fielddesc label="${string:Composite.Web.VisualEditor:SearchAndReplace.LabelMatchCase}"/>                            
                                <ui:fielddata>
                                    <ui:checkbox id="matchCase"></ui:checkbox>
                                </ui:fielddata>
                            </ui:field>
                        </ui:fieldgroup>
                    </ui:fields>
                </ui:flexbox>						                   
            </ui:pagebody>          
			<ui:dialogtoolbar>
				<ui:toolbarbody align="right" equalsize="true">
					<ui:toolbargroup>
                        <ui:clickbutton id="buttonFind" label="${string:Composite.Web.VisualEditor:SearchAndReplace.ButtonFind}" focusable="true" observes="broadcasterFind" />
                        <ui:clickbutton id="buttonReplace" label="${string:Composite.Web.VisualEditor:SearchAndReplace.ButtonReplace}" focusable="true" observes="broadcasterReplace" />
                        <ui:clickbutton id="buttonReplaceAll" label="${string:Composite.Web.VisualEditor:SearchAndReplace.ButtonReplaceAll}" focusable="true" observes="broadcasterReplaceAll"/>
                        <ui:clickbutton id="buttonPrev" label="${string:Composite.Web.VisualEditor:SearchAndReplace.ButtonPrev}" focusable="true" observes="broadcasterPrev" />
                        <ui:clickbutton id="buttonNext" label="${string:Composite.Web.VisualEditor:SearchAndReplace.ButtonNext}" focusable="true" observes="broadcasterNext"/>                        
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:dialogtoolbar>
		</ui:dialogpage>        
	</body>
</html>