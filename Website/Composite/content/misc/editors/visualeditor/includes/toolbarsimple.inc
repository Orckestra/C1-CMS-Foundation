<ui:toolbarbody>
	
	<ui:toolbargroup>
		<ui:toolbarbutton cmd="Bold" tooltip="${string:Composite.Web.VisualEditor:ToolBar.ToolTipStrong}" type="checkbox" image="${skin}/wysiwygeditor/bold.png" image-disabled="${skin}/wysiwygeditor/bold-disabled.png" isdisabled="true" />
		<ui:toolbarbutton cmd="Italic" tooltip="${string:Composite.Web.VisualEditor:ToolBar.ToolTipEmphasize}" type="checkbox" image="${skin}/wysiwygeditor/italic.png" image-disabled="${skin}/wysiwygeditor/italic-disabled.png" isdisabled="true" />
		<ui:toolbarbutton cmd="Underline" tooltip="${string:Composite.Web.VisualEditor:ToolBar.ToolTipUnderline}" type="checkbox" image="${skin}/wysiwygeditor/underline.png" image-disabled="${skin}/wysiwygeditor/underline-disabled.png" isdisabled="true" />
		<ui:toolbarbutton cmd="Strikethrough" tooltip="${string:Composite.Web.VisualEditor:ToolBar.ToolTipStrike}" type="checkbox" image="${skin}/wysiwygeditor/strikethrough.png" image-disabled="${skin}/wysiwygeditor/strikethrough-disabled.png" isdisabled="true" />
	</ui:toolbargroup>
	<ui:toolbargroup>
		<ui:toolbarbutton cmd="JustifyLeft" tooltip="${string:Composite.Web.VisualEditor:ToolBar.ToolTipJustifyLeft}" type="radio" image="${skin}/wysiwygeditor/justifyleft.png" image-disabled="${skin}/wysiwygeditor/justifyleft-disabled.png" isdisabled="true" />
		<ui:toolbarbutton cmd="JustifyRight" tooltip="${string:Composite.Web.VisualEditor:ToolBar.ToolTipJustifyRight}" type="radio" image="${skin}/wysiwygeditor/justifyright.png" image-disabled="${skin}/wysiwygeditor/justifyright-disabled.png" isdisabled="true" />
		<ui:toolbarbutton cmd="JustifyCenter" tooltip="${string:Composite.Web.VisualEditor:ToolBar.ToolTipJustifyCenter}" type="radio" image="${skin}/wysiwygeditor/justifycenter.png" image-disabled="${skin}/wysiwygeditor/justifycenter-disabled.png" isdisabled="true" />
		<ui:toolbarbutton cmd="JustifyFull" tooltip="${string:Composite.Web.VisualEditor:ToolBar.ToolTipJustifyFull}" type="radio" image="${skin}/wysiwygeditor/justifyfull.png" image-disabled="${skin}/wysiwygeditor/justifyfull-disabled.png" isdisabled="true" />
	</ui:toolbargroup>
	
	<ui:toolbargroup>
		<ui:toolbarbutton cmd="InsertUnorderedList" tooltip="${string:Composite.Web.VisualEditor:ToolBar.ToolTipUnorderedList}" type="checkbox" image="${skin}/wysiwygeditor/bullist.png" image-disabled="${skin}/wysiwygeditor/bullist-disabled.png" isdisabled="true" />
		<ui:toolbarbutton cmd="InsertOrderedList" tooltip="${string:Composite.Web.VisualEditor:ToolBar.ToolTipOrderedList}" type="checkbox" image="${skin}/wysiwygeditor/numlist.png" image-disabled="${skin}/wysiwygeditor/numlist-disabled.png" isdisabled="true" />
	</ui:toolbargroup>
	<ui:toolbargroup>
		<ui:toolbarbutton cmd="compositeInsertLink" tooltip="${string:Composite.Web.VisualEditor:ToolBar.ToolTipLink}" image="${icon:link}" image-disabled="${icon:link-disabled}" isdisabled="true" />
		<ui:toolbarbutton cmd="unlink" tooltip="${string:Composite.Web.VisualEditor:ToolBar.ToolTipDeleteLink}" image="${icon:unlink}" image-disabled="${icon:unlink-disabled}" isdisabled="true" />
	</ui:toolbargroup>
	<!-- 
	<ui:toolbargroup>
		<ui:toolbarbutton cmd="compositeCleanup" tooltip="${string:Composite.Web.VisualEditor:ToolBar.ToolTipCleanup}" image="${icon:cleanup}" image-disabled="${icon:cleanup-disabled}" isdisabled="true" />
	</ui:toolbargroup>
	 -->
	<ui:toolbargroup>
		<ui:toolbarbutton cmd="Undo" tooltip="${string:Composite.Web.VisualEditor:ToolBar.ToolTipUndo}" image="${icon:undo}" image-disabled="${icon:undo-disabled}" isdisabled="true" observes="broadcasterCanUndo" />
		<ui:toolbarbutton cmd="Redo" tooltip="${string:Composite.Web.VisualEditor:ToolBar.ToolTipRedo}" image="${icon:redo}" image-disabled="${icon:redo-disabled}" isdisabled="true" observes="broadcasterCanRedo" />
	</ui:toolbargroup>
</ui:toolbarbody>
<ui:toolbarbody align="right">
	<ui:toolbargroup>
		<ui:toolbarbutton cmd="compositeswitchmode" hidden="false" editorcontrol="false" id="switchbutton" label="${string:Composite.Web.VisualEditor:ToolBar.LabelSource}" image="${icon:editor-sourceview}" image-disabled="${icon:editor-sourceview-disabled}" flip="true"/>
	</ui:toolbargroup>
</ui:toolbarbody>