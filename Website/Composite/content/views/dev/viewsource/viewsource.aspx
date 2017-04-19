<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.ViewSource</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
		<link rel="stylesheet" type="text/css" href="viewsource.css.aspx"/>
		<script type="text/javascript" src="ViewSourcePageBinding.js"></script>
	</head>
	<body>
		<ui:page binding="ViewSourcePageBinding">
			<ui:cover id="cover"/>
			<ui:tabbox id="tabbox">
				<ui:tabs>
					<ui:tab label="${string:Website.Content.Views.ViewSource.LabelFormatted}"/>
					<ui:tab id="rawtab" label="${string:Website.Content.Views.ViewSource.LabelRaw}"/>
				</ui:tabs>
				<ui:tabpanels>
					<ui:tabpanel id="fancypanel">
						<ui:window id="fancy" url="viewsourcecontent.html"/>
					</ui:tabpanel>
					<ui:tabpanel>
						<textarea id="raw" wrap="off" readonly="true"></textarea>
					</ui:tabpanel>
				</ui:tabpanels>
			</ui:tabbox>
		</ui:page>
	</body>
</html>