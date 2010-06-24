<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Dialogs.WysiwygEditor.Media.MediaWinMedia</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
	</head>
	<body>
		<ui:dialogpage label="${string:Website.Dialogs.WysiwygEditor.Media.MediaWinMedia.LabelWindowsMediaOptions}" height="auto" resizable="false">
			<ui:fields>
				<ui:fieldgroup label="${string:Website.Dialogs.WysiwygEditor.Media.MediaWinMedia.LabelWindowsMediaOptions}">
					<ui:field>
						<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Media.MediaWinMedia.Balance}"/>
						<ui:fielddata>
							<ui:datainput name="parambalance"/>
						</ui:fielddata>
					</ui:field>
					<ui:field>
						<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Media.MediaWinMedia.CaptioningID}"/>
						<ui:fielddata>
							<ui:datainput name="paramcaptioningid"/>
						</ui:fielddata>
					</ui:field>
					<ui:field>
						<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Media.MediaWinMedia.CurrentPosition}"/>
						<ui:fielddata>
							<ui:datainput name="paramcurrentposition"/>
						</ui:fielddata>
					</ui:field>
					<ui:field>
						<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Media.MediaWinMedia.PlayCount}"/>
						<ui:fielddata>
							<ui:datainput name="paramplaycount" type="number"/>
						</ui:fielddata>
					</ui:field>
					<ui:field>
						<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Media.MediaWinMedia.UIMode}"/>
						<ui:fielddata>
							<ui:datainput name="paramuimode"/>
						</ui:fielddata>
					</ui:field>
					<ui:field>
						<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Media.MediaWinMedia.BaseURL}"/>
						<ui:fielddata>
							<ui:datainput name="parambaseurl" type="number"/>
						</ui:fielddata>
					</ui:field>
					<ui:field>
						<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Media.MediaWinMedia.CurrentMarker}"/>
						<ui:fielddata>
							<ui:datainput name="paramcurrentmarker"/>
						</ui:fielddata>
					</ui:field>
					<ui:field>
						<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Media.MediaWinMedia.DefaultFrame}"/>
						<ui:fielddata>
							<ui:datainput name="paramdefaultframe"/>
						</ui:fielddata>
					</ui:field>
					<ui:field>
						<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Media.MediaWinMedia.Rate}"/>
						<ui:fielddata>
							<ui:datainput name="paramrate" type="number"/>
						</ui:fielddata>
					</ui:field>
					<ui:field>
						<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Media.MediaWinMedia.Volume}"/>
						<ui:fielddata>
							<ui:datainput name="paramvolume" type="number"/>
						</ui:fielddata>
					</ui:field>
					<ui:field>
						<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Media.MediaWinMedia.Settings}"/>
						<ui:fielddata>
							<ui:checkboxgroup>
								<ui:checkbox label="${string:Website.Dialogs.WysiwygEditor.Media.MediaWinMedia.LabelAutoStart}" name="paramautostart" checked="true"/>
								<ui:checkbox label="${string:Website.Dialogs.WysiwygEditor.Media.MediaWinMedia.LabelShowMenu}" name="paramenablecontextmenu" checked="true"/>
								<ui:checkbox label="${string:Website.Dialogs.WysiwygEditor.Media.MediaWinMedia.LabelInvokeURLs}" name="paraminvokeurls" checked="true"/>
								<ui:checkbox label="${string:Website.Dialogs.WysiwygEditor.Media.MediaWinMedia.LabelStretchToFit}" name="paramstretchtofit"/>
								<ui:checkbox label="${string:Website.Dialogs.WysiwygEditor.Media.MediaWinMedia.LabelEnabled}" name="paramenabled"/>
								<ui:checkbox label="${string:Website.Dialogs.WysiwygEditor.Media.MediaWinMedia.LabelFullScreen}" name="paramfullscreen"/>
								<ui:checkbox label="${string:Website.Dialogs.WysiwygEditor.Media.MediaWinMedia.LabelMute}" name="parammute"/>
								<ui:checkbox label="${string:Website.Dialogs.WysiwygEditor.Media.MediaWinMedia.LabelWindowLessVideo}" name="paramwindowlessvideo"/>
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