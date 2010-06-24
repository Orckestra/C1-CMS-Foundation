<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Test.Buttons</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
	</head>
	<body>
		<ui:page label="Buttons">
		
			<ui:popupset>
				<ui:popup id="testpopup">
					<ui:menubody>
						<ui:menugroup>
							<ui:menuitem label="A"/>
							<ui:menuitem label="B"/>
							<ui:menuitem label="C"/>
						</ui:menugroup>
					</ui:menubody>
				</ui:popup>
			</ui:popupset>
			
			<ui:toolbar>
				<ui:toolbarbody>
					<ui:toolbargroup>
						<ui:toolbarbutton label="Toolbarbutton" oncommand="alert('hej')" contextmenu="testpopup"/>
						<ui:toolbarbutton label="Toolbarbutton" oncommand="alert('hej')" contextmenu="testpopup"/>
						<ui:toolbarbutton label="Toolbarbutton" oncommand="alert('hej')" contextmenu="testpopup"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
				<ui:toolbarbody align="right">
					<ui:toolbargroup>
						<ui:clickbutton label="Clickbutton" oncommand="alert('hej')" contextmenu="testpopup"/>
						<ui:clickbutton label="Clickbutton" oncommand="alert('hej')" contextmenu="testpopup"/>
						<ui:clickbutton label="Clickbutton" oncommand="alert('hej')" contextmenu="testpopup"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:toolbar>
			
			<ui:box class="padded">Right-click for button contextmenus.</ui:box>
			
		</ui:page>
	</body>
</html>