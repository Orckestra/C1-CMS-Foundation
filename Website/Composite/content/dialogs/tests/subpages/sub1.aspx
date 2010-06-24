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
			<ui:page>
				<ui:clickbutton label="Load next sub-page!" oncommand="document.location=document.location.toString().replace('sub1','sub2');"/>
			</ui:page>
		</form>
	</body>
</html>