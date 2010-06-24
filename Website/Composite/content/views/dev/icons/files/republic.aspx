<?xml version="1.0" encoding="UTF-8"?>
<%@ register tagprefix="control" tagname="iconrenderer" src="~/Composite/controls/IconRendererHarmonyControl.ascx" %>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.IconPack.Republic</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
		<link rel="stylesheet" type="text/css" href="iconpack.css.aspx"/>
		<script type="text/javascript" src="IconPageBinding.js"></script>
	</head>
	<body>
		<ui:page binding="IconPageBinding">
			<ui:toolbar id="toolbar">
				<ui:toolbarbody>
					<ui:toolbargroup>
						<ui:toolbarbutton label="16" type="radio"/>
						<ui:toolbarbutton label="24" type="radio" ischecked="true"/>
						<ui:toolbarbutton label="32" type="radio"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:toolbar>
			<ui:window id="window" baseurl="republicrender.aspx" url="republicrender.aspx"/>
		</ui:page>
	</body>
</html>