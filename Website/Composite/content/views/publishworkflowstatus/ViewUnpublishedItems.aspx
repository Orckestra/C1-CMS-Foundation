<?xml version="1.0" encoding="UTF-8" ?>

<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ViewUnpublishedItems.aspx.cs" Inherits="ViewUnpublishedItems" %>
<%@ Import Namespace="Composite.Data.Types" %>

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
	<ui:page label="${string:Composite.Plugins.PageElementProvider:PageElementProvider.ViewUnpublishedItems-document-title}"
		tooltip="${string:Composite.Plugins.PageElementProvider:PageElementProvider.ViewUnpublishedItems-document-description}"
		image="${icon:page-list-unpublished-items}" id="page" binding="UnpublishedPageBinding"
		showpagedata="<%=Request["showpagedata"] %>" showglobaldata="<%=Request["showglobaldata"]%>">
		<ui:toolbar id="toolbar">
			<ui:toolbarbody>
				<ui:toolbargroup id="actiongroup">
				</ui:toolbargroup>
			</ui:toolbarbody>
		</ui:toolbar>
		<ui:scrollbox>
			<table class="table">
				<thead>
					<tr class="head">
						<th>
							<ui:checkbox id="checkallbox" oncommand="this.dispatchAction(UnpublishedPageBinding.ACTION_CHECK_ALL)" />
						</th>
						<th><ui:clickbutton label="${string:Composite.Plugins.PageElementProvider:ViewUnpublishedItems.PageTitleLabel}" binding="SortButtonBinding"/></th>
						<% if (VersionedDataHelper.IsThereAnyVersioningServices)
						   { %>
                        <th class="version"><ui:clickbutton label="${string:Composite.Plugins.PageElementProvider:ViewUnpublishedItems.VersionLabel}" binding="SortButtonBinding" /></th>
						<% } %>
                        <th><ui:clickbutton label="${string:Composite.Plugins.PageElementProvider:ViewUnpublishedItems.StatusLabel}" binding="SortButtonBinding" /></th>
                        <th><ui:clickbutton label="${string:Composite.Plugins.PageElementProvider:ViewUnpublishedItems.LabelChangedBy}" binding="SortButtonBinding" /></th>
						<asp:Repeater runat="server" ID="headerRepeater">
                            <ItemTemplate>
                                <th>
                                    <ui:clickbutton label="<%# (Container.DataItem as VersionedExtraPropertiesColumnInfo).ColumnName %>" binding="SortButtonBinding" />
							        <ui:fieldhelp label="<%# (Container.DataItem as VersionedExtraPropertiesColumnInfo).ColumnTooltip %>"/>
                                    
                                </th>
                            </ItemTemplate>
                        </asp:Repeater>
						<th><ui:clickbutton label="${string:Composite.Plugins.PageElementProvider:ViewUnpublishedItems.DateCreatedLabel}" binding="SortButtonBinding" /></th>
						<th><ui:clickbutton label="${string:Composite.Plugins.PageElementProvider:ViewUnpublishedItems.DateModifiedLabel}" binding="SortButtonBinding" /></th>
						<th></th>
					</tr>
				</thead>
				<tbody id="tablebody" binding="Binding">
				</tbody>
			</table>
		</ui:scrollbox>
	</ui:page>
</body>
</html>
