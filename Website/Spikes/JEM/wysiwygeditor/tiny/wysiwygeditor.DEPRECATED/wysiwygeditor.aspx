<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server" />
	<head>
		<title>Composite.Management.WysiwygEditor</title>

		<control:styleloader runat="server" />
		<control:scriptloader type="sub" runat="server" />
		<link rel="stylesheet" type="text/css" href="wysiwygeditor.css.aspx" />
		<script type="text/javascript" src="bindings/WysigwygEditorPageBinding.js"></script>
		<script type="text/javascript" src="bindings/WysiwygEditorToolBarBinding.js"></script>
		<script type="text/javascript" src="bindings/WysiwygEditorSimpleToolBarBinding.js"></script>
		<script type="text/javascript" src="bindings/WysiwygEditorStatusBarBinding.js"></script>
		<script type="text/javascript" src="bindings/WysiwygEditorInsertToolbarButtonBinding.js"></script>
		<script type="text/javascript" src="bindings/FormatSelectorBinding.js"></script>
		<script type="text/javascript" src="bindings/ClassNameSelectorBinding.js"></script>
		<script type="text/javascript" src="bindings/FieldSelectorBinding.js"></script>
		<script type="text/javascript" src="bindings/TemplateTreeBinding.js"></script>
		<script type="text/javascript" src="bindings/WysiwygEditorPropertiesToolBarGroupBinding.js"></script>
	</head>
	<body>

		<ui:bindingmappingset>
			<ui:bindingmapping element="ui:toolbarbutton" binding="EditorToolBarButtonBinding" />
			<ui:bindingmapping element="ui:selector" binding="EditorSelectorBinding" />
		</ui:bindingmappingset>

		<ui:broadcasterset>
			<ui:broadcaster id="broadcasterIsActive" isdisabled="true" />
			<ui:broadcaster id="broadcasterCanUndo" isdisabled="true" />
			<ui:broadcaster id="broadcasterCanRedo" isdisabled="true" />
		</ui:broadcasterset>

		<ui:popupset>
			<ui:popup id="insertpopup">
				<ui:menubody>
					<ui:menugroup rel="insertions">
						<ui:menuitem cmd="mceInsertTable" val="insert" gui="true" label="${string:Website.Templates.WysiwygEditorPopUp.LabelTable}" image="${skin}/wysiwygeditor/table.png" binding="EditorMenuItemBinding" />
						<ui:menuitem cmd="compositeInsertImage" val="insert" gui="true" label="${string:Website.Templates.WysiwygEditorPopUp.LabelImage}" image="${icon:image}" binding="EditorMenuItemBinding" />
						<!-- ui:menuitem cmd="compositeInsertMedia" val="insert" gui="true" label="${string:Website.Templates.WysiwygEditorPopUp.LabelMedia}" image="${icon:perspective-media}" binding="EditorMenuItemBinding" /-->
						<ui:menuitem cmd="compositeInsertRendering" val="insert" gui="true" label="${string:Website.Templates.WysiwygEditorPopUp.LabelRendering}" image="${icon:functioncall}" binding="EditorMenuItemBinding" />
						<ui:menuitem cmd="compositeInsertCharacter" val="insert" gui="true" label="${string:Website.Templates.WysiwygEditorPopUp.LabelCharacter}" image="${icon:specialchar}" binding="EditorMenuItemBinding" />
						<ui:menuitem cmd="compositeInsertText" val="insert" gui="true" label="${string:Website.Templates.WysiwygEditorPopUp.LabelAsText}" image="${icon:page}" binding="EditorMenuItemBinding" />
						<ui:menuitem cmd="compositeInsertWord" val="insert" gui="true" label="${string:Website.Templates.WysiwygEditorPopUp.LabelFromWord}" image="${skin}/wysiwygeditor/word.png" binding="EditorMenuItemBinding" />
						<ui:menuitem cmd="compositeInsertFieldParent" val="insert" gui="true" label="${string:Website.Templates.WysiwygEditorPopUp.LabelField}" image="${icon:field}" image-disabled="${icon:field-disabled}" binding="EditorMenuItemBinding" isdisabled="true" />
					</ui:menugroup>
				</ui:menubody>
			</ui:popup>
		</ui:popupset>

		<!-- editor gets blurred by focusing this -->
		<input id="focusableinput" type="text" />

		<!-- notice that this page is not a focusmanager! -->
		<ui:page id="editorpage" binding="WysigwygEditorPageBinding" observes="broadcasterIsActive" focusmanager="false" fitasdialogsubpage="false">
			<ui:splitbox id="visualeditorsplitbox" orient="horizontal" layout="3:1" persist="layout">
				<ui:splitpanel id="editorsplitpanel">
					<ui:decks id="decks">
						<ui:deck id="designdeck">
							<ui:toolbar id="toolbar" binding="WysiwygEditorSimpleToolBarBinding" template="wysiwygeditor/toolbar_simple.xml" observes="broadcasterIsActive"/>
							<ui:toolbar id="advancedtoolbar" binding="WysiwygEditorToolBarBinding" template="wysiwygeditor/toolbar_advanced.xml"/>
							<ui:flexbox id="tinyflexbox">
								<ui:cover id="tinycover" busy="false"/> <!-- busy="true" !!! -->
								<ui:window id="tinywindow" url="tinymce.aspx"/>
							</ui:flexbox>
						</ui:deck>
						<ui:deck id="sourcedeck" lazy="true">
							<ui:cover id="sourcecover" busy="true"/>
							<ui:sourceeditor id="sourcecodeeditor" syntax="html" embedded="true" />
						</ui:deck>
					</ui:decks>
					<ui:toolbar id="statusbar" binding="WysiwygEditorStatusBarBinding" observes="broadcasterIsActive" class="statusbar">
						<ui:toolbarbody />
					</ui:toolbar>
				</ui:splitpanel>
				<ui:splitter id="toolsplitter" collapse="after" collapsed="false" />
				<ui:splitpanel id="toolsplitpanel">
					<ui:cover id="toolscover" busy="true"/>
					<ui:toolbar>
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