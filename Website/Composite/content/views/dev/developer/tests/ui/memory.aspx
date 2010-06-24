<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Test.Memory</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
		<script type="text/javascript" src="memory.js"></script>
	</head>
	<body>
		<ui:page label="Memory">
			<ui:toolbar>
				<ui:toolbarbody>
					<ui:toolbargroup>
						<ui:toolbarbutton label="Generate" oncommand="this.bindingWindow.Fister.generate()"/> 
						<ui:toolbarbutton label="Inject" oncommand="this.bindingWindow.Fister.inject()"/> 
						<ui:toolbarbutton label="Release" oncommand="this.bindingWindow.Fister.release()"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:toolbar>
			<ui:flexbox id="flex"></ui:flexbox>
		</ui:page>
	</body>
</html>