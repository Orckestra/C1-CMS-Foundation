<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Dialogs.WysiwygEditor.Image.Image</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
		<link rel="stylesheet" type="text/css" href="image.css"/>
		<script type="text/javascript" src="../compositeplugin/TinyDialogPageBinding.js"></script>
		<script type="text/javascript" src="ImageDialogPageBinding.js"></script>
	</head>
	<body>
		<ui:dialogpage binding="ImageDialogPageBinding"
			label="(label computed)"
			image="${icon:image}" 
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
							<ui:fieldgroup label="${string:Website.Dialogs.WysiwygEditor.Image.Image.LabelImage}">
								<ui:field>
									<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Image.Image.Source}"/>
									<ui:fielddata>
										<ui:datainputdialog handle="Composite.Management.ImageSelectorDialog" name="src" required="true"/>
									</ui:fielddata>
								</ui:field>
								<ui:field>
									<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Image.Image.AlternativeText}"/>
									<ui:fieldhelp label="${string:Website.Dialogs.WysiwygEditor.Image.Image.AlternativeTextToolTip}"/>
									<ui:fielddata>
										<ui:datainput name="alt"/>
									</ui:fielddata>
								</ui:field>
								<ui:field>
									<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Image.Image.TitleText}"/>
									<ui:fieldhelp label="${string:Website.Dialogs.WysiwygEditor.Image.Image.TitleTextToolTip}"/>
									<ui:fielddata>
										<ui:datainput name="title"/>
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