<?xml version="1.0" encoding="UTF-8" ?>

<%@ Page Language="C#" AutoEventWireup="true" Inherits="Spikes_MAW_XsltPreviewMarkup" Codebehind="WidgetEditor.aspx.cs" %>
<%@ Register TagPrefix="control" TagName="WidgetEditor" Src="~/Composite/controls/FormsControls/FormUiControlTemplates/DeveloperTools/FunctionCallsDesigner.ascx" %>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
<control:httpheaders ID="Httpheaders1" runat="server" />
<head>
    <title>Composite.Management.SimpleAtlas</title>
    <control:styleloader ID="Styleloader1" runat="server" />
    <control:scriptloader ID="Scriptloader1" type="sub" runat="server" />
</head>
<body>
    <form runat="server">
			<asp:ScriptManager ID="SM1" runat="server" ScriptMode="Debug">
				<Scripts>
					<asp:ScriptReference Name="MicrosoftAjaxWebForms.js" Path="~/Composite/scripts/aspnetajax/MicrosoftAjaxWebForms.js" />
					<asp:ScriptReference Name="MicrosoftAjax.js" Path="~/Composite/scripts/aspnetajax/MicrosoftAjax.js" />
					<asp:ScriptReference Name="MicrosoftAjaxTimer.js" Path="~/Composite/scripts/aspnetajax/MicrosoftAjaxTimer.js" />		
				</Scripts>
			</asp:ScriptManager> 
        <ui:editorpage label="in / out">
            <ui:tabbox>
                <ui:tabs>
                    <ui:tab label="in" />
                    <ui:tab label="out" />
                </ui:tabs>
                <ui:tabpanels>
                    <ui:tabpanel>
                        <control:WidgetEditor runat="server" />
                    </ui:tabpanel>
                    <ui:tabpanel>
                        <ui:sourceeditor syntax="html">
                            <asp:TextBox TextMode="MultiLine" ID="outMarkupHolder" runat="server" />
                        </ui:sourceeditor>
                    </ui:tabpanel>
                </ui:tabpanels>
            </ui:tabbox>
        </ui:editorpage>
    </form>
</body>
</html>
