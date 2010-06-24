<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Test.Fields.SourceCodeEditors</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
		<script type="text/javascript">
		function __doPostBack () {
			// simulate dot net
		}
		</script>
	</head>
	<body>
		<form action="javascript://" method="get"> <!-- simulate dot net -->
			
			<ui:editorpage label="Source Code Editors">
				<ui:broadcasterset>
					<ui:broadcaster id="broadcasterCanSave" isdisabled="true"/>
				</ui:broadcasterset>
				<ui:toolbar>
					<ui:toolbarbody>
						<ui:toolbargroup>
							<ui:toolbarbutton  
								oncommand="this.dispatchAction(EditorPageBinding.ACTION_SAVE)"
								id="savebutton" 
								image="${icon:save}" 
								image-disabled="${icon:save-disabled}" 
								label="Save"
								observes="broadcasterCanSave"/>
						</ui:toolbargroup>
					</ui:toolbarbody>
				</ui:toolbar>
				
				<ui:tabbox>
					<ui:tabs>
						<ui:tab label="XML Editor"/>
						<ui:tab label="Editor Gallery" selected="true"/>
					</ui:tabs>
					<ui:tabpanels>
						<ui:tabpanel>
							<!-- 
							<ui:sourceeditor syntax="xml">
								<textarea name="XMLEDITOR">&lt;root&gt;&lt;/root&gt;</textarea>
							</ui:sourceeditor>
							-->
						</ui:tabpanel>
						<ui:tabpanel lazy="true">
							<ui:tabbox>
								<ui:tabs>
									<ui:tab label="XSL"/>
									<ui:tab label="XML"/>
									<ui:tab label="XHTML"/>
									<ui:tab label="JS"/>
									<ui:tab label="C#"/>
									<ui:tab label="CSS"/>
									<ui:tab label="SQL"/>
								</ui:tabs>
								<ui:tabpanels>
									<ui:tabpanel>
										<ui:sourceeditor syntax="xsl" debug="true"/>
									</ui:tabpanel>
									<ui:tabpanel lazy="true">
										<ui:sourceeditor syntax="xml" debug="true"/>
									</ui:tabpanel>
									<ui:tabpanel lazy="true">
										<ui:sourceeditor syntax="html" debug="true"/>
									</ui:tabpanel>
									<ui:tabpanel lazy="true">
										<ui:sourceeditor syntax="javascript" debug="true"/>
									</ui:tabpanel>
									<ui:tabpanel lazy="true">
										<ui:sourceeditor syntax="csharp" debug="true"/>
									</ui:tabpanel>
									<ui:tabpanel lazy="true">
										<ui:sourceeditor syntax="css" debug="true"/>
									</ui:tabpanel>
									<ui:tabpanel lazy="true">
										<ui:sourceeditor syntax="sql" debug="true"/>
									</ui:tabpanel>
								</ui:tabpanels>
							</ui:tabbox>
						</ui:tabpanel>
						
					</ui:tabpanels>
				</ui:tabbox>
				
			</ui:editorpage>
		</form>
	</body>
</html>