<?xml version="1.0" encoding="UTF-8"?>
<%@ Page Language="C#" %>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server" />
	<head>
		<title>Composite.Management.Dialogs.WysiwygEditor.Text</title>
		<control:styleloader runat="server" />
		<control:scriptloader type="sub" runat="server" />
		<link rel="stylesheet" type="text/css" href="text.css.aspx"/>
		<script type="text/javascript" src="TextDialogPageBinding.js"></script>
	</head>
	<body>
		<ui:dialogpage binding="TextDialogPageBinding"
			label="${string:Composite.Web.VisualEditor:TextPaste.Label}" 
			image="${icon:page}" 
			height="300"
			resizable="true">
			
			<ui:pagebody>
				<ui:flexbox>
					<ui:editortextbox id="text" autoselect="true">
						<textarea><%= Composite.Core.ResourceSystem.StringResourceSystemFacade.GetString("Composite.Web.VisualEditor","TextPaste.PasteHereContent") %></textarea>
					</ui:editortextbox>
				</ui:flexbox>
			</ui:pagebody>
			
			<ui:dialogtoolbar>
				<ui:toolbarbody align="right" equalsize="true">
					<ui:toolbargroup>
						<ui:clickbutton id="buttonAccept" label="${string:Website.Dialogs.LabelAccept}" response="accept" focusable="true" isdisabled="true"/>
						<ui:clickbutton id="buttonCancel" label="${string:Website.Dialogs.LabelCancel}" response="cancel" focusable="true" default="true"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:dialogtoolbar>
		</ui:dialogpage>
	</body>
</html>