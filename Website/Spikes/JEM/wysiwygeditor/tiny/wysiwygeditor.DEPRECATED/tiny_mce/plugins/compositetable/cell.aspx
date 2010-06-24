<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server" />
	<head>
		<title>Composite.Management.Dialogs.WysiwygEditor.Tables.Cell</title>
		<control:styleloader runat="server" />
		<control:scriptloader type="sub" runat="server" />
		<script type="text/javascript" src="../compositeplugin/TinyDialogPageBinding.js"></script>
		<script type="text/javascript" src="TableCellDialogPageBinding.js"></script>
	</head>
	<body>
		<ui:dialogpage binding="TableCellDialogPageBinding"
			label="${string:Website.Dialogs.WysiwygEditor.Tables.Cell.LabelCellProperties}" 
			image="${skin}/wysiwygeditor/table_cell_props.png" 
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
							<ui:fieldgroup label="${string:Website.Dialogs.WysiwygEditor.Tables.Cell.LabelLayout}">
								<ui:field>
									<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Tables.Cell.CellType}"/>
									<ui:fielddata>
										<ui:selector name="cellType">
											<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Tables.Cell.LabelDataCell}" value="td" selected="true"/>
											<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Tables.Cell.LabelHeaderCell}" value="th"/>
										</ui:selector>
									</ui:fielddata>
								</ui:field>
								<ui:field>
									<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Tables.Cell.LabelWidth}"/>
									<ui:fielddata>
										<ui:datainput name="width"/>
									</ui:fielddata>
								</ui:field>
								<ui:field>
									<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Tables.Cell.HorizontalAlignment}"/>
									<ui:fielddata>
										<ui:selector name="align">
											<ui:selection label="(default)" selected="true"/>
											<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Tables.Cell.LabelLeft}" value="left"/>
											<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Tables.Cell.LabelCenter}" value="center"/>
											<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Tables.Cell.LabelRight}" value="right"/>
										</ui:selector>
									</ui:fielddata>
								</ui:field>
								<ui:field>
									<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Tables.Cell.VerticalAlignment}"/>
									<ui:fielddata>
										<ui:selector name="valign">
											<ui:selection label="(default)" selected="true"/>
											<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Tables.Cell.LabelTop}" value="top"/>
											<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Tables.Cell.LabelCenter}" value="middle"/>
											<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Tables.Cell.LabelBottom}" value="bottom"/>
										</ui:selector>
									</ui:fielddata>
								</ui:field>
							</ui:fieldgroup>
							<ui:fieldgroup label="${string:Website.Dialogs.WysiwygEditor.Tables.Cell.LabelScope}">
								<ui:field>
									<ui:fielddesc label="${string:Website.Dialogs.WysiwygEditor.Tables.Cell.ApplyTo}"/>
									<ui:fielddata>
										<ui:selector name="action">
											<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Tables.Cell.LabelCurrentCell}" value="cell" selected="true"/>
											<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Tables.Cell.LabelAllRowCells}" value="row"/>
											<ui:selection label="${string:Website.Dialogs.WysiwygEditor.Tables.Cell.LabelAllTableCells}" value="all"/>
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