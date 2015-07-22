<?xml version="1.0" encoding="UTF-8" ?>

<%@ Page Language="C#" AutoEventWireup="true" CodeFile="FunctionDocumentation.aspx.cs"
    Inherits="Spikes_MAW_FunctionDocumentation" %>

<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml"
xmlns:control="http://www.composite.net/ns/uicontrol">
<control:httpheaders runat="server" />
<head>
    <control:styleloader runat="server" />
    <control:scriptloader type="sub" runat="server" />
    <title>
        <%= Request.QueryString["functionPrefix"]%>
        Functions</title>
    <link rel="stylesheet" type="text/css" href="FunctionDocumentation.css.aspx" media="all" />
    <link rel="stylesheet" type="text/css" href="FunctionDocumentation-print.css.aspx" media="print" />

    <script type="text/javascript">
    	DocumentManager.isDocumentSelectable = true;
    	DocumentManager.hasNativeContextMenu = true;
    </script>

</head>
<body>
    <ui:page label="<%= Request.QueryString["functionPrefix"]%> Functions" image="${icon:all-functions-generatedocumentation}">
        <ui:toolbar id="toolbar">
            <ui:toolbarbody>
                <ui:toolbargroup>
                    <ui:toolbarbutton oncommand="window.location.reload()" id="refreshbutton" image="${icon:refresh}"
                        label="${string:FunctionDocumentation.LabelButtonRefresh}" />
                    <ui:toolbarbutton oncommand="print()" id="printbutton" image="${icon:print}"
                        label="${string:FunctionDocumentation.LabelButtonPrint}" />
                </ui:toolbargroup>
            </ui:toolbarbody>
        </ui:toolbar>
        <ui:scrollbox id="scrollbox">
            <div class="content">
                <asp:PlaceHolder ID="functionDescriptorsPlaceholder" runat="server" />
            </div>
        </ui:scrollbox>
    </ui:page>
</body>
</html>
