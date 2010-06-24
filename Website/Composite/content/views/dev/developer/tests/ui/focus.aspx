<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Test.Fields</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
		<script type="text/javascript">
		function __doPostBack () {
			// simulate dot net
		}
		</script>
	</head>
	<body>
		<ui:page label="Testing focus" class="padded">
			<ui:tabbox type="boxed">
				<ui:tabs>
					<ui:tab label="Hans"/>
					<ui:tab label="Jens"/>
				</ui:tabs>
				<ui:tabpanels>
					<ui:tabpanel>
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
						</ui:fields>
					</ui:tabpanel>
					<ui:tabpanel>
						<ui:fields>
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
											<ui:checkbox label="Checkbox 1" name="check1" value="c1" ischecked="true"/>
											<ui:checkbox label="Checkbox 2" name="check2" value="c2"/>
											<ui:checkbox label="Checkbox 3" name="check3" value="c3"/>
										</ui:checkboxgroup>
									</ui:fielddata>
								</ui:field>
							</ui:fieldgroup>
						</ui:fields>
					</ui:tabpanel>
				</ui:tabpanels>
			</ui:tabbox>
		</ui:page>
	</body>
</html>