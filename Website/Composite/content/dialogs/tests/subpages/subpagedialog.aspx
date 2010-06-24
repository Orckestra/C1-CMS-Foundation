<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server"/>
	<head>
		<title></title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
		<script type="text/javascript">
			function load () {
				UserInterface.getBinding ( 
					document.getElementById ( "window" )
				).setURL ( "subpagedialog-sub1.aspx" );
			}
		</script>
		<script type="text/javascript">
			DocumentManager.hasNativeContextMenu = true;
		</script>
	</head>
	<body>
		<ui:dialogpage label="Sub Page Dialog" resizable="true">
			<div style="padding-bottom:10px;">You can resize this dialog. Here is an iframe with some loaded content:</div>
			<ui:pagebody>
				<ui:window url="sub1.aspx" style="border: 2px inset ThreeDHighlight;"/>
			</ui:pagebody>
			<ui:dialogtoolbar>
				<ui:toolbarbody align="right" equalsize="true">
					<ui:toolbargroup>
						<ui:clickbutton label="OK" response="accept"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:dialogtoolbar>
		</ui:dialogpage>
	</body>
</html>