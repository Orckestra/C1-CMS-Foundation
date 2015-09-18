<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.SystemView</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
	</head>
	<body>
		<ui:page binding="SystemPageBinding" id="page">
			<ui:tree id="tree" binding="SystemTreeBinding" locktoeditor="true">
				<ui:treebody/>
			</ui:tree>
		</ui:page>
	</body>
</html>