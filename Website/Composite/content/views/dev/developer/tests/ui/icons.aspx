<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Test.Icons</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
	</head>
	<body>
		<ui:page label="Icons">
			<ui:toolbar> 
				<ui:toolbarbody>
					<ui:toolbargroup>
						<ui:toolbarbutton label="Hans" image="${icon:close(16)}"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:toolbar>
		</ui:page>
	</body>
</html>