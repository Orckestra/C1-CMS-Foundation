<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Dialogs.WysiwygEditor.Media.MediaFlash</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
	</head>
	<body>
		<ui:dialogpage label="${string:Website.Dialogs.WysiwygEditor.Media.MediaFlash.LabelFlashOptions}" height="auto" resizable="false">
			<ui:fields>
				<ui:fieldgroup label="${string:Website.Dialogs.WysiwygEditor.Media.MediaFlash.LabelFlashOptions}">
					<ui:field>
						<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Media.MediaFlash.Quality}"/>
						<ui:fielddata>
							<ui:selector name="paramquality" label="(Default)">
								<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Media.MediaFlash.LabelHigh}" value="high"/>
								<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Media.MediaFlash.LabelLow}" value="low"/>
								<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Media.MediaFlash.LabelAutoHigh}" value="autoheigh"/>
								<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Media.MediaFlash.LabelAutoLow}" value="autolow"/>
								<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Media.MediaFlash.LabelBest}" value="best"/>
							</ui:selector>
						</ui:fielddata>
					</ui:field>
					<ui:field>
						<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Media.MediaFlash.WMode}"/>
						<ui:fielddata>
							<ui:selector name="paramwmode" label="(Default)">
								<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Media.MediaFlash.LabelWindow}" value="window"/>
								<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Media.MediaFlash.LabelOpaque}" value="opaque"/>
								<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Media.MediaFlash.LabelTransparent}" value="transparent"/>
							</ui:selector>
						</ui:fielddata>
					</ui:field>
					<ui:field>
						<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Media.MediaFlash.Scale}"/>
						<ui:fielddata>
							<ui:selector name="paramscale" label="(Default)">
								<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Media.MediaFlash.LabelShowAll}" value="showall"/>
								<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Media.MediaFlash.LabelNoBorder}" value="noborder"/>
								<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Media.MediaFlash.LabelExactFit}" value="exactfit"/>
							</ui:selector>
						</ui:fielddata>
					</ui:field>
					<ui:field>
						<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Media.MediaFlash.Settings}"/>
						<ui:fielddata>
							<ui:checkboxgroup>
								<ui:checkbox label="${string:Website.Dialogs.WysiwygEditor.Media.MediaFlash.LabelAutoPlay}" name="paramplay" checked="true"/>
								<ui:checkbox label="${string:Website.Dialogs.WysiwygEditor.Media.MediaFlash.LabelLoop}" name="paramloop" checked="true"/>
								<ui:checkbox label="${string:Website.Dialogs.WysiwygEditor.Media.MediaFlash.LabelShowMenu}" name="parammenu" checked="true"/>
								<ui:checkbox label="${string:Website.Dialogs.WysiwygEditor.Media.MediaFlash.LabelSWLiveConnect}" name="paramswliveconnect"/>
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