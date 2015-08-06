<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

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
			label="${string:Composite.Web.VisualEditor:Tables.Cell.LabelCellProperties}" 
			image="${icon:fields}" 
			height="auto"
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
										<ui:fielddesc label="${string:Composite.Web.VisualEditor:Tables.Cell.CellType}"/>
										<ui:fielddata>
											<ui:selector name="cellType">
												<ui:selection label="${string:Composite.Web.VisualEditor:Tables.Cell.LabelDataCell}" value="td" selected="true"/>
												<ui:selection label="${string:Composite.Web.VisualEditor:Tables.Cell.LabelHeaderCell}" value="th"/>
											</ui:selector>
										</ui:fielddata>
									</ui:field>
									<ui:field>
										<ui:fielddesc label="${string:Composite.Web.VisualEditor:Tables.Cell.LabelWidth}"/>
										<ui:fielddata>
											<ui:datainput name="width"/>
										</ui:fielddata>
									</ui:field>
									<ui:field>
										<ui:fielddesc label="${string:Composite.Web.VisualEditor:Tables.Cell.HorizontalAlignment}"/>
										<ui:fielddata>
											<ui:selector name="align">
												<ui:selection label="(default)" selected="true"/>
												<ui:selection label="${string:Composite.Web.VisualEditor:Tables.Cell.LabelLeft}" value="left"/>
												<ui:selection label="${string:Composite.Web.VisualEditor:Tables.Cell.LabelCenter}" value="center"/>
												<ui:selection label="${string:Composite.Web.VisualEditor:Tables.Cell.LabelRight}" value="right"/>
											</ui:selector>
										</ui:fielddata>
									</ui:field>
									<ui:field>
										<ui:fielddesc label="${string:Composite.Web.VisualEditor:Tables.Cell.VerticalAlignment}"/>
										<ui:fielddata>
											<ui:selector name="valign">
												<ui:selection label="(default)" selected="true"/>
												<ui:selection label="${string:Composite.Web.VisualEditor:Tables.Cell.LabelTop}" value="top"/>
												<ui:selection label="${string:Composite.Web.VisualEditor:Tables.Cell.LabelCenter}" value="middle"/>
												<ui:selection label="${string:Composite.Web.VisualEditor:Tables.Cell.LabelBottom}" value="bottom"/>
											</ui:selector>
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
								<ui:fieldgroup label="${string:Composite.Web.VisualEditor:Tables.Cell.LabelScope}">
									<ui:field>
										<ui:fielddesc label="${string:Composite.Web.VisualEditor:Tables.Cell.ApplyTo}"/>
										<ui:fielddata>
											<ui:selector name="action">
												<ui:selection label="${string:Composite.Web.VisualEditor:Tables.Cell.LabelCurrentCell}" value="cell" selected="true"/>
												<ui:selection label="${string:Composite.Web.VisualEditor:Tables.Cell.LabelAllRowCells}" value="row"/>
												<ui:selection label="${string:Composite.Web.VisualEditor:Tables.Cell.LabelAllTableCells}" value="all"/>
											</ui:selector>
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
								</ui:fieldgroup>
							</ui:fields>
						</ui:tabpanel>
					</ui:tabpanels>
				</ui:tabbox>
			</ui:pagebody>				
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