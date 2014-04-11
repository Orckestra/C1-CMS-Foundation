<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.Test.Fields.WysiwygEditors</title>
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
	
			<ui:editorpage label="Visual Editors">
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

				<ui:lazybindingset>
					<ui:lazybinding bindingid="testlazystuff" name="ctl00_/AdministrativeTemplates/Document.xml_repeater_ctl01_UiControl8_repeater_ctl00_UiControl0_lazybindingactivated1"/>
				</ui:lazybindingset>
					
				<ui:tabbox>
					<ui:tabs>
						<ui:tab label="Nothing"/>
						<ui:tab label="Page Editor"/>
					</ui:tabs>
					<ui:tabpanels>
						<ui:tabpanel>
							<div>Nothing to see.</div>
						</ui:tabpanel>
						<ui:tabpanel id="testlazystuff">
							
							<ui:wysiwygeditor type="pageeditor" embedablefieldstypenames="">
								<ui:selector name="selector">
									<ui:selection label="Template1" value="tempalteID1"/>
									<ui:selection label="Template2" value="tempalteID2" selected="true"/>
									<ui:selection label="Template3" value="tempalteID3"/>
								</ui:selector>
								<ui:updatepanel>
									<ui:updatepanelbody>
										<textarea placeholdername="TopBar" name="ctl00$/AdministrativeTemplates/Document.xml$repeater$ctl01$UiControl8$repeater$ctl00$UiControl0$tabpanelRepeater$ctl01$UiControl13$contentTextBox">Hej</textarea>
										<textarea placeholdername="Content" selected="true" name="ctl00$/AdministrativeTemplates/Document.xml$repeater$ctl01$UiControl8$repeater$ctl00$UiControl0$tabpanelRepeater$ctl01$UiControl13$contentTextBox2">Dav</textarea>
										<textarea placeholdername="LeftColumn" name="ctl00$/AdministrativeTemplates/Document.xml$repeater$ctl01$UiControl8$repeater$ctl00$UiControl0$tabpanelRepeater$ctl01$UiControl13$contentTextBox3">Hey</textarea>
										<textarea placeholdername="RightColumn" name="ctl00$/AdministrativeTemplates/Document.xml$repeater$ctl01$UiControl8$repeater$ctl00$UiControl0$tabpanelRepeater$ctl01$UiControl13$contentTextBox4">Ho!</textarea>
									</ui:updatepanelbody>
								</ui:updatepanel>
							</ui:wysiwygeditor>
							
						</ui:tabpanel>
					</ui:tabpanels>
				</ui:tabbox>
				
			</ui:editorpage>
		</form>
	</body>
</html>