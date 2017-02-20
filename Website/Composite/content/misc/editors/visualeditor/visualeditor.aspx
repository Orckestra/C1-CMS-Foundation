<?xml version="1.0" encoding="UTF-8"?>
<%@ Page Language="C#"%>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server" />
	<head>
		<title>Composite.Management.WysiwygEditor</title>
		<control:styleloader runat="server" />
		<control:scriptloader type="sub" runat="server" />
		<link rel="stylesheet" type="text/css" href="visualeditor.css.aspx"/>

		<script type="text/javascript" src="bindings/VisualEditorPageBinding.js"></script>
		<script type="text/javascript" src="bindings/VisualEditorBoxBinding.js"></script>
		<script type="text/javascript" src="bindings/VisualEditorToolBarBinding.js"></script>
		<script type="text/javascript" src="bindings/VisualEditorSimpleToolBarBinding.js"></script>
		<script type="text/javascript" src="bindings/VisualEditorStatusBarBinding.js"></script>
		<script type="text/javascript" src="bindings/FormatSelectorBinding.js"></script>
		<script type="text/javascript" src="bindings/ClassNameSelectorBinding.js"></script>
		<script type="text/javascript" src="bindings/BlockSelectorBinding.js"></script>
		<script type="text/javascript" src="bindings/VisualEditorInsertToolbarButtonBinding.js"></script>
		<script type="text/javascript" src="bindings/VisualEditorInsertPlusFieldsToolBarButtonBinding.js"></script>
		<script type="text/javascript" src="bindings/VisualEditorPropertiesToolBarGroupBinding.js"></script>
		<script type="text/javascript" src="bindings/TemplateTreeBinding.js"></script>

		<ui:bindingmappingset>
			<ui:bindingmapping element="ui:toolbarbutton" binding="EditorToolBarButtonBinding" />
			<ui:bindingmapping element="ui:selector" binding="EditorSelectorBinding" />
		</ui:bindingmappingset>

		<ui:broadcasterset>
			<ui:broadcaster id="broadcasterIsActive" isdisabled="true" />
			<ui:broadcaster id="broadcasterCanUndo" isdisabled="true" />
			<ui:broadcaster id="broadcasterCanRedo" isdisabled="true" />
		</ui:broadcasterset>

	</head>
	<body>

		<ui:popupset>
			<ui:popup id="pastepopup">
				<ui:menubody>
					<ui:menugroup rel="insertions">
						<ui:menuitem cmd="compositeInsertText" val="insert" gui="true" label="${string:Composite.Web.VisualEditor:ContextMenu.LabelAsText}" image="${icon:page}" binding="EditorMenuItemBinding" />
					</ui:menugroup>
				</ui:menubody>
			</ui:popup>
			<ui:popup id="insertpopup">
				<ui:menubody>
					<ui:menugroup rel="insertions">
						<ui:menuitem cmd="compositeInsertTable" val="insert" gui="true" label="${string:Composite.Web.VisualEditor:ContextMenu.LabelTable}" image="${icon:table}" binding="EditorMenuItemBinding" />
						<ui:menuitem cmd="compositeInsertImage" val="insert" gui="true" label="${string:Composite.Web.VisualEditor:ContextMenu.LabelImage}" image="${icon:image}" binding="EditorMenuItemBinding" />
						<ui:menuitem cmd="compositeInsertComponent" val="insert" gui="true" label="${string:Composite.Web.VisualEditor:ContextMenu.LabelComponent}" image="${icon:functioncall}" binding="EditorMenuItemBinding" />
						<ui:menuitem cmd="compositeInsertRendering" val="insert" gui="true" label="${string:Composite.Web.VisualEditor:ContextMenu.LabelRendering}" image="${icon:functioncall}" binding="EditorMenuItemBinding" />
						<ui:menuitem cmd="compositeInsertCharacter" val="insert" gui="true" label="${string:Composite.Web.VisualEditor:ContextMenu.LabelCharacter}" image="${icon:specialchar}" binding="EditorMenuItemBinding" />
						<ui:menuitem cmd="compositeInsertFieldParent" val="insert" gui="true" label="${string:Composite.Web.VisualEditor:ContextMenu.LabelField}" image="${icon:field}" image-disabled="${icon:field-disabled}" binding="EditorMenuItemBinding" isdisabled="true" />
					</ui:menugroup>
				</ui:menubody>
			</ui:popup>
		</ui:popupset>

		<!-- editor gets blurred by focusing this -->
		<input id="focusableinput" type="text" />

		<!-- notice that this page is not a focusmanager! -->
		<ui:page id="editorpage" binding="VisualEditorPageBinding" observes="broadcasterIsActive" focusmanager="false"> <!-- fitasdialogsubpage="false" -->
			<ui:splitbox id="visualeditorsplitbox" orient="horizontal" layout="3:1" persist="layout">
				<ui:splitpanel id="editorsplitpanel">
					<ui:decks id="decks">
						<ui:deck id="designdeck">
							<ui:box id="toolbarsbox" binding="VisualEditorBoxBinding">
								<ui:cover id="toolbarscover" busy="false"/>
								<ui:toolbar id="toolbar" class="visualeditor-toolbar btns-group" binding="VisualEditorSimpleToolBarBinding" observes="broadcasterIsActive">
									<% Response.WriteFile ( "includes/toolbarsimple.inc" ); %>
								</ui:toolbar>
								<ui:toolbar id="advancedtoolbar" class="visualeditor-adv-toolbar" binding="VisualEditorToolBarBinding">
									<% Response.WriteFile ( "includes/toolbaradvanced.inc" ); %>
								</ui:toolbar>
							</ui:box>
							<ui:flexbox id="tinyflexbox">
								<ui:window id="tinywindow" url="tinymce.aspx?config=<%= Request.QueryString [ "config" ] %>"/>
								<ui:cover id="tinycover" busy="false"/>
							</ui:flexbox>
							<ui:toolbar id="statusbar" binding="VisualEditorStatusBarBinding" observes="broadcasterIsActive" class="statusbar dark">
								<ui:toolbarbody />
							</ui:toolbar>
						</ui:deck>
						<ui:deck id="sourcedeck" lazy="true">
							<ui:cover id="sourcecover" busy="true"/>
							<ui:sourceeditor id="sourcecodeeditor" syntax="html" validate="true" embedded="true" />
						</ui:deck>
					</ui:decks>
				</ui:splitpanel>
				<ui:splitter id="toolsplitter" collapse="after" collapsed="true" />
				<ui:splitpanel id="toolsplitpanel">
					<ui:toolbar id="templatetoolbar" class="pagetemplates-toolbar" hidden="true">
						<ui:toolbarbody>
							<ui:toolbargroup>
								<ui:selector id="templateselector" editorcontrol="false" />
							</ui:toolbargroup>
						</ui:toolbarbody>
					</ui:toolbar>
					<ui:tree id="templatetree" binding="TemplateTreeBinding" selectable="true" selectionproperty="placeholder">
						<ui:treebody />
					</ui:tree>
				</ui:splitpanel>
			</ui:splitbox>

		</ui:page>
	</body>
</html>
