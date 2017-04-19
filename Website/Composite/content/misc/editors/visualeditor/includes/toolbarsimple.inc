<ui:toolbarbody>
	<ui:toolbargroup>
		<ui:toolbarbutton cmd="InsertUnorderedList" tooltip="${string:Composite.Web.VisualEditor:ToolBar.ToolTipUnorderedList}" type="checkbox" image="${icon:bullist}" isdisabled="true" /> <!-- image-disabled="${skin}/wysiwygeditor/bullist-disabled.png" -->
		<ui:toolbarbutton cmd="InsertOrderedList" tooltip="${string:Composite.Web.VisualEditor:ToolBar.ToolTipOrderedList}" type="checkbox" image="${icon:numlist}" isdisabled="true" /> <!-- image-disabled="${skin}/wysiwygeditor/numlist-disabled.png" -->
		<ui:toolbarbutton cmd="Outdent" tooltip="Outdent" type="checkbox" image="${icon:outdent}" isdisabled="true" />
		<ui:toolbarbutton cmd="Indent" tooltip="Indent" type="checkbox" image="${icon:indent}" isdisabled="true" />
	</ui:toolbargroup>
	<ui:toolbargroup>
		<ui:toolbarbutton cmd="compositeInsertLink" tooltip="${string:Composite.Web.VisualEditor:ToolBar.ToolTipLink}" image="${icon:link}" isdisabled="true" /> <!-- image-disabled="${icon:link-disabled}" -->
		<ui:toolbarbutton cmd="unlink" tooltip="${string:Composite.Web.VisualEditor:ToolBar.ToolTipDeleteLink}" image="${icon:unlink}" isdisabled="true" /> <!-- image-disabled="${icon:unlink-disabled}" -->
	</ui:toolbargroup>
	<ui:toolbargroup>
		<ui:toolbarbutton cmd="Undo" tooltip="${string:Composite.Web.VisualEditor:ToolBar.ToolTipUndo}" image="${icon:undo}" isdisabled="true" observes="broadcasterCanUndo" /> <!-- image-disabled="${icon:undo-disabled}" -->
		<ui:toolbarbutton cmd="Redo" tooltip="${string:Composite.Web.VisualEditor:ToolBar.ToolTipRedo}" image="${icon:redo}" isdisabled="true" observes="broadcasterCanRedo" /> <!-- image-disabled="${icon:redo-disabled}" -->
	</ui:toolbargroup>
	<ui:toolbargroup>
		<ui:toolbarbutton cmd="compositeInsertComponent" label="${string:Composite.Web.VisualEditor:Components.LaunchButton.Label}" image="${icon:functioncall}" isdisabled="true" observes="broadcasterIsActive" />
	</ui:toolbargroup>
</ui:toolbarbody>
<ui:toolbarbody align="right">
	<ui:toolbargroup>
		<ui:toolbarbutton cmd="compositeswitchmode" hidden="false" editorcontrol="false" id="switchbutton" label="${string:Composite.Web.VisualEditor:ToolBar.LabelSource}" image="${icon:editor-sourceview}" image-disabled="${icon:editor-sourceview-disabled}" flip="true"/>
	</ui:toolbargroup>
</ui:toolbarbody>