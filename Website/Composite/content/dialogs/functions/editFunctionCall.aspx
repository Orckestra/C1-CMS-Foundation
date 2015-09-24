<?xml version="1.0" encoding="UTF-8" ?>

<%@ Page Language="C#" AutoEventWireup="true" Inherits="CompositeEditFunctionCall.EditFunctionCall" EnableEventValidation="false" ValidateRequest="false" CodeFile="editFunctionCall.aspx.cs" %>

<%@ Import Namespace="Composite.Core.ResourceSystem" %>
<%@ Import Namespace="CompositeEditFunctionCall" %>

<%@ Register TagPrefix="aspui" Namespace="Composite.Core.WebClient.UiControlLib" Assembly="Composite" %>
<%@ Register TagPrefix="control1" Src="~/Composite/controls/FormsControls/FormUiControlTemplates/DeveloperTools/FunctionCallsDesigner.ascx" TagName="FunctionCallDesigner" %>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml">
<control:httpheaders id="Httpheaders1" runat="server" />
<head>
	<title>Composite.Management.Dialogs.Functions.EditFunctionCall</title>
	<control:styleloader id="Styleloader1" runat="server" />
	<control:scriptloader id="Scriptloader1" type="sub" runat="server" />
	<asp:PlaceHolder ID="HeaderPlaceHolder" runat="server" />
	<script type="text/javascript" src="EditFunctionCallDialogPageBinding.js"></script>

	<script type="text/javascript">
		/*
		 * Hacks a bug where haywire would fire on dialog exit.
		 */
		function exit() {
			setTimeout(function () {
				bindingMap.renderingdialogpage.onDialogAccept();
				Application.unlock(window, true); // now what?
			}, 0);
		}
	</script>
</head>
<body>
	<form id="Form1" runat="server">

		<!-- this textbox contains the markup when Finish is clicked -->
		<div style="display: none;">
			<textarea runat="server" id="FunctionMarkup"></textarea>
			<asp:PlaceHolder ID="DialogDoAcceptPlaceHolder" runat="server" Visible="false">
				<ui:binding onattach="exit()" />
			</asp:PlaceHolder>
		</div>
		<ui:dialogpage
			binding="EditFunctionCallDialogPageBinding"
			id="renderingdialogpage"
			image="${icon:parameter_overloaded}"
			width="<% =ActiveTab == Tab.Basic? "820" : "865" %>"
			height="<% =ActiveTab == Tab.Basic? "100" : "610" %>"
			resizable="false"
			label="<%= this.DialogLabel %>"
            class="with-top-toolbar <% =ActiveTab == Tab.Basic? " functionview-basic" : " functionview-adv" %>">
			<asp:HiddenField runat="server" ID="hdnActiveTab" Value="<%# hdnActiveTab.Value %>"></asp:HiddenField>
			<asp:PlaceHolder runat="server" ID="BasicPanel">
				<ui:toolbar id="toolbar">
					<ui:toolbarbody />
					<ui:toolbarbody id="switchtoolbargroup">
						<ui:toolbargroup>
							<ui:toolbarbutton id="advancedbutton" label="${string:Website.Dialogs.EditFunction.AdvancedView}" image="${icon:advanced}" flip="true" />
						</ui:toolbargroup>
					</ui:toolbarbody>
				</ui:toolbar>
				<ui:scrollbox>
					<asp:PlaceHolder ID="BasicContentPanel" runat="server"></asp:PlaceHolder>
                    <asp:PlaceHolder ID="plhNoParameters" runat="server" Visible="false">
                        <div class="padded">
                            <%= StringResourceSystemFacade.GetString("Composite.Management", "Website.Dialogs.EditFunction.BasicView.NoParameters") %>
                        </div>
                    </asp:PlaceHolder>
				</ui:scrollbox>
				<div id="errors" style="display: none" class="updatezone">
					<asp:PlaceHolder runat="server" ID="plhErrors"></asp:PlaceHolder>
				</div>
			</asp:PlaceHolder>
			<asp:PlaceHolder ID="AdvancedPanel" runat="server">
				<control1:FunctionCallDesigner ID="FunctionCallDesigner" runat="server" />
			</asp:PlaceHolder>
			<ui:dialogtoolbar>
				<ui:toolbarbody align="right" equalsize="true">
					<ui:toolbargroup>
						<ui:clickbutton label="${string:Website.Dialogs.LabelAccept}"
							oncommand="bindingMap.renderingdialogpage.onOk ()"
							callbackid="buttonAccept"
                            class="primary"
                            focusable="true" />
						<ui:clickbutton label="${string:Website.Dialogs.LabelCancel}"
							response="cancel"
							focusable="true" />
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:dialogtoolbar>

		</ui:dialogpage>
	</form>
</body>
</html>
