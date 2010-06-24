<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
	<control:httpheaders runat="server"/>
	<head>
		<title>Composite.Management.SourceCodeEditor</title>
		<control:styleloader runat="server"/>
		<control:scriptloader type="sub" runat="server"/>
		<link rel="stylesheet" type="text/css" href="sourceeditor.css.aspx"/>
		<script type="text/javascript" src="editarea/edit_area/edit_area_full.js"/>
		<script type="text/javascript" src="sourceeditor.js"/>
		
		<!-- 
		<script type="text/javascript" src="bindings/SourceEditorPageBinding.js"></script>
		<script type="text/javascript" src="bindings/SourceEditorToolBarBinding.js"></script>
		<script type="text/javascript" src="bindings/SourceEditorInsertToolbarButtonBinding.js"></script>
		<script type="text/javascript" src="bindings/SourceEditorFormatToolbarButtonBinding.js"></script>
		-->		
	</head>
	<body>
	
		<ui:broadcasterset>
			<ui:broadcaster id="broadcasterIsActive" isdisabled="true"/>
		</ui:broadcasterset>
		
		<ui:bindingmappingset>
			<ui:bindingmapping element="ui:toolbarbutton" binding="EditorToolBarButtonBinding"/>
			<ui:bindingmapping element="ui:selector" binding="EditorSelectorBinding"/>
		</ui:bindingmappingset>
		
		<ui:popupset>
			<ui:popup id="insertpopup">
				<ui:menubody>
					<ui:menugroup rel="insertions">
						<ui:menuitem cmd="compositeInsert" val="pageurl" label="${string:Composite.Web.SourceEditor:Insert.PageURL.Label}" image="${icon:page}"/>
						<ui:menuitem cmd="compositeInsert" val="imageurl" label="${string:Composite.Web.SourceEditor:Insert.ImageURL.Label}" image="${icon:image}"/>
						<ui:menuitem cmd="compositeInsert" val="mediaurl" label="${string:Composite.Web.SourceEditor:Insert.MediaURL.Label}" image="${icon:perspective-media}"/>
						<ui:menuitem cmd="compositeInsert" val="frontendurl" label="${string:Composite.Web.SourceEditor:Insert.FrontendURL.Label}" image="${icon:page-template-template}"/>
						<ui:menuitem cmd="compositeInsert" val="functionmarkup" label="${string:Composite.Web.SourceEditor:Insert.FunctionMarkup.Label}" image="${icon:functioncall}"/>
					</ui:menugroup>
				</ui:menubody>
			</ui:popup>
		</ui:popupset>
		
		<!-- editor gets blurred by focusing this -->
		<input id="focusableinput" type="text"/>
		
		<ui:page id="editorpage" fitasdialogsubpage="false"> <!-- binding="SourceEditorPageBinding"  -->
			<ui:toolbar id="toolbar"> <!-- binding="SourceEditorToolBarBinding" -->
				<ui:toolbarbody>
					
						<ui:toolbargroup>
							<ui:toolbarbutton cmd="plainview" label="${string:Composite.Web.SourceEditor:Switch.PlainEdit.Label}" tooltip="${string:Composite.Web.SourceEditor:Switch.PlainEdit.ToolTip}" hidden="true" editorcontrol="false"/>
							<ui:toolbarbutton cmd="fancyview" label="${string:Composite.Web.SourceEditor:Switch.ColoredEdit.Label}" image="${icon:editor-fancyedit}" tooltip="${string:Composite.Web.SourceEditor:Switch.ColoredEdit.ToolTip}" hidden="true" editorcontrol="false"/>
						</ui:toolbargroup>
					
					<ui:toolbargroup rel="developermode">
						<ui:toolbarbutton label="Debug" oncommand="bindingMap.editorpage.debug ()" image="${icon:systemlog}"/>
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
			
			<!-- mozilla only -->
			
				<ui:decks id="sourcecodeeditordecks" selectedindex="1"> <!-- persist="selectedindex" -->
					<ui:deck id="plaindeck">
						<ui:flexbox>
							<ui:cover id="plaineditorcover" busy="false" hidden="true"/>
							<ui:editortextbox id="plaineditor"/>
						</ui:flexbox>
					</ui:deck>
					<ui:deck id="fancydeck">
						<ui:toolbar>
							<ui:toolbarbody>
								<ui:toolbargroup>
									<ui:toolbarbutton 
										id="insertbutton"
										label="${string:Composite.Web.VisualEditor:ContextMenu.LabelInsert}" 
										image="${icon:insert}" 
										image-disabled="${icon:insert-disabled}" 
										observes="broadcasterIsActive" 
										popup="insertpopup" />
										<!-- binding="SourceEditorInsertToolbarButtonBinding"  -->
								</ui:toolbargroup>
								<ui:toolbargroup id="xmltools" hidden="true">
									<ui:toolbarbutton 
										id="formatbutton" 
										label="Format" 
										tooltip="Format XML source"
										image="${icon:editor-formatsource}" 
										image-disabled="${icon:editor-formatsource-disabled}" 
										observes="broadcasterIsActive"/>
										<!-- binding="SourceEditorFormatToolbarButtonBinding" -->
								</ui:toolbargroup>
							</ui:toolbarbody>
						</ui:toolbar>
						<ui:flexbox id="editareaflexbox">
							<textarea id="editarea" name="editarea" style="width:100%;height:100%;">HELLO???</textarea>
							<!-- 
							<ui:cover id="codepresscover" busy="false" hidden="true"/>
							<ui:window id="codepresswindow"/>
							-->
						</ui:flexbox>
					</ui:deck>
				</ui:decks>
			
			
			<!-- explorer only 
			<ui:region match="explorer">
				<ui:flexbox>
					<ui:cover id="plaineditorcover" busy="false" hidden="true"/>
					<ui:editortextbox id="plaineditor"/>
				</ui:flexbox>
			</ui:region>
			-->
			
		</ui:page>
	</body>
</html>