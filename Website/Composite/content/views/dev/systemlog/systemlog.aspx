<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>    

	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.SystemLog</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
		<script type="text/javascript" src="SystemLogPageBinding.js"></script>
		<link rel="stylesheet" type="text/css" href="systemlog.css.aspx"/>
	</head>
	<body>
		<ui:page id="page" image="${icon:systemlog}" binding="SystemLogPageBinding">
			<ui:toolbar>
				<ui:toolbarbody>
					<!-- 
					<ui:toolbargroup id="filterbuttons">
						<ui:toolbarbutton label="All" type="checkbox"/>
						<ui:toolbarbutton label="Info" type="checkbox"/>
						<ui:toolbarbutton label="Debug" type="checkbox"/>
						<ui:toolbarbutton label="Error" type="checkbox"/>
						<ui:toolbarbutton label="Warn" type="checkbox"/>
						<ui:toolbarbutton label="Fatal" type="checkbox"/>
						<ui:toolbarbutton label="Fine" type="checkbox"/>
					</ui:toolbargroup>
					-->
					<ui:toolbargroup>
						<ui:toolbarbutton 
							label="Clear" 
							image="${icon:delete}" 
							title="Clear the log" 
							oncommand="SystemLogger.clear ()"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
				<!-- 
				BINDING COUNT DEBUGGING
				<ui:toolbarbody align="right">
					<ui:toolbargroup>
						<ui:toolbarbutton label="Bindingcount" oncommand="bindingMap.page.countBindings ();"/>
						<ui:toolbarbutton label="Autotracking" type="checkbox" oncommand="bindingMap.page.autoTrack ( this.isChecked );"/>
					</ui:toolbargroup>
					<ui:toolbargroup>
						<ui:toolbarbutton label="Set point" oncommand="bindingMap.page.setPoint ();"/>
						<ui:toolbarbutton label="Clear point" oncommand="bindingMap.page.clearPoint ();"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
				-->
			</ui:toolbar>
			<ui:window id="outputview" url="systemlogoutput.aspx"/>
		</ui:page>
	</body>
</html>