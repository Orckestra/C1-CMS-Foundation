<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

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
			<ui:pagebody>
				<ui:tabbox type="boxed" equalsize="true">
					<ui:tabs>
					 	<ui:tab label="${string:Composite.Web.VisualEditor:LabelTabBasic}"/>
						<ui:tab label="${string:Composite.Web.VisualEditor:LabelTabAdvanced}"/>
					</ui:tabs>
					<ui:tabpanels>
						<ui:tabpanel>
							<ui:fields>
								<ui:fieldgroup>
									<ui:field>
										<ui:fielddesc label="${string:Composite.Web.VisualEditor:Image.Source}"/>
										<ui:fielddata>
											<ui:urlinputdialog handle="Composite.Management.ImageSelectorDialog" name="src" required="true" />
										</ui:fielddata>
									</ui:field>
									<ui:field>
										<ui:fielddesc label="${string:Composite.Web.VisualEditor:Image.AlternativeText}"/>
										<ui:fieldhelp label="${string:Composite.Web.VisualEditor:Image.AlternativeTextToolTip}"/>
										<ui:fielddata>
											<ui:datainput name="alt"/>
										</ui:fielddata>
									</ui:field>
									<ui:field>
										<ui:fielddesc label="${string:Composite.Web.VisualEditor:Image.TitleText}"/>
										<ui:fieldhelp label="${string:Composite.Web.VisualEditor:Image.TitleTextToolTip}"/>
										<ui:fielddata>
											<ui:datainput name="title"/>
										</ui:fielddata>
									</ui:field>
									<ui:field>
										<ui:fielddesc label="${string:Composite.Web.VisualEditor:LabelClass}"/>
										<ui:fieldhelp label="${string:Composite.Web.VisualEditor:HelpClass}"/>
										<ui:fielddata>
											<ui:datainputselector id="classnameselector" name="classname" image="${icon:editor-classselector}" emptyentrylabel="${string:Composite.Web.VisualEditor:ClassSelector.LabelNone}"/>
										</ui:fielddata>
									</ui:field>
								</ui:fieldgroup>
							</ui:fields>
						</ui:tabpanel>
						<ui:tabpanel>
							<ui:fields>
								<ui:fieldgroup>
									<ui:field>
										<ui:fielddesc label="${string:Composite.Web.VisualEditor:LabelId}"/>
										<ui:fieldhelp label="${string:Composite.Web.VisualEditor:HelpId}"/>
										<ui:fielddata>
											<ui:datainput name="id"/>
										</ui:fielddata>
									</ui:field>
									<ui:field>
										<ui:fielddesc label="${string:Composite.Web.VisualEditor:Image.MaxWidth}"/>
										<ui:fieldhelp label="${string:Composite.Web.VisualEditor:Image.MaxWidthToolTip}"/>
										<ui:fielddata>
											<ui:datainput name="maxwidth" type="integer"/>
										</ui:fielddata>
									</ui:field>
									<ui:field>
										<ui:fielddesc label="${string:Composite.Web.VisualEditor:Image.MaxHeight}"/>
										<ui:fieldhelp label="${string:Composite.Web.VisualEditor:Image.MaxHeightToolTip}"/>
										<ui:fielddata>
											<ui:datainput name="maxheight" type="integer"/>
										</ui:fielddata>
									</ui:field>
								</ui:fieldgroup>
							</ui:fields>
						</ui:tabpanel>
					</ui:tabpanels>
				</ui:tabbox>
			</ui:pagebody>
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