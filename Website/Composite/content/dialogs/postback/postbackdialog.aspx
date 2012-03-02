<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Dialog.PostBack</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
		<script type="text/javascript" src="PostBackDialogPageBinding.js"></script>
		<style type="text/css">
			body {
				cursor: wait !important;
			}
		</style>
	</head>
	<body>
		<ui:dialogpage binding="PostBackDialogPageBinding" resizable="false">
			<form action="javascript:void(false);" method="post" target="_self"/>
		</ui:dialogpage>
	</body>
</html>