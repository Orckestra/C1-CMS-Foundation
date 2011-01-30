<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server" />
	<head>
		<title>Composite.Management.Dialogs.WysiwygEditor.Word</title>
		<control:styleloader runat="server" />
		<control:scriptloader type="sub" runat="server" />
		<link rel="stylesheet" type="text/css" href="word.css.aspx"/>
		<script type="text/javascript" src="WordDialogPageBinding.js"/>
	</head>
	<body>
		<ui:dialogpage id="page" 
			binding="WordDialogPageBinding"
			label="${string:Composite.Web.VisualEditor:WordPaste.Label}" 
			image="${skin}/wysiwygeditor/word.png" 
			height="auto">
			<ui:pagebody>
				<ui:window id="wordwindow" url="wordcontent.aspx"/>
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