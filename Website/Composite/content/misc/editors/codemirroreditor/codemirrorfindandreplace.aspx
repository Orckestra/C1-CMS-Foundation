<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders ID="Httpheaders1" runat="server"/>
	<head>
		<title>${string:Composite.Web.SourceEditor:FindAndReplace.LabelTitle}</title>
		<control:styleloader ID="Styleloader1" runat="server"/>
		<control:scriptloader ID="Scriptloader1" type="sub" runat="server"/>
        <script src="codemirrorfindandreplace.js" type="text/javascript"></script>

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
          
        </style>

	</head>
	<body>
        <div>
            <ui:broadcasterset>
                <ui:broadcaster id="broadcasterFindNext" isdisabled="false"/>
                <ui:broadcaster id="broadcasterReplace" isdisabled="false"/>
                <ui:broadcaster id="broadcasterReplaceAll" isdisabled="false"/>
		    </ui:broadcasterset>
		    <ui:dialogpage label="${string:Composite.Web.SourceEditor:FindAndReplace.LabelTitle}" image="${icon:composite}" height="auto" resizable="false" binding="CodemirrorFindAndReplace">
                <ui:pagebody>
                    <ui:flexbox>
                        <ui:fields>
                            <ui:fieldgroup>
                                <ui:field>
                                    <ui:fielddesc class="left-label" label="${string:Composite.Web.SourceEditor:FindAndReplace.LabelFind}"/>                            
                                    <ui:fielddata>  
                                        <ui:datainput id="searchFor" default="true">
                                        </ui:datainput>
                                    </ui:fielddata>
                                </ui:field>
                                <ui:field>
                                    <ui:fielddesc class="left-label" label="${string:Composite.Web.SourceEditor:FindAndReplace.LabelReplaceWith}"/>
                                    <ui:fielddata>
                                        <ui:datainput id="replaceWith"></ui:datainput>
                                    </ui:fielddata>
                                </ui:field>
                            </ui:fieldgroup>
                        </ui:fields>
                         <div>
                            <div class="checkBoxSettings">
                                <ui:field>                                
                                    <ui:fielddata>
                                        <ui:checkbox label="${string:Composite.Web.SourceEditor:FindAndReplace.LabelWholeWords}" id="matchWholeWord"></ui:checkbox>
                                    </ui:fielddata>                                
                                </ui:field>
                            </div>
                            <div class="checkBoxSettings">
                                <ui:field>                                
                                    <ui:fielddata>
                                        <ui:checkbox label="${string:Composite.Web.SourceEditor:FindAndReplace.LabelMatchCase}" id="matchCase"></ui:checkbox>
                                    </ui:fielddata>
                                </ui:field>     
                            </div>
                        </div>                      
                    </ui:flexbox>     
                </ui:pagebody>
			    <ui:dialogtoolbar>
				    <ui:toolbarbody align="right" equalsize="true">
					    <ui:toolbargroup>
                            <ui:clickbutton id="buttonFindNext" label="${string:Composite.Web.SourceEditor:FindAndReplace.ButtonFind}" focusable="true" observes="broadcasterFindNext" />
                            <ui:clickbutton id="buttonReplace" label="${string:Composite.Web.SourceEditor:FindAndReplace.ButtonReplace}" focusable="true" observes="broadcasterReplace" />
                            <ui:clickbutton id="buttonReplaceAll" label="${string:Composite.Web.SourceEditor:FindAndReplace.ButtonReplaceAll}" focusable="true" observes="broadcasterReplaceAll"/>
					    </ui:toolbargroup>
				    </ui:toolbarbody>
			    </ui:dialogtoolbar>
		    </ui:dialogpage>
        </div>
	</body>
</html>