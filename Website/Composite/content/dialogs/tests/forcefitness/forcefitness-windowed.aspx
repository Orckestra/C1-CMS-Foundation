<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server"/>
	<head>
		<title></title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
	</head>
	<body>
		<form>
			<ui:dialogpage label="Fitness Windowed" resizable="true">
				<ui:toolbar>
					<ui:toolbarbody>
						<ui:toolbargroup>
							<ui:clickbutton label="Nothing here!"/>
						</ui:toolbargroup>
					</ui:toolbarbody>
				</ui:toolbar>
				<ui:pagebody>
					<ui:window url="forcefitness-windowed-content.aspx" style="border: 2px inset ThreeDHighlight;"/>
				</ui:pagebody>				
				<ui:dialogtoolbar>
					<ui:toolbarbody align="right" equalsize="true">
						<ui:toolbargroup>
							<ui:clickbutton label="OK" response="accept"/>
						</ui:toolbargroup>
					</ui:toolbarbody>
				</ui:dialogtoolbar>
			
			</ui:dialogpage>
		</form>
	</body>
</html>