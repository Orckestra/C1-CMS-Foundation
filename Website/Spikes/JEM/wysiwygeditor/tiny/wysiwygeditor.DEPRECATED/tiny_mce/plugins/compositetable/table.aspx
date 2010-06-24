<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server" />
	<head>
		<title>Composite.Management.Dialogs.WysiwygEditor.Tables.Table</title>
		<control:styleloader runat="server" />
		<control:scriptloader type="sub" runat="server" />
		<script type="text/javascript" src="../compositeplugin/TinyDialogPageBinding.js"></script>
		<script type="text/javascript" src="TableDialogPageBinding.js"></script>
	</head>
	<body>
		<ui:dialogpage binding="TableDialogPageBinding"
			label="(label computed)" 
			image="${skin}/wysiwygeditor/table.png" 
			height="auto"
			class="tabboxed">
			
			<ui:tabbox type="boxed" equalsize="true">
				<ui:tabs>
				 	<ui:tab label="${string:Website.Dialogs.WysiwygEditor.LabelTabBasic}"/>
					<ui:tab label="${string:Website.Dialogs.WysiwygEditor.LabelTabAdvanced}"/>
				</ui:tabs>
				<ui:tabpanels>
					<ui:tabpanel>
						<ui:fields>
							<ui:fieldgroup id="layoutfieldgroup" label="${string:Website.Dialogs.WysiwygEditor.Tables.Table.LabelLayout}">
								<ui:field>
									<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Tables.Table.Columns}"/>
									<ui:fielddata>
										<ui:datainput type="integer" required="true" name="cols" value="2"/>
									</ui:fielddata>
								</ui:field>
								<ui:field>
									<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Tables.Table.Rows}"/>
									<ui:fielddata>
										<ui:datainput type="integer" required="true" name="rows" value="2"/>
									</ui:fielddata>
								</ui:field>
							</ui:fieldgroup>
							<ui:fieldgroup label="${string:Website.Dialogs.WysiwygEditor.Tables.Table.LabelMeta}">
								<ui:field>
									<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Tables.Table.Summary}"/>
									<ui:fieldhelp label="${string:Website.Dialogs.WysiwygEditor.Tables.Table.SummaryHelp}"/>
									<ui:fielddata>
										<ui:datainput name="summary"/>
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
				<ui:toolbarbody id="dialogtoolbarbody" align="right" equalsize="true">
					<ui:toolbargroup>
						<ui:clickbutton label="${string:Website.Dialogs.LabelAccept}" id="buttonAccept" response="accept" focusable="true" default="true"/>
						<ui:clickbutton label="${string:Website.Dialogs.LabelCancel}" response="cancel" focusable="true"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:dialogtoolbar>
		</ui:dialogpage>
	</body>
</html>