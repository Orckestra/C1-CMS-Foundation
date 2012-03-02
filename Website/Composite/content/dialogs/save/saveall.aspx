<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Dialog.SaveAll</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
		<script type="text/javascript" src="SaveAllDialogPageBinding.js"/>
	</head>
	<body>
		<ui:dialogpage binding="SaveAllDialogPageBinding"
			label="${string:Website.Dialogs.SaveAll.LabelSaveResources}"
			image="${icon:question}" 
			resizable="false">
			<ui:pagebody>
				<ui:fields id="fields">
					<ui:fieldgroup label="${string:Website.Dialogs.SaveAll.LabelUnsavedResources}" id="fieldgroup">
						<!-- 
						<ui:field>
							<ui:fielddesc>Content</ui:fielddesc>
							<ui:fielddata>
								<ui:checkboxgroup>
									<ui:checkbox label="Checkbox 1" name="checkA1" value="c1" checked="true"/>
									<ui:checkbox label="Checkbox 2" name="checkA2" value="c2" oncommand="alert('fister')"/>
									<ui:checkbox label="Checkbox 3" name="checkA3" value="c3"/>
								</ui:checkboxgroup>
							</ui:fielddata>
						</ui:field>
						-->
					</ui:fieldgroup>
				</ui:fields>
			</ui:pagebody>
			<ui:dialogtoolbar id="dialogtoolbar">
				<ui:toolbarbody id="dialogtoolbarbody" align="right" equalsize="true">
					<ui:toolbargroup>
						<ui:clickbutton label="${string:Website.Dialogs.LabelAccept}" response="accept" focusable="true" default="true"/>
						<ui:clickbutton label="${string:Website.Dialogs.LabelCancel}" response="cancel" focusable="true"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:dialogtoolbar>
		</ui:dialogpage>
	</body>
</html>