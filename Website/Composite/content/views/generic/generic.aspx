<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server" />
	<head>
		<title>Composite.Management.Generic</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server" />
		<script type="text/javascript" src="GenericPageBinding.js"></script>
	</head>
	<body>
		<ui:page id="page" binding="GenericPageBinding">
			<ui:window id="window"/>
		</ui:page>
	</body>
</html>