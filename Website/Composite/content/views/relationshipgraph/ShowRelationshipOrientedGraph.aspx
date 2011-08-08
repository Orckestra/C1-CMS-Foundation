<?xml version="1.0" encoding="UTF-8" ?>

<%@ Page Language="C#" AutoEventWireup="true" Inherits="Composite.content.views.relationshipgraph.ShowRelationshipOrientedGraph" CodeFile="ShowRelationshipOrientedGraph.aspx.cs" %>

<%@ Register TagPrefix="control" TagName="httpheaders" Src="~/Composite/controls/HttpHeadersControl.ascx" %>
<%@ Register TagPrefix="control" TagName="scriptloader" Src="~/Composite/controls/ScriptLoaderControl.ascx" %>
<%@ Register TagPrefix="control" TagName="styleloader" Src="~/Composite/controls/StyleLoaderControl.ascx" %>

<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml">
<control:httpheaders ID="Httpheaders1" runat="server" />
<head>
    <title>Element Information</title>
    <control:styleloader ID="Styleloader1" runat="server" />
    <control:scriptloader ID="Scriptloader1" type="sub" runat="server" />
</head>
<body>
    <ui:page image="${icon:nodes}">
        <ui:scrollbox>
            <asp:PlaceHolder ID="RelationshipOrientedGraphPlaceHolder" runat="server" />
        </ui:scrollbox>
    </ui:page>
</body>
</html>
