<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

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
			image="${icon:table}" 
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
								<ui:fieldgroup id="layoutfieldgroup" label="${string:Composite.Web.VisualEditor:Tables.Table.LabelLayout}">
									<ui:field>
										<ui:fielddesc label="${string:Composite.Web.VisualEditor:Tables.Table.Columns}"/>
										<ui:fielddata>
											<ui:datainput type="integer" required="true" name="cols" value="2"/>
										</ui:fielddata>
									</ui:field>
									<ui:field>
										<ui:fielddesc label="${string:Composite.Web.VisualEditor:Tables.Table.Rows}"/>
										<ui:fielddata>
											<ui:datainput type="integer" required="true" name="rows" value="2"/>
										</ui:fielddata>
									</ui:field>
								</ui:fieldgroup>
								<ui:fieldgroup label="${string:Composite.Web.VisualEditor:Tables.Table.LabelMeta}">
									<ui:field>
										<ui:fielddesc label="${string:Composite.Web.VisualEditor:Tables.Table.Summary}"/>
										<ui:fieldhelp label="${string:Composite.Web.VisualEditor:Tables.Table.SummaryHelp}"/>
										<ui:fielddata>
											<ui:datainput name="summary"/>
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
								</ui:fieldgroup>
							</ui:fields>
						</ui:tabpanel>
					</ui:tabpanels>
				</ui:tabbox>
			</ui:pagebody>
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