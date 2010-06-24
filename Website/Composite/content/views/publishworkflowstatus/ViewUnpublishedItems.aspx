<?xml version="1.0" encoding="UTF-8" ?>
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ViewUnpublishedItems.aspx.cs" Inherits="ViewUnpublishedItems" %>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server" />
	<head>
	    <control:styleloader runat="server" />
	    <control:scriptloader type="sub" runat="server" />
	    <title><%= Request["title"] %></title>
	    <link rel="stylesheet" type="text/css" href="ViewUnpublishedItems.css.aspx"/>
	</head>
	<body>
	    <ui:page label="Unpublished" image="${icon:page-list-unpublished-items}">
	        <ui:toolbar id="toolbar">
	            <ui:toolbarbody>
	                <ui:toolbargroup>
	                    <ui:toolbarbutton oncommand="window.location.reload()" id="refreshbutton" image="${icon:refresh}" label="Refresh" />
	                </ui:toolbargroup>
	            </ui:toolbarbody>
	        </ui:toolbar>
	        <!-- 
			<ui:pagehead>
				<ui:pageheading><%= Request["title"] %></ui:pageheading>
	        </ui:pagehead>
	        -->
           	<asp:PlaceHolder runat="server" ID="visualOutput" />
           	<asp:PlaceHolder runat="server" ID="emptyLabelPlaheHolder" Visible="false">
           		<div id="emptylabel"><%= Request["emptyLabel"] %></div>
           	</asp:PlaceHolder>
           	<!-- <div id="description"><%= Request["description"] %></div>  -->
	    </ui:page>
	</body>
</html>