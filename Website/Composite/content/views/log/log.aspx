<?xml version="1.0" encoding="UTF-8" ?>
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="log.aspx.cs" Inherits="Composite_content_views_log_log" %>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml">
	<control:httpheaders runat="server" />
	<head>
		<title>Composite.Management.ServerLog</title>
		<control:styleloader runat="server" />
		<control:scriptloader type="sub" runat="server" />
		<link rel="stylesheet" type="text/css" href="log.css.aspx" />
		<script type="text/javascript">
		DocumentManager.isDocumentSelectable = true;
		</script>
	</head>
	<body>
		<form id="Form1" runat="server">
			<ui:page label="Server log" image="${icon:log-showlog}">
				<ui:toolbar id="toolbar">
					<ui:toolbarbody>
						<ui:toolbargroup>
							<aspui:Selector runat="server" ID="Pager" AutoPostBack="true" OnSelectedIndexChanged="LogContentChanged" />
							<aspui:ToolBarButton ID="DeleteOlderButton" AutoPostBack="true" Text="Delete old" ImageUrl="${icon:package-installer-uninstall}" runat="server" OnClick="DeleteOldButton_Click" />
							<aspui:ToolBarButton AutoPostBack="true" Text="Refresh" ImageUrl="${icon:refresh}" runat="server" OnClick="LogContentChanged" />
						</ui:toolbargroup>
					</ui:toolbarbody>
					<!-- 
					<ui:toolbarbody align="right">
						<ui:toolbargroup>				
						</ui:toolbargroup>
					</ui:toolbarbody>
					-->
				</ui:toolbar>
				<ui:scrollbox id="scrollbox">
					<asp:PlaceHolder ID="LogHolder" runat="server" />
					<asp:PlaceHolder runat="server" ID="EmptyLabelPlaheHolder" Visible="false">
						<div id="emptylabel">No log data available...</div>
					</asp:PlaceHolder>
				</ui:scrollbox>
			</ui:page>
		</form>
	</body>
</html>
