<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Dialog.SystemTree.DetailedPaste</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
		<script type="text/javascript" src="DetailedPastePageBinding.js"></script>
	</head>
	<body>
		<ui:dialogpage 
			binding="DetailedPastePageBinding"
			label="${string:Website.Dialogs.SystemTree.DetailedPaste.Title}" 
			image="${icon:question}" 
			resizable="false">
			<ui:pagebody>
				<ui:fields>
					<ui:fieldgroup>
						<ui:field>
							<ui:fielddesc label="${string:Website.Dialogs.SystemTree.DetailedPaste.LabelPosition}"/>
							<ui:fielddata>
								<ui:radiodatagroup name="switch">
									<ui:radio label="Before" value="before"/>
									<ui:radio label="After" value="after" ischecked="true"/>
								</ui:radiodatagroup>
							</ui:fielddata>
						</ui:field>
						<ui:field>
							<ui:fielddesc id="insertlabel" label="${string:Website.Dialogs.SystemTree.DetailedPaste.LabelInsertAfter}"/>
							<ui:fielddata>
								<ui:selector name="sibling"/>
							</ui:fielddata>
						</ui:field>
					</ui:fieldgroup>
				</ui:fields>
			</ui:pagebody>
			<ui:dialogtoolbar>
				<ui:toolbarbody align="right" equalsize="true">
					<ui:toolbargroup>
						<ui:clickbutton label="${string:Website.Dialogs.LabelAccept}" response="accept" focusable="true" default="true"/>
						<ui:clickbutton label="${string:Website.Dialogs.LabelCancel}" response="cancel" focusable="true"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:dialogtoolbar>
		</ui:dialogpage>
	</body>
</html>