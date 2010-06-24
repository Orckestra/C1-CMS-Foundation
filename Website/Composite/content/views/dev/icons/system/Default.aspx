<?xml version="1.0" encoding="UTF-8"?>
<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="Spikes_Icons_Default" %>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server" />
	<head runat="server">
		<title>Composite.Management.IconPack.Freja</title>
		<control:styleloader runat="server" />
		<control:scriptloader type="sub" runat="server" />
		<link rel="stylesheet" type="text/css" href="Default.css.aspx"/>
		<script type="text/javascript" src="../files/IconPageBinding.js"></script>
	</head>
	<body>
		<ui:page binding="IconPageBinding">
			<form id="form1" runat="server">
				<ui:toolbar id="toolbar">
					<ui:toolbarbody>
						<ui:toolbargroup>
							<div style="position:relative; top:2px">
								<asp:DropDownList ID="IconSize" runat="server" onselectedindexchanged="IconSize_SelectedIndexChanged" AutoPostBack="true">
									<asp:ListItem Value="normal" />
										<asp:ListItem Value="large" />
									<asp:ListItem Value="xlarge" />
								</asp:DropDownList>
							</div>
						</ui:toolbargroup>
					</ui:toolbarbody>
				</ui:toolbar>
				<ui:scrollbox class="padded">
					<asp:PlaceHolder ID="IconPlaceHolder" runat="server" />
				</ui:scrollbox>
			</form>
		</ui:page>
	</body>
</html>
