<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server" />
	<head>
		<title>Composite.Management.Dialogs.WysiwygEditor</title>
		<control:styleloader runat="server" />
		<control:scriptloader type="sub" runat="server" />
		<link rel="stylesheet" type="text/css" href="visualeditordialog.css.aspx"/>
		<script type="text/javascript" src="VisualEditorDialogPageBinding.js"></script>
	</head>
	<body>
		<ui:dialogpage 
			binding="VisualEditorDialogPageBinding" 
			id="visualeditordialogpage" 
			label="" 
			height="450"
			image="${icon:mimetype-html}" 
			resizable="true">
			
			<ui:visualeditor id="visualeditor">
			</ui:visualeditor>
			
			<ui:dialogtoolbar>
				<ui:toolbarbody align="right" equalsize="true">
					<ui:toolbargroup>
						<ui:clickbutton label="${string:Website.Dialogs.LabelAccept}" response="accept" id="buttonAccept"/>
						<ui:clickbutton label="${string:Website.Dialogs.LabelCancel}" response="cancel" />
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:dialogtoolbar>
		</ui:dialogpage>
	</body>
</html>