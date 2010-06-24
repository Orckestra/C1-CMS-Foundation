<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Dialogs.WysiwygEditor.Media.MediaShockwave</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
	</head>
	<body>
		<ui:dialogpage label="${string:Website.Dialogs.WysiwygEditor.Media.MediaShockwave.LabelShockWaveOptions}" height="auto" resizable="false">
			<ui:fields>
				<ui:fieldgroup label="${string:Website.Dialogs.WysiwygEditor.Media.MediaShockwave.LabelShockWaveOptions}">
					<ui:field>
						<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Media.MediaShockwave.StretchStyle}"/>
						<ui:fielddata>
							<ui:selector name="paramswstretchstyle" label="(Default)">
								<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Media.MediaShockwave.LabelMeet}" value="meet"/>
								<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Media.MediaShockwave.LabelFill}" value="fill"/>
								<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Media.MediaShockwave.LabelStage}" value="stage"/>
							</ui:selector>
						</ui:fielddata>
					</ui:field>
					<ui:field>
						<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Media.MediaShockwave.StretchHAlign}"/>
						<ui:fielddata>
							<ui:selector name="paramswstretchhalign" label="(Default)">
								<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Media.MediaShockwave.LabelLeft}" value="left"/>
								<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Media.MediaShockwave.LabelCenter}" value="center"/>
								<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Media.MediaShockwave.LabelRight}" value="right"/>
							</ui:selector>
						</ui:fielddata>
					</ui:field>
					<ui:field>
						<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Media.MediaShockwave.StretchVAlign}"/>
						<ui:fielddata>
							<ui:selector name="paramswstretchvalign" label="(Default)">
								<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Media.MediaShockwave.LabelMeet}" value="meet"/>
								<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Media.MediaShockwave.LabelFill}" value="fill"/>
								<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Media.MediaShockwave.LabelStage}" value="stage"/>
							</ui:selector>
						</ui:fielddata>
					</ui:field>
					<ui:field>
						<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Media.MediaShockwave.StretchVolume}"/>
						<ui:fielddata>
							<ui:datainput name="paramswvolume" type="number"/>
						</ui:fielddata>
					</ui:field>
					<ui:field>
						<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Media.MediaShockwave.StretchSettings}"/>
						<ui:fielddata>
							<ui:checkboxgroup>
								<ui:checkbox label="${string:Website.Dialogs.WysiwygEditor.Media.MediaShockwave.LabelAutoStart}" name="paramautostart" checked="true"/>
								<ui:checkbox label="${string:Website.Dialogs.WysiwygEditor.Media.MediaShockwave.LabelSound}" name="paramsound" checked="true"/>
								<ui:checkbox label="${string:Website.Dialogs.WysiwygEditor.Media.MediaShockwave.LabelProgress}" name="paramprogress" checked="true"/>
								<ui:checkbox label="${string:Website.Dialogs.WysiwygEditor.Media.MediaShockwave.LabelSWLiveConnect}" name="paramswliveconnect"/>
							</ui:checkboxgroup>
						</ui:fielddata>
					</ui:field>
				</ui:fieldgroup>
			</ui:fields>
			<ui:dialogtoolbar>
				<ui:toolbarbody align="right" equalsize="true">
					<ui:toolbargroup>
						<ui:clickbutton id="buttonAccept" label="${string:Website.Dialogs.LabelAccept}" response="accept" focusable="true" default="true"/>
						<ui:clickbutton label="${string:Website.Dialogs.LabelCancel}" response="cancel" focusable="true"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:dialogtoolbar>
		</ui:dialogpage>
	</body>
</html>