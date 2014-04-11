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
						<ui:tab label="Hallo"/>
					</ui:tabs>
					<ui:tabpanels>
						<ui:tabpanel>
							<ui:visualeditor 
								formattingconfiguration="common">
								<textarea name="FlowUI$Document$DocumentBody$TabPanels$PageContentEditor13$contentplaceholder" rows="2" cols="20" id="FlowUI_Document_DocumentBody_TabPanels_PageContentEditor13_contentplaceholder" placeholderid="contentplaceholder" placeholdername="Content" selected="true">&lt;html xmlns="http://www.w3.org/1999/xhtml"&gt;
	&lt;head&gt;&lt;/head&gt;
	&lt;body&gt;	
		&lt;p&gt;This is yet another an update!&lt;/p&gt;
		&lt;p&gt;Now with &lt;strong&gt;multiple&lt;/strong&gt; lines!&lt;/p&gt;
		&lt;p&gt;
			&lt;img src="/Renderers/ShowMedia.ashx?i=MediaArchive%3a%2fberlin02.jpg" /&gt;
		&lt;/p&gt;
	&lt;/body&gt;
&lt;/html&gt;</textarea>
							</ui:visualeditor>
						</ui:tabpanel>
					</ui:tabpanels>
				</ui:tabbox>
				
			</ui:editorpage>
		</form>
	</body>
</html>