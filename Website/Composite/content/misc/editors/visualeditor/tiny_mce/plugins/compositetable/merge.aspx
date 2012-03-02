<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server" />
	<head>
		<title>Composite.Management.Dialogs.WysiwygEditor.Tables.Merge</title>
		<control:styleloader runat="server" />
		<control:scriptloader type="sub" runat="server" />
		<script type="text/javascript" src="../compositeplugin/TinyDialogPageBinding.js"></script>
		<script type="text/javascript" src="TableMergeCellsDialogPageBinding.js"></script>
	</head>
	<body>
		<ui:dialogpage binding="TableMergeCellsDialogPageBinding"
			label="${string:Composite.Web.VisualEditor:Tables.Merge.LabelMergeCells}" 
			image="${skin}/wysiwygeditor/table_merge_cells.png" 
			height="auto">
			<ui:pagebody>
				<ui:fields>
					<ui:fieldgroup label="${string:Composite.Web.VisualEditor:Tables.Merge.LabelMergeCells}">
						<ui:field>
							<ui:fielddesc label="${string:Composite.Web.VisualEditor:Tables.Merge.Columns}"/>
							<ui:fielddata>
								<ui:datainput name="numcols" value="1" required="true" type="integer"/>
							</ui:fielddata>
						</ui:field>
						<ui:field>
							<ui:fielddesc label="${string:Composite.Web.VisualEditor:Tables.Merge.Rows}"/>
							<ui:fielddata>
								<ui:datainput name="numrows" value="1" required="true" type="integer"/>
							</ui:fielddata>
						</ui:field>
					</ui:fieldgroup>
				</ui:fields>
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