<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>    

	<control:httpheaders runat="server" />
	<head>
		<title>Composite.Management.Explorer</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server" />
	</head>
	<body>
		<ui:page>
			<ui:explorer>
				<ui:cover id="explorercover" hidden="true" transparent="true" busy="false"/>
			 	<ui:explorerdecks>
			 		<ui:cover id="explorerdeckscover" busy="false"/>
			 	</ui:explorerdecks>
<%--			 	<ui:explorersplitter/>
			 	<ui:explorermenu>
			 		<ui:explorertoolbar>
			 		 	<ui:toolbarbody>
				 			<ui:toolbargroup/>
					 	</ui:toolbarbody>
			 		</ui:explorertoolbar>
			 		<ui:toolbar type="imagesonly">
			 			<ui:toolbarbody align="right">
				 			<ui:toolbargroup/>
				 		</ui:toolbarbody>
			 		</ui:toolbar>
			 	</ui:explorermenu>--%>
			 </ui:explorer>
		</ui:page>
	</body>
</html>