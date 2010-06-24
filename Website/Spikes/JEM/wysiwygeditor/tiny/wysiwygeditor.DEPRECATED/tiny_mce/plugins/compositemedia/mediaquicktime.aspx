<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Dialogs.WysiwygEditor.Media.MediaQuickTime</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
	</head>
	<body>
		<ui:dialogpage label="${string:Website.Dialogs.WysiwygEditor.Media.MediaQuickTime.LabelQuickTimeOptions}" height="auto" resizable="false">
			<ui:fields>
				<ui:fieldgroup label="${string:Website.Dialogs.WysiwygEditor.Media.MediaQuickTime.LabelQuickTimeOptions}">
					<ui:field>
						<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Media.MediaQuickTime.StartTime}"/>
						<ui:fielddata>
							<ui:datainput type="number"/>
						</ui:fielddata>
					</ui:field>
					<ui:field>
						<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Media.MediaQuickTime.EndTime}"/>
						<ui:fielddata>
							<ui:datainput type="number"/>
						</ui:fielddata>
					</ui:field>
					<ui:field>
						<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Media.MediaQuickTime.Target}"/>
						<ui:fielddata>
							<ui:datainput/>
						</ui:fielddata>
					</ui:field>
					<ui:field>
						<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Media.MediaQuickTime.Href}"/>
						<ui:fielddata>
							<ui:datainput/>
						</ui:fielddata>
					</ui:field>
					<ui:field>
						<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Media.MediaQuickTime.ChokeSpeed}"
						<ui:fielddata>
							<ui:datainput type="number"/>
						</ui:fielddata>
					</ui:field>
					<ui:field>
						<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Media.MediaQuickTime.Volume}"/>
						<ui:fielddata>
							<ui:datainput type="number"/>
						</ui:fielddata>
					</ui:field>
					<ui:field>
						<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Media.MediaQuickTime.Settings}"/>
						<ui:fielddata>
							<ui:checkboxgroup>
								<ui:checkbox label="${string:Website.Dialogs.WysiwygEditor.Media.MediaQuickTime.LabelLoop}" name="param-loop"/>
								<ui:checkbox label="${string:Website.Dialogs.WysiwygEditor.Media.MediaQuickTime.LabelCache}" name="param-cache"/>
								<ui:checkbox label="${string:Website.Dialogs.WysiwygEditor.Media.MediaQuickTime.LabelNoCorrection}" name="param-menu"/>
								<ui:checkbox label="${string:Website.Dialogs.WysiwygEditor.Media.MediaQuickTime.LabelKioskMode}" name="param-swliveconnect"/>
								<ui:checkbox label="${string:Website.Dialogs.WysiwygEditor.Media.MediaQuickTime.LabelPlayEveryFrame}" name="param-swliveconnect"/>
								<ui:checkbox label="${string:Website.Dialogs.WysiwygEditor.Media.MediaQuickTime.LabelAutoPlay}" name="param-swliveconnect"/>
								<ui:checkbox label="${string:Website.Dialogs.WysiwygEditor.Media.MediaQuickTime.LabelController}" name="param-swliveconnect"/>
								<ui:checkbox label="${string:Website.Dialogs.WysiwygEditor.Media.MediaQuickTime.LabelEnableJavaScript}" name="param-swliveconnect"/>
								<ui:checkbox label="${string:Website.Dialogs.WysiwygEditor.Media.MediaQuickTime.LabelAutoHREF}" name="param-swliveconnect"/>
								<ui:checkbox label="${string:Website.Dialogs.WysiwygEditor.Media.MediaQuickTime.LabelTargetCache}" name="param-swliveconnect"/>
							</ui:checkboxgroup>
						</ui:fielddata>
					</ui:field>
				</ui:fieldgroup>
			</ui:fields>
			<ui:dialogtoolbar>
				<ui:toolbarbody align="right" equalsize="true">
					<ui:toolbargroup>
						<ui:clickbutton id="buttonAccept" label="${string:Website.Dialogs.LabelAccept}" response="accept" focusable="true"/>
						<ui:clickbutton label="${string:Website.Dialogs.LabelCancel}" response="cancel" focusable="true"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:dialogtoolbar>
		</ui:dialogpage>
	</body>
</html>