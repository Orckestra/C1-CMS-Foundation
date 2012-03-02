<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Dialog.TreeSelector</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
		<script type="text/javascript" src="CompareStringsDialogPageBinding.js"></script>
		<script type="text/javascript" src="CompareStringsNodeCrawler.js"></script>
		<link rel="stylesheet" type="text/css" href="comparestrings.css.aspx"/>
	</head>
	<body>
	
		<ui:dialogpage 
			binding="CompareStringsDialogPageBinding"
			label="Comparison"
			image="${icon:versioning-compare}" 
			width="750"
			height="500"
			resizable="false">
			
			<ui:pagebody>
				<ui:flexbox>
					<ui:window id="win" url="comparestringscontent.html"/>
				</ui:flexbox>
			</ui:pagebody>
			
			<ui:dialogtoolbar>
				<ui:toolbarbody align="right" equalsize="true">
					<ui:toolbargroup>
						<ui:clickbutton label="${string:Website.Dialogs.LabelAccept}" response="accept" focusable="true" default="true"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:dialogtoolbar>
			
		</ui:dialogpage>
	</body>
</html>