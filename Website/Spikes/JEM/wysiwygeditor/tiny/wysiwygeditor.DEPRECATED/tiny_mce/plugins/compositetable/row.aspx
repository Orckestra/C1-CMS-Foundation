<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server" />
	<head>
		<title>Composite.Management.Dialogs.WysiwygEditor.Tables.Row</title>
		<control:styleloader runat="server" />
		<control:scriptloader type="sub" runat="server" />
		<script type="text/javascript" src="../compositeplugin/TinyDialogPageBinding.js"></script>
		<script type="text/javascript" src="TableRowDialogPageBinding.js"></script>
	</head>
	<body>
		<ui:dialogpage binding="TableRowDialogPageBinding"
			label="${string:Website.Dialogs.WysiwygEditor.Tables.Row.LabelRowProperties}" 
			image="${skin}/wysiwygeditor/table_row_props.png" 
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
							<ui:fieldgroup label="${string:Website.Dialogs.WysiwygEditor.Tables.Row.LabelLayout}">
								<ui:field>
									<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Tables.Row.Rows}"/>
									<ui:fielddata>
										<ui:selector name="rowtype">
											<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Tables.Row.LabelTableHead}" value="thead"/>
											<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Tables.Row.LabelTableBody}" value="tbody" selected="true"/>
											<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Tables.Row.LabelTableFoot}" value="tfoot"/>
										</ui:selector>
									</ui:fielddata>
								</ui:field>
								<ui:field>
									<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Tables.Row.HorizontalAlignment}"/>
									<ui:fielddata>
										<ui:selector name="align">
											<ui:selection label="(default)" selected="true"/>
											<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Tables.Row.LabelLeft}" value="left"/>
											<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Tables.Row.LabelCenter}" value="center"/>
											<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Tables.Row.LabelRight}" value="right"/>
										</ui:selector>
									</ui:fielddata>
								</ui:field>
								<ui:field>
									<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Tables.Row.VerticalAlignment}"/>
									<ui:fielddata>
										<ui:selector name="valign">
											<ui:selection label="(default)" selected="true"/>
											<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Tables.Row.LabelTop}" value="top"/>
											<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Tables.Row.LabelCenter}" value="middle"/>
											<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Tables.Row.LabelBottom}" value="bottom"/>
										</ui:selector>
									</ui:fielddata>
								</ui:field>
						    </ui:fieldgroup>
							<ui:fieldgroup label="${string:Website.Dialogs.WysiwygEditor.Tables.Row.LabelScope}">
								<ui:field>
									<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Tables.Row.ApplyTo}"/>
									<ui:fielddata>
										<ui:selector name="action">
											<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Tables.Row.LabelCurrentRow}" value="row" selected="true"/>
											<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Tables.Row.LabelOddRows}" value="odd"/>
											<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Tables.Row.LabelEvenRows}" value="event"/>
											<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Tables.Row.LabelAllRows}" value="all"/>
										</ui:selector>
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
						<ui:clickbutton label="${string:Website.Dialogs.LabelAccept}" response="accept" focusable="true" default="true"/>
						<ui:clickbutton label="${string:Website.Dialogs.LabelCancel}" response="cancel" focusable="true"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:dialogtoolbar>
		</ui:dialogpage>
	</body>
</html>