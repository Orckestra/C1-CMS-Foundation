<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
<%@ Page Language="C#" %>    

	<control:httpheaders ID="Httpheaders1" runat="server"/>
	<head>
		<title>${string:Composite.Web.VisualEditor:SearchAndReplace.LabelTitle}</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
        <script src="VisualSearchAndReplace.js" type="text/javascript"></script>

        <style>
            @namespace ui url(http://www.w3.org/1999/xhtml);

            .checkBoxSettings {
                float: left;
            }

            .left-label {
                float: left;
                margin-right: 20px;
                width: 100px;
            }

            .checkBoxSettings ui|datalabeltext {
                color:#999 !important;
            }

            ui|checkbox {
            }

            .found-message {
                display:block;
                height: 30px;
            }
        </style>

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
            binding="VisualSearchAndReplace">
            <ui:pagebody>                
				<ui:flexbox>                    
                    <ui:fields>
                        <ui:fieldgroup>                            
                            <ui:field>
                                <ui:fielddesc class="left-label" label="${string:Composite.Web.VisualEditor:SearchAndReplace.LabelFind}"/>                            
                                <ui:fielddata>  
                                    <ui:datainput id="searchFor" default="true">
                                    </ui:datainput>
                                </ui:fielddata>
                            </ui:field>
                            <ui:field>
                                <ui:fielddesc class="left-label" label="${string:Composite.Web.VisualEditor:SearchAndReplace.LabelReplaceWith}"/>
                                <ui:fielddata>
                                    <ui:datainput id="replaceWith"></ui:datainput>
                                </ui:fielddata>
                            </ui:field>
                        </ui:fieldgroup>
                    </ui:fields>
                    <div>
                        <div class="checkBoxSettings">
                            <ui:field>
                                <!--<ui:fielddesc label="${string:Composite.Web.VisualEditor:SearchAndReplace.LabelWholeWords}"/>-->
                                <ui:fielddata>
                                    <ui:checkbox label="${string:Composite.Web.VisualEditor:SearchAndReplace.LabelWholeWords}" id="matchWholeWord"></ui:checkbox>
                                </ui:fielddata>                                
                            </ui:field>
                        </div>
                        <div class="checkBoxSettings">
                            <ui:field>
                                <!--<ui:fielddesc label="${string:Composite.Web.VisualEditor:SearchAndReplace.LabelMatchCase}"/>-->
                                <ui:fielddata>
                                    <ui:checkbox label="${string:Composite.Web.VisualEditor:SearchAndReplace.LabelMatchCase}" id="matchCase"></ui:checkbox>
                                </ui:fielddata>
                            </ui:field>
                        </div>
                    </div>  
                    <div style="clear:both"></div>
                    <div class="found-message">
                        <label id="nothingWasFound"></label>                            
                    </div>
                </ui:flexbox>						                   
            </ui:pagebody>          
			<ui:dialogtoolbar>
				<ui:toolbarbody align="right" equalsize="true">
					<ui:toolbargroup>                        
                        <ui:clickbutton id="buttonFind" label="${string:Composite.Web.VisualEditor:SearchAndReplace.ButtonFind}" focusable="true" observes="broadcasterFind" />
                        <ui:clickbutton id="buttonReplace" label="${string:Composite.Web.VisualEditor:SearchAndReplace.ButtonReplace}" focusable="true" observes="broadcasterReplace" />
                        <ui:clickbutton id="buttonReplaceAll" label="${string:Composite.Web.VisualEditor:SearchAndReplace.ButtonReplaceAll}" focusable="true" observes="broadcasterReplaceAll"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:dialogtoolbar>            
		</ui:dialogpage>        
	</body>
</html>