<?xml version="1.0" encoding="UTF-8" ?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml"
xmlns:control="http://www.composite.net/ns/uicontrol">

<%@ Page Language="C#" %>

<control:httpheaders runat="server" />
<head>
	<title>Composite.Management.SourceCodeEditor</title>
	<control:styleloader runat="server" />
	<control:scriptloader type="sub" runat="server" />
	<link rel="stylesheet" type="text/css" href="codemirror.css.aspx" />
	<script type="text/javascript" src="bindings/SourceEditorPageBinding.js"></script>
	<script type="text/javascript" src="bindings/SourceEditorToolBarBinding.js"></script>
	<script type="text/javascript" src="bindings/SourceEditorInsertToolbarButtonBinding.js"></script>
	<script type="text/javascript" src="bindings/SourceEditorFormatToolbarButtonBinding.js"></script>
    <script type="text/javascript" src="bindings/SourceEditorFindAndReplaceToolBarButtonBinding.js" ></script>
    <script type="text/javascript" src="bindings/SourceEditorToggleWordWrapToolbarButtonBinding.js" ></script>
</head>
<body>
	<ui:broadcasterset>
		<ui:broadcaster id="broadcasterIsActive" isdisabled="true" />
	</ui:broadcasterset>
	<ui:bindingmappingset>
		<ui:bindingmapping element="ui:toolbarbutton" binding="EditorToolBarButtonBinding" />
		<ui:bindingmapping element="ui:selector" binding="EditorSelectorBinding" />
	</ui:bindingmappingset>
	<ui:popupset>
		<ui:popup id="insertpopup">
			<ui:menubody>
				<ui:menugroup rel="insertions">
					<ui:menuitem cmd="compositeInsert" val="pageurl" label="${string:Composite.Web.SourceEditor:Insert.PageURL.Label}"
						image="${icon:page}" />
					<ui:menuitem cmd="compositeInsert" val="imageurl" label="${string:Composite.Web.SourceEditor:Insert.ImageURL.Label}"
						image="${icon:image}" />
					<ui:menuitem cmd="compositeInsert" val="mediaurl" label="${string:Composite.Web.SourceEditor:Insert.MediaURL.Label}"
						image="${icon:perspective-media}" />
					<ui:menuitem cmd="compositeInsert" val="frontendurl" label="${string:Composite.Web.SourceEditor:Insert.FrontendURL.Label}"
						image="${icon:page-template-template}" />
					<ui:menuitem cmd="compositeInsert" val="functionmarkup" label="${string:Composite.Web.SourceEditor:Insert.FunctionMarkup.Label}"
						image="${icon:functioncall}" />
				</ui:menugroup>
			</ui:menubody>
		</ui:popup>
	</ui:popupset>
	<ui:page id="editorpage" binding="SourceEditorPageBinding">
		<ui:toolbar id="toolbar" class="codemirroreditor-toolbar" binding="SourceEditorToolBarBinding">
			<ui:toolbarbody>
				<ui:toolbargroup>
					<ui:toolbarbutton id="insertbutton" label="${string:Composite.Web.VisualEditor:ContextMenu.LabelInsert}"
						image="${icon:insert}" image-disabled="${icon:insert-disabled}" observes="broadcasterIsActive"
						popup="insertpopup" binding="SourceEditorInsertToolbarButtonBinding" />
				</ui:toolbargroup>
				<ui:toolbargroup id="xmltools" hidden="true">
					<ui:toolbarbutton id="formatbutton" label="${string:Composite.Web.SourceEditor:Toolbar.Format.Label}" tooltip="${string:Composite.Web.SourceEditor:Toolbar.Format.ToolTip}" image="${icon:editor-formatsource}"
						image-disabled="${icon:editor-formatsource-disabled}" observes="broadcasterIsActive"
						binding="SourceEditorFormatToolbarButtonBinding" />
							<ui:toolbarbutton id="wordwrapbutton" label="${string:Composite.Web.SourceEditor:Toolbar.ToggleWordWrap.Label}" tooltip="" image="${icon:editor-formatsource}"
								image-disabled="${icon:editor-formatsource-disabled}" observes="broadcasterIsActive"
								binding="SourceEditorToggleWordWrapToolbarButtonBinding" />
                            <ui:toolbarbutton id="findandreplacebutton" label="${string:Composite.Web.SourceEditor:Toolbar.FindAndReplace.Label}" tooltip="" image="${icon:editor-formatsource}"
								image-disabled="${icon:editor-formatsource-disabled}" observes="broadcasterIsActive"
								binding="SourceEditorFindAndReplaceToolBarButtonBinding" />
				</ui:toolbargroup>
			</ui:toolbarbody>
			<ui:toolbarbody align="right">
				<ui:toolbargroup>
					<!-- 
										When loaded inside the wysiwygeditor, 
										the WysiwygEditorBinding will insert 
										a toolbarbutton here! 
									-->
				</ui:toolbargroup>
			</ui:toolbarbody>
		</ui:toolbar>
		<ui:flexbox id="editorflexbox">
			<ui:window id="codemirrorwindow" />
		</ui:flexbox>

	</ui:page>
</body>
</html>
