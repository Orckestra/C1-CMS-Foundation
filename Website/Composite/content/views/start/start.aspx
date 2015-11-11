<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server" />
	<head>
		<title>Composite.Management.Start</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server" />
		<script type="text/javascript" src="StartPageBinding.js"></script>
	</head>
	<body>
		<ui:page binding="StartPageBinding">
			<ui:controlgroup id="controlgroup">
				<ui:control binding="DialogControlBinding" id="closecontrol" controltype="close"/>
			</ui:controlgroup>
			<ui:cover id="cover" busy="false" transparent="true"/>
			<ui:window id="start"/>
		</ui:page>
	</body>
</html>