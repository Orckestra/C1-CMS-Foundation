<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>
<%@ Register tagprefix="control" tagname="iconrenderer" src="~/Composite/controls/IconRendererHarmonyControl.ascx" %>

	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.IconPack.HarmonyRender</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
		<link rel="stylesheet" type="text/css" href="iconpack.css"/>
		<script type="text/javascript">
			DocumentManager.hasNativeContextMenu = true;
		</script>
	</head>
	<body>
		<ui:scrollbox class="padded">
			<control:iconrenderer runat="server"/>	
		</ui:scrollbox>
	</body>
</html>