<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server" />
	<head>
		<title>Composite.Management.PagePreview.Error</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
		<link rel="stylesheet" type="text/css" href="error.css"/>
	</head>
	<body>
		<ui:page>
			<div id="message">
				<div id="icon"/>
				<div id="text">
					<ui:text label="Error in preview."/>
				</div>
			</div>
		</ui:page>
	</body>
</html>