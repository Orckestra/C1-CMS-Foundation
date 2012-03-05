<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>
    
	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Test.MoreFields</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
	</head>
	<body>

		<ui:page label="More Fields">

			<ui:pagehead>
				<ui:pageheading>Sub frame loaded!</ui:pageheading>
				<ui:pagedescription>This page should automatically be indexed in the tab order for keyboard navigation. Currently this fails in Mozilla.</ui:pagedescription>
			</ui:pagehead>	

			<ui:fields>
			
				<ui:fieldgroup label="Datadialogs">
					<ui:field>
						<ui:fielddesc>datadialog</ui:fielddesc>
						<ui:fielddata>
							<ui:datadialog url="${root}/content/dialogs/tests/datadialog/datadialog.aspx" label="Advanced options"/>
						</ui:fielddata>
					</ui:field>
					<ui:field>
						<ui:fielddesc>datainputdialog</ui:fielddesc>
						<ui:fielddata>
							<ui:datainputdialog handle="Composite.Management.ImageSelectorDialog" name="datainputdialog1" value="1" type="integer"/>
						</ui:fielddata>
					</ui:field>
					<ui:field>
						<ui:fielddesc>datainputdialog + help</ui:fielddesc>
						<ui:fieldhelp>Help!</ui:fieldhelp>
						<ui:fielddata>
							<ui:datainputdialog handle="Composite.Management.ImageSelectorDialog" name="datainputdialog2" value="1" type="integer"/>
						</ui:fielddata>
					</ui:field>
				</ui:fieldgroup>
				
				<ui:fieldgroup label="Checkboxes">
					<ui:field>
						<ui:fielddesc>checkbox</ui:fielddesc>
						<ui:fielddata>
							<ui:checkboxgroup>
								<ui:checkbox label="Checkbox 1" name="check1" value="c1" ischecked="true"/>
								<ui:checkbox label="Checkbox 2" name="check2" value="c2"/>
								<ui:checkbox label="Checkbox 3" name="check3" value="c3"/>
							</ui:checkboxgroup>
						</ui:fielddata>
					</ui:field>
					<ui:field>
						<ui:fielddesc>checkbox + help</ui:fielddesc>
						<ui:fieldhelp>Help!</ui:fieldhelp>
						<ui:fielddata>
							<ui:checkboxgroup>
								<ui:checkbox label="Checkbox 1" name="check4" value="c1" ischecked="true"/>
								<ui:checkbox label="Checkbox 2" name="check5" value="c2"/>
								<ui:checkbox label="Checkbox 3" name="check6" value="c3"/>
							</ui:checkboxgroup>
						</ui:fielddata>
					</ui:field>
				</ui:fieldgroup>
			</ui:fields>

		</ui:page>
	</body>
</html>