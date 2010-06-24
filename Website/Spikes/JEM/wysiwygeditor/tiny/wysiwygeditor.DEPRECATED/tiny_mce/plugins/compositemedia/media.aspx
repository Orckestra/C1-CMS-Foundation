<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Dialogs.WysiwygEditor.Media.Media</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
		<script type="text/javascript" src="../compositeplugin/TinyDialogPageBinding.js"></script>
		<script type="text/javascript" src="MediaDialogPageBinding.js"></script>
	</head>
	<body>
		<ui:dialogpage binding="MediaDialogPageBinding"
			label="(label computed)"
			image="${icon:perspective-media}" 
			height="auto"
			resizable="false"
			class="tabboxed">
			
			<ui:tabbox type="boxed" equalsize="true">
				<ui:tabs>
				 	<ui:tab label="${string:Website.Dialogs.WysiwygEditor.LabelTabBasic}"/>
					<ui:tab label="${string:Website.Dialogs.WysiwygEditor.LabelTabAdvanced}"/>
				</ui:tabs>
				<ui:tabpanels>
					<ui:tabpanel>
						<ui:fields>
							<ui:fieldgroup label="${string:Website.Dialogs.WysiwygEditor.Media.Media.LabelMedia}">
								<ui:field>
									<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Media.Media.Type}"/>
									<ui:fielddata>
										<ui:selector name="mediatype" id="mediatype">
											<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Media.Media.LabelFlash}" value="flash" selected="true" image="${root}/images/icons/mimetypes/flash.png"/>
											<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Media.Media.LabelQuickTime}" value="quicktime" image="${root}/images/icons/mimetypes/quicktime.png"/>
											<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Media.Media.LabelShockWave}" value="shockwave" image="${root}/images/icons/mimetypes/shockwave.png"/>
											<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Media.Media.LabelWindowsMedia}" value="winmedia" image="${root}/images/icons/mimetypes/winmedia.png"/>
										</ui:selector>
									</ui:fielddata>
								</ui:field>
								<ui:field>
									<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Media.Media.Source}"/>
									<ui:fielddata>
										<ui:datainputdialog handle="Composite.Management.EmbeddableMediaSelectorDialog" name="paramsrc" required="true"/>
									</ui:fielddata>
								</ui:field>
								<ui:field>
									<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Media.Media.Width}"/>
									<ui:fielddata>
										<ui:datainput name="width" value="100"/>
									</ui:fielddata>
								</ui:field>
								<ui:field>
									<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Media.Media.Height}"/>
									<ui:fielddata>
										<ui:datainput name="height" value="100"/>
									</ui:fielddata>
								</ui:field>
								<ui:field>
									<ui:fielddata>
									 	<!-- url property dynamically computed -->
										<ui:datadialog id="advancedoptions" label="${string:Website.Dialogs.WysiwygEditor.Media.Media.LabelAdvancedOptions}"/>
									</ui:fielddata>
								</ui:field>
							</ui:fieldgroup>
						</ui:fields>
					</ui:tabpanel>
					<ui:tabpanel>
						<ui:fields>
							<ui:fieldgroup label="${string:Website.Dialogs.WysiwygEditor.LabelPresentation}">
								<ui:field>
									<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.LabelClass}"/>
									<ui:fielddata>
										<ui:datainputselector id="classnameselector" name="classname"/>
									</ui:fielddata>
								</ui:field>
								<ui:field>
									<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.LabelId}"/>
									<ui:fielddata>
										<ui:datainput name="id"/>
									</ui:fielddata>
								</ui:field>
							</ui:fieldgroup>
						</ui:fields>
					</ui:tabpanel>
				</ui:tabpanels>
			</ui:tabbox>
			
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