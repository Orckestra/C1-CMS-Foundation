<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>

	<control:httpheaders runat="server"/>
	<head>
		<title>Website.Content.Views.Editors.PermissionEditorPageBinding</title>
	    <control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
		<script type="text/javascript" src="PermissionEditorPageBinding.js"></script>
		<script type="text/javascript" src="PermissionEditorGridBinding.js"></script>
		<script type="text/javascript" src="PermissionEditorHeadBinding.js"></script>
	</head>
	<body>
	
		<ui:editorpage 
			id="page"
			label="${string:Website.Content.Views.Editors.PermissionEditor.LabelTitle}" 
			image="${icon:security-manage-permissions}"
			binding="PermissionEditorPageBinding">
			
			<ui:broadcasterset>
				<ui:broadcaster id="broadcasterCanSave" isdisabled="true"/>
			</ui:broadcasterset>
			
			<ui:toolbar id="toolbar" class="document-toolbar">
			 	<ui:toolbarbody class="pull-right">
					<ui:toolbargroup>
						<ui:toolbarbutton
							label="${string:Website.Content.Views.Editors.PermissionEditor.LabelButtonSave}" 
							id="savebutton" 
							image="${icon:save}" 
							image-disabled="${icon:save-disabled}" 
							observes="broadcasterCanSave" 
							oncommand="this.dispatchAction(EditorPageBinding.ACTION_SAVE);"/>
					</ui:toolbargroup>
				</ui:toolbarbody>
			</ui:toolbar>
			<ui:tabbox>
				<ui:tabs>
					<ui:tab id="tab0" label="${string:Website.Content.Views.Editors.PermissionEditor.LabelTabUserGroups}"/>
					<ui:tab id="tab1" label="${string:Website.Content.Views.Editors.PermissionEditor.LabelTabUsers}"/>
				</ui:tabs>
				<ui:tabpanels>
					<ui:tabpanel id="tabpanel0">
						<table id="head0" class="table permissions-table hide" binding="PermissionEditorHeadBinding">
							<thead>
								<tr class="head text-center">
									<th class="edit">&#160;</th>
									<th class="index">&#160;</th>
								</tr>
							</thead>
						</table>
						<ui:scrollbox>
							<table id="grid0" class="table permissions-table hide" binding="PermissionEditorGridBinding">
								<tbody/>
							</table>
						</ui:scrollbox>
					</ui:tabpanel>
					<ui:tabpanel id="tabpanel1">
						<table id="head1" class="table permissions-table"  binding="PermissionEditorHeadBinding">
							<thead>
								<tr class="head">
									<th class="edit">&#160;</th>
									<th class="index">&#160;</th>
								</tr>
							</thead>
						</table>
						<ui:scrollbox>
							<table id="grid1" class="table permissions-table" binding="PermissionEditorGridBinding">
								<tbody>
								</tbody>
							</table>
						</ui:scrollbox>
					</ui:tabpanel>
				</ui:tabpanels>
			</ui:tabbox>
		</ui:editorpage>
	</body>
</html>