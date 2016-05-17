<?xml version="1.0" encoding="UTF-8" ?>

<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ViewUnpublishedItems.aspx.cs" Inherits="ViewUnpublishedItems" %>

<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
<control:httpheaders runat="server" />
<head>
	<control:styleloader runat="server" />
	<control:scriptloader type="sub" runat="server" />
	<title><%= Request["title"] %></title>
	<link rel="stylesheet" type="text/css" href="ViewUnpublishedItems.css.aspx" />
	<script type="text/javascript" src="bindings/UnpublishedPageBinding.js"></script>
	<script type="text/javascript" src="bindings/SortButtonBinding.js"></script>
</head>
<body>
	<ui:page label="Unpublished" image="${icon:page-list-unpublished-items}" id="page" binding="UnpublishedPageBinding" showpagedata="<%=Request["showpagedata"] %>" showglobaldata="<%=Request["showglobaldata"]%>">
		<ui:toolbar id="toolbar">
			<ui:toolbarbody>
				<ui:toolbargroup id="actiongroup">
				</ui:toolbargroup>
			</ui:toolbarbody>
		</ui:toolbar>
		<table class="table">
			<thead>
				<tr class="head">
					<th>
						<ui:checkbox id="checkallbox" oncommand="this.dispatchAction(UnpublishedPageBinding.ACTION_CHECK_ALL)" />
					</th>
					<th><ui:clickbutton label="${string:Composite.Plugins.PageElementProvider:ViewUnpublishedItems.LabelPageTitle}" binding="SortButtonBinding"/></th>
					<th><ui:clickbutton label="${string:Composite.Plugins.PageElementProvider:ViewUnpublishedItems.LabelVersion}" binding="SortButtonBinding" /></th>
					<th><ui:clickbutton label="${string:Composite.Plugins.PageElementProvider:ViewUnpublishedItems.LabelStatus}" binding="SortButtonBinding" /></th>
					<th><ui:clickbutton label="${string:Composite.Plugins.PageElementProvider:ViewUnpublishedItems.LabelPublishDate}" binding="SortButtonBinding" /></th>
					<th><ui:clickbutton label="${string:Composite.Plugins.PageElementProvider:ViewUnpublishedItems.LabelUnpublishDate}" binding="SortButtonBinding" /></th>
					<th><ui:clickbutton label="${string:Composite.Plugins.PageElementProvider:ViewUnpublishedItems.LabelDateCreated}" binding="SortButtonBinding" /></th>
					<th><ui:clickbutton label="${string:Composite.Plugins.PageElementProvider:ViewUnpublishedItems.LabelDateModified}" binding="SortButtonBinding" /></th>
					<th></th>
				</tr>
			</thead>
			<tbody id="tablebody" binding="Binding">
			</tbody>
		</table>
	</ui:page>
</body>
</html>
