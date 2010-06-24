<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.SystemView</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
	</head>
	<body>
		<ui:page binding="SystemPageBinding">
			<ui:toolbar id="toolbar" type="imagesonly">
				<ui:toolbarbody align="right">
					<ui:toolbargroup>
						<ui:toolbarbutton id="collapsebutton" image="${icon:collapseall}" tooltip="Collapse All"/>
						<ui:toolbarbutton id="locktreebutton" type="checkbox" ischecked="true" image="${icon:synchronize}" tooltip="Link with Editor"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:toolbar>
			<ui:tree id="tree" binding="SystemTreeBinding">
				<ui:treebody/>
			</ui:tree>
		</ui:page>
	</body>
</html>