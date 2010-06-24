<?xml version="1.0" encoding="UTF-8" ?>

<%@ Page Language="C#" AutoEventWireup="true" Inherits="Spikes_MAW_XsltPreviewMarkup" Codebehind="XsltPreviewMarkup.aspx.cs" %>

<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
<control:httpheaders ID="Httpheaders1" runat="server" />
<head>
    <title>Composite.Management.SimpleAtlas</title>
    <control:styleloader ID="Styleloader1" runat="server" />
    <control:scriptloader ID="Scriptloader1" type="sub" runat="server" />
</head>
<body>
    <form runat="server">
        <ui:page label="in / out">
            <ui:tabbox>
                <ui:tabs>
                    <ui:tab label="in" />
                    <ui:tab label="out" />
                </ui:tabs>
                <ui:tabpanels>
                    <ui:tabpanel>
                        <ui:sourceeditor syntax="html">
                            <asp:TextBox TextMode="MultiLine" ID="inMarkupHolder" runat="server" />
                        </ui:sourceeditor>
                    </ui:tabpanel>
                    <ui:tabpanel>
                        <ui:sourcecodeeditor syntax="html">
                            <asp:TextBox TextMode="MultiLine" ID="outMarkupHolder" runat="server" />
                        </ui:sourcecodeeditor>
                    </ui:tabpanel>
                </ui:tabpanels>
            </ui:tabbox>
        </ui:page>
    </form>
</body>
</html>
